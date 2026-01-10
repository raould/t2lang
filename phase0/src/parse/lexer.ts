import { SourceLocation } from "../ast/nodes.js";

export type TokenKind = "identifier" | "number" | "string" | "punct" | "eof" | "error";

export interface Token {
  kind: TokenKind;
  value: string | number;
  location: SourceLocation;
}

// Characters allowed in identifiers (operators and names)
const IDENTIFIER_CHARS = /[A-Za-z0-9_\-*+/<>=!?&|^%~@#$:]/;

export class Lexer {
  private index = 0;
  private line = 1;
  private column = 1;

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
