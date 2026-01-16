export interface SourceLocation {
  file: string;
  start: number;
  end: number;
  line: number;
  column: number;
}

export interface BaseNode {
  location: SourceLocation;
}

export interface Identifier extends BaseNode {
  kind: "identifier";
  name: string;
  symbolId?: number;
  typeId?: number | null;
}

export interface LiteralExpr extends BaseNode {
  kind: "literal";
  value: string | number | boolean | null | "undefined";
  typeId?: number | null;
}

export interface CallExpr extends BaseNode {
  kind: "call";
  callee: Expr;
  args: Expr[];
  typeId?: number | null;
}

export interface LetBinding {
  name: Identifier;
  init: Expr;
}

export interface LetStarExpr extends BaseNode {
  kind: "let*";
  isConst: boolean;
  bindings: LetBinding[];
  body: Expr[];
  typeId?: number | null;
}

export interface IfExpr extends BaseNode {
  kind: "if";
  condition: Expr;
  thenBranch: Expr;
  elseBranch: Expr | null;
  typeId?: number | null;
}

export interface PropExpr extends BaseNode {
  kind: "prop";
  object: Expr;
  property: string;
  typeId?: number | null;
}

export interface FunctionExpr extends BaseNode {
  kind: "function";
  name: Identifier | null;
  params: Identifier[];
  body: Expr[];
  isDeclaration: boolean;
  typeId?: number | null;
}

export interface GensymExpr extends BaseNode {
  kind: "gensym";
  prefix?: string;
  // After expansion, this will hold the generated symbol name
  generatedName?: string;
  typeId?: number | null;
}

export interface ReturnExpr extends BaseNode {
  kind: "return";
  value: Expr | null;
  typeId?: number | null;
}

export interface WhileExpr extends BaseNode {
  kind: "while";
  condition: Expr;
  body: Expr[];
  typeId?: number | null;
}

export interface ArrayExpr extends BaseNode {
  kind: "array";
  elements: Expr[];
  typeId?: number | null;
}

export interface ObjectField {
  key: string;
  value: Expr;
}

export interface ObjectExpr extends BaseNode {
  kind: "object";
  fields: ObjectField[];
  typeId?: number | null;
}

export interface AssignExpr extends BaseNode {
  kind: "assign";
  target: Expr;
  value: Expr;
  typeId?: number | null;
}

export interface ForExpr extends BaseNode {
  kind: "for";
  init: Expr | null;
  condition: Expr | null;
  update: Expr | null;
  body: Expr[];
  typeId?: number | null;
}

export interface IndexExpr extends BaseNode {
  kind: "index";
  object: Expr;
  index: Expr;
  typeId?: number | null;
}

export interface NewExpr extends BaseNode {
  kind: "new";
  callee: Expr;
  args: Expr[];
  typeId?: number | null;
}

export interface ClassField {
  name: string;
  initializer: Expr | null;
}

export interface ClassMethod {
  name: string;
  params: Identifier[];
  body: Expr[];
}

export interface ClassExpr extends BaseNode {
  kind: "class";
  name: Identifier;
  superclass: Identifier | null;
  fields: ClassField[];
  methods: ClassMethod[];
  typeId?: number | null;
}

export interface TypeAssertExpr extends BaseNode {
  kind: "type-assert";
  expr: Expr;
  typeAnnotation: TypeNode;
  typeId?: number | null;
}

// --- Type AST nodes (Phase0 structured types)
// Add locations to type nodes for better diagnostics
export interface TypeRef extends BaseNode {
  kind: "type-ref";
  name: string;
}

export interface TypeArray extends BaseNode {
  kind: "type-array";
  element: TypeNode;
}

export interface TypeNumber extends BaseNode {
  kind: "type-number";
}

export interface TypeString extends BaseNode {
  kind: "type-string";
}

export interface TypeBoolean extends BaseNode {
  kind: "type-boolean";
}

export interface TypeNull extends BaseNode {
  kind: "type-null";
}

export interface TypeUndefined extends BaseNode {
  kind: "type-undefined";
}

