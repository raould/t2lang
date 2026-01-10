Phase 0 AST Specification  
\=========================

This document defines the meaning of every Phase 0 AST constructor.

## **Program**

### **Form**

(program stmt1 stmt2 …)

### **Meaning**

A complete Phase 0 program. Statements execute in order.

## **Blocks**

(block stmt1 stmt2 …)

Executes statements sequentially and introduces a lexical scope.

## **If**

(if condition then-branch else-branch?)

Evaluates `condition`. Executes `then-branch` if truthy; otherwise executes `else-branch` if present.

## **While**

(while condition body)

Standard while loop.

## **For**

(for init? condition? update? body)

Equivalent to JavaScript’s `for`.

## **Return**

(return expr?)

Returns from the nearest function.

## **Variable Declarations**

(let* ((name1 expr1) (name2 expr2) ...) body...)

(const ((name1 expr1) (name2 expr2) ...) body...)

Lexical bindings. `let*` represents sequential bindings. `const` is for immutable bindings. The body expressions are evaluated within the new scope.

## **Assignment**

(assign target value)

`target` must be a valid l-value (e.g., an identifier, a property access, or an array index).

## **Expression Statement**

An expression evaluated for its side effects. In the `(program ...)` body, any expression that is not a statement is wrapped in an `ExprStmt` node.

## **Function**

(fn name (param1 param2 ...) body type?)

Defines a function.

## **Lambda**

(fn (param1 param2 ...) body)

Defines an anonymous function.

## **Class**

(class name (field1 init1) ... (method name (params) ...))

Defines a class with fields and methods.

## **Calls**

(call callee arg1 arg2 ...)

Function call.

## **Implicit Call**

(callee arg1 arg2 ...)

Syntactic sugar for a `call` expression, where the first element of a list is treated as the callee if it's not a keyword.

## **New**

(new constructor arg1 arg2 ...)

Constructor call.

## **Property Access**

(prop object "field")

Equivalent to `object.field`.

## **Index Access**

(index object index-expr)

Equivalent to `object[index-expr]`.

## **Array Literal**

(array expr1 expr2 ...)

## **Object Literal**

(obj ("key1" expr1) ("key2" expr2) ...)

## **Throw**

(throw expr)

Throws an exception.

## **Try/Catch**

(try (try-body ...) (catch (param) (catch-body ...))? (finally (finally-body ...))?)

Handles exceptions. `catch` and `finally` blocks are optional.

## **Import**

(import-default name "path")
(import-named (name1 name2 ...) "path")
(import-all alias "path")

Imports modules.
- `import-default`: Imports the default export.
- `import-named`: Imports named exports.
- `import-all`: Imports the entire module as a namespace.

## **Export**

(export name)
(export-default expr)

Exports names or expressions.
- `export`: Exports a named variable.
- `export-default`: Exports a default expression.

## **Type Assertion**

(type-assert expr type)

Equivalent to `expr as type`.

## **Type Alias**

(type-alias Name type)

Defines a named type alias.

## **Types**

Each type constructor corresponds directly to its syntactic form:

*   `(type-string)`
*   `(type-number)`
*   `(type-boolean)`
*   `(type-null)`
*   `(type-undefined)`
*   `(type-array T)`
*   `(type-object ("field" type) ...)`
*   `(type-union A B)`
*   `(type-intersection A B)`
*   `(type-function (param-type ...) return-type)`
*   `(type-ref "Name")`
*   `(type-literal literal)`

