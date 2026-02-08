import test from "node:test";
import assert from "node:assert";
import { parsePhaseBRaw } from "../src/reader.js";
import { lowerPhaseB } from "../src/lower.js";
import { T2CompilationError } from "../../common/dist/errorRegistry.js";
import {
  AssignExpr,
  ExprStmt,
  CallExpr,
  Identifier,
  LetStarExpr,
  Literal,
  ForClassic,
  ForOf,
  ForAwait,
  FunctionExpr,
  PropExpr,
  ReturnExpr,
  ObjectExpr,
  ArrayExpr,
  SpreadExpr,
  ArrayPattern,
  RestPattern,
  AwaitExpr,
  YieldExpr,
  TypeVar,
  TypePrimitive,
  TypeUnion,
  TypeApp,
  TypeTuple,
  TypeAliasStmt,
} from "../../phaseA/dist/phaseA1.js";

test("lowerPhaseB produces LetStarExpr for let bindings", () => {
  const [node] = parsePhaseBRaw("(let ((x : string 1)) x)", "lower-let.t2");
  const program = lowerPhaseB([node]);
  const stmt = program.body.find((entry) => entry instanceof LetStarExpr);
  assert.ok(stmt instanceof LetStarExpr);
  assert.strictEqual(stmt.isConst, false);
  assert.ok(stmt.bindings.length > 0);
  const binding = stmt.bindings.find((entry) => entry.target instanceof Identifier && entry.target.name === "x");
  assert.ok(binding);
  const bodyExpr = stmt.body.find(
    (entry) => entry instanceof ExprStmt && entry.expr instanceof Identifier && entry.expr.name === "x"
  );
  assert.ok(bodyExpr);
});

test("lowerPhaseB emits AssignExpr for assign forms", () => {
  const [node] = parsePhaseBRaw("(assign foo 42)", "lower-assign.t2");
  const program = lowerPhaseB([node]);
  const stmt = program.body.find((entry) => entry instanceof AssignExpr);
  assert.ok(stmt instanceof AssignExpr);
  assert.ok(stmt.target instanceof Identifier);
  assert.strictEqual(stmt.target.name, "foo");
  assert.ok(stmt.value instanceof Literal);
  assert.strictEqual(stmt.value.value, 42);
});

test("lowerPhaseB emits ForClassic for for forms", () => {
  const [node] = parsePhaseBRaw("(for (_ true null) (assign x 1))", "lower-for.test.t2");
  const program = lowerPhaseB([node]);
  const stmt = program.body.find((entry) => entry instanceof ForClassic);
  assert.ok(stmt instanceof ForClassic);
  assert.ok(stmt.condition instanceof Literal);
  assert.strictEqual(stmt.condition.value, true);
  assert.strictEqual(stmt.init, undefined);
  assert.strictEqual(stmt.update, undefined);
});

test("lowerPhaseB emits ForOf for for-of forms", () => {
  const [node] = parsePhaseBRaw("(for of ((item) items) (assign x item))", "lower-for-of.test.t2");
  const program = lowerPhaseB([node]);
  const stmt = program.body.find((entry) => entry instanceof ForOf);
  assert.ok(stmt instanceof ForOf);
  assert.ok(stmt.binding.target instanceof Identifier);
  assert.strictEqual(stmt.binding.target.name, "item");
  assert.ok(stmt.iterable instanceof Identifier);
  assert.strictEqual((stmt.iterable as Identifier).name, "items");
});

test("lowerPhaseB emits ForAwait for for-await forms", () => {
  const [node] = parsePhaseBRaw("(for await ((value) values) (assign x value))", "lower-for-await.test.t2");
  const program = lowerPhaseB([node]);
  const stmt = program.body.find((entry) => entry instanceof ForAwait);
  assert.ok(stmt instanceof ForAwait);
  assert.ok(stmt.binding.target instanceof Identifier);
  assert.strictEqual(stmt.binding.target.name, "value");
});

