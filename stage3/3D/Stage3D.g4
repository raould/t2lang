grammar Stage3D;

// ─────────────────────────────────────────────
// Parser rules
// ─────────────────────────────────────────────

program
    : LPAREN PROGRAM topLevel* RPAREN
    ;

topLevel
    : defmacro
    | def
    | statement
    ;

// ─── top-level forms ─────────────────────────

defmacro
    : LPAREN DEFMACRO IDENTIFIER fnSignature statement* RPAREN
    ;

def
    : LPAREN DEF IDENTIFIER expression RPAREN
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
    : LPAREN FN typeParams? LPAREN typeFnParam* RPAREN typeExpr RPAREN
    ;

typeFnParam
    : LPAREN IDENTIFIER OPTIONAL? typeExpr RPAREN
    ;

typeObject
    : LPAREN /* OBJ */ IDENTIFIER typeProp* RPAREN
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
    | call // if no previous form matches, assume callable.
    ;

lambda
    : LPAREN LAMBDA fnSignature statement* RPAREN
    ;

ternary
    : LPAREN TERNARY expression expression expression RPAREN
    ;

condExpr
    : LPAREN COND (expression expression)+ RPAREN
    ;

newForm
    : LPAREN NEW IDENTIFIER expression* RPAREN
    ;

// ─── data literals ───────────────────────────

objectExpr
    : LPAREN OBJECT objectField* RPAREN
    ;

objectField
    : LPAREN (IDENTIFIER | KEYWORD | STRING) expression RPAREN
    ;

arrayExpr
    : LPAREN ARRAY expression* RPAREN
    ;

// ─── property / index access ─────────────────

propAccess
    : LPAREN DOT expression (IDENTIFIER | KEYWORD | STRING) RPAREN
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
    : LPAREN OPTCHAIN expression IDENTIFIER RPAREN
    ;

nullCoalesce
    : LPAREN NULLCOAL expression expression RPAREN
    ;

// ─── call ────────────────────────────────────

call
    : LPAREN expression expression* RPAREN
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
FN          : 'fn' ;
// OBJ token removed so 'obj' is treated as an identifier
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

IDENTIFIER
    : ~[() \n\t\r:;]+
    ;

WS
    : [ \t\r\n]+ -> skip
    ;
