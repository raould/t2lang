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
  PropExpr,
  FunctionExpr,
  GensymExpr,
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
  MacroDef,
  ImportStmt,
  ExportStmt,
  ThrowExpr,
  TryCatchExpr,
  BlockStmt,
  ExprStmt,
  Statement,
  QuoteExpr,
  UnquoteExpr,
  UnquoteSpliceExpr
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

  private parseSexpr(): Expr | BlockStmt | ImportStmt | ExportStmt | LetStarExpr | TypeAliasStmt | MacroDef | Program {
    const tok = this.current();
    if (tok.kind === "punct" && tok.value === "(") {
      return this.parseList();
    }
    return this.parseAtom();
  }

  private ensureExpr(node: Expr | BlockStmt | ImportStmt | ExportStmt | LetStarExpr | TypeAliasStmt | MacroDef | Program): Expr {
    // Disallow statement forms in expression positions
    if (node.kind === "type-alias" || node.kind === "import" || node.kind === "export" || node.kind === "defmacro" || node.kind === "program") {
      this.error("Expected expression but found statement", this.current());
    }
    return node as Expr;
  }

  private parseList(): Expr | BlockStmt | ImportStmt | ExportStmt | LetStarExpr | TypeAliasStmt | MacroDef | Program {
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
        const program = this.parseProgramList(open);
        this.inProgram = false;
        return program;
      }
      case "let*":
        return this.parseLetStarOrConst(open, false);
      case "let": {
        // Plain `let` is not supported in Phase0; require `let*` for sequential bindings
        this.error("'let' is deprecated in Phase0, use 'let*' for sequential bindings", headTok);
        break;
      }
      case "const":
        return this.parseLetStarOrConst(open, true);
      case "defmacro":
        return this.parseDefmacro(open);
      case "if":
        return this.parseIf(open);
      case "prop":
        return this.parseProp(open);
      case "call":
        return this.parseExplicitCall(open);
      case "function":
        return this.parseFunction(open);
      case "gensym":
        return this.parseGensym(open);
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
        return this.parseTypeAlias(open);
      case "import":
      case "import-default":
      case "import-named":
      case "import-all":
        return this.parseImport(open, head);
      case "export":
      case "export-default":
        return this.parseExport(open, head);
      case "throw":
        return this.parseThrow(open);
      case "try":
        return this.parseTryCatch(open);
      case "block":
        return this.parseBlock(open);
      case "quote":
        return this.parseQuote(open);
      case "unquote":
        return this.parseUnquote(open);
      case "unquote-splice":
        return this.parseUnquoteSplice(open);
      default:
        return this.parseImplicitCall(open, head);
    }
  }

  private parseProgramList(open: Token): Program {
    const body: Statement[] = [];
    while (!(this.current().kind === "punct" && this.current().value === ")")) {
      const form = this.parseSexpr();
      if (form.kind === "block" || form.kind === "let*" || form.kind === "type-alias" || form.kind === "defmacro") {
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

  private parseLetStarOrConst(open: Token, isConst: boolean): LetStarExpr {
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

      const init = this.ensureExpr(this.parseSexpr());

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
      body.push(this.ensureExpr(this.parseSexpr()));
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
    const condition = this.ensureExpr(this.parseSexpr());
    const thenBranch = this.ensureExpr(this.parseSexpr());

    // Check if there's an else branch (not at closing paren)
    let elseBranch: Expr | null = null;
    if (!(this.current().kind === "punct" && this.current().value === ")")) {
      elseBranch = this.ensureExpr(this.parseSexpr());
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
    const object = this.ensureExpr(this.parseSexpr());

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

  private parseGensym(open: Token): GensymExpr {
    // (gensym) or (gensym "prefix")
    let prefix: string | undefined;
    const tok = this.current();
    if (tok.kind === "string") {
      prefix = tok.value as string;
      this.advance();
    }
    const close = this.advance();
    if (!(close.kind === "punct" && close.value === ")")) {
      this.error("Expected ) to close gensym", close);
    }
    return {
      kind: "gensym",
      prefix,
      location: {
        file: this.file,
        start: open.location.start,
        end: close.location.end,
        line: open.location.line,
        column: open.location.column
      }
    };
  }

  private parseQuote(open: Token): QuoteExpr {
    // (quote expr)
    // In quote context, parse as raw S-expression (don't interpret special forms)
    const expr = this.parseQuotedSexpr() as Expr;
    const close = this.advance();
    if (!(close.kind === "punct" && close.value === ")")) {
      this.error("Expected ) to close quote", close);
    }
    return {
      kind: "quote",
      expr,
      location: {
        file: this.file,
        start: open.location.start,
        end: close.location.end,
        line: open.location.line,
        column: open.location.column
      }
    };
  }

  /**
   * Parse an S-expression in "quoted" context.
   * This parses S-expressions as raw structure without interpreting let*, if, etc.
   * Only recognizes unquote and unquote-splice as special.
   */
  private parseQuotedSexpr(): Expr {
    const tok = this.current();
    if (tok.kind === "punct" && tok.value === "(") {
      return this.parseQuotedList();
    }
    return this.parseAtom();
  }

  private parseQuotedList(): Expr {
    const open = this.advance();
    const headTok = this.current();

    // Check for close paren (empty list)
    if (headTok.kind === "punct" && headTok.value === ")") {
      const close = this.advance();
      // Empty list - represent as array
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

    // Parse as generic call with head as callee
    // This converts (let* ...) inside quote into a call-like structure
    const head = this.parseQuotedSexpr();
    const args: Expr[] = [];

    while (true) {
      const cur = this.current();
      if (cur.kind === "punct" && cur.value === ")") {
        break;
      }
      if (cur.kind === "eof") {
        this.error("Unexpected end of input in quoted list", cur);
      }
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
  }

  private parseUnquote(open: Token): UnquoteExpr {
    // (unquote expr)
    const expr = this.ensureExpr(this.parseSexpr());
    const close = this.advance();
    if (!(close.kind === "punct" && close.value === ")")) {
      this.error("Expected ) to close unquote", close);
    }
    return {
      kind: "unquote",
      expr,
      location: {
        file: this.file,
        start: open.location.start,
        end: close.location.end,
        line: open.location.line,
        column: open.location.column
      }
    };
  }

  private parseUnquoteSplice(open: Token): UnquoteSpliceExpr {
    // (unquote-splice expr)
    const expr = this.ensureExpr(this.parseSexpr());
    const close = this.advance();
    if (!(close.kind === "punct" && close.value === ")")) {
      this.error("Expected ) to close unquote-splice", close);
    }
    return {
      kind: "unquote-splice",
      expr,
      location: {
        file: this.file,
        start: open.location.start,
        end: close.location.end,
        line: open.location.line,
        column: open.location.column
      }
    };
  }

  private parseDefmacro(open: Token): MacroDef {
    // (defmacro name (params) body...)
    const nameTok = this.current();
    if (nameTok.kind !== "identifier") {
      this.error("Expected macro name", nameTok);
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
      kind: "defmacro",
      name,
      params,
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
      body.push(this.ensureExpr(this.parseSexpr()));
    }
    return body;
  }

  private parseReturn(open: Token): ReturnExpr {
    // (return) or (return expr)
    let value: Expr | null = null;

    if (!(this.current().kind === "punct" && this.current().value === ")")) {
      value = this.ensureExpr(this.parseSexpr());
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
    const condition = this.ensureExpr(this.parseSexpr());
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
      elements.push(this.ensureExpr(this.parseSexpr()));
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

      const value = this.ensureExpr(this.parseSexpr());

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
    const target = this.ensureExpr(this.parseSexpr());
    const value = this.ensureExpr(this.parseSexpr());
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
    const updateExpr = this.parseSexpr(); // these are allowed to be statement-like; we'll narrow below

    let init: Expr | null = null;
    if (!this.isNullPlaceholder(initExpr)) {
      init = this.ensureExpr(initExpr);
    }

    let condition: Expr | null = null;
    if (!this.isNullPlaceholder(condExpr)) {
      condition = this.ensureExpr(condExpr);
    }

    let update: Expr | null = null;
    if (!this.isNullPlaceholder(updateExpr)) {
      update = this.ensureExpr(updateExpr);
    }



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

  private isNullPlaceholder(expr: Expr | BlockStmt | ImportStmt | ExportStmt | LetStarExpr | TypeAliasStmt | MacroDef | Program): boolean {
    if (expr.kind === "identifier" && (expr as Identifier).name === "_") {
      return true;
    }
    if (expr.kind === "literal" && (expr as LiteralExpr).value === null) {
      return true;
    }
    return false;
  }

  private parseIndex(open: Token): IndexExpr {
    const object = this.ensureExpr(this.parseSexpr());
    const index = this.ensureExpr(this.parseSexpr());
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
    const callee = this.ensureExpr(this.parseSexpr());
    const args: Expr[] = [];
    while (!(this.current().kind === "punct" && this.current().value === ")")) {
      args.push(this.ensureExpr(this.parseSexpr()));
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
          initializer = this.ensureExpr(this.parseSexpr());
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
    const expr = this.ensureExpr(this.parseSexpr());

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
      const declaration = this.ensureExpr(this.parseSexpr());
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
    const value = this.ensureExpr(this.parseSexpr());
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
      tryBody.push(this.ensureExpr(this.parseSexpr()));
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
          catchBody.push(this.ensureExpr(this.parseSexpr()));
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
          finallyBody.push(this.ensureExpr(this.parseSexpr()));
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
      body.push(this.ensureExpr(this.parseSexpr()));
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
    const callee = this.ensureExpr(this.parseSexpr());
    const args: Expr[] = [];
    while (!(this.current().kind === "punct" && this.current().value === ")")) {
      args.push(this.ensureExpr(this.parseSexpr()));
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
      args.push(this.ensureExpr(this.parseSexpr()));
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
