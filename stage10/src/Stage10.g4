grammar Stage10;

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// important note: maintain `propKey`, see below.
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// ─────────────────────────────────────────────
// Parser rules
// ─────────────────────────────────────────────

program
    : LPAREN PROGRAM topLevel* RPAREN
    ;

topLevel
    : defmacro
    | macroTimeFnDef
    | macroImport
    | macroExport
    | macroReexport
    | topLevelLet
    | topLevelVar
    | topLevelConst
    | fn
    | fnO
    | typeAlias
    | interfaceDef
    | enumDef
    | classDef
    | mixinForm
    | exportDeclForm
    | statement
    ;

// ─── top-level forms ─────────────────────────
// i remain confused as to why these exist yet.

// Named group for inline-exportable declarations.
// anonClassDef is NOT included — only reachable from exportDefaultDecl (Phase 3).
decl
    : topLevelLet
    | topLevelVar
    | topLevelConst
    | fn
    | classDef
    | interfaceDef
    | enumDef
    | typeAlias
    ;

defmacro
    : LPAREN DEFMACRO IDENTIFIER macroSignature statement* RPAREN
    ;

macroSignature
    : LPAREN (IDENTIFIER* (REST IDENTIFIER)?) RPAREN
    ;

macroTimeFnDef
    : LPAREN MACRO_TIME_ATTR topLevelLet  RPAREN
    | LPAREN MACRO_TIME_ATTR topLevelConst RPAREN
    ;

macroImport
    : LPAREN MACRO_IMPORT IDENTIFIER STRING RPAREN
    ;

macroExport
    : LPAREN MACRO_EXPORT macroExportSpec+ RPAREN
    ;

macroExportSpec
    : IDENTIFIER
    ;

macroReexport
    : LPAREN MACRO_REEXPORT IDENTIFIER IDENTIFIER* RPAREN
    ;

topLevelLet
    : LPAREN LET metaAnnotation* LPAREN starBinding RPAREN RPAREN
    ;

topLevelVar
    : LPAREN VAR metaAnnotation* LPAREN starBinding RPAREN RPAREN
    ;

topLevelConst
    : LPAREN CONST metaAnnotation* LPAREN starBinding RPAREN RPAREN
    | LPAREN CONST LPAREN IDENTIFIER (COLON typeExpr)? RPAREN expression RPAREN
    ;


// metadata annotation: ^identifier  (e.g. ^pure, ^async)
metaAnnotation
    : CARET IDENTIFIER
    ;

typeAlias
    : LPAREN TYPE IDENTIFIER typeParams? typeExpr RPAREN
    ;

interfaceDef
    : LPAREN INTERFACE IDENTIFIER typeParams? interfaceExtends? typeObject RPAREN
    ;

interfaceExtends
    : LPAREN EXTENDS typeExpr+ RPAREN
    ;

enumDef
    : LPAREN ENUM IDENTIFIER enumMember* RPAREN
    ;

enumMember
    : LPAREN IDENTIFIER (NUMBER | NEG_NUMBER | STRING)? RPAREN
    ;

// ─── mixin form ───────────────────────────────

mixinForm
    : LPAREN MIXIN IDENTIFIER IDENTIFIER+ mixinFilter? RPAREN
    ;

mixinFilter
    : COLON IDENTIFIER LPAREN IDENTIFIER* RPAREN   // :only  — IDENTIFIER must be "only"
    | COLON EXCEPT     LPAREN IDENTIFIER* RPAREN   // :except — reuses existing EXCEPT token
    ;

// ─── class system ─────────────────────────────

classDef
    : LPAREN CLASS modifier* IDENTIFIER typeParams? classExtends? classImplements? classBody RPAREN
    ;

// Anonymous class — no name, no typeParams.
anonClassDef
    : LPAREN CLASS modifier* classExtends? classImplements? classBody RPAREN
    ;

classExtends
    : LPAREN EXTENDS typeExpr RPAREN
    ;

classImplements
    : LPAREN IMPLEMENTS typeExpr+ RPAREN
    ;

classBody
    : LPAREN CLASS_BODY classElement* RPAREN
    ;

classElement
    : fieldDef
    | constructorDef
    | classMethodDef
    | abstractMethodDef
    | getterDef
    | setterDef
    | methodO
    | abstractMethodO
    | constructorO
    ;

modifier
    : PUBLIC | PRIVATE | PROTECTED | STATIC | ABSTRACT | OVERRIDE | ASYNC | GENERATOR | READONLY | DECLARE
    ;

fieldDef
    : LPAREN FIELD modifier* LPAREN IDENTIFIER (COLON typeExpr)? RPAREN expression? RPAREN
    ;

constructorParam
    : LPAREN modifier* IDENTIFIER OPTIONAL? (COLON typeExpr)? RPAREN
    ;

constructorSignature
    : LPAREN (constructorParam (COMMA? constructorParam)*)? RPAREN (COLON typeExpr)?
    ;

constructorDef
    : LPAREN CONSTRUCTOR constructorSignature statement* RPAREN
    ;

