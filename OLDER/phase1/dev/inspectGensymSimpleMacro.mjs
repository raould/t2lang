import { compilePhase1 } from '../dist/api.js';

(async () => {
    const src = `(program
    (defmacro mk() (let* ((x (gensym "tmp"))) (quote (let* ((~x 1)) ~x))))
    (mk))`;
    const r = await compilePhase1(src, { enableTsc: false });
    console.log('ERRORS:', JSON.stringify(r.errors, null, 2));
    console.log('TS:', r.tsSource);
    console.log('EVENTS:', JSON.stringify(r.events, null, 2));
})();