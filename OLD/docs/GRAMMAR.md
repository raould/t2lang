Phase 0 EBNF Grammar
=====================

This file presents an EBNF-style grammar for Phase 0 (as implemented by
`phase0/src/parse/parser.ts` and `.../lexer.ts`). It documents the
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
            | const*-form
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
const*-form ::= "(" "const*" "(" binding* ")" expr* ")"
binding ::= "(" identifier expr ")" | unquote-splice

assign-form ::= "(" "assign" expr expr ")"

function-decl ::= "(" "function" identifier [typeparams] "(" param* ")" expr* ")"
function-lambda ::= "(" "fn" [identifier] [typeparams] "(" param* ")" expr* ")"
param ::= identifier

class-decl ::= "(" "class" identifier [typeparams] [identifier] class-member* ")"
class-member ::= "(" "field" string [expr] ")"
         | "(" "method" string [typeparams] "(" param* ")" [returns-form] expr* ")"

; Parameter forms for methods
param ::= identifier
  | "(" identifier type-sform ")"        ; typed parameter in plain Phase0 sexpr form

; Returns / method return type
; Phase0 supports an explicit returns form or colon sugar after the param list.
returns-form ::= "(" "returns" type-sform ")"
         | "(" "->" type-sform ")"
         | ":" type-sform                     ; colon shorthand (also accepted)

; Phase1 sugar
; Phase1 supports a concise typed-params syntax for convenience. Example:
;   (method "ctor" (firstName: string, lastName: string, age: number) : string ...)
; Phase1 rewrites typed param lists like `(a: T, b: U)` into Phase0's
; typed-parameter sexprs and rewrites trailing `: TYPE` into `(returns TYPE)`
; so the Phase0 parser receives the normalized `returns-form` above.

import-form ::= "(" import-kind import-spec string ")"
import-kind ::= "import-default" | "import-named" | "import-all"
import-spec ::= identifier                       ; for import-default
              | "(" identifier* ")"           ; for import-named
              | identifier                       ; for import-all (alias)

export-form ::= "(" "export" identifier ")"
              | "(" "export-default" expr ")"

type-alias-form ::= "(" "type-alias" identifier [typeparams] type-sform ")"

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

; Generic / type application forms
type-app ::= "(" "type-app" expr type-sform+ ")"   ; explicit type application: (type-app Foo (type-ref "string"))
call-with-typeargs ::= "(" "call" "(" "typeargs" type-sform* ")" expr expr* ")" ; alternative: attach typeargs as first child

Notes on calls: If the list head is not one of the parser's special keywords
it is treated as an implicit call with the head as an identifier AST node.
Because the lexer includes operator characters in identifier tokens, forms
like `(+ 1 2)` parse as an implicit call with head `+`.

Operators
---------
Operators are ordinary identifier call-heads in Phase0 (e.g. `(+ a b)`, `(and a b)`).
The lexer treats operator-like characters as part of the `identifier` token, so
operator forms are parsed as implicit calls and the code generator may emit
infix operator syntax when the operator's arity matches (binary/unary).

Common operator categories (examples - implementations may accept other symbols):
- Arithmetic: `+ - * / % **`
- Bitwise: `& | ^ << >> >>>`
- Comparison: `< <= > >=`
- Equality: `== === != !==`
- Logical / boolean helpers: `and`, `or`, `not`, `xor` (Phase0 may also accept `&&`, `||`, `!` tokens)
- Nullish: `??` (coalesce) and assignment form `??=` (if supported by codegen)
- Ternary: `?:` or `(?: cond then else)` is used in examples as the ternary operator form

Notes:
- The parser does not enforce operator semantics; operators are parsed as calls.
- The TypeChecker and Codegen are responsible for operator-specific typing rules
  and for emitting infix syntax where appropriate. Short-circuiting operators
  like `and`/`or` should be mapped to short-circuiting code in codegen.

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

; Type parameter declarations used with `(typeparams ...)`
typeparam ::= "(" identifier ["(" "extends" type-sform ")"] ["(" "default" type-sform ")"] ")"
typeparams ::= "(" "typeparams" typeparam* ")"

Examples:
- (type-array (type-number))
- (type-object ("x" (type-number)) ("y" (type-string)))
- (type-function ( (type-number) (type-number) ) (type-number))

Generics (policy)
-------------------
Phase0 accepts explicit `typeparams` declarations and explicit type application
forms (`type-app` and the `typeargs` attachment). Phase0's role is syntax
validation: parse `typeparams` into the AST and ensure well-formedness (no
missing names, balanced parentheses, duplicate param names, etc.).

Phase0 intentionally does NOT perform full generic semantic checking or
inference (e.g. `extends` semantics, conditional/mapped types). When
`emitTypes` is enabled the code generator may emit TypeScript generic syntax
based on the parsed `typeparams`/`type-app` nodes.

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
