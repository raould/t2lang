import('../phase1/src/api.js').then(async ({ compilePhase1 }) => {
  const src = `(program (defmacro mknew (C) (quote (new ~C (array 1)))) (mknew Foo))`;
  const res = await compilePhase1(src, { enableTsc: false });
  console.log('errors:', JSON.stringify(res.errors, null, 2));
  console.log('tsSource:\n', res.tsSource);
  const ae = res.events.find(e => e.phase === 'expand' && e.kind === 'astDump');
  if (ae) console.log('expand ast:\n', JSON.stringify((ae).data.ast, null, 2));
});