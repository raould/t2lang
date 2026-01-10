
import * as antlr from "antlr4ng";
import { Token } from "antlr4ng";

import { Stage4Listener } from "./Stage4Listener.js";
// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;


export class Stage4Parser extends antlr.Parser {
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
    public static readonly DEF = 15;
    public static readonly DEFMACRO = 16;
    public static readonly MACRO_TIME_ATTR = 17;
    public static readonly IF = 18;
    public static readonly WHILE = 19;
    public static readonly BEGIN = 20;
    public static readonly RETURN = 21;
    public static readonly THROW = 22;
    public static readonly SET = 23;
    public static readonly TERNARY = 24;
    public static readonly COND = 25;
    public static readonly OBJECT = 26;
    public static readonly ARRAY = 27;
    public static readonly OPTCHAIN = 28;
    public static readonly DOT = 29;
    public static readonly INDEX = 30;
    public static readonly NULLCOAL = 31;
    public static readonly QUASI = 32;
    public static readonly QUOTE = 33;
    public static readonly UNQUOTE_SPLICING = 34;
    public static readonly UNQUOTE = 35;
    public static readonly NEW = 36;
    public static readonly IMPORT = 37;
    public static readonly SWITCH = 38;
    public static readonly CASE = 39;
    public static readonly DEFAULT = 40;
    public static readonly FORIN = 41;
    public static readonly FOROF = 42;
    public static readonly FOR = 43;
    public static readonly CLASS_BODY = 44;
    public static readonly SUPER_METHOD = 45;
    public static readonly ABSTRACT_METHOD = 46;
    public static readonly CLASS = 47;
    public static readonly FIELD = 48;
    public static readonly CONSTRUCTOR = 49;
    public static readonly THIS = 50;
    public static readonly SUPER = 51;
    public static readonly GET = 52;
    public static readonly SETPROP = 53;
    public static readonly IMPLEMENTS = 54;
    public static readonly UNION = 55;
    public static readonly INTERSECT = 56;
    public static readonly TUPLE = 57;
    public static readonly TYPEFN = 58;
    public static readonly LIT = 59;
    public static readonly KEYOF = 60;
    public static readonly TYPEOF = 61;
    public static readonly TYPE_AS = 62;
    public static readonly INFER = 63;
    public static readonly MAPPED = 64;
    public static readonly TEMPLATE = 65;
    public static readonly REST = 66;
    public static readonly READONLY = 67;
    public static readonly TYPE_PARAMS = 68;
    public static readonly TYPE_ARGS = 69;
    public static readonly EXTENDS = 70;
    public static readonly RETURNS = 71;
    public static readonly TYPE = 72;
    public static readonly INTERFACE = 73;
    public static readonly MODIFIERS = 74;
    public static readonly OPTIONAL = 75;
    public static readonly BOOLEAN = 76;
    public static readonly NULL = 77;
    public static readonly UNDEFINED = 78;
    public static readonly COLON = 79;
    public static readonly LBRACK = 80;
    public static readonly RBRACK = 81;
    public static readonly EXPORT = 82;
    public static readonly EXPORT_DEFAULT = 83;
    public static readonly EXPORT_NAMED = 84;
    public static readonly EXPORT_NS_FROM = 85;
    public static readonly EXPORT_FROM = 86;
    public static readonly EXPORT_ALL_FROM = 87;
    public static readonly IMPORT_TYPE = 88;
    public static readonly EXPORT_TYPE_ALL_FROM = 89;
    public static readonly EXPORT_TYPE_FROM = 90;
    public static readonly EXPORT_TYPE = 91;
    public static readonly KEYWORD = 92;
    public static readonly NUMBER = 93;
    public static readonly STRING = 94;
    public static readonly MULTILINE_STRING = 95;
    public static readonly BACKTICK_STRING = 96;
    public static readonly IDENTIFIER = 97;
    public static readonly WS = 98;
    public static readonly RULE_program = 0;
    public static readonly RULE_topLevel = 1;
    public static readonly RULE_decl = 2;
    public static readonly RULE_defmacro = 3;
    public static readonly RULE_macroTimeFnDef = 4;
    public static readonly RULE_def = 5;
    public static readonly RULE_topLevelLet = 6;
    public static readonly RULE_topLevelConst = 7;
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
    public static readonly RULE_bindExpr = 97;
    public static readonly RULE_methodCallExpr = 98;
    public static readonly RULE_ternary = 99;
    public static readonly RULE_condExpr = 100;
    public static readonly RULE_newForm = 101;
    public static readonly RULE_objectExpr = 102;
    public static readonly RULE_objectField = 103;
    public static readonly RULE_methodDef = 104;
    public static readonly RULE_arrayExpr = 105;
    public static readonly RULE_propKey = 106;
    public static readonly RULE_propAccess = 107;
    public static readonly RULE_indexAccess = 108;
    public static readonly RULE_quasiquote = 109;
    public static readonly RULE_unquote = 110;
    public static readonly RULE_unquoteSplicing = 111;
    public static readonly RULE_optChain = 112;
    public static readonly RULE_nullCoalesce = 113;
    public static readonly RULE_call = 114;
    public static readonly RULE_typeArgs = 115;
    public static readonly RULE_fnSignature = 116;
    public static readonly RULE_param = 117;
    public static readonly RULE_literal = 118;

    public static readonly literalNames = [
        null, null, "'('", "')'", "','", "'program'", "'let*'", "'let'", 
        "'const*'", "'const'", "'lambda'", "'fn'", "'method'", "'bind'", 
        "'method-call'", "'def'", "'defmacro'", "'#[macro-time]'", "'if'", 
        "'while'", "'begin'", "'return'", "'throw'", "'set!'", "'ternary'", 
        "'cond'", "'object'", "'array'", "'.?'", "'.'", "'index'", "'??'", 
        "'quasi'", "'quote'", "'unquote-splicing'", "'unquote'", "'new'", 
        "'import'", "'switch'", "'case'", "'default'", "'for-in'", "'for-of'", 
        "'for'", "'class-body'", "'super-method'", "'abstract-method'", 
        "'class'", "'field'", "'constructor'", "'this'", "'super'", "'get'", 
        "'set'", "'implements'", "'union'", "'intersect'", "'tuple'", "'tfn'", 
        "'tlit'", "'keyof'", "'typeof'", "'type-as'", "'infer'", "'mapped'", 
        "'template'", "'rest'", "'readonly'", "'type-params'", "'type-args'", 
        "'extends'", "'returns'", "'type'", "'interface'", "'modifiers'", 
        "'?'", null, "'null'", "'undefined'", "':'", "'['", "']'", "'export'", 
        "'export-default'", "'export-named'", "'export-ns-from'", "'export-from'", 
        "'export-all-from'", "'import-type'", "'export-type-all-from'", 
        "'export-type-from'", "'export-type'"
    ];

    public static readonly symbolicNames = [
        null, "COMMENT", "LPAREN", "RPAREN", "COMMA", "PROGRAM", "LETSTAR", 
        "LET", "CONSTSTAR", "CONST", "LAMBDA", "FN", "METHOD", "BIND", "METHOD_CALL", 
        "DEF", "DEFMACRO", "MACRO_TIME_ATTR", "IF", "WHILE", "BEGIN", "RETURN", 
        "THROW", "SET", "TERNARY", "COND", "OBJECT", "ARRAY", "OPTCHAIN", 
        "DOT", "INDEX", "NULLCOAL", "QUASI", "QUOTE", "UNQUOTE_SPLICING", 
        "UNQUOTE", "NEW", "IMPORT", "SWITCH", "CASE", "DEFAULT", "FORIN", 
        "FOROF", "FOR", "CLASS_BODY", "SUPER_METHOD", "ABSTRACT_METHOD", 
        "CLASS", "FIELD", "CONSTRUCTOR", "THIS", "SUPER", "GET", "SETPROP", 
        "IMPLEMENTS", "UNION", "INTERSECT", "TUPLE", "TYPEFN", "LIT", "KEYOF", 
        "TYPEOF", "TYPE_AS", "INFER", "MAPPED", "TEMPLATE", "REST", "READONLY", 
        "TYPE_PARAMS", "TYPE_ARGS", "EXTENDS", "RETURNS", "TYPE", "INTERFACE", 
        "MODIFIERS", "OPTIONAL", "BOOLEAN", "NULL", "UNDEFINED", "COLON", 
        "LBRACK", "RBRACK", "EXPORT", "EXPORT_DEFAULT", "EXPORT_NAMED", 
        "EXPORT_NS_FROM", "EXPORT_FROM", "EXPORT_ALL_FROM", "IMPORT_TYPE", 
        "EXPORT_TYPE_ALL_FROM", "EXPORT_TYPE_FROM", "EXPORT_TYPE", "KEYWORD", 
        "NUMBER", "STRING", "MULTILINE_STRING", "BACKTICK_STRING", "IDENTIFIER", 
        "WS"
    ];
    public static readonly ruleNames = [
        "program", "topLevel", "decl", "defmacro", "macroTimeFnDef", "def", 
        "topLevelLet", "topLevelConst", "typeAlias", "interfaceDef", "interfaceExtends", 
        "classDef", "anonClassDef", "classExtends", "classImplements", "classBody", 
        "classElement", "modifier", "fieldDef", "constructorDef", "classMethodDef", 
        "abstractMethodDef", "getterDef", "setterDef", "typedParam", "fnSignatureTyped", 
        "statement", "letStar", "letStmt", "constStar", "constStmt", "ifForm", 
        "whileForm", "block", "returnForm", "throwForm", "importForm", "importTypeForm", 
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
        "forForm", "forInForm", "forOfForm", "expression", "thisExpr", "superExpr", 
        "superConstructorCall", "superMethodCall", "typeofExpr", "typeAssert", 
        "lambda", "fn", "bindExpr", "methodCallExpr", "ternary", "condExpr", 
        "newForm", "objectExpr", "objectField", "methodDef", "arrayExpr", 
        "propKey", "propAccess", "indexAccess", "quasiquote", "unquote", 
        "unquoteSplicing", "optChain", "nullCoalesce", "call", "typeArgs", 
        "fnSignature", "param", "literal",
    ];

    public get grammarFileName(): string { return "Stage4.g4"; }
    public get literalNames(): (string | null)[] { return Stage4Parser.literalNames; }
    public get symbolicNames(): (string | null)[] { return Stage4Parser.symbolicNames; }
    public get ruleNames(): string[] { return Stage4Parser.ruleNames; }
    public get serializedATN(): number[] { return Stage4Parser._serializedATN; }

    protected createFailedPredicateException(predicate?: string, message?: string): antlr.FailedPredicateException {
        return new antlr.FailedPredicateException(this, predicate, message);
    }

