import test from "node:test";
import { helperStrictNode, helperMatchNode } from "./e2e_helpers.js";

// things that have failed somewhere before...

test("was empirically failing #3", async () => {
    const source = `
    (program
        (let ((x 42))
            (if (> x 41) (console.log "yes1"))
            (if (infix (x > 41)) (console.log "yes2"))
            (if :(x > 41) (console.log "yes3"))))
    `;
    await helperMatchNode(source, /yes1[\s\S]*yes2[\s\S]*yes3/);
});

test("was empirically failing #2", async () => {
    const source = `(program
        (let* ((f (lambda (x:number) (return x))))
              (call (prop console "log") (call + (call f 2) 3))))`;
    await helperStrictNode(source, "5");
});

test("was empirically failing #1", async () => {
    const source = `(program (console.log (+ ((lambda (x:number) (return x)) 2) 3)))`;
    await helperStrictNode(source, "5");
});
