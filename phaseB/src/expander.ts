import type { ListNode, PhaseBListNode, PhaseBNode, PhaseBTypeAnnotation, SExprNode, SymbolNode } from "./reader.js";
import type { ExpansionFrame, SourceLoc } from "./location.js";
import { MacroRegistry } from "./macroRegistry.js";
import { reportError } from "../../common/dist/errorRegistry.js";

const MAX_MACRO_EXPANSION_DEPTH = 100;
const MAX_MACRO_EXPANSION_MS = 500;

type MacroNode = PhaseBNode | SExprNode;
type MacroListNode = PhaseBListNode | ListNode;

interface ExpandContext {
  depth: number;
  start: number;
}

export function expand(nodes: MacroNode[], registry: MacroRegistry, context?: ExpandContext): MacroNode[] {
  const ctx: ExpandContext = context ?? { depth: 0, start: Date.now() };
  const result: MacroNode[] = [];
  for (const node of nodes) {
    result.push(...expandNode(node, registry, ctx));
  }
  return result;
}

function expandNode(node: MacroNode, registry: MacroRegistry, context: ExpandContext): MacroNode[] {
  ensureLimits(context);
  if (isListNode(node)) {
    if (tryRegisterDefmacro(node, registry)) {
      return [];
    }

    if (isQuasiquote(node)) {
      const payload = node.elements[1];
      return [convertQuasiquote(payload)];
    }

    const head = node.elements[0];
    if (isSymbolNode(head)) {
      const macro = registry.get(head.name);
      if (macro) {
        const argNodes = node.elements.slice(1);
        const args = argNodes.map((arg) => {
          const expanded = expandArg(arg, registry, context);
          return expanded[0] ?? cloneNode(arg);
        });
        const body = macro.body.map((entry) => substitute(entry, macro.params, args));
        const frame: ExpansionFrame = {
          macroName: macro.name,
          callSite: node.loc,
          macroDefSite: macro.loc,
        };
        const expanded = expand(body, registry, incrementDepth(context));
        return expanded.map((resultNode) => attachExpansionFrame(resultNode, frame));
      }
    }

    const expandedElements: MacroNode[] = [];
    for (const child of node.elements) {
      for (const expanded of expandNode(child, registry, incrementDepth(context))) {
        if (isSExprNode(expanded)) {
          expandedElements.push(expanded);
        }
      }
    }
    return [cloneListWithElements(node, expandedElements)];
  }
  ensureLimits(context);
  return [cloneNode(node)];
}

function expandArg(arg: MacroNode, registry: MacroRegistry, context: ExpandContext): MacroNode[] {
  return expandNode(arg, registry, incrementDepth(context));
}

function incrementDepth(context: ExpandContext): ExpandContext {
  const nextDepth = context.depth + 1;
  ensureLimits({ ...context, depth: nextDepth });
  return { ...context, depth: nextDepth };
}

function ensureLimits(context: ExpandContext): void {
  if (context.depth > MAX_MACRO_EXPANSION_DEPTH) {
    throw reportError("T2:0103", { depth: context.depth });
  }
  if (Date.now() - context.start > MAX_MACRO_EXPANSION_MS) {
    throw reportError("T2:0104", { duration: Date.now() - context.start });
  }
}

function tryRegisterDefmacro(node: MacroListNode, registry: MacroRegistry): boolean {
  const [head, nameNode, paramsNode, ...body] = node.elements;
  if (!isSymbolNode(head) || head.name !== "defmacro") {
    return false;
  }
  if (!nameNode || !isSymbolNode(nameNode)) {
    return false;
  }
  if (!paramsNode || !isListNode(paramsNode)) {
    return false;
  }
  const params = paramsNode.elements.filter(isSymbolNode).map((sym) => sym.name);
  registry.define({
    name: nameNode.name,
    params,
    body: body.map(cloneNode),
    loc: node.loc,
  });
  return true;
}

function substitute(node: MacroNode, params: string[], args: MacroNode[]): MacroNode {
  if (isSymbolNode(node)) {
    const paramIndex = params.indexOf(node.name);
    if (paramIndex >= 0 && args[paramIndex]) {
      return cloneNode(args[paramIndex]);
    }
    return cloneNode(node);
  }
  if (isListNode(node)) {
    return cloneListWithElements(
      node,
      node.elements.map((child) => {
        const substituted = substitute(child, params, args);
        if (!isSExprNode(substituted)) {
          throw reportError("T2:0101", child.loc);
        }
        return substituted;
      })
    );
  }
  return cloneNode(node);
}

