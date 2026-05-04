import { compile } from './src/index.ts';

const r = compile({filePath: '-', input: `(program (const (({x y} obj))))`});
console.log('Status:', r.status);
console.log('Stderr:', r.stderr);
console.log('Stdout:', r.stdout);
