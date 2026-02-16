grammar Stage3;

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
    | ifForm
    | whileForm
    | block
    | returnForm
    | expression
    ;

letStar
    : LPAREN LETSTAR LPAREN binding* RPAREN statement* RPAREN
    ;

letStmt
    : LPAREN LET IDENTIFIER expression RPAREN
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

binding
    : LPAREN IDENTIFIER expression? RPAREN
    ;

// ─── expressions ─────────────────────────────

expression
    : literal
    | KEYWORD
    | IDENTIFIER
    | lambda
    | assign
    | objectExpr
    | arrayExpr
    | propAccess
    | indexAccess
    | quasiquote
    | unquote
    | unquoteSplicing
    | call
    ;

lambda
    : LPAREN LAMBDA fnSignature statement* RPAREN
    ;

assign
    : LPAREN SET IDENTIFIER expression RPAREN
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
    : LPAREN DOT expression (IDENTIFIER | KEYWORD) RPAREN
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
LAMBDA      : 'lambda' ;
DEF         : 'def' ;
DEFMACRO    : 'defmacro' ;
IF          : 'if' ;
WHILE       : 'while' ;
BEGIN       : 'begin' ;
RETURN      : 'return' ;
SET         : 'set!' ;
OBJECT      : 'object' ;
ARRAY       : 'array' ;
DOT         : '.' ;
INDEX       : 'index' ;
QUASI       : 'quasi' ;
QUOTE       : 'quote' ;
UNQUOTE_SPLICING : 'unquote-splicing' ;
UNQUOTE     : 'unquote' ;

BOOLEAN     : 'true' | 'false' ;
NULL        : 'null' ;
UNDEFINED   : 'undefined' ;

// :foo keyword literals — resolve to strings at runtime
KEYWORD
    : ':' ~[() \n\t\r]+
    ;

NUMBER
    : [0-9]+ ('.' [0-9]+)?
    ;

STRING
    : '\'' (~['])* '\''
    | '"' (~["])* '"'
    | MULTILINE_STRING
    ;

MULTILINE_STRING
    : '"""' (.)*? '"""'
    ;

IDENTIFIER
    : ~[() \n\t\r:]+
    ;

WS
    : [ \t\r\n]+ -> skip
    ;
