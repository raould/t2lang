import type {
  PhaseBListNode,
  PhaseBNode,
  PhaseBTypeAnnotation,
  SymbolNode,
} from "./reader.js";
import type { SourceLoc } from "./location.js";
import { parseTypeExpression, TypeAst } from "./typeExpr.js";
import { collectAnnotationSegment, mergeLocs, serializePhaseBNode } from "./typeAnnotationUtils.js";

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
  if (head && isLetForm(head) && elements[1]?.phaseKind === "list") {
    elements = [...elements];
    elements[1] = rewriteLetBindings(elements[1] as PhaseBListNode);
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
    if (colon && isColon(colon)) {
      const annotationStart = idx + 2;
      const { annotationNode, consumed } = collectAnnotationSegment(node.elements, annotationStart);
      if (annotationNode && consumed > 0) {
        elements.push(createTypeAnnotationNode(target, colon, annotationNode));
        idx = annotationStart + consumed;
        continue;
      }
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

function rewriteLetBindings(node: PhaseBListNode): PhaseBListNode {
  const rewritten = node.elements.map((binding) => {
    if (binding.phaseKind === "list") {
      return rewriteBindingEntry(binding as PhaseBListNode);
    }
    return binding;
  });
  return { ...node, elements: rewritten };
}

function rewriteBindingEntry(node: PhaseBListNode): PhaseBListNode {
  const elements: PhaseBNode[] = [];
  let idx = 0;
  while (idx < node.elements.length) {
    const target = node.elements[idx];
    const colon = node.elements[idx + 1];
    if (colon && isColon(colon)) {
      const annotationStart = idx + 2;
      const { annotationNode, consumed } = collectAnnotationSegment(node.elements, annotationStart);
      if (annotationNode && consumed > 0) {
        elements.push(createTypeAnnotationNode(target, colon, annotationNode));
        idx = annotationStart + consumed;
        continue;
      }
    }
    elements.push(node.elements[idx]);
    idx += 1;
  }
  return { ...node, elements };
}

function isLetForm(node: PhaseBNode): node is SymbolNode & { phaseKind: "symbol" } {
  return (
    node.phaseKind === "symbol" &&
    ["let", "let*", "const", "const*"].includes((node as SymbolNode).name)
  );
}

function rewriteTypeAnnotation(node: PhaseBTypeAnnotation): PhaseBTypeAnnotation {
  const target = rewriteNode(node.target);
  const annotation = rewriteNode(node.annotation);
  const convertedAnnotation = convertTypeAnnotation(annotation);
  if (target === node.target && convertedAnnotation === node.annotation) {
    return node;
  }
  return { ...node, target, annotation: convertedAnnotation };
}

function isSymbol(node: PhaseBNode, name: string): node is SymbolNode & { phaseKind: "symbol" } {
  return node.phaseKind === "symbol" && (node as SymbolNode).name === name;
}

function isColon(node: PhaseBNode): node is SymbolNode & { phaseKind: "symbol" } {
  return node.phaseKind === "symbol" && (node as SymbolNode).name === ":";
}

function convertTypeAnnotation(annotation: PhaseBNode): PhaseBNode {
  if (annotation.phaseKind === "list") {
    const list = annotation as PhaseBListNode;
    const head = list.elements[0];
    if (head?.phaseKind === "symbol") {
      const symbolHead = head as SymbolNode;
      if (symbolHead.name.startsWith("t:")) {
        return annotation;
      }
    }
  }
  const serialized = serializePhaseBNode(annotation);
  if (!serialized) {
    return annotation;
  }
  try {
    const ast = parseTypeExpression(serialized);
    return typeAstToPhaseB(ast, annotation.loc);
  } catch {
    return annotation;
  }
}

function typeAstToPhaseB(ast: TypeAst, loc: SourceLoc): PhaseBNode {
  switch (ast.kind) {
    case "primitive":
      return createTypeList("t:primitive", [createStringLiteral(ast.name, loc)], loc);
    case "ref":
      return createTypeList("t:ref", [createStringLiteral(ast.name, loc)], loc);
    case "array":
      return createTypeList("t:array", [typeAstToPhaseB(ast.element, loc)], loc);
    case "nullable":
      return createTypeList("t:nullable", [typeAstToPhaseB(ast.inner, loc)], loc);
    case "tuple":
      return createTypeList(
        "t:tuple",
        ast.elements.map((element) => typeAstToPhaseB(element, loc)),
        loc
      );
    case "union":
      return createTypeList(
        "t:union",
        ast.options.map((option) => typeAstToPhaseB(option, loc)),
        loc
      );
    case "intersection":
      return createTypeList(
        "t:intersection",
        ast.options.map((option) => typeAstToPhaseB(option, loc)),
        loc
      );
    case "apply":
      return createTypeList(
        "t:apply",
        [typeAstToPhaseB(ast.base, loc), ...ast.args.map((arg) => typeAstToPhaseB(arg, loc))],
        loc
      );
    case "keyof":
      return createTypeList("t:keyof", [typeAstToPhaseB(ast.target, loc)], loc);
    case "typeof":
      return createTypeList("t:typeof", [createPhaseBSymbol(ast.expr, loc)], loc);
    case "indexed":
      return createTypeList(
        "t:indexed",
        [typeAstToPhaseB(ast.object, loc), typeAstToPhaseB(ast.index, loc)],
        loc
      );
    case "conditional":
      return createTypeList(
        "t:conditional",
        [
          typeAstToPhaseB(ast.check, loc),
          typeAstToPhaseB(ast.extends, loc),
          typeAstToPhaseB(ast.trueType, loc),
          typeAstToPhaseB(ast.falseType, loc),
        ],
        loc
      );
    case "infer":
      return createTypeList("t:infer", [createPhaseBSymbol(ast.name, loc)], loc);
    case "literal":
      return createTypeList("t:literal", [createLiteralNode(ast.value, loc)], loc);
  }
}

function createTypeList(name: string, args: PhaseBNode[], loc: SourceLoc): PhaseBListNode {
  return createPhaseBList([createPhaseBSymbol(name, loc), ...args], loc);
}

function createPhaseBSymbol(name: string, loc: SourceLoc): PhaseBNode {
  return {
    kind: "symbol",
    name,
    loc,
    phaseKind: "symbol",
  };
}

function createLiteralNode(value: string | number | boolean, loc: SourceLoc): PhaseBNode {
  return {
    kind: "literal",
    value,
    loc,
    phaseKind: "literal",
  };
}

function createStringLiteral(value: string, loc: SourceLoc): PhaseBNode {
  return createLiteralNode(value, loc);
}

function createPhaseBList(elements: PhaseBNode[], loc: SourceLoc): PhaseBListNode {
  return {
    kind: "list",
    phaseKind: "list",
    elements,
    loc,
  };
}
