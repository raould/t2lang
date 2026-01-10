# Macro Execution Sandbox Boundaries

To ensure safe and predictable macro expansion, the t2lang compiler enforces the following sandbox boundaries:

1. **Recursion Depth Limit**: Macro expansion is limited to a maximum depth of **100**. Exceeding this limit will trigger a compilation error to prevent infinite recursion.
2. **No Side Effects**: Macros must be pure functions of their input AST. The following are strictly prohibited during macro expansion:
   - **No File System Access**: Macros cannot read from or write to the file system.
   - **No Network Access**: Macros cannot perform HTTP requests or any other network operations.
   - **No System Calls**: Macros cannot execute shell commands or interact with the operating system.

These boundaries ensure that the compilation process remains deterministic, secure, and performant.

# Pseudo-code Macro examples.

Until Phase B macros are working, the syntax here is pseudocode.

# Leveraging S-Expression Macros in the TypeScript/JavaScript Ecosystem

## Summary: Why Macros Matter for TypeScript

With t2lang's upcoming macro system (based on Clojure-style `defmacro` with quasiquoting and `gensym`), developers gain the ability to perform **compile-time code transformations** that are impossible in vanilla TypeScript. This document explores practical examples of how macros could revolutionize common patterns in the TS/JS ecosystem.

| Capability | Without Macros | With t2lang Macros |
|------------|----------------|-------------------|
| Code generation | External tools, build steps | Inline, type-aware |
| Dead code elimination | Runtime checks, bundler heuristics | Compile-time evaluation |
| DSLs | Tagged template literals (limited) | Full AST transformation |
| Boilerplate reduction | Copy-paste, code generators | Single source of truth |
| Performance optimization | Manual, error-prone | Automatic inlining/unrolling |
| Type inference | Limited to TS capabilities | Extended via macro output |

The key insight is that macros operate at **compile time on code as data**, enabling transformations that are fundamentally impossible with runtime-only approaches. t2lang's homoiconic s-expression syntax makes these transformations natural and composable, bringing Lisp's legendary metaprogramming power to the TypeScript ecosystem.

---

## 1. React & UI Framework Patterns

### 1.1 Auto-Memoized Components

React's `useMemo` and `useCallback` require manual dependency arrays that are error-prone. A macro can analyze code and generate correct dependencies automatically. (Note: Since t2lang does not yet support JSX, it is unlikely it will be used closely with React et. al.)

```lisp
;; Define the macro
(defmacro auto-memo (deps & body)
  (let* ((extracted-deps (analyze-free-vars body)))
    `(useMemo (fn () ~@body) (array ~@extracted-deps))))

;; Usage
(auto-memo ()
  (expensive-computation data filter))

;; Expands to:
(useMemo (fn () (expensive-computation data filter)) 
         (array data filter))
```

### 1.2 CSS-in-JS with Static Extraction

Macros can extract CSS at compile time, eliminating runtime overhead:

```lisp
(defmacro styled (tag & styles)
  (let* ((class-name (gensym "css"))
         (css-string (compile-styles-to-css styles)))
    ;; Side effect: write to CSS file during compilation
    (emit-css-to-file! class-name css-string)
    `(fn (props)
       (createElement ~tag 
         (object "className" ~(symbol->string class-name)
                 ,@(props-spread props))))))

;; Usage
(const Button (styled "button"
  :background "blue"
  :padding "10px"
  :hover (:background "darkblue")))
```

### 1.3 Automatic Prop Types from Runtime Checks

Generate TypeScript types AND runtime validators from a single source of truth:

```lisp
(defmacro defcomponent (name props-spec & body)
  (let* ((type-def (props-spec->typescript props-spec))
         (validator (props-spec->runtime-validator props-spec)))
    `(block
       (type ~(symbol-concat name "Props") ~type-def)
       (const ~name 
         (fn (props: ~(symbol-concat name "Props"))
           (when __DEV__ (~validator props))
           ~@body)))))

;; Usage
(defcomponent UserCard
  {:name (required string)
   :age (optional number :default 0)
   :role (enum "admin" "user" "guest")}
  (div (p name) (p age)))
```

---

## 2. State Management Patterns

### 2.1 Immer-like Immutable Updates Without Runtime

Macros can transform mutable-looking code into immutable updates at compile time:

```lisp
(defmacro produce (state & mutations)
  (let* ((draft (gensym "draft")))
    (transform-mutations-to-spread state mutations)))

;; Usage
(produce user
  (set! name "Alice")
  (set! address.city "NYC")
  (push! tags "verified"))

;; Expands to pure spread operations:
(object 
  ,@user
  "name" "Alice"
  "address" (object ,@(prop user "address") "city" "NYC")
  "tags" (array ,@(prop user "tags") "verified"))
```

### 2.2 Redux Action Creators + Reducers in One

Define action and its reducer behavior together:

```lisp
(defmacro defaction (name params reducer-body)
  (let* ((action-type (symbol->screaming-snake name)))
    `(block
       ;; Action creator
       (export (const ~name 
         (fn ~params
           (object "type" ~action-type ,@(params-to-payload params)))))
       
       ;; Register reducer case (side effect to registry)
       ~(register-reducer-case! action-type reducer-body))))

;; Usage
(defaction increment-by (amount: number)
  (object ,@state "count" (+ (prop state "count") amount)))
```

### 2.3 Reactive Signals with Fine-Grained Tracking

Implement SolidJS-style signals without runtime proxy overhead:

```lisp
(defmacro createSignal (initial)
  (let* ((value-sym (gensym "value"))
         (subscribers-sym (gensym "subs")))
    `(let* ((~value-sym ~initial)
            (~subscribers-sym (array)))
       (array
         ;; Getter
         (fn () 
           (track-dependency! ~subscribers-sym)
           ~value-sym)
         ;; Setter  
         (fn (new-val)
           (set! ~value-sym new-val)
           (notify-subscribers! ~subscribers-sym))))))

