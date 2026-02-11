import assert from "node:assert";
import test from "node:test";
import { readFileSync } from "node:fs";
import { INFIX_OPERATOR_TABLE } from "../src/sugar.ts";

const precedenceDoc = JSON.parse(
  readFileSync(new URL("../EVALUATION_PRECEDENCE.json", import.meta.url), "utf-8"),
) as {
  operators: Array<{
    symbols: string[];
    precedence: number;
    associativity: "left" | "right" | null;
    shortCircuit: boolean;
  }>;
  evaluationOrder: {
    operands: string;
  };
};

const lookup = new Map<string, { precedence: number; associativity: "left" | "right" | null; shortCircuit: boolean }>();
for (const entry of precedenceDoc.operators) {
  for (const symbol of entry.symbols) {
    lookup.set(symbol, {
      precedence: entry.precedence,
      associativity: entry.associativity,
      shortCircuit: entry.shortCircuit,
    });
  }
}

function getEntry(symbol: string) {
  const entry = lookup.get(symbol);
  assert(entry, `Missing precedence entry for ${symbol}`);
  return entry;
}

test("infix operator precedence matches EVALUATION_PRECEDENCE.json", () => {
  for (const [symbol, info] of Object.entries(INFIX_OPERATOR_TABLE)) {
    const entry = getEntry(symbol);
    assert.strictEqual(info.precedence, entry.precedence, `precedence for ${symbol}`);
  }
});

test("infix operator associativity matches EVALUATION_PRECEDENCE.json", () => {
  for (const [symbol, info] of Object.entries(INFIX_OPERATOR_TABLE)) {
    const entry = getEntry(symbol);
    const expected = entry.associativity ?? "left";
    assert.strictEqual(info.associativity, expected, `associativity for ${symbol}`);
  }
});

test("operators evaluate operands left-to-right", () => {
  for (const symbol of Object.keys(INFIX_OPERATOR_TABLE)) {
    assert.strictEqual(
      precedenceDoc.evaluationOrder.operands,
      "left-to-right",
      `evaluation order for ${symbol}`,
    );
  }
});

test("short-circuiting operators are marked in the precedence doc", () => {
  const shortCircuitSymbols = ["&&", "||", "??"];
  for (const symbol of shortCircuitSymbols) {
    const entry = getEntry(symbol);
    assert(entry.shortCircuit, `${symbol} should short-circuit`);
  }
});
