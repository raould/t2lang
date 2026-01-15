import { SourceLocation } from "../ast/nodes.js";

export type TokenKind = "identifier" | "number" | "string" | "punct" | "eof" | "error";

export interface Token {
  kind: TokenKind;
  value: string | number;
  location: SourceLocation;
}

// Characters allowed in identifiers (operators and names)
// Note: ~ is NOT included because it's used as unquote prefix
const IDENTIFIER_CHARS = /[A-Za-z0-9_\-*+/<>=!?&|^%@#$:]/;

export class Lexer {
  private index = 0;
  private line = 1;
  private column = 1;
  // Token queue for reader macro expansion
  private tokenQueue: Token[] = [];

  constructor(
    private readonly file: string,
    private readonly source: string
  ) {}

  private isIdentifierChar(ch: string): boolean {
    return IDENTIFIER_CHARS.test(ch);
  }

  private currentChar(): string {
    return this.source[this.index] ?? "\0";
  }

  private advance(): void {
    if (this.currentChar() === "\n") {
      this.line++;
      this.column = 1;
    } else {
      this.column++;
    }
    this.index++;
  }

  private makeLocation(start: number, end: number, line: number, column: number): SourceLocation {
    return {
      file: this.file,
      start,
      end,
      line,
      column
    };
  }

  nextToken(): Token {
    // Return queued tokens first (from reader macro expansion)
    if (this.tokenQueue.length > 0) {
      return this.tokenQueue.shift()!;
    }

    this.skipWhitespaceAndComments();

    const start = this.index;
    const startLine = this.line;
    const startColumn = this.column;
    const ch = this.currentChar();

    if (ch === "\0") {
      return {
        kind: "eof",
        value: "",
        location: this.makeLocation(start, start, startLine, startColumn)
      };
    }

    if (ch === "(" || ch === ")") {
      this.advance();
      return {
        kind: "punct",
        value: ch,
        location: this.makeLocation(start, this.index, startLine, startColumn)
      };
    }

    // Reader macro: ~ expands to (unquote ...) and ~@ to (unquote-splice ...)
    if (ch === "~") {
      return this.expandUnquote(start, startLine, startColumn);
    }

    if (ch === '"') {
      return this.lexString(start, startLine, startColumn);
    }

    if (/[0-9]/.test(ch)) {
      return this.lexNumber(start, startLine, startColumn);
    }

    // Check if it's a valid identifier start character
    if (this.isIdentifierChar(ch)) {
      return this.lexIdentifier(start, startLine, startColumn);
    }

    // Unexpected character - create error token and advance to prevent infinite loop
    this.advance();
    return {
      kind: "error",
      value: ch,
      location: this.makeLocation(start, this.index, startLine, startColumn)
    };
  }

  /**
   * Reader macro for unquote: ~ and ~@
   * Expands ~expr to (unquote expr)
   * Expands ~@expr to (unquote-splice expr)
   */
  private expandUnquote(start: number, startLine: number, startColumn: number): Token {
    this.advance(); // consume ~
    
    const isSplice = this.currentChar() === "@";
    if (isSplice) {
      this.advance(); // consume @
    }

    const loc = this.makeLocation(start, this.index, startLine, startColumn);
    const formName = isSplice ? "unquote-splice" : "unquote";

    // Read the next expression's tokens
    // We need to handle: ~x, ~(expr), ~123, ~"string"
    this.skipWhitespaceAndComments();
    
    // Get the expression token(s)
    const exprTokens = this.readExpressionTokens();
    
    // Queue up: formName, exprTokens..., )
    this.tokenQueue.push({
      kind: "identifier",
      value: formName,
      location: loc
    });
    this.tokenQueue.push(...exprTokens);
    this.tokenQueue.push({
      kind: "punct",
      value: ")",
      location: loc
    });

    // Return opening paren
    return {
      kind: "punct",
      value: "(",
      location: loc
    };
  }

  /**
   * Read tokens for a single expression (for reader macro expansion)
   */
  private readExpressionTokens(): Token[] {
    const ch = this.currentChar();
    
    if (ch === "(") {
      // Read a full parenthesized expression
      return this.readParenExprTokens();
    } else {
      // Single token (identifier, number, string)
      const tok = this.nextToken();
      return [tok];
    }
  }

  /**
   * Read all tokens for a parenthesized expression, including nested parens
   */
  private readParenExprTokens(): Token[] {
    const tokens: Token[] = [];
    let depth = 0;
    
    do {
      const tok = this.nextToken();
      tokens.push(tok);
      
      if (tok.kind === "punct" && tok.value === "(") {
        depth++;
      } else if (tok.kind === "punct" && tok.value === ")") {
        depth--;
      } else if (tok.kind === "eof") {
        break; // Avoid infinite loop on unterminated input
      }
    } while (depth > 0);
    
    return tokens;
  }

  private skipWhitespaceAndComments(): void {
    while (true) {
      // Skip whitespace
      while (/\s/.test(this.currentChar())) {
        this.advance();
      }

      // Check for comments
      const ch = this.currentChar();
      const next = this.source[this.index + 1] ?? "\0";

      // Lisp-style single-line comment: ; to end of line
      if (ch === ";") {
        this.skipToEndOfLine();
        continue;
      }

      // C-style single-line comment: // to end of line
      if (ch === "/" && next === "/") {
        this.skipToEndOfLine();
        continue;
      }

      // C-style block comment: /* ... */
      if (ch === "/" && next === "*") {
        this.skipBlockComment();
        continue;
      }

      // No more whitespace or comments
      break;
    }
  }

  private skipToEndOfLine(): void {
    while (this.currentChar() !== "\n" && this.currentChar() !== "\0") {
      this.advance();
    }
    // Advance past the newline if present
    if (this.currentChar() === "\n") {
      this.advance();
    }
  }

  private skipBlockComment(): void {
    // Skip the opening /*
    this.advance();
    this.advance();

    while (this.currentChar() !== "\0") {
      if (this.currentChar() === "*" && (this.source[this.index + 1] ?? "\0") === "/") {
        // Skip the closing */
        this.advance();
        this.advance();
        return;
      }
      this.advance();
    }
    // If we reach EOF without closing, just return (could emit error)
  }

  private lexString(start: number, startLine: number, startColumn: number): Token {
    this.advance();
    let value = "";
    while (this.currentChar() !== '"' && this.currentChar() !== "\0") {
      if (this.currentChar() === "\\") {
        this.advance();
        const esc = this.currentChar();
        switch (esc) {
          case "n":
            value += "\n";
            break;
          case "t":
            value += "\t";
            break;
          case "r":
            value += "\r";
            break;
          case '"':
            value += '"';
            break;
          case "\\":
            value += "\\";
            break;
          default:
            value += esc;
            break;
        }
        this.advance();
        continue;
      }
      value += this.currentChar();
      this.advance();
    }
    if (this.currentChar() === "\0") {
      return {
        kind: "error",
        value: "Unterminated string literal",
        location: this.makeLocation(start, this.index, startLine, startColumn)
      };
    }
    this.advance();
    return {
      kind: "string",
      value,
      location: this.makeLocation(start, this.index, startLine, startColumn)
    };
  }

  private lexNumber(start: number, startLine: number, startColumn: number): Token {
    while (/[0-9]/.test(this.currentChar())) {
      this.advance();
    }
    const raw = this.source.slice(start, this.index);
    const value = Number(raw);
    return {
      kind: "number",
      value,
      location: this.makeLocation(start, this.index, startLine, startColumn)
    };
  }

  private lexIdentifier(start: number, startLine: number, startColumn: number): Token {
    while (this.isIdentifierChar(this.currentChar())) {
      this.advance();
    }
    const value = this.source.slice(start, this.index);
    return {
      kind: "identifier",
      value,
      location: this.makeLocation(start, this.index, startLine, startColumn)
    };
  }
}
