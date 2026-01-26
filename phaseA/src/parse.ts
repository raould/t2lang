import {
  Program,
  ExprStmt,
  LetStarExpr,
  BlockStmt,
  AssignExpr,
  ReturnExpr,
  Literal,
  Identifier,
  Binding,
  Expression,
  Statement,
  Span,
  CallExpr,
  ArrayExpr,
} from "./phaseA1.js";

interface Token {
  type: "paren" | "atom" | "string";
  value: string;
  start: number;
  end: number;
  startLine: number;
  startColumn: number;
  endLine: number;
  endColumn: number;
}

type Node = AtomNode | ListNode;

interface AtomNode {
  type: "atom";
  value: string;
  span: Span;
}

interface ListNode {
  type: "list";
  elements: Node[];
  span: Span;
}

const isWhitespace = (ch: string): boolean => ch === " " || ch === "\n" || ch === "\r" || ch === "\t";

function buildLineStarts(source: string): number[] {
  const starts = [0];
  for (let i = 0; i < source.length; i++) {
    if (source[i] === "\n") {
      starts.push(i + 1);
    }
  }
  return starts;
}

function getLineColumn(pos: number, lineStarts: number[]): { line: number; column: number } {
  let low = 0;
  let high = lineStarts.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const start = lineStarts[mid];
    const nextStart = mid + 1 < lineStarts.length ? lineStarts[mid + 1] : Number.MAX_SAFE_INTEGER;
    if (pos < start) {
      high = mid - 1;
      continue;
    }
    if (pos >= nextStart) {
      low = mid + 1;
      continue;
    }
    return { line: mid + 1, column: pos - start + 1 };
  }
  return { line: 1, column: pos + 1 };
}

function tokenize(source: string): Token[] {
  const tokens: Token[] = [];
  let pos = 0;
  const length = source.length;
  const lineStarts = buildLineStarts(source);

  const makeToken = (type: Token["type"], value: string, start: number, end: number): Token => {
    const startLoc = getLineColumn(start, lineStarts);
    const endLoc = getLineColumn(end, lineStarts);
    return {
      type,
      value,
      start,
      end,
      startLine: startLoc.line,
      startColumn: startLoc.column,
      endLine: endLoc.line,
      endColumn: endLoc.column,
    };
  };

  while (pos < length) {
    const ch = source[pos];
    if (isWhitespace(ch)) {
      pos++;
      continue;
    }
    if (ch === "/" && source[pos + 1] === "/") {
      pos += 2;
      while (pos < length && source[pos] !== "\n") {
        pos++;
      }
      continue;
    }
    if (ch === "/" && source[pos + 1] === "*") {
      pos += 2;
      while (pos < length && !(source[pos] === "*" && source[pos + 1] === "/")) {
        pos++;
      }
      if (source[pos] === "*" && source[pos + 1] === "/") {
        pos += 2;
      }
      continue;
    }
    if (ch === ";") {
      while (pos < length && source[pos] !== "\n") {
        pos++;
      }
      continue;
    }
    if (ch === "(") {
      tokens.push(makeToken("paren", "(", pos, pos + 1));
      pos++;
      continue;
    }
    if (ch === ")") {
      tokens.push(makeToken("paren", ")", pos, pos + 1));
      pos++;
      continue;
    }
    if (ch === '"') {
      const start = pos;
      pos++;
      let value = "";
      while (pos < length && source[pos] !== '"') {
        value += source[pos];
        pos++;
      }
      if (source[pos] === '"') {
        pos++;
      }
      tokens.push(makeToken("string", value, start, pos));
      continue;
    }
    const start = pos;
    let value = "";
    while (pos < length && !isWhitespace(source[pos]) && source[pos] !== "(" && source[pos] !== ")") {
      value += source[pos];
      pos++;
    }
    tokens.push(makeToken("atom", value, start, pos));
  }

  return tokens;
}

class Parser {
  private index = 0;

  constructor(private readonly tokens: Token[], private readonly file: string) {}

  private current(): Token {
    return this.tokens[this.index];
  }

  private advance(): Token {
    return this.tokens[this.index++];
  }

  private parseNode(): Node {
    const tok = this.current();
    if (!tok) {
      throw new Error("Unexpected end of input");
    }
    if (tok.type === "paren") {
      if (tok.value === "(") {
        return this.parseList();
      }
      throw new Error(`Unexpected token ${tok.value}`);
    }
    if (tok.type === "string" || tok.type === "atom") {
      return this.parseAtom();
    }
    throw new Error(`Unsupported token type ${tok.type}`);
  }

  private parseAtom(): AtomNode {
    const tok = this.advance();
    return {
      type: "atom",
      value: tok.value,
      span: {
        start: tok.start,
        end: tok.end,
        source: this.file,
        startLine: tok.startLine,
        startColumn: tok.startColumn,
        endLine: tok.endLine,
        endColumn: tok.endColumn,
      },
    };
  }

