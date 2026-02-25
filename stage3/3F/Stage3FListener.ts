
import { ErrorNode, ParseTreeListener, ParserRuleContext, TerminalNode } from "antlr4ng";


import { ProgramContext } from "./Stage3FParser.js";
import { TopLevelContext } from "./Stage3FParser.js";
import { DeclContext } from "./Stage3FParser.js";
import { DefmacroContext } from "./Stage3FParser.js";
import { DefContext } from "./Stage3FParser.js";
import { TypeAliasContext } from "./Stage3FParser.js";
import { InterfaceDefContext } from "./Stage3FParser.js";
import { InterfaceExtendsContext } from "./Stage3FParser.js";
import { ClassDefContext } from "./Stage3FParser.js";
import { AnonClassDefContext } from "./Stage3FParser.js";
import { ClassExtendsContext } from "./Stage3FParser.js";
import { ClassImplementsContext } from "./Stage3FParser.js";
import { ClassBodyContext } from "./Stage3FParser.js";
import { ClassElementContext } from "./Stage3FParser.js";
import { ModifierContext } from "./Stage3FParser.js";
import { FieldDefContext } from "./Stage3FParser.js";
import { ConstructorDefContext } from "./Stage3FParser.js";
import { ClassMethodDefContext } from "./Stage3FParser.js";
import { AbstractMethodDefContext } from "./Stage3FParser.js";
import { GetterDefContext } from "./Stage3FParser.js";
import { SetterDefContext } from "./Stage3FParser.js";
import { TypedParamContext } from "./Stage3FParser.js";
import { FnSignatureTypedContext } from "./Stage3FParser.js";
import { StatementContext } from "./Stage3FParser.js";
import { LetStarContext } from "./Stage3FParser.js";
import { LetStmtContext } from "./Stage3FParser.js";
import { ConstStarContext } from "./Stage3FParser.js";
import { ConstStmtContext } from "./Stage3FParser.js";
import { IfFormContext } from "./Stage3FParser.js";
import { WhileFormContext } from "./Stage3FParser.js";
import { BlockContext } from "./Stage3FParser.js";
import { ReturnFormContext } from "./Stage3FParser.js";
import { ThrowFormContext } from "./Stage3FParser.js";
import { ImportFormContext } from "./Stage3FParser.js";
import { ImportTypeFormContext } from "./Stage3FParser.js";
import { ImportTypeSpecContext } from "./Stage3FParser.js";
import { ImportTypeNameContext } from "./Stage3FParser.js";
import { ExportFormContext } from "./Stage3FParser.js";
import { ExportBindingContext } from "./Stage3FParser.js";
import { ExportDefaultContext } from "./Stage3FParser.js";
import { ExportNamedContext } from "./Stage3FParser.js";
import { ExportNamePairContext } from "./Stage3FParser.js";
import { ExportFromContext } from "./Stage3FParser.js";
import { ExportAllFromContext } from "./Stage3FParser.js";
import { ExportNsFromFormContext } from "./Stage3FParser.js";
import { ExportTypeFormContext } from "./Stage3FParser.js";
import { ExportTypeFromFormContext } from "./Stage3FParser.js";
import { ExportTypeAllFromFormContext } from "./Stage3FParser.js";
import { ExportDeclFormContext } from "./Stage3FParser.js";
import { StarBindingContext } from "./Stage3FParser.js";
import { SingleBindingContext } from "./Stage3FParser.js";
import { TypeExprContext } from "./Stage3FParser.js";
import { TypeUnionContext } from "./Stage3FParser.js";
import { TypeIntersectionContext } from "./Stage3FParser.js";
import { TypeArrayContext } from "./Stage3FParser.js";
import { TypeTupleContext } from "./Stage3FParser.js";
import { TypeTupleElementContext } from "./Stage3FParser.js";
import { TypeFunctionContext } from "./Stage3FParser.js";
import { TypeFnParamContext } from "./Stage3FParser.js";
import { TypeObjectContext } from "./Stage3FParser.js";
import { TypePropContext } from "./Stage3FParser.js";
import { PropModifierContext } from "./Stage3FParser.js";
import { TypeLiteralContext } from "./Stage3FParser.js";
import { TypeKeyofContext } from "./Stage3FParser.js";
import { TypeTypeofContext } from "./Stage3FParser.js";
import { TypeIndexAccessContext } from "./Stage3FParser.js";
import { TypeConditionalContext } from "./Stage3FParser.js";
import { TypeInferContext } from "./Stage3FParser.js";
import { TypeMappedContext } from "./Stage3FParser.js";
import { MappedModifiersContext } from "./Stage3FParser.js";
import { MappedModifierContext } from "./Stage3FParser.js";
import { TypeTemplateLiteralContext } from "./Stage3FParser.js";
import { TemplatePartContext } from "./Stage3FParser.js";
import { TypeApplicationContext } from "./Stage3FParser.js";
import { TypeParamsContext } from "./Stage3FParser.js";
import { TypeParamDeclContext } from "./Stage3FParser.js";
import { TypeParamConstraintContext } from "./Stage3FParser.js";
import { TypeParamDefaultContext } from "./Stage3FParser.js";
import { AssignContext } from "./Stage3FParser.js";
import { SwitchFormContext } from "./Stage3FParser.js";
import { CaseClauseContext } from "./Stage3FParser.js";
import { DefaultClauseContext } from "./Stage3FParser.js";
import { ForFormContext } from "./Stage3FParser.js";
import { ForInFormContext } from "./Stage3FParser.js";
import { ForOfFormContext } from "./Stage3FParser.js";
import { ExpressionContext } from "./Stage3FParser.js";
import { ThisExprContext } from "./Stage3FParser.js";
import { SuperExprContext } from "./Stage3FParser.js";
import { SuperConstructorCallContext } from "./Stage3FParser.js";
import { SuperMethodCallContext } from "./Stage3FParser.js";
import { TypeofExprContext } from "./Stage3FParser.js";
import { TypeAssertContext } from "./Stage3FParser.js";
import { LambdaContext } from "./Stage3FParser.js";
import { FnContext } from "./Stage3FParser.js";
import { BindExprContext } from "./Stage3FParser.js";
import { MethodCallExprContext } from "./Stage3FParser.js";
import { TernaryContext } from "./Stage3FParser.js";
import { CondExprContext } from "./Stage3FParser.js";
import { NewFormContext } from "./Stage3FParser.js";
import { ObjectExprContext } from "./Stage3FParser.js";
import { ObjectFieldContext } from "./Stage3FParser.js";
import { MethodDefContext } from "./Stage3FParser.js";
import { ArrayExprContext } from "./Stage3FParser.js";
import { PropKeyContext } from "./Stage3FParser.js";
import { PropAccessContext } from "./Stage3FParser.js";
import { IndexAccessContext } from "./Stage3FParser.js";
import { QuasiquoteContext } from "./Stage3FParser.js";
import { UnquoteContext } from "./Stage3FParser.js";
import { UnquoteSplicingContext } from "./Stage3FParser.js";
import { OptChainContext } from "./Stage3FParser.js";
import { NullCoalesceContext } from "./Stage3FParser.js";
import { CallContext } from "./Stage3FParser.js";
import { TypeArgsContext } from "./Stage3FParser.js";
import { FnSignatureContext } from "./Stage3FParser.js";
import { ParamContext } from "./Stage3FParser.js";
import { LiteralContext } from "./Stage3FParser.js";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `Stage3FParser`.
 */
