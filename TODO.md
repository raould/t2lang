# bugs

* there are tests still trying to use --enable-tsc which has been removed.
* make sure t2tc (compile .t2 to .ts) and t2jc (compile .t2 to .ts and then invoke tsc on .ts) are working correctly.

# todo

* done: refactor the t2lang keyword "function", which is like lisp's defun, to just "fn" please.
* functions should support inline return type annotations.
* function syntax should support inline argument type annotations.
* read all other TODO.md files.
* (human): continue to create examples based on https://typescript-cookbook.com/examples/
* for the command-line compilers, the default should always be "pretty".
* we need to define a grammer for t2lang-phase0 e.g. Extended Backus-Naur Form.
* we need more tests around the newer operators in phase0 such as "not" because we were seeing an error end-to-end with example1.t2 being compiled and run as javascript. 
in other words we want to change this t2 function:
    (fn isNotAvailable (obj: any key: any)
        (if (call obj.hasOwnProperty key)
            (return false)
            (return true)
        )
    )
into something like this. it uses "not" and it directly return the boolean value w/out having the extra overhead of the redundant "if" conditional.
    (fn isNotAvailable (obj: any key:any) (return (not (obj.hasOwnProperty key))))
