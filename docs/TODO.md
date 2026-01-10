## soon

* check all other TODO files.
* compare all this with actual typescript docs
    * e.g. https://www.typescriptlang.org/docs/handbook/2/classes.html
* fix use of relative paths in the compiler implementation.
* all the fn signature variations ad nauseam (Phase B)
    * including ":"
* are snapshots really happening per-stage?
* should we support enableTsc in Phase A or Phase B?
    * too many things that are done differently from phase0/1 to phaseA/B.
* revisit `(return value)`, the whole implicit return and type heuristic again.
* more .t2 examples generated from existing .ts examples, and assert equivalence.
    * e.g. static blocks.
* tests are pulling in { compile } from too many rando places.
* macros are not expanding correctly.
    * hard to get any output at all.
    * hard to use them, the syntax is wonky.
    * fix reader / macro / sugar / parser ordering.
    1. Reader
        tokenize
        handle literal sugar
        handle quoting sugar
        produce raw S-expressions
    2. Parser (structural sugar, but NOT call sugar)
        infix → prefix
        dot sugar → prefix
        array/object sugar → canonical AST
        pipeline sugar → canonical AST
        if/for/while sugar → canonical AST
        But do not rewrite (f x y) into (call f x y) yet.
    3. Macro Expander
        sees raw list forms
        expands macros
        expands special forms
        produces canonical AST
    4. Post-expansion lowering
* really really really delete the old rewrite-based sugar.

## some day ideally

* properly hygenic gensym.
* collate the good things from phase0/1 and phaseA/B and try again.
    * know that it will get squirrely quickly and do random incorrect things you didn't notice.
    * should use a bootstrapping process with small deltas.
    * i really wish it supported visual programming so i could more easily observe the pipeline.
        * find a program-vizualization tool for typescript and use it iteratively to make sure things are not going off track.
    * a main problem is that when you add sugar, things explode combinatorially, so it is hard to have enough tests, and hard to know what combinations of syntax sugar really are successfully supported.
        * i really do not know if the phaseB macros & sugar are individually correctly lowering such that they can all be used together.
        * All sugar must desugar before macro expansion, and must desugar into the same canonical AST form that macros expect.
        * All syntax sugar is recognized and lowered by a single unified parser.
            * Sugar never expands into more sugar.
            * Sugar is fully eliminated before macro expansion.
            * Macros operate only on canonical AST.
        * Sugar is implemented as grammar fragments that compose cleanly.
        * Sugar is parsed with PEG / parser combinators.
             * Infix is not supported at first.
             * Add Pratt parser for infix sugar later.
             * Read phaseB/TODO_PEG.md
        * A healthy S-expression language with sugar follows this order:
            * Reader / Parser
                * Handles all syntax sugar
                * Handles precedence
                * Handles infix, pipelines, object sugar, etc.
                * Produces a clean, canonical AST
            * Macro Expander
                * Operates only on canonical AST
                * Never sees sugar
                * Never deals with precedence
                * Never depends on surrounding syntactic context
            * Compiler / Codegen
                * Emits JS/TS/bytecode/etc.
        * Sugar breaks things only if you violate the invariant:
            * If macros run before sugar is fully desugared
            * If sugar expands into more sugar  
            * If sugar depends on macro expansion to resolve meaning
            * If sugar produces ambiguous AST that depends on context
    * bootstrap it from this compiler.
    * prevent context pollution by starting in a new repo.
    * stick to staging-guardrails.md.
    * specs at each level.
    * grammars at each level.
        * e.g. (method "name" ...) mistake.
    * never generate code before updating spec & grammar.
    * never generate code w/out a bunch of acceptance tests first.
    * acceptance tests should be as end-to-end as possible.
        * support for testing e2e with t2 -> tsc / -> node.
    * do not allow tests to become skipped and forgotten.
    * much more e2e validation through tsc and node.
        * e.g. `(program ...)` is pretty broken.
            * have to pick a module standard.
            * don't wrap everything in async iife?!
        * multi-source-file support.
    * support all the useful sugars.
    * figure out how and when best to reuse code moving up the phase stack.
    * use & update the error registry when generating (throwing) errors.
        * use regular javascript string templating, not the custom format.
    * there's a lot to keep straight:
        specs, grammar, updating error registry, tests, ...
    * have to really figure out workspaces, packaging, dependencies.
        * e.g. common/src/errorRegistry used by both phase A and B: exactly how?
        * e.g. the hell of "npx t2tc" never working right from inside the project.
    * beware the need for t2lang-runtime, it is to sigh.
    * maybe try to split out t2lang-sdk-ergonomics for real.
* state has to be passed through so errors really can show line #s.
* have to keep responsibility clear and coherent.
    * don't put something in phase B if phase A grammar supports it.
    * don't put something in phase A if it is more than phase A's spec.
    * or fix the spec and loop back on things to resolve.
* i am worried about how the sugar works e.g. "and" alias for "&&" should be simpler.
* everything should be class based.
    * every class should have a version (can't just be git sha).
    * any change to the class at all bumps the version.
    * compiler flag to include class name & version in the trace output.
    * hoping to make it clear if some code is somehow running wrong code (e.g. dist/ is out of date).
* bootstrap the language so that we can use its features for the compiler.
    * the error registry string interpolation via macro using js string template interpolation.
* could t2tc accept fragments without `(program ...)`?
* somebody do a clean-room, non gen-AI version of t2lang.
* can we use Symbol for gensym?
* clean up tests, abstract out more helpers to DRY.
* infix is a real pain. precedence has to be full and complete and correct e.g. dotted access.
