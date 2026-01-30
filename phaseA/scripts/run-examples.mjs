import { readdir, readFile } from "node:fs/promises";
import process from "node:process";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const examplesDir = path.join(repoRoot, "examples");
const cliPath = path.join(repoRoot, "dist", "cli.js");

async function main() {
  const entries = (await readdir(examplesDir)).filter((entry) => entry.startsWith("example_") && entry.endsWith(".t2"));
  if (entries.length === 0) {
    console.info("No example files found.");
    return;
  }

  for (const file of entries) {
    console.info(`=== Running example: ${file} ===`);
    const sourcePath = path.join(examplesDir, file);
    console.info(`    Compiling example: ${file}`);
    run(process.execPath, [cliPath, sourcePath], `compile ${file}`);
    const tsFile = path.join(examplesDir, `${path.basename(file, ".t2")}.ts`);
    const tsContents = await readFile(tsFile, "utf8");
    if (/\b(import|export)\b/.test(tsContents)) {
      console.info(`Skipping tsx run for ${path.basename(tsFile)} (contains import/export).`);
      continue;
    }
    if (/\bthrow\b/.test(tsContents)) {
      console.info(`Skipping tsx run for ${path.basename(tsFile)} (contains throw).`);
      continue;
    }
    console.info(`    Invoking tsx on example: ${file}`);
    run("tsx", [tsFile], `execute ${path.basename(tsFile)}`);
  }
}

function run(cmd, args, label) {
  const result = spawnSync(cmd, args, { cwd: repoRoot, stdio: "inherit" });
  if (result.status !== 0) {
    console.error(`${label} failed (${cmd} ${args.join(" ")})`);
    process.exit(result.status ?? 1);
  }
}

main().catch((err) => {
  console.error("run-examples failed", err);
  process.exit(1);
});
