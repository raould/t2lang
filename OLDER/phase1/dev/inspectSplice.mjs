import { compilePhase1 } from '../dist/api.js';

(async () => {
    const src = `(program
  (defmacro call-with-list (lst) (quote (call (prop console "log") ~@lst)))
  (call-with-list (array 1 2)))`;
    const r = await compilePhase1(src, { enableTsc: false });
    console.log('ERRORS:', JSON.stringify(r.errors, null, 2));
    console.log('TS:', r.tsSource);
    console.log('EVENTS:', JSON.stringify(r.events, null, 2));
})();