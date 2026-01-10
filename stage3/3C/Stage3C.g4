grammar Stage3C;

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
    : LPAREN LETSTAR LPAREN binding* RPAREN statement* RPAREN
    ;

letStmt
    : LPAREN LET IDENTIFIER expression RPAREN
    ;

constStar
    : LPAREN CONSTSTAR LPAREN binding* RPAREN statement* RPAREN
    ;

constStmt
    : LPAREN CONST IDENTIFIER expression RPAREN
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

binding
    : LPAREN IDENTIFIER expression? RPAREN
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

BOOLEAN     : 'true' | 'false' ;
NULL        : 'null' ;
UNDEFINED   : 'undefined' ;

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
