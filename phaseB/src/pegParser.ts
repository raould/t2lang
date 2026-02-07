import * as ohm from "ohm-js";
import type { PhaseBNode, PhaseBListNode, PhaseBTypeAnnotation, SourceLoc } from "./reader.js";
import { ParseError } from "./parseError.js";
import type { TypeAst } from "./typeExpr.js";
import { parseTypeExpression } from "./typeExpr.js";
import { gensym } from "./gensym.js";
import { reportError } from "../../common/dist/errorRegistry.js";

type OhmNode = ohm.Node;
type OhmIteration = ohm.IterationNode;

const NON_CALL_HEADS = new Set([
  "program",
  "fn",
  "lambda",
  "method",
  "getter",
  "setter",
  "let",
  "let*",
  "const",
  "const*",
  "type",
  "if",
  "when",
  "for",
  "while",
  "switch",
  "try",
  "throw",
  "return",
  "class",
  "type-assert",
  "type-app",
  "type-alias",
  "interface",
  "enum",
  "namespace",
  "import",
  "export",
  "await",
  "yield",
  "yield*",
  "break",
  "continue",
  "object",
  "array",
  "call",
  "prop",
  "index",
  "new",
  "assign",
  "ternary",
  "defmacro",
  "macro",
  "quote",
  "quasiquote",
  "unquote",
  "unquote-splicing",
  "infix",
  "computed",
  "array-pattern",
  "object-pattern",
  "rest",
  "default",
]);

