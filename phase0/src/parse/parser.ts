import { Lexer, Token } from "./lexer.js";
import { CompilerContext } from "../api.js";
import { CompilerError } from "../errors/compilerError.js";
import {
  Program,
  Expr,
  Identifier,
  LiteralExpr,
  CallExpr,
  LetExpr,
  LetBinding,
  IfExpr,
  PropExpr,
  FunctionExpr,
  ReturnExpr,
  WhileExpr,
  ArrayExpr,
  ObjectExpr,
  ObjectField,
  AssignExpr,
  ForExpr,
  IndexExpr,
  NewExpr,
  ClassExpr,
  ClassField,
  ClassMethod,
  TypeAssertExpr,
  TypeNode,
  TypeAliasStmt,
  ImportStmt,
  ExportStmt,
  ThrowExpr,
  TryCatchExpr,
  BlockStmt,
  ExprStmt,
  Statement
} from "../ast/nodes.js";

export class Parser {
  private tokens: Token[] = [];
  private index = 0;
  private inProgram = false;

  constructor(
    private readonly file: string,
    source: string,
    private readonly ctx: CompilerContext
  ) {
    const lexer = new Lexer(file, source);
    this.tokens = [];
    while (true) {
      const tok = lexer.nextToken();
      this.tokens.push(tok);
      if (tok.kind === "eof") break;
    }
    void this.ctx;
  }

  private current(): Token {
    return this.tokens[this.index];
  }

  private advance(): Token {
    return this.tokens[this.index++];
  }

  private error(message: string, token: Token): never {
    const err: CompilerError = {
      message,
      location: token.location,
      phase: "parse"
    };
    throw err;
  }

  parseProgram(): Program {
    const openTok = this.current();
    if (!(openTok.kind === "punct" && openTok.value === "(")) {
      this.error("Program must start with (program ...)", openTok);
    }
    const open = this.advance();
    const headTok = this.current();
    if (headTok.kind !== "identifier") {
      this.error("Program must start with (program ...)", headTok);
    }
    const head = headTok.value as string;
    if (head !== "program") {
      this.error("Program must start with (program ...)", headTok);
    }
    this.advance();
    this.inProgram = true;
    const program = this.parseProgramList(open);
    this.inProgram = false;
    return program;
  }

  private parseSexpr(): Expr {
    const tok = this.current();
    if (tok.kind === "punct" && tok.value === "(") {
      return this.parseList();
    }
    return this.parseAtom();
  }

  private parseList(): Expr {
    const open = this.advance();
    const headTok = this.current();
    if (headTok.kind !== "identifier") {
      this.error("List must start with an identifier", headTok);
    }
    const head = headTok.value as string;
    this.advance();

    switch (head) {
      case "program": {
        if (this.inProgram) {
          this.error("Nested (program ...) forms are not allowed", headTok);
        }
        this.inProgram = true;
        const program = this.parseProgramList(open) as unknown as Expr;
        this.inProgram = false;
        return program;
      }
      case "let*":
        return this.parseLetOrConst(open, false);
      case "let": {
        // Plain `let` is not supported in Phase0; require `let*` for sequential bindings
        this.error("'let' is deprecated in Phase0, use 'let*' for sequential bindings", headTok);
        break;
      }
      case "const":
        return this.parseLetOrConst(open, true);
      case "if":
        return this.parseIf(open);
      case "prop":
        return this.parseProp(open);
      case "call":
        return this.parseExplicitCall(open);
      case "function":
        return this.parseFunction(open);
      case "fn":
        return this.parseLambda(open);
      case "return":
        return this.parseReturn(open);
      case "while":
        return this.parseWhile(open);
      case "for":
        return this.parseFor(open);
      case "array":
        return this.parseArray(open);
      case "obj":
        return this.parseObject(open);
      case "assign":
        return this.parseAssign(open);
      case "index":
        return this.parseIndex(open);
      case "new":
        return this.parseNew(open);
      case "class":
        return this.parseClass(open);
      case "type-assert":
        return this.parseTypeAssert(open);
      case "type-alias":
        return this.parseTypeAlias(open) as unknown as Expr;
      case "import":
      case "import-default":
      case "import-named":
      case "import-all":
        return this.parseImport(open, head) as unknown as Expr;
      case "export":
      case "export-default":
        return this.parseExport(open, head) as unknown as Expr;
      case "throw":
        return this.parseThrow(open);
      case "try":
        return this.parseTryCatch(open);
      case "block":
        return this.parseBlock(open) as unknown as Expr;
      default:
        return this.parseImplicitCall(open, head);
    }
  }