classMethodDef
    : LPAREN METHOD modifier* methodKey fnSignature statement* RPAREN
    ;

abstractMethodDef
    : LPAREN ABSTRACT_METHOD modifier* methodKey fnSignature RPAREN
    ;

getterDef
    : LPAREN GET modifier* methodKey fnSignature statement* RPAREN
    ;

setterDef
    : LPAREN SETPROP modifier* methodKey fnSignature statement* RPAREN
    ;

methodKey
    : IDENTIFIER
    | GET
    | SETPROP
    | LBRACK expression RBRACK
    ;

// ─── statements ──────────────────────────────

statement
    : letStmt
    | varStmt
    | constStar
    | ifForm
    | whileForm
    | exceptForm
    | returnForm
    | throwForm
    | breakForm
    | continueForm
    | importForm
    | importTypeForm
    | exportForm
    | switchForm
    | forForm
    | forInForm
    | forOfForm
    | forAwaitForm
    | assign
    | compoundAssign
    | subscriptAssign
    | macroBodyCall
    | expression
    ;



letStmt // was letStar
    : LPAREN LET LPAREN starBinding+ RPAREN statement* RPAREN
    ;

varStmt
    : LPAREN VAR LPAREN starBinding+ RPAREN statement* RPAREN
    ;

constStar
    : LPAREN CONST LPAREN starBinding+ RPAREN statement* RPAREN
    | LPAREN CONST LPAREN IDENTIFIER (COLON typeExpr)? RPAREN expression RPAREN
    ;

ifForm
    : LPAREN IF expression thenBlock elseBlock? RPAREN
    ;

thenBlock
    : LPAREN THEN statement* RPAREN
    ;

elseBlock
    : LPAREN ELSE statement* RPAREN
    ;

whileForm
    : LPAREN WHILE expression statement* RPAREN
    ;

returnForm
    : LPAREN RETURN expression? RPAREN
    ;

throwForm
    : LPAREN THROW expression RPAREN
    ;

breakForm
    : LPAREN BREAK RPAREN
    ;

continueForm
    : LPAREN CONTINUE RPAREN
    ;

importForm
    : LPAREN IMPORT objectExpr? STRING RPAREN                           // legacy verbose form
    | LPAREN IMPORT objectDestructPat STRING RPAREN                     // (import {foo bar} "mod")
    | LPAREN IMPORT IDENTIFIER STRING RPAREN                            // (import myLib "mod")   — default
    | LPAREN IMPORT IDENTIFIER objectDestructPat STRING RPAREN          // (import React {useState} "react")
    | LPAREN IMPORT STAR AS IDENTIFIER STRING RPAREN                    // (import * as ts "typescript")
    ;

// (import-type (named Foo Bar) "./mod")  → import type { Foo, Bar } from "./mod";
// (import-type (named (Foo F)) "./mod")  → import type { Foo as F } from "./mod";
importTypeForm
    : LPAREN IMPORT_TYPE importTypeSpec STRING RPAREN
    ;

importTypeSpec
    : LPAREN IDENTIFIER importTypeName+ RPAREN
    ;

importTypeName
    : IDENTIFIER
    | LPAREN IDENTIFIER IDENTIFIER RPAREN
    ;

// -----------------------------
// Export Forms
// -----------------------------

exportForm
    : exportBinding
    | exportDefault
    | exportNamed
    | exportNsFromForm
    | exportFrom
    | exportAllFrom
    | exportTypeForm
    | exportTypeFromForm
    | exportTypeAllFromForm
    ;

// (export name value)
exportBinding
    : LPAREN EXPORT IDENTIFIER expression RPAREN
    ;

// (export-default value)
// Also accepts inline declaration forms for: export default class Foo { }
//                                            export default class { }
//                                            export default function foo() { }
exportDefault
    : LPAREN EXPORT_DEFAULT classDef RPAREN
    | LPAREN EXPORT_DEFAULT anonClassDef RPAREN
    | LPAREN EXPORT_DEFAULT topLevelLet RPAREN
    | LPAREN EXPORT_DEFAULT topLevelConst RPAREN
    | LPAREN EXPORT_DEFAULT expression RPAREN
    ;

// (export-named (name alias?) ...)
exportNamed
    : LPAREN EXPORT_NAMED exportNamePair+ RPAREN
    ;

exportNamePair
    : LPAREN IDENTIFIER (IDENTIFIER)? RPAREN
    ;
// (x)        → export x
// (y z)      → export y as z

// (export-from "module" (name alias?) ...)
exportFrom
    : LPAREN EXPORT_FROM STRING exportNamePair+ RPAREN
    ;

// (export-all-from "module")
exportAllFrom
    : LPAREN EXPORT_ALL_FROM STRING RPAREN
    ;

// (export-ns-from "ns" "module")  → export * as ns from "module";
exportNsFromForm
    : LPAREN EXPORT_NS_FROM STRING STRING RPAREN
    ;

// (export-type (Name) (Name Alias) ...)
exportTypeForm
    : LPAREN EXPORT_TYPE exportNamePair+ RPAREN
    ;