test("lowerPhaseB rewrites for-in to Object.keys", () => {
  const [node] = parsePhaseBRaw("(for in ((key) obj) (assign x key))", "lower-for-in.test.t2");
  const program = lowerPhaseB([node]);
  const stmt = program.body.find((entry) => entry instanceof ForOf) as ForOf | undefined;
  assert.ok(stmt instanceof ForOf);
  assert.ok(stmt.iterable instanceof CallExpr);
  const callExpr = stmt.iterable as CallExpr;
  assert.ok(callExpr.callee instanceof PropExpr);
  const prop = callExpr.callee as PropExpr;
  assert.strictEqual(prop.name, "keys");
  assert.ok(prop.object instanceof Identifier);
  assert.strictEqual(prop.object.name, "Object");
});

test("lowerPhaseB emits FunctionExpr for method with identifier name", () => {
  const [node] = parsePhaseBRaw("(method myMethod (x) (assign x 1))", "lower-method.test.t2");
  const program = lowerPhaseB([node]);
  const stmt = program.body.find((entry) => entry instanceof FunctionExpr);
  assert.ok(stmt instanceof FunctionExpr);
  assert.strictEqual(stmt.callableKind, "method");
  assert.strictEqual(stmt.methodName, "myMethod");
});

test("lowerPhaseB supports empty callable parameter lists", () => {
  const [fnNode] = parsePhaseBRaw("(fn () (return 1))", "lower-empty-fn.t2");
  const [lambdaNode] = parsePhaseBRaw("(lambda () (return 2))", "lower-empty-lambda.t2");
  const [methodNode] = parsePhaseBRaw("(method m () (return 3))", "lower-empty-method.t2");
  const [getterNode] = parsePhaseBRaw("(getter g () (return 4))", "lower-empty-getter.t2");

  const fnProgram = lowerPhaseB([fnNode]);
  const lambdaProgram = lowerPhaseB([lambdaNode]);
  const methodProgram = lowerPhaseB([methodNode]);
  const getterProgram = lowerPhaseB([getterNode]);

  const fnStmt = fnProgram.body.find((entry) => entry instanceof FunctionExpr) as FunctionExpr | undefined;
  const lambdaStmt = lambdaProgram.body.find((entry) => entry instanceof FunctionExpr) as FunctionExpr | undefined;
  const methodStmt = methodProgram.body.find((entry) => entry instanceof FunctionExpr) as FunctionExpr | undefined;
  const getterStmt = getterProgram.body.find((entry) => entry instanceof FunctionExpr) as FunctionExpr | undefined;

  assert.ok(fnStmt);
  assert.ok(lambdaStmt);
  assert.ok(methodStmt);
  assert.ok(getterStmt);
  assert.strictEqual(fnStmt!.signature.parameters.length, 0);
  assert.strictEqual(lambdaStmt!.signature.parameters.length, 0);
  assert.strictEqual(methodStmt!.signature.parameters.length, 0);
  assert.strictEqual(getterStmt!.signature.parameters.length, 0);
});

test("lowerPhaseB rejects string method names", () => {
  const [node] = parsePhaseBRaw("(method \"bad\" (x) (assign x 1))", "lower-method-string.test.t2");
  assert.throws(
    () => lowerPhaseB([node]),
    (error) => error instanceof T2CompilationError && error.code === "T2:0118"
  );
});

test("lowerPhaseB rejects string getter names", () => {
  const [node] = parsePhaseBRaw("(getter \"bad\" (x) (assign x 1))", "lower-getter-string.test.t2");
  assert.throws(
    () => lowerPhaseB([node]),
    (error) => error instanceof T2CompilationError && error.code === "T2:0118"
  );
});

test("lowerPhaseB rejects string setter names", () => {
  const [node] = parsePhaseBRaw("(setter \"bad\" (x) (assign x 1))", "lower-setter-string.test.t2");
  assert.throws(
    () => lowerPhaseB([node]),
    (error) => error instanceof T2CompilationError && error.code === "T2:0118"
  );
});

test("lowerPhaseB lowers prop expressions using identifier names to strings", () => {
  const [node] = parsePhaseBRaw("(assign (prop console log) 42)", "lower-prop-string.test.t2");
  const program = lowerPhaseB([node]);
  const stmt = program.body.find((entry) => entry instanceof AssignExpr) as AssignExpr | undefined;
  assert.ok(stmt);
  const target = stmt!.target;
  assert.ok(target instanceof PropExpr);
  const propTarget = target as PropExpr;
  assert.strictEqual(propTarget.name, "log");
  assert.ok(propTarget.object instanceof Identifier);
  assert.strictEqual(propTarget.object.name, "console");
});

