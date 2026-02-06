import test from "node:test";
import assert from "node:assert";
import { parseSource } from "../src/parse.js";
import {
  LetStarExpr,
  ExprStmt,
  ArrayExpr,
  Identifier,
  StaticBlockStmt,
  DefaultPattern,
  ArrayPattern,
  ObjectPattern,
  ForClassic,
  ForOf,
  ForAwait,
  AssignExpr,
  CallExpr,
  ThrowExpr,
  TypeAliasStmt,
  TypeUnion,
  TypeObject,
  TypeLiteral,
  TypeMapped,
  TypeApp,
  TypeParam,
  TypePrimitive,
  TypeRef,
  TypeAssertExpr,
  TryCatchExpr,
  SwitchStmt,
  ImportStmt,
  ExportStmt,
  Literal,
  PropExpr,
  IndexExpr,
  ObjectExpr,
  NewExpr,
  FunctionExpr,
  ClassExpr,
  EnumStmt,
  NamespaceStmt,
  InterfaceStmt,
  TemplateExpr,
  TypeTemplateLiteral,
  NonNullAssertExpr,
  CallWithThisExpr,
  IndexSignature,
  TypeThis,
} from "../src/phaseA1.js";

test("parseSource skips comments and preserves original line numbers", () => {
  const source = `(program
; line comment
(let* (x 1) x) // trailing comment
/* block
comment */
(array 1 2)
)`;

  const program = parseSource(source, "comments.t2");
  const letStar = program.body[0];
  assert.ok(letStar instanceof LetStarExpr);
  assert.strictEqual(letStar.span.startLine, 3);

  const bindingTarget = letStar.bindings[0].target;
  assert.ok(bindingTarget instanceof Identifier);
  assert.strictEqual(bindingTarget.span.startLine, 3);

  const arrayStmt = program.body[1];
  assert.ok(arrayStmt instanceof ExprStmt);
  assert.ok(arrayStmt.expr instanceof ArrayExpr);
  assert.strictEqual(arrayStmt.span.startLine, 6);
});

test("parseSource handles for loops", () => {
  const source = `(program
  (for classic
    (assign i 0)
    (< i 3)
    (+ i 1)
    (call log i))
  (for of
    ((item) items)
    (call log item))
  (for await
    ((value) (call fetchValues))
    (call log value))
)`;

  const program = parseSource(source);
  const [classicLoop, forOfLoop, forAwaitLoop] = program.body;

  assert.ok(classicLoop instanceof ForClassic);
  assert.ok(forOfLoop instanceof ForOf);
  assert.ok(forAwaitLoop instanceof ForAwait);

  assert.ok(classicLoop.init instanceof AssignExpr);
  assert.ok(classicLoop.condition instanceof CallExpr);
  assert.ok(classicLoop.update instanceof CallExpr);

  assert.ok(forOfLoop.binding.target instanceof Identifier);
  assert.strictEqual((forOfLoop.binding.target as Identifier).name, "item");
  assert.ok(forAwaitLoop.binding.target instanceof Identifier);
  assert.ok(forAwaitLoop.iterable instanceof CallExpr);
});

test("parseSource handles control-flow nesting", () => {
  const source = `(program
    (throw 42)
    (try
      (call run)
      (catch (err)
        (call handle err))
      (finally
        (call cleanup)))
    (switch x
      (case 1 (call branchOne))
      (case 2 (call branchTwo))
      (default (call fallback))))`;

  const program = parseSource(source);
  const [throwStmt, tryStmt, switchStmt] = program.body;

  assert.ok(throwStmt instanceof ExprStmt);
  assert.ok((throwStmt as ExprStmt).expr instanceof ThrowExpr);

  assert.ok(tryStmt instanceof ExprStmt);
  const tryExpr = (tryStmt as ExprStmt).expr;
  assert.ok(tryExpr instanceof TryCatchExpr);
  assert.strictEqual(tryExpr.catchClause?.body.length, 1);
  assert.strictEqual(tryExpr.finallyClause?.body.length, 1);
  assert.ok(tryExpr.catchClause?.binding?.target instanceof Identifier);

  assert.ok(switchStmt instanceof SwitchStmt);
  assert.strictEqual(switchStmt.cases.length, 3);
  assert.strictEqual(switchStmt.cases[2].test, null);
});

