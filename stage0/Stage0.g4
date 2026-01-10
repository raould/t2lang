grammar Stage0;

// -----------------------------
// Parser rules
// -----------------------------

program
    : LPAREN PROGRAM statement* RPAREN
    ;

statement
    : expression
    | letStar
    | lambda
    | raw
    ;

binding
    : LPAREN IDENTIFIER expression? RPAREN
    ;

letStar
    : LPAREN LETSTAR LPAREN binding* RPAREN statement* RPAREN
    ;

lambda
    : LPAREN LAMBDA fnSignature statement* RPAREN
    ;

fnSignature
    : LPAREN (param (COMMA? param)*)? RPAREN
    ;

param
    : LPAREN IDENTIFIER RPAREN
    ;

expression
    : literal
    | IDENTIFIER
    | call
    | lambda
    | raw
    ;

call
    : LPAREN CALL expression expression* RPAREN
    ;

raw
    : LPAREN RAW STRING RPAREN
    ;

literal
    : NUMBER
    | STRING
    | BOOLEAN
    | NULL
    | UNDEFINED
    ;

// -----------------------------
// Lexer rules
// -----------------------------

COMMENT
    : ';;' ~[\r\n]* -> skip
    ;

LPAREN      : '(' ;
RPAREN      : ')' ;
COMMA       : ',' ;

PROGRAM     : 'program' ;
LETSTAR     : 'let*' ;
LAMBDA      : 'lambda' ;
CALL        : 'call' ;
RAW         : 'raw' ;

BOOLEAN     : 'true' | 'false' ;
NULL        : 'null' ;
UNDEFINED   : 'undefined' ;

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
    : ~[() \n\t\r]+
    ;

WS
    : [ \t\r\n]+ -> skip
    ;
