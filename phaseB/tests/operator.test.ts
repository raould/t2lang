import test from "node:test";
import assert from "node:assert";
import { compile } from "../../phaseA/src/api";
// import vm from "node:vm";

type OperatorTestEntry = {
    description: string;
    t2: string;
    node: string[];
};

function a() {
    console.log("a");
    return 2
}
function b() {
    console.log("b");
    return 3
}
function c() {
    console.log("c");
    return 4
}

void a;
void b;
void c;

test.skip("operator translations", async () => {
    for (const entry of table) {
        const t2prog = `(program ${entry.t2})`;
        const result = await compile(t2prog, { enableTsc: false });
        assert.strictEqual(result.errors.length, 0);
        assert.strictEqual(result.tsSource, entry.ts);
    }
});

const table: OperatorTestEntry[] = [
  {
    "description": "** (exponentiation) binds tighter than * (multiplicative)",
    "t2": "(* (call a) (** (call b) (call c)))",
    "node": ["a", "b", "c", "32"]
  },
  {
    "description": "* (multiplicative) binds tighter than + (additive)",
    "t2": "(+ (call a) (* (call b) (call c)))",
    "node": ["a", "b", "c", "14"]
  },
  {
    "description": "+ (additive) binds tighter than << (shift)",
    "t2": "(<< (+ (call a) (call b)) (call c))",
    "node": ["a", "b", "c", "48"]
  },
  {
    "description": "<< (shift) binds tighter than < (relational)",
    "t2": "(< (<< (call a) (call b)) (call c))",
    "node": ["a", "b", "c", "false"]
  },
  {
    "description": "< (relational) binds tighter than === (equality)",
    "t2": "(=== (< (call a) (call b)) (call c))",
    "node": ["a", "b", "c", "false"]
  },
  {
    "description": "=== (equality) binds tighter than & (bitwise AND)",
    "t2": "(& (=== (call a) (call b)) (call c))",
    "node": ["a", "b", "c", "0"]
  },
  {
    "description": "& (bitwise AND) binds tighter than ^ (bitwise XOR)",
    "t2": "(^ (& (call a) (call b)) (call c))",
    "node": ["a", "b", "c", "6"]
  },
  {
    "description": "^ (bitwise XOR) binds tighter than | (bitwise OR)",
    "t2": "(| (^ (call a) (call b)) (call c))",
    "node": ["a", "b", "c", "7"]
  },
  {
    "description": "| (bitwise OR) binds tighter than && (logical AND)",
    "t2": "(&& (| (call a) (call b)) (call c))",
    "node": ["a", "b", "c", "4"]
  },
  {
    "description": "&& (logical AND) binds tighter than || (logical OR)",
    "t2": "(|| (&& (call a) (call b)) (call c))",
    "node": ["a", "b", "4"]
  },
  {
    "description": "|| (logical OR) binds tighter than ?? (nullish)",
    "t2": "(?? (|| (call a) (call b)) (call c))",
    "node": ["a", "2"]
  },
  {
    "description": "?? (nullish) binds tighter than ?: (conditional)",
    "t2": "(?: (?? (call a) (call b)) (call c) (call a))",
    "node": ["a", "c"]
  },
  {
    "description": "?: (conditional) binds tighter than = (assignment)",
    "t2": "(= x (?: (call a) (call b) (call c)))",
    "node": ["a", "b", "3"]
  },
  {
    "description": "= (assignment) binds tighter than , (comma)",
    "t2": "(, (= x (call a)) (call b))",
    "node": ["a", "b", "3"]
  }
];