test("parseSource handles prop/index/object/new expressions", () => {
  const source = `(program
    (let* (obj (object ("foo" 1) ("bar" 2)))
    (call log
      (prop obj "foo")
      (index obj (call getKey))
      (new Widget obj)))
  )`;

  const program = parseSource(source);
  const [letStar] = program.body;

  assert.ok(letStar instanceof LetStarExpr);
  const bindingInit = letStar.bindings[0].init;
  assert.ok(bindingInit instanceof ObjectExpr);
  assert.strictEqual(bindingInit.fields.length, 2);

  assert.strictEqual(letStar.body.length, 1);
  const exprStmt = letStar.body[0];
  assert.ok(exprStmt instanceof ExprStmt);
  const callExpr = exprStmt.expr;
  assert.ok(callExpr instanceof CallExpr);
  assert.strictEqual(callExpr.args.length, 3);

  const [propExpr, indexExpr, newExpr] = callExpr.args;
  assert.ok(propExpr instanceof PropExpr);
  assert.ok(indexExpr instanceof IndexExpr);
  assert.ok(newExpr instanceof NewExpr);

  assert.strictEqual(propExpr.name, "foo");
  assert.ok(indexExpr.index instanceof CallExpr);
  assert.ok(indexExpr.object instanceof Identifier);
  assert.strictEqual((indexExpr.object as Identifier).name, "obj");
  assert.ok(newExpr.callee instanceof Identifier);
  assert.strictEqual(newExpr.callee.name, "Widget");
  assert.strictEqual(newExpr.args.length, 1);
});

test("parseSource ignores comma separators in lists", () => {
  const source = `(program
    (call log 1, 2)
    (array 1, 2, 3)
    (object ("a" 1), ("b" 2))
    (fn ((x), (y)) (return x))
  )`;

  const program = parseSource(source);
  const callStmt = program.body[0] as ExprStmt;
  assert.ok(callStmt.expr instanceof CallExpr);
  assert.strictEqual(callStmt.expr.args.length, 2);

  const arrayStmt = program.body[1] as ExprStmt;
  assert.ok(arrayStmt.expr instanceof ArrayExpr);
  assert.strictEqual(arrayStmt.expr.elements.length, 3);

  const objectStmt = program.body[2] as ExprStmt;
  assert.ok(objectStmt.expr instanceof ObjectExpr);
  assert.strictEqual(objectStmt.expr.fields.length, 2);

  const fnStmt = program.body[3];
  assert.ok(fnStmt instanceof FunctionExpr);
  assert.strictEqual(fnStmt.signature.parameters.length, 2);
});

test("parseSource handles import/export statements", () => {
  const source = `(program
    (import (import-spec "./default" (default Default)))
    (import (import-spec "./named" (named (Foo alias) Bar)))
    (import (import-spec "./all" (namespace Everything)))
    (export (export-spec (named Bar)))
    (export (export-spec (default (call Default))))
  )`;

  const program = parseSource(source);
  const [importDefault, importNamed, importAll, exportNamed, exportDefault] = program.body;

  assert.ok(importDefault instanceof ImportStmt);
  assert.strictEqual(importDefault.spec.defaultBinding?.name, "Default");
  assert.ok(importDefault.spec.source instanceof Literal);
  assert.strictEqual(importDefault.spec.source.value, "./default");

  assert.ok(importNamed instanceof ImportStmt);
  assert.strictEqual(importNamed.spec.named?.length, 2);
  assert.strictEqual(importNamed.spec.named?.[0].imported, "Foo");
  assert.strictEqual(importNamed.spec.named?.[0].local.name, "alias");

  assert.ok(importAll instanceof ImportStmt);
  assert.strictEqual(importAll.spec.namespaceBinding?.name, "Everything");

  assert.ok(exportNamed instanceof ExportStmt);
  assert.strictEqual(exportNamed.spec.named?.[0].exported, "Bar");

  assert.ok(exportDefault instanceof ExportStmt);
  assert.ok(exportDefault.spec.defaultExport instanceof CallExpr);
});

