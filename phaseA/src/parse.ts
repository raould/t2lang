import {
  Program,
  ExprStmt,
  LetStarExpr,
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

function tokenize(source: string): Token[] {
  const tokens: Token[] = [];
  let pos = 0;
  const length = source.length;

  while (pos < length) {
    const ch = source[pos];
    if (isWhitespace(ch)) {
      pos++;
      continue;
    }
    if (ch === ";") {
      while (pos < length && source[pos] !== "\n") {
        pos++;
      }
      continue;
    }
    if (ch === "(") {
      tokens.push({ type: "paren", value: "(", start: pos, end: pos + 1 });
      pos++;
      continue;
    }
    if (ch === ")") {
      tokens.push({ type: "paren", value: ")", start: pos, end: pos + 1 });
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
      tokens.push({ type: "string", value, start, end: pos });
      continue;
    }
    const start = pos;
    let value = "";
    while (pos < length && !isWhitespace(source[pos]) && source[pos] !== "(" && source[pos] !== ")") {
      value += source[pos];
      pos++;
    }
    tokens.push({ type: "atom", value, start, end: pos });
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
      span: { start: tok.start, end: tok.end, source: this.file },
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
        return { type: "list", elements, span: { start, end: close.end, source: this.file } };
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
      if (head.type === "atom" && head.value === "let*") {
        return this.buildLetStar(node);
      }
    }
    return new ExprStmt({ expr: this.nodeToExpression(node), span: node.span });
  }

  private buildLetStar(node: ListNode): LetStarExpr {
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
    return new LetStarExpr({ isConst: false, bindings, body: statements, span });
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