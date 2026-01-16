import('../phase1/src/api.js').then(async ({ compilePhase1 }) => {
  const src = `(program (defmacro mkretarr (lst) (quote (return (array ~@lst)))) (mkretarr (array 1 2)))`;
  const res = await compilePhase1(src, { enableTsc: false });
  console.log('errors:', res.errors.length);
  console.log('tsSource:\n', res.tsSource);
  if (res.events) {
    const e = res.events.find(e => e.phase === 'expand' && e.kind === 'astDump');
    if (e) console.log('expand ast:\n', JSON.stringify((e).data.ast, null, 2));
  }
});