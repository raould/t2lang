import type {
  PhaseBListNode,
  PhaseBNode,
  PhaseBNodeBase,
  PhaseBTypeAnnotation,
  PhaseBDottedIdentifier,
  SymbolNode,
  LiteralNode,
  ListDelimiter,
} from "./reader.js";
type PhaseBSymbolNode = SymbolNode & PhaseBNodeBase & { phaseKind: "symbol" };
type PhaseBLiteralNode = LiteralNode & PhaseBNodeBase & { phaseKind: "literal"; value: string };
import type { SourceLoc } from "./location.js";
import { gensym } from "./gensym.js";
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
  if (node.delimiter === "[") {
    return rewriteList(createArrayLiteral(node));
  }

  const optionalCallRewritten = rewriteOptionalCall(node);
  if (optionalCallRewritten) {
    return rewriteNode(optionalCallRewritten);
  }

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
  if (head && isSymbol(head, "object")) {
    elements = rewriteObjectFields(elements);
  }

  const rewrittenElements = elements.map(rewriteNode);
  const rewrittenList: PhaseBListNode = { ...node, elements: rewrittenElements };
  const infixRewritten = rewriteInfixExpression(rewrittenList);
  const baseList = infixRewritten ?? rewrittenList;
  if (baseList.phaseKind !== "list") {
    return baseList;
  }
  const listNode = baseList as PhaseBListNode;
  const optionalPropRewritten = rewriteOptionalProperty(listNode);
  return optionalPropRewritten ?? listNode;
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

function createArrayLiteral(node: PhaseBListNode): PhaseBListNode {
  const arraySymbol = createPhaseBSymbol("array", node.loc);
  return createPhaseBList([arraySymbol, ...node.elements], node.loc);
}

function rewriteObjectFields(elements: PhaseBNode[]): PhaseBNode[] {
  const head = elements[0];
  if (!head || !isSymbol(head, "object")) {
    return elements;
  }
  const rewritten: PhaseBNode[] = [head];
  let idx = 1;
  while (idx < elements.length) {
    const entry = elements[idx];
    if (entry.phaseKind === "symbol") {
      rewritten.push(createShorthandObjectField(entry as PhaseBSymbolNode));
      idx += 1;
      continue;
    }
    if (isStringLiteral(entry) && idx + 1 < elements.length) {
      const value = elements[idx + 1];
      rewritten.push(createStringKeyField(entry as PhaseBLiteralNode, value));
      idx += 2;
      continue;
    }
    rewritten.push(entry);
    idx += 1;
  }
  return rewritten;
}

function createShorthandObjectField(symbol: PhaseBSymbolNode): PhaseBListNode {
  const keyLiteral = createStringLiteral(symbol.name, symbol.loc);
  const loc = mergeLocs(keyLiteral.loc, symbol.loc);
  return createPhaseBList([keyLiteral, symbol], loc);
}

function createStringKeyField(key: PhaseBLiteralNode, value: PhaseBNode): PhaseBListNode {
  const loc = mergeLocs(key.loc, value.loc);
  return createPhaseBList([key, value], loc);
}

