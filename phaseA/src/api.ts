import { parseSource } from "./parse.js";
import { generateCode } from "./codegen.js";
import { serializeLazy, SerializedProgram, SerializedProgramThunk } from "./serialization.js";
import {
  createProcessor,
  Context,
  Program,
  Statement,
  Expression,
  ExprStmt,
  BlockStmt,
  StaticBlockStmt,
  IfStmt,
  WhileStmt,
  ForClassic,
  ForOf,
  ForAwait,
  SwitchStmt,
  LetStarExpr,
  AssignExpr,
  ReturnExpr,
  FunctionExpr,
  ClassExpr,
  TryCatchExpr,
  CallExpr,
  CallWithThisExpr,
  PropExpr,
  IndexExpr,
  NewExpr,
  ArrayExpr,
  ObjectExpr,
  TemplateExpr,
  ThrowExpr,
  SpreadExpr,
  TernaryExpr,
  AwaitExpr,
  YieldExpr,
  TypeAssertExpr,
  NonNullAssertExpr,
  TypeApp,
  ImportStmt,
  ExportStmt,
  EnumStmt,
  NamespaceStmt,
  TypePrimitive,
  TypeRef,
  TypeNode,
} from "./phaseA1.js";
import type { Diagnostic, Span } from "./phaseA1.js";
import { createDiagnostic } from "./phaseA0.js";
import { ArrayEventSink, CompilerEvent, CompilerStage, EventSeverity } from "./events.js";
import { PhaseACompilerContext } from "./compilerContext.js";

export type { Diagnostic, Span };

export interface CompilePhaseAConfig {
  prettyOption?: "pretty" | "ugly";
  emitTypes?: boolean;
  seed?: string;
  stamp?: string;
  logLevel?: EventSeverity;
  compilerContext?: PhaseACompilerContext;
  sourcePath?: string;
  dumpAst?: boolean;
  program?: Program;
  warnNoReturnAny?: boolean;
  warnReturnExpected?: boolean;
}

export interface SnapshotRecord {
  stage: CompilerStage;
  program: SerializedProgramThunk;
  seed: string;
  stamp: string;
}

export interface CompilePhaseAResult {
  tsSource: string;
  mappings: Array<{ generated: { line: number; column: number }; original: { line: number; column: number }; source: string }>;
  diagnostics: Diagnostic[];
  snapshots: SnapshotRecord[];
  events: CompilerEvent[];
}

const DEFAULT_CONFIG: CompilePhaseAConfig = {
  prettyOption: "pretty",
  emitTypes: false,
  seed: "default",
  logLevel: "debug",
  warnNoReturnAny: false,
  warnReturnExpected: false,
};

const WARNING_STAGE: CompilerStage = "typecheck";
const WARN_NO_RETURN_ANY = "T2:0401";
const WARN_RETURN_EXPECTED = "T2:0402";

function isExpressionNode(value: Expression | TypeNode): value is Expression {
  return value instanceof FunctionExpr
    || value instanceof ClassExpr
    || value instanceof CallExpr
    || value instanceof CallWithThisExpr
    || value instanceof PropExpr
    || value instanceof IndexExpr
    || value instanceof NewExpr
    || value instanceof ArrayExpr
    || value instanceof ObjectExpr
    || value instanceof TemplateExpr
    || value instanceof ThrowExpr
    || value instanceof TryCatchExpr
    || value instanceof SpreadExpr
    || value instanceof TernaryExpr
    || value instanceof AwaitExpr
    || value instanceof YieldExpr
    || value instanceof TypeAssertExpr
    || value instanceof NonNullAssertExpr
    || value instanceof TypeApp;
}

