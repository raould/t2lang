**Stage 3E Class System**

# **1  Overview and Scope**

This document specifies the revised grammar and AST design for class support in Stage 3E. It supersedes the earlier draft, resolving five concrete issues: the this / self confusion; an incomplete super form; an awkward modifiers sub-form; missing typed parameters and return types in method signatures; and grammar-level enforcement of abstract method bodies.

*Stage 3E targets TypeScript class syntax. The codegen emits native `class` declarations. Stage 3E remains the explicit-AST stage — no dotted sugar, no implicit semantics. Everything that TypeScript class syntax implies silently must be written explicitly in the s-expression tree.*

# **2  this — Keyword, Not Parameter**

## **2.1  The problem**

The previous draft added a THIS keyword token but simultaneously showed self as a phantom first parameter in constructor and method signatures. These represent the same semantic concept. Having both creates ambiguity about which the lowering stage should read, and forces callers to mentally skip an invisible first argument.

## **2.2  Resolution**

this is a zero-argument keyword expression — semantically identical to null or undefined in that it needs no arguments and no declaration. It is never listed as a parameter. Method and constructor signatures contain only the parameters the caller passes in.

;; WRONG — do not do this(constructor ((self) (a) (b))  (set\! (. self x) a));; CORRECT(constructor ((a : string) (b : number))  (set\! (. this x) a)  (set\! (. this y) b))

The lowering pass emits this directly into the generated TypeScript. There is no self anywhere in the grammar or AST.

## **2.3  Grammar**

thisExpr    : THIS    ;// Added to expression alternatives: | thisExpr

**NOTE**  THIS must also be added to propKey so that (. obj this) parses without quoting — unusual but required for grammar completeness.

# **3  super — Two Distinct Forms**

## **3.1  The problem**

The previous draft defined a single superCall form that required a method name argument. This works for super.method(args) but cannot express super(args) — the parent-constructor delegation that appears in nearly every non-trivial constructor body. The single form silently dropped the most common use case.

## **3.2  Resolution: two explicit forms**

| Form | Stage 3E syntax | TypeScript equivalent |
| :---- | :---- | :---- |
| Constructor delegation | (super args…) | super(args…) |
| Method dispatch | (super-method name args…) | super.name(args…) |

superConstructorCall    : LPAREN SUPER expression\* RPAREN    ;superMethodCall    : LPAREN SUPER\_METHOD IDENTIFIER expression\* RPAREN    ;// Both added as expression alternatives:// | superConstructorCall// | superMethodCall

;; constructor delegation(constructor ((a : string) (b : number))  (super a b)                          ;; → super(a, b)  (set\! (. this extra) 0));; method dispatch(method :override describe ()  (returns string)  (return    (+ (super-method describe) ' \[Dog\]')))  ;; → super.describe() \+ ' \[Dog\]'

## **3.3  Lexer additions**

SUPER        : 'super' ;SUPER\_METHOD : 'super-method' ;

**WARNING**  super-call is only valid inside a constructor body. super-method is only valid inside a method body. The grammar cannot enforce this; the semantic analysis pass must.

# **4  Modifiers — Keyword Attributes, Not Sub-forms**

## **4.1  The problem**

The previous draft proposed (method (modifiers public static) greet () ...). Three problems: (1) (modifiers ...) is a positional sub-form the parser must distinguish from the method name by type, which is fragile; (2) it adds noise even when no modifier is needed; (3) it has no precedent anywhere else in the grammar.

## **4.2  Resolution: leading keyword literals**

Use the existing KEYWORD token class (the :foo literals already in the lexer) as modifier annotations. They are self-describing, absent-when-not-needed, and consistent with how Clojure and EDN use keyword metadata on forms.

;; No modifiers — zero noise(method greet () (returns string) ...);; Single modifier(method :static make ((a : string)) (returns Foo) ...);; Multiple modifiers — order does not matter(method :public :static make ((a : string)) (returns Foo) ...);; Abstract method — uses dedicated abstract-method form, not method (see Section 5)(abstract-method :public describe () (returns string))

## **4.3  Grammar**

