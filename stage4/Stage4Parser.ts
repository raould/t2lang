
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
    public static readonly RULE_typeAlias = 6;
    public static readonly RULE_interfaceDef = 7;
    public static readonly RULE_interfaceExtends = 8;
    public static readonly RULE_classDef = 9;
    public static readonly RULE_anonClassDef = 10;
    public static readonly RULE_classExtends = 11;
    public static readonly RULE_classImplements = 12;
    public static readonly RULE_classBody = 13;
    public static readonly RULE_classElement = 14;
    public static readonly RULE_modifier = 15;
    public static readonly RULE_fieldDef = 16;
    public static readonly RULE_constructorDef = 17;
    public static readonly RULE_classMethodDef = 18;
    public static readonly RULE_abstractMethodDef = 19;
    public static readonly RULE_getterDef = 20;
    public static readonly RULE_setterDef = 21;
    public static readonly RULE_typedParam = 22;
    public static readonly RULE_fnSignatureTyped = 23;
    public static readonly RULE_statement = 24;
    public static readonly RULE_letStar = 25;
    public static readonly RULE_letStmt = 26;
    public static readonly RULE_constStar = 27;
    public static readonly RULE_constStmt = 28;
    public static readonly RULE_ifForm = 29;
    public static readonly RULE_whileForm = 30;
    public static readonly RULE_block = 31;
    public static readonly RULE_returnForm = 32;
    public static readonly RULE_throwForm = 33;
    public static readonly RULE_importForm = 34;
    public static readonly RULE_importTypeForm = 35;
    public static readonly RULE_importTypeSpec = 36;
    public static readonly RULE_importTypeName = 37;
    public static readonly RULE_exportForm = 38;
    public static readonly RULE_exportBinding = 39;
    public static readonly RULE_exportDefault = 40;
    public static readonly RULE_exportNamed = 41;
    public static readonly RULE_exportNamePair = 42;
    public static readonly RULE_exportFrom = 43;
    public static readonly RULE_exportAllFrom = 44;
    public static readonly RULE_exportNsFromForm = 45;
    public static readonly RULE_exportTypeForm = 46;
    public static readonly RULE_exportTypeFromForm = 47;
    public static readonly RULE_exportTypeAllFromForm = 48;
    public static readonly RULE_exportDeclForm = 49;
    public static readonly RULE_starBinding = 50;
    public static readonly RULE_singleBinding = 51;
    public static readonly RULE_typeExpr = 52;
    public static readonly RULE_typeUnion = 53;
    public static readonly RULE_typeIntersection = 54;
    public static readonly RULE_typeArray = 55;
    public static readonly RULE_typeTuple = 56;
    public static readonly RULE_typeTupleElement = 57;
    public static readonly RULE_typeFunction = 58;
    public static readonly RULE_typeFnParam = 59;
    public static readonly RULE_typeObject = 60;
    public static readonly RULE_typeProp = 61;
    public static readonly RULE_propModifier = 62;
    public static readonly RULE_typeLiteral = 63;
    public static readonly RULE_typeKeyof = 64;
    public static readonly RULE_typeTypeof = 65;
    public static readonly RULE_typeIndexAccess = 66;
    public static readonly RULE_typeConditional = 67;
    public static readonly RULE_typeInfer = 68;
    public static readonly RULE_typeMapped = 69;
    public static readonly RULE_mappedModifiers = 70;
    public static readonly RULE_mappedModifier = 71;
    public static readonly RULE_typeTemplateLiteral = 72;
    public static readonly RULE_templatePart = 73;
    public static readonly RULE_typeApplication = 74;
    public static readonly RULE_typeParams = 75;
    public static readonly RULE_typeParamDecl = 76;
    public static readonly RULE_typeParamConstraint = 77;
    public static readonly RULE_typeParamDefault = 78;
    public static readonly RULE_assign = 79;
    public static readonly RULE_switchForm = 80;
    public static readonly RULE_caseClause = 81;
    public static readonly RULE_defaultClause = 82;
    public static readonly RULE_forForm = 83;
    public static readonly RULE_forInForm = 84;
    public static readonly RULE_forOfForm = 85;
    public static readonly RULE_expression = 86;
    public static readonly RULE_thisExpr = 87;
    public static readonly RULE_superExpr = 88;
    public static readonly RULE_superConstructorCall = 89;
    public static readonly RULE_superMethodCall = 90;
    public static readonly RULE_typeofExpr = 91;
    public static readonly RULE_typeAssert = 92;
    public static readonly RULE_lambda = 93;
    public static readonly RULE_fn = 94;
    public static readonly RULE_bindExpr = 95;
    public static readonly RULE_methodCallExpr = 96;
    public static readonly RULE_ternary = 97;
    public static readonly RULE_condExpr = 98;
    public static readonly RULE_newForm = 99;
    public static readonly RULE_objectExpr = 100;
    public static readonly RULE_objectField = 101;
    public static readonly RULE_methodDef = 102;
    public static readonly RULE_arrayExpr = 103;
    public static readonly RULE_propKey = 104;
    public static readonly RULE_propAccess = 105;
    public static readonly RULE_indexAccess = 106;
    public static readonly RULE_quasiquote = 107;
    public static readonly RULE_unquote = 108;
    public static readonly RULE_unquoteSplicing = 109;
    public static readonly RULE_optChain = 110;
    public static readonly RULE_nullCoalesce = 111;
    public static readonly RULE_call = 112;
    public static readonly RULE_typeArgs = 113;
    public static readonly RULE_fnSignature = 114;
    public static readonly RULE_param = 115;
    public static readonly RULE_literal = 116;

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
        "typeAlias", "interfaceDef", "interfaceExtends", "classDef", "anonClassDef", 
        "classExtends", "classImplements", "classBody", "classElement", 
        "modifier", "fieldDef", "constructorDef", "classMethodDef", "abstractMethodDef", 
        "getterDef", "setterDef", "typedParam", "fnSignatureTyped", "statement", 
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
            this.state = 234;
            this.match(Stage4Parser.LPAREN);
            this.state = 235;
            this.match(Stage4Parser.PROGRAM);
            this.state = 239;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 50)) & ~0x1F) === 0 && ((1 << (_la - 50)) & 469762051) !== 0) || ((((_la - 92)) & ~0x1F) === 0 && ((1 << (_la - 92)) & 55) !== 0)) {
                {
                {
                this.state = 236;
                this.topLevel();
                }
                }
                this.state = 241;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 242;
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
            this.state = 252;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 1, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 244;
                this.defmacro();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 245;
                this.macroTimeFnDef();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 246;
                this.def();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 247;
                this.typeAlias();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 248;
                this.interfaceDef();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 249;
                this.classDef();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 250;
                this.exportDeclForm();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 251;
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
            this.state = 258;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 2, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 254;
                this.def();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 255;
                this.classDef();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 256;
                this.interfaceDef();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 257;
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
            this.state = 260;
            this.match(Stage4Parser.LPAREN);
            this.state = 261;
            this.match(Stage4Parser.DEFMACRO);
            this.state = 262;
            this.match(Stage4Parser.IDENTIFIER);
            this.state = 263;
            this.fnSignature();
            this.state = 267;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 50)) & ~0x1F) === 0 && ((1 << (_la - 50)) & 469762051) !== 0) || ((((_la - 92)) & ~0x1F) === 0 && ((1 << (_la - 92)) & 55) !== 0)) {
                {
                {
                this.state = 264;
                this.statement();
                }
                }
                this.state = 269;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 270;
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
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 272;
            this.match(Stage4Parser.LPAREN);
            this.state = 273;
            this.match(Stage4Parser.MACRO_TIME_ATTR);
            this.state = 274;
            this.def();
            this.state = 275;
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
    public def(): DefContext {
        let localContext = new DefContext(this.context, this.state);
        this.enterRule(localContext, 10, Stage4Parser.RULE_def);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 277;
            this.match(Stage4Parser.LPAREN);
            this.state = 278;
            this.match(Stage4Parser.DEF);
            this.state = 279;
            this.match(Stage4Parser.IDENTIFIER);
            this.state = 280;
            this.expression();
            this.state = 281;
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
        this.enterRule(localContext, 12, Stage4Parser.RULE_typeAlias);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 283;
            this.match(Stage4Parser.LPAREN);
            this.state = 284;
            this.match(Stage4Parser.TYPE);
            this.state = 285;
            this.match(Stage4Parser.IDENTIFIER);
            this.state = 287;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 4, this.context) ) {
            case 1:
                {
                this.state = 286;
                this.typeParams();
                }
                break;
            }
            this.state = 289;
            this.typeExpr();
            this.state = 290;
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
        this.enterRule(localContext, 14, Stage4Parser.RULE_interfaceDef);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 292;
            this.match(Stage4Parser.LPAREN);
            this.state = 293;
            this.match(Stage4Parser.INTERFACE);
            this.state = 294;
            this.match(Stage4Parser.IDENTIFIER);
            this.state = 296;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 5, this.context) ) {
            case 1:
                {
                this.state = 295;
                this.typeParams();
                }
                break;
            }
            this.state = 299;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 6, this.context) ) {
            case 1:
                {
                this.state = 298;
                this.interfaceExtends();
                }
                break;
            }
            this.state = 301;
            this.typeObject();
            this.state = 302;
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
        this.enterRule(localContext, 16, Stage4Parser.RULE_interfaceExtends);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 304;
            this.match(Stage4Parser.LPAREN);
            this.state = 305;
            this.match(Stage4Parser.EXTENDS);
            this.state = 307;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 306;
                this.typeExpr();
                }
                }
                this.state = 309;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 97);
            this.state = 311;
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
        this.enterRule(localContext, 18, Stage4Parser.RULE_classDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 313;
            this.match(Stage4Parser.LPAREN);
            this.state = 314;
            this.match(Stage4Parser.CLASS);
            this.state = 318;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 92) {
                {
                {
                this.state = 315;
                this.modifier();
                }
                }
                this.state = 320;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 321;
            this.match(Stage4Parser.IDENTIFIER);
            this.state = 323;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 9, this.context) ) {
            case 1:
                {
                this.state = 322;
                this.typeParams();
                }
                break;
            }
            this.state = 326;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 10, this.context) ) {
            case 1:
                {
                this.state = 325;
                this.classExtends();
                }
                break;
            }
            this.state = 329;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 11, this.context) ) {
            case 1:
                {
                this.state = 328;
                this.classImplements();
                }
                break;
            }
            this.state = 331;
            this.classBody();
            this.state = 332;
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
        this.enterRule(localContext, 20, Stage4Parser.RULE_anonClassDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 334;
            this.match(Stage4Parser.LPAREN);
            this.state = 335;
            this.match(Stage4Parser.CLASS);
            this.state = 339;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 92) {
                {
                {
                this.state = 336;
                this.modifier();
                }
                }
                this.state = 341;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 343;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 13, this.context) ) {
            case 1:
                {
                this.state = 342;
                this.classExtends();
                }
                break;
            }
            this.state = 346;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 14, this.context) ) {
            case 1:
                {
                this.state = 345;
                this.classImplements();
                }
                break;
            }
            this.state = 348;
            this.classBody();
            this.state = 349;
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
        this.enterRule(localContext, 22, Stage4Parser.RULE_classExtends);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 351;
            this.match(Stage4Parser.LPAREN);
            this.state = 352;
            this.match(Stage4Parser.EXTENDS);
            this.state = 353;
            this.typeExpr();
            this.state = 354;
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
        this.enterRule(localContext, 24, Stage4Parser.RULE_classImplements);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 356;
            this.match(Stage4Parser.LPAREN);
            this.state = 357;
            this.match(Stage4Parser.IMPLEMENTS);
            this.state = 359;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 358;
                this.typeExpr();
                }
                }
                this.state = 361;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 97);
            this.state = 363;
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
        this.enterRule(localContext, 26, Stage4Parser.RULE_classBody);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 365;
            this.match(Stage4Parser.LPAREN);
            this.state = 366;
            this.match(Stage4Parser.CLASS_BODY);
            this.state = 370;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 367;
                this.classElement();
                }
                }
                this.state = 372;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 373;
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
        this.enterRule(localContext, 28, Stage4Parser.RULE_classElement);
        try {
            this.state = 381;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 17, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 375;
                this.fieldDef();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 376;
                this.constructorDef();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 377;
                this.classMethodDef();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 378;
                this.abstractMethodDef();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 379;
                this.getterDef();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 380;
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
        this.enterRule(localContext, 30, Stage4Parser.RULE_modifier);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 383;
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
        this.enterRule(localContext, 32, Stage4Parser.RULE_fieldDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 385;
            this.match(Stage4Parser.LPAREN);
            this.state = 386;
            this.match(Stage4Parser.FIELD);
            this.state = 390;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 92) {
                {
                {
                this.state = 387;
                this.modifier();
                }
                }
                this.state = 392;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 393;
            this.match(Stage4Parser.IDENTIFIER);
            this.state = 396;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 79) {
                {
                this.state = 394;
                this.match(Stage4Parser.COLON);
                this.state = 395;
                this.typeExpr();
                }
            }

            this.state = 399;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2 || ((((_la - 50)) & ~0x1F) === 0 && ((1 << (_la - 50)) & 469762051) !== 0) || ((((_la - 92)) & ~0x1F) === 0 && ((1 << (_la - 92)) & 55) !== 0)) {
                {
                this.state = 398;
                this.expression();
                }
            }

            this.state = 401;
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
        this.enterRule(localContext, 34, Stage4Parser.RULE_constructorDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 403;
            this.match(Stage4Parser.LPAREN);
            this.state = 404;
            this.match(Stage4Parser.CONSTRUCTOR);
            this.state = 405;
            this.fnSignatureTyped();
            this.state = 409;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 50)) & ~0x1F) === 0 && ((1 << (_la - 50)) & 469762051) !== 0) || ((((_la - 92)) & ~0x1F) === 0 && ((1 << (_la - 92)) & 55) !== 0)) {
                {
                {
                this.state = 406;
                this.statement();
                }
                }
                this.state = 411;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 412;
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
        this.enterRule(localContext, 36, Stage4Parser.RULE_classMethodDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 414;
            this.match(Stage4Parser.LPAREN);
            this.state = 415;
            this.match(Stage4Parser.METHOD);
            this.state = 419;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 92) {
                {
                {
                this.state = 416;
                this.modifier();
                }
                }
                this.state = 421;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 422;
            this.match(Stage4Parser.IDENTIFIER);
            this.state = 423;
            this.fnSignatureTyped();
            this.state = 427;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 50)) & ~0x1F) === 0 && ((1 << (_la - 50)) & 469762051) !== 0) || ((((_la - 92)) & ~0x1F) === 0 && ((1 << (_la - 92)) & 55) !== 0)) {
                {
                {
                this.state = 424;
                this.statement();
                }
                }
                this.state = 429;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 430;
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
        this.enterRule(localContext, 38, Stage4Parser.RULE_abstractMethodDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 432;
            this.match(Stage4Parser.LPAREN);
            this.state = 433;
            this.match(Stage4Parser.ABSTRACT_METHOD);
            this.state = 437;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 92) {
                {
                {
                this.state = 434;
                this.modifier();
                }
                }
                this.state = 439;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 440;
            this.match(Stage4Parser.IDENTIFIER);
            this.state = 441;
            this.fnSignatureTyped();
            this.state = 442;
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
        this.enterRule(localContext, 40, Stage4Parser.RULE_getterDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 444;
            this.match(Stage4Parser.LPAREN);
            this.state = 445;
            this.match(Stage4Parser.GET);
            this.state = 449;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 92) {
                {
                {
                this.state = 446;
                this.modifier();
                }
                }
                this.state = 451;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 452;
            this.match(Stage4Parser.IDENTIFIER);
            this.state = 453;
            this.fnSignatureTyped();
            this.state = 457;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 50)) & ~0x1F) === 0 && ((1 << (_la - 50)) & 469762051) !== 0) || ((((_la - 92)) & ~0x1F) === 0 && ((1 << (_la - 92)) & 55) !== 0)) {
                {
                {
                this.state = 454;
                this.statement();
                }
                }
                this.state = 459;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 460;
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
        this.enterRule(localContext, 42, Stage4Parser.RULE_setterDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 462;
            this.match(Stage4Parser.LPAREN);
            this.state = 463;
            this.match(Stage4Parser.SETPROP);
            this.state = 467;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 92) {
                {
                {
                this.state = 464;
                this.modifier();
                }
                }
                this.state = 469;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 470;
            this.match(Stage4Parser.IDENTIFIER);
            this.state = 471;
            this.fnSignatureTyped();
            this.state = 475;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 50)) & ~0x1F) === 0 && ((1 << (_la - 50)) & 469762051) !== 0) || ((((_la - 92)) & ~0x1F) === 0 && ((1 << (_la - 92)) & 55) !== 0)) {
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
        this.enterRule(localContext, 44, Stage4Parser.RULE_typedParam);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 480;
            this.match(Stage4Parser.LPAREN);
            this.state = 481;
            this.match(Stage4Parser.IDENTIFIER);
            this.state = 483;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 75) {
                {
                this.state = 482;
                this.match(Stage4Parser.OPTIONAL);
                }
            }

            this.state = 487;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 79) {
                {
                this.state = 485;
                this.match(Stage4Parser.COLON);
                this.state = 486;
                this.typeExpr();
                }
            }

            this.state = 489;
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
        this.enterRule(localContext, 46, Stage4Parser.RULE_fnSignatureTyped);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 491;
            this.match(Stage4Parser.LPAREN);
            this.state = 502;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2) {
                {
                this.state = 492;
                this.typedParam();
                this.state = 499;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 2 || _la === 4) {
                    {
                    {
                    this.state = 494;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    if (_la === 4) {
                        {
                        this.state = 493;
                        this.match(Stage4Parser.COMMA);
                        }
                    }

                    this.state = 496;
                    this.typedParam();
                    }
                    }
                    this.state = 501;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
            }

            this.state = 504;
            this.match(Stage4Parser.RPAREN);
            this.state = 510;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 34, this.context) ) {
            case 1:
                {
                this.state = 505;
                this.match(Stage4Parser.LPAREN);
                this.state = 506;
                this.match(Stage4Parser.RETURNS);
                this.state = 507;
                this.typeExpr();
                this.state = 508;
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
        this.enterRule(localContext, 48, Stage4Parser.RULE_statement);
        try {
            this.state = 530;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 35, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 512;
                this.letStar();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 513;
                this.letStmt();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 514;
                this.constStar();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 515;
                this.constStmt();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 516;
                this.ifForm();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 517;
                this.whileForm();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 518;
                this.block();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 519;
                this.returnForm();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 520;
                this.throwForm();
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 521;
                this.importForm();
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 522;
                this.importTypeForm();
                }
                break;
            case 12:
                this.enterOuterAlt(localContext, 12);
                {
                this.state = 523;
                this.exportForm();
                }
                break;
            case 13:
                this.enterOuterAlt(localContext, 13);
                {
                this.state = 524;
                this.switchForm();
                }
                break;
            case 14:
                this.enterOuterAlt(localContext, 14);
                {
                this.state = 525;
                this.forForm();
                }
                break;
            case 15:
                this.enterOuterAlt(localContext, 15);
                {
                this.state = 526;
                this.forInForm();
                }
                break;
            case 16:
                this.enterOuterAlt(localContext, 16);
                {
                this.state = 527;
                this.forOfForm();
                }
                break;
            case 17:
                this.enterOuterAlt(localContext, 17);
                {
                this.state = 528;
                this.assign();
                }
                break;
            case 18:
                this.enterOuterAlt(localContext, 18);
                {
                this.state = 529;
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
        this.enterRule(localContext, 50, Stage4Parser.RULE_letStar);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 532;
            this.match(Stage4Parser.LPAREN);
            this.state = 533;
            this.match(Stage4Parser.LETSTAR);
            this.state = 534;
            this.match(Stage4Parser.LPAREN);
            this.state = 538;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 535;
                this.starBinding();
                }
                }
                this.state = 540;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 541;
            this.match(Stage4Parser.RPAREN);
            this.state = 545;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 50)) & ~0x1F) === 0 && ((1 << (_la - 50)) & 469762051) !== 0) || ((((_la - 92)) & ~0x1F) === 0 && ((1 << (_la - 92)) & 55) !== 0)) {
                {
                {
                this.state = 542;
                this.statement();
                }
                }
                this.state = 547;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 548;
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
        this.enterRule(localContext, 52, Stage4Parser.RULE_letStmt);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 550;
            this.match(Stage4Parser.LPAREN);
            this.state = 551;
            this.match(Stage4Parser.LET);
            this.state = 552;
            this.singleBinding();
            this.state = 553;
            this.expression();
            this.state = 554;
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
        this.enterRule(localContext, 54, Stage4Parser.RULE_constStar);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 556;
            this.match(Stage4Parser.LPAREN);
            this.state = 557;
            this.match(Stage4Parser.CONSTSTAR);
            this.state = 558;
            this.match(Stage4Parser.LPAREN);
            this.state = 562;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 559;
                this.starBinding();
                }
                }
                this.state = 564;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 565;
            this.match(Stage4Parser.RPAREN);
            this.state = 569;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 50)) & ~0x1F) === 0 && ((1 << (_la - 50)) & 469762051) !== 0) || ((((_la - 92)) & ~0x1F) === 0 && ((1 << (_la - 92)) & 55) !== 0)) {
                {
                {
                this.state = 566;
                this.statement();
                }
                }
                this.state = 571;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 572;
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
        this.enterRule(localContext, 56, Stage4Parser.RULE_constStmt);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 574;
            this.match(Stage4Parser.LPAREN);
            this.state = 575;
            this.match(Stage4Parser.CONST);
            this.state = 576;
            this.singleBinding();
            this.state = 577;
            this.expression();
            this.state = 578;
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
        this.enterRule(localContext, 58, Stage4Parser.RULE_ifForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 580;
            this.match(Stage4Parser.LPAREN);
            this.state = 581;
            this.match(Stage4Parser.IF);
            this.state = 582;
            this.expression();
            this.state = 583;
            this.statement();
            this.state = 585;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2 || ((((_la - 50)) & ~0x1F) === 0 && ((1 << (_la - 50)) & 469762051) !== 0) || ((((_la - 92)) & ~0x1F) === 0 && ((1 << (_la - 92)) & 55) !== 0)) {
                {
                this.state = 584;
                this.statement();
                }
            }

            this.state = 587;
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
        this.enterRule(localContext, 60, Stage4Parser.RULE_whileForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 589;
            this.match(Stage4Parser.LPAREN);
            this.state = 590;
            this.match(Stage4Parser.WHILE);
            this.state = 591;
            this.expression();
            this.state = 595;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 50)) & ~0x1F) === 0 && ((1 << (_la - 50)) & 469762051) !== 0) || ((((_la - 92)) & ~0x1F) === 0 && ((1 << (_la - 92)) & 55) !== 0)) {
                {
                {
                this.state = 592;
                this.statement();
                }
                }
                this.state = 597;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 598;
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
        this.enterRule(localContext, 62, Stage4Parser.RULE_block);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 600;
            this.match(Stage4Parser.LPAREN);
            this.state = 601;
            this.match(Stage4Parser.BEGIN);
            this.state = 605;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 50)) & ~0x1F) === 0 && ((1 << (_la - 50)) & 469762051) !== 0) || ((((_la - 92)) & ~0x1F) === 0 && ((1 << (_la - 92)) & 55) !== 0)) {
                {
                {
                this.state = 602;
                this.statement();
                }
                }
                this.state = 607;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 608;
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
        this.enterRule(localContext, 64, Stage4Parser.RULE_returnForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 610;
            this.match(Stage4Parser.LPAREN);
            this.state = 611;
            this.match(Stage4Parser.RETURN);
            this.state = 613;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2 || ((((_la - 50)) & ~0x1F) === 0 && ((1 << (_la - 50)) & 469762051) !== 0) || ((((_la - 92)) & ~0x1F) === 0 && ((1 << (_la - 92)) & 55) !== 0)) {
                {
                this.state = 612;
                this.expression();
                }
            }

            this.state = 615;
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
        this.enterRule(localContext, 66, Stage4Parser.RULE_throwForm);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 617;
            this.match(Stage4Parser.LPAREN);
            this.state = 618;
            this.match(Stage4Parser.THROW);
            this.state = 619;
            this.expression();
            this.state = 620;
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
        this.enterRule(localContext, 68, Stage4Parser.RULE_importForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 622;
            this.match(Stage4Parser.LPAREN);
            this.state = 623;
            this.match(Stage4Parser.IMPORT);
            this.state = 625;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2) {
                {
                this.state = 624;
                this.objectExpr();
                }
            }

            this.state = 627;
            this.match(Stage4Parser.STRING);
            this.state = 628;
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
        this.enterRule(localContext, 70, Stage4Parser.RULE_importTypeForm);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 630;
            this.match(Stage4Parser.LPAREN);
            this.state = 631;
            this.match(Stage4Parser.IMPORT_TYPE);
            this.state = 632;
            this.importTypeSpec();
            this.state = 633;
            this.match(Stage4Parser.STRING);
            this.state = 634;
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
        this.enterRule(localContext, 72, Stage4Parser.RULE_importTypeSpec);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 636;
            this.match(Stage4Parser.LPAREN);
            this.state = 637;
            this.match(Stage4Parser.IDENTIFIER);
            this.state = 639;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 638;
                this.importTypeName();
                }
                }
                this.state = 641;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 97);
            this.state = 643;
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
        this.enterRule(localContext, 74, Stage4Parser.RULE_importTypeName);
        try {
            this.state = 650;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case Stage4Parser.IDENTIFIER:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 645;
                this.match(Stage4Parser.IDENTIFIER);
                }
                break;
            case Stage4Parser.LPAREN:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 646;
                this.match(Stage4Parser.LPAREN);
                this.state = 647;
                this.match(Stage4Parser.IDENTIFIER);
                this.state = 648;
                this.match(Stage4Parser.IDENTIFIER);
                this.state = 649;
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
        this.enterRule(localContext, 76, Stage4Parser.RULE_exportForm);
        try {
            this.state = 661;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 47, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 652;
                this.exportBinding();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 653;
                this.exportDefault();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 654;
                this.exportNamed();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 655;
                this.exportNsFromForm();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 656;
                this.exportFrom();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 657;
                this.exportAllFrom();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 658;
                this.exportTypeForm();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 659;
                this.exportTypeFromForm();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 660;
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
        this.enterRule(localContext, 78, Stage4Parser.RULE_exportBinding);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 663;
            this.match(Stage4Parser.LPAREN);
            this.state = 664;
            this.match(Stage4Parser.EXPORT);
            this.state = 665;
            this.match(Stage4Parser.IDENTIFIER);
            this.state = 666;
            this.expression();
            this.state = 667;
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
        this.enterRule(localContext, 80, Stage4Parser.RULE_exportDefault);
        try {
            this.state = 689;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 48, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 669;
                this.match(Stage4Parser.LPAREN);
                this.state = 670;
                this.match(Stage4Parser.EXPORT_DEFAULT);
                this.state = 671;
                this.classDef();
                this.state = 672;
                this.match(Stage4Parser.RPAREN);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 674;
                this.match(Stage4Parser.LPAREN);
                this.state = 675;
                this.match(Stage4Parser.EXPORT_DEFAULT);
                this.state = 676;
                this.anonClassDef();
                this.state = 677;
                this.match(Stage4Parser.RPAREN);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 679;
                this.match(Stage4Parser.LPAREN);
                this.state = 680;
                this.match(Stage4Parser.EXPORT_DEFAULT);
                this.state = 681;
                this.def();
                this.state = 682;
                this.match(Stage4Parser.RPAREN);
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 684;
                this.match(Stage4Parser.LPAREN);
                this.state = 685;
                this.match(Stage4Parser.EXPORT_DEFAULT);
                this.state = 686;
                this.expression();
                this.state = 687;
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
        this.enterRule(localContext, 82, Stage4Parser.RULE_exportNamed);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 691;
            this.match(Stage4Parser.LPAREN);
            this.state = 692;
            this.match(Stage4Parser.EXPORT_NAMED);
            this.state = 694;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 693;
                this.exportNamePair();
                }
                }
                this.state = 696;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2);
            this.state = 698;
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
        this.enterRule(localContext, 84, Stage4Parser.RULE_exportNamePair);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 700;
            this.match(Stage4Parser.LPAREN);
            this.state = 701;
            this.match(Stage4Parser.IDENTIFIER);
            this.state = 703;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 97) {
                {
                this.state = 702;
                this.match(Stage4Parser.IDENTIFIER);
                }
            }

            this.state = 705;
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
        this.enterRule(localContext, 86, Stage4Parser.RULE_exportFrom);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 707;
            this.match(Stage4Parser.LPAREN);
            this.state = 708;
            this.match(Stage4Parser.EXPORT_FROM);
            this.state = 709;
            this.match(Stage4Parser.STRING);
            this.state = 711;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 710;
                this.exportNamePair();
                }
                }
                this.state = 713;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2);
            this.state = 715;
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
        this.enterRule(localContext, 88, Stage4Parser.RULE_exportAllFrom);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 717;
            this.match(Stage4Parser.LPAREN);
            this.state = 718;
            this.match(Stage4Parser.EXPORT_ALL_FROM);
            this.state = 719;
            this.match(Stage4Parser.STRING);
            this.state = 720;
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
        this.enterRule(localContext, 90, Stage4Parser.RULE_exportNsFromForm);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 722;
            this.match(Stage4Parser.LPAREN);
            this.state = 723;
            this.match(Stage4Parser.EXPORT_NS_FROM);
            this.state = 724;
            this.match(Stage4Parser.STRING);
            this.state = 725;
            this.match(Stage4Parser.STRING);
            this.state = 726;
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
        this.enterRule(localContext, 92, Stage4Parser.RULE_exportTypeForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 728;
            this.match(Stage4Parser.LPAREN);
            this.state = 729;
            this.match(Stage4Parser.EXPORT_TYPE);
            this.state = 731;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 730;
                this.exportNamePair();
                }
                }
                this.state = 733;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2);
            this.state = 735;
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
        this.enterRule(localContext, 94, Stage4Parser.RULE_exportTypeFromForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 737;
            this.match(Stage4Parser.LPAREN);
            this.state = 738;
            this.match(Stage4Parser.EXPORT_TYPE_FROM);
            this.state = 739;
            this.match(Stage4Parser.STRING);
            this.state = 741;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 740;
                this.exportNamePair();
                }
                }
                this.state = 743;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2);
            this.state = 745;
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
        this.enterRule(localContext, 96, Stage4Parser.RULE_exportTypeAllFromForm);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 747;
            this.match(Stage4Parser.LPAREN);
            this.state = 748;
            this.match(Stage4Parser.EXPORT_TYPE_ALL_FROM);
            this.state = 749;
            this.match(Stage4Parser.STRING);
            this.state = 750;
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
        this.enterRule(localContext, 98, Stage4Parser.RULE_exportDeclForm);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 752;
            this.match(Stage4Parser.LPAREN);
            this.state = 753;
            this.match(Stage4Parser.EXPORT);
            this.state = 754;
            this.decl();
            this.state = 755;
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
        this.enterRule(localContext, 100, Stage4Parser.RULE_starBinding);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 757;
            this.match(Stage4Parser.LPAREN);
            this.state = 758;
            this.match(Stage4Parser.IDENTIFIER);
            this.state = 761;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 79) {
                {
                this.state = 759;
                this.match(Stage4Parser.COLON);
                this.state = 760;
                this.typeExpr();
                }
            }

            this.state = 763;
            this.expression();
            this.state = 764;
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
        this.enterRule(localContext, 102, Stage4Parser.RULE_singleBinding);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 766;
            this.match(Stage4Parser.LPAREN);
            this.state = 767;
            this.match(Stage4Parser.IDENTIFIER);
            this.state = 770;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 79) {
                {
                this.state = 768;
                this.match(Stage4Parser.COLON);
                this.state = 769;
                this.typeExpr();
                }
            }

            this.state = 772;
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
        this.enterRule(localContext, 104, Stage4Parser.RULE_typeExpr);
        try {
            this.state = 790;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 56, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 774;
                this.match(Stage4Parser.IDENTIFIER);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 775;
                this.typeUnion();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 776;
                this.typeIntersection();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 777;
                this.typeArray();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 778;
                this.typeTuple();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 779;
                this.typeFunction();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 780;
                this.typeObject();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 781;
                this.typeLiteral();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 782;
                this.typeKeyof();
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 783;
                this.typeTypeof();
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 784;
                this.typeIndexAccess();
                }
                break;
            case 12:
                this.enterOuterAlt(localContext, 12);
                {
                this.state = 785;
                this.typeConditional();
                }
                break;
            case 13:
                this.enterOuterAlt(localContext, 13);
                {
                this.state = 786;
                this.typeInfer();
                }
                break;
            case 14:
                this.enterOuterAlt(localContext, 14);
                {
                this.state = 787;
                this.typeMapped();
                }
                break;
            case 15:
                this.enterOuterAlt(localContext, 15);
                {
                this.state = 788;
                this.typeTemplateLiteral();
                }
                break;
            case 16:
                this.enterOuterAlt(localContext, 16);
                {
                this.state = 789;
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
        this.enterRule(localContext, 106, Stage4Parser.RULE_typeUnion);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 792;
            this.match(Stage4Parser.LPAREN);
            this.state = 793;
            this.match(Stage4Parser.UNION);
            this.state = 794;
            this.typeExpr();
            this.state = 796;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 795;
                this.typeExpr();
                }
                }
                this.state = 798;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 97);
            this.state = 800;
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
        this.enterRule(localContext, 108, Stage4Parser.RULE_typeIntersection);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 802;
            this.match(Stage4Parser.LPAREN);
            this.state = 803;
            this.match(Stage4Parser.INTERSECT);
            this.state = 804;
            this.typeExpr();
            this.state = 806;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 805;
                this.typeExpr();
                }
                }
                this.state = 808;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 97);
            this.state = 810;
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
        this.enterRule(localContext, 110, Stage4Parser.RULE_typeArray);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 812;
            this.match(Stage4Parser.LPAREN);
            this.state = 813;
            this.match(Stage4Parser.ARRAY);
            this.state = 814;
            this.typeExpr();
            this.state = 815;
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
        this.enterRule(localContext, 112, Stage4Parser.RULE_typeTuple);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 817;
            this.match(Stage4Parser.LPAREN);
            this.state = 818;
            this.match(Stage4Parser.TUPLE);
            this.state = 820;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 819;
                this.typeTupleElement();
                }
                }
                this.state = 822;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 97);
            this.state = 824;
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
        this.enterRule(localContext, 114, Stage4Parser.RULE_typeTupleElement);
        try {
            this.state = 837;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 60, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 826;
                this.match(Stage4Parser.LPAREN);
                this.state = 827;
                this.match(Stage4Parser.REST);
                this.state = 828;
                this.typeExpr();
                this.state = 829;
                this.match(Stage4Parser.RPAREN);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 831;
                this.match(Stage4Parser.LPAREN);
                this.state = 832;
                this.match(Stage4Parser.IDENTIFIER);
                this.state = 833;
                this.typeExpr();
                this.state = 834;
                this.match(Stage4Parser.RPAREN);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 836;
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
        this.enterRule(localContext, 116, Stage4Parser.RULE_typeFunction);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 839;
            this.match(Stage4Parser.LPAREN);
            this.state = 840;
            this.match(Stage4Parser.TYPEFN);
            this.state = 842;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 61, this.context) ) {
            case 1:
                {
                this.state = 841;
                this.typeParams();
                }
                break;
            }
            this.state = 844;
            this.match(Stage4Parser.LPAREN);
            this.state = 848;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 845;
                this.typeFnParam();
                }
                }
                this.state = 850;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 851;
            this.match(Stage4Parser.RPAREN);
            this.state = 852;
            this.typeExpr();
            this.state = 853;
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
        this.enterRule(localContext, 118, Stage4Parser.RULE_typeFnParam);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 855;
            this.match(Stage4Parser.LPAREN);
            this.state = 856;
            this.match(Stage4Parser.IDENTIFIER);
            this.state = 858;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 75) {
                {
                this.state = 857;
                this.match(Stage4Parser.OPTIONAL);
                }
            }

            this.state = 860;
            this.typeExpr();
            this.state = 861;
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
        this.enterRule(localContext, 120, Stage4Parser.RULE_typeObject);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 863;
            this.match(Stage4Parser.LPAREN);
            this.state = 864;
            this.match(Stage4Parser.IDENTIFIER);
            this.state = 868;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 865;
                this.typeProp();
                }
                }
                this.state = 870;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 871;
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
        this.enterRule(localContext, 122, Stage4Parser.RULE_typeProp);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 873;
            this.match(Stage4Parser.LPAREN);
            this.state = 877;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 67) {
                {
                {
                this.state = 874;
                this.propModifier();
                }
                }
                this.state = 879;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 880;
            this.match(Stage4Parser.IDENTIFIER);
            this.state = 882;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 75) {
                {
                this.state = 881;
                this.match(Stage4Parser.OPTIONAL);
                }
            }

            this.state = 884;
            this.typeExpr();
            this.state = 885;
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
        this.enterRule(localContext, 124, Stage4Parser.RULE_propModifier);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 887;
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
        this.enterRule(localContext, 126, Stage4Parser.RULE_typeLiteral);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 889;
            this.match(Stage4Parser.LPAREN);
            this.state = 890;
            this.match(Stage4Parser.LIT);
            this.state = 891;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 76)) & ~0x1F) === 0 && ((1 << (_la - 76)) & 1441793) !== 0))) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 892;
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
        this.enterRule(localContext, 128, Stage4Parser.RULE_typeKeyof);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 894;
            this.match(Stage4Parser.LPAREN);
            this.state = 895;
            this.match(Stage4Parser.KEYOF);
            this.state = 896;
            this.typeExpr();
            this.state = 897;
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
        this.enterRule(localContext, 130, Stage4Parser.RULE_typeTypeof);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 899;
            this.match(Stage4Parser.LPAREN);
            this.state = 900;
            this.match(Stage4Parser.TYPEOF);
            this.state = 901;
            this.match(Stage4Parser.IDENTIFIER);
            this.state = 902;
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
        this.enterRule(localContext, 132, Stage4Parser.RULE_typeIndexAccess);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 904;
            this.match(Stage4Parser.LPAREN);
            this.state = 905;
            this.match(Stage4Parser.INDEX);
            this.state = 906;
            this.typeExpr();
            this.state = 907;
            this.typeExpr();
            this.state = 908;
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
        this.enterRule(localContext, 134, Stage4Parser.RULE_typeConditional);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 910;
            this.match(Stage4Parser.LPAREN);
            this.state = 911;
            this.match(Stage4Parser.COND);
            this.state = 912;
            this.typeExpr();
            this.state = 913;
            this.typeExpr();
            this.state = 914;
            this.typeExpr();
            this.state = 915;
            this.typeExpr();
            this.state = 916;
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
        this.enterRule(localContext, 136, Stage4Parser.RULE_typeInfer);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 918;
            this.match(Stage4Parser.LPAREN);
            this.state = 919;
            this.match(Stage4Parser.INFER);
            this.state = 920;
            this.match(Stage4Parser.IDENTIFIER);
            this.state = 921;
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
        this.enterRule(localContext, 138, Stage4Parser.RULE_typeMapped);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 923;
            this.match(Stage4Parser.LPAREN);
            this.state = 924;
            this.match(Stage4Parser.MAPPED);
            this.state = 925;
            this.match(Stage4Parser.IDENTIFIER);
            this.state = 926;
            this.typeExpr();
            this.state = 928;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 67, this.context) ) {
            case 1:
                {
                this.state = 927;
                this.mappedModifiers();
                }
                break;
            }
            this.state = 930;
            this.typeExpr();
            this.state = 931;
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
        this.enterRule(localContext, 140, Stage4Parser.RULE_mappedModifiers);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 933;
            this.match(Stage4Parser.LPAREN);
            this.state = 934;
            this.match(Stage4Parser.MODIFIERS);
            this.state = 936;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 935;
                this.mappedModifier();
                }
                }
                this.state = 938;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 67 || _la === 75);
            this.state = 940;
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
        this.enterRule(localContext, 142, Stage4Parser.RULE_mappedModifier);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 942;
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
        this.enterRule(localContext, 144, Stage4Parser.RULE_typeTemplateLiteral);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 944;
            this.match(Stage4Parser.LPAREN);
            this.state = 945;
            this.match(Stage4Parser.TEMPLATE);
            this.state = 947;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 946;
                this.templatePart();
                }
                }
                this.state = 949;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 94 || _la === 97);
            this.state = 951;
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
        this.enterRule(localContext, 146, Stage4Parser.RULE_templatePart);
        try {
            this.state = 955;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case Stage4Parser.STRING:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 953;
                this.match(Stage4Parser.STRING);
                }
                break;
            case Stage4Parser.LPAREN:
            case Stage4Parser.IDENTIFIER:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 954;
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
        this.enterRule(localContext, 148, Stage4Parser.RULE_typeApplication);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 957;
            this.match(Stage4Parser.LPAREN);
            this.state = 958;
            this.typeExpr();
            this.state = 960;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 959;
                this.typeExpr();
                }
                }
                this.state = 962;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 97);
            this.state = 964;
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
        this.enterRule(localContext, 150, Stage4Parser.RULE_typeParams);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 966;
            this.match(Stage4Parser.LPAREN);
            this.state = 967;
            this.match(Stage4Parser.TYPE_PARAMS);
            this.state = 969;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 968;
                this.typeParamDecl();
                }
                }
                this.state = 971;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 97);
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
    public typeParamDecl(): TypeParamDeclContext {
        let localContext = new TypeParamDeclContext(this.context, this.state);
        this.enterRule(localContext, 152, Stage4Parser.RULE_typeParamDecl);
        let _la: number;
        try {
            this.state = 985;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case Stage4Parser.IDENTIFIER:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 975;
                this.match(Stage4Parser.IDENTIFIER);
                }
                break;
            case Stage4Parser.LPAREN:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 976;
                this.match(Stage4Parser.LPAREN);
                this.state = 977;
                this.match(Stage4Parser.IDENTIFIER);
                this.state = 979;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 73, this.context) ) {
                case 1:
                    {
                    this.state = 978;
                    this.typeParamConstraint();
                    }
                    break;
                }
                this.state = 982;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 2) {
                    {
                    this.state = 981;
                    this.typeParamDefault();
                    }
                }

                this.state = 984;
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
        this.enterRule(localContext, 154, Stage4Parser.RULE_typeParamConstraint);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 987;
            this.match(Stage4Parser.LPAREN);
            this.state = 988;
            this.match(Stage4Parser.EXTENDS);
            this.state = 989;
            this.typeExpr();
            this.state = 990;
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
        this.enterRule(localContext, 156, Stage4Parser.RULE_typeParamDefault);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 992;
            this.match(Stage4Parser.LPAREN);
            this.state = 993;
            this.match(Stage4Parser.DEFAULT);
            this.state = 994;
            this.typeExpr();
            this.state = 995;
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
        this.enterRule(localContext, 158, Stage4Parser.RULE_assign);
        try {
            this.state = 1009;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 76, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 997;
                this.match(Stage4Parser.LPAREN);
                this.state = 998;
                this.match(Stage4Parser.SET);
                this.state = 999;
                this.match(Stage4Parser.IDENTIFIER);
                this.state = 1000;
                this.expression();
                this.state = 1001;
                this.match(Stage4Parser.RPAREN);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1003;
                this.match(Stage4Parser.LPAREN);
                this.state = 1004;
                this.match(Stage4Parser.SET);
                this.state = 1005;
                this.propAccess();
                this.state = 1006;
                this.expression();
                this.state = 1007;
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
        this.enterRule(localContext, 160, Stage4Parser.RULE_switchForm);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1011;
            this.match(Stage4Parser.LPAREN);
            this.state = 1012;
            this.match(Stage4Parser.SWITCH);
            this.state = 1013;
            this.expression();
            this.state = 1017;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 77, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 1014;
                    this.caseClause();
                    }
                    }
                }
                this.state = 1019;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 77, this.context);
            }
            this.state = 1021;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2) {
                {
                this.state = 1020;
                this.defaultClause();
                }
            }

            this.state = 1023;
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
        this.enterRule(localContext, 162, Stage4Parser.RULE_caseClause);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1025;
            this.match(Stage4Parser.LPAREN);
            this.state = 1026;
            this.match(Stage4Parser.CASE);
            this.state = 1027;
            this.expression();
            this.state = 1031;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 50)) & ~0x1F) === 0 && ((1 << (_la - 50)) & 469762051) !== 0) || ((((_la - 92)) & ~0x1F) === 0 && ((1 << (_la - 92)) & 55) !== 0)) {
                {
                {
                this.state = 1028;
                this.statement();
                }
                }
                this.state = 1033;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1034;
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
        this.enterRule(localContext, 164, Stage4Parser.RULE_defaultClause);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1036;
            this.match(Stage4Parser.LPAREN);
            this.state = 1037;
            this.match(Stage4Parser.DEFAULT);
            this.state = 1041;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 50)) & ~0x1F) === 0 && ((1 << (_la - 50)) & 469762051) !== 0) || ((((_la - 92)) & ~0x1F) === 0 && ((1 << (_la - 92)) & 55) !== 0)) {
                {
                {
                this.state = 1038;
                this.statement();
                }
                }
                this.state = 1043;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1044;
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
        this.enterRule(localContext, 166, Stage4Parser.RULE_forForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1046;
            this.match(Stage4Parser.LPAREN);
            this.state = 1047;
            this.match(Stage4Parser.FOR);
            this.state = 1048;
            this.letStmt();
            this.state = 1049;
            this.expression();
            this.state = 1050;
            this.assign();
            this.state = 1054;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 50)) & ~0x1F) === 0 && ((1 << (_la - 50)) & 469762051) !== 0) || ((((_la - 92)) & ~0x1F) === 0 && ((1 << (_la - 92)) & 55) !== 0)) {
                {
                {
                this.state = 1051;
                this.statement();
                }
                }
                this.state = 1056;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1057;
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
        this.enterRule(localContext, 168, Stage4Parser.RULE_forInForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1059;
            this.match(Stage4Parser.LPAREN);
            this.state = 1060;
            this.match(Stage4Parser.FORIN);
            this.state = 1061;
            this.match(Stage4Parser.IDENTIFIER);
            this.state = 1062;
            this.expression();
            this.state = 1066;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 50)) & ~0x1F) === 0 && ((1 << (_la - 50)) & 469762051) !== 0) || ((((_la - 92)) & ~0x1F) === 0 && ((1 << (_la - 92)) & 55) !== 0)) {
                {
                {
                this.state = 1063;
                this.statement();
                }
                }
                this.state = 1068;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1069;
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
        this.enterRule(localContext, 170, Stage4Parser.RULE_forOfForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1071;
            this.match(Stage4Parser.LPAREN);
            this.state = 1072;
            this.match(Stage4Parser.FOROF);
            this.state = 1073;
            this.match(Stage4Parser.IDENTIFIER);
            this.state = 1074;
            this.expression();
            this.state = 1078;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 50)) & ~0x1F) === 0 && ((1 << (_la - 50)) & 469762051) !== 0) || ((((_la - 92)) & ~0x1F) === 0 && ((1 << (_la - 92)) & 55) !== 0)) {
                {
                {
                this.state = 1075;
                this.statement();
                }
                }
                this.state = 1080;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1081;
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
        this.enterRule(localContext, 172, Stage4Parser.RULE_expression);
        try {
            this.state = 1109;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 84, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1083;
                this.literal();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1084;
                this.match(Stage4Parser.KEYWORD);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 1085;
                this.match(Stage4Parser.IDENTIFIER);
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 1086;
                this.lambda();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 1087;
                this.fn();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 1088;
                this.bindExpr();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 1089;
                this.methodCallExpr();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 1090;
                this.objectExpr();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 1091;
                this.arrayExpr();
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 1092;
                this.propAccess();
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 1093;
                this.indexAccess();
                }
                break;
            case 12:
                this.enterOuterAlt(localContext, 12);
                {
                this.state = 1094;
                this.quasiquote();
                }
                break;
            case 13:
                this.enterOuterAlt(localContext, 13);
                {
                this.state = 1095;
                this.unquote();
                }
                break;
            case 14:
                this.enterOuterAlt(localContext, 14);
                {
                this.state = 1096;
                this.unquoteSplicing();
                }
                break;
            case 15:
                this.enterOuterAlt(localContext, 15);
                {
                this.state = 1097;
                this.ternary();
                }
                break;
            case 16:
                this.enterOuterAlt(localContext, 16);
                {
                this.state = 1098;
                this.condExpr();
                }
                break;
            case 17:
                this.enterOuterAlt(localContext, 17);
                {
                this.state = 1099;
                this.newForm();
                }
                break;
            case 18:
                this.enterOuterAlt(localContext, 18);
                {
                this.state = 1100;
                this.optChain();
                }
                break;
            case 19:
                this.enterOuterAlt(localContext, 19);
                {
                this.state = 1101;
                this.nullCoalesce();
                }
                break;
            case 20:
                this.enterOuterAlt(localContext, 20);
                {
                this.state = 1102;
                this.typeofExpr();
                }
                break;
            case 21:
                this.enterOuterAlt(localContext, 21);
                {
                this.state = 1103;
                this.typeAssert();
                }
                break;
            case 22:
                this.enterOuterAlt(localContext, 22);
                {
                this.state = 1104;
                this.thisExpr();
                }
                break;
            case 23:
                this.enterOuterAlt(localContext, 23);
                {
                this.state = 1105;
                this.superExpr();
                }
                break;
            case 24:
                this.enterOuterAlt(localContext, 24);
                {
                this.state = 1106;
                this.superConstructorCall();
                }
                break;
            case 25:
                this.enterOuterAlt(localContext, 25);
                {
                this.state = 1107;
                this.superMethodCall();
                }
                break;
            case 26:
                this.enterOuterAlt(localContext, 26);
                {
                this.state = 1108;
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
        this.enterRule(localContext, 174, Stage4Parser.RULE_thisExpr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1111;
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
        this.enterRule(localContext, 176, Stage4Parser.RULE_superExpr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1113;
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
        this.enterRule(localContext, 178, Stage4Parser.RULE_superConstructorCall);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1115;
            this.match(Stage4Parser.LPAREN);
            this.state = 1116;
            this.match(Stage4Parser.SUPER);
            this.state = 1120;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 50)) & ~0x1F) === 0 && ((1 << (_la - 50)) & 469762051) !== 0) || ((((_la - 92)) & ~0x1F) === 0 && ((1 << (_la - 92)) & 55) !== 0)) {
                {
                {
                this.state = 1117;
                this.expression();
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
    public superMethodCall(): SuperMethodCallContext {
        let localContext = new SuperMethodCallContext(this.context, this.state);
        this.enterRule(localContext, 180, Stage4Parser.RULE_superMethodCall);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1125;
            this.match(Stage4Parser.LPAREN);
            this.state = 1126;
            this.match(Stage4Parser.SUPER_METHOD);
            this.state = 1127;
            this.match(Stage4Parser.IDENTIFIER);
            this.state = 1131;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 50)) & ~0x1F) === 0 && ((1 << (_la - 50)) & 469762051) !== 0) || ((((_la - 92)) & ~0x1F) === 0 && ((1 << (_la - 92)) & 55) !== 0)) {
                {
                {
                this.state = 1128;
                this.expression();
                }
                }
                this.state = 1133;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1134;
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
        this.enterRule(localContext, 182, Stage4Parser.RULE_typeofExpr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1136;
            this.match(Stage4Parser.LPAREN);
            this.state = 1137;
            this.match(Stage4Parser.TYPEOF);
            this.state = 1138;
            this.expression();
            this.state = 1139;
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
        this.enterRule(localContext, 184, Stage4Parser.RULE_typeAssert);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1141;
            this.match(Stage4Parser.LPAREN);
            this.state = 1142;
            this.match(Stage4Parser.TYPE_AS);
            this.state = 1143;
            this.expression();
            this.state = 1144;
            this.typeExpr();
            this.state = 1145;
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
        this.enterRule(localContext, 186, Stage4Parser.RULE_lambda);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1147;
            this.match(Stage4Parser.LPAREN);
            this.state = 1148;
            this.match(Stage4Parser.LAMBDA);
            this.state = 1149;
            this.fnSignature();
            this.state = 1153;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 50)) & ~0x1F) === 0 && ((1 << (_la - 50)) & 469762051) !== 0) || ((((_la - 92)) & ~0x1F) === 0 && ((1 << (_la - 92)) & 55) !== 0)) {
                {
                {
                this.state = 1150;
                this.statement();
                }
                }
                this.state = 1155;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1156;
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
        this.enterRule(localContext, 188, Stage4Parser.RULE_fn);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1158;
            this.match(Stage4Parser.LPAREN);
            this.state = 1159;
            this.match(Stage4Parser.FN);
            this.state = 1160;
            this.fnSignature();
            this.state = 1164;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 50)) & ~0x1F) === 0 && ((1 << (_la - 50)) & 469762051) !== 0) || ((((_la - 92)) & ~0x1F) === 0 && ((1 << (_la - 92)) & 55) !== 0)) {
                {
                {
                this.state = 1161;
                this.statement();
                }
                }
                this.state = 1166;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1167;
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
        this.enterRule(localContext, 190, Stage4Parser.RULE_bindExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1169;
            this.match(Stage4Parser.LPAREN);
            this.state = 1170;
            this.match(Stage4Parser.BIND);
            this.state = 1171;
            this.expression();
            this.state = 1172;
            this.expression();
            this.state = 1176;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 50)) & ~0x1F) === 0 && ((1 << (_la - 50)) & 469762051) !== 0) || ((((_la - 92)) & ~0x1F) === 0 && ((1 << (_la - 92)) & 55) !== 0)) {
                {
                {
                this.state = 1173;
                this.expression();
                }
                }
                this.state = 1178;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1179;
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
        this.enterRule(localContext, 192, Stage4Parser.RULE_methodCallExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1181;
            this.match(Stage4Parser.LPAREN);
            this.state = 1182;
            this.match(Stage4Parser.METHOD_CALL);
            this.state = 1183;
            this.expression();
            this.state = 1184;
            this.expression();
            this.state = 1188;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 50)) & ~0x1F) === 0 && ((1 << (_la - 50)) & 469762051) !== 0) || ((((_la - 92)) & ~0x1F) === 0 && ((1 << (_la - 92)) & 55) !== 0)) {
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
        this.enterRule(localContext, 194, Stage4Parser.RULE_ternary);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1193;
            this.match(Stage4Parser.LPAREN);
            this.state = 1194;
            this.match(Stage4Parser.TERNARY);
            this.state = 1195;
            this.expression();
            this.state = 1196;
            this.expression();
            this.state = 1197;
            this.expression();
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
    public condExpr(): CondExprContext {
        let localContext = new CondExprContext(this.context, this.state);
        this.enterRule(localContext, 196, Stage4Parser.RULE_condExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1200;
            this.match(Stage4Parser.LPAREN);
            this.state = 1201;
            this.match(Stage4Parser.COND);
            this.state = 1205;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 1202;
                this.expression();
                this.state = 1203;
                this.expression();
                }
                }
                this.state = 1207;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || ((((_la - 50)) & ~0x1F) === 0 && ((1 << (_la - 50)) & 469762051) !== 0) || ((((_la - 92)) & ~0x1F) === 0 && ((1 << (_la - 92)) & 55) !== 0));
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
    public newForm(): NewFormContext {
        let localContext = new NewFormContext(this.context, this.state);
        this.enterRule(localContext, 198, Stage4Parser.RULE_newForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1211;
            this.match(Stage4Parser.LPAREN);
            this.state = 1212;
            this.match(Stage4Parser.NEW);
            this.state = 1213;
            this.match(Stage4Parser.IDENTIFIER);
            this.state = 1215;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 92, this.context) ) {
            case 1:
                {
                this.state = 1214;
                this.typeArgs();
                }
                break;
            }
            this.state = 1220;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 50)) & ~0x1F) === 0 && ((1 << (_la - 50)) & 469762051) !== 0) || ((((_la - 92)) & ~0x1F) === 0 && ((1 << (_la - 92)) & 55) !== 0)) {
                {
                {
                this.state = 1217;
                this.expression();
                }
                }
                this.state = 1222;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1223;
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
        this.enterRule(localContext, 200, Stage4Parser.RULE_objectExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1225;
            this.match(Stage4Parser.LPAREN);
            this.state = 1226;
            this.match(Stage4Parser.OBJECT);
            this.state = 1230;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 1227;
                this.objectField();
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
    public objectField(): ObjectFieldContext {
        let localContext = new ObjectFieldContext(this.context, this.state);
        this.enterRule(localContext, 202, Stage4Parser.RULE_objectField);
        try {
            this.state = 1248;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 95, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1235;
                this.match(Stage4Parser.LPAREN);
                this.state = 1236;
                this.propKey();
                this.state = 1237;
                this.expression();
                this.state = 1238;
                this.match(Stage4Parser.RPAREN);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1240;
                this.match(Stage4Parser.LPAREN);
                this.state = 1241;
                this.propKey();
                this.state = 1242;
                this.methodDef();
                this.state = 1243;
                this.match(Stage4Parser.RPAREN);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 1245;
                this.match(Stage4Parser.LPAREN);
                this.state = 1246;
                this.match(Stage4Parser.IDENTIFIER);
                this.state = 1247;
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
        this.enterRule(localContext, 204, Stage4Parser.RULE_methodDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1250;
            this.match(Stage4Parser.LPAREN);
            this.state = 1251;
            this.match(Stage4Parser.METHOD);
            this.state = 1252;
            this.fnSignature();
            this.state = 1256;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 50)) & ~0x1F) === 0 && ((1 << (_la - 50)) & 469762051) !== 0) || ((((_la - 92)) & ~0x1F) === 0 && ((1 << (_la - 92)) & 55) !== 0)) {
                {
                {
                this.state = 1253;
                this.statement();
                }
                }
                this.state = 1258;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1259;
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
        this.enterRule(localContext, 206, Stage4Parser.RULE_arrayExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1261;
            this.match(Stage4Parser.LPAREN);
            this.state = 1262;
            this.match(Stage4Parser.ARRAY);
            this.state = 1266;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 50)) & ~0x1F) === 0 && ((1 << (_la - 50)) & 469762051) !== 0) || ((((_la - 92)) & ~0x1F) === 0 && ((1 << (_la - 92)) & 55) !== 0)) {
                {
                {
                this.state = 1263;
                this.expression();
                }
                }
                this.state = 1268;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1269;
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
        this.enterRule(localContext, 208, Stage4Parser.RULE_propKey);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1271;
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
        this.enterRule(localContext, 210, Stage4Parser.RULE_propAccess);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1273;
            this.match(Stage4Parser.LPAREN);
            this.state = 1274;
            this.match(Stage4Parser.DOT);
            this.state = 1275;
            this.expression();
            this.state = 1276;
            this.propKey();
            this.state = 1277;
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
        this.enterRule(localContext, 212, Stage4Parser.RULE_indexAccess);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1279;
            this.match(Stage4Parser.LPAREN);
            this.state = 1280;
            this.match(Stage4Parser.INDEX);
            this.state = 1281;
            this.expression();
            this.state = 1282;
            this.expression();
            this.state = 1283;
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
        this.enterRule(localContext, 214, Stage4Parser.RULE_quasiquote);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1285;
            this.match(Stage4Parser.LPAREN);
            this.state = 1286;
            _la = this.tokenStream.LA(1);
            if(!(_la === 32 || _la === 33)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 1287;
            this.expression();
            this.state = 1288;
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
        this.enterRule(localContext, 216, Stage4Parser.RULE_unquote);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1290;
            this.match(Stage4Parser.LPAREN);
            this.state = 1291;
            this.match(Stage4Parser.UNQUOTE);
            this.state = 1292;
            this.expression();
            this.state = 1293;
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
        this.enterRule(localContext, 218, Stage4Parser.RULE_unquoteSplicing);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1295;
            this.match(Stage4Parser.LPAREN);
            this.state = 1296;
            this.match(Stage4Parser.UNQUOTE_SPLICING);
            this.state = 1297;
            this.expression();
            this.state = 1298;
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
        this.enterRule(localContext, 220, Stage4Parser.RULE_optChain);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1300;
            this.match(Stage4Parser.LPAREN);
            this.state = 1301;
            this.match(Stage4Parser.OPTCHAIN);
            this.state = 1302;
            this.expression();
            this.state = 1303;
            this.propKey();
            this.state = 1304;
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
        this.enterRule(localContext, 222, Stage4Parser.RULE_nullCoalesce);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1306;
            this.match(Stage4Parser.LPAREN);
            this.state = 1307;
            this.match(Stage4Parser.NULLCOAL);
            this.state = 1308;
            this.expression();
            this.state = 1309;
            this.expression();
            this.state = 1310;
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
        this.enterRule(localContext, 224, Stage4Parser.RULE_call);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1312;
            this.match(Stage4Parser.LPAREN);
            this.state = 1313;
            this.expression();
            this.state = 1315;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 98, this.context) ) {
            case 1:
                {
                this.state = 1314;
                this.typeArgs();
                }
                break;
            }
            this.state = 1320;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 50)) & ~0x1F) === 0 && ((1 << (_la - 50)) & 469762051) !== 0) || ((((_la - 92)) & ~0x1F) === 0 && ((1 << (_la - 92)) & 55) !== 0)) {
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
        this.enterRule(localContext, 226, Stage4Parser.RULE_typeArgs);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1325;
            this.match(Stage4Parser.LPAREN);
            this.state = 1326;
            this.match(Stage4Parser.TYPE_ARGS);
            this.state = 1328;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 1327;
                this.typeExpr();
                }
                }
                this.state = 1330;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 97);
            this.state = 1332;
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
        this.enterRule(localContext, 228, Stage4Parser.RULE_fnSignature);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1334;
            this.match(Stage4Parser.LPAREN);
            this.state = 1345;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2) {
                {
                this.state = 1335;
                this.param();
                this.state = 1342;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 2 || _la === 4) {
                    {
                    {
                    this.state = 1337;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    if (_la === 4) {
                        {
                        this.state = 1336;
                        this.match(Stage4Parser.COMMA);
                        }
                    }

                    this.state = 1339;
                    this.param();
                    }
                    }
                    this.state = 1344;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
            }

            this.state = 1347;
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
        this.enterRule(localContext, 230, Stage4Parser.RULE_param);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1349;
            this.match(Stage4Parser.LPAREN);
            this.state = 1350;
            this.match(Stage4Parser.IDENTIFIER);
            this.state = 1351;
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
        this.enterRule(localContext, 232, Stage4Parser.RULE_literal);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1353;
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
        4,1,98,1356,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,
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
        2,115,7,115,2,116,7,116,1,0,1,0,1,0,5,0,238,8,0,10,0,12,0,241,9,
        0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,1,253,8,1,1,2,1,2,1,
        2,1,2,3,2,259,8,2,1,3,1,3,1,3,1,3,1,3,5,3,266,8,3,10,3,12,3,269,
        9,3,1,3,1,3,1,4,1,4,1,4,1,4,1,4,1,5,1,5,1,5,1,5,1,5,1,5,1,6,1,6,
        1,6,1,6,3,6,288,8,6,1,6,1,6,1,6,1,7,1,7,1,7,1,7,3,7,297,8,7,1,7,
        3,7,300,8,7,1,7,1,7,1,7,1,8,1,8,1,8,4,8,308,8,8,11,8,12,8,309,1,
        8,1,8,1,9,1,9,1,9,5,9,317,8,9,10,9,12,9,320,9,9,1,9,1,9,3,9,324,
        8,9,1,9,3,9,327,8,9,1,9,3,9,330,8,9,1,9,1,9,1,9,1,10,1,10,1,10,5,
        10,338,8,10,10,10,12,10,341,9,10,1,10,3,10,344,8,10,1,10,3,10,347,
        8,10,1,10,1,10,1,10,1,11,1,11,1,11,1,11,1,11,1,12,1,12,1,12,4,12,
        360,8,12,11,12,12,12,361,1,12,1,12,1,13,1,13,1,13,5,13,369,8,13,
        10,13,12,13,372,9,13,1,13,1,13,1,14,1,14,1,14,1,14,1,14,1,14,3,14,
        382,8,14,1,15,1,15,1,16,1,16,1,16,5,16,389,8,16,10,16,12,16,392,
        9,16,1,16,1,16,1,16,3,16,397,8,16,1,16,3,16,400,8,16,1,16,1,16,1,
        17,1,17,1,17,1,17,5,17,408,8,17,10,17,12,17,411,9,17,1,17,1,17,1,
        18,1,18,1,18,5,18,418,8,18,10,18,12,18,421,9,18,1,18,1,18,1,18,5,
        18,426,8,18,10,18,12,18,429,9,18,1,18,1,18,1,19,1,19,1,19,5,19,436,
        8,19,10,19,12,19,439,9,19,1,19,1,19,1,19,1,19,1,20,1,20,1,20,5,20,
        448,8,20,10,20,12,20,451,9,20,1,20,1,20,1,20,5,20,456,8,20,10,20,
        12,20,459,9,20,1,20,1,20,1,21,1,21,1,21,5,21,466,8,21,10,21,12,21,
        469,9,21,1,21,1,21,1,21,5,21,474,8,21,10,21,12,21,477,9,21,1,21,
        1,21,1,22,1,22,1,22,3,22,484,8,22,1,22,1,22,3,22,488,8,22,1,22,1,
        22,1,23,1,23,1,23,3,23,495,8,23,1,23,5,23,498,8,23,10,23,12,23,501,
        9,23,3,23,503,8,23,1,23,1,23,1,23,1,23,1,23,1,23,3,23,511,8,23,1,
        24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,
        24,1,24,1,24,1,24,1,24,3,24,531,8,24,1,25,1,25,1,25,1,25,5,25,537,
        8,25,10,25,12,25,540,9,25,1,25,1,25,5,25,544,8,25,10,25,12,25,547,
        9,25,1,25,1,25,1,26,1,26,1,26,1,26,1,26,1,26,1,27,1,27,1,27,1,27,
        5,27,561,8,27,10,27,12,27,564,9,27,1,27,1,27,5,27,568,8,27,10,27,
        12,27,571,9,27,1,27,1,27,1,28,1,28,1,28,1,28,1,28,1,28,1,29,1,29,
        1,29,1,29,1,29,3,29,586,8,29,1,29,1,29,1,30,1,30,1,30,1,30,5,30,
        594,8,30,10,30,12,30,597,9,30,1,30,1,30,1,31,1,31,1,31,5,31,604,
        8,31,10,31,12,31,607,9,31,1,31,1,31,1,32,1,32,1,32,3,32,614,8,32,
        1,32,1,32,1,33,1,33,1,33,1,33,1,33,1,34,1,34,1,34,3,34,626,8,34,
        1,34,1,34,1,34,1,35,1,35,1,35,1,35,1,35,1,35,1,36,1,36,1,36,4,36,
        640,8,36,11,36,12,36,641,1,36,1,36,1,37,1,37,1,37,1,37,1,37,3,37,
        651,8,37,1,38,1,38,1,38,1,38,1,38,1,38,1,38,1,38,1,38,3,38,662,8,
        38,1,39,1,39,1,39,1,39,1,39,1,39,1,40,1,40,1,40,1,40,1,40,1,40,1,
        40,1,40,1,40,1,40,1,40,1,40,1,40,1,40,1,40,1,40,1,40,1,40,1,40,1,
        40,3,40,690,8,40,1,41,1,41,1,41,4,41,695,8,41,11,41,12,41,696,1,
        41,1,41,1,42,1,42,1,42,3,42,704,8,42,1,42,1,42,1,43,1,43,1,43,1,
        43,4,43,712,8,43,11,43,12,43,713,1,43,1,43,1,44,1,44,1,44,1,44,1,
        44,1,45,1,45,1,45,1,45,1,45,1,45,1,46,1,46,1,46,4,46,732,8,46,11,
        46,12,46,733,1,46,1,46,1,47,1,47,1,47,1,47,4,47,742,8,47,11,47,12,
        47,743,1,47,1,47,1,48,1,48,1,48,1,48,1,48,1,49,1,49,1,49,1,49,1,
        49,1,50,1,50,1,50,1,50,3,50,762,8,50,1,50,1,50,1,50,1,51,1,51,1,
        51,1,51,3,51,771,8,51,1,51,1,51,1,52,1,52,1,52,1,52,1,52,1,52,1,
        52,1,52,1,52,1,52,1,52,1,52,1,52,1,52,1,52,1,52,3,52,791,8,52,1,
        53,1,53,1,53,1,53,4,53,797,8,53,11,53,12,53,798,1,53,1,53,1,54,1,
        54,1,54,1,54,4,54,807,8,54,11,54,12,54,808,1,54,1,54,1,55,1,55,1,
        55,1,55,1,55,1,56,1,56,1,56,4,56,821,8,56,11,56,12,56,822,1,56,1,
        56,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,3,57,838,
        8,57,1,58,1,58,1,58,3,58,843,8,58,1,58,1,58,5,58,847,8,58,10,58,
        12,58,850,9,58,1,58,1,58,1,58,1,58,1,59,1,59,1,59,3,59,859,8,59,
        1,59,1,59,1,59,1,60,1,60,1,60,5,60,867,8,60,10,60,12,60,870,9,60,
        1,60,1,60,1,61,1,61,5,61,876,8,61,10,61,12,61,879,9,61,1,61,1,61,
        3,61,883,8,61,1,61,1,61,1,61,1,62,1,62,1,63,1,63,1,63,1,63,1,63,
        1,64,1,64,1,64,1,64,1,64,1,65,1,65,1,65,1,65,1,65,1,66,1,66,1,66,
        1,66,1,66,1,66,1,67,1,67,1,67,1,67,1,67,1,67,1,67,1,67,1,68,1,68,
        1,68,1,68,1,68,1,69,1,69,1,69,1,69,1,69,3,69,929,8,69,1,69,1,69,
        1,69,1,70,1,70,1,70,4,70,937,8,70,11,70,12,70,938,1,70,1,70,1,71,
        1,71,1,72,1,72,1,72,4,72,948,8,72,11,72,12,72,949,1,72,1,72,1,73,
        1,73,3,73,956,8,73,1,74,1,74,1,74,4,74,961,8,74,11,74,12,74,962,
        1,74,1,74,1,75,1,75,1,75,4,75,970,8,75,11,75,12,75,971,1,75,1,75,
        1,76,1,76,1,76,1,76,3,76,980,8,76,1,76,3,76,983,8,76,1,76,3,76,986,
        8,76,1,77,1,77,1,77,1,77,1,77,1,78,1,78,1,78,1,78,1,78,1,79,1,79,
        1,79,1,79,1,79,1,79,1,79,1,79,1,79,1,79,1,79,1,79,3,79,1010,8,79,
        1,80,1,80,1,80,1,80,5,80,1016,8,80,10,80,12,80,1019,9,80,1,80,3,
        80,1022,8,80,1,80,1,80,1,81,1,81,1,81,1,81,5,81,1030,8,81,10,81,
        12,81,1033,9,81,1,81,1,81,1,82,1,82,1,82,5,82,1040,8,82,10,82,12,
        82,1043,9,82,1,82,1,82,1,83,1,83,1,83,1,83,1,83,1,83,5,83,1053,8,
        83,10,83,12,83,1056,9,83,1,83,1,83,1,84,1,84,1,84,1,84,1,84,5,84,
        1065,8,84,10,84,12,84,1068,9,84,1,84,1,84,1,85,1,85,1,85,1,85,1,
        85,5,85,1077,8,85,10,85,12,85,1080,9,85,1,85,1,85,1,86,1,86,1,86,
        1,86,1,86,1,86,1,86,1,86,1,86,1,86,1,86,1,86,1,86,1,86,1,86,1,86,
        1,86,1,86,1,86,1,86,1,86,1,86,1,86,1,86,1,86,1,86,3,86,1110,8,86,
        1,87,1,87,1,88,1,88,1,89,1,89,1,89,5,89,1119,8,89,10,89,12,89,1122,
        9,89,1,89,1,89,1,90,1,90,1,90,1,90,5,90,1130,8,90,10,90,12,90,1133,
        9,90,1,90,1,90,1,91,1,91,1,91,1,91,1,91,1,92,1,92,1,92,1,92,1,92,
        1,92,1,93,1,93,1,93,1,93,5,93,1152,8,93,10,93,12,93,1155,9,93,1,
        93,1,93,1,94,1,94,1,94,1,94,5,94,1163,8,94,10,94,12,94,1166,9,94,
        1,94,1,94,1,95,1,95,1,95,1,95,1,95,5,95,1175,8,95,10,95,12,95,1178,
        9,95,1,95,1,95,1,96,1,96,1,96,1,96,1,96,5,96,1187,8,96,10,96,12,
        96,1190,9,96,1,96,1,96,1,97,1,97,1,97,1,97,1,97,1,97,1,97,1,98,1,
        98,1,98,1,98,1,98,4,98,1206,8,98,11,98,12,98,1207,1,98,1,98,1,99,
        1,99,1,99,1,99,3,99,1216,8,99,1,99,5,99,1219,8,99,10,99,12,99,1222,
        9,99,1,99,1,99,1,100,1,100,1,100,5,100,1229,8,100,10,100,12,100,
        1232,9,100,1,100,1,100,1,101,1,101,1,101,1,101,1,101,1,101,1,101,
        1,101,1,101,1,101,1,101,1,101,1,101,3,101,1249,8,101,1,102,1,102,
        1,102,1,102,5,102,1255,8,102,10,102,12,102,1258,9,102,1,102,1,102,
        1,103,1,103,1,103,5,103,1265,8,103,10,103,12,103,1268,9,103,1,103,
        1,103,1,104,1,104,1,105,1,105,1,105,1,105,1,105,1,105,1,106,1,106,
        1,106,1,106,1,106,1,106,1,107,1,107,1,107,1,107,1,107,1,108,1,108,
        1,108,1,108,1,108,1,109,1,109,1,109,1,109,1,109,1,110,1,110,1,110,
        1,110,1,110,1,110,1,111,1,111,1,111,1,111,1,111,1,111,1,112,1,112,
        1,112,3,112,1316,8,112,1,112,5,112,1319,8,112,10,112,12,112,1322,
        9,112,1,112,1,112,1,113,1,113,1,113,4,113,1329,8,113,11,113,12,113,
        1330,1,113,1,113,1,114,1,114,1,114,3,114,1338,8,114,1,114,5,114,
        1341,8,114,10,114,12,114,1344,9,114,3,114,1346,8,114,1,114,1,114,
        1,115,1,115,1,115,1,115,1,116,1,116,1,116,0,0,117,0,2,4,6,8,10,12,
        14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,
        58,60,62,64,66,68,70,72,74,76,78,80,82,84,86,88,90,92,94,96,98,100,
        102,104,106,108,110,112,114,116,118,120,122,124,126,128,130,132,
        134,136,138,140,142,144,146,148,150,152,154,156,158,160,162,164,
        166,168,170,172,174,176,178,180,182,184,186,188,190,192,194,196,
        198,200,202,204,206,208,210,212,214,216,218,220,222,224,226,228,
        230,232,0,5,3,0,76,76,93,94,96,96,2,0,67,67,75,75,7,0,5,27,30,30,
        32,74,76,78,82,92,94,94,96,97,1,0,32,33,3,0,76,78,93,94,96,96,1419,
        0,234,1,0,0,0,2,252,1,0,0,0,4,258,1,0,0,0,6,260,1,0,0,0,8,272,1,
        0,0,0,10,277,1,0,0,0,12,283,1,0,0,0,14,292,1,0,0,0,16,304,1,0,0,
        0,18,313,1,0,0,0,20,334,1,0,0,0,22,351,1,0,0,0,24,356,1,0,0,0,26,
        365,1,0,0,0,28,381,1,0,0,0,30,383,1,0,0,0,32,385,1,0,0,0,34,403,
        1,0,0,0,36,414,1,0,0,0,38,432,1,0,0,0,40,444,1,0,0,0,42,462,1,0,
        0,0,44,480,1,0,0,0,46,491,1,0,0,0,48,530,1,0,0,0,50,532,1,0,0,0,
        52,550,1,0,0,0,54,556,1,0,0,0,56,574,1,0,0,0,58,580,1,0,0,0,60,589,
        1,0,0,0,62,600,1,0,0,0,64,610,1,0,0,0,66,617,1,0,0,0,68,622,1,0,
        0,0,70,630,1,0,0,0,72,636,1,0,0,0,74,650,1,0,0,0,76,661,1,0,0,0,
        78,663,1,0,0,0,80,689,1,0,0,0,82,691,1,0,0,0,84,700,1,0,0,0,86,707,
        1,0,0,0,88,717,1,0,0,0,90,722,1,0,0,0,92,728,1,0,0,0,94,737,1,0,
        0,0,96,747,1,0,0,0,98,752,1,0,0,0,100,757,1,0,0,0,102,766,1,0,0,
        0,104,790,1,0,0,0,106,792,1,0,0,0,108,802,1,0,0,0,110,812,1,0,0,
        0,112,817,1,0,0,0,114,837,1,0,0,0,116,839,1,0,0,0,118,855,1,0,0,
        0,120,863,1,0,0,0,122,873,1,0,0,0,124,887,1,0,0,0,126,889,1,0,0,
        0,128,894,1,0,0,0,130,899,1,0,0,0,132,904,1,0,0,0,134,910,1,0,0,
        0,136,918,1,0,0,0,138,923,1,0,0,0,140,933,1,0,0,0,142,942,1,0,0,
        0,144,944,1,0,0,0,146,955,1,0,0,0,148,957,1,0,0,0,150,966,1,0,0,
        0,152,985,1,0,0,0,154,987,1,0,0,0,156,992,1,0,0,0,158,1009,1,0,0,
        0,160,1011,1,0,0,0,162,1025,1,0,0,0,164,1036,1,0,0,0,166,1046,1,
        0,0,0,168,1059,1,0,0,0,170,1071,1,0,0,0,172,1109,1,0,0,0,174,1111,
        1,0,0,0,176,1113,1,0,0,0,178,1115,1,0,0,0,180,1125,1,0,0,0,182,1136,
        1,0,0,0,184,1141,1,0,0,0,186,1147,1,0,0,0,188,1158,1,0,0,0,190,1169,
        1,0,0,0,192,1181,1,0,0,0,194,1193,1,0,0,0,196,1200,1,0,0,0,198,1211,
        1,0,0,0,200,1225,1,0,0,0,202,1248,1,0,0,0,204,1250,1,0,0,0,206,1261,
        1,0,0,0,208,1271,1,0,0,0,210,1273,1,0,0,0,212,1279,1,0,0,0,214,1285,
        1,0,0,0,216,1290,1,0,0,0,218,1295,1,0,0,0,220,1300,1,0,0,0,222,1306,
        1,0,0,0,224,1312,1,0,0,0,226,1325,1,0,0,0,228,1334,1,0,0,0,230,1349,
        1,0,0,0,232,1353,1,0,0,0,234,235,5,2,0,0,235,239,5,5,0,0,236,238,
        3,2,1,0,237,236,1,0,0,0,238,241,1,0,0,0,239,237,1,0,0,0,239,240,
        1,0,0,0,240,242,1,0,0,0,241,239,1,0,0,0,242,243,5,3,0,0,243,1,1,
        0,0,0,244,253,3,6,3,0,245,253,3,8,4,0,246,253,3,10,5,0,247,253,3,
        12,6,0,248,253,3,14,7,0,249,253,3,18,9,0,250,253,3,98,49,0,251,253,
        3,48,24,0,252,244,1,0,0,0,252,245,1,0,0,0,252,246,1,0,0,0,252,247,
        1,0,0,0,252,248,1,0,0,0,252,249,1,0,0,0,252,250,1,0,0,0,252,251,
        1,0,0,0,253,3,1,0,0,0,254,259,3,10,5,0,255,259,3,18,9,0,256,259,
        3,14,7,0,257,259,3,12,6,0,258,254,1,0,0,0,258,255,1,0,0,0,258,256,
        1,0,0,0,258,257,1,0,0,0,259,5,1,0,0,0,260,261,5,2,0,0,261,262,5,
        16,0,0,262,263,5,97,0,0,263,267,3,228,114,0,264,266,3,48,24,0,265,
        264,1,0,0,0,266,269,1,0,0,0,267,265,1,0,0,0,267,268,1,0,0,0,268,
        270,1,0,0,0,269,267,1,0,0,0,270,271,5,3,0,0,271,7,1,0,0,0,272,273,
        5,2,0,0,273,274,5,17,0,0,274,275,3,10,5,0,275,276,5,3,0,0,276,9,
        1,0,0,0,277,278,5,2,0,0,278,279,5,15,0,0,279,280,5,97,0,0,280,281,
        3,172,86,0,281,282,5,3,0,0,282,11,1,0,0,0,283,284,5,2,0,0,284,285,
        5,72,0,0,285,287,5,97,0,0,286,288,3,150,75,0,287,286,1,0,0,0,287,
        288,1,0,0,0,288,289,1,0,0,0,289,290,3,104,52,0,290,291,5,3,0,0,291,
        13,1,0,0,0,292,293,5,2,0,0,293,294,5,73,0,0,294,296,5,97,0,0,295,
        297,3,150,75,0,296,295,1,0,0,0,296,297,1,0,0,0,297,299,1,0,0,0,298,
        300,3,16,8,0,299,298,1,0,0,0,299,300,1,0,0,0,300,301,1,0,0,0,301,
        302,3,120,60,0,302,303,5,3,0,0,303,15,1,0,0,0,304,305,5,2,0,0,305,
        307,5,70,0,0,306,308,3,104,52,0,307,306,1,0,0,0,308,309,1,0,0,0,
        309,307,1,0,0,0,309,310,1,0,0,0,310,311,1,0,0,0,311,312,5,3,0,0,
        312,17,1,0,0,0,313,314,5,2,0,0,314,318,5,47,0,0,315,317,3,30,15,
        0,316,315,1,0,0,0,317,320,1,0,0,0,318,316,1,0,0,0,318,319,1,0,0,
        0,319,321,1,0,0,0,320,318,1,0,0,0,321,323,5,97,0,0,322,324,3,150,
        75,0,323,322,1,0,0,0,323,324,1,0,0,0,324,326,1,0,0,0,325,327,3,22,
        11,0,326,325,1,0,0,0,326,327,1,0,0,0,327,329,1,0,0,0,328,330,3,24,
        12,0,329,328,1,0,0,0,329,330,1,0,0,0,330,331,1,0,0,0,331,332,3,26,
        13,0,332,333,5,3,0,0,333,19,1,0,0,0,334,335,5,2,0,0,335,339,5,47,
        0,0,336,338,3,30,15,0,337,336,1,0,0,0,338,341,1,0,0,0,339,337,1,
        0,0,0,339,340,1,0,0,0,340,343,1,0,0,0,341,339,1,0,0,0,342,344,3,
        22,11,0,343,342,1,0,0,0,343,344,1,0,0,0,344,346,1,0,0,0,345,347,
        3,24,12,0,346,345,1,0,0,0,346,347,1,0,0,0,347,348,1,0,0,0,348,349,
        3,26,13,0,349,350,5,3,0,0,350,21,1,0,0,0,351,352,5,2,0,0,352,353,
        5,70,0,0,353,354,3,104,52,0,354,355,5,3,0,0,355,23,1,0,0,0,356,357,
        5,2,0,0,357,359,5,54,0,0,358,360,3,104,52,0,359,358,1,0,0,0,360,
        361,1,0,0,0,361,359,1,0,0,0,361,362,1,0,0,0,362,363,1,0,0,0,363,
        364,5,3,0,0,364,25,1,0,0,0,365,366,5,2,0,0,366,370,5,44,0,0,367,
        369,3,28,14,0,368,367,1,0,0,0,369,372,1,0,0,0,370,368,1,0,0,0,370,
        371,1,0,0,0,371,373,1,0,0,0,372,370,1,0,0,0,373,374,5,3,0,0,374,
        27,1,0,0,0,375,382,3,32,16,0,376,382,3,34,17,0,377,382,3,36,18,0,
        378,382,3,38,19,0,379,382,3,40,20,0,380,382,3,42,21,0,381,375,1,
        0,0,0,381,376,1,0,0,0,381,377,1,0,0,0,381,378,1,0,0,0,381,379,1,
        0,0,0,381,380,1,0,0,0,382,29,1,0,0,0,383,384,5,92,0,0,384,31,1,0,
        0,0,385,386,5,2,0,0,386,390,5,48,0,0,387,389,3,30,15,0,388,387,1,
        0,0,0,389,392,1,0,0,0,390,388,1,0,0,0,390,391,1,0,0,0,391,393,1,
        0,0,0,392,390,1,0,0,0,393,396,5,97,0,0,394,395,5,79,0,0,395,397,
        3,104,52,0,396,394,1,0,0,0,396,397,1,0,0,0,397,399,1,0,0,0,398,400,
        3,172,86,0,399,398,1,0,0,0,399,400,1,0,0,0,400,401,1,0,0,0,401,402,
        5,3,0,0,402,33,1,0,0,0,403,404,5,2,0,0,404,405,5,49,0,0,405,409,
        3,46,23,0,406,408,3,48,24,0,407,406,1,0,0,0,408,411,1,0,0,0,409,
        407,1,0,0,0,409,410,1,0,0,0,410,412,1,0,0,0,411,409,1,0,0,0,412,
        413,5,3,0,0,413,35,1,0,0,0,414,415,5,2,0,0,415,419,5,12,0,0,416,
        418,3,30,15,0,417,416,1,0,0,0,418,421,1,0,0,0,419,417,1,0,0,0,419,
        420,1,0,0,0,420,422,1,0,0,0,421,419,1,0,0,0,422,423,5,97,0,0,423,
        427,3,46,23,0,424,426,3,48,24,0,425,424,1,0,0,0,426,429,1,0,0,0,
        427,425,1,0,0,0,427,428,1,0,0,0,428,430,1,0,0,0,429,427,1,0,0,0,
        430,431,5,3,0,0,431,37,1,0,0,0,432,433,5,2,0,0,433,437,5,46,0,0,
        434,436,3,30,15,0,435,434,1,0,0,0,436,439,1,0,0,0,437,435,1,0,0,
        0,437,438,1,0,0,0,438,440,1,0,0,0,439,437,1,0,0,0,440,441,5,97,0,
        0,441,442,3,46,23,0,442,443,5,3,0,0,443,39,1,0,0,0,444,445,5,2,0,
        0,445,449,5,52,0,0,446,448,3,30,15,0,447,446,1,0,0,0,448,451,1,0,
        0,0,449,447,1,0,0,0,449,450,1,0,0,0,450,452,1,0,0,0,451,449,1,0,
        0,0,452,453,5,97,0,0,453,457,3,46,23,0,454,456,3,48,24,0,455,454,
        1,0,0,0,456,459,1,0,0,0,457,455,1,0,0,0,457,458,1,0,0,0,458,460,
        1,0,0,0,459,457,1,0,0,0,460,461,5,3,0,0,461,41,1,0,0,0,462,463,5,
        2,0,0,463,467,5,53,0,0,464,466,3,30,15,0,465,464,1,0,0,0,466,469,
        1,0,0,0,467,465,1,0,0,0,467,468,1,0,0,0,468,470,1,0,0,0,469,467,
        1,0,0,0,470,471,5,97,0,0,471,475,3,46,23,0,472,474,3,48,24,0,473,
        472,1,0,0,0,474,477,1,0,0,0,475,473,1,0,0,0,475,476,1,0,0,0,476,
        478,1,0,0,0,477,475,1,0,0,0,478,479,5,3,0,0,479,43,1,0,0,0,480,481,
        5,2,0,0,481,483,5,97,0,0,482,484,5,75,0,0,483,482,1,0,0,0,483,484,
        1,0,0,0,484,487,1,0,0,0,485,486,5,79,0,0,486,488,3,104,52,0,487,
        485,1,0,0,0,487,488,1,0,0,0,488,489,1,0,0,0,489,490,5,3,0,0,490,
        45,1,0,0,0,491,502,5,2,0,0,492,499,3,44,22,0,493,495,5,4,0,0,494,
        493,1,0,0,0,494,495,1,0,0,0,495,496,1,0,0,0,496,498,3,44,22,0,497,
        494,1,0,0,0,498,501,1,0,0,0,499,497,1,0,0,0,499,500,1,0,0,0,500,
        503,1,0,0,0,501,499,1,0,0,0,502,492,1,0,0,0,502,503,1,0,0,0,503,
        504,1,0,0,0,504,510,5,3,0,0,505,506,5,2,0,0,506,507,5,71,0,0,507,
        508,3,104,52,0,508,509,5,3,0,0,509,511,1,0,0,0,510,505,1,0,0,0,510,
        511,1,0,0,0,511,47,1,0,0,0,512,531,3,50,25,0,513,531,3,52,26,0,514,
        531,3,54,27,0,515,531,3,56,28,0,516,531,3,58,29,0,517,531,3,60,30,
        0,518,531,3,62,31,0,519,531,3,64,32,0,520,531,3,66,33,0,521,531,
        3,68,34,0,522,531,3,70,35,0,523,531,3,76,38,0,524,531,3,160,80,0,
        525,531,3,166,83,0,526,531,3,168,84,0,527,531,3,170,85,0,528,531,
        3,158,79,0,529,531,3,172,86,0,530,512,1,0,0,0,530,513,1,0,0,0,530,
        514,1,0,0,0,530,515,1,0,0,0,530,516,1,0,0,0,530,517,1,0,0,0,530,
        518,1,0,0,0,530,519,1,0,0,0,530,520,1,0,0,0,530,521,1,0,0,0,530,
        522,1,0,0,0,530,523,1,0,0,0,530,524,1,0,0,0,530,525,1,0,0,0,530,
        526,1,0,0,0,530,527,1,0,0,0,530,528,1,0,0,0,530,529,1,0,0,0,531,
        49,1,0,0,0,532,533,5,2,0,0,533,534,5,6,0,0,534,538,5,2,0,0,535,537,
        3,100,50,0,536,535,1,0,0,0,537,540,1,0,0,0,538,536,1,0,0,0,538,539,
        1,0,0,0,539,541,1,0,0,0,540,538,1,0,0,0,541,545,5,3,0,0,542,544,
        3,48,24,0,543,542,1,0,0,0,544,547,1,0,0,0,545,543,1,0,0,0,545,546,
        1,0,0,0,546,548,1,0,0,0,547,545,1,0,0,0,548,549,5,3,0,0,549,51,1,
        0,0,0,550,551,5,2,0,0,551,552,5,7,0,0,552,553,3,102,51,0,553,554,
        3,172,86,0,554,555,5,3,0,0,555,53,1,0,0,0,556,557,5,2,0,0,557,558,
        5,8,0,0,558,562,5,2,0,0,559,561,3,100,50,0,560,559,1,0,0,0,561,564,
        1,0,0,0,562,560,1,0,0,0,562,563,1,0,0,0,563,565,1,0,0,0,564,562,
        1,0,0,0,565,569,5,3,0,0,566,568,3,48,24,0,567,566,1,0,0,0,568,571,
        1,0,0,0,569,567,1,0,0,0,569,570,1,0,0,0,570,572,1,0,0,0,571,569,
        1,0,0,0,572,573,5,3,0,0,573,55,1,0,0,0,574,575,5,2,0,0,575,576,5,
        9,0,0,576,577,3,102,51,0,577,578,3,172,86,0,578,579,5,3,0,0,579,
        57,1,0,0,0,580,581,5,2,0,0,581,582,5,18,0,0,582,583,3,172,86,0,583,
        585,3,48,24,0,584,586,3,48,24,0,585,584,1,0,0,0,585,586,1,0,0,0,
        586,587,1,0,0,0,587,588,5,3,0,0,588,59,1,0,0,0,589,590,5,2,0,0,590,
        591,5,19,0,0,591,595,3,172,86,0,592,594,3,48,24,0,593,592,1,0,0,
        0,594,597,1,0,0,0,595,593,1,0,0,0,595,596,1,0,0,0,596,598,1,0,0,
        0,597,595,1,0,0,0,598,599,5,3,0,0,599,61,1,0,0,0,600,601,5,2,0,0,
        601,605,5,20,0,0,602,604,3,48,24,0,603,602,1,0,0,0,604,607,1,0,0,
        0,605,603,1,0,0,0,605,606,1,0,0,0,606,608,1,0,0,0,607,605,1,0,0,
        0,608,609,5,3,0,0,609,63,1,0,0,0,610,611,5,2,0,0,611,613,5,21,0,
        0,612,614,3,172,86,0,613,612,1,0,0,0,613,614,1,0,0,0,614,615,1,0,
        0,0,615,616,5,3,0,0,616,65,1,0,0,0,617,618,5,2,0,0,618,619,5,22,
        0,0,619,620,3,172,86,0,620,621,5,3,0,0,621,67,1,0,0,0,622,623,5,
        2,0,0,623,625,5,37,0,0,624,626,3,200,100,0,625,624,1,0,0,0,625,626,
        1,0,0,0,626,627,1,0,0,0,627,628,5,94,0,0,628,629,5,3,0,0,629,69,
        1,0,0,0,630,631,5,2,0,0,631,632,5,88,0,0,632,633,3,72,36,0,633,634,
        5,94,0,0,634,635,5,3,0,0,635,71,1,0,0,0,636,637,5,2,0,0,637,639,
        5,97,0,0,638,640,3,74,37,0,639,638,1,0,0,0,640,641,1,0,0,0,641,639,
        1,0,0,0,641,642,1,0,0,0,642,643,1,0,0,0,643,644,5,3,0,0,644,73,1,
        0,0,0,645,651,5,97,0,0,646,647,5,2,0,0,647,648,5,97,0,0,648,649,
        5,97,0,0,649,651,5,3,0,0,650,645,1,0,0,0,650,646,1,0,0,0,651,75,
        1,0,0,0,652,662,3,78,39,0,653,662,3,80,40,0,654,662,3,82,41,0,655,
        662,3,90,45,0,656,662,3,86,43,0,657,662,3,88,44,0,658,662,3,92,46,
        0,659,662,3,94,47,0,660,662,3,96,48,0,661,652,1,0,0,0,661,653,1,
        0,0,0,661,654,1,0,0,0,661,655,1,0,0,0,661,656,1,0,0,0,661,657,1,
        0,0,0,661,658,1,0,0,0,661,659,1,0,0,0,661,660,1,0,0,0,662,77,1,0,
        0,0,663,664,5,2,0,0,664,665,5,82,0,0,665,666,5,97,0,0,666,667,3,
        172,86,0,667,668,5,3,0,0,668,79,1,0,0,0,669,670,5,2,0,0,670,671,
        5,83,0,0,671,672,3,18,9,0,672,673,5,3,0,0,673,690,1,0,0,0,674,675,
        5,2,0,0,675,676,5,83,0,0,676,677,3,20,10,0,677,678,5,3,0,0,678,690,
        1,0,0,0,679,680,5,2,0,0,680,681,5,83,0,0,681,682,3,10,5,0,682,683,
        5,3,0,0,683,690,1,0,0,0,684,685,5,2,0,0,685,686,5,83,0,0,686,687,
        3,172,86,0,687,688,5,3,0,0,688,690,1,0,0,0,689,669,1,0,0,0,689,674,
        1,0,0,0,689,679,1,0,0,0,689,684,1,0,0,0,690,81,1,0,0,0,691,692,5,
        2,0,0,692,694,5,84,0,0,693,695,3,84,42,0,694,693,1,0,0,0,695,696,
        1,0,0,0,696,694,1,0,0,0,696,697,1,0,0,0,697,698,1,0,0,0,698,699,
        5,3,0,0,699,83,1,0,0,0,700,701,5,2,0,0,701,703,5,97,0,0,702,704,
        5,97,0,0,703,702,1,0,0,0,703,704,1,0,0,0,704,705,1,0,0,0,705,706,
        5,3,0,0,706,85,1,0,0,0,707,708,5,2,0,0,708,709,5,86,0,0,709,711,
        5,94,0,0,710,712,3,84,42,0,711,710,1,0,0,0,712,713,1,0,0,0,713,711,
        1,0,0,0,713,714,1,0,0,0,714,715,1,0,0,0,715,716,5,3,0,0,716,87,1,
        0,0,0,717,718,5,2,0,0,718,719,5,87,0,0,719,720,5,94,0,0,720,721,
        5,3,0,0,721,89,1,0,0,0,722,723,5,2,0,0,723,724,5,85,0,0,724,725,
        5,94,0,0,725,726,5,94,0,0,726,727,5,3,0,0,727,91,1,0,0,0,728,729,
        5,2,0,0,729,731,5,91,0,0,730,732,3,84,42,0,731,730,1,0,0,0,732,733,
        1,0,0,0,733,731,1,0,0,0,733,734,1,0,0,0,734,735,1,0,0,0,735,736,
        5,3,0,0,736,93,1,0,0,0,737,738,5,2,0,0,738,739,5,90,0,0,739,741,
        5,94,0,0,740,742,3,84,42,0,741,740,1,0,0,0,742,743,1,0,0,0,743,741,
        1,0,0,0,743,744,1,0,0,0,744,745,1,0,0,0,745,746,5,3,0,0,746,95,1,
        0,0,0,747,748,5,2,0,0,748,749,5,89,0,0,749,750,5,94,0,0,750,751,
        5,3,0,0,751,97,1,0,0,0,752,753,5,2,0,0,753,754,5,82,0,0,754,755,
        3,4,2,0,755,756,5,3,0,0,756,99,1,0,0,0,757,758,5,2,0,0,758,761,5,
        97,0,0,759,760,5,79,0,0,760,762,3,104,52,0,761,759,1,0,0,0,761,762,
        1,0,0,0,762,763,1,0,0,0,763,764,3,172,86,0,764,765,5,3,0,0,765,101,
        1,0,0,0,766,767,5,2,0,0,767,770,5,97,0,0,768,769,5,79,0,0,769,771,
        3,104,52,0,770,768,1,0,0,0,770,771,1,0,0,0,771,772,1,0,0,0,772,773,
        5,3,0,0,773,103,1,0,0,0,774,791,5,97,0,0,775,791,3,106,53,0,776,
        791,3,108,54,0,777,791,3,110,55,0,778,791,3,112,56,0,779,791,3,116,
        58,0,780,791,3,120,60,0,781,791,3,126,63,0,782,791,3,128,64,0,783,
        791,3,130,65,0,784,791,3,132,66,0,785,791,3,134,67,0,786,791,3,136,
        68,0,787,791,3,138,69,0,788,791,3,144,72,0,789,791,3,148,74,0,790,
        774,1,0,0,0,790,775,1,0,0,0,790,776,1,0,0,0,790,777,1,0,0,0,790,
        778,1,0,0,0,790,779,1,0,0,0,790,780,1,0,0,0,790,781,1,0,0,0,790,
        782,1,0,0,0,790,783,1,0,0,0,790,784,1,0,0,0,790,785,1,0,0,0,790,
        786,1,0,0,0,790,787,1,0,0,0,790,788,1,0,0,0,790,789,1,0,0,0,791,
        105,1,0,0,0,792,793,5,2,0,0,793,794,5,55,0,0,794,796,3,104,52,0,
        795,797,3,104,52,0,796,795,1,0,0,0,797,798,1,0,0,0,798,796,1,0,0,
        0,798,799,1,0,0,0,799,800,1,0,0,0,800,801,5,3,0,0,801,107,1,0,0,
        0,802,803,5,2,0,0,803,804,5,56,0,0,804,806,3,104,52,0,805,807,3,
        104,52,0,806,805,1,0,0,0,807,808,1,0,0,0,808,806,1,0,0,0,808,809,
        1,0,0,0,809,810,1,0,0,0,810,811,5,3,0,0,811,109,1,0,0,0,812,813,
        5,2,0,0,813,814,5,27,0,0,814,815,3,104,52,0,815,816,5,3,0,0,816,
        111,1,0,0,0,817,818,5,2,0,0,818,820,5,57,0,0,819,821,3,114,57,0,
        820,819,1,0,0,0,821,822,1,0,0,0,822,820,1,0,0,0,822,823,1,0,0,0,
        823,824,1,0,0,0,824,825,5,3,0,0,825,113,1,0,0,0,826,827,5,2,0,0,
        827,828,5,66,0,0,828,829,3,104,52,0,829,830,5,3,0,0,830,838,1,0,
        0,0,831,832,5,2,0,0,832,833,5,97,0,0,833,834,3,104,52,0,834,835,
        5,3,0,0,835,838,1,0,0,0,836,838,3,104,52,0,837,826,1,0,0,0,837,831,
        1,0,0,0,837,836,1,0,0,0,838,115,1,0,0,0,839,840,5,2,0,0,840,842,
        5,58,0,0,841,843,3,150,75,0,842,841,1,0,0,0,842,843,1,0,0,0,843,
        844,1,0,0,0,844,848,5,2,0,0,845,847,3,118,59,0,846,845,1,0,0,0,847,
        850,1,0,0,0,848,846,1,0,0,0,848,849,1,0,0,0,849,851,1,0,0,0,850,
        848,1,0,0,0,851,852,5,3,0,0,852,853,3,104,52,0,853,854,5,3,0,0,854,
        117,1,0,0,0,855,856,5,2,0,0,856,858,5,97,0,0,857,859,5,75,0,0,858,
        857,1,0,0,0,858,859,1,0,0,0,859,860,1,0,0,0,860,861,3,104,52,0,861,
        862,5,3,0,0,862,119,1,0,0,0,863,864,5,2,0,0,864,868,5,97,0,0,865,
        867,3,122,61,0,866,865,1,0,0,0,867,870,1,0,0,0,868,866,1,0,0,0,868,
        869,1,0,0,0,869,871,1,0,0,0,870,868,1,0,0,0,871,872,5,3,0,0,872,
        121,1,0,0,0,873,877,5,2,0,0,874,876,3,124,62,0,875,874,1,0,0,0,876,
        879,1,0,0,0,877,875,1,0,0,0,877,878,1,0,0,0,878,880,1,0,0,0,879,
        877,1,0,0,0,880,882,5,97,0,0,881,883,5,75,0,0,882,881,1,0,0,0,882,
        883,1,0,0,0,883,884,1,0,0,0,884,885,3,104,52,0,885,886,5,3,0,0,886,
        123,1,0,0,0,887,888,5,67,0,0,888,125,1,0,0,0,889,890,5,2,0,0,890,
        891,5,59,0,0,891,892,7,0,0,0,892,893,5,3,0,0,893,127,1,0,0,0,894,
        895,5,2,0,0,895,896,5,60,0,0,896,897,3,104,52,0,897,898,5,3,0,0,
        898,129,1,0,0,0,899,900,5,2,0,0,900,901,5,61,0,0,901,902,5,97,0,
        0,902,903,5,3,0,0,903,131,1,0,0,0,904,905,5,2,0,0,905,906,5,30,0,
        0,906,907,3,104,52,0,907,908,3,104,52,0,908,909,5,3,0,0,909,133,
        1,0,0,0,910,911,5,2,0,0,911,912,5,25,0,0,912,913,3,104,52,0,913,
        914,3,104,52,0,914,915,3,104,52,0,915,916,3,104,52,0,916,917,5,3,
        0,0,917,135,1,0,0,0,918,919,5,2,0,0,919,920,5,63,0,0,920,921,5,97,
        0,0,921,922,5,3,0,0,922,137,1,0,0,0,923,924,5,2,0,0,924,925,5,64,
        0,0,925,926,5,97,0,0,926,928,3,104,52,0,927,929,3,140,70,0,928,927,
        1,0,0,0,928,929,1,0,0,0,929,930,1,0,0,0,930,931,3,104,52,0,931,932,
        5,3,0,0,932,139,1,0,0,0,933,934,5,2,0,0,934,936,5,74,0,0,935,937,
        3,142,71,0,936,935,1,0,0,0,937,938,1,0,0,0,938,936,1,0,0,0,938,939,
        1,0,0,0,939,940,1,0,0,0,940,941,5,3,0,0,941,141,1,0,0,0,942,943,
        7,1,0,0,943,143,1,0,0,0,944,945,5,2,0,0,945,947,5,65,0,0,946,948,
        3,146,73,0,947,946,1,0,0,0,948,949,1,0,0,0,949,947,1,0,0,0,949,950,
        1,0,0,0,950,951,1,0,0,0,951,952,5,3,0,0,952,145,1,0,0,0,953,956,
        5,94,0,0,954,956,3,104,52,0,955,953,1,0,0,0,955,954,1,0,0,0,956,
        147,1,0,0,0,957,958,5,2,0,0,958,960,3,104,52,0,959,961,3,104,52,
        0,960,959,1,0,0,0,961,962,1,0,0,0,962,960,1,0,0,0,962,963,1,0,0,
        0,963,964,1,0,0,0,964,965,5,3,0,0,965,149,1,0,0,0,966,967,5,2,0,
        0,967,969,5,68,0,0,968,970,3,152,76,0,969,968,1,0,0,0,970,971,1,
        0,0,0,971,969,1,0,0,0,971,972,1,0,0,0,972,973,1,0,0,0,973,974,5,
        3,0,0,974,151,1,0,0,0,975,986,5,97,0,0,976,977,5,2,0,0,977,979,5,
        97,0,0,978,980,3,154,77,0,979,978,1,0,0,0,979,980,1,0,0,0,980,982,
        1,0,0,0,981,983,3,156,78,0,982,981,1,0,0,0,982,983,1,0,0,0,983,984,
        1,0,0,0,984,986,5,3,0,0,985,975,1,0,0,0,985,976,1,0,0,0,986,153,
        1,0,0,0,987,988,5,2,0,0,988,989,5,70,0,0,989,990,3,104,52,0,990,
        991,5,3,0,0,991,155,1,0,0,0,992,993,5,2,0,0,993,994,5,40,0,0,994,
        995,3,104,52,0,995,996,5,3,0,0,996,157,1,0,0,0,997,998,5,2,0,0,998,
        999,5,23,0,0,999,1000,5,97,0,0,1000,1001,3,172,86,0,1001,1002,5,
        3,0,0,1002,1010,1,0,0,0,1003,1004,5,2,0,0,1004,1005,5,23,0,0,1005,
        1006,3,210,105,0,1006,1007,3,172,86,0,1007,1008,5,3,0,0,1008,1010,
        1,0,0,0,1009,997,1,0,0,0,1009,1003,1,0,0,0,1010,159,1,0,0,0,1011,
        1012,5,2,0,0,1012,1013,5,38,0,0,1013,1017,3,172,86,0,1014,1016,3,
        162,81,0,1015,1014,1,0,0,0,1016,1019,1,0,0,0,1017,1015,1,0,0,0,1017,
        1018,1,0,0,0,1018,1021,1,0,0,0,1019,1017,1,0,0,0,1020,1022,3,164,
        82,0,1021,1020,1,0,0,0,1021,1022,1,0,0,0,1022,1023,1,0,0,0,1023,
        1024,5,3,0,0,1024,161,1,0,0,0,1025,1026,5,2,0,0,1026,1027,5,39,0,
        0,1027,1031,3,172,86,0,1028,1030,3,48,24,0,1029,1028,1,0,0,0,1030,
        1033,1,0,0,0,1031,1029,1,0,0,0,1031,1032,1,0,0,0,1032,1034,1,0,0,
        0,1033,1031,1,0,0,0,1034,1035,5,3,0,0,1035,163,1,0,0,0,1036,1037,
        5,2,0,0,1037,1041,5,40,0,0,1038,1040,3,48,24,0,1039,1038,1,0,0,0,
        1040,1043,1,0,0,0,1041,1039,1,0,0,0,1041,1042,1,0,0,0,1042,1044,
        1,0,0,0,1043,1041,1,0,0,0,1044,1045,5,3,0,0,1045,165,1,0,0,0,1046,
        1047,5,2,0,0,1047,1048,5,43,0,0,1048,1049,3,52,26,0,1049,1050,3,
        172,86,0,1050,1054,3,158,79,0,1051,1053,3,48,24,0,1052,1051,1,0,
        0,0,1053,1056,1,0,0,0,1054,1052,1,0,0,0,1054,1055,1,0,0,0,1055,1057,
        1,0,0,0,1056,1054,1,0,0,0,1057,1058,5,3,0,0,1058,167,1,0,0,0,1059,
        1060,5,2,0,0,1060,1061,5,41,0,0,1061,1062,5,97,0,0,1062,1066,3,172,
        86,0,1063,1065,3,48,24,0,1064,1063,1,0,0,0,1065,1068,1,0,0,0,1066,
        1064,1,0,0,0,1066,1067,1,0,0,0,1067,1069,1,0,0,0,1068,1066,1,0,0,
        0,1069,1070,5,3,0,0,1070,169,1,0,0,0,1071,1072,5,2,0,0,1072,1073,
        5,42,0,0,1073,1074,5,97,0,0,1074,1078,3,172,86,0,1075,1077,3,48,
        24,0,1076,1075,1,0,0,0,1077,1080,1,0,0,0,1078,1076,1,0,0,0,1078,
        1079,1,0,0,0,1079,1081,1,0,0,0,1080,1078,1,0,0,0,1081,1082,5,3,0,
        0,1082,171,1,0,0,0,1083,1110,3,232,116,0,1084,1110,5,92,0,0,1085,
        1110,5,97,0,0,1086,1110,3,186,93,0,1087,1110,3,188,94,0,1088,1110,
        3,190,95,0,1089,1110,3,192,96,0,1090,1110,3,200,100,0,1091,1110,
        3,206,103,0,1092,1110,3,210,105,0,1093,1110,3,212,106,0,1094,1110,
        3,214,107,0,1095,1110,3,216,108,0,1096,1110,3,218,109,0,1097,1110,
        3,194,97,0,1098,1110,3,196,98,0,1099,1110,3,198,99,0,1100,1110,3,
        220,110,0,1101,1110,3,222,111,0,1102,1110,3,182,91,0,1103,1110,3,
        184,92,0,1104,1110,3,174,87,0,1105,1110,3,176,88,0,1106,1110,3,178,
        89,0,1107,1110,3,180,90,0,1108,1110,3,224,112,0,1109,1083,1,0,0,
        0,1109,1084,1,0,0,0,1109,1085,1,0,0,0,1109,1086,1,0,0,0,1109,1087,
        1,0,0,0,1109,1088,1,0,0,0,1109,1089,1,0,0,0,1109,1090,1,0,0,0,1109,
        1091,1,0,0,0,1109,1092,1,0,0,0,1109,1093,1,0,0,0,1109,1094,1,0,0,
        0,1109,1095,1,0,0,0,1109,1096,1,0,0,0,1109,1097,1,0,0,0,1109,1098,
        1,0,0,0,1109,1099,1,0,0,0,1109,1100,1,0,0,0,1109,1101,1,0,0,0,1109,
        1102,1,0,0,0,1109,1103,1,0,0,0,1109,1104,1,0,0,0,1109,1105,1,0,0,
        0,1109,1106,1,0,0,0,1109,1107,1,0,0,0,1109,1108,1,0,0,0,1110,173,
        1,0,0,0,1111,1112,5,50,0,0,1112,175,1,0,0,0,1113,1114,5,51,0,0,1114,
        177,1,0,0,0,1115,1116,5,2,0,0,1116,1120,5,51,0,0,1117,1119,3,172,
        86,0,1118,1117,1,0,0,0,1119,1122,1,0,0,0,1120,1118,1,0,0,0,1120,
        1121,1,0,0,0,1121,1123,1,0,0,0,1122,1120,1,0,0,0,1123,1124,5,3,0,
        0,1124,179,1,0,0,0,1125,1126,5,2,0,0,1126,1127,5,45,0,0,1127,1131,
        5,97,0,0,1128,1130,3,172,86,0,1129,1128,1,0,0,0,1130,1133,1,0,0,
        0,1131,1129,1,0,0,0,1131,1132,1,0,0,0,1132,1134,1,0,0,0,1133,1131,
        1,0,0,0,1134,1135,5,3,0,0,1135,181,1,0,0,0,1136,1137,5,2,0,0,1137,
        1138,5,61,0,0,1138,1139,3,172,86,0,1139,1140,5,3,0,0,1140,183,1,
        0,0,0,1141,1142,5,2,0,0,1142,1143,5,62,0,0,1143,1144,3,172,86,0,
        1144,1145,3,104,52,0,1145,1146,5,3,0,0,1146,185,1,0,0,0,1147,1148,
        5,2,0,0,1148,1149,5,10,0,0,1149,1153,3,228,114,0,1150,1152,3,48,
        24,0,1151,1150,1,0,0,0,1152,1155,1,0,0,0,1153,1151,1,0,0,0,1153,
        1154,1,0,0,0,1154,1156,1,0,0,0,1155,1153,1,0,0,0,1156,1157,5,3,0,
        0,1157,187,1,0,0,0,1158,1159,5,2,0,0,1159,1160,5,11,0,0,1160,1164,
        3,228,114,0,1161,1163,3,48,24,0,1162,1161,1,0,0,0,1163,1166,1,0,
        0,0,1164,1162,1,0,0,0,1164,1165,1,0,0,0,1165,1167,1,0,0,0,1166,1164,
        1,0,0,0,1167,1168,5,3,0,0,1168,189,1,0,0,0,1169,1170,5,2,0,0,1170,
        1171,5,13,0,0,1171,1172,3,172,86,0,1172,1176,3,172,86,0,1173,1175,
        3,172,86,0,1174,1173,1,0,0,0,1175,1178,1,0,0,0,1176,1174,1,0,0,0,
        1176,1177,1,0,0,0,1177,1179,1,0,0,0,1178,1176,1,0,0,0,1179,1180,
        5,3,0,0,1180,191,1,0,0,0,1181,1182,5,2,0,0,1182,1183,5,14,0,0,1183,
        1184,3,172,86,0,1184,1188,3,172,86,0,1185,1187,3,172,86,0,1186,1185,
        1,0,0,0,1187,1190,1,0,0,0,1188,1186,1,0,0,0,1188,1189,1,0,0,0,1189,
        1191,1,0,0,0,1190,1188,1,0,0,0,1191,1192,5,3,0,0,1192,193,1,0,0,
        0,1193,1194,5,2,0,0,1194,1195,5,24,0,0,1195,1196,3,172,86,0,1196,
        1197,3,172,86,0,1197,1198,3,172,86,0,1198,1199,5,3,0,0,1199,195,
        1,0,0,0,1200,1201,5,2,0,0,1201,1205,5,25,0,0,1202,1203,3,172,86,
        0,1203,1204,3,172,86,0,1204,1206,1,0,0,0,1205,1202,1,0,0,0,1206,
        1207,1,0,0,0,1207,1205,1,0,0,0,1207,1208,1,0,0,0,1208,1209,1,0,0,
        0,1209,1210,5,3,0,0,1210,197,1,0,0,0,1211,1212,5,2,0,0,1212,1213,
        5,36,0,0,1213,1215,5,97,0,0,1214,1216,3,226,113,0,1215,1214,1,0,
        0,0,1215,1216,1,0,0,0,1216,1220,1,0,0,0,1217,1219,3,172,86,0,1218,
        1217,1,0,0,0,1219,1222,1,0,0,0,1220,1218,1,0,0,0,1220,1221,1,0,0,
        0,1221,1223,1,0,0,0,1222,1220,1,0,0,0,1223,1224,5,3,0,0,1224,199,
        1,0,0,0,1225,1226,5,2,0,0,1226,1230,5,26,0,0,1227,1229,3,202,101,
        0,1228,1227,1,0,0,0,1229,1232,1,0,0,0,1230,1228,1,0,0,0,1230,1231,
        1,0,0,0,1231,1233,1,0,0,0,1232,1230,1,0,0,0,1233,1234,5,3,0,0,1234,
        201,1,0,0,0,1235,1236,5,2,0,0,1236,1237,3,208,104,0,1237,1238,3,
        172,86,0,1238,1239,5,3,0,0,1239,1249,1,0,0,0,1240,1241,5,2,0,0,1241,
        1242,3,208,104,0,1242,1243,3,204,102,0,1243,1244,5,3,0,0,1244,1249,
        1,0,0,0,1245,1246,5,2,0,0,1246,1247,5,97,0,0,1247,1249,5,3,0,0,1248,
        1235,1,0,0,0,1248,1240,1,0,0,0,1248,1245,1,0,0,0,1249,203,1,0,0,
        0,1250,1251,5,2,0,0,1251,1252,5,12,0,0,1252,1256,3,228,114,0,1253,
        1255,3,48,24,0,1254,1253,1,0,0,0,1255,1258,1,0,0,0,1256,1254,1,0,
        0,0,1256,1257,1,0,0,0,1257,1259,1,0,0,0,1258,1256,1,0,0,0,1259,1260,
        5,3,0,0,1260,205,1,0,0,0,1261,1262,5,2,0,0,1262,1266,5,27,0,0,1263,
        1265,3,172,86,0,1264,1263,1,0,0,0,1265,1268,1,0,0,0,1266,1264,1,
        0,0,0,1266,1267,1,0,0,0,1267,1269,1,0,0,0,1268,1266,1,0,0,0,1269,
        1270,5,3,0,0,1270,207,1,0,0,0,1271,1272,7,2,0,0,1272,209,1,0,0,0,
        1273,1274,5,2,0,0,1274,1275,5,29,0,0,1275,1276,3,172,86,0,1276,1277,
        3,208,104,0,1277,1278,5,3,0,0,1278,211,1,0,0,0,1279,1280,5,2,0,0,
        1280,1281,5,30,0,0,1281,1282,3,172,86,0,1282,1283,3,172,86,0,1283,
        1284,5,3,0,0,1284,213,1,0,0,0,1285,1286,5,2,0,0,1286,1287,7,3,0,
        0,1287,1288,3,172,86,0,1288,1289,5,3,0,0,1289,215,1,0,0,0,1290,1291,
        5,2,0,0,1291,1292,5,35,0,0,1292,1293,3,172,86,0,1293,1294,5,3,0,
        0,1294,217,1,0,0,0,1295,1296,5,2,0,0,1296,1297,5,34,0,0,1297,1298,
        3,172,86,0,1298,1299,5,3,0,0,1299,219,1,0,0,0,1300,1301,5,2,0,0,
        1301,1302,5,28,0,0,1302,1303,3,172,86,0,1303,1304,3,208,104,0,1304,
        1305,5,3,0,0,1305,221,1,0,0,0,1306,1307,5,2,0,0,1307,1308,5,31,0,
        0,1308,1309,3,172,86,0,1309,1310,3,172,86,0,1310,1311,5,3,0,0,1311,
        223,1,0,0,0,1312,1313,5,2,0,0,1313,1315,3,172,86,0,1314,1316,3,226,
        113,0,1315,1314,1,0,0,0,1315,1316,1,0,0,0,1316,1320,1,0,0,0,1317,
        1319,3,172,86,0,1318,1317,1,0,0,0,1319,1322,1,0,0,0,1320,1318,1,
        0,0,0,1320,1321,1,0,0,0,1321,1323,1,0,0,0,1322,1320,1,0,0,0,1323,
        1324,5,3,0,0,1324,225,1,0,0,0,1325,1326,5,2,0,0,1326,1328,5,69,0,
        0,1327,1329,3,104,52,0,1328,1327,1,0,0,0,1329,1330,1,0,0,0,1330,
        1328,1,0,0,0,1330,1331,1,0,0,0,1331,1332,1,0,0,0,1332,1333,5,3,0,
        0,1333,227,1,0,0,0,1334,1345,5,2,0,0,1335,1342,3,230,115,0,1336,
        1338,5,4,0,0,1337,1336,1,0,0,0,1337,1338,1,0,0,0,1338,1339,1,0,0,
        0,1339,1341,3,230,115,0,1340,1337,1,0,0,0,1341,1344,1,0,0,0,1342,
        1340,1,0,0,0,1342,1343,1,0,0,0,1343,1346,1,0,0,0,1344,1342,1,0,0,
        0,1345,1335,1,0,0,0,1345,1346,1,0,0,0,1346,1347,1,0,0,0,1347,1348,
        5,3,0,0,1348,229,1,0,0,0,1349,1350,5,2,0,0,1350,1351,5,97,0,0,1351,
        1352,5,3,0,0,1352,231,1,0,0,0,1353,1354,7,4,0,0,1354,233,1,0,0,0,
        104,239,252,258,267,287,296,299,309,318,323,326,329,339,343,346,
        361,370,381,390,396,399,409,419,427,437,449,457,467,475,483,487,
        494,499,502,510,530,538,545,562,569,585,595,605,613,625,641,650,
        661,689,696,703,713,733,743,761,770,790,798,808,822,837,842,848,
        858,868,877,882,928,938,949,955,962,971,979,982,985,1009,1017,1021,
        1031,1041,1054,1066,1078,1109,1120,1131,1153,1164,1176,1188,1207,
        1215,1220,1230,1248,1256,1266,1315,1320,1330,1337,1342,1345
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
    public def(): DefContext {
        return this.getRuleContext(0, DefContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage4Parser.RPAREN, 0)!;
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
