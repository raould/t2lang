import { nextNodeId, registerSpan } from "./Stage10-spans";
const isWs  = (ch) => {
  return ((ch === " ") || ((ch === "\t") || ((ch === "\n") || (ch === "\r"))));
};
const isDigit  = (ch) => {
  return ((ch >= "0") && (ch <= "9"));
};
const isAlpha  = (ch) => {
  return (((ch >= "a") && (ch <= "z")) || (((ch >= "A") && (ch <= "Z")) || (ch === "_")));
};
const isIdentStop  = (ch) => {
  if ((ch === "")) {
    return true;
  }
  if (isWs(ch)) {
    return true;
  }
  if ((ch === "(")) {
    return true;
  }
  if ((ch === ")")) {
    return true;
  }
  if ((ch === "[")) {
    return true;
  }
  if ((ch === "]")) {
    return true;
  }
  if ((ch === "{")) {
    return true;
  }
  if ((ch === "}")) {
    return true;
  }
  if ((ch === ",")) {
    return true;
  }
  if ((ch === ":")) {
    return true;
  }
  if ((ch === ";")) {
    return true;
  }
  if ((ch === "+")) {
    return true;
  }
  if ((ch === "-")) {
    return true;
  }
  if ((ch === "*")) {
    return true;
  }
  if ((ch === "%")) {
    return true;
  }
  if ((ch === "<")) {
    return true;
  }
  if ((ch === ">")) {
    return true;
  }
  if ((ch === "!")) {
    return true;
  }
  if ((ch === "&")) {
    return true;
  }
  if ((ch === "|")) {
    return true;
  }
  if ((ch === "^")) {
    return true;
  }
  if ((ch === "~")) {
    return true;
  }
  if ((ch === ".")) {
    return true;
  }
  if ((ch === "=")) {
    return true;
  }
  if ((ch === "?")) {
    return true;
  }
  if ((ch === "\"")) {
    return true;
  }
  if ((ch === "'")) {
    return true;
  }
  if ((ch === "`")) {
    return true;
  }
  return false;
};
const tokenizeInfix  = (src) => {
  {
    let i  = 0;
    let len  = src.length;
    let tokens  = [];
    const chAt  = (offset) => {
      {
        let p  = (i + offset);
        if (((p < 0) || (p >= len))) {
          return "";
        }
        return src.charAt(p);
      }
    };
    const startsWith  = (s) => {
      return (src.slice(i, (i + s.length)) === s);
    };
    const emit  = (kind, text, offset) => {
      tokens.push({
        kind: kind,
        text: text,
        offset: offset
      });
    };
    const fail  = (msg) => {
      throw new Error(((("infix tokenizer at offset " + i) + ": ") + msg));
    };
    const scanNumber  = () => {
      {
        let start  = i;
        while (((i < len) && isDigit(chAt(0)))) {
          i = (i + 1);
        }
        if (((chAt(0) === ".") && isDigit(chAt(1)))) {
          i = (i + 1);
          while (((i < len) && isDigit(chAt(0)))) {
            i = (i + 1);
          }
        }
        if (((chAt(0) === "e") || (chAt(0) === "E"))) {
          i = (i + 1);
          if (((chAt(0) === "+") || (chAt(0) === "-"))) {
            i = (i + 1);
          }
          while (((i < len) && isDigit(chAt(0)))) {
            i = (i + 1);
          }
        }
        emit("NUM", src.slice(start, i), start);
      }
    };
    const scanString  = () => {
      {
        let start  = i;
        let quoteCh  = chAt(0);
        i = (i + 1);
        while (((i < len) && (chAt(0) !== quoteCh))) {
          if ((chAt(0) === "\\")) {
            i = (i + 2);
          }
          else {
            i = (i + 1);
          }
        }
        if ((i >= len)) {
          fail(("unterminated string starting with " + quoteCh));
        }
        i = (i + 1);
        emit("STR", src.slice(start, i), start);
      }
    };
    const scanBacktick  = () => {
      {
        let start  = i;
        i = (i + 1);
        while (((i < len) && (chAt(0) !== "`"))) {
          if ((chAt(0) === "\\")) {
            i = (i + 2);
          }
          else {
            i = (i + 1);
          }
        }
        if ((i >= len)) {
          fail("unterminated backtick string");
        }
        i = (i + 1);
        emit("STR", src.slice(start, i), start);
      }
    };
    const scanIdent  = () => {
      {
        let start  = i;
        while (((i < len) && (!isIdentStop(chAt(0))))) {
          i = (i + 1);
        }
        emit("IDENT", src.slice(start, i), start);
      }
    };
    const tryMultiCharOp  = () => {
      if (startsWith("...")) {
        emit("DOTDOTDOT", "...", i);
        i = (i + 3);
        return true;
      }
      if (startsWith("===")) {
        emit("STRICT_EQ", "===", i);
        i = (i + 3);
        return true;
      }
      if (startsWith("!==")) {
        emit("STRICT_NEQ", "!==", i);
        i = (i + 3);
        return true;
      }
      if (startsWith("**")) {
        emit("STARSTAR", "**", i);
        i = (i + 2);
        return true;
      }
      if (startsWith("<=")) {
        emit("LTE", "<=", i);
        i = (i + 2);
        return true;
      }
      if (startsWith(">=")) {
        emit("GTE", ">=", i);
        i = (i + 2);
        return true;
      }
      if (startsWith("==")) {
        emit("EQ", "==", i);
        i = (i + 2);
        return true;
      }
      if (startsWith("!=")) {
        emit("NEQ", "!=", i);
        i = (i + 2);
        return true;
      }
      if (startsWith("&&")) {
        emit("AMPAMP", "&&", i);
        i = (i + 2);
        return true;
      }
      if (startsWith("||")) {
        emit("PIPEPIPE", "||", i);
        i = (i + 2);
        return true;
      }
      if (startsWith("??")) {
        emit("NULLCOAL", "??", i);
        i = (i + 2);
        return true;
      }
      return false;
    };
    const trySingleCharOp  = (ch) => {
      if ((ch === "(")) {
        emit("LPAREN", "(", i);
        i = (i + 1);
        return true;
      }
      if ((ch === ")")) {
        emit("RPAREN", ")", i);
        i = (i + 1);
        return true;
      }
      if ((ch === "{")) {
        emit("LBRACE", "{", i);
        i = (i + 1);
        return true;
      }
      if ((ch === "}")) {
        emit("RBRACE", "}", i);
        i = (i + 1);
        return true;
      }
      if ((ch === ",")) {
        emit("COMMA", ",", i);
        i = (i + 1);
        return true;
      }
      if ((ch === ".")) {
        emit("DOT", ".", i);
        i = (i + 1);
        return true;
      }
      if ((ch === "+")) {
        emit("PLUS", "+", i);
        i = (i + 1);
        return true;
      }
      if ((ch === "-")) {
        emit("MINUS", "-", i);
        i = (i + 1);
        return true;
      }
      if ((ch === "*")) {
        emit("STAR", "*", i);
        i = (i + 1);
        return true;
      }
      if ((ch === "/")) {
        emit("SLASH", "/", i);
        i = (i + 1);
        return true;
      }
      if ((ch === "%")) {
        emit("PERCENT", "%", i);
        i = (i + 1);
        return true;
      }
      if ((ch === "<")) {
        emit("LT", "<", i);
        i = (i + 1);
        return true;
      }
      if ((ch === ">")) {
        emit("GT", ">", i);
        i = (i + 1);
        return true;
      }
      if ((ch === "!")) {
        emit("BANG", "!", i);
        i = (i + 1);
        return true;
      }
      if ((ch === "&")) {
        emit("AMP", "&", i);
        i = (i + 1);
        return true;
      }
      if ((ch === "|")) {
        emit("PIPE", "|", i);
        i = (i + 1);
        return true;
      }
      if ((ch === "^")) {
        emit("CARET", "^", i);
        i = (i + 1);
        return true;
      }
      if ((ch === "~")) {
        emit("TILDE", "~", i);
        i = (i + 1);
        return true;
      }
      return false;
    };
    const scanOne  = () => {
      {
        let ch  = chAt(0);
        if (isWs(ch)) {
          i = (i + 1);
          return;
        }
        if ((ch === "#")) {
          fail("nested #{} is not allowed");
        }
        if (isDigit(ch)) {
          scanNumber();
          return;
        }
        if ((ch === "\"")) {
          scanString();
          return;
        }
        if ((ch === "'")) {
          scanString();
          return;
        }
        if ((ch === "`")) {
          scanBacktick();
          return;
        }
        if (tryMultiCharOp()) {
          return;
        }
        if (trySingleCharOp(ch)) {
          return;
        }
        if (isAlpha(ch)) {
          scanIdent();
          return;
        }
        if ((ch === "@")) {
          scanIdent();
          return;
        }
        if ((ch === "$")) {
          scanIdent();
          return;
        }
        if ((ch === "/")) {
          scanIdent();
          return;
        }
        fail((("unexpected character: '" + ch) + "'"));
      }
    };
    while ((i < len)) {
      scanOne();
    }
    emit("EOF", "", i);
    return tokens;
  }
};
const parseStringLiteral  = (tokenText) => {
  if (tokenText.startsWith("`")) {
    return tokenText.slice(1, -1);
  }
  {
    let quoteCh  = tokenText.charAt(0);
    let inner  = tokenText.slice(1, -1);
    let result  = "";
    let i  = 0;
    while ((i < inner.length)) {
      {
        let ch  = inner.charAt(i);
        if ((ch === "\\")) {
          {
            let next  = inner.charAt((i + 1));
            i = (i + 1);
            result = (result + ((next === "n") ? "\n" : ((next === "r") ? "\r" : ((next === "t") ? "\t" : ((next === "0") ? String.fromCharCode(0) : next)))));
          }
        }
        else {
          result = (result + ch);
        }
      }
      i = (i + 1);
    }
    return result;
  }
};
const parsePrattInfix  = (inner, ctx) => {
  {
    let tokens  = tokenizeInfix(inner);
    let pos  = 0;
    const mkId  = () => {
      return registerSpan(nextNodeId(), ctx);
    };
    const peek  = () => {
      return tokens[pos];
    };
    const peekKind  = () => {
      return peek().kind;
    };
    const peekAt  = (offset) => {
      {
        let p  = (pos + offset);
        if ((p >= tokens.length)) {
          return {
            kind: "EOF",
            text: "",
            offset: 0
          };
        }
        return tokens[p];
      }
    };
    const advance  = () => {
      {
        let t  = tokens[pos];
        pos = (pos + 1);
        return t;
      }
    };
    const expectKind  = (kind) => {
      {
        let t  = advance();
        if ((t.kind !== kind)) {
          throw new Error((((((("expected " + kind) + " but got ") + t.kind) + " '") + t.text) + "'"));
        }
        return t;
      }
    };
    const bp  = (kind) => {
      if ((kind === "PIPEPIPE")) {
        return 10;
      }
      if ((kind === "NULLCOAL")) {
        return 10;
      }
      if ((kind === "AMPAMP")) {
        return 20;
      }
      if ((kind === "PIPE")) {
        return 30;
      }
      if ((kind === "CARET")) {
        return 40;
      }
      if ((kind === "AMP")) {
        return 50;
      }
      if ((kind === "STRICT_EQ")) {
        return 60;
      }
      if ((kind === "STRICT_NEQ")) {
        return 60;
      }
      if ((kind === "EQ")) {
        return 60;
      }
      if ((kind === "NEQ")) {
        return 60;
      }
      if ((kind === "LT")) {
        return 70;
      }
      if ((kind === "GT")) {
        return 70;
      }
      if ((kind === "LTE")) {
        return 70;
      }
      if ((kind === "GTE")) {
        return 70;
      }
      if ((kind === "PLUS")) {
        return 80;
      }
      if ((kind === "MINUS")) {
        return 80;
      }
      if ((kind === "STAR")) {
        return 90;
      }
      if ((kind === "SLASH")) {
        return 90;
      }
      if ((kind === "PERCENT")) {
        return 90;
      }
      if ((kind === "STARSTAR")) {
        return 100;
      }
      if ((kind === "DOT")) {
        return 110;
      }
      if ((kind === "LPAREN")) {
        return 120;
      }
      return 0;
    };
    {
      let parseExpr  = null;
      const parsePropAccess  = () => {
        expectKind("DOT");
        {
          let obj  = parseSFormAtom();
          let keyTok  = expectKind("IDENT");
          expectKind("RPAREN");
          return {
            id: mkId(),
            text: "",
            tag: "prop-access",
            object: obj,
            key: keyTok.text
          };
        }
      };
      const parseSubscriptForm  = () => {
        advance();
        {
          let obj  = parseSFormAtom();
          let strTok  = expectKind("STR");
          expectKind("RPAREN");
          return {
            id: mkId(),
            text: "",
            tag: "subscript-access",
            object: obj,
            rawIndex: parseStringLiteral(strTok.text)
          };
        }
      };
      const parseSFormAtom  = () => {
        return parseExpr(110);
      };
      const parseOneArg  = () => {
        if ((peekKind() === "DOTDOTDOT")) {
          advance();
          return {
            id: mkId(),
            text: "",
            tag: "spread",
            expr: parseExpr(0)
          };
        }
        return parseExpr(0);
      };
      const parseCallArgs  = () => {
        {
          let args  = [];
          if ((peekKind() === "RPAREN")) {
            advance();
            return args;
          }
          args.push(parseOneArg());
          while ((peekKind() === "COMMA")) {
            advance();
            if ((peekKind() === "RPAREN")) {
              advance();
              return args;
            }
            args.push(parseOneArg());
          }
          expectKind("RPAREN");
          return args;
        }
      };
      const nud  = (tok) => {
        {
          let kind  = tok.kind;
          let text  = tok.text;
          if ((kind === "NUM")) {
            return {
              id: mkId(),
              text: text,
              tag: "literal",
              value: Number(text)
            };
          }
          if ((kind === "STR")) {
            return {
              id: mkId(),
              text: text,
              tag: "literal",
              value: parseStringLiteral(text)
            };
          }
          if ((kind === "IDENT")) {
            if (text.includes("/")) {
              throw new Error((("identifier '" + text) + "' contains '/' — add spaces around it for division"));
            }
            return {
              id: mkId(),
              text: text,
              tag: "identifier",
              name: text
            };
          }
          if ((kind === "MINUS")) {
            return {
              id: mkId(),
              tag: "unary-op",
              op: "-",
              operand: parseExpr(100)
            };
          }
          if ((kind === "BANG")) {
            return {
              id: mkId(),
              tag: "unary-op",
              op: "!",
              operand: parseExpr(100)
            };
          }
          if ((kind === "TILDE")) {
            return {
              id: mkId(),
              tag: "unary-op",
              op: "~",
              operand: parseExpr(100)
            };
          }
          if ((kind === "LBRACE")) {
            {
              let inner  = parseExpr(0);
              expectKind("RBRACE");
              return inner;
            }
          }
          if ((kind === "LPAREN")) {
            if ((peekKind() === "DOT")) {
              return parsePropAccess();
            }
            if (((peekKind() === "IDENT") && (peek().text === "subscript"))) {
              return parseSubscriptForm();
            }
            throw new Error("'(' is not a sub-grouping form inside #{} — use {...}");
          }
          if ((kind === "EOF")) {
            throw new Error("unexpected end of #{} expression");
          }
          throw new Error((((("unexpected token in atom position: " + kind) + " '") + text) + "'"));
        }
      };
      const led  = (left, tok) => {
        {
          let kind  = tok.kind;
          let text  = tok.text;
          if ((kind === "LPAREN")) {
            {
              let args  = parseCallArgs();
              return {
                id: mkId(),
                tag: "call",
                fn: left,
                args: args,
                typeArgs: []
              };
            }
          }
          if ((kind === "DOT")) {
            {
              let keyTok  = expectKind("IDENT");
              return {
                id: mkId(),
                text: "",
                tag: "prop-access",
                object: left,
                key: keyTok.text
              };
            }
          }
          if ((kind === "STARSTAR")) {
            return {
              id: mkId(),
              tag: "binary-op",
              op: text,
              left: left,
              right: parseExpr(99)
            };
          }
          {
            let leftBp  = bp(kind);
            if ((leftBp === 0)) {
              throw new Error((((("no led for " + kind) + " '") + text) + "'"));
            }
            return {
              id: mkId(),
              tag: "binary-op",
              op: text,
              left: left,
              right: parseExpr(leftBp)
            };
          }
        }
      };
      parseExpr = (minBp) => {
        {
          let left  = nud(advance());
          while ((bp(peekKind()) > minBp)) {
            left = led(left, advance());
          }
          return left;
        }
      };
      if ((peekKind() === "EOF")) {
        throw new Error("empty #{} expression");
      }
      {
        let result  = parseExpr(0);
        if ((peekKind() !== "EOF")) {
          throw new Error((((("unexpected token after expression: " + peekKind()) + " '") + peek().text) + "'"));
        }
        return result;
      }
    }
  }
};
export { parsePrattInfix, tokenizeInfix };
