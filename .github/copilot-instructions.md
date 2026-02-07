* read staging-guardrails.md.
* read all .md files in Phase A and Phase B to get context on the goals and design.
* currently we are working on Phase A, Phase B, and Common only. We are not making any changes to OLD/**.
* OLD/ Phase 0 and Phase 1 are for reference only.
* when writing TypeScript code, keep it simple.
* note that "npm test" already runs "npm build" first, so you do not have to run "npm build" separately.
* if you make edits to files in phaseA, then "cd phaseA; npm run lint; npm test" and fix any errors.
* if you make edits to files in phaseB, then "cd phaseB; npm run lint; npm test" and fix any errors.
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
* phaseA cannot depend on anything from phase 0 or phase 1 or common. PhaseA cannot depend on anything in t2lang/OLD. if there are features which need to be carried over, they must be re-implemented in phaseA without any kind of dependency on phase0 or phase1.
* phaseB cannot depend on anything from phase 0 or phase 1 or common. PhaseB cannot depend on anything in t2lang/OLD. if there are features which need to be carried over, they must be re-implemented in phaseB without any kind of dependency on phase0 or phase1.
* functions internal to the compiler pipeline should always be written as "async" even if they don't do anything asynchronous yet. This is to make it easier to add async features later without breaking the API.
* typescript output from the compiler should not create "async" unless the .t2 source input used "async".
* phaseB can only rely on APIs from phaseA, it cannot rely on any file contents directly.
* any file named **/*.test.ts must be run as part of the parent "npm test" command. check for any such files that are not being invoked, see run-tests.mjs. This is to ensure test coverage.
