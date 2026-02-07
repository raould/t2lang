import type {
  PhaseBListNode,
  PhaseBNode,
  PhaseBTypeAnnotation,
  PhaseBDottedIdentifier,
  SymbolNode,
  LiteralNode,
} from "./reader.js";
import type { SourceLoc } from "./location.js";
import { reportError } from "../../common/dist/errorRegistry.js";
import {
  Program,
  ExprStmt,
  BlockStmt,
  AssignExpr,
  CallExpr,
  CallWithThisExpr,
  IndexExpr,
  NewExpr,
  PropExpr,
  Identifier,
  Literal,
  LetStarExpr,
  ImportStmt,
  ArrayExpr,
  ForOf,
  ForAwait,
  ForClassic,
  FunctionExpr,
  ReturnExpr,
  ObjectExpr,
  TemplateExpr,
  ThrowExpr,
  TryCatchExpr,
  IfStmt,
  WhileStmt,
  SwitchStmt,
  BreakStmt,
  ContinueStmt,
  EnumStmt,
  NamespaceStmt,
  TypeAliasStmt,
  ArrayPattern,
  ObjectPattern,
  RestPattern,
  DefaultPattern,
  SpreadExpr,
  TernaryExpr,
  TypeAssertExpr,
  NonNullAssertExpr,
  AwaitExpr,
  YieldExpr,
  TypeVar,
  TypeParam,
  TypePrimitive,
  TypeRef,
  TypeArray,
  TypeTuple,
  TypeNullable,
  TypeUnion,
  TypeIntersection,
  TypeKeyof,
  TypeTypeof,
  TypeIndexed,
  TypeConditional,
  TypeInfer,
  TypeThis,
  TypeLiteral,
  TypeFunction,
  TypeObject,
  TypeTemplateLiteral,
  TypeMapped,
  TypeField,
  TypeApp,
  type Statement,
  type Expression,
  type Binding,
  type BindingTarget,
  type Span,
  type FnParam,
  type CallableKind,
  type TypeNode,
} from "../../phaseA/dist/phaseA1.js";

const LET_FORMS = new Set(["let", "let*", "const", "const*"]);
const RUNTIME_ISEQUAL_NAME = "__t2_isEqual";
const RUNTIME_RUNTIME_SOURCE = "t2lang-runtime";
const RUNTIME_HELPERS: Record<string, string> = {
  [RUNTIME_ISEQUAL_NAME]: "isEqual",
  __t2_setIn: "setIn",
  __t2_setInMut: "setInMut",
  __t2_updateIn: "updateIn",
  __t2_updateInMut: "updateInMut",
  __t2_merge: "merge",
  __t2_mergeMut: "mergeMut",
  __t2_set: "set",
  __t2_setMut: "setMut",
  __t2_push: "push",
  __t2_pushMut: "pushMut",
  __t2_pop: "pop",
  __t2_popMut: "popMut",
  __t2_sortBy: "sortBy",
  __t2_sortByMut: "sortByMut",
  __t2_reverse: "reverse",
  __t2_reverseMut: "reverseMut",
  __t2_delete: "deleteKey",
  __t2_deleteMut: "deleteKeyMut",
};

export function lowerPhaseB(nodes: PhaseBNode[]): Program {
  const bodyNodes = nodes.flatMap(unwrapProgramNode);
  const body = bodyNodes.map(lowerStatement);
  const span = nodes.length > 0 ? spanFromLoc(nodes[0].loc) : emptySpan();
  if (containsAwaitOutsideFunctions(body)) {
    throw reportError("T2:0324", nodes[0]?.loc);
  }
  const runtimeImports = collectRuntimeImports(bodyNodes);
  if (runtimeImports.length > 0) {
    const importSpan = bodyNodes.length > 0 ? spanFromLoc(bodyNodes[0].loc) : emptySpan();
    const source = new Literal({ value: RUNTIME_RUNTIME_SOURCE, span: importSpan });
    const named = runtimeImports.map(({ imported, local }) => ({ imported, local }));
    const importStmt = new ImportStmt({
      spec: { source, named },
      span: importSpan,
    });
    return new Program({ body: [importStmt, ...body], span });
  }
  return new Program({ body, span });
}

function collectRuntimeImports(nodes: PhaseBNode[]): Array<{ imported: string; local: Identifier }> {
  const needed: Array<{ imported: string; local: Identifier }> = [];
  const seen = new Set<string>();
  for (const [localName, imported] of Object.entries(RUNTIME_HELPERS)) {
    if (containsSymbol(nodes, localName)) {
      if (!seen.has(localName)) {
        seen.add(localName);
        const span = nodes.length > 0 ? spanFromLoc(nodes[0].loc) : emptySpan();
        needed.push({ imported, local: new Identifier({ name: localName, span }) });
      }
    }
  }
  return needed;
}

function containsSymbol(nodes: PhaseBNode[], target: string): boolean {
  for (const node of nodes) {
    if (node.phaseKind === "symbol" && (node as SymbolNode).name === target) {
      return true;
    }
    if (node.phaseKind === "list") {
      const list = node as PhaseBListNode;
      if (containsSymbol(list.elements, target)) {
        return true;
      }
    }
    if (node.phaseKind === "type-annotation") {
      const annotation = node as PhaseBTypeAnnotation;
      if (containsSymbol([annotation.target, annotation.annotation], target)) {
        return true;
      }
    }
  }
  return false;
}

function lowerStatement(node: PhaseBNode): Statement {
  if (node.phaseKind === "list") {
    const listNode = node as PhaseBListNode;
    const [head] = listNode.elements;
    if (head && head.phaseKind === "symbol") {
      const symbolHead = head as SymbolNode;
      if (LET_FORMS.has(symbolHead.name)) {
        return lowerLet(listNode, symbolHead.name);
      }
      if (symbolHead.name === "if") {
        return lowerIf(listNode);
      }
      if (symbolHead.name === "assign") {
        return lowerAssign(listNode);
      }
      if (symbolHead.name === "for") {
        return lowerFor(listNode);
      }
      if (symbolHead.name === "return") {
        return lowerReturn(listNode);
      }
      if (symbolHead.name === "type-alias") {
        return lowerTypeAlias(listNode);
      }
      if (
        symbolHead.name === "fn" ||
        symbolHead.name === "method" ||
        symbolHead.name === "lambda" ||
        symbolHead.name === "getter" ||
        symbolHead.name === "setter"
      ) {
        return lowerFunction(listNode, symbolHead.name as "fn" | "method" | "lambda" | "getter" | "setter");
      }
    }
    return new ExprStmt({ expr: lowerExpression(listNode), span: spanFromLoc(listNode.loc) });
  }
  return new ExprStmt({ expr: lowerExpression(node), span: spanFromLoc(node.loc) });
}

function lowerIf(node: PhaseBListNode): IfStmt {
  const span = spanFromLoc(node.loc);
  const testNode = node.elements[1];
  const consequentNode = node.elements[2];
  const alternateNode = node.elements[3];
  const test = testNode ? lowerExpression(testNode) : new Literal({ value: null, span });
  const consequent = consequentNode ? lowerStatement(consequentNode) : createNullInitStatement(node.loc);
  const alternate = alternateNode ? lowerStatement(alternateNode) : undefined;
  return new IfStmt({ test, consequent, alternate, span });
}

