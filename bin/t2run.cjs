#!/usr/bin/env node
const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

function usage() {
	console.error("Usage: t2run <input.t2> [t2b options] [-- <node args>]");
	process.exit(1);
}

const rawArgs = process.argv.slice(2);
if (rawArgs.length === 0) {
	usage();
}

const dashIndex = rawArgs.indexOf("--");
const t2bArgs = dashIndex === -1 ? rawArgs : rawArgs.slice(0, dashIndex);
const nodeArgs = dashIndex === -1 ? [] : rawArgs.slice(dashIndex + 1);

const t2jcPath = path.join(__dirname, "./t2jc.cjs");
if (!fs.existsSync(t2jcPath)) {
	console.error("t2jc not found at", t2jcPath);
	process.exit(1);
}

const compileResult = spawnSync(process.execPath, [t2jcPath, ...t2bArgs], { stdio: "inherit" });
if (compileResult.error) {
	console.error("Failed to run t2jc:", compileResult.error);
	process.exit(1);
}
if (compileResult.status !== 0) {
	process.exit(compileResult.status ?? 1);
}

const optionArgs = new Set([
	"-o",
	"--output",
	"--seed",
	"--pretty-option",
	"--log-level",
	"--log-phases",
	"--trace-phases",
	"--error-format",
]);
const flagArgs = new Set([
	"--stdout",
	"--log",
	"--trace",
	"--dump-ast",
	"--color",
	"--no-color",
	"--warn-no-return-any",
	"--warn-return-expected",
]);

const inputs = [];
for (let i = 0; i < t2bArgs.length; i += 1) {
	const arg = t2bArgs[i];
	if (optionArgs.has(arg)) {
		i += 1;
		continue;
	}
	if (flagArgs.has(arg)) {
		continue;
	}
	if (arg.startsWith("-")) {
		continue;
	}
	inputs.push(arg);
}

if (inputs.length !== 1) {
	console.error("t2run requires exactly one input file");
	process.exit(1);
}

const outputIndex = t2bArgs.findIndex((arg) => arg === "-o" || arg === "--output");
const outputArg = outputIndex >= 0 ? t2bArgs[outputIndex + 1] : undefined;
const outputPath = outputArg && outputArg !== "-" ? outputArg : undefined;
if (inputs.includes("-") || outputArg === "-") {
	console.error("t2run does not support stdin/stdout when compiling to JS");
	process.exit(1);
}

const tsFile = outputPath
	? outputPath
	: (() => {
			const parsed = path.parse(inputs[0]);
			return path.join(parsed.dir || ".", `${parsed.name}.ts`);
		})();

const jsFile = (() => {
	const parsed = path.parse(tsFile);
	return path.join(parsed.dir || ".", `${parsed.name}.js`);
})();

const runResult = spawnSync(process.execPath, [jsFile, ...nodeArgs], { stdio: "inherit" });
process.exit(runResult.status ?? 1);
