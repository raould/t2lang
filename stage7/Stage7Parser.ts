
import * as antlr from "antlr4ng";
import { Token } from "antlr4ng";

import { Stage7Listener } from "./Stage7Listener.js";
// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;


export class Stage7Parser extends antlr.Parser {
    public static readonly COMMENT = 1;
    public static readonly LPAREN = 2;
    public static readonly RPAREN = 3;
    public static readonly COMMA = 4;
    public static readonly PROGRAM = 5;
    public static readonly LETSTAR = 6;
    public static readonly LET = 7;
    public static readonly CONSTSTAR = 8;
    public static readonly CONST = 9;
    public static readonly LAMBDA = 10;
    public static readonly FN = 11;
    public static readonly METHOD = 12;
    public static readonly BIND = 13;
    public static readonly METHOD_CALL = 14;
    public static readonly DEFMACRO = 15;
    public static readonly MACRO_TIME_ATTR = 16;
    public static readonly IF = 17;
    public static readonly WHILE = 18;
    public static readonly BEGIN = 19;
    public static readonly RETURN = 20;
    public static readonly THROW = 21;
    public static readonly SET = 22;
    public static readonly TERNARY = 23;
    public static readonly COND = 24;
    public static readonly OBJECT = 25;
    public static readonly TYPE_ARRAY = 26;
    public static readonly ARRAY = 27;
    public static readonly OPTCHAIN_INDEX = 28;
    public static readonly OPTCHAIN = 29;
    public static readonly DOT = 30;
    public static readonly INDEX = 31;
    public static readonly NULLCOAL = 32;
    public static readonly QUASI = 33;
    public static readonly QUOTE = 34;
    public static readonly UNQUOTE_SPLICING = 35;
    public static readonly UNQUOTE = 36;
    public static readonly NEW = 37;
    public static readonly IMPORT = 38;
    public static readonly SWITCH = 39;
    public static readonly CASE = 40;
    public static readonly DEFAULT = 41;
    public static readonly FORIN = 42;
    public static readonly FOROF = 43;
    public static readonly FORAWAIT = 44;
    public static readonly TRY = 45;
    public static readonly CATCH = 46;
    public static readonly FINALLY = 47;
    public static readonly FOR = 48;
    public static readonly CLASS_BODY = 49;
    public static readonly SUPER_METHOD = 50;
    public static readonly ABSTRACT_METHOD = 51;
    public static readonly CLASS = 52;
    public static readonly FIELD = 53;
    public static readonly CONSTRUCTOR = 54;
    public static readonly THIS = 55;
    public static readonly SUPER = 56;
    public static readonly GET = 57;
    public static readonly SETPROP = 58;
    public static readonly IMPLEMENTS = 59;
    public static readonly UNION = 60;
    public static readonly INTERSECT = 61;
    public static readonly TUPLE = 62;
    public static readonly TYPEFN = 63;
    public static readonly LIT = 64;
    public static readonly KEYOF = 65;
    public static readonly TYPEOF = 66;
    public static readonly TYPE_AS = 67;
    public static readonly INFER = 68;
    public static readonly MAPPED = 69;
    public static readonly TYPE_TEMPLATE = 70;
    public static readonly TEMPLATE = 71;
    public static readonly REST = 72;
    public static readonly READONLY = 73;
    public static readonly TYPE_PARAMS = 74;
    public static readonly TYPE_ARGS = 75;
    public static readonly EXTENDS = 76;
    public static readonly RETURNS = 77;
    public static readonly TYPE = 78;
    public static readonly INTERFACE = 79;
    public static readonly MODIFIERS = 80;
    public static readonly OPTIONAL = 81;
    public static readonly BOOLEAN = 82;
    public static readonly NULL = 83;
    public static readonly UNDEFINED = 84;
    public static readonly COLON = 85;
    public static readonly ASYNC_GENERATOR_FN = 86;
    public static readonly ASYNC_LAMBDA = 87;
    public static readonly ASYNC_FN = 88;
    public static readonly GENERATOR_FN = 89;
    public static readonly YIELD_STAR = 90;
    public static readonly YIELD = 91;
    public static readonly AWAIT = 92;
    public static readonly CARET = 93;
    public static readonly LBRACK = 94;
    public static readonly RBRACK = 95;
    public static readonly EXPORT = 96;
    public static readonly EXPORT_DEFAULT = 97;
    public static readonly EXPORT_NAMED = 98;
    public static readonly EXPORT_NS_FROM = 99;
    public static readonly EXPORT_FROM = 100;
    public static readonly EXPORT_ALL_FROM = 101;
    public static readonly IMPORT_TYPE = 102;
    public static readonly EXPORT_TYPE_ALL_FROM = 103;
    public static readonly EXPORT_TYPE_FROM = 104;
    public static readonly EXPORT_TYPE = 105;
    public static readonly KEYWORD = 106;
    public static readonly NUMBER = 107;
    public static readonly STRING = 108;
    public static readonly MULTILINE_STRING = 109;
    public static readonly IDENTIFIER = 110;
    public static readonly WS = 111;
    public static readonly RULE_program = 0;
    public static readonly RULE_topLevel = 1;
    public static readonly RULE_decl = 2;
    public static readonly RULE_defmacro = 3;
    public static readonly RULE_macroTimeFnDef = 4;
    public static readonly RULE_topLevelLet = 5;
    public static readonly RULE_topLevelConst = 6;
    public static readonly RULE_metaAnnotation = 7;
    public static readonly RULE_typeAlias = 8;
    public static readonly RULE_interfaceDef = 9;
    public static readonly RULE_interfaceExtends = 10;
    public static readonly RULE_classDef = 11;
    public static readonly RULE_anonClassDef = 12;
    public static readonly RULE_classExtends = 13;
    public static readonly RULE_classImplements = 14;
    public static readonly RULE_classBody = 15;
    public static readonly RULE_classElement = 16;
    public static readonly RULE_modifier = 17;
    public static readonly RULE_fieldDef = 18;
    public static readonly RULE_constructorDef = 19;
    public static readonly RULE_classMethodDef = 20;
    public static readonly RULE_abstractMethodDef = 21;
    public static readonly RULE_getterDef = 22;
    public static readonly RULE_setterDef = 23;
    public static readonly RULE_methodKey = 24;
    public static readonly RULE_typedParam = 25;
    public static readonly RULE_fnSignatureTyped = 26;
    public static readonly RULE_statement = 27;
    public static readonly RULE_letStar = 28;
    public static readonly RULE_letStmt = 29;
    public static readonly RULE_constStar = 30;
    public static readonly RULE_constStmt = 31;
    public static readonly RULE_ifForm = 32;
    public static readonly RULE_whileForm = 33;
    public static readonly RULE_block = 34;
    public static readonly RULE_returnForm = 35;
    public static readonly RULE_throwForm = 36;
    public static readonly RULE_importForm = 37;
    public static readonly RULE_importTypeForm = 38;
    public static readonly RULE_importTypeSpec = 39;
    public static readonly RULE_importTypeName = 40;
    public static readonly RULE_exportForm = 41;
    public static readonly RULE_exportBinding = 42;
    public static readonly RULE_exportDefault = 43;
    public static readonly RULE_exportNamed = 44;
    public static readonly RULE_exportNamePair = 45;
    public static readonly RULE_exportFrom = 46;
    public static readonly RULE_exportAllFrom = 47;
    public static readonly RULE_exportNsFromForm = 48;
    public static readonly RULE_exportTypeForm = 49;
    public static readonly RULE_exportTypeFromForm = 50;
    public static readonly RULE_exportTypeAllFromForm = 51;
    public static readonly RULE_exportDeclForm = 52;
    public static readonly RULE_starBinding = 53;
    public static readonly RULE_singleBinding = 54;
    public static readonly RULE_typeExpr = 55;
    public static readonly RULE_typeUnion = 56;
    public static readonly RULE_typeIntersection = 57;
    public static readonly RULE_typeArray = 58;
    public static readonly RULE_typeTuple = 59;
    public static readonly RULE_typeTupleElement = 60;
    public static readonly RULE_typeFunction = 61;
    public static readonly RULE_typeFnParam = 62;
    public static readonly RULE_typeObject = 63;
    public static readonly RULE_typeProp = 64;
    public static readonly RULE_propModifier = 65;
    public static readonly RULE_typeLiteral = 66;
    public static readonly RULE_typeKeyof = 67;
    public static readonly RULE_typeTypeof = 68;
    public static readonly RULE_typeIndexAccess = 69;
    public static readonly RULE_typeConditional = 70;
    public static readonly RULE_typeInfer = 71;
    public static readonly RULE_typeMapped = 72;
    public static readonly RULE_mappedModifiers = 73;
    public static readonly RULE_mappedModifier = 74;
    public static readonly RULE_typeTemplateLiteral = 75;
    public static readonly RULE_templatePart = 76;
    public static readonly RULE_typeApplication = 77;
    public static readonly RULE_typeParams = 78;
    public static readonly RULE_typeParamDecl = 79;
    public static readonly RULE_typeParamConstraint = 80;
    public static readonly RULE_typeParamDefault = 81;
    public static readonly RULE_assign = 82;
    public static readonly RULE_switchForm = 83;
    public static readonly RULE_caseClause = 84;
    public static readonly RULE_defaultClause = 85;
    public static readonly RULE_forForm = 86;
    public static readonly RULE_forInForm = 87;
    public static readonly RULE_forOfForm = 88;
    public static readonly RULE_forAwaitForm = 89;
    public static readonly RULE_tryForm = 90;
    public static readonly RULE_catchClause = 91;
    public static readonly RULE_finallyClause = 92;
    public static readonly RULE_expression = 93;
    public static readonly RULE_thisExpr = 94;
    public static readonly RULE_superExpr = 95;
    public static readonly RULE_superConstructorCall = 96;
    public static readonly RULE_superMethodCall = 97;
    public static readonly RULE_typeofExpr = 98;
    public static readonly RULE_typeAssert = 99;
    public static readonly RULE_lambda = 100;
    public static readonly RULE_fn = 101;
    public static readonly RULE_asyncLambda = 102;
    public static readonly RULE_asyncFn = 103;
    public static readonly RULE_generatorFn = 104;
    public static readonly RULE_asyncGeneratorFn = 105;
    public static readonly RULE_awaitExpr = 106;
    public static readonly RULE_yieldExpr = 107;
    public static readonly RULE_yieldStarExpr = 108;
    public static readonly RULE_bindExpr = 109;
    public static readonly RULE_methodCallExpr = 110;
    public static readonly RULE_ternary = 111;
    public static readonly RULE_condExpr = 112;
    public static readonly RULE_newForm = 113;
    public static readonly RULE_objectExpr = 114;
    public static readonly RULE_objectField = 115;
    public static readonly RULE_methodDef = 116;
    public static readonly RULE_arrayExpr = 117;
    public static readonly RULE_templateExpr = 118;
    public static readonly RULE_propKey = 119;
    public static readonly RULE_propAccess = 120;
    public static readonly RULE_indexAccess = 121;
    public static readonly RULE_quasiquote = 122;
    public static readonly RULE_quasiForm = 123;
    public static readonly RULE_unquote = 124;
    public static readonly RULE_unquoteSplicing = 125;
    public static readonly RULE_optChain = 126;
    public static readonly RULE_optChainIndex = 127;
    public static readonly RULE_nullCoalesce = 128;
    public static readonly RULE_call = 129;
    public static readonly RULE_typeArgs = 130;
    public static readonly RULE_fnSignature = 131;
    public static readonly RULE_param = 132;
    public static readonly RULE_restParam = 133;
    public static readonly RULE_literal = 134;

    public static readonly literalNames = [
        null, null, "'('", "')'", "','", "'program'", "'let*'", "'let'", 
        "'const*'", "'const'", "'lambda'", "'fn'", "'method'", "'bind'", 
        "'method-call'", "'defmacro'", "'#[macro-time]'", "'if'", "'while'", 
        "'begin'", "'return'", "'throw'", "'set!'", "'ternary'", "'cond'", 
        "'object'", "'type-array'", "'array'", "'optchain-index'", "'.?'", 
        "'.'", "'index'", "'??'", "'quasi'", "'quote'", "'unquote-splicing'", 
        "'unquote'", "'new'", "'import'", "'switch'", "'case'", "'default'", 
        "'for-in'", "'for-of'", "'for-await'", "'try'", "'catch'", "'finally'", 
        "'for'", "'class-body'", "'super-method'", "'abstract-method'", 
        "'class'", "'field'", "'constructor'", "'this'", "'super'", "'get'", 
        "'set'", "'implements'", "'union'", "'intersect'", "'tuple'", "'tfn'", 
        "'tlit'", "'keyof'", "'typeof'", "'type-as'", "'infer'", "'mapped'", 
        "'type-template'", "'template'", "'rest'", "'readonly'", "'type-params'", 
        "'type-args'", "'extends'", "'returns'", "'type'", "'interface'", 
        "'modifiers'", "'?'", null, "'null'", "'undefined'", "':'", "'async-generator-fn'", 
        "'async-lambda'", "'async-fn'", "'generator-fn'", "'yield*'", "'yield'", 
        "'await'", "'^'", "'['", "']'", "'export'", "'export-default'", 
        "'export-named'", "'export-ns-from'", "'export-from'", "'export-all-from'", 
        "'import-type'", "'export-type-all-from'", "'export-type-from'", 
        "'export-type'"
    ];

    public static readonly symbolicNames = [
        null, "COMMENT", "LPAREN", "RPAREN", "COMMA", "PROGRAM", "LETSTAR", 
        "LET", "CONSTSTAR", "CONST", "LAMBDA", "FN", "METHOD", "BIND", "METHOD_CALL", 
        "DEFMACRO", "MACRO_TIME_ATTR", "IF", "WHILE", "BEGIN", "RETURN", 
        "THROW", "SET", "TERNARY", "COND", "OBJECT", "TYPE_ARRAY", "ARRAY", 
        "OPTCHAIN_INDEX", "OPTCHAIN", "DOT", "INDEX", "NULLCOAL", "QUASI", 
        "QUOTE", "UNQUOTE_SPLICING", "UNQUOTE", "NEW", "IMPORT", "SWITCH", 
        "CASE", "DEFAULT", "FORIN", "FOROF", "FORAWAIT", "TRY", "CATCH", 
        "FINALLY", "FOR", "CLASS_BODY", "SUPER_METHOD", "ABSTRACT_METHOD", 
        "CLASS", "FIELD", "CONSTRUCTOR", "THIS", "SUPER", "GET", "SETPROP", 
        "IMPLEMENTS", "UNION", "INTERSECT", "TUPLE", "TYPEFN", "LIT", "KEYOF", 
        "TYPEOF", "TYPE_AS", "INFER", "MAPPED", "TYPE_TEMPLATE", "TEMPLATE", 
        "REST", "READONLY", "TYPE_PARAMS", "TYPE_ARGS", "EXTENDS", "RETURNS", 
        "TYPE", "INTERFACE", "MODIFIERS", "OPTIONAL", "BOOLEAN", "NULL", 
        "UNDEFINED", "COLON", "ASYNC_GENERATOR_FN", "ASYNC_LAMBDA", "ASYNC_FN", 
        "GENERATOR_FN", "YIELD_STAR", "YIELD", "AWAIT", "CARET", "LBRACK", 
        "RBRACK", "EXPORT", "EXPORT_DEFAULT", "EXPORT_NAMED", "EXPORT_NS_FROM", 
        "EXPORT_FROM", "EXPORT_ALL_FROM", "IMPORT_TYPE", "EXPORT_TYPE_ALL_FROM", 
        "EXPORT_TYPE_FROM", "EXPORT_TYPE", "KEYWORD", "NUMBER", "STRING", 
        "MULTILINE_STRING", "IDENTIFIER", "WS"
    ];
    public static readonly ruleNames = [
        "program", "topLevel", "decl", "defmacro", "macroTimeFnDef", "topLevelLet", 
        "topLevelConst", "metaAnnotation", "typeAlias", "interfaceDef", 
        "interfaceExtends", "classDef", "anonClassDef", "classExtends", 
        "classImplements", "classBody", "classElement", "modifier", "fieldDef", 
        "constructorDef", "classMethodDef", "abstractMethodDef", "getterDef", 
        "setterDef", "methodKey", "typedParam", "fnSignatureTyped", "statement", 
        "letStar", "letStmt", "constStar", "constStmt", "ifForm", "whileForm", 
        "block", "returnForm", "throwForm", "importForm", "importTypeForm", 
        "importTypeSpec", "importTypeName", "exportForm", "exportBinding", 
        "exportDefault", "exportNamed", "exportNamePair", "exportFrom", 
        "exportAllFrom", "exportNsFromForm", "exportTypeForm", "exportTypeFromForm", 
        "exportTypeAllFromForm", "exportDeclForm", "starBinding", "singleBinding", 
        "typeExpr", "typeUnion", "typeIntersection", "typeArray", "typeTuple", 
        "typeTupleElement", "typeFunction", "typeFnParam", "typeObject", 
        "typeProp", "propModifier", "typeLiteral", "typeKeyof", "typeTypeof", 
        "typeIndexAccess", "typeConditional", "typeInfer", "typeMapped", 
        "mappedModifiers", "mappedModifier", "typeTemplateLiteral", "templatePart", 
        "typeApplication", "typeParams", "typeParamDecl", "typeParamConstraint", 
        "typeParamDefault", "assign", "switchForm", "caseClause", "defaultClause", 
        "forForm", "forInForm", "forOfForm", "forAwaitForm", "tryForm", 
        "catchClause", "finallyClause", "expression", "thisExpr", "superExpr", 
        "superConstructorCall", "superMethodCall", "typeofExpr", "typeAssert", 
        "lambda", "fn", "asyncLambda", "asyncFn", "generatorFn", "asyncGeneratorFn", 
        "awaitExpr", "yieldExpr", "yieldStarExpr", "bindExpr", "methodCallExpr", 
        "ternary", "condExpr", "newForm", "objectExpr", "objectField", "methodDef", 
        "arrayExpr", "templateExpr", "propKey", "propAccess", "indexAccess", 
        "quasiquote", "quasiForm", "unquote", "unquoteSplicing", "optChain", 
        "optChainIndex", "nullCoalesce", "call", "typeArgs", "fnSignature", 
        "param", "restParam", "literal",
    ];

    public get grammarFileName(): string { return "Stage7.g4"; }
    public get literalNames(): (string | null)[] { return Stage7Parser.literalNames; }
    public get symbolicNames(): (string | null)[] { return Stage7Parser.symbolicNames; }
    public get ruleNames(): string[] { return Stage7Parser.ruleNames; }
    public get serializedATN(): number[] { return Stage7Parser._serializedATN; }

    protected createFailedPredicateException(predicate?: string, message?: string): antlr.FailedPredicateException {
        return new antlr.FailedPredicateException(this, predicate, message);
    }