const CALLABLE_HEADS = new Set(["fn", "lambda", "method", "getter", "setter"]);
const CALLABLE_MODIFIERS = new Set(["async", "generator"]);

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

  Expr = TypeAnnotated

  TypeAnnotated = OptionalChain TypeAnnotationTail?
    | Postfix TypeAnnotationTail?
    | Primary TypeAnnotationTail?

  TypeAnnotationTail = Spacing ":" Spacing TypeExpr

  Primary = List
    | ArrayLit
    | ObjectLit
    | String
    | Number
    | Boolean
    | Null
    | TypeParamsExpr
    | Atom
    | Comma
    | Colon

  Postfix = Primary PostfixTail*
  PostfixTail = "." ident &"(" CallArgs -- call
             | "." ident -- prop

  OptionalChain = Primary OptionalSegment+
  OptionalSegment = OptionalProp
                 | OptionalIndex
                 | OptionalCall

  OptionalProp = "?." ident &"(" CallArgs -- call
               | "?." ident -- prop
  OptionalIndex = "?." "[" Expr "]" -- index
  OptionalCall = "?." CallArgs -- call

  CallArgs = "(" Spacing ArgList? Spacing ")"
    ArgList = Expr ArgTail*
    ArgTail = Spacing "," Spacing Expr -- comma

  ArrayLit = "[" Spacing ExprList? Spacing "]"
    ExprList = Expr ExprTail*
    ExprTail = Spacing "," Spacing Expr -- comma
      | Spacing Expr -- spaced

    ObjectLit = "{" Spacing ObjectTokens? Spacing "}"
    ObjectTokens = ObjectToken ObjectTokenTail*
    ObjectTokenTail = Spacing "," Spacing ObjectToken -- comma
        | Spacing ObjectToken -- spaced
    ObjectToken = OptionalEntry -- optional
      | KeyValueEntry -- colon
      | KeyValueShorthand -- spaced
      | Expr

    KeyValueEntry = Key Spacing ":" Spacing Expr
    KeyValueShorthand = Key Spacing Expr
    OptionalEntry = Key Spacing "?" OptionalValue?
    OptionalValue = Spacing Expr

  Key = ident | String

  Assign = Expr Spacing ":=" Spacing Expr
  SetBang = "set!" Spacing Expr Spacing Expr

  Let = LetKeyword Spacing BindingList Spacing Form*
  LetKeyword = "let" "*"? | "const" "*"?
  BindingList = "(" Spacing Binding* Spacing ")"
  Binding = "(" Spacing BindingTarget BindingValue? Spacing ")"
  BindingValue = Spacing Expr
  BindingTarget = Expr

  For = ForClassic
    | ForIter
  ForClassic = "for" Spacing "(" Spacing Expr Spacing Expr Spacing Expr Spacing ")" Spacing Form+
  ForIter = "for" Spacing ForKind Spacing BindingExpr Spacing Form+
  ForKind = "of" | "in" | "await"
  BindingExpr = "(" Spacing BindingTarget Spacing Expr Spacing ")"

  TypeDecl = "type" Spacing ident Spacing TypeParams? Spacing TypeExpr

  TemplateWith = "template-with" Spacing String Spacing Pair*
  Pair = "(" Spacing Key Spacing Expr Spacing ")"

  TypeParams = "<" Spacing ident TypeParamTail* Spacing ">"
  TypeParamTail = Spacing "," Spacing ident
  TypeExpr = TypeUnion
  TypeUnion = TypeIntersection TypeUnionTail*
  TypeUnionTail = Spacing "|" Spacing TypeIntersection
  TypeIntersection = TypePostfix TypeIntersectionTail*
  TypeIntersectionTail = Spacing "&" Spacing TypePostfix
  TypePostfix = TypePrimary TypePostfixTail*
  TypePostfixTail = "[]" | "?" | TypeArgs | TypeIndex
  TypeIndex = "[" Spacing TypeExpr Spacing "]"
  TypeArgs = "<" Spacing TypeExpr TypeArgTail* Spacing ">"
  TypeArgTail = Spacing "," Spacing TypeExpr
  TypePrimary = ident  -- ident
    | String -- string
    | "(" Spacing TypeExpr Spacing ")" -- paren
    | "[" Spacing TypeExpr TypeExprTail* Spacing "]" -- tuple
    | "keyof" Spacing TypeExpr -- keyof
    | "infer" Spacing ident -- infer
    | "typeof" Spacing ident -- typeof
  TypeExprTail = Spacing "," Spacing TypeExpr

  Atom = SpreadIdent | YieldStar | operator | ident
  SpreadIdent = "..." ident
  YieldStar = "yield*"
  operator = operatorChar+
  operatorChar = "!" | "$" | "%" | "&" | "*" | "+" | "." | "/" | "<" | "=" | ">" | "?" | "@" | "^" | "|" | "~" | "-"
  Boolean = "true" | "false"
  Null = "null"
  Comma = ","
  Colon = ":"
  TypeParamsExpr = "<" Spacing ident TypeParamTail* Spacing ">"

  ident = (letter | "_") (letter | digit | "_" | "-" | "*" )*
  String = "\"" (~"\"" any)* "\""
  Number = number
  number = digit+ fraction?
  fraction = "." digit+

  Spacing = (space | "\n" | "\t")*
}
`;

export function parsePhaseBPeg(source: string, file = "<input>"): PhaseBNode[] {
  const grammar = ohm.grammar(GRAMMAR_SOURCE);
  const lineStarts = computeLineStarts(source);
  const locLookup = createLocLookupWithLineStarts(source, file, lineStarts);
  const locFromIndex = createLocFromIndex(lineStarts, file);
  const preScanError = detectParseError(source, locFromIndex);
  if (preScanError) {
    throw preScanError;
  }
  const match = grammar.match(source);
  if (!match.succeeded()) {
    const failurePos =
      (match as unknown as { getRightmostFailurePosition?: () => number }).getRightmostFailurePosition?.() ?? 0;
    throw new ParseError("PEG parse failed", locFromIndex(failurePos), "E001");
  }
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
  const listFromLoc = (loc: SourceLoc, ...elements: PhaseBNode[]): PhaseBListNode => ({
    kind: "list",
    elements,
    loc,
    delimiter: "(",
    phaseKind: "list",
  });
  const symFromLoc = (name: string, loc: SourceLoc): PhaseBNode => ({
    kind: "symbol",
    name,
    loc,
    phaseKind: "symbol",
  });
  const strFromLoc = (value: string, loc: SourceLoc): PhaseBNode => ({
    kind: "literal",
    value,
    loc,
    phaseKind: "literal",
  });
  const unwrapNode = (value: unknown): PhaseBNode => {
    if (Array.isArray(value)) {
      if (value.length === 0) {
        throw new Error("Missing AST node");
      }
      return unwrapNode(value[0] as PhaseBNode);
    }
    return value as PhaseBNode;
  };
  const decodeStringLiteral = (raw: string): string => {
    let value = "";
    for (let i = 0; i < raw.length; i += 1) {
      const ch = raw[i];
      if (ch !== "\\") {
        value += ch;
        continue;
      }
      const next = raw[i + 1];
      if (!next) {
        break;
      }
      switch (next) {
        case "n":
          value += "\n";
          break;
        case "r":
          value += "\r";
          break;
        case "t":
          value += "\t";
          break;
        case "\"":
          value += "\"";
          break;
        case "\\":
          value += "\\";
          break;
        default:
          value += next;
          break;
      }
      i += 1;
    }
    return value;
  };
  const normalizeObjectKey = (node: PhaseBNode): PhaseBNode => {
    if (node.phaseKind === "symbol") {
      return strFromLoc((node as { name: string }).name, node.loc);
    }
    if (node.phaseKind === "literal") {
      const literal = node as { value: string | number | boolean | null };
      if (typeof literal.value === "string") {
        return strFromLoc(literal.value, node.loc);
      }
    }
    return node;
  };
  const normalizeObjectEntries = (entries: PhaseBNode[]): PhaseBNode[] => {
    const rewritten: PhaseBNode[] = [];
    let idx = 0;
    while (idx < entries.length) {
      const entry = entries[idx];
      const nextEntry = entries[idx + 1];
      if (entry.phaseKind === "list") {
        const listEntry = entry as PhaseBListNode;
        const head = listEntry.elements[0];
        if (
          head &&
          head.phaseKind === "symbol" &&
          (head as { name: string }).name === "array" &&
          listEntry.elements.length === 2 &&
          nextEntry
        ) {
          const computedSymbol = { kind: "symbol", name: "computed", loc: listEntry.loc, phaseKind: "symbol" } as PhaseBNode;
          rewritten.push(listFromLoc(listEntry.loc, computedSymbol, listEntry.elements[1], nextEntry));
          idx += 2;
          continue;
        }
        rewritten.push(entry);
        idx += 1;
        continue;
      }
      if (entry.phaseKind === "symbol") {
        if (nextEntry && nextEntry.phaseKind !== "symbol") {
          const nextIsString =
            nextEntry.phaseKind === "literal" && typeof (nextEntry as { value: unknown }).value === "string";
          const hasMore = idx + 2 < entries.length;
          if (!nextIsString || !hasMore) {
            const keyLiteral = strFromLoc((entry as { name: string }).name, entry.loc);
            rewritten.push(listFromLoc(entry.loc, keyLiteral, nextEntry));
            idx += 2;
            continue;
          }
        }
        const keyLiteral = strFromLoc((entry as { name: string }).name, entry.loc);
        rewritten.push(listFromLoc(entry.loc, keyLiteral, entry));
        idx += 1;
        continue;
      }
      if (entry.phaseKind === "literal" && typeof (entry as { value: unknown }).value === "string") {
        if (!nextEntry) {
          throw new Error("object literal key requires a value");
        }
        const keyLiteral = normalizeObjectKey(entry);
        rewritten.push(listFromLoc(entry.loc, keyLiteral, nextEntry));
        idx += 2;
        continue;
      }
      rewritten.push(entry);
      idx += 1;
    }
    return rewritten;
  };
  const normalizeArgs = (value: unknown): PhaseBNode[] => {
    if (!Array.isArray(value)) {
      return [];
    }
    if (value.length === 1 && Array.isArray(value[0])) {
      return (value[0] as PhaseBNode[]).map(unwrapNode);
    }
    return (value as PhaseBNode[]).map(unwrapNode);
  };
  const normalizeNodes = (value: unknown): PhaseBNode[] => {
    if (!Array.isArray(value)) {
      return [];
    }
    if (value.length === 1 && Array.isArray(value[0])) {
      return (value[0] as PhaseBNode[]).map(unwrapNode);
    }
    return (value as PhaseBNode[]).map(unwrapNode);
  };
  const collectCommaSeparated = (first: ohm.Node, rest: ohm.IterationNode): PhaseBNode[] => {
    const tail = normalizeNodes(rest.ast());
    return [unwrapNode(first.ast()), ...tail];
  };
  const buildTypeList = (name: string, args: PhaseBNode[], loc: SourceLoc): PhaseBListNode =>
    listFromLoc(loc, symFromLoc(name, loc), ...args);
  const typeAstToPhaseB = (ast: TypeAst, loc: SourceLoc): PhaseBNode => {
    switch (ast.kind) {
      case "primitive":
        return buildTypeList("t:primitive", [strFromLoc(ast.name, loc)], loc);
      case "ref":
        return buildTypeList("t:ref", [strFromLoc(ast.name, loc)], loc);
      case "array":
        return buildTypeList("t:array", [typeAstToPhaseB(ast.element, loc)], loc);
      case "nullable":
        return buildTypeList("t:nullable", [typeAstToPhaseB(ast.inner, loc)], loc);
      case "tuple":
        return buildTypeList(
          "t:tuple",
          ast.elements.map((element) => typeAstToPhaseB(element, loc)),
          loc,
        );
      case "union":
        return buildTypeList(
          "t:union",
          ast.options.map((option) => typeAstToPhaseB(option, loc)),
          loc,
        );
      case "intersection":
        return buildTypeList(
          "t:intersection",
          ast.options.map((option) => typeAstToPhaseB(option, loc)),
          loc,
        );
      case "apply":
        return buildTypeList(
          "t:apply",
          [typeAstToPhaseB(ast.base, loc), ...ast.args.map((arg) => typeAstToPhaseB(arg, loc))],
          loc,
        );
      case "keyof":
        return buildTypeList("t:keyof", [typeAstToPhaseB(ast.target, loc)], loc);
      case "typeof":
        return buildTypeList("t:typeof", [symFromLoc(ast.expr, loc)], loc);
      case "indexed":
        return buildTypeList(
          "t:indexed",
          [typeAstToPhaseB(ast.object, loc), typeAstToPhaseB(ast.index, loc)],
          loc,
        );
      case "conditional":
        return buildTypeList(
          "t:conditional",
          [
            typeAstToPhaseB(ast.check, loc),
            typeAstToPhaseB(ast.extends, loc),
            typeAstToPhaseB(ast.trueType, loc),
            typeAstToPhaseB(ast.falseType, loc),
          ],
          loc,
        );
      case "infer":
        return buildTypeList("t:infer", [symFromLoc(ast.name, loc)], loc);
      case "literal":
        return buildTypeList("t:literal", [{ kind: "literal", value: ast.value, loc, phaseKind: "literal" }], loc);
    }
  };
  const buildTypeParamsList = (params: PhaseBNode[], loc: SourceLoc): PhaseBListNode => {
    const normalized = normalizeNodes(params);
    return listFromLoc(loc, symFromLoc("typeparams", loc), ...normalized);
  };
  const unwrapCallList = (node: PhaseBNode): PhaseBNode => {
    if (node.phaseKind !== "list") {
      return node;
    }
    const listNode = node as PhaseBListNode;
    const head = listNode.elements[0];
    if (head && head.phaseKind === "symbol" && (head as { name: string }).name === "call") {
      return { ...listNode, elements: listNode.elements.slice(1) };
    }
    return node;
  };
  const unwrapSingleList = (node: PhaseBNode): PhaseBNode => {
    if (node.phaseKind !== "list") {
      return node;
    }
    const listNode = node as PhaseBListNode;
    if (listNode.elements.length === 1) {
      return listNode.elements[0];
    }
    return node;
  };
  const TEMPLATE_PLACEHOLDER = /^[A-Za-z_][A-Za-z0-9_-]*$/;
  const buildTemplateParts = (template: string, loc: SourceLoc, keySymbols: Map<string, PhaseBNode>): PhaseBNode[] => {
    const parts: PhaseBNode[] = [];
    let cursor = 0;
    while (cursor < template.length) {
      const start = template.indexOf("${", cursor);
      if (start < 0) {
        const tail = template.slice(cursor);
        if (tail.length > 0) {
          parts.push(strFromLoc(tail, loc));
        }
        break;
      }
      const prefix = template.slice(cursor, start);
      if (prefix.length > 0) {
        parts.push(strFromLoc(prefix, loc));
      }
      const end = template.indexOf("}", start + 2);
      if (end < 0) {
        throw reportError("T2:0318", loc);
      }
      const placeholder = template.slice(start + 2, end).trim();
      if (!TEMPLATE_PLACEHOLDER.test(placeholder)) {
        throw reportError("T2:0317", { placeholder }, loc);
      }
      const symbol = keySymbols.get(placeholder);
      if (!symbol) {
        throw reportError("T2:0316", { key: placeholder }, loc);
      }
      parts.push(symbol);
      cursor = end + 1;
    }
    return parts;
  };
  const normalizeOptionalValue = (keyNode: PhaseBNode, valueNode?: PhaseBNode): PhaseBNode => {
    if (valueNode) {
      return valueNode;
    }
    if (keyNode.phaseKind === "symbol") {
      return keyNode;
    }
    throw reportError("T2:0222", keyNode.loc);
  };
  const createOptionalObjectEntry = (keyNode: PhaseBNode, valueNode: PhaseBNode, loc: SourceLoc): PhaseBListNode => {
    const condition = listFromLoc(
      loc,
      symFromLoc("!=", loc),
      valueNode,
      { kind: "literal", value: null, loc, phaseKind: "literal" },
    );
    const field = listFromLoc(loc, normalizeObjectKey(keyNode), valueNode);
    const objectNode = listFromLoc(loc, symFromLoc("object", loc), field);
    const emptyObject = listFromLoc(loc, symFromLoc("object", loc));
    const conditional = listFromLoc(loc, symFromLoc("if", loc), condition, objectNode, emptyObject);
    return listFromLoc(loc, symFromLoc("spread", loc), symFromLoc("object", loc), conditional);
  };
  const normalizeCallableArgs = (headName: string, args: PhaseBNode[]): PhaseBNode[] => {
    let index = 0;
    while (index < args.length && args[index].phaseKind === "symbol" && CALLABLE_MODIFIERS.has((args[index] as { name: string }).name)) {
      index += 1;
    }
    if (headName === "fn" && args[index]?.phaseKind === "symbol") {
      index += 1;
    } else if ((headName === "method" || headName === "getter" || headName === "setter") && args[index]?.phaseKind === "symbol") {
      index += 1;
    }

    let typeParamsNode: PhaseBNode | undefined;
    let returnTypeNode: PhaseBNode | undefined;
    let signatureIndex = args.findIndex(
      (entry, idx) => idx >= index && (entry.phaseKind === "list" || entry.phaseKind === "type-annotation")
    );
    if (signatureIndex === -1) {
      return args;
    }

    if (args[index] && args[index].phaseKind === "list") {
      const listNode = args[index] as PhaseBListNode;
      const head = listNode.elements[0];
      if (head && head.phaseKind === "symbol" && (head as { name: string }).name === "typeparams") {
        typeParamsNode = listNode;
        args = args.filter((_, idx) => idx !== index);
        signatureIndex = args.findIndex(
          (entry, idx) => idx >= index && (entry.phaseKind === "list" || entry.phaseKind === "type-annotation")
        );
      }
    }

    if (signatureIndex >= 0) {
      let rawSignature = unwrapCallList(unwrapNode(args[signatureIndex]));
      if (rawSignature.phaseKind === "type-annotation") {
        const annotation = rawSignature as PhaseBTypeAnnotation;
        returnTypeNode = unwrapNode(annotation.annotation);
        rawSignature = unwrapNode(annotation.target);
      }
      const signatureNode = (() => {
        if (rawSignature.phaseKind !== "list") {
          return rawSignature;
        }
        const listNode = rawSignature as PhaseBListNode;
        const elements = listNode.elements.map((entry) => unwrapSingleList(unwrapCallList(entry)));
        return { ...listNode, elements } as PhaseBNode;
      })();
      args = [...args.slice(0, signatureIndex), signatureNode, ...args.slice(signatureIndex + 1)];
    }

    if (typeParamsNode && signatureIndex >= 0) {
      const marker = symFromLoc(":type-params", typeParamsNode.loc);
      args = [...args.slice(0, signatureIndex + 1), marker, typeParamsNode, ...args.slice(signatureIndex + 1)];
    }
    if (returnTypeNode && signatureIndex >= 0) {
      const marker = symFromLoc(":", returnTypeNode.loc);
      const insertIndex = signatureIndex + 1 + (typeParamsNode ? 2 : 0);
      args = [...args.slice(0, insertIndex), marker, returnTypeNode, ...args.slice(insertIndex)];
    }
    return args;
  };
  const normalizeLetBindings = (args: PhaseBNode[]): PhaseBNode[] => {
    if (args.length === 0) {
      return args;
    }
    const [bindings, ...rest] = args;
    if (!bindings || bindings.phaseKind !== "list") {
      return args;
    }
    const bindingList = bindings as PhaseBListNode;
    let elements = bindingList.elements;
    const listHead = elements[0];
    if (listHead && listHead.phaseKind === "symbol" && (listHead as { name: string }).name === "call") {
      elements = elements.slice(1);
    }
    const normalizedEntries = elements.map((entry) => {
      if (entry.phaseKind !== "list") {
        return entry;
      }
      const listEntry = entry as PhaseBListNode;
      const entryHead = listEntry.elements[0];
      if (entryHead && entryHead.phaseKind === "symbol" && (entryHead as { name: string }).name === "call") {
        return { ...listEntry, elements: listEntry.elements.slice(1) };
      }
      return listEntry;
    });
    const normalizedBindings: PhaseBListNode = { ...bindingList, elements: normalizedEntries };
    return [normalizedBindings, ...rest];
  };
  const semantics = grammar.createSemantics().addOperation("ast", {
    _iter(...children: OhmNode[]) {
      return children.map((child) => child.ast());
    },
    Program(_sp: OhmNode, forms: OhmIteration) {
      const nodes: PhaseBNode[] = [];
      for (const child of forms.asIteration().children) {
        const value = child.ast();
        if (!value) {
          continue;
        }
        if (Array.isArray(value)) {
          nodes.push(...(value as PhaseBNode[]).map(unwrapNode));
        } else {
          nodes.push(unwrapNode(value));
        }
      }
      return nodes;
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
      const value = unwrapNode(body.ast());
      if (value && value.phaseKind === "list") {
        return { ...(value as PhaseBListNode), loc: locLookup(this as ohm.Node) };
      }
      return value;
    },
    ListBody(form: OhmNode) {
      return form.ast();
    },
    Call_implicitCall(exprs: OhmIteration) {
      const items = exprs.asIteration().children.map((child: ohm.Node) => unwrapNode(child.ast()));
      const [head, ...args] = items;
      if (head && head.phaseKind === "symbol") {
        const headName = (head as { name: string }).name;
        if (headName === "not") {
          if (args.length !== 1) {
            throw reportError("T2:0322", (head as PhaseBNode).loc);
          }
          return list(this as ohm.Node, sym("call", this as ohm.Node), sym("!", this as ohm.Node), args[0]);
        }
        if (headName === "and" || headName === "or") {
          if (args.length === 0) {
            throw reportError("T2:0323", { operator: headName }, (head as PhaseBNode).loc);
          }
          const op = headName === "and" ? "&&" : "||";
          return list(this as ohm.Node, sym("call", this as ohm.Node), sym(op, this as ohm.Node), ...args);
        }
      }
      if (head && head.phaseKind === "symbol" && NON_CALL_HEADS.has((head as { name: string }).name)) {
        const headName = (head as { name: string }).name;
        let normalizedArgs = args;
        if (CALLABLE_HEADS.has(headName)) {
          normalizedArgs = normalizeCallableArgs(headName, args);
        }
        if (headName === "let" || headName === "let*" || headName === "const" || headName === "const*") {
          normalizedArgs = normalizeLetBindings(normalizedArgs);
        }
        if (headName === "infix" && normalizedArgs.length === 1) {
          const onlyArg = normalizedArgs[0];
          if (onlyArg && onlyArg.phaseKind === "list") {
            const listArg = onlyArg as PhaseBListNode;
            const listHead = listArg.elements[0];
            if (listHead && listHead.phaseKind === "symbol" && (listHead as { name: string }).name === "call") {
              normalizedArgs = [{ ...listArg, elements: listArg.elements.slice(1) }];
            }
          }
        }
        if (headName === "object") {
          const normalized = normalizeObjectEntries(normalizedArgs as PhaseBNode[]);
          return list(this as ohm.Node, head, ...normalized);
        }
        return list(this as ohm.Node, head, ...normalizedArgs);
      }
      if (head && head.phaseKind === "literal") {
        return list(this as ohm.Node, head, ...args);
      }
      if (head && head.phaseKind === "type-annotation") {
        return list(this as ohm.Node, head, ...args);
      }
      return list(this as ohm.Node, sym("call", this as ohm.Node), head, ...args);
    },
    Expr(expr: OhmNode) {
      return expr.ast();
    },
    TypeAnnotated(expr: OhmNode, tail: OhmNode) {
      const target = unwrapNode(expr.ast());
      if (!tail.children.length) {
        return target;
      }
      const annotation = unwrapNode(tail.ast());
      return {
        phaseKind: "type-annotation",
        kind: "list",
        elements: [target, annotation],
        target,
        annotation,
        loc: locLookup(this as ohm.Node),
      } as PhaseBNode;
    },
    TypeAnnotationTail(_sp1: OhmNode, _colon: OhmNode, _sp2: OhmNode, annotation: OhmNode) {
      void [_sp1, _colon, _sp2];
      return annotation.ast();
    },
    Primary(expr: OhmNode) {
      return expr.ast();
    },
    Postfix(primary: OhmNode, segs: OhmIteration) {
      let acc = unwrapNode(primary.ast());
      for (const seg of segs.asIteration().children) {
        const apply = seg.ast() as (value: PhaseBNode) => PhaseBNode;
        acc = apply(acc);
      }
      return acc;
    },
    PostfixTail_call(_dot: OhmNode, name: OhmNode, _open: OhmNode, callArgs: OhmNode) {
      void [_dot, _open];
      return (value: PhaseBNode): PhaseBNode => {
        const prop = list(this as ohm.Node, sym("prop", this as ohm.Node), value, sym(name.sourceString, name as ohm.Node));
        const args = callArgs.ast() as PhaseBNode[];
        return list(callArgs as ohm.Node, sym("call", callArgs as ohm.Node), prop, ...args);
      };
    },
    PostfixTail_prop(_dot: OhmNode, name: OhmNode) {
      void _dot;
      return (value: PhaseBNode): PhaseBNode =>
        list(this as ohm.Node, sym("prop", this as ohm.Node), value, sym(name.sourceString, name as ohm.Node));
    },
    OptionalChain(primary: OhmNode, segs: OhmIteration) {
      let acc = unwrapNode(primary.ast());
      for (const seg of segs.asIteration().children) {
        const apply = seg.ast() as (value: PhaseBNode) => PhaseBNode;
        acc = apply(acc);
      }
      return acc;
    },
    OptionalSegment(segment: OhmNode) {
      return segment.ast();
    },
    OptionalProp_call(_dot: OhmNode, name: OhmNode, _open: OhmNode, callArgs: OhmNode) {
      void [_dot, _open];
      return (value: PhaseBNode): PhaseBNode => {
        const prop = list(this as ohm.Node, sym("prop", this as ohm.Node), value, sym(name.sourceString, name as ohm.Node));
        const args = callArgs.ast() as PhaseBNode[];
        return list(callArgs as ohm.Node, sym("call", callArgs as ohm.Node), prop, ...args);
      };
    },
    OptionalProp_prop(_dot: OhmNode, name: OhmNode) {
      void _dot;
      return (value: PhaseBNode): PhaseBNode =>
        list(this as ohm.Node, sym("prop", this as ohm.Node), value, sym(name.sourceString, name as ohm.Node));
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
    ArgTail_comma(_sp1: OhmNode, _comma: OhmNode, _sp2: OhmNode, expr: OhmNode) {
      void [_sp1, _comma, _sp2];
      return unwrapNode(expr.ast());
    },
    ArrayLit(_open: OhmNode, _sp1: OhmNode, exprs: OhmNode, _sp2: OhmNode, _close: OhmNode) {
      void [_open, _sp1, _sp2, _close];
      const items = exprs.children.length ? normalizeNodes(exprs.ast()) : [];
      if (items[0] && items[0].phaseKind === "symbol" && (items[0] as { name: string }).name === ",") {
        throw new ParseError("PEG parse failed", locLookup(this as ohm.Node), "E001");
      }
      return list(this as ohm.Node, sym("array", this as ohm.Node), ...items);
    },
    ExprList(first: OhmNode, rest: OhmIteration) {
      return collectCommaSeparated(first, rest);
    },
    ExprTail_comma(_sp1: OhmNode, _comma: OhmNode, _sp2: OhmNode, expr: OhmNode) {
      void [_sp1, _comma, _sp2];
      return unwrapNode(expr.ast());
    },
    ExprTail_spaced(_sp1: OhmNode, expr: OhmNode) {
      void _sp1;
      return unwrapNode(expr.ast());
    },
    ObjectLit(_open: OhmNode, _sp1: OhmNode, entries: OhmNode, _sp2: OhmNode, _close: OhmNode) {
      void [_open, _sp1, _sp2, _close];
      const rawItems = entries.children.length ? normalizeNodes(entries.ast()) : [];
      const items = normalizeObjectEntries(rawItems);
      return list(this as ohm.Node, sym("object", this as ohm.Node), ...items);
    },
    ObjectTokens(first: OhmNode, rest: OhmIteration) {
      return collectCommaSeparated(first, rest);
    },
    ObjectTokenTail_comma(_sp1: OhmNode, _comma: OhmNode, _sp2: OhmNode, entry: OhmNode) {
      void [_sp1, _comma, _sp2];
      return unwrapNode(entry.ast());
    },
    ObjectTokenTail_spaced(_sp1: OhmNode, entry: OhmNode) {
      void _sp1;
      return unwrapNode(entry.ast());
    },
    ObjectToken(entry: OhmNode) {
      return unwrapNode(entry.ast());
    },
    KeyValueEntry(key: OhmNode, _sp1: OhmNode, _colon: OhmNode, _sp2: OhmNode, value: OhmNode) {
      const keyNode = normalizeObjectKey(key.ast() as PhaseBNode);
      return list(this as ohm.Node, keyNode, unwrapNode(value.ast()));
    },
    KeyValueShorthand(key: OhmNode, _sp: OhmNode, value: OhmNode) {
      void _sp;
      const keyNode = normalizeObjectKey(key.ast() as PhaseBNode);
      return list(this as ohm.Node, keyNode, unwrapNode(value.ast()));
    },
    OptionalEntry(key: OhmNode, _sp: OhmNode, _q: OhmNode, value: OhmNode) {
      void [_sp, _q];
      const keyNode = unwrapNode(key.ast());
      const valueNode = value.children.length ? unwrapNode(value.ast()) : normalizeOptionalValue(keyNode);
      return createOptionalObjectEntry(keyNode, valueNode, locLookup(this as ohm.Node));
    },
    OptionalValue(_sp: OhmNode, expr: OhmNode) {
      void _sp;
      return unwrapNode(expr.ast());
    },
    Key(key: OhmNode) {
      return unwrapNode(key.ast());
    },
    Assign(lhs: OhmNode, _sp1: OhmNode, _op: OhmNode, _sp2: OhmNode, rhs: OhmNode) {
      void [_sp1, _op, _sp2];
      return list(this as ohm.Node, sym("assign", this as ohm.Node), unwrapNode(lhs.ast()), unwrapNode(rhs.ast()));
    },
    SetBang(_kw: OhmNode, _sp1: OhmNode, lhs: OhmNode, _sp2: OhmNode, rhs: OhmNode) {
      void [_kw, _sp1, _sp2];
      return list(this as ohm.Node, sym("assign", this as ohm.Node), unwrapNode(lhs.ast()), unwrapNode(rhs.ast()));
    },
    Let(kind: OhmNode, _sp1: OhmNode, bindings: OhmNode, _sp2: OhmNode, body: OhmIteration) {
      void [_sp1, _sp2];
      const bindingList = unwrapNode(bindings.ast());
      const bodyNodes = body.asIteration().children.map((child: ohm.Node) => unwrapNode(child.ast()));
      return list(this as ohm.Node, sym(kind.sourceString, kind as ohm.Node), bindingList, ...bodyNodes);
    },
    BindingList(_open: OhmNode, _sp1: OhmNode, bindings: OhmIteration, _sp2: OhmNode, _close: OhmNode) {
      void [_open, _sp1, _sp2, _close];
      const entries = bindings.asIteration().children.map((child: ohm.Node) => unwrapNode(child.ast()));
      return list(this as ohm.Node, ...entries);
    },
    Binding(_open: OhmNode, _sp1: OhmNode, target: OhmNode, value: OhmNode, _sp2: OhmNode, _close: OhmNode) {
      void [_open, _sp1, _sp2, _close];
      const targetNode = unwrapSingleList(unwrapCallList(unwrapNode(target.ast())));
      if (value.children.length) {
        return list(this as ohm.Node, targetNode, unwrapNode(value.ast()));
      }
      return list(this as ohm.Node, targetNode);
    },
    BindingValue(_sp: OhmNode, expr: OhmNode) {
      void _sp;
      return unwrapNode(expr.ast());
    },
    BindingTarget(expr: OhmNode) {
      return unwrapNode(expr.ast());
    },
    ForClassic(
      _kw: OhmNode,
      _sp1: OhmNode,
      _open: OhmNode,
      _sp2: OhmNode,
      init: OhmNode,
      _sp3: OhmNode,
      condition: OhmNode,
      _sp4: OhmNode,
      update: OhmNode,
      _sp5: OhmNode,
      _close: OhmNode,
      _sp6: OhmNode,
      body: OhmIteration,
    ) {
      void [_kw, _sp1, _open, _sp2, _sp3, _sp4, _sp5, _close, _sp6];
      const clauses = list(
        this as ohm.Node,
        unwrapNode(init.ast()),
        unwrapNode(condition.ast()),
        unwrapNode(update.ast()),
      );
      const bodyNodes = body.asIteration().children.map((child: ohm.Node) => unwrapNode(child.ast()));
      return list(this as ohm.Node, sym("for", this as ohm.Node), clauses, ...bodyNodes);
    },
    ForIter(_kw: OhmNode, _sp1: OhmNode, kind: OhmNode, _sp2: OhmNode, binding: OhmNode, _sp3: OhmNode, body: OhmIteration) {
      void [_kw, _sp1, _sp2, _sp3];
      const bodyNodes = body.asIteration().children.map((child: ohm.Node) => unwrapNode(child.ast()));
      return list(this as ohm.Node, sym("for", this as ohm.Node), unwrapNode(kind.ast()), unwrapNode(binding.ast()), ...bodyNodes);
    },
    ForKind(kind: OhmNode) {
      return sym(kind.sourceString, kind as ohm.Node);
    },
    BindingExpr(_open: OhmNode, _sp1: OhmNode, target: OhmNode, _sp2: OhmNode, expr: OhmNode, _sp3: OhmNode, _close: OhmNode) {
      void [_open, _sp1, _sp2, _sp3, _close];
      const targetNode = unwrapSingleList(unwrapCallList(unwrapNode(target.ast())));
      return list(this as ohm.Node, targetNode, unwrapNode(expr.ast()));
    },
    TypeDecl(_kw: OhmNode, _sp1: OhmNode, name: OhmNode, _sp2: OhmNode, typeParams: OhmNode, _sp3: OhmNode, typeExpr: OhmNode) {
      const typeValue = unwrapNode(typeExpr.ast());
      if (typeParams.children.length) {
        const params = typeParams.ast() as PhaseBNode[];
        const paramsNode = buildTypeParamsList(params, locLookup(typeParams as ohm.Node));
        return list(
          this as ohm.Node,
          sym("type-alias", this as ohm.Node),
          sym(name.sourceString, name as ohm.Node),
          symFromLoc(":type-params", paramsNode.loc),
          paramsNode,
          typeValue,
        );
      }
      return list(
        this as ohm.Node,
        sym("type-alias", this as ohm.Node),
        sym(name.sourceString, name as ohm.Node),
        typeValue,
      );
    },
    TemplateWith(_kw: OhmNode, _sp1: OhmNode, template: OhmNode, _sp2: OhmNode, pairs: OhmIteration) {
      const loc = locLookup(this as ohm.Node);
      const templateNode = unwrapNode(template.ast());
      if (!(templateNode.phaseKind === "literal" && typeof (templateNode as { value: unknown }).value === "string")) {
        throw reportError("T2:0313", templateNode.loc ?? loc);
      }
      const templateText = (templateNode as { value: string }).value;
      const keySymbols = new Map<string, PhaseBNode>();
      const params: PhaseBNode[] = [];
      const args: PhaseBNode[] = [];
      for (const pair of pairs.asIteration().children.map((child: ohm.Node) => unwrapNode(child.ast()))) {
        if (pair.phaseKind !== "list") {
          throw reportError("T2:0314", pair.loc ?? locLookup(this as ohm.Node));
        }
        const pairList = pair as PhaseBListNode;
        if (pairList.elements.length !== 2) {
          throw reportError("T2:0314", pairList.loc);
        }
        const keyNode = pairList.elements[0];
        let keyName: string | null = null;
        if (keyNode.phaseKind === "symbol") {
          keyName = (keyNode as { name: string }).name;
        } else if (keyNode.phaseKind === "literal" && typeof (keyNode as { value: unknown }).value === "string") {
          keyName = (keyNode as { value: string }).value;
        }
        if (!keyName) {
          throw reportError("T2:0314", pairList.loc);
        }
        if (keySymbols.has(keyName)) {
          throw reportError("T2:0319", { key: keyName }, pairList.loc);
        }
        const valueNode = pairList.elements[1];
        if (!(valueNode.phaseKind === "literal")) {
          throw reportError("T2:0315", valueNode.loc);
        }
        const paramSymbol = symFromLoc(gensym("tmpl_"), pairList.loc);
        keySymbols.set(keyName, paramSymbol);
        params.push(listFromLoc(pairList.loc, paramSymbol));
        args.push(valueNode);
      }
      const parts = buildTemplateParts(templateText, templateNode.loc, keySymbols);
      const templateList = listFromLoc(loc, symFromLoc("template", loc), ...parts);
      const returnList = listFromLoc(loc, symFromLoc("return", loc), templateList);
      const signatureList = listFromLoc(loc, ...params);
      const lambdaList = listFromLoc(loc, symFromLoc("lambda", loc), signatureList, returnList);
      return listFromLoc(loc, symFromLoc("call", loc), lambdaList, ...args);
    },
    Pair(_open: OhmNode, _sp1: OhmNode, key: OhmNode, _sp2: OhmNode, value: OhmNode, _sp3: OhmNode, _close: OhmNode) {
      void [_open, _sp1, _sp2, _sp3, _close];
      return list(this as ohm.Node, unwrapNode(key.ast()), unwrapNode(value.ast()));
    },
    TypeParams(_open: OhmNode, _sp1: OhmNode, first: OhmNode, rest: OhmIteration, _sp2: OhmNode, _close: OhmNode) {
      void [_open, _sp1, _sp2, _close];
      return collectCommaSeparated(first, rest);
    },
    TypeParamTail(_sp1: OhmNode, _comma: OhmNode, _sp2: OhmNode, name: OhmNode) {
      void [_sp1, _comma, _sp2];
      return unwrapNode(name.ast());
    },
    TypeParamsExpr(_open: OhmNode, _sp1: OhmNode, first: OhmNode, rest: OhmIteration, _sp2: OhmNode, _close: OhmNode) {
      void [_open, _sp1, _sp2, _close];
      const params = collectCommaSeparated(first, rest);
      return buildTypeParamsList(params, locLookup(this as ohm.Node));
    },
    TypeExpr(_expr: OhmNode) {
      void _expr;
      const raw = this.sourceString.trim();
      const ast = parseTypeExpression(raw);
      return typeAstToPhaseB(ast, locLookup(this as ohm.Node));
    },
    TypeUnion(_first: OhmNode, _rest: OhmIteration) {
      void [_first, _rest];
      return null;
    },
    TypeUnionTail(_sp1: OhmNode, _pipe: OhmNode, _sp2: OhmNode, _expr: OhmNode) {
      void [_sp1, _pipe, _sp2, _expr];
      return null;
    },
    TypeIntersection(_first: OhmNode, _rest: OhmIteration) {
      void [_first, _rest];
      return null;
    },
    TypeIntersectionTail(_sp1: OhmNode, _amp: OhmNode, _sp2: OhmNode, _expr: OhmNode) {
      void [_sp1, _amp, _sp2, _expr];
      return null;
    },
    TypePostfix(_primary: OhmNode, _rest: OhmIteration) {
      void [_primary, _rest];
      return null;
    },
    TypePostfixTail(_tail: OhmNode) {
      void _tail;
      return null;
    },
    TypeIndex(_open: OhmNode, _sp1: OhmNode, _expr: OhmNode, _sp2: OhmNode, _close: OhmNode) {
      void [_open, _sp1, _expr, _sp2, _close];
      return null;
    },
    TypeArgs(_open: OhmNode, _sp1: OhmNode, _expr: OhmNode, _rest: OhmIteration, _sp2: OhmNode, _close: OhmNode) {
      void [_open, _sp1, _expr, _rest, _sp2, _close];
      return null;
    },
    TypeArgTail(_sp1: OhmNode, _comma: OhmNode, _sp2: OhmNode, _expr: OhmNode) {
      void [_sp1, _comma, _sp2, _expr];
      return null;
    },
    TypePrimary_ident(_ident: OhmNode) {
      void _ident;
      return null;
    },
    TypePrimary_string(_value: OhmNode) {
      void _value;
      return null;
    },
    TypePrimary_paren(_open: OhmNode, _sp1: OhmNode, _expr: OhmNode, _sp2: OhmNode, _close: OhmNode) {
      void [_open, _sp1, _expr, _sp2, _close];
      return null;
    },
    TypePrimary_tuple(_open: OhmNode, _sp1: OhmNode, _expr: OhmNode, _rest: OhmIteration, _sp2: OhmNode, _close: OhmNode) {
      void [_open, _sp1, _expr, _rest, _sp2, _close];
      return null;
    },
    TypePrimary_keyof(_kw: OhmNode, _sp: OhmNode, _expr: OhmNode) {
      void [_kw, _sp, _expr];
      return null;
    },
    TypePrimary_infer(_kw: OhmNode, _sp: OhmNode, _name: OhmNode) {
      void [_kw, _sp, _name];
      return null;
    },
    TypePrimary_typeof(_kw: OhmNode, _sp: OhmNode, _name: OhmNode) {
      void [_kw, _sp, _name];
      return null;
    },
    TypeExprTail(_sp1: OhmNode, _comma: OhmNode, _sp2: OhmNode, _expr: OhmNode) {
      void [_sp1, _comma, _sp2, _expr];
      return null;
    },
    Atom(ident: OhmNode) {
      return ident.ast();
    },
    SpreadIdent(_dots: OhmNode, name: OhmNode) {
      void _dots;
      return sym(`...${name.sourceString}`, this as ohm.Node);
    },
    YieldStar(_kw: OhmNode) {
      void _kw;
      return sym("yield*", this as ohm.Node);
    },
    operator(_chars: OhmNode) {
      void _chars;
      return sym(this.sourceString, this as ohm.Node);
    },
    operatorChar(_char: OhmNode) {
      void _char;
      return null;
    },
    Comma(_comma: OhmNode) {
      void _comma;
      return sym(",", this as ohm.Node);
    },
    Colon(_colon: OhmNode) {
      void _colon;
      return sym(":", this as ohm.Node);
    },
    ident(_first: OhmNode, _rest: OhmNode) {
      void [_first, _rest];
      return sym(this.sourceString, this as ohm.Node);
    },
    String(_open: OhmNode, _chars: OhmNode, _close: OhmNode) {
      void [_open, _chars, _close];
      const raw = this.sourceString.slice(1, -1);
      return str(decodeStringLiteral(raw), this as ohm.Node);
    },
    Number(value: OhmNode) {
      return num(value.sourceString, this as ohm.Node);
    },
    Boolean(_value: OhmNode) {
      void _value;
      return { kind: "literal", value: this.sourceString === "true", loc: locLookup(this as ohm.Node), phaseKind: "literal" };
    },
    Null(_kw: OhmNode) {
      void _kw;
      return { kind: "literal", value: null, loc: locLookup(this as ohm.Node), phaseKind: "literal" };
    },
    Spacing(_chars: OhmNode) {
      void _chars;
      return null;
    },
  });

  return semantics(match).ast() as PhaseBNode[];
}

function createLocLookupWithLineStarts(source: string, file: string, lineStarts: number[]) {
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

function createLocFromIndex(lineStarts: number[], file: string) {
  return (startIndex: number, endIndex = startIndex + 1): SourceLoc => {
    const start = positionFromIndex(startIndex, lineStarts);
    const end = positionFromIndex(endIndex, lineStarts);
    return {
      file,
      line: start.line,
      column: start.column,
      endLine: end.line,
      endColumn: end.column,
    };
  };
}

function detectParseError(source: string, locFromIndex: (start: number, end?: number) => SourceLoc): ParseError | null {
  const stringError = detectStringError(source, locFromIndex);
  if (stringError) {
    return stringError;
  }
  const numericError = detectMalformedNumeric(source, locFromIndex);
  if (numericError) {
    return numericError;
  }
  const dottedError = detectInvalidDotted(source, locFromIndex);
  if (dottedError) {
    return dottedError;
  }
  const delimiterError = detectDelimiterMismatch(source, locFromIndex);
  if (delimiterError) {
    return delimiterError;
  }
  return null;
}

function detectStringError(source: string, locFromIndex: (start: number, end?: number) => SourceLoc): ParseError | null {
  let inString = false;
  let stringStart = 0;
  for (let i = 0; i < source.length; i += 1) {
    const ch = source[i];
    if (!inString) {
      if (ch === '"') {
        inString = true;
        stringStart = i;
      }
      continue;
    }
    if (ch === "\\") {
      const next = source[i + 1];
      if (!next) {
        return new ParseError("unclosed string literal", locFromIndex(stringStart), "E004");
      }
      if (!["n", "r", "t", "\"", "\\"].includes(next)) {
        return new ParseError(`invalid escape sequence '\\${next}'`, locFromIndex(i + 1), "E005");
      }
      i += 1;
      continue;
    }
    if (ch === '"') {
      inString = false;
    }
  }
  if (inString) {
    return new ParseError("unclosed string literal", locFromIndex(stringStart), "E004");
  }
  return null;
}

function detectMalformedNumeric(source: string, locFromIndex: (start: number, end?: number) => SourceLoc): ParseError | null {
  const stripped = source.replace(/"(?:\\.|[^"\\])*"/g, " ");
  const match = /-?\d+\.\d+\./.exec(stripped);
  if (match && match.index !== undefined) {
    return new ParseError("malformed numeric literal", locFromIndex(match.index), "E007");
  }
  return null;
}

function detectInvalidDotted(source: string, locFromIndex: (start: number, end?: number) => SourceLoc): ParseError | null {
  let inString = false;
  for (let i = 0; i < source.length; i += 1) {
    const ch = source[i];
    if (ch === '"') {
      inString = !inString;
      continue;
    }
    if (inString) {
      if (ch === "\\") {
        i += 1;
      }
      continue;
    }
    if (ch === ".") {
      if (source[i - 1] === "." || source[i + 1] === ".") {
        continue;
      }
      const prev = source[i - 1];
      const next = source[i + 1];
      const prevOk = prev && /[A-Za-z0-9_\-]/.test(prev);
      const nextOk = next && /[A-Za-z_]/.test(next);
      if (!prevOk && nextOk) {
        return new ParseError("invalid dotted identifier", locFromIndex(i), "E006");
      }
    }
  }
  return null;
}

function detectDelimiterMismatch(source: string, locFromIndex: (start: number, end?: number) => SourceLoc): ParseError | null {
  const stack: { ch: string; index: number }[] = [];
  let inString = false;
  for (let i = 0; i < source.length; i += 1) {
    const ch = source[i];
    if (ch === '"') {
      inString = !inString;
      continue;
    }
    if (inString) {
      if (ch === "\\") {
        i += 1;
      }
      continue;
    }
    if (ch === "(" || ch === "[" || ch === "{") {
      stack.push({ ch, index: i });
      continue;
    }
    if (ch === ")" || ch === "]" || ch === "}") {
      const last = stack.pop();
      if (!last) {
        return new ParseError(`unexpected '${ch}' encountered`, locFromIndex(i), "E002");
      }
      const pairs: Record<string, string> = { "(": ")", "[": "]", "{": "}" };
      if (pairs[last.ch] !== ch) {
        return new ParseError(`unexpected '${ch}' encountered`, locFromIndex(i), "E002");
      }
    }
  }
  if (stack.length > 0) {
    const unclosed = stack[stack.length - 1];
    return new ParseError(`unclosed '${unclosed.ch}' delimiter`, locFromIndex(unclosed.index), "E001");
  }
  return null;
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
