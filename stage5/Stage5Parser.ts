
import * as antlr from "antlr4ng";
import { Token } from "antlr4ng";

import { Stage5Listener } from "./Stage5Listener.js";
// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;


export class Stage5Parser extends antlr.Parser {
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
    public static readonly FOR = 44;
    public static readonly CLASS_BODY = 45;
    public static readonly SUPER_METHOD = 46;
    public static readonly ABSTRACT_METHOD = 47;
    public static readonly CLASS = 48;
    public static readonly FIELD = 49;
    public static readonly CONSTRUCTOR = 50;
    public static readonly THIS = 51;
    public static readonly SUPER = 52;
    public static readonly GET = 53;
    public static readonly SETPROP = 54;
    public static readonly IMPLEMENTS = 55;
    public static readonly UNION = 56;
    public static readonly INTERSECT = 57;
    public static readonly TUPLE = 58;
    public static readonly TYPEFN = 59;
    public static readonly LIT = 60;
    public static readonly KEYOF = 61;
    public static readonly TYPEOF = 62;
    public static readonly TYPE_AS = 63;
    public static readonly INFER = 64;
    public static readonly MAPPED = 65;
    public static readonly TYPE_TEMPLATE = 66;
    public static readonly TEMPLATE = 67;
    public static readonly REST = 68;
    public static readonly READONLY = 69;
    public static readonly TYPE_PARAMS = 70;
    public static readonly TYPE_ARGS = 71;
    public static readonly EXTENDS = 72;
    public static readonly RETURNS = 73;
    public static readonly TYPE = 74;
    public static readonly INTERFACE = 75;
    public static readonly MODIFIERS = 76;
    public static readonly OPTIONAL = 77;
    public static readonly BOOLEAN = 78;
    public static readonly NULL = 79;
    public static readonly UNDEFINED = 80;
    public static readonly COLON = 81;
    public static readonly ASYNC_GENERATOR_FN = 82;
    public static readonly ASYNC_LAMBDA = 83;
    public static readonly ASYNC_FN = 84;
    public static readonly GENERATOR_FN = 85;
    public static readonly YIELD_STAR = 86;
    public static readonly YIELD = 87;
    public static readonly AWAIT = 88;
    public static readonly CARET = 89;
    public static readonly LBRACK = 90;
    public static readonly RBRACK = 91;
    public static readonly EXPORT = 92;
    public static readonly EXPORT_DEFAULT = 93;
    public static readonly EXPORT_NAMED = 94;
    public static readonly EXPORT_NS_FROM = 95;
    public static readonly EXPORT_FROM = 96;
    public static readonly EXPORT_ALL_FROM = 97;
    public static readonly IMPORT_TYPE = 98;
    public static readonly EXPORT_TYPE_ALL_FROM = 99;
    public static readonly EXPORT_TYPE_FROM = 100;
    public static readonly EXPORT_TYPE = 101;
    public static readonly KEYWORD = 102;
    public static readonly NUMBER = 103;
    public static readonly STRING = 104;
    public static readonly MULTILINE_STRING = 105;
    public static readonly IDENTIFIER = 106;
    public static readonly WS = 107;
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
    public static readonly RULE_expression = 88;
    public static readonly RULE_thisExpr = 89;
    public static readonly RULE_superExpr = 90;
    public static readonly RULE_superConstructorCall = 91;
    public static readonly RULE_superMethodCall = 92;
    public static readonly RULE_typeofExpr = 93;
    public static readonly RULE_typeAssert = 94;
    public static readonly RULE_lambda = 95;
    public static readonly RULE_fn = 96;
    public static readonly RULE_asyncLambda = 97;
    public static readonly RULE_asyncFn = 98;
    public static readonly RULE_generatorFn = 99;
    public static readonly RULE_asyncGeneratorFn = 100;
    public static readonly RULE_awaitExpr = 101;
    public static readonly RULE_yieldExpr = 102;
    public static readonly RULE_yieldStarExpr = 103;
    public static readonly RULE_bindExpr = 104;
    public static readonly RULE_methodCallExpr = 105;
    public static readonly RULE_ternary = 106;
    public static readonly RULE_condExpr = 107;
    public static readonly RULE_newForm = 108;
    public static readonly RULE_objectExpr = 109;
    public static readonly RULE_objectField = 110;
    public static readonly RULE_methodDef = 111;
    public static readonly RULE_arrayExpr = 112;
    public static readonly RULE_templateExpr = 113;
    public static readonly RULE_propKey = 114;
    public static readonly RULE_propAccess = 115;
    public static readonly RULE_indexAccess = 116;
    public static readonly RULE_quasiquote = 117;
    public static readonly RULE_unquote = 118;
    public static readonly RULE_unquoteSplicing = 119;
    public static readonly RULE_optChain = 120;
    public static readonly RULE_optChainIndex = 121;
    public static readonly RULE_nullCoalesce = 122;
    public static readonly RULE_call = 123;
    public static readonly RULE_typeArgs = 124;
    public static readonly RULE_fnSignature = 125;
    public static readonly RULE_param = 126;
    public static readonly RULE_restParam = 127;
    public static readonly RULE_literal = 128;

    public static readonly literalNames = [
        null, null, "'('", "')'", "','", "'program'", "'let*'", "'let'", 
        "'const*'", "'const'", "'lambda'", "'fn'", "'method'", "'bind'", 
        "'method-call'", "'defmacro'", "'#[macro-time]'", "'if'", "'while'", 
        "'begin'", "'return'", "'throw'", "'set!'", "'ternary'", "'cond'", 
        "'object'", "'type-array'", "'array'", "'optchain-index'", "'.?'", 
        "'.'", "'index'", "'??'", "'quasi'", "'quote'", "'unquote-splicing'", 
        "'unquote'", "'new'", "'import'", "'switch'", "'case'", "'default'", 
        "'for-in'", "'for-of'", "'for'", "'class-body'", "'super-method'", 
        "'abstract-method'", "'class'", "'field'", "'constructor'", "'this'", 
        "'super'", "'get'", "'set'", "'implements'", "'union'", "'intersect'", 
        "'tuple'", "'tfn'", "'tlit'", "'keyof'", "'typeof'", "'type-as'", 
        "'infer'", "'mapped'", "'type-template'", "'template'", "'rest'", 
        "'readonly'", "'type-params'", "'type-args'", "'extends'", "'returns'", 
        "'type'", "'interface'", "'modifiers'", "'?'", null, "'null'", "'undefined'", 
        "':'", "'async-generator-fn'", "'async-lambda'", "'async-fn'", "'generator-fn'", 
        "'yield*'", "'yield'", "'await'", "'^'", "'['", "']'", "'export'", 
        "'export-default'", "'export-named'", "'export-ns-from'", "'export-from'", 
        "'export-all-from'", "'import-type'", "'export-type-all-from'", 
        "'export-type-from'", "'export-type'"
    ];

    public static readonly symbolicNames = [
        null, "COMMENT", "LPAREN", "RPAREN", "COMMA", "PROGRAM", "LETSTAR", 
        "LET", "CONSTSTAR", "CONST", "LAMBDA", "FN", "METHOD", "BIND", "METHOD_CALL", 
        "DEFMACRO", "MACRO_TIME_ATTR", "IF", "WHILE", "BEGIN", "RETURN", 
        "THROW", "SET", "TERNARY", "COND", "OBJECT", "TYPE_ARRAY", "ARRAY", 
        "OPTCHAIN_INDEX", "OPTCHAIN", "DOT", "INDEX", "NULLCOAL", "QUASI", 
        "QUOTE", "UNQUOTE_SPLICING", "UNQUOTE", "NEW", "IMPORT", "SWITCH", 
        "CASE", "DEFAULT", "FORIN", "FOROF", "FOR", "CLASS_BODY", "SUPER_METHOD", 
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
        "NUMBER", "STRING", "MULTILINE_STRING", "IDENTIFIER", "WS"
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
        "forOfForm", "expression", "thisExpr", "superExpr", "superConstructorCall", 
        "superMethodCall", "typeofExpr", "typeAssert", "lambda", "fn", "asyncLambda", 
        "asyncFn", "generatorFn", "asyncGeneratorFn", "awaitExpr", "yieldExpr", 
        "yieldStarExpr", "bindExpr", "methodCallExpr", "ternary", "condExpr", 
        "newForm", "objectExpr", "objectField", "methodDef", "arrayExpr", 
        "templateExpr", "propKey", "propAccess", "indexAccess", "quasiquote", 
        "unquote", "unquoteSplicing", "optChain", "optChainIndex", "nullCoalesce", 
        "call", "typeArgs", "fnSignature", "param", "restParam", "literal",
    ];

    public get grammarFileName(): string { return "Stage5.g4"; }
    public get literalNames(): (string | null)[] { return Stage5Parser.literalNames; }
    public get symbolicNames(): (string | null)[] { return Stage5Parser.symbolicNames; }
    public get ruleNames(): string[] { return Stage5Parser.ruleNames; }
    public get serializedATN(): number[] { return Stage5Parser._serializedATN; }

    protected createFailedPredicateException(predicate?: string, message?: string): antlr.FailedPredicateException {
        return new antlr.FailedPredicateException(this, predicate, message);
    }

