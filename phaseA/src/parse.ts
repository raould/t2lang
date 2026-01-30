import {
  Program,
  ExprStmt,
  LetStarExpr,
  BlockStmt,
  AssignExpr,
  ReturnExpr,
  BreakStmt,
  ContinueStmt,
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
  ImportStmt,
  ExportStmt,
  NamedImport,
  NamedExport,
  Binding,
  BindingTarget,
  ArrayPattern,
  ObjectPattern,
  RestPattern,
  CatchClause,
  FinallyClause,
  Expression,
  Statement,
  ClassMember,
  Span,
  CallExpr,
  ArrayExpr,
  FunctionExpr,
  ClassExpr,
  SpreadExpr,
  TernaryExpr,
  AwaitExpr,
  YieldExpr,
  TypeAliasStmt,
  TypeAssertExpr,
  TypeApp,
  TypeField,
  TypeFunction,
  TypeIntersection,
  TypeLiteral,
  TypeMapped,
  TypeNode,
  TypeObject,
  TypeParam,
  TypePrimitive,
  TypeRef,
  TypeUnion,
  InterfaceStmt,
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
  tokenType: Token["type"];
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
    if (ch === "'") {
      const start = pos;
      pos++;
      let value = "";
      while (pos < length && source[pos] !== "'") {
        value += source[pos];
        pos++;
      }
      if (source[pos] === "'") {
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
      tokenType: tok.type,
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
        if (head.value === "break") {
          return this.buildBreak(node);
        }
        if (head.value === "continue") {
          return this.buildContinue(node);
        }
        if (head.value === "fn") {
          return this.buildFunction(node);
        }
        if (head.value === "class") {
          return this.buildClass(node);
        }
        if (head.value === "type-alias") {
          return this.buildTypeAlias(node);
        }
        if (head.value === "type-interface") {
          return this.buildTypeInterface(node);
        }
        if (head.value === "import" || head.value === "import-default" || head.value === "import-named" || head.value === "import-all") {
          return this.buildImport(node);
        }
        if (head.value === "export" || head.value === "export-default") {
          return this.buildExport(node);
        }
      }
    }
    return new ExprStmt({ expr: this.nodeToExpression(node), span: node.span });
  }

  private buildLetStar(node: ListNode, isConst: boolean): LetStarExpr {
    const span = node.span;
    const entries = node.elements.slice(1);
    const bindings: Binding[] = [];
    let bodyStartIndex = 0;
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];
      if (this.isBindingEntry(entry)) {
        bindings.push(this.nodeToBinding(entry));
        bodyStartIndex = i + 1;
        continue;
      }
      bodyStartIndex = i;
      break;
    }
    const statements = entries.slice(bodyStartIndex).map((child) => this.nodeToStatement(child));
    return new LetStarExpr({ isConst, bindings, body: statements, span });
  }

  private isBindingEntry(node: Node): boolean {
    if (node.type !== "list") {
      return false;
    }
    if (node.elements.length === 0 || node.elements.length > 2) {
      return false;
    }
    try {
      this.nodeToBindingTarget(node.elements[0]);
      return true;
    } catch {
      return false;
    }
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
      if (keyNode.type !== "atom" || keyNode.tokenType !== "string") {
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
      if (head.value === "spread") {
        return this.buildSpread(node);
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
      if (head.value === "ternary") {
        return this.buildTernary(node);
      }
      if (head.value === "await") {
        return this.buildAwait(node);
      }
      if (head.value === "yield" || head.value === "yield*") {
        return this.buildYield(node, head.value === "yield*");
      }
      if (head.value === "throw") {
        return this.buildThrow(node);
      }
      if (head.value === "try") {
        return this.buildTry(node);
      }
      if (head.value === "fn") {
        return this.buildFunction(node);
      }
      if (head.value === "class") {
        return this.buildClass(node);
      }
      if (head.value === "type-assert") {
        return this.buildTypeAssert(node);
      }
      if (head.value === "type-app") {
        return this.buildTypeApp(node, (child) => this.nodeToExpression(child));
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
    if (!objectNode || !nameNode || nameNode.type !== "atom" || nameNode.tokenType !== "string") {
      throw new Error("prop requires an object and a string literal property name");
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
      if (keyNode.type !== "atom" || keyNode.tokenType !== "string") {
        throw new Error("object field key must be a string literal");
      }
      const valueNode = fieldNode.elements[1];
      return { key: keyNode.value, value: this.nodeToExpression(valueNode) };
    });
    return new ObjectExpr({ fields, span });
  }

  private buildSpread(node: ListNode): SpreadExpr {
    const span = node.span;
    const [, kindNode, exprNode] = node.elements;
    if (!kindNode || kindNode.type !== "atom" || !exprNode) {
      throw new Error("spread requires a kind and an expression");
    }
    if (kindNode.value !== "array" && kindNode.value !== "object" && kindNode.value !== "rest") {
      throw new Error("spread kind must be array, object, or rest");
    }
    return new SpreadExpr({ kind: kindNode.value as "array" | "object" | "rest", expr: this.nodeToExpression(exprNode), span });
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

  private buildTernary(node: ListNode): TernaryExpr {
    const span = node.span;
    const [, testNode, consequentNode, alternateNode] = node.elements;
    if (!testNode || !consequentNode || !alternateNode) {
      throw new Error("ternary requires test, consequent, and alternate expressions");
    }
    return new TernaryExpr({
      test: this.nodeToExpression(testNode),
      consequent: this.nodeToExpression(consequentNode),
      alternate: this.nodeToExpression(alternateNode),
      span,
    });
  }

  private buildAwait(node: ListNode): AwaitExpr {
    const span = node.span;
    const [, argumentNode] = node.elements;
    if (!argumentNode) {
      throw new Error("await requires an argument");
    }
    return new AwaitExpr({ argument: this.nodeToExpression(argumentNode), span });
  }

  private buildYield(node: ListNode, delegate: boolean): YieldExpr {
    const span = node.span;
    const [, argumentNode] = node.elements;
    const argument = argumentNode ? this.nodeToExpression(argumentNode) : undefined;
    return new YieldExpr({ delegate, argument, span });
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

  private buildBreak(node: ListNode): Statement {
    const span = node.span;
    const labelNode = node.elements[1];
    const label = labelNode ? this.nodeToIdentifier(labelNode, "break label") : undefined;
    return new BreakStmt({ label, span });
  }

  private buildContinue(node: ListNode): Statement {
    const span = node.span;
    const labelNode = node.elements[1];
    const label = labelNode ? this.nodeToIdentifier(labelNode, "continue label") : undefined;
    return new ContinueStmt({ label, span });
  }

  private buildFunction(node: ListNode): FunctionExpr {
    const span = node.span;
    const [, signatureNode, ...rest] = node.elements;
    if (!signatureNode || signatureNode.type !== "list") {
      throw new Error("fn requires a signature list");
    }
    const signature = this.parseFnSignature(signatureNode);
    let entries = rest;
    let typeParams: TypeParam[] | undefined;
    if (entries.length > 0 && this.isTypeParamsList(entries[0])) {
      typeParams = this.parseTypeParams(entries[0]);
      entries = entries.slice(1);
    }
    const body = entries.map((child) => this.nodeToStatement(child));
    return new FunctionExpr({ signature, body, span, typeParams });
  }

  private parseFnSignature(node: ListNode): { parameters: { name: Identifier; typeAnnotation?: TypeNode }[]; returnType?: TypeNode } {
    const entries = node.elements;
    let returnType: TypeNode | undefined;
    let paramNodes = entries;
    if (entries.length > 0 && this.isTypeNodeList(entries[entries.length - 1])) {
      returnType = this.nodeToType(entries[entries.length - 1]);
      paramNodes = entries.slice(0, -1);
    }
    const parameters = paramNodes.map((paramNode) => this.parseFnParam(paramNode));
    return { parameters, returnType };
  }

  private parseFnParam(node: Node): { name: Identifier; typeAnnotation?: TypeNode } {
    if (node.type !== "list" || node.elements.length === 0) {
      throw new Error("fn param must be a list with a name");
    }
    const [nameNode, typeNode] = node.elements;
    const name = this.nodeToIdentifier(nameNode, "fn param name");
    const typeAnnotation = typeNode ? this.nodeToType(typeNode) : undefined;
    return { name, typeAnnotation };
  }

  private buildClass(node: ListNode): ClassExpr {
    const span = node.span;
    const [, nameNode, bodyNode] = node.elements;
    if (!nameNode || !bodyNode || bodyNode.type !== "list") {
      throw new Error("class requires a name and class-body");
    }
    const name = this.nodeToIdentifier(nameNode, "class name");
    const body = this.buildClassBody(bodyNode);
    return new ClassExpr({ name, body, span });
  }

  private buildClassBody(node: ListNode): { statements: ClassMember[] } {
    if (node.elements.length === 0 || node.elements[0].type !== "atom" || node.elements[0].value !== "class-body") {
      throw new Error("class-body must start with (class-body ...)");
    }
    const statements: ClassMember[] = [];
    for (const child of node.elements.slice(1)) {
      const stmt = this.nodeToStatement(child);
      if (
        stmt instanceof BlockStmt ||
        stmt instanceof IfStmt ||
        stmt instanceof WhileStmt ||
        stmt instanceof LetStarExpr ||
        stmt instanceof ForClassic ||
        stmt instanceof ForOf ||
        stmt instanceof ForAwait ||
        stmt instanceof SwitchStmt ||
        stmt instanceof AssignExpr ||
        stmt instanceof ReturnExpr ||
        stmt instanceof BreakStmt ||
        stmt instanceof ContinueStmt ||
        stmt instanceof ExprStmt ||
        stmt instanceof FunctionExpr ||
        stmt instanceof ClassExpr
      ) {
        statements.push(stmt);
      } else {
        throw new Error("class-body contains unsupported member statement");
      }
    }
    return { statements };
  }

  private buildTypeInterface(node: ListNode): InterfaceStmt {
    const span = node.span;
    const [, nameNode, bodyNode] = node.elements;
    if (!nameNode || !bodyNode || bodyNode.type !== "list") {
      throw new Error("type-interface requires a name and interface-body");
    }
    const name = this.nodeToIdentifier(nameNode, "type-interface name");
    const body = this.buildInterfaceBody(bodyNode);
    return new InterfaceStmt({ name, body, span });
  }

  private buildInterfaceBody(node: ListNode): { fields: TypeField[] } {
    if (node.elements.length === 0 || node.elements[0].type !== "atom" || node.elements[0].value !== "interface-body") {
      throw new Error("interface-body must start with (interface-body ...)");
    }
    const fields = node.elements.slice(1).map((child) => this.nodeToTypeField(child));
    return { fields };
  }

  private buildImport(node: ListNode): ImportStmt {
    const span = node.span;
    const head = node.elements[0];
    if (head.type !== "atom") {
      throw new Error("Import statement must start with an atom");
    }
    const kind = head.value;
    if (kind === "import") {
      const specNode = node.elements[1];
      if (!specNode || specNode.type !== "list") {
        throw new Error("import requires an import-spec list");
      }
      const spec = this.parseImportSpec(specNode);
      return new ImportStmt({ spec, span });
    }
    if (kind === "import-default") {
      const nameNode = node.elements[1];
      const sourceNode = node.elements[2];
      if (!nameNode || !sourceNode) {
        throw new Error("import-default requires a name and module specifier");
      }
      const name = this.nodeToIdentifier(nameNode, "import-default name");
      const source = this.parseModuleSpecifier(sourceNode);
      return new ImportStmt({ spec: { source, defaultBinding: name }, span });
    }
    if (kind === "import-named") {
      const listNode = node.elements[1];
      const sourceNode = node.elements[2];
      if (!listNode || listNode.type !== "list" || !sourceNode) {
        throw new Error("import-named requires a list of names and module specifier");
      }
      const named: NamedImport[] = listNode.elements.map((child) => this.parseNamedImport(child));
      const source = this.parseModuleSpecifier(sourceNode);
      return new ImportStmt({ spec: { source, named }, span });
    }
    if (kind === "import-all") {
      const aliasNode = node.elements[1];
      const sourceNode = node.elements[2];
      if (!aliasNode || !sourceNode) {
        throw new Error("import-all requires an alias and module specifier");
      }
      const alias = this.nodeToIdentifier(aliasNode, "import-all alias");
      const source = this.parseModuleSpecifier(sourceNode);
      return new ImportStmt({ spec: { source, namespaceBinding: alias }, span });
    }
    throw new Error(`Unknown import kind ${kind}`);
  }

  private buildExport(node: ListNode): ExportStmt {
    const span = node.span;
    const head = node.elements[0];
    if (head.type !== "atom") {
      throw new Error("Export statement must start with an atom");
    }
    if (head.value === "export") {
      const specNode = node.elements[1];
      if (!specNode || specNode.type !== "list") {
        throw new Error("export requires an export-spec list");
      }
      const spec = this.parseExportSpec(specNode);
      return new ExportStmt({ spec, span });
    }
    if (head.value === "export-default") {
      const declarationNode = node.elements[1];
      if (!declarationNode) {
        throw new Error("export-default requires an expression");
      }
      const declaration = this.nodeToExpression(declarationNode);
      return new ExportStmt({ spec: { defaultExport: declaration }, span });
    }
    const nameNode = node.elements[1];
    if (!nameNode) {
      throw new Error("export requires a name");
    }
    const local = this.nodeToExpression(nameNode);
    const identifier = this.ensureIdentifierExpression(local, "export name");
    const named: NamedExport[] = [{ exported: identifier.name, local: identifier }];
    return new ExportStmt({ spec: { named }, span });
  }

  private parseImportSpec(node: ListNode): { source: Literal; defaultBinding?: Identifier; namespaceBinding?: Identifier; named?: NamedImport[] } {
    const head = node.elements[0];
    if (!head || head.type !== "atom" || head.value !== "import-spec") {
      throw new Error("import-spec must start with (import-spec ...)");
    }
    let source: Literal | undefined;
    let defaultBinding: Identifier | undefined;
    let namespaceBinding: Identifier | undefined;
    let named: NamedImport[] | undefined;
    for (const child of node.elements.slice(1)) {
      if (child.type === "atom") {
        if (child.tokenType === "string") {
          source = this.nodeToLiteral(child);
          continue;
        }
        defaultBinding = new Identifier({ name: child.value, span: child.span });
        continue;
      }
      if (child.type === "list" && child.elements.length > 0) {
        const specHead = child.elements[0];
        if (specHead.type === "atom") {
          if (specHead.value === "default") {
            const nameNode = child.elements[1];
            if (!nameNode) {
              throw new Error("import-spec default requires a name");
            }
            defaultBinding = this.nodeToIdentifier(nameNode, "import default name");
            continue;
          }
          if (specHead.value === "namespace") {
            const nameNode = child.elements[1];
            if (!nameNode) {
              throw new Error("import-spec namespace requires a name");
            }
            namespaceBinding = this.nodeToIdentifier(nameNode, "import namespace name");
            continue;
          }
          if (specHead.value === "named") {
            named = child.elements.slice(1).map((entry) => this.parseNamedImport(entry));
            continue;
          }
        }
        if (!named) {
          named = child.elements.map((entry) => this.parseNamedImport(entry));
          continue;
        }
      }
      const expr = this.nodeToExpression(child);
      if (expr instanceof Literal) {
        source = expr;
        continue;
      }
      throw new Error("import-spec entries must be literals, identifiers, or named/default/namespace lists");
    }
    if (!source) {
      throw new Error("import-spec requires a module specifier literal");
    }
    return { source, defaultBinding, namespaceBinding, named };
  }

  private parseExportSpec(node: ListNode): { source?: Literal; named?: NamedExport[]; defaultExport?: Expression; namespaceExport?: Identifier } {
    const head = node.elements[0];
    if (!head || head.type !== "atom" || head.value !== "export-spec") {
      throw new Error("export-spec must start with (export-spec ...)");
    }
    let source: Literal | undefined;
    let named: NamedExport[] | undefined;
    let defaultExport: Expression | undefined;
    let namespaceExport: Identifier | undefined;
    for (const child of node.elements.slice(1)) {
      if (child.type === "atom") {
        if (child.tokenType === "string") {
          source = this.nodeToLiteral(child);
          continue;
        }
        const ident = new Identifier({ name: child.value, span: child.span });
        named = [...(named ?? []), { exported: ident.name, local: ident }];
        continue;
      }
      if (child.type === "list" && child.elements.length > 0) {
        const specHead = child.elements[0];
        if (specHead.type === "atom") {
          if (specHead.value === "default") {
            const exprNode = child.elements[1];
            if (!exprNode) {
              throw new Error("export-spec default requires an expression");
            }
            defaultExport = this.nodeToExpression(exprNode);
            continue;
          }
          if (specHead.value === "namespace") {
            const nameNode = child.elements[1];
            if (!nameNode) {
              throw new Error("export-spec namespace requires a name");
            }
            namespaceExport = this.nodeToIdentifier(nameNode, "export namespace name");
            continue;
          }
          if (specHead.value === "named") {
            const entries = child.elements.slice(1).map((entry) => this.parseNamedExport(entry));
            named = [...(named ?? []), ...entries];
            continue;
          }
        }
        const entries = child.elements.map((entry) => this.parseNamedExport(entry));
        named = [...(named ?? []), ...entries];
        continue;
      }
      const expr = this.nodeToExpression(child);
      if (expr instanceof Literal) {
        source = expr;
        continue;
      }
      throw new Error("export-spec entries must be literals, identifiers, or named/default/namespace lists");
    }
    return { source, named, defaultExport, namespaceExport };
  }

  private parseNamedExport(node: Node): NamedExport {
    if (node.type === "atom") {
      const name = node.value;
      return { exported: name, local: new Identifier({ name, span: node.span }) };
    }
    if (node.type === "list" && node.elements.length === 2) {
      const [exportedNode, localNode] = node.elements;
      if (exportedNode.type !== "atom" || localNode.type !== "atom") {
        throw new Error("export named entries must contain identifier atoms");
      }
      const localIdent = new Identifier({ name: localNode.value, span: localNode.span });
      return { exported: exportedNode.value, local: localIdent };
    }
    throw new Error("export named entries must be identifiers or two-element lists");
  }

  private parseModuleSpecifier(node: Node): Literal {
    const expr = this.nodeToExpression(node);
    if (!(expr instanceof Literal)) {
      throw new Error("Module specifier must be a literal");
    }
    return expr;
  }

  private parseNamedImport(node: Node): NamedImport {
    if (node.type === "atom") {
      const name = node.value;
      const ident = new Identifier({ name, span: node.span });
      return { imported: name, local: ident };
    }
    if (node.type === "list" && node.elements.length === 2) {
      const [importedNode, localNode] = node.elements;
      if (importedNode.type !== "atom" || localNode.type !== "atom") {
        throw new Error("import-named alias entries must contain identifier atoms");
      }
      const localIdent = new Identifier({ name: localNode.value, span: localNode.span });
      return { imported: importedNode.value, local: localIdent };
    }
    throw new Error("import-named entries must be identifiers or two-element lists");
  }

  private nodeToIdentifier(node: Node, label: string): Identifier {
    if (node.type === "atom") {
      return new Identifier({ name: node.value, span: node.span });
    }
    const expr = this.nodeToExpression(node);
    if (expr instanceof Identifier) {
      return expr;
    }
    throw new Error(`${label} must resolve to an identifier`);
  }

  private ensureIdentifierExpression(expr: Expression, label: string): Identifier {
    if (expr instanceof Identifier) {
      return expr;
    }
    throw new Error(`${label} must be an identifier`);
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

  private buildTypeRef(node: ListNode): TypeRef {
    const span = node.span;
    const [, nameNode, ...args] = node.elements;
    if (!nameNode) {
      throw new Error("type-ref requires an identifier");
    }
    const identifier = this.nodeToIdentifier(nameNode, "type-ref identifier");
    const typeArgs = args.map((child) => this.nodeToType(child));
    return new TypeRef({ identifier, span, typeArgs: typeArgs.length > 0 ? typeArgs : undefined });
  }

  private buildTypeFunction(node: ListNode): TypeFunction {
    const span = node.span;
    let entries = node.elements.slice(1);
    let typeParams: TypeParam[] | undefined;
    if (entries.length > 0 && this.isTypeParamsList(entries[0])) {
      typeParams = this.parseTypeParams(entries[0]);
      entries = entries.slice(1);
    }
    if (entries.length === 0) {
      throw new Error("type-function requires at least a return type");
    }
    const returns = this.nodeToType(entries[entries.length - 1]);
    const params = entries.slice(0, -1).map((child) => this.nodeToType(child));
    return new TypeFunction({ typeParams, params, returns, span });
  }

  private buildTypeObject(node: ListNode): TypeObject {
    const span = node.span;
    const fields = node.elements.slice(1).map((child) => this.nodeToTypeField(child));
    return new TypeObject({ fields, span });
  }

  private nodeToTypeField(node: Node): TypeField {
    if (node.type !== "list" || node.elements.length < 2) {
      throw new Error("type-object fields must be (key type)");
    }
    const keyNode = node.elements[0];
    if (keyNode.type !== "atom") {
      throw new Error("type-object field key must be an atom");
    }
    const valueNode = node.elements[1];
    return new TypeField({ key: keyNode.value, fieldType: this.nodeToType(valueNode), span: node.span });
  }

  private buildTypeUnion(node: ListNode): TypeUnion {
    const span = node.span;
    const types = node.elements.slice(1).map((child) => this.nodeToType(child));
    if (types.length === 0) {
      throw new Error("type-union requires at least one member");
    }
    return new TypeUnion({ types, span });
  }

  private buildTypeIntersection(node: ListNode): TypeIntersection {
    const span = node.span;
    const types = node.elements.slice(1).map((child) => this.nodeToType(child));
    if (types.length === 0) {
      throw new Error("type-intersection requires at least one member");
    }
    return new TypeIntersection({ types, span });
  }

  private buildTypeLiteral(node: ListNode): TypeLiteral {
    const span = node.span;
    const values = node.elements.slice(1).map((child) => this.nodeToLiteral(child));
    return new TypeLiteral({ value: values, span });
  }

  private nodeToLiteral(node: Node): Literal {
    if (node.type === "atom") {
      const value = this.atomToValue(node);
      if (value instanceof Literal) {
        return value;
      }
    }
    throw new Error("Expected literal");
  }

  private buildTypeMapped(node: ListNode): TypeMapped {
    const span = node.span;
    const [, paramNode, valueNode, ...rest] = node.elements;
    if (!paramNode || !valueNode) {
      throw new Error("type-mapped requires a type param and a value type");
    }
    const typeParam = this.parseTypeParam(paramNode);
    const valueType = this.nodeToType(valueNode);
    let nameRemap: TypeNode | undefined;
    let readonlyModifier: "readonly" | "-readonly" | undefined;
    let optionalModifier: "optional" | "-optional" | undefined;
    let via: TypeNode | undefined;
    for (const child of rest) {
      if (child.type === "atom") {
        if (child.value === "readonly" || child.value === "-readonly") {
          readonlyModifier = child.value as "readonly" | "-readonly";
          continue;
        }
        if (child.value === "optional" || child.value === "-optional") {
          optionalModifier = child.value as "optional" | "-optional";
          continue;
        }
      }
      if (!nameRemap) {
        nameRemap = this.nodeToType(child);
        continue;
      }
      if (!via) {
        via = this.nodeToType(child);
        continue;
      }
      throw new Error("type-mapped supports at most name remap, modifiers, and via");
    }
    return new TypeMapped({ typeParam, valueType, nameRemap, readonlyModifier, optionalModifier, via, span });
  }

  private buildTypeApp(node: ListNode, parseExpr: (node: Node) => Expression | TypeNode): TypeApp {
    const span = node.span;
    const [, exprNode, ...args] = node.elements;
    if (!exprNode) {
      throw new Error("type-app requires an expression");
    }
    if (args.length === 0) {
      throw new Error("type-app requires type arguments");
    }
    const expr = parseExpr(exprNode);
    const typeArgs = args.map((child) => this.nodeToType(child));
    return new TypeApp({ expr, typeArgs, span });
  }

  private buildTypeAssert(node: ListNode): TypeAssertExpr {
    const span = node.span;
    const [, exprNode, typeNode] = node.elements;
    if (!exprNode || !typeNode) {
      throw new Error("type-assert requires an expression and a type");
    }
    return new TypeAssertExpr({ expr: this.nodeToExpression(exprNode), assertedType: this.nodeToType(typeNode), span });
  }

  private buildTypeAlias(node: ListNode): TypeAliasStmt {
    const span = node.span;
    const [, nameNode, ...rest] = node.elements;
    if (!nameNode) {
      throw new Error("type-alias requires a name");
    }
    const name = this.nodeToIdentifier(nameNode, "type-alias name");
    let typeNodes = rest;
    let typeParams: TypeParam[] | undefined;
    if (typeNodes.length > 0 && this.isTypeParamsList(typeNodes[0])) {
      typeParams = this.parseTypeParams(typeNodes[0]);
      typeNodes = typeNodes.slice(1);
    }
    if (typeNodes.length !== 1) {
      throw new Error("type-alias expects a single type expression");
    }
    const typeValue = this.nodeToType(typeNodes[0]);
    return new TypeAliasStmt({ name, typeValue, typeParams, span });
  }

  private isTypeParamsList(node: Node): node is ListNode {
    return (node.type === "list" && node.elements.length > 0 && node.elements[0].type === "atom" && node.elements[0].value === "typeparams");
  }

  private isTypeNodeList(node: Node): boolean {
    if (node.type !== "list" || node.elements.length === 0) {
      return false;
    }
    const head = node.elements[0];
    if (head.type !== "atom") {
      return false;
    }
    const typeHeads = new Set([
      "type-string",
      "type-number",
      "type-boolean",
      "type-null",
      "type-undefined",
      "type-ref",
      "type-function",
      "type-object",
      "type-union",
      "type-intersection",
      "type-literal",
      "type-mapped",
      "type-app",
    ]);
    return typeHeads.has(head.value);
  }

  private parseTypeParams(node: Node): TypeParam[] {
    if (!this.isTypeParamsList(node)) {
      throw new Error("typeparams list must start with typeparams");
    }
    return node.elements.slice(1).map((child) => this.parseTypeParam(child));
  }

  private parseTypeParam(node: Node): TypeParam {
    if (node.type !== "list" || node.elements.length === 0) {
      throw new Error("type-param must be a list with a name");
    }
    const [nameNode, ...rest] = node.elements;
    const name = this.nodeToIdentifier(nameNode, "type-param name");
    let variance: "in" | "out" | undefined;
    let constraint: TypeNode | undefined;
    let defaultType: TypeNode | undefined;
    let constFlag: boolean | undefined;
    let inferFlag: boolean | undefined;
    for (const attr of rest) {
      if (attr.type === "atom" && (attr.value === "in" || attr.value === "out")) {
        if (variance) {
          throw new Error("type-param cannot declare multiple variances");
        }
        variance = attr.value as "in" | "out";
        continue;
      }
      if (attr.type === "atom" && attr.value === "const") {
        constFlag = true;
        continue;
      }
      if (attr.type === "atom" && attr.value === "infer") {
        inferFlag = true;
        continue;
      }
      if (attr.type === "list" && attr.elements.length > 0 && attr.elements[0].type === "atom") {
        const head = attr.elements[0].value;
        if (head === "extends") {
          if (attr.elements.length < 2) {
            throw new Error("extends clause requires a type");
          }
          constraint = this.nodeToType(attr.elements[1]);
          continue;
        }
        if (head === "default") {
          if (attr.elements.length < 2) {
            throw new Error("default clause requires a type");
          }
          defaultType = this.nodeToType(attr.elements[1]);
          continue;
        }
      }
      if (!constraint) {
        constraint = this.nodeToType(attr);
        continue;
      }
      if (!defaultType) {
        defaultType = this.nodeToType(attr);
        continue;
      }
      throw new Error("type-param contains too many entries");
    }
    return new TypeParam({ name, span: node.span, variance, constraint, defaultType, const: constFlag, infer: inferFlag });
  }

  private nodeToType(node: Node): TypeNode {
    if (node.type !== "list" || node.elements.length === 0) {
      throw new Error("Type expressions must be lists");
    }
    const head = node.elements[0];
    if (head.type !== "atom") {
      throw new Error("Type constructor must be an atom");
    }
    switch (head.value) {
      case "type-string":
      case "type-number":
      case "type-boolean":
      case "type-null":
      case "type-undefined":
        return new TypePrimitive({ kind: head.value as TypePrimitive["kind"], span: node.span });
      case "type-ref":
        return this.buildTypeRef(node);
      case "type-function":
        return this.buildTypeFunction(node);
      case "type-object":
        return this.buildTypeObject(node);
      case "type-union":
        return this.buildTypeUnion(node);
      case "type-intersection":
        return this.buildTypeIntersection(node);
      case "type-literal":
        return this.buildTypeLiteral(node);
      case "type-mapped":
        return this.buildTypeMapped(node);
      case "type-app":
        return this.buildTypeApp(node, (child) => this.nodeToType(child));
      default:
        throw new Error(`Unknown type constructor ${head.value}`);
    }
  }

  private atomToValue(atom: AtomNode): Expression {
    const { value } = atom;
    const span = atom.span;
    if (atom.tokenType === "string") {
      return new Literal({ value, span });
    }
    if (/^-?\d+(\.\d+)?$/.test(value)) {
      return new Literal({ value: Number.parseFloat(value), span });
    }
    if (value === "true" || value === "false") {
      return new Literal({ value: value === "true", span });
    }
    if (value === "null") {
      return new Literal({ value: null, span });
    }
    if (value === "undefined") {
      return new Literal({ value: undefined, span });
    }
    return new Identifier({ name: value, span });
  }
}

export function parseSource(source: string, fileName = "input.t2"): Program {
  const tokens = tokenize(source);
  const parser = new Parser(tokens, fileName);
  return parser.parseProgram();
}