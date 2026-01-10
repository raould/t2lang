import { compilePhase1 } from '../dist/api.js';

async function run() {
    const programs = {
        mkblock: `
(program
  (defmacro mkblock (name val) (quote (block (let* ((~name ~val)) ~name))))
  (mkblock x 5))
`,
        mkassign: `
(program
  (defmacro mkassign (target val) (quote (assign ~target ~val)))
  (let* ((x 1)) (mkassign x 2) x)
`,
        asnum: `
(program
  (defmacro asnum (x) (quote (type-assert ~x (type-ref "number"))))
  (call (prop console "log") (asnum 1)))
`,
        mknew2: `
(program
  (defmacro mknew2 (C args) (quote (new ~C ~args)))
  (mknew2 Foo (array 1 2 3)))
`,
        mkindex: `
(program
  (defmacro mkindex (arr idx) (quote (index ~arr ~idx)))
  (let* ((a (array 10 20)))
    (call (prop console "log") (mkindex a 0))))
`,
        mkchain: `
(program
  (defmacro mkchain (obj name) (quote (prop ~obj ~name)))
  (call (prop console "log") (mkchain console "error")))
`    };

    for (const [k, src] of Object.entries(programs)) {
        const result = await compilePhase1(src, { enableTsc: true });
        console.log('===', k, '===');
        if (result.errors.length > 0) console.error('errors:', result.errors);
        // Print parse/expand ast dumps if present
        for (const ev of result.events) {
            if (ev.phase === 'parse' && ev.kind === 'astDump') {
                console.log('PARSE AST DUMP:', JSON.stringify(ev.data.ast, null, 2));
            }
            if (ev.phase === 'expand' && ev.kind === 'astDump') {
                console.log('EXPAND AST DUMP:', JSON.stringify(ev.data.ast, null, 2));
            }
        }
        console.log('TS SOURCE:\n', result.tsSource);
    }
}

run().catch(err => { console.error(err); process.exit(1); });