function unwrapProgramNode(node: PhaseBNode): PhaseBNode[] {
  if (node.phaseKind === "list") {
    const listNode = node as PhaseBListNode;
    const head = listNode.elements[0];
    if (head?.phaseKind === "symbol" && (head as SymbolNode).name === "program") {
      return listNode.elements.slice(1);
    }
  }
  return [node];
}

function lowerLet(node: PhaseBListNode, name: string): LetStarExpr {
  const [, bindingsNode, ...bodyNodes] = node.elements;
  if (!bindingsNode || bindingsNode.phaseKind !== "list") {
    return new LetStarExpr({
      isConst: name.startsWith("const"),
      bindings: [],
      body: bodyNodes.map(lowerStatement),
      span: spanFromLoc(node.loc),
    });
  }
  const bindingList = bindingsNode as PhaseBListNode;
  const bindings = bindingList.elements
    .filter((entry: PhaseBNode): entry is PhaseBListNode => entry.phaseKind === "list")
    .map(lowerBindingEntry);
  const body = bodyNodes.map(lowerStatement);
  return new LetStarExpr({ isConst: name.startsWith("const"), bindings, body, span: spanFromLoc(node.loc) });
}

function lowerBindingEntry(node: PhaseBListNode): Binding {
  const [targetNode, initNode] = node.elements;
  const target = lowerBindingTarget(targetNode);
  const binding: Binding = { target };
  if (initNode) {
    binding.init = lowerExpression(initNode);
  }
  return binding;
}

function lowerAssign(node: PhaseBListNode): AssignExpr {
  const [, targetNode, valueNode] = node.elements;
  const target = targetNode ? lowerExpression(targetNode) : new Identifier({ name: "<missing>", span: emptySpan() });
  const value = valueNode ? lowerExpression(valueNode) : new Literal({ value: null, span: emptySpan() });
  return new AssignExpr({ target, value, span: spanFromLoc(node.loc) });
}

function lowerTypeAlias(node: PhaseBListNode): TypeAliasStmt {
  const [, nameNode, ...rest] = node.elements;
  if (!nameNode) {
    throw reportError("T2:0268", node.loc);
  }
  const name = lowerTypeAliasName(nameNode);

  let typeParams: TypeParam[] | undefined;
  let typeValueNode: PhaseBNode | undefined;
  for (let i = 0; i < rest.length; i += 1) {
    const entry = rest[i];
    if (entry.phaseKind === "symbol" && (entry as SymbolNode).name === ":type-params") {
      typeParams = lowerTypeParams(rest[i + 1]);
      i += 1;
      continue;
    }
    if (typeValueNode) {
      throw reportError("T2:0267", entry.loc);
    }
    typeValueNode = entry;
  }
  if (!typeValueNode) {
    throw reportError("T2:0267", node.loc);
  }
  let typeValue = lowerTypeNode(typeValueNode);
  if (!typeValue) {
    throw reportError("T2:0267", typeValueNode.loc);
  }
  if (typeParams && typeParams.length > 0) {
    const typeParamNames = new Set(typeParams.map((param) => param.name.name));
    typeValue = replaceTypeParamsInTypeNode(typeValue, typeParamNames) as TypeNode;
  }
  return new TypeAliasStmt({ name, typeValue, span: spanFromLoc(node.loc), typeParams });
}

function lowerTypeAliasName(node: PhaseBNode): Identifier {
  if (node.phaseKind === "symbol") {
    return new Identifier({ name: (node as SymbolNode).name, span: spanFromLoc(node.loc) });
  }
  if (node.phaseKind === "literal") {
    const literal = node as LiteralNode;
    if (typeof literal.value === "string") {
      return new Identifier({ name: literal.value, span: spanFromLoc(node.loc) });
    }
  }
  throw reportError("T2:0268", node.loc);
}

function lowerReturn(node: PhaseBListNode): ReturnExpr {
  const [, valueNode] = node.elements;
  const value = valueNode ? lowerExpression(valueNode) : undefined;
  return new ReturnExpr({ span: spanFromLoc(node.loc), value });
}

function lowerFor(node: PhaseBListNode): Statement {
  const modeNode = node.elements[1];
  if (modeNode && modeNode.phaseKind === "symbol") {
    const mode = (modeNode as SymbolNode).name;
    if (mode === "classic") {
      return lowerForClassicCanonical(node);
    }
    if (mode === "of") {
      return lowerForOf(node);
    }
    if (mode === "await") {
      return lowerForAwait(node);
    }
    if (mode === "in") {
      return lowerForIn(node);
    }
  }
  return lowerForClassic(node);
}

function lowerForClassic(node: PhaseBListNode): ForClassic {
  const [, clausesNode] = node.elements;
  let init: Statement | undefined;
  let condition: Expression | undefined;
  let update: Expression | undefined;

  if (clausesNode && clausesNode.phaseKind === "list") {
    const clauses = clausesNode as PhaseBListNode;
    const [initClause, conditionClause, updateClause] = clauses.elements;
    if (initClause && !isPlaceholder(initClause)) {
      init = lowerStatement(initClause);
    }
    if (conditionClause && !isPlaceholder(conditionClause)) {
      condition = lowerExpression(conditionClause);
    }
    if (updateClause && !isPlaceholder(updateClause)) {
      update = lowerExpression(updateClause);
    }
  }

  const body = lowerLoopBody(node.elements.slice(2), spanFromLoc(node.loc));

  return new ForClassic({
    init,
    condition,
    update,
    body,
    span: spanFromLoc(node.loc),
  });
}

function lowerForClassicCanonical(node: PhaseBListNode): ForClassic {
  const span = spanFromLoc(node.loc);
  const args = node.elements.slice(2);
  const bodyNode = args[args.length - 1];
  const clauseNodes = args.slice(0, -1);
  let init: Statement | undefined;
  let condition: Expression | undefined;
  let update: Expression | undefined;
  if (clauseNodes.length > 0) {
    const [initClause, conditionClause, updateClause] = clauseNodes;
    if (initClause && !isPlaceholder(initClause)) {
      init = lowerStatement(initClause);
    }
    if (conditionClause && !isPlaceholder(conditionClause)) {
      condition = lowerExpression(conditionClause);
    }
    if (updateClause && !isPlaceholder(updateClause)) {
      update = lowerExpression(updateClause);
    }
  }
  const body = bodyNode ? lowerLoopBody([bodyNode], span) : new BlockStmt({ statements: [], span });
  return new ForClassic({ init, condition, update, body, span });
}

function lowerForOf(node: PhaseBListNode): ForOf {
  const span = spanFromLoc(node.loc);
  const clauseNode = node.elements[2];
  const bodyNodes = node.elements.slice(3);
  if (!clauseNode || clauseNode.phaseKind !== "list") {
    throw reportError("T2:0178", clauseNode?.loc ?? node.loc);
  }
  const [bindingNode, iterableNode] = (clauseNode as PhaseBListNode).elements;
  if (!bindingNode || !iterableNode) {
    throw reportError("T2:0177", clauseNode?.loc ?? node.loc);
  }
  const binding = bindingNode.phaseKind === "list" ? lowerBindingEntry(bindingNode as PhaseBListNode) : { target: lowerBindingTarget(bindingNode) };
  const iterable = lowerExpression(iterableNode);
  const body = lowerLoopBody(bodyNodes, span);
  return new ForOf({ binding, iterable, body, span });
}