    public constructor(input: antlr.TokenStream) {
        super(input);
        this.interpreter = new antlr.ParserATNSimulator(this, Stage4Parser._ATN, Stage4Parser.decisionsToDFA, new antlr.PredictionContextCache());
    }
    public program(): ProgramContext {
        let localContext = new ProgramContext(this.context, this.state);
        this.enterRule(localContext, 0, Stage4Parser.RULE_program);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 238;
            this.match(Stage4Parser.LPAREN);
            this.state = 239;
            this.match(Stage4Parser.PROGRAM);
            this.state = 243;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 50)) & ~0x1F) === 0 && ((1 << (_la - 50)) & 469762051) !== 0) || ((((_la - 92)) & ~0x1F) === 0 && ((1 << (_la - 92)) & 55) !== 0)) {
                {
                {
                this.state = 240;
                this.topLevel();
                }
                }
                this.state = 245;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 246;
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 2, Stage4Parser.RULE_topLevel);
        try {
            this.state = 258;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 1, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 248;
                this.defmacro();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 249;
                this.macroTimeFnDef();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 250;
                this.def();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 251;
                this.topLevelLet();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 252;
                this.topLevelConst();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 253;
                this.typeAlias();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 254;
                this.interfaceDef();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 255;
                this.classDef();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 256;
                this.exportDeclForm();
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 257;
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
        this.enterRule(localContext, 4, Stage4Parser.RULE_decl);
        try {
            this.state = 266;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 2, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 260;
                this.def();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 261;
                this.topLevelLet();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 262;
                this.topLevelConst();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 263;
                this.classDef();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 264;
                this.interfaceDef();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 265;
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
        this.enterRule(localContext, 6, Stage4Parser.RULE_defmacro);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 268;
            this.match(Stage4Parser.LPAREN);
            this.state = 269;
            this.match(Stage4Parser.DEFMACRO);
            this.state = 270;
            this.match(Stage4Parser.IDENTIFIER);
            this.state = 271;
            this.fnSignature();
            this.state = 275;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 50)) & ~0x1F) === 0 && ((1 << (_la - 50)) & 469762051) !== 0) || ((((_la - 92)) & ~0x1F) === 0 && ((1 << (_la - 92)) & 55) !== 0)) {
                {
                {
                this.state = 272;
                this.statement();
                }
                }
                this.state = 277;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 278;
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 8, Stage4Parser.RULE_macroTimeFnDef);
        try {
            this.state = 295;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 4, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 280;
                this.match(Stage4Parser.LPAREN);
                this.state = 281;
                this.match(Stage4Parser.MACRO_TIME_ATTR);
                this.state = 282;
                this.def();
                this.state = 283;
                this.match(Stage4Parser.RPAREN);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 285;
                this.match(Stage4Parser.LPAREN);
                this.state = 286;
                this.match(Stage4Parser.MACRO_TIME_ATTR);
                this.state = 287;
                this.topLevelLet();
                this.state = 288;
                this.match(Stage4Parser.RPAREN);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 290;
                this.match(Stage4Parser.LPAREN);
                this.state = 291;
                this.match(Stage4Parser.MACRO_TIME_ATTR);
                this.state = 292;
                this.topLevelConst();
                this.state = 293;
                this.match(Stage4Parser.RPAREN);
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
    public def(): DefContext {
        let localContext = new DefContext(this.context, this.state);
        this.enterRule(localContext, 10, Stage4Parser.RULE_def);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 297;
            this.match(Stage4Parser.LPAREN);
            this.state = 298;
            this.match(Stage4Parser.DEF);
            this.state = 299;
            this.match(Stage4Parser.IDENTIFIER);
            this.state = 300;
            this.expression();
            this.state = 301;
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 12, Stage4Parser.RULE_topLevelLet);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 303;
            this.match(Stage4Parser.LPAREN);
            this.state = 304;
            this.match(Stage4Parser.LET);
            this.state = 305;
            this.match(Stage4Parser.IDENTIFIER);
            this.state = 306;
            this.expression();
            this.state = 307;
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 14, Stage4Parser.RULE_topLevelConst);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 309;
            this.match(Stage4Parser.LPAREN);
            this.state = 310;
            this.match(Stage4Parser.CONST);
            this.state = 311;
            this.match(Stage4Parser.IDENTIFIER);
            this.state = 312;
            this.expression();
            this.state = 313;
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 16, Stage4Parser.RULE_typeAlias);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 315;
            this.match(Stage4Parser.LPAREN);
            this.state = 316;
            this.match(Stage4Parser.TYPE);
            this.state = 317;
            this.match(Stage4Parser.IDENTIFIER);
            this.state = 319;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 5, this.context) ) {
            case 1:
                {
                this.state = 318;
                this.typeParams();
                }
                break;
            }
            this.state = 321;
            this.typeExpr();
            this.state = 322;
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 18, Stage4Parser.RULE_interfaceDef);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 324;
            this.match(Stage4Parser.LPAREN);
            this.state = 325;
            this.match(Stage4Parser.INTERFACE);
            this.state = 326;
            this.match(Stage4Parser.IDENTIFIER);
            this.state = 328;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 6, this.context) ) {
            case 1:
                {
                this.state = 327;
                this.typeParams();
                }
                break;
            }
            this.state = 331;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 7, this.context) ) {
            case 1:
                {
                this.state = 330;
                this.interfaceExtends();
                }
                break;
            }
            this.state = 333;
            this.typeObject();
            this.state = 334;
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 20, Stage4Parser.RULE_interfaceExtends);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 336;
            this.match(Stage4Parser.LPAREN);
            this.state = 337;
            this.match(Stage4Parser.EXTENDS);
            this.state = 339;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 338;
                this.typeExpr();
                }
                }
                this.state = 341;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 97);
            this.state = 343;
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 22, Stage4Parser.RULE_classDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 345;
            this.match(Stage4Parser.LPAREN);
            this.state = 346;
            this.match(Stage4Parser.CLASS);
            this.state = 350;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 92) {
                {
                {
                this.state = 347;
                this.modifier();
                }
                }
                this.state = 352;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 353;
            this.match(Stage4Parser.IDENTIFIER);
            this.state = 355;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 10, this.context) ) {
            case 1:
                {
                this.state = 354;
                this.typeParams();
                }
                break;
            }
            this.state = 358;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 11, this.context) ) {
            case 1:
                {
                this.state = 357;
                this.classExtends();
                }
                break;
            }
            this.state = 361;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 12, this.context) ) {
            case 1:
                {
                this.state = 360;
                this.classImplements();
                }
                break;
            }
            this.state = 363;
            this.classBody();
            this.state = 364;
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 24, Stage4Parser.RULE_anonClassDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 366;
            this.match(Stage4Parser.LPAREN);
            this.state = 367;
            this.match(Stage4Parser.CLASS);
            this.state = 371;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 92) {
                {
                {
                this.state = 368;
                this.modifier();
                }
                }
                this.state = 373;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 375;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 14, this.context) ) {
            case 1:
                {
                this.state = 374;
                this.classExtends();
                }
                break;
            }
            this.state = 378;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 15, this.context) ) {
            case 1:
                {
                this.state = 377;
                this.classImplements();
                }
                break;
            }
            this.state = 380;
            this.classBody();
            this.state = 381;
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 26, Stage4Parser.RULE_classExtends);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 383;
            this.match(Stage4Parser.LPAREN);
            this.state = 384;
            this.match(Stage4Parser.EXTENDS);
            this.state = 385;
            this.typeExpr();
            this.state = 386;
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 28, Stage4Parser.RULE_classImplements);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 388;
            this.match(Stage4Parser.LPAREN);
            this.state = 389;
            this.match(Stage4Parser.IMPLEMENTS);
            this.state = 391;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 390;
                this.typeExpr();
                }
                }
                this.state = 393;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 97);
            this.state = 395;
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 30, Stage4Parser.RULE_classBody);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 397;
            this.match(Stage4Parser.LPAREN);
            this.state = 398;
            this.match(Stage4Parser.CLASS_BODY);
            this.state = 402;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 399;
                this.classElement();
                }
                }
                this.state = 404;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 405;
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 32, Stage4Parser.RULE_classElement);
        try {
            this.state = 413;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 18, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 407;
                this.fieldDef();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 408;
                this.constructorDef();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 409;
                this.classMethodDef();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 410;
                this.abstractMethodDef();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 411;
                this.getterDef();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 412;
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
        this.enterRule(localContext, 34, Stage4Parser.RULE_modifier);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 415;
            this.match(Stage4Parser.KEYWORD);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 36, Stage4Parser.RULE_fieldDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 417;
            this.match(Stage4Parser.LPAREN);
            this.state = 418;
            this.match(Stage4Parser.FIELD);
            this.state = 422;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 92) {
                {
                {
                this.state = 419;
                this.modifier();
                }
                }
                this.state = 424;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 425;
            this.match(Stage4Parser.IDENTIFIER);
            this.state = 428;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 79) {
                {
                this.state = 426;
                this.match(Stage4Parser.COLON);
                this.state = 427;
                this.typeExpr();
                }
            }

            this.state = 431;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2 || ((((_la - 50)) & ~0x1F) === 0 && ((1 << (_la - 50)) & 469762051) !== 0) || ((((_la - 92)) & ~0x1F) === 0 && ((1 << (_la - 92)) & 55) !== 0)) {
                {
                this.state = 430;
                this.expression();
                }
            }

            this.state = 433;
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 38, Stage4Parser.RULE_constructorDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 435;
            this.match(Stage4Parser.LPAREN);
            this.state = 436;
            this.match(Stage4Parser.CONSTRUCTOR);
            this.state = 437;
            this.fnSignatureTyped();
            this.state = 441;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 50)) & ~0x1F) === 0 && ((1 << (_la - 50)) & 469762051) !== 0) || ((((_la - 92)) & ~0x1F) === 0 && ((1 << (_la - 92)) & 55) !== 0)) {
                {
                {
                this.state = 438;
                this.statement();
                }
                }
                this.state = 443;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 444;
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 40, Stage4Parser.RULE_classMethodDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 446;
            this.match(Stage4Parser.LPAREN);
            this.state = 447;
            this.match(Stage4Parser.METHOD);
            this.state = 451;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 92) {
                {
                {
                this.state = 448;
                this.modifier();
                }
                }
                this.state = 453;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 454;
            this.match(Stage4Parser.IDENTIFIER);
            this.state = 455;
            this.fnSignatureTyped();
            this.state = 459;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 50)) & ~0x1F) === 0 && ((1 << (_la - 50)) & 469762051) !== 0) || ((((_la - 92)) & ~0x1F) === 0 && ((1 << (_la - 92)) & 55) !== 0)) {
                {
                {
                this.state = 456;
                this.statement();
                }
                }
                this.state = 461;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 462;
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 42, Stage4Parser.RULE_abstractMethodDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 464;
            this.match(Stage4Parser.LPAREN);
            this.state = 465;
            this.match(Stage4Parser.ABSTRACT_METHOD);
            this.state = 469;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 92) {
                {
                {
                this.state = 466;
                this.modifier();
                }
                }
                this.state = 471;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 472;
            this.match(Stage4Parser.IDENTIFIER);
            this.state = 473;
            this.fnSignatureTyped();
            this.state = 474;
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 44, Stage4Parser.RULE_getterDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 476;
            this.match(Stage4Parser.LPAREN);
            this.state = 477;
            this.match(Stage4Parser.GET);
            this.state = 481;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 92) {
                {
                {
                this.state = 478;
                this.modifier();
                }
                }
                this.state = 483;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 484;
            this.match(Stage4Parser.IDENTIFIER);
            this.state = 485;
            this.fnSignatureTyped();
            this.state = 489;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 50)) & ~0x1F) === 0 && ((1 << (_la - 50)) & 469762051) !== 0) || ((((_la - 92)) & ~0x1F) === 0 && ((1 << (_la - 92)) & 55) !== 0)) {
                {
                {
                this.state = 486;
                this.statement();
                }
                }
                this.state = 491;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 492;
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 46, Stage4Parser.RULE_setterDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 494;
            this.match(Stage4Parser.LPAREN);
            this.state = 495;
            this.match(Stage4Parser.SETPROP);
            this.state = 499;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 92) {
                {
                {
                this.state = 496;
                this.modifier();
                }
                }
                this.state = 501;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 502;
            this.match(Stage4Parser.IDENTIFIER);
            this.state = 503;
            this.fnSignatureTyped();
            this.state = 507;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 50)) & ~0x1F) === 0 && ((1 << (_la - 50)) & 469762051) !== 0) || ((((_la - 92)) & ~0x1F) === 0 && ((1 << (_la - 92)) & 55) !== 0)) {
                {
                {
                this.state = 504;
                this.statement();
                }
                }
                this.state = 509;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 510;
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 48, Stage4Parser.RULE_typedParam);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 512;
            this.match(Stage4Parser.LPAREN);
            this.state = 513;
            this.match(Stage4Parser.IDENTIFIER);
            this.state = 515;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 75) {
                {
                this.state = 514;
                this.match(Stage4Parser.OPTIONAL);
                }
            }

            this.state = 519;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 79) {
                {
                this.state = 517;
                this.match(Stage4Parser.COLON);
                this.state = 518;
                this.typeExpr();
                }
            }

            this.state = 521;
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 50, Stage4Parser.RULE_fnSignatureTyped);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 523;
            this.match(Stage4Parser.LPAREN);
            this.state = 534;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2) {
                {
                this.state = 524;
                this.typedParam();
                this.state = 531;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 2 || _la === 4) {
                    {
                    {
                    this.state = 526;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    if (_la === 4) {
                        {
                        this.state = 525;
                        this.match(Stage4Parser.COMMA);
                        }
                    }

                    this.state = 528;
                    this.typedParam();
                    }
                    }
                    this.state = 533;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
            }

            this.state = 536;
            this.match(Stage4Parser.RPAREN);
            this.state = 542;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 35, this.context) ) {
            case 1:
                {
                this.state = 537;
                this.match(Stage4Parser.LPAREN);
                this.state = 538;
                this.match(Stage4Parser.RETURNS);
                this.state = 539;
                this.typeExpr();
                this.state = 540;
                this.match(Stage4Parser.RPAREN);
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
        this.enterRule(localContext, 52, Stage4Parser.RULE_statement);
        try {
            this.state = 562;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 36, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 544;
                this.letStar();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 545;
                this.letStmt();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 546;
                this.constStar();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 547;
                this.constStmt();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 548;
                this.ifForm();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 549;
                this.whileForm();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 550;
                this.block();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 551;
                this.returnForm();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 552;
                this.throwForm();
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 553;
                this.importForm();
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 554;
                this.importTypeForm();
                }
                break;
            case 12:
                this.enterOuterAlt(localContext, 12);
                {
                this.state = 555;
                this.exportForm();
                }
                break;
            case 13:
                this.enterOuterAlt(localContext, 13);
                {
                this.state = 556;
                this.switchForm();
                }
                break;
            case 14:
                this.enterOuterAlt(localContext, 14);
                {
                this.state = 557;
                this.forForm();
                }
                break;
            case 15:
                this.enterOuterAlt(localContext, 15);
                {
                this.state = 558;
                this.forInForm();
                }
                break;
            case 16:
                this.enterOuterAlt(localContext, 16);
                {
                this.state = 559;
                this.forOfForm();
                }
                break;
            case 17:
                this.enterOuterAlt(localContext, 17);
                {
                this.state = 560;
                this.assign();
                }
                break;
            case 18:
                this.enterOuterAlt(localContext, 18);
                {
                this.state = 561;
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
        this.enterRule(localContext, 54, Stage4Parser.RULE_letStar);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 564;
            this.match(Stage4Parser.LPAREN);
            this.state = 565;
            this.match(Stage4Parser.LETSTAR);
            this.state = 566;
            this.match(Stage4Parser.LPAREN);
            this.state = 570;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 567;
                this.starBinding();
                }
                }
                this.state = 572;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 573;
            this.match(Stage4Parser.RPAREN);
            this.state = 577;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 50)) & ~0x1F) === 0 && ((1 << (_la - 50)) & 469762051) !== 0) || ((((_la - 92)) & ~0x1F) === 0 && ((1 << (_la - 92)) & 55) !== 0)) {
                {
                {
                this.state = 574;
                this.statement();
                }
                }
                this.state = 579;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 580;
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 56, Stage4Parser.RULE_letStmt);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 582;
            this.match(Stage4Parser.LPAREN);
            this.state = 583;
            this.match(Stage4Parser.LET);
            this.state = 584;
            this.singleBinding();
            this.state = 585;
            this.expression();
            this.state = 586;
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 58, Stage4Parser.RULE_constStar);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 588;
            this.match(Stage4Parser.LPAREN);
            this.state = 589;
            this.match(Stage4Parser.CONSTSTAR);
            this.state = 590;
            this.match(Stage4Parser.LPAREN);
            this.state = 594;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 591;
                this.starBinding();
                }
                }
                this.state = 596;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 597;
            this.match(Stage4Parser.RPAREN);
            this.state = 601;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 50)) & ~0x1F) === 0 && ((1 << (_la - 50)) & 469762051) !== 0) || ((((_la - 92)) & ~0x1F) === 0 && ((1 << (_la - 92)) & 55) !== 0)) {
                {
                {
                this.state = 598;
                this.statement();
                }
                }
                this.state = 603;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 604;
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 60, Stage4Parser.RULE_constStmt);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 606;
            this.match(Stage4Parser.LPAREN);
            this.state = 607;
            this.match(Stage4Parser.CONST);
            this.state = 608;
            this.singleBinding();
            this.state = 609;
            this.expression();
            this.state = 610;
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 62, Stage4Parser.RULE_ifForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 612;
            this.match(Stage4Parser.LPAREN);
            this.state = 613;
            this.match(Stage4Parser.IF);
            this.state = 614;
            this.expression();
            this.state = 615;
            this.statement();
            this.state = 617;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2 || ((((_la - 50)) & ~0x1F) === 0 && ((1 << (_la - 50)) & 469762051) !== 0) || ((((_la - 92)) & ~0x1F) === 0 && ((1 << (_la - 92)) & 55) !== 0)) {
                {
                this.state = 616;
                this.statement();
                }
            }

            this.state = 619;
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 64, Stage4Parser.RULE_whileForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 621;
            this.match(Stage4Parser.LPAREN);
            this.state = 622;
            this.match(Stage4Parser.WHILE);
            this.state = 623;
            this.expression();
            this.state = 627;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 50)) & ~0x1F) === 0 && ((1 << (_la - 50)) & 469762051) !== 0) || ((((_la - 92)) & ~0x1F) === 0 && ((1 << (_la - 92)) & 55) !== 0)) {
                {
                {
                this.state = 624;
                this.statement();
                }
                }
                this.state = 629;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 630;
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 66, Stage4Parser.RULE_block);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 632;
            this.match(Stage4Parser.LPAREN);
            this.state = 633;
            this.match(Stage4Parser.BEGIN);
            this.state = 637;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 50)) & ~0x1F) === 0 && ((1 << (_la - 50)) & 469762051) !== 0) || ((((_la - 92)) & ~0x1F) === 0 && ((1 << (_la - 92)) & 55) !== 0)) {
                {
                {
                this.state = 634;
                this.statement();
                }
                }
                this.state = 639;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 640;
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 68, Stage4Parser.RULE_returnForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 642;
            this.match(Stage4Parser.LPAREN);
            this.state = 643;
            this.match(Stage4Parser.RETURN);
            this.state = 645;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2 || ((((_la - 50)) & ~0x1F) === 0 && ((1 << (_la - 50)) & 469762051) !== 0) || ((((_la - 92)) & ~0x1F) === 0 && ((1 << (_la - 92)) & 55) !== 0)) {
                {
                this.state = 644;
                this.expression();
                }
            }

            this.state = 647;
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 70, Stage4Parser.RULE_throwForm);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 649;
            this.match(Stage4Parser.LPAREN);
            this.state = 650;
            this.match(Stage4Parser.THROW);
            this.state = 651;
            this.expression();
            this.state = 652;
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 72, Stage4Parser.RULE_importForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 654;
            this.match(Stage4Parser.LPAREN);
            this.state = 655;
            this.match(Stage4Parser.IMPORT);
            this.state = 657;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2) {
                {
                this.state = 656;
                this.objectExpr();
                }
            }

            this.state = 659;
            this.match(Stage4Parser.STRING);
            this.state = 660;
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 74, Stage4Parser.RULE_importTypeForm);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 662;
            this.match(Stage4Parser.LPAREN);
            this.state = 663;
            this.match(Stage4Parser.IMPORT_TYPE);
            this.state = 664;
            this.importTypeSpec();
            this.state = 665;
            this.match(Stage4Parser.STRING);
            this.state = 666;
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 76, Stage4Parser.RULE_importTypeSpec);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 668;
            this.match(Stage4Parser.LPAREN);
            this.state = 669;
            this.match(Stage4Parser.IDENTIFIER);
            this.state = 671;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 670;
                this.importTypeName();
                }
                }
                this.state = 673;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 97);
            this.state = 675;
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 78, Stage4Parser.RULE_importTypeName);
        try {
            this.state = 682;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case Stage4Parser.IDENTIFIER:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 677;
                this.match(Stage4Parser.IDENTIFIER);
                }
                break;
            case Stage4Parser.LPAREN:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 678;
                this.match(Stage4Parser.LPAREN);
                this.state = 679;
                this.match(Stage4Parser.IDENTIFIER);
                this.state = 680;
                this.match(Stage4Parser.IDENTIFIER);
                this.state = 681;
                this.match(Stage4Parser.RPAREN);
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
        this.enterRule(localContext, 80, Stage4Parser.RULE_exportForm);
        try {
            this.state = 693;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 48, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 684;
                this.exportBinding();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 685;
                this.exportDefault();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 686;
                this.exportNamed();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 687;
                this.exportNsFromForm();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 688;
                this.exportFrom();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 689;
                this.exportAllFrom();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 690;
                this.exportTypeForm();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 691;
                this.exportTypeFromForm();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 692;
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
        this.enterRule(localContext, 82, Stage4Parser.RULE_exportBinding);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 695;
            this.match(Stage4Parser.LPAREN);
            this.state = 696;
            this.match(Stage4Parser.EXPORT);
            this.state = 697;
            this.match(Stage4Parser.IDENTIFIER);
            this.state = 698;
            this.expression();
            this.state = 699;
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 84, Stage4Parser.RULE_exportDefault);
        try {
            this.state = 731;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 49, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 701;
                this.match(Stage4Parser.LPAREN);
                this.state = 702;
                this.match(Stage4Parser.EXPORT_DEFAULT);
                this.state = 703;
                this.classDef();
                this.state = 704;
                this.match(Stage4Parser.RPAREN);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 706;
                this.match(Stage4Parser.LPAREN);
                this.state = 707;
                this.match(Stage4Parser.EXPORT_DEFAULT);
                this.state = 708;
                this.anonClassDef();
                this.state = 709;
                this.match(Stage4Parser.RPAREN);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 711;
                this.match(Stage4Parser.LPAREN);
                this.state = 712;
                this.match(Stage4Parser.EXPORT_DEFAULT);
                this.state = 713;
                this.def();
                this.state = 714;
                this.match(Stage4Parser.RPAREN);
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 716;
                this.match(Stage4Parser.LPAREN);
                this.state = 717;
                this.match(Stage4Parser.EXPORT_DEFAULT);
                this.state = 718;
                this.topLevelLet();
                this.state = 719;
                this.match(Stage4Parser.RPAREN);
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 721;
                this.match(Stage4Parser.LPAREN);
                this.state = 722;
                this.match(Stage4Parser.EXPORT_DEFAULT);
                this.state = 723;
                this.topLevelConst();
                this.state = 724;
                this.match(Stage4Parser.RPAREN);
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 726;
                this.match(Stage4Parser.LPAREN);
                this.state = 727;
                this.match(Stage4Parser.EXPORT_DEFAULT);
                this.state = 728;
                this.expression();
                this.state = 729;
                this.match(Stage4Parser.RPAREN);
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
        this.enterRule(localContext, 86, Stage4Parser.RULE_exportNamed);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 733;
            this.match(Stage4Parser.LPAREN);
            this.state = 734;
            this.match(Stage4Parser.EXPORT_NAMED);
            this.state = 736;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 735;
                this.exportNamePair();
                }
                }
                this.state = 738;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2);
            this.state = 740;
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 88, Stage4Parser.RULE_exportNamePair);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 742;
            this.match(Stage4Parser.LPAREN);
            this.state = 743;
            this.match(Stage4Parser.IDENTIFIER);
            this.state = 745;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 97) {
                {
                this.state = 744;
                this.match(Stage4Parser.IDENTIFIER);
                }
            }

            this.state = 747;
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 90, Stage4Parser.RULE_exportFrom);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 749;
            this.match(Stage4Parser.LPAREN);
            this.state = 750;
            this.match(Stage4Parser.EXPORT_FROM);
            this.state = 751;
            this.match(Stage4Parser.STRING);
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
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 92, Stage4Parser.RULE_exportAllFrom);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 759;
            this.match(Stage4Parser.LPAREN);
            this.state = 760;
            this.match(Stage4Parser.EXPORT_ALL_FROM);
            this.state = 761;
            this.match(Stage4Parser.STRING);
            this.state = 762;
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 94, Stage4Parser.RULE_exportNsFromForm);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 764;
            this.match(Stage4Parser.LPAREN);
            this.state = 765;
            this.match(Stage4Parser.EXPORT_NS_FROM);
            this.state = 766;
            this.match(Stage4Parser.STRING);
            this.state = 767;
            this.match(Stage4Parser.STRING);
            this.state = 768;
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 96, Stage4Parser.RULE_exportTypeForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 770;
            this.match(Stage4Parser.LPAREN);
            this.state = 771;
            this.match(Stage4Parser.EXPORT_TYPE);
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
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 98, Stage4Parser.RULE_exportTypeFromForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 779;
            this.match(Stage4Parser.LPAREN);
            this.state = 780;
            this.match(Stage4Parser.EXPORT_TYPE_FROM);
            this.state = 781;
            this.match(Stage4Parser.STRING);
            this.state = 783;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 782;
                this.exportNamePair();
                }
                }
                this.state = 785;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2);
            this.state = 787;
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 100, Stage4Parser.RULE_exportTypeAllFromForm);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 789;
            this.match(Stage4Parser.LPAREN);
            this.state = 790;
            this.match(Stage4Parser.EXPORT_TYPE_ALL_FROM);
            this.state = 791;
            this.match(Stage4Parser.STRING);
            this.state = 792;
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 102, Stage4Parser.RULE_exportDeclForm);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 794;
            this.match(Stage4Parser.LPAREN);
            this.state = 795;
            this.match(Stage4Parser.EXPORT);
            this.state = 796;
            this.decl();
            this.state = 797;
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 104, Stage4Parser.RULE_starBinding);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 799;
            this.match(Stage4Parser.LPAREN);
            this.state = 800;
            this.match(Stage4Parser.IDENTIFIER);
            this.state = 803;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 79) {
                {
                this.state = 801;
                this.match(Stage4Parser.COLON);
                this.state = 802;
                this.typeExpr();
                }
            }

            this.state = 805;
            this.expression();
            this.state = 806;
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 106, Stage4Parser.RULE_singleBinding);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 808;
            this.match(Stage4Parser.LPAREN);
            this.state = 809;
            this.match(Stage4Parser.IDENTIFIER);
            this.state = 812;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 79) {
                {
                this.state = 810;
                this.match(Stage4Parser.COLON);
                this.state = 811;
                this.typeExpr();
                }
            }

            this.state = 814;
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 108, Stage4Parser.RULE_typeExpr);
        try {
            this.state = 832;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 57, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 816;
                this.match(Stage4Parser.IDENTIFIER);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 817;
                this.typeUnion();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 818;
                this.typeIntersection();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 819;
                this.typeArray();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 820;
                this.typeTuple();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 821;
                this.typeFunction();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 822;
                this.typeObject();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 823;
                this.typeLiteral();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 824;
                this.typeKeyof();
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 825;
                this.typeTypeof();
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 826;
                this.typeIndexAccess();
                }
                break;
            case 12:
                this.enterOuterAlt(localContext, 12);
                {
                this.state = 827;
                this.typeConditional();
                }
                break;
            case 13:
                this.enterOuterAlt(localContext, 13);
                {
                this.state = 828;
                this.typeInfer();
                }
                break;
            case 14:
                this.enterOuterAlt(localContext, 14);
                {
                this.state = 829;
                this.typeMapped();
                }
                break;
            case 15:
                this.enterOuterAlt(localContext, 15);
                {
                this.state = 830;
                this.typeTemplateLiteral();
                }
                break;
            case 16:
                this.enterOuterAlt(localContext, 16);
                {
                this.state = 831;
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
        this.enterRule(localContext, 110, Stage4Parser.RULE_typeUnion);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 834;
            this.match(Stage4Parser.LPAREN);
            this.state = 835;
            this.match(Stage4Parser.UNION);
            this.state = 836;
            this.typeExpr();
            this.state = 838;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 837;
                this.typeExpr();
                }
                }
                this.state = 840;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 97);
            this.state = 842;
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 112, Stage4Parser.RULE_typeIntersection);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 844;
            this.match(Stage4Parser.LPAREN);
            this.state = 845;
            this.match(Stage4Parser.INTERSECT);
            this.state = 846;
            this.typeExpr();
            this.state = 848;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 847;
                this.typeExpr();
                }
                }
                this.state = 850;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 97);
            this.state = 852;
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 114, Stage4Parser.RULE_typeArray);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 854;
            this.match(Stage4Parser.LPAREN);
            this.state = 855;
            this.match(Stage4Parser.ARRAY);
            this.state = 856;
            this.typeExpr();
            this.state = 857;
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 116, Stage4Parser.RULE_typeTuple);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 859;
            this.match(Stage4Parser.LPAREN);
            this.state = 860;
            this.match(Stage4Parser.TUPLE);
            this.state = 862;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 861;
                this.typeTupleElement();
                }
                }
                this.state = 864;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 97);
            this.state = 866;
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 118, Stage4Parser.RULE_typeTupleElement);
        try {
            this.state = 879;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 61, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 868;
                this.match(Stage4Parser.LPAREN);
                this.state = 869;
                this.match(Stage4Parser.REST);
                this.state = 870;
                this.typeExpr();
                this.state = 871;
                this.match(Stage4Parser.RPAREN);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 873;
                this.match(Stage4Parser.LPAREN);
                this.state = 874;
                this.match(Stage4Parser.IDENTIFIER);
                this.state = 875;
                this.typeExpr();
                this.state = 876;
                this.match(Stage4Parser.RPAREN);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 878;
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
        this.enterRule(localContext, 120, Stage4Parser.RULE_typeFunction);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 881;
            this.match(Stage4Parser.LPAREN);
            this.state = 882;
            this.match(Stage4Parser.TYPEFN);
            this.state = 884;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 62, this.context) ) {
            case 1:
                {
                this.state = 883;
                this.typeParams();
                }
                break;
            }
            this.state = 886;
            this.match(Stage4Parser.LPAREN);
            this.state = 890;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 887;
                this.typeFnParam();
                }
                }
                this.state = 892;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 893;
            this.match(Stage4Parser.RPAREN);
            this.state = 894;
            this.typeExpr();
            this.state = 895;
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 122, Stage4Parser.RULE_typeFnParam);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 897;
            this.match(Stage4Parser.LPAREN);
            this.state = 898;
            this.match(Stage4Parser.IDENTIFIER);
            this.state = 900;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 75) {
                {
                this.state = 899;
                this.match(Stage4Parser.OPTIONAL);
                }
            }

            this.state = 902;
            this.typeExpr();
            this.state = 903;
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 124, Stage4Parser.RULE_typeObject);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 905;
            this.match(Stage4Parser.LPAREN);
            this.state = 906;
            this.match(Stage4Parser.IDENTIFIER);
            this.state = 910;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 907;
                this.typeProp();
                }
                }
                this.state = 912;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 913;
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 126, Stage4Parser.RULE_typeProp);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 915;
            this.match(Stage4Parser.LPAREN);
            this.state = 919;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 67) {
                {
                {
                this.state = 916;
                this.propModifier();
                }
                }
                this.state = 921;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 922;
            this.match(Stage4Parser.IDENTIFIER);
            this.state = 924;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 75) {
                {
                this.state = 923;
                this.match(Stage4Parser.OPTIONAL);
                }
            }

            this.state = 926;
            this.typeExpr();
            this.state = 927;
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 128, Stage4Parser.RULE_propModifier);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 929;
            this.match(Stage4Parser.READONLY);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 130, Stage4Parser.RULE_typeLiteral);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 931;
            this.match(Stage4Parser.LPAREN);
            this.state = 932;
            this.match(Stage4Parser.LIT);
            this.state = 933;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 76)) & ~0x1F) === 0 && ((1 << (_la - 76)) & 1441793) !== 0))) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 934;
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 132, Stage4Parser.RULE_typeKeyof);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 936;
            this.match(Stage4Parser.LPAREN);
            this.state = 937;
            this.match(Stage4Parser.KEYOF);
            this.state = 938;
            this.typeExpr();
            this.state = 939;
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 134, Stage4Parser.RULE_typeTypeof);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 941;
            this.match(Stage4Parser.LPAREN);
            this.state = 942;
            this.match(Stage4Parser.TYPEOF);
            this.state = 943;
            this.match(Stage4Parser.IDENTIFIER);
            this.state = 944;
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 136, Stage4Parser.RULE_typeIndexAccess);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 946;
            this.match(Stage4Parser.LPAREN);
            this.state = 947;
            this.match(Stage4Parser.INDEX);
            this.state = 948;
            this.typeExpr();
            this.state = 949;
            this.typeExpr();
            this.state = 950;
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 138, Stage4Parser.RULE_typeConditional);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 952;
            this.match(Stage4Parser.LPAREN);
            this.state = 953;
            this.match(Stage4Parser.COND);
            this.state = 954;
            this.typeExpr();
            this.state = 955;
            this.typeExpr();
            this.state = 956;
            this.typeExpr();
            this.state = 957;
            this.typeExpr();
            this.state = 958;
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 140, Stage4Parser.RULE_typeInfer);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 960;
            this.match(Stage4Parser.LPAREN);
            this.state = 961;
            this.match(Stage4Parser.INFER);
            this.state = 962;
            this.match(Stage4Parser.IDENTIFIER);
            this.state = 963;
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 142, Stage4Parser.RULE_typeMapped);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 965;
            this.match(Stage4Parser.LPAREN);
            this.state = 966;
            this.match(Stage4Parser.MAPPED);
            this.state = 967;
            this.match(Stage4Parser.IDENTIFIER);
            this.state = 968;
            this.typeExpr();
            this.state = 970;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 68, this.context) ) {
            case 1:
                {
                this.state = 969;
                this.mappedModifiers();
                }
                break;
            }
            this.state = 972;
            this.typeExpr();
            this.state = 973;
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 144, Stage4Parser.RULE_mappedModifiers);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 975;
            this.match(Stage4Parser.LPAREN);
            this.state = 976;
            this.match(Stage4Parser.MODIFIERS);
            this.state = 978;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 977;
                this.mappedModifier();
                }
                }
                this.state = 980;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 67 || _la === 75);
            this.state = 982;
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 146, Stage4Parser.RULE_mappedModifier);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 984;
            _la = this.tokenStream.LA(1);
            if(!(_la === 67 || _la === 75)) {
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
        this.enterRule(localContext, 148, Stage4Parser.RULE_typeTemplateLiteral);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 986;
            this.match(Stage4Parser.LPAREN);
            this.state = 987;
            this.match(Stage4Parser.TEMPLATE);
            this.state = 989;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 988;
                this.templatePart();
                }
                }
                this.state = 991;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 94 || _la === 97);
            this.state = 993;
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 150, Stage4Parser.RULE_templatePart);
        try {
            this.state = 997;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case Stage4Parser.STRING:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 995;
                this.match(Stage4Parser.STRING);
                }
                break;
            case Stage4Parser.LPAREN:
            case Stage4Parser.IDENTIFIER:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 996;
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
        this.enterRule(localContext, 152, Stage4Parser.RULE_typeApplication);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 999;
            this.match(Stage4Parser.LPAREN);
            this.state = 1000;
            this.typeExpr();
            this.state = 1002;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 1001;
                this.typeExpr();
                }
                }
                this.state = 1004;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 97);
            this.state = 1006;
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 154, Stage4Parser.RULE_typeParams);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1008;
            this.match(Stage4Parser.LPAREN);
            this.state = 1009;
            this.match(Stage4Parser.TYPE_PARAMS);
            this.state = 1011;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 1010;
                this.typeParamDecl();
                }
                }
                this.state = 1013;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 97);
            this.state = 1015;
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 156, Stage4Parser.RULE_typeParamDecl);
        let _la: number;
        try {
            this.state = 1027;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case Stage4Parser.IDENTIFIER:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1017;
                this.match(Stage4Parser.IDENTIFIER);
                }
                break;
            case Stage4Parser.LPAREN:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1018;
                this.match(Stage4Parser.LPAREN);
                this.state = 1019;
                this.match(Stage4Parser.IDENTIFIER);
                this.state = 1021;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 74, this.context) ) {
                case 1:
                    {
                    this.state = 1020;
                    this.typeParamConstraint();
                    }
                    break;
                }
                this.state = 1024;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 2) {
                    {
                    this.state = 1023;
                    this.typeParamDefault();
                    }
                }

                this.state = 1026;
                this.match(Stage4Parser.RPAREN);
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
        this.enterRule(localContext, 158, Stage4Parser.RULE_typeParamConstraint);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1029;
            this.match(Stage4Parser.LPAREN);
            this.state = 1030;
            this.match(Stage4Parser.EXTENDS);
            this.state = 1031;
            this.typeExpr();
            this.state = 1032;
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 160, Stage4Parser.RULE_typeParamDefault);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1034;
            this.match(Stage4Parser.LPAREN);
            this.state = 1035;
            this.match(Stage4Parser.DEFAULT);
            this.state = 1036;
            this.typeExpr();
            this.state = 1037;
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 162, Stage4Parser.RULE_assign);
        try {
            this.state = 1051;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 77, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1039;
                this.match(Stage4Parser.LPAREN);
                this.state = 1040;
                this.match(Stage4Parser.SET);
                this.state = 1041;
                this.match(Stage4Parser.IDENTIFIER);
                this.state = 1042;
                this.expression();
                this.state = 1043;
                this.match(Stage4Parser.RPAREN);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1045;
                this.match(Stage4Parser.LPAREN);
                this.state = 1046;
                this.match(Stage4Parser.SET);
                this.state = 1047;
                this.propAccess();
                this.state = 1048;
                this.expression();
                this.state = 1049;
                this.match(Stage4Parser.RPAREN);
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
        this.enterRule(localContext, 164, Stage4Parser.RULE_switchForm);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1053;
            this.match(Stage4Parser.LPAREN);
            this.state = 1054;
            this.match(Stage4Parser.SWITCH);
            this.state = 1055;
            this.expression();
            this.state = 1059;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 78, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 1056;
                    this.caseClause();
                    }
                    }
                }
                this.state = 1061;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 78, this.context);
            }
            this.state = 1063;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2) {
                {
                this.state = 1062;
                this.defaultClause();
                }
            }

            this.state = 1065;
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 166, Stage4Parser.RULE_caseClause);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1067;
            this.match(Stage4Parser.LPAREN);
            this.state = 1068;
            this.match(Stage4Parser.CASE);
            this.state = 1069;
            this.expression();
            this.state = 1073;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 50)) & ~0x1F) === 0 && ((1 << (_la - 50)) & 469762051) !== 0) || ((((_la - 92)) & ~0x1F) === 0 && ((1 << (_la - 92)) & 55) !== 0)) {
                {
                {
                this.state = 1070;
                this.statement();
                }
                }
                this.state = 1075;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1076;
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 168, Stage4Parser.RULE_defaultClause);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1078;
            this.match(Stage4Parser.LPAREN);
            this.state = 1079;
            this.match(Stage4Parser.DEFAULT);
            this.state = 1083;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 50)) & ~0x1F) === 0 && ((1 << (_la - 50)) & 469762051) !== 0) || ((((_la - 92)) & ~0x1F) === 0 && ((1 << (_la - 92)) & 55) !== 0)) {
                {
                {
                this.state = 1080;
                this.statement();
                }
                }
                this.state = 1085;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1086;
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 170, Stage4Parser.RULE_forForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1088;
            this.match(Stage4Parser.LPAREN);
            this.state = 1089;
            this.match(Stage4Parser.FOR);
            this.state = 1090;
            this.letStmt();
            this.state = 1091;
            this.expression();
            this.state = 1092;
            this.assign();
            this.state = 1096;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 50)) & ~0x1F) === 0 && ((1 << (_la - 50)) & 469762051) !== 0) || ((((_la - 92)) & ~0x1F) === 0 && ((1 << (_la - 92)) & 55) !== 0)) {
                {
                {
                this.state = 1093;
                this.statement();
                }
                }
                this.state = 1098;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1099;
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 172, Stage4Parser.RULE_forInForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1101;
            this.match(Stage4Parser.LPAREN);
            this.state = 1102;
            this.match(Stage4Parser.FORIN);
            this.state = 1103;
            this.match(Stage4Parser.IDENTIFIER);
            this.state = 1104;
            this.expression();
            this.state = 1108;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 50)) & ~0x1F) === 0 && ((1 << (_la - 50)) & 469762051) !== 0) || ((((_la - 92)) & ~0x1F) === 0 && ((1 << (_la - 92)) & 55) !== 0)) {
                {
                {
                this.state = 1105;
                this.statement();
                }
                }
                this.state = 1110;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1111;
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 174, Stage4Parser.RULE_forOfForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1113;
            this.match(Stage4Parser.LPAREN);
            this.state = 1114;
            this.match(Stage4Parser.FOROF);
            this.state = 1115;
            this.match(Stage4Parser.IDENTIFIER);
            this.state = 1116;
            this.expression();
            this.state = 1120;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 50)) & ~0x1F) === 0 && ((1 << (_la - 50)) & 469762051) !== 0) || ((((_la - 92)) & ~0x1F) === 0 && ((1 << (_la - 92)) & 55) !== 0)) {
                {
                {
                this.state = 1117;
                this.statement();
                }
                }
                this.state = 1122;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1123;
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 176, Stage4Parser.RULE_expression);
        try {
            this.state = 1151;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 85, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1125;
                this.literal();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1126;
                this.match(Stage4Parser.KEYWORD);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 1127;
                this.match(Stage4Parser.IDENTIFIER);
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 1128;
                this.lambda();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 1129;
                this.fn();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 1130;
                this.bindExpr();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 1131;
                this.methodCallExpr();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 1132;
                this.objectExpr();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 1133;
                this.arrayExpr();
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 1134;
                this.propAccess();
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 1135;
                this.indexAccess();
                }
                break;
            case 12:
                this.enterOuterAlt(localContext, 12);
                {
                this.state = 1136;
                this.quasiquote();
                }
                break;
            case 13:
                this.enterOuterAlt(localContext, 13);
                {
                this.state = 1137;
                this.unquote();
                }
                break;
            case 14:
                this.enterOuterAlt(localContext, 14);
                {
                this.state = 1138;
                this.unquoteSplicing();
                }
                break;
            case 15:
                this.enterOuterAlt(localContext, 15);
                {
                this.state = 1139;
                this.ternary();
                }
                break;
            case 16:
                this.enterOuterAlt(localContext, 16);
                {
                this.state = 1140;
                this.condExpr();
                }
                break;
            case 17:
                this.enterOuterAlt(localContext, 17);
                {
                this.state = 1141;
                this.newForm();
                }
                break;
            case 18:
                this.enterOuterAlt(localContext, 18);
                {
                this.state = 1142;
                this.optChain();
                }
                break;
            case 19:
                this.enterOuterAlt(localContext, 19);
                {
                this.state = 1143;
                this.nullCoalesce();
                }
                break;
            case 20:
                this.enterOuterAlt(localContext, 20);
                {
                this.state = 1144;
                this.typeofExpr();
                }
                break;
            case 21:
                this.enterOuterAlt(localContext, 21);
                {
                this.state = 1145;
                this.typeAssert();
                }
                break;
            case 22:
                this.enterOuterAlt(localContext, 22);
                {
                this.state = 1146;
                this.thisExpr();
                }
                break;
            case 23:
                this.enterOuterAlt(localContext, 23);
                {
                this.state = 1147;
                this.superExpr();
                }
                break;
            case 24:
                this.enterOuterAlt(localContext, 24);
                {
                this.state = 1148;
                this.superConstructorCall();
                }
                break;
            case 25:
                this.enterOuterAlt(localContext, 25);
                {
                this.state = 1149;
                this.superMethodCall();
                }
                break;
            case 26:
                this.enterOuterAlt(localContext, 26);
                {
                this.state = 1150;
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
        this.enterRule(localContext, 178, Stage4Parser.RULE_thisExpr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1153;
            this.match(Stage4Parser.THIS);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 180, Stage4Parser.RULE_superExpr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1155;
            this.match(Stage4Parser.SUPER);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 182, Stage4Parser.RULE_superConstructorCall);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1157;
            this.match(Stage4Parser.LPAREN);
            this.state = 1158;
            this.match(Stage4Parser.SUPER);
            this.state = 1162;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 50)) & ~0x1F) === 0 && ((1 << (_la - 50)) & 469762051) !== 0) || ((((_la - 92)) & ~0x1F) === 0 && ((1 << (_la - 92)) & 55) !== 0)) {
                {
                {
                this.state = 1159;
                this.expression();
                }
                }
                this.state = 1164;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1165;
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 184, Stage4Parser.RULE_superMethodCall);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1167;
            this.match(Stage4Parser.LPAREN);
            this.state = 1168;
            this.match(Stage4Parser.SUPER_METHOD);
            this.state = 1169;
            this.match(Stage4Parser.IDENTIFIER);
            this.state = 1173;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 50)) & ~0x1F) === 0 && ((1 << (_la - 50)) & 469762051) !== 0) || ((((_la - 92)) & ~0x1F) === 0 && ((1 << (_la - 92)) & 55) !== 0)) {
                {
                {
                this.state = 1170;
                this.expression();
                }
                }
                this.state = 1175;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1176;
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 186, Stage4Parser.RULE_typeofExpr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1178;
            this.match(Stage4Parser.LPAREN);
            this.state = 1179;
            this.match(Stage4Parser.TYPEOF);
            this.state = 1180;
            this.expression();
            this.state = 1181;
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 188, Stage4Parser.RULE_typeAssert);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1183;
            this.match(Stage4Parser.LPAREN);
            this.state = 1184;
            this.match(Stage4Parser.TYPE_AS);
            this.state = 1185;
            this.expression();
            this.state = 1186;
            this.typeExpr();
            this.state = 1187;
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 190, Stage4Parser.RULE_lambda);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1189;
            this.match(Stage4Parser.LPAREN);
            this.state = 1190;
            this.match(Stage4Parser.LAMBDA);
            this.state = 1191;
            this.fnSignature();
            this.state = 1195;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 50)) & ~0x1F) === 0 && ((1 << (_la - 50)) & 469762051) !== 0) || ((((_la - 92)) & ~0x1F) === 0 && ((1 << (_la - 92)) & 55) !== 0)) {
                {
                {
                this.state = 1192;
                this.statement();
                }
                }
                this.state = 1197;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1198;
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 192, Stage4Parser.RULE_fn);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1200;
            this.match(Stage4Parser.LPAREN);
            this.state = 1201;
            this.match(Stage4Parser.FN);
            this.state = 1202;
            this.fnSignature();
            this.state = 1206;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 50)) & ~0x1F) === 0 && ((1 << (_la - 50)) & 469762051) !== 0) || ((((_la - 92)) & ~0x1F) === 0 && ((1 << (_la - 92)) & 55) !== 0)) {
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
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 194, Stage4Parser.RULE_bindExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1211;
            this.match(Stage4Parser.LPAREN);
            this.state = 1212;
            this.match(Stage4Parser.BIND);
            this.state = 1213;
            this.expression();
            this.state = 1214;
            this.expression();
            this.state = 1218;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 50)) & ~0x1F) === 0 && ((1 << (_la - 50)) & 469762051) !== 0) || ((((_la - 92)) & ~0x1F) === 0 && ((1 << (_la - 92)) & 55) !== 0)) {
                {
                {
                this.state = 1215;
                this.expression();
                }
                }
                this.state = 1220;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1221;
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 196, Stage4Parser.RULE_methodCallExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1223;
            this.match(Stage4Parser.LPAREN);
            this.state = 1224;
            this.match(Stage4Parser.METHOD_CALL);
            this.state = 1225;
            this.expression();
            this.state = 1226;
            this.expression();
            this.state = 1230;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 50)) & ~0x1F) === 0 && ((1 << (_la - 50)) & 469762051) !== 0) || ((((_la - 92)) & ~0x1F) === 0 && ((1 << (_la - 92)) & 55) !== 0)) {
                {
                {
                this.state = 1227;
                this.expression();
                }
                }
                this.state = 1232;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1233;
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 198, Stage4Parser.RULE_ternary);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1235;
            this.match(Stage4Parser.LPAREN);
            this.state = 1236;
            this.match(Stage4Parser.TERNARY);
            this.state = 1237;
            this.expression();
            this.state = 1238;
            this.expression();
            this.state = 1239;
            this.expression();
            this.state = 1240;
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 200, Stage4Parser.RULE_condExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1242;
            this.match(Stage4Parser.LPAREN);
            this.state = 1243;
            this.match(Stage4Parser.COND);
            this.state = 1247;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 1244;
                this.expression();
                this.state = 1245;
                this.expression();
                }
                }
                this.state = 1249;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || ((((_la - 50)) & ~0x1F) === 0 && ((1 << (_la - 50)) & 469762051) !== 0) || ((((_la - 92)) & ~0x1F) === 0 && ((1 << (_la - 92)) & 55) !== 0));
            this.state = 1251;
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 202, Stage4Parser.RULE_newForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1253;
            this.match(Stage4Parser.LPAREN);
            this.state = 1254;
            this.match(Stage4Parser.NEW);
            this.state = 1255;
            this.match(Stage4Parser.IDENTIFIER);
            this.state = 1257;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 93, this.context) ) {
            case 1:
                {
                this.state = 1256;
                this.typeArgs();
                }
                break;
            }
            this.state = 1262;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 50)) & ~0x1F) === 0 && ((1 << (_la - 50)) & 469762051) !== 0) || ((((_la - 92)) & ~0x1F) === 0 && ((1 << (_la - 92)) & 55) !== 0)) {
                {
                {
                this.state = 1259;
                this.expression();
                }
                }
                this.state = 1264;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1265;
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 204, Stage4Parser.RULE_objectExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1267;
            this.match(Stage4Parser.LPAREN);
            this.state = 1268;
            this.match(Stage4Parser.OBJECT);
            this.state = 1272;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 1269;
                this.objectField();
                }
                }
                this.state = 1274;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1275;
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 206, Stage4Parser.RULE_objectField);
        try {
            this.state = 1290;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 96, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1277;
                this.match(Stage4Parser.LPAREN);
                this.state = 1278;
                this.propKey();
                this.state = 1279;
                this.expression();
                this.state = 1280;
                this.match(Stage4Parser.RPAREN);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1282;
                this.match(Stage4Parser.LPAREN);
                this.state = 1283;
                this.propKey();
                this.state = 1284;
                this.methodDef();
                this.state = 1285;
                this.match(Stage4Parser.RPAREN);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 1287;
                this.match(Stage4Parser.LPAREN);
                this.state = 1288;
                this.match(Stage4Parser.IDENTIFIER);
                this.state = 1289;
                this.match(Stage4Parser.RPAREN);
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
        this.enterRule(localContext, 208, Stage4Parser.RULE_methodDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1292;
            this.match(Stage4Parser.LPAREN);
            this.state = 1293;
            this.match(Stage4Parser.METHOD);
            this.state = 1294;
            this.fnSignature();
            this.state = 1298;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 50)) & ~0x1F) === 0 && ((1 << (_la - 50)) & 469762051) !== 0) || ((((_la - 92)) & ~0x1F) === 0 && ((1 << (_la - 92)) & 55) !== 0)) {
                {
                {
                this.state = 1295;
                this.statement();
                }
                }
                this.state = 1300;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1301;
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 210, Stage4Parser.RULE_arrayExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1303;
            this.match(Stage4Parser.LPAREN);
            this.state = 1304;
            this.match(Stage4Parser.ARRAY);
            this.state = 1308;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 50)) & ~0x1F) === 0 && ((1 << (_la - 50)) & 469762051) !== 0) || ((((_la - 92)) & ~0x1F) === 0 && ((1 << (_la - 92)) & 55) !== 0)) {
                {
                {
                this.state = 1305;
                this.expression();
                }
                }
                this.state = 1310;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1311;
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 212, Stage4Parser.RULE_propKey);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1313;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 5)) & ~0x1F) === 0 && ((1 << (_la - 5)) & 4202692607) !== 0) || ((((_la - 37)) & ~0x1F) === 0 && ((1 << (_la - 37)) & 4294967295) !== 0) || ((((_la - 69)) & ~0x1F) === 0 && ((1 << (_la - 69)) & 452977599) !== 0))) {
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
        this.enterRule(localContext, 214, Stage4Parser.RULE_propAccess);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1315;
            this.match(Stage4Parser.LPAREN);
            this.state = 1316;
            this.match(Stage4Parser.DOT);
            this.state = 1317;
            this.expression();
            this.state = 1318;
            this.propKey();
            this.state = 1319;
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 216, Stage4Parser.RULE_indexAccess);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1321;
            this.match(Stage4Parser.LPAREN);
            this.state = 1322;
            this.match(Stage4Parser.INDEX);
            this.state = 1323;
            this.expression();
            this.state = 1324;
            this.expression();
            this.state = 1325;
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 218, Stage4Parser.RULE_quasiquote);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1327;
            this.match(Stage4Parser.LPAREN);
            this.state = 1328;
            _la = this.tokenStream.LA(1);
            if(!(_la === 32 || _la === 33)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 1329;
            this.expression();
            this.state = 1330;
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 220, Stage4Parser.RULE_unquote);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1332;
            this.match(Stage4Parser.LPAREN);
            this.state = 1333;
            this.match(Stage4Parser.UNQUOTE);
            this.state = 1334;
            this.expression();
            this.state = 1335;
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 222, Stage4Parser.RULE_unquoteSplicing);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1337;
            this.match(Stage4Parser.LPAREN);
            this.state = 1338;
            this.match(Stage4Parser.UNQUOTE_SPLICING);
            this.state = 1339;
            this.expression();
            this.state = 1340;
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 224, Stage4Parser.RULE_optChain);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1342;
            this.match(Stage4Parser.LPAREN);
            this.state = 1343;
            this.match(Stage4Parser.OPTCHAIN);
            this.state = 1344;
            this.expression();
            this.state = 1345;
            this.propKey();
            this.state = 1346;
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 226, Stage4Parser.RULE_nullCoalesce);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1348;
            this.match(Stage4Parser.LPAREN);
            this.state = 1349;
            this.match(Stage4Parser.NULLCOAL);
            this.state = 1350;
            this.expression();
            this.state = 1351;
            this.expression();
            this.state = 1352;
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 228, Stage4Parser.RULE_call);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1354;
            this.match(Stage4Parser.LPAREN);
            this.state = 1355;
            this.expression();
            this.state = 1357;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 99, this.context) ) {
            case 1:
                {
                this.state = 1356;
                this.typeArgs();
                }
                break;
            }
            this.state = 1362;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 50)) & ~0x1F) === 0 && ((1 << (_la - 50)) & 469762051) !== 0) || ((((_la - 92)) & ~0x1F) === 0 && ((1 << (_la - 92)) & 55) !== 0)) {
                {
                {
                this.state = 1359;
                this.expression();
                }
                }
                this.state = 1364;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1365;
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 230, Stage4Parser.RULE_typeArgs);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1367;
            this.match(Stage4Parser.LPAREN);
            this.state = 1368;
            this.match(Stage4Parser.TYPE_ARGS);
            this.state = 1370;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 1369;
                this.typeExpr();
                }
                }
                this.state = 1372;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 97);
            this.state = 1374;
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 232, Stage4Parser.RULE_fnSignature);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1376;
            this.match(Stage4Parser.LPAREN);
            this.state = 1387;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2) {
                {
                this.state = 1377;
                this.param();
                this.state = 1384;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 2 || _la === 4) {
                    {
                    {
                    this.state = 1379;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    if (_la === 4) {
                        {
                        this.state = 1378;
                        this.match(Stage4Parser.COMMA);
                        }
                    }

                    this.state = 1381;
                    this.param();
                    }
                    }
                    this.state = 1386;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
            }

            this.state = 1389;
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 234, Stage4Parser.RULE_param);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1391;
            this.match(Stage4Parser.LPAREN);
            this.state = 1392;
            this.match(Stage4Parser.IDENTIFIER);
            this.state = 1393;
            this.match(Stage4Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 236, Stage4Parser.RULE_literal);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1395;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 76)) & ~0x1F) === 0 && ((1 << (_la - 76)) & 1441799) !== 0))) {
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
        4,1,98,1398,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,
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
        2,115,7,115,2,116,7,116,2,117,7,117,2,118,7,118,1,0,1,0,1,0,5,0,
        242,8,0,10,0,12,0,245,9,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,1,3,1,259,8,1,1,2,1,2,1,2,1,2,1,2,1,2,3,2,267,8,2,1,3,1,
        3,1,3,1,3,1,3,5,3,274,8,3,10,3,12,3,277,9,3,1,3,1,3,1,4,1,4,1,4,
        1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,3,4,296,8,4,1,5,
        1,5,1,5,1,5,1,5,1,5,1,6,1,6,1,6,1,6,1,6,1,6,1,7,1,7,1,7,1,7,1,7,
        1,7,1,8,1,8,1,8,1,8,3,8,320,8,8,1,8,1,8,1,8,1,9,1,9,1,9,1,9,3,9,
        329,8,9,1,9,3,9,332,8,9,1,9,1,9,1,9,1,10,1,10,1,10,4,10,340,8,10,
        11,10,12,10,341,1,10,1,10,1,11,1,11,1,11,5,11,349,8,11,10,11,12,
        11,352,9,11,1,11,1,11,3,11,356,8,11,1,11,3,11,359,8,11,1,11,3,11,
        362,8,11,1,11,1,11,1,11,1,12,1,12,1,12,5,12,370,8,12,10,12,12,12,
        373,9,12,1,12,3,12,376,8,12,1,12,3,12,379,8,12,1,12,1,12,1,12,1,
        13,1,13,1,13,1,13,1,13,1,14,1,14,1,14,4,14,392,8,14,11,14,12,14,
        393,1,14,1,14,1,15,1,15,1,15,5,15,401,8,15,10,15,12,15,404,9,15,
        1,15,1,15,1,16,1,16,1,16,1,16,1,16,1,16,3,16,414,8,16,1,17,1,17,
        1,18,1,18,1,18,5,18,421,8,18,10,18,12,18,424,9,18,1,18,1,18,1,18,
        3,18,429,8,18,1,18,3,18,432,8,18,1,18,1,18,1,19,1,19,1,19,1,19,5,
        19,440,8,19,10,19,12,19,443,9,19,1,19,1,19,1,20,1,20,1,20,5,20,450,
        8,20,10,20,12,20,453,9,20,1,20,1,20,1,20,5,20,458,8,20,10,20,12,
        20,461,9,20,1,20,1,20,1,21,1,21,1,21,5,21,468,8,21,10,21,12,21,471,
        9,21,1,21,1,21,1,21,1,21,1,22,1,22,1,22,5,22,480,8,22,10,22,12,22,
        483,9,22,1,22,1,22,1,22,5,22,488,8,22,10,22,12,22,491,9,22,1,22,
        1,22,1,23,1,23,1,23,5,23,498,8,23,10,23,12,23,501,9,23,1,23,1,23,
        1,23,5,23,506,8,23,10,23,12,23,509,9,23,1,23,1,23,1,24,1,24,1,24,
        3,24,516,8,24,1,24,1,24,3,24,520,8,24,1,24,1,24,1,25,1,25,1,25,3,
        25,527,8,25,1,25,5,25,530,8,25,10,25,12,25,533,9,25,3,25,535,8,25,
        1,25,1,25,1,25,1,25,1,25,1,25,3,25,543,8,25,1,26,1,26,1,26,1,26,
        1,26,1,26,1,26,1,26,1,26,1,26,1,26,1,26,1,26,1,26,1,26,1,26,1,26,
        1,26,3,26,563,8,26,1,27,1,27,1,27,1,27,5,27,569,8,27,10,27,12,27,
        572,9,27,1,27,1,27,5,27,576,8,27,10,27,12,27,579,9,27,1,27,1,27,
        1,28,1,28,1,28,1,28,1,28,1,28,1,29,1,29,1,29,1,29,5,29,593,8,29,
        10,29,12,29,596,9,29,1,29,1,29,5,29,600,8,29,10,29,12,29,603,9,29,
        1,29,1,29,1,30,1,30,1,30,1,30,1,30,1,30,1,31,1,31,1,31,1,31,1,31,
        3,31,618,8,31,1,31,1,31,1,32,1,32,1,32,1,32,5,32,626,8,32,10,32,
        12,32,629,9,32,1,32,1,32,1,33,1,33,1,33,5,33,636,8,33,10,33,12,33,
        639,9,33,1,33,1,33,1,34,1,34,1,34,3,34,646,8,34,1,34,1,34,1,35,1,
        35,1,35,1,35,1,35,1,36,1,36,1,36,3,36,658,8,36,1,36,1,36,1,36,1,
        37,1,37,1,37,1,37,1,37,1,37,1,38,1,38,1,38,4,38,672,8,38,11,38,12,
        38,673,1,38,1,38,1,39,1,39,1,39,1,39,1,39,3,39,683,8,39,1,40,1,40,
        1,40,1,40,1,40,1,40,1,40,1,40,1,40,3,40,694,8,40,1,41,1,41,1,41,
        1,41,1,41,1,41,1,42,1,42,1,42,1,42,1,42,1,42,1,42,1,42,1,42,1,42,
        1,42,1,42,1,42,1,42,1,42,1,42,1,42,1,42,1,42,1,42,1,42,1,42,1,42,
        1,42,1,42,1,42,1,42,1,42,1,42,1,42,3,42,732,8,42,1,43,1,43,1,43,
        4,43,737,8,43,11,43,12,43,738,1,43,1,43,1,44,1,44,1,44,3,44,746,
        8,44,1,44,1,44,1,45,1,45,1,45,1,45,4,45,754,8,45,11,45,12,45,755,
        1,45,1,45,1,46,1,46,1,46,1,46,1,46,1,47,1,47,1,47,1,47,1,47,1,47,
        1,48,1,48,1,48,4,48,774,8,48,11,48,12,48,775,1,48,1,48,1,49,1,49,
        1,49,1,49,4,49,784,8,49,11,49,12,49,785,1,49,1,49,1,50,1,50,1,50,
        1,50,1,50,1,51,1,51,1,51,1,51,1,51,1,52,1,52,1,52,1,52,3,52,804,
        8,52,1,52,1,52,1,52,1,53,1,53,1,53,1,53,3,53,813,8,53,1,53,1,53,
        1,54,1,54,1,54,1,54,1,54,1,54,1,54,1,54,1,54,1,54,1,54,1,54,1,54,
        1,54,1,54,1,54,3,54,833,8,54,1,55,1,55,1,55,1,55,4,55,839,8,55,11,
        55,12,55,840,1,55,1,55,1,56,1,56,1,56,1,56,4,56,849,8,56,11,56,12,
        56,850,1,56,1,56,1,57,1,57,1,57,1,57,1,57,1,58,1,58,1,58,4,58,863,
        8,58,11,58,12,58,864,1,58,1,58,1,59,1,59,1,59,1,59,1,59,1,59,1,59,
        1,59,1,59,1,59,1,59,3,59,880,8,59,1,60,1,60,1,60,3,60,885,8,60,1,
        60,1,60,5,60,889,8,60,10,60,12,60,892,9,60,1,60,1,60,1,60,1,60,1,
        61,1,61,1,61,3,61,901,8,61,1,61,1,61,1,61,1,62,1,62,1,62,5,62,909,
        8,62,10,62,12,62,912,9,62,1,62,1,62,1,63,1,63,5,63,918,8,63,10,63,
        12,63,921,9,63,1,63,1,63,3,63,925,8,63,1,63,1,63,1,63,1,64,1,64,
        1,65,1,65,1,65,1,65,1,65,1,66,1,66,1,66,1,66,1,66,1,67,1,67,1,67,
        1,67,1,67,1,68,1,68,1,68,1,68,1,68,1,68,1,69,1,69,1,69,1,69,1,69,
        1,69,1,69,1,69,1,70,1,70,1,70,1,70,1,70,1,71,1,71,1,71,1,71,1,71,
        3,71,971,8,71,1,71,1,71,1,71,1,72,1,72,1,72,4,72,979,8,72,11,72,
        12,72,980,1,72,1,72,1,73,1,73,1,74,1,74,1,74,4,74,990,8,74,11,74,
        12,74,991,1,74,1,74,1,75,1,75,3,75,998,8,75,1,76,1,76,1,76,4,76,
        1003,8,76,11,76,12,76,1004,1,76,1,76,1,77,1,77,1,77,4,77,1012,8,
        77,11,77,12,77,1013,1,77,1,77,1,78,1,78,1,78,1,78,3,78,1022,8,78,
        1,78,3,78,1025,8,78,1,78,3,78,1028,8,78,1,79,1,79,1,79,1,79,1,79,
        1,80,1,80,1,80,1,80,1,80,1,81,1,81,1,81,1,81,1,81,1,81,1,81,1,81,
        1,81,1,81,1,81,1,81,3,81,1052,8,81,1,82,1,82,1,82,1,82,5,82,1058,
        8,82,10,82,12,82,1061,9,82,1,82,3,82,1064,8,82,1,82,1,82,1,83,1,
        83,1,83,1,83,5,83,1072,8,83,10,83,12,83,1075,9,83,1,83,1,83,1,84,
        1,84,1,84,5,84,1082,8,84,10,84,12,84,1085,9,84,1,84,1,84,1,85,1,
        85,1,85,1,85,1,85,1,85,5,85,1095,8,85,10,85,12,85,1098,9,85,1,85,
        1,85,1,86,1,86,1,86,1,86,1,86,5,86,1107,8,86,10,86,12,86,1110,9,
        86,1,86,1,86,1,87,1,87,1,87,1,87,1,87,5,87,1119,8,87,10,87,12,87,
        1122,9,87,1,87,1,87,1,88,1,88,1,88,1,88,1,88,1,88,1,88,1,88,1,88,
        1,88,1,88,1,88,1,88,1,88,1,88,1,88,1,88,1,88,1,88,1,88,1,88,1,88,
        1,88,1,88,1,88,1,88,3,88,1152,8,88,1,89,1,89,1,90,1,90,1,91,1,91,
        1,91,5,91,1161,8,91,10,91,12,91,1164,9,91,1,91,1,91,1,92,1,92,1,
        92,1,92,5,92,1172,8,92,10,92,12,92,1175,9,92,1,92,1,92,1,93,1,93,
        1,93,1,93,1,93,1,94,1,94,1,94,1,94,1,94,1,94,1,95,1,95,1,95,1,95,
        5,95,1194,8,95,10,95,12,95,1197,9,95,1,95,1,95,1,96,1,96,1,96,1,
        96,5,96,1205,8,96,10,96,12,96,1208,9,96,1,96,1,96,1,97,1,97,1,97,
        1,97,1,97,5,97,1217,8,97,10,97,12,97,1220,9,97,1,97,1,97,1,98,1,
        98,1,98,1,98,1,98,5,98,1229,8,98,10,98,12,98,1232,9,98,1,98,1,98,
        1,99,1,99,1,99,1,99,1,99,1,99,1,99,1,100,1,100,1,100,1,100,1,100,
        4,100,1248,8,100,11,100,12,100,1249,1,100,1,100,1,101,1,101,1,101,
        1,101,3,101,1258,8,101,1,101,5,101,1261,8,101,10,101,12,101,1264,
        9,101,1,101,1,101,1,102,1,102,1,102,5,102,1271,8,102,10,102,12,102,
        1274,9,102,1,102,1,102,1,103,1,103,1,103,1,103,1,103,1,103,1,103,
        1,103,1,103,1,103,1,103,1,103,1,103,3,103,1291,8,103,1,104,1,104,
        1,104,1,104,5,104,1297,8,104,10,104,12,104,1300,9,104,1,104,1,104,
        1,105,1,105,1,105,5,105,1307,8,105,10,105,12,105,1310,9,105,1,105,
        1,105,1,106,1,106,1,107,1,107,1,107,1,107,1,107,1,107,1,108,1,108,
        1,108,1,108,1,108,1,108,1,109,1,109,1,109,1,109,1,109,1,110,1,110,
        1,110,1,110,1,110,1,111,1,111,1,111,1,111,1,111,1,112,1,112,1,112,
        1,112,1,112,1,112,1,113,1,113,1,113,1,113,1,113,1,113,1,114,1,114,
        1,114,3,114,1358,8,114,1,114,5,114,1361,8,114,10,114,12,114,1364,
        9,114,1,114,1,114,1,115,1,115,1,115,4,115,1371,8,115,11,115,12,115,
        1372,1,115,1,115,1,116,1,116,1,116,3,116,1380,8,116,1,116,5,116,
        1383,8,116,10,116,12,116,1386,9,116,3,116,1388,8,116,1,116,1,116,
        1,117,1,117,1,117,1,117,1,118,1,118,1,118,0,0,119,0,2,4,6,8,10,12,
        14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,
        58,60,62,64,66,68,70,72,74,76,78,80,82,84,86,88,90,92,94,96,98,100,
        102,104,106,108,110,112,114,116,118,120,122,124,126,128,130,132,
        134,136,138,140,142,144,146,148,150,152,154,156,158,160,162,164,
        166,168,170,172,174,176,178,180,182,184,186,188,190,192,194,196,
        198,200,202,204,206,208,210,212,214,216,218,220,222,224,226,228,
        230,232,234,236,0,5,3,0,76,76,93,94,96,96,2,0,67,67,75,75,7,0,5,
        27,30,30,32,74,76,78,82,92,94,94,96,97,1,0,32,33,3,0,76,78,93,94,
        96,96,1467,0,238,1,0,0,0,2,258,1,0,0,0,4,266,1,0,0,0,6,268,1,0,0,
        0,8,295,1,0,0,0,10,297,1,0,0,0,12,303,1,0,0,0,14,309,1,0,0,0,16,
        315,1,0,0,0,18,324,1,0,0,0,20,336,1,0,0,0,22,345,1,0,0,0,24,366,
        1,0,0,0,26,383,1,0,0,0,28,388,1,0,0,0,30,397,1,0,0,0,32,413,1,0,
        0,0,34,415,1,0,0,0,36,417,1,0,0,0,38,435,1,0,0,0,40,446,1,0,0,0,
        42,464,1,0,0,0,44,476,1,0,0,0,46,494,1,0,0,0,48,512,1,0,0,0,50,523,
        1,0,0,0,52,562,1,0,0,0,54,564,1,0,0,0,56,582,1,0,0,0,58,588,1,0,
        0,0,60,606,1,0,0,0,62,612,1,0,0,0,64,621,1,0,0,0,66,632,1,0,0,0,
        68,642,1,0,0,0,70,649,1,0,0,0,72,654,1,0,0,0,74,662,1,0,0,0,76,668,
        1,0,0,0,78,682,1,0,0,0,80,693,1,0,0,0,82,695,1,0,0,0,84,731,1,0,
        0,0,86,733,1,0,0,0,88,742,1,0,0,0,90,749,1,0,0,0,92,759,1,0,0,0,
        94,764,1,0,0,0,96,770,1,0,0,0,98,779,1,0,0,0,100,789,1,0,0,0,102,
        794,1,0,0,0,104,799,1,0,0,0,106,808,1,0,0,0,108,832,1,0,0,0,110,
        834,1,0,0,0,112,844,1,0,0,0,114,854,1,0,0,0,116,859,1,0,0,0,118,
        879,1,0,0,0,120,881,1,0,0,0,122,897,1,0,0,0,124,905,1,0,0,0,126,
        915,1,0,0,0,128,929,1,0,0,0,130,931,1,0,0,0,132,936,1,0,0,0,134,
        941,1,0,0,0,136,946,1,0,0,0,138,952,1,0,0,0,140,960,1,0,0,0,142,
        965,1,0,0,0,144,975,1,0,0,0,146,984,1,0,0,0,148,986,1,0,0,0,150,
        997,1,0,0,0,152,999,1,0,0,0,154,1008,1,0,0,0,156,1027,1,0,0,0,158,
        1029,1,0,0,0,160,1034,1,0,0,0,162,1051,1,0,0,0,164,1053,1,0,0,0,
        166,1067,1,0,0,0,168,1078,1,0,0,0,170,1088,1,0,0,0,172,1101,1,0,
        0,0,174,1113,1,0,0,0,176,1151,1,0,0,0,178,1153,1,0,0,0,180,1155,
        1,0,0,0,182,1157,1,0,0,0,184,1167,1,0,0,0,186,1178,1,0,0,0,188,1183,
        1,0,0,0,190,1189,1,0,0,0,192,1200,1,0,0,0,194,1211,1,0,0,0,196,1223,
        1,0,0,0,198,1235,1,0,0,0,200,1242,1,0,0,0,202,1253,1,0,0,0,204,1267,
        1,0,0,0,206,1290,1,0,0,0,208,1292,1,0,0,0,210,1303,1,0,0,0,212,1313,
        1,0,0,0,214,1315,1,0,0,0,216,1321,1,0,0,0,218,1327,1,0,0,0,220,1332,
        1,0,0,0,222,1337,1,0,0,0,224,1342,1,0,0,0,226,1348,1,0,0,0,228,1354,
        1,0,0,0,230,1367,1,0,0,0,232,1376,1,0,0,0,234,1391,1,0,0,0,236,1395,
        1,0,0,0,238,239,5,2,0,0,239,243,5,5,0,0,240,242,3,2,1,0,241,240,
        1,0,0,0,242,245,1,0,0,0,243,241,1,0,0,0,243,244,1,0,0,0,244,246,
        1,0,0,0,245,243,1,0,0,0,246,247,5,3,0,0,247,1,1,0,0,0,248,259,3,
        6,3,0,249,259,3,8,4,0,250,259,3,10,5,0,251,259,3,12,6,0,252,259,
        3,14,7,0,253,259,3,16,8,0,254,259,3,18,9,0,255,259,3,22,11,0,256,
        259,3,102,51,0,257,259,3,52,26,0,258,248,1,0,0,0,258,249,1,0,0,0,
        258,250,1,0,0,0,258,251,1,0,0,0,258,252,1,0,0,0,258,253,1,0,0,0,
        258,254,1,0,0,0,258,255,1,0,0,0,258,256,1,0,0,0,258,257,1,0,0,0,
        259,3,1,0,0,0,260,267,3,10,5,0,261,267,3,12,6,0,262,267,3,14,7,0,
        263,267,3,22,11,0,264,267,3,18,9,0,265,267,3,16,8,0,266,260,1,0,
        0,0,266,261,1,0,0,0,266,262,1,0,0,0,266,263,1,0,0,0,266,264,1,0,
        0,0,266,265,1,0,0,0,267,5,1,0,0,0,268,269,5,2,0,0,269,270,5,16,0,
        0,270,271,5,97,0,0,271,275,3,232,116,0,272,274,3,52,26,0,273,272,
        1,0,0,0,274,277,1,0,0,0,275,273,1,0,0,0,275,276,1,0,0,0,276,278,
        1,0,0,0,277,275,1,0,0,0,278,279,5,3,0,0,279,7,1,0,0,0,280,281,5,
        2,0,0,281,282,5,17,0,0,282,283,3,10,5,0,283,284,5,3,0,0,284,296,
        1,0,0,0,285,286,5,2,0,0,286,287,5,17,0,0,287,288,3,12,6,0,288,289,
        5,3,0,0,289,296,1,0,0,0,290,291,5,2,0,0,291,292,5,17,0,0,292,293,
        3,14,7,0,293,294,5,3,0,0,294,296,1,0,0,0,295,280,1,0,0,0,295,285,
        1,0,0,0,295,290,1,0,0,0,296,9,1,0,0,0,297,298,5,2,0,0,298,299,5,
        15,0,0,299,300,5,97,0,0,300,301,3,176,88,0,301,302,5,3,0,0,302,11,
        1,0,0,0,303,304,5,2,0,0,304,305,5,7,0,0,305,306,5,97,0,0,306,307,
        3,176,88,0,307,308,5,3,0,0,308,13,1,0,0,0,309,310,5,2,0,0,310,311,
        5,9,0,0,311,312,5,97,0,0,312,313,3,176,88,0,313,314,5,3,0,0,314,
        15,1,0,0,0,315,316,5,2,0,0,316,317,5,72,0,0,317,319,5,97,0,0,318,
        320,3,154,77,0,319,318,1,0,0,0,319,320,1,0,0,0,320,321,1,0,0,0,321,
        322,3,108,54,0,322,323,5,3,0,0,323,17,1,0,0,0,324,325,5,2,0,0,325,
        326,5,73,0,0,326,328,5,97,0,0,327,329,3,154,77,0,328,327,1,0,0,0,
        328,329,1,0,0,0,329,331,1,0,0,0,330,332,3,20,10,0,331,330,1,0,0,
        0,331,332,1,0,0,0,332,333,1,0,0,0,333,334,3,124,62,0,334,335,5,3,
        0,0,335,19,1,0,0,0,336,337,5,2,0,0,337,339,5,70,0,0,338,340,3,108,
        54,0,339,338,1,0,0,0,340,341,1,0,0,0,341,339,1,0,0,0,341,342,1,0,
        0,0,342,343,1,0,0,0,343,344,5,3,0,0,344,21,1,0,0,0,345,346,5,2,0,
        0,346,350,5,47,0,0,347,349,3,34,17,0,348,347,1,0,0,0,349,352,1,0,
        0,0,350,348,1,0,0,0,350,351,1,0,0,0,351,353,1,0,0,0,352,350,1,0,
        0,0,353,355,5,97,0,0,354,356,3,154,77,0,355,354,1,0,0,0,355,356,
        1,0,0,0,356,358,1,0,0,0,357,359,3,26,13,0,358,357,1,0,0,0,358,359,
        1,0,0,0,359,361,1,0,0,0,360,362,3,28,14,0,361,360,1,0,0,0,361,362,
        1,0,0,0,362,363,1,0,0,0,363,364,3,30,15,0,364,365,5,3,0,0,365,23,
        1,0,0,0,366,367,5,2,0,0,367,371,5,47,0,0,368,370,3,34,17,0,369,368,
        1,0,0,0,370,373,1,0,0,0,371,369,1,0,0,0,371,372,1,0,0,0,372,375,
        1,0,0,0,373,371,1,0,0,0,374,376,3,26,13,0,375,374,1,0,0,0,375,376,
        1,0,0,0,376,378,1,0,0,0,377,379,3,28,14,0,378,377,1,0,0,0,378,379,
        1,0,0,0,379,380,1,0,0,0,380,381,3,30,15,0,381,382,5,3,0,0,382,25,
        1,0,0,0,383,384,5,2,0,0,384,385,5,70,0,0,385,386,3,108,54,0,386,
        387,5,3,0,0,387,27,1,0,0,0,388,389,5,2,0,0,389,391,5,54,0,0,390,
        392,3,108,54,0,391,390,1,0,0,0,392,393,1,0,0,0,393,391,1,0,0,0,393,
        394,1,0,0,0,394,395,1,0,0,0,395,396,5,3,0,0,396,29,1,0,0,0,397,398,
        5,2,0,0,398,402,5,44,0,0,399,401,3,32,16,0,400,399,1,0,0,0,401,404,
        1,0,0,0,402,400,1,0,0,0,402,403,1,0,0,0,403,405,1,0,0,0,404,402,
        1,0,0,0,405,406,5,3,0,0,406,31,1,0,0,0,407,414,3,36,18,0,408,414,
        3,38,19,0,409,414,3,40,20,0,410,414,3,42,21,0,411,414,3,44,22,0,
        412,414,3,46,23,0,413,407,1,0,0,0,413,408,1,0,0,0,413,409,1,0,0,
        0,413,410,1,0,0,0,413,411,1,0,0,0,413,412,1,0,0,0,414,33,1,0,0,0,
        415,416,5,92,0,0,416,35,1,0,0,0,417,418,5,2,0,0,418,422,5,48,0,0,
        419,421,3,34,17,0,420,419,1,0,0,0,421,424,1,0,0,0,422,420,1,0,0,
        0,422,423,1,0,0,0,423,425,1,0,0,0,424,422,1,0,0,0,425,428,5,97,0,
        0,426,427,5,79,0,0,427,429,3,108,54,0,428,426,1,0,0,0,428,429,1,
        0,0,0,429,431,1,0,0,0,430,432,3,176,88,0,431,430,1,0,0,0,431,432,
        1,0,0,0,432,433,1,0,0,0,433,434,5,3,0,0,434,37,1,0,0,0,435,436,5,
        2,0,0,436,437,5,49,0,0,437,441,3,50,25,0,438,440,3,52,26,0,439,438,
        1,0,0,0,440,443,1,0,0,0,441,439,1,0,0,0,441,442,1,0,0,0,442,444,
        1,0,0,0,443,441,1,0,0,0,444,445,5,3,0,0,445,39,1,0,0,0,446,447,5,
        2,0,0,447,451,5,12,0,0,448,450,3,34,17,0,449,448,1,0,0,0,450,453,
        1,0,0,0,451,449,1,0,0,0,451,452,1,0,0,0,452,454,1,0,0,0,453,451,
        1,0,0,0,454,455,5,97,0,0,455,459,3,50,25,0,456,458,3,52,26,0,457,
        456,1,0,0,0,458,461,1,0,0,0,459,457,1,0,0,0,459,460,1,0,0,0,460,
        462,1,0,0,0,461,459,1,0,0,0,462,463,5,3,0,0,463,41,1,0,0,0,464,465,
        5,2,0,0,465,469,5,46,0,0,466,468,3,34,17,0,467,466,1,0,0,0,468,471,
        1,0,0,0,469,467,1,0,0,0,469,470,1,0,0,0,470,472,1,0,0,0,471,469,
        1,0,0,0,472,473,5,97,0,0,473,474,3,50,25,0,474,475,5,3,0,0,475,43,
        1,0,0,0,476,477,5,2,0,0,477,481,5,52,0,0,478,480,3,34,17,0,479,478,
        1,0,0,0,480,483,1,0,0,0,481,479,1,0,0,0,481,482,1,0,0,0,482,484,
        1,0,0,0,483,481,1,0,0,0,484,485,5,97,0,0,485,489,3,50,25,0,486,488,
        3,52,26,0,487,486,1,0,0,0,488,491,1,0,0,0,489,487,1,0,0,0,489,490,
        1,0,0,0,490,492,1,0,0,0,491,489,1,0,0,0,492,493,5,3,0,0,493,45,1,
        0,0,0,494,495,5,2,0,0,495,499,5,53,0,0,496,498,3,34,17,0,497,496,
        1,0,0,0,498,501,1,0,0,0,499,497,1,0,0,0,499,500,1,0,0,0,500,502,
        1,0,0,0,501,499,1,0,0,0,502,503,5,97,0,0,503,507,3,50,25,0,504,506,
        3,52,26,0,505,504,1,0,0,0,506,509,1,0,0,0,507,505,1,0,0,0,507,508,
        1,0,0,0,508,510,1,0,0,0,509,507,1,0,0,0,510,511,5,3,0,0,511,47,1,
        0,0,0,512,513,5,2,0,0,513,515,5,97,0,0,514,516,5,75,0,0,515,514,
        1,0,0,0,515,516,1,0,0,0,516,519,1,0,0,0,517,518,5,79,0,0,518,520,
        3,108,54,0,519,517,1,0,0,0,519,520,1,0,0,0,520,521,1,0,0,0,521,522,
        5,3,0,0,522,49,1,0,0,0,523,534,5,2,0,0,524,531,3,48,24,0,525,527,
        5,4,0,0,526,525,1,0,0,0,526,527,1,0,0,0,527,528,1,0,0,0,528,530,
        3,48,24,0,529,526,1,0,0,0,530,533,1,0,0,0,531,529,1,0,0,0,531,532,
        1,0,0,0,532,535,1,0,0,0,533,531,1,0,0,0,534,524,1,0,0,0,534,535,
        1,0,0,0,535,536,1,0,0,0,536,542,5,3,0,0,537,538,5,2,0,0,538,539,
        5,71,0,0,539,540,3,108,54,0,540,541,5,3,0,0,541,543,1,0,0,0,542,
        537,1,0,0,0,542,543,1,0,0,0,543,51,1,0,0,0,544,563,3,54,27,0,545,
        563,3,56,28,0,546,563,3,58,29,0,547,563,3,60,30,0,548,563,3,62,31,
        0,549,563,3,64,32,0,550,563,3,66,33,0,551,563,3,68,34,0,552,563,
        3,70,35,0,553,563,3,72,36,0,554,563,3,74,37,0,555,563,3,80,40,0,
        556,563,3,164,82,0,557,563,3,170,85,0,558,563,3,172,86,0,559,563,
        3,174,87,0,560,563,3,162,81,0,561,563,3,176,88,0,562,544,1,0,0,0,
        562,545,1,0,0,0,562,546,1,0,0,0,562,547,1,0,0,0,562,548,1,0,0,0,
        562,549,1,0,0,0,562,550,1,0,0,0,562,551,1,0,0,0,562,552,1,0,0,0,
        562,553,1,0,0,0,562,554,1,0,0,0,562,555,1,0,0,0,562,556,1,0,0,0,
        562,557,1,0,0,0,562,558,1,0,0,0,562,559,1,0,0,0,562,560,1,0,0,0,
        562,561,1,0,0,0,563,53,1,0,0,0,564,565,5,2,0,0,565,566,5,6,0,0,566,
        570,5,2,0,0,567,569,3,104,52,0,568,567,1,0,0,0,569,572,1,0,0,0,570,
        568,1,0,0,0,570,571,1,0,0,0,571,573,1,0,0,0,572,570,1,0,0,0,573,
        577,5,3,0,0,574,576,3,52,26,0,575,574,1,0,0,0,576,579,1,0,0,0,577,
        575,1,0,0,0,577,578,1,0,0,0,578,580,1,0,0,0,579,577,1,0,0,0,580,
        581,5,3,0,0,581,55,1,0,0,0,582,583,5,2,0,0,583,584,5,7,0,0,584,585,
        3,106,53,0,585,586,3,176,88,0,586,587,5,3,0,0,587,57,1,0,0,0,588,
        589,5,2,0,0,589,590,5,8,0,0,590,594,5,2,0,0,591,593,3,104,52,0,592,
        591,1,0,0,0,593,596,1,0,0,0,594,592,1,0,0,0,594,595,1,0,0,0,595,
        597,1,0,0,0,596,594,1,0,0,0,597,601,5,3,0,0,598,600,3,52,26,0,599,
        598,1,0,0,0,600,603,1,0,0,0,601,599,1,0,0,0,601,602,1,0,0,0,602,
        604,1,0,0,0,603,601,1,0,0,0,604,605,5,3,0,0,605,59,1,0,0,0,606,607,
        5,2,0,0,607,608,5,9,0,0,608,609,3,106,53,0,609,610,3,176,88,0,610,
        611,5,3,0,0,611,61,1,0,0,0,612,613,5,2,0,0,613,614,5,18,0,0,614,
        615,3,176,88,0,615,617,3,52,26,0,616,618,3,52,26,0,617,616,1,0,0,
        0,617,618,1,0,0,0,618,619,1,0,0,0,619,620,5,3,0,0,620,63,1,0,0,0,
        621,622,5,2,0,0,622,623,5,19,0,0,623,627,3,176,88,0,624,626,3,52,
        26,0,625,624,1,0,0,0,626,629,1,0,0,0,627,625,1,0,0,0,627,628,1,0,
        0,0,628,630,1,0,0,0,629,627,1,0,0,0,630,631,5,3,0,0,631,65,1,0,0,
        0,632,633,5,2,0,0,633,637,5,20,0,0,634,636,3,52,26,0,635,634,1,0,
        0,0,636,639,1,0,0,0,637,635,1,0,0,0,637,638,1,0,0,0,638,640,1,0,
        0,0,639,637,1,0,0,0,640,641,5,3,0,0,641,67,1,0,0,0,642,643,5,2,0,
        0,643,645,5,21,0,0,644,646,3,176,88,0,645,644,1,0,0,0,645,646,1,
        0,0,0,646,647,1,0,0,0,647,648,5,3,0,0,648,69,1,0,0,0,649,650,5,2,
        0,0,650,651,5,22,0,0,651,652,3,176,88,0,652,653,5,3,0,0,653,71,1,
        0,0,0,654,655,5,2,0,0,655,657,5,37,0,0,656,658,3,204,102,0,657,656,
        1,0,0,0,657,658,1,0,0,0,658,659,1,0,0,0,659,660,5,94,0,0,660,661,
        5,3,0,0,661,73,1,0,0,0,662,663,5,2,0,0,663,664,5,88,0,0,664,665,
        3,76,38,0,665,666,5,94,0,0,666,667,5,3,0,0,667,75,1,0,0,0,668,669,
        5,2,0,0,669,671,5,97,0,0,670,672,3,78,39,0,671,670,1,0,0,0,672,673,
        1,0,0,0,673,671,1,0,0,0,673,674,1,0,0,0,674,675,1,0,0,0,675,676,
        5,3,0,0,676,77,1,0,0,0,677,683,5,97,0,0,678,679,5,2,0,0,679,680,
        5,97,0,0,680,681,5,97,0,0,681,683,5,3,0,0,682,677,1,0,0,0,682,678,
        1,0,0,0,683,79,1,0,0,0,684,694,3,82,41,0,685,694,3,84,42,0,686,694,
        3,86,43,0,687,694,3,94,47,0,688,694,3,90,45,0,689,694,3,92,46,0,
        690,694,3,96,48,0,691,694,3,98,49,0,692,694,3,100,50,0,693,684,1,
        0,0,0,693,685,1,0,0,0,693,686,1,0,0,0,693,687,1,0,0,0,693,688,1,
        0,0,0,693,689,1,0,0,0,693,690,1,0,0,0,693,691,1,0,0,0,693,692,1,
        0,0,0,694,81,1,0,0,0,695,696,5,2,0,0,696,697,5,82,0,0,697,698,5,
        97,0,0,698,699,3,176,88,0,699,700,5,3,0,0,700,83,1,0,0,0,701,702,
        5,2,0,0,702,703,5,83,0,0,703,704,3,22,11,0,704,705,5,3,0,0,705,732,
        1,0,0,0,706,707,5,2,0,0,707,708,5,83,0,0,708,709,3,24,12,0,709,710,
        5,3,0,0,710,732,1,0,0,0,711,712,5,2,0,0,712,713,5,83,0,0,713,714,
        3,10,5,0,714,715,5,3,0,0,715,732,1,0,0,0,716,717,5,2,0,0,717,718,
        5,83,0,0,718,719,3,12,6,0,719,720,5,3,0,0,720,732,1,0,0,0,721,722,
        5,2,0,0,722,723,5,83,0,0,723,724,3,14,7,0,724,725,5,3,0,0,725,732,
        1,0,0,0,726,727,5,2,0,0,727,728,5,83,0,0,728,729,3,176,88,0,729,
        730,5,3,0,0,730,732,1,0,0,0,731,701,1,0,0,0,731,706,1,0,0,0,731,
        711,1,0,0,0,731,716,1,0,0,0,731,721,1,0,0,0,731,726,1,0,0,0,732,
        85,1,0,0,0,733,734,5,2,0,0,734,736,5,84,0,0,735,737,3,88,44,0,736,
        735,1,0,0,0,737,738,1,0,0,0,738,736,1,0,0,0,738,739,1,0,0,0,739,
        740,1,0,0,0,740,741,5,3,0,0,741,87,1,0,0,0,742,743,5,2,0,0,743,745,
        5,97,0,0,744,746,5,97,0,0,745,744,1,0,0,0,745,746,1,0,0,0,746,747,
        1,0,0,0,747,748,5,3,0,0,748,89,1,0,0,0,749,750,5,2,0,0,750,751,5,
        86,0,0,751,753,5,94,0,0,752,754,3,88,44,0,753,752,1,0,0,0,754,755,
        1,0,0,0,755,753,1,0,0,0,755,756,1,0,0,0,756,757,1,0,0,0,757,758,
        5,3,0,0,758,91,1,0,0,0,759,760,5,2,0,0,760,761,5,87,0,0,761,762,
        5,94,0,0,762,763,5,3,0,0,763,93,1,0,0,0,764,765,5,2,0,0,765,766,
        5,85,0,0,766,767,5,94,0,0,767,768,5,94,0,0,768,769,5,3,0,0,769,95,
        1,0,0,0,770,771,5,2,0,0,771,773,5,91,0,0,772,774,3,88,44,0,773,772,
        1,0,0,0,774,775,1,0,0,0,775,773,1,0,0,0,775,776,1,0,0,0,776,777,
        1,0,0,0,777,778,5,3,0,0,778,97,1,0,0,0,779,780,5,2,0,0,780,781,5,
        90,0,0,781,783,5,94,0,0,782,784,3,88,44,0,783,782,1,0,0,0,784,785,
        1,0,0,0,785,783,1,0,0,0,785,786,1,0,0,0,786,787,1,0,0,0,787,788,
        5,3,0,0,788,99,1,0,0,0,789,790,5,2,0,0,790,791,5,89,0,0,791,792,
        5,94,0,0,792,793,5,3,0,0,793,101,1,0,0,0,794,795,5,2,0,0,795,796,
        5,82,0,0,796,797,3,4,2,0,797,798,5,3,0,0,798,103,1,0,0,0,799,800,
        5,2,0,0,800,803,5,97,0,0,801,802,5,79,0,0,802,804,3,108,54,0,803,
        801,1,0,0,0,803,804,1,0,0,0,804,805,1,0,0,0,805,806,3,176,88,0,806,
        807,5,3,0,0,807,105,1,0,0,0,808,809,5,2,0,0,809,812,5,97,0,0,810,
        811,5,79,0,0,811,813,3,108,54,0,812,810,1,0,0,0,812,813,1,0,0,0,
        813,814,1,0,0,0,814,815,5,3,0,0,815,107,1,0,0,0,816,833,5,97,0,0,
        817,833,3,110,55,0,818,833,3,112,56,0,819,833,3,114,57,0,820,833,
        3,116,58,0,821,833,3,120,60,0,822,833,3,124,62,0,823,833,3,130,65,
        0,824,833,3,132,66,0,825,833,3,134,67,0,826,833,3,136,68,0,827,833,
        3,138,69,0,828,833,3,140,70,0,829,833,3,142,71,0,830,833,3,148,74,
        0,831,833,3,152,76,0,832,816,1,0,0,0,832,817,1,0,0,0,832,818,1,0,
        0,0,832,819,1,0,0,0,832,820,1,0,0,0,832,821,1,0,0,0,832,822,1,0,
        0,0,832,823,1,0,0,0,832,824,1,0,0,0,832,825,1,0,0,0,832,826,1,0,
        0,0,832,827,1,0,0,0,832,828,1,0,0,0,832,829,1,0,0,0,832,830,1,0,
        0,0,832,831,1,0,0,0,833,109,1,0,0,0,834,835,5,2,0,0,835,836,5,55,
        0,0,836,838,3,108,54,0,837,839,3,108,54,0,838,837,1,0,0,0,839,840,
        1,0,0,0,840,838,1,0,0,0,840,841,1,0,0,0,841,842,1,0,0,0,842,843,
        5,3,0,0,843,111,1,0,0,0,844,845,5,2,0,0,845,846,5,56,0,0,846,848,
        3,108,54,0,847,849,3,108,54,0,848,847,1,0,0,0,849,850,1,0,0,0,850,
        848,1,0,0,0,850,851,1,0,0,0,851,852,1,0,0,0,852,853,5,3,0,0,853,
        113,1,0,0,0,854,855,5,2,0,0,855,856,5,27,0,0,856,857,3,108,54,0,
        857,858,5,3,0,0,858,115,1,0,0,0,859,860,5,2,0,0,860,862,5,57,0,0,
        861,863,3,118,59,0,862,861,1,0,0,0,863,864,1,0,0,0,864,862,1,0,0,
        0,864,865,1,0,0,0,865,866,1,0,0,0,866,867,5,3,0,0,867,117,1,0,0,
        0,868,869,5,2,0,0,869,870,5,66,0,0,870,871,3,108,54,0,871,872,5,
        3,0,0,872,880,1,0,0,0,873,874,5,2,0,0,874,875,5,97,0,0,875,876,3,
        108,54,0,876,877,5,3,0,0,877,880,1,0,0,0,878,880,3,108,54,0,879,
        868,1,0,0,0,879,873,1,0,0,0,879,878,1,0,0,0,880,119,1,0,0,0,881,
        882,5,2,0,0,882,884,5,58,0,0,883,885,3,154,77,0,884,883,1,0,0,0,
        884,885,1,0,0,0,885,886,1,0,0,0,886,890,5,2,0,0,887,889,3,122,61,
        0,888,887,1,0,0,0,889,892,1,0,0,0,890,888,1,0,0,0,890,891,1,0,0,
        0,891,893,1,0,0,0,892,890,1,0,0,0,893,894,5,3,0,0,894,895,3,108,
        54,0,895,896,5,3,0,0,896,121,1,0,0,0,897,898,5,2,0,0,898,900,5,97,
        0,0,899,901,5,75,0,0,900,899,1,0,0,0,900,901,1,0,0,0,901,902,1,0,
        0,0,902,903,3,108,54,0,903,904,5,3,0,0,904,123,1,0,0,0,905,906,5,
        2,0,0,906,910,5,97,0,0,907,909,3,126,63,0,908,907,1,0,0,0,909,912,
        1,0,0,0,910,908,1,0,0,0,910,911,1,0,0,0,911,913,1,0,0,0,912,910,
        1,0,0,0,913,914,5,3,0,0,914,125,1,0,0,0,915,919,5,2,0,0,916,918,
        3,128,64,0,917,916,1,0,0,0,918,921,1,0,0,0,919,917,1,0,0,0,919,920,
        1,0,0,0,920,922,1,0,0,0,921,919,1,0,0,0,922,924,5,97,0,0,923,925,
        5,75,0,0,924,923,1,0,0,0,924,925,1,0,0,0,925,926,1,0,0,0,926,927,
        3,108,54,0,927,928,5,3,0,0,928,127,1,0,0,0,929,930,5,67,0,0,930,
        129,1,0,0,0,931,932,5,2,0,0,932,933,5,59,0,0,933,934,7,0,0,0,934,
        935,5,3,0,0,935,131,1,0,0,0,936,937,5,2,0,0,937,938,5,60,0,0,938,
        939,3,108,54,0,939,940,5,3,0,0,940,133,1,0,0,0,941,942,5,2,0,0,942,
        943,5,61,0,0,943,944,5,97,0,0,944,945,5,3,0,0,945,135,1,0,0,0,946,
        947,5,2,0,0,947,948,5,30,0,0,948,949,3,108,54,0,949,950,3,108,54,
        0,950,951,5,3,0,0,951,137,1,0,0,0,952,953,5,2,0,0,953,954,5,25,0,
        0,954,955,3,108,54,0,955,956,3,108,54,0,956,957,3,108,54,0,957,958,
        3,108,54,0,958,959,5,3,0,0,959,139,1,0,0,0,960,961,5,2,0,0,961,962,
        5,63,0,0,962,963,5,97,0,0,963,964,5,3,0,0,964,141,1,0,0,0,965,966,
        5,2,0,0,966,967,5,64,0,0,967,968,5,97,0,0,968,970,3,108,54,0,969,
        971,3,144,72,0,970,969,1,0,0,0,970,971,1,0,0,0,971,972,1,0,0,0,972,
        973,3,108,54,0,973,974,5,3,0,0,974,143,1,0,0,0,975,976,5,2,0,0,976,
        978,5,74,0,0,977,979,3,146,73,0,978,977,1,0,0,0,979,980,1,0,0,0,
        980,978,1,0,0,0,980,981,1,0,0,0,981,982,1,0,0,0,982,983,5,3,0,0,
        983,145,1,0,0,0,984,985,7,1,0,0,985,147,1,0,0,0,986,987,5,2,0,0,
        987,989,5,65,0,0,988,990,3,150,75,0,989,988,1,0,0,0,990,991,1,0,
        0,0,991,989,1,0,0,0,991,992,1,0,0,0,992,993,1,0,0,0,993,994,5,3,
        0,0,994,149,1,0,0,0,995,998,5,94,0,0,996,998,3,108,54,0,997,995,
        1,0,0,0,997,996,1,0,0,0,998,151,1,0,0,0,999,1000,5,2,0,0,1000,1002,
        3,108,54,0,1001,1003,3,108,54,0,1002,1001,1,0,0,0,1003,1004,1,0,
        0,0,1004,1002,1,0,0,0,1004,1005,1,0,0,0,1005,1006,1,0,0,0,1006,1007,
        5,3,0,0,1007,153,1,0,0,0,1008,1009,5,2,0,0,1009,1011,5,68,0,0,1010,
        1012,3,156,78,0,1011,1010,1,0,0,0,1012,1013,1,0,0,0,1013,1011,1,
        0,0,0,1013,1014,1,0,0,0,1014,1015,1,0,0,0,1015,1016,5,3,0,0,1016,
        155,1,0,0,0,1017,1028,5,97,0,0,1018,1019,5,2,0,0,1019,1021,5,97,
        0,0,1020,1022,3,158,79,0,1021,1020,1,0,0,0,1021,1022,1,0,0,0,1022,
        1024,1,0,0,0,1023,1025,3,160,80,0,1024,1023,1,0,0,0,1024,1025,1,
        0,0,0,1025,1026,1,0,0,0,1026,1028,5,3,0,0,1027,1017,1,0,0,0,1027,
        1018,1,0,0,0,1028,157,1,0,0,0,1029,1030,5,2,0,0,1030,1031,5,70,0,
        0,1031,1032,3,108,54,0,1032,1033,5,3,0,0,1033,159,1,0,0,0,1034,1035,
        5,2,0,0,1035,1036,5,40,0,0,1036,1037,3,108,54,0,1037,1038,5,3,0,
        0,1038,161,1,0,0,0,1039,1040,5,2,0,0,1040,1041,5,23,0,0,1041,1042,
        5,97,0,0,1042,1043,3,176,88,0,1043,1044,5,3,0,0,1044,1052,1,0,0,
        0,1045,1046,5,2,0,0,1046,1047,5,23,0,0,1047,1048,3,214,107,0,1048,
        1049,3,176,88,0,1049,1050,5,3,0,0,1050,1052,1,0,0,0,1051,1039,1,
        0,0,0,1051,1045,1,0,0,0,1052,163,1,0,0,0,1053,1054,5,2,0,0,1054,
        1055,5,38,0,0,1055,1059,3,176,88,0,1056,1058,3,166,83,0,1057,1056,
        1,0,0,0,1058,1061,1,0,0,0,1059,1057,1,0,0,0,1059,1060,1,0,0,0,1060,
        1063,1,0,0,0,1061,1059,1,0,0,0,1062,1064,3,168,84,0,1063,1062,1,
        0,0,0,1063,1064,1,0,0,0,1064,1065,1,0,0,0,1065,1066,5,3,0,0,1066,
        165,1,0,0,0,1067,1068,5,2,0,0,1068,1069,5,39,0,0,1069,1073,3,176,
        88,0,1070,1072,3,52,26,0,1071,1070,1,0,0,0,1072,1075,1,0,0,0,1073,
        1071,1,0,0,0,1073,1074,1,0,0,0,1074,1076,1,0,0,0,1075,1073,1,0,0,
        0,1076,1077,5,3,0,0,1077,167,1,0,0,0,1078,1079,5,2,0,0,1079,1083,
        5,40,0,0,1080,1082,3,52,26,0,1081,1080,1,0,0,0,1082,1085,1,0,0,0,
        1083,1081,1,0,0,0,1083,1084,1,0,0,0,1084,1086,1,0,0,0,1085,1083,
        1,0,0,0,1086,1087,5,3,0,0,1087,169,1,0,0,0,1088,1089,5,2,0,0,1089,
        1090,5,43,0,0,1090,1091,3,56,28,0,1091,1092,3,176,88,0,1092,1096,
        3,162,81,0,1093,1095,3,52,26,0,1094,1093,1,0,0,0,1095,1098,1,0,0,
        0,1096,1094,1,0,0,0,1096,1097,1,0,0,0,1097,1099,1,0,0,0,1098,1096,
        1,0,0,0,1099,1100,5,3,0,0,1100,171,1,0,0,0,1101,1102,5,2,0,0,1102,
        1103,5,41,0,0,1103,1104,5,97,0,0,1104,1108,3,176,88,0,1105,1107,
        3,52,26,0,1106,1105,1,0,0,0,1107,1110,1,0,0,0,1108,1106,1,0,0,0,
        1108,1109,1,0,0,0,1109,1111,1,0,0,0,1110,1108,1,0,0,0,1111,1112,
        5,3,0,0,1112,173,1,0,0,0,1113,1114,5,2,0,0,1114,1115,5,42,0,0,1115,
        1116,5,97,0,0,1116,1120,3,176,88,0,1117,1119,3,52,26,0,1118,1117,
        1,0,0,0,1119,1122,1,0,0,0,1120,1118,1,0,0,0,1120,1121,1,0,0,0,1121,
        1123,1,0,0,0,1122,1120,1,0,0,0,1123,1124,5,3,0,0,1124,175,1,0,0,
        0,1125,1152,3,236,118,0,1126,1152,5,92,0,0,1127,1152,5,97,0,0,1128,
        1152,3,190,95,0,1129,1152,3,192,96,0,1130,1152,3,194,97,0,1131,1152,
        3,196,98,0,1132,1152,3,204,102,0,1133,1152,3,210,105,0,1134,1152,
        3,214,107,0,1135,1152,3,216,108,0,1136,1152,3,218,109,0,1137,1152,
        3,220,110,0,1138,1152,3,222,111,0,1139,1152,3,198,99,0,1140,1152,
        3,200,100,0,1141,1152,3,202,101,0,1142,1152,3,224,112,0,1143,1152,
        3,226,113,0,1144,1152,3,186,93,0,1145,1152,3,188,94,0,1146,1152,
        3,178,89,0,1147,1152,3,180,90,0,1148,1152,3,182,91,0,1149,1152,3,
        184,92,0,1150,1152,3,228,114,0,1151,1125,1,0,0,0,1151,1126,1,0,0,
        0,1151,1127,1,0,0,0,1151,1128,1,0,0,0,1151,1129,1,0,0,0,1151,1130,
        1,0,0,0,1151,1131,1,0,0,0,1151,1132,1,0,0,0,1151,1133,1,0,0,0,1151,
        1134,1,0,0,0,1151,1135,1,0,0,0,1151,1136,1,0,0,0,1151,1137,1,0,0,
        0,1151,1138,1,0,0,0,1151,1139,1,0,0,0,1151,1140,1,0,0,0,1151,1141,
        1,0,0,0,1151,1142,1,0,0,0,1151,1143,1,0,0,0,1151,1144,1,0,0,0,1151,
        1145,1,0,0,0,1151,1146,1,0,0,0,1151,1147,1,0,0,0,1151,1148,1,0,0,
        0,1151,1149,1,0,0,0,1151,1150,1,0,0,0,1152,177,1,0,0,0,1153,1154,
        5,50,0,0,1154,179,1,0,0,0,1155,1156,5,51,0,0,1156,181,1,0,0,0,1157,
        1158,5,2,0,0,1158,1162,5,51,0,0,1159,1161,3,176,88,0,1160,1159,1,
        0,0,0,1161,1164,1,0,0,0,1162,1160,1,0,0,0,1162,1163,1,0,0,0,1163,
        1165,1,0,0,0,1164,1162,1,0,0,0,1165,1166,5,3,0,0,1166,183,1,0,0,
        0,1167,1168,5,2,0,0,1168,1169,5,45,0,0,1169,1173,5,97,0,0,1170,1172,
        3,176,88,0,1171,1170,1,0,0,0,1172,1175,1,0,0,0,1173,1171,1,0,0,0,
        1173,1174,1,0,0,0,1174,1176,1,0,0,0,1175,1173,1,0,0,0,1176,1177,
        5,3,0,0,1177,185,1,0,0,0,1178,1179,5,2,0,0,1179,1180,5,61,0,0,1180,
        1181,3,176,88,0,1181,1182,5,3,0,0,1182,187,1,0,0,0,1183,1184,5,2,
        0,0,1184,1185,5,62,0,0,1185,1186,3,176,88,0,1186,1187,3,108,54,0,
        1187,1188,5,3,0,0,1188,189,1,0,0,0,1189,1190,5,2,0,0,1190,1191,5,
        10,0,0,1191,1195,3,232,116,0,1192,1194,3,52,26,0,1193,1192,1,0,0,
        0,1194,1197,1,0,0,0,1195,1193,1,0,0,0,1195,1196,1,0,0,0,1196,1198,
        1,0,0,0,1197,1195,1,0,0,0,1198,1199,5,3,0,0,1199,191,1,0,0,0,1200,
        1201,5,2,0,0,1201,1202,5,11,0,0,1202,1206,3,232,116,0,1203,1205,
        3,52,26,0,1204,1203,1,0,0,0,1205,1208,1,0,0,0,1206,1204,1,0,0,0,
        1206,1207,1,0,0,0,1207,1209,1,0,0,0,1208,1206,1,0,0,0,1209,1210,
        5,3,0,0,1210,193,1,0,0,0,1211,1212,5,2,0,0,1212,1213,5,13,0,0,1213,
        1214,3,176,88,0,1214,1218,3,176,88,0,1215,1217,3,176,88,0,1216,1215,
        1,0,0,0,1217,1220,1,0,0,0,1218,1216,1,0,0,0,1218,1219,1,0,0,0,1219,
        1221,1,0,0,0,1220,1218,1,0,0,0,1221,1222,5,3,0,0,1222,195,1,0,0,
        0,1223,1224,5,2,0,0,1224,1225,5,14,0,0,1225,1226,3,176,88,0,1226,
        1230,3,176,88,0,1227,1229,3,176,88,0,1228,1227,1,0,0,0,1229,1232,
        1,0,0,0,1230,1228,1,0,0,0,1230,1231,1,0,0,0,1231,1233,1,0,0,0,1232,
        1230,1,0,0,0,1233,1234,5,3,0,0,1234,197,1,0,0,0,1235,1236,5,2,0,
        0,1236,1237,5,24,0,0,1237,1238,3,176,88,0,1238,1239,3,176,88,0,1239,
        1240,3,176,88,0,1240,1241,5,3,0,0,1241,199,1,0,0,0,1242,1243,5,2,
        0,0,1243,1247,5,25,0,0,1244,1245,3,176,88,0,1245,1246,3,176,88,0,
        1246,1248,1,0,0,0,1247,1244,1,0,0,0,1248,1249,1,0,0,0,1249,1247,
        1,0,0,0,1249,1250,1,0,0,0,1250,1251,1,0,0,0,1251,1252,5,3,0,0,1252,
        201,1,0,0,0,1253,1254,5,2,0,0,1254,1255,5,36,0,0,1255,1257,5,97,
        0,0,1256,1258,3,230,115,0,1257,1256,1,0,0,0,1257,1258,1,0,0,0,1258,
        1262,1,0,0,0,1259,1261,3,176,88,0,1260,1259,1,0,0,0,1261,1264,1,
        0,0,0,1262,1260,1,0,0,0,1262,1263,1,0,0,0,1263,1265,1,0,0,0,1264,
        1262,1,0,0,0,1265,1266,5,3,0,0,1266,203,1,0,0,0,1267,1268,5,2,0,
        0,1268,1272,5,26,0,0,1269,1271,3,206,103,0,1270,1269,1,0,0,0,1271,
        1274,1,0,0,0,1272,1270,1,0,0,0,1272,1273,1,0,0,0,1273,1275,1,0,0,
        0,1274,1272,1,0,0,0,1275,1276,5,3,0,0,1276,205,1,0,0,0,1277,1278,
        5,2,0,0,1278,1279,3,212,106,0,1279,1280,3,176,88,0,1280,1281,5,3,
        0,0,1281,1291,1,0,0,0,1282,1283,5,2,0,0,1283,1284,3,212,106,0,1284,
        1285,3,208,104,0,1285,1286,5,3,0,0,1286,1291,1,0,0,0,1287,1288,5,
        2,0,0,1288,1289,5,97,0,0,1289,1291,5,3,0,0,1290,1277,1,0,0,0,1290,
        1282,1,0,0,0,1290,1287,1,0,0,0,1291,207,1,0,0,0,1292,1293,5,2,0,
        0,1293,1294,5,12,0,0,1294,1298,3,232,116,0,1295,1297,3,52,26,0,1296,
        1295,1,0,0,0,1297,1300,1,0,0,0,1298,1296,1,0,0,0,1298,1299,1,0,0,
        0,1299,1301,1,0,0,0,1300,1298,1,0,0,0,1301,1302,5,3,0,0,1302,209,
        1,0,0,0,1303,1304,5,2,0,0,1304,1308,5,27,0,0,1305,1307,3,176,88,
        0,1306,1305,1,0,0,0,1307,1310,1,0,0,0,1308,1306,1,0,0,0,1308,1309,
        1,0,0,0,1309,1311,1,0,0,0,1310,1308,1,0,0,0,1311,1312,5,3,0,0,1312,
        211,1,0,0,0,1313,1314,7,2,0,0,1314,213,1,0,0,0,1315,1316,5,2,0,0,
        1316,1317,5,29,0,0,1317,1318,3,176,88,0,1318,1319,3,212,106,0,1319,
        1320,5,3,0,0,1320,215,1,0,0,0,1321,1322,5,2,0,0,1322,1323,5,30,0,
        0,1323,1324,3,176,88,0,1324,1325,3,176,88,0,1325,1326,5,3,0,0,1326,
        217,1,0,0,0,1327,1328,5,2,0,0,1328,1329,7,3,0,0,1329,1330,3,176,
        88,0,1330,1331,5,3,0,0,1331,219,1,0,0,0,1332,1333,5,2,0,0,1333,1334,
        5,35,0,0,1334,1335,3,176,88,0,1335,1336,5,3,0,0,1336,221,1,0,0,0,
        1337,1338,5,2,0,0,1338,1339,5,34,0,0,1339,1340,3,176,88,0,1340,1341,
        5,3,0,0,1341,223,1,0,0,0,1342,1343,5,2,0,0,1343,1344,5,28,0,0,1344,
        1345,3,176,88,0,1345,1346,3,212,106,0,1346,1347,5,3,0,0,1347,225,
        1,0,0,0,1348,1349,5,2,0,0,1349,1350,5,31,0,0,1350,1351,3,176,88,
        0,1351,1352,3,176,88,0,1352,1353,5,3,0,0,1353,227,1,0,0,0,1354,1355,
        5,2,0,0,1355,1357,3,176,88,0,1356,1358,3,230,115,0,1357,1356,1,0,
        0,0,1357,1358,1,0,0,0,1358,1362,1,0,0,0,1359,1361,3,176,88,0,1360,
        1359,1,0,0,0,1361,1364,1,0,0,0,1362,1360,1,0,0,0,1362,1363,1,0,0,
        0,1363,1365,1,0,0,0,1364,1362,1,0,0,0,1365,1366,5,3,0,0,1366,229,
        1,0,0,0,1367,1368,5,2,0,0,1368,1370,5,69,0,0,1369,1371,3,108,54,
        0,1370,1369,1,0,0,0,1371,1372,1,0,0,0,1372,1370,1,0,0,0,1372,1373,
        1,0,0,0,1373,1374,1,0,0,0,1374,1375,5,3,0,0,1375,231,1,0,0,0,1376,
        1387,5,2,0,0,1377,1384,3,234,117,0,1378,1380,5,4,0,0,1379,1378,1,
        0,0,0,1379,1380,1,0,0,0,1380,1381,1,0,0,0,1381,1383,3,234,117,0,
        1382,1379,1,0,0,0,1383,1386,1,0,0,0,1384,1382,1,0,0,0,1384,1385,
        1,0,0,0,1385,1388,1,0,0,0,1386,1384,1,0,0,0,1387,1377,1,0,0,0,1387,
        1388,1,0,0,0,1388,1389,1,0,0,0,1389,1390,5,3,0,0,1390,233,1,0,0,
        0,1391,1392,5,2,0,0,1392,1393,5,97,0,0,1393,1394,5,3,0,0,1394,235,
        1,0,0,0,1395,1396,7,4,0,0,1396,237,1,0,0,0,105,243,258,266,275,295,
        319,328,331,341,350,355,358,361,371,375,378,393,402,413,422,428,
        431,441,451,459,469,481,489,499,507,515,519,526,531,534,542,562,
        570,577,594,601,617,627,637,645,657,673,682,693,731,738,745,755,
        775,785,803,812,832,840,850,864,879,884,890,900,910,919,924,970,
        980,991,997,1004,1013,1021,1024,1027,1051,1059,1063,1073,1083,1096,
        1108,1120,1151,1162,1173,1195,1206,1218,1230,1249,1257,1262,1272,
        1290,1298,1308,1357,1362,1372,1379,1384,1387
    ];

    private static __ATN: antlr.ATN;
    public static get _ATN(): antlr.ATN {
        if (!Stage4Parser.__ATN) {
            Stage4Parser.__ATN = new antlr.ATNDeserializer().deserialize(Stage4Parser._serializedATN);
        }

        return Stage4Parser.__ATN;
    }


    private static readonly vocabulary = new antlr.Vocabulary(Stage4Parser.literalNames, Stage4Parser.symbolicNames, []);

    public override get vocabulary(): antlr.Vocabulary {
        return Stage4Parser.vocabulary;
    }

    private static readonly decisionsToDFA = Stage4Parser._ATN.decisionToState.map( (ds: antlr.DecisionState, index: number) => new antlr.DFA(ds, index) );
}

