import { test, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { spawnSync } from 'child_process';
import { fileURLToPath } from 'url';
import { compile } from '../index';

// Handling __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const tempDir = path.join(__dirname, 'temp_transitive_test');

if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
}

// Helper to cleanup
const cleanup = () => {
    fs.rmSync(tempDir, { recursive: true, force: true });
};

test('transitive macro import', () => {
  const bPath = path.join(tempDir, 'b.t2m');
  const aPath = path.join(tempDir, 'a.t2m');
  const mainPath = path.join(tempDir, 'main.t2');

  // b.t2m: exports a macro 'def_value'
  // (def_value name val) -> (const (name) val)
  // We constructs a const-decl AST node manually
  const bSource = `(program
    (defmacro def_value (nameNode valNode)
       (return (object
          (tag 'const-decl')
          (name (. nameNode text))
          (init valNode)
       )))
    (macro-export def_value))`;

  fs.writeFileSync(bPath, bSource);

  // a.t2m: imports b.t2m (qualified), uses b/def_value
  const aSource = `(program
    (macro-import b "${bPath}")

    ;; Use the macro from b.t2m (qualified)
    (b/def_value MY_CONST 100)

    ;; Export a macro that returns the value of MY_CONST as a literal node
    (defmacro get_const ()
        (return (object
                (tag 'literal')
                (value MY_CONST)
                (raw (String MY_CONST))
        )))
    (macro-export get_const))`;

  fs.writeFileSync(aPath, aSource);

  // main.t2: imports a.t2m (qualified)
  const mainSource = `(program
    (macro-import a "${aPath}")
    (const (x) (a/get_const))
    ((. console log) (+ "Result: " x)))`;

  fs.writeFileSync(mainPath, mainSource);

  // Compile and Run
  let compiledJs: string;
  try {
    compiledJs = compile({ filePath: mainPath });
  } catch (e: any) {
    console.error(e.message);
    expect.unreachable('Compilation failed');
    return;
  }
  
  // Now run the compiled JS
  const runRes = spawnSync('node', ['-e', compiledJs], {
      encoding: 'utf-8'
  });
  
  if (runRes.status !== 0) {
      console.error(runRes.stderr);
  }
  
  expect(runRes.status).toBe(0);
  expect(runRes.stdout.trim()).toContain("Result: 100");

  cleanup();
});
