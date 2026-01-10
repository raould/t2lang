// Wrapper Parser: use Phase0's Parser but source tokens from Phase1's Lexer
import { Parser as BaseParser, attachQuotedParsers, ParserWithQuoted } from "phase0";
import { Lexer as Phase1Lexer } from "./lexer.js";
import type { Token } from "phase0";
import type { CompilerContext } from "../api.js";

type InternalParser = ParserWithQuoted & {
  current(): Token;
  advance(): Token;
  error(message: string, token: Token): never;
  parseSexpr(): unknown;
  parseQuote(open: any): unknown;
  parseImplicitCall?: (open: any, head: string) => unknown;
  file: string;
  parseParamList?: () => Record<string, unknown>[];
  parseBodyUntilClose?: () => unknown[];
  parseDefmacro?: (open: Record<string, unknown>) => unknown;
  parseProgram?: () => unknown;
};

export class Parser {
  private base: ParserWithQuoted & Record<string, unknown>;
  constructor(file: string, source: string, ctx: CompilerContext) {
    // Create the standard base parser which sets up internal state.
    this.base = new BaseParser(file, source, ctx) as unknown as ParserWithQuoted & Record<string, unknown>;
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

    const self: ParserWithQuoted & Record<string, unknown> = this.base as ParserWithQuoted & Record<string, unknown>;

    // Attach shared quoted parsing helpers from Phase0
    attachQuotedParsers(self);

    // Add defmacro parsing helpers (so Phase1's defmacro is parsed properly)
    self.parseParamList = function (this: InternalParser) {
      const params: Record<string, unknown>[] = [];

      const listOpen = this.current();
      if (!(listOpen.kind === "punct" && listOpen.value === "(")) {
        this.error("Expected parameter list", listOpen);
      }
      this.advance();

      while (!(this.current().kind === "punct" && this.current().value === ")")) {
        const paramTok = this.current();

        // Support simple identifier params
        if (paramTok.kind === "identifier") {
          this.advance();
          params.push({
            kind: "identifier",
            name: paramTok.value as string,
            location: paramTok.location
          });
          continue;
        }

        // Support typed parameter sexpr: (name TYPE) or (name : TYPE)
        if (paramTok.kind === "punct" && paramTok.value === "(") {
          // consume '('
          this.advance();
          const nameTok = this.current();
          if (nameTok.kind !== "identifier") {
            this.error("Expected parameter name inside param sexpr", nameTok);
          }
          this.advance();

          // Optional colon separator (legacy sugar)
          if (this.current().kind === "identifier" && this.current().value === ":") {
            this.advance();
          }

          // If next token closes the paren, treat as untyped param
          if (this.current().kind === "punct" && this.current().value === ")") {
            this.advance();
            params.push({ kind: "identifier", name: nameTok.value as string, location: nameTok.location });
            continue;
          }

          // Parse the type expression using the Phase0 helper so we
          // produce a Phase0-style TypeNode (not a generic Expr). The
          // base parser exposes `parseTypeSexprOrLiteral` which returns
          // the structured type AST used by the Phase0 typechecker.
          const typeNode = (this as any).parseTypeSexprOrLiteral();

          const paramClose = this.current();
          if (!(paramClose.kind === "punct" && paramClose.value === ")")) {
            this.error("Expected ) to close typed parameter", paramClose);
          }
          this.advance();

          params.push({ kind: "identifier", name: nameTok.value as string, location: nameTok.location, typeAnnotation: typeNode });
          continue;
        }

        this.error("Expected parameter name", paramTok);
      }
      this.advance(); // consume )

      return params;
    };

    self.parseBodyUntilClose = function (this: InternalParser) {
      const body: unknown[] = [];
      while (!(this.current().kind === "punct" && this.current().value === ")")) {
        body.push(this.parseSexpr());
      }
      return body;
    };

    self.parseDefmacro = function (this: InternalParser, open: Record<string, unknown>) {
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

      const params = this.parseParamList!();
      const body = this.parseBodyUntilClose!();
      const close = this.advance();

      return {
        kind: "defmacro",
        name,
        params,
        body,
        location: { file: this.file, start: (open.location as any).start, end: close.location.end, line: (open.location as any).line, column: (open.location as any).column }
      };
    };

    // Override parseImplicitCall to treat 'defmacro' as a special form handled by parseDefmacro
    const _oldParseImplicitCall = (self.parseImplicitCall as any)?.bind(self);
    self.parseImplicitCall = function (this: InternalParser, open: Record<string, unknown>, head: string) {
      if (head === "defmacro") {
        return this.parseDefmacro!(open);
      }
      if (head === "quote") {
        return this.parseQuote(open);
      }
      return _oldParseImplicitCall(open, head);
    };

    // Provide a Phase1-specific parseClass that accepts field modifiers
    // and mirrors Phase0's class parsing behavior so Phase1 and Phase0
    // agree on acceptable class member forms.
    self.parseClass = function (this: InternalParser, open: any) {
      const nameTok = this.current();
      if (nameTok.kind !== "identifier") {
        this.error("Expected class name", nameTok);
      }
      this.advance();

      const name = {
        kind: "identifier",
        name: nameTok.value as string,
        location: nameTok.location
      };

      // Parse optional typeparams
      let typeparams: any[] = [];
      if (this.current().kind === "punct" && this.current().value === "(") {
        const peek = (this as any).tokens[(this as any).index + 1];
        if (peek && peek.kind === "identifier" && peek.value === "typeparams") {
          // delegate to base implementation if available
          if ((this as any).parseTypeParams) {
            typeparams = (this as any).parseTypeParams();
          }
        }
      }

      // Check for optional superclass
      let superclass: any = null;
      if (this.current().kind === "identifier" &&
        this.current().value !== "field" &&
        this.current().value !== "method" &&
        !(this.current().kind === "punct" && this.current().value === "(")) {
        const superTok = this.advance();
        superclass = { kind: "identifier", name: superTok.value as string, location: superTok.location };
      }

      const fields: any[] = [];
      const methods: any[] = [];

      while (!(this.current().kind === "punct" && this.current().value === ")")) {
        const memberOpen = this.current();
        if (!(memberOpen.kind === "punct" && memberOpen.value === "(")) {
          this.error("Expected (field ...) or (method ...) in class", memberOpen);
        }
        this.advance();

        const memberKind = this.current();
        if (memberKind.kind !== "identifier") {
          this.error("Expected 'field' or 'method'", memberKind);
        }
        this.advance();

        if (memberKind.value === "field") {
          // Support optional modifiers before the field name, e.g.
          // (field public static "name" initializer)
          let access: "public" | "protected" | "private" | undefined = undefined;
          let isStatic = false;
          let isReadonly = false;

          while (this.current().kind === "identifier") {
            const mod = this.current().value as string;
            if (mod === "public" || mod === "protected" || mod === "private") {
              if (access !== undefined) {
                this.error("Multiple access modifiers on field", this.current());
              }
              access = mod as any;
              this.advance();
              continue;
            } else if (mod === "static") {
              isStatic = true;
              this.advance();
              continue;
            } else if (mod === "readonly") {
              isReadonly = true;
              this.advance();
              continue;
            }
            break;
          }

          const fieldNameTok = this.current();
          if (fieldNameTok.kind !== "string") {
            this.error("Expected field name as string", fieldNameTok);
          }
          this.advance();

          let initializer: any = null;
          if (!(this.current().kind === "punct" && this.current().value === ")")) {
            initializer = this.parseSexpr();
          }

          this.advance(); // )
          fields.push({ name: fieldNameTok.value as string, initializer, access, isStatic, isReadonly });
        } else if (memberKind.value === "method") {
          const methodNameTok = this.current();
          if (methodNameTok.kind !== "string") {
            this.error("Expected method name as string", methodNameTok);
          }
          this.advance();

          const params = this.parseParamList!();

          // Optional return type annotation similar to Phase0: (returns TYPE) or ': TYPE'
          let returnType: any = null;
          const maybe = this.current();
          if (maybe.kind === "punct" && maybe.value === "(") {
            const peek = (this as any).tokens[(this as any).index + 1];
            if (peek && peek.kind === "identifier") {
              const head = peek.value as string;
              if (head === "returns" || head === "->") {
                this.advance();
                this.advance();
                returnType = (this as any).parseTypeSexprOrLiteral();
                const closeRt = this.current();
                if (!(closeRt.kind === "punct" && closeRt.value === ")")) {
                  this.error("Expected ) to close returns form", closeRt);
                }
                this.advance();
              }
            }
          } else if (maybe.kind === "identifier" && maybe.value === ":") {
            this.advance();
            returnType = (this as any).parseTypeSexprOrLiteral();
          }

          const body = this.parseBodyUntilClose!();
          this.advance(); // )

          methods.push({ name: methodNameTok.value as string, params, body, returnType });
        } else {
          this.error("Expected 'field' or 'method' in class body", memberKind);
        }
      }

      const close = this.advance();

      return {
        kind: "class",
        name,
        typeparams,
        superclass,
        fields,
        methods,
        location: {
          file: this.file,
          start: open.location.start,
          end: close.location.end,
          line: open.location.line,
          column: open.location.column
        }
      };
    };
  }

  parseProgram() {
    return (this.base as any).parseProgram();
  }
}
