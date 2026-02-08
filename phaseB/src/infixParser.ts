import type { ExpansionFrame, SourceLoc } from "./location.js";
import type { PhaseBListNode, PhaseBNode, PhaseBTypeAnnotation, SymbolNode } from "./reader.js";
import { INFIX_OPERATOR_TABLE } from "./sugar.js";
import { mergeLocs } from "./typeAnnotationUtils.js";
import { reportError } from "../../common/dist/errorRegistry.js";
import type { Token, TokenPosition } from "typescript-parsec";
import { apply, alt_sc, expectEOF, expectSingleResult, lrec_sc, rule, seq, str, tok } from "typescript-parsec";

type InfixTokenKind = "operand" | "operator";

type InfixToken = Token<InfixTokenKind> & { node?: PhaseBNode };

type InfixLevel = {
  precedence: number;
  associativity: "left" | "right";
  operators: string[];
};

const RUNTIME_ISEQUAL_NAME = "__t2_isEqual";

const INFIX_LEVELS = buildInfixLevels();
const INFIX_PARSER = buildInfixParser();

export function parseInfixTokens(
  nodes: PhaseBNode[],
  loc: SourceLoc,
  expansionStack?: ExpansionFrame[],
): PhaseBNode {
  const tokens = createInfixTokens(nodes, loc);
  const stream = linkTokens(tokens);
  if (!stream) {
    throw reportError("T2:0321", loc);
  }
  try {
    const parsed = expectSingleResult(expectEOF(INFIX_PARSER.parse(stream)));
    if (parsed.phaseKind === "list") {
      const listNode = parsed as PhaseBListNode;
      return { ...listNode, loc, expansionStack: expansionStack ?? listNode.expansionStack };
    }
    if (expansionStack && parsed.expansionStack === undefined) {
      return { ...parsed, expansionStack } as PhaseBNode;
    }
    return parsed;
  } catch {
    throw reportError("T2:0321", loc);
  }
}

export function rewriteInfixNodes(nodes: PhaseBNode[]): PhaseBNode[] {
  return nodes.map((node) => rewriteInfixNode(node));
}

function rewriteInfixNode(node: PhaseBNode): PhaseBNode {
  if (node.phaseKind === "list") {
    const listNode = node as PhaseBListNode;
    const rewrittenElements = listNode.elements.map((child) => rewriteInfixNode(child));
    const rewrittenList: PhaseBListNode = { ...listNode, elements: rewrittenElements };
    const head = rewrittenElements[0];
    if (head && head.phaseKind === "symbol" && (head as SymbolNode).name === "infix") {
      if (rewrittenElements.length !== 2) {
        throw reportError("T2:0320", rewrittenList.loc);
      }
      const inner = rewrittenElements[1];
      if (!inner || inner.phaseKind !== "list") {
        throw reportError("T2:0320", rewrittenList.loc);
      }
      const tokenList = stripCallHead(inner as PhaseBListNode);
      return parseInfixTokens(tokenList, rewrittenList.loc, rewrittenList.expansionStack);
    }
    return rewrittenList;
  }
  if (node.phaseKind === "type-annotation") {
    const annotation = node as PhaseBTypeAnnotation;
    const target = rewriteInfixNode(annotation.target);
    const rewrittenAnnotation = rewriteInfixNode(annotation.annotation);
    return {
      ...annotation,
      target,
      annotation: rewrittenAnnotation,
      elements: [target, rewrittenAnnotation],
    } as PhaseBTypeAnnotation;
  }
  return node;
}

function buildInfixLevels(): InfixLevel[] {
  const grouped = new Map<number, InfixLevel>();
  for (const [operator, info] of Object.entries(INFIX_OPERATOR_TABLE)) {
    const existing = grouped.get(info.precedence);
    if (existing) {
      existing.operators.push(operator);
      continue;
    }
    grouped.set(info.precedence, {
      precedence: info.precedence,
      associativity: info.associativity,
      operators: [operator],
    });
  }
  return [...grouped.values()].sort((a, b) => b.precedence - a.precedence);
}

function buildInfixParser() {
  let expr = apply(tok<InfixTokenKind>("operand"), (token) => {
    const infixToken = token as InfixToken;
    if (!infixToken.node) {
      throw new Error("Missing operand node");
    }
    return infixToken.node;
  });

  for (const level of INFIX_LEVELS) {
    const opParser = makeOperatorParser(level.operators);
    const next = expr;
    if (level.associativity === "left") {
      type InfixStep = { operator: InfixToken; right: PhaseBNode };
      const combine = apply(seq(opParser, next), ([operator, right]) => ({ operator, right } as InfixStep));
      expr = lrec_sc(next, combine, (left, value) => createInfixCall(value.operator, left, value.right));
      continue;
    }
    const rightAssoc = rule<InfixTokenKind, PhaseBNode>();
    rightAssoc.setPattern(
      alt_sc(
        apply(seq(next, opParser, rightAssoc), ([left, operator, right]) =>
          createInfixCall(operator as InfixToken, left, right),
        ),
        next,
      ),
    );
    expr = rightAssoc;
  }

  return expr;
}

