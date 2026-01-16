import { Lexer as BaseLexer } from "t2-phase0";
import type { Token as BaseToken, TokenKind as BaseTokenKind } from "t2-phase0";

// Wrapper Lexer for Phase1 that delegates to Phase0's Lexer
// and expands reader macros `~` and `~@` into (unquote ...) and (unquote-splice ...)
export class Lexer {
  private base: InstanceType<typeof BaseLexer>;
  private tokenQueue: Token[] = [];

  constructor(file: string, source: string) {
    this.base = new BaseLexer(file, source) as InstanceType<typeof BaseLexer>;
  }

  private enqueue(tok: Token) {
    this.tokenQueue.push(tok);
  }

  nextToken(): Token {
    if (this.tokenQueue.length > 0) return this.tokenQueue.shift()!;

    const tok = this.base.nextToken() as Token;

    // If identifier begins with ~ or ~@, expand reader macro
    if (tok.kind === "identifier" && typeof tok.value === "string" && tok.value.startsWith("~")) {
      const text = tok.value as string;
      const isSplice = text.startsWith("~@");
      const remainder = isSplice ? text.slice(2) : text.slice(1);
      const formName = isSplice ? "unquote-splice" : "unquote";

      // location to attach to synthetic tokens
      const loc = tok.location;

      // We'll emit: ( formName <expr> ) => so return '(' now and queue the rest
      // If remainder exists in the same token (e.g., ~x or ~123), create a synthetic token
      if (remainder.length > 0) {
        // determine token kind for remainder (number vs identifier)
        const numMatch = /^-?\d+$/.test(remainder);
        let exprTok: Token;
        if (numMatch) {
          exprTok = { kind: "number", value: Number(remainder), location: loc } as Token;
        } else {
          exprTok = { kind: "identifier", value: remainder, location: loc } as Token;
        }

        this.enqueue({ kind: "identifier", value: formName, location: loc } as Token);
        this.enqueue(exprTok);
        this.enqueue({ kind: "punct", value: ")", location: loc } as Token);
        return { kind: "punct", value: "(", location: loc } as Token;
      }

      // No remainder: expression follows as separate tokens; pull it from base
      // Read next token(s) to capture the expression
      const next = this.base.nextToken() as Token;

      // If next is a parenthesized expr, we need to read until matching paren
      if (next.kind === "punct" && next.value === "(") {
        const exprTokens: BaseToken[] = [];
        // start with the opening paren
        exprTokens.push(next as BaseToken);
        let depth = 1;
        // consume tokens until we close the initial paren
        while (depth > 0) {
          const t = this.base.nextToken() as BaseToken;
          exprTokens.push(t);
          if (t.kind === "punct" && t.value === "(") depth++;
          else if (t.kind === "punct" && t.value === ")") depth--;
          if (t.kind === "eof") break;
        }

        this.enqueue({ kind: "identifier", value: formName, location: loc } as BaseToken);
        for (const t of exprTokens) this.enqueue(t);
        return { kind: "punct", value: "(", location: loc } as BaseToken;
      }

      // Single-token expression
      this.enqueue({ kind: "identifier", value: formName, location: loc } as BaseToken);
      this.enqueue(next as BaseToken);
      this.enqueue({ kind: "punct", value: ")", location: loc } as BaseToken);
      return { kind: "punct", value: "(", location: loc } as BaseToken;
    }

    return tok;
  }

}

export type Token = BaseToken;
export type TokenKind = BaseTokenKind;
