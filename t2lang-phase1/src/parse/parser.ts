// Wrapper Parser: use Phase0's Parser but source tokens from Phase1's Lexer
import { Parser as BaseParser, attachQuotedParsers, ParserWithQuoted } from "t2lang-phase0";
import { Lexer as Phase1Lexer } from "./lexer.js";
import type { Token } from "t2lang-phase0";
import type { CompilerContext } from "../api.js";

export class Parser {
  private base: ParserWithQuoted & Record<string, any>;
  constructor(file: string, source: string, ctx: CompilerContext) {
    // Create the standard base parser which sets up internal state.
    this.base = new BaseParser(file, source, ctx) as unknown as ParserWithQuoted & Record<string, any>;
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

    const self = this.base as ParserWithQuoted & Record<string, any>;

    // Attach shared quoted parsing helpers from Phase0
    attachQuotedParsers(self);

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