test("parseSource handles class extends/implements", () => {
  const source = `(program
    (class Child
      (extends Parent)
      (implements Foo Bar)
      (class-body
        (method "constructor" ()
          (call super))))
  )`;

  const program = parseSource(source);
  const classExpr = program.body[0];
  assert.ok(classExpr instanceof ClassExpr);
  assert.ok(classExpr.extends instanceof Identifier);
  assert.strictEqual((classExpr.extends as Identifier).name, "Parent");
  assert.strictEqual(classExpr.implements?.length, 2);
  assert.ok(classExpr.implements?.[0] instanceof Identifier);
  assert.ok(classExpr.implements?.[1] instanceof Identifier);
  assert.strictEqual((classExpr.implements?.[0] as Identifier).name, "Foo");
  assert.strictEqual((classExpr.implements?.[1] as Identifier).name, "Bar");
});

test("parseSource handles abstract class and abstract method", () => {
  const source = `(program
    (class Animal
      (abstract)
      (class-body
        (method abstract "makeSound" ((type-void)))))
  )`;

  const program = parseSource(source);
  const classExpr = program.body[0];
  assert.ok(classExpr instanceof ClassExpr);
  assert.strictEqual(classExpr.abstract, true);
  const member = classExpr.body.statements[0];
  assert.ok(member instanceof FunctionExpr);
  assert.strictEqual((member as FunctionExpr).callableKind, "method");
  assert.strictEqual((member as FunctionExpr).abstract, true);
});

test("parseSource handles function overload signatures", () => {
  const source = `(program
    (fn overload process ((x (type-string)) (type-string)))
    (fn overload process ((x (type-number)) (type-number)))
    (fn process ((x (type-union (type-string) (type-number))) (type-string))
      (return x))
  )`;

  const program = parseSource(source);
  const overloadOne = program.body[0];
  const overloadTwo = program.body[1];
  const impl = program.body[2];

  assert.ok(overloadOne instanceof FunctionExpr);
  assert.ok(overloadTwo instanceof FunctionExpr);
  assert.ok(impl instanceof FunctionExpr);
  assert.strictEqual((overloadOne as FunctionExpr).overload, true);
  assert.strictEqual((overloadTwo as FunctionExpr).overload, true);
  assert.strictEqual((impl as FunctionExpr).overload, undefined);
});

test("parseSource handles this parameter in functions", () => {
  const source = `(program
    (fn handler ((this (type-ref HTMLElement)) (e (type-ref Event)))
      (return e))
  )`;

  const program = parseSource(source);
  const handler = program.body[0];
  assert.ok(handler instanceof FunctionExpr);
  assert.strictEqual(handler.signature.parameters[0].name.name, "this");
  assert.strictEqual(handler.signature.parameters[1].name.name, "e");
});

test("parseSource handles template literal expressions", () => {
  const source = `(program
    (template "Hello, " name "!"))`;

  const program = parseSource(source);
  const [exprStmt] = program.body;
  assert.ok(exprStmt instanceof ExprStmt);
  assert.ok(exprStmt.expr instanceof TemplateExpr);
  const templateExpr = exprStmt.expr as TemplateExpr;
  assert.strictEqual(templateExpr.parts.length, 3);
  assert.ok(templateExpr.parts[0] instanceof Literal);
  assert.ok(templateExpr.parts[1] instanceof Identifier);
});

test("parseSource handles template literal types", () => {
  const source = `(program
    (type-alias Greeting (type-template "Hello, " (type-string) "!")))`;

  const program = parseSource(source);
  const [alias] = program.body;
  assert.ok(alias instanceof TypeAliasStmt);
  const typeValue = (alias as TypeAliasStmt).typeValue;
  assert.ok(typeValue instanceof TypeTemplateLiteral);
  const templateType = typeValue as TypeTemplateLiteral;
  assert.strictEqual(templateType.parts.length, 3);
});

test("parseSource handles non-null assertions", () => {
  const source = `(program
    (non-null value))`;

  const program = parseSource(source);
  const [exprStmt] = program.body;
  assert.ok(exprStmt instanceof ExprStmt);
  assert.ok(exprStmt.expr instanceof NonNullAssertExpr);
});