(defmacro createEffect (& body)
  (let* ((deps (extract-signal-reads body)))
    `(effect-impl (fn () ~@body) (array ~@deps))))
```

---

## 3. Testing & Mocking Patterns

### 3.1 Property-Based Testing DSL

```lisp
(defmacro forall (bindings & assertions)
  (let* ((generators (bindings->generators bindings))
         (test-fn (gensym "testFn")))
    `(let* ((~test-fn (fn ~(bindings->params bindings) ~@assertions)))
       (runPropertyTest 
         ~test-fn 
         (object ,@generators)
         (object "numRuns" 100)))))

;; Usage
(forall ((x (gen/int -100 100))
         (y (gen/int -100 100)))
  (assert (== (+ x y) (+ y x)))    ;; commutativity
  (assert (== (+ x 0) x)))          ;; identity
```

### 3.2 Snapshot Testing with Automatic Updates

```lisp
(defmacro expect-snapshot (name expr)
  (let* ((snapshot-path (compute-snapshot-path name))
         (current-value (gensym "current")))
    `(let* ((~current-value ~expr))
       (if (file-exists? ~snapshot-path)
           (assert-deep-equal ~current-value (read-snapshot ~snapshot-path))
           (write-snapshot! ~snapshot-path ~current-value)))))
```

### 3.3 Auto-Mocking Imports

```lisp
(defmacro with-mocks (mock-specs & body)
  `(block
     ;; Save originals
     ~@(map (fn (spec) 
              `(const ~(gensym "orig") ~(mock-target spec)))
            mock-specs)
     ;; Apply mocks
     ~@(map (fn (spec)
              `(set! ~(mock-target spec) ~(mock-impl spec)))
            mock-specs)
     ;; Run body
     (try
       ~@body
       (finally
         ;; Restore originals
         ~@(map (fn (spec orig)
                  `(set! ~(mock-target spec) ~orig))
                mock-specs originals)))))
```

---

## 4. API & Data Fetching Patterns

### 4.1 Type-Safe API Client Generation

Generate fully typed API clients from a schema at compile time:

```lisp
(defmacro defapi (name base-url & endpoints)
  (let* ((client-methods 
           (map (fn (endpoint)
                  (generate-typed-method endpoint))
                endpoints)))
    `(const ~name
       (object
         "baseUrl" ~base-url
         ~@client-methods))))

;; Usage
(defapi userApi "/api/v1"
  (GET "/users" -> (Array User))
  (GET "/users/:id" (id: string) -> User)
  (POST "/users" (body: CreateUserDto) -> User)
  (DELETE "/users/:id" (id: string) -> void))

;; Expands to fully typed methods with path interpolation
```

### 4.2 GraphQL Query Builder with Type Inference

```lisp
(defmacro gql (& query-parts)
  (let* ((parsed (parse-graphql query-parts))
         (types (infer-graphql-types parsed schema))
         (query-string (compile-graphql parsed)))
    `(object
       "query" ~query-string
       "types" ~types  ;; Compile-time type that flows to result
       "variables" ~(extract-variables parsed))))

;; Usage
(const result 
  (await (graphqlClient.query
    (gql 
      (query GetUser ($id: ID!)
        (user (id: $id)
          name
          email
          (posts (first: 10)
            title)))))))
;; result.data.user is fully typed!
```

### 4.3 Retry/Circuit Breaker Wrapping

```lisp
(defmacro with-retry (opts & body)
  (let* ((attempt (gensym "attempt"))
         (result (gensym "result"))
         (max-retries (or (prop opts "maxRetries") 3))
         (delay (or (prop opts "delay") 1000)))
    `(let* ((~attempt 0))
       (while (< ~attempt ~max-retries)
         (try
           (let* ((~result (block ~@body)))
             (return ~result))
           (catch e
             (set! ~attempt (+ ~attempt 1))
             (when (>= ~attempt ~max-retries) (throw e))
             (await (delay ~delay))))))))
```

---

## 5. Performance & Optimization Patterns

### 5.1 Compile-Time Partial Evaluation

Evaluate pure expressions at compile time:

```lisp
(defmacro const-eval (expr)
  (if (pure-expr? expr)
      (eval-at-compile-time expr)  ;; Returns literal
      expr))                        ;; Falls back to runtime

;; Usage
(const LOOKUP_TABLE (const-eval (generate-lookup-table 256)))
;; The table is computed once at compile time, embedded as literal
```

### 5.2 Loop Unrolling

```lisp
(defmacro unroll (n var & body)
  `(block
     ~@(map (fn (i) 
              `(let* ((~var ~i)) ~@body))
            (range 0 n))))

;; Usage
(unroll 4 i
  (set! (index arr i) (* (index arr i) 2)))

;; Expands to 4 separate statements with no loop overhead
```

### 5.3 Inline Function Expansion

```lisp
(defmacro definline (name params & body)
  (register-inline! name params body)
  `(const ~name (fn ~params ~@body)))

(defmacro call-inline (name & args)
  (if (inlinable? name)
      (substitute-inline name args)
      `(~name ~@args)))
```

---

## 6. Error Handling & Logging Patterns

### 6.1 Result Type with Pattern Matching

```lisp
(defmacro try-result (& body)
  (let* ((result (gensym "result")))
    `(try
       (Ok (block ~@body))
       (catch e
         (Err e)))))

(defmacro match-result (expr ok-case err-case)
  (let* ((val (gensym "val")))
    `(let* ((~val ~expr))
       (if (prop ~val "ok")
           (let* ((~(first ok-case) (prop ~val "value")))
             ~(second ok-case))
           (let* ((~(first err-case) (prop ~val "error")))
             ~(second err-case))))))

;; Usage
(match-result (try-result (await fetchUser id))
  (user (render-profile user))
  (err (show-error err)))
```

### 6.2 Structured Logging with Context

```lisp
(defmacro with-log-context (context & body)
  `(let* ((__log-context__ (merge-contexts __log-context__ ~context)))
     ~@body))

(defmacro log (level message & data)
  `(logger.~level 
     (object 
       "message" ~message
       "context" __log-context__
       "timestamp" (Date.now)
       "location" ~(current-source-location)
       ~@data)))
```

### 6.3 Assert with Rich Error Messages

```lisp
(defmacro assert-that (expr)
  `(when (not ~expr)
     (throw (Error 
       (concat "Assertion failed: " 
               ~(sexpr->string expr)
               "\nAt: " ~(current-source-location)
               "\nValues: " ~(extract-and-stringify-values expr))))))

;; Usage
(assert-that (> (len users) 0))
;; Error: Assertion failed: (> (len users) 0)
;;        At: src/app.t2:42
;;        Values: users=[], (len users)=0
```

---

## 7. Domain-Specific Languages (DSLs)

### 7.1 SQL Query Builder with Injection Protection

```lisp
(defmacro sql (& parts)
  (let* ((sql-string (gensym "sql"))
         (params (gensym "params"))
         (parsed (parse-sql-template parts)))
    `(object
       "text" ~(compile-sql-text parsed)
       "values" (array ~@(extract-sql-params parsed)))))

