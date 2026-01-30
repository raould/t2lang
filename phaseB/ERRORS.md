# Phase B Error Handling Specification

## Overview

Phase B must produce actionable error messages that point to the original source location, even when errors occur deep in macro expansion or sugar rewriting. This document specifies error categories, source tracking, and message formatting.

## Guiding Principles

1. **Blame the Right Location**: Errors should point to what the user wrote, not compiler-generated temporaries.
2. **Show the Chain**: For macro-related errors, show both the expansion site and the macro definition when relevant.
3. **Fail Fast, Fail Clearly**: Detect errors as early as possible with specific messages.
4. **No Silent Failures**: Every malformed construct must produce a diagnostic.

## Source Location Tracking

### Location Data Structure

Every AST node carries source location metadata:

```typescript
interface SourceLoc {
  file: string;
  line: number;      // 1-indexed
  column: number;    // 1-indexed
  endLine: number;
  endColumn: number;
}

interface ASTNode {
  loc: SourceLoc;
  expansionStack?: ExpansionFrame[];  // present if macro-generated
}
```

### Expansion Stack

When a macro produces new nodes, those nodes carry an expansion stack linking back to the call site:

```typescript
interface ExpansionFrame {
  macroName: string;
  callSite: SourceLoc;        // where the macro was invoked
  macroDefSite: SourceLoc;    // where defmacro appears
}
```

This enables error messages like:

```
error: expected 2 arguments, got 3
  --> src/app.t2:15:3
   |
15 |   (when-let (x y z) ...)
   |   ^^^^^^^^^^^^^^^^^^^^^
   |
note: in expansion of macro `when-let`
  --> src/macros.t2:42:1
   |
42 | (defmacro when-let (bindings body) ...)
   | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
```

## Error Categories

### 1. Reader Errors (Lexing/Parsing)

Errors during initial S-expression parsing.

| Error | Example | Message |
|-------|---------|---------|
| Unclosed delimiter | `(fn (x)` | `error: unclosed '(' opened at line 1` |
| Unexpected delimiter | `(foo))` | `error: unexpected ')' with no matching '('` |
| Invalid token | `(foo @#$ bar)` | `error: invalid token '@#$'` |
| Unclosed string | `"hello` | `error: unclosed string literal` |
| Invalid escape | `"foo\q"` | `error: invalid escape sequence '\q'` |
| Invalid number | `12.34.56` | `error: malformed numeric literal` |

**Format:**

```
error[E001]: unclosed '(' delimiter
  --> src/app.t2:10:5
   |
10 |     (let* ((x 1)
   |     ^ unclosed delimiter
   |
   = help: expected ')' before end of file
```

### 2. Sugar Rewrite Errors

Errors when syntactic sugar is malformed.

| Error | Example | Message |
|-------|---------|---------|
| Invalid assignment target | `(1 := 2)` | `error: invalid assignment target; expected identifier or property access` |
| Malformed type annotation | `(fn (x:): number ...)` | `error: expected type after ':'` |
| Invalid dot notation | `(.foo)` | `error: dot notation requires object before '.'` |
| Empty optional chain | `(?.method)` | `error: optional chain requires base expression` |

**Format:**

```
error[E100]: invalid assignment target
  --> src/app.t2:20:3
   |
20 |   ((foo bar) := 10)
   |    ^^^^^^^^^ cannot assign to call expression
   |
   = help: left side of ':=' must be an identifier or property access
```

### 3. Macro Expansion Errors

#### 3a. Macro Invocation Errors

Problems with how a macro is called.

| Error | Example | Message |
|-------|---------|---------|
| Undefined macro | `(foobar x)` | `error: unknown macro or function 'foobar'` |
| Arity mismatch | `(when)` | `error: macro 'when' expects at least 2 arguments, got 0` |
| Invalid rest args | `(-> )` | `error: macro '->' requires at least one argument` |

**Format:**

```
error[E200]: macro 'when' expects at least 2 arguments
  --> src/app.t2:5:1
   |
 5 | (when true)
   | ^^^^^^^^^^^ missing body expression
   |
note: macro defined here
  --> stdlib/macros.t2:10:1
   |
10 | (defmacro when (cond & body) ...)
   |                      ^^^^^^ expects one or more body expressions
```

#### 3b. Macro Definition Errors

Problems in the macro definition itself.

| Error | Example | Message |
|-------|---------|---------|
| Invalid param list | `(defmacro foo "bad" ...)` | `error: expected parameter list, got string` |
| Duplicate param | `(defmacro foo (x x) ...)` | `error: duplicate parameter 'x'` |
| Rest not last | `(defmacro foo (& rest x) ...)` | `error: rest parameter must be last` |

#### 3c. Macro Execution Errors

Runtime errors during macro expansion.

| Error | Example | Message |
|-------|---------|---------|
| Exception in macro | division by zero in macro body | `error: macro 'foo' threw during expansion: division by zero` |
| Invalid return | macro returns a number | `error: macro 'foo' must return an S-expression, got number` |
| Infinite expansion | macro expands to itself | `error: macro expansion depth exceeded (likely infinite loop)` |