test("parseSource handles call-with-this", () => {
  const source = `(program
    (call-with-this (prop obj "method") obj 1 2))`;

  const program = parseSource(source);
  const [exprStmt] = program.body;
  assert.ok(exprStmt instanceof ExprStmt);
  assert.ok(exprStmt.expr instanceof CallWithThisExpr);
});

test("parseSource handles constructor overloads", () => {
  const source = `(program
    (class Box
      (class-body
        (method overload "constructor" ((value (type-string))))
        (method overload "constructor" ((value (type-number))))
        (method "constructor" ((value (type-union (type-string) (type-number))))))))`;

  const program = parseSource(source);
  const classExpr = program.body[0];
  assert.ok(classExpr instanceof ClassExpr);
  const members = (classExpr as ClassExpr).body.statements;
  assert.strictEqual(members.length, 3);
  assert.ok(members[0] instanceof FunctionExpr);
  assert.strictEqual((members[0] as FunctionExpr).overload, true);
});

test("parseSource handles index signatures", () => {
  const source = `(program
    (class Box
      (class-body
        (index-signature (key (type-string)) (type-number))))
    (type-interface Bag
      (interface-body
        (index-signature (key (type-string)) (type-number)))))`;

  const program = parseSource(source);
  const classExpr = program.body[0];
  assert.ok(classExpr instanceof ClassExpr);
  const classMember = (classExpr as ClassExpr).body.statements[0];
  assert.ok(classMember instanceof IndexSignature);

  const interfaceStmt = program.body[1];
  assert.ok(interfaceStmt instanceof InterfaceStmt);
  const indexSignatures = (interfaceStmt as InterfaceStmt).body.indexSignatures;
  assert.ok(indexSignatures && indexSignatures.length === 1);
});

test("parseSource handles generic classes", () => {
  const source = `(program
    (class Box
      (typeparams (T))
      (class-body)))`;

  const program = parseSource(source);
  const classExpr = program.body[0];
  assert.ok(classExpr instanceof ClassExpr);
  assert.ok((classExpr as ClassExpr).typeParams);
});

test("parseSource handles static blocks", () => {
  const source = `(program
    (class Box
      (class-body
        (static-block
          (assign x 1)))))`;

  const program = parseSource(source);
  const classExpr = program.body[0];
  assert.ok(classExpr instanceof ClassExpr);
  const member = (classExpr as ClassExpr).body.statements[0];
  assert.ok(member instanceof StaticBlockStmt);
});

test("parseSource handles parameter properties", () => {
  const source = `(program
    (class Person
      (class-body
        (method "constructor" ((public name (type-string)) (readonly age (type-number)))))))`;

  const program = parseSource(source);
  const classExpr = program.body[0];
  assert.ok(classExpr instanceof ClassExpr);
  const constructor = (classExpr as ClassExpr).body.statements[0];
  assert.ok(constructor instanceof FunctionExpr);
  const params = (constructor as FunctionExpr).signature.parameters;
  assert.strictEqual(params.length, 2);
  assert.deepStrictEqual(params[0].paramProperty, { access: "public" });
  assert.deepStrictEqual(params[1].paramProperty, { readonly: true });
});

test("parseSource handles default parameters", () => {
  const source = `(program
    (fn greet ((name (type-string) default "world") (punct default "!"))
      (return name)))`;

  const program = parseSource(source);
  const fnExpr = program.body[0];
  assert.ok(fnExpr instanceof FunctionExpr);
  const params = (fnExpr as FunctionExpr).signature.parameters;
  assert.strictEqual(params.length, 2);
  assert.ok(params[0].defaultValue instanceof Literal);
  assert.ok(params[1].defaultValue instanceof Literal);
});