  private parseProgramList(open: Token): Program {
    const body: Statement[] = [];
    while (!(this.current().kind === "punct" && this.current().value === ")")) {
      const form = this.parseSexpr() as Expr | BlockStmt | ImportStmt | ExportStmt | LetExpr | TypeAliasStmt;
      if (form.kind === "block" || form.kind === "let" || form.kind === "type-alias") {
        body.push(form);
      } else if (form.kind === "import" || form.kind === "export") {
        body.push(form);
      } else {
        if (form.kind === "function") {
          (form as FunctionExpr).isDeclaration = true;
        }
        body.push({
          kind: "exprStmt",
          expr: form,
          location: form.location
        } as ExprStmt);
      }
    }
    const close = this.advance();
    return {
      kind: "program",
      body,
      location: {
        file: this.file,
        start: open.location.start,
        end: close.location.end,
        line: open.location.line,
        column: open.location.column
      }
    };
  }

  private parseLetOrConst(open: Token, isConst: boolean): LetExpr {
    const bindings: LetBinding[] = [];

    const bindingsListOpen = this.current();
    if (!(bindingsListOpen.kind === "punct" && bindingsListOpen.value === "(")) {
      this.error("Expected binding list after let/const", bindingsListOpen);
    }
    this.advance();

    while (!(this.current().kind === "punct" && this.current().value === ")")) {
      const bindingOpen = this.current();
      if (!(bindingOpen.kind === "punct" && bindingOpen.value === "(")) {
        this.error("Expected (name expr) binding", bindingOpen);
      }
      this.advance();

      const nameTok = this.current();
      if (nameTok.kind !== "identifier") {
        this.error("Expected identifier in binding", nameTok);
      }
      this.advance();

      const init = this.parseSexpr();

      const bindingClose = this.current();
      if (!(bindingClose.kind === "punct" && bindingClose.value === ")")) {
        this.error("Expected ) to close binding", bindingClose);
      }
      this.advance();

      bindings.push({
        name: {
          kind: "identifier",
          name: nameTok.value as string,
          location: nameTok.location
        },
        init
      });
    }

    this.advance();

    const body: Expr[] = [];
    while (!(this.current().kind === "punct" && this.current().value === ")")) {
      body.push(this.parseSexpr());
    }

    const close = this.advance();

    return {
      kind: "let",
      isConst,
      bindings,
      body,
      location: {
        file: this.file,
        start: open.location.start,
        end: close.location.end,
        line: open.location.line,
        column: open.location.column
      }
    };
  }

  private parseIf(open: Token): IfExpr {
    const condition = this.parseSexpr();
    const thenBranch = this.parseSexpr();
    
    // Check if there's an else branch (not at closing paren)
    let elseBranch: Expr | null = null;
    if (!(this.current().kind === "punct" && this.current().value === ")")) {
      elseBranch = this.parseSexpr();
    }
    
    const close = this.advance();
    
    return {
      kind: "if",
      condition,
      thenBranch,
      elseBranch,
      location: {
        file: this.file,
        start: open.location.start,
        end: close.location.end,
        line: open.location.line,
        column: open.location.column
      }
    };
  }

  private parseProp(open: Token): PropExpr {
    const object = this.parseSexpr();
    
    const propertyTok = this.current();
    if (propertyTok.kind !== "string") {
      this.error("Expected string for property name in (prop obj \"field\")", propertyTok);
    }
    this.advance();
    
    const close = this.advance();
    
    return {
      kind: "prop",
      object,
      property: propertyTok.value as string,
      location: {
        file: this.file,
        start: open.location.start,
        end: close.location.end,
        line: open.location.line,
        column: open.location.column
      }
    };
  }

