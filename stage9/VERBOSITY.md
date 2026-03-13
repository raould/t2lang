# Verbosity

Goal: support debug output at all major stages of the compiler pipeline.
    - 1) support single line status logs e.g. entering, leaving, with optional details e.g. node.tag.
    - 2) support emitting the stage's coalesced output e.g. emit the full AST as JSON.

1) Add a compiler flag for verbose logging. Since bin/t2*.js already have "--verbose" flag, use the term "debug" instead. Thus the wrapper command line scripts would gain a "--debug" flag as well.
2) The compiler creates a debugging context object with API for appeding debug log strings.
3) The compiler supplies the debugging context to each stage, by passing it as an explicit argument.
4) Each major stage of the compiler pipeline (ANTLR parse → AST build → macro expand → scope resolve → lower → codegen) is updated to use the debugging context. Any sugar rules must also support this debug logging.
5) Each stage should emit processing progress log messages into the debug context.
6) Specification of output destination:
- A top-level try/catch/finally is used to ensure debug output is always emitted when requested.
- At the end of compilation, either via success or failure, the debug context's contents are emitted to stderr as a JSON array of log entries.
- Each entry has the shape: `{ "event": "enter"|"leave"|"msg"|"details", "stage": string, ...payload }`
- Entries are in chronological order, preserving interleave across stages.
- The JSON serialiser uses a seen-set to detect cycles; circular references are replaced with the sentinel string `"[circular]"`.
- The output is valid JSON and can be filtered with jq, e.g. `jq 'map(select(.stage == "macros"))'`.
7) "Context object" API
- log_enter(stage_name:string, details?:Record<string,unknown>);
- log_leave(stage_name:string, details?:Record<string,unknown>);
- log_msg(stage_name:string, message:string);
- log_details(stage_name:string, details:Record<string,unknown>);
8) granularity control
- `--debug`: all logs are recorded and emitted.
- `--debug-<stage>`: enables recording & emitting for one stage. May be listed more than once.
  Canonical stage names: `parse`, `ast`, `macros`, `resolve`, `lower`, `codegen`.
  Example: `--debug-macros --debug-lower`

4. Sugar forms that must support debug logging in the `ast` stage:

Expression sugar:
- `infixExpr` (`#{...}`) → `binary-op` / `unary-op`; non-trivial: left-associative folding, uniformity check
- `condExpr` (`(cond ...)`) → `cond` node (desugared to ternary chain in `lower`)
- dotted identifier (e.g. `arr.length`) → `prop-access` chain via `desugarDottedIdentifier`
- `macroExprCall` (`=>`) → `macro-expr-call`
- `macroBodyCall` (`=&`) → `macro-body-call`

Statement sugar:
- `letStar` / `constStar` → `let*` / `const*` (multi-binding; desugared to block in `lower`)
- `forForm` / `forInForm` / `forOfForm` / `forAwaitForm` → `for` / `for-in` / `for-of` / `for-await`
- `switchForm` → `switch`
- `tryForm` → `try`

Import/export sugar (all desugar to a unified node in `lower`):
- `importForm` (four syntactic variants) → `import-stmt`
- `exportDeclForm`, `exportNamed`, `exportFrom`, `exportDefault`, `exportAllFrom`,
  `exportNsFrom`, `exportType`, `exportTypeFrom`, `exportTypeAllFrom` → respective export nodes

6. Usage convention for the context object API:

| Call | When to use |
|------|-------------|
| `log_enter(stage, details?)` | Once per stage, at entry. `details` = static config (e.g. file path, flag state). |
| `log_leave(stage, details?)` | Once per stage, at exit. `details` = summary stats (e.g. error count, node count). |
| `log_msg(stage, message)` | Inside a stage, for per-node or per-form progress lines. |
| `log_details(stage, details)` | Inside a stage, to dump a large object (e.g. full expanded AST). May be called multiple times (e.g. after each expansion pass). Only recorded when that stage is enabled. |

`log_enter`/`log_leave` bracket the stage; `log_msg`/`log_details` are the interior.
`log_details` differs from `log_leave`'s optional details in that it may be called mid-stage.
