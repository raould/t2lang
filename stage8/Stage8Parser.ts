
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
    public static readonly PROGRAM = 5;
    public static readonly LETSTAR = 6;
    public static readonly LET = 7;
    public static readonly CONSTSTAR = 8;
    public static readonly CONST = 9;
    public static readonly LAMBDA = 10;
    public static readonly FN = 11;
    public static readonly DEFN = 12;
    public static readonly METHOD = 13;
    public static readonly BIND = 14;
    public static readonly METHOD_CALL = 15;
    public static readonly DEFMACRO = 16;
    public static readonly MACRO_TIME_ATTR = 17;
    public static readonly MACRO_ERROR = 18;
    public static readonly IF = 19;
    public static readonly WHILE = 20;
    public static readonly BEGIN = 21;
    public static readonly RETURN = 22;
    public static readonly THROW = 23;
    public static readonly SET = 24;
    public static readonly TERNARY = 25;
    public static readonly COND = 26;
    public static readonly OBJECT = 27;
    public static readonly TYPE_ARRAY = 28;
    public static readonly ARRAY = 29;
    public static readonly OPTCHAIN_INDEX = 30;
    public static readonly OPTCHAIN = 31;
    public static readonly DOT = 32;
    public static readonly INDEX = 33;
    public static readonly NULLCOAL = 34;
    public static readonly QUASI = 35;
    public static readonly QUOTE = 36;
    public static readonly UNQUOTE_SPLICING = 37;
    public static readonly UNQUOTE = 38;
    public static readonly NEW = 39;
    public static readonly IMPORT = 40;
    public static readonly SWITCH = 41;
    public static readonly CASE = 42;
    public static readonly DEFAULT = 43;
    public static readonly FORIN = 44;
    public static readonly FOROF = 45;
    public static readonly FORAWAIT = 46;
    public static readonly TRY = 47;
    public static readonly CATCH = 48;
    public static readonly FINALLY = 49;
    public static readonly FOR = 50;
    public static readonly CLASS_BODY = 51;
    public static readonly SUPER_METHOD = 52;
    public static readonly ABSTRACT_METHOD = 53;
    public static readonly CLASS = 54;
    public static readonly FIELD = 55;
    public static readonly CONSTRUCTOR = 56;
    public static readonly THIS = 57;
    public static readonly SUPER = 58;
    public static readonly GET = 59;
    public static readonly SETPROP = 60;
    public static readonly IMPLEMENTS = 61;
    public static readonly UNION = 62;
    public static readonly INTERSECT = 63;
    public static readonly TUPLE = 64;
    public static readonly TYPEFN = 65;
    public static readonly LIT = 66;
    public static readonly KEYOF = 67;
    public static readonly TYPEOF = 68;
    public static readonly TYPE_AS = 69;
    public static readonly INFER = 70;
    public static readonly MAPPED = 71;
    public static readonly TYPE_TEMPLATE = 72;
    public static readonly TEMPLATE = 73;
    public static readonly REST = 74;
    public static readonly READONLY = 75;
    public static readonly TYPE_PARAMS = 76;
    public static readonly TYPE_ARGS = 77;
    public static readonly EXTENDS = 78;
    public static readonly RETURNS = 79;
    public static readonly TYPE = 80;
    public static readonly INTERFACE = 81;
    public static readonly MODIFIERS = 82;
    public static readonly OPTIONAL = 83;
    public static readonly BOOLEAN = 84;
    public static readonly NULL = 85;
    public static readonly UNDEFINED = 86;
    public static readonly COLON = 87;
    public static readonly ASYNC_GENERATOR_FN = 88;
    public static readonly ASYNC_LAMBDA = 89;
    public static readonly ASYNC_FN = 90;
    public static readonly GENERATOR_FN = 91;
    public static readonly YIELD_STAR = 92;
    public static readonly YIELD = 93;
    public static readonly AWAIT = 94;
    public static readonly CARET = 95;
    public static readonly LBRACK = 96;
    public static readonly RBRACK = 97;
    public static readonly EXPORT = 98;
    public static readonly EXPORT_DEFAULT = 99;
    public static readonly EXPORT_NAMED = 100;
    public static readonly EXPORT_NS_FROM = 101;
    public static readonly EXPORT_FROM = 102;
    public static readonly EXPORT_ALL_FROM = 103;
    public static readonly IMPORT_TYPE = 104;
    public static readonly EXPORT_TYPE_ALL_FROM = 105;
    public static readonly EXPORT_TYPE_FROM = 106;
    public static readonly EXPORT_TYPE = 107;
    public static readonly KEYWORD = 108;
    public static readonly NUMBER = 109;
    public static readonly STRING = 110;
    public static readonly MULTILINE_STRING = 111;
    public static readonly NEG_NUMBER = 112;
    public static readonly MINUS = 113;
    public static readonly IDENTIFIER = 114;
    public static readonly WS = 115;
    public static readonly RULE_program = 0;
    public static readonly RULE_topLevel = 1;
    public static readonly RULE_decl = 2;
    public static readonly RULE_defmacro = 3;
    public static readonly RULE_macroTimeFnDef = 4;
    public static readonly RULE_topLevelLet = 5;
    public static readonly RULE_topLevelConst = 6;
    public static readonly RULE_fnDecl = 7;
    public static readonly RULE_metaAnnotation = 8;
    public static readonly RULE_typeAlias = 9;
    public static readonly RULE_interfaceDef = 10;
    public static readonly RULE_interfaceExtends = 11;
    public static readonly RULE_classDef = 12;
    public static readonly RULE_anonClassDef = 13;
    public static readonly RULE_classExtends = 14;
    public static readonly RULE_classImplements = 15;
    public static readonly RULE_classBody = 16;
    public static readonly RULE_classElement = 17;
    public static readonly RULE_modifier = 18;
    public static readonly RULE_fieldDef = 19;
    public static readonly RULE_constructorDef = 20;
    public static readonly RULE_classMethodDef = 21;
    public static readonly RULE_abstractMethodDef = 22;
    public static readonly RULE_getterDef = 23;
    public static readonly RULE_setterDef = 24;
    public static readonly RULE_methodKey = 25;
    public static readonly RULE_typedParam = 26;
    public static readonly RULE_fnSignatureTyped = 27;
    public static readonly RULE_statement = 28;
    public static readonly RULE_letStar = 29;
    public static readonly RULE_letStmt = 30;
    public static readonly RULE_constStar = 31;
    public static readonly RULE_constStmt = 32;
    public static readonly RULE_ifForm = 33;
    public static readonly RULE_whileForm = 34;
    public static readonly RULE_block = 35;
    public static readonly RULE_returnForm = 36;
    public static readonly RULE_throwForm = 37;
    public static readonly RULE_importForm = 38;
    public static readonly RULE_importTypeForm = 39;
    public static readonly RULE_importTypeSpec = 40;
    public static readonly RULE_importTypeName = 41;
    public static readonly RULE_exportForm = 42;
    public static readonly RULE_exportBinding = 43;
    public static readonly RULE_exportDefault = 44;
    public static readonly RULE_exportNamed = 45;
    public static readonly RULE_exportNamePair = 46;
    public static readonly RULE_exportFrom = 47;
    public static readonly RULE_exportAllFrom = 48;
    public static readonly RULE_exportNsFromForm = 49;
    public static readonly RULE_exportTypeForm = 50;
    public static readonly RULE_exportTypeFromForm = 51;
    public static readonly RULE_exportTypeAllFromForm = 52;
    public static readonly RULE_exportDeclForm = 53;
    public static readonly RULE_starBinding = 54;
    public static readonly RULE_singleBinding = 55;
    public static readonly RULE_typeExpr = 56;
    public static readonly RULE_typeUnion = 57;
    public static readonly RULE_typeIntersection = 58;
    public static readonly RULE_typeArray = 59;
    public static readonly RULE_typeTuple = 60;
    public static readonly RULE_typeTupleElement = 61;
    public static readonly RULE_typeFunction = 62;
    public static readonly RULE_typeFnParam = 63;
    public static readonly RULE_typeObject = 64;
    public static readonly RULE_typeProp = 65;
    public static readonly RULE_propModifier = 66;
    public static readonly RULE_typeLiteral = 67;
    public static readonly RULE_typeKeyof = 68;
    public static readonly RULE_typeTypeof = 69;
    public static readonly RULE_typeIndexAccess = 70;
    public static readonly RULE_typeConditional = 71;
    public static readonly RULE_typeInfer = 72;
    public static readonly RULE_typeMapped = 73;
    public static readonly RULE_mappedModifiers = 74;
    public static readonly RULE_mappedModifier = 75;
    public static readonly RULE_typeTemplateLiteral = 76;
    public static readonly RULE_templatePart = 77;
    public static readonly RULE_typeApplication = 78;
    public static readonly RULE_typeParams = 79;
    public static readonly RULE_typeParamDecl = 80;
    public static readonly RULE_typeParamConstraint = 81;
    public static readonly RULE_typeParamDefault = 82;
    public static readonly RULE_assign = 83;
    public static readonly RULE_switchForm = 84;
    public static readonly RULE_caseClause = 85;
    public static readonly RULE_defaultClause = 86;
    public static readonly RULE_forForm = 87;
    public static readonly RULE_forInForm = 88;
    public static readonly RULE_forOfForm = 89;
    public static readonly RULE_forAwaitForm = 90;
    public static readonly RULE_tryForm = 91;
    public static readonly RULE_catchClause = 92;
    public static readonly RULE_finallyClause = 93;
    public static readonly RULE_expression = 94;
    public static readonly RULE_thisExpr = 95;
    public static readonly RULE_superExpr = 96;
    public static readonly RULE_superConstructorCall = 97;
    public static readonly RULE_superMethodCall = 98;
    public static readonly RULE_typeofExpr = 99;
    public static readonly RULE_typeAssert = 100;
    public static readonly RULE_lambda = 101;
    public static readonly RULE_fn = 102;
    public static readonly RULE_asyncLambda = 103;
    public static readonly RULE_asyncFn = 104;
    public static readonly RULE_generatorFn = 105;
    public static readonly RULE_asyncGeneratorFn = 106;
    public static readonly RULE_awaitExpr = 107;
    public static readonly RULE_yieldExpr = 108;
    public static readonly RULE_yieldStarExpr = 109;
    public static readonly RULE_bindExpr = 110;
    public static readonly RULE_methodCallExpr = 111;
    public static readonly RULE_ternary = 112;
    public static readonly RULE_condExpr = 113;
    public static readonly RULE_newForm = 114;
    public static readonly RULE_objectExpr = 115;
    public static readonly RULE_objectField = 116;
    public static readonly RULE_methodDef = 117;
    public static readonly RULE_arrayExpr = 118;
    public static readonly RULE_templateExpr = 119;
    public static readonly RULE_propKey = 120;
    public static readonly RULE_propAccess = 121;
    public static readonly RULE_indexAccess = 122;
    public static readonly RULE_quasiquote = 123;
    public static readonly RULE_quasiForm = 124;
    public static readonly RULE_sForm = 125;
    public static readonly RULE_unquote = 126;
    public static readonly RULE_unquoteSplicing = 127;
    public static readonly RULE_optChain = 128;
    public static readonly RULE_optChainIndex = 129;
    public static readonly RULE_nullCoalesce = 130;
    public static readonly RULE_call = 131;
    public static readonly RULE_typeArgs = 132;
    public static readonly RULE_fnSignature = 133;
    public static readonly RULE_param = 134;
    public static readonly RULE_restParam = 135;
    public static readonly RULE_literal = 136;

    public static readonly literalNames = [
        null, null, "'('", "')'", "','", "'program'", "'let*'", "'let'", 
        "'const*'", "'const'", "'lambda'", "'fn'", "'defn'", "'method'", 
        "'bind'", "'method-call'", "'defmacro'", "'#[macro-time]'", "'macro-error'", 
        "'if'", "'while'", "'begin'", "'return'", "'throw'", "'set!'", "'ternary'", 
        "'cond'", "'object'", "'type-array'", "'array'", "'optchain-index'", 
        "'.?'", "'.'", "'index'", "'??'", "'quasi'", "'quote'", "'unquote-splicing'", 
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
        "'export-type'", null, null, null, null, null, "'-'"
    ];

    public static readonly symbolicNames = [
        null, "COMMENT", "LPAREN", "RPAREN", "COMMA", "PROGRAM", "LETSTAR", 
        "LET", "CONSTSTAR", "CONST", "LAMBDA", "FN", "DEFN", "METHOD", "BIND", 
        "METHOD_CALL", "DEFMACRO", "MACRO_TIME_ATTR", "MACRO_ERROR", "IF", 
        "WHILE", "BEGIN", "RETURN", "THROW", "SET", "TERNARY", "COND", "OBJECT", 
        "TYPE_ARRAY", "ARRAY", "OPTCHAIN_INDEX", "OPTCHAIN", "DOT", "INDEX", 
        "NULLCOAL", "QUASI", "QUOTE", "UNQUOTE_SPLICING", "UNQUOTE", "NEW", 
        "IMPORT", "SWITCH", "CASE", "DEFAULT", "FORIN", "FOROF", "FORAWAIT", 
        "TRY", "CATCH", "FINALLY", "FOR", "CLASS_BODY", "SUPER_METHOD", 
        "ABSTRACT_METHOD", "CLASS", "FIELD", "CONSTRUCTOR", "THIS", "SUPER", 
        "GET", "SETPROP", "IMPLEMENTS", "UNION", "INTERSECT", "TUPLE", "TYPEFN", 
        "LIT", "KEYOF", "TYPEOF", "TYPE_AS", "INFER", "MAPPED", "TYPE_TEMPLATE", 
        "TEMPLATE", "REST", "READONLY", "TYPE_PARAMS", "TYPE_ARGS", "EXTENDS", 
        "RETURNS", "TYPE", "INTERFACE", "MODIFIERS", "OPTIONAL", "BOOLEAN", 
        "NULL", "UNDEFINED", "COLON", "ASYNC_GENERATOR_FN", "ASYNC_LAMBDA", 
        "ASYNC_FN", "GENERATOR_FN", "YIELD_STAR", "YIELD", "AWAIT", "CARET", 
        "LBRACK", "RBRACK", "EXPORT", "EXPORT_DEFAULT", "EXPORT_NAMED", 
        "EXPORT_NS_FROM", "EXPORT_FROM", "EXPORT_ALL_FROM", "IMPORT_TYPE", 
        "EXPORT_TYPE_ALL_FROM", "EXPORT_TYPE_FROM", "EXPORT_TYPE", "KEYWORD", 
        "NUMBER", "STRING", "MULTILINE_STRING", "NEG_NUMBER", "MINUS", "IDENTIFIER", 
        "WS"
    ];
    public static readonly ruleNames = [
        "program", "topLevel", "decl", "defmacro", "macroTimeFnDef", "topLevelLet", 
        "topLevelConst", "fnDecl", "metaAnnotation", "typeAlias", "interfaceDef", 
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
        "quasiquote", "quasiForm", "sForm", "unquote", "unquoteSplicing", 
        "optChain", "optChainIndex", "nullCoalesce", "call", "typeArgs", 
        "fnSignature", "param", "restParam", "literal",
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
            this.state = 274;
            this.match(Stage8Parser.LPAREN);
            this.state = 275;
            this.match(Stage8Parser.PROGRAM);
            this.state = 279;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 18 || ((((_la - 57)) & ~0x1F) === 0 && ((1 << (_la - 57)) & 939524099) !== 0) || ((((_la - 108)) & ~0x1F) === 0 && ((1 << (_la - 108)) & 119) !== 0)) {
                {
                {
                this.state = 276;
                this.topLevel();
                }
                }
                this.state = 281;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 282;
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
            this.state = 294;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 1, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 284;
                this.defmacro();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 285;
                this.macroTimeFnDef();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 286;
                this.topLevelLet();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 287;
                this.topLevelConst();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 288;
                this.fnDecl();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 289;
                this.typeAlias();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 290;
                this.interfaceDef();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 291;
                this.classDef();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 292;
                this.exportDeclForm();
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 293;
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
            this.state = 302;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 2, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 296;
                this.topLevelLet();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 297;
                this.topLevelConst();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 298;
                this.fnDecl();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 299;
                this.classDef();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 300;
                this.interfaceDef();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 301;
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
            this.state = 304;
            this.match(Stage8Parser.LPAREN);
            this.state = 305;
            this.match(Stage8Parser.DEFMACRO);
            this.state = 306;
            this.match(Stage8Parser.IDENTIFIER);
            this.state = 307;
            this.fnSignature();
            this.state = 311;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 18 || ((((_la - 57)) & ~0x1F) === 0 && ((1 << (_la - 57)) & 939524099) !== 0) || ((((_la - 108)) & ~0x1F) === 0 && ((1 << (_la - 108)) & 119) !== 0)) {
                {
                {
                this.state = 308;
                this.statement();
                }
                }
                this.state = 313;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 314;
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
            this.state = 326;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 4, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 316;
                this.match(Stage8Parser.LPAREN);
                this.state = 317;
                this.match(Stage8Parser.MACRO_TIME_ATTR);
                this.state = 318;
                this.topLevelLet();
                this.state = 319;
                this.match(Stage8Parser.RPAREN);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 321;
                this.match(Stage8Parser.LPAREN);
                this.state = 322;
                this.match(Stage8Parser.MACRO_TIME_ATTR);
                this.state = 323;
                this.topLevelConst();
                this.state = 324;
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
    public topLevelLet(): TopLevelLetContext {
        let localContext = new TopLevelLetContext(this.context, this.state);
        this.enterRule(localContext, 10, Stage8Parser.RULE_topLevelLet);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 328;
            this.match(Stage8Parser.LPAREN);
            this.state = 329;
            this.match(Stage8Parser.LET);
            this.state = 333;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 95) {
                {
                {
                this.state = 330;
                this.metaAnnotation();
                }
                }
                this.state = 335;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 336;
            this.match(Stage8Parser.IDENTIFIER);
            this.state = 337;
            this.expression();
            this.state = 338;
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
        this.enterRule(localContext, 12, Stage8Parser.RULE_topLevelConst);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 340;
            this.match(Stage8Parser.LPAREN);
            this.state = 341;
            this.match(Stage8Parser.CONST);
            this.state = 345;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 95) {
                {
                {
                this.state = 342;
                this.metaAnnotation();
                }
                }
                this.state = 347;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 348;
            this.match(Stage8Parser.IDENTIFIER);
            this.state = 349;
            this.expression();
            this.state = 350;
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
    public fnDecl(): FnDeclContext {
        let localContext = new FnDeclContext(this.context, this.state);
        this.enterRule(localContext, 14, Stage8Parser.RULE_fnDecl);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 352;
            this.match(Stage8Parser.LPAREN);
            this.state = 353;
            this.match(Stage8Parser.DEFN);
            this.state = 357;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 95) {
                {
                {
                this.state = 354;
                this.metaAnnotation();
                }
                }
                this.state = 359;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 360;
            this.match(Stage8Parser.IDENTIFIER);
            this.state = 361;
            this.fnSignature();
            this.state = 365;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 18 || ((((_la - 57)) & ~0x1F) === 0 && ((1 << (_la - 57)) & 939524099) !== 0) || ((((_la - 108)) & ~0x1F) === 0 && ((1 << (_la - 108)) & 119) !== 0)) {
                {
                {
                this.state = 362;
                this.statement();
                }
                }
                this.state = 367;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 368;
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
        this.enterRule(localContext, 16, Stage8Parser.RULE_metaAnnotation);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 370;
            this.match(Stage8Parser.CARET);
            this.state = 371;
            this.match(Stage8Parser.KEYWORD);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 18, Stage8Parser.RULE_typeAlias);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 373;
            this.match(Stage8Parser.LPAREN);
            this.state = 374;
            this.match(Stage8Parser.TYPE);
            this.state = 375;
            this.match(Stage8Parser.IDENTIFIER);
            this.state = 377;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 9, this.context) ) {
            case 1:
                {
                this.state = 376;
                this.typeParams();
                }
                break;
            }
            this.state = 379;
            this.typeExpr();
            this.state = 380;
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
        this.enterRule(localContext, 20, Stage8Parser.RULE_interfaceDef);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 382;
            this.match(Stage8Parser.LPAREN);
            this.state = 383;
            this.match(Stage8Parser.INTERFACE);
            this.state = 384;
            this.match(Stage8Parser.IDENTIFIER);
            this.state = 386;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 10, this.context) ) {
            case 1:
                {
                this.state = 385;
                this.typeParams();
                }
                break;
            }
            this.state = 389;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 11, this.context) ) {
            case 1:
                {
                this.state = 388;
                this.interfaceExtends();
                }
                break;
            }
            this.state = 391;
            this.typeObject();
            this.state = 392;
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
        this.enterRule(localContext, 22, Stage8Parser.RULE_interfaceExtends);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 394;
            this.match(Stage8Parser.LPAREN);
            this.state = 395;
            this.match(Stage8Parser.EXTENDS);
            this.state = 397;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 396;
                this.typeExpr();
                }
                }
                this.state = 399;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 114);
            this.state = 401;
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
        this.enterRule(localContext, 24, Stage8Parser.RULE_classDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 403;
            this.match(Stage8Parser.LPAREN);
            this.state = 404;
            this.match(Stage8Parser.CLASS);
            this.state = 408;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 108) {
                {
                {
                this.state = 405;
                this.modifier();
                }
                }
                this.state = 410;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 411;
            this.match(Stage8Parser.IDENTIFIER);
            this.state = 413;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 14, this.context) ) {
            case 1:
                {
                this.state = 412;
                this.typeParams();
                }
                break;
            }
            this.state = 416;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 15, this.context) ) {
            case 1:
                {
                this.state = 415;
                this.classExtends();
                }
                break;
            }
            this.state = 419;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 16, this.context) ) {
            case 1:
                {
                this.state = 418;
                this.classImplements();
                }
                break;
            }
            this.state = 421;
            this.classBody();
            this.state = 422;
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
        this.enterRule(localContext, 26, Stage8Parser.RULE_anonClassDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 424;
            this.match(Stage8Parser.LPAREN);
            this.state = 425;
            this.match(Stage8Parser.CLASS);
            this.state = 429;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 108) {
                {
                {
                this.state = 426;
                this.modifier();
                }
                }
                this.state = 431;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 433;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 18, this.context) ) {
            case 1:
                {
                this.state = 432;
                this.classExtends();
                }
                break;
            }
            this.state = 436;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 19, this.context) ) {
            case 1:
                {
                this.state = 435;
                this.classImplements();
                }
                break;
            }
            this.state = 438;
            this.classBody();
            this.state = 439;
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
        this.enterRule(localContext, 28, Stage8Parser.RULE_classExtends);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 441;
            this.match(Stage8Parser.LPAREN);
            this.state = 442;
            this.match(Stage8Parser.EXTENDS);
            this.state = 443;
            this.typeExpr();
            this.state = 444;
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
        this.enterRule(localContext, 30, Stage8Parser.RULE_classImplements);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 446;
            this.match(Stage8Parser.LPAREN);
            this.state = 447;
            this.match(Stage8Parser.IMPLEMENTS);
            this.state = 449;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 448;
                this.typeExpr();
                }
                }
                this.state = 451;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 114);
            this.state = 453;
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
        this.enterRule(localContext, 32, Stage8Parser.RULE_classBody);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 455;
            this.match(Stage8Parser.LPAREN);
            this.state = 456;
            this.match(Stage8Parser.CLASS_BODY);
            this.state = 460;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 457;
                this.classElement();
                }
                }
                this.state = 462;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 463;
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
        this.enterRule(localContext, 34, Stage8Parser.RULE_classElement);
        try {
            this.state = 471;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 22, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 465;
                this.fieldDef();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 466;
                this.constructorDef();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 467;
                this.classMethodDef();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 468;
                this.abstractMethodDef();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 469;
                this.getterDef();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 470;
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
        this.enterRule(localContext, 36, Stage8Parser.RULE_modifier);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 473;
            this.match(Stage8Parser.KEYWORD);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 38, Stage8Parser.RULE_fieldDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 475;
            this.match(Stage8Parser.LPAREN);
            this.state = 476;
            this.match(Stage8Parser.FIELD);
            this.state = 480;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 108) {
                {
                {
                this.state = 477;
                this.modifier();
                }
                }
                this.state = 482;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 483;
            this.match(Stage8Parser.IDENTIFIER);
            this.state = 486;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 87) {
                {
                this.state = 484;
                this.match(Stage8Parser.COLON);
                this.state = 485;
                this.typeExpr();
                }
            }

            this.state = 489;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2 || _la === 18 || ((((_la - 57)) & ~0x1F) === 0 && ((1 << (_la - 57)) & 939524099) !== 0) || ((((_la - 108)) & ~0x1F) === 0 && ((1 << (_la - 108)) & 119) !== 0)) {
                {
                this.state = 488;
                this.expression();
                }
            }

            this.state = 491;
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
        this.enterRule(localContext, 40, Stage8Parser.RULE_constructorDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 493;
            this.match(Stage8Parser.LPAREN);
            this.state = 494;
            this.match(Stage8Parser.CONSTRUCTOR);
            this.state = 495;
            this.fnSignatureTyped();
            this.state = 499;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 18 || ((((_la - 57)) & ~0x1F) === 0 && ((1 << (_la - 57)) & 939524099) !== 0) || ((((_la - 108)) & ~0x1F) === 0 && ((1 << (_la - 108)) & 119) !== 0)) {
                {
                {
                this.state = 496;
                this.statement();
                }
                }
                this.state = 501;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 502;
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
        this.enterRule(localContext, 42, Stage8Parser.RULE_classMethodDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 504;
            this.match(Stage8Parser.LPAREN);
            this.state = 505;
            this.match(Stage8Parser.METHOD);
            this.state = 509;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 108) {
                {
                {
                this.state = 506;
                this.modifier();
                }
                }
                this.state = 511;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 512;
            this.methodKey();
            this.state = 513;
            this.fnSignatureTyped();
            this.state = 517;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 18 || ((((_la - 57)) & ~0x1F) === 0 && ((1 << (_la - 57)) & 939524099) !== 0) || ((((_la - 108)) & ~0x1F) === 0 && ((1 << (_la - 108)) & 119) !== 0)) {
                {
                {
                this.state = 514;
                this.statement();
                }
                }
                this.state = 519;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 520;
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
        this.enterRule(localContext, 44, Stage8Parser.RULE_abstractMethodDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 522;
            this.match(Stage8Parser.LPAREN);
            this.state = 523;
            this.match(Stage8Parser.ABSTRACT_METHOD);
            this.state = 527;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 108) {
                {
                {
                this.state = 524;
                this.modifier();
                }
                }
                this.state = 529;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 530;
            this.methodKey();
            this.state = 531;
            this.fnSignatureTyped();
            this.state = 532;
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
        this.enterRule(localContext, 46, Stage8Parser.RULE_getterDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 534;
            this.match(Stage8Parser.LPAREN);
            this.state = 535;
            this.match(Stage8Parser.GET);
            this.state = 539;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 108) {
                {
                {
                this.state = 536;
                this.modifier();
                }
                }
                this.state = 541;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 542;
            this.methodKey();
            this.state = 543;
            this.fnSignatureTyped();
            this.state = 547;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 18 || ((((_la - 57)) & ~0x1F) === 0 && ((1 << (_la - 57)) & 939524099) !== 0) || ((((_la - 108)) & ~0x1F) === 0 && ((1 << (_la - 108)) & 119) !== 0)) {
                {
                {
                this.state = 544;
                this.statement();
                }
                }
                this.state = 549;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 550;
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
        this.enterRule(localContext, 48, Stage8Parser.RULE_setterDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 552;
            this.match(Stage8Parser.LPAREN);
            this.state = 553;
            this.match(Stage8Parser.SETPROP);
            this.state = 557;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 108) {
                {
                {
                this.state = 554;
                this.modifier();
                }
                }
                this.state = 559;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 560;
            this.methodKey();
            this.state = 561;
            this.fnSignatureTyped();
            this.state = 565;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 18 || ((((_la - 57)) & ~0x1F) === 0 && ((1 << (_la - 57)) & 939524099) !== 0) || ((((_la - 108)) & ~0x1F) === 0 && ((1 << (_la - 108)) & 119) !== 0)) {
                {
                {
                this.state = 562;
                this.statement();
                }
                }
                this.state = 567;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 568;
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
        this.enterRule(localContext, 50, Stage8Parser.RULE_methodKey);
        try {
            this.state = 575;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case Stage8Parser.IDENTIFIER:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 570;
                this.match(Stage8Parser.IDENTIFIER);
                }
                break;
            case Stage8Parser.LBRACK:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 571;
                this.match(Stage8Parser.LBRACK);
                this.state = 572;
                this.expression();
                this.state = 573;
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
        this.enterRule(localContext, 52, Stage8Parser.RULE_typedParam);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 577;
            this.match(Stage8Parser.LPAREN);
            this.state = 578;
            this.match(Stage8Parser.IDENTIFIER);
            this.state = 580;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 83) {
                {
                this.state = 579;
                this.match(Stage8Parser.OPTIONAL);
                }
            }

            this.state = 584;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 87) {
                {
                this.state = 582;
                this.match(Stage8Parser.COLON);
                this.state = 583;
                this.typeExpr();
                }
            }

            this.state = 586;
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
        this.enterRule(localContext, 54, Stage8Parser.RULE_fnSignatureTyped);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 588;
            this.match(Stage8Parser.LPAREN);
            this.state = 599;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2) {
                {
                this.state = 589;
                this.typedParam();
                this.state = 596;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 2 || _la === 4) {
                    {
                    {
                    this.state = 591;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    if (_la === 4) {
                        {
                        this.state = 590;
                        this.match(Stage8Parser.COMMA);
                        }
                    }

                    this.state = 593;
                    this.typedParam();
                    }
                    }
                    this.state = 598;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
            }

            this.state = 601;
            this.match(Stage8Parser.RPAREN);
            this.state = 607;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 40, this.context) ) {
            case 1:
                {
                this.state = 602;
                this.match(Stage8Parser.LPAREN);
                this.state = 603;
                this.match(Stage8Parser.RETURNS);
                this.state = 604;
                this.typeExpr();
                this.state = 605;
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
        this.enterRule(localContext, 56, Stage8Parser.RULE_statement);
        try {
            this.state = 629;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 41, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 609;
                this.letStar();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 610;
                this.letStmt();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 611;
                this.constStar();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 612;
                this.constStmt();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 613;
                this.ifForm();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 614;
                this.whileForm();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 615;
                this.tryForm();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 616;
                this.block();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 617;
                this.returnForm();
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 618;
                this.throwForm();
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 619;
                this.importForm();
                }
                break;
            case 12:
                this.enterOuterAlt(localContext, 12);
                {
                this.state = 620;
                this.importTypeForm();
                }
                break;
            case 13:
                this.enterOuterAlt(localContext, 13);
                {
                this.state = 621;
                this.exportForm();
                }
                break;
            case 14:
                this.enterOuterAlt(localContext, 14);
                {
                this.state = 622;
                this.switchForm();
                }
                break;
            case 15:
                this.enterOuterAlt(localContext, 15);
                {
                this.state = 623;
                this.forForm();
                }
                break;
            case 16:
                this.enterOuterAlt(localContext, 16);
                {
                this.state = 624;
                this.forInForm();
                }
                break;
            case 17:
                this.enterOuterAlt(localContext, 17);
                {
                this.state = 625;
                this.forOfForm();
                }
                break;
            case 18:
                this.enterOuterAlt(localContext, 18);
                {
                this.state = 626;
                this.forAwaitForm();
                }
                break;
            case 19:
                this.enterOuterAlt(localContext, 19);
                {
                this.state = 627;
                this.assign();
                }
                break;
            case 20:
                this.enterOuterAlt(localContext, 20);
                {
                this.state = 628;
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
        this.enterRule(localContext, 58, Stage8Parser.RULE_letStar);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 631;
            this.match(Stage8Parser.LPAREN);
            this.state = 632;
            this.match(Stage8Parser.LETSTAR);
            this.state = 633;
            this.match(Stage8Parser.LPAREN);
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
            this.match(Stage8Parser.RPAREN);
            this.state = 644;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 18 || ((((_la - 57)) & ~0x1F) === 0 && ((1 << (_la - 57)) & 939524099) !== 0) || ((((_la - 108)) & ~0x1F) === 0 && ((1 << (_la - 108)) & 119) !== 0)) {
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
        this.enterRule(localContext, 60, Stage8Parser.RULE_letStmt);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 649;
            this.match(Stage8Parser.LPAREN);
            this.state = 650;
            this.match(Stage8Parser.LET);
            this.state = 651;
            this.singleBinding();
            this.state = 652;
            this.expression();
            this.state = 653;
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
        this.enterRule(localContext, 62, Stage8Parser.RULE_constStar);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 655;
            this.match(Stage8Parser.LPAREN);
            this.state = 656;
            this.match(Stage8Parser.CONSTSTAR);
            this.state = 657;
            this.match(Stage8Parser.LPAREN);
            this.state = 661;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 658;
                this.starBinding();
                }
                }
                this.state = 663;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 664;
            this.match(Stage8Parser.RPAREN);
            this.state = 668;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 18 || ((((_la - 57)) & ~0x1F) === 0 && ((1 << (_la - 57)) & 939524099) !== 0) || ((((_la - 108)) & ~0x1F) === 0 && ((1 << (_la - 108)) & 119) !== 0)) {
                {
                {
                this.state = 665;
                this.statement();
                }
                }
                this.state = 670;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 671;
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
        this.enterRule(localContext, 64, Stage8Parser.RULE_constStmt);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 673;
            this.match(Stage8Parser.LPAREN);
            this.state = 674;
            this.match(Stage8Parser.CONST);
            this.state = 675;
            this.singleBinding();
            this.state = 676;
            this.expression();
            this.state = 677;
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
        this.enterRule(localContext, 66, Stage8Parser.RULE_ifForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 679;
            this.match(Stage8Parser.LPAREN);
            this.state = 680;
            this.match(Stage8Parser.IF);
            this.state = 681;
            this.expression();
            this.state = 682;
            this.statement();
            this.state = 684;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2 || _la === 18 || ((((_la - 57)) & ~0x1F) === 0 && ((1 << (_la - 57)) & 939524099) !== 0) || ((((_la - 108)) & ~0x1F) === 0 && ((1 << (_la - 108)) & 119) !== 0)) {
                {
                this.state = 683;
                this.statement();
                }
            }

            this.state = 686;
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
        this.enterRule(localContext, 68, Stage8Parser.RULE_whileForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 688;
            this.match(Stage8Parser.LPAREN);
            this.state = 689;
            this.match(Stage8Parser.WHILE);
            this.state = 690;
            this.expression();
            this.state = 694;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 18 || ((((_la - 57)) & ~0x1F) === 0 && ((1 << (_la - 57)) & 939524099) !== 0) || ((((_la - 108)) & ~0x1F) === 0 && ((1 << (_la - 108)) & 119) !== 0)) {
                {
                {
                this.state = 691;
                this.statement();
                }
                }
                this.state = 696;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 697;
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
        this.enterRule(localContext, 70, Stage8Parser.RULE_block);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 699;
            this.match(Stage8Parser.LPAREN);
            this.state = 700;
            this.match(Stage8Parser.BEGIN);
            this.state = 704;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 18 || ((((_la - 57)) & ~0x1F) === 0 && ((1 << (_la - 57)) & 939524099) !== 0) || ((((_la - 108)) & ~0x1F) === 0 && ((1 << (_la - 108)) & 119) !== 0)) {
                {
                {
                this.state = 701;
                this.statement();
                }
                }
                this.state = 706;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 707;
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
        this.enterRule(localContext, 72, Stage8Parser.RULE_returnForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 709;
            this.match(Stage8Parser.LPAREN);
            this.state = 710;
            this.match(Stage8Parser.RETURN);
            this.state = 712;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2 || _la === 18 || ((((_la - 57)) & ~0x1F) === 0 && ((1 << (_la - 57)) & 939524099) !== 0) || ((((_la - 108)) & ~0x1F) === 0 && ((1 << (_la - 108)) & 119) !== 0)) {
                {
                this.state = 711;
                this.expression();
                }
            }

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
    public throwForm(): ThrowFormContext {
        let localContext = new ThrowFormContext(this.context, this.state);
        this.enterRule(localContext, 74, Stage8Parser.RULE_throwForm);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 716;
            this.match(Stage8Parser.LPAREN);
            this.state = 717;
            this.match(Stage8Parser.THROW);
            this.state = 718;
            this.expression();
            this.state = 719;
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
        this.enterRule(localContext, 76, Stage8Parser.RULE_importForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 721;
            this.match(Stage8Parser.LPAREN);
            this.state = 722;
            this.match(Stage8Parser.IMPORT);
            this.state = 724;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2) {
                {
                this.state = 723;
                this.objectExpr();
                }
            }

            this.state = 726;
            this.match(Stage8Parser.STRING);
            this.state = 727;
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
        this.enterRule(localContext, 78, Stage8Parser.RULE_importTypeForm);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 729;
            this.match(Stage8Parser.LPAREN);
            this.state = 730;
            this.match(Stage8Parser.IMPORT_TYPE);
            this.state = 731;
            this.importTypeSpec();
            this.state = 732;
            this.match(Stage8Parser.STRING);
            this.state = 733;
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
        this.enterRule(localContext, 80, Stage8Parser.RULE_importTypeSpec);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 735;
            this.match(Stage8Parser.LPAREN);
            this.state = 736;
            this.match(Stage8Parser.IDENTIFIER);
            this.state = 738;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 737;
                this.importTypeName();
                }
                }
                this.state = 740;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 114);
            this.state = 742;
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
        this.enterRule(localContext, 82, Stage8Parser.RULE_importTypeName);
        try {
            this.state = 749;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case Stage8Parser.IDENTIFIER:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 744;
                this.match(Stage8Parser.IDENTIFIER);
                }
                break;
            case Stage8Parser.LPAREN:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 745;
                this.match(Stage8Parser.LPAREN);
                this.state = 746;
                this.match(Stage8Parser.IDENTIFIER);
                this.state = 747;
                this.match(Stage8Parser.IDENTIFIER);
                this.state = 748;
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
        this.enterRule(localContext, 84, Stage8Parser.RULE_exportForm);
        try {
            this.state = 760;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 53, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 751;
                this.exportBinding();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 752;
                this.exportDefault();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 753;
                this.exportNamed();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 754;
                this.exportNsFromForm();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 755;
                this.exportFrom();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 756;
                this.exportAllFrom();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 757;
                this.exportTypeForm();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 758;
                this.exportTypeFromForm();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 759;
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
        this.enterRule(localContext, 86, Stage8Parser.RULE_exportBinding);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 762;
            this.match(Stage8Parser.LPAREN);
            this.state = 763;
            this.match(Stage8Parser.EXPORT);
            this.state = 764;
            this.match(Stage8Parser.IDENTIFIER);
            this.state = 765;
            this.expression();
            this.state = 766;
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
        this.enterRule(localContext, 88, Stage8Parser.RULE_exportDefault);
        try {
            this.state = 793;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 54, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 768;
                this.match(Stage8Parser.LPAREN);
                this.state = 769;
                this.match(Stage8Parser.EXPORT_DEFAULT);
                this.state = 770;
                this.classDef();
                this.state = 771;
                this.match(Stage8Parser.RPAREN);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 773;
                this.match(Stage8Parser.LPAREN);
                this.state = 774;
                this.match(Stage8Parser.EXPORT_DEFAULT);
                this.state = 775;
                this.anonClassDef();
                this.state = 776;
                this.match(Stage8Parser.RPAREN);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 778;
                this.match(Stage8Parser.LPAREN);
                this.state = 779;
                this.match(Stage8Parser.EXPORT_DEFAULT);
                this.state = 780;
                this.topLevelLet();
                this.state = 781;
                this.match(Stage8Parser.RPAREN);
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 783;
                this.match(Stage8Parser.LPAREN);
                this.state = 784;
                this.match(Stage8Parser.EXPORT_DEFAULT);
                this.state = 785;
                this.topLevelConst();
                this.state = 786;
                this.match(Stage8Parser.RPAREN);
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 788;
                this.match(Stage8Parser.LPAREN);
                this.state = 789;
                this.match(Stage8Parser.EXPORT_DEFAULT);
                this.state = 790;
                this.expression();
                this.state = 791;
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
        this.enterRule(localContext, 90, Stage8Parser.RULE_exportNamed);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 795;
            this.match(Stage8Parser.LPAREN);
            this.state = 796;
            this.match(Stage8Parser.EXPORT_NAMED);
            this.state = 798;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 797;
                this.exportNamePair();
                }
                }
                this.state = 800;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2);
            this.state = 802;
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
        this.enterRule(localContext, 92, Stage8Parser.RULE_exportNamePair);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 804;
            this.match(Stage8Parser.LPAREN);
            this.state = 805;
            this.match(Stage8Parser.IDENTIFIER);
            this.state = 807;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 114) {
                {
                this.state = 806;
                this.match(Stage8Parser.IDENTIFIER);
                }
            }

            this.state = 809;
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
        this.enterRule(localContext, 94, Stage8Parser.RULE_exportFrom);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 811;
            this.match(Stage8Parser.LPAREN);
            this.state = 812;
            this.match(Stage8Parser.EXPORT_FROM);
            this.state = 813;
            this.match(Stage8Parser.STRING);
            this.state = 815;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 814;
                this.exportNamePair();
                }
                }
                this.state = 817;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2);
            this.state = 819;
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
        this.enterRule(localContext, 96, Stage8Parser.RULE_exportAllFrom);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 821;
            this.match(Stage8Parser.LPAREN);
            this.state = 822;
            this.match(Stage8Parser.EXPORT_ALL_FROM);
            this.state = 823;
            this.match(Stage8Parser.STRING);
            this.state = 824;
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
        this.enterRule(localContext, 98, Stage8Parser.RULE_exportNsFromForm);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 826;
            this.match(Stage8Parser.LPAREN);
            this.state = 827;
            this.match(Stage8Parser.EXPORT_NS_FROM);
            this.state = 828;
            this.match(Stage8Parser.STRING);
            this.state = 829;
            this.match(Stage8Parser.STRING);
            this.state = 830;
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
        this.enterRule(localContext, 100, Stage8Parser.RULE_exportTypeForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 832;
            this.match(Stage8Parser.LPAREN);
            this.state = 833;
            this.match(Stage8Parser.EXPORT_TYPE);
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
    public exportTypeFromForm(): ExportTypeFromFormContext {
        let localContext = new ExportTypeFromFormContext(this.context, this.state);
        this.enterRule(localContext, 102, Stage8Parser.RULE_exportTypeFromForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 841;
            this.match(Stage8Parser.LPAREN);
            this.state = 842;
            this.match(Stage8Parser.EXPORT_TYPE_FROM);
            this.state = 843;
            this.match(Stage8Parser.STRING);
            this.state = 845;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 844;
                this.exportNamePair();
                }
                }
                this.state = 847;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2);
            this.state = 849;
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
        this.enterRule(localContext, 104, Stage8Parser.RULE_exportTypeAllFromForm);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 851;
            this.match(Stage8Parser.LPAREN);
            this.state = 852;
            this.match(Stage8Parser.EXPORT_TYPE_ALL_FROM);
            this.state = 853;
            this.match(Stage8Parser.STRING);
            this.state = 854;
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
        this.enterRule(localContext, 106, Stage8Parser.RULE_exportDeclForm);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 856;
            this.match(Stage8Parser.LPAREN);
            this.state = 857;
            this.match(Stage8Parser.EXPORT);
            this.state = 858;
            this.decl();
            this.state = 859;
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
        this.enterRule(localContext, 108, Stage8Parser.RULE_starBinding);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 861;
            this.match(Stage8Parser.LPAREN);
            this.state = 862;
            this.match(Stage8Parser.IDENTIFIER);
            this.state = 865;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 87) {
                {
                this.state = 863;
                this.match(Stage8Parser.COLON);
                this.state = 864;
                this.typeExpr();
                }
            }

            this.state = 867;
            this.expression();
            this.state = 868;
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
        this.enterRule(localContext, 110, Stage8Parser.RULE_singleBinding);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 870;
            this.match(Stage8Parser.LPAREN);
            this.state = 871;
            this.match(Stage8Parser.IDENTIFIER);
            this.state = 874;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 87) {
                {
                this.state = 872;
                this.match(Stage8Parser.COLON);
                this.state = 873;
                this.typeExpr();
                }
            }

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
    public typeExpr(): TypeExprContext {
        let localContext = new TypeExprContext(this.context, this.state);
        this.enterRule(localContext, 112, Stage8Parser.RULE_typeExpr);
        try {
            this.state = 894;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 62, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 878;
                this.match(Stage8Parser.IDENTIFIER);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 879;
                this.typeUnion();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 880;
                this.typeIntersection();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 881;
                this.typeArray();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 882;
                this.typeTuple();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 883;
                this.typeFunction();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 884;
                this.typeObject();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 885;
                this.typeLiteral();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 886;
                this.typeKeyof();
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 887;
                this.typeTypeof();
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 888;
                this.typeIndexAccess();
                }
                break;
            case 12:
                this.enterOuterAlt(localContext, 12);
                {
                this.state = 889;
                this.typeConditional();
                }
                break;
            case 13:
                this.enterOuterAlt(localContext, 13);
                {
                this.state = 890;
                this.typeInfer();
                }
                break;
            case 14:
                this.enterOuterAlt(localContext, 14);
                {
                this.state = 891;
                this.typeMapped();
                }
                break;
            case 15:
                this.enterOuterAlt(localContext, 15);
                {
                this.state = 892;
                this.typeTemplateLiteral();
                }
                break;
            case 16:
                this.enterOuterAlt(localContext, 16);
                {
                this.state = 893;
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
        this.enterRule(localContext, 114, Stage8Parser.RULE_typeUnion);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 896;
            this.match(Stage8Parser.LPAREN);
            this.state = 897;
            this.match(Stage8Parser.UNION);
            this.state = 898;
            this.typeExpr();
            this.state = 900;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 899;
                this.typeExpr();
                }
                }
                this.state = 902;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 114);
            this.state = 904;
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
        this.enterRule(localContext, 116, Stage8Parser.RULE_typeIntersection);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 906;
            this.match(Stage8Parser.LPAREN);
            this.state = 907;
            this.match(Stage8Parser.INTERSECT);
            this.state = 908;
            this.typeExpr();
            this.state = 910;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 909;
                this.typeExpr();
                }
                }
                this.state = 912;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 114);
            this.state = 914;
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
        this.enterRule(localContext, 118, Stage8Parser.RULE_typeArray);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 916;
            this.match(Stage8Parser.LPAREN);
            this.state = 917;
            this.match(Stage8Parser.TYPE_ARRAY);
            this.state = 918;
            this.typeExpr();
            this.state = 919;
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
        this.enterRule(localContext, 120, Stage8Parser.RULE_typeTuple);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 921;
            this.match(Stage8Parser.LPAREN);
            this.state = 922;
            this.match(Stage8Parser.TUPLE);
            this.state = 924;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 923;
                this.typeTupleElement();
                }
                }
                this.state = 926;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 114);
            this.state = 928;
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
        this.enterRule(localContext, 122, Stage8Parser.RULE_typeTupleElement);
        try {
            this.state = 941;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 66, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 930;
                this.match(Stage8Parser.LPAREN);
                this.state = 931;
                this.match(Stage8Parser.REST);
                this.state = 932;
                this.typeExpr();
                this.state = 933;
                this.match(Stage8Parser.RPAREN);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 935;
                this.match(Stage8Parser.LPAREN);
                this.state = 936;
                this.match(Stage8Parser.IDENTIFIER);
                this.state = 937;
                this.typeExpr();
                this.state = 938;
                this.match(Stage8Parser.RPAREN);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 940;
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
        this.enterRule(localContext, 124, Stage8Parser.RULE_typeFunction);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 943;
            this.match(Stage8Parser.LPAREN);
            this.state = 944;
            this.match(Stage8Parser.TYPEFN);
            this.state = 946;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 67, this.context) ) {
            case 1:
                {
                this.state = 945;
                this.typeParams();
                }
                break;
            }
            this.state = 948;
            this.match(Stage8Parser.LPAREN);
            this.state = 952;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 949;
                this.typeFnParam();
                }
                }
                this.state = 954;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 955;
            this.match(Stage8Parser.RPAREN);
            this.state = 956;
            this.typeExpr();
            this.state = 957;
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
        this.enterRule(localContext, 126, Stage8Parser.RULE_typeFnParam);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 959;
            this.match(Stage8Parser.LPAREN);
            this.state = 960;
            this.match(Stage8Parser.IDENTIFIER);
            this.state = 962;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 83) {
                {
                this.state = 961;
                this.match(Stage8Parser.OPTIONAL);
                }
            }

            this.state = 964;
            this.typeExpr();
            this.state = 965;
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
        this.enterRule(localContext, 128, Stage8Parser.RULE_typeObject);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 967;
            this.match(Stage8Parser.LPAREN);
            this.state = 968;
            this.match(Stage8Parser.IDENTIFIER);
            this.state = 972;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 969;
                this.typeProp();
                }
                }
                this.state = 974;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 975;
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
        this.enterRule(localContext, 130, Stage8Parser.RULE_typeProp);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 977;
            this.match(Stage8Parser.LPAREN);
            this.state = 981;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 75) {
                {
                {
                this.state = 978;
                this.propModifier();
                }
                }
                this.state = 983;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 984;
            this.match(Stage8Parser.IDENTIFIER);
            this.state = 986;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 83) {
                {
                this.state = 985;
                this.match(Stage8Parser.OPTIONAL);
                }
            }

            this.state = 988;
            this.typeExpr();
            this.state = 989;
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
        this.enterRule(localContext, 132, Stage8Parser.RULE_propModifier);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 991;
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
        this.enterRule(localContext, 134, Stage8Parser.RULE_typeLiteral);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 993;
            this.match(Stage8Parser.LPAREN);
            this.state = 994;
            this.match(Stage8Parser.LIT);
            this.state = 995;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 84)) & ~0x1F) === 0 && ((1 << (_la - 84)) & 100663297) !== 0))) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 996;
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
        this.enterRule(localContext, 136, Stage8Parser.RULE_typeKeyof);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 998;
            this.match(Stage8Parser.LPAREN);
            this.state = 999;
            this.match(Stage8Parser.KEYOF);
            this.state = 1000;
            this.typeExpr();
            this.state = 1001;
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
        this.enterRule(localContext, 138, Stage8Parser.RULE_typeTypeof);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1003;
            this.match(Stage8Parser.LPAREN);
            this.state = 1004;
            this.match(Stage8Parser.TYPEOF);
            this.state = 1005;
            this.match(Stage8Parser.IDENTIFIER);
            this.state = 1006;
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
        this.enterRule(localContext, 140, Stage8Parser.RULE_typeIndexAccess);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1008;
            this.match(Stage8Parser.LPAREN);
            this.state = 1009;
            this.match(Stage8Parser.INDEX);
            this.state = 1010;
            this.typeExpr();
            this.state = 1011;
            this.typeExpr();
            this.state = 1012;
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
        this.enterRule(localContext, 142, Stage8Parser.RULE_typeConditional);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1014;
            this.match(Stage8Parser.LPAREN);
            this.state = 1015;
            this.match(Stage8Parser.COND);
            this.state = 1016;
            this.typeExpr();
            this.state = 1017;
            this.typeExpr();
            this.state = 1018;
            this.typeExpr();
            this.state = 1019;
            this.typeExpr();
            this.state = 1020;
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
        this.enterRule(localContext, 144, Stage8Parser.RULE_typeInfer);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1022;
            this.match(Stage8Parser.LPAREN);
            this.state = 1023;
            this.match(Stage8Parser.INFER);
            this.state = 1024;
            this.match(Stage8Parser.IDENTIFIER);
            this.state = 1025;
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
        this.enterRule(localContext, 146, Stage8Parser.RULE_typeMapped);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1027;
            this.match(Stage8Parser.LPAREN);
            this.state = 1028;
            this.match(Stage8Parser.MAPPED);
            this.state = 1029;
            this.match(Stage8Parser.IDENTIFIER);
            this.state = 1030;
            this.typeExpr();
            this.state = 1032;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 73, this.context) ) {
            case 1:
                {
                this.state = 1031;
                this.mappedModifiers();
                }
                break;
            }
            this.state = 1034;
            this.typeExpr();
            this.state = 1035;
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
        this.enterRule(localContext, 148, Stage8Parser.RULE_mappedModifiers);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1037;
            this.match(Stage8Parser.LPAREN);
            this.state = 1038;
            this.match(Stage8Parser.MODIFIERS);
            this.state = 1040;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 1039;
                this.mappedModifier();
                }
                }
                this.state = 1042;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 75 || _la === 83);
            this.state = 1044;
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
        this.enterRule(localContext, 150, Stage8Parser.RULE_mappedModifier);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1046;
            _la = this.tokenStream.LA(1);
            if(!(_la === 75 || _la === 83)) {
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
        this.enterRule(localContext, 152, Stage8Parser.RULE_typeTemplateLiteral);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1048;
            this.match(Stage8Parser.LPAREN);
            this.state = 1049;
            this.match(Stage8Parser.TYPE_TEMPLATE);
            this.state = 1051;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 1050;
                this.templatePart();
                }
                }
                this.state = 1053;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 110 || _la === 114);
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
    public templatePart(): TemplatePartContext {
        let localContext = new TemplatePartContext(this.context, this.state);
        this.enterRule(localContext, 154, Stage8Parser.RULE_templatePart);
        try {
            this.state = 1059;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case Stage8Parser.STRING:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1057;
                this.match(Stage8Parser.STRING);
                }
                break;
            case Stage8Parser.LPAREN:
            case Stage8Parser.IDENTIFIER:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1058;
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
        this.enterRule(localContext, 156, Stage8Parser.RULE_typeApplication);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1061;
            this.match(Stage8Parser.LPAREN);
            this.state = 1062;
            this.typeExpr();
            this.state = 1064;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 1063;
                this.typeExpr();
                }
                }
                this.state = 1066;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 114);
            this.state = 1068;
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
        this.enterRule(localContext, 158, Stage8Parser.RULE_typeParams);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1070;
            this.match(Stage8Parser.LPAREN);
            this.state = 1071;
            this.match(Stage8Parser.TYPE_PARAMS);
            this.state = 1073;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 1072;
                this.typeParamDecl();
                }
                }
                this.state = 1075;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 114);
            this.state = 1077;
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
        this.enterRule(localContext, 160, Stage8Parser.RULE_typeParamDecl);
        let _la: number;
        try {
            this.state = 1089;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case Stage8Parser.IDENTIFIER:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1079;
                this.match(Stage8Parser.IDENTIFIER);
                }
                break;
            case Stage8Parser.LPAREN:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1080;
                this.match(Stage8Parser.LPAREN);
                this.state = 1081;
                this.match(Stage8Parser.IDENTIFIER);
                this.state = 1083;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 79, this.context) ) {
                case 1:
                    {
                    this.state = 1082;
                    this.typeParamConstraint();
                    }
                    break;
                }
                this.state = 1086;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 2) {
                    {
                    this.state = 1085;
                    this.typeParamDefault();
                    }
                }

                this.state = 1088;
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
    public typeParamConstraint(): TypeParamConstraintContext {
        let localContext = new TypeParamConstraintContext(this.context, this.state);
        this.enterRule(localContext, 162, Stage8Parser.RULE_typeParamConstraint);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1091;
            this.match(Stage8Parser.LPAREN);
            this.state = 1092;
            this.match(Stage8Parser.EXTENDS);
            this.state = 1093;
            this.typeExpr();
            this.state = 1094;
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
        this.enterRule(localContext, 164, Stage8Parser.RULE_typeParamDefault);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1096;
            this.match(Stage8Parser.LPAREN);
            this.state = 1097;
            this.match(Stage8Parser.DEFAULT);
            this.state = 1098;
            this.typeExpr();
            this.state = 1099;
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
        this.enterRule(localContext, 166, Stage8Parser.RULE_assign);
        try {
            this.state = 1113;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 82, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1101;
                this.match(Stage8Parser.LPAREN);
                this.state = 1102;
                this.match(Stage8Parser.SET);
                this.state = 1103;
                this.match(Stage8Parser.IDENTIFIER);
                this.state = 1104;
                this.expression();
                this.state = 1105;
                this.match(Stage8Parser.RPAREN);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1107;
                this.match(Stage8Parser.LPAREN);
                this.state = 1108;
                this.match(Stage8Parser.SET);
                this.state = 1109;
                this.propAccess();
                this.state = 1110;
                this.expression();
                this.state = 1111;
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
        this.enterRule(localContext, 168, Stage8Parser.RULE_switchForm);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1115;
            this.match(Stage8Parser.LPAREN);
            this.state = 1116;
            this.match(Stage8Parser.SWITCH);
            this.state = 1117;
            this.expression();
            this.state = 1121;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 83, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 1118;
                    this.caseClause();
                    }
                    }
                }
                this.state = 1123;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 83, this.context);
            }
            this.state = 1125;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2) {
                {
                this.state = 1124;
                this.defaultClause();
                }
            }

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
    public caseClause(): CaseClauseContext {
        let localContext = new CaseClauseContext(this.context, this.state);
        this.enterRule(localContext, 170, Stage8Parser.RULE_caseClause);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1129;
            this.match(Stage8Parser.LPAREN);
            this.state = 1130;
            this.match(Stage8Parser.CASE);
            this.state = 1131;
            this.expression();
            this.state = 1135;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 18 || ((((_la - 57)) & ~0x1F) === 0 && ((1 << (_la - 57)) & 939524099) !== 0) || ((((_la - 108)) & ~0x1F) === 0 && ((1 << (_la - 108)) & 119) !== 0)) {
                {
                {
                this.state = 1132;
                this.statement();
                }
                }
                this.state = 1137;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1138;
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
        this.enterRule(localContext, 172, Stage8Parser.RULE_defaultClause);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1140;
            this.match(Stage8Parser.LPAREN);
            this.state = 1141;
            this.match(Stage8Parser.DEFAULT);
            this.state = 1145;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 18 || ((((_la - 57)) & ~0x1F) === 0 && ((1 << (_la - 57)) & 939524099) !== 0) || ((((_la - 108)) & ~0x1F) === 0 && ((1 << (_la - 108)) & 119) !== 0)) {
                {
                {
                this.state = 1142;
                this.statement();
                }
                }
                this.state = 1147;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1148;
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
        this.enterRule(localContext, 174, Stage8Parser.RULE_forForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1150;
            this.match(Stage8Parser.LPAREN);
            this.state = 1151;
            this.match(Stage8Parser.FOR);
            this.state = 1152;
            this.letStmt();
            this.state = 1153;
            this.expression();
            this.state = 1154;
            this.assign();
            this.state = 1158;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 18 || ((((_la - 57)) & ~0x1F) === 0 && ((1 << (_la - 57)) & 939524099) !== 0) || ((((_la - 108)) & ~0x1F) === 0 && ((1 << (_la - 108)) & 119) !== 0)) {
                {
                {
                this.state = 1155;
                this.statement();
                }
                }
                this.state = 1160;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1161;
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
        this.enterRule(localContext, 176, Stage8Parser.RULE_forInForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1163;
            this.match(Stage8Parser.LPAREN);
            this.state = 1164;
            this.match(Stage8Parser.FORIN);
            this.state = 1165;
            this.match(Stage8Parser.IDENTIFIER);
            this.state = 1166;
            this.expression();
            this.state = 1170;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 18 || ((((_la - 57)) & ~0x1F) === 0 && ((1 << (_la - 57)) & 939524099) !== 0) || ((((_la - 108)) & ~0x1F) === 0 && ((1 << (_la - 108)) & 119) !== 0)) {
                {
                {
                this.state = 1167;
                this.statement();
                }
                }
                this.state = 1172;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1173;
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
        this.enterRule(localContext, 178, Stage8Parser.RULE_forOfForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1175;
            this.match(Stage8Parser.LPAREN);
            this.state = 1176;
            this.match(Stage8Parser.FOROF);
            this.state = 1177;
            this.match(Stage8Parser.IDENTIFIER);
            this.state = 1178;
            this.expression();
            this.state = 1182;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 18 || ((((_la - 57)) & ~0x1F) === 0 && ((1 << (_la - 57)) & 939524099) !== 0) || ((((_la - 108)) & ~0x1F) === 0 && ((1 << (_la - 108)) & 119) !== 0)) {
                {
                {
                this.state = 1179;
                this.statement();
                }
                }
                this.state = 1184;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1185;
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
        this.enterRule(localContext, 180, Stage8Parser.RULE_forAwaitForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1187;
            this.match(Stage8Parser.LPAREN);
            this.state = 1188;
            this.match(Stage8Parser.FORAWAIT);
            this.state = 1189;
            this.match(Stage8Parser.IDENTIFIER);
            this.state = 1190;
            this.expression();
            this.state = 1194;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 18 || ((((_la - 57)) & ~0x1F) === 0 && ((1 << (_la - 57)) & 939524099) !== 0) || ((((_la - 108)) & ~0x1F) === 0 && ((1 << (_la - 108)) & 119) !== 0)) {
                {
                {
                this.state = 1191;
                this.statement();
                }
                }
                this.state = 1196;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1197;
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
        this.enterRule(localContext, 182, Stage8Parser.RULE_tryForm);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1199;
            this.match(Stage8Parser.LPAREN);
            this.state = 1200;
            this.match(Stage8Parser.TRY);
            this.state = 1204;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 91, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 1201;
                    this.statement();
                    }
                    }
                }
                this.state = 1206;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 91, this.context);
            }
            this.state = 1212;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 93, this.context) ) {
            case 1:
                {
                this.state = 1207;
                this.catchClause();
                this.state = 1209;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 2) {
                    {
                    this.state = 1208;
                    this.finallyClause();
                    }
                }

                }
                break;
            case 2:
                {
                this.state = 1211;
                this.finallyClause();
                }
                break;
            }
            this.state = 1214;
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
        this.enterRule(localContext, 184, Stage8Parser.RULE_catchClause);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1216;
            this.match(Stage8Parser.LPAREN);
            this.state = 1217;
            this.match(Stage8Parser.CATCH);
            this.state = 1218;
            this.match(Stage8Parser.IDENTIFIER);
            this.state = 1222;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 18 || ((((_la - 57)) & ~0x1F) === 0 && ((1 << (_la - 57)) & 939524099) !== 0) || ((((_la - 108)) & ~0x1F) === 0 && ((1 << (_la - 108)) & 119) !== 0)) {
                {
                {
                this.state = 1219;
                this.statement();
                }
                }
                this.state = 1224;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1225;
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
        this.enterRule(localContext, 186, Stage8Parser.RULE_finallyClause);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1227;
            this.match(Stage8Parser.LPAREN);
            this.state = 1228;
            this.match(Stage8Parser.FINALLY);
            this.state = 1232;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 18 || ((((_la - 57)) & ~0x1F) === 0 && ((1 << (_la - 57)) & 939524099) !== 0) || ((((_la - 108)) & ~0x1F) === 0 && ((1 << (_la - 108)) & 119) !== 0)) {
                {
                {
                this.state = 1229;
                this.statement();
                }
                }
                this.state = 1234;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1235;
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
        this.enterRule(localContext, 188, Stage8Parser.RULE_expression);
        try {
            this.state = 1274;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 96, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1237;
                this.literal();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1238;
                this.match(Stage8Parser.KEYWORD);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 1239;
                this.match(Stage8Parser.IDENTIFIER);
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 1240;
                this.match(Stage8Parser.MACRO_ERROR);
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 1241;
                this.match(Stage8Parser.MINUS);
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 1242;
                this.lambda();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 1243;
                this.fn();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 1244;
                this.asyncLambda();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 1245;
                this.asyncFn();
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 1246;
                this.generatorFn();
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 1247;
                this.asyncGeneratorFn();
                }
                break;
            case 12:
                this.enterOuterAlt(localContext, 12);
                {
                this.state = 1248;
                this.awaitExpr();
                }
                break;
            case 13:
                this.enterOuterAlt(localContext, 13);
                {
                this.state = 1249;
                this.yieldExpr();
                }
                break;
            case 14:
                this.enterOuterAlt(localContext, 14);
                {
                this.state = 1250;
                this.yieldStarExpr();
                }
                break;
            case 15:
                this.enterOuterAlt(localContext, 15);
                {
                this.state = 1251;
                this.bindExpr();
                }
                break;
            case 16:
                this.enterOuterAlt(localContext, 16);
                {
                this.state = 1252;
                this.methodCallExpr();
                }
                break;
            case 17:
                this.enterOuterAlt(localContext, 17);
                {
                this.state = 1253;
                this.objectExpr();
                }
                break;
            case 18:
                this.enterOuterAlt(localContext, 18);
                {
                this.state = 1254;
                this.arrayExpr();
                }
                break;
            case 19:
                this.enterOuterAlt(localContext, 19);
                {
                this.state = 1255;
                this.propAccess();
                }
                break;
            case 20:
                this.enterOuterAlt(localContext, 20);
                {
                this.state = 1256;
                this.indexAccess();
                }
                break;
            case 21:
                this.enterOuterAlt(localContext, 21);
                {
                this.state = 1257;
                this.quasiquote();
                }
                break;
            case 22:
                this.enterOuterAlt(localContext, 22);
                {
                this.state = 1258;
                this.unquote();
                }
                break;
            case 23:
                this.enterOuterAlt(localContext, 23);
                {
                this.state = 1259;
                this.unquoteSplicing();
                }
                break;
            case 24:
                this.enterOuterAlt(localContext, 24);
                {
                this.state = 1260;
                this.ternary();
                }
                break;
            case 25:
                this.enterOuterAlt(localContext, 25);
                {
                this.state = 1261;
                this.condExpr();
                }
                break;
            case 26:
                this.enterOuterAlt(localContext, 26);
                {
                this.state = 1262;
                this.newForm();
                }
                break;
            case 27:
                this.enterOuterAlt(localContext, 27);
                {
                this.state = 1263;
                this.optChain();
                }
                break;
            case 28:
                this.enterOuterAlt(localContext, 28);
                {
                this.state = 1264;
                this.optChainIndex();
                }
                break;
            case 29:
                this.enterOuterAlt(localContext, 29);
                {
                this.state = 1265;
                this.nullCoalesce();
                }
                break;
            case 30:
                this.enterOuterAlt(localContext, 30);
                {
                this.state = 1266;
                this.typeofExpr();
                }
                break;
            case 31:
                this.enterOuterAlt(localContext, 31);
                {
                this.state = 1267;
                this.typeAssert();
                }
                break;
            case 32:
                this.enterOuterAlt(localContext, 32);
                {
                this.state = 1268;
                this.templateExpr();
                }
                break;
            case 33:
                this.enterOuterAlt(localContext, 33);
                {
                this.state = 1269;
                this.thisExpr();
                }
                break;
            case 34:
                this.enterOuterAlt(localContext, 34);
                {
                this.state = 1270;
                this.superExpr();
                }
                break;
            case 35:
                this.enterOuterAlt(localContext, 35);
                {
                this.state = 1271;
                this.superConstructorCall();
                }
                break;
            case 36:
                this.enterOuterAlt(localContext, 36);
                {
                this.state = 1272;
                this.superMethodCall();
                }
                break;
            case 37:
                this.enterOuterAlt(localContext, 37);
                {
                this.state = 1273;
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
        this.enterRule(localContext, 190, Stage8Parser.RULE_thisExpr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1276;
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
        this.enterRule(localContext, 192, Stage8Parser.RULE_superExpr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1278;
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
        this.enterRule(localContext, 194, Stage8Parser.RULE_superConstructorCall);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1280;
            this.match(Stage8Parser.LPAREN);
            this.state = 1281;
            this.match(Stage8Parser.SUPER);
            this.state = 1285;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 18 || ((((_la - 57)) & ~0x1F) === 0 && ((1 << (_la - 57)) & 939524099) !== 0) || ((((_la - 108)) & ~0x1F) === 0 && ((1 << (_la - 108)) & 119) !== 0)) {
                {
                {
                this.state = 1282;
                this.expression();
                }
                }
                this.state = 1287;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1288;
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
        this.enterRule(localContext, 196, Stage8Parser.RULE_superMethodCall);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1290;
            this.match(Stage8Parser.LPAREN);
            this.state = 1291;
            this.match(Stage8Parser.SUPER_METHOD);
            this.state = 1292;
            this.match(Stage8Parser.IDENTIFIER);
            this.state = 1296;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 18 || ((((_la - 57)) & ~0x1F) === 0 && ((1 << (_la - 57)) & 939524099) !== 0) || ((((_la - 108)) & ~0x1F) === 0 && ((1 << (_la - 108)) & 119) !== 0)) {
                {
                {
                this.state = 1293;
                this.expression();
                }
                }
                this.state = 1298;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1299;
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
        this.enterRule(localContext, 198, Stage8Parser.RULE_typeofExpr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1301;
            this.match(Stage8Parser.LPAREN);
            this.state = 1302;
            this.match(Stage8Parser.TYPEOF);
            this.state = 1303;
            this.expression();
            this.state = 1304;
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
        this.enterRule(localContext, 200, Stage8Parser.RULE_typeAssert);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1306;
            this.match(Stage8Parser.LPAREN);
            this.state = 1307;
            this.match(Stage8Parser.TYPE_AS);
            this.state = 1308;
            this.expression();
            this.state = 1309;
            this.typeExpr();
            this.state = 1310;
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
        this.enterRule(localContext, 202, Stage8Parser.RULE_lambda);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1312;
            this.match(Stage8Parser.LPAREN);
            this.state = 1313;
            this.match(Stage8Parser.LAMBDA);
            this.state = 1314;
            this.fnSignature();
            this.state = 1318;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 18 || ((((_la - 57)) & ~0x1F) === 0 && ((1 << (_la - 57)) & 939524099) !== 0) || ((((_la - 108)) & ~0x1F) === 0 && ((1 << (_la - 108)) & 119) !== 0)) {
                {
                {
                this.state = 1315;
                this.statement();
                }
                }
                this.state = 1320;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1321;
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
        this.enterRule(localContext, 204, Stage8Parser.RULE_fn);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1323;
            this.match(Stage8Parser.LPAREN);
            this.state = 1324;
            this.match(Stage8Parser.FN);
            this.state = 1325;
            this.fnSignature();
            this.state = 1329;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 18 || ((((_la - 57)) & ~0x1F) === 0 && ((1 << (_la - 57)) & 939524099) !== 0) || ((((_la - 108)) & ~0x1F) === 0 && ((1 << (_la - 108)) & 119) !== 0)) {
                {
                {
                this.state = 1326;
                this.statement();
                }
                }
                this.state = 1331;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1332;
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
        this.enterRule(localContext, 206, Stage8Parser.RULE_asyncLambda);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1334;
            this.match(Stage8Parser.LPAREN);
            this.state = 1335;
            this.match(Stage8Parser.ASYNC_LAMBDA);
            this.state = 1336;
            this.fnSignature();
            this.state = 1340;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 18 || ((((_la - 57)) & ~0x1F) === 0 && ((1 << (_la - 57)) & 939524099) !== 0) || ((((_la - 108)) & ~0x1F) === 0 && ((1 << (_la - 108)) & 119) !== 0)) {
                {
                {
                this.state = 1337;
                this.statement();
                }
                }
                this.state = 1342;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1343;
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
        this.enterRule(localContext, 208, Stage8Parser.RULE_asyncFn);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1345;
            this.match(Stage8Parser.LPAREN);
            this.state = 1346;
            this.match(Stage8Parser.ASYNC_FN);
            this.state = 1347;
            this.fnSignature();
            this.state = 1351;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 18 || ((((_la - 57)) & ~0x1F) === 0 && ((1 << (_la - 57)) & 939524099) !== 0) || ((((_la - 108)) & ~0x1F) === 0 && ((1 << (_la - 108)) & 119) !== 0)) {
                {
                {
                this.state = 1348;
                this.statement();
                }
                }
                this.state = 1353;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1354;
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
        this.enterRule(localContext, 210, Stage8Parser.RULE_generatorFn);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1356;
            this.match(Stage8Parser.LPAREN);
            this.state = 1357;
            this.match(Stage8Parser.GENERATOR_FN);
            this.state = 1358;
            this.fnSignature();
            this.state = 1362;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 18 || ((((_la - 57)) & ~0x1F) === 0 && ((1 << (_la - 57)) & 939524099) !== 0) || ((((_la - 108)) & ~0x1F) === 0 && ((1 << (_la - 108)) & 119) !== 0)) {
                {
                {
                this.state = 1359;
                this.statement();
                }
                }
                this.state = 1364;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1365;
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
        this.enterRule(localContext, 212, Stage8Parser.RULE_asyncGeneratorFn);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1367;
            this.match(Stage8Parser.LPAREN);
            this.state = 1368;
            this.match(Stage8Parser.ASYNC_GENERATOR_FN);
            this.state = 1369;
            this.fnSignature();
            this.state = 1373;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 18 || ((((_la - 57)) & ~0x1F) === 0 && ((1 << (_la - 57)) & 939524099) !== 0) || ((((_la - 108)) & ~0x1F) === 0 && ((1 << (_la - 108)) & 119) !== 0)) {
                {
                {
                this.state = 1370;
                this.statement();
                }
                }
                this.state = 1375;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1376;
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
        this.enterRule(localContext, 214, Stage8Parser.RULE_awaitExpr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1378;
            this.match(Stage8Parser.LPAREN);
            this.state = 1379;
            this.match(Stage8Parser.AWAIT);
            this.state = 1380;
            this.expression();
            this.state = 1381;
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
        this.enterRule(localContext, 216, Stage8Parser.RULE_yieldExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1383;
            this.match(Stage8Parser.LPAREN);
            this.state = 1384;
            this.match(Stage8Parser.YIELD);
            this.state = 1386;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2 || _la === 18 || ((((_la - 57)) & ~0x1F) === 0 && ((1 << (_la - 57)) & 939524099) !== 0) || ((((_la - 108)) & ~0x1F) === 0 && ((1 << (_la - 108)) & 119) !== 0)) {
                {
                this.state = 1385;
                this.expression();
                }
            }

            this.state = 1388;
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
        this.enterRule(localContext, 218, Stage8Parser.RULE_yieldStarExpr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1390;
            this.match(Stage8Parser.LPAREN);
            this.state = 1391;
            this.match(Stage8Parser.YIELD_STAR);
            this.state = 1392;
            this.expression();
            this.state = 1393;
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
        this.enterRule(localContext, 220, Stage8Parser.RULE_bindExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1395;
            this.match(Stage8Parser.LPAREN);
            this.state = 1396;
            this.match(Stage8Parser.BIND);
            this.state = 1397;
            this.expression();
            this.state = 1398;
            this.expression();
            this.state = 1402;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 18 || ((((_la - 57)) & ~0x1F) === 0 && ((1 << (_la - 57)) & 939524099) !== 0) || ((((_la - 108)) & ~0x1F) === 0 && ((1 << (_la - 108)) & 119) !== 0)) {
                {
                {
                this.state = 1399;
                this.expression();
                }
                }
                this.state = 1404;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1405;
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
        this.enterRule(localContext, 222, Stage8Parser.RULE_methodCallExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1407;
            this.match(Stage8Parser.LPAREN);
            this.state = 1408;
            this.match(Stage8Parser.METHOD_CALL);
            this.state = 1409;
            this.expression();
            this.state = 1410;
            this.expression();
            this.state = 1414;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 18 || ((((_la - 57)) & ~0x1F) === 0 && ((1 << (_la - 57)) & 939524099) !== 0) || ((((_la - 108)) & ~0x1F) === 0 && ((1 << (_la - 108)) & 119) !== 0)) {
                {
                {
                this.state = 1411;
                this.expression();
                }
                }
                this.state = 1416;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1417;
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
        this.enterRule(localContext, 224, Stage8Parser.RULE_ternary);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1419;
            this.match(Stage8Parser.LPAREN);
            this.state = 1420;
            this.match(Stage8Parser.TERNARY);
            this.state = 1421;
            this.expression();
            this.state = 1422;
            this.expression();
            this.state = 1423;
            this.expression();
            this.state = 1424;
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
        this.enterRule(localContext, 226, Stage8Parser.RULE_condExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1426;
            this.match(Stage8Parser.LPAREN);
            this.state = 1427;
            this.match(Stage8Parser.COND);
            this.state = 1431;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 1428;
                this.expression();
                this.state = 1429;
                this.expression();
                }
                }
                this.state = 1433;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 18 || ((((_la - 57)) & ~0x1F) === 0 && ((1 << (_la - 57)) & 939524099) !== 0) || ((((_la - 108)) & ~0x1F) === 0 && ((1 << (_la - 108)) & 119) !== 0));
            this.state = 1435;
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
    public newForm(): NewFormContext {
        let localContext = new NewFormContext(this.context, this.state);
        this.enterRule(localContext, 228, Stage8Parser.RULE_newForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1437;
            this.match(Stage8Parser.LPAREN);
            this.state = 1438;
            this.match(Stage8Parser.NEW);
            this.state = 1439;
            this.match(Stage8Parser.IDENTIFIER);
            this.state = 1441;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 109, this.context) ) {
            case 1:
                {
                this.state = 1440;
                this.typeArgs();
                }
                break;
            }
            this.state = 1446;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 18 || ((((_la - 57)) & ~0x1F) === 0 && ((1 << (_la - 57)) & 939524099) !== 0) || ((((_la - 108)) & ~0x1F) === 0 && ((1 << (_la - 108)) & 119) !== 0)) {
                {
                {
                this.state = 1443;
                this.expression();
                }
                }
                this.state = 1448;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1449;
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
        this.enterRule(localContext, 230, Stage8Parser.RULE_objectExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1451;
            this.match(Stage8Parser.LPAREN);
            this.state = 1452;
            this.match(Stage8Parser.OBJECT);
            this.state = 1456;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 1453;
                this.objectField();
                }
                }
                this.state = 1458;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
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
    public objectField(): ObjectFieldContext {
        let localContext = new ObjectFieldContext(this.context, this.state);
        this.enterRule(localContext, 232, Stage8Parser.RULE_objectField);
        try {
            this.state = 1474;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 112, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1461;
                this.match(Stage8Parser.LPAREN);
                this.state = 1462;
                this.propKey();
                this.state = 1463;
                this.expression();
                this.state = 1464;
                this.match(Stage8Parser.RPAREN);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1466;
                this.match(Stage8Parser.LPAREN);
                this.state = 1467;
                this.propKey();
                this.state = 1468;
                this.methodDef();
                this.state = 1469;
                this.match(Stage8Parser.RPAREN);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 1471;
                this.match(Stage8Parser.LPAREN);
                this.state = 1472;
                this.match(Stage8Parser.IDENTIFIER);
                this.state = 1473;
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
        this.enterRule(localContext, 234, Stage8Parser.RULE_methodDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1476;
            this.match(Stage8Parser.LPAREN);
            this.state = 1477;
            this.match(Stage8Parser.METHOD);
            this.state = 1478;
            this.fnSignature();
            this.state = 1482;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 18 || ((((_la - 57)) & ~0x1F) === 0 && ((1 << (_la - 57)) & 939524099) !== 0) || ((((_la - 108)) & ~0x1F) === 0 && ((1 << (_la - 108)) & 119) !== 0)) {
                {
                {
                this.state = 1479;
                this.statement();
                }
                }
                this.state = 1484;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1485;
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
        this.enterRule(localContext, 236, Stage8Parser.RULE_arrayExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1487;
            this.match(Stage8Parser.LPAREN);
            this.state = 1488;
            this.match(Stage8Parser.ARRAY);
            this.state = 1492;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 18 || ((((_la - 57)) & ~0x1F) === 0 && ((1 << (_la - 57)) & 939524099) !== 0) || ((((_la - 108)) & ~0x1F) === 0 && ((1 << (_la - 108)) & 119) !== 0)) {
                {
                {
                this.state = 1489;
                this.expression();
                }
                }
                this.state = 1494;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1495;
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
        this.enterRule(localContext, 238, Stage8Parser.RULE_templateExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1497;
            this.match(Stage8Parser.LPAREN);
            this.state = 1498;
            this.match(Stage8Parser.TEMPLATE);
            this.state = 1501;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                this.state = 1501;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 115, this.context) ) {
                case 1:
                    {
                    this.state = 1499;
                    this.match(Stage8Parser.STRING);
                    }
                    break;
                case 2:
                    {
                    this.state = 1500;
                    this.expression();
                    }
                    break;
                }
                }
                this.state = 1503;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 18 || ((((_la - 57)) & ~0x1F) === 0 && ((1 << (_la - 57)) & 939524099) !== 0) || ((((_la - 108)) & ~0x1F) === 0 && ((1 << (_la - 108)) & 119) !== 0));
            this.state = 1505;
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
        this.enterRule(localContext, 240, Stage8Parser.RULE_propKey);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1507;
            _la = this.tokenStream.LA(1);
            if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 1073737696) !== 0) || ((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & 4294967293) !== 0) || ((((_la - 65)) & ~0x1F) === 0 && ((1 << (_la - 65)) & 2143027199) !== 0) || ((((_la - 98)) & ~0x1F) === 0 && ((1 << (_la - 98)) & 73727) !== 0))) {
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
        this.enterRule(localContext, 242, Stage8Parser.RULE_propAccess);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1509;
            this.match(Stage8Parser.LPAREN);
            this.state = 1510;
            this.match(Stage8Parser.DOT);
            this.state = 1511;
            this.expression();
            this.state = 1512;
            this.propKey();
            this.state = 1513;
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
        this.enterRule(localContext, 244, Stage8Parser.RULE_indexAccess);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1515;
            this.match(Stage8Parser.LPAREN);
            this.state = 1516;
            this.match(Stage8Parser.INDEX);
            this.state = 1517;
            this.expression();
            this.state = 1518;
            this.expression();
            this.state = 1519;
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
        this.enterRule(localContext, 246, Stage8Parser.RULE_quasiquote);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1521;
            this.match(Stage8Parser.LPAREN);
            this.state = 1522;
            _la = this.tokenStream.LA(1);
            if(!(_la === 35 || _la === 36)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 1523;
            this.quasiForm();
            this.state = 1524;
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
        this.enterRule(localContext, 248, Stage8Parser.RULE_quasiForm);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1526;
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
        this.enterRule(localContext, 250, Stage8Parser.RULE_sForm);
        let _la: number;
        try {
            this.state = 1547;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 118, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1528;
                this.match(Stage8Parser.LPAREN);
                this.state = 1529;
                this.match(Stage8Parser.UNQUOTE);
                this.state = 1530;
                this.expression();
                this.state = 1531;
                this.match(Stage8Parser.RPAREN);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1533;
                this.match(Stage8Parser.LPAREN);
                this.state = 1534;
                this.match(Stage8Parser.UNQUOTE_SPLICING);
                this.state = 1535;
                this.expression();
                this.state = 1536;
                this.match(Stage8Parser.RPAREN);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 1538;
                this.match(Stage8Parser.LPAREN);
                this.state = 1542;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4294967286) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 4294967295) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 4294967295) !== 0) || ((((_la - 96)) & ~0x1F) === 0 && ((1 << (_la - 96)) & 1048575) !== 0)) {
                    {
                    {
                    this.state = 1539;
                    this.sForm();
                    }
                    }
                    this.state = 1544;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 1545;
                this.match(Stage8Parser.RPAREN);
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 1546;
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
        this.enterRule(localContext, 252, Stage8Parser.RULE_unquote);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1549;
            this.match(Stage8Parser.LPAREN);
            this.state = 1550;
            this.match(Stage8Parser.UNQUOTE);
            this.state = 1551;
            this.expression();
            this.state = 1552;
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
        this.enterRule(localContext, 254, Stage8Parser.RULE_unquoteSplicing);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1554;
            this.match(Stage8Parser.LPAREN);
            this.state = 1555;
            this.match(Stage8Parser.UNQUOTE_SPLICING);
            this.state = 1556;
            this.expression();
            this.state = 1557;
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
        this.enterRule(localContext, 256, Stage8Parser.RULE_optChain);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1559;
            this.match(Stage8Parser.LPAREN);
            this.state = 1560;
            this.match(Stage8Parser.OPTCHAIN);
            this.state = 1561;
            this.expression();
            this.state = 1562;
            this.propKey();
            this.state = 1563;
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
        this.enterRule(localContext, 258, Stage8Parser.RULE_optChainIndex);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1565;
            this.match(Stage8Parser.LPAREN);
            this.state = 1566;
            this.match(Stage8Parser.OPTCHAIN_INDEX);
            this.state = 1567;
            this.expression();
            this.state = 1568;
            this.expression();
            this.state = 1569;
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
        this.enterRule(localContext, 260, Stage8Parser.RULE_nullCoalesce);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1571;
            this.match(Stage8Parser.LPAREN);
            this.state = 1572;
            this.match(Stage8Parser.NULLCOAL);
            this.state = 1573;
            this.expression();
            this.state = 1574;
            this.expression();
            this.state = 1575;
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
        this.enterRule(localContext, 262, Stage8Parser.RULE_call);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1577;
            this.match(Stage8Parser.LPAREN);
            this.state = 1578;
            this.expression();
            this.state = 1580;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 119, this.context) ) {
            case 1:
                {
                this.state = 1579;
                this.typeArgs();
                }
                break;
            }
            this.state = 1585;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 18 || ((((_la - 57)) & ~0x1F) === 0 && ((1 << (_la - 57)) & 939524099) !== 0) || ((((_la - 108)) & ~0x1F) === 0 && ((1 << (_la - 108)) & 119) !== 0)) {
                {
                {
                this.state = 1582;
                this.expression();
                }
                }
                this.state = 1587;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1588;
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
        this.enterRule(localContext, 264, Stage8Parser.RULE_typeArgs);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1590;
            this.match(Stage8Parser.LPAREN);
            this.state = 1591;
            this.match(Stage8Parser.TYPE_ARGS);
            this.state = 1593;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 1592;
                this.typeExpr();
                }
                }
                this.state = 1595;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 114);
            this.state = 1597;
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
        this.enterRule(localContext, 266, Stage8Parser.RULE_fnSignature);
        let _la: number;
        try {
            let alternative: number;
            this.state = 1630;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 129, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1599;
                this.match(Stage8Parser.LPAREN);
                this.state = 1616;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 2) {
                    {
                    this.state = 1600;
                    this.param();
                    this.state = 1607;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 123, this.context);
                    while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                        if (alternative === 1) {
                            {
                            {
                            this.state = 1602;
                            this.errorHandler.sync(this);
                            _la = this.tokenStream.LA(1);
                            if (_la === 4) {
                                {
                                this.state = 1601;
                                this.match(Stage8Parser.COMMA);
                                }
                            }

                            this.state = 1604;
                            this.param();
                            }
                            }
                        }
                        this.state = 1609;
                        this.errorHandler.sync(this);
                        alternative = this.interpreter.adaptivePredict(this.tokenStream, 123, this.context);
                    }
                    this.state = 1614;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    if (_la === 2 || _la === 4) {
                        {
                        this.state = 1611;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                        if (_la === 4) {
                            {
                            this.state = 1610;
                            this.match(Stage8Parser.COMMA);
                            }
                        }

                        this.state = 1613;
                        this.restParam();
                        }
                    }

                    }
                }

                this.state = 1618;
                this.match(Stage8Parser.RPAREN);
                this.state = 1621;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 87) {
                    {
                    this.state = 1619;
                    this.match(Stage8Parser.COLON);
                    this.state = 1620;
                    this.typeExpr();
                    }
                }

                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1623;
                this.match(Stage8Parser.LPAREN);
                this.state = 1624;
                this.restParam();
                this.state = 1625;
                this.match(Stage8Parser.RPAREN);
                this.state = 1628;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 87) {
                    {
                    this.state = 1626;
                    this.match(Stage8Parser.COLON);
                    this.state = 1627;
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
        this.enterRule(localContext, 268, Stage8Parser.RULE_param);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1632;
            this.match(Stage8Parser.LPAREN);
            this.state = 1633;
            this.match(Stage8Parser.IDENTIFIER);
            this.state = 1636;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 87) {
                {
                this.state = 1634;
                this.match(Stage8Parser.COLON);
                this.state = 1635;
                this.typeExpr();
                }
            }

            this.state = 1638;
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
        this.enterRule(localContext, 270, Stage8Parser.RULE_restParam);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1640;
            this.match(Stage8Parser.LPAREN);
            this.state = 1641;
            this.match(Stage8Parser.REST);
            this.state = 1642;
            this.match(Stage8Parser.IDENTIFIER);
            this.state = 1645;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 87) {
                {
                this.state = 1643;
                this.match(Stage8Parser.COLON);
                this.state = 1644;
                this.typeExpr();
                }
            }

            this.state = 1647;
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
        this.enterRule(localContext, 272, Stage8Parser.RULE_literal);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1649;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 84)) & ~0x1F) === 0 && ((1 << (_la - 84)) & 369098759) !== 0))) {
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
        4,1,115,1652,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,
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
        1,0,1,0,1,0,5,0,278,8,0,10,0,12,0,281,9,0,1,0,1,0,1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,3,1,295,8,1,1,2,1,2,1,2,1,2,1,2,1,2,3,
        2,303,8,2,1,3,1,3,1,3,1,3,1,3,5,3,310,8,3,10,3,12,3,313,9,3,1,3,
        1,3,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,3,4,327,8,4,1,5,1,5,
        1,5,5,5,332,8,5,10,5,12,5,335,9,5,1,5,1,5,1,5,1,5,1,6,1,6,1,6,5,
        6,344,8,6,10,6,12,6,347,9,6,1,6,1,6,1,6,1,6,1,7,1,7,1,7,5,7,356,
        8,7,10,7,12,7,359,9,7,1,7,1,7,1,7,5,7,364,8,7,10,7,12,7,367,9,7,
        1,7,1,7,1,8,1,8,1,8,1,9,1,9,1,9,1,9,3,9,378,8,9,1,9,1,9,1,9,1,10,
        1,10,1,10,1,10,3,10,387,8,10,1,10,3,10,390,8,10,1,10,1,10,1,10,1,
        11,1,11,1,11,4,11,398,8,11,11,11,12,11,399,1,11,1,11,1,12,1,12,1,
        12,5,12,407,8,12,10,12,12,12,410,9,12,1,12,1,12,3,12,414,8,12,1,
        12,3,12,417,8,12,1,12,3,12,420,8,12,1,12,1,12,1,12,1,13,1,13,1,13,
        5,13,428,8,13,10,13,12,13,431,9,13,1,13,3,13,434,8,13,1,13,3,13,
        437,8,13,1,13,1,13,1,13,1,14,1,14,1,14,1,14,1,14,1,15,1,15,1,15,
        4,15,450,8,15,11,15,12,15,451,1,15,1,15,1,16,1,16,1,16,5,16,459,
        8,16,10,16,12,16,462,9,16,1,16,1,16,1,17,1,17,1,17,1,17,1,17,1,17,
        3,17,472,8,17,1,18,1,18,1,19,1,19,1,19,5,19,479,8,19,10,19,12,19,
        482,9,19,1,19,1,19,1,19,3,19,487,8,19,1,19,3,19,490,8,19,1,19,1,
        19,1,20,1,20,1,20,1,20,5,20,498,8,20,10,20,12,20,501,9,20,1,20,1,
        20,1,21,1,21,1,21,5,21,508,8,21,10,21,12,21,511,9,21,1,21,1,21,1,
        21,5,21,516,8,21,10,21,12,21,519,9,21,1,21,1,21,1,22,1,22,1,22,5,
        22,526,8,22,10,22,12,22,529,9,22,1,22,1,22,1,22,1,22,1,23,1,23,1,
        23,5,23,538,8,23,10,23,12,23,541,9,23,1,23,1,23,1,23,5,23,546,8,
        23,10,23,12,23,549,9,23,1,23,1,23,1,24,1,24,1,24,5,24,556,8,24,10,
        24,12,24,559,9,24,1,24,1,24,1,24,5,24,564,8,24,10,24,12,24,567,9,
        24,1,24,1,24,1,25,1,25,1,25,1,25,1,25,3,25,576,8,25,1,26,1,26,1,
        26,3,26,581,8,26,1,26,1,26,3,26,585,8,26,1,26,1,26,1,27,1,27,1,27,
        3,27,592,8,27,1,27,5,27,595,8,27,10,27,12,27,598,9,27,3,27,600,8,
        27,1,27,1,27,1,27,1,27,1,27,1,27,3,27,608,8,27,1,28,1,28,1,28,1,
        28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,
        28,1,28,1,28,1,28,3,28,630,8,28,1,29,1,29,1,29,1,29,5,29,636,8,29,
        10,29,12,29,639,9,29,1,29,1,29,5,29,643,8,29,10,29,12,29,646,9,29,
        1,29,1,29,1,30,1,30,1,30,1,30,1,30,1,30,1,31,1,31,1,31,1,31,5,31,
        660,8,31,10,31,12,31,663,9,31,1,31,1,31,5,31,667,8,31,10,31,12,31,
        670,9,31,1,31,1,31,1,32,1,32,1,32,1,32,1,32,1,32,1,33,1,33,1,33,
        1,33,1,33,3,33,685,8,33,1,33,1,33,1,34,1,34,1,34,1,34,5,34,693,8,
        34,10,34,12,34,696,9,34,1,34,1,34,1,35,1,35,1,35,5,35,703,8,35,10,
        35,12,35,706,9,35,1,35,1,35,1,36,1,36,1,36,3,36,713,8,36,1,36,1,
        36,1,37,1,37,1,37,1,37,1,37,1,38,1,38,1,38,3,38,725,8,38,1,38,1,
        38,1,38,1,39,1,39,1,39,1,39,1,39,1,39,1,40,1,40,1,40,4,40,739,8,
        40,11,40,12,40,740,1,40,1,40,1,41,1,41,1,41,1,41,1,41,3,41,750,8,
        41,1,42,1,42,1,42,1,42,1,42,1,42,1,42,1,42,1,42,3,42,761,8,42,1,
        43,1,43,1,43,1,43,1,43,1,43,1,44,1,44,1,44,1,44,1,44,1,44,1,44,1,
        44,1,44,1,44,1,44,1,44,1,44,1,44,1,44,1,44,1,44,1,44,1,44,1,44,1,
        44,1,44,1,44,1,44,1,44,3,44,794,8,44,1,45,1,45,1,45,4,45,799,8,45,
        11,45,12,45,800,1,45,1,45,1,46,1,46,1,46,3,46,808,8,46,1,46,1,46,
        1,47,1,47,1,47,1,47,4,47,816,8,47,11,47,12,47,817,1,47,1,47,1,48,
        1,48,1,48,1,48,1,48,1,49,1,49,1,49,1,49,1,49,1,49,1,50,1,50,1,50,
        4,50,836,8,50,11,50,12,50,837,1,50,1,50,1,51,1,51,1,51,1,51,4,51,
        846,8,51,11,51,12,51,847,1,51,1,51,1,52,1,52,1,52,1,52,1,52,1,53,
        1,53,1,53,1,53,1,53,1,54,1,54,1,54,1,54,3,54,866,8,54,1,54,1,54,
        1,54,1,55,1,55,1,55,1,55,3,55,875,8,55,1,55,1,55,1,56,1,56,1,56,
        1,56,1,56,1,56,1,56,1,56,1,56,1,56,1,56,1,56,1,56,1,56,1,56,1,56,
        3,56,895,8,56,1,57,1,57,1,57,1,57,4,57,901,8,57,11,57,12,57,902,
        1,57,1,57,1,58,1,58,1,58,1,58,4,58,911,8,58,11,58,12,58,912,1,58,
        1,58,1,59,1,59,1,59,1,59,1,59,1,60,1,60,1,60,4,60,925,8,60,11,60,
        12,60,926,1,60,1,60,1,61,1,61,1,61,1,61,1,61,1,61,1,61,1,61,1,61,
        1,61,1,61,3,61,942,8,61,1,62,1,62,1,62,3,62,947,8,62,1,62,1,62,5,
        62,951,8,62,10,62,12,62,954,9,62,1,62,1,62,1,62,1,62,1,63,1,63,1,
        63,3,63,963,8,63,1,63,1,63,1,63,1,64,1,64,1,64,5,64,971,8,64,10,
        64,12,64,974,9,64,1,64,1,64,1,65,1,65,5,65,980,8,65,10,65,12,65,
        983,9,65,1,65,1,65,3,65,987,8,65,1,65,1,65,1,65,1,66,1,66,1,67,1,
        67,1,67,1,67,1,67,1,68,1,68,1,68,1,68,1,68,1,69,1,69,1,69,1,69,1,
        69,1,70,1,70,1,70,1,70,1,70,1,70,1,71,1,71,1,71,1,71,1,71,1,71,1,
        71,1,71,1,72,1,72,1,72,1,72,1,72,1,73,1,73,1,73,1,73,1,73,3,73,1033,
        8,73,1,73,1,73,1,73,1,74,1,74,1,74,4,74,1041,8,74,11,74,12,74,1042,
        1,74,1,74,1,75,1,75,1,76,1,76,1,76,4,76,1052,8,76,11,76,12,76,1053,
        1,76,1,76,1,77,1,77,3,77,1060,8,77,1,78,1,78,1,78,4,78,1065,8,78,
        11,78,12,78,1066,1,78,1,78,1,79,1,79,1,79,4,79,1074,8,79,11,79,12,
        79,1075,1,79,1,79,1,80,1,80,1,80,1,80,3,80,1084,8,80,1,80,3,80,1087,
        8,80,1,80,3,80,1090,8,80,1,81,1,81,1,81,1,81,1,81,1,82,1,82,1,82,
        1,82,1,82,1,83,1,83,1,83,1,83,1,83,1,83,1,83,1,83,1,83,1,83,1,83,
        1,83,3,83,1114,8,83,1,84,1,84,1,84,1,84,5,84,1120,8,84,10,84,12,
        84,1123,9,84,1,84,3,84,1126,8,84,1,84,1,84,1,85,1,85,1,85,1,85,5,
        85,1134,8,85,10,85,12,85,1137,9,85,1,85,1,85,1,86,1,86,1,86,5,86,
        1144,8,86,10,86,12,86,1147,9,86,1,86,1,86,1,87,1,87,1,87,1,87,1,
        87,1,87,5,87,1157,8,87,10,87,12,87,1160,9,87,1,87,1,87,1,88,1,88,
        1,88,1,88,1,88,5,88,1169,8,88,10,88,12,88,1172,9,88,1,88,1,88,1,
        89,1,89,1,89,1,89,1,89,5,89,1181,8,89,10,89,12,89,1184,9,89,1,89,
        1,89,1,90,1,90,1,90,1,90,1,90,5,90,1193,8,90,10,90,12,90,1196,9,
        90,1,90,1,90,1,91,1,91,1,91,5,91,1203,8,91,10,91,12,91,1206,9,91,
        1,91,1,91,3,91,1210,8,91,1,91,3,91,1213,8,91,1,91,1,91,1,92,1,92,
        1,92,1,92,5,92,1221,8,92,10,92,12,92,1224,9,92,1,92,1,92,1,93,1,
        93,1,93,5,93,1231,8,93,10,93,12,93,1234,9,93,1,93,1,93,1,94,1,94,
        1,94,1,94,1,94,1,94,1,94,1,94,1,94,1,94,1,94,1,94,1,94,1,94,1,94,
        1,94,1,94,1,94,1,94,1,94,1,94,1,94,1,94,1,94,1,94,1,94,1,94,1,94,
        1,94,1,94,1,94,1,94,1,94,1,94,1,94,1,94,1,94,3,94,1275,8,94,1,95,
        1,95,1,96,1,96,1,97,1,97,1,97,5,97,1284,8,97,10,97,12,97,1287,9,
        97,1,97,1,97,1,98,1,98,1,98,1,98,5,98,1295,8,98,10,98,12,98,1298,
        9,98,1,98,1,98,1,99,1,99,1,99,1,99,1,99,1,100,1,100,1,100,1,100,
        1,100,1,100,1,101,1,101,1,101,1,101,5,101,1317,8,101,10,101,12,101,
        1320,9,101,1,101,1,101,1,102,1,102,1,102,1,102,5,102,1328,8,102,
        10,102,12,102,1331,9,102,1,102,1,102,1,103,1,103,1,103,1,103,5,103,
        1339,8,103,10,103,12,103,1342,9,103,1,103,1,103,1,104,1,104,1,104,
        1,104,5,104,1350,8,104,10,104,12,104,1353,9,104,1,104,1,104,1,105,
        1,105,1,105,1,105,5,105,1361,8,105,10,105,12,105,1364,9,105,1,105,
        1,105,1,106,1,106,1,106,1,106,5,106,1372,8,106,10,106,12,106,1375,
        9,106,1,106,1,106,1,107,1,107,1,107,1,107,1,107,1,108,1,108,1,108,
        3,108,1387,8,108,1,108,1,108,1,109,1,109,1,109,1,109,1,109,1,110,
        1,110,1,110,1,110,1,110,5,110,1401,8,110,10,110,12,110,1404,9,110,
        1,110,1,110,1,111,1,111,1,111,1,111,1,111,5,111,1413,8,111,10,111,
        12,111,1416,9,111,1,111,1,111,1,112,1,112,1,112,1,112,1,112,1,112,
        1,112,1,113,1,113,1,113,1,113,1,113,4,113,1432,8,113,11,113,12,113,
        1433,1,113,1,113,1,114,1,114,1,114,1,114,3,114,1442,8,114,1,114,
        5,114,1445,8,114,10,114,12,114,1448,9,114,1,114,1,114,1,115,1,115,
        1,115,5,115,1455,8,115,10,115,12,115,1458,9,115,1,115,1,115,1,116,
        1,116,1,116,1,116,1,116,1,116,1,116,1,116,1,116,1,116,1,116,1,116,
        1,116,3,116,1475,8,116,1,117,1,117,1,117,1,117,5,117,1481,8,117,
        10,117,12,117,1484,9,117,1,117,1,117,1,118,1,118,1,118,5,118,1491,
        8,118,10,118,12,118,1494,9,118,1,118,1,118,1,119,1,119,1,119,1,119,
        4,119,1502,8,119,11,119,12,119,1503,1,119,1,119,1,120,1,120,1,121,
        1,121,1,121,1,121,1,121,1,121,1,122,1,122,1,122,1,122,1,122,1,122,
        1,123,1,123,1,123,1,123,1,123,1,124,1,124,1,125,1,125,1,125,1,125,
        1,125,1,125,1,125,1,125,1,125,1,125,1,125,1,125,5,125,1541,8,125,
        10,125,12,125,1544,9,125,1,125,1,125,3,125,1548,8,125,1,126,1,126,
        1,126,1,126,1,126,1,127,1,127,1,127,1,127,1,127,1,128,1,128,1,128,
        1,128,1,128,1,128,1,129,1,129,1,129,1,129,1,129,1,129,1,130,1,130,
        1,130,1,130,1,130,1,130,1,131,1,131,1,131,3,131,1581,8,131,1,131,
        5,131,1584,8,131,10,131,12,131,1587,9,131,1,131,1,131,1,132,1,132,
        1,132,4,132,1594,8,132,11,132,12,132,1595,1,132,1,132,1,133,1,133,
        1,133,3,133,1603,8,133,1,133,5,133,1606,8,133,10,133,12,133,1609,
        9,133,1,133,3,133,1612,8,133,1,133,3,133,1615,8,133,3,133,1617,8,
        133,1,133,1,133,1,133,3,133,1622,8,133,1,133,1,133,1,133,1,133,1,
        133,3,133,1629,8,133,3,133,1631,8,133,1,134,1,134,1,134,1,134,3,
        134,1637,8,134,1,134,1,134,1,135,1,135,1,135,1,135,1,135,3,135,1646,
        8,135,1,135,1,135,1,136,1,136,1,136,0,0,137,0,2,4,6,8,10,12,14,16,
        18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,
        62,64,66,68,70,72,74,76,78,80,82,84,86,88,90,92,94,96,98,100,102,
        104,106,108,110,112,114,116,118,120,122,124,126,128,130,132,134,
        136,138,140,142,144,146,148,150,152,154,156,158,160,162,164,166,
        168,170,172,174,176,178,180,182,184,186,188,190,192,194,196,198,
        200,202,204,206,208,210,212,214,216,218,220,222,224,226,228,230,
        232,234,236,238,240,242,244,246,248,250,252,254,256,258,260,262,
        264,266,268,270,272,0,6,2,0,84,84,109,110,2,0,75,75,83,83,8,0,5,
        11,13,29,33,33,35,82,84,86,88,95,98,110,114,114,1,0,35,36,1,0,2,
        3,3,0,84,86,109,110,112,112,1743,0,274,1,0,0,0,2,294,1,0,0,0,4,302,
        1,0,0,0,6,304,1,0,0,0,8,326,1,0,0,0,10,328,1,0,0,0,12,340,1,0,0,
        0,14,352,1,0,0,0,16,370,1,0,0,0,18,373,1,0,0,0,20,382,1,0,0,0,22,
        394,1,0,0,0,24,403,1,0,0,0,26,424,1,0,0,0,28,441,1,0,0,0,30,446,
        1,0,0,0,32,455,1,0,0,0,34,471,1,0,0,0,36,473,1,0,0,0,38,475,1,0,
        0,0,40,493,1,0,0,0,42,504,1,0,0,0,44,522,1,0,0,0,46,534,1,0,0,0,
        48,552,1,0,0,0,50,575,1,0,0,0,52,577,1,0,0,0,54,588,1,0,0,0,56,629,
        1,0,0,0,58,631,1,0,0,0,60,649,1,0,0,0,62,655,1,0,0,0,64,673,1,0,
        0,0,66,679,1,0,0,0,68,688,1,0,0,0,70,699,1,0,0,0,72,709,1,0,0,0,
        74,716,1,0,0,0,76,721,1,0,0,0,78,729,1,0,0,0,80,735,1,0,0,0,82,749,
        1,0,0,0,84,760,1,0,0,0,86,762,1,0,0,0,88,793,1,0,0,0,90,795,1,0,
        0,0,92,804,1,0,0,0,94,811,1,0,0,0,96,821,1,0,0,0,98,826,1,0,0,0,
        100,832,1,0,0,0,102,841,1,0,0,0,104,851,1,0,0,0,106,856,1,0,0,0,
        108,861,1,0,0,0,110,870,1,0,0,0,112,894,1,0,0,0,114,896,1,0,0,0,
        116,906,1,0,0,0,118,916,1,0,0,0,120,921,1,0,0,0,122,941,1,0,0,0,
        124,943,1,0,0,0,126,959,1,0,0,0,128,967,1,0,0,0,130,977,1,0,0,0,
        132,991,1,0,0,0,134,993,1,0,0,0,136,998,1,0,0,0,138,1003,1,0,0,0,
        140,1008,1,0,0,0,142,1014,1,0,0,0,144,1022,1,0,0,0,146,1027,1,0,
        0,0,148,1037,1,0,0,0,150,1046,1,0,0,0,152,1048,1,0,0,0,154,1059,
        1,0,0,0,156,1061,1,0,0,0,158,1070,1,0,0,0,160,1089,1,0,0,0,162,1091,
        1,0,0,0,164,1096,1,0,0,0,166,1113,1,0,0,0,168,1115,1,0,0,0,170,1129,
        1,0,0,0,172,1140,1,0,0,0,174,1150,1,0,0,0,176,1163,1,0,0,0,178,1175,
        1,0,0,0,180,1187,1,0,0,0,182,1199,1,0,0,0,184,1216,1,0,0,0,186,1227,
        1,0,0,0,188,1274,1,0,0,0,190,1276,1,0,0,0,192,1278,1,0,0,0,194,1280,
        1,0,0,0,196,1290,1,0,0,0,198,1301,1,0,0,0,200,1306,1,0,0,0,202,1312,
        1,0,0,0,204,1323,1,0,0,0,206,1334,1,0,0,0,208,1345,1,0,0,0,210,1356,
        1,0,0,0,212,1367,1,0,0,0,214,1378,1,0,0,0,216,1383,1,0,0,0,218,1390,
        1,0,0,0,220,1395,1,0,0,0,222,1407,1,0,0,0,224,1419,1,0,0,0,226,1426,
        1,0,0,0,228,1437,1,0,0,0,230,1451,1,0,0,0,232,1474,1,0,0,0,234,1476,
        1,0,0,0,236,1487,1,0,0,0,238,1497,1,0,0,0,240,1507,1,0,0,0,242,1509,
        1,0,0,0,244,1515,1,0,0,0,246,1521,1,0,0,0,248,1526,1,0,0,0,250,1547,
        1,0,0,0,252,1549,1,0,0,0,254,1554,1,0,0,0,256,1559,1,0,0,0,258,1565,
        1,0,0,0,260,1571,1,0,0,0,262,1577,1,0,0,0,264,1590,1,0,0,0,266,1630,
        1,0,0,0,268,1632,1,0,0,0,270,1640,1,0,0,0,272,1649,1,0,0,0,274,275,
        5,2,0,0,275,279,5,5,0,0,276,278,3,2,1,0,277,276,1,0,0,0,278,281,
        1,0,0,0,279,277,1,0,0,0,279,280,1,0,0,0,280,282,1,0,0,0,281,279,
        1,0,0,0,282,283,5,3,0,0,283,1,1,0,0,0,284,295,3,6,3,0,285,295,3,
        8,4,0,286,295,3,10,5,0,287,295,3,12,6,0,288,295,3,14,7,0,289,295,
        3,18,9,0,290,295,3,20,10,0,291,295,3,24,12,0,292,295,3,106,53,0,
        293,295,3,56,28,0,294,284,1,0,0,0,294,285,1,0,0,0,294,286,1,0,0,
        0,294,287,1,0,0,0,294,288,1,0,0,0,294,289,1,0,0,0,294,290,1,0,0,
        0,294,291,1,0,0,0,294,292,1,0,0,0,294,293,1,0,0,0,295,3,1,0,0,0,
        296,303,3,10,5,0,297,303,3,12,6,0,298,303,3,14,7,0,299,303,3,24,
        12,0,300,303,3,20,10,0,301,303,3,18,9,0,302,296,1,0,0,0,302,297,
        1,0,0,0,302,298,1,0,0,0,302,299,1,0,0,0,302,300,1,0,0,0,302,301,
        1,0,0,0,303,5,1,0,0,0,304,305,5,2,0,0,305,306,5,16,0,0,306,307,5,
        114,0,0,307,311,3,266,133,0,308,310,3,56,28,0,309,308,1,0,0,0,310,
        313,1,0,0,0,311,309,1,0,0,0,311,312,1,0,0,0,312,314,1,0,0,0,313,
        311,1,0,0,0,314,315,5,3,0,0,315,7,1,0,0,0,316,317,5,2,0,0,317,318,
        5,17,0,0,318,319,3,10,5,0,319,320,5,3,0,0,320,327,1,0,0,0,321,322,
        5,2,0,0,322,323,5,17,0,0,323,324,3,12,6,0,324,325,5,3,0,0,325,327,
        1,0,0,0,326,316,1,0,0,0,326,321,1,0,0,0,327,9,1,0,0,0,328,329,5,
        2,0,0,329,333,5,7,0,0,330,332,3,16,8,0,331,330,1,0,0,0,332,335,1,
        0,0,0,333,331,1,0,0,0,333,334,1,0,0,0,334,336,1,0,0,0,335,333,1,
        0,0,0,336,337,5,114,0,0,337,338,3,188,94,0,338,339,5,3,0,0,339,11,
        1,0,0,0,340,341,5,2,0,0,341,345,5,9,0,0,342,344,3,16,8,0,343,342,
        1,0,0,0,344,347,1,0,0,0,345,343,1,0,0,0,345,346,1,0,0,0,346,348,
        1,0,0,0,347,345,1,0,0,0,348,349,5,114,0,0,349,350,3,188,94,0,350,
        351,5,3,0,0,351,13,1,0,0,0,352,353,5,2,0,0,353,357,5,12,0,0,354,
        356,3,16,8,0,355,354,1,0,0,0,356,359,1,0,0,0,357,355,1,0,0,0,357,
        358,1,0,0,0,358,360,1,0,0,0,359,357,1,0,0,0,360,361,5,114,0,0,361,
        365,3,266,133,0,362,364,3,56,28,0,363,362,1,0,0,0,364,367,1,0,0,
        0,365,363,1,0,0,0,365,366,1,0,0,0,366,368,1,0,0,0,367,365,1,0,0,
        0,368,369,5,3,0,0,369,15,1,0,0,0,370,371,5,95,0,0,371,372,5,108,
        0,0,372,17,1,0,0,0,373,374,5,2,0,0,374,375,5,80,0,0,375,377,5,114,
        0,0,376,378,3,158,79,0,377,376,1,0,0,0,377,378,1,0,0,0,378,379,1,
        0,0,0,379,380,3,112,56,0,380,381,5,3,0,0,381,19,1,0,0,0,382,383,
        5,2,0,0,383,384,5,81,0,0,384,386,5,114,0,0,385,387,3,158,79,0,386,
        385,1,0,0,0,386,387,1,0,0,0,387,389,1,0,0,0,388,390,3,22,11,0,389,
        388,1,0,0,0,389,390,1,0,0,0,390,391,1,0,0,0,391,392,3,128,64,0,392,
        393,5,3,0,0,393,21,1,0,0,0,394,395,5,2,0,0,395,397,5,78,0,0,396,
        398,3,112,56,0,397,396,1,0,0,0,398,399,1,0,0,0,399,397,1,0,0,0,399,
        400,1,0,0,0,400,401,1,0,0,0,401,402,5,3,0,0,402,23,1,0,0,0,403,404,
        5,2,0,0,404,408,5,54,0,0,405,407,3,36,18,0,406,405,1,0,0,0,407,410,
        1,0,0,0,408,406,1,0,0,0,408,409,1,0,0,0,409,411,1,0,0,0,410,408,
        1,0,0,0,411,413,5,114,0,0,412,414,3,158,79,0,413,412,1,0,0,0,413,
        414,1,0,0,0,414,416,1,0,0,0,415,417,3,28,14,0,416,415,1,0,0,0,416,
        417,1,0,0,0,417,419,1,0,0,0,418,420,3,30,15,0,419,418,1,0,0,0,419,
        420,1,0,0,0,420,421,1,0,0,0,421,422,3,32,16,0,422,423,5,3,0,0,423,
        25,1,0,0,0,424,425,5,2,0,0,425,429,5,54,0,0,426,428,3,36,18,0,427,
        426,1,0,0,0,428,431,1,0,0,0,429,427,1,0,0,0,429,430,1,0,0,0,430,
        433,1,0,0,0,431,429,1,0,0,0,432,434,3,28,14,0,433,432,1,0,0,0,433,
        434,1,0,0,0,434,436,1,0,0,0,435,437,3,30,15,0,436,435,1,0,0,0,436,
        437,1,0,0,0,437,438,1,0,0,0,438,439,3,32,16,0,439,440,5,3,0,0,440,
        27,1,0,0,0,441,442,5,2,0,0,442,443,5,78,0,0,443,444,3,112,56,0,444,
        445,5,3,0,0,445,29,1,0,0,0,446,447,5,2,0,0,447,449,5,61,0,0,448,
        450,3,112,56,0,449,448,1,0,0,0,450,451,1,0,0,0,451,449,1,0,0,0,451,
        452,1,0,0,0,452,453,1,0,0,0,453,454,5,3,0,0,454,31,1,0,0,0,455,456,
        5,2,0,0,456,460,5,51,0,0,457,459,3,34,17,0,458,457,1,0,0,0,459,462,
        1,0,0,0,460,458,1,0,0,0,460,461,1,0,0,0,461,463,1,0,0,0,462,460,
        1,0,0,0,463,464,5,3,0,0,464,33,1,0,0,0,465,472,3,38,19,0,466,472,
        3,40,20,0,467,472,3,42,21,0,468,472,3,44,22,0,469,472,3,46,23,0,
        470,472,3,48,24,0,471,465,1,0,0,0,471,466,1,0,0,0,471,467,1,0,0,
        0,471,468,1,0,0,0,471,469,1,0,0,0,471,470,1,0,0,0,472,35,1,0,0,0,
        473,474,5,108,0,0,474,37,1,0,0,0,475,476,5,2,0,0,476,480,5,55,0,
        0,477,479,3,36,18,0,478,477,1,0,0,0,479,482,1,0,0,0,480,478,1,0,
        0,0,480,481,1,0,0,0,481,483,1,0,0,0,482,480,1,0,0,0,483,486,5,114,
        0,0,484,485,5,87,0,0,485,487,3,112,56,0,486,484,1,0,0,0,486,487,
        1,0,0,0,487,489,1,0,0,0,488,490,3,188,94,0,489,488,1,0,0,0,489,490,
        1,0,0,0,490,491,1,0,0,0,491,492,5,3,0,0,492,39,1,0,0,0,493,494,5,
        2,0,0,494,495,5,56,0,0,495,499,3,54,27,0,496,498,3,56,28,0,497,496,
        1,0,0,0,498,501,1,0,0,0,499,497,1,0,0,0,499,500,1,0,0,0,500,502,
        1,0,0,0,501,499,1,0,0,0,502,503,5,3,0,0,503,41,1,0,0,0,504,505,5,
        2,0,0,505,509,5,13,0,0,506,508,3,36,18,0,507,506,1,0,0,0,508,511,
        1,0,0,0,509,507,1,0,0,0,509,510,1,0,0,0,510,512,1,0,0,0,511,509,
        1,0,0,0,512,513,3,50,25,0,513,517,3,54,27,0,514,516,3,56,28,0,515,
        514,1,0,0,0,516,519,1,0,0,0,517,515,1,0,0,0,517,518,1,0,0,0,518,
        520,1,0,0,0,519,517,1,0,0,0,520,521,5,3,0,0,521,43,1,0,0,0,522,523,
        5,2,0,0,523,527,5,53,0,0,524,526,3,36,18,0,525,524,1,0,0,0,526,529,
        1,0,0,0,527,525,1,0,0,0,527,528,1,0,0,0,528,530,1,0,0,0,529,527,
        1,0,0,0,530,531,3,50,25,0,531,532,3,54,27,0,532,533,5,3,0,0,533,
        45,1,0,0,0,534,535,5,2,0,0,535,539,5,59,0,0,536,538,3,36,18,0,537,
        536,1,0,0,0,538,541,1,0,0,0,539,537,1,0,0,0,539,540,1,0,0,0,540,
        542,1,0,0,0,541,539,1,0,0,0,542,543,3,50,25,0,543,547,3,54,27,0,
        544,546,3,56,28,0,545,544,1,0,0,0,546,549,1,0,0,0,547,545,1,0,0,
        0,547,548,1,0,0,0,548,550,1,0,0,0,549,547,1,0,0,0,550,551,5,3,0,
        0,551,47,1,0,0,0,552,553,5,2,0,0,553,557,5,60,0,0,554,556,3,36,18,
        0,555,554,1,0,0,0,556,559,1,0,0,0,557,555,1,0,0,0,557,558,1,0,0,
        0,558,560,1,0,0,0,559,557,1,0,0,0,560,561,3,50,25,0,561,565,3,54,
        27,0,562,564,3,56,28,0,563,562,1,0,0,0,564,567,1,0,0,0,565,563,1,
        0,0,0,565,566,1,0,0,0,566,568,1,0,0,0,567,565,1,0,0,0,568,569,5,
        3,0,0,569,49,1,0,0,0,570,576,5,114,0,0,571,572,5,96,0,0,572,573,
        3,188,94,0,573,574,5,97,0,0,574,576,1,0,0,0,575,570,1,0,0,0,575,
        571,1,0,0,0,576,51,1,0,0,0,577,578,5,2,0,0,578,580,5,114,0,0,579,
        581,5,83,0,0,580,579,1,0,0,0,580,581,1,0,0,0,581,584,1,0,0,0,582,
        583,5,87,0,0,583,585,3,112,56,0,584,582,1,0,0,0,584,585,1,0,0,0,
        585,586,1,0,0,0,586,587,5,3,0,0,587,53,1,0,0,0,588,599,5,2,0,0,589,
        596,3,52,26,0,590,592,5,4,0,0,591,590,1,0,0,0,591,592,1,0,0,0,592,
        593,1,0,0,0,593,595,3,52,26,0,594,591,1,0,0,0,595,598,1,0,0,0,596,
        594,1,0,0,0,596,597,1,0,0,0,597,600,1,0,0,0,598,596,1,0,0,0,599,
        589,1,0,0,0,599,600,1,0,0,0,600,601,1,0,0,0,601,607,5,3,0,0,602,
        603,5,2,0,0,603,604,5,79,0,0,604,605,3,112,56,0,605,606,5,3,0,0,
        606,608,1,0,0,0,607,602,1,0,0,0,607,608,1,0,0,0,608,55,1,0,0,0,609,
        630,3,58,29,0,610,630,3,60,30,0,611,630,3,62,31,0,612,630,3,64,32,
        0,613,630,3,66,33,0,614,630,3,68,34,0,615,630,3,182,91,0,616,630,
        3,70,35,0,617,630,3,72,36,0,618,630,3,74,37,0,619,630,3,76,38,0,
        620,630,3,78,39,0,621,630,3,84,42,0,622,630,3,168,84,0,623,630,3,
        174,87,0,624,630,3,176,88,0,625,630,3,178,89,0,626,630,3,180,90,
        0,627,630,3,166,83,0,628,630,3,188,94,0,629,609,1,0,0,0,629,610,
        1,0,0,0,629,611,1,0,0,0,629,612,1,0,0,0,629,613,1,0,0,0,629,614,
        1,0,0,0,629,615,1,0,0,0,629,616,1,0,0,0,629,617,1,0,0,0,629,618,
        1,0,0,0,629,619,1,0,0,0,629,620,1,0,0,0,629,621,1,0,0,0,629,622,
        1,0,0,0,629,623,1,0,0,0,629,624,1,0,0,0,629,625,1,0,0,0,629,626,
        1,0,0,0,629,627,1,0,0,0,629,628,1,0,0,0,630,57,1,0,0,0,631,632,5,
        2,0,0,632,633,5,6,0,0,633,637,5,2,0,0,634,636,3,108,54,0,635,634,
        1,0,0,0,636,639,1,0,0,0,637,635,1,0,0,0,637,638,1,0,0,0,638,640,
        1,0,0,0,639,637,1,0,0,0,640,644,5,3,0,0,641,643,3,56,28,0,642,641,
        1,0,0,0,643,646,1,0,0,0,644,642,1,0,0,0,644,645,1,0,0,0,645,647,
        1,0,0,0,646,644,1,0,0,0,647,648,5,3,0,0,648,59,1,0,0,0,649,650,5,
        2,0,0,650,651,5,7,0,0,651,652,3,110,55,0,652,653,3,188,94,0,653,
        654,5,3,0,0,654,61,1,0,0,0,655,656,5,2,0,0,656,657,5,8,0,0,657,661,
        5,2,0,0,658,660,3,108,54,0,659,658,1,0,0,0,660,663,1,0,0,0,661,659,
        1,0,0,0,661,662,1,0,0,0,662,664,1,0,0,0,663,661,1,0,0,0,664,668,
        5,3,0,0,665,667,3,56,28,0,666,665,1,0,0,0,667,670,1,0,0,0,668,666,
        1,0,0,0,668,669,1,0,0,0,669,671,1,0,0,0,670,668,1,0,0,0,671,672,
        5,3,0,0,672,63,1,0,0,0,673,674,5,2,0,0,674,675,5,9,0,0,675,676,3,
        110,55,0,676,677,3,188,94,0,677,678,5,3,0,0,678,65,1,0,0,0,679,680,
        5,2,0,0,680,681,5,19,0,0,681,682,3,188,94,0,682,684,3,56,28,0,683,
        685,3,56,28,0,684,683,1,0,0,0,684,685,1,0,0,0,685,686,1,0,0,0,686,
        687,5,3,0,0,687,67,1,0,0,0,688,689,5,2,0,0,689,690,5,20,0,0,690,
        694,3,188,94,0,691,693,3,56,28,0,692,691,1,0,0,0,693,696,1,0,0,0,
        694,692,1,0,0,0,694,695,1,0,0,0,695,697,1,0,0,0,696,694,1,0,0,0,
        697,698,5,3,0,0,698,69,1,0,0,0,699,700,5,2,0,0,700,704,5,21,0,0,
        701,703,3,56,28,0,702,701,1,0,0,0,703,706,1,0,0,0,704,702,1,0,0,
        0,704,705,1,0,0,0,705,707,1,0,0,0,706,704,1,0,0,0,707,708,5,3,0,
        0,708,71,1,0,0,0,709,710,5,2,0,0,710,712,5,22,0,0,711,713,3,188,
        94,0,712,711,1,0,0,0,712,713,1,0,0,0,713,714,1,0,0,0,714,715,5,3,
        0,0,715,73,1,0,0,0,716,717,5,2,0,0,717,718,5,23,0,0,718,719,3,188,
        94,0,719,720,5,3,0,0,720,75,1,0,0,0,721,722,5,2,0,0,722,724,5,40,
        0,0,723,725,3,230,115,0,724,723,1,0,0,0,724,725,1,0,0,0,725,726,
        1,0,0,0,726,727,5,110,0,0,727,728,5,3,0,0,728,77,1,0,0,0,729,730,
        5,2,0,0,730,731,5,104,0,0,731,732,3,80,40,0,732,733,5,110,0,0,733,
        734,5,3,0,0,734,79,1,0,0,0,735,736,5,2,0,0,736,738,5,114,0,0,737,
        739,3,82,41,0,738,737,1,0,0,0,739,740,1,0,0,0,740,738,1,0,0,0,740,
        741,1,0,0,0,741,742,1,0,0,0,742,743,5,3,0,0,743,81,1,0,0,0,744,750,
        5,114,0,0,745,746,5,2,0,0,746,747,5,114,0,0,747,748,5,114,0,0,748,
        750,5,3,0,0,749,744,1,0,0,0,749,745,1,0,0,0,750,83,1,0,0,0,751,761,
        3,86,43,0,752,761,3,88,44,0,753,761,3,90,45,0,754,761,3,98,49,0,
        755,761,3,94,47,0,756,761,3,96,48,0,757,761,3,100,50,0,758,761,3,
        102,51,0,759,761,3,104,52,0,760,751,1,0,0,0,760,752,1,0,0,0,760,
        753,1,0,0,0,760,754,1,0,0,0,760,755,1,0,0,0,760,756,1,0,0,0,760,
        757,1,0,0,0,760,758,1,0,0,0,760,759,1,0,0,0,761,85,1,0,0,0,762,763,
        5,2,0,0,763,764,5,98,0,0,764,765,5,114,0,0,765,766,3,188,94,0,766,
        767,5,3,0,0,767,87,1,0,0,0,768,769,5,2,0,0,769,770,5,99,0,0,770,
        771,3,24,12,0,771,772,5,3,0,0,772,794,1,0,0,0,773,774,5,2,0,0,774,
        775,5,99,0,0,775,776,3,26,13,0,776,777,5,3,0,0,777,794,1,0,0,0,778,
        779,5,2,0,0,779,780,5,99,0,0,780,781,3,10,5,0,781,782,5,3,0,0,782,
        794,1,0,0,0,783,784,5,2,0,0,784,785,5,99,0,0,785,786,3,12,6,0,786,
        787,5,3,0,0,787,794,1,0,0,0,788,789,5,2,0,0,789,790,5,99,0,0,790,
        791,3,188,94,0,791,792,5,3,0,0,792,794,1,0,0,0,793,768,1,0,0,0,793,
        773,1,0,0,0,793,778,1,0,0,0,793,783,1,0,0,0,793,788,1,0,0,0,794,
        89,1,0,0,0,795,796,5,2,0,0,796,798,5,100,0,0,797,799,3,92,46,0,798,
        797,1,0,0,0,799,800,1,0,0,0,800,798,1,0,0,0,800,801,1,0,0,0,801,
        802,1,0,0,0,802,803,5,3,0,0,803,91,1,0,0,0,804,805,5,2,0,0,805,807,
        5,114,0,0,806,808,5,114,0,0,807,806,1,0,0,0,807,808,1,0,0,0,808,
        809,1,0,0,0,809,810,5,3,0,0,810,93,1,0,0,0,811,812,5,2,0,0,812,813,
        5,102,0,0,813,815,5,110,0,0,814,816,3,92,46,0,815,814,1,0,0,0,816,
        817,1,0,0,0,817,815,1,0,0,0,817,818,1,0,0,0,818,819,1,0,0,0,819,
        820,5,3,0,0,820,95,1,0,0,0,821,822,5,2,0,0,822,823,5,103,0,0,823,
        824,5,110,0,0,824,825,5,3,0,0,825,97,1,0,0,0,826,827,5,2,0,0,827,
        828,5,101,0,0,828,829,5,110,0,0,829,830,5,110,0,0,830,831,5,3,0,
        0,831,99,1,0,0,0,832,833,5,2,0,0,833,835,5,107,0,0,834,836,3,92,
        46,0,835,834,1,0,0,0,836,837,1,0,0,0,837,835,1,0,0,0,837,838,1,0,
        0,0,838,839,1,0,0,0,839,840,5,3,0,0,840,101,1,0,0,0,841,842,5,2,
        0,0,842,843,5,106,0,0,843,845,5,110,0,0,844,846,3,92,46,0,845,844,
        1,0,0,0,846,847,1,0,0,0,847,845,1,0,0,0,847,848,1,0,0,0,848,849,
        1,0,0,0,849,850,5,3,0,0,850,103,1,0,0,0,851,852,5,2,0,0,852,853,
        5,105,0,0,853,854,5,110,0,0,854,855,5,3,0,0,855,105,1,0,0,0,856,
        857,5,2,0,0,857,858,5,98,0,0,858,859,3,4,2,0,859,860,5,3,0,0,860,
        107,1,0,0,0,861,862,5,2,0,0,862,865,5,114,0,0,863,864,5,87,0,0,864,
        866,3,112,56,0,865,863,1,0,0,0,865,866,1,0,0,0,866,867,1,0,0,0,867,
        868,3,188,94,0,868,869,5,3,0,0,869,109,1,0,0,0,870,871,5,2,0,0,871,
        874,5,114,0,0,872,873,5,87,0,0,873,875,3,112,56,0,874,872,1,0,0,
        0,874,875,1,0,0,0,875,876,1,0,0,0,876,877,5,3,0,0,877,111,1,0,0,
        0,878,895,5,114,0,0,879,895,3,114,57,0,880,895,3,116,58,0,881,895,
        3,118,59,0,882,895,3,120,60,0,883,895,3,124,62,0,884,895,3,128,64,
        0,885,895,3,134,67,0,886,895,3,136,68,0,887,895,3,138,69,0,888,895,
        3,140,70,0,889,895,3,142,71,0,890,895,3,144,72,0,891,895,3,146,73,
        0,892,895,3,152,76,0,893,895,3,156,78,0,894,878,1,0,0,0,894,879,
        1,0,0,0,894,880,1,0,0,0,894,881,1,0,0,0,894,882,1,0,0,0,894,883,
        1,0,0,0,894,884,1,0,0,0,894,885,1,0,0,0,894,886,1,0,0,0,894,887,
        1,0,0,0,894,888,1,0,0,0,894,889,1,0,0,0,894,890,1,0,0,0,894,891,
        1,0,0,0,894,892,1,0,0,0,894,893,1,0,0,0,895,113,1,0,0,0,896,897,
        5,2,0,0,897,898,5,62,0,0,898,900,3,112,56,0,899,901,3,112,56,0,900,
        899,1,0,0,0,901,902,1,0,0,0,902,900,1,0,0,0,902,903,1,0,0,0,903,
        904,1,0,0,0,904,905,5,3,0,0,905,115,1,0,0,0,906,907,5,2,0,0,907,
        908,5,63,0,0,908,910,3,112,56,0,909,911,3,112,56,0,910,909,1,0,0,
        0,911,912,1,0,0,0,912,910,1,0,0,0,912,913,1,0,0,0,913,914,1,0,0,
        0,914,915,5,3,0,0,915,117,1,0,0,0,916,917,5,2,0,0,917,918,5,28,0,
        0,918,919,3,112,56,0,919,920,5,3,0,0,920,119,1,0,0,0,921,922,5,2,
        0,0,922,924,5,64,0,0,923,925,3,122,61,0,924,923,1,0,0,0,925,926,
        1,0,0,0,926,924,1,0,0,0,926,927,1,0,0,0,927,928,1,0,0,0,928,929,
        5,3,0,0,929,121,1,0,0,0,930,931,5,2,0,0,931,932,5,74,0,0,932,933,
        3,112,56,0,933,934,5,3,0,0,934,942,1,0,0,0,935,936,5,2,0,0,936,937,
        5,114,0,0,937,938,3,112,56,0,938,939,5,3,0,0,939,942,1,0,0,0,940,
        942,3,112,56,0,941,930,1,0,0,0,941,935,1,0,0,0,941,940,1,0,0,0,942,
        123,1,0,0,0,943,944,5,2,0,0,944,946,5,65,0,0,945,947,3,158,79,0,
        946,945,1,0,0,0,946,947,1,0,0,0,947,948,1,0,0,0,948,952,5,2,0,0,
        949,951,3,126,63,0,950,949,1,0,0,0,951,954,1,0,0,0,952,950,1,0,0,
        0,952,953,1,0,0,0,953,955,1,0,0,0,954,952,1,0,0,0,955,956,5,3,0,
        0,956,957,3,112,56,0,957,958,5,3,0,0,958,125,1,0,0,0,959,960,5,2,
        0,0,960,962,5,114,0,0,961,963,5,83,0,0,962,961,1,0,0,0,962,963,1,
        0,0,0,963,964,1,0,0,0,964,965,3,112,56,0,965,966,5,3,0,0,966,127,
        1,0,0,0,967,968,5,2,0,0,968,972,5,114,0,0,969,971,3,130,65,0,970,
        969,1,0,0,0,971,974,1,0,0,0,972,970,1,0,0,0,972,973,1,0,0,0,973,
        975,1,0,0,0,974,972,1,0,0,0,975,976,5,3,0,0,976,129,1,0,0,0,977,
        981,5,2,0,0,978,980,3,132,66,0,979,978,1,0,0,0,980,983,1,0,0,0,981,
        979,1,0,0,0,981,982,1,0,0,0,982,984,1,0,0,0,983,981,1,0,0,0,984,
        986,5,114,0,0,985,987,5,83,0,0,986,985,1,0,0,0,986,987,1,0,0,0,987,
        988,1,0,0,0,988,989,3,112,56,0,989,990,5,3,0,0,990,131,1,0,0,0,991,
        992,5,75,0,0,992,133,1,0,0,0,993,994,5,2,0,0,994,995,5,66,0,0,995,
        996,7,0,0,0,996,997,5,3,0,0,997,135,1,0,0,0,998,999,5,2,0,0,999,
        1000,5,67,0,0,1000,1001,3,112,56,0,1001,1002,5,3,0,0,1002,137,1,
        0,0,0,1003,1004,5,2,0,0,1004,1005,5,68,0,0,1005,1006,5,114,0,0,1006,
        1007,5,3,0,0,1007,139,1,0,0,0,1008,1009,5,2,0,0,1009,1010,5,33,0,
        0,1010,1011,3,112,56,0,1011,1012,3,112,56,0,1012,1013,5,3,0,0,1013,
        141,1,0,0,0,1014,1015,5,2,0,0,1015,1016,5,26,0,0,1016,1017,3,112,
        56,0,1017,1018,3,112,56,0,1018,1019,3,112,56,0,1019,1020,3,112,56,
        0,1020,1021,5,3,0,0,1021,143,1,0,0,0,1022,1023,5,2,0,0,1023,1024,
        5,70,0,0,1024,1025,5,114,0,0,1025,1026,5,3,0,0,1026,145,1,0,0,0,
        1027,1028,5,2,0,0,1028,1029,5,71,0,0,1029,1030,5,114,0,0,1030,1032,
        3,112,56,0,1031,1033,3,148,74,0,1032,1031,1,0,0,0,1032,1033,1,0,
        0,0,1033,1034,1,0,0,0,1034,1035,3,112,56,0,1035,1036,5,3,0,0,1036,
        147,1,0,0,0,1037,1038,5,2,0,0,1038,1040,5,82,0,0,1039,1041,3,150,
        75,0,1040,1039,1,0,0,0,1041,1042,1,0,0,0,1042,1040,1,0,0,0,1042,
        1043,1,0,0,0,1043,1044,1,0,0,0,1044,1045,5,3,0,0,1045,149,1,0,0,
        0,1046,1047,7,1,0,0,1047,151,1,0,0,0,1048,1049,5,2,0,0,1049,1051,
        5,72,0,0,1050,1052,3,154,77,0,1051,1050,1,0,0,0,1052,1053,1,0,0,
        0,1053,1051,1,0,0,0,1053,1054,1,0,0,0,1054,1055,1,0,0,0,1055,1056,
        5,3,0,0,1056,153,1,0,0,0,1057,1060,5,110,0,0,1058,1060,3,112,56,
        0,1059,1057,1,0,0,0,1059,1058,1,0,0,0,1060,155,1,0,0,0,1061,1062,
        5,2,0,0,1062,1064,3,112,56,0,1063,1065,3,112,56,0,1064,1063,1,0,
        0,0,1065,1066,1,0,0,0,1066,1064,1,0,0,0,1066,1067,1,0,0,0,1067,1068,
        1,0,0,0,1068,1069,5,3,0,0,1069,157,1,0,0,0,1070,1071,5,2,0,0,1071,
        1073,5,76,0,0,1072,1074,3,160,80,0,1073,1072,1,0,0,0,1074,1075,1,
        0,0,0,1075,1073,1,0,0,0,1075,1076,1,0,0,0,1076,1077,1,0,0,0,1077,
        1078,5,3,0,0,1078,159,1,0,0,0,1079,1090,5,114,0,0,1080,1081,5,2,
        0,0,1081,1083,5,114,0,0,1082,1084,3,162,81,0,1083,1082,1,0,0,0,1083,
        1084,1,0,0,0,1084,1086,1,0,0,0,1085,1087,3,164,82,0,1086,1085,1,
        0,0,0,1086,1087,1,0,0,0,1087,1088,1,0,0,0,1088,1090,5,3,0,0,1089,
        1079,1,0,0,0,1089,1080,1,0,0,0,1090,161,1,0,0,0,1091,1092,5,2,0,
        0,1092,1093,5,78,0,0,1093,1094,3,112,56,0,1094,1095,5,3,0,0,1095,
        163,1,0,0,0,1096,1097,5,2,0,0,1097,1098,5,43,0,0,1098,1099,3,112,
        56,0,1099,1100,5,3,0,0,1100,165,1,0,0,0,1101,1102,5,2,0,0,1102,1103,
        5,24,0,0,1103,1104,5,114,0,0,1104,1105,3,188,94,0,1105,1106,5,3,
        0,0,1106,1114,1,0,0,0,1107,1108,5,2,0,0,1108,1109,5,24,0,0,1109,
        1110,3,242,121,0,1110,1111,3,188,94,0,1111,1112,5,3,0,0,1112,1114,
        1,0,0,0,1113,1101,1,0,0,0,1113,1107,1,0,0,0,1114,167,1,0,0,0,1115,
        1116,5,2,0,0,1116,1117,5,41,0,0,1117,1121,3,188,94,0,1118,1120,3,
        170,85,0,1119,1118,1,0,0,0,1120,1123,1,0,0,0,1121,1119,1,0,0,0,1121,
        1122,1,0,0,0,1122,1125,1,0,0,0,1123,1121,1,0,0,0,1124,1126,3,172,
        86,0,1125,1124,1,0,0,0,1125,1126,1,0,0,0,1126,1127,1,0,0,0,1127,
        1128,5,3,0,0,1128,169,1,0,0,0,1129,1130,5,2,0,0,1130,1131,5,42,0,
        0,1131,1135,3,188,94,0,1132,1134,3,56,28,0,1133,1132,1,0,0,0,1134,
        1137,1,0,0,0,1135,1133,1,0,0,0,1135,1136,1,0,0,0,1136,1138,1,0,0,
        0,1137,1135,1,0,0,0,1138,1139,5,3,0,0,1139,171,1,0,0,0,1140,1141,
        5,2,0,0,1141,1145,5,43,0,0,1142,1144,3,56,28,0,1143,1142,1,0,0,0,
        1144,1147,1,0,0,0,1145,1143,1,0,0,0,1145,1146,1,0,0,0,1146,1148,
        1,0,0,0,1147,1145,1,0,0,0,1148,1149,5,3,0,0,1149,173,1,0,0,0,1150,
        1151,5,2,0,0,1151,1152,5,50,0,0,1152,1153,3,60,30,0,1153,1154,3,
        188,94,0,1154,1158,3,166,83,0,1155,1157,3,56,28,0,1156,1155,1,0,
        0,0,1157,1160,1,0,0,0,1158,1156,1,0,0,0,1158,1159,1,0,0,0,1159,1161,
        1,0,0,0,1160,1158,1,0,0,0,1161,1162,5,3,0,0,1162,175,1,0,0,0,1163,
        1164,5,2,0,0,1164,1165,5,44,0,0,1165,1166,5,114,0,0,1166,1170,3,
        188,94,0,1167,1169,3,56,28,0,1168,1167,1,0,0,0,1169,1172,1,0,0,0,
        1170,1168,1,0,0,0,1170,1171,1,0,0,0,1171,1173,1,0,0,0,1172,1170,
        1,0,0,0,1173,1174,5,3,0,0,1174,177,1,0,0,0,1175,1176,5,2,0,0,1176,
        1177,5,45,0,0,1177,1178,5,114,0,0,1178,1182,3,188,94,0,1179,1181,
        3,56,28,0,1180,1179,1,0,0,0,1181,1184,1,0,0,0,1182,1180,1,0,0,0,
        1182,1183,1,0,0,0,1183,1185,1,0,0,0,1184,1182,1,0,0,0,1185,1186,
        5,3,0,0,1186,179,1,0,0,0,1187,1188,5,2,0,0,1188,1189,5,46,0,0,1189,
        1190,5,114,0,0,1190,1194,3,188,94,0,1191,1193,3,56,28,0,1192,1191,
        1,0,0,0,1193,1196,1,0,0,0,1194,1192,1,0,0,0,1194,1195,1,0,0,0,1195,
        1197,1,0,0,0,1196,1194,1,0,0,0,1197,1198,5,3,0,0,1198,181,1,0,0,
        0,1199,1200,5,2,0,0,1200,1204,5,47,0,0,1201,1203,3,56,28,0,1202,
        1201,1,0,0,0,1203,1206,1,0,0,0,1204,1202,1,0,0,0,1204,1205,1,0,0,
        0,1205,1212,1,0,0,0,1206,1204,1,0,0,0,1207,1209,3,184,92,0,1208,
        1210,3,186,93,0,1209,1208,1,0,0,0,1209,1210,1,0,0,0,1210,1213,1,
        0,0,0,1211,1213,3,186,93,0,1212,1207,1,0,0,0,1212,1211,1,0,0,0,1213,
        1214,1,0,0,0,1214,1215,5,3,0,0,1215,183,1,0,0,0,1216,1217,5,2,0,
        0,1217,1218,5,48,0,0,1218,1222,5,114,0,0,1219,1221,3,56,28,0,1220,
        1219,1,0,0,0,1221,1224,1,0,0,0,1222,1220,1,0,0,0,1222,1223,1,0,0,
        0,1223,1225,1,0,0,0,1224,1222,1,0,0,0,1225,1226,5,3,0,0,1226,185,
        1,0,0,0,1227,1228,5,2,0,0,1228,1232,5,49,0,0,1229,1231,3,56,28,0,
        1230,1229,1,0,0,0,1231,1234,1,0,0,0,1232,1230,1,0,0,0,1232,1233,
        1,0,0,0,1233,1235,1,0,0,0,1234,1232,1,0,0,0,1235,1236,5,3,0,0,1236,
        187,1,0,0,0,1237,1275,3,272,136,0,1238,1275,5,108,0,0,1239,1275,
        5,114,0,0,1240,1275,5,18,0,0,1241,1275,5,113,0,0,1242,1275,3,202,
        101,0,1243,1275,3,204,102,0,1244,1275,3,206,103,0,1245,1275,3,208,
        104,0,1246,1275,3,210,105,0,1247,1275,3,212,106,0,1248,1275,3,214,
        107,0,1249,1275,3,216,108,0,1250,1275,3,218,109,0,1251,1275,3,220,
        110,0,1252,1275,3,222,111,0,1253,1275,3,230,115,0,1254,1275,3,236,
        118,0,1255,1275,3,242,121,0,1256,1275,3,244,122,0,1257,1275,3,246,
        123,0,1258,1275,3,252,126,0,1259,1275,3,254,127,0,1260,1275,3,224,
        112,0,1261,1275,3,226,113,0,1262,1275,3,228,114,0,1263,1275,3,256,
        128,0,1264,1275,3,258,129,0,1265,1275,3,260,130,0,1266,1275,3,198,
        99,0,1267,1275,3,200,100,0,1268,1275,3,238,119,0,1269,1275,3,190,
        95,0,1270,1275,3,192,96,0,1271,1275,3,194,97,0,1272,1275,3,196,98,
        0,1273,1275,3,262,131,0,1274,1237,1,0,0,0,1274,1238,1,0,0,0,1274,
        1239,1,0,0,0,1274,1240,1,0,0,0,1274,1241,1,0,0,0,1274,1242,1,0,0,
        0,1274,1243,1,0,0,0,1274,1244,1,0,0,0,1274,1245,1,0,0,0,1274,1246,
        1,0,0,0,1274,1247,1,0,0,0,1274,1248,1,0,0,0,1274,1249,1,0,0,0,1274,
        1250,1,0,0,0,1274,1251,1,0,0,0,1274,1252,1,0,0,0,1274,1253,1,0,0,
        0,1274,1254,1,0,0,0,1274,1255,1,0,0,0,1274,1256,1,0,0,0,1274,1257,
        1,0,0,0,1274,1258,1,0,0,0,1274,1259,1,0,0,0,1274,1260,1,0,0,0,1274,
        1261,1,0,0,0,1274,1262,1,0,0,0,1274,1263,1,0,0,0,1274,1264,1,0,0,
        0,1274,1265,1,0,0,0,1274,1266,1,0,0,0,1274,1267,1,0,0,0,1274,1268,
        1,0,0,0,1274,1269,1,0,0,0,1274,1270,1,0,0,0,1274,1271,1,0,0,0,1274,
        1272,1,0,0,0,1274,1273,1,0,0,0,1275,189,1,0,0,0,1276,1277,5,57,0,
        0,1277,191,1,0,0,0,1278,1279,5,58,0,0,1279,193,1,0,0,0,1280,1281,
        5,2,0,0,1281,1285,5,58,0,0,1282,1284,3,188,94,0,1283,1282,1,0,0,
        0,1284,1287,1,0,0,0,1285,1283,1,0,0,0,1285,1286,1,0,0,0,1286,1288,
        1,0,0,0,1287,1285,1,0,0,0,1288,1289,5,3,0,0,1289,195,1,0,0,0,1290,
        1291,5,2,0,0,1291,1292,5,52,0,0,1292,1296,5,114,0,0,1293,1295,3,
        188,94,0,1294,1293,1,0,0,0,1295,1298,1,0,0,0,1296,1294,1,0,0,0,1296,
        1297,1,0,0,0,1297,1299,1,0,0,0,1298,1296,1,0,0,0,1299,1300,5,3,0,
        0,1300,197,1,0,0,0,1301,1302,5,2,0,0,1302,1303,5,68,0,0,1303,1304,
        3,188,94,0,1304,1305,5,3,0,0,1305,199,1,0,0,0,1306,1307,5,2,0,0,
        1307,1308,5,69,0,0,1308,1309,3,188,94,0,1309,1310,3,112,56,0,1310,
        1311,5,3,0,0,1311,201,1,0,0,0,1312,1313,5,2,0,0,1313,1314,5,10,0,
        0,1314,1318,3,266,133,0,1315,1317,3,56,28,0,1316,1315,1,0,0,0,1317,
        1320,1,0,0,0,1318,1316,1,0,0,0,1318,1319,1,0,0,0,1319,1321,1,0,0,
        0,1320,1318,1,0,0,0,1321,1322,5,3,0,0,1322,203,1,0,0,0,1323,1324,
        5,2,0,0,1324,1325,5,11,0,0,1325,1329,3,266,133,0,1326,1328,3,56,
        28,0,1327,1326,1,0,0,0,1328,1331,1,0,0,0,1329,1327,1,0,0,0,1329,
        1330,1,0,0,0,1330,1332,1,0,0,0,1331,1329,1,0,0,0,1332,1333,5,3,0,
        0,1333,205,1,0,0,0,1334,1335,5,2,0,0,1335,1336,5,89,0,0,1336,1340,
        3,266,133,0,1337,1339,3,56,28,0,1338,1337,1,0,0,0,1339,1342,1,0,
        0,0,1340,1338,1,0,0,0,1340,1341,1,0,0,0,1341,1343,1,0,0,0,1342,1340,
        1,0,0,0,1343,1344,5,3,0,0,1344,207,1,0,0,0,1345,1346,5,2,0,0,1346,
        1347,5,90,0,0,1347,1351,3,266,133,0,1348,1350,3,56,28,0,1349,1348,
        1,0,0,0,1350,1353,1,0,0,0,1351,1349,1,0,0,0,1351,1352,1,0,0,0,1352,
        1354,1,0,0,0,1353,1351,1,0,0,0,1354,1355,5,3,0,0,1355,209,1,0,0,
        0,1356,1357,5,2,0,0,1357,1358,5,91,0,0,1358,1362,3,266,133,0,1359,
        1361,3,56,28,0,1360,1359,1,0,0,0,1361,1364,1,0,0,0,1362,1360,1,0,
        0,0,1362,1363,1,0,0,0,1363,1365,1,0,0,0,1364,1362,1,0,0,0,1365,1366,
        5,3,0,0,1366,211,1,0,0,0,1367,1368,5,2,0,0,1368,1369,5,88,0,0,1369,
        1373,3,266,133,0,1370,1372,3,56,28,0,1371,1370,1,0,0,0,1372,1375,
        1,0,0,0,1373,1371,1,0,0,0,1373,1374,1,0,0,0,1374,1376,1,0,0,0,1375,
        1373,1,0,0,0,1376,1377,5,3,0,0,1377,213,1,0,0,0,1378,1379,5,2,0,
        0,1379,1380,5,94,0,0,1380,1381,3,188,94,0,1381,1382,5,3,0,0,1382,
        215,1,0,0,0,1383,1384,5,2,0,0,1384,1386,5,93,0,0,1385,1387,3,188,
        94,0,1386,1385,1,0,0,0,1386,1387,1,0,0,0,1387,1388,1,0,0,0,1388,
        1389,5,3,0,0,1389,217,1,0,0,0,1390,1391,5,2,0,0,1391,1392,5,92,0,
        0,1392,1393,3,188,94,0,1393,1394,5,3,0,0,1394,219,1,0,0,0,1395,1396,
        5,2,0,0,1396,1397,5,14,0,0,1397,1398,3,188,94,0,1398,1402,3,188,
        94,0,1399,1401,3,188,94,0,1400,1399,1,0,0,0,1401,1404,1,0,0,0,1402,
        1400,1,0,0,0,1402,1403,1,0,0,0,1403,1405,1,0,0,0,1404,1402,1,0,0,
        0,1405,1406,5,3,0,0,1406,221,1,0,0,0,1407,1408,5,2,0,0,1408,1409,
        5,15,0,0,1409,1410,3,188,94,0,1410,1414,3,188,94,0,1411,1413,3,188,
        94,0,1412,1411,1,0,0,0,1413,1416,1,0,0,0,1414,1412,1,0,0,0,1414,
        1415,1,0,0,0,1415,1417,1,0,0,0,1416,1414,1,0,0,0,1417,1418,5,3,0,
        0,1418,223,1,0,0,0,1419,1420,5,2,0,0,1420,1421,5,25,0,0,1421,1422,
        3,188,94,0,1422,1423,3,188,94,0,1423,1424,3,188,94,0,1424,1425,5,
        3,0,0,1425,225,1,0,0,0,1426,1427,5,2,0,0,1427,1431,5,26,0,0,1428,
        1429,3,188,94,0,1429,1430,3,188,94,0,1430,1432,1,0,0,0,1431,1428,
        1,0,0,0,1432,1433,1,0,0,0,1433,1431,1,0,0,0,1433,1434,1,0,0,0,1434,
        1435,1,0,0,0,1435,1436,5,3,0,0,1436,227,1,0,0,0,1437,1438,5,2,0,
        0,1438,1439,5,39,0,0,1439,1441,5,114,0,0,1440,1442,3,264,132,0,1441,
        1440,1,0,0,0,1441,1442,1,0,0,0,1442,1446,1,0,0,0,1443,1445,3,188,
        94,0,1444,1443,1,0,0,0,1445,1448,1,0,0,0,1446,1444,1,0,0,0,1446,
        1447,1,0,0,0,1447,1449,1,0,0,0,1448,1446,1,0,0,0,1449,1450,5,3,0,
        0,1450,229,1,0,0,0,1451,1452,5,2,0,0,1452,1456,5,27,0,0,1453,1455,
        3,232,116,0,1454,1453,1,0,0,0,1455,1458,1,0,0,0,1456,1454,1,0,0,
        0,1456,1457,1,0,0,0,1457,1459,1,0,0,0,1458,1456,1,0,0,0,1459,1460,
        5,3,0,0,1460,231,1,0,0,0,1461,1462,5,2,0,0,1462,1463,3,240,120,0,
        1463,1464,3,188,94,0,1464,1465,5,3,0,0,1465,1475,1,0,0,0,1466,1467,
        5,2,0,0,1467,1468,3,240,120,0,1468,1469,3,234,117,0,1469,1470,5,
        3,0,0,1470,1475,1,0,0,0,1471,1472,5,2,0,0,1472,1473,5,114,0,0,1473,
        1475,5,3,0,0,1474,1461,1,0,0,0,1474,1466,1,0,0,0,1474,1471,1,0,0,
        0,1475,233,1,0,0,0,1476,1477,5,2,0,0,1477,1478,5,13,0,0,1478,1482,
        3,266,133,0,1479,1481,3,56,28,0,1480,1479,1,0,0,0,1481,1484,1,0,
        0,0,1482,1480,1,0,0,0,1482,1483,1,0,0,0,1483,1485,1,0,0,0,1484,1482,
        1,0,0,0,1485,1486,5,3,0,0,1486,235,1,0,0,0,1487,1488,5,2,0,0,1488,
        1492,5,29,0,0,1489,1491,3,188,94,0,1490,1489,1,0,0,0,1491,1494,1,
        0,0,0,1492,1490,1,0,0,0,1492,1493,1,0,0,0,1493,1495,1,0,0,0,1494,
        1492,1,0,0,0,1495,1496,5,3,0,0,1496,237,1,0,0,0,1497,1498,5,2,0,
        0,1498,1501,5,73,0,0,1499,1502,5,110,0,0,1500,1502,3,188,94,0,1501,
        1499,1,0,0,0,1501,1500,1,0,0,0,1502,1503,1,0,0,0,1503,1501,1,0,0,
        0,1503,1504,1,0,0,0,1504,1505,1,0,0,0,1505,1506,5,3,0,0,1506,239,
        1,0,0,0,1507,1508,7,2,0,0,1508,241,1,0,0,0,1509,1510,5,2,0,0,1510,
        1511,5,32,0,0,1511,1512,3,188,94,0,1512,1513,3,240,120,0,1513,1514,
        5,3,0,0,1514,243,1,0,0,0,1515,1516,5,2,0,0,1516,1517,5,33,0,0,1517,
        1518,3,188,94,0,1518,1519,3,188,94,0,1519,1520,5,3,0,0,1520,245,
        1,0,0,0,1521,1522,5,2,0,0,1522,1523,7,3,0,0,1523,1524,3,248,124,
        0,1524,1525,5,3,0,0,1525,247,1,0,0,0,1526,1527,3,250,125,0,1527,
        249,1,0,0,0,1528,1529,5,2,0,0,1529,1530,5,38,0,0,1530,1531,3,188,
        94,0,1531,1532,5,3,0,0,1532,1548,1,0,0,0,1533,1534,5,2,0,0,1534,
        1535,5,37,0,0,1535,1536,3,188,94,0,1536,1537,5,3,0,0,1537,1548,1,
        0,0,0,1538,1542,5,2,0,0,1539,1541,3,250,125,0,1540,1539,1,0,0,0,
        1541,1544,1,0,0,0,1542,1540,1,0,0,0,1542,1543,1,0,0,0,1543,1545,
        1,0,0,0,1544,1542,1,0,0,0,1545,1548,5,3,0,0,1546,1548,8,4,0,0,1547,
        1528,1,0,0,0,1547,1533,1,0,0,0,1547,1538,1,0,0,0,1547,1546,1,0,0,
        0,1548,251,1,0,0,0,1549,1550,5,2,0,0,1550,1551,5,38,0,0,1551,1552,
        3,188,94,0,1552,1553,5,3,0,0,1553,253,1,0,0,0,1554,1555,5,2,0,0,
        1555,1556,5,37,0,0,1556,1557,3,188,94,0,1557,1558,5,3,0,0,1558,255,
        1,0,0,0,1559,1560,5,2,0,0,1560,1561,5,31,0,0,1561,1562,3,188,94,
        0,1562,1563,3,240,120,0,1563,1564,5,3,0,0,1564,257,1,0,0,0,1565,
        1566,5,2,0,0,1566,1567,5,30,0,0,1567,1568,3,188,94,0,1568,1569,3,
        188,94,0,1569,1570,5,3,0,0,1570,259,1,0,0,0,1571,1572,5,2,0,0,1572,
        1573,5,34,0,0,1573,1574,3,188,94,0,1574,1575,3,188,94,0,1575,1576,
        5,3,0,0,1576,261,1,0,0,0,1577,1578,5,2,0,0,1578,1580,3,188,94,0,
        1579,1581,3,264,132,0,1580,1579,1,0,0,0,1580,1581,1,0,0,0,1581,1585,
        1,0,0,0,1582,1584,3,188,94,0,1583,1582,1,0,0,0,1584,1587,1,0,0,0,
        1585,1583,1,0,0,0,1585,1586,1,0,0,0,1586,1588,1,0,0,0,1587,1585,
        1,0,0,0,1588,1589,5,3,0,0,1589,263,1,0,0,0,1590,1591,5,2,0,0,1591,
        1593,5,77,0,0,1592,1594,3,112,56,0,1593,1592,1,0,0,0,1594,1595,1,
        0,0,0,1595,1593,1,0,0,0,1595,1596,1,0,0,0,1596,1597,1,0,0,0,1597,
        1598,5,3,0,0,1598,265,1,0,0,0,1599,1616,5,2,0,0,1600,1607,3,268,
        134,0,1601,1603,5,4,0,0,1602,1601,1,0,0,0,1602,1603,1,0,0,0,1603,
        1604,1,0,0,0,1604,1606,3,268,134,0,1605,1602,1,0,0,0,1606,1609,1,
        0,0,0,1607,1605,1,0,0,0,1607,1608,1,0,0,0,1608,1614,1,0,0,0,1609,
        1607,1,0,0,0,1610,1612,5,4,0,0,1611,1610,1,0,0,0,1611,1612,1,0,0,
        0,1612,1613,1,0,0,0,1613,1615,3,270,135,0,1614,1611,1,0,0,0,1614,
        1615,1,0,0,0,1615,1617,1,0,0,0,1616,1600,1,0,0,0,1616,1617,1,0,0,
        0,1617,1618,1,0,0,0,1618,1621,5,3,0,0,1619,1620,5,87,0,0,1620,1622,
        3,112,56,0,1621,1619,1,0,0,0,1621,1622,1,0,0,0,1622,1631,1,0,0,0,
        1623,1624,5,2,0,0,1624,1625,3,270,135,0,1625,1628,5,3,0,0,1626,1627,
        5,87,0,0,1627,1629,3,112,56,0,1628,1626,1,0,0,0,1628,1629,1,0,0,
        0,1629,1631,1,0,0,0,1630,1599,1,0,0,0,1630,1623,1,0,0,0,1631,267,
        1,0,0,0,1632,1633,5,2,0,0,1633,1636,5,114,0,0,1634,1635,5,87,0,0,
        1635,1637,3,112,56,0,1636,1634,1,0,0,0,1636,1637,1,0,0,0,1637,1638,
        1,0,0,0,1638,1639,5,3,0,0,1639,269,1,0,0,0,1640,1641,5,2,0,0,1641,
        1642,5,74,0,0,1642,1645,5,114,0,0,1643,1644,5,87,0,0,1644,1646,3,
        112,56,0,1645,1643,1,0,0,0,1645,1646,1,0,0,0,1646,1647,1,0,0,0,1647,
        1648,5,3,0,0,1648,271,1,0,0,0,1649,1650,7,5,0,0,1650,273,1,0,0,0,
        132,279,294,302,311,326,333,345,357,365,377,386,389,399,408,413,
        416,419,429,433,436,451,460,471,480,486,489,499,509,517,527,539,
        547,557,565,575,580,584,591,596,599,607,629,637,644,661,668,684,
        694,704,712,724,740,749,760,793,800,807,817,837,847,865,874,894,
        902,912,926,941,946,952,962,972,981,986,1032,1042,1053,1059,1066,
        1075,1083,1086,1089,1113,1121,1125,1135,1145,1158,1170,1182,1194,
        1204,1209,1212,1222,1232,1274,1285,1296,1318,1329,1340,1351,1362,
        1373,1386,1402,1414,1433,1441,1446,1456,1474,1482,1492,1501,1503,
        1542,1547,1580,1585,1595,1602,1607,1611,1614,1616,1621,1628,1630,
        1636,1645
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
    public topLevelLet(): TopLevelLetContext | null {
        return this.getRuleContext(0, TopLevelLetContext);
    }
    public topLevelConst(): TopLevelConstContext | null {
        return this.getRuleContext(0, TopLevelConstContext);
    }
    public fnDecl(): FnDeclContext | null {
        return this.getRuleContext(0, FnDeclContext);
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
    public fnDecl(): FnDeclContext | null {
        return this.getRuleContext(0, FnDeclContext);
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


export class FnDeclContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public DEFN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.DEFN, 0)!;
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
    public metaAnnotation(): MetaAnnotationContext[];
    public metaAnnotation(i: number): MetaAnnotationContext | null;
    public metaAnnotation(i?: number): MetaAnnotationContext[] | MetaAnnotationContext | null {
        if (i === undefined) {
            return this.getRuleContexts(MetaAnnotationContext);
        }

        return this.getRuleContext(i, MetaAnnotationContext);
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
        return Stage8Parser.RULE_fnDecl;
    }
    public override enterRule(listener: Stage8Listener): void {
        if(listener.enterFnDecl) {
             listener.enterFnDecl(this);
        }
    }
    public override exitRule(listener: Stage8Listener): void {
        if(listener.exitFnDecl) {
             listener.exitFnDecl(this);
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
    public KEYWORD(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.KEYWORD, 0)!;
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
    public KEYWORD(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.KEYWORD, 0)!;
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
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.LPAREN, 0)!;
    }
    public FIELD(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.FIELD, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.IDENTIFIER, 0)!;
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
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage8Parser.IDENTIFIER, 0)!;
    }
    public LPAREN(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.LPAREN, 0);
    }
    public RPAREN(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.RPAREN, 0);
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
    public KEYWORD(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.KEYWORD, 0);
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
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
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
    public KEYWORD(): antlr.TerminalNode | null {
        return this.getToken(Stage8Parser.KEYWORD, 0);
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
