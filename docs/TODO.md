1* check all other TODO files.
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
* fix logLevel use re: "none".
* update GRAMMER.md (and GRAMMAR_TABLE.md perhaps).
* phase B compile() is wtf vs. phase A compile().
    * no errors, etc.
* infix.
* properly hygenic gensym.
* collate the good things from phase0/1 and phaseA/B and try again.
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
