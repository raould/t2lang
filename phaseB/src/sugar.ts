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
import { reportError } from "../../common/dist/errorRegistry.js";

const NON_CALL_FORMS = new Set([
  "program",
  "fn",
  "lambda",
  "method",
  "getter",
  "setter",
  "let",
  "let*",
  "const",
  "const*",
  "type",
  "if",
  "when",
  "for",
  "while",
  "switch",
  "try",
  "throw",
  "return",
  "class",
  "type-assert",
  "type-app",
  "type-alias",
  "interface",
  "enum",
  "namespace",
  "import",
  "export",
  "await",
  "yield",
  "yield*",
  "break",
  "continue",
  "object",
  "array",
  "prop",
  "index",
  "new",
  "assign",
  "ternary",
  "defmacro",
  "macro",
  "quote",
  "quasiquote",
  "unquote",
  "unquote-splicing",
  "infix",
  "computed",
]);

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
  if (node.delimiter === "{") {
    const head = node.elements[0];
    if (!head || head.phaseKind !== "symbol" || (head as SymbolNode).name !== "object") {
      return rewriteList(createObjectLiteral(node));
    }
  }

  const templateRewrite = rewriteTemplateWith(node);
  if (templateRewrite) {
    return rewriteNode(templateRewrite);
  }

  const typeDeclarationRewrite = rewriteTypeDeclaration(node);
  if (typeDeclarationRewrite) {
    return rewriteNode(typeDeclarationRewrite);
  }

  validateNoKeywordArgs(node);

  const functionTypeParamsRewrite = rewriteFunctionTypeParams(node);
  if (functionTypeParamsRewrite) {
    return rewriteNode(functionTypeParamsRewrite);
  }

  const booleanAliasRewrite = rewriteBooleanAliases(node);
  if (booleanAliasRewrite) {
    return rewriteNode(booleanAliasRewrite);
  }

  const mutationRewrite = rewriteMutationConvention(node);
  if (mutationRewrite) {
    return rewriteNode(mutationRewrite);
  }

  const computedAccess = rewriteComputedAccess(node);
  if (computedAccess) {
    return rewriteNode(computedAccess);
  }

  const optionalCallRewritten = rewriteOptionalCall(node);
  if (optionalCallRewritten) {
    return rewriteNode(optionalCallRewritten);
  }

  let elements = node.elements;
  const head = elements[0];
  if (head && isCallableHead(head)) {
    const signatureIndex = findSignatureListIndex(elements, 1);
    if (signatureIndex >= 0) {
      elements = [...elements];
      elements[signatureIndex] = rewriteFunctionParams(elements[signatureIndex] as PhaseBListNode);
      elements = rewriteFunctionReturnType(elements, signatureIndex);
    }
  }
  if (head && isLetForm(head) && elements[1]?.phaseKind === "list") {
    elements = [...elements];
    elements[1] = rewriteLetBindings(elements[1] as PhaseBListNode);
  }
  if (head && isSymbol(head, "object")) {
    elements = rewriteObjectFields(elements, node.delimiter === "{");
    const objectNode: PhaseBListNode = { ...node, elements };
    const optionalRewrite = rewriteOptionalObject(objectNode);
    if (optionalRewrite) {
      return rewriteNode(optionalRewrite);
    }
  }

  const infixRewritten = rewriteInfixForm(node);
  if (infixRewritten) {
    return rewriteNode(infixRewritten);
  }

  const rewrittenElements = elements.map(rewriteNode);
  const rewrittenList: PhaseBListNode = { ...node, elements: rewrittenElements };
  const baseList = rewrittenList;
  if (baseList.phaseKind !== "list") {
    return baseList;
  }
  const listNode = baseList as PhaseBListNode;
  const optionalPropRewritten = rewriteOptionalProperty(listNode);
  return optionalPropRewritten ?? listNode;
}

const TEMPLATE_PLACEHOLDER = /^[A-Za-z_][A-Za-z0-9_-]*$/;

function rewriteTemplateWith(node: PhaseBListNode): PhaseBNode | null {
  const head = node.elements[0];
  if (!head || !isSymbol(head, "template-with")) {
    return null;
  }
  const templateNode = node.elements[1];
  if (!templateNode || !isStringLiteral(templateNode)) {
    throw reportError("T2:0313");
  }
  const templateText = (templateNode as PhaseBLiteralNode).value;
  const keySymbols = new Map<string, PhaseBSymbolNode>();
  const params: PhaseBNode[] = [];
  const args: PhaseBNode[] = [];

  for (const pair of node.elements.slice(2)) {
    if (pair.phaseKind !== "list") {
      throw reportError("T2:0314");
    }
    const pairList = pair as PhaseBListNode;
    if (pairList.elements.length !== 2) {
      throw reportError("T2:0314");
    }
    const keyName = extractTemplateKey(pairList.elements[0]);
    if (!keyName) {
      throw reportError("T2:0314");
    }
    if (keySymbols.has(keyName)) {
      throw reportError("T2:0319", { key: keyName });
    }
    const valueNode = pairList.elements[1];
    if (!isLiteralNode(valueNode)) {
      throw reportError("T2:0315");
    }
    const paramSymbol = createPhaseBSymbol(gensym("tmpl_"), pairList.loc);
    keySymbols.set(keyName, paramSymbol);
    params.push(wrapFunctionParam(paramSymbol));
    args.push(clonePhaseBNode(valueNode));
  }

  const parts = buildTemplateParts(templateText, templateNode.loc, keySymbols);
  const templateList = createPhaseBList([createPhaseBSymbol("template", node.loc), ...parts], node.loc);
  const returnList = createPhaseBList([createPhaseBSymbol("return", node.loc), templateList], node.loc);
  const signatureList = createPhaseBList(params, node.loc);
  const lambdaList = createPhaseBList([createPhaseBSymbol("lambda", node.loc), signatureList, returnList], node.loc);
  return createPhaseBList([createPhaseBSymbol("call", node.loc), lambdaList, ...args], node.loc);
}