// modifier is any KEYWORD token — validated semantically, not syntacticallymodifier : KEYWORD ;methodDef    : LPAREN METHOD modifier\* IDENTIFIER fnSignatureTyped statement\* RPAREN    ;abstractMethodDef    : LPAREN ABSTRACT\_METHOD modifier\* IDENTIFIER fnSignatureTyped RPAREN    ;fieldDef    : LPAREN FIELD modifier\* IDENTIFIER (COLON typeExpr)? expression? RPAREN    ;constructorDef    : LPAREN CONSTRUCTOR fnSignatureTyped statement\* RPAREN    ;getterDef    : LPAREN GET modifier\* IDENTIFIER fnSignatureTyped statement\* RPAREN    ;setterDef    : LPAREN SETPROP modifier\* IDENTIFIER fnSignatureTyped statement\* RPAREN    ;// classDef accepts modifiers for :abstract classes:classDef    : LPAREN CLASS modifier\* IDENTIFIER typeParams? classExtends? classImplements? classBody RPAREN    ;

## **4.4  Valid modifier keywords**

| Keyword | Applies to | Notes |
| :---- | :---- | :---- |
| :public | field, method, getter, setter | Default when absent — explicit use preferred for clarity |
| :private | field, method, getter, setter | Lowered to WeakMap or closure in Stage 3F; no \# syntax at this stage |
| :protected | field, method | Semantic constraint only; enforced by type-checker, not lowering |
| :static | field, method, getter, setter | Static fields emit as class static field declarations |
| :abstract | class only | Marks a class as abstract; cannot be instantiated. For abstract methods use the abstract-method form (Section 5) |
| :readonly | field | Token already in grammar; maps to TypeScript readonly |
| :override | method | Optional; maps to TypeScript override; checked by type-checker |

## **4.5  AST representation**

Each class element node carries a modifiers: Set\<string\> field. Values are keyword literals stripped of their leading colon:

// (method :public :static make ((a : string)) (returns Foo) ...){  type:      'MethodDef',  modifiers: new Set(\['public', 'static'\]),  name:      'make',  signature: { params: \[{ name: 'a', type: StringType }\], returnType: FooType },  body:      \[...\]}// (abstract-method :public describe () (returns string)){  type:      'AbstractMethodDef',  modifiers: new Set(\['public'\]),  name:      'describe',  signature: { params: \[\], returnType: StringType }  // no body field — grammar enforces absence}

**NOTE**  The semantic analysis pass rejects any modifier keyword not in the permitted set. An unrecognised modifier (e.g. :final) is a compile error, not silently ignored.

# **5  Abstract Methods — Grammar-Enforced, Dedicated Form**

## **5.1  The problem**

If abstract methods used the same `method` form with a `:abstract` modifier and `statement*`, the grammar cannot distinguish an abstract method (intentionally no body) from a concrete method with an accidentally empty body. Enforcing the no-body constraint would require a semantic analysis pass.

## **5.2  Resolution: abstract-method keyword**

Abstract method declarations use the dedicated `abstract-method` keyword. This form has no `statement*` production — the absence of a body is grammar-enforced, not semantically checked.

ABSTRACT\_METHOD : 'abstract-method' ;abstractMethodDef    : LPAREN ABSTRACT\_METHOD modifier\* IDENTIFIER fnSignatureTyped RPAREN    ;

The `abstract-method` form is only valid inside a class body on an `:abstract` class. The grammar permits it anywhere in a class body for simplicity; the type-checker validates class-level consistency.

;; Grammar-enforced: no body possible(abstract-method :public describe () (returns string));; Concrete method — body is required by convention(method :public describe ()  (returns string)  (return "Animal"))

## **5.3  AST note**

AbstractMethodDef has no body field. The lowering and codegen passes emit it as a TypeScript abstract method declaration: `abstract describe(): string;`

# **6  Method Signatures — Types Supported**

## **6.1  The problem**

The existing fnSignature rule uses param : LPAREN IDENTIFIER RPAREN — untyped. Lambdas can often be untyped, but class methods are declarations that appear in TypeScript emit and are called through typed interfaces. The RETURNS token already exists in the lexer but is used by no current rule.

## **6.2  Resolution: fnSignatureTyped**

Introduce a new signature rule used exclusively by class elements. The existing fnSignature is untouched; lambdas and plain functions keep their current form.

typedParam    : LPAREN IDENTIFIER OPTIONAL? (COLON typeExpr)? RPAREN    ;fnSignatureTyped    : LPAREN (typedParam (COMMA? typedParam)\*)? RPAREN      (LPAREN RETURNS typeExpr RPAREN)?    ;

## **6.3  Examples**

