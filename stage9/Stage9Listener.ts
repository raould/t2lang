
import { ErrorNode, ParseTreeListener, ParserRuleContext, TerminalNode } from "antlr4ng";


import { ProgramContext } from "./Stage9Parser.js";
import { TopLevelContext } from "./Stage9Parser.js";
import { DeclContext } from "./Stage9Parser.js";
import { DefmacroContext } from "./Stage9Parser.js";
import { MacroSignatureContext } from "./Stage9Parser.js";
import { MacroTimeFnDefContext } from "./Stage9Parser.js";
import { MacroImportContext } from "./Stage9Parser.js";
import { MacroExportContext } from "./Stage9Parser.js";
import { MacroExportSpecContext } from "./Stage9Parser.js";
import { MacroReexportContext } from "./Stage9Parser.js";
import { TopLevelLetContext } from "./Stage9Parser.js";
import { TopLevelVarContext } from "./Stage9Parser.js";
import { TopLevelConstContext } from "./Stage9Parser.js";
import { MetaAnnotationContext } from "./Stage9Parser.js";
import { TypeAliasContext } from "./Stage9Parser.js";
import { InterfaceDefContext } from "./Stage9Parser.js";
import { InterfaceExtendsContext } from "./Stage9Parser.js";
import { EnumDefContext } from "./Stage9Parser.js";
import { EnumMemberContext } from "./Stage9Parser.js";
import { MixinFormContext } from "./Stage9Parser.js";
import { MixinFilterContext } from "./Stage9Parser.js";
import { ClassDefContext } from "./Stage9Parser.js";
import { AnonClassDefContext } from "./Stage9Parser.js";
import { ClassExtendsContext } from "./Stage9Parser.js";
import { ClassImplementsContext } from "./Stage9Parser.js";
import { ClassBodyContext } from "./Stage9Parser.js";
import { ClassElementContext } from "./Stage9Parser.js";
import { ModifierContext } from "./Stage9Parser.js";
import { FieldDefContext } from "./Stage9Parser.js";
import { ConstructorParamContext } from "./Stage9Parser.js";
import { ConstructorSignatureContext } from "./Stage9Parser.js";
import { ConstructorDefContext } from "./Stage9Parser.js";
import { ClassMethodDefContext } from "./Stage9Parser.js";
import { AbstractMethodDefContext } from "./Stage9Parser.js";
import { GetterDefContext } from "./Stage9Parser.js";
import { SetterDefContext } from "./Stage9Parser.js";
import { MethodKeyContext } from "./Stage9Parser.js";
import { StatementContext } from "./Stage9Parser.js";
import { LetStmtContext } from "./Stage9Parser.js";
import { VarStmtContext } from "./Stage9Parser.js";
import { ConstStarContext } from "./Stage9Parser.js";
import { ConstStmtContext } from "./Stage9Parser.js";
import { IfFormContext } from "./Stage9Parser.js";
import { ThenBlockContext } from "./Stage9Parser.js";
import { ElseBlockContext } from "./Stage9Parser.js";
import { WhileFormContext } from "./Stage9Parser.js";
import { ReturnFormContext } from "./Stage9Parser.js";
import { ThrowFormContext } from "./Stage9Parser.js";
import { BreakFormContext } from "./Stage9Parser.js";
import { ContinueFormContext } from "./Stage9Parser.js";
import { ImportFormContext } from "./Stage9Parser.js";
import { ImportTypeFormContext } from "./Stage9Parser.js";
import { ImportTypeSpecContext } from "./Stage9Parser.js";
import { ImportTypeNameContext } from "./Stage9Parser.js";
import { ExportFormContext } from "./Stage9Parser.js";
import { ExportBindingContext } from "./Stage9Parser.js";
import { ExportDefaultContext } from "./Stage9Parser.js";
import { ExportNamedContext } from "./Stage9Parser.js";
import { ExportNamePairContext } from "./Stage9Parser.js";
import { ExportFromContext } from "./Stage9Parser.js";
import { ExportAllFromContext } from "./Stage9Parser.js";
import { ExportNsFromFormContext } from "./Stage9Parser.js";
import { ExportTypeFormContext } from "./Stage9Parser.js";
import { ExportTypeFromFormContext } from "./Stage9Parser.js";
import { ExportTypeAllFromFormContext } from "./Stage9Parser.js";
import { ExportDeclFormContext } from "./Stage9Parser.js";
import { StarBindingContext } from "./Stage9Parser.js";
import { SingleBindingContext } from "./Stage9Parser.js";
import { ObjectDestructPatContext } from "./Stage9Parser.js";
import { ArrayDestructPatContext } from "./Stage9Parser.js";
import { TypeExprContext } from "./Stage9Parser.js";
import { TypeUnionContext } from "./Stage9Parser.js";
import { TypeIntersectionContext } from "./Stage9Parser.js";
import { TypeArrayContext } from "./Stage9Parser.js";
import { TypeTupleContext } from "./Stage9Parser.js";
import { TypeTupleElementContext } from "./Stage9Parser.js";
import { TypeFunctionContext } from "./Stage9Parser.js";
import { TypeFnParamContext } from "./Stage9Parser.js";
import { TypeObjectContext } from "./Stage9Parser.js";
import { TypePropContext } from "./Stage9Parser.js";
import { PropModifierContext } from "./Stage9Parser.js";
import { TypeLiteralContext } from "./Stage9Parser.js";
import { TypeKeyofContext } from "./Stage9Parser.js";
import { TypeTypeofContext } from "./Stage9Parser.js";
import { TypeIndexAccessContext } from "./Stage9Parser.js";
import { TypeConditionalContext } from "./Stage9Parser.js";
import { TypeInferContext } from "./Stage9Parser.js";
import { TypeMappedContext } from "./Stage9Parser.js";
import { MappedModifiersContext } from "./Stage9Parser.js";
import { MappedModifierContext } from "./Stage9Parser.js";
import { TypeTemplateLiteralContext } from "./Stage9Parser.js";
import { TemplatePartContext } from "./Stage9Parser.js";
import { TypeApplicationContext } from "./Stage9Parser.js";
import { TypeParamsContext } from "./Stage9Parser.js";
import { TypeParamDeclContext } from "./Stage9Parser.js";
import { TypeParamConstraintContext } from "./Stage9Parser.js";
import { TypeParamDefaultContext } from "./Stage9Parser.js";
import { AssignContext } from "./Stage9Parser.js";
import { CompoundAssignContext } from "./Stage9Parser.js";
import { SubscriptAssignContext } from "./Stage9Parser.js";
import { SwitchFormContext } from "./Stage9Parser.js";
import { CaseClauseContext } from "./Stage9Parser.js";
import { DefaultClauseContext } from "./Stage9Parser.js";
import { ForFormContext } from "./Stage9Parser.js";
import { ForInFormContext } from "./Stage9Parser.js";
import { ForOfFormContext } from "./Stage9Parser.js";
import { ForAwaitFormContext } from "./Stage9Parser.js";
import { ExceptFormContext } from "./Stage9Parser.js";
import { TryClauseContext } from "./Stage9Parser.js";
import { CatchClauseContext } from "./Stage9Parser.js";
import { FinallyClauseContext } from "./Stage9Parser.js";
import { ExpressionContext } from "./Stage9Parser.js";
import { ThisExprContext } from "./Stage9Parser.js";
import { SuperExprContext } from "./Stage9Parser.js";
import { SuperConstructorCallContext } from "./Stage9Parser.js";
import { SuperMethodCallContext } from "./Stage9Parser.js";
import { TypeofExprContext } from "./Stage9Parser.js";
import { TypeAssertContext } from "./Stage9Parser.js";
import { LambdaContext } from "./Stage9Parser.js";
import { FnContext } from "./Stage9Parser.js";
import { AsyncLambdaContext } from "./Stage9Parser.js";
import { AsyncFnContext } from "./Stage9Parser.js";
import { GeneratorFnContext } from "./Stage9Parser.js";
import { AsyncGeneratorFnContext } from "./Stage9Parser.js";
import { IifeFormContext } from "./Stage9Parser.js";
import { IifeAsyncFormContext } from "./Stage9Parser.js";
import { FnOContext } from "./Stage9Parser.js";
import { LambdaOContext } from "./Stage9Parser.js";
import { AsyncFnOContext } from "./Stage9Parser.js";
import { AsyncLambdaOContext } from "./Stage9Parser.js";
import { GeneratorFnOContext } from "./Stage9Parser.js";
import { AsyncGeneratorFnOContext } from "./Stage9Parser.js";
import { MethodOContext } from "./Stage9Parser.js";
import { AbstractMethodOContext } from "./Stage9Parser.js";
import { ConstructorOContext } from "./Stage9Parser.js";
import { FnoSignatureContext } from "./Stage9Parser.js";
import { FnoParamContext } from "./Stage9Parser.js";
import { FnoRestParamContext } from "./Stage9Parser.js";
import { AwaitExprContext } from "./Stage9Parser.js";
import { YieldExprContext } from "./Stage9Parser.js";
import { YieldStarExprContext } from "./Stage9Parser.js";
import { BindExprContext } from "./Stage9Parser.js";
import { MethodCallExprContext } from "./Stage9Parser.js";
import { TernaryContext } from "./Stage9Parser.js";
import { CondExprContext } from "./Stage9Parser.js";
import { CondClauseContext } from "./Stage9Parser.js";
import { CondElseClauseContext } from "./Stage9Parser.js";
import { NewFormContext } from "./Stage9Parser.js";
import { ObjectExprContext } from "./Stage9Parser.js";
import { ObjectFieldContext } from "./Stage9Parser.js";
import { MethodDefContext } from "./Stage9Parser.js";
import { ArrayExprContext } from "./Stage9Parser.js";
import { BracketArrayExprContext } from "./Stage9Parser.js";
import { BraceObjectExprContext } from "./Stage9Parser.js";
import { BraceObjectFieldContext } from "./Stage9Parser.js";
import { TemplateExprContext } from "./Stage9Parser.js";
import { PropKeyContext } from "./Stage9Parser.js";
import { OpSymbolContext } from "./Stage9Parser.js";
import { PropAccessContext } from "./Stage9Parser.js";
import { SubscriptAccessContext } from "./Stage9Parser.js";
import { IndexAccessContext } from "./Stage9Parser.js";
import { QuasiquoteContext } from "./Stage9Parser.js";
import { QuasiFormContext } from "./Stage9Parser.js";
import { SFormContext } from "./Stage9Parser.js";
import { UnquoteContext } from "./Stage9Parser.js";
import { UnquoteSplicingContext } from "./Stage9Parser.js";
import { TildeUnquoteContext } from "./Stage9Parser.js";
import { TildeUnquoteSpliceContext } from "./Stage9Parser.js";
import { OptChainContext } from "./Stage9Parser.js";
import { OptChainIndexContext } from "./Stage9Parser.js";
import { NullCoalesceContext } from "./Stage9Parser.js";
import { InfixExprContext } from "./Stage9Parser.js";
import { InfixBodyContext } from "./Stage9Parser.js";
import { InfixAtomContext } from "./Stage9Parser.js";
import { InfixArgsContext } from "./Stage9Parser.js";
import { InfixUnaryOpContext } from "./Stage9Parser.js";
import { InfixBinOpContext } from "./Stage9Parser.js";
import { MacroExprCallContext } from "./Stage9Parser.js";
import { MacroBodyCallContext } from "./Stage9Parser.js";
import { CallContext } from "./Stage9Parser.js";
import { TypeArgsContext } from "./Stage9Parser.js";
import { FnSignatureContext } from "./Stage9Parser.js";
import { ParamContext } from "./Stage9Parser.js";
import { RestParamContext } from "./Stage9Parser.js";
import { LiteralContext } from "./Stage9Parser.js";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `Stage9Parser`.
 */
