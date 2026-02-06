# Summary: the recommended T2 callable taxonomy

| T2 form | JS output | Use case |
|--------|-----------|----------|
| `(lambda (args…) body…)` | arrow | callbacks, FP, lexical `this` |
| `(fn "name" (args…) body…)` | function | dynamic `this`, constructors |
| `(fn (args…) body…)` | anonymous function | same as above |
| `(method "name" (args…) body…)` | method | object/class methods |
| `(class Name …)` | class | OO patterns |
| `(call f args…)` | function call | universal invocation |
| `(new C args…)` | constructor call | class instantiation |

# Further features

- [x] async
- [x] generators
  - [ ] TODO: tests.
- [x] base class

# The core principle  
**T2 should not try to infer what kind of callable the user wants.  
It should require explicit forms for each callable category.**

JavaScript has *four* distinct callable constructs with different semantics:

| JS construct | Has `this`? | Can be `new`? | Lexical `this`? | Prototype? |
|--------------|-------------|---------------|------------------|------------|
| `function` | dynamic | yes | no | yes |
| arrow `=>` | no | no | yes | no |
| method | dynamic | yes | no | yes |
| class constructor | dynamic | yes | no | yes |

If T2 tries to guess, it will be wrong in real programs.

So the right move is:  
**each callable form gets its own explicit S‑expression.**

---

# recommended T2 callable forms

## **1. `(lambda (args…) body…)` → arrow function**
This is the simplest and most predictable mapping.

```lisp
(lambda (x y) (+ x y))
```

→

```ts
(x, y) => x + y
```

### Why this is good
- lexical `this`  
- lexical `arguments`  
- cannot be used as a constructor  
- no prototype  
- perfect for functional programming  
- perfect for callbacks  

This should be the *default* function form in T2.

---

## **2. `(fn name (args…) body…)` → function declaration**
This maps to classic JS functions.

```lisp
(fn add (x y) (+ x y))
```

→

```ts
function add(x, y) {
  return x + y;
}
```

### Why this is needed
- dynamic `this`  
- can be used with `new`  
- has a prototype  
- hoisted  
- matches JS semantics exactly  

This is the “real function” form.

---

## **3. `(method "name" (args…) body…)` → method definition**
This is for object literals and classes.

```lisp
(method "greet" (name) (template "Hello, ${name}!"))
```

→ inside an object:

```ts
greet(name) {
  return `Hello, ${name}!`;
}
```

### Why this matters
Methods have:

- dynamic `this`  
- special `super` binding  
- special `[[HomeObject]]` semantics  

You cannot fake this with arrows or functions.

---

## **4. `(class Name (extends Base) (fields…) (methods…))`**
This is optional but recommended.

It gives you:

- constructors  
- methods  
- static methods  
- inheritance  

And it maps cleanly to TypeScript.

---

## **5. `(call f args…)` should work for *any* invokable**
This is the beauty of the design:

- arrows  
- functions  
- methods  
- bound functions  
- class constructors (with a separate `(new ...)` form)

All can be invoked with:

```lisp
(call f 1 2 3)
```

→

```ts
f(1, 2, 3)
```

---

# Should `(lambda …)` be the *only* way to get an arrow?  
**Yes. Absolutely.**

This is the cleanest and safest rule:

- `(lambda …)` → always arrow  
- `(fn …)` → always function  
- `(method …)` → always method  
- `(class …)` → always class  

No inference.  
No guessing.  
No heuristics.

This keeps T2 predictable and avoids the “why did it generate a function instead of an arrow?” problem.

---

# What about anonymous functions?  
Use:

- `(lambda (args…) body…)` for anonymous arrows  
- `(fn (args…) body…)` for anonymous functions  

Example:

```lisp
(fn (x) (* x x))
```

→

```ts
function (x) { return x * x }
```

---

# What about async?  
Extend each form:

- `(lambda async (args…) body…)`  
- `(fn async name (args…) body…)`  
- `(method async "name" (args…) body…)`

Example:

```lisp
(lambda async (x) (await (call fetch x)))
```

→

```ts
async (x) => await fetch(x)
```

---

# What about generators?  
Same pattern:

- `(fn generator name (args…) body…)`  
- `(method generator "name" (args…) body…)`

---

This gives T2:

- clarity  
- predictability  
- full JS/TS semantic coverage  
- zero ambiguity  
- a clean mapping from S‑expressions to JS constructs  