  private parseFunction(open: Token): FunctionExpr {
    // (function name (params) body...)
    const nameTok = this.current();
    if (nameTok.kind !== "identifier") {
      this.error("Expected function name", nameTok);
    }
    this.advance();
    
    const name: Identifier = {
      kind: "identifier",
      name: nameTok.value as string,
      location: nameTok.location
    };
    
    const params = this.parseParamList();
    const body = this.parseBodyUntilClose();
    const close = this.advance();
    
    return {
      kind: "function",
      name,
      params,
      body,
      isDeclaration: false,
      location: {
        file: this.file,
        start: open.location.start,
        end: close.location.end,
        line: open.location.line,
        column: open.location.column
      }
    };
  }

  private parseLambda(open: Token): FunctionExpr {
    // (fn (params) body...) - anonymous function
    const params = this.parseParamList();
    const body = this.parseBodyUntilClose();
    const close = this.advance();
    
    return {
      kind: "function",
      name: null,
      params,
      body,
      isDeclaration: false,
      location: {
        file: this.file,
        start: open.location.start,
        end: close.location.end,
        line: open.location.line,
        column: open.location.column
      }
    };
  }

  private parseParamList(): Identifier[] {
    const params: Identifier[] = [];
    
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
  }

  private parseBodyUntilClose(): Expr[] {
    const body: Expr[] = [];
    while (!(this.current().kind === "punct" && this.current().value === ")")) {
      body.push(this.parseSexpr());
    }
    return body;
  }

  private parseReturn(open: Token): ReturnExpr {
    // (return) or (return expr)
    let value: Expr | null = null;
    
    if (!(this.current().kind === "punct" && this.current().value === ")")) {
      value = this.parseSexpr();
    }
    
    const close = this.advance();
    
    return {
      kind: "return",
      value,
      location: {
        file: this.file,
        start: open.location.start,
        end: close.location.end,
        line: open.location.line,
        column: open.location.column
      }
    };
  }

  private parseWhile(open: Token): WhileExpr {
    // (while condition body...)
    const condition = this.parseSexpr();
    const body = this.parseBodyUntilClose();
    const close = this.advance();
    
    return {
      kind: "while",
      condition,
      body,
      location: {
        file: this.file,
        start: open.location.start,
        end: close.location.end,
        line: open.location.line,
        column: open.location.column
      }
    };
  }

  private parseArray(open: Token): ArrayExpr {
    // (array elem1 elem2 ...)
    const elements: Expr[] = [];
    while (!(this.current().kind === "punct" && this.current().value === ")")) {
      elements.push(this.parseSexpr());
    }
    const close = this.advance();
    
    return {
      kind: "array",
      elements,
      location: {
        file: this.file,
        start: open.location.start,
        end: close.location.end,
        line: open.location.line,
        column: open.location.column
      }
    };
  }

  private parseObject(open: Token): ObjectExpr {
    // (obj (field "key" value) ...)
    const fields: ObjectField[] = [];
    
    while (!(this.current().kind === "punct" && this.current().value === ")")) {
      const fieldOpen = this.current();
      if (!(fieldOpen.kind === "punct" && fieldOpen.value === "(")) {
        this.error("Expected (field \"key\" value) in object", fieldOpen);
      }
      this.advance();
      
      const fieldKeyword = this.current();
      if (fieldKeyword.kind !== "identifier" || fieldKeyword.value !== "field") {
        this.error("Expected 'field' keyword in object field", fieldKeyword);
      }
      this.advance();
      
      const keyTok = this.current();
      if (keyTok.kind !== "string") {
        this.error("Expected string key in object field", keyTok);
      }
      this.advance();
      
      const value = this.parseSexpr();
      
      const fieldClose = this.current();
      if (!(fieldClose.kind === "punct" && fieldClose.value === ")")) {
        this.error("Expected ) to close field", fieldClose);
      }
      this.advance();
      
      fields.push({
        key: keyTok.value as string,
        value
      });
    }
    
    const close = this.advance();
    
    return {
      kind: "object",
      fields,
      location: {
        file: this.file,
        start: open.location.start,
        end: close.location.end,
        line: open.location.line,
        column: open.location.column
      }
    };
  }

