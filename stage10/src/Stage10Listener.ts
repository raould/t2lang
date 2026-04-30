
import { ErrorNode, ParseTreeListener, ParserRuleContext, TerminalNode } from "antlr4ng";


import { ProgramContext } from "./Stage10Parser.js";
import { TopLevelContext } from "./Stage10Parser.js";
import { DeclContext } from "./Stage10Parser.js";
import { DefmacroContext } from "./Stage10Parser.js";
import { MacroSignatureContext } from "./Stage10Parser.js";
import { MacroTimeFnDefContext } from "./Stage10Parser.js";
import { MacroImportContext } from "./Stage10Parser.js";
import { MacroExportContext } from "./Stage10Parser.js";
import { MacroExportSpecContext } from "./Stage10Parser.js";
import { MacroReexportContext } from "./Stage10Parser.js";
import { TopLevelLetContext } from "./Stage10Parser.js";
import { TopLevelVarContext } from "./Stage10Parser.js";
import { TopLevelConstContext } from "./Stage10Parser.js";
import { MetaAnnotationContext } from "./Stage10Parser.js";
import { TypeAliasContext } from "./Stage10Parser.js";
import { InterfaceDefContext } from "./Stage10Parser.js";
import { InterfaceExtendsContext } from "./Stage10Parser.js";
import { EnumDefContext } from "./Stage10Parser.js";
import { EnumMemberContext } from "./Stage10Parser.js";
import { MixinFormContext } from "./Stage10Parser.js";
import { MixinFilterContext } from "./Stage10Parser.js";
import { ClassDefContext } from "./Stage10Parser.js";
import { AnonClassDefContext } from "./Stage10Parser.js";
import { ClassExtendsContext } from "./Stage10Parser.js";
import { ClassImplementsContext } from "./Stage10Parser.js";
import { ClassBodyContext } from "./Stage10Parser.js";
import { ClassElementContext } from "./Stage10Parser.js";
import { ModifierContext } from "./Stage10Parser.js";
import { FieldDefContext } from "./Stage10Parser.js";
import { ConstructorParamContext } from "./Stage10Parser.js";
import { ConstructorSignatureContext } from "./Stage10Parser.js";
import { ConstructorDefContext } from "./Stage10Parser.js";
import { ClassMethodDefContext } from "./Stage10Parser.js";
import { AbstractMethodDefContext } from "./Stage10Parser.js";
import { GetterDefContext } from "./Stage10Parser.js";
import { SetterDefContext } from "./Stage10Parser.js";
import { MethodKeyContext } from "./Stage10Parser.js";
import { StatementContext } from "./Stage10Parser.js";
import { LetStmtContext } from "./Stage10Parser.js";
import { VarStmtContext } from "./Stage10Parser.js";
import { ConstStmtContext } from "./Stage10Parser.js";
import { IfFormContext } from "./Stage10Parser.js";
import { ThenBlockContext } from "./Stage10Parser.js";
import { ElseBlockContext } from "./Stage10Parser.js";
import { WhileFormContext } from "./Stage10Parser.js";
import { ReturnFormContext } from "./Stage10Parser.js";
import { ThrowFormContext } from "./Stage10Parser.js";
import { BreakFormContext } from "./Stage10Parser.js";
import { ContinueFormContext } from "./Stage10Parser.js";
import { ImportFormContext } from "./Stage10Parser.js";
import { ImportTypeFormContext } from "./Stage10Parser.js";
import { ImportTypeSpecContext } from "./Stage10Parser.js";
import { ImportTypeNameContext } from "./Stage10Parser.js";
import { ExportFormContext } from "./Stage10Parser.js";
import { ExportBindingContext } from "./Stage10Parser.js";
import { ExportDefaultContext } from "./Stage10Parser.js";
import { ExportNamedContext } from "./Stage10Parser.js";
import { ExportNamePairContext } from "./Stage10Parser.js";
import { ExportFromContext } from "./Stage10Parser.js";
import { ExportAllFromContext } from "./Stage10Parser.js";
import { ExportNsFromFormContext } from "./Stage10Parser.js";
import { ExportTypeFormContext } from "./Stage10Parser.js";
import { ExportTypeFromFormContext } from "./Stage10Parser.js";
import { ExportTypeAllFromFormContext } from "./Stage10Parser.js";
import { ExportDeclFormContext } from "./Stage10Parser.js";
import { StarBindingContext } from "./Stage10Parser.js";
import { SingleBindingContext } from "./Stage10Parser.js";
import { ObjectDestructPatContext } from "./Stage10Parser.js";
import { ArrayDestructPatContext } from "./Stage10Parser.js";
import { TypeExprContext } from "./Stage10Parser.js";
import { TypeUnionContext } from "./Stage10Parser.js";
import { TypeIntersectionContext } from "./Stage10Parser.js";
import { TypeArrayContext } from "./Stage10Parser.js";
import { TypeTupleContext } from "./Stage10Parser.js";
import { TypeTupleElementContext } from "./Stage10Parser.js";
import { TypeFunctionContext } from "./Stage10Parser.js";
import { TypeFnParamContext } from "./Stage10Parser.js";
import { TypeObjectContext } from "./Stage10Parser.js";
import { TypePropContext } from "./Stage10Parser.js";
import { PropModifierContext } from "./Stage10Parser.js";
import { TypeLiteralContext } from "./Stage10Parser.js";
import { TypeKeyofContext } from "./Stage10Parser.js";
import { TypeTypeofContext } from "./Stage10Parser.js";
import { TypeIndexAccessContext } from "./Stage10Parser.js";
import { TypeConditionalContext } from "./Stage10Parser.js";
import { TypeInferContext } from "./Stage10Parser.js";
import { TypeMappedContext } from "./Stage10Parser.js";
import { MappedModifiersContext } from "./Stage10Parser.js";
import { MappedModifierContext } from "./Stage10Parser.js";
import { TypeTemplateLiteralContext } from "./Stage10Parser.js";
import { TemplatePartContext } from "./Stage10Parser.js";
import { TypeApplicationContext } from "./Stage10Parser.js";
import { TypeParamsContext } from "./Stage10Parser.js";
import { TypeParamDeclContext } from "./Stage10Parser.js";
import { TypeParamConstraintContext } from "./Stage10Parser.js";
import { TypeParamDefaultContext } from "./Stage10Parser.js";
import { AssignContext } from "./Stage10Parser.js";
import { CompoundAssignContext } from "./Stage10Parser.js";
import { SubscriptAssignContext } from "./Stage10Parser.js";
import { SwitchFormContext } from "./Stage10Parser.js";
import { CaseClauseContext } from "./Stage10Parser.js";
import { DefaultClauseContext } from "./Stage10Parser.js";
import { ForFormContext } from "./Stage10Parser.js";
import { ForInFormContext } from "./Stage10Parser.js";
import { ForOfFormContext } from "./Stage10Parser.js";
import { ForAwaitFormContext } from "./Stage10Parser.js";
import { ExceptFormContext } from "./Stage10Parser.js";
import { TryClauseContext } from "./Stage10Parser.js";
import { CatchClauseContext } from "./Stage10Parser.js";
import { FinallyClauseContext } from "./Stage10Parser.js";
import { ExpressionContext } from "./Stage10Parser.js";
import { ThisExprContext } from "./Stage10Parser.js";
import { SuperExprContext } from "./Stage10Parser.js";
import { SuperConstructorCallContext } from "./Stage10Parser.js";
import { SuperMethodCallContext } from "./Stage10Parser.js";
import { TypeofExprContext } from "./Stage10Parser.js";
import { TypeAssertContext } from "./Stage10Parser.js";
import { LambdaContext } from "./Stage10Parser.js";
import { FnContext } from "./Stage10Parser.js";
import { AsyncLambdaContext } from "./Stage10Parser.js";
import { AsyncFnContext } from "./Stage10Parser.js";
import { GeneratorFnContext } from "./Stage10Parser.js";
import { AsyncGeneratorFnContext } from "./Stage10Parser.js";
import { IifeFormContext } from "./Stage10Parser.js";
import { IifeAsyncFormContext } from "./Stage10Parser.js";
import { FnOContext } from "./Stage10Parser.js";
import { LambdaOContext } from "./Stage10Parser.js";
import { AsyncFnOContext } from "./Stage10Parser.js";
import { AsyncLambdaOContext } from "./Stage10Parser.js";
import { GeneratorFnOContext } from "./Stage10Parser.js";
import { AsyncGeneratorFnOContext } from "./Stage10Parser.js";
import { MethodOContext } from "./Stage10Parser.js";
import { AbstractMethodOContext } from "./Stage10Parser.js";
import { ConstructorOContext } from "./Stage10Parser.js";
import { FnoSignatureContext } from "./Stage10Parser.js";
import { FnoParamContext } from "./Stage10Parser.js";
import { FnoRestParamContext } from "./Stage10Parser.js";
import { AwaitExprContext } from "./Stage10Parser.js";
import { YieldExprContext } from "./Stage10Parser.js";
import { YieldStarExprContext } from "./Stage10Parser.js";
import { BindExprContext } from "./Stage10Parser.js";
import { MethodCallExprContext } from "./Stage10Parser.js";
import { TernaryContext } from "./Stage10Parser.js";
import { CondExprContext } from "./Stage10Parser.js";
import { CondClauseContext } from "./Stage10Parser.js";
import { CondElseClauseContext } from "./Stage10Parser.js";
import { NewFormContext } from "./Stage10Parser.js";
import { ObjectExprContext } from "./Stage10Parser.js";
import { ObjectFieldContext } from "./Stage10Parser.js";
import { MethodDefContext } from "./Stage10Parser.js";
import { ArrayExprContext } from "./Stage10Parser.js";
import { BracketArrayExprContext } from "./Stage10Parser.js";
import { BraceObjectExprContext } from "./Stage10Parser.js";
import { BraceObjectFieldContext } from "./Stage10Parser.js";
import { TemplateExprContext } from "./Stage10Parser.js";
import { PropKeyContext } from "./Stage10Parser.js";
import { OpSymbolContext } from "./Stage10Parser.js";
import { PropAccessContext } from "./Stage10Parser.js";
import { SubscriptAccessContext } from "./Stage10Parser.js";
import { IndexAccessContext } from "./Stage10Parser.js";
import { QuasiquoteContext } from "./Stage10Parser.js";
import { QuasiFormContext } from "./Stage10Parser.js";
import { SFormContext } from "./Stage10Parser.js";
import { UnquoteContext } from "./Stage10Parser.js";
import { UnquoteSplicingContext } from "./Stage10Parser.js";
import { TildeUnquoteContext } from "./Stage10Parser.js";
import { TildeUnquoteSpliceContext } from "./Stage10Parser.js";
import { OptChainContext } from "./Stage10Parser.js";
import { OptChainIndexContext } from "./Stage10Parser.js";
import { NullCoalesceContext } from "./Stage10Parser.js";
import { InfixExprContext } from "./Stage10Parser.js";
import { InfixBodyContext } from "./Stage10Parser.js";
import { InfixAtomContext } from "./Stage10Parser.js";
import { InfixArgsContext } from "./Stage10Parser.js";
import { InfixUnaryOpContext } from "./Stage10Parser.js";
import { InfixBinOpContext } from "./Stage10Parser.js";
import { MacroExprCallContext } from "./Stage10Parser.js";
import { MacroBodyCallContext } from "./Stage10Parser.js";
import { CallContext } from "./Stage10Parser.js";
import { TypeArgsContext } from "./Stage10Parser.js";
import { FnSignatureContext } from "./Stage10Parser.js";
import { ParamContext } from "./Stage10Parser.js";
import { RestParamContext } from "./Stage10Parser.js";
import { LiteralContext } from "./Stage10Parser.js";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `Stage10Parser`.
 */