function lowerForAwait(node: PhaseBListNode): ForAwait {
  const span = spanFromLoc(node.loc);
  const clauseNode = node.elements[2];
  const bodyNodes = node.elements.slice(3);
  if (!clauseNode || clauseNode.phaseKind !== "list") {
    throw reportError("T2:0172", clauseNode?.loc ?? node.loc);
  }
  const [bindingNode, iterableNode] = (clauseNode as PhaseBListNode).elements;
  if (!bindingNode || !iterableNode) {
    throw reportError("T2:0171", clauseNode?.loc ?? node.loc);
  }
  const binding = bindingNode.phaseKind === "list" ? lowerBindingEntry(bindingNode as PhaseBListNode) : { target: lowerBindingTarget(bindingNode) };
  const iterable = lowerExpression(iterableNode);
  const body = lowerLoopBody(bodyNodes, span);
  return new ForAwait({ binding, iterable, body, span });
}

function lowerForIn(node: PhaseBListNode): ForOf {
  const span = spanFromLoc(node.loc);
  const clauseNode = node.elements[2];
  const bodyNodes = node.elements.slice(3);
  if (!clauseNode || clauseNode.phaseKind !== "list") {
    throw reportError("T2:0178", clauseNode?.loc ?? node.loc);
  }
  const [bindingNode, iterableNode] = (clauseNode as PhaseBListNode).elements;
  if (!bindingNode || !iterableNode) {
    throw reportError("T2:0177", clauseNode?.loc ?? node.loc);
  }
  const binding = bindingNode.phaseKind === "list" ? lowerBindingEntry(bindingNode as PhaseBListNode) : { target: lowerBindingTarget(bindingNode) };
  const iterable = lowerExpression(iterableNode);
  const objectIdent = new Identifier({ name: "Object", span });
  const keysProp = new PropExpr({ object: objectIdent, name: "keys", maybeNull: false, span });
  const keysCall = new CallExpr({ callee: keysProp, args: [iterable], span });
  const body = lowerLoopBody(bodyNodes, span);
  return new ForOf({ binding, iterable: keysCall, body, span });
}

function lowerLoopBody(nodes: PhaseBNode[], span: Span): Statement {
  if (nodes.length === 1) {
    return lowerStatement(nodes[0]);
  }
  return new BlockStmt({ statements: nodes.map(lowerStatement), span });
}

function lowerFunction(node: PhaseBListNode, kind: CallableKind): FunctionExpr {
  const span = spanFromLoc(node.loc);
  let entries = node.elements.slice(1);
  let async = false;
  let generator = false;

  while (entries[0] && entries[0].phaseKind === "symbol") {
    const keyword = (entries[0] as SymbolNode).name;
    if (keyword === "async") {
      async = true;
      entries = entries.slice(1);
      continue;
    }
    if (keyword === "generator") {
      generator = true;
      entries = entries.slice(1);
      continue;
    }
    break;
  }

  let name: Identifier | undefined;
  let methodName: string | undefined;

  if (kind === "fn" && entries[0] && entries[0].phaseKind === "symbol") {
    name = lowerIdentifier(entries[0]);
    entries = entries.slice(1);
  } else if (kind === "method" || kind === "getter" || kind === "setter") {
    if (entries[0]) {
      if (entries[0].phaseKind !== "symbol") {
        throw reportError("T2:0118", { label: `${kind} name` }, entries[0].loc);
      }
      methodName = extractPropertyName(entries[0]);
      entries = entries.slice(1);
    }
  }

  const signatureNode = entries[0];
  let parameters: FnParam[] = [];
  let returnType: TypeNode | undefined;
  let typeParams: TypeParam[] | undefined;
  if (signatureNode && signatureNode.phaseKind === "list") {
    const list = signatureNode as PhaseBListNode;
    for (const param of stripCommaNodes(list.elements)) {
      parameters.push(lowerFnParam(param));
    }
    entries = entries.slice(1);
  }

  while (entries[0] && entries[0].phaseKind === "symbol") {
    const marker = (entries[0] as SymbolNode).name;
    if (marker === ":") {
      const returnNode = entries[1];
      if (!returnNode) {
        throw reportError("T2:0237", entries[0]?.loc ?? node.loc);
      }
      returnType = lowerTypeNode(returnNode);
      entries = entries.slice(2);
      continue;
    }
    if (marker === ":type-params") {
      const listNode = entries[1];
      typeParams = lowerTypeParams(listNode);
      entries = entries.slice(2);
      continue;
    }
    break;
  }

  if (typeParams && typeParams.length > 0) {
    const typeParamNames = new Set(typeParams.map((param) => param.name.name));
    parameters = parameters.map((param) => ({
      ...param,
      typeAnnotation: replaceTypeParamsInTypeNode(param.typeAnnotation, typeParamNames),
    }));
    returnType = replaceTypeParamsInTypeNode(returnType, typeParamNames);
  }

  const body = entries.map(lowerStatement);
  if (!async && containsAwaitOutsideFunctions(body)) {
    throw reportError("T2:0324", node.loc);
  }

  return new FunctionExpr({
    signature: { parameters, returnType },
    body,
    span,
    callableKind: kind,
    name,
    methodName,
    typeParams,
    async: async ? true : undefined,
    generator: generator ? true : undefined,
  });
}

function lowerFnParam(node: PhaseBNode): FnParam {
  let target: PhaseBNode | undefined;
  let annotationNode: PhaseBNode | undefined;

  if (node.phaseKind === "list") {
    const list = node as PhaseBListNode;
    const first = list.elements[0];
    if (first && first.phaseKind === "type-annotation") {
      const annotation = first as PhaseBTypeAnnotation;
      target = annotation.target;
      annotationNode = annotation.annotation;
    } else {
      target = first ?? node;
    }
  } else if (node.phaseKind === "type-annotation") {
    const annotation = node as PhaseBTypeAnnotation;
    target = annotation.target;
    annotationNode = annotation.annotation;
  } else {
    target = node;
  }

  const typeAnnotation = annotationNode ? lowerTypeNode(annotationNode) : undefined;
  return { name: lowerIdentifier(target), typeAnnotation };
}

const PRIMITIVE_TYPE_MAP: Record<string, TypePrimitive["kind"]> = {
  number: "type-number",
  string: "type-string",
  boolean: "type-boolean",
  void: "type-void",
  null: "type-null",
  undefined: "type-undefined",
  any: "type-any",
  unknown: "type-unknown",
  never: "type-never",
  object: "type-object",
  symbol: "type-symbol",
  bigint: "type-bigint",
};

function lowerTypeNode(node: PhaseBNode | undefined): TypeNode | undefined {
  if (!node) {
    return undefined;
  }
  if (node.phaseKind === "type-annotation") {
    return lowerTypeNode((node as PhaseBTypeAnnotation).annotation);
  }
  if (node.phaseKind === "list") {
    return lowerTypeList(node as PhaseBListNode);
  }
  if (node.phaseKind === "symbol") {
    const text = stringFromNode(node);
    const kind = text ? PRIMITIVE_TYPE_MAP[text.toLowerCase()] : undefined;
    if (kind) {
      return new TypePrimitive({ kind, span: spanFromLoc(node.loc) });
    }
    return new TypeRef({ identifier: lowerIdentifier(node), span: spanFromLoc(node.loc) });
  }
  if (node.phaseKind === "dotted") {
    const dotted = node as PhaseBDottedIdentifier;
    const identifier = new Identifier({ name: dotted.parts.join("."), span: spanFromLoc(node.loc) });
    return new TypeRef({ identifier, span: spanFromLoc(node.loc) });
  }
  if (node.phaseKind === "literal") {
    const expression = lowerExpression(node);
    if (expression instanceof Literal) {
      return new TypeLiteral({ value: [expression], span: spanFromLoc(node.loc) });
    }
  }
  return undefined;
}

