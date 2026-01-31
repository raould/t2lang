import type { ExpansionFrame, SourceLoc } from "./location.js";
export type { ExpansionFrame, SourceLoc } from "./location.js";
import type { Program } from "../../phaseA/dist/phaseA0.js";
import { applySugar } from "./sugar.js";
import { rewriteAssignments } from "./rewriter.js";
import { lowerPhaseB } from "./lower.js";

export interface BaseNode {
  loc: SourceLoc;
  expansionStack?: ExpansionFrame[];
}

export type SymbolNode = BaseNode & {
  kind: "symbol";
  name: string;
};

export type LiteralNode = BaseNode & {
  kind: "literal";
  value: string | number | boolean | null;
};

export type ListNode = BaseNode & {
  kind: "list";
  elements: SExprNode[];
};

export type SExprNode = SymbolNode | LiteralNode | ListNode;

export type ReaderErrorCode =
  | "E001"
  | "E002"
  | "E003"
  | "E004"
  | "E005"
  | "E006"
  | "E007";

export type PhaseBKind =
  | "symbol"
  | "literal"
  | "list"
  | "dotted"
  | "type-annotation";

export interface PhaseBNodeBase extends BaseNode {
  phaseKind: PhaseBKind;
}

export type PhaseBNode =
  | (SymbolNode & PhaseBNodeBase)
  | (LiteralNode & PhaseBNodeBase)
  | PhaseBListNode
  | PhaseBDottedIdentifier
  | PhaseBTypeAnnotation;

export interface PhaseBDottedIdentifier extends PhaseBNodeBase {
  phaseKind: "dotted";
  parts: string[];
}

export interface PhaseBTypeAnnotation extends PhaseBNodeBase {
  phaseKind: "type-annotation";
  kind: "list";
  elements: PhaseBNode[];
  target: PhaseBNode;
  annotation: PhaseBNode;
}

export interface PhaseBListNode extends PhaseBNodeBase {
  phaseKind: "list";
  kind: "list";
  elements: PhaseBNode[];
}

export function parsePhaseB(source: string, file = "<input>"): Program {
  const nodes = parsePhaseBRaw(source, file);
  return lowerPhaseB(nodes);
}

export function parsePhaseBRaw(source: string, file = "<input>"): PhaseBNode[] {
  const parsed = parseSexpr(source, file);
  const rewritten = rewriteAssignments(parsed);
  const nodes = rewritten.map(wrapPhaseBNode);
  return applySugar(nodes);
}

function wrapPhaseBNode(node: SExprNode): PhaseBNode {
  switch (node.kind) {
    case "symbol":
      return wrapSymbol(node);
    case "literal":
      return wrapLiteral(node);
    case "list":
      return wrapList(node);
  }
}

function wrapSymbol(node: SymbolNode): PhaseBNode {
  if (node.name.includes(".")) {
    const parts = node.name.split(".");
    if (parts.some((part) => part.length === 0)) {
      throw new ParseError("invalid dotted identifier", node.loc, "E006");
    }
    return { ...node, phaseKind: "dotted", parts };
  }
  return { ...node, phaseKind: "symbol" };
}

function wrapLiteral(node: LiteralNode): PhaseBNode {
  return { ...node, phaseKind: "literal" };
}

function wrapList(node: ListNode): PhaseBNode {
  const elements: PhaseBListNode["elements"] = node.elements.map(wrapPhaseBNode);
  return {
    kind: "list",
    loc: node.loc,
    elements,
    phaseKind: "list",
    expansionStack: node.expansionStack,
  };
}

export class ParseError extends Error {
  public readonly loc: SourceLoc;
  public readonly code: ReaderErrorCode;
  public expansionStack?: ExpansionFrame[];

  constructor(message: string, loc: SourceLoc, code: ReaderErrorCode = "E001") {
    super(message);
    this.loc = loc;
    this.code = code;
    this.name = "ParseError";
  }
}

interface ParserState {
  source: string;
  index: number;
  length: number;
  line: number;
  column: number;
  file: string;
}

export function parseSexpr(source: string, file = "<input>"): SExprNode[] {
  const state: ParserState = {
    source,
    index: 0,
    length: source.length,
    line: 1,
    column: 1,
    file,
  };

  const nodes: SExprNode[] = [];
  while (true) {
    skipWhitespace(state);
    if (state.index >= state.length) {
      break;
    }
    nodes.push(readNode(state));
  }
  return nodes;
}

function readNode(state: ParserState): SExprNode {
  skipWhitespace(state);
  if (state.index >= state.length) {
    throw createError(state, "unexpected end of input", "E001");
  }
  const char = peek(state);
  if (!char) {
    throw createError(state, "unexpected end of input", "E001");
  }
  if (char === "'") {
    const startLine = state.line;
    const startColumn = state.column;
    readChar(state);
    return readReaderMacro(state, "quote", startLine, startColumn, 1);
  }
  if (char === "`") {
    const startLine = state.line;
    const startColumn = state.column;
    readChar(state);
    return readReaderMacro(state, "quasiquote", startLine, startColumn, 1);
  }
  if (char === "~") {
    const startLine = state.line;
    const startColumn = state.column;
    readChar(state);
    if (peek(state) === "@") {
      readChar(state);
      return readReaderMacro(state, "unquote-splicing", startLine, startColumn, 2);
    }
    return readReaderMacro(state, "unquote", startLine, startColumn, 1);
  }
  if (char === "(") {
    return readList(state);
  }
  if (char === ")") {
    throw createError(state, "unexpected ')' encountered", "E002");
  }
  if (char === '"') {
    return readString(state);
  }
  return readAtom(state);
}