// (export-type-from "./mod" (Name) ...)
exportTypeFromForm
    : LPAREN EXPORT_TYPE_FROM STRING exportNamePair+ RPAREN
    ;

// (export-type-all-from "./mod")
exportTypeAllFromForm
    : LPAREN EXPORT_TYPE_ALL_FROM STRING RPAREN
    ;

// (export (class ...)) | (export (interface ...)) | (export (type ...))
// Hooked into topLevel, not exportForm.
// Disambiguated from exportBinding by second token after EXPORT: LPAREN (decl) vs IDENTIFIER.
exportDeclForm
    : LPAREN EXPORT decl RPAREN
    ;

// ──── some bindings ──────────────────────

starBinding
    : LPAREN IDENTIFIER (COLON typeExpr)? expression RPAREN
    ;

singleBinding
    : LPAREN IDENTIFIER (COLON typeExpr)? RPAREN
    | objectDestructPat
    | arrayDestructPat
    ;

// ──── destructuring patterns (Phase 1: plain names only) ────

// { x  y  z }  — shorthand names only; ...rest in Phase 2+
objectDestructPat
    : LBRACE IDENTIFIER* RBRACE
    ;

// [ a  b  c ]  — names only; ...rest in Phase 2+
arrayDestructPat
    : LBRACK IDENTIFIER* RBRACK
    ;

// ─── type expressions ────────────────────────

typeExpr
    : IDENTIFIER
    | NULL
    | UNDEFINED
    | OBJECT             // object  (lowercase keyword — "non-primitive" type)
    | LBRACE RBRACE      // {}  (empty object type)
    | typeUnion
    | typeIntersection
    | typeArray
    | typeTuple
    | typeFunction
    | typeObject
    | typeLiteral
    | typeKeyof
    | typeTypeof
    | typeIndexAccess
    | typeConditional
    | typeInfer
    | typeMapped
    | typeTemplateLiteral
    | typeApplication
    ;

typeUnion
    : LPAREN UNION typeExpr+ RPAREN
    ;

typeIntersection
    : LPAREN INTERSECT typeExpr+ RPAREN
    ;

typeArray
    : LPAREN TYPE_ARRAY typeExpr RPAREN
    ;

typeTuple
    : LPAREN TUPLE typeTupleElement+ RPAREN
    ;

typeTupleElement
    : LPAREN REST typeExpr RPAREN
    | LPAREN IDENTIFIER typeExpr RPAREN
    | typeExpr
    ;

typeFunction
    : LPAREN TYPEFN typeParams? LPAREN typeFnParam* RPAREN typeExpr RPAREN
    ;

typeFnParam
    : LPAREN IDENTIFIER OPTIONAL? typeExpr RPAREN
    ;

typeObject // theoretically will not collide too much with other value-level syntax?
    : LPAREN IDENTIFIER typeProp* RPAREN
    ;

typeProp
    : LPAREN propModifier* IDENTIFIER OPTIONAL? typeExpr RPAREN
    ;

propModifier
    : READONLY
    ;

typeLiteral
    : LPAREN LIT (STRING | NUMBER | BOOLEAN) RPAREN
    ;

typeKeyof
    : LPAREN KEYOF typeExpr RPAREN
    ;

typeTypeof
    : LPAREN TYPEOF IDENTIFIER RPAREN
    ;

typeIndexAccess
    : LPAREN INDEX typeExpr typeExpr RPAREN
    ;

typeConditional
    : LPAREN COND typeExpr typeExpr typeExpr typeExpr RPAREN
    ;

typeInfer
    : LPAREN INFER IDENTIFIER RPAREN
    ;

typeMapped
    : LPAREN MAPPED IDENTIFIER typeExpr mappedModifiers? typeExpr RPAREN
    ;

mappedModifiers
    : LPAREN MODIFIERS mappedModifier+ RPAREN
    ;

mappedModifier
    : READONLY | OPTIONAL
    ;

typeTemplateLiteral
    : LPAREN TYPE_TEMPLATE templatePart+ RPAREN
    ;

templatePart
    : STRING
    | typeExpr
    ;

typeApplication
    : LPAREN TYPE_APP typeExpr typeExpr+ RPAREN
    ;

typeParams
    : LPAREN TYPE_PARAMS typeParamDecl+ RPAREN
    ;

typeParamDecl
    : LPAREN IDENTIFIER typeParamConstraint? typeParamDefault? RPAREN
    ;

typeParamConstraint
    : LPAREN EXTENDS typeExpr RPAREN
    ;

typeParamDefault
    : LPAREN DEFAULT typeExpr RPAREN
    ;

assign
    : LPAREN SET IDENTIFIER expression RPAREN
    | LPAREN SET propAccess expression RPAREN
    | LPAREN SET indexAccess expression RPAREN
    ;

