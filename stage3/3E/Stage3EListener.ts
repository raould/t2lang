
import { ErrorNode, ParseTreeListener, ParserRuleContext, TerminalNode } from "antlr4ng";


import { ProgramContext } from "./Stage3EParser.js";
import { TopLevelContext } from "./Stage3EParser.js";
import { DefmacroContext } from "./Stage3EParser.js";
import { DefContext } from "./Stage3EParser.js";
import { TypeAliasContext } from "./Stage3EParser.js";
import { InterfaceDefContext } from "./Stage3EParser.js";
import { InterfaceExtendsContext } from "./Stage3EParser.js";
import { ClassDefContext } from "./Stage3EParser.js";
import { AnonClassDefContext } from "./Stage3EParser.js";
import { ClassExtendsContext } from "./Stage3EParser.js";
import { ClassImplementsContext } from "./Stage3EParser.js";
import { ClassBodyContext } from "./Stage3EParser.js";
import { ClassElementContext } from "./Stage3EParser.js";
import { ModifierContext } from "./Stage3EParser.js";
import { FieldDefContext } from "./Stage3EParser.js";
import { ConstructorDefContext } from "./Stage3EParser.js";
import { ClassMethodDefContext } from "./Stage3EParser.js";
import { AbstractMethodDefContext } from "./Stage3EParser.js";
import { GetterDefContext } from "./Stage3EParser.js";
import { SetterDefContext } from "./Stage3EParser.js";
import { TypedParamContext } from "./Stage3EParser.js";
import { FnSignatureTypedContext } from "./Stage3EParser.js";
import { StatementContext } from "./Stage3EParser.js";
import { LetStarContext } from "./Stage3EParser.js";
import { LetStmtContext } from "./Stage3EParser.js";
import { ConstStarContext } from "./Stage3EParser.js";
import { ConstStmtContext } from "./Stage3EParser.js";
import { IfFormContext } from "./Stage3EParser.js";
import { WhileFormContext } from "./Stage3EParser.js";
import { BlockContext } from "./Stage3EParser.js";
import { ReturnFormContext } from "./Stage3EParser.js";
import { ThrowFormContext } from "./Stage3EParser.js";
import { ImportFormContext } from "./Stage3EParser.js";
import { ExportFormContext } from "./Stage3EParser.js";
import { ExportBindingContext } from "./Stage3EParser.js";
import { ExportDefaultContext } from "./Stage3EParser.js";
import { ExportNamedContext } from "./Stage3EParser.js";
import { ExportNamePairContext } from "./Stage3EParser.js";
import { ExportFromContext } from "./Stage3EParser.js";
import { ExportAllFromContext } from "./Stage3EParser.js";
import { StarBindingContext } from "./Stage3EParser.js";
import { SingleBindingContext } from "./Stage3EParser.js";
import { TypeExprContext } from "./Stage3EParser.js";
import { TypeUnionContext } from "./Stage3EParser.js";
import { TypeIntersectionContext } from "./Stage3EParser.js";
import { TypeArrayContext } from "./Stage3EParser.js";
import { TypeTupleContext } from "./Stage3EParser.js";
import { TypeTupleElementContext } from "./Stage3EParser.js";
import { TypeFunctionContext } from "./Stage3EParser.js";
import { TypeFnParamContext } from "./Stage3EParser.js";
import { TypeObjectContext } from "./Stage3EParser.js";
import { TypePropContext } from "./Stage3EParser.js";
import { PropModifierContext } from "./Stage3EParser.js";
import { TypeLiteralContext } from "./Stage3EParser.js";
import { TypeKeyofContext } from "./Stage3EParser.js";
import { TypeTypeofContext } from "./Stage3EParser.js";
import { TypeIndexAccessContext } from "./Stage3EParser.js";
import { TypeConditionalContext } from "./Stage3EParser.js";
import { TypeInferContext } from "./Stage3EParser.js";
import { TypeMappedContext } from "./Stage3EParser.js";
import { MappedModifiersContext } from "./Stage3EParser.js";
import { MappedModifierContext } from "./Stage3EParser.js";
import { TypeTemplateLiteralContext } from "./Stage3EParser.js";
import { TemplatePartContext } from "./Stage3EParser.js";
import { TypeApplicationContext } from "./Stage3EParser.js";
import { TypeParamsContext } from "./Stage3EParser.js";
import { TypeParamDeclContext } from "./Stage3EParser.js";
import { TypeParamConstraintContext } from "./Stage3EParser.js";
import { TypeParamDefaultContext } from "./Stage3EParser.js";
import { AssignContext } from "./Stage3EParser.js";
import { SwitchFormContext } from "./Stage3EParser.js";
import { CaseClauseContext } from "./Stage3EParser.js";
import { DefaultClauseContext } from "./Stage3EParser.js";
import { ForFormContext } from "./Stage3EParser.js";
import { ForInFormContext } from "./Stage3EParser.js";
import { ForOfFormContext } from "./Stage3EParser.js";
import { ExpressionContext } from "./Stage3EParser.js";
import { ThisExprContext } from "./Stage3EParser.js";
import { SuperExprContext } from "./Stage3EParser.js";
import { SuperConstructorCallContext } from "./Stage3EParser.js";
import { SuperMethodCallContext } from "./Stage3EParser.js";
import { TypeofExprContext } from "./Stage3EParser.js";
import { TypeAssertContext } from "./Stage3EParser.js";
import { LambdaContext } from "./Stage3EParser.js";
import { FnContext } from "./Stage3EParser.js";
import { BindExprContext } from "./Stage3EParser.js";
import { MethodCallExprContext } from "./Stage3EParser.js";
import { TernaryContext } from "./Stage3EParser.js";
import { CondExprContext } from "./Stage3EParser.js";
import { NewFormContext } from "./Stage3EParser.js";
import { ObjectExprContext } from "./Stage3EParser.js";
import { ObjectFieldContext } from "./Stage3EParser.js";
import { MethodDefContext } from "./Stage3EParser.js";
import { ArrayExprContext } from "./Stage3EParser.js";
import { PropKeyContext } from "./Stage3EParser.js";
import { PropAccessContext } from "./Stage3EParser.js";
import { IndexAccessContext } from "./Stage3EParser.js";
import { QuasiquoteContext } from "./Stage3EParser.js";
import { UnquoteContext } from "./Stage3EParser.js";
import { UnquoteSplicingContext } from "./Stage3EParser.js";
import { OptChainContext } from "./Stage3EParser.js";
import { NullCoalesceContext } from "./Stage3EParser.js";
import { CallContext } from "./Stage3EParser.js";
import { TypeArgsContext } from "./Stage3EParser.js";
import { FnSignatureContext } from "./Stage3EParser.js";
import { ParamContext } from "./Stage3EParser.js";
import { LiteralContext } from "./Stage3EParser.js";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `Stage3EParser`.
 */