function collectReturnWarnings(program: Program, config: CompilePhaseAConfig): Diagnostic[] {
  if (!config.warnNoReturnAny && !config.warnReturnExpected) {
    return [];
  }
  const warnings: Diagnostic[] = [];

  const visitExpression = (expr: Expression): void => {
    if (expr instanceof FunctionExpr) {
      visitFunction(expr);
      return;
    }
    if (expr instanceof ClassExpr) {
      visitClass(expr);
      return;
    }
    if (expr instanceof CallExpr) {
      visitExpression(expr.callee);
      for (const arg of expr.args) visitExpression(arg);
      return;
    }
    if (expr instanceof CallWithThisExpr) {
      visitExpression(expr.fn);
      visitExpression(expr.thisArg);
      for (const arg of expr.args) visitExpression(arg);
      return;
    }
    if (expr instanceof PropExpr) {
      visitExpression(expr.object);
      return;
    }
    if (expr instanceof IndexExpr) {
      visitExpression(expr.object);
      visitExpression(expr.index);
      return;
    }
    if (expr instanceof NewExpr) {
      visitExpression(expr.callee);
      for (const arg of expr.args) visitExpression(arg);
      return;
    }
    if (expr instanceof ArrayExpr) {
      for (const element of expr.elements) visitExpression(element);
      return;
    }
    if (expr instanceof ObjectExpr) {
      for (const field of expr.fields) {
        if (field.kind === "field") {
          visitExpression(field.value);
        } else if (field.kind === "computed") {
          visitExpression(field.key);
          visitExpression(field.value);
        } else {
          visitExpression(field.expr);
        }
      }
      return;
    }
    if (expr instanceof TemplateExpr) {
      for (const part of expr.parts) visitExpression(part);
      return;
    }
    if (expr instanceof ThrowExpr) {
      visitExpression(expr.argument);
      return;
    }
    if (expr instanceof TryCatchExpr) {
      visitStatement(expr.body);
      if (expr.catchClause) {
        for (const stmt of expr.catchClause.body) visitStatement(stmt);
      }
      if (expr.finallyClause) {
        for (const stmt of expr.finallyClause.body) visitStatement(stmt);
      }
      return;
    }
    if (expr instanceof SpreadExpr) {
      visitExpression(expr.expr);
      return;
    }
    if (expr instanceof TernaryExpr) {
      visitExpression(expr.test);
      visitExpression(expr.consequent);
      visitExpression(expr.alternate);
      return;
    }
    if (expr instanceof AwaitExpr) {
      visitExpression(expr.argument);
      return;
    }
    if (expr instanceof YieldExpr) {
      if (expr.argument) visitExpression(expr.argument);
      return;
    }
    if (expr instanceof TypeAssertExpr) {
      visitExpression(expr.expr);
      return;
    }
    if (expr instanceof NonNullAssertExpr) {
      visitExpression(expr.expr);
      return;
    }
    if (expr instanceof TypeApp) {
      if (isExpressionNode(expr.expr)) {
        visitExpression(expr.expr);
      }
      return;
    }
  };

  const visitStatement = (stmt: Statement): void => {
    if (stmt instanceof FunctionExpr) {
      visitFunction(stmt);
      return;
    }
    if (stmt instanceof ClassExpr) {
      visitClass(stmt);
      return;
    }
    if (stmt instanceof BlockStmt || stmt instanceof StaticBlockStmt) {
      for (const inner of stmt.statements) visitStatement(inner);
      return;
    }
    if (stmt instanceof IfStmt) {
      visitExpression(stmt.test);
      visitStatement(stmt.consequent);
      if (stmt.alternate) visitStatement(stmt.alternate);
      return;
    }
    if (stmt instanceof WhileStmt) {
      visitExpression(stmt.condition);
      visitStatement(stmt.body);
      return;
    }
    if (stmt instanceof ForClassic) {
      if (stmt.init) visitStatement(stmt.init);
      if (stmt.condition) visitExpression(stmt.condition);
      if (stmt.update) visitExpression(stmt.update);
      visitStatement(stmt.body);
      return;
    }
    if (stmt instanceof ForOf || stmt instanceof ForAwait) {
      if (stmt.binding.init) visitExpression(stmt.binding.init);
      visitExpression(stmt.iterable);
      visitStatement(stmt.body);
      return;
    }
    if (stmt instanceof SwitchStmt) {
      visitExpression(stmt.discriminant);
      for (const clause of stmt.cases) {
        if (clause.test) visitExpression(clause.test);
        for (const inner of clause.consequent) visitStatement(inner);
      }
      return;
    }
    if (stmt instanceof LetStarExpr) {
      for (const binding of stmt.bindings) {
        if (binding.init) visitExpression(binding.init);
      }
      for (const inner of stmt.body) visitStatement(inner);
      return;
    }
    if (stmt instanceof AssignExpr) {
      visitExpression(stmt.target);
      visitExpression(stmt.value);
      return;
    }
    if (stmt instanceof ReturnExpr) {
      if (stmt.value) visitExpression(stmt.value);
      return;
    }
    if (stmt instanceof ExprStmt) {
      visitExpression(stmt.expr);
      return;
    }
    if (stmt instanceof ImportStmt) {
      return;
    }
    if (stmt instanceof ExportStmt) {
      if (stmt.spec.defaultExport) visitExpression(stmt.spec.defaultExport);
      return;
    }
    if (stmt instanceof EnumStmt) {
      for (const member of stmt.members) {
        if (member.value) visitExpression(member.value);
      }
      return;
    }
    if (stmt instanceof NamespaceStmt) {
      for (const inner of stmt.body) visitStatement(inner);
      return;
    }
  };

  const visitClass = (expr: ClassExpr): void => {
    for (const member of expr.body.statements) {
      visitStatement(member);
    }
    if (expr.constructorStmt) {
      visitStatement(expr.constructorStmt);
    }
    if (expr.staticBlocks) {
      for (const block of expr.staticBlocks) visitStatement(block);
    }
    if (expr.extends) {
      visitExpression(expr.extends);
    }
    if (expr.implements) {
      for (const impl of expr.implements) visitExpression(impl);
    }
    if (expr.decorators) {
      for (const dec of expr.decorators) visitExpression(dec);
    }
  };

  const visitFunction = (expr: FunctionExpr): void => {
    const shouldSkip = expr.abstract || expr.overload || (expr.callableKind === "method" && expr.methodName === "constructor");
    if (!shouldSkip) {
      const hasReturn = functionHasExplicitReturn(expr.body);
      if (!hasReturn && config.warnNoReturnAny) {
        warnings.push(createDiagnostic(WARNING_STAGE, WARN_NO_RETURN_ANY, expr.span));
      }
      if (!hasReturn && config.warnReturnExpected && expr.signature.returnType && !isVoidReturnType(expr.signature.returnType)) {
        warnings.push(createDiagnostic(WARNING_STAGE, WARN_RETURN_EXPECTED, expr.signature.returnType.span ?? expr.span));
      }
    }
    for (const stmt of expr.body) {
      visitStatement(stmt);
    }
  };

  for (const stmt of program.body) {
    visitStatement(stmt);
  }

  return warnings;
}

