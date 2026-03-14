
import * as antlr from "antlr4ng";
import { Token } from "antlr4ng";

import { Stage8Listener } from "./Stage8Listener.js";
// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;


export class Stage8Parser extends antlr.Parser {
    public static readonly COMMENT = 1;
    public static readonly LPAREN = 2;
    public static readonly RPAREN = 3;
    public static readonly COMMA = 4;
    public static readonly MACRO_IMPORT = 5;
    public static readonly MACRO_EXPORT = 6;
    public static readonly PROGRAM = 7;
    public static readonly LETSTAR = 8;
    public static readonly LET = 9;
    public static readonly CONSTSTAR = 10;
    public static readonly CONST = 11;
    public static readonly LAMBDA = 12;
    public static readonly FN = 13;
    public static readonly METHOD = 14;
    public static readonly BIND = 15;
    public static readonly METHOD_CALL = 16;
    public static readonly DEFMACRO = 17;
    public static readonly MACRO_TIME_ATTR = 18;
    public static readonly MACRO_ERROR = 19;
    public static readonly IF = 20;
    public static readonly WHILE = 21;
    public static readonly BEGIN = 22;
    public static readonly RETURN = 23;
    public static readonly THROW = 24;
    public static readonly SET = 25;
    public static readonly TERNARY = 26;
    public static readonly COND = 27;
    public static readonly OBJECT = 28;
    public static readonly TYPE_ARRAY = 29;
    public static readonly ARRAY = 30;
    public static readonly OPTCHAIN_INDEX = 31;
    public static readonly OPTCHAIN = 32;
    public static readonly DOT = 33;
    public static readonly INDEX = 34;
    public static readonly NULLCOAL = 35;
    public static readonly QUASI = 36;
    public static readonly QUOTE = 37;
    public static readonly UNQUOTE_SPLICING = 38;
    public static readonly UNQUOTE = 39;
    public static readonly NEW = 40;
    public static readonly IMPORT = 41;
    public static readonly SWITCH = 42;
    public static readonly CASE = 43;
    public static readonly DEFAULT = 44;
    public static readonly FORIN = 45;
    public static readonly FOROF = 46;
    public static readonly FORAWAIT = 47;
    public static readonly TRY = 48;
    public static readonly CATCH = 49;
    public static readonly FINALLY = 50;
    public static readonly FOR = 51;
    public static readonly CLASS_BODY = 52;
    public static readonly SUPER_METHOD = 53;
    public static readonly ABSTRACT_METHOD = 54;
    public static readonly CLASS = 55;
    public static readonly FIELD = 56;
    public static readonly CONSTRUCTOR = 57;
    public static readonly THIS = 58;
    public static readonly SUPER = 59;
    public static readonly GET = 60;
    public static readonly SETPROP = 61;
    public static readonly IMPLEMENTS = 62;
    public static readonly UNION = 63;
    public static readonly INTERSECT = 64;
    public static readonly TUPLE = 65;
    public static readonly TYPEFN = 66;
    public static readonly LIT = 67;
    public static readonly KEYOF = 68;
    public static readonly TYPEOF = 69;
    public static readonly TYPE_AS = 70;
    public static readonly INFER = 71;
    public static readonly MAPPED = 72;
    public static readonly TYPE_TEMPLATE = 73;
    public static readonly TEMPLATE = 74;
    public static readonly REST = 75;
    public static readonly READONLY = 76;
    public static readonly TYPE_PARAMS = 77;
    public static readonly TYPE_ARGS = 78;
    public static readonly EXTENDS = 79;
    public static readonly RETURNS = 80;
    public static readonly TYPE = 81;
    public static readonly INTERFACE = 82;
    public static readonly ENUM = 83;
    public static readonly MODIFIERS = 84;
    public static readonly OPTIONAL = 85;
    public static readonly BOOLEAN = 86;
    public static readonly NULL = 87;
    public static readonly UNDEFINED = 88;
    public static readonly COLON = 89;
    public static readonly ASYNC_GENERATOR_FN = 90;
    public static readonly ASYNC_LAMBDA = 91;
    public static readonly ASYNC_FN = 92;
    public static readonly GENERATOR_FN = 93;
    public static readonly YIELD_STAR = 94;
    public static readonly YIELD = 95;
    public static readonly AWAIT = 96;
    public static readonly CARET = 97;
    public static readonly PUBLIC = 98;
    public static readonly PRIVATE = 99;
    public static readonly PROTECTED = 100;
    public static readonly STATIC = 101;
    public static readonly ABSTRACT = 102;
    public static readonly OVERRIDE = 103;
    public static readonly ASYNC = 104;
    public static readonly GENERATOR = 105;
    public static readonly ELSE = 106;
    public static readonly LBRACK = 107;
    public static readonly RBRACK = 108;
    public static readonly EXPORT = 109;
    public static readonly EXPORT_DEFAULT = 110;
    public static readonly EXPORT_NAMED = 111;
    public static readonly EXPORT_NS_FROM = 112;
    public static readonly EXPORT_FROM = 113;
    public static readonly EXPORT_ALL_FROM = 114;
    public static readonly IMPORT_TYPE = 115;
    public static readonly EXPORT_TYPE_ALL_FROM = 116;
    public static readonly EXPORT_TYPE_FROM = 117;
    public static readonly EXPORT_TYPE = 118;
    public static readonly NUMBER = 119;
    public static readonly STRING = 120;
    public static readonly MULTILINE_STRING = 121;
    public static readonly NEG_NUMBER = 122;
    public static readonly MINUS = 123;
    public static readonly IDENTIFIER = 124;
    public static readonly WS = 125;
    public static readonly RULE_program = 0;
    public static readonly RULE_topLevel = 1;
    public static readonly RULE_decl = 2;
    public static readonly RULE_defmacro = 3;
    public static readonly RULE_macroTimeFnDef = 4;
    public static readonly RULE_macroImport = 5;
    public static readonly RULE_macroExport = 6;
    public static readonly RULE_macroExportSpec = 7;
    public static readonly RULE_topLevelLet = 8;
    public static readonly RULE_topLevelConst = 9;
    public static readonly RULE_metaAnnotation = 10;
    public static readonly RULE_typeAlias = 11;
    public static readonly RULE_interfaceDef = 12;
    public static readonly RULE_interfaceExtends = 13;
    public static readonly RULE_enumDef = 14;
    public static readonly RULE_enumMember = 15;
    public static readonly RULE_classDef = 16;
    public static readonly RULE_anonClassDef = 17;
    public static readonly RULE_classExtends = 18;
    public static readonly RULE_classImplements = 19;
    public static readonly RULE_classBody = 20;
    public static readonly RULE_classElement = 21;
    public static readonly RULE_modifier = 22;
    public static readonly RULE_fieldDef = 23;
    public static readonly RULE_constructorDef = 24;
    public static readonly RULE_classMethodDef = 25;
    public static readonly RULE_abstractMethodDef = 26;
    public static readonly RULE_getterDef = 27;
    public static readonly RULE_setterDef = 28;
    public static readonly RULE_methodKey = 29;
    public static readonly RULE_typedParam = 30;
    public static readonly RULE_fnSignatureTyped = 31;
    public static readonly RULE_statement = 32;
    public static readonly RULE_letStar = 33;
    public static readonly RULE_letStmt = 34;
    public static readonly RULE_constStar = 35;
    public static readonly RULE_constStmt = 36;
    public static readonly RULE_ifForm = 37;
    public static readonly RULE_whileForm = 38;
    public static readonly RULE_block = 39;
    public static readonly RULE_returnForm = 40;
    public static readonly RULE_throwForm = 41;
    public static readonly RULE_importForm = 42;
    public static readonly RULE_importTypeForm = 43;
    public static readonly RULE_importTypeSpec = 44;
    public static readonly RULE_importTypeName = 45;
    public static readonly RULE_exportForm = 46;
    public static readonly RULE_exportBinding = 47;
    public static readonly RULE_exportDefault = 48;
    public static readonly RULE_exportNamed = 49;
    public static readonly RULE_exportNamePair = 50;
    public static readonly RULE_exportFrom = 51;
    public static readonly RULE_exportAllFrom = 52;
    public static readonly RULE_exportNsFromForm = 53;
    public static readonly RULE_exportTypeForm = 54;
    public static readonly RULE_exportTypeFromForm = 55;
    public static readonly RULE_exportTypeAllFromForm = 56;
    public static readonly RULE_exportDeclForm = 57;
    public static readonly RULE_starBinding = 58;
    public static readonly RULE_singleBinding = 59;
    public static readonly RULE_typeExpr = 60;
    public static readonly RULE_typeUnion = 61;
    public static readonly RULE_typeIntersection = 62;
    public static readonly RULE_typeArray = 63;
    public static readonly RULE_typeTuple = 64;
    public static readonly RULE_typeTupleElement = 65;
    public static readonly RULE_typeFunction = 66;
    public static readonly RULE_typeFnParam = 67;
    public static readonly RULE_typeObject = 68;
    public static readonly RULE_typeProp = 69;
    public static readonly RULE_propModifier = 70;
    public static readonly RULE_typeLiteral = 71;
    public static readonly RULE_typeKeyof = 72;
    public static readonly RULE_typeTypeof = 73;
    public static readonly RULE_typeIndexAccess = 74;
    public static readonly RULE_typeConditional = 75;
    public static readonly RULE_typeInfer = 76;
    public static readonly RULE_typeMapped = 77;
    public static readonly RULE_mappedModifiers = 78;
    public static readonly RULE_mappedModifier = 79;
    public static readonly RULE_typeTemplateLiteral = 80;
    public static readonly RULE_templatePart = 81;
    public static readonly RULE_typeApplication = 82;
    public static readonly RULE_typeParams = 83;
    public static readonly RULE_typeParamDecl = 84;
    public static readonly RULE_typeParamConstraint = 85;
    public static readonly RULE_typeParamDefault = 86;
    public static readonly RULE_assign = 87;
    public static readonly RULE_switchForm = 88;
    public static readonly RULE_caseClause = 89;
    public static readonly RULE_defaultClause = 90;
    public static readonly RULE_forForm = 91;
    public static readonly RULE_forInForm = 92;
    public static readonly RULE_forOfForm = 93;
    public static readonly RULE_forAwaitForm = 94;
    public static readonly RULE_tryForm = 95;
    public static readonly RULE_catchClause = 96;
    public static readonly RULE_finallyClause = 97;
    public static readonly RULE_expression = 98;
    public static readonly RULE_thisExpr = 99;
    public static readonly RULE_superExpr = 100;
    public static readonly RULE_superConstructorCall = 101;
    public static readonly RULE_superMethodCall = 102;
    public static readonly RULE_typeofExpr = 103;
    public static readonly RULE_typeAssert = 104;
    public static readonly RULE_lambda = 105;
    public static readonly RULE_fn = 106;
    public static readonly RULE_asyncLambda = 107;
    public static readonly RULE_asyncFn = 108;
    public static readonly RULE_generatorFn = 109;
    public static readonly RULE_asyncGeneratorFn = 110;
    public static readonly RULE_awaitExpr = 111;
    public static readonly RULE_yieldExpr = 112;
    public static readonly RULE_yieldStarExpr = 113;
    public static readonly RULE_bindExpr = 114;
    public static readonly RULE_methodCallExpr = 115;
    public static readonly RULE_ternary = 116;
    public static readonly RULE_condExpr = 117;
    public static readonly RULE_condClause = 118;
    public static readonly RULE_condElseClause = 119;
    public static readonly RULE_newForm = 120;
    public static readonly RULE_objectExpr = 121;
    public static readonly RULE_objectField = 122;
    public static readonly RULE_methodDef = 123;
    public static readonly RULE_arrayExpr = 124;
    public static readonly RULE_templateExpr = 125;
    public static readonly RULE_propKey = 126;
    public static readonly RULE_propAccess = 127;
    public static readonly RULE_indexAccess = 128;
    public static readonly RULE_quasiquote = 129;
    public static readonly RULE_quasiForm = 130;
    public static readonly RULE_sForm = 131;
    public static readonly RULE_unquote = 132;
    public static readonly RULE_unquoteSplicing = 133;
    public static readonly RULE_optChain = 134;
    public static readonly RULE_optChainIndex = 135;
    public static readonly RULE_nullCoalesce = 136;
    public static readonly RULE_call = 137;
    public static readonly RULE_typeArgs = 138;
    public static readonly RULE_fnSignature = 139;
    public static readonly RULE_param = 140;
    public static readonly RULE_restParam = 141;
    public static readonly RULE_literal = 142;

    public static readonly literalNames = [
        null, null, "'('", "')'", "','", "'macro-import'", "'macro-export'", 
        "'program'", "'let*'", "'let'", "'const*'", "'const'", "'lambda'", 
        "'fn'", "'method'", "'bind'", "'method-call'", "'defmacro'", "'#[macro-time]'", 
        "'macro-error'", "'if'", "'while'", "'begin'", "'return'", "'throw'", 
        "'set!'", "'ternary'", "'cond'", "'object'", "'type-array'", "'array'", 
        "'optchain-index'", "'.?'", "'.'", "'index'", "'??'", "'quasi'", 
        "'quote'", "'unquote-splicing'", "'unquote'", "'new'", "'import'", 
        "'switch'", "'case'", "'default'", "'for-in'", "'for-of'", "'for-await'", 
        "'try'", "'catch'", "'finally'", "'for'", "'class-body'", "'super-method'", 
        "'abstract-method'", "'class'", "'field'", "'constructor'", "'this'", 
        "'super'", "'get'", "'set'", "'implements'", "'union'", "'intersect'", 
        "'tuple'", "'tfn'", "'tlit'", "'keyof'", "'typeof'", "'type-as'", 
        "'infer'", "'mapped'", "'type-template'", "'template'", "'rest'", 
        "'readonly'", "'type-params'", "'type-args'", "'extends'", "'returns'", 
        "'type'", "'interface'", "'enum'", "'modifiers'", "'?'", null, "'null'", 
        "'undefined'", "':'", "'async-generator-fn'", "'async-lambda'", 
        "'async-fn'", "'generator-fn'", "'yield*'", "'yield'", "'await'", 
        "'^'", "'public'", "'private'", "'protected'", "'static'", "'abstract'", 
        "'override'", "'async'", "'generator'", "'else'", "'['", "']'", 
        "'export'", "'export-default'", "'export-named'", "'export-ns-from'", 
        "'export-from'", "'export-all-from'", "'import-type'", "'export-type-all-from'", 
        "'export-type-from'", "'export-type'", null, null, null, null, "'-'"
    ];

    public static readonly symbolicNames = [
        null, "COMMENT", "LPAREN", "RPAREN", "COMMA", "MACRO_IMPORT", "MACRO_EXPORT", 
        "PROGRAM", "LETSTAR", "LET", "CONSTSTAR", "CONST", "LAMBDA", "FN", 
        "METHOD", "BIND", "METHOD_CALL", "DEFMACRO", "MACRO_TIME_ATTR", 
        "MACRO_ERROR", "IF", "WHILE", "BEGIN", "RETURN", "THROW", "SET", 
        "TERNARY", "COND", "OBJECT", "TYPE_ARRAY", "ARRAY", "OPTCHAIN_INDEX", 
        "OPTCHAIN", "DOT", "INDEX", "NULLCOAL", "QUASI", "QUOTE", "UNQUOTE_SPLICING", 
        "UNQUOTE", "NEW", "IMPORT", "SWITCH", "CASE", "DEFAULT", "FORIN", 
        "FOROF", "FORAWAIT", "TRY", "CATCH", "FINALLY", "FOR", "CLASS_BODY", 
        "SUPER_METHOD", "ABSTRACT_METHOD", "CLASS", "FIELD", "CONSTRUCTOR", 
        "THIS", "SUPER", "GET", "SETPROP", "IMPLEMENTS", "UNION", "INTERSECT", 
        "TUPLE", "TYPEFN", "LIT", "KEYOF", "TYPEOF", "TYPE_AS", "INFER", 
        "MAPPED", "TYPE_TEMPLATE", "TEMPLATE", "REST", "READONLY", "TYPE_PARAMS", 
        "TYPE_ARGS", "EXTENDS", "RETURNS", "TYPE", "INTERFACE", "ENUM", 
        "MODIFIERS", "OPTIONAL", "BOOLEAN", "NULL", "UNDEFINED", "COLON", 
        "ASYNC_GENERATOR_FN", "ASYNC_LAMBDA", "ASYNC_FN", "GENERATOR_FN", 
        "YIELD_STAR", "YIELD", "AWAIT", "CARET", "PUBLIC", "PRIVATE", "PROTECTED", 
        "STATIC", "ABSTRACT", "OVERRIDE", "ASYNC", "GENERATOR", "ELSE", 
        "LBRACK", "RBRACK", "EXPORT", "EXPORT_DEFAULT", "EXPORT_NAMED", 
        "EXPORT_NS_FROM", "EXPORT_FROM", "EXPORT_ALL_FROM", "IMPORT_TYPE", 
        "EXPORT_TYPE_ALL_FROM", "EXPORT_TYPE_FROM", "EXPORT_TYPE", "NUMBER", 
        "STRING", "MULTILINE_STRING", "NEG_NUMBER", "MINUS", "IDENTIFIER", 
        "WS"
    ];
    public static readonly ruleNames = [
        "program", "topLevel", "decl", "defmacro", "macroTimeFnDef", "macroImport", 
        "macroExport", "macroExportSpec", "topLevelLet", "topLevelConst", 
        "metaAnnotation", "typeAlias", "interfaceDef", "interfaceExtends", 
        "enumDef", "enumMember", "classDef", "anonClassDef", "classExtends", 
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
        "ternary", "condExpr", "condClause", "condElseClause", "newForm", 
        "objectExpr", "objectField", "methodDef", "arrayExpr", "templateExpr", 
        "propKey", "propAccess", "indexAccess", "quasiquote", "quasiForm", 
        "sForm", "unquote", "unquoteSplicing", "optChain", "optChainIndex", 
        "nullCoalesce", "call", "typeArgs", "fnSignature", "param", "restParam", 
        "literal",
    ];

    public get grammarFileName(): string { return "Stage8.g4"; }
    public get literalNames(): (string | null)[] { return Stage8Parser.literalNames; }
    public get symbolicNames(): (string | null)[] { return Stage8Parser.symbolicNames; }
    public get ruleNames(): string[] { return Stage8Parser.ruleNames; }
    public get serializedATN(): number[] { return Stage8Parser._serializedATN; }

    protected createFailedPredicateException(predicate?: string, message?: string): antlr.FailedPredicateException {
        return new antlr.FailedPredicateException(this, predicate, message);
    }

