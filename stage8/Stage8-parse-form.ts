// Stage8-parse-form.ts — hand-authored
// Converts an SForm (or SFormNode) to a typed AST node.
//
// Called by Stage8-macro-expand (after evalQuasiToSForm) and Stage8-lower
// (directly with the grammar-produced SFormNode).

import { nextNodeId } from "./Stage8-spans";

// ---- SForm types ----
// SForm = string | SFormOpaque | SForm[]
// SFormOpaque = { __opaque: true, node: any }

function isOpaque(v: any): boolean {
  return v !== null && typeof v === "object" && !Array.isArray(v) && v.__opaque === true;
}

// Detect a grammar-level SFormNode (tag is sf-atom, sf-list, sf-hole, sf-splice)
function isSFormNode(v: any): boolean {
  if (v === null || typeof v !== "object" || Array.isArray(v)) return false;
  const t = v.tag;
  return t === "sf-atom" || t === "sf-list" || t === "sf-hole" || t === "sf-splice";
}

// Convert grammar SFormNode → plain SForm value
function sformNodeToSForm(sfNode: any): any {
  if (sfNode.tag === "sf-atom") return sfNode.value;
  if (sfNode.tag === "sf-hole")
    return { __opaque: true, node: { tag: "sf-hole", expr: sfNode.expr } };
  if (sfNode.tag === "sf-splice")
    return { __opaque: true, node: { tag: "sf-splice", expr: sfNode.expr } };
  if (sfNode.tag === "sf-list") return sfNode.items.map(sformNodeToSForm);
  return String(sfNode.value ?? "");
}

// Reconstruct SFormNode from a plain SForm (for nested quasi templates)
function reconstructSFormNode(sform: any): any {
  if (typeof sform === "string") {
    return { tag: "sf-atom", value: sform, id: nextNodeId(), text: sform };
  }
  if (isOpaque(sform)) {
    const inner = sform.node;
    if (inner.tag === "sf-hole")
      return { tag: "sf-hole", expr: inner.expr, id: nextNodeId(), text: "" };
    if (inner.tag === "sf-splice")
      return { tag: "sf-splice", expr: inner.expr, id: nextNodeId(), text: "" };
    // Regular opaque inside nested quasi — not representable, use placeholder
    return { tag: "sf-atom", value: "?", id: nextNodeId(), text: "" };
  }
  if (Array.isArray(sform)) {
    // ["unquote", expr] and ["unquote-splicing", expr] must become sf-hole/sf-splice
    // so that evalQuasiToSForm recognizes them as substitution points.
    if (sform[0] === "unquote" && sform.length === 2) {
      return { tag: "sf-hole", expr: parseFormImpl(sform[1], nextNodeId(), null), id: nextNodeId(), text: "" };
    }
    if (sform[0] === "unquote-splicing" && sform.length === 2) {
      return { tag: "sf-splice", expr: parseFormImpl(sform[1], nextNodeId(), null), id: nextNodeId(), text: "" };
    }
    return {
      tag: "sf-list",
      items: sform.map(reconstructSFormNode),
      id: nextNodeId(),
      text: "",
    };
  }
  return { tag: "sf-atom", value: String(sform), id: nextNodeId(), text: "" };
}

// Build a minimal AST node (no source span)
function mk(tag: string, fields: Record<string, any>): any {
  return { id: nextNodeId(), text: "", tag, ...fields };
}

function pushError(env: any, spanId: number, msg: string): any {
  if (env && env.errors) {
    env.errors.push({ kind: "parse-error", message: msg, nodeId: spanId });
  }
  return mk("error", { reason: msg });
}

