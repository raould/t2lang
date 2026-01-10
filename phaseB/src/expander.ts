import type { ListNode, SExprNode, SymbolNode } from "./reader.js";
import type { ExpansionFrame, SourceLoc } from "./location.js";
import { MacroRegistry } from "./macroRegistry.js";
import type { PhaseBSurfaceNode } from "./ast.js";

export function expand(nodes: PhaseBSurfaceNode[], registry: MacroRegistry): PhaseBSurfaceNode[] {
  const result: PhaseBSurfaceNode[] = [];
  for (const node of nodes) {
    result.push(...expandNode(node, registry));
  }
  return result;
}

function expandNode(node: PhaseBSurfaceNode, registry: MacroRegistry): PhaseBSurfaceNode[] {
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
          const expanded = expandArg(arg, registry);
          return expanded[0] ?? cloneNode(arg);
        });
        const body = macro.body.map((entry) => substitute(entry, macro.params, args));
        const frame: ExpansionFrame = {
          macroName: macro.name,
          callSite: node.loc,
          macroDefSite: macro.loc,
        };
        const expanded = expand(body, registry);
        return expanded.map((resultNode) => attachExpansionFrame(resultNode, frame));
      }
    }

    const expandedElements: SExprNode[] = [];
    for (const child of node.elements) {
      for (const expanded of expandNode(child, registry)) {
        if (isSExprNode(expanded)) {
          expandedElements.push(expanded);
        }
      }
    }
    return [cloneListWithElements(node, expandedElements)];
  }
  return [cloneNode(node)];
}

function expandArg(arg: PhaseBSurfaceNode, registry: MacroRegistry): PhaseBSurfaceNode[] {
  return expandNode(arg, registry);
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
          throw new Error("macro substitution produced non-SExpr node inside list");
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
        throw new Error("unquote-splicing not supported yet");
      }
    }
    const listSymbol = createSymbol("list", node.loc);
    const elements = node.elements.map((child) => convertQuasiquoteElement(child));
    return { kind: "list", elements: [listSymbol, ...elements], loc: node.loc };
  }
  return createQuoteNode(node);
}

function convertQuasiquoteElement(node: SExprNode): SExprNode {
  if (isListNode(node)) {
    const head = node.elements[0];
    if (isSymbolNode(head) && head.name === "unquote-splicing") {
      throw new Error("unquote-splicing not supported yet");
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
  return { kind: "list", elements: [quoteSym, cloneNode(node) as SExprNode], loc: node.loc };
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