    public constructor(input: antlr.TokenStream) {
        super(input);
        this.interpreter = new antlr.ParserATNSimulator(this, Stage7Parser._ATN, Stage7Parser.decisionsToDFA, new antlr.PredictionContextCache());
    }
    public program(): ProgramContext {
        let localContext = new ProgramContext(this.context, this.state);
        this.enterRule(localContext, 0, Stage7Parser.RULE_program);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 270;
            this.match(Stage7Parser.LPAREN);
            this.state = 271;
            this.match(Stage7Parser.PROGRAM);
            this.state = 275;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 55)) & ~0x1F) === 0 && ((1 << (_la - 55)) & 939524099) !== 0) || ((((_la - 106)) & ~0x1F) === 0 && ((1 << (_la - 106)) & 23) !== 0)) {
                {
                {
                this.state = 272;
                this.topLevel();
                }
                }
                this.state = 277;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 278;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public topLevel(): TopLevelContext {
        let localContext = new TopLevelContext(this.context, this.state);
        this.enterRule(localContext, 2, Stage7Parser.RULE_topLevel);
        try {
            this.state = 289;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 1, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 280;
                this.defmacro();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 281;
                this.macroTimeFnDef();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 282;
                this.topLevelLet();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 283;
                this.topLevelConst();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 284;
                this.typeAlias();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 285;
                this.interfaceDef();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 286;
                this.classDef();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 287;
                this.exportDeclForm();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 288;
                this.statement();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public decl(): DeclContext {
        let localContext = new DeclContext(this.context, this.state);
        this.enterRule(localContext, 4, Stage7Parser.RULE_decl);
        try {
            this.state = 296;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 2, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 291;
                this.topLevelLet();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 292;
                this.topLevelConst();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 293;
                this.classDef();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 294;
                this.interfaceDef();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 295;
                this.typeAlias();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public defmacro(): DefmacroContext {
        let localContext = new DefmacroContext(this.context, this.state);
        this.enterRule(localContext, 6, Stage7Parser.RULE_defmacro);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 298;
            this.match(Stage7Parser.LPAREN);
            this.state = 299;
            this.match(Stage7Parser.DEFMACRO);
            this.state = 300;
            this.match(Stage7Parser.IDENTIFIER);
            this.state = 301;
            this.fnSignature();
            this.state = 305;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 55)) & ~0x1F) === 0 && ((1 << (_la - 55)) & 939524099) !== 0) || ((((_la - 106)) & ~0x1F) === 0 && ((1 << (_la - 106)) & 23) !== 0)) {
                {
                {
                this.state = 302;
                this.statement();
                }
                }
                this.state = 307;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 308;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public macroTimeFnDef(): MacroTimeFnDefContext {
        let localContext = new MacroTimeFnDefContext(this.context, this.state);
        this.enterRule(localContext, 8, Stage7Parser.RULE_macroTimeFnDef);
        try {
            this.state = 320;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 4, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 310;
                this.match(Stage7Parser.LPAREN);
                this.state = 311;
                this.match(Stage7Parser.MACRO_TIME_ATTR);
                this.state = 312;
                this.topLevelLet();
                this.state = 313;
                this.match(Stage7Parser.RPAREN);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 315;
                this.match(Stage7Parser.LPAREN);
                this.state = 316;
                this.match(Stage7Parser.MACRO_TIME_ATTR);
                this.state = 317;
                this.topLevelConst();
                this.state = 318;
                this.match(Stage7Parser.RPAREN);
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public topLevelLet(): TopLevelLetContext {
        let localContext = new TopLevelLetContext(this.context, this.state);
        this.enterRule(localContext, 10, Stage7Parser.RULE_topLevelLet);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 322;
            this.match(Stage7Parser.LPAREN);
            this.state = 323;
            this.match(Stage7Parser.LET);
            this.state = 327;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 93) {
                {
                {
                this.state = 324;
                this.metaAnnotation();
                }
                }
                this.state = 329;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 330;
            this.match(Stage7Parser.IDENTIFIER);
            this.state = 331;
            this.expression();
            this.state = 332;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public topLevelConst(): TopLevelConstContext {
        let localContext = new TopLevelConstContext(this.context, this.state);
        this.enterRule(localContext, 12, Stage7Parser.RULE_topLevelConst);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 334;
            this.match(Stage7Parser.LPAREN);
            this.state = 335;
            this.match(Stage7Parser.CONST);
            this.state = 339;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 93) {
                {
                {
                this.state = 336;
                this.metaAnnotation();
                }
                }
                this.state = 341;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 342;
            this.match(Stage7Parser.IDENTIFIER);
            this.state = 343;
            this.expression();
            this.state = 344;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public metaAnnotation(): MetaAnnotationContext {
        let localContext = new MetaAnnotationContext(this.context, this.state);
        this.enterRule(localContext, 14, Stage7Parser.RULE_metaAnnotation);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 346;
            this.match(Stage7Parser.CARET);
            this.state = 347;
            this.match(Stage7Parser.KEYWORD);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public typeAlias(): TypeAliasContext {
        let localContext = new TypeAliasContext(this.context, this.state);
        this.enterRule(localContext, 16, Stage7Parser.RULE_typeAlias);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 349;
            this.match(Stage7Parser.LPAREN);
            this.state = 350;
            this.match(Stage7Parser.TYPE);
            this.state = 351;
            this.match(Stage7Parser.IDENTIFIER);
            this.state = 353;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 7, this.context) ) {
            case 1:
                {
                this.state = 352;
                this.typeParams();
                }
                break;
            }
            this.state = 355;
            this.typeExpr();
            this.state = 356;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public interfaceDef(): InterfaceDefContext {
        let localContext = new InterfaceDefContext(this.context, this.state);
        this.enterRule(localContext, 18, Stage7Parser.RULE_interfaceDef);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 358;
            this.match(Stage7Parser.LPAREN);
            this.state = 359;
            this.match(Stage7Parser.INTERFACE);
            this.state = 360;
            this.match(Stage7Parser.IDENTIFIER);
            this.state = 362;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 8, this.context) ) {
            case 1:
                {
                this.state = 361;
                this.typeParams();
                }
                break;
            }
            this.state = 365;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 9, this.context) ) {
            case 1:
                {
                this.state = 364;
                this.interfaceExtends();
                }
                break;
            }
            this.state = 367;
            this.typeObject();
            this.state = 368;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public interfaceExtends(): InterfaceExtendsContext {
        let localContext = new InterfaceExtendsContext(this.context, this.state);
        this.enterRule(localContext, 20, Stage7Parser.RULE_interfaceExtends);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 370;
            this.match(Stage7Parser.LPAREN);
            this.state = 371;
            this.match(Stage7Parser.EXTENDS);
            this.state = 373;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 372;
                this.typeExpr();
                }
                }
                this.state = 375;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 110);
            this.state = 377;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public classDef(): ClassDefContext {
        let localContext = new ClassDefContext(this.context, this.state);
        this.enterRule(localContext, 22, Stage7Parser.RULE_classDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 379;
            this.match(Stage7Parser.LPAREN);
            this.state = 380;
            this.match(Stage7Parser.CLASS);
            this.state = 384;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 106) {
                {
                {
                this.state = 381;
                this.modifier();
                }
                }
                this.state = 386;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 387;
            this.match(Stage7Parser.IDENTIFIER);
            this.state = 389;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 12, this.context) ) {
            case 1:
                {
                this.state = 388;
                this.typeParams();
                }
                break;
            }
            this.state = 392;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 13, this.context) ) {
            case 1:
                {
                this.state = 391;
                this.classExtends();
                }
                break;
            }
            this.state = 395;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 14, this.context) ) {
            case 1:
                {
                this.state = 394;
                this.classImplements();
                }
                break;
            }
            this.state = 397;
            this.classBody();
            this.state = 398;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public anonClassDef(): AnonClassDefContext {
        let localContext = new AnonClassDefContext(this.context, this.state);
        this.enterRule(localContext, 24, Stage7Parser.RULE_anonClassDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 400;
            this.match(Stage7Parser.LPAREN);
            this.state = 401;
            this.match(Stage7Parser.CLASS);
            this.state = 405;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 106) {
                {
                {
                this.state = 402;
                this.modifier();
                }
                }
                this.state = 407;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 409;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 16, this.context) ) {
            case 1:
                {
                this.state = 408;
                this.classExtends();
                }
                break;
            }
            this.state = 412;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 17, this.context) ) {
            case 1:
                {
                this.state = 411;
                this.classImplements();
                }
                break;
            }
            this.state = 414;
            this.classBody();
            this.state = 415;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public classExtends(): ClassExtendsContext {
        let localContext = new ClassExtendsContext(this.context, this.state);
        this.enterRule(localContext, 26, Stage7Parser.RULE_classExtends);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 417;
            this.match(Stage7Parser.LPAREN);
            this.state = 418;
            this.match(Stage7Parser.EXTENDS);
            this.state = 419;
            this.typeExpr();
            this.state = 420;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public classImplements(): ClassImplementsContext {
        let localContext = new ClassImplementsContext(this.context, this.state);
        this.enterRule(localContext, 28, Stage7Parser.RULE_classImplements);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 422;
            this.match(Stage7Parser.LPAREN);
            this.state = 423;
            this.match(Stage7Parser.IMPLEMENTS);
            this.state = 425;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 424;
                this.typeExpr();
                }
                }
                this.state = 427;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 110);
            this.state = 429;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public classBody(): ClassBodyContext {
        let localContext = new ClassBodyContext(this.context, this.state);
        this.enterRule(localContext, 30, Stage7Parser.RULE_classBody);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 431;
            this.match(Stage7Parser.LPAREN);
            this.state = 432;
            this.match(Stage7Parser.CLASS_BODY);
            this.state = 436;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 433;
                this.classElement();
                }
                }
                this.state = 438;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 439;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public classElement(): ClassElementContext {
        let localContext = new ClassElementContext(this.context, this.state);
        this.enterRule(localContext, 32, Stage7Parser.RULE_classElement);
        try {
            this.state = 447;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 20, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 441;
                this.fieldDef();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 442;
                this.constructorDef();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 443;
                this.classMethodDef();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 444;
                this.abstractMethodDef();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 445;
                this.getterDef();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 446;
                this.setterDef();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public modifier(): ModifierContext {
        let localContext = new ModifierContext(this.context, this.state);
        this.enterRule(localContext, 34, Stage7Parser.RULE_modifier);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 449;
            this.match(Stage7Parser.KEYWORD);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public fieldDef(): FieldDefContext {
        let localContext = new FieldDefContext(this.context, this.state);
        this.enterRule(localContext, 36, Stage7Parser.RULE_fieldDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 451;
            this.match(Stage7Parser.LPAREN);
            this.state = 452;
            this.match(Stage7Parser.FIELD);
            this.state = 456;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 106) {
                {
                {
                this.state = 453;
                this.modifier();
                }
                }
                this.state = 458;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 459;
            this.match(Stage7Parser.IDENTIFIER);
            this.state = 462;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 85) {
                {
                this.state = 460;
                this.match(Stage7Parser.COLON);
                this.state = 461;
                this.typeExpr();
                }
            }

            this.state = 465;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2 || ((((_la - 55)) & ~0x1F) === 0 && ((1 << (_la - 55)) & 939524099) !== 0) || ((((_la - 106)) & ~0x1F) === 0 && ((1 << (_la - 106)) & 23) !== 0)) {
                {
                this.state = 464;
                this.expression();
                }
            }

            this.state = 467;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public constructorDef(): ConstructorDefContext {
        let localContext = new ConstructorDefContext(this.context, this.state);
        this.enterRule(localContext, 38, Stage7Parser.RULE_constructorDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 469;
            this.match(Stage7Parser.LPAREN);
            this.state = 470;
            this.match(Stage7Parser.CONSTRUCTOR);
            this.state = 471;
            this.fnSignatureTyped();
            this.state = 475;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 55)) & ~0x1F) === 0 && ((1 << (_la - 55)) & 939524099) !== 0) || ((((_la - 106)) & ~0x1F) === 0 && ((1 << (_la - 106)) & 23) !== 0)) {
                {
                {
                this.state = 472;
                this.statement();
                }
                }
                this.state = 477;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 478;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public classMethodDef(): ClassMethodDefContext {
        let localContext = new ClassMethodDefContext(this.context, this.state);
        this.enterRule(localContext, 40, Stage7Parser.RULE_classMethodDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 480;
            this.match(Stage7Parser.LPAREN);
            this.state = 481;
            this.match(Stage7Parser.METHOD);
            this.state = 485;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 106) {
                {
                {
                this.state = 482;
                this.modifier();
                }
                }
                this.state = 487;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 488;
            this.methodKey();
            this.state = 489;
            this.fnSignatureTyped();
            this.state = 493;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 55)) & ~0x1F) === 0 && ((1 << (_la - 55)) & 939524099) !== 0) || ((((_la - 106)) & ~0x1F) === 0 && ((1 << (_la - 106)) & 23) !== 0)) {
                {
                {
                this.state = 490;
                this.statement();
                }
                }
                this.state = 495;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 496;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public abstractMethodDef(): AbstractMethodDefContext {
        let localContext = new AbstractMethodDefContext(this.context, this.state);
        this.enterRule(localContext, 42, Stage7Parser.RULE_abstractMethodDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 498;
            this.match(Stage7Parser.LPAREN);
            this.state = 499;
            this.match(Stage7Parser.ABSTRACT_METHOD);
            this.state = 503;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 106) {
                {
                {
                this.state = 500;
                this.modifier();
                }
                }
                this.state = 505;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 506;
            this.methodKey();
            this.state = 507;
            this.fnSignatureTyped();
            this.state = 508;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public getterDef(): GetterDefContext {
        let localContext = new GetterDefContext(this.context, this.state);
        this.enterRule(localContext, 44, Stage7Parser.RULE_getterDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 510;
            this.match(Stage7Parser.LPAREN);
            this.state = 511;
            this.match(Stage7Parser.GET);
            this.state = 515;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 106) {
                {
                {
                this.state = 512;
                this.modifier();
                }
                }
                this.state = 517;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 518;
            this.methodKey();
            this.state = 519;
            this.fnSignatureTyped();
            this.state = 523;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 55)) & ~0x1F) === 0 && ((1 << (_la - 55)) & 939524099) !== 0) || ((((_la - 106)) & ~0x1F) === 0 && ((1 << (_la - 106)) & 23) !== 0)) {
                {
                {
                this.state = 520;
                this.statement();
                }
                }
                this.state = 525;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 526;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public setterDef(): SetterDefContext {
        let localContext = new SetterDefContext(this.context, this.state);
        this.enterRule(localContext, 46, Stage7Parser.RULE_setterDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 528;
            this.match(Stage7Parser.LPAREN);
            this.state = 529;
            this.match(Stage7Parser.SETPROP);
            this.state = 533;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 106) {
                {
                {
                this.state = 530;
                this.modifier();
                }
                }
                this.state = 535;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 536;
            this.methodKey();
            this.state = 537;
            this.fnSignatureTyped();
            this.state = 541;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 55)) & ~0x1F) === 0 && ((1 << (_la - 55)) & 939524099) !== 0) || ((((_la - 106)) & ~0x1F) === 0 && ((1 << (_la - 106)) & 23) !== 0)) {
                {
                {
                this.state = 538;
                this.statement();
                }
                }
                this.state = 543;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 544;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public methodKey(): MethodKeyContext {
        let localContext = new MethodKeyContext(this.context, this.state);
        this.enterRule(localContext, 48, Stage7Parser.RULE_methodKey);
        try {
            this.state = 551;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case Stage7Parser.IDENTIFIER:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 546;
                this.match(Stage7Parser.IDENTIFIER);
                }
                break;
            case Stage7Parser.LBRACK:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 547;
                this.match(Stage7Parser.LBRACK);
                this.state = 548;
                this.expression();
                this.state = 549;
                this.match(Stage7Parser.RBRACK);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public typedParam(): TypedParamContext {
        let localContext = new TypedParamContext(this.context, this.state);
        this.enterRule(localContext, 50, Stage7Parser.RULE_typedParam);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 553;
            this.match(Stage7Parser.LPAREN);
            this.state = 554;
            this.match(Stage7Parser.IDENTIFIER);
            this.state = 556;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 81) {
                {
                this.state = 555;
                this.match(Stage7Parser.OPTIONAL);
                }
            }

            this.state = 560;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 85) {
                {
                this.state = 558;
                this.match(Stage7Parser.COLON);
                this.state = 559;
                this.typeExpr();
                }
            }

            this.state = 562;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public fnSignatureTyped(): FnSignatureTypedContext {
        let localContext = new FnSignatureTypedContext(this.context, this.state);
        this.enterRule(localContext, 52, Stage7Parser.RULE_fnSignatureTyped);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 564;
            this.match(Stage7Parser.LPAREN);
            this.state = 575;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2) {
                {
                this.state = 565;
                this.typedParam();
                this.state = 572;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 2 || _la === 4) {
                    {
                    {
                    this.state = 567;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    if (_la === 4) {
                        {
                        this.state = 566;
                        this.match(Stage7Parser.COMMA);
                        }
                    }

                    this.state = 569;
                    this.typedParam();
                    }
                    }
                    this.state = 574;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
            }

            this.state = 577;
            this.match(Stage7Parser.RPAREN);
            this.state = 583;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 38, this.context) ) {
            case 1:
                {
                this.state = 578;
                this.match(Stage7Parser.LPAREN);
                this.state = 579;
                this.match(Stage7Parser.RETURNS);
                this.state = 580;
                this.typeExpr();
                this.state = 581;
                this.match(Stage7Parser.RPAREN);
                }
                break;
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public statement(): StatementContext {
        let localContext = new StatementContext(this.context, this.state);
        this.enterRule(localContext, 54, Stage7Parser.RULE_statement);
        try {
            this.state = 605;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 39, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 585;
                this.letStar();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 586;
                this.letStmt();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 587;
                this.constStar();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 588;
                this.constStmt();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 589;
                this.ifForm();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 590;
                this.whileForm();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 591;
                this.tryForm();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 592;
                this.block();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 593;
                this.returnForm();
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 594;
                this.throwForm();
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 595;
                this.importForm();
                }
                break;
            case 12:
                this.enterOuterAlt(localContext, 12);
                {
                this.state = 596;
                this.importTypeForm();
                }
                break;
            case 13:
                this.enterOuterAlt(localContext, 13);
                {
                this.state = 597;
                this.exportForm();
                }
                break;
            case 14:
                this.enterOuterAlt(localContext, 14);
                {
                this.state = 598;
                this.switchForm();
                }
                break;
            case 15:
                this.enterOuterAlt(localContext, 15);
                {
                this.state = 599;
                this.forForm();
                }
                break;
            case 16:
                this.enterOuterAlt(localContext, 16);
                {
                this.state = 600;
                this.forInForm();
                }
                break;
            case 17:
                this.enterOuterAlt(localContext, 17);
                {
                this.state = 601;
                this.forOfForm();
                }
                break;
            case 18:
                this.enterOuterAlt(localContext, 18);
                {
                this.state = 602;
                this.forAwaitForm();
                }
                break;
            case 19:
                this.enterOuterAlt(localContext, 19);
                {
                this.state = 603;
                this.assign();
                }
                break;
            case 20:
                this.enterOuterAlt(localContext, 20);
                {
                this.state = 604;
                this.expression();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public letStar(): LetStarContext {
        let localContext = new LetStarContext(this.context, this.state);
        this.enterRule(localContext, 56, Stage7Parser.RULE_letStar);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 607;
            this.match(Stage7Parser.LPAREN);
            this.state = 608;
            this.match(Stage7Parser.LETSTAR);
            this.state = 609;
            this.match(Stage7Parser.LPAREN);
            this.state = 613;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 610;
                this.starBinding();
                }
                }
                this.state = 615;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 616;
            this.match(Stage7Parser.RPAREN);
            this.state = 620;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 55)) & ~0x1F) === 0 && ((1 << (_la - 55)) & 939524099) !== 0) || ((((_la - 106)) & ~0x1F) === 0 && ((1 << (_la - 106)) & 23) !== 0)) {
                {
                {
                this.state = 617;
                this.statement();
                }
                }
                this.state = 622;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 623;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public letStmt(): LetStmtContext {
        let localContext = new LetStmtContext(this.context, this.state);
        this.enterRule(localContext, 58, Stage7Parser.RULE_letStmt);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 625;
            this.match(Stage7Parser.LPAREN);
            this.state = 626;
            this.match(Stage7Parser.LET);
            this.state = 627;
            this.singleBinding();
            this.state = 628;
            this.expression();
            this.state = 629;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public constStar(): ConstStarContext {
        let localContext = new ConstStarContext(this.context, this.state);
        this.enterRule(localContext, 60, Stage7Parser.RULE_constStar);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 631;
            this.match(Stage7Parser.LPAREN);
            this.state = 632;
            this.match(Stage7Parser.CONSTSTAR);
            this.state = 633;
            this.match(Stage7Parser.LPAREN);
            this.state = 637;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 634;
                this.starBinding();
                }
                }
                this.state = 639;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 640;
            this.match(Stage7Parser.RPAREN);
            this.state = 644;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 55)) & ~0x1F) === 0 && ((1 << (_la - 55)) & 939524099) !== 0) || ((((_la - 106)) & ~0x1F) === 0 && ((1 << (_la - 106)) & 23) !== 0)) {
                {
                {
                this.state = 641;
                this.statement();
                }
                }
                this.state = 646;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 647;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public constStmt(): ConstStmtContext {
        let localContext = new ConstStmtContext(this.context, this.state);
        this.enterRule(localContext, 62, Stage7Parser.RULE_constStmt);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 649;
            this.match(Stage7Parser.LPAREN);
            this.state = 650;
            this.match(Stage7Parser.CONST);
            this.state = 651;
            this.singleBinding();
            this.state = 652;
            this.expression();
            this.state = 653;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public ifForm(): IfFormContext {
        let localContext = new IfFormContext(this.context, this.state);
        this.enterRule(localContext, 64, Stage7Parser.RULE_ifForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 655;
            this.match(Stage7Parser.LPAREN);
            this.state = 656;
            this.match(Stage7Parser.IF);
            this.state = 657;
            this.expression();
            this.state = 658;
            this.statement();
            this.state = 660;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2 || ((((_la - 55)) & ~0x1F) === 0 && ((1 << (_la - 55)) & 939524099) !== 0) || ((((_la - 106)) & ~0x1F) === 0 && ((1 << (_la - 106)) & 23) !== 0)) {
                {
                this.state = 659;
                this.statement();
                }
            }

            this.state = 662;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public whileForm(): WhileFormContext {
        let localContext = new WhileFormContext(this.context, this.state);
        this.enterRule(localContext, 66, Stage7Parser.RULE_whileForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 664;
            this.match(Stage7Parser.LPAREN);
            this.state = 665;
            this.match(Stage7Parser.WHILE);
            this.state = 666;
            this.expression();
            this.state = 670;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 55)) & ~0x1F) === 0 && ((1 << (_la - 55)) & 939524099) !== 0) || ((((_la - 106)) & ~0x1F) === 0 && ((1 << (_la - 106)) & 23) !== 0)) {
                {
                {
                this.state = 667;
                this.statement();
                }
                }
                this.state = 672;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 673;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public block(): BlockContext {
        let localContext = new BlockContext(this.context, this.state);
        this.enterRule(localContext, 68, Stage7Parser.RULE_block);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 675;
            this.match(Stage7Parser.LPAREN);
            this.state = 676;
            this.match(Stage7Parser.BEGIN);
            this.state = 680;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 55)) & ~0x1F) === 0 && ((1 << (_la - 55)) & 939524099) !== 0) || ((((_la - 106)) & ~0x1F) === 0 && ((1 << (_la - 106)) & 23) !== 0)) {
                {
                {
                this.state = 677;
                this.statement();
                }
                }
                this.state = 682;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 683;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public returnForm(): ReturnFormContext {
        let localContext = new ReturnFormContext(this.context, this.state);
        this.enterRule(localContext, 70, Stage7Parser.RULE_returnForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 685;
            this.match(Stage7Parser.LPAREN);
            this.state = 686;
            this.match(Stage7Parser.RETURN);
            this.state = 688;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2 || ((((_la - 55)) & ~0x1F) === 0 && ((1 << (_la - 55)) & 939524099) !== 0) || ((((_la - 106)) & ~0x1F) === 0 && ((1 << (_la - 106)) & 23) !== 0)) {
                {
                this.state = 687;
                this.expression();
                }
            }

            this.state = 690;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public throwForm(): ThrowFormContext {
        let localContext = new ThrowFormContext(this.context, this.state);
        this.enterRule(localContext, 72, Stage7Parser.RULE_throwForm);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 692;
            this.match(Stage7Parser.LPAREN);
            this.state = 693;
            this.match(Stage7Parser.THROW);
            this.state = 694;
            this.expression();
            this.state = 695;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public importForm(): ImportFormContext {
        let localContext = new ImportFormContext(this.context, this.state);
        this.enterRule(localContext, 74, Stage7Parser.RULE_importForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 697;
            this.match(Stage7Parser.LPAREN);
            this.state = 698;
            this.match(Stage7Parser.IMPORT);
            this.state = 700;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2) {
                {
                this.state = 699;
                this.objectExpr();
                }
            }

            this.state = 702;
            this.match(Stage7Parser.STRING);
            this.state = 703;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public importTypeForm(): ImportTypeFormContext {
        let localContext = new ImportTypeFormContext(this.context, this.state);
        this.enterRule(localContext, 76, Stage7Parser.RULE_importTypeForm);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 705;
            this.match(Stage7Parser.LPAREN);
            this.state = 706;
            this.match(Stage7Parser.IMPORT_TYPE);
            this.state = 707;
            this.importTypeSpec();
            this.state = 708;
            this.match(Stage7Parser.STRING);
            this.state = 709;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public importTypeSpec(): ImportTypeSpecContext {
        let localContext = new ImportTypeSpecContext(this.context, this.state);
        this.enterRule(localContext, 78, Stage7Parser.RULE_importTypeSpec);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 711;
            this.match(Stage7Parser.LPAREN);
            this.state = 712;
            this.match(Stage7Parser.IDENTIFIER);
            this.state = 714;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 713;
                this.importTypeName();
                }
                }
                this.state = 716;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 110);
            this.state = 718;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public importTypeName(): ImportTypeNameContext {
        let localContext = new ImportTypeNameContext(this.context, this.state);
        this.enterRule(localContext, 80, Stage7Parser.RULE_importTypeName);
        try {
            this.state = 725;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case Stage7Parser.IDENTIFIER:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 720;
                this.match(Stage7Parser.IDENTIFIER);
                }
                break;
            case Stage7Parser.LPAREN:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 721;
                this.match(Stage7Parser.LPAREN);
                this.state = 722;
                this.match(Stage7Parser.IDENTIFIER);
                this.state = 723;
                this.match(Stage7Parser.IDENTIFIER);
                this.state = 724;
                this.match(Stage7Parser.RPAREN);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public exportForm(): ExportFormContext {
        let localContext = new ExportFormContext(this.context, this.state);
        this.enterRule(localContext, 82, Stage7Parser.RULE_exportForm);
        try {
            this.state = 736;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 51, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 727;
                this.exportBinding();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 728;
                this.exportDefault();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 729;
                this.exportNamed();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 730;
                this.exportNsFromForm();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 731;
                this.exportFrom();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 732;
                this.exportAllFrom();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 733;
                this.exportTypeForm();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 734;
                this.exportTypeFromForm();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 735;
                this.exportTypeAllFromForm();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public exportBinding(): ExportBindingContext {
        let localContext = new ExportBindingContext(this.context, this.state);
        this.enterRule(localContext, 84, Stage7Parser.RULE_exportBinding);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 738;
            this.match(Stage7Parser.LPAREN);
            this.state = 739;
            this.match(Stage7Parser.EXPORT);
            this.state = 740;
            this.match(Stage7Parser.IDENTIFIER);
            this.state = 741;
            this.expression();
            this.state = 742;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public exportDefault(): ExportDefaultContext {
        let localContext = new ExportDefaultContext(this.context, this.state);
        this.enterRule(localContext, 86, Stage7Parser.RULE_exportDefault);
        try {
            this.state = 769;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 52, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 744;
                this.match(Stage7Parser.LPAREN);
                this.state = 745;
                this.match(Stage7Parser.EXPORT_DEFAULT);
                this.state = 746;
                this.classDef();
                this.state = 747;
                this.match(Stage7Parser.RPAREN);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 749;
                this.match(Stage7Parser.LPAREN);
                this.state = 750;
                this.match(Stage7Parser.EXPORT_DEFAULT);
                this.state = 751;
                this.anonClassDef();
                this.state = 752;
                this.match(Stage7Parser.RPAREN);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 754;
                this.match(Stage7Parser.LPAREN);
                this.state = 755;
                this.match(Stage7Parser.EXPORT_DEFAULT);
                this.state = 756;
                this.topLevelLet();
                this.state = 757;
                this.match(Stage7Parser.RPAREN);
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 759;
                this.match(Stage7Parser.LPAREN);
                this.state = 760;
                this.match(Stage7Parser.EXPORT_DEFAULT);
                this.state = 761;
                this.topLevelConst();
                this.state = 762;
                this.match(Stage7Parser.RPAREN);
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 764;
                this.match(Stage7Parser.LPAREN);
                this.state = 765;
                this.match(Stage7Parser.EXPORT_DEFAULT);
                this.state = 766;
                this.expression();
                this.state = 767;
                this.match(Stage7Parser.RPAREN);
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public exportNamed(): ExportNamedContext {
        let localContext = new ExportNamedContext(this.context, this.state);
        this.enterRule(localContext, 88, Stage7Parser.RULE_exportNamed);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 771;
            this.match(Stage7Parser.LPAREN);
            this.state = 772;
            this.match(Stage7Parser.EXPORT_NAMED);
            this.state = 774;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 773;
                this.exportNamePair();
                }
                }
                this.state = 776;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2);
            this.state = 778;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public exportNamePair(): ExportNamePairContext {
        let localContext = new ExportNamePairContext(this.context, this.state);
        this.enterRule(localContext, 90, Stage7Parser.RULE_exportNamePair);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 780;
            this.match(Stage7Parser.LPAREN);
            this.state = 781;
            this.match(Stage7Parser.IDENTIFIER);
            this.state = 783;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 110) {
                {
                this.state = 782;
                this.match(Stage7Parser.IDENTIFIER);
                }
            }

            this.state = 785;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public exportFrom(): ExportFromContext {
        let localContext = new ExportFromContext(this.context, this.state);
        this.enterRule(localContext, 92, Stage7Parser.RULE_exportFrom);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 787;
            this.match(Stage7Parser.LPAREN);
            this.state = 788;
            this.match(Stage7Parser.EXPORT_FROM);
            this.state = 789;
            this.match(Stage7Parser.STRING);
            this.state = 791;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 790;
                this.exportNamePair();
                }
                }
                this.state = 793;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2);
            this.state = 795;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public exportAllFrom(): ExportAllFromContext {
        let localContext = new ExportAllFromContext(this.context, this.state);
        this.enterRule(localContext, 94, Stage7Parser.RULE_exportAllFrom);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 797;
            this.match(Stage7Parser.LPAREN);
            this.state = 798;
            this.match(Stage7Parser.EXPORT_ALL_FROM);
            this.state = 799;
            this.match(Stage7Parser.STRING);
            this.state = 800;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public exportNsFromForm(): ExportNsFromFormContext {
        let localContext = new ExportNsFromFormContext(this.context, this.state);
        this.enterRule(localContext, 96, Stage7Parser.RULE_exportNsFromForm);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 802;
            this.match(Stage7Parser.LPAREN);
            this.state = 803;
            this.match(Stage7Parser.EXPORT_NS_FROM);
            this.state = 804;
            this.match(Stage7Parser.STRING);
            this.state = 805;
            this.match(Stage7Parser.STRING);
            this.state = 806;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public exportTypeForm(): ExportTypeFormContext {
        let localContext = new ExportTypeFormContext(this.context, this.state);
        this.enterRule(localContext, 98, Stage7Parser.RULE_exportTypeForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 808;
            this.match(Stage7Parser.LPAREN);
            this.state = 809;
            this.match(Stage7Parser.EXPORT_TYPE);
            this.state = 811;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 810;
                this.exportNamePair();
                }
                }
                this.state = 813;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2);
            this.state = 815;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public exportTypeFromForm(): ExportTypeFromFormContext {
        let localContext = new ExportTypeFromFormContext(this.context, this.state);
        this.enterRule(localContext, 100, Stage7Parser.RULE_exportTypeFromForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 817;
            this.match(Stage7Parser.LPAREN);
            this.state = 818;
            this.match(Stage7Parser.EXPORT_TYPE_FROM);
            this.state = 819;
            this.match(Stage7Parser.STRING);
            this.state = 821;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 820;
                this.exportNamePair();
                }
                }
                this.state = 823;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2);
            this.state = 825;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public exportTypeAllFromForm(): ExportTypeAllFromFormContext {
        let localContext = new ExportTypeAllFromFormContext(this.context, this.state);
        this.enterRule(localContext, 102, Stage7Parser.RULE_exportTypeAllFromForm);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 827;
            this.match(Stage7Parser.LPAREN);
            this.state = 828;
            this.match(Stage7Parser.EXPORT_TYPE_ALL_FROM);
            this.state = 829;
            this.match(Stage7Parser.STRING);
            this.state = 830;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public exportDeclForm(): ExportDeclFormContext {
        let localContext = new ExportDeclFormContext(this.context, this.state);
        this.enterRule(localContext, 104, Stage7Parser.RULE_exportDeclForm);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 832;
            this.match(Stage7Parser.LPAREN);
            this.state = 833;
            this.match(Stage7Parser.EXPORT);
            this.state = 834;
            this.decl();
            this.state = 835;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public starBinding(): StarBindingContext {
        let localContext = new StarBindingContext(this.context, this.state);
        this.enterRule(localContext, 106, Stage7Parser.RULE_starBinding);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 837;
            this.match(Stage7Parser.LPAREN);
            this.state = 838;
            this.match(Stage7Parser.IDENTIFIER);
            this.state = 841;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 85) {
                {
                this.state = 839;
                this.match(Stage7Parser.COLON);
                this.state = 840;
                this.typeExpr();
                }
            }

            this.state = 843;
            this.expression();
            this.state = 844;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public singleBinding(): SingleBindingContext {
        let localContext = new SingleBindingContext(this.context, this.state);
        this.enterRule(localContext, 108, Stage7Parser.RULE_singleBinding);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 846;
            this.match(Stage7Parser.LPAREN);
            this.state = 847;
            this.match(Stage7Parser.IDENTIFIER);
            this.state = 850;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 85) {
                {
                this.state = 848;
                this.match(Stage7Parser.COLON);
                this.state = 849;
                this.typeExpr();
                }
            }

            this.state = 852;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public typeExpr(): TypeExprContext {
        let localContext = new TypeExprContext(this.context, this.state);
        this.enterRule(localContext, 110, Stage7Parser.RULE_typeExpr);
        try {
            this.state = 870;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 60, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 854;
                this.match(Stage7Parser.IDENTIFIER);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 855;
                this.typeUnion();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 856;
                this.typeIntersection();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 857;
                this.typeArray();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 858;
                this.typeTuple();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 859;
                this.typeFunction();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 860;
                this.typeObject();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 861;
                this.typeLiteral();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 862;
                this.typeKeyof();
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 863;
                this.typeTypeof();
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 864;
                this.typeIndexAccess();
                }
                break;
            case 12:
                this.enterOuterAlt(localContext, 12);
                {
                this.state = 865;
                this.typeConditional();
                }
                break;
            case 13:
                this.enterOuterAlt(localContext, 13);
                {
                this.state = 866;
                this.typeInfer();
                }
                break;
            case 14:
                this.enterOuterAlt(localContext, 14);
                {
                this.state = 867;
                this.typeMapped();
                }
                break;
            case 15:
                this.enterOuterAlt(localContext, 15);
                {
                this.state = 868;
                this.typeTemplateLiteral();
                }
                break;
            case 16:
                this.enterOuterAlt(localContext, 16);
                {
                this.state = 869;
                this.typeApplication();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public typeUnion(): TypeUnionContext {
        let localContext = new TypeUnionContext(this.context, this.state);
        this.enterRule(localContext, 112, Stage7Parser.RULE_typeUnion);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 872;
            this.match(Stage7Parser.LPAREN);
            this.state = 873;
            this.match(Stage7Parser.UNION);
            this.state = 875;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 874;
                this.typeExpr();
                }
                }
                this.state = 877;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 110);
            this.state = 879;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public typeIntersection(): TypeIntersectionContext {
        let localContext = new TypeIntersectionContext(this.context, this.state);
        this.enterRule(localContext, 114, Stage7Parser.RULE_typeIntersection);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 881;
            this.match(Stage7Parser.LPAREN);
            this.state = 882;
            this.match(Stage7Parser.INTERSECT);
            this.state = 884;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 883;
                this.typeExpr();
                }
                }
                this.state = 886;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 110);
            this.state = 888;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public typeArray(): TypeArrayContext {
        let localContext = new TypeArrayContext(this.context, this.state);
        this.enterRule(localContext, 116, Stage7Parser.RULE_typeArray);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 890;
            this.match(Stage7Parser.LPAREN);
            this.state = 891;
            this.match(Stage7Parser.TYPE_ARRAY);
            this.state = 892;
            this.typeExpr();
            this.state = 893;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public typeTuple(): TypeTupleContext {
        let localContext = new TypeTupleContext(this.context, this.state);
        this.enterRule(localContext, 118, Stage7Parser.RULE_typeTuple);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 895;
            this.match(Stage7Parser.LPAREN);
            this.state = 896;
            this.match(Stage7Parser.TUPLE);
            this.state = 898;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 897;
                this.typeTupleElement();
                }
                }
                this.state = 900;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 110);
            this.state = 902;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public typeTupleElement(): TypeTupleElementContext {
        let localContext = new TypeTupleElementContext(this.context, this.state);
        this.enterRule(localContext, 120, Stage7Parser.RULE_typeTupleElement);
        try {
            this.state = 915;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 64, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 904;
                this.match(Stage7Parser.LPAREN);
                this.state = 905;
                this.match(Stage7Parser.REST);
                this.state = 906;
                this.typeExpr();
                this.state = 907;
                this.match(Stage7Parser.RPAREN);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 909;
                this.match(Stage7Parser.LPAREN);
                this.state = 910;
                this.match(Stage7Parser.IDENTIFIER);
                this.state = 911;
                this.typeExpr();
                this.state = 912;
                this.match(Stage7Parser.RPAREN);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 914;
                this.typeExpr();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public typeFunction(): TypeFunctionContext {
        let localContext = new TypeFunctionContext(this.context, this.state);
        this.enterRule(localContext, 122, Stage7Parser.RULE_typeFunction);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 917;
            this.match(Stage7Parser.LPAREN);
            this.state = 918;
            this.match(Stage7Parser.TYPEFN);
            this.state = 920;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 65, this.context) ) {
            case 1:
                {
                this.state = 919;
                this.typeParams();
                }
                break;
            }
            this.state = 922;
            this.match(Stage7Parser.LPAREN);
            this.state = 926;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 923;
                this.typeFnParam();
                }
                }
                this.state = 928;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 929;
            this.match(Stage7Parser.RPAREN);
            this.state = 930;
            this.typeExpr();
            this.state = 931;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public typeFnParam(): TypeFnParamContext {
        let localContext = new TypeFnParamContext(this.context, this.state);
        this.enterRule(localContext, 124, Stage7Parser.RULE_typeFnParam);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 933;
            this.match(Stage7Parser.LPAREN);
            this.state = 934;
            this.match(Stage7Parser.IDENTIFIER);
            this.state = 936;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 81) {
                {
                this.state = 935;
                this.match(Stage7Parser.OPTIONAL);
                }
            }

            this.state = 938;
            this.typeExpr();
            this.state = 939;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public typeObject(): TypeObjectContext {
        let localContext = new TypeObjectContext(this.context, this.state);
        this.enterRule(localContext, 126, Stage7Parser.RULE_typeObject);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 941;
            this.match(Stage7Parser.LPAREN);
            this.state = 942;
            this.match(Stage7Parser.IDENTIFIER);
            this.state = 946;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 943;
                this.typeProp();
                }
                }
                this.state = 948;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 949;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public typeProp(): TypePropContext {
        let localContext = new TypePropContext(this.context, this.state);
        this.enterRule(localContext, 128, Stage7Parser.RULE_typeProp);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 951;
            this.match(Stage7Parser.LPAREN);
            this.state = 955;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 73) {
                {
                {
                this.state = 952;
                this.propModifier();
                }
                }
                this.state = 957;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 958;
            this.match(Stage7Parser.IDENTIFIER);
            this.state = 960;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 81) {
                {
                this.state = 959;
                this.match(Stage7Parser.OPTIONAL);
                }
            }

            this.state = 962;
            this.typeExpr();
            this.state = 963;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public propModifier(): PropModifierContext {
        let localContext = new PropModifierContext(this.context, this.state);
        this.enterRule(localContext, 130, Stage7Parser.RULE_propModifier);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 965;
            this.match(Stage7Parser.READONLY);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public typeLiteral(): TypeLiteralContext {
        let localContext = new TypeLiteralContext(this.context, this.state);
        this.enterRule(localContext, 132, Stage7Parser.RULE_typeLiteral);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 967;
            this.match(Stage7Parser.LPAREN);
            this.state = 968;
            this.match(Stage7Parser.LIT);
            this.state = 969;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 82)) & ~0x1F) === 0 && ((1 << (_la - 82)) & 100663297) !== 0))) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 970;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public typeKeyof(): TypeKeyofContext {
        let localContext = new TypeKeyofContext(this.context, this.state);
        this.enterRule(localContext, 134, Stage7Parser.RULE_typeKeyof);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 972;
            this.match(Stage7Parser.LPAREN);
            this.state = 973;
            this.match(Stage7Parser.KEYOF);
            this.state = 974;
            this.typeExpr();
            this.state = 975;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public typeTypeof(): TypeTypeofContext {
        let localContext = new TypeTypeofContext(this.context, this.state);
        this.enterRule(localContext, 136, Stage7Parser.RULE_typeTypeof);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 977;
            this.match(Stage7Parser.LPAREN);
            this.state = 978;
            this.match(Stage7Parser.TYPEOF);
            this.state = 979;
            this.match(Stage7Parser.IDENTIFIER);
            this.state = 980;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public typeIndexAccess(): TypeIndexAccessContext {
        let localContext = new TypeIndexAccessContext(this.context, this.state);
        this.enterRule(localContext, 138, Stage7Parser.RULE_typeIndexAccess);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 982;
            this.match(Stage7Parser.LPAREN);
            this.state = 983;
            this.match(Stage7Parser.INDEX);
            this.state = 984;
            this.typeExpr();
            this.state = 985;
            this.typeExpr();
            this.state = 986;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public typeConditional(): TypeConditionalContext {
        let localContext = new TypeConditionalContext(this.context, this.state);
        this.enterRule(localContext, 140, Stage7Parser.RULE_typeConditional);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 988;
            this.match(Stage7Parser.LPAREN);
            this.state = 989;
            this.match(Stage7Parser.COND);
            this.state = 990;
            this.typeExpr();
            this.state = 991;
            this.typeExpr();
            this.state = 992;
            this.typeExpr();
            this.state = 993;
            this.typeExpr();
            this.state = 994;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public typeInfer(): TypeInferContext {
        let localContext = new TypeInferContext(this.context, this.state);
        this.enterRule(localContext, 142, Stage7Parser.RULE_typeInfer);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 996;
            this.match(Stage7Parser.LPAREN);
            this.state = 997;
            this.match(Stage7Parser.INFER);
            this.state = 998;
            this.match(Stage7Parser.IDENTIFIER);
            this.state = 999;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public typeMapped(): TypeMappedContext {
        let localContext = new TypeMappedContext(this.context, this.state);
        this.enterRule(localContext, 144, Stage7Parser.RULE_typeMapped);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1001;
            this.match(Stage7Parser.LPAREN);
            this.state = 1002;
            this.match(Stage7Parser.MAPPED);
            this.state = 1003;
            this.match(Stage7Parser.IDENTIFIER);
            this.state = 1004;
            this.typeExpr();
            this.state = 1006;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 71, this.context) ) {
            case 1:
                {
                this.state = 1005;
                this.mappedModifiers();
                }
                break;
            }
            this.state = 1008;
            this.typeExpr();
            this.state = 1009;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public mappedModifiers(): MappedModifiersContext {
        let localContext = new MappedModifiersContext(this.context, this.state);
        this.enterRule(localContext, 146, Stage7Parser.RULE_mappedModifiers);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1011;
            this.match(Stage7Parser.LPAREN);
            this.state = 1012;
            this.match(Stage7Parser.MODIFIERS);
            this.state = 1014;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 1013;
                this.mappedModifier();
                }
                }
                this.state = 1016;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 73 || _la === 81);
            this.state = 1018;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public mappedModifier(): MappedModifierContext {
        let localContext = new MappedModifierContext(this.context, this.state);
        this.enterRule(localContext, 148, Stage7Parser.RULE_mappedModifier);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1020;
            _la = this.tokenStream.LA(1);
            if(!(_la === 73 || _la === 81)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public typeTemplateLiteral(): TypeTemplateLiteralContext {
        let localContext = new TypeTemplateLiteralContext(this.context, this.state);
        this.enterRule(localContext, 150, Stage7Parser.RULE_typeTemplateLiteral);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1022;
            this.match(Stage7Parser.LPAREN);
            this.state = 1023;
            this.match(Stage7Parser.TYPE_TEMPLATE);
            this.state = 1025;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 1024;
                this.templatePart();
                }
                }
                this.state = 1027;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 108 || _la === 110);
            this.state = 1029;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public templatePart(): TemplatePartContext {
        let localContext = new TemplatePartContext(this.context, this.state);
        this.enterRule(localContext, 152, Stage7Parser.RULE_templatePart);
        try {
            this.state = 1033;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case Stage7Parser.STRING:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1031;
                this.match(Stage7Parser.STRING);
                }
                break;
            case Stage7Parser.LPAREN:
            case Stage7Parser.IDENTIFIER:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1032;
                this.typeExpr();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public typeApplication(): TypeApplicationContext {
        let localContext = new TypeApplicationContext(this.context, this.state);
        this.enterRule(localContext, 154, Stage7Parser.RULE_typeApplication);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1035;
            this.match(Stage7Parser.LPAREN);
            this.state = 1036;
            this.typeExpr();
            this.state = 1038;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 1037;
                this.typeExpr();
                }
                }
                this.state = 1040;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 110);
            this.state = 1042;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public typeParams(): TypeParamsContext {
        let localContext = new TypeParamsContext(this.context, this.state);
        this.enterRule(localContext, 156, Stage7Parser.RULE_typeParams);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1044;
            this.match(Stage7Parser.LPAREN);
            this.state = 1045;
            this.match(Stage7Parser.TYPE_PARAMS);
            this.state = 1047;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 1046;
                this.typeParamDecl();
                }
                }
                this.state = 1049;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 110);
            this.state = 1051;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public typeParamDecl(): TypeParamDeclContext {
        let localContext = new TypeParamDeclContext(this.context, this.state);
        this.enterRule(localContext, 158, Stage7Parser.RULE_typeParamDecl);
        let _la: number;
        try {
            this.state = 1063;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case Stage7Parser.IDENTIFIER:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1053;
                this.match(Stage7Parser.IDENTIFIER);
                }
                break;
            case Stage7Parser.LPAREN:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1054;
                this.match(Stage7Parser.LPAREN);
                this.state = 1055;
                this.match(Stage7Parser.IDENTIFIER);
                this.state = 1057;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 77, this.context) ) {
                case 1:
                    {
                    this.state = 1056;
                    this.typeParamConstraint();
                    }
                    break;
                }
                this.state = 1060;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 2) {
                    {
                    this.state = 1059;
                    this.typeParamDefault();
                    }
                }

                this.state = 1062;
                this.match(Stage7Parser.RPAREN);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public typeParamConstraint(): TypeParamConstraintContext {
        let localContext = new TypeParamConstraintContext(this.context, this.state);
        this.enterRule(localContext, 160, Stage7Parser.RULE_typeParamConstraint);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1065;
            this.match(Stage7Parser.LPAREN);
            this.state = 1066;
            this.match(Stage7Parser.EXTENDS);
            this.state = 1067;
            this.typeExpr();
            this.state = 1068;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public typeParamDefault(): TypeParamDefaultContext {
        let localContext = new TypeParamDefaultContext(this.context, this.state);
        this.enterRule(localContext, 162, Stage7Parser.RULE_typeParamDefault);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1070;
            this.match(Stage7Parser.LPAREN);
            this.state = 1071;
            this.match(Stage7Parser.DEFAULT);
            this.state = 1072;
            this.typeExpr();
            this.state = 1073;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public assign(): AssignContext {
        let localContext = new AssignContext(this.context, this.state);
        this.enterRule(localContext, 164, Stage7Parser.RULE_assign);
        try {
            this.state = 1087;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 80, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1075;
                this.match(Stage7Parser.LPAREN);
                this.state = 1076;
                this.match(Stage7Parser.SET);
                this.state = 1077;
                this.match(Stage7Parser.IDENTIFIER);
                this.state = 1078;
                this.expression();
                this.state = 1079;
                this.match(Stage7Parser.RPAREN);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1081;
                this.match(Stage7Parser.LPAREN);
                this.state = 1082;
                this.match(Stage7Parser.SET);
                this.state = 1083;
                this.propAccess();
                this.state = 1084;
                this.expression();
                this.state = 1085;
                this.match(Stage7Parser.RPAREN);
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public switchForm(): SwitchFormContext {
        let localContext = new SwitchFormContext(this.context, this.state);
        this.enterRule(localContext, 166, Stage7Parser.RULE_switchForm);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1089;
            this.match(Stage7Parser.LPAREN);
            this.state = 1090;
            this.match(Stage7Parser.SWITCH);
            this.state = 1091;
            this.expression();
            this.state = 1095;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 81, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 1092;
                    this.caseClause();
                    }
                    }
                }
                this.state = 1097;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 81, this.context);
            }
            this.state = 1099;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2) {
                {
                this.state = 1098;
                this.defaultClause();
                }
            }

            this.state = 1101;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public caseClause(): CaseClauseContext {
        let localContext = new CaseClauseContext(this.context, this.state);
        this.enterRule(localContext, 168, Stage7Parser.RULE_caseClause);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1103;
            this.match(Stage7Parser.LPAREN);
            this.state = 1104;
            this.match(Stage7Parser.CASE);
            this.state = 1105;
            this.expression();
            this.state = 1109;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 55)) & ~0x1F) === 0 && ((1 << (_la - 55)) & 939524099) !== 0) || ((((_la - 106)) & ~0x1F) === 0 && ((1 << (_la - 106)) & 23) !== 0)) {
                {
                {
                this.state = 1106;
                this.statement();
                }
                }
                this.state = 1111;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1112;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public defaultClause(): DefaultClauseContext {
        let localContext = new DefaultClauseContext(this.context, this.state);
        this.enterRule(localContext, 170, Stage7Parser.RULE_defaultClause);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1114;
            this.match(Stage7Parser.LPAREN);
            this.state = 1115;
            this.match(Stage7Parser.DEFAULT);
            this.state = 1119;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 55)) & ~0x1F) === 0 && ((1 << (_la - 55)) & 939524099) !== 0) || ((((_la - 106)) & ~0x1F) === 0 && ((1 << (_la - 106)) & 23) !== 0)) {
                {
                {
                this.state = 1116;
                this.statement();
                }
                }
                this.state = 1121;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1122;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public forForm(): ForFormContext {
        let localContext = new ForFormContext(this.context, this.state);
        this.enterRule(localContext, 172, Stage7Parser.RULE_forForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1124;
            this.match(Stage7Parser.LPAREN);
            this.state = 1125;
            this.match(Stage7Parser.FOR);
            this.state = 1126;
            this.letStmt();
            this.state = 1127;
            this.expression();
            this.state = 1128;
            this.assign();
            this.state = 1132;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 55)) & ~0x1F) === 0 && ((1 << (_la - 55)) & 939524099) !== 0) || ((((_la - 106)) & ~0x1F) === 0 && ((1 << (_la - 106)) & 23) !== 0)) {
                {
                {
                this.state = 1129;
                this.statement();
                }
                }
                this.state = 1134;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1135;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public forInForm(): ForInFormContext {
        let localContext = new ForInFormContext(this.context, this.state);
        this.enterRule(localContext, 174, Stage7Parser.RULE_forInForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1137;
            this.match(Stage7Parser.LPAREN);
            this.state = 1138;
            this.match(Stage7Parser.FORIN);
            this.state = 1139;
            this.match(Stage7Parser.IDENTIFIER);
            this.state = 1140;
            this.expression();
            this.state = 1144;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 55)) & ~0x1F) === 0 && ((1 << (_la - 55)) & 939524099) !== 0) || ((((_la - 106)) & ~0x1F) === 0 && ((1 << (_la - 106)) & 23) !== 0)) {
                {
                {
                this.state = 1141;
                this.statement();
                }
                }
                this.state = 1146;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1147;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public forOfForm(): ForOfFormContext {
        let localContext = new ForOfFormContext(this.context, this.state);
        this.enterRule(localContext, 176, Stage7Parser.RULE_forOfForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1149;
            this.match(Stage7Parser.LPAREN);
            this.state = 1150;
            this.match(Stage7Parser.FOROF);
            this.state = 1151;
            this.match(Stage7Parser.IDENTIFIER);
            this.state = 1152;
            this.expression();
            this.state = 1156;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 55)) & ~0x1F) === 0 && ((1 << (_la - 55)) & 939524099) !== 0) || ((((_la - 106)) & ~0x1F) === 0 && ((1 << (_la - 106)) & 23) !== 0)) {
                {
                {
                this.state = 1153;
                this.statement();
                }
                }
                this.state = 1158;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1159;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public forAwaitForm(): ForAwaitFormContext {
        let localContext = new ForAwaitFormContext(this.context, this.state);
        this.enterRule(localContext, 178, Stage7Parser.RULE_forAwaitForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1161;
            this.match(Stage7Parser.LPAREN);
            this.state = 1162;
            this.match(Stage7Parser.FORAWAIT);
            this.state = 1163;
            this.match(Stage7Parser.IDENTIFIER);
            this.state = 1164;
            this.expression();
            this.state = 1168;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 55)) & ~0x1F) === 0 && ((1 << (_la - 55)) & 939524099) !== 0) || ((((_la - 106)) & ~0x1F) === 0 && ((1 << (_la - 106)) & 23) !== 0)) {
                {
                {
                this.state = 1165;
                this.statement();
                }
                }
                this.state = 1170;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1171;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public tryForm(): TryFormContext {
        let localContext = new TryFormContext(this.context, this.state);
        this.enterRule(localContext, 180, Stage7Parser.RULE_tryForm);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1173;
            this.match(Stage7Parser.LPAREN);
            this.state = 1174;
            this.match(Stage7Parser.TRY);
            this.state = 1178;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 89, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 1175;
                    this.statement();
                    }
                    }
                }
                this.state = 1180;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 89, this.context);
            }
            this.state = 1186;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 91, this.context) ) {
            case 1:
                {
                this.state = 1181;
                this.catchClause();
                this.state = 1183;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 2) {
                    {
                    this.state = 1182;
                    this.finallyClause();
                    }
                }

                }
                break;
            case 2:
                {
                this.state = 1185;
                this.finallyClause();
                }
                break;
            }
            this.state = 1188;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public catchClause(): CatchClauseContext {
        let localContext = new CatchClauseContext(this.context, this.state);
        this.enterRule(localContext, 182, Stage7Parser.RULE_catchClause);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1190;
            this.match(Stage7Parser.LPAREN);
            this.state = 1191;
            this.match(Stage7Parser.CATCH);
            this.state = 1192;
            this.match(Stage7Parser.IDENTIFIER);
            this.state = 1196;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 55)) & ~0x1F) === 0 && ((1 << (_la - 55)) & 939524099) !== 0) || ((((_la - 106)) & ~0x1F) === 0 && ((1 << (_la - 106)) & 23) !== 0)) {
                {
                {
                this.state = 1193;
                this.statement();
                }
                }
                this.state = 1198;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1199;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public finallyClause(): FinallyClauseContext {
        let localContext = new FinallyClauseContext(this.context, this.state);
        this.enterRule(localContext, 184, Stage7Parser.RULE_finallyClause);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1201;
            this.match(Stage7Parser.LPAREN);
            this.state = 1202;
            this.match(Stage7Parser.FINALLY);
            this.state = 1206;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 55)) & ~0x1F) === 0 && ((1 << (_la - 55)) & 939524099) !== 0) || ((((_la - 106)) & ~0x1F) === 0 && ((1 << (_la - 106)) & 23) !== 0)) {
                {
                {
                this.state = 1203;
                this.statement();
                }
                }
                this.state = 1208;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1209;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public expression(): ExpressionContext {
        let localContext = new ExpressionContext(this.context, this.state);
        this.enterRule(localContext, 186, Stage7Parser.RULE_expression);
        try {
            this.state = 1246;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 94, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1211;
                this.literal();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1212;
                this.match(Stage7Parser.KEYWORD);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 1213;
                this.match(Stage7Parser.IDENTIFIER);
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 1214;
                this.lambda();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 1215;
                this.fn();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 1216;
                this.asyncLambda();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 1217;
                this.asyncFn();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 1218;
                this.generatorFn();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 1219;
                this.asyncGeneratorFn();
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 1220;
                this.awaitExpr();
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 1221;
                this.yieldExpr();
                }
                break;
            case 12:
                this.enterOuterAlt(localContext, 12);
                {
                this.state = 1222;
                this.yieldStarExpr();
                }
                break;
            case 13:
                this.enterOuterAlt(localContext, 13);
                {
                this.state = 1223;
                this.bindExpr();
                }
                break;
            case 14:
                this.enterOuterAlt(localContext, 14);
                {
                this.state = 1224;
                this.methodCallExpr();
                }
                break;
            case 15:
                this.enterOuterAlt(localContext, 15);
                {
                this.state = 1225;
                this.objectExpr();
                }
                break;
            case 16:
                this.enterOuterAlt(localContext, 16);
                {
                this.state = 1226;
                this.arrayExpr();
                }
                break;
            case 17:
                this.enterOuterAlt(localContext, 17);
                {
                this.state = 1227;
                this.propAccess();
                }
                break;
            case 18:
                this.enterOuterAlt(localContext, 18);
                {
                this.state = 1228;
                this.indexAccess();
                }
                break;
            case 19:
                this.enterOuterAlt(localContext, 19);
                {
                this.state = 1229;
                this.quasiquote();
                }
                break;
            case 20:
                this.enterOuterAlt(localContext, 20);
                {
                this.state = 1230;
                this.unquote();
                }
                break;
            case 21:
                this.enterOuterAlt(localContext, 21);
                {
                this.state = 1231;
                this.unquoteSplicing();
                }
                break;
            case 22:
                this.enterOuterAlt(localContext, 22);
                {
                this.state = 1232;
                this.ternary();
                }
                break;
            case 23:
                this.enterOuterAlt(localContext, 23);
                {
                this.state = 1233;
                this.condExpr();
                }
                break;
            case 24:
                this.enterOuterAlt(localContext, 24);
                {
                this.state = 1234;
                this.newForm();
                }
                break;
            case 25:
                this.enterOuterAlt(localContext, 25);
                {
                this.state = 1235;
                this.optChain();
                }
                break;
            case 26:
                this.enterOuterAlt(localContext, 26);
                {
                this.state = 1236;
                this.optChainIndex();
                }
                break;
            case 27:
                this.enterOuterAlt(localContext, 27);
                {
                this.state = 1237;
                this.nullCoalesce();
                }
                break;
            case 28:
                this.enterOuterAlt(localContext, 28);
                {
                this.state = 1238;
                this.typeofExpr();
                }
                break;
            case 29:
                this.enterOuterAlt(localContext, 29);
                {
                this.state = 1239;
                this.typeAssert();
                }
                break;
            case 30:
                this.enterOuterAlt(localContext, 30);
                {
                this.state = 1240;
                this.templateExpr();
                }
                break;
            case 31:
                this.enterOuterAlt(localContext, 31);
                {
                this.state = 1241;
                this.thisExpr();
                }
                break;
            case 32:
                this.enterOuterAlt(localContext, 32);
                {
                this.state = 1242;
                this.superExpr();
                }
                break;
            case 33:
                this.enterOuterAlt(localContext, 33);
                {
                this.state = 1243;
                this.superConstructorCall();
                }
                break;
            case 34:
                this.enterOuterAlt(localContext, 34);
                {
                this.state = 1244;
                this.superMethodCall();
                }
                break;
            case 35:
                this.enterOuterAlt(localContext, 35);
                {
                this.state = 1245;
                this.call();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public thisExpr(): ThisExprContext {
        let localContext = new ThisExprContext(this.context, this.state);
        this.enterRule(localContext, 188, Stage7Parser.RULE_thisExpr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1248;
            this.match(Stage7Parser.THIS);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public superExpr(): SuperExprContext {
        let localContext = new SuperExprContext(this.context, this.state);
        this.enterRule(localContext, 190, Stage7Parser.RULE_superExpr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1250;
            this.match(Stage7Parser.SUPER);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public superConstructorCall(): SuperConstructorCallContext {
        let localContext = new SuperConstructorCallContext(this.context, this.state);
        this.enterRule(localContext, 192, Stage7Parser.RULE_superConstructorCall);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1252;
            this.match(Stage7Parser.LPAREN);
            this.state = 1253;
            this.match(Stage7Parser.SUPER);
            this.state = 1257;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 55)) & ~0x1F) === 0 && ((1 << (_la - 55)) & 939524099) !== 0) || ((((_la - 106)) & ~0x1F) === 0 && ((1 << (_la - 106)) & 23) !== 0)) {
                {
                {
                this.state = 1254;
                this.expression();
                }
                }
                this.state = 1259;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1260;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public superMethodCall(): SuperMethodCallContext {
        let localContext = new SuperMethodCallContext(this.context, this.state);
        this.enterRule(localContext, 194, Stage7Parser.RULE_superMethodCall);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1262;
            this.match(Stage7Parser.LPAREN);
            this.state = 1263;
            this.match(Stage7Parser.SUPER_METHOD);
            this.state = 1264;
            this.match(Stage7Parser.IDENTIFIER);
            this.state = 1268;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 55)) & ~0x1F) === 0 && ((1 << (_la - 55)) & 939524099) !== 0) || ((((_la - 106)) & ~0x1F) === 0 && ((1 << (_la - 106)) & 23) !== 0)) {
                {
                {
                this.state = 1265;
                this.expression();
                }
                }
                this.state = 1270;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1271;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public typeofExpr(): TypeofExprContext {
        let localContext = new TypeofExprContext(this.context, this.state);
        this.enterRule(localContext, 196, Stage7Parser.RULE_typeofExpr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1273;
            this.match(Stage7Parser.LPAREN);
            this.state = 1274;
            this.match(Stage7Parser.TYPEOF);
            this.state = 1275;
            this.expression();
            this.state = 1276;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public typeAssert(): TypeAssertContext {
        let localContext = new TypeAssertContext(this.context, this.state);
        this.enterRule(localContext, 198, Stage7Parser.RULE_typeAssert);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1278;
            this.match(Stage7Parser.LPAREN);
            this.state = 1279;
            this.match(Stage7Parser.TYPE_AS);
            this.state = 1280;
            this.expression();
            this.state = 1281;
            this.typeExpr();
            this.state = 1282;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public lambda(): LambdaContext {
        let localContext = new LambdaContext(this.context, this.state);
        this.enterRule(localContext, 200, Stage7Parser.RULE_lambda);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1284;
            this.match(Stage7Parser.LPAREN);
            this.state = 1285;
            this.match(Stage7Parser.LAMBDA);
            this.state = 1286;
            this.fnSignature();
            this.state = 1290;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 55)) & ~0x1F) === 0 && ((1 << (_la - 55)) & 939524099) !== 0) || ((((_la - 106)) & ~0x1F) === 0 && ((1 << (_la - 106)) & 23) !== 0)) {
                {
                {
                this.state = 1287;
                this.statement();
                }
                }
                this.state = 1292;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1293;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public fn(): FnContext {
        let localContext = new FnContext(this.context, this.state);
        this.enterRule(localContext, 202, Stage7Parser.RULE_fn);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1295;
            this.match(Stage7Parser.LPAREN);
            this.state = 1296;
            this.match(Stage7Parser.FN);
            this.state = 1297;
            this.fnSignature();
            this.state = 1301;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 55)) & ~0x1F) === 0 && ((1 << (_la - 55)) & 939524099) !== 0) || ((((_la - 106)) & ~0x1F) === 0 && ((1 << (_la - 106)) & 23) !== 0)) {
                {
                {
                this.state = 1298;
                this.statement();
                }
                }
                this.state = 1303;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1304;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public asyncLambda(): AsyncLambdaContext {
        let localContext = new AsyncLambdaContext(this.context, this.state);
        this.enterRule(localContext, 204, Stage7Parser.RULE_asyncLambda);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1306;
            this.match(Stage7Parser.LPAREN);
            this.state = 1307;
            this.match(Stage7Parser.ASYNC_LAMBDA);
            this.state = 1308;
            this.fnSignature();
            this.state = 1312;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 55)) & ~0x1F) === 0 && ((1 << (_la - 55)) & 939524099) !== 0) || ((((_la - 106)) & ~0x1F) === 0 && ((1 << (_la - 106)) & 23) !== 0)) {
                {
                {
                this.state = 1309;
                this.statement();
                }
                }
                this.state = 1314;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1315;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public asyncFn(): AsyncFnContext {
        let localContext = new AsyncFnContext(this.context, this.state);
        this.enterRule(localContext, 206, Stage7Parser.RULE_asyncFn);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1317;
            this.match(Stage7Parser.LPAREN);
            this.state = 1318;
            this.match(Stage7Parser.ASYNC_FN);
            this.state = 1319;
            this.fnSignature();
            this.state = 1323;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 55)) & ~0x1F) === 0 && ((1 << (_la - 55)) & 939524099) !== 0) || ((((_la - 106)) & ~0x1F) === 0 && ((1 << (_la - 106)) & 23) !== 0)) {
                {
                {
                this.state = 1320;
                this.statement();
                }
                }
                this.state = 1325;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1326;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public generatorFn(): GeneratorFnContext {
        let localContext = new GeneratorFnContext(this.context, this.state);
        this.enterRule(localContext, 208, Stage7Parser.RULE_generatorFn);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1328;
            this.match(Stage7Parser.LPAREN);
            this.state = 1329;
            this.match(Stage7Parser.GENERATOR_FN);
            this.state = 1330;
            this.fnSignature();
            this.state = 1334;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 55)) & ~0x1F) === 0 && ((1 << (_la - 55)) & 939524099) !== 0) || ((((_la - 106)) & ~0x1F) === 0 && ((1 << (_la - 106)) & 23) !== 0)) {
                {
                {
                this.state = 1331;
                this.statement();
                }
                }
                this.state = 1336;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1337;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public asyncGeneratorFn(): AsyncGeneratorFnContext {
        let localContext = new AsyncGeneratorFnContext(this.context, this.state);
        this.enterRule(localContext, 210, Stage7Parser.RULE_asyncGeneratorFn);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1339;
            this.match(Stage7Parser.LPAREN);
            this.state = 1340;
            this.match(Stage7Parser.ASYNC_GENERATOR_FN);
            this.state = 1341;
            this.fnSignature();
            this.state = 1345;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 55)) & ~0x1F) === 0 && ((1 << (_la - 55)) & 939524099) !== 0) || ((((_la - 106)) & ~0x1F) === 0 && ((1 << (_la - 106)) & 23) !== 0)) {
                {
                {
                this.state = 1342;
                this.statement();
                }
                }
                this.state = 1347;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1348;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public awaitExpr(): AwaitExprContext {
        let localContext = new AwaitExprContext(this.context, this.state);
        this.enterRule(localContext, 212, Stage7Parser.RULE_awaitExpr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1350;
            this.match(Stage7Parser.LPAREN);
            this.state = 1351;
            this.match(Stage7Parser.AWAIT);
            this.state = 1352;
            this.expression();
            this.state = 1353;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public yieldExpr(): YieldExprContext {
        let localContext = new YieldExprContext(this.context, this.state);
        this.enterRule(localContext, 214, Stage7Parser.RULE_yieldExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1355;
            this.match(Stage7Parser.LPAREN);
            this.state = 1356;
            this.match(Stage7Parser.YIELD);
            this.state = 1358;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2 || ((((_la - 55)) & ~0x1F) === 0 && ((1 << (_la - 55)) & 939524099) !== 0) || ((((_la - 106)) & ~0x1F) === 0 && ((1 << (_la - 106)) & 23) !== 0)) {
                {
                this.state = 1357;
                this.expression();
                }
            }

            this.state = 1360;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public yieldStarExpr(): YieldStarExprContext {
        let localContext = new YieldStarExprContext(this.context, this.state);
        this.enterRule(localContext, 216, Stage7Parser.RULE_yieldStarExpr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1362;
            this.match(Stage7Parser.LPAREN);
            this.state = 1363;
            this.match(Stage7Parser.YIELD_STAR);
            this.state = 1364;
            this.expression();
            this.state = 1365;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public bindExpr(): BindExprContext {
        let localContext = new BindExprContext(this.context, this.state);
        this.enterRule(localContext, 218, Stage7Parser.RULE_bindExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1367;
            this.match(Stage7Parser.LPAREN);
            this.state = 1368;
            this.match(Stage7Parser.BIND);
            this.state = 1369;
            this.expression();
            this.state = 1370;
            this.expression();
            this.state = 1374;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 55)) & ~0x1F) === 0 && ((1 << (_la - 55)) & 939524099) !== 0) || ((((_la - 106)) & ~0x1F) === 0 && ((1 << (_la - 106)) & 23) !== 0)) {
                {
                {
                this.state = 1371;
                this.expression();
                }
                }
                this.state = 1376;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1377;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public methodCallExpr(): MethodCallExprContext {
        let localContext = new MethodCallExprContext(this.context, this.state);
        this.enterRule(localContext, 220, Stage7Parser.RULE_methodCallExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1379;
            this.match(Stage7Parser.LPAREN);
            this.state = 1380;
            this.match(Stage7Parser.METHOD_CALL);
            this.state = 1381;
            this.expression();
            this.state = 1382;
            this.expression();
            this.state = 1386;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 55)) & ~0x1F) === 0 && ((1 << (_la - 55)) & 939524099) !== 0) || ((((_la - 106)) & ~0x1F) === 0 && ((1 << (_la - 106)) & 23) !== 0)) {
                {
                {
                this.state = 1383;
                this.expression();
                }
                }
                this.state = 1388;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1389;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public ternary(): TernaryContext {
        let localContext = new TernaryContext(this.context, this.state);
        this.enterRule(localContext, 222, Stage7Parser.RULE_ternary);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1391;
            this.match(Stage7Parser.LPAREN);
            this.state = 1392;
            this.match(Stage7Parser.TERNARY);
            this.state = 1393;
            this.expression();
            this.state = 1394;
            this.expression();
            this.state = 1395;
            this.expression();
            this.state = 1396;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public condExpr(): CondExprContext {
        let localContext = new CondExprContext(this.context, this.state);
        this.enterRule(localContext, 224, Stage7Parser.RULE_condExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1398;
            this.match(Stage7Parser.LPAREN);
            this.state = 1399;
            this.match(Stage7Parser.COND);
            this.state = 1403;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 1400;
                this.expression();
                this.state = 1401;
                this.expression();
                }
                }
                this.state = 1405;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || ((((_la - 55)) & ~0x1F) === 0 && ((1 << (_la - 55)) & 939524099) !== 0) || ((((_la - 106)) & ~0x1F) === 0 && ((1 << (_la - 106)) & 23) !== 0));
            this.state = 1407;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public newForm(): NewFormContext {
        let localContext = new NewFormContext(this.context, this.state);
        this.enterRule(localContext, 226, Stage7Parser.RULE_newForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1409;
            this.match(Stage7Parser.LPAREN);
            this.state = 1410;
            this.match(Stage7Parser.NEW);
            this.state = 1411;
            this.match(Stage7Parser.IDENTIFIER);
            this.state = 1413;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 107, this.context) ) {
            case 1:
                {
                this.state = 1412;
                this.typeArgs();
                }
                break;
            }
            this.state = 1418;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 55)) & ~0x1F) === 0 && ((1 << (_la - 55)) & 939524099) !== 0) || ((((_la - 106)) & ~0x1F) === 0 && ((1 << (_la - 106)) & 23) !== 0)) {
                {
                {
                this.state = 1415;
                this.expression();
                }
                }
                this.state = 1420;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1421;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public objectExpr(): ObjectExprContext {
        let localContext = new ObjectExprContext(this.context, this.state);
        this.enterRule(localContext, 228, Stage7Parser.RULE_objectExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1423;
            this.match(Stage7Parser.LPAREN);
            this.state = 1424;
            this.match(Stage7Parser.OBJECT);
            this.state = 1428;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 1425;
                this.objectField();
                }
                }
                this.state = 1430;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1431;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public objectField(): ObjectFieldContext {
        let localContext = new ObjectFieldContext(this.context, this.state);
        this.enterRule(localContext, 230, Stage7Parser.RULE_objectField);
        try {
            this.state = 1446;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 110, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1433;
                this.match(Stage7Parser.LPAREN);
                this.state = 1434;
                this.propKey();
                this.state = 1435;
                this.expression();
                this.state = 1436;
                this.match(Stage7Parser.RPAREN);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1438;
                this.match(Stage7Parser.LPAREN);
                this.state = 1439;
                this.propKey();
                this.state = 1440;
                this.methodDef();
                this.state = 1441;
                this.match(Stage7Parser.RPAREN);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 1443;
                this.match(Stage7Parser.LPAREN);
                this.state = 1444;
                this.match(Stage7Parser.IDENTIFIER);
                this.state = 1445;
                this.match(Stage7Parser.RPAREN);
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public methodDef(): MethodDefContext {
        let localContext = new MethodDefContext(this.context, this.state);
        this.enterRule(localContext, 232, Stage7Parser.RULE_methodDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1448;
            this.match(Stage7Parser.LPAREN);
            this.state = 1449;
            this.match(Stage7Parser.METHOD);
            this.state = 1450;
            this.fnSignature();
            this.state = 1454;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 55)) & ~0x1F) === 0 && ((1 << (_la - 55)) & 939524099) !== 0) || ((((_la - 106)) & ~0x1F) === 0 && ((1 << (_la - 106)) & 23) !== 0)) {
                {
                {
                this.state = 1451;
                this.statement();
                }
                }
                this.state = 1456;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1457;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public arrayExpr(): ArrayExprContext {
        let localContext = new ArrayExprContext(this.context, this.state);
        this.enterRule(localContext, 234, Stage7Parser.RULE_arrayExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1459;
            this.match(Stage7Parser.LPAREN);
            this.state = 1460;
            this.match(Stage7Parser.ARRAY);
            this.state = 1464;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 55)) & ~0x1F) === 0 && ((1 << (_la - 55)) & 939524099) !== 0) || ((((_la - 106)) & ~0x1F) === 0 && ((1 << (_la - 106)) & 23) !== 0)) {
                {
                {
                this.state = 1461;
                this.expression();
                }
                }
                this.state = 1466;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1467;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public templateExpr(): TemplateExprContext {
        let localContext = new TemplateExprContext(this.context, this.state);
        this.enterRule(localContext, 236, Stage7Parser.RULE_templateExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1469;
            this.match(Stage7Parser.LPAREN);
            this.state = 1470;
            this.match(Stage7Parser.TEMPLATE);
            this.state = 1473;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                this.state = 1473;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 113, this.context) ) {
                case 1:
                    {
                    this.state = 1471;
                    this.match(Stage7Parser.STRING);
                    }
                    break;
                case 2:
                    {
                    this.state = 1472;
                    this.expression();
                    }
                    break;
                }
                }
                this.state = 1475;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || ((((_la - 55)) & ~0x1F) === 0 && ((1 << (_la - 55)) & 939524099) !== 0) || ((((_la - 106)) & ~0x1F) === 0 && ((1 << (_la - 106)) & 23) !== 0));
            this.state = 1477;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public propKey(): PropKeyContext {
        let localContext = new PropKeyContext(this.context, this.state);
        this.enterRule(localContext, 238, Stage7Parser.RULE_propKey);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1479;
            _la = this.tokenStream.LA(1);
            if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 2415919072) !== 0) || ((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & 4294967295) !== 0) || ((((_la - 65)) & ~0x1F) === 0 && ((1 << (_la - 65)) & 2683240447) !== 0) || ((((_la - 97)) & ~0x1F) === 0 && ((1 << (_la - 97)) & 12287) !== 0))) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public propAccess(): PropAccessContext {
        let localContext = new PropAccessContext(this.context, this.state);
        this.enterRule(localContext, 240, Stage7Parser.RULE_propAccess);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1481;
            this.match(Stage7Parser.LPAREN);
            this.state = 1482;
            this.match(Stage7Parser.DOT);
            this.state = 1483;
            this.expression();
            this.state = 1484;
            this.propKey();
            this.state = 1485;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public indexAccess(): IndexAccessContext {
        let localContext = new IndexAccessContext(this.context, this.state);
        this.enterRule(localContext, 242, Stage7Parser.RULE_indexAccess);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1487;
            this.match(Stage7Parser.LPAREN);
            this.state = 1488;
            this.match(Stage7Parser.INDEX);
            this.state = 1489;
            this.expression();
            this.state = 1490;
            this.expression();
            this.state = 1491;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public quasiquote(): QuasiquoteContext {
        let localContext = new QuasiquoteContext(this.context, this.state);
        this.enterRule(localContext, 244, Stage7Parser.RULE_quasiquote);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1493;
            this.match(Stage7Parser.LPAREN);
            this.state = 1494;
            _la = this.tokenStream.LA(1);
            if(!(_la === 33 || _la === 34)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 1495;
            this.quasiForm();
            this.state = 1496;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public quasiForm(): QuasiFormContext {
        let localContext = new QuasiFormContext(this.context, this.state);
        this.enterRule(localContext, 246, Stage7Parser.RULE_quasiForm);
        try {
            this.state = 1505;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 115, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1498;
                this.expression();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1499;
                this.topLevelLet();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 1500;
                this.topLevelConst();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 1501;
                this.typeAlias();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 1502;
                this.interfaceDef();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 1503;
                this.classDef();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 1504;
                this.importForm();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public unquote(): UnquoteContext {
        let localContext = new UnquoteContext(this.context, this.state);
        this.enterRule(localContext, 248, Stage7Parser.RULE_unquote);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1507;
            this.match(Stage7Parser.LPAREN);
            this.state = 1508;
            this.match(Stage7Parser.UNQUOTE);
            this.state = 1509;
            this.expression();
            this.state = 1510;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public unquoteSplicing(): UnquoteSplicingContext {
        let localContext = new UnquoteSplicingContext(this.context, this.state);
        this.enterRule(localContext, 250, Stage7Parser.RULE_unquoteSplicing);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1512;
            this.match(Stage7Parser.LPAREN);
            this.state = 1513;
            this.match(Stage7Parser.UNQUOTE_SPLICING);
            this.state = 1514;
            this.expression();
            this.state = 1515;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public optChain(): OptChainContext {
        let localContext = new OptChainContext(this.context, this.state);
        this.enterRule(localContext, 252, Stage7Parser.RULE_optChain);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1517;
            this.match(Stage7Parser.LPAREN);
            this.state = 1518;
            this.match(Stage7Parser.OPTCHAIN);
            this.state = 1519;
            this.expression();
            this.state = 1520;
            this.propKey();
            this.state = 1521;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public optChainIndex(): OptChainIndexContext {
        let localContext = new OptChainIndexContext(this.context, this.state);
        this.enterRule(localContext, 254, Stage7Parser.RULE_optChainIndex);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1523;
            this.match(Stage7Parser.LPAREN);
            this.state = 1524;
            this.match(Stage7Parser.OPTCHAIN_INDEX);
            this.state = 1525;
            this.expression();
            this.state = 1526;
            this.expression();
            this.state = 1527;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public nullCoalesce(): NullCoalesceContext {
        let localContext = new NullCoalesceContext(this.context, this.state);
        this.enterRule(localContext, 256, Stage7Parser.RULE_nullCoalesce);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1529;
            this.match(Stage7Parser.LPAREN);
            this.state = 1530;
            this.match(Stage7Parser.NULLCOAL);
            this.state = 1531;
            this.expression();
            this.state = 1532;
            this.expression();
            this.state = 1533;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public call(): CallContext {
        let localContext = new CallContext(this.context, this.state);
        this.enterRule(localContext, 258, Stage7Parser.RULE_call);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1535;
            this.match(Stage7Parser.LPAREN);
            this.state = 1536;
            this.expression();
            this.state = 1538;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 116, this.context) ) {
            case 1:
                {
                this.state = 1537;
                this.typeArgs();
                }
                break;
            }
            this.state = 1543;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 55)) & ~0x1F) === 0 && ((1 << (_la - 55)) & 939524099) !== 0) || ((((_la - 106)) & ~0x1F) === 0 && ((1 << (_la - 106)) & 23) !== 0)) {
                {
                {
                this.state = 1540;
                this.expression();
                }
                }
                this.state = 1545;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1546;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public typeArgs(): TypeArgsContext {
        let localContext = new TypeArgsContext(this.context, this.state);
        this.enterRule(localContext, 260, Stage7Parser.RULE_typeArgs);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1548;
            this.match(Stage7Parser.LPAREN);
            this.state = 1549;
            this.match(Stage7Parser.TYPE_ARGS);
            this.state = 1551;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 1550;
                this.typeExpr();
                }
                }
                this.state = 1553;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 110);
            this.state = 1555;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public fnSignature(): FnSignatureContext {
        let localContext = new FnSignatureContext(this.context, this.state);
        this.enterRule(localContext, 262, Stage7Parser.RULE_fnSignature);
        let _la: number;
        try {
            let alternative: number;
            this.state = 1588;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 126, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1557;
                this.match(Stage7Parser.LPAREN);
                this.state = 1574;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 2) {
                    {
                    this.state = 1558;
                    this.param();
                    this.state = 1565;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 120, this.context);
                    while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                        if (alternative === 1) {
                            {
                            {
                            this.state = 1560;
                            this.errorHandler.sync(this);
                            _la = this.tokenStream.LA(1);
                            if (_la === 4) {
                                {
                                this.state = 1559;
                                this.match(Stage7Parser.COMMA);
                                }
                            }

                            this.state = 1562;
                            this.param();
                            }
                            }
                        }
                        this.state = 1567;
                        this.errorHandler.sync(this);
                        alternative = this.interpreter.adaptivePredict(this.tokenStream, 120, this.context);
                    }
                    this.state = 1572;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    if (_la === 2 || _la === 4) {
                        {
                        this.state = 1569;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                        if (_la === 4) {
                            {
                            this.state = 1568;
                            this.match(Stage7Parser.COMMA);
                            }
                        }

                        this.state = 1571;
                        this.restParam();
                        }
                    }

                    }
                }

                this.state = 1576;
                this.match(Stage7Parser.RPAREN);
                this.state = 1579;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 85) {
                    {
                    this.state = 1577;
                    this.match(Stage7Parser.COLON);
                    this.state = 1578;
                    this.typeExpr();
                    }
                }

                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1581;
                this.match(Stage7Parser.LPAREN);
                this.state = 1582;
                this.restParam();
                this.state = 1583;
                this.match(Stage7Parser.RPAREN);
                this.state = 1586;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 85) {
                    {
                    this.state = 1584;
                    this.match(Stage7Parser.COLON);
                    this.state = 1585;
                    this.typeExpr();
                    }
                }

                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public param(): ParamContext {
        let localContext = new ParamContext(this.context, this.state);
        this.enterRule(localContext, 264, Stage7Parser.RULE_param);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1590;
            this.match(Stage7Parser.LPAREN);
            this.state = 1591;
            this.match(Stage7Parser.IDENTIFIER);
            this.state = 1594;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 85) {
                {
                this.state = 1592;
                this.match(Stage7Parser.COLON);
                this.state = 1593;
                this.typeExpr();
                }
            }

            this.state = 1596;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public restParam(): RestParamContext {
        let localContext = new RestParamContext(this.context, this.state);
        this.enterRule(localContext, 266, Stage7Parser.RULE_restParam);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1598;
            this.match(Stage7Parser.LPAREN);
            this.state = 1599;
            this.match(Stage7Parser.REST);
            this.state = 1600;
            this.match(Stage7Parser.IDENTIFIER);
            this.state = 1603;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 85) {
                {
                this.state = 1601;
                this.match(Stage7Parser.COLON);
                this.state = 1602;
                this.typeExpr();
                }
            }

            this.state = 1605;
            this.match(Stage7Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public literal(): LiteralContext {
        let localContext = new LiteralContext(this.context, this.state);
        this.enterRule(localContext, 268, Stage7Parser.RULE_literal);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1607;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 82)) & ~0x1F) === 0 && ((1 << (_la - 82)) & 100663303) !== 0))) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }

    public static readonly _serializedATN: number[] = [
        4,1,111,1610,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,
        7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,
        13,2,14,7,14,2,15,7,15,2,16,7,16,2,17,7,17,2,18,7,18,2,19,7,19,2,
        20,7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,24,2,25,7,25,2,26,7,
        26,2,27,7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,31,7,31,2,32,7,32,2,
        33,7,33,2,34,7,34,2,35,7,35,2,36,7,36,2,37,7,37,2,38,7,38,2,39,7,
        39,2,40,7,40,2,41,7,41,2,42,7,42,2,43,7,43,2,44,7,44,2,45,7,45,2,
        46,7,46,2,47,7,47,2,48,7,48,2,49,7,49,2,50,7,50,2,51,7,51,2,52,7,
        52,2,53,7,53,2,54,7,54,2,55,7,55,2,56,7,56,2,57,7,57,2,58,7,58,2,
        59,7,59,2,60,7,60,2,61,7,61,2,62,7,62,2,63,7,63,2,64,7,64,2,65,7,
        65,2,66,7,66,2,67,7,67,2,68,7,68,2,69,7,69,2,70,7,70,2,71,7,71,2,
        72,7,72,2,73,7,73,2,74,7,74,2,75,7,75,2,76,7,76,2,77,7,77,2,78,7,
        78,2,79,7,79,2,80,7,80,2,81,7,81,2,82,7,82,2,83,7,83,2,84,7,84,2,
        85,7,85,2,86,7,86,2,87,7,87,2,88,7,88,2,89,7,89,2,90,7,90,2,91,7,
        91,2,92,7,92,2,93,7,93,2,94,7,94,2,95,7,95,2,96,7,96,2,97,7,97,2,
        98,7,98,2,99,7,99,2,100,7,100,2,101,7,101,2,102,7,102,2,103,7,103,
        2,104,7,104,2,105,7,105,2,106,7,106,2,107,7,107,2,108,7,108,2,109,
        7,109,2,110,7,110,2,111,7,111,2,112,7,112,2,113,7,113,2,114,7,114,
        2,115,7,115,2,116,7,116,2,117,7,117,2,118,7,118,2,119,7,119,2,120,
        7,120,2,121,7,121,2,122,7,122,2,123,7,123,2,124,7,124,2,125,7,125,
        2,126,7,126,2,127,7,127,2,128,7,128,2,129,7,129,2,130,7,130,2,131,
        7,131,2,132,7,132,2,133,7,133,2,134,7,134,1,0,1,0,1,0,5,0,274,8,
        0,10,0,12,0,277,9,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        3,1,290,8,1,1,2,1,2,1,2,1,2,1,2,3,2,297,8,2,1,3,1,3,1,3,1,3,1,3,
        5,3,304,8,3,10,3,12,3,307,9,3,1,3,1,3,1,4,1,4,1,4,1,4,1,4,1,4,1,
        4,1,4,1,4,1,4,3,4,321,8,4,1,5,1,5,1,5,5,5,326,8,5,10,5,12,5,329,
        9,5,1,5,1,5,1,5,1,5,1,6,1,6,1,6,5,6,338,8,6,10,6,12,6,341,9,6,1,
        6,1,6,1,6,1,6,1,7,1,7,1,7,1,8,1,8,1,8,1,8,3,8,354,8,8,1,8,1,8,1,
        8,1,9,1,9,1,9,1,9,3,9,363,8,9,1,9,3,9,366,8,9,1,9,1,9,1,9,1,10,1,
        10,1,10,4,10,374,8,10,11,10,12,10,375,1,10,1,10,1,11,1,11,1,11,5,
        11,383,8,11,10,11,12,11,386,9,11,1,11,1,11,3,11,390,8,11,1,11,3,
        11,393,8,11,1,11,3,11,396,8,11,1,11,1,11,1,11,1,12,1,12,1,12,5,12,
        404,8,12,10,12,12,12,407,9,12,1,12,3,12,410,8,12,1,12,3,12,413,8,
        12,1,12,1,12,1,12,1,13,1,13,1,13,1,13,1,13,1,14,1,14,1,14,4,14,426,
        8,14,11,14,12,14,427,1,14,1,14,1,15,1,15,1,15,5,15,435,8,15,10,15,
        12,15,438,9,15,1,15,1,15,1,16,1,16,1,16,1,16,1,16,1,16,3,16,448,
        8,16,1,17,1,17,1,18,1,18,1,18,5,18,455,8,18,10,18,12,18,458,9,18,
        1,18,1,18,1,18,3,18,463,8,18,1,18,3,18,466,8,18,1,18,1,18,1,19,1,
        19,1,19,1,19,5,19,474,8,19,10,19,12,19,477,9,19,1,19,1,19,1,20,1,
        20,1,20,5,20,484,8,20,10,20,12,20,487,9,20,1,20,1,20,1,20,5,20,492,
        8,20,10,20,12,20,495,9,20,1,20,1,20,1,21,1,21,1,21,5,21,502,8,21,
        10,21,12,21,505,9,21,1,21,1,21,1,21,1,21,1,22,1,22,1,22,5,22,514,
        8,22,10,22,12,22,517,9,22,1,22,1,22,1,22,5,22,522,8,22,10,22,12,
        22,525,9,22,1,22,1,22,1,23,1,23,1,23,5,23,532,8,23,10,23,12,23,535,
        9,23,1,23,1,23,1,23,5,23,540,8,23,10,23,12,23,543,9,23,1,23,1,23,
        1,24,1,24,1,24,1,24,1,24,3,24,552,8,24,1,25,1,25,1,25,3,25,557,8,
        25,1,25,1,25,3,25,561,8,25,1,25,1,25,1,26,1,26,1,26,3,26,568,8,26,
        1,26,5,26,571,8,26,10,26,12,26,574,9,26,3,26,576,8,26,1,26,1,26,
        1,26,1,26,1,26,1,26,3,26,584,8,26,1,27,1,27,1,27,1,27,1,27,1,27,
        1,27,1,27,1,27,1,27,1,27,1,27,1,27,1,27,1,27,1,27,1,27,1,27,1,27,
        1,27,3,27,606,8,27,1,28,1,28,1,28,1,28,5,28,612,8,28,10,28,12,28,
        615,9,28,1,28,1,28,5,28,619,8,28,10,28,12,28,622,9,28,1,28,1,28,
        1,29,1,29,1,29,1,29,1,29,1,29,1,30,1,30,1,30,1,30,5,30,636,8,30,
        10,30,12,30,639,9,30,1,30,1,30,5,30,643,8,30,10,30,12,30,646,9,30,
        1,30,1,30,1,31,1,31,1,31,1,31,1,31,1,31,1,32,1,32,1,32,1,32,1,32,
        3,32,661,8,32,1,32,1,32,1,33,1,33,1,33,1,33,5,33,669,8,33,10,33,
        12,33,672,9,33,1,33,1,33,1,34,1,34,1,34,5,34,679,8,34,10,34,12,34,
        682,9,34,1,34,1,34,1,35,1,35,1,35,3,35,689,8,35,1,35,1,35,1,36,1,
        36,1,36,1,36,1,36,1,37,1,37,1,37,3,37,701,8,37,1,37,1,37,1,37,1,
        38,1,38,1,38,1,38,1,38,1,38,1,39,1,39,1,39,4,39,715,8,39,11,39,12,
        39,716,1,39,1,39,1,40,1,40,1,40,1,40,1,40,3,40,726,8,40,1,41,1,41,
        1,41,1,41,1,41,1,41,1,41,1,41,1,41,3,41,737,8,41,1,42,1,42,1,42,
        1,42,1,42,1,42,1,43,1,43,1,43,1,43,1,43,1,43,1,43,1,43,1,43,1,43,
        1,43,1,43,1,43,1,43,1,43,1,43,1,43,1,43,1,43,1,43,1,43,1,43,1,43,
        1,43,1,43,3,43,770,8,43,1,44,1,44,1,44,4,44,775,8,44,11,44,12,44,
        776,1,44,1,44,1,45,1,45,1,45,3,45,784,8,45,1,45,1,45,1,46,1,46,1,
        46,1,46,4,46,792,8,46,11,46,12,46,793,1,46,1,46,1,47,1,47,1,47,1,
        47,1,47,1,48,1,48,1,48,1,48,1,48,1,48,1,49,1,49,1,49,4,49,812,8,
        49,11,49,12,49,813,1,49,1,49,1,50,1,50,1,50,1,50,4,50,822,8,50,11,
        50,12,50,823,1,50,1,50,1,51,1,51,1,51,1,51,1,51,1,52,1,52,1,52,1,
        52,1,52,1,53,1,53,1,53,1,53,3,53,842,8,53,1,53,1,53,1,53,1,54,1,
        54,1,54,1,54,3,54,851,8,54,1,54,1,54,1,55,1,55,1,55,1,55,1,55,1,
        55,1,55,1,55,1,55,1,55,1,55,1,55,1,55,1,55,1,55,1,55,3,55,871,8,
        55,1,56,1,56,1,56,4,56,876,8,56,11,56,12,56,877,1,56,1,56,1,57,1,
        57,1,57,4,57,885,8,57,11,57,12,57,886,1,57,1,57,1,58,1,58,1,58,1,
        58,1,58,1,59,1,59,1,59,4,59,899,8,59,11,59,12,59,900,1,59,1,59,1,
        60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,3,60,916,8,
        60,1,61,1,61,1,61,3,61,921,8,61,1,61,1,61,5,61,925,8,61,10,61,12,
        61,928,9,61,1,61,1,61,1,61,1,61,1,62,1,62,1,62,3,62,937,8,62,1,62,
        1,62,1,62,1,63,1,63,1,63,5,63,945,8,63,10,63,12,63,948,9,63,1,63,
        1,63,1,64,1,64,5,64,954,8,64,10,64,12,64,957,9,64,1,64,1,64,3,64,
        961,8,64,1,64,1,64,1,64,1,65,1,65,1,66,1,66,1,66,1,66,1,66,1,67,
        1,67,1,67,1,67,1,67,1,68,1,68,1,68,1,68,1,68,1,69,1,69,1,69,1,69,
        1,69,1,69,1,70,1,70,1,70,1,70,1,70,1,70,1,70,1,70,1,71,1,71,1,71,
        1,71,1,71,1,72,1,72,1,72,1,72,1,72,3,72,1007,8,72,1,72,1,72,1,72,
        1,73,1,73,1,73,4,73,1015,8,73,11,73,12,73,1016,1,73,1,73,1,74,1,
        74,1,75,1,75,1,75,4,75,1026,8,75,11,75,12,75,1027,1,75,1,75,1,76,
        1,76,3,76,1034,8,76,1,77,1,77,1,77,4,77,1039,8,77,11,77,12,77,1040,
        1,77,1,77,1,78,1,78,1,78,4,78,1048,8,78,11,78,12,78,1049,1,78,1,
        78,1,79,1,79,1,79,1,79,3,79,1058,8,79,1,79,3,79,1061,8,79,1,79,3,
        79,1064,8,79,1,80,1,80,1,80,1,80,1,80,1,81,1,81,1,81,1,81,1,81,1,
        82,1,82,1,82,1,82,1,82,1,82,1,82,1,82,1,82,1,82,1,82,1,82,3,82,1088,
        8,82,1,83,1,83,1,83,1,83,5,83,1094,8,83,10,83,12,83,1097,9,83,1,
        83,3,83,1100,8,83,1,83,1,83,1,84,1,84,1,84,1,84,5,84,1108,8,84,10,
        84,12,84,1111,9,84,1,84,1,84,1,85,1,85,1,85,5,85,1118,8,85,10,85,
        12,85,1121,9,85,1,85,1,85,1,86,1,86,1,86,1,86,1,86,1,86,5,86,1131,
        8,86,10,86,12,86,1134,9,86,1,86,1,86,1,87,1,87,1,87,1,87,1,87,5,
        87,1143,8,87,10,87,12,87,1146,9,87,1,87,1,87,1,88,1,88,1,88,1,88,
        1,88,5,88,1155,8,88,10,88,12,88,1158,9,88,1,88,1,88,1,89,1,89,1,
        89,1,89,1,89,5,89,1167,8,89,10,89,12,89,1170,9,89,1,89,1,89,1,90,
        1,90,1,90,5,90,1177,8,90,10,90,12,90,1180,9,90,1,90,1,90,3,90,1184,
        8,90,1,90,3,90,1187,8,90,1,90,1,90,1,91,1,91,1,91,1,91,5,91,1195,
        8,91,10,91,12,91,1198,9,91,1,91,1,91,1,92,1,92,1,92,5,92,1205,8,
        92,10,92,12,92,1208,9,92,1,92,1,92,1,93,1,93,1,93,1,93,1,93,1,93,
        1,93,1,93,1,93,1,93,1,93,1,93,1,93,1,93,1,93,1,93,1,93,1,93,1,93,
        1,93,1,93,1,93,1,93,1,93,1,93,1,93,1,93,1,93,1,93,1,93,1,93,1,93,
        1,93,1,93,1,93,3,93,1247,8,93,1,94,1,94,1,95,1,95,1,96,1,96,1,96,
        5,96,1256,8,96,10,96,12,96,1259,9,96,1,96,1,96,1,97,1,97,1,97,1,
        97,5,97,1267,8,97,10,97,12,97,1270,9,97,1,97,1,97,1,98,1,98,1,98,
        1,98,1,98,1,99,1,99,1,99,1,99,1,99,1,99,1,100,1,100,1,100,1,100,
        5,100,1289,8,100,10,100,12,100,1292,9,100,1,100,1,100,1,101,1,101,
        1,101,1,101,5,101,1300,8,101,10,101,12,101,1303,9,101,1,101,1,101,
        1,102,1,102,1,102,1,102,5,102,1311,8,102,10,102,12,102,1314,9,102,
        1,102,1,102,1,103,1,103,1,103,1,103,5,103,1322,8,103,10,103,12,103,
        1325,9,103,1,103,1,103,1,104,1,104,1,104,1,104,5,104,1333,8,104,
        10,104,12,104,1336,9,104,1,104,1,104,1,105,1,105,1,105,1,105,5,105,
        1344,8,105,10,105,12,105,1347,9,105,1,105,1,105,1,106,1,106,1,106,
        1,106,1,106,1,107,1,107,1,107,3,107,1359,8,107,1,107,1,107,1,108,
        1,108,1,108,1,108,1,108,1,109,1,109,1,109,1,109,1,109,5,109,1373,
        8,109,10,109,12,109,1376,9,109,1,109,1,109,1,110,1,110,1,110,1,110,
        1,110,5,110,1385,8,110,10,110,12,110,1388,9,110,1,110,1,110,1,111,
        1,111,1,111,1,111,1,111,1,111,1,111,1,112,1,112,1,112,1,112,1,112,
        4,112,1404,8,112,11,112,12,112,1405,1,112,1,112,1,113,1,113,1,113,
        1,113,3,113,1414,8,113,1,113,5,113,1417,8,113,10,113,12,113,1420,
        9,113,1,113,1,113,1,114,1,114,1,114,5,114,1427,8,114,10,114,12,114,
        1430,9,114,1,114,1,114,1,115,1,115,1,115,1,115,1,115,1,115,1,115,
        1,115,1,115,1,115,1,115,1,115,1,115,3,115,1447,8,115,1,116,1,116,
        1,116,1,116,5,116,1453,8,116,10,116,12,116,1456,9,116,1,116,1,116,
        1,117,1,117,1,117,5,117,1463,8,117,10,117,12,117,1466,9,117,1,117,
        1,117,1,118,1,118,1,118,1,118,4,118,1474,8,118,11,118,12,118,1475,
        1,118,1,118,1,119,1,119,1,120,1,120,1,120,1,120,1,120,1,120,1,121,
        1,121,1,121,1,121,1,121,1,121,1,122,1,122,1,122,1,122,1,122,1,123,
        1,123,1,123,1,123,1,123,1,123,1,123,3,123,1506,8,123,1,124,1,124,
        1,124,1,124,1,124,1,125,1,125,1,125,1,125,1,125,1,126,1,126,1,126,
        1,126,1,126,1,126,1,127,1,127,1,127,1,127,1,127,1,127,1,128,1,128,
        1,128,1,128,1,128,1,128,1,129,1,129,1,129,3,129,1539,8,129,1,129,
        5,129,1542,8,129,10,129,12,129,1545,9,129,1,129,1,129,1,130,1,130,
        1,130,4,130,1552,8,130,11,130,12,130,1553,1,130,1,130,1,131,1,131,
        1,131,3,131,1561,8,131,1,131,5,131,1564,8,131,10,131,12,131,1567,
        9,131,1,131,3,131,1570,8,131,1,131,3,131,1573,8,131,3,131,1575,8,
        131,1,131,1,131,1,131,3,131,1580,8,131,1,131,1,131,1,131,1,131,1,
        131,3,131,1587,8,131,3,131,1589,8,131,1,132,1,132,1,132,1,132,3,
        132,1595,8,132,1,132,1,132,1,133,1,133,1,133,1,133,1,133,3,133,1604,
        8,133,1,133,1,133,1,134,1,134,1,134,0,0,135,0,2,4,6,8,10,12,14,16,
        18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,
        62,64,66,68,70,72,74,76,78,80,82,84,86,88,90,92,94,96,98,100,102,
        104,106,108,110,112,114,116,118,120,122,124,126,128,130,132,134,
        136,138,140,142,144,146,148,150,152,154,156,158,160,162,164,166,
        168,170,172,174,176,178,180,182,184,186,188,190,192,194,196,198,
        200,202,204,206,208,210,212,214,216,218,220,222,224,226,228,230,
        232,234,236,238,240,242,244,246,248,250,252,254,256,258,260,262,
        264,266,268,0,5,2,0,82,82,107,108,2,0,73,73,81,81,7,0,5,27,31,31,
        33,80,82,84,86,93,96,108,110,110,1,0,33,34,2,0,82,84,107,108,1699,
        0,270,1,0,0,0,2,289,1,0,0,0,4,296,1,0,0,0,6,298,1,0,0,0,8,320,1,
        0,0,0,10,322,1,0,0,0,12,334,1,0,0,0,14,346,1,0,0,0,16,349,1,0,0,
        0,18,358,1,0,0,0,20,370,1,0,0,0,22,379,1,0,0,0,24,400,1,0,0,0,26,
        417,1,0,0,0,28,422,1,0,0,0,30,431,1,0,0,0,32,447,1,0,0,0,34,449,
        1,0,0,0,36,451,1,0,0,0,38,469,1,0,0,0,40,480,1,0,0,0,42,498,1,0,
        0,0,44,510,1,0,0,0,46,528,1,0,0,0,48,551,1,0,0,0,50,553,1,0,0,0,
        52,564,1,0,0,0,54,605,1,0,0,0,56,607,1,0,0,0,58,625,1,0,0,0,60,631,
        1,0,0,0,62,649,1,0,0,0,64,655,1,0,0,0,66,664,1,0,0,0,68,675,1,0,
        0,0,70,685,1,0,0,0,72,692,1,0,0,0,74,697,1,0,0,0,76,705,1,0,0,0,
        78,711,1,0,0,0,80,725,1,0,0,0,82,736,1,0,0,0,84,738,1,0,0,0,86,769,
        1,0,0,0,88,771,1,0,0,0,90,780,1,0,0,0,92,787,1,0,0,0,94,797,1,0,
        0,0,96,802,1,0,0,0,98,808,1,0,0,0,100,817,1,0,0,0,102,827,1,0,0,
        0,104,832,1,0,0,0,106,837,1,0,0,0,108,846,1,0,0,0,110,870,1,0,0,
        0,112,872,1,0,0,0,114,881,1,0,0,0,116,890,1,0,0,0,118,895,1,0,0,
        0,120,915,1,0,0,0,122,917,1,0,0,0,124,933,1,0,0,0,126,941,1,0,0,
        0,128,951,1,0,0,0,130,965,1,0,0,0,132,967,1,0,0,0,134,972,1,0,0,
        0,136,977,1,0,0,0,138,982,1,0,0,0,140,988,1,0,0,0,142,996,1,0,0,
        0,144,1001,1,0,0,0,146,1011,1,0,0,0,148,1020,1,0,0,0,150,1022,1,
        0,0,0,152,1033,1,0,0,0,154,1035,1,0,0,0,156,1044,1,0,0,0,158,1063,
        1,0,0,0,160,1065,1,0,0,0,162,1070,1,0,0,0,164,1087,1,0,0,0,166,1089,
        1,0,0,0,168,1103,1,0,0,0,170,1114,1,0,0,0,172,1124,1,0,0,0,174,1137,
        1,0,0,0,176,1149,1,0,0,0,178,1161,1,0,0,0,180,1173,1,0,0,0,182,1190,
        1,0,0,0,184,1201,1,0,0,0,186,1246,1,0,0,0,188,1248,1,0,0,0,190,1250,
        1,0,0,0,192,1252,1,0,0,0,194,1262,1,0,0,0,196,1273,1,0,0,0,198,1278,
        1,0,0,0,200,1284,1,0,0,0,202,1295,1,0,0,0,204,1306,1,0,0,0,206,1317,
        1,0,0,0,208,1328,1,0,0,0,210,1339,1,0,0,0,212,1350,1,0,0,0,214,1355,
        1,0,0,0,216,1362,1,0,0,0,218,1367,1,0,0,0,220,1379,1,0,0,0,222,1391,
        1,0,0,0,224,1398,1,0,0,0,226,1409,1,0,0,0,228,1423,1,0,0,0,230,1446,
        1,0,0,0,232,1448,1,0,0,0,234,1459,1,0,0,0,236,1469,1,0,0,0,238,1479,
        1,0,0,0,240,1481,1,0,0,0,242,1487,1,0,0,0,244,1493,1,0,0,0,246,1505,
        1,0,0,0,248,1507,1,0,0,0,250,1512,1,0,0,0,252,1517,1,0,0,0,254,1523,
        1,0,0,0,256,1529,1,0,0,0,258,1535,1,0,0,0,260,1548,1,0,0,0,262,1588,
        1,0,0,0,264,1590,1,0,0,0,266,1598,1,0,0,0,268,1607,1,0,0,0,270,271,
        5,2,0,0,271,275,5,5,0,0,272,274,3,2,1,0,273,272,1,0,0,0,274,277,
        1,0,0,0,275,273,1,0,0,0,275,276,1,0,0,0,276,278,1,0,0,0,277,275,
        1,0,0,0,278,279,5,3,0,0,279,1,1,0,0,0,280,290,3,6,3,0,281,290,3,
        8,4,0,282,290,3,10,5,0,283,290,3,12,6,0,284,290,3,16,8,0,285,290,
        3,18,9,0,286,290,3,22,11,0,287,290,3,104,52,0,288,290,3,54,27,0,
        289,280,1,0,0,0,289,281,1,0,0,0,289,282,1,0,0,0,289,283,1,0,0,0,
        289,284,1,0,0,0,289,285,1,0,0,0,289,286,1,0,0,0,289,287,1,0,0,0,
        289,288,1,0,0,0,290,3,1,0,0,0,291,297,3,10,5,0,292,297,3,12,6,0,
        293,297,3,22,11,0,294,297,3,18,9,0,295,297,3,16,8,0,296,291,1,0,
        0,0,296,292,1,0,0,0,296,293,1,0,0,0,296,294,1,0,0,0,296,295,1,0,
        0,0,297,5,1,0,0,0,298,299,5,2,0,0,299,300,5,15,0,0,300,301,5,110,
        0,0,301,305,3,262,131,0,302,304,3,54,27,0,303,302,1,0,0,0,304,307,
        1,0,0,0,305,303,1,0,0,0,305,306,1,0,0,0,306,308,1,0,0,0,307,305,
        1,0,0,0,308,309,5,3,0,0,309,7,1,0,0,0,310,311,5,2,0,0,311,312,5,
        16,0,0,312,313,3,10,5,0,313,314,5,3,0,0,314,321,1,0,0,0,315,316,
        5,2,0,0,316,317,5,16,0,0,317,318,3,12,6,0,318,319,5,3,0,0,319,321,
        1,0,0,0,320,310,1,0,0,0,320,315,1,0,0,0,321,9,1,0,0,0,322,323,5,
        2,0,0,323,327,5,7,0,0,324,326,3,14,7,0,325,324,1,0,0,0,326,329,1,
        0,0,0,327,325,1,0,0,0,327,328,1,0,0,0,328,330,1,0,0,0,329,327,1,
        0,0,0,330,331,5,110,0,0,331,332,3,186,93,0,332,333,5,3,0,0,333,11,
        1,0,0,0,334,335,5,2,0,0,335,339,5,9,0,0,336,338,3,14,7,0,337,336,
        1,0,0,0,338,341,1,0,0,0,339,337,1,0,0,0,339,340,1,0,0,0,340,342,
        1,0,0,0,341,339,1,0,0,0,342,343,5,110,0,0,343,344,3,186,93,0,344,
        345,5,3,0,0,345,13,1,0,0,0,346,347,5,93,0,0,347,348,5,106,0,0,348,
        15,1,0,0,0,349,350,5,2,0,0,350,351,5,78,0,0,351,353,5,110,0,0,352,
        354,3,156,78,0,353,352,1,0,0,0,353,354,1,0,0,0,354,355,1,0,0,0,355,
        356,3,110,55,0,356,357,5,3,0,0,357,17,1,0,0,0,358,359,5,2,0,0,359,
        360,5,79,0,0,360,362,5,110,0,0,361,363,3,156,78,0,362,361,1,0,0,
        0,362,363,1,0,0,0,363,365,1,0,0,0,364,366,3,20,10,0,365,364,1,0,
        0,0,365,366,1,0,0,0,366,367,1,0,0,0,367,368,3,126,63,0,368,369,5,
        3,0,0,369,19,1,0,0,0,370,371,5,2,0,0,371,373,5,76,0,0,372,374,3,
        110,55,0,373,372,1,0,0,0,374,375,1,0,0,0,375,373,1,0,0,0,375,376,
        1,0,0,0,376,377,1,0,0,0,377,378,5,3,0,0,378,21,1,0,0,0,379,380,5,
        2,0,0,380,384,5,52,0,0,381,383,3,34,17,0,382,381,1,0,0,0,383,386,
        1,0,0,0,384,382,1,0,0,0,384,385,1,0,0,0,385,387,1,0,0,0,386,384,
        1,0,0,0,387,389,5,110,0,0,388,390,3,156,78,0,389,388,1,0,0,0,389,
        390,1,0,0,0,390,392,1,0,0,0,391,393,3,26,13,0,392,391,1,0,0,0,392,
        393,1,0,0,0,393,395,1,0,0,0,394,396,3,28,14,0,395,394,1,0,0,0,395,
        396,1,0,0,0,396,397,1,0,0,0,397,398,3,30,15,0,398,399,5,3,0,0,399,
        23,1,0,0,0,400,401,5,2,0,0,401,405,5,52,0,0,402,404,3,34,17,0,403,
        402,1,0,0,0,404,407,1,0,0,0,405,403,1,0,0,0,405,406,1,0,0,0,406,
        409,1,0,0,0,407,405,1,0,0,0,408,410,3,26,13,0,409,408,1,0,0,0,409,
        410,1,0,0,0,410,412,1,0,0,0,411,413,3,28,14,0,412,411,1,0,0,0,412,
        413,1,0,0,0,413,414,1,0,0,0,414,415,3,30,15,0,415,416,5,3,0,0,416,
        25,1,0,0,0,417,418,5,2,0,0,418,419,5,76,0,0,419,420,3,110,55,0,420,
        421,5,3,0,0,421,27,1,0,0,0,422,423,5,2,0,0,423,425,5,59,0,0,424,
        426,3,110,55,0,425,424,1,0,0,0,426,427,1,0,0,0,427,425,1,0,0,0,427,
        428,1,0,0,0,428,429,1,0,0,0,429,430,5,3,0,0,430,29,1,0,0,0,431,432,
        5,2,0,0,432,436,5,49,0,0,433,435,3,32,16,0,434,433,1,0,0,0,435,438,
        1,0,0,0,436,434,1,0,0,0,436,437,1,0,0,0,437,439,1,0,0,0,438,436,
        1,0,0,0,439,440,5,3,0,0,440,31,1,0,0,0,441,448,3,36,18,0,442,448,
        3,38,19,0,443,448,3,40,20,0,444,448,3,42,21,0,445,448,3,44,22,0,
        446,448,3,46,23,0,447,441,1,0,0,0,447,442,1,0,0,0,447,443,1,0,0,
        0,447,444,1,0,0,0,447,445,1,0,0,0,447,446,1,0,0,0,448,33,1,0,0,0,
        449,450,5,106,0,0,450,35,1,0,0,0,451,452,5,2,0,0,452,456,5,53,0,
        0,453,455,3,34,17,0,454,453,1,0,0,0,455,458,1,0,0,0,456,454,1,0,
        0,0,456,457,1,0,0,0,457,459,1,0,0,0,458,456,1,0,0,0,459,462,5,110,
        0,0,460,461,5,85,0,0,461,463,3,110,55,0,462,460,1,0,0,0,462,463,
        1,0,0,0,463,465,1,0,0,0,464,466,3,186,93,0,465,464,1,0,0,0,465,466,
        1,0,0,0,466,467,1,0,0,0,467,468,5,3,0,0,468,37,1,0,0,0,469,470,5,
        2,0,0,470,471,5,54,0,0,471,475,3,52,26,0,472,474,3,54,27,0,473,472,
        1,0,0,0,474,477,1,0,0,0,475,473,1,0,0,0,475,476,1,0,0,0,476,478,
        1,0,0,0,477,475,1,0,0,0,478,479,5,3,0,0,479,39,1,0,0,0,480,481,5,
        2,0,0,481,485,5,12,0,0,482,484,3,34,17,0,483,482,1,0,0,0,484,487,
        1,0,0,0,485,483,1,0,0,0,485,486,1,0,0,0,486,488,1,0,0,0,487,485,
        1,0,0,0,488,489,3,48,24,0,489,493,3,52,26,0,490,492,3,54,27,0,491,
        490,1,0,0,0,492,495,1,0,0,0,493,491,1,0,0,0,493,494,1,0,0,0,494,
        496,1,0,0,0,495,493,1,0,0,0,496,497,5,3,0,0,497,41,1,0,0,0,498,499,
        5,2,0,0,499,503,5,51,0,0,500,502,3,34,17,0,501,500,1,0,0,0,502,505,
        1,0,0,0,503,501,1,0,0,0,503,504,1,0,0,0,504,506,1,0,0,0,505,503,
        1,0,0,0,506,507,3,48,24,0,507,508,3,52,26,0,508,509,5,3,0,0,509,
        43,1,0,0,0,510,511,5,2,0,0,511,515,5,57,0,0,512,514,3,34,17,0,513,
        512,1,0,0,0,514,517,1,0,0,0,515,513,1,0,0,0,515,516,1,0,0,0,516,
        518,1,0,0,0,517,515,1,0,0,0,518,519,3,48,24,0,519,523,3,52,26,0,
        520,522,3,54,27,0,521,520,1,0,0,0,522,525,1,0,0,0,523,521,1,0,0,
        0,523,524,1,0,0,0,524,526,1,0,0,0,525,523,1,0,0,0,526,527,5,3,0,
        0,527,45,1,0,0,0,528,529,5,2,0,0,529,533,5,58,0,0,530,532,3,34,17,
        0,531,530,1,0,0,0,532,535,1,0,0,0,533,531,1,0,0,0,533,534,1,0,0,
        0,534,536,1,0,0,0,535,533,1,0,0,0,536,537,3,48,24,0,537,541,3,52,
        26,0,538,540,3,54,27,0,539,538,1,0,0,0,540,543,1,0,0,0,541,539,1,
        0,0,0,541,542,1,0,0,0,542,544,1,0,0,0,543,541,1,0,0,0,544,545,5,
        3,0,0,545,47,1,0,0,0,546,552,5,110,0,0,547,548,5,94,0,0,548,549,
        3,186,93,0,549,550,5,95,0,0,550,552,1,0,0,0,551,546,1,0,0,0,551,
        547,1,0,0,0,552,49,1,0,0,0,553,554,5,2,0,0,554,556,5,110,0,0,555,
        557,5,81,0,0,556,555,1,0,0,0,556,557,1,0,0,0,557,560,1,0,0,0,558,
        559,5,85,0,0,559,561,3,110,55,0,560,558,1,0,0,0,560,561,1,0,0,0,
        561,562,1,0,0,0,562,563,5,3,0,0,563,51,1,0,0,0,564,575,5,2,0,0,565,
        572,3,50,25,0,566,568,5,4,0,0,567,566,1,0,0,0,567,568,1,0,0,0,568,
        569,1,0,0,0,569,571,3,50,25,0,570,567,1,0,0,0,571,574,1,0,0,0,572,
        570,1,0,0,0,572,573,1,0,0,0,573,576,1,0,0,0,574,572,1,0,0,0,575,
        565,1,0,0,0,575,576,1,0,0,0,576,577,1,0,0,0,577,583,5,3,0,0,578,
        579,5,2,0,0,579,580,5,77,0,0,580,581,3,110,55,0,581,582,5,3,0,0,
        582,584,1,0,0,0,583,578,1,0,0,0,583,584,1,0,0,0,584,53,1,0,0,0,585,
        606,3,56,28,0,586,606,3,58,29,0,587,606,3,60,30,0,588,606,3,62,31,
        0,589,606,3,64,32,0,590,606,3,66,33,0,591,606,3,180,90,0,592,606,
        3,68,34,0,593,606,3,70,35,0,594,606,3,72,36,0,595,606,3,74,37,0,
        596,606,3,76,38,0,597,606,3,82,41,0,598,606,3,166,83,0,599,606,3,
        172,86,0,600,606,3,174,87,0,601,606,3,176,88,0,602,606,3,178,89,
        0,603,606,3,164,82,0,604,606,3,186,93,0,605,585,1,0,0,0,605,586,
        1,0,0,0,605,587,1,0,0,0,605,588,1,0,0,0,605,589,1,0,0,0,605,590,
        1,0,0,0,605,591,1,0,0,0,605,592,1,0,0,0,605,593,1,0,0,0,605,594,
        1,0,0,0,605,595,1,0,0,0,605,596,1,0,0,0,605,597,1,0,0,0,605,598,
        1,0,0,0,605,599,1,0,0,0,605,600,1,0,0,0,605,601,1,0,0,0,605,602,
        1,0,0,0,605,603,1,0,0,0,605,604,1,0,0,0,606,55,1,0,0,0,607,608,5,
        2,0,0,608,609,5,6,0,0,609,613,5,2,0,0,610,612,3,106,53,0,611,610,
        1,0,0,0,612,615,1,0,0,0,613,611,1,0,0,0,613,614,1,0,0,0,614,616,
        1,0,0,0,615,613,1,0,0,0,616,620,5,3,0,0,617,619,3,54,27,0,618,617,
        1,0,0,0,619,622,1,0,0,0,620,618,1,0,0,0,620,621,1,0,0,0,621,623,
        1,0,0,0,622,620,1,0,0,0,623,624,5,3,0,0,624,57,1,0,0,0,625,626,5,
        2,0,0,626,627,5,7,0,0,627,628,3,108,54,0,628,629,3,186,93,0,629,
        630,5,3,0,0,630,59,1,0,0,0,631,632,5,2,0,0,632,633,5,8,0,0,633,637,
        5,2,0,0,634,636,3,106,53,0,635,634,1,0,0,0,636,639,1,0,0,0,637,635,
        1,0,0,0,637,638,1,0,0,0,638,640,1,0,0,0,639,637,1,0,0,0,640,644,
        5,3,0,0,641,643,3,54,27,0,642,641,1,0,0,0,643,646,1,0,0,0,644,642,
        1,0,0,0,644,645,1,0,0,0,645,647,1,0,0,0,646,644,1,0,0,0,647,648,
        5,3,0,0,648,61,1,0,0,0,649,650,5,2,0,0,650,651,5,9,0,0,651,652,3,
        108,54,0,652,653,3,186,93,0,653,654,5,3,0,0,654,63,1,0,0,0,655,656,
        5,2,0,0,656,657,5,17,0,0,657,658,3,186,93,0,658,660,3,54,27,0,659,
        661,3,54,27,0,660,659,1,0,0,0,660,661,1,0,0,0,661,662,1,0,0,0,662,
        663,5,3,0,0,663,65,1,0,0,0,664,665,5,2,0,0,665,666,5,18,0,0,666,
        670,3,186,93,0,667,669,3,54,27,0,668,667,1,0,0,0,669,672,1,0,0,0,
        670,668,1,0,0,0,670,671,1,0,0,0,671,673,1,0,0,0,672,670,1,0,0,0,
        673,674,5,3,0,0,674,67,1,0,0,0,675,676,5,2,0,0,676,680,5,19,0,0,
        677,679,3,54,27,0,678,677,1,0,0,0,679,682,1,0,0,0,680,678,1,0,0,
        0,680,681,1,0,0,0,681,683,1,0,0,0,682,680,1,0,0,0,683,684,5,3,0,
        0,684,69,1,0,0,0,685,686,5,2,0,0,686,688,5,20,0,0,687,689,3,186,
        93,0,688,687,1,0,0,0,688,689,1,0,0,0,689,690,1,0,0,0,690,691,5,3,
        0,0,691,71,1,0,0,0,692,693,5,2,0,0,693,694,5,21,0,0,694,695,3,186,
        93,0,695,696,5,3,0,0,696,73,1,0,0,0,697,698,5,2,0,0,698,700,5,38,
        0,0,699,701,3,228,114,0,700,699,1,0,0,0,700,701,1,0,0,0,701,702,
        1,0,0,0,702,703,5,108,0,0,703,704,5,3,0,0,704,75,1,0,0,0,705,706,
        5,2,0,0,706,707,5,102,0,0,707,708,3,78,39,0,708,709,5,108,0,0,709,
        710,5,3,0,0,710,77,1,0,0,0,711,712,5,2,0,0,712,714,5,110,0,0,713,
        715,3,80,40,0,714,713,1,0,0,0,715,716,1,0,0,0,716,714,1,0,0,0,716,
        717,1,0,0,0,717,718,1,0,0,0,718,719,5,3,0,0,719,79,1,0,0,0,720,726,
        5,110,0,0,721,722,5,2,0,0,722,723,5,110,0,0,723,724,5,110,0,0,724,
        726,5,3,0,0,725,720,1,0,0,0,725,721,1,0,0,0,726,81,1,0,0,0,727,737,
        3,84,42,0,728,737,3,86,43,0,729,737,3,88,44,0,730,737,3,96,48,0,
        731,737,3,92,46,0,732,737,3,94,47,0,733,737,3,98,49,0,734,737,3,
        100,50,0,735,737,3,102,51,0,736,727,1,0,0,0,736,728,1,0,0,0,736,
        729,1,0,0,0,736,730,1,0,0,0,736,731,1,0,0,0,736,732,1,0,0,0,736,
        733,1,0,0,0,736,734,1,0,0,0,736,735,1,0,0,0,737,83,1,0,0,0,738,739,
        5,2,0,0,739,740,5,96,0,0,740,741,5,110,0,0,741,742,3,186,93,0,742,
        743,5,3,0,0,743,85,1,0,0,0,744,745,5,2,0,0,745,746,5,97,0,0,746,
        747,3,22,11,0,747,748,5,3,0,0,748,770,1,0,0,0,749,750,5,2,0,0,750,
        751,5,97,0,0,751,752,3,24,12,0,752,753,5,3,0,0,753,770,1,0,0,0,754,
        755,5,2,0,0,755,756,5,97,0,0,756,757,3,10,5,0,757,758,5,3,0,0,758,
        770,1,0,0,0,759,760,5,2,0,0,760,761,5,97,0,0,761,762,3,12,6,0,762,
        763,5,3,0,0,763,770,1,0,0,0,764,765,5,2,0,0,765,766,5,97,0,0,766,
        767,3,186,93,0,767,768,5,3,0,0,768,770,1,0,0,0,769,744,1,0,0,0,769,
        749,1,0,0,0,769,754,1,0,0,0,769,759,1,0,0,0,769,764,1,0,0,0,770,
        87,1,0,0,0,771,772,5,2,0,0,772,774,5,98,0,0,773,775,3,90,45,0,774,
        773,1,0,0,0,775,776,1,0,0,0,776,774,1,0,0,0,776,777,1,0,0,0,777,
        778,1,0,0,0,778,779,5,3,0,0,779,89,1,0,0,0,780,781,5,2,0,0,781,783,
        5,110,0,0,782,784,5,110,0,0,783,782,1,0,0,0,783,784,1,0,0,0,784,
        785,1,0,0,0,785,786,5,3,0,0,786,91,1,0,0,0,787,788,5,2,0,0,788,789,
        5,100,0,0,789,791,5,108,0,0,790,792,3,90,45,0,791,790,1,0,0,0,792,
        793,1,0,0,0,793,791,1,0,0,0,793,794,1,0,0,0,794,795,1,0,0,0,795,
        796,5,3,0,0,796,93,1,0,0,0,797,798,5,2,0,0,798,799,5,101,0,0,799,
        800,5,108,0,0,800,801,5,3,0,0,801,95,1,0,0,0,802,803,5,2,0,0,803,
        804,5,99,0,0,804,805,5,108,0,0,805,806,5,108,0,0,806,807,5,3,0,0,
        807,97,1,0,0,0,808,809,5,2,0,0,809,811,5,105,0,0,810,812,3,90,45,
        0,811,810,1,0,0,0,812,813,1,0,0,0,813,811,1,0,0,0,813,814,1,0,0,
        0,814,815,1,0,0,0,815,816,5,3,0,0,816,99,1,0,0,0,817,818,5,2,0,0,
        818,819,5,104,0,0,819,821,5,108,0,0,820,822,3,90,45,0,821,820,1,
        0,0,0,822,823,1,0,0,0,823,821,1,0,0,0,823,824,1,0,0,0,824,825,1,
        0,0,0,825,826,5,3,0,0,826,101,1,0,0,0,827,828,5,2,0,0,828,829,5,
        103,0,0,829,830,5,108,0,0,830,831,5,3,0,0,831,103,1,0,0,0,832,833,
        5,2,0,0,833,834,5,96,0,0,834,835,3,4,2,0,835,836,5,3,0,0,836,105,
        1,0,0,0,837,838,5,2,0,0,838,841,5,110,0,0,839,840,5,85,0,0,840,842,
        3,110,55,0,841,839,1,0,0,0,841,842,1,0,0,0,842,843,1,0,0,0,843,844,
        3,186,93,0,844,845,5,3,0,0,845,107,1,0,0,0,846,847,5,2,0,0,847,850,
        5,110,0,0,848,849,5,85,0,0,849,851,3,110,55,0,850,848,1,0,0,0,850,
        851,1,0,0,0,851,852,1,0,0,0,852,853,5,3,0,0,853,109,1,0,0,0,854,
        871,5,110,0,0,855,871,3,112,56,0,856,871,3,114,57,0,857,871,3,116,
        58,0,858,871,3,118,59,0,859,871,3,122,61,0,860,871,3,126,63,0,861,
        871,3,132,66,0,862,871,3,134,67,0,863,871,3,136,68,0,864,871,3,138,
        69,0,865,871,3,140,70,0,866,871,3,142,71,0,867,871,3,144,72,0,868,
        871,3,150,75,0,869,871,3,154,77,0,870,854,1,0,0,0,870,855,1,0,0,
        0,870,856,1,0,0,0,870,857,1,0,0,0,870,858,1,0,0,0,870,859,1,0,0,
        0,870,860,1,0,0,0,870,861,1,0,0,0,870,862,1,0,0,0,870,863,1,0,0,
        0,870,864,1,0,0,0,870,865,1,0,0,0,870,866,1,0,0,0,870,867,1,0,0,
        0,870,868,1,0,0,0,870,869,1,0,0,0,871,111,1,0,0,0,872,873,5,2,0,
        0,873,875,5,60,0,0,874,876,3,110,55,0,875,874,1,0,0,0,876,877,1,
        0,0,0,877,875,1,0,0,0,877,878,1,0,0,0,878,879,1,0,0,0,879,880,5,
        3,0,0,880,113,1,0,0,0,881,882,5,2,0,0,882,884,5,61,0,0,883,885,3,
        110,55,0,884,883,1,0,0,0,885,886,1,0,0,0,886,884,1,0,0,0,886,887,
        1,0,0,0,887,888,1,0,0,0,888,889,5,3,0,0,889,115,1,0,0,0,890,891,
        5,2,0,0,891,892,5,26,0,0,892,893,3,110,55,0,893,894,5,3,0,0,894,
        117,1,0,0,0,895,896,5,2,0,0,896,898,5,62,0,0,897,899,3,120,60,0,
        898,897,1,0,0,0,899,900,1,0,0,0,900,898,1,0,0,0,900,901,1,0,0,0,
        901,902,1,0,0,0,902,903,5,3,0,0,903,119,1,0,0,0,904,905,5,2,0,0,
        905,906,5,72,0,0,906,907,3,110,55,0,907,908,5,3,0,0,908,916,1,0,
        0,0,909,910,5,2,0,0,910,911,5,110,0,0,911,912,3,110,55,0,912,913,
        5,3,0,0,913,916,1,0,0,0,914,916,3,110,55,0,915,904,1,0,0,0,915,909,
        1,0,0,0,915,914,1,0,0,0,916,121,1,0,0,0,917,918,5,2,0,0,918,920,
        5,63,0,0,919,921,3,156,78,0,920,919,1,0,0,0,920,921,1,0,0,0,921,
        922,1,0,0,0,922,926,5,2,0,0,923,925,3,124,62,0,924,923,1,0,0,0,925,
        928,1,0,0,0,926,924,1,0,0,0,926,927,1,0,0,0,927,929,1,0,0,0,928,
        926,1,0,0,0,929,930,5,3,0,0,930,931,3,110,55,0,931,932,5,3,0,0,932,
        123,1,0,0,0,933,934,5,2,0,0,934,936,5,110,0,0,935,937,5,81,0,0,936,
        935,1,0,0,0,936,937,1,0,0,0,937,938,1,0,0,0,938,939,3,110,55,0,939,
        940,5,3,0,0,940,125,1,0,0,0,941,942,5,2,0,0,942,946,5,110,0,0,943,
        945,3,128,64,0,944,943,1,0,0,0,945,948,1,0,0,0,946,944,1,0,0,0,946,
        947,1,0,0,0,947,949,1,0,0,0,948,946,1,0,0,0,949,950,5,3,0,0,950,
        127,1,0,0,0,951,955,5,2,0,0,952,954,3,130,65,0,953,952,1,0,0,0,954,
        957,1,0,0,0,955,953,1,0,0,0,955,956,1,0,0,0,956,958,1,0,0,0,957,
        955,1,0,0,0,958,960,5,110,0,0,959,961,5,81,0,0,960,959,1,0,0,0,960,
        961,1,0,0,0,961,962,1,0,0,0,962,963,3,110,55,0,963,964,5,3,0,0,964,
        129,1,0,0,0,965,966,5,73,0,0,966,131,1,0,0,0,967,968,5,2,0,0,968,
        969,5,64,0,0,969,970,7,0,0,0,970,971,5,3,0,0,971,133,1,0,0,0,972,
        973,5,2,0,0,973,974,5,65,0,0,974,975,3,110,55,0,975,976,5,3,0,0,
        976,135,1,0,0,0,977,978,5,2,0,0,978,979,5,66,0,0,979,980,5,110,0,
        0,980,981,5,3,0,0,981,137,1,0,0,0,982,983,5,2,0,0,983,984,5,31,0,
        0,984,985,3,110,55,0,985,986,3,110,55,0,986,987,5,3,0,0,987,139,
        1,0,0,0,988,989,5,2,0,0,989,990,5,24,0,0,990,991,3,110,55,0,991,
        992,3,110,55,0,992,993,3,110,55,0,993,994,3,110,55,0,994,995,5,3,
        0,0,995,141,1,0,0,0,996,997,5,2,0,0,997,998,5,68,0,0,998,999,5,110,
        0,0,999,1000,5,3,0,0,1000,143,1,0,0,0,1001,1002,5,2,0,0,1002,1003,
        5,69,0,0,1003,1004,5,110,0,0,1004,1006,3,110,55,0,1005,1007,3,146,
        73,0,1006,1005,1,0,0,0,1006,1007,1,0,0,0,1007,1008,1,0,0,0,1008,
        1009,3,110,55,0,1009,1010,5,3,0,0,1010,145,1,0,0,0,1011,1012,5,2,
        0,0,1012,1014,5,80,0,0,1013,1015,3,148,74,0,1014,1013,1,0,0,0,1015,
        1016,1,0,0,0,1016,1014,1,0,0,0,1016,1017,1,0,0,0,1017,1018,1,0,0,
        0,1018,1019,5,3,0,0,1019,147,1,0,0,0,1020,1021,7,1,0,0,1021,149,
        1,0,0,0,1022,1023,5,2,0,0,1023,1025,5,70,0,0,1024,1026,3,152,76,
        0,1025,1024,1,0,0,0,1026,1027,1,0,0,0,1027,1025,1,0,0,0,1027,1028,
        1,0,0,0,1028,1029,1,0,0,0,1029,1030,5,3,0,0,1030,151,1,0,0,0,1031,
        1034,5,108,0,0,1032,1034,3,110,55,0,1033,1031,1,0,0,0,1033,1032,
        1,0,0,0,1034,153,1,0,0,0,1035,1036,5,2,0,0,1036,1038,3,110,55,0,
        1037,1039,3,110,55,0,1038,1037,1,0,0,0,1039,1040,1,0,0,0,1040,1038,
        1,0,0,0,1040,1041,1,0,0,0,1041,1042,1,0,0,0,1042,1043,5,3,0,0,1043,
        155,1,0,0,0,1044,1045,5,2,0,0,1045,1047,5,74,0,0,1046,1048,3,158,
        79,0,1047,1046,1,0,0,0,1048,1049,1,0,0,0,1049,1047,1,0,0,0,1049,
        1050,1,0,0,0,1050,1051,1,0,0,0,1051,1052,5,3,0,0,1052,157,1,0,0,
        0,1053,1064,5,110,0,0,1054,1055,5,2,0,0,1055,1057,5,110,0,0,1056,
        1058,3,160,80,0,1057,1056,1,0,0,0,1057,1058,1,0,0,0,1058,1060,1,
        0,0,0,1059,1061,3,162,81,0,1060,1059,1,0,0,0,1060,1061,1,0,0,0,1061,
        1062,1,0,0,0,1062,1064,5,3,0,0,1063,1053,1,0,0,0,1063,1054,1,0,0,
        0,1064,159,1,0,0,0,1065,1066,5,2,0,0,1066,1067,5,76,0,0,1067,1068,
        3,110,55,0,1068,1069,5,3,0,0,1069,161,1,0,0,0,1070,1071,5,2,0,0,
        1071,1072,5,41,0,0,1072,1073,3,110,55,0,1073,1074,5,3,0,0,1074,163,
        1,0,0,0,1075,1076,5,2,0,0,1076,1077,5,22,0,0,1077,1078,5,110,0,0,
        1078,1079,3,186,93,0,1079,1080,5,3,0,0,1080,1088,1,0,0,0,1081,1082,
        5,2,0,0,1082,1083,5,22,0,0,1083,1084,3,240,120,0,1084,1085,3,186,
        93,0,1085,1086,5,3,0,0,1086,1088,1,0,0,0,1087,1075,1,0,0,0,1087,
        1081,1,0,0,0,1088,165,1,0,0,0,1089,1090,5,2,0,0,1090,1091,5,39,0,
        0,1091,1095,3,186,93,0,1092,1094,3,168,84,0,1093,1092,1,0,0,0,1094,
        1097,1,0,0,0,1095,1093,1,0,0,0,1095,1096,1,0,0,0,1096,1099,1,0,0,
        0,1097,1095,1,0,0,0,1098,1100,3,170,85,0,1099,1098,1,0,0,0,1099,
        1100,1,0,0,0,1100,1101,1,0,0,0,1101,1102,5,3,0,0,1102,167,1,0,0,
        0,1103,1104,5,2,0,0,1104,1105,5,40,0,0,1105,1109,3,186,93,0,1106,
        1108,3,54,27,0,1107,1106,1,0,0,0,1108,1111,1,0,0,0,1109,1107,1,0,
        0,0,1109,1110,1,0,0,0,1110,1112,1,0,0,0,1111,1109,1,0,0,0,1112,1113,
        5,3,0,0,1113,169,1,0,0,0,1114,1115,5,2,0,0,1115,1119,5,41,0,0,1116,
        1118,3,54,27,0,1117,1116,1,0,0,0,1118,1121,1,0,0,0,1119,1117,1,0,
        0,0,1119,1120,1,0,0,0,1120,1122,1,0,0,0,1121,1119,1,0,0,0,1122,1123,
        5,3,0,0,1123,171,1,0,0,0,1124,1125,5,2,0,0,1125,1126,5,48,0,0,1126,
        1127,3,58,29,0,1127,1128,3,186,93,0,1128,1132,3,164,82,0,1129,1131,
        3,54,27,0,1130,1129,1,0,0,0,1131,1134,1,0,0,0,1132,1130,1,0,0,0,
        1132,1133,1,0,0,0,1133,1135,1,0,0,0,1134,1132,1,0,0,0,1135,1136,
        5,3,0,0,1136,173,1,0,0,0,1137,1138,5,2,0,0,1138,1139,5,42,0,0,1139,
        1140,5,110,0,0,1140,1144,3,186,93,0,1141,1143,3,54,27,0,1142,1141,
        1,0,0,0,1143,1146,1,0,0,0,1144,1142,1,0,0,0,1144,1145,1,0,0,0,1145,
        1147,1,0,0,0,1146,1144,1,0,0,0,1147,1148,5,3,0,0,1148,175,1,0,0,
        0,1149,1150,5,2,0,0,1150,1151,5,43,0,0,1151,1152,5,110,0,0,1152,
        1156,3,186,93,0,1153,1155,3,54,27,0,1154,1153,1,0,0,0,1155,1158,
        1,0,0,0,1156,1154,1,0,0,0,1156,1157,1,0,0,0,1157,1159,1,0,0,0,1158,
        1156,1,0,0,0,1159,1160,5,3,0,0,1160,177,1,0,0,0,1161,1162,5,2,0,
        0,1162,1163,5,44,0,0,1163,1164,5,110,0,0,1164,1168,3,186,93,0,1165,
        1167,3,54,27,0,1166,1165,1,0,0,0,1167,1170,1,0,0,0,1168,1166,1,0,
        0,0,1168,1169,1,0,0,0,1169,1171,1,0,0,0,1170,1168,1,0,0,0,1171,1172,
        5,3,0,0,1172,179,1,0,0,0,1173,1174,5,2,0,0,1174,1178,5,45,0,0,1175,
        1177,3,54,27,0,1176,1175,1,0,0,0,1177,1180,1,0,0,0,1178,1176,1,0,
        0,0,1178,1179,1,0,0,0,1179,1186,1,0,0,0,1180,1178,1,0,0,0,1181,1183,
        3,182,91,0,1182,1184,3,184,92,0,1183,1182,1,0,0,0,1183,1184,1,0,
        0,0,1184,1187,1,0,0,0,1185,1187,3,184,92,0,1186,1181,1,0,0,0,1186,
        1185,1,0,0,0,1187,1188,1,0,0,0,1188,1189,5,3,0,0,1189,181,1,0,0,
        0,1190,1191,5,2,0,0,1191,1192,5,46,0,0,1192,1196,5,110,0,0,1193,
        1195,3,54,27,0,1194,1193,1,0,0,0,1195,1198,1,0,0,0,1196,1194,1,0,
        0,0,1196,1197,1,0,0,0,1197,1199,1,0,0,0,1198,1196,1,0,0,0,1199,1200,
        5,3,0,0,1200,183,1,0,0,0,1201,1202,5,2,0,0,1202,1206,5,47,0,0,1203,
        1205,3,54,27,0,1204,1203,1,0,0,0,1205,1208,1,0,0,0,1206,1204,1,0,
        0,0,1206,1207,1,0,0,0,1207,1209,1,0,0,0,1208,1206,1,0,0,0,1209,1210,
        5,3,0,0,1210,185,1,0,0,0,1211,1247,3,268,134,0,1212,1247,5,106,0,
        0,1213,1247,5,110,0,0,1214,1247,3,200,100,0,1215,1247,3,202,101,
        0,1216,1247,3,204,102,0,1217,1247,3,206,103,0,1218,1247,3,208,104,
        0,1219,1247,3,210,105,0,1220,1247,3,212,106,0,1221,1247,3,214,107,
        0,1222,1247,3,216,108,0,1223,1247,3,218,109,0,1224,1247,3,220,110,
        0,1225,1247,3,228,114,0,1226,1247,3,234,117,0,1227,1247,3,240,120,
        0,1228,1247,3,242,121,0,1229,1247,3,244,122,0,1230,1247,3,248,124,
        0,1231,1247,3,250,125,0,1232,1247,3,222,111,0,1233,1247,3,224,112,
        0,1234,1247,3,226,113,0,1235,1247,3,252,126,0,1236,1247,3,254,127,
        0,1237,1247,3,256,128,0,1238,1247,3,196,98,0,1239,1247,3,198,99,
        0,1240,1247,3,236,118,0,1241,1247,3,188,94,0,1242,1247,3,190,95,
        0,1243,1247,3,192,96,0,1244,1247,3,194,97,0,1245,1247,3,258,129,
        0,1246,1211,1,0,0,0,1246,1212,1,0,0,0,1246,1213,1,0,0,0,1246,1214,
        1,0,0,0,1246,1215,1,0,0,0,1246,1216,1,0,0,0,1246,1217,1,0,0,0,1246,
        1218,1,0,0,0,1246,1219,1,0,0,0,1246,1220,1,0,0,0,1246,1221,1,0,0,
        0,1246,1222,1,0,0,0,1246,1223,1,0,0,0,1246,1224,1,0,0,0,1246,1225,
        1,0,0,0,1246,1226,1,0,0,0,1246,1227,1,0,0,0,1246,1228,1,0,0,0,1246,
        1229,1,0,0,0,1246,1230,1,0,0,0,1246,1231,1,0,0,0,1246,1232,1,0,0,
        0,1246,1233,1,0,0,0,1246,1234,1,0,0,0,1246,1235,1,0,0,0,1246,1236,
        1,0,0,0,1246,1237,1,0,0,0,1246,1238,1,0,0,0,1246,1239,1,0,0,0,1246,
        1240,1,0,0,0,1246,1241,1,0,0,0,1246,1242,1,0,0,0,1246,1243,1,0,0,
        0,1246,1244,1,0,0,0,1246,1245,1,0,0,0,1247,187,1,0,0,0,1248,1249,
        5,55,0,0,1249,189,1,0,0,0,1250,1251,5,56,0,0,1251,191,1,0,0,0,1252,
        1253,5,2,0,0,1253,1257,5,56,0,0,1254,1256,3,186,93,0,1255,1254,1,
        0,0,0,1256,1259,1,0,0,0,1257,1255,1,0,0,0,1257,1258,1,0,0,0,1258,
        1260,1,0,0,0,1259,1257,1,0,0,0,1260,1261,5,3,0,0,1261,193,1,0,0,
        0,1262,1263,5,2,0,0,1263,1264,5,50,0,0,1264,1268,5,110,0,0,1265,
        1267,3,186,93,0,1266,1265,1,0,0,0,1267,1270,1,0,0,0,1268,1266,1,
        0,0,0,1268,1269,1,0,0,0,1269,1271,1,0,0,0,1270,1268,1,0,0,0,1271,
        1272,5,3,0,0,1272,195,1,0,0,0,1273,1274,5,2,0,0,1274,1275,5,66,0,
        0,1275,1276,3,186,93,0,1276,1277,5,3,0,0,1277,197,1,0,0,0,1278,1279,
        5,2,0,0,1279,1280,5,67,0,0,1280,1281,3,186,93,0,1281,1282,3,110,
        55,0,1282,1283,5,3,0,0,1283,199,1,0,0,0,1284,1285,5,2,0,0,1285,1286,
        5,10,0,0,1286,1290,3,262,131,0,1287,1289,3,54,27,0,1288,1287,1,0,
        0,0,1289,1292,1,0,0,0,1290,1288,1,0,0,0,1290,1291,1,0,0,0,1291,1293,
        1,0,0,0,1292,1290,1,0,0,0,1293,1294,5,3,0,0,1294,201,1,0,0,0,1295,
        1296,5,2,0,0,1296,1297,5,11,0,0,1297,1301,3,262,131,0,1298,1300,
        3,54,27,0,1299,1298,1,0,0,0,1300,1303,1,0,0,0,1301,1299,1,0,0,0,
        1301,1302,1,0,0,0,1302,1304,1,0,0,0,1303,1301,1,0,0,0,1304,1305,
        5,3,0,0,1305,203,1,0,0,0,1306,1307,5,2,0,0,1307,1308,5,87,0,0,1308,
        1312,3,262,131,0,1309,1311,3,54,27,0,1310,1309,1,0,0,0,1311,1314,
        1,0,0,0,1312,1310,1,0,0,0,1312,1313,1,0,0,0,1313,1315,1,0,0,0,1314,
        1312,1,0,0,0,1315,1316,5,3,0,0,1316,205,1,0,0,0,1317,1318,5,2,0,
        0,1318,1319,5,88,0,0,1319,1323,3,262,131,0,1320,1322,3,54,27,0,1321,
        1320,1,0,0,0,1322,1325,1,0,0,0,1323,1321,1,0,0,0,1323,1324,1,0,0,
        0,1324,1326,1,0,0,0,1325,1323,1,0,0,0,1326,1327,5,3,0,0,1327,207,
        1,0,0,0,1328,1329,5,2,0,0,1329,1330,5,89,0,0,1330,1334,3,262,131,
        0,1331,1333,3,54,27,0,1332,1331,1,0,0,0,1333,1336,1,0,0,0,1334,1332,
        1,0,0,0,1334,1335,1,0,0,0,1335,1337,1,0,0,0,1336,1334,1,0,0,0,1337,
        1338,5,3,0,0,1338,209,1,0,0,0,1339,1340,5,2,0,0,1340,1341,5,86,0,
        0,1341,1345,3,262,131,0,1342,1344,3,54,27,0,1343,1342,1,0,0,0,1344,
        1347,1,0,0,0,1345,1343,1,0,0,0,1345,1346,1,0,0,0,1346,1348,1,0,0,
        0,1347,1345,1,0,0,0,1348,1349,5,3,0,0,1349,211,1,0,0,0,1350,1351,
        5,2,0,0,1351,1352,5,92,0,0,1352,1353,3,186,93,0,1353,1354,5,3,0,
        0,1354,213,1,0,0,0,1355,1356,5,2,0,0,1356,1358,5,91,0,0,1357,1359,
        3,186,93,0,1358,1357,1,0,0,0,1358,1359,1,0,0,0,1359,1360,1,0,0,0,
        1360,1361,5,3,0,0,1361,215,1,0,0,0,1362,1363,5,2,0,0,1363,1364,5,
        90,0,0,1364,1365,3,186,93,0,1365,1366,5,3,0,0,1366,217,1,0,0,0,1367,
        1368,5,2,0,0,1368,1369,5,13,0,0,1369,1370,3,186,93,0,1370,1374,3,
        186,93,0,1371,1373,3,186,93,0,1372,1371,1,0,0,0,1373,1376,1,0,0,
        0,1374,1372,1,0,0,0,1374,1375,1,0,0,0,1375,1377,1,0,0,0,1376,1374,
        1,0,0,0,1377,1378,5,3,0,0,1378,219,1,0,0,0,1379,1380,5,2,0,0,1380,
        1381,5,14,0,0,1381,1382,3,186,93,0,1382,1386,3,186,93,0,1383,1385,
        3,186,93,0,1384,1383,1,0,0,0,1385,1388,1,0,0,0,1386,1384,1,0,0,0,
        1386,1387,1,0,0,0,1387,1389,1,0,0,0,1388,1386,1,0,0,0,1389,1390,
        5,3,0,0,1390,221,1,0,0,0,1391,1392,5,2,0,0,1392,1393,5,23,0,0,1393,
        1394,3,186,93,0,1394,1395,3,186,93,0,1395,1396,3,186,93,0,1396,1397,
        5,3,0,0,1397,223,1,0,0,0,1398,1399,5,2,0,0,1399,1403,5,24,0,0,1400,
        1401,3,186,93,0,1401,1402,3,186,93,0,1402,1404,1,0,0,0,1403,1400,
        1,0,0,0,1404,1405,1,0,0,0,1405,1403,1,0,0,0,1405,1406,1,0,0,0,1406,
        1407,1,0,0,0,1407,1408,5,3,0,0,1408,225,1,0,0,0,1409,1410,5,2,0,
        0,1410,1411,5,37,0,0,1411,1413,5,110,0,0,1412,1414,3,260,130,0,1413,
        1412,1,0,0,0,1413,1414,1,0,0,0,1414,1418,1,0,0,0,1415,1417,3,186,
        93,0,1416,1415,1,0,0,0,1417,1420,1,0,0,0,1418,1416,1,0,0,0,1418,
        1419,1,0,0,0,1419,1421,1,0,0,0,1420,1418,1,0,0,0,1421,1422,5,3,0,
        0,1422,227,1,0,0,0,1423,1424,5,2,0,0,1424,1428,5,25,0,0,1425,1427,
        3,230,115,0,1426,1425,1,0,0,0,1427,1430,1,0,0,0,1428,1426,1,0,0,
        0,1428,1429,1,0,0,0,1429,1431,1,0,0,0,1430,1428,1,0,0,0,1431,1432,
        5,3,0,0,1432,229,1,0,0,0,1433,1434,5,2,0,0,1434,1435,3,238,119,0,
        1435,1436,3,186,93,0,1436,1437,5,3,0,0,1437,1447,1,0,0,0,1438,1439,
        5,2,0,0,1439,1440,3,238,119,0,1440,1441,3,232,116,0,1441,1442,5,
        3,0,0,1442,1447,1,0,0,0,1443,1444,5,2,0,0,1444,1445,5,110,0,0,1445,
        1447,5,3,0,0,1446,1433,1,0,0,0,1446,1438,1,0,0,0,1446,1443,1,0,0,
        0,1447,231,1,0,0,0,1448,1449,5,2,0,0,1449,1450,5,12,0,0,1450,1454,
        3,262,131,0,1451,1453,3,54,27,0,1452,1451,1,0,0,0,1453,1456,1,0,
        0,0,1454,1452,1,0,0,0,1454,1455,1,0,0,0,1455,1457,1,0,0,0,1456,1454,
        1,0,0,0,1457,1458,5,3,0,0,1458,233,1,0,0,0,1459,1460,5,2,0,0,1460,
        1464,5,27,0,0,1461,1463,3,186,93,0,1462,1461,1,0,0,0,1463,1466,1,
        0,0,0,1464,1462,1,0,0,0,1464,1465,1,0,0,0,1465,1467,1,0,0,0,1466,
        1464,1,0,0,0,1467,1468,5,3,0,0,1468,235,1,0,0,0,1469,1470,5,2,0,
        0,1470,1473,5,71,0,0,1471,1474,5,108,0,0,1472,1474,3,186,93,0,1473,
        1471,1,0,0,0,1473,1472,1,0,0,0,1474,1475,1,0,0,0,1475,1473,1,0,0,
        0,1475,1476,1,0,0,0,1476,1477,1,0,0,0,1477,1478,5,3,0,0,1478,237,
        1,0,0,0,1479,1480,7,2,0,0,1480,239,1,0,0,0,1481,1482,5,2,0,0,1482,
        1483,5,30,0,0,1483,1484,3,186,93,0,1484,1485,3,238,119,0,1485,1486,
        5,3,0,0,1486,241,1,0,0,0,1487,1488,5,2,0,0,1488,1489,5,31,0,0,1489,
        1490,3,186,93,0,1490,1491,3,186,93,0,1491,1492,5,3,0,0,1492,243,
        1,0,0,0,1493,1494,5,2,0,0,1494,1495,7,3,0,0,1495,1496,3,246,123,
        0,1496,1497,5,3,0,0,1497,245,1,0,0,0,1498,1506,3,186,93,0,1499,1506,
        3,10,5,0,1500,1506,3,12,6,0,1501,1506,3,16,8,0,1502,1506,3,18,9,
        0,1503,1506,3,22,11,0,1504,1506,3,74,37,0,1505,1498,1,0,0,0,1505,
        1499,1,0,0,0,1505,1500,1,0,0,0,1505,1501,1,0,0,0,1505,1502,1,0,0,
        0,1505,1503,1,0,0,0,1505,1504,1,0,0,0,1506,247,1,0,0,0,1507,1508,
        5,2,0,0,1508,1509,5,36,0,0,1509,1510,3,186,93,0,1510,1511,5,3,0,
        0,1511,249,1,0,0,0,1512,1513,5,2,0,0,1513,1514,5,35,0,0,1514,1515,
        3,186,93,0,1515,1516,5,3,0,0,1516,251,1,0,0,0,1517,1518,5,2,0,0,
        1518,1519,5,29,0,0,1519,1520,3,186,93,0,1520,1521,3,238,119,0,1521,
        1522,5,3,0,0,1522,253,1,0,0,0,1523,1524,5,2,0,0,1524,1525,5,28,0,
        0,1525,1526,3,186,93,0,1526,1527,3,186,93,0,1527,1528,5,3,0,0,1528,
        255,1,0,0,0,1529,1530,5,2,0,0,1530,1531,5,32,0,0,1531,1532,3,186,
        93,0,1532,1533,3,186,93,0,1533,1534,5,3,0,0,1534,257,1,0,0,0,1535,
        1536,5,2,0,0,1536,1538,3,186,93,0,1537,1539,3,260,130,0,1538,1537,
        1,0,0,0,1538,1539,1,0,0,0,1539,1543,1,0,0,0,1540,1542,3,186,93,0,
        1541,1540,1,0,0,0,1542,1545,1,0,0,0,1543,1541,1,0,0,0,1543,1544,
        1,0,0,0,1544,1546,1,0,0,0,1545,1543,1,0,0,0,1546,1547,5,3,0,0,1547,
        259,1,0,0,0,1548,1549,5,2,0,0,1549,1551,5,75,0,0,1550,1552,3,110,
        55,0,1551,1550,1,0,0,0,1552,1553,1,0,0,0,1553,1551,1,0,0,0,1553,
        1554,1,0,0,0,1554,1555,1,0,0,0,1555,1556,5,3,0,0,1556,261,1,0,0,
        0,1557,1574,5,2,0,0,1558,1565,3,264,132,0,1559,1561,5,4,0,0,1560,
        1559,1,0,0,0,1560,1561,1,0,0,0,1561,1562,1,0,0,0,1562,1564,3,264,
        132,0,1563,1560,1,0,0,0,1564,1567,1,0,0,0,1565,1563,1,0,0,0,1565,
        1566,1,0,0,0,1566,1572,1,0,0,0,1567,1565,1,0,0,0,1568,1570,5,4,0,
        0,1569,1568,1,0,0,0,1569,1570,1,0,0,0,1570,1571,1,0,0,0,1571,1573,
        3,266,133,0,1572,1569,1,0,0,0,1572,1573,1,0,0,0,1573,1575,1,0,0,
        0,1574,1558,1,0,0,0,1574,1575,1,0,0,0,1575,1576,1,0,0,0,1576,1579,
        5,3,0,0,1577,1578,5,85,0,0,1578,1580,3,110,55,0,1579,1577,1,0,0,
        0,1579,1580,1,0,0,0,1580,1589,1,0,0,0,1581,1582,5,2,0,0,1582,1583,
        3,266,133,0,1583,1586,5,3,0,0,1584,1585,5,85,0,0,1585,1587,3,110,
        55,0,1586,1584,1,0,0,0,1586,1587,1,0,0,0,1587,1589,1,0,0,0,1588,
        1557,1,0,0,0,1588,1581,1,0,0,0,1589,263,1,0,0,0,1590,1591,5,2,0,
        0,1591,1594,5,110,0,0,1592,1593,5,85,0,0,1593,1595,3,110,55,0,1594,
        1592,1,0,0,0,1594,1595,1,0,0,0,1595,1596,1,0,0,0,1596,1597,5,3,0,
        0,1597,265,1,0,0,0,1598,1599,5,2,0,0,1599,1600,5,72,0,0,1600,1603,
        5,110,0,0,1601,1602,5,85,0,0,1602,1604,3,110,55,0,1603,1601,1,0,
        0,0,1603,1604,1,0,0,0,1604,1605,1,0,0,0,1605,1606,5,3,0,0,1606,267,
        1,0,0,0,1607,1608,7,4,0,0,1608,269,1,0,0,0,129,275,289,296,305,320,
        327,339,353,362,365,375,384,389,392,395,405,409,412,427,436,447,
        456,462,465,475,485,493,503,515,523,533,541,551,556,560,567,572,
        575,583,605,613,620,637,644,660,670,680,688,700,716,725,736,769,
        776,783,793,813,823,841,850,870,877,886,900,915,920,926,936,946,
        955,960,1006,1016,1027,1033,1040,1049,1057,1060,1063,1087,1095,1099,
        1109,1119,1132,1144,1156,1168,1178,1183,1186,1196,1206,1246,1257,
        1268,1290,1301,1312,1323,1334,1345,1358,1374,1386,1405,1413,1418,
        1428,1446,1454,1464,1473,1475,1505,1538,1543,1553,1560,1565,1569,
        1572,1574,1579,1586,1588,1594,1603
    ];

    private static __ATN: antlr.ATN;
    public static get _ATN(): antlr.ATN {
        if (!Stage7Parser.__ATN) {
            Stage7Parser.__ATN = new antlr.ATNDeserializer().deserialize(Stage7Parser._serializedATN);
        }

        return Stage7Parser.__ATN;
    }


    private static readonly vocabulary = new antlr.Vocabulary(Stage7Parser.literalNames, Stage7Parser.symbolicNames, []);

    public override get vocabulary(): antlr.Vocabulary {
        return Stage7Parser.vocabulary;
    }

    private static readonly decisionsToDFA = Stage7Parser._ATN.decisionToState.map( (ds: antlr.DecisionState, index: number) => new antlr.DFA(ds, index) );
}

