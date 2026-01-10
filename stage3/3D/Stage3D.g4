grammar Stage3D;

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
    | def
    | typeAlias
    | interfaceDef
    | statement
    ;

// ─── top-level forms ─────────────────────────
// i remain confused as to why these exist yet.

defmacro
    : LPAREN DEFMACRO IDENTIFIER fnSignature statement* RPAREN
    ;

def
    : LPAREN DEF IDENTIFIER expression RPAREN
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

// ─── statements ──────────────────────────────

statement
    : letStar
    | letStmt
    | constStar
    | constStmt
    | ifForm
    | whileForm
    | block
    | returnForm
    | throwForm
    | importForm
    | exportForm
    | switchForm
    | forForm
    | forInForm
    | forOfForm
    | assign
    | expression
    ;


letStar
    : LPAREN LETSTAR LPAREN starBinding* RPAREN statement* RPAREN
    ;

letStmt
    : LPAREN LET singleBinding expression RPAREN
    ;

constStar
    : LPAREN CONSTSTAR LPAREN starBinding* RPAREN statement* RPAREN
    ;

constStmt
    : LPAREN CONST singleBinding expression RPAREN
    ;

ifForm
    : LPAREN IF expression statement statement? RPAREN
    ;

whileForm
    : LPAREN WHILE expression statement* RPAREN
    ;

block
    : LPAREN BEGIN statement* RPAREN
    ;

returnForm
    : LPAREN RETURN expression? RPAREN
    ;

throwForm
    : LPAREN THROW expression RPAREN
    ;

importForm
    : LPAREN IMPORT objectExpr? STRING RPAREN
    ;

// -----------------------------
// Export Forms
// -----------------------------

exportForm
    : exportBinding
    | exportDefault
    | exportNamed
    | exportFrom
    | exportAllFrom
    ;

// (export name value)
exportBinding
    : LPAREN EXPORT IDENTIFIER expression RPAREN
    ;

// (export-default value)
exportDefault
    : LPAREN EXPORT_DEFAULT expression RPAREN
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

// ──── some bindings ──────────────────────

starBinding
    : LPAREN IDENTIFIER (COLON typeExpr)? expression RPAREN
    ;

singleBinding
    : LPAREN IDENTIFIER (COLON typeExpr)? RPAREN
    ;

// ─── type expressions ────────────────────────

typeExpr
    : IDENTIFIER
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
    : LPAREN UNION typeExpr typeExpr+ RPAREN
    ;

typeIntersection
    : LPAREN INTERSECT typeExpr typeExpr+ RPAREN
    ;

typeArray
    : LPAREN ARRAY typeExpr RPAREN
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
    : LPAREN LIT (STRING | BACKTICK_STRING | NUMBER | BOOLEAN) RPAREN
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
    : LPAREN TEMPLATE templatePart+ RPAREN
    ;

templatePart
    : STRING
    | typeExpr
    ;

typeApplication
    : LPAREN typeExpr typeExpr+ RPAREN
    ;

typeParams
    : LPAREN TYPE_PARAMS typeParamDecl+ RPAREN
    ;

typeParamDecl
    : IDENTIFIER
    | LPAREN IDENTIFIER typeParamConstraint? typeParamDefault? RPAREN
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
    ;

forInForm
    : LPAREN FORIN IDENTIFIER expression statement* RPAREN
    ;

forOfForm
    : LPAREN FOROF IDENTIFIER expression statement* RPAREN
    ;

// ─── expressions ─────────────────────────────

expression
    : literal
    | KEYWORD
    | IDENTIFIER
    | lambda
    | fn
    | bindExpr
    | methodCallExpr
    | objectExpr
    | arrayExpr
    | propAccess
    | indexAccess
    | quasiquote
    | unquote
    | unquoteSplicing
    | ternary
    | condExpr
    | newForm
    | optChain
    | nullCoalesce
    | typeofExpr
    | call // if no previous form matches, assume callable.
    ;

typeofExpr
    : LPAREN TYPEOF expression RPAREN
    ;

lambda
    : LPAREN LAMBDA fnSignature statement* RPAREN
    ;

fn
    : LPAREN FN fnSignature statement* RPAREN
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
    : LPAREN COND (expression expression)+ RPAREN
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
    ;

methodDef
    : LPAREN METHOD fnSignature statement* RPAREN
    ;

