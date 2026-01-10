import { compilePhase1 } from './t2lang-phase1/src/api.js';

async function run() {
    const src = `
    (program
      (defmacro call-with-list (lst) (quote (call (prop console "log") ~@lst)))
      (call-with-list (array 1 2 3)))
  `;
    const result = await compilePhase1(src, { enableTsc: false });
    if (result.errors.length > 0) { console.error(result.errors); }
    console.log('--- TS SOURCE START ---');
    console.log(result.tsSource);
    console.log('--- TS SOURCE END ---');
}

run().catch(e => { console.error(e); process.exit(1); });