export class Stage10Listener implements ParseTreeListener {
    /**
     * Enter a parse tree produced by `Stage10Parser.program`.
     * @param ctx the parse tree
     */
    enterProgram?: (ctx: ProgramContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.program`.
     * @param ctx the parse tree
     */
    exitProgram?: (ctx: ProgramContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.topLevel`.
     * @param ctx the parse tree
     */
    enterTopLevel?: (ctx: TopLevelContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.topLevel`.
     * @param ctx the parse tree
     */
    exitTopLevel?: (ctx: TopLevelContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.decl`.
     * @param ctx the parse tree
     */
    enterDecl?: (ctx: DeclContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.decl`.
     * @param ctx the parse tree
     */
    exitDecl?: (ctx: DeclContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.defmacro`.
     * @param ctx the parse tree
     */
    enterDefmacro?: (ctx: DefmacroContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.defmacro`.
     * @param ctx the parse tree
     */
    exitDefmacro?: (ctx: DefmacroContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.macroSignature`.
     * @param ctx the parse tree
     */
    enterMacroSignature?: (ctx: MacroSignatureContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.macroSignature`.
     * @param ctx the parse tree
     */
    exitMacroSignature?: (ctx: MacroSignatureContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.macroTimeFnDef`.
     * @param ctx the parse tree
     */
    enterMacroTimeFnDef?: (ctx: MacroTimeFnDefContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.macroTimeFnDef`.
     * @param ctx the parse tree
     */
    exitMacroTimeFnDef?: (ctx: MacroTimeFnDefContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.macroImport`.
     * @param ctx the parse tree
     */
    enterMacroImport?: (ctx: MacroImportContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.macroImport`.
     * @param ctx the parse tree
     */
    exitMacroImport?: (ctx: MacroImportContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.macroExport`.
     * @param ctx the parse tree
     */
    enterMacroExport?: (ctx: MacroExportContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.macroExport`.
     * @param ctx the parse tree
     */
    exitMacroExport?: (ctx: MacroExportContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.macroExportSpec`.
     * @param ctx the parse tree
     */
    enterMacroExportSpec?: (ctx: MacroExportSpecContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.macroExportSpec`.
     * @param ctx the parse tree
     */
    exitMacroExportSpec?: (ctx: MacroExportSpecContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.macroReexport`.
     * @param ctx the parse tree
     */
    enterMacroReexport?: (ctx: MacroReexportContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.macroReexport`.
     * @param ctx the parse tree
     */
    exitMacroReexport?: (ctx: MacroReexportContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.topLevelLet`.
     * @param ctx the parse tree
     */
    enterTopLevelLet?: (ctx: TopLevelLetContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.topLevelLet`.
     * @param ctx the parse tree
     */
    exitTopLevelLet?: (ctx: TopLevelLetContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.topLevelVar`.
     * @param ctx the parse tree
     */
    enterTopLevelVar?: (ctx: TopLevelVarContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.topLevelVar`.
     * @param ctx the parse tree
     */
    exitTopLevelVar?: (ctx: TopLevelVarContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.topLevelConst`.
     * @param ctx the parse tree
     */
    enterTopLevelConst?: (ctx: TopLevelConstContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.topLevelConst`.
     * @param ctx the parse tree
     */
    exitTopLevelConst?: (ctx: TopLevelConstContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.metaAnnotation`.
     * @param ctx the parse tree
     */
    enterMetaAnnotation?: (ctx: MetaAnnotationContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.metaAnnotation`.
     * @param ctx the parse tree
     */
    exitMetaAnnotation?: (ctx: MetaAnnotationContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.typeAlias`.
     * @param ctx the parse tree
     */
    enterTypeAlias?: (ctx: TypeAliasContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.typeAlias`.
     * @param ctx the parse tree
     */
    exitTypeAlias?: (ctx: TypeAliasContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.interfaceDef`.
     * @param ctx the parse tree
     */
    enterInterfaceDef?: (ctx: InterfaceDefContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.interfaceDef`.
     * @param ctx the parse tree
     */
    exitInterfaceDef?: (ctx: InterfaceDefContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.interfaceExtends`.
     * @param ctx the parse tree
     */
    enterInterfaceExtends?: (ctx: InterfaceExtendsContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.interfaceExtends`.
     * @param ctx the parse tree
     */
    exitInterfaceExtends?: (ctx: InterfaceExtendsContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.enumDef`.
     * @param ctx the parse tree
     */
    enterEnumDef?: (ctx: EnumDefContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.enumDef`.
     * @param ctx the parse tree
     */
    exitEnumDef?: (ctx: EnumDefContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.enumMember`.
     * @param ctx the parse tree
     */
    enterEnumMember?: (ctx: EnumMemberContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.enumMember`.
     * @param ctx the parse tree
     */
    exitEnumMember?: (ctx: EnumMemberContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.mixinForm`.
     * @param ctx the parse tree
     */
    enterMixinForm?: (ctx: MixinFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.mixinForm`.
     * @param ctx the parse tree
     */
    exitMixinForm?: (ctx: MixinFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.mixinFilter`.
     * @param ctx the parse tree
     */
    enterMixinFilter?: (ctx: MixinFilterContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.mixinFilter`.
     * @param ctx the parse tree
     */
    exitMixinFilter?: (ctx: MixinFilterContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.classDef`.
     * @param ctx the parse tree
     */
    enterClassDef?: (ctx: ClassDefContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.classDef`.
     * @param ctx the parse tree
     */
    exitClassDef?: (ctx: ClassDefContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.anonClassDef`.
     * @param ctx the parse tree
     */
    enterAnonClassDef?: (ctx: AnonClassDefContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.anonClassDef`.
     * @param ctx the parse tree
     */
    exitAnonClassDef?: (ctx: AnonClassDefContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.classExtends`.
     * @param ctx the parse tree
     */
    enterClassExtends?: (ctx: ClassExtendsContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.classExtends`.
     * @param ctx the parse tree
     */
    exitClassExtends?: (ctx: ClassExtendsContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.classImplements`.
     * @param ctx the parse tree
     */
    enterClassImplements?: (ctx: ClassImplementsContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.classImplements`.
     * @param ctx the parse tree
     */
    exitClassImplements?: (ctx: ClassImplementsContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.classBody`.
     * @param ctx the parse tree
     */
    enterClassBody?: (ctx: ClassBodyContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.classBody`.
     * @param ctx the parse tree
     */
    exitClassBody?: (ctx: ClassBodyContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.classElement`.
     * @param ctx the parse tree
     */
    enterClassElement?: (ctx: ClassElementContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.classElement`.
     * @param ctx the parse tree
     */
    exitClassElement?: (ctx: ClassElementContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.modifier`.
     * @param ctx the parse tree
     */
    enterModifier?: (ctx: ModifierContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.modifier`.
     * @param ctx the parse tree
     */
    exitModifier?: (ctx: ModifierContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.fieldDef`.
     * @param ctx the parse tree
     */
    enterFieldDef?: (ctx: FieldDefContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.fieldDef`.
     * @param ctx the parse tree
     */
    exitFieldDef?: (ctx: FieldDefContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.constructorParam`.
     * @param ctx the parse tree
     */
    enterConstructorParam?: (ctx: ConstructorParamContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.constructorParam`.
     * @param ctx the parse tree
     */
    exitConstructorParam?: (ctx: ConstructorParamContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.constructorSignature`.
     * @param ctx the parse tree
     */
    enterConstructorSignature?: (ctx: ConstructorSignatureContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.constructorSignature`.
     * @param ctx the parse tree
     */
    exitConstructorSignature?: (ctx: ConstructorSignatureContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.constructorDef`.
     * @param ctx the parse tree
     */
    enterConstructorDef?: (ctx: ConstructorDefContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.constructorDef`.
     * @param ctx the parse tree
     */
    exitConstructorDef?: (ctx: ConstructorDefContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.classMethodDef`.
     * @param ctx the parse tree
     */
    enterClassMethodDef?: (ctx: ClassMethodDefContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.classMethodDef`.
     * @param ctx the parse tree
     */
    exitClassMethodDef?: (ctx: ClassMethodDefContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.abstractMethodDef`.
     * @param ctx the parse tree
     */
    enterAbstractMethodDef?: (ctx: AbstractMethodDefContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.abstractMethodDef`.
     * @param ctx the parse tree
     */
    exitAbstractMethodDef?: (ctx: AbstractMethodDefContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.getterDef`.
     * @param ctx the parse tree
     */
    enterGetterDef?: (ctx: GetterDefContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.getterDef`.
     * @param ctx the parse tree
     */
    exitGetterDef?: (ctx: GetterDefContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.setterDef`.
     * @param ctx the parse tree
     */
    enterSetterDef?: (ctx: SetterDefContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.setterDef`.
     * @param ctx the parse tree
     */
    exitSetterDef?: (ctx: SetterDefContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.methodKey`.
     * @param ctx the parse tree
     */
    enterMethodKey?: (ctx: MethodKeyContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.methodKey`.
     * @param ctx the parse tree
     */
    exitMethodKey?: (ctx: MethodKeyContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.statement`.
     * @param ctx the parse tree
     */
    enterStatement?: (ctx: StatementContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.statement`.
     * @param ctx the parse tree
     */
    exitStatement?: (ctx: StatementContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.letStmt`.
     * @param ctx the parse tree
     */
    enterLetStmt?: (ctx: LetStmtContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.letStmt`.
     * @param ctx the parse tree
     */
    exitLetStmt?: (ctx: LetStmtContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.varStmt`.
     * @param ctx the parse tree
     */
    enterVarStmt?: (ctx: VarStmtContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.varStmt`.
     * @param ctx the parse tree
     */
    exitVarStmt?: (ctx: VarStmtContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.constStmt`.
     * @param ctx the parse tree
     */
    enterConstStmt?: (ctx: ConstStmtContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.constStmt`.
     * @param ctx the parse tree
     */
    exitConstStmt?: (ctx: ConstStmtContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.ifForm`.
     * @param ctx the parse tree
     */
    enterIfForm?: (ctx: IfFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.ifForm`.
     * @param ctx the parse tree
     */
    exitIfForm?: (ctx: IfFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.thenBlock`.
     * @param ctx the parse tree
     */
    enterThenBlock?: (ctx: ThenBlockContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.thenBlock`.
     * @param ctx the parse tree
     */
    exitThenBlock?: (ctx: ThenBlockContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.elseBlock`.
     * @param ctx the parse tree
     */
    enterElseBlock?: (ctx: ElseBlockContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.elseBlock`.
     * @param ctx the parse tree
     */
    exitElseBlock?: (ctx: ElseBlockContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.whileForm`.
     * @param ctx the parse tree
     */
    enterWhileForm?: (ctx: WhileFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.whileForm`.
     * @param ctx the parse tree
     */
    exitWhileForm?: (ctx: WhileFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.returnForm`.
     * @param ctx the parse tree
     */
    enterReturnForm?: (ctx: ReturnFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.returnForm`.
     * @param ctx the parse tree
     */
    exitReturnForm?: (ctx: ReturnFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.throwForm`.
     * @param ctx the parse tree
     */
    enterThrowForm?: (ctx: ThrowFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.throwForm`.
     * @param ctx the parse tree
     */
    exitThrowForm?: (ctx: ThrowFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.breakForm`.
     * @param ctx the parse tree
     */
    enterBreakForm?: (ctx: BreakFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.breakForm`.
     * @param ctx the parse tree
     */
    exitBreakForm?: (ctx: BreakFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.continueForm`.
     * @param ctx the parse tree
     */
    enterContinueForm?: (ctx: ContinueFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.continueForm`.
     * @param ctx the parse tree
     */
    exitContinueForm?: (ctx: ContinueFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.importForm`.
     * @param ctx the parse tree
     */
    enterImportForm?: (ctx: ImportFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.importForm`.
     * @param ctx the parse tree
     */
    exitImportForm?: (ctx: ImportFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.importTypeForm`.
     * @param ctx the parse tree
     */
    enterImportTypeForm?: (ctx: ImportTypeFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.importTypeForm`.
     * @param ctx the parse tree
     */
    exitImportTypeForm?: (ctx: ImportTypeFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.importTypeSpec`.
     * @param ctx the parse tree
     */
    enterImportTypeSpec?: (ctx: ImportTypeSpecContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.importTypeSpec`.
     * @param ctx the parse tree
     */
    exitImportTypeSpec?: (ctx: ImportTypeSpecContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.importTypeName`.
     * @param ctx the parse tree
     */
    enterImportTypeName?: (ctx: ImportTypeNameContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.importTypeName`.
     * @param ctx the parse tree
     */
    exitImportTypeName?: (ctx: ImportTypeNameContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.exportForm`.
     * @param ctx the parse tree
     */
    enterExportForm?: (ctx: ExportFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.exportForm`.
     * @param ctx the parse tree
     */
    exitExportForm?: (ctx: ExportFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.exportBinding`.
     * @param ctx the parse tree
     */
    enterExportBinding?: (ctx: ExportBindingContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.exportBinding`.
     * @param ctx the parse tree
     */
    exitExportBinding?: (ctx: ExportBindingContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.exportDefault`.
     * @param ctx the parse tree
     */
    enterExportDefault?: (ctx: ExportDefaultContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.exportDefault`.
     * @param ctx the parse tree
     */
    exitExportDefault?: (ctx: ExportDefaultContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.exportNamed`.
     * @param ctx the parse tree
     */
    enterExportNamed?: (ctx: ExportNamedContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.exportNamed`.
     * @param ctx the parse tree
     */
    exitExportNamed?: (ctx: ExportNamedContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.exportNamePair`.
     * @param ctx the parse tree
     */
    enterExportNamePair?: (ctx: ExportNamePairContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.exportNamePair`.
     * @param ctx the parse tree
     */
    exitExportNamePair?: (ctx: ExportNamePairContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.exportFrom`.
     * @param ctx the parse tree
     */
    enterExportFrom?: (ctx: ExportFromContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.exportFrom`.
     * @param ctx the parse tree
     */
    exitExportFrom?: (ctx: ExportFromContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.exportAllFrom`.
     * @param ctx the parse tree
     */
    enterExportAllFrom?: (ctx: ExportAllFromContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.exportAllFrom`.
     * @param ctx the parse tree
     */
    exitExportAllFrom?: (ctx: ExportAllFromContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.exportNsFromForm`.
     * @param ctx the parse tree
     */
    enterExportNsFromForm?: (ctx: ExportNsFromFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.exportNsFromForm`.
     * @param ctx the parse tree
     */
    exitExportNsFromForm?: (ctx: ExportNsFromFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.exportTypeForm`.
     * @param ctx the parse tree
     */
    enterExportTypeForm?: (ctx: ExportTypeFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.exportTypeForm`.
     * @param ctx the parse tree
     */
    exitExportTypeForm?: (ctx: ExportTypeFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.exportTypeFromForm`.
     * @param ctx the parse tree
     */
    enterExportTypeFromForm?: (ctx: ExportTypeFromFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.exportTypeFromForm`.
     * @param ctx the parse tree
     */
    exitExportTypeFromForm?: (ctx: ExportTypeFromFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.exportTypeAllFromForm`.
     * @param ctx the parse tree
     */
    enterExportTypeAllFromForm?: (ctx: ExportTypeAllFromFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.exportTypeAllFromForm`.
     * @param ctx the parse tree
     */
    exitExportTypeAllFromForm?: (ctx: ExportTypeAllFromFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.exportDeclForm`.
     * @param ctx the parse tree
     */
    enterExportDeclForm?: (ctx: ExportDeclFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.exportDeclForm`.
     * @param ctx the parse tree
     */
    exitExportDeclForm?: (ctx: ExportDeclFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.starBinding`.
     * @param ctx the parse tree
     */
    enterStarBinding?: (ctx: StarBindingContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.starBinding`.
     * @param ctx the parse tree
     */
    exitStarBinding?: (ctx: StarBindingContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.singleBinding`.
     * @param ctx the parse tree
     */
    enterSingleBinding?: (ctx: SingleBindingContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.singleBinding`.
     * @param ctx the parse tree
     */
    exitSingleBinding?: (ctx: SingleBindingContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.objectDestructPat`.
     * @param ctx the parse tree
     */
    enterObjectDestructPat?: (ctx: ObjectDestructPatContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.objectDestructPat`.
     * @param ctx the parse tree
     */
    exitObjectDestructPat?: (ctx: ObjectDestructPatContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.arrayDestructPat`.
     * @param ctx the parse tree
     */
    enterArrayDestructPat?: (ctx: ArrayDestructPatContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.arrayDestructPat`.
     * @param ctx the parse tree
     */
    exitArrayDestructPat?: (ctx: ArrayDestructPatContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.typeExpr`.
     * @param ctx the parse tree
     */
    enterTypeExpr?: (ctx: TypeExprContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.typeExpr`.
     * @param ctx the parse tree
     */
    exitTypeExpr?: (ctx: TypeExprContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.typeUnion`.
     * @param ctx the parse tree
     */
    enterTypeUnion?: (ctx: TypeUnionContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.typeUnion`.
     * @param ctx the parse tree
     */
    exitTypeUnion?: (ctx: TypeUnionContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.typeIntersection`.
     * @param ctx the parse tree
     */
    enterTypeIntersection?: (ctx: TypeIntersectionContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.typeIntersection`.
     * @param ctx the parse tree
     */
    exitTypeIntersection?: (ctx: TypeIntersectionContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.typeArray`.
     * @param ctx the parse tree
     */
    enterTypeArray?: (ctx: TypeArrayContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.typeArray`.
     * @param ctx the parse tree
     */
    exitTypeArray?: (ctx: TypeArrayContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.typeTuple`.
     * @param ctx the parse tree
     */
    enterTypeTuple?: (ctx: TypeTupleContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.typeTuple`.
     * @param ctx the parse tree
     */
    exitTypeTuple?: (ctx: TypeTupleContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.typeTupleElement`.
     * @param ctx the parse tree
     */
    enterTypeTupleElement?: (ctx: TypeTupleElementContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.typeTupleElement`.
     * @param ctx the parse tree
     */
    exitTypeTupleElement?: (ctx: TypeTupleElementContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.typeFunction`.
     * @param ctx the parse tree
     */
    enterTypeFunction?: (ctx: TypeFunctionContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.typeFunction`.
     * @param ctx the parse tree
     */
    exitTypeFunction?: (ctx: TypeFunctionContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.typeFnParam`.
     * @param ctx the parse tree
     */
    enterTypeFnParam?: (ctx: TypeFnParamContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.typeFnParam`.
     * @param ctx the parse tree
     */
    exitTypeFnParam?: (ctx: TypeFnParamContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.typeObject`.
     * @param ctx the parse tree
     */
    enterTypeObject?: (ctx: TypeObjectContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.typeObject`.
     * @param ctx the parse tree
     */
    exitTypeObject?: (ctx: TypeObjectContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.typeProp`.
     * @param ctx the parse tree
     */
    enterTypeProp?: (ctx: TypePropContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.typeProp`.
     * @param ctx the parse tree
     */
    exitTypeProp?: (ctx: TypePropContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.propModifier`.
     * @param ctx the parse tree
     */
    enterPropModifier?: (ctx: PropModifierContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.propModifier`.
     * @param ctx the parse tree
     */
    exitPropModifier?: (ctx: PropModifierContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.typeLiteral`.
     * @param ctx the parse tree
     */
    enterTypeLiteral?: (ctx: TypeLiteralContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.typeLiteral`.
     * @param ctx the parse tree
     */
    exitTypeLiteral?: (ctx: TypeLiteralContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.typeKeyof`.
     * @param ctx the parse tree
     */
    enterTypeKeyof?: (ctx: TypeKeyofContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.typeKeyof`.
     * @param ctx the parse tree
     */
    exitTypeKeyof?: (ctx: TypeKeyofContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.typeTypeof`.
     * @param ctx the parse tree
     */
    enterTypeTypeof?: (ctx: TypeTypeofContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.typeTypeof`.
     * @param ctx the parse tree
     */
    exitTypeTypeof?: (ctx: TypeTypeofContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.typeIndexAccess`.
     * @param ctx the parse tree
     */
    enterTypeIndexAccess?: (ctx: TypeIndexAccessContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.typeIndexAccess`.
     * @param ctx the parse tree
     */
    exitTypeIndexAccess?: (ctx: TypeIndexAccessContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.typeConditional`.
     * @param ctx the parse tree
     */
    enterTypeConditional?: (ctx: TypeConditionalContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.typeConditional`.
     * @param ctx the parse tree
     */
    exitTypeConditional?: (ctx: TypeConditionalContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.typeInfer`.
     * @param ctx the parse tree
     */
    enterTypeInfer?: (ctx: TypeInferContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.typeInfer`.
     * @param ctx the parse tree
     */
    exitTypeInfer?: (ctx: TypeInferContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.typeMapped`.
     * @param ctx the parse tree
     */
    enterTypeMapped?: (ctx: TypeMappedContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.typeMapped`.
     * @param ctx the parse tree
     */
    exitTypeMapped?: (ctx: TypeMappedContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.mappedModifiers`.
     * @param ctx the parse tree
     */
    enterMappedModifiers?: (ctx: MappedModifiersContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.mappedModifiers`.
     * @param ctx the parse tree
     */
    exitMappedModifiers?: (ctx: MappedModifiersContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.mappedModifier`.
     * @param ctx the parse tree
     */
    enterMappedModifier?: (ctx: MappedModifierContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.mappedModifier`.
     * @param ctx the parse tree
     */
    exitMappedModifier?: (ctx: MappedModifierContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.typeTemplateLiteral`.
     * @param ctx the parse tree
     */
    enterTypeTemplateLiteral?: (ctx: TypeTemplateLiteralContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.typeTemplateLiteral`.
     * @param ctx the parse tree
     */
    exitTypeTemplateLiteral?: (ctx: TypeTemplateLiteralContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.templatePart`.
     * @param ctx the parse tree
     */
    enterTemplatePart?: (ctx: TemplatePartContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.templatePart`.
     * @param ctx the parse tree
     */
    exitTemplatePart?: (ctx: TemplatePartContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.typeApplication`.
     * @param ctx the parse tree
     */
    enterTypeApplication?: (ctx: TypeApplicationContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.typeApplication`.
     * @param ctx the parse tree
     */
    exitTypeApplication?: (ctx: TypeApplicationContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.typeParams`.
     * @param ctx the parse tree
     */
    enterTypeParams?: (ctx: TypeParamsContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.typeParams`.
     * @param ctx the parse tree
     */
    exitTypeParams?: (ctx: TypeParamsContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.typeParamDecl`.
     * @param ctx the parse tree
     */
    enterTypeParamDecl?: (ctx: TypeParamDeclContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.typeParamDecl`.
     * @param ctx the parse tree
     */
    exitTypeParamDecl?: (ctx: TypeParamDeclContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.typeParamConstraint`.
     * @param ctx the parse tree
     */
    enterTypeParamConstraint?: (ctx: TypeParamConstraintContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.typeParamConstraint`.
     * @param ctx the parse tree
     */
    exitTypeParamConstraint?: (ctx: TypeParamConstraintContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.typeParamDefault`.
     * @param ctx the parse tree
     */
    enterTypeParamDefault?: (ctx: TypeParamDefaultContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.typeParamDefault`.
     * @param ctx the parse tree
     */
    exitTypeParamDefault?: (ctx: TypeParamDefaultContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.assign`.
     * @param ctx the parse tree
     */
    enterAssign?: (ctx: AssignContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.assign`.
     * @param ctx the parse tree
     */
    exitAssign?: (ctx: AssignContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.compoundAssign`.
     * @param ctx the parse tree
     */
    enterCompoundAssign?: (ctx: CompoundAssignContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.compoundAssign`.
     * @param ctx the parse tree
     */
    exitCompoundAssign?: (ctx: CompoundAssignContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.subscriptAssign`.
     * @param ctx the parse tree
     */
    enterSubscriptAssign?: (ctx: SubscriptAssignContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.subscriptAssign`.
     * @param ctx the parse tree
     */
    exitSubscriptAssign?: (ctx: SubscriptAssignContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.switchForm`.
     * @param ctx the parse tree
     */
    enterSwitchForm?: (ctx: SwitchFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.switchForm`.
     * @param ctx the parse tree
     */
    exitSwitchForm?: (ctx: SwitchFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.caseClause`.
     * @param ctx the parse tree
     */
    enterCaseClause?: (ctx: CaseClauseContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.caseClause`.
     * @param ctx the parse tree
     */
    exitCaseClause?: (ctx: CaseClauseContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.defaultClause`.
     * @param ctx the parse tree
     */
    enterDefaultClause?: (ctx: DefaultClauseContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.defaultClause`.
     * @param ctx the parse tree
     */
    exitDefaultClause?: (ctx: DefaultClauseContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.forForm`.
     * @param ctx the parse tree
     */
    enterForForm?: (ctx: ForFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.forForm`.
     * @param ctx the parse tree
     */
    exitForForm?: (ctx: ForFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.forInForm`.
     * @param ctx the parse tree
     */
    enterForInForm?: (ctx: ForInFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.forInForm`.
     * @param ctx the parse tree
     */
    exitForInForm?: (ctx: ForInFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.forOfForm`.
     * @param ctx the parse tree
     */
    enterForOfForm?: (ctx: ForOfFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.forOfForm`.
     * @param ctx the parse tree
     */
    exitForOfForm?: (ctx: ForOfFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.forAwaitForm`.
     * @param ctx the parse tree
     */
    enterForAwaitForm?: (ctx: ForAwaitFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.forAwaitForm`.
     * @param ctx the parse tree
     */
    exitForAwaitForm?: (ctx: ForAwaitFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.exceptForm`.
     * @param ctx the parse tree
     */
    enterExceptForm?: (ctx: ExceptFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.exceptForm`.
     * @param ctx the parse tree
     */
    exitExceptForm?: (ctx: ExceptFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.tryClause`.
     * @param ctx the parse tree
     */
    enterTryClause?: (ctx: TryClauseContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.tryClause`.
     * @param ctx the parse tree
     */
    exitTryClause?: (ctx: TryClauseContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.catchClause`.
     * @param ctx the parse tree
     */
    enterCatchClause?: (ctx: CatchClauseContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.catchClause`.
     * @param ctx the parse tree
     */
    exitCatchClause?: (ctx: CatchClauseContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.finallyClause`.
     * @param ctx the parse tree
     */
    enterFinallyClause?: (ctx: FinallyClauseContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.finallyClause`.
     * @param ctx the parse tree
     */
    exitFinallyClause?: (ctx: FinallyClauseContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.expression`.
     * @param ctx the parse tree
     */
    enterExpression?: (ctx: ExpressionContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.expression`.
     * @param ctx the parse tree
     */
    exitExpression?: (ctx: ExpressionContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.thisExpr`.
     * @param ctx the parse tree
     */
    enterThisExpr?: (ctx: ThisExprContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.thisExpr`.
     * @param ctx the parse tree
     */
    exitThisExpr?: (ctx: ThisExprContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.superExpr`.
     * @param ctx the parse tree
     */
    enterSuperExpr?: (ctx: SuperExprContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.superExpr`.
     * @param ctx the parse tree
     */
    exitSuperExpr?: (ctx: SuperExprContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.superConstructorCall`.
     * @param ctx the parse tree
     */
    enterSuperConstructorCall?: (ctx: SuperConstructorCallContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.superConstructorCall`.
     * @param ctx the parse tree
     */
    exitSuperConstructorCall?: (ctx: SuperConstructorCallContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.superMethodCall`.
     * @param ctx the parse tree
     */
    enterSuperMethodCall?: (ctx: SuperMethodCallContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.superMethodCall`.
     * @param ctx the parse tree
     */
    exitSuperMethodCall?: (ctx: SuperMethodCallContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.typeofExpr`.
     * @param ctx the parse tree
     */
    enterTypeofExpr?: (ctx: TypeofExprContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.typeofExpr`.
     * @param ctx the parse tree
     */
    exitTypeofExpr?: (ctx: TypeofExprContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.typeAssert`.
     * @param ctx the parse tree
     */
    enterTypeAssert?: (ctx: TypeAssertContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.typeAssert`.
     * @param ctx the parse tree
     */
    exitTypeAssert?: (ctx: TypeAssertContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.lambda`.
     * @param ctx the parse tree
     */
    enterLambda?: (ctx: LambdaContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.lambda`.
     * @param ctx the parse tree
     */
    exitLambda?: (ctx: LambdaContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.fn`.
     * @param ctx the parse tree
     */
    enterFn?: (ctx: FnContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.fn`.
     * @param ctx the parse tree
     */
    exitFn?: (ctx: FnContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.asyncLambda`.
     * @param ctx the parse tree
     */
    enterAsyncLambda?: (ctx: AsyncLambdaContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.asyncLambda`.
     * @param ctx the parse tree
     */
    exitAsyncLambda?: (ctx: AsyncLambdaContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.asyncFn`.
     * @param ctx the parse tree
     */
    enterAsyncFn?: (ctx: AsyncFnContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.asyncFn`.
     * @param ctx the parse tree
     */
    exitAsyncFn?: (ctx: AsyncFnContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.generatorFn`.
     * @param ctx the parse tree
     */
    enterGeneratorFn?: (ctx: GeneratorFnContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.generatorFn`.
     * @param ctx the parse tree
     */
    exitGeneratorFn?: (ctx: GeneratorFnContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.asyncGeneratorFn`.
     * @param ctx the parse tree
     */
    enterAsyncGeneratorFn?: (ctx: AsyncGeneratorFnContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.asyncGeneratorFn`.
     * @param ctx the parse tree
     */
    exitAsyncGeneratorFn?: (ctx: AsyncGeneratorFnContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.iifeForm`.
     * @param ctx the parse tree
     */
    enterIifeForm?: (ctx: IifeFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.iifeForm`.
     * @param ctx the parse tree
     */
    exitIifeForm?: (ctx: IifeFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.iifeAsyncForm`.
     * @param ctx the parse tree
     */
    enterIifeAsyncForm?: (ctx: IifeAsyncFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.iifeAsyncForm`.
     * @param ctx the parse tree
     */
    exitIifeAsyncForm?: (ctx: IifeAsyncFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.fnO`.
     * @param ctx the parse tree
     */
    enterFnO?: (ctx: FnOContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.fnO`.
     * @param ctx the parse tree
     */
    exitFnO?: (ctx: FnOContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.lambdaO`.
     * @param ctx the parse tree
     */
    enterLambdaO?: (ctx: LambdaOContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.lambdaO`.
     * @param ctx the parse tree
     */
    exitLambdaO?: (ctx: LambdaOContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.asyncFnO`.
     * @param ctx the parse tree
     */
    enterAsyncFnO?: (ctx: AsyncFnOContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.asyncFnO`.
     * @param ctx the parse tree
     */
    exitAsyncFnO?: (ctx: AsyncFnOContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.asyncLambdaO`.
     * @param ctx the parse tree
     */
    enterAsyncLambdaO?: (ctx: AsyncLambdaOContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.asyncLambdaO`.
     * @param ctx the parse tree
     */
    exitAsyncLambdaO?: (ctx: AsyncLambdaOContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.generatorFnO`.
     * @param ctx the parse tree
     */
    enterGeneratorFnO?: (ctx: GeneratorFnOContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.generatorFnO`.
     * @param ctx the parse tree
     */
    exitGeneratorFnO?: (ctx: GeneratorFnOContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.asyncGeneratorFnO`.
     * @param ctx the parse tree
     */
    enterAsyncGeneratorFnO?: (ctx: AsyncGeneratorFnOContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.asyncGeneratorFnO`.
     * @param ctx the parse tree
     */
    exitAsyncGeneratorFnO?: (ctx: AsyncGeneratorFnOContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.methodO`.
     * @param ctx the parse tree
     */
    enterMethodO?: (ctx: MethodOContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.methodO`.
     * @param ctx the parse tree
     */
    exitMethodO?: (ctx: MethodOContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.abstractMethodO`.
     * @param ctx the parse tree
     */
    enterAbstractMethodO?: (ctx: AbstractMethodOContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.abstractMethodO`.
     * @param ctx the parse tree
     */
    exitAbstractMethodO?: (ctx: AbstractMethodOContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.constructorO`.
     * @param ctx the parse tree
     */
    enterConstructorO?: (ctx: ConstructorOContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.constructorO`.
     * @param ctx the parse tree
     */
    exitConstructorO?: (ctx: ConstructorOContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.fnoSignature`.
     * @param ctx the parse tree
     */
    enterFnoSignature?: (ctx: FnoSignatureContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.fnoSignature`.
     * @param ctx the parse tree
     */
    exitFnoSignature?: (ctx: FnoSignatureContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.fnoParam`.
     * @param ctx the parse tree
     */
    enterFnoParam?: (ctx: FnoParamContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.fnoParam`.
     * @param ctx the parse tree
     */
    exitFnoParam?: (ctx: FnoParamContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.fnoRestParam`.
     * @param ctx the parse tree
     */
    enterFnoRestParam?: (ctx: FnoRestParamContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.fnoRestParam`.
     * @param ctx the parse tree
     */
    exitFnoRestParam?: (ctx: FnoRestParamContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.awaitExpr`.
     * @param ctx the parse tree
     */
    enterAwaitExpr?: (ctx: AwaitExprContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.awaitExpr`.
     * @param ctx the parse tree
     */
    exitAwaitExpr?: (ctx: AwaitExprContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.yieldExpr`.
     * @param ctx the parse tree
     */
    enterYieldExpr?: (ctx: YieldExprContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.yieldExpr`.
     * @param ctx the parse tree
     */
    exitYieldExpr?: (ctx: YieldExprContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.yieldStarExpr`.
     * @param ctx the parse tree
     */
    enterYieldStarExpr?: (ctx: YieldStarExprContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.yieldStarExpr`.
     * @param ctx the parse tree
     */
    exitYieldStarExpr?: (ctx: YieldStarExprContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.bindExpr`.
     * @param ctx the parse tree
     */
    enterBindExpr?: (ctx: BindExprContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.bindExpr`.
     * @param ctx the parse tree
     */
    exitBindExpr?: (ctx: BindExprContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.methodCallExpr`.
     * @param ctx the parse tree
     */
    enterMethodCallExpr?: (ctx: MethodCallExprContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.methodCallExpr`.
     * @param ctx the parse tree
     */
    exitMethodCallExpr?: (ctx: MethodCallExprContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.ternary`.
     * @param ctx the parse tree
     */
    enterTernary?: (ctx: TernaryContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.ternary`.
     * @param ctx the parse tree
     */
    exitTernary?: (ctx: TernaryContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.condExpr`.
     * @param ctx the parse tree
     */
    enterCondExpr?: (ctx: CondExprContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.condExpr`.
     * @param ctx the parse tree
     */
    exitCondExpr?: (ctx: CondExprContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.condClause`.
     * @param ctx the parse tree
     */
    enterCondClause?: (ctx: CondClauseContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.condClause`.
     * @param ctx the parse tree
     */
    exitCondClause?: (ctx: CondClauseContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.condElseClause`.
     * @param ctx the parse tree
     */
    enterCondElseClause?: (ctx: CondElseClauseContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.condElseClause`.
     * @param ctx the parse tree
     */
    exitCondElseClause?: (ctx: CondElseClauseContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.newForm`.
     * @param ctx the parse tree
     */
    enterNewForm?: (ctx: NewFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.newForm`.
     * @param ctx the parse tree
     */
    exitNewForm?: (ctx: NewFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.objectExpr`.
     * @param ctx the parse tree
     */
    enterObjectExpr?: (ctx: ObjectExprContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.objectExpr`.
     * @param ctx the parse tree
     */
    exitObjectExpr?: (ctx: ObjectExprContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.objectField`.
     * @param ctx the parse tree
     */
    enterObjectField?: (ctx: ObjectFieldContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.objectField`.
     * @param ctx the parse tree
     */
    exitObjectField?: (ctx: ObjectFieldContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.methodDef`.
     * @param ctx the parse tree
     */
    enterMethodDef?: (ctx: MethodDefContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.methodDef`.
     * @param ctx the parse tree
     */
    exitMethodDef?: (ctx: MethodDefContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.arrayExpr`.
     * @param ctx the parse tree
     */
    enterArrayExpr?: (ctx: ArrayExprContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.arrayExpr`.
     * @param ctx the parse tree
     */
    exitArrayExpr?: (ctx: ArrayExprContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.bracketArrayExpr`.
     * @param ctx the parse tree
     */
    enterBracketArrayExpr?: (ctx: BracketArrayExprContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.bracketArrayExpr`.
     * @param ctx the parse tree
     */
    exitBracketArrayExpr?: (ctx: BracketArrayExprContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.braceObjectExpr`.
     * @param ctx the parse tree
     */
    enterBraceObjectExpr?: (ctx: BraceObjectExprContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.braceObjectExpr`.
     * @param ctx the parse tree
     */
    exitBraceObjectExpr?: (ctx: BraceObjectExprContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.braceObjectField`.
     * @param ctx the parse tree
     */
    enterBraceObjectField?: (ctx: BraceObjectFieldContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.braceObjectField`.
     * @param ctx the parse tree
     */
    exitBraceObjectField?: (ctx: BraceObjectFieldContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.templateExpr`.
     * @param ctx the parse tree
     */
    enterTemplateExpr?: (ctx: TemplateExprContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.templateExpr`.
     * @param ctx the parse tree
     */
    exitTemplateExpr?: (ctx: TemplateExprContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.propKey`.
     * @param ctx the parse tree
     */
    enterPropKey?: (ctx: PropKeyContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.propKey`.
     * @param ctx the parse tree
     */
    exitPropKey?: (ctx: PropKeyContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.opSymbol`.
     * @param ctx the parse tree
     */
    enterOpSymbol?: (ctx: OpSymbolContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.opSymbol`.
     * @param ctx the parse tree
     */
    exitOpSymbol?: (ctx: OpSymbolContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.propAccess`.
     * @param ctx the parse tree
     */
    enterPropAccess?: (ctx: PropAccessContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.propAccess`.
     * @param ctx the parse tree
     */
    exitPropAccess?: (ctx: PropAccessContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.subscriptAccess`.
     * @param ctx the parse tree
     */
    enterSubscriptAccess?: (ctx: SubscriptAccessContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.subscriptAccess`.
     * @param ctx the parse tree
     */
    exitSubscriptAccess?: (ctx: SubscriptAccessContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.indexAccess`.
     * @param ctx the parse tree
     */
    enterIndexAccess?: (ctx: IndexAccessContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.indexAccess`.
     * @param ctx the parse tree
     */
    exitIndexAccess?: (ctx: IndexAccessContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.quasiquote`.
     * @param ctx the parse tree
     */
    enterQuasiquote?: (ctx: QuasiquoteContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.quasiquote`.
     * @param ctx the parse tree
     */
    exitQuasiquote?: (ctx: QuasiquoteContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.quasiForm`.
     * @param ctx the parse tree
     */
    enterQuasiForm?: (ctx: QuasiFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.quasiForm`.
     * @param ctx the parse tree
     */
    exitQuasiForm?: (ctx: QuasiFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.sForm`.
     * @param ctx the parse tree
     */
    enterSForm?: (ctx: SFormContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.sForm`.
     * @param ctx the parse tree
     */
    exitSForm?: (ctx: SFormContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.unquote`.
     * @param ctx the parse tree
     */
    enterUnquote?: (ctx: UnquoteContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.unquote`.
     * @param ctx the parse tree
     */
    exitUnquote?: (ctx: UnquoteContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.unquoteSplicing`.
     * @param ctx the parse tree
     */
    enterUnquoteSplicing?: (ctx: UnquoteSplicingContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.unquoteSplicing`.
     * @param ctx the parse tree
     */
    exitUnquoteSplicing?: (ctx: UnquoteSplicingContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.tildeUnquote`.
     * @param ctx the parse tree
     */
    enterTildeUnquote?: (ctx: TildeUnquoteContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.tildeUnquote`.
     * @param ctx the parse tree
     */
    exitTildeUnquote?: (ctx: TildeUnquoteContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.tildeUnquoteSplice`.
     * @param ctx the parse tree
     */
    enterTildeUnquoteSplice?: (ctx: TildeUnquoteSpliceContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.tildeUnquoteSplice`.
     * @param ctx the parse tree
     */
    exitTildeUnquoteSplice?: (ctx: TildeUnquoteSpliceContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.optChain`.
     * @param ctx the parse tree
     */
    enterOptChain?: (ctx: OptChainContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.optChain`.
     * @param ctx the parse tree
     */
    exitOptChain?: (ctx: OptChainContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.optChainIndex`.
     * @param ctx the parse tree
     */
    enterOptChainIndex?: (ctx: OptChainIndexContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.optChainIndex`.
     * @param ctx the parse tree
     */
    exitOptChainIndex?: (ctx: OptChainIndexContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.nullCoalesce`.
     * @param ctx the parse tree
     */
    enterNullCoalesce?: (ctx: NullCoalesceContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.nullCoalesce`.
     * @param ctx the parse tree
     */
    exitNullCoalesce?: (ctx: NullCoalesceContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.infixExpr`.
     * @param ctx the parse tree
     */
    enterInfixExpr?: (ctx: InfixExprContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.infixExpr`.
     * @param ctx the parse tree
     */
    exitInfixExpr?: (ctx: InfixExprContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.infixBody`.
     * @param ctx the parse tree
     */
    enterInfixBody?: (ctx: InfixBodyContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.infixBody`.
     * @param ctx the parse tree
     */
    exitInfixBody?: (ctx: InfixBodyContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.infixAtom`.
     * @param ctx the parse tree
     */
    enterInfixAtom?: (ctx: InfixAtomContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.infixAtom`.
     * @param ctx the parse tree
     */
    exitInfixAtom?: (ctx: InfixAtomContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.infixArgs`.
     * @param ctx the parse tree
     */
    enterInfixArgs?: (ctx: InfixArgsContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.infixArgs`.
     * @param ctx the parse tree
     */
    exitInfixArgs?: (ctx: InfixArgsContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.infixUnaryOp`.
     * @param ctx the parse tree
     */
    enterInfixUnaryOp?: (ctx: InfixUnaryOpContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.infixUnaryOp`.
     * @param ctx the parse tree
     */
    exitInfixUnaryOp?: (ctx: InfixUnaryOpContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.infixBinOp`.
     * @param ctx the parse tree
     */
    enterInfixBinOp?: (ctx: InfixBinOpContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.infixBinOp`.
     * @param ctx the parse tree
     */
    exitInfixBinOp?: (ctx: InfixBinOpContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.macroExprCall`.
     * @param ctx the parse tree
     */
    enterMacroExprCall?: (ctx: MacroExprCallContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.macroExprCall`.
     * @param ctx the parse tree
     */
    exitMacroExprCall?: (ctx: MacroExprCallContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.macroBodyCall`.
     * @param ctx the parse tree
     */
    enterMacroBodyCall?: (ctx: MacroBodyCallContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.macroBodyCall`.
     * @param ctx the parse tree
     */
    exitMacroBodyCall?: (ctx: MacroBodyCallContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.call`.
     * @param ctx the parse tree
     */
    enterCall?: (ctx: CallContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.call`.
     * @param ctx the parse tree
     */
    exitCall?: (ctx: CallContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.typeArgs`.
     * @param ctx the parse tree
     */
    enterTypeArgs?: (ctx: TypeArgsContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.typeArgs`.
     * @param ctx the parse tree
     */
    exitTypeArgs?: (ctx: TypeArgsContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.fnSignature`.
     * @param ctx the parse tree
     */
    enterFnSignature?: (ctx: FnSignatureContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.fnSignature`.
     * @param ctx the parse tree
     */
    exitFnSignature?: (ctx: FnSignatureContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.param`.
     * @param ctx the parse tree
     */
    enterParam?: (ctx: ParamContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.param`.
     * @param ctx the parse tree
     */
    exitParam?: (ctx: ParamContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.restParam`.
     * @param ctx the parse tree
     */
    enterRestParam?: (ctx: RestParamContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.restParam`.
     * @param ctx the parse tree
     */
    exitRestParam?: (ctx: RestParamContext) => void;
    /**
     * Enter a parse tree produced by `Stage10Parser.literal`.
     * @param ctx the parse tree
     */
    enterLiteral?: (ctx: LiteralContext) => void;
    /**
     * Exit a parse tree produced by `Stage10Parser.literal`.
     * @param ctx the parse tree
     */
    exitLiteral?: (ctx: LiteralContext) => void;

    visitTerminal(node: TerminalNode): void {}
    visitErrorNode(node: ErrorNode): void {}
    enterEveryRule(node: ParserRuleContext): void {}
    exitEveryRule(node: ParserRuleContext): void {}
}

