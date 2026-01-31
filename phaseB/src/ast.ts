import type { ExpansionFrame, SourceLoc } from "./location.js";
import type { SExprNode, SymbolNode } from "./reader.js";

export interface PhaseBBaseNode {
  loc: SourceLoc;
  expansionStack?: ExpansionFrame[];
}

export interface MacroDefNode extends PhaseBBaseNode {
  kind: "macro-def";
  name: SymbolNode;
  params: SymbolNode[];
  body: PhaseBSurfaceNode[];
}

export interface InfixExprNode extends PhaseBBaseNode {
  kind: "infix-expr";
  operator: SymbolNode;
  left: PhaseBSurfaceNode;
  right: PhaseBSurfaceNode;
}

export interface DotAccessNode extends PhaseBBaseNode {
  kind: "dot-access";
  object: PhaseBSurfaceNode;
  property: SymbolNode;
}

export type PhaseBSugarNode = MacroDefNode | InfixExprNode | DotAccessNode;
export type PhaseBSurfaceNode = SExprNode | PhaseBSugarNode;
export interface PhaseBAst {
  nodes: PhaseBSurfaceNode[];
}