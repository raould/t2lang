# Stage 0 Minimal Calculus

T2lang is purely a transpiler from a sexpr syntax to TypeScript syntax. Every t2lang file must be transpiled to TypeScript and then executed via the TypeScript runtime environment (e.g., Node or browsers). t2lang itself never runs TypeScript code nor performs extensive TypeScript-style typechecking beyond what the shared resolver/typechecker helpers expose—the ultimate execution path always depends on explicitly invoking `tsc`/`node` or equivalent.

## *Goal: Parse s-expressions and emit TypeScript strings.*

This is the “bare metal” of your language.
**Do *not* introduce any TypeScript-specific syntax here.**

**Capabilities**
- Parser using antlr.
- AST and codegen implemented in TypeScript.
- Tokenizer for parentheses, symbols, numbers, strings.
- S-expression parser → nested arrays.
- no TypeScript types.
- A dispatcher that maps a tiny set of forms to TypeScript strings:
  - `(raw "...")` → escape hatches for TS fragments, emit string directly.
  - `(lambda ((x) (y)) ...)` → `(x, y) => { ... }`
  - `(let* ((x 1) (y 2)))` → `let x = 1; let y = 2;`

## Pipeline

source text
   ↓
ANTLR lexer/parser
   ↓
parse tree (CST)
   ↓
AST builder (tree → AST)
   ↓
codegen (AST → TS)
   ↓
output.ts
