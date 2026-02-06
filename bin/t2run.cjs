#!/usr/bin/env node
const path = require("node:path");
const { spawnSync } = require("node:child_process");

const cliPath = path.join(__dirname, "../phaseB/dist/cli.js");
const result = spawnSync(process.execPath, [cliPath, ...process.argv.slice(2)], { stdio: "inherit" });
process.exit(result.status ?? 1);
