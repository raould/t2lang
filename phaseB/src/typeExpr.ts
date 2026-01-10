type Token = { type: "identifier"; value: string } | { type: "punc"; value: string };
type TokenStream = { tokens: Token[]; pos: number };

const PUNCTUATION = new Set(["[", "]", "<", ">", ",", "|", "&", "?", ":", "(", ")"]);
let allowOptionalPostfix = true;

export type TypeAst =
  | { kind: "primitive"; name: string }
  | { kind: "ref"; name: string }
  | { kind: "array"; element: TypeAst }
  | { kind: "nullable"; inner: TypeAst }
  | { kind: "tuple"; elements: TypeAst[] }
  | { kind: "union"; options: TypeAst[] }
  | { kind: "intersection"; options: TypeAst[] }
  | { kind: "apply"; base: TypeAst; args: TypeAst[] }
  | { kind: "keyof"; target: TypeAst }
  | { kind: "typeof"; expr: string }
  | { kind: "indexed"; object: TypeAst; index: TypeAst }
  | { kind: "conditional"; check: TypeAst; extends: TypeAst; trueType: TypeAst; falseType: TypeAst }
  | { kind: "infer"; name: string }
  | { kind: "literal"; value: string | number | boolean };

export function parseTypeExpression(input: string): TypeAst {
  const stream: TokenStream = { tokens: tokenize(input), pos: 0 };
  const expr = parseUnion(stream);
  if (!atEnd(stream)) {
    throw new Error("unexpected token in type expression");
  }
  return expr;
}

function tokenize(input: string): Token[] {
  const tokens: Token[] = [];
  let idx = 0;
  while (idx < input.length) {
    const ch = input[idx];
    if (ch === "" || /\s/.test(ch)) {
      idx += 1;
      continue;
    }
    if (PUNCTUATION.has(ch)) {
      tokens.push({ type: "punc", value: ch });
      idx += 1;
      continue;
    }
    let end = idx;
    while (end < input.length && !/\s/.test(input[end]) && !PUNCTUATION.has(input[end])) {
      end += 1;
    }
    tokens.push({ type: "identifier", value: input.slice(idx, end) });
    idx = end;
  }
  return tokens;
}

function parseUnion(stream: TokenStream): TypeAst {
  const nodes: TypeAst[] = [parseConditional(stream)];
  while (matchPunc(stream, "|")) {
    nodes.push(parseConditional(stream));
  }
  if (nodes.length === 1) {
    return nodes[0];
  }
  return { kind: "union", options: nodes };
}

function parseConditional(stream: TokenStream): TypeAst {
  const check = parseIntersection(stream);
  if (matchIdentifier(stream, "extends")) {
    const extendsType = withOptionalDisabled(() => parseUnion(stream));
    expectPunc(stream, "?");
    const trueType = parseUnion(stream);
    expectPunc(stream, ":");
    const falseType = parseUnion(stream);
    return {
      kind: "conditional",
      check,
      extends: extendsType,
      trueType,
      falseType,
    };
  }
  return check;
}

function parseIntersection(stream: TokenStream): TypeAst {
  const nodes: TypeAst[] = [parsePostfix(stream)];
  while (matchPunc(stream, "&")) {
    nodes.push(parsePostfix(stream));
  }
  if (nodes.length === 1) {
    return nodes[0];
  }
  return { kind: "intersection", options: nodes };
}

function parsePostfix(stream: TokenStream): TypeAst {
  let node = parsePrefix(stream);
  while (true) {
    if (matchPunc(stream, "[")) {
      if (matchPunc(stream, "]")) {
        node = { kind: "array", element: node };
        continue;
      }
      const indexType = parseUnion(stream);
      expectPunc(stream, "]");
      node = { kind: "indexed", object: node, index: indexType };
      continue;
    }
    if (allowOptionalPostfix && matchPunc(stream, "?")) {
      node = { kind: "nullable", inner: node };
      continue;
    }
    if (peekPunc(stream, "<")) {
      node = parseTypeArguments(stream, node);
      continue;
    }
    break;
  }
  return node;
}

