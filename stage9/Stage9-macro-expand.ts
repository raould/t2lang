import { gensym, freshScope, registerTopLevelNode } from "./Stage9-macro-env";
import { formatSpan, nextNodeId } from "./Stage9-spans";
import { parseForm } from "./Stage9-parse-form";
const macroOperators  = new Set(["<", ">", "<=", ">=", "&&", "||", "!=", "!==", "==", "===", "+", "-", "*", "/", "%", "!"]);
const isMacroOp  = (name) => {
  return macroOperators.has(name);
};
const applyMacroOp  = (op, args) => {
  {
    let l  = args[0];
    let r  = args[1];
    if ((op === "+")) {
      return args.reduce((acc, v) => {
        return (acc + v);
      });
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
const quasiArgs  = (nodes, bindings, env, depth) => {
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
const quasiObjectFields  = (fields, bindings, env, depth) => {
  {
    let result  = [];
    fields.forEach((f) => {
      if ((f.tag === "unquote-splicing")) {
        if ((depth === 1)) {
          {
            let spliced  = evalMacroExpr(f.expr, bindings, env);
            if (Array.isArray(spliced)) {
              spliced.forEach((item) => {
                if ((item && (item.tag === "object"))) {
                  result = result.concat(item.fields);
                }
                else {
                  result.push(item);
                }
              });
            }
            else {
              if ((spliced && (spliced.tag === "object"))) {
                result = result.concat(spliced.fields);
              }
              else {
                result.push(spliced);
              }
            }
          }
        }
        else {
          result.push(f);
        }
      }
      else {
        {
          if ((f.isShorthand || f.isMethod)) {
            result.push(f);
          }
          else {
            if (f.computed) {
              result.push(({
                computed: true,
                keyExpr: evalQuasi(f.keyExpr, bindings, env, depth),
                isMethod: false,
                isShorthand: false,
                value: evalQuasi(f.value, bindings, env, depth)
              }));
            }
            else {
              result.push(({
                key: f.key,
                isMethod: f.isMethod,
                isShorthand: f.isShorthand,
                value: evalQuasi(f.value, bindings, env, depth)
              }));
            }
          }
        }
      }
    });
    return result;
  }
};
const extractBindingName  = (val) => {
  if ((typeof val === "string")) {
    return val;
  }
  if ((val && (val.tag === "identifier"))) {
    return val.name;
  }
  return ("" + val);
};
const evalQuasi  = (node, bindings, env, depth) => {
  if ((node.tag === "quasi")) {
    return node;
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
  if (((node.tag === "call") && ((node.fn.tag === "identifier") && ((node.fn.name === "begin") || (node.fn.name === "block"))))) {
    return ({
      tag: "block",
      text: node.text,
      id: node.id,
      body: quasiArgs(node.args, bindings, env, depth)
    });
  }
  if ((node.tag === "block")) {
    return ({
      tag: "block",
      text: node.text,
      id: node.id,
      body: quasiArgs(node.body, bindings, env, depth)
    });
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
      fields: quasiObjectFields(node.fields, bindings, env, depth)
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
      restType: node.restType,
      returnType: node.returnType,
      body: quasiArgs(node.body, bindings, env, depth)
    });
  }
  if (((node.tag === "fn-o") || ((node.tag === "fn-o-decl") || ((node.tag === "lambda-o") || ((node.tag === "async-fn-o") || ((node.tag === "async-lambda-o") || ((node.tag === "generator-fn-o") || (node.tag === "async-generator-fn-o")))))))) {
    return ({
      tag: node.tag,
      text: node.text,
      name: node.name,
      params: node.params,
      rest: node.rest,
      restType: node.restType,
      returnType: node.returnType,
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
      }),
      elseExpr: ((node.elseExpr !== undefined) ? evalQuasi(node.elseExpr, bindings, env, depth) : undefined)
    });
  }
  if ((node.tag === "let")) {
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
      target: evalQuasi(node.target, bindings, env, depth),
      value: evalQuasi(node.value, bindings, env, depth)
    });
  }
  if ((node.tag === "compound-assign")) {
    if (node.target) {
      return ({
        tag: "compound-assign",
        text: node.text,
        op: node.op,
        target: evalQuasi(node.target, bindings, env, depth),
        value: evalQuasi(node.value, bindings, env, depth)
      });
    }
    else {
      return ({
        tag: "compound-assign",
        text: node.text,
        op: node.op,
        name: node.name,
        value: evalQuasi(node.value, bindings, env, depth)
      });
    }
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
      ifthen: quasiArgs(node.ifthen, bindings, env, depth),
      ifelse: (node.ifelse ? quasiArgs(node.ifelse, bindings, env, depth) : undefined)
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
  if ((node.tag === "switch")) {
    return ({
      tag: "switch",
      text: node.text,
      discriminant: evalQuasi(node.discriminant, bindings, env, depth),
      cases: quasiArgs(node.cases, bindings, env, depth),
      defaultCase: (node.defaultCase ? ({
        body: quasiArgs(node.defaultCase.body, bindings, env, depth)
      }) : undefined)
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
  if (((node.tag === "let-decl") || (node.tag === "const-decl"))) {
    return ({
      tag: node.tag,
      id: node.id,
      text: node.text,
      name: node.name,
      typeAnnotation: node.typeAnnotation,
      init: evalQuasi(node.init, bindings, env, depth),
      meta: node.meta
    });
  }
  if ((node.tag === "type-alias")) {
    return ({
      tag: "type-alias",
      text: node.text,
      name: node.name,
      typeParams: node.typeParams,
      type: node.type
    });
  }
  if ((node.tag === "interface-def")) {
    return ({
      tag: "interface-def",
      text: node.text,
      name: node.name,
      typeParams: node.typeParams,
      extends: node.extends,
      body: node.body
    });
  }
  if ((node.tag === "class-def")) {
    return ({
      tag: "class-def",
      text: node.text,
      modifiers: node.modifiers,
      name: node.name,
      typeParams: node.typeParams,
      extendsType: node.extendsType,
      implementsTypes: node.implementsTypes,
      body: ({
        tag: "class-body",
        text: node.body.text,
        elements: quasiClassBody(node.body.elements, bindings, env, depth)
      })
    });
  }
  if ((node.tag === "import-decl")) {
    return node;
  }
  return node;
};
const quasiClassBody  = (elements, bindings, env, depth) => {
  {
    let result  = [];
    elements.forEach((el) => {
      if ((el.tag === "unquote-splicing")) {
        if ((depth === 1)) {
          {
            let spliced  = evalMacroExpr(el.expr, bindings, env);
            if (Array.isArray(spliced)) {
              result = result.concat(spliced);
            }
            else {
              result.push(spliced);
            }
          }
        }
        else {
          result.push(el);
        }
      }
      else {
        {
          if ((el.tag === "field-def")) {
            {
              result.push(({
                tag: "field-def",
                text: el.text,
                modifiers: el.modifiers,
                name: el.name,
                typeAnnotation: el.typeAnnotation,
                init: (el.init ? evalQuasi(el.init, bindings, env, depth) : undefined)
              }));
              return undefined;
            }
          }
          if (((el.tag === "constructor-def") || ((el.tag === "class-method-def") || ((el.tag === "getter-def") || (el.tag === "setter-def"))))) {
            {
              result.push(({
                tag: el.tag,
                text: el.text,
                modifiers: el.modifiers,
                computed: el.computed,
                name: el.name,
                key: (el.computed ? evalQuasi(el.key, bindings, env, depth) : el.key),
                sig: el.sig,
                body: quasiArgs(el.body, bindings, env, depth)
              }));
              return undefined;
            }
          }
          result.push(el);
        }
      }
    });
    return result;
  }
};
const nodeToSForm  = (v) => {
  if ((typeof v === "string")) {
    return JSON.stringify(v);
  }
  if ((typeof v === "number")) {
    return ("" + v);
  }
  if ((typeof v === "boolean")) {
    return (v ? "true" : "false");
  }
  if ((v === null)) {
    return "null";
  }
  if ((v === undefined)) {
    return "null";
  }
  if (Array.isArray(v)) {
    return v;
  }
  if (((typeof v === "object") && (v.tag === "identifier"))) {
    return v.name;
  }
  if (((typeof v === "object") && (v.tag === "literal"))) {
    if ((typeof v.value === "string")) {
      return JSON.stringify(v.value);
    }
    else {
      return ("" + v.value);
    }
  }
  if (((((typeof v === "object") && (v !== null)) && (!Array.isArray(v))) && (v.tag === undefined))) {
    {
      let keys  = Object.keys(v);
      if ((keys.length === 1)) {
        return [keys[0], nodeToSForm(v[keys[0]])];
      }
    }
  }
  return ({
    __opaque: true,
    node: v
  });
};
const evalQuasiToSForm  = (sfNode, bindings, env, depth) => {
  if ((sfNode.tag === "sf-atom")) {
    return sfNode.value;
  }
  if (((sfNode.tag === "sf-hole") && (depth === 1))) {
    {
      let v  = evalMacroExpr(sfNode.expr, bindings, env);
      return nodeToSForm(v);
    }
  }
  if (((sfNode.tag === "sf-hole") && (depth > 1))) {
    return ({
      __opaque: true,
      node: ({
        tag: "sf-hole",
        expr: sfNode.expr
      })
    });
  }
  if (((sfNode.tag === "sf-splice") && (depth > 1))) {
    return ({
      __opaque: true,
      node: ({
        tag: "sf-splice",
        expr: sfNode.expr
      })
    });
  }
  if ((sfNode.tag === "sf-list")) {
    {
      let items  = sfNode.items;
      let result  = [];
      let innerDepth  = (((items.length > 0) && ((items[0].tag === "sf-atom") && (items[0].value === "quasi"))) ? (depth + 1) : depth);
      {
        let i  = 0;
        while ((i < items.length)) {
          {
            let item  = items[i];
            if (((item.tag === "sf-splice") && (innerDepth === 1))) {
              {
                let v  = evalMacroExpr(item.expr, bindings, env);
                if (Array.isArray(v)) {
                  v.forEach((elem) => {
                    result.push(nodeToSForm(elem));
                  });
                }
                else {
                  result.push(nodeToSForm(v));
                }
              }
            }
            else {
              {
                {
                  let evItem  = evalQuasiToSForm(item, bindings, env, innerDepth);
                  if ((((typeof evItem === "string") && (evItem.endsWith(".") && ((evItem.length > 1) && ((i + 1) < items.length)))) && true)) {
                    {
                      {
                        let nextItem  = items[(i + 1)];
                        let evNext  = evalQuasiToSForm(nextItem, bindings, env, innerDepth);
                        let objName  = evItem.slice(0, (evItem.length - 1));
                        result.push([".", objName, evNext]);
                        i = (i + 1);
                      }
                    }
                  }
                  else {
                    result.push(evItem);
                  }
                }
              }
            }
            i = (i + 1);
          }
        }
      }
      return result;
    }
  }
  return ("" + sfNode);
};
const evalMacroExpr  = (node, bindings, env) => {
  if ((node.tag === "literal")) {
    return node.value;
  }
  if ((node.tag === "identifier")) {
    {
      if (bindings.has(node.name)) {
        return bindings.get(node.name);
      }
      if ((env.moduleVars && env.moduleVars.has(node.name))) {
        return env.moduleVars.get(node.name);
      }
      if ((globalThis[node.name] !== undefined)) {
        return globalThis[node.name];
      }
      return node;
    }
  }
  if ((node.tag === "quasi")) {
    if (node.sform) {
      {
        let sform  = evalQuasiToSForm(node.sform, bindings, env, 1);
        return parseForm(sform, node.id, env);
      }
    }
    else {
      return evalQuasi(node.expr, bindings, env, 1);
    }
  }
  if ((node.tag === "let")) {
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
  if ((node.tag === "ternary")) {
    {
      let test  = evalMacroExpr(node.test, bindings, env);
      if (test) {
        return evalMacroExpr(node.ifthen, bindings, env);
      }
      else {
        return evalMacroExpr(node.ifelse, bindings, env);
      }
    }
  }
  if ((node.tag === "cond")) {
    return evalMacroCond(node.clauses, node.elseExpr, bindings, env);
  }
  if ((node.tag === "call")) {
    return evalMacroCall(node, bindings, env);
  }
  if ((node.tag === "prop-access")) {
    {
      let obj  = evalMacroExpr(node.object, bindings, env);
      let key  = node.key;
      if (obj) {
        return obj[key];
      }
      return undefined;
    }
  }
  if ((node.tag === "index-access")) {
    {
      let obj  = evalMacroExpr(node.object, bindings, env);
      let i  = evalMacroExpr(node.index, bindings, env);
      if (obj) {
        return obj[i];
      }
      return undefined;
    }
  }
  if ((node.tag === "object")) {
    {
      let result  = ({
        
      });
      node.fields.forEach((f) => {
        if ((!f.isMethod)) {
          {
            let val  = (f.isShorthand ? evalMacroExpr(({
              tag: "identifier",
              name: f.key,
              text: f.key,
              scopes: new Set()
            }), bindings, env) : evalMacroExpr(f.value, bindings, env));
            Reflect.set(result, f.key, val);
          }
        }
      });
      return result;
    }
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
const evalMacroCond  = (clauses, elseExpr, bindings, env) => {
  if ((clauses.length === 0)) {
    return ((elseExpr !== undefined) ? evalMacroExpr(elseExpr, bindings, env) : undefined);
  }
  {
    let clause  = clauses[0];
    let testVal  = evalMacroExpr(clause.test, bindings, env);
    if (testVal) {
      return evalMacroExpr(clause.expr, bindings, env);
    }
    else {
      return evalMacroCond(clauses.slice(1), elseExpr, bindings, env);
    }
  }
};
const evalMacroLetStar  = (node, bindings, env) => {
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
const evalMacroStmt  = (node, bindings, env) => {
  if ((node.tag === "expr-stmt")) {
    return evalMacroExpr(node.expr, bindings, env);
  }
  if ((node.tag === "let")) {
    return evalMacroLetStar(node, bindings, env);
  }
  if ((node.tag === "const*")) {
    return evalMacroLetStar(node, bindings, env);
  }
  if ((node.tag === "if")) {
    {
      {
        let test  = evalMacroExpr(node.test, bindings, env);
        if (test) {
          return evalMacroBody(node.ifthen, bindings, env);
        }
        else {
          {
            if (node.ifelse) {
              return evalMacroBody(node.ifelse, bindings, env);
            }
            return undefined;
          }
        }
      }
    }
  }
  if ((node.tag === "return")) {
    {
      if (node.expr) {
        return evalMacroExpr(node.expr, bindings, env);
      }
      return undefined;
    }
  }
  if ((node.tag === "assign")) {
    {
      {
        let val  = evalMacroExpr(node.value, bindings, env);
        bindings.set(node.name, val);
        return val;
      }
    }
  }
  if ((node.tag === "assign-prop")) {
    {
      {
        let target  = node.target;
        let obj  = evalMacroExpr(target.object, bindings, env);
        let key  = target.key;
        let val  = evalMacroExpr(node.value, bindings, env);
        if (obj) {
          Reflect.set(obj, key, val);
        }
        return val;
      }
    }
  }
  if ((node.tag === "compound-assign")) {
    return undefined;
  }
  return undefined;
};
const evalMacroBody  = (stmts, bindings, env) => {
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
const applyMacroFn  = (fnNode, evArgs, env, outerBindings) => {
  {
    let fnBindings  = new Map((outerBindings || new Map()));
    fnNode.params.forEach((p, i) => {
      fnBindings.set(p.name, evArgs[i]);
    });
    if (fnNode.rest) {
      fnBindings.set(fnNode.rest, evArgs.slice(fnNode.params.length));
    }
    return evalMacroBody(fnNode.body, fnBindings, env);
  }
};
const applyMacroCallable  = (cbFn, evArgs, bindings, env) => {
  if ((cbFn && cbFn.params)) {
    return applyMacroFn(cbFn, evArgs, env, bindings);
  }
  if ((cbFn && (cbFn.tag === "identifier"))) {
    {
      let literalArgs  = evArgs.map((v) => {
        return ({
          tag: "literal",
          value: v
        });
      });
      let synCall  = ({
        tag: "call",
        fn: cbFn,
        args: literalArgs,
        typeArgs: []
      });
      return evalMacroCall(synCall, bindings, env);
    }
  }
  return undefined;
};
const evalMacroCall  = (node, bindings, env) => {
  {
    let callee  = node.fn;
    let rawArgs  = node.args;
    if ((callee.tag === "prop-access")) {
      {
        let obj  = evalMacroExpr(callee.object, bindings, env);
        let key  = callee.key;
        let fn_  = (obj ? obj[key] : undefined);
        if ((fn_ && (typeof fn_ === "function"))) {
          {
            let evArgs  = rawArgs.map((a) => {
              return evalMacroExpr(a, bindings, env);
            });
            return fn_.apply(obj, evArgs);
          }
        }
        return node;
      }
    }
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
      if ((name === "symbol")) {
        {
          {
            let nameStr  = evalMacroExpr(rawArgs[0], bindings, env);
            if ((typeof nameStr !== "string")) {
              nameStr = ("" + (nameStr || ""));
            }
            if (nameStr.endsWith("?")) {
              nameStr = (nameStr.slice(0, (nameStr.length - 1)) + "_p");
            }
            return ({
              tag: "identifier",
              name: nameStr,
              scopes: new Set(),
              hygiene: undefined
            });
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
      if ((name === "map")) {
        {
          {
            let arr  = evalMacroExpr(rawArgs[0], bindings, env);
            let cbFn  = evalMacroExpr(rawArgs[1], bindings, env);
            if (Array.isArray(arr)) {
              return arr.map((item) => {
                return applyMacroCallable(cbFn, [item], bindings, env);
              });
            }
            else {
              return [];
            }
          }
        }
      }
      if ((name === "filter")) {
        {
          {
            let arr  = evalMacroExpr(rawArgs[0], bindings, env);
            let cbFn  = evalMacroExpr(rawArgs[1], bindings, env);
            if (Array.isArray(arr)) {
              return arr.filter((item) => {
                return applyMacroCallable(cbFn, [item], bindings, env);
              });
            }
            else {
              return [];
            }
          }
        }
      }
      if ((name === "find")) {
        {
          {
            let arr  = evalMacroExpr(rawArgs[0], bindings, env);
            let cbFn  = evalMacroExpr(rawArgs[1], bindings, env);
            if (Array.isArray(arr)) {
              return arr.find((item) => {
                return applyMacroCallable(cbFn, [item], bindings, env);
              });
            }
            else {
              return undefined;
            }
          }
        }
      }
      if ((name === "slice")) {
        {
          {
            let arr  = evalMacroExpr(rawArgs[0], bindings, env);
            let start  = evalMacroExpr(rawArgs[1], bindings, env);
            let end_  = ((rawArgs.length > 2) ? evalMacroExpr(rawArgs[2], bindings, env) : undefined);
            if (Array.isArray(arr)) {
              if ((end_ !== undefined)) {
                return arr.slice(start, end_);
              }
              else {
                return arr.slice(start);
              }
            }
            else {
              return [];
            }
          }
        }
      }
      if ((name === "string")) {
        {
          {
            let arg  = evalMacroExpr(rawArgs[0], bindings, env);
            if ((arg === null)) {
              return "null";
            }
            if ((arg === undefined)) {
              return "undefined";
            }
            if ((typeof arg === "string")) {
              return arg;
            }
            if (((typeof arg === "object") && (arg.tag === "identifier"))) {
              return arg.name;
            }
            return ("" + arg);
          }
        }
      }
      if ((name === "string_lower")) {
        {
          {
            let arg  = evalMacroExpr(rawArgs[0], bindings, env);
            if ((typeof arg === "string")) {
              return arg.toLowerCase();
            }
            else {
              return ("" + arg).toLowerCase();
            }
          }
        }
      }
      if ((name === "head")) {
        {
          {
            let arr  = evalMacroExpr(rawArgs[0], bindings, env);
            if (Array.isArray(arr)) {
              return arr[0];
            }
            if ((arr && (arr.tag === "call"))) {
              return arr.fn;
            }
            return undefined;
          }
        }
      }
      if ((name === "tail")) {
        {
          {
            let arr  = evalMacroExpr(rawArgs[0], bindings, env);
            if (Array.isArray(arr)) {
              return arr.slice(1);
            }
            if ((arr && (arr.tag === "call"))) {
              return arr.args;
            }
            return [];
          }
        }
      }
      if ((name === "drop")) {
        {
          {
            let n  = evalMacroExpr(rawArgs[0], bindings, env);
            let arr  = evalMacroExpr(rawArgs[1], bindings, env);
            if (Array.isArray(arr)) {
              return arr.slice(n);
            }
            else {
              return [];
            }
          }
        }
      }
      if ((name === "take_while")) {
        {
          {
            let cbFn  = evalMacroExpr(rawArgs[0], bindings, env);
            let arr  = evalMacroExpr(rawArgs[1], bindings, env);
            if (Array.isArray(arr)) {
              {
                let result  = [];
                let i  = 0;
                while (((i < arr.length) && applyMacroCallable(cbFn, [arr[i]], bindings, env))) {
                  result.push(arr[i]);
                  i = (i + 1);
                }
                return result;
              }
            }
            else {
              return [];
            }
          }
        }
      }
      if ((name === "map_indexed")) {
        {
          {
            let arr  = evalMacroExpr(rawArgs[0], bindings, env);
            let cbFn  = evalMacroExpr(rawArgs[1], bindings, env);
            if (Array.isArray(arr)) {
              return arr.map((item, i) => {
                return applyMacroCallable(cbFn, [i, item], bindings, env);
              });
            }
            else {
              return [];
            }
          }
        }
      }
      if ((name === "get_option")) {
        {
          {
            let opts  = evalMacroExpr(rawArgs[0], bindings, env);
            let key  = evalMacroExpr(rawArgs[1], bindings, env);
            if (Array.isArray(opts)) {
              {
                let found  = opts.find((pair) => {
                  return (Array.isArray(pair) && (pair[0] === key));
                });
                if (found) {
                  return found[1];
                }
                else {
                  return undefined;
                }
              }
            }
            else {
              return undefined;
            }
          }
        }
      }
      if ((name === "or")) {
        {
          {
            let result  = undefined;
            let i  = 0;
            while ((i < rawArgs.length)) {
              result = evalMacroExpr(rawArgs[i], bindings, env);
              if (result) {
                return result;
              }
              i = (i + 1);
            }
            return result;
          }
        }
      }
      if ((name === "and")) {
        {
          {
            let result  = undefined;
            let i  = 0;
            while ((i < rawArgs.length)) {
              result = evalMacroExpr(rawArgs[i], bindings, env);
              if ((!result)) {
                return result;
              }
              i = (i + 1);
            }
            return result;
          }
        }
      }
      if ((name === "not")) {
        {
          {
            let arg  = evalMacroExpr(rawArgs[0], bindings, env);
            return (!arg);
          }
        }
      }
      if ((name === "typeof")) {
        {
          {
            let arg  = evalMacroExpr(rawArgs[0], bindings, env);
            return typeof arg;
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
      if (bindings.has(name)) {
        {
          let fn_  = bindings.get(name);
          if ((fn_ && fn_.params)) {
            {
              {
                let evArgs  = rawArgs.map((a) => {
                  return evalMacroExpr(a, bindings, env);
                });
                return applyMacroFn(fn_, evArgs, env, bindings);
              }
            }
          }
        }
      }
      if ((env.moduleVars && env.moduleVars.has(name))) {
        {
          let fn_  = env.moduleVars.get(name);
          if ((fn_ && fn_.params)) {
            {
              {
                let evArgs  = rawArgs.map((a) => {
                  return evalMacroExpr(a, bindings, env);
                });
                return applyMacroFn(fn_, evArgs, env, bindings);
              }
            }
          }
        }
      }
      return node;
    }
  }
};
const addScopeToNode  = (node, scope) => {
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
        if ((f.computed && f.isMethod)) {
          return ({
            computed: true,
            keyExpr: addScopeToNode(f.keyExpr, scope),
            isMethod: true,
            params: f.params,
            body: f.body.map((s) => {
              return addScopeToNode(s, scope);
            })
          });
        }
        if (f.computed) {
          return ({
            computed: true,
            keyExpr: addScopeToNode(f.keyExpr, scope),
            isMethod: false,
            isShorthand: false,
            value: addScopeToNode(f.value, scope)
          });
        }
        if (f.isMethod) {
          return ({
            key: f.key,
            isMethod: true,
            params: f.params,
            body: f.body.map((s) => {
              return addScopeToNode(s, scope);
            })
          });
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
      restType: node.restType,
      returnType: node.returnType,
      body: node.body.map((s) => {
        return addScopeToNode(s, scope);
      })
    });
  }
  if (((node.tag === "fn-o") || ((node.tag === "fn-o-decl") || ((node.tag === "lambda-o") || ((node.tag === "async-fn-o") || ((node.tag === "async-lambda-o") || ((node.tag === "generator-fn-o") || (node.tag === "async-generator-fn-o")))))))) {
    return ({
      tag: node.tag,
      text: node.text,
      name: node.name,
      params: node.params,
      rest: node.rest,
      restType: node.restType,
      returnType: node.returnType,
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
  if ((node.tag === "let")) {
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
      ifthen: node.ifthen.map((s) => {
        return addScopeToNode(s, scope);
      }),
      ifelse: (node.ifelse ? node.ifelse.map((s) => {
        return addScopeToNode(s, scope);
      }) : undefined)
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
      }),
      elseExpr: ((node.elseExpr !== undefined) ? addScopeToNode(node.elseExpr, scope) : undefined)
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
    if (node.sform) {
      return ({
        tag: "quasi",
        id: node.id,
        text: node.text,
        sform: addScopeToSFormNode(node.sform, scope),
        expr: node.expr
      });
    }
    else {
      return ({
        tag: "quasi",
        id: node.id,
        text: node.text,
        sform: undefined,
        expr: (node.expr ? addScopeToNode(node.expr, scope) : undefined)
      });
    }
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
  if ((node.tag === "compound-assign")) {
    if (node.target) {
      return ({
        tag: "compound-assign",
        text: node.text,
        op: node.op,
        target: addScopeToNode(node.target, scope),
        value: addScopeToNode(node.value, scope)
      });
    }
    else {
      return ({
        tag: "compound-assign",
        text: node.text,
        op: node.op,
        name: node.name,
        value: addScopeToNode(node.value, scope)
      });
    }
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
  if ((node.tag === "block")) {
    return ({
      tag: "block",
      text: node.text,
      id: node.id,
      body: node.body.map((s) => {
        return addScopeToNode(s, scope);
      })
    });
  }
  return node;
};
const addScopeToSFormNode  = (sfNode, scope) => {
  if ((sfNode.tag === "sf-atom")) {
    return sfNode;
  }
  if ((sfNode.tag === "sf-hole")) {
    return ({
      tag: "sf-hole",
      id: sfNode.id,
      text: sfNode.text,
      expr: addScopeToNode(sfNode.expr, scope)
    });
  }
  if ((sfNode.tag === "sf-splice")) {
    return ({
      tag: "sf-splice",
      id: sfNode.id,
      text: sfNode.text,
      expr: addScopeToNode(sfNode.expr, scope)
    });
  }
  if ((sfNode.tag === "sf-list")) {
    return ({
      tag: "sf-list",
      id: sfNode.id,
      text: sfNode.text,
      items: sfNode.items.map((item) => {
        return addScopeToSFormNode(item, scope);
      })
    });
  }
  return sfNode;
};
const expandExpr  = (node, env) => {
  if (((node === null) || (node === undefined))) {
    return node;
  }
  if ((node.tag === "call")) {
    {
      {
        let callee  = node.fn;
        if (((callee.tag === "identifier") && lookupMacro(callee.name, env))) {
          {
            let macroResult  = expandMacroCall(node, env);
            if (Array.isArray(macroResult)) {
              {
                pushMacroError(env, "top-level macro expansion not allowed in this position", node.id);
                return null;
              }
            }
            return macroResult;
          }
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
      restType: node.restType,
      returnType: node.returnType,
      body: node.body.map((s) => {
        return expandStmt(s, env);
      })
    });
  }
  if (((node.tag === "fn-o") || ((node.tag === "fn-o-decl") || ((node.tag === "lambda-o") || ((node.tag === "async-fn-o") || ((node.tag === "async-lambda-o") || ((node.tag === "generator-fn-o") || (node.tag === "async-generator-fn-o")))))))) {
    return ({
      tag: node.tag,
      text: node.text,
      name: node.name,
      params: node.params,
      rest: node.rest,
      restType: node.restType,
      returnType: node.returnType,
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
        if ((f.computed && f.isMethod)) {
          return ({
            computed: true,
            keyExpr: expandExpr(f.keyExpr, env),
            isMethod: true,
            params: f.params,
            body: f.body.map((s) => {
              return expandStmt(s, env);
            })
          });
        }
        if (f.computed) {
          return ({
            computed: true,
            keyExpr: expandExpr(f.keyExpr, env),
            isMethod: false,
            isShorthand: false,
            value: expandExpr(f.value, env)
          });
        }
        if (f.isMethod) {
          return ({
            key: f.key,
            isMethod: true,
            params: f.params,
            body: f.body.map((s) => {
              return expandStmt(s, env);
            })
          });
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
      }),
      elseExpr: ((node.elseExpr !== undefined) ? expandExpr(node.elseExpr, env) : undefined)
    });
  }
  if ((node.tag === "binary-op")) {
    return ({
      tag: "binary-op",
      id: node.id,
      op: node.op,
      left: expandExpr(node.left, env),
      right: expandExpr(node.right, env)
    });
  }
  if ((node.tag === "unary-op")) {
    return ({
      tag: "unary-op",
      id: node.id,
      op: node.op,
      operand: expandExpr(node.operand, env)
    });
  }
  if ((node.tag === "macro-expr-call")) {
    {
      {
        let macroName  = node.fn.name;
        if (lookupMacro(macroName, env)) {
          {
            let expandedHeader  = node.headerArgs.map((a) => {
              return expandExpr(a, env);
            });
            let unwrappedBody  = node.body.map((stmt) => {
              return ((stmt && (stmt.tag === "expr-stmt")) ? stmt.expr : stmt);
            });
            let syntheticCall  = ({
              tag: "call",
              id: node.id,
              text: node.text,
              fn: node.fn,
              args: expandedHeader.concat(unwrappedBody),
              typeArgs: []
            });
            let result  = expandMacroCall(syntheticCall, env);
            if (Array.isArray(result)) {
              {
                pushMacroError(env, "macro-expr-call (=>) may not return multiple forms", node.id);
                return null;
              }
            }
            if (result) {
              return expandExpr(result, env);
            }
            return null;
          }
        }
        else {
          return ({
            tag: "macro-expr-call",
            id: node.id,
            fn: node.fn,
            headerArgs: node.headerArgs.map((a) => {
              return expandExpr(a, env);
            }),
            body: node.body
          });
        }
      }
    }
  }
  if (((node.tag === "quasi") || ((node.tag === "unquote") || (node.tag === "unquote-splicing")))) {
    return node;
  }
  return node;
};
const stampDefScope  = (body, defScope) => {
  return body.map((s) => {
    return addScopeToNode(s, defScope);
  });
};
const expandMacroCall  = (callNode, env) => {
  {
    let macroName  = callNode.fn.name;
    let macroDef  = lookupMacro(macroName, env);
    let argNodes  = callNode.args;
    let callSite  = (callNode.text ? callNode.text : "<unknown>");
    if ((macroDef && macroDef.isCompiled)) {
      {
        env.currentCallSite = callSite;
        env.currentCallNodeId = callNode.id;
        env.currentMacroName = macroName;
        try {
          {
            let result  = macroDef.fn(argNodes, env);
            env.currentMacroName = null;
            return result;
          }
        }
        catch (e) {
          env.errors.push(({
            kind: "runtime",
            message: e.message,
            macroName: macroName,
            callSite: callSite,
            nodeId: callNode.id
          }));
          env.currentMacroName = null;
          return null;
        }
      }
    }
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
              let result  = undefined;
              try {
                result = evalMacroBody(scopedBody, bindings, env);
              }
              catch (e) {
                pushMacroError(env, ("internal error in macro body: " + e.message), callNode.id);
                return callNode;
              }
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
const expandStmt  = (node, env) => {
  if (((node === null) || (node === undefined))) {
    return node;
  }
  if ((node.tag === "expr-stmt")) {
    return ({
      tag: "expr-stmt",
      id: node.id,
      text: node.text,
      expr: expandExpr(node.expr, env)
    });
  }
  if ((node.tag === "let")) {
    return ({
      tag: "let",
      id: node.id,
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
      id: node.id,
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
      id: node.id,
      text: node.text,
      test: expandExpr(node.test, env),
      ifthen: node.ifthen.map((s) => {
        return expandStmt(s, env);
      }),
      ifelse: (node.ifelse ? node.ifelse.map((s) => {
        return expandStmt(s, env);
      }) : undefined)
    });
  }
  if ((node.tag === "while")) {
    return ({
      tag: "while",
      id: node.id,
      text: node.text,
      test: expandExpr(node.test, env),
      body: node.body.map((s) => {
        return expandStmt(s, env);
      })
    });
  }
  if ((node.tag === "return")) {
    return ({
      tag: "return",
      id: node.id,
      text: node.text,
      expr: (node.expr ? expandExpr(node.expr, env) : undefined)
    });
  }
  if ((node.tag === "throw")) {
    return ({
      tag: "throw",
      id: node.id,
      text: node.text,
      expr: expandExpr(node.expr, env)
    });
  }
  if ((node.tag === "assign")) {
    return ({
      tag: "assign",
      id: node.id,
      text: node.text,
      name: node.name,
      value: expandExpr(node.value, env)
    });
  }
  if ((node.tag === "compound-assign")) {
    if (node.target) {
      return ({
        tag: "compound-assign",
        id: node.id,
        text: node.text,
        op: node.op,
        target: expandExpr(node.target, env),
        value: expandExpr(node.value, env)
      });
    }
    else {
      return ({
        tag: "compound-assign",
        id: node.id,
        text: node.text,
        op: node.op,
        name: node.name,
        value: expandExpr(node.value, env)
      });
    }
  }
  if ((node.tag === "block")) {
    return ({
      tag: "block",
      id: node.id,
      text: node.text,
      body: node.body.map((s) => {
        return expandStmt(s, env);
      })
    });
  }
  if ((node.tag === "macro-body-call")) {
    {
      {
        let macroName  = node.fn.name;
        if (lookupMacro(macroName, env)) {
          {
            let expandedHeader  = node.headerArgs.map((a) => {
              return expandExpr(a, env);
            });
            let unwrappedBody  = node.body.map((stmt) => {
              return ((stmt && (stmt.tag === "expr-stmt")) ? stmt.expr : stmt);
            });
            let syntheticCall  = ({
              tag: "call",
              id: node.id,
              text: node.text,
              fn: node.fn,
              args: expandedHeader.concat(unwrappedBody),
              typeArgs: []
            });
            let result  = expandMacroCall(syntheticCall, env);
            if (Array.isArray(result)) {
              return ({
                tag: "block",
                id: node.id,
                text: node.text,
                body: result.map((s) => {
                  return expandStmt(s, env);
                })
              });
            }
            if (result) {
              return expandStmt(result, env);
            }
            return node;
          }
        }
        else {
          return ({
            tag: "macro-body-call",
            id: node.id,
            fn: node.fn,
            headerArgs: node.headerArgs.map((a) => {
              return expandExpr(a, env);
            }),
            body: node.body
          });
        }
      }
    }
  }
  if ((node.tag === "const")) {
    return ({
      tag: "const",
      id: node.id,
      text: node.text,
      name: node.name,
      pattern: node.pattern,
      typeAnnotation: node.typeAnnotation,
      init: expandExpr(node.init, env)
    });
  }
  return node;
};
const expandTopLevel  = (node, env) => {
  if ((node.tag === "defmacro")) {
    if (env.isMacroCompilation) {
      return ({
        tag: "defmacro",
        id: node.id,
        text: node.text,
        name: node.name,
        params: node.params,
        rest: node.rest,
        scopeId: node.scopeId,
        body: node.body.map((s) => {
          return expandStmt(s, env);
        })
      });
    }
    else {
      return node;
    }
  }
  if ((node.tag === "macro-time-fn-def")) {
    if (env.isMacroCompilation) {
      {
        let init  = expandExpr(node.init, env);
        return ({
          tag: "macro-time-fn-def",
          id: node.id,
          text: node.text,
          name: node.name,
          init: init
        });
      }
    }
    else {
      return node;
    }
  }
  if ((node.tag === "let-decl")) {
    return ({
      tag: "let-decl",
      id: node.id,
      callSiteId: node.callSiteId,
      text: node.text,
      name: node.name,
      typeAnnotation: node.typeAnnotation,
      meta: node.meta,
      init: expandExpr(node.init, env)
    });
  }
  if ((node.tag === "const-decl")) {
    return ({
      tag: "const-decl",
      id: node.id,
      callSiteId: node.callSiteId,
      text: node.text,
      name: node.name,
      typeAnnotation: node.typeAnnotation,
      meta: node.meta,
      init: expandExpr(node.init, env)
    });
  }
  if ((node.tag === "mixin-form")) {
    return node;
  }
  return expandStmt(node, env);
};
const formatExpansionErrors  = (errors) => {
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
const TOP_LEVEL_DECL_TAGS  = new Set(["let-decl", "const-decl", "type-alias", "interface-def", "enum-def", "class-def", "anon-class-def", "defmacro", "macro-time-fn-def"]);
const TOP_LEVEL_STATEMENT_TAGS  = new Set(["expr-stmt", "let", "const*", "const", "if", "while", "return", "throw", "assign", "switch", "try", "for", "for-in", "for-of", "for-await"]);
const pushMacroError  = (env, message, nodeId) => {
  env.errors.push(({
    kind: "other",
    message: message,
    macroName: (env.currentMacroName || "<unknown>"),
    callSite: (env.currentCallSite || "<unknown>"),
    nodeId: ((nodeId === undefined) ? env.currentCallNodeId : nodeId)
  }));
  return null;
};
const ensureNodeHasId  = (node) => {
  if ((node && (node.id === undefined))) {
    node.id = nextNodeId();
  }
  return node;
};
const isAllowedTopLevelTag  = (tag) => {
  return (TOP_LEVEL_DECL_TAGS.has(tag) || TOP_LEVEL_STATEMENT_TAGS.has(tag));
};
const lookupMacro  = (name, env) => {
  {
    let slashIdx  = name.indexOf("/");
    if ((slashIdx === -1)) {
      return env.macros.get(name);
    }
    {
      let ns  = name.slice(0, slashIdx);
      let localName  = name.slice((slashIdx + 1));
      let nsMap  = (env.macroNamespaces && env.macroNamespaces.get(ns));
      if (nsMap) {
        return nsMap.get(localName);
      }
      return undefined;
    }
  }
};
const getTopLevelMacroCall  = (node, env) => {
  if ((node.tag === "expr-stmt")) {
    {
      let expr  = node.expr;
      if ((expr.tag === "call")) {
        {
          let callee  = expr.fn;
          if (((callee.tag === "identifier") && lookupMacro(callee.name, env))) {
            return expr;
          }
        }
      }
    }
  }
  return undefined;
};
const expandTopLevelMacroCall  = (callNode, env) => {
  return expandMacroCall(callNode, env);
};
const validateTopLevelNode  = (node, env) => {
  if ((!node)) {
    {
      pushMacroError(env, "macro top-level expansion produced disallowed form", undefined);
      return null;
    }
  }
  {
    let withId  = ensureNodeHasId(node);
    let tag  = withId.tag;
    if ((tag === undefined)) {
      {
        pushMacroError(env, "macro top-level expansion produced disallowed form", withId.id);
        return null;
      }
    }
    if ((!isAllowedTopLevelTag(tag))) {
      {
        pushMacroError(env, ("macro top-level expansion produced disallowed form: " + tag), withId.id);
        return null;
      }
    }
    return withId;
  }
};
const expandAll  = (programNode, env, macroLoader, dbg) => {
  {
    let worklist  = programNode.body.slice(0);
    let expandedBody  = [];
    while ((worklist.length > 0)) {
      {
        let node  = worklist.shift();
        let _  = (dbg ? dbg.log_msg("macros", (("expand: " + (node.tag || "?")) + (node.name ? (" " + node.name) : (node.text ? (" " + node.text.slice(0, 40)) : "")))) : null);
        let __  = registerTopLevelNode(node, env);
        let macroCall  = getTopLevelMacroCall(node, env);
        if (((node.tag === "macro-import") && macroLoader)) {
          macroLoader(node.path, node.namespace, env);
        }
        if ((((node.tag === "macro-export") || (node.tag === "macro-reexport")) && (!env.isMacroCompilation))) {
          pushMacroError(env, "macro-export is not allowed in .t2 files", node.id);
        }
        if (((node.tag === "macro-body-call") && lookupMacro(node.fn.name, env))) {
          {
            let expandedHeader  = node.headerArgs.map((a) => {
              return expandExpr(a, env);
            });
            let unwrappedBody  = node.body.map((stmt) => {
              return ((stmt && (stmt.tag === "expr-stmt")) ? stmt.expr : stmt);
            });
            let syntheticCall  = ({
              tag: "call",
              id: node.id,
              text: node.text,
              fn: node.fn,
              args: expandedHeader.concat(unwrappedBody),
              typeArgs: []
            });
            let result  = expandTopLevelMacroCall(syntheticCall, env);
            if (Array.isArray(result)) {
              {
                let validated  = [];
                result.forEach((spliced) => {
                  {
                    let validatedNode  = validateTopLevelNode(spliced, env);
                    if (validatedNode) {
                      {
                        validatedNode.callSiteId = node.id;
                        validated.push(validatedNode);
                        registerTopLevelNode(validatedNode, env);
                      }
                    }
                  }
                });
                {
                  let idx  = (validated.length - 1);
                  while ((idx >= 0)) {
                    {
                      {
                        let spliced  = validated[idx];
                        worklist.unshift(spliced);
                      }
                      idx = (idx - 1);
                    }
                  }
                }
              }
            }
            else {
              if (result) {
                if ((result.tag === "block")) {
                  {
                    let body  = result.body;
                    let idx  = (body.length - 1);
                    while ((idx >= 0)) {
                      {
                        worklist.unshift(body[idx]);
                        idx = (idx - 1);
                      }
                    }
                  }
                }
                else {
                  {
                    let singleValidated  = (isAllowedTopLevelTag(result.tag) ? validateTopLevelNode(result, env) : null);
                    if (singleValidated) {
                      {
                        singleValidated.callSiteId = node.id;
                        registerTopLevelNode(singleValidated, env);
                        worklist.unshift(singleValidated);
                      }
                    }
                    else {
                      expandedBody.push(({
                        tag: "expr-stmt",
                        id: node.id,
                        text: node.text,
                        expr: result
                      }));
                    }
                  }
                }
              }
            }
          }
        }
        else {
          if (macroCall) {
            {
              let result  = expandTopLevelMacroCall(macroCall, env);
              if (Array.isArray(result)) {
                {
                  let validated  = [];
                  result.forEach((spliced) => {
                    {
                      let validatedNode  = validateTopLevelNode(spliced, env);
                      if (validatedNode) {
                        {
                          validatedNode.callSiteId = node.id;
                          validated.push(validatedNode);
                          registerTopLevelNode(validatedNode, env);
                        }
                      }
                    }
                  });
                  {
                    let idx  = (validated.length - 1);
                    while ((idx >= 0)) {
                      {
                        {
                          let spliced  = validated[idx];
                          worklist.unshift(spliced);
                        }
                        idx = (idx - 1);
                      }
                    }
                  }
                }
              }
              else {
                if ((result && (result.tag === "block"))) {
                  {
                    let body  = result.body;
                    let idx  = (body.length - 1);
                    while ((idx >= 0)) {
                      {
                        worklist.unshift(body[idx]);
                        idx = (idx - 1);
                      }
                    }
                  }
                }
                else {
                  {
                    let singleValidated  = ((result && isAllowedTopLevelTag(result.tag)) ? validateTopLevelNode(result, env) : null);
                    if (singleValidated) {
                      {
                        singleValidated.callSiteId = node.id;
                        registerTopLevelNode(singleValidated, env);
                        worklist.unshift(singleValidated);
                      }
                    }
                    else {
                      expandedBody.push(({
                        tag: "expr-stmt",
                        id: node.id,
                        text: node.text,
                        expr: result
                      }));
                    }
                  }
                }
              }
            }
          }
          else {
            expandedBody.push(expandTopLevel(node, env));
          }
        }
      }
    }
    {
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
  }
};
export { expandAll, expandTopLevel, expandExpr, expandStmt, evalMacroExpr, evalQuasi, addScopeToNode, stampDefScope, extractBindingName, formatExpansionErrors };
