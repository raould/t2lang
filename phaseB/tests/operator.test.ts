import test from "node:test";
import assert from "node:assert";
import { runE2E_NodeJS } from "./e2e_helpers.js";
import { parsePhaseBRaw } from "../src/reader.js";
import type { PhaseBListNode, SymbolNode } from "../src/reader.js";

// note: w/out infix this is moot in sexprs. We are just checking transpilation at the moment.

type OperatorTestEntry = {
    description: string;
    t2: string;
    node: string[];
};

test("operator translations", async () => {
    for (const entry of table) {
        const t2prog = `(program
  (fn a2 ()
    (call (prop console "log") "a2")
    (return 2))
  (fn b3 ()
    (call (prop console "log") "b3")
    (return 3))
  (fn c4 ()
    (call (prop console "log") "c4")
    (return 4))
  (let* ((x 0))
    (call (prop console "log") ${entry.t2}))
)`;
        const [compileResult, tscErrors, { stdout, stderr }] = await runE2E_NodeJS(t2prog);
        const result = { ...compileResult, errors: tscErrors };
        let hasErrors = false;
        if (result.errors.length > 0) { hasErrors = true; console.error(result.errors); }
        if (tscErrors.length > 0) { hasErrors = true; console.error(tscErrors); }
        if (stderr.length > 0) { hasErrors = true; console.error(stderr); }
        if (hasErrors) { console.log(entry.description); }
        assert.strictEqual(tscErrors.length, 0, `Expected no TypeScript errors, got: ${tscErrors.join(" | ")}`);
        assert.strictEqual(stderr.length, 0, `Unexpected stderr: ${stderr}`);
        const cleanStdout = stdout.replace(/\x1B\[[0-9;]*m/g, "").trim();
        const lines = cleanStdout.length ? cleanStdout.split(/\r?\n/) : [];
        assert.deepStrictEqual(lines, entry.node, entry.description);
    }
});

  test("infix operator precedence is inductive", async () => {
    for (const entry of infixPrecedenceTable) {
      const source = `(infix (a ${entry.low} b ${entry.high} c))`;
      const nodes = parsePhaseBRaw(source, "infix-inductive.t2");
      const root = nodes[0] as PhaseBListNode;
      const [, rootOperator, left, right] = root.elements;
      assert.strictEqual((rootOperator as SymbolNode).name, entry.low, entry.description);
      assert.strictEqual((left as SymbolNode).name, "a", entry.description);
      assert.strictEqual(right.phaseKind, "list", entry.description);
      const nested = right as PhaseBListNode;
      const [, nestedOperator, nestedLeft, nestedRight] = nested.elements;
      assert.strictEqual((nestedOperator as SymbolNode).name, entry.high, entry.description);
      assert.strictEqual((nestedLeft as SymbolNode).name, "b", entry.description);
      assert.strictEqual((nestedRight as SymbolNode).name, "c", entry.description);
    }
  });

const table: OperatorTestEntry[] = [
  {
    "description": "** (exponentiation) binds tighter than * (multiplicative)",
    "t2": "(* (call a2) (** (call b3) (call c4)))",
    "node": ["a2", "b3", "c4", "162"]
  },
  {
    "description": "* (multiplicative) binds tighter than + (additive)",
    "t2": "(+ (call a2) (* (call b3) (call c4)))",
    "node": ["a2", "b3", "c4", "14"]
  },
  {
    "description": "+ (additive) binds tighter than << (shift)",
    "t2": "(<< (+ (call a2) (call b3)) (call c4))",
    "node": ["a2", "b3", "c4", "80"]
  },
  {
    "description": "<< (shift) binds tighter than < (relational)",
    "t2": "(< (<< (call a2) (call b3)) (call c4))",
    "node": ["a2", "b3", "c4", "false"]
  },
  {
    "description": "< (relational) binds tighter than === (equality)",
    "t2": "(=== (< (call a2) (call b3)) (< (call b3) (call c4)))",
    "node": ["a2", "b3", "b3", "c4", "true"]
  },
  {
    "description": "=== (equality) binds tighter than & (bitwise AND)",
    "t2": "(& (ternary (=== (call a2) (call b3)) 1 0) (call c4))",
    "node": ["a2", "b3", "c4", "0"]
  },
  {
    "description": "& (bitwise AND) binds tighter than ^ (bitwise XOR)",
    "t2": "(^ (& (call a2) (call b3)) (call c4))",
    "node": ["a2", "b3", "c4", "6"]
  },
  {
    "description": "^ (bitwise XOR) binds tighter than | (bitwise OR)",
    "t2": "(| (^ (call a2) (call b3)) (call c4))",
    "node": ["a2", "b3", "c4", "5"]
  },
  {
    "description": "| (bitwise OR) binds tighter than && (logical AND)",
    "t2": "(&& (| (call a2) (call b3)) (call c4))",
    "node": ["a2", "b3", "c4", "4"]
  },
  {
    "description": "&& (logical AND) binds tighter than || (logical OR)",
    "t2": "(|| (&& (call a2) (call b3)) (call c4))",
    "node": ["a2", "b3", "3"]
  },
  {
    "description": "|| (logical OR) binds tighter than ?? (nullish)",
    "t2": "(?? (|| (call a2) (call b3)) (call c4))",
    "node": ["a2", "2"]
  },
  {
    "description": "?? (nullish) binds tighter than ?: (conditional)",
    "t2": "(ternary (?? (call a2) (call b3)) (call c4) (call a2))",
    "node": ["a2", "c4", "4"]
  },
  {
    "description": "?: (conditional) binds tighter than = (assignment)",
    "t2": "(call assign x (ternary (call a2) (call b3) (call c4)))",
    "node": ["a2", "b3", "3"]
  },
  {
    "description": "= (assignment) binds tighter than , (comma)",
    "t2": "(, (call assign x (call a2)) (call b3))",
    "node": ["a2", "b3", "3"]
  }
];

type InfixPrecedenceEntry = {
    description: string;
    high: string;
    low: string;
};

const infixPrecedenceTable: InfixPrecedenceEntry[] = [
    { description: "** binds tighter than *", high: "**", low: "*" },
    { description: "* binds tighter than +", high: "*", low: "+" },
    { description: "+ binds tighter than <<", high: "+", low: "<<" },
    { description: "<< binds tighter than <", high: "<<", low: "<" },
    { description: "< binds tighter than ===", high: "<", low: "===" },
    { description: "=== binds tighter than &", high: "===", low: "&" },
    { description: "& binds tighter than ^", high: "&", low: "^" },
    { description: "^ binds tighter than |", high: "^", low: "|" },
    { description: "| binds tighter than &&", high: "|", low: "&&" },
    { description: "&& binds tighter than ||", high: "&&", low: "||" },
    { description: "|| binds tighter than ??", high: "||", low: "??" },
    { description: "?? binds tighter than ,", high: "??", low: "," },
];

