# Minor Suggestions

* The binding form sugar allows both (let x 1) and (let ((x 1)) body...). The first has no body, which seems inconsistent—is it implicitly returning x? Clarifying the semantics would help.
* For async/await, the rewrite example (fn (x) (return (await ...))) doesn't quite match the sugar (async (x) ...). A clearer before/after would help implementers.
