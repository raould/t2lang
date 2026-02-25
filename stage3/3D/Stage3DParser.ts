
import * as antlr from "antlr4ng";
import { Token } from "antlr4ng";

import { Stage3DListener } from "./Stage3DListener.js";
// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;


export class Stage3DParser extends antlr.Parser {
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
    public static readonly IF = 17;
    public static readonly WHILE = 18;
    public static readonly BEGIN = 19;
    public static readonly RETURN = 20;
    public static readonly THROW = 21;
    public static readonly SET = 22;
    public static readonly TERNARY = 23;
    public static readonly COND = 24;
    public static readonly OBJECT = 25;
    public static readonly ARRAY = 26;
    public static readonly OPTCHAIN = 27;
    public static readonly DOT = 28;
    public static readonly INDEX = 29;
    public static readonly NULLCOAL = 30;
    public static readonly QUASI = 31;
    public static readonly QUOTE = 32;
    public static readonly UNQUOTE_SPLICING = 33;
    public static readonly UNQUOTE = 34;
    public static readonly NEW = 35;
    public static readonly IMPORT = 36;
    public static readonly SWITCH = 37;
    public static readonly CASE = 38;
    public static readonly DEFAULT = 39;
    public static readonly FORIN = 40;
    public static readonly FOROF = 41;
    public static readonly FOR = 42;
    public static readonly CLASS_BODY = 43;
    public static readonly SUPER_METHOD = 44;
    public static readonly ABSTRACT_METHOD = 45;
    public static readonly CLASS = 46;
    public static readonly FIELD = 47;
    public static readonly CONSTRUCTOR = 48;
    public static readonly THIS = 49;
    public static readonly SUPER = 50;
    public static readonly GET = 51;
    public static readonly SETPROP = 52;
    public static readonly IMPLEMENTS = 53;
    public static readonly UNION = 54;
    public static readonly INTERSECT = 55;
    public static readonly TUPLE = 56;
    public static readonly TYPEFN = 57;
    public static readonly LIT = 58;
    public static readonly KEYOF = 59;
    public static readonly TYPEOF = 60;
    public static readonly TYPE_AS = 61;
    public static readonly INFER = 62;
    public static readonly MAPPED = 63;
    public static readonly TEMPLATE = 64;
    public static readonly REST = 65;
    public static readonly READONLY = 66;
    public static readonly TYPE_PARAMS = 67;
    public static readonly TYPE_ARGS = 68;
    public static readonly EXTENDS = 69;
    public static readonly RETURNS = 70;
    public static readonly TYPE = 71;
    public static readonly INTERFACE = 72;
    public static readonly MODIFIERS = 73;
    public static readonly OPTIONAL = 74;
    public static readonly BOOLEAN = 75;
    public static readonly NULL = 76;
    public static readonly UNDEFINED = 77;
    public static readonly COLON = 78;
    public static readonly LBRACK = 79;
    public static readonly RBRACK = 80;
    public static readonly EXPORT = 81;
    public static readonly EXPORT_DEFAULT = 82;
    public static readonly EXPORT_NAMED = 83;
    public static readonly EXPORT_FROM = 84;
    public static readonly EXPORT_ALL_FROM = 85;
    public static readonly KEYWORD = 86;
    public static readonly NUMBER = 87;
    public static readonly STRING = 88;
    public static readonly MULTILINE_STRING = 89;
    public static readonly BACKTICK_STRING = 90;
    public static readonly IDENTIFIER = 91;
    public static readonly WS = 92;
    public static readonly RULE_program = 0;
    public static readonly RULE_topLevel = 1;
    public static readonly RULE_defmacro = 2;
    public static readonly RULE_def = 3;
    public static readonly RULE_typeAlias = 4;
    public static readonly RULE_interfaceDef = 5;
    public static readonly RULE_interfaceExtends = 6;
    public static readonly RULE_classDef = 7;
    public static readonly RULE_classExtends = 8;
    public static readonly RULE_classImplements = 9;
    public static readonly RULE_classBody = 10;
    public static readonly RULE_classElement = 11;
    public static readonly RULE_fieldDef = 12;
    public static readonly RULE_constructorDef = 13;
    public static readonly RULE_classMethodDef = 14;
    public static readonly RULE_abstractMethodDef = 15;
    public static readonly RULE_getterDef = 16;
    public static readonly RULE_setterDef = 17;
    public static readonly RULE_modifier = 18;
    public static readonly RULE_typedParam = 19;
    public static readonly RULE_fnSignatureTyped = 20;
    public static readonly RULE_statement = 21;
    public static readonly RULE_letStar = 22;
    public static readonly RULE_letStmt = 23;
    public static readonly RULE_constStar = 24;
    public static readonly RULE_constStmt = 25;
    public static readonly RULE_ifForm = 26;
    public static readonly RULE_whileForm = 27;
    public static readonly RULE_block = 28;
    public static readonly RULE_returnForm = 29;
    public static readonly RULE_throwForm = 30;
    public static readonly RULE_importForm = 31;
    public static readonly RULE_exportForm = 32;
    public static readonly RULE_exportBinding = 33;
    public static readonly RULE_exportDefault = 34;
    public static readonly RULE_exportNamed = 35;
    public static readonly RULE_exportNamePair = 36;
    public static readonly RULE_exportFrom = 37;
    public static readonly RULE_exportAllFrom = 38;
    public static readonly RULE_starBinding = 39;
    public static readonly RULE_singleBinding = 40;
    public static readonly RULE_typeExpr = 41;
    public static readonly RULE_typeUnion = 42;
    public static readonly RULE_typeIntersection = 43;
    public static readonly RULE_typeArray = 44;
    public static readonly RULE_typeTuple = 45;
    public static readonly RULE_typeTupleElement = 46;
    public static readonly RULE_typeFunction = 47;
    public static readonly RULE_typeFnParam = 48;
    public static readonly RULE_typeObject = 49;
    public static readonly RULE_typeProp = 50;
    public static readonly RULE_propModifier = 51;
    public static readonly RULE_typeLiteral = 52;
    public static readonly RULE_typeKeyof = 53;
    public static readonly RULE_typeTypeof = 54;
    public static readonly RULE_typeIndexAccess = 55;
    public static readonly RULE_typeConditional = 56;
    public static readonly RULE_typeInfer = 57;
    public static readonly RULE_typeMapped = 58;
    public static readonly RULE_mappedModifiers = 59;
    public static readonly RULE_mappedModifier = 60;
    public static readonly RULE_typeTemplateLiteral = 61;
    public static readonly RULE_templatePart = 62;
    public static readonly RULE_typeApplication = 63;
    public static readonly RULE_typeParams = 64;
    public static readonly RULE_typeParamDecl = 65;
    public static readonly RULE_typeParamConstraint = 66;
    public static readonly RULE_typeParamDefault = 67;
    public static readonly RULE_assign = 68;
    public static readonly RULE_switchForm = 69;
    public static readonly RULE_caseClause = 70;
    public static readonly RULE_defaultClause = 71;
    public static readonly RULE_forForm = 72;
    public static readonly RULE_forInForm = 73;
    public static readonly RULE_forOfForm = 74;
    public static readonly RULE_expression = 75;
    public static readonly RULE_typeofExpr = 76;
    public static readonly RULE_typeAssert = 77;
    public static readonly RULE_thisExpr = 78;
    public static readonly RULE_superConstructorCall = 79;
    public static readonly RULE_superMethodCall = 80;
    public static readonly RULE_lambda = 81;
    public static readonly RULE_fn = 82;
    public static readonly RULE_bindExpr = 83;
    public static readonly RULE_methodCallExpr = 84;
    public static readonly RULE_ternary = 85;
    public static readonly RULE_condExpr = 86;
    public static readonly RULE_newForm = 87;
    public static readonly RULE_objectExpr = 88;
    public static readonly RULE_objectField = 89;
    public static readonly RULE_objectMethodDef = 90;
    public static readonly RULE_arrayExpr = 91;
    public static readonly RULE_propKey = 92;
    public static readonly RULE_propAccess = 93;
    public static readonly RULE_indexAccess = 94;
    public static readonly RULE_quasiquote = 95;
    public static readonly RULE_unquote = 96;
    public static readonly RULE_unquoteSplicing = 97;
    public static readonly RULE_optChain = 98;
    public static readonly RULE_nullCoalesce = 99;
    public static readonly RULE_call = 100;
    public static readonly RULE_typeArgs = 101;
    public static readonly RULE_fnSignature = 102;
    public static readonly RULE_param = 103;
    public static readonly RULE_literal = 104;

    public static readonly literalNames = [
        null, null, "'('", "')'", "','", "'program'", "'let*'", "'let'", 
        "'const*'", "'const'", "'lambda'", "'fn'", "'method'", "'bind'", 
        "'method-call'", "'def'", "'defmacro'", "'if'", "'while'", "'begin'", 
        "'return'", "'throw'", "'set!'", "'ternary'", "'cond'", "'object'", 
        "'array'", "'.?'", "'.'", "'index'", "'??'", "'quasi'", "'quote'", 
        "'unquote-splicing'", "'unquote'", "'new'", "'import'", "'switch'", 
        "'case'", "'default'", "'for-in'", "'for-of'", "'for'", "'class-body'", 
        "'super-method'", "'abstract-method'", "'class'", "'field'", "'constructor'", 
        "'this'", "'super'", "'get'", "'set'", "'implements'", "'union'", 
        "'intersect'", "'tuple'", "'tfn'", "'tlit'", "'keyof'", "'typeof'", 
        "'type-as'", "'infer'", "'mapped'", "'template'", "'rest'", "'readonly'", 
        "'type-params'", "'type-args'", "'extends'", "'returns'", "'type'", 
        "'interface'", "'modifiers'", "'?'", null, "'null'", "'undefined'", 
        "':'", "'['", "']'", "'export'", "'export-default'", "'export-named'", 
        "'export-from'", "'export-all-from'"
    ];

    public static readonly symbolicNames = [
        null, "COMMENT", "LPAREN", "RPAREN", "COMMA", "PROGRAM", "LETSTAR", 
        "LET", "CONSTSTAR", "CONST", "LAMBDA", "FN", "METHOD", "BIND", "METHOD_CALL", 
        "DEF", "DEFMACRO", "IF", "WHILE", "BEGIN", "RETURN", "THROW", "SET", 
        "TERNARY", "COND", "OBJECT", "ARRAY", "OPTCHAIN", "DOT", "INDEX", 
        "NULLCOAL", "QUASI", "QUOTE", "UNQUOTE_SPLICING", "UNQUOTE", "NEW", 
        "IMPORT", "SWITCH", "CASE", "DEFAULT", "FORIN", "FOROF", "FOR", 
        "CLASS_BODY", "SUPER_METHOD", "ABSTRACT_METHOD", "CLASS", "FIELD", 
        "CONSTRUCTOR", "THIS", "SUPER", "GET", "SETPROP", "IMPLEMENTS", 
        "UNION", "INTERSECT", "TUPLE", "TYPEFN", "LIT", "KEYOF", "TYPEOF", 
        "TYPE_AS", "INFER", "MAPPED", "TEMPLATE", "REST", "READONLY", "TYPE_PARAMS", 
        "TYPE_ARGS", "EXTENDS", "RETURNS", "TYPE", "INTERFACE", "MODIFIERS", 
        "OPTIONAL", "BOOLEAN", "NULL", "UNDEFINED", "COLON", "LBRACK", "RBRACK", 
        "EXPORT", "EXPORT_DEFAULT", "EXPORT_NAMED", "EXPORT_FROM", "EXPORT_ALL_FROM", 
        "KEYWORD", "NUMBER", "STRING", "MULTILINE_STRING", "BACKTICK_STRING", 
        "IDENTIFIER", "WS"
    ];
    public static readonly ruleNames = [
        "program", "topLevel", "defmacro", "def", "typeAlias", "interfaceDef", 
        "interfaceExtends", "classDef", "classExtends", "classImplements", 
        "classBody", "classElement", "fieldDef", "constructorDef", "classMethodDef", 
        "abstractMethodDef", "getterDef", "setterDef", "modifier", "typedParam", 
        "fnSignatureTyped", "statement", "letStar", "letStmt", "constStar", 
        "constStmt", "ifForm", "whileForm", "block", "returnForm", "throwForm", 
        "importForm", "exportForm", "exportBinding", "exportDefault", "exportNamed", 
        "exportNamePair", "exportFrom", "exportAllFrom", "starBinding", 
        "singleBinding", "typeExpr", "typeUnion", "typeIntersection", "typeArray", 
        "typeTuple", "typeTupleElement", "typeFunction", "typeFnParam", 
        "typeObject", "typeProp", "propModifier", "typeLiteral", "typeKeyof", 
        "typeTypeof", "typeIndexAccess", "typeConditional", "typeInfer", 
        "typeMapped", "mappedModifiers", "mappedModifier", "typeTemplateLiteral", 
        "templatePart", "typeApplication", "typeParams", "typeParamDecl", 
        "typeParamConstraint", "typeParamDefault", "assign", "switchForm", 
        "caseClause", "defaultClause", "forForm", "forInForm", "forOfForm", 
        "expression", "typeofExpr", "typeAssert", "thisExpr", "superConstructorCall", 
        "superMethodCall", "lambda", "fn", "bindExpr", "methodCallExpr", 
        "ternary", "condExpr", "newForm", "objectExpr", "objectField", "objectMethodDef", 
        "arrayExpr", "propKey", "propAccess", "indexAccess", "quasiquote", 
        "unquote", "unquoteSplicing", "optChain", "nullCoalesce", "call", 
        "typeArgs", "fnSignature", "param", "literal",
    ];

    public get grammarFileName(): string { return "Stage3D.g4"; }
    public get literalNames(): (string | null)[] { return Stage3DParser.literalNames; }
    public get symbolicNames(): (string | null)[] { return Stage3DParser.symbolicNames; }
    public get ruleNames(): string[] { return Stage3DParser.ruleNames; }
    public get serializedATN(): number[] { return Stage3DParser._serializedATN; }

    protected createFailedPredicateException(predicate?: string, message?: string): antlr.FailedPredicateException {
        return new antlr.FailedPredicateException(this, predicate, message);
    }