  private parseAssign(open: Token): AssignExpr {
    const target = this.parseSexpr();
    const value = this.parseSexpr();
    const close = this.advance();
    
    return {
      kind: "assign",
      target,
      value,
      location: {
        file: this.file,
        start: open.location.start,
        end: close.location.end,
        line: open.location.line,
        column: open.location.column
      }
    };
  }

  private parseFor(open: Token): ForExpr {
    // (for init? condition? update? body...)
    // Use _ or null for empty slots
    const initExpr = this.parseSexpr();
    const condExpr = this.parseSexpr();
    const updateExpr = this.parseSexpr();
    
    const init = this.isNullPlaceholder(initExpr) ? null : initExpr;
    const condition = this.isNullPlaceholder(condExpr) ? null : condExpr;
    const update = this.isNullPlaceholder(updateExpr) ? null : updateExpr;
    
    const body = this.parseBodyUntilClose();
    const close = this.advance();
    
    return {
      kind: "for",
      init,
      condition,
      update,
      body,
      location: {
        file: this.file,
        start: open.location.start,
        end: close.location.end,
        line: open.location.line,
        column: open.location.column
      }
    };
  }

  private isNullPlaceholder(expr: Expr): boolean {
    if (expr.kind === "identifier" && (expr as Identifier).name === "_") {
      return true;
    }
    if (expr.kind === "literal" && (expr as LiteralExpr).value === null) {
      return true;
    }
    return false;
  }

  private parseIndex(open: Token): IndexExpr {
    const object = this.parseSexpr();
    const index = this.parseSexpr();
    const close = this.advance();
    
    return {
      kind: "index",
      object,
      index,
      location: {
        file: this.file,
        start: open.location.start,
        end: close.location.end,
        line: open.location.line,
        column: open.location.column
      }
    };
  }

  private parseNew(open: Token): NewExpr {
    const callee = this.parseSexpr();
    const args: Expr[] = [];
    while (!(this.current().kind === "punct" && this.current().value === ")")) {
      args.push(this.parseSexpr());
    }
    const close = this.advance();
    
    return {
      kind: "new",
      callee,
      args,
      location: {
        file: this.file,
        start: open.location.start,
        end: close.location.end,
        line: open.location.line,
        column: open.location.column
      }
    };
  }

