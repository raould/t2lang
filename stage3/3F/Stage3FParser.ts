
import * as antlr from "antlr4ng";
import { Token } from "antlr4ng";

import { Stage3FListener } from "./Stage3FListener.js";
// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;


export class Stage3FParser extends antlr.Parser {
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
    public static readonly EXPORT_NS_FROM = 84;
    public static readonly EXPORT_FROM = 85;
    public static readonly EXPORT_ALL_FROM = 86;
    public static readonly IMPORT_TYPE = 87;
    public static readonly EXPORT_TYPE_ALL_FROM = 88;
    public static readonly EXPORT_TYPE_FROM = 89;
    public static readonly EXPORT_TYPE = 90;
    public static readonly KEYWORD = 91;
    public static readonly NUMBER = 92;
    public static readonly STRING = 93;
    public static readonly MULTILINE_STRING = 94;
    public static readonly BACKTICK_STRING = 95;
    public static readonly IDENTIFIER = 96;
    public static readonly WS = 97;
    public static readonly RULE_program = 0;
    public static readonly RULE_topLevel = 1;
    public static readonly RULE_decl = 2;
    public static readonly RULE_defmacro = 3;
    public static readonly RULE_def = 4;
    public static readonly RULE_typeAlias = 5;
    public static readonly RULE_interfaceDef = 6;
    public static readonly RULE_interfaceExtends = 7;
    public static readonly RULE_classDef = 8;
    public static readonly RULE_anonClassDef = 9;
    public static readonly RULE_classExtends = 10;
    public static readonly RULE_classImplements = 11;
    public static readonly RULE_classBody = 12;
    public static readonly RULE_classElement = 13;
    public static readonly RULE_modifier = 14;
    public static readonly RULE_fieldDef = 15;
    public static readonly RULE_constructorDef = 16;
    public static readonly RULE_classMethodDef = 17;
    public static readonly RULE_abstractMethodDef = 18;
    public static readonly RULE_getterDef = 19;
    public static readonly RULE_setterDef = 20;
    public static readonly RULE_typedParam = 21;
    public static readonly RULE_fnSignatureTyped = 22;
    public static readonly RULE_statement = 23;
    public static readonly RULE_letStar = 24;
    public static readonly RULE_letStmt = 25;
    public static readonly RULE_constStar = 26;
    public static readonly RULE_constStmt = 27;
    public static readonly RULE_ifForm = 28;
    public static readonly RULE_whileForm = 29;
    public static readonly RULE_block = 30;
    public static readonly RULE_returnForm = 31;
    public static readonly RULE_throwForm = 32;
    public static readonly RULE_importForm = 33;
    public static readonly RULE_importTypeForm = 34;
    public static readonly RULE_importTypeSpec = 35;
    public static readonly RULE_importTypeName = 36;
    public static readonly RULE_exportForm = 37;
    public static readonly RULE_exportBinding = 38;
    public static readonly RULE_exportDefault = 39;
    public static readonly RULE_exportNamed = 40;
    public static readonly RULE_exportNamePair = 41;
    public static readonly RULE_exportFrom = 42;
    public static readonly RULE_exportAllFrom = 43;
    public static readonly RULE_exportNsFromForm = 44;
    public static readonly RULE_exportTypeForm = 45;
    public static readonly RULE_exportTypeFromForm = 46;
    public static readonly RULE_exportTypeAllFromForm = 47;
    public static readonly RULE_exportDeclForm = 48;
    public static readonly RULE_starBinding = 49;
    public static readonly RULE_singleBinding = 50;
    public static readonly RULE_typeExpr = 51;
    public static readonly RULE_typeUnion = 52;
    public static readonly RULE_typeIntersection = 53;
    public static readonly RULE_typeArray = 54;
    public static readonly RULE_typeTuple = 55;
    public static readonly RULE_typeTupleElement = 56;
    public static readonly RULE_typeFunction = 57;
    public static readonly RULE_typeFnParam = 58;
    public static readonly RULE_typeObject = 59;
    public static readonly RULE_typeProp = 60;
    public static readonly RULE_propModifier = 61;
    public static readonly RULE_typeLiteral = 62;
    public static readonly RULE_typeKeyof = 63;
    public static readonly RULE_typeTypeof = 64;
    public static readonly RULE_typeIndexAccess = 65;
    public static readonly RULE_typeConditional = 66;
    public static readonly RULE_typeInfer = 67;
    public static readonly RULE_typeMapped = 68;
    public static readonly RULE_mappedModifiers = 69;
    public static readonly RULE_mappedModifier = 70;
    public static readonly RULE_typeTemplateLiteral = 71;
    public static readonly RULE_templatePart = 72;
    public static readonly RULE_typeApplication = 73;
    public static readonly RULE_typeParams = 74;
    public static readonly RULE_typeParamDecl = 75;
    public static readonly RULE_typeParamConstraint = 76;
    public static readonly RULE_typeParamDefault = 77;
    public static readonly RULE_assign = 78;
    public static readonly RULE_switchForm = 79;
    public static readonly RULE_caseClause = 80;
    public static readonly RULE_defaultClause = 81;
    public static readonly RULE_forForm = 82;
    public static readonly RULE_forInForm = 83;
    public static readonly RULE_forOfForm = 84;
    public static readonly RULE_expression = 85;
    public static readonly RULE_thisExpr = 86;
    public static readonly RULE_superExpr = 87;
    public static readonly RULE_superConstructorCall = 88;
    public static readonly RULE_superMethodCall = 89;
    public static readonly RULE_typeofExpr = 90;
    public static readonly RULE_typeAssert = 91;
    public static readonly RULE_lambda = 92;
    public static readonly RULE_fn = 93;
    public static readonly RULE_bindExpr = 94;
    public static readonly RULE_methodCallExpr = 95;
    public static readonly RULE_ternary = 96;
    public static readonly RULE_condExpr = 97;
    public static readonly RULE_newForm = 98;
    public static readonly RULE_objectExpr = 99;
    public static readonly RULE_objectField = 100;
    public static readonly RULE_methodDef = 101;
    public static readonly RULE_arrayExpr = 102;
    public static readonly RULE_propKey = 103;
    public static readonly RULE_propAccess = 104;
    public static readonly RULE_indexAccess = 105;
    public static readonly RULE_quasiquote = 106;
    public static readonly RULE_unquote = 107;
    public static readonly RULE_unquoteSplicing = 108;
    public static readonly RULE_optChain = 109;
    public static readonly RULE_nullCoalesce = 110;
    public static readonly RULE_call = 111;
    public static readonly RULE_typeArgs = 112;
    public static readonly RULE_fnSignature = 113;
    public static readonly RULE_param = 114;
    public static readonly RULE_literal = 115;

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
        "'export-ns-from'", "'export-from'", "'export-all-from'", "'import-type'", 
        "'export-type-all-from'", "'export-type-from'", "'export-type'"
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
        "EXPORT", "EXPORT_DEFAULT", "EXPORT_NAMED", "EXPORT_NS_FROM", "EXPORT_FROM", 
        "EXPORT_ALL_FROM", "IMPORT_TYPE", "EXPORT_TYPE_ALL_FROM", "EXPORT_TYPE_FROM", 
        "EXPORT_TYPE", "KEYWORD", "NUMBER", "STRING", "MULTILINE_STRING", 
        "BACKTICK_STRING", "IDENTIFIER", "WS"
    ];
    public static readonly ruleNames = [
        "program", "topLevel", "decl", "defmacro", "def", "typeAlias", "interfaceDef", 
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
        "superMethodCall", "typeofExpr", "typeAssert", "lambda", "fn", "bindExpr", 
        "methodCallExpr", "ternary", "condExpr", "newForm", "objectExpr", 
        "objectField", "methodDef", "arrayExpr", "propKey", "propAccess", 
        "indexAccess", "quasiquote", "unquote", "unquoteSplicing", "optChain", 
        "nullCoalesce", "call", "typeArgs", "fnSignature", "param", "literal",
    ];

    public get grammarFileName(): string { return "Stage3F.g4"; }
    public get literalNames(): (string | null)[] { return Stage3FParser.literalNames; }
    public get symbolicNames(): (string | null)[] { return Stage3FParser.symbolicNames; }
    public get ruleNames(): string[] { return Stage3FParser.ruleNames; }
    public get serializedATN(): number[] { return Stage3FParser._serializedATN; }

    protected createFailedPredicateException(predicate?: string, message?: string): antlr.FailedPredicateException {
        return new antlr.FailedPredicateException(this, predicate, message);
    }

    public constructor(input: antlr.TokenStream) {
        super(input);
        this.interpreter = new antlr.ParserATNSimulator(this, Stage3FParser._ATN, Stage3FParser.decisionsToDFA, new antlr.PredictionContextCache());
    }
    public program(): ProgramContext {
        let localContext = new ProgramContext(this.context, this.state);
        this.enterRule(localContext, 0, Stage3FParser.RULE_program);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 232;
            this.match(Stage3FParser.LPAREN);
            this.state = 233;
            this.match(Stage3FParser.PROGRAM);
            this.state = 237;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 469762051) !== 0) || ((((_la - 91)) & ~0x1F) === 0 && ((1 << (_la - 91)) & 55) !== 0)) {
                {
                {
                this.state = 234;
                this.topLevel();
                }
                }
                this.state = 239;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 240;
            this.match(Stage3FParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 2, Stage3FParser.RULE_topLevel);
        try {
            this.state = 249;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 1, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 242;
                this.defmacro();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 243;
                this.def();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 244;
                this.typeAlias();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 245;
                this.interfaceDef();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 246;
                this.classDef();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 247;
                this.exportDeclForm();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 248;
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
        this.enterRule(localContext, 4, Stage3FParser.RULE_decl);
        try {
            this.state = 255;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 2, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 251;
                this.def();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 252;
                this.classDef();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 253;
                this.interfaceDef();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 254;
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
        this.enterRule(localContext, 6, Stage3FParser.RULE_defmacro);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 257;
            this.match(Stage3FParser.LPAREN);
            this.state = 258;
            this.match(Stage3FParser.DEFMACRO);
            this.state = 259;
            this.match(Stage3FParser.IDENTIFIER);
            this.state = 260;
            this.fnSignature();
            this.state = 264;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 469762051) !== 0) || ((((_la - 91)) & ~0x1F) === 0 && ((1 << (_la - 91)) & 55) !== 0)) {
                {
                {
                this.state = 261;
                this.statement();
                }
                }
                this.state = 266;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 267;
            this.match(Stage3FParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 8, Stage3FParser.RULE_def);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 269;
            this.match(Stage3FParser.LPAREN);
            this.state = 270;
            this.match(Stage3FParser.DEF);
            this.state = 271;
            this.match(Stage3FParser.IDENTIFIER);
            this.state = 272;
            this.expression();
            this.state = 273;
            this.match(Stage3FParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 10, Stage3FParser.RULE_typeAlias);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 275;
            this.match(Stage3FParser.LPAREN);
            this.state = 276;
            this.match(Stage3FParser.TYPE);
            this.state = 277;
            this.match(Stage3FParser.IDENTIFIER);
            this.state = 279;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 4, this.context) ) {
            case 1:
                {
                this.state = 278;
                this.typeParams();
                }
                break;
            }
            this.state = 281;
            this.typeExpr();
            this.state = 282;
            this.match(Stage3FParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 12, Stage3FParser.RULE_interfaceDef);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 284;
            this.match(Stage3FParser.LPAREN);
            this.state = 285;
            this.match(Stage3FParser.INTERFACE);
            this.state = 286;
            this.match(Stage3FParser.IDENTIFIER);
            this.state = 288;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 5, this.context) ) {
            case 1:
                {
                this.state = 287;
                this.typeParams();
                }
                break;
            }
            this.state = 291;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 6, this.context) ) {
            case 1:
                {
                this.state = 290;
                this.interfaceExtends();
                }
                break;
            }
            this.state = 293;
            this.typeObject();
            this.state = 294;
            this.match(Stage3FParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 14, Stage3FParser.RULE_interfaceExtends);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 296;
            this.match(Stage3FParser.LPAREN);
            this.state = 297;
            this.match(Stage3FParser.EXTENDS);
            this.state = 299;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 298;
                this.typeExpr();
                }
                }
                this.state = 301;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 96);
            this.state = 303;
            this.match(Stage3FParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 16, Stage3FParser.RULE_classDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 305;
            this.match(Stage3FParser.LPAREN);
            this.state = 306;
            this.match(Stage3FParser.CLASS);
            this.state = 310;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 91) {
                {
                {
                this.state = 307;
                this.modifier();
                }
                }
                this.state = 312;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 313;
            this.match(Stage3FParser.IDENTIFIER);
            this.state = 315;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 9, this.context) ) {
            case 1:
                {
                this.state = 314;
                this.typeParams();
                }
                break;
            }
            this.state = 318;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 10, this.context) ) {
            case 1:
                {
                this.state = 317;
                this.classExtends();
                }
                break;
            }
            this.state = 321;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 11, this.context) ) {
            case 1:
                {
                this.state = 320;
                this.classImplements();
                }
                break;
            }
            this.state = 323;
            this.classBody();
            this.state = 324;
            this.match(Stage3FParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 18, Stage3FParser.RULE_anonClassDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 326;
            this.match(Stage3FParser.LPAREN);
            this.state = 327;
            this.match(Stage3FParser.CLASS);
            this.state = 331;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 91) {
                {
                {
                this.state = 328;
                this.modifier();
                }
                }
                this.state = 333;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 335;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 13, this.context) ) {
            case 1:
                {
                this.state = 334;
                this.classExtends();
                }
                break;
            }
            this.state = 338;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 14, this.context) ) {
            case 1:
                {
                this.state = 337;
                this.classImplements();
                }
                break;
            }
            this.state = 340;
            this.classBody();
            this.state = 341;
            this.match(Stage3FParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 20, Stage3FParser.RULE_classExtends);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 343;
            this.match(Stage3FParser.LPAREN);
            this.state = 344;
            this.match(Stage3FParser.EXTENDS);
            this.state = 345;
            this.typeExpr();
            this.state = 346;
            this.match(Stage3FParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 22, Stage3FParser.RULE_classImplements);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 348;
            this.match(Stage3FParser.LPAREN);
            this.state = 349;
            this.match(Stage3FParser.IMPLEMENTS);
            this.state = 351;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 350;
                this.typeExpr();
                }
                }
                this.state = 353;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 96);
            this.state = 355;
            this.match(Stage3FParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 24, Stage3FParser.RULE_classBody);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 357;
            this.match(Stage3FParser.LPAREN);
            this.state = 358;
            this.match(Stage3FParser.CLASS_BODY);
            this.state = 362;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 359;
                this.classElement();
                }
                }
                this.state = 364;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 365;
            this.match(Stage3FParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 26, Stage3FParser.RULE_classElement);
        try {
            this.state = 373;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 17, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 367;
                this.fieldDef();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 368;
                this.constructorDef();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 369;
                this.classMethodDef();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 370;
                this.abstractMethodDef();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 371;
                this.getterDef();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 372;
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
        this.enterRule(localContext, 28, Stage3FParser.RULE_modifier);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 375;
            this.match(Stage3FParser.KEYWORD);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 30, Stage3FParser.RULE_fieldDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 377;
            this.match(Stage3FParser.LPAREN);
            this.state = 378;
            this.match(Stage3FParser.FIELD);
            this.state = 382;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 91) {
                {
                {
                this.state = 379;
                this.modifier();
                }
                }
                this.state = 384;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 385;
            this.match(Stage3FParser.IDENTIFIER);
            this.state = 388;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 78) {
                {
                this.state = 386;
                this.match(Stage3FParser.COLON);
                this.state = 387;
                this.typeExpr();
                }
            }

            this.state = 391;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2 || ((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 469762051) !== 0) || ((((_la - 91)) & ~0x1F) === 0 && ((1 << (_la - 91)) & 55) !== 0)) {
                {
                this.state = 390;
                this.expression();
                }
            }

            this.state = 393;
            this.match(Stage3FParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 32, Stage3FParser.RULE_constructorDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 395;
            this.match(Stage3FParser.LPAREN);
            this.state = 396;
            this.match(Stage3FParser.CONSTRUCTOR);
            this.state = 397;
            this.fnSignatureTyped();
            this.state = 401;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 469762051) !== 0) || ((((_la - 91)) & ~0x1F) === 0 && ((1 << (_la - 91)) & 55) !== 0)) {
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
            this.match(Stage3FParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 34, Stage3FParser.RULE_classMethodDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 406;
            this.match(Stage3FParser.LPAREN);
            this.state = 407;
            this.match(Stage3FParser.METHOD);
            this.state = 411;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 91) {
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
            this.match(Stage3FParser.IDENTIFIER);
            this.state = 415;
            this.fnSignatureTyped();
            this.state = 419;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 469762051) !== 0) || ((((_la - 91)) & ~0x1F) === 0 && ((1 << (_la - 91)) & 55) !== 0)) {
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
            this.match(Stage3FParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 36, Stage3FParser.RULE_abstractMethodDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 424;
            this.match(Stage3FParser.LPAREN);
            this.state = 425;
            this.match(Stage3FParser.ABSTRACT_METHOD);
            this.state = 429;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 91) {
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
            this.state = 432;
            this.match(Stage3FParser.IDENTIFIER);
            this.state = 433;
            this.fnSignatureTyped();
            this.state = 434;
            this.match(Stage3FParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 38, Stage3FParser.RULE_getterDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 436;
            this.match(Stage3FParser.LPAREN);
            this.state = 437;
            this.match(Stage3FParser.GET);
            this.state = 441;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 91) {
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
            this.match(Stage3FParser.IDENTIFIER);
            this.state = 445;
            this.fnSignatureTyped();
            this.state = 449;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 469762051) !== 0) || ((((_la - 91)) & ~0x1F) === 0 && ((1 << (_la - 91)) & 55) !== 0)) {
                {
                {
                this.state = 446;
                this.statement();
                }
                }
                this.state = 451;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 452;
            this.match(Stage3FParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 40, Stage3FParser.RULE_setterDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 454;
            this.match(Stage3FParser.LPAREN);
            this.state = 455;
            this.match(Stage3FParser.SETPROP);
            this.state = 459;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 91) {
                {
                {
                this.state = 456;
                this.modifier();
                }
                }
                this.state = 461;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 462;
            this.match(Stage3FParser.IDENTIFIER);
            this.state = 463;
            this.fnSignatureTyped();
            this.state = 467;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 469762051) !== 0) || ((((_la - 91)) & ~0x1F) === 0 && ((1 << (_la - 91)) & 55) !== 0)) {
                {
                {
                this.state = 464;
                this.statement();
                }
                }
                this.state = 469;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 470;
            this.match(Stage3FParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 42, Stage3FParser.RULE_typedParam);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 472;
            this.match(Stage3FParser.LPAREN);
            this.state = 473;
            this.match(Stage3FParser.IDENTIFIER);
            this.state = 475;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 74) {
                {
                this.state = 474;
                this.match(Stage3FParser.OPTIONAL);
                }
            }

            this.state = 479;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 78) {
                {
                this.state = 477;
                this.match(Stage3FParser.COLON);
                this.state = 478;
                this.typeExpr();
                }
            }

            this.state = 481;
            this.match(Stage3FParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 44, Stage3FParser.RULE_fnSignatureTyped);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 483;
            this.match(Stage3FParser.LPAREN);
            this.state = 494;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2) {
                {
                this.state = 484;
                this.typedParam();
                this.state = 491;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 2 || _la === 4) {
                    {
                    {
                    this.state = 486;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    if (_la === 4) {
                        {
                        this.state = 485;
                        this.match(Stage3FParser.COMMA);
                        }
                    }

                    this.state = 488;
                    this.typedParam();
                    }
                    }
                    this.state = 493;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
            }

            this.state = 496;
            this.match(Stage3FParser.RPAREN);
            this.state = 502;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 34, this.context) ) {
            case 1:
                {
                this.state = 497;
                this.match(Stage3FParser.LPAREN);
                this.state = 498;
                this.match(Stage3FParser.RETURNS);
                this.state = 499;
                this.typeExpr();
                this.state = 500;
                this.match(Stage3FParser.RPAREN);
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
        this.enterRule(localContext, 46, Stage3FParser.RULE_statement);
        try {
            this.state = 522;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 35, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 504;
                this.letStar();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 505;
                this.letStmt();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 506;
                this.constStar();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 507;
                this.constStmt();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 508;
                this.ifForm();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 509;
                this.whileForm();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 510;
                this.block();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 511;
                this.returnForm();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 512;
                this.throwForm();
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 513;
                this.importForm();
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 514;
                this.importTypeForm();
                }
                break;
            case 12:
                this.enterOuterAlt(localContext, 12);
                {
                this.state = 515;
                this.exportForm();
                }
                break;
            case 13:
                this.enterOuterAlt(localContext, 13);
                {
                this.state = 516;
                this.switchForm();
                }
                break;
            case 14:
                this.enterOuterAlt(localContext, 14);
                {
                this.state = 517;
                this.forForm();
                }
                break;
            case 15:
                this.enterOuterAlt(localContext, 15);
                {
                this.state = 518;
                this.forInForm();
                }
                break;
            case 16:
                this.enterOuterAlt(localContext, 16);
                {
                this.state = 519;
                this.forOfForm();
                }
                break;
            case 17:
                this.enterOuterAlt(localContext, 17);
                {
                this.state = 520;
                this.assign();
                }
                break;
            case 18:
                this.enterOuterAlt(localContext, 18);
                {
                this.state = 521;
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
        this.enterRule(localContext, 48, Stage3FParser.RULE_letStar);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 524;
            this.match(Stage3FParser.LPAREN);
            this.state = 525;
            this.match(Stage3FParser.LETSTAR);
            this.state = 526;
            this.match(Stage3FParser.LPAREN);
            this.state = 530;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 527;
                this.starBinding();
                }
                }
                this.state = 532;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 533;
            this.match(Stage3FParser.RPAREN);
            this.state = 537;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 469762051) !== 0) || ((((_la - 91)) & ~0x1F) === 0 && ((1 << (_la - 91)) & 55) !== 0)) {
                {
                {
                this.state = 534;
                this.statement();
                }
                }
                this.state = 539;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 540;
            this.match(Stage3FParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 50, Stage3FParser.RULE_letStmt);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 542;
            this.match(Stage3FParser.LPAREN);
            this.state = 543;
            this.match(Stage3FParser.LET);
            this.state = 544;
            this.singleBinding();
            this.state = 545;
            this.expression();
            this.state = 546;
            this.match(Stage3FParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 52, Stage3FParser.RULE_constStar);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 548;
            this.match(Stage3FParser.LPAREN);
            this.state = 549;
            this.match(Stage3FParser.CONSTSTAR);
            this.state = 550;
            this.match(Stage3FParser.LPAREN);
            this.state = 554;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 551;
                this.starBinding();
                }
                }
                this.state = 556;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 557;
            this.match(Stage3FParser.RPAREN);
            this.state = 561;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 469762051) !== 0) || ((((_la - 91)) & ~0x1F) === 0 && ((1 << (_la - 91)) & 55) !== 0)) {
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
            this.match(Stage3FParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 54, Stage3FParser.RULE_constStmt);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 566;
            this.match(Stage3FParser.LPAREN);
            this.state = 567;
            this.match(Stage3FParser.CONST);
            this.state = 568;
            this.singleBinding();
            this.state = 569;
            this.expression();
            this.state = 570;
            this.match(Stage3FParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 56, Stage3FParser.RULE_ifForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 572;
            this.match(Stage3FParser.LPAREN);
            this.state = 573;
            this.match(Stage3FParser.IF);
            this.state = 574;
            this.expression();
            this.state = 575;
            this.statement();
            this.state = 577;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2 || ((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 469762051) !== 0) || ((((_la - 91)) & ~0x1F) === 0 && ((1 << (_la - 91)) & 55) !== 0)) {
                {
                this.state = 576;
                this.statement();
                }
            }

            this.state = 579;
            this.match(Stage3FParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 58, Stage3FParser.RULE_whileForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 581;
            this.match(Stage3FParser.LPAREN);
            this.state = 582;
            this.match(Stage3FParser.WHILE);
            this.state = 583;
            this.expression();
            this.state = 587;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 469762051) !== 0) || ((((_la - 91)) & ~0x1F) === 0 && ((1 << (_la - 91)) & 55) !== 0)) {
                {
                {
                this.state = 584;
                this.statement();
                }
                }
                this.state = 589;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 590;
            this.match(Stage3FParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 60, Stage3FParser.RULE_block);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 592;
            this.match(Stage3FParser.LPAREN);
            this.state = 593;
            this.match(Stage3FParser.BEGIN);
            this.state = 597;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 469762051) !== 0) || ((((_la - 91)) & ~0x1F) === 0 && ((1 << (_la - 91)) & 55) !== 0)) {
                {
                {
                this.state = 594;
                this.statement();
                }
                }
                this.state = 599;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 600;
            this.match(Stage3FParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 62, Stage3FParser.RULE_returnForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 602;
            this.match(Stage3FParser.LPAREN);
            this.state = 603;
            this.match(Stage3FParser.RETURN);
            this.state = 605;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2 || ((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 469762051) !== 0) || ((((_la - 91)) & ~0x1F) === 0 && ((1 << (_la - 91)) & 55) !== 0)) {
                {
                this.state = 604;
                this.expression();
                }
            }

            this.state = 607;
            this.match(Stage3FParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 64, Stage3FParser.RULE_throwForm);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 609;
            this.match(Stage3FParser.LPAREN);
            this.state = 610;
            this.match(Stage3FParser.THROW);
            this.state = 611;
            this.expression();
            this.state = 612;
            this.match(Stage3FParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 66, Stage3FParser.RULE_importForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 614;
            this.match(Stage3FParser.LPAREN);
            this.state = 615;
            this.match(Stage3FParser.IMPORT);
            this.state = 617;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2) {
                {
                this.state = 616;
                this.objectExpr();
                }
            }

            this.state = 619;
            this.match(Stage3FParser.STRING);
            this.state = 620;
            this.match(Stage3FParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 68, Stage3FParser.RULE_importTypeForm);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 622;
            this.match(Stage3FParser.LPAREN);
            this.state = 623;
            this.match(Stage3FParser.IMPORT_TYPE);
            this.state = 624;
            this.importTypeSpec();
            this.state = 625;
            this.match(Stage3FParser.STRING);
            this.state = 626;
            this.match(Stage3FParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 70, Stage3FParser.RULE_importTypeSpec);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 628;
            this.match(Stage3FParser.LPAREN);
            this.state = 629;
            this.match(Stage3FParser.IDENTIFIER);
            this.state = 631;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 630;
                this.importTypeName();
                }
                }
                this.state = 633;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 96);
            this.state = 635;
            this.match(Stage3FParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 72, Stage3FParser.RULE_importTypeName);
        try {
            this.state = 642;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case Stage3FParser.IDENTIFIER:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 637;
                this.match(Stage3FParser.IDENTIFIER);
                }
                break;
            case Stage3FParser.LPAREN:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 638;
                this.match(Stage3FParser.LPAREN);
                this.state = 639;
                this.match(Stage3FParser.IDENTIFIER);
                this.state = 640;
                this.match(Stage3FParser.IDENTIFIER);
                this.state = 641;
                this.match(Stage3FParser.RPAREN);
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
        this.enterRule(localContext, 74, Stage3FParser.RULE_exportForm);
        try {
            this.state = 653;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 47, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 644;
                this.exportBinding();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 645;
                this.exportDefault();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 646;
                this.exportNamed();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 647;
                this.exportNsFromForm();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 648;
                this.exportFrom();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 649;
                this.exportAllFrom();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 650;
                this.exportTypeForm();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 651;
                this.exportTypeFromForm();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 652;
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
        this.enterRule(localContext, 76, Stage3FParser.RULE_exportBinding);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 655;
            this.match(Stage3FParser.LPAREN);
            this.state = 656;
            this.match(Stage3FParser.EXPORT);
            this.state = 657;
            this.match(Stage3FParser.IDENTIFIER);
            this.state = 658;
            this.expression();
            this.state = 659;
            this.match(Stage3FParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 78, Stage3FParser.RULE_exportDefault);
        try {
            this.state = 681;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 48, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 661;
                this.match(Stage3FParser.LPAREN);
                this.state = 662;
                this.match(Stage3FParser.EXPORT_DEFAULT);
                this.state = 663;
                this.classDef();
                this.state = 664;
                this.match(Stage3FParser.RPAREN);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 666;
                this.match(Stage3FParser.LPAREN);
                this.state = 667;
                this.match(Stage3FParser.EXPORT_DEFAULT);
                this.state = 668;
                this.anonClassDef();
                this.state = 669;
                this.match(Stage3FParser.RPAREN);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 671;
                this.match(Stage3FParser.LPAREN);
                this.state = 672;
                this.match(Stage3FParser.EXPORT_DEFAULT);
                this.state = 673;
                this.def();
                this.state = 674;
                this.match(Stage3FParser.RPAREN);
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 676;
                this.match(Stage3FParser.LPAREN);
                this.state = 677;
                this.match(Stage3FParser.EXPORT_DEFAULT);
                this.state = 678;
                this.expression();
                this.state = 679;
                this.match(Stage3FParser.RPAREN);
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
        this.enterRule(localContext, 80, Stage3FParser.RULE_exportNamed);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 683;
            this.match(Stage3FParser.LPAREN);
            this.state = 684;
            this.match(Stage3FParser.EXPORT_NAMED);
            this.state = 686;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 685;
                this.exportNamePair();
                }
                }
                this.state = 688;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2);
            this.state = 690;
            this.match(Stage3FParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 82, Stage3FParser.RULE_exportNamePair);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 692;
            this.match(Stage3FParser.LPAREN);
            this.state = 693;
            this.match(Stage3FParser.IDENTIFIER);
            this.state = 695;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 96) {
                {
                this.state = 694;
                this.match(Stage3FParser.IDENTIFIER);
                }
            }

            this.state = 697;
            this.match(Stage3FParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 84, Stage3FParser.RULE_exportFrom);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 699;
            this.match(Stage3FParser.LPAREN);
            this.state = 700;
            this.match(Stage3FParser.EXPORT_FROM);
            this.state = 701;
            this.match(Stage3FParser.STRING);
            this.state = 703;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 702;
                this.exportNamePair();
                }
                }
                this.state = 705;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2);
            this.state = 707;
            this.match(Stage3FParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 86, Stage3FParser.RULE_exportAllFrom);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 709;
            this.match(Stage3FParser.LPAREN);
            this.state = 710;
            this.match(Stage3FParser.EXPORT_ALL_FROM);
            this.state = 711;
            this.match(Stage3FParser.STRING);
            this.state = 712;
            this.match(Stage3FParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 88, Stage3FParser.RULE_exportNsFromForm);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 714;
            this.match(Stage3FParser.LPAREN);
            this.state = 715;
            this.match(Stage3FParser.EXPORT_NS_FROM);
            this.state = 716;
            this.match(Stage3FParser.STRING);
            this.state = 717;
            this.match(Stage3FParser.STRING);
            this.state = 718;
            this.match(Stage3FParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 90, Stage3FParser.RULE_exportTypeForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 720;
            this.match(Stage3FParser.LPAREN);
            this.state = 721;
            this.match(Stage3FParser.EXPORT_TYPE);
            this.state = 723;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 722;
                this.exportNamePair();
                }
                }
                this.state = 725;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2);
            this.state = 727;
            this.match(Stage3FParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 92, Stage3FParser.RULE_exportTypeFromForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 729;
            this.match(Stage3FParser.LPAREN);
            this.state = 730;
            this.match(Stage3FParser.EXPORT_TYPE_FROM);
            this.state = 731;
            this.match(Stage3FParser.STRING);
            this.state = 733;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 732;
                this.exportNamePair();
                }
                }
                this.state = 735;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2);
            this.state = 737;
            this.match(Stage3FParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 94, Stage3FParser.RULE_exportTypeAllFromForm);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 739;
            this.match(Stage3FParser.LPAREN);
            this.state = 740;
            this.match(Stage3FParser.EXPORT_TYPE_ALL_FROM);
            this.state = 741;
            this.match(Stage3FParser.STRING);
            this.state = 742;
            this.match(Stage3FParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 96, Stage3FParser.RULE_exportDeclForm);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 744;
            this.match(Stage3FParser.LPAREN);
            this.state = 745;
            this.match(Stage3FParser.EXPORT);
            this.state = 746;
            this.decl();
            this.state = 747;
            this.match(Stage3FParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 98, Stage3FParser.RULE_starBinding);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 749;
            this.match(Stage3FParser.LPAREN);
            this.state = 750;
            this.match(Stage3FParser.IDENTIFIER);
            this.state = 753;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 78) {
                {
                this.state = 751;
                this.match(Stage3FParser.COLON);
                this.state = 752;
                this.typeExpr();
                }
            }

            this.state = 755;
            this.expression();
            this.state = 756;
            this.match(Stage3FParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 100, Stage3FParser.RULE_singleBinding);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 758;
            this.match(Stage3FParser.LPAREN);
            this.state = 759;
            this.match(Stage3FParser.IDENTIFIER);
            this.state = 762;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 78) {
                {
                this.state = 760;
                this.match(Stage3FParser.COLON);
                this.state = 761;
                this.typeExpr();
                }
            }

            this.state = 764;
            this.match(Stage3FParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 102, Stage3FParser.RULE_typeExpr);
        try {
            this.state = 782;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 56, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 766;
                this.match(Stage3FParser.IDENTIFIER);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 767;
                this.typeUnion();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 768;
                this.typeIntersection();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 769;
                this.typeArray();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 770;
                this.typeTuple();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 771;
                this.typeFunction();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 772;
                this.typeObject();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 773;
                this.typeLiteral();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 774;
                this.typeKeyof();
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 775;
                this.typeTypeof();
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 776;
                this.typeIndexAccess();
                }
                break;
            case 12:
                this.enterOuterAlt(localContext, 12);
                {
                this.state = 777;
                this.typeConditional();
                }
                break;
            case 13:
                this.enterOuterAlt(localContext, 13);
                {
                this.state = 778;
                this.typeInfer();
                }
                break;
            case 14:
                this.enterOuterAlt(localContext, 14);
                {
                this.state = 779;
                this.typeMapped();
                }
                break;
            case 15:
                this.enterOuterAlt(localContext, 15);
                {
                this.state = 780;
                this.typeTemplateLiteral();
                }
                break;
            case 16:
                this.enterOuterAlt(localContext, 16);
                {
                this.state = 781;
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
        this.enterRule(localContext, 104, Stage3FParser.RULE_typeUnion);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 784;
            this.match(Stage3FParser.LPAREN);
            this.state = 785;
            this.match(Stage3FParser.UNION);
            this.state = 786;
            this.typeExpr();
            this.state = 788;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 787;
                this.typeExpr();
                }
                }
                this.state = 790;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 96);
            this.state = 792;
            this.match(Stage3FParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 106, Stage3FParser.RULE_typeIntersection);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 794;
            this.match(Stage3FParser.LPAREN);
            this.state = 795;
            this.match(Stage3FParser.INTERSECT);
            this.state = 796;
            this.typeExpr();
            this.state = 798;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 797;
                this.typeExpr();
                }
                }
                this.state = 800;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 96);
            this.state = 802;
            this.match(Stage3FParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 108, Stage3FParser.RULE_typeArray);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 804;
            this.match(Stage3FParser.LPAREN);
            this.state = 805;
            this.match(Stage3FParser.ARRAY);
            this.state = 806;
            this.typeExpr();
            this.state = 807;
            this.match(Stage3FParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 110, Stage3FParser.RULE_typeTuple);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 809;
            this.match(Stage3FParser.LPAREN);
            this.state = 810;
            this.match(Stage3FParser.TUPLE);
            this.state = 812;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 811;
                this.typeTupleElement();
                }
                }
                this.state = 814;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 96);
            this.state = 816;
            this.match(Stage3FParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 112, Stage3FParser.RULE_typeTupleElement);
        try {
            this.state = 829;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 60, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 818;
                this.match(Stage3FParser.LPAREN);
                this.state = 819;
                this.match(Stage3FParser.REST);
                this.state = 820;
                this.typeExpr();
                this.state = 821;
                this.match(Stage3FParser.RPAREN);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 823;
                this.match(Stage3FParser.LPAREN);
                this.state = 824;
                this.match(Stage3FParser.IDENTIFIER);
                this.state = 825;
                this.typeExpr();
                this.state = 826;
                this.match(Stage3FParser.RPAREN);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 828;
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
        this.enterRule(localContext, 114, Stage3FParser.RULE_typeFunction);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 831;
            this.match(Stage3FParser.LPAREN);
            this.state = 832;
            this.match(Stage3FParser.TYPEFN);
            this.state = 834;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 61, this.context) ) {
            case 1:
                {
                this.state = 833;
                this.typeParams();
                }
                break;
            }
            this.state = 836;
            this.match(Stage3FParser.LPAREN);
            this.state = 840;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 837;
                this.typeFnParam();
                }
                }
                this.state = 842;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 843;
            this.match(Stage3FParser.RPAREN);
            this.state = 844;
            this.typeExpr();
            this.state = 845;
            this.match(Stage3FParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 116, Stage3FParser.RULE_typeFnParam);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 847;
            this.match(Stage3FParser.LPAREN);
            this.state = 848;
            this.match(Stage3FParser.IDENTIFIER);
            this.state = 850;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 74) {
                {
                this.state = 849;
                this.match(Stage3FParser.OPTIONAL);
                }
            }

            this.state = 852;
            this.typeExpr();
            this.state = 853;
            this.match(Stage3FParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 118, Stage3FParser.RULE_typeObject);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 855;
            this.match(Stage3FParser.LPAREN);
            this.state = 856;
            this.match(Stage3FParser.IDENTIFIER);
            this.state = 860;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 857;
                this.typeProp();
                }
                }
                this.state = 862;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 863;
            this.match(Stage3FParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 120, Stage3FParser.RULE_typeProp);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 865;
            this.match(Stage3FParser.LPAREN);
            this.state = 869;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 66) {
                {
                {
                this.state = 866;
                this.propModifier();
                }
                }
                this.state = 871;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 872;
            this.match(Stage3FParser.IDENTIFIER);
            this.state = 874;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 74) {
                {
                this.state = 873;
                this.match(Stage3FParser.OPTIONAL);
                }
            }

            this.state = 876;
            this.typeExpr();
            this.state = 877;
            this.match(Stage3FParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 122, Stage3FParser.RULE_propModifier);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 879;
            this.match(Stage3FParser.READONLY);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 124, Stage3FParser.RULE_typeLiteral);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 881;
            this.match(Stage3FParser.LPAREN);
            this.state = 882;
            this.match(Stage3FParser.LIT);
            this.state = 883;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 75)) & ~0x1F) === 0 && ((1 << (_la - 75)) & 1441793) !== 0))) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 884;
            this.match(Stage3FParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 126, Stage3FParser.RULE_typeKeyof);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 886;
            this.match(Stage3FParser.LPAREN);
            this.state = 887;
            this.match(Stage3FParser.KEYOF);
            this.state = 888;
            this.typeExpr();
            this.state = 889;
            this.match(Stage3FParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 128, Stage3FParser.RULE_typeTypeof);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 891;
            this.match(Stage3FParser.LPAREN);
            this.state = 892;
            this.match(Stage3FParser.TYPEOF);
            this.state = 893;
            this.match(Stage3FParser.IDENTIFIER);
            this.state = 894;
            this.match(Stage3FParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 130, Stage3FParser.RULE_typeIndexAccess);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 896;
            this.match(Stage3FParser.LPAREN);
            this.state = 897;
            this.match(Stage3FParser.INDEX);
            this.state = 898;
            this.typeExpr();
            this.state = 899;
            this.typeExpr();
            this.state = 900;
            this.match(Stage3FParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 132, Stage3FParser.RULE_typeConditional);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 902;
            this.match(Stage3FParser.LPAREN);
            this.state = 903;
            this.match(Stage3FParser.COND);
            this.state = 904;
            this.typeExpr();
            this.state = 905;
            this.typeExpr();
            this.state = 906;
            this.typeExpr();
            this.state = 907;
            this.typeExpr();
            this.state = 908;
            this.match(Stage3FParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 134, Stage3FParser.RULE_typeInfer);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 910;
            this.match(Stage3FParser.LPAREN);
            this.state = 911;
            this.match(Stage3FParser.INFER);
            this.state = 912;
            this.match(Stage3FParser.IDENTIFIER);
            this.state = 913;
            this.match(Stage3FParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 136, Stage3FParser.RULE_typeMapped);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 915;
            this.match(Stage3FParser.LPAREN);
            this.state = 916;
            this.match(Stage3FParser.MAPPED);
            this.state = 917;
            this.match(Stage3FParser.IDENTIFIER);
            this.state = 918;
            this.typeExpr();
            this.state = 920;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 67, this.context) ) {
            case 1:
                {
                this.state = 919;
                this.mappedModifiers();
                }
                break;
            }
            this.state = 922;
            this.typeExpr();
            this.state = 923;
            this.match(Stage3FParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 138, Stage3FParser.RULE_mappedModifiers);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 925;
            this.match(Stage3FParser.LPAREN);
            this.state = 926;
            this.match(Stage3FParser.MODIFIERS);
            this.state = 928;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 927;
                this.mappedModifier();
                }
                }
                this.state = 930;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 66 || _la === 74);
            this.state = 932;
            this.match(Stage3FParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 140, Stage3FParser.RULE_mappedModifier);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 934;
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
        this.enterRule(localContext, 142, Stage3FParser.RULE_typeTemplateLiteral);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 936;
            this.match(Stage3FParser.LPAREN);
            this.state = 937;
            this.match(Stage3FParser.TEMPLATE);
            this.state = 939;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 938;
                this.templatePart();
                }
                }
                this.state = 941;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 93 || _la === 96);
            this.state = 943;
            this.match(Stage3FParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 144, Stage3FParser.RULE_templatePart);
        try {
            this.state = 947;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case Stage3FParser.STRING:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 945;
                this.match(Stage3FParser.STRING);
                }
                break;
            case Stage3FParser.LPAREN:
            case Stage3FParser.IDENTIFIER:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 946;
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
        this.enterRule(localContext, 146, Stage3FParser.RULE_typeApplication);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 949;
            this.match(Stage3FParser.LPAREN);
            this.state = 950;
            this.typeExpr();
            this.state = 952;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 951;
                this.typeExpr();
                }
                }
                this.state = 954;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 96);
            this.state = 956;
            this.match(Stage3FParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 148, Stage3FParser.RULE_typeParams);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 958;
            this.match(Stage3FParser.LPAREN);
            this.state = 959;
            this.match(Stage3FParser.TYPE_PARAMS);
            this.state = 961;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 960;
                this.typeParamDecl();
                }
                }
                this.state = 963;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 96);
            this.state = 965;
            this.match(Stage3FParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 150, Stage3FParser.RULE_typeParamDecl);
        let _la: number;
        try {
            this.state = 977;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case Stage3FParser.IDENTIFIER:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 967;
                this.match(Stage3FParser.IDENTIFIER);
                }
                break;
            case Stage3FParser.LPAREN:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 968;
                this.match(Stage3FParser.LPAREN);
                this.state = 969;
                this.match(Stage3FParser.IDENTIFIER);
                this.state = 971;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 73, this.context) ) {
                case 1:
                    {
                    this.state = 970;
                    this.typeParamConstraint();
                    }
                    break;
                }
                this.state = 974;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 2) {
                    {
                    this.state = 973;
                    this.typeParamDefault();
                    }
                }

                this.state = 976;
                this.match(Stage3FParser.RPAREN);
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
        this.enterRule(localContext, 152, Stage3FParser.RULE_typeParamConstraint);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 979;
            this.match(Stage3FParser.LPAREN);
            this.state = 980;
            this.match(Stage3FParser.EXTENDS);
            this.state = 981;
            this.typeExpr();
            this.state = 982;
            this.match(Stage3FParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 154, Stage3FParser.RULE_typeParamDefault);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 984;
            this.match(Stage3FParser.LPAREN);
            this.state = 985;
            this.match(Stage3FParser.DEFAULT);
            this.state = 986;
            this.typeExpr();
            this.state = 987;
            this.match(Stage3FParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 156, Stage3FParser.RULE_assign);
        try {
            this.state = 1001;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 76, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 989;
                this.match(Stage3FParser.LPAREN);
                this.state = 990;
                this.match(Stage3FParser.SET);
                this.state = 991;
                this.match(Stage3FParser.IDENTIFIER);
                this.state = 992;
                this.expression();
                this.state = 993;
                this.match(Stage3FParser.RPAREN);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 995;
                this.match(Stage3FParser.LPAREN);
                this.state = 996;
                this.match(Stage3FParser.SET);
                this.state = 997;
                this.propAccess();
                this.state = 998;
                this.expression();
                this.state = 999;
                this.match(Stage3FParser.RPAREN);
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
        this.enterRule(localContext, 158, Stage3FParser.RULE_switchForm);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1003;
            this.match(Stage3FParser.LPAREN);
            this.state = 1004;
            this.match(Stage3FParser.SWITCH);
            this.state = 1005;
            this.expression();
            this.state = 1009;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 77, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 1006;
                    this.caseClause();
                    }
                    }
                }
                this.state = 1011;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 77, this.context);
            }
            this.state = 1013;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2) {
                {
                this.state = 1012;
                this.defaultClause();
                }
            }

            this.state = 1015;
            this.match(Stage3FParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 160, Stage3FParser.RULE_caseClause);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1017;
            this.match(Stage3FParser.LPAREN);
            this.state = 1018;
            this.match(Stage3FParser.CASE);
            this.state = 1019;
            this.expression();
            this.state = 1023;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 469762051) !== 0) || ((((_la - 91)) & ~0x1F) === 0 && ((1 << (_la - 91)) & 55) !== 0)) {
                {
                {
                this.state = 1020;
                this.statement();
                }
                }
                this.state = 1025;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1026;
            this.match(Stage3FParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 162, Stage3FParser.RULE_defaultClause);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1028;
            this.match(Stage3FParser.LPAREN);
            this.state = 1029;
            this.match(Stage3FParser.DEFAULT);
            this.state = 1033;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 469762051) !== 0) || ((((_la - 91)) & ~0x1F) === 0 && ((1 << (_la - 91)) & 55) !== 0)) {
                {
                {
                this.state = 1030;
                this.statement();
                }
                }
                this.state = 1035;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1036;
            this.match(Stage3FParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 164, Stage3FParser.RULE_forForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1038;
            this.match(Stage3FParser.LPAREN);
            this.state = 1039;
            this.match(Stage3FParser.FOR);
            this.state = 1040;
            this.letStmt();
            this.state = 1041;
            this.expression();
            this.state = 1042;
            this.assign();
            this.state = 1046;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 469762051) !== 0) || ((((_la - 91)) & ~0x1F) === 0 && ((1 << (_la - 91)) & 55) !== 0)) {
                {
                {
                this.state = 1043;
                this.statement();
                }
                }
                this.state = 1048;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1049;
            this.match(Stage3FParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 166, Stage3FParser.RULE_forInForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1051;
            this.match(Stage3FParser.LPAREN);
            this.state = 1052;
            this.match(Stage3FParser.FORIN);
            this.state = 1053;
            this.match(Stage3FParser.IDENTIFIER);
            this.state = 1054;
            this.expression();
            this.state = 1058;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 469762051) !== 0) || ((((_la - 91)) & ~0x1F) === 0 && ((1 << (_la - 91)) & 55) !== 0)) {
                {
                {
                this.state = 1055;
                this.statement();
                }
                }
                this.state = 1060;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1061;
            this.match(Stage3FParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 168, Stage3FParser.RULE_forOfForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1063;
            this.match(Stage3FParser.LPAREN);
            this.state = 1064;
            this.match(Stage3FParser.FOROF);
            this.state = 1065;
            this.match(Stage3FParser.IDENTIFIER);
            this.state = 1066;
            this.expression();
            this.state = 1070;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 469762051) !== 0) || ((((_la - 91)) & ~0x1F) === 0 && ((1 << (_la - 91)) & 55) !== 0)) {
                {
                {
                this.state = 1067;
                this.statement();
                }
                }
                this.state = 1072;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1073;
            this.match(Stage3FParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 170, Stage3FParser.RULE_expression);
        try {
            this.state = 1101;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 84, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1075;
                this.literal();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1076;
                this.match(Stage3FParser.KEYWORD);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 1077;
                this.match(Stage3FParser.IDENTIFIER);
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 1078;
                this.lambda();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 1079;
                this.fn();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 1080;
                this.bindExpr();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 1081;
                this.methodCallExpr();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 1082;
                this.objectExpr();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 1083;
                this.arrayExpr();
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 1084;
                this.propAccess();
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 1085;
                this.indexAccess();
                }
                break;
            case 12:
                this.enterOuterAlt(localContext, 12);
                {
                this.state = 1086;
                this.quasiquote();
                }
                break;
            case 13:
                this.enterOuterAlt(localContext, 13);
                {
                this.state = 1087;
                this.unquote();
                }
                break;
            case 14:
                this.enterOuterAlt(localContext, 14);
                {
                this.state = 1088;
                this.unquoteSplicing();
                }
                break;
            case 15:
                this.enterOuterAlt(localContext, 15);
                {
                this.state = 1089;
                this.ternary();
                }
                break;
            case 16:
                this.enterOuterAlt(localContext, 16);
                {
                this.state = 1090;
                this.condExpr();
                }
                break;
            case 17:
                this.enterOuterAlt(localContext, 17);
                {
                this.state = 1091;
                this.newForm();
                }
                break;
            case 18:
                this.enterOuterAlt(localContext, 18);
                {
                this.state = 1092;
                this.optChain();
                }
                break;
            case 19:
                this.enterOuterAlt(localContext, 19);
                {
                this.state = 1093;
                this.nullCoalesce();
                }
                break;
            case 20:
                this.enterOuterAlt(localContext, 20);
                {
                this.state = 1094;
                this.typeofExpr();
                }
                break;
            case 21:
                this.enterOuterAlt(localContext, 21);
                {
                this.state = 1095;
                this.typeAssert();
                }
                break;
            case 22:
                this.enterOuterAlt(localContext, 22);
                {
                this.state = 1096;
                this.thisExpr();
                }
                break;
            case 23:
                this.enterOuterAlt(localContext, 23);
                {
                this.state = 1097;
                this.superExpr();
                }
                break;
            case 24:
                this.enterOuterAlt(localContext, 24);
                {
                this.state = 1098;
                this.superConstructorCall();
                }
                break;
            case 25:
                this.enterOuterAlt(localContext, 25);
                {
                this.state = 1099;
                this.superMethodCall();
                }
                break;
            case 26:
                this.enterOuterAlt(localContext, 26);
                {
                this.state = 1100;
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
        this.enterRule(localContext, 172, Stage3FParser.RULE_thisExpr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1103;
            this.match(Stage3FParser.THIS);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 174, Stage3FParser.RULE_superExpr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1105;
            this.match(Stage3FParser.SUPER);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 176, Stage3FParser.RULE_superConstructorCall);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1107;
            this.match(Stage3FParser.LPAREN);
            this.state = 1108;
            this.match(Stage3FParser.SUPER);
            this.state = 1112;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 469762051) !== 0) || ((((_la - 91)) & ~0x1F) === 0 && ((1 << (_la - 91)) & 55) !== 0)) {
                {
                {
                this.state = 1109;
                this.expression();
                }
                }
                this.state = 1114;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1115;
            this.match(Stage3FParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 178, Stage3FParser.RULE_superMethodCall);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1117;
            this.match(Stage3FParser.LPAREN);
            this.state = 1118;
            this.match(Stage3FParser.SUPER_METHOD);
            this.state = 1119;
            this.match(Stage3FParser.IDENTIFIER);
            this.state = 1123;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 469762051) !== 0) || ((((_la - 91)) & ~0x1F) === 0 && ((1 << (_la - 91)) & 55) !== 0)) {
                {
                {
                this.state = 1120;
                this.expression();
                }
                }
                this.state = 1125;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1126;
            this.match(Stage3FParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 180, Stage3FParser.RULE_typeofExpr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1128;
            this.match(Stage3FParser.LPAREN);
            this.state = 1129;
            this.match(Stage3FParser.TYPEOF);
            this.state = 1130;
            this.expression();
            this.state = 1131;
            this.match(Stage3FParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 182, Stage3FParser.RULE_typeAssert);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1133;
            this.match(Stage3FParser.LPAREN);
            this.state = 1134;
            this.match(Stage3FParser.TYPE_AS);
            this.state = 1135;
            this.expression();
            this.state = 1136;
            this.typeExpr();
            this.state = 1137;
            this.match(Stage3FParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 184, Stage3FParser.RULE_lambda);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1139;
            this.match(Stage3FParser.LPAREN);
            this.state = 1140;
            this.match(Stage3FParser.LAMBDA);
            this.state = 1141;
            this.fnSignature();
            this.state = 1145;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 469762051) !== 0) || ((((_la - 91)) & ~0x1F) === 0 && ((1 << (_la - 91)) & 55) !== 0)) {
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
            this.match(Stage3FParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 186, Stage3FParser.RULE_fn);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1150;
            this.match(Stage3FParser.LPAREN);
            this.state = 1151;
            this.match(Stage3FParser.FN);
            this.state = 1152;
            this.fnSignature();
            this.state = 1156;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 469762051) !== 0) || ((((_la - 91)) & ~0x1F) === 0 && ((1 << (_la - 91)) & 55) !== 0)) {
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
            this.match(Stage3FParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 188, Stage3FParser.RULE_bindExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1161;
            this.match(Stage3FParser.LPAREN);
            this.state = 1162;
            this.match(Stage3FParser.BIND);
            this.state = 1163;
            this.expression();
            this.state = 1164;
            this.expression();
            this.state = 1168;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 469762051) !== 0) || ((((_la - 91)) & ~0x1F) === 0 && ((1 << (_la - 91)) & 55) !== 0)) {
                {
                {
                this.state = 1165;
                this.expression();
                }
                }
                this.state = 1170;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1171;
            this.match(Stage3FParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 190, Stage3FParser.RULE_methodCallExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1173;
            this.match(Stage3FParser.LPAREN);
            this.state = 1174;
            this.match(Stage3FParser.METHOD_CALL);
            this.state = 1175;
            this.expression();
            this.state = 1176;
            this.expression();
            this.state = 1180;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 469762051) !== 0) || ((((_la - 91)) & ~0x1F) === 0 && ((1 << (_la - 91)) & 55) !== 0)) {
                {
                {
                this.state = 1177;
                this.expression();
                }
                }
                this.state = 1182;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1183;
            this.match(Stage3FParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 192, Stage3FParser.RULE_ternary);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1185;
            this.match(Stage3FParser.LPAREN);
            this.state = 1186;
            this.match(Stage3FParser.TERNARY);
            this.state = 1187;
            this.expression();
            this.state = 1188;
            this.expression();
            this.state = 1189;
            this.expression();
            this.state = 1190;
            this.match(Stage3FParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 194, Stage3FParser.RULE_condExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1192;
            this.match(Stage3FParser.LPAREN);
            this.state = 1193;
            this.match(Stage3FParser.COND);
            this.state = 1197;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 1194;
                this.expression();
                this.state = 1195;
                this.expression();
                }
                }
                this.state = 1199;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || ((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 469762051) !== 0) || ((((_la - 91)) & ~0x1F) === 0 && ((1 << (_la - 91)) & 55) !== 0));
            this.state = 1201;
            this.match(Stage3FParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 196, Stage3FParser.RULE_newForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1203;
            this.match(Stage3FParser.LPAREN);
            this.state = 1204;
            this.match(Stage3FParser.NEW);
            this.state = 1205;
            this.match(Stage3FParser.IDENTIFIER);
            this.state = 1207;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 92, this.context) ) {
            case 1:
                {
                this.state = 1206;
                this.typeArgs();
                }
                break;
            }
            this.state = 1212;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 469762051) !== 0) || ((((_la - 91)) & ~0x1F) === 0 && ((1 << (_la - 91)) & 55) !== 0)) {
                {
                {
                this.state = 1209;
                this.expression();
                }
                }
                this.state = 1214;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1215;
            this.match(Stage3FParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 198, Stage3FParser.RULE_objectExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1217;
            this.match(Stage3FParser.LPAREN);
            this.state = 1218;
            this.match(Stage3FParser.OBJECT);
            this.state = 1222;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 1219;
                this.objectField();
                }
                }
                this.state = 1224;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1225;
            this.match(Stage3FParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 200, Stage3FParser.RULE_objectField);
        try {
            this.state = 1240;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 95, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1227;
                this.match(Stage3FParser.LPAREN);
                this.state = 1228;
                this.propKey();
                this.state = 1229;
                this.expression();
                this.state = 1230;
                this.match(Stage3FParser.RPAREN);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1232;
                this.match(Stage3FParser.LPAREN);
                this.state = 1233;
                this.propKey();
                this.state = 1234;
                this.methodDef();
                this.state = 1235;
                this.match(Stage3FParser.RPAREN);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 1237;
                this.match(Stage3FParser.LPAREN);
                this.state = 1238;
                this.match(Stage3FParser.IDENTIFIER);
                this.state = 1239;
                this.match(Stage3FParser.RPAREN);
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
        this.enterRule(localContext, 202, Stage3FParser.RULE_methodDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1242;
            this.match(Stage3FParser.LPAREN);
            this.state = 1243;
            this.match(Stage3FParser.METHOD);
            this.state = 1244;
            this.fnSignature();
            this.state = 1248;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 469762051) !== 0) || ((((_la - 91)) & ~0x1F) === 0 && ((1 << (_la - 91)) & 55) !== 0)) {
                {
                {
                this.state = 1245;
                this.statement();
                }
                }
                this.state = 1250;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1251;
            this.match(Stage3FParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 204, Stage3FParser.RULE_arrayExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1253;
            this.match(Stage3FParser.LPAREN);
            this.state = 1254;
            this.match(Stage3FParser.ARRAY);
            this.state = 1258;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 469762051) !== 0) || ((((_la - 91)) & ~0x1F) === 0 && ((1 << (_la - 91)) & 55) !== 0)) {
                {
                {
                this.state = 1255;
                this.expression();
                }
                }
                this.state = 1260;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1261;
            this.match(Stage3FParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 206, Stage3FParser.RULE_propKey);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1263;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 5)) & ~0x1F) === 0 && ((1 << (_la - 5)) & 4248829951) !== 0) || ((((_la - 37)) & ~0x1F) === 0 && ((1 << (_la - 37)) & 4294967295) !== 0) || ((((_la - 69)) & ~0x1F) === 0 && ((1 << (_la - 69)) & 226488799) !== 0))) {
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
        this.enterRule(localContext, 208, Stage3FParser.RULE_propAccess);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1265;
            this.match(Stage3FParser.LPAREN);
            this.state = 1266;
            this.match(Stage3FParser.DOT);
            this.state = 1267;
            this.expression();
            this.state = 1268;
            this.propKey();
            this.state = 1269;
            this.match(Stage3FParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 210, Stage3FParser.RULE_indexAccess);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1271;
            this.match(Stage3FParser.LPAREN);
            this.state = 1272;
            this.match(Stage3FParser.INDEX);
            this.state = 1273;
            this.expression();
            this.state = 1274;
            this.expression();
            this.state = 1275;
            this.match(Stage3FParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 212, Stage3FParser.RULE_quasiquote);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1277;
            this.match(Stage3FParser.LPAREN);
            this.state = 1278;
            _la = this.tokenStream.LA(1);
            if(!(_la === 31 || _la === 32)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 1279;
            this.expression();
            this.state = 1280;
            this.match(Stage3FParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 214, Stage3FParser.RULE_unquote);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1282;
            this.match(Stage3FParser.LPAREN);
            this.state = 1283;
            this.match(Stage3FParser.UNQUOTE);
            this.state = 1284;
            this.expression();
            this.state = 1285;
            this.match(Stage3FParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 216, Stage3FParser.RULE_unquoteSplicing);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1287;
            this.match(Stage3FParser.LPAREN);
            this.state = 1288;
            this.match(Stage3FParser.UNQUOTE_SPLICING);
            this.state = 1289;
            this.expression();
            this.state = 1290;
            this.match(Stage3FParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 218, Stage3FParser.RULE_optChain);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1292;
            this.match(Stage3FParser.LPAREN);
            this.state = 1293;
            this.match(Stage3FParser.OPTCHAIN);
            this.state = 1294;
            this.expression();
            this.state = 1295;
            this.propKey();
            this.state = 1296;
            this.match(Stage3FParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 220, Stage3FParser.RULE_nullCoalesce);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1298;
            this.match(Stage3FParser.LPAREN);
            this.state = 1299;
            this.match(Stage3FParser.NULLCOAL);
            this.state = 1300;
            this.expression();
            this.state = 1301;
            this.expression();
            this.state = 1302;
            this.match(Stage3FParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 222, Stage3FParser.RULE_call);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1304;
            this.match(Stage3FParser.LPAREN);
            this.state = 1305;
            this.expression();
            this.state = 1307;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 98, this.context) ) {
            case 1:
                {
                this.state = 1306;
                this.typeArgs();
                }
                break;
            }
            this.state = 1312;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 469762051) !== 0) || ((((_la - 91)) & ~0x1F) === 0 && ((1 << (_la - 91)) & 55) !== 0)) {
                {
                {
                this.state = 1309;
                this.expression();
                }
                }
                this.state = 1314;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1315;
            this.match(Stage3FParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 224, Stage3FParser.RULE_typeArgs);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1317;
            this.match(Stage3FParser.LPAREN);
            this.state = 1318;
            this.match(Stage3FParser.TYPE_ARGS);
            this.state = 1320;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 1319;
                this.typeExpr();
                }
                }
                this.state = 1322;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 96);
            this.state = 1324;
            this.match(Stage3FParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 226, Stage3FParser.RULE_fnSignature);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1326;
            this.match(Stage3FParser.LPAREN);
            this.state = 1337;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2) {
                {
                this.state = 1327;
                this.param();
                this.state = 1334;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 2 || _la === 4) {
                    {
                    {
                    this.state = 1329;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    if (_la === 4) {
                        {
                        this.state = 1328;
                        this.match(Stage3FParser.COMMA);
                        }
                    }

                    this.state = 1331;
                    this.param();
                    }
                    }
                    this.state = 1336;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
            }

            this.state = 1339;
            this.match(Stage3FParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 228, Stage3FParser.RULE_param);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1341;
            this.match(Stage3FParser.LPAREN);
            this.state = 1342;
            this.match(Stage3FParser.IDENTIFIER);
            this.state = 1343;
            this.match(Stage3FParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 230, Stage3FParser.RULE_literal);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1345;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 75)) & ~0x1F) === 0 && ((1 << (_la - 75)) & 1441799) !== 0))) {
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
        4,1,97,1348,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,
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
        2,115,7,115,1,0,1,0,1,0,5,0,236,8,0,10,0,12,0,239,9,0,1,0,1,0,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,3,1,250,8,1,1,2,1,2,1,2,1,2,3,2,256,8,
        2,1,3,1,3,1,3,1,3,1,3,5,3,263,8,3,10,3,12,3,266,9,3,1,3,1,3,1,4,
        1,4,1,4,1,4,1,4,1,4,1,5,1,5,1,5,1,5,3,5,280,8,5,1,5,1,5,1,5,1,6,
        1,6,1,6,1,6,3,6,289,8,6,1,6,3,6,292,8,6,1,6,1,6,1,6,1,7,1,7,1,7,
        4,7,300,8,7,11,7,12,7,301,1,7,1,7,1,8,1,8,1,8,5,8,309,8,8,10,8,12,
        8,312,9,8,1,8,1,8,3,8,316,8,8,1,8,3,8,319,8,8,1,8,3,8,322,8,8,1,
        8,1,8,1,8,1,9,1,9,1,9,5,9,330,8,9,10,9,12,9,333,9,9,1,9,3,9,336,
        8,9,1,9,3,9,339,8,9,1,9,1,9,1,9,1,10,1,10,1,10,1,10,1,10,1,11,1,
        11,1,11,4,11,352,8,11,11,11,12,11,353,1,11,1,11,1,12,1,12,1,12,5,
        12,361,8,12,10,12,12,12,364,9,12,1,12,1,12,1,13,1,13,1,13,1,13,1,
        13,1,13,3,13,374,8,13,1,14,1,14,1,15,1,15,1,15,5,15,381,8,15,10,
        15,12,15,384,9,15,1,15,1,15,1,15,3,15,389,8,15,1,15,3,15,392,8,15,
        1,15,1,15,1,16,1,16,1,16,1,16,5,16,400,8,16,10,16,12,16,403,9,16,
        1,16,1,16,1,17,1,17,1,17,5,17,410,8,17,10,17,12,17,413,9,17,1,17,
        1,17,1,17,5,17,418,8,17,10,17,12,17,421,9,17,1,17,1,17,1,18,1,18,
        1,18,5,18,428,8,18,10,18,12,18,431,9,18,1,18,1,18,1,18,1,18,1,19,
        1,19,1,19,5,19,440,8,19,10,19,12,19,443,9,19,1,19,1,19,1,19,5,19,
        448,8,19,10,19,12,19,451,9,19,1,19,1,19,1,20,1,20,1,20,5,20,458,
        8,20,10,20,12,20,461,9,20,1,20,1,20,1,20,5,20,466,8,20,10,20,12,
        20,469,9,20,1,20,1,20,1,21,1,21,1,21,3,21,476,8,21,1,21,1,21,3,21,
        480,8,21,1,21,1,21,1,22,1,22,1,22,3,22,487,8,22,1,22,5,22,490,8,
        22,10,22,12,22,493,9,22,3,22,495,8,22,1,22,1,22,1,22,1,22,1,22,1,
        22,3,22,503,8,22,1,23,1,23,1,23,1,23,1,23,1,23,1,23,1,23,1,23,1,
        23,1,23,1,23,1,23,1,23,1,23,1,23,1,23,1,23,3,23,523,8,23,1,24,1,
        24,1,24,1,24,5,24,529,8,24,10,24,12,24,532,9,24,1,24,1,24,5,24,536,
        8,24,10,24,12,24,539,9,24,1,24,1,24,1,25,1,25,1,25,1,25,1,25,1,25,
        1,26,1,26,1,26,1,26,5,26,553,8,26,10,26,12,26,556,9,26,1,26,1,26,
        5,26,560,8,26,10,26,12,26,563,9,26,1,26,1,26,1,27,1,27,1,27,1,27,
        1,27,1,27,1,28,1,28,1,28,1,28,1,28,3,28,578,8,28,1,28,1,28,1,29,
        1,29,1,29,1,29,5,29,586,8,29,10,29,12,29,589,9,29,1,29,1,29,1,30,
        1,30,1,30,5,30,596,8,30,10,30,12,30,599,9,30,1,30,1,30,1,31,1,31,
        1,31,3,31,606,8,31,1,31,1,31,1,32,1,32,1,32,1,32,1,32,1,33,1,33,
        1,33,3,33,618,8,33,1,33,1,33,1,33,1,34,1,34,1,34,1,34,1,34,1,34,
        1,35,1,35,1,35,4,35,632,8,35,11,35,12,35,633,1,35,1,35,1,36,1,36,
        1,36,1,36,1,36,3,36,643,8,36,1,37,1,37,1,37,1,37,1,37,1,37,1,37,
        1,37,1,37,3,37,654,8,37,1,38,1,38,1,38,1,38,1,38,1,38,1,39,1,39,
        1,39,1,39,1,39,1,39,1,39,1,39,1,39,1,39,1,39,1,39,1,39,1,39,1,39,
        1,39,1,39,1,39,1,39,1,39,3,39,682,8,39,1,40,1,40,1,40,4,40,687,8,
        40,11,40,12,40,688,1,40,1,40,1,41,1,41,1,41,3,41,696,8,41,1,41,1,
        41,1,42,1,42,1,42,1,42,4,42,704,8,42,11,42,12,42,705,1,42,1,42,1,
        43,1,43,1,43,1,43,1,43,1,44,1,44,1,44,1,44,1,44,1,44,1,45,1,45,1,
        45,4,45,724,8,45,11,45,12,45,725,1,45,1,45,1,46,1,46,1,46,1,46,4,
        46,734,8,46,11,46,12,46,735,1,46,1,46,1,47,1,47,1,47,1,47,1,47,1,
        48,1,48,1,48,1,48,1,48,1,49,1,49,1,49,1,49,3,49,754,8,49,1,49,1,
        49,1,49,1,50,1,50,1,50,1,50,3,50,763,8,50,1,50,1,50,1,51,1,51,1,
        51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,
        51,3,51,783,8,51,1,52,1,52,1,52,1,52,4,52,789,8,52,11,52,12,52,790,
        1,52,1,52,1,53,1,53,1,53,1,53,4,53,799,8,53,11,53,12,53,800,1,53,
        1,53,1,54,1,54,1,54,1,54,1,54,1,55,1,55,1,55,4,55,813,8,55,11,55,
        12,55,814,1,55,1,55,1,56,1,56,1,56,1,56,1,56,1,56,1,56,1,56,1,56,
        1,56,1,56,3,56,830,8,56,1,57,1,57,1,57,3,57,835,8,57,1,57,1,57,5,
        57,839,8,57,10,57,12,57,842,9,57,1,57,1,57,1,57,1,57,1,58,1,58,1,
        58,3,58,851,8,58,1,58,1,58,1,58,1,59,1,59,1,59,5,59,859,8,59,10,
        59,12,59,862,9,59,1,59,1,59,1,60,1,60,5,60,868,8,60,10,60,12,60,
        871,9,60,1,60,1,60,3,60,875,8,60,1,60,1,60,1,60,1,61,1,61,1,62,1,
        62,1,62,1,62,1,62,1,63,1,63,1,63,1,63,1,63,1,64,1,64,1,64,1,64,1,
        64,1,65,1,65,1,65,1,65,1,65,1,65,1,66,1,66,1,66,1,66,1,66,1,66,1,
        66,1,66,1,67,1,67,1,67,1,67,1,67,1,68,1,68,1,68,1,68,1,68,3,68,921,
        8,68,1,68,1,68,1,68,1,69,1,69,1,69,4,69,929,8,69,11,69,12,69,930,
        1,69,1,69,1,70,1,70,1,71,1,71,1,71,4,71,940,8,71,11,71,12,71,941,
        1,71,1,71,1,72,1,72,3,72,948,8,72,1,73,1,73,1,73,4,73,953,8,73,11,
        73,12,73,954,1,73,1,73,1,74,1,74,1,74,4,74,962,8,74,11,74,12,74,
        963,1,74,1,74,1,75,1,75,1,75,1,75,3,75,972,8,75,1,75,3,75,975,8,
        75,1,75,3,75,978,8,75,1,76,1,76,1,76,1,76,1,76,1,77,1,77,1,77,1,
        77,1,77,1,78,1,78,1,78,1,78,1,78,1,78,1,78,1,78,1,78,1,78,1,78,1,
        78,3,78,1002,8,78,1,79,1,79,1,79,1,79,5,79,1008,8,79,10,79,12,79,
        1011,9,79,1,79,3,79,1014,8,79,1,79,1,79,1,80,1,80,1,80,1,80,5,80,
        1022,8,80,10,80,12,80,1025,9,80,1,80,1,80,1,81,1,81,1,81,5,81,1032,
        8,81,10,81,12,81,1035,9,81,1,81,1,81,1,82,1,82,1,82,1,82,1,82,1,
        82,5,82,1045,8,82,10,82,12,82,1048,9,82,1,82,1,82,1,83,1,83,1,83,
        1,83,1,83,5,83,1057,8,83,10,83,12,83,1060,9,83,1,83,1,83,1,84,1,
        84,1,84,1,84,1,84,5,84,1069,8,84,10,84,12,84,1072,9,84,1,84,1,84,
        1,85,1,85,1,85,1,85,1,85,1,85,1,85,1,85,1,85,1,85,1,85,1,85,1,85,
        1,85,1,85,1,85,1,85,1,85,1,85,1,85,1,85,1,85,1,85,1,85,1,85,1,85,
        3,85,1102,8,85,1,86,1,86,1,87,1,87,1,88,1,88,1,88,5,88,1111,8,88,
        10,88,12,88,1114,9,88,1,88,1,88,1,89,1,89,1,89,1,89,5,89,1122,8,
        89,10,89,12,89,1125,9,89,1,89,1,89,1,90,1,90,1,90,1,90,1,90,1,91,
        1,91,1,91,1,91,1,91,1,91,1,92,1,92,1,92,1,92,5,92,1144,8,92,10,92,
        12,92,1147,9,92,1,92,1,92,1,93,1,93,1,93,1,93,5,93,1155,8,93,10,
        93,12,93,1158,9,93,1,93,1,93,1,94,1,94,1,94,1,94,1,94,5,94,1167,
        8,94,10,94,12,94,1170,9,94,1,94,1,94,1,95,1,95,1,95,1,95,1,95,5,
        95,1179,8,95,10,95,12,95,1182,9,95,1,95,1,95,1,96,1,96,1,96,1,96,
        1,96,1,96,1,96,1,97,1,97,1,97,1,97,1,97,4,97,1198,8,97,11,97,12,
        97,1199,1,97,1,97,1,98,1,98,1,98,1,98,3,98,1208,8,98,1,98,5,98,1211,
        8,98,10,98,12,98,1214,9,98,1,98,1,98,1,99,1,99,1,99,5,99,1221,8,
        99,10,99,12,99,1224,9,99,1,99,1,99,1,100,1,100,1,100,1,100,1,100,
        1,100,1,100,1,100,1,100,1,100,1,100,1,100,1,100,3,100,1241,8,100,
        1,101,1,101,1,101,1,101,5,101,1247,8,101,10,101,12,101,1250,9,101,
        1,101,1,101,1,102,1,102,1,102,5,102,1257,8,102,10,102,12,102,1260,
        9,102,1,102,1,102,1,103,1,103,1,104,1,104,1,104,1,104,1,104,1,104,
        1,105,1,105,1,105,1,105,1,105,1,105,1,106,1,106,1,106,1,106,1,106,
        1,107,1,107,1,107,1,107,1,107,1,108,1,108,1,108,1,108,1,108,1,109,
        1,109,1,109,1,109,1,109,1,109,1,110,1,110,1,110,1,110,1,110,1,110,
        1,111,1,111,1,111,3,111,1308,8,111,1,111,5,111,1311,8,111,10,111,
        12,111,1314,9,111,1,111,1,111,1,112,1,112,1,112,4,112,1321,8,112,
        11,112,12,112,1322,1,112,1,112,1,113,1,113,1,113,3,113,1330,8,113,
        1,113,5,113,1333,8,113,10,113,12,113,1336,9,113,3,113,1338,8,113,
        1,113,1,113,1,114,1,114,1,114,1,114,1,115,1,115,1,115,0,0,116,0,
        2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,
        48,50,52,54,56,58,60,62,64,66,68,70,72,74,76,78,80,82,84,86,88,90,
        92,94,96,98,100,102,104,106,108,110,112,114,116,118,120,122,124,
        126,128,130,132,134,136,138,140,142,144,146,148,150,152,154,156,
        158,160,162,164,166,168,170,172,174,176,178,180,182,184,186,188,
        190,192,194,196,198,200,202,204,206,208,210,212,214,216,218,220,
        222,224,226,228,230,0,5,3,0,75,75,92,93,95,95,2,0,66,66,74,74,7,
        0,5,26,29,29,31,73,75,77,81,91,93,93,95,96,1,0,31,32,3,0,75,77,92,
        93,95,95,1411,0,232,1,0,0,0,2,249,1,0,0,0,4,255,1,0,0,0,6,257,1,
        0,0,0,8,269,1,0,0,0,10,275,1,0,0,0,12,284,1,0,0,0,14,296,1,0,0,0,
        16,305,1,0,0,0,18,326,1,0,0,0,20,343,1,0,0,0,22,348,1,0,0,0,24,357,
        1,0,0,0,26,373,1,0,0,0,28,375,1,0,0,0,30,377,1,0,0,0,32,395,1,0,
        0,0,34,406,1,0,0,0,36,424,1,0,0,0,38,436,1,0,0,0,40,454,1,0,0,0,
        42,472,1,0,0,0,44,483,1,0,0,0,46,522,1,0,0,0,48,524,1,0,0,0,50,542,
        1,0,0,0,52,548,1,0,0,0,54,566,1,0,0,0,56,572,1,0,0,0,58,581,1,0,
        0,0,60,592,1,0,0,0,62,602,1,0,0,0,64,609,1,0,0,0,66,614,1,0,0,0,
        68,622,1,0,0,0,70,628,1,0,0,0,72,642,1,0,0,0,74,653,1,0,0,0,76,655,
        1,0,0,0,78,681,1,0,0,0,80,683,1,0,0,0,82,692,1,0,0,0,84,699,1,0,
        0,0,86,709,1,0,0,0,88,714,1,0,0,0,90,720,1,0,0,0,92,729,1,0,0,0,
        94,739,1,0,0,0,96,744,1,0,0,0,98,749,1,0,0,0,100,758,1,0,0,0,102,
        782,1,0,0,0,104,784,1,0,0,0,106,794,1,0,0,0,108,804,1,0,0,0,110,
        809,1,0,0,0,112,829,1,0,0,0,114,831,1,0,0,0,116,847,1,0,0,0,118,
        855,1,0,0,0,120,865,1,0,0,0,122,879,1,0,0,0,124,881,1,0,0,0,126,
        886,1,0,0,0,128,891,1,0,0,0,130,896,1,0,0,0,132,902,1,0,0,0,134,
        910,1,0,0,0,136,915,1,0,0,0,138,925,1,0,0,0,140,934,1,0,0,0,142,
        936,1,0,0,0,144,947,1,0,0,0,146,949,1,0,0,0,148,958,1,0,0,0,150,
        977,1,0,0,0,152,979,1,0,0,0,154,984,1,0,0,0,156,1001,1,0,0,0,158,
        1003,1,0,0,0,160,1017,1,0,0,0,162,1028,1,0,0,0,164,1038,1,0,0,0,
        166,1051,1,0,0,0,168,1063,1,0,0,0,170,1101,1,0,0,0,172,1103,1,0,
        0,0,174,1105,1,0,0,0,176,1107,1,0,0,0,178,1117,1,0,0,0,180,1128,
        1,0,0,0,182,1133,1,0,0,0,184,1139,1,0,0,0,186,1150,1,0,0,0,188,1161,
        1,0,0,0,190,1173,1,0,0,0,192,1185,1,0,0,0,194,1192,1,0,0,0,196,1203,
        1,0,0,0,198,1217,1,0,0,0,200,1240,1,0,0,0,202,1242,1,0,0,0,204,1253,
        1,0,0,0,206,1263,1,0,0,0,208,1265,1,0,0,0,210,1271,1,0,0,0,212,1277,
        1,0,0,0,214,1282,1,0,0,0,216,1287,1,0,0,0,218,1292,1,0,0,0,220,1298,
        1,0,0,0,222,1304,1,0,0,0,224,1317,1,0,0,0,226,1326,1,0,0,0,228,1341,
        1,0,0,0,230,1345,1,0,0,0,232,233,5,2,0,0,233,237,5,5,0,0,234,236,
        3,2,1,0,235,234,1,0,0,0,236,239,1,0,0,0,237,235,1,0,0,0,237,238,
        1,0,0,0,238,240,1,0,0,0,239,237,1,0,0,0,240,241,5,3,0,0,241,1,1,
        0,0,0,242,250,3,6,3,0,243,250,3,8,4,0,244,250,3,10,5,0,245,250,3,
        12,6,0,246,250,3,16,8,0,247,250,3,96,48,0,248,250,3,46,23,0,249,
        242,1,0,0,0,249,243,1,0,0,0,249,244,1,0,0,0,249,245,1,0,0,0,249,
        246,1,0,0,0,249,247,1,0,0,0,249,248,1,0,0,0,250,3,1,0,0,0,251,256,
        3,8,4,0,252,256,3,16,8,0,253,256,3,12,6,0,254,256,3,10,5,0,255,251,
        1,0,0,0,255,252,1,0,0,0,255,253,1,0,0,0,255,254,1,0,0,0,256,5,1,
        0,0,0,257,258,5,2,0,0,258,259,5,16,0,0,259,260,5,96,0,0,260,264,
        3,226,113,0,261,263,3,46,23,0,262,261,1,0,0,0,263,266,1,0,0,0,264,
        262,1,0,0,0,264,265,1,0,0,0,265,267,1,0,0,0,266,264,1,0,0,0,267,
        268,5,3,0,0,268,7,1,0,0,0,269,270,5,2,0,0,270,271,5,15,0,0,271,272,
        5,96,0,0,272,273,3,170,85,0,273,274,5,3,0,0,274,9,1,0,0,0,275,276,
        5,2,0,0,276,277,5,71,0,0,277,279,5,96,0,0,278,280,3,148,74,0,279,
        278,1,0,0,0,279,280,1,0,0,0,280,281,1,0,0,0,281,282,3,102,51,0,282,
        283,5,3,0,0,283,11,1,0,0,0,284,285,5,2,0,0,285,286,5,72,0,0,286,
        288,5,96,0,0,287,289,3,148,74,0,288,287,1,0,0,0,288,289,1,0,0,0,
        289,291,1,0,0,0,290,292,3,14,7,0,291,290,1,0,0,0,291,292,1,0,0,0,
        292,293,1,0,0,0,293,294,3,118,59,0,294,295,5,3,0,0,295,13,1,0,0,
        0,296,297,5,2,0,0,297,299,5,69,0,0,298,300,3,102,51,0,299,298,1,
        0,0,0,300,301,1,0,0,0,301,299,1,0,0,0,301,302,1,0,0,0,302,303,1,
        0,0,0,303,304,5,3,0,0,304,15,1,0,0,0,305,306,5,2,0,0,306,310,5,46,
        0,0,307,309,3,28,14,0,308,307,1,0,0,0,309,312,1,0,0,0,310,308,1,
        0,0,0,310,311,1,0,0,0,311,313,1,0,0,0,312,310,1,0,0,0,313,315,5,
        96,0,0,314,316,3,148,74,0,315,314,1,0,0,0,315,316,1,0,0,0,316,318,
        1,0,0,0,317,319,3,20,10,0,318,317,1,0,0,0,318,319,1,0,0,0,319,321,
        1,0,0,0,320,322,3,22,11,0,321,320,1,0,0,0,321,322,1,0,0,0,322,323,
        1,0,0,0,323,324,3,24,12,0,324,325,5,3,0,0,325,17,1,0,0,0,326,327,
        5,2,0,0,327,331,5,46,0,0,328,330,3,28,14,0,329,328,1,0,0,0,330,333,
        1,0,0,0,331,329,1,0,0,0,331,332,1,0,0,0,332,335,1,0,0,0,333,331,
        1,0,0,0,334,336,3,20,10,0,335,334,1,0,0,0,335,336,1,0,0,0,336,338,
        1,0,0,0,337,339,3,22,11,0,338,337,1,0,0,0,338,339,1,0,0,0,339,340,
        1,0,0,0,340,341,3,24,12,0,341,342,5,3,0,0,342,19,1,0,0,0,343,344,
        5,2,0,0,344,345,5,69,0,0,345,346,3,102,51,0,346,347,5,3,0,0,347,
        21,1,0,0,0,348,349,5,2,0,0,349,351,5,53,0,0,350,352,3,102,51,0,351,
        350,1,0,0,0,352,353,1,0,0,0,353,351,1,0,0,0,353,354,1,0,0,0,354,
        355,1,0,0,0,355,356,5,3,0,0,356,23,1,0,0,0,357,358,5,2,0,0,358,362,
        5,43,0,0,359,361,3,26,13,0,360,359,1,0,0,0,361,364,1,0,0,0,362,360,
        1,0,0,0,362,363,1,0,0,0,363,365,1,0,0,0,364,362,1,0,0,0,365,366,
        5,3,0,0,366,25,1,0,0,0,367,374,3,30,15,0,368,374,3,32,16,0,369,374,
        3,34,17,0,370,374,3,36,18,0,371,374,3,38,19,0,372,374,3,40,20,0,
        373,367,1,0,0,0,373,368,1,0,0,0,373,369,1,0,0,0,373,370,1,0,0,0,
        373,371,1,0,0,0,373,372,1,0,0,0,374,27,1,0,0,0,375,376,5,91,0,0,
        376,29,1,0,0,0,377,378,5,2,0,0,378,382,5,47,0,0,379,381,3,28,14,
        0,380,379,1,0,0,0,381,384,1,0,0,0,382,380,1,0,0,0,382,383,1,0,0,
        0,383,385,1,0,0,0,384,382,1,0,0,0,385,388,5,96,0,0,386,387,5,78,
        0,0,387,389,3,102,51,0,388,386,1,0,0,0,388,389,1,0,0,0,389,391,1,
        0,0,0,390,392,3,170,85,0,391,390,1,0,0,0,391,392,1,0,0,0,392,393,
        1,0,0,0,393,394,5,3,0,0,394,31,1,0,0,0,395,396,5,2,0,0,396,397,5,
        48,0,0,397,401,3,44,22,0,398,400,3,46,23,0,399,398,1,0,0,0,400,403,
        1,0,0,0,401,399,1,0,0,0,401,402,1,0,0,0,402,404,1,0,0,0,403,401,
        1,0,0,0,404,405,5,3,0,0,405,33,1,0,0,0,406,407,5,2,0,0,407,411,5,
        12,0,0,408,410,3,28,14,0,409,408,1,0,0,0,410,413,1,0,0,0,411,409,
        1,0,0,0,411,412,1,0,0,0,412,414,1,0,0,0,413,411,1,0,0,0,414,415,
        5,96,0,0,415,419,3,44,22,0,416,418,3,46,23,0,417,416,1,0,0,0,418,
        421,1,0,0,0,419,417,1,0,0,0,419,420,1,0,0,0,420,422,1,0,0,0,421,
        419,1,0,0,0,422,423,5,3,0,0,423,35,1,0,0,0,424,425,5,2,0,0,425,429,
        5,45,0,0,426,428,3,28,14,0,427,426,1,0,0,0,428,431,1,0,0,0,429,427,
        1,0,0,0,429,430,1,0,0,0,430,432,1,0,0,0,431,429,1,0,0,0,432,433,
        5,96,0,0,433,434,3,44,22,0,434,435,5,3,0,0,435,37,1,0,0,0,436,437,
        5,2,0,0,437,441,5,51,0,0,438,440,3,28,14,0,439,438,1,0,0,0,440,443,
        1,0,0,0,441,439,1,0,0,0,441,442,1,0,0,0,442,444,1,0,0,0,443,441,
        1,0,0,0,444,445,5,96,0,0,445,449,3,44,22,0,446,448,3,46,23,0,447,
        446,1,0,0,0,448,451,1,0,0,0,449,447,1,0,0,0,449,450,1,0,0,0,450,
        452,1,0,0,0,451,449,1,0,0,0,452,453,5,3,0,0,453,39,1,0,0,0,454,455,
        5,2,0,0,455,459,5,52,0,0,456,458,3,28,14,0,457,456,1,0,0,0,458,461,
        1,0,0,0,459,457,1,0,0,0,459,460,1,0,0,0,460,462,1,0,0,0,461,459,
        1,0,0,0,462,463,5,96,0,0,463,467,3,44,22,0,464,466,3,46,23,0,465,
        464,1,0,0,0,466,469,1,0,0,0,467,465,1,0,0,0,467,468,1,0,0,0,468,
        470,1,0,0,0,469,467,1,0,0,0,470,471,5,3,0,0,471,41,1,0,0,0,472,473,
        5,2,0,0,473,475,5,96,0,0,474,476,5,74,0,0,475,474,1,0,0,0,475,476,
        1,0,0,0,476,479,1,0,0,0,477,478,5,78,0,0,478,480,3,102,51,0,479,
        477,1,0,0,0,479,480,1,0,0,0,480,481,1,0,0,0,481,482,5,3,0,0,482,
        43,1,0,0,0,483,494,5,2,0,0,484,491,3,42,21,0,485,487,5,4,0,0,486,
        485,1,0,0,0,486,487,1,0,0,0,487,488,1,0,0,0,488,490,3,42,21,0,489,
        486,1,0,0,0,490,493,1,0,0,0,491,489,1,0,0,0,491,492,1,0,0,0,492,
        495,1,0,0,0,493,491,1,0,0,0,494,484,1,0,0,0,494,495,1,0,0,0,495,
        496,1,0,0,0,496,502,5,3,0,0,497,498,5,2,0,0,498,499,5,70,0,0,499,
        500,3,102,51,0,500,501,5,3,0,0,501,503,1,0,0,0,502,497,1,0,0,0,502,
        503,1,0,0,0,503,45,1,0,0,0,504,523,3,48,24,0,505,523,3,50,25,0,506,
        523,3,52,26,0,507,523,3,54,27,0,508,523,3,56,28,0,509,523,3,58,29,
        0,510,523,3,60,30,0,511,523,3,62,31,0,512,523,3,64,32,0,513,523,
        3,66,33,0,514,523,3,68,34,0,515,523,3,74,37,0,516,523,3,158,79,0,
        517,523,3,164,82,0,518,523,3,166,83,0,519,523,3,168,84,0,520,523,
        3,156,78,0,521,523,3,170,85,0,522,504,1,0,0,0,522,505,1,0,0,0,522,
        506,1,0,0,0,522,507,1,0,0,0,522,508,1,0,0,0,522,509,1,0,0,0,522,
        510,1,0,0,0,522,511,1,0,0,0,522,512,1,0,0,0,522,513,1,0,0,0,522,
        514,1,0,0,0,522,515,1,0,0,0,522,516,1,0,0,0,522,517,1,0,0,0,522,
        518,1,0,0,0,522,519,1,0,0,0,522,520,1,0,0,0,522,521,1,0,0,0,523,
        47,1,0,0,0,524,525,5,2,0,0,525,526,5,6,0,0,526,530,5,2,0,0,527,529,
        3,98,49,0,528,527,1,0,0,0,529,532,1,0,0,0,530,528,1,0,0,0,530,531,
        1,0,0,0,531,533,1,0,0,0,532,530,1,0,0,0,533,537,5,3,0,0,534,536,
        3,46,23,0,535,534,1,0,0,0,536,539,1,0,0,0,537,535,1,0,0,0,537,538,
        1,0,0,0,538,540,1,0,0,0,539,537,1,0,0,0,540,541,5,3,0,0,541,49,1,
        0,0,0,542,543,5,2,0,0,543,544,5,7,0,0,544,545,3,100,50,0,545,546,
        3,170,85,0,546,547,5,3,0,0,547,51,1,0,0,0,548,549,5,2,0,0,549,550,
        5,8,0,0,550,554,5,2,0,0,551,553,3,98,49,0,552,551,1,0,0,0,553,556,
        1,0,0,0,554,552,1,0,0,0,554,555,1,0,0,0,555,557,1,0,0,0,556,554,
        1,0,0,0,557,561,5,3,0,0,558,560,3,46,23,0,559,558,1,0,0,0,560,563,
        1,0,0,0,561,559,1,0,0,0,561,562,1,0,0,0,562,564,1,0,0,0,563,561,
        1,0,0,0,564,565,5,3,0,0,565,53,1,0,0,0,566,567,5,2,0,0,567,568,5,
        9,0,0,568,569,3,100,50,0,569,570,3,170,85,0,570,571,5,3,0,0,571,
        55,1,0,0,0,572,573,5,2,0,0,573,574,5,17,0,0,574,575,3,170,85,0,575,
        577,3,46,23,0,576,578,3,46,23,0,577,576,1,0,0,0,577,578,1,0,0,0,
        578,579,1,0,0,0,579,580,5,3,0,0,580,57,1,0,0,0,581,582,5,2,0,0,582,
        583,5,18,0,0,583,587,3,170,85,0,584,586,3,46,23,0,585,584,1,0,0,
        0,586,589,1,0,0,0,587,585,1,0,0,0,587,588,1,0,0,0,588,590,1,0,0,
        0,589,587,1,0,0,0,590,591,5,3,0,0,591,59,1,0,0,0,592,593,5,2,0,0,
        593,597,5,19,0,0,594,596,3,46,23,0,595,594,1,0,0,0,596,599,1,0,0,
        0,597,595,1,0,0,0,597,598,1,0,0,0,598,600,1,0,0,0,599,597,1,0,0,
        0,600,601,5,3,0,0,601,61,1,0,0,0,602,603,5,2,0,0,603,605,5,20,0,
        0,604,606,3,170,85,0,605,604,1,0,0,0,605,606,1,0,0,0,606,607,1,0,
        0,0,607,608,5,3,0,0,608,63,1,0,0,0,609,610,5,2,0,0,610,611,5,21,
        0,0,611,612,3,170,85,0,612,613,5,3,0,0,613,65,1,0,0,0,614,615,5,
        2,0,0,615,617,5,36,0,0,616,618,3,198,99,0,617,616,1,0,0,0,617,618,
        1,0,0,0,618,619,1,0,0,0,619,620,5,93,0,0,620,621,5,3,0,0,621,67,
        1,0,0,0,622,623,5,2,0,0,623,624,5,87,0,0,624,625,3,70,35,0,625,626,
        5,93,0,0,626,627,5,3,0,0,627,69,1,0,0,0,628,629,5,2,0,0,629,631,
        5,96,0,0,630,632,3,72,36,0,631,630,1,0,0,0,632,633,1,0,0,0,633,631,
        1,0,0,0,633,634,1,0,0,0,634,635,1,0,0,0,635,636,5,3,0,0,636,71,1,
        0,0,0,637,643,5,96,0,0,638,639,5,2,0,0,639,640,5,96,0,0,640,641,
        5,96,0,0,641,643,5,3,0,0,642,637,1,0,0,0,642,638,1,0,0,0,643,73,
        1,0,0,0,644,654,3,76,38,0,645,654,3,78,39,0,646,654,3,80,40,0,647,
        654,3,88,44,0,648,654,3,84,42,0,649,654,3,86,43,0,650,654,3,90,45,
        0,651,654,3,92,46,0,652,654,3,94,47,0,653,644,1,0,0,0,653,645,1,
        0,0,0,653,646,1,0,0,0,653,647,1,0,0,0,653,648,1,0,0,0,653,649,1,
        0,0,0,653,650,1,0,0,0,653,651,1,0,0,0,653,652,1,0,0,0,654,75,1,0,
        0,0,655,656,5,2,0,0,656,657,5,81,0,0,657,658,5,96,0,0,658,659,3,
        170,85,0,659,660,5,3,0,0,660,77,1,0,0,0,661,662,5,2,0,0,662,663,
        5,82,0,0,663,664,3,16,8,0,664,665,5,3,0,0,665,682,1,0,0,0,666,667,
        5,2,0,0,667,668,5,82,0,0,668,669,3,18,9,0,669,670,5,3,0,0,670,682,
        1,0,0,0,671,672,5,2,0,0,672,673,5,82,0,0,673,674,3,8,4,0,674,675,
        5,3,0,0,675,682,1,0,0,0,676,677,5,2,0,0,677,678,5,82,0,0,678,679,
        3,170,85,0,679,680,5,3,0,0,680,682,1,0,0,0,681,661,1,0,0,0,681,666,
        1,0,0,0,681,671,1,0,0,0,681,676,1,0,0,0,682,79,1,0,0,0,683,684,5,
        2,0,0,684,686,5,83,0,0,685,687,3,82,41,0,686,685,1,0,0,0,687,688,
        1,0,0,0,688,686,1,0,0,0,688,689,1,0,0,0,689,690,1,0,0,0,690,691,
        5,3,0,0,691,81,1,0,0,0,692,693,5,2,0,0,693,695,5,96,0,0,694,696,
        5,96,0,0,695,694,1,0,0,0,695,696,1,0,0,0,696,697,1,0,0,0,697,698,
        5,3,0,0,698,83,1,0,0,0,699,700,5,2,0,0,700,701,5,85,0,0,701,703,
        5,93,0,0,702,704,3,82,41,0,703,702,1,0,0,0,704,705,1,0,0,0,705,703,
        1,0,0,0,705,706,1,0,0,0,706,707,1,0,0,0,707,708,5,3,0,0,708,85,1,
        0,0,0,709,710,5,2,0,0,710,711,5,86,0,0,711,712,5,93,0,0,712,713,
        5,3,0,0,713,87,1,0,0,0,714,715,5,2,0,0,715,716,5,84,0,0,716,717,
        5,93,0,0,717,718,5,93,0,0,718,719,5,3,0,0,719,89,1,0,0,0,720,721,
        5,2,0,0,721,723,5,90,0,0,722,724,3,82,41,0,723,722,1,0,0,0,724,725,
        1,0,0,0,725,723,1,0,0,0,725,726,1,0,0,0,726,727,1,0,0,0,727,728,
        5,3,0,0,728,91,1,0,0,0,729,730,5,2,0,0,730,731,5,89,0,0,731,733,
        5,93,0,0,732,734,3,82,41,0,733,732,1,0,0,0,734,735,1,0,0,0,735,733,
        1,0,0,0,735,736,1,0,0,0,736,737,1,0,0,0,737,738,5,3,0,0,738,93,1,
        0,0,0,739,740,5,2,0,0,740,741,5,88,0,0,741,742,5,93,0,0,742,743,
        5,3,0,0,743,95,1,0,0,0,744,745,5,2,0,0,745,746,5,81,0,0,746,747,
        3,4,2,0,747,748,5,3,0,0,748,97,1,0,0,0,749,750,5,2,0,0,750,753,5,
        96,0,0,751,752,5,78,0,0,752,754,3,102,51,0,753,751,1,0,0,0,753,754,
        1,0,0,0,754,755,1,0,0,0,755,756,3,170,85,0,756,757,5,3,0,0,757,99,
        1,0,0,0,758,759,5,2,0,0,759,762,5,96,0,0,760,761,5,78,0,0,761,763,
        3,102,51,0,762,760,1,0,0,0,762,763,1,0,0,0,763,764,1,0,0,0,764,765,
        5,3,0,0,765,101,1,0,0,0,766,783,5,96,0,0,767,783,3,104,52,0,768,
        783,3,106,53,0,769,783,3,108,54,0,770,783,3,110,55,0,771,783,3,114,
        57,0,772,783,3,118,59,0,773,783,3,124,62,0,774,783,3,126,63,0,775,
        783,3,128,64,0,776,783,3,130,65,0,777,783,3,132,66,0,778,783,3,134,
        67,0,779,783,3,136,68,0,780,783,3,142,71,0,781,783,3,146,73,0,782,
        766,1,0,0,0,782,767,1,0,0,0,782,768,1,0,0,0,782,769,1,0,0,0,782,
        770,1,0,0,0,782,771,1,0,0,0,782,772,1,0,0,0,782,773,1,0,0,0,782,
        774,1,0,0,0,782,775,1,0,0,0,782,776,1,0,0,0,782,777,1,0,0,0,782,
        778,1,0,0,0,782,779,1,0,0,0,782,780,1,0,0,0,782,781,1,0,0,0,783,
        103,1,0,0,0,784,785,5,2,0,0,785,786,5,54,0,0,786,788,3,102,51,0,
        787,789,3,102,51,0,788,787,1,0,0,0,789,790,1,0,0,0,790,788,1,0,0,
        0,790,791,1,0,0,0,791,792,1,0,0,0,792,793,5,3,0,0,793,105,1,0,0,
        0,794,795,5,2,0,0,795,796,5,55,0,0,796,798,3,102,51,0,797,799,3,
        102,51,0,798,797,1,0,0,0,799,800,1,0,0,0,800,798,1,0,0,0,800,801,
        1,0,0,0,801,802,1,0,0,0,802,803,5,3,0,0,803,107,1,0,0,0,804,805,
        5,2,0,0,805,806,5,26,0,0,806,807,3,102,51,0,807,808,5,3,0,0,808,
        109,1,0,0,0,809,810,5,2,0,0,810,812,5,56,0,0,811,813,3,112,56,0,
        812,811,1,0,0,0,813,814,1,0,0,0,814,812,1,0,0,0,814,815,1,0,0,0,
        815,816,1,0,0,0,816,817,5,3,0,0,817,111,1,0,0,0,818,819,5,2,0,0,
        819,820,5,65,0,0,820,821,3,102,51,0,821,822,5,3,0,0,822,830,1,0,
        0,0,823,824,5,2,0,0,824,825,5,96,0,0,825,826,3,102,51,0,826,827,
        5,3,0,0,827,830,1,0,0,0,828,830,3,102,51,0,829,818,1,0,0,0,829,823,
        1,0,0,0,829,828,1,0,0,0,830,113,1,0,0,0,831,832,5,2,0,0,832,834,
        5,57,0,0,833,835,3,148,74,0,834,833,1,0,0,0,834,835,1,0,0,0,835,
        836,1,0,0,0,836,840,5,2,0,0,837,839,3,116,58,0,838,837,1,0,0,0,839,
        842,1,0,0,0,840,838,1,0,0,0,840,841,1,0,0,0,841,843,1,0,0,0,842,
        840,1,0,0,0,843,844,5,3,0,0,844,845,3,102,51,0,845,846,5,3,0,0,846,
        115,1,0,0,0,847,848,5,2,0,0,848,850,5,96,0,0,849,851,5,74,0,0,850,
        849,1,0,0,0,850,851,1,0,0,0,851,852,1,0,0,0,852,853,3,102,51,0,853,
        854,5,3,0,0,854,117,1,0,0,0,855,856,5,2,0,0,856,860,5,96,0,0,857,
        859,3,120,60,0,858,857,1,0,0,0,859,862,1,0,0,0,860,858,1,0,0,0,860,
        861,1,0,0,0,861,863,1,0,0,0,862,860,1,0,0,0,863,864,5,3,0,0,864,
        119,1,0,0,0,865,869,5,2,0,0,866,868,3,122,61,0,867,866,1,0,0,0,868,
        871,1,0,0,0,869,867,1,0,0,0,869,870,1,0,0,0,870,872,1,0,0,0,871,
        869,1,0,0,0,872,874,5,96,0,0,873,875,5,74,0,0,874,873,1,0,0,0,874,
        875,1,0,0,0,875,876,1,0,0,0,876,877,3,102,51,0,877,878,5,3,0,0,878,
        121,1,0,0,0,879,880,5,66,0,0,880,123,1,0,0,0,881,882,5,2,0,0,882,
        883,5,58,0,0,883,884,7,0,0,0,884,885,5,3,0,0,885,125,1,0,0,0,886,
        887,5,2,0,0,887,888,5,59,0,0,888,889,3,102,51,0,889,890,5,3,0,0,
        890,127,1,0,0,0,891,892,5,2,0,0,892,893,5,60,0,0,893,894,5,96,0,
        0,894,895,5,3,0,0,895,129,1,0,0,0,896,897,5,2,0,0,897,898,5,29,0,
        0,898,899,3,102,51,0,899,900,3,102,51,0,900,901,5,3,0,0,901,131,
        1,0,0,0,902,903,5,2,0,0,903,904,5,24,0,0,904,905,3,102,51,0,905,
        906,3,102,51,0,906,907,3,102,51,0,907,908,3,102,51,0,908,909,5,3,
        0,0,909,133,1,0,0,0,910,911,5,2,0,0,911,912,5,62,0,0,912,913,5,96,
        0,0,913,914,5,3,0,0,914,135,1,0,0,0,915,916,5,2,0,0,916,917,5,63,
        0,0,917,918,5,96,0,0,918,920,3,102,51,0,919,921,3,138,69,0,920,919,
        1,0,0,0,920,921,1,0,0,0,921,922,1,0,0,0,922,923,3,102,51,0,923,924,
        5,3,0,0,924,137,1,0,0,0,925,926,5,2,0,0,926,928,5,73,0,0,927,929,
        3,140,70,0,928,927,1,0,0,0,929,930,1,0,0,0,930,928,1,0,0,0,930,931,
        1,0,0,0,931,932,1,0,0,0,932,933,5,3,0,0,933,139,1,0,0,0,934,935,
        7,1,0,0,935,141,1,0,0,0,936,937,5,2,0,0,937,939,5,64,0,0,938,940,
        3,144,72,0,939,938,1,0,0,0,940,941,1,0,0,0,941,939,1,0,0,0,941,942,
        1,0,0,0,942,943,1,0,0,0,943,944,5,3,0,0,944,143,1,0,0,0,945,948,
        5,93,0,0,946,948,3,102,51,0,947,945,1,0,0,0,947,946,1,0,0,0,948,
        145,1,0,0,0,949,950,5,2,0,0,950,952,3,102,51,0,951,953,3,102,51,
        0,952,951,1,0,0,0,953,954,1,0,0,0,954,952,1,0,0,0,954,955,1,0,0,
        0,955,956,1,0,0,0,956,957,5,3,0,0,957,147,1,0,0,0,958,959,5,2,0,
        0,959,961,5,67,0,0,960,962,3,150,75,0,961,960,1,0,0,0,962,963,1,
        0,0,0,963,961,1,0,0,0,963,964,1,0,0,0,964,965,1,0,0,0,965,966,5,
        3,0,0,966,149,1,0,0,0,967,978,5,96,0,0,968,969,5,2,0,0,969,971,5,
        96,0,0,970,972,3,152,76,0,971,970,1,0,0,0,971,972,1,0,0,0,972,974,
        1,0,0,0,973,975,3,154,77,0,974,973,1,0,0,0,974,975,1,0,0,0,975,976,
        1,0,0,0,976,978,5,3,0,0,977,967,1,0,0,0,977,968,1,0,0,0,978,151,
        1,0,0,0,979,980,5,2,0,0,980,981,5,69,0,0,981,982,3,102,51,0,982,
        983,5,3,0,0,983,153,1,0,0,0,984,985,5,2,0,0,985,986,5,39,0,0,986,
        987,3,102,51,0,987,988,5,3,0,0,988,155,1,0,0,0,989,990,5,2,0,0,990,
        991,5,22,0,0,991,992,5,96,0,0,992,993,3,170,85,0,993,994,5,3,0,0,
        994,1002,1,0,0,0,995,996,5,2,0,0,996,997,5,22,0,0,997,998,3,208,
        104,0,998,999,3,170,85,0,999,1000,5,3,0,0,1000,1002,1,0,0,0,1001,
        989,1,0,0,0,1001,995,1,0,0,0,1002,157,1,0,0,0,1003,1004,5,2,0,0,
        1004,1005,5,37,0,0,1005,1009,3,170,85,0,1006,1008,3,160,80,0,1007,
        1006,1,0,0,0,1008,1011,1,0,0,0,1009,1007,1,0,0,0,1009,1010,1,0,0,
        0,1010,1013,1,0,0,0,1011,1009,1,0,0,0,1012,1014,3,162,81,0,1013,
        1012,1,0,0,0,1013,1014,1,0,0,0,1014,1015,1,0,0,0,1015,1016,5,3,0,
        0,1016,159,1,0,0,0,1017,1018,5,2,0,0,1018,1019,5,38,0,0,1019,1023,
        3,170,85,0,1020,1022,3,46,23,0,1021,1020,1,0,0,0,1022,1025,1,0,0,
        0,1023,1021,1,0,0,0,1023,1024,1,0,0,0,1024,1026,1,0,0,0,1025,1023,
        1,0,0,0,1026,1027,5,3,0,0,1027,161,1,0,0,0,1028,1029,5,2,0,0,1029,
        1033,5,39,0,0,1030,1032,3,46,23,0,1031,1030,1,0,0,0,1032,1035,1,
        0,0,0,1033,1031,1,0,0,0,1033,1034,1,0,0,0,1034,1036,1,0,0,0,1035,
        1033,1,0,0,0,1036,1037,5,3,0,0,1037,163,1,0,0,0,1038,1039,5,2,0,
        0,1039,1040,5,42,0,0,1040,1041,3,50,25,0,1041,1042,3,170,85,0,1042,
        1046,3,156,78,0,1043,1045,3,46,23,0,1044,1043,1,0,0,0,1045,1048,
        1,0,0,0,1046,1044,1,0,0,0,1046,1047,1,0,0,0,1047,1049,1,0,0,0,1048,
        1046,1,0,0,0,1049,1050,5,3,0,0,1050,165,1,0,0,0,1051,1052,5,2,0,
        0,1052,1053,5,40,0,0,1053,1054,5,96,0,0,1054,1058,3,170,85,0,1055,
        1057,3,46,23,0,1056,1055,1,0,0,0,1057,1060,1,0,0,0,1058,1056,1,0,
        0,0,1058,1059,1,0,0,0,1059,1061,1,0,0,0,1060,1058,1,0,0,0,1061,1062,
        5,3,0,0,1062,167,1,0,0,0,1063,1064,5,2,0,0,1064,1065,5,41,0,0,1065,
        1066,5,96,0,0,1066,1070,3,170,85,0,1067,1069,3,46,23,0,1068,1067,
        1,0,0,0,1069,1072,1,0,0,0,1070,1068,1,0,0,0,1070,1071,1,0,0,0,1071,
        1073,1,0,0,0,1072,1070,1,0,0,0,1073,1074,5,3,0,0,1074,169,1,0,0,
        0,1075,1102,3,230,115,0,1076,1102,5,91,0,0,1077,1102,5,96,0,0,1078,
        1102,3,184,92,0,1079,1102,3,186,93,0,1080,1102,3,188,94,0,1081,1102,
        3,190,95,0,1082,1102,3,198,99,0,1083,1102,3,204,102,0,1084,1102,
        3,208,104,0,1085,1102,3,210,105,0,1086,1102,3,212,106,0,1087,1102,
        3,214,107,0,1088,1102,3,216,108,0,1089,1102,3,192,96,0,1090,1102,
        3,194,97,0,1091,1102,3,196,98,0,1092,1102,3,218,109,0,1093,1102,
        3,220,110,0,1094,1102,3,180,90,0,1095,1102,3,182,91,0,1096,1102,
        3,172,86,0,1097,1102,3,174,87,0,1098,1102,3,176,88,0,1099,1102,3,
        178,89,0,1100,1102,3,222,111,0,1101,1075,1,0,0,0,1101,1076,1,0,0,
        0,1101,1077,1,0,0,0,1101,1078,1,0,0,0,1101,1079,1,0,0,0,1101,1080,
        1,0,0,0,1101,1081,1,0,0,0,1101,1082,1,0,0,0,1101,1083,1,0,0,0,1101,
        1084,1,0,0,0,1101,1085,1,0,0,0,1101,1086,1,0,0,0,1101,1087,1,0,0,
        0,1101,1088,1,0,0,0,1101,1089,1,0,0,0,1101,1090,1,0,0,0,1101,1091,
        1,0,0,0,1101,1092,1,0,0,0,1101,1093,1,0,0,0,1101,1094,1,0,0,0,1101,
        1095,1,0,0,0,1101,1096,1,0,0,0,1101,1097,1,0,0,0,1101,1098,1,0,0,
        0,1101,1099,1,0,0,0,1101,1100,1,0,0,0,1102,171,1,0,0,0,1103,1104,
        5,49,0,0,1104,173,1,0,0,0,1105,1106,5,50,0,0,1106,175,1,0,0,0,1107,
        1108,5,2,0,0,1108,1112,5,50,0,0,1109,1111,3,170,85,0,1110,1109,1,
        0,0,0,1111,1114,1,0,0,0,1112,1110,1,0,0,0,1112,1113,1,0,0,0,1113,
        1115,1,0,0,0,1114,1112,1,0,0,0,1115,1116,5,3,0,0,1116,177,1,0,0,
        0,1117,1118,5,2,0,0,1118,1119,5,44,0,0,1119,1123,5,96,0,0,1120,1122,
        3,170,85,0,1121,1120,1,0,0,0,1122,1125,1,0,0,0,1123,1121,1,0,0,0,
        1123,1124,1,0,0,0,1124,1126,1,0,0,0,1125,1123,1,0,0,0,1126,1127,
        5,3,0,0,1127,179,1,0,0,0,1128,1129,5,2,0,0,1129,1130,5,60,0,0,1130,
        1131,3,170,85,0,1131,1132,5,3,0,0,1132,181,1,0,0,0,1133,1134,5,2,
        0,0,1134,1135,5,61,0,0,1135,1136,3,170,85,0,1136,1137,3,102,51,0,
        1137,1138,5,3,0,0,1138,183,1,0,0,0,1139,1140,5,2,0,0,1140,1141,5,
        10,0,0,1141,1145,3,226,113,0,1142,1144,3,46,23,0,1143,1142,1,0,0,
        0,1144,1147,1,0,0,0,1145,1143,1,0,0,0,1145,1146,1,0,0,0,1146,1148,
        1,0,0,0,1147,1145,1,0,0,0,1148,1149,5,3,0,0,1149,185,1,0,0,0,1150,
        1151,5,2,0,0,1151,1152,5,11,0,0,1152,1156,3,226,113,0,1153,1155,
        3,46,23,0,1154,1153,1,0,0,0,1155,1158,1,0,0,0,1156,1154,1,0,0,0,
        1156,1157,1,0,0,0,1157,1159,1,0,0,0,1158,1156,1,0,0,0,1159,1160,
        5,3,0,0,1160,187,1,0,0,0,1161,1162,5,2,0,0,1162,1163,5,13,0,0,1163,
        1164,3,170,85,0,1164,1168,3,170,85,0,1165,1167,3,170,85,0,1166,1165,
        1,0,0,0,1167,1170,1,0,0,0,1168,1166,1,0,0,0,1168,1169,1,0,0,0,1169,
        1171,1,0,0,0,1170,1168,1,0,0,0,1171,1172,5,3,0,0,1172,189,1,0,0,
        0,1173,1174,5,2,0,0,1174,1175,5,14,0,0,1175,1176,3,170,85,0,1176,
        1180,3,170,85,0,1177,1179,3,170,85,0,1178,1177,1,0,0,0,1179,1182,
        1,0,0,0,1180,1178,1,0,0,0,1180,1181,1,0,0,0,1181,1183,1,0,0,0,1182,
        1180,1,0,0,0,1183,1184,5,3,0,0,1184,191,1,0,0,0,1185,1186,5,2,0,
        0,1186,1187,5,23,0,0,1187,1188,3,170,85,0,1188,1189,3,170,85,0,1189,
        1190,3,170,85,0,1190,1191,5,3,0,0,1191,193,1,0,0,0,1192,1193,5,2,
        0,0,1193,1197,5,24,0,0,1194,1195,3,170,85,0,1195,1196,3,170,85,0,
        1196,1198,1,0,0,0,1197,1194,1,0,0,0,1198,1199,1,0,0,0,1199,1197,
        1,0,0,0,1199,1200,1,0,0,0,1200,1201,1,0,0,0,1201,1202,5,3,0,0,1202,
        195,1,0,0,0,1203,1204,5,2,0,0,1204,1205,5,35,0,0,1205,1207,5,96,
        0,0,1206,1208,3,224,112,0,1207,1206,1,0,0,0,1207,1208,1,0,0,0,1208,
        1212,1,0,0,0,1209,1211,3,170,85,0,1210,1209,1,0,0,0,1211,1214,1,
        0,0,0,1212,1210,1,0,0,0,1212,1213,1,0,0,0,1213,1215,1,0,0,0,1214,
        1212,1,0,0,0,1215,1216,5,3,0,0,1216,197,1,0,0,0,1217,1218,5,2,0,
        0,1218,1222,5,25,0,0,1219,1221,3,200,100,0,1220,1219,1,0,0,0,1221,
        1224,1,0,0,0,1222,1220,1,0,0,0,1222,1223,1,0,0,0,1223,1225,1,0,0,
        0,1224,1222,1,0,0,0,1225,1226,5,3,0,0,1226,199,1,0,0,0,1227,1228,
        5,2,0,0,1228,1229,3,206,103,0,1229,1230,3,170,85,0,1230,1231,5,3,
        0,0,1231,1241,1,0,0,0,1232,1233,5,2,0,0,1233,1234,3,206,103,0,1234,
        1235,3,202,101,0,1235,1236,5,3,0,0,1236,1241,1,0,0,0,1237,1238,5,
        2,0,0,1238,1239,5,96,0,0,1239,1241,5,3,0,0,1240,1227,1,0,0,0,1240,
        1232,1,0,0,0,1240,1237,1,0,0,0,1241,201,1,0,0,0,1242,1243,5,2,0,
        0,1243,1244,5,12,0,0,1244,1248,3,226,113,0,1245,1247,3,46,23,0,1246,
        1245,1,0,0,0,1247,1250,1,0,0,0,1248,1246,1,0,0,0,1248,1249,1,0,0,
        0,1249,1251,1,0,0,0,1250,1248,1,0,0,0,1251,1252,5,3,0,0,1252,203,
        1,0,0,0,1253,1254,5,2,0,0,1254,1258,5,26,0,0,1255,1257,3,170,85,
        0,1256,1255,1,0,0,0,1257,1260,1,0,0,0,1258,1256,1,0,0,0,1258,1259,
        1,0,0,0,1259,1261,1,0,0,0,1260,1258,1,0,0,0,1261,1262,5,3,0,0,1262,
        205,1,0,0,0,1263,1264,7,2,0,0,1264,207,1,0,0,0,1265,1266,5,2,0,0,
        1266,1267,5,28,0,0,1267,1268,3,170,85,0,1268,1269,3,206,103,0,1269,
        1270,5,3,0,0,1270,209,1,0,0,0,1271,1272,5,2,0,0,1272,1273,5,29,0,
        0,1273,1274,3,170,85,0,1274,1275,3,170,85,0,1275,1276,5,3,0,0,1276,
        211,1,0,0,0,1277,1278,5,2,0,0,1278,1279,7,3,0,0,1279,1280,3,170,
        85,0,1280,1281,5,3,0,0,1281,213,1,0,0,0,1282,1283,5,2,0,0,1283,1284,
        5,34,0,0,1284,1285,3,170,85,0,1285,1286,5,3,0,0,1286,215,1,0,0,0,
        1287,1288,5,2,0,0,1288,1289,5,33,0,0,1289,1290,3,170,85,0,1290,1291,
        5,3,0,0,1291,217,1,0,0,0,1292,1293,5,2,0,0,1293,1294,5,27,0,0,1294,
        1295,3,170,85,0,1295,1296,3,206,103,0,1296,1297,5,3,0,0,1297,219,
        1,0,0,0,1298,1299,5,2,0,0,1299,1300,5,30,0,0,1300,1301,3,170,85,
        0,1301,1302,3,170,85,0,1302,1303,5,3,0,0,1303,221,1,0,0,0,1304,1305,
        5,2,0,0,1305,1307,3,170,85,0,1306,1308,3,224,112,0,1307,1306,1,0,
        0,0,1307,1308,1,0,0,0,1308,1312,1,0,0,0,1309,1311,3,170,85,0,1310,
        1309,1,0,0,0,1311,1314,1,0,0,0,1312,1310,1,0,0,0,1312,1313,1,0,0,
        0,1313,1315,1,0,0,0,1314,1312,1,0,0,0,1315,1316,5,3,0,0,1316,223,
        1,0,0,0,1317,1318,5,2,0,0,1318,1320,5,68,0,0,1319,1321,3,102,51,
        0,1320,1319,1,0,0,0,1321,1322,1,0,0,0,1322,1320,1,0,0,0,1322,1323,
        1,0,0,0,1323,1324,1,0,0,0,1324,1325,5,3,0,0,1325,225,1,0,0,0,1326,
        1337,5,2,0,0,1327,1334,3,228,114,0,1328,1330,5,4,0,0,1329,1328,1,
        0,0,0,1329,1330,1,0,0,0,1330,1331,1,0,0,0,1331,1333,3,228,114,0,
        1332,1329,1,0,0,0,1333,1336,1,0,0,0,1334,1332,1,0,0,0,1334,1335,
        1,0,0,0,1335,1338,1,0,0,0,1336,1334,1,0,0,0,1337,1327,1,0,0,0,1337,
        1338,1,0,0,0,1338,1339,1,0,0,0,1339,1340,5,3,0,0,1340,227,1,0,0,
        0,1341,1342,5,2,0,0,1342,1343,5,96,0,0,1343,1344,5,3,0,0,1344,229,
        1,0,0,0,1345,1346,7,4,0,0,1346,231,1,0,0,0,104,237,249,255,264,279,
        288,291,301,310,315,318,321,331,335,338,353,362,373,382,388,391,
        401,411,419,429,441,449,459,467,475,479,486,491,494,502,522,530,
        537,554,561,577,587,597,605,617,633,642,653,681,688,695,705,725,
        735,753,762,782,790,800,814,829,834,840,850,860,869,874,920,930,
        941,947,954,963,971,974,977,1001,1009,1013,1023,1033,1046,1058,1070,
        1101,1112,1123,1145,1156,1168,1180,1199,1207,1212,1222,1240,1248,
        1258,1307,1312,1322,1329,1334,1337
    ];

    private static __ATN: antlr.ATN;
    public static get _ATN(): antlr.ATN {
        if (!Stage3FParser.__ATN) {
            Stage3FParser.__ATN = new antlr.ATNDeserializer().deserialize(Stage3FParser._serializedATN);
        }

        return Stage3FParser.__ATN;
    }


    private static readonly vocabulary = new antlr.Vocabulary(Stage3FParser.literalNames, Stage3FParser.symbolicNames, []);

    public override get vocabulary(): antlr.Vocabulary {
        return Stage3FParser.vocabulary;
    }

    private static readonly decisionsToDFA = Stage3FParser._ATN.decisionToState.map( (ds: antlr.DecisionState, index: number) => new antlr.DFA(ds, index) );
}