    public constructor(input: antlr.TokenStream) {
        super(input);
        this.interpreter = new antlr.ParserATNSimulator(this, Stage3DParser._ATN, Stage3DParser.decisionsToDFA, new antlr.PredictionContextCache());
    }
    public program(): ProgramContext {
        let localContext = new ProgramContext(this.context, this.state);
        this.enterRule(localContext, 0, Stage3DParser.RULE_program);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 210;
            this.match(Stage3DParser.LPAREN);
            this.state = 211;
            this.match(Stage3DParser.PROGRAM);
            this.state = 215;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 469762049) !== 0) || ((((_la - 86)) & ~0x1F) === 0 && ((1 << (_la - 86)) & 55) !== 0)) {
                {
                {
                this.state = 212;
                this.topLevel();
                }
                }
                this.state = 217;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 218;
            this.match(Stage3DParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 2, Stage3DParser.RULE_topLevel);
        try {
            this.state = 226;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 1, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 220;
                this.defmacro();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 221;
                this.def();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 222;
                this.typeAlias();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 223;
                this.interfaceDef();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 224;
                this.classDef();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 225;
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
    public defmacro(): DefmacroContext {
        let localContext = new DefmacroContext(this.context, this.state);
        this.enterRule(localContext, 4, Stage3DParser.RULE_defmacro);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 228;
            this.match(Stage3DParser.LPAREN);
            this.state = 229;
            this.match(Stage3DParser.DEFMACRO);
            this.state = 230;
            this.match(Stage3DParser.IDENTIFIER);
            this.state = 231;
            this.fnSignature();
            this.state = 235;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 469762049) !== 0) || ((((_la - 86)) & ~0x1F) === 0 && ((1 << (_la - 86)) & 55) !== 0)) {
                {
                {
                this.state = 232;
                this.statement();
                }
                }
                this.state = 237;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 238;
            this.match(Stage3DParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 6, Stage3DParser.RULE_def);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 240;
            this.match(Stage3DParser.LPAREN);
            this.state = 241;
            this.match(Stage3DParser.DEF);
            this.state = 242;
            this.match(Stage3DParser.IDENTIFIER);
            this.state = 243;
            this.expression();
            this.state = 244;
            this.match(Stage3DParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 8, Stage3DParser.RULE_typeAlias);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 246;
            this.match(Stage3DParser.LPAREN);
            this.state = 247;
            this.match(Stage3DParser.TYPE);
            this.state = 248;
            this.match(Stage3DParser.IDENTIFIER);
            this.state = 250;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 3, this.context) ) {
            case 1:
                {
                this.state = 249;
                this.typeParams();
                }
                break;
            }
            this.state = 252;
            this.typeExpr();
            this.state = 253;
            this.match(Stage3DParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 10, Stage3DParser.RULE_interfaceDef);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 255;
            this.match(Stage3DParser.LPAREN);
            this.state = 256;
            this.match(Stage3DParser.INTERFACE);
            this.state = 257;
            this.match(Stage3DParser.IDENTIFIER);
            this.state = 259;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 4, this.context) ) {
            case 1:
                {
                this.state = 258;
                this.typeParams();
                }
                break;
            }
            this.state = 262;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 5, this.context) ) {
            case 1:
                {
                this.state = 261;
                this.interfaceExtends();
                }
                break;
            }
            this.state = 264;
            this.typeObject();
            this.state = 265;
            this.match(Stage3DParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 12, Stage3DParser.RULE_interfaceExtends);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 267;
            this.match(Stage3DParser.LPAREN);
            this.state = 268;
            this.match(Stage3DParser.EXTENDS);
            this.state = 270;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 269;
                this.typeExpr();
                }
                }
                this.state = 272;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 91);
            this.state = 274;
            this.match(Stage3DParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 14, Stage3DParser.RULE_classDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 276;
            this.match(Stage3DParser.LPAREN);
            this.state = 277;
            this.match(Stage3DParser.CLASS);
            this.state = 281;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 86) {
                {
                {
                this.state = 278;
                this.modifier();
                }
                }
                this.state = 283;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 284;
            this.match(Stage3DParser.IDENTIFIER);
            this.state = 286;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 8, this.context) ) {
            case 1:
                {
                this.state = 285;
                this.typeParams();
                }
                break;
            }
            this.state = 289;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 9, this.context) ) {
            case 1:
                {
                this.state = 288;
                this.classExtends();
                }
                break;
            }
            this.state = 292;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 10, this.context) ) {
            case 1:
                {
                this.state = 291;
                this.classImplements();
                }
                break;
            }
            this.state = 294;
            this.classBody();
            this.state = 295;
            this.match(Stage3DParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 16, Stage3DParser.RULE_classExtends);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 297;
            this.match(Stage3DParser.LPAREN);
            this.state = 298;
            this.match(Stage3DParser.EXTENDS);
            this.state = 299;
            this.typeExpr();
            this.state = 300;
            this.match(Stage3DParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 18, Stage3DParser.RULE_classImplements);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 302;
            this.match(Stage3DParser.LPAREN);
            this.state = 303;
            this.match(Stage3DParser.IMPLEMENTS);
            this.state = 305;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 304;
                this.typeExpr();
                }
                }
                this.state = 307;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 91);
            this.state = 309;
            this.match(Stage3DParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 20, Stage3DParser.RULE_classBody);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 311;
            this.match(Stage3DParser.LPAREN);
            this.state = 312;
            this.match(Stage3DParser.CLASS_BODY);
            this.state = 316;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 313;
                this.classElement();
                }
                }
                this.state = 318;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 319;
            this.match(Stage3DParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 22, Stage3DParser.RULE_classElement);
        try {
            this.state = 327;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 13, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 321;
                this.fieldDef();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 322;
                this.constructorDef();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 323;
                this.classMethodDef();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 324;
                this.abstractMethodDef();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 325;
                this.getterDef();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 326;
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
    public fieldDef(): FieldDefContext {
        let localContext = new FieldDefContext(this.context, this.state);
        this.enterRule(localContext, 24, Stage3DParser.RULE_fieldDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 329;
            this.match(Stage3DParser.LPAREN);
            this.state = 330;
            this.match(Stage3DParser.FIELD);
            this.state = 334;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 86) {
                {
                {
                this.state = 331;
                this.modifier();
                }
                }
                this.state = 336;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 337;
            this.match(Stage3DParser.IDENTIFIER);
            this.state = 340;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 78) {
                {
                this.state = 338;
                this.match(Stage3DParser.COLON);
                this.state = 339;
                this.typeExpr();
                }
            }

            this.state = 343;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2 || ((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 469762049) !== 0) || ((((_la - 86)) & ~0x1F) === 0 && ((1 << (_la - 86)) & 55) !== 0)) {
                {
                this.state = 342;
                this.expression();
                }
            }

            this.state = 345;
            this.match(Stage3DParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 26, Stage3DParser.RULE_constructorDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 347;
            this.match(Stage3DParser.LPAREN);
            this.state = 348;
            this.match(Stage3DParser.CONSTRUCTOR);
            this.state = 349;
            this.fnSignatureTyped();
            this.state = 353;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 469762049) !== 0) || ((((_la - 86)) & ~0x1F) === 0 && ((1 << (_la - 86)) & 55) !== 0)) {
                {
                {
                this.state = 350;
                this.statement();
                }
                }
                this.state = 355;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 356;
            this.match(Stage3DParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 28, Stage3DParser.RULE_classMethodDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 358;
            this.match(Stage3DParser.LPAREN);
            this.state = 359;
            this.match(Stage3DParser.METHOD);
            this.state = 363;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 86) {
                {
                {
                this.state = 360;
                this.modifier();
                }
                }
                this.state = 365;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 366;
            this.match(Stage3DParser.IDENTIFIER);
            this.state = 367;
            this.fnSignatureTyped();
            this.state = 371;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 469762049) !== 0) || ((((_la - 86)) & ~0x1F) === 0 && ((1 << (_la - 86)) & 55) !== 0)) {
                {
                {
                this.state = 368;
                this.statement();
                }
                }
                this.state = 373;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 374;
            this.match(Stage3DParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 30, Stage3DParser.RULE_abstractMethodDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 376;
            this.match(Stage3DParser.LPAREN);
            this.state = 377;
            this.match(Stage3DParser.ABSTRACT_METHOD);
            this.state = 381;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 86) {
                {
                {
                this.state = 378;
                this.modifier();
                }
                }
                this.state = 383;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 384;
            this.match(Stage3DParser.IDENTIFIER);
            this.state = 385;
            this.fnSignatureTyped();
            this.state = 386;
            this.match(Stage3DParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 32, Stage3DParser.RULE_getterDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 388;
            this.match(Stage3DParser.LPAREN);
            this.state = 389;
            this.match(Stage3DParser.GET);
            this.state = 393;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 86) {
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
            this.state = 396;
            this.match(Stage3DParser.IDENTIFIER);
            this.state = 397;
            this.fnSignatureTyped();
            this.state = 401;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 469762049) !== 0) || ((((_la - 86)) & ~0x1F) === 0 && ((1 << (_la - 86)) & 55) !== 0)) {
                {
                {
                this.state = 398;
                this.statement();
                }
                }
                this.state = 403;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 404;
            this.match(Stage3DParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 34, Stage3DParser.RULE_setterDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 406;
            this.match(Stage3DParser.LPAREN);
            this.state = 407;
            this.match(Stage3DParser.SETPROP);
            this.state = 411;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 86) {
                {
                {
                this.state = 408;
                this.modifier();
                }
                }
                this.state = 413;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 414;
            this.match(Stage3DParser.IDENTIFIER);
            this.state = 415;
            this.fnSignatureTyped();
            this.state = 419;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 469762049) !== 0) || ((((_la - 86)) & ~0x1F) === 0 && ((1 << (_la - 86)) & 55) !== 0)) {
                {
                {
                this.state = 416;
                this.statement();
                }
                }
                this.state = 421;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 422;
            this.match(Stage3DParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 36, Stage3DParser.RULE_modifier);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 424;
            this.match(Stage3DParser.KEYWORD);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 38, Stage3DParser.RULE_typedParam);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 426;
            this.match(Stage3DParser.LPAREN);
            this.state = 427;
            this.match(Stage3DParser.IDENTIFIER);
            this.state = 429;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 74) {
                {
                this.state = 428;
                this.match(Stage3DParser.OPTIONAL);
                }
            }

            this.state = 433;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 78) {
                {
                this.state = 431;
                this.match(Stage3DParser.COLON);
                this.state = 432;
                this.typeExpr();
                }
            }

            this.state = 435;
            this.match(Stage3DParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 40, Stage3DParser.RULE_fnSignatureTyped);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 437;
            this.match(Stage3DParser.LPAREN);
            this.state = 448;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2) {
                {
                this.state = 438;
                this.typedParam();
                this.state = 445;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 2 || _la === 4) {
                    {
                    {
                    this.state = 440;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    if (_la === 4) {
                        {
                        this.state = 439;
                        this.match(Stage3DParser.COMMA);
                        }
                    }

                    this.state = 442;
                    this.typedParam();
                    }
                    }
                    this.state = 447;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
            }

            this.state = 450;
            this.match(Stage3DParser.RPAREN);
            this.state = 456;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 30, this.context) ) {
            case 1:
                {
                this.state = 451;
                this.match(Stage3DParser.LPAREN);
                this.state = 452;
                this.match(Stage3DParser.RETURNS);
                this.state = 453;
                this.typeExpr();
                this.state = 454;
                this.match(Stage3DParser.RPAREN);
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
        this.enterRule(localContext, 42, Stage3DParser.RULE_statement);
        try {
            this.state = 475;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 31, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 458;
                this.letStar();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 459;
                this.letStmt();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 460;
                this.constStar();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 461;
                this.constStmt();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 462;
                this.ifForm();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 463;
                this.whileForm();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 464;
                this.block();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 465;
                this.returnForm();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 466;
                this.throwForm();
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 467;
                this.importForm();
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 468;
                this.exportForm();
                }
                break;
            case 12:
                this.enterOuterAlt(localContext, 12);
                {
                this.state = 469;
                this.switchForm();
                }
                break;
            case 13:
                this.enterOuterAlt(localContext, 13);
                {
                this.state = 470;
                this.forForm();
                }
                break;
            case 14:
                this.enterOuterAlt(localContext, 14);
                {
                this.state = 471;
                this.forInForm();
                }
                break;
            case 15:
                this.enterOuterAlt(localContext, 15);
                {
                this.state = 472;
                this.forOfForm();
                }
                break;
            case 16:
                this.enterOuterAlt(localContext, 16);
                {
                this.state = 473;
                this.assign();
                }
                break;
            case 17:
                this.enterOuterAlt(localContext, 17);
                {
                this.state = 474;
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
        this.enterRule(localContext, 44, Stage3DParser.RULE_letStar);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 477;
            this.match(Stage3DParser.LPAREN);
            this.state = 478;
            this.match(Stage3DParser.LETSTAR);
            this.state = 479;
            this.match(Stage3DParser.LPAREN);
            this.state = 483;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 480;
                this.starBinding();
                }
                }
                this.state = 485;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 486;
            this.match(Stage3DParser.RPAREN);
            this.state = 490;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 469762049) !== 0) || ((((_la - 86)) & ~0x1F) === 0 && ((1 << (_la - 86)) & 55) !== 0)) {
                {
                {
                this.state = 487;
                this.statement();
                }
                }
                this.state = 492;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 493;
            this.match(Stage3DParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 46, Stage3DParser.RULE_letStmt);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 495;
            this.match(Stage3DParser.LPAREN);
            this.state = 496;
            this.match(Stage3DParser.LET);
            this.state = 497;
            this.singleBinding();
            this.state = 498;
            this.expression();
            this.state = 499;
            this.match(Stage3DParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 48, Stage3DParser.RULE_constStar);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 501;
            this.match(Stage3DParser.LPAREN);
            this.state = 502;
            this.match(Stage3DParser.CONSTSTAR);
            this.state = 503;
            this.match(Stage3DParser.LPAREN);
            this.state = 507;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 504;
                this.starBinding();
                }
                }
                this.state = 509;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 510;
            this.match(Stage3DParser.RPAREN);
            this.state = 514;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 469762049) !== 0) || ((((_la - 86)) & ~0x1F) === 0 && ((1 << (_la - 86)) & 55) !== 0)) {
                {
                {
                this.state = 511;
                this.statement();
                }
                }
                this.state = 516;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 517;
            this.match(Stage3DParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 50, Stage3DParser.RULE_constStmt);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 519;
            this.match(Stage3DParser.LPAREN);
            this.state = 520;
            this.match(Stage3DParser.CONST);
            this.state = 521;
            this.singleBinding();
            this.state = 522;
            this.expression();
            this.state = 523;
            this.match(Stage3DParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 52, Stage3DParser.RULE_ifForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 525;
            this.match(Stage3DParser.LPAREN);
            this.state = 526;
            this.match(Stage3DParser.IF);
            this.state = 527;
            this.expression();
            this.state = 528;
            this.statement();
            this.state = 530;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2 || ((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 469762049) !== 0) || ((((_la - 86)) & ~0x1F) === 0 && ((1 << (_la - 86)) & 55) !== 0)) {
                {
                this.state = 529;
                this.statement();
                }
            }

            this.state = 532;
            this.match(Stage3DParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 54, Stage3DParser.RULE_whileForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 534;
            this.match(Stage3DParser.LPAREN);
            this.state = 535;
            this.match(Stage3DParser.WHILE);
            this.state = 536;
            this.expression();
            this.state = 540;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 469762049) !== 0) || ((((_la - 86)) & ~0x1F) === 0 && ((1 << (_la - 86)) & 55) !== 0)) {
                {
                {
                this.state = 537;
                this.statement();
                }
                }
                this.state = 542;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 543;
            this.match(Stage3DParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 56, Stage3DParser.RULE_block);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 545;
            this.match(Stage3DParser.LPAREN);
            this.state = 546;
            this.match(Stage3DParser.BEGIN);
            this.state = 550;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 469762049) !== 0) || ((((_la - 86)) & ~0x1F) === 0 && ((1 << (_la - 86)) & 55) !== 0)) {
                {
                {
                this.state = 547;
                this.statement();
                }
                }
                this.state = 552;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 553;
            this.match(Stage3DParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 58, Stage3DParser.RULE_returnForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 555;
            this.match(Stage3DParser.LPAREN);
            this.state = 556;
            this.match(Stage3DParser.RETURN);
            this.state = 558;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2 || ((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 469762049) !== 0) || ((((_la - 86)) & ~0x1F) === 0 && ((1 << (_la - 86)) & 55) !== 0)) {
                {
                this.state = 557;
                this.expression();
                }
            }

            this.state = 560;
            this.match(Stage3DParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 60, Stage3DParser.RULE_throwForm);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 562;
            this.match(Stage3DParser.LPAREN);
            this.state = 563;
            this.match(Stage3DParser.THROW);
            this.state = 564;
            this.expression();
            this.state = 565;
            this.match(Stage3DParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 62, Stage3DParser.RULE_importForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 567;
            this.match(Stage3DParser.LPAREN);
            this.state = 568;
            this.match(Stage3DParser.IMPORT);
            this.state = 570;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2) {
                {
                this.state = 569;
                this.objectExpr();
                }
            }

            this.state = 572;
            this.match(Stage3DParser.STRING);
            this.state = 573;
            this.match(Stage3DParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 64, Stage3DParser.RULE_exportForm);
        try {
            this.state = 580;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 41, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 575;
                this.exportBinding();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 576;
                this.exportDefault();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 577;
                this.exportNamed();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 578;
                this.exportFrom();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 579;
                this.exportAllFrom();
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
        this.enterRule(localContext, 66, Stage3DParser.RULE_exportBinding);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 582;
            this.match(Stage3DParser.LPAREN);
            this.state = 583;
            this.match(Stage3DParser.EXPORT);
            this.state = 584;
            this.match(Stage3DParser.IDENTIFIER);
            this.state = 585;
            this.expression();
            this.state = 586;
            this.match(Stage3DParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 68, Stage3DParser.RULE_exportDefault);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 588;
            this.match(Stage3DParser.LPAREN);
            this.state = 589;
            this.match(Stage3DParser.EXPORT_DEFAULT);
            this.state = 590;
            this.expression();
            this.state = 591;
            this.match(Stage3DParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 70, Stage3DParser.RULE_exportNamed);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 593;
            this.match(Stage3DParser.LPAREN);
            this.state = 594;
            this.match(Stage3DParser.EXPORT_NAMED);
            this.state = 596;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 595;
                this.exportNamePair();
                }
                }
                this.state = 598;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2);
            this.state = 600;
            this.match(Stage3DParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 72, Stage3DParser.RULE_exportNamePair);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 602;
            this.match(Stage3DParser.LPAREN);
            this.state = 603;
            this.match(Stage3DParser.IDENTIFIER);
            this.state = 605;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 91) {
                {
                this.state = 604;
                this.match(Stage3DParser.IDENTIFIER);
                }
            }

            this.state = 607;
            this.match(Stage3DParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 74, Stage3DParser.RULE_exportFrom);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 609;
            this.match(Stage3DParser.LPAREN);
            this.state = 610;
            this.match(Stage3DParser.EXPORT_FROM);
            this.state = 611;
            this.match(Stage3DParser.STRING);
            this.state = 613;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 612;
                this.exportNamePair();
                }
                }
                this.state = 615;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2);
            this.state = 617;
            this.match(Stage3DParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 76, Stage3DParser.RULE_exportAllFrom);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 619;
            this.match(Stage3DParser.LPAREN);
            this.state = 620;
            this.match(Stage3DParser.EXPORT_ALL_FROM);
            this.state = 621;
            this.match(Stage3DParser.STRING);
            this.state = 622;
            this.match(Stage3DParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 78, Stage3DParser.RULE_starBinding);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 624;
            this.match(Stage3DParser.LPAREN);
            this.state = 625;
            this.match(Stage3DParser.IDENTIFIER);
            this.state = 628;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 78) {
                {
                this.state = 626;
                this.match(Stage3DParser.COLON);
                this.state = 627;
                this.typeExpr();
                }
            }

            this.state = 630;
            this.expression();
            this.state = 631;
            this.match(Stage3DParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 80, Stage3DParser.RULE_singleBinding);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 633;
            this.match(Stage3DParser.LPAREN);
            this.state = 634;
            this.match(Stage3DParser.IDENTIFIER);
            this.state = 637;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 78) {
                {
                this.state = 635;
                this.match(Stage3DParser.COLON);
                this.state = 636;
                this.typeExpr();
                }
            }

            this.state = 639;
            this.match(Stage3DParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 82, Stage3DParser.RULE_typeExpr);
        try {
            this.state = 657;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 47, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 641;
                this.match(Stage3DParser.IDENTIFIER);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 642;
                this.typeUnion();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 643;
                this.typeIntersection();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 644;
                this.typeArray();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 645;
                this.typeTuple();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 646;
                this.typeFunction();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 647;
                this.typeObject();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 648;
                this.typeLiteral();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 649;
                this.typeKeyof();
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 650;
                this.typeTypeof();
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 651;
                this.typeIndexAccess();
                }
                break;
            case 12:
                this.enterOuterAlt(localContext, 12);
                {
                this.state = 652;
                this.typeConditional();
                }
                break;
            case 13:
                this.enterOuterAlt(localContext, 13);
                {
                this.state = 653;
                this.typeInfer();
                }
                break;
            case 14:
                this.enterOuterAlt(localContext, 14);
                {
                this.state = 654;
                this.typeMapped();
                }
                break;
            case 15:
                this.enterOuterAlt(localContext, 15);
                {
                this.state = 655;
                this.typeTemplateLiteral();
                }
                break;
            case 16:
                this.enterOuterAlt(localContext, 16);
                {
                this.state = 656;
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
        this.enterRule(localContext, 84, Stage3DParser.RULE_typeUnion);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 659;
            this.match(Stage3DParser.LPAREN);
            this.state = 660;
            this.match(Stage3DParser.UNION);
            this.state = 661;
            this.typeExpr();
            this.state = 663;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 662;
                this.typeExpr();
                }
                }
                this.state = 665;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 91);
            this.state = 667;
            this.match(Stage3DParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 86, Stage3DParser.RULE_typeIntersection);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 669;
            this.match(Stage3DParser.LPAREN);
            this.state = 670;
            this.match(Stage3DParser.INTERSECT);
            this.state = 671;
            this.typeExpr();
            this.state = 673;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 672;
                this.typeExpr();
                }
                }
                this.state = 675;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 91);
            this.state = 677;
            this.match(Stage3DParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 88, Stage3DParser.RULE_typeArray);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 679;
            this.match(Stage3DParser.LPAREN);
            this.state = 680;
            this.match(Stage3DParser.ARRAY);
            this.state = 681;
            this.typeExpr();
            this.state = 682;
            this.match(Stage3DParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 90, Stage3DParser.RULE_typeTuple);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 684;
            this.match(Stage3DParser.LPAREN);
            this.state = 685;
            this.match(Stage3DParser.TUPLE);
            this.state = 687;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 686;
                this.typeTupleElement();
                }
                }
                this.state = 689;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 91);
            this.state = 691;
            this.match(Stage3DParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 92, Stage3DParser.RULE_typeTupleElement);
        try {
            this.state = 704;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 51, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 693;
                this.match(Stage3DParser.LPAREN);
                this.state = 694;
                this.match(Stage3DParser.REST);
                this.state = 695;
                this.typeExpr();
                this.state = 696;
                this.match(Stage3DParser.RPAREN);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 698;
                this.match(Stage3DParser.LPAREN);
                this.state = 699;
                this.match(Stage3DParser.IDENTIFIER);
                this.state = 700;
                this.typeExpr();
                this.state = 701;
                this.match(Stage3DParser.RPAREN);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 703;
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
        this.enterRule(localContext, 94, Stage3DParser.RULE_typeFunction);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 706;
            this.match(Stage3DParser.LPAREN);
            this.state = 707;
            this.match(Stage3DParser.TYPEFN);
            this.state = 709;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 52, this.context) ) {
            case 1:
                {
                this.state = 708;
                this.typeParams();
                }
                break;
            }
            this.state = 711;
            this.match(Stage3DParser.LPAREN);
            this.state = 715;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 712;
                this.typeFnParam();
                }
                }
                this.state = 717;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 718;
            this.match(Stage3DParser.RPAREN);
            this.state = 719;
            this.typeExpr();
            this.state = 720;
            this.match(Stage3DParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 96, Stage3DParser.RULE_typeFnParam);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 722;
            this.match(Stage3DParser.LPAREN);
            this.state = 723;
            this.match(Stage3DParser.IDENTIFIER);
            this.state = 725;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 74) {
                {
                this.state = 724;
                this.match(Stage3DParser.OPTIONAL);
                }
            }

            this.state = 727;
            this.typeExpr();
            this.state = 728;
            this.match(Stage3DParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 98, Stage3DParser.RULE_typeObject);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 730;
            this.match(Stage3DParser.LPAREN);
            this.state = 731;
            this.match(Stage3DParser.IDENTIFIER);
            this.state = 735;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 732;
                this.typeProp();
                }
                }
                this.state = 737;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 738;
            this.match(Stage3DParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 100, Stage3DParser.RULE_typeProp);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 740;
            this.match(Stage3DParser.LPAREN);
            this.state = 744;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 66) {
                {
                {
                this.state = 741;
                this.propModifier();
                }
                }
                this.state = 746;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 747;
            this.match(Stage3DParser.IDENTIFIER);
            this.state = 749;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 74) {
                {
                this.state = 748;
                this.match(Stage3DParser.OPTIONAL);
                }
            }

            this.state = 751;
            this.typeExpr();
            this.state = 752;
            this.match(Stage3DParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 102, Stage3DParser.RULE_propModifier);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 754;
            this.match(Stage3DParser.READONLY);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 104, Stage3DParser.RULE_typeLiteral);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 756;
            this.match(Stage3DParser.LPAREN);
            this.state = 757;
            this.match(Stage3DParser.LIT);
            this.state = 758;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 75)) & ~0x1F) === 0 && ((1 << (_la - 75)) & 45057) !== 0))) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 759;
            this.match(Stage3DParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 106, Stage3DParser.RULE_typeKeyof);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 761;
            this.match(Stage3DParser.LPAREN);
            this.state = 762;
            this.match(Stage3DParser.KEYOF);
            this.state = 763;
            this.typeExpr();
            this.state = 764;
            this.match(Stage3DParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 108, Stage3DParser.RULE_typeTypeof);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 766;
            this.match(Stage3DParser.LPAREN);
            this.state = 767;
            this.match(Stage3DParser.TYPEOF);
            this.state = 768;
            this.match(Stage3DParser.IDENTIFIER);
            this.state = 769;
            this.match(Stage3DParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 110, Stage3DParser.RULE_typeIndexAccess);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 771;
            this.match(Stage3DParser.LPAREN);
            this.state = 772;
            this.match(Stage3DParser.INDEX);
            this.state = 773;
            this.typeExpr();
            this.state = 774;
            this.typeExpr();
            this.state = 775;
            this.match(Stage3DParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 112, Stage3DParser.RULE_typeConditional);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 777;
            this.match(Stage3DParser.LPAREN);
            this.state = 778;
            this.match(Stage3DParser.COND);
            this.state = 779;
            this.typeExpr();
            this.state = 780;
            this.typeExpr();
            this.state = 781;
            this.typeExpr();
            this.state = 782;
            this.typeExpr();
            this.state = 783;
            this.match(Stage3DParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 114, Stage3DParser.RULE_typeInfer);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 785;
            this.match(Stage3DParser.LPAREN);
            this.state = 786;
            this.match(Stage3DParser.INFER);
            this.state = 787;
            this.match(Stage3DParser.IDENTIFIER);
            this.state = 788;
            this.match(Stage3DParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 116, Stage3DParser.RULE_typeMapped);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 790;
            this.match(Stage3DParser.LPAREN);
            this.state = 791;
            this.match(Stage3DParser.MAPPED);
            this.state = 792;
            this.match(Stage3DParser.IDENTIFIER);
            this.state = 793;
            this.typeExpr();
            this.state = 795;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 58, this.context) ) {
            case 1:
                {
                this.state = 794;
                this.mappedModifiers();
                }
                break;
            }
            this.state = 797;
            this.typeExpr();
            this.state = 798;
            this.match(Stage3DParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 118, Stage3DParser.RULE_mappedModifiers);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 800;
            this.match(Stage3DParser.LPAREN);
            this.state = 801;
            this.match(Stage3DParser.MODIFIERS);
            this.state = 803;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 802;
                this.mappedModifier();
                }
                }
                this.state = 805;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 66 || _la === 74);
            this.state = 807;
            this.match(Stage3DParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 120, Stage3DParser.RULE_mappedModifier);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 809;
            _la = this.tokenStream.LA(1);
            if(!(_la === 66 || _la === 74)) {
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
        this.enterRule(localContext, 122, Stage3DParser.RULE_typeTemplateLiteral);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 811;
            this.match(Stage3DParser.LPAREN);
            this.state = 812;
            this.match(Stage3DParser.TEMPLATE);
            this.state = 814;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 813;
                this.templatePart();
                }
                }
                this.state = 816;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 88 || _la === 91);
            this.state = 818;
            this.match(Stage3DParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 124, Stage3DParser.RULE_templatePart);
        try {
            this.state = 822;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case Stage3DParser.STRING:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 820;
                this.match(Stage3DParser.STRING);
                }
                break;
            case Stage3DParser.LPAREN:
            case Stage3DParser.IDENTIFIER:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 821;
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
        this.enterRule(localContext, 126, Stage3DParser.RULE_typeApplication);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 824;
            this.match(Stage3DParser.LPAREN);
            this.state = 825;
            this.typeExpr();
            this.state = 827;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 826;
                this.typeExpr();
                }
                }
                this.state = 829;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 91);
            this.state = 831;
            this.match(Stage3DParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 128, Stage3DParser.RULE_typeParams);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 833;
            this.match(Stage3DParser.LPAREN);
            this.state = 834;
            this.match(Stage3DParser.TYPE_PARAMS);
            this.state = 836;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 835;
                this.typeParamDecl();
                }
                }
                this.state = 838;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 91);
            this.state = 840;
            this.match(Stage3DParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 130, Stage3DParser.RULE_typeParamDecl);
        let _la: number;
        try {
            this.state = 852;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case Stage3DParser.IDENTIFIER:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 842;
                this.match(Stage3DParser.IDENTIFIER);
                }
                break;
            case Stage3DParser.LPAREN:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 843;
                this.match(Stage3DParser.LPAREN);
                this.state = 844;
                this.match(Stage3DParser.IDENTIFIER);
                this.state = 846;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 64, this.context) ) {
                case 1:
                    {
                    this.state = 845;
                    this.typeParamConstraint();
                    }
                    break;
                }
                this.state = 849;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 2) {
                    {
                    this.state = 848;
                    this.typeParamDefault();
                    }
                }

                this.state = 851;
                this.match(Stage3DParser.RPAREN);
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
        this.enterRule(localContext, 132, Stage3DParser.RULE_typeParamConstraint);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 854;
            this.match(Stage3DParser.LPAREN);
            this.state = 855;
            this.match(Stage3DParser.EXTENDS);
            this.state = 856;
            this.typeExpr();
            this.state = 857;
            this.match(Stage3DParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 134, Stage3DParser.RULE_typeParamDefault);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 859;
            this.match(Stage3DParser.LPAREN);
            this.state = 860;
            this.match(Stage3DParser.DEFAULT);
            this.state = 861;
            this.typeExpr();
            this.state = 862;
            this.match(Stage3DParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 136, Stage3DParser.RULE_assign);
        try {
            this.state = 876;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 67, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 864;
                this.match(Stage3DParser.LPAREN);
                this.state = 865;
                this.match(Stage3DParser.SET);
                this.state = 866;
                this.match(Stage3DParser.IDENTIFIER);
                this.state = 867;
                this.expression();
                this.state = 868;
                this.match(Stage3DParser.RPAREN);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 870;
                this.match(Stage3DParser.LPAREN);
                this.state = 871;
                this.match(Stage3DParser.SET);
                this.state = 872;
                this.propAccess();
                this.state = 873;
                this.expression();
                this.state = 874;
                this.match(Stage3DParser.RPAREN);
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
        this.enterRule(localContext, 138, Stage3DParser.RULE_switchForm);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 878;
            this.match(Stage3DParser.LPAREN);
            this.state = 879;
            this.match(Stage3DParser.SWITCH);
            this.state = 880;
            this.expression();
            this.state = 884;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 68, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 881;
                    this.caseClause();
                    }
                    }
                }
                this.state = 886;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 68, this.context);
            }
            this.state = 888;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2) {
                {
                this.state = 887;
                this.defaultClause();
                }
            }

            this.state = 890;
            this.match(Stage3DParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 140, Stage3DParser.RULE_caseClause);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 892;
            this.match(Stage3DParser.LPAREN);
            this.state = 893;
            this.match(Stage3DParser.CASE);
            this.state = 894;
            this.expression();
            this.state = 898;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 469762049) !== 0) || ((((_la - 86)) & ~0x1F) === 0 && ((1 << (_la - 86)) & 55) !== 0)) {
                {
                {
                this.state = 895;
                this.statement();
                }
                }
                this.state = 900;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 901;
            this.match(Stage3DParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 142, Stage3DParser.RULE_defaultClause);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 903;
            this.match(Stage3DParser.LPAREN);
            this.state = 904;
            this.match(Stage3DParser.DEFAULT);
            this.state = 908;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 469762049) !== 0) || ((((_la - 86)) & ~0x1F) === 0 && ((1 << (_la - 86)) & 55) !== 0)) {
                {
                {
                this.state = 905;
                this.statement();
                }
                }
                this.state = 910;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 911;
            this.match(Stage3DParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 144, Stage3DParser.RULE_forForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 913;
            this.match(Stage3DParser.LPAREN);
            this.state = 914;
            this.match(Stage3DParser.FOR);
            this.state = 915;
            this.letStmt();
            this.state = 916;
            this.expression();
            this.state = 917;
            this.assign();
            this.state = 921;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 469762049) !== 0) || ((((_la - 86)) & ~0x1F) === 0 && ((1 << (_la - 86)) & 55) !== 0)) {
                {
                {
                this.state = 918;
                this.statement();
                }
                }
                this.state = 923;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 924;
            this.match(Stage3DParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 146, Stage3DParser.RULE_forInForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 926;
            this.match(Stage3DParser.LPAREN);
            this.state = 927;
            this.match(Stage3DParser.FORIN);
            this.state = 928;
            this.match(Stage3DParser.IDENTIFIER);
            this.state = 929;
            this.expression();
            this.state = 933;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 469762049) !== 0) || ((((_la - 86)) & ~0x1F) === 0 && ((1 << (_la - 86)) & 55) !== 0)) {
                {
                {
                this.state = 930;
                this.statement();
                }
                }
                this.state = 935;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 936;
            this.match(Stage3DParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 148, Stage3DParser.RULE_forOfForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 938;
            this.match(Stage3DParser.LPAREN);
            this.state = 939;
            this.match(Stage3DParser.FOROF);
            this.state = 940;
            this.match(Stage3DParser.IDENTIFIER);
            this.state = 941;
            this.expression();
            this.state = 945;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 469762049) !== 0) || ((((_la - 86)) & ~0x1F) === 0 && ((1 << (_la - 86)) & 55) !== 0)) {
                {
                {
                this.state = 942;
                this.statement();
                }
                }
                this.state = 947;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 948;
            this.match(Stage3DParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 150, Stage3DParser.RULE_expression);
        try {
            this.state = 975;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 75, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 950;
                this.literal();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 951;
                this.match(Stage3DParser.KEYWORD);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 952;
                this.match(Stage3DParser.IDENTIFIER);
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 953;
                this.lambda();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 954;
                this.fn();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 955;
                this.bindExpr();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 956;
                this.methodCallExpr();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 957;
                this.objectExpr();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 958;
                this.arrayExpr();
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 959;
                this.propAccess();
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 960;
                this.indexAccess();
                }
                break;
            case 12:
                this.enterOuterAlt(localContext, 12);
                {
                this.state = 961;
                this.quasiquote();
                }
                break;
            case 13:
                this.enterOuterAlt(localContext, 13);
                {
                this.state = 962;
                this.unquote();
                }
                break;
            case 14:
                this.enterOuterAlt(localContext, 14);
                {
                this.state = 963;
                this.unquoteSplicing();
                }
                break;
            case 15:
                this.enterOuterAlt(localContext, 15);
                {
                this.state = 964;
                this.ternary();
                }
                break;
            case 16:
                this.enterOuterAlt(localContext, 16);
                {
                this.state = 965;
                this.condExpr();
                }
                break;
            case 17:
                this.enterOuterAlt(localContext, 17);
                {
                this.state = 966;
                this.newForm();
                }
                break;
            case 18:
                this.enterOuterAlt(localContext, 18);
                {
                this.state = 967;
                this.optChain();
                }
                break;
            case 19:
                this.enterOuterAlt(localContext, 19);
                {
                this.state = 968;
                this.nullCoalesce();
                }
                break;
            case 20:
                this.enterOuterAlt(localContext, 20);
                {
                this.state = 969;
                this.typeofExpr();
                }
                break;
            case 21:
                this.enterOuterAlt(localContext, 21);
                {
                this.state = 970;
                this.typeAssert();
                }
                break;
            case 22:
                this.enterOuterAlt(localContext, 22);
                {
                this.state = 971;
                this.thisExpr();
                }
                break;
            case 23:
                this.enterOuterAlt(localContext, 23);
                {
                this.state = 972;
                this.superConstructorCall();
                }
                break;
            case 24:
                this.enterOuterAlt(localContext, 24);
                {
                this.state = 973;
                this.superMethodCall();
                }
                break;
            case 25:
                this.enterOuterAlt(localContext, 25);
                {
                this.state = 974;
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
    public typeofExpr(): TypeofExprContext {
        let localContext = new TypeofExprContext(this.context, this.state);
        this.enterRule(localContext, 152, Stage3DParser.RULE_typeofExpr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 977;
            this.match(Stage3DParser.LPAREN);
            this.state = 978;
            this.match(Stage3DParser.TYPEOF);
            this.state = 979;
            this.expression();
            this.state = 980;
            this.match(Stage3DParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 154, Stage3DParser.RULE_typeAssert);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 982;
            this.match(Stage3DParser.LPAREN);
            this.state = 983;
            this.match(Stage3DParser.TYPE_AS);
            this.state = 984;
            this.expression();
            this.state = 985;
            this.typeExpr();
            this.state = 986;
            this.match(Stage3DParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 156, Stage3DParser.RULE_thisExpr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 988;
            this.match(Stage3DParser.THIS);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 158, Stage3DParser.RULE_superConstructorCall);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 990;
            this.match(Stage3DParser.LPAREN);
            this.state = 991;
            this.match(Stage3DParser.SUPER);
            this.state = 995;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 469762049) !== 0) || ((((_la - 86)) & ~0x1F) === 0 && ((1 << (_la - 86)) & 55) !== 0)) {
                {
                {
                this.state = 992;
                this.expression();
                }
                }
                this.state = 997;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 998;
            this.match(Stage3DParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 160, Stage3DParser.RULE_superMethodCall);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1000;
            this.match(Stage3DParser.LPAREN);
            this.state = 1001;
            this.match(Stage3DParser.SUPER_METHOD);
            this.state = 1002;
            this.match(Stage3DParser.IDENTIFIER);
            this.state = 1006;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 469762049) !== 0) || ((((_la - 86)) & ~0x1F) === 0 && ((1 << (_la - 86)) & 55) !== 0)) {
                {
                {
                this.state = 1003;
                this.expression();
                }
                }
                this.state = 1008;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1009;
            this.match(Stage3DParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 162, Stage3DParser.RULE_lambda);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1011;
            this.match(Stage3DParser.LPAREN);
            this.state = 1012;
            this.match(Stage3DParser.LAMBDA);
            this.state = 1013;
            this.fnSignature();
            this.state = 1017;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 469762049) !== 0) || ((((_la - 86)) & ~0x1F) === 0 && ((1 << (_la - 86)) & 55) !== 0)) {
                {
                {
                this.state = 1014;
                this.statement();
                }
                }
                this.state = 1019;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1020;
            this.match(Stage3DParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 164, Stage3DParser.RULE_fn);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1022;
            this.match(Stage3DParser.LPAREN);
            this.state = 1023;
            this.match(Stage3DParser.FN);
            this.state = 1024;
            this.fnSignature();
            this.state = 1028;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 469762049) !== 0) || ((((_la - 86)) & ~0x1F) === 0 && ((1 << (_la - 86)) & 55) !== 0)) {
                {
                {
                this.state = 1025;
                this.statement();
                }
                }
                this.state = 1030;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1031;
            this.match(Stage3DParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 166, Stage3DParser.RULE_bindExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1033;
            this.match(Stage3DParser.LPAREN);
            this.state = 1034;
            this.match(Stage3DParser.BIND);
            this.state = 1035;
            this.expression();
            this.state = 1036;
            this.expression();
            this.state = 1040;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 469762049) !== 0) || ((((_la - 86)) & ~0x1F) === 0 && ((1 << (_la - 86)) & 55) !== 0)) {
                {
                {
                this.state = 1037;
                this.expression();
                }
                }
                this.state = 1042;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1043;
            this.match(Stage3DParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 168, Stage3DParser.RULE_methodCallExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1045;
            this.match(Stage3DParser.LPAREN);
            this.state = 1046;
            this.match(Stage3DParser.METHOD_CALL);
            this.state = 1047;
            this.expression();
            this.state = 1048;
            this.expression();
            this.state = 1052;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 469762049) !== 0) || ((((_la - 86)) & ~0x1F) === 0 && ((1 << (_la - 86)) & 55) !== 0)) {
                {
                {
                this.state = 1049;
                this.expression();
                }
                }
                this.state = 1054;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1055;
            this.match(Stage3DParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 170, Stage3DParser.RULE_ternary);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1057;
            this.match(Stage3DParser.LPAREN);
            this.state = 1058;
            this.match(Stage3DParser.TERNARY);
            this.state = 1059;
            this.expression();
            this.state = 1060;
            this.expression();
            this.state = 1061;
            this.expression();
            this.state = 1062;
            this.match(Stage3DParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 172, Stage3DParser.RULE_condExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1064;
            this.match(Stage3DParser.LPAREN);
            this.state = 1065;
            this.match(Stage3DParser.COND);
            this.state = 1069;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 1066;
                this.expression();
                this.state = 1067;
                this.expression();
                }
                }
                this.state = 1071;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || ((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 469762049) !== 0) || ((((_la - 86)) & ~0x1F) === 0 && ((1 << (_la - 86)) & 55) !== 0));
            this.state = 1073;
            this.match(Stage3DParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 174, Stage3DParser.RULE_newForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1075;
            this.match(Stage3DParser.LPAREN);
            this.state = 1076;
            this.match(Stage3DParser.NEW);
            this.state = 1077;
            this.match(Stage3DParser.IDENTIFIER);
            this.state = 1079;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 83, this.context) ) {
            case 1:
                {
                this.state = 1078;
                this.typeArgs();
                }
                break;
            }
            this.state = 1084;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 469762049) !== 0) || ((((_la - 86)) & ~0x1F) === 0 && ((1 << (_la - 86)) & 55) !== 0)) {
                {
                {
                this.state = 1081;
                this.expression();
                }
                }
                this.state = 1086;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1087;
            this.match(Stage3DParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 176, Stage3DParser.RULE_objectExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1089;
            this.match(Stage3DParser.LPAREN);
            this.state = 1090;
            this.match(Stage3DParser.OBJECT);
            this.state = 1094;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 1091;
                this.objectField();
                }
                }
                this.state = 1096;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1097;
            this.match(Stage3DParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 178, Stage3DParser.RULE_objectField);
        try {
            this.state = 1112;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 86, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1099;
                this.match(Stage3DParser.LPAREN);
                this.state = 1100;
                this.propKey();
                this.state = 1101;
                this.expression();
                this.state = 1102;
                this.match(Stage3DParser.RPAREN);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1104;
                this.match(Stage3DParser.LPAREN);
                this.state = 1105;
                this.propKey();
                this.state = 1106;
                this.objectMethodDef();
                this.state = 1107;
                this.match(Stage3DParser.RPAREN);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 1109;
                this.match(Stage3DParser.LPAREN);
                this.state = 1110;
                this.match(Stage3DParser.IDENTIFIER);
                this.state = 1111;
                this.match(Stage3DParser.RPAREN);
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
    public objectMethodDef(): ObjectMethodDefContext {
        let localContext = new ObjectMethodDefContext(this.context, this.state);
        this.enterRule(localContext, 180, Stage3DParser.RULE_objectMethodDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1114;
            this.match(Stage3DParser.LPAREN);
            this.state = 1115;
            this.match(Stage3DParser.METHOD);
            this.state = 1116;
            this.fnSignature();
            this.state = 1120;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 469762049) !== 0) || ((((_la - 86)) & ~0x1F) === 0 && ((1 << (_la - 86)) & 55) !== 0)) {
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
            this.match(Stage3DParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 182, Stage3DParser.RULE_arrayExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1125;
            this.match(Stage3DParser.LPAREN);
            this.state = 1126;
            this.match(Stage3DParser.ARRAY);
            this.state = 1130;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 469762049) !== 0) || ((((_la - 86)) & ~0x1F) === 0 && ((1 << (_la - 86)) & 55) !== 0)) {
                {
                {
                this.state = 1127;
                this.expression();
                }
                }
                this.state = 1132;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1133;
            this.match(Stage3DParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 184, Stage3DParser.RULE_propKey);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1135;
            _la = this.tokenStream.LA(1);
            if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 2818572256) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 4294967295) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 226376703) !== 0))) {
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
        this.enterRule(localContext, 186, Stage3DParser.RULE_propAccess);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1137;
            this.match(Stage3DParser.LPAREN);
            this.state = 1138;
            this.match(Stage3DParser.DOT);
            this.state = 1139;
            this.expression();
            this.state = 1140;
            this.propKey();
            this.state = 1141;
            this.match(Stage3DParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 188, Stage3DParser.RULE_indexAccess);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1143;
            this.match(Stage3DParser.LPAREN);
            this.state = 1144;
            this.match(Stage3DParser.INDEX);
            this.state = 1145;
            this.expression();
            this.state = 1146;
            this.expression();
            this.state = 1147;
            this.match(Stage3DParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 190, Stage3DParser.RULE_quasiquote);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1149;
            this.match(Stage3DParser.LPAREN);
            this.state = 1150;
            _la = this.tokenStream.LA(1);
            if(!(_la === 31 || _la === 32)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 1151;
            this.expression();
            this.state = 1152;
            this.match(Stage3DParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 192, Stage3DParser.RULE_unquote);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1154;
            this.match(Stage3DParser.LPAREN);
            this.state = 1155;
            this.match(Stage3DParser.UNQUOTE);
            this.state = 1156;
            this.expression();
            this.state = 1157;
            this.match(Stage3DParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 194, Stage3DParser.RULE_unquoteSplicing);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1159;
            this.match(Stage3DParser.LPAREN);
            this.state = 1160;
            this.match(Stage3DParser.UNQUOTE_SPLICING);
            this.state = 1161;
            this.expression();
            this.state = 1162;
            this.match(Stage3DParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 196, Stage3DParser.RULE_optChain);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1164;
            this.match(Stage3DParser.LPAREN);
            this.state = 1165;
            this.match(Stage3DParser.OPTCHAIN);
            this.state = 1166;
            this.expression();
            this.state = 1167;
            this.propKey();
            this.state = 1168;
            this.match(Stage3DParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 198, Stage3DParser.RULE_nullCoalesce);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1170;
            this.match(Stage3DParser.LPAREN);
            this.state = 1171;
            this.match(Stage3DParser.NULLCOAL);
            this.state = 1172;
            this.expression();
            this.state = 1173;
            this.expression();
            this.state = 1174;
            this.match(Stage3DParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 200, Stage3DParser.RULE_call);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1176;
            this.match(Stage3DParser.LPAREN);
            this.state = 1177;
            this.expression();
            this.state = 1179;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 89, this.context) ) {
            case 1:
                {
                this.state = 1178;
                this.typeArgs();
                }
                break;
            }
            this.state = 1184;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 469762049) !== 0) || ((((_la - 86)) & ~0x1F) === 0 && ((1 << (_la - 86)) & 55) !== 0)) {
                {
                {
                this.state = 1181;
                this.expression();
                }
                }
                this.state = 1186;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1187;
            this.match(Stage3DParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 202, Stage3DParser.RULE_typeArgs);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1189;
            this.match(Stage3DParser.LPAREN);
            this.state = 1190;
            this.match(Stage3DParser.TYPE_ARGS);
            this.state = 1192;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 1191;
                this.typeExpr();
                }
                }
                this.state = 1194;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 91);
            this.state = 1196;
            this.match(Stage3DParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 204, Stage3DParser.RULE_fnSignature);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1198;
            this.match(Stage3DParser.LPAREN);
            this.state = 1209;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2) {
                {
                this.state = 1199;
                this.param();
                this.state = 1206;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 2 || _la === 4) {
                    {
                    {
                    this.state = 1201;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    if (_la === 4) {
                        {
                        this.state = 1200;
                        this.match(Stage3DParser.COMMA);
                        }
                    }

                    this.state = 1203;
                    this.param();
                    }
                    }
                    this.state = 1208;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
            }

            this.state = 1211;
            this.match(Stage3DParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 206, Stage3DParser.RULE_param);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1213;
            this.match(Stage3DParser.LPAREN);
            this.state = 1214;
            this.match(Stage3DParser.IDENTIFIER);
            this.state = 1215;
            this.match(Stage3DParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 208, Stage3DParser.RULE_literal);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1217;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 75)) & ~0x1F) === 0 && ((1 << (_la - 75)) & 45063) !== 0))) {
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
        4,1,92,1220,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,
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
        2,104,7,104,1,0,1,0,1,0,5,0,214,8,0,10,0,12,0,217,9,0,1,0,1,0,1,
        1,1,1,1,1,1,1,1,1,1,1,3,1,227,8,1,1,2,1,2,1,2,1,2,1,2,5,2,234,8,
        2,10,2,12,2,237,9,2,1,2,1,2,1,3,1,3,1,3,1,3,1,3,1,3,1,4,1,4,1,4,
        1,4,3,4,251,8,4,1,4,1,4,1,4,1,5,1,5,1,5,1,5,3,5,260,8,5,1,5,3,5,
        263,8,5,1,5,1,5,1,5,1,6,1,6,1,6,4,6,271,8,6,11,6,12,6,272,1,6,1,
        6,1,7,1,7,1,7,5,7,280,8,7,10,7,12,7,283,9,7,1,7,1,7,3,7,287,8,7,
        1,7,3,7,290,8,7,1,7,3,7,293,8,7,1,7,1,7,1,7,1,8,1,8,1,8,1,8,1,8,
        1,9,1,9,1,9,4,9,306,8,9,11,9,12,9,307,1,9,1,9,1,10,1,10,1,10,5,10,
        315,8,10,10,10,12,10,318,9,10,1,10,1,10,1,11,1,11,1,11,1,11,1,11,
        1,11,3,11,328,8,11,1,12,1,12,1,12,5,12,333,8,12,10,12,12,12,336,
        9,12,1,12,1,12,1,12,3,12,341,8,12,1,12,3,12,344,8,12,1,12,1,12,1,
        13,1,13,1,13,1,13,5,13,352,8,13,10,13,12,13,355,9,13,1,13,1,13,1,
        14,1,14,1,14,5,14,362,8,14,10,14,12,14,365,9,14,1,14,1,14,1,14,5,
        14,370,8,14,10,14,12,14,373,9,14,1,14,1,14,1,15,1,15,1,15,5,15,380,
        8,15,10,15,12,15,383,9,15,1,15,1,15,1,15,1,15,1,16,1,16,1,16,5,16,
        392,8,16,10,16,12,16,395,9,16,1,16,1,16,1,16,5,16,400,8,16,10,16,
        12,16,403,9,16,1,16,1,16,1,17,1,17,1,17,5,17,410,8,17,10,17,12,17,
        413,9,17,1,17,1,17,1,17,5,17,418,8,17,10,17,12,17,421,9,17,1,17,
        1,17,1,18,1,18,1,19,1,19,1,19,3,19,430,8,19,1,19,1,19,3,19,434,8,
        19,1,19,1,19,1,20,1,20,1,20,3,20,441,8,20,1,20,5,20,444,8,20,10,
        20,12,20,447,9,20,3,20,449,8,20,1,20,1,20,1,20,1,20,1,20,1,20,3,
        20,457,8,20,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,
        21,1,21,1,21,1,21,1,21,1,21,1,21,3,21,476,8,21,1,22,1,22,1,22,1,
        22,5,22,482,8,22,10,22,12,22,485,9,22,1,22,1,22,5,22,489,8,22,10,
        22,12,22,492,9,22,1,22,1,22,1,23,1,23,1,23,1,23,1,23,1,23,1,24,1,
        24,1,24,1,24,5,24,506,8,24,10,24,12,24,509,9,24,1,24,1,24,5,24,513,
        8,24,10,24,12,24,516,9,24,1,24,1,24,1,25,1,25,1,25,1,25,1,25,1,25,
        1,26,1,26,1,26,1,26,1,26,3,26,531,8,26,1,26,1,26,1,27,1,27,1,27,
        1,27,5,27,539,8,27,10,27,12,27,542,9,27,1,27,1,27,1,28,1,28,1,28,
        5,28,549,8,28,10,28,12,28,552,9,28,1,28,1,28,1,29,1,29,1,29,3,29,
        559,8,29,1,29,1,29,1,30,1,30,1,30,1,30,1,30,1,31,1,31,1,31,3,31,
        571,8,31,1,31,1,31,1,31,1,32,1,32,1,32,1,32,1,32,3,32,581,8,32,1,
        33,1,33,1,33,1,33,1,33,1,33,1,34,1,34,1,34,1,34,1,34,1,35,1,35,1,
        35,4,35,597,8,35,11,35,12,35,598,1,35,1,35,1,36,1,36,1,36,3,36,606,
        8,36,1,36,1,36,1,37,1,37,1,37,1,37,4,37,614,8,37,11,37,12,37,615,
        1,37,1,37,1,38,1,38,1,38,1,38,1,38,1,39,1,39,1,39,1,39,3,39,629,
        8,39,1,39,1,39,1,39,1,40,1,40,1,40,1,40,3,40,638,8,40,1,40,1,40,
        1,41,1,41,1,41,1,41,1,41,1,41,1,41,1,41,1,41,1,41,1,41,1,41,1,41,
        1,41,1,41,1,41,3,41,658,8,41,1,42,1,42,1,42,1,42,4,42,664,8,42,11,
        42,12,42,665,1,42,1,42,1,43,1,43,1,43,1,43,4,43,674,8,43,11,43,12,
        43,675,1,43,1,43,1,44,1,44,1,44,1,44,1,44,1,45,1,45,1,45,4,45,688,
        8,45,11,45,12,45,689,1,45,1,45,1,46,1,46,1,46,1,46,1,46,1,46,1,46,
        1,46,1,46,1,46,1,46,3,46,705,8,46,1,47,1,47,1,47,3,47,710,8,47,1,
        47,1,47,5,47,714,8,47,10,47,12,47,717,9,47,1,47,1,47,1,47,1,47,1,
        48,1,48,1,48,3,48,726,8,48,1,48,1,48,1,48,1,49,1,49,1,49,5,49,734,
        8,49,10,49,12,49,737,9,49,1,49,1,49,1,50,1,50,5,50,743,8,50,10,50,
        12,50,746,9,50,1,50,1,50,3,50,750,8,50,1,50,1,50,1,50,1,51,1,51,
        1,52,1,52,1,52,1,52,1,52,1,53,1,53,1,53,1,53,1,53,1,54,1,54,1,54,
        1,54,1,54,1,55,1,55,1,55,1,55,1,55,1,55,1,56,1,56,1,56,1,56,1,56,
        1,56,1,56,1,56,1,57,1,57,1,57,1,57,1,57,1,58,1,58,1,58,1,58,1,58,
        3,58,796,8,58,1,58,1,58,1,58,1,59,1,59,1,59,4,59,804,8,59,11,59,
        12,59,805,1,59,1,59,1,60,1,60,1,61,1,61,1,61,4,61,815,8,61,11,61,
        12,61,816,1,61,1,61,1,62,1,62,3,62,823,8,62,1,63,1,63,1,63,4,63,
        828,8,63,11,63,12,63,829,1,63,1,63,1,64,1,64,1,64,4,64,837,8,64,
        11,64,12,64,838,1,64,1,64,1,65,1,65,1,65,1,65,3,65,847,8,65,1,65,
        3,65,850,8,65,1,65,3,65,853,8,65,1,66,1,66,1,66,1,66,1,66,1,67,1,
        67,1,67,1,67,1,67,1,68,1,68,1,68,1,68,1,68,1,68,1,68,1,68,1,68,1,
        68,1,68,1,68,3,68,877,8,68,1,69,1,69,1,69,1,69,5,69,883,8,69,10,
        69,12,69,886,9,69,1,69,3,69,889,8,69,1,69,1,69,1,70,1,70,1,70,1,
        70,5,70,897,8,70,10,70,12,70,900,9,70,1,70,1,70,1,71,1,71,1,71,5,
        71,907,8,71,10,71,12,71,910,9,71,1,71,1,71,1,72,1,72,1,72,1,72,1,
        72,1,72,5,72,920,8,72,10,72,12,72,923,9,72,1,72,1,72,1,73,1,73,1,
        73,1,73,1,73,5,73,932,8,73,10,73,12,73,935,9,73,1,73,1,73,1,74,1,
        74,1,74,1,74,1,74,5,74,944,8,74,10,74,12,74,947,9,74,1,74,1,74,1,
        75,1,75,1,75,1,75,1,75,1,75,1,75,1,75,1,75,1,75,1,75,1,75,1,75,1,
        75,1,75,1,75,1,75,1,75,1,75,1,75,1,75,1,75,1,75,1,75,1,75,3,75,976,
        8,75,1,76,1,76,1,76,1,76,1,76,1,77,1,77,1,77,1,77,1,77,1,77,1,78,
        1,78,1,79,1,79,1,79,5,79,994,8,79,10,79,12,79,997,9,79,1,79,1,79,
        1,80,1,80,1,80,1,80,5,80,1005,8,80,10,80,12,80,1008,9,80,1,80,1,
        80,1,81,1,81,1,81,1,81,5,81,1016,8,81,10,81,12,81,1019,9,81,1,81,
        1,81,1,82,1,82,1,82,1,82,5,82,1027,8,82,10,82,12,82,1030,9,82,1,
        82,1,82,1,83,1,83,1,83,1,83,1,83,5,83,1039,8,83,10,83,12,83,1042,
        9,83,1,83,1,83,1,84,1,84,1,84,1,84,1,84,5,84,1051,8,84,10,84,12,
        84,1054,9,84,1,84,1,84,1,85,1,85,1,85,1,85,1,85,1,85,1,85,1,86,1,
        86,1,86,1,86,1,86,4,86,1070,8,86,11,86,12,86,1071,1,86,1,86,1,87,
        1,87,1,87,1,87,3,87,1080,8,87,1,87,5,87,1083,8,87,10,87,12,87,1086,
        9,87,1,87,1,87,1,88,1,88,1,88,5,88,1093,8,88,10,88,12,88,1096,9,
        88,1,88,1,88,1,89,1,89,1,89,1,89,1,89,1,89,1,89,1,89,1,89,1,89,1,
        89,1,89,1,89,3,89,1113,8,89,1,90,1,90,1,90,1,90,5,90,1119,8,90,10,
        90,12,90,1122,9,90,1,90,1,90,1,91,1,91,1,91,5,91,1129,8,91,10,91,
        12,91,1132,9,91,1,91,1,91,1,92,1,92,1,93,1,93,1,93,1,93,1,93,1,93,
        1,94,1,94,1,94,1,94,1,94,1,94,1,95,1,95,1,95,1,95,1,95,1,96,1,96,
        1,96,1,96,1,96,1,97,1,97,1,97,1,97,1,97,1,98,1,98,1,98,1,98,1,98,
        1,98,1,99,1,99,1,99,1,99,1,99,1,99,1,100,1,100,1,100,3,100,1180,
        8,100,1,100,5,100,1183,8,100,10,100,12,100,1186,9,100,1,100,1,100,
        1,101,1,101,1,101,4,101,1193,8,101,11,101,12,101,1194,1,101,1,101,
        1,102,1,102,1,102,3,102,1202,8,102,1,102,5,102,1205,8,102,10,102,
        12,102,1208,9,102,3,102,1210,8,102,1,102,1,102,1,103,1,103,1,103,
        1,103,1,104,1,104,1,104,0,0,105,0,2,4,6,8,10,12,14,16,18,20,22,24,
        26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,66,68,
        70,72,74,76,78,80,82,84,86,88,90,92,94,96,98,100,102,104,106,108,
        110,112,114,116,118,120,122,124,126,128,130,132,134,136,138,140,
        142,144,146,148,150,152,154,156,158,160,162,164,166,168,170,172,
        174,176,178,180,182,184,186,188,190,192,194,196,198,200,202,204,
        206,208,0,5,3,0,75,75,87,88,90,90,2,0,66,66,74,74,7,0,5,26,29,29,
        31,73,75,77,81,86,88,88,90,91,1,0,31,32,3,0,75,77,87,88,90,90,1274,
        0,210,1,0,0,0,2,226,1,0,0,0,4,228,1,0,0,0,6,240,1,0,0,0,8,246,1,
        0,0,0,10,255,1,0,0,0,12,267,1,0,0,0,14,276,1,0,0,0,16,297,1,0,0,
        0,18,302,1,0,0,0,20,311,1,0,0,0,22,327,1,0,0,0,24,329,1,0,0,0,26,
        347,1,0,0,0,28,358,1,0,0,0,30,376,1,0,0,0,32,388,1,0,0,0,34,406,
        1,0,0,0,36,424,1,0,0,0,38,426,1,0,0,0,40,437,1,0,0,0,42,475,1,0,
        0,0,44,477,1,0,0,0,46,495,1,0,0,0,48,501,1,0,0,0,50,519,1,0,0,0,
        52,525,1,0,0,0,54,534,1,0,0,0,56,545,1,0,0,0,58,555,1,0,0,0,60,562,
        1,0,0,0,62,567,1,0,0,0,64,580,1,0,0,0,66,582,1,0,0,0,68,588,1,0,
        0,0,70,593,1,0,0,0,72,602,1,0,0,0,74,609,1,0,0,0,76,619,1,0,0,0,
        78,624,1,0,0,0,80,633,1,0,0,0,82,657,1,0,0,0,84,659,1,0,0,0,86,669,
        1,0,0,0,88,679,1,0,0,0,90,684,1,0,0,0,92,704,1,0,0,0,94,706,1,0,
        0,0,96,722,1,0,0,0,98,730,1,0,0,0,100,740,1,0,0,0,102,754,1,0,0,
        0,104,756,1,0,0,0,106,761,1,0,0,0,108,766,1,0,0,0,110,771,1,0,0,
        0,112,777,1,0,0,0,114,785,1,0,0,0,116,790,1,0,0,0,118,800,1,0,0,
        0,120,809,1,0,0,0,122,811,1,0,0,0,124,822,1,0,0,0,126,824,1,0,0,
        0,128,833,1,0,0,0,130,852,1,0,0,0,132,854,1,0,0,0,134,859,1,0,0,
        0,136,876,1,0,0,0,138,878,1,0,0,0,140,892,1,0,0,0,142,903,1,0,0,
        0,144,913,1,0,0,0,146,926,1,0,0,0,148,938,1,0,0,0,150,975,1,0,0,
        0,152,977,1,0,0,0,154,982,1,0,0,0,156,988,1,0,0,0,158,990,1,0,0,
        0,160,1000,1,0,0,0,162,1011,1,0,0,0,164,1022,1,0,0,0,166,1033,1,
        0,0,0,168,1045,1,0,0,0,170,1057,1,0,0,0,172,1064,1,0,0,0,174,1075,
        1,0,0,0,176,1089,1,0,0,0,178,1112,1,0,0,0,180,1114,1,0,0,0,182,1125,
        1,0,0,0,184,1135,1,0,0,0,186,1137,1,0,0,0,188,1143,1,0,0,0,190,1149,
        1,0,0,0,192,1154,1,0,0,0,194,1159,1,0,0,0,196,1164,1,0,0,0,198,1170,
        1,0,0,0,200,1176,1,0,0,0,202,1189,1,0,0,0,204,1198,1,0,0,0,206,1213,
        1,0,0,0,208,1217,1,0,0,0,210,211,5,2,0,0,211,215,5,5,0,0,212,214,
        3,2,1,0,213,212,1,0,0,0,214,217,1,0,0,0,215,213,1,0,0,0,215,216,
        1,0,0,0,216,218,1,0,0,0,217,215,1,0,0,0,218,219,5,3,0,0,219,1,1,
        0,0,0,220,227,3,4,2,0,221,227,3,6,3,0,222,227,3,8,4,0,223,227,3,
        10,5,0,224,227,3,14,7,0,225,227,3,42,21,0,226,220,1,0,0,0,226,221,
        1,0,0,0,226,222,1,0,0,0,226,223,1,0,0,0,226,224,1,0,0,0,226,225,
        1,0,0,0,227,3,1,0,0,0,228,229,5,2,0,0,229,230,5,16,0,0,230,231,5,
        91,0,0,231,235,3,204,102,0,232,234,3,42,21,0,233,232,1,0,0,0,234,
        237,1,0,0,0,235,233,1,0,0,0,235,236,1,0,0,0,236,238,1,0,0,0,237,
        235,1,0,0,0,238,239,5,3,0,0,239,5,1,0,0,0,240,241,5,2,0,0,241,242,
        5,15,0,0,242,243,5,91,0,0,243,244,3,150,75,0,244,245,5,3,0,0,245,
        7,1,0,0,0,246,247,5,2,0,0,247,248,5,71,0,0,248,250,5,91,0,0,249,
        251,3,128,64,0,250,249,1,0,0,0,250,251,1,0,0,0,251,252,1,0,0,0,252,
        253,3,82,41,0,253,254,5,3,0,0,254,9,1,0,0,0,255,256,5,2,0,0,256,
        257,5,72,0,0,257,259,5,91,0,0,258,260,3,128,64,0,259,258,1,0,0,0,
        259,260,1,0,0,0,260,262,1,0,0,0,261,263,3,12,6,0,262,261,1,0,0,0,
        262,263,1,0,0,0,263,264,1,0,0,0,264,265,3,98,49,0,265,266,5,3,0,
        0,266,11,1,0,0,0,267,268,5,2,0,0,268,270,5,69,0,0,269,271,3,82,41,
        0,270,269,1,0,0,0,271,272,1,0,0,0,272,270,1,0,0,0,272,273,1,0,0,
        0,273,274,1,0,0,0,274,275,5,3,0,0,275,13,1,0,0,0,276,277,5,2,0,0,
        277,281,5,46,0,0,278,280,3,36,18,0,279,278,1,0,0,0,280,283,1,0,0,
        0,281,279,1,0,0,0,281,282,1,0,0,0,282,284,1,0,0,0,283,281,1,0,0,
        0,284,286,5,91,0,0,285,287,3,128,64,0,286,285,1,0,0,0,286,287,1,
        0,0,0,287,289,1,0,0,0,288,290,3,16,8,0,289,288,1,0,0,0,289,290,1,
        0,0,0,290,292,1,0,0,0,291,293,3,18,9,0,292,291,1,0,0,0,292,293,1,
        0,0,0,293,294,1,0,0,0,294,295,3,20,10,0,295,296,5,3,0,0,296,15,1,
        0,0,0,297,298,5,2,0,0,298,299,5,69,0,0,299,300,3,82,41,0,300,301,
        5,3,0,0,301,17,1,0,0,0,302,303,5,2,0,0,303,305,5,53,0,0,304,306,
        3,82,41,0,305,304,1,0,0,0,306,307,1,0,0,0,307,305,1,0,0,0,307,308,
        1,0,0,0,308,309,1,0,0,0,309,310,5,3,0,0,310,19,1,0,0,0,311,312,5,
        2,0,0,312,316,5,43,0,0,313,315,3,22,11,0,314,313,1,0,0,0,315,318,
        1,0,0,0,316,314,1,0,0,0,316,317,1,0,0,0,317,319,1,0,0,0,318,316,
        1,0,0,0,319,320,5,3,0,0,320,21,1,0,0,0,321,328,3,24,12,0,322,328,
        3,26,13,0,323,328,3,28,14,0,324,328,3,30,15,0,325,328,3,32,16,0,
        326,328,3,34,17,0,327,321,1,0,0,0,327,322,1,0,0,0,327,323,1,0,0,
        0,327,324,1,0,0,0,327,325,1,0,0,0,327,326,1,0,0,0,328,23,1,0,0,0,
        329,330,5,2,0,0,330,334,5,47,0,0,331,333,3,36,18,0,332,331,1,0,0,
        0,333,336,1,0,0,0,334,332,1,0,0,0,334,335,1,0,0,0,335,337,1,0,0,
        0,336,334,1,0,0,0,337,340,5,91,0,0,338,339,5,78,0,0,339,341,3,82,
        41,0,340,338,1,0,0,0,340,341,1,0,0,0,341,343,1,0,0,0,342,344,3,150,
        75,0,343,342,1,0,0,0,343,344,1,0,0,0,344,345,1,0,0,0,345,346,5,3,
        0,0,346,25,1,0,0,0,347,348,5,2,0,0,348,349,5,48,0,0,349,353,3,40,
        20,0,350,352,3,42,21,0,351,350,1,0,0,0,352,355,1,0,0,0,353,351,1,
        0,0,0,353,354,1,0,0,0,354,356,1,0,0,0,355,353,1,0,0,0,356,357,5,
        3,0,0,357,27,1,0,0,0,358,359,5,2,0,0,359,363,5,12,0,0,360,362,3,
        36,18,0,361,360,1,0,0,0,362,365,1,0,0,0,363,361,1,0,0,0,363,364,
        1,0,0,0,364,366,1,0,0,0,365,363,1,0,0,0,366,367,5,91,0,0,367,371,
        3,40,20,0,368,370,3,42,21,0,369,368,1,0,0,0,370,373,1,0,0,0,371,
        369,1,0,0,0,371,372,1,0,0,0,372,374,1,0,0,0,373,371,1,0,0,0,374,
        375,5,3,0,0,375,29,1,0,0,0,376,377,5,2,0,0,377,381,5,45,0,0,378,
        380,3,36,18,0,379,378,1,0,0,0,380,383,1,0,0,0,381,379,1,0,0,0,381,
        382,1,0,0,0,382,384,1,0,0,0,383,381,1,0,0,0,384,385,5,91,0,0,385,
        386,3,40,20,0,386,387,5,3,0,0,387,31,1,0,0,0,388,389,5,2,0,0,389,
        393,5,51,0,0,390,392,3,36,18,0,391,390,1,0,0,0,392,395,1,0,0,0,393,
        391,1,0,0,0,393,394,1,0,0,0,394,396,1,0,0,0,395,393,1,0,0,0,396,
        397,5,91,0,0,397,401,3,40,20,0,398,400,3,42,21,0,399,398,1,0,0,0,
        400,403,1,0,0,0,401,399,1,0,0,0,401,402,1,0,0,0,402,404,1,0,0,0,
        403,401,1,0,0,0,404,405,5,3,0,0,405,33,1,0,0,0,406,407,5,2,0,0,407,
        411,5,52,0,0,408,410,3,36,18,0,409,408,1,0,0,0,410,413,1,0,0,0,411,
        409,1,0,0,0,411,412,1,0,0,0,412,414,1,0,0,0,413,411,1,0,0,0,414,
        415,5,91,0,0,415,419,3,40,20,0,416,418,3,42,21,0,417,416,1,0,0,0,
        418,421,1,0,0,0,419,417,1,0,0,0,419,420,1,0,0,0,420,422,1,0,0,0,
        421,419,1,0,0,0,422,423,5,3,0,0,423,35,1,0,0,0,424,425,5,86,0,0,
        425,37,1,0,0,0,426,427,5,2,0,0,427,429,5,91,0,0,428,430,5,74,0,0,
        429,428,1,0,0,0,429,430,1,0,0,0,430,433,1,0,0,0,431,432,5,78,0,0,
        432,434,3,82,41,0,433,431,1,0,0,0,433,434,1,0,0,0,434,435,1,0,0,
        0,435,436,5,3,0,0,436,39,1,0,0,0,437,448,5,2,0,0,438,445,3,38,19,
        0,439,441,5,4,0,0,440,439,1,0,0,0,440,441,1,0,0,0,441,442,1,0,0,
        0,442,444,3,38,19,0,443,440,1,0,0,0,444,447,1,0,0,0,445,443,1,0,
        0,0,445,446,1,0,0,0,446,449,1,0,0,0,447,445,1,0,0,0,448,438,1,0,
        0,0,448,449,1,0,0,0,449,450,1,0,0,0,450,456,5,3,0,0,451,452,5,2,
        0,0,452,453,5,70,0,0,453,454,3,82,41,0,454,455,5,3,0,0,455,457,1,
        0,0,0,456,451,1,0,0,0,456,457,1,0,0,0,457,41,1,0,0,0,458,476,3,44,
        22,0,459,476,3,46,23,0,460,476,3,48,24,0,461,476,3,50,25,0,462,476,
        3,52,26,0,463,476,3,54,27,0,464,476,3,56,28,0,465,476,3,58,29,0,
        466,476,3,60,30,0,467,476,3,62,31,0,468,476,3,64,32,0,469,476,3,
        138,69,0,470,476,3,144,72,0,471,476,3,146,73,0,472,476,3,148,74,
        0,473,476,3,136,68,0,474,476,3,150,75,0,475,458,1,0,0,0,475,459,
        1,0,0,0,475,460,1,0,0,0,475,461,1,0,0,0,475,462,1,0,0,0,475,463,
        1,0,0,0,475,464,1,0,0,0,475,465,1,0,0,0,475,466,1,0,0,0,475,467,
        1,0,0,0,475,468,1,0,0,0,475,469,1,0,0,0,475,470,1,0,0,0,475,471,
        1,0,0,0,475,472,1,0,0,0,475,473,1,0,0,0,475,474,1,0,0,0,476,43,1,
        0,0,0,477,478,5,2,0,0,478,479,5,6,0,0,479,483,5,2,0,0,480,482,3,
        78,39,0,481,480,1,0,0,0,482,485,1,0,0,0,483,481,1,0,0,0,483,484,
        1,0,0,0,484,486,1,0,0,0,485,483,1,0,0,0,486,490,5,3,0,0,487,489,
        3,42,21,0,488,487,1,0,0,0,489,492,1,0,0,0,490,488,1,0,0,0,490,491,
        1,0,0,0,491,493,1,0,0,0,492,490,1,0,0,0,493,494,5,3,0,0,494,45,1,
        0,0,0,495,496,5,2,0,0,496,497,5,7,0,0,497,498,3,80,40,0,498,499,
        3,150,75,0,499,500,5,3,0,0,500,47,1,0,0,0,501,502,5,2,0,0,502,503,
        5,8,0,0,503,507,5,2,0,0,504,506,3,78,39,0,505,504,1,0,0,0,506,509,
        1,0,0,0,507,505,1,0,0,0,507,508,1,0,0,0,508,510,1,0,0,0,509,507,
        1,0,0,0,510,514,5,3,0,0,511,513,3,42,21,0,512,511,1,0,0,0,513,516,
        1,0,0,0,514,512,1,0,0,0,514,515,1,0,0,0,515,517,1,0,0,0,516,514,
        1,0,0,0,517,518,5,3,0,0,518,49,1,0,0,0,519,520,5,2,0,0,520,521,5,
        9,0,0,521,522,3,80,40,0,522,523,3,150,75,0,523,524,5,3,0,0,524,51,
        1,0,0,0,525,526,5,2,0,0,526,527,5,17,0,0,527,528,3,150,75,0,528,
        530,3,42,21,0,529,531,3,42,21,0,530,529,1,0,0,0,530,531,1,0,0,0,
        531,532,1,0,0,0,532,533,5,3,0,0,533,53,1,0,0,0,534,535,5,2,0,0,535,
        536,5,18,0,0,536,540,3,150,75,0,537,539,3,42,21,0,538,537,1,0,0,
        0,539,542,1,0,0,0,540,538,1,0,0,0,540,541,1,0,0,0,541,543,1,0,0,
        0,542,540,1,0,0,0,543,544,5,3,0,0,544,55,1,0,0,0,545,546,5,2,0,0,
        546,550,5,19,0,0,547,549,3,42,21,0,548,547,1,0,0,0,549,552,1,0,0,
        0,550,548,1,0,0,0,550,551,1,0,0,0,551,553,1,0,0,0,552,550,1,0,0,
        0,553,554,5,3,0,0,554,57,1,0,0,0,555,556,5,2,0,0,556,558,5,20,0,
        0,557,559,3,150,75,0,558,557,1,0,0,0,558,559,1,0,0,0,559,560,1,0,
        0,0,560,561,5,3,0,0,561,59,1,0,0,0,562,563,5,2,0,0,563,564,5,21,
        0,0,564,565,3,150,75,0,565,566,5,3,0,0,566,61,1,0,0,0,567,568,5,
        2,0,0,568,570,5,36,0,0,569,571,3,176,88,0,570,569,1,0,0,0,570,571,
        1,0,0,0,571,572,1,0,0,0,572,573,5,88,0,0,573,574,5,3,0,0,574,63,
        1,0,0,0,575,581,3,66,33,0,576,581,3,68,34,0,577,581,3,70,35,0,578,
        581,3,74,37,0,579,581,3,76,38,0,580,575,1,0,0,0,580,576,1,0,0,0,
        580,577,1,0,0,0,580,578,1,0,0,0,580,579,1,0,0,0,581,65,1,0,0,0,582,
        583,5,2,0,0,583,584,5,81,0,0,584,585,5,91,0,0,585,586,3,150,75,0,
        586,587,5,3,0,0,587,67,1,0,0,0,588,589,5,2,0,0,589,590,5,82,0,0,
        590,591,3,150,75,0,591,592,5,3,0,0,592,69,1,0,0,0,593,594,5,2,0,
        0,594,596,5,83,0,0,595,597,3,72,36,0,596,595,1,0,0,0,597,598,1,0,
        0,0,598,596,1,0,0,0,598,599,1,0,0,0,599,600,1,0,0,0,600,601,5,3,
        0,0,601,71,1,0,0,0,602,603,5,2,0,0,603,605,5,91,0,0,604,606,5,91,
        0,0,605,604,1,0,0,0,605,606,1,0,0,0,606,607,1,0,0,0,607,608,5,3,
        0,0,608,73,1,0,0,0,609,610,5,2,0,0,610,611,5,84,0,0,611,613,5,88,
        0,0,612,614,3,72,36,0,613,612,1,0,0,0,614,615,1,0,0,0,615,613,1,
        0,0,0,615,616,1,0,0,0,616,617,1,0,0,0,617,618,5,3,0,0,618,75,1,0,
        0,0,619,620,5,2,0,0,620,621,5,85,0,0,621,622,5,88,0,0,622,623,5,
        3,0,0,623,77,1,0,0,0,624,625,5,2,0,0,625,628,5,91,0,0,626,627,5,
        78,0,0,627,629,3,82,41,0,628,626,1,0,0,0,628,629,1,0,0,0,629,630,
        1,0,0,0,630,631,3,150,75,0,631,632,5,3,0,0,632,79,1,0,0,0,633,634,
        5,2,0,0,634,637,5,91,0,0,635,636,5,78,0,0,636,638,3,82,41,0,637,
        635,1,0,0,0,637,638,1,0,0,0,638,639,1,0,0,0,639,640,5,3,0,0,640,
        81,1,0,0,0,641,658,5,91,0,0,642,658,3,84,42,0,643,658,3,86,43,0,
        644,658,3,88,44,0,645,658,3,90,45,0,646,658,3,94,47,0,647,658,3,
        98,49,0,648,658,3,104,52,0,649,658,3,106,53,0,650,658,3,108,54,0,
        651,658,3,110,55,0,652,658,3,112,56,0,653,658,3,114,57,0,654,658,
        3,116,58,0,655,658,3,122,61,0,656,658,3,126,63,0,657,641,1,0,0,0,
        657,642,1,0,0,0,657,643,1,0,0,0,657,644,1,0,0,0,657,645,1,0,0,0,
        657,646,1,0,0,0,657,647,1,0,0,0,657,648,1,0,0,0,657,649,1,0,0,0,
        657,650,1,0,0,0,657,651,1,0,0,0,657,652,1,0,0,0,657,653,1,0,0,0,
        657,654,1,0,0,0,657,655,1,0,0,0,657,656,1,0,0,0,658,83,1,0,0,0,659,
        660,5,2,0,0,660,661,5,54,0,0,661,663,3,82,41,0,662,664,3,82,41,0,
        663,662,1,0,0,0,664,665,1,0,0,0,665,663,1,0,0,0,665,666,1,0,0,0,
        666,667,1,0,0,0,667,668,5,3,0,0,668,85,1,0,0,0,669,670,5,2,0,0,670,
        671,5,55,0,0,671,673,3,82,41,0,672,674,3,82,41,0,673,672,1,0,0,0,
        674,675,1,0,0,0,675,673,1,0,0,0,675,676,1,0,0,0,676,677,1,0,0,0,
        677,678,5,3,0,0,678,87,1,0,0,0,679,680,5,2,0,0,680,681,5,26,0,0,
        681,682,3,82,41,0,682,683,5,3,0,0,683,89,1,0,0,0,684,685,5,2,0,0,
        685,687,5,56,0,0,686,688,3,92,46,0,687,686,1,0,0,0,688,689,1,0,0,
        0,689,687,1,0,0,0,689,690,1,0,0,0,690,691,1,0,0,0,691,692,5,3,0,
        0,692,91,1,0,0,0,693,694,5,2,0,0,694,695,5,65,0,0,695,696,3,82,41,
        0,696,697,5,3,0,0,697,705,1,0,0,0,698,699,5,2,0,0,699,700,5,91,0,
        0,700,701,3,82,41,0,701,702,5,3,0,0,702,705,1,0,0,0,703,705,3,82,
        41,0,704,693,1,0,0,0,704,698,1,0,0,0,704,703,1,0,0,0,705,93,1,0,
        0,0,706,707,5,2,0,0,707,709,5,57,0,0,708,710,3,128,64,0,709,708,
        1,0,0,0,709,710,1,0,0,0,710,711,1,0,0,0,711,715,5,2,0,0,712,714,
        3,96,48,0,713,712,1,0,0,0,714,717,1,0,0,0,715,713,1,0,0,0,715,716,
        1,0,0,0,716,718,1,0,0,0,717,715,1,0,0,0,718,719,5,3,0,0,719,720,
        3,82,41,0,720,721,5,3,0,0,721,95,1,0,0,0,722,723,5,2,0,0,723,725,
        5,91,0,0,724,726,5,74,0,0,725,724,1,0,0,0,725,726,1,0,0,0,726,727,
        1,0,0,0,727,728,3,82,41,0,728,729,5,3,0,0,729,97,1,0,0,0,730,731,
        5,2,0,0,731,735,5,91,0,0,732,734,3,100,50,0,733,732,1,0,0,0,734,
        737,1,0,0,0,735,733,1,0,0,0,735,736,1,0,0,0,736,738,1,0,0,0,737,
        735,1,0,0,0,738,739,5,3,0,0,739,99,1,0,0,0,740,744,5,2,0,0,741,743,
        3,102,51,0,742,741,1,0,0,0,743,746,1,0,0,0,744,742,1,0,0,0,744,745,
        1,0,0,0,745,747,1,0,0,0,746,744,1,0,0,0,747,749,5,91,0,0,748,750,
        5,74,0,0,749,748,1,0,0,0,749,750,1,0,0,0,750,751,1,0,0,0,751,752,
        3,82,41,0,752,753,5,3,0,0,753,101,1,0,0,0,754,755,5,66,0,0,755,103,
        1,0,0,0,756,757,5,2,0,0,757,758,5,58,0,0,758,759,7,0,0,0,759,760,
        5,3,0,0,760,105,1,0,0,0,761,762,5,2,0,0,762,763,5,59,0,0,763,764,
        3,82,41,0,764,765,5,3,0,0,765,107,1,0,0,0,766,767,5,2,0,0,767,768,
        5,60,0,0,768,769,5,91,0,0,769,770,5,3,0,0,770,109,1,0,0,0,771,772,
        5,2,0,0,772,773,5,29,0,0,773,774,3,82,41,0,774,775,3,82,41,0,775,
        776,5,3,0,0,776,111,1,0,0,0,777,778,5,2,0,0,778,779,5,24,0,0,779,
        780,3,82,41,0,780,781,3,82,41,0,781,782,3,82,41,0,782,783,3,82,41,
        0,783,784,5,3,0,0,784,113,1,0,0,0,785,786,5,2,0,0,786,787,5,62,0,
        0,787,788,5,91,0,0,788,789,5,3,0,0,789,115,1,0,0,0,790,791,5,2,0,
        0,791,792,5,63,0,0,792,793,5,91,0,0,793,795,3,82,41,0,794,796,3,
        118,59,0,795,794,1,0,0,0,795,796,1,0,0,0,796,797,1,0,0,0,797,798,
        3,82,41,0,798,799,5,3,0,0,799,117,1,0,0,0,800,801,5,2,0,0,801,803,
        5,73,0,0,802,804,3,120,60,0,803,802,1,0,0,0,804,805,1,0,0,0,805,
        803,1,0,0,0,805,806,1,0,0,0,806,807,1,0,0,0,807,808,5,3,0,0,808,
        119,1,0,0,0,809,810,7,1,0,0,810,121,1,0,0,0,811,812,5,2,0,0,812,
        814,5,64,0,0,813,815,3,124,62,0,814,813,1,0,0,0,815,816,1,0,0,0,
        816,814,1,0,0,0,816,817,1,0,0,0,817,818,1,0,0,0,818,819,5,3,0,0,
        819,123,1,0,0,0,820,823,5,88,0,0,821,823,3,82,41,0,822,820,1,0,0,
        0,822,821,1,0,0,0,823,125,1,0,0,0,824,825,5,2,0,0,825,827,3,82,41,
        0,826,828,3,82,41,0,827,826,1,0,0,0,828,829,1,0,0,0,829,827,1,0,
        0,0,829,830,1,0,0,0,830,831,1,0,0,0,831,832,5,3,0,0,832,127,1,0,
        0,0,833,834,5,2,0,0,834,836,5,67,0,0,835,837,3,130,65,0,836,835,
        1,0,0,0,837,838,1,0,0,0,838,836,1,0,0,0,838,839,1,0,0,0,839,840,
        1,0,0,0,840,841,5,3,0,0,841,129,1,0,0,0,842,853,5,91,0,0,843,844,
        5,2,0,0,844,846,5,91,0,0,845,847,3,132,66,0,846,845,1,0,0,0,846,
        847,1,0,0,0,847,849,1,0,0,0,848,850,3,134,67,0,849,848,1,0,0,0,849,
        850,1,0,0,0,850,851,1,0,0,0,851,853,5,3,0,0,852,842,1,0,0,0,852,
        843,1,0,0,0,853,131,1,0,0,0,854,855,5,2,0,0,855,856,5,69,0,0,856,
        857,3,82,41,0,857,858,5,3,0,0,858,133,1,0,0,0,859,860,5,2,0,0,860,
        861,5,39,0,0,861,862,3,82,41,0,862,863,5,3,0,0,863,135,1,0,0,0,864,
        865,5,2,0,0,865,866,5,22,0,0,866,867,5,91,0,0,867,868,3,150,75,0,
        868,869,5,3,0,0,869,877,1,0,0,0,870,871,5,2,0,0,871,872,5,22,0,0,
        872,873,3,186,93,0,873,874,3,150,75,0,874,875,5,3,0,0,875,877,1,
        0,0,0,876,864,1,0,0,0,876,870,1,0,0,0,877,137,1,0,0,0,878,879,5,
        2,0,0,879,880,5,37,0,0,880,884,3,150,75,0,881,883,3,140,70,0,882,
        881,1,0,0,0,883,886,1,0,0,0,884,882,1,0,0,0,884,885,1,0,0,0,885,
        888,1,0,0,0,886,884,1,0,0,0,887,889,3,142,71,0,888,887,1,0,0,0,888,
        889,1,0,0,0,889,890,1,0,0,0,890,891,5,3,0,0,891,139,1,0,0,0,892,
        893,5,2,0,0,893,894,5,38,0,0,894,898,3,150,75,0,895,897,3,42,21,
        0,896,895,1,0,0,0,897,900,1,0,0,0,898,896,1,0,0,0,898,899,1,0,0,
        0,899,901,1,0,0,0,900,898,1,0,0,0,901,902,5,3,0,0,902,141,1,0,0,
        0,903,904,5,2,0,0,904,908,5,39,0,0,905,907,3,42,21,0,906,905,1,0,
        0,0,907,910,1,0,0,0,908,906,1,0,0,0,908,909,1,0,0,0,909,911,1,0,
        0,0,910,908,1,0,0,0,911,912,5,3,0,0,912,143,1,0,0,0,913,914,5,2,
        0,0,914,915,5,42,0,0,915,916,3,46,23,0,916,917,3,150,75,0,917,921,
        3,136,68,0,918,920,3,42,21,0,919,918,1,0,0,0,920,923,1,0,0,0,921,
        919,1,0,0,0,921,922,1,0,0,0,922,924,1,0,0,0,923,921,1,0,0,0,924,
        925,5,3,0,0,925,145,1,0,0,0,926,927,5,2,0,0,927,928,5,40,0,0,928,
        929,5,91,0,0,929,933,3,150,75,0,930,932,3,42,21,0,931,930,1,0,0,
        0,932,935,1,0,0,0,933,931,1,0,0,0,933,934,1,0,0,0,934,936,1,0,0,
        0,935,933,1,0,0,0,936,937,5,3,0,0,937,147,1,0,0,0,938,939,5,2,0,
        0,939,940,5,41,0,0,940,941,5,91,0,0,941,945,3,150,75,0,942,944,3,
        42,21,0,943,942,1,0,0,0,944,947,1,0,0,0,945,943,1,0,0,0,945,946,
        1,0,0,0,946,948,1,0,0,0,947,945,1,0,0,0,948,949,5,3,0,0,949,149,
        1,0,0,0,950,976,3,208,104,0,951,976,5,86,0,0,952,976,5,91,0,0,953,
        976,3,162,81,0,954,976,3,164,82,0,955,976,3,166,83,0,956,976,3,168,
        84,0,957,976,3,176,88,0,958,976,3,182,91,0,959,976,3,186,93,0,960,
        976,3,188,94,0,961,976,3,190,95,0,962,976,3,192,96,0,963,976,3,194,
        97,0,964,976,3,170,85,0,965,976,3,172,86,0,966,976,3,174,87,0,967,
        976,3,196,98,0,968,976,3,198,99,0,969,976,3,152,76,0,970,976,3,154,
        77,0,971,976,3,156,78,0,972,976,3,158,79,0,973,976,3,160,80,0,974,
        976,3,200,100,0,975,950,1,0,0,0,975,951,1,0,0,0,975,952,1,0,0,0,
        975,953,1,0,0,0,975,954,1,0,0,0,975,955,1,0,0,0,975,956,1,0,0,0,
        975,957,1,0,0,0,975,958,1,0,0,0,975,959,1,0,0,0,975,960,1,0,0,0,
        975,961,1,0,0,0,975,962,1,0,0,0,975,963,1,0,0,0,975,964,1,0,0,0,
        975,965,1,0,0,0,975,966,1,0,0,0,975,967,1,0,0,0,975,968,1,0,0,0,
        975,969,1,0,0,0,975,970,1,0,0,0,975,971,1,0,0,0,975,972,1,0,0,0,
        975,973,1,0,0,0,975,974,1,0,0,0,976,151,1,0,0,0,977,978,5,2,0,0,
        978,979,5,60,0,0,979,980,3,150,75,0,980,981,5,3,0,0,981,153,1,0,
        0,0,982,983,5,2,0,0,983,984,5,61,0,0,984,985,3,150,75,0,985,986,
        3,82,41,0,986,987,5,3,0,0,987,155,1,0,0,0,988,989,5,49,0,0,989,157,
        1,0,0,0,990,991,5,2,0,0,991,995,5,50,0,0,992,994,3,150,75,0,993,
        992,1,0,0,0,994,997,1,0,0,0,995,993,1,0,0,0,995,996,1,0,0,0,996,
        998,1,0,0,0,997,995,1,0,0,0,998,999,5,3,0,0,999,159,1,0,0,0,1000,
        1001,5,2,0,0,1001,1002,5,44,0,0,1002,1006,5,91,0,0,1003,1005,3,150,
        75,0,1004,1003,1,0,0,0,1005,1008,1,0,0,0,1006,1004,1,0,0,0,1006,
        1007,1,0,0,0,1007,1009,1,0,0,0,1008,1006,1,0,0,0,1009,1010,5,3,0,
        0,1010,161,1,0,0,0,1011,1012,5,2,0,0,1012,1013,5,10,0,0,1013,1017,
        3,204,102,0,1014,1016,3,42,21,0,1015,1014,1,0,0,0,1016,1019,1,0,
        0,0,1017,1015,1,0,0,0,1017,1018,1,0,0,0,1018,1020,1,0,0,0,1019,1017,
        1,0,0,0,1020,1021,5,3,0,0,1021,163,1,0,0,0,1022,1023,5,2,0,0,1023,
        1024,5,11,0,0,1024,1028,3,204,102,0,1025,1027,3,42,21,0,1026,1025,
        1,0,0,0,1027,1030,1,0,0,0,1028,1026,1,0,0,0,1028,1029,1,0,0,0,1029,
        1031,1,0,0,0,1030,1028,1,0,0,0,1031,1032,5,3,0,0,1032,165,1,0,0,
        0,1033,1034,5,2,0,0,1034,1035,5,13,0,0,1035,1036,3,150,75,0,1036,
        1040,3,150,75,0,1037,1039,3,150,75,0,1038,1037,1,0,0,0,1039,1042,
        1,0,0,0,1040,1038,1,0,0,0,1040,1041,1,0,0,0,1041,1043,1,0,0,0,1042,
        1040,1,0,0,0,1043,1044,5,3,0,0,1044,167,1,0,0,0,1045,1046,5,2,0,
        0,1046,1047,5,14,0,0,1047,1048,3,150,75,0,1048,1052,3,150,75,0,1049,
        1051,3,150,75,0,1050,1049,1,0,0,0,1051,1054,1,0,0,0,1052,1050,1,
        0,0,0,1052,1053,1,0,0,0,1053,1055,1,0,0,0,1054,1052,1,0,0,0,1055,
        1056,5,3,0,0,1056,169,1,0,0,0,1057,1058,5,2,0,0,1058,1059,5,23,0,
        0,1059,1060,3,150,75,0,1060,1061,3,150,75,0,1061,1062,3,150,75,0,
        1062,1063,5,3,0,0,1063,171,1,0,0,0,1064,1065,5,2,0,0,1065,1069,5,
        24,0,0,1066,1067,3,150,75,0,1067,1068,3,150,75,0,1068,1070,1,0,0,
        0,1069,1066,1,0,0,0,1070,1071,1,0,0,0,1071,1069,1,0,0,0,1071,1072,
        1,0,0,0,1072,1073,1,0,0,0,1073,1074,5,3,0,0,1074,173,1,0,0,0,1075,
        1076,5,2,0,0,1076,1077,5,35,0,0,1077,1079,5,91,0,0,1078,1080,3,202,
        101,0,1079,1078,1,0,0,0,1079,1080,1,0,0,0,1080,1084,1,0,0,0,1081,
        1083,3,150,75,0,1082,1081,1,0,0,0,1083,1086,1,0,0,0,1084,1082,1,
        0,0,0,1084,1085,1,0,0,0,1085,1087,1,0,0,0,1086,1084,1,0,0,0,1087,
        1088,5,3,0,0,1088,175,1,0,0,0,1089,1090,5,2,0,0,1090,1094,5,25,0,
        0,1091,1093,3,178,89,0,1092,1091,1,0,0,0,1093,1096,1,0,0,0,1094,
        1092,1,0,0,0,1094,1095,1,0,0,0,1095,1097,1,0,0,0,1096,1094,1,0,0,
        0,1097,1098,5,3,0,0,1098,177,1,0,0,0,1099,1100,5,2,0,0,1100,1101,
        3,184,92,0,1101,1102,3,150,75,0,1102,1103,5,3,0,0,1103,1113,1,0,
        0,0,1104,1105,5,2,0,0,1105,1106,3,184,92,0,1106,1107,3,180,90,0,
        1107,1108,5,3,0,0,1108,1113,1,0,0,0,1109,1110,5,2,0,0,1110,1111,
        5,91,0,0,1111,1113,5,3,0,0,1112,1099,1,0,0,0,1112,1104,1,0,0,0,1112,
        1109,1,0,0,0,1113,179,1,0,0,0,1114,1115,5,2,0,0,1115,1116,5,12,0,
        0,1116,1120,3,204,102,0,1117,1119,3,42,21,0,1118,1117,1,0,0,0,1119,
        1122,1,0,0,0,1120,1118,1,0,0,0,1120,1121,1,0,0,0,1121,1123,1,0,0,
        0,1122,1120,1,0,0,0,1123,1124,5,3,0,0,1124,181,1,0,0,0,1125,1126,
        5,2,0,0,1126,1130,5,26,0,0,1127,1129,3,150,75,0,1128,1127,1,0,0,
        0,1129,1132,1,0,0,0,1130,1128,1,0,0,0,1130,1131,1,0,0,0,1131,1133,
        1,0,0,0,1132,1130,1,0,0,0,1133,1134,5,3,0,0,1134,183,1,0,0,0,1135,
        1136,7,2,0,0,1136,185,1,0,0,0,1137,1138,5,2,0,0,1138,1139,5,28,0,
        0,1139,1140,3,150,75,0,1140,1141,3,184,92,0,1141,1142,5,3,0,0,1142,
        187,1,0,0,0,1143,1144,5,2,0,0,1144,1145,5,29,0,0,1145,1146,3,150,
        75,0,1146,1147,3,150,75,0,1147,1148,5,3,0,0,1148,189,1,0,0,0,1149,
        1150,5,2,0,0,1150,1151,7,3,0,0,1151,1152,3,150,75,0,1152,1153,5,
        3,0,0,1153,191,1,0,0,0,1154,1155,5,2,0,0,1155,1156,5,34,0,0,1156,
        1157,3,150,75,0,1157,1158,5,3,0,0,1158,193,1,0,0,0,1159,1160,5,2,
        0,0,1160,1161,5,33,0,0,1161,1162,3,150,75,0,1162,1163,5,3,0,0,1163,
        195,1,0,0,0,1164,1165,5,2,0,0,1165,1166,5,27,0,0,1166,1167,3,150,
        75,0,1167,1168,3,184,92,0,1168,1169,5,3,0,0,1169,197,1,0,0,0,1170,
        1171,5,2,0,0,1171,1172,5,30,0,0,1172,1173,3,150,75,0,1173,1174,3,
        150,75,0,1174,1175,5,3,0,0,1175,199,1,0,0,0,1176,1177,5,2,0,0,1177,
        1179,3,150,75,0,1178,1180,3,202,101,0,1179,1178,1,0,0,0,1179,1180,
        1,0,0,0,1180,1184,1,0,0,0,1181,1183,3,150,75,0,1182,1181,1,0,0,0,
        1183,1186,1,0,0,0,1184,1182,1,0,0,0,1184,1185,1,0,0,0,1185,1187,
        1,0,0,0,1186,1184,1,0,0,0,1187,1188,5,3,0,0,1188,201,1,0,0,0,1189,
        1190,5,2,0,0,1190,1192,5,68,0,0,1191,1193,3,82,41,0,1192,1191,1,
        0,0,0,1193,1194,1,0,0,0,1194,1192,1,0,0,0,1194,1195,1,0,0,0,1195,
        1196,1,0,0,0,1196,1197,5,3,0,0,1197,203,1,0,0,0,1198,1209,5,2,0,
        0,1199,1206,3,206,103,0,1200,1202,5,4,0,0,1201,1200,1,0,0,0,1201,
        1202,1,0,0,0,1202,1203,1,0,0,0,1203,1205,3,206,103,0,1204,1201,1,
        0,0,0,1205,1208,1,0,0,0,1206,1204,1,0,0,0,1206,1207,1,0,0,0,1207,
        1210,1,0,0,0,1208,1206,1,0,0,0,1209,1199,1,0,0,0,1209,1210,1,0,0,
        0,1210,1211,1,0,0,0,1211,1212,5,3,0,0,1212,205,1,0,0,0,1213,1214,
        5,2,0,0,1214,1215,5,91,0,0,1215,1216,5,3,0,0,1216,207,1,0,0,0,1217,
        1218,7,4,0,0,1218,209,1,0,0,0,95,215,226,235,250,259,262,272,281,
        286,289,292,307,316,327,334,340,343,353,363,371,381,393,401,411,
        419,429,433,440,445,448,456,475,483,490,507,514,530,540,550,558,
        570,580,598,605,615,628,637,657,665,675,689,704,709,715,725,735,
        744,749,795,805,816,822,829,838,846,849,852,876,884,888,898,908,
        921,933,945,975,995,1006,1017,1028,1040,1052,1071,1079,1084,1094,
        1112,1120,1130,1179,1184,1194,1201,1206,1209
    ];

    private static __ATN: antlr.ATN;
    public static get _ATN(): antlr.ATN {
        if (!Stage3DParser.__ATN) {
            Stage3DParser.__ATN = new antlr.ATNDeserializer().deserialize(Stage3DParser._serializedATN);
        }

        return Stage3DParser.__ATN;
    }


    private static readonly vocabulary = new antlr.Vocabulary(Stage3DParser.literalNames, Stage3DParser.symbolicNames, []);

    public override get vocabulary(): antlr.Vocabulary {
        return Stage3DParser.vocabulary;
    }

    private static readonly decisionsToDFA = Stage3DParser._ATN.decisionToState.map( (ds: antlr.DecisionState, index: number) => new antlr.DFA(ds, index) );
}

