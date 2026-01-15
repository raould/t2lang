import { compilePhase1 } from "./src/api.js";

async function main() {
  const src = `
    (program
      (defmacro call-with-list (lst) (quote (call (prop console "log") ~@lst)))
      (call-with-list (array 1 2 3)))
  `;
  const result = await compilePhase1(src, { enableTsc: false });
  console.log('---TS_SOURCE---');
  console.log(result.tsSource);
  console.log('---ERRORS---');
  console.log(JSON.stringify(result.errors, null, 2));
}

main().catch(e => { console.error(e); process.exit(1); });