test("lowerPhaseB lowers method names built from identifiers to strings", () => {
  const [node] = parsePhaseBRaw("(method proxy ((value)) (return value))", "lower-method-identifier.test.t2");
  const program = lowerPhaseB([node]);
  const stmt = program.body.find((entry) => entry instanceof FunctionExpr) as FunctionExpr | undefined;
  assert.ok(stmt);
  assert.strictEqual(stmt?.methodName, "proxy");
});

test("lowerPhaseB emits ReturnExpr wrapping ObjectExpr", () => {
  const [node] = parsePhaseBRaw(
    "(program (return (object (\"number\" 42) (\"string\" \"alpha\"))))",
    "lower-return-object.test.t2"
  );
  const program = lowerPhaseB([node]);
  const stmt = program.body.find((entry) => entry instanceof ReturnExpr);
  assert.ok(stmt instanceof ReturnExpr);
  assert.ok((stmt as ReturnExpr).value instanceof ObjectExpr);
  const obj = (stmt as ReturnExpr).value as ObjectExpr;
  assert.strictEqual(obj.fields.length, 2);
  assert.strictEqual(obj.fields[0].key, "number");
  assert.strictEqual(obj.fields[1].key, "string");
});

test("lowerPhaseB lowers array literals with spread entries", () => {
  const [node] = parsePhaseBRaw("[1 ...xs 3]", "lower-array-spread.t2");
  const program = lowerPhaseB([node]);
  const stmt = program.body.find((entry) => entry instanceof ExprStmt) as ExprStmt | undefined;
  assert.ok(stmt);
  assert.ok(stmt!.expr instanceof ArrayExpr);
  const arrayExpr = stmt!.expr as ArrayExpr;
  assert.strictEqual(arrayExpr.elements.length, 3);
  assert.ok(arrayExpr.elements[1] instanceof SpreadExpr);
  const spread = arrayExpr.elements[1] as SpreadExpr;
  assert.ok(spread.expr instanceof Identifier);
  assert.strictEqual(spread.expr.name, "xs");
});

test("lowerPhaseB lowers spread in call arguments", () => {
  const [node] = parsePhaseBRaw("(call foo ...xs)", "lower-call-spread.t2");
  const program = lowerPhaseB([node]);
  const stmt = program.body.find((entry) => entry instanceof ExprStmt) as ExprStmt | undefined;
  assert.ok(stmt);
  assert.ok(stmt!.expr instanceof CallExpr);
  const call = stmt!.expr as CallExpr;
  assert.ok(call.args[0] instanceof SpreadExpr);
  const spread = call.args[0] as SpreadExpr;
  assert.ok(spread.expr instanceof Identifier);
  assert.strictEqual(spread.expr.name, "xs");
});

test("lowerPhaseB ignores comma separators in call arguments", () => {
  const [node] = parsePhaseBRaw("(call foo 1, 2)", "lower-call-commas.t2");
  const program = lowerPhaseB([node]);
  const stmt = program.body.find((entry) => entry instanceof ExprStmt) as ExprStmt | undefined;
  assert.ok(stmt);
  assert.ok(stmt!.expr instanceof CallExpr);
  const call = stmt!.expr as CallExpr;
  assert.strictEqual(call.args.length, 2);
  assert.ok(call.args[0] instanceof Literal);
  assert.ok(call.args[1] instanceof Literal);
});

test("lowerPhaseB lowers array-pattern rest bindings", () => {
  const [node] = parsePhaseBRaw(
    "(let (((array-pattern a (rest rest)) xs)) (return a))",
    "lower-array-pattern-rest.t2"
  );
  const program = lowerPhaseB([node]);
  const stmt = program.body.find((entry) => entry instanceof LetStarExpr) as LetStarExpr | undefined;
  assert.ok(stmt);
  const binding = stmt!.bindings.find((entry) => entry.target instanceof ArrayPattern);
  assert.ok(binding);
  const pattern = binding!.target as ArrayPattern;
  assert.strictEqual(pattern.elements.length, 1);
  assert.ok(pattern.rest instanceof RestPattern);
  const rest = pattern.rest as RestPattern;
  assert.ok(rest.target instanceof Identifier);
  assert.strictEqual(rest.target.name, "rest");
});