compoundAssign
    : LPAREN PLUS_ASSIGN  IDENTIFIER expression RPAREN
    | LPAREN MINUS_ASSIGN IDENTIFIER expression RPAREN
    | LPAREN TIMES_ASSIGN IDENTIFIER expression RPAREN
    | LPAREN DIV_ASSIGN   IDENTIFIER expression RPAREN
    | LPAREN MOD_ASSIGN   IDENTIFIER expression RPAREN
    ;

subscriptAssign
    : LPAREN expression LBRACK expression RBRACK EQUALS expression RPAREN
    ;

switchForm
    : LPAREN SWITCH expression caseClause* defaultClause? RPAREN
    ;

caseClause
    : LPAREN CASE expression statement* RPAREN
    ;

defaultClause
    : LPAREN DEFAULT statement* RPAREN
    ;

forForm
    : LPAREN FOR letStmt expression assign statement* RPAREN
    | LPAREN FOR LPAREN IDENTIFIER expression RPAREN expression expression statement* RPAREN
    ;

forInForm
    : LPAREN FORIN IDENTIFIER expression statement* RPAREN
    ;

forOfForm
    : LPAREN FOROF IDENTIFIER expression statement* RPAREN
    ;

forAwaitForm
    : LPAREN FORAWAIT IDENTIFIER expression statement* RPAREN
    ;

exceptForm
    : LPAREN EXCEPT tryClause catchClause? finallyClause? RPAREN
    ;

tryClause
    : LPAREN TRY statement* RPAREN
    ;

catchClause
    : LPAREN CATCH IDENTIFIER statement* RPAREN
    ;

finallyClause
    : LPAREN FINALLY statement* RPAREN
    ;

// ─── expressions ─────────────────────────────

expression
    : literal
    | IDENTIFIER
    | MACRO_ERROR
    | MINUS
    | lambda
    | fn
    | asyncLambda
    | asyncFn
    | generatorFn
    | asyncGeneratorFn
    | fnO
    | lambdaO
    | asyncFnO
    | asyncLambdaO
    | generatorFnO
    | asyncGeneratorFnO
    | awaitExpr
    | yieldExpr
    | yieldStarExpr
    | bindExpr
    | methodCallExpr
    | objectExpr
    | braceObjectExpr
    | arrayExpr
    | bracketArrayExpr
    | propAccess
    | indexAccess
    | subscriptAccess
    | quasiquote
    | unquote
    | unquoteSplicing
    | tildeUnquote
    | tildeUnquoteSplice
    | ternary
    | condExpr
    | newForm
    | optChain
    | optChainIndex
    | nullCoalesce
    | typeofExpr
    | typeAssert
    | templateExpr
    | thisExpr
    | superExpr
    | superConstructorCall
    | superMethodCall
    | infixExpr
    | iifeForm
    | iifeAsyncForm
    | macroExprCall
    | opSymbol
    | call // if no previous form matches, assume callable.
    ;

thisExpr
    : THIS
    ;

superExpr
    : SUPER
    ;

superConstructorCall
    : LPAREN SUPER expression* RPAREN
    ;

superMethodCall
    : LPAREN SUPER_METHOD IDENTIFIER expression* RPAREN
    ;

typeofExpr
    : LPAREN TYPEOF expression RPAREN
    ;

typeAssert
    : LPAREN TYPE_AS expression typeExpr RPAREN
    ;

lambda
    : LPAREN LAMBDA fnSignature statement* RPAREN
    ;

fn
    : LPAREN FN IDENTIFIER? fnSignature statement* RPAREN
    ;

asyncLambda
    : LPAREN ASYNC_LAMBDA fnSignature statement* RPAREN
    ;

asyncFn
    : LPAREN ASYNC_FN fnSignature statement* RPAREN
    ;

generatorFn
    : LPAREN GENERATOR_FN fnSignature statement* RPAREN
    ;

asyncGeneratorFn
    : LPAREN ASYNC_GENERATOR_FN fnSignature statement* RPAREN
    ;

iifeForm
    : LPAREN IIFE statement* RPAREN
    ;

iifeAsyncForm
    : LPAREN IIFE_ASYNC statement* RPAREN
    ;

fnO
    : LPAREN FN_O IDENTIFIER? fnoSignature statement* RPAREN
    ;

lambdaO
    : LPAREN LAMBDA_O fnoSignature statement* RPAREN
    ;

asyncFnO
    : LPAREN ASYNC_FN_O fnoSignature statement* RPAREN
    ;

asyncLambdaO
    : LPAREN ASYNC_LAMBDA_O fnoSignature statement* RPAREN
    ;

generatorFnO
    : LPAREN GENERATOR_FN_O fnoSignature statement* RPAREN
    ;

asyncGeneratorFnO
    : LPAREN ASYNC_GENERATOR_FN_O fnoSignature statement* RPAREN
    ;

methodO
    : LPAREN METHOD_O modifier* methodKey fnoSignature statement* RPAREN
    ;

abstractMethodO
    : LPAREN ABSTRACT_METHOD_O modifier* methodKey fnoSignature RPAREN
    ;

constructorO
    : LPAREN CONSTRUCTOR_O fnoSignature statement* RPAREN
    ;

