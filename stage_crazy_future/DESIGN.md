# T2 macro instrospection

✅ **Rationale for t2-lang Upgrade**

* Without built-in AST introspection, every macro must **manually traverse the AST**, parse types, and handle wrappers recursively.
* Such adds complexity, maintenance burden, and risk of errors.
* Providing macros with **first-class introspection and manipulation primitives** would make t2-conduit macros **smaller, safer, and faster**, while enabling advanced features later.

Here’s a **first-pass design document** for the **t2-lang macro system enhancements** needed to fully support **t2-conduit** features like AST inspection, metadata attachment, and compile-time error detection.

---

# **t2-lang Macro System: Pre-Requisite Design for t2-conduit**

**Purpose:**
Enhance the **t2-lang macro system** to allow introspection of the full AST, access to type annotations, and safe metadata derivation for pipelines. These changes enable **t2-conduit macros** to enforce determinism, async flags, and detect conflicts at compile-time.

---

## **1. Goals**

1. **AST Introspection:** Macros can fully traverse and analyze t2-lang AST nodes, including nested forms.
2. **Type Inspection:** Macros can determine parameter and return types from type annotations (Det<T>, Nondet<T>, Vend<T>, Promise<T>).
3. **Metadata Generation:** Macros attach `_t2conduitMeta` based on types; users do not manually annotate stages.
4. **Conflict Detection:** Macros detect mismatches between type-derived metadata and any existing annotations.
5. **Error / Warning Emission:** Macros can produce structured, deterministic error/warning objects (`T2C-xxx`).
6. **Incremental / Cache-Friendly:** Macros should be efficient for large codebases and avoid full AST recomputation.
7. **Hygienic AST Transformation:** Ensure generated AST nodes maintain hygiene, avoiding unintended capture of variables or metadata.
8. **Type source:** Types are derived from the grammer, not from tsc.

---

## **2. Macro Features**

### **2.1 AST Access API**

**Capabilities:**

* `getChildren(node)` → returns array of child nodes
* `getNodeType(node)` → returns token/type (e.g., `FN`, `LET`, `CLASS`)
* `getSourceSpan(node)` → original location for error reporting
* `walkAST(node, callback)` → recursively visit all nodes
* `cloneNode(node)` → create hygienic copy for transformations

**Notes:**

* Full AST access is required to detect nested wrappers (`Vend<Det<T>>`) and to determine stage return types.

---

### **2.2 Type Annotation Access**

**Capabilities:**

* `getTypeAnnotation(node)` → returns t2-lang type node
* `resolveType(node)` → normalized type object (e.g., Det<number>, Nondet<string>)
* `unwrapWrappers(typeNode)` → returns inner type and metadata flags

**Supported Type Wrappers for Metadata:**

* `Det<T>` → deterministic
* `Nondet<T>` → non-deterministic
* `Vend<T>` → pull-based source
* `Promise<T>` → async
* Others are ignored / treated as Nondet by default

**Behavior:**

* Macros derive metadata exclusively from types, not user-applied annotations.
* Any unknown wrapper triggers a `T2C-004` error.

---

### **2.3 Metadata Management**

**Capabilities:**

* `attachMetadata(node, metadata: StageMetadata)`
* `readMetadata(node)` → optional `_t2conduitMeta` inspection
* `checkConflict(node, metadata)` → abort macro with `T2C-002` if conflicts exist

**Metadata Structure:**

```ts
interface StageMetadata {
    async: boolean;
    determinism: 'Det' | 'Nondet';
    sourceHash?: string; // optional, generated later
    capabilities?: string[];
    version: number; // macro system version
}
```

**Policy:**

* Users are **not allowed to manually attach metadata**; macros control it fully.
* Metadata derived from types is authoritative.

---

### **2.4 Error & Warning Emission API**

**Macro APIs:**

* `emitError(code, message, node)` → halts compilation on error
* `emitWarning(code, message, node)` → allows compilation to continue

**Error Object Structure:**

```ts
interface MacroError {
    code: string; // e.g., T2C-001
    severity: 'error' | 'warning';
    message: string;
    nodeSpan?: SourceSpan;
    stageHash?: string;
}
```

**Examples of Error Codes:**

| Code    | Severity | Trigger                                  |
| ------- | -------- | ---------------------------------------- |
| T2C-001 | error    | Stage return type unknown or unsupported |
| T2C-002 | error    | Conflicting metadata detected            |
| T2C-003 | warning  | Mixed async/det flags inferred           |
| T2C-004 | error    | Unknown wrapper type                     |
| T2C-005 | error    | Stage hash collision                     |

---

### **2.5 Hygiene & AST Transformation**

* Macro-generated AST nodes **must not capture user variables accidentally**.
* `cloneNode` + proper scoping ensures generated metadata nodes are hygienic.
* AST transformations should maintain **source span mapping** for debugging and error reporting.

---

### **2.6 Incremental / Caching Considerations**

* Macros should support **incremental compilation**:

  * Cache resolved type metadata for unchanged nodes.
  * Avoid full AST walk for unchanged subtrees.
* Cache keys should incorporate **macro version**, **source hash**, and **node span**.

---

### **2.7 Integration with t2-conduit SDK**

* Macro system provides enriched AST nodes with `_t2conduitMeta` before pipeline compilation.
* Pipeline runner relies on metadata for:

  * Async normalization
  * Determinism enforcement
  * Hashing & logging
  * Stage composition / flattening

