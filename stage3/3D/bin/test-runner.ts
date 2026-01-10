import {execSync, spawnSync} from "node:child_process";
import {readdirSync, writeFileSync, mkdtempSync, rmSync, readFileSync, existsSync} from "node:fs";
import {tmpdir} from "node:os";
import path from "node:path";
import util from "node:util";

const ROOT = path.resolve(__dirname, "..");
const TESTS_DIR = path.join(ROOT, "tests");
const COMPILER = path.join(ROOT, "index.ts");

// ── helpers ─────────────────────────────────────

function run(cmd: string, cwd = ROOT) {
  // return full spawnSync result so caller can inspect stdout/stderr/status
  return spawnSync(cmd, {cwd, encoding: "utf-8", stdio: "pipe", shell: true});
}

function bold(s: string) {return `\x1b[1m${s}\x1b[0m`;}
function green(s: string) {return `\x1b[32m${s}\x1b[0m`;}
function red(s: string) {return `\x1b[31m${s}\x1b[0m`;}
function dim(s: string) {return `\x1b[2m${s}\x1b[0m`;}

// ── compile each test, then run it ─

let files = readdirSync(TESTS_DIR)
  .filter((f) => f.endsWith(".test.t2"))
  .sort();

let args = [...process.argv]
const tee = args.includes("--tee");
args = args.filter(a => a != "--tee");
if (args.length > 2) {
  const desired = args.slice(2);
  files = files.filter((f) => desired.some((t) => f.includes(t)));
}

const tmpDir = mkdtempSync(path.join(tmpdir(), "stage3-tests-"));

let passed = 0;
let failed = 0;
const failures: {file: string; stage: string; error: string, stdout: string}[] = [];

for (const file of files) {
  const testPath = path.join(TESTS_DIR, file);
  const name = file.replace(/\.test\.t2$/, "");
  process.stdout.write(`  ${name} ... `);

  // compile .t2 → TypeScript
  let tsOutput: string;
  try {
    const res = run(`npx tsx ${COMPILER} ${testPath}`);
    // if compiler wrote to stderr or exited nonzero, treat as compile failure
    if ((res.stderr && res.stderr.toString().trim() !== '') || res.status !== 0) {
      throw new Error(res.stderr || (`exit code ${res.status}`));
    }
    tsOutput = res.stdout as string;
    if (tee) { console.log(JSON.stringify(tsOutput)); }
  } catch (e: any) {
    failed++;
    console.log(red("FAIL (compile)"));
    failures.push({file, stage: "compile", error: (e.stderr || e.message).trim()});
    continue;
  }

  // write to temp file and run with tsx
  const tmpFile = path.join(tmpDir, name + ".ts");
  writeFileSync(tmpFile, tsOutput);
  const result = spawnSync("npx", ["tsx", tmpFile], {
    cwd: ROOT,
    encoding: "utf-8",
    timeout: 10_000,
    shell: true,
  });
  const stdout = (result.stdout || "").trim();
  const stderr = (result.stderr || "").trim();

  if (result.status !== 0) {
    failed++;
    console.log(red("FAIL (run)"));
    failures.push({
      file,
      stage: "run",
      error: (stderr || stdout).split("\n").slice(0, 6).join("\n"),
      stdout
    });
  } else if (stderr.includes("Assertion failed")) {
    failed++;
    console.log(red("FAIL (assert)"));
    failures.push({
      file,
      stage: "assert",
      error: stderr,
      stdout
    });
    } else {
    passed++;
    if (stdout) {
      console.log(green("OK") + dim(` → ${stdout.split("\n")[0]}`));
    } else {
      console.log(green("OK"));
    }
  }
}

// ── cleanup ─────────────────────────────────────

rmSync(tmpDir, {recursive: true, force: true});

// ── summary ─────────────────────────────────────

console.log();
console.log(bold("Results:") + ` ${green(`${passed} passed`)}, ${failed > 0 ? red(`${failed} failed`) : `${failed} failed`}, ${files.length} total`);

if (failures.length > 0) {
  console.log();
  for (const f of failures) {
    console.log(red(`FAIL ${f.file}`) + ` (${f.stage}):`);
    console.log("---");
    console.log(f.stdout);
    console.log("---");
    console.log(dim(f.error.split("\n").slice(0, 6).join("\n")));
    console.log();
  }
  process.exit(1);
}