export interface TypeLiteral extends BaseNode {
  kind: "type-literal";
  value: string | number | boolean | null | "undefined";
}

export interface TypeObjectField {
  name: string;
  type: TypeNode;
}

export interface TypeObject extends BaseNode {
  kind: "type-object";
  fields: TypeObjectField[];
}

export interface TypeFunction extends BaseNode {
  kind: "type-function";
  params: TypeNode[];
  returns: TypeNode;
}

export interface TypeUnion extends BaseNode {
  kind: "type-union";
  types: TypeNode[];
}

export interface TypeIntersection extends BaseNode {
  kind: "type-intersection";
  types: TypeNode[];
}

export type TypeNode =
  | TypeRef
  | TypeArray
  | TypeNumber
  | TypeString
  | TypeBoolean
  | TypeNull
  | TypeUndefined
  | TypeLiteral
  | TypeObject
  | TypeFunction
  | TypeUnion
  | TypeIntersection;

export interface TypeAliasStmt extends BaseNode {
  kind: "type-alias";
  name: Identifier;
  typeAnnotation: TypeNode;
}

export interface ImportStmt extends BaseNode {
  kind: "import";
  importKind: "default" | "named" | "all";
  name?: string; // for default and all
  names?: string[]; // for named
  alias?: string; // for all
  from: string;
}

export interface ExportStmt extends BaseNode {
  kind: "export";
  exportKind: "named" | "default";
  name?: string; // for named
  declaration?: Expr; // for default
}

export interface ThrowExpr extends BaseNode {
  kind: "throw";
  value: Expr;
  typeId?: number | null;
}

export interface TryCatchExpr extends BaseNode {
  kind: "try-catch";
  tryBody: Expr[];
  catchParam: Identifier | null;
  catchBody: Expr[];
  finallyBody: Expr[];
  typeId?: number | null;
}

export interface BlockStmt extends BaseNode {
  kind: "block";
  body: Expr[];
  typeId?: number | null;
}

export interface ExprStmt extends BaseNode {
  kind: "exprStmt";
  expr: Expr;
}

import type { Statement as Phase0StatementType } from "t2lang-phase0";
export type Phase0Statement = Phase0StatementType;
export type Phase0Expr = import("t2lang-phase0").Expr;
export type Phase0Program = import("t2lang-phase0").Program;
export type Phase0Identifier = import("t2lang-phase0").Identifier;
export type Phase0Literal = import("t2lang-phase0").LiteralExpr;
export type Phase0CallExpr = import("t2lang-phase0").CallExpr;

export type Expr =
  | Identifier
  | LiteralExpr
  | CallExpr
  | LetStarExpr
  | IfExpr
  | PropExpr
  | FunctionExpr
  | GensymExpr
  | ReturnExpr
  | WhileExpr
  | ArrayExpr
  | ObjectExpr
  | AssignExpr
  | ForExpr
  | IndexExpr
  | NewExpr
  | ClassExpr
  | TypeAssertExpr
  | ThrowExpr
  | TryCatchExpr
  | BlockStmt
  | QuoteExpr
  | UnquoteExpr
  | UnquoteSpliceExpr;

export interface SpliceExpr extends BaseNode {
  kind: "__splice";
  items: Expr[];
}

export interface QuoteExpr extends BaseNode {
  kind: "quote";
  expr: Expr;
  typeId?: number | null;
}

export interface UnquoteExpr extends BaseNode {
  kind: "unquote";
  expr: Expr;
  typeId?: number | null;
}

export interface UnquoteSpliceExpr extends BaseNode {
  kind: "unquote-splice";
  expr: Expr;
  typeId?: number | null;
}

export interface MacroDef extends BaseNode {
  kind: "defmacro";
  name: Identifier;
  params: Identifier[];
  body: Expr[];
}

export type Statement =
  | ExprStmt
  | BlockStmt
  | LetStarExpr
  | TypeAliasStmt
  | ImportStmt
  | ExportStmt
  | MacroDef;

export interface Program extends BaseNode {
  kind: "program";
  body: Statement[];
}
