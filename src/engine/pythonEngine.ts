import { TestCase } from '../types/exercise';

export interface ExecutionResult {
  success: boolean;
  output: string;
  returnValue?: any;
  error?: string;
  executionTimeMs: number;
}

export interface TestRunResult {
  testCase: TestCase;
  passed: boolean;
  actualOutput: any;
  expectedOutput: any;
  consoleOutput: string;
  error?: string;
  executionTimeMs: number;
}

let pyodideInstance: any = null;
let isPyodideLoading = false;

// Lazy loader for Pyodide (loaded dynamically only when requested)
export async function loadPyodide(): Promise<any> {
  if (pyodideInstance) return pyodideInstance;
  if (isPyodideLoading) {
    // Wait until loaded
    while (isPyodideLoading) {
      await new Promise(r => setTimeout(r, 100));
    }
    return pyodideInstance;
  }

  isPyodideLoading = true;
  try {
    if (!(window as any).loadPyodide) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/pyodide/v0.26.2/full/pyodide.js';
      const loadPromise = new Promise((resolve, reject) => {
        script.onload = resolve;
        script.onerror = reject;
      });
      document.head.appendChild(script);
      await loadPromise;
    }

    const loader = (window as any).loadPyodide;
    if (loader) {
      pyodideInstance = await loader({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.2/full/'
      });
      isPyodideLoading = false;
      return pyodideInstance;
    }
  } catch (err) {
    console.warn('Pyodide load failed, using high-speed JS Python simulator:', err);
  } finally {
    isPyodideLoading = false;
  }

  return null;
}

/**
 * Execute Python code in sandbox with input mocking and stdout capture
 */
export async function executePythonCode(
  code: string,
  inputs: (string | number)[] = []
): Promise<ExecutionResult> {
  const startTime = performance.now();
  let stdout = '';
  let inputIdx = 0;

  // 1. Try Pyodide if already loaded
  if (pyodideInstance) {
    try {
      pyodideInstance.setStdout({
        batched: (text: string) => {
          stdout += text + '\n';
        }
      });

      // Mock input()
      const pyInputs = JSON.stringify(inputs.map(String));
      const wrappedCode = `
import sys
import json

__inputs = ${pyInputs}
__input_idx = 0

def input(prompt=""):
    global __input_idx
    if prompt:
        print(prompt, end="")
    if __input_idx < len(__inputs):
        val = __inputs[__input_idx]
        __input_idx += 1
        return val
    return ""

${code}
`;
      const result = await pyodideInstance.runPythonAsync(wrappedCode);
      const executionTimeMs = Math.round(performance.now() - startTime);
      return {
        success: true,
        output: stdout.trim(),
        returnValue: result,
        executionTimeMs
      };
    } catch (err: any) {
      const executionTimeMs = Math.round(performance.now() - startTime);
      return {
        success: false,
        output: stdout.trim(),
        error: formatPythonError(err.message || String(err)),
        executionTimeMs
      };
    }
  }

  // 2. High-speed JavaScript Python transpiler/runner fallback
  try {
    const logs: string[] = [];
    const customPrint = (...args: any[]) => {
      logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '));
    };

    const customInput = (promptMsg?: string) => {
      if (promptMsg) logs.push(String(promptMsg));
      if (inputIdx < inputs.length) {
        const val = inputs[inputIdx++];
        return String(val);
      }
      return '';
    };

    const jsTranspiled = transpilePythonToJs(code);
    
    // Sandbox evaluation
    const runner = new Function('print', 'input', 'range', 'len', 'sum', 'max', 'min', 'sorted', 'int', 'float', 'str', 'bool', 'list', 'dict', 'set', `
      "use strict";
      let __returnValue = undefined;
      try {
        ${jsTranspiled}
      } catch(e) {
        throw e;
      }
      return __returnValue;
    `);

    // Standard Python built-ins mapped to JS
    const pyRange = (...args: number[]) => {
      let start = 0, stop = 0, step = 1;
      if (args.length === 1) stop = args[0];
      else if (args.length === 2) { start = args[0]; stop = args[1]; }
      else if (args.length === 3) { start = args[0]; stop = args[1]; step = args[2]; }
      const res: number[] = [];
      if (step > 0) {
        for (let i = start; i < stop; i += step) res.push(i);
      } else if (step < 0) {
        for (let i = start; i > stop; i += step) res.push(i);
      }
      return res;
    };

    const pyLen = (item: any) => item ? (item.length !== undefined ? item.length : Object.keys(item).length) : 0;
    const pySum = (arr: number[]) => (Array.isArray(arr) ? arr.reduce((a, b) => a + b, 0) : 0);
    const pyMax = (...args: any[]) => {
      const arr = Array.isArray(args[0]) ? args[0] : args;
      return Math.max(...arr);
    };
    const pyMin = (...args: any[]) => {
      const arr = Array.isArray(args[0]) ? args[0] : args;
      return Math.min(...arr);
    };
    const pySorted = (arr: any[], reverse = false) => {
      const c = [...arr].sort((a, b) => a > b ? 1 : -1);
      return reverse ? c.reverse() : c;
    };
    const pyInt = (v: any) => parseInt(v, 10) || 0;
    const pyFloat = (v: any) => parseFloat(v) || 0.0;
    const pyStr = (v: any) => String(v);
    const pyBool = (v: any) => Boolean(v);
    const pyList = (v: any) => Array.isArray(v) ? [...v] : Array.from(v || []);
    const pyDict = (v: any) => ({ ...(v || {}) });
    const pySet = (v: any) => new Set(v || []);

    const ret = runner(
      customPrint, 
      customInput, 
      pyRange, 
      pyLen, 
      pySum, 
      pyMax, 
      pyMin, 
      pySorted, 
      pyInt, 
      pyFloat, 
      pyStr, 
      pyBool, 
      pyList, 
      pyDict, 
      pySet
    );

    const executionTimeMs = Math.round(performance.now() - startTime);
    return {
      success: true,
      output: logs.join('\n'),
      returnValue: ret,
      executionTimeMs
    };
  } catch (err: any) {
    const executionTimeMs = Math.round(performance.now() - startTime);
    return {
      success: false,
      output: '',
      error: formatPythonError(err.message || String(err)),
      executionTimeMs
    };
  }
}

