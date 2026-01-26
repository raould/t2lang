#!/usr/bin/env node
/**
 * T2 Phase 0 Compiler CLI
 * 
 * Usage:
 *   t2c <input.t2> [options]
 *   t2c - [options]                   # read from stdin
 *   cat file.t2 | t2c -               # pipe input
 * 
 * Examples:
 *   t2c helloworld.t2                 # produces helloworld.ts
 *   t2c helloworld.t2 -o out.ts       # produces out.ts
 *   t2c helloworld.t2 --stdout        # prints to stdout
 *   t2c -                             # read from stdin, write to stdout
 *   t2c - -o out.ts                   # read from stdin, write to file
 *   echo '(program (foo 1))' | t2c -  # pipe input
 * 
 * Options:
 *   -o, --output <file>   Output file path (default: input with .ts extension)
 *   --stdout              Print output to stdout instead of file
 *   --ast                 Print AST dump to stderr
 *   --pretty-option       <ugly|pretty>  Set pretty mode (default: pretty)
 *   -h, --help            Show this help message
 *   -v, --version         Show version
 */

import { compilePhase0 } from "./api.js";
import { runCli } from "t2lang-common";
import { PrettyOption } from "./codegen/tsCodegen.js";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

await runCli("Phase0", compilePhase0, PrettyOption, path.join(__dirname, "..", "package.json"));
