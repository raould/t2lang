#!/usr/bin/env node
import fs from "node:fs/promises";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { compilePhaseA } from "./api.js";

async function readStdin(): Promise<string> {
  return new Promise((resolve, reject) => {
    let buffer = "";
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", (chunk) => {
      buffer += chunk;
    });
    process.stdin.on("end", () => resolve(buffer));
    process.stdin.on("error", reject);
  });
}

async function readSource(source: string): Promise<string> {
  if (!source || source === "-") {
    return readStdin();
  }
  return fs.readFile(source, "utf8");
}

export async function main(argv: string[]): Promise<void> {
  const args = argv.slice(2);
  const inputPath = args[0] ?? "-";
  const raw = await readSource(inputPath);
  const result = await compilePhaseA(raw);
  console.log(result.tsSource);
}

if (fileURLToPath(import.meta.url) === process.argv[1]) {
  main(process.argv).catch((err) => {
    console.error(err);
    process.exit(1);
  });
}