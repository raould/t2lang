# First Bootstrap Module: Step-by-Step Migration Plan

## Module Selection: Gensym Generator

We'll start with the `gensym` module because it's:
- **Simple**: ~50 lines of code
- **Self-contained**: No complex dependencies
- **Essential**: Used by macro system
- **Testable**: Clear inputs and outputs
- **Pure**: No side effects except internal state

## Current TypeScript Implementation

```typescript
// phaseB/src/gensym.ts
export interface GensymGenerator {
  gensym(prefix: string): string;
  getState(): Record<string, number>;
  setState(state: Record<string, number>): void;
}

export function createGensymGenerator(seed?: number): GensymGenerator {
  const counters: Record<string, number> = {};
  
  return {
    gensym(prefix: string): string {
      if (!(prefix in counters)) {
        counters[prefix] = seed ?? 0;
      }
      const id = counters[prefix]++;
      return `${prefix}$${id}`;
    },
    
    getState(): Record<string, number> {
      return { ...counters };
    },
    
    setState(state: Record<string, number>): void {
      Object.assign(counters, state);
    }
  };
}
```

## Step 1: Feature Gap Analysis

### Features Needed
- [x] Functions returning objects (already supported)
- [x] Closures over mutable state (already supported via `let*`)
- [x] Record/object types (already supported)
- [x] Optional parameters (check if supported)
- [ ] Object spread `...` (might need to check)
- [ ] `in` operator (might need to add)
- [ ] Object.assign (runtime function)

### Required Additions
1. Add `in` operator to PhaseB if not present
2. Ensure Object.assign is in t2lang runtime
3. Add object spread syntax if missing

## Step 2: T2Lang Implementation

```lisp
;; file: phaseB/gensym.t2
(program
  ;; Import runtime utilities
  (import ((hasOwnProperty) "@t2lang/runtime"))
  
  ;; Type definitions
  (export
    (type-alias GensymState
      (type-object
        ((kind (type-literal "gensym-state"))
         (counters (type-indexed :string :number))))))
  
  (export
    (type-alias GensymGenerator
      (type-object
        ((gensym (type-fn ((prefix :string)) :string))
         (getState (type-fn () GensymState))
         (setState (type-fn ((state :GensymState)) :void))))))
  
  ;; Factory function
  (export
    (fn createGensymGenerator ((seed :(type-union :number undefined)))
        :GensymGenerator
      "Create a new gensym generator with optional seed"
      
      ;; Internal state (closure)
      (let* ((counters (object)))
        
        ;; Return the generator object
        (object
          ;; gensym method
          ((gensym 
             (fn ((prefix :string)) :string
               (block
                 ;; Initialize counter for new prefix
                 (if (call ! (call hasOwnProperty counters prefix))
                   (assign (index counters prefix) 
                          (ternary (call !== seed undefined) seed 0))
                   null)
                 
                 ;; Get and increment counter
                 (const* ((id (index counters prefix))))
                 (assign (index counters prefix) 
                        (call + (index counters prefix) 1))
                 
                 ;; Return generated symbol
                 (call + prefix "$" (call toString id)))))
           
           ;; getState method
           (getState
             (fn () :GensymState
               ;; Return copy of counters
               (call Object.assign (object) counters)))
           
           ;; setState method
           (setState
             (fn ((state :GensymState)) :void
               ;; Merge state into counters
               (call Object.assign counters state))))))))
)
```

## Step 3: Test Suite in T2Lang

```lisp
;; file: phaseB/tests/gensym.test.t2
(program
  (import ((createGensymGenerator) "../gensym.t2"))
  (import ((describe it expect) "@t2lang/test"))
  
  (call describe "gensym generator" 
    (fn ()
      (block
        ;; Test 1: Basic generation
        (call it "generates unique symbols with prefix"
          (fn ()
            (let* ((gen (call createGensymGenerator)))
              (block
                (const* ((sym1 (call gen.gensym "temp"))
                        (sym2 (call gen.gensym "temp"))
                        (sym3 (call gen.gensym "var"))))
                
                (call expect sym1 (call toEqual "temp$0"))
                (call expect sym2 (call toEqual "temp$1"))
                (call expect sym3 (call toEqual "var$0"))))))
        
        ;; Test 2: Seeded generation
        (call it "starts from seed value"
          (fn ()
            (let* ((gen (call createGensymGenerator 100)))
              (block
                (const* ((sym (call gen.gensym "x"))))
                (call expect sym (call toEqual "x$100"))))))
        
        ;; Test 3: State management
        (call it "can get and restore state"
          (fn ()
            (let* ((gen (call createGensymGenerator)))
              (block
                ;; Generate some symbols
                (call gen.gensym "a")
                (call gen.gensym "a")
                (call gen.gensym "b")
                
                ;; Save state
                (const* ((state (call gen.getState))))
                
                ;; Continue generating
                (call gen.gensym "a")
                
                ;; Create new generator with saved state
                (const* ((gen2 (call createGensymGenerator))))
                (call gen2.setState state)
                
                ;; Should continue from saved state
                (const* ((sym (call gen2.gensym "a"))))
                (call expect sym (call toEqual "a$2"))))))
        
        ;; Test 4: Independent generators
        (call it "creates independent generators"
          (fn ()
            (let* ((gen1 (call createGensymGenerator))
                  (gen2 (call createGensymGenerator)))
              (block
                (call gen1.gensym "x")
                (call gen1.gensym "x")
                
                (const* ((sym (call gen2.gensym "x"))))
                (call expect sym (call toEqual "x$0"))))))))))
)
```