---

### **3. Developer Workflow**

1. **Write stage** with type annotations only (`Det<T>`, `Nondet<T>`, etc.).
2. **Apply t2-conduit macro**:

   ```t2
   (defmacro stage-metadata (stage-node)
       ;; internally: walk AST, inspect types, attach metadata, error if conflict
   )
   ```
3. **Macro produces enriched AST** for pipeline compiler.
4. **Errors emitted** if:

   * Stage return type unsupported
   * Conflict between inferred metadata and existing annotations
   * Unknown wrapper type

---

### **4. Future Considerations**

* Support **advanced wrapper detection** (nested CPS, stream fusion).
* Extend to **parallel / worker thread stages** with derived metadata.
* Potential **macro debugging helpers** to visualize AST and metadata derivation.

---

This document defines the **macro system prerequisites** clearly, so that **t2-conduit** macros can safely introspect the AST, derive metadata from types, and emit deterministic compile-time errors, with full hygiene and incremental compilation support.

Absolutely — here’s a **first-pass concrete macro API sketch** for **t2-conduit support**, focused on introspection, traversal, and metadata handling with hygiene in mind. This is designed to make feasibility and testability much clearer.

---

# Appendix 1: **t2-conduit Macro API**

## **A.1. AST Introspection Helpers**

These functions let macros inspect nodes, extract type info, and understand wrappers without executing user code.

```ts
// Get the canonical type info for a node
function getTypeInfo(node: ASTNode): TypeInfo {
    // Returns base type, wrappers, async flag, and determinism flag
    // Example return:
    // { base: "number", wrappers: ["Vend"], async: true, determinism: "Det" }
}

// Walk the AST recursively
function walkAST(node: ASTNode, callback: (node: ASTNode, parent?: ASTNode) => void): void;

// Get children, siblings, and parent nodes
function getChildren(node: ASTNode): ASTNode[];
function getParent(node: ASTNode): ASTNode | null;
function getSiblings(node: ASTNode): ASTNode[];

// Clone a node hygienically
function cloneNode(node: ASTNode): ASTNode;
```

**Hygiene Notes:**

* `cloneNode` ensures macros generate nodes without accidentally capturing local variables.
* All new nodes must attach metadata using `attachMetadata` rather than direct AST mutation.

---

## **A.2. Metadata Helpers**

Macros derive `_t2conduitMeta` exclusively from type information; users should never manually annotate.

```ts
interface StageMetadata {
    async: boolean;
    determinism: "Det" | "Nondet";
    sourceHash?: string;
    capabilities?: string[];
    version: number; // macro system version
}

// Attach derived metadata
function attachMetadata(node: ASTNode, metadata: StageMetadata): void;

// Read existing metadata (for conflict checking)
function readMetadata(node: ASTNode): StageMetadata | undefined;

// Abort macro if conflict between inferred and existing metadata
function checkConflict(node: ASTNode, newMeta: StageMetadata): void;
```

**Hygiene Notes:**

* `_t2conduitMeta` should be **namespaced**, immutable, and not interfere with user variables.
* Any modifications must clone nodes before attaching metadata.

---

## **A.3. Error and Warning Helpers**

```ts
interface MacroError {
    code: string;           // e.g., T2C-001
    severity: "error" | "warning";
    message: string;
    nodeSpan?: SourceSpan;
    stageHash?: string;
}

// Emit a compilation-halting error
function emitError(code: string, message: string, node: ASTNode): never;

// Emit a warning (does not stop compilation)
function emitWarning(code: string, message: string, node: ASTNode): void;
```

**Examples:**

* `T2C-001`: Stage return type unsupported
* `T2C-002`: Metadata conflict detected
* `T2C-004`: Unknown wrapper type

---

## **A.4. Wrapper / Type Utilities**

Macros need to detect wrappers (`Det<T>`, `Nondet<T>`, `Vend<T>`, `Promise<T>`) and normalize them.

```ts
interface TypeInfo {
    base: string;             // e.g., "number"
    wrappers: string[];       // ["Vend", "Det"]
    async: boolean;           // true if Promise or async wrapper
    determinism: "Det" | "Nondet";
}

// Normalize type: unwrap nested wrappers
function unwrapWrappers(typeNode: TypeNode): TypeInfo;

// Detect if node is async or deterministic
function isAsync(typeInfo: TypeInfo): boolean;
function isDeterministic(typeInfo: TypeInfo): boolean;
```

---

## **A.5. Traversal Example Usage**

```t2
(defmacro analyze-stage (stage-node)
  (walkAST stage-node
    (fn (node parent)
      (let typeInfo (getTypeInfo node))
      (when (not (supported-type? typeInfo.base))
        (emitError "T2C-001" "Unsupported return type" node))
      (let meta { async: typeInfo.async, determinism: typeInfo.determinism, version: 1 })
      (checkConflict node meta)
      (attachMetadata node meta)
    )
  )
)
```

---

### ✅ **Key Advantages of this API Sketch**

1. **Testability:** Macros can be unit-tested on small AST snippets.
2. **Feasibility:** No need for runtime evaluation of user code; everything is static analysis.
3. **Safety / Hygiene:** Nodes are cloned before modification; metadata is immutable.
4. **Conflict Detection:** Users cannot manually add metadata, so mismatch errors are prevented.
5. **Future Extensible:** Can support CPS wrappers, stream fusion, and async-push sources without changing macro traversal core.
