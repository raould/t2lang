import { compilePhase1 } from '../dist/api.js';

(async () => {
    const src = `(program
    (defmacro swap (a b)
      (let* ((tmp (gensym "tmp")))
      (quote (let* ((~tmp ~a))
      (assign ~a ~b)
      (assign ~b ~tmp)))))
    (let* ((x 1) (y 2) (tmp 999))
    (swap x y)
    (array x y tmp)))`;
    const r = await compilePhase1(src, { enableTsc: false });
    if (r.errors.length > 0) console.error(r.errors);
    console.log('TS:', r.tsSource);
    console.log('EVENTS:', JSON.stringify(r.events, null, 2));
})();