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

// Union of all node "kind" string literals.
export type Kind =
  | "identifier"
  | "literal"
  | "call"
  | "let*"
  | "if"
  | "prop"
  | "function"
  | "return"
  | "while"
  | "array"
  | "object"
  | "assign"
  | "for"
  | "index"
  | "new"
  | "class"
  | "interface"
  | "type-assert"
  | "type-ref"
  | "type-array"
  | "type-number"
  | "type-string"
  | "type-boolean"
  | "type-null"
  | "type-undefined"
  | "type-literal"
  | "type-object"
  | "type-function"
  | "type-union"
  | "type-intersection"
  | "type-app"
  | "type-alias"
  | "import"
  | "export"
  | "throw"
  | "try-catch"
  | "block"
  | "exprStmt"
  | "gensym"
  | "quote"
  | "unquote"
  | "unquote-splice"
  | "__splice"
  | "program";

export interface TypeParam extends BaseNode {
  kind: "type-param"; // not in Kind since it's not a top-level node
  name: Identifier;
  constraint: TypeNode | null;
  defaultType: TypeNode | null;
}

export interface Identifier extends BaseNode {
  kind: Extract<Kind, "identifier">;
  name: string;
  symbolId?: number;
  typeId?: number | null;
  // Optional inline type annotation (Phase0 supports plain sexpr for param types)
  typeAnnotation?: TypeNode | null;
}

export interface LiteralExpr extends BaseNode {
  kind: Extract<Kind, "literal">;
  value: string | number | boolean | null | "undefined";
  typeId?: number | null;
}

export interface CallExpr extends BaseNode {
  kind: Extract<Kind, "call">;
  callee: Expr;
  args: Expr[];
  typeId?: number | null;
}

export interface LetBinding {
  name: Identifier;
  init: Expr;
}

export interface LetStarExpr extends BaseNode {
  kind: Extract<Kind, "let*">;
  isConst: boolean;
  bindings: LetBinding[];
  body: Expr[];
  typeId?: number | null;
}

export interface IfExpr extends BaseNode {
  kind: Extract<Kind, "if">;
  condition: Expr;
  thenBranch: Expr;
  elseBranch: Expr | null;
  typeId?: number | null;
}

export interface PropExpr extends BaseNode {
  kind: Extract<Kind, "prop">;
  object: Expr;
  property: string;
  typeId?: number | null;
}

export interface FunctionExpr extends BaseNode {
  kind: Extract<Kind, "function">;
  name: Identifier | null;
  typeparams: TypeParam[];
  params: Identifier[];
  // Optional inline return type annotation (Phase0 syntax sugar)
  returnType?: TypeNode | null;
  body: Expr[];
  isDeclaration: boolean;
  typeId?: number | null;
}

export interface ReturnExpr extends BaseNode {
  kind: Extract<Kind, "return">;
  value: Expr | null;
  typeId?: number | null;
}

export interface WhileExpr extends BaseNode {
  kind: Extract<Kind, "while">;
  condition: Expr;
  body: Expr[];
  typeId?: number | null;
}

export interface ArrayExpr extends BaseNode {
  kind: Extract<Kind, "array">;
  elements: Expr[];
  typeId?: number | null;
}

export interface ObjectField {
  key: string;
  value: Expr;
}

export interface ObjectExpr extends BaseNode {
  kind: Extract<Kind, "object">;
  fields: ObjectField[];
  typeId?: number | null;
}

export interface AssignExpr extends BaseNode {
  kind: Extract<Kind, "assign">;
  target: Expr;
  value: Expr;
  typeId?: number | null;
}

export interface ForExpr extends BaseNode {
  kind: Extract<Kind, "for">;
  init: Expr | null;
  condition: Expr | null;
  update: Expr | null;
  body: Expr[];
  typeId?: number | null;
}

export interface IndexExpr extends BaseNode {
  kind: Extract<Kind, "index">;
  object: Expr;
  index: Expr;
  typeId?: number | null;
}

export interface NewExpr extends BaseNode {
  kind: Extract<Kind, "new">;
  callee: Expr;
  args: Expr[];
  typeId?: number | null;
}

export interface ClassField {
  name: string;
  initializer: Expr | null;
  // Data modifiers supported: access control and flags
  access?: "public" | "protected" | "private";
  isStatic?: boolean;
  isReadonly?: boolean;
}

export interface ClassMethod {
  name: string;
  params: Identifier[];
  body: Expr[];
  // Optional inline return type annotation for methods
  returnType?: TypeNode | null;
}

export interface InterfaceMethod {
  name: string;
  params: TypeNode[];
  returns: TypeNode;
}

export interface ClassExpr extends BaseNode {
  kind: Extract<Kind, "class">;
  name: Identifier;
  typeparams: TypeParam[];
  superclass: Identifier | null;
  fields: ClassField[];
  methods: ClassMethod[];
  typeId?: number | null;
}

export interface InterfaceExpr extends BaseNode {
  kind: Extract<Kind, "interface">;
  name: Identifier;
  typeparams: TypeParam[];
  methods: InterfaceMethod[];
  typeId?: number | null;
}