function extractTemplateKey(node: PhaseBNode): string | null {
  if (node.phaseKind === "symbol") {
    return (node as SymbolNode).name;
  }
  if (node.phaseKind === "literal" && typeof (node as PhaseBLiteralNode).value === "string") {
    return (node as PhaseBLiteralNode).value;
  }
  return null;
}

function isLiteralNode(node: PhaseBNode): node is LiteralNode & PhaseBNodeBase & { phaseKind: "literal" } {
  return node.phaseKind === "literal";
}

function buildTemplateParts(
  template: string,
  loc: SourceLoc,
  keySymbols: Map<string, PhaseBSymbolNode>
): PhaseBNode[] {
  const parts: PhaseBNode[] = [];
  let cursor = 0;
  while (cursor < template.length) {
    const start = template.indexOf("${", cursor);
    if (start < 0) {
      const tail = template.slice(cursor);
      if (tail.length > 0) {
        parts.push(createStringLiteral(tail, loc));
      }
      break;
    }
    const prefix = template.slice(cursor, start);
    if (prefix.length > 0) {
      parts.push(createStringLiteral(prefix, loc));
    }
    const end = template.indexOf("}", start + 2);
    if (end < 0) {
      throw reportError("T2:0318");
    }
    const placeholder = template.slice(start + 2, end).trim();
    if (!TEMPLATE_PLACEHOLDER.test(placeholder)) {
      throw reportError("T2:0317", { placeholder });
    }
    const symbol = keySymbols.get(placeholder);
    if (!symbol) {
      throw reportError("T2:0316", { key: placeholder });
    }
    parts.push(clonePhaseBNode(symbol));
    cursor = end + 1;
  }
  return parts;
}

function validateNoKeywordArgs(node: PhaseBListNode): void {
  if (node.delimiter !== "(") {
    return;
  }
  const head = node.elements[0];
  if (!head || head.phaseKind !== "symbol") {
    return;
  }
  const headName = (head as SymbolNode).name;
  if (NON_CALL_FORMS.has(headName)) {
    if (headName === "call" || headName === "call-with-this") {
      // These are still calls, so validate their argument list.
    } else {
      return;
    }
  }
  const startIndex = headName === "call" ? 2 : headName === "call-with-this" ? 3 : 1;
  for (let i = startIndex; i < node.elements.length; i += 1) {
    const entry = node.elements[i];
    if (entry?.phaseKind === "symbol") {
      const symbolName = (entry as SymbolNode).name;
        if (symbolName !== ":" && symbolName.endsWith(":")) {
          throw reportError("T2:0203");
      }
    }
  }
}

function rewriteBooleanAliases(node: PhaseBListNode): PhaseBNode | null {
  const head = node.elements[0];
  if (!head || head.phaseKind !== "symbol") {
    return null;
  }
  const name = (head as SymbolNode).name;
  if (name !== "and" && name !== "or" && name !== "not") {
    return null;
  }
  const args = node.elements.slice(1).map(rewriteNode);
  if (name === "not") {
    if (args.length !== 1) {
      throw reportError("T2:0322");
    }
    const op = createPhaseBSymbol("!", node.loc);
    return createPhaseBList([createPhaseBSymbol("call", node.loc), op, args[0]], node.loc);
  }
  if (args.length === 0) {
    throw reportError("T2:0323", { operator: name });
  }
  const op = createPhaseBSymbol(name === "and" ? "&&" : "||", node.loc);
  return createPhaseBList([createPhaseBSymbol("call", node.loc), op, ...args], node.loc);
}

const MUTATION_CONVENTION_ALIASES: Record<string, string> = {
  "set-in": "__t2_setIn",
  "set-in!": "__t2_setInMut",
  "update-in": "__t2_updateIn",
  "update-in!": "__t2_updateInMut",
  "merge": "__t2_merge",
  "merge!": "__t2_mergeMut",
  "set": "__t2_set",
  "push": "__t2_push",
  "push!": "__t2_pushMut",
  "pop": "__t2_pop",
  "pop!": "__t2_popMut",
  "sort-by": "__t2_sortBy",
  "sort-by!": "__t2_sortByMut",
  "reverse": "__t2_reverse",
  "reverse!": "__t2_reverseMut",
  "delete": "__t2_delete",
  "delete!": "__t2_deleteMut",
};

function rewriteMutationConvention(node: PhaseBListNode): PhaseBNode | null {
  const head = node.elements[0];
  if (!head || head.phaseKind !== "symbol") {
    return null;
  }
  const headSymbol = head as SymbolNode;
  if (headSymbol.name === "call") {
    const callee = node.elements[1];
    if (!callee || callee.phaseKind !== "symbol") {
      return null;
    }
    const calleeSymbol = callee as SymbolNode;
    const mapped = MUTATION_CONVENTION_ALIASES[calleeSymbol.name];
    if (!mapped) {
      return null;
    }
    const nextElements = [...node.elements];
    nextElements[1] = createPhaseBSymbol(mapped, calleeSymbol.loc);
    return createPhaseBList(nextElements, node.loc);
  }
  const mapped = MUTATION_CONVENTION_ALIASES[headSymbol.name];
  if (!mapped) {
    return null;
  }
  const nextElements = [...node.elements];
  nextElements[0] = createPhaseBSymbol(mapped, headSymbol.loc);
  return createPhaseBList(nextElements, node.loc);
}