// ---- Type expression parser ----
function parseTypeExpr(sform: any, spanId: number, env: any): any {
  if (isOpaque(sform)) return sform.node;
  if (typeof sform === "string") {
    return mk("type-id", { name: sform });
  }
  if (!Array.isArray(sform) || sform.length === 0) {
    return mk("type-id", { name: "any" });
  }
  const head = sform[0];
  const headStr = typeof head === "string" ? head : null;
  const tail = sform.slice(1);
  if (headStr === "union")
    return mk("type-union", { members: tail.map((t: any) => parseTypeExpr(t, spanId, env)) });
  if (headStr === "intersect" || headStr === "intersection")
    return mk("type-intersection", {
      members: tail.map((t: any) => parseTypeExpr(t, spanId, env)),
    });
  if (headStr === "Array")
    return mk("type-array", { element: parseTypeExpr(tail[0], spanId, env) });
  if (headStr === "tuple")
    return mk("type-tuple", {
      elements: tail.map((t: any) => parseTypeExpr(t, spanId, env)),
    });
  if (headStr === "fn") {
    // (fn ((params...)) ReturnType)
    const paramForms = Array.isArray(tail[0]) ? tail[0] : [];
    const params = paramForms.map((p: any) => parseTypedParam(p, spanId, env));
    const result = tail[1]
      ? parseTypeExpr(tail[1], spanId, env)
      : mk("type-id", { name: "void" });
    return mk("type-fn", { typeParams: [], params, result });
  }
  if (headStr === "keyof")
    return mk("type-keyof", { operand: parseTypeExpr(tail[0], spanId, env) });
  if (headStr === "typeof")
    return mk("type-typeof", { name: typeof tail[0] === "string" ? tail[0] : "" });
  // Default: type application
  return mk("type-app", {
    callee: parseTypeExpr(head, spanId, env),
    args: tail.map((t: any) => parseTypeExpr(t, spanId, env)),
  });
}

// ---- Typed parameter parser ----
// sform: string | SFormOpaque | SForm[]
// Handles: ["x"], ["x", ":", "number"], ["x?", ":", "T"], ["x", "?", ":", "T"]
function parseTypedParam(sform: any, spanId: number, env: any): any {
  if (isOpaque(sform)) return sform.node;
  if (typeof sform === "string") {
    const optional = sform.endsWith("?");
    const name = optional ? sform.slice(0, -1) : sform;
    return { name, optional, typeAnnotation: null, id: nextNodeId() };
  }
  if (!Array.isArray(sform) || sform.length === 0) {
    return { name: "?", optional: false, typeAnnotation: null, id: nextNodeId() };
  }

  let i = 0;
  let rawName: string;
  const nameItem = sform[i++];
  if (isOpaque(nameItem)) {
    const n = nameItem.node;
    rawName = n.name ?? String(n.value ?? "?");
  } else if (typeof nameItem === "string") {
    rawName = nameItem;
  } else {
    pushError(env, spanId, "param name must be an atom");
    rawName = "?";
  }

  let optional = false;
  if (rawName.endsWith("?")) {
    optional = true;
    rawName = rawName.slice(0, -1);
  } else if (i < sform.length && sform[i] === "?") {
    optional = true;
    i++;
  }

  let typeAnnotation: any = null;
  if (i < sform.length && sform[i] === ":") {
    i++;
    const remaining = sform.slice(i);
    typeAnnotation =
      remaining.length === 1
        ? parseTypeExpr(remaining[0], spanId, env)
        : parseTypeExpr(remaining, spanId, env);
  }

  return { name: rawName, optional, typeAnnotation, id: nextNodeId() };
}

// ---- Function signature parser ----
// sigSform: the params list (array of param sub-forms), may have trailing ": ReturnType"
// returnSform: explicit return type sform (overrides trailing colon if present)
function parseFnSig(
  sigSform: any,
  returnSform: any,
  spanId: number,
  env: any
): { params: any[]; rest: any; restType: any; returnType: any } {
  let paramForms: any[] = Array.isArray(sigSform) ? sigSform : [];
  const params: any[] = [];
  let rest: any = null;
  let restType: any = null;
  let returnType: any = returnSform != null ? parseTypeExpr(returnSform, spanId, env) : null;

  // Detect trailing ": ReturnType" pattern in the sig sform
  // e.g. [["upstream", ":", typeExpr], ":", returnTypeExpr]
  if (
    paramForms.length >= 2 &&
    paramForms[paramForms.length - 2] === ":" &&
    returnType == null
  ) {
    returnType = parseTypeExpr(paramForms[paramForms.length - 1], spanId, env);
    paramForms = paramForms.slice(0, -2);
  }

  for (const pf of paramForms) {
    if (Array.isArray(pf) && pf.length > 0 && pf[0] === "rest") {
      rest = typeof pf[1] === "string" ? pf[1] : "";
      if (pf.length >= 4 && pf[2] === ":") {
        restType = parseTypeExpr(pf[3], spanId, env);
      }
    } else {
      params.push(parseTypedParam(pf, spanId, env));
    }
  }

  return { params, rest, restType, returnType };
}

