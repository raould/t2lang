import type { SourceLoc } from "./location.js";
import type { PhaseBNode, SExprNode } from "./reader.js";

type MacroNode = PhaseBNode | SExprNode;

export interface MacroDefinition {
  name: string;
  params: string[];
  body: MacroNode[];
  loc: SourceLoc;
}

export class MacroRegistry {
  private readonly macros = new Map<string, MacroDefinition>();

  define(def: MacroDefinition): void {
    this.macros.set(def.name, def);
  }

  has(name: string): boolean {
    return this.macros.has(name);
  }

  get(name: string): MacroDefinition | null {
    return this.macros.get(name) ?? null;
  }

  list(): MacroDefinition[] {
    return [...this.macros.values()];
  }
}