function lowerTypeList(node: PhaseBListNode): TypeNode | undefined {
  const span = spanFromLoc(node.loc);
  const head = node.elements[0];
  if (!head || head.phaseKind !== "symbol") {
    return undefined;
  }
  const symbolHead = head as SymbolNode;
  const args = node.elements.slice(1);
  switch (symbolHead.name) {
    case "t:primitive":
      return buildPrimitiveType(args, span);
    case "t:ref":
      return buildRefType(args, span);
    case "t:array":
      return buildArrayType(args, span);
    case "t:nullable":
      return buildNullableType(args, span);
    case "t:tuple":
      return buildTupleType(args, span);
    case "t:union":
      return buildUnionType(args, span);
    case "t:intersection":
      return buildIntersectionType(args, span);
    case "t:apply":
      return buildApplyType(args, span);
    case "t:keyof":
      return buildKeyofType(args, span);
    case "t:typeof":
      return buildTypeofType(args, span);
    case "t:indexed":
      return buildIndexedType(args, span);
    case "t:conditional":
      return buildConditionalType(args, span);
    case "t:infer":
      return buildInferType(args, span);
    case "t:literal":
      return buildLiteralType(args, span);
    case "type-function":
    case "t:fn":
      return buildFunctionType(args, span);
    case "t:var": {
      const identifier = identifierFromNode(args[0]);
      if (!identifier) {
        return undefined;
      }
      return new TypeVar({ name: identifier, span });
    }
    default:
      return undefined;
  }
}

function buildFunctionType(nodes: PhaseBNode[], span: Span): TypeFunction | undefined {
  if (nodes.length === 0) {
    return undefined;
  }

  let entries = nodes;
  let typeParams: TypeParam[] | undefined;

  const typeParamMarkerIndex = entries.findIndex(
    (entry) => entry.phaseKind === "symbol" && (entry as SymbolNode).name === ":type-params"
  );
  if (typeParamMarkerIndex >= 0) {
    const paramList = entries[typeParamMarkerIndex + 1];
    typeParams = lowerTypeParams(paramList);
    entries = [...entries.slice(0, typeParamMarkerIndex), ...entries.slice(typeParamMarkerIndex + 2)];
  } else if (entries[0]?.phaseKind === "list") {
    const list = entries[0] as PhaseBListNode;
    const head = list.elements[0];
    if (head && head.phaseKind === "symbol" && (head as SymbolNode).name === "typeparams") {
      typeParams = lowerTypeParams(list);
      entries = entries.slice(1);
    }
  }

  if (entries.length === 0) {
    return undefined;
  }

  const returns = lowerTypeNode(entries[entries.length - 1]);
  if (!returns) {
    return undefined;
  }
  const params = entries
    .slice(0, -1)
    .map((entry) => lowerTypeNode(entry))
    .filter((entry): entry is TypeNode => Boolean(entry));
  if (params.length !== entries.length - 1) {
    return undefined;
  }
  return new TypeFunction({ params, returns, span, typeParams });
}

function lowerTypeParams(node: PhaseBNode | undefined): TypeParam[] {
  if (!node || node.phaseKind !== "list") {
    throw reportError("T2:0288", node?.loc);
  }
  const list = node as PhaseBListNode;
  let entries = list.elements;
  const head = entries[0];
  if (head && head.phaseKind === "symbol" && (head as SymbolNode).name === "typeparams") {
    entries = entries.slice(1);
  }
  const params: TypeParam[] = [];
  for (const entry of entries) {
    const name = stringFromNode(entry);
    if (!name) {
      throw reportError("T2:0288", entry.loc);
    }
    const identifier = new Identifier({ name, span: spanFromLoc(entry.loc) });
    params.push(new TypeParam({ name: identifier, span: spanFromLoc(entry.loc) }));
  }
  return params;
}

function replaceTypeParamsInTypeNode(typeNode: TypeNode | undefined, typeParamNames: Set<string>): TypeNode | undefined {
  if (!typeNode) {
    return undefined;
  }
  if (typeNode instanceof TypeVar) {
    return typeNode;
  }
  if (typeNode instanceof TypeRef) {
    if (typeParamNames.has(typeNode.identifier.name)) {
      return new TypeVar({ name: typeNode.identifier, span: typeNode.span });
    }
    if (typeNode.typeArgs && typeNode.typeArgs.length > 0) {
      const mappedArgs = typeNode.typeArgs.map((arg) => replaceTypeParamsInTypeNode(arg, typeParamNames) as TypeNode);
      return new TypeRef({ identifier: typeNode.identifier, span: typeNode.span, typeArgs: mappedArgs });
    }
    return typeNode;
  }
  if (typeNode instanceof TypePrimitive || typeNode instanceof TypeLiteral || typeNode instanceof TypeThis || typeNode instanceof TypeInfer) {
    return typeNode;
  }
  if (typeNode instanceof TypeArray) {
    const element = replaceTypeParamsInTypeNode(typeNode.element, typeParamNames) as TypeNode;
    return new TypeArray({ element, span: typeNode.span });
  }
  if (typeNode instanceof TypeNullable) {
    const inner = replaceTypeParamsInTypeNode(typeNode.inner, typeParamNames) as TypeNode;
    return new TypeNullable({ inner, span: typeNode.span });
  }
  if (typeNode instanceof TypeTuple) {
    const types = typeNode.types.map((entry) => replaceTypeParamsInTypeNode(entry, typeParamNames) as TypeNode);
    return new TypeTuple({ types, span: typeNode.span });
  }
  if (typeNode instanceof TypeUnion) {
    const types = typeNode.types.map((entry) => replaceTypeParamsInTypeNode(entry, typeParamNames) as TypeNode);
    return new TypeUnion({ types, span: typeNode.span });
  }
  if (typeNode instanceof TypeIntersection) {
    const types = typeNode.types.map((entry) => replaceTypeParamsInTypeNode(entry, typeParamNames) as TypeNode);
    return new TypeIntersection({ types, span: typeNode.span });
  }
  if (typeNode instanceof TypeKeyof) {
    const target = replaceTypeParamsInTypeNode(typeNode.target, typeParamNames) as TypeNode;
    return new TypeKeyof({ target, span: typeNode.span });
  }
  if (typeNode instanceof TypeTypeof) {
    return typeNode;
  }
  if (typeNode instanceof TypeIndexed) {
    const object = replaceTypeParamsInTypeNode(typeNode.object, typeParamNames) as TypeNode;
    const index = replaceTypeParamsInTypeNode(typeNode.index, typeParamNames) as TypeNode;
    return new TypeIndexed({ object, index, span: typeNode.span });
  }
  if (typeNode instanceof TypeConditional) {
    const check = replaceTypeParamsInTypeNode(typeNode.check, typeParamNames) as TypeNode;
    const extendsType = replaceTypeParamsInTypeNode(typeNode.extends, typeParamNames) as TypeNode;
    const trueType = replaceTypeParamsInTypeNode(typeNode.trueType, typeParamNames) as TypeNode;
    const falseType = replaceTypeParamsInTypeNode(typeNode.falseType, typeParamNames) as TypeNode;
    return new TypeConditional({ check, extendsType, trueType, falseType, span: typeNode.span });
  }
  if (typeNode instanceof TypeFunction) {
    const params = typeNode.params.map((entry) => replaceTypeParamsInTypeNode(entry, typeParamNames) as TypeNode);
    const returns = replaceTypeParamsInTypeNode(typeNode.returns, typeParamNames) as TypeNode;
    return new TypeFunction({ params, returns, span: typeNode.span, typeParams: typeNode.typeParams });
  }
  if (typeNode instanceof TypeObject) {
    const fields = typeNode.fields.map((field) =>
      new TypeField({
        key: field.key,
        fieldType: replaceTypeParamsInTypeNode(field.fieldType, typeParamNames) as TypeNode,
        span: field.span,
        optional: field.optional,
        readonlyFlag: field.readonlyFlag,
      })
    );
    return new TypeObject({ fields, span: typeNode.span });
  }
  if (typeNode instanceof TypeTemplateLiteral) {
    const parts = typeNode.parts.map((part) =>
      typeof part === "string" ? part : (replaceTypeParamsInTypeNode(part, typeParamNames) as TypeNode)
    );
    return new TypeTemplateLiteral({ parts, span: typeNode.span });
  }
  if (typeNode instanceof TypeMapped) {
    const valueType = replaceTypeParamsInTypeNode(typeNode.valueType, typeParamNames) as TypeNode;
    const nameRemap = typeNode.nameRemap
      ? (replaceTypeParamsInTypeNode(typeNode.nameRemap, typeParamNames) as TypeNode)
      : undefined;
    const via = typeNode.via ? (replaceTypeParamsInTypeNode(typeNode.via, typeParamNames) as TypeNode) : undefined;
    return new TypeMapped({
      typeParam: typeNode.typeParam,
      valueType,
      span: typeNode.span,
      nameRemap,
      readonlyModifier: typeNode.readonlyModifier,
      optionalModifier: typeNode.optionalModifier,
      via,
    });
  }
  if (typeNode instanceof TypeApp) {
    const mappedExpr = isTypeNodeInstance(typeNode.expr)
      ? (replaceTypeParamsInTypeNode(typeNode.expr, typeParamNames) as TypeNode)
      : typeNode.expr;
    const typeArgs = typeNode.typeArgs.map((entry) => replaceTypeParamsInTypeNode(entry, typeParamNames) as TypeNode);
    return new TypeApp({ expr: mappedExpr, typeArgs, span: typeNode.span });
  }
  return typeNode;
}