export class ProgramContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.LPAREN, 0)!;
    }
    public PROGRAM(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.PROGRAM, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.RPAREN, 0)!;
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
        return Stage3DParser.RULE_program;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterProgram) {
             listener.enterProgram(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
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
    public statement(): StatementContext | null {
        return this.getRuleContext(0, StatementContext);
    }
    public override get ruleIndex(): number {
        return Stage3DParser.RULE_topLevel;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterTopLevel) {
             listener.enterTopLevel(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
        if(listener.exitTopLevel) {
             listener.exitTopLevel(this);
        }
    }
}


export class DefmacroContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.LPAREN, 0)!;
    }
    public DEFMACRO(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.DEFMACRO, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.IDENTIFIER, 0)!;
    }
    public fnSignature(): FnSignatureContext {
        return this.getRuleContext(0, FnSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.RPAREN, 0)!;
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
        return Stage3DParser.RULE_defmacro;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterDefmacro) {
             listener.enterDefmacro(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
        if(listener.exitDefmacro) {
             listener.exitDefmacro(this);
        }
    }
}


export class DefContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.LPAREN, 0)!;
    }
    public DEF(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.DEF, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.IDENTIFIER, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3DParser.RULE_def;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterDef) {
             listener.enterDef(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
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
        return this.getToken(Stage3DParser.LPAREN, 0)!;
    }
    public TYPE(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.TYPE, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.IDENTIFIER, 0)!;
    }
    public typeExpr(): TypeExprContext {
        return this.getRuleContext(0, TypeExprContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.RPAREN, 0)!;
    }
    public typeParams(): TypeParamsContext | null {
        return this.getRuleContext(0, TypeParamsContext);
    }
    public override get ruleIndex(): number {
        return Stage3DParser.RULE_typeAlias;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterTypeAlias) {
             listener.enterTypeAlias(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
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
        return this.getToken(Stage3DParser.LPAREN, 0)!;
    }
    public INTERFACE(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.INTERFACE, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.IDENTIFIER, 0)!;
    }
    public typeObject(): TypeObjectContext {
        return this.getRuleContext(0, TypeObjectContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.RPAREN, 0)!;
    }
    public typeParams(): TypeParamsContext | null {
        return this.getRuleContext(0, TypeParamsContext);
    }
    public interfaceExtends(): InterfaceExtendsContext | null {
        return this.getRuleContext(0, InterfaceExtendsContext);
    }
    public override get ruleIndex(): number {
        return Stage3DParser.RULE_interfaceDef;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterInterfaceDef) {
             listener.enterInterfaceDef(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
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
        return this.getToken(Stage3DParser.LPAREN, 0)!;
    }
    public EXTENDS(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.EXTENDS, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.RPAREN, 0)!;
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
        return Stage3DParser.RULE_interfaceExtends;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterInterfaceExtends) {
             listener.enterInterfaceExtends(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
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
        return this.getToken(Stage3DParser.LPAREN, 0)!;
    }
    public CLASS(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.CLASS, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.IDENTIFIER, 0)!;
    }
    public classBody(): ClassBodyContext {
        return this.getRuleContext(0, ClassBodyContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.RPAREN, 0)!;
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
        return Stage3DParser.RULE_classDef;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterClassDef) {
             listener.enterClassDef(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
        if(listener.exitClassDef) {
             listener.exitClassDef(this);
        }
    }
}


