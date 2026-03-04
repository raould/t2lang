
import { ErrorNode, ParseTreeListener, ParserRuleContext, TerminalNode } from "antlr4ng";


import { ProgramContext } from "./Stage7Parser.js";
import { TopLevelContext } from "./Stage7Parser.js";
import { DeclContext } from "./Stage7Parser.js";
import { DefmacroContext } from "./Stage7Parser.js";
import { MacroTimeFnDefContext } from "./Stage7Parser.js";
import { TopLevelLetContext } from "./Stage7Parser.js";
import { TopLevelConstContext } from "./Stage7Parser.js";
import { MetaAnnotationContext } from "./Stage7Parser.js";
import { TypeAliasContext } from "./Stage7Parser.js";
import { InterfaceDefContext } from "./Stage7Parser.js";
import { InterfaceExtendsContext } from "./Stage7Parser.js";
import { ClassDefContext } from "./Stage7Parser.js";
import { AnonClassDefContext } from "./Stage7Parser.js";
import { ClassExtendsContext } from "./Stage7Parser.js";
import { ClassImplementsContext } from "./Stage7Parser.js";
import { ClassBodyContext } from "./Stage7Parser.js";
import { ClassElementContext } from "./Stage7Parser.js";
import { ModifierContext } from "./Stage7Parser.js";
import { FieldDefContext } from "./Stage7Parser.js";
import { ConstructorDefContext } from "./Stage7Parser.js";
import { ClassMethodDefContext } from "./Stage7Parser.js";
import { AbstractMethodDefContext } from "./Stage7Parser.js";
import { GetterDefContext } from "./Stage7Parser.js";
import { SetterDefContext } from "./Stage7Parser.js";
import { MethodKeyContext } from "./Stage7Parser.js";
import { TypedParamContext } from "./Stage7Parser.js";
import { FnSignatureTypedContext } from "./Stage7Parser.js";
import { StatementContext } from "./Stage7Parser.js";
import { LetStarContext } from "./Stage7Parser.js";
import { LetStmtContext } from "./Stage7Parser.js";
import { ConstStarContext } from "./Stage7Parser.js";
import { ConstStmtContext } from "./Stage7Parser.js";
import { IfFormContext } from "./Stage7Parser.js";
import { WhileFormContext } from "./Stage7Parser.js";
import { BlockContext } from "./Stage7Parser.js";
import { ReturnFormContext } from "./Stage7Parser.js";
import { ThrowFormContext } from "./Stage7Parser.js";
import { ImportFormContext } from "./Stage7Parser.js";
import { ImportTypeFormContext } from "./Stage7Parser.js";
import { ImportTypeSpecContext } from "./Stage7Parser.js";
import { ImportTypeNameContext } from "./Stage7Parser.js";
import { ExportFormContext } from "./Stage7Parser.js";
import { ExportBindingContext } from "./Stage7Parser.js";
import { ExportDefaultContext } from "./Stage7Parser.js";
import { ExportNamedContext } from "./Stage7Parser.js";
import { ExportNamePairContext } from "./Stage7Parser.js";
import { ExportFromContext } from "./Stage7Parser.js";
import { ExportAllFromContext } from "./Stage7Parser.js";
import { ExportNsFromFormContext } from "./Stage7Parser.js";
import { ExportTypeFormContext } from "./Stage7Parser.js";
import { ExportTypeFromFormContext } from "./Stage7Parser.js";
import { ExportTypeAllFromFormContext } from "./Stage7Parser.js";
import { ExportDeclFormContext } from "./Stage7Parser.js";
import { StarBindingContext } from "./Stage7Parser.js";
import { SingleBindingContext } from "./Stage7Parser.js";
import { TypeExprContext } from "./Stage7Parser.js";
import { TypeUnionContext } from "./Stage7Parser.js";
import { TypeIntersectionContext } from "./Stage7Parser.js";
import { TypeArrayContext } from "./Stage7Parser.js";
import { TypeTupleContext } from "./Stage7Parser.js";
import { TypeTupleElementContext } from "./Stage7Parser.js";
import { TypeFunctionContext } from "./Stage7Parser.js";
import { TypeFnParamContext } from "./Stage7Parser.js";
import { TypeObjectContext } from "./Stage7Parser.js";
import { TypePropContext } from "./Stage7Parser.js";
import { PropModifierContext } from "./Stage7Parser.js";
import { TypeLiteralContext } from "./Stage7Parser.js";
import { TypeKeyofContext } from "./Stage7Parser.js";
import { TypeTypeofContext } from "./Stage7Parser.js";
import { TypeIndexAccessContext } from "./Stage7Parser.js";
import { TypeConditionalContext } from "./Stage7Parser.js";
import { TypeInferContext } from "./Stage7Parser.js";
import { TypeMappedContext } from "./Stage7Parser.js";
import { MappedModifiersContext } from "./Stage7Parser.js";
import { MappedModifierContext } from "./Stage7Parser.js";
import { TypeTemplateLiteralContext } from "./Stage7Parser.js";
import { TemplatePartContext } from "./Stage7Parser.js";
import { TypeApplicationContext } from "./Stage7Parser.js";
import { TypeParamsContext } from "./Stage7Parser.js";
import { TypeParamDeclContext } from "./Stage7Parser.js";
import { TypeParamConstraintContext } from "./Stage7Parser.js";
import { TypeParamDefaultContext } from "./Stage7Parser.js";
import { AssignContext } from "./Stage7Parser.js";
import { SwitchFormContext } from "./Stage7Parser.js";
import { CaseClauseContext } from "./Stage7Parser.js";
import { DefaultClauseContext } from "./Stage7Parser.js";
import { ForFormContext } from "./Stage7Parser.js";
import { ForInFormContext } from "./Stage7Parser.js";
import { ForOfFormContext } from "./Stage7Parser.js";
import { ForAwaitFormContext } from "./Stage7Parser.js";
import { TryFormContext } from "./Stage7Parser.js";
import { CatchClauseContext } from "./Stage7Parser.js";
import { FinallyClauseContext } from "./Stage7Parser.js";
import { ExpressionContext } from "./Stage7Parser.js";
import { ThisExprContext } from "./Stage7Parser.js";
import { SuperExprContext } from "./Stage7Parser.js";
import { SuperConstructorCallContext } from "./Stage7Parser.js";
import { SuperMethodCallContext } from "./Stage7Parser.js";
import { TypeofExprContext } from "./Stage7Parser.js";
import { TypeAssertContext } from "./Stage7Parser.js";
import { LambdaContext } from "./Stage7Parser.js";
import { FnContext } from "./Stage7Parser.js";
import { AsyncLambdaContext } from "./Stage7Parser.js";
import { AsyncFnContext } from "./Stage7Parser.js";
import { GeneratorFnContext } from "./Stage7Parser.js";
import { AsyncGeneratorFnContext } from "./Stage7Parser.js";
import { AwaitExprContext } from "./Stage7Parser.js";
import { YieldExprContext } from "./Stage7Parser.js";
import { YieldStarExprContext } from "./Stage7Parser.js";
import { BindExprContext } from "./Stage7Parser.js";
import { MethodCallExprContext } from "./Stage7Parser.js";
import { TernaryContext } from "./Stage7Parser.js";
import { CondExprContext } from "./Stage7Parser.js";
import { NewFormContext } from "./Stage7Parser.js";
import { ObjectExprContext } from "./Stage7Parser.js";
import { ObjectFieldContext } from "./Stage7Parser.js";
import { MethodDefContext } from "./Stage7Parser.js";
import { ArrayExprContext } from "./Stage7Parser.js";
import { TemplateExprContext } from "./Stage7Parser.js";
import { PropKeyContext } from "./Stage7Parser.js";
import { PropAccessContext } from "./Stage7Parser.js";
import { IndexAccessContext } from "./Stage7Parser.js";
import { QuasiquoteContext } from "./Stage7Parser.js";
import { UnquoteContext } from "./Stage7Parser.js";
import { UnquoteSplicingContext } from "./Stage7Parser.js";
import { OptChainContext } from "./Stage7Parser.js";
import { OptChainIndexContext } from "./Stage7Parser.js";
import { NullCoalesceContext } from "./Stage7Parser.js";
import { CallContext } from "./Stage7Parser.js";
import { TypeArgsContext } from "./Stage7Parser.js";
import { FnSignatureContext } from "./Stage7Parser.js";
import { ParamContext } from "./Stage7Parser.js";
import { RestParamContext } from "./Stage7Parser.js";
import { LiteralContext } from "./Stage7Parser.js";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `Stage7Parser`.
 */
