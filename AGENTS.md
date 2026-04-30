# t2lang

A bootstrapping compiler chain (stage3 → ... → stage100) that compiles s-expression source files (`.s8`, `.s7`, `.s6`, `.s5`) to TypeScript.

## Code Style & Conventions

- Read STYLE_GUIDE.md.
- use Stage9/Stage9/g4 syntax.

## Project Structure

- `stage100/` — current compiler stage (`.s8` sources → `.ts` outputs)
- `stage8/` — previous stage compiler (used to build stage100)
- `stage100/Stage9*.s8` — compiler source files (edit these, not the `.ts` outputs)
- `stage100/Stage9-tags.ts`, `Stage9-debug.ts`, `Stage9-parse-form.ts` — hand-authored TypeScript (not compiled)
- `stage100/index.ts` — compiled from `Stage9.s8` (main entry point)
- `stage100/tests/` — test suite (Vitest)
- `bin/t2tc.js`, `bin/t2jc.js`, `bin/t2run.js` — CLI wrappers
- `index.ts` — root re-export: `export { compile } from "./stage100/index.ts"`
- `build.shk` — MiniShake build file

## Build & Commands

```sh
# Install all stage dependencies
npm run modules

# Build the compiler (compile all .s8 → .ts)
npm run build            # or: shk build build-compiler

# Run tests (includes build)
npm test

# Run tests only (no rebuild)
npm run testnow

# Run tests directly
# Do not run "vitest --typecheck" from any other directory.
cd stage100 && npx vitest --typecheck run
```

Always run vitest as `npx vitest --typecheck run` — never bare `vitest run`.

## Architecture

- **Programmatic API only:** `compile()` is the sole public API — never process `argv` in compiler source
- **CLI wrappers** (`bin/t2*.js`) are the only place that parses command-line arguments; they convert flags to `compile()` config
- **Import:** `import { compile } from "t2lang"`
- **Source → output mapping:** `Stage9-foo.s8` → `Stage9-foo.ts`; exception: `Stage9.s8` → `index.ts`
- **Never edit `.ts` files** that are compiled from `.s8` sources — they get overwritten on build

## Testing

- Framework: Vitest (with `--typecheck`)
- Tests live in `stage100/tests/`
- Tests call `compile()` programmatically — no subprocess spawning
- Helper pattern:
  ```typescript
  import { compile } from '../index';
  const result = compile({ filePath: '-', input: t2Source });
  ```

## Security

- Never commit secrets or credentials
- CLI wrappers validate and sanitize user input before passing to `compile()`
- `compile()` operates on file contents only — no shell execution

## General Notes

- Object literal keys are bare identifiers (no quotes for simple keys)
- Literal forms `{ ... }` vs. `(obj ...)`, `[ ... ]` vs. `(array ...)` compile to identical JavaScript, so prefer the literal forms.
- Paren balance is critical — verify with a depth-checking script before committing changes.
