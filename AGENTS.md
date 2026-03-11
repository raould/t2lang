# t2lang

A bootstrapping compiler chain (stage3 → ... → stage10) that compiles s-expression source files (`.s9`, `.s7`, `.s6`, `.s5`) to TypeScript.

## Code Style & Conventions

- Read STYLE_GUIDE.md.
- use Stage10/Stage10.g4 syntax.

## Project Structure

- `stage10/` — current compiler stage (`.s9` sources → `.ts` outputs)
- `stage10/` — previous stage compiler (used to build stage10)
- `stage10/Stage10*.s9` — compiler source files (edit these, not the `.ts` outputs)
- `stage10/Stage10-tags.ts`, `Stage10-debug.ts`, `Stage10-parse-form.ts` — hand-authored TypeScript (not compiled)
- `stage10/index.ts` — compiled from `Stage10.s9` (main entry point)
- `stage10/tests/` — test suite (Vitest)
- `stage10/bin/t2tc.js`, `stage10/bin/t2jc.js`, `stage10/bin/t2run.js` — CLI wrappers
- `index.ts` — root re-export: `export { compile } from "./stage10/index.ts"`
- `build.shk` — MiniShake build file

## Build & Commands

```sh
# Install all stage dependencies
npm run modules

# Build the compiler (compile all .s9 → .ts)
npm run build            # or: shk build build-compiler

# Run tests (includes build)
npm test

# Run tests only (no rebuild)
npm run testnow

# Run tests directly
# Do not run "vitest --typecheck" from any other directory.
cd stage10 && npx vitest --typecheck run
```

Always run vitest as `npx vitest --typecheck run` — never bare `vitest run`.

## Architecture

- **Programmatic API only:** `compile()` is the sole public API — never process `argv` in compiler source
- **CLI wrappers** (`bin/t2*.js`) are the only place that parses command-line arguments; they convert flags to `compile()` config
- **Import:** `import { compile } from "t2lang"`
- **Source → output mapping:** `Stage10-foo.s9` → `Stage10-foo.ts`; exception: `Stage10.s9` → `index.ts`
- **Never edit `.ts` files** that are compiled from `.s9` sources — they get overwritten on build

## Testing

- Framework: Vitest (with `--typecheck`)
- Tests live in `stage10/tests/`
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
