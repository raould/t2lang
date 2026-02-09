import type { PhaseBListNode, PhaseBNode, SymbolNode } from "./reader.js";

/**
 * Apply call sugar after macro expansion.
 * Converts (symbol args...) → (call symbol args...) for function calls.
 * This must run AFTER macro expansion so macros can be invoked with (macro-name args) syntax.
 */

const NON_CALL_HEADS = new Set([
  "program",
  "if",
  "block",
  "let",
  "let*",
  "const",
  "const*",
  "assign",
  "for",
  "while",
  "switch",
  "case",
  "default",
  "try",
  "catch",
  "finally",
  "throw",
  "return",
  "break",
  "continue",
  "import",
  "export",
  "type-alias",
  "fn",
  "lambda",
  "method",
  "getter",
  "setter",
  "call",
  "call-with-this",
  "new",
  "prop",
  "index",
  "?.",
  "?.[]",
  "?.call",
  "await",
  "yield",
  "yield*",
  "array",
  "object",
  "template",
  "spread",
  "type-assert",
  "ternary",
  "defmacro",
  "macro",
  "quote",
  "quasiquote",
  "unquote",
  "unquote-splicing",
  "infix",
  "computed",
  "array-pattern",
  "object-pattern",
  "rest",
  "default",
  "list", // Added to handle quasiquote output
]);

export function applyCallSugar(nodes: PhaseBNode[]): PhaseBNode[] {
  return nodes.map((node) => applyCallSugarToNode(node));
}

function applyCallSugarToNode(node: PhaseBNode): PhaseBNode {
  if (node.phaseKind !== "list") {
    return node;
  }

  const listNode = node as PhaseBListNode;
  const head = listNode.elements[0];

  // Recursively apply to child nodes first
  const processedElements = listNode.elements.map((child) => applyCallSugarToNode(child));

  // If head is a bare symbol not in NON_CALL_HEADS, wrap in (call ...)
  if (
    head &&
    head.phaseKind === "symbol" &&
    !NON_CALL_HEADS.has((head as SymbolNode).name) &&
    listNode.elements.length > 1
  ) {
    const callSymbol: SymbolNode & { phaseKind: "symbol" } = {
      kind: "symbol",
      name: "call",
      loc: head.loc,
      phaseKind: "symbol",
    };
    return {
      ...listNode,
      elements: [callSymbol, ...processedElements],
    };
  }

  return {
    ...listNode,
    elements: processedElements,
  };
}
