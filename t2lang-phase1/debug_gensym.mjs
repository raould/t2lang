import { compilePhase1 } from './src/api.js';

async function run() {
    const src = `
    (program
      (defmacro make-temp-fn (val)
        (let* ((tmp (gensym "tmp")))
          (quote (fn f () (let* ((~tmp ~val)) ~tmp)))))
      (let* ((tmp 999))
        (make-temp-fn 42)
        tmp))
  `;
    const result = await compilePhase1(src, { enableTsc: false });
    console.log('errors.length=', result.errors.length);
    if (result.errors.length > 0) { console.error(result.errors); }
    console.log('events.length=', result.events.length);
    console.log('events=', JSON.stringify(result.events, null, 2));
    console.log('--- TS SOURCE START ---');
    console.log(result.tsSource);
    console.log('--- TS SOURCE END ---');
}

run().catch(e => { console.error(e); process.exit(1); });