function rewriteFunctionParams(node: PhaseBListNode): PhaseBListNode {
  const elements: PhaseBNode[] = [];
  validateCommaSeparated(node.elements, "function parameter list");
  const paramNodes = node.elements;
  let idx = 0;
  while (idx < paramNodes.length) {
    const target = paramNodes[idx];
    if (isCommaNode(target)) {
      idx += 1;
      continue;
    }
    if (target.phaseKind === "symbol") {
      const split = splitTrailingColonSymbol(target as PhaseBSymbolNode);
      if (split) {
        const annotationStart = idx + 1;
        const { annotationNode, consumed } = collectParamAnnotationSegment(paramNodes, annotationStart);
        if (!annotationNode || consumed === 0) {
            throw reportError("T2:0232");
        }
        elements.push(wrapFunctionParam(createTypeAnnotationNode(split, createPhaseBSymbol(":", split.loc), annotationNode)));
        idx = annotationStart + consumed;
        continue;
      }
    }
    const colon = paramNodes[idx + 1];
    if (colon && isColon(colon)) {
      const annotationStart = idx + 2;
      const { annotationNode, consumed } = collectParamAnnotationSegment(paramNodes, annotationStart);
      if (annotationNode && consumed > 0) {
        elements.push(wrapFunctionParam(createTypeAnnotationNode(target, colon, annotationNode)));
        idx = annotationStart + consumed;
        continue;
      }
    }
    elements.push(wrapFunctionParam(target));
    idx += 1;
  }
  return { ...node, elements };
}

function rewriteFunctionReturnType(elements: PhaseBNode[], signatureIndex: number): PhaseBNode[] {
  for (let i = signatureIndex + 1; i < elements.length - 1; i += 1) {
    const entry = elements[i];
    if (entry.phaseKind === "symbol" && (entry as SymbolNode).name === ":") {
      const annotation = elements[i + 1];
      if (!annotation) {
        return elements;
      }
      const converted = convertTypeAnnotation(annotation);
      if (converted === annotation) {
        return elements;
      }
      const nextElements = [...elements];
      nextElements[i + 1] = converted;
      return nextElements;
    }
  }
  return elements;
}

function rewriteTypeDeclaration(node: PhaseBListNode): PhaseBNode | null {
  const head = node.elements[0];
  if (!head || !isSymbol(head, "type")) {
    return null;
  }
  if (node.elements.length < 3) {
    return node;
  }
  const nameNode = node.elements[1];
  const nameLiteral = toTypeAliasNameLiteral(nameNode);
  if (!nameLiteral) {
    throw reportError("T2:0268");
  }

  const parsed = parseAngleTypeParams(node.elements, 2, node.elements.length);
  const filtered: PhaseBNode[] = [];
  for (let i = 0; i < node.elements.length; i += 1) {
    if (parsed && i >= parsed.startIndex && i <= parsed.endIndex) {
      continue;
    }
    filtered.push(node.elements[i]);
  }
  if (filtered.length < 3) {
    return node;
  }
  filtered[0] = createPhaseBSymbol("type-alias", node.loc);
  filtered[1] = nameLiteral;

  const typeValueIndex = 2;
  const typeValue = filtered[typeValueIndex];
  if (typeValue) {
    filtered[typeValueIndex] = convertTypeAnnotation(typeValue);
  }

  if (parsed) {
    const startLoc = node.elements[parsed.startIndex].loc;
    const endLoc = node.elements[parsed.endIndex].loc;
    const listLoc = mergeLocs(startLoc, endLoc);
    const typeParamSymbols = parsed.names.map((name) => createPhaseBSymbol(name, listLoc));
    const typeParamList = createPhaseBList(typeParamSymbols, listLoc);
    const typeParamMarker = createPhaseBSymbol(":type-params", listLoc);
    filtered.splice(typeValueIndex + 1, 0, typeParamMarker, typeParamList);
  }

  return { ...node, elements: filtered };
}

function toTypeAliasNameLiteral(node: PhaseBNode): PhaseBNode | null {
  if (node.phaseKind === "symbol") {
    return createStringLiteral((node as SymbolNode).name, node.loc);
  }
  if (isStringLiteral(node)) {
    return node;
  }
  return null;
}

const TYPE_PARAM_NAME = /^[A-Za-z_][A-Za-z0-9_-]*$/;

function rewriteFunctionTypeParams(node: PhaseBListNode): PhaseBListNode | null {
  const head = node.elements[0];
  if (!head || !isCallableHead(head)) {
    return null;
  }
  if (node.elements.some((entry) => entry.phaseKind === "symbol" && (entry as SymbolNode).name === ":type-params")) {
    return null;
  }
  const signatureIndex = findSignatureListIndex(node.elements, 1);
  if (signatureIndex < 0) {
    return null;
  }
  const parsed = parseAngleTypeParams(node.elements, 1, signatureIndex);
  if (!parsed) {
    return null;
  }

  const { names, startIndex, endIndex } = parsed;
  const startLoc = node.elements[startIndex].loc;
  const endLoc = node.elements[endIndex].loc;
  const listLoc = mergeLocs(startLoc, endLoc);
  const typeParamSymbols = names.map((name) => createPhaseBSymbol(name, listLoc));
  const typeParamList = createPhaseBList(typeParamSymbols, listLoc);
  const typeParamMarker = createPhaseBSymbol(":type-params", listLoc);

  const filtered: PhaseBNode[] = [];
  for (let i = 0; i < node.elements.length; i += 1) {
    if (i < startIndex || i > endIndex) {
      filtered.push(node.elements[i]);
    }
  }
  const removedBeforeSignature = startIndex <= signatureIndex ? Math.min(signatureIndex, endIndex) - startIndex + 1 : 0;
  const signatureIndexAfter = signatureIndex - removedBeforeSignature;
  const insertAt = signatureIndexAfter + 1;
  filtered.splice(insertAt, 0, typeParamMarker, typeParamList);
  return { ...node, elements: filtered };
}

