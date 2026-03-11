import { test, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { spawnSync } from 'child_process';
import { fileURLToPath } from 'url';
import { compile } from '#stage10';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const tempDir = path.join(__dirname, 'temp_splicing');

if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);
const cleanup = () => fs.rmSync(tempDir, { recursive: true, force: true });

test('macro splicing in object', () => {
  const mainT2 = `
    (program
      (macro-import m "./splicing-macro.t2m")
      (const ((o (m/makeObj))))
      (console.log (+ "A: " (. o a)))
      (console.log (+ "X: " (. o x))))
  `;

  const macroT2m = `
    (program
      (defmacro makeObj ()
          (let ((newFields (array
                   (object (x 99)))))
          (return (quasi
            (object
              (a 1)
              (unquote-splicing newFields))))))
      (macro-export makeObj))
  `;
  
  fs.writeFileSync(path.join(tempDir, 'main.t2'), mainT2);
  fs.writeFileSync(path.join(tempDir, 'splicing-macro.t2m'), macroT2m);
  
  let compiledJs: string;
  try {
    compiledJs = compile({ filePath: path.join(tempDir, 'main.t2') });
  } catch (e: any) {
    console.log("Compile failed:", e.message);
    expect.unreachable('Compilation failed');
    return;
  }

  const runRes = spawnSync('node', ['-e', compiledJs], { encoding: 'utf-8' });
  if (runRes.stdout.trim() === '') {
      console.log("Compiled Code:\n", compiledJs);
      console.log("Run Stdout:", runRes.stdout);
      console.log("Run Stderr:", runRes.stderr);
  }
  expect(runRes.stdout).toContain('A: 1');
  expect(runRes.stdout).toContain('X: 99');

  cleanup();
});
