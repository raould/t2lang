import { test, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { spawnSync } from 'child_process';

const tempDir = path.join(__dirname, 'temp_macro_test');

if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
}

test('macro loading and execution', () => {
  const macroFile = path.join(tempDir, 'm.t2m');
  const inputFile = path.join(tempDir, 'input.t2');

  // 1. Define a macro in .t2m
  // The macro 'my_const' expands to (const name value)
  // Since quasiquotes are not yet fully supported in compiled macros (Phase 3 limitation),
  // we manually construct the AST node for 'const-stmt'.
  // Note: parameters must be parenthesized -> ((name) (value))
  const macroSource = `(program
    (defmacro my_const ((name) (value))
      (return (object
        (tag 'const')
        (name (. name name)) ;; Extract name string from identifier node
        (init value)
        (id (. name id))
        (text 'generated-by-macro'))))
    (macro-export my_const))`;

  fs.writeFileSync(macroFile, macroSource);

  // 2. Use the macro in .t2
  // We currently rely on CWD-relative resolution or absolute paths for macro-import.
  // Using absolute path here.
  const inputSource = `(program
    (macro-import mm "${macroFile}")
    (mm/my_const x 42)
    (console.log x))`;
  
  fs.writeFileSync(inputFile, inputSource);

  // 3. Compile input.t2
  // We run from stage8 directory context to ensure index.ts is found
  const stage8Dir = path.resolve(__dirname, '..');
  const res = spawnSync('npx', ['tsx', 'index.ts', inputFile], {
    encoding: 'utf-8',
    cwd: stage8Dir,
    env: { ...process.env }
  });

  if (res.status !== 0) {
    console.error('Compilation failed:');
    console.error(res.stderr);
    console.error('Stdout:');
    console.error(res.stdout);
  }
  expect(res.status).toBe(0);

  const outputToken = res.stdout;
  
  // 4. Verify output contains 'const x = ...'
  // Note: emitter puts a space for type annotation placeholder
  expect(outputToken).toMatch(/const x\s+= 42;/);
  expect(outputToken).toContain('console.log(x)');

  // Cleanup
  fs.rmSync(tempDir, { recursive: true, force: true });
});
