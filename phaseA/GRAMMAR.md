# Phase A Grammar (EBNF)

Tokens:
```
<identifier> ::= /[a-zA-Z_$][a-zA-Z0-9_$]*/
<number>     ::= /[0-9]+(\.[0-9]+)?/  ; integers and floats
<string>     ::= '"' <chars> '"' | "'" <chars> "'"
<boolean>    ::= "true" | "false"
<null>       ::= "null"
<undefined>  ::= "undefined"
<literal>    ::= <number> | <string> | <boolean> | <null> | <undefined>
```

## Program
```
<program> ::= "(" "program" <statement>* ")"
```

## Statements
```
<statement> ::= <block>
              | <if>
              | <scope-loop>
              | <for-classic>
              | <for-of>
              | <for-await>
              | <return>
              | <break>
              | <continue>
              | <switch>
              | <let-star>
              | <const-star>
              | <assign>
              | <expression>
              | <fn>
              | <class>
              | <import>
              | <export>
              | <type-alias>
              | <type-interface>

- `<break> ::= "(" "break" <identifier>? ")"`
- `<continue> ::= "(" "continue" <identifier>? ")"`
- `<switch> ::= "(" "switch" <expression> <case>* <default>? ")"`
- `<case> ::= "(" "case" <expression> <statement>* ")"`
- `<default> ::= "(" "default" <statement>* ")"`

`<binding> ::= "(" <identifier> <expression>? ")"`
`<param> ::= "(" <identifier> <type>? ")"`
`<fn-signature> ::= "(" <param>* ")" <type>?`

- `<init> ::= <expression>`
- `<condition> ::= <expression>`
- `<update> ::= <expression>`
- `<class-body> ::= "(" "class-body" <statement>* ")"`
- `<import-spec> ::= "(" "import-spec" <expression>* ")"`
- `<export-spec> ::= "(" "export-spec" <expression>* ")"`
- `<interface-body> ::= "(" "interface-body" <expression>* ")"`

- `<block> ::= "(" "block" <statement>* ")"`
- `<if> ::= "(" "if" <expression> <statement> (<statement>)? ")"`
- `<scope-loop> ::= "(" "while" <expression> <statement> ")"`
- `<for-classic> ::= "(" "for" "classic" <init>? <condition>? <update>? <statement> ")"`
- `<for-of> ::= "(" "for" "of" "(" <binding> <expression> ")" <statement> ")"`
- `<for-await> ::= "(" "for" "await" "(" <binding> <expression> ")" <statement> ")"`
- `<let-star> ::= "(" "let*" <binding>* <statement>* ")"`
- `<const-star> ::= "(" "const*" <binding>* <statement>* ")"`
- `<assign> ::= "(" "assign" <expression> <expression> ")"`
- `<fn> ::= "(" "fn" <fn-signature> <statement>* ")"`
- `<class> ::= "(" "class" <identifier> <class-body> ")"`
- `<import> ::= "(" "import" <import-spec> ")"`
- `<export> ::= "(" "export" <export-spec> ")"`
- `<type-alias> ::= "(" "type-alias" <identifier> <type-params>? <type> ")"`
- `<type-interface> ::= "(" "type-interface" <identifier> <interface-body> ")"`

## Expressions
```
<expression> ::= <literal>
               | <identifier>
               | <call>
               | <prop>
               | <index>
               | <new>
               | <throw>
               | <try>
               | <fn>
               | <class>
               | <type-assert>
               | <type-object>
               | <type-function>
               | <type-literal>
               | <type-union>
               | <type-intersection>
               | <type-ref>
               | <array>
               | <object>
```

- `<call> ::= "(" "call" <expression> <expression>* ")"`
- `<prop> ::= "(" "prop" <expression> <string> ")"`
- `<prop> ::= "(" "prop" <expression> <string> ")"`  ; computed names lower to `<index>` so the canonical AST stays simple while dynamic keys go through the index node.
- `<index> ::= "(" "index" <expression> <expression> ")"`
- `<new> ::= "(" "new" <expression> <expression>* ")"`
- `<throw> ::= "(" "throw" <expression> ")"`
- `<try> ::= "(" "try" <statement> <catch>? <finally>? ")"`
- `<catch> ::= "(" "catch" <binding>? <statement>* ")"`
- `<finally> ::= "(" "finally" <statement>* ")"`
- `<array> ::= "(" "array" <expression>* ")"`
- `<object> ::= "(" "object" <object-field>* ")"`
- `<object-field> ::= "(" <string> <expression> ")"`

## Type Expressions
```
<type> ::= <type-primitive>
         | <type-ref>
         | <type-function>
         | <type-object>
         | <type-union>
         | <type-intersection>
         | <type-mapped>
         | <type-literal>
```

- `<type-primitive> ::= "type-string" | "type-number" | "type-boolean" | "type-null" | "type-undefined"`
- `<type-ref> ::= "(" "type-ref" <identifier> <type-args>? ")"`
- `<type-function> ::= "(" "type-function" <type-params>? <type>* <type> ")"`
- `<type-object> ::= "(" "type-object" <type-field>* ")"`
- `<type-field> ::= "(" <string> <type> ")"`
- `<type-union> ::= "(" "type-union" <type>+ ")"`
- `<type-intersection> ::= "(" "type-intersection" <type>+ ")"`
- `<type-literal> ::= "(" "type-literal" <literal>* ")"`
- `<type-mapped> ::= "(" "type-mapped" <type-param> <type> <type>? <modifier>? <modifier>? <type>? ")"`
- `<modifier> ::= "readonly" | "-readonly" | "optional" | "-optional"`

`<type-params> ::= "(" "typeparams" <type-param>* ")"`
`<type-param> ::= "(" <identifier> <variance>? <type>? <type>? ")"`

## Notes
- Comments, macros, and TypeScript shorthands (like `typeof` as a prefix or `extends` clauses) are rewritten by Phase B into these canonical forms before Phase A sees them.
- Scope metadata (TDZ, const/let distinctions, hoisting flags) attaches to the nodes above but is not reflected in the EBNF; the resolver uses the metadata to enforce TypeScript semantics.
```
