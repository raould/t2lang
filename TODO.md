- [ ] fix topLevelConst.
- [x] require infix spacing. (DONE: spacing now optional for all operators; #{gWidth/2}, #{w-2} etc. all parse correctly)
- [ ] define/document infix syntax, e.g. #{(Math.random) * 0xff}
- [ ] support hex, octal, etc. numeric constant syntax.
- [ ] shorthand syntax for "this."?
- [ ] stageN/src/** duh.
- [ ] keep updating the style guide.
- [ ] omfg version numbers.
- [ ] error reporting unification, and the error glossary.
- [ ] (too) many things are hard-coded to use the highest stageN.
- [ ] 'clean' script; use minishake; esbuild.
- [ ] support a jsdoc syntax.
- [ ] `(fn (x: number, y: string) ...)` sugar with required commas. (nightmare!) (done?)
- [ ] double-check that keyword collision detection is working for value and macro levels.
- [ ] put the compiler state into a queryable database.

# The compiler-as-database idea
Instead of a linear pipeline where each pass transforms a data structure, the compiler accumulates facts into a store and queries them on demand:

- parse    → assert: class(A), extends(A, MixinBase), field(A, msg, [declare]), method(A, sayIt)
- expand   → assert: macro_expanded(A), resolved_name(msg, field_of_A)
- typecheck → query: field(C, F, Mods), extends(C, MixinBase), not member(declare, Mods) → error
The mixin check becomes a single declarative rule, not a buried conditional in lowerClassDef. New checks don't require touching existing pass code — you just add a new query/rule.

## The compilers that actually do this
Rust's query system is the closest mainstream example. rustc reorganized around a demand-driven query graph where every piece of compiler knowledge (type_of(item), is_sized(ty), mir_of(fn)) is a cached query. Passes don't transform a global structure — they register queries that pull from other queries. Incremental compilation falls out for free because the dependency graph is explicit.

Datalog compilers (Doop, Soufflé) go further and use actual logic programming. Doop computes Java points-to analysis entirely in Datalog. The "compiler" is just a set of Horn clauses — facts derived from other facts. Soufflé is fast enough that several production program analysis tools are built on it.

Flix is interesting because it's a language where Datalog is a first-class sublanguage — you can mix functional code and Datalog relations in the same program, which makes it natural for writing compilers in.

miniKanren / relational interpreters take this to the logical extreme — a relational interpreter can run backwards, generating programs that satisfy a spec. Not practical for production compilers but illuminating about what "compiler as database" really means.

## The tradeoff
The pipeline model wins on local reasoning — you can read lowerClassDef and understand exactly what it does without querying a global store. The database model wins on cross-cutting concerns — anything that requires joining information from multiple phases (like "fields of classes that extend MixinBase") is a query, not a pile of flags passed through intermediate AST nodes.

The pipeline approach starts winning the code complexity competition around phase 3. The database approach starts winning around the point where you have enough cross-cutting rules that your pipeline passes are mostly just collecting and forwarding metadata for other passes to consume — at which point you've accidentally reinvented a bad database.

## What t2 actually is now
The current stage9 pipeline is already implicitly building a database — the chain threading through scope-resolve, the env in macro-expand, the span registry. Each of those is a partial query index. The mixin field/declare check is the first rule that would naturally be expressed as a join rather than a nested conditional. It might not be the last.

## topLevelConst
Here's the precise map of what exists:

form	syntax	bare name?	type ann?
topLevelConst	(const x expr)	yes	no
topLevelLet / topLevelVar	(let ((x expr)) ...)	—	yes, via starBinding
constStmt	(const (x: T) expr)	no	yes
letStmt / varStmt	(let ((x: T expr)) ...)	—	yes, via starBinding
topLevelConst is the only outlier — bare IDENTIFIER, no type annotation possible. Everything else already uses a wrapped binding form. topLevelVar / topLevelLet are already consistent with their statement-level counterparts.

The fix is one grammar line — change topLevelConst from bare IDENTIFIER to reuse singleBinding (which constStmt already uses):


// before
topLevelConst
    : LPAREN CONST metaAnnotation* IDENTIFIER expression RPAREN
    ;

// after
topLevelConst
    : LPAREN CONST metaAnnotation* singleBinding expression RPAREN
    ;
singleBinding is (IDENTIFIER (COLON typeExpr)?) — so (const (x) 1) and (const (x: number) 1) both work. It also allows destructuring patterns, which is a bonus.

The catch: every existing (const x expr) at top level in the .s8 sources breaks — and there are likely hundreds of them, including throughout the compiler source files themselves. The AST handler for topLevelConst would also need updating (from reading ctx.IDENTIFIER() to reading ctx.singleBinding()).

Do you want to proceed? If so, I'd suggest doing it in two phases: grammar + AST change first, then a mechanical search-and-replace over all .s8 files to add parens.
