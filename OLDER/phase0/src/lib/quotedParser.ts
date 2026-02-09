import type { Token } from "../parse/lexer.js";
import type { Expr, QuoteExpr, UnquoteExpr, UnquoteSpliceExpr } from "../ast/nodes.js";

export interface ParserWithQuoted {
    parseQuotedSexpr(): Expr;
    parseQuotedList(): Expr;
    parseUnquote(open: any): UnquoteExpr;
    parseUnquoteSplice(open: any): UnquoteSpliceExpr;
    parseQuote(open: any): QuoteExpr;
}

// Internal shape used by consumers that need access to parser runtime helpers
export interface ParserWithQuotedInternal extends ParserWithQuoted {
    current(): Token;
    advance(): Token;
    error(message: string, token: Token): never;
    parseSexpr(): Expr;
    parseQuote(open: any): QuoteExpr;
    parseImplicitCall?(open: any, head: string): Expr;
    file: string;
}

export function attachQuotedParsers(parser: any) {
    parser.parseQuotedSexpr = function (): any {
        const tok: Token = this.current();

        // Handle ~name and ~@name shorthands inside explicit quoted forms
        if (tok.kind === "identifier" && typeof tok.value === "string" && tok.value.startsWith("~")) {
            const text = tok.value as string;
            const isSplice = text.startsWith("~@");
            const remainder = isSplice ? text.slice(2) : text.slice(1);
            if (remainder.length === 0) {
                this.error("Invalid unquote shorthand", tok);
            }
            this.advance();
            const numMatch = /^-?\d+$/.test(remainder);
            const expr = numMatch
                ? { kind: "literal", value: Number(remainder), location: tok.location }
                : { kind: "identifier", name: remainder, location: tok.location };
            return isSplice
                ? { kind: "unquote-splice", expr, location: tok.location }
                : { kind: "unquote", expr, location: tok.location };
        }

        if (tok.kind === "punct" && tok.value === "(") {
            return this.parseQuotedList();
        }
        return this.parseAtom();
    };

    parser.parseQuotedList = function (): any {
        const open = this.advance();
        const headTok = this.current();

        // Check for close paren (empty list)
        if (headTok.kind === "punct" && headTok.value === ")") {
            const close = this.advance();
            return {
                kind: "array",
                elements: [],
                location: {
                    file: this.file,
                    start: open.location.start,
                    end: close.location.end,
                    line: open.location.line,
                    column: open.location.column
                }
            };
        }

        // Handle unquote inside quote
        if (headTok.kind === "identifier" && headTok.value === "unquote") {
            this.advance();
            return this.parseUnquote(open);
        }

        // Handle unquote-splice inside quote
        if (headTok.kind === "identifier" && headTok.value === "unquote-splice") {
            this.advance();
            return this.parseUnquoteSplice(open);
        }

        const head = this.parseQuotedSexpr();
        const args: any[] = [];
        while (true) {
            const cur = this.current();
            if (cur.kind === "punct" && cur.value === ")") break;
            if (cur.kind === "eof") this.error("Unexpected end of input in quoted list", cur);
            args.push(this.parseQuotedSexpr());
        }
        const close = this.advance();
        return {
            kind: "call",
            callee: head,
            args,
            location: {
                file: this.file,
                start: open.location.start,
                end: close.location.end,
                line: open.location.line,
                column: open.location.column
            }
        };
    };

    parser.parseUnquote = function (open: any) {
        const expr = this.parseSexpr();
        const close = this.advance();
        if (!(close.kind === "punct" && close.value === ")")) {
            this.error("Expected ) to close unquote", close);
        }
        return {
            kind: "unquote",
            expr,
            location: { file: this.file, start: open.location.start, end: close.location.end, line: open.location.line, column: open.location.column }
        };
    };

    parser.parseUnquoteSplice = function (open: any) {
        const expr = this.parseSexpr();
        const close = this.advance();
        if (!(close.kind === "punct" && close.value === ")")) {
            this.error("Expected ) to close unquote-splice", close);
        }
        return {
            kind: "unquote-splice",
            expr,
            location: { file: this.file, start: open.location.start, end: close.location.end, line: open.location.line, column: open.location.column }
        };
    };

    parser.parseQuote = function (open: any) {
        const expr = this.parseQuotedSexpr();
        const close = this.advance();
        if (!(close.kind === "punct" && close.value === ")")) {
            this.error("Expected ) to close quote", close);
        }
        return {
            kind: "quote",
            expr,
            location: { file: this.file, start: open.location.start, end: close.location.end, line: open.location.line, column: open.location.column }
        };
    };
}