export class Stage9Listener implements ParseTreeListener {
    /**
     * Enter a parse tree produced by `Stage9Parser.program`.
     * @param ctx the parse tree
     */
    enterProgram?: (ctx: ProgramContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.program`.
     * @param ctx the parse tree
     */
    exitProgram?: (ctx: ProgramContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.topLevel`.
     * @param ctx the parse tree
     */
    enterTopLevel?: (ctx: TopLevelContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.topLevel`.
     * @param ctx the parse tree
     */
    exitTopLevel?: (ctx: TopLevelContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.decl`.
     * @param ctx the parse tree
     */
    enterDecl?: (ctx: DeclContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.decl`.
     * @param ctx the parse tree
     */
    exitDecl?: (ctx: DeclContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.defmacro`.
     * @param ctx the parse tree
     */
    enterDefmacro?: (ctx: DefmacroContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.defmacro`.
     * @param ctx the parse tree
     */
    exitDefmacro?: (ctx: DefmacroContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.macroSignature`.
     * @param ctx the parse tree
     */
    enterMacroSignature?: (ctx: MacroSignatureContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.macroSignature`.
     * @param ctx the parse tree
     */
    exitMacroSignature?: (ctx: MacroSignatureContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.macroTimeFnDef`.
     * @param ctx the parse tree
     */
    enterMacroTimeFnDef?: (ctx: MacroTimeFnDefContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.macroTimeFnDef`.
     * @param ctx the parse tree
     */
    exitMacroTimeFnDef?: (ctx: MacroTimeFnDefContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.macroImport`.
     * @param ctx the parse tree
     */
    enterMacroImport?: (ctx: MacroImportContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.macroImport`.
     * @param ctx the parse tree
     */
    exitMacroImport?: (ctx: MacroImportContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.macroExport`.
     * @param ctx the parse tree
     */
    enterMacroExport?: (ctx: MacroExportContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.macroExport`.
     * @param ctx the parse tree
     */
    exitMacroExport?: (ctx: MacroExportContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.macroExportSpec`.
     * @param ctx the parse tree
     */
    enterMacroExportSpec?: (ctx: MacroExportSpecContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.macroExportSpec`.
     * @param ctx the parse tree
     */
    exitMacroExportSpec?: (ctx: MacroExportSpecContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.macroReexport`.
     * @param ctx the parse tree
     */
    enterMacroReexport?: (ctx: MacroReexportContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.macroReexport`.
     * @param ctx the parse tree
     */
    exitMacroReexport?: (ctx: MacroReexportContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.topLevelLet`.
     * @param ctx the parse tree
     */
    enterTopLevelLet?: (ctx: TopLevelLetContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.topLevelLet`.
     * @param ctx the parse tree
     */
    exitTopLevelLet?: (ctx: TopLevelLetContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.topLevelVar`.
     * @param ctx the parse tree
     */
    enterTopLevelVar?: (ctx: TopLevelVarContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.topLevelVar`.
     * @param ctx the parse tree
     */
    exitTopLevelVar?: (ctx: TopLevelVarContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.topLevelConst`.
     * @param ctx the parse tree
     */
    enterTopLevelConst?: (ctx: TopLevelConstContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.topLevelConst`.
     * @param ctx the parse tree
     */
    exitTopLevelConst?: (ctx: TopLevelConstContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.metaAnnotation`.
     * @param ctx the parse tree
     */
    enterMetaAnnotation?: (ctx: MetaAnnotationContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.metaAnnotation`.
     * @param ctx the parse tree
     */
    exitMetaAnnotation?: (ctx: MetaAnnotationContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.typeAlias`.
     * @param ctx the parse tree
     */
    enterTypeAlias?: (ctx: TypeAliasContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.typeAlias`.
     * @param ctx the parse tree
     */
    exitTypeAlias?: (ctx: TypeAliasContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.interfaceDef`.
     * @param ctx the parse tree
     */
    enterInterfaceDef?: (ctx: InterfaceDefContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.interfaceDef`.
     * @param ctx the parse tree
     */
    exitInterfaceDef?: (ctx: InterfaceDefContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.interfaceExtends`.
     * @param ctx the parse tree
     */
    enterInterfaceExtends?: (ctx: InterfaceExtendsContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.interfaceExtends`.
     * @param ctx the parse tree
     */
    exitInterfaceExtends?: (ctx: InterfaceExtendsContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.enumDef`.
     * @param ctx the parse tree
     */
    enterEnumDef?: (ctx: EnumDefContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.enumDef`.
     * @param ctx the parse tree
     */
    exitEnumDef?: (ctx: EnumDefContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.enumMember`.
     * @param ctx the parse tree
     */
    enterEnumMember?: (ctx: EnumMemberContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.enumMember`.
     * @param ctx the parse tree
     */
    exitEnumMember?: (ctx: EnumMemberContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.mixinForm`.
     * @param ctx the parse tree
     */
    enterMixinForm?: (ctx: MixinFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.mixinForm`.
     * @param ctx the parse tree
     */
    exitMixinForm?: (ctx: MixinFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.mixinFilter`.
     * @param ctx the parse tree
     */
    enterMixinFilter?: (ctx: MixinFilterContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.mixinFilter`.
     * @param ctx the parse tree
     */
    exitMixinFilter?: (ctx: MixinFilterContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.classDef`.
     * @param ctx the parse tree
     */
    enterClassDef?: (ctx: ClassDefContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.classDef`.
     * @param ctx the parse tree
     */
    exitClassDef?: (ctx: ClassDefContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.anonClassDef`.
     * @param ctx the parse tree
     */
    enterAnonClassDef?: (ctx: AnonClassDefContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.anonClassDef`.
     * @param ctx the parse tree
     */
    exitAnonClassDef?: (ctx: AnonClassDefContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.classExtends`.
     * @param ctx the parse tree
     */
    enterClassExtends?: (ctx: ClassExtendsContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.classExtends`.
     * @param ctx the parse tree
     */
    exitClassExtends?: (ctx: ClassExtendsContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.classImplements`.
     * @param ctx the parse tree
     */
    enterClassImplements?: (ctx: ClassImplementsContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.classImplements`.
     * @param ctx the parse tree
     */
    exitClassImplements?: (ctx: ClassImplementsContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.classBody`.
     * @param ctx the parse tree
     */
    enterClassBody?: (ctx: ClassBodyContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.classBody`.
     * @param ctx the parse tree
     */
    exitClassBody?: (ctx: ClassBodyContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.classElement`.
     * @param ctx the parse tree
     */
    enterClassElement?: (ctx: ClassElementContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.classElement`.
     * @param ctx the parse tree
     */
    exitClassElement?: (ctx: ClassElementContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.modifier`.
     * @param ctx the parse tree
     */
    enterModifier?: (ctx: ModifierContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.modifier`.
     * @param ctx the parse tree
     */
    exitModifier?: (ctx: ModifierContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.fieldDef`.
     * @param ctx the parse tree
     */
    enterFieldDef?: (ctx: FieldDefContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.fieldDef`.
     * @param ctx the parse tree
     */
    exitFieldDef?: (ctx: FieldDefContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.constructorParam`.
     * @param ctx the parse tree
     */
    enterConstructorParam?: (ctx: ConstructorParamContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.constructorParam`.
     * @param ctx the parse tree
     */
    exitConstructorParam?: (ctx: ConstructorParamContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.constructorSignature`.
     * @param ctx the parse tree
     */
    enterConstructorSignature?: (ctx: ConstructorSignatureContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.constructorSignature`.
     * @param ctx the parse tree
     */
    exitConstructorSignature?: (ctx: ConstructorSignatureContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.constructorDef`.
     * @param ctx the parse tree
     */
    enterConstructorDef?: (ctx: ConstructorDefContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.constructorDef`.
     * @param ctx the parse tree
     */
    exitConstructorDef?: (ctx: ConstructorDefContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.classMethodDef`.
     * @param ctx the parse tree
     */
    enterClassMethodDef?: (ctx: ClassMethodDefContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.classMethodDef`.
     * @param ctx the parse tree
     */
    exitClassMethodDef?: (ctx: ClassMethodDefContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.abstractMethodDef`.
     * @param ctx the parse tree
     */
    enterAbstractMethodDef?: (ctx: AbstractMethodDefContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.abstractMethodDef`.
     * @param ctx the parse tree
     */
    exitAbstractMethodDef?: (ctx: AbstractMethodDefContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.getterDef`.
     * @param ctx the parse tree
     */
    enterGetterDef?: (ctx: GetterDefContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.getterDef`.
     * @param ctx the parse tree
     */
    exitGetterDef?: (ctx: GetterDefContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.setterDef`.
     * @param ctx the parse tree
     */
    enterSetterDef?: (ctx: SetterDefContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.setterDef`.
     * @param ctx the parse tree
     */
    exitSetterDef?: (ctx: SetterDefContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.methodKey`.
     * @param ctx the parse tree
     */
    enterMethodKey?: (ctx: MethodKeyContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.methodKey`.
     * @param ctx the parse tree
     */
    exitMethodKey?: (ctx: MethodKeyContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.statement`.
     * @param ctx the parse tree
     */
    enterStatement?: (ctx: StatementContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.statement`.
     * @param ctx the parse tree
     */
    exitStatement?: (ctx: StatementContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.letStmt`.
     * @param ctx the parse tree
     */
    enterLetStmt?: (ctx: LetStmtContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.letStmt`.
     * @param ctx the parse tree
     */
    exitLetStmt?: (ctx: LetStmtContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.varStmt`.
     * @param ctx the parse tree
     */
    enterVarStmt?: (ctx: VarStmtContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.varStmt`.
     * @param ctx the parse tree
     */
    exitVarStmt?: (ctx: VarStmtContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.constStar`.
     * @param ctx the parse tree
     */
    enterConstStar?: (ctx: ConstStarContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.constStar`.
     * @param ctx the parse tree
     */
    exitConstStar?: (ctx: ConstStarContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.constStmt`.
     * @param ctx the parse tree
     */
    enterConstStmt?: (ctx: ConstStmtContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.constStmt`.
     * @param ctx the parse tree
     */
    exitConstStmt?: (ctx: ConstStmtContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.ifForm`.
     * @param ctx the parse tree
     */
    enterIfForm?: (ctx: IfFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.ifForm`.
     * @param ctx the parse tree
     */
    exitIfForm?: (ctx: IfFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.thenBlock`.
     * @param ctx the parse tree
     */
    enterThenBlock?: (ctx: ThenBlockContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.thenBlock`.
     * @param ctx the parse tree
     */
    exitThenBlock?: (ctx: ThenBlockContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.elseBlock`.
     * @param ctx the parse tree
     */
    enterElseBlock?: (ctx: ElseBlockContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.elseBlock`.
     * @param ctx the parse tree
     */
    exitElseBlock?: (ctx: ElseBlockContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.whileForm`.
     * @param ctx the parse tree
     */
    enterWhileForm?: (ctx: WhileFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.whileForm`.
     * @param ctx the parse tree
     */
    exitWhileForm?: (ctx: WhileFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.returnForm`.
     * @param ctx the parse tree
     */
    enterReturnForm?: (ctx: ReturnFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.returnForm`.
     * @param ctx the parse tree
     */
    exitReturnForm?: (ctx: ReturnFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.throwForm`.
     * @param ctx the parse tree
     */
    enterThrowForm?: (ctx: ThrowFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.throwForm`.
     * @param ctx the parse tree
     */
    exitThrowForm?: (ctx: ThrowFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.breakForm`.
     * @param ctx the parse tree
     */
    enterBreakForm?: (ctx: BreakFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.breakForm`.
     * @param ctx the parse tree
     */
    exitBreakForm?: (ctx: BreakFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.continueForm`.
     * @param ctx the parse tree
     */
    enterContinueForm?: (ctx: ContinueFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.continueForm`.
     * @param ctx the parse tree
     */
    exitContinueForm?: (ctx: ContinueFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.importForm`.
     * @param ctx the parse tree
     */
    enterImportForm?: (ctx: ImportFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.importForm`.
     * @param ctx the parse tree
     */
    exitImportForm?: (ctx: ImportFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.importTypeForm`.
     * @param ctx the parse tree
     */
    enterImportTypeForm?: (ctx: ImportTypeFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.importTypeForm`.
     * @param ctx the parse tree
     */
    exitImportTypeForm?: (ctx: ImportTypeFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.importTypeSpec`.
     * @param ctx the parse tree
     */
    enterImportTypeSpec?: (ctx: ImportTypeSpecContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.importTypeSpec`.
     * @param ctx the parse tree
     */
    exitImportTypeSpec?: (ctx: ImportTypeSpecContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.importTypeName`.
     * @param ctx the parse tree
     */
    enterImportTypeName?: (ctx: ImportTypeNameContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.importTypeName`.
     * @param ctx the parse tree
     */
    exitImportTypeName?: (ctx: ImportTypeNameContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.exportForm`.
     * @param ctx the parse tree
     */
    enterExportForm?: (ctx: ExportFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.exportForm`.
     * @param ctx the parse tree
     */
    exitExportForm?: (ctx: ExportFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.exportBinding`.
     * @param ctx the parse tree
     */
    enterExportBinding?: (ctx: ExportBindingContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.exportBinding`.
     * @param ctx the parse tree
     */
    exitExportBinding?: (ctx: ExportBindingContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.exportDefault`.
     * @param ctx the parse tree
     */
    enterExportDefault?: (ctx: ExportDefaultContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.exportDefault`.
     * @param ctx the parse tree
     */
    exitExportDefault?: (ctx: ExportDefaultContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.exportNamed`.
     * @param ctx the parse tree
     */
    enterExportNamed?: (ctx: ExportNamedContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.exportNamed`.
     * @param ctx the parse tree
     */
    exitExportNamed?: (ctx: ExportNamedContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.exportNamePair`.
     * @param ctx the parse tree
     */
    enterExportNamePair?: (ctx: ExportNamePairContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.exportNamePair`.
     * @param ctx the parse tree
     */
    exitExportNamePair?: (ctx: ExportNamePairContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.exportFrom`.
     * @param ctx the parse tree
     */
    enterExportFrom?: (ctx: ExportFromContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.exportFrom`.
     * @param ctx the parse tree
     */
    exitExportFrom?: (ctx: ExportFromContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.exportAllFrom`.
     * @param ctx the parse tree
     */
    enterExportAllFrom?: (ctx: ExportAllFromContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.exportAllFrom`.
     * @param ctx the parse tree
     */
    exitExportAllFrom?: (ctx: ExportAllFromContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.exportNsFromForm`.
     * @param ctx the parse tree
     */
    enterExportNsFromForm?: (ctx: ExportNsFromFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.exportNsFromForm`.
     * @param ctx the parse tree
     */
    exitExportNsFromForm?: (ctx: ExportNsFromFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.exportTypeForm`.
     * @param ctx the parse tree
     */
    enterExportTypeForm?: (ctx: ExportTypeFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.exportTypeForm`.
     * @param ctx the parse tree
     */
    exitExportTypeForm?: (ctx: ExportTypeFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.exportTypeFromForm`.
     * @param ctx the parse tree
     */
    enterExportTypeFromForm?: (ctx: ExportTypeFromFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.exportTypeFromForm`.
     * @param ctx the parse tree
     */
    exitExportTypeFromForm?: (ctx: ExportTypeFromFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.exportTypeAllFromForm`.
     * @param ctx the parse tree
     */
    enterExportTypeAllFromForm?: (ctx: ExportTypeAllFromFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.exportTypeAllFromForm`.
     * @param ctx the parse tree
     */
    exitExportTypeAllFromForm?: (ctx: ExportTypeAllFromFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.exportDeclForm`.
     * @param ctx the parse tree
     */
    enterExportDeclForm?: (ctx: ExportDeclFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.exportDeclForm`.
     * @param ctx the parse tree
     */
    exitExportDeclForm?: (ctx: ExportDeclFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.starBinding`.
     * @param ctx the parse tree
     */
    enterStarBinding?: (ctx: StarBindingContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.starBinding`.
     * @param ctx the parse tree
     */
    exitStarBinding?: (ctx: StarBindingContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.singleBinding`.
     * @param ctx the parse tree
     */
    enterSingleBinding?: (ctx: SingleBindingContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.singleBinding`.
     * @param ctx the parse tree
     */
    exitSingleBinding?: (ctx: SingleBindingContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.objectDestructPat`.
     * @param ctx the parse tree
     */
    enterObjectDestructPat?: (ctx: ObjectDestructPatContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.objectDestructPat`.
     * @param ctx the parse tree
     */
    exitObjectDestructPat?: (ctx: ObjectDestructPatContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.arrayDestructPat`.
     * @param ctx the parse tree
     */
    enterArrayDestructPat?: (ctx: ArrayDestructPatContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.arrayDestructPat`.
     * @param ctx the parse tree
     */
    exitArrayDestructPat?: (ctx: ArrayDestructPatContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.typeExpr`.
     * @param ctx the parse tree
     */
    enterTypeExpr?: (ctx: TypeExprContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.typeExpr`.
     * @param ctx the parse tree
     */
    exitTypeExpr?: (ctx: TypeExprContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.typeUnion`.
     * @param ctx the parse tree
     */
    enterTypeUnion?: (ctx: TypeUnionContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.typeUnion`.
     * @param ctx the parse tree
     */
    exitTypeUnion?: (ctx: TypeUnionContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.typeIntersection`.
     * @param ctx the parse tree
     */
    enterTypeIntersection?: (ctx: TypeIntersectionContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.typeIntersection`.
     * @param ctx the parse tree
     */
    exitTypeIntersection?: (ctx: TypeIntersectionContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.typeArray`.
     * @param ctx the parse tree
     */
    enterTypeArray?: (ctx: TypeArrayContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.typeArray`.
     * @param ctx the parse tree
     */
    exitTypeArray?: (ctx: TypeArrayContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.typeTuple`.
     * @param ctx the parse tree
     */
    enterTypeTuple?: (ctx: TypeTupleContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.typeTuple`.
     * @param ctx the parse tree
     */
    exitTypeTuple?: (ctx: TypeTupleContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.typeTupleElement`.
     * @param ctx the parse tree
     */
    enterTypeTupleElement?: (ctx: TypeTupleElementContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.typeTupleElement`.
     * @param ctx the parse tree
     */
    exitTypeTupleElement?: (ctx: TypeTupleElementContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.typeFunction`.
     * @param ctx the parse tree
     */
    enterTypeFunction?: (ctx: TypeFunctionContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.typeFunction`.
     * @param ctx the parse tree
     */
    exitTypeFunction?: (ctx: TypeFunctionContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.typeFnParam`.
     * @param ctx the parse tree
     */
    enterTypeFnParam?: (ctx: TypeFnParamContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.typeFnParam`.
     * @param ctx the parse tree
     */
    exitTypeFnParam?: (ctx: TypeFnParamContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.typeObject`.
     * @param ctx the parse tree
     */
    enterTypeObject?: (ctx: TypeObjectContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.typeObject`.
     * @param ctx the parse tree
     */
    exitTypeObject?: (ctx: TypeObjectContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.typeProp`.
     * @param ctx the parse tree
     */
    enterTypeProp?: (ctx: TypePropContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.typeProp`.
     * @param ctx the parse tree
     */
    exitTypeProp?: (ctx: TypePropContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.propModifier`.
     * @param ctx the parse tree
     */
    enterPropModifier?: (ctx: PropModifierContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.propModifier`.
     * @param ctx the parse tree
     */
    exitPropModifier?: (ctx: PropModifierContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.typeLiteral`.
     * @param ctx the parse tree
     */
    enterTypeLiteral?: (ctx: TypeLiteralContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.typeLiteral`.
     * @param ctx the parse tree
     */
    exitTypeLiteral?: (ctx: TypeLiteralContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.typeKeyof`.
     * @param ctx the parse tree
     */
    enterTypeKeyof?: (ctx: TypeKeyofContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.typeKeyof`.
     * @param ctx the parse tree
     */
    exitTypeKeyof?: (ctx: TypeKeyofContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.typeTypeof`.
     * @param ctx the parse tree
     */
    enterTypeTypeof?: (ctx: TypeTypeofContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.typeTypeof`.
     * @param ctx the parse tree
     */
    exitTypeTypeof?: (ctx: TypeTypeofContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.typeIndexAccess`.
     * @param ctx the parse tree
     */
    enterTypeIndexAccess?: (ctx: TypeIndexAccessContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.typeIndexAccess`.
     * @param ctx the parse tree
     */
    exitTypeIndexAccess?: (ctx: TypeIndexAccessContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.typeConditional`.
     * @param ctx the parse tree
     */
    enterTypeConditional?: (ctx: TypeConditionalContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.typeConditional`.
     * @param ctx the parse tree
     */
    exitTypeConditional?: (ctx: TypeConditionalContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.typeInfer`.
     * @param ctx the parse tree
     */
    enterTypeInfer?: (ctx: TypeInferContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.typeInfer`.
     * @param ctx the parse tree
     */
    exitTypeInfer?: (ctx: TypeInferContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.typeMapped`.
     * @param ctx the parse tree
     */
    enterTypeMapped?: (ctx: TypeMappedContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.typeMapped`.
     * @param ctx the parse tree
     */
    exitTypeMapped?: (ctx: TypeMappedContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.mappedModifiers`.
     * @param ctx the parse tree
     */
    enterMappedModifiers?: (ctx: MappedModifiersContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.mappedModifiers`.
     * @param ctx the parse tree
     */
    exitMappedModifiers?: (ctx: MappedModifiersContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.mappedModifier`.
     * @param ctx the parse tree
     */
    enterMappedModifier?: (ctx: MappedModifierContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.mappedModifier`.
     * @param ctx the parse tree
     */
    exitMappedModifier?: (ctx: MappedModifierContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.typeTemplateLiteral`.
     * @param ctx the parse tree
     */
    enterTypeTemplateLiteral?: (ctx: TypeTemplateLiteralContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.typeTemplateLiteral`.
     * @param ctx the parse tree
     */
    exitTypeTemplateLiteral?: (ctx: TypeTemplateLiteralContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.templatePart`.
     * @param ctx the parse tree
     */
    enterTemplatePart?: (ctx: TemplatePartContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.templatePart`.
     * @param ctx the parse tree
     */
    exitTemplatePart?: (ctx: TemplatePartContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.typeApplication`.
     * @param ctx the parse tree
     */
    enterTypeApplication?: (ctx: TypeApplicationContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.typeApplication`.
     * @param ctx the parse tree
     */
    exitTypeApplication?: (ctx: TypeApplicationContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.typeParams`.
     * @param ctx the parse tree
     */
    enterTypeParams?: (ctx: TypeParamsContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.typeParams`.
     * @param ctx the parse tree
     */
    exitTypeParams?: (ctx: TypeParamsContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.typeParamDecl`.
     * @param ctx the parse tree
     */
    enterTypeParamDecl?: (ctx: TypeParamDeclContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.typeParamDecl`.
     * @param ctx the parse tree
     */
    exitTypeParamDecl?: (ctx: TypeParamDeclContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.typeParamConstraint`.
     * @param ctx the parse tree
     */
    enterTypeParamConstraint?: (ctx: TypeParamConstraintContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.typeParamConstraint`.
     * @param ctx the parse tree
     */
    exitTypeParamConstraint?: (ctx: TypeParamConstraintContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.typeParamDefault`.
     * @param ctx the parse tree
     */
    enterTypeParamDefault?: (ctx: TypeParamDefaultContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.typeParamDefault`.
     * @param ctx the parse tree
     */
    exitTypeParamDefault?: (ctx: TypeParamDefaultContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.assign`.
     * @param ctx the parse tree
     */
    enterAssign?: (ctx: AssignContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.assign`.
     * @param ctx the parse tree
     */
    exitAssign?: (ctx: AssignContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.compoundAssign`.
     * @param ctx the parse tree
     */
    enterCompoundAssign?: (ctx: CompoundAssignContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.compoundAssign`.
     * @param ctx the parse tree
     */
    exitCompoundAssign?: (ctx: CompoundAssignContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.subscriptAssign`.
     * @param ctx the parse tree
     */
    enterSubscriptAssign?: (ctx: SubscriptAssignContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.subscriptAssign`.
     * @param ctx the parse tree
     */
    exitSubscriptAssign?: (ctx: SubscriptAssignContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.switchForm`.
     * @param ctx the parse tree
     */
    enterSwitchForm?: (ctx: SwitchFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.switchForm`.
     * @param ctx the parse tree
     */
    exitSwitchForm?: (ctx: SwitchFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.caseClause`.
     * @param ctx the parse tree
     */
    enterCaseClause?: (ctx: CaseClauseContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.caseClause`.
     * @param ctx the parse tree
     */
    exitCaseClause?: (ctx: CaseClauseContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.defaultClause`.
     * @param ctx the parse tree
     */
    enterDefaultClause?: (ctx: DefaultClauseContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.defaultClause`.
     * @param ctx the parse tree
     */
    exitDefaultClause?: (ctx: DefaultClauseContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.forForm`.
     * @param ctx the parse tree
     */
    enterForForm?: (ctx: ForFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.forForm`.
     * @param ctx the parse tree
     */
    exitForForm?: (ctx: ForFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.forInForm`.
     * @param ctx the parse tree
     */
    enterForInForm?: (ctx: ForInFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.forInForm`.
     * @param ctx the parse tree
     */
    exitForInForm?: (ctx: ForInFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.forOfForm`.
     * @param ctx the parse tree
     */
    enterForOfForm?: (ctx: ForOfFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.forOfForm`.
     * @param ctx the parse tree
     */
    exitForOfForm?: (ctx: ForOfFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.forAwaitForm`.
     * @param ctx the parse tree
     */
    enterForAwaitForm?: (ctx: ForAwaitFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.forAwaitForm`.
     * @param ctx the parse tree
     */
    exitForAwaitForm?: (ctx: ForAwaitFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.exceptForm`.
     * @param ctx the parse tree
     */
    enterExceptForm?: (ctx: ExceptFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.exceptForm`.
     * @param ctx the parse tree
     */
    exitExceptForm?: (ctx: ExceptFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.tryClause`.
     * @param ctx the parse tree
     */
    enterTryClause?: (ctx: TryClauseContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.tryClause`.
     * @param ctx the parse tree
     */
    exitTryClause?: (ctx: TryClauseContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.catchClause`.
     * @param ctx the parse tree
     */
    enterCatchClause?: (ctx: CatchClauseContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.catchClause`.
     * @param ctx the parse tree
     */
    exitCatchClause?: (ctx: CatchClauseContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.finallyClause`.
     * @param ctx the parse tree
     */
    enterFinallyClause?: (ctx: FinallyClauseContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.finallyClause`.
     * @param ctx the parse tree
     */
    exitFinallyClause?: (ctx: FinallyClauseContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.expression`.
     * @param ctx the parse tree
     */
    enterExpression?: (ctx: ExpressionContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.expression`.
     * @param ctx the parse tree
     */
    exitExpression?: (ctx: ExpressionContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.thisExpr`.
     * @param ctx the parse tree
     */
    enterThisExpr?: (ctx: ThisExprContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.thisExpr`.
     * @param ctx the parse tree
     */
    exitThisExpr?: (ctx: ThisExprContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.superExpr`.
     * @param ctx the parse tree
     */
    enterSuperExpr?: (ctx: SuperExprContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.superExpr`.
     * @param ctx the parse tree
     */
    exitSuperExpr?: (ctx: SuperExprContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.superConstructorCall`.
     * @param ctx the parse tree
     */
    enterSuperConstructorCall?: (ctx: SuperConstructorCallContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.superConstructorCall`.
     * @param ctx the parse tree
     */
    exitSuperConstructorCall?: (ctx: SuperConstructorCallContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.superMethodCall`.
     * @param ctx the parse tree
     */
    enterSuperMethodCall?: (ctx: SuperMethodCallContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.superMethodCall`.
     * @param ctx the parse tree
     */
    exitSuperMethodCall?: (ctx: SuperMethodCallContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.typeofExpr`.
     * @param ctx the parse tree
     */
    enterTypeofExpr?: (ctx: TypeofExprContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.typeofExpr`.
     * @param ctx the parse tree
     */
    exitTypeofExpr?: (ctx: TypeofExprContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.typeAssert`.
     * @param ctx the parse tree
     */
    enterTypeAssert?: (ctx: TypeAssertContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.typeAssert`.
     * @param ctx the parse tree
     */
    exitTypeAssert?: (ctx: TypeAssertContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.lambda`.
     * @param ctx the parse tree
     */
    enterLambda?: (ctx: LambdaContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.lambda`.
     * @param ctx the parse tree
     */
    exitLambda?: (ctx: LambdaContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.fn`.
     * @param ctx the parse tree
     */
    enterFn?: (ctx: FnContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.fn`.
     * @param ctx the parse tree
     */
    exitFn?: (ctx: FnContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.asyncLambda`.
     * @param ctx the parse tree
     */
    enterAsyncLambda?: (ctx: AsyncLambdaContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.asyncLambda`.
     * @param ctx the parse tree
     */
    exitAsyncLambda?: (ctx: AsyncLambdaContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.asyncFn`.
     * @param ctx the parse tree
     */
    enterAsyncFn?: (ctx: AsyncFnContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.asyncFn`.
     * @param ctx the parse tree
     */
    exitAsyncFn?: (ctx: AsyncFnContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.generatorFn`.
     * @param ctx the parse tree
     */
    enterGeneratorFn?: (ctx: GeneratorFnContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.generatorFn`.
     * @param ctx the parse tree
     */
    exitGeneratorFn?: (ctx: GeneratorFnContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.asyncGeneratorFn`.
     * @param ctx the parse tree
     */
    enterAsyncGeneratorFn?: (ctx: AsyncGeneratorFnContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.asyncGeneratorFn`.
     * @param ctx the parse tree
     */
    exitAsyncGeneratorFn?: (ctx: AsyncGeneratorFnContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.iifeForm`.
     * @param ctx the parse tree
     */
    enterIifeForm?: (ctx: IifeFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.iifeForm`.
     * @param ctx the parse tree
     */
    exitIifeForm?: (ctx: IifeFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.iifeAsyncForm`.
     * @param ctx the parse tree
     */
    enterIifeAsyncForm?: (ctx: IifeAsyncFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.iifeAsyncForm`.
     * @param ctx the parse tree
     */
    exitIifeAsyncForm?: (ctx: IifeAsyncFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.fnO`.
     * @param ctx the parse tree
     */
    enterFnO?: (ctx: FnOContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.fnO`.
     * @param ctx the parse tree
     */
    exitFnO?: (ctx: FnOContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.lambdaO`.
     * @param ctx the parse tree
     */
    enterLambdaO?: (ctx: LambdaOContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.lambdaO`.
     * @param ctx the parse tree
     */
    exitLambdaO?: (ctx: LambdaOContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.asyncFnO`.
     * @param ctx the parse tree
     */
    enterAsyncFnO?: (ctx: AsyncFnOContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.asyncFnO`.
     * @param ctx the parse tree
     */
    exitAsyncFnO?: (ctx: AsyncFnOContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.asyncLambdaO`.
     * @param ctx the parse tree
     */
    enterAsyncLambdaO?: (ctx: AsyncLambdaOContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.asyncLambdaO`.
     * @param ctx the parse tree
     */
    exitAsyncLambdaO?: (ctx: AsyncLambdaOContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.generatorFnO`.
     * @param ctx the parse tree
     */
    enterGeneratorFnO?: (ctx: GeneratorFnOContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.generatorFnO`.
     * @param ctx the parse tree
     */
    exitGeneratorFnO?: (ctx: GeneratorFnOContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.asyncGeneratorFnO`.
     * @param ctx the parse tree
     */
    enterAsyncGeneratorFnO?: (ctx: AsyncGeneratorFnOContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.asyncGeneratorFnO`.
     * @param ctx the parse tree
     */
    exitAsyncGeneratorFnO?: (ctx: AsyncGeneratorFnOContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.methodO`.
     * @param ctx the parse tree
     */
    enterMethodO?: (ctx: MethodOContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.methodO`.
     * @param ctx the parse tree
     */
    exitMethodO?: (ctx: MethodOContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.abstractMethodO`.
     * @param ctx the parse tree
     */
    enterAbstractMethodO?: (ctx: AbstractMethodOContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.abstractMethodO`.
     * @param ctx the parse tree
     */
    exitAbstractMethodO?: (ctx: AbstractMethodOContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.constructorO`.
     * @param ctx the parse tree
     */
    enterConstructorO?: (ctx: ConstructorOContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.constructorO`.
     * @param ctx the parse tree
     */
    exitConstructorO?: (ctx: ConstructorOContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.fnoSignature`.
     * @param ctx the parse tree
     */
    enterFnoSignature?: (ctx: FnoSignatureContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.fnoSignature`.
     * @param ctx the parse tree
     */
    exitFnoSignature?: (ctx: FnoSignatureContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.fnoParam`.
     * @param ctx the parse tree
     */
    enterFnoParam?: (ctx: FnoParamContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.fnoParam`.
     * @param ctx the parse tree
     */
    exitFnoParam?: (ctx: FnoParamContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.fnoRestParam`.
     * @param ctx the parse tree
     */
    enterFnoRestParam?: (ctx: FnoRestParamContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.fnoRestParam`.
     * @param ctx the parse tree
     */
    exitFnoRestParam?: (ctx: FnoRestParamContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.awaitExpr`.
     * @param ctx the parse tree
     */
    enterAwaitExpr?: (ctx: AwaitExprContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.awaitExpr`.
     * @param ctx the parse tree
     */
    exitAwaitExpr?: (ctx: AwaitExprContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.yieldExpr`.
     * @param ctx the parse tree
     */
    enterYieldExpr?: (ctx: YieldExprContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.yieldExpr`.
     * @param ctx the parse tree
     */
    exitYieldExpr?: (ctx: YieldExprContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.yieldStarExpr`.
     * @param ctx the parse tree
     */
    enterYieldStarExpr?: (ctx: YieldStarExprContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.yieldStarExpr`.
     * @param ctx the parse tree
     */
    exitYieldStarExpr?: (ctx: YieldStarExprContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.bindExpr`.
     * @param ctx the parse tree
     */
    enterBindExpr?: (ctx: BindExprContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.bindExpr`.
     * @param ctx the parse tree
     */
    exitBindExpr?: (ctx: BindExprContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.methodCallExpr`.
     * @param ctx the parse tree
     */
    enterMethodCallExpr?: (ctx: MethodCallExprContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.methodCallExpr`.
     * @param ctx the parse tree
     */
    exitMethodCallExpr?: (ctx: MethodCallExprContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.ternary`.
     * @param ctx the parse tree
     */
    enterTernary?: (ctx: TernaryContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.ternary`.
     * @param ctx the parse tree
     */
    exitTernary?: (ctx: TernaryContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.condExpr`.
     * @param ctx the parse tree
     */
    enterCondExpr?: (ctx: CondExprContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.condExpr`.
     * @param ctx the parse tree
     */
    exitCondExpr?: (ctx: CondExprContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.condClause`.
     * @param ctx the parse tree
     */
    enterCondClause?: (ctx: CondClauseContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.condClause`.
     * @param ctx the parse tree
     */
    exitCondClause?: (ctx: CondClauseContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.condElseClause`.
     * @param ctx the parse tree
     */
    enterCondElseClause?: (ctx: CondElseClauseContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.condElseClause`.
     * @param ctx the parse tree
     */
    exitCondElseClause?: (ctx: CondElseClauseContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.newForm`.
     * @param ctx the parse tree
     */
    enterNewForm?: (ctx: NewFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.newForm`.
     * @param ctx the parse tree
     */
    exitNewForm?: (ctx: NewFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.objectExpr`.
     * @param ctx the parse tree
     */
    enterObjectExpr?: (ctx: ObjectExprContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.objectExpr`.
     * @param ctx the parse tree
     */
    exitObjectExpr?: (ctx: ObjectExprContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.objectField`.
     * @param ctx the parse tree
     */
    enterObjectField?: (ctx: ObjectFieldContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.objectField`.
     * @param ctx the parse tree
     */
    exitObjectField?: (ctx: ObjectFieldContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.methodDef`.
     * @param ctx the parse tree
     */
    enterMethodDef?: (ctx: MethodDefContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.methodDef`.
     * @param ctx the parse tree
     */
    exitMethodDef?: (ctx: MethodDefContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.arrayExpr`.
     * @param ctx the parse tree
     */
    enterArrayExpr?: (ctx: ArrayExprContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.arrayExpr`.
     * @param ctx the parse tree
     */
    exitArrayExpr?: (ctx: ArrayExprContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.bracketArrayExpr`.
     * @param ctx the parse tree
     */
    enterBracketArrayExpr?: (ctx: BracketArrayExprContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.bracketArrayExpr`.
     * @param ctx the parse tree
     */
    exitBracketArrayExpr?: (ctx: BracketArrayExprContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.braceObjectExpr`.
     * @param ctx the parse tree
     */
    enterBraceObjectExpr?: (ctx: BraceObjectExprContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.braceObjectExpr`.
     * @param ctx the parse tree
     */
    exitBraceObjectExpr?: (ctx: BraceObjectExprContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.braceObjectField`.
     * @param ctx the parse tree
     */
    enterBraceObjectField?: (ctx: BraceObjectFieldContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.braceObjectField`.
     * @param ctx the parse tree
     */
    exitBraceObjectField?: (ctx: BraceObjectFieldContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.templateExpr`.
     * @param ctx the parse tree
     */
    enterTemplateExpr?: (ctx: TemplateExprContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.templateExpr`.
     * @param ctx the parse tree
     */
    exitTemplateExpr?: (ctx: TemplateExprContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.propKey`.
     * @param ctx the parse tree
     */
    enterPropKey?: (ctx: PropKeyContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.propKey`.
     * @param ctx the parse tree
     */
    exitPropKey?: (ctx: PropKeyContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.opSymbol`.
     * @param ctx the parse tree
     */
    enterOpSymbol?: (ctx: OpSymbolContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.opSymbol`.
     * @param ctx the parse tree
     */
    exitOpSymbol?: (ctx: OpSymbolContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.propAccess`.
     * @param ctx the parse tree
     */
    enterPropAccess?: (ctx: PropAccessContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.propAccess`.
     * @param ctx the parse tree
     */
    exitPropAccess?: (ctx: PropAccessContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.subscriptAccess`.
     * @param ctx the parse tree
     */
    enterSubscriptAccess?: (ctx: SubscriptAccessContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.subscriptAccess`.
     * @param ctx the parse tree
     */
    exitSubscriptAccess?: (ctx: SubscriptAccessContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.indexAccess`.
     * @param ctx the parse tree
     */
    enterIndexAccess?: (ctx: IndexAccessContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.indexAccess`.
     * @param ctx the parse tree
     */
    exitIndexAccess?: (ctx: IndexAccessContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.quasiquote`.
     * @param ctx the parse tree
     */
    enterQuasiquote?: (ctx: QuasiquoteContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.quasiquote`.
     * @param ctx the parse tree
     */
    exitQuasiquote?: (ctx: QuasiquoteContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.quasiForm`.
     * @param ctx the parse tree
     */
    enterQuasiForm?: (ctx: QuasiFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.quasiForm`.
     * @param ctx the parse tree
     */
    exitQuasiForm?: (ctx: QuasiFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.sForm`.
     * @param ctx the parse tree
     */
    enterSForm?: (ctx: SFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.sForm`.
     * @param ctx the parse tree
     */
    exitSForm?: (ctx: SFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.unquote`.
     * @param ctx the parse tree
     */
    enterUnquote?: (ctx: UnquoteContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.unquote`.
     * @param ctx the parse tree
     */
    exitUnquote?: (ctx: UnquoteContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.unquoteSplicing`.
     * @param ctx the parse tree
     */
    enterUnquoteSplicing?: (ctx: UnquoteSplicingContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.unquoteSplicing`.
     * @param ctx the parse tree
     */
    exitUnquoteSplicing?: (ctx: UnquoteSplicingContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.tildeUnquote`.
     * @param ctx the parse tree
     */
    enterTildeUnquote?: (ctx: TildeUnquoteContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.tildeUnquote`.
     * @param ctx the parse tree
     */
    exitTildeUnquote?: (ctx: TildeUnquoteContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.tildeUnquoteSplice`.
     * @param ctx the parse tree
     */
    enterTildeUnquoteSplice?: (ctx: TildeUnquoteSpliceContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.tildeUnquoteSplice`.
     * @param ctx the parse tree
     */
    exitTildeUnquoteSplice?: (ctx: TildeUnquoteSpliceContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.optChain`.
     * @param ctx the parse tree
     */
    enterOptChain?: (ctx: OptChainContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.optChain`.
     * @param ctx the parse tree
     */
    exitOptChain?: (ctx: OptChainContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.optChainIndex`.
     * @param ctx the parse tree
     */
    enterOptChainIndex?: (ctx: OptChainIndexContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.optChainIndex`.
     * @param ctx the parse tree
     */
    exitOptChainIndex?: (ctx: OptChainIndexContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.nullCoalesce`.
     * @param ctx the parse tree
     */
    enterNullCoalesce?: (ctx: NullCoalesceContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.nullCoalesce`.
     * @param ctx the parse tree
     */
    exitNullCoalesce?: (ctx: NullCoalesceContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.infixExpr`.
     * @param ctx the parse tree
     */
    enterInfixExpr?: (ctx: InfixExprContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.infixExpr`.
     * @param ctx the parse tree
     */
    exitInfixExpr?: (ctx: InfixExprContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.infixBody`.
     * @param ctx the parse tree
     */
    enterInfixBody?: (ctx: InfixBodyContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.infixBody`.
     * @param ctx the parse tree
     */
    exitInfixBody?: (ctx: InfixBodyContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.infixAtom`.
     * @param ctx the parse tree
     */
    enterInfixAtom?: (ctx: InfixAtomContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.infixAtom`.
     * @param ctx the parse tree
     */
    exitInfixAtom?: (ctx: InfixAtomContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.infixArgs`.
     * @param ctx the parse tree
     */
    enterInfixArgs?: (ctx: InfixArgsContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.infixArgs`.
     * @param ctx the parse tree
     */
    exitInfixArgs?: (ctx: InfixArgsContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.infixUnaryOp`.
     * @param ctx the parse tree
     */
    enterInfixUnaryOp?: (ctx: InfixUnaryOpContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.infixUnaryOp`.
     * @param ctx the parse tree
     */
    exitInfixUnaryOp?: (ctx: InfixUnaryOpContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.infixBinOp`.
     * @param ctx the parse tree
     */
    enterInfixBinOp?: (ctx: InfixBinOpContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.infixBinOp`.
     * @param ctx the parse tree
     */
    exitInfixBinOp?: (ctx: InfixBinOpContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.macroExprCall`.
     * @param ctx the parse tree
     */
    enterMacroExprCall?: (ctx: MacroExprCallContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.macroExprCall`.
     * @param ctx the parse tree
     */
    exitMacroExprCall?: (ctx: MacroExprCallContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.macroBodyCall`.
     * @param ctx the parse tree
     */
    enterMacroBodyCall?: (ctx: MacroBodyCallContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.macroBodyCall`.
     * @param ctx the parse tree
     */
    exitMacroBodyCall?: (ctx: MacroBodyCallContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.call`.
     * @param ctx the parse tree
     */
    enterCall?: (ctx: CallContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.call`.
     * @param ctx the parse tree
     */
    exitCall?: (ctx: CallContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.typeArgs`.
     * @param ctx the parse tree
     */
    enterTypeArgs?: (ctx: TypeArgsContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.typeArgs`.
     * @param ctx the parse tree
     */
    exitTypeArgs?: (ctx: TypeArgsContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.fnSignature`.
     * @param ctx the parse tree
     */
    enterFnSignature?: (ctx: FnSignatureContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.fnSignature`.
     * @param ctx the parse tree
     */
    exitFnSignature?: (ctx: FnSignatureContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.param`.
     * @param ctx the parse tree
     */
    enterParam?: (ctx: ParamContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.param`.
     * @param ctx the parse tree
     */
    exitParam?: (ctx: ParamContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.restParam`.
     * @param ctx the parse tree
     */
    enterRestParam?: (ctx: RestParamContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.restParam`.
     * @param ctx the parse tree
     */
    exitRestParam?: (ctx: RestParamContext) => void;
    /**
     * Enter a parse tree produced by `Stage9Parser.literal`.
     * @param ctx the parse tree
     */
    enterLiteral?: (ctx: LiteralContext) => void;
    /**
     * Exit a parse tree produced by `Stage9Parser.literal`.
     * @param ctx the parse tree
     */
    exitLiteral?: (ctx: LiteralContext) => void;

    visitTerminal(node: TerminalNode): void {}
    visitErrorNode(node: ErrorNode): void {}
    enterEveryRule(node: ParserRuleContext): void {}
    exitEveryRule(node: ParserRuleContext): void {}
}