function parsePrefix(stream: TokenStream): TypeAst {
  if (matchIdentifier(stream, "keyof")) {
    const target = parsePrefix(stream);
    return { kind: "keyof", target };
  }
  if (matchIdentifier(stream, "typeof")) {
    const identifier = nextIdentifier(stream);
    return { kind: "typeof", expr: identifier };
  }
  if (matchIdentifier(stream, "infer")) {
    const name = nextIdentifier(stream);
    return { kind: "infer", name };
  }
  return parsePrimary(stream);
}

function parsePrimary(stream: TokenStream): TypeAst {
  if (matchPunc(stream, "(")) {
    const expr = parseUnion(stream);
    expectPunc(stream, ")");
    return expr;
  }
  if (matchPunc(stream, "[")) {
    const elements: TypeAst[] = [];
    if (!peekPunc(stream, "]")) {
      elements.push(parseUnion(stream));
      while (matchPunc(stream, ",")) {
        elements.push(parseUnion(stream));
      }
    }
    expectPunc(stream, "]");
    return { kind: "tuple", elements };
  }
  const ident = nextIdentifier(stream);
  return identifierToType(ident);
}

function parseTypeArguments(stream: TokenStream, base: TypeAst): TypeAst {
  expectPunc(stream, "<");
  const args: TypeAst[] = [];
  if (!peekPunc(stream, ">")) {
    args.push(parseUnion(stream));
    while (matchPunc(stream, ",")) {
      args.push(parseUnion(stream));
    }
  }
  expectPunc(stream, ">");
  return { kind: "apply", base, args };
}

const primitiveNames = new Set([
  "number",
  "string",
  "boolean",
  "void",
  "null",
  "undefined",
  "any",
  "unknown",
  "never",
  "object",
  "symbol",
  "bigint",
]);

function identifierToType(name: string): TypeAst {
  const normalized = name.toLowerCase();
  if (primitiveNames.has(normalized)) {
    return { kind: "primitive", name: normalized };
  }
  if (normalized === "true" || normalized === "false") {
    return { kind: "literal", value: normalized === "true" };
  }
  if (isQuotedString(name)) {
    return { kind: "literal", value: parseQuotedString(name) };
  }
  if (isNumericToken(name)) {
    return { kind: "literal", value: Number(name) };
  }
  return { kind: "ref", name };
}

function isQuotedString(token: string): boolean {
  return token.length >= 2 && token.startsWith("\"") && token.endsWith("\"");
}

function parseQuotedString(token: string): string {
  try {
    return JSON.parse(token);
  } catch {
    return token.slice(1, -1);
  }
}

function nextIdentifier(stream: TokenStream): string {
  const token = stream.tokens[stream.pos];
  if (!token || token.type !== "identifier") {
    throw new Error("expected type identifier");
  }
  stream.pos += 1;
  return token.value;
}

function matchIdentifier(stream: TokenStream, value: string): boolean {
  const token = stream.tokens[stream.pos];
  if (token && token.type === "identifier" && token.value === value) {
    stream.pos += 1;
    return true;
  }
  return false;
}

function matchPunc(stream: TokenStream, value: string): boolean {
  const token = stream.tokens[stream.pos];
  if (token && token.type === "punc" && token.value === value) {
    stream.pos += 1;
    return true;
  }
  return false;
}

function peekPunc(stream: TokenStream, value: string): boolean {
  const token = stream.tokens[stream.pos];
  return Boolean(token && token.type === "punc" && token.value === value);
}

function expectPunc(stream: TokenStream, value: string): void {
  if (!matchPunc(stream, value)) {
    throw new Error(`expected '${value}'`);
  }
}

const numericRegex = /^-?(?:\d+|\d+\.\d+|\.\d+)$/;

function isNumericToken(token: string): boolean {
  return numericRegex.test(token);
}

function atEnd(stream: TokenStream): boolean {
  return stream.pos >= stream.tokens.length;
}

function withOptionalDisabled<T>(action: () => T): T {
  const previous = allowOptionalPostfix;
  allowOptionalPostfix = false;
  try {
    return action();
  } finally {
    allowOptionalPostfix = previous;
  }
}
