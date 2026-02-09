import {
    Expr,
    GensymExpr,
    Identifier,
    CallExpr,
    LetStarExpr,
    IfExpr,
    ArrayExpr,
    FunctionExpr,
    ReturnExpr,
    AssignExpr,
    IndexExpr,
    PropExpr,
    NewExpr,
    BlockStmt,
    LetBinding,
    LiteralExpr,
    UnquoteExpr,
    UnquoteSpliceExpr,
    QuoteExpr,
    Phase0Expr
} from "../ast/nodes.js";
import { QuotedToAstConverter, Substitutor, SpliceMarker } from "phase0";
import { GensymFacade } from "./gensym.js";

export class QuoteEvaluator {
    constructor(
        private quotedConverter: QuotedToAstConverter,
        private gensymFacade: GensymFacade,
        private substitutor: Substitutor,
        private cloneExpr: (e: Expr) => Expr,
        private toPhase0: (e: Expr) => Phase0Expr
    ) { }

    isSplice(node: unknown): node is SpliceMarker {
        return this.quotedConverter.isSplice(node);
    }

    convertQuotedToAstSingle(node: Expr | SpliceMarker): Phase0Expr {
        const r = this.quotedConverter.convertQuotedToAst(node as unknown as Expr);
        if (this.quotedConverter.isSplice(r)) {
            return this.toPhase0({ kind: "array", elements: r.items, location: r.location } as ArrayExpr);
        }
        return this.toPhase0(r as Expr);
    }

    flattenQuotedArgs(nodes: Array<Expr | SpliceMarker>): Phase0Expr[] {
        return this.quotedConverter.flattenQuotedArgs(nodes as unknown as Array<Expr | SpliceMarker>) as Phase0Expr[];
    }

    convertQuotedToAst(expr: Expr | SpliceMarker): Expr | SpliceMarker {
        return this.quotedConverter.convertQuotedToAst(expr as unknown as Expr) as Expr | SpliceMarker;
    }

    evalMacroExpr(expr: Expr, env: Map<string, Expr>): Expr {
        switch (expr.kind) {
            case "identifier": {
                const id = expr as Identifier;
                const bound = env.get(id.name);
                if (bound) return this.cloneExpr(bound);
                return expr;
            }
            case "literal":
                return expr;
            case "gensym":
                return this.gensymFacade.expandGensym(expr as GensymExpr);
            case "unquote": {
                return this.evalMacroExpr((expr as UnquoteExpr).expr, env);
            }
            case "unquote-splice": {
                const us = expr as UnquoteSpliceExpr;
                const evaluated = this.evalMacroExpr(us.expr, env);
                if (evaluated && evaluated.kind === "array") {
                    return { kind: "__splice", items: (evaluated as ArrayExpr).elements, location: expr.location } as unknown as Expr;
                }
                return { kind: "__splice", items: [evaluated], location: expr.location } as unknown as Expr;
            }
            case "quote": {
                const evaluatedQuoted = this.evalQuote((expr as QuoteExpr).expr, env);
                if (this.isSplice(evaluatedQuoted)) {
                    return { kind: "array", elements: evaluatedQuoted.items, location: expr.location } as ArrayExpr;
                }
                return evaluatedQuoted as Expr;
            }
            case "let*": {
                const let_ = expr as LetStarExpr;
                const newEnv = new Map(env);
                for (const binding of let_.bindings) {
                    const value = this.evalMacroExpr(binding.init, newEnv);
                    newEnv.set(binding.name.name, value);
                }
                let result: Expr = { kind: "literal", value: null, location: expr.location } as Expr;
                for (const bodyExpr of let_.body) result = this.evalMacroExpr(bodyExpr, newEnv);
                return result;
            }
            case "if": {
                const if_ = expr as IfExpr;
                return {
                    ...if_,
                    condition: this.toPhase0(this.evalMacroExpr(if_.condition, env)),
                    thenBranch: this.toPhase0(this.evalMacroExpr(if_.thenBranch, env)),
                    elseBranch: if_.elseBranch ? this.toPhase0(this.evalMacroExpr(if_.elseBranch, env)) : null
                } as unknown as Expr;
            }
            case "call": {
                const call = expr as CallExpr;
                const evaluatedCallee = this.evalMacroExpr(call.callee, env);
                const evaluatedArgs = call.args.map(a => this.evalMacroExpr(a, env));

                if (evaluatedCallee.kind === "identifier" && (evaluatedCallee as Identifier).name === "gensym") {
                    const prefixArg = evaluatedArgs[0];
                    let prefix: string | undefined = undefined;
                    if (prefixArg && prefixArg.kind === "literal" && typeof (prefixArg as LiteralExpr).value === "string") {
                        prefix = (prefixArg as LiteralExpr).value as string;
                    }
                    return this.gensymFacade.expandGensym({ kind: "gensym", prefix, location: expr.location } as GensymExpr);
                }

                if (evaluatedCallee.kind === "identifier" && (evaluatedCallee as Identifier).name === "quote") {
                    const quoted = call.args[0];
                    const evaluatedQuoted = this.evalQuote(quoted, env);
                    if (this.isSplice(evaluatedQuoted)) return { kind: "array", elements: evaluatedQuoted.items, location: expr.location } as ArrayExpr;
                    return evaluatedQuoted as Expr;
                }

                if (evaluatedCallee.kind === "identifier" && (evaluatedCallee as Identifier).name === "array") {
                    return { kind: "array", elements: evaluatedArgs.map(a => this.toPhase0(a)), location: expr.location } as ArrayExpr;
                }

                return { ...call, callee: this.toPhase0(evaluatedCallee), args: evaluatedArgs.map(a => this.toPhase0(a)) } as Phase0Expr as unknown as Expr;
            }
            default:
                return this.substitutor.substituteAndExpand(expr as unknown as Expr, env) as Expr;
        }
    }