arrayExpr
    : LPAREN ARRAY expression* RPAREN
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
    | KEYWORD
    | STRING
    | BACKTICK_STRING
    | PROGRAM | LETSTAR | LET | CONSTSTAR | CONST | LAMBDA | FN | METHOD | BIND | METHOD_CALL
    | DEF | DEFMACRO | IF | WHILE | BEGIN | RETURN | THROW | SET | TERNARY | COND
    | OBJECT | ARRAY | INDEX | QUASI | QUOTE | UNQUOTE_SPLICING | UNQUOTE
    | NEW | IMPORT | SWITCH | CASE | DEFAULT | FORIN | FOROF | FOR
    | UNION | INTERSECT | TUPLE | TYPEFN | LIT | KEYOF | TYPEOF | INFER | MAPPED | TEMPLATE
    | REST | READONLY | TYPE_PARAMS | TYPE_ARGS | EXTENDS | RETURNS | TYPE | INTERFACE | MODIFIERS
    | BOOLEAN | NULL | UNDEFINED
    | EXPORT | EXPORT_DEFAULT | EXPORT_NAMED | EXPORT_FROM | EXPORT_ALL_FROM
    ;

propAccess
    : LPAREN DOT expression propKey RPAREN
    ;

indexAccess
    : LPAREN INDEX expression expression RPAREN
    ;

// ─── quasiquote ──────────────────────────────

quasiquote
    : LPAREN (QUASI | QUOTE) expression RPAREN
    ;

unquote
    : LPAREN UNQUOTE expression RPAREN
    ;

unquoteSplicing
    : LPAREN UNQUOTE_SPLICING expression RPAREN
    ;

// ─── optional chaining / null coalescing ─────

optChain
    : LPAREN OPTCHAIN expression propKey RPAREN
    ;

nullCoalesce
    : LPAREN NULLCOAL expression expression RPAREN
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
    : LPAREN (param (COMMA? param)*)? RPAREN
    ;

param
    : LPAREN IDENTIFIER RPAREN
    ;

literal
    : NUMBER
    | STRING
    | BACKTICK_STRING
    | BOOLEAN
    | NULL
    | UNDEFINED
    ;

// ─────────────────────────────────────────────
// Lexer rules
// ─────────────────────────────────────────────

COMMENT
    : ';;' ~[\r\n]* -> skip
    ;

LPAREN      : '(' ;
RPAREN      : ')' ;
COMMA       : ',' ;

// keywords  (order matters – longest match first where needed)
PROGRAM     : 'program' ;
LETSTAR     : 'let*' ;
LET         : 'let' ;
CONSTSTAR   : 'const*' ;
CONST       : 'const' ;
LAMBDA      : 'lambda' ;
FN          : 'fn' ;
METHOD      : 'method' ;
BIND        : 'bind' ;
METHOD_CALL : 'method-call' ;
DEF         : 'def' ;
DEFMACRO    : 'defmacro' ;
IF          : 'if' ;
WHILE       : 'while' ;
BEGIN       : 'begin' ;
RETURN      : 'return' ;
THROW       : 'throw' ;
SET         : 'set!' ;
TERNARY     : 'ternary' ;
COND        : 'cond' ;
OBJECT      : 'object' ;
ARRAY       : 'array' ;
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
FOR         : 'for' ;

// type-system keywords
UNION       : 'union' ;
INTERSECT   : 'intersect' ;
TUPLE       : 'tuple' ;
TYPEFN      : 'tfn' ;
LIT         : 'tlit' ;
KEYOF       : 'keyof' ;
TYPEOF      : 'typeof' ;
INFER       : 'infer' ;
MAPPED      : 'mapped' ;
TEMPLATE    : 'template' ;
REST        : 'rest' ;
READONLY    : 'readonly' ;
TYPE_PARAMS : 'type-params' ;
TYPE_ARGS   : 'type-args' ;
EXTENDS     : 'extends' ;
RETURNS     : 'returns' ;
TYPE        : 'type' ;
INTERFACE   : 'interface' ;
MODIFIERS   : 'modifiers' ;
OPTIONAL    : '?' ;

BOOLEAN     : 'true' | 'false' ;
NULL        : 'null' ;
UNDEFINED   : 'undefined' ;

COLON       : ':' ;

LBRACK      : '[' ;
RBRACK      : ']' ;

EXPORT      : 'export';
EXPORT_DEFAULT  : 'export-default';
EXPORT_NAMED    : 'export-named';
EXPORT_FROM     : 'export-from';
EXPORT_ALL_FROM : 'export-all-from';

// :foo keyword literals — resolve to strings at runtime
KEYWORD
    : ':' ~[() \n\t\r]+
    ;

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

// Backtick raw strings: content is taken literally, no escape sequences.
// Backticks cannot appear inside without a closing backtick being added.
BACKTICK_STRING
    : '`' ~[`]* '`'
    ;

IDENTIFIER
    : ~[() \n\t\r:;]+
    ;

WS
    : [ \t\r\n]+ -> skip
    ;