function functionHasExplicitReturn(statements: Statement[]): boolean {
  for (const stmt of statements) {
    if (statementHasReturn(stmt)) {
      return true;
    }
  }
  return false;
}

function statementHasReturn(stmt: Statement): boolean {
  if (stmt instanceof ReturnExpr) {
    return true;
  }
  if (stmt instanceof BlockStmt || stmt instanceof StaticBlockStmt) {
    return stmt.statements.some(statementHasReturn);
  }
  if (stmt instanceof IfStmt) {
    return statementHasReturn(stmt.consequent) || (stmt.alternate ? statementHasReturn(stmt.alternate) : false);
  }
  if (stmt instanceof WhileStmt) {
    return statementHasReturn(stmt.body);
  }
  if (stmt instanceof ForClassic) {
    return statementHasReturn(stmt.body);
  }
  if (stmt instanceof ForOf || stmt instanceof ForAwait) {
    return statementHasReturn(stmt.body);
  }
  if (stmt instanceof SwitchStmt) {
    return stmt.cases.some((clause) => clause.consequent.some(statementHasReturn));
  }
  if (stmt instanceof LetStarExpr) {
    return stmt.body.some(statementHasReturn);
  }
  if (stmt instanceof ExprStmt) {
    return exprHasReturn(stmt.expr);
  }
  return false;
}

function exprHasReturn(expr: Expression): boolean {
  if (expr instanceof TryCatchExpr) {
    if (statementHasReturn(expr.body)) {
      return true;
    }
    if (expr.catchClause && expr.catchClause.body.some(statementHasReturn)) {
      return true;
    }
    if (expr.finallyClause && expr.finallyClause.body.some(statementHasReturn)) {
      return true;
    }
  }
  return false;
}

function isVoidReturnType(typeNode: TypeNode): boolean {
  if (typeNode instanceof TypePrimitive) {
    return typeNode.kind === "type-void";
  }
  if (typeNode instanceof TypeRef) {
    return typeNode.identifier.name === "void";
  }
  return false;
}

