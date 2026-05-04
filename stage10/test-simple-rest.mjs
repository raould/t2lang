import { compileSource as t2compile } from './index.ts';

const src = `(program
  (const (({x ...rest} obj)))
)`;

console.log("Compiling...");
try {
  const result = t2compile({ source: src });
  console.log("SUCCESS:", result.substring(0, 200));
} catch (e) {
  console.log("ERROR:", e.message);
}
