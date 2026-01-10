### Stage 1 Self-Hosting Minimal Core

T2lang is purely a transpiler from a sexpr syntax to TypeScript syntax. Every t2lang file must be transpiled to TypeScript and then executed via the TypeScript runtime environment (e.g., Node or browsers). t2lang itself never runs TypeScript code nor performs extensive TypeScript-style typechecking beyond what the shared resolver/typechecker helpers expose—the ultimate execution path always depends on explicitly invoking `tsc`/`node` or equivalent.

#### *Goal: Rewrite the compiler in its own language.*

**Capabilities**
- The parser is still in antlr.
- The compiler is now written in the language.
- no TypeScript types.
- Still no macros.
- Still no sugar.
- Add minimal conveniences:
  - add `if`
  - add `do`
  - add basic arithmetic lowering

**Why this stage matters**
- You now have a self-hosting system.
- You can evolve the language without touching TypeScript.