export class ProgramContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public PROGRAM(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.PROGRAM, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public topLevel(): TopLevelContext[];
    public topLevel(i: number): TopLevelContext | null;
    public topLevel(i?: number): TopLevelContext[] | TopLevelContext | null {
        if (i === undefined) {
            return this.getRuleContexts(TopLevelContext);
        }

        return this.getRuleContext(i, TopLevelContext);
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_program;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterProgram) {
             listener.enterProgram(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitProgram) {
             listener.exitProgram(this);
        }
    }
}


export class TopLevelContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public defmacro(): DefmacroContext | null {
        return this.getRuleContext(0, DefmacroContext);
    }
    public macroTimeFnDef(): MacroTimeFnDefContext | null {
        return this.getRuleContext(0, MacroTimeFnDefContext);
    }
    public topLevelLet(): TopLevelLetContext | null {
        return this.getRuleContext(0, TopLevelLetContext);
    }
    public topLevelConst(): TopLevelConstContext | null {
        return this.getRuleContext(0, TopLevelConstContext);
    }
    public typeAlias(): TypeAliasContext | null {
        return this.getRuleContext(0, TypeAliasContext);
    }
    public interfaceDef(): InterfaceDefContext | null {
        return this.getRuleContext(0, InterfaceDefContext);
    }
    public classDef(): ClassDefContext | null {
        return this.getRuleContext(0, ClassDefContext);
    }
    public exportDeclForm(): ExportDeclFormContext | null {
        return this.getRuleContext(0, ExportDeclFormContext);
    }
    public statement(): StatementContext | null {
        return this.getRuleContext(0, StatementContext);
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_topLevel;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterTopLevel) {
             listener.enterTopLevel(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitTopLevel) {
             listener.exitTopLevel(this);
        }
    }
}