export class ProgramContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.LPAREN, 0)!;
    }
    public PROGRAM(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.PROGRAM, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.RPAREN, 0)!;
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
        return Stage3FParser.RULE_program;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterProgram) {
             listener.enterProgram(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
    public exportDeclForm(): ExportDeclFormContext | null {
        return this.getRuleContext(0, ExportDeclFormContext);
    }
    public statement(): StatementContext | null {
        return this.getRuleContext(0, StatementContext);
    }
    public override get ruleIndex(): number {
        return Stage3FParser.RULE_topLevel;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterTopLevel) {
             listener.enterTopLevel(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return Stage3FParser.RULE_decl;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterDecl) {
             listener.enterDecl(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.LPAREN, 0)!;
    }
    public DEFMACRO(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.DEFMACRO, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.IDENTIFIER, 0)!;
    }
    public fnSignature(): FnSignatureContext {
        return this.getRuleContext(0, FnSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.RPAREN, 0)!;
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
        return Stage3FParser.RULE_defmacro;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterDefmacro) {
             listener.enterDefmacro(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.LPAREN, 0)!;
    }
    public DEF(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.DEF, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.IDENTIFIER, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3FParser.RULE_def;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterDef) {
             listener.enterDef(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.LPAREN, 0)!;
    }
    public TYPE(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.TYPE, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.IDENTIFIER, 0)!;
    }
    public typeExpr(): TypeExprContext {
        return this.getRuleContext(0, TypeExprContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.RPAREN, 0)!;
    }
    public typeParams(): TypeParamsContext | null {
        return this.getRuleContext(0, TypeParamsContext);
    }
    public override get ruleIndex(): number {
        return Stage3FParser.RULE_typeAlias;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterTypeAlias) {
             listener.enterTypeAlias(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.LPAREN, 0)!;
    }
    public INTERFACE(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.INTERFACE, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.IDENTIFIER, 0)!;
    }
    public typeObject(): TypeObjectContext {
        return this.getRuleContext(0, TypeObjectContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.RPAREN, 0)!;
    }
    public typeParams(): TypeParamsContext | null {
        return this.getRuleContext(0, TypeParamsContext);
    }
    public interfaceExtends(): InterfaceExtendsContext | null {
        return this.getRuleContext(0, InterfaceExtendsContext);
    }
    public override get ruleIndex(): number {
        return Stage3FParser.RULE_interfaceDef;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterInterfaceDef) {
             listener.enterInterfaceDef(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.LPAREN, 0)!;
    }
    public EXTENDS(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.EXTENDS, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.RPAREN, 0)!;
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
        return Stage3FParser.RULE_interfaceExtends;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterInterfaceExtends) {
             listener.enterInterfaceExtends(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.LPAREN, 0)!;
    }
    public CLASS(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.CLASS, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.IDENTIFIER, 0)!;
    }
    public classBody(): ClassBodyContext {
        return this.getRuleContext(0, ClassBodyContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.RPAREN, 0)!;
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
        return Stage3FParser.RULE_classDef;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterClassDef) {
             listener.enterClassDef(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.LPAREN, 0)!;
    }
    public CLASS(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.CLASS, 0)!;
    }
    public classBody(): ClassBodyContext {
        return this.getRuleContext(0, ClassBodyContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.RPAREN, 0)!;
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
        return Stage3FParser.RULE_anonClassDef;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterAnonClassDef) {
             listener.enterAnonClassDef(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.LPAREN, 0)!;
    }
    public EXTENDS(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.EXTENDS, 0)!;
    }
    public typeExpr(): TypeExprContext {
        return this.getRuleContext(0, TypeExprContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3FParser.RULE_classExtends;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterClassExtends) {
             listener.enterClassExtends(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.LPAREN, 0)!;
    }
    public IMPLEMENTS(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.IMPLEMENTS, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.RPAREN, 0)!;
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
        return Stage3FParser.RULE_classImplements;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterClassImplements) {
             listener.enterClassImplements(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.LPAREN, 0)!;
    }
    public CLASS_BODY(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.CLASS_BODY, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.RPAREN, 0)!;
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
        return Stage3FParser.RULE_classBody;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterClassBody) {
             listener.enterClassBody(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return Stage3FParser.RULE_classElement;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterClassElement) {
             listener.enterClassElement(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.KEYWORD, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3FParser.RULE_modifier;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterModifier) {
             listener.enterModifier(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.LPAREN, 0)!;
    }
    public FIELD(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.FIELD, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.RPAREN, 0)!;
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
        return this.getToken(Stage3FParser.COLON, 0);
    }
    public typeExpr(): TypeExprContext | null {
        return this.getRuleContext(0, TypeExprContext);
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public override get ruleIndex(): number {
        return Stage3FParser.RULE_fieldDef;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterFieldDef) {
             listener.enterFieldDef(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.LPAREN, 0)!;
    }
    public CONSTRUCTOR(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.CONSTRUCTOR, 0)!;
    }
    public fnSignatureTyped(): FnSignatureTypedContext {
        return this.getRuleContext(0, FnSignatureTypedContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.RPAREN, 0)!;
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
        return Stage3FParser.RULE_constructorDef;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterConstructorDef) {
             listener.enterConstructorDef(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.LPAREN, 0)!;
    }
    public METHOD(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.METHOD, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.IDENTIFIER, 0)!;
    }
    public fnSignatureTyped(): FnSignatureTypedContext {
        return this.getRuleContext(0, FnSignatureTypedContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.RPAREN, 0)!;
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
        return Stage3FParser.RULE_classMethodDef;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterClassMethodDef) {
             listener.enterClassMethodDef(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.LPAREN, 0)!;
    }
    public ABSTRACT_METHOD(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.ABSTRACT_METHOD, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.IDENTIFIER, 0)!;
    }
    public fnSignatureTyped(): FnSignatureTypedContext {
        return this.getRuleContext(0, FnSignatureTypedContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.RPAREN, 0)!;
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
        return Stage3FParser.RULE_abstractMethodDef;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterAbstractMethodDef) {
             listener.enterAbstractMethodDef(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.LPAREN, 0)!;
    }
    public GET(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.GET, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.IDENTIFIER, 0)!;
    }
    public fnSignatureTyped(): FnSignatureTypedContext {
        return this.getRuleContext(0, FnSignatureTypedContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.RPAREN, 0)!;
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
        return Stage3FParser.RULE_getterDef;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterGetterDef) {
             listener.enterGetterDef(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.LPAREN, 0)!;
    }
    public SETPROP(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.SETPROP, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.IDENTIFIER, 0)!;
    }
    public fnSignatureTyped(): FnSignatureTypedContext {
        return this.getRuleContext(0, FnSignatureTypedContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.RPAREN, 0)!;
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
        return Stage3FParser.RULE_setterDef;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterSetterDef) {
             listener.enterSetterDef(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.RPAREN, 0)!;
    }
    public OPTIONAL(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.OPTIONAL, 0);
    }
    public COLON(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.COLON, 0);
    }
    public typeExpr(): TypeExprContext | null {
        return this.getRuleContext(0, TypeExprContext);
    }
    public override get ruleIndex(): number {
        return Stage3FParser.RULE_typedParam;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterTypedParam) {
             listener.enterTypedParam(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
    		return this.getTokens(Stage3FParser.LPAREN);
    	} else {
    		return this.getToken(Stage3FParser.LPAREN, i);
    	}
    }
    public RPAREN(): antlr.TerminalNode[];
    public RPAREN(i: number): antlr.TerminalNode | null;
    public RPAREN(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage3FParser.RPAREN);
    	} else {
    		return this.getToken(Stage3FParser.RPAREN, i);
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
        return this.getToken(Stage3FParser.RETURNS, 0);
    }
    public typeExpr(): TypeExprContext | null {
        return this.getRuleContext(0, TypeExprContext);
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage3FParser.COMMA);
    	} else {
    		return this.getToken(Stage3FParser.COMMA, i);
    	}
    }
    public override get ruleIndex(): number {
        return Stage3FParser.RULE_fnSignatureTyped;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterFnSignatureTyped) {
             listener.enterFnSignatureTyped(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return Stage3FParser.RULE_statement;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterStatement) {
             listener.enterStatement(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
    		return this.getTokens(Stage3FParser.LPAREN);
    	} else {
    		return this.getToken(Stage3FParser.LPAREN, i);
    	}
    }
    public LETSTAR(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.LETSTAR, 0)!;
    }
    public RPAREN(): antlr.TerminalNode[];
    public RPAREN(i: number): antlr.TerminalNode | null;
    public RPAREN(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage3FParser.RPAREN);
    	} else {
    		return this.getToken(Stage3FParser.RPAREN, i);
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
        return Stage3FParser.RULE_letStar;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterLetStar) {
             listener.enterLetStar(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.LPAREN, 0)!;
    }
    public LET(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.LET, 0)!;
    }
    public singleBinding(): SingleBindingContext {
        return this.getRuleContext(0, SingleBindingContext)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3FParser.RULE_letStmt;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterLetStmt) {
             listener.enterLetStmt(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
    		return this.getTokens(Stage3FParser.LPAREN);
    	} else {
    		return this.getToken(Stage3FParser.LPAREN, i);
    	}
    }
    public CONSTSTAR(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.CONSTSTAR, 0)!;
    }
    public RPAREN(): antlr.TerminalNode[];
    public RPAREN(i: number): antlr.TerminalNode | null;
    public RPAREN(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage3FParser.RPAREN);
    	} else {
    		return this.getToken(Stage3FParser.RPAREN, i);
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
        return Stage3FParser.RULE_constStar;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterConstStar) {
             listener.enterConstStar(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.LPAREN, 0)!;
    }
    public CONST(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.CONST, 0)!;
    }
    public singleBinding(): SingleBindingContext {
        return this.getRuleContext(0, SingleBindingContext)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3FParser.RULE_constStmt;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterConstStmt) {
             listener.enterConstStmt(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.LPAREN, 0)!;
    }
    public IF(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.IF, 0)!;
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
        return this.getToken(Stage3FParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3FParser.RULE_ifForm;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterIfForm) {
             listener.enterIfForm(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.LPAREN, 0)!;
    }
    public WHILE(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.WHILE, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.RPAREN, 0)!;
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
        return Stage3FParser.RULE_whileForm;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterWhileForm) {
             listener.enterWhileForm(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.LPAREN, 0)!;
    }
    public BEGIN(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.BEGIN, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.RPAREN, 0)!;
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
        return Stage3FParser.RULE_block;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterBlock) {
             listener.enterBlock(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.LPAREN, 0)!;
    }
    public RETURN(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.RETURN, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.RPAREN, 0)!;
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public override get ruleIndex(): number {
        return Stage3FParser.RULE_returnForm;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterReturnForm) {
             listener.enterReturnForm(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.LPAREN, 0)!;
    }
    public THROW(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.THROW, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3FParser.RULE_throwForm;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterThrowForm) {
             listener.enterThrowForm(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.LPAREN, 0)!;
    }
    public IMPORT(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.IMPORT, 0)!;
    }
    public STRING(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.STRING, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.RPAREN, 0)!;
    }
    public objectExpr(): ObjectExprContext | null {
        return this.getRuleContext(0, ObjectExprContext);
    }
    public override get ruleIndex(): number {
        return Stage3FParser.RULE_importForm;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterImportForm) {
             listener.enterImportForm(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.LPAREN, 0)!;
    }
    public IMPORT_TYPE(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.IMPORT_TYPE, 0)!;
    }
    public importTypeSpec(): ImportTypeSpecContext {
        return this.getRuleContext(0, ImportTypeSpecContext)!;
    }
    public STRING(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.STRING, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3FParser.RULE_importTypeForm;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterImportTypeForm) {
             listener.enterImportTypeForm(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.RPAREN, 0)!;
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
        return Stage3FParser.RULE_importTypeSpec;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterImportTypeSpec) {
             listener.enterImportTypeSpec(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
    		return this.getTokens(Stage3FParser.IDENTIFIER);
    	} else {
    		return this.getToken(Stage3FParser.IDENTIFIER, i);
    	}
    }
    public LPAREN(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.LPAREN, 0);
    }
    public RPAREN(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.RPAREN, 0);
    }
    public override get ruleIndex(): number {
        return Stage3FParser.RULE_importTypeName;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterImportTypeName) {
             listener.enterImportTypeName(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return Stage3FParser.RULE_exportForm;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterExportForm) {
             listener.enterExportForm(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.LPAREN, 0)!;
    }
    public EXPORT(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.EXPORT, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.IDENTIFIER, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3FParser.RULE_exportBinding;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterExportBinding) {
             listener.enterExportBinding(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.LPAREN, 0)!;
    }
    public EXPORT_DEFAULT(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.EXPORT_DEFAULT, 0)!;
    }
    public classDef(): ClassDefContext | null {
        return this.getRuleContext(0, ClassDefContext);
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.RPAREN, 0)!;
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
        return Stage3FParser.RULE_exportDefault;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterExportDefault) {
             listener.enterExportDefault(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.LPAREN, 0)!;
    }
    public EXPORT_NAMED(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.EXPORT_NAMED, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.RPAREN, 0)!;
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
        return Stage3FParser.RULE_exportNamed;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterExportNamed) {
             listener.enterExportNamed(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode[];
    public IDENTIFIER(i: number): antlr.TerminalNode | null;
    public IDENTIFIER(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage3FParser.IDENTIFIER);
    	} else {
    		return this.getToken(Stage3FParser.IDENTIFIER, i);
    	}
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3FParser.RULE_exportNamePair;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterExportNamePair) {
             listener.enterExportNamePair(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.LPAREN, 0)!;
    }
    public EXPORT_FROM(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.EXPORT_FROM, 0)!;
    }
    public STRING(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.STRING, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.RPAREN, 0)!;
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
        return Stage3FParser.RULE_exportFrom;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterExportFrom) {
             listener.enterExportFrom(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.LPAREN, 0)!;
    }
    public EXPORT_ALL_FROM(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.EXPORT_ALL_FROM, 0)!;
    }
    public STRING(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.STRING, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3FParser.RULE_exportAllFrom;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterExportAllFrom) {
             listener.enterExportAllFrom(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.LPAREN, 0)!;
    }
    public EXPORT_NS_FROM(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.EXPORT_NS_FROM, 0)!;
    }
    public STRING(): antlr.TerminalNode[];
    public STRING(i: number): antlr.TerminalNode | null;
    public STRING(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage3FParser.STRING);
    	} else {
    		return this.getToken(Stage3FParser.STRING, i);
    	}
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3FParser.RULE_exportNsFromForm;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterExportNsFromForm) {
             listener.enterExportNsFromForm(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.LPAREN, 0)!;
    }
    public EXPORT_TYPE(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.EXPORT_TYPE, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.RPAREN, 0)!;
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
        return Stage3FParser.RULE_exportTypeForm;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterExportTypeForm) {
             listener.enterExportTypeForm(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.LPAREN, 0)!;
    }
    public EXPORT_TYPE_FROM(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.EXPORT_TYPE_FROM, 0)!;
    }
    public STRING(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.STRING, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.RPAREN, 0)!;
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
        return Stage3FParser.RULE_exportTypeFromForm;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterExportTypeFromForm) {
             listener.enterExportTypeFromForm(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.LPAREN, 0)!;
    }
    public EXPORT_TYPE_ALL_FROM(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.EXPORT_TYPE_ALL_FROM, 0)!;
    }
    public STRING(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.STRING, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3FParser.RULE_exportTypeAllFromForm;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterExportTypeAllFromForm) {
             listener.enterExportTypeAllFromForm(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.LPAREN, 0)!;
    }
    public EXPORT(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.EXPORT, 0)!;
    }
    public decl(): DeclContext {
        return this.getRuleContext(0, DeclContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3FParser.RULE_exportDeclForm;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterExportDeclForm) {
             listener.enterExportDeclForm(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.IDENTIFIER, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.RPAREN, 0)!;
    }
    public COLON(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.COLON, 0);
    }
    public typeExpr(): TypeExprContext | null {
        return this.getRuleContext(0, TypeExprContext);
    }
    public override get ruleIndex(): number {
        return Stage3FParser.RULE_starBinding;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterStarBinding) {
             listener.enterStarBinding(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.RPAREN, 0)!;
    }
    public COLON(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.COLON, 0);
    }
    public typeExpr(): TypeExprContext | null {
        return this.getRuleContext(0, TypeExprContext);
    }
    public override get ruleIndex(): number {
        return Stage3FParser.RULE_singleBinding;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterSingleBinding) {
             listener.enterSingleBinding(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.IDENTIFIER, 0);
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
        return Stage3FParser.RULE_typeExpr;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterTypeExpr) {
             listener.enterTypeExpr(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.LPAREN, 0)!;
    }
    public UNION(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.UNION, 0)!;
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
        return this.getToken(Stage3FParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3FParser.RULE_typeUnion;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterTypeUnion) {
             listener.enterTypeUnion(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.LPAREN, 0)!;
    }
    public INTERSECT(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.INTERSECT, 0)!;
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
        return this.getToken(Stage3FParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3FParser.RULE_typeIntersection;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterTypeIntersection) {
             listener.enterTypeIntersection(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.LPAREN, 0)!;
    }
    public ARRAY(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.ARRAY, 0)!;
    }
    public typeExpr(): TypeExprContext {
        return this.getRuleContext(0, TypeExprContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3FParser.RULE_typeArray;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterTypeArray) {
             listener.enterTypeArray(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.LPAREN, 0)!;
    }
    public TUPLE(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.TUPLE, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.RPAREN, 0)!;
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
        return Stage3FParser.RULE_typeTuple;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterTypeTuple) {
             listener.enterTypeTuple(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.LPAREN, 0);
    }
    public REST(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.REST, 0);
    }
    public typeExpr(): TypeExprContext {
        return this.getRuleContext(0, TypeExprContext)!;
    }
    public RPAREN(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.RPAREN, 0);
    }
    public IDENTIFIER(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.IDENTIFIER, 0);
    }
    public override get ruleIndex(): number {
        return Stage3FParser.RULE_typeTupleElement;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterTypeTupleElement) {
             listener.enterTypeTupleElement(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
    		return this.getTokens(Stage3FParser.LPAREN);
    	} else {
    		return this.getToken(Stage3FParser.LPAREN, i);
    	}
    }
    public TYPEFN(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.TYPEFN, 0)!;
    }
    public RPAREN(): antlr.TerminalNode[];
    public RPAREN(i: number): antlr.TerminalNode | null;
    public RPAREN(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage3FParser.RPAREN);
    	} else {
    		return this.getToken(Stage3FParser.RPAREN, i);
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
        return Stage3FParser.RULE_typeFunction;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterTypeFunction) {
             listener.enterTypeFunction(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.IDENTIFIER, 0)!;
    }
    public typeExpr(): TypeExprContext {
        return this.getRuleContext(0, TypeExprContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.RPAREN, 0)!;
    }
    public OPTIONAL(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.OPTIONAL, 0);
    }
    public override get ruleIndex(): number {
        return Stage3FParser.RULE_typeFnParam;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterTypeFnParam) {
             listener.enterTypeFnParam(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.RPAREN, 0)!;
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
        return Stage3FParser.RULE_typeObject;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterTypeObject) {
             listener.enterTypeObject(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.IDENTIFIER, 0)!;
    }
    public typeExpr(): TypeExprContext {
        return this.getRuleContext(0, TypeExprContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.RPAREN, 0)!;
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
        return this.getToken(Stage3FParser.OPTIONAL, 0);
    }
    public override get ruleIndex(): number {
        return Stage3FParser.RULE_typeProp;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterTypeProp) {
             listener.enterTypeProp(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.READONLY, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3FParser.RULE_propModifier;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterPropModifier) {
             listener.enterPropModifier(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.LPAREN, 0)!;
    }
    public LIT(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.LIT, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.RPAREN, 0)!;
    }
    public STRING(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.STRING, 0);
    }
    public BACKTICK_STRING(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.BACKTICK_STRING, 0);
    }
    public NUMBER(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.NUMBER, 0);
    }
    public BOOLEAN(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.BOOLEAN, 0);
    }
    public override get ruleIndex(): number {
        return Stage3FParser.RULE_typeLiteral;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterTypeLiteral) {
             listener.enterTypeLiteral(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.LPAREN, 0)!;
    }
    public KEYOF(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.KEYOF, 0)!;
    }
    public typeExpr(): TypeExprContext {
        return this.getRuleContext(0, TypeExprContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3FParser.RULE_typeKeyof;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterTypeKeyof) {
             listener.enterTypeKeyof(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.LPAREN, 0)!;
    }
    public TYPEOF(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.TYPEOF, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3FParser.RULE_typeTypeof;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterTypeTypeof) {
             listener.enterTypeTypeof(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.LPAREN, 0)!;
    }
    public INDEX(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.INDEX, 0)!;
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
        return this.getToken(Stage3FParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3FParser.RULE_typeIndexAccess;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterTypeIndexAccess) {
             listener.enterTypeIndexAccess(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.LPAREN, 0)!;
    }
    public COND(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.COND, 0)!;
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
        return this.getToken(Stage3FParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3FParser.RULE_typeConditional;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterTypeConditional) {
             listener.enterTypeConditional(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.LPAREN, 0)!;
    }
    public INFER(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.INFER, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3FParser.RULE_typeInfer;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterTypeInfer) {
             listener.enterTypeInfer(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.LPAREN, 0)!;
    }
    public MAPPED(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.MAPPED, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.IDENTIFIER, 0)!;
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
        return this.getToken(Stage3FParser.RPAREN, 0)!;
    }
    public mappedModifiers(): MappedModifiersContext | null {
        return this.getRuleContext(0, MappedModifiersContext);
    }
    public override get ruleIndex(): number {
        return Stage3FParser.RULE_typeMapped;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterTypeMapped) {
             listener.enterTypeMapped(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.LPAREN, 0)!;
    }
    public MODIFIERS(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.MODIFIERS, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.RPAREN, 0)!;
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
        return Stage3FParser.RULE_mappedModifiers;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterMappedModifiers) {
             listener.enterMappedModifiers(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.READONLY, 0);
    }
    public OPTIONAL(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.OPTIONAL, 0);
    }
    public override get ruleIndex(): number {
        return Stage3FParser.RULE_mappedModifier;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterMappedModifier) {
             listener.enterMappedModifier(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.LPAREN, 0)!;
    }
    public TEMPLATE(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.TEMPLATE, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.RPAREN, 0)!;
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
        return Stage3FParser.RULE_typeTemplateLiteral;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterTypeTemplateLiteral) {
             listener.enterTypeTemplateLiteral(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.STRING, 0);
    }
    public typeExpr(): TypeExprContext | null {
        return this.getRuleContext(0, TypeExprContext);
    }
    public override get ruleIndex(): number {
        return Stage3FParser.RULE_templatePart;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterTemplatePart) {
             listener.enterTemplatePart(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.LPAREN, 0)!;
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
        return this.getToken(Stage3FParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3FParser.RULE_typeApplication;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterTypeApplication) {
             listener.enterTypeApplication(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.LPAREN, 0)!;
    }
    public TYPE_PARAMS(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.TYPE_PARAMS, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.RPAREN, 0)!;
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
        return Stage3FParser.RULE_typeParams;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterTypeParams) {
             listener.enterTypeParams(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.IDENTIFIER, 0)!;
    }
    public LPAREN(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.LPAREN, 0);
    }
    public RPAREN(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.RPAREN, 0);
    }
    public typeParamConstraint(): TypeParamConstraintContext | null {
        return this.getRuleContext(0, TypeParamConstraintContext);
    }
    public typeParamDefault(): TypeParamDefaultContext | null {
        return this.getRuleContext(0, TypeParamDefaultContext);
    }
    public override get ruleIndex(): number {
        return Stage3FParser.RULE_typeParamDecl;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterTypeParamDecl) {
             listener.enterTypeParamDecl(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.LPAREN, 0)!;
    }
    public EXTENDS(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.EXTENDS, 0)!;
    }
    public typeExpr(): TypeExprContext {
        return this.getRuleContext(0, TypeExprContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3FParser.RULE_typeParamConstraint;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterTypeParamConstraint) {
             listener.enterTypeParamConstraint(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.LPAREN, 0)!;
    }
    public DEFAULT(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.DEFAULT, 0)!;
    }
    public typeExpr(): TypeExprContext {
        return this.getRuleContext(0, TypeExprContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3FParser.RULE_typeParamDefault;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterTypeParamDefault) {
             listener.enterTypeParamDefault(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.LPAREN, 0)!;
    }
    public SET(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.SET, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.IDENTIFIER, 0);
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.RPAREN, 0)!;
    }
    public propAccess(): PropAccessContext | null {
        return this.getRuleContext(0, PropAccessContext);
    }
    public override get ruleIndex(): number {
        return Stage3FParser.RULE_assign;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterAssign) {
             listener.enterAssign(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.LPAREN, 0)!;
    }
    public SWITCH(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.SWITCH, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.RPAREN, 0)!;
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
        return Stage3FParser.RULE_switchForm;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterSwitchForm) {
             listener.enterSwitchForm(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.LPAREN, 0)!;
    }
    public CASE(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.CASE, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.RPAREN, 0)!;
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
        return Stage3FParser.RULE_caseClause;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterCaseClause) {
             listener.enterCaseClause(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.LPAREN, 0)!;
    }
    public DEFAULT(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.DEFAULT, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.RPAREN, 0)!;
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
        return Stage3FParser.RULE_defaultClause;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterDefaultClause) {
             listener.enterDefaultClause(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.LPAREN, 0)!;
    }
    public FOR(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.FOR, 0)!;
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
        return this.getToken(Stage3FParser.RPAREN, 0)!;
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
        return Stage3FParser.RULE_forForm;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterForForm) {
             listener.enterForForm(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.LPAREN, 0)!;
    }
    public FORIN(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.FORIN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.IDENTIFIER, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.RPAREN, 0)!;
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
        return Stage3FParser.RULE_forInForm;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterForInForm) {
             listener.enterForInForm(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.LPAREN, 0)!;
    }
    public FOROF(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.FOROF, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.IDENTIFIER, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.RPAREN, 0)!;
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
        return Stage3FParser.RULE_forOfForm;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterForOfForm) {
             listener.enterForOfForm(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.KEYWORD, 0);
    }
    public IDENTIFIER(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.IDENTIFIER, 0);
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
        return Stage3FParser.RULE_expression;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterExpression) {
             listener.enterExpression(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.THIS, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3FParser.RULE_thisExpr;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterThisExpr) {
             listener.enterThisExpr(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.SUPER, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3FParser.RULE_superExpr;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterSuperExpr) {
             listener.enterSuperExpr(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.LPAREN, 0)!;
    }
    public SUPER(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.SUPER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.RPAREN, 0)!;
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
        return Stage3FParser.RULE_superConstructorCall;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterSuperConstructorCall) {
             listener.enterSuperConstructorCall(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.LPAREN, 0)!;
    }
    public SUPER_METHOD(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.SUPER_METHOD, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.RPAREN, 0)!;
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
        return Stage3FParser.RULE_superMethodCall;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterSuperMethodCall) {
             listener.enterSuperMethodCall(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.LPAREN, 0)!;
    }
    public TYPEOF(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.TYPEOF, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3FParser.RULE_typeofExpr;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterTypeofExpr) {
             listener.enterTypeofExpr(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.LPAREN, 0)!;
    }
    public TYPE_AS(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.TYPE_AS, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public typeExpr(): TypeExprContext {
        return this.getRuleContext(0, TypeExprContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3FParser.RULE_typeAssert;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterTypeAssert) {
             listener.enterTypeAssert(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.LPAREN, 0)!;
    }
    public LAMBDA(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.LAMBDA, 0)!;
    }
    public fnSignature(): FnSignatureContext {
        return this.getRuleContext(0, FnSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.RPAREN, 0)!;
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
        return Stage3FParser.RULE_lambda;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterLambda) {
             listener.enterLambda(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.LPAREN, 0)!;
    }
    public FN(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.FN, 0)!;
    }
    public fnSignature(): FnSignatureContext {
        return this.getRuleContext(0, FnSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.RPAREN, 0)!;
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
        return Stage3FParser.RULE_fn;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterFn) {
             listener.enterFn(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.LPAREN, 0)!;
    }
    public BIND(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.BIND, 0)!;
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
        return this.getToken(Stage3FParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3FParser.RULE_bindExpr;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterBindExpr) {
             listener.enterBindExpr(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.LPAREN, 0)!;
    }
    public METHOD_CALL(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.METHOD_CALL, 0)!;
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
        return this.getToken(Stage3FParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3FParser.RULE_methodCallExpr;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterMethodCallExpr) {
             listener.enterMethodCallExpr(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.LPAREN, 0)!;
    }
    public TERNARY(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.TERNARY, 0)!;
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
        return this.getToken(Stage3FParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3FParser.RULE_ternary;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterTernary) {
             listener.enterTernary(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.LPAREN, 0)!;
    }
    public COND(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.COND, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.RPAREN, 0)!;
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
        return Stage3FParser.RULE_condExpr;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterCondExpr) {
             listener.enterCondExpr(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.LPAREN, 0)!;
    }
    public NEW(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.NEW, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.RPAREN, 0)!;
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
        return Stage3FParser.RULE_newForm;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterNewForm) {
             listener.enterNewForm(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.LPAREN, 0)!;
    }
    public OBJECT(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.OBJECT, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.RPAREN, 0)!;
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
        return Stage3FParser.RULE_objectExpr;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterObjectExpr) {
             listener.enterObjectExpr(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.LPAREN, 0)!;
    }
    public propKey(): PropKeyContext | null {
        return this.getRuleContext(0, PropKeyContext);
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.RPAREN, 0)!;
    }
    public methodDef(): MethodDefContext | null {
        return this.getRuleContext(0, MethodDefContext);
    }
    public IDENTIFIER(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.IDENTIFIER, 0);
    }
    public override get ruleIndex(): number {
        return Stage3FParser.RULE_objectField;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterObjectField) {
             listener.enterObjectField(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.LPAREN, 0)!;
    }
    public METHOD(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.METHOD, 0)!;
    }
    public fnSignature(): FnSignatureContext {
        return this.getRuleContext(0, FnSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.RPAREN, 0)!;
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
        return Stage3FParser.RULE_methodDef;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterMethodDef) {
             listener.enterMethodDef(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.LPAREN, 0)!;
    }
    public ARRAY(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.ARRAY, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.RPAREN, 0)!;
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
        return Stage3FParser.RULE_arrayExpr;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterArrayExpr) {
             listener.enterArrayExpr(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.IDENTIFIER, 0);
    }
    public KEYWORD(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.KEYWORD, 0);
    }
    public STRING(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.STRING, 0);
    }
    public BACKTICK_STRING(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.BACKTICK_STRING, 0);
    }
    public PROGRAM(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.PROGRAM, 0);
    }
    public LETSTAR(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.LETSTAR, 0);
    }
    public LET(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.LET, 0);
    }
    public CONSTSTAR(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.CONSTSTAR, 0);
    }
    public CONST(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.CONST, 0);
    }
    public LAMBDA(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.LAMBDA, 0);
    }
    public FN(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.FN, 0);
    }
    public METHOD(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.METHOD, 0);
    }
    public BIND(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.BIND, 0);
    }
    public METHOD_CALL(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.METHOD_CALL, 0);
    }
    public DEF(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.DEF, 0);
    }
    public DEFMACRO(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.DEFMACRO, 0);
    }
    public IF(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.IF, 0);
    }
    public WHILE(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.WHILE, 0);
    }
    public BEGIN(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.BEGIN, 0);
    }
    public RETURN(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.RETURN, 0);
    }
    public THROW(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.THROW, 0);
    }
    public SET(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.SET, 0);
    }
    public TERNARY(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.TERNARY, 0);
    }
    public COND(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.COND, 0);
    }
    public OBJECT(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.OBJECT, 0);
    }
    public ARRAY(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.ARRAY, 0);
    }
    public INDEX(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.INDEX, 0);
    }
    public QUASI(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.QUASI, 0);
    }
    public QUOTE(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.QUOTE, 0);
    }
    public UNQUOTE_SPLICING(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.UNQUOTE_SPLICING, 0);
    }
    public UNQUOTE(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.UNQUOTE, 0);
    }
    public NEW(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.NEW, 0);
    }
    public IMPORT(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.IMPORT, 0);
    }
    public SWITCH(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.SWITCH, 0);
    }
    public CASE(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.CASE, 0);
    }
    public DEFAULT(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.DEFAULT, 0);
    }
    public FORIN(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.FORIN, 0);
    }
    public FOROF(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.FOROF, 0);
    }
    public FOR(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.FOR, 0);
    }
    public UNION(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.UNION, 0);
    }
    public INTERSECT(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.INTERSECT, 0);
    }
    public TUPLE(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.TUPLE, 0);
    }
    public TYPEFN(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.TYPEFN, 0);
    }
    public LIT(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.LIT, 0);
    }
    public KEYOF(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.KEYOF, 0);
    }
    public TYPEOF(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.TYPEOF, 0);
    }
    public INFER(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.INFER, 0);
    }
    public MAPPED(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.MAPPED, 0);
    }
    public TEMPLATE(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.TEMPLATE, 0);
    }
    public REST(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.REST, 0);
    }
    public READONLY(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.READONLY, 0);
    }
    public TYPE_AS(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.TYPE_AS, 0);
    }
    public TYPE_PARAMS(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.TYPE_PARAMS, 0);
    }
    public TYPE_ARGS(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.TYPE_ARGS, 0);
    }
    public EXTENDS(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.EXTENDS, 0);
    }
    public RETURNS(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.RETURNS, 0);
    }
    public TYPE(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.TYPE, 0);
    }
    public INTERFACE(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.INTERFACE, 0);
    }
    public MODIFIERS(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.MODIFIERS, 0);
    }
    public BOOLEAN(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.BOOLEAN, 0);
    }
    public NULL(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.NULL, 0);
    }
    public UNDEFINED(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.UNDEFINED, 0);
    }
    public EXPORT(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.EXPORT, 0);
    }
    public EXPORT_DEFAULT(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.EXPORT_DEFAULT, 0);
    }
    public EXPORT_NAMED(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.EXPORT_NAMED, 0);
    }
    public EXPORT_NS_FROM(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.EXPORT_NS_FROM, 0);
    }
    public EXPORT_FROM(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.EXPORT_FROM, 0);
    }
    public EXPORT_ALL_FROM(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.EXPORT_ALL_FROM, 0);
    }
    public IMPORT_TYPE(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.IMPORT_TYPE, 0);
    }
    public EXPORT_TYPE(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.EXPORT_TYPE, 0);
    }
    public EXPORT_TYPE_FROM(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.EXPORT_TYPE_FROM, 0);
    }
    public EXPORT_TYPE_ALL_FROM(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.EXPORT_TYPE_ALL_FROM, 0);
    }
    public CLASS(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.CLASS, 0);
    }
    public CLASS_BODY(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.CLASS_BODY, 0);
    }
    public FIELD(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.FIELD, 0);
    }
    public CONSTRUCTOR(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.CONSTRUCTOR, 0);
    }
    public THIS(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.THIS, 0);
    }
    public SUPER(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.SUPER, 0);
    }
    public SUPER_METHOD(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.SUPER_METHOD, 0);
    }
    public GET(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.GET, 0);
    }
    public SETPROP(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.SETPROP, 0);
    }
    public ABSTRACT_METHOD(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.ABSTRACT_METHOD, 0);
    }
    public IMPLEMENTS(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.IMPLEMENTS, 0);
    }
    public override get ruleIndex(): number {
        return Stage3FParser.RULE_propKey;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterPropKey) {
             listener.enterPropKey(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.LPAREN, 0)!;
    }
    public DOT(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.DOT, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public propKey(): PropKeyContext {
        return this.getRuleContext(0, PropKeyContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3FParser.RULE_propAccess;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterPropAccess) {
             listener.enterPropAccess(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.LPAREN, 0)!;
    }
    public INDEX(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.INDEX, 0)!;
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
        return this.getToken(Stage3FParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3FParser.RULE_indexAccess;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterIndexAccess) {
             listener.enterIndexAccess(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.LPAREN, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.RPAREN, 0)!;
    }
    public QUASI(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.QUASI, 0);
    }
    public QUOTE(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.QUOTE, 0);
    }
    public override get ruleIndex(): number {
        return Stage3FParser.RULE_quasiquote;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterQuasiquote) {
             listener.enterQuasiquote(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.LPAREN, 0)!;
    }
    public UNQUOTE(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.UNQUOTE, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3FParser.RULE_unquote;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterUnquote) {
             listener.enterUnquote(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.LPAREN, 0)!;
    }
    public UNQUOTE_SPLICING(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.UNQUOTE_SPLICING, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3FParser.RULE_unquoteSplicing;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterUnquoteSplicing) {
             listener.enterUnquoteSplicing(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.LPAREN, 0)!;
    }
    public OPTCHAIN(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.OPTCHAIN, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public propKey(): PropKeyContext {
        return this.getRuleContext(0, PropKeyContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3FParser.RULE_optChain;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterOptChain) {
             listener.enterOptChain(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.LPAREN, 0)!;
    }
    public NULLCOAL(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.NULLCOAL, 0)!;
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
        return this.getToken(Stage3FParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3FParser.RULE_nullCoalesce;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterNullCoalesce) {
             listener.enterNullCoalesce(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.LPAREN, 0)!;
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
        return this.getToken(Stage3FParser.RPAREN, 0)!;
    }
    public typeArgs(): TypeArgsContext | null {
        return this.getRuleContext(0, TypeArgsContext);
    }
    public override get ruleIndex(): number {
        return Stage3FParser.RULE_call;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterCall) {
             listener.enterCall(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.LPAREN, 0)!;
    }
    public TYPE_ARGS(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.TYPE_ARGS, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.RPAREN, 0)!;
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
        return Stage3FParser.RULE_typeArgs;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterTypeArgs) {
             listener.enterTypeArgs(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.LPAREN, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.RPAREN, 0)!;
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
    		return this.getTokens(Stage3FParser.COMMA);
    	} else {
    		return this.getToken(Stage3FParser.COMMA, i);
    	}
    }
    public override get ruleIndex(): number {
        return Stage3FParser.RULE_fnSignature;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterFnSignature) {
             listener.enterFnSignature(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3FParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3FParser.RULE_param;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterParam) {
             listener.enterParam(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
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
        return this.getToken(Stage3FParser.NUMBER, 0);
    }
    public STRING(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.STRING, 0);
    }
    public BACKTICK_STRING(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.BACKTICK_STRING, 0);
    }
    public BOOLEAN(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.BOOLEAN, 0);
    }
    public NULL(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.NULL, 0);
    }
    public UNDEFINED(): antlr.TerminalNode | null {
        return this.getToken(Stage3FParser.UNDEFINED, 0);
    }
    public override get ruleIndex(): number {
        return Stage3FParser.RULE_literal;
    }
    public override enterRule(listener: Stage3FListener): void {
        if(listener.enterLiteral) {
             listener.enterLiteral(this);
        }
    }
    public override exitRule(listener: Stage3FListener): void {
        if(listener.exitLiteral) {
             listener.exitLiteral(this);
        }
    }
}