function makeOperatorParser(operators: string[]) {
  const parsers = operators.map((op) => apply(str<InfixTokenKind>(op), (token) => token as InfixToken));
  if (parsers.length === 0) {
    throw new Error("Missing operator parser");
  }
  if (parsers.length === 1) {
    return parsers[0];
  }
  let combined = parsers[0];
  for (const parser of parsers.slice(1)) {
    combined = alt_sc(combined, parser);
  }
  return combined;
}

function createInfixTokens(nodes: PhaseBNode[], loc: SourceLoc): InfixToken[] {
  if (nodes.length < 3 || nodes.length % 2 === 0) {
    throw reportError("T2:0321", loc);
  }
  const tokens: InfixToken[] = [];
  for (let i = 0; i < nodes.length; i += 1) {
    const node = nodes[i];
    const pos = createTokenPosition(node.loc, i);
    if (i % 2 === 0) {
      tokens.push({ kind: "operand", text: "<operand>", pos, next: undefined, node });
      continue;
    }
    if (node.phaseKind !== "symbol") {
      throw reportError("T2:0321", node.loc);
    }
    const operator = (node as SymbolNode).name;
    if (!INFIX_OPERATOR_TABLE[operator]) {
      throw reportError("T2:0321", node.loc);
    }
    tokens.push({ kind: "operator", text: operator, pos, next: undefined, node });
  }
  return tokens;
}

function linkTokens(tokens: InfixToken[]): InfixToken | undefined {
  let next: InfixToken | undefined = undefined;
  for (let i = tokens.length - 1; i >= 0; i -= 1) {
    const token = tokens[i];
    const linked: InfixToken = { ...token, next };
    tokens[i] = linked;
    next = linked;
  }
  return tokens[0];
}

function createTokenPosition(loc: SourceLoc, index: number): TokenPosition {
  return {
    index,
    rowBegin: loc.line,
    columnBegin: loc.column,
    rowEnd: loc.endLine,
    columnEnd: loc.endColumn,
  };
}

function stripCallHead(list: PhaseBListNode): PhaseBNode[] {
  const head = list.elements[0];
  if (head && head.phaseKind === "symbol" && (head as SymbolNode).name === "call") {
    return list.elements.slice(1);
  }
  return list.elements;
}

function createInfixCall(operatorToken: InfixToken, left: PhaseBNode, right: PhaseBNode): PhaseBListNode {
  const operatorNode = operatorToken.node;
  if (!operatorNode || operatorNode.phaseKind !== "symbol") {
    throw reportError("T2:0321", left.loc);
  }
  const operatorName = (operatorNode as SymbolNode).name;
  const loc = mergeNodeLocs(left, operatorNode, right);
  if (operatorName === "?=") {
    return createIsEqualCall(left, right, loc, operatorNode as SymbolNode);
  }
  if (operatorName === "?!=") {
    const isEqualCall = createIsEqualCall(left, right, loc, operatorNode as SymbolNode);
    const notSymbol = createSymbol("!", loc, operatorNode.expansionStack);
    return createList([createSymbol("call", loc), notSymbol, isEqualCall], loc, operatorNode.expansionStack);
  }
  return createList(
    [createSymbol("call", loc), operatorNode, left, right],
    loc,
    operatorNode.expansionStack ?? left.expansionStack ?? right.expansionStack,
  );
}

function createIsEqualCall(left: PhaseBNode, right: PhaseBNode, loc: SourceLoc, operatorNode: SymbolNode): PhaseBListNode {
  const isEqualSymbol = createSymbol(RUNTIME_ISEQUAL_NAME, loc, operatorNode.expansionStack);
  return createList(
    [createSymbol("call", loc), isEqualSymbol, left, right],
    loc,
    operatorNode.expansionStack ?? left.expansionStack ?? right.expansionStack,
  );
}

function createSymbol(name: string, loc: SourceLoc, expansionStack?: ExpansionFrame[]): PhaseBNode {
  return {
    kind: "symbol",
    name,
    loc,
    phaseKind: "symbol",
    expansionStack,
  };
}

function createList(elements: PhaseBNode[], loc: SourceLoc, expansionStack?: ExpansionFrame[]): PhaseBListNode {
  return {
    kind: "list",
    elements,
    loc,
    delimiter: "(",
    phaseKind: "list",
    expansionStack,
  };
}

function mergeNodeLocs(...nodes: PhaseBNode[]): SourceLoc {
  if (nodes.length === 0) {
    return { file: "<unknown>", line: 0, column: 0, endLine: 0, endColumn: 0 };
  }
  return nodes.slice(1).reduce((acc, node) => mergeLocs(acc, node.loc), nodes[0].loc);
}
