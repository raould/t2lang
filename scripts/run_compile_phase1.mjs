import fs from 'fs';
import path from 'path';
const src = fs.readFileSync('tmp_t2_test.t2', 'utf8');
const api = await import('../phase1/dist/api.js');
const res = await api.compilePhase1(src, { dumpAst: true, dumpAstBeforeExpand: true, dumpAstAfterExpand: true, emitTypes: false, tracePhases: [], prettyOutput: 0, seed: 'debug' });
console.log('errors:', res.errors);
for (const e of res.events || []) {
  if (e.kind === 'astDump') {
    console.log('AST DUMP', e.phase);
    try { console.log(e.data && e.data.ast ? JSON.stringify(e.data.ast, null, 2).slice(0, 2000) : JSON.stringify(e.data).slice(0,2000)); } catch (err) { console.log('print failed', String(err)); }
  }
}
