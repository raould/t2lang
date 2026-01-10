# Changelog

## Unreleased

- Phase1: migrate lexical sugar handling into the Phase1 `Lexer` and move context-aware canonicalization into the `MacroExpander`.
  - Dotted identifier tokenization (`a.b.c`) now combines into single identifier tokens and is expanded into nested `prop` expressions during macro expansion.
  - `type-object` field ergonomics: parenthesized dot-sigil forms `(.name: Type)` and colon-shorthand `("name" : Type)` are canonicalized to `(name (type-ref "Type"))` during macro expansion.
  - Removed support for bare sigil forms using `/` or `#` and for bare `.name: Type` without parentheses. Only `(.name: Type)` is supported.

- Tests: added unit tests for lexer tokenization and macro normalization, plus edge-case tests for nested and quoted forms.

