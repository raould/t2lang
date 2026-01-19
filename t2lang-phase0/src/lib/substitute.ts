import type {
    Expr,
    Identifier,
    ArrayExpr,
    CallExpr,
    LetStarExpr,
    LetBinding,
    IfExpr,
    PropExpr,
    FunctionExpr,
    ReturnExpr,
    BlockStmt,
    LiteralExpr,
    ObjectField,
    ObjectExpr,
    NewExpr,
    AssignExpr,
    IndexExpr,
    ThrowExpr,
    TypeAssertExpr,
    // Macro-related node types
    UnquoteExpr,
    UnquoteSpliceExpr,
    GensymExpr,
    SpliceExpr,
    QuoteExpr,
    SourceLocation
} from "../ast/nodes.js";
import { QuotedToAstConverter } from "./convertQuotedToAst.js";
import { GensymGenerator } from "./gensym.js";

export interface SpliceMarker {
    kind: "__splice";
    items: Expr[];
    location: SourceLocation;
}

export class Substitutor {
    constructor(private readonly quotedConv: QuotedToAstConverter = new QuotedToAstConverter(), private readonly gensymGen: GensymGenerator = new GensymGenerator()) { }

    cloneExpr(expr: Expr): Expr {
        return JSON.parse(JSON.stringify(expr));
    }

    isSplice(node: unknown): node is SpliceMarker {
        return this.quotedConv.isSplice(node);
    }

    substituteAndExpand(expr: Expr, bindings: Map<string, Expr>): Expr | SpliceExpr {
        switch (expr.kind) {
            case "identifier": {
                const id = expr as Identifier;
                const bound = bindings.get(id.name);
                if (bound) return this.cloneExpr(bound);
                return expr;
            }
            case "quote": {
                const q = expr as QuoteExpr;
                const quoted = this.substituteInQuote(q.expr, bindings);
                const converted = this.quotedConv.convertQuotedToAst(quoted);
                if (this.quotedConv.isSplice(converted)) {
                    const sp = converted as SpliceMarker;
                    return { kind: "array", elements: sp.items, location: sp.location } as Expr;
                }
                return converted as Expr;
            }
            case "unquote":
                return this.substituteAndExpand((expr as UnquoteExpr).expr, bindings) as Expr;
            case "unquote-splice": {
                const us = expr as UnquoteSpliceExpr;
                const evaluated = this.substituteAndExpand(us.expr, bindings);
                const loc = (expr as UnquoteSpliceExpr).location as SourceLocation;
                if (evaluated && (evaluated as Expr).kind === "array") {
                    return { kind: "__splice", items: (evaluated as ArrayExpr).elements, location: loc } as SpliceExpr;
                }
                return { kind: "__splice", items: [evaluated as Expr], location: loc } as SpliceExpr;
            }
            case "gensym":
                return this.gensymGen.expandGensym(expr as GensymExpr);
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
                const arr = expr as ArrayExpr;
                return { ...arr, elements: arr.elements.map((e: Expr) => this.substituteAndExpand(e, bindings) as Expr) } as Expr;
            }
            case "object": {
                const obj = expr as ObjectExpr;
                return { ...obj, fields: obj.fields.map((f: ObjectField) => ({ ...f, value: this.substituteAndExpand(f.value, bindings) as Expr })) } as Expr;
            }
            case "assign": {
                const a = expr as AssignExpr;
                return { ...a, target: this.substituteAndExpand(a.target, bindings), value: this.substituteAndExpand(a.value, bindings) } as Expr;
            }
            case "index": {
                const idx = expr as IndexExpr;
                return { ...idx, object: this.substituteAndExpand(idx.object, bindings), index: this.substituteAndExpand(idx.index, bindings) } as Expr;
            }
            case "new": {
                const n = expr as NewExpr;
                return { ...n, callee: this.substituteAndExpand(n.callee, bindings) as Expr, args: n.args.map((a: Expr) => this.substituteAndExpand(a, bindings) as Expr) } as Expr;
            }
            case "throw": {
                const t = expr as ThrowExpr;
                return { ...t, value: this.substituteAndExpand(t.value, bindings) } as Expr;
            }
            case "type-assert": {
                const ta = expr as TypeAssertExpr;
                return { ...ta, expr: this.substituteAndExpand(ta.expr, bindings) } as Expr;
            }
            default:
                return expr;
        }
    }

    substituteInQuote(expr: Expr, bindings: Map<string, Expr>): Expr {
        switch (expr.kind) {
            case "unquote":
                return this.substituteAndExpand((expr as UnquoteExpr).expr, bindings) as Expr;
            case "unquote-splice": {
                const us = expr as UnquoteSpliceExpr;
                const evaluated = this.substituteAndExpand(us.expr, bindings);
                if (evaluated && (evaluated as Expr).kind === "array") {
                    return { kind: "__splice", items: (evaluated as ArrayExpr).elements, location: expr.location } as SpliceExpr as Expr;
                }
                return { kind: "__splice", items: [evaluated as Expr], location: expr.location } as SpliceExpr as Expr;
            }
            case "gensym":
                return this.gensymGen.expandGensym(expr as GensymExpr);
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
                return { ...call, callee: this.quotedConv.convertQuotedToAstSingle(callee), args: this.quotedConv.flattenQuotedArgs(args) } as Expr;
            }
            case "let*": {
                const let_ = expr as LetStarExpr;
                return {
                    ...let_,
                    bindings: let_.bindings.map(b => {
                        const nameExpr = this.substituteInQuote(b.name, bindings);
                        const nameAst = this.quotedConv.convertQuotedToAstSingle(nameExpr);
                        const nameId = nameAst.kind === "identifier" ? (nameAst as Identifier) : b.name;
                        return { ...b, name: nameId, init: this.substituteInQuote(b.init, bindings) } as LetBinding;
                    }),
                    body: let_.body.map(e => this.substituteInQuote(e, bindings))
                } as Expr;
            }
            case "if": {
                const if_ = expr as IfExpr;
                return { ...if_, condition: this.substituteInQuote(if_.condition, bindings), thenBranch: this.substituteInQuote(if_.thenBranch, bindings), elseBranch: if_.elseBranch ? this.substituteInQuote(if_.elseBranch, bindings) : null } as Expr;
            }
            case "array": {
                const arr = expr as ArrayExpr;
                return { ...arr, elements: arr.elements.map((e: Expr) => this.substituteInQuote(e, bindings)) } as Expr;
            }
            case "block": {
                const block = expr as BlockStmt;
                return { ...block, body: block.body.map(e => this.substituteInQuote(e, bindings)) } as Expr;
            }
            case "function": {
                const fn = expr as FunctionExpr;
                const name = fn.name ? this.substituteInQuote(fn.name, bindings) : null;
                const bodyArgs = fn.body.map(e => this.substituteInQuote(e, bindings));
                const body = this.quotedConv.flattenQuotedArgs(bodyArgs);
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
