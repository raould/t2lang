
import * as antlr from "antlr4ng";
import { Token } from "antlr4ng";

import { Stage3EListener } from "./Stage3EListener.js";
// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;


export class Stage3EParser extends antlr.Parser {
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
    public static readonly RULE_anonClassDef = 8;
    public static readonly RULE_classExtends = 9;
    public static readonly RULE_classImplements = 10;
    public static readonly RULE_classBody = 11;
    public static readonly RULE_classElement = 12;
    public static readonly RULE_modifier = 13;
    public static readonly RULE_fieldDef = 14;
    public static readonly RULE_constructorDef = 15;
    public static readonly RULE_classMethodDef = 16;
    public static readonly RULE_abstractMethodDef = 17;
    public static readonly RULE_getterDef = 18;
    public static readonly RULE_setterDef = 19;
    public static readonly RULE_typedParam = 20;
    public static readonly RULE_fnSignatureTyped = 21;
    public static readonly RULE_statement = 22;
    public static readonly RULE_letStar = 23;
    public static readonly RULE_letStmt = 24;
    public static readonly RULE_constStar = 25;
    public static readonly RULE_constStmt = 26;
    public static readonly RULE_ifForm = 27;
    public static readonly RULE_whileForm = 28;
    public static readonly RULE_block = 29;
    public static readonly RULE_returnForm = 30;
    public static readonly RULE_throwForm = 31;
    public static readonly RULE_importForm = 32;
    public static readonly RULE_exportForm = 33;
    public static readonly RULE_exportBinding = 34;
    public static readonly RULE_exportDefault = 35;
    public static readonly RULE_exportNamed = 36;
    public static readonly RULE_exportNamePair = 37;
    public static readonly RULE_exportFrom = 38;
    public static readonly RULE_exportAllFrom = 39;
    public static readonly RULE_starBinding = 40;
    public static readonly RULE_singleBinding = 41;
    public static readonly RULE_typeExpr = 42;
    public static readonly RULE_typeUnion = 43;
    public static readonly RULE_typeIntersection = 44;
    public static readonly RULE_typeArray = 45;
    public static readonly RULE_typeTuple = 46;
    public static readonly RULE_typeTupleElement = 47;
    public static readonly RULE_typeFunction = 48;
    public static readonly RULE_typeFnParam = 49;
    public static readonly RULE_typeObject = 50;
    public static readonly RULE_typeProp = 51;
    public static readonly RULE_propModifier = 52;
    public static readonly RULE_typeLiteral = 53;
    public static readonly RULE_typeKeyof = 54;
    public static readonly RULE_typeTypeof = 55;
    public static readonly RULE_typeIndexAccess = 56;
    public static readonly RULE_typeConditional = 57;
    public static readonly RULE_typeInfer = 58;
    public static readonly RULE_typeMapped = 59;
    public static readonly RULE_mappedModifiers = 60;
    public static readonly RULE_mappedModifier = 61;
    public static readonly RULE_typeTemplateLiteral = 62;
    public static readonly RULE_templatePart = 63;
    public static readonly RULE_typeApplication = 64;
    public static readonly RULE_typeParams = 65;
    public static readonly RULE_typeParamDecl = 66;
    public static readonly RULE_typeParamConstraint = 67;
    public static readonly RULE_typeParamDefault = 68;
    public static readonly RULE_assign = 69;
    public static readonly RULE_switchForm = 70;
    public static readonly RULE_caseClause = 71;
    public static readonly RULE_defaultClause = 72;
    public static readonly RULE_forForm = 73;
    public static readonly RULE_forInForm = 74;
    public static readonly RULE_forOfForm = 75;
    public static readonly RULE_expression = 76;
    public static readonly RULE_thisExpr = 77;
    public static readonly RULE_superExpr = 78;
    public static readonly RULE_superConstructorCall = 79;
    public static readonly RULE_superMethodCall = 80;
    public static readonly RULE_typeofExpr = 81;
    public static readonly RULE_typeAssert = 82;
    public static readonly RULE_lambda = 83;
    public static readonly RULE_fn = 84;
    public static readonly RULE_bindExpr = 85;
    public static readonly RULE_methodCallExpr = 86;
    public static readonly RULE_ternary = 87;
    public static readonly RULE_condExpr = 88;
    public static readonly RULE_newForm = 89;
    public static readonly RULE_objectExpr = 90;
    public static readonly RULE_objectField = 91;
    public static readonly RULE_methodDef = 92;
    public static readonly RULE_arrayExpr = 93;
    public static readonly RULE_propKey = 94;
    public static readonly RULE_propAccess = 95;
    public static readonly RULE_indexAccess = 96;
    public static readonly RULE_quasiquote = 97;
    public static readonly RULE_unquote = 98;
    public static readonly RULE_unquoteSplicing = 99;
    public static readonly RULE_optChain = 100;
    public static readonly RULE_nullCoalesce = 101;
    public static readonly RULE_call = 102;
    public static readonly RULE_typeArgs = 103;
    public static readonly RULE_fnSignature = 104;
    public static readonly RULE_param = 105;
    public static readonly RULE_literal = 106;

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
        "interfaceExtends", "classDef", "anonClassDef", "classExtends", 
        "classImplements", "classBody", "classElement", "modifier", "fieldDef", 
        "constructorDef", "classMethodDef", "abstractMethodDef", "getterDef", 
        "setterDef", "typedParam", "fnSignatureTyped", "statement", "letStar", 
        "letStmt", "constStar", "constStmt", "ifForm", "whileForm", "block", 
        "returnForm", "throwForm", "importForm", "exportForm", "exportBinding", 
        "exportDefault", "exportNamed", "exportNamePair", "exportFrom", 
        "exportAllFrom", "starBinding", "singleBinding", "typeExpr", "typeUnion", 
        "typeIntersection", "typeArray", "typeTuple", "typeTupleElement", 
        "typeFunction", "typeFnParam", "typeObject", "typeProp", "propModifier", 
        "typeLiteral", "typeKeyof", "typeTypeof", "typeIndexAccess", "typeConditional", 
        "typeInfer", "typeMapped", "mappedModifiers", "mappedModifier", 
        "typeTemplateLiteral", "templatePart", "typeApplication", "typeParams", 
        "typeParamDecl", "typeParamConstraint", "typeParamDefault", "assign", 
        "switchForm", "caseClause", "defaultClause", "forForm", "forInForm", 
        "forOfForm", "expression", "thisExpr", "superExpr", "superConstructorCall", 
        "superMethodCall", "typeofExpr", "typeAssert", "lambda", "fn", "bindExpr", 
        "methodCallExpr", "ternary", "condExpr", "newForm", "objectExpr", 
        "objectField", "methodDef", "arrayExpr", "propKey", "propAccess", 
        "indexAccess", "quasiquote", "unquote", "unquoteSplicing", "optChain", 
        "nullCoalesce", "call", "typeArgs", "fnSignature", "param", "literal",
    ];

    public get grammarFileName(): string { return "Stage3E.g4"; }
    public get literalNames(): (string | null)[] { return Stage3EParser.literalNames; }
    public get symbolicNames(): (string | null)[] { return Stage3EParser.symbolicNames; }
    public get ruleNames(): string[] { return Stage3EParser.ruleNames; }
    public get serializedATN(): number[] { return Stage3EParser._serializedATN; }

    protected createFailedPredicateException(predicate?: string, message?: string): antlr.FailedPredicateException {
        return new antlr.FailedPredicateException(this, predicate, message);
    }

    public constructor(input: antlr.TokenStream) {
        super(input);
        this.interpreter = new antlr.ParserATNSimulator(this, Stage3EParser._ATN, Stage3EParser.decisionsToDFA, new antlr.PredictionContextCache());
    }
    public program(): ProgramContext {
        let localContext = new ProgramContext(this.context, this.state);
        this.enterRule(localContext, 0, Stage3EParser.RULE_program);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 214;
            this.match(Stage3EParser.LPAREN);
            this.state = 215;
            this.match(Stage3EParser.PROGRAM);
            this.state = 219;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 469762051) !== 0) || ((((_la - 86)) & ~0x1F) === 0 && ((1 << (_la - 86)) & 55) !== 0)) {
                {
                {
                this.state = 216;
                this.topLevel();
                }
                }
                this.state = 221;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 222;
            this.match(Stage3EParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 2, Stage3EParser.RULE_topLevel);
        try {
            this.state = 230;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 1, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 224;
                this.defmacro();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 225;
                this.def();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 226;
                this.typeAlias();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 227;
                this.interfaceDef();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 228;
                this.classDef();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 229;
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
        this.enterRule(localContext, 4, Stage3EParser.RULE_defmacro);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 232;
            this.match(Stage3EParser.LPAREN);
            this.state = 233;
            this.match(Stage3EParser.DEFMACRO);
            this.state = 234;
            this.match(Stage3EParser.IDENTIFIER);
            this.state = 235;
            this.fnSignature();
            this.state = 239;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 469762051) !== 0) || ((((_la - 86)) & ~0x1F) === 0 && ((1 << (_la - 86)) & 55) !== 0)) {
                {
                {
                this.state = 236;
                this.statement();
                }
                }
                this.state = 241;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 242;
            this.match(Stage3EParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 6, Stage3EParser.RULE_def);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 244;
            this.match(Stage3EParser.LPAREN);
            this.state = 245;
            this.match(Stage3EParser.DEF);
            this.state = 246;
            this.match(Stage3EParser.IDENTIFIER);
            this.state = 247;
            this.expression();
            this.state = 248;
            this.match(Stage3EParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 8, Stage3EParser.RULE_typeAlias);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 250;
            this.match(Stage3EParser.LPAREN);
            this.state = 251;
            this.match(Stage3EParser.TYPE);
            this.state = 252;
            this.match(Stage3EParser.IDENTIFIER);
            this.state = 254;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 3, this.context) ) {
            case 1:
                {
                this.state = 253;
                this.typeParams();
                }
                break;
            }
            this.state = 256;
            this.typeExpr();
            this.state = 257;
            this.match(Stage3EParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 10, Stage3EParser.RULE_interfaceDef);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 259;
            this.match(Stage3EParser.LPAREN);
            this.state = 260;
            this.match(Stage3EParser.INTERFACE);
            this.state = 261;
            this.match(Stage3EParser.IDENTIFIER);
            this.state = 263;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 4, this.context) ) {
            case 1:
                {
                this.state = 262;
                this.typeParams();
                }
                break;
            }
            this.state = 266;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 5, this.context) ) {
            case 1:
                {
                this.state = 265;
                this.interfaceExtends();
                }
                break;
            }
            this.state = 268;
            this.typeObject();
            this.state = 269;
            this.match(Stage3EParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 12, Stage3EParser.RULE_interfaceExtends);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 271;
            this.match(Stage3EParser.LPAREN);
            this.state = 272;
            this.match(Stage3EParser.EXTENDS);
            this.state = 274;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 273;
                this.typeExpr();
                }
                }
                this.state = 276;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 91);
            this.state = 278;
            this.match(Stage3EParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 14, Stage3EParser.RULE_classDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 280;
            this.match(Stage3EParser.LPAREN);
            this.state = 281;
            this.match(Stage3EParser.CLASS);
            this.state = 285;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 86) {
                {
                {
                this.state = 282;
                this.modifier();
                }
                }
                this.state = 287;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 288;
            this.match(Stage3EParser.IDENTIFIER);
            this.state = 290;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 8, this.context) ) {
            case 1:
                {
                this.state = 289;
                this.typeParams();
                }
                break;
            }
            this.state = 293;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 9, this.context) ) {
            case 1:
                {
                this.state = 292;
                this.classExtends();
                }
                break;
            }
            this.state = 296;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 10, this.context) ) {
            case 1:
                {
                this.state = 295;
                this.classImplements();
                }
                break;
            }
            this.state = 298;
            this.classBody();
            this.state = 299;
            this.match(Stage3EParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 16, Stage3EParser.RULE_anonClassDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 301;
            this.match(Stage3EParser.LPAREN);
            this.state = 302;
            this.match(Stage3EParser.CLASS);
            this.state = 306;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 86) {
                {
                {
                this.state = 303;
                this.modifier();
                }
                }
                this.state = 308;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 310;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 12, this.context) ) {
            case 1:
                {
                this.state = 309;
                this.classExtends();
                }
                break;
            }
            this.state = 313;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 13, this.context) ) {
            case 1:
                {
                this.state = 312;
                this.classImplements();
                }
                break;
            }
            this.state = 315;
            this.classBody();
            this.state = 316;
            this.match(Stage3EParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 18, Stage3EParser.RULE_classExtends);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 318;
            this.match(Stage3EParser.LPAREN);
            this.state = 319;
            this.match(Stage3EParser.EXTENDS);
            this.state = 320;
            this.typeExpr();
            this.state = 321;
            this.match(Stage3EParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 20, Stage3EParser.RULE_classImplements);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 323;
            this.match(Stage3EParser.LPAREN);
            this.state = 324;
            this.match(Stage3EParser.IMPLEMENTS);
            this.state = 326;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 325;
                this.typeExpr();
                }
                }
                this.state = 328;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 91);
            this.state = 330;
            this.match(Stage3EParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 22, Stage3EParser.RULE_classBody);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 332;
            this.match(Stage3EParser.LPAREN);
            this.state = 333;
            this.match(Stage3EParser.CLASS_BODY);
            this.state = 337;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 334;
                this.classElement();
                }
                }
                this.state = 339;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 340;
            this.match(Stage3EParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 24, Stage3EParser.RULE_classElement);
        try {
            this.state = 348;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 16, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 342;
                this.fieldDef();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 343;
                this.constructorDef();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 344;
                this.classMethodDef();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 345;
                this.abstractMethodDef();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 346;
                this.getterDef();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 347;
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
        this.enterRule(localContext, 26, Stage3EParser.RULE_modifier);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 350;
            this.match(Stage3EParser.KEYWORD);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 28, Stage3EParser.RULE_fieldDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 352;
            this.match(Stage3EParser.LPAREN);
            this.state = 353;
            this.match(Stage3EParser.FIELD);
            this.state = 357;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 86) {
                {
                {
                this.state = 354;
                this.modifier();
                }
                }
                this.state = 359;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 360;
            this.match(Stage3EParser.IDENTIFIER);
            this.state = 363;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 78) {
                {
                this.state = 361;
                this.match(Stage3EParser.COLON);
                this.state = 362;
                this.typeExpr();
                }
            }

            this.state = 366;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2 || ((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 469762051) !== 0) || ((((_la - 86)) & ~0x1F) === 0 && ((1 << (_la - 86)) & 55) !== 0)) {
                {
                this.state = 365;
                this.expression();
                }
            }

            this.state = 368;
            this.match(Stage3EParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 30, Stage3EParser.RULE_constructorDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 370;
            this.match(Stage3EParser.LPAREN);
            this.state = 371;
            this.match(Stage3EParser.CONSTRUCTOR);
            this.state = 372;
            this.fnSignatureTyped();
            this.state = 376;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 469762051) !== 0) || ((((_la - 86)) & ~0x1F) === 0 && ((1 << (_la - 86)) & 55) !== 0)) {
                {
                {
                this.state = 373;
                this.statement();
                }
                }
                this.state = 378;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 379;
            this.match(Stage3EParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 32, Stage3EParser.RULE_classMethodDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 381;
            this.match(Stage3EParser.LPAREN);
            this.state = 382;
            this.match(Stage3EParser.METHOD);
            this.state = 386;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 86) {
                {
                {
                this.state = 383;
                this.modifier();
                }
                }
                this.state = 388;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 389;
            this.match(Stage3EParser.IDENTIFIER);
            this.state = 390;
            this.fnSignatureTyped();
            this.state = 394;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 469762051) !== 0) || ((((_la - 86)) & ~0x1F) === 0 && ((1 << (_la - 86)) & 55) !== 0)) {
                {
                {
                this.state = 391;
                this.statement();
                }
                }
                this.state = 396;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 397;
            this.match(Stage3EParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 34, Stage3EParser.RULE_abstractMethodDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 399;
            this.match(Stage3EParser.LPAREN);
            this.state = 400;
            this.match(Stage3EParser.ABSTRACT_METHOD);
            this.state = 404;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 86) {
                {
                {
                this.state = 401;
                this.modifier();
                }
                }
                this.state = 406;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 407;
            this.match(Stage3EParser.IDENTIFIER);
            this.state = 408;
            this.fnSignatureTyped();
            this.state = 409;
            this.match(Stage3EParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 36, Stage3EParser.RULE_getterDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 411;
            this.match(Stage3EParser.LPAREN);
            this.state = 412;
            this.match(Stage3EParser.GET);
            this.state = 416;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 86) {
                {
                {
                this.state = 413;
                this.modifier();
                }
                }
                this.state = 418;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 419;
            this.match(Stage3EParser.IDENTIFIER);
            this.state = 420;
            this.fnSignatureTyped();
            this.state = 424;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 469762051) !== 0) || ((((_la - 86)) & ~0x1F) === 0 && ((1 << (_la - 86)) & 55) !== 0)) {
                {
                {
                this.state = 421;
                this.statement();
                }
                }
                this.state = 426;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 427;
            this.match(Stage3EParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 38, Stage3EParser.RULE_setterDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 429;
            this.match(Stage3EParser.LPAREN);
            this.state = 430;
            this.match(Stage3EParser.SETPROP);
            this.state = 434;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 86) {
                {
                {
                this.state = 431;
                this.modifier();
                }
                }
                this.state = 436;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 437;
            this.match(Stage3EParser.IDENTIFIER);
            this.state = 438;
            this.fnSignatureTyped();
            this.state = 442;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 469762051) !== 0) || ((((_la - 86)) & ~0x1F) === 0 && ((1 << (_la - 86)) & 55) !== 0)) {
                {
                {
                this.state = 439;
                this.statement();
                }
                }
                this.state = 444;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 445;
            this.match(Stage3EParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 40, Stage3EParser.RULE_typedParam);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 447;
            this.match(Stage3EParser.LPAREN);
            this.state = 448;
            this.match(Stage3EParser.IDENTIFIER);
            this.state = 450;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 74) {
                {
                this.state = 449;
                this.match(Stage3EParser.OPTIONAL);
                }
            }

            this.state = 454;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 78) {
                {
                this.state = 452;
                this.match(Stage3EParser.COLON);
                this.state = 453;
                this.typeExpr();
                }
            }

            this.state = 456;
            this.match(Stage3EParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 42, Stage3EParser.RULE_fnSignatureTyped);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 458;
            this.match(Stage3EParser.LPAREN);
            this.state = 469;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2) {
                {
                this.state = 459;
                this.typedParam();
                this.state = 466;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 2 || _la === 4) {
                    {
                    {
                    this.state = 461;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    if (_la === 4) {
                        {
                        this.state = 460;
                        this.match(Stage3EParser.COMMA);
                        }
                    }

                    this.state = 463;
                    this.typedParam();
                    }
                    }
                    this.state = 468;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
            }

            this.state = 471;
            this.match(Stage3EParser.RPAREN);
            this.state = 477;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 33, this.context) ) {
            case 1:
                {
                this.state = 472;
                this.match(Stage3EParser.LPAREN);
                this.state = 473;
                this.match(Stage3EParser.RETURNS);
                this.state = 474;
                this.typeExpr();
                this.state = 475;
                this.match(Stage3EParser.RPAREN);
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
        this.enterRule(localContext, 44, Stage3EParser.RULE_statement);
        try {
            this.state = 496;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 34, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 479;
                this.letStar();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 480;
                this.letStmt();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 481;
                this.constStar();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 482;
                this.constStmt();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 483;
                this.ifForm();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 484;
                this.whileForm();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 485;
                this.block();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 486;
                this.returnForm();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 487;
                this.throwForm();
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 488;
                this.importForm();
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 489;
                this.exportForm();
                }
                break;
            case 12:
                this.enterOuterAlt(localContext, 12);
                {
                this.state = 490;
                this.switchForm();
                }
                break;
            case 13:
                this.enterOuterAlt(localContext, 13);
                {
                this.state = 491;
                this.forForm();
                }
                break;
            case 14:
                this.enterOuterAlt(localContext, 14);
                {
                this.state = 492;
                this.forInForm();
                }
                break;
            case 15:
                this.enterOuterAlt(localContext, 15);
                {
                this.state = 493;
                this.forOfForm();
                }
                break;
            case 16:
                this.enterOuterAlt(localContext, 16);
                {
                this.state = 494;
                this.assign();
                }
                break;
            case 17:
                this.enterOuterAlt(localContext, 17);
                {
                this.state = 495;
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
        this.enterRule(localContext, 46, Stage3EParser.RULE_letStar);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 498;
            this.match(Stage3EParser.LPAREN);
            this.state = 499;
            this.match(Stage3EParser.LETSTAR);
            this.state = 500;
            this.match(Stage3EParser.LPAREN);
            this.state = 504;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 501;
                this.starBinding();
                }
                }
                this.state = 506;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 507;
            this.match(Stage3EParser.RPAREN);
            this.state = 511;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 469762051) !== 0) || ((((_la - 86)) & ~0x1F) === 0 && ((1 << (_la - 86)) & 55) !== 0)) {
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
            this.match(Stage3EParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 48, Stage3EParser.RULE_letStmt);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 516;
            this.match(Stage3EParser.LPAREN);
            this.state = 517;
            this.match(Stage3EParser.LET);
            this.state = 518;
            this.singleBinding();
            this.state = 519;
            this.expression();
            this.state = 520;
            this.match(Stage3EParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 50, Stage3EParser.RULE_constStar);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 522;
            this.match(Stage3EParser.LPAREN);
            this.state = 523;
            this.match(Stage3EParser.CONSTSTAR);
            this.state = 524;
            this.match(Stage3EParser.LPAREN);
            this.state = 528;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 525;
                this.starBinding();
                }
                }
                this.state = 530;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 531;
            this.match(Stage3EParser.RPAREN);
            this.state = 535;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 469762051) !== 0) || ((((_la - 86)) & ~0x1F) === 0 && ((1 << (_la - 86)) & 55) !== 0)) {
                {
                {
                this.state = 532;
                this.statement();
                }
                }
                this.state = 537;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 538;
            this.match(Stage3EParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 52, Stage3EParser.RULE_constStmt);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 540;
            this.match(Stage3EParser.LPAREN);
            this.state = 541;
            this.match(Stage3EParser.CONST);
            this.state = 542;
            this.singleBinding();
            this.state = 543;
            this.expression();
            this.state = 544;
            this.match(Stage3EParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 54, Stage3EParser.RULE_ifForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 546;
            this.match(Stage3EParser.LPAREN);
            this.state = 547;
            this.match(Stage3EParser.IF);
            this.state = 548;
            this.expression();
            this.state = 549;
            this.statement();
            this.state = 551;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2 || ((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 469762051) !== 0) || ((((_la - 86)) & ~0x1F) === 0 && ((1 << (_la - 86)) & 55) !== 0)) {
                {
                this.state = 550;
                this.statement();
                }
            }

            this.state = 553;
            this.match(Stage3EParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 56, Stage3EParser.RULE_whileForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 555;
            this.match(Stage3EParser.LPAREN);
            this.state = 556;
            this.match(Stage3EParser.WHILE);
            this.state = 557;
            this.expression();
            this.state = 561;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 469762051) !== 0) || ((((_la - 86)) & ~0x1F) === 0 && ((1 << (_la - 86)) & 55) !== 0)) {
                {
                {
                this.state = 558;
                this.statement();
                }
                }
                this.state = 563;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 564;
            this.match(Stage3EParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 58, Stage3EParser.RULE_block);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 566;
            this.match(Stage3EParser.LPAREN);
            this.state = 567;
            this.match(Stage3EParser.BEGIN);
            this.state = 571;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 469762051) !== 0) || ((((_la - 86)) & ~0x1F) === 0 && ((1 << (_la - 86)) & 55) !== 0)) {
                {
                {
                this.state = 568;
                this.statement();
                }
                }
                this.state = 573;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 574;
            this.match(Stage3EParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 60, Stage3EParser.RULE_returnForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 576;
            this.match(Stage3EParser.LPAREN);
            this.state = 577;
            this.match(Stage3EParser.RETURN);
            this.state = 579;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2 || ((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 469762051) !== 0) || ((((_la - 86)) & ~0x1F) === 0 && ((1 << (_la - 86)) & 55) !== 0)) {
                {
                this.state = 578;
                this.expression();
                }
            }

            this.state = 581;
            this.match(Stage3EParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 62, Stage3EParser.RULE_throwForm);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 583;
            this.match(Stage3EParser.LPAREN);
            this.state = 584;
            this.match(Stage3EParser.THROW);
            this.state = 585;
            this.expression();
            this.state = 586;
            this.match(Stage3EParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 64, Stage3EParser.RULE_importForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 588;
            this.match(Stage3EParser.LPAREN);
            this.state = 589;
            this.match(Stage3EParser.IMPORT);
            this.state = 591;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2) {
                {
                this.state = 590;
                this.objectExpr();
                }
            }

            this.state = 593;
            this.match(Stage3EParser.STRING);
            this.state = 594;
            this.match(Stage3EParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 66, Stage3EParser.RULE_exportForm);
        try {
            this.state = 601;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 44, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 596;
                this.exportBinding();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 597;
                this.exportDefault();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 598;
                this.exportNamed();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 599;
                this.exportFrom();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 600;
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
        this.enterRule(localContext, 68, Stage3EParser.RULE_exportBinding);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 603;
            this.match(Stage3EParser.LPAREN);
            this.state = 604;
            this.match(Stage3EParser.EXPORT);
            this.state = 605;
            this.match(Stage3EParser.IDENTIFIER);
            this.state = 606;
            this.expression();
            this.state = 607;
            this.match(Stage3EParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 70, Stage3EParser.RULE_exportDefault);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 609;
            this.match(Stage3EParser.LPAREN);
            this.state = 610;
            this.match(Stage3EParser.EXPORT_DEFAULT);
            this.state = 611;
            this.expression();
            this.state = 612;
            this.match(Stage3EParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 72, Stage3EParser.RULE_exportNamed);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 614;
            this.match(Stage3EParser.LPAREN);
            this.state = 615;
            this.match(Stage3EParser.EXPORT_NAMED);
            this.state = 617;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 616;
                this.exportNamePair();
                }
                }
                this.state = 619;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2);
            this.state = 621;
            this.match(Stage3EParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 74, Stage3EParser.RULE_exportNamePair);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 623;
            this.match(Stage3EParser.LPAREN);
            this.state = 624;
            this.match(Stage3EParser.IDENTIFIER);
            this.state = 626;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 91) {
                {
                this.state = 625;
                this.match(Stage3EParser.IDENTIFIER);
                }
            }

            this.state = 628;
            this.match(Stage3EParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 76, Stage3EParser.RULE_exportFrom);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 630;
            this.match(Stage3EParser.LPAREN);
            this.state = 631;
            this.match(Stage3EParser.EXPORT_FROM);
            this.state = 632;
            this.match(Stage3EParser.STRING);
            this.state = 634;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 633;
                this.exportNamePair();
                }
                }
                this.state = 636;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2);
            this.state = 638;
            this.match(Stage3EParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 78, Stage3EParser.RULE_exportAllFrom);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 640;
            this.match(Stage3EParser.LPAREN);
            this.state = 641;
            this.match(Stage3EParser.EXPORT_ALL_FROM);
            this.state = 642;
            this.match(Stage3EParser.STRING);
            this.state = 643;
            this.match(Stage3EParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 80, Stage3EParser.RULE_starBinding);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 645;
            this.match(Stage3EParser.LPAREN);
            this.state = 646;
            this.match(Stage3EParser.IDENTIFIER);
            this.state = 649;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 78) {
                {
                this.state = 647;
                this.match(Stage3EParser.COLON);
                this.state = 648;
                this.typeExpr();
                }
            }

            this.state = 651;
            this.expression();
            this.state = 652;
            this.match(Stage3EParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 82, Stage3EParser.RULE_singleBinding);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 654;
            this.match(Stage3EParser.LPAREN);
            this.state = 655;
            this.match(Stage3EParser.IDENTIFIER);
            this.state = 658;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 78) {
                {
                this.state = 656;
                this.match(Stage3EParser.COLON);
                this.state = 657;
                this.typeExpr();
                }
            }

            this.state = 660;
            this.match(Stage3EParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 84, Stage3EParser.RULE_typeExpr);
        try {
            this.state = 678;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 50, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 662;
                this.match(Stage3EParser.IDENTIFIER);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 663;
                this.typeUnion();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 664;
                this.typeIntersection();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 665;
                this.typeArray();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 666;
                this.typeTuple();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 667;
                this.typeFunction();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 668;
                this.typeObject();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 669;
                this.typeLiteral();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 670;
                this.typeKeyof();
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 671;
                this.typeTypeof();
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 672;
                this.typeIndexAccess();
                }
                break;
            case 12:
                this.enterOuterAlt(localContext, 12);
                {
                this.state = 673;
                this.typeConditional();
                }
                break;
            case 13:
                this.enterOuterAlt(localContext, 13);
                {
                this.state = 674;
                this.typeInfer();
                }
                break;
            case 14:
                this.enterOuterAlt(localContext, 14);
                {
                this.state = 675;
                this.typeMapped();
                }
                break;
            case 15:
                this.enterOuterAlt(localContext, 15);
                {
                this.state = 676;
                this.typeTemplateLiteral();
                }
                break;
            case 16:
                this.enterOuterAlt(localContext, 16);
                {
                this.state = 677;
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
        this.enterRule(localContext, 86, Stage3EParser.RULE_typeUnion);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 680;
            this.match(Stage3EParser.LPAREN);
            this.state = 681;
            this.match(Stage3EParser.UNION);
            this.state = 682;
            this.typeExpr();
            this.state = 684;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 683;
                this.typeExpr();
                }
                }
                this.state = 686;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 91);
            this.state = 688;
            this.match(Stage3EParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 88, Stage3EParser.RULE_typeIntersection);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 690;
            this.match(Stage3EParser.LPAREN);
            this.state = 691;
            this.match(Stage3EParser.INTERSECT);
            this.state = 692;
            this.typeExpr();
            this.state = 694;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 693;
                this.typeExpr();
                }
                }
                this.state = 696;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 91);
            this.state = 698;
            this.match(Stage3EParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 90, Stage3EParser.RULE_typeArray);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 700;
            this.match(Stage3EParser.LPAREN);
            this.state = 701;
            this.match(Stage3EParser.ARRAY);
            this.state = 702;
            this.typeExpr();
            this.state = 703;
            this.match(Stage3EParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 92, Stage3EParser.RULE_typeTuple);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 705;
            this.match(Stage3EParser.LPAREN);
            this.state = 706;
            this.match(Stage3EParser.TUPLE);
            this.state = 708;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 707;
                this.typeTupleElement();
                }
                }
                this.state = 710;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 91);
            this.state = 712;
            this.match(Stage3EParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 94, Stage3EParser.RULE_typeTupleElement);
        try {
            this.state = 725;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 54, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 714;
                this.match(Stage3EParser.LPAREN);
                this.state = 715;
                this.match(Stage3EParser.REST);
                this.state = 716;
                this.typeExpr();
                this.state = 717;
                this.match(Stage3EParser.RPAREN);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 719;
                this.match(Stage3EParser.LPAREN);
                this.state = 720;
                this.match(Stage3EParser.IDENTIFIER);
                this.state = 721;
                this.typeExpr();
                this.state = 722;
                this.match(Stage3EParser.RPAREN);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 724;
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
        this.enterRule(localContext, 96, Stage3EParser.RULE_typeFunction);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 727;
            this.match(Stage3EParser.LPAREN);
            this.state = 728;
            this.match(Stage3EParser.TYPEFN);
            this.state = 730;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 55, this.context) ) {
            case 1:
                {
                this.state = 729;
                this.typeParams();
                }
                break;
            }
            this.state = 732;
            this.match(Stage3EParser.LPAREN);
            this.state = 736;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 733;
                this.typeFnParam();
                }
                }
                this.state = 738;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 739;
            this.match(Stage3EParser.RPAREN);
            this.state = 740;
            this.typeExpr();
            this.state = 741;
            this.match(Stage3EParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 98, Stage3EParser.RULE_typeFnParam);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 743;
            this.match(Stage3EParser.LPAREN);
            this.state = 744;
            this.match(Stage3EParser.IDENTIFIER);
            this.state = 746;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 74) {
                {
                this.state = 745;
                this.match(Stage3EParser.OPTIONAL);
                }
            }

            this.state = 748;
            this.typeExpr();
            this.state = 749;
            this.match(Stage3EParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 100, Stage3EParser.RULE_typeObject);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 751;
            this.match(Stage3EParser.LPAREN);
            this.state = 752;
            this.match(Stage3EParser.IDENTIFIER);
            this.state = 756;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 753;
                this.typeProp();
                }
                }
                this.state = 758;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 759;
            this.match(Stage3EParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 102, Stage3EParser.RULE_typeProp);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 761;
            this.match(Stage3EParser.LPAREN);
            this.state = 765;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 66) {
                {
                {
                this.state = 762;
                this.propModifier();
                }
                }
                this.state = 767;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 768;
            this.match(Stage3EParser.IDENTIFIER);
            this.state = 770;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 74) {
                {
                this.state = 769;
                this.match(Stage3EParser.OPTIONAL);
                }
            }

            this.state = 772;
            this.typeExpr();
            this.state = 773;
            this.match(Stage3EParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 104, Stage3EParser.RULE_propModifier);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 775;
            this.match(Stage3EParser.READONLY);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 106, Stage3EParser.RULE_typeLiteral);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 777;
            this.match(Stage3EParser.LPAREN);
            this.state = 778;
            this.match(Stage3EParser.LIT);
            this.state = 779;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 75)) & ~0x1F) === 0 && ((1 << (_la - 75)) & 45057) !== 0))) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 780;
            this.match(Stage3EParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 108, Stage3EParser.RULE_typeKeyof);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 782;
            this.match(Stage3EParser.LPAREN);
            this.state = 783;
            this.match(Stage3EParser.KEYOF);
            this.state = 784;
            this.typeExpr();
            this.state = 785;
            this.match(Stage3EParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 110, Stage3EParser.RULE_typeTypeof);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 787;
            this.match(Stage3EParser.LPAREN);
            this.state = 788;
            this.match(Stage3EParser.TYPEOF);
            this.state = 789;
            this.match(Stage3EParser.IDENTIFIER);
            this.state = 790;
            this.match(Stage3EParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 112, Stage3EParser.RULE_typeIndexAccess);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 792;
            this.match(Stage3EParser.LPAREN);
            this.state = 793;
            this.match(Stage3EParser.INDEX);
            this.state = 794;
            this.typeExpr();
            this.state = 795;
            this.typeExpr();
            this.state = 796;
            this.match(Stage3EParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 114, Stage3EParser.RULE_typeConditional);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 798;
            this.match(Stage3EParser.LPAREN);
            this.state = 799;
            this.match(Stage3EParser.COND);
            this.state = 800;
            this.typeExpr();
            this.state = 801;
            this.typeExpr();
            this.state = 802;
            this.typeExpr();
            this.state = 803;
            this.typeExpr();
            this.state = 804;
            this.match(Stage3EParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 116, Stage3EParser.RULE_typeInfer);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 806;
            this.match(Stage3EParser.LPAREN);
            this.state = 807;
            this.match(Stage3EParser.INFER);
            this.state = 808;
            this.match(Stage3EParser.IDENTIFIER);
            this.state = 809;
            this.match(Stage3EParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 118, Stage3EParser.RULE_typeMapped);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 811;
            this.match(Stage3EParser.LPAREN);
            this.state = 812;
            this.match(Stage3EParser.MAPPED);
            this.state = 813;
            this.match(Stage3EParser.IDENTIFIER);
            this.state = 814;
            this.typeExpr();
            this.state = 816;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 61, this.context) ) {
            case 1:
                {
                this.state = 815;
                this.mappedModifiers();
                }
                break;
            }
            this.state = 818;
            this.typeExpr();
            this.state = 819;
            this.match(Stage3EParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 120, Stage3EParser.RULE_mappedModifiers);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 821;
            this.match(Stage3EParser.LPAREN);
            this.state = 822;
            this.match(Stage3EParser.MODIFIERS);
            this.state = 824;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 823;
                this.mappedModifier();
                }
                }
                this.state = 826;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 66 || _la === 74);
            this.state = 828;
            this.match(Stage3EParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 122, Stage3EParser.RULE_mappedModifier);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 830;
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
        this.enterRule(localContext, 124, Stage3EParser.RULE_typeTemplateLiteral);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 832;
            this.match(Stage3EParser.LPAREN);
            this.state = 833;
            this.match(Stage3EParser.TEMPLATE);
            this.state = 835;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 834;
                this.templatePart();
                }
                }
                this.state = 837;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 88 || _la === 91);
            this.state = 839;
            this.match(Stage3EParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 126, Stage3EParser.RULE_templatePart);
        try {
            this.state = 843;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case Stage3EParser.STRING:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 841;
                this.match(Stage3EParser.STRING);
                }
                break;
            case Stage3EParser.LPAREN:
            case Stage3EParser.IDENTIFIER:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 842;
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
        this.enterRule(localContext, 128, Stage3EParser.RULE_typeApplication);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 845;
            this.match(Stage3EParser.LPAREN);
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
            } while (_la === 2 || _la === 91);
            this.state = 852;
            this.match(Stage3EParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 130, Stage3EParser.RULE_typeParams);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 854;
            this.match(Stage3EParser.LPAREN);
            this.state = 855;
            this.match(Stage3EParser.TYPE_PARAMS);
            this.state = 857;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 856;
                this.typeParamDecl();
                }
                }
                this.state = 859;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 91);
            this.state = 861;
            this.match(Stage3EParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 132, Stage3EParser.RULE_typeParamDecl);
        let _la: number;
        try {
            this.state = 873;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case Stage3EParser.IDENTIFIER:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 863;
                this.match(Stage3EParser.IDENTIFIER);
                }
                break;
            case Stage3EParser.LPAREN:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 864;
                this.match(Stage3EParser.LPAREN);
                this.state = 865;
                this.match(Stage3EParser.IDENTIFIER);
                this.state = 867;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 67, this.context) ) {
                case 1:
                    {
                    this.state = 866;
                    this.typeParamConstraint();
                    }
                    break;
                }
                this.state = 870;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 2) {
                    {
                    this.state = 869;
                    this.typeParamDefault();
                    }
                }

                this.state = 872;
                this.match(Stage3EParser.RPAREN);
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
        this.enterRule(localContext, 134, Stage3EParser.RULE_typeParamConstraint);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 875;
            this.match(Stage3EParser.LPAREN);
            this.state = 876;
            this.match(Stage3EParser.EXTENDS);
            this.state = 877;
            this.typeExpr();
            this.state = 878;
            this.match(Stage3EParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 136, Stage3EParser.RULE_typeParamDefault);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 880;
            this.match(Stage3EParser.LPAREN);
            this.state = 881;
            this.match(Stage3EParser.DEFAULT);
            this.state = 882;
            this.typeExpr();
            this.state = 883;
            this.match(Stage3EParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 138, Stage3EParser.RULE_assign);
        try {
            this.state = 897;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 70, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 885;
                this.match(Stage3EParser.LPAREN);
                this.state = 886;
                this.match(Stage3EParser.SET);
                this.state = 887;
                this.match(Stage3EParser.IDENTIFIER);
                this.state = 888;
                this.expression();
                this.state = 889;
                this.match(Stage3EParser.RPAREN);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 891;
                this.match(Stage3EParser.LPAREN);
                this.state = 892;
                this.match(Stage3EParser.SET);
                this.state = 893;
                this.propAccess();
                this.state = 894;
                this.expression();
                this.state = 895;
                this.match(Stage3EParser.RPAREN);
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
        this.enterRule(localContext, 140, Stage3EParser.RULE_switchForm);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 899;
            this.match(Stage3EParser.LPAREN);
            this.state = 900;
            this.match(Stage3EParser.SWITCH);
            this.state = 901;
            this.expression();
            this.state = 905;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 71, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 902;
                    this.caseClause();
                    }
                    }
                }
                this.state = 907;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 71, this.context);
            }
            this.state = 909;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2) {
                {
                this.state = 908;
                this.defaultClause();
                }
            }

            this.state = 911;
            this.match(Stage3EParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 142, Stage3EParser.RULE_caseClause);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 913;
            this.match(Stage3EParser.LPAREN);
            this.state = 914;
            this.match(Stage3EParser.CASE);
            this.state = 915;
            this.expression();
            this.state = 919;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 469762051) !== 0) || ((((_la - 86)) & ~0x1F) === 0 && ((1 << (_la - 86)) & 55) !== 0)) {
                {
                {
                this.state = 916;
                this.statement();
                }
                }
                this.state = 921;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 922;
            this.match(Stage3EParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 144, Stage3EParser.RULE_defaultClause);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 924;
            this.match(Stage3EParser.LPAREN);
            this.state = 925;
            this.match(Stage3EParser.DEFAULT);
            this.state = 929;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 469762051) !== 0) || ((((_la - 86)) & ~0x1F) === 0 && ((1 << (_la - 86)) & 55) !== 0)) {
                {
                {
                this.state = 926;
                this.statement();
                }
                }
                this.state = 931;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 932;
            this.match(Stage3EParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 146, Stage3EParser.RULE_forForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 934;
            this.match(Stage3EParser.LPAREN);
            this.state = 935;
            this.match(Stage3EParser.FOR);
            this.state = 936;
            this.letStmt();
            this.state = 937;
            this.expression();
            this.state = 938;
            this.assign();
            this.state = 942;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 469762051) !== 0) || ((((_la - 86)) & ~0x1F) === 0 && ((1 << (_la - 86)) & 55) !== 0)) {
                {
                {
                this.state = 939;
                this.statement();
                }
                }
                this.state = 944;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 945;
            this.match(Stage3EParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 148, Stage3EParser.RULE_forInForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 947;
            this.match(Stage3EParser.LPAREN);
            this.state = 948;
            this.match(Stage3EParser.FORIN);
            this.state = 949;
            this.match(Stage3EParser.IDENTIFIER);
            this.state = 950;
            this.expression();
            this.state = 954;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 469762051) !== 0) || ((((_la - 86)) & ~0x1F) === 0 && ((1 << (_la - 86)) & 55) !== 0)) {
                {
                {
                this.state = 951;
                this.statement();
                }
                }
                this.state = 956;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 957;
            this.match(Stage3EParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 150, Stage3EParser.RULE_forOfForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 959;
            this.match(Stage3EParser.LPAREN);
            this.state = 960;
            this.match(Stage3EParser.FOROF);
            this.state = 961;
            this.match(Stage3EParser.IDENTIFIER);
            this.state = 962;
            this.expression();
            this.state = 966;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 469762051) !== 0) || ((((_la - 86)) & ~0x1F) === 0 && ((1 << (_la - 86)) & 55) !== 0)) {
                {
                {
                this.state = 963;
                this.statement();
                }
                }
                this.state = 968;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 969;
            this.match(Stage3EParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 152, Stage3EParser.RULE_expression);
        try {
            this.state = 997;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 78, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 971;
                this.literal();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 972;
                this.match(Stage3EParser.KEYWORD);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 973;
                this.match(Stage3EParser.IDENTIFIER);
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 974;
                this.lambda();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 975;
                this.fn();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 976;
                this.bindExpr();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 977;
                this.methodCallExpr();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 978;
                this.objectExpr();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 979;
                this.arrayExpr();
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 980;
                this.propAccess();
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 981;
                this.indexAccess();
                }
                break;
            case 12:
                this.enterOuterAlt(localContext, 12);
                {
                this.state = 982;
                this.quasiquote();
                }
                break;
            case 13:
                this.enterOuterAlt(localContext, 13);
                {
                this.state = 983;
                this.unquote();
                }
                break;
            case 14:
                this.enterOuterAlt(localContext, 14);
                {
                this.state = 984;
                this.unquoteSplicing();
                }
                break;
            case 15:
                this.enterOuterAlt(localContext, 15);
                {
                this.state = 985;
                this.ternary();
                }
                break;
            case 16:
                this.enterOuterAlt(localContext, 16);
                {
                this.state = 986;
                this.condExpr();
                }
                break;
            case 17:
                this.enterOuterAlt(localContext, 17);
                {
                this.state = 987;
                this.newForm();
                }
                break;
            case 18:
                this.enterOuterAlt(localContext, 18);
                {
                this.state = 988;
                this.optChain();
                }
                break;
            case 19:
                this.enterOuterAlt(localContext, 19);
                {
                this.state = 989;
                this.nullCoalesce();
                }
                break;
            case 20:
                this.enterOuterAlt(localContext, 20);
                {
                this.state = 990;
                this.typeofExpr();
                }
                break;
            case 21:
                this.enterOuterAlt(localContext, 21);
                {
                this.state = 991;
                this.typeAssert();
                }
                break;
            case 22:
                this.enterOuterAlt(localContext, 22);
                {
                this.state = 992;
                this.thisExpr();
                }
                break;
            case 23:
                this.enterOuterAlt(localContext, 23);
                {
                this.state = 993;
                this.superExpr();
                }
                break;
            case 24:
                this.enterOuterAlt(localContext, 24);
                {
                this.state = 994;
                this.superConstructorCall();
                }
                break;
            case 25:
                this.enterOuterAlt(localContext, 25);
                {
                this.state = 995;
                this.superMethodCall();
                }
                break;
            case 26:
                this.enterOuterAlt(localContext, 26);
                {
                this.state = 996;
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
        this.enterRule(localContext, 154, Stage3EParser.RULE_thisExpr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 999;
            this.match(Stage3EParser.THIS);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 156, Stage3EParser.RULE_superExpr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1001;
            this.match(Stage3EParser.SUPER);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 158, Stage3EParser.RULE_superConstructorCall);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1003;
            this.match(Stage3EParser.LPAREN);
            this.state = 1004;
            this.match(Stage3EParser.SUPER);
            this.state = 1008;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 469762051) !== 0) || ((((_la - 86)) & ~0x1F) === 0 && ((1 << (_la - 86)) & 55) !== 0)) {
                {
                {
                this.state = 1005;
                this.expression();
                }
                }
                this.state = 1010;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1011;
            this.match(Stage3EParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 160, Stage3EParser.RULE_superMethodCall);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1013;
            this.match(Stage3EParser.LPAREN);
            this.state = 1014;
            this.match(Stage3EParser.SUPER_METHOD);
            this.state = 1015;
            this.match(Stage3EParser.IDENTIFIER);
            this.state = 1019;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 469762051) !== 0) || ((((_la - 86)) & ~0x1F) === 0 && ((1 << (_la - 86)) & 55) !== 0)) {
                {
                {
                this.state = 1016;
                this.expression();
                }
                }
                this.state = 1021;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1022;
            this.match(Stage3EParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 162, Stage3EParser.RULE_typeofExpr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1024;
            this.match(Stage3EParser.LPAREN);
            this.state = 1025;
            this.match(Stage3EParser.TYPEOF);
            this.state = 1026;
            this.expression();
            this.state = 1027;
            this.match(Stage3EParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 164, Stage3EParser.RULE_typeAssert);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1029;
            this.match(Stage3EParser.LPAREN);
            this.state = 1030;
            this.match(Stage3EParser.TYPE_AS);
            this.state = 1031;
            this.expression();
            this.state = 1032;
            this.typeExpr();
            this.state = 1033;
            this.match(Stage3EParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 166, Stage3EParser.RULE_lambda);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1035;
            this.match(Stage3EParser.LPAREN);
            this.state = 1036;
            this.match(Stage3EParser.LAMBDA);
            this.state = 1037;
            this.fnSignature();
            this.state = 1041;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 469762051) !== 0) || ((((_la - 86)) & ~0x1F) === 0 && ((1 << (_la - 86)) & 55) !== 0)) {
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
            this.match(Stage3EParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 168, Stage3EParser.RULE_fn);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1046;
            this.match(Stage3EParser.LPAREN);
            this.state = 1047;
            this.match(Stage3EParser.FN);
            this.state = 1048;
            this.fnSignature();
            this.state = 1052;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 469762051) !== 0) || ((((_la - 86)) & ~0x1F) === 0 && ((1 << (_la - 86)) & 55) !== 0)) {
                {
                {
                this.state = 1049;
                this.statement();
                }
                }
                this.state = 1054;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1055;
            this.match(Stage3EParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 170, Stage3EParser.RULE_bindExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1057;
            this.match(Stage3EParser.LPAREN);
            this.state = 1058;
            this.match(Stage3EParser.BIND);
            this.state = 1059;
            this.expression();
            this.state = 1060;
            this.expression();
            this.state = 1064;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 469762051) !== 0) || ((((_la - 86)) & ~0x1F) === 0 && ((1 << (_la - 86)) & 55) !== 0)) {
                {
                {
                this.state = 1061;
                this.expression();
                }
                }
                this.state = 1066;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1067;
            this.match(Stage3EParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 172, Stage3EParser.RULE_methodCallExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1069;
            this.match(Stage3EParser.LPAREN);
            this.state = 1070;
            this.match(Stage3EParser.METHOD_CALL);
            this.state = 1071;
            this.expression();
            this.state = 1072;
            this.expression();
            this.state = 1076;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 469762051) !== 0) || ((((_la - 86)) & ~0x1F) === 0 && ((1 << (_la - 86)) & 55) !== 0)) {
                {
                {
                this.state = 1073;
                this.expression();
                }
                }
                this.state = 1078;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1079;
            this.match(Stage3EParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 174, Stage3EParser.RULE_ternary);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1081;
            this.match(Stage3EParser.LPAREN);
            this.state = 1082;
            this.match(Stage3EParser.TERNARY);
            this.state = 1083;
            this.expression();
            this.state = 1084;
            this.expression();
            this.state = 1085;
            this.expression();
            this.state = 1086;
            this.match(Stage3EParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 176, Stage3EParser.RULE_condExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1088;
            this.match(Stage3EParser.LPAREN);
            this.state = 1089;
            this.match(Stage3EParser.COND);
            this.state = 1093;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 1090;
                this.expression();
                this.state = 1091;
                this.expression();
                }
                }
                this.state = 1095;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || ((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 469762051) !== 0) || ((((_la - 86)) & ~0x1F) === 0 && ((1 << (_la - 86)) & 55) !== 0));
            this.state = 1097;
            this.match(Stage3EParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 178, Stage3EParser.RULE_newForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1099;
            this.match(Stage3EParser.LPAREN);
            this.state = 1100;
            this.match(Stage3EParser.NEW);
            this.state = 1101;
            this.match(Stage3EParser.IDENTIFIER);
            this.state = 1103;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 86, this.context) ) {
            case 1:
                {
                this.state = 1102;
                this.typeArgs();
                }
                break;
            }
            this.state = 1108;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 469762051) !== 0) || ((((_la - 86)) & ~0x1F) === 0 && ((1 << (_la - 86)) & 55) !== 0)) {
                {
                {
                this.state = 1105;
                this.expression();
                }
                }
                this.state = 1110;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1111;
            this.match(Stage3EParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 180, Stage3EParser.RULE_objectExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1113;
            this.match(Stage3EParser.LPAREN);
            this.state = 1114;
            this.match(Stage3EParser.OBJECT);
            this.state = 1118;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 1115;
                this.objectField();
                }
                }
                this.state = 1120;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1121;
            this.match(Stage3EParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 182, Stage3EParser.RULE_objectField);
        try {
            this.state = 1136;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 89, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1123;
                this.match(Stage3EParser.LPAREN);
                this.state = 1124;
                this.propKey();
                this.state = 1125;
                this.expression();
                this.state = 1126;
                this.match(Stage3EParser.RPAREN);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1128;
                this.match(Stage3EParser.LPAREN);
                this.state = 1129;
                this.propKey();
                this.state = 1130;
                this.methodDef();
                this.state = 1131;
                this.match(Stage3EParser.RPAREN);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 1133;
                this.match(Stage3EParser.LPAREN);
                this.state = 1134;
                this.match(Stage3EParser.IDENTIFIER);
                this.state = 1135;
                this.match(Stage3EParser.RPAREN);
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
        this.enterRule(localContext, 184, Stage3EParser.RULE_methodDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1138;
            this.match(Stage3EParser.LPAREN);
            this.state = 1139;
            this.match(Stage3EParser.METHOD);
            this.state = 1140;
            this.fnSignature();
            this.state = 1144;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 469762051) !== 0) || ((((_la - 86)) & ~0x1F) === 0 && ((1 << (_la - 86)) & 55) !== 0)) {
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
            this.match(Stage3EParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 186, Stage3EParser.RULE_arrayExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1149;
            this.match(Stage3EParser.LPAREN);
            this.state = 1150;
            this.match(Stage3EParser.ARRAY);
            this.state = 1154;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 469762051) !== 0) || ((((_la - 86)) & ~0x1F) === 0 && ((1 << (_la - 86)) & 55) !== 0)) {
                {
                {
                this.state = 1151;
                this.expression();
                }
                }
                this.state = 1156;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1157;
            this.match(Stage3EParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 188, Stage3EParser.RULE_propKey);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1159;
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
        this.enterRule(localContext, 190, Stage3EParser.RULE_propAccess);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1161;
            this.match(Stage3EParser.LPAREN);
            this.state = 1162;
            this.match(Stage3EParser.DOT);
            this.state = 1163;
            this.expression();
            this.state = 1164;
            this.propKey();
            this.state = 1165;
            this.match(Stage3EParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 192, Stage3EParser.RULE_indexAccess);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1167;
            this.match(Stage3EParser.LPAREN);
            this.state = 1168;
            this.match(Stage3EParser.INDEX);
            this.state = 1169;
            this.expression();
            this.state = 1170;
            this.expression();
            this.state = 1171;
            this.match(Stage3EParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 194, Stage3EParser.RULE_quasiquote);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1173;
            this.match(Stage3EParser.LPAREN);
            this.state = 1174;
            _la = this.tokenStream.LA(1);
            if(!(_la === 31 || _la === 32)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 1175;
            this.expression();
            this.state = 1176;
            this.match(Stage3EParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 196, Stage3EParser.RULE_unquote);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1178;
            this.match(Stage3EParser.LPAREN);
            this.state = 1179;
            this.match(Stage3EParser.UNQUOTE);
            this.state = 1180;
            this.expression();
            this.state = 1181;
            this.match(Stage3EParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 198, Stage3EParser.RULE_unquoteSplicing);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1183;
            this.match(Stage3EParser.LPAREN);
            this.state = 1184;
            this.match(Stage3EParser.UNQUOTE_SPLICING);
            this.state = 1185;
            this.expression();
            this.state = 1186;
            this.match(Stage3EParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 200, Stage3EParser.RULE_optChain);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1188;
            this.match(Stage3EParser.LPAREN);
            this.state = 1189;
            this.match(Stage3EParser.OPTCHAIN);
            this.state = 1190;
            this.expression();
            this.state = 1191;
            this.propKey();
            this.state = 1192;
            this.match(Stage3EParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 202, Stage3EParser.RULE_nullCoalesce);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1194;
            this.match(Stage3EParser.LPAREN);
            this.state = 1195;
            this.match(Stage3EParser.NULLCOAL);
            this.state = 1196;
            this.expression();
            this.state = 1197;
            this.expression();
            this.state = 1198;
            this.match(Stage3EParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 204, Stage3EParser.RULE_call);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1200;
            this.match(Stage3EParser.LPAREN);
            this.state = 1201;
            this.expression();
            this.state = 1203;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 92, this.context) ) {
            case 1:
                {
                this.state = 1202;
                this.typeArgs();
                }
                break;
            }
            this.state = 1208;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 469762051) !== 0) || ((((_la - 86)) & ~0x1F) === 0 && ((1 << (_la - 86)) & 55) !== 0)) {
                {
                {
                this.state = 1205;
                this.expression();
                }
                }
                this.state = 1210;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1211;
            this.match(Stage3EParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 206, Stage3EParser.RULE_typeArgs);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1213;
            this.match(Stage3EParser.LPAREN);
            this.state = 1214;
            this.match(Stage3EParser.TYPE_ARGS);
            this.state = 1216;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 1215;
                this.typeExpr();
                }
                }
                this.state = 1218;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 91);
            this.state = 1220;
            this.match(Stage3EParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 208, Stage3EParser.RULE_fnSignature);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1222;
            this.match(Stage3EParser.LPAREN);
            this.state = 1233;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2) {
                {
                this.state = 1223;
                this.param();
                this.state = 1230;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 2 || _la === 4) {
                    {
                    {
                    this.state = 1225;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    if (_la === 4) {
                        {
                        this.state = 1224;
                        this.match(Stage3EParser.COMMA);
                        }
                    }

                    this.state = 1227;
                    this.param();
                    }
                    }
                    this.state = 1232;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
            }

            this.state = 1235;
            this.match(Stage3EParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 210, Stage3EParser.RULE_param);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1237;
            this.match(Stage3EParser.LPAREN);
            this.state = 1238;
            this.match(Stage3EParser.IDENTIFIER);
            this.state = 1239;
            this.match(Stage3EParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 212, Stage3EParser.RULE_literal);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1241;
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
        4,1,92,1244,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,
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
        2,104,7,104,2,105,7,105,2,106,7,106,1,0,1,0,1,0,5,0,218,8,0,10,0,
        12,0,221,9,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,3,1,231,8,1,1,2,1,2,
        1,2,1,2,1,2,5,2,238,8,2,10,2,12,2,241,9,2,1,2,1,2,1,3,1,3,1,3,1,
        3,1,3,1,3,1,4,1,4,1,4,1,4,3,4,255,8,4,1,4,1,4,1,4,1,5,1,5,1,5,1,
        5,3,5,264,8,5,1,5,3,5,267,8,5,1,5,1,5,1,5,1,6,1,6,1,6,4,6,275,8,
        6,11,6,12,6,276,1,6,1,6,1,7,1,7,1,7,5,7,284,8,7,10,7,12,7,287,9,
        7,1,7,1,7,3,7,291,8,7,1,7,3,7,294,8,7,1,7,3,7,297,8,7,1,7,1,7,1,
        7,1,8,1,8,1,8,5,8,305,8,8,10,8,12,8,308,9,8,1,8,3,8,311,8,8,1,8,
        3,8,314,8,8,1,8,1,8,1,8,1,9,1,9,1,9,1,9,1,9,1,10,1,10,1,10,4,10,
        327,8,10,11,10,12,10,328,1,10,1,10,1,11,1,11,1,11,5,11,336,8,11,
        10,11,12,11,339,9,11,1,11,1,11,1,12,1,12,1,12,1,12,1,12,1,12,3,12,
        349,8,12,1,13,1,13,1,14,1,14,1,14,5,14,356,8,14,10,14,12,14,359,
        9,14,1,14,1,14,1,14,3,14,364,8,14,1,14,3,14,367,8,14,1,14,1,14,1,
        15,1,15,1,15,1,15,5,15,375,8,15,10,15,12,15,378,9,15,1,15,1,15,1,
        16,1,16,1,16,5,16,385,8,16,10,16,12,16,388,9,16,1,16,1,16,1,16,5,
        16,393,8,16,10,16,12,16,396,9,16,1,16,1,16,1,17,1,17,1,17,5,17,403,
        8,17,10,17,12,17,406,9,17,1,17,1,17,1,17,1,17,1,18,1,18,1,18,5,18,
        415,8,18,10,18,12,18,418,9,18,1,18,1,18,1,18,5,18,423,8,18,10,18,
        12,18,426,9,18,1,18,1,18,1,19,1,19,1,19,5,19,433,8,19,10,19,12,19,
        436,9,19,1,19,1,19,1,19,5,19,441,8,19,10,19,12,19,444,9,19,1,19,
        1,19,1,20,1,20,1,20,3,20,451,8,20,1,20,1,20,3,20,455,8,20,1,20,1,
        20,1,21,1,21,1,21,3,21,462,8,21,1,21,5,21,465,8,21,10,21,12,21,468,
        9,21,3,21,470,8,21,1,21,1,21,1,21,1,21,1,21,1,21,3,21,478,8,21,1,
        22,1,22,1,22,1,22,1,22,1,22,1,22,1,22,1,22,1,22,1,22,1,22,1,22,1,
        22,1,22,1,22,1,22,3,22,497,8,22,1,23,1,23,1,23,1,23,5,23,503,8,23,
        10,23,12,23,506,9,23,1,23,1,23,5,23,510,8,23,10,23,12,23,513,9,23,
        1,23,1,23,1,24,1,24,1,24,1,24,1,24,1,24,1,25,1,25,1,25,1,25,5,25,
        527,8,25,10,25,12,25,530,9,25,1,25,1,25,5,25,534,8,25,10,25,12,25,
        537,9,25,1,25,1,25,1,26,1,26,1,26,1,26,1,26,1,26,1,27,1,27,1,27,
        1,27,1,27,3,27,552,8,27,1,27,1,27,1,28,1,28,1,28,1,28,5,28,560,8,
        28,10,28,12,28,563,9,28,1,28,1,28,1,29,1,29,1,29,5,29,570,8,29,10,
        29,12,29,573,9,29,1,29,1,29,1,30,1,30,1,30,3,30,580,8,30,1,30,1,
        30,1,31,1,31,1,31,1,31,1,31,1,32,1,32,1,32,3,32,592,8,32,1,32,1,
        32,1,32,1,33,1,33,1,33,1,33,1,33,3,33,602,8,33,1,34,1,34,1,34,1,
        34,1,34,1,34,1,35,1,35,1,35,1,35,1,35,1,36,1,36,1,36,4,36,618,8,
        36,11,36,12,36,619,1,36,1,36,1,37,1,37,1,37,3,37,627,8,37,1,37,1,
        37,1,38,1,38,1,38,1,38,4,38,635,8,38,11,38,12,38,636,1,38,1,38,1,
        39,1,39,1,39,1,39,1,39,1,40,1,40,1,40,1,40,3,40,650,8,40,1,40,1,
        40,1,40,1,41,1,41,1,41,1,41,3,41,659,8,41,1,41,1,41,1,42,1,42,1,
        42,1,42,1,42,1,42,1,42,1,42,1,42,1,42,1,42,1,42,1,42,1,42,1,42,1,
        42,3,42,679,8,42,1,43,1,43,1,43,1,43,4,43,685,8,43,11,43,12,43,686,
        1,43,1,43,1,44,1,44,1,44,1,44,4,44,695,8,44,11,44,12,44,696,1,44,
        1,44,1,45,1,45,1,45,1,45,1,45,1,46,1,46,1,46,4,46,709,8,46,11,46,
        12,46,710,1,46,1,46,1,47,1,47,1,47,1,47,1,47,1,47,1,47,1,47,1,47,
        1,47,1,47,3,47,726,8,47,1,48,1,48,1,48,3,48,731,8,48,1,48,1,48,5,
        48,735,8,48,10,48,12,48,738,9,48,1,48,1,48,1,48,1,48,1,49,1,49,1,
        49,3,49,747,8,49,1,49,1,49,1,49,1,50,1,50,1,50,5,50,755,8,50,10,
        50,12,50,758,9,50,1,50,1,50,1,51,1,51,5,51,764,8,51,10,51,12,51,
        767,9,51,1,51,1,51,3,51,771,8,51,1,51,1,51,1,51,1,52,1,52,1,53,1,
        53,1,53,1,53,1,53,1,54,1,54,1,54,1,54,1,54,1,55,1,55,1,55,1,55,1,
        55,1,56,1,56,1,56,1,56,1,56,1,56,1,57,1,57,1,57,1,57,1,57,1,57,1,
        57,1,57,1,58,1,58,1,58,1,58,1,58,1,59,1,59,1,59,1,59,1,59,3,59,817,
        8,59,1,59,1,59,1,59,1,60,1,60,1,60,4,60,825,8,60,11,60,12,60,826,
        1,60,1,60,1,61,1,61,1,62,1,62,1,62,4,62,836,8,62,11,62,12,62,837,
        1,62,1,62,1,63,1,63,3,63,844,8,63,1,64,1,64,1,64,4,64,849,8,64,11,
        64,12,64,850,1,64,1,64,1,65,1,65,1,65,4,65,858,8,65,11,65,12,65,
        859,1,65,1,65,1,66,1,66,1,66,1,66,3,66,868,8,66,1,66,3,66,871,8,
        66,1,66,3,66,874,8,66,1,67,1,67,1,67,1,67,1,67,1,68,1,68,1,68,1,
        68,1,68,1,69,1,69,1,69,1,69,1,69,1,69,1,69,1,69,1,69,1,69,1,69,1,
        69,3,69,898,8,69,1,70,1,70,1,70,1,70,5,70,904,8,70,10,70,12,70,907,
        9,70,1,70,3,70,910,8,70,1,70,1,70,1,71,1,71,1,71,1,71,5,71,918,8,
        71,10,71,12,71,921,9,71,1,71,1,71,1,72,1,72,1,72,5,72,928,8,72,10,
        72,12,72,931,9,72,1,72,1,72,1,73,1,73,1,73,1,73,1,73,1,73,5,73,941,
        8,73,10,73,12,73,944,9,73,1,73,1,73,1,74,1,74,1,74,1,74,1,74,5,74,
        953,8,74,10,74,12,74,956,9,74,1,74,1,74,1,75,1,75,1,75,1,75,1,75,
        5,75,965,8,75,10,75,12,75,968,9,75,1,75,1,75,1,76,1,76,1,76,1,76,
        1,76,1,76,1,76,1,76,1,76,1,76,1,76,1,76,1,76,1,76,1,76,1,76,1,76,
        1,76,1,76,1,76,1,76,1,76,1,76,1,76,1,76,1,76,3,76,998,8,76,1,77,
        1,77,1,78,1,78,1,79,1,79,1,79,5,79,1007,8,79,10,79,12,79,1010,9,
        79,1,79,1,79,1,80,1,80,1,80,1,80,5,80,1018,8,80,10,80,12,80,1021,
        9,80,1,80,1,80,1,81,1,81,1,81,1,81,1,81,1,82,1,82,1,82,1,82,1,82,
        1,82,1,83,1,83,1,83,1,83,5,83,1040,8,83,10,83,12,83,1043,9,83,1,
        83,1,83,1,84,1,84,1,84,1,84,5,84,1051,8,84,10,84,12,84,1054,9,84,
        1,84,1,84,1,85,1,85,1,85,1,85,1,85,5,85,1063,8,85,10,85,12,85,1066,
        9,85,1,85,1,85,1,86,1,86,1,86,1,86,1,86,5,86,1075,8,86,10,86,12,
        86,1078,9,86,1,86,1,86,1,87,1,87,1,87,1,87,1,87,1,87,1,87,1,88,1,
        88,1,88,1,88,1,88,4,88,1094,8,88,11,88,12,88,1095,1,88,1,88,1,89,
        1,89,1,89,1,89,3,89,1104,8,89,1,89,5,89,1107,8,89,10,89,12,89,1110,
        9,89,1,89,1,89,1,90,1,90,1,90,5,90,1117,8,90,10,90,12,90,1120,9,
        90,1,90,1,90,1,91,1,91,1,91,1,91,1,91,1,91,1,91,1,91,1,91,1,91,1,
        91,1,91,1,91,3,91,1137,8,91,1,92,1,92,1,92,1,92,5,92,1143,8,92,10,
        92,12,92,1146,9,92,1,92,1,92,1,93,1,93,1,93,5,93,1153,8,93,10,93,
        12,93,1156,9,93,1,93,1,93,1,94,1,94,1,95,1,95,1,95,1,95,1,95,1,95,
        1,96,1,96,1,96,1,96,1,96,1,96,1,97,1,97,1,97,1,97,1,97,1,98,1,98,
        1,98,1,98,1,98,1,99,1,99,1,99,1,99,1,99,1,100,1,100,1,100,1,100,
        1,100,1,100,1,101,1,101,1,101,1,101,1,101,1,101,1,102,1,102,1,102,
        3,102,1204,8,102,1,102,5,102,1207,8,102,10,102,12,102,1210,9,102,
        1,102,1,102,1,103,1,103,1,103,4,103,1217,8,103,11,103,12,103,1218,
        1,103,1,103,1,104,1,104,1,104,3,104,1226,8,104,1,104,5,104,1229,
        8,104,10,104,12,104,1232,9,104,3,104,1234,8,104,1,104,1,104,1,105,
        1,105,1,105,1,105,1,106,1,106,1,106,0,0,107,0,2,4,6,8,10,12,14,16,
        18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,
        62,64,66,68,70,72,74,76,78,80,82,84,86,88,90,92,94,96,98,100,102,
        104,106,108,110,112,114,116,118,120,122,124,126,128,130,132,134,
        136,138,140,142,144,146,148,150,152,154,156,158,160,162,164,166,
        168,170,172,174,176,178,180,182,184,186,188,190,192,194,196,198,
        200,202,204,206,208,210,212,0,5,3,0,75,75,87,88,90,90,2,0,66,66,
        74,74,7,0,5,26,29,29,31,73,75,77,81,86,88,88,90,91,1,0,31,32,3,0,
        75,77,87,88,90,90,1300,0,214,1,0,0,0,2,230,1,0,0,0,4,232,1,0,0,0,
        6,244,1,0,0,0,8,250,1,0,0,0,10,259,1,0,0,0,12,271,1,0,0,0,14,280,
        1,0,0,0,16,301,1,0,0,0,18,318,1,0,0,0,20,323,1,0,0,0,22,332,1,0,
        0,0,24,348,1,0,0,0,26,350,1,0,0,0,28,352,1,0,0,0,30,370,1,0,0,0,
        32,381,1,0,0,0,34,399,1,0,0,0,36,411,1,0,0,0,38,429,1,0,0,0,40,447,
        1,0,0,0,42,458,1,0,0,0,44,496,1,0,0,0,46,498,1,0,0,0,48,516,1,0,
        0,0,50,522,1,0,0,0,52,540,1,0,0,0,54,546,1,0,0,0,56,555,1,0,0,0,
        58,566,1,0,0,0,60,576,1,0,0,0,62,583,1,0,0,0,64,588,1,0,0,0,66,601,
        1,0,0,0,68,603,1,0,0,0,70,609,1,0,0,0,72,614,1,0,0,0,74,623,1,0,
        0,0,76,630,1,0,0,0,78,640,1,0,0,0,80,645,1,0,0,0,82,654,1,0,0,0,
        84,678,1,0,0,0,86,680,1,0,0,0,88,690,1,0,0,0,90,700,1,0,0,0,92,705,
        1,0,0,0,94,725,1,0,0,0,96,727,1,0,0,0,98,743,1,0,0,0,100,751,1,0,
        0,0,102,761,1,0,0,0,104,775,1,0,0,0,106,777,1,0,0,0,108,782,1,0,
        0,0,110,787,1,0,0,0,112,792,1,0,0,0,114,798,1,0,0,0,116,806,1,0,
        0,0,118,811,1,0,0,0,120,821,1,0,0,0,122,830,1,0,0,0,124,832,1,0,
        0,0,126,843,1,0,0,0,128,845,1,0,0,0,130,854,1,0,0,0,132,873,1,0,
        0,0,134,875,1,0,0,0,136,880,1,0,0,0,138,897,1,0,0,0,140,899,1,0,
        0,0,142,913,1,0,0,0,144,924,1,0,0,0,146,934,1,0,0,0,148,947,1,0,
        0,0,150,959,1,0,0,0,152,997,1,0,0,0,154,999,1,0,0,0,156,1001,1,0,
        0,0,158,1003,1,0,0,0,160,1013,1,0,0,0,162,1024,1,0,0,0,164,1029,
        1,0,0,0,166,1035,1,0,0,0,168,1046,1,0,0,0,170,1057,1,0,0,0,172,1069,
        1,0,0,0,174,1081,1,0,0,0,176,1088,1,0,0,0,178,1099,1,0,0,0,180,1113,
        1,0,0,0,182,1136,1,0,0,0,184,1138,1,0,0,0,186,1149,1,0,0,0,188,1159,
        1,0,0,0,190,1161,1,0,0,0,192,1167,1,0,0,0,194,1173,1,0,0,0,196,1178,
        1,0,0,0,198,1183,1,0,0,0,200,1188,1,0,0,0,202,1194,1,0,0,0,204,1200,
        1,0,0,0,206,1213,1,0,0,0,208,1222,1,0,0,0,210,1237,1,0,0,0,212,1241,
        1,0,0,0,214,215,5,2,0,0,215,219,5,5,0,0,216,218,3,2,1,0,217,216,
        1,0,0,0,218,221,1,0,0,0,219,217,1,0,0,0,219,220,1,0,0,0,220,222,
        1,0,0,0,221,219,1,0,0,0,222,223,5,3,0,0,223,1,1,0,0,0,224,231,3,
        4,2,0,225,231,3,6,3,0,226,231,3,8,4,0,227,231,3,10,5,0,228,231,3,
        14,7,0,229,231,3,44,22,0,230,224,1,0,0,0,230,225,1,0,0,0,230,226,
        1,0,0,0,230,227,1,0,0,0,230,228,1,0,0,0,230,229,1,0,0,0,231,3,1,
        0,0,0,232,233,5,2,0,0,233,234,5,16,0,0,234,235,5,91,0,0,235,239,
        3,208,104,0,236,238,3,44,22,0,237,236,1,0,0,0,238,241,1,0,0,0,239,
        237,1,0,0,0,239,240,1,0,0,0,240,242,1,0,0,0,241,239,1,0,0,0,242,
        243,5,3,0,0,243,5,1,0,0,0,244,245,5,2,0,0,245,246,5,15,0,0,246,247,
        5,91,0,0,247,248,3,152,76,0,248,249,5,3,0,0,249,7,1,0,0,0,250,251,
        5,2,0,0,251,252,5,71,0,0,252,254,5,91,0,0,253,255,3,130,65,0,254,
        253,1,0,0,0,254,255,1,0,0,0,255,256,1,0,0,0,256,257,3,84,42,0,257,
        258,5,3,0,0,258,9,1,0,0,0,259,260,5,2,0,0,260,261,5,72,0,0,261,263,
        5,91,0,0,262,264,3,130,65,0,263,262,1,0,0,0,263,264,1,0,0,0,264,
        266,1,0,0,0,265,267,3,12,6,0,266,265,1,0,0,0,266,267,1,0,0,0,267,
        268,1,0,0,0,268,269,3,100,50,0,269,270,5,3,0,0,270,11,1,0,0,0,271,
        272,5,2,0,0,272,274,5,69,0,0,273,275,3,84,42,0,274,273,1,0,0,0,275,
        276,1,0,0,0,276,274,1,0,0,0,276,277,1,0,0,0,277,278,1,0,0,0,278,
        279,5,3,0,0,279,13,1,0,0,0,280,281,5,2,0,0,281,285,5,46,0,0,282,
        284,3,26,13,0,283,282,1,0,0,0,284,287,1,0,0,0,285,283,1,0,0,0,285,
        286,1,0,0,0,286,288,1,0,0,0,287,285,1,0,0,0,288,290,5,91,0,0,289,
        291,3,130,65,0,290,289,1,0,0,0,290,291,1,0,0,0,291,293,1,0,0,0,292,
        294,3,18,9,0,293,292,1,0,0,0,293,294,1,0,0,0,294,296,1,0,0,0,295,
        297,3,20,10,0,296,295,1,0,0,0,296,297,1,0,0,0,297,298,1,0,0,0,298,
        299,3,22,11,0,299,300,5,3,0,0,300,15,1,0,0,0,301,302,5,2,0,0,302,
        306,5,46,0,0,303,305,3,26,13,0,304,303,1,0,0,0,305,308,1,0,0,0,306,
        304,1,0,0,0,306,307,1,0,0,0,307,310,1,0,0,0,308,306,1,0,0,0,309,
        311,3,18,9,0,310,309,1,0,0,0,310,311,1,0,0,0,311,313,1,0,0,0,312,
        314,3,20,10,0,313,312,1,0,0,0,313,314,1,0,0,0,314,315,1,0,0,0,315,
        316,3,22,11,0,316,317,5,3,0,0,317,17,1,0,0,0,318,319,5,2,0,0,319,
        320,5,69,0,0,320,321,3,84,42,0,321,322,5,3,0,0,322,19,1,0,0,0,323,
        324,5,2,0,0,324,326,5,53,0,0,325,327,3,84,42,0,326,325,1,0,0,0,327,
        328,1,0,0,0,328,326,1,0,0,0,328,329,1,0,0,0,329,330,1,0,0,0,330,
        331,5,3,0,0,331,21,1,0,0,0,332,333,5,2,0,0,333,337,5,43,0,0,334,
        336,3,24,12,0,335,334,1,0,0,0,336,339,1,0,0,0,337,335,1,0,0,0,337,
        338,1,0,0,0,338,340,1,0,0,0,339,337,1,0,0,0,340,341,5,3,0,0,341,
        23,1,0,0,0,342,349,3,28,14,0,343,349,3,30,15,0,344,349,3,32,16,0,
        345,349,3,34,17,0,346,349,3,36,18,0,347,349,3,38,19,0,348,342,1,
        0,0,0,348,343,1,0,0,0,348,344,1,0,0,0,348,345,1,0,0,0,348,346,1,
        0,0,0,348,347,1,0,0,0,349,25,1,0,0,0,350,351,5,86,0,0,351,27,1,0,
        0,0,352,353,5,2,0,0,353,357,5,47,0,0,354,356,3,26,13,0,355,354,1,
        0,0,0,356,359,1,0,0,0,357,355,1,0,0,0,357,358,1,0,0,0,358,360,1,
        0,0,0,359,357,1,0,0,0,360,363,5,91,0,0,361,362,5,78,0,0,362,364,
        3,84,42,0,363,361,1,0,0,0,363,364,1,0,0,0,364,366,1,0,0,0,365,367,
        3,152,76,0,366,365,1,0,0,0,366,367,1,0,0,0,367,368,1,0,0,0,368,369,
        5,3,0,0,369,29,1,0,0,0,370,371,5,2,0,0,371,372,5,48,0,0,372,376,
        3,42,21,0,373,375,3,44,22,0,374,373,1,0,0,0,375,378,1,0,0,0,376,
        374,1,0,0,0,376,377,1,0,0,0,377,379,1,0,0,0,378,376,1,0,0,0,379,
        380,5,3,0,0,380,31,1,0,0,0,381,382,5,2,0,0,382,386,5,12,0,0,383,
        385,3,26,13,0,384,383,1,0,0,0,385,388,1,0,0,0,386,384,1,0,0,0,386,
        387,1,0,0,0,387,389,1,0,0,0,388,386,1,0,0,0,389,390,5,91,0,0,390,
        394,3,42,21,0,391,393,3,44,22,0,392,391,1,0,0,0,393,396,1,0,0,0,
        394,392,1,0,0,0,394,395,1,0,0,0,395,397,1,0,0,0,396,394,1,0,0,0,
        397,398,5,3,0,0,398,33,1,0,0,0,399,400,5,2,0,0,400,404,5,45,0,0,
        401,403,3,26,13,0,402,401,1,0,0,0,403,406,1,0,0,0,404,402,1,0,0,
        0,404,405,1,0,0,0,405,407,1,0,0,0,406,404,1,0,0,0,407,408,5,91,0,
        0,408,409,3,42,21,0,409,410,5,3,0,0,410,35,1,0,0,0,411,412,5,2,0,
        0,412,416,5,51,0,0,413,415,3,26,13,0,414,413,1,0,0,0,415,418,1,0,
        0,0,416,414,1,0,0,0,416,417,1,0,0,0,417,419,1,0,0,0,418,416,1,0,
        0,0,419,420,5,91,0,0,420,424,3,42,21,0,421,423,3,44,22,0,422,421,
        1,0,0,0,423,426,1,0,0,0,424,422,1,0,0,0,424,425,1,0,0,0,425,427,
        1,0,0,0,426,424,1,0,0,0,427,428,5,3,0,0,428,37,1,0,0,0,429,430,5,
        2,0,0,430,434,5,52,0,0,431,433,3,26,13,0,432,431,1,0,0,0,433,436,
        1,0,0,0,434,432,1,0,0,0,434,435,1,0,0,0,435,437,1,0,0,0,436,434,
        1,0,0,0,437,438,5,91,0,0,438,442,3,42,21,0,439,441,3,44,22,0,440,
        439,1,0,0,0,441,444,1,0,0,0,442,440,1,0,0,0,442,443,1,0,0,0,443,
        445,1,0,0,0,444,442,1,0,0,0,445,446,5,3,0,0,446,39,1,0,0,0,447,448,
        5,2,0,0,448,450,5,91,0,0,449,451,5,74,0,0,450,449,1,0,0,0,450,451,
        1,0,0,0,451,454,1,0,0,0,452,453,5,78,0,0,453,455,3,84,42,0,454,452,
        1,0,0,0,454,455,1,0,0,0,455,456,1,0,0,0,456,457,5,3,0,0,457,41,1,
        0,0,0,458,469,5,2,0,0,459,466,3,40,20,0,460,462,5,4,0,0,461,460,
        1,0,0,0,461,462,1,0,0,0,462,463,1,0,0,0,463,465,3,40,20,0,464,461,
        1,0,0,0,465,468,1,0,0,0,466,464,1,0,0,0,466,467,1,0,0,0,467,470,
        1,0,0,0,468,466,1,0,0,0,469,459,1,0,0,0,469,470,1,0,0,0,470,471,
        1,0,0,0,471,477,5,3,0,0,472,473,5,2,0,0,473,474,5,70,0,0,474,475,
        3,84,42,0,475,476,5,3,0,0,476,478,1,0,0,0,477,472,1,0,0,0,477,478,
        1,0,0,0,478,43,1,0,0,0,479,497,3,46,23,0,480,497,3,48,24,0,481,497,
        3,50,25,0,482,497,3,52,26,0,483,497,3,54,27,0,484,497,3,56,28,0,
        485,497,3,58,29,0,486,497,3,60,30,0,487,497,3,62,31,0,488,497,3,
        64,32,0,489,497,3,66,33,0,490,497,3,140,70,0,491,497,3,146,73,0,
        492,497,3,148,74,0,493,497,3,150,75,0,494,497,3,138,69,0,495,497,
        3,152,76,0,496,479,1,0,0,0,496,480,1,0,0,0,496,481,1,0,0,0,496,482,
        1,0,0,0,496,483,1,0,0,0,496,484,1,0,0,0,496,485,1,0,0,0,496,486,
        1,0,0,0,496,487,1,0,0,0,496,488,1,0,0,0,496,489,1,0,0,0,496,490,
        1,0,0,0,496,491,1,0,0,0,496,492,1,0,0,0,496,493,1,0,0,0,496,494,
        1,0,0,0,496,495,1,0,0,0,497,45,1,0,0,0,498,499,5,2,0,0,499,500,5,
        6,0,0,500,504,5,2,0,0,501,503,3,80,40,0,502,501,1,0,0,0,503,506,
        1,0,0,0,504,502,1,0,0,0,504,505,1,0,0,0,505,507,1,0,0,0,506,504,
        1,0,0,0,507,511,5,3,0,0,508,510,3,44,22,0,509,508,1,0,0,0,510,513,
        1,0,0,0,511,509,1,0,0,0,511,512,1,0,0,0,512,514,1,0,0,0,513,511,
        1,0,0,0,514,515,5,3,0,0,515,47,1,0,0,0,516,517,5,2,0,0,517,518,5,
        7,0,0,518,519,3,82,41,0,519,520,3,152,76,0,520,521,5,3,0,0,521,49,
        1,0,0,0,522,523,5,2,0,0,523,524,5,8,0,0,524,528,5,2,0,0,525,527,
        3,80,40,0,526,525,1,0,0,0,527,530,1,0,0,0,528,526,1,0,0,0,528,529,
        1,0,0,0,529,531,1,0,0,0,530,528,1,0,0,0,531,535,5,3,0,0,532,534,
        3,44,22,0,533,532,1,0,0,0,534,537,1,0,0,0,535,533,1,0,0,0,535,536,
        1,0,0,0,536,538,1,0,0,0,537,535,1,0,0,0,538,539,5,3,0,0,539,51,1,
        0,0,0,540,541,5,2,0,0,541,542,5,9,0,0,542,543,3,82,41,0,543,544,
        3,152,76,0,544,545,5,3,0,0,545,53,1,0,0,0,546,547,5,2,0,0,547,548,
        5,17,0,0,548,549,3,152,76,0,549,551,3,44,22,0,550,552,3,44,22,0,
        551,550,1,0,0,0,551,552,1,0,0,0,552,553,1,0,0,0,553,554,5,3,0,0,
        554,55,1,0,0,0,555,556,5,2,0,0,556,557,5,18,0,0,557,561,3,152,76,
        0,558,560,3,44,22,0,559,558,1,0,0,0,560,563,1,0,0,0,561,559,1,0,
        0,0,561,562,1,0,0,0,562,564,1,0,0,0,563,561,1,0,0,0,564,565,5,3,
        0,0,565,57,1,0,0,0,566,567,5,2,0,0,567,571,5,19,0,0,568,570,3,44,
        22,0,569,568,1,0,0,0,570,573,1,0,0,0,571,569,1,0,0,0,571,572,1,0,
        0,0,572,574,1,0,0,0,573,571,1,0,0,0,574,575,5,3,0,0,575,59,1,0,0,
        0,576,577,5,2,0,0,577,579,5,20,0,0,578,580,3,152,76,0,579,578,1,
        0,0,0,579,580,1,0,0,0,580,581,1,0,0,0,581,582,5,3,0,0,582,61,1,0,
        0,0,583,584,5,2,0,0,584,585,5,21,0,0,585,586,3,152,76,0,586,587,
        5,3,0,0,587,63,1,0,0,0,588,589,5,2,0,0,589,591,5,36,0,0,590,592,
        3,180,90,0,591,590,1,0,0,0,591,592,1,0,0,0,592,593,1,0,0,0,593,594,
        5,88,0,0,594,595,5,3,0,0,595,65,1,0,0,0,596,602,3,68,34,0,597,602,
        3,70,35,0,598,602,3,72,36,0,599,602,3,76,38,0,600,602,3,78,39,0,
        601,596,1,0,0,0,601,597,1,0,0,0,601,598,1,0,0,0,601,599,1,0,0,0,
        601,600,1,0,0,0,602,67,1,0,0,0,603,604,5,2,0,0,604,605,5,81,0,0,
        605,606,5,91,0,0,606,607,3,152,76,0,607,608,5,3,0,0,608,69,1,0,0,
        0,609,610,5,2,0,0,610,611,5,82,0,0,611,612,3,152,76,0,612,613,5,
        3,0,0,613,71,1,0,0,0,614,615,5,2,0,0,615,617,5,83,0,0,616,618,3,
        74,37,0,617,616,1,0,0,0,618,619,1,0,0,0,619,617,1,0,0,0,619,620,
        1,0,0,0,620,621,1,0,0,0,621,622,5,3,0,0,622,73,1,0,0,0,623,624,5,
        2,0,0,624,626,5,91,0,0,625,627,5,91,0,0,626,625,1,0,0,0,626,627,
        1,0,0,0,627,628,1,0,0,0,628,629,5,3,0,0,629,75,1,0,0,0,630,631,5,
        2,0,0,631,632,5,84,0,0,632,634,5,88,0,0,633,635,3,74,37,0,634,633,
        1,0,0,0,635,636,1,0,0,0,636,634,1,0,0,0,636,637,1,0,0,0,637,638,
        1,0,0,0,638,639,5,3,0,0,639,77,1,0,0,0,640,641,5,2,0,0,641,642,5,
        85,0,0,642,643,5,88,0,0,643,644,5,3,0,0,644,79,1,0,0,0,645,646,5,
        2,0,0,646,649,5,91,0,0,647,648,5,78,0,0,648,650,3,84,42,0,649,647,
        1,0,0,0,649,650,1,0,0,0,650,651,1,0,0,0,651,652,3,152,76,0,652,653,
        5,3,0,0,653,81,1,0,0,0,654,655,5,2,0,0,655,658,5,91,0,0,656,657,
        5,78,0,0,657,659,3,84,42,0,658,656,1,0,0,0,658,659,1,0,0,0,659,660,
        1,0,0,0,660,661,5,3,0,0,661,83,1,0,0,0,662,679,5,91,0,0,663,679,
        3,86,43,0,664,679,3,88,44,0,665,679,3,90,45,0,666,679,3,92,46,0,
        667,679,3,96,48,0,668,679,3,100,50,0,669,679,3,106,53,0,670,679,
        3,108,54,0,671,679,3,110,55,0,672,679,3,112,56,0,673,679,3,114,57,
        0,674,679,3,116,58,0,675,679,3,118,59,0,676,679,3,124,62,0,677,679,
        3,128,64,0,678,662,1,0,0,0,678,663,1,0,0,0,678,664,1,0,0,0,678,665,
        1,0,0,0,678,666,1,0,0,0,678,667,1,0,0,0,678,668,1,0,0,0,678,669,
        1,0,0,0,678,670,1,0,0,0,678,671,1,0,0,0,678,672,1,0,0,0,678,673,
        1,0,0,0,678,674,1,0,0,0,678,675,1,0,0,0,678,676,1,0,0,0,678,677,
        1,0,0,0,679,85,1,0,0,0,680,681,5,2,0,0,681,682,5,54,0,0,682,684,
        3,84,42,0,683,685,3,84,42,0,684,683,1,0,0,0,685,686,1,0,0,0,686,
        684,1,0,0,0,686,687,1,0,0,0,687,688,1,0,0,0,688,689,5,3,0,0,689,
        87,1,0,0,0,690,691,5,2,0,0,691,692,5,55,0,0,692,694,3,84,42,0,693,
        695,3,84,42,0,694,693,1,0,0,0,695,696,1,0,0,0,696,694,1,0,0,0,696,
        697,1,0,0,0,697,698,1,0,0,0,698,699,5,3,0,0,699,89,1,0,0,0,700,701,
        5,2,0,0,701,702,5,26,0,0,702,703,3,84,42,0,703,704,5,3,0,0,704,91,
        1,0,0,0,705,706,5,2,0,0,706,708,5,56,0,0,707,709,3,94,47,0,708,707,
        1,0,0,0,709,710,1,0,0,0,710,708,1,0,0,0,710,711,1,0,0,0,711,712,
        1,0,0,0,712,713,5,3,0,0,713,93,1,0,0,0,714,715,5,2,0,0,715,716,5,
        65,0,0,716,717,3,84,42,0,717,718,5,3,0,0,718,726,1,0,0,0,719,720,
        5,2,0,0,720,721,5,91,0,0,721,722,3,84,42,0,722,723,5,3,0,0,723,726,
        1,0,0,0,724,726,3,84,42,0,725,714,1,0,0,0,725,719,1,0,0,0,725,724,
        1,0,0,0,726,95,1,0,0,0,727,728,5,2,0,0,728,730,5,57,0,0,729,731,
        3,130,65,0,730,729,1,0,0,0,730,731,1,0,0,0,731,732,1,0,0,0,732,736,
        5,2,0,0,733,735,3,98,49,0,734,733,1,0,0,0,735,738,1,0,0,0,736,734,
        1,0,0,0,736,737,1,0,0,0,737,739,1,0,0,0,738,736,1,0,0,0,739,740,
        5,3,0,0,740,741,3,84,42,0,741,742,5,3,0,0,742,97,1,0,0,0,743,744,
        5,2,0,0,744,746,5,91,0,0,745,747,5,74,0,0,746,745,1,0,0,0,746,747,
        1,0,0,0,747,748,1,0,0,0,748,749,3,84,42,0,749,750,5,3,0,0,750,99,
        1,0,0,0,751,752,5,2,0,0,752,756,5,91,0,0,753,755,3,102,51,0,754,
        753,1,0,0,0,755,758,1,0,0,0,756,754,1,0,0,0,756,757,1,0,0,0,757,
        759,1,0,0,0,758,756,1,0,0,0,759,760,5,3,0,0,760,101,1,0,0,0,761,
        765,5,2,0,0,762,764,3,104,52,0,763,762,1,0,0,0,764,767,1,0,0,0,765,
        763,1,0,0,0,765,766,1,0,0,0,766,768,1,0,0,0,767,765,1,0,0,0,768,
        770,5,91,0,0,769,771,5,74,0,0,770,769,1,0,0,0,770,771,1,0,0,0,771,
        772,1,0,0,0,772,773,3,84,42,0,773,774,5,3,0,0,774,103,1,0,0,0,775,
        776,5,66,0,0,776,105,1,0,0,0,777,778,5,2,0,0,778,779,5,58,0,0,779,
        780,7,0,0,0,780,781,5,3,0,0,781,107,1,0,0,0,782,783,5,2,0,0,783,
        784,5,59,0,0,784,785,3,84,42,0,785,786,5,3,0,0,786,109,1,0,0,0,787,
        788,5,2,0,0,788,789,5,60,0,0,789,790,5,91,0,0,790,791,5,3,0,0,791,
        111,1,0,0,0,792,793,5,2,0,0,793,794,5,29,0,0,794,795,3,84,42,0,795,
        796,3,84,42,0,796,797,5,3,0,0,797,113,1,0,0,0,798,799,5,2,0,0,799,
        800,5,24,0,0,800,801,3,84,42,0,801,802,3,84,42,0,802,803,3,84,42,
        0,803,804,3,84,42,0,804,805,5,3,0,0,805,115,1,0,0,0,806,807,5,2,
        0,0,807,808,5,62,0,0,808,809,5,91,0,0,809,810,5,3,0,0,810,117,1,
        0,0,0,811,812,5,2,0,0,812,813,5,63,0,0,813,814,5,91,0,0,814,816,
        3,84,42,0,815,817,3,120,60,0,816,815,1,0,0,0,816,817,1,0,0,0,817,
        818,1,0,0,0,818,819,3,84,42,0,819,820,5,3,0,0,820,119,1,0,0,0,821,
        822,5,2,0,0,822,824,5,73,0,0,823,825,3,122,61,0,824,823,1,0,0,0,
        825,826,1,0,0,0,826,824,1,0,0,0,826,827,1,0,0,0,827,828,1,0,0,0,
        828,829,5,3,0,0,829,121,1,0,0,0,830,831,7,1,0,0,831,123,1,0,0,0,
        832,833,5,2,0,0,833,835,5,64,0,0,834,836,3,126,63,0,835,834,1,0,
        0,0,836,837,1,0,0,0,837,835,1,0,0,0,837,838,1,0,0,0,838,839,1,0,
        0,0,839,840,5,3,0,0,840,125,1,0,0,0,841,844,5,88,0,0,842,844,3,84,
        42,0,843,841,1,0,0,0,843,842,1,0,0,0,844,127,1,0,0,0,845,846,5,2,
        0,0,846,848,3,84,42,0,847,849,3,84,42,0,848,847,1,0,0,0,849,850,
        1,0,0,0,850,848,1,0,0,0,850,851,1,0,0,0,851,852,1,0,0,0,852,853,
        5,3,0,0,853,129,1,0,0,0,854,855,5,2,0,0,855,857,5,67,0,0,856,858,
        3,132,66,0,857,856,1,0,0,0,858,859,1,0,0,0,859,857,1,0,0,0,859,860,
        1,0,0,0,860,861,1,0,0,0,861,862,5,3,0,0,862,131,1,0,0,0,863,874,
        5,91,0,0,864,865,5,2,0,0,865,867,5,91,0,0,866,868,3,134,67,0,867,
        866,1,0,0,0,867,868,1,0,0,0,868,870,1,0,0,0,869,871,3,136,68,0,870,
        869,1,0,0,0,870,871,1,0,0,0,871,872,1,0,0,0,872,874,5,3,0,0,873,
        863,1,0,0,0,873,864,1,0,0,0,874,133,1,0,0,0,875,876,5,2,0,0,876,
        877,5,69,0,0,877,878,3,84,42,0,878,879,5,3,0,0,879,135,1,0,0,0,880,
        881,5,2,0,0,881,882,5,39,0,0,882,883,3,84,42,0,883,884,5,3,0,0,884,
        137,1,0,0,0,885,886,5,2,0,0,886,887,5,22,0,0,887,888,5,91,0,0,888,
        889,3,152,76,0,889,890,5,3,0,0,890,898,1,0,0,0,891,892,5,2,0,0,892,
        893,5,22,0,0,893,894,3,190,95,0,894,895,3,152,76,0,895,896,5,3,0,
        0,896,898,1,0,0,0,897,885,1,0,0,0,897,891,1,0,0,0,898,139,1,0,0,
        0,899,900,5,2,0,0,900,901,5,37,0,0,901,905,3,152,76,0,902,904,3,
        142,71,0,903,902,1,0,0,0,904,907,1,0,0,0,905,903,1,0,0,0,905,906,
        1,0,0,0,906,909,1,0,0,0,907,905,1,0,0,0,908,910,3,144,72,0,909,908,
        1,0,0,0,909,910,1,0,0,0,910,911,1,0,0,0,911,912,5,3,0,0,912,141,
        1,0,0,0,913,914,5,2,0,0,914,915,5,38,0,0,915,919,3,152,76,0,916,
        918,3,44,22,0,917,916,1,0,0,0,918,921,1,0,0,0,919,917,1,0,0,0,919,
        920,1,0,0,0,920,922,1,0,0,0,921,919,1,0,0,0,922,923,5,3,0,0,923,
        143,1,0,0,0,924,925,5,2,0,0,925,929,5,39,0,0,926,928,3,44,22,0,927,
        926,1,0,0,0,928,931,1,0,0,0,929,927,1,0,0,0,929,930,1,0,0,0,930,
        932,1,0,0,0,931,929,1,0,0,0,932,933,5,3,0,0,933,145,1,0,0,0,934,
        935,5,2,0,0,935,936,5,42,0,0,936,937,3,48,24,0,937,938,3,152,76,
        0,938,942,3,138,69,0,939,941,3,44,22,0,940,939,1,0,0,0,941,944,1,
        0,0,0,942,940,1,0,0,0,942,943,1,0,0,0,943,945,1,0,0,0,944,942,1,
        0,0,0,945,946,5,3,0,0,946,147,1,0,0,0,947,948,5,2,0,0,948,949,5,
        40,0,0,949,950,5,91,0,0,950,954,3,152,76,0,951,953,3,44,22,0,952,
        951,1,0,0,0,953,956,1,0,0,0,954,952,1,0,0,0,954,955,1,0,0,0,955,
        957,1,0,0,0,956,954,1,0,0,0,957,958,5,3,0,0,958,149,1,0,0,0,959,
        960,5,2,0,0,960,961,5,41,0,0,961,962,5,91,0,0,962,966,3,152,76,0,
        963,965,3,44,22,0,964,963,1,0,0,0,965,968,1,0,0,0,966,964,1,0,0,
        0,966,967,1,0,0,0,967,969,1,0,0,0,968,966,1,0,0,0,969,970,5,3,0,
        0,970,151,1,0,0,0,971,998,3,212,106,0,972,998,5,86,0,0,973,998,5,
        91,0,0,974,998,3,166,83,0,975,998,3,168,84,0,976,998,3,170,85,0,
        977,998,3,172,86,0,978,998,3,180,90,0,979,998,3,186,93,0,980,998,
        3,190,95,0,981,998,3,192,96,0,982,998,3,194,97,0,983,998,3,196,98,
        0,984,998,3,198,99,0,985,998,3,174,87,0,986,998,3,176,88,0,987,998,
        3,178,89,0,988,998,3,200,100,0,989,998,3,202,101,0,990,998,3,162,
        81,0,991,998,3,164,82,0,992,998,3,154,77,0,993,998,3,156,78,0,994,
        998,3,158,79,0,995,998,3,160,80,0,996,998,3,204,102,0,997,971,1,
        0,0,0,997,972,1,0,0,0,997,973,1,0,0,0,997,974,1,0,0,0,997,975,1,
        0,0,0,997,976,1,0,0,0,997,977,1,0,0,0,997,978,1,0,0,0,997,979,1,
        0,0,0,997,980,1,0,0,0,997,981,1,0,0,0,997,982,1,0,0,0,997,983,1,
        0,0,0,997,984,1,0,0,0,997,985,1,0,0,0,997,986,1,0,0,0,997,987,1,
        0,0,0,997,988,1,0,0,0,997,989,1,0,0,0,997,990,1,0,0,0,997,991,1,
        0,0,0,997,992,1,0,0,0,997,993,1,0,0,0,997,994,1,0,0,0,997,995,1,
        0,0,0,997,996,1,0,0,0,998,153,1,0,0,0,999,1000,5,49,0,0,1000,155,
        1,0,0,0,1001,1002,5,50,0,0,1002,157,1,0,0,0,1003,1004,5,2,0,0,1004,
        1008,5,50,0,0,1005,1007,3,152,76,0,1006,1005,1,0,0,0,1007,1010,1,
        0,0,0,1008,1006,1,0,0,0,1008,1009,1,0,0,0,1009,1011,1,0,0,0,1010,
        1008,1,0,0,0,1011,1012,5,3,0,0,1012,159,1,0,0,0,1013,1014,5,2,0,
        0,1014,1015,5,44,0,0,1015,1019,5,91,0,0,1016,1018,3,152,76,0,1017,
        1016,1,0,0,0,1018,1021,1,0,0,0,1019,1017,1,0,0,0,1019,1020,1,0,0,
        0,1020,1022,1,0,0,0,1021,1019,1,0,0,0,1022,1023,5,3,0,0,1023,161,
        1,0,0,0,1024,1025,5,2,0,0,1025,1026,5,60,0,0,1026,1027,3,152,76,
        0,1027,1028,5,3,0,0,1028,163,1,0,0,0,1029,1030,5,2,0,0,1030,1031,
        5,61,0,0,1031,1032,3,152,76,0,1032,1033,3,84,42,0,1033,1034,5,3,
        0,0,1034,165,1,0,0,0,1035,1036,5,2,0,0,1036,1037,5,10,0,0,1037,1041,
        3,208,104,0,1038,1040,3,44,22,0,1039,1038,1,0,0,0,1040,1043,1,0,
        0,0,1041,1039,1,0,0,0,1041,1042,1,0,0,0,1042,1044,1,0,0,0,1043,1041,
        1,0,0,0,1044,1045,5,3,0,0,1045,167,1,0,0,0,1046,1047,5,2,0,0,1047,
        1048,5,11,0,0,1048,1052,3,208,104,0,1049,1051,3,44,22,0,1050,1049,
        1,0,0,0,1051,1054,1,0,0,0,1052,1050,1,0,0,0,1052,1053,1,0,0,0,1053,
        1055,1,0,0,0,1054,1052,1,0,0,0,1055,1056,5,3,0,0,1056,169,1,0,0,
        0,1057,1058,5,2,0,0,1058,1059,5,13,0,0,1059,1060,3,152,76,0,1060,
        1064,3,152,76,0,1061,1063,3,152,76,0,1062,1061,1,0,0,0,1063,1066,
        1,0,0,0,1064,1062,1,0,0,0,1064,1065,1,0,0,0,1065,1067,1,0,0,0,1066,
        1064,1,0,0,0,1067,1068,5,3,0,0,1068,171,1,0,0,0,1069,1070,5,2,0,
        0,1070,1071,5,14,0,0,1071,1072,3,152,76,0,1072,1076,3,152,76,0,1073,
        1075,3,152,76,0,1074,1073,1,0,0,0,1075,1078,1,0,0,0,1076,1074,1,
        0,0,0,1076,1077,1,0,0,0,1077,1079,1,0,0,0,1078,1076,1,0,0,0,1079,
        1080,5,3,0,0,1080,173,1,0,0,0,1081,1082,5,2,0,0,1082,1083,5,23,0,
        0,1083,1084,3,152,76,0,1084,1085,3,152,76,0,1085,1086,3,152,76,0,
        1086,1087,5,3,0,0,1087,175,1,0,0,0,1088,1089,5,2,0,0,1089,1093,5,
        24,0,0,1090,1091,3,152,76,0,1091,1092,3,152,76,0,1092,1094,1,0,0,
        0,1093,1090,1,0,0,0,1094,1095,1,0,0,0,1095,1093,1,0,0,0,1095,1096,
        1,0,0,0,1096,1097,1,0,0,0,1097,1098,5,3,0,0,1098,177,1,0,0,0,1099,
        1100,5,2,0,0,1100,1101,5,35,0,0,1101,1103,5,91,0,0,1102,1104,3,206,
        103,0,1103,1102,1,0,0,0,1103,1104,1,0,0,0,1104,1108,1,0,0,0,1105,
        1107,3,152,76,0,1106,1105,1,0,0,0,1107,1110,1,0,0,0,1108,1106,1,
        0,0,0,1108,1109,1,0,0,0,1109,1111,1,0,0,0,1110,1108,1,0,0,0,1111,
        1112,5,3,0,0,1112,179,1,0,0,0,1113,1114,5,2,0,0,1114,1118,5,25,0,
        0,1115,1117,3,182,91,0,1116,1115,1,0,0,0,1117,1120,1,0,0,0,1118,
        1116,1,0,0,0,1118,1119,1,0,0,0,1119,1121,1,0,0,0,1120,1118,1,0,0,
        0,1121,1122,5,3,0,0,1122,181,1,0,0,0,1123,1124,5,2,0,0,1124,1125,
        3,188,94,0,1125,1126,3,152,76,0,1126,1127,5,3,0,0,1127,1137,1,0,
        0,0,1128,1129,5,2,0,0,1129,1130,3,188,94,0,1130,1131,3,184,92,0,
        1131,1132,5,3,0,0,1132,1137,1,0,0,0,1133,1134,5,2,0,0,1134,1135,
        5,91,0,0,1135,1137,5,3,0,0,1136,1123,1,0,0,0,1136,1128,1,0,0,0,1136,
        1133,1,0,0,0,1137,183,1,0,0,0,1138,1139,5,2,0,0,1139,1140,5,12,0,
        0,1140,1144,3,208,104,0,1141,1143,3,44,22,0,1142,1141,1,0,0,0,1143,
        1146,1,0,0,0,1144,1142,1,0,0,0,1144,1145,1,0,0,0,1145,1147,1,0,0,
        0,1146,1144,1,0,0,0,1147,1148,5,3,0,0,1148,185,1,0,0,0,1149,1150,
        5,2,0,0,1150,1154,5,26,0,0,1151,1153,3,152,76,0,1152,1151,1,0,0,
        0,1153,1156,1,0,0,0,1154,1152,1,0,0,0,1154,1155,1,0,0,0,1155,1157,
        1,0,0,0,1156,1154,1,0,0,0,1157,1158,5,3,0,0,1158,187,1,0,0,0,1159,
        1160,7,2,0,0,1160,189,1,0,0,0,1161,1162,5,2,0,0,1162,1163,5,28,0,
        0,1163,1164,3,152,76,0,1164,1165,3,188,94,0,1165,1166,5,3,0,0,1166,
        191,1,0,0,0,1167,1168,5,2,0,0,1168,1169,5,29,0,0,1169,1170,3,152,
        76,0,1170,1171,3,152,76,0,1171,1172,5,3,0,0,1172,193,1,0,0,0,1173,
        1174,5,2,0,0,1174,1175,7,3,0,0,1175,1176,3,152,76,0,1176,1177,5,
        3,0,0,1177,195,1,0,0,0,1178,1179,5,2,0,0,1179,1180,5,34,0,0,1180,
        1181,3,152,76,0,1181,1182,5,3,0,0,1182,197,1,0,0,0,1183,1184,5,2,
        0,0,1184,1185,5,33,0,0,1185,1186,3,152,76,0,1186,1187,5,3,0,0,1187,
        199,1,0,0,0,1188,1189,5,2,0,0,1189,1190,5,27,0,0,1190,1191,3,152,
        76,0,1191,1192,3,188,94,0,1192,1193,5,3,0,0,1193,201,1,0,0,0,1194,
        1195,5,2,0,0,1195,1196,5,30,0,0,1196,1197,3,152,76,0,1197,1198,3,
        152,76,0,1198,1199,5,3,0,0,1199,203,1,0,0,0,1200,1201,5,2,0,0,1201,
        1203,3,152,76,0,1202,1204,3,206,103,0,1203,1202,1,0,0,0,1203,1204,
        1,0,0,0,1204,1208,1,0,0,0,1205,1207,3,152,76,0,1206,1205,1,0,0,0,
        1207,1210,1,0,0,0,1208,1206,1,0,0,0,1208,1209,1,0,0,0,1209,1211,
        1,0,0,0,1210,1208,1,0,0,0,1211,1212,5,3,0,0,1212,205,1,0,0,0,1213,
        1214,5,2,0,0,1214,1216,5,68,0,0,1215,1217,3,84,42,0,1216,1215,1,
        0,0,0,1217,1218,1,0,0,0,1218,1216,1,0,0,0,1218,1219,1,0,0,0,1219,
        1220,1,0,0,0,1220,1221,5,3,0,0,1221,207,1,0,0,0,1222,1233,5,2,0,
        0,1223,1230,3,210,105,0,1224,1226,5,4,0,0,1225,1224,1,0,0,0,1225,
        1226,1,0,0,0,1226,1227,1,0,0,0,1227,1229,3,210,105,0,1228,1225,1,
        0,0,0,1229,1232,1,0,0,0,1230,1228,1,0,0,0,1230,1231,1,0,0,0,1231,
        1234,1,0,0,0,1232,1230,1,0,0,0,1233,1223,1,0,0,0,1233,1234,1,0,0,
        0,1234,1235,1,0,0,0,1235,1236,5,3,0,0,1236,209,1,0,0,0,1237,1238,
        5,2,0,0,1238,1239,5,91,0,0,1239,1240,5,3,0,0,1240,211,1,0,0,0,1241,
        1242,7,4,0,0,1242,213,1,0,0,0,98,219,230,239,254,263,266,276,285,
        290,293,296,306,310,313,328,337,348,357,363,366,376,386,394,404,
        416,424,434,442,450,454,461,466,469,477,496,504,511,528,535,551,
        561,571,579,591,601,619,626,636,649,658,678,686,696,710,725,730,
        736,746,756,765,770,816,826,837,843,850,859,867,870,873,897,905,
        909,919,929,942,954,966,997,1008,1019,1041,1052,1064,1076,1095,1103,
        1108,1118,1136,1144,1154,1203,1208,1218,1225,1230,1233
    ];

    private static __ATN: antlr.ATN;
    public static get _ATN(): antlr.ATN {
        if (!Stage3EParser.__ATN) {
            Stage3EParser.__ATN = new antlr.ATNDeserializer().deserialize(Stage3EParser._serializedATN);
        }

        return Stage3EParser.__ATN;
    }


    private static readonly vocabulary = new antlr.Vocabulary(Stage3EParser.literalNames, Stage3EParser.symbolicNames, []);

    public override get vocabulary(): antlr.Vocabulary {
        return Stage3EParser.vocabulary;
    }

    private static readonly decisionsToDFA = Stage3EParser._ATN.decisionToState.map( (ds: antlr.DecisionState, index: number) => new antlr.DFA(ds, index) );
}

