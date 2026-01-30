# Phase A Type Expression Specification

## Overview

Type expressions form a parallel AST to value expressions. All nodes use the `t:` namespace prefix to distinguish them from value-level forms.

## Node Reference

### Primitives
`(t:primitive name)`

Where `name` is one of: `"number"`, `"string"`, `"boolean"`, `"void"`, `"null"`, `"undefined"`, `"any"`, `"unknown"`, `"never"`, `"object"`, `"symbol"`, `"bigint"`.

### Type Variables
`(t:var name)`

Reference to a generic type parameter.

### Named Type References
`(t:ref name)`
`(t:ref name module)`

Reference to a declared type (class, interface, type alias, enum). Optional second argument for qualified/imported references.

### Generic Application
`(t:apply base-type type-args...)`

Applies type arguments to a generic type.

### Compound Types
`(t:union types...)`
`(t:intersection types...)`
`(t:tuple types...)`
`(t:array element-type)`
`(t:nullable inner-type)`  ;; shorthand for `(t:union T (t:primitive "null") (t:primitive "undefined"))`

### Object Types
`(t:object entries...)`

Each entry is `(key type)` or `(key type :optional true)` or `(key type :readonly true)`.

### Function Types
`(t:fn params return-type)`
`(t:fn params return-type :type-params (names...))`

### Literal Types
`(t:literal value)`

Where `value` is a string, number, or boolean literal.

### Type Operators
`(t:keyof type)`
`(t:typeof expr-name)`
`(t:indexed obj-type index-type)`  ;; `T[K]`
`(t:conditional check extends then else)`
`(t:infer name)`
`(t:mapped ...)`  ;; for mapped types, spec TBD

## Validation

Phase A validates that:

1. All `t:primitive` names are in the known set
2. All `t:var` references are bound by an enclosing `:type-params`
3. `t:apply` arity matches the referenced type's parameter count (when known)
