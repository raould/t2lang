
import { ErrorNode, ParseTreeListener, ParserRuleContext, TerminalNode } from "antlr4ng";


import { ProgramContext } from "./Stage6Parser.js";
import { TopLevelContext } from "./Stage6Parser.js";
import { DeclContext } from "./Stage6Parser.js";
import { DefmacroContext } from "./Stage6Parser.js";
import { MacroTimeFnDefContext } from "./Stage6Parser.js";
import { TopLevelLetContext } from "./Stage6Parser.js";
import { TopLevelConstContext } from "./Stage6Parser.js";
import { MetaAnnotationContext } from "./Stage6Parser.js";
import { TypeAliasContext } from "./Stage6Parser.js";
import { InterfaceDefContext } from "./Stage6Parser.js";
import { InterfaceExtendsContext } from "./Stage6Parser.js";
import { ClassDefContext } from "./Stage6Parser.js";
import { AnonClassDefContext } from "./Stage6Parser.js";
import { ClassExtendsContext } from "./Stage6Parser.js";
import { ClassImplementsContext } from "./Stage6Parser.js";
import { ClassBodyContext } from "./Stage6Parser.js";
import { ClassElementContext } from "./Stage6Parser.js";
import { ModifierContext } from "./Stage6Parser.js";
import { FieldDefContext } from "./Stage6Parser.js";
import { ConstructorDefContext } from "./Stage6Parser.js";
import { ClassMethodDefContext } from "./Stage6Parser.js";
import { AbstractMethodDefContext } from "./Stage6Parser.js";
import { GetterDefContext } from "./Stage6Parser.js";
import { SetterDefContext } from "./Stage6Parser.js";
import { TypedParamContext } from "./Stage6Parser.js";
import { FnSignatureTypedContext } from "./Stage6Parser.js";
import { StatementContext } from "./Stage6Parser.js";
import { LetStarContext } from "./Stage6Parser.js";
import { LetStmtContext } from "./Stage6Parser.js";
import { ConstStarContext } from "./Stage6Parser.js";
import { ConstStmtContext } from "./Stage6Parser.js";
import { IfFormContext } from "./Stage6Parser.js";
import { WhileFormContext } from "./Stage6Parser.js";
import { BlockContext } from "./Stage6Parser.js";
import { ReturnFormContext } from "./Stage6Parser.js";
import { ThrowFormContext } from "./Stage6Parser.js";
import { ImportFormContext } from "./Stage6Parser.js";
import { ImportTypeFormContext } from "./Stage6Parser.js";
import { ImportTypeSpecContext } from "./Stage6Parser.js";
import { ImportTypeNameContext } from "./Stage6Parser.js";
import { ExportFormContext } from "./Stage6Parser.js";
import { ExportBindingContext } from "./Stage6Parser.js";
import { ExportDefaultContext } from "./Stage6Parser.js";
import { ExportNamedContext } from "./Stage6Parser.js";
import { ExportNamePairContext } from "./Stage6Parser.js";
import { ExportFromContext } from "./Stage6Parser.js";
import { ExportAllFromContext } from "./Stage6Parser.js";
import { ExportNsFromFormContext } from "./Stage6Parser.js";
import { ExportTypeFormContext } from "./Stage6Parser.js";
import { ExportTypeFromFormContext } from "./Stage6Parser.js";
import { ExportTypeAllFromFormContext } from "./Stage6Parser.js";
import { ExportDeclFormContext } from "./Stage6Parser.js";
import { StarBindingContext } from "./Stage6Parser.js";
import { SingleBindingContext } from "./Stage6Parser.js";
import { TypeExprContext } from "./Stage6Parser.js";
import { TypeUnionContext } from "./Stage6Parser.js";
import { TypeIntersectionContext } from "./Stage6Parser.js";
import { TypeArrayContext } from "./Stage6Parser.js";
import { TypeTupleContext } from "./Stage6Parser.js";
import { TypeTupleElementContext } from "./Stage6Parser.js";
import { TypeFunctionContext } from "./Stage6Parser.js";
import { TypeFnParamContext } from "./Stage6Parser.js";
import { TypeObjectContext } from "./Stage6Parser.js";
import { TypePropContext } from "./Stage6Parser.js";
import { PropModifierContext } from "./Stage6Parser.js";
import { TypeLiteralContext } from "./Stage6Parser.js";
import { TypeKeyofContext } from "./Stage6Parser.js";
import { TypeTypeofContext } from "./Stage6Parser.js";
import { TypeIndexAccessContext } from "./Stage6Parser.js";
import { TypeConditionalContext } from "./Stage6Parser.js";
import { TypeInferContext } from "./Stage6Parser.js";
import { TypeMappedContext } from "./Stage6Parser.js";
import { MappedModifiersContext } from "./Stage6Parser.js";
import { MappedModifierContext } from "./Stage6Parser.js";
import { TypeTemplateLiteralContext } from "./Stage6Parser.js";
import { TemplatePartContext } from "./Stage6Parser.js";
import { TypeApplicationContext } from "./Stage6Parser.js";
import { TypeParamsContext } from "./Stage6Parser.js";
import { TypeParamDeclContext } from "./Stage6Parser.js";
import { TypeParamConstraintContext } from "./Stage6Parser.js";
import { TypeParamDefaultContext } from "./Stage6Parser.js";
import { AssignContext } from "./Stage6Parser.js";
import { SwitchFormContext } from "./Stage6Parser.js";
import { CaseClauseContext } from "./Stage6Parser.js";
import { DefaultClauseContext } from "./Stage6Parser.js";
import { ForFormContext } from "./Stage6Parser.js";
import { ForInFormContext } from "./Stage6Parser.js";
import { ForOfFormContext } from "./Stage6Parser.js";
import { ForAwaitFormContext } from "./Stage6Parser.js";
import { ExpressionContext } from "./Stage6Parser.js";
import { ThisExprContext } from "./Stage6Parser.js";
import { SuperExprContext } from "./Stage6Parser.js";
import { SuperConstructorCallContext } from "./Stage6Parser.js";
import { SuperMethodCallContext } from "./Stage6Parser.js";
import { TypeofExprContext } from "./Stage6Parser.js";
import { TypeAssertContext } from "./Stage6Parser.js";
import { LambdaContext } from "./Stage6Parser.js";
import { FnContext } from "./Stage6Parser.js";
import { AsyncLambdaContext } from "./Stage6Parser.js";
import { AsyncFnContext } from "./Stage6Parser.js";
import { GeneratorFnContext } from "./Stage6Parser.js";
import { AsyncGeneratorFnContext } from "./Stage6Parser.js";
import { AwaitExprContext } from "./Stage6Parser.js";
import { YieldExprContext } from "./Stage6Parser.js";
import { YieldStarExprContext } from "./Stage6Parser.js";
import { BindExprContext } from "./Stage6Parser.js";
import { MethodCallExprContext } from "./Stage6Parser.js";
import { TernaryContext } from "./Stage6Parser.js";
import { CondExprContext } from "./Stage6Parser.js";
import { NewFormContext } from "./Stage6Parser.js";
import { ObjectExprContext } from "./Stage6Parser.js";
import { ObjectFieldContext } from "./Stage6Parser.js";
import { MethodDefContext } from "./Stage6Parser.js";
import { ArrayExprContext } from "./Stage6Parser.js";
import { TemplateExprContext } from "./Stage6Parser.js";
import { PropKeyContext } from "./Stage6Parser.js";
import { PropAccessContext } from "./Stage6Parser.js";
import { IndexAccessContext } from "./Stage6Parser.js";
import { QuasiquoteContext } from "./Stage6Parser.js";
import { UnquoteContext } from "./Stage6Parser.js";
import { UnquoteSplicingContext } from "./Stage6Parser.js";
import { OptChainContext } from "./Stage6Parser.js";
import { OptChainIndexContext } from "./Stage6Parser.js";
import { NullCoalesceContext } from "./Stage6Parser.js";
import { CallContext } from "./Stage6Parser.js";
import { TypeArgsContext } from "./Stage6Parser.js";
import { FnSignatureContext } from "./Stage6Parser.js";
import { ParamContext } from "./Stage6Parser.js";
import { RestParamContext } from "./Stage6Parser.js";
import { LiteralContext } from "./Stage6Parser.js";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `Stage6Parser`.
 */
