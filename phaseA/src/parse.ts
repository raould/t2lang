import {
  Program,
  ExprStmt,
  LetStarExpr,
  BlockStmt,
  AssignExpr,
  ReturnExpr,
  IfStmt,
  WhileStmt,
  ForClassic,
  ForOf,
  ForAwait,
  SwitchStmt,
  SwitchCase,
  PropExpr,
  IndexExpr,
  ObjectExpr,
  NewExpr,
  ThrowExpr,
  TryCatchExpr,
  Literal,
  Identifier,
  Binding,
  BindingTarget,
  ArrayPattern,
  ObjectPattern,
  RestPattern,
  CatchClause,
  FinallyClause,
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
        if (head.value === "for") {
          return this.buildForLoop(node);
        }
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
        if (head.value === "if") {
          return this.buildIf(node);
        }
        if (head.value === "while") {
          return this.buildWhile(node);
        }
        if (head.value === "switch") {
          return this.buildSwitch(node);
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
    const bindings: Binding[] = bindingsNode.elements.map((bindingNode) => this.nodeToBinding(bindingNode));
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

  private buildIf(node: ListNode): IfStmt {
    const span = node.span;
    const [, testNode, consequentNode, alternateNode] = node.elements;
    if (!testNode || !consequentNode) {
      throw new Error("if requires a test and consequent statement");
    }
    const test = this.nodeToExpression(testNode);
    const consequent = this.nodeToStatement(consequentNode);
    const alternate = alternateNode ? this.nodeToStatement(alternateNode) : undefined;
    return new IfStmt({ test, consequent, alternate, span });
  }

  private buildWhile(node: ListNode): WhileStmt {
    const span = node.span;
    const [, conditionNode, ...bodyNodes] = node.elements;
    if (!conditionNode || bodyNodes.length === 0) {
      throw new Error("while requires a condition and body");
    }
    const condition = this.nodeToExpression(conditionNode);
    const body = this.buildStatementSequence(bodyNodes, span);
    return new WhileStmt({ condition, body, span });
  }

  private buildForLoop(node: ListNode): Statement {
    const kindNode = node.elements[1];
    if (!kindNode || kindNode.type !== "atom") {
      throw new Error("for loop requires a kind");
    }
    if (kindNode.value === "classic") {
      return this.buildForClassic(node);
    }
    if (kindNode.value === "of") {
      return this.buildForOf(node);
    }
    if (kindNode.value === "await") {
      return this.buildForAwait(node);
    }
    throw new Error(`Unsupported for loop kind ${kindNode.value}`);
  }

  private buildForClassic(node: ListNode): ForClassic {
    const span = node.span;
    const args = node.elements.slice(2);
    if (args.length === 0) {
      throw new Error("for classic requires a body");
    }
    const bodyNode = args[args.length - 1];
    const clauseNodes = args.slice(0, -1);
    if (clauseNodes.length > 3) {
      throw new Error("for classic accepts at most init, condition, and update");
    }
    const init = clauseNodes[0] ? this.nodeToStatement(clauseNodes[0]) : undefined;
    const condition = clauseNodes[1] ? this.nodeToExpression(clauseNodes[1]) : undefined;
    const update = clauseNodes[2] ? this.nodeToExpression(clauseNodes[2]) : undefined;
    const body = this.nodeToStatement(bodyNode);
    return new ForClassic({ init, condition, update, body, span });
  }

  private buildForOf(node: ListNode): ForOf {
    const span = node.span;
    const clauseNode = node.elements[2];
    const bodyNode = node.elements[3];
    if (!clauseNode || clauseNode.type !== "list") {
      throw new Error("for-of requires a binding clause");
    }
    if (!bodyNode) {
      throw new Error("for-of requires a body");
    }
    const [bindingNode, iterableNode] = clauseNode.elements;
    if (!bindingNode || !iterableNode) {
      throw new Error("for-of clause requires a binding target and iterable");
    }
    const binding = this.nodeToBinding(bindingNode);
    const iterable = this.nodeToExpression(iterableNode);
    const body = this.nodeToStatement(bodyNode);
    return new ForOf({ binding, iterable, body, span });
  }

  private buildForAwait(node: ListNode): ForAwait {
    const span = node.span;
    const clauseNode = node.elements[2];
    const bodyNode = node.elements[3];
    if (!clauseNode || clauseNode.type !== "list") {
      throw new Error("for-await requires a binding clause");
    }
    if (!bodyNode) {
      throw new Error("for-await requires a body");
    }
    const [bindingNode, iterableNode] = clauseNode.elements;
    if (!bindingNode || !iterableNode) {
      throw new Error("for-await clause requires a binding target and iterable");
    }
    const binding = this.nodeToBinding(bindingNode);
    const iterable = this.nodeToExpression(iterableNode);
    const body = this.nodeToStatement(bodyNode);
    return new ForAwait({ binding, iterable, body, span });
  }

  private nodeToBinding(node: Node): Binding {
    if (node.type !== "list" || node.elements.length === 0) {
      throw new Error("Invalid binding");
    }
    if (node.elements.length > 2) {
      throw new Error("Binding can only have a target and optional initializer");
    }
    const targetNode = node.elements[0];
    const initNode = node.elements[1];
    return {
      target: this.nodeToBindingTarget(targetNode),
      init: initNode ? this.nodeToExpression(initNode) : undefined,
    };
  }

  private nodeToBindingTarget(node: Node): BindingTarget {
    if (node.type === "atom") {
      return new Identifier({ name: node.value, span: node.span });
    }
    if (node.type === "list" && node.elements.length > 0) {
      const head = node.elements[0];
      if (head.type === "atom") {
        if (head.value === "array-pattern") {
          return this.buildArrayPattern(node);
        }
        if (head.value === "object-pattern") {
          return this.buildObjectPattern(node);
        }
        if (head.value === "rest") {
          return this.buildRestPattern(node);
        }
      }
    }
    throw new Error("Invalid binding target");
  }

  private isBindingCandidate(node: ListNode): boolean {
    const head = node.elements[0];
    if (head.type !== "atom") {
      return false;
    }
    const expressionHeads = new Set([
      "call",
      "array",
      "object",
      "prop",
      "index",
      "new",
      "throw",
      "try",
    ]);
    if (expressionHeads.has(head.value)) {
      return false;
    }
    return true;
  }

  private buildArrayPattern(node: ListNode): ArrayPattern {
    const span = node.span;
    const elements: BindingTarget[] = [];
    let rest: BindingTarget | undefined;
    for (const child of node.elements.slice(1)) {
      if (child.type === "list" && child.elements.length > 0) {
        const head = child.elements[0];
        if (head.type === "atom" && head.value === "rest") {
          rest = this.buildRestPattern(child);
          continue;
        }
      }
      elements.push(this.nodeToBindingTarget(child));
    }
    return new ArrayPattern({ elements, span, rest });
  }

  private buildObjectPattern(node: ListNode): ObjectPattern {
    const span = node.span;
    const properties: { key: string; target: BindingTarget }[] = [];
    let rest: BindingTarget | undefined;
    for (const child of node.elements.slice(1)) {
      if (child.type === "list" && child.elements.length > 0) {
        const head = child.elements[0];
        if (head.type === "atom" && head.value === "rest") {
          rest = this.buildRestPattern(child);
          continue;
        }
      }
      if (child.type !== "list" || child.elements.length < 2) {
        throw new Error("object-pattern fields must be (key target)");
      }
      const keyNode = child.elements[0];
      if (keyNode.type !== "atom") {
        throw new Error("object-pattern field key must be a string literal");
      }
      const targetNode = child.elements[1];
      properties.push({ key: keyNode.value, target: this.nodeToBindingTarget(targetNode) });
    }
    return new ObjectPattern({ properties, span, rest });
  }

  private buildRestPattern(node: ListNode): RestPattern {
    const span = node.span;
    const [, targetNode] = node.elements;
    if (!targetNode) {
      throw new Error("rest target requires a binding target");
    }
    return new RestPattern({ target: this.nodeToBindingTarget(targetNode), span });
  }

  private buildStatementSequence(nodes: Node[], span: Span): Statement {
    if (nodes.length === 1) {
      return this.nodeToStatement(nodes[0]);
    }
    const statements = nodes.map((child) => this.nodeToStatement(child));
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
    if (head.type === "atom") {
      if (head.value === "array") {
        const values = node.elements.slice(1).map((child) => this.nodeToExpression(child));
        return new ArrayExpr({ elements: values, span: node.span });
      }
      if (head.value === "object") {
        return this.buildObject(node);
      }
      if (head.value === "prop") {
        return this.buildProp(node);
      }
      if (head.value === "index") {
        return this.buildIndex(node);
      }
      if (head.value === "new") {
        return this.buildNew(node);
      }
      if (head.value === "call") {
        return this.buildCall(node);
      }
      if (head.value === "throw") {
        return this.buildThrow(node);
      }
      if (head.value === "try") {
        return this.buildTry(node);
      }
    }
    if (node.elements.length === 1) {
      return this.nodeToExpression(node.elements[0]);
    }
    const callee = this.nodeToExpression(head);
    const args = node.elements.slice(1).map((child) => this.nodeToExpression(child));
    return new CallExpr({ callee, args, span: node.span });
  }

  private buildCall(node: ListNode): CallExpr {
    const span = node.span;
    const [, calleeNode, ...argNodes] = node.elements;
    if (!calleeNode) {
      throw new Error("call requires a callee");
    }
    const callee = this.nodeToExpression(calleeNode);
    const args = argNodes.map((child) => this.nodeToExpression(child));
    return new CallExpr({ callee, args, span });
  }

  private buildProp(node: ListNode): PropExpr {
    const span = node.span;
    const [, objectNode, nameNode] = node.elements;
    if (!objectNode || !nameNode || nameNode.type !== "atom") {
      throw new Error("prop requires an object and a literal property name");
    }
    return new PropExpr({
      object: this.nodeToExpression(objectNode),
      name: nameNode.value,
      maybeNull: false,
      span,
    });
  }

  private buildIndex(node: ListNode): IndexExpr {
    const span = node.span;
    const [, objectNode, indexNode] = node.elements;
    if (!objectNode || !indexNode) {
      throw new Error("index requires object and index expressions");
    }
    return new IndexExpr({
      object: this.nodeToExpression(objectNode),
      index: this.nodeToExpression(indexNode),
      maybeNull: false,
      span,
    });
  }

  private buildObject(node: ListNode): ObjectExpr {
    const span = node.span;
    const fieldNodes = node.elements.slice(1);
    const fields = fieldNodes.map((fieldNode) => {
      if (fieldNode.type !== "list" || fieldNode.elements.length < 2) {
        throw new Error("object fields must be (key value)");
      }
      const keyNode = fieldNode.elements[0];
      if (keyNode.type !== "atom") {
        throw new Error("object field key must be a string literal");
      }
      const valueNode = fieldNode.elements[1];
      return { key: keyNode.value, value: this.nodeToExpression(valueNode) };
    });
    return new ObjectExpr({ fields, span });
  }

  private buildNew(node: ListNode): NewExpr {
    const span = node.span;
    const [, calleeNode, ...argNodes] = node.elements;
    if (!calleeNode) {
      throw new Error("new requires a callee");
    }
    const callee = this.nodeToExpression(calleeNode);
    const args = argNodes.map((child) => this.nodeToExpression(child));
    return new NewExpr({ callee, args, span });
  }

  private buildThrow(node: ListNode): ThrowExpr {
    const span = node.span;
    const [, argumentNode] = node.elements;
    if (!argumentNode) {
      throw new Error("throw requires an argument");
    }
    const argument = this.nodeToExpression(argumentNode);
    return new ThrowExpr({ argument, span });
  }

  private buildTry(node: ListNode): TryCatchExpr {
    const span = node.span;
    const bodyNode = node.elements[1];
    if (!bodyNode) {
      throw new Error("try requires a body statement");
    }
    const body = this.nodeToStatement(bodyNode);
    let catchClause: CatchClause | undefined;
    let finallyClause: FinallyClause | undefined;
    for (let i = 2; i < node.elements.length; i++) {
      const child = node.elements[i];
      if (child.type !== "list" || child.elements.length === 0) {
        throw new Error("try child must be catch or finally");
      }
      const head = child.elements[0];
      if (head.type !== "atom") {
        throw new Error("try child must start with an atom");
      }
      if (head.value === "catch") {
        catchClause = this.buildCatchClause(child);
        continue;
      }
      if (head.value === "finally") {
        finallyClause = this.buildFinallyClause(child);
        continue;
      }
      throw new Error(`Unknown try child ${head.value}`);
    }
    return new TryCatchExpr({ body, span, catchClause, finallyClause });
  }

  private buildSwitch(node: ListNode): SwitchStmt {
    const span = node.span;
    const discriminantNode = node.elements[1];
    if (!discriminantNode) {
      throw new Error("switch requires a discriminant");
    }
    const discriminant = this.nodeToExpression(discriminantNode);
    const cases: SwitchCase[] = [];
    for (let i = 2; i < node.elements.length; i++) {
      const child = node.elements[i];
      if (child.type !== "list" || child.elements.length === 0) {
        throw new Error("switch cases must be non-empty lists");
      }
      const head = child.elements[0];
      if (head.type !== "atom") {
        throw new Error("switch case head must be an atom");
      }
      if (head.value === "case") {
        const testNode = child.elements[1];
        if (!testNode) {
          throw new Error("case requires an expression");
        }
        const statements = child.elements.slice(2).map((stmt) => this.nodeToStatement(stmt));
        cases.push({ test: this.nodeToExpression(testNode), consequent: statements });
        continue;
      }
      if (head.value === "default") {
        const statements = child.elements.slice(1).map((stmt) => this.nodeToStatement(stmt));
        cases.push({ test: null, consequent: statements });
        continue;
      }
      throw new Error(`Unknown switch clause ${head.value}`);
    }
    return new SwitchStmt({ discriminant, cases, span });
  }

  private buildCatchClause(node: ListNode): CatchClause {
    const [, ...rest] = node.elements;
    let binding: Binding | undefined;
    let bodyStartIndex = 1;
    if (rest.length > 0 && rest[0].type === "list" && rest[0].elements.length <= 2 && this.isBindingCandidate(rest[0])) {
      binding = this.nodeToBinding(rest[0]);
      bodyStartIndex = 2;
    }
    const bodyNodes = node.elements.slice(bodyStartIndex);
    const body = bodyNodes.map((stmt) => this.nodeToStatement(stmt));
    return { binding, body };
  }

  private buildFinallyClause(node: ListNode): FinallyClause {
    const [, ...bodyNodes] = node.elements;
    const body = bodyNodes.map((child) => this.nodeToStatement(child));
    return { body };
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