    public constructor(input: antlr.TokenStream) {
        super(input);
        this.interpreter = new antlr.ParserATNSimulator(this, Stage8Parser._ATN, Stage8Parser.decisionsToDFA, new antlr.PredictionContextCache());
    }
    public program(): ProgramContext {
        let localContext = new ProgramContext(this.context, this.state);
        this.enterRule(localContext, 0, Stage8Parser.RULE_program);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 286;
            this.match(Stage8Parser.LPAREN);
            this.state = 287;
            this.match(Stage8Parser.PROGRAM);
            this.state = 291;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 19 || ((((_la - 58)) & ~0x1F) === 0 && ((1 << (_la - 58)) & 1879048195) !== 0) || ((((_la - 119)) & ~0x1F) === 0 && ((1 << (_la - 119)) & 59) !== 0)) {
                {
                {
                this.state = 288;
                this.topLevel();
                }
                }
                this.state = 293;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 294;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 2, Stage8Parser.RULE_topLevel);
        try {
            this.state = 309;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 1, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 296;
                this.defmacro();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 297;
                this.macroTimeFnDef();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 298;
                this.macroImport();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 299;
                this.macroExport();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 300;
                this.topLevelLet();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 301;
                this.topLevelConst();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 302;
                this.fn();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 303;
                this.typeAlias();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 304;
                this.interfaceDef();
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 305;
                this.enumDef();
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 306;
                this.classDef();
                }
                break;
            case 12:
                this.enterOuterAlt(localContext, 12);
                {
                this.state = 307;
                this.exportDeclForm();
                }
                break;
            case 13:
                this.enterOuterAlt(localContext, 13);
                {
                this.state = 308;
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
        this.enterRule(localContext, 4, Stage8Parser.RULE_decl);
        try {
            this.state = 318;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 2, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 311;
                this.topLevelLet();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 312;
                this.topLevelConst();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 313;
                this.fn();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 314;
                this.classDef();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 315;
                this.interfaceDef();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 316;
                this.enumDef();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 317;
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
        this.enterRule(localContext, 6, Stage8Parser.RULE_defmacro);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 320;
            this.match(Stage8Parser.LPAREN);
            this.state = 321;
            this.match(Stage8Parser.DEFMACRO);
            this.state = 322;
            this.match(Stage8Parser.IDENTIFIER);
            this.state = 323;
            this.fnSignature();
            this.state = 327;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 19 || ((((_la - 58)) & ~0x1F) === 0 && ((1 << (_la - 58)) & 1879048195) !== 0) || ((((_la - 119)) & ~0x1F) === 0 && ((1 << (_la - 119)) & 59) !== 0)) {
                {
                {
                this.state = 324;
                this.statement();
                }
                }
                this.state = 329;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 330;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 8, Stage8Parser.RULE_macroTimeFnDef);
        try {
            this.state = 342;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 4, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 332;
                this.match(Stage8Parser.LPAREN);
                this.state = 333;
                this.match(Stage8Parser.MACRO_TIME_ATTR);
                this.state = 334;
                this.topLevelLet();
                this.state = 335;
                this.match(Stage8Parser.RPAREN);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 337;
                this.match(Stage8Parser.LPAREN);
                this.state = 338;
                this.match(Stage8Parser.MACRO_TIME_ATTR);
                this.state = 339;
                this.topLevelConst();
                this.state = 340;
                this.match(Stage8Parser.RPAREN);
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
    public macroImport(): MacroImportContext {
        let localContext = new MacroImportContext(this.context, this.state);
        this.enterRule(localContext, 10, Stage8Parser.RULE_macroImport);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 344;
            this.match(Stage8Parser.LPAREN);
            this.state = 345;
            this.match(Stage8Parser.MACRO_IMPORT);
            this.state = 346;
            this.match(Stage8Parser.IDENTIFIER);
            this.state = 347;
            this.match(Stage8Parser.STRING);
            this.state = 348;
            this.match(Stage8Parser.RPAREN);
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
    public macroExport(): MacroExportContext {
        let localContext = new MacroExportContext(this.context, this.state);
        this.enterRule(localContext, 12, Stage8Parser.RULE_macroExport);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 350;
            this.match(Stage8Parser.LPAREN);
            this.state = 351;
            this.match(Stage8Parser.MACRO_EXPORT);
            this.state = 353;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 352;
                this.macroExportSpec();
                }
                }
                this.state = 355;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 124);
            this.state = 357;
            this.match(Stage8Parser.RPAREN);
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
    public macroExportSpec(): MacroExportSpecContext {
        let localContext = new MacroExportSpecContext(this.context, this.state);
        this.enterRule(localContext, 14, Stage8Parser.RULE_macroExportSpec);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 359;
            this.match(Stage8Parser.IDENTIFIER);
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
        this.enterRule(localContext, 16, Stage8Parser.RULE_topLevelLet);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 361;
            this.match(Stage8Parser.LPAREN);
            this.state = 362;
            this.match(Stage8Parser.LET);
            this.state = 366;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 97) {
                {
                {
                this.state = 363;
                this.metaAnnotation();
                }
                }
                this.state = 368;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 369;
            this.match(Stage8Parser.IDENTIFIER);
            this.state = 370;
            this.expression();
            this.state = 371;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 18, Stage8Parser.RULE_topLevelConst);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 373;
            this.match(Stage8Parser.LPAREN);
            this.state = 374;
            this.match(Stage8Parser.CONST);
            this.state = 378;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 97) {
                {
                {
                this.state = 375;
                this.metaAnnotation();
                }
                }
                this.state = 380;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 381;
            this.match(Stage8Parser.IDENTIFIER);
            this.state = 382;
            this.expression();
            this.state = 383;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 20, Stage8Parser.RULE_metaAnnotation);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 385;
            this.match(Stage8Parser.CARET);
            this.state = 386;
            this.match(Stage8Parser.IDENTIFIER);
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
        this.enterRule(localContext, 22, Stage8Parser.RULE_typeAlias);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 388;
            this.match(Stage8Parser.LPAREN);
            this.state = 389;
            this.match(Stage8Parser.TYPE);
            this.state = 390;
            this.match(Stage8Parser.IDENTIFIER);
            this.state = 392;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 8, this.context) ) {
            case 1:
                {
                this.state = 391;
                this.typeParams();
                }
                break;
            }
            this.state = 394;
            this.typeExpr();
            this.state = 395;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 24, Stage8Parser.RULE_interfaceDef);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 397;
            this.match(Stage8Parser.LPAREN);
            this.state = 398;
            this.match(Stage8Parser.INTERFACE);
            this.state = 399;
            this.match(Stage8Parser.IDENTIFIER);
            this.state = 401;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 9, this.context) ) {
            case 1:
                {
                this.state = 400;
                this.typeParams();
                }
                break;
            }
            this.state = 404;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 10, this.context) ) {
            case 1:
                {
                this.state = 403;
                this.interfaceExtends();
                }
                break;
            }
            this.state = 406;
            this.typeObject();
            this.state = 407;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 26, Stage8Parser.RULE_interfaceExtends);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 409;
            this.match(Stage8Parser.LPAREN);
            this.state = 410;
            this.match(Stage8Parser.EXTENDS);
            this.state = 412;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 411;
                this.typeExpr();
                }
                }
                this.state = 414;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 124);
            this.state = 416;
            this.match(Stage8Parser.RPAREN);
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
    public enumDef(): EnumDefContext {
        let localContext = new EnumDefContext(this.context, this.state);
        this.enterRule(localContext, 28, Stage8Parser.RULE_enumDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 418;
            this.match(Stage8Parser.LPAREN);
            this.state = 419;
            this.match(Stage8Parser.ENUM);
            this.state = 420;
            this.match(Stage8Parser.IDENTIFIER);
            this.state = 424;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 421;
                this.enumMember();
                }
                }
                this.state = 426;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 427;
            this.match(Stage8Parser.RPAREN);
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
    public enumMember(): EnumMemberContext {
        let localContext = new EnumMemberContext(this.context, this.state);
        this.enterRule(localContext, 30, Stage8Parser.RULE_enumMember);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 429;
            this.match(Stage8Parser.LPAREN);
            this.state = 430;
            this.match(Stage8Parser.IDENTIFIER);
            this.state = 432;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (((((_la - 119)) & ~0x1F) === 0 && ((1 << (_la - 119)) & 11) !== 0)) {
                {
                this.state = 431;
                _la = this.tokenStream.LA(1);
                if(!(((((_la - 119)) & ~0x1F) === 0 && ((1 << (_la - 119)) & 11) !== 0))) {
                this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                }
            }

            this.state = 434;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 32, Stage8Parser.RULE_classDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 436;
            this.match(Stage8Parser.LPAREN);
            this.state = 437;
            this.match(Stage8Parser.CLASS);
            this.state = 441;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (((((_la - 76)) & ~0x1F) === 0 && ((1 << (_la - 76)) & 1069547521) !== 0)) {
                {
                {
                this.state = 438;
                this.modifier();
                }
                }
                this.state = 443;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 444;
            this.match(Stage8Parser.IDENTIFIER);
            this.state = 446;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 15, this.context) ) {
            case 1:
                {
                this.state = 445;
                this.typeParams();
                }
                break;
            }
            this.state = 449;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 16, this.context) ) {
            case 1:
                {
                this.state = 448;
                this.classExtends();
                }
                break;
            }
            this.state = 452;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 17, this.context) ) {
            case 1:
                {
                this.state = 451;
                this.classImplements();
                }
                break;
            }
            this.state = 454;
            this.classBody();
            this.state = 455;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 34, Stage8Parser.RULE_anonClassDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 457;
            this.match(Stage8Parser.LPAREN);
            this.state = 458;
            this.match(Stage8Parser.CLASS);
            this.state = 462;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (((((_la - 76)) & ~0x1F) === 0 && ((1 << (_la - 76)) & 1069547521) !== 0)) {
                {
                {
                this.state = 459;
                this.modifier();
                }
                }
                this.state = 464;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 466;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 19, this.context) ) {
            case 1:
                {
                this.state = 465;
                this.classExtends();
                }
                break;
            }
            this.state = 469;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 20, this.context) ) {
            case 1:
                {
                this.state = 468;
                this.classImplements();
                }
                break;
            }
            this.state = 471;
            this.classBody();
            this.state = 472;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 36, Stage8Parser.RULE_classExtends);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 474;
            this.match(Stage8Parser.LPAREN);
            this.state = 475;
            this.match(Stage8Parser.EXTENDS);
            this.state = 476;
            this.typeExpr();
            this.state = 477;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 38, Stage8Parser.RULE_classImplements);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 479;
            this.match(Stage8Parser.LPAREN);
            this.state = 480;
            this.match(Stage8Parser.IMPLEMENTS);
            this.state = 482;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 481;
                this.typeExpr();
                }
                }
                this.state = 484;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 124);
            this.state = 486;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 40, Stage8Parser.RULE_classBody);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 488;
            this.match(Stage8Parser.LPAREN);
            this.state = 489;
            this.match(Stage8Parser.CLASS_BODY);
            this.state = 493;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 490;
                this.classElement();
                }
                }
                this.state = 495;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 496;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 42, Stage8Parser.RULE_classElement);
        try {
            this.state = 504;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 23, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 498;
                this.fieldDef();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 499;
                this.constructorDef();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 500;
                this.classMethodDef();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 501;
                this.abstractMethodDef();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 502;
                this.getterDef();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 503;
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
        this.enterRule(localContext, 44, Stage8Parser.RULE_modifier);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 506;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 76)) & ~0x1F) === 0 && ((1 << (_la - 76)) & 1069547521) !== 0))) {
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
    public fieldDef(): FieldDefContext {
        let localContext = new FieldDefContext(this.context, this.state);
        this.enterRule(localContext, 46, Stage8Parser.RULE_fieldDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 508;
            this.match(Stage8Parser.LPAREN);
            this.state = 509;
            this.match(Stage8Parser.FIELD);
            this.state = 513;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (((((_la - 76)) & ~0x1F) === 0 && ((1 << (_la - 76)) & 1069547521) !== 0)) {
                {
                {
                this.state = 510;
                this.modifier();
                }
                }
                this.state = 515;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 516;
            this.match(Stage8Parser.LPAREN);
            this.state = 517;
            this.match(Stage8Parser.IDENTIFIER);
            this.state = 520;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 89) {
                {
                this.state = 518;
                this.match(Stage8Parser.COLON);
                this.state = 519;
                this.typeExpr();
                }
            }

            this.state = 522;
            this.match(Stage8Parser.RPAREN);
            this.state = 524;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2 || _la === 19 || ((((_la - 58)) & ~0x1F) === 0 && ((1 << (_la - 58)) & 1879048195) !== 0) || ((((_la - 119)) & ~0x1F) === 0 && ((1 << (_la - 119)) & 59) !== 0)) {
                {
                this.state = 523;
                this.expression();
                }
            }

            this.state = 526;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 48, Stage8Parser.RULE_constructorDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 528;
            this.match(Stage8Parser.LPAREN);
            this.state = 529;
            this.match(Stage8Parser.CONSTRUCTOR);
            this.state = 530;
            this.fnSignatureTyped();
            this.state = 534;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 19 || ((((_la - 58)) & ~0x1F) === 0 && ((1 << (_la - 58)) & 1879048195) !== 0) || ((((_la - 119)) & ~0x1F) === 0 && ((1 << (_la - 119)) & 59) !== 0)) {
                {
                {
                this.state = 531;
                this.statement();
                }
                }
                this.state = 536;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 537;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 50, Stage8Parser.RULE_classMethodDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 539;
            this.match(Stage8Parser.LPAREN);
            this.state = 540;
            this.match(Stage8Parser.METHOD);
            this.state = 544;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (((((_la - 76)) & ~0x1F) === 0 && ((1 << (_la - 76)) & 1069547521) !== 0)) {
                {
                {
                this.state = 541;
                this.modifier();
                }
                }
                this.state = 546;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 547;
            this.methodKey();
            this.state = 548;
            this.fnSignatureTyped();
            this.state = 552;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 19 || ((((_la - 58)) & ~0x1F) === 0 && ((1 << (_la - 58)) & 1879048195) !== 0) || ((((_la - 119)) & ~0x1F) === 0 && ((1 << (_la - 119)) & 59) !== 0)) {
                {
                {
                this.state = 549;
                this.statement();
                }
                }
                this.state = 554;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 555;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 52, Stage8Parser.RULE_abstractMethodDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 557;
            this.match(Stage8Parser.LPAREN);
            this.state = 558;
            this.match(Stage8Parser.ABSTRACT_METHOD);
            this.state = 562;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (((((_la - 76)) & ~0x1F) === 0 && ((1 << (_la - 76)) & 1069547521) !== 0)) {
                {
                {
                this.state = 559;
                this.modifier();
                }
                }
                this.state = 564;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 565;
            this.methodKey();
            this.state = 566;
            this.fnSignatureTyped();
            this.state = 567;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 54, Stage8Parser.RULE_getterDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 569;
            this.match(Stage8Parser.LPAREN);
            this.state = 570;
            this.match(Stage8Parser.GET);
            this.state = 574;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (((((_la - 76)) & ~0x1F) === 0 && ((1 << (_la - 76)) & 1069547521) !== 0)) {
                {
                {
                this.state = 571;
                this.modifier();
                }
                }
                this.state = 576;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 577;
            this.methodKey();
            this.state = 578;
            this.fnSignatureTyped();
            this.state = 582;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 19 || ((((_la - 58)) & ~0x1F) === 0 && ((1 << (_la - 58)) & 1879048195) !== 0) || ((((_la - 119)) & ~0x1F) === 0 && ((1 << (_la - 119)) & 59) !== 0)) {
                {
                {
                this.state = 579;
                this.statement();
                }
                }
                this.state = 584;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 585;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 56, Stage8Parser.RULE_setterDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 587;
            this.match(Stage8Parser.LPAREN);
            this.state = 588;
            this.match(Stage8Parser.SETPROP);
            this.state = 592;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (((((_la - 76)) & ~0x1F) === 0 && ((1 << (_la - 76)) & 1069547521) !== 0)) {
                {
                {
                this.state = 589;
                this.modifier();
                }
                }
                this.state = 594;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 595;
            this.methodKey();
            this.state = 596;
            this.fnSignatureTyped();
            this.state = 600;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 19 || ((((_la - 58)) & ~0x1F) === 0 && ((1 << (_la - 58)) & 1879048195) !== 0) || ((((_la - 119)) & ~0x1F) === 0 && ((1 << (_la - 119)) & 59) !== 0)) {
                {
                {
                this.state = 597;
                this.statement();
                }
                }
                this.state = 602;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 603;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 58, Stage8Parser.RULE_methodKey);
        try {
            this.state = 612;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case Stage8Parser.IDENTIFIER:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 605;
                this.match(Stage8Parser.IDENTIFIER);
                }
                break;
            case Stage8Parser.GET:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 606;
                this.match(Stage8Parser.GET);
                }
                break;
            case Stage8Parser.SETPROP:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 607;
                this.match(Stage8Parser.SETPROP);
                }
                break;
            case Stage8Parser.LBRACK:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 608;
                this.match(Stage8Parser.LBRACK);
                this.state = 609;
                this.expression();
                this.state = 610;
                this.match(Stage8Parser.RBRACK);
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
        this.enterRule(localContext, 60, Stage8Parser.RULE_typedParam);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 614;
            this.match(Stage8Parser.LPAREN);
            this.state = 615;
            this.match(Stage8Parser.IDENTIFIER);
            this.state = 617;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 85) {
                {
                this.state = 616;
                this.match(Stage8Parser.OPTIONAL);
                }
            }

            this.state = 621;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 89) {
                {
                this.state = 619;
                this.match(Stage8Parser.COLON);
                this.state = 620;
                this.typeExpr();
                }
            }

            this.state = 623;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 62, Stage8Parser.RULE_fnSignatureTyped);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 625;
            this.match(Stage8Parser.LPAREN);
            this.state = 636;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2) {
                {
                this.state = 626;
                this.typedParam();
                this.state = 633;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 2 || _la === 4) {
                    {
                    {
                    this.state = 628;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    if (_la === 4) {
                        {
                        this.state = 627;
                        this.match(Stage8Parser.COMMA);
                        }
                    }

                    this.state = 630;
                    this.typedParam();
                    }
                    }
                    this.state = 635;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
            }

            this.state = 638;
            this.match(Stage8Parser.RPAREN);
            this.state = 644;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 41, this.context) ) {
            case 1:
                {
                this.state = 639;
                this.match(Stage8Parser.LPAREN);
                this.state = 640;
                this.match(Stage8Parser.RETURNS);
                this.state = 641;
                this.typeExpr();
                this.state = 642;
                this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 64, Stage8Parser.RULE_statement);
        try {
            this.state = 666;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 42, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 646;
                this.letStar();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 647;
                this.letStmt();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 648;
                this.constStar();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 649;
                this.constStmt();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 650;
                this.ifForm();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 651;
                this.whileForm();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 652;
                this.tryForm();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 653;
                this.block();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 654;
                this.returnForm();
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 655;
                this.throwForm();
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 656;
                this.importForm();
                }
                break;
            case 12:
                this.enterOuterAlt(localContext, 12);
                {
                this.state = 657;
                this.importTypeForm();
                }
                break;
            case 13:
                this.enterOuterAlt(localContext, 13);
                {
                this.state = 658;
                this.exportForm();
                }
                break;
            case 14:
                this.enterOuterAlt(localContext, 14);
                {
                this.state = 659;
                this.switchForm();
                }
                break;
            case 15:
                this.enterOuterAlt(localContext, 15);
                {
                this.state = 660;
                this.forForm();
                }
                break;
            case 16:
                this.enterOuterAlt(localContext, 16);
                {
                this.state = 661;
                this.forInForm();
                }
                break;
            case 17:
                this.enterOuterAlt(localContext, 17);
                {
                this.state = 662;
                this.forOfForm();
                }
                break;
            case 18:
                this.enterOuterAlt(localContext, 18);
                {
                this.state = 663;
                this.forAwaitForm();
                }
                break;
            case 19:
                this.enterOuterAlt(localContext, 19);
                {
                this.state = 664;
                this.assign();
                }
                break;
            case 20:
                this.enterOuterAlt(localContext, 20);
                {
                this.state = 665;
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
        this.enterRule(localContext, 66, Stage8Parser.RULE_letStar);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 668;
            this.match(Stage8Parser.LPAREN);
            this.state = 669;
            this.match(Stage8Parser.LETSTAR);
            this.state = 670;
            this.match(Stage8Parser.LPAREN);
            this.state = 674;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 671;
                this.starBinding();
                }
                }
                this.state = 676;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 677;
            this.match(Stage8Parser.RPAREN);
            this.state = 681;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 19 || ((((_la - 58)) & ~0x1F) === 0 && ((1 << (_la - 58)) & 1879048195) !== 0) || ((((_la - 119)) & ~0x1F) === 0 && ((1 << (_la - 119)) & 59) !== 0)) {
                {
                {
                this.state = 678;
                this.statement();
                }
                }
                this.state = 683;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 684;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 68, Stage8Parser.RULE_letStmt);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 686;
            this.match(Stage8Parser.LPAREN);
            this.state = 687;
            this.match(Stage8Parser.LET);
            this.state = 688;
            this.singleBinding();
            this.state = 689;
            this.expression();
            this.state = 690;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 70, Stage8Parser.RULE_constStar);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 692;
            this.match(Stage8Parser.LPAREN);
            this.state = 693;
            this.match(Stage8Parser.CONSTSTAR);
            this.state = 694;
            this.match(Stage8Parser.LPAREN);
            this.state = 698;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 695;
                this.starBinding();
                }
                }
                this.state = 700;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 701;
            this.match(Stage8Parser.RPAREN);
            this.state = 705;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 19 || ((((_la - 58)) & ~0x1F) === 0 && ((1 << (_la - 58)) & 1879048195) !== 0) || ((((_la - 119)) & ~0x1F) === 0 && ((1 << (_la - 119)) & 59) !== 0)) {
                {
                {
                this.state = 702;
                this.statement();
                }
                }
                this.state = 707;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 708;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 72, Stage8Parser.RULE_constStmt);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 710;
            this.match(Stage8Parser.LPAREN);
            this.state = 711;
            this.match(Stage8Parser.CONST);
            this.state = 712;
            this.singleBinding();
            this.state = 713;
            this.expression();
            this.state = 714;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 74, Stage8Parser.RULE_ifForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 716;
            this.match(Stage8Parser.LPAREN);
            this.state = 717;
            this.match(Stage8Parser.IF);
            this.state = 718;
            this.expression();
            this.state = 719;
            this.statement();
            this.state = 721;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2 || _la === 19 || ((((_la - 58)) & ~0x1F) === 0 && ((1 << (_la - 58)) & 1879048195) !== 0) || ((((_la - 119)) & ~0x1F) === 0 && ((1 << (_la - 119)) & 59) !== 0)) {
                {
                this.state = 720;
                this.statement();
                }
            }

            this.state = 723;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 76, Stage8Parser.RULE_whileForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 725;
            this.match(Stage8Parser.LPAREN);
            this.state = 726;
            this.match(Stage8Parser.WHILE);
            this.state = 727;
            this.expression();
            this.state = 731;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 19 || ((((_la - 58)) & ~0x1F) === 0 && ((1 << (_la - 58)) & 1879048195) !== 0) || ((((_la - 119)) & ~0x1F) === 0 && ((1 << (_la - 119)) & 59) !== 0)) {
                {
                {
                this.state = 728;
                this.statement();
                }
                }
                this.state = 733;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 734;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 78, Stage8Parser.RULE_block);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 736;
            this.match(Stage8Parser.LPAREN);
            this.state = 737;
            this.match(Stage8Parser.BEGIN);
            this.state = 741;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 19 || ((((_la - 58)) & ~0x1F) === 0 && ((1 << (_la - 58)) & 1879048195) !== 0) || ((((_la - 119)) & ~0x1F) === 0 && ((1 << (_la - 119)) & 59) !== 0)) {
                {
                {
                this.state = 738;
                this.statement();
                }
                }
                this.state = 743;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 744;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 80, Stage8Parser.RULE_returnForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 746;
            this.match(Stage8Parser.LPAREN);
            this.state = 747;
            this.match(Stage8Parser.RETURN);
            this.state = 749;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2 || _la === 19 || ((((_la - 58)) & ~0x1F) === 0 && ((1 << (_la - 58)) & 1879048195) !== 0) || ((((_la - 119)) & ~0x1F) === 0 && ((1 << (_la - 119)) & 59) !== 0)) {
                {
                this.state = 748;
                this.expression();
                }
            }

            this.state = 751;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 82, Stage8Parser.RULE_throwForm);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 753;
            this.match(Stage8Parser.LPAREN);
            this.state = 754;
            this.match(Stage8Parser.THROW);
            this.state = 755;
            this.expression();
            this.state = 756;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 84, Stage8Parser.RULE_importForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 758;
            this.match(Stage8Parser.LPAREN);
            this.state = 759;
            this.match(Stage8Parser.IMPORT);
            this.state = 761;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2) {
                {
                this.state = 760;
                this.objectExpr();
                }
            }

            this.state = 763;
            this.match(Stage8Parser.STRING);
            this.state = 764;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 86, Stage8Parser.RULE_importTypeForm);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 766;
            this.match(Stage8Parser.LPAREN);
            this.state = 767;
            this.match(Stage8Parser.IMPORT_TYPE);
            this.state = 768;
            this.importTypeSpec();
            this.state = 769;
            this.match(Stage8Parser.STRING);
            this.state = 770;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 88, Stage8Parser.RULE_importTypeSpec);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 772;
            this.match(Stage8Parser.LPAREN);
            this.state = 773;
            this.match(Stage8Parser.IDENTIFIER);
            this.state = 775;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 774;
                this.importTypeName();
                }
                }
                this.state = 777;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 124);
            this.state = 779;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 90, Stage8Parser.RULE_importTypeName);
        try {
            this.state = 786;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case Stage8Parser.IDENTIFIER:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 781;
                this.match(Stage8Parser.IDENTIFIER);
                }
                break;
            case Stage8Parser.LPAREN:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 782;
                this.match(Stage8Parser.LPAREN);
                this.state = 783;
                this.match(Stage8Parser.IDENTIFIER);
                this.state = 784;
                this.match(Stage8Parser.IDENTIFIER);
                this.state = 785;
                this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 92, Stage8Parser.RULE_exportForm);
        try {
            this.state = 797;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 54, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 788;
                this.exportBinding();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 789;
                this.exportDefault();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 790;
                this.exportNamed();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 791;
                this.exportNsFromForm();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 792;
                this.exportFrom();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 793;
                this.exportAllFrom();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 794;
                this.exportTypeForm();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 795;
                this.exportTypeFromForm();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 796;
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
        this.enterRule(localContext, 94, Stage8Parser.RULE_exportBinding);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 799;
            this.match(Stage8Parser.LPAREN);
            this.state = 800;
            this.match(Stage8Parser.EXPORT);
            this.state = 801;
            this.match(Stage8Parser.IDENTIFIER);
            this.state = 802;
            this.expression();
            this.state = 803;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 96, Stage8Parser.RULE_exportDefault);
        try {
            this.state = 830;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 55, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 805;
                this.match(Stage8Parser.LPAREN);
                this.state = 806;
                this.match(Stage8Parser.EXPORT_DEFAULT);
                this.state = 807;
                this.classDef();
                this.state = 808;
                this.match(Stage8Parser.RPAREN);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 810;
                this.match(Stage8Parser.LPAREN);
                this.state = 811;
                this.match(Stage8Parser.EXPORT_DEFAULT);
                this.state = 812;
                this.anonClassDef();
                this.state = 813;
                this.match(Stage8Parser.RPAREN);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 815;
                this.match(Stage8Parser.LPAREN);
                this.state = 816;
                this.match(Stage8Parser.EXPORT_DEFAULT);
                this.state = 817;
                this.topLevelLet();
                this.state = 818;
                this.match(Stage8Parser.RPAREN);
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 820;
                this.match(Stage8Parser.LPAREN);
                this.state = 821;
                this.match(Stage8Parser.EXPORT_DEFAULT);
                this.state = 822;
                this.topLevelConst();
                this.state = 823;
                this.match(Stage8Parser.RPAREN);
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 825;
                this.match(Stage8Parser.LPAREN);
                this.state = 826;
                this.match(Stage8Parser.EXPORT_DEFAULT);
                this.state = 827;
                this.expression();
                this.state = 828;
                this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 98, Stage8Parser.RULE_exportNamed);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 832;
            this.match(Stage8Parser.LPAREN);
            this.state = 833;
            this.match(Stage8Parser.EXPORT_NAMED);
            this.state = 835;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 834;
                this.exportNamePair();
                }
                }
                this.state = 837;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2);
            this.state = 839;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 100, Stage8Parser.RULE_exportNamePair);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 841;
            this.match(Stage8Parser.LPAREN);
            this.state = 842;
            this.match(Stage8Parser.IDENTIFIER);
            this.state = 844;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 124) {
                {
                this.state = 843;
                this.match(Stage8Parser.IDENTIFIER);
                }
            }

            this.state = 846;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 102, Stage8Parser.RULE_exportFrom);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 848;
            this.match(Stage8Parser.LPAREN);
            this.state = 849;
            this.match(Stage8Parser.EXPORT_FROM);
            this.state = 850;
            this.match(Stage8Parser.STRING);
            this.state = 852;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 851;
                this.exportNamePair();
                }
                }
                this.state = 854;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2);
            this.state = 856;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 104, Stage8Parser.RULE_exportAllFrom);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 858;
            this.match(Stage8Parser.LPAREN);
            this.state = 859;
            this.match(Stage8Parser.EXPORT_ALL_FROM);
            this.state = 860;
            this.match(Stage8Parser.STRING);
            this.state = 861;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 106, Stage8Parser.RULE_exportNsFromForm);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 863;
            this.match(Stage8Parser.LPAREN);
            this.state = 864;
            this.match(Stage8Parser.EXPORT_NS_FROM);
            this.state = 865;
            this.match(Stage8Parser.STRING);
            this.state = 866;
            this.match(Stage8Parser.STRING);
            this.state = 867;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 108, Stage8Parser.RULE_exportTypeForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 869;
            this.match(Stage8Parser.LPAREN);
            this.state = 870;
            this.match(Stage8Parser.EXPORT_TYPE);
            this.state = 872;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 871;
                this.exportNamePair();
                }
                }
                this.state = 874;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2);
            this.state = 876;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 110, Stage8Parser.RULE_exportTypeFromForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 878;
            this.match(Stage8Parser.LPAREN);
            this.state = 879;
            this.match(Stage8Parser.EXPORT_TYPE_FROM);
            this.state = 880;
            this.match(Stage8Parser.STRING);
            this.state = 882;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 881;
                this.exportNamePair();
                }
                }
                this.state = 884;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2);
            this.state = 886;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 112, Stage8Parser.RULE_exportTypeAllFromForm);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 888;
            this.match(Stage8Parser.LPAREN);
            this.state = 889;
            this.match(Stage8Parser.EXPORT_TYPE_ALL_FROM);
            this.state = 890;
            this.match(Stage8Parser.STRING);
            this.state = 891;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 114, Stage8Parser.RULE_exportDeclForm);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 893;
            this.match(Stage8Parser.LPAREN);
            this.state = 894;
            this.match(Stage8Parser.EXPORT);
            this.state = 895;
            this.decl();
            this.state = 896;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 116, Stage8Parser.RULE_starBinding);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 898;
            this.match(Stage8Parser.LPAREN);
            this.state = 899;
            this.match(Stage8Parser.IDENTIFIER);
            this.state = 902;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 89) {
                {
                this.state = 900;
                this.match(Stage8Parser.COLON);
                this.state = 901;
                this.typeExpr();
                }
            }

            this.state = 904;
            this.expression();
            this.state = 905;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 118, Stage8Parser.RULE_singleBinding);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 907;
            this.match(Stage8Parser.LPAREN);
            this.state = 908;
            this.match(Stage8Parser.IDENTIFIER);
            this.state = 911;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 89) {
                {
                this.state = 909;
                this.match(Stage8Parser.COLON);
                this.state = 910;
                this.typeExpr();
                }
            }

            this.state = 913;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 120, Stage8Parser.RULE_typeExpr);
        try {
            this.state = 931;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 63, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 915;
                this.match(Stage8Parser.IDENTIFIER);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 916;
                this.typeUnion();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 917;
                this.typeIntersection();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 918;
                this.typeArray();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 919;
                this.typeTuple();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 920;
                this.typeFunction();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 921;
                this.typeObject();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 922;
                this.typeLiteral();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 923;
                this.typeKeyof();
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 924;
                this.typeTypeof();
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 925;
                this.typeIndexAccess();
                }
                break;
            case 12:
                this.enterOuterAlt(localContext, 12);
                {
                this.state = 926;
                this.typeConditional();
                }
                break;
            case 13:
                this.enterOuterAlt(localContext, 13);
                {
                this.state = 927;
                this.typeInfer();
                }
                break;
            case 14:
                this.enterOuterAlt(localContext, 14);
                {
                this.state = 928;
                this.typeMapped();
                }
                break;
            case 15:
                this.enterOuterAlt(localContext, 15);
                {
                this.state = 929;
                this.typeTemplateLiteral();
                }
                break;
            case 16:
                this.enterOuterAlt(localContext, 16);
                {
                this.state = 930;
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
        this.enterRule(localContext, 122, Stage8Parser.RULE_typeUnion);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 933;
            this.match(Stage8Parser.LPAREN);
            this.state = 934;
            this.match(Stage8Parser.UNION);
            this.state = 936;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 935;
                this.typeExpr();
                }
                }
                this.state = 938;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 124);
            this.state = 940;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 124, Stage8Parser.RULE_typeIntersection);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 942;
            this.match(Stage8Parser.LPAREN);
            this.state = 943;
            this.match(Stage8Parser.INTERSECT);
            this.state = 945;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 944;
                this.typeExpr();
                }
                }
                this.state = 947;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 124);
            this.state = 949;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 126, Stage8Parser.RULE_typeArray);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 951;
            this.match(Stage8Parser.LPAREN);
            this.state = 952;
            this.match(Stage8Parser.TYPE_ARRAY);
            this.state = 953;
            this.typeExpr();
            this.state = 954;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 128, Stage8Parser.RULE_typeTuple);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 956;
            this.match(Stage8Parser.LPAREN);
            this.state = 957;
            this.match(Stage8Parser.TUPLE);
            this.state = 959;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 958;
                this.typeTupleElement();
                }
                }
                this.state = 961;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 124);
            this.state = 963;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 130, Stage8Parser.RULE_typeTupleElement);
        try {
            this.state = 976;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 67, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 965;
                this.match(Stage8Parser.LPAREN);
                this.state = 966;
                this.match(Stage8Parser.REST);
                this.state = 967;
                this.typeExpr();
                this.state = 968;
                this.match(Stage8Parser.RPAREN);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 970;
                this.match(Stage8Parser.LPAREN);
                this.state = 971;
                this.match(Stage8Parser.IDENTIFIER);
                this.state = 972;
                this.typeExpr();
                this.state = 973;
                this.match(Stage8Parser.RPAREN);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 975;
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
        this.enterRule(localContext, 132, Stage8Parser.RULE_typeFunction);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 978;
            this.match(Stage8Parser.LPAREN);
            this.state = 979;
            this.match(Stage8Parser.TYPEFN);
            this.state = 981;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 68, this.context) ) {
            case 1:
                {
                this.state = 980;
                this.typeParams();
                }
                break;
            }
            this.state = 983;
            this.match(Stage8Parser.LPAREN);
            this.state = 987;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 984;
                this.typeFnParam();
                }
                }
                this.state = 989;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 990;
            this.match(Stage8Parser.RPAREN);
            this.state = 991;
            this.typeExpr();
            this.state = 992;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 134, Stage8Parser.RULE_typeFnParam);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 994;
            this.match(Stage8Parser.LPAREN);
            this.state = 995;
            this.match(Stage8Parser.IDENTIFIER);
            this.state = 997;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 85) {
                {
                this.state = 996;
                this.match(Stage8Parser.OPTIONAL);
                }
            }

            this.state = 999;
            this.typeExpr();
            this.state = 1000;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 136, Stage8Parser.RULE_typeObject);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1002;
            this.match(Stage8Parser.LPAREN);
            this.state = 1003;
            this.match(Stage8Parser.IDENTIFIER);
            this.state = 1007;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 1004;
                this.typeProp();
                }
                }
                this.state = 1009;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1010;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 138, Stage8Parser.RULE_typeProp);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1012;
            this.match(Stage8Parser.LPAREN);
            this.state = 1016;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 76) {
                {
                {
                this.state = 1013;
                this.propModifier();
                }
                }
                this.state = 1018;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1019;
            this.match(Stage8Parser.IDENTIFIER);
            this.state = 1021;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 85) {
                {
                this.state = 1020;
                this.match(Stage8Parser.OPTIONAL);
                }
            }

            this.state = 1023;
            this.typeExpr();
            this.state = 1024;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 140, Stage8Parser.RULE_propModifier);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1026;
            this.match(Stage8Parser.READONLY);
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
        this.enterRule(localContext, 142, Stage8Parser.RULE_typeLiteral);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1028;
            this.match(Stage8Parser.LPAREN);
            this.state = 1029;
            this.match(Stage8Parser.LIT);
            this.state = 1030;
            _la = this.tokenStream.LA(1);
            if(!(_la === 86 || _la === 119 || _la === 120)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 1031;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 144, Stage8Parser.RULE_typeKeyof);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1033;
            this.match(Stage8Parser.LPAREN);
            this.state = 1034;
            this.match(Stage8Parser.KEYOF);
            this.state = 1035;
            this.typeExpr();
            this.state = 1036;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 146, Stage8Parser.RULE_typeTypeof);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1038;
            this.match(Stage8Parser.LPAREN);
            this.state = 1039;
            this.match(Stage8Parser.TYPEOF);
            this.state = 1040;
            this.match(Stage8Parser.IDENTIFIER);
            this.state = 1041;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 148, Stage8Parser.RULE_typeIndexAccess);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1043;
            this.match(Stage8Parser.LPAREN);
            this.state = 1044;
            this.match(Stage8Parser.INDEX);
            this.state = 1045;
            this.typeExpr();
            this.state = 1046;
            this.typeExpr();
            this.state = 1047;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 150, Stage8Parser.RULE_typeConditional);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1049;
            this.match(Stage8Parser.LPAREN);
            this.state = 1050;
            this.match(Stage8Parser.COND);
            this.state = 1051;
            this.typeExpr();
            this.state = 1052;
            this.typeExpr();
            this.state = 1053;
            this.typeExpr();
            this.state = 1054;
            this.typeExpr();
            this.state = 1055;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 152, Stage8Parser.RULE_typeInfer);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1057;
            this.match(Stage8Parser.LPAREN);
            this.state = 1058;
            this.match(Stage8Parser.INFER);
            this.state = 1059;
            this.match(Stage8Parser.IDENTIFIER);
            this.state = 1060;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 154, Stage8Parser.RULE_typeMapped);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1062;
            this.match(Stage8Parser.LPAREN);
            this.state = 1063;
            this.match(Stage8Parser.MAPPED);
            this.state = 1064;
            this.match(Stage8Parser.IDENTIFIER);
            this.state = 1065;
            this.typeExpr();
            this.state = 1067;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 74, this.context) ) {
            case 1:
                {
                this.state = 1066;
                this.mappedModifiers();
                }
                break;
            }
            this.state = 1069;
            this.typeExpr();
            this.state = 1070;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 156, Stage8Parser.RULE_mappedModifiers);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1072;
            this.match(Stage8Parser.LPAREN);
            this.state = 1073;
            this.match(Stage8Parser.MODIFIERS);
            this.state = 1075;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 1074;
                this.mappedModifier();
                }
                }
                this.state = 1077;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 76 || _la === 85);
            this.state = 1079;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 158, Stage8Parser.RULE_mappedModifier);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1081;
            _la = this.tokenStream.LA(1);
            if(!(_la === 76 || _la === 85)) {
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
        this.enterRule(localContext, 160, Stage8Parser.RULE_typeTemplateLiteral);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1083;
            this.match(Stage8Parser.LPAREN);
            this.state = 1084;
            this.match(Stage8Parser.TYPE_TEMPLATE);
            this.state = 1086;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 1085;
                this.templatePart();
                }
                }
                this.state = 1088;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 120 || _la === 124);
            this.state = 1090;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 162, Stage8Parser.RULE_templatePart);
        try {
            this.state = 1094;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case Stage8Parser.STRING:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1092;
                this.match(Stage8Parser.STRING);
                }
                break;
            case Stage8Parser.LPAREN:
            case Stage8Parser.IDENTIFIER:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1093;
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
        this.enterRule(localContext, 164, Stage8Parser.RULE_typeApplication);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1096;
            this.match(Stage8Parser.LPAREN);
            this.state = 1097;
            this.typeExpr();
            this.state = 1099;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 1098;
                this.typeExpr();
                }
                }
                this.state = 1101;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 124);
            this.state = 1103;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 166, Stage8Parser.RULE_typeParams);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1105;
            this.match(Stage8Parser.LPAREN);
            this.state = 1106;
            this.match(Stage8Parser.TYPE_PARAMS);
            this.state = 1108;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 1107;
                this.typeParamDecl();
                }
                }
                this.state = 1110;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2);
            this.state = 1112;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 168, Stage8Parser.RULE_typeParamDecl);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1114;
            this.match(Stage8Parser.LPAREN);
            this.state = 1115;
            this.match(Stage8Parser.IDENTIFIER);
            this.state = 1117;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 80, this.context) ) {
            case 1:
                {
                this.state = 1116;
                this.typeParamConstraint();
                }
                break;
            }
            this.state = 1120;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2) {
                {
                this.state = 1119;
                this.typeParamDefault();
                }
            }

            this.state = 1122;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 170, Stage8Parser.RULE_typeParamConstraint);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1124;
            this.match(Stage8Parser.LPAREN);
            this.state = 1125;
            this.match(Stage8Parser.EXTENDS);
            this.state = 1126;
            this.typeExpr();
            this.state = 1127;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 172, Stage8Parser.RULE_typeParamDefault);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1129;
            this.match(Stage8Parser.LPAREN);
            this.state = 1130;
            this.match(Stage8Parser.DEFAULT);
            this.state = 1131;
            this.typeExpr();
            this.state = 1132;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 174, Stage8Parser.RULE_assign);
        try {
            this.state = 1146;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 82, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1134;
                this.match(Stage8Parser.LPAREN);
                this.state = 1135;
                this.match(Stage8Parser.SET);
                this.state = 1136;
                this.match(Stage8Parser.IDENTIFIER);
                this.state = 1137;
                this.expression();
                this.state = 1138;
                this.match(Stage8Parser.RPAREN);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1140;
                this.match(Stage8Parser.LPAREN);
                this.state = 1141;
                this.match(Stage8Parser.SET);
                this.state = 1142;
                this.propAccess();
                this.state = 1143;
                this.expression();
                this.state = 1144;
                this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 176, Stage8Parser.RULE_switchForm);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1148;
            this.match(Stage8Parser.LPAREN);
            this.state = 1149;
            this.match(Stage8Parser.SWITCH);
            this.state = 1150;
            this.expression();
            this.state = 1154;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 83, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 1151;
                    this.caseClause();
                    }
                    }
                }
                this.state = 1156;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 83, this.context);
            }
            this.state = 1158;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2) {
                {
                this.state = 1157;
                this.defaultClause();
                }
            }

            this.state = 1160;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 178, Stage8Parser.RULE_caseClause);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1162;
            this.match(Stage8Parser.LPAREN);
            this.state = 1163;
            this.match(Stage8Parser.CASE);
            this.state = 1164;
            this.expression();
            this.state = 1168;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 19 || ((((_la - 58)) & ~0x1F) === 0 && ((1 << (_la - 58)) & 1879048195) !== 0) || ((((_la - 119)) & ~0x1F) === 0 && ((1 << (_la - 119)) & 59) !== 0)) {
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
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 180, Stage8Parser.RULE_defaultClause);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1173;
            this.match(Stage8Parser.LPAREN);
            this.state = 1174;
            this.match(Stage8Parser.DEFAULT);
            this.state = 1178;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 19 || ((((_la - 58)) & ~0x1F) === 0 && ((1 << (_la - 58)) & 1879048195) !== 0) || ((((_la - 119)) & ~0x1F) === 0 && ((1 << (_la - 119)) & 59) !== 0)) {
                {
                {
                this.state = 1175;
                this.statement();
                }
                }
                this.state = 1180;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1181;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 182, Stage8Parser.RULE_forForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1183;
            this.match(Stage8Parser.LPAREN);
            this.state = 1184;
            this.match(Stage8Parser.FOR);
            this.state = 1185;
            this.letStmt();
            this.state = 1186;
            this.expression();
            this.state = 1187;
            this.assign();
            this.state = 1191;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 19 || ((((_la - 58)) & ~0x1F) === 0 && ((1 << (_la - 58)) & 1879048195) !== 0) || ((((_la - 119)) & ~0x1F) === 0 && ((1 << (_la - 119)) & 59) !== 0)) {
                {
                {
                this.state = 1188;
                this.statement();
                }
                }
                this.state = 1193;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1194;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 184, Stage8Parser.RULE_forInForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1196;
            this.match(Stage8Parser.LPAREN);
            this.state = 1197;
            this.match(Stage8Parser.FORIN);
            this.state = 1198;
            this.match(Stage8Parser.IDENTIFIER);
            this.state = 1199;
            this.expression();
            this.state = 1203;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 19 || ((((_la - 58)) & ~0x1F) === 0 && ((1 << (_la - 58)) & 1879048195) !== 0) || ((((_la - 119)) & ~0x1F) === 0 && ((1 << (_la - 119)) & 59) !== 0)) {
                {
                {
                this.state = 1200;
                this.statement();
                }
                }
                this.state = 1205;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1206;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 186, Stage8Parser.RULE_forOfForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1208;
            this.match(Stage8Parser.LPAREN);
            this.state = 1209;
            this.match(Stage8Parser.FOROF);
            this.state = 1210;
            this.match(Stage8Parser.IDENTIFIER);
            this.state = 1211;
            this.expression();
            this.state = 1215;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 19 || ((((_la - 58)) & ~0x1F) === 0 && ((1 << (_la - 58)) & 1879048195) !== 0) || ((((_la - 119)) & ~0x1F) === 0 && ((1 << (_la - 119)) & 59) !== 0)) {
                {
                {
                this.state = 1212;
                this.statement();
                }
                }
                this.state = 1217;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1218;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 188, Stage8Parser.RULE_forAwaitForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1220;
            this.match(Stage8Parser.LPAREN);
            this.state = 1221;
            this.match(Stage8Parser.FORAWAIT);
            this.state = 1222;
            this.match(Stage8Parser.IDENTIFIER);
            this.state = 1223;
            this.expression();
            this.state = 1227;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 19 || ((((_la - 58)) & ~0x1F) === 0 && ((1 << (_la - 58)) & 1879048195) !== 0) || ((((_la - 119)) & ~0x1F) === 0 && ((1 << (_la - 119)) & 59) !== 0)) {
                {
                {
                this.state = 1224;
                this.statement();
                }
                }
                this.state = 1229;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1230;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 190, Stage8Parser.RULE_tryForm);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1232;
            this.match(Stage8Parser.LPAREN);
            this.state = 1233;
            this.match(Stage8Parser.TRY);
            this.state = 1237;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 91, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 1234;
                    this.statement();
                    }
                    }
                }
                this.state = 1239;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 91, this.context);
            }
            this.state = 1245;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 93, this.context) ) {
            case 1:
                {
                this.state = 1240;
                this.catchClause();
                this.state = 1242;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 2) {
                    {
                    this.state = 1241;
                    this.finallyClause();
                    }
                }

                }
                break;
            case 2:
                {
                this.state = 1244;
                this.finallyClause();
                }
                break;
            }
            this.state = 1247;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 192, Stage8Parser.RULE_catchClause);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1249;
            this.match(Stage8Parser.LPAREN);
            this.state = 1250;
            this.match(Stage8Parser.CATCH);
            this.state = 1251;
            this.match(Stage8Parser.IDENTIFIER);
            this.state = 1255;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 19 || ((((_la - 58)) & ~0x1F) === 0 && ((1 << (_la - 58)) & 1879048195) !== 0) || ((((_la - 119)) & ~0x1F) === 0 && ((1 << (_la - 119)) & 59) !== 0)) {
                {
                {
                this.state = 1252;
                this.statement();
                }
                }
                this.state = 1257;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1258;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 194, Stage8Parser.RULE_finallyClause);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1260;
            this.match(Stage8Parser.LPAREN);
            this.state = 1261;
            this.match(Stage8Parser.FINALLY);
            this.state = 1265;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 19 || ((((_la - 58)) & ~0x1F) === 0 && ((1 << (_la - 58)) & 1879048195) !== 0) || ((((_la - 119)) & ~0x1F) === 0 && ((1 << (_la - 119)) & 59) !== 0)) {
                {
                {
                this.state = 1262;
                this.statement();
                }
                }
                this.state = 1267;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1268;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 196, Stage8Parser.RULE_expression);
        try {
            this.state = 1306;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 96, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1270;
                this.literal();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1271;
                this.match(Stage8Parser.IDENTIFIER);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 1272;
                this.match(Stage8Parser.MACRO_ERROR);
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 1273;
                this.match(Stage8Parser.MINUS);
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 1274;
                this.lambda();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 1275;
                this.fn();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 1276;
                this.asyncLambda();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 1277;
                this.asyncFn();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 1278;
                this.generatorFn();
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 1279;
                this.asyncGeneratorFn();
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 1280;
                this.awaitExpr();
                }
                break;
            case 12:
                this.enterOuterAlt(localContext, 12);
                {
                this.state = 1281;
                this.yieldExpr();
                }
                break;
            case 13:
                this.enterOuterAlt(localContext, 13);
                {
                this.state = 1282;
                this.yieldStarExpr();
                }
                break;
            case 14:
                this.enterOuterAlt(localContext, 14);
                {
                this.state = 1283;
                this.bindExpr();
                }
                break;
            case 15:
                this.enterOuterAlt(localContext, 15);
                {
                this.state = 1284;
                this.methodCallExpr();
                }
                break;
            case 16:
                this.enterOuterAlt(localContext, 16);
                {
                this.state = 1285;
                this.objectExpr();
                }
                break;
            case 17:
                this.enterOuterAlt(localContext, 17);
                {
                this.state = 1286;
                this.arrayExpr();
                }
                break;
            case 18:
                this.enterOuterAlt(localContext, 18);
                {
                this.state = 1287;
                this.propAccess();
                }
                break;
            case 19:
                this.enterOuterAlt(localContext, 19);
                {
                this.state = 1288;
                this.indexAccess();
                }
                break;
            case 20:
                this.enterOuterAlt(localContext, 20);
                {
                this.state = 1289;
                this.quasiquote();
                }
                break;
            case 21:
                this.enterOuterAlt(localContext, 21);
                {
                this.state = 1290;
                this.unquote();
                }
                break;
            case 22:
                this.enterOuterAlt(localContext, 22);
                {
                this.state = 1291;
                this.unquoteSplicing();
                }
                break;
            case 23:
                this.enterOuterAlt(localContext, 23);
                {
                this.state = 1292;
                this.ternary();
                }
                break;
            case 24:
                this.enterOuterAlt(localContext, 24);
                {
                this.state = 1293;
                this.condExpr();
                }
                break;
            case 25:
                this.enterOuterAlt(localContext, 25);
                {
                this.state = 1294;
                this.newForm();
                }
                break;
            case 26:
                this.enterOuterAlt(localContext, 26);
                {
                this.state = 1295;
                this.optChain();
                }
                break;
            case 27:
                this.enterOuterAlt(localContext, 27);
                {
                this.state = 1296;
                this.optChainIndex();
                }
                break;
            case 28:
                this.enterOuterAlt(localContext, 28);
                {
                this.state = 1297;
                this.nullCoalesce();
                }
                break;
            case 29:
                this.enterOuterAlt(localContext, 29);
                {
                this.state = 1298;
                this.typeofExpr();
                }
                break;
            case 30:
                this.enterOuterAlt(localContext, 30);
                {
                this.state = 1299;
                this.typeAssert();
                }
                break;
            case 31:
                this.enterOuterAlt(localContext, 31);
                {
                this.state = 1300;
                this.templateExpr();
                }
                break;
            case 32:
                this.enterOuterAlt(localContext, 32);
                {
                this.state = 1301;
                this.thisExpr();
                }
                break;
            case 33:
                this.enterOuterAlt(localContext, 33);
                {
                this.state = 1302;
                this.superExpr();
                }
                break;
            case 34:
                this.enterOuterAlt(localContext, 34);
                {
                this.state = 1303;
                this.superConstructorCall();
                }
                break;
            case 35:
                this.enterOuterAlt(localContext, 35);
                {
                this.state = 1304;
                this.superMethodCall();
                }
                break;
            case 36:
                this.enterOuterAlt(localContext, 36);
                {
                this.state = 1305;
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
        this.enterRule(localContext, 198, Stage8Parser.RULE_thisExpr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1308;
            this.match(Stage8Parser.THIS);
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
        this.enterRule(localContext, 200, Stage8Parser.RULE_superExpr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1310;
            this.match(Stage8Parser.SUPER);
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
        this.enterRule(localContext, 202, Stage8Parser.RULE_superConstructorCall);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1312;
            this.match(Stage8Parser.LPAREN);
            this.state = 1313;
            this.match(Stage8Parser.SUPER);
            this.state = 1317;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 19 || ((((_la - 58)) & ~0x1F) === 0 && ((1 << (_la - 58)) & 1879048195) !== 0) || ((((_la - 119)) & ~0x1F) === 0 && ((1 << (_la - 119)) & 59) !== 0)) {
                {
                {
                this.state = 1314;
                this.expression();
                }
                }
                this.state = 1319;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1320;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 204, Stage8Parser.RULE_superMethodCall);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1322;
            this.match(Stage8Parser.LPAREN);
            this.state = 1323;
            this.match(Stage8Parser.SUPER_METHOD);
            this.state = 1324;
            this.match(Stage8Parser.IDENTIFIER);
            this.state = 1328;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 19 || ((((_la - 58)) & ~0x1F) === 0 && ((1 << (_la - 58)) & 1879048195) !== 0) || ((((_la - 119)) & ~0x1F) === 0 && ((1 << (_la - 119)) & 59) !== 0)) {
                {
                {
                this.state = 1325;
                this.expression();
                }
                }
                this.state = 1330;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1331;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 206, Stage8Parser.RULE_typeofExpr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1333;
            this.match(Stage8Parser.LPAREN);
            this.state = 1334;
            this.match(Stage8Parser.TYPEOF);
            this.state = 1335;
            this.expression();
            this.state = 1336;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 208, Stage8Parser.RULE_typeAssert);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1338;
            this.match(Stage8Parser.LPAREN);
            this.state = 1339;
            this.match(Stage8Parser.TYPE_AS);
            this.state = 1340;
            this.expression();
            this.state = 1341;
            this.typeExpr();
            this.state = 1342;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 210, Stage8Parser.RULE_lambda);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1344;
            this.match(Stage8Parser.LPAREN);
            this.state = 1345;
            this.match(Stage8Parser.LAMBDA);
            this.state = 1346;
            this.fnSignature();
            this.state = 1350;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 19 || ((((_la - 58)) & ~0x1F) === 0 && ((1 << (_la - 58)) & 1879048195) !== 0) || ((((_la - 119)) & ~0x1F) === 0 && ((1 << (_la - 119)) & 59) !== 0)) {
                {
                {
                this.state = 1347;
                this.statement();
                }
                }
                this.state = 1352;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1353;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 212, Stage8Parser.RULE_fn);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1355;
            this.match(Stage8Parser.LPAREN);
            this.state = 1356;
            this.match(Stage8Parser.FN);
            this.state = 1358;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 124) {
                {
                this.state = 1357;
                this.match(Stage8Parser.IDENTIFIER);
                }
            }

            this.state = 1360;
            this.fnSignature();
            this.state = 1364;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 19 || ((((_la - 58)) & ~0x1F) === 0 && ((1 << (_la - 58)) & 1879048195) !== 0) || ((((_la - 119)) & ~0x1F) === 0 && ((1 << (_la - 119)) & 59) !== 0)) {
                {
                {
                this.state = 1361;
                this.statement();
                }
                }
                this.state = 1366;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1367;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 214, Stage8Parser.RULE_asyncLambda);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1369;
            this.match(Stage8Parser.LPAREN);
            this.state = 1370;
            this.match(Stage8Parser.ASYNC_LAMBDA);
            this.state = 1371;
            this.fnSignature();
            this.state = 1375;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 19 || ((((_la - 58)) & ~0x1F) === 0 && ((1 << (_la - 58)) & 1879048195) !== 0) || ((((_la - 119)) & ~0x1F) === 0 && ((1 << (_la - 119)) & 59) !== 0)) {
                {
                {
                this.state = 1372;
                this.statement();
                }
                }
                this.state = 1377;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1378;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 216, Stage8Parser.RULE_asyncFn);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1380;
            this.match(Stage8Parser.LPAREN);
            this.state = 1381;
            this.match(Stage8Parser.ASYNC_FN);
            this.state = 1382;
            this.fnSignature();
            this.state = 1386;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 19 || ((((_la - 58)) & ~0x1F) === 0 && ((1 << (_la - 58)) & 1879048195) !== 0) || ((((_la - 119)) & ~0x1F) === 0 && ((1 << (_la - 119)) & 59) !== 0)) {
                {
                {
                this.state = 1383;
                this.statement();
                }
                }
                this.state = 1388;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1389;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 218, Stage8Parser.RULE_generatorFn);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1391;
            this.match(Stage8Parser.LPAREN);
            this.state = 1392;
            this.match(Stage8Parser.GENERATOR_FN);
            this.state = 1393;
            this.fnSignature();
            this.state = 1397;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 19 || ((((_la - 58)) & ~0x1F) === 0 && ((1 << (_la - 58)) & 1879048195) !== 0) || ((((_la - 119)) & ~0x1F) === 0 && ((1 << (_la - 119)) & 59) !== 0)) {
                {
                {
                this.state = 1394;
                this.statement();
                }
                }
                this.state = 1399;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1400;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 220, Stage8Parser.RULE_asyncGeneratorFn);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1402;
            this.match(Stage8Parser.LPAREN);
            this.state = 1403;
            this.match(Stage8Parser.ASYNC_GENERATOR_FN);
            this.state = 1404;
            this.fnSignature();
            this.state = 1408;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 19 || ((((_la - 58)) & ~0x1F) === 0 && ((1 << (_la - 58)) & 1879048195) !== 0) || ((((_la - 119)) & ~0x1F) === 0 && ((1 << (_la - 119)) & 59) !== 0)) {
                {
                {
                this.state = 1405;
                this.statement();
                }
                }
                this.state = 1410;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1411;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 222, Stage8Parser.RULE_awaitExpr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1413;
            this.match(Stage8Parser.LPAREN);
            this.state = 1414;
            this.match(Stage8Parser.AWAIT);
            this.state = 1415;
            this.expression();
            this.state = 1416;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 224, Stage8Parser.RULE_yieldExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1418;
            this.match(Stage8Parser.LPAREN);
            this.state = 1419;
            this.match(Stage8Parser.YIELD);
            this.state = 1421;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2 || _la === 19 || ((((_la - 58)) & ~0x1F) === 0 && ((1 << (_la - 58)) & 1879048195) !== 0) || ((((_la - 119)) & ~0x1F) === 0 && ((1 << (_la - 119)) & 59) !== 0)) {
                {
                this.state = 1420;
                this.expression();
                }
            }

            this.state = 1423;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 226, Stage8Parser.RULE_yieldStarExpr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1425;
            this.match(Stage8Parser.LPAREN);
            this.state = 1426;
            this.match(Stage8Parser.YIELD_STAR);
            this.state = 1427;
            this.expression();
            this.state = 1428;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 228, Stage8Parser.RULE_bindExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1430;
            this.match(Stage8Parser.LPAREN);
            this.state = 1431;
            this.match(Stage8Parser.BIND);
            this.state = 1432;
            this.expression();
            this.state = 1433;
            this.expression();
            this.state = 1437;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 19 || ((((_la - 58)) & ~0x1F) === 0 && ((1 << (_la - 58)) & 1879048195) !== 0) || ((((_la - 119)) & ~0x1F) === 0 && ((1 << (_la - 119)) & 59) !== 0)) {
                {
                {
                this.state = 1434;
                this.expression();
                }
                }
                this.state = 1439;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1440;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 230, Stage8Parser.RULE_methodCallExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1442;
            this.match(Stage8Parser.LPAREN);
            this.state = 1443;
            this.match(Stage8Parser.METHOD_CALL);
            this.state = 1444;
            this.expression();
            this.state = 1445;
            this.expression();
            this.state = 1449;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 19 || ((((_la - 58)) & ~0x1F) === 0 && ((1 << (_la - 58)) & 1879048195) !== 0) || ((((_la - 119)) & ~0x1F) === 0 && ((1 << (_la - 119)) & 59) !== 0)) {
                {
                {
                this.state = 1446;
                this.expression();
                }
                }
                this.state = 1451;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1452;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 232, Stage8Parser.RULE_ternary);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1454;
            this.match(Stage8Parser.LPAREN);
            this.state = 1455;
            this.match(Stage8Parser.TERNARY);
            this.state = 1456;
            this.expression();
            this.state = 1457;
            this.expression();
            this.state = 1458;
            this.expression();
            this.state = 1459;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 234, Stage8Parser.RULE_condExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1461;
            this.match(Stage8Parser.LPAREN);
            this.state = 1462;
            this.match(Stage8Parser.COND);
            this.state = 1464;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 1463;
                this.condClause();
                }
                }
                this.state = 1466;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 19 || ((((_la - 58)) & ~0x1F) === 0 && ((1 << (_la - 58)) & 1879048195) !== 0) || ((((_la - 119)) & ~0x1F) === 0 && ((1 << (_la - 119)) & 59) !== 0));
            this.state = 1469;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 106) {
                {
                this.state = 1468;
                this.condElseClause();
                }
            }

            this.state = 1471;
            this.match(Stage8Parser.RPAREN);
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
    public condClause(): CondClauseContext {
        let localContext = new CondClauseContext(this.context, this.state);
        this.enterRule(localContext, 236, Stage8Parser.RULE_condClause);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1473;
            this.expression();
            this.state = 1474;
            this.expression();
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
    public condElseClause(): CondElseClauseContext {
        let localContext = new CondElseClauseContext(this.context, this.state);
        this.enterRule(localContext, 238, Stage8Parser.RULE_condElseClause);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1476;
            this.match(Stage8Parser.ELSE);
            this.state = 1477;
            this.expression();
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
        this.enterRule(localContext, 240, Stage8Parser.RULE_newForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1479;
            this.match(Stage8Parser.LPAREN);
            this.state = 1480;
            this.match(Stage8Parser.NEW);
            this.state = 1481;
            this.match(Stage8Parser.IDENTIFIER);
            this.state = 1483;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 111, this.context) ) {
            case 1:
                {
                this.state = 1482;
                this.typeArgs();
                }
                break;
            }
            this.state = 1488;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 19 || ((((_la - 58)) & ~0x1F) === 0 && ((1 << (_la - 58)) & 1879048195) !== 0) || ((((_la - 119)) & ~0x1F) === 0 && ((1 << (_la - 119)) & 59) !== 0)) {
                {
                {
                this.state = 1485;
                this.expression();
                }
                }
                this.state = 1490;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1491;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 242, Stage8Parser.RULE_objectExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1493;
            this.match(Stage8Parser.LPAREN);
            this.state = 1494;
            this.match(Stage8Parser.OBJECT);
            this.state = 1498;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 1495;
                this.objectField();
                }
                }
                this.state = 1500;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1501;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 244, Stage8Parser.RULE_objectField);
        try {
            this.state = 1516;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 114, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1503;
                this.match(Stage8Parser.LPAREN);
                this.state = 1504;
                this.propKey();
                this.state = 1505;
                this.expression();
                this.state = 1506;
                this.match(Stage8Parser.RPAREN);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1508;
                this.match(Stage8Parser.LPAREN);
                this.state = 1509;
                this.propKey();
                this.state = 1510;
                this.methodDef();
                this.state = 1511;
                this.match(Stage8Parser.RPAREN);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 1513;
                this.match(Stage8Parser.LPAREN);
                this.state = 1514;
                this.match(Stage8Parser.IDENTIFIER);
                this.state = 1515;
                this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 246, Stage8Parser.RULE_methodDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1518;
            this.match(Stage8Parser.LPAREN);
            this.state = 1519;
            this.match(Stage8Parser.METHOD);
            this.state = 1520;
            this.fnSignature();
            this.state = 1524;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 19 || ((((_la - 58)) & ~0x1F) === 0 && ((1 << (_la - 58)) & 1879048195) !== 0) || ((((_la - 119)) & ~0x1F) === 0 && ((1 << (_la - 119)) & 59) !== 0)) {
                {
                {
                this.state = 1521;
                this.statement();
                }
                }
                this.state = 1526;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1527;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 248, Stage8Parser.RULE_arrayExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1529;
            this.match(Stage8Parser.LPAREN);
            this.state = 1530;
            this.match(Stage8Parser.ARRAY);
            this.state = 1534;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 19 || ((((_la - 58)) & ~0x1F) === 0 && ((1 << (_la - 58)) & 1879048195) !== 0) || ((((_la - 119)) & ~0x1F) === 0 && ((1 << (_la - 119)) & 59) !== 0)) {
                {
                {
                this.state = 1531;
                this.expression();
                }
                }
                this.state = 1536;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1537;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 250, Stage8Parser.RULE_templateExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1539;
            this.match(Stage8Parser.LPAREN);
            this.state = 1540;
            this.match(Stage8Parser.TEMPLATE);
            this.state = 1543;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                this.state = 1543;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 117, this.context) ) {
                case 1:
                    {
                    this.state = 1541;
                    this.match(Stage8Parser.STRING);
                    }
                    break;
                case 2:
                    {
                    this.state = 1542;
                    this.expression();
                    }
                    break;
                }
                }
                this.state = 1545;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 19 || ((((_la - 58)) & ~0x1F) === 0 && ((1 << (_la - 58)) & 1879048195) !== 0) || ((((_la - 119)) & ~0x1F) === 0 && ((1 << (_la - 119)) & 59) !== 0));
            this.state = 1547;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 252, Stage8Parser.RULE_propKey);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1549;
            _la = this.tokenStream.LA(1);
            if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 2147483616) !== 0) || ((((_la - 34)) & ~0x1F) === 0 && ((1 << (_la - 34)) & 4294967293) !== 0) || ((((_la - 66)) & ~0x1F) === 0 && ((1 << (_la - 66)) & 4286054399) !== 0) || ((((_la - 98)) & ~0x1F) === 0 && ((1 << (_la - 98)) & 75495935) !== 0))) {
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
        this.enterRule(localContext, 254, Stage8Parser.RULE_propAccess);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1551;
            this.match(Stage8Parser.LPAREN);
            this.state = 1552;
            this.match(Stage8Parser.DOT);
            this.state = 1553;
            this.expression();
            this.state = 1554;
            this.propKey();
            this.state = 1555;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 256, Stage8Parser.RULE_indexAccess);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1557;
            this.match(Stage8Parser.LPAREN);
            this.state = 1558;
            this.match(Stage8Parser.INDEX);
            this.state = 1559;
            this.expression();
            this.state = 1560;
            this.expression();
            this.state = 1561;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 258, Stage8Parser.RULE_quasiquote);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1563;
            this.match(Stage8Parser.LPAREN);
            this.state = 1564;
            _la = this.tokenStream.LA(1);
            if(!(_la === 36 || _la === 37)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 1565;
            this.quasiForm();
            this.state = 1566;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 260, Stage8Parser.RULE_quasiForm);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1568;
            this.sForm();
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
    public sForm(): SFormContext {
        let localContext = new SFormContext(this.context, this.state);
        this.enterRule(localContext, 262, Stage8Parser.RULE_sForm);
        let _la: number;
        try {
            this.state = 1589;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 120, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1570;
                this.match(Stage8Parser.LPAREN);
                this.state = 1571;
                this.match(Stage8Parser.UNQUOTE);
                this.state = 1572;
                this.expression();
                this.state = 1573;
                this.match(Stage8Parser.RPAREN);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1575;
                this.match(Stage8Parser.LPAREN);
                this.state = 1576;
                this.match(Stage8Parser.UNQUOTE_SPLICING);
                this.state = 1577;
                this.expression();
                this.state = 1578;
                this.match(Stage8Parser.RPAREN);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 1580;
                this.match(Stage8Parser.LPAREN);
                this.state = 1584;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4294967286) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 4294967295) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 4294967295) !== 0) || ((((_la - 96)) & ~0x1F) === 0 && ((1 << (_la - 96)) & 1073741823) !== 0)) {
                    {
                    {
                    this.state = 1581;
                    this.sForm();
                    }
                    }
                    this.state = 1586;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 1587;
                this.match(Stage8Parser.RPAREN);
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 1588;
                _la = this.tokenStream.LA(1);
                if(_la<=0 || _la === 2 || _la === 3) {
                this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
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
    public unquote(): UnquoteContext {
        let localContext = new UnquoteContext(this.context, this.state);
        this.enterRule(localContext, 264, Stage8Parser.RULE_unquote);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1591;
            this.match(Stage8Parser.LPAREN);
            this.state = 1592;
            this.match(Stage8Parser.UNQUOTE);
            this.state = 1593;
            this.expression();
            this.state = 1594;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 266, Stage8Parser.RULE_unquoteSplicing);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1596;
            this.match(Stage8Parser.LPAREN);
            this.state = 1597;
            this.match(Stage8Parser.UNQUOTE_SPLICING);
            this.state = 1598;
            this.expression();
            this.state = 1599;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 268, Stage8Parser.RULE_optChain);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1601;
            this.match(Stage8Parser.LPAREN);
            this.state = 1602;
            this.match(Stage8Parser.OPTCHAIN);
            this.state = 1603;
            this.expression();
            this.state = 1604;
            this.propKey();
            this.state = 1605;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 270, Stage8Parser.RULE_optChainIndex);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1607;
            this.match(Stage8Parser.LPAREN);
            this.state = 1608;
            this.match(Stage8Parser.OPTCHAIN_INDEX);
            this.state = 1609;
            this.expression();
            this.state = 1610;
            this.expression();
            this.state = 1611;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 272, Stage8Parser.RULE_nullCoalesce);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1613;
            this.match(Stage8Parser.LPAREN);
            this.state = 1614;
            this.match(Stage8Parser.NULLCOAL);
            this.state = 1615;
            this.expression();
            this.state = 1616;
            this.expression();
            this.state = 1617;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 274, Stage8Parser.RULE_call);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1619;
            this.match(Stage8Parser.LPAREN);
            this.state = 1620;
            this.expression();
            this.state = 1622;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 121, this.context) ) {
            case 1:
                {
                this.state = 1621;
                this.typeArgs();
                }
                break;
            }
            this.state = 1627;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 19 || ((((_la - 58)) & ~0x1F) === 0 && ((1 << (_la - 58)) & 1879048195) !== 0) || ((((_la - 119)) & ~0x1F) === 0 && ((1 << (_la - 119)) & 59) !== 0)) {
                {
                {
                this.state = 1624;
                this.expression();
                }
                }
                this.state = 1629;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1630;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 276, Stage8Parser.RULE_typeArgs);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1632;
            this.match(Stage8Parser.LPAREN);
            this.state = 1633;
            this.match(Stage8Parser.TYPE_ARGS);
            this.state = 1635;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 1634;
                this.typeExpr();
                }
                }
                this.state = 1637;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 124);
            this.state = 1639;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 278, Stage8Parser.RULE_fnSignature);
        let _la: number;
        try {
            let alternative: number;
            this.state = 1672;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 131, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1641;
                this.match(Stage8Parser.LPAREN);
                this.state = 1658;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 2) {
                    {
                    this.state = 1642;
                    this.param();
                    this.state = 1649;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 125, this.context);
                    while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                        if (alternative === 1) {
                            {
                            {
                            this.state = 1644;
                            this.errorHandler.sync(this);
                            _la = this.tokenStream.LA(1);
                            if (_la === 4) {
                                {
                                this.state = 1643;
                                this.match(Stage8Parser.COMMA);
                                }
                            }

                            this.state = 1646;
                            this.param();
                            }
                            }
                        }
                        this.state = 1651;
                        this.errorHandler.sync(this);
                        alternative = this.interpreter.adaptivePredict(this.tokenStream, 125, this.context);
                    }
                    this.state = 1656;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    if (_la === 2 || _la === 4) {
                        {
                        this.state = 1653;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                        if (_la === 4) {
                            {
                            this.state = 1652;
                            this.match(Stage8Parser.COMMA);
                            }
                        }

                        this.state = 1655;
                        this.restParam();
                        }
                    }

                    }
                }

                this.state = 1660;
                this.match(Stage8Parser.RPAREN);
                this.state = 1663;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 89) {
                    {
                    this.state = 1661;
                    this.match(Stage8Parser.COLON);
                    this.state = 1662;
                    this.typeExpr();
                    }
                }

                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1665;
                this.match(Stage8Parser.LPAREN);
                this.state = 1666;
                this.restParam();
                this.state = 1667;
                this.match(Stage8Parser.RPAREN);
                this.state = 1670;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 89) {
                    {
                    this.state = 1668;
                    this.match(Stage8Parser.COLON);
                    this.state = 1669;
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
        this.enterRule(localContext, 280, Stage8Parser.RULE_param);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1674;
            this.match(Stage8Parser.LPAREN);
            this.state = 1675;
            this.match(Stage8Parser.IDENTIFIER);
            this.state = 1678;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 89) {
                {
                this.state = 1676;
                this.match(Stage8Parser.COLON);
                this.state = 1677;
                this.typeExpr();
                }
            }

            this.state = 1680;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 282, Stage8Parser.RULE_restParam);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1682;
            this.match(Stage8Parser.LPAREN);
            this.state = 1683;
            this.match(Stage8Parser.REST);
            this.state = 1684;
            this.match(Stage8Parser.IDENTIFIER);
            this.state = 1687;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 89) {
                {
                this.state = 1685;
                this.match(Stage8Parser.COLON);
                this.state = 1686;
                this.typeExpr();
                }
            }

            this.state = 1689;
            this.match(Stage8Parser.RPAREN);
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
        this.enterRule(localContext, 284, Stage8Parser.RULE_literal);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1691;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 86)) & ~0x1F) === 0 && ((1 << (_la - 86)) & 7) !== 0) || ((((_la - 119)) & ~0x1F) === 0 && ((1 << (_la - 119)) & 11) !== 0))) {
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
        4,1,125,1694,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,
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
        7,131,2,132,7,132,2,133,7,133,2,134,7,134,2,135,7,135,2,136,7,136,
        2,137,7,137,2,138,7,138,2,139,7,139,2,140,7,140,2,141,7,141,2,142,
        7,142,1,0,1,0,1,0,5,0,290,8,0,10,0,12,0,293,9,0,1,0,1,0,1,1,1,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,1,310,8,1,1,2,1,2,
        1,2,1,2,1,2,1,2,1,2,3,2,319,8,2,1,3,1,3,1,3,1,3,1,3,5,3,326,8,3,
        10,3,12,3,329,9,3,1,3,1,3,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,
        4,3,4,343,8,4,1,5,1,5,1,5,1,5,1,5,1,5,1,6,1,6,1,6,4,6,354,8,6,11,
        6,12,6,355,1,6,1,6,1,7,1,7,1,8,1,8,1,8,5,8,365,8,8,10,8,12,8,368,
        9,8,1,8,1,8,1,8,1,8,1,9,1,9,1,9,5,9,377,8,9,10,9,12,9,380,9,9,1,
        9,1,9,1,9,1,9,1,10,1,10,1,10,1,11,1,11,1,11,1,11,3,11,393,8,11,1,
        11,1,11,1,11,1,12,1,12,1,12,1,12,3,12,402,8,12,1,12,3,12,405,8,12,
        1,12,1,12,1,12,1,13,1,13,1,13,4,13,413,8,13,11,13,12,13,414,1,13,
        1,13,1,14,1,14,1,14,1,14,5,14,423,8,14,10,14,12,14,426,9,14,1,14,
        1,14,1,15,1,15,1,15,3,15,433,8,15,1,15,1,15,1,16,1,16,1,16,5,16,
        440,8,16,10,16,12,16,443,9,16,1,16,1,16,3,16,447,8,16,1,16,3,16,
        450,8,16,1,16,3,16,453,8,16,1,16,1,16,1,16,1,17,1,17,1,17,5,17,461,
        8,17,10,17,12,17,464,9,17,1,17,3,17,467,8,17,1,17,3,17,470,8,17,
        1,17,1,17,1,17,1,18,1,18,1,18,1,18,1,18,1,19,1,19,1,19,4,19,483,
        8,19,11,19,12,19,484,1,19,1,19,1,20,1,20,1,20,5,20,492,8,20,10,20,
        12,20,495,9,20,1,20,1,20,1,21,1,21,1,21,1,21,1,21,1,21,3,21,505,
        8,21,1,22,1,22,1,23,1,23,1,23,5,23,512,8,23,10,23,12,23,515,9,23,
        1,23,1,23,1,23,1,23,3,23,521,8,23,1,23,1,23,3,23,525,8,23,1,23,1,
        23,1,24,1,24,1,24,1,24,5,24,533,8,24,10,24,12,24,536,9,24,1,24,1,
        24,1,25,1,25,1,25,5,25,543,8,25,10,25,12,25,546,9,25,1,25,1,25,1,
        25,5,25,551,8,25,10,25,12,25,554,9,25,1,25,1,25,1,26,1,26,1,26,5,
        26,561,8,26,10,26,12,26,564,9,26,1,26,1,26,1,26,1,26,1,27,1,27,1,
        27,5,27,573,8,27,10,27,12,27,576,9,27,1,27,1,27,1,27,5,27,581,8,
        27,10,27,12,27,584,9,27,1,27,1,27,1,28,1,28,1,28,5,28,591,8,28,10,
        28,12,28,594,9,28,1,28,1,28,1,28,5,28,599,8,28,10,28,12,28,602,9,
        28,1,28,1,28,1,29,1,29,1,29,1,29,1,29,1,29,1,29,3,29,613,8,29,1,
        30,1,30,1,30,3,30,618,8,30,1,30,1,30,3,30,622,8,30,1,30,1,30,1,31,
        1,31,1,31,3,31,629,8,31,1,31,5,31,632,8,31,10,31,12,31,635,9,31,
        3,31,637,8,31,1,31,1,31,1,31,1,31,1,31,1,31,3,31,645,8,31,1,32,1,
        32,1,32,1,32,1,32,1,32,1,32,1,32,1,32,1,32,1,32,1,32,1,32,1,32,1,
        32,1,32,1,32,1,32,1,32,1,32,3,32,667,8,32,1,33,1,33,1,33,1,33,5,
        33,673,8,33,10,33,12,33,676,9,33,1,33,1,33,5,33,680,8,33,10,33,12,
        33,683,9,33,1,33,1,33,1,34,1,34,1,34,1,34,1,34,1,34,1,35,1,35,1,
        35,1,35,5,35,697,8,35,10,35,12,35,700,9,35,1,35,1,35,5,35,704,8,
        35,10,35,12,35,707,9,35,1,35,1,35,1,36,1,36,1,36,1,36,1,36,1,36,
        1,37,1,37,1,37,1,37,1,37,3,37,722,8,37,1,37,1,37,1,38,1,38,1,38,
        1,38,5,38,730,8,38,10,38,12,38,733,9,38,1,38,1,38,1,39,1,39,1,39,
        5,39,740,8,39,10,39,12,39,743,9,39,1,39,1,39,1,40,1,40,1,40,3,40,
        750,8,40,1,40,1,40,1,41,1,41,1,41,1,41,1,41,1,42,1,42,1,42,3,42,
        762,8,42,1,42,1,42,1,42,1,43,1,43,1,43,1,43,1,43,1,43,1,44,1,44,
        1,44,4,44,776,8,44,11,44,12,44,777,1,44,1,44,1,45,1,45,1,45,1,45,
        1,45,3,45,787,8,45,1,46,1,46,1,46,1,46,1,46,1,46,1,46,1,46,1,46,
        3,46,798,8,46,1,47,1,47,1,47,1,47,1,47,1,47,1,48,1,48,1,48,1,48,
        1,48,1,48,1,48,1,48,1,48,1,48,1,48,1,48,1,48,1,48,1,48,1,48,1,48,
        1,48,1,48,1,48,1,48,1,48,1,48,1,48,1,48,3,48,831,8,48,1,49,1,49,
        1,49,4,49,836,8,49,11,49,12,49,837,1,49,1,49,1,50,1,50,1,50,3,50,
        845,8,50,1,50,1,50,1,51,1,51,1,51,1,51,4,51,853,8,51,11,51,12,51,
        854,1,51,1,51,1,52,1,52,1,52,1,52,1,52,1,53,1,53,1,53,1,53,1,53,
        1,53,1,54,1,54,1,54,4,54,873,8,54,11,54,12,54,874,1,54,1,54,1,55,
        1,55,1,55,1,55,4,55,883,8,55,11,55,12,55,884,1,55,1,55,1,56,1,56,
        1,56,1,56,1,56,1,57,1,57,1,57,1,57,1,57,1,58,1,58,1,58,1,58,3,58,
        903,8,58,1,58,1,58,1,58,1,59,1,59,1,59,1,59,3,59,912,8,59,1,59,1,
        59,1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,
        60,1,60,1,60,1,60,3,60,932,8,60,1,61,1,61,1,61,4,61,937,8,61,11,
        61,12,61,938,1,61,1,61,1,62,1,62,1,62,4,62,946,8,62,11,62,12,62,
        947,1,62,1,62,1,63,1,63,1,63,1,63,1,63,1,64,1,64,1,64,4,64,960,8,
        64,11,64,12,64,961,1,64,1,64,1,65,1,65,1,65,1,65,1,65,1,65,1,65,
        1,65,1,65,1,65,1,65,3,65,977,8,65,1,66,1,66,1,66,3,66,982,8,66,1,
        66,1,66,5,66,986,8,66,10,66,12,66,989,9,66,1,66,1,66,1,66,1,66,1,
        67,1,67,1,67,3,67,998,8,67,1,67,1,67,1,67,1,68,1,68,1,68,5,68,1006,
        8,68,10,68,12,68,1009,9,68,1,68,1,68,1,69,1,69,5,69,1015,8,69,10,
        69,12,69,1018,9,69,1,69,1,69,3,69,1022,8,69,1,69,1,69,1,69,1,70,
        1,70,1,71,1,71,1,71,1,71,1,71,1,72,1,72,1,72,1,72,1,72,1,73,1,73,
        1,73,1,73,1,73,1,74,1,74,1,74,1,74,1,74,1,74,1,75,1,75,1,75,1,75,
        1,75,1,75,1,75,1,75,1,76,1,76,1,76,1,76,1,76,1,77,1,77,1,77,1,77,
        1,77,3,77,1068,8,77,1,77,1,77,1,77,1,78,1,78,1,78,4,78,1076,8,78,
        11,78,12,78,1077,1,78,1,78,1,79,1,79,1,80,1,80,1,80,4,80,1087,8,
        80,11,80,12,80,1088,1,80,1,80,1,81,1,81,3,81,1095,8,81,1,82,1,82,
        1,82,4,82,1100,8,82,11,82,12,82,1101,1,82,1,82,1,83,1,83,1,83,4,
        83,1109,8,83,11,83,12,83,1110,1,83,1,83,1,84,1,84,1,84,3,84,1118,
        8,84,1,84,3,84,1121,8,84,1,84,1,84,1,85,1,85,1,85,1,85,1,85,1,86,
        1,86,1,86,1,86,1,86,1,87,1,87,1,87,1,87,1,87,1,87,1,87,1,87,1,87,
        1,87,1,87,1,87,3,87,1147,8,87,1,88,1,88,1,88,1,88,5,88,1153,8,88,
        10,88,12,88,1156,9,88,1,88,3,88,1159,8,88,1,88,1,88,1,89,1,89,1,
        89,1,89,5,89,1167,8,89,10,89,12,89,1170,9,89,1,89,1,89,1,90,1,90,
        1,90,5,90,1177,8,90,10,90,12,90,1180,9,90,1,90,1,90,1,91,1,91,1,
        91,1,91,1,91,1,91,5,91,1190,8,91,10,91,12,91,1193,9,91,1,91,1,91,
        1,92,1,92,1,92,1,92,1,92,5,92,1202,8,92,10,92,12,92,1205,9,92,1,
        92,1,92,1,93,1,93,1,93,1,93,1,93,5,93,1214,8,93,10,93,12,93,1217,
        9,93,1,93,1,93,1,94,1,94,1,94,1,94,1,94,5,94,1226,8,94,10,94,12,
        94,1229,9,94,1,94,1,94,1,95,1,95,1,95,5,95,1236,8,95,10,95,12,95,
        1239,9,95,1,95,1,95,3,95,1243,8,95,1,95,3,95,1246,8,95,1,95,1,95,
        1,96,1,96,1,96,1,96,5,96,1254,8,96,10,96,12,96,1257,9,96,1,96,1,
        96,1,97,1,97,1,97,5,97,1264,8,97,10,97,12,97,1267,9,97,1,97,1,97,
        1,98,1,98,1,98,1,98,1,98,1,98,1,98,1,98,1,98,1,98,1,98,1,98,1,98,
        1,98,1,98,1,98,1,98,1,98,1,98,1,98,1,98,1,98,1,98,1,98,1,98,1,98,
        1,98,1,98,1,98,1,98,1,98,1,98,1,98,1,98,1,98,1,98,3,98,1307,8,98,
        1,99,1,99,1,100,1,100,1,101,1,101,1,101,5,101,1316,8,101,10,101,
        12,101,1319,9,101,1,101,1,101,1,102,1,102,1,102,1,102,5,102,1327,
        8,102,10,102,12,102,1330,9,102,1,102,1,102,1,103,1,103,1,103,1,103,
        1,103,1,104,1,104,1,104,1,104,1,104,1,104,1,105,1,105,1,105,1,105,
        5,105,1349,8,105,10,105,12,105,1352,9,105,1,105,1,105,1,106,1,106,
        1,106,3,106,1359,8,106,1,106,1,106,5,106,1363,8,106,10,106,12,106,
        1366,9,106,1,106,1,106,1,107,1,107,1,107,1,107,5,107,1374,8,107,
        10,107,12,107,1377,9,107,1,107,1,107,1,108,1,108,1,108,1,108,5,108,
        1385,8,108,10,108,12,108,1388,9,108,1,108,1,108,1,109,1,109,1,109,
        1,109,5,109,1396,8,109,10,109,12,109,1399,9,109,1,109,1,109,1,110,
        1,110,1,110,1,110,5,110,1407,8,110,10,110,12,110,1410,9,110,1,110,
        1,110,1,111,1,111,1,111,1,111,1,111,1,112,1,112,1,112,3,112,1422,
        8,112,1,112,1,112,1,113,1,113,1,113,1,113,1,113,1,114,1,114,1,114,
        1,114,1,114,5,114,1436,8,114,10,114,12,114,1439,9,114,1,114,1,114,
        1,115,1,115,1,115,1,115,1,115,5,115,1448,8,115,10,115,12,115,1451,
        9,115,1,115,1,115,1,116,1,116,1,116,1,116,1,116,1,116,1,116,1,117,
        1,117,1,117,4,117,1465,8,117,11,117,12,117,1466,1,117,3,117,1470,
        8,117,1,117,1,117,1,118,1,118,1,118,1,119,1,119,1,119,1,120,1,120,
        1,120,1,120,3,120,1484,8,120,1,120,5,120,1487,8,120,10,120,12,120,
        1490,9,120,1,120,1,120,1,121,1,121,1,121,5,121,1497,8,121,10,121,
        12,121,1500,9,121,1,121,1,121,1,122,1,122,1,122,1,122,1,122,1,122,
        1,122,1,122,1,122,1,122,1,122,1,122,1,122,3,122,1517,8,122,1,123,
        1,123,1,123,1,123,5,123,1523,8,123,10,123,12,123,1526,9,123,1,123,
        1,123,1,124,1,124,1,124,5,124,1533,8,124,10,124,12,124,1536,9,124,
        1,124,1,124,1,125,1,125,1,125,1,125,4,125,1544,8,125,11,125,12,125,
        1545,1,125,1,125,1,126,1,126,1,127,1,127,1,127,1,127,1,127,1,127,
        1,128,1,128,1,128,1,128,1,128,1,128,1,129,1,129,1,129,1,129,1,129,
        1,130,1,130,1,131,1,131,1,131,1,131,1,131,1,131,1,131,1,131,1,131,
        1,131,1,131,1,131,5,131,1583,8,131,10,131,12,131,1586,9,131,1,131,
        1,131,3,131,1590,8,131,1,132,1,132,1,132,1,132,1,132,1,133,1,133,
        1,133,1,133,1,133,1,134,1,134,1,134,1,134,1,134,1,134,1,135,1,135,
        1,135,1,135,1,135,1,135,1,136,1,136,1,136,1,136,1,136,1,136,1,137,
        1,137,1,137,3,137,1623,8,137,1,137,5,137,1626,8,137,10,137,12,137,
        1629,9,137,1,137,1,137,1,138,1,138,1,138,4,138,1636,8,138,11,138,
        12,138,1637,1,138,1,138,1,139,1,139,1,139,3,139,1645,8,139,1,139,
        5,139,1648,8,139,10,139,12,139,1651,9,139,1,139,3,139,1654,8,139,
        1,139,3,139,1657,8,139,3,139,1659,8,139,1,139,1,139,1,139,3,139,
        1664,8,139,1,139,1,139,1,139,1,139,1,139,3,139,1671,8,139,3,139,
        1673,8,139,1,140,1,140,1,140,1,140,3,140,1679,8,140,1,140,1,140,
        1,141,1,141,1,141,1,141,1,141,3,141,1688,8,141,1,141,1,141,1,142,
        1,142,1,142,0,0,143,0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,
        34,36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,66,68,70,72,74,76,
        78,80,82,84,86,88,90,92,94,96,98,100,102,104,106,108,110,112,114,
        116,118,120,122,124,126,128,130,132,134,136,138,140,142,144,146,
        148,150,152,154,156,158,160,162,164,166,168,170,172,174,176,178,
        180,182,184,186,188,190,192,194,196,198,200,202,204,206,208,210,
        212,214,216,218,220,222,224,226,228,230,232,234,236,238,240,242,
        244,246,248,250,252,254,256,258,260,262,264,266,268,270,272,274,
        276,278,280,282,284,0,8,2,0,119,120,122,122,2,0,76,76,98,105,2,0,
        86,86,119,120,2,0,76,76,85,85,7,0,5,30,34,34,36,84,86,88,90,106,
        109,120,124,124,1,0,36,37,1,0,2,3,3,0,86,88,119,120,122,122,1786,
        0,286,1,0,0,0,2,309,1,0,0,0,4,318,1,0,0,0,6,320,1,0,0,0,8,342,1,
        0,0,0,10,344,1,0,0,0,12,350,1,0,0,0,14,359,1,0,0,0,16,361,1,0,0,
        0,18,373,1,0,0,0,20,385,1,0,0,0,22,388,1,0,0,0,24,397,1,0,0,0,26,
        409,1,0,0,0,28,418,1,0,0,0,30,429,1,0,0,0,32,436,1,0,0,0,34,457,
        1,0,0,0,36,474,1,0,0,0,38,479,1,0,0,0,40,488,1,0,0,0,42,504,1,0,
        0,0,44,506,1,0,0,0,46,508,1,0,0,0,48,528,1,0,0,0,50,539,1,0,0,0,
        52,557,1,0,0,0,54,569,1,0,0,0,56,587,1,0,0,0,58,612,1,0,0,0,60,614,
        1,0,0,0,62,625,1,0,0,0,64,666,1,0,0,0,66,668,1,0,0,0,68,686,1,0,
        0,0,70,692,1,0,0,0,72,710,1,0,0,0,74,716,1,0,0,0,76,725,1,0,0,0,
        78,736,1,0,0,0,80,746,1,0,0,0,82,753,1,0,0,0,84,758,1,0,0,0,86,766,
        1,0,0,0,88,772,1,0,0,0,90,786,1,0,0,0,92,797,1,0,0,0,94,799,1,0,
        0,0,96,830,1,0,0,0,98,832,1,0,0,0,100,841,1,0,0,0,102,848,1,0,0,
        0,104,858,1,0,0,0,106,863,1,0,0,0,108,869,1,0,0,0,110,878,1,0,0,
        0,112,888,1,0,0,0,114,893,1,0,0,0,116,898,1,0,0,0,118,907,1,0,0,
        0,120,931,1,0,0,0,122,933,1,0,0,0,124,942,1,0,0,0,126,951,1,0,0,
        0,128,956,1,0,0,0,130,976,1,0,0,0,132,978,1,0,0,0,134,994,1,0,0,
        0,136,1002,1,0,0,0,138,1012,1,0,0,0,140,1026,1,0,0,0,142,1028,1,
        0,0,0,144,1033,1,0,0,0,146,1038,1,0,0,0,148,1043,1,0,0,0,150,1049,
        1,0,0,0,152,1057,1,0,0,0,154,1062,1,0,0,0,156,1072,1,0,0,0,158,1081,
        1,0,0,0,160,1083,1,0,0,0,162,1094,1,0,0,0,164,1096,1,0,0,0,166,1105,
        1,0,0,0,168,1114,1,0,0,0,170,1124,1,0,0,0,172,1129,1,0,0,0,174,1146,
        1,0,0,0,176,1148,1,0,0,0,178,1162,1,0,0,0,180,1173,1,0,0,0,182,1183,
        1,0,0,0,184,1196,1,0,0,0,186,1208,1,0,0,0,188,1220,1,0,0,0,190,1232,
        1,0,0,0,192,1249,1,0,0,0,194,1260,1,0,0,0,196,1306,1,0,0,0,198,1308,
        1,0,0,0,200,1310,1,0,0,0,202,1312,1,0,0,0,204,1322,1,0,0,0,206,1333,
        1,0,0,0,208,1338,1,0,0,0,210,1344,1,0,0,0,212,1355,1,0,0,0,214,1369,
        1,0,0,0,216,1380,1,0,0,0,218,1391,1,0,0,0,220,1402,1,0,0,0,222,1413,
        1,0,0,0,224,1418,1,0,0,0,226,1425,1,0,0,0,228,1430,1,0,0,0,230,1442,
        1,0,0,0,232,1454,1,0,0,0,234,1461,1,0,0,0,236,1473,1,0,0,0,238,1476,
        1,0,0,0,240,1479,1,0,0,0,242,1493,1,0,0,0,244,1516,1,0,0,0,246,1518,
        1,0,0,0,248,1529,1,0,0,0,250,1539,1,0,0,0,252,1549,1,0,0,0,254,1551,
        1,0,0,0,256,1557,1,0,0,0,258,1563,1,0,0,0,260,1568,1,0,0,0,262,1589,
        1,0,0,0,264,1591,1,0,0,0,266,1596,1,0,0,0,268,1601,1,0,0,0,270,1607,
        1,0,0,0,272,1613,1,0,0,0,274,1619,1,0,0,0,276,1632,1,0,0,0,278,1672,
        1,0,0,0,280,1674,1,0,0,0,282,1682,1,0,0,0,284,1691,1,0,0,0,286,287,
        5,2,0,0,287,291,5,7,0,0,288,290,3,2,1,0,289,288,1,0,0,0,290,293,
        1,0,0,0,291,289,1,0,0,0,291,292,1,0,0,0,292,294,1,0,0,0,293,291,
        1,0,0,0,294,295,5,3,0,0,295,1,1,0,0,0,296,310,3,6,3,0,297,310,3,
        8,4,0,298,310,3,10,5,0,299,310,3,12,6,0,300,310,3,16,8,0,301,310,
        3,18,9,0,302,310,3,212,106,0,303,310,3,22,11,0,304,310,3,24,12,0,
        305,310,3,28,14,0,306,310,3,32,16,0,307,310,3,114,57,0,308,310,3,
        64,32,0,309,296,1,0,0,0,309,297,1,0,0,0,309,298,1,0,0,0,309,299,
        1,0,0,0,309,300,1,0,0,0,309,301,1,0,0,0,309,302,1,0,0,0,309,303,
        1,0,0,0,309,304,1,0,0,0,309,305,1,0,0,0,309,306,1,0,0,0,309,307,
        1,0,0,0,309,308,1,0,0,0,310,3,1,0,0,0,311,319,3,16,8,0,312,319,3,
        18,9,0,313,319,3,212,106,0,314,319,3,32,16,0,315,319,3,24,12,0,316,
        319,3,28,14,0,317,319,3,22,11,0,318,311,1,0,0,0,318,312,1,0,0,0,
        318,313,1,0,0,0,318,314,1,0,0,0,318,315,1,0,0,0,318,316,1,0,0,0,
        318,317,1,0,0,0,319,5,1,0,0,0,320,321,5,2,0,0,321,322,5,17,0,0,322,
        323,5,124,0,0,323,327,3,278,139,0,324,326,3,64,32,0,325,324,1,0,
        0,0,326,329,1,0,0,0,327,325,1,0,0,0,327,328,1,0,0,0,328,330,1,0,
        0,0,329,327,1,0,0,0,330,331,5,3,0,0,331,7,1,0,0,0,332,333,5,2,0,
        0,333,334,5,18,0,0,334,335,3,16,8,0,335,336,5,3,0,0,336,343,1,0,
        0,0,337,338,5,2,0,0,338,339,5,18,0,0,339,340,3,18,9,0,340,341,5,
        3,0,0,341,343,1,0,0,0,342,332,1,0,0,0,342,337,1,0,0,0,343,9,1,0,
        0,0,344,345,5,2,0,0,345,346,5,5,0,0,346,347,5,124,0,0,347,348,5,
        120,0,0,348,349,5,3,0,0,349,11,1,0,0,0,350,351,5,2,0,0,351,353,5,
        6,0,0,352,354,3,14,7,0,353,352,1,0,0,0,354,355,1,0,0,0,355,353,1,
        0,0,0,355,356,1,0,0,0,356,357,1,0,0,0,357,358,5,3,0,0,358,13,1,0,
        0,0,359,360,5,124,0,0,360,15,1,0,0,0,361,362,5,2,0,0,362,366,5,9,
        0,0,363,365,3,20,10,0,364,363,1,0,0,0,365,368,1,0,0,0,366,364,1,
        0,0,0,366,367,1,0,0,0,367,369,1,0,0,0,368,366,1,0,0,0,369,370,5,
        124,0,0,370,371,3,196,98,0,371,372,5,3,0,0,372,17,1,0,0,0,373,374,
        5,2,0,0,374,378,5,11,0,0,375,377,3,20,10,0,376,375,1,0,0,0,377,380,
        1,0,0,0,378,376,1,0,0,0,378,379,1,0,0,0,379,381,1,0,0,0,380,378,
        1,0,0,0,381,382,5,124,0,0,382,383,3,196,98,0,383,384,5,3,0,0,384,
        19,1,0,0,0,385,386,5,97,0,0,386,387,5,124,0,0,387,21,1,0,0,0,388,
        389,5,2,0,0,389,390,5,81,0,0,390,392,5,124,0,0,391,393,3,166,83,
        0,392,391,1,0,0,0,392,393,1,0,0,0,393,394,1,0,0,0,394,395,3,120,
        60,0,395,396,5,3,0,0,396,23,1,0,0,0,397,398,5,2,0,0,398,399,5,82,
        0,0,399,401,5,124,0,0,400,402,3,166,83,0,401,400,1,0,0,0,401,402,
        1,0,0,0,402,404,1,0,0,0,403,405,3,26,13,0,404,403,1,0,0,0,404,405,
        1,0,0,0,405,406,1,0,0,0,406,407,3,136,68,0,407,408,5,3,0,0,408,25,
        1,0,0,0,409,410,5,2,0,0,410,412,5,79,0,0,411,413,3,120,60,0,412,
        411,1,0,0,0,413,414,1,0,0,0,414,412,1,0,0,0,414,415,1,0,0,0,415,
        416,1,0,0,0,416,417,5,3,0,0,417,27,1,0,0,0,418,419,5,2,0,0,419,420,
        5,83,0,0,420,424,5,124,0,0,421,423,3,30,15,0,422,421,1,0,0,0,423,
        426,1,0,0,0,424,422,1,0,0,0,424,425,1,0,0,0,425,427,1,0,0,0,426,
        424,1,0,0,0,427,428,5,3,0,0,428,29,1,0,0,0,429,430,5,2,0,0,430,432,
        5,124,0,0,431,433,7,0,0,0,432,431,1,0,0,0,432,433,1,0,0,0,433,434,
        1,0,0,0,434,435,5,3,0,0,435,31,1,0,0,0,436,437,5,2,0,0,437,441,5,
        55,0,0,438,440,3,44,22,0,439,438,1,0,0,0,440,443,1,0,0,0,441,439,
        1,0,0,0,441,442,1,0,0,0,442,444,1,0,0,0,443,441,1,0,0,0,444,446,
        5,124,0,0,445,447,3,166,83,0,446,445,1,0,0,0,446,447,1,0,0,0,447,
        449,1,0,0,0,448,450,3,36,18,0,449,448,1,0,0,0,449,450,1,0,0,0,450,
        452,1,0,0,0,451,453,3,38,19,0,452,451,1,0,0,0,452,453,1,0,0,0,453,
        454,1,0,0,0,454,455,3,40,20,0,455,456,5,3,0,0,456,33,1,0,0,0,457,
        458,5,2,0,0,458,462,5,55,0,0,459,461,3,44,22,0,460,459,1,0,0,0,461,
        464,1,0,0,0,462,460,1,0,0,0,462,463,1,0,0,0,463,466,1,0,0,0,464,
        462,1,0,0,0,465,467,3,36,18,0,466,465,1,0,0,0,466,467,1,0,0,0,467,
        469,1,0,0,0,468,470,3,38,19,0,469,468,1,0,0,0,469,470,1,0,0,0,470,
        471,1,0,0,0,471,472,3,40,20,0,472,473,5,3,0,0,473,35,1,0,0,0,474,
        475,5,2,0,0,475,476,5,79,0,0,476,477,3,120,60,0,477,478,5,3,0,0,
        478,37,1,0,0,0,479,480,5,2,0,0,480,482,5,62,0,0,481,483,3,120,60,
        0,482,481,1,0,0,0,483,484,1,0,0,0,484,482,1,0,0,0,484,485,1,0,0,
        0,485,486,1,0,0,0,486,487,5,3,0,0,487,39,1,0,0,0,488,489,5,2,0,0,
        489,493,5,52,0,0,490,492,3,42,21,0,491,490,1,0,0,0,492,495,1,0,0,
        0,493,491,1,0,0,0,493,494,1,0,0,0,494,496,1,0,0,0,495,493,1,0,0,
        0,496,497,5,3,0,0,497,41,1,0,0,0,498,505,3,46,23,0,499,505,3,48,
        24,0,500,505,3,50,25,0,501,505,3,52,26,0,502,505,3,54,27,0,503,505,
        3,56,28,0,504,498,1,0,0,0,504,499,1,0,0,0,504,500,1,0,0,0,504,501,
        1,0,0,0,504,502,1,0,0,0,504,503,1,0,0,0,505,43,1,0,0,0,506,507,7,
        1,0,0,507,45,1,0,0,0,508,509,5,2,0,0,509,513,5,56,0,0,510,512,3,
        44,22,0,511,510,1,0,0,0,512,515,1,0,0,0,513,511,1,0,0,0,513,514,
        1,0,0,0,514,516,1,0,0,0,515,513,1,0,0,0,516,517,5,2,0,0,517,520,
        5,124,0,0,518,519,5,89,0,0,519,521,3,120,60,0,520,518,1,0,0,0,520,
        521,1,0,0,0,521,522,1,0,0,0,522,524,5,3,0,0,523,525,3,196,98,0,524,
        523,1,0,0,0,524,525,1,0,0,0,525,526,1,0,0,0,526,527,5,3,0,0,527,
        47,1,0,0,0,528,529,5,2,0,0,529,530,5,57,0,0,530,534,3,62,31,0,531,
        533,3,64,32,0,532,531,1,0,0,0,533,536,1,0,0,0,534,532,1,0,0,0,534,
        535,1,0,0,0,535,537,1,0,0,0,536,534,1,0,0,0,537,538,5,3,0,0,538,
        49,1,0,0,0,539,540,5,2,0,0,540,544,5,14,0,0,541,543,3,44,22,0,542,
        541,1,0,0,0,543,546,1,0,0,0,544,542,1,0,0,0,544,545,1,0,0,0,545,
        547,1,0,0,0,546,544,1,0,0,0,547,548,3,58,29,0,548,552,3,62,31,0,
        549,551,3,64,32,0,550,549,1,0,0,0,551,554,1,0,0,0,552,550,1,0,0,
        0,552,553,1,0,0,0,553,555,1,0,0,0,554,552,1,0,0,0,555,556,5,3,0,
        0,556,51,1,0,0,0,557,558,5,2,0,0,558,562,5,54,0,0,559,561,3,44,22,
        0,560,559,1,0,0,0,561,564,1,0,0,0,562,560,1,0,0,0,562,563,1,0,0,
        0,563,565,1,0,0,0,564,562,1,0,0,0,565,566,3,58,29,0,566,567,3,62,
        31,0,567,568,5,3,0,0,568,53,1,0,0,0,569,570,5,2,0,0,570,574,5,60,
        0,0,571,573,3,44,22,0,572,571,1,0,0,0,573,576,1,0,0,0,574,572,1,
        0,0,0,574,575,1,0,0,0,575,577,1,0,0,0,576,574,1,0,0,0,577,578,3,
        58,29,0,578,582,3,62,31,0,579,581,3,64,32,0,580,579,1,0,0,0,581,
        584,1,0,0,0,582,580,1,0,0,0,582,583,1,0,0,0,583,585,1,0,0,0,584,
        582,1,0,0,0,585,586,5,3,0,0,586,55,1,0,0,0,587,588,5,2,0,0,588,592,
        5,61,0,0,589,591,3,44,22,0,590,589,1,0,0,0,591,594,1,0,0,0,592,590,
        1,0,0,0,592,593,1,0,0,0,593,595,1,0,0,0,594,592,1,0,0,0,595,596,
        3,58,29,0,596,600,3,62,31,0,597,599,3,64,32,0,598,597,1,0,0,0,599,
        602,1,0,0,0,600,598,1,0,0,0,600,601,1,0,0,0,601,603,1,0,0,0,602,
        600,1,0,0,0,603,604,5,3,0,0,604,57,1,0,0,0,605,613,5,124,0,0,606,
        613,5,60,0,0,607,613,5,61,0,0,608,609,5,107,0,0,609,610,3,196,98,
        0,610,611,5,108,0,0,611,613,1,0,0,0,612,605,1,0,0,0,612,606,1,0,
        0,0,612,607,1,0,0,0,612,608,1,0,0,0,613,59,1,0,0,0,614,615,5,2,0,
        0,615,617,5,124,0,0,616,618,5,85,0,0,617,616,1,0,0,0,617,618,1,0,
        0,0,618,621,1,0,0,0,619,620,5,89,0,0,620,622,3,120,60,0,621,619,
        1,0,0,0,621,622,1,0,0,0,622,623,1,0,0,0,623,624,5,3,0,0,624,61,1,
        0,0,0,625,636,5,2,0,0,626,633,3,60,30,0,627,629,5,4,0,0,628,627,
        1,0,0,0,628,629,1,0,0,0,629,630,1,0,0,0,630,632,3,60,30,0,631,628,
        1,0,0,0,632,635,1,0,0,0,633,631,1,0,0,0,633,634,1,0,0,0,634,637,
        1,0,0,0,635,633,1,0,0,0,636,626,1,0,0,0,636,637,1,0,0,0,637,638,
        1,0,0,0,638,644,5,3,0,0,639,640,5,2,0,0,640,641,5,80,0,0,641,642,
        3,120,60,0,642,643,5,3,0,0,643,645,1,0,0,0,644,639,1,0,0,0,644,645,
        1,0,0,0,645,63,1,0,0,0,646,667,3,66,33,0,647,667,3,68,34,0,648,667,
        3,70,35,0,649,667,3,72,36,0,650,667,3,74,37,0,651,667,3,76,38,0,
        652,667,3,190,95,0,653,667,3,78,39,0,654,667,3,80,40,0,655,667,3,
        82,41,0,656,667,3,84,42,0,657,667,3,86,43,0,658,667,3,92,46,0,659,
        667,3,176,88,0,660,667,3,182,91,0,661,667,3,184,92,0,662,667,3,186,
        93,0,663,667,3,188,94,0,664,667,3,174,87,0,665,667,3,196,98,0,666,
        646,1,0,0,0,666,647,1,0,0,0,666,648,1,0,0,0,666,649,1,0,0,0,666,
        650,1,0,0,0,666,651,1,0,0,0,666,652,1,0,0,0,666,653,1,0,0,0,666,
        654,1,0,0,0,666,655,1,0,0,0,666,656,1,0,0,0,666,657,1,0,0,0,666,
        658,1,0,0,0,666,659,1,0,0,0,666,660,1,0,0,0,666,661,1,0,0,0,666,
        662,1,0,0,0,666,663,1,0,0,0,666,664,1,0,0,0,666,665,1,0,0,0,667,
        65,1,0,0,0,668,669,5,2,0,0,669,670,5,8,0,0,670,674,5,2,0,0,671,673,
        3,116,58,0,672,671,1,0,0,0,673,676,1,0,0,0,674,672,1,0,0,0,674,675,
        1,0,0,0,675,677,1,0,0,0,676,674,1,0,0,0,677,681,5,3,0,0,678,680,
        3,64,32,0,679,678,1,0,0,0,680,683,1,0,0,0,681,679,1,0,0,0,681,682,
        1,0,0,0,682,684,1,0,0,0,683,681,1,0,0,0,684,685,5,3,0,0,685,67,1,
        0,0,0,686,687,5,2,0,0,687,688,5,9,0,0,688,689,3,118,59,0,689,690,
        3,196,98,0,690,691,5,3,0,0,691,69,1,0,0,0,692,693,5,2,0,0,693,694,
        5,10,0,0,694,698,5,2,0,0,695,697,3,116,58,0,696,695,1,0,0,0,697,
        700,1,0,0,0,698,696,1,0,0,0,698,699,1,0,0,0,699,701,1,0,0,0,700,
        698,1,0,0,0,701,705,5,3,0,0,702,704,3,64,32,0,703,702,1,0,0,0,704,
        707,1,0,0,0,705,703,1,0,0,0,705,706,1,0,0,0,706,708,1,0,0,0,707,
        705,1,0,0,0,708,709,5,3,0,0,709,71,1,0,0,0,710,711,5,2,0,0,711,712,
        5,11,0,0,712,713,3,118,59,0,713,714,3,196,98,0,714,715,5,3,0,0,715,
        73,1,0,0,0,716,717,5,2,0,0,717,718,5,20,0,0,718,719,3,196,98,0,719,
        721,3,64,32,0,720,722,3,64,32,0,721,720,1,0,0,0,721,722,1,0,0,0,
        722,723,1,0,0,0,723,724,5,3,0,0,724,75,1,0,0,0,725,726,5,2,0,0,726,
        727,5,21,0,0,727,731,3,196,98,0,728,730,3,64,32,0,729,728,1,0,0,
        0,730,733,1,0,0,0,731,729,1,0,0,0,731,732,1,0,0,0,732,734,1,0,0,
        0,733,731,1,0,0,0,734,735,5,3,0,0,735,77,1,0,0,0,736,737,5,2,0,0,
        737,741,5,22,0,0,738,740,3,64,32,0,739,738,1,0,0,0,740,743,1,0,0,
        0,741,739,1,0,0,0,741,742,1,0,0,0,742,744,1,0,0,0,743,741,1,0,0,
        0,744,745,5,3,0,0,745,79,1,0,0,0,746,747,5,2,0,0,747,749,5,23,0,
        0,748,750,3,196,98,0,749,748,1,0,0,0,749,750,1,0,0,0,750,751,1,0,
        0,0,751,752,5,3,0,0,752,81,1,0,0,0,753,754,5,2,0,0,754,755,5,24,
        0,0,755,756,3,196,98,0,756,757,5,3,0,0,757,83,1,0,0,0,758,759,5,
        2,0,0,759,761,5,41,0,0,760,762,3,242,121,0,761,760,1,0,0,0,761,762,
        1,0,0,0,762,763,1,0,0,0,763,764,5,120,0,0,764,765,5,3,0,0,765,85,
        1,0,0,0,766,767,5,2,0,0,767,768,5,115,0,0,768,769,3,88,44,0,769,
        770,5,120,0,0,770,771,5,3,0,0,771,87,1,0,0,0,772,773,5,2,0,0,773,
        775,5,124,0,0,774,776,3,90,45,0,775,774,1,0,0,0,776,777,1,0,0,0,
        777,775,1,0,0,0,777,778,1,0,0,0,778,779,1,0,0,0,779,780,5,3,0,0,
        780,89,1,0,0,0,781,787,5,124,0,0,782,783,5,2,0,0,783,784,5,124,0,
        0,784,785,5,124,0,0,785,787,5,3,0,0,786,781,1,0,0,0,786,782,1,0,
        0,0,787,91,1,0,0,0,788,798,3,94,47,0,789,798,3,96,48,0,790,798,3,
        98,49,0,791,798,3,106,53,0,792,798,3,102,51,0,793,798,3,104,52,0,
        794,798,3,108,54,0,795,798,3,110,55,0,796,798,3,112,56,0,797,788,
        1,0,0,0,797,789,1,0,0,0,797,790,1,0,0,0,797,791,1,0,0,0,797,792,
        1,0,0,0,797,793,1,0,0,0,797,794,1,0,0,0,797,795,1,0,0,0,797,796,
        1,0,0,0,798,93,1,0,0,0,799,800,5,2,0,0,800,801,5,109,0,0,801,802,
        5,124,0,0,802,803,3,196,98,0,803,804,5,3,0,0,804,95,1,0,0,0,805,
        806,5,2,0,0,806,807,5,110,0,0,807,808,3,32,16,0,808,809,5,3,0,0,
        809,831,1,0,0,0,810,811,5,2,0,0,811,812,5,110,0,0,812,813,3,34,17,
        0,813,814,5,3,0,0,814,831,1,0,0,0,815,816,5,2,0,0,816,817,5,110,
        0,0,817,818,3,16,8,0,818,819,5,3,0,0,819,831,1,0,0,0,820,821,5,2,
        0,0,821,822,5,110,0,0,822,823,3,18,9,0,823,824,5,3,0,0,824,831,1,
        0,0,0,825,826,5,2,0,0,826,827,5,110,0,0,827,828,3,196,98,0,828,829,
        5,3,0,0,829,831,1,0,0,0,830,805,1,0,0,0,830,810,1,0,0,0,830,815,
        1,0,0,0,830,820,1,0,0,0,830,825,1,0,0,0,831,97,1,0,0,0,832,833,5,
        2,0,0,833,835,5,111,0,0,834,836,3,100,50,0,835,834,1,0,0,0,836,837,
        1,0,0,0,837,835,1,0,0,0,837,838,1,0,0,0,838,839,1,0,0,0,839,840,
        5,3,0,0,840,99,1,0,0,0,841,842,5,2,0,0,842,844,5,124,0,0,843,845,
        5,124,0,0,844,843,1,0,0,0,844,845,1,0,0,0,845,846,1,0,0,0,846,847,
        5,3,0,0,847,101,1,0,0,0,848,849,5,2,0,0,849,850,5,113,0,0,850,852,
        5,120,0,0,851,853,3,100,50,0,852,851,1,0,0,0,853,854,1,0,0,0,854,
        852,1,0,0,0,854,855,1,0,0,0,855,856,1,0,0,0,856,857,5,3,0,0,857,
        103,1,0,0,0,858,859,5,2,0,0,859,860,5,114,0,0,860,861,5,120,0,0,
        861,862,5,3,0,0,862,105,1,0,0,0,863,864,5,2,0,0,864,865,5,112,0,
        0,865,866,5,120,0,0,866,867,5,120,0,0,867,868,5,3,0,0,868,107,1,
        0,0,0,869,870,5,2,0,0,870,872,5,118,0,0,871,873,3,100,50,0,872,871,
        1,0,0,0,873,874,1,0,0,0,874,872,1,0,0,0,874,875,1,0,0,0,875,876,
        1,0,0,0,876,877,5,3,0,0,877,109,1,0,0,0,878,879,5,2,0,0,879,880,
        5,117,0,0,880,882,5,120,0,0,881,883,3,100,50,0,882,881,1,0,0,0,883,
        884,1,0,0,0,884,882,1,0,0,0,884,885,1,0,0,0,885,886,1,0,0,0,886,
        887,5,3,0,0,887,111,1,0,0,0,888,889,5,2,0,0,889,890,5,116,0,0,890,
        891,5,120,0,0,891,892,5,3,0,0,892,113,1,0,0,0,893,894,5,2,0,0,894,
        895,5,109,0,0,895,896,3,4,2,0,896,897,5,3,0,0,897,115,1,0,0,0,898,
        899,5,2,0,0,899,902,5,124,0,0,900,901,5,89,0,0,901,903,3,120,60,
        0,902,900,1,0,0,0,902,903,1,0,0,0,903,904,1,0,0,0,904,905,3,196,
        98,0,905,906,5,3,0,0,906,117,1,0,0,0,907,908,5,2,0,0,908,911,5,124,
        0,0,909,910,5,89,0,0,910,912,3,120,60,0,911,909,1,0,0,0,911,912,
        1,0,0,0,912,913,1,0,0,0,913,914,5,3,0,0,914,119,1,0,0,0,915,932,
        5,124,0,0,916,932,3,122,61,0,917,932,3,124,62,0,918,932,3,126,63,
        0,919,932,3,128,64,0,920,932,3,132,66,0,921,932,3,136,68,0,922,932,
        3,142,71,0,923,932,3,144,72,0,924,932,3,146,73,0,925,932,3,148,74,
        0,926,932,3,150,75,0,927,932,3,152,76,0,928,932,3,154,77,0,929,932,
        3,160,80,0,930,932,3,164,82,0,931,915,1,0,0,0,931,916,1,0,0,0,931,
        917,1,0,0,0,931,918,1,0,0,0,931,919,1,0,0,0,931,920,1,0,0,0,931,
        921,1,0,0,0,931,922,1,0,0,0,931,923,1,0,0,0,931,924,1,0,0,0,931,
        925,1,0,0,0,931,926,1,0,0,0,931,927,1,0,0,0,931,928,1,0,0,0,931,
        929,1,0,0,0,931,930,1,0,0,0,932,121,1,0,0,0,933,934,5,2,0,0,934,
        936,5,63,0,0,935,937,3,120,60,0,936,935,1,0,0,0,937,938,1,0,0,0,
        938,936,1,0,0,0,938,939,1,0,0,0,939,940,1,0,0,0,940,941,5,3,0,0,
        941,123,1,0,0,0,942,943,5,2,0,0,943,945,5,64,0,0,944,946,3,120,60,
        0,945,944,1,0,0,0,946,947,1,0,0,0,947,945,1,0,0,0,947,948,1,0,0,
        0,948,949,1,0,0,0,949,950,5,3,0,0,950,125,1,0,0,0,951,952,5,2,0,
        0,952,953,5,29,0,0,953,954,3,120,60,0,954,955,5,3,0,0,955,127,1,
        0,0,0,956,957,5,2,0,0,957,959,5,65,0,0,958,960,3,130,65,0,959,958,
        1,0,0,0,960,961,1,0,0,0,961,959,1,0,0,0,961,962,1,0,0,0,962,963,
        1,0,0,0,963,964,5,3,0,0,964,129,1,0,0,0,965,966,5,2,0,0,966,967,
        5,75,0,0,967,968,3,120,60,0,968,969,5,3,0,0,969,977,1,0,0,0,970,
        971,5,2,0,0,971,972,5,124,0,0,972,973,3,120,60,0,973,974,5,3,0,0,
        974,977,1,0,0,0,975,977,3,120,60,0,976,965,1,0,0,0,976,970,1,0,0,
        0,976,975,1,0,0,0,977,131,1,0,0,0,978,979,5,2,0,0,979,981,5,66,0,
        0,980,982,3,166,83,0,981,980,1,0,0,0,981,982,1,0,0,0,982,983,1,0,
        0,0,983,987,5,2,0,0,984,986,3,134,67,0,985,984,1,0,0,0,986,989,1,
        0,0,0,987,985,1,0,0,0,987,988,1,0,0,0,988,990,1,0,0,0,989,987,1,
        0,0,0,990,991,5,3,0,0,991,992,3,120,60,0,992,993,5,3,0,0,993,133,
        1,0,0,0,994,995,5,2,0,0,995,997,5,124,0,0,996,998,5,85,0,0,997,996,
        1,0,0,0,997,998,1,0,0,0,998,999,1,0,0,0,999,1000,3,120,60,0,1000,
        1001,5,3,0,0,1001,135,1,0,0,0,1002,1003,5,2,0,0,1003,1007,5,124,
        0,0,1004,1006,3,138,69,0,1005,1004,1,0,0,0,1006,1009,1,0,0,0,1007,
        1005,1,0,0,0,1007,1008,1,0,0,0,1008,1010,1,0,0,0,1009,1007,1,0,0,
        0,1010,1011,5,3,0,0,1011,137,1,0,0,0,1012,1016,5,2,0,0,1013,1015,
        3,140,70,0,1014,1013,1,0,0,0,1015,1018,1,0,0,0,1016,1014,1,0,0,0,
        1016,1017,1,0,0,0,1017,1019,1,0,0,0,1018,1016,1,0,0,0,1019,1021,
        5,124,0,0,1020,1022,5,85,0,0,1021,1020,1,0,0,0,1021,1022,1,0,0,0,
        1022,1023,1,0,0,0,1023,1024,3,120,60,0,1024,1025,5,3,0,0,1025,139,
        1,0,0,0,1026,1027,5,76,0,0,1027,141,1,0,0,0,1028,1029,5,2,0,0,1029,
        1030,5,67,0,0,1030,1031,7,2,0,0,1031,1032,5,3,0,0,1032,143,1,0,0,
        0,1033,1034,5,2,0,0,1034,1035,5,68,0,0,1035,1036,3,120,60,0,1036,
        1037,5,3,0,0,1037,145,1,0,0,0,1038,1039,5,2,0,0,1039,1040,5,69,0,
        0,1040,1041,5,124,0,0,1041,1042,5,3,0,0,1042,147,1,0,0,0,1043,1044,
        5,2,0,0,1044,1045,5,34,0,0,1045,1046,3,120,60,0,1046,1047,3,120,
        60,0,1047,1048,5,3,0,0,1048,149,1,0,0,0,1049,1050,5,2,0,0,1050,1051,
        5,27,0,0,1051,1052,3,120,60,0,1052,1053,3,120,60,0,1053,1054,3,120,
        60,0,1054,1055,3,120,60,0,1055,1056,5,3,0,0,1056,151,1,0,0,0,1057,
        1058,5,2,0,0,1058,1059,5,71,0,0,1059,1060,5,124,0,0,1060,1061,5,
        3,0,0,1061,153,1,0,0,0,1062,1063,5,2,0,0,1063,1064,5,72,0,0,1064,
        1065,5,124,0,0,1065,1067,3,120,60,0,1066,1068,3,156,78,0,1067,1066,
        1,0,0,0,1067,1068,1,0,0,0,1068,1069,1,0,0,0,1069,1070,3,120,60,0,
        1070,1071,5,3,0,0,1071,155,1,0,0,0,1072,1073,5,2,0,0,1073,1075,5,
        84,0,0,1074,1076,3,158,79,0,1075,1074,1,0,0,0,1076,1077,1,0,0,0,
        1077,1075,1,0,0,0,1077,1078,1,0,0,0,1078,1079,1,0,0,0,1079,1080,
        5,3,0,0,1080,157,1,0,0,0,1081,1082,7,3,0,0,1082,159,1,0,0,0,1083,
        1084,5,2,0,0,1084,1086,5,73,0,0,1085,1087,3,162,81,0,1086,1085,1,
        0,0,0,1087,1088,1,0,0,0,1088,1086,1,0,0,0,1088,1089,1,0,0,0,1089,
        1090,1,0,0,0,1090,1091,5,3,0,0,1091,161,1,0,0,0,1092,1095,5,120,
        0,0,1093,1095,3,120,60,0,1094,1092,1,0,0,0,1094,1093,1,0,0,0,1095,
        163,1,0,0,0,1096,1097,5,2,0,0,1097,1099,3,120,60,0,1098,1100,3,120,
        60,0,1099,1098,1,0,0,0,1100,1101,1,0,0,0,1101,1099,1,0,0,0,1101,
        1102,1,0,0,0,1102,1103,1,0,0,0,1103,1104,5,3,0,0,1104,165,1,0,0,
        0,1105,1106,5,2,0,0,1106,1108,5,77,0,0,1107,1109,3,168,84,0,1108,
        1107,1,0,0,0,1109,1110,1,0,0,0,1110,1108,1,0,0,0,1110,1111,1,0,0,
        0,1111,1112,1,0,0,0,1112,1113,5,3,0,0,1113,167,1,0,0,0,1114,1115,
        5,2,0,0,1115,1117,5,124,0,0,1116,1118,3,170,85,0,1117,1116,1,0,0,
        0,1117,1118,1,0,0,0,1118,1120,1,0,0,0,1119,1121,3,172,86,0,1120,
        1119,1,0,0,0,1120,1121,1,0,0,0,1121,1122,1,0,0,0,1122,1123,5,3,0,
        0,1123,169,1,0,0,0,1124,1125,5,2,0,0,1125,1126,5,79,0,0,1126,1127,
        3,120,60,0,1127,1128,5,3,0,0,1128,171,1,0,0,0,1129,1130,5,2,0,0,
        1130,1131,5,44,0,0,1131,1132,3,120,60,0,1132,1133,5,3,0,0,1133,173,
        1,0,0,0,1134,1135,5,2,0,0,1135,1136,5,25,0,0,1136,1137,5,124,0,0,
        1137,1138,3,196,98,0,1138,1139,5,3,0,0,1139,1147,1,0,0,0,1140,1141,
        5,2,0,0,1141,1142,5,25,0,0,1142,1143,3,254,127,0,1143,1144,3,196,
        98,0,1144,1145,5,3,0,0,1145,1147,1,0,0,0,1146,1134,1,0,0,0,1146,
        1140,1,0,0,0,1147,175,1,0,0,0,1148,1149,5,2,0,0,1149,1150,5,42,0,
        0,1150,1154,3,196,98,0,1151,1153,3,178,89,0,1152,1151,1,0,0,0,1153,
        1156,1,0,0,0,1154,1152,1,0,0,0,1154,1155,1,0,0,0,1155,1158,1,0,0,
        0,1156,1154,1,0,0,0,1157,1159,3,180,90,0,1158,1157,1,0,0,0,1158,
        1159,1,0,0,0,1159,1160,1,0,0,0,1160,1161,5,3,0,0,1161,177,1,0,0,
        0,1162,1163,5,2,0,0,1163,1164,5,43,0,0,1164,1168,3,196,98,0,1165,
        1167,3,64,32,0,1166,1165,1,0,0,0,1167,1170,1,0,0,0,1168,1166,1,0,
        0,0,1168,1169,1,0,0,0,1169,1171,1,0,0,0,1170,1168,1,0,0,0,1171,1172,
        5,3,0,0,1172,179,1,0,0,0,1173,1174,5,2,0,0,1174,1178,5,44,0,0,1175,
        1177,3,64,32,0,1176,1175,1,0,0,0,1177,1180,1,0,0,0,1178,1176,1,0,
        0,0,1178,1179,1,0,0,0,1179,1181,1,0,0,0,1180,1178,1,0,0,0,1181,1182,
        5,3,0,0,1182,181,1,0,0,0,1183,1184,5,2,0,0,1184,1185,5,51,0,0,1185,
        1186,3,68,34,0,1186,1187,3,196,98,0,1187,1191,3,174,87,0,1188,1190,
        3,64,32,0,1189,1188,1,0,0,0,1190,1193,1,0,0,0,1191,1189,1,0,0,0,
        1191,1192,1,0,0,0,1192,1194,1,0,0,0,1193,1191,1,0,0,0,1194,1195,
        5,3,0,0,1195,183,1,0,0,0,1196,1197,5,2,0,0,1197,1198,5,45,0,0,1198,
        1199,5,124,0,0,1199,1203,3,196,98,0,1200,1202,3,64,32,0,1201,1200,
        1,0,0,0,1202,1205,1,0,0,0,1203,1201,1,0,0,0,1203,1204,1,0,0,0,1204,
        1206,1,0,0,0,1205,1203,1,0,0,0,1206,1207,5,3,0,0,1207,185,1,0,0,
        0,1208,1209,5,2,0,0,1209,1210,5,46,0,0,1210,1211,5,124,0,0,1211,
        1215,3,196,98,0,1212,1214,3,64,32,0,1213,1212,1,0,0,0,1214,1217,
        1,0,0,0,1215,1213,1,0,0,0,1215,1216,1,0,0,0,1216,1218,1,0,0,0,1217,
        1215,1,0,0,0,1218,1219,5,3,0,0,1219,187,1,0,0,0,1220,1221,5,2,0,
        0,1221,1222,5,47,0,0,1222,1223,5,124,0,0,1223,1227,3,196,98,0,1224,
        1226,3,64,32,0,1225,1224,1,0,0,0,1226,1229,1,0,0,0,1227,1225,1,0,
        0,0,1227,1228,1,0,0,0,1228,1230,1,0,0,0,1229,1227,1,0,0,0,1230,1231,
        5,3,0,0,1231,189,1,0,0,0,1232,1233,5,2,0,0,1233,1237,5,48,0,0,1234,
        1236,3,64,32,0,1235,1234,1,0,0,0,1236,1239,1,0,0,0,1237,1235,1,0,
        0,0,1237,1238,1,0,0,0,1238,1245,1,0,0,0,1239,1237,1,0,0,0,1240,1242,
        3,192,96,0,1241,1243,3,194,97,0,1242,1241,1,0,0,0,1242,1243,1,0,
        0,0,1243,1246,1,0,0,0,1244,1246,3,194,97,0,1245,1240,1,0,0,0,1245,
        1244,1,0,0,0,1246,1247,1,0,0,0,1247,1248,5,3,0,0,1248,191,1,0,0,
        0,1249,1250,5,2,0,0,1250,1251,5,49,0,0,1251,1255,5,124,0,0,1252,
        1254,3,64,32,0,1253,1252,1,0,0,0,1254,1257,1,0,0,0,1255,1253,1,0,
        0,0,1255,1256,1,0,0,0,1256,1258,1,0,0,0,1257,1255,1,0,0,0,1258,1259,
        5,3,0,0,1259,193,1,0,0,0,1260,1261,5,2,0,0,1261,1265,5,50,0,0,1262,
        1264,3,64,32,0,1263,1262,1,0,0,0,1264,1267,1,0,0,0,1265,1263,1,0,
        0,0,1265,1266,1,0,0,0,1266,1268,1,0,0,0,1267,1265,1,0,0,0,1268,1269,
        5,3,0,0,1269,195,1,0,0,0,1270,1307,3,284,142,0,1271,1307,5,124,0,
        0,1272,1307,5,19,0,0,1273,1307,5,123,0,0,1274,1307,3,210,105,0,1275,
        1307,3,212,106,0,1276,1307,3,214,107,0,1277,1307,3,216,108,0,1278,
        1307,3,218,109,0,1279,1307,3,220,110,0,1280,1307,3,222,111,0,1281,
        1307,3,224,112,0,1282,1307,3,226,113,0,1283,1307,3,228,114,0,1284,
        1307,3,230,115,0,1285,1307,3,242,121,0,1286,1307,3,248,124,0,1287,
        1307,3,254,127,0,1288,1307,3,256,128,0,1289,1307,3,258,129,0,1290,
        1307,3,264,132,0,1291,1307,3,266,133,0,1292,1307,3,232,116,0,1293,
        1307,3,234,117,0,1294,1307,3,240,120,0,1295,1307,3,268,134,0,1296,
        1307,3,270,135,0,1297,1307,3,272,136,0,1298,1307,3,206,103,0,1299,
        1307,3,208,104,0,1300,1307,3,250,125,0,1301,1307,3,198,99,0,1302,
        1307,3,200,100,0,1303,1307,3,202,101,0,1304,1307,3,204,102,0,1305,
        1307,3,274,137,0,1306,1270,1,0,0,0,1306,1271,1,0,0,0,1306,1272,1,
        0,0,0,1306,1273,1,0,0,0,1306,1274,1,0,0,0,1306,1275,1,0,0,0,1306,
        1276,1,0,0,0,1306,1277,1,0,0,0,1306,1278,1,0,0,0,1306,1279,1,0,0,
        0,1306,1280,1,0,0,0,1306,1281,1,0,0,0,1306,1282,1,0,0,0,1306,1283,
        1,0,0,0,1306,1284,1,0,0,0,1306,1285,1,0,0,0,1306,1286,1,0,0,0,1306,
        1287,1,0,0,0,1306,1288,1,0,0,0,1306,1289,1,0,0,0,1306,1290,1,0,0,
        0,1306,1291,1,0,0,0,1306,1292,1,0,0,0,1306,1293,1,0,0,0,1306,1294,
        1,0,0,0,1306,1295,1,0,0,0,1306,1296,1,0,0,0,1306,1297,1,0,0,0,1306,
        1298,1,0,0,0,1306,1299,1,0,0,0,1306,1300,1,0,0,0,1306,1301,1,0,0,
        0,1306,1302,1,0,0,0,1306,1303,1,0,0,0,1306,1304,1,0,0,0,1306,1305,
        1,0,0,0,1307,197,1,0,0,0,1308,1309,5,58,0,0,1309,199,1,0,0,0,1310,
        1311,5,59,0,0,1311,201,1,0,0,0,1312,1313,5,2,0,0,1313,1317,5,59,
        0,0,1314,1316,3,196,98,0,1315,1314,1,0,0,0,1316,1319,1,0,0,0,1317,
        1315,1,0,0,0,1317,1318,1,0,0,0,1318,1320,1,0,0,0,1319,1317,1,0,0,
        0,1320,1321,5,3,0,0,1321,203,1,0,0,0,1322,1323,5,2,0,0,1323,1324,
        5,53,0,0,1324,1328,5,124,0,0,1325,1327,3,196,98,0,1326,1325,1,0,
        0,0,1327,1330,1,0,0,0,1328,1326,1,0,0,0,1328,1329,1,0,0,0,1329,1331,
        1,0,0,0,1330,1328,1,0,0,0,1331,1332,5,3,0,0,1332,205,1,0,0,0,1333,
        1334,5,2,0,0,1334,1335,5,69,0,0,1335,1336,3,196,98,0,1336,1337,5,
        3,0,0,1337,207,1,0,0,0,1338,1339,5,2,0,0,1339,1340,5,70,0,0,1340,
        1341,3,196,98,0,1341,1342,3,120,60,0,1342,1343,5,3,0,0,1343,209,
        1,0,0,0,1344,1345,5,2,0,0,1345,1346,5,12,0,0,1346,1350,3,278,139,
        0,1347,1349,3,64,32,0,1348,1347,1,0,0,0,1349,1352,1,0,0,0,1350,1348,
        1,0,0,0,1350,1351,1,0,0,0,1351,1353,1,0,0,0,1352,1350,1,0,0,0,1353,
        1354,5,3,0,0,1354,211,1,0,0,0,1355,1356,5,2,0,0,1356,1358,5,13,0,
        0,1357,1359,5,124,0,0,1358,1357,1,0,0,0,1358,1359,1,0,0,0,1359,1360,
        1,0,0,0,1360,1364,3,278,139,0,1361,1363,3,64,32,0,1362,1361,1,0,
        0,0,1363,1366,1,0,0,0,1364,1362,1,0,0,0,1364,1365,1,0,0,0,1365,1367,
        1,0,0,0,1366,1364,1,0,0,0,1367,1368,5,3,0,0,1368,213,1,0,0,0,1369,
        1370,5,2,0,0,1370,1371,5,91,0,0,1371,1375,3,278,139,0,1372,1374,
        3,64,32,0,1373,1372,1,0,0,0,1374,1377,1,0,0,0,1375,1373,1,0,0,0,
        1375,1376,1,0,0,0,1376,1378,1,0,0,0,1377,1375,1,0,0,0,1378,1379,
        5,3,0,0,1379,215,1,0,0,0,1380,1381,5,2,0,0,1381,1382,5,92,0,0,1382,
        1386,3,278,139,0,1383,1385,3,64,32,0,1384,1383,1,0,0,0,1385,1388,
        1,0,0,0,1386,1384,1,0,0,0,1386,1387,1,0,0,0,1387,1389,1,0,0,0,1388,
        1386,1,0,0,0,1389,1390,5,3,0,0,1390,217,1,0,0,0,1391,1392,5,2,0,
        0,1392,1393,5,93,0,0,1393,1397,3,278,139,0,1394,1396,3,64,32,0,1395,
        1394,1,0,0,0,1396,1399,1,0,0,0,1397,1395,1,0,0,0,1397,1398,1,0,0,
        0,1398,1400,1,0,0,0,1399,1397,1,0,0,0,1400,1401,5,3,0,0,1401,219,
        1,0,0,0,1402,1403,5,2,0,0,1403,1404,5,90,0,0,1404,1408,3,278,139,
        0,1405,1407,3,64,32,0,1406,1405,1,0,0,0,1407,1410,1,0,0,0,1408,1406,
        1,0,0,0,1408,1409,1,0,0,0,1409,1411,1,0,0,0,1410,1408,1,0,0,0,1411,
        1412,5,3,0,0,1412,221,1,0,0,0,1413,1414,5,2,0,0,1414,1415,5,96,0,
        0,1415,1416,3,196,98,0,1416,1417,5,3,0,0,1417,223,1,0,0,0,1418,1419,
        5,2,0,0,1419,1421,5,95,0,0,1420,1422,3,196,98,0,1421,1420,1,0,0,
        0,1421,1422,1,0,0,0,1422,1423,1,0,0,0,1423,1424,5,3,0,0,1424,225,
        1,0,0,0,1425,1426,5,2,0,0,1426,1427,5,94,0,0,1427,1428,3,196,98,
        0,1428,1429,5,3,0,0,1429,227,1,0,0,0,1430,1431,5,2,0,0,1431,1432,
        5,15,0,0,1432,1433,3,196,98,0,1433,1437,3,196,98,0,1434,1436,3,196,
        98,0,1435,1434,1,0,0,0,1436,1439,1,0,0,0,1437,1435,1,0,0,0,1437,
        1438,1,0,0,0,1438,1440,1,0,0,0,1439,1437,1,0,0,0,1440,1441,5,3,0,
        0,1441,229,1,0,0,0,1442,1443,5,2,0,0,1443,1444,5,16,0,0,1444,1445,
        3,196,98,0,1445,1449,3,196,98,0,1446,1448,3,196,98,0,1447,1446,1,
        0,0,0,1448,1451,1,0,0,0,1449,1447,1,0,0,0,1449,1450,1,0,0,0,1450,
        1452,1,0,0,0,1451,1449,1,0,0,0,1452,1453,5,3,0,0,1453,231,1,0,0,
        0,1454,1455,5,2,0,0,1455,1456,5,26,0,0,1456,1457,3,196,98,0,1457,
        1458,3,196,98,0,1458,1459,3,196,98,0,1459,1460,5,3,0,0,1460,233,
        1,0,0,0,1461,1462,5,2,0,0,1462,1464,5,27,0,0,1463,1465,3,236,118,
        0,1464,1463,1,0,0,0,1465,1466,1,0,0,0,1466,1464,1,0,0,0,1466,1467,
        1,0,0,0,1467,1469,1,0,0,0,1468,1470,3,238,119,0,1469,1468,1,0,0,
        0,1469,1470,1,0,0,0,1470,1471,1,0,0,0,1471,1472,5,3,0,0,1472,235,
        1,0,0,0,1473,1474,3,196,98,0,1474,1475,3,196,98,0,1475,237,1,0,0,
        0,1476,1477,5,106,0,0,1477,1478,3,196,98,0,1478,239,1,0,0,0,1479,
        1480,5,2,0,0,1480,1481,5,40,0,0,1481,1483,5,124,0,0,1482,1484,3,
        276,138,0,1483,1482,1,0,0,0,1483,1484,1,0,0,0,1484,1488,1,0,0,0,
        1485,1487,3,196,98,0,1486,1485,1,0,0,0,1487,1490,1,0,0,0,1488,1486,
        1,0,0,0,1488,1489,1,0,0,0,1489,1491,1,0,0,0,1490,1488,1,0,0,0,1491,
        1492,5,3,0,0,1492,241,1,0,0,0,1493,1494,5,2,0,0,1494,1498,5,28,0,
        0,1495,1497,3,244,122,0,1496,1495,1,0,0,0,1497,1500,1,0,0,0,1498,
        1496,1,0,0,0,1498,1499,1,0,0,0,1499,1501,1,0,0,0,1500,1498,1,0,0,
        0,1501,1502,5,3,0,0,1502,243,1,0,0,0,1503,1504,5,2,0,0,1504,1505,
        3,252,126,0,1505,1506,3,196,98,0,1506,1507,5,3,0,0,1507,1517,1,0,
        0,0,1508,1509,5,2,0,0,1509,1510,3,252,126,0,1510,1511,3,246,123,
        0,1511,1512,5,3,0,0,1512,1517,1,0,0,0,1513,1514,5,2,0,0,1514,1515,
        5,124,0,0,1515,1517,5,3,0,0,1516,1503,1,0,0,0,1516,1508,1,0,0,0,
        1516,1513,1,0,0,0,1517,245,1,0,0,0,1518,1519,5,2,0,0,1519,1520,5,
        14,0,0,1520,1524,3,278,139,0,1521,1523,3,64,32,0,1522,1521,1,0,0,
        0,1523,1526,1,0,0,0,1524,1522,1,0,0,0,1524,1525,1,0,0,0,1525,1527,
        1,0,0,0,1526,1524,1,0,0,0,1527,1528,5,3,0,0,1528,247,1,0,0,0,1529,
        1530,5,2,0,0,1530,1534,5,30,0,0,1531,1533,3,196,98,0,1532,1531,1,
        0,0,0,1533,1536,1,0,0,0,1534,1532,1,0,0,0,1534,1535,1,0,0,0,1535,
        1537,1,0,0,0,1536,1534,1,0,0,0,1537,1538,5,3,0,0,1538,249,1,0,0,
        0,1539,1540,5,2,0,0,1540,1543,5,74,0,0,1541,1544,5,120,0,0,1542,
        1544,3,196,98,0,1543,1541,1,0,0,0,1543,1542,1,0,0,0,1544,1545,1,
        0,0,0,1545,1543,1,0,0,0,1545,1546,1,0,0,0,1546,1547,1,0,0,0,1547,
        1548,5,3,0,0,1548,251,1,0,0,0,1549,1550,7,4,0,0,1550,253,1,0,0,0,
        1551,1552,5,2,0,0,1552,1553,5,33,0,0,1553,1554,3,196,98,0,1554,1555,
        3,252,126,0,1555,1556,5,3,0,0,1556,255,1,0,0,0,1557,1558,5,2,0,0,
        1558,1559,5,34,0,0,1559,1560,3,196,98,0,1560,1561,3,196,98,0,1561,
        1562,5,3,0,0,1562,257,1,0,0,0,1563,1564,5,2,0,0,1564,1565,7,5,0,
        0,1565,1566,3,260,130,0,1566,1567,5,3,0,0,1567,259,1,0,0,0,1568,
        1569,3,262,131,0,1569,261,1,0,0,0,1570,1571,5,2,0,0,1571,1572,5,
        39,0,0,1572,1573,3,196,98,0,1573,1574,5,3,0,0,1574,1590,1,0,0,0,
        1575,1576,5,2,0,0,1576,1577,5,38,0,0,1577,1578,3,196,98,0,1578,1579,
        5,3,0,0,1579,1590,1,0,0,0,1580,1584,5,2,0,0,1581,1583,3,262,131,
        0,1582,1581,1,0,0,0,1583,1586,1,0,0,0,1584,1582,1,0,0,0,1584,1585,
        1,0,0,0,1585,1587,1,0,0,0,1586,1584,1,0,0,0,1587,1590,5,3,0,0,1588,
        1590,8,6,0,0,1589,1570,1,0,0,0,1589,1575,1,0,0,0,1589,1580,1,0,0,
        0,1589,1588,1,0,0,0,1590,263,1,0,0,0,1591,1592,5,2,0,0,1592,1593,
        5,39,0,0,1593,1594,3,196,98,0,1594,1595,5,3,0,0,1595,265,1,0,0,0,
        1596,1597,5,2,0,0,1597,1598,5,38,0,0,1598,1599,3,196,98,0,1599,1600,
        5,3,0,0,1600,267,1,0,0,0,1601,1602,5,2,0,0,1602,1603,5,32,0,0,1603,
        1604,3,196,98,0,1604,1605,3,252,126,0,1605,1606,5,3,0,0,1606,269,
        1,0,0,0,1607,1608,5,2,0,0,1608,1609,5,31,0,0,1609,1610,3,196,98,
        0,1610,1611,3,196,98,0,1611,1612,5,3,0,0,1612,271,1,0,0,0,1613,1614,
        5,2,0,0,1614,1615,5,35,0,0,1615,1616,3,196,98,0,1616,1617,3,196,
        98,0,1617,1618,5,3,0,0,1618,273,1,0,0,0,1619,1620,5,2,0,0,1620,1622,
        3,196,98,0,1621,1623,3,276,138,0,1622,1621,1,0,0,0,1622,1623,1,0,
        0,0,1623,1627,1,0,0,0,1624,1626,3,196,98,0,1625,1624,1,0,0,0,1626,
        1629,1,0,0,0,1627,1625,1,0,0,0,1627,1628,1,0,0,0,1628,1630,1,0,0,
        0,1629,1627,1,0,0,0,1630,1631,5,3,0,0,1631,275,1,0,0,0,1632,1633,
        5,2,0,0,1633,1635,5,78,0,0,1634,1636,3,120,60,0,1635,1634,1,0,0,
        0,1636,1637,1,0,0,0,1637,1635,1,0,0,0,1637,1638,1,0,0,0,1638,1639,
        1,0,0,0,1639,1640,5,3,0,0,1640,277,1,0,0,0,1641,1658,5,2,0,0,1642,
        1649,3,280,140,0,1643,1645,5,4,0,0,1644,1643,1,0,0,0,1644,1645,1,
        0,0,0,1645,1646,1,0,0,0,1646,1648,3,280,140,0,1647,1644,1,0,0,0,
        1648,1651,1,0,0,0,1649,1647,1,0,0,0,1649,1650,1,0,0,0,1650,1656,
        1,0,0,0,1651,1649,1,0,0,0,1652,1654,5,4,0,0,1653,1652,1,0,0,0,1653,
        1654,1,0,0,0,1654,1655,1,0,0,0,1655,1657,3,282,141,0,1656,1653,1,
        0,0,0,1656,1657,1,0,0,0,1657,1659,1,0,0,0,1658,1642,1,0,0,0,1658,
        1659,1,0,0,0,1659,1660,1,0,0,0,1660,1663,5,3,0,0,1661,1662,5,89,
        0,0,1662,1664,3,120,60,0,1663,1661,1,0,0,0,1663,1664,1,0,0,0,1664,
        1673,1,0,0,0,1665,1666,5,2,0,0,1666,1667,3,282,141,0,1667,1670,5,
        3,0,0,1668,1669,5,89,0,0,1669,1671,3,120,60,0,1670,1668,1,0,0,0,
        1670,1671,1,0,0,0,1671,1673,1,0,0,0,1672,1641,1,0,0,0,1672,1665,
        1,0,0,0,1673,279,1,0,0,0,1674,1675,5,2,0,0,1675,1678,5,124,0,0,1676,
        1677,5,89,0,0,1677,1679,3,120,60,0,1678,1676,1,0,0,0,1678,1679,1,
        0,0,0,1679,1680,1,0,0,0,1680,1681,5,3,0,0,1681,281,1,0,0,0,1682,
        1683,5,2,0,0,1683,1684,5,75,0,0,1684,1687,5,124,0,0,1685,1686,5,
        89,0,0,1686,1688,3,120,60,0,1687,1685,1,0,0,0,1687,1688,1,0,0,0,
        1688,1689,1,0,0,0,1689,1690,5,3,0,0,1690,283,1,0,0,0,1691,1692,7,
        7,0,0,1692,285,1,0,0,0,134,291,309,318,327,342,355,366,378,392,401,
        404,414,424,432,441,446,449,452,462,466,469,484,493,504,513,520,
        524,534,544,552,562,574,582,592,600,612,617,621,628,633,636,644,
        666,674,681,698,705,721,731,741,749,761,777,786,797,830,837,844,
        854,874,884,902,911,931,938,947,961,976,981,987,997,1007,1016,1021,
        1067,1077,1088,1094,1101,1110,1117,1120,1146,1154,1158,1168,1178,
        1191,1203,1215,1227,1237,1242,1245,1255,1265,1306,1317,1328,1350,
        1358,1364,1375,1386,1397,1408,1421,1437,1449,1466,1469,1483,1488,
        1498,1516,1524,1534,1543,1545,1584,1589,1622,1627,1637,1644,1649,
        1653,1656,1658,1663,1670,1672,1678,1687
    ];

    private static __ATN: antlr.ATN;
    public static get _ATN(): antlr.ATN {
        if (!Stage8Parser.__ATN) {
            Stage8Parser.__ATN = new antlr.ATNDeserializer().deserialize(Stage8Parser._serializedATN);
        }

        return Stage8Parser.__ATN;
    }


    private static readonly vocabulary = new antlr.Vocabulary(Stage8Parser.literalNames, Stage8Parser.symbolicNames, []);

    public override get vocabulary(): antlr.Vocabulary {
        return Stage8Parser.vocabulary;
    }

    private static readonly decisionsToDFA = Stage8Parser._ATN.decisionToState.map( (ds: antlr.DecisionState, index: number) => new antlr.DFA(ds, index) );
}

