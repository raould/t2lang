import type { ListNode, SExprNode, SymbolNode } from "./reader.js";
import type { ExpansionFrame, SourceLoc } from "./location.js";
import { MacroRegistry } from "./macroRegistry.js";
import { reportError } from "../../common/dist/errorRegistry.js";
import type { PhaseBSurfaceNode } from "./ast.js";

const MAX_MACRO_EXPANSION_DEPTH = 100;
const MAX_MACRO_EXPANSION_MS = 500;

interface ExpandContext {
  depth: number;
  start: number;
}

export function expand(nodes: PhaseBSurfaceNode[], registry: MacroRegistry, context?: ExpandContext): PhaseBSurfaceNode[] {
  const ctx: ExpandContext = context ?? { depth: 0, start: Date.now() };
  const result: PhaseBSurfaceNode[] = [];
  for (const node of nodes) {
    result.push(...expandNode(node, registry, ctx));
  }
  return result;
}

function expandNode(node: PhaseBSurfaceNode, registry: MacroRegistry, context: ExpandContext): PhaseBSurfaceNode[] {
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

    const expandedElements: SExprNode[] = [];
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

function expandArg(arg: PhaseBSurfaceNode, registry: MacroRegistry, context: ExpandContext): PhaseBSurfaceNode[] {
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

function tryRegisterDefmacro(node: ListNode, registry: MacroRegistry): boolean {
  const [head, nameNode, paramsNode, ...body] = node.elements;
  if (!isSymbolNode(head) || head.name !== "defmacro") {
    return false;
  }
  if (!nameNode || !isSymbolNode(nameNode)) {
    return false;
  }
  if (!paramsNode || paramsNode.kind !== "list") {
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

function substitute(node: PhaseBSurfaceNode, params: string[], args: PhaseBSurfaceNode[]): PhaseBSurfaceNode {
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
          throw reportError("T2:0101");
        }
        return substituted;
      })
    );
  }
  return cloneNode(node);
}

function cloneListWithElements(node: ListNode, elements: SExprNode[]): ListNode {
  return { ...node, elements };
}

function cloneNode<T extends PhaseBSurfaceNode>(node: T): T {
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

function isListNode(node: PhaseBSurfaceNode): node is ListNode {
  return node.kind === "list";
}

function isSymbolNode(node: PhaseBSurfaceNode | undefined): node is SymbolNode {
  return Boolean(node && node.kind === "symbol");
}

function isSExprNode(node: PhaseBSurfaceNode): node is SExprNode {
  return node.kind === "symbol" || node.kind === "literal" || node.kind === "list";
}

function isQuasiquote(node: ListNode): boolean {
  return node.elements.length >= 2 && isSymbolNode(node.elements[0]) && node.elements[0].name === "quasiquote";
}

function convertQuasiquote(node: SExprNode): SExprNode {
  if (isListNode(node)) {
    const head = node.elements[0];
    if (isSymbolNode(head)) {
      if (head.name === "unquote") {
        return node.elements[1];
      }
      if (head.name === "unquote-splicing") {
        throw reportError("T2:0102");
      }
    }
    const listSymbol = createSymbol("list", node.loc);
    const elements = node.elements.map((child) => convertQuasiquoteElement(child));
    return { kind: "list", elements: [listSymbol, ...elements], loc: node.loc, delimiter: "(" };
  }
  return createQuoteNode(node);
}

function convertQuasiquoteElement(node: SExprNode): SExprNode {
  if (isListNode(node)) {
    const head = node.elements[0];
    if (isSymbolNode(head) && head.name === "unquote-splicing") {
      throw reportError("T2:0102");
    }
    return convertQuasiquote(node);
  }
  return createQuoteNode(node);
}

function createSymbol(name: string, loc: SourceLoc): SymbolNode {
  return { kind: "symbol", name, loc };
}

function createQuoteNode(node: SExprNode): ListNode {
  const quoteSym = createSymbol("quote", node.loc);
  return { kind: "list", elements: [quoteSym, cloneNode(node) as SExprNode], loc: node.loc, delimiter: "(" };
}

function attachExpansionFrame(node: PhaseBSurfaceNode, frame: ExpansionFrame): PhaseBSurfaceNode {
  const expandedStack = [...(node.expansionStack ?? []), frame];
  if (isListNode(node)) {
    const elements = node.elements.map((child) =>
      attachExpansionFrame(child, frame) as SExprNode
    );
    return { ...node, elements, expansionStack: expandedStack };
  }
  return { ...node, expansionStack: expandedStack };
}