function parseAngleTypeParams(
  elements: PhaseBNode[],
  start: number,
  end: number
): { names: string[]; startIndex: number; endIndex: number } | null {
  let startIndex = -1;
  for (let i = start; i < end; i += 1) {
    const entry = elements[i];
    if (entry.phaseKind === "symbol" && containsAngleStart((entry as SymbolNode).name)) {
      startIndex = i;
      break;
    }
  }
  if (startIndex < 0) {
    return null;
  }
  const tokens: string[] = [];
  let endIndex = -1;
  for (let i = startIndex; i < end; i += 1) {
    const entry = elements[i];
    if (entry.phaseKind !== "symbol") {
      throw reportError("T2:0288");
    }
    const name = (entry as SymbolNode).name;
    tokens.push(name);
    if (name.includes(">") || name === ">") {
      endIndex = i;
      break;
    }
  }
  if (endIndex < 0) {
    throw reportError("T2:0288");
  }
  const joined = tokens.join(" ");
  const lt = joined.indexOf("<");
  const gt = joined.lastIndexOf(">");
  if (lt < 0 || gt <= lt) {
    throw reportError("T2:0288");
  }
  const content = joined.slice(lt + 1, gt).trim();
  if (!content) {
    throw reportError("T2:0288");
  }
  const names = content
    .split(",")
    .map((name) => name.trim())
    .filter((name) => name.length > 0);
  if (names.length === 0 || names.some((name) => !TYPE_PARAM_NAME.test(name))) {
    throw reportError("T2:0288");
  }
  return { names, startIndex, endIndex };
}

function containsAngleStart(token: string): boolean {
  return token.includes("<") || token.startsWith("<");
}

function findSignatureListIndex(elements: PhaseBNode[], start: number): number {
  for (let i = start; i < elements.length; i += 1) {
    const entry = elements[i];
    if (entry.phaseKind === "list") {
      return i;
    }
  }
  return -1;
}

function isCallableHead(node: PhaseBNode): node is SymbolNode & { phaseKind: "symbol" } {
  return (
    node.phaseKind === "symbol" &&
    ["fn", "lambda", "method", "getter", "setter"].includes((node as SymbolNode).name)
  );
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
  validateCommaSeparated(node.elements, "array literal");
  const elements = stripCommaNodes(node.elements);
  return createPhaseBList([arraySymbol, ...elements], node.loc);
}

function createObjectLiteral(node: PhaseBListNode): PhaseBListNode {
  const objectSymbol = createPhaseBSymbol("object", node.loc);
  validateObjectCommaUsage(node.elements);
  const elements = stripCommaNodes(node.elements);
  return createPhaseBList([objectSymbol, ...elements], node.loc, "{");
}

function rewriteComputedAccess(node: PhaseBListNode): PhaseBNode | null {
  if (node.elements.length !== 2) {
    return null;
  }
  const [head, propertyList] = node.elements;
  if (!head || head.phaseKind !== "symbol") {
    return null;
  }
  if (!propertyList || propertyList.phaseKind !== "list") {
    return null;
  }
  const propertyListNode = propertyList as PhaseBListNode;
  const propertyExpr = extractComputedPropertyExpr(propertyListNode);
  if (!propertyExpr) {
    return null;
  }
  const receiver = stripComputedReceiver(head as PhaseBSymbolNode);
  const loc = mergeLocs(receiver.loc, propertyExpr.loc);
  return createPhaseBList([
    createPhaseBSymbol("index", loc),
    receiver,
    propertyExpr,
  ], loc);
}

function extractComputedPropertyExpr(propertyList: PhaseBListNode): PhaseBNode | null {
  if (propertyList.delimiter === "[") {
    if (propertyList.elements.length !== 1) {
      return null;
    }
    return propertyList.elements[0];
  }
  if (propertyList.elements.length !== 2) {
    return null;
  }
  const propertyHead = propertyList.elements[0];
  if (!propertyHead || !isSymbol(propertyHead, "array")) {
    return null;
  }
  return propertyList.elements[1];
}

function stripComputedReceiver(symbol: PhaseBSymbolNode): PhaseBSymbolNode {
  if (!symbol.name.endsWith(".")) {
    return symbol;
  }
  const trimmed = symbol.name.slice(0, -1);
  const replaced = createPhaseBSymbol(trimmed, symbol.loc);
  replaced.expansionStack = symbol.expansionStack;
  return replaced;
}