export class ClassExtendsContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.LPAREN, 0)!;
    }
    public EXTENDS(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.EXTENDS, 0)!;
    }
    public typeExpr(): TypeExprContext {
        return this.getRuleContext(0, TypeExprContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3DParser.RULE_classExtends;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterClassExtends) {
             listener.enterClassExtends(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
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
        return this.getToken(Stage3DParser.LPAREN, 0)!;
    }
    public IMPLEMENTS(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.IMPLEMENTS, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.RPAREN, 0)!;
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
        return Stage3DParser.RULE_classImplements;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterClassImplements) {
             listener.enterClassImplements(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
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
        return this.getToken(Stage3DParser.LPAREN, 0)!;
    }
    public CLASS_BODY(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.CLASS_BODY, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.RPAREN, 0)!;
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
        return Stage3DParser.RULE_classBody;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterClassBody) {
             listener.enterClassBody(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
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
        return Stage3DParser.RULE_classElement;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterClassElement) {
             listener.enterClassElement(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
        if(listener.exitClassElement) {
             listener.exitClassElement(this);
        }
    }
}


export class FieldDefContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.LPAREN, 0)!;
    }
    public FIELD(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.FIELD, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.RPAREN, 0)!;
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
        return this.getToken(Stage3DParser.COLON, 0);
    }
    public typeExpr(): TypeExprContext | null {
        return this.getRuleContext(0, TypeExprContext);
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public override get ruleIndex(): number {
        return Stage3DParser.RULE_fieldDef;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterFieldDef) {
             listener.enterFieldDef(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
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
        return this.getToken(Stage3DParser.LPAREN, 0)!;
    }
    public CONSTRUCTOR(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.CONSTRUCTOR, 0)!;
    }
    public fnSignatureTyped(): FnSignatureTypedContext {
        return this.getRuleContext(0, FnSignatureTypedContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.RPAREN, 0)!;
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
        return Stage3DParser.RULE_constructorDef;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterConstructorDef) {
             listener.enterConstructorDef(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
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
        return this.getToken(Stage3DParser.LPAREN, 0)!;
    }
    public METHOD(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.METHOD, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.IDENTIFIER, 0)!;
    }
    public fnSignatureTyped(): FnSignatureTypedContext {
        return this.getRuleContext(0, FnSignatureTypedContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.RPAREN, 0)!;
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
        return Stage3DParser.RULE_classMethodDef;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterClassMethodDef) {
             listener.enterClassMethodDef(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
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
        return this.getToken(Stage3DParser.LPAREN, 0)!;
    }
    public ABSTRACT_METHOD(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.ABSTRACT_METHOD, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.IDENTIFIER, 0)!;
    }
    public fnSignatureTyped(): FnSignatureTypedContext {
        return this.getRuleContext(0, FnSignatureTypedContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.RPAREN, 0)!;
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
        return Stage3DParser.RULE_abstractMethodDef;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterAbstractMethodDef) {
             listener.enterAbstractMethodDef(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
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
        return this.getToken(Stage3DParser.LPAREN, 0)!;
    }
    public GET(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.GET, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.IDENTIFIER, 0)!;
    }
    public fnSignatureTyped(): FnSignatureTypedContext {
        return this.getRuleContext(0, FnSignatureTypedContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.RPAREN, 0)!;
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
        return Stage3DParser.RULE_getterDef;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterGetterDef) {
             listener.enterGetterDef(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
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
        return this.getToken(Stage3DParser.LPAREN, 0)!;
    }
    public SETPROP(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.SETPROP, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.IDENTIFIER, 0)!;
    }
    public fnSignatureTyped(): FnSignatureTypedContext {
        return this.getRuleContext(0, FnSignatureTypedContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.RPAREN, 0)!;
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
        return Stage3DParser.RULE_setterDef;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterSetterDef) {
             listener.enterSetterDef(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
        if(listener.exitSetterDef) {
             listener.exitSetterDef(this);
        }
    }
}


export class ModifierContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public KEYWORD(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.KEYWORD, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3DParser.RULE_modifier;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterModifier) {
             listener.enterModifier(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
        if(listener.exitModifier) {
             listener.exitModifier(this);
        }
    }
}


export class TypedParamContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.RPAREN, 0)!;
    }
    public OPTIONAL(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.OPTIONAL, 0);
    }
    public COLON(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.COLON, 0);
    }
    public typeExpr(): TypeExprContext | null {
        return this.getRuleContext(0, TypeExprContext);
    }
    public override get ruleIndex(): number {
        return Stage3DParser.RULE_typedParam;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterTypedParam) {
             listener.enterTypedParam(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
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
    		return this.getTokens(Stage3DParser.LPAREN);
    	} else {
    		return this.getToken(Stage3DParser.LPAREN, i);
    	}
    }
    public RPAREN(): antlr.TerminalNode[];
    public RPAREN(i: number): antlr.TerminalNode | null;
    public RPAREN(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage3DParser.RPAREN);
    	} else {
    		return this.getToken(Stage3DParser.RPAREN, i);
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
        return this.getToken(Stage3DParser.RETURNS, 0);
    }
    public typeExpr(): TypeExprContext | null {
        return this.getRuleContext(0, TypeExprContext);
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage3DParser.COMMA);
    	} else {
    		return this.getToken(Stage3DParser.COMMA, i);
    	}
    }
    public override get ruleIndex(): number {
        return Stage3DParser.RULE_fnSignatureTyped;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterFnSignatureTyped) {
             listener.enterFnSignatureTyped(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
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
        return Stage3DParser.RULE_statement;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterStatement) {
             listener.enterStatement(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
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
    		return this.getTokens(Stage3DParser.LPAREN);
    	} else {
    		return this.getToken(Stage3DParser.LPAREN, i);
    	}
    }
    public LETSTAR(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.LETSTAR, 0)!;
    }
    public RPAREN(): antlr.TerminalNode[];
    public RPAREN(i: number): antlr.TerminalNode | null;
    public RPAREN(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage3DParser.RPAREN);
    	} else {
    		return this.getToken(Stage3DParser.RPAREN, i);
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
        return Stage3DParser.RULE_letStar;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterLetStar) {
             listener.enterLetStar(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
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
        return this.getToken(Stage3DParser.LPAREN, 0)!;
    }
    public LET(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.LET, 0)!;
    }
    public singleBinding(): SingleBindingContext {
        return this.getRuleContext(0, SingleBindingContext)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3DParser.RULE_letStmt;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterLetStmt) {
             listener.enterLetStmt(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
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
    		return this.getTokens(Stage3DParser.LPAREN);
    	} else {
    		return this.getToken(Stage3DParser.LPAREN, i);
    	}
    }
    public CONSTSTAR(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.CONSTSTAR, 0)!;
    }
    public RPAREN(): antlr.TerminalNode[];
    public RPAREN(i: number): antlr.TerminalNode | null;
    public RPAREN(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage3DParser.RPAREN);
    	} else {
    		return this.getToken(Stage3DParser.RPAREN, i);
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
        return Stage3DParser.RULE_constStar;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterConstStar) {
             listener.enterConstStar(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
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
        return this.getToken(Stage3DParser.LPAREN, 0)!;
    }
    public CONST(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.CONST, 0)!;
    }
    public singleBinding(): SingleBindingContext {
        return this.getRuleContext(0, SingleBindingContext)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3DParser.RULE_constStmt;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterConstStmt) {
             listener.enterConstStmt(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
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
        return this.getToken(Stage3DParser.LPAREN, 0)!;
    }
    public IF(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.IF, 0)!;
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
        return this.getToken(Stage3DParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3DParser.RULE_ifForm;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterIfForm) {
             listener.enterIfForm(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
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
        return this.getToken(Stage3DParser.LPAREN, 0)!;
    }
    public WHILE(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.WHILE, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.RPAREN, 0)!;
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
        return Stage3DParser.RULE_whileForm;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterWhileForm) {
             listener.enterWhileForm(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
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
        return this.getToken(Stage3DParser.LPAREN, 0)!;
    }
    public BEGIN(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.BEGIN, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.RPAREN, 0)!;
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
        return Stage3DParser.RULE_block;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterBlock) {
             listener.enterBlock(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
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
        return this.getToken(Stage3DParser.LPAREN, 0)!;
    }
    public RETURN(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.RETURN, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.RPAREN, 0)!;
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public override get ruleIndex(): number {
        return Stage3DParser.RULE_returnForm;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterReturnForm) {
             listener.enterReturnForm(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
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
        return this.getToken(Stage3DParser.LPAREN, 0)!;
    }
    public THROW(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.THROW, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3DParser.RULE_throwForm;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterThrowForm) {
             listener.enterThrowForm(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
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
        return this.getToken(Stage3DParser.LPAREN, 0)!;
    }
    public IMPORT(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.IMPORT, 0)!;
    }
    public STRING(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.STRING, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.RPAREN, 0)!;
    }
    public objectExpr(): ObjectExprContext | null {
        return this.getRuleContext(0, ObjectExprContext);
    }
    public override get ruleIndex(): number {
        return Stage3DParser.RULE_importForm;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterImportForm) {
             listener.enterImportForm(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
        if(listener.exitImportForm) {
             listener.exitImportForm(this);
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
    public exportFrom(): ExportFromContext | null {
        return this.getRuleContext(0, ExportFromContext);
    }
    public exportAllFrom(): ExportAllFromContext | null {
        return this.getRuleContext(0, ExportAllFromContext);
    }
    public override get ruleIndex(): number {
        return Stage3DParser.RULE_exportForm;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterExportForm) {
             listener.enterExportForm(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
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
        return this.getToken(Stage3DParser.LPAREN, 0)!;
    }
    public EXPORT(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.EXPORT, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.IDENTIFIER, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3DParser.RULE_exportBinding;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterExportBinding) {
             listener.enterExportBinding(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
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
        return this.getToken(Stage3DParser.LPAREN, 0)!;
    }
    public EXPORT_DEFAULT(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.EXPORT_DEFAULT, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3DParser.RULE_exportDefault;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterExportDefault) {
             listener.enterExportDefault(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
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
        return this.getToken(Stage3DParser.LPAREN, 0)!;
    }
    public EXPORT_NAMED(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.EXPORT_NAMED, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.RPAREN, 0)!;
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
        return Stage3DParser.RULE_exportNamed;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterExportNamed) {
             listener.enterExportNamed(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
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
        return this.getToken(Stage3DParser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode[];
    public IDENTIFIER(i: number): antlr.TerminalNode | null;
    public IDENTIFIER(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage3DParser.IDENTIFIER);
    	} else {
    		return this.getToken(Stage3DParser.IDENTIFIER, i);
    	}
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3DParser.RULE_exportNamePair;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterExportNamePair) {
             listener.enterExportNamePair(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
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
        return this.getToken(Stage3DParser.LPAREN, 0)!;
    }
    public EXPORT_FROM(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.EXPORT_FROM, 0)!;
    }
    public STRING(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.STRING, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.RPAREN, 0)!;
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
        return Stage3DParser.RULE_exportFrom;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterExportFrom) {
             listener.enterExportFrom(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
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
        return this.getToken(Stage3DParser.LPAREN, 0)!;
    }
    public EXPORT_ALL_FROM(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.EXPORT_ALL_FROM, 0)!;
    }
    public STRING(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.STRING, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3DParser.RULE_exportAllFrom;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterExportAllFrom) {
             listener.enterExportAllFrom(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
        if(listener.exitExportAllFrom) {
             listener.exitExportAllFrom(this);
        }
    }
}


export class StarBindingContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.IDENTIFIER, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.RPAREN, 0)!;
    }
    public COLON(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.COLON, 0);
    }
    public typeExpr(): TypeExprContext | null {
        return this.getRuleContext(0, TypeExprContext);
    }
    public override get ruleIndex(): number {
        return Stage3DParser.RULE_starBinding;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterStarBinding) {
             listener.enterStarBinding(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
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
        return this.getToken(Stage3DParser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.RPAREN, 0)!;
    }
    public COLON(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.COLON, 0);
    }
    public typeExpr(): TypeExprContext | null {
        return this.getRuleContext(0, TypeExprContext);
    }
    public override get ruleIndex(): number {
        return Stage3DParser.RULE_singleBinding;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterSingleBinding) {
             listener.enterSingleBinding(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
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
        return this.getToken(Stage3DParser.IDENTIFIER, 0);
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
        return Stage3DParser.RULE_typeExpr;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterTypeExpr) {
             listener.enterTypeExpr(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
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
        return this.getToken(Stage3DParser.LPAREN, 0)!;
    }
    public UNION(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.UNION, 0)!;
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
        return this.getToken(Stage3DParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3DParser.RULE_typeUnion;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterTypeUnion) {
             listener.enterTypeUnion(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
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
        return this.getToken(Stage3DParser.LPAREN, 0)!;
    }
    public INTERSECT(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.INTERSECT, 0)!;
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
        return this.getToken(Stage3DParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3DParser.RULE_typeIntersection;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterTypeIntersection) {
             listener.enterTypeIntersection(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
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
        return this.getToken(Stage3DParser.LPAREN, 0)!;
    }
    public ARRAY(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.ARRAY, 0)!;
    }
    public typeExpr(): TypeExprContext {
        return this.getRuleContext(0, TypeExprContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3DParser.RULE_typeArray;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterTypeArray) {
             listener.enterTypeArray(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
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
        return this.getToken(Stage3DParser.LPAREN, 0)!;
    }
    public TUPLE(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.TUPLE, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.RPAREN, 0)!;
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
        return Stage3DParser.RULE_typeTuple;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterTypeTuple) {
             listener.enterTypeTuple(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
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
        return this.getToken(Stage3DParser.LPAREN, 0);
    }
    public REST(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.REST, 0);
    }
    public typeExpr(): TypeExprContext {
        return this.getRuleContext(0, TypeExprContext)!;
    }
    public RPAREN(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.RPAREN, 0);
    }
    public IDENTIFIER(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.IDENTIFIER, 0);
    }
    public override get ruleIndex(): number {
        return Stage3DParser.RULE_typeTupleElement;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterTypeTupleElement) {
             listener.enterTypeTupleElement(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
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
    		return this.getTokens(Stage3DParser.LPAREN);
    	} else {
    		return this.getToken(Stage3DParser.LPAREN, i);
    	}
    }
    public TYPEFN(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.TYPEFN, 0)!;
    }
    public RPAREN(): antlr.TerminalNode[];
    public RPAREN(i: number): antlr.TerminalNode | null;
    public RPAREN(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage3DParser.RPAREN);
    	} else {
    		return this.getToken(Stage3DParser.RPAREN, i);
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
        return Stage3DParser.RULE_typeFunction;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterTypeFunction) {
             listener.enterTypeFunction(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
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
        return this.getToken(Stage3DParser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.IDENTIFIER, 0)!;
    }
    public typeExpr(): TypeExprContext {
        return this.getRuleContext(0, TypeExprContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.RPAREN, 0)!;
    }
    public OPTIONAL(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.OPTIONAL, 0);
    }
    public override get ruleIndex(): number {
        return Stage3DParser.RULE_typeFnParam;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterTypeFnParam) {
             listener.enterTypeFnParam(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
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
        return this.getToken(Stage3DParser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.RPAREN, 0)!;
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
        return Stage3DParser.RULE_typeObject;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterTypeObject) {
             listener.enterTypeObject(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
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
        return this.getToken(Stage3DParser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.IDENTIFIER, 0)!;
    }
    public typeExpr(): TypeExprContext {
        return this.getRuleContext(0, TypeExprContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.RPAREN, 0)!;
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
        return this.getToken(Stage3DParser.OPTIONAL, 0);
    }
    public override get ruleIndex(): number {
        return Stage3DParser.RULE_typeProp;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterTypeProp) {
             listener.enterTypeProp(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
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
        return this.getToken(Stage3DParser.READONLY, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3DParser.RULE_propModifier;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterPropModifier) {
             listener.enterPropModifier(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
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
        return this.getToken(Stage3DParser.LPAREN, 0)!;
    }
    public LIT(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.LIT, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.RPAREN, 0)!;
    }
    public STRING(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.STRING, 0);
    }
    public BACKTICK_STRING(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.BACKTICK_STRING, 0);
    }
    public NUMBER(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.NUMBER, 0);
    }
    public BOOLEAN(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.BOOLEAN, 0);
    }
    public override get ruleIndex(): number {
        return Stage3DParser.RULE_typeLiteral;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterTypeLiteral) {
             listener.enterTypeLiteral(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
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
        return this.getToken(Stage3DParser.LPAREN, 0)!;
    }
    public KEYOF(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.KEYOF, 0)!;
    }
    public typeExpr(): TypeExprContext {
        return this.getRuleContext(0, TypeExprContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3DParser.RULE_typeKeyof;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterTypeKeyof) {
             listener.enterTypeKeyof(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
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
        return this.getToken(Stage3DParser.LPAREN, 0)!;
    }
    public TYPEOF(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.TYPEOF, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3DParser.RULE_typeTypeof;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterTypeTypeof) {
             listener.enterTypeTypeof(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
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
        return this.getToken(Stage3DParser.LPAREN, 0)!;
    }
    public INDEX(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.INDEX, 0)!;
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
        return this.getToken(Stage3DParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3DParser.RULE_typeIndexAccess;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterTypeIndexAccess) {
             listener.enterTypeIndexAccess(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
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
        return this.getToken(Stage3DParser.LPAREN, 0)!;
    }
    public COND(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.COND, 0)!;
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
        return this.getToken(Stage3DParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3DParser.RULE_typeConditional;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterTypeConditional) {
             listener.enterTypeConditional(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
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
        return this.getToken(Stage3DParser.LPAREN, 0)!;
    }
    public INFER(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.INFER, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3DParser.RULE_typeInfer;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterTypeInfer) {
             listener.enterTypeInfer(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
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
        return this.getToken(Stage3DParser.LPAREN, 0)!;
    }
    public MAPPED(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.MAPPED, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.IDENTIFIER, 0)!;
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
        return this.getToken(Stage3DParser.RPAREN, 0)!;
    }
    public mappedModifiers(): MappedModifiersContext | null {
        return this.getRuleContext(0, MappedModifiersContext);
    }
    public override get ruleIndex(): number {
        return Stage3DParser.RULE_typeMapped;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterTypeMapped) {
             listener.enterTypeMapped(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
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
        return this.getToken(Stage3DParser.LPAREN, 0)!;
    }
    public MODIFIERS(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.MODIFIERS, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.RPAREN, 0)!;
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
        return Stage3DParser.RULE_mappedModifiers;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterMappedModifiers) {
             listener.enterMappedModifiers(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
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
        return this.getToken(Stage3DParser.READONLY, 0);
    }
    public OPTIONAL(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.OPTIONAL, 0);
    }
    public override get ruleIndex(): number {
        return Stage3DParser.RULE_mappedModifier;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterMappedModifier) {
             listener.enterMappedModifier(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
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
        return this.getToken(Stage3DParser.LPAREN, 0)!;
    }
    public TEMPLATE(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.TEMPLATE, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.RPAREN, 0)!;
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
        return Stage3DParser.RULE_typeTemplateLiteral;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterTypeTemplateLiteral) {
             listener.enterTypeTemplateLiteral(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
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
        return this.getToken(Stage3DParser.STRING, 0);
    }
    public typeExpr(): TypeExprContext | null {
        return this.getRuleContext(0, TypeExprContext);
    }
    public override get ruleIndex(): number {
        return Stage3DParser.RULE_templatePart;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterTemplatePart) {
             listener.enterTemplatePart(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
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
        return this.getToken(Stage3DParser.LPAREN, 0)!;
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
        return this.getToken(Stage3DParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3DParser.RULE_typeApplication;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterTypeApplication) {
             listener.enterTypeApplication(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
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
        return this.getToken(Stage3DParser.LPAREN, 0)!;
    }
    public TYPE_PARAMS(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.TYPE_PARAMS, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.RPAREN, 0)!;
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
        return Stage3DParser.RULE_typeParams;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterTypeParams) {
             listener.enterTypeParams(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
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
        return this.getToken(Stage3DParser.IDENTIFIER, 0)!;
    }
    public LPAREN(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.LPAREN, 0);
    }
    public RPAREN(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.RPAREN, 0);
    }
    public typeParamConstraint(): TypeParamConstraintContext | null {
        return this.getRuleContext(0, TypeParamConstraintContext);
    }
    public typeParamDefault(): TypeParamDefaultContext | null {
        return this.getRuleContext(0, TypeParamDefaultContext);
    }
    public override get ruleIndex(): number {
        return Stage3DParser.RULE_typeParamDecl;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterTypeParamDecl) {
             listener.enterTypeParamDecl(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
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
        return this.getToken(Stage3DParser.LPAREN, 0)!;
    }
    public EXTENDS(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.EXTENDS, 0)!;
    }
    public typeExpr(): TypeExprContext {
        return this.getRuleContext(0, TypeExprContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3DParser.RULE_typeParamConstraint;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterTypeParamConstraint) {
             listener.enterTypeParamConstraint(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
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
        return this.getToken(Stage3DParser.LPAREN, 0)!;
    }
    public DEFAULT(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.DEFAULT, 0)!;
    }
    public typeExpr(): TypeExprContext {
        return this.getRuleContext(0, TypeExprContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3DParser.RULE_typeParamDefault;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterTypeParamDefault) {
             listener.enterTypeParamDefault(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
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
        return this.getToken(Stage3DParser.LPAREN, 0)!;
    }
    public SET(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.SET, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.IDENTIFIER, 0);
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.RPAREN, 0)!;
    }
    public propAccess(): PropAccessContext | null {
        return this.getRuleContext(0, PropAccessContext);
    }
    public override get ruleIndex(): number {
        return Stage3DParser.RULE_assign;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterAssign) {
             listener.enterAssign(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
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
        return this.getToken(Stage3DParser.LPAREN, 0)!;
    }
    public SWITCH(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.SWITCH, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.RPAREN, 0)!;
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
        return Stage3DParser.RULE_switchForm;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterSwitchForm) {
             listener.enterSwitchForm(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
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
        return this.getToken(Stage3DParser.LPAREN, 0)!;
    }
    public CASE(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.CASE, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.RPAREN, 0)!;
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
        return Stage3DParser.RULE_caseClause;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterCaseClause) {
             listener.enterCaseClause(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
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
        return this.getToken(Stage3DParser.LPAREN, 0)!;
    }
    public DEFAULT(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.DEFAULT, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.RPAREN, 0)!;
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
        return Stage3DParser.RULE_defaultClause;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterDefaultClause) {
             listener.enterDefaultClause(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
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
        return this.getToken(Stage3DParser.LPAREN, 0)!;
    }
    public FOR(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.FOR, 0)!;
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
        return this.getToken(Stage3DParser.RPAREN, 0)!;
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
        return Stage3DParser.RULE_forForm;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterForForm) {
             listener.enterForForm(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
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
        return this.getToken(Stage3DParser.LPAREN, 0)!;
    }
    public FORIN(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.FORIN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.IDENTIFIER, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.RPAREN, 0)!;
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
        return Stage3DParser.RULE_forInForm;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterForInForm) {
             listener.enterForInForm(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
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
        return this.getToken(Stage3DParser.LPAREN, 0)!;
    }
    public FOROF(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.FOROF, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.IDENTIFIER, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.RPAREN, 0)!;
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
        return Stage3DParser.RULE_forOfForm;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterForOfForm) {
             listener.enterForOfForm(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
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
        return this.getToken(Stage3DParser.KEYWORD, 0);
    }
    public IDENTIFIER(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.IDENTIFIER, 0);
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
        return Stage3DParser.RULE_expression;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterExpression) {
             listener.enterExpression(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
        if(listener.exitExpression) {
             listener.exitExpression(this);
        }
    }
}


export class TypeofExprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.LPAREN, 0)!;
    }
    public TYPEOF(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.TYPEOF, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3DParser.RULE_typeofExpr;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterTypeofExpr) {
             listener.enterTypeofExpr(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
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
        return this.getToken(Stage3DParser.LPAREN, 0)!;
    }
    public TYPE_AS(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.TYPE_AS, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public typeExpr(): TypeExprContext {
        return this.getRuleContext(0, TypeExprContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3DParser.RULE_typeAssert;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterTypeAssert) {
             listener.enterTypeAssert(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
        if(listener.exitTypeAssert) {
             listener.exitTypeAssert(this);
        }
    }
}


export class ThisExprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public THIS(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.THIS, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3DParser.RULE_thisExpr;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterThisExpr) {
             listener.enterThisExpr(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
        if(listener.exitThisExpr) {
             listener.exitThisExpr(this);
        }
    }
}


export class SuperConstructorCallContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.LPAREN, 0)!;
    }
    public SUPER(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.SUPER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.RPAREN, 0)!;
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
        return Stage3DParser.RULE_superConstructorCall;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterSuperConstructorCall) {
             listener.enterSuperConstructorCall(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
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
        return this.getToken(Stage3DParser.LPAREN, 0)!;
    }
    public SUPER_METHOD(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.SUPER_METHOD, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.RPAREN, 0)!;
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
        return Stage3DParser.RULE_superMethodCall;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterSuperMethodCall) {
             listener.enterSuperMethodCall(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
        if(listener.exitSuperMethodCall) {
             listener.exitSuperMethodCall(this);
        }
    }
}


export class LambdaContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.LPAREN, 0)!;
    }
    public LAMBDA(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.LAMBDA, 0)!;
    }
    public fnSignature(): FnSignatureContext {
        return this.getRuleContext(0, FnSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.RPAREN, 0)!;
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
        return Stage3DParser.RULE_lambda;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterLambda) {
             listener.enterLambda(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
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
        return this.getToken(Stage3DParser.LPAREN, 0)!;
    }
    public FN(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.FN, 0)!;
    }
    public fnSignature(): FnSignatureContext {
        return this.getRuleContext(0, FnSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.RPAREN, 0)!;
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
        return Stage3DParser.RULE_fn;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterFn) {
             listener.enterFn(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
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
        return this.getToken(Stage3DParser.LPAREN, 0)!;
    }
    public BIND(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.BIND, 0)!;
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
        return this.getToken(Stage3DParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3DParser.RULE_bindExpr;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterBindExpr) {
             listener.enterBindExpr(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
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
        return this.getToken(Stage3DParser.LPAREN, 0)!;
    }
    public METHOD_CALL(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.METHOD_CALL, 0)!;
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
        return this.getToken(Stage3DParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3DParser.RULE_methodCallExpr;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterMethodCallExpr) {
             listener.enterMethodCallExpr(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
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
        return this.getToken(Stage3DParser.LPAREN, 0)!;
    }
    public TERNARY(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.TERNARY, 0)!;
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
        return this.getToken(Stage3DParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3DParser.RULE_ternary;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterTernary) {
             listener.enterTernary(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
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
        return this.getToken(Stage3DParser.LPAREN, 0)!;
    }
    public COND(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.COND, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.RPAREN, 0)!;
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
        return Stage3DParser.RULE_condExpr;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterCondExpr) {
             listener.enterCondExpr(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
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
        return this.getToken(Stage3DParser.LPAREN, 0)!;
    }
    public NEW(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.NEW, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.RPAREN, 0)!;
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
        return Stage3DParser.RULE_newForm;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterNewForm) {
             listener.enterNewForm(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
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
        return this.getToken(Stage3DParser.LPAREN, 0)!;
    }
    public OBJECT(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.OBJECT, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.RPAREN, 0)!;
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
        return Stage3DParser.RULE_objectExpr;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterObjectExpr) {
             listener.enterObjectExpr(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
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
        return this.getToken(Stage3DParser.LPAREN, 0)!;
    }
    public propKey(): PropKeyContext | null {
        return this.getRuleContext(0, PropKeyContext);
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.RPAREN, 0)!;
    }
    public objectMethodDef(): ObjectMethodDefContext | null {
        return this.getRuleContext(0, ObjectMethodDefContext);
    }
    public IDENTIFIER(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.IDENTIFIER, 0);
    }
    public override get ruleIndex(): number {
        return Stage3DParser.RULE_objectField;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterObjectField) {
             listener.enterObjectField(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
        if(listener.exitObjectField) {
             listener.exitObjectField(this);
        }
    }
}


export class ObjectMethodDefContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.LPAREN, 0)!;
    }
    public METHOD(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.METHOD, 0)!;
    }
    public fnSignature(): FnSignatureContext {
        return this.getRuleContext(0, FnSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.RPAREN, 0)!;
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
        return Stage3DParser.RULE_objectMethodDef;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterObjectMethodDef) {
             listener.enterObjectMethodDef(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
        if(listener.exitObjectMethodDef) {
             listener.exitObjectMethodDef(this);
        }
    }
}


export class ArrayExprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.LPAREN, 0)!;
    }
    public ARRAY(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.ARRAY, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.RPAREN, 0)!;
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
        return Stage3DParser.RULE_arrayExpr;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterArrayExpr) {
             listener.enterArrayExpr(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
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
        return this.getToken(Stage3DParser.IDENTIFIER, 0);
    }
    public KEYWORD(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.KEYWORD, 0);
    }
    public STRING(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.STRING, 0);
    }
    public BACKTICK_STRING(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.BACKTICK_STRING, 0);
    }
    public PROGRAM(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.PROGRAM, 0);
    }
    public LETSTAR(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.LETSTAR, 0);
    }
    public LET(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.LET, 0);
    }
    public CONSTSTAR(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.CONSTSTAR, 0);
    }
    public CONST(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.CONST, 0);
    }
    public LAMBDA(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.LAMBDA, 0);
    }
    public FN(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.FN, 0);
    }
    public METHOD(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.METHOD, 0);
    }
    public BIND(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.BIND, 0);
    }
    public METHOD_CALL(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.METHOD_CALL, 0);
    }
    public DEF(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.DEF, 0);
    }
    public DEFMACRO(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.DEFMACRO, 0);
    }
    public IF(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.IF, 0);
    }
    public WHILE(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.WHILE, 0);
    }
    public BEGIN(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.BEGIN, 0);
    }
    public RETURN(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.RETURN, 0);
    }
    public THROW(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.THROW, 0);
    }
    public SET(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.SET, 0);
    }
    public TERNARY(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.TERNARY, 0);
    }
    public COND(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.COND, 0);
    }
    public OBJECT(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.OBJECT, 0);
    }
    public ARRAY(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.ARRAY, 0);
    }
    public INDEX(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.INDEX, 0);
    }
    public QUASI(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.QUASI, 0);
    }
    public QUOTE(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.QUOTE, 0);
    }
    public UNQUOTE_SPLICING(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.UNQUOTE_SPLICING, 0);
    }
    public UNQUOTE(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.UNQUOTE, 0);
    }
    public NEW(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.NEW, 0);
    }
    public IMPORT(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.IMPORT, 0);
    }
    public SWITCH(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.SWITCH, 0);
    }
    public CASE(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.CASE, 0);
    }
    public DEFAULT(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.DEFAULT, 0);
    }
    public FORIN(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.FORIN, 0);
    }
    public FOROF(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.FOROF, 0);
    }
    public FOR(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.FOR, 0);
    }
    public UNION(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.UNION, 0);
    }
    public INTERSECT(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.INTERSECT, 0);
    }
    public TUPLE(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.TUPLE, 0);
    }
    public TYPEFN(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.TYPEFN, 0);
    }
    public LIT(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.LIT, 0);
    }
    public KEYOF(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.KEYOF, 0);
    }
    public TYPEOF(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.TYPEOF, 0);
    }
    public INFER(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.INFER, 0);
    }
    public MAPPED(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.MAPPED, 0);
    }
    public TEMPLATE(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.TEMPLATE, 0);
    }
    public REST(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.REST, 0);
    }
    public READONLY(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.READONLY, 0);
    }
    public TYPE_AS(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.TYPE_AS, 0);
    }
    public TYPE_PARAMS(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.TYPE_PARAMS, 0);
    }
    public TYPE_ARGS(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.TYPE_ARGS, 0);
    }
    public EXTENDS(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.EXTENDS, 0);
    }
    public RETURNS(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.RETURNS, 0);
    }
    public TYPE(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.TYPE, 0);
    }
    public INTERFACE(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.INTERFACE, 0);
    }
    public MODIFIERS(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.MODIFIERS, 0);
    }
    public BOOLEAN(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.BOOLEAN, 0);
    }
    public NULL(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.NULL, 0);
    }
    public UNDEFINED(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.UNDEFINED, 0);
    }
    public EXPORT(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.EXPORT, 0);
    }
    public EXPORT_DEFAULT(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.EXPORT_DEFAULT, 0);
    }
    public EXPORT_NAMED(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.EXPORT_NAMED, 0);
    }
    public EXPORT_FROM(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.EXPORT_FROM, 0);
    }
    public EXPORT_ALL_FROM(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.EXPORT_ALL_FROM, 0);
    }
    public CLASS(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.CLASS, 0);
    }
    public CLASS_BODY(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.CLASS_BODY, 0);
    }
    public FIELD(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.FIELD, 0);
    }
    public CONSTRUCTOR(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.CONSTRUCTOR, 0);
    }
    public THIS(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.THIS, 0);
    }
    public SUPER(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.SUPER, 0);
    }
    public SUPER_METHOD(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.SUPER_METHOD, 0);
    }
    public GET(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.GET, 0);
    }
    public SETPROP(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.SETPROP, 0);
    }
    public ABSTRACT_METHOD(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.ABSTRACT_METHOD, 0);
    }
    public IMPLEMENTS(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.IMPLEMENTS, 0);
    }
    public override get ruleIndex(): number {
        return Stage3DParser.RULE_propKey;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterPropKey) {
             listener.enterPropKey(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
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
        return this.getToken(Stage3DParser.LPAREN, 0)!;
    }
    public DOT(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.DOT, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public propKey(): PropKeyContext {
        return this.getRuleContext(0, PropKeyContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3DParser.RULE_propAccess;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterPropAccess) {
             listener.enterPropAccess(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
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
        return this.getToken(Stage3DParser.LPAREN, 0)!;
    }
    public INDEX(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.INDEX, 0)!;
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
        return this.getToken(Stage3DParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3DParser.RULE_indexAccess;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterIndexAccess) {
             listener.enterIndexAccess(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
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
        return this.getToken(Stage3DParser.LPAREN, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.RPAREN, 0)!;
    }
    public QUASI(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.QUASI, 0);
    }
    public QUOTE(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.QUOTE, 0);
    }
    public override get ruleIndex(): number {
        return Stage3DParser.RULE_quasiquote;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterQuasiquote) {
             listener.enterQuasiquote(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
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
        return this.getToken(Stage3DParser.LPAREN, 0)!;
    }
    public UNQUOTE(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.UNQUOTE, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3DParser.RULE_unquote;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterUnquote) {
             listener.enterUnquote(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
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
        return this.getToken(Stage3DParser.LPAREN, 0)!;
    }
    public UNQUOTE_SPLICING(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.UNQUOTE_SPLICING, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3DParser.RULE_unquoteSplicing;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterUnquoteSplicing) {
             listener.enterUnquoteSplicing(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
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
        return this.getToken(Stage3DParser.LPAREN, 0)!;
    }
    public OPTCHAIN(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.OPTCHAIN, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public propKey(): PropKeyContext {
        return this.getRuleContext(0, PropKeyContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3DParser.RULE_optChain;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterOptChain) {
             listener.enterOptChain(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
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
        return this.getToken(Stage3DParser.LPAREN, 0)!;
    }
    public NULLCOAL(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.NULLCOAL, 0)!;
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
        return this.getToken(Stage3DParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3DParser.RULE_nullCoalesce;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterNullCoalesce) {
             listener.enterNullCoalesce(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
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
        return this.getToken(Stage3DParser.LPAREN, 0)!;
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
        return this.getToken(Stage3DParser.RPAREN, 0)!;
    }
    public typeArgs(): TypeArgsContext | null {
        return this.getRuleContext(0, TypeArgsContext);
    }
    public override get ruleIndex(): number {
        return Stage3DParser.RULE_call;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterCall) {
             listener.enterCall(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
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
        return this.getToken(Stage3DParser.LPAREN, 0)!;
    }
    public TYPE_ARGS(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.TYPE_ARGS, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.RPAREN, 0)!;
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
        return Stage3DParser.RULE_typeArgs;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterTypeArgs) {
             listener.enterTypeArgs(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
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
        return this.getToken(Stage3DParser.LPAREN, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.RPAREN, 0)!;
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
    		return this.getTokens(Stage3DParser.COMMA);
    	} else {
    		return this.getToken(Stage3DParser.COMMA, i);
    	}
    }
    public override get ruleIndex(): number {
        return Stage3DParser.RULE_fnSignature;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterFnSignature) {
             listener.enterFnSignature(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
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
        return this.getToken(Stage3DParser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3DParser.RULE_param;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterParam) {
             listener.enterParam(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
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
        return this.getToken(Stage3DParser.NUMBER, 0);
    }
    public STRING(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.STRING, 0);
    }
    public BACKTICK_STRING(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.BACKTICK_STRING, 0);
    }
    public BOOLEAN(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.BOOLEAN, 0);
    }
    public NULL(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.NULL, 0);
    }
    public UNDEFINED(): antlr.TerminalNode | null {
        return this.getToken(Stage3DParser.UNDEFINED, 0);
    }
    public override get ruleIndex(): number {
        return Stage3DParser.RULE_literal;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterLiteral) {
             listener.enterLiteral(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
        if(listener.exitLiteral) {
             listener.exitLiteral(this);
        }
    }
}
