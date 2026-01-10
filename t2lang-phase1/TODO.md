# Phase1 Prioritized TODO

* done: move cliHelper out of t2lang-phase0/ into a new common/ workspace directory, and update phase0 and phase1 to use it from there.
* done: defmacro expansion is not working correctly at least from the CLI.
* done: make sure phase1 has build dependency on phase0 so that phase1 is never using stale phase0 code. (Added `t2lang-phase0` dependency and `prebuild` script to run phase0 build before phase1.)
* done: tests and examples for how CompilerConfig.dumpAst works. (Added integration tests in Phase0/Phase1 and `common/README.md` example.)
* done: add CLI support for all of CompilerConfig so the values can be set from the command line, for example the "dumpAst" flag. (Added flags: `--emit-types`, `--enable-tsc`, `--seed`, `--trace`, `--log-level` and corresponding tests.)
* done: each major stage of the compiler pipeline must support a T2_DEBUG_"modulename" flag like T2_DEBUG_EXPAND for the result from MacroExpander.
   ```
      // DEBUG: Print expanded AST to console for investigation
      if (process.env.T2_DEBUG_EXPAND === "1") {
        // eslint-disable-next-line no-console
        console.error("[DEBUG] Expanded AST:", JSON.stringify(phase0Ast, null, 2));
      }
   ```
* deduplicate phase1 src from phase0 so that phase1 is effectively a wrapper / client / subclass of phase0. If we make changes in phase0 we do not want to always have to update phase1. (We definitely do not want to have to copy all files from phase0/src over to phase1/src any time phase0 changes.)