function rewriteObjectFields(elements: PhaseBNode[], allowSymbolValues: boolean): PhaseBNode[] {
  validateObjectCommaUsage(elements.slice(1));
  elements = stripCommaNodes(elements);
  const head = elements[0];
  if (!head || !isSymbol(head, "object")) {
    return elements;
  }
  const rewritten: PhaseBNode[] = [head];
  let idx = 1;
  while (idx < elements.length) {
    const entry = elements[idx];
    const nextEntry = elements[idx + 1];
    if (entry.phaseKind === "list" && (entry as PhaseBListNode).delimiter === "[") {
      if (!nextEntry || isCommaNode(nextEntry)) {
        throw reportError("T2:0215");
      }
      const keyList = entry as PhaseBListNode;
      if (keyList.elements.length !== 1) {
        throw reportError("T2:0214");
      }
      const keyExpr = keyList.elements[0];
      rewritten.push(createComputedFieldNode(keyExpr, nextEntry, mergeLocs(entry.loc, nextEntry.loc)));
      idx += 2;
      continue;
    }
    if (entry.phaseKind === "symbol") {
      const split = splitTrailingColonSymbol(entry as PhaseBSymbolNode);
      if (split) {
        if (!nextEntry) {
            throw reportError("T2:0215");
        }
        rewritten.push(createStringKeyField(createLiteralNode(split.name, split.loc) as PhaseBLiteralNode, nextEntry));
        idx += 2;
        continue;
      }
    }
    if (isStringLiteral(entry) && nextEntry && isColon(nextEntry)) {
      const valueNode = elements[idx + 2];
      if (!valueNode) {
          throw reportError("T2:0215");
      }
      rewritten.push(createStringKeyField(entry as PhaseBLiteralNode, valueNode));
      idx += 3;
      continue;
    }
    if (isOptionalLiteralField(entry) && nextEntry) {
      rewritten.push(createOptionalFieldNode(entry as PhaseBLiteralNode, nextEntry));
      idx += 2;
      continue;
    }
    if (isOptionalSymbol(entry)) {
      if (nextEntry && !isCommaNode(nextEntry) && !isOptionalSymbol(nextEntry) && !isOptionalLiteralField(nextEntry)) {
        rewritten.push(createOptionalFieldNode(entry as PhaseBSymbolNode, nextEntry));
        idx += 2;
        continue;
      }
      rewritten.push(createOptionalFieldNode(entry as PhaseBSymbolNode));
      idx += 1;
      continue;
    }
      if (allowSymbolValues && entry.phaseKind === "symbol" && nextEntry && !isCommaNode(nextEntry)) {
        const nextIsOptional = isOptionalSymbol(nextEntry) || isOptionalLiteralField(nextEntry);
        const nextIsWhen = nextEntry.phaseKind === "list" && isSymbol((nextEntry as PhaseBListNode).elements[0], "when");
        const afterNext = elements[idx + 2];
        const afterAfterNext = elements[idx + 3];
        const afterNextIsWhen =
          afterNext?.phaseKind === "list" && isSymbol((afterNext as PhaseBListNode).elements[0], "when");
        const nextIsStringLiteral = isStringLiteral(nextEntry);
        const stringValueAllowed = !nextIsStringLiteral || !afterNext || afterNextIsWhen || Boolean(afterAfterNext);
        if (!nextIsOptional && !nextIsWhen && stringValueAllowed) {
          const keyLiteral = createLiteralNode((entry as PhaseBSymbolNode).name, entry.loc) as PhaseBLiteralNode;
          rewritten.push(createStringKeyField(keyLiteral, nextEntry));
          idx += 2;
          continue;
        }
      }
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

function isOptionalLiteralField(node: PhaseBNode): node is PhaseBLiteralNode {
  if (!isStringLiteral(node)) {
    return false;
  }
  return stripOptionalLiteral(node).optional;
}

function isOptionalSymbol(node: PhaseBNode): node is PhaseBSymbolNode {
  return node.phaseKind === "symbol" && hasOptionalIndicator(node);
}

function createOptionalFieldNode(node: PhaseBLiteralNode, value: PhaseBNode): PhaseBListNode;
function createOptionalFieldNode(node: PhaseBSymbolNode, value?: PhaseBNode): PhaseBListNode;
function createOptionalFieldNode(node: PhaseBLiteralNode | PhaseBSymbolNode, value?: PhaseBNode): PhaseBListNode {
  if (node.phaseKind === "literal") {
    const { name } = stripOptionalLiteral(node);
    if (!value) {
        throw reportError("T2:0222");
    }
    return buildOptionalFieldNode(name, value, mergeLocs(node.loc, value.loc));
  }
  const trimmed = stripOptionalNode(node);
  const keyName = nodeToString(trimmed) || "";
  if (trimmed.phaseKind === "symbol") {
    (trimmed as PhaseBSymbolNode).expansionStack = node.expansionStack;
  }
  const valueNode = value ?? trimmed;
  return buildOptionalFieldNode(keyName, valueNode, mergeLocs(node.loc, valueNode.loc));
}

function buildOptionalFieldNode(key: string, value: PhaseBNode, loc: SourceLoc): PhaseBListNode {
  const optionalSymbol = createPhaseBSymbol("optional-field", loc);
  const keyLiteral = createLiteralNode(key, loc);
  return createPhaseBList([optionalSymbol, keyLiteral, value], loc);
}

function createComputedFieldNode(key: PhaseBNode, value: PhaseBNode, loc: SourceLoc): PhaseBListNode {
  const computedSymbol = createPhaseBSymbol("computed", loc);
  return createPhaseBList([computedSymbol, key, value], loc);
}
function rewriteOptionalObject(node: PhaseBListNode): PhaseBNode | null {
  const head = node.elements[0];
  if (!head || !isSymbol(head, "object")) {
    return null;
  }
  const optionalEntries: PhaseBListNode[] = [];
  const conditionalEntries: PhaseBNode[] = [];
  const staticEntries: PhaseBNode[] = [];
  for (let idx = 1; idx < node.elements.length; idx += 1) {
    const entry = node.elements[idx];
    const conditional = buildConditionalKeyBlock(entry);
    if (conditional) {
      conditionalEntries.push(conditional);
      continue;
    }
    if (isOptionalFieldNode(entry)) {
      optionalEntries.push(entry as PhaseBListNode);
      continue;
    }
    staticEntries.push(entry);
  }
  if (optionalEntries.length === 0 && conditionalEntries.length === 0) {
    return null;
  }
  const objectSymbol = createPhaseBSymbol("object", head.loc);
  objectSymbol.expansionStack = head.expansionStack;
  const optionals = optionalEntries
    .map((entry) => buildOptionalFieldExpression(entry))
    .filter((expr): expr is PhaseBNode => Boolean(expr));
  const combinedEntries = [...staticEntries, ...optionals, ...conditionalEntries];
  return createPhaseBList([objectSymbol, ...combinedEntries], node.loc);
}

function buildConditionalKeyBlock(node: PhaseBNode): PhaseBNode | null {
  if (node.phaseKind !== "list") {
    return null;
  }
  const list = node as PhaseBListNode;
  const head = list.elements[0];
  if (!head || !isSymbol(head, "when")) {
    return null;
  }
  const condition = list.elements[1];
  const body = list.elements[2];
  if (!condition || !body) {
    return null;
  }
  const objectBody = normalizeObjectLiteral(body);
  if (!objectBody) {
    return null;
  }
  return createConditionalObjectGuard(condition, objectBody, list.loc);
}

function normalizeObjectLiteral(node: PhaseBNode): PhaseBListNode | null {
  if (node.phaseKind !== "list") {
    return null;
  }
  const list = node as PhaseBListNode;
  if (list.delimiter === "{") {
    return createObjectLiteral(list);
  }
  const head = list.elements[0];
  if (head && isSymbol(head, "object")) {
    return list;
  }
  return null;
}

function createConditionalObjectGuard(conditionNode: PhaseBNode, objectNode: PhaseBListNode, loc: SourceLoc): PhaseBNode {
  const condition = clonePhaseBNode(conditionNode);
  const objectExpr = clonePhaseBNode(objectNode);
  const guarded = createPhaseBList([
    createPhaseBSymbol("&&", loc),
    condition,
    objectExpr,
  ], loc);
  return createObjectSpreadField(guarded, loc);
}

function isOptionalFieldNode(node: PhaseBNode): node is PhaseBListNode {
  if (node.phaseKind !== "list") {
    return false;
  }
  const list = node as PhaseBListNode;
  const head = list.elements[0];
  if (!head || head.phaseKind !== "symbol") {
    return false;
  }
  return (head as SymbolNode).name === "optional-field";
}

function buildOptionalFieldExpression(node: PhaseBListNode): PhaseBNode | null {
  const info = extractOptionalFieldInfo(node);
  if (!info) {
    return null;
  }
  return createOptionalFieldSpread(info.key, info.value, node.loc);
}

function extractOptionalFieldInfo(node: PhaseBListNode): { key: string; value: PhaseBNode } | null {
  if (node.elements.length < 3) {
    return null;
  }
  const keyNode = node.elements[1];
  if (!isStringLiteral(keyNode)) {
    return null;
  }
  const literal = keyNode as PhaseBLiteralNode;
  const value = node.elements[2];
  return { key: literal.value, value };
}

function createOptionalFieldSpread(key: string, value: PhaseBNode, loc: SourceLoc): PhaseBNode {
  const condition = createPhaseBList([
    createPhaseBSymbol("!=", loc),
    clonePhaseBNode(value),
    createLiteralNode(null, loc),
  ], loc);
  const property = createPhaseBList([
    createPhaseBSymbol("object", loc),
    createPhaseBList([createLiteralNode(key, loc), clonePhaseBNode(value)], loc),
  ], loc);
  const guarded = createPhaseBList([
    createPhaseBSymbol("&&", loc),
    condition,
    property,
  ], loc);
  return createObjectSpreadField(guarded, loc);
}

function createObjectSpreadField(expr: PhaseBNode, loc: SourceLoc): PhaseBListNode {
  return createPhaseBList([
    createPhaseBSymbol("spread", loc),
    createPhaseBSymbol("object", loc),
    expr,
  ], loc);
}

function createShorthandObjectField(symbol: PhaseBSymbolNode): PhaseBListNode {
  const keySymbol = createPhaseBSymbol(symbol.name, symbol.loc);
  keySymbol.expansionStack = symbol.expansionStack;
  const loc = mergeLocs(keySymbol.loc, symbol.loc);
  return createPhaseBList([keySymbol, symbol], loc);
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
  optional: boolean;
  loc: SourceLoc;
  computed: boolean;
  name?: string;
  property?: PhaseBNode;
}

function rewriteOptionalCall(node: PhaseBListNode): PhaseBNode | null {
  const head = node.elements[0];
  if (!head) {
    return null;
  }

  if (head.phaseKind === "symbol" && hasOptionalIndicator(head)) {
    if (node.elements.length < 2) {
      return null;
    }
    const [, ...args] = node.elements;
    const cleanedHead = stripOptionalNode(head);
    return buildOptionalDirectCall(cleanedHead, args, head.loc);
  }

  if (!isSymbol(head, "call")) {
    return null;
  }
  const [, callee, ...args] = node.elements;
  if (!callee) {
    return null;
  }

  const chain = collectPropertyChain(callee);
  if (chain && chain.segments.length > 0) {
    const last = chain.segments[chain.segments.length - 1];
    if (!last.computed && last.optional && typeof last.name === "string") {
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
  if (!head || head.phaseKind !== "symbol") {
    return null;
  }
  const headName = (head as SymbolNode).name;
  if (headName !== "prop" && headName !== "index") {
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
  const head = (node.elements[0] as SymbolNode);
  const computed = head.name === "index";
  const segment = buildPropertySegment(target, property, computed);
  return { base: nested.base, segments: [...nested.segments, segment] };
}

function buildPropertySegment(target: PhaseBNode, property: PhaseBNode, computed: boolean): PropertySegment {
  const targetOptional = hasOptionalIndicator(target);
  const loc = property ? mergeLocs(target.loc, property.loc) : target.loc;
  if (computed) {
    const propertyOptional = property ? hasOptionalIndicator(property) : false;
    return {
      computed: true,
      property,
      optional: targetOptional || propertyOptional,
      loc,
    };
  }
  const { name, optional: propertyOptional } = property ? stripOptionalLiteral(property) : { name: "", optional: false };
  return {
    computed: false,
    name,
    optional: targetOptional || propertyOptional,
    loc,
  };
}

function buildPropertyChain(base: PhaseBNode, segments: PropertySegment[]): PhaseBNode {
  return segments.reduce((expr, segment) => {
    if (segment.computed) {
      if (!segment.property) {
        return expr;
      }
      if (segment.optional) {
        return createOptionalIndexAccess(expr, segment.property, segment.loc);
      }
      return createIndex(expr, segment.property, segment.loc);
    }
    if (segment.optional) {
      return createOptionalPropertyAccess(expr, segment.name ?? "", segment.loc);
    }
    return createProp(expr, segment.name ?? "", segment.loc);
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
  const propertySymbol = createPhaseBSymbol(propertyName, loc);
  return createPhaseBList([propSymbol, objectExpr, propertySymbol], loc);
}

function createIndex(objectExpr: PhaseBNode, propertyExpr: PhaseBNode, loc: SourceLoc): PhaseBListNode {
  const indexSymbol = createPhaseBSymbol("index", loc);
  return createPhaseBList([indexSymbol, objectExpr, propertyExpr], loc);
}

function createOptionalIndexAccess(objectExpr: PhaseBNode, propertyExpr: PhaseBNode, loc: SourceLoc): PhaseBNode {
  const tmpSymbol = createPhaseBSymbol(gensym("opt_tmp_"), loc);
  const binding = createPhaseBList([tmpSymbol, objectExpr], loc);
  const bindingList = createPhaseBList([binding], loc);
  const condition = createPhaseBList([
    createPhaseBSymbol("==", loc),
    tmpSymbol,
    createLiteralNode(null, loc),
  ], loc);
  const fallback = createPhaseBSymbol("undefined", loc);
  const success = createIndex(tmpSymbol, propertyExpr, loc);
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
    if (symbol.name === "??") {
      return node;
    }
    if (symbol.name.endsWith("?.")) {
      return createPhaseBSymbol(symbol.name.slice(0, -2), symbol.loc);
    }
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
    const symbolName = (node as SymbolNode).name;
    if (symbolName === "??") {
      return false;
    }
    return symbolName.endsWith("?") || symbolName.endsWith("?.");
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
  if (node.phaseKind === "list") {
    if (isPropertyList(node)) {
      const property = node.elements[2];
      if (property && hasOptionalIndicator(property)) {
        return true;
      }
    }
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
  if (node.phaseKind === "symbol") {
    const symbol = node as SymbolNode;
    if (symbol.name.endsWith("?.")) {
      return { name: symbol.name.slice(0, -2), optional: true };
    }
    if (symbol.name.endsWith("?")) {
      return { name: symbol.name.slice(0, -1), optional: true };
    }
    return { name: symbol.name, optional: false };
  }
  const serialized = serializePhaseBNode(node);
  return { name: serialized ?? "", optional: false };
}

function isOptionalNode(node: PhaseBNode): boolean {
  return hasOptionalIndicator(node);
}

function isCommaNode(node: PhaseBNode): boolean {
  return node.phaseKind === "symbol" && (node as SymbolNode).name === ",";
}

function stripCommaNodes(nodes: PhaseBNode[]): PhaseBNode[] {
  return nodes.filter((node) => !isCommaNode(node));
}

function splitTrailingColonSymbol(node: PhaseBSymbolNode): PhaseBSymbolNode | null {
  if (!node.name.endsWith(":")) {
    return null;
  }
  if (node.name.length <= 1) {
    return null;
  }
  return createPhaseBSymbol(node.name.slice(0, -1), node.loc);
}

function validateCommaSeparated(nodes: PhaseBNode[], context: string): void {
  if (!nodes.some(isCommaNode)) {
    return;
  }
  if (nodes.length === 0) {
    return;
  }
  if (isCommaNode(nodes[0])) {
    throw reportError("T2:0115", { context });
  }
  if (isCommaNode(nodes[nodes.length - 1])) {
    throw reportError("T2:0114", { context });
  }
  for (let i = 1; i < nodes.length; i += 1) {
    if (isCommaNode(nodes[i]) && isCommaNode(nodes[i - 1])) {
      throw reportError("T2:0113", { context });
    }
  }
}

function collectParamAnnotationSegment(
  elements: PhaseBNode[],
  startIdx: number
): { annotationNode: PhaseBNode | null; consumed: number } {
  if (startIdx >= elements.length) {
    return { annotationNode: null, consumed: 0 };
  }
  let end = elements.length;
  for (let i = startIdx; i < elements.length; i += 1) {
    if (isCommaNode(elements[i])) {
      end = i;
      break;
    }
  }
  const segment = elements.slice(startIdx, end);
  if (segment.length === 0) {
    return { annotationNode: null, consumed: 0 };
  }
  const { annotationNode } = collectAnnotationSegment(segment, 0);
  return { annotationNode, consumed: segment.length };
}

function validateObjectCommaUsage(elements: PhaseBNode[]): void {
  const hasComma = elements.some(isCommaNode);
  if (!hasComma) {
    return;
  }
  validateCommaSeparated(elements, "object literal");

  let idx = 0;
  while (idx < elements.length) {
    const entry = elements[idx];
    if (isCommaNode(entry)) {
      idx += 1;
      continue;
    }

    if (isStringLiteral(entry) || isOptionalLiteralField(entry)) {
      const valueNode = elements[idx + 1];
      if (!valueNode || isCommaNode(valueNode)) {
        throw reportError("T2:0216");
      }
      idx += 2;
      continue;
    }

    if (isOptionalSymbol(entry)) {
      const nextNode = elements[idx + 1];
      if (!nextNode || isCommaNode(nextNode)) {
        if (nextNode && isCommaNode(nextNode)) {
          const nextNonComma = elements.slice(idx + 2).find((node) => !isCommaNode(node));
          if (nextNonComma) {
            throw reportError("T2:0221");
          }
        }
        idx += 1;
        continue;
      }
      idx += 2;
      continue;
    }

    idx += 1;
  }
}

function isPropertyList(node: PhaseBNode): node is PhaseBListNode {
  if (node.phaseKind !== "list") {
    return false;
  }
  const list = node as PhaseBListNode;
  const head = list.elements[0];
  if (!head || head.phaseKind !== "symbol") {
    return false;
  }
  const name = (head as SymbolNode).name;
  return name === "prop" || name === "index";
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

function wrapFunctionParam(node: PhaseBNode): PhaseBNode {
  if (node.phaseKind === "list") {
    return node;
  }
  return createPhaseBList([node], node.loc);
}

function clonePhaseBNode(node: PhaseBNode): PhaseBNode {
  switch (node.phaseKind) {
    case "symbol": {
      const symbol = node as PhaseBSymbolNode;
      return { ...symbol };
    }
    case "literal": {
      const literal = node as PhaseBLiteralNode;
      return { ...literal };
    }
    case "dotted": {
      const dotted = node as PhaseBDottedIdentifier;
      return { ...dotted, parts: [...dotted.parts] };
    }
    case "list": {
      const list = node as PhaseBListNode;
      return { ...list, elements: list.elements.map((child) => clonePhaseBNode(child)) };
    }
    case "type-annotation": {
      const annotation = node as PhaseBTypeAnnotation;
      return {
        ...annotation,
        elements: annotation.elements.map((child) => clonePhaseBNode(child)),
        target: clonePhaseBNode(annotation.target),
        annotation: clonePhaseBNode(annotation.annotation),
      };
    }
    default:
      throw reportError("T2:0305", {
        kind: (node as PhaseBNodeBase).phaseKind,
      });
  }
}

function nodeToString(node: PhaseBNode): string | undefined {
  if (node.phaseKind === "literal") {
    const literal = node as PhaseBLiteralNode;
    if (typeof literal.value === "string") {
      return literal.value;
    }
    return undefined;
  }
  if (node.phaseKind === "symbol") {
    return (node as PhaseBSymbolNode).name;
  }
  if (node.phaseKind === "dotted") {
    const dotted = node as PhaseBDottedIdentifier;
    return dotted.parts.join(".");
  }
  return undefined;
}

export const INFIX_OPERATOR_TABLE: Record<
  string,
  { precedence: number; associativity: "left" | "right" }
> = {
  ",": { precedence: 1, associativity: "left" },
  "**": { precedence: 16, associativity: "right" },
  "*": { precedence: 15, associativity: "left" },
  "/": { precedence: 15, associativity: "left" },
  "%": { precedence: 15, associativity: "left" },
  "+": { precedence: 14, associativity: "left" },
  "-": { precedence: 14, associativity: "left" },
  "<<": { precedence: 13, associativity: "left" },
  ">>": { precedence: 13, associativity: "left" },
  ">>>": { precedence: 13, associativity: "left" },
  "<": { precedence: 12, associativity: "left" },
  "<=": { precedence: 12, associativity: "left" },
  ">": { precedence: 12, associativity: "left" },
  ">=": { precedence: 12, associativity: "left" },
  "in": { precedence: 12, associativity: "left" },
  "instanceof": { precedence: 12, associativity: "left" },
  "==": { precedence: 11, associativity: "left" },
  "!=": { precedence: 11, associativity: "left" },
  "===": { precedence: 11, associativity: "left" },
  "!==": { precedence: 11, associativity: "left" },
  "?=": { precedence: 11, associativity: "left" },
  "?!=": { precedence: 11, associativity: "left" },
  "&": { precedence: 10, associativity: "left" },
  "^": { precedence: 9, associativity: "left" },
  "|": { precedence: 8, associativity: "left" },
  "&&": { precedence: 7, associativity: "left" },
  "||": { precedence: 6, associativity: "left" },
  "??": { precedence: 5, associativity: "left" },
};

interface InfixOperatorDescriptor {
  operator: PhaseBSymbolNode;
  precedence: number;
  associativity: "left" | "right";
}

const RUNTIME_ISEQUAL_NAME = "__t2_isEqual";

function rewriteInfixForm(node: PhaseBListNode): PhaseBNode | null {
  const head = node.elements[0];
  if (!head || !isSymbol(head, "infix")) {
    return null;
  }
  if (node.elements.length !== 2) {
    throw reportError("T2:0320");
  }
  const inner = node.elements[1];
  if (!inner || inner.phaseKind !== "list") {
    throw reportError("T2:0320");
  }
  const innerList = inner as PhaseBListNode;
  const rewrittenInner: PhaseBListNode = { ...innerList, elements: innerList.elements.map(rewriteNode) };
  const tokenized = extractInfixTokens(rewrittenInner);
  if (!tokenized) {
    throw reportError("T2:0321");
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
  const operatorName = operator.operator.name;
  if (operatorName === "?=") {
    return createIsEqualCall(left, right, loc, operator.operator);
  }
  if (operatorName === "?!=") {
    const isEqualCall = createIsEqualCall(left, right, loc, operator.operator);
    const notSymbol = createPhaseBSymbol("!", loc);
    notSymbol.expansionStack = operator.operator.expansionStack;
    return createPhaseBList([createPhaseBSymbol("call", loc), notSymbol, isEqualCall], loc);
  }
  const callHead = createPhaseBSymbol("call", loc);
  const callNode = createPhaseBList([callHead, operator.operator, left, right], loc);
  callNode.expansionStack = operator.operator.expansionStack ?? left.expansionStack ?? right.expansionStack;
  return callNode;
}

function createIsEqualCall(
  left: PhaseBNode,
  right: PhaseBNode,
  loc: SourceLoc,
  operatorNode: PhaseBSymbolNode
): PhaseBListNode {
  const isEqualSymbol = createPhaseBSymbol(RUNTIME_ISEQUAL_NAME, loc);
  isEqualSymbol.expansionStack = operatorNode.expansionStack;
  const callNode = createPhaseBList([
    createPhaseBSymbol("call", loc),
    isEqualSymbol,
    left,
    right,
  ], loc);
  callNode.expansionStack = operatorNode.expansionStack ?? left.expansionStack ?? right.expansionStack;
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
