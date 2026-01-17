import type { Identifier, SourceLocation } from "../ast/nodes.js";

/**
 * GensymGenerator: encapsulates gensym counter and expansion logic
 * so other packages (e.g., phase1) can reuse a canonical implementation.
 */
export class GensymGenerator {
    private counter = 0;

    generateName(prefix: string = "G__"): string {
        return `${prefix}${++this.counter}`;
    }

    expandGensym(g: { prefix?: string; generatedName?: string; location: SourceLocation }): Identifier {
        const name = g.generatedName || this.generateName(g.prefix || "G__");
        return {
            kind: "identifier",
            name,
            location: g.location
        } as Identifier;
    }
}
