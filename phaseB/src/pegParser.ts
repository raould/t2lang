import * as ohm from "ohm-js";
import type { PhaseBNode, PhaseBListNode, SourceLoc } from "./reader.js";

type OhmNode = ohm.Node;
type OhmIteration = ohm.IterationNode;

const GRAMMAR_SOURCE = String.raw`
T2PhaseB {
  Program = Spacing FormSpacing*
  FormSpacing = Form Spacing

  Form = Expr

  List = "(" Spacing ListBody? Spacing ")"
  ListBody = Assign
     | SetBang
     | For
     | Let
     | TypeDecl
     | TemplateWith
     | Call

  Call = Expr+  -- implicitCall

  Expr = OptionalChain
    | Postfix
    | Primary

  Primary = List
    | ArrayLit
    | ObjectLit
    | Atom
    | String
    | Number

  Postfix = Primary PostfixTail*
  PostfixTail = "." ident CallArgs -- call
             | "." ident -- prop

  OptionalChain = Primary OptionalSegment+
  OptionalSegment = OptionalProp
                 | OptionalIndex
                 | OptionalCall

  OptionalProp = "?." ident CallArgs -- call
               | "?." ident -- prop
  OptionalIndex = "?." "[" Expr "]" -- index
  OptionalCall = "?." CallArgs -- call

  CallArgs = "(" Spacing ArgList? Spacing ")"
  ArgList = Expr ArgTail*
  ArgTail = Spacing "," Spacing Expr

  ArrayLit = "[" Spacing ExprList? Spacing "]"
  ExprList = Expr ExprTail*
  ExprTail = Spacing "," Spacing Expr

  ObjectLit = "{" Spacing ObjectEntry* Spacing "}"
  ObjectEntry = ComputedEntry
        | OptionalEntry
        | KeyValueEntry
        | ShorthandEntry

  ComputedEntry = "[" Spacing Expr Spacing "]" Spacing Expr
  OptionalEntry = Key Spacing "?" OptionalValue?
  OptionalValue = Spacing Expr
  KeyValueEntry = Key Spacing ":" Spacing Expr
  ShorthandEntry = Key

  Key = ident | String

  Assign = Expr Spacing ":=" Spacing Expr
  SetBang = "set!" Spacing Expr Spacing Expr

  Let = ("let" | "const") Spacing BindingList Spacing Form*
  BindingList = "(" Spacing Binding* Spacing ")"
  Binding = "(" Spacing BindingTarget BindingValue? Spacing ")"
  BindingValue = Spacing Expr
  BindingTarget = Expr

  For = "for" Spacing ForKind Spacing BindingExpr Spacing Form+
  ForKind = "of" | "in" | "await"
  BindingExpr = "(" Spacing BindingTarget Spacing Expr Spacing ")"

  TypeDecl = "type" Spacing ident Spacing TypeParams? Spacing TypeExpr

  TemplateWith = "template-with" Spacing String Spacing Pair*
  Pair = "(" Spacing Key Spacing Expr Spacing ")"

  TypeParams = "<" Spacing ident TypeParamTail* Spacing ">"
  TypeParamTail = Spacing "," Spacing ident
  TypeExpr = TypePrimary (TypePostfix)*
    TypePrimary = ident  -- ident
      | String -- string
      | "[" Spacing TypeExpr TypeExprTail* Spacing "]" -- array
      | "(" Spacing TypeExpr Spacing ")" -- paren
      | "keyof" Spacing TypeExpr -- keyof
      | "infer" Spacing ident -- infer
  TypePostfix = "[]" | "?" | TypeArgs
  TypeArgs = "<" Spacing TypeExpr TypeArgTail* Spacing ">"
  TypeExprTail = Spacing "," Spacing TypeExpr
  TypeArgTail = Spacing "," Spacing TypeExpr

  Atom = ident

  ident = letter (letter | digit | "_" | "-" )*
  String = "\"" (~"\"" any)* "\""
  Number = digit+ Fraction?
  Fraction = "." digit+

  Spacing = (space | "\n" | "\t")*
}
`;