function isStringLiteral(node: PhaseBNode): node is PhaseBLiteralNode {
  return node.phaseKind === "literal" && typeof (node as PhaseBNode & { value: unknown }).value === "string";
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

function createPhaseBSymbol(name: string, loc: SourceLoc): PhaseBSymbolNode {
  return {
    kind: "symbol",
    name,
    loc,
    phaseKind: "symbol",
  };
}

function createLiteralNode(value: string | number | boolean | null, loc: SourceLoc): PhaseBNode {
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

interface PropertySegment {
  name: string;
  optional: boolean;
  loc: SourceLoc;
}

function rewriteOptionalCall(node: PhaseBListNode): PhaseBNode | null {
  const head = node.elements[0];
  if (!head || !isSymbol(head, "call")) {
    return null;
  }
  const [, callee, ...args] = node.elements;
  if (!callee) {
    return null;
  }

  const chain = collectPropertyChain(callee);
  if (chain && chain.segments.length > 0) {
    const last = chain.segments[chain.segments.length - 1];
    if (last.optional) {
      const prefix = chain.segments.slice(0, -1);
      const objectExpr = buildPropertyChain(chain.base, prefix);
      return buildOptionalMethodCall(objectExpr, last.name, args, last.loc);
    }
  }

  if (isOptionalNode(callee)) {
    const cleaned = stripOptionalNode(callee);
    return buildOptionalDirectCall(cleaned, args, callee.loc);
  }

  return null;
}

function rewriteOptionalProperty(node: PhaseBListNode): PhaseBNode | null {
  const head = node.elements[0];
  if (!head || !isSymbol(head, "prop")) {
    return null;
  }
  const chain = collectPropertyChain(node);
  if (!chain) {
    return null;
  }
  if (chain.segments.every((segment) => !segment.optional)) {
    return null;
  }
  return buildPropertyChain(chain.base, chain.segments);
}

function collectPropertyChain(node: PhaseBNode): { base: PhaseBNode; segments: PropertySegment[] } | null {
  if (!isPropertyList(node)) {
    return { base: stripOptionalNode(node), segments: [] };
  }
  const [, target, property] = node.elements;
  const nested = collectPropertyChain(target);
  if (!nested) {
    return null;
  }
  const segment = buildPropertySegment(target, property);
  return { base: nested.base, segments: [...nested.segments, segment] };
}

function buildPropertySegment(target: PhaseBNode, property: PhaseBNode): PropertySegment {
  const { name, optional: propertyOptional } = stripOptionalLiteral(property);
  const optional = hasOptionalIndicator(target) || propertyOptional;
  const loc = mergeLocs(target.loc, property.loc);
  return { name, optional, loc };
}

function buildPropertyChain(base: PhaseBNode, segments: PropertySegment[]): PhaseBNode {
  return segments.reduce((expr, segment) => {
    if (segment.optional) {
      return createOptionalPropertyAccess(expr, segment.name, segment.loc);
    }
    return createProp(expr, segment.name, segment.loc);
  }, base);
}

function createOptionalPropertyAccess(objectExpr: PhaseBNode, propertyName: string, loc: SourceLoc): PhaseBNode {
  const tmpSymbol = createPhaseBSymbol(gensym("opt_tmp_"), loc);
  const binding = createPhaseBList([tmpSymbol, objectExpr], loc);
  const bindingList = createPhaseBList([binding], loc);
  const condition = createPhaseBList([
    createPhaseBSymbol("==", loc),
    tmpSymbol,
    createLiteralNode(null, loc),
  ], loc);
  const fallback = createPhaseBSymbol("undefined", loc);
  const success = createProp(tmpSymbol, propertyName, loc);
  const ifExpr = createPhaseBList([
    createPhaseBSymbol("if", loc),
    condition,
    fallback,
    success,
  ], loc);
  return createPhaseBList([
    createPhaseBSymbol("let*", loc),
    bindingList,
    ifExpr,
  ], loc);
}

function createProp(objectExpr: PhaseBNode, propertyName: string, loc: SourceLoc): PhaseBListNode {
  const propSymbol = createPhaseBSymbol("prop", loc);
  const literal = createStringLiteral(propertyName, loc);
  return createPhaseBList([propSymbol, objectExpr, literal], loc);
}

function buildOptionalMethodCall(objectExpr: PhaseBNode, propertyName: string, args: PhaseBNode[], loc: SourceLoc): PhaseBNode {
  const tmpSymbol = createPhaseBSymbol(gensym("opt_obj_"), loc);
  const binding = createPhaseBList([tmpSymbol, objectExpr], loc);
  const bindingList = createPhaseBList([binding], loc);
  const condition = createPhaseBList([
    createPhaseBSymbol("==", loc),
    tmpSymbol,
    createLiteralNode(null, loc),
  ], loc);
  const methodAccess = createProp(tmpSymbol, propertyName, loc);
  const callWithThis = createPhaseBList([
    createPhaseBSymbol("call-with-this", loc),
    methodAccess,
    tmpSymbol,
    ...args,
  ], loc);
  const ifExpr = createPhaseBList([
    createPhaseBSymbol("if", loc),
    condition,
    createPhaseBSymbol("undefined", loc),
    callWithThis,
  ], loc);
  return createPhaseBList([
    createPhaseBSymbol("let*", loc),
    bindingList,
    ifExpr,
  ], loc);
}

function buildOptionalDirectCall(callee: PhaseBNode, args: PhaseBNode[], loc: SourceLoc): PhaseBNode {
  const tmpSymbol = createPhaseBSymbol(gensym("opt_call_"), loc);
  const binding = createPhaseBList([tmpSymbol, callee], loc);
  const bindingList = createPhaseBList([binding], loc);
  const condition = createPhaseBList([
    createPhaseBSymbol("==", loc),
    tmpSymbol,
    createLiteralNode(null, loc),
  ], loc);
  const callExpr = createPhaseBList([createPhaseBSymbol("call", loc), tmpSymbol, ...args], loc);
  const ifExpr = createPhaseBList([
    createPhaseBSymbol("if", loc),
    condition,
    createPhaseBSymbol("undefined", loc),
    callExpr,
  ], loc);
  return createPhaseBList([
    createPhaseBSymbol("let*", loc),
    bindingList,
    ifExpr,
  ], loc);
}

function stripOptionalNode(node: PhaseBNode): PhaseBNode {
  if (node.phaseKind === "symbol") {
    const symbol = node as SymbolNode;
    if (symbol.name.endsWith("?")) {
      return createPhaseBSymbol(symbol.name.slice(0, -1), symbol.loc);
    }
  }
  if (node.phaseKind === "literal") {
    const literal = node as LiteralNode;
    if (typeof literal.value === "string" && literal.value.endsWith("?")) {
      return createLiteralNode(literal.value.slice(0, -1), literal.loc);
    }
  }
  if (node.phaseKind === "dotted") {
    const dotted = node as PhaseBDottedIdentifier;
    const parts = [...dotted.parts];
    const last = parts[parts.length - 1];
    if (last?.endsWith("?")) {
      parts[parts.length - 1] = last.slice(0, -1);
    }
    return { ...dotted, parts };
  }
  return node;
}

function hasOptionalIndicator(node: PhaseBNode): boolean {
  if (node.phaseKind === "symbol") {
    return (node as SymbolNode).name.endsWith("?");
  }
  if (node.phaseKind === "literal") {
    const literal = node as LiteralNode;
    return typeof literal.value === "string" && literal.value.endsWith("?");
  }
  if (node.phaseKind === "dotted") {
    const dotted = node as PhaseBDottedIdentifier;
    const last = dotted.parts[dotted.parts.length - 1];
    return last?.endsWith("?") ?? false;
  }
  return false;
}

function stripOptionalLiteral(node: PhaseBNode): { name: string; optional: boolean } {
  if (node.phaseKind === "literal") {
    const literal = node as LiteralNode;
    if (typeof literal.value === "string" && literal.value.endsWith("?")) {
      return { name: literal.value.slice(0, -1), optional: true };
    }
    if (typeof literal.value === "string") {
      return { name: literal.value, optional: false };
    }
  }
  const serialized = serializePhaseBNode(node);
  return { name: serialized ?? "", optional: false };
}

function isOptionalNode(node: PhaseBNode): boolean {
  return hasOptionalIndicator(node);
}

function isPropertyList(node: PhaseBNode): node is PhaseBListNode {
  if (node.phaseKind !== "list") {
    return false;
  }
  const list = node as PhaseBListNode;
  const head = list.elements[0];
  return Boolean(head && head.phaseKind === "symbol" && (head as SymbolNode).name === "prop");
}

function createPhaseBList(elements: PhaseBNode[], loc: SourceLoc, delimiter: ListDelimiter = "("): PhaseBListNode {
  return {
    kind: "list",
    phaseKind: "list",
    elements,
    loc,
    delimiter,
  };
}

const INFIX_OPERATOR_TABLE: Record<
  string,
  { precedence: number; associativity: "left" | "right" }
> = {
  "**": { precedence: 13, associativity: "right" },
  "*": { precedence: 12, associativity: "left" },
  "/": { precedence: 12, associativity: "left" },
  "%": { precedence: 12, associativity: "left" },
  "+": { precedence: 11, associativity: "left" },
  "-": { precedence: 11, associativity: "left" },
  "<<": { precedence: 10, associativity: "left" },
  ">>": { precedence: 10, associativity: "left" },
  ">>>": { precedence: 10, associativity: "left" },
  "<": { precedence: 9, associativity: "left" },
  "<=": { precedence: 9, associativity: "left" },
  ">": { precedence: 9, associativity: "left" },
  ">=": { precedence: 9, associativity: "left" },
  "in": { precedence: 9, associativity: "left" },
  "instanceof": { precedence: 9, associativity: "left" },
  "==": { precedence: 8, associativity: "left" },
  "!=": { precedence: 8, associativity: "left" },
  "===": { precedence: 8, associativity: "left" },
  "!==": { precedence: 8, associativity: "left" },
  "&": { precedence: 7, associativity: "left" },
  "^": { precedence: 6, associativity: "left" },
  "|": { precedence: 5, associativity: "left" },
  "&&": { precedence: 4, associativity: "left" },
  "||": { precedence: 3, associativity: "left" },
  "??": { precedence: 3, associativity: "left" },
};

interface InfixOperatorDescriptor {
  operator: PhaseBSymbolNode;
  precedence: number;
  associativity: "left" | "right";
}

function rewriteInfixExpression(node: PhaseBListNode): PhaseBNode | null {
  const tokenized = extractInfixTokens(node);
  if (!tokenized) {
    return null;
  }
  const expression = buildInfixExpression(tokenized.operands, tokenized.operators);
  if (expression.phaseKind === "list") {
    const rewritten = expression as PhaseBListNode;
    rewritten.loc = node.loc;
    rewritten.expansionStack = node.expansionStack;
    return rewritten;
  }
  return expression;
}

function extractInfixTokens(node: PhaseBListNode): { operands: PhaseBNode[]; operators: InfixOperatorDescriptor[] } | null {
  if (node.elements.length < 3) {
    return null;
  }
  const operands: PhaseBNode[] = [];
  const operators: InfixOperatorDescriptor[] = [];
  let expectOperand = true;
  for (const element of node.elements) {
    if (expectOperand) {
      operands.push(element);
      expectOperand = false;
      continue;
    }
    const operator = getOperatorInfo(element);
    if (!operator) {
      return null;
    }
    operators.push(operator);
    expectOperand = true;
  }
  if (expectOperand || operators.length === 0) {
    return null;
  }
  return { operands, operators };
}

function buildInfixExpression(operands: PhaseBNode[], operators: InfixOperatorDescriptor[]): PhaseBNode {
  const operandStack: PhaseBNode[] = [operands[0]];
  const operatorStack: InfixOperatorDescriptor[] = [];
  for (let index = 0; index < operators.length; index += 1) {
    const nextOperator = operators[index];
    while (operatorStack.length > 0 && shouldReduce(operatorStack[operatorStack.length - 1], nextOperator)) {
      reduceExpression(operatorStack, operandStack);
    }
    operatorStack.push(nextOperator);
    operandStack.push(operands[index + 1]);
  }
  while (operatorStack.length > 0) {
    reduceExpression(operatorStack, operandStack);
  }
  return operandStack[0];
}

function shouldReduce(top: InfixOperatorDescriptor, next: InfixOperatorDescriptor): boolean {
  if (top.precedence > next.precedence) {
    return true;
  }
  if (top.precedence < next.precedence) {
    return false;
  }
  return next.associativity === "left";
}

function reduceExpression(operatorStack: InfixOperatorDescriptor[], operandStack: PhaseBNode[]): void {
  const operator = operatorStack.pop();
  const right = operandStack.pop();
  const left = operandStack.pop();
  if (!operator || !left || !right) {
    return;
  }
  operandStack.push(createInfixCall(operator, left, right));
}

function createInfixCall(operator: InfixOperatorDescriptor, left: PhaseBNode, right: PhaseBNode): PhaseBListNode {
  const loc = mergeNodeLocs(left, operator.operator, right);
  const callHead = createPhaseBSymbol("call", loc);
  const callNode = createPhaseBList([callHead, operator.operator, left, right], loc);
  callNode.expansionStack = operator.operator.expansionStack ?? left.expansionStack ?? right.expansionStack;
  return callNode;
}

function mergeNodeLocs(...nodes: PhaseBNode[]): SourceLoc {
  if (nodes.length === 0) {
    return { file: "<unknown>", line: 0, column: 0, endLine: 0, endColumn: 0 };
  }
  return nodes.slice(1).reduce((acc, node) => mergeLocs(acc, node.loc), nodes[0].loc);
}

function getOperatorInfo(node: PhaseBNode): InfixOperatorDescriptor | null {
  if (node.phaseKind !== "symbol") {
    return null;
  }
  const symbol = node as SymbolNode;
  const entry = INFIX_OPERATOR_TABLE[symbol.name];
  if (!entry) {
    return null;
  }
  const phaseSymbol = createPhaseBSymbol(symbol.name, symbol.loc);
  phaseSymbol.expansionStack = symbol.expansionStack;
  return { operator: phaseSymbol, precedence: entry.precedence, associativity: entry.associativity };
}