export class DeclContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public topLevelLet(): TopLevelLetContext | null {
        return this.getRuleContext(0, TopLevelLetContext);
    }
    public topLevelConst(): TopLevelConstContext | null {
        return this.getRuleContext(0, TopLevelConstContext);
    }
    public classDef(): ClassDefContext | null {
        return this.getRuleContext(0, ClassDefContext);
    }
    public interfaceDef(): InterfaceDefContext | null {
        return this.getRuleContext(0, InterfaceDefContext);
    }
    public typeAlias(): TypeAliasContext | null {
        return this.getRuleContext(0, TypeAliasContext);
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_decl;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterDecl) {
             listener.enterDecl(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitDecl) {
             listener.exitDecl(this);
        }
    }
}


export class DefmacroContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public DEFMACRO(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.DEFMACRO, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.IDENTIFIER, 0)!;
    }
    public fnSignature(): FnSignatureContext {
        return this.getRuleContext(0, FnSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public statement(): StatementContext[];
    public statement(i: number): StatementContext | null;
    public statement(i?: number): StatementContext[] | StatementContext | null {
        if (i === undefined) {
            return this.getRuleContexts(StatementContext);
        }

        return this.getRuleContext(i, StatementContext);
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_defmacro;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterDefmacro) {
             listener.enterDefmacro(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitDefmacro) {
             listener.exitDefmacro(this);
        }
    }
}


export class MacroTimeFnDefContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public MACRO_TIME_ATTR(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.MACRO_TIME_ATTR, 0)!;
    }
    public topLevelLet(): TopLevelLetContext | null {
        return this.getRuleContext(0, TopLevelLetContext);
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public topLevelConst(): TopLevelConstContext | null {
        return this.getRuleContext(0, TopLevelConstContext);
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_macroTimeFnDef;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterMacroTimeFnDef) {
             listener.enterMacroTimeFnDef(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitMacroTimeFnDef) {
             listener.exitMacroTimeFnDef(this);
        }
    }
}


