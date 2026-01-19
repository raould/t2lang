Phase 0 EBNF Grammar
=====================

This file presents an EBNF-style grammar for Phase 0 (as implemented by
`t2lang-phase0/src/parse/parser.ts` and `.../lexer.ts`). It documents the
surface S‑expression language accepted by the lexer and parser.

Lexical tokens
--------------
- identifier ::= [A-Za-z0-9_\-*+/<>=!?&|^%~@#$:]+  (letters, digits, `_` and operator symbols)
- number ::= [0-9]+  (integer sequence — lexer currently accepts only digits)
- string ::= " (escaped characters allowed) "
- punct ::= "(" | ")" | "`"  (parentheses and backtick)
- eof

Notes: the lexer treats many operator characters as part of `identifier`, so
operator forms (e.g. `+`, `==`, `>>`) appear as identifier tokens at the
parser level.

Top-level program
------------------
program ::= "(" "program" program-body ")"
program-body ::= statement*

Statements and top-level forms
------------------------------
statement ::= block
            | if-form
            | while-form
            | for-form
            | return-form
            | let*-form
            | const-form
            | assign-form
            | expr-stmt
            | function-decl
            | class-decl
            | import-form
            | export-form
            | type-alias-form

block ::= "(" "block" expr* ")"

if-form ::= "(" "if" expr expr [expr] ")"
while-form ::= "(" "while" expr+ ")"          ; body is one or more exprs
for-form ::= "(" "for" maybe-expr maybe-expr maybe-expr expr* ")"
maybe-expr ::= expr | "_" | "null"
return-form ::= "(" "return" [expr] ")"

let*-form ::= "(" "let*" "(" binding* ")" expr* ")"
binding ::= "(" identifier expr ")" | unquote-splice
const-form ::= "(" "const" "(" binding* ")" expr* ")"

assign-form ::= "(" "assign" expr expr ")"

function-decl ::= "(" "function" identifier "(" param* ")" expr* ")"
function-lambda ::= "(" "fn" [identifier] "(" param* ")" expr* ")"
param ::= identifier

class-decl ::= "(" "class" identifier [identifier] class-member* ")"
class-member ::= "(" "field" string [expr] ")"
               | "(" "method" string "(" param* ")" expr* ")"

import-form ::= "(" import-kind import-spec string ")"
import-kind ::= "import-default" | "import-named" | "import-all"
import-spec ::= identifier                       ; for import-default
              | "(" identifier* ")"           ; for import-named
              | identifier                       ; for import-all (alias)

export-form ::= "(" "export" identifier ")"
              | "(" "export-default" expr ")"

type-alias-form ::= "(" "type-alias" identifier type-sform ")"

Special: unquote-splice ::= "(" "unquote-splice" expr ")"  ; used inside quoted forms

Expressions
-----------
expr ::= identifier
       | literal
       | list-form

literal ::= number | string | boolean | null | undefined
boolean ::= "true" | "false"

list-form ::= "(" identifier expr* ")"  ; S‑expression with identifier head

Common explicit list forms (head identifier values)
----------------------------------------------------
call-form ::= "(" "call" expr expr* ")"          ; explicit call
implicit-call ::= "(" head expr* ")"               ; head is any identifier (operators allowed)
new-form ::= "(" "new" expr expr* ")"
prop-form ::= "(" "prop" expr string ")"
array-form ::= "(" "array" expr* ")"             ; empty list `()` is treated as (array)
object-form ::= "(" "obj" field* ")"
field ::= "(" "field" string expr ")"
index-form ::= "(" "index" expr expr ")"
type-assert-form ::= "(" "type-assert" expr type-sform ")"
throw-form ::= "(" "throw" expr ")"
try-form ::= "(" "try" expr* ["(" "catch" identifier expr* ")"] ["(" "finally" expr* ")"] ")"

Notes on calls: If the list head is not one of the parser's special keywords
it is treated as an implicit call with the head as an identifier AST node.
Because the lexer includes operator characters in identifier tokens, forms
like `(+ 1 2)` parse as an implicit call with head `+`.

Types (structured forms)
------------------------
type-sform ::= string
             | identifier                             ; bare identifier treated as type-ref
             | "(" type-form ")"

type-form ::= "type-string"
            | "type-number"
            | "type-boolean"
            | "type-null"
            | "type-undefined"
            | "type-array" type-sform
            | "type-ref" string
            | "type-literal" literal
            | "type-object" ("(" (string | identifier) [":" ] type-sform ")")*
            | "type-function" "(" type-sform* ")" type-sform
            | "type-union" type-sform+
            | "type-intersection" type-sform+

Examples:
- (type-array (type-number))
- (type-object ("x" (type-number)) ("y" (type-string)))
- (type-function ( (type-number) (type-number) ) (type-number))

Notes & Implementation Details
-------------------------------
- Empty list `()` is treated as an empty `(array ...)` by the parser.
- `let*` binding lists accept splice placeholders produced by macro expansion
  (`(unquote-splice ...)`) which the parser will consume as binding placeholders.
- `for` uses placeholders for missing init/cond/update: underscore `_` or `null`.
- The parser treats `true|false|null|undefined` identifiers as literal tokens
  and maps them to literal AST nodes.
- Strings and numbers are lexed as separate token kinds and become literal AST nodes.

This grammar reflects the parser's implementation and is intended as a
developer-facing reference; it is not a normative formal grammar, but an
accurate mapping of what the lexer and parser accept today.
