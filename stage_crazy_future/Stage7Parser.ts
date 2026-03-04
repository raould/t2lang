
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
    public static readonly FOR = 45;
    public static readonly CLASS_BODY = 46;
    public static readonly SUPER_METHOD = 47;
    public static readonly ABSTRACT_METHOD = 48;
    public static readonly CLASS = 49;
    public static readonly FIELD = 50;
    public static readonly CONSTRUCTOR = 51;
    public static readonly THIS = 52;
    public static readonly SUPER = 53;
    public static readonly GET = 54;
    public static readonly SETPROP = 55;
    public static readonly IMPLEMENTS = 56;
    public static readonly UNION = 57;
    public static readonly INTERSECT = 58;
    public static readonly TUPLE = 59;
    public static readonly TYPEFN = 60;
    public static readonly LIT = 61;
    public static readonly KEYOF = 62;
    public static readonly TYPEOF = 63;
    public static readonly TYPE_AS = 64;
    public static readonly INFER = 65;
    public static readonly MAPPED = 66;
    public static readonly TYPE_TEMPLATE = 67;
    public static readonly TEMPLATE = 68;
    public static readonly REST = 69;
    public static readonly READONLY = 70;
    public static readonly TYPE_PARAMS = 71;
    public static readonly TYPE_ARGS = 72;
    public static readonly EXTENDS = 73;
    public static readonly RETURNS = 74;
    public static readonly TYPE = 75;
    public static readonly INTERFACE = 76;
    public static readonly MODIFIERS = 77;
    public static readonly OPTIONAL = 78;
    public static readonly BOOLEAN = 79;
    public static readonly NULL = 80;
    public static readonly UNDEFINED = 81;
    public static readonly COLON = 82;
    public static readonly ASYNC_GENERATOR_FN = 83;
    public static readonly ASYNC_LAMBDA = 84;
    public static readonly ASYNC_FN = 85;
    public static readonly GENERATOR_FN = 86;
    public static readonly YIELD_STAR = 87;
    public static readonly YIELD = 88;
    public static readonly AWAIT = 89;
    public static readonly CARET = 90;
    public static readonly LBRACK = 91;
    public static readonly RBRACK = 92;
    public static readonly EXPORT = 93;
    public static readonly EXPORT_DEFAULT = 94;
    public static readonly EXPORT_NAMED = 95;
    public static readonly EXPORT_NS_FROM = 96;
    public static readonly EXPORT_FROM = 97;
    public static readonly EXPORT_ALL_FROM = 98;
    public static readonly IMPORT_TYPE = 99;
    public static readonly EXPORT_TYPE_ALL_FROM = 100;
    public static readonly EXPORT_TYPE_FROM = 101;
    public static readonly EXPORT_TYPE = 102;
    public static readonly KEYWORD = 103;
    public static readonly NUMBER = 104;
    public static readonly STRING = 105;
    public static readonly MULTILINE_STRING = 106;
    public static readonly IDENTIFIER = 107;
    public static readonly WS = 108;
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
    public static readonly RULE_typedParam = 24;
    public static readonly RULE_fnSignatureTyped = 25;
    public static readonly RULE_statement = 26;
    public static readonly RULE_letStar = 27;
    public static readonly RULE_letStmt = 28;
    public static readonly RULE_constStar = 29;
    public static readonly RULE_constStmt = 30;
    public static readonly RULE_ifForm = 31;
    public static readonly RULE_whileForm = 32;
    public static readonly RULE_block = 33;
    public static readonly RULE_returnForm = 34;
    public static readonly RULE_throwForm = 35;
    public static readonly RULE_importForm = 36;
    public static readonly RULE_importTypeForm = 37;
    public static readonly RULE_importTypeSpec = 38;
    public static readonly RULE_importTypeName = 39;
    public static readonly RULE_exportForm = 40;
    public static readonly RULE_exportBinding = 41;
    public static readonly RULE_exportDefault = 42;
    public static readonly RULE_exportNamed = 43;
    public static readonly RULE_exportNamePair = 44;
    public static readonly RULE_exportFrom = 45;
    public static readonly RULE_exportAllFrom = 46;
    public static readonly RULE_exportNsFromForm = 47;
    public static readonly RULE_exportTypeForm = 48;
    public static readonly RULE_exportTypeFromForm = 49;
    public static readonly RULE_exportTypeAllFromForm = 50;
    public static readonly RULE_exportDeclForm = 51;
    public static readonly RULE_starBinding = 52;
    public static readonly RULE_singleBinding = 53;
    public static readonly RULE_typeExpr = 54;
    public static readonly RULE_typeUnion = 55;
    public static readonly RULE_typeIntersection = 56;
    public static readonly RULE_typeArray = 57;
    public static readonly RULE_typeTuple = 58;
    public static readonly RULE_typeTupleElement = 59;
    public static readonly RULE_typeFunction = 60;
    public static readonly RULE_typeFnParam = 61;
    public static readonly RULE_typeObject = 62;
    public static readonly RULE_typeProp = 63;
    public static readonly RULE_propModifier = 64;
    public static readonly RULE_typeLiteral = 65;
    public static readonly RULE_typeKeyof = 66;
    public static readonly RULE_typeTypeof = 67;
    public static readonly RULE_typeIndexAccess = 68;
    public static readonly RULE_typeConditional = 69;
    public static readonly RULE_typeInfer = 70;
    public static readonly RULE_typeMapped = 71;
    public static readonly RULE_mappedModifiers = 72;
    public static readonly RULE_mappedModifier = 73;
    public static readonly RULE_typeTemplateLiteral = 74;
    public static readonly RULE_templatePart = 75;
    public static readonly RULE_typeApplication = 76;
    public static readonly RULE_typeParams = 77;
    public static readonly RULE_typeParamDecl = 78;
    public static readonly RULE_typeParamConstraint = 79;
    public static readonly RULE_typeParamDefault = 80;
    public static readonly RULE_assign = 81;
    public static readonly RULE_switchForm = 82;
    public static readonly RULE_caseClause = 83;
    public static readonly RULE_defaultClause = 84;
    public static readonly RULE_forForm = 85;
    public static readonly RULE_forInForm = 86;
    public static readonly RULE_forOfForm = 87;
    public static readonly RULE_forAwaitForm = 88;
    public static readonly RULE_expression = 89;
    public static readonly RULE_thisExpr = 90;
    public static readonly RULE_superExpr = 91;
    public static readonly RULE_superConstructorCall = 92;
    public static readonly RULE_superMethodCall = 93;
    public static readonly RULE_typeofExpr = 94;
    public static readonly RULE_typeAssert = 95;
    public static readonly RULE_lambda = 96;
    public static readonly RULE_fn = 97;
    public static readonly RULE_asyncLambda = 98;
    public static readonly RULE_asyncFn = 99;
    public static readonly RULE_generatorFn = 100;
    public static readonly RULE_asyncGeneratorFn = 101;
    public static readonly RULE_awaitExpr = 102;
    public static readonly RULE_yieldExpr = 103;
    public static readonly RULE_yieldStarExpr = 104;
    public static readonly RULE_bindExpr = 105;
    public static readonly RULE_methodCallExpr = 106;
    public static readonly RULE_ternary = 107;
    public static readonly RULE_condExpr = 108;
    public static readonly RULE_newForm = 109;
    public static readonly RULE_objectExpr = 110;
    public static readonly RULE_objectField = 111;
    public static readonly RULE_methodDef = 112;
    public static readonly RULE_arrayExpr = 113;
    public static readonly RULE_templateExpr = 114;
    public static readonly RULE_propKey = 115;
    public static readonly RULE_propAccess = 116;
    public static readonly RULE_indexAccess = 117;
    public static readonly RULE_quasiquote = 118;
    public static readonly RULE_unquote = 119;
    public static readonly RULE_unquoteSplicing = 120;
    public static readonly RULE_optChain = 121;
    public static readonly RULE_optChainIndex = 122;
    public static readonly RULE_nullCoalesce = 123;
    public static readonly RULE_call = 124;
    public static readonly RULE_typeArgs = 125;
    public static readonly RULE_fnSignature = 126;
    public static readonly RULE_param = 127;
    public static readonly RULE_restParam = 128;
    public static readonly RULE_literal = 129;

    public static readonly literalNames = [
        null, null, "'('", "')'", "','", "'program'", "'let*'", "'let'", 
        "'const*'", "'const'", "'lambda'", "'fn'", "'method'", "'bind'", 
        "'method-call'", "'defmacro'", "'#[macro-time]'", "'if'", "'while'", 
        "'begin'", "'return'", "'throw'", "'set!'", "'ternary'", "'cond'", 
        "'object'", "'type-array'", "'array'", "'optchain-index'", "'.?'", 
        "'.'", "'index'", "'??'", "'quasi'", "'quote'", "'unquote-splicing'", 
        "'unquote'", "'new'", "'import'", "'switch'", "'case'", "'default'", 
        "'for-in'", "'for-of'", "'for-await'", "'for'", "'class-body'", 
        "'super-method'", "'abstract-method'", "'class'", "'field'", "'constructor'", 
        "'this'", "'super'", "'get'", "'set'", "'implements'", "'union'", 
        "'intersect'", "'tuple'", "'tfn'", "'tlit'", "'keyof'", "'typeof'", 
        "'type-as'", "'infer'", "'mapped'", "'type-template'", "'template'", 
        "'rest'", "'readonly'", "'type-params'", "'type-args'", "'extends'", 
        "'returns'", "'type'", "'interface'", "'modifiers'", "'?'", null, 
        "'null'", "'undefined'", "':'", "'async-generator-fn'", "'async-lambda'", 
        "'async-fn'", "'generator-fn'", "'yield*'", "'yield'", "'await'", 
        "'^'", "'['", "']'", "'export'", "'export-default'", "'export-named'", 
        "'export-ns-from'", "'export-from'", "'export-all-from'", "'import-type'", 
        "'export-type-all-from'", "'export-type-from'", "'export-type'"
    ];

    public static readonly symbolicNames = [
        null, "COMMENT", "LPAREN", "RPAREN", "COMMA", "PROGRAM", "LETSTAR", 
        "LET", "CONSTSTAR", "CONST", "LAMBDA", "FN", "METHOD", "BIND", "METHOD_CALL", 
        "DEFMACRO", "MACRO_TIME_ATTR", "IF", "WHILE", "BEGIN", "RETURN", 
        "THROW", "SET", "TERNARY", "COND", "OBJECT", "TYPE_ARRAY", "ARRAY", 
        "OPTCHAIN_INDEX", "OPTCHAIN", "DOT", "INDEX", "NULLCOAL", "QUASI", 
        "QUOTE", "UNQUOTE_SPLICING", "UNQUOTE", "NEW", "IMPORT", "SWITCH", 
        "CASE", "DEFAULT", "FORIN", "FOROF", "FORAWAIT", "FOR", "CLASS_BODY", 
        "SUPER_METHOD", "ABSTRACT_METHOD", "CLASS", "FIELD", "CONSTRUCTOR", 
        "THIS", "SUPER", "GET", "SETPROP", "IMPLEMENTS", "UNION", "INTERSECT", 
        "TUPLE", "TYPEFN", "LIT", "KEYOF", "TYPEOF", "TYPE_AS", "INFER", 
        "MAPPED", "TYPE_TEMPLATE", "TEMPLATE", "REST", "READONLY", "TYPE_PARAMS", 
        "TYPE_ARGS", "EXTENDS", "RETURNS", "TYPE", "INTERFACE", "MODIFIERS", 
        "OPTIONAL", "BOOLEAN", "NULL", "UNDEFINED", "COLON", "ASYNC_GENERATOR_FN", 
        "ASYNC_LAMBDA", "ASYNC_FN", "GENERATOR_FN", "YIELD_STAR", "YIELD", 
        "AWAIT", "CARET", "LBRACK", "RBRACK", "EXPORT", "EXPORT_DEFAULT", 
        "EXPORT_NAMED", "EXPORT_NS_FROM", "EXPORT_FROM", "EXPORT_ALL_FROM", 
        "IMPORT_TYPE", "EXPORT_TYPE_ALL_FROM", "EXPORT_TYPE_FROM", "EXPORT_TYPE", 
        "KEYWORD", "NUMBER", "STRING", "MULTILINE_STRING", "IDENTIFIER", 
        "WS"
    ];
    public static readonly ruleNames = [
        "program", "topLevel", "decl", "defmacro", "macroTimeFnDef", "topLevelLet", 
        "topLevelConst", "metaAnnotation", "typeAlias", "interfaceDef", 
        "interfaceExtends", "classDef", "anonClassDef", "classExtends", 
        "classImplements", "classBody", "classElement", "modifier", "fieldDef", 
        "constructorDef", "classMethodDef", "abstractMethodDef", "getterDef", 
        "setterDef", "typedParam", "fnSignatureTyped", "statement", "letStar", 
        "letStmt", "constStar", "constStmt", "ifForm", "whileForm", "block", 
        "returnForm", "throwForm", "importForm", "importTypeForm", "importTypeSpec", 
        "importTypeName", "exportForm", "exportBinding", "exportDefault", 
        "exportNamed", "exportNamePair", "exportFrom", "exportAllFrom", 
        "exportNsFromForm", "exportTypeForm", "exportTypeFromForm", "exportTypeAllFromForm", 
        "exportDeclForm", "starBinding", "singleBinding", "typeExpr", "typeUnion", 
        "typeIntersection", "typeArray", "typeTuple", "typeTupleElement", 
        "typeFunction", "typeFnParam", "typeObject", "typeProp", "propModifier", 
        "typeLiteral", "typeKeyof", "typeTypeof", "typeIndexAccess", "typeConditional", 
        "typeInfer", "typeMapped", "mappedModifiers", "mappedModifier", 
        "typeTemplateLiteral", "templatePart", "typeApplication", "typeParams", 
        "typeParamDecl", "typeParamConstraint", "typeParamDefault", "assign", 
        "switchForm", "caseClause", "defaultClause", "forForm", "forInForm", 
        "forOfForm", "forAwaitForm", "expression", "thisExpr", "superExpr", 
        "superConstructorCall", "superMethodCall", "typeofExpr", "typeAssert", 
        "lambda", "fn", "asyncLambda", "asyncFn", "generatorFn", "asyncGeneratorFn", 
        "awaitExpr", "yieldExpr", "yieldStarExpr", "bindExpr", "methodCallExpr", 
        "ternary", "condExpr", "newForm", "objectExpr", "objectField", "methodDef", 
        "arrayExpr", "templateExpr", "propKey", "propAccess", "indexAccess", 
        "quasiquote", "unquote", "unquoteSplicing", "optChain", "optChainIndex", 
        "nullCoalesce", "call", "typeArgs", "fnSignature", "param", "restParam", 
        "literal",
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
            this.state = 260;
            this.match(Stage7Parser.LPAREN);
            this.state = 261;
            this.match(Stage7Parser.PROGRAM);
            this.state = 265;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 52)) & ~0x1F) === 0 && ((1 << (_la - 52)) & 939524099) !== 0) || ((((_la - 103)) & ~0x1F) === 0 && ((1 << (_la - 103)) & 23) !== 0)) {
                {
                {
                this.state = 262;
                this.topLevel();
                }
                }
                this.state = 267;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 268;
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
            this.state = 279;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 1, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 270;
                this.defmacro();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 271;
                this.macroTimeFnDef();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 272;
                this.topLevelLet();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 273;
                this.topLevelConst();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 274;
                this.typeAlias();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 275;
                this.interfaceDef();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 276;
                this.classDef();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 277;
                this.exportDeclForm();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 278;
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
            this.state = 286;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 2, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 281;
                this.topLevelLet();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 282;
                this.topLevelConst();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 283;
                this.classDef();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 284;
                this.interfaceDef();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 285;
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
            this.state = 288;
            this.match(Stage7Parser.LPAREN);
            this.state = 289;
            this.match(Stage7Parser.DEFMACRO);
            this.state = 290;
            this.match(Stage7Parser.IDENTIFIER);
            this.state = 291;
            this.fnSignature();
            this.state = 295;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 52)) & ~0x1F) === 0 && ((1 << (_la - 52)) & 939524099) !== 0) || ((((_la - 103)) & ~0x1F) === 0 && ((1 << (_la - 103)) & 23) !== 0)) {
                {
                {
                this.state = 292;
                this.statement();
                }
                }
                this.state = 297;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 298;
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
            this.state = 310;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 4, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 300;
                this.match(Stage7Parser.LPAREN);
                this.state = 301;
                this.match(Stage7Parser.MACRO_TIME_ATTR);
                this.state = 302;
                this.topLevelLet();
                this.state = 303;
                this.match(Stage7Parser.RPAREN);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 305;
                this.match(Stage7Parser.LPAREN);
                this.state = 306;
                this.match(Stage7Parser.MACRO_TIME_ATTR);
                this.state = 307;
                this.topLevelConst();
                this.state = 308;
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
            this.state = 312;
            this.match(Stage7Parser.LPAREN);
            this.state = 313;
            this.match(Stage7Parser.LET);
            this.state = 317;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 90) {
                {
                {
                this.state = 314;
                this.metaAnnotation();
                }
                }
                this.state = 319;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 320;
            this.match(Stage7Parser.IDENTIFIER);
            this.state = 321;
            this.expression();
            this.state = 322;
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
            this.state = 324;
            this.match(Stage7Parser.LPAREN);
            this.state = 325;
            this.match(Stage7Parser.CONST);
            this.state = 329;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 90) {
                {
                {
                this.state = 326;
                this.metaAnnotation();
                }
                }
                this.state = 331;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 332;
            this.match(Stage7Parser.IDENTIFIER);
            this.state = 333;
            this.expression();
            this.state = 334;
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
            this.state = 336;
            this.match(Stage7Parser.CARET);
            this.state = 337;
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
            this.state = 339;
            this.match(Stage7Parser.LPAREN);
            this.state = 340;
            this.match(Stage7Parser.TYPE);
            this.state = 341;
            this.match(Stage7Parser.IDENTIFIER);
            this.state = 343;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 7, this.context) ) {
            case 1:
                {
                this.state = 342;
                this.typeParams();
                }
                break;
            }
            this.state = 345;
            this.typeExpr();
            this.state = 346;
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
            this.state = 348;
            this.match(Stage7Parser.LPAREN);
            this.state = 349;
            this.match(Stage7Parser.INTERFACE);
            this.state = 350;
            this.match(Stage7Parser.IDENTIFIER);
            this.state = 352;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 8, this.context) ) {
            case 1:
                {
                this.state = 351;
                this.typeParams();
                }
                break;
            }
            this.state = 355;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 9, this.context) ) {
            case 1:
                {
                this.state = 354;
                this.interfaceExtends();
                }
                break;
            }
            this.state = 357;
            this.typeObject();
            this.state = 358;
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
            this.state = 360;
            this.match(Stage7Parser.LPAREN);
            this.state = 361;
            this.match(Stage7Parser.EXTENDS);
            this.state = 363;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 362;
                this.typeExpr();
                }
                }
                this.state = 365;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 107);
            this.state = 367;
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
            this.state = 369;
            this.match(Stage7Parser.LPAREN);
            this.state = 370;
            this.match(Stage7Parser.CLASS);
            this.state = 374;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 103) {
                {
                {
                this.state = 371;
                this.modifier();
                }
                }
                this.state = 376;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 377;
            this.match(Stage7Parser.IDENTIFIER);
            this.state = 379;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 12, this.context) ) {
            case 1:
                {
                this.state = 378;
                this.typeParams();
                }
                break;
            }
            this.state = 382;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 13, this.context) ) {
            case 1:
                {
                this.state = 381;
                this.classExtends();
                }
                break;
            }
            this.state = 385;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 14, this.context) ) {
            case 1:
                {
                this.state = 384;
                this.classImplements();
                }
                break;
            }
            this.state = 387;
            this.classBody();
            this.state = 388;
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
            this.state = 390;
            this.match(Stage7Parser.LPAREN);
            this.state = 391;
            this.match(Stage7Parser.CLASS);
            this.state = 395;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 103) {
                {
                {
                this.state = 392;
                this.modifier();
                }
                }
                this.state = 397;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 399;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 16, this.context) ) {
            case 1:
                {
                this.state = 398;
                this.classExtends();
                }
                break;
            }
            this.state = 402;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 17, this.context) ) {
            case 1:
                {
                this.state = 401;
                this.classImplements();
                }
                break;
            }
            this.state = 404;
            this.classBody();
            this.state = 405;
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
            this.state = 407;
            this.match(Stage7Parser.LPAREN);
            this.state = 408;
            this.match(Stage7Parser.EXTENDS);
            this.state = 409;
            this.typeExpr();
            this.state = 410;
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
            this.state = 412;
            this.match(Stage7Parser.LPAREN);
            this.state = 413;
            this.match(Stage7Parser.IMPLEMENTS);
            this.state = 415;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 414;
                this.typeExpr();
                }
                }
                this.state = 417;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 107);
            this.state = 419;
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
            this.state = 421;
            this.match(Stage7Parser.LPAREN);
            this.state = 422;
            this.match(Stage7Parser.CLASS_BODY);
            this.state = 426;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 423;
                this.classElement();
                }
                }
                this.state = 428;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
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
    public classElement(): ClassElementContext {
        let localContext = new ClassElementContext(this.context, this.state);
        this.enterRule(localContext, 32, Stage7Parser.RULE_classElement);
        try {
            this.state = 437;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 20, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 431;
                this.fieldDef();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 432;
                this.constructorDef();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 433;
                this.classMethodDef();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 434;
                this.abstractMethodDef();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 435;
                this.getterDef();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 436;
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
            this.state = 439;
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
            this.state = 441;
            this.match(Stage7Parser.LPAREN);
            this.state = 442;
            this.match(Stage7Parser.FIELD);
            this.state = 446;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 103) {
                {
                {
                this.state = 443;
                this.modifier();
                }
                }
                this.state = 448;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 449;
            this.match(Stage7Parser.IDENTIFIER);
            this.state = 452;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 82) {
                {
                this.state = 450;
                this.match(Stage7Parser.COLON);
                this.state = 451;
                this.typeExpr();
                }
            }

            this.state = 455;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2 || ((((_la - 52)) & ~0x1F) === 0 && ((1 << (_la - 52)) & 939524099) !== 0) || ((((_la - 103)) & ~0x1F) === 0 && ((1 << (_la - 103)) & 23) !== 0)) {
                {
                this.state = 454;
                this.expression();
                }
            }

            this.state = 457;
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
            this.state = 459;
            this.match(Stage7Parser.LPAREN);
            this.state = 460;
            this.match(Stage7Parser.CONSTRUCTOR);
            this.state = 461;
            this.fnSignatureTyped();
            this.state = 465;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 52)) & ~0x1F) === 0 && ((1 << (_la - 52)) & 939524099) !== 0) || ((((_la - 103)) & ~0x1F) === 0 && ((1 << (_la - 103)) & 23) !== 0)) {
                {
                {
                this.state = 462;
                this.statement();
                }
                }
                this.state = 467;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 468;
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
            this.state = 470;
            this.match(Stage7Parser.LPAREN);
            this.state = 471;
            this.match(Stage7Parser.METHOD);
            this.state = 475;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 103) {
                {
                {
                this.state = 472;
                this.modifier();
                }
                }
                this.state = 477;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 478;
            this.match(Stage7Parser.IDENTIFIER);
            this.state = 479;
            this.fnSignatureTyped();
            this.state = 483;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 52)) & ~0x1F) === 0 && ((1 << (_la - 52)) & 939524099) !== 0) || ((((_la - 103)) & ~0x1F) === 0 && ((1 << (_la - 103)) & 23) !== 0)) {
                {
                {
                this.state = 480;
                this.statement();
                }
                }
                this.state = 485;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 486;
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
            this.state = 488;
            this.match(Stage7Parser.LPAREN);
            this.state = 489;
            this.match(Stage7Parser.ABSTRACT_METHOD);
            this.state = 493;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 103) {
                {
                {
                this.state = 490;
                this.modifier();
                }
                }
                this.state = 495;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 496;
            this.match(Stage7Parser.IDENTIFIER);
            this.state = 497;
            this.fnSignatureTyped();
            this.state = 498;
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
            this.state = 500;
            this.match(Stage7Parser.LPAREN);
            this.state = 501;
            this.match(Stage7Parser.GET);
            this.state = 505;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 103) {
                {
                {
                this.state = 502;
                this.modifier();
                }
                }
                this.state = 507;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 508;
            this.match(Stage7Parser.IDENTIFIER);
            this.state = 509;
            this.fnSignatureTyped();
            this.state = 513;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 52)) & ~0x1F) === 0 && ((1 << (_la - 52)) & 939524099) !== 0) || ((((_la - 103)) & ~0x1F) === 0 && ((1 << (_la - 103)) & 23) !== 0)) {
                {
                {
                this.state = 510;
                this.statement();
                }
                }
                this.state = 515;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 516;
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
            this.state = 518;
            this.match(Stage7Parser.LPAREN);
            this.state = 519;
            this.match(Stage7Parser.SETPROP);
            this.state = 523;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 103) {
                {
                {
                this.state = 520;
                this.modifier();
                }
                }
                this.state = 525;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 526;
            this.match(Stage7Parser.IDENTIFIER);
            this.state = 527;
            this.fnSignatureTyped();
            this.state = 531;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 52)) & ~0x1F) === 0 && ((1 << (_la - 52)) & 939524099) !== 0) || ((((_la - 103)) & ~0x1F) === 0 && ((1 << (_la - 103)) & 23) !== 0)) {
                {
                {
                this.state = 528;
                this.statement();
                }
                }
                this.state = 533;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 534;
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
    public typedParam(): TypedParamContext {
        let localContext = new TypedParamContext(this.context, this.state);
        this.enterRule(localContext, 48, Stage7Parser.RULE_typedParam);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 536;
            this.match(Stage7Parser.LPAREN);
            this.state = 537;
            this.match(Stage7Parser.IDENTIFIER);
            this.state = 539;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 78) {
                {
                this.state = 538;
                this.match(Stage7Parser.OPTIONAL);
                }
            }

            this.state = 543;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 82) {
                {
                this.state = 541;
                this.match(Stage7Parser.COLON);
                this.state = 542;
                this.typeExpr();
                }
            }

            this.state = 545;
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
        this.enterRule(localContext, 50, Stage7Parser.RULE_fnSignatureTyped);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 547;
            this.match(Stage7Parser.LPAREN);
            this.state = 558;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2) {
                {
                this.state = 548;
                this.typedParam();
                this.state = 555;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 2 || _la === 4) {
                    {
                    {
                    this.state = 550;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    if (_la === 4) {
                        {
                        this.state = 549;
                        this.match(Stage7Parser.COMMA);
                        }
                    }

                    this.state = 552;
                    this.typedParam();
                    }
                    }
                    this.state = 557;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
            }

            this.state = 560;
            this.match(Stage7Parser.RPAREN);
            this.state = 566;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 37, this.context) ) {
            case 1:
                {
                this.state = 561;
                this.match(Stage7Parser.LPAREN);
                this.state = 562;
                this.match(Stage7Parser.RETURNS);
                this.state = 563;
                this.typeExpr();
                this.state = 564;
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
        this.enterRule(localContext, 52, Stage7Parser.RULE_statement);
        try {
            this.state = 587;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 38, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 568;
                this.letStar();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 569;
                this.letStmt();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 570;
                this.constStar();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 571;
                this.constStmt();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 572;
                this.ifForm();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 573;
                this.whileForm();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 574;
                this.block();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 575;
                this.returnForm();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 576;
                this.throwForm();
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 577;
                this.importForm();
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 578;
                this.importTypeForm();
                }
                break;
            case 12:
                this.enterOuterAlt(localContext, 12);
                {
                this.state = 579;
                this.exportForm();
                }
                break;
            case 13:
                this.enterOuterAlt(localContext, 13);
                {
                this.state = 580;
                this.switchForm();
                }
                break;
            case 14:
                this.enterOuterAlt(localContext, 14);
                {
                this.state = 581;
                this.forForm();
                }
                break;
            case 15:
                this.enterOuterAlt(localContext, 15);
                {
                this.state = 582;
                this.forInForm();
                }
                break;
            case 16:
                this.enterOuterAlt(localContext, 16);
                {
                this.state = 583;
                this.forOfForm();
                }
                break;
            case 17:
                this.enterOuterAlt(localContext, 17);
                {
                this.state = 584;
                this.forAwaitForm();
                }
                break;
            case 18:
                this.enterOuterAlt(localContext, 18);
                {
                this.state = 585;
                this.assign();
                }
                break;
            case 19:
                this.enterOuterAlt(localContext, 19);
                {
                this.state = 586;
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
        this.enterRule(localContext, 54, Stage7Parser.RULE_letStar);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 589;
            this.match(Stage7Parser.LPAREN);
            this.state = 590;
            this.match(Stage7Parser.LETSTAR);
            this.state = 591;
            this.match(Stage7Parser.LPAREN);
            this.state = 595;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 592;
                this.starBinding();
                }
                }
                this.state = 597;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 598;
            this.match(Stage7Parser.RPAREN);
            this.state = 602;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 52)) & ~0x1F) === 0 && ((1 << (_la - 52)) & 939524099) !== 0) || ((((_la - 103)) & ~0x1F) === 0 && ((1 << (_la - 103)) & 23) !== 0)) {
                {
                {
                this.state = 599;
                this.statement();
                }
                }
                this.state = 604;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 605;
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
        this.enterRule(localContext, 56, Stage7Parser.RULE_letStmt);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 607;
            this.match(Stage7Parser.LPAREN);
            this.state = 608;
            this.match(Stage7Parser.LET);
            this.state = 609;
            this.singleBinding();
            this.state = 610;
            this.expression();
            this.state = 611;
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
        this.enterRule(localContext, 58, Stage7Parser.RULE_constStar);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 613;
            this.match(Stage7Parser.LPAREN);
            this.state = 614;
            this.match(Stage7Parser.CONSTSTAR);
            this.state = 615;
            this.match(Stage7Parser.LPAREN);
            this.state = 619;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 616;
                this.starBinding();
                }
                }
                this.state = 621;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 622;
            this.match(Stage7Parser.RPAREN);
            this.state = 626;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 52)) & ~0x1F) === 0 && ((1 << (_la - 52)) & 939524099) !== 0) || ((((_la - 103)) & ~0x1F) === 0 && ((1 << (_la - 103)) & 23) !== 0)) {
                {
                {
                this.state = 623;
                this.statement();
                }
                }
                this.state = 628;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
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
    public constStmt(): ConstStmtContext {
        let localContext = new ConstStmtContext(this.context, this.state);
        this.enterRule(localContext, 60, Stage7Parser.RULE_constStmt);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 631;
            this.match(Stage7Parser.LPAREN);
            this.state = 632;
            this.match(Stage7Parser.CONST);
            this.state = 633;
            this.singleBinding();
            this.state = 634;
            this.expression();
            this.state = 635;
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
        this.enterRule(localContext, 62, Stage7Parser.RULE_ifForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 637;
            this.match(Stage7Parser.LPAREN);
            this.state = 638;
            this.match(Stage7Parser.IF);
            this.state = 639;
            this.expression();
            this.state = 640;
            this.statement();
            this.state = 642;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2 || ((((_la - 52)) & ~0x1F) === 0 && ((1 << (_la - 52)) & 939524099) !== 0) || ((((_la - 103)) & ~0x1F) === 0 && ((1 << (_la - 103)) & 23) !== 0)) {
                {
                this.state = 641;
                this.statement();
                }
            }

            this.state = 644;
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
        this.enterRule(localContext, 64, Stage7Parser.RULE_whileForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 646;
            this.match(Stage7Parser.LPAREN);
            this.state = 647;
            this.match(Stage7Parser.WHILE);
            this.state = 648;
            this.expression();
            this.state = 652;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 52)) & ~0x1F) === 0 && ((1 << (_la - 52)) & 939524099) !== 0) || ((((_la - 103)) & ~0x1F) === 0 && ((1 << (_la - 103)) & 23) !== 0)) {
                {
                {
                this.state = 649;
                this.statement();
                }
                }
                this.state = 654;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 655;
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
        this.enterRule(localContext, 66, Stage7Parser.RULE_block);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 657;
            this.match(Stage7Parser.LPAREN);
            this.state = 658;
            this.match(Stage7Parser.BEGIN);
            this.state = 662;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 52)) & ~0x1F) === 0 && ((1 << (_la - 52)) & 939524099) !== 0) || ((((_la - 103)) & ~0x1F) === 0 && ((1 << (_la - 103)) & 23) !== 0)) {
                {
                {
                this.state = 659;
                this.statement();
                }
                }
                this.state = 664;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 665;
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
        this.enterRule(localContext, 68, Stage7Parser.RULE_returnForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 667;
            this.match(Stage7Parser.LPAREN);
            this.state = 668;
            this.match(Stage7Parser.RETURN);
            this.state = 670;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2 || ((((_la - 52)) & ~0x1F) === 0 && ((1 << (_la - 52)) & 939524099) !== 0) || ((((_la - 103)) & ~0x1F) === 0 && ((1 << (_la - 103)) & 23) !== 0)) {
                {
                this.state = 669;
                this.expression();
                }
            }

            this.state = 672;
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
        this.enterRule(localContext, 70, Stage7Parser.RULE_throwForm);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 674;
            this.match(Stage7Parser.LPAREN);
            this.state = 675;
            this.match(Stage7Parser.THROW);
            this.state = 676;
            this.expression();
            this.state = 677;
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
        this.enterRule(localContext, 72, Stage7Parser.RULE_importForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 679;
            this.match(Stage7Parser.LPAREN);
            this.state = 680;
            this.match(Stage7Parser.IMPORT);
            this.state = 682;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2) {
                {
                this.state = 681;
                this.objectExpr();
                }
            }

            this.state = 684;
            this.match(Stage7Parser.STRING);
            this.state = 685;
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
        this.enterRule(localContext, 74, Stage7Parser.RULE_importTypeForm);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 687;
            this.match(Stage7Parser.LPAREN);
            this.state = 688;
            this.match(Stage7Parser.IMPORT_TYPE);
            this.state = 689;
            this.importTypeSpec();
            this.state = 690;
            this.match(Stage7Parser.STRING);
            this.state = 691;
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
        this.enterRule(localContext, 76, Stage7Parser.RULE_importTypeSpec);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 693;
            this.match(Stage7Parser.LPAREN);
            this.state = 694;
            this.match(Stage7Parser.IDENTIFIER);
            this.state = 696;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 695;
                this.importTypeName();
                }
                }
                this.state = 698;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 107);
            this.state = 700;
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
        this.enterRule(localContext, 78, Stage7Parser.RULE_importTypeName);
        try {
            this.state = 707;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case Stage7Parser.IDENTIFIER:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 702;
                this.match(Stage7Parser.IDENTIFIER);
                }
                break;
            case Stage7Parser.LPAREN:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 703;
                this.match(Stage7Parser.LPAREN);
                this.state = 704;
                this.match(Stage7Parser.IDENTIFIER);
                this.state = 705;
                this.match(Stage7Parser.IDENTIFIER);
                this.state = 706;
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
        this.enterRule(localContext, 80, Stage7Parser.RULE_exportForm);
        try {
            this.state = 718;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 50, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 709;
                this.exportBinding();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 710;
                this.exportDefault();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 711;
                this.exportNamed();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 712;
                this.exportNsFromForm();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 713;
                this.exportFrom();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 714;
                this.exportAllFrom();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 715;
                this.exportTypeForm();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 716;
                this.exportTypeFromForm();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 717;
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
        this.enterRule(localContext, 82, Stage7Parser.RULE_exportBinding);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 720;
            this.match(Stage7Parser.LPAREN);
            this.state = 721;
            this.match(Stage7Parser.EXPORT);
            this.state = 722;
            this.match(Stage7Parser.IDENTIFIER);
            this.state = 723;
            this.expression();
            this.state = 724;
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
        this.enterRule(localContext, 84, Stage7Parser.RULE_exportDefault);
        try {
            this.state = 751;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 51, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 726;
                this.match(Stage7Parser.LPAREN);
                this.state = 727;
                this.match(Stage7Parser.EXPORT_DEFAULT);
                this.state = 728;
                this.classDef();
                this.state = 729;
                this.match(Stage7Parser.RPAREN);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 731;
                this.match(Stage7Parser.LPAREN);
                this.state = 732;
                this.match(Stage7Parser.EXPORT_DEFAULT);
                this.state = 733;
                this.anonClassDef();
                this.state = 734;
                this.match(Stage7Parser.RPAREN);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 736;
                this.match(Stage7Parser.LPAREN);
                this.state = 737;
                this.match(Stage7Parser.EXPORT_DEFAULT);
                this.state = 738;
                this.topLevelLet();
                this.state = 739;
                this.match(Stage7Parser.RPAREN);
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 741;
                this.match(Stage7Parser.LPAREN);
                this.state = 742;
                this.match(Stage7Parser.EXPORT_DEFAULT);
                this.state = 743;
                this.topLevelConst();
                this.state = 744;
                this.match(Stage7Parser.RPAREN);
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 746;
                this.match(Stage7Parser.LPAREN);
                this.state = 747;
                this.match(Stage7Parser.EXPORT_DEFAULT);
                this.state = 748;
                this.expression();
                this.state = 749;
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
        this.enterRule(localContext, 86, Stage7Parser.RULE_exportNamed);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 753;
            this.match(Stage7Parser.LPAREN);
            this.state = 754;
            this.match(Stage7Parser.EXPORT_NAMED);
            this.state = 756;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 755;
                this.exportNamePair();
                }
                }
                this.state = 758;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2);
            this.state = 760;
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
        this.enterRule(localContext, 88, Stage7Parser.RULE_exportNamePair);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 762;
            this.match(Stage7Parser.LPAREN);
            this.state = 763;
            this.match(Stage7Parser.IDENTIFIER);
            this.state = 765;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 107) {
                {
                this.state = 764;
                this.match(Stage7Parser.IDENTIFIER);
                }
            }

            this.state = 767;
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
        this.enterRule(localContext, 90, Stage7Parser.RULE_exportFrom);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 769;
            this.match(Stage7Parser.LPAREN);
            this.state = 770;
            this.match(Stage7Parser.EXPORT_FROM);
            this.state = 771;
            this.match(Stage7Parser.STRING);
            this.state = 773;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 772;
                this.exportNamePair();
                }
                }
                this.state = 775;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2);
            this.state = 777;
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
        this.enterRule(localContext, 92, Stage7Parser.RULE_exportAllFrom);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 779;
            this.match(Stage7Parser.LPAREN);
            this.state = 780;
            this.match(Stage7Parser.EXPORT_ALL_FROM);
            this.state = 781;
            this.match(Stage7Parser.STRING);
            this.state = 782;
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
        this.enterRule(localContext, 94, Stage7Parser.RULE_exportNsFromForm);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 784;
            this.match(Stage7Parser.LPAREN);
            this.state = 785;
            this.match(Stage7Parser.EXPORT_NS_FROM);
            this.state = 786;
            this.match(Stage7Parser.STRING);
            this.state = 787;
            this.match(Stage7Parser.STRING);
            this.state = 788;
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
        this.enterRule(localContext, 96, Stage7Parser.RULE_exportTypeForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 790;
            this.match(Stage7Parser.LPAREN);
            this.state = 791;
            this.match(Stage7Parser.EXPORT_TYPE);
            this.state = 793;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 792;
                this.exportNamePair();
                }
                }
                this.state = 795;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2);
            this.state = 797;
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
        this.enterRule(localContext, 98, Stage7Parser.RULE_exportTypeFromForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 799;
            this.match(Stage7Parser.LPAREN);
            this.state = 800;
            this.match(Stage7Parser.EXPORT_TYPE_FROM);
            this.state = 801;
            this.match(Stage7Parser.STRING);
            this.state = 803;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 802;
                this.exportNamePair();
                }
                }
                this.state = 805;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2);
            this.state = 807;
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
        this.enterRule(localContext, 100, Stage7Parser.RULE_exportTypeAllFromForm);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 809;
            this.match(Stage7Parser.LPAREN);
            this.state = 810;
            this.match(Stage7Parser.EXPORT_TYPE_ALL_FROM);
            this.state = 811;
            this.match(Stage7Parser.STRING);
            this.state = 812;
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
        this.enterRule(localContext, 102, Stage7Parser.RULE_exportDeclForm);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 814;
            this.match(Stage7Parser.LPAREN);
            this.state = 815;
            this.match(Stage7Parser.EXPORT);
            this.state = 816;
            this.decl();
            this.state = 817;
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
        this.enterRule(localContext, 104, Stage7Parser.RULE_starBinding);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 819;
            this.match(Stage7Parser.LPAREN);
            this.state = 820;
            this.match(Stage7Parser.IDENTIFIER);
            this.state = 823;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 82) {
                {
                this.state = 821;
                this.match(Stage7Parser.COLON);
                this.state = 822;
                this.typeExpr();
                }
            }

            this.state = 825;
            this.expression();
            this.state = 826;
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
        this.enterRule(localContext, 106, Stage7Parser.RULE_singleBinding);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 828;
            this.match(Stage7Parser.LPAREN);
            this.state = 829;
            this.match(Stage7Parser.IDENTIFIER);
            this.state = 832;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 82) {
                {
                this.state = 830;
                this.match(Stage7Parser.COLON);
                this.state = 831;
                this.typeExpr();
                }
            }

            this.state = 834;
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
        this.enterRule(localContext, 108, Stage7Parser.RULE_typeExpr);
        try {
            this.state = 852;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 59, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 836;
                this.match(Stage7Parser.IDENTIFIER);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 837;
                this.typeUnion();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 838;
                this.typeIntersection();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 839;
                this.typeArray();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 840;
                this.typeTuple();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 841;
                this.typeFunction();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 842;
                this.typeObject();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 843;
                this.typeLiteral();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 844;
                this.typeKeyof();
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 845;
                this.typeTypeof();
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 846;
                this.typeIndexAccess();
                }
                break;
            case 12:
                this.enterOuterAlt(localContext, 12);
                {
                this.state = 847;
                this.typeConditional();
                }
                break;
            case 13:
                this.enterOuterAlt(localContext, 13);
                {
                this.state = 848;
                this.typeInfer();
                }
                break;
            case 14:
                this.enterOuterAlt(localContext, 14);
                {
                this.state = 849;
                this.typeMapped();
                }
                break;
            case 15:
                this.enterOuterAlt(localContext, 15);
                {
                this.state = 850;
                this.typeTemplateLiteral();
                }
                break;
            case 16:
                this.enterOuterAlt(localContext, 16);
                {
                this.state = 851;
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
        this.enterRule(localContext, 110, Stage7Parser.RULE_typeUnion);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 854;
            this.match(Stage7Parser.LPAREN);
            this.state = 855;
            this.match(Stage7Parser.UNION);
            this.state = 856;
            this.typeExpr();
            this.state = 858;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 857;
                this.typeExpr();
                }
                }
                this.state = 860;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 107);
            this.state = 862;
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
        this.enterRule(localContext, 112, Stage7Parser.RULE_typeIntersection);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 864;
            this.match(Stage7Parser.LPAREN);
            this.state = 865;
            this.match(Stage7Parser.INTERSECT);
            this.state = 866;
            this.typeExpr();
            this.state = 868;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 867;
                this.typeExpr();
                }
                }
                this.state = 870;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 107);
            this.state = 872;
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
        this.enterRule(localContext, 114, Stage7Parser.RULE_typeArray);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 874;
            this.match(Stage7Parser.LPAREN);
            this.state = 875;
            this.match(Stage7Parser.TYPE_ARRAY);
            this.state = 876;
            this.typeExpr();
            this.state = 877;
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
        this.enterRule(localContext, 116, Stage7Parser.RULE_typeTuple);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 879;
            this.match(Stage7Parser.LPAREN);
            this.state = 880;
            this.match(Stage7Parser.TUPLE);
            this.state = 882;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 881;
                this.typeTupleElement();
                }
                }
                this.state = 884;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 107);
            this.state = 886;
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
        this.enterRule(localContext, 118, Stage7Parser.RULE_typeTupleElement);
        try {
            this.state = 899;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 63, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 888;
                this.match(Stage7Parser.LPAREN);
                this.state = 889;
                this.match(Stage7Parser.REST);
                this.state = 890;
                this.typeExpr();
                this.state = 891;
                this.match(Stage7Parser.RPAREN);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 893;
                this.match(Stage7Parser.LPAREN);
                this.state = 894;
                this.match(Stage7Parser.IDENTIFIER);
                this.state = 895;
                this.typeExpr();
                this.state = 896;
                this.match(Stage7Parser.RPAREN);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 898;
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
        this.enterRule(localContext, 120, Stage7Parser.RULE_typeFunction);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 901;
            this.match(Stage7Parser.LPAREN);
            this.state = 902;
            this.match(Stage7Parser.TYPEFN);
            this.state = 904;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 64, this.context) ) {
            case 1:
                {
                this.state = 903;
                this.typeParams();
                }
                break;
            }
            this.state = 906;
            this.match(Stage7Parser.LPAREN);
            this.state = 910;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 907;
                this.typeFnParam();
                }
                }
                this.state = 912;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 913;
            this.match(Stage7Parser.RPAREN);
            this.state = 914;
            this.typeExpr();
            this.state = 915;
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
        this.enterRule(localContext, 122, Stage7Parser.RULE_typeFnParam);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 917;
            this.match(Stage7Parser.LPAREN);
            this.state = 918;
            this.match(Stage7Parser.IDENTIFIER);
            this.state = 920;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 78) {
                {
                this.state = 919;
                this.match(Stage7Parser.OPTIONAL);
                }
            }

            this.state = 922;
            this.typeExpr();
            this.state = 923;
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
        this.enterRule(localContext, 124, Stage7Parser.RULE_typeObject);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 925;
            this.match(Stage7Parser.LPAREN);
            this.state = 926;
            this.match(Stage7Parser.IDENTIFIER);
            this.state = 930;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 927;
                this.typeProp();
                }
                }
                this.state = 932;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 933;
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
        this.enterRule(localContext, 126, Stage7Parser.RULE_typeProp);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 935;
            this.match(Stage7Parser.LPAREN);
            this.state = 939;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 70) {
                {
                {
                this.state = 936;
                this.propModifier();
                }
                }
                this.state = 941;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 942;
            this.match(Stage7Parser.IDENTIFIER);
            this.state = 944;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 78) {
                {
                this.state = 943;
                this.match(Stage7Parser.OPTIONAL);
                }
            }

            this.state = 946;
            this.typeExpr();
            this.state = 947;
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
        this.enterRule(localContext, 128, Stage7Parser.RULE_propModifier);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 949;
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
        this.enterRule(localContext, 130, Stage7Parser.RULE_typeLiteral);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 951;
            this.match(Stage7Parser.LPAREN);
            this.state = 952;
            this.match(Stage7Parser.LIT);
            this.state = 953;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 79)) & ~0x1F) === 0 && ((1 << (_la - 79)) & 100663297) !== 0))) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 954;
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
        this.enterRule(localContext, 132, Stage7Parser.RULE_typeKeyof);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 956;
            this.match(Stage7Parser.LPAREN);
            this.state = 957;
            this.match(Stage7Parser.KEYOF);
            this.state = 958;
            this.typeExpr();
            this.state = 959;
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
        this.enterRule(localContext, 134, Stage7Parser.RULE_typeTypeof);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 961;
            this.match(Stage7Parser.LPAREN);
            this.state = 962;
            this.match(Stage7Parser.TYPEOF);
            this.state = 963;
            this.match(Stage7Parser.IDENTIFIER);
            this.state = 964;
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
        this.enterRule(localContext, 136, Stage7Parser.RULE_typeIndexAccess);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 966;
            this.match(Stage7Parser.LPAREN);
            this.state = 967;
            this.match(Stage7Parser.INDEX);
            this.state = 968;
            this.typeExpr();
            this.state = 969;
            this.typeExpr();
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
    public typeConditional(): TypeConditionalContext {
        let localContext = new TypeConditionalContext(this.context, this.state);
        this.enterRule(localContext, 138, Stage7Parser.RULE_typeConditional);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 972;
            this.match(Stage7Parser.LPAREN);
            this.state = 973;
            this.match(Stage7Parser.COND);
            this.state = 974;
            this.typeExpr();
            this.state = 975;
            this.typeExpr();
            this.state = 976;
            this.typeExpr();
            this.state = 977;
            this.typeExpr();
            this.state = 978;
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
        this.enterRule(localContext, 140, Stage7Parser.RULE_typeInfer);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 980;
            this.match(Stage7Parser.LPAREN);
            this.state = 981;
            this.match(Stage7Parser.INFER);
            this.state = 982;
            this.match(Stage7Parser.IDENTIFIER);
            this.state = 983;
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
        this.enterRule(localContext, 142, Stage7Parser.RULE_typeMapped);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 985;
            this.match(Stage7Parser.LPAREN);
            this.state = 986;
            this.match(Stage7Parser.MAPPED);
            this.state = 987;
            this.match(Stage7Parser.IDENTIFIER);
            this.state = 988;
            this.typeExpr();
            this.state = 990;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 70, this.context) ) {
            case 1:
                {
                this.state = 989;
                this.mappedModifiers();
                }
                break;
            }
            this.state = 992;
            this.typeExpr();
            this.state = 993;
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
        this.enterRule(localContext, 144, Stage7Parser.RULE_mappedModifiers);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 995;
            this.match(Stage7Parser.LPAREN);
            this.state = 996;
            this.match(Stage7Parser.MODIFIERS);
            this.state = 998;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 997;
                this.mappedModifier();
                }
                }
                this.state = 1000;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 70 || _la === 78);
            this.state = 1002;
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
        this.enterRule(localContext, 146, Stage7Parser.RULE_mappedModifier);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1004;
            _la = this.tokenStream.LA(1);
            if(!(_la === 70 || _la === 78)) {
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
        this.enterRule(localContext, 148, Stage7Parser.RULE_typeTemplateLiteral);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1006;
            this.match(Stage7Parser.LPAREN);
            this.state = 1007;
            this.match(Stage7Parser.TYPE_TEMPLATE);
            this.state = 1009;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 1008;
                this.templatePart();
                }
                }
                this.state = 1011;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 105 || _la === 107);
            this.state = 1013;
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
        this.enterRule(localContext, 150, Stage7Parser.RULE_templatePart);
        try {
            this.state = 1017;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case Stage7Parser.STRING:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1015;
                this.match(Stage7Parser.STRING);
                }
                break;
            case Stage7Parser.LPAREN:
            case Stage7Parser.IDENTIFIER:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1016;
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
        this.enterRule(localContext, 152, Stage7Parser.RULE_typeApplication);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1019;
            this.match(Stage7Parser.LPAREN);
            this.state = 1020;
            this.typeExpr();
            this.state = 1022;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 1021;
                this.typeExpr();
                }
                }
                this.state = 1024;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 107);
            this.state = 1026;
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
        this.enterRule(localContext, 154, Stage7Parser.RULE_typeParams);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1028;
            this.match(Stage7Parser.LPAREN);
            this.state = 1029;
            this.match(Stage7Parser.TYPE_PARAMS);
            this.state = 1031;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 1030;
                this.typeParamDecl();
                }
                }
                this.state = 1033;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 107);
            this.state = 1035;
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
        this.enterRule(localContext, 156, Stage7Parser.RULE_typeParamDecl);
        let _la: number;
        try {
            this.state = 1047;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case Stage7Parser.IDENTIFIER:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1037;
                this.match(Stage7Parser.IDENTIFIER);
                }
                break;
            case Stage7Parser.LPAREN:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1038;
                this.match(Stage7Parser.LPAREN);
                this.state = 1039;
                this.match(Stage7Parser.IDENTIFIER);
                this.state = 1041;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 76, this.context) ) {
                case 1:
                    {
                    this.state = 1040;
                    this.typeParamConstraint();
                    }
                    break;
                }
                this.state = 1044;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 2) {
                    {
                    this.state = 1043;
                    this.typeParamDefault();
                    }
                }

                this.state = 1046;
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
        this.enterRule(localContext, 158, Stage7Parser.RULE_typeParamConstraint);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1049;
            this.match(Stage7Parser.LPAREN);
            this.state = 1050;
            this.match(Stage7Parser.EXTENDS);
            this.state = 1051;
            this.typeExpr();
            this.state = 1052;
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
        this.enterRule(localContext, 160, Stage7Parser.RULE_typeParamDefault);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1054;
            this.match(Stage7Parser.LPAREN);
            this.state = 1055;
            this.match(Stage7Parser.DEFAULT);
            this.state = 1056;
            this.typeExpr();
            this.state = 1057;
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
        this.enterRule(localContext, 162, Stage7Parser.RULE_assign);
        try {
            this.state = 1071;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 79, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1059;
                this.match(Stage7Parser.LPAREN);
                this.state = 1060;
                this.match(Stage7Parser.SET);
                this.state = 1061;
                this.match(Stage7Parser.IDENTIFIER);
                this.state = 1062;
                this.expression();
                this.state = 1063;
                this.match(Stage7Parser.RPAREN);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1065;
                this.match(Stage7Parser.LPAREN);
                this.state = 1066;
                this.match(Stage7Parser.SET);
                this.state = 1067;
                this.propAccess();
                this.state = 1068;
                this.expression();
                this.state = 1069;
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
        this.enterRule(localContext, 164, Stage7Parser.RULE_switchForm);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1073;
            this.match(Stage7Parser.LPAREN);
            this.state = 1074;
            this.match(Stage7Parser.SWITCH);
            this.state = 1075;
            this.expression();
            this.state = 1079;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 80, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 1076;
                    this.caseClause();
                    }
                    }
                }
                this.state = 1081;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 80, this.context);
            }
            this.state = 1083;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2) {
                {
                this.state = 1082;
                this.defaultClause();
                }
            }

            this.state = 1085;
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
        this.enterRule(localContext, 166, Stage7Parser.RULE_caseClause);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1087;
            this.match(Stage7Parser.LPAREN);
            this.state = 1088;
            this.match(Stage7Parser.CASE);
            this.state = 1089;
            this.expression();
            this.state = 1093;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 52)) & ~0x1F) === 0 && ((1 << (_la - 52)) & 939524099) !== 0) || ((((_la - 103)) & ~0x1F) === 0 && ((1 << (_la - 103)) & 23) !== 0)) {
                {
                {
                this.state = 1090;
                this.statement();
                }
                }
                this.state = 1095;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1096;
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
        this.enterRule(localContext, 168, Stage7Parser.RULE_defaultClause);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1098;
            this.match(Stage7Parser.LPAREN);
            this.state = 1099;
            this.match(Stage7Parser.DEFAULT);
            this.state = 1103;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 52)) & ~0x1F) === 0 && ((1 << (_la - 52)) & 939524099) !== 0) || ((((_la - 103)) & ~0x1F) === 0 && ((1 << (_la - 103)) & 23) !== 0)) {
                {
                {
                this.state = 1100;
                this.statement();
                }
                }
                this.state = 1105;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1106;
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
        this.enterRule(localContext, 170, Stage7Parser.RULE_forForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1108;
            this.match(Stage7Parser.LPAREN);
            this.state = 1109;
            this.match(Stage7Parser.FOR);
            this.state = 1110;
            this.letStmt();
            this.state = 1111;
            this.expression();
            this.state = 1112;
            this.assign();
            this.state = 1116;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 52)) & ~0x1F) === 0 && ((1 << (_la - 52)) & 939524099) !== 0) || ((((_la - 103)) & ~0x1F) === 0 && ((1 << (_la - 103)) & 23) !== 0)) {
                {
                {
                this.state = 1113;
                this.statement();
                }
                }
                this.state = 1118;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1119;
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
        this.enterRule(localContext, 172, Stage7Parser.RULE_forInForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1121;
            this.match(Stage7Parser.LPAREN);
            this.state = 1122;
            this.match(Stage7Parser.FORIN);
            this.state = 1123;
            this.match(Stage7Parser.IDENTIFIER);
            this.state = 1124;
            this.expression();
            this.state = 1128;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 52)) & ~0x1F) === 0 && ((1 << (_la - 52)) & 939524099) !== 0) || ((((_la - 103)) & ~0x1F) === 0 && ((1 << (_la - 103)) & 23) !== 0)) {
                {
                {
                this.state = 1125;
                this.statement();
                }
                }
                this.state = 1130;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1131;
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
        this.enterRule(localContext, 174, Stage7Parser.RULE_forOfForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1133;
            this.match(Stage7Parser.LPAREN);
            this.state = 1134;
            this.match(Stage7Parser.FOROF);
            this.state = 1135;
            this.match(Stage7Parser.IDENTIFIER);
            this.state = 1136;
            this.expression();
            this.state = 1140;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 52)) & ~0x1F) === 0 && ((1 << (_la - 52)) & 939524099) !== 0) || ((((_la - 103)) & ~0x1F) === 0 && ((1 << (_la - 103)) & 23) !== 0)) {
                {
                {
                this.state = 1137;
                this.statement();
                }
                }
                this.state = 1142;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1143;
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
        this.enterRule(localContext, 176, Stage7Parser.RULE_forAwaitForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1145;
            this.match(Stage7Parser.LPAREN);
            this.state = 1146;
            this.match(Stage7Parser.FORAWAIT);
            this.state = 1147;
            this.match(Stage7Parser.IDENTIFIER);
            this.state = 1148;
            this.expression();
            this.state = 1152;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 52)) & ~0x1F) === 0 && ((1 << (_la - 52)) & 939524099) !== 0) || ((((_la - 103)) & ~0x1F) === 0 && ((1 << (_la - 103)) & 23) !== 0)) {
                {
                {
                this.state = 1149;
                this.statement();
                }
                }
                this.state = 1154;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1155;
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
        this.enterRule(localContext, 178, Stage7Parser.RULE_expression);
        try {
            this.state = 1192;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 88, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1157;
                this.literal();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1158;
                this.match(Stage7Parser.KEYWORD);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 1159;
                this.match(Stage7Parser.IDENTIFIER);
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 1160;
                this.lambda();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 1161;
                this.fn();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 1162;
                this.asyncLambda();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 1163;
                this.asyncFn();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 1164;
                this.generatorFn();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 1165;
                this.asyncGeneratorFn();
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 1166;
                this.awaitExpr();
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 1167;
                this.yieldExpr();
                }
                break;
            case 12:
                this.enterOuterAlt(localContext, 12);
                {
                this.state = 1168;
                this.yieldStarExpr();
                }
                break;
            case 13:
                this.enterOuterAlt(localContext, 13);
                {
                this.state = 1169;
                this.bindExpr();
                }
                break;
            case 14:
                this.enterOuterAlt(localContext, 14);
                {
                this.state = 1170;
                this.methodCallExpr();
                }
                break;
            case 15:
                this.enterOuterAlt(localContext, 15);
                {
                this.state = 1171;
                this.objectExpr();
                }
                break;
            case 16:
                this.enterOuterAlt(localContext, 16);
                {
                this.state = 1172;
                this.arrayExpr();
                }
                break;
            case 17:
                this.enterOuterAlt(localContext, 17);
                {
                this.state = 1173;
                this.propAccess();
                }
                break;
            case 18:
                this.enterOuterAlt(localContext, 18);
                {
                this.state = 1174;
                this.indexAccess();
                }
                break;
            case 19:
                this.enterOuterAlt(localContext, 19);
                {
                this.state = 1175;
                this.quasiquote();
                }
                break;
            case 20:
                this.enterOuterAlt(localContext, 20);
                {
                this.state = 1176;
                this.unquote();
                }
                break;
            case 21:
                this.enterOuterAlt(localContext, 21);
                {
                this.state = 1177;
                this.unquoteSplicing();
                }
                break;
            case 22:
                this.enterOuterAlt(localContext, 22);
                {
                this.state = 1178;
                this.ternary();
                }
                break;
            case 23:
                this.enterOuterAlt(localContext, 23);
                {
                this.state = 1179;
                this.condExpr();
                }
                break;
            case 24:
                this.enterOuterAlt(localContext, 24);
                {
                this.state = 1180;
                this.newForm();
                }
                break;
            case 25:
                this.enterOuterAlt(localContext, 25);
                {
                this.state = 1181;
                this.optChain();
                }
                break;
            case 26:
                this.enterOuterAlt(localContext, 26);
                {
                this.state = 1182;
                this.optChainIndex();
                }
                break;
            case 27:
                this.enterOuterAlt(localContext, 27);
                {
                this.state = 1183;
                this.nullCoalesce();
                }
                break;
            case 28:
                this.enterOuterAlt(localContext, 28);
                {
                this.state = 1184;
                this.typeofExpr();
                }
                break;
            case 29:
                this.enterOuterAlt(localContext, 29);
                {
                this.state = 1185;
                this.typeAssert();
                }
                break;
            case 30:
                this.enterOuterAlt(localContext, 30);
                {
                this.state = 1186;
                this.templateExpr();
                }
                break;
            case 31:
                this.enterOuterAlt(localContext, 31);
                {
                this.state = 1187;
                this.thisExpr();
                }
                break;
            case 32:
                this.enterOuterAlt(localContext, 32);
                {
                this.state = 1188;
                this.superExpr();
                }
                break;
            case 33:
                this.enterOuterAlt(localContext, 33);
                {
                this.state = 1189;
                this.superConstructorCall();
                }
                break;
            case 34:
                this.enterOuterAlt(localContext, 34);
                {
                this.state = 1190;
                this.superMethodCall();
                }
                break;
            case 35:
                this.enterOuterAlt(localContext, 35);
                {
                this.state = 1191;
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
        this.enterRule(localContext, 180, Stage7Parser.RULE_thisExpr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1194;
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
        this.enterRule(localContext, 182, Stage7Parser.RULE_superExpr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1196;
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
        this.enterRule(localContext, 184, Stage7Parser.RULE_superConstructorCall);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1198;
            this.match(Stage7Parser.LPAREN);
            this.state = 1199;
            this.match(Stage7Parser.SUPER);
            this.state = 1203;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 52)) & ~0x1F) === 0 && ((1 << (_la - 52)) & 939524099) !== 0) || ((((_la - 103)) & ~0x1F) === 0 && ((1 << (_la - 103)) & 23) !== 0)) {
                {
                {
                this.state = 1200;
                this.expression();
                }
                }
                this.state = 1205;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1206;
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
        this.enterRule(localContext, 186, Stage7Parser.RULE_superMethodCall);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1208;
            this.match(Stage7Parser.LPAREN);
            this.state = 1209;
            this.match(Stage7Parser.SUPER_METHOD);
            this.state = 1210;
            this.match(Stage7Parser.IDENTIFIER);
            this.state = 1214;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 52)) & ~0x1F) === 0 && ((1 << (_la - 52)) & 939524099) !== 0) || ((((_la - 103)) & ~0x1F) === 0 && ((1 << (_la - 103)) & 23) !== 0)) {
                {
                {
                this.state = 1211;
                this.expression();
                }
                }
                this.state = 1216;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1217;
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
        this.enterRule(localContext, 188, Stage7Parser.RULE_typeofExpr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1219;
            this.match(Stage7Parser.LPAREN);
            this.state = 1220;
            this.match(Stage7Parser.TYPEOF);
            this.state = 1221;
            this.expression();
            this.state = 1222;
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
        this.enterRule(localContext, 190, Stage7Parser.RULE_typeAssert);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1224;
            this.match(Stage7Parser.LPAREN);
            this.state = 1225;
            this.match(Stage7Parser.TYPE_AS);
            this.state = 1226;
            this.expression();
            this.state = 1227;
            this.typeExpr();
            this.state = 1228;
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
        this.enterRule(localContext, 192, Stage7Parser.RULE_lambda);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1230;
            this.match(Stage7Parser.LPAREN);
            this.state = 1231;
            this.match(Stage7Parser.LAMBDA);
            this.state = 1232;
            this.fnSignature();
            this.state = 1236;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 52)) & ~0x1F) === 0 && ((1 << (_la - 52)) & 939524099) !== 0) || ((((_la - 103)) & ~0x1F) === 0 && ((1 << (_la - 103)) & 23) !== 0)) {
                {
                {
                this.state = 1233;
                this.statement();
                }
                }
                this.state = 1238;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1239;
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
        this.enterRule(localContext, 194, Stage7Parser.RULE_fn);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1241;
            this.match(Stage7Parser.LPAREN);
            this.state = 1242;
            this.match(Stage7Parser.FN);
            this.state = 1243;
            this.fnSignature();
            this.state = 1247;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 52)) & ~0x1F) === 0 && ((1 << (_la - 52)) & 939524099) !== 0) || ((((_la - 103)) & ~0x1F) === 0 && ((1 << (_la - 103)) & 23) !== 0)) {
                {
                {
                this.state = 1244;
                this.statement();
                }
                }
                this.state = 1249;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1250;
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
        this.enterRule(localContext, 196, Stage7Parser.RULE_asyncLambda);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1252;
            this.match(Stage7Parser.LPAREN);
            this.state = 1253;
            this.match(Stage7Parser.ASYNC_LAMBDA);
            this.state = 1254;
            this.fnSignature();
            this.state = 1258;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 52)) & ~0x1F) === 0 && ((1 << (_la - 52)) & 939524099) !== 0) || ((((_la - 103)) & ~0x1F) === 0 && ((1 << (_la - 103)) & 23) !== 0)) {
                {
                {
                this.state = 1255;
                this.statement();
                }
                }
                this.state = 1260;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1261;
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
        this.enterRule(localContext, 198, Stage7Parser.RULE_asyncFn);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1263;
            this.match(Stage7Parser.LPAREN);
            this.state = 1264;
            this.match(Stage7Parser.ASYNC_FN);
            this.state = 1265;
            this.fnSignature();
            this.state = 1269;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 52)) & ~0x1F) === 0 && ((1 << (_la - 52)) & 939524099) !== 0) || ((((_la - 103)) & ~0x1F) === 0 && ((1 << (_la - 103)) & 23) !== 0)) {
                {
                {
                this.state = 1266;
                this.statement();
                }
                }
                this.state = 1271;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1272;
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
        this.enterRule(localContext, 200, Stage7Parser.RULE_generatorFn);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1274;
            this.match(Stage7Parser.LPAREN);
            this.state = 1275;
            this.match(Stage7Parser.GENERATOR_FN);
            this.state = 1276;
            this.fnSignature();
            this.state = 1280;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 52)) & ~0x1F) === 0 && ((1 << (_la - 52)) & 939524099) !== 0) || ((((_la - 103)) & ~0x1F) === 0 && ((1 << (_la - 103)) & 23) !== 0)) {
                {
                {
                this.state = 1277;
                this.statement();
                }
                }
                this.state = 1282;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1283;
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
        this.enterRule(localContext, 202, Stage7Parser.RULE_asyncGeneratorFn);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1285;
            this.match(Stage7Parser.LPAREN);
            this.state = 1286;
            this.match(Stage7Parser.ASYNC_GENERATOR_FN);
            this.state = 1287;
            this.fnSignature();
            this.state = 1291;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 52)) & ~0x1F) === 0 && ((1 << (_la - 52)) & 939524099) !== 0) || ((((_la - 103)) & ~0x1F) === 0 && ((1 << (_la - 103)) & 23) !== 0)) {
                {
                {
                this.state = 1288;
                this.statement();
                }
                }
                this.state = 1293;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1294;
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
        this.enterRule(localContext, 204, Stage7Parser.RULE_awaitExpr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1296;
            this.match(Stage7Parser.LPAREN);
            this.state = 1297;
            this.match(Stage7Parser.AWAIT);
            this.state = 1298;
            this.expression();
            this.state = 1299;
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
        this.enterRule(localContext, 206, Stage7Parser.RULE_yieldExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1301;
            this.match(Stage7Parser.LPAREN);
            this.state = 1302;
            this.match(Stage7Parser.YIELD);
            this.state = 1304;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2 || ((((_la - 52)) & ~0x1F) === 0 && ((1 << (_la - 52)) & 939524099) !== 0) || ((((_la - 103)) & ~0x1F) === 0 && ((1 << (_la - 103)) & 23) !== 0)) {
                {
                this.state = 1303;
                this.expression();
                }
            }

            this.state = 1306;
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
        this.enterRule(localContext, 208, Stage7Parser.RULE_yieldStarExpr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1308;
            this.match(Stage7Parser.LPAREN);
            this.state = 1309;
            this.match(Stage7Parser.YIELD_STAR);
            this.state = 1310;
            this.expression();
            this.state = 1311;
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
        this.enterRule(localContext, 210, Stage7Parser.RULE_bindExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1313;
            this.match(Stage7Parser.LPAREN);
            this.state = 1314;
            this.match(Stage7Parser.BIND);
            this.state = 1315;
            this.expression();
            this.state = 1316;
            this.expression();
            this.state = 1320;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 52)) & ~0x1F) === 0 && ((1 << (_la - 52)) & 939524099) !== 0) || ((((_la - 103)) & ~0x1F) === 0 && ((1 << (_la - 103)) & 23) !== 0)) {
                {
                {
                this.state = 1317;
                this.expression();
                }
                }
                this.state = 1322;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1323;
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
        this.enterRule(localContext, 212, Stage7Parser.RULE_methodCallExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1325;
            this.match(Stage7Parser.LPAREN);
            this.state = 1326;
            this.match(Stage7Parser.METHOD_CALL);
            this.state = 1327;
            this.expression();
            this.state = 1328;
            this.expression();
            this.state = 1332;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 52)) & ~0x1F) === 0 && ((1 << (_la - 52)) & 939524099) !== 0) || ((((_la - 103)) & ~0x1F) === 0 && ((1 << (_la - 103)) & 23) !== 0)) {
                {
                {
                this.state = 1329;
                this.expression();
                }
                }
                this.state = 1334;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1335;
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
        this.enterRule(localContext, 214, Stage7Parser.RULE_ternary);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1337;
            this.match(Stage7Parser.LPAREN);
            this.state = 1338;
            this.match(Stage7Parser.TERNARY);
            this.state = 1339;
            this.expression();
            this.state = 1340;
            this.expression();
            this.state = 1341;
            this.expression();
            this.state = 1342;
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
        this.enterRule(localContext, 216, Stage7Parser.RULE_condExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1344;
            this.match(Stage7Parser.LPAREN);
            this.state = 1345;
            this.match(Stage7Parser.COND);
            this.state = 1349;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 1346;
                this.expression();
                this.state = 1347;
                this.expression();
                }
                }
                this.state = 1351;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || ((((_la - 52)) & ~0x1F) === 0 && ((1 << (_la - 52)) & 939524099) !== 0) || ((((_la - 103)) & ~0x1F) === 0 && ((1 << (_la - 103)) & 23) !== 0));
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
    public newForm(): NewFormContext {
        let localContext = new NewFormContext(this.context, this.state);
        this.enterRule(localContext, 218, Stage7Parser.RULE_newForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1355;
            this.match(Stage7Parser.LPAREN);
            this.state = 1356;
            this.match(Stage7Parser.NEW);
            this.state = 1357;
            this.match(Stage7Parser.IDENTIFIER);
            this.state = 1359;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 101, this.context) ) {
            case 1:
                {
                this.state = 1358;
                this.typeArgs();
                }
                break;
            }
            this.state = 1364;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 52)) & ~0x1F) === 0 && ((1 << (_la - 52)) & 939524099) !== 0) || ((((_la - 103)) & ~0x1F) === 0 && ((1 << (_la - 103)) & 23) !== 0)) {
                {
                {
                this.state = 1361;
                this.expression();
                }
                }
                this.state = 1366;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1367;
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
        this.enterRule(localContext, 220, Stage7Parser.RULE_objectExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1369;
            this.match(Stage7Parser.LPAREN);
            this.state = 1370;
            this.match(Stage7Parser.OBJECT);
            this.state = 1374;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 1371;
                this.objectField();
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
    public objectField(): ObjectFieldContext {
        let localContext = new ObjectFieldContext(this.context, this.state);
        this.enterRule(localContext, 222, Stage7Parser.RULE_objectField);
        try {
            this.state = 1392;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 104, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1379;
                this.match(Stage7Parser.LPAREN);
                this.state = 1380;
                this.propKey();
                this.state = 1381;
                this.expression();
                this.state = 1382;
                this.match(Stage7Parser.RPAREN);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1384;
                this.match(Stage7Parser.LPAREN);
                this.state = 1385;
                this.propKey();
                this.state = 1386;
                this.methodDef();
                this.state = 1387;
                this.match(Stage7Parser.RPAREN);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 1389;
                this.match(Stage7Parser.LPAREN);
                this.state = 1390;
                this.match(Stage7Parser.IDENTIFIER);
                this.state = 1391;
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
        this.enterRule(localContext, 224, Stage7Parser.RULE_methodDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1394;
            this.match(Stage7Parser.LPAREN);
            this.state = 1395;
            this.match(Stage7Parser.METHOD);
            this.state = 1396;
            this.fnSignature();
            this.state = 1400;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 52)) & ~0x1F) === 0 && ((1 << (_la - 52)) & 939524099) !== 0) || ((((_la - 103)) & ~0x1F) === 0 && ((1 << (_la - 103)) & 23) !== 0)) {
                {
                {
                this.state = 1397;
                this.statement();
                }
                }
                this.state = 1402;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1403;
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
        this.enterRule(localContext, 226, Stage7Parser.RULE_arrayExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1405;
            this.match(Stage7Parser.LPAREN);
            this.state = 1406;
            this.match(Stage7Parser.ARRAY);
            this.state = 1410;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 52)) & ~0x1F) === 0 && ((1 << (_la - 52)) & 939524099) !== 0) || ((((_la - 103)) & ~0x1F) === 0 && ((1 << (_la - 103)) & 23) !== 0)) {
                {
                {
                this.state = 1407;
                this.expression();
                }
                }
                this.state = 1412;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1413;
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
        this.enterRule(localContext, 228, Stage7Parser.RULE_templateExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1415;
            this.match(Stage7Parser.LPAREN);
            this.state = 1416;
            this.match(Stage7Parser.TEMPLATE);
            this.state = 1419;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                this.state = 1419;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 107, this.context) ) {
                case 1:
                    {
                    this.state = 1417;
                    this.match(Stage7Parser.STRING);
                    }
                    break;
                case 2:
                    {
                    this.state = 1418;
                    this.expression();
                    }
                    break;
                }
                }
                this.state = 1421;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || ((((_la - 52)) & ~0x1F) === 0 && ((1 << (_la - 52)) & 939524099) !== 0) || ((((_la - 103)) & ~0x1F) === 0 && ((1 << (_la - 103)) & 23) !== 0));
            this.state = 1423;
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
        this.enterRule(localContext, 230, Stage7Parser.RULE_propKey);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1425;
            _la = this.tokenStream.LA(1);
            if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 2415919072) !== 0) || ((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & 4294967295) !== 0) || ((((_la - 65)) & ~0x1F) === 0 && ((1 << (_la - 65)) & 4093501439) !== 0) || ((((_la - 97)) & ~0x1F) === 0 && ((1 << (_la - 97)) & 1407) !== 0))) {
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
        this.enterRule(localContext, 232, Stage7Parser.RULE_propAccess);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1427;
            this.match(Stage7Parser.LPAREN);
            this.state = 1428;
            this.match(Stage7Parser.DOT);
            this.state = 1429;
            this.expression();
            this.state = 1430;
            this.propKey();
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
    public indexAccess(): IndexAccessContext {
        let localContext = new IndexAccessContext(this.context, this.state);
        this.enterRule(localContext, 234, Stage7Parser.RULE_indexAccess);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1433;
            this.match(Stage7Parser.LPAREN);
            this.state = 1434;
            this.match(Stage7Parser.INDEX);
            this.state = 1435;
            this.expression();
            this.state = 1436;
            this.expression();
            this.state = 1437;
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
        this.enterRule(localContext, 236, Stage7Parser.RULE_quasiquote);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1439;
            this.match(Stage7Parser.LPAREN);
            this.state = 1440;
            _la = this.tokenStream.LA(1);
            if(!(_la === 33 || _la === 34)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 1441;
            this.expression();
            this.state = 1442;
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
    public unquote(): UnquoteContext {
        let localContext = new UnquoteContext(this.context, this.state);
        this.enterRule(localContext, 238, Stage7Parser.RULE_unquote);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1444;
            this.match(Stage7Parser.LPAREN);
            this.state = 1445;
            this.match(Stage7Parser.UNQUOTE);
            this.state = 1446;
            this.expression();
            this.state = 1447;
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
        this.enterRule(localContext, 240, Stage7Parser.RULE_unquoteSplicing);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1449;
            this.match(Stage7Parser.LPAREN);
            this.state = 1450;
            this.match(Stage7Parser.UNQUOTE_SPLICING);
            this.state = 1451;
            this.expression();
            this.state = 1452;
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
        this.enterRule(localContext, 242, Stage7Parser.RULE_optChain);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1454;
            this.match(Stage7Parser.LPAREN);
            this.state = 1455;
            this.match(Stage7Parser.OPTCHAIN);
            this.state = 1456;
            this.expression();
            this.state = 1457;
            this.propKey();
            this.state = 1458;
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
        this.enterRule(localContext, 244, Stage7Parser.RULE_optChainIndex);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1460;
            this.match(Stage7Parser.LPAREN);
            this.state = 1461;
            this.match(Stage7Parser.OPTCHAIN_INDEX);
            this.state = 1462;
            this.expression();
            this.state = 1463;
            this.expression();
            this.state = 1464;
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
        this.enterRule(localContext, 246, Stage7Parser.RULE_nullCoalesce);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1466;
            this.match(Stage7Parser.LPAREN);
            this.state = 1467;
            this.match(Stage7Parser.NULLCOAL);
            this.state = 1468;
            this.expression();
            this.state = 1469;
            this.expression();
            this.state = 1470;
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
        this.enterRule(localContext, 248, Stage7Parser.RULE_call);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1472;
            this.match(Stage7Parser.LPAREN);
            this.state = 1473;
            this.expression();
            this.state = 1475;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 109, this.context) ) {
            case 1:
                {
                this.state = 1474;
                this.typeArgs();
                }
                break;
            }
            this.state = 1480;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 52)) & ~0x1F) === 0 && ((1 << (_la - 52)) & 939524099) !== 0) || ((((_la - 103)) & ~0x1F) === 0 && ((1 << (_la - 103)) & 23) !== 0)) {
                {
                {
                this.state = 1477;
                this.expression();
                }
                }
                this.state = 1482;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1483;
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
        this.enterRule(localContext, 250, Stage7Parser.RULE_typeArgs);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1485;
            this.match(Stage7Parser.LPAREN);
            this.state = 1486;
            this.match(Stage7Parser.TYPE_ARGS);
            this.state = 1488;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 1487;
                this.typeExpr();
                }
                }
                this.state = 1490;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 107);
            this.state = 1492;
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
        this.enterRule(localContext, 252, Stage7Parser.RULE_fnSignature);
        let _la: number;
        try {
            let alternative: number;
            this.state = 1525;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 119, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1494;
                this.match(Stage7Parser.LPAREN);
                this.state = 1511;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 2) {
                    {
                    this.state = 1495;
                    this.param();
                    this.state = 1502;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 113, this.context);
                    while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                        if (alternative === 1) {
                            {
                            {
                            this.state = 1497;
                            this.errorHandler.sync(this);
                            _la = this.tokenStream.LA(1);
                            if (_la === 4) {
                                {
                                this.state = 1496;
                                this.match(Stage7Parser.COMMA);
                                }
                            }

                            this.state = 1499;
                            this.param();
                            }
                            }
                        }
                        this.state = 1504;
                        this.errorHandler.sync(this);
                        alternative = this.interpreter.adaptivePredict(this.tokenStream, 113, this.context);
                    }
                    this.state = 1509;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    if (_la === 2 || _la === 4) {
                        {
                        this.state = 1506;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                        if (_la === 4) {
                            {
                            this.state = 1505;
                            this.match(Stage7Parser.COMMA);
                            }
                        }

                        this.state = 1508;
                        this.restParam();
                        }
                    }

                    }
                }

                this.state = 1513;
                this.match(Stage7Parser.RPAREN);
                this.state = 1516;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 82) {
                    {
                    this.state = 1514;
                    this.match(Stage7Parser.COLON);
                    this.state = 1515;
                    this.typeExpr();
                    }
                }

                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1518;
                this.match(Stage7Parser.LPAREN);
                this.state = 1519;
                this.restParam();
                this.state = 1520;
                this.match(Stage7Parser.RPAREN);
                this.state = 1523;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 82) {
                    {
                    this.state = 1521;
                    this.match(Stage7Parser.COLON);
                    this.state = 1522;
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
        this.enterRule(localContext, 254, Stage7Parser.RULE_param);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1527;
            this.match(Stage7Parser.LPAREN);
            this.state = 1528;
            this.match(Stage7Parser.IDENTIFIER);
            this.state = 1531;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 82) {
                {
                this.state = 1529;
                this.match(Stage7Parser.COLON);
                this.state = 1530;
                this.typeExpr();
                }
            }

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
    public restParam(): RestParamContext {
        let localContext = new RestParamContext(this.context, this.state);
        this.enterRule(localContext, 256, Stage7Parser.RULE_restParam);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1535;
            this.match(Stage7Parser.LPAREN);
            this.state = 1536;
            this.match(Stage7Parser.REST);
            this.state = 1537;
            this.match(Stage7Parser.IDENTIFIER);
            this.state = 1540;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 82) {
                {
                this.state = 1538;
                this.match(Stage7Parser.COLON);
                this.state = 1539;
                this.typeExpr();
                }
            }

            this.state = 1542;
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
        this.enterRule(localContext, 258, Stage7Parser.RULE_literal);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1544;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 79)) & ~0x1F) === 0 && ((1 << (_la - 79)) & 100663303) !== 0))) {
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
        4,1,108,1547,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,
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
        2,126,7,126,2,127,7,127,2,128,7,128,2,129,7,129,1,0,1,0,1,0,5,0,
        264,8,0,10,0,12,0,267,9,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,1,1,3,1,280,8,1,1,2,1,2,1,2,1,2,1,2,3,2,287,8,2,1,3,1,3,1,3,1,
        3,1,3,5,3,294,8,3,10,3,12,3,297,9,3,1,3,1,3,1,4,1,4,1,4,1,4,1,4,
        1,4,1,4,1,4,1,4,1,4,3,4,311,8,4,1,5,1,5,1,5,5,5,316,8,5,10,5,12,
        5,319,9,5,1,5,1,5,1,5,1,5,1,6,1,6,1,6,5,6,328,8,6,10,6,12,6,331,
        9,6,1,6,1,6,1,6,1,6,1,7,1,7,1,7,1,8,1,8,1,8,1,8,3,8,344,8,8,1,8,
        1,8,1,8,1,9,1,9,1,9,1,9,3,9,353,8,9,1,9,3,9,356,8,9,1,9,1,9,1,9,
        1,10,1,10,1,10,4,10,364,8,10,11,10,12,10,365,1,10,1,10,1,11,1,11,
        1,11,5,11,373,8,11,10,11,12,11,376,9,11,1,11,1,11,3,11,380,8,11,
        1,11,3,11,383,8,11,1,11,3,11,386,8,11,1,11,1,11,1,11,1,12,1,12,1,
        12,5,12,394,8,12,10,12,12,12,397,9,12,1,12,3,12,400,8,12,1,12,3,
        12,403,8,12,1,12,1,12,1,12,1,13,1,13,1,13,1,13,1,13,1,14,1,14,1,
        14,4,14,416,8,14,11,14,12,14,417,1,14,1,14,1,15,1,15,1,15,5,15,425,
        8,15,10,15,12,15,428,9,15,1,15,1,15,1,16,1,16,1,16,1,16,1,16,1,16,
        3,16,438,8,16,1,17,1,17,1,18,1,18,1,18,5,18,445,8,18,10,18,12,18,
        448,9,18,1,18,1,18,1,18,3,18,453,8,18,1,18,3,18,456,8,18,1,18,1,
        18,1,19,1,19,1,19,1,19,5,19,464,8,19,10,19,12,19,467,9,19,1,19,1,
        19,1,20,1,20,1,20,5,20,474,8,20,10,20,12,20,477,9,20,1,20,1,20,1,
        20,5,20,482,8,20,10,20,12,20,485,9,20,1,20,1,20,1,21,1,21,1,21,5,
        21,492,8,21,10,21,12,21,495,9,21,1,21,1,21,1,21,1,21,1,22,1,22,1,
        22,5,22,504,8,22,10,22,12,22,507,9,22,1,22,1,22,1,22,5,22,512,8,
        22,10,22,12,22,515,9,22,1,22,1,22,1,23,1,23,1,23,5,23,522,8,23,10,
        23,12,23,525,9,23,1,23,1,23,1,23,5,23,530,8,23,10,23,12,23,533,9,
        23,1,23,1,23,1,24,1,24,1,24,3,24,540,8,24,1,24,1,24,3,24,544,8,24,
        1,24,1,24,1,25,1,25,1,25,3,25,551,8,25,1,25,5,25,554,8,25,10,25,
        12,25,557,9,25,3,25,559,8,25,1,25,1,25,1,25,1,25,1,25,1,25,3,25,
        567,8,25,1,26,1,26,1,26,1,26,1,26,1,26,1,26,1,26,1,26,1,26,1,26,
        1,26,1,26,1,26,1,26,1,26,1,26,1,26,1,26,3,26,588,8,26,1,27,1,27,
        1,27,1,27,5,27,594,8,27,10,27,12,27,597,9,27,1,27,1,27,5,27,601,
        8,27,10,27,12,27,604,9,27,1,27,1,27,1,28,1,28,1,28,1,28,1,28,1,28,
        1,29,1,29,1,29,1,29,5,29,618,8,29,10,29,12,29,621,9,29,1,29,1,29,
        5,29,625,8,29,10,29,12,29,628,9,29,1,29,1,29,1,30,1,30,1,30,1,30,
        1,30,1,30,1,31,1,31,1,31,1,31,1,31,3,31,643,8,31,1,31,1,31,1,32,
        1,32,1,32,1,32,5,32,651,8,32,10,32,12,32,654,9,32,1,32,1,32,1,33,
        1,33,1,33,5,33,661,8,33,10,33,12,33,664,9,33,1,33,1,33,1,34,1,34,
        1,34,3,34,671,8,34,1,34,1,34,1,35,1,35,1,35,1,35,1,35,1,36,1,36,
        1,36,3,36,683,8,36,1,36,1,36,1,36,1,37,1,37,1,37,1,37,1,37,1,37,
        1,38,1,38,1,38,4,38,697,8,38,11,38,12,38,698,1,38,1,38,1,39,1,39,
        1,39,1,39,1,39,3,39,708,8,39,1,40,1,40,1,40,1,40,1,40,1,40,1,40,
        1,40,1,40,3,40,719,8,40,1,41,1,41,1,41,1,41,1,41,1,41,1,42,1,42,
        1,42,1,42,1,42,1,42,1,42,1,42,1,42,1,42,1,42,1,42,1,42,1,42,1,42,
        1,42,1,42,1,42,1,42,1,42,1,42,1,42,1,42,1,42,1,42,3,42,752,8,42,
        1,43,1,43,1,43,4,43,757,8,43,11,43,12,43,758,1,43,1,43,1,44,1,44,
        1,44,3,44,766,8,44,1,44,1,44,1,45,1,45,1,45,1,45,4,45,774,8,45,11,
        45,12,45,775,1,45,1,45,1,46,1,46,1,46,1,46,1,46,1,47,1,47,1,47,1,
        47,1,47,1,47,1,48,1,48,1,48,4,48,794,8,48,11,48,12,48,795,1,48,1,
        48,1,49,1,49,1,49,1,49,4,49,804,8,49,11,49,12,49,805,1,49,1,49,1,
        50,1,50,1,50,1,50,1,50,1,51,1,51,1,51,1,51,1,51,1,52,1,52,1,52,1,
        52,3,52,824,8,52,1,52,1,52,1,52,1,53,1,53,1,53,1,53,3,53,833,8,53,
        1,53,1,53,1,54,1,54,1,54,1,54,1,54,1,54,1,54,1,54,1,54,1,54,1,54,
        1,54,1,54,1,54,1,54,1,54,3,54,853,8,54,1,55,1,55,1,55,1,55,4,55,
        859,8,55,11,55,12,55,860,1,55,1,55,1,56,1,56,1,56,1,56,4,56,869,
        8,56,11,56,12,56,870,1,56,1,56,1,57,1,57,1,57,1,57,1,57,1,58,1,58,
        1,58,4,58,883,8,58,11,58,12,58,884,1,58,1,58,1,59,1,59,1,59,1,59,
        1,59,1,59,1,59,1,59,1,59,1,59,1,59,3,59,900,8,59,1,60,1,60,1,60,
        3,60,905,8,60,1,60,1,60,5,60,909,8,60,10,60,12,60,912,9,60,1,60,
        1,60,1,60,1,60,1,61,1,61,1,61,3,61,921,8,61,1,61,1,61,1,61,1,62,
        1,62,1,62,5,62,929,8,62,10,62,12,62,932,9,62,1,62,1,62,1,63,1,63,
        5,63,938,8,63,10,63,12,63,941,9,63,1,63,1,63,3,63,945,8,63,1,63,
        1,63,1,63,1,64,1,64,1,65,1,65,1,65,1,65,1,65,1,66,1,66,1,66,1,66,
        1,66,1,67,1,67,1,67,1,67,1,67,1,68,1,68,1,68,1,68,1,68,1,68,1,69,
        1,69,1,69,1,69,1,69,1,69,1,69,1,69,1,70,1,70,1,70,1,70,1,70,1,71,
        1,71,1,71,1,71,1,71,3,71,991,8,71,1,71,1,71,1,71,1,72,1,72,1,72,
        4,72,999,8,72,11,72,12,72,1000,1,72,1,72,1,73,1,73,1,74,1,74,1,74,
        4,74,1010,8,74,11,74,12,74,1011,1,74,1,74,1,75,1,75,3,75,1018,8,
        75,1,76,1,76,1,76,4,76,1023,8,76,11,76,12,76,1024,1,76,1,76,1,77,
        1,77,1,77,4,77,1032,8,77,11,77,12,77,1033,1,77,1,77,1,78,1,78,1,
        78,1,78,3,78,1042,8,78,1,78,3,78,1045,8,78,1,78,3,78,1048,8,78,1,
        79,1,79,1,79,1,79,1,79,1,80,1,80,1,80,1,80,1,80,1,81,1,81,1,81,1,
        81,1,81,1,81,1,81,1,81,1,81,1,81,1,81,1,81,3,81,1072,8,81,1,82,1,
        82,1,82,1,82,5,82,1078,8,82,10,82,12,82,1081,9,82,1,82,3,82,1084,
        8,82,1,82,1,82,1,83,1,83,1,83,1,83,5,83,1092,8,83,10,83,12,83,1095,
        9,83,1,83,1,83,1,84,1,84,1,84,5,84,1102,8,84,10,84,12,84,1105,9,
        84,1,84,1,84,1,85,1,85,1,85,1,85,1,85,1,85,5,85,1115,8,85,10,85,
        12,85,1118,9,85,1,85,1,85,1,86,1,86,1,86,1,86,1,86,5,86,1127,8,86,
        10,86,12,86,1130,9,86,1,86,1,86,1,87,1,87,1,87,1,87,1,87,5,87,1139,
        8,87,10,87,12,87,1142,9,87,1,87,1,87,1,88,1,88,1,88,1,88,1,88,5,
        88,1151,8,88,10,88,12,88,1154,9,88,1,88,1,88,1,89,1,89,1,89,1,89,
        1,89,1,89,1,89,1,89,1,89,1,89,1,89,1,89,1,89,1,89,1,89,1,89,1,89,
        1,89,1,89,1,89,1,89,1,89,1,89,1,89,1,89,1,89,1,89,1,89,1,89,1,89,
        1,89,1,89,1,89,1,89,1,89,3,89,1193,8,89,1,90,1,90,1,91,1,91,1,92,
        1,92,1,92,5,92,1202,8,92,10,92,12,92,1205,9,92,1,92,1,92,1,93,1,
        93,1,93,1,93,5,93,1213,8,93,10,93,12,93,1216,9,93,1,93,1,93,1,94,
        1,94,1,94,1,94,1,94,1,95,1,95,1,95,1,95,1,95,1,95,1,96,1,96,1,96,
        1,96,5,96,1235,8,96,10,96,12,96,1238,9,96,1,96,1,96,1,97,1,97,1,
        97,1,97,5,97,1246,8,97,10,97,12,97,1249,9,97,1,97,1,97,1,98,1,98,
        1,98,1,98,5,98,1257,8,98,10,98,12,98,1260,9,98,1,98,1,98,1,99,1,
        99,1,99,1,99,5,99,1268,8,99,10,99,12,99,1271,9,99,1,99,1,99,1,100,
        1,100,1,100,1,100,5,100,1279,8,100,10,100,12,100,1282,9,100,1,100,
        1,100,1,101,1,101,1,101,1,101,5,101,1290,8,101,10,101,12,101,1293,
        9,101,1,101,1,101,1,102,1,102,1,102,1,102,1,102,1,103,1,103,1,103,
        3,103,1305,8,103,1,103,1,103,1,104,1,104,1,104,1,104,1,104,1,105,
        1,105,1,105,1,105,1,105,5,105,1319,8,105,10,105,12,105,1322,9,105,
        1,105,1,105,1,106,1,106,1,106,1,106,1,106,5,106,1331,8,106,10,106,
        12,106,1334,9,106,1,106,1,106,1,107,1,107,1,107,1,107,1,107,1,107,
        1,107,1,108,1,108,1,108,1,108,1,108,4,108,1350,8,108,11,108,12,108,
        1351,1,108,1,108,1,109,1,109,1,109,1,109,3,109,1360,8,109,1,109,
        5,109,1363,8,109,10,109,12,109,1366,9,109,1,109,1,109,1,110,1,110,
        1,110,5,110,1373,8,110,10,110,12,110,1376,9,110,1,110,1,110,1,111,
        1,111,1,111,1,111,1,111,1,111,1,111,1,111,1,111,1,111,1,111,1,111,
        1,111,3,111,1393,8,111,1,112,1,112,1,112,1,112,5,112,1399,8,112,
        10,112,12,112,1402,9,112,1,112,1,112,1,113,1,113,1,113,5,113,1409,
        8,113,10,113,12,113,1412,9,113,1,113,1,113,1,114,1,114,1,114,1,114,
        4,114,1420,8,114,11,114,12,114,1421,1,114,1,114,1,115,1,115,1,116,
        1,116,1,116,1,116,1,116,1,116,1,117,1,117,1,117,1,117,1,117,1,117,
        1,118,1,118,1,118,1,118,1,118,1,119,1,119,1,119,1,119,1,119,1,120,
        1,120,1,120,1,120,1,120,1,121,1,121,1,121,1,121,1,121,1,121,1,122,
        1,122,1,122,1,122,1,122,1,122,1,123,1,123,1,123,1,123,1,123,1,123,
        1,124,1,124,1,124,3,124,1476,8,124,1,124,5,124,1479,8,124,10,124,
        12,124,1482,9,124,1,124,1,124,1,125,1,125,1,125,4,125,1489,8,125,
        11,125,12,125,1490,1,125,1,125,1,126,1,126,1,126,3,126,1498,8,126,
        1,126,5,126,1501,8,126,10,126,12,126,1504,9,126,1,126,3,126,1507,
        8,126,1,126,3,126,1510,8,126,3,126,1512,8,126,1,126,1,126,1,126,
        3,126,1517,8,126,1,126,1,126,1,126,1,126,1,126,3,126,1524,8,126,
        3,126,1526,8,126,1,127,1,127,1,127,1,127,3,127,1532,8,127,1,127,
        1,127,1,128,1,128,1,128,1,128,1,128,3,128,1541,8,128,1,128,1,128,
        1,129,1,129,1,129,0,0,130,0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,
        30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,66,68,70,72,
        74,76,78,80,82,84,86,88,90,92,94,96,98,100,102,104,106,108,110,112,
        114,116,118,120,122,124,126,128,130,132,134,136,138,140,142,144,
        146,148,150,152,154,156,158,160,162,164,166,168,170,172,174,176,
        178,180,182,184,186,188,190,192,194,196,198,200,202,204,206,208,
        210,212,214,216,218,220,222,224,226,228,230,232,234,236,238,240,
        242,244,246,248,250,252,254,256,258,0,5,2,0,79,79,104,105,2,0,70,
        70,78,78,8,0,5,27,31,31,33,77,79,81,83,90,93,103,105,105,107,107,
        1,0,33,34,2,0,79,81,104,105,1628,0,260,1,0,0,0,2,279,1,0,0,0,4,286,
        1,0,0,0,6,288,1,0,0,0,8,310,1,0,0,0,10,312,1,0,0,0,12,324,1,0,0,
        0,14,336,1,0,0,0,16,339,1,0,0,0,18,348,1,0,0,0,20,360,1,0,0,0,22,
        369,1,0,0,0,24,390,1,0,0,0,26,407,1,0,0,0,28,412,1,0,0,0,30,421,
        1,0,0,0,32,437,1,0,0,0,34,439,1,0,0,0,36,441,1,0,0,0,38,459,1,0,
        0,0,40,470,1,0,0,0,42,488,1,0,0,0,44,500,1,0,0,0,46,518,1,0,0,0,
        48,536,1,0,0,0,50,547,1,0,0,0,52,587,1,0,0,0,54,589,1,0,0,0,56,607,
        1,0,0,0,58,613,1,0,0,0,60,631,1,0,0,0,62,637,1,0,0,0,64,646,1,0,
        0,0,66,657,1,0,0,0,68,667,1,0,0,0,70,674,1,0,0,0,72,679,1,0,0,0,
        74,687,1,0,0,0,76,693,1,0,0,0,78,707,1,0,0,0,80,718,1,0,0,0,82,720,
        1,0,0,0,84,751,1,0,0,0,86,753,1,0,0,0,88,762,1,0,0,0,90,769,1,0,
        0,0,92,779,1,0,0,0,94,784,1,0,0,0,96,790,1,0,0,0,98,799,1,0,0,0,
        100,809,1,0,0,0,102,814,1,0,0,0,104,819,1,0,0,0,106,828,1,0,0,0,
        108,852,1,0,0,0,110,854,1,0,0,0,112,864,1,0,0,0,114,874,1,0,0,0,
        116,879,1,0,0,0,118,899,1,0,0,0,120,901,1,0,0,0,122,917,1,0,0,0,
        124,925,1,0,0,0,126,935,1,0,0,0,128,949,1,0,0,0,130,951,1,0,0,0,
        132,956,1,0,0,0,134,961,1,0,0,0,136,966,1,0,0,0,138,972,1,0,0,0,
        140,980,1,0,0,0,142,985,1,0,0,0,144,995,1,0,0,0,146,1004,1,0,0,0,
        148,1006,1,0,0,0,150,1017,1,0,0,0,152,1019,1,0,0,0,154,1028,1,0,
        0,0,156,1047,1,0,0,0,158,1049,1,0,0,0,160,1054,1,0,0,0,162,1071,
        1,0,0,0,164,1073,1,0,0,0,166,1087,1,0,0,0,168,1098,1,0,0,0,170,1108,
        1,0,0,0,172,1121,1,0,0,0,174,1133,1,0,0,0,176,1145,1,0,0,0,178,1192,
        1,0,0,0,180,1194,1,0,0,0,182,1196,1,0,0,0,184,1198,1,0,0,0,186,1208,
        1,0,0,0,188,1219,1,0,0,0,190,1224,1,0,0,0,192,1230,1,0,0,0,194,1241,
        1,0,0,0,196,1252,1,0,0,0,198,1263,1,0,0,0,200,1274,1,0,0,0,202,1285,
        1,0,0,0,204,1296,1,0,0,0,206,1301,1,0,0,0,208,1308,1,0,0,0,210,1313,
        1,0,0,0,212,1325,1,0,0,0,214,1337,1,0,0,0,216,1344,1,0,0,0,218,1355,
        1,0,0,0,220,1369,1,0,0,0,222,1392,1,0,0,0,224,1394,1,0,0,0,226,1405,
        1,0,0,0,228,1415,1,0,0,0,230,1425,1,0,0,0,232,1427,1,0,0,0,234,1433,
        1,0,0,0,236,1439,1,0,0,0,238,1444,1,0,0,0,240,1449,1,0,0,0,242,1454,
        1,0,0,0,244,1460,1,0,0,0,246,1466,1,0,0,0,248,1472,1,0,0,0,250,1485,
        1,0,0,0,252,1525,1,0,0,0,254,1527,1,0,0,0,256,1535,1,0,0,0,258,1544,
        1,0,0,0,260,261,5,2,0,0,261,265,5,5,0,0,262,264,3,2,1,0,263,262,
        1,0,0,0,264,267,1,0,0,0,265,263,1,0,0,0,265,266,1,0,0,0,266,268,
        1,0,0,0,267,265,1,0,0,0,268,269,5,3,0,0,269,1,1,0,0,0,270,280,3,
        6,3,0,271,280,3,8,4,0,272,280,3,10,5,0,273,280,3,12,6,0,274,280,
        3,16,8,0,275,280,3,18,9,0,276,280,3,22,11,0,277,280,3,102,51,0,278,
        280,3,52,26,0,279,270,1,0,0,0,279,271,1,0,0,0,279,272,1,0,0,0,279,
        273,1,0,0,0,279,274,1,0,0,0,279,275,1,0,0,0,279,276,1,0,0,0,279,
        277,1,0,0,0,279,278,1,0,0,0,280,3,1,0,0,0,281,287,3,10,5,0,282,287,
        3,12,6,0,283,287,3,22,11,0,284,287,3,18,9,0,285,287,3,16,8,0,286,
        281,1,0,0,0,286,282,1,0,0,0,286,283,1,0,0,0,286,284,1,0,0,0,286,
        285,1,0,0,0,287,5,1,0,0,0,288,289,5,2,0,0,289,290,5,15,0,0,290,291,
        5,107,0,0,291,295,3,252,126,0,292,294,3,52,26,0,293,292,1,0,0,0,
        294,297,1,0,0,0,295,293,1,0,0,0,295,296,1,0,0,0,296,298,1,0,0,0,
        297,295,1,0,0,0,298,299,5,3,0,0,299,7,1,0,0,0,300,301,5,2,0,0,301,
        302,5,16,0,0,302,303,3,10,5,0,303,304,5,3,0,0,304,311,1,0,0,0,305,
        306,5,2,0,0,306,307,5,16,0,0,307,308,3,12,6,0,308,309,5,3,0,0,309,
        311,1,0,0,0,310,300,1,0,0,0,310,305,1,0,0,0,311,9,1,0,0,0,312,313,
        5,2,0,0,313,317,5,7,0,0,314,316,3,14,7,0,315,314,1,0,0,0,316,319,
        1,0,0,0,317,315,1,0,0,0,317,318,1,0,0,0,318,320,1,0,0,0,319,317,
        1,0,0,0,320,321,5,107,0,0,321,322,3,178,89,0,322,323,5,3,0,0,323,
        11,1,0,0,0,324,325,5,2,0,0,325,329,5,9,0,0,326,328,3,14,7,0,327,
        326,1,0,0,0,328,331,1,0,0,0,329,327,1,0,0,0,329,330,1,0,0,0,330,
        332,1,0,0,0,331,329,1,0,0,0,332,333,5,107,0,0,333,334,3,178,89,0,
        334,335,5,3,0,0,335,13,1,0,0,0,336,337,5,90,0,0,337,338,5,103,0,
        0,338,15,1,0,0,0,339,340,5,2,0,0,340,341,5,75,0,0,341,343,5,107,
        0,0,342,344,3,154,77,0,343,342,1,0,0,0,343,344,1,0,0,0,344,345,1,
        0,0,0,345,346,3,108,54,0,346,347,5,3,0,0,347,17,1,0,0,0,348,349,
        5,2,0,0,349,350,5,76,0,0,350,352,5,107,0,0,351,353,3,154,77,0,352,
        351,1,0,0,0,352,353,1,0,0,0,353,355,1,0,0,0,354,356,3,20,10,0,355,
        354,1,0,0,0,355,356,1,0,0,0,356,357,1,0,0,0,357,358,3,124,62,0,358,
        359,5,3,0,0,359,19,1,0,0,0,360,361,5,2,0,0,361,363,5,73,0,0,362,
        364,3,108,54,0,363,362,1,0,0,0,364,365,1,0,0,0,365,363,1,0,0,0,365,
        366,1,0,0,0,366,367,1,0,0,0,367,368,5,3,0,0,368,21,1,0,0,0,369,370,
        5,2,0,0,370,374,5,49,0,0,371,373,3,34,17,0,372,371,1,0,0,0,373,376,
        1,0,0,0,374,372,1,0,0,0,374,375,1,0,0,0,375,377,1,0,0,0,376,374,
        1,0,0,0,377,379,5,107,0,0,378,380,3,154,77,0,379,378,1,0,0,0,379,
        380,1,0,0,0,380,382,1,0,0,0,381,383,3,26,13,0,382,381,1,0,0,0,382,
        383,1,0,0,0,383,385,1,0,0,0,384,386,3,28,14,0,385,384,1,0,0,0,385,
        386,1,0,0,0,386,387,1,0,0,0,387,388,3,30,15,0,388,389,5,3,0,0,389,
        23,1,0,0,0,390,391,5,2,0,0,391,395,5,49,0,0,392,394,3,34,17,0,393,
        392,1,0,0,0,394,397,1,0,0,0,395,393,1,0,0,0,395,396,1,0,0,0,396,
        399,1,0,0,0,397,395,1,0,0,0,398,400,3,26,13,0,399,398,1,0,0,0,399,
        400,1,0,0,0,400,402,1,0,0,0,401,403,3,28,14,0,402,401,1,0,0,0,402,
        403,1,0,0,0,403,404,1,0,0,0,404,405,3,30,15,0,405,406,5,3,0,0,406,
        25,1,0,0,0,407,408,5,2,0,0,408,409,5,73,0,0,409,410,3,108,54,0,410,
        411,5,3,0,0,411,27,1,0,0,0,412,413,5,2,0,0,413,415,5,56,0,0,414,
        416,3,108,54,0,415,414,1,0,0,0,416,417,1,0,0,0,417,415,1,0,0,0,417,
        418,1,0,0,0,418,419,1,0,0,0,419,420,5,3,0,0,420,29,1,0,0,0,421,422,
        5,2,0,0,422,426,5,46,0,0,423,425,3,32,16,0,424,423,1,0,0,0,425,428,
        1,0,0,0,426,424,1,0,0,0,426,427,1,0,0,0,427,429,1,0,0,0,428,426,
        1,0,0,0,429,430,5,3,0,0,430,31,1,0,0,0,431,438,3,36,18,0,432,438,
        3,38,19,0,433,438,3,40,20,0,434,438,3,42,21,0,435,438,3,44,22,0,
        436,438,3,46,23,0,437,431,1,0,0,0,437,432,1,0,0,0,437,433,1,0,0,
        0,437,434,1,0,0,0,437,435,1,0,0,0,437,436,1,0,0,0,438,33,1,0,0,0,
        439,440,5,103,0,0,440,35,1,0,0,0,441,442,5,2,0,0,442,446,5,50,0,
        0,443,445,3,34,17,0,444,443,1,0,0,0,445,448,1,0,0,0,446,444,1,0,
        0,0,446,447,1,0,0,0,447,449,1,0,0,0,448,446,1,0,0,0,449,452,5,107,
        0,0,450,451,5,82,0,0,451,453,3,108,54,0,452,450,1,0,0,0,452,453,
        1,0,0,0,453,455,1,0,0,0,454,456,3,178,89,0,455,454,1,0,0,0,455,456,
        1,0,0,0,456,457,1,0,0,0,457,458,5,3,0,0,458,37,1,0,0,0,459,460,5,
        2,0,0,460,461,5,51,0,0,461,465,3,50,25,0,462,464,3,52,26,0,463,462,
        1,0,0,0,464,467,1,0,0,0,465,463,1,0,0,0,465,466,1,0,0,0,466,468,
        1,0,0,0,467,465,1,0,0,0,468,469,5,3,0,0,469,39,1,0,0,0,470,471,5,
        2,0,0,471,475,5,12,0,0,472,474,3,34,17,0,473,472,1,0,0,0,474,477,
        1,0,0,0,475,473,1,0,0,0,475,476,1,0,0,0,476,478,1,0,0,0,477,475,
        1,0,0,0,478,479,5,107,0,0,479,483,3,50,25,0,480,482,3,52,26,0,481,
        480,1,0,0,0,482,485,1,0,0,0,483,481,1,0,0,0,483,484,1,0,0,0,484,
        486,1,0,0,0,485,483,1,0,0,0,486,487,5,3,0,0,487,41,1,0,0,0,488,489,
        5,2,0,0,489,493,5,48,0,0,490,492,3,34,17,0,491,490,1,0,0,0,492,495,
        1,0,0,0,493,491,1,0,0,0,493,494,1,0,0,0,494,496,1,0,0,0,495,493,
        1,0,0,0,496,497,5,107,0,0,497,498,3,50,25,0,498,499,5,3,0,0,499,
        43,1,0,0,0,500,501,5,2,0,0,501,505,5,54,0,0,502,504,3,34,17,0,503,
        502,1,0,0,0,504,507,1,0,0,0,505,503,1,0,0,0,505,506,1,0,0,0,506,
        508,1,0,0,0,507,505,1,0,0,0,508,509,5,107,0,0,509,513,3,50,25,0,
        510,512,3,52,26,0,511,510,1,0,0,0,512,515,1,0,0,0,513,511,1,0,0,
        0,513,514,1,0,0,0,514,516,1,0,0,0,515,513,1,0,0,0,516,517,5,3,0,
        0,517,45,1,0,0,0,518,519,5,2,0,0,519,523,5,55,0,0,520,522,3,34,17,
        0,521,520,1,0,0,0,522,525,1,0,0,0,523,521,1,0,0,0,523,524,1,0,0,
        0,524,526,1,0,0,0,525,523,1,0,0,0,526,527,5,107,0,0,527,531,3,50,
        25,0,528,530,3,52,26,0,529,528,1,0,0,0,530,533,1,0,0,0,531,529,1,
        0,0,0,531,532,1,0,0,0,532,534,1,0,0,0,533,531,1,0,0,0,534,535,5,
        3,0,0,535,47,1,0,0,0,536,537,5,2,0,0,537,539,5,107,0,0,538,540,5,
        78,0,0,539,538,1,0,0,0,539,540,1,0,0,0,540,543,1,0,0,0,541,542,5,
        82,0,0,542,544,3,108,54,0,543,541,1,0,0,0,543,544,1,0,0,0,544,545,
        1,0,0,0,545,546,5,3,0,0,546,49,1,0,0,0,547,558,5,2,0,0,548,555,3,
        48,24,0,549,551,5,4,0,0,550,549,1,0,0,0,550,551,1,0,0,0,551,552,
        1,0,0,0,552,554,3,48,24,0,553,550,1,0,0,0,554,557,1,0,0,0,555,553,
        1,0,0,0,555,556,1,0,0,0,556,559,1,0,0,0,557,555,1,0,0,0,558,548,
        1,0,0,0,558,559,1,0,0,0,559,560,1,0,0,0,560,566,5,3,0,0,561,562,
        5,2,0,0,562,563,5,74,0,0,563,564,3,108,54,0,564,565,5,3,0,0,565,
        567,1,0,0,0,566,561,1,0,0,0,566,567,1,0,0,0,567,51,1,0,0,0,568,588,
        3,54,27,0,569,588,3,56,28,0,570,588,3,58,29,0,571,588,3,60,30,0,
        572,588,3,62,31,0,573,588,3,64,32,0,574,588,3,66,33,0,575,588,3,
        68,34,0,576,588,3,70,35,0,577,588,3,72,36,0,578,588,3,74,37,0,579,
        588,3,80,40,0,580,588,3,164,82,0,581,588,3,170,85,0,582,588,3,172,
        86,0,583,588,3,174,87,0,584,588,3,176,88,0,585,588,3,162,81,0,586,
        588,3,178,89,0,587,568,1,0,0,0,587,569,1,0,0,0,587,570,1,0,0,0,587,
        571,1,0,0,0,587,572,1,0,0,0,587,573,1,0,0,0,587,574,1,0,0,0,587,
        575,1,0,0,0,587,576,1,0,0,0,587,577,1,0,0,0,587,578,1,0,0,0,587,
        579,1,0,0,0,587,580,1,0,0,0,587,581,1,0,0,0,587,582,1,0,0,0,587,
        583,1,0,0,0,587,584,1,0,0,0,587,585,1,0,0,0,587,586,1,0,0,0,588,
        53,1,0,0,0,589,590,5,2,0,0,590,591,5,6,0,0,591,595,5,2,0,0,592,594,
        3,104,52,0,593,592,1,0,0,0,594,597,1,0,0,0,595,593,1,0,0,0,595,596,
        1,0,0,0,596,598,1,0,0,0,597,595,1,0,0,0,598,602,5,3,0,0,599,601,
        3,52,26,0,600,599,1,0,0,0,601,604,1,0,0,0,602,600,1,0,0,0,602,603,
        1,0,0,0,603,605,1,0,0,0,604,602,1,0,0,0,605,606,5,3,0,0,606,55,1,
        0,0,0,607,608,5,2,0,0,608,609,5,7,0,0,609,610,3,106,53,0,610,611,
        3,178,89,0,611,612,5,3,0,0,612,57,1,0,0,0,613,614,5,2,0,0,614,615,
        5,8,0,0,615,619,5,2,0,0,616,618,3,104,52,0,617,616,1,0,0,0,618,621,
        1,0,0,0,619,617,1,0,0,0,619,620,1,0,0,0,620,622,1,0,0,0,621,619,
        1,0,0,0,622,626,5,3,0,0,623,625,3,52,26,0,624,623,1,0,0,0,625,628,
        1,0,0,0,626,624,1,0,0,0,626,627,1,0,0,0,627,629,1,0,0,0,628,626,
        1,0,0,0,629,630,5,3,0,0,630,59,1,0,0,0,631,632,5,2,0,0,632,633,5,
        9,0,0,633,634,3,106,53,0,634,635,3,178,89,0,635,636,5,3,0,0,636,
        61,1,0,0,0,637,638,5,2,0,0,638,639,5,17,0,0,639,640,3,178,89,0,640,
        642,3,52,26,0,641,643,3,52,26,0,642,641,1,0,0,0,642,643,1,0,0,0,
        643,644,1,0,0,0,644,645,5,3,0,0,645,63,1,0,0,0,646,647,5,2,0,0,647,
        648,5,18,0,0,648,652,3,178,89,0,649,651,3,52,26,0,650,649,1,0,0,
        0,651,654,1,0,0,0,652,650,1,0,0,0,652,653,1,0,0,0,653,655,1,0,0,
        0,654,652,1,0,0,0,655,656,5,3,0,0,656,65,1,0,0,0,657,658,5,2,0,0,
        658,662,5,19,0,0,659,661,3,52,26,0,660,659,1,0,0,0,661,664,1,0,0,
        0,662,660,1,0,0,0,662,663,1,0,0,0,663,665,1,0,0,0,664,662,1,0,0,
        0,665,666,5,3,0,0,666,67,1,0,0,0,667,668,5,2,0,0,668,670,5,20,0,
        0,669,671,3,178,89,0,670,669,1,0,0,0,670,671,1,0,0,0,671,672,1,0,
        0,0,672,673,5,3,0,0,673,69,1,0,0,0,674,675,5,2,0,0,675,676,5,21,
        0,0,676,677,3,178,89,0,677,678,5,3,0,0,678,71,1,0,0,0,679,680,5,
        2,0,0,680,682,5,38,0,0,681,683,3,220,110,0,682,681,1,0,0,0,682,683,
        1,0,0,0,683,684,1,0,0,0,684,685,5,105,0,0,685,686,5,3,0,0,686,73,
        1,0,0,0,687,688,5,2,0,0,688,689,5,99,0,0,689,690,3,76,38,0,690,691,
        5,105,0,0,691,692,5,3,0,0,692,75,1,0,0,0,693,694,5,2,0,0,694,696,
        5,107,0,0,695,697,3,78,39,0,696,695,1,0,0,0,697,698,1,0,0,0,698,
        696,1,0,0,0,698,699,1,0,0,0,699,700,1,0,0,0,700,701,5,3,0,0,701,
        77,1,0,0,0,702,708,5,107,0,0,703,704,5,2,0,0,704,705,5,107,0,0,705,
        706,5,107,0,0,706,708,5,3,0,0,707,702,1,0,0,0,707,703,1,0,0,0,708,
        79,1,0,0,0,709,719,3,82,41,0,710,719,3,84,42,0,711,719,3,86,43,0,
        712,719,3,94,47,0,713,719,3,90,45,0,714,719,3,92,46,0,715,719,3,
        96,48,0,716,719,3,98,49,0,717,719,3,100,50,0,718,709,1,0,0,0,718,
        710,1,0,0,0,718,711,1,0,0,0,718,712,1,0,0,0,718,713,1,0,0,0,718,
        714,1,0,0,0,718,715,1,0,0,0,718,716,1,0,0,0,718,717,1,0,0,0,719,
        81,1,0,0,0,720,721,5,2,0,0,721,722,5,93,0,0,722,723,5,107,0,0,723,
        724,3,178,89,0,724,725,5,3,0,0,725,83,1,0,0,0,726,727,5,2,0,0,727,
        728,5,94,0,0,728,729,3,22,11,0,729,730,5,3,0,0,730,752,1,0,0,0,731,
        732,5,2,0,0,732,733,5,94,0,0,733,734,3,24,12,0,734,735,5,3,0,0,735,
        752,1,0,0,0,736,737,5,2,0,0,737,738,5,94,0,0,738,739,3,10,5,0,739,
        740,5,3,0,0,740,752,1,0,0,0,741,742,5,2,0,0,742,743,5,94,0,0,743,
        744,3,12,6,0,744,745,5,3,0,0,745,752,1,0,0,0,746,747,5,2,0,0,747,
        748,5,94,0,0,748,749,3,178,89,0,749,750,5,3,0,0,750,752,1,0,0,0,
        751,726,1,0,0,0,751,731,1,0,0,0,751,736,1,0,0,0,751,741,1,0,0,0,
        751,746,1,0,0,0,752,85,1,0,0,0,753,754,5,2,0,0,754,756,5,95,0,0,
        755,757,3,88,44,0,756,755,1,0,0,0,757,758,1,0,0,0,758,756,1,0,0,
        0,758,759,1,0,0,0,759,760,1,0,0,0,760,761,5,3,0,0,761,87,1,0,0,0,
        762,763,5,2,0,0,763,765,5,107,0,0,764,766,5,107,0,0,765,764,1,0,
        0,0,765,766,1,0,0,0,766,767,1,0,0,0,767,768,5,3,0,0,768,89,1,0,0,
        0,769,770,5,2,0,0,770,771,5,97,0,0,771,773,5,105,0,0,772,774,3,88,
        44,0,773,772,1,0,0,0,774,775,1,0,0,0,775,773,1,0,0,0,775,776,1,0,
        0,0,776,777,1,0,0,0,777,778,5,3,0,0,778,91,1,0,0,0,779,780,5,2,0,
        0,780,781,5,98,0,0,781,782,5,105,0,0,782,783,5,3,0,0,783,93,1,0,
        0,0,784,785,5,2,0,0,785,786,5,96,0,0,786,787,5,105,0,0,787,788,5,
        105,0,0,788,789,5,3,0,0,789,95,1,0,0,0,790,791,5,2,0,0,791,793,5,
        102,0,0,792,794,3,88,44,0,793,792,1,0,0,0,794,795,1,0,0,0,795,793,
        1,0,0,0,795,796,1,0,0,0,796,797,1,0,0,0,797,798,5,3,0,0,798,97,1,
        0,0,0,799,800,5,2,0,0,800,801,5,101,0,0,801,803,5,105,0,0,802,804,
        3,88,44,0,803,802,1,0,0,0,804,805,1,0,0,0,805,803,1,0,0,0,805,806,
        1,0,0,0,806,807,1,0,0,0,807,808,5,3,0,0,808,99,1,0,0,0,809,810,5,
        2,0,0,810,811,5,100,0,0,811,812,5,105,0,0,812,813,5,3,0,0,813,101,
        1,0,0,0,814,815,5,2,0,0,815,816,5,93,0,0,816,817,3,4,2,0,817,818,
        5,3,0,0,818,103,1,0,0,0,819,820,5,2,0,0,820,823,5,107,0,0,821,822,
        5,82,0,0,822,824,3,108,54,0,823,821,1,0,0,0,823,824,1,0,0,0,824,
        825,1,0,0,0,825,826,3,178,89,0,826,827,5,3,0,0,827,105,1,0,0,0,828,
        829,5,2,0,0,829,832,5,107,0,0,830,831,5,82,0,0,831,833,3,108,54,
        0,832,830,1,0,0,0,832,833,1,0,0,0,833,834,1,0,0,0,834,835,5,3,0,
        0,835,107,1,0,0,0,836,853,5,107,0,0,837,853,3,110,55,0,838,853,3,
        112,56,0,839,853,3,114,57,0,840,853,3,116,58,0,841,853,3,120,60,
        0,842,853,3,124,62,0,843,853,3,130,65,0,844,853,3,132,66,0,845,853,
        3,134,67,0,846,853,3,136,68,0,847,853,3,138,69,0,848,853,3,140,70,
        0,849,853,3,142,71,0,850,853,3,148,74,0,851,853,3,152,76,0,852,836,
        1,0,0,0,852,837,1,0,0,0,852,838,1,0,0,0,852,839,1,0,0,0,852,840,
        1,0,0,0,852,841,1,0,0,0,852,842,1,0,0,0,852,843,1,0,0,0,852,844,
        1,0,0,0,852,845,1,0,0,0,852,846,1,0,0,0,852,847,1,0,0,0,852,848,
        1,0,0,0,852,849,1,0,0,0,852,850,1,0,0,0,852,851,1,0,0,0,853,109,
        1,0,0,0,854,855,5,2,0,0,855,856,5,57,0,0,856,858,3,108,54,0,857,
        859,3,108,54,0,858,857,1,0,0,0,859,860,1,0,0,0,860,858,1,0,0,0,860,
        861,1,0,0,0,861,862,1,0,0,0,862,863,5,3,0,0,863,111,1,0,0,0,864,
        865,5,2,0,0,865,866,5,58,0,0,866,868,3,108,54,0,867,869,3,108,54,
        0,868,867,1,0,0,0,869,870,1,0,0,0,870,868,1,0,0,0,870,871,1,0,0,
        0,871,872,1,0,0,0,872,873,5,3,0,0,873,113,1,0,0,0,874,875,5,2,0,
        0,875,876,5,26,0,0,876,877,3,108,54,0,877,878,5,3,0,0,878,115,1,
        0,0,0,879,880,5,2,0,0,880,882,5,59,0,0,881,883,3,118,59,0,882,881,
        1,0,0,0,883,884,1,0,0,0,884,882,1,0,0,0,884,885,1,0,0,0,885,886,
        1,0,0,0,886,887,5,3,0,0,887,117,1,0,0,0,888,889,5,2,0,0,889,890,
        5,69,0,0,890,891,3,108,54,0,891,892,5,3,0,0,892,900,1,0,0,0,893,
        894,5,2,0,0,894,895,5,107,0,0,895,896,3,108,54,0,896,897,5,3,0,0,
        897,900,1,0,0,0,898,900,3,108,54,0,899,888,1,0,0,0,899,893,1,0,0,
        0,899,898,1,0,0,0,900,119,1,0,0,0,901,902,5,2,0,0,902,904,5,60,0,
        0,903,905,3,154,77,0,904,903,1,0,0,0,904,905,1,0,0,0,905,906,1,0,
        0,0,906,910,5,2,0,0,907,909,3,122,61,0,908,907,1,0,0,0,909,912,1,
        0,0,0,910,908,1,0,0,0,910,911,1,0,0,0,911,913,1,0,0,0,912,910,1,
        0,0,0,913,914,5,3,0,0,914,915,3,108,54,0,915,916,5,3,0,0,916,121,
        1,0,0,0,917,918,5,2,0,0,918,920,5,107,0,0,919,921,5,78,0,0,920,919,
        1,0,0,0,920,921,1,0,0,0,921,922,1,0,0,0,922,923,3,108,54,0,923,924,
        5,3,0,0,924,123,1,0,0,0,925,926,5,2,0,0,926,930,5,107,0,0,927,929,
        3,126,63,0,928,927,1,0,0,0,929,932,1,0,0,0,930,928,1,0,0,0,930,931,
        1,0,0,0,931,933,1,0,0,0,932,930,1,0,0,0,933,934,5,3,0,0,934,125,
        1,0,0,0,935,939,5,2,0,0,936,938,3,128,64,0,937,936,1,0,0,0,938,941,
        1,0,0,0,939,937,1,0,0,0,939,940,1,0,0,0,940,942,1,0,0,0,941,939,
        1,0,0,0,942,944,5,107,0,0,943,945,5,78,0,0,944,943,1,0,0,0,944,945,
        1,0,0,0,945,946,1,0,0,0,946,947,3,108,54,0,947,948,5,3,0,0,948,127,
        1,0,0,0,949,950,5,70,0,0,950,129,1,0,0,0,951,952,5,2,0,0,952,953,
        5,61,0,0,953,954,7,0,0,0,954,955,5,3,0,0,955,131,1,0,0,0,956,957,
        5,2,0,0,957,958,5,62,0,0,958,959,3,108,54,0,959,960,5,3,0,0,960,
        133,1,0,0,0,961,962,5,2,0,0,962,963,5,63,0,0,963,964,5,107,0,0,964,
        965,5,3,0,0,965,135,1,0,0,0,966,967,5,2,0,0,967,968,5,31,0,0,968,
        969,3,108,54,0,969,970,3,108,54,0,970,971,5,3,0,0,971,137,1,0,0,
        0,972,973,5,2,0,0,973,974,5,24,0,0,974,975,3,108,54,0,975,976,3,
        108,54,0,976,977,3,108,54,0,977,978,3,108,54,0,978,979,5,3,0,0,979,
        139,1,0,0,0,980,981,5,2,0,0,981,982,5,65,0,0,982,983,5,107,0,0,983,
        984,5,3,0,0,984,141,1,0,0,0,985,986,5,2,0,0,986,987,5,66,0,0,987,
        988,5,107,0,0,988,990,3,108,54,0,989,991,3,144,72,0,990,989,1,0,
        0,0,990,991,1,0,0,0,991,992,1,0,0,0,992,993,3,108,54,0,993,994,5,
        3,0,0,994,143,1,0,0,0,995,996,5,2,0,0,996,998,5,77,0,0,997,999,3,
        146,73,0,998,997,1,0,0,0,999,1000,1,0,0,0,1000,998,1,0,0,0,1000,
        1001,1,0,0,0,1001,1002,1,0,0,0,1002,1003,5,3,0,0,1003,145,1,0,0,
        0,1004,1005,7,1,0,0,1005,147,1,0,0,0,1006,1007,5,2,0,0,1007,1009,
        5,67,0,0,1008,1010,3,150,75,0,1009,1008,1,0,0,0,1010,1011,1,0,0,
        0,1011,1009,1,0,0,0,1011,1012,1,0,0,0,1012,1013,1,0,0,0,1013,1014,
        5,3,0,0,1014,149,1,0,0,0,1015,1018,5,105,0,0,1016,1018,3,108,54,
        0,1017,1015,1,0,0,0,1017,1016,1,0,0,0,1018,151,1,0,0,0,1019,1020,
        5,2,0,0,1020,1022,3,108,54,0,1021,1023,3,108,54,0,1022,1021,1,0,
        0,0,1023,1024,1,0,0,0,1024,1022,1,0,0,0,1024,1025,1,0,0,0,1025,1026,
        1,0,0,0,1026,1027,5,3,0,0,1027,153,1,0,0,0,1028,1029,5,2,0,0,1029,
        1031,5,71,0,0,1030,1032,3,156,78,0,1031,1030,1,0,0,0,1032,1033,1,
        0,0,0,1033,1031,1,0,0,0,1033,1034,1,0,0,0,1034,1035,1,0,0,0,1035,
        1036,5,3,0,0,1036,155,1,0,0,0,1037,1048,5,107,0,0,1038,1039,5,2,
        0,0,1039,1041,5,107,0,0,1040,1042,3,158,79,0,1041,1040,1,0,0,0,1041,
        1042,1,0,0,0,1042,1044,1,0,0,0,1043,1045,3,160,80,0,1044,1043,1,
        0,0,0,1044,1045,1,0,0,0,1045,1046,1,0,0,0,1046,1048,5,3,0,0,1047,
        1037,1,0,0,0,1047,1038,1,0,0,0,1048,157,1,0,0,0,1049,1050,5,2,0,
        0,1050,1051,5,73,0,0,1051,1052,3,108,54,0,1052,1053,5,3,0,0,1053,
        159,1,0,0,0,1054,1055,5,2,0,0,1055,1056,5,41,0,0,1056,1057,3,108,
        54,0,1057,1058,5,3,0,0,1058,161,1,0,0,0,1059,1060,5,2,0,0,1060,1061,
        5,22,0,0,1061,1062,5,107,0,0,1062,1063,3,178,89,0,1063,1064,5,3,
        0,0,1064,1072,1,0,0,0,1065,1066,5,2,0,0,1066,1067,5,22,0,0,1067,
        1068,3,232,116,0,1068,1069,3,178,89,0,1069,1070,5,3,0,0,1070,1072,
        1,0,0,0,1071,1059,1,0,0,0,1071,1065,1,0,0,0,1072,163,1,0,0,0,1073,
        1074,5,2,0,0,1074,1075,5,39,0,0,1075,1079,3,178,89,0,1076,1078,3,
        166,83,0,1077,1076,1,0,0,0,1078,1081,1,0,0,0,1079,1077,1,0,0,0,1079,
        1080,1,0,0,0,1080,1083,1,0,0,0,1081,1079,1,0,0,0,1082,1084,3,168,
        84,0,1083,1082,1,0,0,0,1083,1084,1,0,0,0,1084,1085,1,0,0,0,1085,
        1086,5,3,0,0,1086,165,1,0,0,0,1087,1088,5,2,0,0,1088,1089,5,40,0,
        0,1089,1093,3,178,89,0,1090,1092,3,52,26,0,1091,1090,1,0,0,0,1092,
        1095,1,0,0,0,1093,1091,1,0,0,0,1093,1094,1,0,0,0,1094,1096,1,0,0,
        0,1095,1093,1,0,0,0,1096,1097,5,3,0,0,1097,167,1,0,0,0,1098,1099,
        5,2,0,0,1099,1103,5,41,0,0,1100,1102,3,52,26,0,1101,1100,1,0,0,0,
        1102,1105,1,0,0,0,1103,1101,1,0,0,0,1103,1104,1,0,0,0,1104,1106,
        1,0,0,0,1105,1103,1,0,0,0,1106,1107,5,3,0,0,1107,169,1,0,0,0,1108,
        1109,5,2,0,0,1109,1110,5,45,0,0,1110,1111,3,56,28,0,1111,1112,3,
        178,89,0,1112,1116,3,162,81,0,1113,1115,3,52,26,0,1114,1113,1,0,
        0,0,1115,1118,1,0,0,0,1116,1114,1,0,0,0,1116,1117,1,0,0,0,1117,1119,
        1,0,0,0,1118,1116,1,0,0,0,1119,1120,5,3,0,0,1120,171,1,0,0,0,1121,
        1122,5,2,0,0,1122,1123,5,42,0,0,1123,1124,5,107,0,0,1124,1128,3,
        178,89,0,1125,1127,3,52,26,0,1126,1125,1,0,0,0,1127,1130,1,0,0,0,
        1128,1126,1,0,0,0,1128,1129,1,0,0,0,1129,1131,1,0,0,0,1130,1128,
        1,0,0,0,1131,1132,5,3,0,0,1132,173,1,0,0,0,1133,1134,5,2,0,0,1134,
        1135,5,43,0,0,1135,1136,5,107,0,0,1136,1140,3,178,89,0,1137,1139,
        3,52,26,0,1138,1137,1,0,0,0,1139,1142,1,0,0,0,1140,1138,1,0,0,0,
        1140,1141,1,0,0,0,1141,1143,1,0,0,0,1142,1140,1,0,0,0,1143,1144,
        5,3,0,0,1144,175,1,0,0,0,1145,1146,5,2,0,0,1146,1147,5,44,0,0,1147,
        1148,5,107,0,0,1148,1152,3,178,89,0,1149,1151,3,52,26,0,1150,1149,
        1,0,0,0,1151,1154,1,0,0,0,1152,1150,1,0,0,0,1152,1153,1,0,0,0,1153,
        1155,1,0,0,0,1154,1152,1,0,0,0,1155,1156,5,3,0,0,1156,177,1,0,0,
        0,1157,1193,3,258,129,0,1158,1193,5,103,0,0,1159,1193,5,107,0,0,
        1160,1193,3,192,96,0,1161,1193,3,194,97,0,1162,1193,3,196,98,0,1163,
        1193,3,198,99,0,1164,1193,3,200,100,0,1165,1193,3,202,101,0,1166,
        1193,3,204,102,0,1167,1193,3,206,103,0,1168,1193,3,208,104,0,1169,
        1193,3,210,105,0,1170,1193,3,212,106,0,1171,1193,3,220,110,0,1172,
        1193,3,226,113,0,1173,1193,3,232,116,0,1174,1193,3,234,117,0,1175,
        1193,3,236,118,0,1176,1193,3,238,119,0,1177,1193,3,240,120,0,1178,
        1193,3,214,107,0,1179,1193,3,216,108,0,1180,1193,3,218,109,0,1181,
        1193,3,242,121,0,1182,1193,3,244,122,0,1183,1193,3,246,123,0,1184,
        1193,3,188,94,0,1185,1193,3,190,95,0,1186,1193,3,228,114,0,1187,
        1193,3,180,90,0,1188,1193,3,182,91,0,1189,1193,3,184,92,0,1190,1193,
        3,186,93,0,1191,1193,3,248,124,0,1192,1157,1,0,0,0,1192,1158,1,0,
        0,0,1192,1159,1,0,0,0,1192,1160,1,0,0,0,1192,1161,1,0,0,0,1192,1162,
        1,0,0,0,1192,1163,1,0,0,0,1192,1164,1,0,0,0,1192,1165,1,0,0,0,1192,
        1166,1,0,0,0,1192,1167,1,0,0,0,1192,1168,1,0,0,0,1192,1169,1,0,0,
        0,1192,1170,1,0,0,0,1192,1171,1,0,0,0,1192,1172,1,0,0,0,1192,1173,
        1,0,0,0,1192,1174,1,0,0,0,1192,1175,1,0,0,0,1192,1176,1,0,0,0,1192,
        1177,1,0,0,0,1192,1178,1,0,0,0,1192,1179,1,0,0,0,1192,1180,1,0,0,
        0,1192,1181,1,0,0,0,1192,1182,1,0,0,0,1192,1183,1,0,0,0,1192,1184,
        1,0,0,0,1192,1185,1,0,0,0,1192,1186,1,0,0,0,1192,1187,1,0,0,0,1192,
        1188,1,0,0,0,1192,1189,1,0,0,0,1192,1190,1,0,0,0,1192,1191,1,0,0,
        0,1193,179,1,0,0,0,1194,1195,5,52,0,0,1195,181,1,0,0,0,1196,1197,
        5,53,0,0,1197,183,1,0,0,0,1198,1199,5,2,0,0,1199,1203,5,53,0,0,1200,
        1202,3,178,89,0,1201,1200,1,0,0,0,1202,1205,1,0,0,0,1203,1201,1,
        0,0,0,1203,1204,1,0,0,0,1204,1206,1,0,0,0,1205,1203,1,0,0,0,1206,
        1207,5,3,0,0,1207,185,1,0,0,0,1208,1209,5,2,0,0,1209,1210,5,47,0,
        0,1210,1214,5,107,0,0,1211,1213,3,178,89,0,1212,1211,1,0,0,0,1213,
        1216,1,0,0,0,1214,1212,1,0,0,0,1214,1215,1,0,0,0,1215,1217,1,0,0,
        0,1216,1214,1,0,0,0,1217,1218,5,3,0,0,1218,187,1,0,0,0,1219,1220,
        5,2,0,0,1220,1221,5,63,0,0,1221,1222,3,178,89,0,1222,1223,5,3,0,
        0,1223,189,1,0,0,0,1224,1225,5,2,0,0,1225,1226,5,64,0,0,1226,1227,
        3,178,89,0,1227,1228,3,108,54,0,1228,1229,5,3,0,0,1229,191,1,0,0,
        0,1230,1231,5,2,0,0,1231,1232,5,10,0,0,1232,1236,3,252,126,0,1233,
        1235,3,52,26,0,1234,1233,1,0,0,0,1235,1238,1,0,0,0,1236,1234,1,0,
        0,0,1236,1237,1,0,0,0,1237,1239,1,0,0,0,1238,1236,1,0,0,0,1239,1240,
        5,3,0,0,1240,193,1,0,0,0,1241,1242,5,2,0,0,1242,1243,5,11,0,0,1243,
        1247,3,252,126,0,1244,1246,3,52,26,0,1245,1244,1,0,0,0,1246,1249,
        1,0,0,0,1247,1245,1,0,0,0,1247,1248,1,0,0,0,1248,1250,1,0,0,0,1249,
        1247,1,0,0,0,1250,1251,5,3,0,0,1251,195,1,0,0,0,1252,1253,5,2,0,
        0,1253,1254,5,84,0,0,1254,1258,3,252,126,0,1255,1257,3,52,26,0,1256,
        1255,1,0,0,0,1257,1260,1,0,0,0,1258,1256,1,0,0,0,1258,1259,1,0,0,
        0,1259,1261,1,0,0,0,1260,1258,1,0,0,0,1261,1262,5,3,0,0,1262,197,
        1,0,0,0,1263,1264,5,2,0,0,1264,1265,5,85,0,0,1265,1269,3,252,126,
        0,1266,1268,3,52,26,0,1267,1266,1,0,0,0,1268,1271,1,0,0,0,1269,1267,
        1,0,0,0,1269,1270,1,0,0,0,1270,1272,1,0,0,0,1271,1269,1,0,0,0,1272,
        1273,5,3,0,0,1273,199,1,0,0,0,1274,1275,5,2,0,0,1275,1276,5,86,0,
        0,1276,1280,3,252,126,0,1277,1279,3,52,26,0,1278,1277,1,0,0,0,1279,
        1282,1,0,0,0,1280,1278,1,0,0,0,1280,1281,1,0,0,0,1281,1283,1,0,0,
        0,1282,1280,1,0,0,0,1283,1284,5,3,0,0,1284,201,1,0,0,0,1285,1286,
        5,2,0,0,1286,1287,5,83,0,0,1287,1291,3,252,126,0,1288,1290,3,52,
        26,0,1289,1288,1,0,0,0,1290,1293,1,0,0,0,1291,1289,1,0,0,0,1291,
        1292,1,0,0,0,1292,1294,1,0,0,0,1293,1291,1,0,0,0,1294,1295,5,3,0,
        0,1295,203,1,0,0,0,1296,1297,5,2,0,0,1297,1298,5,89,0,0,1298,1299,
        3,178,89,0,1299,1300,5,3,0,0,1300,205,1,0,0,0,1301,1302,5,2,0,0,
        1302,1304,5,88,0,0,1303,1305,3,178,89,0,1304,1303,1,0,0,0,1304,1305,
        1,0,0,0,1305,1306,1,0,0,0,1306,1307,5,3,0,0,1307,207,1,0,0,0,1308,
        1309,5,2,0,0,1309,1310,5,87,0,0,1310,1311,3,178,89,0,1311,1312,5,
        3,0,0,1312,209,1,0,0,0,1313,1314,5,2,0,0,1314,1315,5,13,0,0,1315,
        1316,3,178,89,0,1316,1320,3,178,89,0,1317,1319,3,178,89,0,1318,1317,
        1,0,0,0,1319,1322,1,0,0,0,1320,1318,1,0,0,0,1320,1321,1,0,0,0,1321,
        1323,1,0,0,0,1322,1320,1,0,0,0,1323,1324,5,3,0,0,1324,211,1,0,0,
        0,1325,1326,5,2,0,0,1326,1327,5,14,0,0,1327,1328,3,178,89,0,1328,
        1332,3,178,89,0,1329,1331,3,178,89,0,1330,1329,1,0,0,0,1331,1334,
        1,0,0,0,1332,1330,1,0,0,0,1332,1333,1,0,0,0,1333,1335,1,0,0,0,1334,
        1332,1,0,0,0,1335,1336,5,3,0,0,1336,213,1,0,0,0,1337,1338,5,2,0,
        0,1338,1339,5,23,0,0,1339,1340,3,178,89,0,1340,1341,3,178,89,0,1341,
        1342,3,178,89,0,1342,1343,5,3,0,0,1343,215,1,0,0,0,1344,1345,5,2,
        0,0,1345,1349,5,24,0,0,1346,1347,3,178,89,0,1347,1348,3,178,89,0,
        1348,1350,1,0,0,0,1349,1346,1,0,0,0,1350,1351,1,0,0,0,1351,1349,
        1,0,0,0,1351,1352,1,0,0,0,1352,1353,1,0,0,0,1353,1354,5,3,0,0,1354,
        217,1,0,0,0,1355,1356,5,2,0,0,1356,1357,5,37,0,0,1357,1359,5,107,
        0,0,1358,1360,3,250,125,0,1359,1358,1,0,0,0,1359,1360,1,0,0,0,1360,
        1364,1,0,0,0,1361,1363,3,178,89,0,1362,1361,1,0,0,0,1363,1366,1,
        0,0,0,1364,1362,1,0,0,0,1364,1365,1,0,0,0,1365,1367,1,0,0,0,1366,
        1364,1,0,0,0,1367,1368,5,3,0,0,1368,219,1,0,0,0,1369,1370,5,2,0,
        0,1370,1374,5,25,0,0,1371,1373,3,222,111,0,1372,1371,1,0,0,0,1373,
        1376,1,0,0,0,1374,1372,1,0,0,0,1374,1375,1,0,0,0,1375,1377,1,0,0,
        0,1376,1374,1,0,0,0,1377,1378,5,3,0,0,1378,221,1,0,0,0,1379,1380,
        5,2,0,0,1380,1381,3,230,115,0,1381,1382,3,178,89,0,1382,1383,5,3,
        0,0,1383,1393,1,0,0,0,1384,1385,5,2,0,0,1385,1386,3,230,115,0,1386,
        1387,3,224,112,0,1387,1388,5,3,0,0,1388,1393,1,0,0,0,1389,1390,5,
        2,0,0,1390,1391,5,107,0,0,1391,1393,5,3,0,0,1392,1379,1,0,0,0,1392,
        1384,1,0,0,0,1392,1389,1,0,0,0,1393,223,1,0,0,0,1394,1395,5,2,0,
        0,1395,1396,5,12,0,0,1396,1400,3,252,126,0,1397,1399,3,52,26,0,1398,
        1397,1,0,0,0,1399,1402,1,0,0,0,1400,1398,1,0,0,0,1400,1401,1,0,0,
        0,1401,1403,1,0,0,0,1402,1400,1,0,0,0,1403,1404,5,3,0,0,1404,225,
        1,0,0,0,1405,1406,5,2,0,0,1406,1410,5,27,0,0,1407,1409,3,178,89,
        0,1408,1407,1,0,0,0,1409,1412,1,0,0,0,1410,1408,1,0,0,0,1410,1411,
        1,0,0,0,1411,1413,1,0,0,0,1412,1410,1,0,0,0,1413,1414,5,3,0,0,1414,
        227,1,0,0,0,1415,1416,5,2,0,0,1416,1419,5,68,0,0,1417,1420,5,105,
        0,0,1418,1420,3,178,89,0,1419,1417,1,0,0,0,1419,1418,1,0,0,0,1420,
        1421,1,0,0,0,1421,1419,1,0,0,0,1421,1422,1,0,0,0,1422,1423,1,0,0,
        0,1423,1424,5,3,0,0,1424,229,1,0,0,0,1425,1426,7,2,0,0,1426,231,
        1,0,0,0,1427,1428,5,2,0,0,1428,1429,5,30,0,0,1429,1430,3,178,89,
        0,1430,1431,3,230,115,0,1431,1432,5,3,0,0,1432,233,1,0,0,0,1433,
        1434,5,2,0,0,1434,1435,5,31,0,0,1435,1436,3,178,89,0,1436,1437,3,
        178,89,0,1437,1438,5,3,0,0,1438,235,1,0,0,0,1439,1440,5,2,0,0,1440,
        1441,7,3,0,0,1441,1442,3,178,89,0,1442,1443,5,3,0,0,1443,237,1,0,
        0,0,1444,1445,5,2,0,0,1445,1446,5,36,0,0,1446,1447,3,178,89,0,1447,
        1448,5,3,0,0,1448,239,1,0,0,0,1449,1450,5,2,0,0,1450,1451,5,35,0,
        0,1451,1452,3,178,89,0,1452,1453,5,3,0,0,1453,241,1,0,0,0,1454,1455,
        5,2,0,0,1455,1456,5,29,0,0,1456,1457,3,178,89,0,1457,1458,3,230,
        115,0,1458,1459,5,3,0,0,1459,243,1,0,0,0,1460,1461,5,2,0,0,1461,
        1462,5,28,0,0,1462,1463,3,178,89,0,1463,1464,3,178,89,0,1464,1465,
        5,3,0,0,1465,245,1,0,0,0,1466,1467,5,2,0,0,1467,1468,5,32,0,0,1468,
        1469,3,178,89,0,1469,1470,3,178,89,0,1470,1471,5,3,0,0,1471,247,
        1,0,0,0,1472,1473,5,2,0,0,1473,1475,3,178,89,0,1474,1476,3,250,125,
        0,1475,1474,1,0,0,0,1475,1476,1,0,0,0,1476,1480,1,0,0,0,1477,1479,
        3,178,89,0,1478,1477,1,0,0,0,1479,1482,1,0,0,0,1480,1478,1,0,0,0,
        1480,1481,1,0,0,0,1481,1483,1,0,0,0,1482,1480,1,0,0,0,1483,1484,
        5,3,0,0,1484,249,1,0,0,0,1485,1486,5,2,0,0,1486,1488,5,72,0,0,1487,
        1489,3,108,54,0,1488,1487,1,0,0,0,1489,1490,1,0,0,0,1490,1488,1,
        0,0,0,1490,1491,1,0,0,0,1491,1492,1,0,0,0,1492,1493,5,3,0,0,1493,
        251,1,0,0,0,1494,1511,5,2,0,0,1495,1502,3,254,127,0,1496,1498,5,
        4,0,0,1497,1496,1,0,0,0,1497,1498,1,0,0,0,1498,1499,1,0,0,0,1499,
        1501,3,254,127,0,1500,1497,1,0,0,0,1501,1504,1,0,0,0,1502,1500,1,
        0,0,0,1502,1503,1,0,0,0,1503,1509,1,0,0,0,1504,1502,1,0,0,0,1505,
        1507,5,4,0,0,1506,1505,1,0,0,0,1506,1507,1,0,0,0,1507,1508,1,0,0,
        0,1508,1510,3,256,128,0,1509,1506,1,0,0,0,1509,1510,1,0,0,0,1510,
        1512,1,0,0,0,1511,1495,1,0,0,0,1511,1512,1,0,0,0,1512,1513,1,0,0,
        0,1513,1516,5,3,0,0,1514,1515,5,82,0,0,1515,1517,3,108,54,0,1516,
        1514,1,0,0,0,1516,1517,1,0,0,0,1517,1526,1,0,0,0,1518,1519,5,2,0,
        0,1519,1520,3,256,128,0,1520,1523,5,3,0,0,1521,1522,5,82,0,0,1522,
        1524,3,108,54,0,1523,1521,1,0,0,0,1523,1524,1,0,0,0,1524,1526,1,
        0,0,0,1525,1494,1,0,0,0,1525,1518,1,0,0,0,1526,253,1,0,0,0,1527,
        1528,5,2,0,0,1528,1531,5,107,0,0,1529,1530,5,82,0,0,1530,1532,3,
        108,54,0,1531,1529,1,0,0,0,1531,1532,1,0,0,0,1532,1533,1,0,0,0,1533,
        1534,5,3,0,0,1534,255,1,0,0,0,1535,1536,5,2,0,0,1536,1537,5,69,0,
        0,1537,1540,5,107,0,0,1538,1539,5,82,0,0,1539,1541,3,108,54,0,1540,
        1538,1,0,0,0,1540,1541,1,0,0,0,1541,1542,1,0,0,0,1542,1543,5,3,0,
        0,1543,257,1,0,0,0,1544,1545,7,4,0,0,1545,259,1,0,0,0,122,265,279,
        286,295,310,317,329,343,352,355,365,374,379,382,385,395,399,402,
        417,426,437,446,452,455,465,475,483,493,505,513,523,531,539,543,
        550,555,558,566,587,595,602,619,626,642,652,662,670,682,698,707,
        718,751,758,765,775,795,805,823,832,852,860,870,884,899,904,910,
        920,930,939,944,990,1000,1011,1017,1024,1033,1041,1044,1047,1071,
        1079,1083,1093,1103,1116,1128,1140,1152,1192,1203,1214,1236,1247,
        1258,1269,1280,1291,1304,1320,1332,1351,1359,1364,1374,1392,1400,
        1410,1419,1421,1475,1480,1490,1497,1502,1506,1509,1511,1516,1523,
        1525,1531,1540
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
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.IDENTIFIER, 0)!;
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
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.IDENTIFIER, 0)!;
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
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.IDENTIFIER, 0)!;
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
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage7Parser.IDENTIFIER, 0)!;
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
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
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
