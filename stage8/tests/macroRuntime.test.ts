import { it, expect } from 'vitest';
import { spawnSync } from 'child_process';
import fs from 'fs';
import path from 'path';

it('emits macro runtime code for .t2m files', () => {
    const macroFile = path.resolve(__dirname, 'temp_macro.t2m');
    const source = `(program
        (defmacro my_macro ((x) (y))
            (list 'call 'print x y)))`;
            
    try {
        fs.writeFileSync(macroFile, source);
        
        const res = spawnSync('npx', ['tsx', 'index.ts', macroFile], {
            encoding: 'utf-8',
            cwd: path.resolve(__dirname, '..') // cwd is stage8 root
        });
        
        if (res.status !== 0) {
            throw new Error(`Compilation failed: ${res.stderr}`);
        }
        
        const output = res.stdout;
        
        // Should contain exported function for defmacro
        expect(output).toContain('export function my_macro(args, env) {');
        expect(output).toContain('const [x, y] = args;');
        
    } finally {
        if (fs.existsSync(macroFile)) {
            fs.unlinkSync(macroFile);
        }
    }
});