test("lowerPhaseB preserves async/generator flags", () => {
  const [asyncNode] = parsePhaseBRaw("(fn async asyncCallable ((value)) (return value))", "lower-async.test.t2");
  const asyncProgram = lowerPhaseB([asyncNode]);
  const asyncStmt = asyncProgram.body.find((entry) => entry instanceof FunctionExpr);
  assert.ok(asyncStmt instanceof FunctionExpr);
  assert.strictEqual(asyncStmt.async, true);
  assert.strictEqual(asyncStmt.name?.name, "asyncCallable");
  assert.strictEqual(asyncStmt.signature.parameters[0].name.name, "value");

  const [generatorNode] = parsePhaseBRaw("(fn generator generatorCallable ((value)) (return value))", "lower-generator.test.t2");
  const generatorProgram = lowerPhaseB([generatorNode]);
  const generatorStmt = generatorProgram.body.find((entry) => entry instanceof FunctionExpr);
  assert.ok(generatorStmt instanceof FunctionExpr);
  assert.strictEqual(generatorStmt.generator, true);
  assert.strictEqual(generatorStmt.name?.name, "generatorCallable");

  const [asyncGeneratorNode] = parsePhaseBRaw(
    "(fn async generator asyncGen ((value)) (return value))",
    "lower-async-generator.test.t2"
  );
  const asyncGeneratorProgram = lowerPhaseB([asyncGeneratorNode]);
  const asyncGeneratorStmt = asyncGeneratorProgram.body.find((entry) => entry instanceof FunctionExpr);
  assert.ok(asyncGeneratorStmt instanceof FunctionExpr);
  assert.strictEqual(asyncGeneratorStmt.async, true);
  assert.strictEqual(asyncGeneratorStmt.generator, true);
});

test("lowerPhaseB lowers yield and yield*", () => {
  const [node] = parsePhaseBRaw("(fn generator g ((value)) (return (yield value)))", "lower-yield.test.t2");
  const program = lowerPhaseB([node]);
  const fn = program.body.find((entry) => entry instanceof FunctionExpr) as FunctionExpr | undefined;
  assert.ok(fn);
  const returnStmt = fn!.body.find((entry) => entry instanceof ReturnExpr) as ReturnExpr | undefined;
  assert.ok(returnStmt);
  assert.ok(returnStmt!.value instanceof YieldExpr);
  assert.strictEqual((returnStmt!.value as YieldExpr).delegate, false);

  const [delegatedNode] = parsePhaseBRaw("(fn generator g ((value)) (return (yield* value)))", "lower-yield-star.test.t2");
  const delegatedProgram = lowerPhaseB([delegatedNode]);
  const delegatedFn = delegatedProgram.body.find((entry) => entry instanceof FunctionExpr) as FunctionExpr | undefined;
  assert.ok(delegatedFn);
  const delegatedReturn = delegatedFn!.body.find((entry) => entry instanceof ReturnExpr) as ReturnExpr | undefined;
  assert.ok(delegatedReturn);
  assert.ok(delegatedReturn!.value instanceof YieldExpr);
  assert.strictEqual((delegatedReturn!.value as YieldExpr).delegate, true);
});

test("lowerPhaseB rejects await outside async callables", () => {
  const [node] = parsePhaseBRaw("(await (call foo))", "lower-await-outside.t2");
  assert.throws(
    () => lowerPhaseB([node]),
    (error) => error instanceof T2CompilationError && error.code === "T2:0324"
  );
});

test("lowerPhaseB allows await inside async callables", () => {
  const [node] = parsePhaseBRaw("(fn async (x) (return (await x)))", "lower-await-async.t2");
  const program = lowerPhaseB([node]);
  const stmt = program.body.find((entry) => entry instanceof FunctionExpr) as FunctionExpr | undefined;
  assert.ok(stmt);
  assert.strictEqual(stmt.async, true);
  const returnStmt = stmt.body.find((entry) => entry instanceof ReturnExpr) as ReturnExpr | undefined;
  assert.ok(returnStmt);
  assert.ok(returnStmt.value instanceof AwaitExpr);
});

test("lowerPhaseB unwraps program wrappers", () => {
  const [node] = parsePhaseBRaw("(program (assign foo 42))", "lower-program.test.t2");
  const program = lowerPhaseB([node]);
  const stmt = program.body.find((entry) => entry instanceof AssignExpr);
  assert.ok(stmt instanceof AssignExpr);
});