export class TopLevelLetContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public LET(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LET, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.IDENTIFIER, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public metaAnnotation(): MetaAnnotationContext[];
    public metaAnnotation(i: number): MetaAnnotationContext | null;
    public metaAnnotation(i?: number): MetaAnnotationContext[] | MetaAnnotationContext | null {
        if (i === undefined) {
            return this.getRuleContexts(MetaAnnotationContext);
        }

        return this.getRuleContext(i, MetaAnnotationContext);
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_topLevelLet;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterTopLevelLet) {
             listener.enterTopLevelLet(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitTopLevelLet) {
             listener.exitTopLevelLet(this);
        }
    }
}


export class TopLevelConstContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public CONST(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.CONST, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.IDENTIFIER, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public metaAnnotation(): MetaAnnotationContext[];
    public metaAnnotation(i: number): MetaAnnotationContext | null;
    public metaAnnotation(i?: number): MetaAnnotationContext[] | MetaAnnotationContext | null {
        if (i === undefined) {
            return this.getRuleContexts(MetaAnnotationContext);
        }

        return this.getRuleContext(i, MetaAnnotationContext);
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_topLevelConst;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterTopLevelConst) {
             listener.enterTopLevelConst(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitTopLevelConst) {
             listener.exitTopLevelConst(this);
        }
    }
}