| Signature | Meaning |
| :---- | :---- |
| (method greet () (returns string) ...) | No params, returns string |
| (method add ((a : number) (b : number)) (returns number) ...) | Two typed params, typed return |
| (method log ((msg : string) (level? : string)) ...) | Optional second param; void return implied |
| (constructor ((name : string) (age : number)) ...) | Typed constructor — no returns clause needed |
| (abstract-method :public describe () (returns string)) | Abstract: signature only, no body — grammar-enforced |

## **6.4  Type annotations are optional**

Types are encouraged but not required by the grammar. An omitted parameter type produces any in TypeScript emit. The type-checker may warn on missing annotations depending on its strictness setting.

**NOTE**  fnSignatureTyped is also recommended — but not required — for standalone fn and lambda forms. Keeping fnSignature in place preserves backward compatibility.

# **7  Static Fields — TypeScript Class Syntax**

Stage 3E targets TypeScript class syntax. The codegen emits native `class` declarations with `static` field initializers written inline. TypeScript and the JavaScript runtime handle static field initialization order within class bodies — static fields are initialized in source order when the class is evaluated, after all static methods are available.

The codegen must emit class body elements in the order they appear in the AST. No special reordering is required.

;; Valid: static method is available when static field initializer runs(class Config  (class-body    (field :static DEFAULT\_TIMEOUT : number 5000)    (method :static fromEnv ()      (returns Config)      (return (new Config (. process env TIMEOUT))))    (field :static instance : Config      ((. Config fromEnv)))))

**WARNING**  Circular static field dependencies (A.x initializer reads A.y, A.y reads A.x) are a runtime error. Detection is deferred to the type-checker; the grammar and lowering pass do not detect cycles.

# **8  Complete Revised Grammar Fragment**

Only additions and changes are shown. The rest of Stage 3E is unchanged.

## **8.1  New lexer tokens**

CLASS           : 'class' ;CLASS\_BODY      : 'class-body' ;FIELD           : 'field' ;CONSTRUCTOR     : 'constructor' ;GET             : 'get' ;          // getter definitionSETPROP         : 'set' ;          // setter definition — distinct from SET \= 'set\!'THIS            : 'this' ;SUPER           : 'super' ;SUPER\_METHOD    : 'super-method' ;ABSTRACT\_METHOD : 'abstract-method' ;IMPLEMENTS      : 'implements' ;

## **8.2  propKey additions**

Every new token must be added to propKey per the grammar's existing IMPORTANT note:

// Add to the propKey alternatives list:| CLASS | CLASS\_BODY | FIELD | CONSTRUCTOR| GET | SETPROP | THIS | SUPER | SUPER\_METHOD | ABSTRACT\_METHOD | IMPLEMENTS

## **8.3  Parser rules**

// ─── top-level ───────────────────────────────────────────────topLevel    : defmacro | def | typeAlias | interfaceDef | classDef | statement    ;// ─── class definition ───────────────────────────────────────────classDef    : LPAREN CLASS modifier\* IDENTIFIER      typeParams? classExtends? classImplements? classBody      RPAREN    ;classExtends    : LPAREN EXTENDS typeExpr RPAREN    ;classImplements    : LPAREN IMPLEMENTS typeExpr+ RPAREN    ;classBody    : LPAREN CLASS\_BODY classElement\* RPAREN    ;classElement    : fieldDef | methodDef | abstractMethodDef | getterDef | setterDef | constructorDef    ;// ─── class elements ────────────────────────────────────────────fieldDef    : LPAREN FIELD modifier\* IDENTIFIER      (COLON typeExpr)?      expression?      RPAREN    ;constructorDef    : LPAREN CONSTRUCTOR fnSignatureTyped statement\* RPAREN    ;methodDef    : LPAREN METHOD modifier\* IDENTIFIER fnSignatureTyped statement\* RPAREN    ;abstractMethodDef    : LPAREN ABSTRACT\_METHOD modifier\* IDENTIFIER fnSignatureTyped RPAREN    ;getterDef    : LPAREN GET modifier\* IDENTIFIER fnSignatureTyped statement\* RPAREN    ;setterDef    : LPAREN SETPROP modifier\* IDENTIFIER fnSignatureTyped statement\* RPAREN    ;// ─── typed signature (new) ─────────────────────────────────────────typedParam    : LPAREN IDENTIFIER OPTIONAL? (COLON typeExpr)? RPAREN    ;fnSignatureTyped    : LPAREN (typedParam (COMMA? typedParam)\*)? RPAREN      (LPAREN RETURNS typeExpr RPAREN)?    ;// ─── expressions (additions) ─────────────────────────────────────────thisExpr             : THIS ;superConstructorCall : LPAREN SUPER expression\* RPAREN ;superMethodCall      : LPAREN SUPER\_METHOD IDENTIFIER expression\* RPAREN ;// modifier is any KEYWORD token; validated semantically:modifier             : KEYWORD ;