export class ProgramContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public PROGRAM(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.PROGRAM, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
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
        return Stage8Parser.RULE_program;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterProgram) {
             listener.enterProgram(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
    public macroImport(): MacroImportContext | null {
        return this.getRuleContext(0, MacroImportContext);
    }
    public macroExport(): MacroExportContext | null {
        return this.getRuleContext(0, MacroExportContext);
    }
    public topLevelLet(): TopLevelLetContext | null {
        return this.getRuleContext(0, TopLevelLetContext);
    }
    public topLevelConst(): TopLevelConstContext | null {
        return this.getRuleContext(0, TopLevelConstContext);
    }
    public fn(): FnContext | null {
        return this.getRuleContext(0, FnContext);
    }
    public typeAlias(): TypeAliasContext | null {
        return this.getRuleContext(0, TypeAliasContext);
    }
    public interfaceDef(): InterfaceDefContext | null {
        return this.getRuleContext(0, InterfaceDefContext);
    }
    public enumDef(): EnumDefContext | null {
        return this.getRuleContext(0, EnumDefContext);
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
        return Stage8Parser.RULE_topLevel;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterTopLevel) {
             listener.enterTopLevel(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
    public fn(): FnContext | null {
        return this.getRuleContext(0, FnContext);
    }
    public classDef(): ClassDefContext | null {
        return this.getRuleContext(0, ClassDefContext);
    }
    public interfaceDef(): InterfaceDefContext | null {
        return this.getRuleContext(0, InterfaceDefContext);
    }
    public enumDef(): EnumDefContext | null {
        return this.getRuleContext(0, EnumDefContext);
    }
    public typeAlias(): TypeAliasContext | null {
        return this.getRuleContext(0, TypeAliasContext);
    }
    public override get ruleIndex(): number {
        return Stage8Parser.RULE_decl;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterDecl) {
             listener.enterDecl(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public DEFMACRO(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.DEFMACRO, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.IDENTIFIER, 0)!;
    }
    public fnSignature(): FnSignatureContext {
        return this.getRuleContext(0, FnSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
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
        return Stage8Parser.RULE_defmacro;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterDefmacro) {
             listener.enterDefmacro(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public MACRO_TIME_ATTR(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.MACRO_TIME_ATTR, 0)!;
    }
    public topLevelLet(): TopLevelLetContext | null {
        return this.getRuleContext(0, TopLevelLetContext);
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
    }
    public topLevelConst(): TopLevelConstContext | null {
        return this.getRuleContext(0, TopLevelConstContext);
    }
    public override get ruleIndex(): number {
        return Stage8Parser.RULE_macroTimeFnDef;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterMacroTimeFnDef) {
             listener.enterMacroTimeFnDef(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
        if(listener.exitMacroTimeFnDef) {
             listener.exitMacroTimeFnDef(this);
        }
    }
}


export class MacroImportContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public MACRO_IMPORT(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.MACRO_IMPORT, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.IDENTIFIER, 0)!;
    }
    public STRING(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.STRING, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage8Parser.RULE_macroImport;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterMacroImport) {
             listener.enterMacroImport(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
        if(listener.exitMacroImport) {
             listener.exitMacroImport(this);
        }
    }
}


export class MacroExportContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public MACRO_EXPORT(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.MACRO_EXPORT, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
    }
    public macroExportSpec(): MacroExportSpecContext[];
    public macroExportSpec(i: number): MacroExportSpecContext | null;
    public macroExportSpec(i?: number): MacroExportSpecContext[] | MacroExportSpecContext | null {
        if (i === undefined) {
            return this.getRuleContexts(MacroExportSpecContext);
        }

        return this.getRuleContext(i, MacroExportSpecContext);
    }
    public override get ruleIndex(): number {
        return Stage8Parser.RULE_macroExport;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterMacroExport) {
             listener.enterMacroExport(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
        if(listener.exitMacroExport) {
             listener.exitMacroExport(this);
        }
    }
}


export class MacroExportSpecContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.IDENTIFIER, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage8Parser.RULE_macroExportSpec;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterMacroExportSpec) {
             listener.enterMacroExportSpec(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
        if(listener.exitMacroExportSpec) {
             listener.exitMacroExportSpec(this);
        }
    }
}


export class TopLevelLetContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public LET(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.LET, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.IDENTIFIER, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
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
        return Stage8Parser.RULE_topLevelLet;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterTopLevelLet) {
             listener.enterTopLevelLet(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public CONST(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.CONST, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.IDENTIFIER, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
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
        return Stage8Parser.RULE_topLevelConst;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterTopLevelConst) {
             listener.enterTopLevelConst(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.CARET, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.IDENTIFIER, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage8Parser.RULE_metaAnnotation;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterMetaAnnotation) {
             listener.enterMetaAnnotation(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public TYPE(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.TYPE, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.IDENTIFIER, 0)!;
    }
    public typeExpr(): TypeExprContext {
        return this.getRuleContext(0, TypeExprContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
    }
    public typeParams(): TypeParamsContext | null {
        return this.getRuleContext(0, TypeParamsContext);
    }
    public override get ruleIndex(): number {
        return Stage8Parser.RULE_typeAlias;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterTypeAlias) {
             listener.enterTypeAlias(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public INTERFACE(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.INTERFACE, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.IDENTIFIER, 0)!;
    }
    public typeObject(): TypeObjectContext {
        return this.getRuleContext(0, TypeObjectContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
    }
    public typeParams(): TypeParamsContext | null {
        return this.getRuleContext(0, TypeParamsContext);
    }
    public interfaceExtends(): InterfaceExtendsContext | null {
        return this.getRuleContext(0, InterfaceExtendsContext);
    }
    public override get ruleIndex(): number {
        return Stage8Parser.RULE_interfaceDef;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterInterfaceDef) {
             listener.enterInterfaceDef(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public EXTENDS(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.EXTENDS, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
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
        return Stage8Parser.RULE_interfaceExtends;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterInterfaceExtends) {
             listener.enterInterfaceExtends(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
        if(listener.exitInterfaceExtends) {
             listener.exitInterfaceExtends(this);
        }
    }
}


export class EnumDefContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public ENUM(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.ENUM, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
    }
    public enumMember(): EnumMemberContext[];
    public enumMember(i: number): EnumMemberContext | null;
    public enumMember(i?: number): EnumMemberContext[] | EnumMemberContext | null {
        if (i === undefined) {
            return this.getRuleContexts(EnumMemberContext);
        }

        return this.getRuleContext(i, EnumMemberContext);
    }
    public override get ruleIndex(): number {
        return Stage8Parser.RULE_enumDef;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterEnumDef) {
             listener.enterEnumDef(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
        if(listener.exitEnumDef) {
             listener.exitEnumDef(this);
        }
    }
}


export class EnumMemberContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
    }
    public NUMBER(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.NUMBER, 0);
    }
    public NEG_NUMBER(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.NEG_NUMBER, 0);
    }
    public STRING(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.STRING, 0);
    }
    public override get ruleIndex(): number {
        return Stage8Parser.RULE_enumMember;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterEnumMember) {
             listener.enterEnumMember(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
        if(listener.exitEnumMember) {
             listener.exitEnumMember(this);
        }
    }
}


export class ClassDefContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public CLASS(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.CLASS, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.IDENTIFIER, 0)!;
    }
    public classBody(): ClassBodyContext {
        return this.getRuleContext(0, ClassBodyContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
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
        return Stage8Parser.RULE_classDef;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterClassDef) {
             listener.enterClassDef(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public CLASS(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.CLASS, 0)!;
    }
    public classBody(): ClassBodyContext {
        return this.getRuleContext(0, ClassBodyContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
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
        return Stage8Parser.RULE_anonClassDef;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterAnonClassDef) {
             listener.enterAnonClassDef(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public EXTENDS(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.EXTENDS, 0)!;
    }
    public typeExpr(): TypeExprContext {
        return this.getRuleContext(0, TypeExprContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage8Parser.RULE_classExtends;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterClassExtends) {
             listener.enterClassExtends(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public IMPLEMENTS(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.IMPLEMENTS, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
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
        return Stage8Parser.RULE_classImplements;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterClassImplements) {
             listener.enterClassImplements(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public CLASS_BODY(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.CLASS_BODY, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
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
        return Stage8Parser.RULE_classBody;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterClassBody) {
             listener.enterClassBody(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return Stage8Parser.RULE_classElement;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterClassElement) {
             listener.enterClassElement(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
        if(listener.exitClassElement) {
             listener.exitClassElement(this);
        }
    }
}


export class ModifierContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public PUBLIC(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.PUBLIC, 0);
    }
    public PRIVATE(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.PRIVATE, 0);
    }
    public PROTECTED(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.PROTECTED, 0);
    }
    public STATIC(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.STATIC, 0);
    }
    public ABSTRACT(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.ABSTRACT, 0);
    }
    public OVERRIDE(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.OVERRIDE, 0);
    }
    public ASYNC(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.ASYNC, 0);
    }
    public GENERATOR(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.GENERATOR, 0);
    }
    public READONLY(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.READONLY, 0);
    }
    public override get ruleIndex(): number {
        return Stage8Parser.RULE_modifier;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterModifier) {
             listener.enterModifier(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
        if(listener.exitModifier) {
             listener.exitModifier(this);
        }
    }
}


export class FieldDefContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode[];
    public LPAREN(i: number): antlr.TerminalNode | null;
    public LPAREN(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage8Parser.LPAREN);
    	} else {
    		return this.getToken(Stage8Parser.LPAREN, i);
    	}
    }
    public FIELD(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.FIELD, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode[];
    public RPAREN(i: number): antlr.TerminalNode | null;
    public RPAREN(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage8Parser.RPAREN);
    	} else {
    		return this.getToken(Stage8Parser.RPAREN, i);
    	}
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
        return this.getToken(Stage8Parser.COLON, 0);
    }
    public typeExpr(): TypeExprContext | null {
        return this.getRuleContext(0, TypeExprContext);
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public override get ruleIndex(): number {
        return Stage8Parser.RULE_fieldDef;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterFieldDef) {
             listener.enterFieldDef(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public CONSTRUCTOR(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.CONSTRUCTOR, 0)!;
    }
    public fnSignatureTyped(): FnSignatureTypedContext {
        return this.getRuleContext(0, FnSignatureTypedContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
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
        return Stage8Parser.RULE_constructorDef;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterConstructorDef) {
             listener.enterConstructorDef(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public METHOD(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.METHOD, 0)!;
    }
    public methodKey(): MethodKeyContext {
        return this.getRuleContext(0, MethodKeyContext)!;
    }
    public fnSignatureTyped(): FnSignatureTypedContext {
        return this.getRuleContext(0, FnSignatureTypedContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
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
        return Stage8Parser.RULE_classMethodDef;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterClassMethodDef) {
             listener.enterClassMethodDef(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public ABSTRACT_METHOD(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.ABSTRACT_METHOD, 0)!;
    }
    public methodKey(): MethodKeyContext {
        return this.getRuleContext(0, MethodKeyContext)!;
    }
    public fnSignatureTyped(): FnSignatureTypedContext {
        return this.getRuleContext(0, FnSignatureTypedContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
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
        return Stage8Parser.RULE_abstractMethodDef;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterAbstractMethodDef) {
             listener.enterAbstractMethodDef(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public GET(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.GET, 0)!;
    }
    public methodKey(): MethodKeyContext {
        return this.getRuleContext(0, MethodKeyContext)!;
    }
    public fnSignatureTyped(): FnSignatureTypedContext {
        return this.getRuleContext(0, FnSignatureTypedContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
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
        return Stage8Parser.RULE_getterDef;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterGetterDef) {
             listener.enterGetterDef(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public SETPROP(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.SETPROP, 0)!;
    }
    public methodKey(): MethodKeyContext {
        return this.getRuleContext(0, MethodKeyContext)!;
    }
    public fnSignatureTyped(): FnSignatureTypedContext {
        return this.getRuleContext(0, FnSignatureTypedContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
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
        return Stage8Parser.RULE_setterDef;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterSetterDef) {
             listener.enterSetterDef(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.IDENTIFIER, 0);
    }
    public GET(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.GET, 0);
    }
    public SETPROP(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.SETPROP, 0);
    }
    public LBRACK(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.LBRACK, 0);
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public RBRACK(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.RBRACK, 0);
    }
    public override get ruleIndex(): number {
        return Stage8Parser.RULE_methodKey;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterMethodKey) {
             listener.enterMethodKey(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
    }
    public OPTIONAL(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.OPTIONAL, 0);
    }
    public COLON(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.COLON, 0);
    }
    public typeExpr(): TypeExprContext | null {
        return this.getRuleContext(0, TypeExprContext);
    }
    public override get ruleIndex(): number {
        return Stage8Parser.RULE_typedParam;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterTypedParam) {
             listener.enterTypedParam(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
    		return this.getTokens(Stage8Parser.LPAREN);
    	} else {
    		return this.getToken(Stage8Parser.LPAREN, i);
    	}
    }
    public RPAREN(): antlr.TerminalNode[];
    public RPAREN(i: number): antlr.TerminalNode | null;
    public RPAREN(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage8Parser.RPAREN);
    	} else {
    		return this.getToken(Stage8Parser.RPAREN, i);
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
        return this.getToken(Stage8Parser.RETURNS, 0);
    }
    public typeExpr(): TypeExprContext | null {
        return this.getRuleContext(0, TypeExprContext);
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage8Parser.COMMA);
    	} else {
    		return this.getToken(Stage8Parser.COMMA, i);
    	}
    }
    public override get ruleIndex(): number {
        return Stage8Parser.RULE_fnSignatureTyped;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterFnSignatureTyped) {
             listener.enterFnSignatureTyped(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return Stage8Parser.RULE_statement;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterStatement) {
             listener.enterStatement(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
    		return this.getTokens(Stage8Parser.LPAREN);
    	} else {
    		return this.getToken(Stage8Parser.LPAREN, i);
    	}
    }
    public LETSTAR(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.LETSTAR, 0)!;
    }
    public RPAREN(): antlr.TerminalNode[];
    public RPAREN(i: number): antlr.TerminalNode | null;
    public RPAREN(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage8Parser.RPAREN);
    	} else {
    		return this.getToken(Stage8Parser.RPAREN, i);
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
        return Stage8Parser.RULE_letStar;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterLetStar) {
             listener.enterLetStar(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public LET(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.LET, 0)!;
    }
    public singleBinding(): SingleBindingContext {
        return this.getRuleContext(0, SingleBindingContext)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage8Parser.RULE_letStmt;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterLetStmt) {
             listener.enterLetStmt(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
    		return this.getTokens(Stage8Parser.LPAREN);
    	} else {
    		return this.getToken(Stage8Parser.LPAREN, i);
    	}
    }
    public CONSTSTAR(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.CONSTSTAR, 0)!;
    }
    public RPAREN(): antlr.TerminalNode[];
    public RPAREN(i: number): antlr.TerminalNode | null;
    public RPAREN(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage8Parser.RPAREN);
    	} else {
    		return this.getToken(Stage8Parser.RPAREN, i);
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
        return Stage8Parser.RULE_constStar;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterConstStar) {
             listener.enterConstStar(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public CONST(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.CONST, 0)!;
    }
    public singleBinding(): SingleBindingContext {
        return this.getRuleContext(0, SingleBindingContext)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage8Parser.RULE_constStmt;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterConstStmt) {
             listener.enterConstStmt(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public IF(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.IF, 0)!;
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
        return this.getToken(Stage8Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage8Parser.RULE_ifForm;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterIfForm) {
             listener.enterIfForm(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public WHILE(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.WHILE, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
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
        return Stage8Parser.RULE_whileForm;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterWhileForm) {
             listener.enterWhileForm(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public BEGIN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.BEGIN, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
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
        return Stage8Parser.RULE_block;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterBlock) {
             listener.enterBlock(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public RETURN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RETURN, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public override get ruleIndex(): number {
        return Stage8Parser.RULE_returnForm;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterReturnForm) {
             listener.enterReturnForm(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public THROW(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.THROW, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage8Parser.RULE_throwForm;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterThrowForm) {
             listener.enterThrowForm(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public IMPORT(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.IMPORT, 0)!;
    }
    public STRING(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.STRING, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
    }
    public objectExpr(): ObjectExprContext | null {
        return this.getRuleContext(0, ObjectExprContext);
    }
    public override get ruleIndex(): number {
        return Stage8Parser.RULE_importForm;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterImportForm) {
             listener.enterImportForm(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public IMPORT_TYPE(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.IMPORT_TYPE, 0)!;
    }
    public importTypeSpec(): ImportTypeSpecContext {
        return this.getRuleContext(0, ImportTypeSpecContext)!;
    }
    public STRING(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.STRING, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage8Parser.RULE_importTypeForm;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterImportTypeForm) {
             listener.enterImportTypeForm(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
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
        return Stage8Parser.RULE_importTypeSpec;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterImportTypeSpec) {
             listener.enterImportTypeSpec(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
    		return this.getTokens(Stage8Parser.IDENTIFIER);
    	} else {
    		return this.getToken(Stage8Parser.IDENTIFIER, i);
    	}
    }
    public LPAREN(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.LPAREN, 0);
    }
    public RPAREN(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.RPAREN, 0);
    }
    public override get ruleIndex(): number {
        return Stage8Parser.RULE_importTypeName;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterImportTypeName) {
             listener.enterImportTypeName(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return Stage8Parser.RULE_exportForm;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterExportForm) {
             listener.enterExportForm(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public EXPORT(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.EXPORT, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.IDENTIFIER, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage8Parser.RULE_exportBinding;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterExportBinding) {
             listener.enterExportBinding(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public EXPORT_DEFAULT(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.EXPORT_DEFAULT, 0)!;
    }
    public classDef(): ClassDefContext | null {
        return this.getRuleContext(0, ClassDefContext);
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
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
        return Stage8Parser.RULE_exportDefault;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterExportDefault) {
             listener.enterExportDefault(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public EXPORT_NAMED(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.EXPORT_NAMED, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
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
        return Stage8Parser.RULE_exportNamed;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterExportNamed) {
             listener.enterExportNamed(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode[];
    public IDENTIFIER(i: number): antlr.TerminalNode | null;
    public IDENTIFIER(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage8Parser.IDENTIFIER);
    	} else {
    		return this.getToken(Stage8Parser.IDENTIFIER, i);
    	}
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage8Parser.RULE_exportNamePair;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterExportNamePair) {
             listener.enterExportNamePair(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public EXPORT_FROM(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.EXPORT_FROM, 0)!;
    }
    public STRING(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.STRING, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
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
        return Stage8Parser.RULE_exportFrom;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterExportFrom) {
             listener.enterExportFrom(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public EXPORT_ALL_FROM(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.EXPORT_ALL_FROM, 0)!;
    }
    public STRING(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.STRING, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage8Parser.RULE_exportAllFrom;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterExportAllFrom) {
             listener.enterExportAllFrom(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public EXPORT_NS_FROM(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.EXPORT_NS_FROM, 0)!;
    }
    public STRING(): antlr.TerminalNode[];
    public STRING(i: number): antlr.TerminalNode | null;
    public STRING(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage8Parser.STRING);
    	} else {
    		return this.getToken(Stage8Parser.STRING, i);
    	}
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage8Parser.RULE_exportNsFromForm;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterExportNsFromForm) {
             listener.enterExportNsFromForm(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public EXPORT_TYPE(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.EXPORT_TYPE, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
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
        return Stage8Parser.RULE_exportTypeForm;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterExportTypeForm) {
             listener.enterExportTypeForm(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public EXPORT_TYPE_FROM(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.EXPORT_TYPE_FROM, 0)!;
    }
    public STRING(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.STRING, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
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
        return Stage8Parser.RULE_exportTypeFromForm;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterExportTypeFromForm) {
             listener.enterExportTypeFromForm(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public EXPORT_TYPE_ALL_FROM(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.EXPORT_TYPE_ALL_FROM, 0)!;
    }
    public STRING(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.STRING, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage8Parser.RULE_exportTypeAllFromForm;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterExportTypeAllFromForm) {
             listener.enterExportTypeAllFromForm(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public EXPORT(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.EXPORT, 0)!;
    }
    public decl(): DeclContext {
        return this.getRuleContext(0, DeclContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage8Parser.RULE_exportDeclForm;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterExportDeclForm) {
             listener.enterExportDeclForm(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.IDENTIFIER, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
    }
    public COLON(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.COLON, 0);
    }
    public typeExpr(): TypeExprContext | null {
        return this.getRuleContext(0, TypeExprContext);
    }
    public override get ruleIndex(): number {
        return Stage8Parser.RULE_starBinding;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterStarBinding) {
             listener.enterStarBinding(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
    }
    public COLON(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.COLON, 0);
    }
    public typeExpr(): TypeExprContext | null {
        return this.getRuleContext(0, TypeExprContext);
    }
    public override get ruleIndex(): number {
        return Stage8Parser.RULE_singleBinding;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterSingleBinding) {
             listener.enterSingleBinding(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.IDENTIFIER, 0);
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
        return Stage8Parser.RULE_typeExpr;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterTypeExpr) {
             listener.enterTypeExpr(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public UNION(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.UNION, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
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
        return Stage8Parser.RULE_typeUnion;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterTypeUnion) {
             listener.enterTypeUnion(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public INTERSECT(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.INTERSECT, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
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
        return Stage8Parser.RULE_typeIntersection;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterTypeIntersection) {
             listener.enterTypeIntersection(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public TYPE_ARRAY(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.TYPE_ARRAY, 0)!;
    }
    public typeExpr(): TypeExprContext {
        return this.getRuleContext(0, TypeExprContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage8Parser.RULE_typeArray;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterTypeArray) {
             listener.enterTypeArray(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public TUPLE(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.TUPLE, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
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
        return Stage8Parser.RULE_typeTuple;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterTypeTuple) {
             listener.enterTypeTuple(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0);
    }
    public REST(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.REST, 0);
    }
    public typeExpr(): TypeExprContext {
        return this.getRuleContext(0, TypeExprContext)!;
    }
    public RPAREN(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.RPAREN, 0);
    }
    public IDENTIFIER(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.IDENTIFIER, 0);
    }
    public override get ruleIndex(): number {
        return Stage8Parser.RULE_typeTupleElement;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterTypeTupleElement) {
             listener.enterTypeTupleElement(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
    		return this.getTokens(Stage8Parser.LPAREN);
    	} else {
    		return this.getToken(Stage8Parser.LPAREN, i);
    	}
    }
    public TYPEFN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.TYPEFN, 0)!;
    }
    public RPAREN(): antlr.TerminalNode[];
    public RPAREN(i: number): antlr.TerminalNode | null;
    public RPAREN(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage8Parser.RPAREN);
    	} else {
    		return this.getToken(Stage8Parser.RPAREN, i);
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
        return Stage8Parser.RULE_typeFunction;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterTypeFunction) {
             listener.enterTypeFunction(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.IDENTIFIER, 0)!;
    }
    public typeExpr(): TypeExprContext {
        return this.getRuleContext(0, TypeExprContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
    }
    public OPTIONAL(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.OPTIONAL, 0);
    }
    public override get ruleIndex(): number {
        return Stage8Parser.RULE_typeFnParam;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterTypeFnParam) {
             listener.enterTypeFnParam(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
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
        return Stage8Parser.RULE_typeObject;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterTypeObject) {
             listener.enterTypeObject(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.IDENTIFIER, 0)!;
    }
    public typeExpr(): TypeExprContext {
        return this.getRuleContext(0, TypeExprContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
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
        return this.getToken(Stage8Parser.OPTIONAL, 0);
    }
    public override get ruleIndex(): number {
        return Stage8Parser.RULE_typeProp;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterTypeProp) {
             listener.enterTypeProp(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.READONLY, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage8Parser.RULE_propModifier;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterPropModifier) {
             listener.enterPropModifier(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public LIT(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.LIT, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
    }
    public STRING(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.STRING, 0);
    }
    public NUMBER(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.NUMBER, 0);
    }
    public BOOLEAN(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.BOOLEAN, 0);
    }
    public override get ruleIndex(): number {
        return Stage8Parser.RULE_typeLiteral;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterTypeLiteral) {
             listener.enterTypeLiteral(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public KEYOF(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.KEYOF, 0)!;
    }
    public typeExpr(): TypeExprContext {
        return this.getRuleContext(0, TypeExprContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage8Parser.RULE_typeKeyof;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterTypeKeyof) {
             listener.enterTypeKeyof(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public TYPEOF(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.TYPEOF, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage8Parser.RULE_typeTypeof;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterTypeTypeof) {
             listener.enterTypeTypeof(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public INDEX(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.INDEX, 0)!;
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
        return this.getToken(Stage8Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage8Parser.RULE_typeIndexAccess;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterTypeIndexAccess) {
             listener.enterTypeIndexAccess(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public COND(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.COND, 0)!;
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
        return this.getToken(Stage8Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage8Parser.RULE_typeConditional;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterTypeConditional) {
             listener.enterTypeConditional(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public INFER(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.INFER, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage8Parser.RULE_typeInfer;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterTypeInfer) {
             listener.enterTypeInfer(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public MAPPED(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.MAPPED, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.IDENTIFIER, 0)!;
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
        return this.getToken(Stage8Parser.RPAREN, 0)!;
    }
    public mappedModifiers(): MappedModifiersContext | null {
        return this.getRuleContext(0, MappedModifiersContext);
    }
    public override get ruleIndex(): number {
        return Stage8Parser.RULE_typeMapped;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterTypeMapped) {
             listener.enterTypeMapped(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public MODIFIERS(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.MODIFIERS, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
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
        return Stage8Parser.RULE_mappedModifiers;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterMappedModifiers) {
             listener.enterMappedModifiers(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.READONLY, 0);
    }
    public OPTIONAL(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.OPTIONAL, 0);
    }
    public override get ruleIndex(): number {
        return Stage8Parser.RULE_mappedModifier;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterMappedModifier) {
             listener.enterMappedModifier(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public TYPE_TEMPLATE(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.TYPE_TEMPLATE, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
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
        return Stage8Parser.RULE_typeTemplateLiteral;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterTypeTemplateLiteral) {
             listener.enterTypeTemplateLiteral(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.STRING, 0);
    }
    public typeExpr(): TypeExprContext | null {
        return this.getRuleContext(0, TypeExprContext);
    }
    public override get ruleIndex(): number {
        return Stage8Parser.RULE_templatePart;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterTemplatePart) {
             listener.enterTemplatePart(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
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
        return this.getToken(Stage8Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage8Parser.RULE_typeApplication;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterTypeApplication) {
             listener.enterTypeApplication(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public TYPE_PARAMS(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.TYPE_PARAMS, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
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
        return Stage8Parser.RULE_typeParams;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterTypeParams) {
             listener.enterTypeParams(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
        if(listener.exitTypeParams) {
             listener.exitTypeParams(this);
        }
    }
}


export class TypeParamDeclContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
    }
    public typeParamConstraint(): TypeParamConstraintContext | null {
        return this.getRuleContext(0, TypeParamConstraintContext);
    }
    public typeParamDefault(): TypeParamDefaultContext | null {
        return this.getRuleContext(0, TypeParamDefaultContext);
    }
    public override get ruleIndex(): number {
        return Stage8Parser.RULE_typeParamDecl;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterTypeParamDecl) {
             listener.enterTypeParamDecl(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public EXTENDS(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.EXTENDS, 0)!;
    }
    public typeExpr(): TypeExprContext {
        return this.getRuleContext(0, TypeExprContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage8Parser.RULE_typeParamConstraint;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterTypeParamConstraint) {
             listener.enterTypeParamConstraint(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public DEFAULT(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.DEFAULT, 0)!;
    }
    public typeExpr(): TypeExprContext {
        return this.getRuleContext(0, TypeExprContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage8Parser.RULE_typeParamDefault;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterTypeParamDefault) {
             listener.enterTypeParamDefault(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public SET(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.SET, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.IDENTIFIER, 0);
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
    }
    public propAccess(): PropAccessContext | null {
        return this.getRuleContext(0, PropAccessContext);
    }
    public override get ruleIndex(): number {
        return Stage8Parser.RULE_assign;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterAssign) {
             listener.enterAssign(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public SWITCH(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.SWITCH, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
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
        return Stage8Parser.RULE_switchForm;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterSwitchForm) {
             listener.enterSwitchForm(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public CASE(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.CASE, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
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
        return Stage8Parser.RULE_caseClause;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterCaseClause) {
             listener.enterCaseClause(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public DEFAULT(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.DEFAULT, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
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
        return Stage8Parser.RULE_defaultClause;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterDefaultClause) {
             listener.enterDefaultClause(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public FOR(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.FOR, 0)!;
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
        return this.getToken(Stage8Parser.RPAREN, 0)!;
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
        return Stage8Parser.RULE_forForm;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterForForm) {
             listener.enterForForm(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public FORIN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.FORIN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.IDENTIFIER, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
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
        return Stage8Parser.RULE_forInForm;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterForInForm) {
             listener.enterForInForm(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public FOROF(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.FOROF, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.IDENTIFIER, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
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
        return Stage8Parser.RULE_forOfForm;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterForOfForm) {
             listener.enterForOfForm(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public FORAWAIT(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.FORAWAIT, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.IDENTIFIER, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
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
        return Stage8Parser.RULE_forAwaitForm;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterForAwaitForm) {
             listener.enterForAwaitForm(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public TRY(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.TRY, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
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
        return Stage8Parser.RULE_tryForm;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterTryForm) {
             listener.enterTryForm(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public CATCH(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.CATCH, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
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
        return Stage8Parser.RULE_catchClause;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterCatchClause) {
             listener.enterCatchClause(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public FINALLY(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.FINALLY, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
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
        return Stage8Parser.RULE_finallyClause;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterFinallyClause) {
             listener.enterFinallyClause(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
    public IDENTIFIER(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.IDENTIFIER, 0);
    }
    public MACRO_ERROR(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.MACRO_ERROR, 0);
    }
    public MINUS(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.MINUS, 0);
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
        return Stage8Parser.RULE_expression;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterExpression) {
             listener.enterExpression(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.THIS, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage8Parser.RULE_thisExpr;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterThisExpr) {
             listener.enterThisExpr(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.SUPER, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage8Parser.RULE_superExpr;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterSuperExpr) {
             listener.enterSuperExpr(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public SUPER(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.SUPER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
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
        return Stage8Parser.RULE_superConstructorCall;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterSuperConstructorCall) {
             listener.enterSuperConstructorCall(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public SUPER_METHOD(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.SUPER_METHOD, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
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
        return Stage8Parser.RULE_superMethodCall;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterSuperMethodCall) {
             listener.enterSuperMethodCall(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public TYPEOF(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.TYPEOF, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage8Parser.RULE_typeofExpr;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterTypeofExpr) {
             listener.enterTypeofExpr(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public TYPE_AS(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.TYPE_AS, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public typeExpr(): TypeExprContext {
        return this.getRuleContext(0, TypeExprContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage8Parser.RULE_typeAssert;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterTypeAssert) {
             listener.enterTypeAssert(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public LAMBDA(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.LAMBDA, 0)!;
    }
    public fnSignature(): FnSignatureContext {
        return this.getRuleContext(0, FnSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
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
        return Stage8Parser.RULE_lambda;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterLambda) {
             listener.enterLambda(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public FN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.FN, 0)!;
    }
    public fnSignature(): FnSignatureContext {
        return this.getRuleContext(0, FnSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.IDENTIFIER, 0);
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
        return Stage8Parser.RULE_fn;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterFn) {
             listener.enterFn(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public ASYNC_LAMBDA(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.ASYNC_LAMBDA, 0)!;
    }
    public fnSignature(): FnSignatureContext {
        return this.getRuleContext(0, FnSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
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
        return Stage8Parser.RULE_asyncLambda;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterAsyncLambda) {
             listener.enterAsyncLambda(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public ASYNC_FN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.ASYNC_FN, 0)!;
    }
    public fnSignature(): FnSignatureContext {
        return this.getRuleContext(0, FnSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
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
        return Stage8Parser.RULE_asyncFn;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterAsyncFn) {
             listener.enterAsyncFn(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public GENERATOR_FN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.GENERATOR_FN, 0)!;
    }
    public fnSignature(): FnSignatureContext {
        return this.getRuleContext(0, FnSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
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
        return Stage8Parser.RULE_generatorFn;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterGeneratorFn) {
             listener.enterGeneratorFn(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public ASYNC_GENERATOR_FN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.ASYNC_GENERATOR_FN, 0)!;
    }
    public fnSignature(): FnSignatureContext {
        return this.getRuleContext(0, FnSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
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
        return Stage8Parser.RULE_asyncGeneratorFn;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterAsyncGeneratorFn) {
             listener.enterAsyncGeneratorFn(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public AWAIT(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.AWAIT, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage8Parser.RULE_awaitExpr;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterAwaitExpr) {
             listener.enterAwaitExpr(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public YIELD(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.YIELD, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public override get ruleIndex(): number {
        return Stage8Parser.RULE_yieldExpr;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterYieldExpr) {
             listener.enterYieldExpr(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public YIELD_STAR(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.YIELD_STAR, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage8Parser.RULE_yieldStarExpr;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterYieldStarExpr) {
             listener.enterYieldStarExpr(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public BIND(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.BIND, 0)!;
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
        return this.getToken(Stage8Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage8Parser.RULE_bindExpr;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterBindExpr) {
             listener.enterBindExpr(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public METHOD_CALL(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.METHOD_CALL, 0)!;
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
        return this.getToken(Stage8Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage8Parser.RULE_methodCallExpr;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterMethodCallExpr) {
             listener.enterMethodCallExpr(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public TERNARY(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.TERNARY, 0)!;
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
        return this.getToken(Stage8Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage8Parser.RULE_ternary;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterTernary) {
             listener.enterTernary(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public COND(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.COND, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
    }
    public condClause(): CondClauseContext[];
    public condClause(i: number): CondClauseContext | null;
    public condClause(i?: number): CondClauseContext[] | CondClauseContext | null {
        if (i === undefined) {
            return this.getRuleContexts(CondClauseContext);
        }

        return this.getRuleContext(i, CondClauseContext);
    }
    public condElseClause(): CondElseClauseContext | null {
        return this.getRuleContext(0, CondElseClauseContext);
    }
    public override get ruleIndex(): number {
        return Stage8Parser.RULE_condExpr;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterCondExpr) {
             listener.enterCondExpr(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
        if(listener.exitCondExpr) {
             listener.exitCondExpr(this);
        }
    }
}


export class CondClauseContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
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
        return Stage8Parser.RULE_condClause;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterCondClause) {
             listener.enterCondClause(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
        if(listener.exitCondClause) {
             listener.exitCondClause(this);
        }
    }
}


export class CondElseClauseContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public ELSE(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.ELSE, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public override get ruleIndex(): number {
        return Stage8Parser.RULE_condElseClause;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterCondElseClause) {
             listener.enterCondElseClause(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
        if(listener.exitCondElseClause) {
             listener.exitCondElseClause(this);
        }
    }
}


export class NewFormContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public NEW(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.NEW, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
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
        return Stage8Parser.RULE_newForm;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterNewForm) {
             listener.enterNewForm(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public OBJECT(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.OBJECT, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
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
        return Stage8Parser.RULE_objectExpr;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterObjectExpr) {
             listener.enterObjectExpr(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public propKey(): PropKeyContext | null {
        return this.getRuleContext(0, PropKeyContext);
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
    }
    public methodDef(): MethodDefContext | null {
        return this.getRuleContext(0, MethodDefContext);
    }
    public IDENTIFIER(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.IDENTIFIER, 0);
    }
    public override get ruleIndex(): number {
        return Stage8Parser.RULE_objectField;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterObjectField) {
             listener.enterObjectField(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public METHOD(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.METHOD, 0)!;
    }
    public fnSignature(): FnSignatureContext {
        return this.getRuleContext(0, FnSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
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
        return Stage8Parser.RULE_methodDef;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterMethodDef) {
             listener.enterMethodDef(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public ARRAY(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.ARRAY, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
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
        return Stage8Parser.RULE_arrayExpr;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterArrayExpr) {
             listener.enterArrayExpr(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public TEMPLATE(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.TEMPLATE, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
    }
    public STRING(): antlr.TerminalNode[];
    public STRING(i: number): antlr.TerminalNode | null;
    public STRING(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage8Parser.STRING);
    	} else {
    		return this.getToken(Stage8Parser.STRING, i);
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
        return Stage8Parser.RULE_templateExpr;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterTemplateExpr) {
             listener.enterTemplateExpr(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.IDENTIFIER, 0);
    }
    public STRING(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.STRING, 0);
    }
    public NUMBER(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.NUMBER, 0);
    }
    public PROGRAM(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.PROGRAM, 0);
    }
    public LETSTAR(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.LETSTAR, 0);
    }
    public LET(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.LET, 0);
    }
    public CONSTSTAR(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.CONSTSTAR, 0);
    }
    public CONST(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.CONST, 0);
    }
    public LAMBDA(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.LAMBDA, 0);
    }
    public FN(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.FN, 0);
    }
    public METHOD(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.METHOD, 0);
    }
    public BIND(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.BIND, 0);
    }
    public METHOD_CALL(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.METHOD_CALL, 0);
    }
    public DEFMACRO(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.DEFMACRO, 0);
    }
    public MACRO_IMPORT(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.MACRO_IMPORT, 0);
    }
    public MACRO_EXPORT(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.MACRO_EXPORT, 0);
    }
    public MACRO_TIME_ATTR(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.MACRO_TIME_ATTR, 0);
    }
    public MACRO_ERROR(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.MACRO_ERROR, 0);
    }
    public IF(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.IF, 0);
    }
    public WHILE(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.WHILE, 0);
    }
    public BEGIN(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.BEGIN, 0);
    }
    public RETURN(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.RETURN, 0);
    }
    public THROW(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.THROW, 0);
    }
    public SET(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.SET, 0);
    }
    public TERNARY(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.TERNARY, 0);
    }
    public COND(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.COND, 0);
    }
    public OBJECT(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.OBJECT, 0);
    }
    public ARRAY(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.ARRAY, 0);
    }
    public INDEX(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.INDEX, 0);
    }
    public QUASI(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.QUASI, 0);
    }
    public QUOTE(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.QUOTE, 0);
    }
    public UNQUOTE_SPLICING(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.UNQUOTE_SPLICING, 0);
    }
    public UNQUOTE(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.UNQUOTE, 0);
    }
    public TYPE_ARRAY(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.TYPE_ARRAY, 0);
    }
    public NEW(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.NEW, 0);
    }
    public IMPORT(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.IMPORT, 0);
    }
    public SWITCH(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.SWITCH, 0);
    }
    public CASE(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.CASE, 0);
    }
    public DEFAULT(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.DEFAULT, 0);
    }
    public FORIN(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.FORIN, 0);
    }
    public FOROF(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.FOROF, 0);
    }
    public FOR(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.FOR, 0);
    }
    public FORAWAIT(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.FORAWAIT, 0);
    }
    public TRY(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.TRY, 0);
    }
    public CATCH(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.CATCH, 0);
    }
    public FINALLY(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.FINALLY, 0);
    }
    public UNION(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.UNION, 0);
    }
    public INTERSECT(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.INTERSECT, 0);
    }
    public TUPLE(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.TUPLE, 0);
    }
    public TYPEFN(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.TYPEFN, 0);
    }
    public LIT(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.LIT, 0);
    }
    public KEYOF(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.KEYOF, 0);
    }
    public TYPEOF(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.TYPEOF, 0);
    }
    public INFER(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.INFER, 0);
    }
    public MAPPED(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.MAPPED, 0);
    }
    public TYPE_TEMPLATE(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.TYPE_TEMPLATE, 0);
    }
    public TEMPLATE(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.TEMPLATE, 0);
    }
    public REST(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.REST, 0);
    }
    public READONLY(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.READONLY, 0);
    }
    public TYPE_AS(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.TYPE_AS, 0);
    }
    public TYPE_PARAMS(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.TYPE_PARAMS, 0);
    }
    public TYPE_ARGS(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.TYPE_ARGS, 0);
    }
    public EXTENDS(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.EXTENDS, 0);
    }
    public RETURNS(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.RETURNS, 0);
    }
    public TYPE(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.TYPE, 0);
    }
    public INTERFACE(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.INTERFACE, 0);
    }
    public ENUM(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.ENUM, 0);
    }
    public MODIFIERS(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.MODIFIERS, 0);
    }
    public BOOLEAN(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.BOOLEAN, 0);
    }
    public NULL(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.NULL, 0);
    }
    public UNDEFINED(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.UNDEFINED, 0);
    }
    public EXPORT(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.EXPORT, 0);
    }
    public EXPORT_DEFAULT(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.EXPORT_DEFAULT, 0);
    }
    public EXPORT_NAMED(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.EXPORT_NAMED, 0);
    }
    public EXPORT_NS_FROM(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.EXPORT_NS_FROM, 0);
    }
    public EXPORT_FROM(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.EXPORT_FROM, 0);
    }
    public EXPORT_ALL_FROM(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.EXPORT_ALL_FROM, 0);
    }
    public IMPORT_TYPE(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.IMPORT_TYPE, 0);
    }
    public EXPORT_TYPE(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.EXPORT_TYPE, 0);
    }
    public EXPORT_TYPE_FROM(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.EXPORT_TYPE_FROM, 0);
    }
    public EXPORT_TYPE_ALL_FROM(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.EXPORT_TYPE_ALL_FROM, 0);
    }
    public CLASS(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.CLASS, 0);
    }
    public CLASS_BODY(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.CLASS_BODY, 0);
    }
    public FIELD(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.FIELD, 0);
    }
    public CONSTRUCTOR(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.CONSTRUCTOR, 0);
    }
    public THIS(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.THIS, 0);
    }
    public SUPER(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.SUPER, 0);
    }
    public SUPER_METHOD(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.SUPER_METHOD, 0);
    }
    public GET(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.GET, 0);
    }
    public SETPROP(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.SETPROP, 0);
    }
    public ABSTRACT_METHOD(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.ABSTRACT_METHOD, 0);
    }
    public IMPLEMENTS(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.IMPLEMENTS, 0);
    }
    public ASYNC_GENERATOR_FN(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.ASYNC_GENERATOR_FN, 0);
    }
    public ASYNC_LAMBDA(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.ASYNC_LAMBDA, 0);
    }
    public ASYNC_FN(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.ASYNC_FN, 0);
    }
    public GENERATOR_FN(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.GENERATOR_FN, 0);
    }
    public YIELD_STAR(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.YIELD_STAR, 0);
    }
    public YIELD(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.YIELD, 0);
    }
    public AWAIT(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.AWAIT, 0);
    }
    public CARET(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.CARET, 0);
    }
    public PUBLIC(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.PUBLIC, 0);
    }
    public PRIVATE(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.PRIVATE, 0);
    }
    public PROTECTED(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.PROTECTED, 0);
    }
    public STATIC(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.STATIC, 0);
    }
    public ABSTRACT(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.ABSTRACT, 0);
    }
    public OVERRIDE(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.OVERRIDE, 0);
    }
    public ASYNC(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.ASYNC, 0);
    }
    public GENERATOR(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.GENERATOR, 0);
    }
    public ELSE(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.ELSE, 0);
    }
    public override get ruleIndex(): number {
        return Stage8Parser.RULE_propKey;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterPropKey) {
             listener.enterPropKey(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public DOT(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.DOT, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public propKey(): PropKeyContext {
        return this.getRuleContext(0, PropKeyContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage8Parser.RULE_propAccess;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterPropAccess) {
             listener.enterPropAccess(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public INDEX(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.INDEX, 0)!;
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
        return this.getToken(Stage8Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage8Parser.RULE_indexAccess;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterIndexAccess) {
             listener.enterIndexAccess(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public quasiForm(): QuasiFormContext {
        return this.getRuleContext(0, QuasiFormContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
    }
    public QUASI(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.QUASI, 0);
    }
    public QUOTE(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.QUOTE, 0);
    }
    public override get ruleIndex(): number {
        return Stage8Parser.RULE_quasiquote;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterQuasiquote) {
             listener.enterQuasiquote(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
        if(listener.exitQuasiquote) {
             listener.exitQuasiquote(this);
        }
    }
}


export class QuasiFormContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public sForm(): SFormContext {
        return this.getRuleContext(0, SFormContext)!;
    }
    public override get ruleIndex(): number {
        return Stage8Parser.RULE_quasiForm;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterQuasiForm) {
             listener.enterQuasiForm(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
        if(listener.exitQuasiForm) {
             listener.exitQuasiForm(this);
        }
    }
}


export class SFormContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.LPAREN, 0);
    }
    public UNQUOTE(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.UNQUOTE, 0);
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public RPAREN(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.RPAREN, 0);
    }
    public UNQUOTE_SPLICING(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.UNQUOTE_SPLICING, 0);
    }
    public sForm(): SFormContext[];
    public sForm(i: number): SFormContext | null;
    public sForm(i?: number): SFormContext[] | SFormContext | null {
        if (i === undefined) {
            return this.getRuleContexts(SFormContext);
        }

        return this.getRuleContext(i, SFormContext);
    }
    public override get ruleIndex(): number {
        return Stage8Parser.RULE_sForm;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterSForm) {
             listener.enterSForm(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
        if(listener.exitSForm) {
             listener.exitSForm(this);
        }
    }
}


export class UnquoteContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public UNQUOTE(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.UNQUOTE, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage8Parser.RULE_unquote;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterUnquote) {
             listener.enterUnquote(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public UNQUOTE_SPLICING(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.UNQUOTE_SPLICING, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage8Parser.RULE_unquoteSplicing;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterUnquoteSplicing) {
             listener.enterUnquoteSplicing(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public OPTCHAIN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.OPTCHAIN, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public propKey(): PropKeyContext {
        return this.getRuleContext(0, PropKeyContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage8Parser.RULE_optChain;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterOptChain) {
             listener.enterOptChain(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public OPTCHAIN_INDEX(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.OPTCHAIN_INDEX, 0)!;
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
        return this.getToken(Stage8Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage8Parser.RULE_optChainIndex;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterOptChainIndex) {
             listener.enterOptChainIndex(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public NULLCOAL(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.NULLCOAL, 0)!;
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
        return this.getToken(Stage8Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage8Parser.RULE_nullCoalesce;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterNullCoalesce) {
             listener.enterNullCoalesce(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
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
        return this.getToken(Stage8Parser.RPAREN, 0)!;
    }
    public typeArgs(): TypeArgsContext | null {
        return this.getRuleContext(0, TypeArgsContext);
    }
    public override get ruleIndex(): number {
        return Stage8Parser.RULE_call;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterCall) {
             listener.enterCall(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public TYPE_ARGS(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.TYPE_ARGS, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
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
        return Stage8Parser.RULE_typeArgs;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterTypeArgs) {
             listener.enterTypeArgs(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
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
        return this.getToken(Stage8Parser.COLON, 0);
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
    		return this.getTokens(Stage8Parser.COMMA);
    	} else {
    		return this.getToken(Stage8Parser.COMMA, i);
    	}
    }
    public override get ruleIndex(): number {
        return Stage8Parser.RULE_fnSignature;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterFnSignature) {
             listener.enterFnSignature(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
    }
    public COLON(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.COLON, 0);
    }
    public typeExpr(): TypeExprContext | null {
        return this.getRuleContext(0, TypeExprContext);
    }
    public override get ruleIndex(): number {
        return Stage8Parser.RULE_param;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterParam) {
             listener.enterParam(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public REST(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.REST, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.RPAREN, 0)!;
    }
    public COLON(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.COLON, 0);
    }
    public typeExpr(): TypeExprContext | null {
        return this.getRuleContext(0, TypeExprContext);
    }
    public override get ruleIndex(): number {
        return Stage8Parser.RULE_restParam;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterRestParam) {
             listener.enterRestParam(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
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
        return this.getToken(Stage8Parser.NUMBER, 0);
    }
    public NEG_NUMBER(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.NEG_NUMBER, 0);
    }
    public STRING(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.STRING, 0);
    }
    public BOOLEAN(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.BOOLEAN, 0);
    }
    public NULL(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.NULL, 0);
    }
    public UNDEFINED(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.UNDEFINED, 0);
    }
    public override get ruleIndex(): number {
        return Stage8Parser.RULE_literal;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterLiteral) {
             listener.enterLiteral(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
        if(listener.exitLiteral) {
             listener.exitLiteral(this);
        }
    }
}