    public constructor(input: antlr.TokenStream) {
        super(input);
        this.interpreter = new antlr.ParserATNSimulator(this, Stage5Parser._ATN, Stage5Parser.decisionsToDFA, new antlr.PredictionContextCache());
    }
    public program(): ProgramContext {
        let localContext = new ProgramContext(this.context, this.state);
        this.enterRule(localContext, 0, Stage5Parser.RULE_program);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 258;
            this.match(Stage5Parser.LPAREN);
            this.state = 259;
            this.match(Stage5Parser.PROGRAM);
            this.state = 263;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 51)) & ~0x1F) === 0 && ((1 << (_la - 51)) & 939524099) !== 0) || ((((_la - 102)) & ~0x1F) === 0 && ((1 << (_la - 102)) & 23) !== 0)) {
                {
                {
                this.state = 260;
                this.topLevel();
                }
                }
                this.state = 265;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 266;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 2, Stage5Parser.RULE_topLevel);
        try {
            this.state = 277;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 1, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 268;
                this.defmacro();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 269;
                this.macroTimeFnDef();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 270;
                this.topLevelLet();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 271;
                this.topLevelConst();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 272;
                this.typeAlias();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 273;
                this.interfaceDef();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 274;
                this.classDef();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 275;
                this.exportDeclForm();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 276;
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
        this.enterRule(localContext, 4, Stage5Parser.RULE_decl);
        try {
            this.state = 284;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 2, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 279;
                this.topLevelLet();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 280;
                this.topLevelConst();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 281;
                this.classDef();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 282;
                this.interfaceDef();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 283;
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
        this.enterRule(localContext, 6, Stage5Parser.RULE_defmacro);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 286;
            this.match(Stage5Parser.LPAREN);
            this.state = 287;
            this.match(Stage5Parser.DEFMACRO);
            this.state = 288;
            this.match(Stage5Parser.IDENTIFIER);
            this.state = 289;
            this.fnSignature();
            this.state = 293;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 51)) & ~0x1F) === 0 && ((1 << (_la - 51)) & 939524099) !== 0) || ((((_la - 102)) & ~0x1F) === 0 && ((1 << (_la - 102)) & 23) !== 0)) {
                {
                {
                this.state = 290;
                this.statement();
                }
                }
                this.state = 295;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 296;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 8, Stage5Parser.RULE_macroTimeFnDef);
        try {
            this.state = 308;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 4, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 298;
                this.match(Stage5Parser.LPAREN);
                this.state = 299;
                this.match(Stage5Parser.MACRO_TIME_ATTR);
                this.state = 300;
                this.topLevelLet();
                this.state = 301;
                this.match(Stage5Parser.RPAREN);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 303;
                this.match(Stage5Parser.LPAREN);
                this.state = 304;
                this.match(Stage5Parser.MACRO_TIME_ATTR);
                this.state = 305;
                this.topLevelConst();
                this.state = 306;
                this.match(Stage5Parser.RPAREN);
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
        this.enterRule(localContext, 10, Stage5Parser.RULE_topLevelLet);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 310;
            this.match(Stage5Parser.LPAREN);
            this.state = 311;
            this.match(Stage5Parser.LET);
            this.state = 315;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 89) {
                {
                {
                this.state = 312;
                this.metaAnnotation();
                }
                }
                this.state = 317;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 318;
            this.match(Stage5Parser.IDENTIFIER);
            this.state = 319;
            this.expression();
            this.state = 320;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 12, Stage5Parser.RULE_topLevelConst);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 322;
            this.match(Stage5Parser.LPAREN);
            this.state = 323;
            this.match(Stage5Parser.CONST);
            this.state = 327;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 89) {
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
            this.match(Stage5Parser.IDENTIFIER);
            this.state = 331;
            this.expression();
            this.state = 332;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 14, Stage5Parser.RULE_metaAnnotation);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 334;
            this.match(Stage5Parser.CARET);
            this.state = 335;
            this.match(Stage5Parser.KEYWORD);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 16, Stage5Parser.RULE_typeAlias);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 337;
            this.match(Stage5Parser.LPAREN);
            this.state = 338;
            this.match(Stage5Parser.TYPE);
            this.state = 339;
            this.match(Stage5Parser.IDENTIFIER);
            this.state = 341;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 7, this.context) ) {
            case 1:
                {
                this.state = 340;
                this.typeParams();
                }
                break;
            }
            this.state = 343;
            this.typeExpr();
            this.state = 344;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 18, Stage5Parser.RULE_interfaceDef);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 346;
            this.match(Stage5Parser.LPAREN);
            this.state = 347;
            this.match(Stage5Parser.INTERFACE);
            this.state = 348;
            this.match(Stage5Parser.IDENTIFIER);
            this.state = 350;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 8, this.context) ) {
            case 1:
                {
                this.state = 349;
                this.typeParams();
                }
                break;
            }
            this.state = 353;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 9, this.context) ) {
            case 1:
                {
                this.state = 352;
                this.interfaceExtends();
                }
                break;
            }
            this.state = 355;
            this.typeObject();
            this.state = 356;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 20, Stage5Parser.RULE_interfaceExtends);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 358;
            this.match(Stage5Parser.LPAREN);
            this.state = 359;
            this.match(Stage5Parser.EXTENDS);
            this.state = 361;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 360;
                this.typeExpr();
                }
                }
                this.state = 363;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 106);
            this.state = 365;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 22, Stage5Parser.RULE_classDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 367;
            this.match(Stage5Parser.LPAREN);
            this.state = 368;
            this.match(Stage5Parser.CLASS);
            this.state = 372;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 102) {
                {
                {
                this.state = 369;
                this.modifier();
                }
                }
                this.state = 374;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 375;
            this.match(Stage5Parser.IDENTIFIER);
            this.state = 377;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 12, this.context) ) {
            case 1:
                {
                this.state = 376;
                this.typeParams();
                }
                break;
            }
            this.state = 380;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 13, this.context) ) {
            case 1:
                {
                this.state = 379;
                this.classExtends();
                }
                break;
            }
            this.state = 383;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 14, this.context) ) {
            case 1:
                {
                this.state = 382;
                this.classImplements();
                }
                break;
            }
            this.state = 385;
            this.classBody();
            this.state = 386;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 24, Stage5Parser.RULE_anonClassDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 388;
            this.match(Stage5Parser.LPAREN);
            this.state = 389;
            this.match(Stage5Parser.CLASS);
            this.state = 393;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 102) {
                {
                {
                this.state = 390;
                this.modifier();
                }
                }
                this.state = 395;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 397;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 16, this.context) ) {
            case 1:
                {
                this.state = 396;
                this.classExtends();
                }
                break;
            }
            this.state = 400;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 17, this.context) ) {
            case 1:
                {
                this.state = 399;
                this.classImplements();
                }
                break;
            }
            this.state = 402;
            this.classBody();
            this.state = 403;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 26, Stage5Parser.RULE_classExtends);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 405;
            this.match(Stage5Parser.LPAREN);
            this.state = 406;
            this.match(Stage5Parser.EXTENDS);
            this.state = 407;
            this.typeExpr();
            this.state = 408;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 28, Stage5Parser.RULE_classImplements);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 410;
            this.match(Stage5Parser.LPAREN);
            this.state = 411;
            this.match(Stage5Parser.IMPLEMENTS);
            this.state = 413;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 412;
                this.typeExpr();
                }
                }
                this.state = 415;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 106);
            this.state = 417;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 30, Stage5Parser.RULE_classBody);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 419;
            this.match(Stage5Parser.LPAREN);
            this.state = 420;
            this.match(Stage5Parser.CLASS_BODY);
            this.state = 424;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 421;
                this.classElement();
                }
                }
                this.state = 426;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 427;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 32, Stage5Parser.RULE_classElement);
        try {
            this.state = 435;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 20, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 429;
                this.fieldDef();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 430;
                this.constructorDef();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 431;
                this.classMethodDef();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 432;
                this.abstractMethodDef();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 433;
                this.getterDef();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 434;
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
        this.enterRule(localContext, 34, Stage5Parser.RULE_modifier);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 437;
            this.match(Stage5Parser.KEYWORD);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 36, Stage5Parser.RULE_fieldDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 439;
            this.match(Stage5Parser.LPAREN);
            this.state = 440;
            this.match(Stage5Parser.FIELD);
            this.state = 444;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 102) {
                {
                {
                this.state = 441;
                this.modifier();
                }
                }
                this.state = 446;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 447;
            this.match(Stage5Parser.IDENTIFIER);
            this.state = 450;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 81) {
                {
                this.state = 448;
                this.match(Stage5Parser.COLON);
                this.state = 449;
                this.typeExpr();
                }
            }

            this.state = 453;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2 || ((((_la - 51)) & ~0x1F) === 0 && ((1 << (_la - 51)) & 939524099) !== 0) || ((((_la - 102)) & ~0x1F) === 0 && ((1 << (_la - 102)) & 23) !== 0)) {
                {
                this.state = 452;
                this.expression();
                }
            }

            this.state = 455;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 38, Stage5Parser.RULE_constructorDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 457;
            this.match(Stage5Parser.LPAREN);
            this.state = 458;
            this.match(Stage5Parser.CONSTRUCTOR);
            this.state = 459;
            this.fnSignatureTyped();
            this.state = 463;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 51)) & ~0x1F) === 0 && ((1 << (_la - 51)) & 939524099) !== 0) || ((((_la - 102)) & ~0x1F) === 0 && ((1 << (_la - 102)) & 23) !== 0)) {
                {
                {
                this.state = 460;
                this.statement();
                }
                }
                this.state = 465;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 466;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 40, Stage5Parser.RULE_classMethodDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 468;
            this.match(Stage5Parser.LPAREN);
            this.state = 469;
            this.match(Stage5Parser.METHOD);
            this.state = 473;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 102) {
                {
                {
                this.state = 470;
                this.modifier();
                }
                }
                this.state = 475;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 476;
            this.match(Stage5Parser.IDENTIFIER);
            this.state = 477;
            this.fnSignatureTyped();
            this.state = 481;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 51)) & ~0x1F) === 0 && ((1 << (_la - 51)) & 939524099) !== 0) || ((((_la - 102)) & ~0x1F) === 0 && ((1 << (_la - 102)) & 23) !== 0)) {
                {
                {
                this.state = 478;
                this.statement();
                }
                }
                this.state = 483;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 484;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 42, Stage5Parser.RULE_abstractMethodDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 486;
            this.match(Stage5Parser.LPAREN);
            this.state = 487;
            this.match(Stage5Parser.ABSTRACT_METHOD);
            this.state = 491;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 102) {
                {
                {
                this.state = 488;
                this.modifier();
                }
                }
                this.state = 493;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 494;
            this.match(Stage5Parser.IDENTIFIER);
            this.state = 495;
            this.fnSignatureTyped();
            this.state = 496;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 44, Stage5Parser.RULE_getterDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 498;
            this.match(Stage5Parser.LPAREN);
            this.state = 499;
            this.match(Stage5Parser.GET);
            this.state = 503;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 102) {
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
            this.match(Stage5Parser.IDENTIFIER);
            this.state = 507;
            this.fnSignatureTyped();
            this.state = 511;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 51)) & ~0x1F) === 0 && ((1 << (_la - 51)) & 939524099) !== 0) || ((((_la - 102)) & ~0x1F) === 0 && ((1 << (_la - 102)) & 23) !== 0)) {
                {
                {
                this.state = 508;
                this.statement();
                }
                }
                this.state = 513;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 514;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 46, Stage5Parser.RULE_setterDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 516;
            this.match(Stage5Parser.LPAREN);
            this.state = 517;
            this.match(Stage5Parser.SETPROP);
            this.state = 521;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 102) {
                {
                {
                this.state = 518;
                this.modifier();
                }
                }
                this.state = 523;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 524;
            this.match(Stage5Parser.IDENTIFIER);
            this.state = 525;
            this.fnSignatureTyped();
            this.state = 529;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 51)) & ~0x1F) === 0 && ((1 << (_la - 51)) & 939524099) !== 0) || ((((_la - 102)) & ~0x1F) === 0 && ((1 << (_la - 102)) & 23) !== 0)) {
                {
                {
                this.state = 526;
                this.statement();
                }
                }
                this.state = 531;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 532;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 48, Stage5Parser.RULE_typedParam);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 534;
            this.match(Stage5Parser.LPAREN);
            this.state = 535;
            this.match(Stage5Parser.IDENTIFIER);
            this.state = 537;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 77) {
                {
                this.state = 536;
                this.match(Stage5Parser.OPTIONAL);
                }
            }

            this.state = 541;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 81) {
                {
                this.state = 539;
                this.match(Stage5Parser.COLON);
                this.state = 540;
                this.typeExpr();
                }
            }

            this.state = 543;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 50, Stage5Parser.RULE_fnSignatureTyped);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 545;
            this.match(Stage5Parser.LPAREN);
            this.state = 556;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2) {
                {
                this.state = 546;
                this.typedParam();
                this.state = 553;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 2 || _la === 4) {
                    {
                    {
                    this.state = 548;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    if (_la === 4) {
                        {
                        this.state = 547;
                        this.match(Stage5Parser.COMMA);
                        }
                    }

                    this.state = 550;
                    this.typedParam();
                    }
                    }
                    this.state = 555;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
            }

            this.state = 558;
            this.match(Stage5Parser.RPAREN);
            this.state = 564;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 37, this.context) ) {
            case 1:
                {
                this.state = 559;
                this.match(Stage5Parser.LPAREN);
                this.state = 560;
                this.match(Stage5Parser.RETURNS);
                this.state = 561;
                this.typeExpr();
                this.state = 562;
                this.match(Stage5Parser.RPAREN);
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
        this.enterRule(localContext, 52, Stage5Parser.RULE_statement);
        try {
            this.state = 584;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 38, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 566;
                this.letStar();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 567;
                this.letStmt();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 568;
                this.constStar();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 569;
                this.constStmt();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 570;
                this.ifForm();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 571;
                this.whileForm();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 572;
                this.block();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 573;
                this.returnForm();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 574;
                this.throwForm();
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 575;
                this.importForm();
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 576;
                this.importTypeForm();
                }
                break;
            case 12:
                this.enterOuterAlt(localContext, 12);
                {
                this.state = 577;
                this.exportForm();
                }
                break;
            case 13:
                this.enterOuterAlt(localContext, 13);
                {
                this.state = 578;
                this.switchForm();
                }
                break;
            case 14:
                this.enterOuterAlt(localContext, 14);
                {
                this.state = 579;
                this.forForm();
                }
                break;
            case 15:
                this.enterOuterAlt(localContext, 15);
                {
                this.state = 580;
                this.forInForm();
                }
                break;
            case 16:
                this.enterOuterAlt(localContext, 16);
                {
                this.state = 581;
                this.forOfForm();
                }
                break;
            case 17:
                this.enterOuterAlt(localContext, 17);
                {
                this.state = 582;
                this.assign();
                }
                break;
            case 18:
                this.enterOuterAlt(localContext, 18);
                {
                this.state = 583;
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
        this.enterRule(localContext, 54, Stage5Parser.RULE_letStar);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 586;
            this.match(Stage5Parser.LPAREN);
            this.state = 587;
            this.match(Stage5Parser.LETSTAR);
            this.state = 588;
            this.match(Stage5Parser.LPAREN);
            this.state = 592;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 589;
                this.starBinding();
                }
                }
                this.state = 594;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 595;
            this.match(Stage5Parser.RPAREN);
            this.state = 599;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 51)) & ~0x1F) === 0 && ((1 << (_la - 51)) & 939524099) !== 0) || ((((_la - 102)) & ~0x1F) === 0 && ((1 << (_la - 102)) & 23) !== 0)) {
                {
                {
                this.state = 596;
                this.statement();
                }
                }
                this.state = 601;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 602;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 56, Stage5Parser.RULE_letStmt);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 604;
            this.match(Stage5Parser.LPAREN);
            this.state = 605;
            this.match(Stage5Parser.LET);
            this.state = 606;
            this.singleBinding();
            this.state = 607;
            this.expression();
            this.state = 608;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 58, Stage5Parser.RULE_constStar);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 610;
            this.match(Stage5Parser.LPAREN);
            this.state = 611;
            this.match(Stage5Parser.CONSTSTAR);
            this.state = 612;
            this.match(Stage5Parser.LPAREN);
            this.state = 616;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 613;
                this.starBinding();
                }
                }
                this.state = 618;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 619;
            this.match(Stage5Parser.RPAREN);
            this.state = 623;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 51)) & ~0x1F) === 0 && ((1 << (_la - 51)) & 939524099) !== 0) || ((((_la - 102)) & ~0x1F) === 0 && ((1 << (_la - 102)) & 23) !== 0)) {
                {
                {
                this.state = 620;
                this.statement();
                }
                }
                this.state = 625;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 626;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 60, Stage5Parser.RULE_constStmt);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 628;
            this.match(Stage5Parser.LPAREN);
            this.state = 629;
            this.match(Stage5Parser.CONST);
            this.state = 630;
            this.singleBinding();
            this.state = 631;
            this.expression();
            this.state = 632;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 62, Stage5Parser.RULE_ifForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 634;
            this.match(Stage5Parser.LPAREN);
            this.state = 635;
            this.match(Stage5Parser.IF);
            this.state = 636;
            this.expression();
            this.state = 637;
            this.statement();
            this.state = 639;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2 || ((((_la - 51)) & ~0x1F) === 0 && ((1 << (_la - 51)) & 939524099) !== 0) || ((((_la - 102)) & ~0x1F) === 0 && ((1 << (_la - 102)) & 23) !== 0)) {
                {
                this.state = 638;
                this.statement();
                }
            }

            this.state = 641;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 64, Stage5Parser.RULE_whileForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 643;
            this.match(Stage5Parser.LPAREN);
            this.state = 644;
            this.match(Stage5Parser.WHILE);
            this.state = 645;
            this.expression();
            this.state = 649;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 51)) & ~0x1F) === 0 && ((1 << (_la - 51)) & 939524099) !== 0) || ((((_la - 102)) & ~0x1F) === 0 && ((1 << (_la - 102)) & 23) !== 0)) {
                {
                {
                this.state = 646;
                this.statement();
                }
                }
                this.state = 651;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 652;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 66, Stage5Parser.RULE_block);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 654;
            this.match(Stage5Parser.LPAREN);
            this.state = 655;
            this.match(Stage5Parser.BEGIN);
            this.state = 659;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 51)) & ~0x1F) === 0 && ((1 << (_la - 51)) & 939524099) !== 0) || ((((_la - 102)) & ~0x1F) === 0 && ((1 << (_la - 102)) & 23) !== 0)) {
                {
                {
                this.state = 656;
                this.statement();
                }
                }
                this.state = 661;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 662;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 68, Stage5Parser.RULE_returnForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 664;
            this.match(Stage5Parser.LPAREN);
            this.state = 665;
            this.match(Stage5Parser.RETURN);
            this.state = 667;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2 || ((((_la - 51)) & ~0x1F) === 0 && ((1 << (_la - 51)) & 939524099) !== 0) || ((((_la - 102)) & ~0x1F) === 0 && ((1 << (_la - 102)) & 23) !== 0)) {
                {
                this.state = 666;
                this.expression();
                }
            }

            this.state = 669;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 70, Stage5Parser.RULE_throwForm);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 671;
            this.match(Stage5Parser.LPAREN);
            this.state = 672;
            this.match(Stage5Parser.THROW);
            this.state = 673;
            this.expression();
            this.state = 674;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 72, Stage5Parser.RULE_importForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 676;
            this.match(Stage5Parser.LPAREN);
            this.state = 677;
            this.match(Stage5Parser.IMPORT);
            this.state = 679;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2) {
                {
                this.state = 678;
                this.objectExpr();
                }
            }

            this.state = 681;
            this.match(Stage5Parser.STRING);
            this.state = 682;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 74, Stage5Parser.RULE_importTypeForm);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 684;
            this.match(Stage5Parser.LPAREN);
            this.state = 685;
            this.match(Stage5Parser.IMPORT_TYPE);
            this.state = 686;
            this.importTypeSpec();
            this.state = 687;
            this.match(Stage5Parser.STRING);
            this.state = 688;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 76, Stage5Parser.RULE_importTypeSpec);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 690;
            this.match(Stage5Parser.LPAREN);
            this.state = 691;
            this.match(Stage5Parser.IDENTIFIER);
            this.state = 693;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 692;
                this.importTypeName();
                }
                }
                this.state = 695;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 106);
            this.state = 697;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 78, Stage5Parser.RULE_importTypeName);
        try {
            this.state = 704;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case Stage5Parser.IDENTIFIER:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 699;
                this.match(Stage5Parser.IDENTIFIER);
                }
                break;
            case Stage5Parser.LPAREN:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 700;
                this.match(Stage5Parser.LPAREN);
                this.state = 701;
                this.match(Stage5Parser.IDENTIFIER);
                this.state = 702;
                this.match(Stage5Parser.IDENTIFIER);
                this.state = 703;
                this.match(Stage5Parser.RPAREN);
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
        this.enterRule(localContext, 80, Stage5Parser.RULE_exportForm);
        try {
            this.state = 715;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 50, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 706;
                this.exportBinding();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 707;
                this.exportDefault();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 708;
                this.exportNamed();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 709;
                this.exportNsFromForm();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 710;
                this.exportFrom();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 711;
                this.exportAllFrom();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 712;
                this.exportTypeForm();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 713;
                this.exportTypeFromForm();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 714;
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
        this.enterRule(localContext, 82, Stage5Parser.RULE_exportBinding);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 717;
            this.match(Stage5Parser.LPAREN);
            this.state = 718;
            this.match(Stage5Parser.EXPORT);
            this.state = 719;
            this.match(Stage5Parser.IDENTIFIER);
            this.state = 720;
            this.expression();
            this.state = 721;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 84, Stage5Parser.RULE_exportDefault);
        try {
            this.state = 748;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 51, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 723;
                this.match(Stage5Parser.LPAREN);
                this.state = 724;
                this.match(Stage5Parser.EXPORT_DEFAULT);
                this.state = 725;
                this.classDef();
                this.state = 726;
                this.match(Stage5Parser.RPAREN);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 728;
                this.match(Stage5Parser.LPAREN);
                this.state = 729;
                this.match(Stage5Parser.EXPORT_DEFAULT);
                this.state = 730;
                this.anonClassDef();
                this.state = 731;
                this.match(Stage5Parser.RPAREN);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 733;
                this.match(Stage5Parser.LPAREN);
                this.state = 734;
                this.match(Stage5Parser.EXPORT_DEFAULT);
                this.state = 735;
                this.topLevelLet();
                this.state = 736;
                this.match(Stage5Parser.RPAREN);
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 738;
                this.match(Stage5Parser.LPAREN);
                this.state = 739;
                this.match(Stage5Parser.EXPORT_DEFAULT);
                this.state = 740;
                this.topLevelConst();
                this.state = 741;
                this.match(Stage5Parser.RPAREN);
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 743;
                this.match(Stage5Parser.LPAREN);
                this.state = 744;
                this.match(Stage5Parser.EXPORT_DEFAULT);
                this.state = 745;
                this.expression();
                this.state = 746;
                this.match(Stage5Parser.RPAREN);
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
        this.enterRule(localContext, 86, Stage5Parser.RULE_exportNamed);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 750;
            this.match(Stage5Parser.LPAREN);
            this.state = 751;
            this.match(Stage5Parser.EXPORT_NAMED);
            this.state = 753;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 752;
                this.exportNamePair();
                }
                }
                this.state = 755;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2);
            this.state = 757;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 88, Stage5Parser.RULE_exportNamePair);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 759;
            this.match(Stage5Parser.LPAREN);
            this.state = 760;
            this.match(Stage5Parser.IDENTIFIER);
            this.state = 762;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 106) {
                {
                this.state = 761;
                this.match(Stage5Parser.IDENTIFIER);
                }
            }

            this.state = 764;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 90, Stage5Parser.RULE_exportFrom);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 766;
            this.match(Stage5Parser.LPAREN);
            this.state = 767;
            this.match(Stage5Parser.EXPORT_FROM);
            this.state = 768;
            this.match(Stage5Parser.STRING);
            this.state = 770;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 769;
                this.exportNamePair();
                }
                }
                this.state = 772;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2);
            this.state = 774;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 92, Stage5Parser.RULE_exportAllFrom);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 776;
            this.match(Stage5Parser.LPAREN);
            this.state = 777;
            this.match(Stage5Parser.EXPORT_ALL_FROM);
            this.state = 778;
            this.match(Stage5Parser.STRING);
            this.state = 779;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 94, Stage5Parser.RULE_exportNsFromForm);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 781;
            this.match(Stage5Parser.LPAREN);
            this.state = 782;
            this.match(Stage5Parser.EXPORT_NS_FROM);
            this.state = 783;
            this.match(Stage5Parser.STRING);
            this.state = 784;
            this.match(Stage5Parser.STRING);
            this.state = 785;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 96, Stage5Parser.RULE_exportTypeForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 787;
            this.match(Stage5Parser.LPAREN);
            this.state = 788;
            this.match(Stage5Parser.EXPORT_TYPE);
            this.state = 790;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 789;
                this.exportNamePair();
                }
                }
                this.state = 792;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2);
            this.state = 794;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 98, Stage5Parser.RULE_exportTypeFromForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 796;
            this.match(Stage5Parser.LPAREN);
            this.state = 797;
            this.match(Stage5Parser.EXPORT_TYPE_FROM);
            this.state = 798;
            this.match(Stage5Parser.STRING);
            this.state = 800;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 799;
                this.exportNamePair();
                }
                }
                this.state = 802;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2);
            this.state = 804;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 100, Stage5Parser.RULE_exportTypeAllFromForm);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 806;
            this.match(Stage5Parser.LPAREN);
            this.state = 807;
            this.match(Stage5Parser.EXPORT_TYPE_ALL_FROM);
            this.state = 808;
            this.match(Stage5Parser.STRING);
            this.state = 809;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 102, Stage5Parser.RULE_exportDeclForm);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 811;
            this.match(Stage5Parser.LPAREN);
            this.state = 812;
            this.match(Stage5Parser.EXPORT);
            this.state = 813;
            this.decl();
            this.state = 814;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 104, Stage5Parser.RULE_starBinding);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 816;
            this.match(Stage5Parser.LPAREN);
            this.state = 817;
            this.match(Stage5Parser.IDENTIFIER);
            this.state = 820;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 81) {
                {
                this.state = 818;
                this.match(Stage5Parser.COLON);
                this.state = 819;
                this.typeExpr();
                }
            }

            this.state = 822;
            this.expression();
            this.state = 823;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 106, Stage5Parser.RULE_singleBinding);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 825;
            this.match(Stage5Parser.LPAREN);
            this.state = 826;
            this.match(Stage5Parser.IDENTIFIER);
            this.state = 829;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 81) {
                {
                this.state = 827;
                this.match(Stage5Parser.COLON);
                this.state = 828;
                this.typeExpr();
                }
            }

            this.state = 831;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 108, Stage5Parser.RULE_typeExpr);
        try {
            this.state = 849;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 59, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 833;
                this.match(Stage5Parser.IDENTIFIER);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 834;
                this.typeUnion();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 835;
                this.typeIntersection();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 836;
                this.typeArray();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 837;
                this.typeTuple();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 838;
                this.typeFunction();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 839;
                this.typeObject();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 840;
                this.typeLiteral();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 841;
                this.typeKeyof();
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 842;
                this.typeTypeof();
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 843;
                this.typeIndexAccess();
                }
                break;
            case 12:
                this.enterOuterAlt(localContext, 12);
                {
                this.state = 844;
                this.typeConditional();
                }
                break;
            case 13:
                this.enterOuterAlt(localContext, 13);
                {
                this.state = 845;
                this.typeInfer();
                }
                break;
            case 14:
                this.enterOuterAlt(localContext, 14);
                {
                this.state = 846;
                this.typeMapped();
                }
                break;
            case 15:
                this.enterOuterAlt(localContext, 15);
                {
                this.state = 847;
                this.typeTemplateLiteral();
                }
                break;
            case 16:
                this.enterOuterAlt(localContext, 16);
                {
                this.state = 848;
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
        this.enterRule(localContext, 110, Stage5Parser.RULE_typeUnion);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 851;
            this.match(Stage5Parser.LPAREN);
            this.state = 852;
            this.match(Stage5Parser.UNION);
            this.state = 853;
            this.typeExpr();
            this.state = 855;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 854;
                this.typeExpr();
                }
                }
                this.state = 857;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 106);
            this.state = 859;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 112, Stage5Parser.RULE_typeIntersection);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 861;
            this.match(Stage5Parser.LPAREN);
            this.state = 862;
            this.match(Stage5Parser.INTERSECT);
            this.state = 863;
            this.typeExpr();
            this.state = 865;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 864;
                this.typeExpr();
                }
                }
                this.state = 867;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 106);
            this.state = 869;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 114, Stage5Parser.RULE_typeArray);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 871;
            this.match(Stage5Parser.LPAREN);
            this.state = 872;
            this.match(Stage5Parser.TYPE_ARRAY);
            this.state = 873;
            this.typeExpr();
            this.state = 874;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 116, Stage5Parser.RULE_typeTuple);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 876;
            this.match(Stage5Parser.LPAREN);
            this.state = 877;
            this.match(Stage5Parser.TUPLE);
            this.state = 879;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 878;
                this.typeTupleElement();
                }
                }
                this.state = 881;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 106);
            this.state = 883;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 118, Stage5Parser.RULE_typeTupleElement);
        try {
            this.state = 896;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 63, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 885;
                this.match(Stage5Parser.LPAREN);
                this.state = 886;
                this.match(Stage5Parser.REST);
                this.state = 887;
                this.typeExpr();
                this.state = 888;
                this.match(Stage5Parser.RPAREN);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 890;
                this.match(Stage5Parser.LPAREN);
                this.state = 891;
                this.match(Stage5Parser.IDENTIFIER);
                this.state = 892;
                this.typeExpr();
                this.state = 893;
                this.match(Stage5Parser.RPAREN);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 895;
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
        this.enterRule(localContext, 120, Stage5Parser.RULE_typeFunction);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 898;
            this.match(Stage5Parser.LPAREN);
            this.state = 899;
            this.match(Stage5Parser.TYPEFN);
            this.state = 901;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 64, this.context) ) {
            case 1:
                {
                this.state = 900;
                this.typeParams();
                }
                break;
            }
            this.state = 903;
            this.match(Stage5Parser.LPAREN);
            this.state = 907;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 904;
                this.typeFnParam();
                }
                }
                this.state = 909;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 910;
            this.match(Stage5Parser.RPAREN);
            this.state = 911;
            this.typeExpr();
            this.state = 912;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 122, Stage5Parser.RULE_typeFnParam);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 914;
            this.match(Stage5Parser.LPAREN);
            this.state = 915;
            this.match(Stage5Parser.IDENTIFIER);
            this.state = 917;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 77) {
                {
                this.state = 916;
                this.match(Stage5Parser.OPTIONAL);
                }
            }

            this.state = 919;
            this.typeExpr();
            this.state = 920;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 124, Stage5Parser.RULE_typeObject);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 922;
            this.match(Stage5Parser.LPAREN);
            this.state = 923;
            this.match(Stage5Parser.IDENTIFIER);
            this.state = 927;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 924;
                this.typeProp();
                }
                }
                this.state = 929;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 930;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 126, Stage5Parser.RULE_typeProp);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 932;
            this.match(Stage5Parser.LPAREN);
            this.state = 936;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 69) {
                {
                {
                this.state = 933;
                this.propModifier();
                }
                }
                this.state = 938;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 939;
            this.match(Stage5Parser.IDENTIFIER);
            this.state = 941;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 77) {
                {
                this.state = 940;
                this.match(Stage5Parser.OPTIONAL);
                }
            }

            this.state = 943;
            this.typeExpr();
            this.state = 944;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 128, Stage5Parser.RULE_propModifier);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 946;
            this.match(Stage5Parser.READONLY);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 130, Stage5Parser.RULE_typeLiteral);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 948;
            this.match(Stage5Parser.LPAREN);
            this.state = 949;
            this.match(Stage5Parser.LIT);
            this.state = 950;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 78)) & ~0x1F) === 0 && ((1 << (_la - 78)) & 100663297) !== 0))) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 951;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 132, Stage5Parser.RULE_typeKeyof);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 953;
            this.match(Stage5Parser.LPAREN);
            this.state = 954;
            this.match(Stage5Parser.KEYOF);
            this.state = 955;
            this.typeExpr();
            this.state = 956;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 134, Stage5Parser.RULE_typeTypeof);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 958;
            this.match(Stage5Parser.LPAREN);
            this.state = 959;
            this.match(Stage5Parser.TYPEOF);
            this.state = 960;
            this.match(Stage5Parser.IDENTIFIER);
            this.state = 961;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 136, Stage5Parser.RULE_typeIndexAccess);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 963;
            this.match(Stage5Parser.LPAREN);
            this.state = 964;
            this.match(Stage5Parser.INDEX);
            this.state = 965;
            this.typeExpr();
            this.state = 966;
            this.typeExpr();
            this.state = 967;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 138, Stage5Parser.RULE_typeConditional);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 969;
            this.match(Stage5Parser.LPAREN);
            this.state = 970;
            this.match(Stage5Parser.COND);
            this.state = 971;
            this.typeExpr();
            this.state = 972;
            this.typeExpr();
            this.state = 973;
            this.typeExpr();
            this.state = 974;
            this.typeExpr();
            this.state = 975;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 140, Stage5Parser.RULE_typeInfer);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 977;
            this.match(Stage5Parser.LPAREN);
            this.state = 978;
            this.match(Stage5Parser.INFER);
            this.state = 979;
            this.match(Stage5Parser.IDENTIFIER);
            this.state = 980;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 142, Stage5Parser.RULE_typeMapped);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 982;
            this.match(Stage5Parser.LPAREN);
            this.state = 983;
            this.match(Stage5Parser.MAPPED);
            this.state = 984;
            this.match(Stage5Parser.IDENTIFIER);
            this.state = 985;
            this.typeExpr();
            this.state = 987;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 70, this.context) ) {
            case 1:
                {
                this.state = 986;
                this.mappedModifiers();
                }
                break;
            }
            this.state = 989;
            this.typeExpr();
            this.state = 990;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 144, Stage5Parser.RULE_mappedModifiers);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 992;
            this.match(Stage5Parser.LPAREN);
            this.state = 993;
            this.match(Stage5Parser.MODIFIERS);
            this.state = 995;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 994;
                this.mappedModifier();
                }
                }
                this.state = 997;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 69 || _la === 77);
            this.state = 999;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 146, Stage5Parser.RULE_mappedModifier);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1001;
            _la = this.tokenStream.LA(1);
            if(!(_la === 69 || _la === 77)) {
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
        this.enterRule(localContext, 148, Stage5Parser.RULE_typeTemplateLiteral);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1003;
            this.match(Stage5Parser.LPAREN);
            this.state = 1004;
            this.match(Stage5Parser.TYPE_TEMPLATE);
            this.state = 1006;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 1005;
                this.templatePart();
                }
                }
                this.state = 1008;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 104 || _la === 106);
            this.state = 1010;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 150, Stage5Parser.RULE_templatePart);
        try {
            this.state = 1014;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case Stage5Parser.STRING:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1012;
                this.match(Stage5Parser.STRING);
                }
                break;
            case Stage5Parser.LPAREN:
            case Stage5Parser.IDENTIFIER:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1013;
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
        this.enterRule(localContext, 152, Stage5Parser.RULE_typeApplication);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1016;
            this.match(Stage5Parser.LPAREN);
            this.state = 1017;
            this.typeExpr();
            this.state = 1019;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 1018;
                this.typeExpr();
                }
                }
                this.state = 1021;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 106);
            this.state = 1023;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 154, Stage5Parser.RULE_typeParams);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1025;
            this.match(Stage5Parser.LPAREN);
            this.state = 1026;
            this.match(Stage5Parser.TYPE_PARAMS);
            this.state = 1028;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 1027;
                this.typeParamDecl();
                }
                }
                this.state = 1030;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 106);
            this.state = 1032;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 156, Stage5Parser.RULE_typeParamDecl);
        let _la: number;
        try {
            this.state = 1044;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case Stage5Parser.IDENTIFIER:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1034;
                this.match(Stage5Parser.IDENTIFIER);
                }
                break;
            case Stage5Parser.LPAREN:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1035;
                this.match(Stage5Parser.LPAREN);
                this.state = 1036;
                this.match(Stage5Parser.IDENTIFIER);
                this.state = 1038;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 76, this.context) ) {
                case 1:
                    {
                    this.state = 1037;
                    this.typeParamConstraint();
                    }
                    break;
                }
                this.state = 1041;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 2) {
                    {
                    this.state = 1040;
                    this.typeParamDefault();
                    }
                }

                this.state = 1043;
                this.match(Stage5Parser.RPAREN);
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
        this.enterRule(localContext, 158, Stage5Parser.RULE_typeParamConstraint);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1046;
            this.match(Stage5Parser.LPAREN);
            this.state = 1047;
            this.match(Stage5Parser.EXTENDS);
            this.state = 1048;
            this.typeExpr();
            this.state = 1049;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 160, Stage5Parser.RULE_typeParamDefault);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1051;
            this.match(Stage5Parser.LPAREN);
            this.state = 1052;
            this.match(Stage5Parser.DEFAULT);
            this.state = 1053;
            this.typeExpr();
            this.state = 1054;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 162, Stage5Parser.RULE_assign);
        try {
            this.state = 1068;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 79, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1056;
                this.match(Stage5Parser.LPAREN);
                this.state = 1057;
                this.match(Stage5Parser.SET);
                this.state = 1058;
                this.match(Stage5Parser.IDENTIFIER);
                this.state = 1059;
                this.expression();
                this.state = 1060;
                this.match(Stage5Parser.RPAREN);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1062;
                this.match(Stage5Parser.LPAREN);
                this.state = 1063;
                this.match(Stage5Parser.SET);
                this.state = 1064;
                this.propAccess();
                this.state = 1065;
                this.expression();
                this.state = 1066;
                this.match(Stage5Parser.RPAREN);
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
        this.enterRule(localContext, 164, Stage5Parser.RULE_switchForm);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1070;
            this.match(Stage5Parser.LPAREN);
            this.state = 1071;
            this.match(Stage5Parser.SWITCH);
            this.state = 1072;
            this.expression();
            this.state = 1076;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 80, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 1073;
                    this.caseClause();
                    }
                    }
                }
                this.state = 1078;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 80, this.context);
            }
            this.state = 1080;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2) {
                {
                this.state = 1079;
                this.defaultClause();
                }
            }

            this.state = 1082;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 166, Stage5Parser.RULE_caseClause);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1084;
            this.match(Stage5Parser.LPAREN);
            this.state = 1085;
            this.match(Stage5Parser.CASE);
            this.state = 1086;
            this.expression();
            this.state = 1090;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 51)) & ~0x1F) === 0 && ((1 << (_la - 51)) & 939524099) !== 0) || ((((_la - 102)) & ~0x1F) === 0 && ((1 << (_la - 102)) & 23) !== 0)) {
                {
                {
                this.state = 1087;
                this.statement();
                }
                }
                this.state = 1092;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1093;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 168, Stage5Parser.RULE_defaultClause);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1095;
            this.match(Stage5Parser.LPAREN);
            this.state = 1096;
            this.match(Stage5Parser.DEFAULT);
            this.state = 1100;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 51)) & ~0x1F) === 0 && ((1 << (_la - 51)) & 939524099) !== 0) || ((((_la - 102)) & ~0x1F) === 0 && ((1 << (_la - 102)) & 23) !== 0)) {
                {
                {
                this.state = 1097;
                this.statement();
                }
                }
                this.state = 1102;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1103;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 170, Stage5Parser.RULE_forForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1105;
            this.match(Stage5Parser.LPAREN);
            this.state = 1106;
            this.match(Stage5Parser.FOR);
            this.state = 1107;
            this.letStmt();
            this.state = 1108;
            this.expression();
            this.state = 1109;
            this.assign();
            this.state = 1113;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 51)) & ~0x1F) === 0 && ((1 << (_la - 51)) & 939524099) !== 0) || ((((_la - 102)) & ~0x1F) === 0 && ((1 << (_la - 102)) & 23) !== 0)) {
                {
                {
                this.state = 1110;
                this.statement();
                }
                }
                this.state = 1115;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1116;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 172, Stage5Parser.RULE_forInForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1118;
            this.match(Stage5Parser.LPAREN);
            this.state = 1119;
            this.match(Stage5Parser.FORIN);
            this.state = 1120;
            this.match(Stage5Parser.IDENTIFIER);
            this.state = 1121;
            this.expression();
            this.state = 1125;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 51)) & ~0x1F) === 0 && ((1 << (_la - 51)) & 939524099) !== 0) || ((((_la - 102)) & ~0x1F) === 0 && ((1 << (_la - 102)) & 23) !== 0)) {
                {
                {
                this.state = 1122;
                this.statement();
                }
                }
                this.state = 1127;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1128;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 174, Stage5Parser.RULE_forOfForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1130;
            this.match(Stage5Parser.LPAREN);
            this.state = 1131;
            this.match(Stage5Parser.FOROF);
            this.state = 1132;
            this.match(Stage5Parser.IDENTIFIER);
            this.state = 1133;
            this.expression();
            this.state = 1137;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 51)) & ~0x1F) === 0 && ((1 << (_la - 51)) & 939524099) !== 0) || ((((_la - 102)) & ~0x1F) === 0 && ((1 << (_la - 102)) & 23) !== 0)) {
                {
                {
                this.state = 1134;
                this.statement();
                }
                }
                this.state = 1139;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1140;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 176, Stage5Parser.RULE_expression);
        try {
            this.state = 1177;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 87, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1142;
                this.literal();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1143;
                this.match(Stage5Parser.KEYWORD);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 1144;
                this.match(Stage5Parser.IDENTIFIER);
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 1145;
                this.lambda();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 1146;
                this.fn();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 1147;
                this.asyncLambda();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 1148;
                this.asyncFn();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 1149;
                this.generatorFn();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 1150;
                this.asyncGeneratorFn();
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 1151;
                this.awaitExpr();
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 1152;
                this.yieldExpr();
                }
                break;
            case 12:
                this.enterOuterAlt(localContext, 12);
                {
                this.state = 1153;
                this.yieldStarExpr();
                }
                break;
            case 13:
                this.enterOuterAlt(localContext, 13);
                {
                this.state = 1154;
                this.bindExpr();
                }
                break;
            case 14:
                this.enterOuterAlt(localContext, 14);
                {
                this.state = 1155;
                this.methodCallExpr();
                }
                break;
            case 15:
                this.enterOuterAlt(localContext, 15);
                {
                this.state = 1156;
                this.objectExpr();
                }
                break;
            case 16:
                this.enterOuterAlt(localContext, 16);
                {
                this.state = 1157;
                this.arrayExpr();
                }
                break;
            case 17:
                this.enterOuterAlt(localContext, 17);
                {
                this.state = 1158;
                this.propAccess();
                }
                break;
            case 18:
                this.enterOuterAlt(localContext, 18);
                {
                this.state = 1159;
                this.indexAccess();
                }
                break;
            case 19:
                this.enterOuterAlt(localContext, 19);
                {
                this.state = 1160;
                this.quasiquote();
                }
                break;
            case 20:
                this.enterOuterAlt(localContext, 20);
                {
                this.state = 1161;
                this.unquote();
                }
                break;
            case 21:
                this.enterOuterAlt(localContext, 21);
                {
                this.state = 1162;
                this.unquoteSplicing();
                }
                break;
            case 22:
                this.enterOuterAlt(localContext, 22);
                {
                this.state = 1163;
                this.ternary();
                }
                break;
            case 23:
                this.enterOuterAlt(localContext, 23);
                {
                this.state = 1164;
                this.condExpr();
                }
                break;
            case 24:
                this.enterOuterAlt(localContext, 24);
                {
                this.state = 1165;
                this.newForm();
                }
                break;
            case 25:
                this.enterOuterAlt(localContext, 25);
                {
                this.state = 1166;
                this.optChain();
                }
                break;
            case 26:
                this.enterOuterAlt(localContext, 26);
                {
                this.state = 1167;
                this.optChainIndex();
                }
                break;
            case 27:
                this.enterOuterAlt(localContext, 27);
                {
                this.state = 1168;
                this.nullCoalesce();
                }
                break;
            case 28:
                this.enterOuterAlt(localContext, 28);
                {
                this.state = 1169;
                this.typeofExpr();
                }
                break;
            case 29:
                this.enterOuterAlt(localContext, 29);
                {
                this.state = 1170;
                this.typeAssert();
                }
                break;
            case 30:
                this.enterOuterAlt(localContext, 30);
                {
                this.state = 1171;
                this.templateExpr();
                }
                break;
            case 31:
                this.enterOuterAlt(localContext, 31);
                {
                this.state = 1172;
                this.thisExpr();
                }
                break;
            case 32:
                this.enterOuterAlt(localContext, 32);
                {
                this.state = 1173;
                this.superExpr();
                }
                break;
            case 33:
                this.enterOuterAlt(localContext, 33);
                {
                this.state = 1174;
                this.superConstructorCall();
                }
                break;
            case 34:
                this.enterOuterAlt(localContext, 34);
                {
                this.state = 1175;
                this.superMethodCall();
                }
                break;
            case 35:
                this.enterOuterAlt(localContext, 35);
                {
                this.state = 1176;
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
        this.enterRule(localContext, 178, Stage5Parser.RULE_thisExpr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1179;
            this.match(Stage5Parser.THIS);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 180, Stage5Parser.RULE_superExpr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1181;
            this.match(Stage5Parser.SUPER);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 182, Stage5Parser.RULE_superConstructorCall);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1183;
            this.match(Stage5Parser.LPAREN);
            this.state = 1184;
            this.match(Stage5Parser.SUPER);
            this.state = 1188;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 51)) & ~0x1F) === 0 && ((1 << (_la - 51)) & 939524099) !== 0) || ((((_la - 102)) & ~0x1F) === 0 && ((1 << (_la - 102)) & 23) !== 0)) {
                {
                {
                this.state = 1185;
                this.expression();
                }
                }
                this.state = 1190;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1191;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 184, Stage5Parser.RULE_superMethodCall);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1193;
            this.match(Stage5Parser.LPAREN);
            this.state = 1194;
            this.match(Stage5Parser.SUPER_METHOD);
            this.state = 1195;
            this.match(Stage5Parser.IDENTIFIER);
            this.state = 1199;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 51)) & ~0x1F) === 0 && ((1 << (_la - 51)) & 939524099) !== 0) || ((((_la - 102)) & ~0x1F) === 0 && ((1 << (_la - 102)) & 23) !== 0)) {
                {
                {
                this.state = 1196;
                this.expression();
                }
                }
                this.state = 1201;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1202;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 186, Stage5Parser.RULE_typeofExpr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1204;
            this.match(Stage5Parser.LPAREN);
            this.state = 1205;
            this.match(Stage5Parser.TYPEOF);
            this.state = 1206;
            this.expression();
            this.state = 1207;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 188, Stage5Parser.RULE_typeAssert);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1209;
            this.match(Stage5Parser.LPAREN);
            this.state = 1210;
            this.match(Stage5Parser.TYPE_AS);
            this.state = 1211;
            this.expression();
            this.state = 1212;
            this.typeExpr();
            this.state = 1213;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 190, Stage5Parser.RULE_lambda);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1215;
            this.match(Stage5Parser.LPAREN);
            this.state = 1216;
            this.match(Stage5Parser.LAMBDA);
            this.state = 1217;
            this.fnSignature();
            this.state = 1221;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 51)) & ~0x1F) === 0 && ((1 << (_la - 51)) & 939524099) !== 0) || ((((_la - 102)) & ~0x1F) === 0 && ((1 << (_la - 102)) & 23) !== 0)) {
                {
                {
                this.state = 1218;
                this.statement();
                }
                }
                this.state = 1223;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1224;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 192, Stage5Parser.RULE_fn);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1226;
            this.match(Stage5Parser.LPAREN);
            this.state = 1227;
            this.match(Stage5Parser.FN);
            this.state = 1228;
            this.fnSignature();
            this.state = 1232;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 51)) & ~0x1F) === 0 && ((1 << (_la - 51)) & 939524099) !== 0) || ((((_la - 102)) & ~0x1F) === 0 && ((1 << (_la - 102)) & 23) !== 0)) {
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
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 194, Stage5Parser.RULE_asyncLambda);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1237;
            this.match(Stage5Parser.LPAREN);
            this.state = 1238;
            this.match(Stage5Parser.ASYNC_LAMBDA);
            this.state = 1239;
            this.fnSignature();
            this.state = 1243;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 51)) & ~0x1F) === 0 && ((1 << (_la - 51)) & 939524099) !== 0) || ((((_la - 102)) & ~0x1F) === 0 && ((1 << (_la - 102)) & 23) !== 0)) {
                {
                {
                this.state = 1240;
                this.statement();
                }
                }
                this.state = 1245;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1246;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 196, Stage5Parser.RULE_asyncFn);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1248;
            this.match(Stage5Parser.LPAREN);
            this.state = 1249;
            this.match(Stage5Parser.ASYNC_FN);
            this.state = 1250;
            this.fnSignature();
            this.state = 1254;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 51)) & ~0x1F) === 0 && ((1 << (_la - 51)) & 939524099) !== 0) || ((((_la - 102)) & ~0x1F) === 0 && ((1 << (_la - 102)) & 23) !== 0)) {
                {
                {
                this.state = 1251;
                this.statement();
                }
                }
                this.state = 1256;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1257;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 198, Stage5Parser.RULE_generatorFn);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1259;
            this.match(Stage5Parser.LPAREN);
            this.state = 1260;
            this.match(Stage5Parser.GENERATOR_FN);
            this.state = 1261;
            this.fnSignature();
            this.state = 1265;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 51)) & ~0x1F) === 0 && ((1 << (_la - 51)) & 939524099) !== 0) || ((((_la - 102)) & ~0x1F) === 0 && ((1 << (_la - 102)) & 23) !== 0)) {
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
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 200, Stage5Parser.RULE_asyncGeneratorFn);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1270;
            this.match(Stage5Parser.LPAREN);
            this.state = 1271;
            this.match(Stage5Parser.ASYNC_GENERATOR_FN);
            this.state = 1272;
            this.fnSignature();
            this.state = 1276;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 51)) & ~0x1F) === 0 && ((1 << (_la - 51)) & 939524099) !== 0) || ((((_la - 102)) & ~0x1F) === 0 && ((1 << (_la - 102)) & 23) !== 0)) {
                {
                {
                this.state = 1273;
                this.statement();
                }
                }
                this.state = 1278;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1279;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 202, Stage5Parser.RULE_awaitExpr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1281;
            this.match(Stage5Parser.LPAREN);
            this.state = 1282;
            this.match(Stage5Parser.AWAIT);
            this.state = 1283;
            this.expression();
            this.state = 1284;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 204, Stage5Parser.RULE_yieldExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1286;
            this.match(Stage5Parser.LPAREN);
            this.state = 1287;
            this.match(Stage5Parser.YIELD);
            this.state = 1289;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2 || ((((_la - 51)) & ~0x1F) === 0 && ((1 << (_la - 51)) & 939524099) !== 0) || ((((_la - 102)) & ~0x1F) === 0 && ((1 << (_la - 102)) & 23) !== 0)) {
                {
                this.state = 1288;
                this.expression();
                }
            }

            this.state = 1291;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 206, Stage5Parser.RULE_yieldStarExpr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1293;
            this.match(Stage5Parser.LPAREN);
            this.state = 1294;
            this.match(Stage5Parser.YIELD_STAR);
            this.state = 1295;
            this.expression();
            this.state = 1296;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 208, Stage5Parser.RULE_bindExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1298;
            this.match(Stage5Parser.LPAREN);
            this.state = 1299;
            this.match(Stage5Parser.BIND);
            this.state = 1300;
            this.expression();
            this.state = 1301;
            this.expression();
            this.state = 1305;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 51)) & ~0x1F) === 0 && ((1 << (_la - 51)) & 939524099) !== 0) || ((((_la - 102)) & ~0x1F) === 0 && ((1 << (_la - 102)) & 23) !== 0)) {
                {
                {
                this.state = 1302;
                this.expression();
                }
                }
                this.state = 1307;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1308;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 210, Stage5Parser.RULE_methodCallExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1310;
            this.match(Stage5Parser.LPAREN);
            this.state = 1311;
            this.match(Stage5Parser.METHOD_CALL);
            this.state = 1312;
            this.expression();
            this.state = 1313;
            this.expression();
            this.state = 1317;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 51)) & ~0x1F) === 0 && ((1 << (_la - 51)) & 939524099) !== 0) || ((((_la - 102)) & ~0x1F) === 0 && ((1 << (_la - 102)) & 23) !== 0)) {
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
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 212, Stage5Parser.RULE_ternary);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1322;
            this.match(Stage5Parser.LPAREN);
            this.state = 1323;
            this.match(Stage5Parser.TERNARY);
            this.state = 1324;
            this.expression();
            this.state = 1325;
            this.expression();
            this.state = 1326;
            this.expression();
            this.state = 1327;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 214, Stage5Parser.RULE_condExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1329;
            this.match(Stage5Parser.LPAREN);
            this.state = 1330;
            this.match(Stage5Parser.COND);
            this.state = 1334;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 1331;
                this.expression();
                this.state = 1332;
                this.expression();
                }
                }
                this.state = 1336;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || ((((_la - 51)) & ~0x1F) === 0 && ((1 << (_la - 51)) & 939524099) !== 0) || ((((_la - 102)) & ~0x1F) === 0 && ((1 << (_la - 102)) & 23) !== 0));
            this.state = 1338;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 216, Stage5Parser.RULE_newForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1340;
            this.match(Stage5Parser.LPAREN);
            this.state = 1341;
            this.match(Stage5Parser.NEW);
            this.state = 1342;
            this.match(Stage5Parser.IDENTIFIER);
            this.state = 1344;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 100, this.context) ) {
            case 1:
                {
                this.state = 1343;
                this.typeArgs();
                }
                break;
            }
            this.state = 1349;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 51)) & ~0x1F) === 0 && ((1 << (_la - 51)) & 939524099) !== 0) || ((((_la - 102)) & ~0x1F) === 0 && ((1 << (_la - 102)) & 23) !== 0)) {
                {
                {
                this.state = 1346;
                this.expression();
                }
                }
                this.state = 1351;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1352;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 218, Stage5Parser.RULE_objectExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1354;
            this.match(Stage5Parser.LPAREN);
            this.state = 1355;
            this.match(Stage5Parser.OBJECT);
            this.state = 1359;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 1356;
                this.objectField();
                }
                }
                this.state = 1361;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1362;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 220, Stage5Parser.RULE_objectField);
        try {
            this.state = 1377;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 103, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1364;
                this.match(Stage5Parser.LPAREN);
                this.state = 1365;
                this.propKey();
                this.state = 1366;
                this.expression();
                this.state = 1367;
                this.match(Stage5Parser.RPAREN);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1369;
                this.match(Stage5Parser.LPAREN);
                this.state = 1370;
                this.propKey();
                this.state = 1371;
                this.methodDef();
                this.state = 1372;
                this.match(Stage5Parser.RPAREN);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 1374;
                this.match(Stage5Parser.LPAREN);
                this.state = 1375;
                this.match(Stage5Parser.IDENTIFIER);
                this.state = 1376;
                this.match(Stage5Parser.RPAREN);
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
        this.enterRule(localContext, 222, Stage5Parser.RULE_methodDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1379;
            this.match(Stage5Parser.LPAREN);
            this.state = 1380;
            this.match(Stage5Parser.METHOD);
            this.state = 1381;
            this.fnSignature();
            this.state = 1385;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 51)) & ~0x1F) === 0 && ((1 << (_la - 51)) & 939524099) !== 0) || ((((_la - 102)) & ~0x1F) === 0 && ((1 << (_la - 102)) & 23) !== 0)) {
                {
                {
                this.state = 1382;
                this.statement();
                }
                }
                this.state = 1387;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1388;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 224, Stage5Parser.RULE_arrayExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1390;
            this.match(Stage5Parser.LPAREN);
            this.state = 1391;
            this.match(Stage5Parser.ARRAY);
            this.state = 1395;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 51)) & ~0x1F) === 0 && ((1 << (_la - 51)) & 939524099) !== 0) || ((((_la - 102)) & ~0x1F) === 0 && ((1 << (_la - 102)) & 23) !== 0)) {
                {
                {
                this.state = 1392;
                this.expression();
                }
                }
                this.state = 1397;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1398;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 226, Stage5Parser.RULE_templateExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1400;
            this.match(Stage5Parser.LPAREN);
            this.state = 1401;
            this.match(Stage5Parser.TEMPLATE);
            this.state = 1404;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                this.state = 1404;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 106, this.context) ) {
                case 1:
                    {
                    this.state = 1402;
                    this.match(Stage5Parser.STRING);
                    }
                    break;
                case 2:
                    {
                    this.state = 1403;
                    this.expression();
                    }
                    break;
                }
                }
                this.state = 1406;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || ((((_la - 51)) & ~0x1F) === 0 && ((1 << (_la - 51)) & 939524099) !== 0) || ((((_la - 102)) & ~0x1F) === 0 && ((1 << (_la - 102)) & 23) !== 0));
            this.state = 1408;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 228, Stage5Parser.RULE_propKey);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1410;
            _la = this.tokenStream.LA(1);
            if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 2415919072) !== 0) || ((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & 4294967295) !== 0) || ((((_la - 65)) & ~0x1F) === 0 && ((1 << (_la - 65)) & 4194234367) !== 0) || ((((_la - 97)) & ~0x1F) === 0 && ((1 << (_la - 97)) & 703) !== 0))) {
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
        this.enterRule(localContext, 230, Stage5Parser.RULE_propAccess);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1412;
            this.match(Stage5Parser.LPAREN);
            this.state = 1413;
            this.match(Stage5Parser.DOT);
            this.state = 1414;
            this.expression();
            this.state = 1415;
            this.propKey();
            this.state = 1416;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 232, Stage5Parser.RULE_indexAccess);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1418;
            this.match(Stage5Parser.LPAREN);
            this.state = 1419;
            this.match(Stage5Parser.INDEX);
            this.state = 1420;
            this.expression();
            this.state = 1421;
            this.expression();
            this.state = 1422;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 234, Stage5Parser.RULE_quasiquote);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1424;
            this.match(Stage5Parser.LPAREN);
            this.state = 1425;
            _la = this.tokenStream.LA(1);
            if(!(_la === 33 || _la === 34)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 1426;
            this.expression();
            this.state = 1427;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 236, Stage5Parser.RULE_unquote);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1429;
            this.match(Stage5Parser.LPAREN);
            this.state = 1430;
            this.match(Stage5Parser.UNQUOTE);
            this.state = 1431;
            this.expression();
            this.state = 1432;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 238, Stage5Parser.RULE_unquoteSplicing);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1434;
            this.match(Stage5Parser.LPAREN);
            this.state = 1435;
            this.match(Stage5Parser.UNQUOTE_SPLICING);
            this.state = 1436;
            this.expression();
            this.state = 1437;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 240, Stage5Parser.RULE_optChain);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1439;
            this.match(Stage5Parser.LPAREN);
            this.state = 1440;
            this.match(Stage5Parser.OPTCHAIN);
            this.state = 1441;
            this.expression();
            this.state = 1442;
            this.propKey();
            this.state = 1443;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 242, Stage5Parser.RULE_optChainIndex);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1445;
            this.match(Stage5Parser.LPAREN);
            this.state = 1446;
            this.match(Stage5Parser.OPTCHAIN_INDEX);
            this.state = 1447;
            this.expression();
            this.state = 1448;
            this.expression();
            this.state = 1449;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 244, Stage5Parser.RULE_nullCoalesce);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1451;
            this.match(Stage5Parser.LPAREN);
            this.state = 1452;
            this.match(Stage5Parser.NULLCOAL);
            this.state = 1453;
            this.expression();
            this.state = 1454;
            this.expression();
            this.state = 1455;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 246, Stage5Parser.RULE_call);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1457;
            this.match(Stage5Parser.LPAREN);
            this.state = 1458;
            this.expression();
            this.state = 1460;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 108, this.context) ) {
            case 1:
                {
                this.state = 1459;
                this.typeArgs();
                }
                break;
            }
            this.state = 1465;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 51)) & ~0x1F) === 0 && ((1 << (_la - 51)) & 939524099) !== 0) || ((((_la - 102)) & ~0x1F) === 0 && ((1 << (_la - 102)) & 23) !== 0)) {
                {
                {
                this.state = 1462;
                this.expression();
                }
                }
                this.state = 1467;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1468;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 248, Stage5Parser.RULE_typeArgs);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1470;
            this.match(Stage5Parser.LPAREN);
            this.state = 1471;
            this.match(Stage5Parser.TYPE_ARGS);
            this.state = 1473;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 1472;
                this.typeExpr();
                }
                }
                this.state = 1475;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 106);
            this.state = 1477;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 250, Stage5Parser.RULE_fnSignature);
        let _la: number;
        try {
            let alternative: number;
            this.state = 1503;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 116, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1479;
                this.match(Stage5Parser.LPAREN);
                this.state = 1496;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 2) {
                    {
                    this.state = 1480;
                    this.param();
                    this.state = 1487;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 112, this.context);
                    while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                        if (alternative === 1) {
                            {
                            {
                            this.state = 1482;
                            this.errorHandler.sync(this);
                            _la = this.tokenStream.LA(1);
                            if (_la === 4) {
                                {
                                this.state = 1481;
                                this.match(Stage5Parser.COMMA);
                                }
                            }

                            this.state = 1484;
                            this.param();
                            }
                            }
                        }
                        this.state = 1489;
                        this.errorHandler.sync(this);
                        alternative = this.interpreter.adaptivePredict(this.tokenStream, 112, this.context);
                    }
                    this.state = 1494;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    if (_la === 2 || _la === 4) {
                        {
                        this.state = 1491;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                        if (_la === 4) {
                            {
                            this.state = 1490;
                            this.match(Stage5Parser.COMMA);
                            }
                        }

                        this.state = 1493;
                        this.restParam();
                        }
                    }

                    }
                }

                this.state = 1498;
                this.match(Stage5Parser.RPAREN);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1499;
                this.match(Stage5Parser.LPAREN);
                this.state = 1500;
                this.restParam();
                this.state = 1501;
                this.match(Stage5Parser.RPAREN);
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
        this.enterRule(localContext, 252, Stage5Parser.RULE_param);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1505;
            this.match(Stage5Parser.LPAREN);
            this.state = 1506;
            this.match(Stage5Parser.IDENTIFIER);
            this.state = 1507;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 254, Stage5Parser.RULE_restParam);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1509;
            this.match(Stage5Parser.LPAREN);
            this.state = 1510;
            this.match(Stage5Parser.REST);
            this.state = 1511;
            this.match(Stage5Parser.IDENTIFIER);
            this.state = 1512;
            this.match(Stage5Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 256, Stage5Parser.RULE_literal);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1514;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 78)) & ~0x1F) === 0 && ((1 << (_la - 78)) & 100663303) !== 0))) {
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
        4,1,107,1517,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,
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
        2,126,7,126,2,127,7,127,2,128,7,128,1,0,1,0,1,0,5,0,262,8,0,10,0,
        12,0,265,9,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,1,278,
        8,1,1,2,1,2,1,2,1,2,1,2,3,2,285,8,2,1,3,1,3,1,3,1,3,1,3,5,3,292,
        8,3,10,3,12,3,295,9,3,1,3,1,3,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,
        4,1,4,3,4,309,8,4,1,5,1,5,1,5,5,5,314,8,5,10,5,12,5,317,9,5,1,5,
        1,5,1,5,1,5,1,6,1,6,1,6,5,6,326,8,6,10,6,12,6,329,9,6,1,6,1,6,1,
        6,1,6,1,7,1,7,1,7,1,8,1,8,1,8,1,8,3,8,342,8,8,1,8,1,8,1,8,1,9,1,
        9,1,9,1,9,3,9,351,8,9,1,9,3,9,354,8,9,1,9,1,9,1,9,1,10,1,10,1,10,
        4,10,362,8,10,11,10,12,10,363,1,10,1,10,1,11,1,11,1,11,5,11,371,
        8,11,10,11,12,11,374,9,11,1,11,1,11,3,11,378,8,11,1,11,3,11,381,
        8,11,1,11,3,11,384,8,11,1,11,1,11,1,11,1,12,1,12,1,12,5,12,392,8,
        12,10,12,12,12,395,9,12,1,12,3,12,398,8,12,1,12,3,12,401,8,12,1,
        12,1,12,1,12,1,13,1,13,1,13,1,13,1,13,1,14,1,14,1,14,4,14,414,8,
        14,11,14,12,14,415,1,14,1,14,1,15,1,15,1,15,5,15,423,8,15,10,15,
        12,15,426,9,15,1,15,1,15,1,16,1,16,1,16,1,16,1,16,1,16,3,16,436,
        8,16,1,17,1,17,1,18,1,18,1,18,5,18,443,8,18,10,18,12,18,446,9,18,
        1,18,1,18,1,18,3,18,451,8,18,1,18,3,18,454,8,18,1,18,1,18,1,19,1,
        19,1,19,1,19,5,19,462,8,19,10,19,12,19,465,9,19,1,19,1,19,1,20,1,
        20,1,20,5,20,472,8,20,10,20,12,20,475,9,20,1,20,1,20,1,20,5,20,480,
        8,20,10,20,12,20,483,9,20,1,20,1,20,1,21,1,21,1,21,5,21,490,8,21,
        10,21,12,21,493,9,21,1,21,1,21,1,21,1,21,1,22,1,22,1,22,5,22,502,
        8,22,10,22,12,22,505,9,22,1,22,1,22,1,22,5,22,510,8,22,10,22,12,
        22,513,9,22,1,22,1,22,1,23,1,23,1,23,5,23,520,8,23,10,23,12,23,523,
        9,23,1,23,1,23,1,23,5,23,528,8,23,10,23,12,23,531,9,23,1,23,1,23,
        1,24,1,24,1,24,3,24,538,8,24,1,24,1,24,3,24,542,8,24,1,24,1,24,1,
        25,1,25,1,25,3,25,549,8,25,1,25,5,25,552,8,25,10,25,12,25,555,9,
        25,3,25,557,8,25,1,25,1,25,1,25,1,25,1,25,1,25,3,25,565,8,25,1,26,
        1,26,1,26,1,26,1,26,1,26,1,26,1,26,1,26,1,26,1,26,1,26,1,26,1,26,
        1,26,1,26,1,26,1,26,3,26,585,8,26,1,27,1,27,1,27,1,27,5,27,591,8,
        27,10,27,12,27,594,9,27,1,27,1,27,5,27,598,8,27,10,27,12,27,601,
        9,27,1,27,1,27,1,28,1,28,1,28,1,28,1,28,1,28,1,29,1,29,1,29,1,29,
        5,29,615,8,29,10,29,12,29,618,9,29,1,29,1,29,5,29,622,8,29,10,29,
        12,29,625,9,29,1,29,1,29,1,30,1,30,1,30,1,30,1,30,1,30,1,31,1,31,
        1,31,1,31,1,31,3,31,640,8,31,1,31,1,31,1,32,1,32,1,32,1,32,5,32,
        648,8,32,10,32,12,32,651,9,32,1,32,1,32,1,33,1,33,1,33,5,33,658,
        8,33,10,33,12,33,661,9,33,1,33,1,33,1,34,1,34,1,34,3,34,668,8,34,
        1,34,1,34,1,35,1,35,1,35,1,35,1,35,1,36,1,36,1,36,3,36,680,8,36,
        1,36,1,36,1,36,1,37,1,37,1,37,1,37,1,37,1,37,1,38,1,38,1,38,4,38,
        694,8,38,11,38,12,38,695,1,38,1,38,1,39,1,39,1,39,1,39,1,39,3,39,
        705,8,39,1,40,1,40,1,40,1,40,1,40,1,40,1,40,1,40,1,40,3,40,716,8,
        40,1,41,1,41,1,41,1,41,1,41,1,41,1,42,1,42,1,42,1,42,1,42,1,42,1,
        42,1,42,1,42,1,42,1,42,1,42,1,42,1,42,1,42,1,42,1,42,1,42,1,42,1,
        42,1,42,1,42,1,42,1,42,1,42,3,42,749,8,42,1,43,1,43,1,43,4,43,754,
        8,43,11,43,12,43,755,1,43,1,43,1,44,1,44,1,44,3,44,763,8,44,1,44,
        1,44,1,45,1,45,1,45,1,45,4,45,771,8,45,11,45,12,45,772,1,45,1,45,
        1,46,1,46,1,46,1,46,1,46,1,47,1,47,1,47,1,47,1,47,1,47,1,48,1,48,
        1,48,4,48,791,8,48,11,48,12,48,792,1,48,1,48,1,49,1,49,1,49,1,49,
        4,49,801,8,49,11,49,12,49,802,1,49,1,49,1,50,1,50,1,50,1,50,1,50,
        1,51,1,51,1,51,1,51,1,51,1,52,1,52,1,52,1,52,3,52,821,8,52,1,52,
        1,52,1,52,1,53,1,53,1,53,1,53,3,53,830,8,53,1,53,1,53,1,54,1,54,
        1,54,1,54,1,54,1,54,1,54,1,54,1,54,1,54,1,54,1,54,1,54,1,54,1,54,
        1,54,3,54,850,8,54,1,55,1,55,1,55,1,55,4,55,856,8,55,11,55,12,55,
        857,1,55,1,55,1,56,1,56,1,56,1,56,4,56,866,8,56,11,56,12,56,867,
        1,56,1,56,1,57,1,57,1,57,1,57,1,57,1,58,1,58,1,58,4,58,880,8,58,
        11,58,12,58,881,1,58,1,58,1,59,1,59,1,59,1,59,1,59,1,59,1,59,1,59,
        1,59,1,59,1,59,3,59,897,8,59,1,60,1,60,1,60,3,60,902,8,60,1,60,1,
        60,5,60,906,8,60,10,60,12,60,909,9,60,1,60,1,60,1,60,1,60,1,61,1,
        61,1,61,3,61,918,8,61,1,61,1,61,1,61,1,62,1,62,1,62,5,62,926,8,62,
        10,62,12,62,929,9,62,1,62,1,62,1,63,1,63,5,63,935,8,63,10,63,12,
        63,938,9,63,1,63,1,63,3,63,942,8,63,1,63,1,63,1,63,1,64,1,64,1,65,
        1,65,1,65,1,65,1,65,1,66,1,66,1,66,1,66,1,66,1,67,1,67,1,67,1,67,
        1,67,1,68,1,68,1,68,1,68,1,68,1,68,1,69,1,69,1,69,1,69,1,69,1,69,
        1,69,1,69,1,70,1,70,1,70,1,70,1,70,1,71,1,71,1,71,1,71,1,71,3,71,
        988,8,71,1,71,1,71,1,71,1,72,1,72,1,72,4,72,996,8,72,11,72,12,72,
        997,1,72,1,72,1,73,1,73,1,74,1,74,1,74,4,74,1007,8,74,11,74,12,74,
        1008,1,74,1,74,1,75,1,75,3,75,1015,8,75,1,76,1,76,1,76,4,76,1020,
        8,76,11,76,12,76,1021,1,76,1,76,1,77,1,77,1,77,4,77,1029,8,77,11,
        77,12,77,1030,1,77,1,77,1,78,1,78,1,78,1,78,3,78,1039,8,78,1,78,
        3,78,1042,8,78,1,78,3,78,1045,8,78,1,79,1,79,1,79,1,79,1,79,1,80,
        1,80,1,80,1,80,1,80,1,81,1,81,1,81,1,81,1,81,1,81,1,81,1,81,1,81,
        1,81,1,81,1,81,3,81,1069,8,81,1,82,1,82,1,82,1,82,5,82,1075,8,82,
        10,82,12,82,1078,9,82,1,82,3,82,1081,8,82,1,82,1,82,1,83,1,83,1,
        83,1,83,5,83,1089,8,83,10,83,12,83,1092,9,83,1,83,1,83,1,84,1,84,
        1,84,5,84,1099,8,84,10,84,12,84,1102,9,84,1,84,1,84,1,85,1,85,1,
        85,1,85,1,85,1,85,5,85,1112,8,85,10,85,12,85,1115,9,85,1,85,1,85,
        1,86,1,86,1,86,1,86,1,86,5,86,1124,8,86,10,86,12,86,1127,9,86,1,
        86,1,86,1,87,1,87,1,87,1,87,1,87,5,87,1136,8,87,10,87,12,87,1139,
        9,87,1,87,1,87,1,88,1,88,1,88,1,88,1,88,1,88,1,88,1,88,1,88,1,88,
        1,88,1,88,1,88,1,88,1,88,1,88,1,88,1,88,1,88,1,88,1,88,1,88,1,88,
        1,88,1,88,1,88,1,88,1,88,1,88,1,88,1,88,1,88,1,88,1,88,1,88,3,88,
        1178,8,88,1,89,1,89,1,90,1,90,1,91,1,91,1,91,5,91,1187,8,91,10,91,
        12,91,1190,9,91,1,91,1,91,1,92,1,92,1,92,1,92,5,92,1198,8,92,10,
        92,12,92,1201,9,92,1,92,1,92,1,93,1,93,1,93,1,93,1,93,1,94,1,94,
        1,94,1,94,1,94,1,94,1,95,1,95,1,95,1,95,5,95,1220,8,95,10,95,12,
        95,1223,9,95,1,95,1,95,1,96,1,96,1,96,1,96,5,96,1231,8,96,10,96,
        12,96,1234,9,96,1,96,1,96,1,97,1,97,1,97,1,97,5,97,1242,8,97,10,
        97,12,97,1245,9,97,1,97,1,97,1,98,1,98,1,98,1,98,5,98,1253,8,98,
        10,98,12,98,1256,9,98,1,98,1,98,1,99,1,99,1,99,1,99,5,99,1264,8,
        99,10,99,12,99,1267,9,99,1,99,1,99,1,100,1,100,1,100,1,100,5,100,
        1275,8,100,10,100,12,100,1278,9,100,1,100,1,100,1,101,1,101,1,101,
        1,101,1,101,1,102,1,102,1,102,3,102,1290,8,102,1,102,1,102,1,103,
        1,103,1,103,1,103,1,103,1,104,1,104,1,104,1,104,1,104,5,104,1304,
        8,104,10,104,12,104,1307,9,104,1,104,1,104,1,105,1,105,1,105,1,105,
        1,105,5,105,1316,8,105,10,105,12,105,1319,9,105,1,105,1,105,1,106,
        1,106,1,106,1,106,1,106,1,106,1,106,1,107,1,107,1,107,1,107,1,107,
        4,107,1335,8,107,11,107,12,107,1336,1,107,1,107,1,108,1,108,1,108,
        1,108,3,108,1345,8,108,1,108,5,108,1348,8,108,10,108,12,108,1351,
        9,108,1,108,1,108,1,109,1,109,1,109,5,109,1358,8,109,10,109,12,109,
        1361,9,109,1,109,1,109,1,110,1,110,1,110,1,110,1,110,1,110,1,110,
        1,110,1,110,1,110,1,110,1,110,1,110,3,110,1378,8,110,1,111,1,111,
        1,111,1,111,5,111,1384,8,111,10,111,12,111,1387,9,111,1,111,1,111,
        1,112,1,112,1,112,5,112,1394,8,112,10,112,12,112,1397,9,112,1,112,
        1,112,1,113,1,113,1,113,1,113,4,113,1405,8,113,11,113,12,113,1406,
        1,113,1,113,1,114,1,114,1,115,1,115,1,115,1,115,1,115,1,115,1,116,
        1,116,1,116,1,116,1,116,1,116,1,117,1,117,1,117,1,117,1,117,1,118,
        1,118,1,118,1,118,1,118,1,119,1,119,1,119,1,119,1,119,1,120,1,120,
        1,120,1,120,1,120,1,120,1,121,1,121,1,121,1,121,1,121,1,121,1,122,
        1,122,1,122,1,122,1,122,1,122,1,123,1,123,1,123,3,123,1461,8,123,
        1,123,5,123,1464,8,123,10,123,12,123,1467,9,123,1,123,1,123,1,124,
        1,124,1,124,4,124,1474,8,124,11,124,12,124,1475,1,124,1,124,1,125,
        1,125,1,125,3,125,1483,8,125,1,125,5,125,1486,8,125,10,125,12,125,
        1489,9,125,1,125,3,125,1492,8,125,1,125,3,125,1495,8,125,3,125,1497,
        8,125,1,125,1,125,1,125,1,125,1,125,3,125,1504,8,125,1,126,1,126,
        1,126,1,126,1,127,1,127,1,127,1,127,1,127,1,128,1,128,1,128,0,0,
        129,0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,
        44,46,48,50,52,54,56,58,60,62,64,66,68,70,72,74,76,78,80,82,84,86,
        88,90,92,94,96,98,100,102,104,106,108,110,112,114,116,118,120,122,
        124,126,128,130,132,134,136,138,140,142,144,146,148,150,152,154,
        156,158,160,162,164,166,168,170,172,174,176,178,180,182,184,186,
        188,190,192,194,196,198,200,202,204,206,208,210,212,214,216,218,
        220,222,224,226,228,230,232,234,236,238,240,242,244,246,248,250,
        252,254,256,0,5,2,0,78,78,103,104,2,0,69,69,77,77,8,0,5,27,31,31,
        33,76,78,80,82,89,92,102,104,104,106,106,1,0,33,34,2,0,78,80,103,
        104,1593,0,258,1,0,0,0,2,277,1,0,0,0,4,284,1,0,0,0,6,286,1,0,0,0,
        8,308,1,0,0,0,10,310,1,0,0,0,12,322,1,0,0,0,14,334,1,0,0,0,16,337,
        1,0,0,0,18,346,1,0,0,0,20,358,1,0,0,0,22,367,1,0,0,0,24,388,1,0,
        0,0,26,405,1,0,0,0,28,410,1,0,0,0,30,419,1,0,0,0,32,435,1,0,0,0,
        34,437,1,0,0,0,36,439,1,0,0,0,38,457,1,0,0,0,40,468,1,0,0,0,42,486,
        1,0,0,0,44,498,1,0,0,0,46,516,1,0,0,0,48,534,1,0,0,0,50,545,1,0,
        0,0,52,584,1,0,0,0,54,586,1,0,0,0,56,604,1,0,0,0,58,610,1,0,0,0,
        60,628,1,0,0,0,62,634,1,0,0,0,64,643,1,0,0,0,66,654,1,0,0,0,68,664,
        1,0,0,0,70,671,1,0,0,0,72,676,1,0,0,0,74,684,1,0,0,0,76,690,1,0,
        0,0,78,704,1,0,0,0,80,715,1,0,0,0,82,717,1,0,0,0,84,748,1,0,0,0,
        86,750,1,0,0,0,88,759,1,0,0,0,90,766,1,0,0,0,92,776,1,0,0,0,94,781,
        1,0,0,0,96,787,1,0,0,0,98,796,1,0,0,0,100,806,1,0,0,0,102,811,1,
        0,0,0,104,816,1,0,0,0,106,825,1,0,0,0,108,849,1,0,0,0,110,851,1,
        0,0,0,112,861,1,0,0,0,114,871,1,0,0,0,116,876,1,0,0,0,118,896,1,
        0,0,0,120,898,1,0,0,0,122,914,1,0,0,0,124,922,1,0,0,0,126,932,1,
        0,0,0,128,946,1,0,0,0,130,948,1,0,0,0,132,953,1,0,0,0,134,958,1,
        0,0,0,136,963,1,0,0,0,138,969,1,0,0,0,140,977,1,0,0,0,142,982,1,
        0,0,0,144,992,1,0,0,0,146,1001,1,0,0,0,148,1003,1,0,0,0,150,1014,
        1,0,0,0,152,1016,1,0,0,0,154,1025,1,0,0,0,156,1044,1,0,0,0,158,1046,
        1,0,0,0,160,1051,1,0,0,0,162,1068,1,0,0,0,164,1070,1,0,0,0,166,1084,
        1,0,0,0,168,1095,1,0,0,0,170,1105,1,0,0,0,172,1118,1,0,0,0,174,1130,
        1,0,0,0,176,1177,1,0,0,0,178,1179,1,0,0,0,180,1181,1,0,0,0,182,1183,
        1,0,0,0,184,1193,1,0,0,0,186,1204,1,0,0,0,188,1209,1,0,0,0,190,1215,
        1,0,0,0,192,1226,1,0,0,0,194,1237,1,0,0,0,196,1248,1,0,0,0,198,1259,
        1,0,0,0,200,1270,1,0,0,0,202,1281,1,0,0,0,204,1286,1,0,0,0,206,1293,
        1,0,0,0,208,1298,1,0,0,0,210,1310,1,0,0,0,212,1322,1,0,0,0,214,1329,
        1,0,0,0,216,1340,1,0,0,0,218,1354,1,0,0,0,220,1377,1,0,0,0,222,1379,
        1,0,0,0,224,1390,1,0,0,0,226,1400,1,0,0,0,228,1410,1,0,0,0,230,1412,
        1,0,0,0,232,1418,1,0,0,0,234,1424,1,0,0,0,236,1429,1,0,0,0,238,1434,
        1,0,0,0,240,1439,1,0,0,0,242,1445,1,0,0,0,244,1451,1,0,0,0,246,1457,
        1,0,0,0,248,1470,1,0,0,0,250,1503,1,0,0,0,252,1505,1,0,0,0,254,1509,
        1,0,0,0,256,1514,1,0,0,0,258,259,5,2,0,0,259,263,5,5,0,0,260,262,
        3,2,1,0,261,260,1,0,0,0,262,265,1,0,0,0,263,261,1,0,0,0,263,264,
        1,0,0,0,264,266,1,0,0,0,265,263,1,0,0,0,266,267,5,3,0,0,267,1,1,
        0,0,0,268,278,3,6,3,0,269,278,3,8,4,0,270,278,3,10,5,0,271,278,3,
        12,6,0,272,278,3,16,8,0,273,278,3,18,9,0,274,278,3,22,11,0,275,278,
        3,102,51,0,276,278,3,52,26,0,277,268,1,0,0,0,277,269,1,0,0,0,277,
        270,1,0,0,0,277,271,1,0,0,0,277,272,1,0,0,0,277,273,1,0,0,0,277,
        274,1,0,0,0,277,275,1,0,0,0,277,276,1,0,0,0,278,3,1,0,0,0,279,285,
        3,10,5,0,280,285,3,12,6,0,281,285,3,22,11,0,282,285,3,18,9,0,283,
        285,3,16,8,0,284,279,1,0,0,0,284,280,1,0,0,0,284,281,1,0,0,0,284,
        282,1,0,0,0,284,283,1,0,0,0,285,5,1,0,0,0,286,287,5,2,0,0,287,288,
        5,15,0,0,288,289,5,106,0,0,289,293,3,250,125,0,290,292,3,52,26,0,
        291,290,1,0,0,0,292,295,1,0,0,0,293,291,1,0,0,0,293,294,1,0,0,0,
        294,296,1,0,0,0,295,293,1,0,0,0,296,297,5,3,0,0,297,7,1,0,0,0,298,
        299,5,2,0,0,299,300,5,16,0,0,300,301,3,10,5,0,301,302,5,3,0,0,302,
        309,1,0,0,0,303,304,5,2,0,0,304,305,5,16,0,0,305,306,3,12,6,0,306,
        307,5,3,0,0,307,309,1,0,0,0,308,298,1,0,0,0,308,303,1,0,0,0,309,
        9,1,0,0,0,310,311,5,2,0,0,311,315,5,7,0,0,312,314,3,14,7,0,313,312,
        1,0,0,0,314,317,1,0,0,0,315,313,1,0,0,0,315,316,1,0,0,0,316,318,
        1,0,0,0,317,315,1,0,0,0,318,319,5,106,0,0,319,320,3,176,88,0,320,
        321,5,3,0,0,321,11,1,0,0,0,322,323,5,2,0,0,323,327,5,9,0,0,324,326,
        3,14,7,0,325,324,1,0,0,0,326,329,1,0,0,0,327,325,1,0,0,0,327,328,
        1,0,0,0,328,330,1,0,0,0,329,327,1,0,0,0,330,331,5,106,0,0,331,332,
        3,176,88,0,332,333,5,3,0,0,333,13,1,0,0,0,334,335,5,89,0,0,335,336,
        5,102,0,0,336,15,1,0,0,0,337,338,5,2,0,0,338,339,5,74,0,0,339,341,
        5,106,0,0,340,342,3,154,77,0,341,340,1,0,0,0,341,342,1,0,0,0,342,
        343,1,0,0,0,343,344,3,108,54,0,344,345,5,3,0,0,345,17,1,0,0,0,346,
        347,5,2,0,0,347,348,5,75,0,0,348,350,5,106,0,0,349,351,3,154,77,
        0,350,349,1,0,0,0,350,351,1,0,0,0,351,353,1,0,0,0,352,354,3,20,10,
        0,353,352,1,0,0,0,353,354,1,0,0,0,354,355,1,0,0,0,355,356,3,124,
        62,0,356,357,5,3,0,0,357,19,1,0,0,0,358,359,5,2,0,0,359,361,5,72,
        0,0,360,362,3,108,54,0,361,360,1,0,0,0,362,363,1,0,0,0,363,361,1,
        0,0,0,363,364,1,0,0,0,364,365,1,0,0,0,365,366,5,3,0,0,366,21,1,0,
        0,0,367,368,5,2,0,0,368,372,5,48,0,0,369,371,3,34,17,0,370,369,1,
        0,0,0,371,374,1,0,0,0,372,370,1,0,0,0,372,373,1,0,0,0,373,375,1,
        0,0,0,374,372,1,0,0,0,375,377,5,106,0,0,376,378,3,154,77,0,377,376,
        1,0,0,0,377,378,1,0,0,0,378,380,1,0,0,0,379,381,3,26,13,0,380,379,
        1,0,0,0,380,381,1,0,0,0,381,383,1,0,0,0,382,384,3,28,14,0,383,382,
        1,0,0,0,383,384,1,0,0,0,384,385,1,0,0,0,385,386,3,30,15,0,386,387,
        5,3,0,0,387,23,1,0,0,0,388,389,5,2,0,0,389,393,5,48,0,0,390,392,
        3,34,17,0,391,390,1,0,0,0,392,395,1,0,0,0,393,391,1,0,0,0,393,394,
        1,0,0,0,394,397,1,0,0,0,395,393,1,0,0,0,396,398,3,26,13,0,397,396,
        1,0,0,0,397,398,1,0,0,0,398,400,1,0,0,0,399,401,3,28,14,0,400,399,
        1,0,0,0,400,401,1,0,0,0,401,402,1,0,0,0,402,403,3,30,15,0,403,404,
        5,3,0,0,404,25,1,0,0,0,405,406,5,2,0,0,406,407,5,72,0,0,407,408,
        3,108,54,0,408,409,5,3,0,0,409,27,1,0,0,0,410,411,5,2,0,0,411,413,
        5,55,0,0,412,414,3,108,54,0,413,412,1,0,0,0,414,415,1,0,0,0,415,
        413,1,0,0,0,415,416,1,0,0,0,416,417,1,0,0,0,417,418,5,3,0,0,418,
        29,1,0,0,0,419,420,5,2,0,0,420,424,5,45,0,0,421,423,3,32,16,0,422,
        421,1,0,0,0,423,426,1,0,0,0,424,422,1,0,0,0,424,425,1,0,0,0,425,
        427,1,0,0,0,426,424,1,0,0,0,427,428,5,3,0,0,428,31,1,0,0,0,429,436,
        3,36,18,0,430,436,3,38,19,0,431,436,3,40,20,0,432,436,3,42,21,0,
        433,436,3,44,22,0,434,436,3,46,23,0,435,429,1,0,0,0,435,430,1,0,
        0,0,435,431,1,0,0,0,435,432,1,0,0,0,435,433,1,0,0,0,435,434,1,0,
        0,0,436,33,1,0,0,0,437,438,5,102,0,0,438,35,1,0,0,0,439,440,5,2,
        0,0,440,444,5,49,0,0,441,443,3,34,17,0,442,441,1,0,0,0,443,446,1,
        0,0,0,444,442,1,0,0,0,444,445,1,0,0,0,445,447,1,0,0,0,446,444,1,
        0,0,0,447,450,5,106,0,0,448,449,5,81,0,0,449,451,3,108,54,0,450,
        448,1,0,0,0,450,451,1,0,0,0,451,453,1,0,0,0,452,454,3,176,88,0,453,
        452,1,0,0,0,453,454,1,0,0,0,454,455,1,0,0,0,455,456,5,3,0,0,456,
        37,1,0,0,0,457,458,5,2,0,0,458,459,5,50,0,0,459,463,3,50,25,0,460,
        462,3,52,26,0,461,460,1,0,0,0,462,465,1,0,0,0,463,461,1,0,0,0,463,
        464,1,0,0,0,464,466,1,0,0,0,465,463,1,0,0,0,466,467,5,3,0,0,467,
        39,1,0,0,0,468,469,5,2,0,0,469,473,5,12,0,0,470,472,3,34,17,0,471,
        470,1,0,0,0,472,475,1,0,0,0,473,471,1,0,0,0,473,474,1,0,0,0,474,
        476,1,0,0,0,475,473,1,0,0,0,476,477,5,106,0,0,477,481,3,50,25,0,
        478,480,3,52,26,0,479,478,1,0,0,0,480,483,1,0,0,0,481,479,1,0,0,
        0,481,482,1,0,0,0,482,484,1,0,0,0,483,481,1,0,0,0,484,485,5,3,0,
        0,485,41,1,0,0,0,486,487,5,2,0,0,487,491,5,47,0,0,488,490,3,34,17,
        0,489,488,1,0,0,0,490,493,1,0,0,0,491,489,1,0,0,0,491,492,1,0,0,
        0,492,494,1,0,0,0,493,491,1,0,0,0,494,495,5,106,0,0,495,496,3,50,
        25,0,496,497,5,3,0,0,497,43,1,0,0,0,498,499,5,2,0,0,499,503,5,53,
        0,0,500,502,3,34,17,0,501,500,1,0,0,0,502,505,1,0,0,0,503,501,1,
        0,0,0,503,504,1,0,0,0,504,506,1,0,0,0,505,503,1,0,0,0,506,507,5,
        106,0,0,507,511,3,50,25,0,508,510,3,52,26,0,509,508,1,0,0,0,510,
        513,1,0,0,0,511,509,1,0,0,0,511,512,1,0,0,0,512,514,1,0,0,0,513,
        511,1,0,0,0,514,515,5,3,0,0,515,45,1,0,0,0,516,517,5,2,0,0,517,521,
        5,54,0,0,518,520,3,34,17,0,519,518,1,0,0,0,520,523,1,0,0,0,521,519,
        1,0,0,0,521,522,1,0,0,0,522,524,1,0,0,0,523,521,1,0,0,0,524,525,
        5,106,0,0,525,529,3,50,25,0,526,528,3,52,26,0,527,526,1,0,0,0,528,
        531,1,0,0,0,529,527,1,0,0,0,529,530,1,0,0,0,530,532,1,0,0,0,531,
        529,1,0,0,0,532,533,5,3,0,0,533,47,1,0,0,0,534,535,5,2,0,0,535,537,
        5,106,0,0,536,538,5,77,0,0,537,536,1,0,0,0,537,538,1,0,0,0,538,541,
        1,0,0,0,539,540,5,81,0,0,540,542,3,108,54,0,541,539,1,0,0,0,541,
        542,1,0,0,0,542,543,1,0,0,0,543,544,5,3,0,0,544,49,1,0,0,0,545,556,
        5,2,0,0,546,553,3,48,24,0,547,549,5,4,0,0,548,547,1,0,0,0,548,549,
        1,0,0,0,549,550,1,0,0,0,550,552,3,48,24,0,551,548,1,0,0,0,552,555,
        1,0,0,0,553,551,1,0,0,0,553,554,1,0,0,0,554,557,1,0,0,0,555,553,
        1,0,0,0,556,546,1,0,0,0,556,557,1,0,0,0,557,558,1,0,0,0,558,564,
        5,3,0,0,559,560,5,2,0,0,560,561,5,73,0,0,561,562,3,108,54,0,562,
        563,5,3,0,0,563,565,1,0,0,0,564,559,1,0,0,0,564,565,1,0,0,0,565,
        51,1,0,0,0,566,585,3,54,27,0,567,585,3,56,28,0,568,585,3,58,29,0,
        569,585,3,60,30,0,570,585,3,62,31,0,571,585,3,64,32,0,572,585,3,
        66,33,0,573,585,3,68,34,0,574,585,3,70,35,0,575,585,3,72,36,0,576,
        585,3,74,37,0,577,585,3,80,40,0,578,585,3,164,82,0,579,585,3,170,
        85,0,580,585,3,172,86,0,581,585,3,174,87,0,582,585,3,162,81,0,583,
        585,3,176,88,0,584,566,1,0,0,0,584,567,1,0,0,0,584,568,1,0,0,0,584,
        569,1,0,0,0,584,570,1,0,0,0,584,571,1,0,0,0,584,572,1,0,0,0,584,
        573,1,0,0,0,584,574,1,0,0,0,584,575,1,0,0,0,584,576,1,0,0,0,584,
        577,1,0,0,0,584,578,1,0,0,0,584,579,1,0,0,0,584,580,1,0,0,0,584,
        581,1,0,0,0,584,582,1,0,0,0,584,583,1,0,0,0,585,53,1,0,0,0,586,587,
        5,2,0,0,587,588,5,6,0,0,588,592,5,2,0,0,589,591,3,104,52,0,590,589,
        1,0,0,0,591,594,1,0,0,0,592,590,1,0,0,0,592,593,1,0,0,0,593,595,
        1,0,0,0,594,592,1,0,0,0,595,599,5,3,0,0,596,598,3,52,26,0,597,596,
        1,0,0,0,598,601,1,0,0,0,599,597,1,0,0,0,599,600,1,0,0,0,600,602,
        1,0,0,0,601,599,1,0,0,0,602,603,5,3,0,0,603,55,1,0,0,0,604,605,5,
        2,0,0,605,606,5,7,0,0,606,607,3,106,53,0,607,608,3,176,88,0,608,
        609,5,3,0,0,609,57,1,0,0,0,610,611,5,2,0,0,611,612,5,8,0,0,612,616,
        5,2,0,0,613,615,3,104,52,0,614,613,1,0,0,0,615,618,1,0,0,0,616,614,
        1,0,0,0,616,617,1,0,0,0,617,619,1,0,0,0,618,616,1,0,0,0,619,623,
        5,3,0,0,620,622,3,52,26,0,621,620,1,0,0,0,622,625,1,0,0,0,623,621,
        1,0,0,0,623,624,1,0,0,0,624,626,1,0,0,0,625,623,1,0,0,0,626,627,
        5,3,0,0,627,59,1,0,0,0,628,629,5,2,0,0,629,630,5,9,0,0,630,631,3,
        106,53,0,631,632,3,176,88,0,632,633,5,3,0,0,633,61,1,0,0,0,634,635,
        5,2,0,0,635,636,5,17,0,0,636,637,3,176,88,0,637,639,3,52,26,0,638,
        640,3,52,26,0,639,638,1,0,0,0,639,640,1,0,0,0,640,641,1,0,0,0,641,
        642,5,3,0,0,642,63,1,0,0,0,643,644,5,2,0,0,644,645,5,18,0,0,645,
        649,3,176,88,0,646,648,3,52,26,0,647,646,1,0,0,0,648,651,1,0,0,0,
        649,647,1,0,0,0,649,650,1,0,0,0,650,652,1,0,0,0,651,649,1,0,0,0,
        652,653,5,3,0,0,653,65,1,0,0,0,654,655,5,2,0,0,655,659,5,19,0,0,
        656,658,3,52,26,0,657,656,1,0,0,0,658,661,1,0,0,0,659,657,1,0,0,
        0,659,660,1,0,0,0,660,662,1,0,0,0,661,659,1,0,0,0,662,663,5,3,0,
        0,663,67,1,0,0,0,664,665,5,2,0,0,665,667,5,20,0,0,666,668,3,176,
        88,0,667,666,1,0,0,0,667,668,1,0,0,0,668,669,1,0,0,0,669,670,5,3,
        0,0,670,69,1,0,0,0,671,672,5,2,0,0,672,673,5,21,0,0,673,674,3,176,
        88,0,674,675,5,3,0,0,675,71,1,0,0,0,676,677,5,2,0,0,677,679,5,38,
        0,0,678,680,3,218,109,0,679,678,1,0,0,0,679,680,1,0,0,0,680,681,
        1,0,0,0,681,682,5,104,0,0,682,683,5,3,0,0,683,73,1,0,0,0,684,685,
        5,2,0,0,685,686,5,98,0,0,686,687,3,76,38,0,687,688,5,104,0,0,688,
        689,5,3,0,0,689,75,1,0,0,0,690,691,5,2,0,0,691,693,5,106,0,0,692,
        694,3,78,39,0,693,692,1,0,0,0,694,695,1,0,0,0,695,693,1,0,0,0,695,
        696,1,0,0,0,696,697,1,0,0,0,697,698,5,3,0,0,698,77,1,0,0,0,699,705,
        5,106,0,0,700,701,5,2,0,0,701,702,5,106,0,0,702,703,5,106,0,0,703,
        705,5,3,0,0,704,699,1,0,0,0,704,700,1,0,0,0,705,79,1,0,0,0,706,716,
        3,82,41,0,707,716,3,84,42,0,708,716,3,86,43,0,709,716,3,94,47,0,
        710,716,3,90,45,0,711,716,3,92,46,0,712,716,3,96,48,0,713,716,3,
        98,49,0,714,716,3,100,50,0,715,706,1,0,0,0,715,707,1,0,0,0,715,708,
        1,0,0,0,715,709,1,0,0,0,715,710,1,0,0,0,715,711,1,0,0,0,715,712,
        1,0,0,0,715,713,1,0,0,0,715,714,1,0,0,0,716,81,1,0,0,0,717,718,5,
        2,0,0,718,719,5,92,0,0,719,720,5,106,0,0,720,721,3,176,88,0,721,
        722,5,3,0,0,722,83,1,0,0,0,723,724,5,2,0,0,724,725,5,93,0,0,725,
        726,3,22,11,0,726,727,5,3,0,0,727,749,1,0,0,0,728,729,5,2,0,0,729,
        730,5,93,0,0,730,731,3,24,12,0,731,732,5,3,0,0,732,749,1,0,0,0,733,
        734,5,2,0,0,734,735,5,93,0,0,735,736,3,10,5,0,736,737,5,3,0,0,737,
        749,1,0,0,0,738,739,5,2,0,0,739,740,5,93,0,0,740,741,3,12,6,0,741,
        742,5,3,0,0,742,749,1,0,0,0,743,744,5,2,0,0,744,745,5,93,0,0,745,
        746,3,176,88,0,746,747,5,3,0,0,747,749,1,0,0,0,748,723,1,0,0,0,748,
        728,1,0,0,0,748,733,1,0,0,0,748,738,1,0,0,0,748,743,1,0,0,0,749,
        85,1,0,0,0,750,751,5,2,0,0,751,753,5,94,0,0,752,754,3,88,44,0,753,
        752,1,0,0,0,754,755,1,0,0,0,755,753,1,0,0,0,755,756,1,0,0,0,756,
        757,1,0,0,0,757,758,5,3,0,0,758,87,1,0,0,0,759,760,5,2,0,0,760,762,
        5,106,0,0,761,763,5,106,0,0,762,761,1,0,0,0,762,763,1,0,0,0,763,
        764,1,0,0,0,764,765,5,3,0,0,765,89,1,0,0,0,766,767,5,2,0,0,767,768,
        5,96,0,0,768,770,5,104,0,0,769,771,3,88,44,0,770,769,1,0,0,0,771,
        772,1,0,0,0,772,770,1,0,0,0,772,773,1,0,0,0,773,774,1,0,0,0,774,
        775,5,3,0,0,775,91,1,0,0,0,776,777,5,2,0,0,777,778,5,97,0,0,778,
        779,5,104,0,0,779,780,5,3,0,0,780,93,1,0,0,0,781,782,5,2,0,0,782,
        783,5,95,0,0,783,784,5,104,0,0,784,785,5,104,0,0,785,786,5,3,0,0,
        786,95,1,0,0,0,787,788,5,2,0,0,788,790,5,101,0,0,789,791,3,88,44,
        0,790,789,1,0,0,0,791,792,1,0,0,0,792,790,1,0,0,0,792,793,1,0,0,
        0,793,794,1,0,0,0,794,795,5,3,0,0,795,97,1,0,0,0,796,797,5,2,0,0,
        797,798,5,100,0,0,798,800,5,104,0,0,799,801,3,88,44,0,800,799,1,
        0,0,0,801,802,1,0,0,0,802,800,1,0,0,0,802,803,1,0,0,0,803,804,1,
        0,0,0,804,805,5,3,0,0,805,99,1,0,0,0,806,807,5,2,0,0,807,808,5,99,
        0,0,808,809,5,104,0,0,809,810,5,3,0,0,810,101,1,0,0,0,811,812,5,
        2,0,0,812,813,5,92,0,0,813,814,3,4,2,0,814,815,5,3,0,0,815,103,1,
        0,0,0,816,817,5,2,0,0,817,820,5,106,0,0,818,819,5,81,0,0,819,821,
        3,108,54,0,820,818,1,0,0,0,820,821,1,0,0,0,821,822,1,0,0,0,822,823,
        3,176,88,0,823,824,5,3,0,0,824,105,1,0,0,0,825,826,5,2,0,0,826,829,
        5,106,0,0,827,828,5,81,0,0,828,830,3,108,54,0,829,827,1,0,0,0,829,
        830,1,0,0,0,830,831,1,0,0,0,831,832,5,3,0,0,832,107,1,0,0,0,833,
        850,5,106,0,0,834,850,3,110,55,0,835,850,3,112,56,0,836,850,3,114,
        57,0,837,850,3,116,58,0,838,850,3,120,60,0,839,850,3,124,62,0,840,
        850,3,130,65,0,841,850,3,132,66,0,842,850,3,134,67,0,843,850,3,136,
        68,0,844,850,3,138,69,0,845,850,3,140,70,0,846,850,3,142,71,0,847,
        850,3,148,74,0,848,850,3,152,76,0,849,833,1,0,0,0,849,834,1,0,0,
        0,849,835,1,0,0,0,849,836,1,0,0,0,849,837,1,0,0,0,849,838,1,0,0,
        0,849,839,1,0,0,0,849,840,1,0,0,0,849,841,1,0,0,0,849,842,1,0,0,
        0,849,843,1,0,0,0,849,844,1,0,0,0,849,845,1,0,0,0,849,846,1,0,0,
        0,849,847,1,0,0,0,849,848,1,0,0,0,850,109,1,0,0,0,851,852,5,2,0,
        0,852,853,5,56,0,0,853,855,3,108,54,0,854,856,3,108,54,0,855,854,
        1,0,0,0,856,857,1,0,0,0,857,855,1,0,0,0,857,858,1,0,0,0,858,859,
        1,0,0,0,859,860,5,3,0,0,860,111,1,0,0,0,861,862,5,2,0,0,862,863,
        5,57,0,0,863,865,3,108,54,0,864,866,3,108,54,0,865,864,1,0,0,0,866,
        867,1,0,0,0,867,865,1,0,0,0,867,868,1,0,0,0,868,869,1,0,0,0,869,
        870,5,3,0,0,870,113,1,0,0,0,871,872,5,2,0,0,872,873,5,26,0,0,873,
        874,3,108,54,0,874,875,5,3,0,0,875,115,1,0,0,0,876,877,5,2,0,0,877,
        879,5,58,0,0,878,880,3,118,59,0,879,878,1,0,0,0,880,881,1,0,0,0,
        881,879,1,0,0,0,881,882,1,0,0,0,882,883,1,0,0,0,883,884,5,3,0,0,
        884,117,1,0,0,0,885,886,5,2,0,0,886,887,5,68,0,0,887,888,3,108,54,
        0,888,889,5,3,0,0,889,897,1,0,0,0,890,891,5,2,0,0,891,892,5,106,
        0,0,892,893,3,108,54,0,893,894,5,3,0,0,894,897,1,0,0,0,895,897,3,
        108,54,0,896,885,1,0,0,0,896,890,1,0,0,0,896,895,1,0,0,0,897,119,
        1,0,0,0,898,899,5,2,0,0,899,901,5,59,0,0,900,902,3,154,77,0,901,
        900,1,0,0,0,901,902,1,0,0,0,902,903,1,0,0,0,903,907,5,2,0,0,904,
        906,3,122,61,0,905,904,1,0,0,0,906,909,1,0,0,0,907,905,1,0,0,0,907,
        908,1,0,0,0,908,910,1,0,0,0,909,907,1,0,0,0,910,911,5,3,0,0,911,
        912,3,108,54,0,912,913,5,3,0,0,913,121,1,0,0,0,914,915,5,2,0,0,915,
        917,5,106,0,0,916,918,5,77,0,0,917,916,1,0,0,0,917,918,1,0,0,0,918,
        919,1,0,0,0,919,920,3,108,54,0,920,921,5,3,0,0,921,123,1,0,0,0,922,
        923,5,2,0,0,923,927,5,106,0,0,924,926,3,126,63,0,925,924,1,0,0,0,
        926,929,1,0,0,0,927,925,1,0,0,0,927,928,1,0,0,0,928,930,1,0,0,0,
        929,927,1,0,0,0,930,931,5,3,0,0,931,125,1,0,0,0,932,936,5,2,0,0,
        933,935,3,128,64,0,934,933,1,0,0,0,935,938,1,0,0,0,936,934,1,0,0,
        0,936,937,1,0,0,0,937,939,1,0,0,0,938,936,1,0,0,0,939,941,5,106,
        0,0,940,942,5,77,0,0,941,940,1,0,0,0,941,942,1,0,0,0,942,943,1,0,
        0,0,943,944,3,108,54,0,944,945,5,3,0,0,945,127,1,0,0,0,946,947,5,
        69,0,0,947,129,1,0,0,0,948,949,5,2,0,0,949,950,5,60,0,0,950,951,
        7,0,0,0,951,952,5,3,0,0,952,131,1,0,0,0,953,954,5,2,0,0,954,955,
        5,61,0,0,955,956,3,108,54,0,956,957,5,3,0,0,957,133,1,0,0,0,958,
        959,5,2,0,0,959,960,5,62,0,0,960,961,5,106,0,0,961,962,5,3,0,0,962,
        135,1,0,0,0,963,964,5,2,0,0,964,965,5,31,0,0,965,966,3,108,54,0,
        966,967,3,108,54,0,967,968,5,3,0,0,968,137,1,0,0,0,969,970,5,2,0,
        0,970,971,5,24,0,0,971,972,3,108,54,0,972,973,3,108,54,0,973,974,
        3,108,54,0,974,975,3,108,54,0,975,976,5,3,0,0,976,139,1,0,0,0,977,
        978,5,2,0,0,978,979,5,64,0,0,979,980,5,106,0,0,980,981,5,3,0,0,981,
        141,1,0,0,0,982,983,5,2,0,0,983,984,5,65,0,0,984,985,5,106,0,0,985,
        987,3,108,54,0,986,988,3,144,72,0,987,986,1,0,0,0,987,988,1,0,0,
        0,988,989,1,0,0,0,989,990,3,108,54,0,990,991,5,3,0,0,991,143,1,0,
        0,0,992,993,5,2,0,0,993,995,5,76,0,0,994,996,3,146,73,0,995,994,
        1,0,0,0,996,997,1,0,0,0,997,995,1,0,0,0,997,998,1,0,0,0,998,999,
        1,0,0,0,999,1000,5,3,0,0,1000,145,1,0,0,0,1001,1002,7,1,0,0,1002,
        147,1,0,0,0,1003,1004,5,2,0,0,1004,1006,5,66,0,0,1005,1007,3,150,
        75,0,1006,1005,1,0,0,0,1007,1008,1,0,0,0,1008,1006,1,0,0,0,1008,
        1009,1,0,0,0,1009,1010,1,0,0,0,1010,1011,5,3,0,0,1011,149,1,0,0,
        0,1012,1015,5,104,0,0,1013,1015,3,108,54,0,1014,1012,1,0,0,0,1014,
        1013,1,0,0,0,1015,151,1,0,0,0,1016,1017,5,2,0,0,1017,1019,3,108,
        54,0,1018,1020,3,108,54,0,1019,1018,1,0,0,0,1020,1021,1,0,0,0,1021,
        1019,1,0,0,0,1021,1022,1,0,0,0,1022,1023,1,0,0,0,1023,1024,5,3,0,
        0,1024,153,1,0,0,0,1025,1026,5,2,0,0,1026,1028,5,70,0,0,1027,1029,
        3,156,78,0,1028,1027,1,0,0,0,1029,1030,1,0,0,0,1030,1028,1,0,0,0,
        1030,1031,1,0,0,0,1031,1032,1,0,0,0,1032,1033,5,3,0,0,1033,155,1,
        0,0,0,1034,1045,5,106,0,0,1035,1036,5,2,0,0,1036,1038,5,106,0,0,
        1037,1039,3,158,79,0,1038,1037,1,0,0,0,1038,1039,1,0,0,0,1039,1041,
        1,0,0,0,1040,1042,3,160,80,0,1041,1040,1,0,0,0,1041,1042,1,0,0,0,
        1042,1043,1,0,0,0,1043,1045,5,3,0,0,1044,1034,1,0,0,0,1044,1035,
        1,0,0,0,1045,157,1,0,0,0,1046,1047,5,2,0,0,1047,1048,5,72,0,0,1048,
        1049,3,108,54,0,1049,1050,5,3,0,0,1050,159,1,0,0,0,1051,1052,5,2,
        0,0,1052,1053,5,41,0,0,1053,1054,3,108,54,0,1054,1055,5,3,0,0,1055,
        161,1,0,0,0,1056,1057,5,2,0,0,1057,1058,5,22,0,0,1058,1059,5,106,
        0,0,1059,1060,3,176,88,0,1060,1061,5,3,0,0,1061,1069,1,0,0,0,1062,
        1063,5,2,0,0,1063,1064,5,22,0,0,1064,1065,3,230,115,0,1065,1066,
        3,176,88,0,1066,1067,5,3,0,0,1067,1069,1,0,0,0,1068,1056,1,0,0,0,
        1068,1062,1,0,0,0,1069,163,1,0,0,0,1070,1071,5,2,0,0,1071,1072,5,
        39,0,0,1072,1076,3,176,88,0,1073,1075,3,166,83,0,1074,1073,1,0,0,
        0,1075,1078,1,0,0,0,1076,1074,1,0,0,0,1076,1077,1,0,0,0,1077,1080,
        1,0,0,0,1078,1076,1,0,0,0,1079,1081,3,168,84,0,1080,1079,1,0,0,0,
        1080,1081,1,0,0,0,1081,1082,1,0,0,0,1082,1083,5,3,0,0,1083,165,1,
        0,0,0,1084,1085,5,2,0,0,1085,1086,5,40,0,0,1086,1090,3,176,88,0,
        1087,1089,3,52,26,0,1088,1087,1,0,0,0,1089,1092,1,0,0,0,1090,1088,
        1,0,0,0,1090,1091,1,0,0,0,1091,1093,1,0,0,0,1092,1090,1,0,0,0,1093,
        1094,5,3,0,0,1094,167,1,0,0,0,1095,1096,5,2,0,0,1096,1100,5,41,0,
        0,1097,1099,3,52,26,0,1098,1097,1,0,0,0,1099,1102,1,0,0,0,1100,1098,
        1,0,0,0,1100,1101,1,0,0,0,1101,1103,1,0,0,0,1102,1100,1,0,0,0,1103,
        1104,5,3,0,0,1104,169,1,0,0,0,1105,1106,5,2,0,0,1106,1107,5,44,0,
        0,1107,1108,3,56,28,0,1108,1109,3,176,88,0,1109,1113,3,162,81,0,
        1110,1112,3,52,26,0,1111,1110,1,0,0,0,1112,1115,1,0,0,0,1113,1111,
        1,0,0,0,1113,1114,1,0,0,0,1114,1116,1,0,0,0,1115,1113,1,0,0,0,1116,
        1117,5,3,0,0,1117,171,1,0,0,0,1118,1119,5,2,0,0,1119,1120,5,42,0,
        0,1120,1121,5,106,0,0,1121,1125,3,176,88,0,1122,1124,3,52,26,0,1123,
        1122,1,0,0,0,1124,1127,1,0,0,0,1125,1123,1,0,0,0,1125,1126,1,0,0,
        0,1126,1128,1,0,0,0,1127,1125,1,0,0,0,1128,1129,5,3,0,0,1129,173,
        1,0,0,0,1130,1131,5,2,0,0,1131,1132,5,43,0,0,1132,1133,5,106,0,0,
        1133,1137,3,176,88,0,1134,1136,3,52,26,0,1135,1134,1,0,0,0,1136,
        1139,1,0,0,0,1137,1135,1,0,0,0,1137,1138,1,0,0,0,1138,1140,1,0,0,
        0,1139,1137,1,0,0,0,1140,1141,5,3,0,0,1141,175,1,0,0,0,1142,1178,
        3,256,128,0,1143,1178,5,102,0,0,1144,1178,5,106,0,0,1145,1178,3,
        190,95,0,1146,1178,3,192,96,0,1147,1178,3,194,97,0,1148,1178,3,196,
        98,0,1149,1178,3,198,99,0,1150,1178,3,200,100,0,1151,1178,3,202,
        101,0,1152,1178,3,204,102,0,1153,1178,3,206,103,0,1154,1178,3,208,
        104,0,1155,1178,3,210,105,0,1156,1178,3,218,109,0,1157,1178,3,224,
        112,0,1158,1178,3,230,115,0,1159,1178,3,232,116,0,1160,1178,3,234,
        117,0,1161,1178,3,236,118,0,1162,1178,3,238,119,0,1163,1178,3,212,
        106,0,1164,1178,3,214,107,0,1165,1178,3,216,108,0,1166,1178,3,240,
        120,0,1167,1178,3,242,121,0,1168,1178,3,244,122,0,1169,1178,3,186,
        93,0,1170,1178,3,188,94,0,1171,1178,3,226,113,0,1172,1178,3,178,
        89,0,1173,1178,3,180,90,0,1174,1178,3,182,91,0,1175,1178,3,184,92,
        0,1176,1178,3,246,123,0,1177,1142,1,0,0,0,1177,1143,1,0,0,0,1177,
        1144,1,0,0,0,1177,1145,1,0,0,0,1177,1146,1,0,0,0,1177,1147,1,0,0,
        0,1177,1148,1,0,0,0,1177,1149,1,0,0,0,1177,1150,1,0,0,0,1177,1151,
        1,0,0,0,1177,1152,1,0,0,0,1177,1153,1,0,0,0,1177,1154,1,0,0,0,1177,
        1155,1,0,0,0,1177,1156,1,0,0,0,1177,1157,1,0,0,0,1177,1158,1,0,0,
        0,1177,1159,1,0,0,0,1177,1160,1,0,0,0,1177,1161,1,0,0,0,1177,1162,
        1,0,0,0,1177,1163,1,0,0,0,1177,1164,1,0,0,0,1177,1165,1,0,0,0,1177,
        1166,1,0,0,0,1177,1167,1,0,0,0,1177,1168,1,0,0,0,1177,1169,1,0,0,
        0,1177,1170,1,0,0,0,1177,1171,1,0,0,0,1177,1172,1,0,0,0,1177,1173,
        1,0,0,0,1177,1174,1,0,0,0,1177,1175,1,0,0,0,1177,1176,1,0,0,0,1178,
        177,1,0,0,0,1179,1180,5,51,0,0,1180,179,1,0,0,0,1181,1182,5,52,0,
        0,1182,181,1,0,0,0,1183,1184,5,2,0,0,1184,1188,5,52,0,0,1185,1187,
        3,176,88,0,1186,1185,1,0,0,0,1187,1190,1,0,0,0,1188,1186,1,0,0,0,
        1188,1189,1,0,0,0,1189,1191,1,0,0,0,1190,1188,1,0,0,0,1191,1192,
        5,3,0,0,1192,183,1,0,0,0,1193,1194,5,2,0,0,1194,1195,5,46,0,0,1195,
        1199,5,106,0,0,1196,1198,3,176,88,0,1197,1196,1,0,0,0,1198,1201,
        1,0,0,0,1199,1197,1,0,0,0,1199,1200,1,0,0,0,1200,1202,1,0,0,0,1201,
        1199,1,0,0,0,1202,1203,5,3,0,0,1203,185,1,0,0,0,1204,1205,5,2,0,
        0,1205,1206,5,62,0,0,1206,1207,3,176,88,0,1207,1208,5,3,0,0,1208,
        187,1,0,0,0,1209,1210,5,2,0,0,1210,1211,5,63,0,0,1211,1212,3,176,
        88,0,1212,1213,3,108,54,0,1213,1214,5,3,0,0,1214,189,1,0,0,0,1215,
        1216,5,2,0,0,1216,1217,5,10,0,0,1217,1221,3,250,125,0,1218,1220,
        3,52,26,0,1219,1218,1,0,0,0,1220,1223,1,0,0,0,1221,1219,1,0,0,0,
        1221,1222,1,0,0,0,1222,1224,1,0,0,0,1223,1221,1,0,0,0,1224,1225,
        5,3,0,0,1225,191,1,0,0,0,1226,1227,5,2,0,0,1227,1228,5,11,0,0,1228,
        1232,3,250,125,0,1229,1231,3,52,26,0,1230,1229,1,0,0,0,1231,1234,
        1,0,0,0,1232,1230,1,0,0,0,1232,1233,1,0,0,0,1233,1235,1,0,0,0,1234,
        1232,1,0,0,0,1235,1236,5,3,0,0,1236,193,1,0,0,0,1237,1238,5,2,0,
        0,1238,1239,5,83,0,0,1239,1243,3,250,125,0,1240,1242,3,52,26,0,1241,
        1240,1,0,0,0,1242,1245,1,0,0,0,1243,1241,1,0,0,0,1243,1244,1,0,0,
        0,1244,1246,1,0,0,0,1245,1243,1,0,0,0,1246,1247,5,3,0,0,1247,195,
        1,0,0,0,1248,1249,5,2,0,0,1249,1250,5,84,0,0,1250,1254,3,250,125,
        0,1251,1253,3,52,26,0,1252,1251,1,0,0,0,1253,1256,1,0,0,0,1254,1252,
        1,0,0,0,1254,1255,1,0,0,0,1255,1257,1,0,0,0,1256,1254,1,0,0,0,1257,
        1258,5,3,0,0,1258,197,1,0,0,0,1259,1260,5,2,0,0,1260,1261,5,85,0,
        0,1261,1265,3,250,125,0,1262,1264,3,52,26,0,1263,1262,1,0,0,0,1264,
        1267,1,0,0,0,1265,1263,1,0,0,0,1265,1266,1,0,0,0,1266,1268,1,0,0,
        0,1267,1265,1,0,0,0,1268,1269,5,3,0,0,1269,199,1,0,0,0,1270,1271,
        5,2,0,0,1271,1272,5,82,0,0,1272,1276,3,250,125,0,1273,1275,3,52,
        26,0,1274,1273,1,0,0,0,1275,1278,1,0,0,0,1276,1274,1,0,0,0,1276,
        1277,1,0,0,0,1277,1279,1,0,0,0,1278,1276,1,0,0,0,1279,1280,5,3,0,
        0,1280,201,1,0,0,0,1281,1282,5,2,0,0,1282,1283,5,88,0,0,1283,1284,
        3,176,88,0,1284,1285,5,3,0,0,1285,203,1,0,0,0,1286,1287,5,2,0,0,
        1287,1289,5,87,0,0,1288,1290,3,176,88,0,1289,1288,1,0,0,0,1289,1290,
        1,0,0,0,1290,1291,1,0,0,0,1291,1292,5,3,0,0,1292,205,1,0,0,0,1293,
        1294,5,2,0,0,1294,1295,5,86,0,0,1295,1296,3,176,88,0,1296,1297,5,
        3,0,0,1297,207,1,0,0,0,1298,1299,5,2,0,0,1299,1300,5,13,0,0,1300,
        1301,3,176,88,0,1301,1305,3,176,88,0,1302,1304,3,176,88,0,1303,1302,
        1,0,0,0,1304,1307,1,0,0,0,1305,1303,1,0,0,0,1305,1306,1,0,0,0,1306,
        1308,1,0,0,0,1307,1305,1,0,0,0,1308,1309,5,3,0,0,1309,209,1,0,0,
        0,1310,1311,5,2,0,0,1311,1312,5,14,0,0,1312,1313,3,176,88,0,1313,
        1317,3,176,88,0,1314,1316,3,176,88,0,1315,1314,1,0,0,0,1316,1319,
        1,0,0,0,1317,1315,1,0,0,0,1317,1318,1,0,0,0,1318,1320,1,0,0,0,1319,
        1317,1,0,0,0,1320,1321,5,3,0,0,1321,211,1,0,0,0,1322,1323,5,2,0,
        0,1323,1324,5,23,0,0,1324,1325,3,176,88,0,1325,1326,3,176,88,0,1326,
        1327,3,176,88,0,1327,1328,5,3,0,0,1328,213,1,0,0,0,1329,1330,5,2,
        0,0,1330,1334,5,24,0,0,1331,1332,3,176,88,0,1332,1333,3,176,88,0,
        1333,1335,1,0,0,0,1334,1331,1,0,0,0,1335,1336,1,0,0,0,1336,1334,
        1,0,0,0,1336,1337,1,0,0,0,1337,1338,1,0,0,0,1338,1339,5,3,0,0,1339,
        215,1,0,0,0,1340,1341,5,2,0,0,1341,1342,5,37,0,0,1342,1344,5,106,
        0,0,1343,1345,3,248,124,0,1344,1343,1,0,0,0,1344,1345,1,0,0,0,1345,
        1349,1,0,0,0,1346,1348,3,176,88,0,1347,1346,1,0,0,0,1348,1351,1,
        0,0,0,1349,1347,1,0,0,0,1349,1350,1,0,0,0,1350,1352,1,0,0,0,1351,
        1349,1,0,0,0,1352,1353,5,3,0,0,1353,217,1,0,0,0,1354,1355,5,2,0,
        0,1355,1359,5,25,0,0,1356,1358,3,220,110,0,1357,1356,1,0,0,0,1358,
        1361,1,0,0,0,1359,1357,1,0,0,0,1359,1360,1,0,0,0,1360,1362,1,0,0,
        0,1361,1359,1,0,0,0,1362,1363,5,3,0,0,1363,219,1,0,0,0,1364,1365,
        5,2,0,0,1365,1366,3,228,114,0,1366,1367,3,176,88,0,1367,1368,5,3,
        0,0,1368,1378,1,0,0,0,1369,1370,5,2,0,0,1370,1371,3,228,114,0,1371,
        1372,3,222,111,0,1372,1373,5,3,0,0,1373,1378,1,0,0,0,1374,1375,5,
        2,0,0,1375,1376,5,106,0,0,1376,1378,5,3,0,0,1377,1364,1,0,0,0,1377,
        1369,1,0,0,0,1377,1374,1,0,0,0,1378,221,1,0,0,0,1379,1380,5,2,0,
        0,1380,1381,5,12,0,0,1381,1385,3,250,125,0,1382,1384,3,52,26,0,1383,
        1382,1,0,0,0,1384,1387,1,0,0,0,1385,1383,1,0,0,0,1385,1386,1,0,0,
        0,1386,1388,1,0,0,0,1387,1385,1,0,0,0,1388,1389,5,3,0,0,1389,223,
        1,0,0,0,1390,1391,5,2,0,0,1391,1395,5,27,0,0,1392,1394,3,176,88,
        0,1393,1392,1,0,0,0,1394,1397,1,0,0,0,1395,1393,1,0,0,0,1395,1396,
        1,0,0,0,1396,1398,1,0,0,0,1397,1395,1,0,0,0,1398,1399,5,3,0,0,1399,
        225,1,0,0,0,1400,1401,5,2,0,0,1401,1404,5,67,0,0,1402,1405,5,104,
        0,0,1403,1405,3,176,88,0,1404,1402,1,0,0,0,1404,1403,1,0,0,0,1405,
        1406,1,0,0,0,1406,1404,1,0,0,0,1406,1407,1,0,0,0,1407,1408,1,0,0,
        0,1408,1409,5,3,0,0,1409,227,1,0,0,0,1410,1411,7,2,0,0,1411,229,
        1,0,0,0,1412,1413,5,2,0,0,1413,1414,5,30,0,0,1414,1415,3,176,88,
        0,1415,1416,3,228,114,0,1416,1417,5,3,0,0,1417,231,1,0,0,0,1418,
        1419,5,2,0,0,1419,1420,5,31,0,0,1420,1421,3,176,88,0,1421,1422,3,
        176,88,0,1422,1423,5,3,0,0,1423,233,1,0,0,0,1424,1425,5,2,0,0,1425,
        1426,7,3,0,0,1426,1427,3,176,88,0,1427,1428,5,3,0,0,1428,235,1,0,
        0,0,1429,1430,5,2,0,0,1430,1431,5,36,0,0,1431,1432,3,176,88,0,1432,
        1433,5,3,0,0,1433,237,1,0,0,0,1434,1435,5,2,0,0,1435,1436,5,35,0,
        0,1436,1437,3,176,88,0,1437,1438,5,3,0,0,1438,239,1,0,0,0,1439,1440,
        5,2,0,0,1440,1441,5,29,0,0,1441,1442,3,176,88,0,1442,1443,3,228,
        114,0,1443,1444,5,3,0,0,1444,241,1,0,0,0,1445,1446,5,2,0,0,1446,
        1447,5,28,0,0,1447,1448,3,176,88,0,1448,1449,3,176,88,0,1449,1450,
        5,3,0,0,1450,243,1,0,0,0,1451,1452,5,2,0,0,1452,1453,5,32,0,0,1453,
        1454,3,176,88,0,1454,1455,3,176,88,0,1455,1456,5,3,0,0,1456,245,
        1,0,0,0,1457,1458,5,2,0,0,1458,1460,3,176,88,0,1459,1461,3,248,124,
        0,1460,1459,1,0,0,0,1460,1461,1,0,0,0,1461,1465,1,0,0,0,1462,1464,
        3,176,88,0,1463,1462,1,0,0,0,1464,1467,1,0,0,0,1465,1463,1,0,0,0,
        1465,1466,1,0,0,0,1466,1468,1,0,0,0,1467,1465,1,0,0,0,1468,1469,
        5,3,0,0,1469,247,1,0,0,0,1470,1471,5,2,0,0,1471,1473,5,71,0,0,1472,
        1474,3,108,54,0,1473,1472,1,0,0,0,1474,1475,1,0,0,0,1475,1473,1,
        0,0,0,1475,1476,1,0,0,0,1476,1477,1,0,0,0,1477,1478,5,3,0,0,1478,
        249,1,0,0,0,1479,1496,5,2,0,0,1480,1487,3,252,126,0,1481,1483,5,
        4,0,0,1482,1481,1,0,0,0,1482,1483,1,0,0,0,1483,1484,1,0,0,0,1484,
        1486,3,252,126,0,1485,1482,1,0,0,0,1486,1489,1,0,0,0,1487,1485,1,
        0,0,0,1487,1488,1,0,0,0,1488,1494,1,0,0,0,1489,1487,1,0,0,0,1490,
        1492,5,4,0,0,1491,1490,1,0,0,0,1491,1492,1,0,0,0,1492,1493,1,0,0,
        0,1493,1495,3,254,127,0,1494,1491,1,0,0,0,1494,1495,1,0,0,0,1495,
        1497,1,0,0,0,1496,1480,1,0,0,0,1496,1497,1,0,0,0,1497,1498,1,0,0,
        0,1498,1504,5,3,0,0,1499,1500,5,2,0,0,1500,1501,3,254,127,0,1501,
        1502,5,3,0,0,1502,1504,1,0,0,0,1503,1479,1,0,0,0,1503,1499,1,0,0,
        0,1504,251,1,0,0,0,1505,1506,5,2,0,0,1506,1507,5,106,0,0,1507,1508,
        5,3,0,0,1508,253,1,0,0,0,1509,1510,5,2,0,0,1510,1511,5,68,0,0,1511,
        1512,5,106,0,0,1512,1513,5,3,0,0,1513,255,1,0,0,0,1514,1515,7,4,
        0,0,1515,257,1,0,0,0,117,263,277,284,293,308,315,327,341,350,353,
        363,372,377,380,383,393,397,400,415,424,435,444,450,453,463,473,
        481,491,503,511,521,529,537,541,548,553,556,564,584,592,599,616,
        623,639,649,659,667,679,695,704,715,748,755,762,772,792,802,820,
        829,849,857,867,881,896,901,907,917,927,936,941,987,997,1008,1014,
        1021,1030,1038,1041,1044,1068,1076,1080,1090,1100,1113,1125,1137,
        1177,1188,1199,1221,1232,1243,1254,1265,1276,1289,1305,1317,1336,
        1344,1349,1359,1377,1385,1395,1404,1406,1460,1465,1475,1482,1487,
        1491,1494,1496,1503
    ];

    private static __ATN: antlr.ATN;
    public static get _ATN(): antlr.ATN {
        if (!Stage5Parser.__ATN) {
            Stage5Parser.__ATN = new antlr.ATNDeserializer().deserialize(Stage5Parser._serializedATN);
        }

        return Stage5Parser.__ATN;
    }


    private static readonly vocabulary = new antlr.Vocabulary(Stage5Parser.literalNames, Stage5Parser.symbolicNames, []);

    public override get vocabulary(): antlr.Vocabulary {
        return Stage5Parser.vocabulary;
    }

    private static readonly decisionsToDFA = Stage5Parser._ATN.decisionToState.map( (ds: antlr.DecisionState, index: number) => new antlr.DFA(ds, index) );
}

