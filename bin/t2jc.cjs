#!/usr/bin/env node
const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

function usage() {
	console.error("Usage: t2jc <input.t2...> [t2b options] [-- <tsc args>]");
	process.exit(1);
}

const rawArgs = process.argv.slice(2);
if (rawArgs.length === 0) {
	usage();
}

const dashIndex = rawArgs.indexOf("--");
const t2bArgs = dashIndex === -1 ? rawArgs : rawArgs.slice(0, dashIndex);
const extraTsc = dashIndex === -1 ? [] : rawArgs.slice(dashIndex + 1);

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

if (inputs.length === 0) {
	usage();
}

const cliPath = path.join(__dirname, "../phaseB/dist/cli.js");
if (!fs.existsSync(cliPath)) {
	console.error("t2b CLI not found at", cliPath);
	process.exit(1);
}

const compileResult = spawnSync(process.execPath, [cliPath, ...t2bArgs], { stdio: "inherit" });
if (compileResult.error) {
	console.error("Failed to run t2b:", compileResult.error);
	process.exit(1);
}
if (compileResult.status !== 0) {
	process.exit(compileResult.status ?? 1);
}

const outputIndex = t2bArgs.findIndex((arg) => arg === "-o" || arg === "--output");
const outputArg = outputIndex >= 0 ? t2bArgs[outputIndex + 1] : undefined;
const outputPath = outputArg && outputArg !== "-" ? outputArg : undefined;
if (inputs.includes("-") || outputArg === "-") {
	console.error("t2jc does not support stdin/stdout when compiling to JS");
	process.exit(1);
}
if (inputs.length > 1 && outputPath) {
	console.error("t2jc does not support --output with multiple input files");
	process.exit(1);
}

const tsFiles = outputPath
	? [outputPath]
	: inputs.map((file) => {
			const parsed = path.parse(file);
			return path.join(parsed.dir || ".", `${parsed.name}.ts`);
		});

const tscArgs = [...tsFiles, ...extraTsc];
function tryRun(cmd, args) {
	try {
		return spawnSync(cmd, args, { stdio: "inherit" });
	} catch (error) {
		return { error };
	}
}

let result = tryRun("npx", ["tsc", ...tscArgs]);
if ("error" in result) {
	const maybeErr = result.error;
	if (maybeErr && typeof maybeErr === "object" && "code" in maybeErr && maybeErr.code === "ENOENT") {
		const tsBin = path.join(process.cwd(), "node_modules", "typescript", "bin", "tsc");
		if (fs.existsSync(tsBin)) {
			result = tryRun(process.execPath, [tsBin, ...tscArgs]);
		} else {
			result = tryRun("npm", ["exec", "--no", "install", "tsc", "--", ...tscArgs]);
		}
	}
}
if ("error" in result) {
	console.error("Failed to run tsc:", result.error);
	process.exit(1);
}

process.exit(result.status ?? 0);
