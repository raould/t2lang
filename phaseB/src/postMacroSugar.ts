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
  // Type system forms
  "t:primitive", "t:union", "t:apply", "t:array", "t:nullable", "t:tuple",
  "t:keyof", "t:typeof", "t:indexed", "t:conditional", "t:infer", "t:literal",
  "t:ref", "t:var",
  "typeparams", // Generic type parameters
  // Operators - these should NOT be wrapped in (call ...)
  "+", "-", "*", "/", "%", "**",
  "==", "!=", "===", "!==", "<", ">", "<=", ">=",
  "&&", "||", "!",
  "&", "|", "^", "~", "<<", ">>", ">>>",
  "typeof", "instanceof", "in", "void", "delete",
  "?", ":",
  // Runtime helpers
  "__t2_setIn", "__t2_setInMut",
  "__t2_updateIn", "__t2_updateInMut",
  "__t2_merge", "__t2_mergeMut",
  "__t2_set", "__t2_setMut",
  "__t2_push", "__t2_pushMut",
  "__t2_pop", "__t2_popMut",
  "__t2_sortBy", "__t2_sortByMut",
  "__t2_reverse", "__t2_reverseMut",
  "__t2_delete", "__t2_deleteMut",
  "__t2_isEqual",
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

  // If head is a special form, don't wrap it, but selectively process children
  if (head && head.phaseKind === "symbol" && NON_CALL_HEADS.has((head as SymbolNode).name)) {
    // For special forms, recursively process child expressions, but not binding patterns or type annotations
    const headName = (head as SymbolNode).name;
    const processedElements = listNode.elements.map((child, idx) => {
      // Skip binding patterns in for loops
      if (headName === "for") {
        const secondElement = listNode.elements[1];
        // Check if this is a for-of or for-await (second element is 'of' or 'await')
        const isForOf = secondElement && secondElement.phaseKind === "symbol" &&
                       (secondElement as SymbolNode).name === "of";
        const isForAwait = secondElement && secondElement.phaseKind === "symbol" &&
                          (secondElement as SymbolNode).name === "await";

        if ((isForOf || isForAwait) && idx === 2) {
          return child; // Don't process for-of/await binding
        } else if (!isForOf && !isForAwait && idx === 1) {
          return child; // Don't process classic for loop binding
        }
      }
      if (headName === "while" && idx === 1) {
        return child; // Don't process while condition
      }
      // Skip the binding list in let/const (first arg)
      if ((headName === "let" || headName === "let*" || headName === "const" || headName === "const*") && idx === 1) {
        return child; // Don't process binding list
      }
      // Skip type annotations (they have phaseKind: "type-annotation")
      if (child.phaseKind === "type-annotation") {
        return child;
      }
      // For fn/lambda/method, skip parameter lists (first non-type-param argument)
      if ((headName === "fn" || headName === "lambda" || headName === "method") && idx === 1) {
        return child; // Don't process parameter lists
      }
      return applyCallSugarToNode(child);
    });
    return {
      ...listNode,
      elements: processedElements,
    };
  }

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