export class ProgramContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public PROGRAM(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.PROGRAM, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.RPAREN, 0)!;
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
        return Stage5Parser.RULE_program;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterProgram) {
             listener.enterProgram(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return Stage5Parser.RULE_topLevel;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterTopLevel) {
             listener.enterTopLevel(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return Stage5Parser.RULE_decl;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterDecl) {
             listener.enterDecl(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public DEFMACRO(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.DEFMACRO, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.IDENTIFIER, 0)!;
    }
    public fnSignature(): FnSignatureContext {
        return this.getRuleContext(0, FnSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.RPAREN, 0)!;
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
        return Stage5Parser.RULE_defmacro;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterDefmacro) {
             listener.enterDefmacro(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public MACRO_TIME_ATTR(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.MACRO_TIME_ATTR, 0)!;
    }
    public topLevelLet(): TopLevelLetContext | null {
        return this.getRuleContext(0, TopLevelLetContext);
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.RPAREN, 0)!;
    }
    public topLevelConst(): TopLevelConstContext | null {
        return this.getRuleContext(0, TopLevelConstContext);
    }
    public override get ruleIndex(): number {
        return Stage5Parser.RULE_macroTimeFnDef;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterMacroTimeFnDef) {
             listener.enterMacroTimeFnDef(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public LET(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.LET, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.IDENTIFIER, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.RPAREN, 0)!;
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
        return Stage5Parser.RULE_topLevelLet;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterTopLevelLet) {
             listener.enterTopLevelLet(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public CONST(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.CONST, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.IDENTIFIER, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.RPAREN, 0)!;
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
        return Stage5Parser.RULE_topLevelConst;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterTopLevelConst) {
             listener.enterTopLevelConst(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.CARET, 0)!;
    }
    public KEYWORD(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.KEYWORD, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage5Parser.RULE_metaAnnotation;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterMetaAnnotation) {
             listener.enterMetaAnnotation(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public TYPE(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.TYPE, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.IDENTIFIER, 0)!;
    }
    public typeExpr(): TypeExprContext {
        return this.getRuleContext(0, TypeExprContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.RPAREN, 0)!;
    }
    public typeParams(): TypeParamsContext | null {
        return this.getRuleContext(0, TypeParamsContext);
    }
    public override get ruleIndex(): number {
        return Stage5Parser.RULE_typeAlias;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterTypeAlias) {
             listener.enterTypeAlias(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public INTERFACE(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.INTERFACE, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.IDENTIFIER, 0)!;
    }
    public typeObject(): TypeObjectContext {
        return this.getRuleContext(0, TypeObjectContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.RPAREN, 0)!;
    }
    public typeParams(): TypeParamsContext | null {
        return this.getRuleContext(0, TypeParamsContext);
    }
    public interfaceExtends(): InterfaceExtendsContext | null {
        return this.getRuleContext(0, InterfaceExtendsContext);
    }
    public override get ruleIndex(): number {
        return Stage5Parser.RULE_interfaceDef;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterInterfaceDef) {
             listener.enterInterfaceDef(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public EXTENDS(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.EXTENDS, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.RPAREN, 0)!;
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
        return Stage5Parser.RULE_interfaceExtends;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterInterfaceExtends) {
             listener.enterInterfaceExtends(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public CLASS(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.CLASS, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.IDENTIFIER, 0)!;
    }
    public classBody(): ClassBodyContext {
        return this.getRuleContext(0, ClassBodyContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.RPAREN, 0)!;
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
        return Stage5Parser.RULE_classDef;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterClassDef) {
             listener.enterClassDef(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public CLASS(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.CLASS, 0)!;
    }
    public classBody(): ClassBodyContext {
        return this.getRuleContext(0, ClassBodyContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.RPAREN, 0)!;
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
        return Stage5Parser.RULE_anonClassDef;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterAnonClassDef) {
             listener.enterAnonClassDef(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public EXTENDS(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.EXTENDS, 0)!;
    }
    public typeExpr(): TypeExprContext {
        return this.getRuleContext(0, TypeExprContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage5Parser.RULE_classExtends;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterClassExtends) {
             listener.enterClassExtends(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public IMPLEMENTS(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.IMPLEMENTS, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.RPAREN, 0)!;
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
        return Stage5Parser.RULE_classImplements;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterClassImplements) {
             listener.enterClassImplements(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public CLASS_BODY(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.CLASS_BODY, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.RPAREN, 0)!;
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
        return Stage5Parser.RULE_classBody;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterClassBody) {
             listener.enterClassBody(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return Stage5Parser.RULE_classElement;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterClassElement) {
             listener.enterClassElement(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.KEYWORD, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage5Parser.RULE_modifier;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterModifier) {
             listener.enterModifier(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public FIELD(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.FIELD, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.RPAREN, 0)!;
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
        return this.getToken(Stage5Parser.COLON, 0);
    }
    public typeExpr(): TypeExprContext | null {
        return this.getRuleContext(0, TypeExprContext);
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public override get ruleIndex(): number {
        return Stage5Parser.RULE_fieldDef;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterFieldDef) {
             listener.enterFieldDef(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public CONSTRUCTOR(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.CONSTRUCTOR, 0)!;
    }
    public fnSignatureTyped(): FnSignatureTypedContext {
        return this.getRuleContext(0, FnSignatureTypedContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.RPAREN, 0)!;
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
        return Stage5Parser.RULE_constructorDef;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterConstructorDef) {
             listener.enterConstructorDef(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public METHOD(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.METHOD, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.IDENTIFIER, 0)!;
    }
    public fnSignatureTyped(): FnSignatureTypedContext {
        return this.getRuleContext(0, FnSignatureTypedContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.RPAREN, 0)!;
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
        return Stage5Parser.RULE_classMethodDef;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterClassMethodDef) {
             listener.enterClassMethodDef(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public ABSTRACT_METHOD(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.ABSTRACT_METHOD, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.IDENTIFIER, 0)!;
    }
    public fnSignatureTyped(): FnSignatureTypedContext {
        return this.getRuleContext(0, FnSignatureTypedContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.RPAREN, 0)!;
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
        return Stage5Parser.RULE_abstractMethodDef;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterAbstractMethodDef) {
             listener.enterAbstractMethodDef(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public GET(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.GET, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.IDENTIFIER, 0)!;
    }
    public fnSignatureTyped(): FnSignatureTypedContext {
        return this.getRuleContext(0, FnSignatureTypedContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.RPAREN, 0)!;
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
        return Stage5Parser.RULE_getterDef;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterGetterDef) {
             listener.enterGetterDef(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public SETPROP(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.SETPROP, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.IDENTIFIER, 0)!;
    }
    public fnSignatureTyped(): FnSignatureTypedContext {
        return this.getRuleContext(0, FnSignatureTypedContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.RPAREN, 0)!;
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
        return Stage5Parser.RULE_setterDef;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterSetterDef) {
             listener.enterSetterDef(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.RPAREN, 0)!;
    }
    public OPTIONAL(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.OPTIONAL, 0);
    }
    public COLON(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.COLON, 0);
    }
    public typeExpr(): TypeExprContext | null {
        return this.getRuleContext(0, TypeExprContext);
    }
    public override get ruleIndex(): number {
        return Stage5Parser.RULE_typedParam;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterTypedParam) {
             listener.enterTypedParam(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
    		return this.getTokens(Stage5Parser.LPAREN);
    	} else {
    		return this.getToken(Stage5Parser.LPAREN, i);
    	}
    }
    public RPAREN(): antlr.TerminalNode[];
    public RPAREN(i: number): antlr.TerminalNode | null;
    public RPAREN(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage5Parser.RPAREN);
    	} else {
    		return this.getToken(Stage5Parser.RPAREN, i);
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
        return this.getToken(Stage5Parser.RETURNS, 0);
    }
    public typeExpr(): TypeExprContext | null {
        return this.getRuleContext(0, TypeExprContext);
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage5Parser.COMMA);
    	} else {
    		return this.getToken(Stage5Parser.COMMA, i);
    	}
    }
    public override get ruleIndex(): number {
        return Stage5Parser.RULE_fnSignatureTyped;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterFnSignatureTyped) {
             listener.enterFnSignatureTyped(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
    public assign(): AssignContext | null {
        return this.getRuleContext(0, AssignContext);
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public override get ruleIndex(): number {
        return Stage5Parser.RULE_statement;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterStatement) {
             listener.enterStatement(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
    		return this.getTokens(Stage5Parser.LPAREN);
    	} else {
    		return this.getToken(Stage5Parser.LPAREN, i);
    	}
    }
    public LETSTAR(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.LETSTAR, 0)!;
    }
    public RPAREN(): antlr.TerminalNode[];
    public RPAREN(i: number): antlr.TerminalNode | null;
    public RPAREN(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage5Parser.RPAREN);
    	} else {
    		return this.getToken(Stage5Parser.RPAREN, i);
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
        return Stage5Parser.RULE_letStar;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterLetStar) {
             listener.enterLetStar(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public LET(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.LET, 0)!;
    }
    public singleBinding(): SingleBindingContext {
        return this.getRuleContext(0, SingleBindingContext)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage5Parser.RULE_letStmt;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterLetStmt) {
             listener.enterLetStmt(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
    		return this.getTokens(Stage5Parser.LPAREN);
    	} else {
    		return this.getToken(Stage5Parser.LPAREN, i);
    	}
    }
    public CONSTSTAR(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.CONSTSTAR, 0)!;
    }
    public RPAREN(): antlr.TerminalNode[];
    public RPAREN(i: number): antlr.TerminalNode | null;
    public RPAREN(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage5Parser.RPAREN);
    	} else {
    		return this.getToken(Stage5Parser.RPAREN, i);
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
        return Stage5Parser.RULE_constStar;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterConstStar) {
             listener.enterConstStar(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public CONST(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.CONST, 0)!;
    }
    public singleBinding(): SingleBindingContext {
        return this.getRuleContext(0, SingleBindingContext)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage5Parser.RULE_constStmt;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterConstStmt) {
             listener.enterConstStmt(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public IF(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.IF, 0)!;
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
        return this.getToken(Stage5Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage5Parser.RULE_ifForm;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterIfForm) {
             listener.enterIfForm(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public WHILE(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.WHILE, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.RPAREN, 0)!;
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
        return Stage5Parser.RULE_whileForm;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterWhileForm) {
             listener.enterWhileForm(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public BEGIN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.BEGIN, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.RPAREN, 0)!;
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
        return Stage5Parser.RULE_block;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterBlock) {
             listener.enterBlock(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public RETURN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.RETURN, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.RPAREN, 0)!;
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public override get ruleIndex(): number {
        return Stage5Parser.RULE_returnForm;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterReturnForm) {
             listener.enterReturnForm(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public THROW(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.THROW, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage5Parser.RULE_throwForm;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterThrowForm) {
             listener.enterThrowForm(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public IMPORT(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.IMPORT, 0)!;
    }
    public STRING(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.STRING, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.RPAREN, 0)!;
    }
    public objectExpr(): ObjectExprContext | null {
        return this.getRuleContext(0, ObjectExprContext);
    }
    public override get ruleIndex(): number {
        return Stage5Parser.RULE_importForm;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterImportForm) {
             listener.enterImportForm(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public IMPORT_TYPE(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.IMPORT_TYPE, 0)!;
    }
    public importTypeSpec(): ImportTypeSpecContext {
        return this.getRuleContext(0, ImportTypeSpecContext)!;
    }
    public STRING(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.STRING, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage5Parser.RULE_importTypeForm;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterImportTypeForm) {
             listener.enterImportTypeForm(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.RPAREN, 0)!;
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
        return Stage5Parser.RULE_importTypeSpec;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterImportTypeSpec) {
             listener.enterImportTypeSpec(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
    		return this.getTokens(Stage5Parser.IDENTIFIER);
    	} else {
    		return this.getToken(Stage5Parser.IDENTIFIER, i);
    	}
    }
    public LPAREN(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.LPAREN, 0);
    }
    public RPAREN(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.RPAREN, 0);
    }
    public override get ruleIndex(): number {
        return Stage5Parser.RULE_importTypeName;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterImportTypeName) {
             listener.enterImportTypeName(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return Stage5Parser.RULE_exportForm;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterExportForm) {
             listener.enterExportForm(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public EXPORT(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.EXPORT, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.IDENTIFIER, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage5Parser.RULE_exportBinding;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterExportBinding) {
             listener.enterExportBinding(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public EXPORT_DEFAULT(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.EXPORT_DEFAULT, 0)!;
    }
    public classDef(): ClassDefContext | null {
        return this.getRuleContext(0, ClassDefContext);
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.RPAREN, 0)!;
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
        return Stage5Parser.RULE_exportDefault;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterExportDefault) {
             listener.enterExportDefault(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public EXPORT_NAMED(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.EXPORT_NAMED, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.RPAREN, 0)!;
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
        return Stage5Parser.RULE_exportNamed;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterExportNamed) {
             listener.enterExportNamed(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode[];
    public IDENTIFIER(i: number): antlr.TerminalNode | null;
    public IDENTIFIER(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage5Parser.IDENTIFIER);
    	} else {
    		return this.getToken(Stage5Parser.IDENTIFIER, i);
    	}
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage5Parser.RULE_exportNamePair;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterExportNamePair) {
             listener.enterExportNamePair(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public EXPORT_FROM(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.EXPORT_FROM, 0)!;
    }
    public STRING(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.STRING, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.RPAREN, 0)!;
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
        return Stage5Parser.RULE_exportFrom;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterExportFrom) {
             listener.enterExportFrom(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public EXPORT_ALL_FROM(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.EXPORT_ALL_FROM, 0)!;
    }
    public STRING(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.STRING, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage5Parser.RULE_exportAllFrom;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterExportAllFrom) {
             listener.enterExportAllFrom(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public EXPORT_NS_FROM(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.EXPORT_NS_FROM, 0)!;
    }
    public STRING(): antlr.TerminalNode[];
    public STRING(i: number): antlr.TerminalNode | null;
    public STRING(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage5Parser.STRING);
    	} else {
    		return this.getToken(Stage5Parser.STRING, i);
    	}
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage5Parser.RULE_exportNsFromForm;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterExportNsFromForm) {
             listener.enterExportNsFromForm(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public EXPORT_TYPE(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.EXPORT_TYPE, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.RPAREN, 0)!;
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
        return Stage5Parser.RULE_exportTypeForm;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterExportTypeForm) {
             listener.enterExportTypeForm(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public EXPORT_TYPE_FROM(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.EXPORT_TYPE_FROM, 0)!;
    }
    public STRING(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.STRING, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.RPAREN, 0)!;
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
        return Stage5Parser.RULE_exportTypeFromForm;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterExportTypeFromForm) {
             listener.enterExportTypeFromForm(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public EXPORT_TYPE_ALL_FROM(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.EXPORT_TYPE_ALL_FROM, 0)!;
    }
    public STRING(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.STRING, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage5Parser.RULE_exportTypeAllFromForm;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterExportTypeAllFromForm) {
             listener.enterExportTypeAllFromForm(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public EXPORT(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.EXPORT, 0)!;
    }
    public decl(): DeclContext {
        return this.getRuleContext(0, DeclContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage5Parser.RULE_exportDeclForm;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterExportDeclForm) {
             listener.enterExportDeclForm(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.IDENTIFIER, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.RPAREN, 0)!;
    }
    public COLON(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.COLON, 0);
    }
    public typeExpr(): TypeExprContext | null {
        return this.getRuleContext(0, TypeExprContext);
    }
    public override get ruleIndex(): number {
        return Stage5Parser.RULE_starBinding;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterStarBinding) {
             listener.enterStarBinding(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.RPAREN, 0)!;
    }
    public COLON(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.COLON, 0);
    }
    public typeExpr(): TypeExprContext | null {
        return this.getRuleContext(0, TypeExprContext);
    }
    public override get ruleIndex(): number {
        return Stage5Parser.RULE_singleBinding;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterSingleBinding) {
             listener.enterSingleBinding(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.IDENTIFIER, 0);
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
        return Stage5Parser.RULE_typeExpr;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterTypeExpr) {
             listener.enterTypeExpr(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public UNION(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.UNION, 0)!;
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
        return this.getToken(Stage5Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage5Parser.RULE_typeUnion;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterTypeUnion) {
             listener.enterTypeUnion(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public INTERSECT(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.INTERSECT, 0)!;
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
        return this.getToken(Stage5Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage5Parser.RULE_typeIntersection;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterTypeIntersection) {
             listener.enterTypeIntersection(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public TYPE_ARRAY(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.TYPE_ARRAY, 0)!;
    }
    public typeExpr(): TypeExprContext {
        return this.getRuleContext(0, TypeExprContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage5Parser.RULE_typeArray;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterTypeArray) {
             listener.enterTypeArray(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public TUPLE(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.TUPLE, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.RPAREN, 0)!;
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
        return Stage5Parser.RULE_typeTuple;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterTypeTuple) {
             listener.enterTypeTuple(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0);
    }
    public REST(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.REST, 0);
    }
    public typeExpr(): TypeExprContext {
        return this.getRuleContext(0, TypeExprContext)!;
    }
    public RPAREN(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.RPAREN, 0);
    }
    public IDENTIFIER(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.IDENTIFIER, 0);
    }
    public override get ruleIndex(): number {
        return Stage5Parser.RULE_typeTupleElement;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterTypeTupleElement) {
             listener.enterTypeTupleElement(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
    		return this.getTokens(Stage5Parser.LPAREN);
    	} else {
    		return this.getToken(Stage5Parser.LPAREN, i);
    	}
    }
    public TYPEFN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.TYPEFN, 0)!;
    }
    public RPAREN(): antlr.TerminalNode[];
    public RPAREN(i: number): antlr.TerminalNode | null;
    public RPAREN(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage5Parser.RPAREN);
    	} else {
    		return this.getToken(Stage5Parser.RPAREN, i);
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
        return Stage5Parser.RULE_typeFunction;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterTypeFunction) {
             listener.enterTypeFunction(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.IDENTIFIER, 0)!;
    }
    public typeExpr(): TypeExprContext {
        return this.getRuleContext(0, TypeExprContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.RPAREN, 0)!;
    }
    public OPTIONAL(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.OPTIONAL, 0);
    }
    public override get ruleIndex(): number {
        return Stage5Parser.RULE_typeFnParam;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterTypeFnParam) {
             listener.enterTypeFnParam(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.RPAREN, 0)!;
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
        return Stage5Parser.RULE_typeObject;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterTypeObject) {
             listener.enterTypeObject(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.IDENTIFIER, 0)!;
    }
    public typeExpr(): TypeExprContext {
        return this.getRuleContext(0, TypeExprContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.RPAREN, 0)!;
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
        return this.getToken(Stage5Parser.OPTIONAL, 0);
    }
    public override get ruleIndex(): number {
        return Stage5Parser.RULE_typeProp;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterTypeProp) {
             listener.enterTypeProp(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.READONLY, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage5Parser.RULE_propModifier;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterPropModifier) {
             listener.enterPropModifier(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public LIT(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.LIT, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.RPAREN, 0)!;
    }
    public STRING(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.STRING, 0);
    }
    public NUMBER(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.NUMBER, 0);
    }
    public BOOLEAN(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.BOOLEAN, 0);
    }
    public override get ruleIndex(): number {
        return Stage5Parser.RULE_typeLiteral;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterTypeLiteral) {
             listener.enterTypeLiteral(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public KEYOF(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.KEYOF, 0)!;
    }
    public typeExpr(): TypeExprContext {
        return this.getRuleContext(0, TypeExprContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage5Parser.RULE_typeKeyof;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterTypeKeyof) {
             listener.enterTypeKeyof(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public TYPEOF(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.TYPEOF, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage5Parser.RULE_typeTypeof;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterTypeTypeof) {
             listener.enterTypeTypeof(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public INDEX(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.INDEX, 0)!;
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
        return this.getToken(Stage5Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage5Parser.RULE_typeIndexAccess;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterTypeIndexAccess) {
             listener.enterTypeIndexAccess(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public COND(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.COND, 0)!;
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
        return this.getToken(Stage5Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage5Parser.RULE_typeConditional;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterTypeConditional) {
             listener.enterTypeConditional(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public INFER(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.INFER, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage5Parser.RULE_typeInfer;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterTypeInfer) {
             listener.enterTypeInfer(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public MAPPED(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.MAPPED, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.IDENTIFIER, 0)!;
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
        return this.getToken(Stage5Parser.RPAREN, 0)!;
    }
    public mappedModifiers(): MappedModifiersContext | null {
        return this.getRuleContext(0, MappedModifiersContext);
    }
    public override get ruleIndex(): number {
        return Stage5Parser.RULE_typeMapped;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterTypeMapped) {
             listener.enterTypeMapped(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public MODIFIERS(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.MODIFIERS, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.RPAREN, 0)!;
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
        return Stage5Parser.RULE_mappedModifiers;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterMappedModifiers) {
             listener.enterMappedModifiers(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.READONLY, 0);
    }
    public OPTIONAL(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.OPTIONAL, 0);
    }
    public override get ruleIndex(): number {
        return Stage5Parser.RULE_mappedModifier;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterMappedModifier) {
             listener.enterMappedModifier(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public TYPE_TEMPLATE(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.TYPE_TEMPLATE, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.RPAREN, 0)!;
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
        return Stage5Parser.RULE_typeTemplateLiteral;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterTypeTemplateLiteral) {
             listener.enterTypeTemplateLiteral(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.STRING, 0);
    }
    public typeExpr(): TypeExprContext | null {
        return this.getRuleContext(0, TypeExprContext);
    }
    public override get ruleIndex(): number {
        return Stage5Parser.RULE_templatePart;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterTemplatePart) {
             listener.enterTemplatePart(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
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
        return this.getToken(Stage5Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage5Parser.RULE_typeApplication;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterTypeApplication) {
             listener.enterTypeApplication(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public TYPE_PARAMS(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.TYPE_PARAMS, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.RPAREN, 0)!;
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
        return Stage5Parser.RULE_typeParams;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterTypeParams) {
             listener.enterTypeParams(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.IDENTIFIER, 0)!;
    }
    public LPAREN(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.LPAREN, 0);
    }
    public RPAREN(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.RPAREN, 0);
    }
    public typeParamConstraint(): TypeParamConstraintContext | null {
        return this.getRuleContext(0, TypeParamConstraintContext);
    }
    public typeParamDefault(): TypeParamDefaultContext | null {
        return this.getRuleContext(0, TypeParamDefaultContext);
    }
    public override get ruleIndex(): number {
        return Stage5Parser.RULE_typeParamDecl;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterTypeParamDecl) {
             listener.enterTypeParamDecl(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public EXTENDS(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.EXTENDS, 0)!;
    }
    public typeExpr(): TypeExprContext {
        return this.getRuleContext(0, TypeExprContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage5Parser.RULE_typeParamConstraint;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterTypeParamConstraint) {
             listener.enterTypeParamConstraint(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public DEFAULT(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.DEFAULT, 0)!;
    }
    public typeExpr(): TypeExprContext {
        return this.getRuleContext(0, TypeExprContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage5Parser.RULE_typeParamDefault;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterTypeParamDefault) {
             listener.enterTypeParamDefault(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public SET(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.SET, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.IDENTIFIER, 0);
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.RPAREN, 0)!;
    }
    public propAccess(): PropAccessContext | null {
        return this.getRuleContext(0, PropAccessContext);
    }
    public override get ruleIndex(): number {
        return Stage5Parser.RULE_assign;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterAssign) {
             listener.enterAssign(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public SWITCH(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.SWITCH, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.RPAREN, 0)!;
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
        return Stage5Parser.RULE_switchForm;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterSwitchForm) {
             listener.enterSwitchForm(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public CASE(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.CASE, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.RPAREN, 0)!;
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
        return Stage5Parser.RULE_caseClause;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterCaseClause) {
             listener.enterCaseClause(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public DEFAULT(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.DEFAULT, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.RPAREN, 0)!;
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
        return Stage5Parser.RULE_defaultClause;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterDefaultClause) {
             listener.enterDefaultClause(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public FOR(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.FOR, 0)!;
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
        return this.getToken(Stage5Parser.RPAREN, 0)!;
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
        return Stage5Parser.RULE_forForm;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterForForm) {
             listener.enterForForm(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public FORIN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.FORIN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.IDENTIFIER, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.RPAREN, 0)!;
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
        return Stage5Parser.RULE_forInForm;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterForInForm) {
             listener.enterForInForm(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public FOROF(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.FOROF, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.IDENTIFIER, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.RPAREN, 0)!;
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
        return Stage5Parser.RULE_forOfForm;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterForOfForm) {
             listener.enterForOfForm(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
        if(listener.exitForOfForm) {
             listener.exitForOfForm(this);
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
        return this.getToken(Stage5Parser.KEYWORD, 0);
    }
    public IDENTIFIER(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.IDENTIFIER, 0);
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
        return Stage5Parser.RULE_expression;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterExpression) {
             listener.enterExpression(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.THIS, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage5Parser.RULE_thisExpr;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterThisExpr) {
             listener.enterThisExpr(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.SUPER, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage5Parser.RULE_superExpr;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterSuperExpr) {
             listener.enterSuperExpr(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public SUPER(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.SUPER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.RPAREN, 0)!;
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
        return Stage5Parser.RULE_superConstructorCall;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterSuperConstructorCall) {
             listener.enterSuperConstructorCall(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public SUPER_METHOD(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.SUPER_METHOD, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.RPAREN, 0)!;
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
        return Stage5Parser.RULE_superMethodCall;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterSuperMethodCall) {
             listener.enterSuperMethodCall(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public TYPEOF(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.TYPEOF, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage5Parser.RULE_typeofExpr;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterTypeofExpr) {
             listener.enterTypeofExpr(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public TYPE_AS(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.TYPE_AS, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public typeExpr(): TypeExprContext {
        return this.getRuleContext(0, TypeExprContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage5Parser.RULE_typeAssert;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterTypeAssert) {
             listener.enterTypeAssert(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public LAMBDA(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.LAMBDA, 0)!;
    }
    public fnSignature(): FnSignatureContext {
        return this.getRuleContext(0, FnSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.RPAREN, 0)!;
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
        return Stage5Parser.RULE_lambda;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterLambda) {
             listener.enterLambda(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public FN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.FN, 0)!;
    }
    public fnSignature(): FnSignatureContext {
        return this.getRuleContext(0, FnSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.RPAREN, 0)!;
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
        return Stage5Parser.RULE_fn;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterFn) {
             listener.enterFn(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public ASYNC_LAMBDA(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.ASYNC_LAMBDA, 0)!;
    }
    public fnSignature(): FnSignatureContext {
        return this.getRuleContext(0, FnSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.RPAREN, 0)!;
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
        return Stage5Parser.RULE_asyncLambda;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterAsyncLambda) {
             listener.enterAsyncLambda(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public ASYNC_FN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.ASYNC_FN, 0)!;
    }
    public fnSignature(): FnSignatureContext {
        return this.getRuleContext(0, FnSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.RPAREN, 0)!;
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
        return Stage5Parser.RULE_asyncFn;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterAsyncFn) {
             listener.enterAsyncFn(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public GENERATOR_FN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.GENERATOR_FN, 0)!;
    }
    public fnSignature(): FnSignatureContext {
        return this.getRuleContext(0, FnSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.RPAREN, 0)!;
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
        return Stage5Parser.RULE_generatorFn;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterGeneratorFn) {
             listener.enterGeneratorFn(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public ASYNC_GENERATOR_FN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.ASYNC_GENERATOR_FN, 0)!;
    }
    public fnSignature(): FnSignatureContext {
        return this.getRuleContext(0, FnSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.RPAREN, 0)!;
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
        return Stage5Parser.RULE_asyncGeneratorFn;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterAsyncGeneratorFn) {
             listener.enterAsyncGeneratorFn(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public AWAIT(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.AWAIT, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage5Parser.RULE_awaitExpr;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterAwaitExpr) {
             listener.enterAwaitExpr(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public YIELD(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.YIELD, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.RPAREN, 0)!;
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public override get ruleIndex(): number {
        return Stage5Parser.RULE_yieldExpr;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterYieldExpr) {
             listener.enterYieldExpr(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public YIELD_STAR(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.YIELD_STAR, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage5Parser.RULE_yieldStarExpr;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterYieldStarExpr) {
             listener.enterYieldStarExpr(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public BIND(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.BIND, 0)!;
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
        return this.getToken(Stage5Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage5Parser.RULE_bindExpr;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterBindExpr) {
             listener.enterBindExpr(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public METHOD_CALL(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.METHOD_CALL, 0)!;
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
        return this.getToken(Stage5Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage5Parser.RULE_methodCallExpr;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterMethodCallExpr) {
             listener.enterMethodCallExpr(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public TERNARY(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.TERNARY, 0)!;
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
        return this.getToken(Stage5Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage5Parser.RULE_ternary;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterTernary) {
             listener.enterTernary(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public COND(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.COND, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.RPAREN, 0)!;
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
        return Stage5Parser.RULE_condExpr;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterCondExpr) {
             listener.enterCondExpr(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public NEW(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.NEW, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.RPAREN, 0)!;
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
        return Stage5Parser.RULE_newForm;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterNewForm) {
             listener.enterNewForm(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public OBJECT(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.OBJECT, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.RPAREN, 0)!;
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
        return Stage5Parser.RULE_objectExpr;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterObjectExpr) {
             listener.enterObjectExpr(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public propKey(): PropKeyContext | null {
        return this.getRuleContext(0, PropKeyContext);
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.RPAREN, 0)!;
    }
    public methodDef(): MethodDefContext | null {
        return this.getRuleContext(0, MethodDefContext);
    }
    public IDENTIFIER(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.IDENTIFIER, 0);
    }
    public override get ruleIndex(): number {
        return Stage5Parser.RULE_objectField;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterObjectField) {
             listener.enterObjectField(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public METHOD(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.METHOD, 0)!;
    }
    public fnSignature(): FnSignatureContext {
        return this.getRuleContext(0, FnSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.RPAREN, 0)!;
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
        return Stage5Parser.RULE_methodDef;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterMethodDef) {
             listener.enterMethodDef(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public ARRAY(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.ARRAY, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.RPAREN, 0)!;
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
        return Stage5Parser.RULE_arrayExpr;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterArrayExpr) {
             listener.enterArrayExpr(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public TEMPLATE(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.TEMPLATE, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.RPAREN, 0)!;
    }
    public STRING(): antlr.TerminalNode[];
    public STRING(i: number): antlr.TerminalNode | null;
    public STRING(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage5Parser.STRING);
    	} else {
    		return this.getToken(Stage5Parser.STRING, i);
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
        return Stage5Parser.RULE_templateExpr;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterTemplateExpr) {
             listener.enterTemplateExpr(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.IDENTIFIER, 0);
    }
    public KEYWORD(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.KEYWORD, 0);
    }
    public STRING(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.STRING, 0);
    }
    public PROGRAM(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.PROGRAM, 0);
    }
    public LETSTAR(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.LETSTAR, 0);
    }
    public LET(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.LET, 0);
    }
    public CONSTSTAR(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.CONSTSTAR, 0);
    }
    public CONST(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.CONST, 0);
    }
    public LAMBDA(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.LAMBDA, 0);
    }
    public FN(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.FN, 0);
    }
    public METHOD(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.METHOD, 0);
    }
    public BIND(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.BIND, 0);
    }
    public METHOD_CALL(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.METHOD_CALL, 0);
    }
    public DEFMACRO(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.DEFMACRO, 0);
    }
    public MACRO_TIME_ATTR(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.MACRO_TIME_ATTR, 0);
    }
    public IF(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.IF, 0);
    }
    public WHILE(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.WHILE, 0);
    }
    public BEGIN(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.BEGIN, 0);
    }
    public RETURN(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.RETURN, 0);
    }
    public THROW(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.THROW, 0);
    }
    public SET(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.SET, 0);
    }
    public TERNARY(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.TERNARY, 0);
    }
    public COND(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.COND, 0);
    }
    public OBJECT(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.OBJECT, 0);
    }
    public ARRAY(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.ARRAY, 0);
    }
    public INDEX(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.INDEX, 0);
    }
    public QUASI(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.QUASI, 0);
    }
    public QUOTE(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.QUOTE, 0);
    }
    public UNQUOTE_SPLICING(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.UNQUOTE_SPLICING, 0);
    }
    public UNQUOTE(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.UNQUOTE, 0);
    }
    public TYPE_ARRAY(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.TYPE_ARRAY, 0);
    }
    public NEW(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.NEW, 0);
    }
    public IMPORT(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.IMPORT, 0);
    }
    public SWITCH(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.SWITCH, 0);
    }
    public CASE(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.CASE, 0);
    }
    public DEFAULT(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.DEFAULT, 0);
    }
    public FORIN(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.FORIN, 0);
    }
    public FOROF(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.FOROF, 0);
    }
    public FOR(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.FOR, 0);
    }
    public UNION(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.UNION, 0);
    }
    public INTERSECT(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.INTERSECT, 0);
    }
    public TUPLE(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.TUPLE, 0);
    }
    public TYPEFN(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.TYPEFN, 0);
    }
    public LIT(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.LIT, 0);
    }
    public KEYOF(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.KEYOF, 0);
    }
    public TYPEOF(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.TYPEOF, 0);
    }
    public INFER(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.INFER, 0);
    }
    public MAPPED(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.MAPPED, 0);
    }
    public TYPE_TEMPLATE(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.TYPE_TEMPLATE, 0);
    }
    public TEMPLATE(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.TEMPLATE, 0);
    }
    public REST(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.REST, 0);
    }
    public READONLY(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.READONLY, 0);
    }
    public TYPE_AS(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.TYPE_AS, 0);
    }
    public TYPE_PARAMS(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.TYPE_PARAMS, 0);
    }
    public TYPE_ARGS(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.TYPE_ARGS, 0);
    }
    public EXTENDS(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.EXTENDS, 0);
    }
    public RETURNS(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.RETURNS, 0);
    }
    public TYPE(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.TYPE, 0);
    }
    public INTERFACE(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.INTERFACE, 0);
    }
    public MODIFIERS(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.MODIFIERS, 0);
    }
    public BOOLEAN(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.BOOLEAN, 0);
    }
    public NULL(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.NULL, 0);
    }
    public UNDEFINED(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.UNDEFINED, 0);
    }
    public EXPORT(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.EXPORT, 0);
    }
    public EXPORT_DEFAULT(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.EXPORT_DEFAULT, 0);
    }
    public EXPORT_NAMED(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.EXPORT_NAMED, 0);
    }
    public EXPORT_NS_FROM(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.EXPORT_NS_FROM, 0);
    }
    public EXPORT_FROM(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.EXPORT_FROM, 0);
    }
    public EXPORT_ALL_FROM(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.EXPORT_ALL_FROM, 0);
    }
    public IMPORT_TYPE(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.IMPORT_TYPE, 0);
    }
    public EXPORT_TYPE(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.EXPORT_TYPE, 0);
    }
    public EXPORT_TYPE_FROM(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.EXPORT_TYPE_FROM, 0);
    }
    public EXPORT_TYPE_ALL_FROM(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.EXPORT_TYPE_ALL_FROM, 0);
    }
    public CLASS(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.CLASS, 0);
    }
    public CLASS_BODY(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.CLASS_BODY, 0);
    }
    public FIELD(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.FIELD, 0);
    }
    public CONSTRUCTOR(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.CONSTRUCTOR, 0);
    }
    public THIS(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.THIS, 0);
    }
    public SUPER(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.SUPER, 0);
    }
    public SUPER_METHOD(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.SUPER_METHOD, 0);
    }
    public GET(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.GET, 0);
    }
    public SETPROP(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.SETPROP, 0);
    }
    public ABSTRACT_METHOD(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.ABSTRACT_METHOD, 0);
    }
    public IMPLEMENTS(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.IMPLEMENTS, 0);
    }
    public ASYNC_GENERATOR_FN(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.ASYNC_GENERATOR_FN, 0);
    }
    public ASYNC_LAMBDA(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.ASYNC_LAMBDA, 0);
    }
    public ASYNC_FN(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.ASYNC_FN, 0);
    }
    public GENERATOR_FN(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.GENERATOR_FN, 0);
    }
    public YIELD_STAR(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.YIELD_STAR, 0);
    }
    public YIELD(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.YIELD, 0);
    }
    public AWAIT(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.AWAIT, 0);
    }
    public CARET(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.CARET, 0);
    }
    public override get ruleIndex(): number {
        return Stage5Parser.RULE_propKey;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterPropKey) {
             listener.enterPropKey(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public DOT(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.DOT, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public propKey(): PropKeyContext {
        return this.getRuleContext(0, PropKeyContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage5Parser.RULE_propAccess;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterPropAccess) {
             listener.enterPropAccess(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public INDEX(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.INDEX, 0)!;
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
        return this.getToken(Stage5Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage5Parser.RULE_indexAccess;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterIndexAccess) {
             listener.enterIndexAccess(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.RPAREN, 0)!;
    }
    public QUASI(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.QUASI, 0);
    }
    public QUOTE(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.QUOTE, 0);
    }
    public override get ruleIndex(): number {
        return Stage5Parser.RULE_quasiquote;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterQuasiquote) {
             listener.enterQuasiquote(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public UNQUOTE(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.UNQUOTE, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage5Parser.RULE_unquote;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterUnquote) {
             listener.enterUnquote(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public UNQUOTE_SPLICING(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.UNQUOTE_SPLICING, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage5Parser.RULE_unquoteSplicing;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterUnquoteSplicing) {
             listener.enterUnquoteSplicing(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public OPTCHAIN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.OPTCHAIN, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public propKey(): PropKeyContext {
        return this.getRuleContext(0, PropKeyContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage5Parser.RULE_optChain;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterOptChain) {
             listener.enterOptChain(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public OPTCHAIN_INDEX(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.OPTCHAIN_INDEX, 0)!;
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
        return this.getToken(Stage5Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage5Parser.RULE_optChainIndex;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterOptChainIndex) {
             listener.enterOptChainIndex(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public NULLCOAL(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.NULLCOAL, 0)!;
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
        return this.getToken(Stage5Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage5Parser.RULE_nullCoalesce;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterNullCoalesce) {
             listener.enterNullCoalesce(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
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
        return this.getToken(Stage5Parser.RPAREN, 0)!;
    }
    public typeArgs(): TypeArgsContext | null {
        return this.getRuleContext(0, TypeArgsContext);
    }
    public override get ruleIndex(): number {
        return Stage5Parser.RULE_call;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterCall) {
             listener.enterCall(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public TYPE_ARGS(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.TYPE_ARGS, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.RPAREN, 0)!;
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
        return Stage5Parser.RULE_typeArgs;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterTypeArgs) {
             listener.enterTypeArgs(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.RPAREN, 0)!;
    }
    public param(): ParamContext[];
    public param(i: number): ParamContext | null;
    public param(i?: number): ParamContext[] | ParamContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ParamContext);
        }

        return this.getRuleContext(i, ParamContext);
    }
    public restParam(): RestParamContext | null {
        return this.getRuleContext(0, RestParamContext);
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage5Parser.COMMA);
    	} else {
    		return this.getToken(Stage5Parser.COMMA, i);
    	}
    }
    public override get ruleIndex(): number {
        return Stage5Parser.RULE_fnSignature;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterFnSignature) {
             listener.enterFnSignature(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage5Parser.RULE_param;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterParam) {
             listener.enterParam(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.LPAREN, 0)!;
    }
    public REST(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.REST, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage5Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage5Parser.RULE_restParam;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterRestParam) {
             listener.enterRestParam(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
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
        return this.getToken(Stage5Parser.NUMBER, 0);
    }
    public STRING(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.STRING, 0);
    }
    public BOOLEAN(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.BOOLEAN, 0);
    }
    public NULL(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.NULL, 0);
    }
    public UNDEFINED(): antlr.TerminalNode | null {
        return this.getToken(Stage5Parser.UNDEFINED, 0);
    }
    public override get ruleIndex(): number {
        return Stage5Parser.RULE_literal;
    }
    public override enterRule(listener: Stage5Listener): void {
        if(listener.enterLiteral) {
             listener.enterLiteral(this);
        }
    }
    public override exitRule(listener: Stage5Listener): void {
        if(listener.exitLiteral) {
             listener.exitLiteral(this);
        }
    }
}