fnoSignature
    : LPAREN (fnoParam* fnoRestParam?) RPAREN (COLON typeExpr)?
    ;

fnoParam
    : LPAREN modifier* IDENTIFIER OPTIONAL? (COLON typeExpr)? (LPAREN DEFAULT expression RPAREN)? RPAREN
    ;

fnoRestParam
    : LPAREN REST IDENTIFIER (COLON typeExpr)? RPAREN
    ;

awaitExpr
    : LPAREN AWAIT expression RPAREN
    ;

yieldExpr
    : LPAREN YIELD expression? RPAREN
    ;

yieldStarExpr
    : LPAREN YIELD_STAR expression RPAREN
    ;

bindExpr
    : LPAREN BIND expression expression expression* RPAREN
    ;

methodCallExpr
    : LPAREN METHOD_CALL expression expression expression* RPAREN
    ;

ternary
    : LPAREN TERNARY expression expression expression RPAREN
    ;

condExpr
    : LPAREN COND condClause+ condElseClause? RPAREN
    ;

condClause
    : expression expression
    ;

condElseClause
    : ELSE expression
    ;

newForm
    : LPAREN NEW IDENTIFIER typeArgs? expression* RPAREN
    ;

// ─── data literals ───────────────────────────

objectExpr
    : LPAREN OBJECT objectField* RPAREN
    ;

objectField
    : LPAREN propKey expression RPAREN
    | LPAREN propKey methodDef RPAREN
    | LPAREN IDENTIFIER RPAREN
    | LPAREN LBRACK expression RBRACK expression RPAREN
    | LPAREN LBRACK expression RBRACK methodDef RPAREN
    ;

methodDef
    : LPAREN METHOD fnSignature statement* RPAREN
    ;

arrayExpr
    : LPAREN ARRAY expression* RPAREN
    ;

bracketArrayExpr
    : LBRACK (expression (COMMA? expression)* COMMA?)? RBRACK
    ;

braceObjectExpr
    : LBRACE (braceObjectField (COMMA? braceObjectField)* COMMA?)? RBRACE
    ;

braceObjectField
    : propKey COLON expression
    | LBRACK expression RBRACK COLON expression
    | IDENTIFIER
    ;

// Value-level template literal: emitted by the reader from `hello ${name}`
// Alternates: STRING chunks and expression holes, always starting and ending with STRING.
templateExpr
    : LPAREN TEMPLATE (STRING | expression)+ RPAREN
    ;

// ─── property / index access ─────────────────

// propKey: any token that can appear as a property name.
// Enumerating all keywords here lets callers write (. obj lambda)
// instead of (. obj "lambda") for keyword-named properties.
// !! IMPORTANT FOR AI AGENTS !!
// When you add a new keyword token to the lexer, you MUST also add it
// to the propKey rule below, or property access using that name will
// silently fall back to the STRING alternative and require quoting.
// Example: adding `FOO : 'foo' ;` → also add `| FOO` here.
propKey
    : IDENTIFIER
    | STRING
    | NUMBER
    | PROGRAM | LET | VAR | CONST | LAMBDA_O | LAMBDA | FN_O | FN | METHOD_O | METHOD | BIND | METHOD_CALL
    | DEFMACRO | MACRO_IMPORT | MACRO_EXPORT | MACRO_REEXPORT | MACRO_TIME_ATTR | MACRO_ERROR | IF | WHILE | THEN | RETURN | THROW | SET | TERNARY | COND
    | OBJECT | ARRAY | INDEX | QUASI | QUOTE | UNQUOTE_SPLICING | UNQUOTE
    | TYPE_ARRAY
    | NEW | IMPORT | SWITCH | CASE | DEFAULT | FORIN | FOROF | FOR
    | FORAWAIT | TRY | CATCH | FINALLY | EXCEPT | AS
    | UNION | INTERSECT | TUPLE | TYPEFN | LIT | KEYOF | TYPEOF | INFER | MAPPED | TYPE_TEMPLATE
    | TEMPLATE
    | REST | READONLY | TYPE_AS | TYPE_PARAMS | TYPE_ARGS | TYPE_APP | EXTENDS | RETURNS | TYPE | INTERFACE | ENUM | MODIFIERS
    | BOOLEAN | NULL | UNDEFINED
    | EXPORT | EXPORT_DEFAULT | EXPORT_NAMED | EXPORT_NS_FROM | EXPORT_FROM | EXPORT_ALL_FROM
    | IMPORT_TYPE | EXPORT_TYPE | EXPORT_TYPE_FROM | EXPORT_TYPE_ALL_FROM
    | CLASS | CLASS_BODY | FIELD | CONSTRUCTOR_O | CONSTRUCTOR | THIS | SUPER | SUPER_METHOD
    | GET | SETPROP | ABSTRACT_METHOD_O | ABSTRACT_METHOD | IMPLEMENTS | MIXIN | DECLARE
    | ASYNC_GENERATOR_FN_O | ASYNC_GENERATOR_FN | ASYNC_LAMBDA_O | ASYNC_LAMBDA | ASYNC_FN_O | ASYNC_FN | GENERATOR_FN_O | GENERATOR_FN
    | YIELD_STAR | YIELD | AWAIT | CARET
    | PUBLIC | PRIVATE | PROTECTED | STATIC | ABSTRACT | OVERRIDE | ASYNC | GENERATOR | ELSE | THEN
    | STRICT_EQ | STRICT_NEQ | EQ_OP | NEQ_OP | GTE_OP | LTE_OP
    | PLUS | STAR | SLASH | PERCENT | STARSTAR
    | LT | GT | BANG | AMP | PIPE | AMPAMP | PIPEPIPE | TILDE | NULLCOAL
    ;

