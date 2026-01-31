type Token = { type: "identifier"; value: string } | { type: "punc"; value: string };

type TokenStream = {
  tokens: Token[];
  pos: number;
};

const PUNCTUATION = new Set(["[", "]", "<", ">", ",", "|", "&", "?", "(", ")"]);

export type TypeAst =
  | { kind: "primitive"; name: string }
  | { kind: "ref"; name: string }
  | { kind: "array"; element: TypeAst }
  | { kind: "nullable"; inner: TypeAst }
  | { kind: "tuple"; elements: TypeAst[] }
  | { kind: "union"; options: TypeAst[] }
  | { kind: "intersection"; options: TypeAst[] }
  | { kind: "apply"; base: TypeAst; args: TypeAst[] };

export function parseTypeExpression(input: string): TypeAst {
  const stream = { tokens: tokenize(input), pos: 0 };
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
  const nodes: TypeAst[] = [parseIntersection(stream)];
  while (matchPunc(stream, "|")) {
    nodes.push(parseIntersection(stream));
  }
  if (nodes.length === 1) {
    return nodes[0];
  }
  return { kind: "union", options: nodes };
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
  let node = parsePrimary(stream);
  while (true) {
    if (matchPunc(stream, "[")) {
      expectPunc(stream, "]");
      node = { kind: "array", element: node };
      continue;
    }
    if (matchPunc(stream, "?")) {
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

function identifierToType(name: string): TypeAst {
  const normalized = name.toLowerCase();
  if (primitiveNames.has(normalized)) {
    return { kind: "primitive", name: normalized };
  }
  return { kind: "ref", name };
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

function nextIdentifier(stream: TokenStream): string {
  const token = stream.tokens[stream.pos];
  if (!token || token.type !== "identifier") {
    throw new Error("expected type identifier");
  }
  stream.pos += 1;
  return token.value;
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

function atEnd(stream: TokenStream): boolean {
  return stream.pos >= stream.tokens.length;
}