// ---- Class body parser ----
function parseClassBody(sform: any, spanId: number, env: any): any {
  if (!Array.isArray(sform)) return mk("class-body", { elements: [] });
  // head is 'class-body', rest are elements
  const bodyForms = sform.slice(1);
  const elements: any[] = [];
  for (const ef of bodyForms) {
    if (isOpaque(ef)) {
      elements.push(ef.node);
      continue;
    }
    if (!Array.isArray(ef)) continue;
    const efArr = ef as any[];
    const etag = efArr[0];

    if (etag === "unquote-splicing" && efArr.length === 2) {
      elements.push(mk("unquote-splicing", { expr: parseFormImpl(efArr[1], spanId, env) }));
      continue;
    }

    if (etag === "field") {
      // (field [~mod]* (name [: TypeExpr]?) [initExpr])
      let fi = 1;
      const modifiers: string[] = [];
      while (fi < efArr.length && typeof efArr[fi] === "string" && (efArr[fi] as string).startsWith("~")) {
        modifiers.push(efArr[fi++] as string);
      }
      const nameGroup = efArr[fi++];
      let fname = "";
      let typeAnnotation: any = null;
      if (Array.isArray(nameGroup)) {
        fname = typeof nameGroup[0] === "string" ? nameGroup[0] : "";
        if (nameGroup.length >= 3 && nameGroup[1] === ":") {
          typeAnnotation = parseTypeExpr(nameGroup[2], spanId, env);
        }
      }
      const fval = fi < efArr.length ? parseFormImpl(efArr[fi], spanId, env) : undefined;
      elements.push(mk("field-def", { modifiers, name: fname, typeAnnotation, init: fval }));
    } else if (etag === "constructor") {
      const sigF = efArr[1];
      const body = efArr.slice(2).map((s: any) => parseFormImpl(s, spanId, env));
      const sig = parseFnSig(sigF, null, spanId, env);
      elements.push(mk("constructor-def", { sig, body }));
    } else if (etag === "method" || etag === "getter" || etag === "setter") {
      const defTag =
        etag === "getter" ? "getter-def" : etag === "setter" ? "setter-def" : "class-method-def";
      // Detect computed key: (method [ expr ] sig body...)
      if (efArr[1] === "[") {
        const keyExpr = parseFormImpl(efArr[2], spanId, env);
        // efArr[3] should be "]"
        const sigF = efArr[4];
        const body = efArr.slice(5).map((s: any) => parseFormImpl(s, spanId, env));
        const sig = parseFnSig(sigF, null, spanId, env);
        elements.push(mk(defTag, { modifiers: [], computed: true, name: null, key: keyExpr, sig, body }));
      } else {
        const mname = typeof efArr[1] === "string" ? efArr[1] : "";
        const sigF = efArr[2];
        const body = efArr.slice(3).map((s: any) => parseFormImpl(s, spanId, env));
        const sig = parseFnSig(sigF, null, spanId, env);
        elements.push(mk(defTag, { modifiers: [], computed: false, name: mname, key: null, sig, body }));
      }
    }
  }
  return mk("class-body", { elements });
}