// Operator symbols that are no longer IDENTIFIER after operator tokens were added.
// Placed in expression and propKey so (+ a b), (=== a b), (>= a b), etc. continue to work.
// EQUALS is included so (= a b) reaches the existing AST error check that suggests == or set!
opSymbol
    : STRICT_EQ | STRICT_NEQ | EQ_OP | NEQ_OP | GTE_OP | LTE_OP | EQUALS
    | PLUS | STAR | SLASH | PERCENT | STARSTAR
    | LT | GT | BANG | AMP | PIPE | AMPAMP | PIPEPIPE | CARET | TILDE | NULLCOAL
    ;

propAccess
    : LPAREN DOT expression propKey RPAREN
    | LPAREN DOT expression LBRACK expression RBRACK RPAREN
    ;

subscriptAccess
    : LPAREN SUBSCRIPT expression STRING RPAREN
    ;

indexAccess
    : LPAREN INDEX expression expression RPAREN
    ;

// ─── quasiquote ──────────────────────────────

quasiquote
    : LPAREN (QUASI | QUOTE) quasiForm RPAREN
    ;

quasiForm
    : sForm
    ;

sForm
    : LPAREN UNQUOTE expression RPAREN          // hole: (unquote expr)
    | LPAREN UNQUOTE_SPLICING expression RPAREN // splice hole: (unquote-splicing expr)
    | TILDE expression                          // ~expr: unquote shorthand
    | TILDE_AT expression                       // ~@expr: splice shorthand
    | LPAREN sForm* RPAREN                      // list: any parenthesized sequence
    | ~(LPAREN | RPAREN | TILDE | TILDE_AT)    // atom: any single token except parens/tilde
    ;

unquote
    : LPAREN UNQUOTE expression RPAREN
    ;

unquoteSplicing
    : LPAREN UNQUOTE_SPLICING expression RPAREN
    ;

tildeUnquote
    : TILDE expression
    ;

tildeUnquoteSplice
    : TILDE_AT expression
    ;

// ─── optional chaining / null coalescing ─────

optChain
    : LPAREN OPTCHAIN expression propKey RPAREN
    ;

// Optional index access: foo?.[expr] → (optchain-index foo expr)
// Kept separate from optChain for the same reason indexAccess is separate from propAccess.
optChainIndex
    : LPAREN OPTCHAIN_INDEX expression expression RPAREN
    ;

nullCoalesce
    : LPAREN NULLCOAL expression expression RPAREN
    ;

// ─── infix expressions ───────────────────────

infixExpr
    : HASH_LBRACE infixBody RBRACE
    ;

infixBody
    : infixAtom (infixBinOp infixAtom)*
    ;

infixAtom
    : IDENTIFIER LPAREN infixArgs? RPAREN   // neoteric call: f(x, y), Math.abs(x)
    | infixAtom LPAREN infixArgs? RPAREN    // chained call: f(x)(y)
    | LBRACE infixBody RBRACE               // sub-group: {a * b}
    | infixUnaryOp infixAtom                // unary: -x  !done  ~mask
    | literal
    | IDENTIFIER                            // simple or dotted: x, arr.length, a.b.c
    ;

infixArgs
    : infixBody (COMMA infixBody)*
    ;

infixUnaryOp
    : MINUS | BANG | TILDE
    ;

infixBinOp
    : PLUS | MINUS | STAR | SLASH | PERCENT | STARSTAR
    | LT | GT | LTE_OP | GTE_OP
    | STRICT_EQ | STRICT_NEQ | EQ_OP | NEQ_OP
    | AMPAMP | PIPEPIPE | NULLCOAL
    | AMP | PIPE | CARET
    ;

// ─── macro block call forms ───────────────────
//
// macroExprCall (=>) — valid in expression position; compiles to IIFE.
// macroBodyCall (=&) — valid in statement position only; body emitted inline.
// Both accept zero or more header expressions before the sigil, and zero or
// more statements after it.  The sigil is the parse-time discriminator.
macroExprCall
    : LPAREN IDENTIFIER expression* FAT_ARROW statement* RPAREN
    ;

macroBodyCall
    : LPAREN IDENTIFIER expression* STMT_ARROW statement* RPAREN
    ;

// ─── call ────────────────────────────────────

