- `@canonical` — Phase A canonical IR node  
- `@noncallhead` — must *never* be treated as a function call  
- `@specialform` — special evaluation rules (like `if`, `fn`, `let*`)  
- `@literal` — literal constructor  
- `@sugar` — Phase B–only sugar node  
- `@scope` — introduces a lexical scope  

---

# Phase A Grammar (EBNF)

## Tokens  
<identifier> ::= <identifier-char> <identifier-char>*
<identifier-char> ::= /* any character except whitespace, "(" or ")" */
<number>     ::= /[0-9]+(\.[0-9]+)?/  ; integers and floats
<string>     ::= '"' <chars> '"' | "'" <chars> "'"
<boolean>    ::= "true" | "false"
<null>       ::= "null"
<undefined>  ::= "undefined"
<literal>    ::= <number> | <string> | <boolean> | <null> | <undefined>

---

# Program

```ebnf
<program> ::= "(" "program" <statement>* ")"
    @canonical
    @noncallhead
    @specialform
    @scope
```

---

# Statements

### Block

```ebnf
<block> ::= "(" "block" <statement>* ")"
    @canonical
    @noncallhead
    @specialform
    @scope
```

### If

```ebnf
<if> ::= "(" "if" <expression> <statement> (<statement>)? ")"
    @canonical
    @noncallhead
    @specialform
```

### While

```ebnf
<scope-loop> ::= "(" "while" <expression> <statement> ")"
    @canonical
    @noncallhead
    @specialform
```

### For (classic)

```ebnf
<for-classic> ::= "(" "for" "classic" <init>? <condition>? <update>? <statement> ")"
    @canonical
    @noncallhead
    @specialform
```

### For-of

```ebnf
<for-of> ::= "(" "for" "of" "(" <binding> <expression> ")" <statement> ")"
    @canonical
    @noncallhead
    @specialform
```

### For-await

```ebnf
<for-await> ::= "(" "for" "await" "(" <binding> <expression> ")" <statement> ")"
    @canonical
    @noncallhead
    @specialform
```

### Return / Break / Continue

```ebnf
<return> ::= "(" "return" <expression>? ")"
    @canonical
    @noncallhead
    @specialform

<break> ::= "(" "break" <identifier>? ")"
    @canonical
    @noncallhead
    @specialform

<continue> ::= "(" "continue" <identifier>? ")"
    @canonical
    @noncallhead
    @specialform
```

---

# Bindings

### let* / const*

```ebnf
<let-star> ::= "(" "let*" <binding>* <statement>* ")"
    @canonical
    @noncallhead
    @specialform
    @scope

<const-star> ::= "(" "const*" <binding>* <statement>* ")"
    @canonical
    @noncallhead
    @specialform
    @scope
```

### assign

```ebnf
<assign> ::= "(" "assign" <expression> <expression> ")"
    @canonical
    @noncallhead
```

---

# Functions

### fn

```ebnf
<fn> ::= "(" "fn" <callable-flag>* <identifier>? <fn-signature> <statement>* ")"
    @canonical
    @noncallhead
    @specialform
    @scope
```

### lambda

```ebnf
<lambda> ::= "(" "lambda" <callable-flag>* <fn-signature> <statement>* ")"
    @canonical
    @noncallhead
    @specialform
    @scope
```

### method / getter / setter

```ebnf
<method> ::= "(" "method" <callable-flag>* <string> <fn-signature> <statement>* ")"
    @canonical
    @noncallhead
    @specialform
    @scope

<getter> ::= "(" "getter" <callable-flag>* <string> <fn-signature> <statement>* ")"
    @canonical
    @noncallhead
    @specialform
    @scope

<setter> ::= "(" "setter" <callable-flag>* <string> <fn-signature> <statement>* ")"
    @canonical
    @noncallhead
    @specialform
    @scope
```

---

# Classes

```ebnf
<class> ::= "(" "class" <identifier> <type-params>? <class-heritage>* <class-body> ")"
    @canonical
    @noncallhead
    @specialform
    @scope

<class-body> ::= "(" "class-body" <statement>* ")"
    @canonical
    @noncallhead
    @scope

<static-block> ::= "(" "static-block" <statement>* ")"
    @canonical
    @noncallhead
    @scope
```

Heritage nodes:

```ebnf
<class-extends> ::= "(" "extends" <expression> ")"
    @canonical
    @noncallhead

<class-implements> ::= "(" "implements" <expression>+ ")"
    @canonical
    @noncallhead

<class-abstract> ::= "(" "abstract" ")"
    @canonical
    @noncallhead

<class-decorators> ::= "(" "decorators" <expression>+ ")"
    @canonical
    @noncallhead
```

---

# Imports / Exports

```ebnf
<import> ::= "(" "import" <import-spec> ")"
    @canonical
    @noncallhead
    @specialform

<export> ::= "(" "export" <export-spec> ")"
    @canonical
    @noncallhead
    @specialform
```