export interface TypeAssertExpr extends BaseNode {
  kind: Extract<Kind, "type-assert">;
  expr: Expr;
  typeAnnotation: TypeNode;
  typeId?: number | null;
}

export interface TypeAppExpr extends BaseNode {
  kind: Extract<Kind, "type-app">;
  expr: Expr;
  typeArgs: TypeNode[];
  typeId?: number | null;
}

// --- Type AST nodes (Phase0 structured types)
// Add locations to type nodes for better diagnostics
export interface TypeRef extends BaseNode {
  kind: Extract<Kind, "type-ref">;
  name: string;
}

export interface TypeArray extends BaseNode {
  kind: Extract<Kind, "type-array">;
  element: TypeNode;
}

export interface TypeNumber extends BaseNode {
  kind: Extract<Kind, "type-number">;
}

export interface TypeString extends BaseNode {
  kind: Extract<Kind, "type-string">;
}

export interface TypeBoolean extends BaseNode {
  kind: Extract<Kind, "type-boolean">;
}

export interface TypeNull extends BaseNode {
  kind: Extract<Kind, "type-null">;
}

export interface TypeUndefined extends BaseNode {
  kind: Extract<Kind, "type-undefined">;
}

export interface TypeLiteral extends BaseNode {
  kind: Extract<Kind, "type-literal">;
  value: string | number | boolean | null | "undefined";
}

export interface TypeObjectField {
  name: string;
  type: TypeNode;
}

export interface TypeObject extends BaseNode {
  kind: Extract<Kind, "type-object">;
  fields: TypeObjectField[];
}

export interface TypeFunction extends BaseNode {
  kind: Extract<Kind, "type-function">;
  params: TypeNode[];
  returns: TypeNode;
}

export interface TypeUnion extends BaseNode {
  kind: Extract<Kind, "type-union">;
  types: TypeNode[];
}

export interface TypeIntersection extends BaseNode {
  kind: Extract<Kind, "type-intersection">;
  types: TypeNode[];
}

export interface TypeAppType extends BaseNode {
  kind: Extract<Kind, "type-app">;
  expr: TypeNode;
  typeArgs: TypeNode[];
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
  | TypeIntersection
  | TypeAppType;

export interface TypeAliasStmt extends BaseNode {
  kind: Extract<Kind, "type-alias">;
  name: Identifier;
  typeparams: TypeParam[];
  typeAnnotation: TypeNode;
}

export interface ImportStmt extends BaseNode {
  kind: Extract<Kind, "import">;
  importKind: "default" | "named" | "all";
  name?: string; // for default and all
  names?: string[]; // for named
  alias?: string; // for all
  from: string;
}

export interface ExportStmt extends BaseNode {
  kind: Extract<Kind, "export">;
  exportKind: "named" | "default";
  name?: string; // for named
  declaration?: Expr; // for default
}

export interface ThrowExpr extends BaseNode {
  kind: Extract<Kind, "throw">;
  value: Expr;
  typeId?: number | null;
}

export interface TryCatchExpr extends BaseNode {
  kind: Extract<Kind, "try-catch">;
  tryBody: Expr[];
  catchParam: Identifier | null;
  catchBody: Expr[];
  finallyBody: Expr[];
  typeId?: number | null;
}

export interface BlockStmt extends BaseNode {
  kind: Extract<Kind, "block">;
  body: Expr[];
  typeId?: number | null;
}

export interface ExprStmt extends BaseNode {
  kind: Extract<Kind, "exprStmt">;
  expr: Expr;
}

// Macro-related nodes (used during parsing/expansion)
export interface GensymExpr extends BaseNode {
  kind: Extract<Kind, "gensym">;
  prefix?: string;
  generatedName?: string;
  typeId?: number | null;
}

export interface QuoteExpr extends BaseNode {
  kind: Extract<Kind, "quote">;
  expr: Expr;
  typeId?: number | null;
}

export interface UnquoteExpr extends BaseNode {
  kind: Extract<Kind, "unquote">;
  expr: Expr;
  typeId?: number | null;
}

export interface UnquoteSpliceExpr extends BaseNode {
  kind: Extract<Kind, "unquote-splice">;
  expr: Expr;
  typeId?: number | null;
}

export interface SpliceExpr extends BaseNode {
  kind: Extract<Kind, "__splice">;
  items: Expr[];
}

export type Expr =
  | Identifier
  | LiteralExpr
  | CallExpr
  | LetStarExpr
  | IfExpr
  | PropExpr
  | FunctionExpr
  | ReturnExpr
  | WhileExpr
  | ArrayExpr
  | ObjectExpr
  | AssignExpr
  | ForExpr
  | IndexExpr
  | NewExpr
  | ClassExpr
  | InterfaceExpr
  | TypeAssertExpr
  | TypeAppExpr
  | ThrowExpr
  | TryCatchExpr
  | BlockStmt
  | GensymExpr
  | QuoteExpr
  | UnquoteExpr
  | UnquoteSpliceExpr
  | SpliceExpr;
export type Statement =
  | ExprStmt
  | BlockStmt
  | LetStarExpr
  | TypeAliasStmt
  | ImportStmt
  | ExportStmt;

export interface Program extends BaseNode {
  kind: Extract<Kind, "program">;
  body: Statement[];
}
