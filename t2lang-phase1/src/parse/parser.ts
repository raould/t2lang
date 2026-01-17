// Wrapper Parser: use Phase0's Parser but source tokens from Phase1's Lexer
import { Parser as BaseParser } from "t2lang-phase0";
import { Lexer as Phase1Lexer } from "./lexer.js";
import type { Token } from "t2lang-phase0";
import type { CompilerContext } from "../api.js";

export class Parser {
  private base: any;
  constructor(file: string, source: string, ctx: CompilerContext) {
    // Create the standard base parser which sets up internal state.
    this.base = new BaseParser(file, source, ctx);
    // Replace its token stream with Phase1's tokens produced by our Lexer
    const lexer = new Phase1Lexer(file, source);
    const toks: Token[] = [];
    while (true) {
      const t = lexer.nextToken();
      toks.push(t);
      if (t.kind === "eof") break;
    }
    this.base.tokens = toks;
    this.base.index = 0;

    const self = this.base as any;

    self.parseQuotedSexpr = function (): any {
      const tok = this.current();


      // Handle ~name and ~@name shorthands inside explicit quoted forms (e.g., (quote (prop ~obj ~name)))
      if (tok.kind === "identifier" && typeof tok.value === "string" && tok.value.startsWith("~")) {
        const text = tok.value as string;
        const isSplice = text.startsWith("~@");
        const remainder = isSplice ? text.slice(2) : text.slice(1);
        if (remainder.length === 0) {
          this.error("Invalid unquote shorthand", tok);
        }
        this.advance();
        const numMatch = /^-?\d+$/.test(remainder);
        const expr = numMatch ? { kind: "literal", value: Number(remainder), location: tok.location } : { kind: "identifier", name: remainder, location: tok.location };
        return isSplice
          ? { kind: "unquote-splice", expr, location: tok.location }
          : { kind: "unquote", expr, location: tok.location };
      }

      if (tok.kind === "punct" && tok.value === "(") {
        return this.parseQuotedList();
      }
      return this.parseAtom();
    };

    self.parseQuotedList = function (): any {
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

      // Generic call in quoted context
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

    self.parseUnquote = function (open: any) {
      const expr = self.parseSexpr();
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

    self.parseUnquoteSplice = function (open: any) {
      const expr = self.parseSexpr();
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

    // Override parseQuote to use quoted-specific parsing so unquote/unquote-splice
    // are treated as special nodes instead of being parsed by normal rules.
    self.parseQuote = function (open: any) {
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

    // Add defmacro parsing helpers (so Phase1's defmacro is parsed properly)
    self.parseParamList = function () {
      const params: any[] = [];

      const listOpen = this.current();
      if (!(listOpen.kind === "punct" && listOpen.value === "(")) {
        this.error("Expected parameter list", listOpen);
      }
      this.advance();

      while (!(this.current().kind === "punct" && this.current().value === ")")) {
        const paramTok = this.current();
        if (paramTok.kind !== "identifier") {
          this.error("Expected parameter name", paramTok);
        }
        this.advance();

        params.push({
          kind: "identifier",
          name: paramTok.value as string,
          location: paramTok.location
        });
      }
      this.advance(); // consume )

      return params;
    };

    self.parseBodyUntilClose = function () {
      const body: any[] = [];
      while (!(self.current().kind === "punct" && self.current().value === ")")) {
        body.push(self.parseSexpr());
      }
      return body;
    };

    self.parseDefmacro = function (open: any) {
      const nameTok = this.current();
      if (nameTok.kind !== "identifier") {
        this.error("Expected macro name", nameTok);
      }
      this.advance();

      const name = {
        kind: "identifier",
        name: nameTok.value as string,
        location: nameTok.location
      };

      const params = this.parseParamList();
      const body = this.parseBodyUntilClose();
      const close = this.advance();

      return {
        kind: "defmacro",
        name,
        params,
        body,
        location: { file: this.file, start: open.location.start, end: close.location.end, line: open.location.line, column: open.location.column }
      };
    };

    // Override parseImplicitCall to treat 'defmacro' as a special form handled by parseDefmacro
    const _oldParseImplicitCall = self.parseImplicitCall.bind(self);
    self.parseImplicitCall = function (open: any, head: string) {
      if (head === "defmacro") {
        return this.parseDefmacro(open);
      }
      if (head === "quote") {
        return this.parseQuote(open);
      }
      return _oldParseImplicitCall(open, head);
    };
  }

  parseProgram() {
    return this.base.parseProgram();
  }
}
