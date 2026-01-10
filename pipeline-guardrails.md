* All sugar must desugar before macro expansion, and must desugar into the same canonical AST form that macros expect.
* All syntax sugar is recognized and lowered by a single unified parser.
    * Sugar never expands into more sugar.
    * Sugar is fully eliminated before macro expansion.
    * Macros operate only on canonical AST.
* Sugar is implemented as grammar fragments that compose cleanly.
* A healthy S-expression language with sugar follows this order:
    1. Reader / Parser
        * Handles all syntax sugar
        * Handles precedence
        * Handles infix, pipelines, object sugar, etc.
        * Produces a clean, canonical AST
    2. Macro Expander
        * Operates only on canonical AST
        * Never sees sugar
        * Never deals with precedence
        * Never depends on surrounding syntactic context
    3. Compiler / Codegen
        * Pipeline.
        * Emits JS/TS/bytecode/etc.
* Sugar breaks things only if you violate the invariant:
    * bad: If macros run before sugar is fully desugared
    * bad: If sugar expands into more sugar  
    * bad: If sugar depends on macro expansion to resolve meaning
    * bad: If sugar produces ambiguous AST that depends on context