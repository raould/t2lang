# Phase A Grammar (EBNF)

Tokens:
```
<identifier> ::= <identifier-char> <identifier-char>*
<identifier-char> ::= /* any character except whitespace, "(" or ")" */
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
              | <lambda>
              | <method>
              | <getter>
              | <setter>
              | <class>
              | <import>
              | <export>
              | <enum>
              | <namespace>
              | <type-alias>
              | <type-interface>
              | <index-signature>
              | <static-block>

<binding> ::= "(" <binding-target> <expression>? ")"
<param> ::= "(" <param-modifier>* <identifier> <type>? ("default" <expression>)? ")"
          | "(" "this" <type> ")"
<param-modifier> ::= "public" | "protected" | "private" | "readonly"
<fn-signature> ::= "(" (<param> (","? <param>)*)? ")" <type>?

<init> ::= <expression>
<condition> ::= <expression>
<update> ::= <expression>
<class-body> ::= "(" "class-body" <statement>* ")"
<import-spec> ::= "(" "import-spec" <expression>* ")"
<export-spec> ::= "(" "export-spec" <expression>* ")"
<interface-body> ::= "(" "interface-body" <expression>* ")"
<index-signature> ::= "(" "index-signature" "(" <identifier> <type> ")" <type> ("readonly")? ")"

<block> ::= "(" "block" <statement>* ")"
<static-block> ::= "(" "static-block" <statement>* ")"  ; class-body only
<if> ::= "(" "if" <expression> <statement> (<statement>)? ")"
<scope-loop> ::= "(" "while" <expression> <statement> ")"
<for-classic> ::= "(" "for" "classic" <init>? <condition>? <update>? <statement> ")"
<for-of> ::= "(" "for" "of" "(" <binding> <expression> ")" <statement> ")"
<for-await> ::= "(" "for" "await" "(" <binding> <expression> ")" <statement> ")"
<let-star> ::= "(" "let*" <binding>* <statement>* ")"
<const-star> ::= "(" "const*" <binding>* <statement>* ")"
<assign> ::= "(" "assign" <expression> <expression> ")"
<callable-flag> ::= "async" | "generator" | "abstract" | "overload"
<fn> ::= "(" "fn" <callable-flag>* <identifier>? <fn-signature> <statement>* ")"
<lambda> ::= "(" "lambda" <callable-flag>* <fn-signature> <statement>* ")"
<method> ::= "(" "method" <callable-flag>* <string> <fn-signature> <statement>* ")" ; "method" is very unfortunate, ideally the method name should be an <identifier> as in other callables.
<getter> ::= "(" "getter" <callable-flag>* <string> <fn-signature> <statement>* ")"
<setter> ::= "(" "setter" <callable-flag>* <string> <fn-signature> <statement>* ")"
<class> ::= "(" "class" <identifier> <type-params>? <class-heritage>* <class-body> ")"
<class-heritage> ::= <class-extends>
                  | <class-implements>
                  | <class-abstract>
                  | <class-decorators>
<class-extends> ::= "(" "extends" <expression> ")"
<class-implements> ::= "(" "implements" <expression>+ ")"
<class-abstract> ::= "(" "abstract" ")"
<class-decorators> ::= "(" "decorators" <expression>+ ")"
<import> ::= "(" "import" <import-spec> ")"
<export> ::= "(" "export" <export-spec> ")"
<enum> ::= "(" "enum" <identifier> <enum-body> ")"
<enum-body> ::= "(" "enum-body" <enum-member>* ")"
<enum-member> ::= "(" <string> <expression>? ")"
<namespace> ::= "(" "namespace" <identifier> <namespace-body> ")"
<namespace-body> ::= "(" "namespace-body" <statement>* ")"
<type-alias> ::= "(" "type-alias" <identifier> <type-params>? <type> ")"
<type-interface> ::= "(" "type-interface" <identifier> <interface-body> ")"
<switch> ::= "(" "switch" <expression> <case>* <default>? ")"
<case> ::= "(" "case" <expression> <statement>* ")"
<default> ::= "(" "default" <statement>* ")"
<return> ::= "(" "return" <expression>? ")"
<break> ::= "(" "break" <identifier>? ")"
<continue> ::= "(" "continue" <identifier>? ")"

<binding-target> ::= <identifier>
                     | <array-pattern>
                     | <object-pattern>
                     | <rest-target>
                     | <default-target>

<array-pattern> ::= "(" "array-pattern" <binding-target>* <rest-target>? ")"  ; `[a, ...rest]`
<object-pattern> ::= "(" "object-pattern" <object-pattern-field>* <rest-target>? ")"  ; `{a, b: {c}}`
<object-pattern-field> ::= "(" <string> <binding-target> ")"
<rest-target> ::= "(" "rest" <binding-target> ")"  ; `...rest` in arrays/objects
<default-target> ::= "(" "default" <binding-target> <expression> ")"  ; destructuring defaults
```

