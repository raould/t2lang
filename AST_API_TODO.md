# AST-First Programming: Safe Program Manipulation via a Tree API

## The Core Idea

Every program has two representations:

- **The AST** — the actual structure of the program, as a tree of nodes
- **The text** — a rendering of that tree into some syntax (S-expressions, TypeScript, JSON, etc.)

Most tooling, including AI agents, works on the text. This is the wrong level of abstraction.

Text is fragile. A single missing parenthesis, a mismatched bracket, an unclosed string — any of these makes the program unparsable, and an unparsable program cannot be reasoned about structurally. When AI agents write or edit code as raw text, they are one typo away from producing something that cannot even be read back in.

The AST is not fragile. It is always well-formed by construction. You cannot have an "unclosed parenthesis" in a tree — that concept doesn't exist at the tree level.

**The proposal: make the AST the primary artifact, and expose it via an API that makes syntactically invalid programs impossible to produce.**

---

## The Two Guarantees

This approach separates two concerns that are often conflated:

1. **Syntactic validity** — does the program have valid structure? Can it be parsed?
2. **Semantic correctness** — does the program do the right thing?

The API guarantees (1) completely. Every program state reachable through the API is syntactically valid. The agent's job is to worry about (2) — what the program *does* — without also having to worry about whether it is *well-formed*.

This is the same principle behind typed APIs generally. A `Date` object cannot represent "Octember 47th" — that is ruled out by construction. Similarly, an AST node for a function call cannot have an unclosed argument list — that concept does not exist in the tree model.

---

## The API Shape

The API has three responsibilities:

### 1. Construction

Every node type in the language has a corresponding constructor function. You build programs by composing these constructors, not by writing strings.

```
create_fn(name, params, body) → NodeId
create_call(callee, args)     → NodeId
create_if(cond, then, else)   → NodeId
create_let(name, value)       → NodeId
create_identifier(name)       → NodeId
create_literal(value)         → NodeId
```

Every constructor returns a `NodeId` — a stable handle to the node in the tree store. Constructors cannot produce malformed nodes. If you pass the wrong number of arguments to a constructor, that is a programming error in the agent, not a broken program in the store.

### 2. Mutation

Existing programs can be edited by navigating the tree and replacing nodes.

```
get(id)                          → Node
children(id)                     → NodeId[]
parent(id)                       → NodeId | null

replace(id, new_id)              → void
insert_child(parent, pos, id)    → void
remove_child(parent, pos)        → void
```

Every mutation preserves well-formedness. You cannot `replace` a node with something of the wrong kind — the store validates the replacement against the expected node type at that position.

### 3. Rendering

The tree can be serialized into any text representation. Rendering is a read-only operation — it does not modify the tree.

```
to_sexpr(id)       → string   // human-readable S-expression form
to_typescript(id)  → string   // via the language's transpiler
```

Multiple renderers can coexist. Adding a new renderer does not change the tree model.

---

## Importing Existing Code

Raw text enters the system through exactly one gate:

```
parse(text) → NodeId | ParseError
```

If parsing succeeds, you get a valid tree. If it fails, you get a clean error and no partial or broken state is stored. After parsing, all subsequent work happens through the API — the original text is discarded.

This means the API can be used to edit existing programs, not just create new ones. An agent can parse a file, navigate to the relevant node, mutate it, and re-render — never touching raw text directly.

---

## Why S-Expressions as the Human View

S-expressions are nearly isomorphic to AST nodes. A list `(head arg1 arg2)` maps directly to a tree node with a head and children. This makes S-expressions a natural human-facing rendering of the tree — they expose the structure honestly, without hiding it behind syntactic sugar.

Humans can:

- Read the S-expression rendering to understand what the program does
- Edit the S-expression rendering in a text editor
- Feed the edited text back through `parse()` to re-enter the API world

If the human introduces a syntax error during editing, `parse()` will reject it cleanly. The tree store retains the last valid state. The agent can continue working from that state regardless of what the human did to the text.

This gives humans full editing power without compromising the structural guarantees the agent relies on.

---

## Application to t2lang

T2lang is an S-expression language that transpiles to TypeScript. It already has a detailed grammar (ANTLR4 `Stage9.g4`) that defines every node type and its children. This grammar is the complete specification of the AST API — it just needs to be surfaced as a library rather than a parser.

### The Grammar as API Specification

Every parser rule in the grammar corresponds to an API constructor. For example:

| Grammar Rule | API Constructor |
|---|---|
| `fn` | `create_fn(name?, signature, body[])` |
| `letStmt` | `create_let(binding, value)` |
| `ifForm` | `create_if(cond, then[], else[]?)` |
| `call` | `create_call(callee, typeArgs?, args[])` |
| `classDef` | `create_class(name, typeParams?, extends?, implements?, body)` |
| `importForm` | `create_import(specifier, source)` |

The full set of constructors is mechanically derivable from the grammar. The grammar already encodes which children are required, which are optional, and which are variadic — this maps directly to constructor signatures.

### What the Agent Gains

An AI agent writing t2lang today must:

- Remember correct S-expression syntax for every form
- Balance parentheses across potentially large edits
- Hope that any generated text round-trips cleanly through the parser

With the AST API, the agent instead:

- Calls typed constructors for each form
- Navigates and mutates the tree by node ID
- Calls `to_sexpr()` at the end to get readable output, or `to_typescript()` to get the final artifact

The agent is freed from all syntax concerns and can focus entirely on program logic.

### The propKey Problem Goes Away

The grammar has a large `propKey` rule that exhaustively lists every keyword that can legally appear as a property name. This rule exists because the text-level parser needs to distinguish keywords from identifiers. In the AST API, property access takes a node — any valid key expression — and the `propKey` list simply does not exist as a concept. An entire class of grammar maintenance burden disappears.

### Suggested Implementation Shape (TypeScript)

```typescript
// The tree store — owns all nodes
interface T2AST {
  // Constructors (one per grammar rule)
  fn(name: string | null, sig: NodeId, body: NodeId[]): NodeId;
  call(callee: NodeId, args: NodeId[], typeArgs?: NodeId): NodeId;
  letStmt(binding: NodeId, value: NodeId): NodeId;
  ifForm(cond: NodeId, then: NodeId[], else_: NodeId[] | null): NodeId;
  identifier(name: string): NodeId;
  literal(value: string | number | boolean | null): NodeId;
  // ... one method per grammar rule

  // Navigation
  get(id: NodeId): ASTNode;
  children(id: NodeId): NodeId[];
  parent(id: NodeId): NodeId | null;

  // Mutation
  replace(id: NodeId, replacement: NodeId): void;
  insertChild(parent: NodeId, pos: number, child: NodeId): void;
  removeChild(parent: NodeId, pos: number): void;

  // Import
  parse(sexpr: string): NodeId;  // only entry point for raw text

  // Render
  toSexpr(id: NodeId): string;
  toTypeScript(id: NodeId): string;
}
```

The `toTypeScript` renderer is just the existing t2lang transpiler, repointed to consume `NodeId` values from the tree store rather than raw parsed input.

---

## Summary

| | Text-based editing | AST API |
|---|---|---|
| Syntactic validity | Possible to break | Guaranteed by construction |
| AI agent failure mode | Malformed output | Wrong logic, never broken syntax |
| Human editing | Direct | Via parse/render cycle |
| Existing code | Editable directly | Import via `parse()`, then API |
| Renderer | One (the source text) | Many (S-expr, TypeScript, others) |
| Grammar maintenance | propKey lists, etc. | Not needed |

The AST is the program. Text is a view. Make the API reflect that, and a large class of agent errors becomes structurally impossible.
