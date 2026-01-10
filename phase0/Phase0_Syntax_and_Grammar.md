Phase 0 Syntax & Grammar  
\========================

This document defines the complete grammar of Phase 0 in an EBNF‑style notation. Every syntactic form corresponds directly to an AST constructor.

## **Program Structure**

program ::= (program statement\*)

A Phase 0 file must contain exactly one top‑level `(program …)` form.

## **Statements**

statement ::=

* (block statement\*)  
* (if expr statement statement?)  
* (while expr statement)  
* (for init? expr? expr? statement)  
* (return expr?)  
* (let* identifier expr)  
* (const identifier expr)  
* (assign expr expr)  
* (expr expr)  
* (function name params block type?)  
* (class name class-body)  
* import-statement  
* export-statement

## **Expressions**

expr ::=

* identifier  
* literal  
* (call expr expr\*)  
* (new expr expr\*)  
* (prop expr string)  
* (array expr\*)  
* (obj field\*)  
* (type-assert expr type)

## **Types**

type ::=

* (type-string)  
* (type-number)  
* (type-boolean)  
* (type-null)  
* (type-undefined)  
* (type-array type)  
* (type-object field-type\*)  
* (type-union type type)  
* (type-intersection type type)  
* (type-function param-type\* type)  
* (type-ref identifier)  
* (type-literal literal)

## **Type Aliases**

(type-alias identifier type)

## **Imports and Exports**

(import-default identifier string)  
(import-named identifier string)

(import-all identifier string)

(export identifier)

(export-default expr)

