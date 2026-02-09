import {
  Program,
  ExprStmt,
  LetStarExpr,
  BlockStmt,
  StaticBlockStmt,
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
  DefaultPattern,
  CatchClause,
  FinallyClause,
  Expression,
  Statement,
  ClassMember,
  Span,
  CallExpr,
  CallWithThisExpr,
  OptionalCallExpr,
  ArrayExpr,
  FunctionExpr,
  FnParam,
  CallableKind,
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
  TypeTemplateLiteral,
  TypeRef,
  TypeUnion,
  TypeVar,
  TypeTuple,
  TypeArray,
  TypeNullable,
  TypeKeyof,
  TypeTypeof,
  TypeIndexed,
  TypeConditional,
  TypeInfer,
  TypeThis,
  InterfaceStmt,
  EnumStmt,
  EnumMember,
  NamespaceStmt,
  NonNullAssertExpr,
  TemplateExpr,
  IndexSignature,
  OptionalPropExpr,
  OptionalIndexExpr,
} from "./phaseA1.js";
import { reportError } from "../../common/dist/errorRegistry.js";

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

const PRIMITIVE_NAME_MAP: Record<string, TypePrimitive["kind"]> = {
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
    if (ch === ",") {
      tokens.push(makeToken("atom", ",", pos, pos + 1));
      pos++;
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
    if (ch === '"' || ch === "'") {
      const quote = ch;
      const start = pos;
      pos++;
      let value = "";
      while (pos < length && source[pos] !== quote) {
        const current = source[pos];
        if (current === "\\" && pos + 1 < length) {
          const next = source[pos + 1];
          if (next === "\n") {
            pos += 2;
            continue;
          }
          if (next === "\r") {
            if (source[pos + 2] === "\n") {
              pos += 3;
            } else {
              pos += 2;
            }
            continue;
          }
        }
        value += current;
        pos++;
      }
      if (source[pos] === quote) {
        pos++;
      }
      tokens.push(makeToken("string", value, start, pos));
      continue;
    }
    if (ch === "`") {
      const start = pos;
      pos++;
      let value = "";
      while (pos < length && source[pos] !== "`") {
        const current = source[pos];
        if (current === "\\" && source[pos + 1] === "`") {
          value += "`";
          pos += 2;
          continue;
        }
        value += current;
        pos++;
      }
      if (source[pos] === "`") {
        pos++;
      }
      tokens.push(makeToken("string", value, start, pos));
      continue;
    }
    const start = pos;
    let value = "";
    while (
      pos < length &&
      !isWhitespace(source[pos]) &&
      source[pos] !== "(" &&
      source[pos] !== ")" &&
      source[pos] !== ","
    ) {
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
      throw reportError("T2:0292");
    }
    if (tok.type === "paren") {
      if (tok.value === "(") {
        return this.parseList();
      }
      throw reportError("T2:0293", { token: tok.value });
    }
    if (tok.type === "string" || tok.type === "atom") {
      return this.parseAtom();
    }
    throw reportError("T2:0308", { tokenType: tok.type });
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
        throw reportError("T2:0310");
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
      throw reportError("T2:0233");
    }
    if (root.elements.length === 0 || root.elements[0].type !== "atom" || root.elements[0].value !== "program") {
      throw reportError("T2:0234");
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
        if (head.value === "lambda") {
          return this.buildLambda(node);
        }
        if (head.value === "method") {
          return this.buildMethod(node);
        }
        if (head.value === "getter") {
          return this.buildGetter(node);
        }
        if (head.value === "setter") {
          return this.buildSetter(node);
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
        if (head.value === "enum") {
          return this.buildEnum(node);
        }
        if (head.value === "namespace") {
          return this.buildNamespace(node);
        }
        if (head.value === "index-signature") {
          return this.buildIndexSignature(node);
        }
        if (head.value === "static-block") {
          return this.buildStaticBlock(node);
        }
      }
    }
    return new ExprStmt({ expr: this.nodeToExpression(node), span: node.span });
  }

  private buildEnum(node: ListNode): EnumStmt {
    const span = node.span;
    const [, nameNode, bodyNode] = node.elements;
    if (!nameNode || !bodyNode || bodyNode.type !== "list") {
      throw reportError("T2:0151");
    }
    const name = this.nodeToIdentifier(nameNode, "enum name");
    if (bodyNode.elements.length === 0 || bodyNode.elements[0].type !== "atom" || bodyNode.elements[0].value !== "enum-body") {
      throw reportError("T2:0148");
    }
    const members: EnumMember[] = bodyNode.elements.slice(1).map((child) => this.buildEnumMember(child));
    return new EnumStmt({ name, members, span });
  }

  private buildEnumMember(node: Node): EnumMember {
    if (node.type !== "list" || node.elements.length === 0 || node.elements.length > 2) {
      throw reportError("T2:0149");
    }
    const [nameNode, valueNode] = node.elements;
    if (nameNode.type !== "atom" || nameNode.tokenType !== "string") {
      throw reportError("T2:0150");
    }
    const value = valueNode ? this.nodeToExpression(valueNode) : undefined;
    return { name: nameNode.value, value };
  }

  private buildNamespace(node: ListNode): NamespaceStmt {
    const span = node.span;
    const [, nameNode, bodyNode] = node.elements;
    if (!nameNode || !bodyNode || bodyNode.type !== "list") {
      throw reportError("T2:0210");
    }
    const name = this.nodeToIdentifier(nameNode, "namespace name");
    if (bodyNode.elements.length === 0 || bodyNode.elements[0].type !== "atom" || bodyNode.elements[0].value !== "namespace-body") {
      throw reportError("T2:0209");
    }
    const statements = bodyNode.elements.slice(1).map((child) => this.nodeToStatement(child));
    return new NamespaceStmt({ name, body: statements, span });
  }

  private buildLetStar(node: ListNode, isConst: boolean): LetStarExpr {
    const span = node.span;
    const entries = node.elements.slice(1);
    const bindings: Binding[] = [];
    let bodyStartIndex = 0;
    if (entries.length > 0 && this.isBindingList(entries[0])) {
      for (const bindingNode of entries[0].elements) {
        bindings.push(this.nodeToBinding(bindingNode));
      }
      bodyStartIndex = 1;
    } else {
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

  private isBindingList(node: Node): node is ListNode {
    if (node.type !== "list" || node.elements.length === 0) {
      return false;
    }
    return node.elements.every((child) => this.isBindingEntry(child));
  }

  private buildAssign(node: ListNode): AssignExpr {
    const span = node.span;
    const [, targetNode, valueNode] = node.elements;
    if (!targetNode || !valueNode) {
      throw reportError("T2:0126");
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

  private buildStaticBlock(node: ListNode): StaticBlockStmt {
    const span = node.span;
    if (node.elements.length === 0 || node.elements[0].type !== "atom" || node.elements[0].value !== "static-block") {
      throw reportError("T2:0242");
    }
    const bodyNodes = node.elements.slice(1);
    const statements = bodyNodes.map((child) => this.nodeToStatement(child));
    return new StaticBlockStmt({ statements, span });
  }

  private buildIf(node: ListNode): IfStmt {
    const span = node.span;
    const [, testNode, consequentNode, alternateNode] = node.elements;
    if (!testNode || !consequentNode) {
      throw reportError("T2:0181");
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
      throw reportError("T2:0311");
    }
    const condition = this.nodeToExpression(conditionNode);
    const body = this.buildStatementSequence(bodyNodes, span);
    return new WhileStmt({ condition, body, span });
  }

  private buildForLoop(node: ListNode): Statement {
    const kindNode = node.elements[1];
    if (!kindNode || kindNode.type !== "atom") {
      throw reportError("T2:0176");
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
    throw reportError("T2:0304", { kind: kindNode.value });
  }

  private buildForClassic(node: ListNode): ForClassic {
    const span = node.span;
    const args = node.elements.slice(2);
    if (args.length === 0) {
      throw reportError("T2:0175");
    }
    const bodyNode = args[args.length - 1];
    const clauseNodes = args.slice(0, -1);
    if (clauseNodes.length > 3) {
      throw reportError("T2:0174");
    }
    const init = clauseNodes[0] && !this.isForClausePlaceholder(clauseNodes[0]) ? this.nodeToStatement(clauseNodes[0]) : undefined;
    const condition = clauseNodes[1] && !this.isForClausePlaceholder(clauseNodes[1]) ? this.nodeToExpression(clauseNodes[1]) : undefined;
    const update = clauseNodes[2] && !this.isForClausePlaceholder(clauseNodes[2]) ? this.nodeToExpression(clauseNodes[2]) : undefined;
    const body = this.nodeToStatement(bodyNode);
    return new ForClassic({ init, condition, update, body, span });
  }

  private buildForOf(node: ListNode): ForOf {
    const span = node.span;
    const clauseNode = node.elements[2];
    const bodyNode = node.elements[3];
    if (!clauseNode || clauseNode.type !== "list") {
      throw reportError("T2:0178");
    }
    if (!bodyNode) {
      throw reportError("T2:0179");
    }
    const [bindingNode, iterableNode] = clauseNode.elements;
    if (!bindingNode || !iterableNode) {
      throw reportError("T2:0177");
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
      throw reportError("T2:0172");
    }
    if (!bodyNode) {
      throw reportError("T2:0173");
    }
    const [bindingNode, iterableNode] = clauseNode.elements;
    if (!bindingNode || !iterableNode) {
      throw reportError("T2:0171");
    }
    const binding = this.nodeToBinding(bindingNode);
    const iterable = this.nodeToExpression(iterableNode);
    const body = this.nodeToStatement(bodyNode);
    return new ForAwait({ binding, iterable, body, span });
  }

  private isForClausePlaceholder(node: Node): boolean {
    if (node.type === "atom" && node.value === "null") {
      return true;
    }
    if (node.type === "atom" && node.value === "_") {
      return true;
    }
    if (node.type === "list" && node.elements.length === 0) {
      return true;
    }
    return false;
  }

  private nodeToBinding(node: Node): Binding {
    if (node.type !== "list" || node.elements.length === 0) {
      throw reportError("T2:0200");
    }
    if (node.elements.length > 2) {
      throw reportError("T2:0128");
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
        if (head.value === "default") {
          return this.buildDefaultPattern(node);
        }
      }
    }
    throw reportError("T2:0201");
  }

  private isBindingCandidate(node: ListNode): boolean {
    const head = node.elements[0];
    if (head.type !== "atom") {
      return false;
    }
    const expressionHeads = new Set([
      "call",
      "call-with-this",
      "array",
      "object",
      "template",
      "non-null",
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
        throw reportError("T2:0218");
      }
      const keyNode = child.elements[0];
      if (keyNode.type !== "atom" || keyNode.tokenType !== "string") {
        throw reportError("T2:0217");
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
      throw reportError("T2:0236");
    }
    return new RestPattern({ target: this.nodeToBindingTarget(targetNode), span });
  }

  private buildDefaultPattern(node: ListNode): DefaultPattern {
    const span = node.span;
    const [, targetNode, valueNode] = node.elements;
    if (!targetNode || !valueNode) {
      throw reportError("T2:0146");
    }
    const target = this.nodeToBindingTarget(targetNode);
    if (target instanceof RestPattern) {
      throw reportError("T2:0145");
    }
    const defaultValue = this.nodeToExpression(valueNode);
    return new DefaultPattern({ target, defaultValue, span });
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
        const values = node.elements
          .slice(1)
          .filter((child) => !(child.type === "atom" && child.value === ","))
          .map((child) => this.nodeToExpression(child));
        return new ArrayExpr({ elements: values, span: node.span });
      }
      if (head.value === "object") {
        return this.buildObject(node);
      }
      if (head.value === "template") {
        return this.buildTemplate(node);
      }
      if (head.value === "non-null") {
        return this.buildNonNullAssert(node);
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
      if (head.value === "?.") {
        return this.buildOptionalProp(node);
      }
      if (head.value === "?.[]") {
        return this.buildOptionalIndex(node);
      }
      if (head.value === "?.call") {
        return this.buildOptionalCall(node);
      }
      if (head.value === "new") {
        return this.buildNew(node);
      }
      if (head.value === "call") {
        return this.buildCall(node);
      }
      if (head.value === "call-with-this") {
        return this.buildCallWithThis(node);
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
      if (head.value === "lambda") {
        return this.buildLambda(node);
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
    const callee = this.nodeToExpression(head);
    const args = node.elements
      .slice(1)
      .filter((child) => !(child.type === "atom" && child.value === ","))
      .map((child) => this.nodeToExpression(child));
    return new CallExpr({ callee, args, span: node.span });
  }

  private buildCall(node: ListNode): CallExpr {
    const span = node.span;
    const [, calleeNode, ...argNodes] = node.elements;
    if (!calleeNode) {
      throw reportError("T2:0129");
    }
    const callee = this.nodeToExpression(calleeNode);
    const args = argNodes
      .filter((child) => !(child.type === "atom" && child.value === ","))
      .map((child) => this.nodeToExpression(child));
    return new CallExpr({ callee, args, span });
  }

  private buildCallWithThis(node: ListNode): CallWithThisExpr {
    const span = node.span;
    const [, fnNode, thisArgNode, ...argNodes] = node.elements;
    if (!fnNode || !thisArgNode) {
      throw reportError("T2:0130");
    }
    const fn = this.nodeToExpression(fnNode);
    const thisArg = this.nodeToExpression(thisArgNode);
    const args = argNodes
      .filter((child) => !(child.type === "atom" && child.value === ","))
      .map((child) => this.nodeToExpression(child));
    return new CallWithThisExpr({ fn, thisArg, args, span });
  }

  private buildOptionalCall(node: ListNode): OptionalCallExpr {
    const span = node.span;
    const [, calleeNode, ...argNodes] = node.elements;
    if (!calleeNode) {
      throw reportError("T2:0129");
    }
    const callee = this.nodeToExpression(calleeNode);
    const args = argNodes
      .filter((child) => !(child.type === "atom" && child.value === ","))
      .map((child) => this.nodeToExpression(child));
    return new OptionalCallExpr({ callee, args, span });
  }

  private buildProp(node: ListNode): Expression {
    const span = node.span;
    const [, objectNode, nameNode] = node.elements;
    if (!objectNode || !nameNode) {
      throw reportError("T2:0235");
    }
    const objectExpr = this.nodeToExpression(objectNode);
    if (nameNode.type === "atom" && nameNode.tokenType === "string") {
      return new PropExpr({
        object: objectExpr,
        name: nameNode.value,
        maybeNull: false,
        span,
      });
    }
    return new IndexExpr({
      object: objectExpr,
      index: this.nodeToExpression(nameNode),
      maybeNull: false,
      span,
    });
  }

  private buildOptionalProp(node: ListNode): Expression {
    const span = node.span;
    const [, objectNode, nameNode] = node.elements;
    if (!objectNode || !nameNode) {
      throw reportError("T2:0235");
    }
    const objectExpr = this.nodeToExpression(objectNode);
    if (nameNode.type === "atom" && nameNode.tokenType === "string") {
      return new OptionalPropExpr({
        object: objectExpr,
        name: nameNode.value,
        span,
      });
    }
    return new OptionalIndexExpr({
      object: objectExpr,
      index: this.nodeToExpression(nameNode),
      span,
    });
  }

  private buildIndex(node: ListNode): IndexExpr {
    const span = node.span;
    const [, objectNode, indexNode] = node.elements;
    if (!objectNode || !indexNode) {
      throw reportError("T2:0195");
    }
    return new IndexExpr({
      object: this.nodeToExpression(objectNode),
      index: this.nodeToExpression(indexNode),
      maybeNull: false,
      span,
    });
  }

  private buildOptionalIndex(node: ListNode): OptionalIndexExpr {
    const span = node.span;
    const [, objectNode, indexNode] = node.elements;
    if (!objectNode || !indexNode) {
      throw reportError("T2:0195");
    }
    return new OptionalIndexExpr({
      object: this.nodeToExpression(objectNode),
      index: this.nodeToExpression(indexNode),
      span,
    });
  }

  private buildObject(node: ListNode): ObjectExpr {
    const span = node.span;
    const fieldNodes = node.elements.slice(1).filter((child) => !(child.type === "atom" && child.value === ","));
    const fields = fieldNodes.map((fieldNode) => {
      if (fieldNode.type !== "list" || fieldNode.elements.length < 2) {
        throw reportError("T2:0214");
      }
      const keyNode = fieldNode.elements[0];
      if (keyNode.type === "atom" && keyNode.value === "spread") {
        const kindNode = fieldNode.elements[1];
        const exprNode = fieldNode.elements[2];
        if (!kindNode || kindNode.type !== "atom" || !exprNode) {
          throw reportError("T2:0220");
        }
        if (kindNode.value !== "object") {
          throw reportError("T2:0219");
        }
        return { kind: "spread", expr: this.nodeToExpression(exprNode) } as const;
      }
      if (keyNode.type === "atom" && keyNode.value === "computed") {
        const exprNode = fieldNode.elements[1];
        const valueNode = fieldNode.elements[2];
        if (!exprNode || !valueNode) {
          throw reportError("T2:0214");
        }
        return {
          kind: "computed",
          key: this.nodeToExpression(exprNode),
          value: this.nodeToExpression(valueNode),
        } as const;
      }
      if (keyNode.type !== "atom" || keyNode.tokenType !== "string") {
        throw reportError("T2:0213");
      }
      const valueNode = fieldNode.elements[1];
      return { kind: "field", key: keyNode.value, value: this.nodeToExpression(valueNode) } as const;
    });
    return new ObjectExpr({ fields, span });
  }

  private buildTemplate(node: ListNode): TemplateExpr {
    const span = node.span;
    const parts = node.elements.slice(1).map((child) => this.nodeToExpression(child));
    return new TemplateExpr({ parts, span });
  }

  private buildNonNullAssert(node: ListNode): NonNullAssertExpr {
    const span = node.span;
    const [, exprNode] = node.elements;
    if (!exprNode) {
      throw reportError("T2:0212");
    }
    return new NonNullAssertExpr({ expr: this.nodeToExpression(exprNode), span });
  }

  private buildSpread(node: ListNode): SpreadExpr {
    const span = node.span;
    const [, kindNode, exprNode] = node.elements;
    if (!kindNode || kindNode.type !== "atom" || !exprNode) {
      throw reportError("T2:0241");
    }
    if (kindNode.value !== "array" && kindNode.value !== "object" && kindNode.value !== "rest") {
      throw reportError("T2:0240");
    }
    return new SpreadExpr({ kind: kindNode.value as "array" | "object" | "rest", expr: this.nodeToExpression(exprNode), span });
  }

  private buildNew(node: ListNode): NewExpr {
    const span = node.span;
    const [, calleeNode, ...argNodes] = node.elements;
    if (!calleeNode) {
      throw reportError("T2:0211");
    }
    const callee = this.nodeToExpression(calleeNode);
    const args = argNodes.map((child) => this.nodeToExpression(child));
    return new NewExpr({ callee, args, span });
  }

  private buildTernary(node: ListNode): TernaryExpr {
    const span = node.span;
    const [, testNode, consequentNode, alternateNode] = node.elements;
    if (!testNode || !consequentNode || !alternateNode) {
      throw reportError("T2:0248");
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
      throw reportError("T2:0127");
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
      throw reportError("T2:0254");
    }
    const argument = this.nodeToExpression(argumentNode);
    return new ThrowExpr({ argument, span });
  }

  private buildTry(node: ListNode): TryCatchExpr {
    const span = node.span;
    const children = node.elements.slice(1);
    const bodyNodes: Node[] = [];
    let index = 0;

    while (index < children.length) {
      const child = children[index];
      if (child.type === "list" && child.elements.length > 0) {
        const head = child.elements[0];
        if (head.type === "atom" && (head.value === "catch" || head.value === "finally")) {
          break;
        }
      }
      bodyNodes.push(child);
      index++;
    }

    if (bodyNodes.length === 0) {
      throw reportError("T2:0262");
    }

    const body = this.buildStatementSequence(bodyNodes, span);
    let catchClause: CatchClause | undefined;
    let finallyClause: FinallyClause | undefined;

    while (index < children.length) {
      const child = children[index];
      if (child.type !== "list" || child.elements.length === 0) {
        throw reportError("T2:0260");
      }
      const head = child.elements[0];
      if (head.type !== "atom") {
        throw reportError("T2:0261");
      }
      if (head.value === "catch") {
        if (catchClause) {
          throw reportError("T2:0263");
        }
        catchClause = this.buildCatchClause(child);
      } else if (head.value === "finally") {
        if (finallyClause) {
          throw reportError("T2:0264");
        }
        finallyClause = this.buildFinallyClause(child);
      } else {
        throw reportError("T2:0299", { child: head.value });
      }
      index++;
    }

    return new TryCatchExpr({ body, span, catchClause, finallyClause });
  }

  private buildSwitch(node: ListNode): SwitchStmt {
    const span = node.span;
    const discriminantNode = node.elements[1];
    if (!discriminantNode) {
      throw reportError("T2:0245");
    }
    const discriminant = this.nodeToExpression(discriminantNode);
    const cases: SwitchCase[] = [];
    for (let i = 2; i < node.elements.length; i++) {
      const child = node.elements[i];
      if (child.type !== "list" || child.elements.length === 0) {
        throw reportError("T2:0244");
      }
      const head = child.elements[0];
      if (head.type !== "atom") {
        throw reportError("T2:0243");
      }
      if (head.value === "case") {
        const testNode = child.elements[1];
        if (!testNode) {
          throw reportError("T2:0131");
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
      throw reportError("T2:0298", { clause: head.value });
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
    return this.buildCallable(node, "fn");
  }

  private buildLambda(node: ListNode): FunctionExpr {
    return this.buildCallable(node, "lambda");
  }

  private buildMethod(node: ListNode): FunctionExpr {
    return this.buildCallable(node, "method");
  }

  private buildGetter(node: ListNode): FunctionExpr {
    return this.buildCallable(node, "getter");
  }

  private buildSetter(node: ListNode): FunctionExpr {
    return this.buildCallable(node, "setter");
  }

  private buildCallable(node: ListNode, kind: CallableKind): FunctionExpr {
    const span = node.span;
    let entries = node.elements.slice(1);
    let async = false;
    let generator = false;
    let abstract = false;
    let overload = false;
    while (entries.length > 0) {
      const head = entries[0];
      if (head.type === "atom") {
        if (head.value === "async") {
          async = true;
          entries = entries.slice(1);
          continue;
        }
        if (head.value === "generator") {
          generator = true;
          entries = entries.slice(1);
          continue;
        }
        if (head.value === "abstract") {
          abstract = true;
          entries = entries.slice(1);
          continue;
        }
        if (head.value === "overload") {
          overload = true;
          entries = entries.slice(1);
          continue;
        }
      }
      break;
    }

    let name: Identifier | undefined;
    let methodName: string | undefined;

    if (kind === "fn" && entries.length > 0 && entries[0].type === "atom" && entries[0].tokenType === "atom") {
      name = this.nodeToIdentifier(entries[0], "function name");
      entries = entries.slice(1);
    }

    if (kind === "method" || kind === "getter" || kind === "setter") {
      const nameNode = entries[0];
      if (!nameNode || nameNode.type !== "atom" || nameNode.tokenType !== "string") {
        throw reportError("T2:0117", { kind });
      }
      methodName = nameNode.value;
      entries = entries.slice(1);
    }

    let typeParams: TypeParam[] | undefined;
    if (entries.length > 0 && this.isTypeParamsList(entries[0])) {
      typeParams = this.parseTypeParams(entries[0]);
      entries = entries.slice(1);
    }

    const signatureNode = entries[0];
    if (!signatureNode || signatureNode.type !== "list") {
      throw reportError("T2:0116", { kind });
    }
    const signature = this.parseFnSignature(signatureNode);
    entries = entries.slice(1);

    const hasParamProperty = signature.parameters.some((param) => param.paramProperty);
    if (hasParamProperty) {
      if (kind !== "method" || methodName !== "constructor") {
        throw reportError("T2:0229");
      }
      if (overload) {
        throw reportError("T2:0228");
      }
    }

    if (abstract && kind !== "method" && kind !== "getter" && kind !== "setter") {
      throw reportError("T2:0124");
    }
    if (kind === "lambda" && abstract) {
      throw reportError("T2:0204");
    }
    if (abstract && entries.length > 0) {
      throw reportError("T2:0122");
    }
    if (overload && kind !== "fn" && kind !== "method") {
      throw reportError("T2:0224");
    }
    if (overload && kind === "lambda") {
      throw reportError("T2:0205");
    }
    if (overload && kind === "fn" && !name) {
      throw reportError("T2:0225");
    }
    if (overload && abstract) {
      throw reportError("T2:0223");
    }

    if (kind === "getter" && signature.parameters.length !== 0) {
      throw reportError("T2:0180");
    }
    if (kind === "setter") {
      if (signature.parameters.length !== 1) {
        throw reportError("T2:0239");
      }
      if (signature.returnType) {
        throw reportError("T2:0238");
      }
    }
    if (signature.parameters.length > 0 && signature.parameters[0].name.name === "this") {
      if (kind === "lambda") {
        throw reportError("T2:0206");
      }
      if (kind === "getter" || kind === "setter") {
        throw reportError("T2:0125");
      }
    }

    if (!typeParams && entries.length > 0 && this.isTypeParamsList(entries[0])) {
      typeParams = this.parseTypeParams(entries[0]);
      entries = entries.slice(1);
    }

    if (overload && entries.length > 0) {
      throw reportError("T2:0227");
    }

    const body = entries.map((child) => this.nodeToStatement(child));
    return new FunctionExpr({
      signature,
      body,
      span,
      typeParams,
      async,
      generator,
      abstract,
      overload: overload ? true : undefined,
      callableKind: kind,
      name,
      methodName,
    });
  }

  private parseFnSignature(node: ListNode): { parameters: FnParam[]; returnType?: TypeNode } {
    const entries = node.elements.filter((entry) => !(entry.type === "atom" && entry.value === ","));
    let returnType: TypeNode | undefined;
    let paramNodes = entries;
    if (entries.length > 0 && this.isTypeNodeList(entries[entries.length - 1])) {
      returnType = this.nodeToType(entries[entries.length - 1]);
      paramNodes = entries.slice(0, -1);
    }
    for (const paramNode of paramNodes) {
      if (paramNode.type === "atom") {
        throw reportError("T2:0170");
      }
    }
    const parameters = paramNodes.map((paramNode) => this.parseFnParam(paramNode));
    const thisParamIndex = parameters.findIndex((param) => param.name.name === "this");
    if (thisParamIndex >= 0) {
      if (thisParamIndex !== 0) {
        throw reportError("T2:0252");
      }
      if (!parameters[0].typeAnnotation) {
        throw reportError("T2:0253");
      }
      if (parameters.length > 1 && parameters.slice(1).some((param) => param.name.name === "this")) {
        throw reportError("T2:0250");
      }
    }
    return { parameters, returnType };
  }

  private parseFnParam(node: Node): { name: Identifier; typeAnnotation?: TypeNode; paramProperty?: { access?: "public" | "protected" | "private"; readonly?: boolean }; defaultValue?: Expression } {
    if (node.type !== "list" || node.elements.length === 0) {
      throw reportError("T2:0167");
    }

    const elements = node.elements;
    if (elements[0].type === "atom" && elements[0].value === "this") {
      if (elements.length !== 2) {
        throw reportError("T2:0253");
      }
      return { name: this.nodeToIdentifier(elements[0], "fn param name"), typeAnnotation: this.nodeToType(elements[1]) };
    }

    let idx = 0;
    const modifiers: string[] = [];
    while (idx < elements.length) {
      const entry = elements[idx];
      if (entry.type === "atom" && entry.tokenType === "atom") {
        const value = entry.value;
        if (value === "public" || value === "private" || value === "protected" || value === "readonly") {
          modifiers.push(value);
          idx++;
          continue;
        }
      }
      break;
    }

    if (idx >= elements.length) {
      throw reportError("T2:0169");
    }

    const name = this.nodeToIdentifier(elements[idx], "fn param name");
    idx++;

    if (name.name === "this") {
      throw reportError("T2:0251");
    }

    let typeAnnotation: TypeNode | undefined;
    let defaultValue: Expression | undefined;
    if (idx < elements.length) {
      const next = elements[idx];
      if (next.type === "atom" && next.value === "default") {
        idx++;
        if (idx >= elements.length) {
          throw reportError("T2:0147");
        }
        defaultValue = this.nodeToExpression(elements[idx]);
        idx++;
      } else {
        typeAnnotation = this.nodeToType(next);
        idx++;
        const maybeDefault = elements[idx];
        if (idx < elements.length && maybeDefault.type === "atom" && maybeDefault.value === "default") {
          idx++;
          if (idx >= elements.length) {
            throw reportError("T2:0147");
          }
          defaultValue = this.nodeToExpression(elements[idx]);
          idx++;
        }
      }
    }
    if (idx < elements.length) {
      throw reportError("T2:0168");
    }

    let paramProperty: { access?: "public" | "protected" | "private"; readonly?: boolean } | undefined;
    if (modifiers.length > 0) {
      let access: "public" | "protected" | "private" | undefined;
      let readonlyFlag = false;
      for (const modifier of modifiers) {
        if (modifier === "readonly") {
          if (readonlyFlag) {
            throw reportError("T2:0230");
          }
          readonlyFlag = true;
          continue;
        }
        if (access) {
          throw reportError("T2:0231");
        }
        access = modifier as "public" | "protected" | "private";
      }
      const property: { access?: "public" | "protected" | "private"; readonly?: boolean } = {};
      if (access) {
        property.access = access;
      }
      if (readonlyFlag) {
        property.readonly = true;
      }
      paramProperty = property;
    }

    return { name, typeAnnotation, paramProperty, defaultValue };
  }

  private buildClass(node: ListNode): ClassExpr {
    const span = node.span;
    const [, nameNode, ...restNodes] = node.elements;
    if (!nameNode) {
      throw reportError("T2:0140");
    }
    const name = this.nodeToIdentifier(nameNode, "class name");
    let typeParams: TypeParam[] | undefined;
    let bodyNode: ListNode | undefined;
    let extendsExpr: Expression | null | undefined;
    let implementsExprs: Expression[] | undefined;
    let abstract = false;
    let decorators: Expression[] | undefined;
    for (const child of restNodes) {
      if (child.type === "list" && child.elements.length > 0 && child.elements[0].type === "atom") {
        const head = child.elements[0].value;
        if (head === "typeparams") {
          if (typeParams) {
            throw reportError("T2:0135");
          }
          typeParams = this.parseTypeParams(child);
          continue;
        }
        if (head === "class-body") {
          if (bodyNode) {
            throw reportError("T2:0139");
          }
          bodyNode = child;
          continue;
        }
        if (head === "decorators") {
          if (decorators) {
            throw reportError("T2:0136");
          }
          if (child.elements.length < 2) {
            throw reportError("T2:0143");
          }
          decorators = child.elements.slice(1).map((dec) => this.nodeToExpression(dec));
          continue;
        }
        if (head === "abstract") {
          if (abstract) {
            throw reportError("T2:0134");
          }
          if (child.elements.length !== 1) {
            throw reportError("T2:0123");
          }
          abstract = true;
          continue;
        }
        if (head === "extends") {
          if (extendsExpr) {
            throw reportError("T2:0137");
          }
          if (child.elements.length !== 2) {
            throw reportError("T2:0164");
          }
          extendsExpr = this.nodeToExpression(child.elements[1]);
          continue;
        }
        if (head === "implements") {
          if (implementsExprs) {
            throw reportError("T2:0138");
          }
          if (child.elements.length < 2) {
            throw reportError("T2:0182");
          }
          implementsExprs = child.elements.slice(1).map((impl) => this.nodeToExpression(impl));
          continue;
        }
      }
      throw reportError("T2:0140");
    }
    if (!bodyNode) {
      throw reportError("T2:0140");
    }
    const body = this.buildClassBody(bodyNode);
    return new ClassExpr({ name, body, span, typeParams, extends: extendsExpr, implements: implementsExprs, abstract, decorators });
  }

  private buildClassBody(node: ListNode): { statements: ClassMember[] } {
    if (node.elements.length === 0 || node.elements[0].type !== "atom" || node.elements[0].value !== "class-body") {
      throw reportError("T2:0133");
    }
    const statements: ClassMember[] = [];
    for (const child of node.elements.slice(1)) {
      const stmt = this.nodeToStatement(child);
      if (
        stmt instanceof BlockStmt ||
        stmt instanceof StaticBlockStmt ||
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
        stmt instanceof ClassExpr ||
        stmt instanceof IndexSignature
      ) {
        statements.push(stmt);
      } else {
        throw reportError("T2:0132");
      }
    }
    return { statements };
  }

  private buildTypeInterface(node: ListNode): InterfaceStmt {
    const span = node.span;
    const [, nameNode, bodyNode] = node.elements;
    if (!nameNode || !bodyNode || bodyNode.type !== "list") {
      throw reportError("T2:0277");
    }
    const name = this.nodeToIdentifier(nameNode, "type-interface name");
    const body = this.buildInterfaceBody(bodyNode);
    return new InterfaceStmt({ name, body, span });
  }

  private buildInterfaceBody(node: ListNode): { fields: TypeField[]; indexSignatures?: IndexSignature[] } {
    if (node.elements.length === 0 || node.elements[0].type !== "atom" || node.elements[0].value !== "interface-body") {
      throw reportError("T2:0199");
    }
    const fields: TypeField[] = [];
    const indexSignatures: IndexSignature[] = [];
    for (const child of node.elements.slice(1)) {
      if (child.type === "list" && child.elements.length > 0) {
        const head = child.elements[0];
        if (head.type === "atom" && head.value === "index-signature") {
          indexSignatures.push(this.buildIndexSignature(child));
          continue;
        }
      }
      fields.push(this.nodeToTypeField(child));
    }
    return { fields, indexSignatures: indexSignatures.length > 0 ? indexSignatures : undefined };
  }

  private buildIndexSignature(node: ListNode): IndexSignature {
    const span = node.span;
    const [, paramNode, valueTypeNode, ...rest] = node.elements;
    if (!paramNode || !valueTypeNode || paramNode.type !== "list") {
      throw reportError("T2:0198");
    }
    if (paramNode.elements.length < 2) {
      throw reportError("T2:0197");
    }
    const key = this.nodeToIdentifier(paramNode.elements[0], "index-signature key");
    const keyType = this.nodeToType(paramNode.elements[1]);
    const valueType = this.nodeToType(valueTypeNode);
    let readonlyFlag: boolean | undefined;
    for (const child of rest) {
      if (child.type === "atom" && child.value === "readonly") {
        readonlyFlag = true;
        continue;
      }
      throw reportError("T2:0196");
    }
    return new IndexSignature({ key, keyType, valueType, readonlyFlag, span });
  }

  private buildImport(node: ListNode): ImportStmt {
    const span = node.span;
    const head = node.elements[0];
    if (head.type !== "atom") {
      throw reportError("T2:0194");
    }
    const kind = head.value;
    if (kind === "import") {
      const specNode = node.elements[1];
      if (!specNode || specNode.type !== "list") {
        throw reportError("T2:0188");
      }
      const spec = this.parseImportSpec(specNode);
      return new ImportStmt({ spec, span });
    }
    if (kind === "import-default") {
      const nameNode = node.elements[1];
      const sourceNode = node.elements[2];
      if (!nameNode || !sourceNode) {
        throw reportError("T2:0184");
      }
      const name = this.nodeToIdentifier(nameNode, "import-default name");
      const source = this.parseModuleSpecifier(sourceNode);
      return new ImportStmt({ spec: { source, defaultBinding: name }, span });
    }
    if (kind === "import-named") {
      const listNode = node.elements[1];
      const sourceNode = node.elements[2];
      if (!listNode || listNode.type !== "list" || !sourceNode) {
        throw reportError("T2:0187");
      }
      const named: NamedImport[] = listNode.elements.map((child) => this.parseNamedImport(child));
      const source = this.parseModuleSpecifier(sourceNode);
      return new ImportStmt({ spec: { source, named }, span });
    }
    if (kind === "import-all") {
      const aliasNode = node.elements[1];
      const sourceNode = node.elements[2];
      if (!aliasNode || !sourceNode) {
        throw reportError("T2:0183");
      }
      const alias = this.nodeToIdentifier(aliasNode, "import-all alias");
      const source = this.parseModuleSpecifier(sourceNode);
      return new ImportStmt({ spec: { source, namespaceBinding: alias }, span });
    }
    throw reportError("T2:0296", { kind });
  }

  private buildExport(node: ListNode): ExportStmt {
    const span = node.span;
    const head = node.elements[0];
    if (head.type !== "atom") {
      throw reportError("T2:0162");
    }
    if (head.value === "export") {
      const entries = node.elements.slice(1);
      if (entries.length === 0) {
        throw reportError("T2:0157");
      }
      const first = entries[0];
      if (first.type === "list" && first.elements.length > 0) {
        const specHead = first.elements[0];
        if (specHead.type === "atom" && specHead.value === "export-spec") {
          const spec = this.parseExportSpec(first);
          return new ExportStmt({ spec, span });
        }
      }
      const named: NamedExport[] = entries.map((entry) => this.parseNamedExport(entry));
      return new ExportStmt({ spec: { named }, span });
    }
    if (head.value === "export-default") {
      const declarationNode = node.elements[1];
      if (!declarationNode) {
        throw reportError("T2:0153");
      }
      const declaration = this.nodeToExpression(declarationNode);
      return new ExportStmt({ spec: { defaultExport: declaration }, span });
    }
    const nameNode = node.elements[1];
    if (!nameNode) {
      throw reportError("T2:0156");
    }
    const local = this.nodeToExpression(nameNode);
    const identifier = this.ensureIdentifierExpression(local, "export name");
    const named: NamedExport[] = [{ exported: identifier.name, local: identifier }];
    return new ExportStmt({ spec: { named }, span });
  }

  private parseImportSpec(node: ListNode): { source: Literal; defaultBinding?: Identifier; namespaceBinding?: Identifier; named?: NamedImport[] } {
    const head = node.elements[0];
    if (!head || head.type !== "atom" || head.value !== "import-spec") {
      throw reportError("T2:0191");
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
              throw reportError("T2:0189");
            }
            defaultBinding = this.nodeToIdentifier(nameNode, "import default name");
            continue;
          }
          if (specHead.value === "namespace") {
            const nameNode = child.elements[1];
            if (!nameNode) {
              throw reportError("T2:0192");
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
      throw reportError("T2:0190");
    }
    if (!source) {
      throw reportError("T2:0193");
    }
    return { source, defaultBinding, namespaceBinding, named };
  }

  private parseExportSpec(node: ListNode): { source?: Literal; named?: NamedExport[]; defaultExport?: Expression; namespaceExport?: Identifier } {
    const head = node.elements[0];
    if (!head || head.type !== "atom" || head.value !== "export-spec") {
      throw reportError("T2:0160");
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
              throw reportError("T2:0158");
            }
            defaultExport = this.nodeToExpression(exprNode);
            continue;
          }
          if (specHead.value === "namespace") {
            const nameNode = child.elements[1];
            if (!nameNode) {
              throw reportError("T2:0161");
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
      throw reportError("T2:0159");
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
        throw reportError("T2:0155");
      }
      const localIdent = new Identifier({ name: localNode.value, span: localNode.span });
      return { exported: exportedNode.value, local: localIdent };
    }
    throw reportError("T2:0154");
  }

  private parseModuleSpecifier(node: Node): Literal {
    const expr = this.nodeToExpression(node);
    if (!(expr instanceof Literal)) {
      throw reportError("T2:0208");
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
        throw reportError("T2:0185");
      }
      const localIdent = new Identifier({ name: localNode.value, span: localNode.span });
      return { imported: importedNode.value, local: localIdent };
    }
    throw reportError("T2:0186");
  }

  private nodeToIdentifier(node: Node, label: string): Identifier {
    if (node.type === "atom") {
      return new Identifier({ name: node.value, span: node.span });
    }
    const expr = this.nodeToExpression(node);
    if (expr instanceof Identifier) {
      return expr;
    }
    throw reportError("T2:0119", { label });
  }

  private ensureIdentifierExpression(expr: Expression, label: string): Identifier {
    if (expr instanceof Identifier) {
      return expr;
    }
    throw reportError("T2:0118", { label });
  }

  private buildCatchClause(node: ListNode): CatchClause {
    const [, ...rest] = node.elements;
    let binding: Binding | undefined;
    let bodyStartIndex = 1;
    if (rest.length > 0) {
      const first = rest[0];
      if (first.type === "atom") {
        binding = { target: this.nodeToBindingTarget(first) };
        bodyStartIndex = 2;
      } else if (
        first.type === "list" &&
        first.elements.length <= 2 &&
        this.isBindingCandidate(first)
      ) {
        binding = this.nodeToBinding(first);
        bodyStartIndex = 2;
      }
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
      throw reportError("T2:0289");
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
      throw reportError("T2:0276");
    }
    const returns = this.nodeToType(entries[entries.length - 1]);
    const params = this.parseTypeFunctionParams(entries.slice(0, -1));
    return new TypeFunction({ typeParams, params, returns, span });
  }

  private parseTypeFunctionParams(nodes: Node[]): TypeNode[] {
    if (nodes.length === 0) {
      return [];
    }
    const params: TypeNode[] = [];
    let hasTyped = false;
    let hasUntyped = false;
    for (const node of nodes) {
      const entries = this.expandTypeFunctionParamNode(node);
      for (const entry of entries) {
        params.push(entry.typeNode);
        if (entry.hasType) {
          hasTyped = true;
        } else {
          hasUntyped = true;
        }
      }
    }
    if (hasTyped && hasUntyped) {
      throw reportError("T2:0275");
    }
    return params;
  }

  private expandTypeFunctionParamNode(node: Node): Array<{ typeNode: TypeNode; hasType: boolean }> {
    if (this.isTypeLikeNode(node)) {
      return [{ typeNode: this.nodeToType(node), hasType: true }];
    }
    if (node.type !== "list") {
      throw reportError("T2:0274");
    }
    if (node.elements.length === 0) {
      return [];
    }
    if (node.elements.every((child) => child.type === "atom")) {
      return this.expandAtomParamSequence(node.elements as AtomNode[]);
    }
    const entries: Array<{ typeNode: TypeNode; hasType: boolean }> = [];
    for (const child of node.elements) {
      entries.push(...this.expandTypeFunctionParamNode(child));
    }
    return entries;
  }

  private expandAtomParamSequence(atoms: AtomNode[]): Array<{ typeNode: TypeNode; hasType: boolean }> {
    const entries: Array<{ typeNode: TypeNode; hasType: boolean }> = [];
    let i = 0;
    let sawTyped = false;
    let sawUntyped = false;
    while (i < atoms.length) {
      const current = atoms[i];
      const next = atoms[i + 1];
      if (next && this.isTypeAtom(next)) {
        entries.push({ typeNode: this.nodeToType(next), hasType: true });
        sawTyped = true;
        i += 2;
        continue;
      }
      entries.push({ typeNode: this.createAnyType(current.span), hasType: false });
      sawUntyped = true;
      i += 1;
    }
    if (sawTyped && sawUntyped) {
      throw reportError("T2:0275");
    }
    return entries;
  }

  private isTypeLikeNode(node: Node): boolean {
    if (node.type === "atom") {
      return this.isTypeAtom(node);
    }
    return this.isTypeNodeList(node);
  }

  private isTypeAtom(atom: AtomNode): boolean {
    if (PRIMITIVE_NAME_MAP[atom.value]) {
      return true;
    }
    return atom.value.startsWith("type-");
  }

  private createAnyType(span: Span): TypePrimitive {
    return new TypePrimitive({ kind: "type-any", span });
  }

  private buildTFn(node: ListNode): TypeFunction {
    const span = node.span;
    let entries = node.elements.slice(1);
    let typeParams: TypeParam[] | undefined;
    const paramMarkerIndex = entries.findIndex((child) => child.type === "atom" && child.value === ":type-params");
    if (paramMarkerIndex >= 0) {
      const paramsNode = entries[paramMarkerIndex + 1];
      if (!paramsNode) {
        throw reportError("T2:0288");
      }
      typeParams = this.parseTypeParamNames(paramsNode);
      entries = entries.slice(0, paramMarkerIndex);
    }
    if (entries.length === 0) {
      throw reportError("T2:0249");
    }
    const returns = this.nodeToType(entries[entries.length - 1]);
    const params = entries.slice(0, -1).map((child) => this.nodeToType(child));
    return new TypeFunction({ typeParams, params, returns, span });
  }

  private buildTPrimitive(node: ListNode): TypePrimitive {
    const span = node.span;
    const [, nameNode] = node.elements;
    if (!nameNode) {
      throw reportError("T2:0259");
    }
    const name = this.nodeToStringLiteral(nameNode, "t:primitive name");
    const kind = PRIMITIVE_NAME_MAP[name];
    if (!kind) {
      throw reportError("T2:0297", { name });
    }
    return new TypePrimitive({ kind, span });
  }

  private buildTVar(node: ListNode): TypeVar {
    const span = node.span;
    const [, nameNode] = node.elements;
    if (!nameNode) {
      throw reportError("T2:0266");
    }
    const name = this.nodeToIdentifier(nameNode, "t:var name");
    return new TypeVar({ name, span });
  }

  private buildTypeObject(node: ListNode): TypeObject {
    const span = node.span;
    const fields = node.elements.slice(1).map((child) => this.nodeToTypeField(child));
    return new TypeObject({ fields, span });
  }

  private buildTTuple(node: ListNode): TypeTuple {
    const span = node.span;
    const types = node.elements.slice(1).map((child) => this.nodeToType(child));
    return new TypeTuple({ types, span });
  }

  private buildTArray(node: ListNode): TypeArray {
    const span = node.span;
    const [, elementNode] = node.elements;
    if (!elementNode) {
      throw reportError("T2:0246");
    }
    return new TypeArray({ element: this.nodeToType(elementNode), span });
  }

  private buildTNullable(node: ListNode): TypeNullable {
    const span = node.span;
    const [, innerNode] = node.elements;
    if (!innerNode) {
      throw reportError("T2:0258");
    }
    return new TypeNullable({ inner: this.nodeToType(innerNode), span });
  }

  private buildTKeyof(node: ListNode): TypeKeyof {
    const span = node.span;
    const [, targetNode] = node.elements;
    if (!targetNode) {
      throw reportError("T2:0257");
    }
    return new TypeKeyof({ target: this.nodeToType(targetNode), span });
  }

  private buildTTypeof(node: ListNode): TypeTypeof {
    const span = node.span;
    const [, exprNode] = node.elements;
    if (!exprNode) {
      throw reportError("T2:0265");
    }
    return new TypeTypeof({ expr: this.nodeToExpression(exprNode), span });
  }

  private buildTIndexed(node: ListNode): TypeIndexed {
    const span = node.span;
    const [, objectNode, indexNode] = node.elements;
    if (!objectNode || !indexNode) {
      throw reportError("T2:0255");
    }
    return new TypeIndexed({ object: this.nodeToType(objectNode), index: this.nodeToType(indexNode), span });
  }

  private buildTConditional(node: ListNode): TypeConditional {
    const span = node.span;
    const [, checkNode, extendsNode, trueNode, falseNode] = node.elements;
    if (!checkNode || !extendsNode || !trueNode || !falseNode) {
      throw reportError("T2:0247");
    }
    return new TypeConditional({ check: this.nodeToType(checkNode), extendsType: this.nodeToType(extendsNode), trueType: this.nodeToType(trueNode), falseType: this.nodeToType(falseNode), span });
  }

  private buildTInfer(node: ListNode): TypeInfer {
    const span = node.span;
    const [, nameNode] = node.elements;
    if (!nameNode) {
      throw reportError("T2:0256");
    }
    const name = this.nodeToIdentifier(nameNode, "t:infer name");
    return new TypeInfer({ name, span });
  }

  private buildTypeThis(node: ListNode): TypeThis {
    if (node.elements.length !== 1) {
      throw reportError("T2:0290");
    }
    return new TypeThis({ span: node.span });
  }

  private nodeToTypeField(node: Node): TypeField {
    if (node.type !== "list" || node.elements.length < 2) {
      throw reportError("T2:0282");
    }
    const keyNode = node.elements[0];
    if (keyNode.type !== "atom") {
      throw reportError("T2:0281");
    }
    const valueNode = node.elements[1];
    let optional: boolean | undefined;
    let readonlyFlag: boolean | undefined;
    let index = 2;
    while (index < node.elements.length) {
      const flagNode = node.elements[index];
      const valueArg = node.elements[index + 1];
      if (!valueArg) {
        const modifier = flagNode?.type === "atom" ? flagNode.value : "?";
        throw reportError("T2:0165", { modifier });
      }
      if (flagNode.type !== "atom") {
        throw reportError("T2:0166");
      }
      const flagValue = this.nodeToBooleanValue(valueArg, flagNode.value);
      if (flagNode.value === ":optional") {
        optional = flagValue;
      } else if (flagNode.value === ":readonly") {
        readonlyFlag = flagValue;
      } else {
        throw reportError("T2:0295", { modifier: flagNode.value });
      }
      index += 2;
    }
    return new TypeField({ key: keyNode.value, fieldType: this.nodeToType(valueNode), span: node.span, optional, readonlyFlag });
  }

  private buildTypeUnion(node: ListNode): TypeUnion {
    const span = node.span;
    const types = node.elements.slice(1).map((child) => this.nodeToType(child));
    if (types.length === 0) {
      throw reportError("T2:0291");
    }
    return new TypeUnion({ types, span });
  }

  private buildTypeIntersection(node: ListNode): TypeIntersection {
    const span = node.span;
    const types = node.elements.slice(1).map((child) => this.nodeToType(child));
    if (types.length === 0) {
      throw reportError("T2:0278");
    }
    return new TypeIntersection({ types, span });
  }

  private buildTypeLiteral(node: ListNode): TypeLiteral {
    const span = node.span;
    const values = node.elements.slice(1).map((child) => this.nodeToLiteral(child));
    return new TypeLiteral({ value: values, span });
  }

  private buildTypeTemplate(node: ListNode): TypeTemplateLiteral {
    const span = node.span;
    const parts = node.elements.slice(1).map((child) => {
      if (child.type === "atom" && child.tokenType === "string") {
        return child.value;
      }
      return this.nodeToType(child);
    });
    return new TypeTemplateLiteral({ parts, span });
  }

  private nodeToLiteral(node: Node): Literal {
    if (node.type === "atom") {
      const value = this.atomToValue(node);
      if (value instanceof Literal) {
        return value;
      }
    }
    throw reportError("T2:0152");
  }

  private buildTypeMapped(node: ListNode): TypeMapped {
    const span = node.span;
    const [, paramNode, valueNode, ...rest] = node.elements;
    if (!paramNode || !valueNode) {
      throw reportError("T2:0279");
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
      throw reportError("T2:0280");
    }
    return new TypeMapped({ typeParam, valueType, nameRemap, readonlyModifier, optionalModifier, via, span });
  }

  private buildTypeApp(node: ListNode, parseExpr: (node: Node) => Expression | TypeNode): TypeApp {
    const span = node.span;
    const [, exprNode, ...args] = node.elements;
    if (!exprNode) {
      throw reportError("T2:0269");
    }
    if (args.length === 0) {
      throw reportError("T2:0270");
    }
    const expr = parseExpr(exprNode);
    const typeArgs = args.map((child) => this.nodeToType(child));
    return new TypeApp({ expr, typeArgs, span });
  }

  private buildTypeAssert(node: ListNode): TypeAssertExpr {
    const span = node.span;
    const [, exprNode, typeNode] = node.elements;
    if (!exprNode || !typeNode) {
      throw reportError("T2:0271");
    }
    return new TypeAssertExpr({ expr: this.nodeToExpression(exprNode), assertedType: this.nodeToType(typeNode), span });
  }

  private buildTypeAlias(node: ListNode): TypeAliasStmt {
    const span = node.span;
    const [, nameNode, ...rest] = node.elements;
    if (!nameNode) {
      throw reportError("T2:0268");
    }
    const name = this.nodeToIdentifier(nameNode, "type-alias name");
    let typeNodes = rest;
    let typeParams: TypeParam[] | undefined;
    if (typeNodes.length > 0 && this.isTypeParamsList(typeNodes[0])) {
      typeParams = this.parseTypeParams(typeNodes[0]);
      typeNodes = typeNodes.slice(1);
    }
    if (typeNodes.length !== 1) {
      throw reportError("T2:0267");
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
      "type-void",
      "type-any",
      "type-unknown",
      "type-never",
      "type-object",
      "type-symbol",
      "type-bigint",
      "type-this",
      "type-ref",
      "type-function",
      "type-object",
      "type-union",
      "type-intersection",
      "type-literal",
      "type-template",
      "type-mapped",
      "type-app",
    ]);
    const tHeads = new Set([
      "t:primitive",
      "t:var",
      "t:ref",
      "t:fn",
      "t:object",
      "t:union",
      "t:intersection",
      "t:tuple",
      "t:array",
      "t:nullable",
      "t:literal",
      "t:template",
      "t:this",
      "t:keyof",
      "t:typeof",
      "t:indexed",
      "t:conditional",
      "t:infer",
      "t:mapped",
      "t:apply",
    ]);
    return typeHeads.has(head.value) || tHeads.has(head.value);
  }

  private parseTypeParams(node: Node): TypeParam[] {
    if (!this.isTypeParamsList(node)) {
      throw reportError("T2:0287");
    }
    return node.elements.slice(1).map((child) => this.parseTypeParam(child));
  }

  private parseTypeParam(node: Node): TypeParam {
    if (node.type !== "list" || node.elements.length === 0) {
      throw reportError("T2:0285");
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
          throw reportError("T2:0283");
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
            throw reportError("T2:0163");
          }
          constraint = this.nodeToType(attr.elements[1]);
          continue;
        }
        if (head === "default") {
          if (attr.elements.length < 2) {
            throw reportError("T2:0144");
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
      throw reportError("T2:0284");
    }
    return new TypeParam({ name, span: node.span, variance, constraint, defaultType, const: constFlag, infer: inferFlag });
  }

  private nodeToBooleanValue(node: Node, label: string): boolean {
    const expr = this.nodeToExpression(node);
    if (expr instanceof Literal && typeof expr.value === "boolean") {
      return expr.value;
    }
    throw reportError("T2:0120", { label });
  }

  private nodeToStringLiteral(node: Node, label: string): string {
    const expr = this.nodeToExpression(node);
    if (expr instanceof Literal && typeof expr.value === "string") {
      return expr.value;
    }
    throw reportError("T2:0121", { label });
  }

  private parseTypeParamNames(node: Node): TypeParam[] {
    if (node.type !== "list") {
      throw reportError("T2:0286");
    }
    return node.elements.map((child) => {
      const ident = this.nodeToIdentifier(child, "type-param name");
      return new TypeParam({ name: ident, span: child.span });
    });
  }

  private nodeToType(node: Node): TypeNode {
    if (node.type === "atom") {
      const primitiveKind = PRIMITIVE_NAME_MAP[node.value];
      if (primitiveKind) {
        return new TypePrimitive({ kind: primitiveKind, span: node.span });
      }
      const identifier = this.nodeToIdentifier(node, "type reference");
      return new TypeRef({ identifier, span: node.span });
    }
    if (node.type !== "list" || node.elements.length === 0) {
      throw reportError("T2:0273");
    }
    const head = node.elements[0];
    if (head.type !== "atom") {
      throw reportError("T2:0272");
    }
    switch (head.value) {
      case "type-string":
      case "type-number":
      case "type-boolean":
      case "type-null":
      case "type-undefined":
      case "type-void":
      case "type-any":
      case "type-unknown":
      case "type-never":
      case "type-symbol":
      case "type-bigint":
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
      case "type-template":
        return this.buildTypeTemplate(node);
      case "type-this":
        return this.buildTypeThis(node);
      case "type-mapped":
        return this.buildTypeMapped(node);
      case "type-app":
        return this.buildTypeApp(node, (child) => this.nodeToType(child));
      case "t:primitive":
        return this.buildTPrimitive(node);
      case "t:var":
        return this.buildTVar(node);
      case "t:ref":
        return this.buildTypeRef(node);
      case "t:fn":
        return this.buildTFn(node);
      case "t:object":
        return this.buildTypeObject(node);
      case "t:union":
        return this.buildTypeUnion(node);
      case "t:intersection":
        return this.buildTypeIntersection(node);
      case "t:tuple":
        return this.buildTTuple(node);
      case "t:array":
        return this.buildTArray(node);
      case "t:nullable":
        return this.buildTNullable(node);
      case "t:literal":
        return this.buildTypeLiteral(node);
      case "t:template":
        return this.buildTypeTemplate(node);
      case "t:this":
        return this.buildTypeThis(node);
      case "t:keyof":
        return this.buildTKeyof(node);
      case "t:typeof":
        return this.buildTTypeof(node);
      case "t:indexed":
        return this.buildTIndexed(node);
      case "t:conditional":
        return this.buildTConditional(node);
      case "t:infer":
        return this.buildTInfer(node);
      case "t:mapped":
        return this.buildTypeMapped(node);
      case "t:apply":
        return this.buildTypeApp(node, (child) => this.nodeToType(child));
      default:
        throw reportError("T2:0300", { constructor: head.value });
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