test("lowerPhaseB lowers primitive parameter annotations", () => {
  const [node] = parsePhaseBRaw("(fn (x : Number) (return x))", "lower-param-primitive.t2");
  const program = lowerPhaseB([node]);
  const stmt = program.body.find((entry) => entry instanceof FunctionExpr) as FunctionExpr | undefined;
  assert.ok(stmt);
  const param = stmt.signature.parameters[0];
  assert.ok(param.typeAnnotation instanceof TypePrimitive);
  assert.strictEqual(param.typeAnnotation.kind, "type-number");
});

test("lowerPhaseB lowers union parameter annotations", () => {
  const [node] = parsePhaseBRaw("(fn (x : (Foo | Bar)) (return x))", "lower-param-union.t2");
  const program = lowerPhaseB([node]);
  const stmt = program.body.find((entry) => entry instanceof FunctionExpr) as FunctionExpr | undefined;
  assert.ok(stmt);
  const param = stmt.signature.parameters[0];
  assert.ok(param.typeAnnotation instanceof TypeUnion);
});

test("lowerPhaseB lowers generic parameter annotations", () => {
  const [node] = parsePhaseBRaw("(fn (x : Foo<Bar>) (return x))", "lower-param-generic.t2");
  const program = lowerPhaseB([node]);
  const stmt = program.body.find((entry) => entry instanceof FunctionExpr) as FunctionExpr | undefined;
  assert.ok(stmt);
  const param = stmt.signature.parameters[0];
  assert.ok(param.typeAnnotation instanceof TypeApp);
  assert.ok(param.typeAnnotation!.typeArgs.length > 0);
});

test("lowerPhaseB captures return type annotations", () => {
  const [node] = parsePhaseBRaw("(fn (x) : Number (return x))", "lower-return-type.t2");
  const program = lowerPhaseB([node]);
  const stmt = program.body.find((entry) => entry instanceof FunctionExpr) as FunctionExpr | undefined;
  assert.ok(stmt);
  assert.ok(stmt.signature.returnType instanceof TypePrimitive);
  assert.strictEqual(stmt.signature.returnType.kind, "type-number");
});

test("lowerPhaseB lowers generic params and uses TypeVar", () => {
  const [node] = parsePhaseBRaw(
    "(fn <T, U>(x: T, y: U): [T, U] (return x))",
    "lower-generic-params.t2"
  );
  const program = lowerPhaseB([node]);
  const stmt = program.body.find((entry) => entry instanceof FunctionExpr) as FunctionExpr | undefined;
  assert.ok(stmt);
  assert.strictEqual(stmt.typeParams?.length, 2);
  assert.strictEqual(stmt.typeParams?.[0].name.name, "T");
  assert.strictEqual(stmt.typeParams?.[1].name.name, "U");
  const [paramX, paramY] = stmt.signature.parameters;
  assert.ok(paramX.typeAnnotation instanceof TypeVar);
  assert.strictEqual((paramX.typeAnnotation as TypeVar).name.name, "T");
  assert.ok(paramY.typeAnnotation instanceof TypeVar);
  assert.strictEqual((paramY.typeAnnotation as TypeVar).name.name, "U");
  const returnType = stmt.signature.returnType;
  assert.ok(returnType instanceof TypeTuple);
  const tuple = returnType as TypeTuple;
  assert.strictEqual(tuple.types.length, 2);
  assert.ok(tuple.types[0] instanceof TypeVar);
  assert.ok(tuple.types[1] instanceof TypeVar);
});

test("lowerPhaseB lowers type alias declarations with type params", () => {
  const [node] = parsePhaseBRaw(
    "(type Generic <T> (Array<T>))",
    "lower-type-alias.t2"
  );
  const program = lowerPhaseB([node]);
  const stmt = program.body.find((entry) => entry instanceof TypeAliasStmt) as TypeAliasStmt | undefined;
  assert.ok(stmt);
  assert.strictEqual(stmt.name.name, "Generic");
  assert.strictEqual(stmt.typeParams?.length, 1);
  assert.strictEqual(stmt.typeParams?.[0].name.name, "T");
  const value = stmt.typeValue;
  assert.ok(value instanceof TypeApp);
  const app = value as TypeApp;
  assert.ok(app.typeArgs[0] instanceof TypeVar);
});
