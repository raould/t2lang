#!/usr/bin/env ts-node
import fs from "fs";
import path from "path";

// simple helper that locates t2 test definitions inside the existing
// `tests/**/*.test.ts` files.  Usage:
//
//   npm run tsx bin/test-runner.ts "(program ... )"
//
// The argument is treated as a substring to look for in each test file's
// source; if it is wrapped in backticks the quotes are stripped.  For any
// matching file we extract the literal S-expression that was passed to
// `fromSourceEndToEnd` and print it to stdout.

const arg = process.argv[2];
if (!arg) {
  console.error("usage: test-runner.ts <pattern>");
  process.exit(1);
}
let pattern = arg;
if (pattern.startsWith("`") && pattern.endsWith("`")) {
  pattern = pattern.slice(1, -1);
}

const testsDir = path.resolve(__dirname, "..", "tests");

function listTestFiles(dir: string): string[] {
  let results: string[] = [];
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      results = results.concat(listTestFiles(full));
    } else if (stat.isFile() && name.endsWith(".test.ts")) {
      results.push(full);
    }
  }
  return results;
}

const files = listTestFiles(testsDir);

files.forEach((filePath) => {
  if (filePath.includes(pattern)) {
    const txt = fs.readFileSync(filePath, "utf8");
    const m = txt.match(/fromSourceEndToEnd\(`([\s\S]*?)`\)/);
    const rel = path.relative(testsDir, filePath);
    if (m) {
      process.stdout.write(m[1] + "\n");
    } else {
      process.stderr.write(`--- ${rel} (no sexpr found) ---\n`);
    }
  }
});
