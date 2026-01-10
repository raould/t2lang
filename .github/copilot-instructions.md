* read agent-guardrails.md.
* currently we are working on stage0 only. We are not making any changes to `OLD/**`. We are not making any chnange to `OLDER/**`.
* when writing TypeScript code, keep it simple.
* note that "npm test" already runs "npm build" first, so you do not have to run "npm build" separately.
* if you make edits to files in stage0, then "cd stage0; npm run lint; npm test" and fix any errors.
* t2lang's type checking is meant to be only for validating the basic structure of the source .t2 sexpr syntax. The type checker is not meant to implement TypeScript's type checking. Instead, t2lang can optionally run TypeScript immediately on the output from t2lang compiler in order to get full type checking of the original input program. (see the CompilerConfig.enableTsc flag.)
* when creating or updating tests, make sure this line of code exists after the invocation of the compiler and before the test assertions. The idea is to output any errors the t2lang compiler raised.
```
  if (result.errors.length > 0) { console.error(result.errors); }
```
* The macro system should try to be like Clojure's design, not like Racket's.
* do not offer to create PRs.
* stage0 cannot depend on anything from `OLD/**` or `OLDER/**`.
* functions internal to the compiler pipeline should always be written as "async" even if they don't do anything asynchronous yet. This is to make it easier to add async features later without breaking the API.
* typescript output from the compiler should not create "async" unless the .t2 source input used "async".
* any file named `**/*.test.ts` must be run as part of the parent "npm test" command. check for any such files that are not being invoked, see run-tests.mjs. This is to ensure test coverage.
