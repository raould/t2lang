import { Program, MacroDef, CallExpr, Identifier } from "../ast/nodes.js";
import { CompilerContext } from "../api.js";

export class MacroRegistryManager {
    public macros: Map<string, MacroDef> = new Map();

    constructor(private readonly ctx: CompilerContext) { }

    collectMacros(program: Program): void {
        for (const stmt of program.body) {
            if (stmt.kind === "defmacro") {
                const macro = stmt as MacroDef;
                this.macros.set(macro.name.name, macro);
                this.ctx.eventSink.emit({ phase: "expand", kind: "macroRegistered", data: { name: macro.name.name, params: macro.params.map(p => p.name) } });
                continue;
            }

            if (stmt.kind === "exprStmt" && stmt.expr) {
                const inner = stmt.expr as unknown as { kind?: string };
                if (inner.kind === "defmacro") {
                    const macroExpr = stmt.expr as unknown as MacroDef;
                    this.macros.set(macroExpr.name.name, macroExpr);
                    this.ctx.eventSink.emit({ phase: "expand", kind: "macroRegistered", data: { name: macroExpr.name.name, params: macroExpr.params.map((p: Identifier) => p.name) } });
                    continue;
                }
            }

            if (stmt.kind === "exprStmt" && stmt.expr.kind === "call") {
                const call = stmt.expr as CallExpr;
                if (call.callee.kind === "identifier" && (call.callee as Identifier).name === "defmacro") {
                    const nameArg = call.args[0];
                    const paramsArg = call.args[1];
                    const bodyArgs = call.args.slice(2);
                    if (nameArg && nameArg.kind === "identifier") {
                        const nameId = nameArg as Identifier;
                        const params: Identifier[] = [];
                        if (paramsArg && paramsArg.kind === "call") {
                            const paramsCall = paramsArg as CallExpr;
                            if (paramsCall.callee && paramsCall.callee.kind === "identifier") params.push(paramsCall.callee as Identifier);
                            for (const p of paramsCall.args) {
                                if (p.kind === "identifier") params.push(p as Identifier);
                            }
                        }
                        const macro: MacroDef = { kind: "defmacro", name: nameId, params, body: bodyArgs, location: stmt.location };
                        this.macros.set(macro.name.name, macro);
                        this.ctx.eventSink.emit({ phase: "expand", kind: "macroRegistered", data: { name: macro.name.name, params: macro.params.map(p => p.name) } });
                    }
                }
            }
        }
    }

    get(name: string) {
        return this.macros.get(name);
    }

    size() {
        return this.macros.size;
    }
}