  private parseList(): ListNode {
    const open = this.advance();
    const elements: Node[] = [];
    const start = open.start;
    while (true) {
      const tok = this.current();
      if (!tok) {
        throw new Error("Unterminated list");
      }
      if (tok.type === "paren" && tok.value === ")") {
        const close = this.advance();
        return {
          type: "list",
          elements,
          span: {
            start,
            end: close.end,
            source: this.file,
            startLine: open.startLine,
            startColumn: open.startColumn,
            endLine: close.endLine,
            endColumn: close.endColumn,
          },
        };
      }
      elements.push(this.parseNode());
    }
  }

  parseProgram(): Program {
    const root = this.parseNode();
    if (root.type !== "list") {
      throw new Error("Program must be wrapped in (program ...)");
    }
    if (root.elements.length === 0 || root.elements[0].type !== "atom" || root.elements[0].value !== "program") {
      throw new Error("Program must start with (program ...)");
    }
    const body = root.elements.slice(1).map((node) => this.nodeToStatement(node));
    return new Program({ body, span: root.span });
  }

  private nodeToStatement(node: Node): Statement {
    if (node.type === "list" && node.elements.length > 0) {
      const head = node.elements[0];
      if (head.type === "atom") {
        if (head.value === "let*") {
          return this.buildLetStar(node, false);
        }
        if (head.value === "const*") {
          return this.buildLetStar(node, true);
        }
        if (head.value === "assign") {
          return this.buildAssign(node);
        }
        if (head.value === "return") {
          return this.buildReturn(node);
        }
        if (head.value === "block") {
          return this.buildBlock(node);
        }
      }
    }
    return new ExprStmt({ expr: this.nodeToExpression(node), span: node.span });
  }

  private buildLetStar(node: ListNode, isConst: boolean): LetStarExpr {
    const span = node.span;
    const [, bindingsNode, ...body] = node.elements;
    if (!bindingsNode || bindingsNode.type !== "list") {
      throw new Error("let* requires a binding list");
    }
    const bindings: Binding[] = bindingsNode.elements.map((bindingNode) => {
      if (bindingNode.type !== "list" || bindingNode.elements.length < 2) {
        throw new Error("Invalid let* binding");
      }
      const nameNode = bindingNode.elements[0];
      if (nameNode.type !== "atom") {
        throw new Error("Binding name must be an identifier");
      }
      const initNode = bindingNode.elements[1];
      return {
        target: new Identifier({ name: nameNode.value, span: nameNode.span }),
        init: this.nodeToExpression(initNode),
      };
    });
    const statements = body.map((child) => this.nodeToStatement(child));
    return new LetStarExpr({ isConst, bindings, body: statements, span });
  }

  private buildAssign(node: ListNode): AssignExpr {
    const span = node.span;
    const [, targetNode, valueNode] = node.elements;
    if (!targetNode || !valueNode) {
      throw new Error("assign requires target and value");
    }
    return new AssignExpr({
      target: this.nodeToExpression(targetNode),
      value: this.nodeToExpression(valueNode),
      span,
    });
  }

  private buildReturn(node: ListNode): ReturnExpr {
    const span = node.span;
    const [, valueNode] = node.elements;
    return new ReturnExpr({
      span,
      value: valueNode ? this.nodeToExpression(valueNode) : undefined,
    });
  }

  private buildBlock(node: ListNode): BlockStmt {
    const span = node.span;
    const bodyNodes = node.elements.slice(1);
    const statements = bodyNodes.map((child) => this.nodeToStatement(child));
    return new BlockStmt({ statements, span });
  }

  private nodeToExpression(node: Node): Expression {
    if (node.type === "atom") {
      return this.atomToValue(node);
    }
    if (node.elements.length === 0) {
      return new ArrayExpr({ elements: [], span: node.span });
    }
    const head = node.elements[0];
    if (head.type === "atom" && head.value === "array") {
      const values = node.elements.slice(1).map((child) => this.nodeToExpression(child));
      return new ArrayExpr({ elements: values, span: node.span });
    }
    if (node.elements.length === 1) {
      return this.nodeToExpression(node.elements[0]);
    }
    const callee = this.nodeToExpression(head);
    const args = node.elements.slice(1).map((child) => this.nodeToExpression(child));
    return new CallExpr({ callee, args, span: node.span });
  }

  private atomToValue(atom: AtomNode): Expression {
    const { value } = atom;
    const span = atom.span;
    if (/^-?\d+(\.\d+)?$/.test(value)) {
      return new Literal({ value: Number.parseFloat(value), span });
    }
    if (value === "true" || value === "false") {
      return new Literal({ value: value === "true", span });
    }
    if (value === "null") {
      return new Literal({ value: null, span });
    }
    return new Identifier({ name: value, span });
  }
}

export function parseSource(source: string, fileName = "input.t2"): Program {
  const tokens = tokenize(source);
  const parser = new Parser(tokens, fileName);
  return parser.parseProgram();
}