function isTypeNodeInstance(value: Expression | TypeNode): value is TypeNode {
  return (
    value instanceof TypePrimitive ||
    value instanceof TypeVar ||
    value instanceof TypeTuple ||
    value instanceof TypeArray ||
    value instanceof TypeNullable ||
    value instanceof TypeKeyof ||
    value instanceof TypeTypeof ||
    value instanceof TypeIndexed ||
    value instanceof TypeConditional ||
    value instanceof TypeInfer ||
    value instanceof TypeThis ||
    value instanceof TypeRef ||
    value instanceof TypeFunction ||
    value instanceof TypeObject ||
    value instanceof TypeUnion ||
    value instanceof TypeIntersection ||
    value instanceof TypeLiteral ||
    value instanceof TypeTemplateLiteral ||
    value instanceof TypeMapped ||
    value instanceof TypeApp
  );
}

function buildPrimitiveType(nodes: PhaseBNode[], span: Span): TypePrimitive | undefined {
  const text = stringFromNode(nodes[0]);
  if (!text) {
    return undefined;
  }
  const kind = PRIMITIVE_TYPE_MAP[text.toLowerCase()];
  if (!kind) {
    return undefined;
  }
  return new TypePrimitive({ kind, span });
}

function buildRefType(nodes: PhaseBNode[], span: Span): TypeRef | undefined {
  const identifier = identifierFromNode(nodes[0]);
  if (!identifier) {
    return undefined;
  }
  return new TypeRef({ identifier, span });
}

function buildArrayType(nodes: PhaseBNode[], span: Span): TypeArray | undefined {
  const element = lowerTypeNode(nodes[0]);
  if (!element) {
    return undefined;
  }
  return new TypeArray({ element, span });
}

function buildNullableType(nodes: PhaseBNode[], span: Span): TypeNullable | undefined {
  const inner = lowerTypeNode(nodes[0]);
  if (!inner) {
    return undefined;
  }
  return new TypeNullable({ inner, span });
}

function buildTupleType(nodes: PhaseBNode[], span: Span): TypeTuple | undefined {
  const elements = typeNodesFromList(nodes);
  if (elements.length === 0) {
    return undefined;
  }
  return new TypeTuple({ types: elements, span });
}

function buildUnionType(nodes: PhaseBNode[], span: Span): TypeUnion | undefined {
  const types = typeNodesFromList(nodes);
  if (types.length === 0) {
    return undefined;
  }
  return new TypeUnion({ types, span });
}

function buildIntersectionType(nodes: PhaseBNode[], span: Span): TypeIntersection | undefined {
  const types = typeNodesFromList(nodes);
  if (types.length === 0) {
    return undefined;
  }
  return new TypeIntersection({ types, span });
}

function buildApplyType(nodes: PhaseBNode[], span: Span): TypeApp | undefined {
  if (nodes.length === 0) {
    return undefined;
  }
  const exprNode = nodes[0];
  const expr = lowerTypeNode(exprNode);
  if (!expr) {
    return undefined;
  }
  const typeArgs = nodes.slice(1).map((child) => lowerTypeNode(child)).filter((entry): entry is TypeNode => Boolean(entry));
  if (typeArgs.length === 0) {
    return undefined;
  }
  return new TypeApp({ expr, typeArgs, span });
}

function buildKeyofType(nodes: PhaseBNode[], span: Span): TypeKeyof | undefined {
  const target = lowerTypeNode(nodes[0]);
  if (!target) {
    return undefined;
  }
  return new TypeKeyof({ target, span });
}

function buildTypeofType(nodes: PhaseBNode[], span: Span): TypeTypeof | undefined {
  const argument = nodes[0];
  if (!argument) {
    return undefined;
  }
  const expr = lowerExpression(argument);
  return new TypeTypeof({ expr, span });
}

function buildIndexedType(nodes: PhaseBNode[], span: Span): TypeIndexed | undefined {
  const objectType = lowerTypeNode(nodes[0]);
  const indexType = lowerTypeNode(nodes[1]);
  if (!objectType || !indexType) {
    return undefined;
  }
  return new TypeIndexed({ object: objectType, index: indexType, span });
}

function buildConditionalType(nodes: PhaseBNode[], span: Span): TypeConditional | undefined {
  const check = lowerTypeNode(nodes[0]);
  const extendsType = lowerTypeNode(nodes[1]);
  const trueType = lowerTypeNode(nodes[2]);
  const falseType = lowerTypeNode(nodes[3]);
  if (!check || !extendsType || !trueType || !falseType) {
    return undefined;
  }
  return new TypeConditional({ check, extendsType, trueType, falseType, span });
}

function buildInferType(nodes: PhaseBNode[], span: Span): TypeInfer | undefined {
  const identifier = identifierFromNode(nodes[0]);
  if (!identifier) {
    return undefined;
  }
  return new TypeInfer({ name: identifier, span });
}

