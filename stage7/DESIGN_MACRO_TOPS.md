## Build constraint
All logic changes go in `.s6` source files. The `.ts` files are compiled outputs — never edit them directly. After changes, run `npm run build-compiler` in `stage7/` before running tests. `Stage7-tags.ts` is the exception — it is hand-authored `.ts` and may be edited directly.

- [x] Represent expansions: introduce a runtime check (not a TS type) that can distinguish a single expression node from a list of top-level nodes, updating `Stage7-tags.ts` so the rest of the pipeline can validate top-level node kinds.
	- detection is a runtime `Array.isArray` check on macro result, not a static TS type union
	- update macro-env return type and any helper that wraps macro results
	- ensure tags cover top-level node kinds for validation (let/const/type/interface/class/statement)
- [x] Context-aware expansion: introduce `expandTopLevelMacroCall` in `Stage7-macro-expand.s6` as a separate entry point for the program-level walker; do not modify `expandMacroCall` (used from `expandExpr`).
	- detection in the program-level walker: node is `expr-stmt` whose inner expr is a macro call (callee is identifier in `env.macros`) — bare macro calls parse as `expr-stmt`, not raw `call` nodes
	- `expandTopLevelMacroCall`: after `evalMacroBody`, if result is array → validate each element is an allowed top-level kind, return the array; if result is single node → fall through to existing `expandExpr` path
	- replace `expandAll`'s `.map(expandTopLevel)` with a worklist loop:
		```
		worklist = [...program.body]
		output = []
		while worklist not empty:
		  node = worklist.shift()
		  if node is expr-stmt wrapping a macro call:
		    result = expandTopLevelMacroCall(node, env)
		    if result is TopLevel[]:
		      for each spliced of result:
		        registerTopLevelNode(spliced, env)   // preserve streaming invariant and ensure ids exist
		        worklist.unshift(spliced)             // re-visit for recursive expansion
		    else:
		      output.push(result)
		  else:
		    output.push(expandTopLevel(node, env))
		program.body = output
		```
	- `registerTopLevelNode` (from `Stage7-macro-env.s6`) must be called on each spliced node before re-visiting, so any emitted `defmacro` is visible to subsequent forms — preserving the streaming "macros before use" invariant
	- if a macro in a non-top-level position returns an array, throw a macro expansion error: `"top-level macro expansion not allowed in this position"`
	- maintain traversal order: spliced nodes appear at the call site's position in `program.body`, in the order the macro returned them
- [x] Allowed top-level outputs: permit macro-emitted top-level nodes only for let, const, type alias, interface, class, and statement forms; reject import/export forms.
	- add validator on returned array: every `node.tag` in allowedSet else `MacroError("macro top-level expansion produced disallowed form")`
	- explicitly exclude imports/exports even if they appear via statement rule; module boundaries remain out of scope
	- when statement is used, restrict to non-import/export statements (control flow, block, return, throw, expression)
	- spliced `expr-stmt` nodes that wrap another macro call will be re-visited by the worklist and expanded normally — no special handling needed
- [x] Ordering and diagnostics: no span/id rebasing needed.
	- nodes produced by `evalMacroBody` via quasiquote already have unique ids assigned at build time; there are no id collisions to fix
	- spliced nodes appear at the call site's position in `program.body`, in the order the macro returned them — guaranteed by the worklist approach
	- error diagnostics use `env.currentCallSite` / `env.currentCallNodeId` to attribute errors to the originating macro call; no rebasing required
	- ensure macro-produced nodes carry ids; if a macro constructs nodes without ids, assign them before splicing
- [x] Pipeline propagation: the only required change is in `expandAll` in `Stage7-macro-expand.s6` — replace `.map(expandTopLevel)` with the worklist loop, returning a program node whose `body` is the fully-spliced flat array.
	- downstream phases (lower, scope-resolve, codegen) require no changes; they already iterate `program.body` uniformly and do not care how many nodes are in it or how they got there
	- after implementing, run the full test suite to verify no downstream assumption was broken; if a phase breaks, document the specific invariant violated and fix it then — do not pre-emptively patch phases that have not been shown to need it
- [x] Tests: add vitest coverage in `tests/macroIntegration.test.ts` (or a new dedicated file) for macros that emit `(let ...)`, `(const ...)`, multiple top-level forms, duplicate macro invocations (order/ids preserved), and gensym isolation across splices; also add negative tests for misuse.
	- success case: macro returns `[let, const, class]` → runtime assertions pass
	- recursive expansion: macro returns a call to another top-level macro → fully expanded
	- emitted `defmacro`: macro emits a `defmacro` → it is registered and usable by subsequent forms
	- duplicate macro calls: ensure ordering preserved and no id collisions
	- gensym: two top-level bindings from one macro do not collide; multiple macro calls also isolated
	- mixed splice positioning: macro returns an array of top-level nodes followed by trailing expressions to ensure splice position is exact
	- negative: macro used in expression position returns array → expect `MacroError`; assert console quiet
	- negative: macro emits a disallowed form (import/export) → expect `MacroError`
- [x] Docs: add a new section "Top-level macro expansions" to `docs/README_MACROS.md` covering allowed/forbidden forms, the worklist expansion model, streaming registration of emitted `defmacro`, and the macro error surface.
	- include examples of valid/invalid usage and expected error text
	- note that `Array.isArray` is the runtime discriminator, not a TS type

## Quasi
