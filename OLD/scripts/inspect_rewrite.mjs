import fs from 'fs';
import { rewriteSugar, parseToNodes } from '../phase1/dist/parse/sugarRewrite.js';
const src = fs.readFileSync('tmp_t2_test.t2', 'utf8');
console.log('ORIGINAL:\n', src);
const rew = rewriteSugar(src);
console.log('REWRITTEN:\n', rew);
const nodes = parseToNodes(src);
console.log('PARSED NODES:', JSON.stringify(nodes, null, 2).slice(0,4000));
