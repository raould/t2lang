import * as api from '../t2lang-phase0/src/api.ts';

async function main() {
    const oldErr = console.error;
    let captured = '';
    console.error = (...args) => { captured += args.join(' ') + '\n'; };
    process.env.T2_DEBUG_PARSE = '1';
    console.log('ENV_AT_SCRIPT=' + process.env.T2_DEBUG_PARSE);
    const res = await api.compilePhase0('(program)', { dumpAst: false });
    console.error = oldErr;
    console.log('CAPTURED:' + JSON.stringify(captured));
    console.log('RESULT ERRORS:' + JSON.stringify(res.errors));
    console.log('RESULT EVENTS:' + JSON.stringify(res.events.map(e => ({ phase: e.phase, kind: e.kind }))));
}

main();
