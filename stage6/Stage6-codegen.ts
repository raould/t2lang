import { formatSpan } from "./Stage6-spans";
const indent  = (text) => {
  return text.split("\n").map((line) => {
    return ("  " + line);
  }).join("\n");
};
const isDefined  = (val) => {
  return (val !== undefined);
};
const isValidId  = (key) => {
  return new RegExp("^[a-zA-Z_$][a-zA-Z0-9_$]*$").test(key);
};
const emitProgram  = (node) => {
  return node.body.map(emitTopLevel).join("\n");
};
const emitTopLevel  = (node) => {
  if ((node.tag === "macro-def")) {
    return ("// macro: " + node.name);
  }
  if ((node.tag === "macro-time-fn-def")) {
    return ("// #[macro-time] fn: " + node.name);
  }
  return emitStmt(node);
};
const emitStmt  = (stmt) => {
  if ((stmt.tag === "type-alias")) {
    {
      let tparams  = ((stmt.typeParams && (stmt.typeParams.length > 0)) ? (("<" + stmt.typeParams.map(emitTypeParamDecl).join(", ")) + ">") : " ");
      let ty  = emitTypeExpr(stmt.type);
      return ((((("type " + stmt.name) + tparams) + " = ") + ty) + ";");
    }
  }
  if ((stmt.tag === "interface-def")) {
    {
      let tparams  = ((stmt.typeParams && (stmt.typeParams.length > 0)) ? (("<" + stmt.typeParams.map(emitTypeParamDecl).join(", ")) + ">") : " ");
      let extendsStr  = ((stmt.extends.length > 0) ? (" extends " + stmt.extends.map(emitTypeExpr).join(", ")) : "");
      let body  = emitTypeExpr(stmt.body);
      return ((((("interface " + stmt.name) + tparams) + extendsStr) + " ") + body);
    }
  }
  if ((stmt.tag === "class-def")) {
    return emitClassDef(stmt);
  }
  if ((stmt.tag === "anon-class-def")) {
    return emitAnonClassDef(stmt);
  }
  if ((stmt.tag === "let-stmt")) {
    {
      let typeStr  = (stmt.typeAnnotation ? (": " + emitTypeExpr(stmt.typeAnnotation)) : " ");
      if (isDefined(stmt.init)) {
        return ((((("let " + stmt.name) + typeStr) + " = ") + emitExpr(stmt.init)) + ";");
      }
      else {
        return ((("let " + stmt.name) + typeStr) + ";");
      }
    }
  }
  if ((stmt.tag === "const-stmt")) {
    {
      let typeStr  = (stmt.typeAnnotation ? (": " + emitTypeExpr(stmt.typeAnnotation)) : " ");
      if (isDefined(stmt.init)) {
        return ((((("const " + stmt.name) + typeStr) + " = ") + emitExpr(stmt.init)) + ";");
      }
      else {
        return ((("const " + stmt.name) + typeStr) + ";");
      }
    }
  }
  if ((stmt.tag === "if-stmt")) {
    return emitIf(stmt);
  }
  if ((stmt.tag === "while-stmt")) {
    return emitWhile(stmt);
  }
  if ((stmt.tag === "block-stmt")) {
    return emitBlock(stmt);
  }
  if ((stmt.tag === "assign-stmt")) {
    return (((stmt.name + " = ") + emitExpr(stmt.value)) + ";");
  }
  if ((stmt.tag === "assign-prop-stmt")) {
    return (((emitExpr(stmt.target) + " = ") + emitExpr(stmt.value)) + ";");
  }
  if ((stmt.tag === "return-stmt")) {
    if (stmt.expr) {
      return (("return " + emitExpr(stmt.expr)) + ";");
    }
    else {
      return "return;";
    }
  }
  if ((stmt.tag === "throw-stmt")) {
    return (("throw " + emitExpr(stmt.expr)) + ";");
  }
  if ((stmt.tag === "import-stmt")) {
    return emitImport(stmt);
  }
  if ((stmt.tag === "export-binding-stmt")) {
    return (((("export const " + stmt.name) + " = ") + emitExpr(stmt.init)) + ";");
  }
  if ((stmt.tag === "export-default-stmt")) {
    return (("export default " + emitExpr(stmt.expr)) + ";");
  }
  if ((stmt.tag === "export-default-class-stmt")) {
    return emitExportDefaultClass(stmt);
  }
  if ((stmt.tag === "export-default-fn-decl")) {
    return emitExportDefaultFnDecl(stmt);
  }
  if ((stmt.tag === "export-named-stmt")) {
    {
      let specs  = stmt.pairs.map((p) => {
        if (p.alias) {
          return ((p.name + " as ") + p.alias);
        }
        else {
          return p.name;
        }
      }).join(", ");
      return (("export { " + specs) + " };");
    }
  }
  if ((stmt.tag === "export-from-stmt")) {
    {
      let specs  = stmt.pairs.map((p) => {
        if (p.alias) {
          return ((p.name + " as ") + p.alias);
        }
        else {
          return p.name;
        }
      }).join(", ");
      return (((("export { " + specs) + " } from ") + JSON.stringify(stmt.source)) + ";");
    }
  }
  if ((stmt.tag === "export-all-from-stmt")) {
    return (("export * from " + JSON.stringify(stmt.source)) + ";");
  }
  if ((stmt.tag === "export-ns-from-stmt")) {
    return (((("export * as " + stmt.ns) + " from ") + JSON.stringify(stmt.source)) + ";");
  }
  if ((stmt.tag === "import-type-stmt")) {
    {
      let specs  = stmt.names.map((n) => {
        if (n.alias) {
          return ((n.name + " as ") + n.alias);
        }
        else {
          return n.name;
        }
      }).join(", ");
      return (((("import type { " + specs) + " } from ") + JSON.stringify(stmt.source)) + ";");
    }
  }
  if ((stmt.tag === "export-type-stmt")) {
    {
      let specs  = stmt.pairs.map((p) => {
        if (p.alias) {
          return ((p.name + " as ") + p.alias);
        }
        else {
          return p.name;
        }
      }).join(", ");
      return (("export type { " + specs) + " };");
    }
  }
  if ((stmt.tag === "export-type-from-stmt")) {
    {
      let specs  = stmt.pairs.map((p) => {
        if (p.alias) {
          return ((p.name + " as ") + p.alias);
        }
        else {
          return p.name;
        }
      }).join(", ");
      return (((("export type { " + specs) + " } from ") + JSON.stringify(stmt.source)) + ";");
    }
  }
  if ((stmt.tag === "export-type-all-from-stmt")) {
    return (("export type * from " + JSON.stringify(stmt.source)) + ";");
  }
  if ((stmt.tag === "export-decl-stmt")) {
    return ("export " + emitStmt(stmt.decl));
  }
  if ((stmt.tag === "switch-stmt")) {
    return emitSwitch(stmt);
  }
  if ((stmt.tag === "for-stmt")) {
    return emitFor(stmt);
  }
  if ((stmt.tag === "for-in-stmt")) {
    return emitForIn(stmt);
  }
  if ((stmt.tag === "for-of-stmt")) {
    return emitForOf(stmt);
  }
  if ((stmt.tag === "for-await-stmt")) {
    return emitForAwait(stmt);
  }
  if ((stmt.tag === "expr-stmt")) {
    return (emitExpr(stmt.expr) + ";");
  }
  throw new Error(((("emitStmt: unexpected tag >" + stmt.tag) + "< at ") + formatSpan(stmt.id)));
};
const emitIf  = (node) => {
  {
    let lines  = [];
    lines.push((("if (" + emitExpr(node.test)) + ") {"));
    lines.push(indent(emitStmt(node.ifthen)));
    lines.push("}");
    if (isDefined(node.ifelse)) {
      {
        lines.push("else {");
        lines.push(indent(emitStmt(node.ifelse)));
        lines.push("}");
      }
    }
    return lines.join("\n");
  }
};
const emitWhile  = (node) => {
  {
    let lines  = [];
    lines.push((("while (" + emitExpr(node.test)) + ") {"));
    node.body.forEach((s) => {
      lines.push(indent(emitStmt(s)));
    });
    lines.push("}");
    return lines.join("\n");
  }
};
const emitBlock  = (node) => {
  {
    let lines  = ["{"];
    node.body.forEach((s) => {
      lines.push(indent(emitStmt(s)));
    });
    lines.push("}");
    return lines.join("\n");
  }
};
const emitImport  = (node) => {
  {
    let parts  = [];
    if (node.defaultName) {
      parts.push(node.defaultName);
    }
    if (node.namespaceName) {
      parts.push(("* as " + node.namespaceName));
    }
    if (node.named) {
      {
        let specs  = node.named.map((n) => {
          if (n.alias) {
            return ((n.name + " as ") + n.alias);
          }
          else {
            return n.name;
          }
        });
        parts.push((("{ " + specs.join(", ")) + " }"));
      }
    }
    if ((parts.length > 0)) {
      return (((("import " + parts.join(", ")) + " from ") + JSON.stringify(node.source)) + ";");
    }
    return (("import " + JSON.stringify(node.source)) + ";");
  }
};
const emitSwitch  = (node) => {
  {
    let lines  = [];
    lines.push((("switch (" + emitExpr(node.discriminant)) + ") {"));
    node.cases.forEach((c) => {
      lines.push((("  case " + emitExpr(c.test)) + ":"));
      c.body.forEach((s) => {
        lines.push(indent(indent(emitStmt(s))));
      });
      lines.push("    break;");
    });
    if (node.defaultCase) {
      {
        lines.push("  default:");
        node.defaultCase.body.forEach((s) => {
          lines.push(indent(indent(emitStmt(s))));
        });
      }
    }
    lines.push("}");
    return lines.join("\n");
  }
};
const emitFor  = (node) => {
  {
    let lines  = [];
    let init  = ((("let " + node.initName) + " = ") + emitExpr(node.initExpr));
    let test  = emitExpr(node.test);
    let update  = ((node.updateName + " = ") + emitExpr(node.updateExpr));
    lines.push((((((("for (" + init) + "; ") + test) + "; ") + update) + ") {"));
    node.body.forEach((s) => {
      lines.push(indent(emitStmt(s)));
    });
    lines.push("}");
    return lines.join("\n");
  }
};
const emitForIn  = (node) => {
  {
    let lines  = [];
    lines.push((((("for (const " + node.name) + " in ") + emitExpr(node.object)) + ") {"));
    node.body.forEach((s) => {
      lines.push(indent(emitStmt(s)));
    });
    lines.push("}");
    return lines.join("\n");
  }
};
const emitForOf  = (node) => {
  {
    let lines  = [];
    lines.push((((("for (const " + node.name) + " of ") + emitExpr(node.iterable)) + ") {"));
    node.body.forEach((s) => {
      lines.push(indent(emitStmt(s)));
    });
    lines.push("}");
    return lines.join("\n");
  }
};
const emitForAwait  = (node) => {
  {
    let lines  = [];
    lines.push((((("for await (const " + node.name) + " of ") + emitExpr(node.iterable)) + ") {"));
    node.body.forEach((s) => {
      lines.push(indent(emitStmt(s)));
    });
    lines.push("}");
    return lines.join("\n");
  }
};
const emitExpr  = (expr) => {
  if ((expr.tag === "prop-access-expr")) {
    return (emitExpr(expr.object) + (isValidId(expr.key) ? ("." + expr.key) : (("[\"" + expr.key) + "\"]")));
  }
  if ((expr.tag === "index-access-expr")) {
    return (((emitExpr(expr.object) + "[") + emitExpr(expr.index)) + "]");
  }
  if ((expr.tag === "raw-template")) {
    return (("`" + expr.content) + "`");
  }
  if ((expr.tag === "template-expr")) {
    return emitTemplateExpr(expr);
  }
  if ((expr.tag === "literal")) {
    return ((expr.value === undefined) ? "undefined" : JSON.stringify(expr.value));
  }
  if ((expr.tag === "keyword")) {
    return JSON.stringify(expr.value);
  }
  if ((expr.tag === "identifier")) {
    return expr.name;
  }
  if ((expr.tag === "object-expr")) {
    return (("({\n" + indent(expr.fields.map((f) => {
      if (f.isMethod) {
        {
          let params  = f.params.join(", ");
          let body  = f.body.map(emitStmt);
          let keyStr  = (isValidId(f.key) ? f.key : (("\"" + f.key) + "\""));
          return (((((keyStr + "(") + params) + ") {\n") + indent(body.join("\n"))) + "\n}");
        }
      }
      if (f.isShorthand) {
        return f.key;
      }
      {
        let keyStr  = (isValidId(f.key) ? f.key : (("\"" + f.key) + "\""));
        return ((keyStr + ": ") + emitExpr(f.value));
      }
    }).join(",\n"))) + "\n})");
  }
  if ((expr.tag === "array-expr")) {
    return (("[" + expr.elements.map(emitExpr).join(", ")) + "]");
  }
  if ((expr.tag === "quasi-expr")) {
    return ("/* quasiquote */ " + emitExpr(expr.expr));
  }
  if ((expr.tag === "unquote-expr")) {
    return ("/* unquote */ " + emitExpr(expr.expr));
  }
  if ((expr.tag === "unquote-splicing-expr")) {
    return ("/* unquote-splicing */ " + emitExpr(expr.expr));
  }
  if ((expr.tag === "ternary-expr")) {
    return (((((("(" + emitExpr(expr.test)) + " ? ") + emitExpr(expr.ifthen)) + " : ") + emitExpr(expr.ifelse)) + ")");
  }
  if ((expr.tag === "call")) {
    return emitCall(expr);
  }
  if ((expr.tag === "lambda")) {
    return emitLambda(expr);
  }
  if ((expr.tag === "fn")) {
    return emitFn(expr);
  }
  if ((expr.tag === "async-lambda")) {
    {
      let params  = emitParams(expr);
      let retStr  = (expr.returnType ? (": " + emitTypeExpr(expr.returnType)) : "");
      let body  = expr.body.map(emitStmt);
      return (((((("async (" + params) + ")") + retStr) + " => {\n") + indent(body.join("\n"))) + "\n}");
    }
  }
  if ((expr.tag === "async-fn")) {
    {
      let params  = emitParams(expr);
      let retStr  = (expr.returnType ? (": " + emitTypeExpr(expr.returnType)) : "");
      let body  = expr.body.map(emitStmt);
      return (((((("async function(" + params) + ")") + retStr) + " {\n") + indent(body.join("\n"))) + "\n}");
    }
  }
  if ((expr.tag === "generator-fn")) {
    {
      let params  = emitParams(expr);
      let retStr  = (expr.returnType ? (": " + emitTypeExpr(expr.returnType)) : "");
      let body  = expr.body.map(emitStmt);
      return (((((("function*(" + params) + ")") + retStr) + " {\n") + indent(body.join("\n"))) + "\n}");
    }
  }
  if ((expr.tag === "async-generator-fn")) {
    {
      let params  = emitParams(expr);
      let retStr  = (expr.returnType ? (": " + emitTypeExpr(expr.returnType)) : "");
      let body  = expr.body.map(emitStmt);
      return (((((("async function*(" + params) + ")") + retStr) + " {\n") + indent(body.join("\n"))) + "\n}");
    }
  }
  if ((expr.tag === "await-expr")) {
    return (("(await " + emitExpr(expr.expr)) + ")");
  }
  if ((expr.tag === "yield-expr")) {
    if (expr.expr) {
      return (("(yield " + emitExpr(expr.expr)) + ")");
    }
    else {
      return "(yield)";
    }
  }
  if ((expr.tag === "yield-star-expr")) {
    return (("(yield* " + emitExpr(expr.expr)) + ")");
  }
  if ((expr.tag === "bind-expr")) {
    return emitBindExpr(expr);
  }
  if ((expr.tag === "method-call-expr")) {
    return emitMethodCall(expr);
  }
  if ((expr.tag === "typeof-expr")) {
    return ("typeof " + emitExpr(expr.expr));
  }
  if ((expr.tag === "type-assert")) {
    return ((emitExpr(expr.expr) + " as ") + emitTypeExpr(expr.ty));
  }
  if ((expr.tag === "new-expr")) {
    {
      let tstr  = ((expr.typeArgs && (expr.typeArgs.length > 0)) ? (("<" + expr.typeArgs.map(emitTypeExpr).join(", ")) + ">") : "");
      let argsStr  = expr.args.map(emitExpr).join(", ");
      return ((((("new " + expr.name) + tstr) + "(") + argsStr) + ")");
    }
  }
  if ((expr.tag === "opt-chain-expr")) {
    return ((emitExpr(expr.object) + "?.") + expr.key);
  }
  if ((expr.tag === "opt-chain-index-expr")) {
    return (((emitExpr(expr.object) + "?.[") + emitExpr(expr.index)) + "]");
  }
  if ((expr.tag === "null-coalesce-expr")) {
    return (((("(" + emitExpr(expr.left)) + " ?? ") + emitExpr(expr.right)) + ")");
  }
  if ((expr.tag === "operator-expr")) {
    return emitOperator(expr);
  }
  if ((expr.tag === "this")) {
    return "this";
  }
  if ((expr.tag === "super")) {
    return "super";
  }
  if ((expr.tag === "super-constructor-call")) {
    return (("super(" + expr.args.map(emitExpr).join(", ")) + ")");
  }
  if ((expr.tag === "super-method-call")) {
    return (((("super." + expr.name) + "(") + expr.args.map(emitExpr).join(", ")) + ")");
  }
  throw new Error(((("emitExpr: unexpected tag >" + expr.tag) + "< at ") + formatSpan(expr.id)));
};
const emitParams  = (node) => {
  {
    let base  = node.params.map((p) => {
      if ((typeof p === "string")) {
        return p;
      }
      return emitTypedParam(p);
    }).join(", ");
    let restN  = node.rest;
    let restType  = node.restType;
    let restStr  = (restN ? (restType ? ((("..." + restN) + ": ") + emitTypeExpr(restType)) : ("..." + restN)) : undefined);
    if (restStr) {
      if ((node.params.length > 0)) {
        return ((base + ", ") + restStr);
      }
      else {
        return restStr;
      }
    }
    else {
      return base;
    }
  }
};
const emitLambda  = (node) => {
  {
    let params  = emitParams(node);
    let retStr  = (node.returnType ? (": " + emitTypeExpr(node.returnType)) : "");
    let body  = node.body.map(emitStmt);
    return (((((("(" + params) + ")") + retStr) + " => {\n") + indent(body.join("\n"))) + "\n}");
  }
};
const emitFn  = (node) => {
  {
    let params  = emitParams(node);
    let retStr  = (node.returnType ? (": " + emitTypeExpr(node.returnType)) : "");
    let body  = node.body.map(emitStmt);
    return (((((("function(" + params) + ")") + retStr) + " {\n") + indent(body.join("\n"))) + "\n}");
  }
};
const emitBindExpr  = (node) => {
  {
    let fnExpr  = emitExpr(node.fn);
    let thisArg  = emitExpr(node.thisArg);
    let extraArgs  = node.args.map(emitExpr);
    let allArgs  = [thisArg].concat(extraArgs);
    return (((fnExpr + ".bind(") + allArgs.join(", ")) + ")");
  }
};
const emitMethodCall  = (node) => {
  {
    let obj  = emitExpr(node.object);
    let methodNode  = node.method;
    let args  = node.args.map(emitExpr);
    if ((methodNode.tag === "identifier")) {
      return (((((obj + ".") + methodNode.name) + "(") + args.join(", ")) + ")");
    }
    if ((methodNode.tag === "literal")) {
      return (((((obj + ".") + methodNode.value) + "(") + args.join(", ")) + ")");
    }
    return (((((obj + "[") + emitExpr(methodNode)) + "](") + args.join(", ")) + ")");
  }
};
const emitCall  = (node) => {
  {
    let fnExpr  = emitExpr(node.fn);
    let typeStr  = ((node.typeArgs && (node.typeArgs.length > 0)) ? (("<" + node.typeArgs.map(emitTypeExpr).join(", ")) + ">") : "");
    let args  = node.args.map(emitExpr);
    if (((node.fn.tag === "lambda") || (node.fn.tag === "fn"))) {
      return (((((("(" + fnExpr) + ")") + typeStr) + "(") + args.join(", ")) + ")");
    }
    return ((((fnExpr + typeStr) + "(") + args.join(", ")) + ")");
  }
};
const emitOperator  = (node) => {
  {
    let args  = node.args.map(emitExpr);
    if ((args.length === 1)) {
      return ((("(" + node.op) + args[0]) + ")");
    }
    return (((((("(" + args[0]) + " ") + node.op) + " ") + args[1]) + ")");
  }
};
const emitTypedParam  = (param) => {
  {
    let opt  = (param.optional ? "?" : "");
    let typeStr  = (param.typeAnnotation ? (": " + emitTypeExpr(param.typeAnnotation)) : "");
    return ((param.name + opt) + typeStr);
  }
};
const emitFieldDef  = (node) => {
  {
    let typeStr  = (node.typeAnnotation ? (": " + emitTypeExpr(node.typeAnnotation)) : "");
    let initStr  = (isDefined(node.init) ? (" = " + emitExpr(node.init)) : "");
    let priv  = (node.modifiers.includes(":private") ? "private " : "");
    let prot  = (node.modifiers.includes(":protected") ? "protected " : "");
    let pub  = (node.modifiers.includes(":public") ? "public " : "");
    let staticStr  = (node.modifiers.includes(":static") ? "static " : "");
    let rdonly  = (node.modifiers.includes(":readonly") ? "readonly " : "");
    let prefix  = ((((priv + prot) + pub) + staticStr) + rdonly);
    return ((((prefix + node.name) + typeStr) + initStr) + ";");
  }
};
const emitConstructorDef  = (node) => {
  {
    let params  = node.sig.params.map(emitTypedParam);
    let paramsStr  = params.join(", ");
    let body  = node.body.map(emitStmt);
    return (((("constructor(" + paramsStr) + ") {\n") + indent(body.join("\n"))) + "\n}");
  }
};
const emitClassMethodDef  = (node) => {
  {
    let params  = node.sig.params.map(emitTypedParam);
    let paramsStr  = params.join(", ");
    let returnTypeStr  = (node.sig.returnType ? (": " + emitTypeExpr(node.sig.returnType)) : "");
    let body  = node.body.map(emitStmt);
    let priv  = (node.modifiers.includes(":private") ? "private " : "");
    let prot  = (node.modifiers.includes(":protected") ? "protected " : "");
    let pub  = (node.modifiers.includes(":public") ? "public " : "");
    let accMod  = ((priv + prot) + pub);
    let staticStr  = (node.modifiers.includes(":static") ? "static " : "");
    let overrideStr  = (node.modifiers.includes(":override") ? "override " : "");
    return ((((((((((accMod + staticStr) + overrideStr) + node.name) + "(") + paramsStr) + ")") + returnTypeStr) + " {\n") + indent(body.join("\n"))) + "\n}");
  }
};
const emitAbstractMethodDef  = (node) => {
  {
    let params  = node.sig.params.map(emitTypedParam);
    let paramsStr  = params.join(", ");
    let returnTypeStr  = (node.sig.returnType ? (": " + emitTypeExpr(node.sig.returnType)) : "");
    let priv  = (node.modifiers.includes(":private") ? "private " : "");
    let prot  = (node.modifiers.includes(":protected") ? "protected " : "");
    let pub  = (node.modifiers.includes(":public") ? "public " : "");
    let accMod  = ((priv + prot) + pub);
    return (((((((accMod + "abstract ") + node.name) + "(") + paramsStr) + ")") + returnTypeStr) + ";");
  }
};
const emitGetterDef  = (node) => {
  {
    let returnTypeStr  = (node.sig.returnType ? (": " + emitTypeExpr(node.sig.returnType)) : "");
    let body  = node.body.map(emitStmt);
    let priv  = (node.modifiers.includes(":private") ? "private " : "");
    let prot  = (node.modifiers.includes(":protected") ? "protected " : "");
    let pub  = (node.modifiers.includes(":public") ? "public " : "");
    let staticStr  = (node.modifiers.includes(":static") ? "static " : "");
    let accMod  = (((priv + prot) + pub) + staticStr);
    return (((((((accMod + "get ") + node.name) + "()") + returnTypeStr) + " {\n") + indent(body.join("\n"))) + "\n}");
  }
};
const emitSetterDef  = (node) => {
  {
    let params  = node.sig.params.map(emitTypedParam);
    let paramsStr  = params.join(", ");
    let body  = node.body.map(emitStmt);
    let priv  = (node.modifiers.includes(":private") ? "private " : "");
    let prot  = (node.modifiers.includes(":protected") ? "protected " : "");
    let pub  = (node.modifiers.includes(":public") ? "public " : "");
    let staticStr  = (node.modifiers.includes(":static") ? "static " : "");
    let accMod  = (((priv + prot) + pub) + staticStr);
    return (((((((accMod + "set ") + node.name) + "(") + paramsStr) + ") {\n") + indent(body.join("\n"))) + "\n}");
  }
};
const emitClassElement  = (node) => {
  if ((node.tag === "field-def")) {
    return emitFieldDef(node);
  }
  if ((node.tag === "constructor-def")) {
    return emitConstructorDef(node);
  }
  if ((node.tag === "class-method-def")) {
    return emitClassMethodDef(node);
  }
  if ((node.tag === "abstract-method-def")) {
    return emitAbstractMethodDef(node);
  }
  if ((node.tag === "getter-def")) {
    return emitGetterDef(node);
  }
  if ((node.tag === "setter-def")) {
    return emitSetterDef(node);
  }
  throw new Error(((("emitClassElement: unexpected tag >" + node.tag) + "< at ") + formatSpan(node.id)));
};
const emitClassBody  = (body) => {
  {
    let elements  = body.elements.map(emitClassElement);
    return elements.join("\n");
  }
};
const emitClassDef  = (node) => {
  {
    let typeParamsStr  = ((node.typeParams && (node.typeParams.length > 0)) ? (("<" + node.typeParams.map(emitTypeParamDecl).join(", ")) + ">") : "");
    let extendsStr  = (node.extendsType ? (" extends " + emitTypeExpr(node.extendsType)) : "");
    let implementsStr  = ((node.implementsTypes.length > 0) ? (" implements " + node.implementsTypes.map(emitTypeExpr).join(", ")) : "");
    let bodyStr  = emitClassBody(node.body);
    let abstractStr  = (node.modifiers.includes(":abstract") ? "abstract " : "");
    return ((((((((abstractStr + "class ") + node.name) + typeParamsStr) + extendsStr) + implementsStr) + " {\n") + indent(bodyStr)) + "\n}");
  }
};
const emitAnonClassDef  = (node) => {
  {
    let extendsStr  = (node.extendsType ? (" extends " + emitTypeExpr(node.extendsType)) : "");
    let implementsStr  = ((node.implementsTypes.length > 0) ? (" implements " + node.implementsTypes.map(emitTypeExpr).join(", ")) : "");
    let bodyStr  = emitClassBody(node.body);
    let abstractStr  = (node.modifiers.includes(":abstract") ? "abstract " : "");
    return ((((((abstractStr + "class") + extendsStr) + implementsStr) + " {\n") + indent(bodyStr)) + "\n}");
  }
};
const emitExportDefaultClass  = (node) => {
  if ((node.classNode.tag === "class-def")) {
    return ("export default " + emitClassDef(node.classNode));
  }
  if ((node.classNode.tag === "anon-class-def")) {
    return ("export default " + emitAnonClassDef(node.classNode));
  }
  throw new Error(((("emitExportDefaultClass: unexpected classNode tag >" + node.classNode.tag) + "< at ") + formatSpan(node.classNode.id)));
};
const emitExportDefaultFnDecl  = (node) => {
  {
    let params  = emitParams(node);
    let retStr  = (node.returnType ? (": " + emitTypeExpr(node.returnType)) : "");
    let body  = node.body.map(emitStmt);
    return (((((((("export default function " + node.name) + "(") + params) + ")") + retStr) + " {\n") + indent(body.join("\n"))) + "\n}");
  }
};
const typePrecedence  = (tag) => {
  if ((tag === "type-cond")) {
    return 1;
  }
  if ((tag === "type-union")) {
    return 2;
  }
  if ((tag === "type-intersection")) {
    return 3;
  }
  if ((tag === "type-keyof")) {
    return 5;
  }
  if ((tag === "type-typeof")) {
    return 5;
  }
  if ((tag === "type-infer")) {
    return 5;
  }
  if ((tag === "type-array")) {
    return 5;
  }
  if ((tag === "type-index")) {
    return 5;
  }
  return 6;
};
const typeWrapIf  = (node, contextPrec) => {
  {
    let s  = emitTypeExpr(node);
    let innerPrec  = typePrecedence(node.tag);
    if ((innerPrec < contextPrec)) {
      return (("(" + s) + ")");
    }
    return s;
  }
};
const emitTypeExpr  = (node) => {
  if ((node.tag === "type-id")) {
    return node.name;
  }
  if ((node.tag === "type-app")) {
    {
      let callee  = emitTypeExpr(node.callee);
      let args  = node.args.map(emitTypeExpr).join(", ");
      return (((callee + "<") + args) + ">");
    }
  }
  if ((node.tag === "type-union")) {
    return node.members.map((m) => {
      return typeWrapIf(m, 2);
    }).join(" | ");
  }
  if ((node.tag === "type-intersection")) {
    return node.members.map((m) => {
      return typeWrapIf(m, 3);
    }).join(" & ");
  }
  if ((node.tag === "type-array")) {
    {
      let inner  = emitTypeExpr(node.element);
      let needsWrap  = (typePrecedence(node.element.tag) < 5);
      if (needsWrap) {
        return (("(" + inner) + ")[]");
      }
      return (inner + "[]");
    }
  }
  if ((node.tag === "type-tuple")) {
    {
      let parts  = node.elements.map(emitTupleElement).join(", ");
      return (("[" + parts) + "]");
    }
  }
  if ((node.tag === "type-fn")) {
    return emitFnType(node);
  }
  if ((node.tag === "type-obj")) {
    return emitObjType(node);
  }
  if ((node.tag === "type-literal")) {
    return emitTypeLiteral(node);
  }
  if ((node.tag === "type-keyof")) {
    return ("keyof " + typeWrapIf(node.operand, 5));
  }
  if ((node.tag === "type-typeof")) {
    return ("typeof " + node.name);
  }
  if ((node.tag === "type-index")) {
    return (((emitTypeExpr(node.object) + "[") + emitTypeExpr(node.index)) + "]");
  }
  if ((node.tag === "type-cond")) {
    return ((((((emitTypeExpr(node.subject) + " extends ") + emitTypeExpr(node.constraint)) + " ? ") + emitTypeExpr(node.trueBranch)) + " : ") + emitTypeExpr(node.falseBranch));
  }
  if ((node.tag === "type-infer")) {
    return ("infer " + node.name);
  }
  if ((node.tag === "type-mapped")) {
    return emitMappedType(node);
  }
  if ((node.tag === "type-template")) {
    return emitTemplateType(node);
  }
  throw new Error(((("emitTypeExpr: unexpected tag >" + node.tag) + "< at ") + formatSpan(node.id)));
};
const emitTupleElement  = (el) => {
  if ((el.tag === "element")) {
    return emitTypeExpr(el.type);
  }
  if ((el.tag === "rest")) {
    return ("..." + emitTypeExpr(el.type));
  }
  if ((el.tag === "labeled")) {
    return ((el.name + ": ") + emitTypeExpr(el.type));
  }
  throw new Error(("Unknown tuple element at " + formatSpan(el.id)));
};
const emitFnType  = (node) => {
  {
    let tparams  = ((node.typeParams && (node.typeParams.length > 0)) ? (("<" + node.typeParams.map(emitTypeParamDecl).join(", ")) + ">") : "");
    let params  = node.params.map((p) => {
      {
        let opt  = (p.optional ? "?" : "");
        let ty  = emitTypeExpr(p.type);
        return (((p.name + opt) + ": ") + ty);
      }
    }).join(", ");
    let ret  = emitTypeExpr(node.result);
    return ((((tparams + "(") + params) + ") => ") + ret);
  }
};
const emitObjType  = (node) => {
  if ((node.props.length === 0)) {
    return "{}";
  }
  {
    let props  = node.props.map((p) => {
      {
        let ro  = (p.readonly ? "readonly " : "");
        let opt  = (p.optional ? "?" : "");
        let ty  = emitTypeExpr(p.type);
        return ((((ro + p.name) + opt) + ": ") + ty);
      }
    }).join("; ");
    return (("{ " + props) + " }");
  }
};
const emitTypeLiteral  = (node) => {
  if ((typeof node.value === "string")) {
    return JSON.stringify(node.value);
  }
  return String(node.value);
};
const emitMappedType  = (node) => {
  {
    let constraint  = emitTypeExpr(node.constraint);
    let value  = emitTypeExpr(node.value);
    let modStr  = " ";
    let optSuffix  = " ";
    if (node.modifiers) {
      node.modifiers.forEach((m) => {
        if (((m === "readonly") || ((m === "+readonly") || (m === "-readonly")))) {
          modStr = (m + " ");
        }
        if (((m === "?") || ((m === "+?") || (m === "-?")))) {
          optSuffix = m;
        }
      });
    }
    return (((((((((("{ " + modStr) + "[") + node.binding) + " in ") + constraint) + "]") + optSuffix) + ": ") + value) + " }");
  }
};
const emitTemplateType  = (node) => {
  {
    let out  = "`";
    node.parts.forEach((part) => {
      if ((part.tag === "str")) {
        out = (out + part.value);
      }
      else {
        out = (((out + "${") + emitTypeExpr(part.type)) + "}");
      }
    });
    out = (out + "`");
    return out;
  }
};
const emitTemplateExpr  = (expr) => {
  {
    let out  = "`";
    expr.parts.forEach((part) => {
      if ((part.tag === "str")) {
        out = (out + part.value);
      }
      else {
        out = (((out + "${") + emitExpr(part.expr)) + "}");
      }
    });
    out = (out + "`");
    return out;
  }
};
const emitTypeParamDecl  = (p) => {
  {
    let out  = p.name;
    if (p.constraint) {
      out = ((out + " extends ") + emitTypeExpr(p.constraint));
    }
    if (p.default) {
      out = ((out + " = ") + emitTypeExpr(p.default));
    }
    return out;
  }
};
export { emitProgram, emitTopLevel };