function buildLiteralType(nodes: PhaseBNode[], span: Span): TypeLiteral | undefined {
  const literalNode = nodes[0];
  if (!literalNode) {
    return undefined;
  }
  const expression = lowerExpression(literalNode);
  if (expression instanceof Literal) {
    return new TypeLiteral({ value: [expression], span });
  }
  return undefined;
}

function typeNodesFromList(nodes: PhaseBNode[]): TypeNode[] {
  return nodes.map((node) => lowerTypeNode(node)).filter((entry): entry is TypeNode => Boolean(entry));
}

function stringFromNode(node: PhaseBNode | undefined): string | undefined {
  if (!node) {
    return undefined;
  }
  if (node.phaseKind === "literal") {
    const literal = node as LiteralNode;
    if (typeof literal.value === "string") {
      return literal.value;
    }
  }
  if (node.phaseKind === "symbol") {
    return (node as SymbolNode).name;
  }
  if (node.phaseKind === "dotted") {
    const dotted = node as PhaseBDottedIdentifier;
    return dotted.parts.join(".");
  }
  return undefined;
}

function identifierFromNode(node: PhaseBNode | undefined): Identifier | undefined {
  if (!node) {
    return undefined;
  }
  const name = stringFromNode(node);
  if (!name) {
    return undefined;
  }
  return new Identifier({ name, span: spanFromLoc(node.loc) });
}

function isPlaceholder(node: PhaseBNode): boolean {
  if (node.phaseKind === "literal" && (node as LiteralNode).value === null) {
    return true;
  }
  if (node.phaseKind === "symbol" && (node as SymbolNode).name === "_") {
    return true;
  }
  if (node.phaseKind === "list" && (node as PhaseBListNode).elements.length === 0) {
    return true;
  }
  return false;
}

function createNullLiteral(loc: SourceLoc): Literal {
  return new Literal({ value: null, span: spanFromLoc(loc) });
}

function createNullInitStatement(loc: SourceLoc): ExprStmt {
  const literal = createNullLiteral(loc);
  return new ExprStmt({ expr: literal, span: literal.span });
}

function lowerExpression(node: PhaseBNode): Expression {
  switch (node.phaseKind) {
    case "literal": {
      const literal = node as LiteralNode;
      return new Literal({ value: literal.value, span: spanFromLoc(node.loc) });
    }
    case "symbol": {
      const symbol = node as SymbolNode;
      const spreadTarget = stripSpreadPrefix(symbol);
      if (spreadTarget) {
        const expr = lowerExpression(spreadTarget);
        return new SpreadExpr({ kind: "array", expr, span: spanFromLoc(node.loc) });
      }
      return new Identifier({ name: symbol.name, span: spanFromLoc(node.loc) });
    }
    case "type-annotation":
      return lowerExpression((node as PhaseBTypeAnnotation).target);
    case "list":
      return lowerList(node as PhaseBListNode);
    case "dotted": {
      const dotted = node as PhaseBDottedIdentifier;
      return new Identifier({ name: dotted.parts.join("."), span: spanFromLoc(node.loc) });
    }
    default:
      return new Literal({ value: null, span: emptySpan() });
  }
}

function lowerList(node: PhaseBListNode): Expression {
  const span = spanFromLoc(node.loc);
  const [head, ...rest] = node.elements;
  const filteredRest = stripCommaNodes(rest);
  if (head && head.phaseKind === "symbol") {
    const symbolHead = head as SymbolNode;
    switch (symbolHead.name) {
      case "array": {
        validateCommaSeparated(rest, "array literal");
        const elements = filteredRest.map(lowerExpression);
        return new ArrayExpr({ elements, span });
      }
      case "call": {
        validateCommaSeparated(rest, "call arguments");
        const callee = filteredRest[0] ? lowerExpression(filteredRest[0]) : new Identifier({ name: "<missing>", span });
        const args = filteredRest.slice(1).map(lowerExpression);
        return new CallExpr({ callee, args, span });
      }
      case "prop": {
        const objectNode = rest[0];
        const propertyNode = rest[1];
        const object = objectNode ? lowerExpression(objectNode) : new Identifier({ name: "<missing>", span });
        const name = propertyNode ? extractPropertyName(propertyNode) : "<missing>";
        return new PropExpr({ object, name, maybeNull: false, span });
      }
      case "fn":
      case "method":
      case "lambda":
      case "getter":
      case "setter":
        return lowerFunction(node, symbolHead.name as "fn" | "method" | "lambda" | "getter" | "setter");
      case "object":
        return lowerObject(node);
      case "template": {
        const parts = filteredRest.map(lowerExpression);
        return new TemplateExpr({ parts, span });
      }
      case "spread": {
        const kindNode = rest[0];
        const exprNode = rest[1];
        const kind =
          kindNode && kindNode.phaseKind === "symbol" && isSpreadKind((kindNode as SymbolNode).name)
            ? ((kindNode as SymbolNode).name as "array" | "object" | "rest")
            : "array";
        const expr = exprNode ? lowerExpression(exprNode) : new Literal({ value: null, span });
        return new SpreadExpr({ kind, expr, span });
      }
      case "ternary": {
        const testNode = rest[0];
        const consequentNode = rest[1];
        const alternateNode = rest[2];
        const test = testNode ? lowerExpression(testNode) : new Literal({ value: null, span });
        const consequent = consequentNode ? lowerExpression(consequentNode) : new Literal({ value: null, span });
        const alternate = alternateNode ? lowerExpression(alternateNode) : new Literal({ value: null, span });
        return new TernaryExpr({ test, consequent, alternate, span });
      }
      case "await": {
        validateCommaSeparated(rest, "await arguments");
        if (filteredRest.length !== 1) {
          throw reportError("T2:0127", node.loc);
        }
        const argument = lowerExpression(filteredRest[0]);
        return new AwaitExpr({ argument, span });
      }
      case "yield": {
        validateCommaSeparated(rest, "yield arguments");
        if (filteredRest.length > 1) {
          throw reportError("T2:0127", node.loc);
        }
        const argument = filteredRest[0] ? lowerExpression(filteredRest[0]) : undefined;
        return new YieldExpr({ delegate: false, argument, span });
      }
      case "yield*": {
        validateCommaSeparated(rest, "yield arguments");
        if (filteredRest.length !== 1) {
          throw reportError("T2:0127", node.loc);
        }
        const argument = lowerExpression(filteredRest[0]);
        return new YieldExpr({ delegate: true, argument, span });
      }
      default:
        break;
    }
  }
  if (!head) {
    return new Literal({ value: null, span });
  }
  validateCommaSeparated(rest, "call arguments");
  const callee = lowerExpression(head);
  const args = filteredRest.map(lowerExpression);
  return new CallExpr({ callee, args, span });
}