export class MetaAnnotationContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public CARET(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.CARET, 0)!;
    }
    public KEYWORD(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.KEYWORD, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_metaAnnotation;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterMetaAnnotation) {
             listener.enterMetaAnnotation(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitMetaAnnotation) {
             listener.exitMetaAnnotation(this);
        }
    }
}


export class TypeAliasContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public TYPE(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.TYPE, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.IDENTIFIER, 0)!;
    }
    public typeExpr(): TypeExprContext {
        return this.getRuleContext(0, TypeExprContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public typeParams(): TypeParamsContext | null {
        return this.getRuleContext(0, TypeParamsContext);
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_typeAlias;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterTypeAlias) {
             listener.enterTypeAlias(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitTypeAlias) {
             listener.exitTypeAlias(this);
        }
    }
}


export class InterfaceDefContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public INTERFACE(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.INTERFACE, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.IDENTIFIER, 0)!;
    }
    public typeObject(): TypeObjectContext {
        return this.getRuleContext(0, TypeObjectContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public typeParams(): TypeParamsContext | null {
        return this.getRuleContext(0, TypeParamsContext);
    }
    public interfaceExtends(): InterfaceExtendsContext | null {
        return this.getRuleContext(0, InterfaceExtendsContext);
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_interfaceDef;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterInterfaceDef) {
             listener.enterInterfaceDef(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitInterfaceDef) {
             listener.exitInterfaceDef(this);
        }
    }
}


export class InterfaceExtendsContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public EXTENDS(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.EXTENDS, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public typeExpr(): TypeExprContext[];
    public typeExpr(i: number): TypeExprContext | null;
    public typeExpr(i?: number): TypeExprContext[] | TypeExprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(TypeExprContext);
        }

        return this.getRuleContext(i, TypeExprContext);
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_interfaceExtends;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterInterfaceExtends) {
             listener.enterInterfaceExtends(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitInterfaceExtends) {
             listener.exitInterfaceExtends(this);
        }
    }
}


export class ClassDefContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public CLASS(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.CLASS, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.IDENTIFIER, 0)!;
    }
    public classBody(): ClassBodyContext {
        return this.getRuleContext(0, ClassBodyContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public modifier(): ModifierContext[];
    public modifier(i: number): ModifierContext | null;
    public modifier(i?: number): ModifierContext[] | ModifierContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ModifierContext);
        }

        return this.getRuleContext(i, ModifierContext);
    }
    public typeParams(): TypeParamsContext | null {
        return this.getRuleContext(0, TypeParamsContext);
    }
    public classExtends(): ClassExtendsContext | null {
        return this.getRuleContext(0, ClassExtendsContext);
    }
    public classImplements(): ClassImplementsContext | null {
        return this.getRuleContext(0, ClassImplementsContext);
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_classDef;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterClassDef) {
             listener.enterClassDef(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitClassDef) {
             listener.exitClassDef(this);
        }
    }
}


export class AnonClassDefContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public CLASS(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.CLASS, 0)!;
    }
    public classBody(): ClassBodyContext {
        return this.getRuleContext(0, ClassBodyContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public modifier(): ModifierContext[];
    public modifier(i: number): ModifierContext | null;
    public modifier(i?: number): ModifierContext[] | ModifierContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ModifierContext);
        }

        return this.getRuleContext(i, ModifierContext);
    }
    public classExtends(): ClassExtendsContext | null {
        return this.getRuleContext(0, ClassExtendsContext);
    }
    public classImplements(): ClassImplementsContext | null {
        return this.getRuleContext(0, ClassImplementsContext);
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_anonClassDef;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterAnonClassDef) {
             listener.enterAnonClassDef(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitAnonClassDef) {
             listener.exitAnonClassDef(this);
        }
    }
}


export class ClassExtendsContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public EXTENDS(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.EXTENDS, 0)!;
    }
    public typeExpr(): TypeExprContext {
        return this.getRuleContext(0, TypeExprContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_classExtends;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterClassExtends) {
             listener.enterClassExtends(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitClassExtends) {
             listener.exitClassExtends(this);
        }
    }
}


export class ClassImplementsContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public IMPLEMENTS(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.IMPLEMENTS, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public typeExpr(): TypeExprContext[];
    public typeExpr(i: number): TypeExprContext | null;
    public typeExpr(i?: number): TypeExprContext[] | TypeExprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(TypeExprContext);
        }

        return this.getRuleContext(i, TypeExprContext);
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_classImplements;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterClassImplements) {
             listener.enterClassImplements(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitClassImplements) {
             listener.exitClassImplements(this);
        }
    }
}


export class ClassBodyContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public CLASS_BODY(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.CLASS_BODY, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public classElement(): ClassElementContext[];
    public classElement(i: number): ClassElementContext | null;
    public classElement(i?: number): ClassElementContext[] | ClassElementContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ClassElementContext);
        }

        return this.getRuleContext(i, ClassElementContext);
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_classBody;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterClassBody) {
             listener.enterClassBody(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitClassBody) {
             listener.exitClassBody(this);
        }
    }
}


export class ClassElementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public fieldDef(): FieldDefContext | null {
        return this.getRuleContext(0, FieldDefContext);
    }
    public constructorDef(): ConstructorDefContext | null {
        return this.getRuleContext(0, ConstructorDefContext);
    }
    public classMethodDef(): ClassMethodDefContext | null {
        return this.getRuleContext(0, ClassMethodDefContext);
    }
    public abstractMethodDef(): AbstractMethodDefContext | null {
        return this.getRuleContext(0, AbstractMethodDefContext);
    }
    public getterDef(): GetterDefContext | null {
        return this.getRuleContext(0, GetterDefContext);
    }
    public setterDef(): SetterDefContext | null {
        return this.getRuleContext(0, SetterDefContext);
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_classElement;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterClassElement) {
             listener.enterClassElement(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitClassElement) {
             listener.exitClassElement(this);
        }
    }
}


export class ModifierContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public KEYWORD(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.KEYWORD, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_modifier;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterModifier) {
             listener.enterModifier(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitModifier) {
             listener.exitModifier(this);
        }
    }
}


export class FieldDefContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public FIELD(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.FIELD, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public modifier(): ModifierContext[];
    public modifier(i: number): ModifierContext | null;
    public modifier(i?: number): ModifierContext[] | ModifierContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ModifierContext);
        }

        return this.getRuleContext(i, ModifierContext);
    }
    public COLON(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.COLON, 0);
    }
    public typeExpr(): TypeExprContext | null {
        return this.getRuleContext(0, TypeExprContext);
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_fieldDef;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterFieldDef) {
             listener.enterFieldDef(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitFieldDef) {
             listener.exitFieldDef(this);
        }
    }
}


export class ConstructorDefContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public CONSTRUCTOR(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.CONSTRUCTOR, 0)!;
    }
    public fnSignatureTyped(): FnSignatureTypedContext {
        return this.getRuleContext(0, FnSignatureTypedContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public statement(): StatementContext[];
    public statement(i: number): StatementContext | null;
    public statement(i?: number): StatementContext[] | StatementContext | null {
        if (i === undefined) {
            return this.getRuleContexts(StatementContext);
        }

        return this.getRuleContext(i, StatementContext);
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_constructorDef;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterConstructorDef) {
             listener.enterConstructorDef(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitConstructorDef) {
             listener.exitConstructorDef(this);
        }
    }
}


export class ClassMethodDefContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public METHOD(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.METHOD, 0)!;
    }
    public methodKey(): MethodKeyContext {
        return this.getRuleContext(0, MethodKeyContext)!;
    }
    public fnSignatureTyped(): FnSignatureTypedContext {
        return this.getRuleContext(0, FnSignatureTypedContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public modifier(): ModifierContext[];
    public modifier(i: number): ModifierContext | null;
    public modifier(i?: number): ModifierContext[] | ModifierContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ModifierContext);
        }

        return this.getRuleContext(i, ModifierContext);
    }
    public statement(): StatementContext[];
    public statement(i: number): StatementContext | null;
    public statement(i?: number): StatementContext[] | StatementContext | null {
        if (i === undefined) {
            return this.getRuleContexts(StatementContext);
        }

        return this.getRuleContext(i, StatementContext);
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_classMethodDef;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterClassMethodDef) {
             listener.enterClassMethodDef(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitClassMethodDef) {
             listener.exitClassMethodDef(this);
        }
    }
}


export class AbstractMethodDefContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public ABSTRACT_METHOD(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.ABSTRACT_METHOD, 0)!;
    }
    public methodKey(): MethodKeyContext {
        return this.getRuleContext(0, MethodKeyContext)!;
    }
    public fnSignatureTyped(): FnSignatureTypedContext {
        return this.getRuleContext(0, FnSignatureTypedContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public modifier(): ModifierContext[];
    public modifier(i: number): ModifierContext | null;
    public modifier(i?: number): ModifierContext[] | ModifierContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ModifierContext);
        }

        return this.getRuleContext(i, ModifierContext);
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_abstractMethodDef;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterAbstractMethodDef) {
             listener.enterAbstractMethodDef(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitAbstractMethodDef) {
             listener.exitAbstractMethodDef(this);
        }
    }
}


export class GetterDefContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public GET(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.GET, 0)!;
    }
    public methodKey(): MethodKeyContext {
        return this.getRuleContext(0, MethodKeyContext)!;
    }
    public fnSignatureTyped(): FnSignatureTypedContext {
        return this.getRuleContext(0, FnSignatureTypedContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public modifier(): ModifierContext[];
    public modifier(i: number): ModifierContext | null;
    public modifier(i?: number): ModifierContext[] | ModifierContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ModifierContext);
        }

        return this.getRuleContext(i, ModifierContext);
    }
    public statement(): StatementContext[];
    public statement(i: number): StatementContext | null;
    public statement(i?: number): StatementContext[] | StatementContext | null {
        if (i === undefined) {
            return this.getRuleContexts(StatementContext);
        }

        return this.getRuleContext(i, StatementContext);
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_getterDef;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterGetterDef) {
             listener.enterGetterDef(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitGetterDef) {
             listener.exitGetterDef(this);
        }
    }
}


export class SetterDefContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public SETPROP(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.SETPROP, 0)!;
    }
    public methodKey(): MethodKeyContext {
        return this.getRuleContext(0, MethodKeyContext)!;
    }
    public fnSignatureTyped(): FnSignatureTypedContext {
        return this.getRuleContext(0, FnSignatureTypedContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public modifier(): ModifierContext[];
    public modifier(i: number): ModifierContext | null;
    public modifier(i?: number): ModifierContext[] | ModifierContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ModifierContext);
        }

        return this.getRuleContext(i, ModifierContext);
    }
    public statement(): StatementContext[];
    public statement(i: number): StatementContext | null;
    public statement(i?: number): StatementContext[] | StatementContext | null {
        if (i === undefined) {
            return this.getRuleContexts(StatementContext);
        }

        return this.getRuleContext(i, StatementContext);
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_setterDef;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterSetterDef) {
             listener.enterSetterDef(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitSetterDef) {
             listener.exitSetterDef(this);
        }
    }
}