export class Stage3EListener implements ParseTreeListener {
    /**
     * Enter a parse tree produced by `Stage3EParser.program`.
     * @param ctx the parse tree
     */
    enterProgram?: (ctx: ProgramContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.program`.
     * @param ctx the parse tree
     */
    exitProgram?: (ctx: ProgramContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.topLevel`.
     * @param ctx the parse tree
     */
    enterTopLevel?: (ctx: TopLevelContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.topLevel`.
     * @param ctx the parse tree
     */
    exitTopLevel?: (ctx: TopLevelContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.defmacro`.
     * @param ctx the parse tree
     */
    enterDefmacro?: (ctx: DefmacroContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.defmacro`.
     * @param ctx the parse tree
     */
    exitDefmacro?: (ctx: DefmacroContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.def`.
     * @param ctx the parse tree
     */
    enterDef?: (ctx: DefContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.def`.
     * @param ctx the parse tree
     */
    exitDef?: (ctx: DefContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.typeAlias`.
     * @param ctx the parse tree
     */
    enterTypeAlias?: (ctx: TypeAliasContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.typeAlias`.
     * @param ctx the parse tree
     */
    exitTypeAlias?: (ctx: TypeAliasContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.interfaceDef`.
     * @param ctx the parse tree
     */
    enterInterfaceDef?: (ctx: InterfaceDefContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.interfaceDef`.
     * @param ctx the parse tree
     */
    exitInterfaceDef?: (ctx: InterfaceDefContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.interfaceExtends`.
     * @param ctx the parse tree
     */
    enterInterfaceExtends?: (ctx: InterfaceExtendsContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.interfaceExtends`.
     * @param ctx the parse tree
     */
    exitInterfaceExtends?: (ctx: InterfaceExtendsContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.classDef`.
     * @param ctx the parse tree
     */
    enterClassDef?: (ctx: ClassDefContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.classDef`.
     * @param ctx the parse tree
     */
    exitClassDef?: (ctx: ClassDefContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.anonClassDef`.
     * @param ctx the parse tree
     */
    enterAnonClassDef?: (ctx: AnonClassDefContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.anonClassDef`.
     * @param ctx the parse tree
     */
    exitAnonClassDef?: (ctx: AnonClassDefContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.classExtends`.
     * @param ctx the parse tree
     */
    enterClassExtends?: (ctx: ClassExtendsContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.classExtends`.
     * @param ctx the parse tree
     */
    exitClassExtends?: (ctx: ClassExtendsContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.classImplements`.
     * @param ctx the parse tree
     */
    enterClassImplements?: (ctx: ClassImplementsContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.classImplements`.
     * @param ctx the parse tree
     */
    exitClassImplements?: (ctx: ClassImplementsContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.classBody`.
     * @param ctx the parse tree
     */
    enterClassBody?: (ctx: ClassBodyContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.classBody`.
     * @param ctx the parse tree
     */
    exitClassBody?: (ctx: ClassBodyContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.classElement`.
     * @param ctx the parse tree
     */
    enterClassElement?: (ctx: ClassElementContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.classElement`.
     * @param ctx the parse tree
     */
    exitClassElement?: (ctx: ClassElementContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.modifier`.
     * @param ctx the parse tree
     */
    enterModifier?: (ctx: ModifierContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.modifier`.
     * @param ctx the parse tree
     */
    exitModifier?: (ctx: ModifierContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.fieldDef`.
     * @param ctx the parse tree
     */
    enterFieldDef?: (ctx: FieldDefContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.fieldDef`.
     * @param ctx the parse tree
     */
    exitFieldDef?: (ctx: FieldDefContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.constructorDef`.
     * @param ctx the parse tree
     */
    enterConstructorDef?: (ctx: ConstructorDefContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.constructorDef`.
     * @param ctx the parse tree
     */
    exitConstructorDef?: (ctx: ConstructorDefContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.classMethodDef`.
     * @param ctx the parse tree
     */
    enterClassMethodDef?: (ctx: ClassMethodDefContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.classMethodDef`.
     * @param ctx the parse tree
     */
    exitClassMethodDef?: (ctx: ClassMethodDefContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.abstractMethodDef`.
     * @param ctx the parse tree
     */
    enterAbstractMethodDef?: (ctx: AbstractMethodDefContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.abstractMethodDef`.
     * @param ctx the parse tree
     */
    exitAbstractMethodDef?: (ctx: AbstractMethodDefContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.getterDef`.
     * @param ctx the parse tree
     */
    enterGetterDef?: (ctx: GetterDefContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.getterDef`.
     * @param ctx the parse tree
     */
    exitGetterDef?: (ctx: GetterDefContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.setterDef`.
     * @param ctx the parse tree
     */
    enterSetterDef?: (ctx: SetterDefContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.setterDef`.
     * @param ctx the parse tree
     */
    exitSetterDef?: (ctx: SetterDefContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.typedParam`.
     * @param ctx the parse tree
     */
    enterTypedParam?: (ctx: TypedParamContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.typedParam`.
     * @param ctx the parse tree
     */
    exitTypedParam?: (ctx: TypedParamContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.fnSignatureTyped`.
     * @param ctx the parse tree
     */
    enterFnSignatureTyped?: (ctx: FnSignatureTypedContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.fnSignatureTyped`.
     * @param ctx the parse tree
     */
    exitFnSignatureTyped?: (ctx: FnSignatureTypedContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.statement`.
     * @param ctx the parse tree
     */
    enterStatement?: (ctx: StatementContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.statement`.
     * @param ctx the parse tree
     */
    exitStatement?: (ctx: StatementContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.letStar`.
     * @param ctx the parse tree
     */
    enterLetStar?: (ctx: LetStarContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.letStar`.
     * @param ctx the parse tree
     */
    exitLetStar?: (ctx: LetStarContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.letStmt`.
     * @param ctx the parse tree
     */
    enterLetStmt?: (ctx: LetStmtContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.letStmt`.
     * @param ctx the parse tree
     */
    exitLetStmt?: (ctx: LetStmtContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.constStar`.
     * @param ctx the parse tree
     */
    enterConstStar?: (ctx: ConstStarContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.constStar`.
     * @param ctx the parse tree
     */
    exitConstStar?: (ctx: ConstStarContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.constStmt`.
     * @param ctx the parse tree
     */
    enterConstStmt?: (ctx: ConstStmtContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.constStmt`.
     * @param ctx the parse tree
     */
    exitConstStmt?: (ctx: ConstStmtContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.ifForm`.
     * @param ctx the parse tree
     */
    enterIfForm?: (ctx: IfFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.ifForm`.
     * @param ctx the parse tree
     */
    exitIfForm?: (ctx: IfFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.whileForm`.
     * @param ctx the parse tree
     */
    enterWhileForm?: (ctx: WhileFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.whileForm`.
     * @param ctx the parse tree
     */
    exitWhileForm?: (ctx: WhileFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.block`.
     * @param ctx the parse tree
     */
    enterBlock?: (ctx: BlockContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.block`.
     * @param ctx the parse tree
     */
    exitBlock?: (ctx: BlockContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.returnForm`.
     * @param ctx the parse tree
     */
    enterReturnForm?: (ctx: ReturnFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.returnForm`.
     * @param ctx the parse tree
     */
    exitReturnForm?: (ctx: ReturnFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.throwForm`.
     * @param ctx the parse tree
     */
    enterThrowForm?: (ctx: ThrowFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.throwForm`.
     * @param ctx the parse tree
     */
    exitThrowForm?: (ctx: ThrowFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.importForm`.
     * @param ctx the parse tree
     */
    enterImportForm?: (ctx: ImportFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.importForm`.
     * @param ctx the parse tree
     */
    exitImportForm?: (ctx: ImportFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.exportForm`.
     * @param ctx the parse tree
     */
    enterExportForm?: (ctx: ExportFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.exportForm`.
     * @param ctx the parse tree
     */
    exitExportForm?: (ctx: ExportFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.exportBinding`.
     * @param ctx the parse tree
     */
    enterExportBinding?: (ctx: ExportBindingContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.exportBinding`.
     * @param ctx the parse tree
     */
    exitExportBinding?: (ctx: ExportBindingContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.exportDefault`.
     * @param ctx the parse tree
     */
    enterExportDefault?: (ctx: ExportDefaultContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.exportDefault`.
     * @param ctx the parse tree
     */
    exitExportDefault?: (ctx: ExportDefaultContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.exportNamed`.
     * @param ctx the parse tree
     */
    enterExportNamed?: (ctx: ExportNamedContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.exportNamed`.
     * @param ctx the parse tree
     */
    exitExportNamed?: (ctx: ExportNamedContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.exportNamePair`.
     * @param ctx the parse tree
     */
    enterExportNamePair?: (ctx: ExportNamePairContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.exportNamePair`.
     * @param ctx the parse tree
     */
    exitExportNamePair?: (ctx: ExportNamePairContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.exportFrom`.
     * @param ctx the parse tree
     */
    enterExportFrom?: (ctx: ExportFromContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.exportFrom`.
     * @param ctx the parse tree
     */
    exitExportFrom?: (ctx: ExportFromContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.exportAllFrom`.
     * @param ctx the parse tree
     */
    enterExportAllFrom?: (ctx: ExportAllFromContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.exportAllFrom`.
     * @param ctx the parse tree
     */
    exitExportAllFrom?: (ctx: ExportAllFromContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.starBinding`.
     * @param ctx the parse tree
     */
    enterStarBinding?: (ctx: StarBindingContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.starBinding`.
     * @param ctx the parse tree
     */
    exitStarBinding?: (ctx: StarBindingContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.singleBinding`.
     * @param ctx the parse tree
     */
    enterSingleBinding?: (ctx: SingleBindingContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.singleBinding`.
     * @param ctx the parse tree
     */
    exitSingleBinding?: (ctx: SingleBindingContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.typeExpr`.
     * @param ctx the parse tree
     */
    enterTypeExpr?: (ctx: TypeExprContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.typeExpr`.
     * @param ctx the parse tree
     */
    exitTypeExpr?: (ctx: TypeExprContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.typeUnion`.
     * @param ctx the parse tree
     */
    enterTypeUnion?: (ctx: TypeUnionContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.typeUnion`.
     * @param ctx the parse tree
     */
    exitTypeUnion?: (ctx: TypeUnionContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.typeIntersection`.
     * @param ctx the parse tree
     */
    enterTypeIntersection?: (ctx: TypeIntersectionContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.typeIntersection`.
     * @param ctx the parse tree
     */
    exitTypeIntersection?: (ctx: TypeIntersectionContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.typeArray`.
     * @param ctx the parse tree
     */
    enterTypeArray?: (ctx: TypeArrayContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.typeArray`.
     * @param ctx the parse tree
     */
    exitTypeArray?: (ctx: TypeArrayContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.typeTuple`.
     * @param ctx the parse tree
     */
    enterTypeTuple?: (ctx: TypeTupleContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.typeTuple`.
     * @param ctx the parse tree
     */
    exitTypeTuple?: (ctx: TypeTupleContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.typeTupleElement`.
     * @param ctx the parse tree
     */
    enterTypeTupleElement?: (ctx: TypeTupleElementContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.typeTupleElement`.
     * @param ctx the parse tree
     */
    exitTypeTupleElement?: (ctx: TypeTupleElementContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.typeFunction`.
     * @param ctx the parse tree
     */
    enterTypeFunction?: (ctx: TypeFunctionContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.typeFunction`.
     * @param ctx the parse tree
     */
    exitTypeFunction?: (ctx: TypeFunctionContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.typeFnParam`.
     * @param ctx the parse tree
     */
    enterTypeFnParam?: (ctx: TypeFnParamContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.typeFnParam`.
     * @param ctx the parse tree
     */
    exitTypeFnParam?: (ctx: TypeFnParamContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.typeObject`.
     * @param ctx the parse tree
     */
    enterTypeObject?: (ctx: TypeObjectContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.typeObject`.
     * @param ctx the parse tree
     */
    exitTypeObject?: (ctx: TypeObjectContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.typeProp`.
     * @param ctx the parse tree
     */
    enterTypeProp?: (ctx: TypePropContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.typeProp`.
     * @param ctx the parse tree
     */
    exitTypeProp?: (ctx: TypePropContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.propModifier`.
     * @param ctx the parse tree
     */
    enterPropModifier?: (ctx: PropModifierContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.propModifier`.
     * @param ctx the parse tree
     */
    exitPropModifier?: (ctx: PropModifierContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.typeLiteral`.
     * @param ctx the parse tree
     */
    enterTypeLiteral?: (ctx: TypeLiteralContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.typeLiteral`.
     * @param ctx the parse tree
     */
    exitTypeLiteral?: (ctx: TypeLiteralContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.typeKeyof`.
     * @param ctx the parse tree
     */
    enterTypeKeyof?: (ctx: TypeKeyofContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.typeKeyof`.
     * @param ctx the parse tree
     */
    exitTypeKeyof?: (ctx: TypeKeyofContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.typeTypeof`.
     * @param ctx the parse tree
     */
    enterTypeTypeof?: (ctx: TypeTypeofContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.typeTypeof`.
     * @param ctx the parse tree
     */
    exitTypeTypeof?: (ctx: TypeTypeofContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.typeIndexAccess`.
     * @param ctx the parse tree
     */
    enterTypeIndexAccess?: (ctx: TypeIndexAccessContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.typeIndexAccess`.
     * @param ctx the parse tree
     */
    exitTypeIndexAccess?: (ctx: TypeIndexAccessContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.typeConditional`.
     * @param ctx the parse tree
     */
    enterTypeConditional?: (ctx: TypeConditionalContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.typeConditional`.
     * @param ctx the parse tree
     */
    exitTypeConditional?: (ctx: TypeConditionalContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.typeInfer`.
     * @param ctx the parse tree
     */
    enterTypeInfer?: (ctx: TypeInferContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.typeInfer`.
     * @param ctx the parse tree
     */
    exitTypeInfer?: (ctx: TypeInferContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.typeMapped`.
     * @param ctx the parse tree
     */
    enterTypeMapped?: (ctx: TypeMappedContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.typeMapped`.
     * @param ctx the parse tree
     */
    exitTypeMapped?: (ctx: TypeMappedContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.mappedModifiers`.
     * @param ctx the parse tree
     */
    enterMappedModifiers?: (ctx: MappedModifiersContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.mappedModifiers`.
     * @param ctx the parse tree
     */
    exitMappedModifiers?: (ctx: MappedModifiersContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.mappedModifier`.
     * @param ctx the parse tree
     */
    enterMappedModifier?: (ctx: MappedModifierContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.mappedModifier`.
     * @param ctx the parse tree
     */
    exitMappedModifier?: (ctx: MappedModifierContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.typeTemplateLiteral`.
     * @param ctx the parse tree
     */
    enterTypeTemplateLiteral?: (ctx: TypeTemplateLiteralContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.typeTemplateLiteral`.
     * @param ctx the parse tree
     */
    exitTypeTemplateLiteral?: (ctx: TypeTemplateLiteralContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.templatePart`.
     * @param ctx the parse tree
     */
    enterTemplatePart?: (ctx: TemplatePartContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.templatePart`.
     * @param ctx the parse tree
     */
    exitTemplatePart?: (ctx: TemplatePartContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.typeApplication`.
     * @param ctx the parse tree
     */
    enterTypeApplication?: (ctx: TypeApplicationContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.typeApplication`.
     * @param ctx the parse tree
     */
    exitTypeApplication?: (ctx: TypeApplicationContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.typeParams`.
     * @param ctx the parse tree
     */
    enterTypeParams?: (ctx: TypeParamsContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.typeParams`.
     * @param ctx the parse tree
     */
    exitTypeParams?: (ctx: TypeParamsContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.typeParamDecl`.
     * @param ctx the parse tree
     */
    enterTypeParamDecl?: (ctx: TypeParamDeclContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.typeParamDecl`.
     * @param ctx the parse tree
     */
    exitTypeParamDecl?: (ctx: TypeParamDeclContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.typeParamConstraint`.
     * @param ctx the parse tree
     */
    enterTypeParamConstraint?: (ctx: TypeParamConstraintContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.typeParamConstraint`.
     * @param ctx the parse tree
     */
    exitTypeParamConstraint?: (ctx: TypeParamConstraintContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.typeParamDefault`.
     * @param ctx the parse tree
     */
    enterTypeParamDefault?: (ctx: TypeParamDefaultContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.typeParamDefault`.
     * @param ctx the parse tree
     */
    exitTypeParamDefault?: (ctx: TypeParamDefaultContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.assign`.
     * @param ctx the parse tree
     */
    enterAssign?: (ctx: AssignContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.assign`.
     * @param ctx the parse tree
     */
    exitAssign?: (ctx: AssignContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.switchForm`.
     * @param ctx the parse tree
     */
    enterSwitchForm?: (ctx: SwitchFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.switchForm`.
     * @param ctx the parse tree
     */
    exitSwitchForm?: (ctx: SwitchFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.caseClause`.
     * @param ctx the parse tree
     */
    enterCaseClause?: (ctx: CaseClauseContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.caseClause`.
     * @param ctx the parse tree
     */
    exitCaseClause?: (ctx: CaseClauseContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.defaultClause`.
     * @param ctx the parse tree
     */
    enterDefaultClause?: (ctx: DefaultClauseContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.defaultClause`.
     * @param ctx the parse tree
     */
    exitDefaultClause?: (ctx: DefaultClauseContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.forForm`.
     * @param ctx the parse tree
     */
    enterForForm?: (ctx: ForFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.forForm`.
     * @param ctx the parse tree
     */
    exitForForm?: (ctx: ForFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.forInForm`.
     * @param ctx the parse tree
     */
    enterForInForm?: (ctx: ForInFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.forInForm`.
     * @param ctx the parse tree
     */
    exitForInForm?: (ctx: ForInFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.forOfForm`.
     * @param ctx the parse tree
     */
    enterForOfForm?: (ctx: ForOfFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.forOfForm`.
     * @param ctx the parse tree
     */
    exitForOfForm?: (ctx: ForOfFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.expression`.
     * @param ctx the parse tree
     */
    enterExpression?: (ctx: ExpressionContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.expression`.
     * @param ctx the parse tree
     */
    exitExpression?: (ctx: ExpressionContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.thisExpr`.
     * @param ctx the parse tree
     */
    enterThisExpr?: (ctx: ThisExprContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.thisExpr`.
     * @param ctx the parse tree
     */
    exitThisExpr?: (ctx: ThisExprContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.superExpr`.
     * @param ctx the parse tree
     */
    enterSuperExpr?: (ctx: SuperExprContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.superExpr`.
     * @param ctx the parse tree
     */
    exitSuperExpr?: (ctx: SuperExprContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.superConstructorCall`.
     * @param ctx the parse tree
     */
    enterSuperConstructorCall?: (ctx: SuperConstructorCallContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.superConstructorCall`.
     * @param ctx the parse tree
     */
    exitSuperConstructorCall?: (ctx: SuperConstructorCallContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.superMethodCall`.
     * @param ctx the parse tree
     */
    enterSuperMethodCall?: (ctx: SuperMethodCallContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.superMethodCall`.
     * @param ctx the parse tree
     */
    exitSuperMethodCall?: (ctx: SuperMethodCallContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.typeofExpr`.
     * @param ctx the parse tree
     */
    enterTypeofExpr?: (ctx: TypeofExprContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.typeofExpr`.
     * @param ctx the parse tree
     */
    exitTypeofExpr?: (ctx: TypeofExprContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.typeAssert`.
     * @param ctx the parse tree
     */
    enterTypeAssert?: (ctx: TypeAssertContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.typeAssert`.
     * @param ctx the parse tree
     */
    exitTypeAssert?: (ctx: TypeAssertContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.lambda`.
     * @param ctx the parse tree
     */
    enterLambda?: (ctx: LambdaContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.lambda`.
     * @param ctx the parse tree
     */
    exitLambda?: (ctx: LambdaContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.fn`.
     * @param ctx the parse tree
     */
    enterFn?: (ctx: FnContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.fn`.
     * @param ctx the parse tree
     */
    exitFn?: (ctx: FnContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.bindExpr`.
     * @param ctx the parse tree
     */
    enterBindExpr?: (ctx: BindExprContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.bindExpr`.
     * @param ctx the parse tree
     */
    exitBindExpr?: (ctx: BindExprContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.methodCallExpr`.
     * @param ctx the parse tree
     */
    enterMethodCallExpr?: (ctx: MethodCallExprContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.methodCallExpr`.
     * @param ctx the parse tree
     */
    exitMethodCallExpr?: (ctx: MethodCallExprContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.ternary`.
     * @param ctx the parse tree
     */
    enterTernary?: (ctx: TernaryContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.ternary`.
     * @param ctx the parse tree
     */
    exitTernary?: (ctx: TernaryContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.condExpr`.
     * @param ctx the parse tree
     */
    enterCondExpr?: (ctx: CondExprContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.condExpr`.
     * @param ctx the parse tree
     */
    exitCondExpr?: (ctx: CondExprContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.newForm`.
     * @param ctx the parse tree
     */
    enterNewForm?: (ctx: NewFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.newForm`.
     * @param ctx the parse tree
     */
    exitNewForm?: (ctx: NewFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.objectExpr`.
     * @param ctx the parse tree
     */
    enterObjectExpr?: (ctx: ObjectExprContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.objectExpr`.
     * @param ctx the parse tree
     */
    exitObjectExpr?: (ctx: ObjectExprContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.objectField`.
     * @param ctx the parse tree
     */
    enterObjectField?: (ctx: ObjectFieldContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.objectField`.
     * @param ctx the parse tree
     */
    exitObjectField?: (ctx: ObjectFieldContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.methodDef`.
     * @param ctx the parse tree
     */
    enterMethodDef?: (ctx: MethodDefContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.methodDef`.
     * @param ctx the parse tree
     */
    exitMethodDef?: (ctx: MethodDefContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.arrayExpr`.
     * @param ctx the parse tree
     */
    enterArrayExpr?: (ctx: ArrayExprContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.arrayExpr`.
     * @param ctx the parse tree
     */
    exitArrayExpr?: (ctx: ArrayExprContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.propKey`.
     * @param ctx the parse tree
     */
    enterPropKey?: (ctx: PropKeyContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.propKey`.
     * @param ctx the parse tree
     */
    exitPropKey?: (ctx: PropKeyContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.propAccess`.
     * @param ctx the parse tree
     */
    enterPropAccess?: (ctx: PropAccessContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.propAccess`.
     * @param ctx the parse tree
     */
    exitPropAccess?: (ctx: PropAccessContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.indexAccess`.
     * @param ctx the parse tree
     */
    enterIndexAccess?: (ctx: IndexAccessContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.indexAccess`.
     * @param ctx the parse tree
     */
    exitIndexAccess?: (ctx: IndexAccessContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.quasiquote`.
     * @param ctx the parse tree
     */
    enterQuasiquote?: (ctx: QuasiquoteContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.quasiquote`.
     * @param ctx the parse tree
     */
    exitQuasiquote?: (ctx: QuasiquoteContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.unquote`.
     * @param ctx the parse tree
     */
    enterUnquote?: (ctx: UnquoteContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.unquote`.
     * @param ctx the parse tree
     */
    exitUnquote?: (ctx: UnquoteContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.unquoteSplicing`.
     * @param ctx the parse tree
     */
    enterUnquoteSplicing?: (ctx: UnquoteSplicingContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.unquoteSplicing`.
     * @param ctx the parse tree
     */
    exitUnquoteSplicing?: (ctx: UnquoteSplicingContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.optChain`.
     * @param ctx the parse tree
     */
    enterOptChain?: (ctx: OptChainContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.optChain`.
     * @param ctx the parse tree
     */
    exitOptChain?: (ctx: OptChainContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.nullCoalesce`.
     * @param ctx the parse tree
     */
    enterNullCoalesce?: (ctx: NullCoalesceContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.nullCoalesce`.
     * @param ctx the parse tree
     */
    exitNullCoalesce?: (ctx: NullCoalesceContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.call`.
     * @param ctx the parse tree
     */
    enterCall?: (ctx: CallContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.call`.
     * @param ctx the parse tree
     */
    exitCall?: (ctx: CallContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.typeArgs`.
     * @param ctx the parse tree
     */
    enterTypeArgs?: (ctx: TypeArgsContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.typeArgs`.
     * @param ctx the parse tree
     */
    exitTypeArgs?: (ctx: TypeArgsContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.fnSignature`.
     * @param ctx the parse tree
     */
    enterFnSignature?: (ctx: FnSignatureContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.fnSignature`.
     * @param ctx the parse tree
     */
    exitFnSignature?: (ctx: FnSignatureContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.param`.
     * @param ctx the parse tree
     */
    enterParam?: (ctx: ParamContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.param`.
     * @param ctx the parse tree
     */
    exitParam?: (ctx: ParamContext) => void;
    /**
     * Enter a parse tree produced by `Stage3EParser.literal`.
     * @param ctx the parse tree
     */
    enterLiteral?: (ctx: LiteralContext) => void;
    /**
     * Exit a parse tree produced by `Stage3EParser.literal`.
     * @param ctx the parse tree
     */
    exitLiteral?: (ctx: LiteralContext) => void;

    visitTerminal(node: TerminalNode): void {}
    visitErrorNode(node: ErrorNode): void {}
    enterEveryRule(node: ParserRuleContext): void {}
    exitEveryRule(node: ParserRuleContext): void {}
}