// ---- Main dispatch ----
function parseFormImpl(sform: any, spanId: number, env: any): any {
  // Opaque: pre-built AST node or preserved hole
  if (isOpaque(sform)) {
    const inner = sform.node;
    if (inner.tag === "sf-hole") return mk("unquote", { expr: inner.expr });
    if (inner.tag === "sf-splice") return mk("unquote-splicing", { expr: inner.expr });
    return inner; // regular AST node
  }

  // String atom
  if (typeof sform === "string") {
    if (sform === "true") return mk("literal", { value: true });
    if (sform === "false") return mk("literal", { value: false });
    if (sform === "null") return mk("literal", { value: null });
    if (sform === "undefined") return mk("literal", { value: undefined });
    if (sform === "this") return mk("this", {});
    if (sform === "super") return mk("super", {});
    if (sform !== "" && !isNaN(Number(sform))) return mk("literal", { value: Number(sform) });
    if (
      (sform.startsWith('"') && sform.endsWith('"')) ||
      (sform.startsWith("'") && sform.endsWith("'"))
    ) {
      return mk("literal", { value: sform.slice(1, -1) });
    }
    if (sform.startsWith(":")) return mk("keyword", { value: sform });
    return mk("identifier", { name: sform });
  }

  // Must be an array
  if (!Array.isArray(sform) || sform.length === 0) {
    return pushError(env, spanId, "empty or invalid form");
  }

  const head = sform[0];
  const headStr = isOpaque(head) ? null : typeof head === "string" ? head : null;
  const tail = sform.slice(1);

  // Non-string head → call
  if (headStr === null) {
    return mk("call", {
      fn: parseFormImpl(head, spanId, env),
      args: tail.map((a: any) => parseFormImpl(a, spanId, env)),
      typeArgs: [],
    });
  }

  if (headStr === "=") {
    return pushError(env, spanId,
      "syntax error: '=' is not a valid operator; use '==' for equality or 'set!' for assignment");
  }

  // ---- Top-level / statement forms ----

  if (headStr === "let" || headStr === "const") {
    // Disambiguate: top-level (name is atom) vs statement (name is array)
    const nameForm = tail[0];
    if (Array.isArray(nameForm)) {
      // Statement form: (let (name) init body...)
      const name =
        typeof nameForm[0] === "string"
          ? nameForm[0]
          : isOpaque(nameForm[0])
          ? nameForm[0].node.name ?? String(nameForm[0].node.value ?? "?")
          : "?";
      const init =
        tail[1] != null
          ? parseFormImpl(tail[1], spanId, env)
          : mk("literal", { value: undefined });
      const body = tail.slice(2).map((s: any) => parseFormImpl(s, spanId, env));
      const tag = headStr === "let" ? "let*" : "const*";
      return mk(tag, {
        bindings: [{ name, init, typeAnnotation: null, id: nextNodeId() }],
        body,
      });
    } else {
      // Top-level form: (let name init) or (const name init)
      const name = isOpaque(nameForm)
        ? nameForm.node.name ?? String(nameForm.node.value ?? "?")
        : typeof nameForm === "string"
        ? nameForm
        : "?";
      const init =
        tail[1] != null
          ? parseFormImpl(tail[1], spanId, env)
          : mk("literal", { value: undefined });
      const tag = headStr === "let" ? "let-decl" : "const-decl";
      return mk(tag, { name, init, meta: undefined });
    }
  }

  if (headStr === "let*" || headStr === "const*") {
    // (let* ((name init) ...) body...)
    const bindingsForms = Array.isArray(tail[0]) ? tail[0] : [];
    const body = tail.slice(1).map((s: any) => parseFormImpl(s, spanId, env));
    const bindings = bindingsForms.map((bf: any) => {
      if (!Array.isArray(bf)) return { name: "?", init: mk("literal", { value: undefined }), typeAnnotation: null, id: nextNodeId() };
      const name = typeof bf[0] === "string" ? bf[0] : "?";
      const init = bf[1] != null ? parseFormImpl(bf[1], spanId, env) : mk("literal", { value: undefined });
      return { name, init, typeAnnotation: null, id: nextNodeId() };
    });
    return mk(headStr, { bindings, body });
  }

  if (headStr === "return") {
    const expr = tail[0] != null ? parseFormImpl(tail[0], spanId, env) : undefined;
    return mk("return", { expr });
  }

  if (headStr === "throw") {
    return mk("throw", { expr: parseFormImpl(tail[0], spanId, env) });
  }

  if (headStr === "if") {
    const test = parseFormImpl(tail[0], spanId, env);
    const ifthen = parseFormImpl(tail[1], spanId, env);
    const ifelse = tail[2] != null ? parseFormImpl(tail[2], spanId, env) : undefined;
    return mk("if", { test, ifthen, ifelse });
  }

  if (headStr === "ternary") {
    return mk("ternary", {
      test: parseFormImpl(tail[0], spanId, env),
      ifthen: parseFormImpl(tail[1], spanId, env),
      ifelse: parseFormImpl(tail[2], spanId, env),
    });
  }

  if (headStr === "while") {
    const test = parseFormImpl(tail[0], spanId, env);
    const body = tail.slice(1).map((s: any) => parseFormImpl(s, spanId, env));
    return mk("while", { test, body });
  }

  if (headStr === "begin" || headStr === "block") {
    const body = tail.map((s: any) => parseFormImpl(s, spanId, env));
    return mk("block", { body });
  }

  if (headStr === "set!" || headStr === "assign") {
    // If target is a list form (e.g. (. obj key)), produce assign-prop
    if (Array.isArray(tail[0])) {
      return mk("assign-prop", {
        target: parseFormImpl(tail[0], spanId, env),
        value: parseFormImpl(tail[1], spanId, env),
      });
    }
    const name = isOpaque(tail[0])
      ? tail[0].node.name ?? String(tail[0].node.value ?? "?")
      : typeof tail[0] === "string"
      ? tail[0]
      : "?";
    return mk("assign", { name, value: parseFormImpl(tail[1], spanId, env) });
  }

  if (headStr === "set-prop!" || headStr === "assign-prop") {
    return mk("assign-prop", {
      target: parseFormImpl(tail[0], spanId, env),
      value: parseFormImpl(tail[1], spanId, env),
    });
  }

  if (headStr === "expr-stmt") {
    return mk("expr-stmt", { expr: parseFormImpl(tail[0], spanId, env) });
  }

  // ---- Function-like expression forms ----
  if (
    headStr === "lambda" ||
    headStr === "fn" ||
    headStr === "async-lambda" ||
    headStr === "async-fn" ||
    headStr === "generator-fn" ||
    headStr === "async-generator-fn"
  ) {
    // (lambda ((params...)) body-stmts...)
    // OR (lambda ((params...)) (returns ReturnType) body-stmts...)
    const sigForm = tail[0];
    let bodyStart = 1;
    let returnTypeSform: any = null;

    if (
      tail[1] != null &&
      Array.isArray(tail[1]) &&
      (tail[1] as any[])[0] === "returns"
    ) {
      returnTypeSform = (tail[1] as any[])[1];
      bodyStart = 2;
    }

    const { params, rest, restType, returnType } = parseFnSig(
      sigForm,
      returnTypeSform,
      spanId,
      env
    );
    const body = tail.slice(bodyStart).map((s: any) => parseFormImpl(s, spanId, env));
    return mk(headStr, { params, rest, restType, returnType, body });
  }

  // ---- Object / Array ----
  if (headStr === "object") {
    const fields: any[] = [];
    for (const f of tail) {
      if (isOpaque(f)) {
        if (f.node.tag === "sf-splice") {
          fields.push(mk("unquote-splicing", { expr: f.node.expr }));
        } else if (f.node.tag === "object") {
          f.node.fields.forEach((field: any) => fields.push(field));
        } else {
          fields.push(f.node);
        }
        continue;
      }
      if (!Array.isArray(f)) {
        const key = typeof f === "string" ? f : String(f);
        fields.push({ key, isShorthand: true, id: nextNodeId() });
        continue;
      }
      const fArr = f as any[];
      if (fArr.length === 2 && fArr[0] === "unquote-splicing") {
        fields.push(mk("unquote-splicing", { expr: parseFormImpl(fArr[1], spanId, env) }));
        continue;
      }
      const key = isOpaque(fArr[0])
        ? fArr[0].node.name ?? String(fArr[0].node.value ?? "?")
        : typeof fArr[0] === "string"
        ? fArr[0]
        : "?";
      if (fArr.length < 2) {
        fields.push({ key, isShorthand: true, id: nextNodeId() });
      } else {
        fields.push({
          key,
          isShorthand: false,
          isMethod: false,
          value: parseFormImpl(fArr[1], spanId, env),
          id: nextNodeId(),
        });
      }
    }
    return mk("object", { fields });
  }

  if (headStr === "array") {
    return mk("array", {
      elements: tail.map((a: any) => parseFormImpl(a, spanId, env)),
    });
  }

  // ---- Property / index access ----
  if (headStr === ".") {
    const obj = parseFormImpl(tail[0], spanId, env);
    const key = typeof tail[1] === "string" ? tail[1] : "";
    return mk("prop-access", { object: obj, key });
  }

  if (headStr === "index") {
    return mk("index-access", {
      object: parseFormImpl(tail[0], spanId, env),
      index: parseFormImpl(tail[1], spanId, env),
    });
  }

  // ---- new ----
  if (headStr === "new") {
    const name = typeof tail[0] === "string" ? tail[0] : "";
    const args = tail.slice(1).map((a: any) => parseFormImpl(a, spanId, env));
    return mk("new", { name, typeArgs: [], args });
  }

  // ---- await / yield ----
  if (headStr === "await") {
    return mk("await", { expr: parseFormImpl(tail[0], spanId, env) });
  }

  if (headStr === "yield") {
    const expr = tail[0] != null ? parseFormImpl(tail[0], spanId, env) : undefined;
    return mk("yield", { expr });
  }

  if (headStr === "yield*") {
    return mk("yield*", { expr: parseFormImpl(tail[0], spanId, env) });
  }

  // ---- typeof / type-assert ----
  if (headStr === "typeof") {
    return mk("typeof-expr", { expr: parseFormImpl(tail[0], spanId, env) });
  }

  if (headStr === "as") {
    return mk("type-assert", {
      expr: parseFormImpl(tail[0], spanId, env),
      ty: parseTypeExpr(tail[1], spanId, env),
    });
  }

  // ---- cond ----
  if (headStr === "cond") {
    const clauses = tail.map((c: any) => {
      const cs = Array.isArray(c) ? c : [c];
      return {
        test: parseFormImpl(cs[0], spanId, env),
        expr: parseFormImpl(cs[1], spanId, env),
      };
    });
    return mk("cond", { clauses });
  }

  // ---- quasi / quote (nested) ----
  if (headStr === "quasi" || headStr === "quote") {
    const innerSForm = tail[0];
    const sformNode = reconstructSFormNode(innerSForm);
    return mk("quasi", { sform: sformNode });
  }

  if (headStr === "unquote") {
    return mk("unquote", { expr: parseFormImpl(tail[0], spanId, env) });
  }

  if (headStr === "unquote-splicing") {
    return mk("unquote-splicing", { expr: parseFormImpl(tail[0], spanId, env) });
  }

  // ---- Top-level declarations ----
  if (headStr === "defmacro") {
    const name = typeof tail[0] === "string" ? tail[0] : "";
    const paramsForms = Array.isArray(tail[1]) ? (tail[1] as any[]) : [];
    const params = paramsForms.map((p: any) =>
      typeof p === "string" ? p : Array.isArray(p) ? (p[0] as string) : "?"
    );
    const body = tail.slice(2).map((s: any) => parseFormImpl(s, spanId, env));
    return mk("defmacro", { name, params, rest: null, body, scopeId: nextNodeId() });
  }

  if (headStr === "class") {
    let i = 0;
    const name = typeof tail[i] === "string" ? tail[i++] : "?";
    let extendsType: any = null;
    const implementsTypes: any[] = [];
    if (
      tail[i] != null &&
      Array.isArray(tail[i]) &&
      (tail[i] as any[])[0] === "extends"
    ) {
      extendsType = parseTypeExpr((tail[i] as any[])[1], spanId, env);
      i++;
    }
    if (
      tail[i] != null &&
      Array.isArray(tail[i]) &&
      (tail[i] as any[])[0] === "implements"
    ) {
      const implForms = (tail[i] as any[]).slice(1);
      for (const tf of implForms) implementsTypes.push(parseTypeExpr(tf, spanId, env));
      i++;
    }
    const bodyForm = tail[i];
    const body = parseClassBody(bodyForm, spanId, env);
    return mk("class-def", {
      modifiers: [],
      name,
      typeParams: [],
      extendsType,
      implementsTypes,
      body,
    });
  }

  if (headStr === "class-body") {
    return parseClassBody(sform, spanId, env);
  }

  // ---- Standalone field-def (e.g. from a quasi producing a field node) ----
  if (headStr === "field") {
    // (field [~mod]* (name [: TypeExpr]?))
    let fi = 0;
    while (fi < tail.length && typeof tail[fi] === "string" && (tail[fi] as string).startsWith("~")) fi++;
    const nameGroup = tail[fi];
    let fname = "";
    let typeAnnotation: any = null;
    if (isOpaque(nameGroup)) {
      fname = nameGroup.node.name ?? "?";
    } else if (Array.isArray(nameGroup)) {
      fname = typeof nameGroup[0] === "string" ? nameGroup[0] : "?";
      if (nameGroup.length >= 3 && nameGroup[1] === ":") {
        typeAnnotation = parseTypeExpr(nameGroup[2], spanId, env);
      }
    }
    return mk("field-def", { modifiers: [], name: fname, typeAnnotation, init: undefined });
  }

  if (headStr === "type") {
    const name = typeof tail[0] === "string" ? tail[0] : "?";
    const typeExpr = parseTypeExpr(tail[tail.length - 1], spanId, env);
    return mk("type-alias", { name, typeParams: [], type: typeExpr });
  }

  if (headStr === "interface") {
    const name = typeof tail[0] === "string" ? tail[0] : "?";
    // tail[1] is the typeObject s-form: (name prop1 prop2 ...)
    // or an array of method nodes from unquote-splicing
    let body: any;
    if (tail[1] != null && Array.isArray(tail[1])) {
      const bodyArr = tail[1] as any[];
      // skip the leading name atom in the typeObject
      const startIdx = typeof bodyArr[0] === "string" ? 1 : 0;
      const props = bodyArr.slice(startIdx).map((p: any) => {
        if (isOpaque(p)) return p.node;
        if (Array.isArray(p)) {
          const pname = typeof p[0] === "string" ? p[0] : "?";
          const optional = pname.endsWith("?");
          const realName = optional ? pname.slice(0, -1) : pname;
          let pfi = 1;
          const typeExpr = pfi < p.length ? parseTypeExpr(p[pfi], spanId, env) : mk("type-id", { name: "any" });
          return { readonly: false, name: realName, optional, type: typeExpr, id: nextNodeId() };
        }
        return { readonly: false, name: String(p), optional: false, type: mk("type-id", { name: "any" }), id: nextNodeId() };
      });
      body = mk("type-obj", { props });
    } else {
      body = mk("type-obj", { props: [] });
    }
    return mk("interface-def", {
      name,
      typeParams: [],
      extends: [],
      body,
    });
  }

  if (headStr === "import") {
    return mk("import", { specifier: "", bindings: null });
  }

  // ---- Default: function call ----
  return mk("call", {
    fn: parseFormImpl(head, spanId, env),
    args: tail.map((a: any) => parseFormImpl(a, spanId, env)),
    typeArgs: [],
  });
}

// ---- Public entry point ----
export function parseForm(inputSform: any, spanId: number, env: any): any {
  // Normalize grammar-level SFormNode to plain SForm
  const sform = isSFormNode(inputSform) ? sformNodeToSForm(inputSform) : inputSform;
  return parseFormImpl(sform, spanId, env);
}