export class MethodKeyContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public IDENTIFIER(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.IDENTIFIER, 0);
    }
    public LBRACK(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.LBRACK, 0);
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public RBRACK(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.RBRACK, 0);
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_methodKey;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterMethodKey) {
             listener.enterMethodKey(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitMethodKey) {
             listener.exitMethodKey(this);
        }
    }
}


export class TypedParamContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public OPTIONAL(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.OPTIONAL, 0);
    }
    public COLON(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.COLON, 0);
    }
    public typeExpr(): TypeExprContext | null {
        return this.getRuleContext(0, TypeExprContext);
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_typedParam;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterTypedParam) {
             listener.enterTypedParam(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitTypedParam) {
             listener.exitTypedParam(this);
        }
    }
}


export class FnSignatureTypedContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode[];
    public LPAREN(i: number): antlr.TerminalNode | null;
    public LPAREN(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage7Parser.LPAREN);
    	} else {
    		return this.getToken(Stage7Parser.LPAREN, i);
    	}
    }
    public RPAREN(): antlr.TerminalNode[];
    public RPAREN(i: number): antlr.TerminalNode | null;
    public RPAREN(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage7Parser.RPAREN);
    	} else {
    		return this.getToken(Stage7Parser.RPAREN, i);
    	}
    }
    public typedParam(): TypedParamContext[];
    public typedParam(i: number): TypedParamContext | null;
    public typedParam(i?: number): TypedParamContext[] | TypedParamContext | null {
        if (i === undefined) {
            return this.getRuleContexts(TypedParamContext);
        }

        return this.getRuleContext(i, TypedParamContext);
    }
    public RETURNS(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.RETURNS, 0);
    }
    public typeExpr(): TypeExprContext | null {
        return this.getRuleContext(0, TypeExprContext);
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage7Parser.COMMA);
    	} else {
    		return this.getToken(Stage7Parser.COMMA, i);
    	}
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_fnSignatureTyped;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterFnSignatureTyped) {
             listener.enterFnSignatureTyped(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitFnSignatureTyped) {
             listener.exitFnSignatureTyped(this);
        }
    }
}


export class StatementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public letStar(): LetStarContext | null {
        return this.getRuleContext(0, LetStarContext);
    }
    public letStmt(): LetStmtContext | null {
        return this.getRuleContext(0, LetStmtContext);
    }
    public constStar(): ConstStarContext | null {
        return this.getRuleContext(0, ConstStarContext);
    }
    public constStmt(): ConstStmtContext | null {
        return this.getRuleContext(0, ConstStmtContext);
    }
    public ifForm(): IfFormContext | null {
        return this.getRuleContext(0, IfFormContext);
    }
    public whileForm(): WhileFormContext | null {
        return this.getRuleContext(0, WhileFormContext);
    }
    public tryForm(): TryFormContext | null {
        return this.getRuleContext(0, TryFormContext);
    }
    public block(): BlockContext | null {
        return this.getRuleContext(0, BlockContext);
    }
    public returnForm(): ReturnFormContext | null {
        return this.getRuleContext(0, ReturnFormContext);
    }
    public throwForm(): ThrowFormContext | null {
        return this.getRuleContext(0, ThrowFormContext);
    }
    public importForm(): ImportFormContext | null {
        return this.getRuleContext(0, ImportFormContext);
    }
    public importTypeForm(): ImportTypeFormContext | null {
        return this.getRuleContext(0, ImportTypeFormContext);
    }
    public exportForm(): ExportFormContext | null {
        return this.getRuleContext(0, ExportFormContext);
    }
    public switchForm(): SwitchFormContext | null {
        return this.getRuleContext(0, SwitchFormContext);
    }
    public forForm(): ForFormContext | null {
        return this.getRuleContext(0, ForFormContext);
    }
    public forInForm(): ForInFormContext | null {
        return this.getRuleContext(0, ForInFormContext);
    }
    public forOfForm(): ForOfFormContext | null {
        return this.getRuleContext(0, ForOfFormContext);
    }
    public forAwaitForm(): ForAwaitFormContext | null {
        return this.getRuleContext(0, ForAwaitFormContext);
    }
    public assign(): AssignContext | null {
        return this.getRuleContext(0, AssignContext);
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_statement;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterStatement) {
             listener.enterStatement(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitStatement) {
             listener.exitStatement(this);
        }
    }
}


export class LetStarContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode[];
    public LPAREN(i: number): antlr.TerminalNode | null;
    public LPAREN(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage7Parser.LPAREN);
    	} else {
    		return this.getToken(Stage7Parser.LPAREN, i);
    	}
    }
    public LETSTAR(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LETSTAR, 0)!;
    }
    public RPAREN(): antlr.TerminalNode[];
    public RPAREN(i: number): antlr.TerminalNode | null;
    public RPAREN(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage7Parser.RPAREN);
    	} else {
    		return this.getToken(Stage7Parser.RPAREN, i);
    	}
    }
    public starBinding(): StarBindingContext[];
    public starBinding(i: number): StarBindingContext | null;
    public starBinding(i?: number): StarBindingContext[] | StarBindingContext | null {
        if (i === undefined) {
            return this.getRuleContexts(StarBindingContext);
        }

        return this.getRuleContext(i, StarBindingContext);
    }
    public statement(): StatementContext[];
    public statement(i: number): StatementContext | null;
    public statement(i?: number): StatementContext[] | StatementContext | null {
        if (i === undefined) {
            return this.getRuleContexts(StatementContext);
        }

        return this.getRuleContext(i, StatementContext);
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_letStar;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterLetStar) {
             listener.enterLetStar(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitLetStar) {
             listener.exitLetStar(this);
        }
    }
}


export class LetStmtContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public LET(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LET, 0)!;
    }
    public singleBinding(): SingleBindingContext {
        return this.getRuleContext(0, SingleBindingContext)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_letStmt;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterLetStmt) {
             listener.enterLetStmt(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitLetStmt) {
             listener.exitLetStmt(this);
        }
    }
}


export class ConstStarContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode[];
    public LPAREN(i: number): antlr.TerminalNode | null;
    public LPAREN(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage7Parser.LPAREN);
    	} else {
    		return this.getToken(Stage7Parser.LPAREN, i);
    	}
    }
    public CONSTSTAR(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.CONSTSTAR, 0)!;
    }
    public RPAREN(): antlr.TerminalNode[];
    public RPAREN(i: number): antlr.TerminalNode | null;
    public RPAREN(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage7Parser.RPAREN);
    	} else {
    		return this.getToken(Stage7Parser.RPAREN, i);
    	}
    }
    public starBinding(): StarBindingContext[];
    public starBinding(i: number): StarBindingContext | null;
    public starBinding(i?: number): StarBindingContext[] | StarBindingContext | null {
        if (i === undefined) {
            return this.getRuleContexts(StarBindingContext);
        }

        return this.getRuleContext(i, StarBindingContext);
    }
    public statement(): StatementContext[];
    public statement(i: number): StatementContext | null;
    public statement(i?: number): StatementContext[] | StatementContext | null {
        if (i === undefined) {
            return this.getRuleContexts(StatementContext);
        }

        return this.getRuleContext(i, StatementContext);
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_constStar;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterConstStar) {
             listener.enterConstStar(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitConstStar) {
             listener.exitConstStar(this);
        }
    }
}


export class ConstStmtContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public CONST(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.CONST, 0)!;
    }
    public singleBinding(): SingleBindingContext {
        return this.getRuleContext(0, SingleBindingContext)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_constStmt;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterConstStmt) {
             listener.enterConstStmt(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitConstStmt) {
             listener.exitConstStmt(this);
        }
    }
}


export class IfFormContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public IF(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.IF, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public statement(): StatementContext[];
    public statement(i: number): StatementContext | null;
    public statement(i?: number): StatementContext[] | StatementContext | null {
        if (i === undefined) {
            return this.getRuleContexts(StatementContext);
        }

        return this.getRuleContext(i, StatementContext);
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_ifForm;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterIfForm) {
             listener.enterIfForm(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitIfForm) {
             listener.exitIfForm(this);
        }
    }
}


export class WhileFormContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public WHILE(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.WHILE, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public statement(): StatementContext[];
    public statement(i: number): StatementContext | null;
    public statement(i?: number): StatementContext[] | StatementContext | null {
        if (i === undefined) {
            return this.getRuleContexts(StatementContext);
        }

        return this.getRuleContext(i, StatementContext);
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_whileForm;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterWhileForm) {
             listener.enterWhileForm(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitWhileForm) {
             listener.exitWhileForm(this);
        }
    }
}


export class BlockContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public BEGIN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.BEGIN, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public statement(): StatementContext[];
    public statement(i: number): StatementContext | null;
    public statement(i?: number): StatementContext[] | StatementContext | null {
        if (i === undefined) {
            return this.getRuleContexts(StatementContext);
        }

        return this.getRuleContext(i, StatementContext);
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_block;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterBlock) {
             listener.enterBlock(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitBlock) {
             listener.exitBlock(this);
        }
    }
}


export class ReturnFormContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public RETURN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RETURN, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_returnForm;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterReturnForm) {
             listener.enterReturnForm(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitReturnForm) {
             listener.exitReturnForm(this);
        }
    }
}


export class ThrowFormContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public THROW(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.THROW, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_throwForm;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterThrowForm) {
             listener.enterThrowForm(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitThrowForm) {
             listener.exitThrowForm(this);
        }
    }
}


export class ImportFormContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public IMPORT(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.IMPORT, 0)!;
    }
    public STRING(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.STRING, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public objectExpr(): ObjectExprContext | null {
        return this.getRuleContext(0, ObjectExprContext);
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_importForm;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterImportForm) {
             listener.enterImportForm(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitImportForm) {
             listener.exitImportForm(this);
        }
    }
}


export class ImportTypeFormContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public IMPORT_TYPE(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.IMPORT_TYPE, 0)!;
    }
    public importTypeSpec(): ImportTypeSpecContext {
        return this.getRuleContext(0, ImportTypeSpecContext)!;
    }
    public STRING(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.STRING, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_importTypeForm;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterImportTypeForm) {
             listener.enterImportTypeForm(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitImportTypeForm) {
             listener.exitImportTypeForm(this);
        }
    }
}


export class ImportTypeSpecContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public importTypeName(): ImportTypeNameContext[];
    public importTypeName(i: number): ImportTypeNameContext | null;
    public importTypeName(i?: number): ImportTypeNameContext[] | ImportTypeNameContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ImportTypeNameContext);
        }

        return this.getRuleContext(i, ImportTypeNameContext);
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_importTypeSpec;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterImportTypeSpec) {
             listener.enterImportTypeSpec(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitImportTypeSpec) {
             listener.exitImportTypeSpec(this);
        }
    }
}


export class ImportTypeNameContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public IDENTIFIER(): antlr.TerminalNode[];
    public IDENTIFIER(i: number): antlr.TerminalNode | null;
    public IDENTIFIER(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage7Parser.IDENTIFIER);
    	} else {
    		return this.getToken(Stage7Parser.IDENTIFIER, i);
    	}
    }
    public LPAREN(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.LPAREN, 0);
    }
    public RPAREN(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.RPAREN, 0);
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_importTypeName;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterImportTypeName) {
             listener.enterImportTypeName(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitImportTypeName) {
             listener.exitImportTypeName(this);
        }
    }
}


export class ExportFormContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public exportBinding(): ExportBindingContext | null {
        return this.getRuleContext(0, ExportBindingContext);
    }
    public exportDefault(): ExportDefaultContext | null {
        return this.getRuleContext(0, ExportDefaultContext);
    }
    public exportNamed(): ExportNamedContext | null {
        return this.getRuleContext(0, ExportNamedContext);
    }
    public exportNsFromForm(): ExportNsFromFormContext | null {
        return this.getRuleContext(0, ExportNsFromFormContext);
    }
    public exportFrom(): ExportFromContext | null {
        return this.getRuleContext(0, ExportFromContext);
    }
    public exportAllFrom(): ExportAllFromContext | null {
        return this.getRuleContext(0, ExportAllFromContext);
    }
    public exportTypeForm(): ExportTypeFormContext | null {
        return this.getRuleContext(0, ExportTypeFormContext);
    }
    public exportTypeFromForm(): ExportTypeFromFormContext | null {
        return this.getRuleContext(0, ExportTypeFromFormContext);
    }
    public exportTypeAllFromForm(): ExportTypeAllFromFormContext | null {
        return this.getRuleContext(0, ExportTypeAllFromFormContext);
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_exportForm;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterExportForm) {
             listener.enterExportForm(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitExportForm) {
             listener.exitExportForm(this);
        }
    }
}


export class ExportBindingContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public EXPORT(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.EXPORT, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.IDENTIFIER, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_exportBinding;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterExportBinding) {
             listener.enterExportBinding(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitExportBinding) {
             listener.exitExportBinding(this);
        }
    }
}


export class ExportDefaultContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public EXPORT_DEFAULT(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.EXPORT_DEFAULT, 0)!;
    }
    public classDef(): ClassDefContext | null {
        return this.getRuleContext(0, ClassDefContext);
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public anonClassDef(): AnonClassDefContext | null {
        return this.getRuleContext(0, AnonClassDefContext);
    }
    public topLevelLet(): TopLevelLetContext | null {
        return this.getRuleContext(0, TopLevelLetContext);
    }
    public topLevelConst(): TopLevelConstContext | null {
        return this.getRuleContext(0, TopLevelConstContext);
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_exportDefault;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterExportDefault) {
             listener.enterExportDefault(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitExportDefault) {
             listener.exitExportDefault(this);
        }
    }
}


export class ExportNamedContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public EXPORT_NAMED(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.EXPORT_NAMED, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public exportNamePair(): ExportNamePairContext[];
    public exportNamePair(i: number): ExportNamePairContext | null;
    public exportNamePair(i?: number): ExportNamePairContext[] | ExportNamePairContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExportNamePairContext);
        }

        return this.getRuleContext(i, ExportNamePairContext);
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_exportNamed;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterExportNamed) {
             listener.enterExportNamed(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitExportNamed) {
             listener.exitExportNamed(this);
        }
    }
}


export class ExportNamePairContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode[];
    public IDENTIFIER(i: number): antlr.TerminalNode | null;
    public IDENTIFIER(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage7Parser.IDENTIFIER);
    	} else {
    		return this.getToken(Stage7Parser.IDENTIFIER, i);
    	}
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_exportNamePair;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterExportNamePair) {
             listener.enterExportNamePair(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitExportNamePair) {
             listener.exitExportNamePair(this);
        }
    }
}


export class ExportFromContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public EXPORT_FROM(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.EXPORT_FROM, 0)!;
    }
    public STRING(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.STRING, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public exportNamePair(): ExportNamePairContext[];
    public exportNamePair(i: number): ExportNamePairContext | null;
    public exportNamePair(i?: number): ExportNamePairContext[] | ExportNamePairContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExportNamePairContext);
        }

        return this.getRuleContext(i, ExportNamePairContext);
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_exportFrom;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterExportFrom) {
             listener.enterExportFrom(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitExportFrom) {
             listener.exitExportFrom(this);
        }
    }
}


export class ExportAllFromContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public EXPORT_ALL_FROM(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.EXPORT_ALL_FROM, 0)!;
    }
    public STRING(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.STRING, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_exportAllFrom;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterExportAllFrom) {
             listener.enterExportAllFrom(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitExportAllFrom) {
             listener.exitExportAllFrom(this);
        }
    }
}


export class ExportNsFromFormContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public EXPORT_NS_FROM(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.EXPORT_NS_FROM, 0)!;
    }
    public STRING(): antlr.TerminalNode[];
    public STRING(i: number): antlr.TerminalNode | null;
    public STRING(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage7Parser.STRING);
    	} else {
    		return this.getToken(Stage7Parser.STRING, i);
    	}
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_exportNsFromForm;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterExportNsFromForm) {
             listener.enterExportNsFromForm(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitExportNsFromForm) {
             listener.exitExportNsFromForm(this);
        }
    }
}


export class ExportTypeFormContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public EXPORT_TYPE(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.EXPORT_TYPE, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public exportNamePair(): ExportNamePairContext[];
    public exportNamePair(i: number): ExportNamePairContext | null;
    public exportNamePair(i?: number): ExportNamePairContext[] | ExportNamePairContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExportNamePairContext);
        }

        return this.getRuleContext(i, ExportNamePairContext);
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_exportTypeForm;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterExportTypeForm) {
             listener.enterExportTypeForm(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitExportTypeForm) {
             listener.exitExportTypeForm(this);
        }
    }
}


export class ExportTypeFromFormContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public EXPORT_TYPE_FROM(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.EXPORT_TYPE_FROM, 0)!;
    }
    public STRING(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.STRING, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public exportNamePair(): ExportNamePairContext[];
    public exportNamePair(i: number): ExportNamePairContext | null;
    public exportNamePair(i?: number): ExportNamePairContext[] | ExportNamePairContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExportNamePairContext);
        }

        return this.getRuleContext(i, ExportNamePairContext);
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_exportTypeFromForm;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterExportTypeFromForm) {
             listener.enterExportTypeFromForm(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitExportTypeFromForm) {
             listener.exitExportTypeFromForm(this);
        }
    }
}


export class ExportTypeAllFromFormContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public EXPORT_TYPE_ALL_FROM(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.EXPORT_TYPE_ALL_FROM, 0)!;
    }
    public STRING(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.STRING, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_exportTypeAllFromForm;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterExportTypeAllFromForm) {
             listener.enterExportTypeAllFromForm(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitExportTypeAllFromForm) {
             listener.exitExportTypeAllFromForm(this);
        }
    }
}


export class ExportDeclFormContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public EXPORT(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.EXPORT, 0)!;
    }
    public decl(): DeclContext {
        return this.getRuleContext(0, DeclContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_exportDeclForm;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterExportDeclForm) {
             listener.enterExportDeclForm(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitExportDeclForm) {
             listener.exitExportDeclForm(this);
        }
    }
}


export class StarBindingContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.IDENTIFIER, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public COLON(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.COLON, 0);
    }
    public typeExpr(): TypeExprContext | null {
        return this.getRuleContext(0, TypeExprContext);
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_starBinding;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterStarBinding) {
             listener.enterStarBinding(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitStarBinding) {
             listener.exitStarBinding(this);
        }
    }
}


export class SingleBindingContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public COLON(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.COLON, 0);
    }
    public typeExpr(): TypeExprContext | null {
        return this.getRuleContext(0, TypeExprContext);
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_singleBinding;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterSingleBinding) {
             listener.enterSingleBinding(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitSingleBinding) {
             listener.exitSingleBinding(this);
        }
    }
}


export class TypeExprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public IDENTIFIER(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.IDENTIFIER, 0);
    }
    public typeUnion(): TypeUnionContext | null {
        return this.getRuleContext(0, TypeUnionContext);
    }
    public typeIntersection(): TypeIntersectionContext | null {
        return this.getRuleContext(0, TypeIntersectionContext);
    }
    public typeArray(): TypeArrayContext | null {
        return this.getRuleContext(0, TypeArrayContext);
    }
    public typeTuple(): TypeTupleContext | null {
        return this.getRuleContext(0, TypeTupleContext);
    }
    public typeFunction(): TypeFunctionContext | null {
        return this.getRuleContext(0, TypeFunctionContext);
    }
    public typeObject(): TypeObjectContext | null {
        return this.getRuleContext(0, TypeObjectContext);
    }
    public typeLiteral(): TypeLiteralContext | null {
        return this.getRuleContext(0, TypeLiteralContext);
    }
    public typeKeyof(): TypeKeyofContext | null {
        return this.getRuleContext(0, TypeKeyofContext);
    }
    public typeTypeof(): TypeTypeofContext | null {
        return this.getRuleContext(0, TypeTypeofContext);
    }
    public typeIndexAccess(): TypeIndexAccessContext | null {
        return this.getRuleContext(0, TypeIndexAccessContext);
    }
    public typeConditional(): TypeConditionalContext | null {
        return this.getRuleContext(0, TypeConditionalContext);
    }
    public typeInfer(): TypeInferContext | null {
        return this.getRuleContext(0, TypeInferContext);
    }
    public typeMapped(): TypeMappedContext | null {
        return this.getRuleContext(0, TypeMappedContext);
    }
    public typeTemplateLiteral(): TypeTemplateLiteralContext | null {
        return this.getRuleContext(0, TypeTemplateLiteralContext);
    }
    public typeApplication(): TypeApplicationContext | null {
        return this.getRuleContext(0, TypeApplicationContext);
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_typeExpr;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterTypeExpr) {
             listener.enterTypeExpr(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitTypeExpr) {
             listener.exitTypeExpr(this);
        }
    }
}


export class TypeUnionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public UNION(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.UNION, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public typeExpr(): TypeExprContext[];
    public typeExpr(i: number): TypeExprContext | null;
    public typeExpr(i?: number): TypeExprContext[] | TypeExprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(TypeExprContext);
        }

        return this.getRuleContext(i, TypeExprContext);
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_typeUnion;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterTypeUnion) {
             listener.enterTypeUnion(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitTypeUnion) {
             listener.exitTypeUnion(this);
        }
    }
}


export class TypeIntersectionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public INTERSECT(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.INTERSECT, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public typeExpr(): TypeExprContext[];
    public typeExpr(i: number): TypeExprContext | null;
    public typeExpr(i?: number): TypeExprContext[] | TypeExprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(TypeExprContext);
        }

        return this.getRuleContext(i, TypeExprContext);
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_typeIntersection;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterTypeIntersection) {
             listener.enterTypeIntersection(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitTypeIntersection) {
             listener.exitTypeIntersection(this);
        }
    }
}


export class TypeArrayContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public TYPE_ARRAY(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.TYPE_ARRAY, 0)!;
    }
    public typeExpr(): TypeExprContext {
        return this.getRuleContext(0, TypeExprContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_typeArray;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterTypeArray) {
             listener.enterTypeArray(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitTypeArray) {
             listener.exitTypeArray(this);
        }
    }
}


export class TypeTupleContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public TUPLE(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.TUPLE, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public typeTupleElement(): TypeTupleElementContext[];
    public typeTupleElement(i: number): TypeTupleElementContext | null;
    public typeTupleElement(i?: number): TypeTupleElementContext[] | TypeTupleElementContext | null {
        if (i === undefined) {
            return this.getRuleContexts(TypeTupleElementContext);
        }

        return this.getRuleContext(i, TypeTupleElementContext);
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_typeTuple;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterTypeTuple) {
             listener.enterTypeTuple(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitTypeTuple) {
             listener.exitTypeTuple(this);
        }
    }
}


export class TypeTupleElementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.LPAREN, 0);
    }
    public REST(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.REST, 0);
    }
    public typeExpr(): TypeExprContext {
        return this.getRuleContext(0, TypeExprContext)!;
    }
    public RPAREN(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.RPAREN, 0);
    }
    public IDENTIFIER(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.IDENTIFIER, 0);
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_typeTupleElement;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterTypeTupleElement) {
             listener.enterTypeTupleElement(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitTypeTupleElement) {
             listener.exitTypeTupleElement(this);
        }
    }
}


export class TypeFunctionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode[];
    public LPAREN(i: number): antlr.TerminalNode | null;
    public LPAREN(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage7Parser.LPAREN);
    	} else {
    		return this.getToken(Stage7Parser.LPAREN, i);
    	}
    }
    public TYPEFN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.TYPEFN, 0)!;
    }
    public RPAREN(): antlr.TerminalNode[];
    public RPAREN(i: number): antlr.TerminalNode | null;
    public RPAREN(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage7Parser.RPAREN);
    	} else {
    		return this.getToken(Stage7Parser.RPAREN, i);
    	}
    }
    public typeExpr(): TypeExprContext {
        return this.getRuleContext(0, TypeExprContext)!;
    }
    public typeParams(): TypeParamsContext | null {
        return this.getRuleContext(0, TypeParamsContext);
    }
    public typeFnParam(): TypeFnParamContext[];
    public typeFnParam(i: number): TypeFnParamContext | null;
    public typeFnParam(i?: number): TypeFnParamContext[] | TypeFnParamContext | null {
        if (i === undefined) {
            return this.getRuleContexts(TypeFnParamContext);
        }

        return this.getRuleContext(i, TypeFnParamContext);
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_typeFunction;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterTypeFunction) {
             listener.enterTypeFunction(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitTypeFunction) {
             listener.exitTypeFunction(this);
        }
    }
}


export class TypeFnParamContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.IDENTIFIER, 0)!;
    }
    public typeExpr(): TypeExprContext {
        return this.getRuleContext(0, TypeExprContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public OPTIONAL(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.OPTIONAL, 0);
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_typeFnParam;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterTypeFnParam) {
             listener.enterTypeFnParam(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitTypeFnParam) {
             listener.exitTypeFnParam(this);
        }
    }
}


export class TypeObjectContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public typeProp(): TypePropContext[];
    public typeProp(i: number): TypePropContext | null;
    public typeProp(i?: number): TypePropContext[] | TypePropContext | null {
        if (i === undefined) {
            return this.getRuleContexts(TypePropContext);
        }

        return this.getRuleContext(i, TypePropContext);
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_typeObject;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterTypeObject) {
             listener.enterTypeObject(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitTypeObject) {
             listener.exitTypeObject(this);
        }
    }
}


export class TypePropContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.IDENTIFIER, 0)!;
    }
    public typeExpr(): TypeExprContext {
        return this.getRuleContext(0, TypeExprContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public propModifier(): PropModifierContext[];
    public propModifier(i: number): PropModifierContext | null;
    public propModifier(i?: number): PropModifierContext[] | PropModifierContext | null {
        if (i === undefined) {
            return this.getRuleContexts(PropModifierContext);
        }

        return this.getRuleContext(i, PropModifierContext);
    }
    public OPTIONAL(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.OPTIONAL, 0);
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_typeProp;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterTypeProp) {
             listener.enterTypeProp(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitTypeProp) {
             listener.exitTypeProp(this);
        }
    }
}


export class PropModifierContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public READONLY(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.READONLY, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_propModifier;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterPropModifier) {
             listener.enterPropModifier(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitPropModifier) {
             listener.exitPropModifier(this);
        }
    }
}


export class TypeLiteralContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public LIT(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LIT, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public STRING(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.STRING, 0);
    }
    public NUMBER(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.NUMBER, 0);
    }
    public BOOLEAN(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.BOOLEAN, 0);
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_typeLiteral;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterTypeLiteral) {
             listener.enterTypeLiteral(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitTypeLiteral) {
             listener.exitTypeLiteral(this);
        }
    }
}


export class TypeKeyofContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public KEYOF(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.KEYOF, 0)!;
    }
    public typeExpr(): TypeExprContext {
        return this.getRuleContext(0, TypeExprContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_typeKeyof;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterTypeKeyof) {
             listener.enterTypeKeyof(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitTypeKeyof) {
             listener.exitTypeKeyof(this);
        }
    }
}


export class TypeTypeofContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public TYPEOF(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.TYPEOF, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_typeTypeof;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterTypeTypeof) {
             listener.enterTypeTypeof(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitTypeTypeof) {
             listener.exitTypeTypeof(this);
        }
    }
}


export class TypeIndexAccessContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public INDEX(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.INDEX, 0)!;
    }
    public typeExpr(): TypeExprContext[];
    public typeExpr(i: number): TypeExprContext | null;
    public typeExpr(i?: number): TypeExprContext[] | TypeExprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(TypeExprContext);
        }

        return this.getRuleContext(i, TypeExprContext);
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_typeIndexAccess;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterTypeIndexAccess) {
             listener.enterTypeIndexAccess(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitTypeIndexAccess) {
             listener.exitTypeIndexAccess(this);
        }
    }
}


export class TypeConditionalContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public COND(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.COND, 0)!;
    }
    public typeExpr(): TypeExprContext[];
    public typeExpr(i: number): TypeExprContext | null;
    public typeExpr(i?: number): TypeExprContext[] | TypeExprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(TypeExprContext);
        }

        return this.getRuleContext(i, TypeExprContext);
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_typeConditional;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterTypeConditional) {
             listener.enterTypeConditional(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitTypeConditional) {
             listener.exitTypeConditional(this);
        }
    }
}


export class TypeInferContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public INFER(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.INFER, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_typeInfer;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterTypeInfer) {
             listener.enterTypeInfer(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitTypeInfer) {
             listener.exitTypeInfer(this);
        }
    }
}


export class TypeMappedContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public MAPPED(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.MAPPED, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.IDENTIFIER, 0)!;
    }
    public typeExpr(): TypeExprContext[];
    public typeExpr(i: number): TypeExprContext | null;
    public typeExpr(i?: number): TypeExprContext[] | TypeExprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(TypeExprContext);
        }

        return this.getRuleContext(i, TypeExprContext);
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public mappedModifiers(): MappedModifiersContext | null {
        return this.getRuleContext(0, MappedModifiersContext);
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_typeMapped;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterTypeMapped) {
             listener.enterTypeMapped(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitTypeMapped) {
             listener.exitTypeMapped(this);
        }
    }
}


export class MappedModifiersContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public MODIFIERS(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.MODIFIERS, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public mappedModifier(): MappedModifierContext[];
    public mappedModifier(i: number): MappedModifierContext | null;
    public mappedModifier(i?: number): MappedModifierContext[] | MappedModifierContext | null {
        if (i === undefined) {
            return this.getRuleContexts(MappedModifierContext);
        }

        return this.getRuleContext(i, MappedModifierContext);
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_mappedModifiers;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterMappedModifiers) {
             listener.enterMappedModifiers(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitMappedModifiers) {
             listener.exitMappedModifiers(this);
        }
    }
}


export class MappedModifierContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public READONLY(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.READONLY, 0);
    }
    public OPTIONAL(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.OPTIONAL, 0);
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_mappedModifier;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterMappedModifier) {
             listener.enterMappedModifier(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitMappedModifier) {
             listener.exitMappedModifier(this);
        }
    }
}


export class TypeTemplateLiteralContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public TYPE_TEMPLATE(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.TYPE_TEMPLATE, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public templatePart(): TemplatePartContext[];
    public templatePart(i: number): TemplatePartContext | null;
    public templatePart(i?: number): TemplatePartContext[] | TemplatePartContext | null {
        if (i === undefined) {
            return this.getRuleContexts(TemplatePartContext);
        }

        return this.getRuleContext(i, TemplatePartContext);
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_typeTemplateLiteral;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterTypeTemplateLiteral) {
             listener.enterTypeTemplateLiteral(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitTypeTemplateLiteral) {
             listener.exitTypeTemplateLiteral(this);
        }
    }
}


export class TemplatePartContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public STRING(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.STRING, 0);
    }
    public typeExpr(): TypeExprContext | null {
        return this.getRuleContext(0, TypeExprContext);
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_templatePart;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterTemplatePart) {
             listener.enterTemplatePart(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitTemplatePart) {
             listener.exitTemplatePart(this);
        }
    }
}


export class TypeApplicationContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public typeExpr(): TypeExprContext[];
    public typeExpr(i: number): TypeExprContext | null;
    public typeExpr(i?: number): TypeExprContext[] | TypeExprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(TypeExprContext);
        }

        return this.getRuleContext(i, TypeExprContext);
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_typeApplication;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterTypeApplication) {
             listener.enterTypeApplication(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitTypeApplication) {
             listener.exitTypeApplication(this);
        }
    }
}


export class TypeParamsContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public TYPE_PARAMS(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.TYPE_PARAMS, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public typeParamDecl(): TypeParamDeclContext[];
    public typeParamDecl(i: number): TypeParamDeclContext | null;
    public typeParamDecl(i?: number): TypeParamDeclContext[] | TypeParamDeclContext | null {
        if (i === undefined) {
            return this.getRuleContexts(TypeParamDeclContext);
        }

        return this.getRuleContext(i, TypeParamDeclContext);
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_typeParams;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterTypeParams) {
             listener.enterTypeParams(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitTypeParams) {
             listener.exitTypeParams(this);
        }
    }
}


export class TypeParamDeclContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.IDENTIFIER, 0)!;
    }
    public LPAREN(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.LPAREN, 0);
    }
    public RPAREN(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.RPAREN, 0);
    }
    public typeParamConstraint(): TypeParamConstraintContext | null {
        return this.getRuleContext(0, TypeParamConstraintContext);
    }
    public typeParamDefault(): TypeParamDefaultContext | null {
        return this.getRuleContext(0, TypeParamDefaultContext);
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_typeParamDecl;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterTypeParamDecl) {
             listener.enterTypeParamDecl(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitTypeParamDecl) {
             listener.exitTypeParamDecl(this);
        }
    }
}


