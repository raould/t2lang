# T2lang Import/Export Guide

## Good News: Imports Already Work!

The t2lang compiler **already has full support** for importing and using TypeScript/JavaScript libraries. Here's how to use it:

---

## Import Syntax

### 1. Default Import

**TypeScript equivalent:** `import lodash from "lodash"`

```lisp
(import-default lodash "lodash")
```

### 2. Named Imports

**TypeScript equivalent:** `import { map, filter, reduce } from "lodash"`

```lisp
(import-named (map filter reduce) "lodash")
```

### 3. Namespace Import (Import All)

**TypeScript equivalent:** `import * as _ from "lodash"`

```lisp
(import-all _ "lodash")
```

---

## Export Syntax

### 1. Named Export

**TypeScript equivalent:** `export { myFunction }`

```lisp
(export myFunction)
```

### 2. Default Export

**TypeScript equivalent:** `export default <expression>`

```lisp
(export-default (fn greet (name) 
  (+ "Hello, " name)))
```

---

## Complete Example: Using lodash

```lisp
(program
  ; Import lodash as a namespace
  (import-all _ "lodash")
  
  ; Define some data
  (const ((numbers (array 1 2 3 4 5))))
  
  ; Use lodash functions
  (const ((doubled (_.map numbers (fn (x) (* x 2))))))
  (const ((sum (_.reduce doubled (fn (acc x) (+ acc x)) 0))))
  
  ; Output
  (console.log "Doubled:" doubled)
  (console.log "Sum:" sum))
```

**Compiles to:**

```typescript
import * as _ from "lodash";
{
  const numbers = [1, 2, 3, 4, 5];
}
{
  const doubled = _.map(numbers, (x) => {
    return x * 2;
  });
}
{
  const sum = _.reduce(doubled, (acc, x) => {
    return acc + x;
  }, 0);
}
console.log("Doubled:", doubled);
console.log("Sum:", sum);
```

---

## Complete Example: Using React

```lisp
(program
  ; Import React
  (import-default React "react")
  (import-named (useState useEffect) "react")
  
  ; Define a component
  (const ((App (fn App ()
    (const ((count setCount) (useState 0)))
    
    ; Return JSX (note: JSX support may need additional work)
    (return (obj 
      "type" "button"
      "onClick" (fn () (setCount (+ count 1)))
      "children" count))))))
  
  ; Export the component
  (export-default App))
```

---

## Complete Example: Node.js Built-ins

```lisp
(program
  ; Import Node.js modules
  (import-named (readFileSync writeFileSync) "fs")
  (import-named (join) "path")
  
  ; Read a file
  (const ((content (readFileSync (join __dirname "data.txt") "utf-8"))))
  
  ; Process and write
  (const ((processed (content.toUpperCase))))
  (writeFileSync (join __dirname "output.txt") processed)
  
  (console.log "Done!"))
```

---

## Complete Example: Express Server

```lisp
(program
  ; Import express
  (import-default express "express")
  
  ; Create app
  (const ((app (express))))
  
  ; Define a route
  (app.get "/" (fn (req res)
    (res.send "Hello from t2lang!")))
  
  ; Start server
  (app.listen 3000 (fn ()
    (console.log "Server running on port 3000"))))
```

**Compiles to:**

```typescript
import express from "express";
{
  const app = express();
}
app.get("/", (req, res) => {
  res.send("Hello from t2lang!");
});
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

---

## Type Imports (Advanced)

For importing TypeScript types, you can combine with type aliases:

```lisp
(program
  ; Import a library
  (import-named (Request Response) "express")
  
  ; Define a type alias (if needed)
  (type-alias Handler (type-function ((type-ref Request) (type-ref Response)) (type-ref void)))
  
  ; Use the types...
)
```

---

## How It Works Internally

The t2lang compiler handles imports in three phases:

### 1. Parser (`parser.ts` lines 210-214, 1200-1268)
Recognizes `import-default`, `import-named`, `import-all` forms and creates `ImportStmt` AST nodes.

### 2. AST Definition (`nodes.ts` lines 285-292)
```typescript
export interface ImportStmt extends BaseNode {
  kind: "import";
  importKind: "default" | "named" | "all";
  name?: string;      // for default and all
  names?: string[];   // for named
  alias?: string;     // for all (namespace import)
  from: string;       // the module path
}
```

### 3. Code Generator (`tsCodegen.ts` lines 568-578)
```typescript
function genImport(node: ImportStmt): string {
  if (node.importKind === "default") {
    return `import ${node.name} from "${node.from}";`;
  } else if (node.importKind === "named") {
    const names = node.names!.join(", ");
    return `import { ${names} } from "${node.from}";`;
  } else if (node.importKind === "all") {
    return `import * as ${node.alias} from "${node.from}";`;
  }
  return "";
}
```

---

## Potential Enhancements

While imports are already supported, here are some features you might want to add:

### 1. Combined Default + Named Import
**TypeScript:** `import React, { useState } from "react"`

Currently requires two separate import statements. Could add:
```lisp
(import-combined React (useState useEffect) "react")
```

### 2. Import Renaming (Aliases)
**TypeScript:** `import { map as lodashMap } from "lodash"`

Could add:
```lisp
(import-named ((map lodashMap) (filter lodashFilter)) "lodash")
```

### 3. Side-Effect Imports
**TypeScript:** `import "reflect-metadata"`

Could add:
```lisp
(import-side-effect "reflect-metadata")
```

### 4. Dynamic Imports
**TypeScript:** `const module = await import("./module")`

Could add:
```lisp
(const ((module (await (import-dynamic "./module")))))
```

---

## Summary

t2lang **already supports** the three main import patterns:
- `(import-default name "module")`
- `(import-named (names...) "module")`  
- `(import-all alias "module")`

And two export patterns:
- `(export name)`
- `(export-default expr)`

You can use any TypeScript/JavaScript library by importing it with these constructs!