function cloneListWithElements(node: MacroListNode, elements: MacroNode[]): MacroListNode {
  return { ...node, elements } as MacroListNode;
}

function cloneNode<T extends MacroNode>(node: T): T {
  return deepClone(node);
}

function deepClone<T>(value: T): T {
  if (typeof value !== "object" || value === null) {
    return value;
  }
  if (Array.isArray(value)) {
    return value.map((item) => deepClone(item)) as unknown as T;
  }
  const copy: Record<string, unknown> = {};
  for (const [key, entry] of Object.entries(value as Record<string, unknown>)) {
    copy[key] = deepClone(entry as never);
  }
  return copy as T;
}

function isListNode(node: MacroNode): node is MacroListNode {
  if ("phaseKind" in node) {
    return node.phaseKind === "list";
  }
  return node.kind === "list";
}

function isSymbolNode(node: MacroNode | undefined): node is SymbolNode & { phaseKind?: "symbol" } {
  if (!node) {
    return false;
  }
  if ("phaseKind" in node) {
    return node.phaseKind === "symbol";
  }
  return node.kind === "symbol";
}

function isSExprNode(node: MacroNode): node is SExprNode | PhaseBNode | PhaseBTypeAnnotation {
  if ("phaseKind" in node) {
    return (
      node.phaseKind === "symbol" ||
      node.phaseKind === "literal" ||
      node.phaseKind === "list" ||
      node.phaseKind === "dotted" ||
      node.phaseKind === "type-annotation"
    );
  }
  return node.kind === "symbol" || node.kind === "literal" || node.kind === "list";
}

function isQuasiquote(node: MacroListNode): boolean {
  return node.elements.length >= 2 && isSymbolNode(node.elements[0]) && node.elements[0].name === "quasiquote";
}

function convertQuasiquote(node: MacroNode): MacroNode {
  if (isListNode(node)) {
    const head = node.elements[0];
    if (isSymbolNode(head)) {
      if (head.name === "unquote") {
        return node.elements[1];
      }
      if (head.name === "unquote-splicing") {
        throw reportError("T2:0102", node.loc);
      }
    }
    const listSymbol = createSymbol("list", node.loc);
    const elements: MacroNode[] = [];
    for (const child of node.elements) {
      if (isListNode(child)) {
        const childHead = child.elements[0];
        if (isSymbolNode(childHead) && childHead.name === "unquote") {
          const unquoted = child.elements[1];
          if (!unquoted) {
            throw reportError("T2:0102", child.loc);
          }
          elements.push(unquoted);
          continue;
        }
        if (isSymbolNode(childHead) && childHead.name === "unquote-splicing") {
          const unquoted = child.elements[1];
          if (!unquoted || !isListNode(unquoted)) {
            throw reportError("T2:0102", child.loc);
          }
          elements.push(...unquoted.elements.map((entry) => cloneNode(entry)));
          continue;
        }
      }
      elements.push(convertQuasiquoteElement(child));
    }
    return {
      kind: "list",
      elements: [listSymbol, ...elements],
      loc: node.loc,
      delimiter: "(",
      phaseKind: "list",
    } as PhaseBListNode;
  }
  return createQuoteNode(node);
}

function convertQuasiquoteElement(node: MacroNode): MacroNode {
  if (isListNode(node)) {
    return convertQuasiquote(node);
  }
  return createQuoteNode(node);
}

function createSymbol(name: string, loc: SourceLoc): SymbolNode & PhaseBNode {
  return { kind: "symbol", name, loc, phaseKind: "symbol" } as SymbolNode & PhaseBNode;
}

function createQuoteNode(node: MacroNode): PhaseBListNode {
  const quoteSym = createSymbol("quote", node.loc);
  return {
    kind: "list",
    elements: [quoteSym, cloneNode(node) as PhaseBNode],
    loc: node.loc,
    delimiter: "(",
    phaseKind: "list",
  };
}

function attachExpansionFrame(node: MacroNode, frame: ExpansionFrame): MacroNode {
  const expandedStack = [...(node.expansionStack ?? []), frame];
  if (isListNode(node)) {
    const elements = node.elements.map((child) => attachExpansionFrame(child, frame));
    if ("phaseKind" in node) {
      return { ...node, elements: elements as PhaseBNode[], expansionStack: expandedStack };
    }
    return { ...node, elements: elements as SExprNode[], expansionStack: expandedStack };
  }
  return { ...node, expansionStack: expandedStack };
}