  private parseClass(open: Token): ClassExpr {
    // (class Name superclass? (field ...) (method ...) ...)
    const nameTok = this.current();
    if (nameTok.kind !== "identifier") {
      this.error("Expected class name", nameTok);
    }
    this.advance();
    
    const name: Identifier = {
      kind: "identifier",
      name: nameTok.value as string,
      location: nameTok.location
    };
    
    // Check for optional superclass
    let superclass: Identifier | null = null;
    if (this.current().kind === "identifier" && 
        this.current().value !== "field" && 
        this.current().value !== "method" &&
        !(this.current().kind === "punct" && this.current().value === "(")) {
      const superTok = this.advance();
      superclass = {
        kind: "identifier",
        name: superTok.value as string,
        location: superTok.location
      };
    }
    
    const fields: ClassField[] = [];
    const methods: ClassMethod[] = [];
    
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
        const fieldNameTok = this.current();
        if (fieldNameTok.kind !== "string") {
          this.error("Expected field name as string", fieldNameTok);
        }
        this.advance();
        
        let initializer: Expr | null = null;
        if (!(this.current().kind === "punct" && this.current().value === ")")) {
          initializer = this.parseSexpr();
        }
        
        this.advance(); // )
        fields.push({ name: fieldNameTok.value as string, initializer });
      } else if (memberKind.value === "method") {
        const methodNameTok = this.current();
        if (methodNameTok.kind !== "string") {
          this.error("Expected method name as string", methodNameTok);
        }
        this.advance();
        
        const params = this.parseParamList();
        const body = this.parseBodyUntilClose();
        this.advance(); // )
        
        methods.push({
          name: methodNameTok.value as string,
          params,
          body
        });
      } else {
        this.error("Expected 'field' or 'method' in class body", memberKind);
      }
    }
    
    const close = this.advance();
    
    return {
      kind: "class",
      name,
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
  }

  private parseTypeAssert(open: Token): TypeAssertExpr {
    // (type-assert expr TYPE)
    // TYPE may be a string (legacy) or a structured type form like (type-array ...)
    const expr = this.parseSexpr();

    const typeNode = this.parseTypeSexprOrLiteral();

    const close = this.advance();

    return {
      kind: "type-assert",
      expr,
      typeAnnotation: typeNode,
      location: {
        file: this.file,
        start: open.location.start,
        end: close.location.end,
        line: open.location.line,
        column: open.location.column
      }
    };
  }

  private parseTypeAlias(open: Token): TypeAliasStmt {
    // (type-alias Name TYPE)
    const nameTok = this.current();
    if (nameTok.kind !== "identifier") {
      this.error("Expected type alias name", nameTok);
    }
    this.advance();

    const typeNode = this.parseTypeSexprOrLiteral();

    const close = this.current();
    if (!(close.kind === "punct" && close.value === ")")) {
      this.error("Expected ) to close type-alias", close);
    }
    this.advance();

    return {
      kind: "type-alias",
      name: {
        kind: "identifier",
        name: nameTok.value as string,
        location: nameTok.location
      },
      typeAnnotation: typeNode,
      location: {
        file: this.file,
        start: open.location.start,
        end: close.location.end,
        line: open.location.line,
        column: open.location.column
      }
    };
  }

  private parseTypeLiteralValue(): string | number | boolean | null | "undefined" {
    const tok = this.current();
    if (tok.kind === "number") {
      this.advance();
      return tok.value as number;
    }
    if (tok.kind === "string") {
      this.advance();
      return tok.value as string;
    }
    if (tok.kind === "identifier") {
      const name = tok.value as string;
      if (name === "true") {
        this.advance();
        return true;
      }
      if (name === "false") {
        this.advance();
        return false;
      }
      if (name === "null") {
        this.advance();
        return null;
      }
      if (name === "undefined") {
        this.advance();
        return "undefined";
      }
    }
    this.error("Expected literal value for type-literal", tok);
  }

  // Parse a type which can be either a structured sexpr or a string literal
  // Returns a minimal TypeNode compatible with the new AST types.
  private parseTypeSexprOrLiteral(): TypeNode {
    const tok = this.current();
    if (tok.kind === "string") {
      // legacy: "number" -> TypeRef
      this.advance();
      return {
        kind: "type-ref",
        name: tok.value as string,
        location: tok.location
      };
    }

    if (tok.kind === "punct" && tok.value === "(") {
      // structured type form
      const open = this.advance();
      const headTok = this.current();
      if (headTok.kind !== "identifier") {
        this.error("Type form must start with an identifier", headTok);
      }
      const head = headTok.value as string;
      this.advance();

      switch (head) {
        case "type-array": {
          const element = this.parseTypeSexprOrLiteral();
          const close = this.current();
          if (!(close.kind === "punct" && close.value === ")")) {
            this.error("Expected ) to close type-array", close);
          }
          this.advance();
          return {
            kind: "type-array",
            element,
            location: {
              file: this.file,
              start: open.location.start,
              end: close.location.end,
              line: open.location.line,
              column: open.location.column
            }
          };
        }
        case "type-ref": {
          const nameTok = this.current();
          if (nameTok.kind !== "string") {
            this.error("Expected string name in type-ref", nameTok);
          }
          this.advance();
          const close = this.current();
          if (!(close.kind === "punct" && close.value === ")")) {
            this.error("Expected ) to close type-ref", close);
          }
          this.advance();
          return {
            kind: "type-ref",
            name: nameTok.value as string,
            location: {
              file: this.file,
              start: open.location.start,
              end: close.location.end,
              line: open.location.line,
              column: open.location.column
            }
          };
        }
        case "type-number": {
          const close = this.current();
          if (!(close.kind === "punct" && close.value === ")")) {
            this.error("Expected ) to close type-number", close);
          }
          this.advance();
          return {
            kind: "type-number",
            location: {
              file: this.file,
              start: open.location.start,
              end: close.location.end,
              line: open.location.line,
              column: open.location.column
            }
          };
        }
        case "type-string": {
          const close = this.current();
          if (!(close.kind === "punct" && close.value === ")")) {
            this.error("Expected ) to close type-string", close);
          }
          this.advance();
          return {
            kind: "type-string",
            location: {
              file: this.file,
              start: open.location.start,
              end: close.location.end,
              line: open.location.line,
              column: open.location.column
            }
          };
        }
        case "type-boolean": {
          const close = this.current();
          if (!(close.kind === "punct" && close.value === ")")) {
            this.error("Expected ) to close type-boolean", close);
          }
          this.advance();
          return {
            kind: "type-boolean",
            location: {
              file: this.file,
              start: open.location.start,
              end: close.location.end,
              line: open.location.line,
              column: open.location.column
            }
          };
        }
        case "type-null": {
          const close = this.current();
          if (!(close.kind === "punct" && close.value === ")")) {
            this.error("Expected ) to close type-null", close);
          }
          this.advance();
          return {
            kind: "type-null",
            location: {
              file: this.file,
              start: open.location.start,
              end: close.location.end,
              line: open.location.line,
              column: open.location.column
            }
          };
        }
        case "type-undefined": {
          const close = this.current();
          if (!(close.kind === "punct" && close.value === ")")) {
            this.error("Expected ) to close type-undefined", close);
          }
          this.advance();
          return {
            kind: "type-undefined",
            location: {
              file: this.file,
              start: open.location.start,
              end: close.location.end,
              line: open.location.line,
              column: open.location.column
            }
          };
        }
        case "type-literal": {
          const value = this.parseTypeLiteralValue();
          const close = this.current();
          if (!(close.kind === "punct" && close.value === ")")) {
            this.error("Expected ) to close type-literal", close);
          }
          this.advance();
          return {
            kind: "type-literal",
            value,
            location: {
              file: this.file,
              start: open.location.start,
              end: close.location.end,
              line: open.location.line,
              column: open.location.column
            }
          };
        }
        case "type-object": {
          const fields: { name: string; type: TypeNode }[] = [];
          while (!(this.current().kind === "punct" && this.current().value === ")")) {
            const fieldOpen = this.current();
            if (!(fieldOpen.kind === "punct" && fieldOpen.value === "(")) {
              this.error("Expected (name type) field in type-object", fieldOpen);
            }
            this.advance();

            const nameTok = this.current();
            if (nameTok.kind !== "string" && nameTok.kind !== "identifier") {
              this.error("Expected field name in type-object", nameTok);
            }
            this.advance();
            const fieldType = this.parseTypeSexprOrLiteral();

            const fieldClose = this.current();
            if (!(fieldClose.kind === "punct" && fieldClose.value === ")")) {
              this.error("Expected ) to close type-object field", fieldClose);
            }
            this.advance();

            fields.push({
              name: nameTok.value as string,
              type: fieldType
            });
          }
          const close = this.advance(); // consume )
          return {
            kind: "type-object",
            fields,
            location: {
              file: this.file,
              start: open.location.start,
              end: close.location.end,
              line: open.location.line,
              column: open.location.column
            }
          };
        }
        case "type-function": {
          const paramsOpen = this.current();
          if (!(paramsOpen.kind === "punct" && paramsOpen.value === "(")) {
            this.error("Expected parameter type list in type-function", paramsOpen);
          }
          this.advance();
          const params: TypeNode[] = [];
          while (!(this.current().kind === "punct" && this.current().value === ")")) {
            params.push(this.parseTypeSexprOrLiteral());
          }
          this.advance(); // close params list

          const returns = this.parseTypeSexprOrLiteral();

          const close = this.current();
          if (!(close.kind === "punct" && close.value === ")")) {
            this.error("Expected ) to close type-function", close);
          }
          this.advance();

          return {
            kind: "type-function",
            params,
            returns,
            location: {
              file: this.file,
              start: open.location.start,
              end: close.location.end,
              line: open.location.line,
              column: open.location.column
            }
          };
        }
        case "type-union": {
          const types: TypeNode[] = [];
          while (!(this.current().kind === "punct" && this.current().value === ")")) {
            types.push(this.parseTypeSexprOrLiteral());
          }
          const close = this.advance(); // consume )
          return {
            kind: "type-union",
            types,
            location: {
              file: this.file,
              start: open.location.start,
              end: close.location.end,
              line: open.location.line,
              column: open.location.column
            }
          };
        }
        case "type-intersection": {
          const types: TypeNode[] = [];
          while (!(this.current().kind === "punct" && this.current().value === ")")) {
            types.push(this.parseTypeSexprOrLiteral());
          }
          const close = this.advance(); // consume )
          return {
            kind: "type-intersection",
            types,
            location: {
              file: this.file,
              start: open.location.start,
              end: close.location.end,
              line: open.location.line,
              column: open.location.column
            }
          };
        }
        default:
          this.error(`Unknown type form: ${head}`, headTok);
      }
    }

    this.error("Expected type (string or structured type)", tok);
  }

  private parseImport(open: Token, head: string): ImportStmt {
    // (import-default name "path")
    // (import-named (name1 name2 ...) "path")
    // (import-all alias "path")
    const importKind = head;

    let name: string | undefined;
    let names: string[] | undefined;
    let alias: string | undefined;

    if (importKind === "import-default") {
      const nameTok = this.current();
      if (nameTok.kind !== "identifier") {
        this.error("Expected identifier for import-default", nameTok);
      }
      name = nameTok.value as string;
      this.advance();
    } else if (importKind === "import-named") {
      const listTok = this.current();
      if (!(listTok.kind === "punct" && listTok.value === "(")) {
        this.error("Expected (name1 name2 ...) for import-named", listTok);
      }
      this.advance();
      names = [];
      while (!(this.current().kind === "punct" && this.current().value === ")")) {
        const nameTok = this.current();
        if (nameTok.kind !== "identifier") {
          this.error("Expected identifier in import-named list", nameTok);
        }
        names.push(nameTok.value as string);
        this.advance();
      }
      this.advance(); // )
    } else if (importKind === "import-all") {
      const aliasTok = this.current();
      if (aliasTok.kind !== "identifier") {
        this.error("Expected identifier for import-all", aliasTok);
      }
      alias = aliasTok.value as string;
      this.advance();
    } else {
      this.error("Unknown import kind", open);
    }

    const fromTok = this.current();
    if (fromTok.kind !== "string") {
      this.error("Expected module path as string", fromTok);
    }
    const from = fromTok.value as string;
    this.advance();

    const close = this.advance();

    return {
      kind: "import",
      importKind: importKind === "import-default" ? "default" : importKind === "import-named" ? "named" : "all",
      name,
      names,
      alias,
      from,
      location: {
        file: this.file,
        start: open.location.start,
        end: close.location.end,
        line: open.location.line,
        column: open.location.column
      }
    };
  }

  private parseExport(open: Token, head: string): ExportStmt {
    // (export name)
    // (export-default expr)
    if (head === "export-default") {
      const declaration = this.parseSexpr();
      const close = this.advance();
      return {
        kind: "export",
        exportKind: "default",
        declaration,
        location: {
          file: this.file,
          start: open.location.start,
          end: close.location.end,
          line: open.location.line,
          column: open.location.column
        }
      };
    } else {
      // (export name)
      const nameTok = this.current();
      if (nameTok.kind !== "identifier") {
        this.error("Expected identifier for export", nameTok);
      }
      const name = nameTok.value as string;
      this.advance();
      const close = this.advance();
      return {
        kind: "export",
        exportKind: "named",
        name,
        location: {
          file: this.file,
          start: open.location.start,
          end: close.location.end,
          line: open.location.line,
          column: open.location.column
        }
      };
    }
  }

  private parseThrow(open: Token): ThrowExpr {
    // (throw expr)
    const value = this.parseSexpr();
    const close = this.advance();
    
    return {
      kind: "throw",
      value,
      location: {
        file: this.file,
        start: open.location.start,
        end: close.location.end,
        line: open.location.line,
        column: open.location.column
      }
    };
  }

  private parseTryCatch(open: Token): TryCatchExpr {
    // (try (body...) (catch e (handler...)) (finally (cleanup...))?)
    const tryBody: Expr[] = [];
    let catchParam: Identifier | null = null;
    const catchBody: Expr[] = [];
    const finallyBody: Expr[] = [];
    
    // Parse try body until we hit (catch or (finally or )
    while (!(this.current().kind === "punct" && this.current().value === ")")) {
      const tok = this.current();
      if (tok.kind === "punct" && tok.value === "(") {
        // Peek ahead
        const nextTok = this.tokens[this.index + 1];
        if (nextTok && nextTok.kind === "identifier" && 
            (nextTok.value === "catch" || nextTok.value === "finally")) {
          break;
        }
      }
      tryBody.push(this.parseSexpr());
    }
    
    // Parse catch clause if present
    if (this.current().kind === "punct" && this.current().value === "(") {
      const nextTok = this.tokens[this.index + 1];
      if (nextTok && nextTok.kind === "identifier" && nextTok.value === "catch") {
        this.advance(); // (
        this.advance(); // catch
        
        const paramTok = this.current();
        if (paramTok.kind === "identifier") {
          catchParam = {
            kind: "identifier",
            name: paramTok.value as string,
            location: paramTok.location
          };
          this.advance();
        }
        
        while (!(this.current().kind === "punct" && this.current().value === ")")) {
          catchBody.push(this.parseSexpr());
        }
        this.advance(); // )
      }
    }
    
    // Parse finally clause if present
    if (this.current().kind === "punct" && this.current().value === "(") {
      const nextTok = this.tokens[this.index + 1];
      if (nextTok && nextTok.kind === "identifier" && nextTok.value === "finally") {
        this.advance(); // (
        this.advance(); // finally
        
        while (!(this.current().kind === "punct" && this.current().value === ")")) {
          finallyBody.push(this.parseSexpr());
        }
        this.advance(); // )
      }
    }
    
    const close = this.advance();
    
    return {
      kind: "try-catch",
      tryBody,
      catchParam,
      catchBody,
      finallyBody,
      location: {
        file: this.file,
        start: open.location.start,
        end: close.location.end,
        line: open.location.line,
        column: open.location.column
      }
    };
  }

  private parseBlock(open: Token): BlockStmt {
    const body: Expr[] = [];
    while (!(this.current().kind === "punct" && this.current().value === ")")) {
      body.push(this.parseSexpr());
    }
    const close = this.advance();
    return {
      kind: "block",
      body,
      location: {
        file: this.file,
        start: open.location.start,
        end: close.location.end,
        line: open.location.line,
        column: open.location.column
      }
    };
  }

  private parseExplicitCall(open: Token): CallExpr {
    const callee = this.parseSexpr();
    const args: Expr[] = [];
    while (!(this.current().kind === "punct" && this.current().value === ")")) {
      args.push(this.parseSexpr());
    }
    const close = this.advance();
    return {
      kind: "call",
      callee,
      args,
      location: {
        file: this.file,
        start: open.location.start,
        end: close.location.end,
        line: open.location.line,
        column: open.location.column
      }
    };
  }

  private parseImplicitCall(open: Token, head: string): CallExpr {
    const callee: Identifier = {
      kind: "identifier",
      name: head,
      location: this.tokens[this.index - 1].location
    };
    const args: Expr[] = [];
    while (!(this.current().kind === "punct" && this.current().value === ")")) {
      args.push(this.parseSexpr());
    }
    const close = this.advance();
    return {
      kind: "call",
      callee,
      args,
      location: {
        file: this.file,
        start: open.location.start,
        end: close.location.end,
        line: open.location.line,
        column: open.location.column
      }
    };
  }

  private parseAtom(): Expr {
    const tok = this.current();
    if (tok.kind === "identifier") {
      this.advance();
      const name = tok.value as string;
      
      // Check for boolean, null, undefined literals
      if (name === "true") {
        return {
          kind: "literal",
          value: true,
          location: tok.location
        } as LiteralExpr;
      }
      if (name === "false") {
        return {
          kind: "literal",
          value: false,
          location: tok.location
        } as LiteralExpr;
      }
      if (name === "null") {
        return {
          kind: "literal",
          value: null,
          location: tok.location
        } as LiteralExpr;
      }
      if (name === "undefined") {
        return {
          kind: "literal",
          value: "undefined",
          location: tok.location
        } as LiteralExpr;
      }
      
      return {
        kind: "identifier",
        name: name,
        location: tok.location
      };
    }
    if (tok.kind === "number" || tok.kind === "string") {
      this.advance();
      return {
        kind: "literal",
        value: tok.value,
        location: tok.location
      } as LiteralExpr;
    }
    this.error("Unexpected token in atom", tok);
  }
}