export class Stage3FListener implements ParseTreeListener {
    /**
     * Enter a parse tree produced by `Stage3FParser.program`.
     * @param ctx the parse tree
     */
    enterProgram?: (ctx: ProgramContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.program`.
     * @param ctx the parse tree
     */
    exitProgram?: (ctx: ProgramContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.topLevel`.
     * @param ctx the parse tree
     */
    enterTopLevel?: (ctx: TopLevelContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.topLevel`.
     * @param ctx the parse tree
     */
    exitTopLevel?: (ctx: TopLevelContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.decl`.
     * @param ctx the parse tree
     */
    enterDecl?: (ctx: DeclContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.decl`.
     * @param ctx the parse tree
     */
    exitDecl?: (ctx: DeclContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.defmacro`.
     * @param ctx the parse tree
     */
    enterDefmacro?: (ctx: DefmacroContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.defmacro`.
     * @param ctx the parse tree
     */
    exitDefmacro?: (ctx: DefmacroContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.def`.
     * @param ctx the parse tree
     */
    enterDef?: (ctx: DefContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.def`.
     * @param ctx the parse tree
     */
    exitDef?: (ctx: DefContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.typeAlias`.
     * @param ctx the parse tree
     */
    enterTypeAlias?: (ctx: TypeAliasContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.typeAlias`.
     * @param ctx the parse tree
     */
    exitTypeAlias?: (ctx: TypeAliasContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.interfaceDef`.
     * @param ctx the parse tree
     */
    enterInterfaceDef?: (ctx: InterfaceDefContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.interfaceDef`.
     * @param ctx the parse tree
     */
    exitInterfaceDef?: (ctx: InterfaceDefContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.interfaceExtends`.
     * @param ctx the parse tree
     */
    enterInterfaceExtends?: (ctx: InterfaceExtendsContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.interfaceExtends`.
     * @param ctx the parse tree
     */
    exitInterfaceExtends?: (ctx: InterfaceExtendsContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.classDef`.
     * @param ctx the parse tree
     */
    enterClassDef?: (ctx: ClassDefContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.classDef`.
     * @param ctx the parse tree
     */
    exitClassDef?: (ctx: ClassDefContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.anonClassDef`.
     * @param ctx the parse tree
     */
    enterAnonClassDef?: (ctx: AnonClassDefContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.anonClassDef`.
     * @param ctx the parse tree
     */
    exitAnonClassDef?: (ctx: AnonClassDefContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.classExtends`.
     * @param ctx the parse tree
     */
    enterClassExtends?: (ctx: ClassExtendsContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.classExtends`.
     * @param ctx the parse tree
     */
    exitClassExtends?: (ctx: ClassExtendsContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.classImplements`.
     * @param ctx the parse tree
     */
    enterClassImplements?: (ctx: ClassImplementsContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.classImplements`.
     * @param ctx the parse tree
     */
    exitClassImplements?: (ctx: ClassImplementsContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.classBody`.
     * @param ctx the parse tree
     */
    enterClassBody?: (ctx: ClassBodyContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.classBody`.
     * @param ctx the parse tree
     */
    exitClassBody?: (ctx: ClassBodyContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.classElement`.
     * @param ctx the parse tree
     */
    enterClassElement?: (ctx: ClassElementContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.classElement`.
     * @param ctx the parse tree
     */
    exitClassElement?: (ctx: ClassElementContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.modifier`.
     * @param ctx the parse tree
     */
    enterModifier?: (ctx: ModifierContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.modifier`.
     * @param ctx the parse tree
     */
    exitModifier?: (ctx: ModifierContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.fieldDef`.
     * @param ctx the parse tree
     */
    enterFieldDef?: (ctx: FieldDefContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.fieldDef`.
     * @param ctx the parse tree
     */
    exitFieldDef?: (ctx: FieldDefContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.constructorDef`.
     * @param ctx the parse tree
     */
    enterConstructorDef?: (ctx: ConstructorDefContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.constructorDef`.
     * @param ctx the parse tree
     */
    exitConstructorDef?: (ctx: ConstructorDefContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.classMethodDef`.
     * @param ctx the parse tree
     */
    enterClassMethodDef?: (ctx: ClassMethodDefContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.classMethodDef`.
     * @param ctx the parse tree
     */
    exitClassMethodDef?: (ctx: ClassMethodDefContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.abstractMethodDef`.
     * @param ctx the parse tree
     */
    enterAbstractMethodDef?: (ctx: AbstractMethodDefContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.abstractMethodDef`.
     * @param ctx the parse tree
     */
    exitAbstractMethodDef?: (ctx: AbstractMethodDefContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.getterDef`.
     * @param ctx the parse tree
     */
    enterGetterDef?: (ctx: GetterDefContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.getterDef`.
     * @param ctx the parse tree
     */
    exitGetterDef?: (ctx: GetterDefContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.setterDef`.
     * @param ctx the parse tree
     */
    enterSetterDef?: (ctx: SetterDefContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.setterDef`.
     * @param ctx the parse tree
     */
    exitSetterDef?: (ctx: SetterDefContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.typedParam`.
     * @param ctx the parse tree
     */
    enterTypedParam?: (ctx: TypedParamContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.typedParam`.
     * @param ctx the parse tree
     */
    exitTypedParam?: (ctx: TypedParamContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.fnSignatureTyped`.
     * @param ctx the parse tree
     */
    enterFnSignatureTyped?: (ctx: FnSignatureTypedContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.fnSignatureTyped`.
     * @param ctx the parse tree
     */
    exitFnSignatureTyped?: (ctx: FnSignatureTypedContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.statement`.
     * @param ctx the parse tree
     */
    enterStatement?: (ctx: StatementContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.statement`.
     * @param ctx the parse tree
     */
    exitStatement?: (ctx: StatementContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.letStar`.
     * @param ctx the parse tree
     */
    enterLetStar?: (ctx: LetStarContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.letStar`.
     * @param ctx the parse tree
     */
    exitLetStar?: (ctx: LetStarContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.letStmt`.
     * @param ctx the parse tree
     */
    enterLetStmt?: (ctx: LetStmtContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.letStmt`.
     * @param ctx the parse tree
     */
    exitLetStmt?: (ctx: LetStmtContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.constStar`.
     * @param ctx the parse tree
     */
    enterConstStar?: (ctx: ConstStarContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.constStar`.
     * @param ctx the parse tree
     */
    exitConstStar?: (ctx: ConstStarContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.constStmt`.
     * @param ctx the parse tree
     */
    enterConstStmt?: (ctx: ConstStmtContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.constStmt`.
     * @param ctx the parse tree
     */
    exitConstStmt?: (ctx: ConstStmtContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.ifForm`.
     * @param ctx the parse tree
     */
    enterIfForm?: (ctx: IfFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.ifForm`.
     * @param ctx the parse tree
     */
    exitIfForm?: (ctx: IfFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.whileForm`.
     * @param ctx the parse tree
     */
    enterWhileForm?: (ctx: WhileFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.whileForm`.
     * @param ctx the parse tree
     */
    exitWhileForm?: (ctx: WhileFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.block`.
     * @param ctx the parse tree
     */
    enterBlock?: (ctx: BlockContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.block`.
     * @param ctx the parse tree
     */
    exitBlock?: (ctx: BlockContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.returnForm`.
     * @param ctx the parse tree
     */
    enterReturnForm?: (ctx: ReturnFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.returnForm`.
     * @param ctx the parse tree
     */
    exitReturnForm?: (ctx: ReturnFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.throwForm`.
     * @param ctx the parse tree
     */
    enterThrowForm?: (ctx: ThrowFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.throwForm`.
     * @param ctx the parse tree
     */
    exitThrowForm?: (ctx: ThrowFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.importForm`.
     * @param ctx the parse tree
     */
    enterImportForm?: (ctx: ImportFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.importForm`.
     * @param ctx the parse tree
     */
    exitImportForm?: (ctx: ImportFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.importTypeForm`.
     * @param ctx the parse tree
     */
    enterImportTypeForm?: (ctx: ImportTypeFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.importTypeForm`.
     * @param ctx the parse tree
     */
    exitImportTypeForm?: (ctx: ImportTypeFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.importTypeSpec`.
     * @param ctx the parse tree
     */
    enterImportTypeSpec?: (ctx: ImportTypeSpecContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.importTypeSpec`.
     * @param ctx the parse tree
     */
    exitImportTypeSpec?: (ctx: ImportTypeSpecContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.importTypeName`.
     * @param ctx the parse tree
     */
    enterImportTypeName?: (ctx: ImportTypeNameContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.importTypeName`.
     * @param ctx the parse tree
     */
    exitImportTypeName?: (ctx: ImportTypeNameContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.exportForm`.
     * @param ctx the parse tree
     */
    enterExportForm?: (ctx: ExportFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.exportForm`.
     * @param ctx the parse tree
     */
    exitExportForm?: (ctx: ExportFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.exportBinding`.
     * @param ctx the parse tree
     */
    enterExportBinding?: (ctx: ExportBindingContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.exportBinding`.
     * @param ctx the parse tree
     */
    exitExportBinding?: (ctx: ExportBindingContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.exportDefault`.
     * @param ctx the parse tree
     */
    enterExportDefault?: (ctx: ExportDefaultContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.exportDefault`.
     * @param ctx the parse tree
     */
    exitExportDefault?: (ctx: ExportDefaultContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.exportNamed`.
     * @param ctx the parse tree
     */
    enterExportNamed?: (ctx: ExportNamedContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.exportNamed`.
     * @param ctx the parse tree
     */
    exitExportNamed?: (ctx: ExportNamedContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.exportNamePair`.
     * @param ctx the parse tree
     */
    enterExportNamePair?: (ctx: ExportNamePairContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.exportNamePair`.
     * @param ctx the parse tree
     */
    exitExportNamePair?: (ctx: ExportNamePairContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.exportFrom`.
     * @param ctx the parse tree
     */
    enterExportFrom?: (ctx: ExportFromContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.exportFrom`.
     * @param ctx the parse tree
     */
    exitExportFrom?: (ctx: ExportFromContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.exportAllFrom`.
     * @param ctx the parse tree
     */
    enterExportAllFrom?: (ctx: ExportAllFromContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.exportAllFrom`.
     * @param ctx the parse tree
     */
    exitExportAllFrom?: (ctx: ExportAllFromContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.exportNsFromForm`.
     * @param ctx the parse tree
     */
    enterExportNsFromForm?: (ctx: ExportNsFromFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.exportNsFromForm`.
     * @param ctx the parse tree
     */
    exitExportNsFromForm?: (ctx: ExportNsFromFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.exportTypeForm`.
     * @param ctx the parse tree
     */
    enterExportTypeForm?: (ctx: ExportTypeFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.exportTypeForm`.
     * @param ctx the parse tree
     */
    exitExportTypeForm?: (ctx: ExportTypeFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.exportTypeFromForm`.
     * @param ctx the parse tree
     */
    enterExportTypeFromForm?: (ctx: ExportTypeFromFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.exportTypeFromForm`.
     * @param ctx the parse tree
     */
    exitExportTypeFromForm?: (ctx: ExportTypeFromFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.exportTypeAllFromForm`.
     * @param ctx the parse tree
     */
    enterExportTypeAllFromForm?: (ctx: ExportTypeAllFromFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.exportTypeAllFromForm`.
     * @param ctx the parse tree
     */
    exitExportTypeAllFromForm?: (ctx: ExportTypeAllFromFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.exportDeclForm`.
     * @param ctx the parse tree
     */
    enterExportDeclForm?: (ctx: ExportDeclFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.exportDeclForm`.
     * @param ctx the parse tree
     */
    exitExportDeclForm?: (ctx: ExportDeclFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.starBinding`.
     * @param ctx the parse tree
     */
    enterStarBinding?: (ctx: StarBindingContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.starBinding`.
     * @param ctx the parse tree
     */
    exitStarBinding?: (ctx: StarBindingContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.singleBinding`.
     * @param ctx the parse tree
     */
    enterSingleBinding?: (ctx: SingleBindingContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.singleBinding`.
     * @param ctx the parse tree
     */
    exitSingleBinding?: (ctx: SingleBindingContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.typeExpr`.
     * @param ctx the parse tree
     */
    enterTypeExpr?: (ctx: TypeExprContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.typeExpr`.
     * @param ctx the parse tree
     */
    exitTypeExpr?: (ctx: TypeExprContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.typeUnion`.
     * @param ctx the parse tree
     */
    enterTypeUnion?: (ctx: TypeUnionContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.typeUnion`.
     * @param ctx the parse tree
     */
    exitTypeUnion?: (ctx: TypeUnionContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.typeIntersection`.
     * @param ctx the parse tree
     */
    enterTypeIntersection?: (ctx: TypeIntersectionContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.typeIntersection`.
     * @param ctx the parse tree
     */
    exitTypeIntersection?: (ctx: TypeIntersectionContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.typeArray`.
     * @param ctx the parse tree
     */
    enterTypeArray?: (ctx: TypeArrayContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.typeArray`.
     * @param ctx the parse tree
     */
    exitTypeArray?: (ctx: TypeArrayContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.typeTuple`.
     * @param ctx the parse tree
     */
    enterTypeTuple?: (ctx: TypeTupleContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.typeTuple`.
     * @param ctx the parse tree
     */
    exitTypeTuple?: (ctx: TypeTupleContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.typeTupleElement`.
     * @param ctx the parse tree
     */
    enterTypeTupleElement?: (ctx: TypeTupleElementContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.typeTupleElement`.
     * @param ctx the parse tree
     */
    exitTypeTupleElement?: (ctx: TypeTupleElementContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.typeFunction`.
     * @param ctx the parse tree
     */
    enterTypeFunction?: (ctx: TypeFunctionContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.typeFunction`.
     * @param ctx the parse tree
     */
    exitTypeFunction?: (ctx: TypeFunctionContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.typeFnParam`.
     * @param ctx the parse tree
     */
    enterTypeFnParam?: (ctx: TypeFnParamContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.typeFnParam`.
     * @param ctx the parse tree
     */
    exitTypeFnParam?: (ctx: TypeFnParamContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.typeObject`.
     * @param ctx the parse tree
     */
    enterTypeObject?: (ctx: TypeObjectContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.typeObject`.
     * @param ctx the parse tree
     */
    exitTypeObject?: (ctx: TypeObjectContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.typeProp`.
     * @param ctx the parse tree
     */
    enterTypeProp?: (ctx: TypePropContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.typeProp`.
     * @param ctx the parse tree
     */
    exitTypeProp?: (ctx: TypePropContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.propModifier`.
     * @param ctx the parse tree
     */
    enterPropModifier?: (ctx: PropModifierContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.propModifier`.
     * @param ctx the parse tree
     */
    exitPropModifier?: (ctx: PropModifierContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.typeLiteral`.
     * @param ctx the parse tree
     */
    enterTypeLiteral?: (ctx: TypeLiteralContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.typeLiteral`.
     * @param ctx the parse tree
     */
    exitTypeLiteral?: (ctx: TypeLiteralContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.typeKeyof`.
     * @param ctx the parse tree
     */
    enterTypeKeyof?: (ctx: TypeKeyofContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.typeKeyof`.
     * @param ctx the parse tree
     */
    exitTypeKeyof?: (ctx: TypeKeyofContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.typeTypeof`.
     * @param ctx the parse tree
     */
    enterTypeTypeof?: (ctx: TypeTypeofContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.typeTypeof`.
     * @param ctx the parse tree
     */
    exitTypeTypeof?: (ctx: TypeTypeofContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.typeIndexAccess`.
     * @param ctx the parse tree
     */
    enterTypeIndexAccess?: (ctx: TypeIndexAccessContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.typeIndexAccess`.
     * @param ctx the parse tree
     */
    exitTypeIndexAccess?: (ctx: TypeIndexAccessContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.typeConditional`.
     * @param ctx the parse tree
     */
    enterTypeConditional?: (ctx: TypeConditionalContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.typeConditional`.
     * @param ctx the parse tree
     */
    exitTypeConditional?: (ctx: TypeConditionalContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.typeInfer`.
     * @param ctx the parse tree
     */
    enterTypeInfer?: (ctx: TypeInferContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.typeInfer`.
     * @param ctx the parse tree
     */
    exitTypeInfer?: (ctx: TypeInferContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.typeMapped`.
     * @param ctx the parse tree
     */
    enterTypeMapped?: (ctx: TypeMappedContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.typeMapped`.
     * @param ctx the parse tree
     */
    exitTypeMapped?: (ctx: TypeMappedContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.mappedModifiers`.
     * @param ctx the parse tree
     */
    enterMappedModifiers?: (ctx: MappedModifiersContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.mappedModifiers`.
     * @param ctx the parse tree
     */
    exitMappedModifiers?: (ctx: MappedModifiersContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.mappedModifier`.
     * @param ctx the parse tree
     */
    enterMappedModifier?: (ctx: MappedModifierContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.mappedModifier`.
     * @param ctx the parse tree
     */
    exitMappedModifier?: (ctx: MappedModifierContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.typeTemplateLiteral`.
     * @param ctx the parse tree
     */
    enterTypeTemplateLiteral?: (ctx: TypeTemplateLiteralContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.typeTemplateLiteral`.
     * @param ctx the parse tree
     */
    exitTypeTemplateLiteral?: (ctx: TypeTemplateLiteralContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.templatePart`.
     * @param ctx the parse tree
     */
    enterTemplatePart?: (ctx: TemplatePartContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.templatePart`.
     * @param ctx the parse tree
     */
    exitTemplatePart?: (ctx: TemplatePartContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.typeApplication`.
     * @param ctx the parse tree
     */
    enterTypeApplication?: (ctx: TypeApplicationContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.typeApplication`.
     * @param ctx the parse tree
     */
    exitTypeApplication?: (ctx: TypeApplicationContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.typeParams`.
     * @param ctx the parse tree
     */
    enterTypeParams?: (ctx: TypeParamsContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.typeParams`.
     * @param ctx the parse tree
     */
    exitTypeParams?: (ctx: TypeParamsContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.typeParamDecl`.
     * @param ctx the parse tree
     */
    enterTypeParamDecl?: (ctx: TypeParamDeclContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.typeParamDecl`.
     * @param ctx the parse tree
     */
    exitTypeParamDecl?: (ctx: TypeParamDeclContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.typeParamConstraint`.
     * @param ctx the parse tree
     */
    enterTypeParamConstraint?: (ctx: TypeParamConstraintContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.typeParamConstraint`.
     * @param ctx the parse tree
     */
    exitTypeParamConstraint?: (ctx: TypeParamConstraintContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.typeParamDefault`.
     * @param ctx the parse tree
     */
    enterTypeParamDefault?: (ctx: TypeParamDefaultContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.typeParamDefault`.
     * @param ctx the parse tree
     */
    exitTypeParamDefault?: (ctx: TypeParamDefaultContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.assign`.
     * @param ctx the parse tree
     */
    enterAssign?: (ctx: AssignContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.assign`.
     * @param ctx the parse tree
     */
    exitAssign?: (ctx: AssignContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.switchForm`.
     * @param ctx the parse tree
     */
    enterSwitchForm?: (ctx: SwitchFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.switchForm`.
     * @param ctx the parse tree
     */
    exitSwitchForm?: (ctx: SwitchFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.caseClause`.
     * @param ctx the parse tree
     */
    enterCaseClause?: (ctx: CaseClauseContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.caseClause`.
     * @param ctx the parse tree
     */
    exitCaseClause?: (ctx: CaseClauseContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.defaultClause`.
     * @param ctx the parse tree
     */
    enterDefaultClause?: (ctx: DefaultClauseContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.defaultClause`.
     * @param ctx the parse tree
     */
    exitDefaultClause?: (ctx: DefaultClauseContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.forForm`.
     * @param ctx the parse tree
     */
    enterForForm?: (ctx: ForFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.forForm`.
     * @param ctx the parse tree
     */
    exitForForm?: (ctx: ForFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.forInForm`.
     * @param ctx the parse tree
     */
    enterForInForm?: (ctx: ForInFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.forInForm`.
     * @param ctx the parse tree
     */
    exitForInForm?: (ctx: ForInFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.forOfForm`.
     * @param ctx the parse tree
     */
    enterForOfForm?: (ctx: ForOfFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.forOfForm`.
     * @param ctx the parse tree
     */
    exitForOfForm?: (ctx: ForOfFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.expression`.
     * @param ctx the parse tree
     */
    enterExpression?: (ctx: ExpressionContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.expression`.
     * @param ctx the parse tree
     */
    exitExpression?: (ctx: ExpressionContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.thisExpr`.
     * @param ctx the parse tree
     */
    enterThisExpr?: (ctx: ThisExprContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.thisExpr`.
     * @param ctx the parse tree
     */
    exitThisExpr?: (ctx: ThisExprContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.superExpr`.
     * @param ctx the parse tree
     */
    enterSuperExpr?: (ctx: SuperExprContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.superExpr`.
     * @param ctx the parse tree
     */
    exitSuperExpr?: (ctx: SuperExprContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.superConstructorCall`.
     * @param ctx the parse tree
     */
    enterSuperConstructorCall?: (ctx: SuperConstructorCallContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.superConstructorCall`.
     * @param ctx the parse tree
     */
    exitSuperConstructorCall?: (ctx: SuperConstructorCallContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.superMethodCall`.
     * @param ctx the parse tree
     */
    enterSuperMethodCall?: (ctx: SuperMethodCallContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.superMethodCall`.
     * @param ctx the parse tree
     */
    exitSuperMethodCall?: (ctx: SuperMethodCallContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.typeofExpr`.
     * @param ctx the parse tree
     */
    enterTypeofExpr?: (ctx: TypeofExprContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.typeofExpr`.
     * @param ctx the parse tree
     */
    exitTypeofExpr?: (ctx: TypeofExprContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.typeAssert`.
     * @param ctx the parse tree
     */
    enterTypeAssert?: (ctx: TypeAssertContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.typeAssert`.
     * @param ctx the parse tree
     */
    exitTypeAssert?: (ctx: TypeAssertContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.lambda`.
     * @param ctx the parse tree
     */
    enterLambda?: (ctx: LambdaContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.lambda`.
     * @param ctx the parse tree
     */
    exitLambda?: (ctx: LambdaContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.fn`.
     * @param ctx the parse tree
     */
    enterFn?: (ctx: FnContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.fn`.
     * @param ctx the parse tree
     */
    exitFn?: (ctx: FnContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.bindExpr`.
     * @param ctx the parse tree
     */
    enterBindExpr?: (ctx: BindExprContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.bindExpr`.
     * @param ctx the parse tree
     */
    exitBindExpr?: (ctx: BindExprContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.methodCallExpr`.
     * @param ctx the parse tree
     */
    enterMethodCallExpr?: (ctx: MethodCallExprContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.methodCallExpr`.
     * @param ctx the parse tree
     */
    exitMethodCallExpr?: (ctx: MethodCallExprContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.ternary`.
     * @param ctx the parse tree
     */
    enterTernary?: (ctx: TernaryContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.ternary`.
     * @param ctx the parse tree
     */
    exitTernary?: (ctx: TernaryContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.condExpr`.
     * @param ctx the parse tree
     */
    enterCondExpr?: (ctx: CondExprContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.condExpr`.
     * @param ctx the parse tree
     */
    exitCondExpr?: (ctx: CondExprContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.newForm`.
     * @param ctx the parse tree
     */
    enterNewForm?: (ctx: NewFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.newForm`.
     * @param ctx the parse tree
     */
    exitNewForm?: (ctx: NewFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.objectExpr`.
     * @param ctx the parse tree
     */
    enterObjectExpr?: (ctx: ObjectExprContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.objectExpr`.
     * @param ctx the parse tree
     */
    exitObjectExpr?: (ctx: ObjectExprContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.objectField`.
     * @param ctx the parse tree
     */
    enterObjectField?: (ctx: ObjectFieldContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.objectField`.
     * @param ctx the parse tree
     */
    exitObjectField?: (ctx: ObjectFieldContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.methodDef`.
     * @param ctx the parse tree
     */
    enterMethodDef?: (ctx: MethodDefContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.methodDef`.
     * @param ctx the parse tree
     */
    exitMethodDef?: (ctx: MethodDefContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.arrayExpr`.
     * @param ctx the parse tree
     */
    enterArrayExpr?: (ctx: ArrayExprContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.arrayExpr`.
     * @param ctx the parse tree
     */
    exitArrayExpr?: (ctx: ArrayExprContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.propKey`.
     * @param ctx the parse tree
     */
    enterPropKey?: (ctx: PropKeyContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.propKey`.
     * @param ctx the parse tree
     */
    exitPropKey?: (ctx: PropKeyContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.propAccess`.
     * @param ctx the parse tree
     */
    enterPropAccess?: (ctx: PropAccessContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.propAccess`.
     * @param ctx the parse tree
     */
    exitPropAccess?: (ctx: PropAccessContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.indexAccess`.
     * @param ctx the parse tree
     */
    enterIndexAccess?: (ctx: IndexAccessContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.indexAccess`.
     * @param ctx the parse tree
     */
    exitIndexAccess?: (ctx: IndexAccessContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.quasiquote`.
     * @param ctx the parse tree
     */
    enterQuasiquote?: (ctx: QuasiquoteContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.quasiquote`.
     * @param ctx the parse tree
     */
    exitQuasiquote?: (ctx: QuasiquoteContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.unquote`.
     * @param ctx the parse tree
     */
    enterUnquote?: (ctx: UnquoteContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.unquote`.
     * @param ctx the parse tree
     */
    exitUnquote?: (ctx: UnquoteContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.unquoteSplicing`.
     * @param ctx the parse tree
     */
    enterUnquoteSplicing?: (ctx: UnquoteSplicingContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.unquoteSplicing`.
     * @param ctx the parse tree
     */
    exitUnquoteSplicing?: (ctx: UnquoteSplicingContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.optChain`.
     * @param ctx the parse tree
     */
    enterOptChain?: (ctx: OptChainContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.optChain`.
     * @param ctx the parse tree
     */
    exitOptChain?: (ctx: OptChainContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.nullCoalesce`.
     * @param ctx the parse tree
     */
    enterNullCoalesce?: (ctx: NullCoalesceContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.nullCoalesce`.
     * @param ctx the parse tree
     */
    exitNullCoalesce?: (ctx: NullCoalesceContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.call`.
     * @param ctx the parse tree
     */
    enterCall?: (ctx: CallContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.call`.
     * @param ctx the parse tree
     */
    exitCall?: (ctx: CallContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.typeArgs`.
     * @param ctx the parse tree
     */
    enterTypeArgs?: (ctx: TypeArgsContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.typeArgs`.
     * @param ctx the parse tree
     */
    exitTypeArgs?: (ctx: TypeArgsContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.fnSignature`.
     * @param ctx the parse tree
     */
    enterFnSignature?: (ctx: FnSignatureContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.fnSignature`.
     * @param ctx the parse tree
     */
    exitFnSignature?: (ctx: FnSignatureContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.param`.
     * @param ctx the parse tree
     */
    enterParam?: (ctx: ParamContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.param`.
     * @param ctx the parse tree
     */
    exitParam?: (ctx: ParamContext) => void;
    /**
     * Enter a parse tree produced by `Stage3FParser.literal`.
     * @param ctx the parse tree
     */
    enterLiteral?: (ctx: LiteralContext) => void;
    /**
     * Exit a parse tree produced by `Stage3FParser.literal`.
     * @param ctx the parse tree
     */
    exitLiteral?: (ctx: LiteralContext) => void;

    visitTerminal(node: TerminalNode): void {}
    visitErrorNode(node: ErrorNode): void {}
    enterEveryRule(node: ParserRuleContext): void {}
    exitEveryRule(node: ParserRuleContext): void {}
}

