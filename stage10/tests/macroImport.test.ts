import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';
import fs from 'fs';
import path from 'path';
import os from 'os';

it('macro import/export syntax', { timeout: 30000 }, () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'macro-import-test-'));
    const macroPath = path.join(tmpDir, 'myMacros.t2m');
    fs.writeFileSync(macroPath, `(program
      (defmacro identity (x)
        (return x))
      (macro-export identity))`);

    fromSourceEndToEnd(`(program
      (macro-import m "${macroPath}")
      (const (x) (m/identity 42))
      (console.log x))`);

    console.log(tmpDir);
    // fs.rmSync(tmpDir, { recursive: true });
});