/**
 * Run test cases for a logic exercise
 */
export async function runTestCases(
  code: string,
  testCases: TestCase[]
): Promise<TestRunResult[]> {
  const results: TestRunResult[] = [];

  for (const tc of testCases) {
    const startTime = performance.now();
    let inputs: any[] = [];

    if (tc.input !== undefined) {
      if (Array.isArray(tc.input)) {
        inputs = tc.input;
      } else {
        inputs = [tc.input];
      }
    }

    const execResult = await executePythonCode(code, inputs);
    const executionTimeMs = Math.round(performance.now() - startTime);

    if (!execResult.success) {
      results.push({
        testCase: tc,
        passed: false,
        actualOutput: execResult.error || 'Erro na execução',
        expectedOutput: tc.expectedOutput,
        consoleOutput: execResult.output,
        error: execResult.error,
        executionTimeMs
      });
      continue;
    }

    // Check outputs
    const actual = execResult.returnValue !== undefined ? execResult.returnValue : execResult.output;
    const passed = compareResults(actual, tc.expectedOutput, execResult.output);

    results.push({
      testCase: tc,
      passed,
      actualOutput: actual,
      expectedOutput: tc.expectedOutput,
      consoleOutput: execResult.output,
      executionTimeMs
    });
  }

  return results;
}

function compareResults(actual: any, expected: any, consoleOutput: string): boolean {
  // 1. Direct equality
  if (actual === expected) return true;

  // 2. Numeric equality with tolerance
  if (typeof actual === 'number' && typeof expected === 'number') {
    return Math.abs(actual - expected) < 0.01;
  }

  // 3. String comparison (ignoring trailing whitespace and accents if applicable)
  const normActual = String(actual).trim().toLowerCase();
  const normExpected = String(expected).trim().toLowerCase();
  if (normActual === normExpected) return true;

  // 4. Output contains expected string in console
  const normConsole = String(consoleOutput).trim().toLowerCase();
  if (normConsole === normExpected || normConsole.endsWith(normExpected) || normConsole.includes(normExpected)) {
    return true;
  }

  // 5. Array / Object comparison
  if (typeof expected === 'object' && expected !== null) {
    try {
      return JSON.stringify(actual) === JSON.stringify(expected);
    } catch {
      return false;
    }
  }

  return false;
}

