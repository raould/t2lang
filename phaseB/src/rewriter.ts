import type { ListNode, SExprNode, SymbolNode } from "./reader.js";
import { gensym } from "./gensym.js";

export function rewriteAssignments(nodes: SExprNode[]): SExprNode[] {
  return nodes.map(rewriteNode);
}

function rewriteNode(node: SExprNode): SExprNode {
  if (isListNode(node)) {
    const [originalHead, ...rest] = node.elements;
    const rewrittenRest = rest.map(rewriteNode);
    if (isSymbolNode(originalHead)) {
      const methodCall = rewriteMethodCall(originalHead, rewrittenRest, node.loc);
      if (methodCall) {
        return methodCall;
      }
    }
    const rewrittenHead = originalHead ? rewriteNode(originalHead) : undefined;
    if (isSymbolNode(rewrittenHead)) {
      const parallel = rewriteParallelBindings(rewrittenHead, rewrittenRest, node.loc);
      if (parallel) {
        return parallel;
      }
    }
    if (isSymbolNode(rewrittenHead) && rewrittenHead.name === ":=") {
      const assignSymbol: SymbolNode = {
        ...rewrittenHead,
        name: "assign",
      };
      return { ...node, elements: [assignSymbol, ...rewrittenRest] };
    }
    const elements = rewrittenHead ? [rewrittenHead, ...rewrittenRest] : rewrittenRest;
    return { ...node, elements };
  }
  if (isSymbolNode(node)) {
    const propertyAccess = rewritePropertyAccess(node);
    if (propertyAccess) {
      return propertyAccess;
    }
  }
  return node;
}

function isListNode(node: SExprNode): node is ListNode {
  return node.kind === "list";
}

function isSymbolNode(node: SExprNode | undefined): node is SymbolNode {
  return Boolean(node && node.kind === "symbol");
}

function rewriteMethodCall(head: SymbolNode, args: SExprNode[], loc: SymbolNode["loc"]): SExprNode | null {
  const parts = head.name.split(".");
  if (parts.length <= 1 || parts.some((part) => part.length === 0)) {
    return null;
  }
  const methodName = parts[parts.length - 1];
  const objectParts = parts.slice(0, -1);
  const objectExpr = buildPropertyChain(objectParts, loc);
  const propCall = createList([
    createSymbol("prop", loc),
    objectExpr,
    createStringLiteral(methodName, loc),
  ], loc);
  return createList([
    createSymbol("call", loc),
    propCall,
    ...args,
  ], loc);
}

function rewritePropertyAccess(node: SymbolNode): SExprNode | null {
  const parts = node.name.split(".");
  if (parts.length <= 1 || parts.some((part) => part.length === 0)) {
    return null;
  }
  return buildPropertyChain(parts, node.loc);
}

function rewriteParallelBindings(
  head: SymbolNode,
  elements: SExprNode[],
  loc: SymbolNode["loc"]
): SExprNode | null {
  if (head.name !== "let" && head.name !== "const") {
    return null;
  }
  if (elements.length === 0) {
    return null;
  }
  const [bindingsNode, ...body] = elements;
  if (!isListNode(bindingsNode)) {
    return null;
  }
  if (bindingsNode.elements.length === 0) {
    return null;
  }
  const pairs: { target: SExprNode; init: SExprNode }[] = [];
  for (const entry of bindingsNode.elements) {
    if (!isListNode(entry) || entry.elements.length < 2) {
      return null;
    }
    pairs.push({ target: entry.elements[0], init: entry.elements[1] });
  }

  const tempSymbols: SymbolNode[] = [];
  const newBindings: SExprNode[] = [];
  for (const { target, init } of pairs) {
    const tempSymbol = createSymbol(gensym(`${head.name}_tmp_`), target.loc);
    tempSymbols.push(tempSymbol);
    newBindings.push(createList([tempSymbol, init], bindingsNode.loc));
  }
  for (const [index, { target }] of pairs.entries()) {
    newBindings.push(createList([target, tempSymbols[index]], bindingsNode.loc));
  }

  const updatedBindings = createList(newBindings, bindingsNode.loc);
  const rewrittenHead = createSymbol(`${head.name}*`, head.loc);
  return createList([rewrittenHead, updatedBindings, ...body], loc);
}

function buildPropertyChain(parts: string[], loc: SymbolNode["loc"]): SExprNode {
  const [base, ...properties] = parts;
  let current: SExprNode = createSymbol(base, loc);
  for (const property of properties) {
    current = createList([
      createSymbol("prop", loc),
      current,
      createStringLiteral(property, loc),
    ], loc);
  }
  return current;
}

function createSymbol(name: string, loc: SymbolNode["loc"]): SymbolNode {
  return { kind: "symbol", name, loc };
}

function createStringLiteral(value: string, loc: SymbolNode["loc"]): SExprNode {
  return { kind: "literal", value, loc };
}

function createList(elements: SExprNode[], loc: SymbolNode["loc"]): ListNode {
  return { kind: "list", elements, loc };
}