;; Usage
(const query 
  (sql SELECT * FROM users 
       WHERE name = ~name 
       AND age > ~min-age
       ORDER BY created_at DESC))
;; Automatically parameterized, no SQL injection possible
```

### 7.2 State Machine DSL

```lisp
(defmacro defmachine (name & states)
  (let* ((state-map (parse-states states))
         (transition-table (build-transitions state-map)))
    `(const ~name
       (object
         "initial" ~(find-initial state-map)
         "states" ~(compile-state-config state-map)
         "transition" (fn (current event)
           (match (array current event)
             ~@(compile-transition-cases transition-table)))))))

;; Usage
(defmachine trafficLight
  (state :red
    (on :timer -> :green))
  (state :green  
    (on :timer -> :yellow))
  (state :yellow
    (on :timer -> :red)))
```

### 7.3 Validation Schema DSL

```lisp
(defmacro defschema (name & fields)
  (let* ((type-def (schema->typescript fields))
         (validator (schema->validator fields))
         (parser (schema->parser fields)))
    `(block
       (type ~name ~type-def)
       (const ~(symbol-concat name "Schema")
         (object
           "validate" ~validator
           "parse" ~parser
           "isValid" (fn (x) (try (do (~validator x) true) (catch _ false))))))))

;; Usage
(defschema UserInput
  (email :string :format "email" :required)
  (age :number :min 0 :max 150 :optional)
  (role :enum ("admin" "user") :default "user"))
```

---

## 8. Build-Time Features

### 8.1 Environment-Based Code Elimination

```lisp
(defmacro when-env (env & body)
  (if (== (get-env "NODE_ENV") env)
      `(block ~@body)
      `(void)))

(defmacro dev-only (& body)
  `(when-env "development" ~@body))

(defmacro prod-only (& body)  
  `(when-env "production" ~@body))

;; Usage
(dev-only
  (console.log "Debug info:" state)
  (window.__DEV_TOOLS__ = devTools))
;; Completely eliminated in production builds
```

### 8.2 Feature Flags at Compile Time

```lisp
(defmacro feature (flag & body)
  (if (feature-enabled? flag)
      `(block ~@body)
      `(void)))

;; Usage
(feature :new-checkout-flow
  (const CheckoutPage (lazy (fn () (import "./NewCheckout")))))
```

### 8.3 Asset Inlining

```lisp
(defmacro inline-svg (path)
  (let* ((svg-content (read-file-at-compile-time path)))
    `(dangerouslySetInnerHTML 
       (object "__html" ~svg-content))))

(defmacro inline-json (path)
  (let* ((json-content (read-json-at-compile-time path)))
    `~json-content))  ;; Embedded as literal
```

---

## 9. Concurrency & Async Patterns

### 9.1 Go-style Channels

```lisp
(defmacro go (& body)
  `(spawn-task (fn () ~@body)))

(defmacro chan-select (& cases)
  (let* ((compiled-cases (map compile-select-case cases)))
    `(await (Promise.race 
       (array ~@(map case->promise compiled-cases))))))

;; Usage
(go
  (loop
    (chan-select
      ((recv ch1) => (process-a value))
      ((recv ch2) => (process-b value))
      (:timeout 1000 => (handle-timeout)))))