function formatPythonError(err: string): string {
  if (err.includes('is not defined') || err.includes('ReferenceError')) {
    const match = err.match(/(\w+) is not defined/);
    const varName = match ? match[1] : '';
    return `Nome não definido: "${varName}". Você declarou ou digitou o nome da variável/função corretamente? Lembre-se que Python diferencia maiúsculas de minúsculas.`;
  }
  if (err.includes('IndentationError') || err.includes('Unexpected indent')) {
    return `Erro de Indentação: O alinhamento dos blocos em Python deve ser consistente (use 4 espaços ou Tab dentro de if, for, while, def).`;
  }
  if (err.includes('SyntaxError')) {
    return `Erro de Sintaxe: Verifique se você não esqueceu de fechar parênteses, aspas ou os dois-pontos (:) no final de comandos como if, for, while ou def.`;
  }
  if (err.includes('TypeError')) {
    return `Erro de Tipo: Você tentou realizar uma operação entre tipos incompatíveis (ex: somar texto com número sem converter).`;
  }
  return err;
}

/**
 * Transpiles common beginner-to-intermediate Python constructs to executable JS
 */
function transpilePythonToJs(pythonCode: string): string {
  const lines = pythonCode.split('\n');
  const jsLines: string[] = [];
  const indentStack: number[] = [0];

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    
    // Ignore empty lines or full comments
    if (!rawLine.trim() || rawLine.trim().startsWith('#')) {
      continue;
    }

    const indent = rawLine.search(/\S/);
    const trimmed = rawLine.trim();

    const isElif = Boolean(trimmed.match(/^elif\b/));
    const isElse = Boolean(trimmed.match(/^else\s*:/));

    // Handle dedent:
    while (indentStack.length > 1 && indent < indentStack[indentStack.length - 1]) {
      indentStack.pop();
      if (!isElif && !isElse) {
        jsLines.push('}');
      }
    }

    let line = trimmed;
    // Strip inline comments if not inside quotes
    if (!line.includes('"#') && !line.includes("'#")) {
      line = line.replace(/#.*$/, '').trim();
    }

    // 1. Function definitions: def func_name(a, b):
    if (line.match(/^def\s+([a-zA-Z0-9_]+)\s*\((.*?)\):/)) {
      const match = line.match(/^def\s+([a-zA-Z0-9_]+)\s*\((.*?)\):/);
      const funcName = match ? match[1] : 'fn';
      const params = match ? match[2] : '';
      line = `function ${funcName}(${params}) {`;
      indentStack.push(indent + (indent === 0 ? 4 : 2));
    }
    // 2. If statement: if cond:
    else if (line.match(/^if\s+(.+?):$/)) {
      const cond = convertPythonExprToJs(line.replace(/^if\s+/, '').replace(/:$/, ''));
      line = `if (${cond}) {`;
      indentStack.push(indent + (indent === 0 ? 4 : 2));
    }
    // 3. Elif statement: elif cond:
    else if (isElif && line.match(/^elif\s+(.+?):$/)) {
      const cond = convertPythonExprToJs(line.replace(/^elif\s+/, '').replace(/:$/, ''));
      line = `} else if (${cond}) {`;
      indentStack.push(indent + (indent === 0 ? 4 : 2));
    }
    // 4. Else statement: else:
    else if (isElse) {
      line = `} else {`;
      indentStack.push(indent + (indent === 0 ? 4 : 2));
    }
    // 5. While loop: while cond:
    else if (line.match(/^while\s+(.+?):$/)) {
      const cond = convertPythonExprToJs(line.replace(/^while\s+/, '').replace(/:$/, ''));
      line = `while (${cond}) {`;
      indentStack.push(indent + (indent === 0 ? 4 : 2));
    }
    // 6. For in range: for x in range(...):
    else if (line.match(/^for\s+([a-zA-Z0-9_]+)\s+in\s+range\((.*?)\):/)) {
      const match = line.match(/^for\s+([a-zA-Z0-9_]+)\s+in\s+range\((.*?)\):/);
      const varName = match ? match[1] : 'i';
      const rangeArgs = match ? match[2] : '';
      line = `for (let ${varName} of range(${rangeArgs})) {`;
      indentStack.push(indent + (indent === 0 ? 4 : 2));
    }
    // 7. For in collection: for x in col:
    else if (line.match(/^for\s+([a-zA-Z0-9_]+)\s+in\s+(.+?):$/)) {
      const match = line.match(/^for\s+([a-zA-Z0-9_]+)\s+in\s+(.+?):$/);
      const varName = match ? match[1] : 'item';
      const colExpr = match ? match[2] : '[]';
      line = `for (let ${varName} of ${convertPythonExprToJs(colExpr)}) {`;
      indentStack.push(indent + (indent === 0 ? 4 : 2));
    }
    // 8. Return statement
    else if (line.match(/^return\b/)) {
      const expr = line.replace(/^return\s*/, '');
      line = expr ? `return ${convertPythonExprToJs(expr)};` : 'return;';
    }
    // 9. Print statement
    else if (line.match(/^print\s*\(/)) {
      const inside = line.replace(/^print\s*\(/, '').replace(/\)\s*$/, '');
      const convertedInside = convertPythonExprToJs(inside);
      line = `print(${convertedInside});`;
    }
    // 10. Pass, break, continue
    else if (line === 'pass') {
      line = '/* pass */;';
    }
    else if (line === 'break') {
      line = 'break;';
    }
    else if (line === 'continue') {
      line = 'continue;';
    }
    // 11. Variable assignment
    else if (line.match(/^([a-zA-Z0-9_]+)\s*(\+=|-=|\*=|\/=|%=|=)\s*(.+)$/)) {
      const match = line.match(/^([a-zA-Z0-9_]+)\s*(\+=|-=|\*=|\/=|%=|=)\s*(.+)$/);
      if (match) {
        const [, varName, op, expr] = match;
        const convertedExpr = convertPythonExprToJs(expr);
        line = `${varName} ${op} ${convertedExpr};`;
      }
    }
    else {
      line = convertPythonExprToJs(line) + ';';
    }

    jsLines.push(line);
  }

  // Close any unclosed blocks
  while (indentStack.length > 1) {
    indentStack.pop();
    jsLines.push('}');
  }

  const varDeclarations = extractVariables(pythonCode);
  return `${varDeclarations}\n${jsLines.join('\n')}`;
}

function convertPythonExprToJs(expr: string): string {
  let e = expr.trim();
  
  // Convert Python f-strings: f"Texto {var} mais texto" -> `Texto ${var} mais texto`
  e = e.replace(/f"([^"]*)"/g, (_, p1) => {
    return '`' + p1.replace(/\{([^}]+)\}/g, '${$1}') + '`';
  });
  e = e.replace(/f'([^']*)'/g, (_, p1) => {
    return '`' + p1.replace(/\{([^}]+)\}/g, '${$1}') + '`';
  });

  // Python booleans & None
  e = e.replace(/\bTrue\b/g, 'true');
  e = e.replace(/\bFalse\b/g, 'false');
  e = e.replace(/\bNone\b/g, 'null');
  
  // Python logical operators
  e = e.replace(/\band\b/g, '&&');
  e = e.replace(/\bor\b/g, '||');
  e = e.replace(/\bnot\b\s+/g, '!');
  
  // Integer division // -> Math.floor(a / b)
  e = e.replace(/([a-zA-Z0-9_().]+)\s*\/\/\s*([a-zA-Z0-9_().]+)/g, 'Math.floor($1 / $2)');
  
  // Exponentiation ** -> Math.pow(a, b)
  e = e.replace(/([a-zA-Z0-9_().]+)\s*\*\*\s*([a-zA-Z0-9_().]+)/g, 'Math.pow($1, $2)');
  
  // .append() -> .push()
  e = e.replace(/\.append\(/g, '.push(');
  
  return e;
}

function extractVariables(code: string): string {
  const vars = new Set<string>();
  const matches = code.matchAll(/^\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*=/gm);
  for (const m of matches) {
    const name = m[1];
    if (!['if', 'elif', 'else', 'for', 'while', 'def', 'return', 'print', 'input', 'range', 'len', 'sum', 'max', 'min', 'sorted', 'int', 'float', 'str', 'bool', 'list', 'dict', 'set'].includes(name)) {
      vars.add(name);
    }
  }
  if (vars.size === 0) return '';
  return `let ${Array.from(vars).join(', ')};`;
}
