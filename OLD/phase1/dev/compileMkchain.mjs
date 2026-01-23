import { compilePhase1 } from '../dist/api.js';

(async () => {
    const src = `
(program
  (defmacro mkchain (obj name) (quote (prop ~obj ~name)))
  (call (prop console "log") (mkchain console "error")))
`;
    const r = await compilePhase1(src, { enableTsc: false });
    console.log('ERRORS:', JSON.stringify(r.errors, null, 2));
    console.log('TS:', r.tsSource);
    console.log('EVENTS:', JSON.stringify(r.events, null, 2));
})();