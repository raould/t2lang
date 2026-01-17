// Phase1 AST: reuse Phase0 AST types and add macro-specific nodes
import type {
  Program as _Phase0Program,
  Statement as _Phase0Statement,
  Expr as _Phase0Expr,
  SourceLocation,
  Identifier
} from "t2lang-phase0";

// Re-export Phase0 primitives for convenience (include LetBinding used by macro expander)
export type { SourceLocation, Identifier, LetBinding, LiteralExpr, CallExpr, LetStarExpr, IfExpr, PropExpr, FunctionExpr, ReturnExpr, WhileExpr, ArrayExpr, ObjectExpr, AssignExpr, ForExpr, IndexExpr, NewExpr, ClassExpr, TypeAssertExpr, TypeNode, TypeAliasStmt, ImportStmt, ExportStmt, ThrowExpr, TryCatchExpr, BlockStmt, ExprStmt } from "t2lang-phase0";

// Local aliases to the imported Phase0 types (avoid naming collisions with imports)
export type Phase0Program = _Phase0Program;
export type Phase0Statement = _Phase0Statement;
export type Phase0Expr = _Phase0Expr;

// Macro-related nodes (Phase1 only)
export interface GensymExpr {
  kind: "gensym";
  prefix?: string;
  generatedName?: string;
  location: SourceLocation;
  typeId?: number | null;
}

export interface QuoteExpr {
  kind: "quote";
  expr: Expr;
  location: SourceLocation;
  typeId?: number | null;
}

export interface UnquoteExpr {
  kind: "unquote";
  expr: Expr;
  location: SourceLocation;
  typeId?: number | null;
}

export interface UnquoteSpliceExpr {
  kind: "unquote-splice";
  expr: Expr;
  location: SourceLocation;
  typeId?: number | null;
}

export interface SpliceExpr {
  kind: "__splice";
  items: Expr[];
  location: SourceLocation;
}

export interface MacroDef {
  kind: "defmacro";
  name: Identifier;
  params: Identifier[];
  body: Expr[];
  location: SourceLocation;
}

// Phase1 Expr/Statement/Program include Phase0 shapes plus macro nodes
export type Expr = Phase0Expr | GensymExpr | QuoteExpr | UnquoteExpr | UnquoteSpliceExpr | SpliceExpr;
export type Statement = Phase0Statement | MacroDef;

export interface Program {
  kind: "program";
  body: Statement[];
  location: SourceLocation;
}
