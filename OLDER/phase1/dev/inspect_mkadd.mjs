import { compilePhase1 } from '../src/api.js';

(async ()=>{
  const src = `
    (program
      (defmacro mkadd (n) (quote (+ ~n ~n)))
      (mkadd (mkadd 2)))
  `;
  const res = await compilePhase1(src, { enableTsc: false });
  console.log('errors:', res.errors);
  console.log('tsSource:\n', res.tsSource);
})();