export function parsePhaseBPeg(source: string, file = "<input>"): PhaseBNode[] {
  const grammar = ohm.grammar(GRAMMAR_SOURCE);
  const match = grammar.match(source);
  if (!match.succeeded()) {
    throw new Error("PEG parse failed");
  }
  const locLookup = createLocLookup(source, file);
  const sym = (name: string, node: ohm.Node): PhaseBNode => ({
    kind: "symbol",
    name,
    loc: locLookup(node),
    phaseKind: "symbol",
  });
  const str = (value: string, node: ohm.Node): PhaseBNode => ({
    kind: "literal",
    value,
    loc: locLookup(node),
    phaseKind: "literal",
  });
  const num = (value: string, node: ohm.Node): PhaseBNode => ({
    kind: "literal",
    value: Number(value),
    loc: locLookup(node),
    phaseKind: "literal",
  });
  const list = (node: ohm.Node, ...elements: PhaseBNode[]): PhaseBListNode => ({
    kind: "list",
    elements,
    loc: locLookup(node),
    delimiter: "(",
    phaseKind: "list",
  });
  const normalizeArgs = (value: unknown): PhaseBNode[] => {
    if (!Array.isArray(value)) {
      return [];
    }
    if (value.length === 1 && Array.isArray(value[0])) {
      return value[0] as PhaseBNode[];
    }
    return value as PhaseBNode[];
  };
  const collectCommaSeparated = (first: ohm.Node, rest: ohm.IterationNode): PhaseBNode[] => {
    const items = [first.ast() as PhaseBNode];
    for (const segment of rest.asIteration().children) {
      const last = segment.children[segment.children.length - 1] as ohm.Node;
      items.push(last.ast() as PhaseBNode);
    }
    return items;
  };
  const semantics = grammar.createSemantics().addOperation("ast", {
    _iter(...children: OhmNode[]) {
      return children.map((child) => child.ast());
    },
    Program(_sp: OhmNode, forms: OhmIteration) {
      return forms.asIteration().children.map((child: ohm.Node) => child.ast()).filter(Boolean);
    },
    FormSpacing(form: OhmNode, _sp: OhmNode) {
      void _sp;
      return form.ast();
    },
    Form(form: OhmNode) {
      return form.ast();
    },
    List(_open: OhmNode, _sp1: OhmNode, body: OhmNode, _sp2: OhmNode, _close: OhmNode) {
      void [_open, _sp1, _sp2, _close];
      if (!body.children.length) {
        return list(this as ohm.Node);
      }
      const value = body.ast();
      if (value && value.phaseKind === "list") {
        return { ...(value as PhaseBListNode), loc: locLookup(this as ohm.Node) };
      }
      return value;
    },
    ListBody(form: OhmNode) {
      return form.ast();
    },
    Call_implicitCall(exprs: OhmIteration) {
      const items = exprs.asIteration().children.map((child: ohm.Node) => child.ast());
      const [head, ...args] = items;
      return list(this as ohm.Node, sym("call", this as ohm.Node), head, ...args);
    },
    Expr(expr: OhmNode) {
      return expr.ast();
    },
    Primary(expr: OhmNode) {
      return expr.ast();
    },
    Postfix(primary: OhmNode, segs: OhmIteration) {
      let acc = primary.ast();
      for (const seg of segs.asIteration().children) {
        const apply = seg.ast() as (value: PhaseBNode) => PhaseBNode;
        acc = apply(acc);
      }
      return acc;
    },
    PostfixTail_call(_dot: OhmNode, name: OhmNode, callArgs: OhmNode) {
      void _dot;
      return (value: PhaseBNode): PhaseBNode => {
        const prop = list(this as ohm.Node, sym("prop", this as ohm.Node), value, str(name.sourceString, name as ohm.Node));
        const args = callArgs.ast() as PhaseBNode[];
        return list(callArgs as ohm.Node, sym("call", callArgs as ohm.Node), prop, ...args);
      };
    },
    PostfixTail_prop(_dot: OhmNode, name: OhmNode) {
      void _dot;
      return (value: PhaseBNode): PhaseBNode =>
        list(this as ohm.Node, sym("prop", this as ohm.Node), value, str(name.sourceString, name as ohm.Node));
    },
    OptionalChain(primary: OhmNode, segs: OhmIteration) {
      let acc = primary.ast();
      for (const seg of segs.asIteration().children) {
        const apply = seg.ast() as (value: PhaseBNode) => PhaseBNode;
        acc = apply(acc);
      }
      return acc;
    },
    OptionalSegment(segment: OhmNode) {
      return segment.ast();
    },
    OptionalProp_call(_dot: OhmNode, name: OhmNode, callArgs: OhmNode) {
      void _dot;
      return (value: PhaseBNode): PhaseBNode => {
        const prop = list(this as ohm.Node, sym("prop", this as ohm.Node), value, str(name.sourceString, name as ohm.Node));
        const args = callArgs.ast() as PhaseBNode[];
        return list(callArgs as ohm.Node, sym("call", callArgs as ohm.Node), prop, ...args);
      };
    },
    OptionalProp_prop(_dot: OhmNode, name: OhmNode) {
      void _dot;
      return (value: PhaseBNode): PhaseBNode =>
        list(this as ohm.Node, sym("prop", this as ohm.Node), value, str(name.sourceString, name as ohm.Node));
    },
    OptionalIndex_index(_dot: OhmNode, _open: OhmNode, expr: OhmNode, _close: OhmNode) {
      void [_dot, _open, _close];
      return (value: PhaseBNode): PhaseBNode =>
        list(this as ohm.Node, sym("index", this as ohm.Node), value, expr.ast());
    },
    OptionalCall_call(_dot: OhmNode, callArgs: OhmNode) {
      void _dot;
      return (value: PhaseBNode): PhaseBNode => {
        const args = callArgs.ast() as PhaseBNode[];
        return list(callArgs as ohm.Node, sym("call", callArgs as ohm.Node), value, ...args);
      };
    },
    CallArgs(_open: OhmNode, _sp1: OhmNode, args: OhmNode, _sp2: OhmNode, _close: OhmNode) {
      void [_open, _sp1, _sp2, _close];
      if (!args.children.length) {
        return [];
      }
      return normalizeArgs(args.ast());
    },
    ArgList(first: OhmNode, rest: OhmIteration) {
      return collectCommaSeparated(first, rest);
    },
    ArrayLit(_open: OhmNode, _sp1: OhmNode, exprs: OhmNode, _sp2: OhmNode, _close: OhmNode) {
      void [_open, _sp1, _sp2, _close];
      const items = exprs.children.length ? (exprs.ast() as PhaseBNode[]) : [];
      return list(this as ohm.Node, sym("array", this as ohm.Node), ...items);
    },
    ExprList(first: OhmNode, rest: OhmIteration) {
      return collectCommaSeparated(first, rest);
    },
    ObjectLit(_open: OhmNode, _sp1: OhmNode, entries: OhmIteration, _sp2: OhmNode, _close: OhmNode) {
      void [_open, _sp1, _sp2, _close];
      const items = entries.asIteration().children.map((child: ohm.Node) => child.ast());
      return list(this as ohm.Node, sym("object", this as ohm.Node), ...items);
    },
    ObjectEntry(entry: OhmNode) {
      return entry.ast();
    },
    ComputedEntry(_open: OhmNode, _sp1: OhmNode, key: OhmNode, _sp2: OhmNode, _close: OhmNode, _sp3: OhmNode, value: OhmNode) {
      void [_open, _sp1, _sp2, _close, _sp3];
      return list(this as ohm.Node, sym("computed", this as ohm.Node), key.ast(), value.ast());
    },
    OptionalEntry(key: OhmNode, _sp1: OhmNode, _q: OhmNode, value: OhmNode) {
      if (value.children.length) {
        return list(this as ohm.Node, sym("optional", this as ohm.Node), key.ast(), value.ast());
      }
      return list(this as ohm.Node, sym("optional", this as ohm.Node), key.ast());
    },
    OptionalValue(_sp: OhmNode, expr: OhmNode) {
      void _sp;
      return expr.ast();
    },
    KeyValueEntry(key: OhmNode, _sp1: OhmNode, _colon: OhmNode, _sp2: OhmNode, value: OhmNode) {
      return list(this as ohm.Node, key.ast(), value.ast());
    },
    ShorthandEntry(key: OhmNode) {
      const keyNode = key.ast();
      return list(this as ohm.Node, keyNode, keyNode);
    },
    Key(key: OhmNode) {
      return key.ast();
    },
    Assign(lhs: OhmNode, _sp1: OhmNode, _op: OhmNode, _sp2: OhmNode, rhs: OhmNode) {
      void [_sp1, _op, _sp2];
      return list(this as ohm.Node, sym("assign", this as ohm.Node), lhs.ast(), rhs.ast());
    },
    SetBang(_kw: OhmNode, _sp1: OhmNode, lhs: OhmNode, _sp2: OhmNode, rhs: OhmNode) {
      void [_kw, _sp1, _sp2];
      return list(this as ohm.Node, sym("assign", this as ohm.Node), lhs.ast(), rhs.ast());
    },
    Let(kind: OhmNode, _sp1: OhmNode, bindings: OhmNode, _sp2: OhmNode, body: OhmIteration) {
      void [_sp1, _sp2];
      const bindingNodes = bindings.ast() as PhaseBNode[];
      const bodyNodes = body.asIteration().children.map((child: ohm.Node) => child.ast());
      return list(this as ohm.Node, sym(kind.sourceString, kind as ohm.Node), ...bindingNodes, ...bodyNodes);
    },
    BindingList(_open: OhmNode, _sp1: OhmNode, bindings: OhmIteration, _sp2: OhmNode, _close: OhmNode) {
      void [_open, _sp1, _sp2, _close];
      return bindings.asIteration().children.map((child: ohm.Node) => child.ast());
    },
    Binding(_open: OhmNode, _sp1: OhmNode, target: OhmNode, value: OhmNode, _sp2: OhmNode, _close: OhmNode) {
      void [_open, _sp1, _sp2, _close];
      if (value.children.length) {
        return list(this as ohm.Node, sym("binding", this as ohm.Node), target.ast(), value.ast());
      }
      return list(this as ohm.Node, sym("binding", this as ohm.Node), target.ast());
    },
    BindingValue(_sp: OhmNode, expr: OhmNode) {
      void _sp;
      return expr.ast();
    },
    BindingTarget(expr: OhmNode) {
      return expr.ast();
    },
    For(_kw: OhmNode, _sp1: OhmNode, kind: OhmNode, _sp2: OhmNode, binding: OhmNode, _sp3: OhmNode, body: OhmIteration) {
      void [_kw, _sp1, _sp2, _sp3];
      const bodyNodes = body.asIteration().children.map((child: ohm.Node) => child.ast());
      return list(this as ohm.Node, sym("for", this as ohm.Node), kind.ast(), binding.ast(), ...bodyNodes);
    },
    ForKind(kind: OhmNode) {
      return sym(kind.sourceString, kind as ohm.Node);
    },
    BindingExpr(_open: OhmNode, _sp1: OhmNode, target: OhmNode, _sp2: OhmNode, expr: OhmNode, _sp3: OhmNode, _close: OhmNode) {
      void [_open, _sp1, _sp2, _sp3, _close];
      return list(this as ohm.Node, sym("binding", this as ohm.Node), target.ast(), expr.ast());
    },
    TypeDecl(_kw: OhmNode, _sp1: OhmNode, name: OhmNode, _sp2: OhmNode, typeParams: OhmNode, _sp3: OhmNode, typeExpr: OhmNode) {
      if (typeParams.children.length) {
        const params = typeParams.ast() as PhaseBNode[];
        const paramsNode = list(typeParams as ohm.Node, sym("type-params", typeParams as ohm.Node), ...params);
        return list(
          this as ohm.Node,
          sym("type", this as ohm.Node),
          sym(name.sourceString, name as ohm.Node),
          paramsNode,
          typeExpr.ast(),
        );
      }
      return list(this as ohm.Node, sym("type", this as ohm.Node), sym(name.sourceString, name as ohm.Node), typeExpr.ast());
    },
    TemplateWith(_kw: OhmNode, _sp1: OhmNode, template: OhmNode, _sp2: OhmNode, pairs: OhmIteration) {
      const items = pairs.asIteration().children.map((child: ohm.Node) => child.ast());
      return list(this as ohm.Node, sym("template-with", this as ohm.Node), template.ast(), ...items);
    },
    Pair(_open: OhmNode, _sp1: OhmNode, key: OhmNode, _sp2: OhmNode, value: OhmNode, _sp3: OhmNode, _close: OhmNode) {
      void [_open, _sp1, _sp2, _sp3, _close];
      return list(this as ohm.Node, key.ast(), value.ast());
    },
    TypeParams(_open: OhmNode, _sp1: OhmNode, first: OhmNode, rest: OhmIteration, _sp2: OhmNode, _close: OhmNode) {
      void [_open, _sp1, _sp2, _close];
      return collectCommaSeparated(first, rest);
    },
    TypeExpr(primary: OhmNode, postfixes: OhmIteration) {
      const base = primary.ast();
      const items = postfixes.asIteration().children.map((child: ohm.Node) => child.ast());
      if (items.length === 0) {
        return base;
      }
      return list(this as ohm.Node, sym("type", this as ohm.Node), base, ...items);
    },
    TypePrimary_ident(ident: OhmNode) {
      return sym(ident.sourceString, ident as ohm.Node);
    },
    TypePrimary_string(value: OhmNode) {
      return value.ast();
    },
    TypePrimary_array(_open: OhmNode, _sp1: OhmNode, first: OhmNode, rest: OhmIteration, _sp2: OhmNode, _close: OhmNode) {
      void [_open, _sp1, _sp2, _close];
      const items = collectCommaSeparated(first, rest);
      return list(this as ohm.Node, sym("type-array", this as ohm.Node), ...items);
    },
    TypePrimary_paren(_open: OhmNode, _sp1: OhmNode, value: OhmNode, _sp2: OhmNode, _close: OhmNode) {
      void [_open, _sp1, _sp2, _close];
      return value.ast();
    },
    TypePrimary_keyof(_kw: OhmNode, _sp: OhmNode, expr: OhmNode) {
      return list(this as ohm.Node, sym("keyof", this as ohm.Node), expr.ast());
    },
    TypePrimary_infer(_kw: OhmNode, _sp: OhmNode, name: OhmNode) {
      return list(this as ohm.Node, sym("infer", this as ohm.Node), sym(name.sourceString, name as ohm.Node));
    },
    TypePostfix(postfix: OhmNode) {
      return postfix.ast();
    },
    TypeArgs(_open: OhmNode, _sp1: OhmNode, first: OhmNode, rest: OhmIteration, _sp2: OhmNode, _close: OhmNode) {
      void [_open, _sp1, _sp2, _close];
      const items = collectCommaSeparated(first, rest);
      return list(this as ohm.Node, sym("type-args", this as ohm.Node), ...items);
    },
    Atom(ident: OhmNode) {
      return ident.ast();
    },
    ident(_first: OhmNode, _rest: OhmNode) {
      void [_first, _rest];
      return sym(this.sourceString, this as ohm.Node);
    },
    String(_open: OhmNode, _chars: OhmNode, _close: OhmNode) {
      void [_open, _chars, _close];
      return str(this.sourceString.slice(1, -1), this as ohm.Node);
    },
    Number(_digits: OhmNode, _fraction: OhmNode) {
      void [_digits, _fraction];
      return num(this.sourceString, this as ohm.Node);
    },
    Spacing(_chars: OhmNode) {
      void _chars;
      return null;
    },
  });

  return semantics(match).ast() as PhaseBNode[];
}

function createLocLookup(source: string, file: string) {
  const lineStarts = computeLineStarts(source);
  return (node: ohm.Node): SourceLoc => {
    const interval = node.source.startIdx !== undefined ? node.source : node.interval;
    const start = positionFromIndex(interval.startIdx, lineStarts);
    const end = positionFromIndex(interval.endIdx, lineStarts);
    return {
      file,
      line: start.line,
      column: start.column,
      endLine: end.line,
      endColumn: end.column,
    };
  };
}

function computeLineStarts(source: string): number[] {
  const starts = [0];
  for (let i = 0; i < source.length; i += 1) {
    if (source[i] === "\n") {
      starts.push(i + 1);
    }
  }
  return starts;
}

function positionFromIndex(index: number, lineStarts: number[]): { line: number; column: number } {
  let line = 0;
  while (line + 1 < lineStarts.length && lineStarts[line + 1] <= index) {
    line += 1;
  }
  return { line: line + 1, column: index - lineStarts[line] + 1 };
}