```

### 9.2 Parallel Map with Concurrency Limit

```lisp
(defmacro pmap (opts fn coll)
  (let* ((concurrency (or (prop opts "concurrency") 10)))
    `(parallel-map-impl ~fn ~coll ~concurrency)))

;; Usage
(const results 
  (await (pmap {:concurrency 5}
           (fn (url) (fetch url))
           urls)))
```

---

## 10. Type-Level Programming

### 10.1 Derive Pattern (like Rust)

```lisp
(defmacro derive (type-name & traits)
  `(block
     ~@(map (fn (trait)
              (generate-trait-impl type-name trait))
            traits)))

;; Usage
(type User (object "id" string "name" string))
(derive User 
  :Eq        ;; Generates equality function
  :Ord       ;; Generates comparison  
  :Hash      ;; Generates hash function
  :Debug     ;; Generates toString
  :Clone)    ;; Generates deep clone
```

### 10.2 Opaque Type Wrappers

```lisp
(defmacro newtype (name underlying & opts)
  (let* ((validator (prop opts "validate")))
    `(block
       ;; Branded type for compile-time safety
       (type ~name (& ~underlying (object "__brand" ~(symbol->string name))))
       
       ;; Constructor with optional validation
       (const ~(symbol-concat "mk" name)
         (fn (value: ~underlying): ~name
           ~(when validator `(~validator value))
           (return (value as ~name))))
       
       ;; Unwrap
       (const ~(symbol-concat "un" name)
         (fn (wrapped: ~name): ~underlying
           (return (wrapped as ~underlying)))))))

;; Usage
(newtype UserId string :validate (fn (s) (assert (> (len s) 0))))
(newtype Email string :validate validate-email)
```

## 11 The Big Payoff: t2lang Macros for Conduit-Style Streaming

These macro sketches use Clojure-style `defmacro` with `gensym`, quasiquote (`` ` ``), unquote (`~`), and unquote-splice (`~@`) as specified for t2lang's Phase B macro system.

---

### 1. Pipeline Operator (`|>`)

A threading macro that makes pipelines read top-to-bottom:

```lisp
(defmacro |> (source & stages)
  "Thread source through stages. Last stage can be a Pipe or Sink.
   (|> src p1 p2 sink) expands to (pipe src p1 p2 sink)"
  `(pipe ~source ~@stages))

;; Usage:
(|> (fromFile "data.csv")
    (splitLines)
    (drop 1)
    (map parseCSVLine)
    (chunk 100)
    (flatMap (fn (batch) (db.insertMany batch)))
    (count))

;; Expands to:
(pipe (fromFile "data.csv")
      (splitLines)
      (drop 1)
      (map parseCSVLine)
      (chunk 100)
      (flatMap (fn (batch) (db.insertMany batch)))
      (count))
```

### 1.1 Async Pipeline (`|>!`)

For when you want to `await` the result inline:

```lisp
(defmacro |>! (source & stages)
  "Like |> but wraps in await for immediate execution.
   (|>! src p1 sink) expands to (await (pipe src p1 sink))"
  `(await (pipe ~source ~@stages)))

;; Usage:
(const count 
  (|>! (fromArray items)
       (filter valid?)
       (count)))
```

---

### 2. SQL Query Macros

#### 2.1 Basic SQL with Parameter Extraction

```lisp
(defmacro sql (& parts)
  "Compile SQL template to parameterized query object.
   Interpolated values become positional parameters.
   
   (sql SELECT * FROM users WHERE id = ~id AND status = ~status)
   => { text: 'SELECT * FROM users WHERE id = $1 AND status = $2',
        values: [id, status] }"
  (let* ((text-parts (gensym "text"))
         (values-sym (gensym "values"))
         (parsed (parse-sql-template parts)))
    `(object
       "text" ~(sql-template->parameterized-string parsed)
       "values" (array ~@(sql-template->value-exprs parsed)))))

;; Helper: parse-sql-template returns structure like:
;; { fragments: ["SELECT * FROM users WHERE id = ", " AND status = "],
;;   exprs: [id, status] }

;; Usage:
(const query (sql SELECT * FROM users WHERE id = ~userId AND active = ~isActive))

;; Expands to:
(const query
  (object
    "text" "SELECT * FROM users WHERE id = $1 AND active = $2"
    "values" (array userId isActive)))
```

#### 2.2 SQL with Compile-Time Syntax Validation

```lisp
(defmacro sql! (& parts)
  "Like sql but validates SQL syntax at compile time.
   Emits compile error if SQL is malformed."
  (let* ((parsed (parse-sql-template parts))
         (sql-text (sql-template->raw-string parsed)))
    ;; Compile-time validation (runs during macro expansion)
    (when-not (valid-sql-syntax? sql-text)
      (compile-error! (str "Invalid SQL syntax: " sql-text)))
    ;; Generate same output as sql macro
    `(object
       "text" ~(sql-template->parameterized-string parsed)
       "values" (array ~@(sql-template->value-exprs parsed)))))
```

#### 2.3 Typed Query with Schema Introspection

```lisp
(defmacro defquery (name table-name & clauses)
  "Define a typed query function with compile-time schema awareness.
   
   (defquery get-active-users :users
     :select [id name email]
     :where {:active true})
   
   Generates a function that returns Source<{id, name, email}>"
  (let* ((columns (get-clause clauses :select))
         (conditions (get-clause clauses :where))
         (row-type (columns->type-object columns))
         (sql-text (build-select-sql table-name columns conditions)))
    `(block
       ;; Generate TypeScript type alias
       (type-alias ~(symbol-concat name "Row") ~row-type)
       
       ;; Generate query function
       (const ~name
         (fn (db: Pool): (Source ~(symbol-concat name "Row"))
           (fromQuery db ~sql-text))))))