**Format:**

```
error[E210]: macro 'my-macro' threw during expansion
  --> src/app.t2:30:1
   |
30 | (my-macro complex-input)
   | ^^^^^^^^^^^^^^^^^^^^^^^^
   |
note: error occurred here in macro body
  --> src/macros.t2:55:5
   |
55 |     (/ 1 (- (length items) (length items)))
   |     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ division by zero
   |
   = note: macro expansion stack:
           my-macro (src/app.t2:30:1)
```

### 4. Structural Validation Errors

Errors when expanded output doesn't conform to Phase A.

| Error | Example | Message |
|-------|---------|---------|
| Invalid node type | macro emits `(banana x)` | `error: unknown form 'banana' in Phase A output` |
| Missing required field | `(fn)` with no params | `error: 'fn' requires parameter list` |
| Type mismatch | `(if "cond" ...)` | `error: 'if' condition must be expression, got string literal` |

**Format:**

```
error[E300]: unknown form 'banana' is not valid Phase A AST
  --> src/app.t2:12:1
   |
12 | (my-macro x y)
   | ^^^^^^^^^^^^^^
   |
note: macro 'my-macro' expanded to:
   |
   | (banana x y)
   | ^^^^^^ not a recognized Phase A form
   |
   = help: valid forms include: fn, let*, if, call, prop, ...
```

## Error Message Format

All errors follow a consistent structure:

```
level[CODE]: short description
  --> file:line:column
   |
NN | source line
   | ^^^^^^^^^^^ annotation
   |
   = note: additional context
   = help: actionable suggestion
```

### Severity Levels

| Level | Meaning | Continues? |
|-------|---------|------------|
| `error` | Cannot proceed | No |
| `warning` | Suspicious but valid | Yes |
| `note` | Additional context | N/A |
| `help` | Suggested fix | N/A |

### Error Codes

Errors have stable numeric codes for tooling integration:

| Range | Category |
|-------|----------|
| E001-E099 | Reader/parser errors |
| E100-E199 | Sugar rewrite errors |
| E200-E299 | Macro expansion errors |
| E300-E399 | Validation errors |
| E400-E499 | Type errors (future) |

## Implementation Requirements

### 1. Location Preservation

The reader must attach `SourceLoc` to every node:

```typescript
function read(source: string, filename: string): ASTNode {
  // Every returned node has .loc set
}
```

### 2. Expansion Tracking

The macro expander must propagate and extend `expansionStack`:

```typescript
function expandMacro(callSite: ASTNode, macro: Macro): ASTNode {
  const result = macro.fn(...callSite.args);
  
  // Attach expansion provenance to all generated nodes
  walkAST(result, (node) => {
    node.expansionStack = [
      ...(callSite.expansionStack ?? []),
      {
        macroName: macro.name,
        callSite: callSite.loc,
        macroDefSite: macro.loc
      }
    ];
  });
  
  return result;
}
```

### 3. Unquote Location Merging

When `~expr` pulls in user code, preserve the original location:

```lisp
(defmacro trace (expr)
  `(do
     (console.log "trace:" '~expr)
     ~expr))  ;; <- this expr keeps its original .loc
```

The `~expr` node retains `expr`'s source location, not the macro definition's location.

### 4. Expansion Depth Limit

Prevent infinite expansion:

```typescript
const MAX_EXPANSION_DEPTH = 100;

function expand(node: ASTNode, depth = 0): ASTNode {
  if (depth > MAX_EXPANSION_DEPTH) {
    throw new ExpansionError(
      "macro expansion depth exceeded (likely infinite loop)",
      node.loc,
      node.expansionStack
    );
  }
  // ...
}
```

## CLI Output Options

### Default (TTY)

Colorized output with context:

```
error[E200]: macro 'when' expects at least 2 arguments
  --> src/app.t2:5:1
   |
 5 | (when true)
   | ^^^^^^^^^^^ missing body expression
```

### `--error-format=json`

Machine-readable output for editor integration:

```json
{
  "errors": [
    {
      "code": "E200",
      "level": "error",
      "message": "macro 'when' expects at least 2 arguments",
      "file": "src/app.t2",
      "line": 5,
      "column": 1,
      "endLine": 5,
      "endColumn": 12,
      "expansionStack": [],
      "notes": [
        {
          "message": "macro defined here",
          "file": "stdlib/macros.t2",
          "line": 10
        }
      ]
    }
  ]
}
```

### `--error-format=short`

Minimal output for grep/scripts:

```
src/app.t2:5:1: error[E200]: macro 'when' expects at least 2 arguments
```

## IDE Integration

### Language Server Protocol

Phase B should expose diagnostics compatible with LSP:

```typescript
interface Diagnostic {
  range: Range;
  severity: DiagnosticSeverity;
  code: string;
  source: "t2-phase-b";
  message: string;
  relatedInformation?: DiagnosticRelatedInformation[];
}
```

The `relatedInformation` array carries macro definition sites and expansion chain context.

### Source Maps

For debugging compiled output, Phase B emits source maps linking generated JS back to original `.t2` source. See `SOURCE_MAPS.md` (TBD).