export class Stage6Listener implements ParseTreeListener {
    /**
     * Enter a parse tree produced by `Stage6Parser.program`.
     * @param ctx the parse tree
     */
    enterProgram?: (ctx: ProgramContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.program`.
     * @param ctx the parse tree
     */
    exitProgram?: (ctx: ProgramContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.topLevel`.
     * @param ctx the parse tree
     */
    enterTopLevel?: (ctx: TopLevelContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.topLevel`.
     * @param ctx the parse tree
     */
    exitTopLevel?: (ctx: TopLevelContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.decl`.
     * @param ctx the parse tree
     */
    enterDecl?: (ctx: DeclContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.decl`.
     * @param ctx the parse tree
     */
    exitDecl?: (ctx: DeclContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.defmacro`.
     * @param ctx the parse tree
     */
    enterDefmacro?: (ctx: DefmacroContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.defmacro`.
     * @param ctx the parse tree
     */
    exitDefmacro?: (ctx: DefmacroContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.macroTimeFnDef`.
     * @param ctx the parse tree
     */
    enterMacroTimeFnDef?: (ctx: MacroTimeFnDefContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.macroTimeFnDef`.
     * @param ctx the parse tree
     */
    exitMacroTimeFnDef?: (ctx: MacroTimeFnDefContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.topLevelLet`.
     * @param ctx the parse tree
     */
    enterTopLevelLet?: (ctx: TopLevelLetContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.topLevelLet`.
     * @param ctx the parse tree
     */
    exitTopLevelLet?: (ctx: TopLevelLetContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.topLevelConst`.
     * @param ctx the parse tree
     */
    enterTopLevelConst?: (ctx: TopLevelConstContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.topLevelConst`.
     * @param ctx the parse tree
     */
    exitTopLevelConst?: (ctx: TopLevelConstContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.metaAnnotation`.
     * @param ctx the parse tree
     */
    enterMetaAnnotation?: (ctx: MetaAnnotationContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.metaAnnotation`.
     * @param ctx the parse tree
     */
    exitMetaAnnotation?: (ctx: MetaAnnotationContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.typeAlias`.
     * @param ctx the parse tree
     */
    enterTypeAlias?: (ctx: TypeAliasContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.typeAlias`.
     * @param ctx the parse tree
     */
    exitTypeAlias?: (ctx: TypeAliasContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.interfaceDef`.
     * @param ctx the parse tree
     */
    enterInterfaceDef?: (ctx: InterfaceDefContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.interfaceDef`.
     * @param ctx the parse tree
     */
    exitInterfaceDef?: (ctx: InterfaceDefContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.interfaceExtends`.
     * @param ctx the parse tree
     */
    enterInterfaceExtends?: (ctx: InterfaceExtendsContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.interfaceExtends`.
     * @param ctx the parse tree
     */
    exitInterfaceExtends?: (ctx: InterfaceExtendsContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.classDef`.
     * @param ctx the parse tree
     */
    enterClassDef?: (ctx: ClassDefContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.classDef`.
     * @param ctx the parse tree
     */
    exitClassDef?: (ctx: ClassDefContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.anonClassDef`.
     * @param ctx the parse tree
     */
    enterAnonClassDef?: (ctx: AnonClassDefContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.anonClassDef`.
     * @param ctx the parse tree
     */
    exitAnonClassDef?: (ctx: AnonClassDefContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.classExtends`.
     * @param ctx the parse tree
     */
    enterClassExtends?: (ctx: ClassExtendsContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.classExtends`.
     * @param ctx the parse tree
     */
    exitClassExtends?: (ctx: ClassExtendsContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.classImplements`.
     * @param ctx the parse tree
     */
    enterClassImplements?: (ctx: ClassImplementsContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.classImplements`.
     * @param ctx the parse tree
     */
    exitClassImplements?: (ctx: ClassImplementsContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.classBody`.
     * @param ctx the parse tree
     */
    enterClassBody?: (ctx: ClassBodyContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.classBody`.
     * @param ctx the parse tree
     */
    exitClassBody?: (ctx: ClassBodyContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.classElement`.
     * @param ctx the parse tree
     */
    enterClassElement?: (ctx: ClassElementContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.classElement`.
     * @param ctx the parse tree
     */
    exitClassElement?: (ctx: ClassElementContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.modifier`.
     * @param ctx the parse tree
     */
    enterModifier?: (ctx: ModifierContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.modifier`.
     * @param ctx the parse tree
     */
    exitModifier?: (ctx: ModifierContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.fieldDef`.
     * @param ctx the parse tree
     */
    enterFieldDef?: (ctx: FieldDefContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.fieldDef`.
     * @param ctx the parse tree
     */
    exitFieldDef?: (ctx: FieldDefContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.constructorDef`.
     * @param ctx the parse tree
     */
    enterConstructorDef?: (ctx: ConstructorDefContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.constructorDef`.
     * @param ctx the parse tree
     */
    exitConstructorDef?: (ctx: ConstructorDefContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.classMethodDef`.
     * @param ctx the parse tree
     */
    enterClassMethodDef?: (ctx: ClassMethodDefContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.classMethodDef`.
     * @param ctx the parse tree
     */
    exitClassMethodDef?: (ctx: ClassMethodDefContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.abstractMethodDef`.
     * @param ctx the parse tree
     */
    enterAbstractMethodDef?: (ctx: AbstractMethodDefContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.abstractMethodDef`.
     * @param ctx the parse tree
     */
    exitAbstractMethodDef?: (ctx: AbstractMethodDefContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.getterDef`.
     * @param ctx the parse tree
     */
    enterGetterDef?: (ctx: GetterDefContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.getterDef`.
     * @param ctx the parse tree
     */
    exitGetterDef?: (ctx: GetterDefContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.setterDef`.
     * @param ctx the parse tree
     */
    enterSetterDef?: (ctx: SetterDefContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.setterDef`.
     * @param ctx the parse tree
     */
    exitSetterDef?: (ctx: SetterDefContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.typedParam`.
     * @param ctx the parse tree
     */
    enterTypedParam?: (ctx: TypedParamContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.typedParam`.
     * @param ctx the parse tree
     */
    exitTypedParam?: (ctx: TypedParamContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.fnSignatureTyped`.
     * @param ctx the parse tree
     */
    enterFnSignatureTyped?: (ctx: FnSignatureTypedContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.fnSignatureTyped`.
     * @param ctx the parse tree
     */
    exitFnSignatureTyped?: (ctx: FnSignatureTypedContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.statement`.
     * @param ctx the parse tree
     */
    enterStatement?: (ctx: StatementContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.statement`.
     * @param ctx the parse tree
     */
    exitStatement?: (ctx: StatementContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.letStar`.
     * @param ctx the parse tree
     */
    enterLetStar?: (ctx: LetStarContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.letStar`.
     * @param ctx the parse tree
     */
    exitLetStar?: (ctx: LetStarContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.letStmt`.
     * @param ctx the parse tree
     */
    enterLetStmt?: (ctx: LetStmtContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.letStmt`.
     * @param ctx the parse tree
     */
    exitLetStmt?: (ctx: LetStmtContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.constStar`.
     * @param ctx the parse tree
     */
    enterConstStar?: (ctx: ConstStarContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.constStar`.
     * @param ctx the parse tree
     */
    exitConstStar?: (ctx: ConstStarContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.constStmt`.
     * @param ctx the parse tree
     */
    enterConstStmt?: (ctx: ConstStmtContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.constStmt`.
     * @param ctx the parse tree
     */
    exitConstStmt?: (ctx: ConstStmtContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.ifForm`.
     * @param ctx the parse tree
     */
    enterIfForm?: (ctx: IfFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.ifForm`.
     * @param ctx the parse tree
     */
    exitIfForm?: (ctx: IfFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.whileForm`.
     * @param ctx the parse tree
     */
    enterWhileForm?: (ctx: WhileFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.whileForm`.
     * @param ctx the parse tree
     */
    exitWhileForm?: (ctx: WhileFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.block`.
     * @param ctx the parse tree
     */
    enterBlock?: (ctx: BlockContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.block`.
     * @param ctx the parse tree
     */
    exitBlock?: (ctx: BlockContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.returnForm`.
     * @param ctx the parse tree
     */
    enterReturnForm?: (ctx: ReturnFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.returnForm`.
     * @param ctx the parse tree
     */
    exitReturnForm?: (ctx: ReturnFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.throwForm`.
     * @param ctx the parse tree
     */
    enterThrowForm?: (ctx: ThrowFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.throwForm`.
     * @param ctx the parse tree
     */
    exitThrowForm?: (ctx: ThrowFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.importForm`.
     * @param ctx the parse tree
     */
    enterImportForm?: (ctx: ImportFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.importForm`.
     * @param ctx the parse tree
     */
    exitImportForm?: (ctx: ImportFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.importTypeForm`.
     * @param ctx the parse tree
     */
    enterImportTypeForm?: (ctx: ImportTypeFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.importTypeForm`.
     * @param ctx the parse tree
     */
    exitImportTypeForm?: (ctx: ImportTypeFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.importTypeSpec`.
     * @param ctx the parse tree
     */
    enterImportTypeSpec?: (ctx: ImportTypeSpecContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.importTypeSpec`.
     * @param ctx the parse tree
     */
    exitImportTypeSpec?: (ctx: ImportTypeSpecContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.importTypeName`.
     * @param ctx the parse tree
     */
    enterImportTypeName?: (ctx: ImportTypeNameContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.importTypeName`.
     * @param ctx the parse tree
     */
    exitImportTypeName?: (ctx: ImportTypeNameContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.exportForm`.
     * @param ctx the parse tree
     */
    enterExportForm?: (ctx: ExportFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.exportForm`.
     * @param ctx the parse tree
     */
    exitExportForm?: (ctx: ExportFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.exportBinding`.
     * @param ctx the parse tree
     */
    enterExportBinding?: (ctx: ExportBindingContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.exportBinding`.
     * @param ctx the parse tree
     */
    exitExportBinding?: (ctx: ExportBindingContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.exportDefault`.
     * @param ctx the parse tree
     */
    enterExportDefault?: (ctx: ExportDefaultContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.exportDefault`.
     * @param ctx the parse tree
     */
    exitExportDefault?: (ctx: ExportDefaultContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.exportNamed`.
     * @param ctx the parse tree
     */
    enterExportNamed?: (ctx: ExportNamedContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.exportNamed`.
     * @param ctx the parse tree
     */
    exitExportNamed?: (ctx: ExportNamedContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.exportNamePair`.
     * @param ctx the parse tree
     */
    enterExportNamePair?: (ctx: ExportNamePairContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.exportNamePair`.
     * @param ctx the parse tree
     */
    exitExportNamePair?: (ctx: ExportNamePairContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.exportFrom`.
     * @param ctx the parse tree
     */
    enterExportFrom?: (ctx: ExportFromContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.exportFrom`.
     * @param ctx the parse tree
     */
    exitExportFrom?: (ctx: ExportFromContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.exportAllFrom`.
     * @param ctx the parse tree
     */
    enterExportAllFrom?: (ctx: ExportAllFromContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.exportAllFrom`.
     * @param ctx the parse tree
     */
    exitExportAllFrom?: (ctx: ExportAllFromContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.exportNsFromForm`.
     * @param ctx the parse tree
     */
    enterExportNsFromForm?: (ctx: ExportNsFromFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.exportNsFromForm`.
     * @param ctx the parse tree
     */
    exitExportNsFromForm?: (ctx: ExportNsFromFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.exportTypeForm`.
     * @param ctx the parse tree
     */
    enterExportTypeForm?: (ctx: ExportTypeFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.exportTypeForm`.
     * @param ctx the parse tree
     */
    exitExportTypeForm?: (ctx: ExportTypeFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.exportTypeFromForm`.
     * @param ctx the parse tree
     */
    enterExportTypeFromForm?: (ctx: ExportTypeFromFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.exportTypeFromForm`.
     * @param ctx the parse tree
     */
    exitExportTypeFromForm?: (ctx: ExportTypeFromFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.exportTypeAllFromForm`.
     * @param ctx the parse tree
     */
    enterExportTypeAllFromForm?: (ctx: ExportTypeAllFromFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.exportTypeAllFromForm`.
     * @param ctx the parse tree
     */
    exitExportTypeAllFromForm?: (ctx: ExportTypeAllFromFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.exportDeclForm`.
     * @param ctx the parse tree
     */
    enterExportDeclForm?: (ctx: ExportDeclFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.exportDeclForm`.
     * @param ctx the parse tree
     */
    exitExportDeclForm?: (ctx: ExportDeclFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.starBinding`.
     * @param ctx the parse tree
     */
    enterStarBinding?: (ctx: StarBindingContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.starBinding`.
     * @param ctx the parse tree
     */
    exitStarBinding?: (ctx: StarBindingContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.singleBinding`.
     * @param ctx the parse tree
     */
    enterSingleBinding?: (ctx: SingleBindingContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.singleBinding`.
     * @param ctx the parse tree
     */
    exitSingleBinding?: (ctx: SingleBindingContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.typeExpr`.
     * @param ctx the parse tree
     */
    enterTypeExpr?: (ctx: TypeExprContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.typeExpr`.
     * @param ctx the parse tree
     */
    exitTypeExpr?: (ctx: TypeExprContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.typeUnion`.
     * @param ctx the parse tree
     */
    enterTypeUnion?: (ctx: TypeUnionContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.typeUnion`.
     * @param ctx the parse tree
     */
    exitTypeUnion?: (ctx: TypeUnionContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.typeIntersection`.
     * @param ctx the parse tree
     */
    enterTypeIntersection?: (ctx: TypeIntersectionContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.typeIntersection`.
     * @param ctx the parse tree
     */
    exitTypeIntersection?: (ctx: TypeIntersectionContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.typeArray`.
     * @param ctx the parse tree
     */
    enterTypeArray?: (ctx: TypeArrayContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.typeArray`.
     * @param ctx the parse tree
     */
    exitTypeArray?: (ctx: TypeArrayContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.typeTuple`.
     * @param ctx the parse tree
     */
    enterTypeTuple?: (ctx: TypeTupleContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.typeTuple`.
     * @param ctx the parse tree
     */
    exitTypeTuple?: (ctx: TypeTupleContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.typeTupleElement`.
     * @param ctx the parse tree
     */
    enterTypeTupleElement?: (ctx: TypeTupleElementContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.typeTupleElement`.
     * @param ctx the parse tree
     */
    exitTypeTupleElement?: (ctx: TypeTupleElementContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.typeFunction`.
     * @param ctx the parse tree
     */
    enterTypeFunction?: (ctx: TypeFunctionContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.typeFunction`.
     * @param ctx the parse tree
     */
    exitTypeFunction?: (ctx: TypeFunctionContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.typeFnParam`.
     * @param ctx the parse tree
     */
    enterTypeFnParam?: (ctx: TypeFnParamContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.typeFnParam`.
     * @param ctx the parse tree
     */
    exitTypeFnParam?: (ctx: TypeFnParamContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.typeObject`.
     * @param ctx the parse tree
     */
    enterTypeObject?: (ctx: TypeObjectContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.typeObject`.
     * @param ctx the parse tree
     */
    exitTypeObject?: (ctx: TypeObjectContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.typeProp`.
     * @param ctx the parse tree
     */
    enterTypeProp?: (ctx: TypePropContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.typeProp`.
     * @param ctx the parse tree
     */
    exitTypeProp?: (ctx: TypePropContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.propModifier`.
     * @param ctx the parse tree
     */
    enterPropModifier?: (ctx: PropModifierContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.propModifier`.
     * @param ctx the parse tree
     */
    exitPropModifier?: (ctx: PropModifierContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.typeLiteral`.
     * @param ctx the parse tree
     */
    enterTypeLiteral?: (ctx: TypeLiteralContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.typeLiteral`.
     * @param ctx the parse tree
     */
    exitTypeLiteral?: (ctx: TypeLiteralContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.typeKeyof`.
     * @param ctx the parse tree
     */
    enterTypeKeyof?: (ctx: TypeKeyofContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.typeKeyof`.
     * @param ctx the parse tree
     */
    exitTypeKeyof?: (ctx: TypeKeyofContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.typeTypeof`.
     * @param ctx the parse tree
     */
    enterTypeTypeof?: (ctx: TypeTypeofContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.typeTypeof`.
     * @param ctx the parse tree
     */
    exitTypeTypeof?: (ctx: TypeTypeofContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.typeIndexAccess`.
     * @param ctx the parse tree
     */
    enterTypeIndexAccess?: (ctx: TypeIndexAccessContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.typeIndexAccess`.
     * @param ctx the parse tree
     */
    exitTypeIndexAccess?: (ctx: TypeIndexAccessContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.typeConditional`.
     * @param ctx the parse tree
     */
    enterTypeConditional?: (ctx: TypeConditionalContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.typeConditional`.
     * @param ctx the parse tree
     */
    exitTypeConditional?: (ctx: TypeConditionalContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.typeInfer`.
     * @param ctx the parse tree
     */
    enterTypeInfer?: (ctx: TypeInferContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.typeInfer`.
     * @param ctx the parse tree
     */
    exitTypeInfer?: (ctx: TypeInferContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.typeMapped`.
     * @param ctx the parse tree
     */
    enterTypeMapped?: (ctx: TypeMappedContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.typeMapped`.
     * @param ctx the parse tree
     */
    exitTypeMapped?: (ctx: TypeMappedContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.mappedModifiers`.
     * @param ctx the parse tree
     */
    enterMappedModifiers?: (ctx: MappedModifiersContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.mappedModifiers`.
     * @param ctx the parse tree
     */
    exitMappedModifiers?: (ctx: MappedModifiersContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.mappedModifier`.
     * @param ctx the parse tree
     */
    enterMappedModifier?: (ctx: MappedModifierContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.mappedModifier`.
     * @param ctx the parse tree
     */
    exitMappedModifier?: (ctx: MappedModifierContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.typeTemplateLiteral`.
     * @param ctx the parse tree
     */
    enterTypeTemplateLiteral?: (ctx: TypeTemplateLiteralContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.typeTemplateLiteral`.
     * @param ctx the parse tree
     */
    exitTypeTemplateLiteral?: (ctx: TypeTemplateLiteralContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.templatePart`.
     * @param ctx the parse tree
     */
    enterTemplatePart?: (ctx: TemplatePartContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.templatePart`.
     * @param ctx the parse tree
     */
    exitTemplatePart?: (ctx: TemplatePartContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.typeApplication`.
     * @param ctx the parse tree
     */
    enterTypeApplication?: (ctx: TypeApplicationContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.typeApplication`.
     * @param ctx the parse tree
     */
    exitTypeApplication?: (ctx: TypeApplicationContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.typeParams`.
     * @param ctx the parse tree
     */
    enterTypeParams?: (ctx: TypeParamsContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.typeParams`.
     * @param ctx the parse tree
     */
    exitTypeParams?: (ctx: TypeParamsContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.typeParamDecl`.
     * @param ctx the parse tree
     */
    enterTypeParamDecl?: (ctx: TypeParamDeclContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.typeParamDecl`.
     * @param ctx the parse tree
     */
    exitTypeParamDecl?: (ctx: TypeParamDeclContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.typeParamConstraint`.
     * @param ctx the parse tree
     */
    enterTypeParamConstraint?: (ctx: TypeParamConstraintContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.typeParamConstraint`.
     * @param ctx the parse tree
     */
    exitTypeParamConstraint?: (ctx: TypeParamConstraintContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.typeParamDefault`.
     * @param ctx the parse tree
     */
    enterTypeParamDefault?: (ctx: TypeParamDefaultContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.typeParamDefault`.
     * @param ctx the parse tree
     */
    exitTypeParamDefault?: (ctx: TypeParamDefaultContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.assign`.
     * @param ctx the parse tree
     */
    enterAssign?: (ctx: AssignContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.assign`.
     * @param ctx the parse tree
     */
    exitAssign?: (ctx: AssignContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.switchForm`.
     * @param ctx the parse tree
     */
    enterSwitchForm?: (ctx: SwitchFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.switchForm`.
     * @param ctx the parse tree
     */
    exitSwitchForm?: (ctx: SwitchFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.caseClause`.
     * @param ctx the parse tree
     */
    enterCaseClause?: (ctx: CaseClauseContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.caseClause`.
     * @param ctx the parse tree
     */
    exitCaseClause?: (ctx: CaseClauseContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.defaultClause`.
     * @param ctx the parse tree
     */
    enterDefaultClause?: (ctx: DefaultClauseContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.defaultClause`.
     * @param ctx the parse tree
     */
    exitDefaultClause?: (ctx: DefaultClauseContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.forForm`.
     * @param ctx the parse tree
     */
    enterForForm?: (ctx: ForFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.forForm`.
     * @param ctx the parse tree
     */
    exitForForm?: (ctx: ForFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.forInForm`.
     * @param ctx the parse tree
     */
    enterForInForm?: (ctx: ForInFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.forInForm`.
     * @param ctx the parse tree
     */
    exitForInForm?: (ctx: ForInFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.forOfForm`.
     * @param ctx the parse tree
     */
    enterForOfForm?: (ctx: ForOfFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.forOfForm`.
     * @param ctx the parse tree
     */
    exitForOfForm?: (ctx: ForOfFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.forAwaitForm`.
     * @param ctx the parse tree
     */
    enterForAwaitForm?: (ctx: ForAwaitFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.forAwaitForm`.
     * @param ctx the parse tree
     */
    exitForAwaitForm?: (ctx: ForAwaitFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.expression`.
     * @param ctx the parse tree
     */
    enterExpression?: (ctx: ExpressionContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.expression`.
     * @param ctx the parse tree
     */
    exitExpression?: (ctx: ExpressionContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.thisExpr`.
     * @param ctx the parse tree
     */
    enterThisExpr?: (ctx: ThisExprContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.thisExpr`.
     * @param ctx the parse tree
     */
    exitThisExpr?: (ctx: ThisExprContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.superExpr`.
     * @param ctx the parse tree
     */
    enterSuperExpr?: (ctx: SuperExprContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.superExpr`.
     * @param ctx the parse tree
     */
    exitSuperExpr?: (ctx: SuperExprContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.superConstructorCall`.
     * @param ctx the parse tree
     */
    enterSuperConstructorCall?: (ctx: SuperConstructorCallContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.superConstructorCall`.
     * @param ctx the parse tree
     */
    exitSuperConstructorCall?: (ctx: SuperConstructorCallContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.superMethodCall`.
     * @param ctx the parse tree
     */
    enterSuperMethodCall?: (ctx: SuperMethodCallContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.superMethodCall`.
     * @param ctx the parse tree
     */
    exitSuperMethodCall?: (ctx: SuperMethodCallContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.typeofExpr`.
     * @param ctx the parse tree
     */
    enterTypeofExpr?: (ctx: TypeofExprContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.typeofExpr`.
     * @param ctx the parse tree
     */
    exitTypeofExpr?: (ctx: TypeofExprContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.typeAssert`.
     * @param ctx the parse tree
     */
    enterTypeAssert?: (ctx: TypeAssertContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.typeAssert`.
     * @param ctx the parse tree
     */
    exitTypeAssert?: (ctx: TypeAssertContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.lambda`.
     * @param ctx the parse tree
     */
    enterLambda?: (ctx: LambdaContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.lambda`.
     * @param ctx the parse tree
     */
    exitLambda?: (ctx: LambdaContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.fn`.
     * @param ctx the parse tree
     */
    enterFn?: (ctx: FnContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.fn`.
     * @param ctx the parse tree
     */
    exitFn?: (ctx: FnContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.asyncLambda`.
     * @param ctx the parse tree
     */
    enterAsyncLambda?: (ctx: AsyncLambdaContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.asyncLambda`.
     * @param ctx the parse tree
     */
    exitAsyncLambda?: (ctx: AsyncLambdaContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.asyncFn`.
     * @param ctx the parse tree
     */
    enterAsyncFn?: (ctx: AsyncFnContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.asyncFn`.
     * @param ctx the parse tree
     */
    exitAsyncFn?: (ctx: AsyncFnContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.generatorFn`.
     * @param ctx the parse tree
     */
    enterGeneratorFn?: (ctx: GeneratorFnContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.generatorFn`.
     * @param ctx the parse tree
     */
    exitGeneratorFn?: (ctx: GeneratorFnContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.asyncGeneratorFn`.
     * @param ctx the parse tree
     */
    enterAsyncGeneratorFn?: (ctx: AsyncGeneratorFnContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.asyncGeneratorFn`.
     * @param ctx the parse tree
     */
    exitAsyncGeneratorFn?: (ctx: AsyncGeneratorFnContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.awaitExpr`.
     * @param ctx the parse tree
     */
    enterAwaitExpr?: (ctx: AwaitExprContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.awaitExpr`.
     * @param ctx the parse tree
     */
    exitAwaitExpr?: (ctx: AwaitExprContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.yieldExpr`.
     * @param ctx the parse tree
     */
    enterYieldExpr?: (ctx: YieldExprContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.yieldExpr`.
     * @param ctx the parse tree
     */
    exitYieldExpr?: (ctx: YieldExprContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.yieldStarExpr`.
     * @param ctx the parse tree
     */
    enterYieldStarExpr?: (ctx: YieldStarExprContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.yieldStarExpr`.
     * @param ctx the parse tree
     */
    exitYieldStarExpr?: (ctx: YieldStarExprContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.bindExpr`.
     * @param ctx the parse tree
     */
    enterBindExpr?: (ctx: BindExprContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.bindExpr`.
     * @param ctx the parse tree
     */
    exitBindExpr?: (ctx: BindExprContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.methodCallExpr`.
     * @param ctx the parse tree
     */
    enterMethodCallExpr?: (ctx: MethodCallExprContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.methodCallExpr`.
     * @param ctx the parse tree
     */
    exitMethodCallExpr?: (ctx: MethodCallExprContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.ternary`.
     * @param ctx the parse tree
     */
    enterTernary?: (ctx: TernaryContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.ternary`.
     * @param ctx the parse tree
     */
    exitTernary?: (ctx: TernaryContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.condExpr`.
     * @param ctx the parse tree
     */
    enterCondExpr?: (ctx: CondExprContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.condExpr`.
     * @param ctx the parse tree
     */
    exitCondExpr?: (ctx: CondExprContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.newForm`.
     * @param ctx the parse tree
     */
    enterNewForm?: (ctx: NewFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.newForm`.
     * @param ctx the parse tree
     */
    exitNewForm?: (ctx: NewFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.objectExpr`.
     * @param ctx the parse tree
     */
    enterObjectExpr?: (ctx: ObjectExprContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.objectExpr`.
     * @param ctx the parse tree
     */
    exitObjectExpr?: (ctx: ObjectExprContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.objectField`.
     * @param ctx the parse tree
     */
    enterObjectField?: (ctx: ObjectFieldContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.objectField`.
     * @param ctx the parse tree
     */
    exitObjectField?: (ctx: ObjectFieldContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.methodDef`.
     * @param ctx the parse tree
     */
    enterMethodDef?: (ctx: MethodDefContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.methodDef`.
     * @param ctx the parse tree
     */
    exitMethodDef?: (ctx: MethodDefContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.arrayExpr`.
     * @param ctx the parse tree
     */
    enterArrayExpr?: (ctx: ArrayExprContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.arrayExpr`.
     * @param ctx the parse tree
     */
    exitArrayExpr?: (ctx: ArrayExprContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.templateExpr`.
     * @param ctx the parse tree
     */
    enterTemplateExpr?: (ctx: TemplateExprContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.templateExpr`.
     * @param ctx the parse tree
     */
    exitTemplateExpr?: (ctx: TemplateExprContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.propKey`.
     * @param ctx the parse tree
     */
    enterPropKey?: (ctx: PropKeyContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.propKey`.
     * @param ctx the parse tree
     */
    exitPropKey?: (ctx: PropKeyContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.propAccess`.
     * @param ctx the parse tree
     */
    enterPropAccess?: (ctx: PropAccessContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.propAccess`.
     * @param ctx the parse tree
     */
    exitPropAccess?: (ctx: PropAccessContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.indexAccess`.
     * @param ctx the parse tree
     */
    enterIndexAccess?: (ctx: IndexAccessContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.indexAccess`.
     * @param ctx the parse tree
     */
    exitIndexAccess?: (ctx: IndexAccessContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.quasiquote`.
     * @param ctx the parse tree
     */
    enterQuasiquote?: (ctx: QuasiquoteContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.quasiquote`.
     * @param ctx the parse tree
     */
    exitQuasiquote?: (ctx: QuasiquoteContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.unquote`.
     * @param ctx the parse tree
     */
    enterUnquote?: (ctx: UnquoteContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.unquote`.
     * @param ctx the parse tree
     */
    exitUnquote?: (ctx: UnquoteContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.unquoteSplicing`.
     * @param ctx the parse tree
     */
    enterUnquoteSplicing?: (ctx: UnquoteSplicingContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.unquoteSplicing`.
     * @param ctx the parse tree
     */
    exitUnquoteSplicing?: (ctx: UnquoteSplicingContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.optChain`.
     * @param ctx the parse tree
     */
    enterOptChain?: (ctx: OptChainContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.optChain`.
     * @param ctx the parse tree
     */
    exitOptChain?: (ctx: OptChainContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.optChainIndex`.
     * @param ctx the parse tree
     */
    enterOptChainIndex?: (ctx: OptChainIndexContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.optChainIndex`.
     * @param ctx the parse tree
     */
    exitOptChainIndex?: (ctx: OptChainIndexContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.nullCoalesce`.
     * @param ctx the parse tree
     */
    enterNullCoalesce?: (ctx: NullCoalesceContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.nullCoalesce`.
     * @param ctx the parse tree
     */
    exitNullCoalesce?: (ctx: NullCoalesceContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.call`.
     * @param ctx the parse tree
     */
    enterCall?: (ctx: CallContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.call`.
     * @param ctx the parse tree
     */
    exitCall?: (ctx: CallContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.typeArgs`.
     * @param ctx the parse tree
     */
    enterTypeArgs?: (ctx: TypeArgsContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.typeArgs`.
     * @param ctx the parse tree
     */
    exitTypeArgs?: (ctx: TypeArgsContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.fnSignature`.
     * @param ctx the parse tree
     */
    enterFnSignature?: (ctx: FnSignatureContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.fnSignature`.
     * @param ctx the parse tree
     */
    exitFnSignature?: (ctx: FnSignatureContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.param`.
     * @param ctx the parse tree
     */
    enterParam?: (ctx: ParamContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.param`.
     * @param ctx the parse tree
     */
    exitParam?: (ctx: ParamContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.restParam`.
     * @param ctx the parse tree
     */
    enterRestParam?: (ctx: RestParamContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.restParam`.
     * @param ctx the parse tree
     */
    exitRestParam?: (ctx: RestParamContext) => void;
    /**
     * Enter a parse tree produced by `Stage6Parser.literal`.
     * @param ctx the parse tree
     */
    enterLiteral?: (ctx: LiteralContext) => void;
    /**
     * Exit a parse tree produced by `Stage6Parser.literal`.
     * @param ctx the parse tree
     */
    exitLiteral?: (ctx: LiteralContext) => void;

    visitTerminal(node: TerminalNode): void {}
    visitErrorNode(node: ErrorNode): void {}
    enterEveryRule(node: ParserRuleContext): void {}
    exitEveryRule(node: ParserRuleContext): void {}
}

