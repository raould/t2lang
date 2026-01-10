import { readdirSync, rm } from "node:fs";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const scriptDir = resolve(fileURLToPath(new URL(".", import.meta.url)));

const collectFiles = (dir, ext) => {
  const files = [];
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      collectFiles(fullPath, ext);
      continue;
    }
    if (!entry.isFile()) {
      continue;
    }
    if (!entry.name.endsWith(`.${ext}`)) {
      continue;
    }
    files.push(fullPath);
  }
  return files;
};

const oldTs = collectFiles(scriptDir, "ts");
const oldJs = collectFiles(scriptDir, "js");
for (const file of [...oldTs, ...oldJs]) {
  rm(file, { force: true });
}

const testFiles = collectFiles(scriptDir, "t2");
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
