import { gensym, freshScope } from "./Stage5-macro-env";
import { formatSpan } from "./Stage5-spans";
let macroOperators  = new Set(["<", ">", "<=", ">=", "&&", "||", "!=", "!==", "==", "===", "+", "-", "*", "/", "%", "!"]);
let isMacroOp  = (name) => {
  return macroOperators.has(name);
};
let applyMacroOp  = (op, args) => {
  {
    let l  = args[0];
    let r  = args[1];
    if ((op === "+")) {
      return (l + r);
    }
    if ((op === "-")) {
      return ((args.length === 1) ? (0 - l) : (l - r));
    }
    if ((op === "*")) {
      return (l * r);
    }
    if ((op === "/")) {
      return (l / r);
    }
    if ((op === "%")) {
      return (l % r);
    }
    if ((op === "===")) {
      return (l === r);
    }
    if ((op === "!==")) {
      return (l !== r);
    }
    if ((op === "==")) {
      return (l == r);
    }
    if ((op === "!=")) {
      return (l != r);
    }
    if ((op === "<")) {
      return (l < r);
    }
    if ((op === ">")) {
      return (l > r);
    }
    if ((op === "<=")) {
      return (l <= r);
    }
    if ((op === ">=")) {
      return (l >= r);
    }
    if ((op === "&&")) {
      return (l && r);
    }
    if ((op === "||")) {
      return (l || r);
    }
    if ((op === "!")) {
      return (!l);
    }
    return undefined;
  }
};
let quasiArgs  = (nodes, bindings, env, depth) => {
  {
    let result  = [];
    nodes.forEach((n) => {
      if (((n.tag === "unquote-splicing") && (depth === 1))) {
        {
          {
            let spliced  = evalMacroExpr(n.expr, bindings, env);
            if (Array.isArray(spliced)) {
              result = result.concat(spliced);
            }
            else {
              result.push(spliced);
            }
          }
        }
      }
      else {
        {
          result.push(evalQuasi(n, bindings, env, depth));
        }
      }
    });
    return result;
  }
};
let extractBindingName  = (val) => {
  if ((typeof val === "string")) {
    return val;
  }
  if ((val && (val.tag === "identifier"))) {
    return val.name;
  }
  return ("" + val);
};
let evalQuasi  = (node, bindings, env, depth) => {
  if ((node.tag === "quasi")) {
    return ({
      tag: "quasi",
      text: node.text,
      expr: evalQuasi(node.expr, bindings, env, (depth + 1))
    });
  }
  if (((node.tag === "unquote") && (depth === 1))) {
    return evalMacroExpr(node.expr, bindings, env);
  }
  if (((node.tag === "unquote") && (depth > 1))) {
    return ({
      tag: "unquote",
      text: node.text,
      expr: evalQuasi(node.expr, bindings, env, (depth - 1))
    });
  }
  if ((node.tag === "unquote-splicing")) {
    return node;
  }
  if ((node.tag === "call")) {
    return ({
      tag: "call",
      text: node.text,
      fn: evalQuasi(node.fn, bindings, env, depth),
      args: quasiArgs(node.args, bindings, env, depth),
      typeArgs: node.typeArgs
    });
  }
  if ((node.tag === "array")) {
    return ({
      tag: "array",
      text: node.text,
      elements: quasiArgs(node.elements, bindings, env, depth)
    });
  }
  if ((node.tag === "object")) {
    return ({
      tag: "object",
      text: node.text,
      fields: node.fields.map((f) => {
        if (f.isShorthand) {
          return f;
        }
        return ({
          key: f.key,
          isMethod: f.isMethod,
          isShorthand: f.isShorthand,
          value: evalQuasi(f.value, bindings, env, depth)
        });
      })
    });
  }
  if ((node.tag === "prop-access")) {
    return ({
      tag: "prop-access",
      text: node.text,
      object: evalQuasi(node.object, bindings, env, depth),
      key: node.key
    });
  }
  if ((node.tag === "ternary")) {
    return ({
      tag: "ternary",
      text: node.text,
      test: evalQuasi(node.test, bindings, env, depth),
      ifthen: evalQuasi(node.ifthen, bindings, env, depth),
      ifelse: evalQuasi(node.ifelse, bindings, env, depth)
    });
  }
  if (((node.tag === "lambda") || ((node.tag === "fn") || ((node.tag === "async-lambda") || ((node.tag === "async-fn") || ((node.tag === "generator-fn") || (node.tag === "async-generator-fn"))))))) {
    return ({
      tag: node.tag,
      text: node.text,
      params: node.params,
      rest: node.rest,
      body: quasiArgs(node.body, bindings, env, depth)
    });
  }
  if (((node.tag === "await") || ((node.tag === "yield") || (node.tag === "yield*")))) {
    return ({
      tag: node.tag,
      text: node.text,
      expr: (node.expr ? evalQuasi(node.expr, bindings, env, depth) : undefined)
    });
  }
  if ((node.tag === "cond")) {
    return ({
      tag: "cond",
      text: node.text,
      clauses: node.clauses.map((c) => {
        return ({
          test: evalQuasi(c.test, bindings, env, depth),
          expr: evalQuasi(c.expr, bindings, env, depth)
        });
      })
    });
  }
  if (((node.tag === "let*") || (node.tag === "let"))) {
    return ({
      tag: node.tag,
      text: node.text,
      bindings: node.bindings.map((b) => {
        {
          let rawName  = ((typeof b.name === "string") ? b.name : extractBindingName(evalQuasi(b.name, bindings, env, depth)));
          return ({
            name: rawName,
            init: evalQuasi(b.init, bindings, env, depth),
            typeAnnotation: b.typeAnnotation
          });
        }
      }),
      body: quasiArgs(node.body, bindings, env, depth)
    });
  }
  if (((node.tag === "const*") || (node.tag === "const"))) {
    return ({
      tag: node.tag,
      text: node.text,
      bindings: node.bindings.map((b) => {
        {
          let rawName  = ((typeof b.name === "string") ? b.name : extractBindingName(evalQuasi(b.name, bindings, env, depth)));
          return ({
            name: rawName,
            init: evalQuasi(b.init, bindings, env, depth),
            typeAnnotation: b.typeAnnotation
          });
        }
      }),
      body: quasiArgs(node.body, bindings, env, depth)
    });
  }
  if ((node.tag === "assign")) {
    {
      {
        let rawName  = ((typeof node.name === "string") ? node.name : extractBindingName(evalQuasi(node.name, bindings, env, depth)));
        return ({
          tag: "assign",
          text: node.text,
          name: rawName,
          value: evalQuasi(node.value, bindings, env, depth)
        });
      }
    }
  }
  if ((node.tag === "assign-prop")) {
    return ({
      tag: "assign-prop",
      text: node.text,
      object: evalQuasi(node.object, bindings, env, depth),
      key: node.key,
      value: evalQuasi(node.value, bindings, env, depth)
    });
  }
  if ((node.tag === "return")) {
    return ({
      tag: "return",
      text: node.text,
      expr: (node.expr ? evalQuasi(node.expr, bindings, env, depth) : undefined)
    });
  }
  if ((node.tag === "if")) {
    return ({
      tag: "if",
      text: node.text,
      test: evalQuasi(node.test, bindings, env, depth),
      ifthen: evalQuasi(node.ifthen, bindings, env, depth),
      ifelse: (node.ifelse ? evalQuasi(node.ifelse, bindings, env, depth) : undefined)
    });
  }
  if ((node.tag === "while")) {
    return ({
      tag: "while",
      text: node.text,
      test: evalQuasi(node.test, bindings, env, depth),
      body: quasiArgs(node.body, bindings, env, depth)
    });
  }
  if ((node.tag === "block")) {
    return ({
      tag: "block",
      text: node.text,
      body: quasiArgs(node.body, bindings, env, depth)
    });
  }
  if ((node.tag === "throw")) {
    return ({
      tag: "throw",
      text: node.text,
      expr: evalQuasi(node.expr, bindings, env, depth)
    });
  }
  if ((node.tag === "expr-stmt")) {
    return ({
      tag: "expr-stmt",
      text: node.text,
      expr: evalQuasi(node.expr, bindings, env, depth)
    });
  }
  return node;
};
let evalMacroExpr  = (node, bindings, env) => {
  if ((node.tag === "literal")) {
    return node.value;
  }
  if ((node.tag === "identifier")) {
    {
      if (bindings.has(node.name)) {
        return bindings.get(node.name);
      }
      return node;
    }
  }
  if ((node.tag === "keyword")) {
    return node.value;
  }
  if ((node.tag === "quasi")) {
    return evalQuasi(node.expr, bindings, env, 1);
  }
  if ((node.tag === "let*")) {
    return evalMacroLetStar(node, bindings, env);
  }
  if ((node.tag === "if")) {
    {
      {
        let test  = evalMacroExpr(node.test, bindings, env);
        if (test) {
          return evalMacroStmt(node.ifthen, bindings, env);
        }
        else {
          {
            if (node.ifelse) {
              return evalMacroStmt(node.ifelse, bindings, env);
            }
            return undefined;
          }
        }
      }
    }
  }
  if ((node.tag === "cond")) {
    return evalMacroCond(node.clauses, bindings, env);
  }
  if ((node.tag === "call")) {
    return evalMacroCall(node, bindings, env);
  }
  if ((node.tag === "array")) {
    return node.elements.map((e) => {
      return evalMacroExpr(e, bindings, env);
    });
  }
  if ((node.tag === "expr-stmt")) {
    return evalMacroExpr(node.expr, bindings, env);
  }
  return node;
};
let evalMacroCond  = (clauses, bindings, env) => {
  if ((clauses.length === 0)) {
    return undefined;
  }
  {
    let clause  = clauses[0];
    let test  = clause.test;
    let testVal  = ((test.tag === "keyword") ? (test.value === ":else") : evalMacroExpr(test, bindings, env));
    if (testVal) {
      return evalMacroExpr(clause.expr, bindings, env);
    }
    else {
      return evalMacroCond(clauses.slice(1), bindings, env);
    }
  }
};
let evalMacroLetStar  = (node, bindings, env) => {
  {
    let extended  = new Map(bindings);
    node.bindings.forEach((b) => {
      {
        let val  = evalMacroExpr(b.init, extended, env);
        extended.set(b.name, val);
      }
    });
    return evalMacroBody(node.body, extended, env);
  }
};
let evalMacroStmt  = (node, bindings, env) => {
  if ((node.tag === "expr-stmt")) {
    return evalMacroExpr(node.expr, bindings, env);
  }
  if ((node.tag === "let*")) {
    return evalMacroLetStar(node, bindings, env);
  }
  if ((node.tag === "if")) {
    {
      {
        let test  = evalMacroExpr(node.test, bindings, env);
        if (test) {
          return evalMacroStmt(node.ifthen, bindings, env);
        }
        else {
          {
            if (node.ifelse) {
              return evalMacroStmt(node.ifelse, bindings, env);
            }
            return undefined;
          }
        }
      }
    }
  }
  if ((node.tag === "block")) {
    return evalMacroBody(node.body, bindings, env);
  }
  if ((node.tag === "return")) {
    {
      if (node.expr) {
        return evalMacroExpr(node.expr, bindings, env);
      }
      return undefined;
    }
  }
  return undefined;
};
let evalMacroBody  = (stmts, bindings, env) => {
  if ((stmts.length === 0)) {
    return undefined;
  }
  {
    let last  = undefined;
    let i  = 0;
    while ((i < stmts.length)) {
      last = evalMacroStmt(stmts[i], bindings, env);
      i = (i + 1);
    }
    return last;
  }
};
let evalMacroCall  = (node, bindings, env) => {
  {
    let callee  = node.fn;
    let rawArgs  = node.args;
    if ((callee.tag !== "identifier")) {
      return node;
    }
    {
      let name  = callee.name;
      if (isMacroOp(name)) {
        {
          {
            let evArgs  = rawArgs.map((a) => {
              return evalMacroExpr(a, bindings, env);
            });
            return applyMacroOp(name, evArgs);
          }
        }
      }
      if ((name === "gensym")) {
        {
          {
            let prefix  = ((rawArgs.length > 0) ? evalMacroExpr(rawArgs[0], bindings, env) : undefined);
            return gensym(env, prefix);
          }
        }
      }
      if ((name === "length")) {
        {
          {
            let arg  = evalMacroExpr(rawArgs[0], bindings, env);
            if (Array.isArray(arg)) {
              return arg.length;
            }
            if ((arg && arg.elements)) {
              return arg.elements.length;
            }
            if ((arg && arg.args)) {
              return arg.args.length;
            }
            return 0;
          }
        }
      }
      if ((name === "str")) {
        {
          {
            let evArgs  = rawArgs.map((a) => {
              return evalMacroExpr(a, bindings, env);
            });
            let parts  = evArgs.map((v) => {
              if ((v === null)) {
                return "null";
              }
              if ((v === undefined)) {
                return "undefined";
              }
              return v.toString();
            });
            return parts.join("");
          }
        }
      }
      if ((name === "macro-error")) {
        {
          {
            let msg  = ((rawArgs.length > 0) ? evalMacroExpr(rawArgs[0], bindings, env) : "macro error");
            env.errors.push(({
              kind: "other",
              message: msg,
              macroName: (env.currentMacroName || "<unknown>"),
              callSite: (env.currentCallSite || "<unknown>"),
              nodeId: env.currentCallNodeId
            }));
            return null;
          }
        }
      }
      if ((name === "resolve")) {
        {
          {
            let arg  = evalMacroExpr(rawArgs[0], bindings, env);
            let varName  = ((typeof arg === "string") ? arg : ((arg && (arg.tag === "identifier")) ? arg.name : ("" + arg)));
            let entry  = env.varRegistry.get(varName);
            return entry;
          }
        }
      }
      if ((name === "nth")) {
        {
          {
            let arg  = evalMacroExpr(rawArgs[0], bindings, env);
            let i  = evalMacroExpr(rawArgs[1], bindings, env);
            if (Array.isArray(arg)) {
              return arg[i];
            }
            if ((arg && arg.elements)) {
              return arg.elements[i];
            }
            if ((arg && arg.args)) {
              return arg.args[i];
            }
            return undefined;
          }
        }
      }
      if ((name === "node-tag")) {
        {
          {
            let arg  = evalMacroExpr(rawArgs[0], bindings, env);
            if ((arg === undefined)) {
              return undefined;
            }
            return arg.tag;
          }
        }
      }
      if (env.macroTimeFns.has(name)) {
        {
          {
            let fn_  = env.macroTimeFns.get(name);
            let evArgs  = rawArgs.map((a) => {
              return evalMacroExpr(a, bindings, env);
            });
            let fnBindings  = new Map();
            fn_.params.forEach((p, i) => {
              fnBindings.set(p, evArgs[i]);
            });
            if (fn_.rest) {
              fnBindings.set(fn_.rest, evArgs.slice(fn_.params.length));
            }
            return evalMacroBody(fn_.body, fnBindings, env);
          }
        }
      }
      return node;
    }
  }
};
let addScopeToNode  = (node, scope) => {
  if (((node === null) || (node === undefined))) {
    return node;
  }
  if (Array.isArray(node)) {
    return node.map((n) => {
      return addScopeToNode(n, scope);
    });
  }
  if ((node.tag === undefined)) {
    return node;
  }
  if ((node.tag === "identifier")) {
    {
      {
        let ns  = new Set(node.scopes);
        ns.add(scope);
        return ({
          tag: "identifier",
          name: node.name,
          text: node.text,
          scopes: ns,
          hygiene: node.hygiene
        });
      }
    }
  }
  if ((node.tag === "call")) {
    return ({
      tag: "call",
      text: node.text,
      fn: addScopeToNode(node.fn, scope),
      args: node.args.map((a) => {
        return addScopeToNode(a, scope);
      }),
      typeArgs: node.typeArgs
    });
  }
  if ((node.tag === "array")) {
    return ({
      tag: "array",
      text: node.text,
      elements: node.elements.map((e) => {
        return addScopeToNode(e, scope);
      })
    });
  }
  if ((node.tag === "object")) {
    return ({
      tag: "object",
      text: node.text,
      fields: node.fields.map((f) => {
        if (f.isShorthand) {
          return f;
        }
        return ({
          key: f.key,
          isMethod: f.isMethod,
          isShorthand: f.isShorthand,
          value: addScopeToNode(f.value, scope)
        });
      })
    });
  }
  if (((node.tag === "lambda") || ((node.tag === "fn") || ((node.tag === "async-lambda") || ((node.tag === "async-fn") || ((node.tag === "generator-fn") || (node.tag === "async-generator-fn"))))))) {
    return ({
      tag: node.tag,
      text: node.text,
      params: node.params,
      rest: node.rest,
      body: node.body.map((s) => {
        return addScopeToNode(s, scope);
      })
    });
  }
  if (((node.tag === "await") || ((node.tag === "yield") || (node.tag === "yield*")))) {
    return ({
      tag: node.tag,
      text: node.text,
      expr: (node.expr ? addScopeToNode(node.expr, scope) : undefined)
    });
  }
  if ((node.tag === "let*")) {
    return ({
      tag: node.tag,
      text: node.text,
      bindings: node.bindings.map((b) => {
        return ({
          name: b.name,
          init: addScopeToNode(b.init, scope),
          typeAnnotation: b.typeAnnotation
        });
      }),
      body: node.body.map((s) => {
        return addScopeToNode(s, scope);
      })
    });
  }
  if ((node.tag === "const*")) {
    return ({
      tag: node.tag,
      text: node.text,
      bindings: node.bindings.map((b) => {
        return ({
          name: b.name,
          init: addScopeToNode(b.init, scope),
          typeAnnotation: b.typeAnnotation
        });
      }),
      body: node.body.map((s) => {
        return addScopeToNode(s, scope);
      })
    });
  }
  if ((node.tag === "if")) {
    return ({
      tag: "if",
      text: node.text,
      test: addScopeToNode(node.test, scope),
      ifthen: addScopeToNode(node.ifthen, scope),
      ifelse: (node.ifelse ? addScopeToNode(node.ifelse, scope) : undefined)
    });
  }
  if ((node.tag === "ternary")) {
    return ({
      tag: "ternary",
      text: node.text,
      test: addScopeToNode(node.test, scope),
      ifthen: addScopeToNode(node.ifthen, scope),
      ifelse: addScopeToNode(node.ifelse, scope)
    });
  }
  if ((node.tag === "cond")) {
    return ({
      tag: "cond",
      text: node.text,
      clauses: node.clauses.map((c) => {
        return ({
          test: addScopeToNode(c.test, scope),
          expr: addScopeToNode(c.expr, scope)
        });
      })
    });
  }
  if ((node.tag === "while")) {
    return ({
      tag: "while",
      text: node.text,
      test: addScopeToNode(node.test, scope),
      body: node.body.map((s) => {
        return addScopeToNode(s, scope);
      })
    });
  }
  if ((node.tag === "block")) {
    return ({
      tag: "block",
      text: node.text,
      body: node.body.map((s) => {
        return addScopeToNode(s, scope);
      })
    });
  }
  if ((node.tag === "return")) {
    return ({
      tag: "return",
      text: node.text,
      expr: (node.expr ? addScopeToNode(node.expr, scope) : undefined)
    });
  }
  if ((node.tag === "throw")) {
    return ({
      tag: "throw",
      text: node.text,
      expr: addScopeToNode(node.expr, scope)
    });
  }
  if ((node.tag === "expr-stmt")) {
    return ({
      tag: "expr-stmt",
      text: node.text,
      expr: addScopeToNode(node.expr, scope)
    });
  }
  if ((node.tag === "prop-access")) {
    return ({
      tag: "prop-access",
      text: node.text,
      object: addScopeToNode(node.object, scope),
      key: node.key
    });
  }
  if ((node.tag === "index-access")) {
    return ({
      tag: "index-access",
      text: node.text,
      object: addScopeToNode(node.object, scope),
      index: addScopeToNode(node.index, scope)
    });
  }
  if ((node.tag === "quasi")) {
    return ({
      tag: "quasi",
      text: node.text,
      expr: addScopeToNode(node.expr, scope)
    });
  }
  if ((node.tag === "unquote")) {
    return ({
      tag: "unquote",
      text: node.text,
      expr: addScopeToNode(node.expr, scope)
    });
  }
  if ((node.tag === "unquote-splicing")) {
    return ({
      tag: "unquote-splicing",
      text: node.text,
      expr: addScopeToNode(node.expr, scope)
    });
  }
  if ((node.tag === "assign")) {
    return ({
      tag: "assign",
      text: node.text,
      name: node.name,
      value: addScopeToNode(node.value, scope)
    });
  }
  if ((node.tag === "new")) {
    return ({
      tag: "new",
      text: node.text,
      ctor: node.ctor,
      args: node.args.map((a) => {
        return addScopeToNode(a, scope);
      })
    });
  }
  return node;
};
let expandExpr  = (node, env) => {
  if (((node === null) || (node === undefined))) {
    return node;
  }
  if ((node.tag === "call")) {
    {
      {
        let callee  = node.fn;
        if (((callee.tag === "identifier") && env.macros.has(callee.name))) {
          return expandMacroCall(node, env);
        }
        else {
          {
            return ({
              tag: "call",
              text: node.text,
              fn: expandExpr(callee, env),
              args: node.args.map((a) => {
                return expandExpr(a, env);
              }),
              typeArgs: node.typeArgs
            });
          }
        }
      }
    }
  }
  if (((node.tag === "lambda") || ((node.tag === "fn") || ((node.tag === "async-lambda") || ((node.tag === "async-fn") || ((node.tag === "generator-fn") || (node.tag === "async-generator-fn"))))))) {
    return ({
      tag: node.tag,
      text: node.text,
      params: node.params,
      rest: node.rest,
      body: node.body.map((s) => {
        return expandStmt(s, env);
      })
    });
  }
  if (((node.tag === "await") || ((node.tag === "yield") || (node.tag === "yield*")))) {
    return ({
      tag: node.tag,
      text: node.text,
      expr: (node.expr ? expandExpr(node.expr, env) : undefined)
    });
  }
  if ((node.tag === "array")) {
    return ({
      tag: "array",
      text: node.text,
      elements: node.elements.map((e) => {
        return expandExpr(e, env);
      })
    });
  }
  if ((node.tag === "object")) {
    return ({
      tag: "object",
      text: node.text,
      fields: node.fields.map((f) => {
        if (f.isShorthand) {
          return f;
        }
        return ({
          key: f.key,
          isMethod: f.isMethod,
          isShorthand: f.isShorthand,
          value: expandExpr(f.value, env)
        });
      })
    });
  }
  if ((node.tag === "prop-access")) {
    return ({
      tag: "prop-access",
      text: node.text,
      object: expandExpr(node.object, env),
      key: node.key
    });
  }
  if ((node.tag === "index-access")) {
    return ({
      tag: "index-access",
      text: node.text,
      object: expandExpr(node.object, env),
      index: expandExpr(node.index, env)
    });
  }
  if ((node.tag === "ternary")) {
    return ({
      tag: "ternary",
      text: node.text,
      test: expandExpr(node.test, env),
      ifthen: expandExpr(node.ifthen, env),
      ifelse: expandExpr(node.ifelse, env)
    });
  }
  if ((node.tag === "cond")) {
    return ({
      tag: "cond",
      text: node.text,
      clauses: node.clauses.map((c) => {
        return ({
          test: expandExpr(c.test, env),
          expr: expandExpr(c.expr, env)
        });
      })
    });
  }
  if (((node.tag === "quasi") || ((node.tag === "unquote") || (node.tag === "unquote-splicing")))) {
    return node;
  }
  return node;
};
let stampDefScope  = (body, defScope) => {
  return body.map((s) => {
    return addScopeToNode(s, defScope);
  });
};
let expandMacroCall  = (callNode, env) => {
  {
    let macroName  = callNode.fn.name;
    let macroDef  = env.macros.get(macroName);
    let argNodes  = callNode.args;
    let callSite  = (callNode.text ? callNode.text : "<unknown>");
    if ((macroDef.rest ? (argNodes.length < macroDef.params.length) : (argNodes.length !== macroDef.params.length))) {
      {
        env.errors.push(({
          kind: "arity",
          message: (((((macroName + " expects ") + macroDef.params.length) + (macroDef.rest ? "+ args" : " args")) + ", got ") + argNodes.length),
          macroName: macroName,
          callSite: callSite,
          nodeId: callNode.id
        }));
        return callNode;
      }
    }
    {
      let useScope  = freshScope(env);
      let defScope  = macroDef.scopeId;
      {
        let scopedBody  = stampDefScope(macroDef.body, defScope);
        {
          let scopedArgs  = argNodes.map((a) => {
            return addScopeToNode(a, useScope);
          });
          {
            let bindings  = new Map();
            macroDef.params.forEach((p, i) => {
              bindings.set(p, scopedArgs[i]);
            });
            if (macroDef.rest) {
              bindings.set(macroDef.rest, scopedArgs.slice(macroDef.params.length));
            }
            env.currentCallSite = callSite;
            env.currentCallNodeId = callNode.id;
            env.currentMacroName = macroName;
            {
              let result  = evalMacroBody(scopedBody, bindings, env);
              env.currentMacroName = null;
              {
                let scopedResult  = addScopeToNode(result, useScope);
                let errsBefore  = env.errors.length;
                let expanded  = expandExpr(scopedResult, env);
                {
                  let ii  = errsBefore;
                  while ((ii < env.errors.length)) {
                    {
                      let err  = env.errors[ii];
                      if ((err.expandedFrom === undefined)) {
                        err.expandedFrom = callSite;
                      }
                    }
                    ii = (ii + 1);
                  }
                }
                return expanded;
              }
            }
          }
        }
      }
    }
  }
};
let expandStmt  = (node, env) => {
  if (((node === null) || (node === undefined))) {
    return node;
  }
  if ((node.tag === "expr-stmt")) {
    return ({
      tag: "expr-stmt",
      text: node.text,
      expr: expandExpr(node.expr, env)
    });
  }
  if ((node.tag === "let*")) {
    return ({
      tag: "let*",
      text: node.text,
      bindings: node.bindings.map((b) => {
        return ({
          name: b.name,
          init: expandExpr(b.init, env),
          typeAnnotation: b.typeAnnotation
        });
      }),
      body: node.body.map((s) => {
        return expandStmt(s, env);
      })
    });
  }
  if ((node.tag === "const*")) {
    return ({
      tag: "const*",
      text: node.text,
      bindings: node.bindings.map((b) => {
        return ({
          name: b.name,
          init: expandExpr(b.init, env),
          typeAnnotation: b.typeAnnotation
        });
      }),
      body: node.body.map((s) => {
        return expandStmt(s, env);
      })
    });
  }
  if ((node.tag === "if")) {
    return ({
      tag: "if",
      text: node.text,
      test: expandExpr(node.test, env),
      ifthen: expandStmt(node.ifthen, env),
      ifelse: (node.ifelse ? expandStmt(node.ifelse, env) : undefined)
    });
  }
  if ((node.tag === "while")) {
    return ({
      tag: "while",
      text: node.text,
      test: expandExpr(node.test, env),
      body: node.body.map((s) => {
        return expandStmt(s, env);
      })
    });
  }
  if ((node.tag === "block")) {
    return ({
      tag: "block",
      text: node.text,
      body: node.body.map((s) => {
        return expandStmt(s, env);
      })
    });
  }
  if ((node.tag === "return")) {
    return ({
      tag: "return",
      text: node.text,
      expr: (node.expr ? expandExpr(node.expr, env) : undefined)
    });
  }
  if ((node.tag === "throw")) {
    return ({
      tag: "throw",
      text: node.text,
      expr: expandExpr(node.expr, env)
    });
  }
  if ((node.tag === "assign")) {
    return ({
      tag: "assign",
      text: node.text,
      name: node.name,
      value: expandExpr(node.value, env)
    });
  }
  return node;
};
let expandTopLevel  = (node, env) => {
  if (((node.tag === "defmacro") || (node.tag === "macro-time-fn-def"))) {
    return node;
  }
  if ((node.tag === "let-decl")) {
    return ({
      tag: "let-decl",
      text: node.text,
      name: node.name,
      init: expandExpr(node.init, env)
    });
  }
  if ((node.tag === "const-decl")) {
    return ({
      tag: "const-decl",
      text: node.text,
      name: node.name,
      init: expandExpr(node.init, env)
    });
  }
  return expandStmt(node, env);
};
let formatExpansionErrors  = (errors) => {
  {
    let grouped  = new Map();
    errors.forEach((err) => {
      {
        let nm  = err.macroName;
        if ((!grouped.has(nm))) {
          grouped.set(nm, []);
        }
        {
          let bucket  = grouped.get(nm);
          bucket.push(err);
        }
      }
    });
    {
      let lines  = [];
      grouped.forEach((errs, nm) => {
        lines.push((("Error in macro '" + nm) + "':"));
        errs.forEach((err) => {
          {
            let loc  = (err.nodeId ? ((" (at: " + formatSpan(err.nodeId)) + ")") : (err.callSite ? ((" (at: " + err.callSite) + ")") : ""));
            let from  = (err.expandedFrom ? ("\n    expanded from: " + err.expandedFrom) : "");
            lines.push(((((("  [" + err.kind) + "] ") + err.message) + loc) + from));
          }
        });
      });
      return lines.join("\n");
    }
  }
};
let expandAll  = (programNode, env) => {
  {
    let expandedBody  = programNode.body.map((node) => {
      return expandTopLevel(node, env);
    });
    let expanded  = ({
      tag: "program",
      text: programNode.text,
      body: expandedBody
    });
    return ({
      ast: expanded,
      errors: env.errors
    });
  }
};
export { expandAll, expandExpr, expandStmt, evalMacroExpr, evalQuasi, addScopeToNode, stampDefScope, extractBindingName, formatExpansionErrors };
