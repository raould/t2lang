
import { Lexer, Token } from "./lexer.js";
import { CompilerContext } from "../api.js";
import { CompilerError } from "../errors/compilerError.js";
import {
  Program,
  Expr,
  Identifier,
  LiteralExpr,
  CallExpr,
  LetStarExpr,
  LetBinding,
  IfExpr,
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
  TypeAppExpr,
  TypeNode,
  TypeParam,
  TypeAliasStmt,
  ImportStmt,
  ExportStmt,
  ThrowExpr,
  TryCatchExpr,
  InterfaceExpr,
  InterfaceMethod,
  TypeAppType,
  TypeUnion,
  BlockStmt,
  ExprStmt,
  Statement,
  PropExpr,
  
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

  private parseProp(open: Token): PropExpr {
    const object = this.parseSexpr();

    const propertyTok = this.current();
    if (propertyTok.kind !== "string") {
      this.error("Expected string for property name in (prop obj \"field\")", propertyTok.location);
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

  private current(): Token {
    return this.tokens[this.index];
  }

  private advance(): Token {
    return this.tokens[this.index++];
  }

  private error(message: string, loc: any): never {
    const location = loc.location || loc;
    const err: CompilerError = {
      message,
      location,
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

    // If the list is empty '()', treat it as an empty array
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
      } as unknown as Expr;
    }

    if (headTok.kind !== "identifier") {
      // Debug info for odd non-identifier head cases
      console.error('parseList: unexpected non-identifier head', headTok, 'around tokens:', this.tokens.slice(Math.max(0, this.index - 3), this.index + 3));
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
        this.error("'let' is deprecated in Phase0, use 'let*' for sequential bindings", headTok.location);
        break;
      }
      case "const": {
        // Plain `const` is deprecated in Phase0; require `const*` for sequential bindings
        this.error("'const' is deprecated in Phase0, use 'const*' for sequential bindings", headTok.location);
        break;
      }
      case "const*":
        return this.parseLetOrConst(open, true);
      case "if":
        return this.parseIf(open);
      case "prop":
        return this.parseProp(open);
      case "call":
        return this.parseExplicitCall(open);
      case "function": {
        // `function` head is deprecated/unsupported in Phase0; require `fn` instead
        this.error("'function' is not supported; use 'fn' instead", headTok);
      }
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
      case "interface":
        return this.parseInterface(open);
      case "type-assert":
        return this.parseTypeAssert(open);
      case "type-app":
        return this.parseTypeApp(open);
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
    while (this.current().kind !== "eof" && !(this.current().kind === "punct" && this.current().value === ")")) {
      const form = this.parseSexpr() as Expr | BlockStmt | ImportStmt | ExportStmt | LetStarExpr | TypeAliasStmt;
      if (form.kind === "block" || form.kind === "let*" || form.kind === "type-alias") {
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

  private parseLetOrConst(open: Token, isConst: boolean): LetStarExpr {
    const bindings: LetBinding[] = [];

    const bindingsListOpen = this.current();
    if (!(bindingsListOpen.kind === "punct" && bindingsListOpen.value === "(")) {
      this.error("Expected binding list after let/const", bindingsListOpen);
    }
    this.advance();

    while (!(this.current().kind === "punct" && this.current().value === ")")) {
      const bindingOpen = this.current();

      // Allow splice placeholders to appear directly as items in the bindings list
      // e.g., (let* (unquote-splice wl) body...) or if the splice is parenthesized
      // it may appear as ((unquote-splice wl)). In either case accept and consume it.
      if (bindingOpen.kind === "identifier" && (bindingOpen.value as string) === "unquote-splice") {
        // Debug: show we saw a direct splice item in binding list
        console.error('parseLetOrConst: saw direct unquote-splice at', bindingOpen);

        this.advance(); // consume 'unquote-splice'
        // Parse inner expression (the thing to splice) and ignore result
        this.parseSexpr();
        // Continue to next binding item
        continue;
      }

      if (!(bindingOpen.kind === "punct" && bindingOpen.value === "(")) {
        this.error("Expected (name expr) binding", bindingOpen);
      }
      this.advance();

      const nameTok = this.current();

      // Support splice inside an individual binding list entry: ((unquote-splice ...))
      if (nameTok.kind === "identifier" && (nameTok.value as string) === "unquote-splice") {
        // Parse the splice expression and ignore it as a binding placeholder.
        this.advance(); // consume 'unquote-splice'
        // Parse the inner expression of the splice
        this.parseSexpr();
        const bindingCloseSplice = this.current();
        if (!(bindingCloseSplice.kind === "punct" && bindingCloseSplice.value === ")")) {
          this.error("Expected ) to close binding splice", bindingCloseSplice);
        }
        this.advance();
        // Skip adding any binding for a splice
        continue;
      }

      // Support typed-name binding form: ((name TYPE) init)
      if (nameTok.kind === "punct" && nameTok.value === "(") {
        // consume inner '('
        this.advance();
        const innerNameTok = this.current();
        if (innerNameTok.kind !== "identifier") {
          this.error("Expected identifier in typed binding", innerNameTok);
        }
        this.advance();

        // parse type expression (sexpr or literal)
        const typeNode = this.parseTypeSexprOrLiteral();

        const innerClose = this.current();
        if (!(innerClose.kind === "punct" && innerClose.value === ")")) {
          this.error("Expected ) to close typed-name", innerClose);
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
            name: innerNameTok.value as string,
            location: innerNameTok.location,
            typeAnnotation: typeNode
          },
          init
        });
        continue;
      }

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
      kind: "let*",
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



  // `function` head removed; use `fn` instead. parseFunction removed.

  private parseLambda(open: Token): FunctionExpr {
    // (fn name? (params) body...) - named or anonymous function
    // If the first item is an identifier and the next token is a '(' then
    // treat it as a named function: (fn name (params) ...)
    let name: Identifier | null = null;
    const firstTok = this.current();
    if (firstTok.kind === "identifier") {
      const nextTok = this.tokens[this.index + 1];
      if (nextTok && nextTok.kind === "punct" && nextTok.value === "(") {
        // consume name
        this.advance();
        name = {
          kind: "identifier",
          name: firstTok.value as string,
          location: firstTok.location
        };
      }
    }

    // Parse optional typeparams
    let typeparams: TypeParam[] = [];
    if (this.current().kind === "punct" && this.current().value === "(") {
      const peek = this.tokens[this.index + 1];
      if (peek && peek.kind === "identifier" && peek.value === "typeparams") {
        typeparams = this.parseTypeParams();
      }
    }

    const params = this.parseParamList();
    // Optional inline return type annotation for lambdas.
    // Phase0 prefers plain sexpr form: (returns TYPE) or (-> TYPE)
    let returnType: TypeNode | null = null;
    const maybe = this.current();
    if (maybe.kind === "punct" && maybe.value === "(") {
      // Peek into the sexpr head
      const headTok = this.tokens[this.index + 1];
      if (headTok && headTok.kind === "identifier") {
        const head = headTok.value as string;
        // Accept only explicit 'returns' or arrow '->' forms as return-type
        // annotations. Do NOT treat '(return ...)' as a type annotation since
        // '(return ...)' is a valid return expression in function bodies.
        if (head === "returns" || head === "->") {
          // consume '(' and head
          this.advance();
          this.advance();
          returnType = this.parseTypeSexprOrLiteral();
          const close = this.current();
          if (!(close.kind === "punct" && close.value === ")")) {
            this.error("Expected ) to close returns form", close);
          }
          this.advance();
        }
      }
    } else if (maybe.kind === "identifier" && maybe.value === ":") {
      // Backward-compatible colon sugar: : TYPE
      this.advance();
      returnType = this.parseTypeSexprOrLiteral();
    }
    const body = this.parseBodyUntilClose();
    const close = this.advance();

    return {
      kind: "function",
      name,
      typeparams,
      params,
      returnType,
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
      const tok = this.current();
      if (tok.kind === "identifier") {
        // simple param name
        this.advance();
        params.push({ kind: "identifier", name: tok.value as string, location: tok.location });
        continue;
      }

      // typed parameter in plain sexpr form: (name TYPE) or (name : TYPE)
      if (tok.kind === "punct" && tok.value === "(") {
        this.advance();
        const nameTok = this.current();
        if (nameTok.kind !== "identifier") {
          this.error("Expected parameter name inside param sexpr", nameTok);
        }
        this.advance();

        // Optional colon separator (legacy sugar) — accept but prefer plain sexpr
        if (this.current().kind === "identifier" && this.current().value === ":") {
          this.advance();
        }

        // If next token closes the paren, treat as untyped param
        if (this.current().kind === "punct" && this.current().value === ")") {
          // consume close
          this.advance();
          params.push({ kind: "identifier", name: nameTok.value as string, location: nameTok.location });
          continue;
        }

        const typeNode = this.parseTypeSexprOrLiteral();

        const paramClose = this.current();
        if (!(paramClose.kind === "punct" && paramClose.value === ")")) {
          this.error("Expected ) to close typed parameter", paramClose);
        }
        this.advance();

        params.push({ kind: "identifier", name: nameTok.value as string, location: nameTok.location, typeAnnotation: typeNode });
        continue;
      }

      this.error("Expected parameter name or typed param sexpr", tok);
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

    // Parse optional typeparams
    let typeparams: TypeParam[] = [];
    if (this.current().kind === "punct" && this.current().value === "(") {
      const peek = this.tokens[this.index + 1];
      if (peek && peek.kind === "identifier" && peek.value === "typeparams") {
        typeparams = this.parseTypeParams();
      }
    }

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
            access = mod as "public" | "protected" | "private";
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

        let initializer: Expr | null = null;
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

          const params = this.parseParamList();

          // Optional return type annotation: support (returns TYPE) or colon sugar ': TYPE'
          let returnType: TypeNode | null = null;
          const maybe = this.current();
          if (maybe.kind === "punct" && maybe.value === "(") {
            const peek = this.tokens[this.index + 1];
            if (peek && peek.kind === "identifier") {
              const head = peek.value as string;
              if (head === "returns" || head === "->") {
                // consume '(' and head
                this.advance();
                this.advance();
                returnType = this.parseTypeSexprOrLiteral();
                const closeRt = this.current();
                if (!(closeRt.kind === "punct" && closeRt.value === ")")) {
                  this.error("Expected ) to close returns form", closeRt);
                }
                this.advance();
              }
            }
          } else if (maybe.kind === "identifier" && maybe.value === ":") {
            // colon sugar
            this.advance();
            returnType = this.parseTypeSexprOrLiteral();
          }

          const body = this.parseBodyUntilClose();
          this.advance(); // )

          methods.push({
            name: methodNameTok.value as string,
            params,
            body,
            returnType
          });
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
  }

  private parseInterface(open: Token): InterfaceExpr {
    // (interface Name typeparams? (method "name" params returnType) ...)
    const nameTok = this.current();
    if (nameTok.kind !== "identifier") {
      this.error("Expected interface name", nameTok);
    }
    this.advance();

    const name: Identifier = {
      kind: "identifier",
      name: nameTok.value as string,
      location: nameTok.location
    };

    // Parse optional typeparams
    let typeparams: TypeParam[] = [];
    if (this.current().kind === "punct" && this.current().value === "(") {
      const peek = this.tokens[this.index + 1];
      if (peek && peek.kind === "identifier" && peek.value === "typeparams") {
        typeparams = this.parseTypeParams();
      }
    }

    const methods: InterfaceMethod[] = [];

    while (!(this.current().kind === "punct" && this.current().value === ")")) {
      const methodOpen = this.current();
      if (!(methodOpen.kind === "punct" && methodOpen.value === "(")) {
        this.error("Expected (method ...) in interface", methodOpen);
      }
      this.advance();

      const methodKind = this.current();
      if (methodKind.kind !== "identifier" || methodKind.value !== "method") {
        this.error("Expected 'method' in interface", methodKind);
      }
      this.advance();

      const methodNameTok = this.current();
      if (methodNameTok.kind !== "string") {
        this.error("Expected method name as string", methodNameTok);
      }
      this.advance();

      // Parse params as type list
      const paramsOpen = this.current();
      if (!(paramsOpen.kind === "punct" && paramsOpen.value === "(")) {
        this.error("Expected params list", paramsOpen);
      }
      this.advance();
      const params: TypeNode[] = [];
      while (!(this.current().kind === "punct" && this.current().value === ")")) {
        params.push(this.parseTypeSexprOrLiteral());
      }
      this.advance(); // )

      const returns = this.parseTypeSexprOrLiteral();

      const methodClose = this.current();
      if (!(methodClose.kind === "punct" && methodClose.value === ")")) {
        this.error("Expected ) to close method", methodClose);
      }
      this.advance();

      methods.push({
        name: methodNameTok.value as string,
        params,
        returns
      });
    }

    const close = this.advance();

    return {
      kind: "interface",
      name,
      typeparams,
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

  private parseTypeApp(open: Token): TypeAppExpr {
    // (type-app expr type-sform+)
    const expr = this.parseSexpr();
    const typeArgs: TypeNode[] = [];
    while (!(this.current().kind === "punct" && this.current().value === ")")) {
      typeArgs.push(this.parseTypeSexprOrLiteral());
    }
    const close = this.advance();
    return {
      kind: "type-app",
      expr,
      typeArgs,
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
    // (type-alias Name [typeparams] TYPE)
    const nameTok = this.current();
    if (nameTok.kind !== "identifier") {
      this.error("Expected type alias name", nameTok);
    }
    this.advance();

    const name: Identifier = {
      kind: "identifier",
      name: nameTok.value as string,
      location: nameTok.location
    };

    // Parse optional typeparams
    let typeparams: TypeParam[] = [];
    if (this.current().kind === "punct" && this.current().value === "(") {
      const peek = this.tokens[this.index + 1];
      if (peek && peek.kind === "identifier" && peek.value === "typeparams") {
        typeparams = this.parseTypeParams();
      }
    }

    const typeNode = this.parseTypeSexprOrLiteral();

    const close = this.current();
    if (!(close.kind === "punct" && close.value === ")")) {
      this.error("Expected ) to close type-alias", close);
    }
    this.advance();

    return {
      kind: "type-alias",
      name,
      typeparams,
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

  private parseTypeParams(): TypeParam[] {
    const typeparams: TypeParam[] = [];
    const open = this.current();
    if (!(open.kind === "punct" && open.value === "(")) {
      this.error("Expected typeparams list", open);
    }
    this.advance();
    const head = this.current();
    if (!(head.kind === "identifier" && head.value === "typeparams")) {
      this.error("Expected 'typeparams' keyword", head);
    }
    this.advance();
    while (!(this.current().kind === "punct" && this.current().value === ")")) {
      typeparams.push(this.parseTypeParam());
    }
    this.advance(); // consume )
    // Check for duplicate names
    const names = new Set<string>();
    for (const tp of typeparams) {
      if (names.has(tp.name.name)) {
        this.error(`Duplicate type parameter name '${tp.name.name}'`, tp.name.location);
      }
      names.add(tp.name.name);
    }
    return typeparams;
  }

  private parseTypeParam(): TypeParam {
    const open = this.current();
    if (!(open.kind === "punct" && open.value === "(")) {
      this.error("Expected typeparam sexpr", open);
    }
    this.advance();
    const nameTok = this.current();
    if (nameTok.kind !== "identifier") {
      this.error("Expected typeparam name", nameTok);
    }
    this.advance();
    const name: Identifier = {
      kind: "identifier",
      name: nameTok.value as string,
      location: nameTok.location
    };
    let constraint: TypeNode | null = null;
    let defaultType: TypeNode | null = null;
    // Check for (extends ...)
    if (this.current().kind === "punct" && this.current().value === "(") {
      const peek = this.tokens[this.index + 1];
      if (peek && peek.kind === "identifier" && peek.value === "extends") {
        this.advance(); // (
        this.advance(); // extends
        constraint = this.parseTypeSexprOrLiteral();
        const close = this.current();
        if (!(close.kind === "punct" && close.value === ")")) {
          this.error("Expected ) to close extends", close);
        }
        this.advance();
      }
    }
    // Check for (default ...)
    if (this.current().kind === "punct" && this.current().value === "(") {
      const peek = this.tokens[this.index + 1];
      if (peek && peek.kind === "identifier" && peek.value === "default") {
        this.advance(); // (
        this.advance(); // default
        defaultType = this.parseTypeSexprOrLiteral();
        const close = this.current();
        if (!(close.kind === "punct" && close.value === ")")) {
          this.error("Expected ) to close default", close);
        }
        this.advance();
      }
    }
    const close = this.current();
    if (!(close.kind === "punct" && close.value === ")")) {
      this.error("Expected ) to close typeparam", close);
    }
    this.advance();
    return {
      kind: "type-param",
      name,
      constraint,
      defaultType,
      location: {
        file: this.file,
        start: open.location.start,
        end: close.location.end,
        line: open.location.line,
        column: open.location.column
      }
    };
  }

  // Parse a type which can be either a structured sexpr or a string literal
  // Returns a minimal TypeNode compatible with the new AST types.
  private parseTypeSexprOrLiteral(): TypeNode {
    const tok = this.current();
    if (tok.kind === "string") {
      // legacy: "string" -> TypeRef
      this.advance();
      return {
        kind: "type-ref",
        name: tok.value as string,
        location: tok.location
      };
    }
    if (tok.kind === "number") {
      this.advance();
      return {
        kind: "type-ref",
        name: tok.value as string,
        location: tok.location
      };
    }
    if (tok.kind === "identifier") {
      // Accept bare identifier as a type-ref (sugar for (type-ref "Name"))
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

            // Allow optional colon separator syntax: ("key" : Type) or ("key": Type)
            const maybeColon = this.current();
            if (maybeColon.kind === "identifier" && maybeColon.value === ":") {
              this.advance();
            }

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
        case "type-app": {
          const expr = this.parseTypeSexprOrLiteral();
          const typeArgs: TypeNode[] = [];
          while (!(this.current().kind === "punct" && this.current().value === ")")) {
            typeArgs.push(this.parseTypeSexprOrLiteral());
          }
          const close = this.advance(); // consume )
          return {
            kind: "type-app",
            expr,
            typeArgs,
            location: {
              file: this.file,
              start: open.location.start,
              end: close.location.end,
              line: open.location.line,
              column: open.location.column
            }
          } as TypeAppType;
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
          } as TypeUnion;
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