export class TypeParamConstraintContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public EXTENDS(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.EXTENDS, 0)!;
    }
    public typeExpr(): TypeExprContext {
        return this.getRuleContext(0, TypeExprContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_typeParamConstraint;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterTypeParamConstraint) {
             listener.enterTypeParamConstraint(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitTypeParamConstraint) {
             listener.exitTypeParamConstraint(this);
        }
    }
}


export class TypeParamDefaultContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public DEFAULT(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.DEFAULT, 0)!;
    }
    public typeExpr(): TypeExprContext {
        return this.getRuleContext(0, TypeExprContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_typeParamDefault;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterTypeParamDefault) {
             listener.enterTypeParamDefault(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitTypeParamDefault) {
             listener.exitTypeParamDefault(this);
        }
    }
}


export class AssignContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public SET(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.SET, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.IDENTIFIER, 0);
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public propAccess(): PropAccessContext | null {
        return this.getRuleContext(0, PropAccessContext);
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_assign;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterAssign) {
             listener.enterAssign(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitAssign) {
             listener.exitAssign(this);
        }
    }
}


export class SwitchFormContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public SWITCH(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.SWITCH, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public caseClause(): CaseClauseContext[];
    public caseClause(i: number): CaseClauseContext | null;
    public caseClause(i?: number): CaseClauseContext[] | CaseClauseContext | null {
        if (i === undefined) {
            return this.getRuleContexts(CaseClauseContext);
        }

        return this.getRuleContext(i, CaseClauseContext);
    }
    public defaultClause(): DefaultClauseContext | null {
        return this.getRuleContext(0, DefaultClauseContext);
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_switchForm;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterSwitchForm) {
             listener.enterSwitchForm(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitSwitchForm) {
             listener.exitSwitchForm(this);
        }
    }
}


export class CaseClauseContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public CASE(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.CASE, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public statement(): StatementContext[];
    public statement(i: number): StatementContext | null;
    public statement(i?: number): StatementContext[] | StatementContext | null {
        if (i === undefined) {
            return this.getRuleContexts(StatementContext);
        }

        return this.getRuleContext(i, StatementContext);
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_caseClause;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterCaseClause) {
             listener.enterCaseClause(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitCaseClause) {
             listener.exitCaseClause(this);
        }
    }
}


export class DefaultClauseContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public DEFAULT(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.DEFAULT, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public statement(): StatementContext[];
    public statement(i: number): StatementContext | null;
    public statement(i?: number): StatementContext[] | StatementContext | null {
        if (i === undefined) {
            return this.getRuleContexts(StatementContext);
        }

        return this.getRuleContext(i, StatementContext);
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_defaultClause;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterDefaultClause) {
             listener.enterDefaultClause(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitDefaultClause) {
             listener.exitDefaultClause(this);
        }
    }
}


export class ForFormContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public FOR(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.FOR, 0)!;
    }
    public letStmt(): LetStmtContext {
        return this.getRuleContext(0, LetStmtContext)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public assign(): AssignContext {
        return this.getRuleContext(0, AssignContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public statement(): StatementContext[];
    public statement(i: number): StatementContext | null;
    public statement(i?: number): StatementContext[] | StatementContext | null {
        if (i === undefined) {
            return this.getRuleContexts(StatementContext);
        }

        return this.getRuleContext(i, StatementContext);
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_forForm;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterForForm) {
             listener.enterForForm(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitForForm) {
             listener.exitForForm(this);
        }
    }
}


export class ForInFormContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public FORIN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.FORIN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.IDENTIFIER, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public statement(): StatementContext[];
    public statement(i: number): StatementContext | null;
    public statement(i?: number): StatementContext[] | StatementContext | null {
        if (i === undefined) {
            return this.getRuleContexts(StatementContext);
        }

        return this.getRuleContext(i, StatementContext);
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_forInForm;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterForInForm) {
             listener.enterForInForm(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitForInForm) {
             listener.exitForInForm(this);
        }
    }
}


export class ForOfFormContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public FOROF(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.FOROF, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.IDENTIFIER, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public statement(): StatementContext[];
    public statement(i: number): StatementContext | null;
    public statement(i?: number): StatementContext[] | StatementContext | null {
        if (i === undefined) {
            return this.getRuleContexts(StatementContext);
        }

        return this.getRuleContext(i, StatementContext);
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_forOfForm;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterForOfForm) {
             listener.enterForOfForm(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitForOfForm) {
             listener.exitForOfForm(this);
        }
    }
}


export class ForAwaitFormContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public FORAWAIT(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.FORAWAIT, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.IDENTIFIER, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public statement(): StatementContext[];
    public statement(i: number): StatementContext | null;
    public statement(i?: number): StatementContext[] | StatementContext | null {
        if (i === undefined) {
            return this.getRuleContexts(StatementContext);
        }

        return this.getRuleContext(i, StatementContext);
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_forAwaitForm;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterForAwaitForm) {
             listener.enterForAwaitForm(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitForAwaitForm) {
             listener.exitForAwaitForm(this);
        }
    }
}


export class TryFormContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public TRY(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.TRY, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public catchClause(): CatchClauseContext | null {
        return this.getRuleContext(0, CatchClauseContext);
    }
    public finallyClause(): FinallyClauseContext | null {
        return this.getRuleContext(0, FinallyClauseContext);
    }
    public statement(): StatementContext[];
    public statement(i: number): StatementContext | null;
    public statement(i?: number): StatementContext[] | StatementContext | null {
        if (i === undefined) {
            return this.getRuleContexts(StatementContext);
        }

        return this.getRuleContext(i, StatementContext);
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_tryForm;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterTryForm) {
             listener.enterTryForm(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitTryForm) {
             listener.exitTryForm(this);
        }
    }
}


export class CatchClauseContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public CATCH(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.CATCH, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public statement(): StatementContext[];
    public statement(i: number): StatementContext | null;
    public statement(i?: number): StatementContext[] | StatementContext | null {
        if (i === undefined) {
            return this.getRuleContexts(StatementContext);
        }

        return this.getRuleContext(i, StatementContext);
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_catchClause;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterCatchClause) {
             listener.enterCatchClause(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitCatchClause) {
             listener.exitCatchClause(this);
        }
    }
}


export class FinallyClauseContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public FINALLY(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.FINALLY, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public statement(): StatementContext[];
    public statement(i: number): StatementContext | null;
    public statement(i?: number): StatementContext[] | StatementContext | null {
        if (i === undefined) {
            return this.getRuleContexts(StatementContext);
        }

        return this.getRuleContext(i, StatementContext);
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_finallyClause;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterFinallyClause) {
             listener.enterFinallyClause(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitFinallyClause) {
             listener.exitFinallyClause(this);
        }
    }
}


export class ExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public literal(): LiteralContext | null {
        return this.getRuleContext(0, LiteralContext);
    }
    public KEYWORD(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.KEYWORD, 0);
    }
    public IDENTIFIER(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.IDENTIFIER, 0);
    }
    public lambda(): LambdaContext | null {
        return this.getRuleContext(0, LambdaContext);
    }
    public fn(): FnContext | null {
        return this.getRuleContext(0, FnContext);
    }
    public asyncLambda(): AsyncLambdaContext | null {
        return this.getRuleContext(0, AsyncLambdaContext);
    }
    public asyncFn(): AsyncFnContext | null {
        return this.getRuleContext(0, AsyncFnContext);
    }
    public generatorFn(): GeneratorFnContext | null {
        return this.getRuleContext(0, GeneratorFnContext);
    }
    public asyncGeneratorFn(): AsyncGeneratorFnContext | null {
        return this.getRuleContext(0, AsyncGeneratorFnContext);
    }
    public awaitExpr(): AwaitExprContext | null {
        return this.getRuleContext(0, AwaitExprContext);
    }
    public yieldExpr(): YieldExprContext | null {
        return this.getRuleContext(0, YieldExprContext);
    }
    public yieldStarExpr(): YieldStarExprContext | null {
        return this.getRuleContext(0, YieldStarExprContext);
    }
    public bindExpr(): BindExprContext | null {
        return this.getRuleContext(0, BindExprContext);
    }
    public methodCallExpr(): MethodCallExprContext | null {
        return this.getRuleContext(0, MethodCallExprContext);
    }
    public objectExpr(): ObjectExprContext | null {
        return this.getRuleContext(0, ObjectExprContext);
    }
    public arrayExpr(): ArrayExprContext | null {
        return this.getRuleContext(0, ArrayExprContext);
    }
    public propAccess(): PropAccessContext | null {
        return this.getRuleContext(0, PropAccessContext);
    }
    public indexAccess(): IndexAccessContext | null {
        return this.getRuleContext(0, IndexAccessContext);
    }
    public quasiquote(): QuasiquoteContext | null {
        return this.getRuleContext(0, QuasiquoteContext);
    }
    public unquote(): UnquoteContext | null {
        return this.getRuleContext(0, UnquoteContext);
    }
    public unquoteSplicing(): UnquoteSplicingContext | null {
        return this.getRuleContext(0, UnquoteSplicingContext);
    }
    public ternary(): TernaryContext | null {
        return this.getRuleContext(0, TernaryContext);
    }
    public condExpr(): CondExprContext | null {
        return this.getRuleContext(0, CondExprContext);
    }
    public newForm(): NewFormContext | null {
        return this.getRuleContext(0, NewFormContext);
    }
    public optChain(): OptChainContext | null {
        return this.getRuleContext(0, OptChainContext);
    }
    public optChainIndex(): OptChainIndexContext | null {
        return this.getRuleContext(0, OptChainIndexContext);
    }
    public nullCoalesce(): NullCoalesceContext | null {
        return this.getRuleContext(0, NullCoalesceContext);
    }
    public typeofExpr(): TypeofExprContext | null {
        return this.getRuleContext(0, TypeofExprContext);
    }
    public typeAssert(): TypeAssertContext | null {
        return this.getRuleContext(0, TypeAssertContext);
    }
    public templateExpr(): TemplateExprContext | null {
        return this.getRuleContext(0, TemplateExprContext);
    }
    public thisExpr(): ThisExprContext | null {
        return this.getRuleContext(0, ThisExprContext);
    }
    public superExpr(): SuperExprContext | null {
        return this.getRuleContext(0, SuperExprContext);
    }
    public superConstructorCall(): SuperConstructorCallContext | null {
        return this.getRuleContext(0, SuperConstructorCallContext);
    }
    public superMethodCall(): SuperMethodCallContext | null {
        return this.getRuleContext(0, SuperMethodCallContext);
    }
    public call(): CallContext | null {
        return this.getRuleContext(0, CallContext);
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_expression;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterExpression) {
             listener.enterExpression(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitExpression) {
             listener.exitExpression(this);
        }
    }
}


export class ThisExprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public THIS(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.THIS, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_thisExpr;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterThisExpr) {
             listener.enterThisExpr(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitThisExpr) {
             listener.exitThisExpr(this);
        }
    }
}


export class SuperExprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public SUPER(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.SUPER, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_superExpr;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterSuperExpr) {
             listener.enterSuperExpr(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitSuperExpr) {
             listener.exitSuperExpr(this);
        }
    }
}


export class SuperConstructorCallContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public SUPER(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.SUPER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_superConstructorCall;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterSuperConstructorCall) {
             listener.enterSuperConstructorCall(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitSuperConstructorCall) {
             listener.exitSuperConstructorCall(this);
        }
    }
}


export class SuperMethodCallContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public SUPER_METHOD(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.SUPER_METHOD, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_superMethodCall;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterSuperMethodCall) {
             listener.enterSuperMethodCall(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitSuperMethodCall) {
             listener.exitSuperMethodCall(this);
        }
    }
}


export class TypeofExprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public TYPEOF(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.TYPEOF, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_typeofExpr;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterTypeofExpr) {
             listener.enterTypeofExpr(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitTypeofExpr) {
             listener.exitTypeofExpr(this);
        }
    }
}


export class TypeAssertContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public TYPE_AS(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.TYPE_AS, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public typeExpr(): TypeExprContext {
        return this.getRuleContext(0, TypeExprContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_typeAssert;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterTypeAssert) {
             listener.enterTypeAssert(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitTypeAssert) {
             listener.exitTypeAssert(this);
        }
    }
}


export class LambdaContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public LAMBDA(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LAMBDA, 0)!;
    }
    public fnSignature(): FnSignatureContext {
        return this.getRuleContext(0, FnSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public statement(): StatementContext[];
    public statement(i: number): StatementContext | null;
    public statement(i?: number): StatementContext[] | StatementContext | null {
        if (i === undefined) {
            return this.getRuleContexts(StatementContext);
        }

        return this.getRuleContext(i, StatementContext);
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_lambda;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterLambda) {
             listener.enterLambda(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitLambda) {
             listener.exitLambda(this);
        }
    }
}


export class FnContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public FN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.FN, 0)!;
    }
    public fnSignature(): FnSignatureContext {
        return this.getRuleContext(0, FnSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public statement(): StatementContext[];
    public statement(i: number): StatementContext | null;
    public statement(i?: number): StatementContext[] | StatementContext | null {
        if (i === undefined) {
            return this.getRuleContexts(StatementContext);
        }

        return this.getRuleContext(i, StatementContext);
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_fn;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterFn) {
             listener.enterFn(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitFn) {
             listener.exitFn(this);
        }
    }
}


export class AsyncLambdaContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public ASYNC_LAMBDA(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.ASYNC_LAMBDA, 0)!;
    }
    public fnSignature(): FnSignatureContext {
        return this.getRuleContext(0, FnSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public statement(): StatementContext[];
    public statement(i: number): StatementContext | null;
    public statement(i?: number): StatementContext[] | StatementContext | null {
        if (i === undefined) {
            return this.getRuleContexts(StatementContext);
        }

        return this.getRuleContext(i, StatementContext);
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_asyncLambda;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterAsyncLambda) {
             listener.enterAsyncLambda(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitAsyncLambda) {
             listener.exitAsyncLambda(this);
        }
    }
}


export class AsyncFnContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public ASYNC_FN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.ASYNC_FN, 0)!;
    }
    public fnSignature(): FnSignatureContext {
        return this.getRuleContext(0, FnSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public statement(): StatementContext[];
    public statement(i: number): StatementContext | null;
    public statement(i?: number): StatementContext[] | StatementContext | null {
        if (i === undefined) {
            return this.getRuleContexts(StatementContext);
        }

        return this.getRuleContext(i, StatementContext);
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_asyncFn;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterAsyncFn) {
             listener.enterAsyncFn(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitAsyncFn) {
             listener.exitAsyncFn(this);
        }
    }
}


export class GeneratorFnContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public GENERATOR_FN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.GENERATOR_FN, 0)!;
    }
    public fnSignature(): FnSignatureContext {
        return this.getRuleContext(0, FnSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public statement(): StatementContext[];
    public statement(i: number): StatementContext | null;
    public statement(i?: number): StatementContext[] | StatementContext | null {
        if (i === undefined) {
            return this.getRuleContexts(StatementContext);
        }

        return this.getRuleContext(i, StatementContext);
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_generatorFn;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterGeneratorFn) {
             listener.enterGeneratorFn(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitGeneratorFn) {
             listener.exitGeneratorFn(this);
        }
    }
}


export class AsyncGeneratorFnContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public ASYNC_GENERATOR_FN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.ASYNC_GENERATOR_FN, 0)!;
    }
    public fnSignature(): FnSignatureContext {
        return this.getRuleContext(0, FnSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public statement(): StatementContext[];
    public statement(i: number): StatementContext | null;
    public statement(i?: number): StatementContext[] | StatementContext | null {
        if (i === undefined) {
            return this.getRuleContexts(StatementContext);
        }

        return this.getRuleContext(i, StatementContext);
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_asyncGeneratorFn;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterAsyncGeneratorFn) {
             listener.enterAsyncGeneratorFn(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitAsyncGeneratorFn) {
             listener.exitAsyncGeneratorFn(this);
        }
    }
}


export class AwaitExprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public AWAIT(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.AWAIT, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_awaitExpr;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterAwaitExpr) {
             listener.enterAwaitExpr(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitAwaitExpr) {
             listener.exitAwaitExpr(this);
        }
    }
}


export class YieldExprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public YIELD(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.YIELD, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_yieldExpr;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterYieldExpr) {
             listener.enterYieldExpr(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitYieldExpr) {
             listener.exitYieldExpr(this);
        }
    }
}


export class YieldStarExprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public YIELD_STAR(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.YIELD_STAR, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_yieldStarExpr;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterYieldStarExpr) {
             listener.enterYieldStarExpr(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitYieldStarExpr) {
             listener.exitYieldStarExpr(this);
        }
    }
}


export class BindExprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public BIND(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.BIND, 0)!;
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_bindExpr;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterBindExpr) {
             listener.enterBindExpr(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitBindExpr) {
             listener.exitBindExpr(this);
        }
    }
}


export class MethodCallExprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public METHOD_CALL(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.METHOD_CALL, 0)!;
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_methodCallExpr;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterMethodCallExpr) {
             listener.enterMethodCallExpr(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitMethodCallExpr) {
             listener.exitMethodCallExpr(this);
        }
    }
}


export class TernaryContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public TERNARY(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.TERNARY, 0)!;
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_ternary;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterTernary) {
             listener.enterTernary(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitTernary) {
             listener.exitTernary(this);
        }
    }
}


export class CondExprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public COND(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.COND, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_condExpr;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterCondExpr) {
             listener.enterCondExpr(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitCondExpr) {
             listener.exitCondExpr(this);
        }
    }
}


export class NewFormContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public NEW(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.NEW, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public typeArgs(): TypeArgsContext | null {
        return this.getRuleContext(0, TypeArgsContext);
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_newForm;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterNewForm) {
             listener.enterNewForm(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitNewForm) {
             listener.exitNewForm(this);
        }
    }
}


export class ObjectExprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public OBJECT(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.OBJECT, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public objectField(): ObjectFieldContext[];
    public objectField(i: number): ObjectFieldContext | null;
    public objectField(i?: number): ObjectFieldContext[] | ObjectFieldContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ObjectFieldContext);
        }

        return this.getRuleContext(i, ObjectFieldContext);
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_objectExpr;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterObjectExpr) {
             listener.enterObjectExpr(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitObjectExpr) {
             listener.exitObjectExpr(this);
        }
    }
}


export class ObjectFieldContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public propKey(): PropKeyContext | null {
        return this.getRuleContext(0, PropKeyContext);
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public methodDef(): MethodDefContext | null {
        return this.getRuleContext(0, MethodDefContext);
    }
    public IDENTIFIER(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.IDENTIFIER, 0);
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_objectField;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterObjectField) {
             listener.enterObjectField(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitObjectField) {
             listener.exitObjectField(this);
        }
    }
}


export class MethodDefContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public METHOD(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.METHOD, 0)!;
    }
    public fnSignature(): FnSignatureContext {
        return this.getRuleContext(0, FnSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public statement(): StatementContext[];
    public statement(i: number): StatementContext | null;
    public statement(i?: number): StatementContext[] | StatementContext | null {
        if (i === undefined) {
            return this.getRuleContexts(StatementContext);
        }

        return this.getRuleContext(i, StatementContext);
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_methodDef;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterMethodDef) {
             listener.enterMethodDef(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitMethodDef) {
             listener.exitMethodDef(this);
        }
    }
}


export class ArrayExprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public ARRAY(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.ARRAY, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_arrayExpr;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterArrayExpr) {
             listener.enterArrayExpr(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitArrayExpr) {
             listener.exitArrayExpr(this);
        }
    }
}


export class TemplateExprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public TEMPLATE(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.TEMPLATE, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public STRING(): antlr.TerminalNode[];
    public STRING(i: number): antlr.TerminalNode | null;
    public STRING(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage7Parser.STRING);
    	} else {
    		return this.getToken(Stage7Parser.STRING, i);
    	}
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_templateExpr;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterTemplateExpr) {
             listener.enterTemplateExpr(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitTemplateExpr) {
             listener.exitTemplateExpr(this);
        }
    }
}


export class PropKeyContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public IDENTIFIER(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.IDENTIFIER, 0);
    }
    public KEYWORD(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.KEYWORD, 0);
    }
    public STRING(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.STRING, 0);
    }
    public NUMBER(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.NUMBER, 0);
    }
    public PROGRAM(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.PROGRAM, 0);
    }
    public LETSTAR(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.LETSTAR, 0);
    }
    public LET(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.LET, 0);
    }
    public CONSTSTAR(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.CONSTSTAR, 0);
    }
    public CONST(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.CONST, 0);
    }
    public LAMBDA(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.LAMBDA, 0);
    }
    public FN(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.FN, 0);
    }
    public METHOD(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.METHOD, 0);
    }
    public BIND(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.BIND, 0);
    }
    public METHOD_CALL(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.METHOD_CALL, 0);
    }
    public DEFMACRO(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.DEFMACRO, 0);
    }
    public MACRO_TIME_ATTR(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.MACRO_TIME_ATTR, 0);
    }
    public IF(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.IF, 0);
    }
    public WHILE(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.WHILE, 0);
    }
    public BEGIN(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.BEGIN, 0);
    }
    public RETURN(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.RETURN, 0);
    }
    public THROW(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.THROW, 0);
    }
    public SET(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.SET, 0);
    }
    public TERNARY(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.TERNARY, 0);
    }
    public COND(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.COND, 0);
    }
    public OBJECT(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.OBJECT, 0);
    }
    public ARRAY(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.ARRAY, 0);
    }
    public INDEX(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.INDEX, 0);
    }
    public QUASI(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.QUASI, 0);
    }
    public QUOTE(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.QUOTE, 0);
    }
    public UNQUOTE_SPLICING(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.UNQUOTE_SPLICING, 0);
    }
    public UNQUOTE(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.UNQUOTE, 0);
    }
    public TYPE_ARRAY(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.TYPE_ARRAY, 0);
    }
    public NEW(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.NEW, 0);
    }
    public IMPORT(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.IMPORT, 0);
    }
    public SWITCH(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.SWITCH, 0);
    }
    public CASE(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.CASE, 0);
    }
    public DEFAULT(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.DEFAULT, 0);
    }
    public FORIN(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.FORIN, 0);
    }
    public FOROF(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.FOROF, 0);
    }
    public FOR(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.FOR, 0);
    }
    public FORAWAIT(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.FORAWAIT, 0);
    }
    public TRY(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.TRY, 0);
    }
    public CATCH(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.CATCH, 0);
    }
    public FINALLY(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.FINALLY, 0);
    }
    public UNION(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.UNION, 0);
    }
    public INTERSECT(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.INTERSECT, 0);
    }
    public TUPLE(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.TUPLE, 0);
    }
    public TYPEFN(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.TYPEFN, 0);
    }
    public LIT(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.LIT, 0);
    }
    public KEYOF(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.KEYOF, 0);
    }
    public TYPEOF(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.TYPEOF, 0);
    }
    public INFER(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.INFER, 0);
    }
    public MAPPED(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.MAPPED, 0);
    }
    public TYPE_TEMPLATE(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.TYPE_TEMPLATE, 0);
    }
    public TEMPLATE(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.TEMPLATE, 0);
    }
    public REST(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.REST, 0);
    }
    public READONLY(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.READONLY, 0);
    }
    public TYPE_AS(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.TYPE_AS, 0);
    }
    public TYPE_PARAMS(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.TYPE_PARAMS, 0);
    }
    public TYPE_ARGS(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.TYPE_ARGS, 0);
    }
    public EXTENDS(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.EXTENDS, 0);
    }
    public RETURNS(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.RETURNS, 0);
    }
    public TYPE(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.TYPE, 0);
    }
    public INTERFACE(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.INTERFACE, 0);
    }
    public MODIFIERS(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.MODIFIERS, 0);
    }
    public BOOLEAN(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.BOOLEAN, 0);
    }
    public NULL(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.NULL, 0);
    }
    public UNDEFINED(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.UNDEFINED, 0);
    }
    public EXPORT(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.EXPORT, 0);
    }
    public EXPORT_DEFAULT(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.EXPORT_DEFAULT, 0);
    }
    public EXPORT_NAMED(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.EXPORT_NAMED, 0);
    }
    public EXPORT_NS_FROM(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.EXPORT_NS_FROM, 0);
    }
    public EXPORT_FROM(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.EXPORT_FROM, 0);
    }
    public EXPORT_ALL_FROM(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.EXPORT_ALL_FROM, 0);
    }
    public IMPORT_TYPE(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.IMPORT_TYPE, 0);
    }
    public EXPORT_TYPE(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.EXPORT_TYPE, 0);
    }
    public EXPORT_TYPE_FROM(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.EXPORT_TYPE_FROM, 0);
    }
    public EXPORT_TYPE_ALL_FROM(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.EXPORT_TYPE_ALL_FROM, 0);
    }
    public CLASS(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.CLASS, 0);
    }
    public CLASS_BODY(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.CLASS_BODY, 0);
    }
    public FIELD(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.FIELD, 0);
    }
    public CONSTRUCTOR(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.CONSTRUCTOR, 0);
    }
    public THIS(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.THIS, 0);
    }
    public SUPER(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.SUPER, 0);
    }
    public SUPER_METHOD(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.SUPER_METHOD, 0);
    }
    public GET(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.GET, 0);
    }
    public SETPROP(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.SETPROP, 0);
    }
    public ABSTRACT_METHOD(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.ABSTRACT_METHOD, 0);
    }
    public IMPLEMENTS(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.IMPLEMENTS, 0);
    }
    public ASYNC_GENERATOR_FN(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.ASYNC_GENERATOR_FN, 0);
    }
    public ASYNC_LAMBDA(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.ASYNC_LAMBDA, 0);
    }
    public ASYNC_FN(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.ASYNC_FN, 0);
    }
    public GENERATOR_FN(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.GENERATOR_FN, 0);
    }
    public YIELD_STAR(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.YIELD_STAR, 0);
    }
    public YIELD(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.YIELD, 0);
    }
    public AWAIT(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.AWAIT, 0);
    }
    public CARET(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.CARET, 0);
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_propKey;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterPropKey) {
             listener.enterPropKey(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitPropKey) {
             listener.exitPropKey(this);
        }
    }
}


export class PropAccessContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public DOT(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.DOT, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public propKey(): PropKeyContext {
        return this.getRuleContext(0, PropKeyContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_propAccess;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterPropAccess) {
             listener.enterPropAccess(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitPropAccess) {
             listener.exitPropAccess(this);
        }
    }
}


export class IndexAccessContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public INDEX(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.INDEX, 0)!;
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_indexAccess;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterIndexAccess) {
             listener.enterIndexAccess(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitIndexAccess) {
             listener.exitIndexAccess(this);
        }
    }
}


export class QuasiquoteContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public quasiForm(): QuasiFormContext {
        return this.getRuleContext(0, QuasiFormContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public QUASI(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.QUASI, 0);
    }
    public QUOTE(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.QUOTE, 0);
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_quasiquote;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterQuasiquote) {
             listener.enterQuasiquote(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitQuasiquote) {
             listener.exitQuasiquote(this);
        }
    }
}


export class QuasiFormContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public topLevelLet(): TopLevelLetContext | null {
        return this.getRuleContext(0, TopLevelLetContext);
    }
    public topLevelConst(): TopLevelConstContext | null {
        return this.getRuleContext(0, TopLevelConstContext);
    }
    public typeAlias(): TypeAliasContext | null {
        return this.getRuleContext(0, TypeAliasContext);
    }
    public interfaceDef(): InterfaceDefContext | null {
        return this.getRuleContext(0, InterfaceDefContext);
    }
    public classDef(): ClassDefContext | null {
        return this.getRuleContext(0, ClassDefContext);
    }
    public importForm(): ImportFormContext | null {
        return this.getRuleContext(0, ImportFormContext);
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_quasiForm;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterQuasiForm) {
             listener.enterQuasiForm(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitQuasiForm) {
             listener.exitQuasiForm(this);
        }
    }
}


export class UnquoteContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public UNQUOTE(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.UNQUOTE, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_unquote;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterUnquote) {
             listener.enterUnquote(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitUnquote) {
             listener.exitUnquote(this);
        }
    }
}


export class UnquoteSplicingContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public UNQUOTE_SPLICING(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.UNQUOTE_SPLICING, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_unquoteSplicing;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterUnquoteSplicing) {
             listener.enterUnquoteSplicing(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitUnquoteSplicing) {
             listener.exitUnquoteSplicing(this);
        }
    }
}


export class OptChainContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public OPTCHAIN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.OPTCHAIN, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public propKey(): PropKeyContext {
        return this.getRuleContext(0, PropKeyContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_optChain;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterOptChain) {
             listener.enterOptChain(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitOptChain) {
             listener.exitOptChain(this);
        }
    }
}


export class OptChainIndexContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public OPTCHAIN_INDEX(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.OPTCHAIN_INDEX, 0)!;
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_optChainIndex;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterOptChainIndex) {
             listener.enterOptChainIndex(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitOptChainIndex) {
             listener.exitOptChainIndex(this);
        }
    }
}


export class NullCoalesceContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public NULLCOAL(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.NULLCOAL, 0)!;
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_nullCoalesce;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterNullCoalesce) {
             listener.enterNullCoalesce(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitNullCoalesce) {
             listener.exitNullCoalesce(this);
        }
    }
}


export class CallContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public typeArgs(): TypeArgsContext | null {
        return this.getRuleContext(0, TypeArgsContext);
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_call;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterCall) {
             listener.enterCall(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitCall) {
             listener.exitCall(this);
        }
    }
}


export class TypeArgsContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public TYPE_ARGS(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.TYPE_ARGS, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public typeExpr(): TypeExprContext[];
    public typeExpr(i: number): TypeExprContext | null;
    public typeExpr(i?: number): TypeExprContext[] | TypeExprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(TypeExprContext);
        }

        return this.getRuleContext(i, TypeExprContext);
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_typeArgs;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterTypeArgs) {
             listener.enterTypeArgs(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitTypeArgs) {
             listener.exitTypeArgs(this);
        }
    }
}


export class FnSignatureContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public param(): ParamContext[];
    public param(i: number): ParamContext | null;
    public param(i?: number): ParamContext[] | ParamContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ParamContext);
        }

        return this.getRuleContext(i, ParamContext);
    }
    public COLON(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.COLON, 0);
    }
    public typeExpr(): TypeExprContext | null {
        return this.getRuleContext(0, TypeExprContext);
    }
    public restParam(): RestParamContext | null {
        return this.getRuleContext(0, RestParamContext);
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage7Parser.COMMA);
    	} else {
    		return this.getToken(Stage7Parser.COMMA, i);
    	}
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_fnSignature;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterFnSignature) {
             listener.enterFnSignature(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitFnSignature) {
             listener.exitFnSignature(this);
        }
    }
}


export class ParamContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public COLON(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.COLON, 0);
    }
    public typeExpr(): TypeExprContext | null {
        return this.getRuleContext(0, TypeExprContext);
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_param;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterParam) {
             listener.enterParam(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitParam) {
             listener.exitParam(this);
        }
    }
}


export class RestParamContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.LPAREN, 0)!;
    }
    public REST(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.REST, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.RPAREN, 0)!;
    }
    public COLON(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.COLON, 0);
    }
    public typeExpr(): TypeExprContext | null {
        return this.getRuleContext(0, TypeExprContext);
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_restParam;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterRestParam) {
             listener.enterRestParam(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitRestParam) {
             listener.exitRestParam(this);
        }
    }
}


export class LiteralContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public NUMBER(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.NUMBER, 0);
    }
    public STRING(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.STRING, 0);
    }
    public BOOLEAN(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.BOOLEAN, 0);
    }
    public NULL(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.NULL, 0);
    }
    public UNDEFINED(): antlr.TerminalNode | null {
        return this.getToken(Stage7Parser.UNDEFINED, 0);
    }
    public override get ruleIndex(): number {
        return Stage7Parser.RULE_literal;
    }
    public override enterRule(listener: Stage7Listener): void {
        if(listener.enterLiteral) {
             listener.enterLiteral(this);
        }
    }
    public override exitRule(listener: Stage7Listener): void {
        if(listener.exitLiteral) {
             listener.exitLiteral(this);
        }
    }
}