function lowerObject(node: PhaseBListNode): ObjectExpr {
  const span = spanFromLoc(node.loc);
  const fieldNodes = stripCommaNodes(node.elements.slice(1));
  const fields = fieldNodes.map((fieldNode) => {
    if (fieldNode.phaseKind === "symbol") {
      const spreadTarget = stripSpreadPrefix(fieldNode as SymbolNode);
      if (spreadTarget) {
        return { kind: "spread", expr: lowerExpression(spreadTarget) } as const;
      }
    }
    if (fieldNode.phaseKind === "list") {
      const list = fieldNode as PhaseBListNode;
      const keyNode = list.elements[0];
      if (keyNode && keyNode.phaseKind === "symbol" && (keyNode as SymbolNode).name === "spread") {
        const kindNode = list.elements[1];
        const exprNode = list.elements[2];
        if (kindNode && kindNode.phaseKind === "symbol" && (kindNode as SymbolNode).name === "object" && exprNode) {
          return { kind: "spread", expr: lowerExpression(exprNode) } as const;
        }
      }
      if (keyNode && keyNode.phaseKind === "symbol" && (keyNode as SymbolNode).name === "computed") {
        const exprNode = list.elements[1];
        const valueNode = list.elements[2];
        if (exprNode && valueNode) {
          return {
            kind: "computed",
            key: lowerExpression(exprNode),
            value: lowerExpression(valueNode),
          } as const;
        }
      }
      if (list.elements.length >= 2) {
        const valueNode = list.elements[1];
        return { kind: "field", key: extractPropertyName(list.elements[0]), value: lowerExpression(valueNode) } as const;
      }
    }
    return { kind: "field", key: "<unknown>", value: new Literal({ value: null, span: spanFromLoc(fieldNode.loc) }) } as const;
  });
  return new ObjectExpr({ fields, span });
}

function lowerIdentifier(node: PhaseBNode | undefined): Identifier {
  if (!node) {
    return new Identifier({ name: "<missing>", span: emptySpan() });
  }
  if (node.phaseKind === "symbol") {
    return new Identifier({ name: (node as { name: string }).name, span: spanFromLoc(node.loc) });
  }
  if (node.phaseKind === "type-annotation") {
    return lowerIdentifier((node as PhaseBTypeAnnotation).target);
  }
  return new Identifier({ name: "<missing>", span: spanFromLoc(node.loc) });
}

function lowerBindingTarget(node: PhaseBNode | undefined): BindingTarget {
  if (!node) {
    return new Identifier({ name: "<missing>", span: emptySpan() });
  }
  if (node.phaseKind === "type-annotation") {
    return lowerBindingTarget((node as PhaseBTypeAnnotation).target);
  }
  if (node.phaseKind === "symbol") {
    return new Identifier({ name: (node as SymbolNode).name, span: spanFromLoc(node.loc) });
  }
  if (node.phaseKind === "list") {
    const list = node as PhaseBListNode;
    const head = list.elements[0];
    if (head && head.phaseKind === "symbol") {
      const name = (head as SymbolNode).name;
      if (name === "array-pattern") {
        return lowerArrayPattern(list);
      }
      if (name === "object-pattern") {
        return lowerObjectPattern(list);
      }
      if (name === "rest") {
        return lowerRestPattern(list);
      }
      if (name === "default") {
        return lowerDefaultPattern(list);
      }
    }
  }
  return new Identifier({ name: "<missing>", span: spanFromLoc(node.loc) });
}

function lowerArrayPattern(node: PhaseBListNode): ArrayPattern {
  const span = spanFromLoc(node.loc);
  const elements: BindingTarget[] = [];
  let rest: RestPattern | undefined;

  for (const child of node.elements.slice(1)) {
    if (child.phaseKind === "list") {
      const list = child as PhaseBListNode;
      const head = list.elements[0];
      if (head && head.phaseKind === "symbol" && (head as SymbolNode).name === "rest") {
        rest = lowerRestPattern(list);
        continue;
      }
    }
    if (child.phaseKind === "symbol") {
      const spreadTarget = stripSpreadPrefix(child as SymbolNode);
      if (spreadTarget) {
        rest = new RestPattern({ target: lowerBindingTarget(spreadTarget), span: spanFromLoc(child.loc) });
        continue;
      }
    }
    elements.push(lowerBindingTarget(child));
  }

  return new ArrayPattern({ elements, span, rest });
}

function lowerObjectPattern(node: PhaseBListNode): ObjectPattern {
  const span = spanFromLoc(node.loc);
  const properties: { key: string; target: BindingTarget }[] = [];
  let rest: RestPattern | undefined;

  for (const child of node.elements.slice(1)) {
    if (child.phaseKind === "list") {
      const list = child as PhaseBListNode;
      const head = list.elements[0];
      if (head && head.phaseKind === "symbol" && (head as SymbolNode).name === "rest") {
        rest = lowerRestPattern(list);
        continue;
      }
      if (list.elements.length >= 2) {
        const keyNode = list.elements[0];
        const targetNode = list.elements[1];
        const key = extractPropertyName(keyNode);
        properties.push({ key, target: lowerBindingTarget(targetNode) });
        continue;
      }
    }
    if (child.phaseKind === "symbol") {
      const spreadTarget = stripSpreadPrefix(child as SymbolNode);
      if (spreadTarget) {
        rest = new RestPattern({ target: lowerBindingTarget(spreadTarget), span: spanFromLoc(child.loc) });
        continue;
      }
      const key = (child as SymbolNode).name;
      properties.push({ key, target: new Identifier({ name: key, span: spanFromLoc(child.loc) }) });
      continue;
    }
    if (child.phaseKind === "literal") {
      const key = extractPropertyName(child);
      properties.push({ key, target: new Identifier({ name: key, span: spanFromLoc(child.loc) }) });
    }
  }

  return new ObjectPattern({ properties, span, rest });
}

function lowerRestPattern(node: PhaseBListNode): RestPattern {
  const span = spanFromLoc(node.loc);
  const targetNode = node.elements[1];
  const target = targetNode ? lowerBindingTarget(targetNode) : new Identifier({ name: "<missing>", span });
  return new RestPattern({ target, span });
}

function lowerDefaultPattern(node: PhaseBListNode): DefaultPattern {
  const span = spanFromLoc(node.loc);
  const targetNode = node.elements[1];
  const defaultNode = node.elements[2];
  const target = targetNode ? lowerBindingTarget(targetNode) : new Identifier({ name: "<missing>", span });
  const defaultValue = defaultNode ? lowerExpression(defaultNode) : new Literal({ value: null, span });
  return new DefaultPattern({ target, defaultValue, span });
}

function containsAwaitOutsideFunctions(statements: Statement[]): boolean {
  for (const statement of statements) {
    if (containsAwaitInStatement(statement)) {
      return true;
    }
  }
  return false;
}

function containsAwaitInStatement(statement: Statement): boolean {
  if (statement instanceof FunctionExpr) {
    return false;
  }
  if (statement instanceof ExprStmt) {
    return containsAwaitInExpression(statement.expr);
  }
  if (statement instanceof BlockStmt) {
    return containsAwaitOutsideFunctions(statement.statements);
  }
  if (statement instanceof LetStarExpr) {
    for (const binding of statement.bindings) {
      if (binding.init && containsAwaitInExpression(binding.init)) {
        return true;
      }
      if (containsAwaitInBindingTarget(binding.target)) {
        return true;
      }
    }
    return containsAwaitOutsideFunctions(statement.body);
  }
  if (statement instanceof AssignExpr) {
    return containsAwaitInExpression(statement.target) || containsAwaitInExpression(statement.value);
  }
  if (statement instanceof ForClassic) {
    if (statement.init && containsAwaitInStatement(statement.init)) {
      return true;
    }
    if (statement.condition && containsAwaitInExpression(statement.condition)) {
      return true;
    }
    if (statement.update && containsAwaitInExpression(statement.update)) {
      return true;
    }
    return containsAwaitInStatement(statement.body);
  }
  if (statement instanceof ForOf || statement instanceof ForAwait) {
    if (containsAwaitInBindingTarget(statement.binding.target)) {
      return true;
    }
    if (statement.binding.init && containsAwaitInExpression(statement.binding.init)) {
      return true;
    }
    if (containsAwaitInExpression(statement.iterable)) {
      return true;
    }
    return containsAwaitInStatement(statement.body);
  }
  if (statement instanceof IfStmt) {
    if (containsAwaitInExpression(statement.test)) {
      return true;
    }
    if (containsAwaitInStatement(statement.consequent)) {
      return true;
    }
    return statement.alternate ? containsAwaitInStatement(statement.alternate) : false;
  }
  if (statement instanceof WhileStmt) {
    return containsAwaitInExpression(statement.condition) || containsAwaitInStatement(statement.body);
  }
  if (statement instanceof SwitchStmt) {
    if (containsAwaitInExpression(statement.discriminant)) {
      return true;
    }
    for (const clause of statement.cases) {
      if (clause.test && containsAwaitInExpression(clause.test)) {
        return true;
      }
      if (containsAwaitOutsideFunctions(clause.consequent)) {
        return true;
      }
    }
    return false;
  }
  if (statement instanceof ReturnExpr) {
    return statement.value ? containsAwaitInExpression(statement.value) : false;
  }
  if (statement instanceof NamespaceStmt) {
    return containsAwaitOutsideFunctions(statement.body);
  }
  if (statement instanceof EnumStmt) {
    for (const member of statement.members) {
      if (member.value && containsAwaitInExpression(member.value)) {
        return true;
      }
    }
    return false;
  }
  if (statement instanceof BreakStmt || statement instanceof ContinueStmt) {
    return false;
  }
  return false;
}

