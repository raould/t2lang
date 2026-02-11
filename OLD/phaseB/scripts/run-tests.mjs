import { readdirSync } from "node:fs";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const scriptDir = resolve(fileURLToPath(new URL(".", import.meta.url)));
const rootDir = resolve(scriptDir, "..");
const testsDir = resolve(rootDir, "tests");
const skipSegment = `${join("tests", "integration", "examples")}/`;

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
    if (!entry.name.endsWith(".test.ts")) {
      continue;
    }
    const relPath = fullPath.replace(`${rootDir}/`, "");
    if (relPath.includes(skipSegment)) {
      continue;
    }
    testFiles.push(fullPath);
  }
};

collectTests(testsDir);

if (testFiles.length === 0) {
  process.exit(0);
}

const result = spawnSync(
  process.execPath,
  ["--import", "tsx", "--test", ...testFiles],
  { stdio: "inherit" }
);

process.exit(result.status ?? 1);