export class Stage7Listener implements ParseTreeListener {
    /**
     * Enter a parse tree produced by `Stage7Parser.program`.
     * @param ctx the parse tree
     */
    enterProgram?: (ctx: ProgramContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.program`.
     * @param ctx the parse tree
     */
    exitProgram?: (ctx: ProgramContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.topLevel`.
     * @param ctx the parse tree
     */
    enterTopLevel?: (ctx: TopLevelContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.topLevel`.
     * @param ctx the parse tree
     */
    exitTopLevel?: (ctx: TopLevelContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.decl`.
     * @param ctx the parse tree
     */
    enterDecl?: (ctx: DeclContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.decl`.
     * @param ctx the parse tree
     */
    exitDecl?: (ctx: DeclContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.defmacro`.
     * @param ctx the parse tree
     */
    enterDefmacro?: (ctx: DefmacroContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.defmacro`.
     * @param ctx the parse tree
     */
    exitDefmacro?: (ctx: DefmacroContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.macroTimeFnDef`.
     * @param ctx the parse tree
     */
    enterMacroTimeFnDef?: (ctx: MacroTimeFnDefContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.macroTimeFnDef`.
     * @param ctx the parse tree
     */
    exitMacroTimeFnDef?: (ctx: MacroTimeFnDefContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.topLevelLet`.
     * @param ctx the parse tree
     */
    enterTopLevelLet?: (ctx: TopLevelLetContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.topLevelLet`.
     * @param ctx the parse tree
     */
    exitTopLevelLet?: (ctx: TopLevelLetContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.topLevelConst`.
     * @param ctx the parse tree
     */
    enterTopLevelConst?: (ctx: TopLevelConstContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.topLevelConst`.
     * @param ctx the parse tree
     */
    exitTopLevelConst?: (ctx: TopLevelConstContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.metaAnnotation`.
     * @param ctx the parse tree
     */
    enterMetaAnnotation?: (ctx: MetaAnnotationContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.metaAnnotation`.
     * @param ctx the parse tree
     */
    exitMetaAnnotation?: (ctx: MetaAnnotationContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.typeAlias`.
     * @param ctx the parse tree
     */
    enterTypeAlias?: (ctx: TypeAliasContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.typeAlias`.
     * @param ctx the parse tree
     */
    exitTypeAlias?: (ctx: TypeAliasContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.interfaceDef`.
     * @param ctx the parse tree
     */
    enterInterfaceDef?: (ctx: InterfaceDefContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.interfaceDef`.
     * @param ctx the parse tree
     */
    exitInterfaceDef?: (ctx: InterfaceDefContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.interfaceExtends`.
     * @param ctx the parse tree
     */
    enterInterfaceExtends?: (ctx: InterfaceExtendsContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.interfaceExtends`.
     * @param ctx the parse tree
     */
    exitInterfaceExtends?: (ctx: InterfaceExtendsContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.classDef`.
     * @param ctx the parse tree
     */
    enterClassDef?: (ctx: ClassDefContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.classDef`.
     * @param ctx the parse tree
     */
    exitClassDef?: (ctx: ClassDefContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.anonClassDef`.
     * @param ctx the parse tree
     */
    enterAnonClassDef?: (ctx: AnonClassDefContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.anonClassDef`.
     * @param ctx the parse tree
     */
    exitAnonClassDef?: (ctx: AnonClassDefContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.classExtends`.
     * @param ctx the parse tree
     */
    enterClassExtends?: (ctx: ClassExtendsContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.classExtends`.
     * @param ctx the parse tree
     */
    exitClassExtends?: (ctx: ClassExtendsContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.classImplements`.
     * @param ctx the parse tree
     */
    enterClassImplements?: (ctx: ClassImplementsContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.classImplements`.
     * @param ctx the parse tree
     */
    exitClassImplements?: (ctx: ClassImplementsContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.classBody`.
     * @param ctx the parse tree
     */
    enterClassBody?: (ctx: ClassBodyContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.classBody`.
     * @param ctx the parse tree
     */
    exitClassBody?: (ctx: ClassBodyContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.classElement`.
     * @param ctx the parse tree
     */
    enterClassElement?: (ctx: ClassElementContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.classElement`.
     * @param ctx the parse tree
     */
    exitClassElement?: (ctx: ClassElementContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.modifier`.
     * @param ctx the parse tree
     */
    enterModifier?: (ctx: ModifierContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.modifier`.
     * @param ctx the parse tree
     */
    exitModifier?: (ctx: ModifierContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.fieldDef`.
     * @param ctx the parse tree
     */
    enterFieldDef?: (ctx: FieldDefContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.fieldDef`.
     * @param ctx the parse tree
     */
    exitFieldDef?: (ctx: FieldDefContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.constructorDef`.
     * @param ctx the parse tree
     */
    enterConstructorDef?: (ctx: ConstructorDefContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.constructorDef`.
     * @param ctx the parse tree
     */
    exitConstructorDef?: (ctx: ConstructorDefContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.classMethodDef`.
     * @param ctx the parse tree
     */
    enterClassMethodDef?: (ctx: ClassMethodDefContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.classMethodDef`.
     * @param ctx the parse tree
     */
    exitClassMethodDef?: (ctx: ClassMethodDefContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.abstractMethodDef`.
     * @param ctx the parse tree
     */
    enterAbstractMethodDef?: (ctx: AbstractMethodDefContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.abstractMethodDef`.
     * @param ctx the parse tree
     */
    exitAbstractMethodDef?: (ctx: AbstractMethodDefContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.getterDef`.
     * @param ctx the parse tree
     */
    enterGetterDef?: (ctx: GetterDefContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.getterDef`.
     * @param ctx the parse tree
     */
    exitGetterDef?: (ctx: GetterDefContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.setterDef`.
     * @param ctx the parse tree
     */
    enterSetterDef?: (ctx: SetterDefContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.setterDef`.
     * @param ctx the parse tree
     */
    exitSetterDef?: (ctx: SetterDefContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.methodKey`.
     * @param ctx the parse tree
     */
    enterMethodKey?: (ctx: MethodKeyContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.methodKey`.
     * @param ctx the parse tree
     */
    exitMethodKey?: (ctx: MethodKeyContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.typedParam`.
     * @param ctx the parse tree
     */
    enterTypedParam?: (ctx: TypedParamContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.typedParam`.
     * @param ctx the parse tree
     */
    exitTypedParam?: (ctx: TypedParamContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.fnSignatureTyped`.
     * @param ctx the parse tree
     */
    enterFnSignatureTyped?: (ctx: FnSignatureTypedContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.fnSignatureTyped`.
     * @param ctx the parse tree
     */
    exitFnSignatureTyped?: (ctx: FnSignatureTypedContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.statement`.
     * @param ctx the parse tree
     */
    enterStatement?: (ctx: StatementContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.statement`.
     * @param ctx the parse tree
     */
    exitStatement?: (ctx: StatementContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.letStar`.
     * @param ctx the parse tree
     */
    enterLetStar?: (ctx: LetStarContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.letStar`.
     * @param ctx the parse tree
     */
    exitLetStar?: (ctx: LetStarContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.letStmt`.
     * @param ctx the parse tree
     */
    enterLetStmt?: (ctx: LetStmtContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.letStmt`.
     * @param ctx the parse tree
     */
    exitLetStmt?: (ctx: LetStmtContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.constStar`.
     * @param ctx the parse tree
     */
    enterConstStar?: (ctx: ConstStarContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.constStar`.
     * @param ctx the parse tree
     */
    exitConstStar?: (ctx: ConstStarContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.constStmt`.
     * @param ctx the parse tree
     */
    enterConstStmt?: (ctx: ConstStmtContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.constStmt`.
     * @param ctx the parse tree
     */
    exitConstStmt?: (ctx: ConstStmtContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.ifForm`.
     * @param ctx the parse tree
     */
    enterIfForm?: (ctx: IfFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.ifForm`.
     * @param ctx the parse tree
     */
    exitIfForm?: (ctx: IfFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.whileForm`.
     * @param ctx the parse tree
     */
    enterWhileForm?: (ctx: WhileFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.whileForm`.
     * @param ctx the parse tree
     */
    exitWhileForm?: (ctx: WhileFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.block`.
     * @param ctx the parse tree
     */
    enterBlock?: (ctx: BlockContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.block`.
     * @param ctx the parse tree
     */
    exitBlock?: (ctx: BlockContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.returnForm`.
     * @param ctx the parse tree
     */
    enterReturnForm?: (ctx: ReturnFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.returnForm`.
     * @param ctx the parse tree
     */
    exitReturnForm?: (ctx: ReturnFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.throwForm`.
     * @param ctx the parse tree
     */
    enterThrowForm?: (ctx: ThrowFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.throwForm`.
     * @param ctx the parse tree
     */
    exitThrowForm?: (ctx: ThrowFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.importForm`.
     * @param ctx the parse tree
     */
    enterImportForm?: (ctx: ImportFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.importForm`.
     * @param ctx the parse tree
     */
    exitImportForm?: (ctx: ImportFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.importTypeForm`.
     * @param ctx the parse tree
     */
    enterImportTypeForm?: (ctx: ImportTypeFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.importTypeForm`.
     * @param ctx the parse tree
     */
    exitImportTypeForm?: (ctx: ImportTypeFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.importTypeSpec`.
     * @param ctx the parse tree
     */
    enterImportTypeSpec?: (ctx: ImportTypeSpecContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.importTypeSpec`.
     * @param ctx the parse tree
     */
    exitImportTypeSpec?: (ctx: ImportTypeSpecContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.importTypeName`.
     * @param ctx the parse tree
     */
    enterImportTypeName?: (ctx: ImportTypeNameContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.importTypeName`.
     * @param ctx the parse tree
     */
    exitImportTypeName?: (ctx: ImportTypeNameContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.exportForm`.
     * @param ctx the parse tree
     */
    enterExportForm?: (ctx: ExportFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.exportForm`.
     * @param ctx the parse tree
     */
    exitExportForm?: (ctx: ExportFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.exportBinding`.
     * @param ctx the parse tree
     */
    enterExportBinding?: (ctx: ExportBindingContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.exportBinding`.
     * @param ctx the parse tree
     */
    exitExportBinding?: (ctx: ExportBindingContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.exportDefault`.
     * @param ctx the parse tree
     */
    enterExportDefault?: (ctx: ExportDefaultContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.exportDefault`.
     * @param ctx the parse tree
     */
    exitExportDefault?: (ctx: ExportDefaultContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.exportNamed`.
     * @param ctx the parse tree
     */
    enterExportNamed?: (ctx: ExportNamedContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.exportNamed`.
     * @param ctx the parse tree
     */
    exitExportNamed?: (ctx: ExportNamedContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.exportNamePair`.
     * @param ctx the parse tree
     */
    enterExportNamePair?: (ctx: ExportNamePairContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.exportNamePair`.
     * @param ctx the parse tree
     */
    exitExportNamePair?: (ctx: ExportNamePairContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.exportFrom`.
     * @param ctx the parse tree
     */
    enterExportFrom?: (ctx: ExportFromContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.exportFrom`.
     * @param ctx the parse tree
     */
    exitExportFrom?: (ctx: ExportFromContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.exportAllFrom`.
     * @param ctx the parse tree
     */
    enterExportAllFrom?: (ctx: ExportAllFromContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.exportAllFrom`.
     * @param ctx the parse tree
     */
    exitExportAllFrom?: (ctx: ExportAllFromContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.exportNsFromForm`.
     * @param ctx the parse tree
     */
    enterExportNsFromForm?: (ctx: ExportNsFromFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.exportNsFromForm`.
     * @param ctx the parse tree
     */
    exitExportNsFromForm?: (ctx: ExportNsFromFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.exportTypeForm`.
     * @param ctx the parse tree
     */
    enterExportTypeForm?: (ctx: ExportTypeFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.exportTypeForm`.
     * @param ctx the parse tree
     */
    exitExportTypeForm?: (ctx: ExportTypeFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.exportTypeFromForm`.
     * @param ctx the parse tree
     */
    enterExportTypeFromForm?: (ctx: ExportTypeFromFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.exportTypeFromForm`.
     * @param ctx the parse tree
     */
    exitExportTypeFromForm?: (ctx: ExportTypeFromFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.exportTypeAllFromForm`.
     * @param ctx the parse tree
     */
    enterExportTypeAllFromForm?: (ctx: ExportTypeAllFromFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.exportTypeAllFromForm`.
     * @param ctx the parse tree
     */
    exitExportTypeAllFromForm?: (ctx: ExportTypeAllFromFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.exportDeclForm`.
     * @param ctx the parse tree
     */
    enterExportDeclForm?: (ctx: ExportDeclFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.exportDeclForm`.
     * @param ctx the parse tree
     */
    exitExportDeclForm?: (ctx: ExportDeclFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.starBinding`.
     * @param ctx the parse tree
     */
    enterStarBinding?: (ctx: StarBindingContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.starBinding`.
     * @param ctx the parse tree
     */
    exitStarBinding?: (ctx: StarBindingContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.singleBinding`.
     * @param ctx the parse tree
     */
    enterSingleBinding?: (ctx: SingleBindingContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.singleBinding`.
     * @param ctx the parse tree
     */
    exitSingleBinding?: (ctx: SingleBindingContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.typeExpr`.
     * @param ctx the parse tree
     */
    enterTypeExpr?: (ctx: TypeExprContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.typeExpr`.
     * @param ctx the parse tree
     */
    exitTypeExpr?: (ctx: TypeExprContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.typeUnion`.
     * @param ctx the parse tree
     */
    enterTypeUnion?: (ctx: TypeUnionContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.typeUnion`.
     * @param ctx the parse tree
     */
    exitTypeUnion?: (ctx: TypeUnionContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.typeIntersection`.
     * @param ctx the parse tree
     */
    enterTypeIntersection?: (ctx: TypeIntersectionContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.typeIntersection`.
     * @param ctx the parse tree
     */
    exitTypeIntersection?: (ctx: TypeIntersectionContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.typeArray`.
     * @param ctx the parse tree
     */
    enterTypeArray?: (ctx: TypeArrayContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.typeArray`.
     * @param ctx the parse tree
     */
    exitTypeArray?: (ctx: TypeArrayContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.typeTuple`.
     * @param ctx the parse tree
     */
    enterTypeTuple?: (ctx: TypeTupleContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.typeTuple`.
     * @param ctx the parse tree
     */
    exitTypeTuple?: (ctx: TypeTupleContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.typeTupleElement`.
     * @param ctx the parse tree
     */
    enterTypeTupleElement?: (ctx: TypeTupleElementContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.typeTupleElement`.
     * @param ctx the parse tree
     */
    exitTypeTupleElement?: (ctx: TypeTupleElementContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.typeFunction`.
     * @param ctx the parse tree
     */
    enterTypeFunction?: (ctx: TypeFunctionContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.typeFunction`.
     * @param ctx the parse tree
     */
    exitTypeFunction?: (ctx: TypeFunctionContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.typeFnParam`.
     * @param ctx the parse tree
     */
    enterTypeFnParam?: (ctx: TypeFnParamContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.typeFnParam`.
     * @param ctx the parse tree
     */
    exitTypeFnParam?: (ctx: TypeFnParamContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.typeObject`.
     * @param ctx the parse tree
     */
    enterTypeObject?: (ctx: TypeObjectContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.typeObject`.
     * @param ctx the parse tree
     */
    exitTypeObject?: (ctx: TypeObjectContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.typeProp`.
     * @param ctx the parse tree
     */
    enterTypeProp?: (ctx: TypePropContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.typeProp`.
     * @param ctx the parse tree
     */
    exitTypeProp?: (ctx: TypePropContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.propModifier`.
     * @param ctx the parse tree
     */
    enterPropModifier?: (ctx: PropModifierContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.propModifier`.
     * @param ctx the parse tree
     */
    exitPropModifier?: (ctx: PropModifierContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.typeLiteral`.
     * @param ctx the parse tree
     */
    enterTypeLiteral?: (ctx: TypeLiteralContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.typeLiteral`.
     * @param ctx the parse tree
     */
    exitTypeLiteral?: (ctx: TypeLiteralContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.typeKeyof`.
     * @param ctx the parse tree
     */
    enterTypeKeyof?: (ctx: TypeKeyofContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.typeKeyof`.
     * @param ctx the parse tree
     */
    exitTypeKeyof?: (ctx: TypeKeyofContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.typeTypeof`.
     * @param ctx the parse tree
     */
    enterTypeTypeof?: (ctx: TypeTypeofContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.typeTypeof`.
     * @param ctx the parse tree
     */
    exitTypeTypeof?: (ctx: TypeTypeofContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.typeIndexAccess`.
     * @param ctx the parse tree
     */
    enterTypeIndexAccess?: (ctx: TypeIndexAccessContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.typeIndexAccess`.
     * @param ctx the parse tree
     */
    exitTypeIndexAccess?: (ctx: TypeIndexAccessContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.typeConditional`.
     * @param ctx the parse tree
     */
    enterTypeConditional?: (ctx: TypeConditionalContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.typeConditional`.
     * @param ctx the parse tree
     */
    exitTypeConditional?: (ctx: TypeConditionalContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.typeInfer`.
     * @param ctx the parse tree
     */
    enterTypeInfer?: (ctx: TypeInferContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.typeInfer`.
     * @param ctx the parse tree
     */
    exitTypeInfer?: (ctx: TypeInferContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.typeMapped`.
     * @param ctx the parse tree
     */
    enterTypeMapped?: (ctx: TypeMappedContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.typeMapped`.
     * @param ctx the parse tree
     */
    exitTypeMapped?: (ctx: TypeMappedContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.mappedModifiers`.
     * @param ctx the parse tree
     */
    enterMappedModifiers?: (ctx: MappedModifiersContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.mappedModifiers`.
     * @param ctx the parse tree
     */
    exitMappedModifiers?: (ctx: MappedModifiersContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.mappedModifier`.
     * @param ctx the parse tree
     */
    enterMappedModifier?: (ctx: MappedModifierContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.mappedModifier`.
     * @param ctx the parse tree
     */
    exitMappedModifier?: (ctx: MappedModifierContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.typeTemplateLiteral`.
     * @param ctx the parse tree
     */
    enterTypeTemplateLiteral?: (ctx: TypeTemplateLiteralContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.typeTemplateLiteral`.
     * @param ctx the parse tree
     */
    exitTypeTemplateLiteral?: (ctx: TypeTemplateLiteralContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.templatePart`.
     * @param ctx the parse tree
     */
    enterTemplatePart?: (ctx: TemplatePartContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.templatePart`.
     * @param ctx the parse tree
     */
    exitTemplatePart?: (ctx: TemplatePartContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.typeApplication`.
     * @param ctx the parse tree
     */
    enterTypeApplication?: (ctx: TypeApplicationContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.typeApplication`.
     * @param ctx the parse tree
     */
    exitTypeApplication?: (ctx: TypeApplicationContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.typeParams`.
     * @param ctx the parse tree
     */
    enterTypeParams?: (ctx: TypeParamsContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.typeParams`.
     * @param ctx the parse tree
     */
    exitTypeParams?: (ctx: TypeParamsContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.typeParamDecl`.
     * @param ctx the parse tree
     */
    enterTypeParamDecl?: (ctx: TypeParamDeclContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.typeParamDecl`.
     * @param ctx the parse tree
     */
    exitTypeParamDecl?: (ctx: TypeParamDeclContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.typeParamConstraint`.
     * @param ctx the parse tree
     */
    enterTypeParamConstraint?: (ctx: TypeParamConstraintContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.typeParamConstraint`.
     * @param ctx the parse tree
     */
    exitTypeParamConstraint?: (ctx: TypeParamConstraintContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.typeParamDefault`.
     * @param ctx the parse tree
     */
    enterTypeParamDefault?: (ctx: TypeParamDefaultContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.typeParamDefault`.
     * @param ctx the parse tree
     */
    exitTypeParamDefault?: (ctx: TypeParamDefaultContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.assign`.
     * @param ctx the parse tree
     */
    enterAssign?: (ctx: AssignContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.assign`.
     * @param ctx the parse tree
     */
    exitAssign?: (ctx: AssignContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.switchForm`.
     * @param ctx the parse tree
     */
    enterSwitchForm?: (ctx: SwitchFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.switchForm`.
     * @param ctx the parse tree
     */
    exitSwitchForm?: (ctx: SwitchFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.caseClause`.
     * @param ctx the parse tree
     */
    enterCaseClause?: (ctx: CaseClauseContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.caseClause`.
     * @param ctx the parse tree
     */
    exitCaseClause?: (ctx: CaseClauseContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.defaultClause`.
     * @param ctx the parse tree
     */
    enterDefaultClause?: (ctx: DefaultClauseContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.defaultClause`.
     * @param ctx the parse tree
     */
    exitDefaultClause?: (ctx: DefaultClauseContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.forForm`.
     * @param ctx the parse tree
     */
    enterForForm?: (ctx: ForFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.forForm`.
     * @param ctx the parse tree
     */
    exitForForm?: (ctx: ForFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.forInForm`.
     * @param ctx the parse tree
     */
    enterForInForm?: (ctx: ForInFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.forInForm`.
     * @param ctx the parse tree
     */
    exitForInForm?: (ctx: ForInFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.forOfForm`.
     * @param ctx the parse tree
     */
    enterForOfForm?: (ctx: ForOfFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.forOfForm`.
     * @param ctx the parse tree
     */
    exitForOfForm?: (ctx: ForOfFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.forAwaitForm`.
     * @param ctx the parse tree
     */
    enterForAwaitForm?: (ctx: ForAwaitFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.forAwaitForm`.
     * @param ctx the parse tree
     */
    exitForAwaitForm?: (ctx: ForAwaitFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.tryForm`.
     * @param ctx the parse tree
     */
    enterTryForm?: (ctx: TryFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.tryForm`.
     * @param ctx the parse tree
     */
    exitTryForm?: (ctx: TryFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.catchClause`.
     * @param ctx the parse tree
     */
    enterCatchClause?: (ctx: CatchClauseContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.catchClause`.
     * @param ctx the parse tree
     */
    exitCatchClause?: (ctx: CatchClauseContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.finallyClause`.
     * @param ctx the parse tree
     */
    enterFinallyClause?: (ctx: FinallyClauseContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.finallyClause`.
     * @param ctx the parse tree
     */
    exitFinallyClause?: (ctx: FinallyClauseContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.expression`.
     * @param ctx the parse tree
     */
    enterExpression?: (ctx: ExpressionContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.expression`.
     * @param ctx the parse tree
     */
    exitExpression?: (ctx: ExpressionContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.thisExpr`.
     * @param ctx the parse tree
     */
    enterThisExpr?: (ctx: ThisExprContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.thisExpr`.
     * @param ctx the parse tree
     */
    exitThisExpr?: (ctx: ThisExprContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.superExpr`.
     * @param ctx the parse tree
     */
    enterSuperExpr?: (ctx: SuperExprContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.superExpr`.
     * @param ctx the parse tree
     */
    exitSuperExpr?: (ctx: SuperExprContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.superConstructorCall`.
     * @param ctx the parse tree
     */
    enterSuperConstructorCall?: (ctx: SuperConstructorCallContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.superConstructorCall`.
     * @param ctx the parse tree
     */
    exitSuperConstructorCall?: (ctx: SuperConstructorCallContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.superMethodCall`.
     * @param ctx the parse tree
     */
    enterSuperMethodCall?: (ctx: SuperMethodCallContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.superMethodCall`.
     * @param ctx the parse tree
     */
    exitSuperMethodCall?: (ctx: SuperMethodCallContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.typeofExpr`.
     * @param ctx the parse tree
     */
    enterTypeofExpr?: (ctx: TypeofExprContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.typeofExpr`.
     * @param ctx the parse tree
     */
    exitTypeofExpr?: (ctx: TypeofExprContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.typeAssert`.
     * @param ctx the parse tree
     */
    enterTypeAssert?: (ctx: TypeAssertContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.typeAssert`.
     * @param ctx the parse tree
     */
    exitTypeAssert?: (ctx: TypeAssertContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.lambda`.
     * @param ctx the parse tree
     */
    enterLambda?: (ctx: LambdaContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.lambda`.
     * @param ctx the parse tree
     */
    exitLambda?: (ctx: LambdaContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.fn`.
     * @param ctx the parse tree
     */
    enterFn?: (ctx: FnContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.fn`.
     * @param ctx the parse tree
     */
    exitFn?: (ctx: FnContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.asyncLambda`.
     * @param ctx the parse tree
     */
    enterAsyncLambda?: (ctx: AsyncLambdaContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.asyncLambda`.
     * @param ctx the parse tree
     */
    exitAsyncLambda?: (ctx: AsyncLambdaContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.asyncFn`.
     * @param ctx the parse tree
     */
    enterAsyncFn?: (ctx: AsyncFnContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.asyncFn`.
     * @param ctx the parse tree
     */
    exitAsyncFn?: (ctx: AsyncFnContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.generatorFn`.
     * @param ctx the parse tree
     */
    enterGeneratorFn?: (ctx: GeneratorFnContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.generatorFn`.
     * @param ctx the parse tree
     */
    exitGeneratorFn?: (ctx: GeneratorFnContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.asyncGeneratorFn`.
     * @param ctx the parse tree
     */
    enterAsyncGeneratorFn?: (ctx: AsyncGeneratorFnContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.asyncGeneratorFn`.
     * @param ctx the parse tree
     */
    exitAsyncGeneratorFn?: (ctx: AsyncGeneratorFnContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.awaitExpr`.
     * @param ctx the parse tree
     */
    enterAwaitExpr?: (ctx: AwaitExprContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.awaitExpr`.
     * @param ctx the parse tree
     */
    exitAwaitExpr?: (ctx: AwaitExprContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.yieldExpr`.
     * @param ctx the parse tree
     */
    enterYieldExpr?: (ctx: YieldExprContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.yieldExpr`.
     * @param ctx the parse tree
     */
    exitYieldExpr?: (ctx: YieldExprContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.yieldStarExpr`.
     * @param ctx the parse tree
     */
    enterYieldStarExpr?: (ctx: YieldStarExprContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.yieldStarExpr`.
     * @param ctx the parse tree
     */
    exitYieldStarExpr?: (ctx: YieldStarExprContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.bindExpr`.
     * @param ctx the parse tree
     */
    enterBindExpr?: (ctx: BindExprContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.bindExpr`.
     * @param ctx the parse tree
     */
    exitBindExpr?: (ctx: BindExprContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.methodCallExpr`.
     * @param ctx the parse tree
     */
    enterMethodCallExpr?: (ctx: MethodCallExprContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.methodCallExpr`.
     * @param ctx the parse tree
     */
    exitMethodCallExpr?: (ctx: MethodCallExprContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.ternary`.
     * @param ctx the parse tree
     */
    enterTernary?: (ctx: TernaryContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.ternary`.
     * @param ctx the parse tree
     */
    exitTernary?: (ctx: TernaryContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.condExpr`.
     * @param ctx the parse tree
     */
    enterCondExpr?: (ctx: CondExprContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.condExpr`.
     * @param ctx the parse tree
     */
    exitCondExpr?: (ctx: CondExprContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.newForm`.
     * @param ctx the parse tree
     */
    enterNewForm?: (ctx: NewFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.newForm`.
     * @param ctx the parse tree
     */
    exitNewForm?: (ctx: NewFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.objectExpr`.
     * @param ctx the parse tree
     */
    enterObjectExpr?: (ctx: ObjectExprContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.objectExpr`.
     * @param ctx the parse tree
     */
    exitObjectExpr?: (ctx: ObjectExprContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.objectField`.
     * @param ctx the parse tree
     */
    enterObjectField?: (ctx: ObjectFieldContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.objectField`.
     * @param ctx the parse tree
     */
    exitObjectField?: (ctx: ObjectFieldContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.methodDef`.
     * @param ctx the parse tree
     */
    enterMethodDef?: (ctx: MethodDefContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.methodDef`.
     * @param ctx the parse tree
     */
    exitMethodDef?: (ctx: MethodDefContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.arrayExpr`.
     * @param ctx the parse tree
     */
    enterArrayExpr?: (ctx: ArrayExprContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.arrayExpr`.
     * @param ctx the parse tree
     */
    exitArrayExpr?: (ctx: ArrayExprContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.templateExpr`.
     * @param ctx the parse tree
     */
    enterTemplateExpr?: (ctx: TemplateExprContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.templateExpr`.
     * @param ctx the parse tree
     */
    exitTemplateExpr?: (ctx: TemplateExprContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.propKey`.
     * @param ctx the parse tree
     */
    enterPropKey?: (ctx: PropKeyContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.propKey`.
     * @param ctx the parse tree
     */
    exitPropKey?: (ctx: PropKeyContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.propAccess`.
     * @param ctx the parse tree
     */
    enterPropAccess?: (ctx: PropAccessContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.propAccess`.
     * @param ctx the parse tree
     */
    exitPropAccess?: (ctx: PropAccessContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.indexAccess`.
     * @param ctx the parse tree
     */
    enterIndexAccess?: (ctx: IndexAccessContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.indexAccess`.
     * @param ctx the parse tree
     */
    exitIndexAccess?: (ctx: IndexAccessContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.quasiquote`.
     * @param ctx the parse tree
     */
    enterQuasiquote?: (ctx: QuasiquoteContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.quasiquote`.
     * @param ctx the parse tree
     */
    exitQuasiquote?: (ctx: QuasiquoteContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.unquote`.
     * @param ctx the parse tree
     */
    enterUnquote?: (ctx: UnquoteContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.unquote`.
     * @param ctx the parse tree
     */
    exitUnquote?: (ctx: UnquoteContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.unquoteSplicing`.
     * @param ctx the parse tree
     */
    enterUnquoteSplicing?: (ctx: UnquoteSplicingContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.unquoteSplicing`.
     * @param ctx the parse tree
     */
    exitUnquoteSplicing?: (ctx: UnquoteSplicingContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.optChain`.
     * @param ctx the parse tree
     */
    enterOptChain?: (ctx: OptChainContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.optChain`.
     * @param ctx the parse tree
     */
    exitOptChain?: (ctx: OptChainContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.optChainIndex`.
     * @param ctx the parse tree
     */
    enterOptChainIndex?: (ctx: OptChainIndexContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.optChainIndex`.
     * @param ctx the parse tree
     */
    exitOptChainIndex?: (ctx: OptChainIndexContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.nullCoalesce`.
     * @param ctx the parse tree
     */
    enterNullCoalesce?: (ctx: NullCoalesceContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.nullCoalesce`.
     * @param ctx the parse tree
     */
    exitNullCoalesce?: (ctx: NullCoalesceContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.call`.
     * @param ctx the parse tree
     */
    enterCall?: (ctx: CallContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.call`.
     * @param ctx the parse tree
     */
    exitCall?: (ctx: CallContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.typeArgs`.
     * @param ctx the parse tree
     */
    enterTypeArgs?: (ctx: TypeArgsContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.typeArgs`.
     * @param ctx the parse tree
     */
    exitTypeArgs?: (ctx: TypeArgsContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.fnSignature`.
     * @param ctx the parse tree
     */
    enterFnSignature?: (ctx: FnSignatureContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.fnSignature`.
     * @param ctx the parse tree
     */
    exitFnSignature?: (ctx: FnSignatureContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.param`.
     * @param ctx the parse tree
     */
    enterParam?: (ctx: ParamContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.param`.
     * @param ctx the parse tree
     */
    exitParam?: (ctx: ParamContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.restParam`.
     * @param ctx the parse tree
     */
    enterRestParam?: (ctx: RestParamContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.restParam`.
     * @param ctx the parse tree
     */
    exitRestParam?: (ctx: RestParamContext) => void;
    /**
     * Enter a parse tree produced by `Stage7Parser.literal`.
     * @param ctx the parse tree
     */
    enterLiteral?: (ctx: LiteralContext) => void;
    /**
     * Exit a parse tree produced by `Stage7Parser.literal`.
     * @param ctx the parse tree
     */
    exitLiteral?: (ctx: LiteralContext) => void;

    visitTerminal(node: TerminalNode): void {}
    visitErrorNode(node: ErrorNode): void {}
    enterEveryRule(node: ParserRuleContext): void {}
    exitEveryRule(node: ParserRuleContext): void {}
}

