import { compilePhase1 } from '../dist/api.js';

(async () => {
    const result = await compilePhase1(`
    (program
      (defmacro mkblock (name val) (quote (block (let* ((~name ~val)) ~name))))
      (mkblock x 5))
  `, { enableTsc: false });
    console.log('errors:', result.errors);
    console.log('events:', JSON.stringify(result.events, null, 2));
    console.log('tsSource:\n', result.tsSource);
})();