---

# Enums

```ebnf
<enum> ::= "(" "enum" <identifier> <enum-body> ")"
    @canonical
    @noncallhead
    @specialform

<enum-body> ::= "(" "enum-body" <enum-member>* ")"
    @canonical
    @noncallhead

<enum-member> ::= "(" <string> <expression>? ")"
    @canonical
    @noncallhead
```

---

# Namespaces

```ebnf
<namespace> ::= "(" "namespace" <identifier> <namespace-body> ")"
    @canonical
    @noncallhead
    @specialform
    @scope

<namespace-body> ::= "(" "namespace-body" <statement>* ")"
    @canonical
    @noncallhead
    @scope
```

---

# Types

```ebnf
<type-alias> ::= "(" "type-alias" <identifier> <type-params>? <type> ")"
    @canonical
    @noncallhead
    @specialform

<type-interface> ::= "(" "type-interface" <identifier> <interface-body> ")"
    @canonical
    @noncallhead
    @specialform
```

---

# Switch

```ebnf
<switch> ::= "(" "switch" <expression> <case>* <default>? ")"
    @canonical
    @noncallhead
    @specialform

<case> ::= "(" "case" <expression> <statement>* ")"
    @canonical
    @noncallhead

<default> ::= "(" "default" <statement>* ")"
    @canonical
    @noncallhead
```

---

# Expressions

### Calls

```ebnf
<call> ::= "(" "call" <expression> <expression>* ")"
    @canonical
    @noncallhead

<call-with-this> ::= "(" "call-with-this" <expression> <expression> <expression>* ")"
    @canonical
    @noncallhead

<optional-call> ::= "(" "?.call" <expression> <expression>* ")"
    @canonical
    @noncallhead
    @sugar
```

### Property access

```ebnf
<prop> ::= "(" "prop" <expression> (<string> | <expression>) ")"
    @canonical
    @noncallhead

<optional-prop> ::= "(" "?." <expression> (<string> | <expression>) ")"
    @canonical
    @noncallhead
    @sugar
```

### Indexing

```ebnf
<index> ::= "(" "index" <expression> <expression> ")"
    @canonical
    @noncallhead

<optional-index> ::= "(" "?.[]" <expression> <expression> ")"
    @canonical
    @noncallhead
    @sugar
```

### new / throw / try

```ebnf
<new> ::= "(" "new" <expression> <expression>* ")"
    @canonical
    @noncallhead

<throw> ::= "(" "throw" <expression> ")"
    @canonical
    @noncallhead
    @specialform

<try> ::= "(" "try" <statement> <catch>? <finally>? ")"
    @canonical
    @noncallhead
    @specialform
```

### catch / finally

```ebnf
<catch> ::= "(" "catch" <binding>? <statement>* ")"
    @canonical
    @noncallhead
    @scope

<finally> ::= "(" "finally" <statement>* ")"
    @canonical
    @noncallhead
    @scope
```

### array / object

```ebnf
<array> ::= "(" "array" <expression>* ")"
    @canonical
    @noncallhead
    @literal

<object> ::= "(" "object" <object-field>* ")"
    @canonical
    @noncallhead
    @literal
```

### spread

```ebnf
<spread> ::= "(" "spread" <spread-kind> <expression> ")"
    @canonical
    @noncallhead
```

### ternary

```ebnf
<ternary> ::= "(" "ternary" <expression> <expression> <expression> ")"
    @canonical
    @noncallhead
    @specialform
```

### template

```ebnf
<template> ::= "(" "template" <expression>* ")"
    @canonical
    @noncallhead
```

### non-null

```ebnf
<non-null> ::= "(" "non-null" <expression> ")"
    @canonical
    @noncallhead
```

---

# Type Expressions

```ebnf
<type-ref> ::= "(" "type-ref" <identifier> <type-args>? ")"
    @canonical
    @noncallhead

<type-function> ::= "(" "type-function" <type-params>? <type>* <type> ")"
    @canonical
    @noncallhead

<type-object> ::= "(" "type-object" <type-field>* ")"
    @canonical
    @noncallhead

<type-union> ::= "(" "type-union" <type>+ ")"
    @canonical
    @noncallhead

<type-intersection> ::= "(" "type-intersection" <type>+ ")"
    @canonical
    @noncallhead

<type-literal> ::= "(" "type-literal" <literal>* ")"
    @canonical
    @noncallhead
    @literal

<type-this> ::= "(" "type-this" ")"
    @canonical
    @noncallhead

<type-template> ::= "(" "type-template" (<string> | <type>)* ")"
    @canonical
    @noncallhead

<type-mapped> ::= "(" "type-mapped" <type-param> <value-type> <name-remap>? <readonly-modifier>? <optional-modifier>? <via>? ")"
    @canonical
    @noncallhead
```
