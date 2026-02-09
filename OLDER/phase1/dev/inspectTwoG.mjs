import { compilePhase1 } from '../dist/api.js';

async function run() {
    const src = `
(program
  (defmacro twoG () (let* ((a (gensym "x")) (b (gensym "x"))) (quote (array ~a ~b))))
  (call (prop console "log") (twoG)))
`;
    const res = await compilePhase1(src, { enableTsc: false });
    console.log('errors:', res.errors);
    console.log('ts:', res.tsSource);
}

run().catch(err => console.error(err));