# **9  Full Annotated Example**

(class :abstract Animal  (extends EventEmitter)  (implements Serializable)  (class-body    (field :private name : string)    (field :private :readonly id : number)    (field :static :private count : number 0)    (constructor ((name : string) (id : number))      (super)                              ;; → super()      (set\! (. this name) name)      (set\! (. this id) id)      (set\! Animal.count (+ Animal.count 1)))    (method :public getName ()      (returns string)      (return (. this name)))    ;; abstract method — dedicated form, body absence is grammar-enforced    (abstract-method :public describe ()      (returns string))    (method :public :static getCount ()      (returns number)      (return Animal.count))    (get :public fullName ()      (returns string)      (return (. this name)))    (set :public fullName ((v : string))      (returns void)      (set\! (. this name) v))  ))(class Dog  (extends Animal)  (class-body    (field :private breed : string)    (constructor ((name : string) (id : number) (breed : string))      (super name id)                      ;; → super(name, id)      (set\! (. this breed) breed))    (method :public :override describe ()      (returns string)      (return        (+ (super-method getName) ' is a ' (. this breed))))                                           ;; → super.getName() \+ ' is a ' \+ this.breed  ))

# **10  Implementation Order**

| Phase | Focus | Scope |
| :---- | :---- | :---- |
| 1 | Minimal viable class | class · class-body · constructor · method · field · this · (super …) constructor form |
| 2 | Method super and override | super-method · :override modifier · extends wiring |
| 3 | Access control modifiers | :public · :private · :protected — semantic checking; :private lowering deferred |
| 4 | Static members | :static on fields and methods |
| 5 | Abstract | abstract-method form · :abstract on class · type-checker hooks |
| 6 | Property accessors | get · set with fnSignatureTyped |
| 7 | Interfaces | implements clause; type-checker integration; no runtime lowering needed |

# **11  Open Questions**

* **:private lowering strategy:** WeakMap pattern vs closure vs native ES2022 \# syntax deferred to a later stage. Affects Stage 3F but not Stage 3E grammar.

* **class-body wrapper:** CLASS\_BODY is structural punctuation with no semantic content. Consider whether bare positional body would be cleaner. Left as-is for AST discoverability.

* **Decorator support:** Not addressed here. Decorators are modifier-like but carry arguments, requiring a distinct form. Deferred to Stage 3F design.

* **fnSignatureTyped back-porting:** Consider whether lambda and fn should accept fnSignatureTyped optionally. Not required for classes but would unify the grammar.

* **Cycle detection in static initializers:** Currently deferred to runtime. Could be added as a static analysis pass if the type-checker walks the initializer dependency graph.

---

# **12  Implementation Todo**

Tasks are sequential. Each phase produces a passing test before the next phase begins. Grammar and AST work is front-loaded (Phase 1) because the parser must accept the full syntax before any codegen can be tested. Codegen is then layered on phase by phase.

**Note on naming conflict:** The existing grammar rule `methodDef` (used for object-literal method shorthand) must be renamed to `objectMethodDef` across Stage3D.g4, Stage3D-ast.s3c, Stage3D-lower.s3c, and Stage3D-codegen.s3c before Phase 1 begins. This frees the name `methodDef` for the class method rule defined in this document.

---

## Phase 1 — Grammar + AST + Lowering (full scope) + Codegen (core subset)

*Goal: a class with fields, a constructor, plain methods, and `this` compiles to valid TypeScript.*

### Step 1 — Grammar: rename and new tokens

- [x] Rename existing `methodDef` rule → `objectMethodDef` in Stage3D.g4; update `objectField` to reference `objectMethodDef`
- [x] Add lexer tokens: `CLASS`, `CLASS_BODY`, `FIELD`, `CONSTRUCTOR`, `THIS`, `SUPER`, `SUPER_METHOD`, `GET`, `SETPROP`, `ABSTRACT_METHOD`, `IMPLEMENTS`
- [x] Add all new tokens to the `propKey` rule
- [x] Add `thisExpr : THIS ;` rule and `| thisExpr` to `expression` (needed immediately — adding `THIS` as a keyword broke existing tests that used `this` as an identifier)