    evalQuote(expr: Expr, env: Map<string, Expr>): Expr | SpliceMarker {
        switch (expr.kind) {
            case "unquote": {
                const unquote = expr as UnquoteExpr;
                return this.evalMacroExpr(unquote.expr, env);
            }
            case "unquote-splice": {
                const us = expr as UnquoteSpliceExpr;
                const evaluated = this.evalMacroExpr(us.expr, env);
                if (evaluated && evaluated.kind === "array") return { kind: "__splice", items: (evaluated as ArrayExpr).elements, location: expr.location };
                return { kind: "__splice", items: [evaluated], location: expr.location } as SpliceMarker;
            }
            case "identifier": {
                const id = expr as Identifier;
                if (typeof id.name === "string" && id.name.startsWith("~@")) {
                    const remainder = id.name.slice(2);
                    let inner: Expr = { kind: "identifier", name: remainder, location: id.location } as Identifier;
                    if (/^-?\d+$/.test(remainder)) inner = { kind: "literal", value: Number(remainder), location: id.location } as LiteralExpr;
                    return this.evalMacroExpr({ kind: "unquote-splice", expr: inner, location: id.location } as UnquoteSpliceExpr, env);
                }
                if (typeof id.name === "string" && id.name.startsWith("~")) {
                    const remainder = id.name.slice(1);
                    let inner: Expr = { kind: "identifier", name: remainder, location: id.location } as Identifier;
                    if (/^-?\d+$/.test(remainder)) inner = { kind: "literal", value: Number(remainder), location: id.location } as LiteralExpr;
                    return this.evalMacroExpr({ kind: "unquote", expr: inner, location: id.location } as UnquoteExpr, env);
                }
                const bound = env.get(id.name);
                if (bound) return this.cloneExpr(bound);
                return expr;
            }
            case "literal":
                return expr;
            case "gensym":
                return this.gensymFacade.expandGensym(expr as GensymExpr);
            case "function": {
                const fn = expr as FunctionExpr;
                const nameExpr = fn.name ? (this.evalQuote(fn.name, env) as Expr) : null;
                const nameId = nameExpr && (nameExpr as Expr).kind === "identifier" ? (nameExpr as Identifier) : null;
                const body = this.flattenQuotedArgs(fn.body.map(b => this.evalQuote(b, env) as Expr | SpliceMarker));
                return { kind: "function", name: nameId, params: fn.params, body, isDeclaration: fn.isDeclaration, location: fn.location } as FunctionExpr;
            }
            case "call": {
                const call = expr as CallExpr;
                const processedCallee = this.evalQuote(call.callee, env);
                const processedArgs = call.args.map(a => this.evalQuote(a, env));
                const calleeAst = this.convertQuotedToAstSingle(processedCallee as Expr | SpliceMarker);
                const argsAst = this.flattenQuotedArgs(processedArgs as Array<Expr | SpliceMarker>);

                if (calleeAst.kind === "identifier" && (calleeAst as Identifier).name === "array") {
                    return { kind: "array", elements: argsAst, location: call.location } as ArrayExpr;
                }

                // (fn ...) -> FunctionExpr shorthand
                if (calleeAst.kind === "identifier" && (calleeAst as Identifier).name === 'fn') {
                    const nameArg = processedArgs[0] as Expr | SpliceMarker | undefined;
                    const paramsArg = processedArgs[1] as Expr | SpliceMarker | undefined;
                    let name: Identifier | null = null;
                    if (nameArg && !this.isSplice(nameArg) && (nameArg as Expr).kind === "identifier") name = nameArg as Identifier;
                    const params: Identifier[] = [];
                    if (paramsArg && !this.isSplice(paramsArg) && (paramsArg as Expr).kind === "array") {
                        const arr = paramsArg as ArrayExpr;
                        for (const el of arr.elements) if (el.kind === "identifier") params.push(el as Identifier);
                    }
                    const body = this.flattenQuotedArgs(processedArgs.slice(2) as Array<Expr | SpliceMarker>);
                    return { kind: "function", name, params, body, isDeclaration: false, location: call.location } as FunctionExpr;
                }

                if (calleeAst.kind === "identifier" && (calleeAst as Identifier).name === "return") {
                    const val = argsAst[0] ? argsAst[0] : null;
                    return { kind: "return", value: val, location: call.location } as ReturnExpr;
                }

                if (calleeAst.kind === "identifier" && (calleeAst as Identifier).name === "block") {
                    return { kind: "block", body: argsAst, location: call.location } as BlockStmt;
                }

                if (calleeAst.kind === "identifier" && (calleeAst as Identifier).name === "assign") {
                    return { kind: "assign", target: argsAst[0], value: argsAst[1], location: call.location } as AssignExpr;
                }

                if (calleeAst.kind === "identifier" && (calleeAst as Identifier).name === "index") {
                    return { kind: "index", object: argsAst[0], index: argsAst[1], location: call.location } as IndexExpr;
                }

                if (calleeAst.kind === "identifier" && (calleeAst as Identifier).name === "prop") {
                    const obj = argsAst[0] ? argsAst[0] : { kind: "identifier", name: "undefined", location: call.location } as Expr;
                    let propName = "";
                    const propArg = argsAst[1];
                    if (propArg && propArg.kind === "literal") {
                        const lit = propArg as LiteralExpr;
                        if (typeof lit.value === "string") propName = lit.value; else propName = String(lit.value);
                    }
                    return { kind: "prop", object: obj, property: propName, location: call.location } as PropExpr;
                }

                if (calleeAst.kind === "identifier" && (calleeAst as Identifier).name === "if") {
                    return { kind: "if", condition: argsAst[0], thenBranch: argsAst[1], elseBranch: argsAst[2] || null, location: call.location } as IfExpr;
                }

                if (calleeAst.kind === "identifier" && (calleeAst as Identifier).name === "type-assert") {
                    const typeArg = call.args[1];
                    let typeNode: Record<string, unknown> = { kind: "type-ref", name: "any", location: call.location };
                    if (typeArg && typeArg.kind === "call") {
                        const typeCall = typeArg as CallExpr;
                        const typeCallee = typeCall.callee;
                        if (typeCallee.kind === "identifier" && (typeCallee as Identifier).name === "type-ref") {
                            const nameLit = typeCall.args[0];
                            if (nameLit && nameLit.kind === "literal") {
                                typeNode = { kind: "type-ref", name: (nameLit as LiteralExpr).value as string, location: call.location };
                            }
                        }
                    }
                    return { kind: "type-assert", expr: argsAst[0], typeAnnotation: typeNode as unknown as Record<string, unknown>, location: call.location } as unknown as Expr;
                }

                if (calleeAst.kind === "identifier" && (calleeAst as Identifier).name === "new") {
                    const calleeExpr = argsAst[0] ? argsAst[0] : { kind: "identifier", name: "undefined", location: call.location } as Expr;
                    let newArgs = argsAst.slice(1);
                    if (newArgs.length === 1 && newArgs[0].kind === "array") newArgs = (newArgs[0] as ArrayExpr).elements;
                    return { kind: "new", callee: calleeExpr, args: newArgs, location: call.location } as NewExpr;
                }

                if (calleeAst.kind === "identifier" && (calleeAst as Identifier).name === "call") {
                    const calleeArg = argsAst[0] ? argsAst[0] : { kind: "identifier", name: "undefined", location: call.location } as Expr;
                    const outArgs = argsAst.slice(1);
                    return { kind: "call", callee: calleeArg, args: outArgs, location: call.location } as CallExpr;
                }

                return { kind: "call", callee: calleeAst, args: argsAst, location: call.location } as CallExpr;
            }
            case "return": {
                const ret = expr as ReturnExpr;
                if (ret.value) {
                    const processed = this.evalQuote(ret.value, env);
                    if (this.isSplice(processed)) return { kind: "array", elements: processed.items, location: ret.location } as ArrayExpr;
                    return { kind: "return", value: processed as Expr, location: ret.location } as ReturnExpr;
                }
                return { kind: "return", value: null, location: ret.location } as ReturnExpr;
            }
            case "assign": {
                const assign = expr as AssignExpr;
                const target = this.evalQuote(assign.target, env);
                const value = this.evalQuote(assign.value, env);
                return { kind: "assign", target: this.convertQuotedToAstSingle(target as Expr | SpliceMarker), value: this.convertQuotedToAstSingle(value as Expr | SpliceMarker), location: assign.location } as AssignExpr;
            }
            case "index": {
                const idx = expr as IndexExpr;
                const object = this.evalQuote(idx.object, env);
                const index = this.evalQuote(idx.index, env);
                return { kind: "index", object: this.convertQuotedToAstSingle(object as Expr | SpliceMarker), index: this.convertQuotedToAstSingle(index as Expr | SpliceMarker), location: idx.location } as IndexExpr;
            }
            case "prop": {
                const prop = expr as PropExpr;
                const object = this.evalQuote(prop.object, env);
                return { kind: "prop", object: this.convertQuotedToAstSingle(object as Expr | SpliceMarker), property: prop.property, location: prop.location } as PropExpr;
            }
            case "if": {
                const if_ = expr as IfExpr;
                const cond = this.evalQuote(if_.condition, env);
                const thenBranch = this.evalQuote(if_.thenBranch, env);
                const elseBranch = if_.elseBranch ? this.evalQuote(if_.elseBranch, env) : null;
                return { kind: "if", condition: this.convertQuotedToAstSingle(cond as Expr | SpliceMarker), thenBranch: this.convertQuotedToAstSingle(thenBranch as Expr | SpliceMarker), elseBranch: elseBranch ? this.convertQuotedToAstSingle(elseBranch as Expr | SpliceMarker) : null, location: if_.location } as IfExpr;
            }
            case "new": {
                const n = expr as NewExpr;
                const callee = this.evalQuote(n.callee, env);
                const args = n.args.map(a => this.evalQuote(a, env) as Expr | SpliceMarker);
                let argsAst = this.flattenQuotedArgs(args);
                if (argsAst.length === 1 && argsAst[0].kind === "array") argsAst = (argsAst[0] as ArrayExpr).elements;
                return { kind: "new", callee: this.convertQuotedToAstSingle(callee as Expr | SpliceMarker), args: argsAst, location: n.location } as NewExpr;
            }
            case "array": {
                const arr = expr as ArrayExpr;
                const processed = arr.elements.map(e => this.evalQuote(e, env) as Expr | SpliceMarker);
                return { ...arr, elements: this.flattenQuotedArgs(processed) } as ArrayExpr;
            }
            case "block": {
                const block = expr as BlockStmt;
                const processed = block.body.map(e => this.evalQuote(e, env) as Expr | SpliceMarker);
                const body = this.flattenQuotedArgs(processed);
                return { kind: "block", body, location: block.location } as BlockStmt;
            }
            case "let*": {
                const let_ = expr as LetStarExpr;
                const bindings: LetBinding[] = [];
                for (const b of let_.bindings) {
                    const nameExpr = this.evalQuote(b.name, env);
                    const nameAst = this.convertQuotedToAstSingle(nameExpr as Expr | SpliceMarker);
                    const initExpr = this.evalQuote(b.init, env);
                    const initAst = this.convertQuotedToAstSingle(initExpr as Expr | SpliceMarker);
                    if (nameAst.kind === "identifier") {
                        bindings.push({ name: nameAst as Identifier, init: initAst });
                    } else {
                        bindings.push({ name: b.name, init: initAst });
                    }
                }
                const processed = let_.body.map(e => this.evalQuote(e, env) as Expr | SpliceMarker);
                return { kind: "let*", bindings, body: this.flattenQuotedArgs(processed), isConst: let_.isConst, location: let_.location } as LetStarExpr;
            }
            default:
                return expr;
        }
    }
}