## Step 4: Compilation and Integration

### 4.1 Compile T2 → TS

```bash
# Use existing TypeScript compiler
cd /home/claude/t2lang-main/phaseB
npx t2tc gensym.t2 --output gensym.generated.ts
```

### 4.2 Create Wrapper/Adapter

```typescript
// phaseB/src/gensym.ts (modified)
// This file now just re-exports from the generated code
export { createGensymGenerator, GensymGenerator, GensymState } from './gensym.generated';
```

### 4.3 Run Tests

```bash
# Run existing TypeScript tests
npm test -- gensym

# Run new T2 tests (once test framework is ready)
npx t2test tests/gensym.test.t2
```

## Step 5: Verification

### 5.1 Output Comparison

Compare generated TypeScript with original:

```bash
# Original
cat phaseB/src/gensym.ts.original

# Generated
cat phaseB/src/gensym.generated.ts

# Should be semantically equivalent
```

### 5.2 Performance Testing

```typescript
// Benchmark both versions
const iterations = 1000000;

// Original TS version
console.time('TS gensym');
const genTS = createGensymGeneratorTS();
for (let i = 0; i < iterations; i++) {
  genTS.gensym('x');
}
console.timeEnd('TS gensym');

// T2-compiled version
console.time('T2 gensym');
const genT2 = createGensymGeneratorT2();
for (let i = 0; i < iterations; i++) {
  genT2.gensym('x');
}
console.timeEnd('T2 gensym');
```

### 5.3 Integration Testing

Run full compiler test suite with T2-compiled gensym:

```bash
# All phaseB tests
npm test -- phaseB/

# All integration tests
npm test -- tests/integration/

# Should all pass!
```

## Step 6: Commit and Document

### 6.1 Git Commit

```bash
git add phaseB/gensym.t2 phaseB/tests/gensym.test.t2
git commit -m "Bootstrap: Rewrite gensym in t2lang

- First module in bootstrap process
- Maintains identical API
- Includes comprehensive tests
- Generated code verified equivalent
"
```

### 6.2 Update Documentation

```markdown
# Bootstrap Progress

## Completed Modules (T2Lang)
- [x] gensym.t2 - Symbol generation for macro hygiene

## In Progress
- [ ] ast.t2 - AST type definitions
- [ ] reader.t2 - Tokenizer and parser

## Remaining (TypeScript)
- reader.ts
- sugar.ts
- expander.ts
- lower.ts
- (... rest of phaseB and phaseA)
```

## Step 7: Next Module Selection

After gensym, the logical order is:

1. **ast.t2** - AST type definitions (data only, no logic)
2. **reader.t2** - Tokenizer and parser (uses gensym)
3. **rewriter.t2** - Basic rewrites
4. **sugar.t2** - Sugar transformations (uses ast and reader)
5. **expander.t2** - Macro expansion (uses gensym, ast)

## Metrics for Success

After completing gensym migration:

- [ ] All tests pass
- [ ] Generated code size similar to hand-written TS (±20%)
- [ ] Performance within 10% of hand-written TS
- [ ] Code review finds no semantic differences
- [ ] Can successfully compile compiler using new gensym

## Potential Issues and Solutions

### Issue 1: Object Property Assignment Syntax

**Problem**: T2lang might not support `counters[prefix] = value`

**Solution**: Use explicit index/assign:
```lisp
(assign (index counters prefix) value)
```

### Issue 2: `in` Operator Not Implemented

**Problem**: `prefix in counters` might not work

**Solution**: Add to PhaseB sugar, or use runtime helper:
```lisp
(call hasOwnProperty counters prefix)
```

### Issue 3: Object Spread Not Implemented

**Problem**: `{ ...counters }` might not work

**Solution**: Use Object.assign:
```lisp
(call Object.assign (object) counters)
```

### Issue 4: Template String Interpolation

**Problem**: `` `${prefix}$${id}` `` syntax

**Solution**: Already handled, use string concatenation:
```lisp
(call + prefix "$" (call toString id))
```

## Timeline

- **Day 1**: Feature gap analysis and implementation
- **Day 2**: Write gensym.t2 and tests
- **Day 3**: Compile, test, and debug
- **Day 4**: Integration and verification
- **Day 5**: Documentation and next module planning

**Total**: ~1 week for first module (includes learning curve)

## Conclusion

The gensym module serves as the perfect bootstrapping entry point. It's small enough to be manageable but complex enough to reveal any gaps in the t2lang feature set. Successfully migrating this module will:

1. Establish the bootstrap workflow
2. Identify missing features
3. Create testing infrastructure
4. Build confidence for larger modules
5. Prove the concept of self-hosting

After this, each subsequent module should go faster as the process becomes routine.
