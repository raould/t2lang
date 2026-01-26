import { Lexer as BaseLexer } from "phase0";
import type { Token as BaseToken, TokenKind as BaseTokenKind } from "phase0";

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

    // If we just saw an open paren followed by a dot-sigil, handle it here
    if (tok.kind === "punct" && tok.value === "(") {
      const next = this.base.nextToken() as Token;
      if (next.kind === "error" && next.value === ".") {
        const nameTok = this.base.nextToken() as Token;
        if (nameTok.kind === "identifier") {
          let name = String(nameTok.value);
          if (name.endsWith(':')) name = name.slice(0, -1);
          this.enqueue({ kind: "string", value: name, location: nameTok.location } as Token);

          let typeStart = this.base.nextToken() as Token;
          if (typeStart.kind === 'identifier' && String(typeStart.value) === ':') {
            typeStart = this.base.nextToken() as Token;
          }

          if (typeStart.kind === 'punct' && typeStart.value === '(') {
            const collected: Token[] = [typeStart];
            let depth = 1;
            while (depth > 0) {
              const t = this.base.nextToken() as Token;
              collected.push(t);
              if (t.kind === 'punct' && t.value === '(') depth++;
              else if (t.kind === 'punct' && t.value === ')') depth--;
              if (t.kind === 'eof') break;
            }
            for (const t of collected) this.enqueue(t);
          } else {
            this.enqueue(typeStart);
          }

          this.enqueue({ kind: 'punct', value: ')', location: nameTok.location } as Token);
          return tok;
        } else {
          this.enqueue(next);
          this.enqueue(nameTok);
          return tok;
        }
      }
      this.enqueue(next);
      return tok;
    }

    // Handle backtick as a standalone token for quote
    if (tok.kind === "punct" && tok.value === "`") {
      const loc = tok.location;
      const next = this.base.nextToken() as Token;
      if (next.kind === "punct" && next.value === "(") {
        const exprTokens: BaseToken[] = [];
        exprTokens.push(next as BaseToken);
        let depth = 1;
        while (depth > 0) {
          const t = this.base.nextToken() as BaseToken;
          exprTokens.push(t);
          if (t.kind === "punct" && t.value === "(") depth++;
          else if (t.kind === "punct" && t.value === ")") depth--;
          if (t.kind === "eof") break;
        }
        this.enqueue({ kind: "identifier", value: "quote", location: loc } as BaseToken);
        for (let i = 0; i < exprTokens.length; i++) {
          const t = exprTokens[i];
          if (t.kind === "identifier" && typeof t.value === "string" && t.value.startsWith("~")) {
            const text = t.value as string;
            const isSpliceInner = text.startsWith("~@");
            const remainder = isSpliceInner ? text.slice(2) : text.slice(1);
            const formNameInner = isSpliceInner ? "unquote-splice" : "unquote";
            if (remainder.length > 0) {
              const numMatch = /^-?\d+$/.test(remainder);
              const exprTok = numMatch ? { kind: "number", value: Number(remainder), location: t.location } as Token : { kind: "identifier", value: remainder, location: t.location } as Token;
              const prev = exprTokens[i - 1];
              const next2 = exprTokens[i + 1];
              const isWrappedInParens = prev && prev.kind === "punct" && prev.value === "(" && next2 && next2.kind === "punct" && next2.value === ")";
              this.enqueue({ kind: "identifier", value: formNameInner, location: t.location } as BaseToken);
              this.enqueue(exprTok as BaseToken);
              if (!isWrappedInParens) {
                this.enqueue({ kind: "punct", value: ")", location: t.location } as BaseToken);
              }
              continue;
            }
          }
          this.enqueue(t);
        }
        this.enqueue({ kind: "punct", value: ")", location: loc } as BaseToken);
        return { kind: "punct", value: "(", location: loc } as BaseToken;
      }
      this.enqueue({ kind: "identifier", value: "quote", location: loc } as BaseToken);
      if (next.kind === "identifier" && typeof next.value === "string" && next.value.startsWith("~")) {
        const text = next.value as string;
        const isSpliceInner = text.startsWith("~@");
        const remainder = isSpliceInner ? text.slice(2) : text.slice(1);
        const formNameInner = isSpliceInner ? "unquote-splice" : "unquote";
        if (remainder.length > 0) {
          const numMatch = /^-?\d+$/.test(remainder);
          const exprTok = numMatch ? { kind: "number", value: Number(remainder), location: next.location } as Token : { kind: "identifier", value: remainder, location: next.location } as Token;
          this.enqueue({ kind: "identifier", value: formNameInner, location: next.location } as BaseToken);
          this.enqueue(exprTok as BaseToken);
          this.enqueue({ kind: "punct", value: ")", location: next.location } as BaseToken);
          return { kind: "punct", value: "(", location: loc } as BaseToken;
        }
      }
      this.enqueue(next as BaseToken);
      this.enqueue({ kind: "punct", value: ")", location: loc } as BaseToken);
      return { kind: "punct", value: "(", location: loc } as BaseToken;
    }

    // Only support parenthesized dot-sigil forms like `(.name: Type)`.
    // Bare `.name: Type` (without surrounding parens) is not supported.

    // Combine dotted identifiers like `a.b.c` into a single identifier token
    if (tok.kind === 'identifier') {
      let combined = String(tok.value);
      while (true) {
        const peek = this.base.nextToken() as Token;
        if (peek.kind === 'error' && peek.value === '.') {
          const nextId = this.base.nextToken() as Token;
          if (nextId.kind === 'identifier') {
            combined = combined + '.' + String(nextId.value);
            continue;
          } else {
            this.enqueue(nextId);
            this.enqueue(peek);
            break;
          }
        }
        this.enqueue(peek);
        break;
      }
      if (combined !== String(tok.value)) {
        return { kind: 'identifier', value: combined, location: tok.location } as Token;
      }
    }

    return tok;
  }

}

export type Token = BaseToken;
export type TokenKind = BaseTokenKind;
