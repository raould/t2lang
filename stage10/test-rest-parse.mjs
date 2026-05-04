import { compileSource as t2compile } from './stage10/src/index.js';

const src = `(program
  (const (({x ...rest} obj)))
)`;

try {
  const result = t2compile({ source: src });
  console.log("PARSE SUCCESS:");
  console.log(result);
} catch (e) {
  console.log("PARSE ERROR:");
  console.log(e.message);
}
