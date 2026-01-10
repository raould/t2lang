import test from 'node:test';
import assert from 'node:assert/strict';
import { Parser } from '../../src/parse/parser.js';

function parse(src) {
    const p = new Parser('input.t2', src, { config: {}, eventSink: { emit: () => { } } });
    return p.parseProgram();
}

test('type-object sugar with colon and bare type-ref', () => {
    const src = `(program
    (type-alias A (type-object (field "video" : Video) (field 'audio : Audio)))
  )`;

    const ast = parse(src);
    // ensure AST contains a type-alias named A
    const ta = ast.body.find(s => s.kind === 'type-alias');
    assert(ta, 'type-alias A not found');
    assert(ta.name.name === 'A');
    // fields present
    const fields = ta.typeAnnotation.fields;
    const names = fields.map(f => f.name).sort();
    assert.deepEqual(names, ['audio', 'video']);
});
