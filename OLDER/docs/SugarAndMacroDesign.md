Design: Phase1 sugar responsibilities

Overview

Phase1 provides ergonomic sugar on top of Phase0's small s-expr core. To keep Phase0 minimal and predictable, we split responsibilities:

- Lexer (Phase1 `Lexer`): handles purely lexical/token-level sugar. Examples:
  - Combine dotted identifiers `a.b.c` into a single identifier token so parsers can accept it.
  - Tokenize leading dot-sigil forms `.name:` and `/name:` (both parenthesized and bare forms) into sequences the parser can accept.

- Parser: unchanged Phase0 parser is fed tokens from Phase1's `Lexer`.

- `sugarRewrite` (Phase1 pre-parse rewrite): kept minimal. Performs only generic structural rewrites that do not require deep AST context. Avoids duplicating functionality that belongs in the lexer or macros.

- MacroExpander (Phase1): performs context-aware canonicalization and AST-level transforms. Examples:
  - Normalize `type-object` fields: convert ergonomic forms (colon shorthand, sigils, mixed shapes) into canonical `(name (type-ref "Type"))` entries.
  - Convert dotted identifier names in parsed AST into nested `prop` expressions.

Rationale

- Reader/lexer-level transforms are simplest and fastest when the change is just token-level.
- Macro/AST-level transforms are more robust for context-sensitive rewrites (e.g., only inside `type-object`).
- Keeping `sugarRewrite` small reduces drift from S-expression purity and centralizes behavior in lexer and macro layers.

Guidelines for future sugar

- If it can be expressed as a single token or token sequence, prefer adding a lexer rule.
- If it needs to pattern-match surrounding sexpr structure, implement as a Phase1 macro/expander pass.
- Keep Phase0 unchanged and require that Phase1 produces canonical Phase0 forms before handing off.
