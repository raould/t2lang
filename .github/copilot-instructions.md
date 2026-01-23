* read all .md files in Phase A to get context on the goals and design.
* currently we are working on Phase A only.
* Phase 0 and Phase 1 are for reference only.
* when writing TypeScript code, keep it simple.
* note that "npm test" already runs "npm build" first, so you do not have to run "npm build" separately.
* if you make edits to files in phaseA, then "cd phaseA; npm run lint; npm test" and fix any errors.
* if you make edits to files in phase0, then "cd OLD/phase0; npm run lint; npm test" and fix any errors.
* if you make edits to files in phase1, then "cd OLD/phase1; npm run lint; npm test" and fix any errors.
* if you make edits to files in common, then "cd OLD/common; npm run lint; npm test" and fix any errors.
* t2lang's type checking is meant to be only for validating the basic structure of the source .t2 sexpr syntax. The type checker is not meant to implement TypeScript's type checking. Instead, t2lang can optionally run TypeScript immediately on the output from t2lang compiler in order to get full type checking of the original input program. (see the CompilerConfig.enableTsc flag.)
* when creating or updating tests, make sure this line of code exists after the invocation of the compiler and before the test assertions. The idea is to output any errors the t2lang compiler raised.
```
  if (result.errors.length > 0) { console.error(result.errors); }
```
* The macro system should try to be like Clojure's design, not like Racket's.
* do not offer to create PRs.
* phase0 is meant to be a low-level sexpr syntax with as little sugar as possible. It doesn't support macros for example. It is meant to be more like a "core calculus" for ease of machine processing; to keep code simple and consistent.
* phase1 is meant to add macros.
* phase1 might also be where more human-friendly syntax and sugar is added, making use of macros.
* When making changes, try to not change phase0 if it can be avoided.
* Do try to add more small integration tests in the relevant phase0 or phase1 when making changes or adding new features.
* When making changes, also make sure all phase1/examples build and run correctly.
* read the "help" text in the CLI (common/src/cliHelper.ts, phase1/src/cli.ts, phase0/src/cli.ts) to understand the intended usage of the compiler.
* phaseA cannot depend on anything from phase 0 or phase 1 or common. PhaseA cannot depend on anything in t2lang/OLD. if there are features which need to be carried over, they must be re-implemented in phaseA without any kind of dependency on phase0 or phase1. 
* functions in the compiler pipeline should always be written as "async" even if they don't do anything asynchronous yet. This is to make it easier to add async features later without breaking the API.
