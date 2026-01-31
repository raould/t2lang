import type {
  PhaseBListNode,
  PhaseBNode,
  PhaseBTypeAnnotation,
  SymbolNode,
} from "./reader.js";
import type { SourceLoc } from "./location.js";

export function applySugar(nodes: PhaseBNode[]): PhaseBNode[] {
  return nodes.map(rewriteNode);
}

function rewriteNode(node: PhaseBNode): PhaseBNode {
  switch (node.phaseKind) {
    case "list":
      return rewriteList(node as PhaseBListNode);
    case "type-annotation":
      return rewriteTypeAnnotation(node as PhaseBTypeAnnotation);
    default:
      return node;
  }
}

function rewriteList(node: PhaseBListNode): PhaseBNode {
  let elements = node.elements;
  const head = elements[0];
  if (head && isSymbol(head, "fn") && elements[1]?.phaseKind === "list") {
    elements = [...elements];
    elements[1] = rewriteFunctionParams(elements[1] as PhaseBListNode);
  }

  const rewrittenElements = elements.map(rewriteNode);
  return { ...node, elements: rewrittenElements };
}

function rewriteFunctionParams(node: PhaseBListNode): PhaseBListNode {
  const elements: PhaseBNode[] = [];
  let idx = 0;
  while (idx < node.elements.length) {
    const target = node.elements[idx];
    const colon = node.elements[idx + 1];
    const annotation = node.elements[idx + 2];
    if (colon && annotation && isColon(colon)) {
      elements.push(createTypeAnnotationNode(target, colon, annotation));
      idx += 3;
      continue;
    }
    elements.push(target);
    idx += 1;
  }
  return { ...node, elements };
}

function createTypeAnnotationNode(target: PhaseBNode, colon: PhaseBNode, annotation: PhaseBNode): PhaseBTypeAnnotation {
  return {
    phaseKind: "type-annotation",
    kind: "list",
    loc: mergeLocs(target.loc, annotation.loc),
    elements: [target, colon, annotation],
    expansionStack: target.expansionStack ?? annotation.expansionStack,
    target,
    annotation,
  };
}

function mergeLocs(first: SourceLoc, second: SourceLoc): SourceLoc {
  if (first.file === second.file) {
    return {
      file: first.file,
      line: first.line,
      column: first.column,
      endLine: second.endLine,
      endColumn: second.endColumn,
    };
  }
  return second;
}

function rewriteTypeAnnotation(node: PhaseBTypeAnnotation): PhaseBTypeAnnotation {
  const target = rewriteNode(node.target);
  const annotation = rewriteNode(node.annotation);
  if (target === node.target && annotation === node.annotation) {
    return node;
  }
  return { ...node, target, annotation };
}

function isSymbol(node: PhaseBNode, name: string): node is SymbolNode & { phaseKind: "symbol" } {
  return node.phaseKind === "symbol" && (node as SymbolNode).name === name;
}

function isColon(node: PhaseBNode): node is SymbolNode & { phaseKind: "symbol" } {
  return node.phaseKind === "symbol" && (node as SymbolNode).name === ":";
}
