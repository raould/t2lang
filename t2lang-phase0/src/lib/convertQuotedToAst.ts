import type {
    Expr,
    CallExpr,
    Identifier,
    ArrayExpr,
    LetBinding,
    LetStarExpr,
    IfExpr,
    BlockStmt,
    AssignExpr,
    ReturnExpr,
    PropExpr,
    NewExpr,
    LiteralExpr
} from "../ast/nodes.js";

// Internal splice marker used by MacroExpander; represent locally here
export interface SpliceMarker {
    kind: "__splice";
    items: Expr[];
    location: any;
}

export class QuotedToAstConverter {
    constructor() { }

    isSplice(node: unknown): node is SpliceMarker {
        return !!node && (node as SpliceMarker).kind === "__splice";
    }

    convertQuotedToAst(node: Expr | SpliceMarker): Expr | SpliceMarker {
        if ((node as SpliceMarker).kind === "__splice") return node as SpliceMarker;
        if ((node as Expr).kind !== "call") return node as Expr;

        const call = node as CallExpr;
        // If callee is not identifier, handle nested calls
        if (call.callee.kind !== "identifier") {
            const calleeConverted = this.convertQuotedToAstSingle(call.callee as Expr | SpliceMarker);
            if (calleeConverted && (calleeConverted as Expr).kind === "call" && (!call.args || call.args.length === 0)) {
                return calleeConverted as Expr;
            }
            return {
                ...call,
                callee: calleeConverted as Expr,
                args: this.flattenQuotedArgs(call.args)
            } as CallExpr;
        }

        const name = (call.callee as Identifier).name;

        switch (name) {
            case "let*":
            case "const":
                return this.convertQuotedLet(call, name === "const");
            case "if":
                return this.convertQuotedIf(call);
            case "block":
                return this.convertQuotedBlock(call);
            case "assign":
                return this.convertQuotedAssign(call);
            case "prop": {
                const obj = call.args[0] ? this.convertQuotedToAstSingle(call.args[0]) : ({ kind: "identifier", name: "undefined", location: call.location } as Expr);
                const propArg = call.args[1];
                let propName = "";
                if (propArg && propArg.kind === "literal") {
                    const lit = propArg as LiteralExpr;
                    propName = typeof lit.value === "string" ? lit.value : String(lit.value);
                } else if (propArg && propArg.kind === "identifier") {
                    propName = (propArg as Identifier).name;
                }
                return { kind: "prop", object: obj, property: propName, location: call.location } as PropExpr;
            }
            case "call": {
                const calleeArg = call.args[0];
                const calleeAst = calleeArg ? this.convertQuotedToAstSingle(calleeArg) : ({ kind: "identifier", name: "undefined", location: call.location } as Expr);
                const outArgs = this.flattenQuotedArgs(call.args.slice(1) as Array<Expr | SpliceMarker>);
                return { kind: "call", callee: calleeAst as Expr, args: outArgs, location: call.location } as CallExpr;
            }
            case "new": {
                const calleeArg = call.args[0];
                const calleeAst = calleeArg ? this.convertQuotedToAstSingle(calleeArg) : ({ kind: "identifier", name: "undefined", location: call.location } as Expr);
                let argsAst = this.flattenQuotedArgs(call.args.slice(1) as Array<Expr | SpliceMarker>);
                if (argsAst.length === 1 && argsAst[0].kind === "array") {
                    argsAst = (argsAst[0] as ArrayExpr).elements;
                }
                return { kind: "new", callee: calleeAst, args: argsAst, location: call.location } as NewExpr;
            }
            case "return":
                return { kind: "return", value: call.args[0] ? this.convertQuotedToAstSingle(call.args[0]) : null, location: call.location } as ReturnExpr;
            default: {
                const outArgs: Expr[] = [];
                for (const a of call.args) {
                    const maybeSplice = a as { kind?: string; items?: Expr[] };
                    if (maybeSplice.kind === "__splice" && maybeSplice.items) {
                        for (const it of maybeSplice.items) {
                            outArgs.push(this.convertQuotedToAstSingle(it));
                        }
                    } else {
                        outArgs.push(this.convertQuotedToAstSingle(a));
                    }
                }
                return { ...call, args: outArgs } as Expr;
            }
        }
    }

    convertQuotedToAstSingle(node: Expr | SpliceMarker): Expr {
        const r = this.convertQuotedToAst(node);
        if (this.isSplice(r)) {
            return { kind: "array", elements: r.items, location: r.location } as unknown as Expr;
        }
        return r as Expr;
    }

    flattenQuotedArgs(nodes: Array<Expr | SpliceMarker>): Expr[] {
        const out: Expr[] = [];
        for (const n of nodes) {
            const r = this.convertQuotedToAst(n);
            if (this.isSplice(r)) {
                for (const it of r.items) {
                    out.push(this.convertQuotedToAstSingle(it));
                }
            } else {
                out.push(this.convertQuotedToAstSingle(r as Expr));
            }
        }
        return out;
    }

    public parseBindingFromExpr(expr: Expr): LetBinding | null {
        if (expr.kind === "call") {
            const call = expr as CallExpr;
            const nameAst = this.convertQuotedToAstSingle(call.callee as Expr | SpliceMarker);
            if (nameAst.kind === "identifier" && call.args.length >= 1) {
                return { name: nameAst as Identifier, init: this.convertQuotedToAstSingle(call.args[0]) } as LetBinding;
            }
        }
        return null;
    }

    public convertQuotedLet(call: CallExpr, isConst: boolean): LetStarExpr {
        const bindingsArg = call.args[0];
        const bodyArgs = call.args.slice(1);
        const normalizedBindings: Expr[] = bindingsArg ? this.flattenQuotedArgs([bindingsArg]) : [];
        const bindings: LetBinding[] = [];
        for (const b of normalizedBindings) {
            if (b && b.kind === "call") {
                const parsed = this.parseBindingFromExpr(b as CallExpr);
                if (parsed) bindings.push(parsed);
                continue;
            }
            if (b && b.kind === "array") {
                const arr = b as ArrayExpr;
                for (const el of arr.elements) {
                    if (el.kind === "call") {
                        const parsed = this.parseBindingFromExpr(el as CallExpr);
                        if (parsed) bindings.push(parsed);
                    }
                }
            }
        }
        return { kind: "let*", bindings, body: this.flattenQuotedArgs(bodyArgs), isConst, location: call.location } as LetStarExpr;
    }

    public convertQuotedIf(call: CallExpr): IfExpr {
        return { kind: "if", condition: this.convertQuotedToAstSingle(call.args[0]), thenBranch: call.args[1] ? this.convertQuotedToAstSingle(call.args[1]) : ({ kind: "literal", value: null, location: call.location } as LiteralExpr), elseBranch: call.args[2] ? this.convertQuotedToAstSingle(call.args[2]) : null, location: call.location } as IfExpr;
    }

    public convertQuotedBlock(call: CallExpr): BlockStmt {
        return { kind: "block", body: this.flattenQuotedArgs(call.args), location: call.location } as BlockStmt;
    }

    public convertQuotedAssign(call: CallExpr): AssignExpr {
        return { kind: "assign", target: this.convertQuotedToAstSingle(call.args[0]), value: this.convertQuotedToAstSingle(call.args[1]), location: call.location } as AssignExpr;
    }
}
