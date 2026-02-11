# -----------------------------------------
# Tokens
# -----------------------------------------

<identifier> ::= <identifier-char> <identifier-char>*
<identifier-char> ::= /* any character except whitespace, "(" or ")" */

<number>     ::= /[0-9]+(\.[0-9]+)?/
<string>     ::= '"' <chars> '"' | "'" <chars> "'"
<boolean>    ::= "true" | "false"
<null>       ::= "null"
<undefined>  ::= "undefined"

<literal>    ::= <number> | <string> | <boolean> | <null> | <undefined>


# -----------------------------------------
# Program
# -----------------------------------------

<program> ::= "(" "program" <statement>* ")"

# -----------------------------------------
# Statements
# -----------------------------------------

<statement> ::= <let-star>
              | <expression>
              | <lambda>
              | <raw>


# -----------------------------------------
# Bindings
# -----------------------------------------

<binding> ::= "(" <identifier> <expression>? ")"

<let-star> ::= "(" "let*" <binding>* <statement>* ")"

# -----------------------------------------
# Callables
# -----------------------------------------

<lambda> ::= "(" "lambda" <fn-signature> <statement>* ")"

<fn-signature> ::= "(" (<param> (","? <param>)*)? ")"

<param> ::= "(" <identifier> ")"


# -----------------------------------------
# Expressions
# -----------------------------------------

<expression> ::= <literal>
               | <identifier>
               | <call>
               | <lambda>
               | <raw>

<call> ::= "(" "call" <expression> <expression>* ")"

# -----------------------------------------
# Raw Escape Hatch
# -----------------------------------------

<raw> ::= "(" "raw" <string> ")"