function readReaderMacro(
  state: ParserState,
  macroName: string,
  startLine: number,
  startColumn: number,
  prefixLength: number
): ListNode {
  const node = readNode(state);
  return createReaderMacroList(state.file, startLine, startColumn, prefixLength, macroName, node);
}

function createReaderMacroList(
  file: string,
  startLine: number,
  startColumn: number,
  prefixLength: number,
  macroName: string,
  node: SExprNode
): ListNode {
  const symbolColumn = startColumn + prefixLength;
  const symbolLoc = makeLoc(file, startLine, symbolColumn, startLine, symbolColumn + macroName.length);
  const symbol: SymbolNode = { kind: "symbol", name: macroName, loc: symbolLoc };
  const loc = makeLoc(file, startLine, startColumn, node.loc.endLine, node.loc.endColumn);
  return { kind: "list", elements: [symbol, node], loc };
}
function readList(state: ParserState): ListNode {
  const startLine = state.line;
  const startColumn = state.column;
  readChar(state); // consume '('
  const elements: SExprNode[] = [];
  while (true) {
    skipWhitespace(state);
    const char = peek(state);
    if (!char) {
      throw createError(state, "unclosed '(' delimiter", "E001", startLine, startColumn);
    }
    if (char === ")") {
      readChar(state);
      const loc = makeLoc(state.file, startLine, startColumn, state.line, state.column);
      return { kind: "list", elements, loc };
    }
    elements.push(readNode(state));
  }
}

function readString(state: ParserState): LiteralNode {
  const startLine = state.line;
  const startColumn = state.column;
  readChar(state); // consume '"'
  let value = "";
  while (true) {
    const ch = peek(state);
    if (!ch) {
      throw createError(state, "unclosed string literal", "E004", startLine, startColumn);
    }
    if (ch === '"') {
      readChar(state);
      break;
    }
    if (ch === "\\") {
      readChar(state);
      const escapeLine = state.line;
      const escapeColumn = state.column;
      const escaped = readChar(state);
      value += translateEscape(escaped, state, escapeLine, escapeColumn);
      continue;
    }
    value += readChar(state);
  }
  const loc = makeLoc(state.file, startLine, startColumn, state.line, state.column);
  return { kind: "literal", value, loc };
}

function readAtom(state: ParserState): SExprNode {
  const startLine = state.line;
  const startColumn = state.column;
  let token = "";
  while (true) {
    const ch = peek(state);
    if (!ch || isWhitespace(ch) || ch === "(" || ch === ")" || ch === '"') {
      break;
    }
    token += readChar(state);
  }
  if (token.length === 0) {
    throw createError(state, "invalid token", "E003", startLine, startColumn);
  }
  if (isMalformedNumericToken(token)) {
    throw createError(state, "malformed numeric literal", "E007", startLine, startColumn);
  }
  const value = parseLiteralValue(token);
  const loc = makeLoc(state.file, startLine, startColumn, state.line, state.column);
  if (typeof value === "string" && !isNumericToken(token)) {
    return { kind: "symbol", name: token, loc };
  }
  return { kind: "literal", value, loc };
}

function parseLiteralValue(token: string): string | number | boolean | null {
  if (token === "true") {
    return true;
  }
  if (token === "false") {
    return false;
  }
  if (token === "null") {
    return null;
  }
  if (isNumericToken(token)) {
    return Number(token);
  }
  return token;
}

function isNumericToken(token: string): boolean {
  return /^-?(?:\d+|\d+\.\d+|\.\d+)$/.test(token);
}

function isMalformedNumericToken(token: string): boolean {
  if (!token.includes(".")) {
    return false;
  }
  const normalized = token.startsWith("-") ? token.slice(1) : token;
  if (!/^[0-9.]+$/.test(normalized)) {
    return false;
  }
  return !isNumericToken(token);
}

function translateEscape(ch: string, state: ParserState, line: number, column: number): string {
  switch (ch) {
    case "n":
      return "\n";
    case "r":
      return "\r";
    case "t":
      return "\t";
    case "\"":
      return "\"";
    case "\\":
      return "\\";
    default:
      throw createError(state, `invalid escape sequence '\\${ch}'`, "E005", line, column);
  }
}

function skipWhitespace(state: ParserState): void {
  while (state.index < state.length) {
    const ch = peek(state);
    if (!ch) {
      break;
    }
    if (isWhitespace(ch)) {
      readChar(state);
      continue;
    }
    if (ch === ";") {
      readChar(state);
      skipLineComment(state);
      continue;
    }
    break;
  }
}

function skipLineComment(state: ParserState): void {
  while (state.index < state.length) {
    const ch = readChar(state);
    if (ch === "\n" || ch === "\r") {
      break;
    }
  }
}

function createError(
  state: ParserState,
  message: string,
  code: ReaderErrorCode = "E001",
  startLine = state.line,
  startColumn = state.column
): ParseError {
  const loc = makeLoc(state.file, startLine, startColumn, state.line, state.column);
  return new ParseError(message, loc, code);
}

function peek(state: ParserState): string {
  return state.source[state.index];
}

function readChar(state: ParserState): string {
  const ch = state.source[state.index];
  state.index += 1;
  if (ch === "\n") {
    state.line += 1;
    state.column = 1;
    return ch;
  }
  if (ch === "\r") {
    if (state.index < state.length && state.source[state.index] === "\n") {
      state.index += 1;
    }
    state.line += 1;
    state.column = 1;
    return "\n";
  }
  state.column += 1;
  return ch;
}

function isWhitespace(ch: string): boolean {
  return ch === " " || ch === "\t" || ch === "\n" || ch === "\r";
}

function makeLoc(
  file: string,
  startLine: number,
  startColumn: number,
  endLine: number,
  endColumn: number
): SourceLoc {
  return { file, line: startLine, column: startColumn, endLine, endColumn };
}
