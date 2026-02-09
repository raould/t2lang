import type { PhaseBListNode, PhaseBNode, SymbolNode } from "./reader.js";

/**
 * Apply call sugar after macro expansion.
 * Converts (symbol args...) → (call symbol args...) for function calls.
 * This must run AFTER macro expansion so macros can be invoked with (macro-name args) syntax.
 */

/**
 * Canonical Phase A node tags and operators.
 * Derived from phaseA/GRAMMAR.md and phaseB/src/sugar.ts (INFIX_OPERATOR_TABLE).
 *
 * These are the ONLY list heads that should NOT be wrapped in (call ...).
 * Everything else (user-defined functions, macros before expansion) becomes a function call.
 *
 * Note: Operators and runtime helpers are canonical Phase A forms even though GRAMMAR.md
 * doesn't enumerate them explicitly. They're represented as bare lists like (+ x y), not (call + x y).
 */
const NON_CALL_HEADS = new Set([
  // ===== Canonical Phase A node tags (from GRAMMAR.md) =====

  // Program
  "program",

  // Statements
  "block",
  "if",
  "while",
  "for", // with modifiers: "classic", "of", "await"
  "return",
  "break",
  "continue",
  "switch",
  "case",
  "default",
  "let", // Phase B sugar form, lowerer accepts both let and let*
  "let*",
  "const", // Phase B sugar form, lowerer accepts both const and const*
  "const*",
  "assign",

  // Callables
  "fn",
  "lambda",
  "method",
  "getter",
  "setter",

  // Class
  "class",
  "class-body",
  "extends",
  "implements",
  "abstract",
  "decorators",

  // Import/Export
  "import",
  "import-default",
  "import-named",
  "import-all",
  "import-spec",
  "export",
  "export-spec",
  "named",

  // Modules
  "enum",
  "enum-body",
  "namespace",
  "namespace-body",

  // Types
  "type-alias",
  "type-interface",
  "interface-body",
  "index-signature",

  // Binding patterns
  "array-pattern",
  "object-pattern",
  "rest",
  "default", // destructuring default

  // Static blocks
  "static-block",

  // Expressions
  "call",
  "call-with-this",
  "?.call",
  "prop",
  "index",
  "?.",
  "?.[]",
  "new",
  "throw",
  "try",
  "catch",
  "finally",
  "array",
  "object",
  "spread",
  "computed",
  "ternary",
  "template",
  "non-null",
  "type-assert",
  "await",
  "yield",
  "yield*",

  // Type expressions
  "type-string",
  "type-number",
  "type-boolean",
  "type-null",
  "type-undefined",
  "type-ref",
  "type-function",
  "type-object",
  "type-union",
  "type-intersection",
  "type-this",
  "type-mapped",
  "type-template",
  "type-literal",
  "typeparams",
  "type-app",

  // ===== Operators (canonical Phase A forms, from INFIX_OPERATOR_TABLE) =====
  // These are represented as (op left right), not (call op left right)

  // Arithmetic
  "+", "-", "*", "/", "%", "**",

  // Comparison
  "==", "!=", "===", "!==", "<", ">", "<=", ">=",

  // Logical
  "&&", "||",

  // Bitwise
  "&", "|", "^", "~", "<<", ">>", ">>>",

  // Other
  "in", "instanceof",

  // Unary operators (also canonical Phase A forms)
  "!", "typeof", "void", "delete",

  // ===== Runtime helpers (canonical Phase A forms) =====
  // These are special functions that Phase B lowers to directly, without call wrapping
  "__t2_setIn",
  "__t2_setInMut",
  "__t2_updateIn",
  "__t2_updateInMut",
  "__t2_merge",
  "__t2_mergeMut",
  "__t2_set",
  "__t2_setMut",
  "__t2_push",
  "__t2_pushMut",
  "__t2_pop",
  "__t2_popMut",
  "__t2_sortBy",
  "__t2_sortByMut",
  "__t2_reverse",
  "__t2_reverseMut",
  "__t2_delete",
  "__t2_deleteMut",
  "__t2_isEqual",

  // ===== Phase B special forms =====
  // These should be gone after macro expansion, but kept for safety during transition
  "defmacro",
  "quote",
  "quasiquote",
  "unquote",
  "unquote-splicing",
  "infix",
  "list",
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
      // For fn/lambda/method, skip parameter lists and return type annotations
      if (headName === "fn" || headName === "lambda" || headName === "method") {
        if (idx === 1) {
          return child; // Don't process parameter lists
        }
        // Skip return types after : marker
        if (idx >= 2 && listNode.elements[idx - 1]?.phaseKind === "symbol" &&
            (listNode.elements[idx - 1] as SymbolNode).name === ":") {
          return child; // Don't process return type annotations
        }
      }
      // For type-alias and type-interface, skip everything after :type-params or typeparams
      if ((headName === "type-alias" || headName === "type-interface") && idx >= 2) {
        // Skip :type-params marker and the following list, and all type expressions
        if (child.phaseKind === "symbol" && (child as SymbolNode).name === ":type-params") {
          return child;
        }
        if (child.phaseKind === "list") {
          const listHead = (child as PhaseBListNode).elements[0];
          if (listHead && listHead.phaseKind === "symbol" && (listHead as SymbolNode).name === "typeparams") {
            return child; // Don't process type param lists
          }
        }
        return child; // Don't process type expressions
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
