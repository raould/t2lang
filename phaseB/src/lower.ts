import type {
  PhaseBListNode,
  PhaseBNode,
  PhaseBTypeAnnotation,
  PhaseBDottedIdentifier,
  SymbolNode,
  LiteralNode,
} from "./reader.js";
import type { SourceLoc } from "./location.js";
import {
  Program,
  ExprStmt,
  AssignExpr,
  CallExpr,
  PropExpr,
  Identifier,
  Literal,
  LetStarExpr,
  type Statement,
  type Expression,
  type Binding,
  type Span,
} from "../../phaseA/dist/phaseA0.js";

const LET_FORMS = new Set(["let", "let*", "const", "const*"]);

export function lowerPhaseB(nodes: PhaseBNode[]): Program {
  const body = nodes.map(lowerStatement);
  const span = nodes.length > 0 ? spanFromLoc(nodes[0].loc) : emptySpan();
  return new Program({ body, span });
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
      if (symbolHead.name === "assign") {
        return lowerAssign(listNode);
      }
    }
    return new ExprStmt({ expr: lowerExpression(listNode), span: spanFromLoc(listNode.loc) });
  }
  return new ExprStmt({ expr: lowerExpression(node), span: spanFromLoc(node.loc) });
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
  const target = lowerIdentifier(targetNode);
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

function lowerExpression(node: PhaseBNode): Expression {
  switch (node.phaseKind) {
    case "literal": {
      const literal = node as LiteralNode;
      return new Literal({ value: literal.value, span: spanFromLoc(node.loc) });
    }
    case "symbol": {
      const symbol = node as SymbolNode;
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
  if (head && head.phaseKind === "symbol") {
    const symbolHead = head as SymbolNode;
    switch (symbolHead.name) {
      case "call": {
        const callee = rest[0] ? lowerExpression(rest[0]) : new Identifier({ name: "<missing>", span });
        const args = rest.slice(1).map(lowerExpression);
        return new CallExpr({ callee, args, span });
      }
      case "prop": {
        const objectNode = rest[0];
        const propertyNode = rest[1];
        const object = objectNode ? lowerExpression(objectNode) : new Identifier({ name: "<missing>", span });
        const name = propertyNode ? extractPropertyName(propertyNode) : "<missing>";
        return new PropExpr({ object, name, span });
      }
      default:
        break;
    }
  }
  if (!head) {
    return new Literal({ value: null, span });
  }
  const callee = lowerExpression(head);
  const args = rest.map(lowerExpression);
  return new CallExpr({ callee, args, span });
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
