* export & import, e.g. for test helper functions.
* get `typeof` working.
* does spread really work somehow already e.g. (dbg ((...msgs)))?
* fix 'cond' vs. 'ternary' vs. 'if' all overa again.
* what is up with all the extra ts parens for if-tests?
* fix (. ctx "lambda") vs. (. ctx statement)
* collections literal sugar syntax.
* support object field name-data shortcut.
* sugar for calling with non-string names (. ctx defmacro) somehow?
* Macros will need a more structured IDENTIFIER rule.
* KEYWORD rule overlaps with IDENTIFIER.
* beware if STRING rule allows unescaped quotes.
* MULTILINE_STRING is greedy.
* need sugar for fluid dotted access.
* clean up explict vs. implicit "block"s.
* spreading; destructuring.

- example helper function we want to export/import.
           (let (ass)
                (lambda ((estr) (v))
                (let (vstr) ((. v toString)))
                ((. console log) vstr)
                ((. console assert) (== estr vstr))))