test("parseSource handles destructuring defaults", () => {
  const source = `(program
    (let* (((array-pattern (default x 1) y) (array 1 2))))
    (let* (((object-pattern ("a" (default a 1)) ("b" b)) obj))))`;

  const program = parseSource(source);
  const arrayLet = program.body[0];
  assert.ok(arrayLet instanceof LetStarExpr);
  const arrayTarget = (arrayLet as LetStarExpr).bindings[0].target;
  assert.ok(arrayTarget instanceof ArrayPattern);
  assert.ok((arrayTarget as ArrayPattern).elements[0] instanceof DefaultPattern);

  const objectLet = program.body[1];
  assert.ok(objectLet instanceof LetStarExpr);
  const objectTarget = (objectLet as LetStarExpr).bindings[0].target;
  assert.ok(objectTarget instanceof ObjectPattern);
  const firstProp = (objectTarget as ObjectPattern).properties[0];
  assert.ok(firstProp.target instanceof DefaultPattern);
});

test("parseSource handles this types", () => {
  const source = `(program
    (type-alias Self (type-this)))`;

  const program = parseSource(source);
  const alias = program.body[0];
  assert.ok(alias instanceof TypeAliasStmt);
  assert.ok((alias as TypeAliasStmt).typeValue instanceof TypeThis);
});

test("parseSource handles enum declarations", () => {
  const source = `(program
    (enum Direction
      (enum-body
        ("Up" 0)
        ("Down" 1)
        ("Left")
        ("Right")))
  )`;

  const program = parseSource(source);
  const enumStmt = program.body[0];
  assert.ok(enumStmt instanceof EnumStmt);
  assert.strictEqual(enumStmt.name.name, "Direction");
  assert.strictEqual(enumStmt.members.length, 4);
  assert.strictEqual(enumStmt.members[0].name, "Up");
  assert.strictEqual(enumStmt.members[1].name, "Down");
});

test("parseSource handles namespace declarations", () => {
  const source = `(program
    (namespace Utils
      (namespace-body
        (fn helper ((x (type-number)) (type-number))
          (return x))
        (export (export-spec (named helper)))))
  )`;

  const program = parseSource(source);
  const namespaceStmt = program.body[0];
  assert.ok(namespaceStmt instanceof NamespaceStmt);
  assert.strictEqual(namespaceStmt.name.name, "Utils");
  assert.strictEqual(namespaceStmt.body.length, 2);
});

test("parseSource handles class decorators", () => {
  const source = `(program
    (class C
      (decorators sealed)
      (class-body
        (method "constructor" ()
          (return this))))
  )`;

  const program = parseSource(source);
  const classExpr = program.body[0];
  assert.ok(classExpr instanceof ClassExpr);
  assert.ok(classExpr.decorators);
  assert.strictEqual(classExpr.decorators?.length, 1);
  assert.ok(classExpr.decorators?.[0] instanceof Identifier);
});

test("parseSource handles interface declaration merging", () => {
  const source = `(program
    (type-interface Box
      (interface-body
        (width (type-number))))
    (type-interface Box
      (interface-body
        (height (type-number))))
  )`;

  const program = parseSource(source);
  const first = program.body[0];
  const second = program.body[1];
  assert.ok(first instanceof InterfaceStmt);
  assert.ok(second instanceof InterfaceStmt);
  assert.strictEqual(first.name.name, "Box");
  assert.strictEqual(second.name.name, "Box");
});

test("parseSource handles class getters and setters", () => {
  const source = `(program
    (class C
      (class-body
        (getter "value" ((type-number))
          (prop this "value"))
        (setter "value" ((v (type-number)))
          (assign (prop this "value") v))))
  )`;

  const program = parseSource(source);
  const classExpr = program.body[0];
  assert.ok(classExpr instanceof ClassExpr);
  const members = classExpr.body.statements;
  assert.strictEqual(members.length, 2);
  assert.ok(members[0] instanceof FunctionExpr);
  assert.ok(members[1] instanceof FunctionExpr);
  assert.strictEqual((members[0] as FunctionExpr).callableKind, "getter");
  assert.strictEqual((members[1] as FunctionExpr).callableKind, "setter");
});