export class ProgramContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.LPAREN, 0)!;
    }
    public PROGRAM(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.PROGRAM, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.RPAREN, 0)!;
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
        return Stage3EParser.RULE_program;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterProgram) {
             listener.enterProgram(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return Stage3EParser.RULE_topLevel;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterTopLevel) {
             listener.enterTopLevel(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.LPAREN, 0)!;
    }
    public DEFMACRO(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.DEFMACRO, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.IDENTIFIER, 0)!;
    }
    public fnSignature(): FnSignatureContext {
        return this.getRuleContext(0, FnSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.RPAREN, 0)!;
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
        return Stage3EParser.RULE_defmacro;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterDefmacro) {
             listener.enterDefmacro(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.LPAREN, 0)!;
    }
    public DEF(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.DEF, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.IDENTIFIER, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3EParser.RULE_def;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterDef) {
             listener.enterDef(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.LPAREN, 0)!;
    }
    public TYPE(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.TYPE, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.IDENTIFIER, 0)!;
    }
    public typeExpr(): TypeExprContext {
        return this.getRuleContext(0, TypeExprContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.RPAREN, 0)!;
    }
    public typeParams(): TypeParamsContext | null {
        return this.getRuleContext(0, TypeParamsContext);
    }
    public override get ruleIndex(): number {
        return Stage3EParser.RULE_typeAlias;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterTypeAlias) {
             listener.enterTypeAlias(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.LPAREN, 0)!;
    }
    public INTERFACE(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.INTERFACE, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.IDENTIFIER, 0)!;
    }
    public typeObject(): TypeObjectContext {
        return this.getRuleContext(0, TypeObjectContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.RPAREN, 0)!;
    }
    public typeParams(): TypeParamsContext | null {
        return this.getRuleContext(0, TypeParamsContext);
    }
    public interfaceExtends(): InterfaceExtendsContext | null {
        return this.getRuleContext(0, InterfaceExtendsContext);
    }
    public override get ruleIndex(): number {
        return Stage3EParser.RULE_interfaceDef;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterInterfaceDef) {
             listener.enterInterfaceDef(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.LPAREN, 0)!;
    }
    public EXTENDS(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.EXTENDS, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.RPAREN, 0)!;
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
        return Stage3EParser.RULE_interfaceExtends;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterInterfaceExtends) {
             listener.enterInterfaceExtends(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.LPAREN, 0)!;
    }
    public CLASS(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.CLASS, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.IDENTIFIER, 0)!;
    }
    public classBody(): ClassBodyContext {
        return this.getRuleContext(0, ClassBodyContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.RPAREN, 0)!;
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
        return Stage3EParser.RULE_classDef;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterClassDef) {
             listener.enterClassDef(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.LPAREN, 0)!;
    }
    public CLASS(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.CLASS, 0)!;
    }
    public classBody(): ClassBodyContext {
        return this.getRuleContext(0, ClassBodyContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.RPAREN, 0)!;
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
        return Stage3EParser.RULE_anonClassDef;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterAnonClassDef) {
             listener.enterAnonClassDef(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.LPAREN, 0)!;
    }
    public EXTENDS(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.EXTENDS, 0)!;
    }
    public typeExpr(): TypeExprContext {
        return this.getRuleContext(0, TypeExprContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3EParser.RULE_classExtends;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterClassExtends) {
             listener.enterClassExtends(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.LPAREN, 0)!;
    }
    public IMPLEMENTS(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.IMPLEMENTS, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.RPAREN, 0)!;
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
        return Stage3EParser.RULE_classImplements;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterClassImplements) {
             listener.enterClassImplements(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.LPAREN, 0)!;
    }
    public CLASS_BODY(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.CLASS_BODY, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.RPAREN, 0)!;
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
        return Stage3EParser.RULE_classBody;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterClassBody) {
             listener.enterClassBody(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return Stage3EParser.RULE_classElement;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterClassElement) {
             listener.enterClassElement(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.KEYWORD, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3EParser.RULE_modifier;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterModifier) {
             listener.enterModifier(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.LPAREN, 0)!;
    }
    public FIELD(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.FIELD, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.RPAREN, 0)!;
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
        return this.getToken(Stage3EParser.COLON, 0);
    }
    public typeExpr(): TypeExprContext | null {
        return this.getRuleContext(0, TypeExprContext);
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public override get ruleIndex(): number {
        return Stage3EParser.RULE_fieldDef;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterFieldDef) {
             listener.enterFieldDef(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.LPAREN, 0)!;
    }
    public CONSTRUCTOR(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.CONSTRUCTOR, 0)!;
    }
    public fnSignatureTyped(): FnSignatureTypedContext {
        return this.getRuleContext(0, FnSignatureTypedContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.RPAREN, 0)!;
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
        return Stage3EParser.RULE_constructorDef;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterConstructorDef) {
             listener.enterConstructorDef(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.LPAREN, 0)!;
    }
    public METHOD(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.METHOD, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.IDENTIFIER, 0)!;
    }
    public fnSignatureTyped(): FnSignatureTypedContext {
        return this.getRuleContext(0, FnSignatureTypedContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.RPAREN, 0)!;
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
        return Stage3EParser.RULE_classMethodDef;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterClassMethodDef) {
             listener.enterClassMethodDef(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.LPAREN, 0)!;
    }
    public ABSTRACT_METHOD(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.ABSTRACT_METHOD, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.IDENTIFIER, 0)!;
    }
    public fnSignatureTyped(): FnSignatureTypedContext {
        return this.getRuleContext(0, FnSignatureTypedContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.RPAREN, 0)!;
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
        return Stage3EParser.RULE_abstractMethodDef;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterAbstractMethodDef) {
             listener.enterAbstractMethodDef(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.LPAREN, 0)!;
    }
    public GET(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.GET, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.IDENTIFIER, 0)!;
    }
    public fnSignatureTyped(): FnSignatureTypedContext {
        return this.getRuleContext(0, FnSignatureTypedContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.RPAREN, 0)!;
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
        return Stage3EParser.RULE_getterDef;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterGetterDef) {
             listener.enterGetterDef(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.LPAREN, 0)!;
    }
    public SETPROP(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.SETPROP, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.IDENTIFIER, 0)!;
    }
    public fnSignatureTyped(): FnSignatureTypedContext {
        return this.getRuleContext(0, FnSignatureTypedContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.RPAREN, 0)!;
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
        return Stage3EParser.RULE_setterDef;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterSetterDef) {
             listener.enterSetterDef(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.RPAREN, 0)!;
    }
    public OPTIONAL(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.OPTIONAL, 0);
    }
    public COLON(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.COLON, 0);
    }
    public typeExpr(): TypeExprContext | null {
        return this.getRuleContext(0, TypeExprContext);
    }
    public override get ruleIndex(): number {
        return Stage3EParser.RULE_typedParam;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterTypedParam) {
             listener.enterTypedParam(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
    		return this.getTokens(Stage3EParser.LPAREN);
    	} else {
    		return this.getToken(Stage3EParser.LPAREN, i);
    	}
    }
    public RPAREN(): antlr.TerminalNode[];
    public RPAREN(i: number): antlr.TerminalNode | null;
    public RPAREN(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage3EParser.RPAREN);
    	} else {
    		return this.getToken(Stage3EParser.RPAREN, i);
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
        return this.getToken(Stage3EParser.RETURNS, 0);
    }
    public typeExpr(): TypeExprContext | null {
        return this.getRuleContext(0, TypeExprContext);
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage3EParser.COMMA);
    	} else {
    		return this.getToken(Stage3EParser.COMMA, i);
    	}
    }
    public override get ruleIndex(): number {
        return Stage3EParser.RULE_fnSignatureTyped;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterFnSignatureTyped) {
             listener.enterFnSignatureTyped(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return Stage3EParser.RULE_statement;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterStatement) {
             listener.enterStatement(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
    		return this.getTokens(Stage3EParser.LPAREN);
    	} else {
    		return this.getToken(Stage3EParser.LPAREN, i);
    	}
    }
    public LETSTAR(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.LETSTAR, 0)!;
    }
    public RPAREN(): antlr.TerminalNode[];
    public RPAREN(i: number): antlr.TerminalNode | null;
    public RPAREN(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage3EParser.RPAREN);
    	} else {
    		return this.getToken(Stage3EParser.RPAREN, i);
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
        return Stage3EParser.RULE_letStar;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterLetStar) {
             listener.enterLetStar(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.LPAREN, 0)!;
    }
    public LET(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.LET, 0)!;
    }
    public singleBinding(): SingleBindingContext {
        return this.getRuleContext(0, SingleBindingContext)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3EParser.RULE_letStmt;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterLetStmt) {
             listener.enterLetStmt(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
    		return this.getTokens(Stage3EParser.LPAREN);
    	} else {
    		return this.getToken(Stage3EParser.LPAREN, i);
    	}
    }
    public CONSTSTAR(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.CONSTSTAR, 0)!;
    }
    public RPAREN(): antlr.TerminalNode[];
    public RPAREN(i: number): antlr.TerminalNode | null;
    public RPAREN(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage3EParser.RPAREN);
    	} else {
    		return this.getToken(Stage3EParser.RPAREN, i);
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
        return Stage3EParser.RULE_constStar;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterConstStar) {
             listener.enterConstStar(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.LPAREN, 0)!;
    }
    public CONST(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.CONST, 0)!;
    }
    public singleBinding(): SingleBindingContext {
        return this.getRuleContext(0, SingleBindingContext)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3EParser.RULE_constStmt;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterConstStmt) {
             listener.enterConstStmt(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.LPAREN, 0)!;
    }
    public IF(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.IF, 0)!;
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
        return this.getToken(Stage3EParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3EParser.RULE_ifForm;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterIfForm) {
             listener.enterIfForm(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.LPAREN, 0)!;
    }
    public WHILE(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.WHILE, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.RPAREN, 0)!;
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
        return Stage3EParser.RULE_whileForm;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterWhileForm) {
             listener.enterWhileForm(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.LPAREN, 0)!;
    }
    public BEGIN(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.BEGIN, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.RPAREN, 0)!;
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
        return Stage3EParser.RULE_block;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterBlock) {
             listener.enterBlock(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.LPAREN, 0)!;
    }
    public RETURN(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.RETURN, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.RPAREN, 0)!;
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public override get ruleIndex(): number {
        return Stage3EParser.RULE_returnForm;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterReturnForm) {
             listener.enterReturnForm(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.LPAREN, 0)!;
    }
    public THROW(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.THROW, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3EParser.RULE_throwForm;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterThrowForm) {
             listener.enterThrowForm(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.LPAREN, 0)!;
    }
    public IMPORT(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.IMPORT, 0)!;
    }
    public STRING(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.STRING, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.RPAREN, 0)!;
    }
    public objectExpr(): ObjectExprContext | null {
        return this.getRuleContext(0, ObjectExprContext);
    }
    public override get ruleIndex(): number {
        return Stage3EParser.RULE_importForm;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterImportForm) {
             listener.enterImportForm(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return Stage3EParser.RULE_exportForm;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterExportForm) {
             listener.enterExportForm(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.LPAREN, 0)!;
    }
    public EXPORT(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.EXPORT, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.IDENTIFIER, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3EParser.RULE_exportBinding;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterExportBinding) {
             listener.enterExportBinding(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.LPAREN, 0)!;
    }
    public EXPORT_DEFAULT(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.EXPORT_DEFAULT, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3EParser.RULE_exportDefault;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterExportDefault) {
             listener.enterExportDefault(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.LPAREN, 0)!;
    }
    public EXPORT_NAMED(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.EXPORT_NAMED, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.RPAREN, 0)!;
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
        return Stage3EParser.RULE_exportNamed;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterExportNamed) {
             listener.enterExportNamed(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode[];
    public IDENTIFIER(i: number): antlr.TerminalNode | null;
    public IDENTIFIER(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage3EParser.IDENTIFIER);
    	} else {
    		return this.getToken(Stage3EParser.IDENTIFIER, i);
    	}
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3EParser.RULE_exportNamePair;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterExportNamePair) {
             listener.enterExportNamePair(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.LPAREN, 0)!;
    }
    public EXPORT_FROM(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.EXPORT_FROM, 0)!;
    }
    public STRING(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.STRING, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.RPAREN, 0)!;
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
        return Stage3EParser.RULE_exportFrom;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterExportFrom) {
             listener.enterExportFrom(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.LPAREN, 0)!;
    }
    public EXPORT_ALL_FROM(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.EXPORT_ALL_FROM, 0)!;
    }
    public STRING(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.STRING, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3EParser.RULE_exportAllFrom;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterExportAllFrom) {
             listener.enterExportAllFrom(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.IDENTIFIER, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.RPAREN, 0)!;
    }
    public COLON(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.COLON, 0);
    }
    public typeExpr(): TypeExprContext | null {
        return this.getRuleContext(0, TypeExprContext);
    }
    public override get ruleIndex(): number {
        return Stage3EParser.RULE_starBinding;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterStarBinding) {
             listener.enterStarBinding(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.RPAREN, 0)!;
    }
    public COLON(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.COLON, 0);
    }
    public typeExpr(): TypeExprContext | null {
        return this.getRuleContext(0, TypeExprContext);
    }
    public override get ruleIndex(): number {
        return Stage3EParser.RULE_singleBinding;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterSingleBinding) {
             listener.enterSingleBinding(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.IDENTIFIER, 0);
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
        return Stage3EParser.RULE_typeExpr;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterTypeExpr) {
             listener.enterTypeExpr(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.LPAREN, 0)!;
    }
    public UNION(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.UNION, 0)!;
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
        return this.getToken(Stage3EParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3EParser.RULE_typeUnion;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterTypeUnion) {
             listener.enterTypeUnion(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.LPAREN, 0)!;
    }
    public INTERSECT(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.INTERSECT, 0)!;
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
        return this.getToken(Stage3EParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3EParser.RULE_typeIntersection;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterTypeIntersection) {
             listener.enterTypeIntersection(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.LPAREN, 0)!;
    }
    public ARRAY(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.ARRAY, 0)!;
    }
    public typeExpr(): TypeExprContext {
        return this.getRuleContext(0, TypeExprContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3EParser.RULE_typeArray;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterTypeArray) {
             listener.enterTypeArray(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.LPAREN, 0)!;
    }
    public TUPLE(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.TUPLE, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.RPAREN, 0)!;
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
        return Stage3EParser.RULE_typeTuple;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterTypeTuple) {
             listener.enterTypeTuple(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.LPAREN, 0);
    }
    public REST(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.REST, 0);
    }
    public typeExpr(): TypeExprContext {
        return this.getRuleContext(0, TypeExprContext)!;
    }
    public RPAREN(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.RPAREN, 0);
    }
    public IDENTIFIER(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.IDENTIFIER, 0);
    }
    public override get ruleIndex(): number {
        return Stage3EParser.RULE_typeTupleElement;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterTypeTupleElement) {
             listener.enterTypeTupleElement(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
    		return this.getTokens(Stage3EParser.LPAREN);
    	} else {
    		return this.getToken(Stage3EParser.LPAREN, i);
    	}
    }
    public TYPEFN(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.TYPEFN, 0)!;
    }
    public RPAREN(): antlr.TerminalNode[];
    public RPAREN(i: number): antlr.TerminalNode | null;
    public RPAREN(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage3EParser.RPAREN);
    	} else {
    		return this.getToken(Stage3EParser.RPAREN, i);
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
        return Stage3EParser.RULE_typeFunction;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterTypeFunction) {
             listener.enterTypeFunction(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.IDENTIFIER, 0)!;
    }
    public typeExpr(): TypeExprContext {
        return this.getRuleContext(0, TypeExprContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.RPAREN, 0)!;
    }
    public OPTIONAL(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.OPTIONAL, 0);
    }
    public override get ruleIndex(): number {
        return Stage3EParser.RULE_typeFnParam;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterTypeFnParam) {
             listener.enterTypeFnParam(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.RPAREN, 0)!;
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
        return Stage3EParser.RULE_typeObject;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterTypeObject) {
             listener.enterTypeObject(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.IDENTIFIER, 0)!;
    }
    public typeExpr(): TypeExprContext {
        return this.getRuleContext(0, TypeExprContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.RPAREN, 0)!;
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
        return this.getToken(Stage3EParser.OPTIONAL, 0);
    }
    public override get ruleIndex(): number {
        return Stage3EParser.RULE_typeProp;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterTypeProp) {
             listener.enterTypeProp(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.READONLY, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3EParser.RULE_propModifier;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterPropModifier) {
             listener.enterPropModifier(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.LPAREN, 0)!;
    }
    public LIT(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.LIT, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.RPAREN, 0)!;
    }
    public STRING(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.STRING, 0);
    }
    public BACKTICK_STRING(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.BACKTICK_STRING, 0);
    }
    public NUMBER(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.NUMBER, 0);
    }
    public BOOLEAN(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.BOOLEAN, 0);
    }
    public override get ruleIndex(): number {
        return Stage3EParser.RULE_typeLiteral;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterTypeLiteral) {
             listener.enterTypeLiteral(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.LPAREN, 0)!;
    }
    public KEYOF(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.KEYOF, 0)!;
    }
    public typeExpr(): TypeExprContext {
        return this.getRuleContext(0, TypeExprContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3EParser.RULE_typeKeyof;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterTypeKeyof) {
             listener.enterTypeKeyof(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.LPAREN, 0)!;
    }
    public TYPEOF(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.TYPEOF, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3EParser.RULE_typeTypeof;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterTypeTypeof) {
             listener.enterTypeTypeof(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.LPAREN, 0)!;
    }
    public INDEX(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.INDEX, 0)!;
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
        return this.getToken(Stage3EParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3EParser.RULE_typeIndexAccess;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterTypeIndexAccess) {
             listener.enterTypeIndexAccess(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.LPAREN, 0)!;
    }
    public COND(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.COND, 0)!;
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
        return this.getToken(Stage3EParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3EParser.RULE_typeConditional;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterTypeConditional) {
             listener.enterTypeConditional(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.LPAREN, 0)!;
    }
    public INFER(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.INFER, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3EParser.RULE_typeInfer;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterTypeInfer) {
             listener.enterTypeInfer(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.LPAREN, 0)!;
    }
    public MAPPED(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.MAPPED, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.IDENTIFIER, 0)!;
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
        return this.getToken(Stage3EParser.RPAREN, 0)!;
    }
    public mappedModifiers(): MappedModifiersContext | null {
        return this.getRuleContext(0, MappedModifiersContext);
    }
    public override get ruleIndex(): number {
        return Stage3EParser.RULE_typeMapped;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterTypeMapped) {
             listener.enterTypeMapped(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.LPAREN, 0)!;
    }
    public MODIFIERS(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.MODIFIERS, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.RPAREN, 0)!;
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
        return Stage3EParser.RULE_mappedModifiers;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterMappedModifiers) {
             listener.enterMappedModifiers(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.READONLY, 0);
    }
    public OPTIONAL(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.OPTIONAL, 0);
    }
    public override get ruleIndex(): number {
        return Stage3EParser.RULE_mappedModifier;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterMappedModifier) {
             listener.enterMappedModifier(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.LPAREN, 0)!;
    }
    public TEMPLATE(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.TEMPLATE, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.RPAREN, 0)!;
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
        return Stage3EParser.RULE_typeTemplateLiteral;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterTypeTemplateLiteral) {
             listener.enterTypeTemplateLiteral(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.STRING, 0);
    }
    public typeExpr(): TypeExprContext | null {
        return this.getRuleContext(0, TypeExprContext);
    }
    public override get ruleIndex(): number {
        return Stage3EParser.RULE_templatePart;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterTemplatePart) {
             listener.enterTemplatePart(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.LPAREN, 0)!;
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
        return this.getToken(Stage3EParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3EParser.RULE_typeApplication;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterTypeApplication) {
             listener.enterTypeApplication(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.LPAREN, 0)!;
    }
    public TYPE_PARAMS(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.TYPE_PARAMS, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.RPAREN, 0)!;
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
        return Stage3EParser.RULE_typeParams;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterTypeParams) {
             listener.enterTypeParams(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.IDENTIFIER, 0)!;
    }
    public LPAREN(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.LPAREN, 0);
    }
    public RPAREN(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.RPAREN, 0);
    }
    public typeParamConstraint(): TypeParamConstraintContext | null {
        return this.getRuleContext(0, TypeParamConstraintContext);
    }
    public typeParamDefault(): TypeParamDefaultContext | null {
        return this.getRuleContext(0, TypeParamDefaultContext);
    }
    public override get ruleIndex(): number {
        return Stage3EParser.RULE_typeParamDecl;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterTypeParamDecl) {
             listener.enterTypeParamDecl(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.LPAREN, 0)!;
    }
    public EXTENDS(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.EXTENDS, 0)!;
    }
    public typeExpr(): TypeExprContext {
        return this.getRuleContext(0, TypeExprContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3EParser.RULE_typeParamConstraint;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterTypeParamConstraint) {
             listener.enterTypeParamConstraint(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.LPAREN, 0)!;
    }
    public DEFAULT(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.DEFAULT, 0)!;
    }
    public typeExpr(): TypeExprContext {
        return this.getRuleContext(0, TypeExprContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3EParser.RULE_typeParamDefault;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterTypeParamDefault) {
             listener.enterTypeParamDefault(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.LPAREN, 0)!;
    }
    public SET(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.SET, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.IDENTIFIER, 0);
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.RPAREN, 0)!;
    }
    public propAccess(): PropAccessContext | null {
        return this.getRuleContext(0, PropAccessContext);
    }
    public override get ruleIndex(): number {
        return Stage3EParser.RULE_assign;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterAssign) {
             listener.enterAssign(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.LPAREN, 0)!;
    }
    public SWITCH(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.SWITCH, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.RPAREN, 0)!;
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
        return Stage3EParser.RULE_switchForm;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterSwitchForm) {
             listener.enterSwitchForm(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.LPAREN, 0)!;
    }
    public CASE(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.CASE, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.RPAREN, 0)!;
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
        return Stage3EParser.RULE_caseClause;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterCaseClause) {
             listener.enterCaseClause(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.LPAREN, 0)!;
    }
    public DEFAULT(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.DEFAULT, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.RPAREN, 0)!;
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
        return Stage3EParser.RULE_defaultClause;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterDefaultClause) {
             listener.enterDefaultClause(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.LPAREN, 0)!;
    }
    public FOR(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.FOR, 0)!;
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
        return this.getToken(Stage3EParser.RPAREN, 0)!;
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
        return Stage3EParser.RULE_forForm;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterForForm) {
             listener.enterForForm(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.LPAREN, 0)!;
    }
    public FORIN(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.FORIN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.IDENTIFIER, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.RPAREN, 0)!;
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
        return Stage3EParser.RULE_forInForm;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterForInForm) {
             listener.enterForInForm(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.LPAREN, 0)!;
    }
    public FOROF(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.FOROF, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.IDENTIFIER, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.RPAREN, 0)!;
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
        return Stage3EParser.RULE_forOfForm;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterForOfForm) {
             listener.enterForOfForm(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.KEYWORD, 0);
    }
    public IDENTIFIER(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.IDENTIFIER, 0);
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
        return Stage3EParser.RULE_expression;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterExpression) {
             listener.enterExpression(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.THIS, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3EParser.RULE_thisExpr;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterThisExpr) {
             listener.enterThisExpr(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.SUPER, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3EParser.RULE_superExpr;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterSuperExpr) {
             listener.enterSuperExpr(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.LPAREN, 0)!;
    }
    public SUPER(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.SUPER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.RPAREN, 0)!;
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
        return Stage3EParser.RULE_superConstructorCall;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterSuperConstructorCall) {
             listener.enterSuperConstructorCall(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.LPAREN, 0)!;
    }
    public SUPER_METHOD(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.SUPER_METHOD, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.RPAREN, 0)!;
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
        return Stage3EParser.RULE_superMethodCall;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterSuperMethodCall) {
             listener.enterSuperMethodCall(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.LPAREN, 0)!;
    }
    public TYPEOF(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.TYPEOF, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3EParser.RULE_typeofExpr;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterTypeofExpr) {
             listener.enterTypeofExpr(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.LPAREN, 0)!;
    }
    public TYPE_AS(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.TYPE_AS, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public typeExpr(): TypeExprContext {
        return this.getRuleContext(0, TypeExprContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3EParser.RULE_typeAssert;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterTypeAssert) {
             listener.enterTypeAssert(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.LPAREN, 0)!;
    }
    public LAMBDA(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.LAMBDA, 0)!;
    }
    public fnSignature(): FnSignatureContext {
        return this.getRuleContext(0, FnSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.RPAREN, 0)!;
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
        return Stage3EParser.RULE_lambda;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterLambda) {
             listener.enterLambda(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.LPAREN, 0)!;
    }
    public FN(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.FN, 0)!;
    }
    public fnSignature(): FnSignatureContext {
        return this.getRuleContext(0, FnSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.RPAREN, 0)!;
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
        return Stage3EParser.RULE_fn;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterFn) {
             listener.enterFn(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.LPAREN, 0)!;
    }
    public BIND(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.BIND, 0)!;
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
        return this.getToken(Stage3EParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3EParser.RULE_bindExpr;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterBindExpr) {
             listener.enterBindExpr(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.LPAREN, 0)!;
    }
    public METHOD_CALL(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.METHOD_CALL, 0)!;
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
        return this.getToken(Stage3EParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3EParser.RULE_methodCallExpr;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterMethodCallExpr) {
             listener.enterMethodCallExpr(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.LPAREN, 0)!;
    }
    public TERNARY(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.TERNARY, 0)!;
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
        return this.getToken(Stage3EParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3EParser.RULE_ternary;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterTernary) {
             listener.enterTernary(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.LPAREN, 0)!;
    }
    public COND(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.COND, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.RPAREN, 0)!;
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
        return Stage3EParser.RULE_condExpr;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterCondExpr) {
             listener.enterCondExpr(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.LPAREN, 0)!;
    }
    public NEW(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.NEW, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.RPAREN, 0)!;
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
        return Stage3EParser.RULE_newForm;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterNewForm) {
             listener.enterNewForm(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.LPAREN, 0)!;
    }
    public OBJECT(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.OBJECT, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.RPAREN, 0)!;
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
        return Stage3EParser.RULE_objectExpr;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterObjectExpr) {
             listener.enterObjectExpr(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.LPAREN, 0)!;
    }
    public propKey(): PropKeyContext | null {
        return this.getRuleContext(0, PropKeyContext);
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.RPAREN, 0)!;
    }
    public methodDef(): MethodDefContext | null {
        return this.getRuleContext(0, MethodDefContext);
    }
    public IDENTIFIER(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.IDENTIFIER, 0);
    }
    public override get ruleIndex(): number {
        return Stage3EParser.RULE_objectField;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterObjectField) {
             listener.enterObjectField(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.LPAREN, 0)!;
    }
    public METHOD(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.METHOD, 0)!;
    }
    public fnSignature(): FnSignatureContext {
        return this.getRuleContext(0, FnSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.RPAREN, 0)!;
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
        return Stage3EParser.RULE_methodDef;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterMethodDef) {
             listener.enterMethodDef(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.LPAREN, 0)!;
    }
    public ARRAY(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.ARRAY, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.RPAREN, 0)!;
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
        return Stage3EParser.RULE_arrayExpr;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterArrayExpr) {
             listener.enterArrayExpr(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.IDENTIFIER, 0);
    }
    public KEYWORD(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.KEYWORD, 0);
    }
    public STRING(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.STRING, 0);
    }
    public BACKTICK_STRING(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.BACKTICK_STRING, 0);
    }
    public PROGRAM(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.PROGRAM, 0);
    }
    public LETSTAR(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.LETSTAR, 0);
    }
    public LET(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.LET, 0);
    }
    public CONSTSTAR(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.CONSTSTAR, 0);
    }
    public CONST(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.CONST, 0);
    }
    public LAMBDA(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.LAMBDA, 0);
    }
    public FN(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.FN, 0);
    }
    public METHOD(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.METHOD, 0);
    }
    public BIND(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.BIND, 0);
    }
    public METHOD_CALL(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.METHOD_CALL, 0);
    }
    public DEF(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.DEF, 0);
    }
    public DEFMACRO(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.DEFMACRO, 0);
    }
    public IF(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.IF, 0);
    }
    public WHILE(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.WHILE, 0);
    }
    public BEGIN(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.BEGIN, 0);
    }
    public RETURN(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.RETURN, 0);
    }
    public THROW(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.THROW, 0);
    }
    public SET(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.SET, 0);
    }
    public TERNARY(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.TERNARY, 0);
    }
    public COND(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.COND, 0);
    }
    public OBJECT(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.OBJECT, 0);
    }
    public ARRAY(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.ARRAY, 0);
    }
    public INDEX(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.INDEX, 0);
    }
    public QUASI(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.QUASI, 0);
    }
    public QUOTE(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.QUOTE, 0);
    }
    public UNQUOTE_SPLICING(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.UNQUOTE_SPLICING, 0);
    }
    public UNQUOTE(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.UNQUOTE, 0);
    }
    public NEW(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.NEW, 0);
    }
    public IMPORT(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.IMPORT, 0);
    }
    public SWITCH(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.SWITCH, 0);
    }
    public CASE(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.CASE, 0);
    }
    public DEFAULT(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.DEFAULT, 0);
    }
    public FORIN(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.FORIN, 0);
    }
    public FOROF(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.FOROF, 0);
    }
    public FOR(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.FOR, 0);
    }
    public UNION(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.UNION, 0);
    }
    public INTERSECT(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.INTERSECT, 0);
    }
    public TUPLE(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.TUPLE, 0);
    }
    public TYPEFN(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.TYPEFN, 0);
    }
    public LIT(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.LIT, 0);
    }
    public KEYOF(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.KEYOF, 0);
    }
    public TYPEOF(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.TYPEOF, 0);
    }
    public INFER(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.INFER, 0);
    }
    public MAPPED(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.MAPPED, 0);
    }
    public TEMPLATE(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.TEMPLATE, 0);
    }
    public REST(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.REST, 0);
    }
    public READONLY(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.READONLY, 0);
    }
    public TYPE_AS(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.TYPE_AS, 0);
    }
    public TYPE_PARAMS(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.TYPE_PARAMS, 0);
    }
    public TYPE_ARGS(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.TYPE_ARGS, 0);
    }
    public EXTENDS(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.EXTENDS, 0);
    }
    public RETURNS(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.RETURNS, 0);
    }
    public TYPE(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.TYPE, 0);
    }
    public INTERFACE(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.INTERFACE, 0);
    }
    public MODIFIERS(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.MODIFIERS, 0);
    }
    public BOOLEAN(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.BOOLEAN, 0);
    }
    public NULL(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.NULL, 0);
    }
    public UNDEFINED(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.UNDEFINED, 0);
    }
    public EXPORT(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.EXPORT, 0);
    }
    public EXPORT_DEFAULT(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.EXPORT_DEFAULT, 0);
    }
    public EXPORT_NAMED(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.EXPORT_NAMED, 0);
    }
    public EXPORT_FROM(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.EXPORT_FROM, 0);
    }
    public EXPORT_ALL_FROM(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.EXPORT_ALL_FROM, 0);
    }
    public CLASS(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.CLASS, 0);
    }
    public CLASS_BODY(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.CLASS_BODY, 0);
    }
    public FIELD(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.FIELD, 0);
    }
    public CONSTRUCTOR(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.CONSTRUCTOR, 0);
    }
    public THIS(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.THIS, 0);
    }
    public SUPER(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.SUPER, 0);
    }
    public SUPER_METHOD(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.SUPER_METHOD, 0);
    }
    public GET(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.GET, 0);
    }
    public SETPROP(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.SETPROP, 0);
    }
    public ABSTRACT_METHOD(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.ABSTRACT_METHOD, 0);
    }
    public IMPLEMENTS(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.IMPLEMENTS, 0);
    }
    public override get ruleIndex(): number {
        return Stage3EParser.RULE_propKey;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterPropKey) {
             listener.enterPropKey(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.LPAREN, 0)!;
    }
    public DOT(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.DOT, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public propKey(): PropKeyContext {
        return this.getRuleContext(0, PropKeyContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3EParser.RULE_propAccess;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterPropAccess) {
             listener.enterPropAccess(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.LPAREN, 0)!;
    }
    public INDEX(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.INDEX, 0)!;
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
        return this.getToken(Stage3EParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3EParser.RULE_indexAccess;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterIndexAccess) {
             listener.enterIndexAccess(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.LPAREN, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.RPAREN, 0)!;
    }
    public QUASI(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.QUASI, 0);
    }
    public QUOTE(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.QUOTE, 0);
    }
    public override get ruleIndex(): number {
        return Stage3EParser.RULE_quasiquote;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterQuasiquote) {
             listener.enterQuasiquote(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.LPAREN, 0)!;
    }
    public UNQUOTE(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.UNQUOTE, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3EParser.RULE_unquote;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterUnquote) {
             listener.enterUnquote(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.LPAREN, 0)!;
    }
    public UNQUOTE_SPLICING(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.UNQUOTE_SPLICING, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3EParser.RULE_unquoteSplicing;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterUnquoteSplicing) {
             listener.enterUnquoteSplicing(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.LPAREN, 0)!;
    }
    public OPTCHAIN(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.OPTCHAIN, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public propKey(): PropKeyContext {
        return this.getRuleContext(0, PropKeyContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3EParser.RULE_optChain;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterOptChain) {
             listener.enterOptChain(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.LPAREN, 0)!;
    }
    public NULLCOAL(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.NULLCOAL, 0)!;
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
        return this.getToken(Stage3EParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3EParser.RULE_nullCoalesce;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterNullCoalesce) {
             listener.enterNullCoalesce(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.LPAREN, 0)!;
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
        return this.getToken(Stage3EParser.RPAREN, 0)!;
    }
    public typeArgs(): TypeArgsContext | null {
        return this.getRuleContext(0, TypeArgsContext);
    }
    public override get ruleIndex(): number {
        return Stage3EParser.RULE_call;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterCall) {
             listener.enterCall(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.LPAREN, 0)!;
    }
    public TYPE_ARGS(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.TYPE_ARGS, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.RPAREN, 0)!;
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
        return Stage3EParser.RULE_typeArgs;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterTypeArgs) {
             listener.enterTypeArgs(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.LPAREN, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.RPAREN, 0)!;
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
    		return this.getTokens(Stage3EParser.COMMA);
    	} else {
    		return this.getToken(Stage3EParser.COMMA, i);
    	}
    }
    public override get ruleIndex(): number {
        return Stage3EParser.RULE_fnSignature;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterFnSignature) {
             listener.enterFnSignature(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3EParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3EParser.RULE_param;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterParam) {
             listener.enterParam(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
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
        return this.getToken(Stage3EParser.NUMBER, 0);
    }
    public STRING(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.STRING, 0);
    }
    public BACKTICK_STRING(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.BACKTICK_STRING, 0);
    }
    public BOOLEAN(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.BOOLEAN, 0);
    }
    public NULL(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.NULL, 0);
    }
    public UNDEFINED(): antlr.TerminalNode | null {
        return this.getToken(Stage3EParser.UNDEFINED, 0);
    }
    public override get ruleIndex(): number {
        return Stage3EParser.RULE_literal;
    }
    public override enterRule(listener: Stage3EListener): void {
        if(listener.enterLiteral) {
             listener.enterLiteral(this);
        }
    }
    public override exitRule(listener: Stage3EListener): void {
        if(listener.exitLiteral) {
             listener.exitLiteral(this);
        }
    }
}