export class ProgramContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public PROGRAM(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.PROGRAM, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.RPAREN, 0)!;
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
        return Stage4Parser.RULE_program;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterProgram) {
             listener.enterProgram(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
    public def(): DefContext | null {
        return this.getRuleContext(0, DefContext);
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
        return Stage4Parser.RULE_topLevel;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterTopLevel) {
             listener.enterTopLevel(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
        if(listener.exitTopLevel) {
             listener.exitTopLevel(this);
        }
    }
}


export class DeclContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public def(): DefContext | null {
        return this.getRuleContext(0, DefContext);
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
        return Stage4Parser.RULE_decl;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterDecl) {
             listener.enterDecl(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public DEFMACRO(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.DEFMACRO, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.IDENTIFIER, 0)!;
    }
    public fnSignature(): FnSignatureContext {
        return this.getRuleContext(0, FnSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.RPAREN, 0)!;
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
        return Stage4Parser.RULE_defmacro;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterDefmacro) {
             listener.enterDefmacro(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public MACRO_TIME_ATTR(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.MACRO_TIME_ATTR, 0)!;
    }
    public def(): DefContext | null {
        return this.getRuleContext(0, DefContext);
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.RPAREN, 0)!;
    }
    public topLevelLet(): TopLevelLetContext | null {
        return this.getRuleContext(0, TopLevelLetContext);
    }
    public topLevelConst(): TopLevelConstContext | null {
        return this.getRuleContext(0, TopLevelConstContext);
    }
    public override get ruleIndex(): number {
        return Stage4Parser.RULE_macroTimeFnDef;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterMacroTimeFnDef) {
             listener.enterMacroTimeFnDef(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
        if(listener.exitMacroTimeFnDef) {
             listener.exitMacroTimeFnDef(this);
        }
    }
}


export class DefContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public DEF(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.DEF, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.IDENTIFIER, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage4Parser.RULE_def;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterDef) {
             listener.enterDef(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
        if(listener.exitDef) {
             listener.exitDef(this);
        }
    }
}


export class TopLevelLetContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public LET(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.LET, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.IDENTIFIER, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage4Parser.RULE_topLevelLet;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterTopLevelLet) {
             listener.enterTopLevelLet(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public CONST(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.CONST, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.IDENTIFIER, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage4Parser.RULE_topLevelConst;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterTopLevelConst) {
             listener.enterTopLevelConst(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
        if(listener.exitTopLevelConst) {
             listener.exitTopLevelConst(this);
        }
    }
}


export class TypeAliasContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public TYPE(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.TYPE, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.IDENTIFIER, 0)!;
    }
    public typeExpr(): TypeExprContext {
        return this.getRuleContext(0, TypeExprContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.RPAREN, 0)!;
    }
    public typeParams(): TypeParamsContext | null {
        return this.getRuleContext(0, TypeParamsContext);
    }
    public override get ruleIndex(): number {
        return Stage4Parser.RULE_typeAlias;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterTypeAlias) {
             listener.enterTypeAlias(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public INTERFACE(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.INTERFACE, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.IDENTIFIER, 0)!;
    }
    public typeObject(): TypeObjectContext {
        return this.getRuleContext(0, TypeObjectContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.RPAREN, 0)!;
    }
    public typeParams(): TypeParamsContext | null {
        return this.getRuleContext(0, TypeParamsContext);
    }
    public interfaceExtends(): InterfaceExtendsContext | null {
        return this.getRuleContext(0, InterfaceExtendsContext);
    }
    public override get ruleIndex(): number {
        return Stage4Parser.RULE_interfaceDef;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterInterfaceDef) {
             listener.enterInterfaceDef(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public EXTENDS(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.EXTENDS, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.RPAREN, 0)!;
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
        return Stage4Parser.RULE_interfaceExtends;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterInterfaceExtends) {
             listener.enterInterfaceExtends(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public CLASS(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.CLASS, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.IDENTIFIER, 0)!;
    }
    public classBody(): ClassBodyContext {
        return this.getRuleContext(0, ClassBodyContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.RPAREN, 0)!;
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
        return Stage4Parser.RULE_classDef;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterClassDef) {
             listener.enterClassDef(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public CLASS(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.CLASS, 0)!;
    }
    public classBody(): ClassBodyContext {
        return this.getRuleContext(0, ClassBodyContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.RPAREN, 0)!;
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
        return Stage4Parser.RULE_anonClassDef;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterAnonClassDef) {
             listener.enterAnonClassDef(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public EXTENDS(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.EXTENDS, 0)!;
    }
    public typeExpr(): TypeExprContext {
        return this.getRuleContext(0, TypeExprContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage4Parser.RULE_classExtends;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterClassExtends) {
             listener.enterClassExtends(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public IMPLEMENTS(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.IMPLEMENTS, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.RPAREN, 0)!;
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
        return Stage4Parser.RULE_classImplements;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterClassImplements) {
             listener.enterClassImplements(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public CLASS_BODY(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.CLASS_BODY, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.RPAREN, 0)!;
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
        return Stage4Parser.RULE_classBody;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterClassBody) {
             listener.enterClassBody(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return Stage4Parser.RULE_classElement;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterClassElement) {
             listener.enterClassElement(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.KEYWORD, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage4Parser.RULE_modifier;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterModifier) {
             listener.enterModifier(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public FIELD(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.FIELD, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.RPAREN, 0)!;
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
        return this.getToken(Stage4Parser.COLON, 0);
    }
    public typeExpr(): TypeExprContext | null {
        return this.getRuleContext(0, TypeExprContext);
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public override get ruleIndex(): number {
        return Stage4Parser.RULE_fieldDef;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterFieldDef) {
             listener.enterFieldDef(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public CONSTRUCTOR(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.CONSTRUCTOR, 0)!;
    }
    public fnSignatureTyped(): FnSignatureTypedContext {
        return this.getRuleContext(0, FnSignatureTypedContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.RPAREN, 0)!;
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
        return Stage4Parser.RULE_constructorDef;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterConstructorDef) {
             listener.enterConstructorDef(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public METHOD(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.METHOD, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.IDENTIFIER, 0)!;
    }
    public fnSignatureTyped(): FnSignatureTypedContext {
        return this.getRuleContext(0, FnSignatureTypedContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.RPAREN, 0)!;
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
        return Stage4Parser.RULE_classMethodDef;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterClassMethodDef) {
             listener.enterClassMethodDef(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public ABSTRACT_METHOD(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.ABSTRACT_METHOD, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.IDENTIFIER, 0)!;
    }
    public fnSignatureTyped(): FnSignatureTypedContext {
        return this.getRuleContext(0, FnSignatureTypedContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.RPAREN, 0)!;
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
        return Stage4Parser.RULE_abstractMethodDef;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterAbstractMethodDef) {
             listener.enterAbstractMethodDef(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public GET(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.GET, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.IDENTIFIER, 0)!;
    }
    public fnSignatureTyped(): FnSignatureTypedContext {
        return this.getRuleContext(0, FnSignatureTypedContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.RPAREN, 0)!;
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
        return Stage4Parser.RULE_getterDef;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterGetterDef) {
             listener.enterGetterDef(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public SETPROP(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.SETPROP, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.IDENTIFIER, 0)!;
    }
    public fnSignatureTyped(): FnSignatureTypedContext {
        return this.getRuleContext(0, FnSignatureTypedContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.RPAREN, 0)!;
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
        return Stage4Parser.RULE_setterDef;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterSetterDef) {
             listener.enterSetterDef(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.RPAREN, 0)!;
    }
    public OPTIONAL(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.OPTIONAL, 0);
    }
    public COLON(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.COLON, 0);
    }
    public typeExpr(): TypeExprContext | null {
        return this.getRuleContext(0, TypeExprContext);
    }
    public override get ruleIndex(): number {
        return Stage4Parser.RULE_typedParam;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterTypedParam) {
             listener.enterTypedParam(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
    		return this.getTokens(Stage4Parser.LPAREN);
    	} else {
    		return this.getToken(Stage4Parser.LPAREN, i);
    	}
    }
    public RPAREN(): antlr.TerminalNode[];
    public RPAREN(i: number): antlr.TerminalNode | null;
    public RPAREN(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage4Parser.RPAREN);
    	} else {
    		return this.getToken(Stage4Parser.RPAREN, i);
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
        return this.getToken(Stage4Parser.RETURNS, 0);
    }
    public typeExpr(): TypeExprContext | null {
        return this.getRuleContext(0, TypeExprContext);
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage4Parser.COMMA);
    	} else {
    		return this.getToken(Stage4Parser.COMMA, i);
    	}
    }
    public override get ruleIndex(): number {
        return Stage4Parser.RULE_fnSignatureTyped;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterFnSignatureTyped) {
             listener.enterFnSignatureTyped(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return Stage4Parser.RULE_statement;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterStatement) {
             listener.enterStatement(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
    		return this.getTokens(Stage4Parser.LPAREN);
    	} else {
    		return this.getToken(Stage4Parser.LPAREN, i);
    	}
    }
    public LETSTAR(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.LETSTAR, 0)!;
    }
    public RPAREN(): antlr.TerminalNode[];
    public RPAREN(i: number): antlr.TerminalNode | null;
    public RPAREN(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage4Parser.RPAREN);
    	} else {
    		return this.getToken(Stage4Parser.RPAREN, i);
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
        return Stage4Parser.RULE_letStar;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterLetStar) {
             listener.enterLetStar(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public LET(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.LET, 0)!;
    }
    public singleBinding(): SingleBindingContext {
        return this.getRuleContext(0, SingleBindingContext)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage4Parser.RULE_letStmt;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterLetStmt) {
             listener.enterLetStmt(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
    		return this.getTokens(Stage4Parser.LPAREN);
    	} else {
    		return this.getToken(Stage4Parser.LPAREN, i);
    	}
    }
    public CONSTSTAR(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.CONSTSTAR, 0)!;
    }
    public RPAREN(): antlr.TerminalNode[];
    public RPAREN(i: number): antlr.TerminalNode | null;
    public RPAREN(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage4Parser.RPAREN);
    	} else {
    		return this.getToken(Stage4Parser.RPAREN, i);
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
        return Stage4Parser.RULE_constStar;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterConstStar) {
             listener.enterConstStar(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public CONST(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.CONST, 0)!;
    }
    public singleBinding(): SingleBindingContext {
        return this.getRuleContext(0, SingleBindingContext)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage4Parser.RULE_constStmt;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterConstStmt) {
             listener.enterConstStmt(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public IF(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.IF, 0)!;
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
        return this.getToken(Stage4Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage4Parser.RULE_ifForm;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterIfForm) {
             listener.enterIfForm(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public WHILE(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.WHILE, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.RPAREN, 0)!;
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
        return Stage4Parser.RULE_whileForm;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterWhileForm) {
             listener.enterWhileForm(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public BEGIN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.BEGIN, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.RPAREN, 0)!;
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
        return Stage4Parser.RULE_block;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterBlock) {
             listener.enterBlock(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public RETURN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.RETURN, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.RPAREN, 0)!;
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public override get ruleIndex(): number {
        return Stage4Parser.RULE_returnForm;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterReturnForm) {
             listener.enterReturnForm(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public THROW(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.THROW, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage4Parser.RULE_throwForm;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterThrowForm) {
             listener.enterThrowForm(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public IMPORT(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.IMPORT, 0)!;
    }
    public STRING(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.STRING, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.RPAREN, 0)!;
    }
    public objectExpr(): ObjectExprContext | null {
        return this.getRuleContext(0, ObjectExprContext);
    }
    public override get ruleIndex(): number {
        return Stage4Parser.RULE_importForm;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterImportForm) {
             listener.enterImportForm(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public IMPORT_TYPE(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.IMPORT_TYPE, 0)!;
    }
    public importTypeSpec(): ImportTypeSpecContext {
        return this.getRuleContext(0, ImportTypeSpecContext)!;
    }
    public STRING(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.STRING, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage4Parser.RULE_importTypeForm;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterImportTypeForm) {
             listener.enterImportTypeForm(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.RPAREN, 0)!;
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
        return Stage4Parser.RULE_importTypeSpec;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterImportTypeSpec) {
             listener.enterImportTypeSpec(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
    		return this.getTokens(Stage4Parser.IDENTIFIER);
    	} else {
    		return this.getToken(Stage4Parser.IDENTIFIER, i);
    	}
    }
    public LPAREN(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.LPAREN, 0);
    }
    public RPAREN(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.RPAREN, 0);
    }
    public override get ruleIndex(): number {
        return Stage4Parser.RULE_importTypeName;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterImportTypeName) {
             listener.enterImportTypeName(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return Stage4Parser.RULE_exportForm;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterExportForm) {
             listener.enterExportForm(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public EXPORT(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.EXPORT, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.IDENTIFIER, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage4Parser.RULE_exportBinding;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterExportBinding) {
             listener.enterExportBinding(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public EXPORT_DEFAULT(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.EXPORT_DEFAULT, 0)!;
    }
    public classDef(): ClassDefContext | null {
        return this.getRuleContext(0, ClassDefContext);
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.RPAREN, 0)!;
    }
    public anonClassDef(): AnonClassDefContext | null {
        return this.getRuleContext(0, AnonClassDefContext);
    }
    public def(): DefContext | null {
        return this.getRuleContext(0, DefContext);
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
        return Stage4Parser.RULE_exportDefault;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterExportDefault) {
             listener.enterExportDefault(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public EXPORT_NAMED(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.EXPORT_NAMED, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.RPAREN, 0)!;
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
        return Stage4Parser.RULE_exportNamed;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterExportNamed) {
             listener.enterExportNamed(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode[];
    public IDENTIFIER(i: number): antlr.TerminalNode | null;
    public IDENTIFIER(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage4Parser.IDENTIFIER);
    	} else {
    		return this.getToken(Stage4Parser.IDENTIFIER, i);
    	}
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage4Parser.RULE_exportNamePair;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterExportNamePair) {
             listener.enterExportNamePair(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public EXPORT_FROM(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.EXPORT_FROM, 0)!;
    }
    public STRING(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.STRING, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.RPAREN, 0)!;
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
        return Stage4Parser.RULE_exportFrom;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterExportFrom) {
             listener.enterExportFrom(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public EXPORT_ALL_FROM(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.EXPORT_ALL_FROM, 0)!;
    }
    public STRING(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.STRING, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage4Parser.RULE_exportAllFrom;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterExportAllFrom) {
             listener.enterExportAllFrom(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public EXPORT_NS_FROM(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.EXPORT_NS_FROM, 0)!;
    }
    public STRING(): antlr.TerminalNode[];
    public STRING(i: number): antlr.TerminalNode | null;
    public STRING(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage4Parser.STRING);
    	} else {
    		return this.getToken(Stage4Parser.STRING, i);
    	}
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage4Parser.RULE_exportNsFromForm;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterExportNsFromForm) {
             listener.enterExportNsFromForm(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public EXPORT_TYPE(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.EXPORT_TYPE, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.RPAREN, 0)!;
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
        return Stage4Parser.RULE_exportTypeForm;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterExportTypeForm) {
             listener.enterExportTypeForm(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public EXPORT_TYPE_FROM(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.EXPORT_TYPE_FROM, 0)!;
    }
    public STRING(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.STRING, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.RPAREN, 0)!;
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
        return Stage4Parser.RULE_exportTypeFromForm;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterExportTypeFromForm) {
             listener.enterExportTypeFromForm(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public EXPORT_TYPE_ALL_FROM(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.EXPORT_TYPE_ALL_FROM, 0)!;
    }
    public STRING(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.STRING, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage4Parser.RULE_exportTypeAllFromForm;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterExportTypeAllFromForm) {
             listener.enterExportTypeAllFromForm(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public EXPORT(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.EXPORT, 0)!;
    }
    public decl(): DeclContext {
        return this.getRuleContext(0, DeclContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage4Parser.RULE_exportDeclForm;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterExportDeclForm) {
             listener.enterExportDeclForm(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.IDENTIFIER, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.RPAREN, 0)!;
    }
    public COLON(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.COLON, 0);
    }
    public typeExpr(): TypeExprContext | null {
        return this.getRuleContext(0, TypeExprContext);
    }
    public override get ruleIndex(): number {
        return Stage4Parser.RULE_starBinding;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterStarBinding) {
             listener.enterStarBinding(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.RPAREN, 0)!;
    }
    public COLON(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.COLON, 0);
    }
    public typeExpr(): TypeExprContext | null {
        return this.getRuleContext(0, TypeExprContext);
    }
    public override get ruleIndex(): number {
        return Stage4Parser.RULE_singleBinding;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterSingleBinding) {
             listener.enterSingleBinding(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.IDENTIFIER, 0);
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
        return Stage4Parser.RULE_typeExpr;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterTypeExpr) {
             listener.enterTypeExpr(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public UNION(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.UNION, 0)!;
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
        return this.getToken(Stage4Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage4Parser.RULE_typeUnion;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterTypeUnion) {
             listener.enterTypeUnion(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public INTERSECT(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.INTERSECT, 0)!;
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
        return this.getToken(Stage4Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage4Parser.RULE_typeIntersection;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterTypeIntersection) {
             listener.enterTypeIntersection(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public ARRAY(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.ARRAY, 0)!;
    }
    public typeExpr(): TypeExprContext {
        return this.getRuleContext(0, TypeExprContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage4Parser.RULE_typeArray;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterTypeArray) {
             listener.enterTypeArray(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public TUPLE(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.TUPLE, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.RPAREN, 0)!;
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
        return Stage4Parser.RULE_typeTuple;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterTypeTuple) {
             listener.enterTypeTuple(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.LPAREN, 0);
    }
    public REST(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.REST, 0);
    }
    public typeExpr(): TypeExprContext {
        return this.getRuleContext(0, TypeExprContext)!;
    }
    public RPAREN(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.RPAREN, 0);
    }
    public IDENTIFIER(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.IDENTIFIER, 0);
    }
    public override get ruleIndex(): number {
        return Stage4Parser.RULE_typeTupleElement;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterTypeTupleElement) {
             listener.enterTypeTupleElement(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
    		return this.getTokens(Stage4Parser.LPAREN);
    	} else {
    		return this.getToken(Stage4Parser.LPAREN, i);
    	}
    }
    public TYPEFN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.TYPEFN, 0)!;
    }
    public RPAREN(): antlr.TerminalNode[];
    public RPAREN(i: number): antlr.TerminalNode | null;
    public RPAREN(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage4Parser.RPAREN);
    	} else {
    		return this.getToken(Stage4Parser.RPAREN, i);
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
        return Stage4Parser.RULE_typeFunction;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterTypeFunction) {
             listener.enterTypeFunction(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.IDENTIFIER, 0)!;
    }
    public typeExpr(): TypeExprContext {
        return this.getRuleContext(0, TypeExprContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.RPAREN, 0)!;
    }
    public OPTIONAL(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.OPTIONAL, 0);
    }
    public override get ruleIndex(): number {
        return Stage4Parser.RULE_typeFnParam;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterTypeFnParam) {
             listener.enterTypeFnParam(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.RPAREN, 0)!;
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
        return Stage4Parser.RULE_typeObject;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterTypeObject) {
             listener.enterTypeObject(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.IDENTIFIER, 0)!;
    }
    public typeExpr(): TypeExprContext {
        return this.getRuleContext(0, TypeExprContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.RPAREN, 0)!;
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
        return this.getToken(Stage4Parser.OPTIONAL, 0);
    }
    public override get ruleIndex(): number {
        return Stage4Parser.RULE_typeProp;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterTypeProp) {
             listener.enterTypeProp(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.READONLY, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage4Parser.RULE_propModifier;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterPropModifier) {
             listener.enterPropModifier(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public LIT(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.LIT, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.RPAREN, 0)!;
    }
    public STRING(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.STRING, 0);
    }
    public BACKTICK_STRING(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.BACKTICK_STRING, 0);
    }
    public NUMBER(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.NUMBER, 0);
    }
    public BOOLEAN(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.BOOLEAN, 0);
    }
    public override get ruleIndex(): number {
        return Stage4Parser.RULE_typeLiteral;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterTypeLiteral) {
             listener.enterTypeLiteral(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public KEYOF(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.KEYOF, 0)!;
    }
    public typeExpr(): TypeExprContext {
        return this.getRuleContext(0, TypeExprContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage4Parser.RULE_typeKeyof;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterTypeKeyof) {
             listener.enterTypeKeyof(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public TYPEOF(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.TYPEOF, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage4Parser.RULE_typeTypeof;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterTypeTypeof) {
             listener.enterTypeTypeof(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public INDEX(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.INDEX, 0)!;
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
        return this.getToken(Stage4Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage4Parser.RULE_typeIndexAccess;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterTypeIndexAccess) {
             listener.enterTypeIndexAccess(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public COND(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.COND, 0)!;
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
        return this.getToken(Stage4Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage4Parser.RULE_typeConditional;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterTypeConditional) {
             listener.enterTypeConditional(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public INFER(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.INFER, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage4Parser.RULE_typeInfer;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterTypeInfer) {
             listener.enterTypeInfer(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public MAPPED(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.MAPPED, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.IDENTIFIER, 0)!;
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
        return this.getToken(Stage4Parser.RPAREN, 0)!;
    }
    public mappedModifiers(): MappedModifiersContext | null {
        return this.getRuleContext(0, MappedModifiersContext);
    }
    public override get ruleIndex(): number {
        return Stage4Parser.RULE_typeMapped;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterTypeMapped) {
             listener.enterTypeMapped(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public MODIFIERS(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.MODIFIERS, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.RPAREN, 0)!;
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
        return Stage4Parser.RULE_mappedModifiers;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterMappedModifiers) {
             listener.enterMappedModifiers(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.READONLY, 0);
    }
    public OPTIONAL(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.OPTIONAL, 0);
    }
    public override get ruleIndex(): number {
        return Stage4Parser.RULE_mappedModifier;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterMappedModifier) {
             listener.enterMappedModifier(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public TEMPLATE(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.TEMPLATE, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.RPAREN, 0)!;
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
        return Stage4Parser.RULE_typeTemplateLiteral;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterTypeTemplateLiteral) {
             listener.enterTypeTemplateLiteral(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.STRING, 0);
    }
    public typeExpr(): TypeExprContext | null {
        return this.getRuleContext(0, TypeExprContext);
    }
    public override get ruleIndex(): number {
        return Stage4Parser.RULE_templatePart;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterTemplatePart) {
             listener.enterTemplatePart(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.LPAREN, 0)!;
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
        return this.getToken(Stage4Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage4Parser.RULE_typeApplication;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterTypeApplication) {
             listener.enterTypeApplication(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public TYPE_PARAMS(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.TYPE_PARAMS, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.RPAREN, 0)!;
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
        return Stage4Parser.RULE_typeParams;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterTypeParams) {
             listener.enterTypeParams(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.IDENTIFIER, 0)!;
    }
    public LPAREN(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.LPAREN, 0);
    }
    public RPAREN(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.RPAREN, 0);
    }
    public typeParamConstraint(): TypeParamConstraintContext | null {
        return this.getRuleContext(0, TypeParamConstraintContext);
    }
    public typeParamDefault(): TypeParamDefaultContext | null {
        return this.getRuleContext(0, TypeParamDefaultContext);
    }
    public override get ruleIndex(): number {
        return Stage4Parser.RULE_typeParamDecl;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterTypeParamDecl) {
             listener.enterTypeParamDecl(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public EXTENDS(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.EXTENDS, 0)!;
    }
    public typeExpr(): TypeExprContext {
        return this.getRuleContext(0, TypeExprContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage4Parser.RULE_typeParamConstraint;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterTypeParamConstraint) {
             listener.enterTypeParamConstraint(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public DEFAULT(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.DEFAULT, 0)!;
    }
    public typeExpr(): TypeExprContext {
        return this.getRuleContext(0, TypeExprContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage4Parser.RULE_typeParamDefault;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterTypeParamDefault) {
             listener.enterTypeParamDefault(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public SET(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.SET, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.IDENTIFIER, 0);
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.RPAREN, 0)!;
    }
    public propAccess(): PropAccessContext | null {
        return this.getRuleContext(0, PropAccessContext);
    }
    public override get ruleIndex(): number {
        return Stage4Parser.RULE_assign;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterAssign) {
             listener.enterAssign(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public SWITCH(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.SWITCH, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.RPAREN, 0)!;
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
        return Stage4Parser.RULE_switchForm;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterSwitchForm) {
             listener.enterSwitchForm(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public CASE(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.CASE, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.RPAREN, 0)!;
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
        return Stage4Parser.RULE_caseClause;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterCaseClause) {
             listener.enterCaseClause(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public DEFAULT(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.DEFAULT, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.RPAREN, 0)!;
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
        return Stage4Parser.RULE_defaultClause;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterDefaultClause) {
             listener.enterDefaultClause(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public FOR(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.FOR, 0)!;
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
        return this.getToken(Stage4Parser.RPAREN, 0)!;
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
        return Stage4Parser.RULE_forForm;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterForForm) {
             listener.enterForForm(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public FORIN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.FORIN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.IDENTIFIER, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.RPAREN, 0)!;
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
        return Stage4Parser.RULE_forInForm;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterForInForm) {
             listener.enterForInForm(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public FOROF(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.FOROF, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.IDENTIFIER, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.RPAREN, 0)!;
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
        return Stage4Parser.RULE_forOfForm;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterForOfForm) {
             listener.enterForOfForm(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.KEYWORD, 0);
    }
    public IDENTIFIER(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.IDENTIFIER, 0);
    }
    public lambda(): LambdaContext | null {
        return this.getRuleContext(0, LambdaContext);
    }
    public fn(): FnContext | null {
        return this.getRuleContext(0, FnContext);
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
    public nullCoalesce(): NullCoalesceContext | null {
        return this.getRuleContext(0, NullCoalesceContext);
    }
    public typeofExpr(): TypeofExprContext | null {
        return this.getRuleContext(0, TypeofExprContext);
    }
    public typeAssert(): TypeAssertContext | null {
        return this.getRuleContext(0, TypeAssertContext);
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
        return Stage4Parser.RULE_expression;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterExpression) {
             listener.enterExpression(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.THIS, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage4Parser.RULE_thisExpr;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterThisExpr) {
             listener.enterThisExpr(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.SUPER, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage4Parser.RULE_superExpr;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterSuperExpr) {
             listener.enterSuperExpr(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public SUPER(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.SUPER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.RPAREN, 0)!;
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
        return Stage4Parser.RULE_superConstructorCall;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterSuperConstructorCall) {
             listener.enterSuperConstructorCall(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public SUPER_METHOD(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.SUPER_METHOD, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.RPAREN, 0)!;
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
        return Stage4Parser.RULE_superMethodCall;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterSuperMethodCall) {
             listener.enterSuperMethodCall(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public TYPEOF(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.TYPEOF, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage4Parser.RULE_typeofExpr;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterTypeofExpr) {
             listener.enterTypeofExpr(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public TYPE_AS(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.TYPE_AS, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public typeExpr(): TypeExprContext {
        return this.getRuleContext(0, TypeExprContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage4Parser.RULE_typeAssert;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterTypeAssert) {
             listener.enterTypeAssert(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public LAMBDA(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.LAMBDA, 0)!;
    }
    public fnSignature(): FnSignatureContext {
        return this.getRuleContext(0, FnSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.RPAREN, 0)!;
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
        return Stage4Parser.RULE_lambda;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterLambda) {
             listener.enterLambda(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public FN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.FN, 0)!;
    }
    public fnSignature(): FnSignatureContext {
        return this.getRuleContext(0, FnSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.RPAREN, 0)!;
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
        return Stage4Parser.RULE_fn;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterFn) {
             listener.enterFn(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
        if(listener.exitFn) {
             listener.exitFn(this);
        }
    }
}


export class BindExprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public BIND(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.BIND, 0)!;
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
        return this.getToken(Stage4Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage4Parser.RULE_bindExpr;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterBindExpr) {
             listener.enterBindExpr(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public METHOD_CALL(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.METHOD_CALL, 0)!;
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
        return this.getToken(Stage4Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage4Parser.RULE_methodCallExpr;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterMethodCallExpr) {
             listener.enterMethodCallExpr(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public TERNARY(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.TERNARY, 0)!;
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
        return this.getToken(Stage4Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage4Parser.RULE_ternary;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterTernary) {
             listener.enterTernary(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public COND(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.COND, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.RPAREN, 0)!;
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
        return Stage4Parser.RULE_condExpr;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterCondExpr) {
             listener.enterCondExpr(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public NEW(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.NEW, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.RPAREN, 0)!;
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
        return Stage4Parser.RULE_newForm;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterNewForm) {
             listener.enterNewForm(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public OBJECT(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.OBJECT, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.RPAREN, 0)!;
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
        return Stage4Parser.RULE_objectExpr;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterObjectExpr) {
             listener.enterObjectExpr(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public propKey(): PropKeyContext | null {
        return this.getRuleContext(0, PropKeyContext);
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.RPAREN, 0)!;
    }
    public methodDef(): MethodDefContext | null {
        return this.getRuleContext(0, MethodDefContext);
    }
    public IDENTIFIER(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.IDENTIFIER, 0);
    }
    public override get ruleIndex(): number {
        return Stage4Parser.RULE_objectField;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterObjectField) {
             listener.enterObjectField(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public METHOD(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.METHOD, 0)!;
    }
    public fnSignature(): FnSignatureContext {
        return this.getRuleContext(0, FnSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.RPAREN, 0)!;
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
        return Stage4Parser.RULE_methodDef;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterMethodDef) {
             listener.enterMethodDef(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public ARRAY(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.ARRAY, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.RPAREN, 0)!;
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
        return Stage4Parser.RULE_arrayExpr;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterArrayExpr) {
             listener.enterArrayExpr(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
        if(listener.exitArrayExpr) {
             listener.exitArrayExpr(this);
        }
    }
}


export class PropKeyContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public IDENTIFIER(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.IDENTIFIER, 0);
    }
    public KEYWORD(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.KEYWORD, 0);
    }
    public STRING(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.STRING, 0);
    }
    public BACKTICK_STRING(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.BACKTICK_STRING, 0);
    }
    public PROGRAM(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.PROGRAM, 0);
    }
    public LETSTAR(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.LETSTAR, 0);
    }
    public LET(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.LET, 0);
    }
    public CONSTSTAR(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.CONSTSTAR, 0);
    }
    public CONST(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.CONST, 0);
    }
    public LAMBDA(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.LAMBDA, 0);
    }
    public FN(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.FN, 0);
    }
    public METHOD(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.METHOD, 0);
    }
    public BIND(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.BIND, 0);
    }
    public METHOD_CALL(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.METHOD_CALL, 0);
    }
    public DEF(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.DEF, 0);
    }
    public DEFMACRO(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.DEFMACRO, 0);
    }
    public MACRO_TIME_ATTR(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.MACRO_TIME_ATTR, 0);
    }
    public IF(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.IF, 0);
    }
    public WHILE(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.WHILE, 0);
    }
    public BEGIN(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.BEGIN, 0);
    }
    public RETURN(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.RETURN, 0);
    }
    public THROW(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.THROW, 0);
    }
    public SET(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.SET, 0);
    }
    public TERNARY(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.TERNARY, 0);
    }
    public COND(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.COND, 0);
    }
    public OBJECT(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.OBJECT, 0);
    }
    public ARRAY(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.ARRAY, 0);
    }
    public INDEX(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.INDEX, 0);
    }
    public QUASI(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.QUASI, 0);
    }
    public QUOTE(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.QUOTE, 0);
    }
    public UNQUOTE_SPLICING(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.UNQUOTE_SPLICING, 0);
    }
    public UNQUOTE(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.UNQUOTE, 0);
    }
    public NEW(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.NEW, 0);
    }
    public IMPORT(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.IMPORT, 0);
    }
    public SWITCH(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.SWITCH, 0);
    }
    public CASE(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.CASE, 0);
    }
    public DEFAULT(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.DEFAULT, 0);
    }
    public FORIN(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.FORIN, 0);
    }
    public FOROF(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.FOROF, 0);
    }
    public FOR(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.FOR, 0);
    }
    public UNION(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.UNION, 0);
    }
    public INTERSECT(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.INTERSECT, 0);
    }
    public TUPLE(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.TUPLE, 0);
    }
    public TYPEFN(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.TYPEFN, 0);
    }
    public LIT(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.LIT, 0);
    }
    public KEYOF(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.KEYOF, 0);
    }
    public TYPEOF(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.TYPEOF, 0);
    }
    public INFER(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.INFER, 0);
    }
    public MAPPED(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.MAPPED, 0);
    }
    public TEMPLATE(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.TEMPLATE, 0);
    }
    public REST(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.REST, 0);
    }
    public READONLY(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.READONLY, 0);
    }
    public TYPE_AS(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.TYPE_AS, 0);
    }
    public TYPE_PARAMS(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.TYPE_PARAMS, 0);
    }
    public TYPE_ARGS(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.TYPE_ARGS, 0);
    }
    public EXTENDS(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.EXTENDS, 0);
    }
    public RETURNS(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.RETURNS, 0);
    }
    public TYPE(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.TYPE, 0);
    }
    public INTERFACE(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.INTERFACE, 0);
    }
    public MODIFIERS(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.MODIFIERS, 0);
    }
    public BOOLEAN(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.BOOLEAN, 0);
    }
    public NULL(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.NULL, 0);
    }
    public UNDEFINED(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.UNDEFINED, 0);
    }
    public EXPORT(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.EXPORT, 0);
    }
    public EXPORT_DEFAULT(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.EXPORT_DEFAULT, 0);
    }
    public EXPORT_NAMED(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.EXPORT_NAMED, 0);
    }
    public EXPORT_NS_FROM(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.EXPORT_NS_FROM, 0);
    }
    public EXPORT_FROM(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.EXPORT_FROM, 0);
    }
    public EXPORT_ALL_FROM(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.EXPORT_ALL_FROM, 0);
    }
    public IMPORT_TYPE(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.IMPORT_TYPE, 0);
    }
    public EXPORT_TYPE(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.EXPORT_TYPE, 0);
    }
    public EXPORT_TYPE_FROM(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.EXPORT_TYPE_FROM, 0);
    }
    public EXPORT_TYPE_ALL_FROM(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.EXPORT_TYPE_ALL_FROM, 0);
    }
    public CLASS(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.CLASS, 0);
    }
    public CLASS_BODY(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.CLASS_BODY, 0);
    }
    public FIELD(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.FIELD, 0);
    }
    public CONSTRUCTOR(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.CONSTRUCTOR, 0);
    }
    public THIS(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.THIS, 0);
    }
    public SUPER(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.SUPER, 0);
    }
    public SUPER_METHOD(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.SUPER_METHOD, 0);
    }
    public GET(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.GET, 0);
    }
    public SETPROP(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.SETPROP, 0);
    }
    public ABSTRACT_METHOD(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.ABSTRACT_METHOD, 0);
    }
    public IMPLEMENTS(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.IMPLEMENTS, 0);
    }
    public override get ruleIndex(): number {
        return Stage4Parser.RULE_propKey;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterPropKey) {
             listener.enterPropKey(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public DOT(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.DOT, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public propKey(): PropKeyContext {
        return this.getRuleContext(0, PropKeyContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage4Parser.RULE_propAccess;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterPropAccess) {
             listener.enterPropAccess(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public INDEX(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.INDEX, 0)!;
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
        return this.getToken(Stage4Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage4Parser.RULE_indexAccess;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterIndexAccess) {
             listener.enterIndexAccess(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.RPAREN, 0)!;
    }
    public QUASI(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.QUASI, 0);
    }
    public QUOTE(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.QUOTE, 0);
    }
    public override get ruleIndex(): number {
        return Stage4Parser.RULE_quasiquote;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterQuasiquote) {
             listener.enterQuasiquote(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public UNQUOTE(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.UNQUOTE, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage4Parser.RULE_unquote;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterUnquote) {
             listener.enterUnquote(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public UNQUOTE_SPLICING(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.UNQUOTE_SPLICING, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage4Parser.RULE_unquoteSplicing;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterUnquoteSplicing) {
             listener.enterUnquoteSplicing(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public OPTCHAIN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.OPTCHAIN, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public propKey(): PropKeyContext {
        return this.getRuleContext(0, PropKeyContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage4Parser.RULE_optChain;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterOptChain) {
             listener.enterOptChain(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
        if(listener.exitOptChain) {
             listener.exitOptChain(this);
        }
    }
}


export class NullCoalesceContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public NULLCOAL(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.NULLCOAL, 0)!;
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
        return this.getToken(Stage4Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage4Parser.RULE_nullCoalesce;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterNullCoalesce) {
             listener.enterNullCoalesce(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.LPAREN, 0)!;
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
        return this.getToken(Stage4Parser.RPAREN, 0)!;
    }
    public typeArgs(): TypeArgsContext | null {
        return this.getRuleContext(0, TypeArgsContext);
    }
    public override get ruleIndex(): number {
        return Stage4Parser.RULE_call;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterCall) {
             listener.enterCall(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public TYPE_ARGS(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.TYPE_ARGS, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.RPAREN, 0)!;
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
        return Stage4Parser.RULE_typeArgs;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterTypeArgs) {
             listener.enterTypeArgs(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.RPAREN, 0)!;
    }
    public param(): ParamContext[];
    public param(i: number): ParamContext | null;
    public param(i?: number): ParamContext[] | ParamContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ParamContext);
        }

        return this.getRuleContext(i, ParamContext);
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage4Parser.COMMA);
    	} else {
    		return this.getToken(Stage4Parser.COMMA, i);
    	}
    }
    public override get ruleIndex(): number {
        return Stage4Parser.RULE_fnSignature;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterFnSignature) {
             listener.enterFnSignature(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
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
        return this.getToken(Stage4Parser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage4Parser.RULE_param;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterParam) {
             listener.enterParam(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
        if(listener.exitParam) {
             listener.exitParam(this);
        }
    }
}


export class LiteralContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public NUMBER(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.NUMBER, 0);
    }
    public STRING(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.STRING, 0);
    }
    public BACKTICK_STRING(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.BACKTICK_STRING, 0);
    }
    public BOOLEAN(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.BOOLEAN, 0);
    }
    public NULL(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.NULL, 0);
    }
    public UNDEFINED(): antlr.TerminalNode | null {
        return this.getToken(Stage4Parser.UNDEFINED, 0);
    }
    public override get ruleIndex(): number {
        return Stage4Parser.RULE_literal;
    }
    public override enterRule(listener: Stage4Listener): void {
        if(listener.enterLiteral) {
             listener.enterLiteral(this);
        }
    }
    public override exitRule(listener: Stage4Listener): void {
        if(listener.exitLiteral) {
             listener.exitLiteral(this);
        }
    }
}
