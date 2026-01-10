import('../phase1/src/api.js').then(async ({ compilePhase1 }) => {
  const src = `(program (defmacro two (v) (quote (block (assign ~v 1) (assign ~v (call + ~v 1))))) (let* ((x 0)) (two x) x))`;
  const res = await compilePhase1(src, { enableTsc: false });
  console.log('errors:', JSON.stringify(res.errors, null, 2));
  console.log('tsSource:\n', res.tsSource);
  const e = res.events.find(e => e.phase === 'expand' && e.kind === 'astDump');
  if (e) console.log('expand ast:\n', JSON.stringify((e).data.ast, null, 2));
});