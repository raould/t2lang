import { readdirSync } from "node:fs";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const scriptDir = resolve(fileURLToPath(new URL(".", import.meta.url)));
const testFiles = [];

const collectTests = (dir) => {
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      collectTests(fullPath);
      continue;
    }
    if (!entry.isFile()) {
      continue;
    }
    if (!entry.name.endsWith(".t2")) {
      continue;
    }
    testFiles.push(fullPath);
  }
};

collectTests(scriptDir);
console.log(`Found ${testFiles.length} t2 source files.`);

if (testFiles.length === 0) {
  process.exit(0);
}

const result = spawnSync(
  process.execPath,
  ["bin/t2jc.cjs", ...testFiles],
  { stdio: "inherit" }
);

process.exit(result.status ?? 1);