;; Usage:
(defquery get-active-users :users
  :select [id name email created_at]
  :where {:active true})

;; Expands to:
(block
  (type-alias GetActiveUsersRow 
    (type-object 
      ("id" (type-unknown))
      ("name" (type-unknown))
      ("email" (type-unknown))
      ("created_at" (type-unknown))))
  
  (const get-active-users
    (fn (db: Pool): (Source GetActiveUsersRow)
      (fromQuery db "SELECT id, name, email, created_at FROM users WHERE active = true"))))
```

---

### 3. Resource Management Macros

#### 3.1 With-Source (Guaranteed Cleanup)

```lisp
(defmacro with-source (bindings & body)
  "Bind a source and ensure cleanup on completion or error.
   
   (with-source [rows (fromQuery db query)]
     (|> rows (map process) (collectArray)))
   
   Automatically closes/releases the source when done."
  (let* ((binding-name (first (first bindings)))
         (source-expr (second (first bindings)))
         (src-sym (gensym "source"))
         (result-sym (gensym "result")))
    `(let* ((~src-sym ~source-expr))
       (try
         (let* ((~binding-name ~src-sym)
                (~result-sym (block ~@body)))
           ~result-sym)
         (finally
           (when (prop ~src-sym "close")
             ((prop ~src-sym "close"))))))))

;; Usage:
(with-source [file (fromFile "data.csv")]
  (|>! file
       (splitLines)
       (map parseLine)
       (collectArray)))

;; Expands to:
(let* ((source__auto__1 (fromFile "data.csv")))
  (try
    (let* ((file source__auto__1)
           (result__auto__2 
             (await (pipe file
                          (splitLines)
                          (map parseLine)
                          (collectArray)))))
      result__auto__2)
    (finally
      (when (prop source__auto__1 "close")
        ((prop source__auto__1 "close"))))))
```

#### 3.2 Bracket (Acquire/Use/Release Pattern)

```lisp
(defmacro with-resource (bindings & body)
  "General resource bracket pattern.
   
   (with-resource [conn (acquire (db.connect))
                        (release (fn (c) (c.release)))]
     (conn.query ...))"
  (let* ((binding-pairs (partition 2 bindings))
         (expanded-bindings 
           (map (fn (pair)
                  (let* ((name (first pair))
                         (spec (second pair))
                         (acquire-expr (get-acquire spec))
                         (release-expr (get-release spec))
                         (resource-sym (gensym (str name))))
                    {:name name
                     :resource-sym resource-sym
                     :acquire acquire-expr
                     :release release-expr}))
                binding-pairs)))
    `(let* (~@(mapcat (fn (b) 
                        (list (get b :resource-sym) (get b :acquire)))
                      expanded-bindings))
       (try
         (let* (~@(mapcat (fn (b)
                            (list (get b :name) (get b :resource-sym)))
                          expanded-bindings))
           ~@body)
         (finally
           ~@(map (fn (b)
                    `(~(get b :release) ~(get b :resource-sym)))
                  (reverse expanded-bindings)))))))

;; Usage:
(with-resource [conn {:acquire (db.connect)
                      :release (fn (c) (c.release))}
                file {:acquire (fs.open "out.txt" "w")
                      :release (fn (f) (f.close))}]
  (const data (conn.query "SELECT * FROM users"))
  (file.write (JSON.stringify data)))
```

#### 3.3 Transaction Macro

```lisp
(defmacro with-transaction (bindings & body)
  "Execute body in a database transaction with automatic commit/rollback.
   
   (with-transaction [tx db]
     (tx.query ...)
     (tx.query ...))"
  (let* ((tx-name (first bindings))
         (pool-expr (second bindings))
         (client-sym (gensym "client")))
    `(let* ((~client-sym (await ((prop ~pool-expr "connect")))))
       (try
         (await ((prop ~client-sym "query") "BEGIN"))
         (let* ((~tx-name ~client-sym)
                (result (block ~@body)))
           (await ((prop ~client-sym "query") "COMMIT"))
           result)
         (catch e
           (await ((prop ~client-sym "query") "ROLLBACK"))
           (throw e))
         (finally
           ((prop ~client-sym "release")))))))

;; Usage:
(with-transaction [tx db]
  (const order (await (tx.query (sql INSERT INTO orders ...))))
  (await (tx.query (sql INSERT INTO order_items ...)))
  order)

;; Expands to proper try/catch/finally with BEGIN/COMMIT/ROLLBACK
```

---

### 4. Pipeline Fusion & Optimization Macros

#### 4.1 Fused Map

```lisp
(defmacro fuse-maps (& map-fns)
  "Combine multiple map functions into a single pass.
   
   (fuse-maps f g h) => (map (fn (x) (h (g (f x)))))"
  (let* ((x-sym (gensym "x"))
         (composed (reduce (fn (inner f) `(~f ~inner))
                          x-sym
                          map-fns)))
    `(map (fn (~x-sym) ~composed))))

;; Usage:
(|> source
    (fuse-maps parseJSON validate transform)
    (collectArray))

;; Expands to:
(pipe source
      (map (fn (x__auto__1) 
             (transform (validate (parseJSON x__auto__1)))))
      (collectArray))
```

#### 4.2 Optimizing Pipeline Macro

```lisp
(defmacro pipe-opt (source & stages)
  "Like pipe but with compile-time optimizations:
   - Fuses adjacent maps
   - Fuses adjacent filters
   - Warns about unbounded buffers"
  (let* ((optimized (optimize-pipeline stages)))
    ;; Compile-time warnings
    (when (pipeline-has-memory-risk? source optimized)
      (compile-warning! "Pipeline may accumulate unbounded data"))
    `(pipe ~source ~@optimized)))

;; Helper function (runs at compile time)
(defn optimize-pipeline (stages)
  "Fuse adjacent map/filter operations"
  (reduce
    (fn (acc stage)
      (let* ((prev (last acc))
             (prev-op (first prev))
             (curr-op (first stage)))
        (cond
          ;; Fuse adjacent maps: (map f) (map g) => (map (comp g f))
          (and (= prev-op 'map) (= curr-op 'map))
          (conj (butlast acc)
                `(map (fn (x) (~(second stage) (~(second prev) x)))))
          
          ;; Fuse adjacent filters: (filter p) (filter q) => (filter (and p q))
          (and (= prev-op 'filter) (= curr-op 'filter))
          (conj (butlast acc)
                `(filter (fn (x) (and (~(second prev) x) (~(second stage) x)))))
          
          ;; No fusion possible
          :else
          (conj acc stage))))
    []
    stages))
```

#### 4.3 Parallel Map with Static Concurrency

```lisp
(defmacro pmap (concurrency f)
  "Parallel map with compile-time concurrency setting.
   
   (pmap 10 fetchUser) creates a flatMap with concurrency: 10"
  `(flatMap ~f (object "concurrency" ~concurrency)))

;; More advanced: auto-tune based on operation type
(defmacro pmap-auto (f)
  "Parallel map with concurrency inferred from function characteristics"
  (let* ((concurrency (infer-concurrency f))]
    `(flatMap ~f (object "concurrency" ~concurrency))))

;; Inference rules (compile-time):
;; - fetch/http calls: 10
;; - database queries: 5  
;; - CPU-bound: number of cores
;; - unknown: 1 (sequential)
```

---

### 5. Error Handling Macros

#### 5.1 Pipeline with Structured Error Handling

```lisp
(defmacro pipe-safe (source & stages-and-handlers)
  "Pipeline with declarative error handling.
   
   (pipe-safe source
     (map parse)
     (filter valid?)
     :on-error (fn (e) (log e) fallback-source)
     :finally (fn () (cleanup)))"
  (let* ((stages (take-while (fn (x) (not (keyword? x))) stages-and-handlers))
         (handlers (drop-while (fn (x) (not (keyword? x))) stages-and-handlers))
         (error-handler (get-handler handlers :on-error))
         (finally-handler (get-handler handlers :finally))
         (pipeline (gensym "pipeline")))
    `(let* ((~pipeline (pipe ~source ~@stages)))
       ~(if error-handler
          `(let* ((~pipeline (catchError ~error-handler ~pipeline)))
             ~pipeline)
          pipeline)
       ~(when finally-handler
          `(finalize ~finally-handler)))))

;; Usage:
(|>! (fromFile "data.csv")
     (pipe-safe
       (splitLines)
       (map parseJSON)
       (filter (fn (x) (prop x "valid")))
       :on-error (fn (e item) 
                   (log.error "Failed to parse" item e)
                   empty)
       :finally (fn () (log.info "Pipeline complete")))
     (collectArray))
```

#### 5.2 Retry with Exponential Backoff

```lisp
(defmacro with-retry (opts & body)
  "Wrap expression with retry logic.
   
   (with-retry {:attempts 3 :backoff :exponential :base-delay 1000}
     (fetch url))"
  (let* ((attempts (or (get opts :attempts) 3))
         (backoff-type (or (get opts :backoff) :exponential))
         (base-delay (or (get opts :base-delay) 1000))
         (attempt-sym (gensym "attempt"))
         (delay-sym (gensym "delay"))
         (result-sym (gensym "result")))
    `(let* ((~attempt-sym 0))
       (loop
         (try
           (let* ((~result-sym (block ~@body)))
             (return ~result-sym))
           (catch e
             (set! ~attempt-sym (+ ~attempt-sym 1))
             (if (>= ~attempt-sym ~attempts)
                 (throw e)
                 (block
                   (let* ((~delay-sym ~(case backoff-type
                                         :exponential `(* ~base-delay (Math.pow 2 ~attempt-sym))
                                         :linear `(* ~base-delay ~attempt-sym)
                                         :constant base-delay)))
                     (await (delay ~delay-sym))
                     (recur))))))))))

;; Usage:
(const data
  (with-retry {:attempts 5 :backoff :exponential :base-delay 500}
    (await (fetch url))))
```

#### 5.3 Result Type Pattern

```lisp
(defmacro try-result (& body)
  "Execute body and wrap in Result type (Ok/Err).
   
   (try-result (JSON.parse str))
   => { ok: true, value: parsed } or { ok: false, error: e }"
  (let* ((result-sym (gensym "result"))]
    `(try
       (let* ((~result-sym (block ~@body)))
         (object "ok" true "value" ~result-sym))
       (catch e
         (object "ok" false "error" e)))))

(defmacro result-map (result f)
  "Map over Ok value, pass through Err.
   
   (result-map (try-result ...) transform)"
  (let* ((r-sym (gensym "r")))
    `(let* ((~r-sym ~result))
       (if (prop ~r-sym "ok")
           (object "ok" true "value" (~f (prop ~r-sym "value")))
           ~r-sym))))

(defmacro result-flatmap (result f)
  "FlatMap over Ok value (f must return Result)."
  (let* ((r-sym (gensym "r")))
    `(let* ((~r-sym ~result))
       (if (prop ~r-sym "ok")
           (~f (prop ~r-sym "value"))
           ~r-sym))))

(defmacro result-unwrap (result default)
  "Unwrap Ok value or return default for Err."
  (let* ((r-sym (gensym "r")))
    `(let* ((~r-sym ~result))
       (if (prop ~r-sym "ok")
           (prop ~r-sym "value")
           ~default))))

;; Usage in pipeline:
(|>! (fromArray items)
     (map (fn (item) (try-result (parseItem item))))
     (filter (fn (r) (prop r "ok")))
     (map (fn (r) (prop r "value")))
     (collectArray))
```

---

### 6. Stream Combinator Macros

#### 6.1 Merge Multiple Sources

```lisp
(defmacro merge-sources (& sources)
  "Merge multiple sources into one, interleaving values.
   
   (merge-sources s1 s2 s3) produces values from all three"
  (let* ((merged-sym (gensym "merged")))
    `(let* ((~merged-sym (createMergedSource)))
       ~@(map (fn (src) `(addSource ~merged-sym ~src)) sources)
       (startMerge ~merged-sym))))

;; For ordered concatenation instead:
(defmacro concat-sources (& sources)
  "Concatenate sources sequentially (exhaust first, then second, etc)"
  `(flatMap identity (fromArray (array ~@sources))))
```

#### 6.2 Zip Sources Together

```lisp
(defmacro zip-sources (& sources)
  "Zip multiple sources into tuples.
   
   (zip-sources s1 s2) => Source<[T1, T2]>"
  (let* ((iters (map (fn (s) (gensym "iter")) sources))
         (values (map (fn (s) (gensym "val")) sources)))
    `(async-generator
       (let* (~@(mapcat (fn (iter src) 
                          (list iter `(async-iterator ~src)))
                        iters sources))
         (loop
           (let* (~@(mapcat (fn (val iter)
                              (list val `(await ((prop ~iter "next")))))
                            values iters))
             (if (or ~@(map (fn (v) `(prop ~v "done")) values))
                 (return)
                 (yield (array ~@(map (fn (v) `(prop ~v "value")) values))))))))))
```

#### 6.3 Tee (Split Stream)

```lisp
(defmacro tee (source & branches)
  "Send each item to multiple processing branches.
   
   (tee source
     (|> (map processA) sinkA)
     (|> (map processB) sinkB))
   
   Each item goes to both branches."
  (let* ((item-sym (gensym "item"))
         (broadcast-calls (map (fn (branch) `(~branch ~item-sym)) branches)))
    `(forEach 
       (fn (~item-sym)
         ~@broadcast-calls)
       ~source)))
```

---

### 7. Debugging & Instrumentation Macros

#### 7.1 Trace Pipeline

```lisp
(defmacro trace-pipe (label source & stages)
  "Like pipe but logs each stage's output.
   
   (trace-pipe \"user-import\" source
     (map parse)
     (filter valid?)
     (collectArray))"
  (let* ((traced-stages 
           (mapcat (fn (stage i)
                     (let* ((stage-label (str label ":" i ":" (first stage)))]
                       (list stage `(tap (fn (x) (console.log ~stage-label x))))))
                   stages
                   (range (count stages))))]
    `(pipe ~source ~@traced-stages)))

;; Usage during debugging:
(trace-pipe "csv-import"
  (fromFile "data.csv")
  (splitLines)
  (map parseCSVLine)
  (collectArray))

;; Logs:
;; csv-import:0:splitLines "header,row"
;; csv-import:0:splitLines "data,values"
;; csv-import:1:map { header: "row", data: "values" }
;; ...
```

#### 7.2 Pipeline Metrics

```lisp
(defmacro metered-pipe (name source & stages)
  "Pipeline with automatic metrics collection.
   
   Emits:
   - {name}.items.total (counter)
   - {name}.items.rate (gauge) 
   - {name}.duration.ms (histogram)
   - {name}.errors (counter)"
  (let* ((start-sym (gensym "start"))
         (count-sym (gensym "count")))
    `(let* ((~start-sym (Date.now))
            (~count-sym 0))
       (pipe ~source
         (tap (fn (_) 
                (set! ~count-sym (+ ~count-sym 1))
                (metrics.increment ~(str name ".items.total"))))
         ~@stages
         (finalize (fn ()
                     (metrics.gauge ~(str name ".items.rate")
                                    (/ ~count-sym (- (Date.now) ~start-sym)))
                     (metrics.histogram ~(str name ".duration.ms")
                                        (- (Date.now) ~start-sym))))))))
```

#### 7.3 Assert Pipeline Invariants

```lisp
(defmacro assert-stream (source & assertions)
  "Add runtime assertions to a stream for debugging.
   
   (assert-stream source
     :non-empty true
     :all-match (fn (x) (> x 0))
     :max-items 1000)"
  (let* ((count-sym (gensym "count"))
         (seen-any-sym (gensym "seenAny"))
         (max-items (get assertions :max-items))
         (all-match (get assertions :all-match))
         (non-empty (get assertions :non-empty))]
    `(let* ((~count-sym 0)
            (~seen-any-sym false))
       (pipe ~source
         (tap (fn (item)
                (set! ~seen-any-sym true)
                (set! ~count-sym (+ ~count-sym 1))
                ~(when max-items
                   `(when (> ~count-sym ~max-items)
                      (throw (Error (str "Stream exceeded max items: " ~max-items)))))
                ~(when all-match
                   `(when (not (~all-match item))
                      (throw (Error (str "Item failed assertion: " item)))))))
         (finalize (fn ()
                     ~(when non-empty
                        `(when (not ~seen-any-sym)
                           (throw (Error "Stream was empty but :non-empty asserted"))))))))))
```

---

### 8. Domain-Specific Pipeline Macros

#### 8.1 HTTP Handler Pipeline

```lisp
(defmacro defhandler (name method path & pipeline)
  "Define an HTTP handler as a pipeline.
   
   (defhandler get-users :GET \"/api/users\"
     (authenticate)
     (authorize \"users:read\")
     (query-users)
     (paginate)
     (json-response))"
  `(export (const ~name
     (object
       "method" ~(symbol->string method)
       "path" ~path
       "handler" (fn (req: Request): (Promise Response)
                   (|>! (fromRequest req)
                        ~@pipeline))))))

;; Usage:
(defhandler export-users :GET "/api/users/export"
  (authenticate)
  (authorize "users:export")
  (|> (fromQuery db "SELECT * FROM users")
      (map userToCSVRow)
      (prepend csv-header)
      (toResponse {:contentType "text/csv"
                   :headers {"Content-Disposition" "attachment; filename=users.csv"}})))
```

#### 8.2 ETL Pipeline Definition

```lisp
(defmacro defpipeline (name opts & stages)
  "Define a reusable ETL pipeline with standard error handling.
   
   (defpipeline import-orders
     {:source (fromFile \"orders.csv\")
      :sink (toTable db \"orders\")
      :error-table \"import_errors\"
      :batch-size 100}
     (splitLines)
     (drop 1)
     (map parseOrder)
     (validate orderSchema))"
  (let* ((source-expr (get opts :source))
         (sink-expr (get opts :sink))
         (error-table (get opts :error-table))
         (batch-size (or (get opts :batch-size) 100))]
    `(export (const ~name
       (fn ()
         (|>!
           ~source-expr
           ~@stages
           (catchError (fn (e item)
                         (await (logError ~error-table e item))
                         empty))
           (chunk ~batch-size)
           ~sink-expr))))))

;; Usage:
(defpipeline daily-import
  {:source (fromS3 bucket "imports/daily.csv")
   :sink (toTable db "transactions")
   :error-table "import_errors"
   :batch-size 500}
  (decodeUTF8)
  (splitLines)
  (drop 1)
  (map parseTransaction)
  (validate transactionSchema)
  (map enrichWithMetadata))

;; Later:
(await (daily-import))
```

#### 8.3 Event Sourcing Pipeline

```lisp
(defmacro event-handler (event-type & clauses)
  "Define an event handler with automatic event/command pattern.
   
   (event-handler :order-placed
     :validate validateOrderEvent
     :project (fn (state event) (assoc state :orders ...))
     :emit [:order-confirmed :inventory-reserved])"
  (let* ((validate-fn (get clauses :validate))
         (project-fn (get clauses :project))
         (emit-events (get clauses :emit))]
    `(registerHandler ~(keyword->string event-type)
       (fn (state event)
         ~(when validate-fn
            `(~validate-fn event))
         (let* ((new-state (~project-fn state event)))
           (object
             "state" new-state
             "events" (array ~@(map (fn (e) `(createEvent ~(keyword->string e) event))
                                    emit-events))))))))
```

---

### 9. Compile-Time Validation Macros

#### 9.1 Schema-Validated Pipeline

```lisp
(defmacro typed-pipe (source source-type & stages)
  "Pipeline with compile-time type flow checking.
   
   Validates that each stage's input type matches previous output type."
  (let* ((type-errors (validate-pipeline-types source-type stages))]
    (when (seq type-errors)
      (compile-error! (str "Pipeline type errors:\n" (join "\n" type-errors))))
    `(pipe ~source ~@stages)))

;; Usage:
(typed-pipe (fromFile "data.json") :bytes
  (decodeUTF8)      ;; bytes -> string
  (map JSON.parse)  ;; string -> unknown (would be typed with schema)
  (collectArray))   ;; unknown -> unknown[]

;; Compile error if types don't align:
;; "Pipeline type errors:
;;  Stage 2 (map JSON.parse): expected string, got number"
```

#### 9.2 Exhaustive Pattern Matching in Pipelines

```lisp
(defmacro match-stream (source & cases)
  "Route stream items by pattern, ensuring exhaustiveness.
   
   (match-stream events
     {:type \"click\"} (handleClick)
     {:type \"scroll\"} (handleScroll)
     :else (logUnknown))"
  (let* ((patterns (partition 2 cases))
         (has-else (some (fn (p) (= (first p) :else)) patterns))]
    (when-not has-else
      (compile-warning! "match-stream may not be exhaustive - consider adding :else"))
    `(flatMap
       (fn (item)
         (cond
           ~@(mapcat
               (fn (pattern)
                 (if (= (first pattern) :else)
                     `(:else (~(second pattern) item))
                     `((matches? item ~(first pattern)) (~(second pattern) item))))
               patterns)))
       ~source)))
```

---

## Summary: Macro Design Principles

1. **Use `gensym` religiously** — Every intermediate binding should use `gensym` to avoid capture

2. **Compile-time validation** — Leverage macro expansion time to catch errors early

3. **Preserve source locations** — Use `~expr` for user code so errors point to original source

4. **Compose, don't complect** — Each macro should do one thing; combine them for complex behavior

5. **Transparent expansion** — Users should be able to `macroexpand` and understand the output

6. **Escape hatches** — Always allow dropping down to raw `pipe` when macros are too magical
