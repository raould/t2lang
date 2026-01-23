import { compilePhase1 } from '../dist/api.js';

(async () => {
    const result = await compilePhase1(`
      (program
        (defmacro my-macro(x y)
          (call (prop console "log") x y))
        (my-macro 1 2))
      `, { enableTsc: false });
    console.log('errors:', result.errors);
    console.log('events:', JSON.stringify(result.events, null, 2));
    console.log('tsSource:', result.tsSource);
})();