### Step 2 — Grammar: new parser rules

- [x] Add `classDef` to the `topLevel` rule
- [x] Add rules: `classDef`, `classExtends`, `classImplements`, `classBody`, `classElement`
- [x] Add element rules: `fieldDef`, `constructorDef`, `classMethodDef` (using `METHOD` token), `abstractMethodDef` (using `ABSTRACT_METHOD` token), `getterDef`, `setterDef`
- [x] Add typed signature rules: `fnSignatureTyped`, `typedParam`
- [x] Add expression alternatives: `superConstructorCall`, `superMethodCall` (`thisExpr` already done in Step 1)
- [x] Run `npm run build-grammar` — no conflicts or ambiguity warnings; all 59 existing tests pass

### Step 3 — AST: class element handlers

- [x] Rename `astMethodDef` → `astObjectMethodDef` (done in Step 1; no separate function existed — the ctx reference was inlined in `astObjectExpr`)
- [x] Add `astFnSignatureTyped` and `astTypedParam` helpers (extract name, optional-flag, type annotation, return type)
- [x] Add `astFieldDef`: extract modifiers, name, optional type annotation, optional initializer expression
- [x] Add `astConstructorDef`: extract `fnSignatureTyped`, body statements
- [x] Add `astClassMethodDef`: extract modifiers, name, `fnSignatureTyped`, body statements
- [x] Add `astAbstractMethodDef`: extract modifiers, name, `fnSignatureTyped` (no body)
- [x] Add `astGetterDef`, `astSetterDef`: extract modifiers, name, `fnSignatureTyped`, body statements
- [x] Add `astClassBody`: map `classElement` list through element dispatchers
- [x] Add `astClassDef`: extract modifiers, name, optional `typeParams`, optional `classExtends`, optional `classImplements`, `classBody`
- [x] Hook `astClassDef` into `astTopLevel` dispatcher
- [x] Add `superConstructorCall`, `superMethodCall` branches to `astExpression` (`thisExpr` was done in Step 1); 59/59 tests pass

### Step 4 — Lowering: class pass-throughs

- [x] Rename `lowerMethodDef` (object-literal method) → `lowerObjectMethodDef`; update call site (was inline, no named fn existed — skipped/N/A)
- [x] Add `lowerTypedParam`: preserve name, optional-flag; lower type annotation via `lowerTypeExpr`
- [x] Add `lowerFieldDef`: lower type annotation and initializer expression
- [x] Add `lowerConstructorDef`: lower typed params, lower body statements
- [x] Add `lowerClassMethodDef`: lower typed params, lower body statements; preserve modifiers
- [x] Add `lowerAbstractMethodDef`: lower typed params; preserve modifiers (no body)
- [x] Add `lowerGetterDef`, `lowerSetterDef`: lower typed params, lower body
- [x] Add `lowerClassDef`: lower typeParams, lower `classExtends`/`classImplements` type exprs, lower class body elements
- [x] Hook `lowerClassDef` into `lowerTopLevel` dispatcher
- [x] Add `thisExpr`, `superConstructorCall`, `superMethodCall` pass-throughs to `lowerExpr`; 59/59 tests pass

### Step 5 — Codegen: core subset only

*Emit fields, constructors, plain methods, this, super(args). Skip modifiers, static, abstract, getters/setters, extends, implements — those are Phase 2+.*

- [x] Rename `emitMethodDef` (object-literal method) → `emitObjectMethodDef`; update call site (was inline, no named fn existed — skipped/N/A)
- [x] Add `emitTypedParam`: emit `name?: Type` or `name: Type` or bare `name`
- [x] Add `emitFieldDef`: emit `name: Type = init;` or `name: Type;`
- [x] Add `emitConstructorDef`: emit `constructor(params) { body }`
- [x] Add `emitClassMethodDef`: emit `name(params): ReturnType { body }`
- [x] Add `emitAbstractMethodDef`: emit `abstract name(params): ReturnType;`
- [x] Add `emitClassBody`: join class elements with newlines, indent
- [x] Add `emitClassDef`: emit bare `class Name { body }` (no modifiers, extends, implements yet)
- [x] Hook `emitClassDef` into `emitStmt` (follows same pattern as interface-def)
- [x] Add `thisExpr` → `'this'` to `emitExpr` (already done in Step 1)
- [x] Add `superConstructorCall` → `super(args)` to `emitExpr`
- [x] Add `superMethodCall` → `super.name(args)` to `emitExpr`; 65/65 tests pass

