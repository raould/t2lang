import { it, expect } from 'vitest';
import path from 'path';
import { compile } from '../index';

it('emits macro runtime code for .t2m files', () => {
    const macroFile = path.resolve(__dirname, 'temp_macro.t2m');
    const source = `(program
        (defmacro my_macro (x y)
            (list 'call 'print x y)))`;

    const output = compile({ filePath: macroFile, input: source });

    // defmacro in .t2m files emits a comment stub (body is interpreted at expansion time)
    expect(output).toContain('// macro: my_macro');
});