test("parseSource handles type expressions and assertions", () => {
  const source = `(program
    (type-alias OptionalValue
      (typeparams (T (extends (type-string)) (default (type-number))))
      (type-union
        (type-ref T)
        (type-null)))
    (type-alias Point
      (type-object
        (x (type-number))
        (y (type-number))))
    (type-alias LiteralValues
      (type-literal "foo" "bar"))
    (type-alias MapIt
      (type-mapped (T)
        (type-ref Value)
        (type-ref Identity)
        readonly
        optional
        (type-null)))
    (type-alias Boxed
      (type-app
        (type-ref Box)
        (type-ref OptionalValue)))
    (type-assert
      (call wrap (call wrap2))
      (type-ref Box)))`;

  const program = parseSource(source);
  const [optionalAlias, pointAlias, literalAlias, mappedAlias, boxedAlias, assertStmt] = program.body;

  assert.ok(optionalAlias instanceof TypeAliasStmt);
  assert.ok(optionalAlias.typeValue instanceof TypeUnion);
  assert.strictEqual(optionalAlias.typeParams?.length, 1);
  const optionalParam = optionalAlias.typeParams?.[0];
  assert.ok(optionalParam);
  assert.ok(optionalParam instanceof TypeParam);
  assert.strictEqual(optionalParam.name.name, "T");
  assert.ok(optionalParam.constraint instanceof TypePrimitive);
  assert.ok(optionalParam.defaultType instanceof TypePrimitive);
  assert.ok(optionalAlias.typeValue.types.some((member) => member instanceof TypeRef && member.identifier.name === "T"));
  assert.ok(optionalAlias.typeValue.types.some((member) => member instanceof TypePrimitive && member.kind === "type-null"));

  assert.ok(pointAlias instanceof TypeAliasStmt);
  assert.ok(pointAlias.typeValue instanceof TypeObject);
  assert.strictEqual(pointAlias.typeValue.fields.length, 2);
  assert.strictEqual(pointAlias.typeValue.fields[0].key, "x");
  assert.ok(pointAlias.typeValue.fields[0].fieldType instanceof TypePrimitive);

  assert.ok(literalAlias instanceof TypeAliasStmt);
  assert.ok(literalAlias.typeValue instanceof TypeLiteral);
  assert.strictEqual(literalAlias.typeValue.value.length, 2);
  assert.strictEqual(literalAlias.typeValue.value[0].value, "foo");

  assert.ok(mappedAlias instanceof TypeAliasStmt);
  assert.ok(mappedAlias.typeValue instanceof TypeMapped);
  assert.strictEqual(mappedAlias.typeValue.typeParam.name.name, "T");
  assert.ok(mappedAlias.typeValue.valueType instanceof TypeRef);
  assert.ok(mappedAlias.typeValue.nameRemap instanceof TypeRef);
  assert.strictEqual(mappedAlias.typeValue.readonlyModifier, "readonly");
  assert.strictEqual(mappedAlias.typeValue.optionalModifier, "optional");
  assert.ok(mappedAlias.typeValue.via instanceof TypePrimitive);

  assert.ok(boxedAlias instanceof TypeAliasStmt);
  assert.ok(boxedAlias.typeValue instanceof TypeApp);
  assert.ok(boxedAlias.typeValue.expr instanceof TypeRef);
  assert.strictEqual(boxedAlias.typeValue.typeArgs.length, 1);
  assert.ok(boxedAlias.typeValue.typeArgs[0] instanceof TypeRef);

  assert.ok(assertStmt instanceof ExprStmt);
  const assertExpr = assertStmt.expr;
  assert.ok(assertExpr instanceof TypeAssertExpr);
  assert.ok(assertExpr.assertedType instanceof TypeRef);
  assert.strictEqual(assertExpr.assertedType.identifier.name, "Box");
});

test("parseSource honors async callable flags", () => {
  const source = `(program
    (fn async ((value))
      (return value))
  )`;

  const [functionStmt] = parseSource(source).body;
  assert.ok(functionStmt instanceof FunctionExpr);
  assert.strictEqual(functionStmt.async, true);
  assert.strictEqual(functionStmt.generator, false);
});

test("parseSource honors generator callable flags", () => {
  const source = `(program
    (fn generator ((value))
      (return value))
  )`;

  const [functionStmt] = parseSource(source).body;
  assert.ok(functionStmt instanceof FunctionExpr);
  assert.strictEqual(functionStmt.generator, true);
  assert.strictEqual(functionStmt.async, false);
});
