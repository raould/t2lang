import type {
    Expr,
    Identifier,
    ArrayExpr,
    CallExpr,
    LetStarExpr,
    IfExpr,
    PropExpr,
    FunctionExpr,
    ReturnExpr,
    BlockStmt,
    LiteralExpr,
    // Macro-related node types
    UnquoteExpr,
    UnquoteSpliceExpr,
    GensymExpr
} from "../ast/nodes.js";
import { QuotedToAstConverter } from "./convertQuotedToAst.js";
import { GensymGenerator } from "./gensym.js";

export interface SpliceMarker {
    kind: "__splice";
    items: Expr[];
    location: any;
}

export class Substitutor {
    constructor(private readonly quotedConv: QuotedToAstConverter = new QuotedToAstConverter(), private readonly gensymGen: GensymGenerator = new GensymGenerator()) { }

    cloneExpr(expr: any): any {
        return JSON.parse(JSON.stringify(expr));
    }

    isSplice(node: unknown): node is SpliceMarker {
        return this.quotedConv.isSplice(node as any);
    }

    substituteAndExpand(expr: any, bindings: Map<string, any>): any {
        switch (expr.kind) {
            case "identifier": {
                const id = expr as Identifier;
                const bound = bindings.get(id.name);
                if (bound) return this.cloneExpr(bound);
                return expr;
            }
            case "quote": {
                const quoted = this.substituteInQuote((expr as any).expr, bindings);
                const converted = this.quotedConv.convertQuotedToAst(quoted as any);
                if (this.quotedConv.isSplice(converted)) {
                    return { kind: "array", elements: (converted as SpliceMarker).items, location: (quoted as any).location } as any;
                }
                return converted as any;
            }
            case "unquote":
                return this.substituteAndExpand((expr as any).expr, bindings);
            case "unquote-splice": {
                const us = expr as any;
                const evaluated = this.substituteAndExpand(us.expr, bindings);
                if (evaluated && evaluated.kind === "array") {
                    return { kind: "__splice", items: (evaluated as ArrayExpr).elements, location: (expr as any).location } as unknown as any;
                }
                return { kind: "__splice", items: [evaluated], location: (expr as any).location } as unknown as any;
            }
            case "gensym":
                return this.gensymGen.expandGensym(expr as any) as unknown as any;
            case "call": {
                const call = expr as CallExpr;
                return {
                    ...call,
                    callee: this.substituteAndExpand(call.callee, bindings),
                    args: call.args.map(a => this.substituteAndExpand(a, bindings))
                } as Expr;
            }
            case "let*": {
                const let_ = expr as LetStarExpr;
                return {
                    ...let_,
                    bindings: let_.bindings.map(b => ({ ...b, init: this.substituteAndExpand(b.init, bindings) })),
                    body: let_.body.map(e => this.substituteAndExpand(e, bindings))
                } as Expr;
            }
            case "if": {
                const if_ = expr as IfExpr;
                return {
                    ...if_,
                    condition: this.substituteAndExpand(if_.condition, bindings),
                    thenBranch: this.substituteAndExpand(if_.thenBranch, bindings),
                    elseBranch: if_.elseBranch ? this.substituteAndExpand(if_.elseBranch, bindings) : null
                } as Expr;
            }
            case "prop": {
                const prop = expr as PropExpr;
                return { ...prop, object: this.substituteAndExpand(prop.object, bindings) } as Expr;
            }
            case "function": {
                const fn = expr as FunctionExpr;
                return { ...fn, body: fn.body.map(e => this.substituteAndExpand(e, bindings)) } as Expr;
            }
            case "return": {
                const ret = expr as ReturnExpr;
                return { ...ret, value: ret.value ? this.substituteAndExpand(ret.value, bindings) : null } as Expr;
            }
            case "block": {
                const block = expr as BlockStmt;
                return { ...block, body: block.body.map(e => this.substituteAndExpand(e, bindings)) } as Expr;
            }
            case "array": {
                const arr = expr as any;
                return { ...arr, elements: arr.elements.map((e: Expr) => this.substituteAndExpand(e, bindings)) } as Expr;
            }
            case "object": {
                const obj: any = expr;
                return { ...obj, fields: obj.fields.map((f: any) => ({ ...f, value: this.substituteAndExpand(f.value, bindings) })) } as Expr;
            }
            case "assign": {
                const a: any = expr;
                return { ...a, target: this.substituteAndExpand(a.target, bindings), value: this.substituteAndExpand(a.value, bindings) } as Expr;
            }
            case "index": {
                const idx: any = expr;
                return { ...idx, object: this.substituteAndExpand(idx.object, bindings), index: this.substituteAndExpand(idx.index, bindings) } as Expr;
            }
            case "new": {
                const n: any = expr;
                return { ...n, callee: this.substituteAndExpand(n.callee, bindings), args: n.args.map((a: Expr) => this.substituteAndExpand(a, bindings)) } as Expr;
            }
            case "throw": {
                const t: any = expr;
                return { ...t, value: this.substituteAndExpand(t.value, bindings) } as Expr;
            }
            case "type-assert": {
                const ta: any = expr;
                return { ...ta, expr: this.substituteAndExpand(ta.expr, bindings) } as Expr;
            }
            default:
                return expr;
        }
    }