function containsAwaitInExpression(expression: Expression): boolean {
  if (expression instanceof AwaitExpr) {
    return true;
  }
  if (expression instanceof Identifier || expression instanceof Literal) {
    return false;
  }
  if (expression instanceof CallExpr) {
    if (containsAwaitInExpression(expression.callee)) {
      return true;
    }
    return expression.args.some((arg) => containsAwaitInExpression(arg));
  }
  if (expression instanceof CallWithThisExpr) {
    if (containsAwaitInExpression(expression.fn)) {
      return true;
    }
    if (containsAwaitInExpression(expression.thisArg)) {
      return true;
    }
    return expression.args.some((arg) => containsAwaitInExpression(arg));
  }
  if (expression instanceof NewExpr) {
    if (containsAwaitInExpression(expression.callee)) {
      return true;
    }
    return expression.args.some((arg) => containsAwaitInExpression(arg));
  }
  if (expression instanceof PropExpr) {
    return containsAwaitInExpression(expression.object);
  }
  if (expression instanceof IndexExpr) {
    return containsAwaitInExpression(expression.object) || containsAwaitInExpression(expression.index);
  }
  if (expression instanceof ArrayExpr) {
    return expression.elements.some((entry) => containsAwaitInExpression(entry));
  }
  if (expression instanceof ObjectExpr) {
    return expression.fields.some((field) => {
      if (field.kind === "spread") {
        return containsAwaitInExpression(field.expr);
      }
      return containsAwaitInExpression(field.value);
    });
  }
  if (expression instanceof TemplateExpr) {
    return expression.parts.some((part) => containsAwaitInExpression(part));
  }
  if (expression instanceof SpreadExpr) {
    return containsAwaitInExpression(expression.expr);
  }
  if (expression instanceof TernaryExpr) {
    return (
      containsAwaitInExpression(expression.test) ||
      containsAwaitInExpression(expression.consequent) ||
      containsAwaitInExpression(expression.alternate)
    );
  }
  if (expression instanceof ThrowExpr) {
    return containsAwaitInExpression(expression.argument);
  }
  if (expression instanceof TryCatchExpr) {
    if (containsAwaitInStatement(expression.body)) {
      return true;
    }
    if (expression.catchClause && containsAwaitOutsideFunctions(expression.catchClause.body)) {
      return true;
    }
    if (expression.finallyClause && containsAwaitOutsideFunctions(expression.finallyClause.body)) {
      return true;
    }
    return false;
  }
  if (expression instanceof TypeAssertExpr) {
    return containsAwaitInExpression(expression.expr);
  }
  if (expression instanceof NonNullAssertExpr) {
    return containsAwaitInExpression(expression.expr);
  }
  if (expression instanceof FunctionExpr) {
    return false;
  }
  return false;
}

function containsAwaitInBindingTarget(target: BindingTarget): boolean {
  if (target instanceof DefaultPattern) {
    return containsAwaitInBindingTarget(target.target) || containsAwaitInExpression(target.defaultValue);
  }
  if (target instanceof RestPattern) {
    return containsAwaitInBindingTarget(target.target);
  }
  if (target instanceof ArrayPattern) {
    if (target.elements.some((element) => containsAwaitInBindingTarget(element))) {
      return true;
    }
    return target.rest ? containsAwaitInBindingTarget(target.rest) : false;
  }
  if (target instanceof ObjectPattern) {
    for (const property of target.properties) {
      if (containsAwaitInBindingTarget(property.target)) {
        return true;
      }
    }
    return target.rest ? containsAwaitInBindingTarget(target.rest) : false;
  }
  return false;
}

function stripSpreadPrefix(node: SymbolNode): PhaseBNode | null {
  if (!node.name.startsWith("...")) {
    return null;
  }
  const stripped = node.name.slice(3);
  if (!stripped) {
    return null;
  }
  return { ...node, name: stripped, phaseKind: "symbol" };
}

function stripCommaNodes(nodes: PhaseBNode[]): PhaseBNode[] {
  return nodes.filter((node) => !(node.phaseKind === "symbol" && (node as SymbolNode).name === ","));
}

function validateCommaSeparated(nodes: PhaseBNode[], context: string): void {
  if (!nodes.some((node) => node.phaseKind === "symbol" && (node as SymbolNode).name === ",")) {
    return;
  }
  if (nodes.length === 0) {
    return;
  }
  if (nodes[0].phaseKind === "symbol" && (nodes[0] as SymbolNode).name === ",") {
    throw reportError("T2:0115", { context }, nodes[0]?.loc);
  }
  const last = nodes[nodes.length - 1];
  if (last.phaseKind === "symbol" && (last as SymbolNode).name === ",") {
    throw reportError("T2:0114", { context }, last.loc);
  }
  for (let i = 1; i < nodes.length; i += 1) {
    const current = nodes[i];
    const prev = nodes[i - 1];
    if (
      current.phaseKind === "symbol" &&
      (current as SymbolNode).name === "," &&
      prev.phaseKind === "symbol" &&
      (prev as SymbolNode).name === ","
    ) {
      throw reportError("T2:0113", { context }, current.loc);
    }
  }
}

function isSpreadKind(kind: string): kind is "array" | "object" | "rest" {
  return kind === "array" || kind === "object" || kind === "rest";
}

function extractPropertyName(node: PhaseBNode): string {
  if (node.phaseKind === "literal") {
    const literal = node as LiteralNode;
    return typeof literal.value === "string" ? literal.value : String(literal.value);
  }
  if (node.phaseKind === "symbol") {
    const symbol = node as SymbolNode;
    return symbol.name;
  }
  return "<unknown>";
}

function spanFromLoc(loc: SourceLoc): Span {
  return {
    start: 0,
    end: 0,
    source: loc.file,
    startLine: loc.line,
    startColumn: loc.column,
    endLine: loc.endLine,
    endColumn: loc.endColumn,
  };
}

function emptySpan(): Span {
  return {
    start: 0,
    end: 0,
    source: "<unknown>",
  };
}