// syntax for function invocation; optional type arguments may
// appear immediately after the callee.  typeArgs is a separate
// rule so that `(type-args ...)` doesn't accidentally parse as a
// normal call expression.
call
    : LPAREN expression typeArgs? expression* RPAREN
    ;

// a list of type expressions appearing at call sites or `new` forms
// (see docs/TYPE_DESIGN.md for examples)
typeArgs
    : LPAREN TYPE_ARGS typeExpr+ RPAREN
    ;

// ─── shared ──────────────────────────────────

fnSignature
    : LPAREN (param (COMMA? param)* (COMMA? restParam)?)? RPAREN (COLON typeExpr)?
    | LPAREN restParam RPAREN (COLON typeExpr)?
    ;

param
    : LPAREN IDENTIFIER OPTIONAL? (COLON typeExpr)? RPAREN
    ;

restParam
    : LPAREN REST IDENTIFIER (COLON typeExpr)? RPAREN
    ;

literal
    : NUMBER
    | NEG_NUMBER
    | STRING
    | BOOLEAN
    | NULL
    | UNDEFINED
    ;

// ─────────────────────────────────────────────
// Lexer rules
// ─────────────────────────────────────────────

COMMENT
    : ';' ~[\r\n]* -> skip
    ;

LPAREN      : '(' ;
RPAREN      : ')' ;
COMMA       : ',' ;
MACRO_IMPORT    : 'macro-import' ;
MACRO_EXPORT    : 'macro-export' ;
MACRO_REEXPORT  : 'macro-reexport' ;
// keywords  (order matters – longest match first where needed)
PROGRAM     : 'program' ;
// LETSTAR     : 'let*' ; // deprecated
LET         : 'let' ;
VAR         : 'var' ;
CONST       : 'const' ;
LAMBDA_O    : 'lambda-o' ;
LAMBDA      : 'lambda' ;
FN_O        : 'fn-o' ;
FN          : 'fn' ;
METHOD_O    : 'method-o' ;
METHOD      : 'method' ;
BIND        : 'bind' ;
METHOD_CALL : 'method-call' ;
DEFMACRO        : 'defmacro' ;
MACRO_TIME_ATTR : '#[macro-time]' ;
MACRO_ERROR     : 'macro-error' ;
IF          : 'if' ;
WHILE       : 'while' ;
THEN        : 'then' ;
RETURN      : 'return' ;
THROW       : 'throw' ;
BREAK       : 'break' ;
CONTINUE    : 'continue' ;
SET         : 'set!' ;
TERNARY     : 'ternary' ;
COND        : 'cond' ;
OBJECT      : 'object' ;
TYPE_ARRAY  : 'type-array' ;
ARRAY       : 'array' ;
SUBSCRIPT   : 'subscript' ;
OPTCHAIN_INDEX : 'optchain-index' ;
OPTCHAIN    : '.?' ;
DOT         : '.' ;
INDEX       : 'index' ;
NULLCOAL    : '??' ;
QUASI       : 'quasi' ;
QUOTE       : 'quote' ;
UNQUOTE_SPLICING : 'unquote-splicing' ;
UNQUOTE     : 'unquote' ;
NEW         : 'new' ;
IMPORT      : 'import' ;
SWITCH      : 'switch' ;
CASE        : 'case' ;
DEFAULT     : 'default' ;
FORIN       : 'for-in' ;
FOROF       : 'for-of' ;
FORAWAIT    : 'for-await' ;
TRY         : 'try' ;
CATCH       : 'catch' ;
FINALLY     : 'finally' ;
EXCEPT      : 'except' ;
AS          : 'as' ;
FOR         : 'for' ;

// class-system keywords (order matters: longer tokens before shorter prefixes)
CLASS_BODY      : 'class-body' ;
SUPER_METHOD    : 'super-method' ;
ABSTRACT_METHOD_O : 'abstract-method-o' ;
ABSTRACT_METHOD : 'abstract-method' ;
CLASS           : 'class' ;
FIELD           : 'field' ;
CONSTRUCTOR_O   : 'constructor-o' ;
CONSTRUCTOR     : 'constructor' ;
THIS            : 'this' ;
SUPER           : 'super' ;
GET             : 'get' ;
SETPROP         : 'set' ;
IMPLEMENTS      : 'implements' ;
MIXIN           : 'mixin' ;
DECLARE         : 'declare' ;

// type-system keywords
UNION       : 'union' ;
INTERSECT   : 'intersect' ;
TUPLE       : 'tuple' ;
TYPEFN      : 'tfn' ;
LIT         : 'tlit' ;
KEYOF       : 'keyof' ;
TYPEOF      : 'typeof' ;
TYPE_AS      : 'type-as' ;
INFER       : 'infer' ;
MAPPED      : 'mapped' ;
TYPE_TEMPLATE : 'type-template' ;
TEMPLATE    : 'template' ;
REST        : 'rest' ;
READONLY    : 'readonly' ;
TYPE_PARAMS : 'type-params' ;
TYPE_ARGS   : 'type-args' ;
TYPE_APP    : 'type-app' ;
EXTENDS     : 'extends' ;
RETURNS     : 'returns' ;
TYPE        : 'type' ;
INTERFACE   : 'interface' ;
ENUM        : 'enum' ;
MODIFIERS   : 'modifiers' ;
OPTIONAL    : '?' ;

