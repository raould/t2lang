import { compilePhase1 } from '../src/api.js';

(async ()=>{
  const src = `
    (program
      (defmacro call-with-list (lst) (quote (call (prop console "log") ~@lst)))
      (call-with-list (array 1 2 3)))
  `;
  const res = await compilePhase1(src, { enableTsc: false });
  console.log(JSON.stringify(res, null, 2));
})();