    substituteInQuote(expr: any, bindings: Map<string, any>): any {
        switch (expr.kind) {
            case "unquote":
                return this.substituteAndExpand((expr as UnquoteExpr).expr, bindings);
            case "unquote-splice": {
                const us = expr as UnquoteSpliceExpr;
                const evaluated = this.substituteAndExpand(us.expr, bindings);
                if (evaluated && evaluated.kind === "array") {
                    return { kind: "__splice", items: (evaluated as ArrayExpr).elements, location: expr.location } as SpliceMarker as Expr;
                }
                return { kind: "__splice", items: [evaluated], location: expr.location } as SpliceMarker as Expr;
            }
            case "gensym":
                return this.gensymGen.expandGensym(expr as GensymExpr) as unknown as Expr;
            case "identifier": {
                const id = expr as Identifier;
                if (typeof id.name === "string" && id.name.startsWith("~@")) {
                    const remainder = id.name.slice(2);
                    let inner: Expr = { kind: "identifier", name: remainder, location: id.location } as Identifier;
                    if (/^-?\d+$/.test(remainder)) inner = { kind: "literal", value: Number(remainder), location: id.location } as LiteralExpr;
                    return this.substituteAndExpand({ kind: "unquote-splice", expr: inner, location: id.location } as UnquoteSpliceExpr, bindings);
                }
                if (typeof id.name === "string" && id.name.startsWith("~")) {
                    const remainder = id.name.slice(1);
                    let inner: Expr = { kind: "identifier", name: remainder, location: id.location } as Identifier;
                    if (/^-?\d+$/.test(remainder)) inner = { kind: "literal", value: Number(remainder), location: id.location } as LiteralExpr;
                    return this.substituteAndExpand({ kind: "unquote", expr: inner, location: id.location } as UnquoteExpr, bindings);
                }
                const bound = bindings.get(id.name);
                if (bound) return this.cloneExpr(bound);
                return expr;
            }
            case "call": {
                const call = expr as CallExpr;
                const callee = this.substituteInQuote(call.callee, bindings);
                const args = call.args.map(a => this.substituteInQuote(a, bindings));
                return { ...call, callee: this.quotedConv.convertQuotedToAstSingle(callee as any), args: this.quotedConv.flattenQuotedArgs(args as any) } as Expr;
            }
            case "let*": {
                const let_ = expr as LetStarExpr;
                return {
                    ...let_,
                    bindings: let_.bindings.map(b => {
                        const nameExpr = this.substituteInQuote(b.name, bindings);
                        const nameAst = this.quotedConv.convertQuotedToAstSingle(nameExpr as any);
                        const nameId = nameAst.kind === "identifier" ? (nameAst as Identifier) : b.name;
                        return { ...b, name: nameId, init: this.substituteInQuote(b.init, bindings) } as any;
                    }),
                    body: let_.body.map(e => this.substituteInQuote(e, bindings))
                } as Expr;
            }
            case "if": {
                const if_ = expr as IfExpr;
                return { ...if_, condition: this.substituteInQuote(if_.condition, bindings), thenBranch: this.substituteInQuote(if_.thenBranch, bindings), elseBranch: if_.elseBranch ? this.substituteInQuote(if_.elseBranch, bindings) : null } as Expr;
            }
            case "array": {
                const arr: any = expr;
                return { ...arr, elements: arr.elements.map((e: Expr) => this.substituteInQuote(e, bindings)) } as Expr;
            }
            case "block": {
                const block = expr as BlockStmt;
                return { ...block, body: block.body.map(e => this.substituteInQuote(e, bindings)) } as Expr;
            }
            case "function": {
                const fn = expr as FunctionExpr;
                const name = fn.name ? this.substituteInQuote(fn.name, bindings) : null;
                const body = this.quotedConv.flattenQuotedArgs(fn.body.map(e => this.substituteInQuote(e, bindings)) as any);
                return { kind: "function", name: name && (name as Expr).kind === "identifier" ? (name as Identifier) : null, params: fn.params, body, isDeclaration: fn.isDeclaration, location: fn.location } as Expr;
            }
            case "return": {
                const ret = expr as ReturnExpr;
                return { ...ret, value: ret.value ? this.substituteInQuote(ret.value, bindings) : null } as Expr;
            }
            default:
                return expr;
        }
    }
}