### Step 6 — Tests: Phase 1

- [x] Write `tests/classBasic.test.ts` covering: field declaration, typed constructor, `(set! (. this x) y)`, method returning `(. this field)`, `new` the class and read properties; generic type parameter (4 tests, all pass)

---

## Phase 2 — Extends and super-method

**this is for stage3/3E only.**

*Goal: `(extends Base)` emits `extends Base`; `(super-method name args)` emits `super.name(args)`; `:override` appears on method.*

- [x] **Codegen**: `emitClassDef` — emit `extends BaseType` when `classExtends` is present
- [x] **Codegen**: `superMethodCall` already handled in Phase 1; verify it emits correctly and write a test
- [x] **Codegen**: `:override` in method modifiers — emit `override` keyword before method name
- [x] Write `tests/classExtends.test.ts`: subclass with `(extends Base)`, constructor calling `(super args)`, method using `(super-method name)`, `:override` on the overriding method

---

## Phase 3 — Access Control Modifiers

**this is for stage3/3E only.**

*Goal: `:public`, `:private`, `:protected` emit the corresponding TypeScript keyword on fields and methods.*

- [x] **Codegen**: `emitFieldDef` — prepend `public`/`private`/`protected`/`readonly` from modifiers set before field name
- [x] **Codegen**: `emitClassMethodDef` — prepend access modifier before method name
- [x] **Codegen**: `emitAbstractMethodDef` — prepend access modifier
- [x] **Codegen**: `emitGetterDef`, `emitSetterDef` — implement and prepend access modifier
- [x] Write `tests/classModifiers.test.ts`: :private field + :public methods, :readonly fields, getter/setter with access modifiers

---

## Phase 4 — Static Members

**this is for stage3/3E only.**

*Goal: `:static` on fields and methods emits the `static` keyword.*

- [x] **Codegen**: `emitFieldDef` — emit `static` when `:static` in modifiers (combined with access modifier: `private static`)
- [x] **Codegen**: `emitClassMethodDef` — emit `static` when `:static` in modifiers
- [x] **Codegen**: `emitGetterDef`, `emitSetterDef` — emit `static` when `:static` in modifiers
- [x] Write `tests/classStatic.test.ts`: static field with initializer, static method, reading static field from static method, static + instance members coexisting

---

## Phase 5 — Abstract Classes and Methods

**this is for stage3/3E only.**

*Goal: `abstract-method` emits `abstract name(): T;`; `:abstract` on class emits `abstract class`.*

- [x] **Codegen**: `emitAbstractMethodDef` — emits `[access] abstract name(params): ReturnType;` (access modifier support added in Phase 3)
- [x] **Codegen**: `emitClassDef` — emit `abstract class` when `:abstract` in class modifiers
- [x] Write `tests/classAbstract.test.ts`: abstract base with abstract method + concrete subclass (3 tests: single subclass, multiple subclasses, abstract method with params)

---

## Phase 6 — Property Accessors

**this is for stage3/3E only.**

*Goal: `(get name () (returns T) ...)` emits `get name(): T { ... }`; same for set.*

- [x] **Codegen**: `emitGetterDef` — emits `[access] [static] get name(): ReturnType { body }` (implemented in Phase 3)
- [x] **Codegen**: `emitSetterDef` — emits `[access] [static] set name(param: Type) { body }` (implemented in Phase 3)
- [x] Hook both into `emitClassElement` dispatch (done in Phase 3)
- [x] Write `tests/classAccessors.test.ts`: basic get/set, computed getter, clamping setter, getter override in subclass

---

## Phase 7 — Implements Clause

**this is for stage3/3E only.**

*Goal: `(implements I1 I2)` emits `implements I1, I2`.*

- [x] **Codegen**: `emitClassDef` — emit `implements I1, I2` when `classImplements` is present; append after `extends` clause if both present
- [x] Write `tests/classImplements.test.ts`: class implementing an interface (interface defined in same test source), verify method presence and types

---

## Final Verification

**this is for stage3/3E only.**

- [x] Run full test suite (`npm test`) — all existing 59+ tests still pass alongside new class tests
- [x] Run `npm test` a second time from a clean state to verify the bootstrap build is stable