BOOLEAN     : 'true' | 'false' ;
NULL        : 'null' ;
UNDEFINED   : 'undefined' ;

COLON       : ':' ;

// async / generator / await / yield primitives
// (order: longer before shorter to avoid prefix ambiguity)
ASYNC_GENERATOR_FN_O : 'async-generator-fn-o' ;
ASYNC_GENERATOR_FN : 'async-generator-fn' ;
ASYNC_LAMBDA_O   : 'async-lambda-o' ;
ASYNC_LAMBDA       : 'async-lambda' ;
IIFE_ASYNC         : 'iife-async' ;
IIFE               : 'iife' ;
ASYNC_FN_O       : 'async-fn-o' ;
ASYNC_FN           : 'async-fn' ;
GENERATOR_FN_O   : 'generator-fn-o' ;
GENERATOR_FN       : 'generator-fn' ;
YIELD_STAR         : 'yield*' ;
YIELD              : 'yield' ;
AWAIT              : 'await' ;

// metadata prefix: ^ before an identifier annotation
CARET              : '^' ;

// class modifiers
PUBLIC      : 'public' ;
PRIVATE     : 'private' ;
PROTECTED   : 'protected' ;
STATIC      : 'static' ;
ABSTRACT    : 'abstract' ;
OVERRIDE    : 'override' ;
ASYNC       : 'async' ;
GENERATOR   : 'generator' ;
ELSE        : 'else' ;

LBRACK      : '[' ;
RBRACK      : ']' ;
// Operator tokens — must be defined before IDENTIFIER (longest match wins for same-length ties, and
// these are longer than the single-char EQUALS, so they correctly shadow it for ===, !==, etc.)
STRICT_EQ   : '===' ;
STRICT_NEQ  : '!==' ;
EQ_OP       : '==' ;
NEQ_OP      : '!=' ;
GTE_OP      : '>=' ;
LTE_OP      : '<=' ;
// Macro block call sigils — 2-char tokens; maximal munch beats EQUALS + GT/AMP.
// FAT_ARROW: IIFE expression form (=>). STMT_ARROW: inline statement form (=&).
FAT_ARROW   : '=>' ;
STMT_ARROW  : '=&' ;
PLUS_ASSIGN  : '+=' ;
MINUS_ASSIGN : '-=' ;
TIMES_ASSIGN : '*=' ;
DIV_ASSIGN   : '/=' ;
MOD_ASSIGN   : '%=' ;
EQUALS      : '=' ;
LBRACE      : '{' ;
RBRACE      : '}' ;

// Infix expression entry sigil and new operator tokens.
// Multi-char tokens before single-char to ensure maximal munch picks the longer form.
// BANG placed after STRICT_NEQ/NEQ_OP (already defined above) — maximal munch handles it.
HASH_LBRACE : '#{' ;
STARSTAR    : '**' ;
AMPAMP      : '&&' ;
PIPEPIPE    : '||' ;
PLUS        : '+'  ;
STAR        : '*'  ;
SLASH       : '/'  ;
PERCENT     : '%'  ;
LT          : '<'  ;
GT          : '>'  ;
BANG        : '!'  ;
AMP         : '&'  ;
PIPE        : '|'  ;

EXPORT      : 'export';
EXPORT_DEFAULT  : 'export-default';
EXPORT_NAMED    : 'export-named';
EXPORT_NS_FROM  : 'export-ns-from';
EXPORT_FROM     : 'export-from';
EXPORT_ALL_FROM : 'export-all-from';
IMPORT_TYPE          : 'import-type' ;
EXPORT_TYPE_ALL_FROM : 'export-type-all-from' ;
EXPORT_TYPE_FROM     : 'export-type-from' ;
EXPORT_TYPE          : 'export-type' ;

NUMBER
    : [0-9]+ ('.' [0-9]+)?
    ;

STRING
    : '\'' ( ~['\\] | '\\' . )* '\''
    | '"'  ( ~["\\] | '\\' . )* '"'
    | MULTILINE_STRING
    ;

MULTILINE_STRING
    : '"""' (.)*? '"""'
    ;

NEG_NUMBER
    : '-' [0-9]+ ('.' [0-9]+)?
    ;

MINUS
    : '-'
    ;

TILDE_AT    : '~@' ;
TILDE       : '~' ;

// Note: '/' is intentionally NOT excluded — it is used as a namespace separator
// in macro calls (e.g. m/identity). Division in infix requires spaces: #{a / b}.
// Standalone '/' (preceded/followed by whitespace) tokenizes as SLASH via rule priority.
IDENTIFIER
    : ~[() \n\t\r:;\-~\u005B\u005D\u007B\u007D,\u0060?=+*%<>!&|^]+
    ;

WS
    : [ \t\r\n]+ -> skip
    ;