## Expressions
```
<expression> ::= <literal>
               | <identifier>
               | <call>
               | <call-with-this>
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
               | <template>
               | <non-null>
               | <type-union>
               | <type-intersection>
               | <type-ref>
               | <array>
               | <object>
               | <spread>
               | <ternary>

<call> ::= "(" "call" <expression> <expression>* ")"  ; commas allowed between args
<call-with-this> ::= "(" "call-with-this" <expression> <expression> <expression>* ")"  ; commas allowed between args
<prop> ::= "(" "prop" <expression> <string> ")"  ; literal property names only; computed cases use <index>
<index> ::= "(" "index" <expression> <expression> ")"
<new> ::= "(" "new" <expression> <expression>* ")"
<throw> ::= "(" "throw" <expression> ")"
<try> ::= "(" "try" <statement> <catch>? <finally>? ")"
<catch> ::= "(" "catch" <binding>? <statement>* ")"
<finally> ::= "(" "finally" <statement>* ")"
<array> ::= "(" "array" <expression>* ")"  ; commas allowed between elements
<object> ::= "(" "object" <object-field>* ")"  ; commas allowed between fields
<object-field> ::= "(" <string> <expression> ")"
               | "(" "spread" "object" <expression> ")"
               | "(" "computed" <expression> <expression> ")"
<spread> ::= "(" "spread" <spread-kind> <expression> ")"
<spread-kind> ::= "array" | "object" | "rest"
<ternary> ::= "(" "ternary" <expression> <expression> <expression> ")"
<template> ::= "(" "template" <expression>* ")"
<non-null> ::= "(" "non-null" <expression> ")"
```

## Type Expressions
```
<type> ::= <type-primitive>
         | <type-ref>
         | <type-function>
         | <type-object>
         | <type-union>
         | <type-intersection>
         | <type-this>
         | <type-mapped>
         | <type-template>
         | <type-literal>

<type-primitive> ::= "type-string" | "type-number" | "type-boolean" | "type-null" | "type-undefined"
<type-ref> ::= "(" "type-ref" <identifier> <type-args>? ")"
<type-function> ::= "(" "type-function" <type-params>? <type>* <type> ")"
<type-object> ::= "(" "type-object" <type-field>* ")"
<type-field> ::= "(" <string> <type> ")"
<type-union> ::= "(" "type-union" <type>+ ")"
<type-intersection> ::= "(" "type-intersection" <type>+ ")"
<type-literal> ::= "(" "type-literal" <literal>* ")"
<type-this> ::= "(" "type-this" ")"
<type-template> ::= "(" "type-template" (<string> | <type>)* ")"
<type-mapped> ::= "(" "type-mapped" <type-param> <value-type> <name-remap>? <readonly-modifier>? <optional-modifier>? <via>? ")"
<value-type> ::= <type>              ; the mapped value expression
<name-remap> ::= <type>               ; optional `as` clause renaming keys
<readonly-modifier> ::= "readonly" | "-readonly"
<optional-modifier> ::= "optional" | "-optional"
<via> ::= <type>                     ; `in` constraint describing the key union
```

```
<type-params> ::= "(" "typeparams" <type-param>* ")"
<type-param> ::= "(" <identifier> <variance>? <type>? <type>? ")"  ; variance, constraint, default
<variance> ::= "in" | "out"

<type-app> ::= "(" "type-app" <expression> <type>* ")"
```

`<fn>` already consumes `<fn-signature>`, but Phase B may also add `<type-params>?` before the body, and `<class>` carries `<type-params>?` before `<class-body>`. `type-alias`/`type-interface` follow similar patterns so generic declarations share the canonical `<typeparams>` block before the core node.

## Notes
- Comments, macros, and TypeScript shorthands (like `typeof` as a prefix or `extends` clauses) are rewritten by Phase B into these canonical forms before Phase A sees them.
- Scope metadata (TDZ, const/let distinctions, hoisting flags) attaches to the nodes above but is not reflected in the EBNF; the resolver uses the metadata to enforce TypeScript semantics.
- `<prop>` only covers literal property names; computed-property access should go through `<index>` so Phase B can rewrite dynamic keys without introducing new grammar forms.
- `<ternary>` is the canonical expression that produces a value from a conditional without requiring a statement context ie TypeScript's `?:`.
- Commas are treated as optional separators inside array literals, object literals, call argument lists, and function signature parameter lists. Commas are rejected in other list contexts.
- Phase B adds sugar for `key: value` object fields and optional keys like `role?` inside `{ ... }`, but those desugar to canonical Phase A `object`/`spread` forms.
- TODO: support ECMAScript specificaiton for <identifier>.
```