export async function compile(source: string, config: CompilePhaseAConfig = {}): Promise<CompilePhaseAResult> {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };
  const sourcePath = finalConfig.sourcePath ?? "input.t2";
  try {
    const providedContext = finalConfig.compilerContext;
    const stamp = providedContext?.stamp ?? finalConfig.stamp ?? `${Date.now()}`;
    const seed = providedContext?.seed ?? finalConfig.seed!;
    const logLevel = providedContext?.logLevel ?? finalConfig.logLevel ?? "debug";
    const defaultEvents = providedContext?.events ?? new ArrayEventSink();
    const compilerContext: PhaseACompilerContext = providedContext ?? {
      events: defaultEvents,
      seed,
      stamp,
      logLevel,
    };
    compilerContext.events = defaultEvents;
    compilerContext.seed = seed;
    compilerContext.stamp = stamp;
    compilerContext.logLevel = logLevel;
    const ctx: Context = { diagnostics: [], scopeStack: [], compilerContext };

    const snapshots: SnapshotRecord[] = [];

    const emitStage = async (stage: CompilerStage, program: Program): Promise<void> => {
      const lazyProgram = serializeLazy(program);
      const snapshot: SnapshotRecord = { stage, program: lazyProgram, seed: compilerContext.seed, stamp: compilerContext.stamp };
      snapshots.push(snapshot);
      await compilerContext.events.emit({
        phase: stage,
        kind: "snapshot",
        timestamp: Date.now(),
        seed: compilerContext.seed,
        stamp: compilerContext.stamp,
        severity: "info",
        data: snapshot,
      });
    };

    const emitTrace = async (stage: CompilerStage, event: "start" | "done"): Promise<void> => {
      await compilerContext.events.emit({
        phase: stage,
        kind: "trace",
        timestamp: Date.now(),
        seed: compilerContext.seed,
        stamp: compilerContext.stamp,
        severity: "debug",
        data: {
          stage,
          event,
          diagnostics: ctx.diagnostics.slice(),
        },
      });
    };

    await emitTrace("parse", "start");
    const parsedProgram = finalConfig.program ?? await parseSource(source, finalConfig.sourcePath ?? "input.t2");
    if (process.env.T2_DEBUG_PARSE === "1") {
      const nodeCount = parsedProgram.body.length;
      console.error(`[DEBUG] Parsed AST: nodeCount=${nodeCount}`);
    }
    await emitStage("parse", parsedProgram);
    await emitTrace("parse", "done");

    const processor = await createProcessor(ctx);
    await emitTrace("resolve", "start");
    const { program: resolvedProgram } = await processor.run(parsedProgram);
    await emitStage("resolve", resolvedProgram);
    await emitTrace("resolve", "done");

    await emitTrace("typecheck", "start");
    const returnWarnings = collectReturnWarnings(resolvedProgram, finalConfig);
    if (returnWarnings.length > 0) {
      ctx.diagnostics.push(...returnWarnings);
    }
    await emitStage("typecheck", resolvedProgram);
    await emitTrace("typecheck", "done");

    await emitTrace("codegen", "start");
    const { tsSource, mappings } = await generateCode(resolvedProgram, {
      prettyOption: finalConfig.prettyOption,
      emitTypes: finalConfig.emitTypes,
    });
    if (process.env.T2_DEBUG_CODEGEN === "1") {
      console.error(`[DEBUG] Codegen output: size=${tsSource.length}`);
    }
    await emitStage("codegen", resolvedProgram);
    await emitTrace("codegen", "done");

    if (finalConfig.dumpAst !== false) {
      const parseSnapshot = snapshots.find((s) => s.stage === "parse");
      if (parseSnapshot) {
        await compilerContext.events.emit({
          phase: "parse",
          kind: "astDump",
          timestamp: Date.now(),
          seed: compilerContext.seed,
          stamp: compilerContext.stamp,
          severity: "info",
          data: { ast: await parseSnapshot.program() },
        });
      }
      const resolveSnapshot = snapshots.find((s) => s.stage === "resolve");
      if (resolveSnapshot) {
        await compilerContext.events.emit({
          phase: "resolve",
          kind: "resolveDump",
          timestamp: Date.now(),
          seed: compilerContext.seed,
          stamp: compilerContext.stamp,
          severity: "info",
          data: { ast: await resolveSnapshot.program() },
        });
      }
    }

    return {
      tsSource,
      mappings,
      diagnostics: ctx.diagnostics,
      snapshots,
      events: compilerContext.events.events,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    const diagnostic: Diagnostic = {
      message: `T2A:Unhandled error: ${message}`,
      span: { start: 0, end: 0, source: sourcePath },
      stage: "parse",
      level: "error",
    };
    return {
      tsSource: "",
      mappings: [],
      diagnostics: [diagnostic],
      snapshots: [],
      events: [],
    };
  }
}

export async function evaluateSnapshot(snapshot: SnapshotRecord): Promise<SerializedProgram> {
  return snapshot.program();
}