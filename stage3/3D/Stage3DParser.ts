
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
    public static readonly UNION = 43;
    public static readonly INTERSECT = 44;
    public static readonly TUPLE = 45;
    public static readonly TYPEFN = 46;
    public static readonly LIT = 47;
    public static readonly KEYOF = 48;
    public static readonly TYPEOF = 49;
    public static readonly INFER = 50;
    public static readonly MAPPED = 51;
    public static readonly TEMPLATE = 52;
    public static readonly REST = 53;
    public static readonly READONLY = 54;
    public static readonly TYPE_PARAMS = 55;
    public static readonly TYPE_ARGS = 56;
    public static readonly EXTENDS = 57;
    public static readonly RETURNS = 58;
    public static readonly TYPE = 59;
    public static readonly INTERFACE = 60;
    public static readonly MODIFIERS = 61;
    public static readonly OPTIONAL = 62;
    public static readonly BOOLEAN = 63;
    public static readonly NULL = 64;
    public static readonly UNDEFINED = 65;
    public static readonly COLON = 66;
    public static readonly LBRACK = 67;
    public static readonly RBRACK = 68;
    public static readonly EXPORT = 69;
    public static readonly EXPORT_DEFAULT = 70;
    public static readonly EXPORT_NAMED = 71;
    public static readonly EXPORT_FROM = 72;
    public static readonly EXPORT_ALL_FROM = 73;
    public static readonly KEYWORD = 74;
    public static readonly NUMBER = 75;
    public static readonly STRING = 76;
    public static readonly MULTILINE_STRING = 77;
    public static readonly BACKTICK_STRING = 78;
    public static readonly IDENTIFIER = 79;
    public static readonly WS = 80;
    public static readonly RULE_program = 0;
    public static readonly RULE_topLevel = 1;
    public static readonly RULE_defmacro = 2;
    public static readonly RULE_def = 3;
    public static readonly RULE_typeAlias = 4;
    public static readonly RULE_interfaceDef = 5;
    public static readonly RULE_interfaceExtends = 6;
    public static readonly RULE_statement = 7;
    public static readonly RULE_letStar = 8;
    public static readonly RULE_letStmt = 9;
    public static readonly RULE_constStar = 10;
    public static readonly RULE_constStmt = 11;
    public static readonly RULE_ifForm = 12;
    public static readonly RULE_whileForm = 13;
    public static readonly RULE_block = 14;
    public static readonly RULE_returnForm = 15;
    public static readonly RULE_throwForm = 16;
    public static readonly RULE_importForm = 17;
    public static readonly RULE_exportForm = 18;
    public static readonly RULE_exportBinding = 19;
    public static readonly RULE_exportDefault = 20;
    public static readonly RULE_exportNamed = 21;
    public static readonly RULE_exportNamePair = 22;
    public static readonly RULE_exportFrom = 23;
    public static readonly RULE_exportAllFrom = 24;
    public static readonly RULE_starBinding = 25;
    public static readonly RULE_singleBinding = 26;
    public static readonly RULE_typeExpr = 27;
    public static readonly RULE_typeUnion = 28;
    public static readonly RULE_typeIntersection = 29;
    public static readonly RULE_typeArray = 30;
    public static readonly RULE_typeTuple = 31;
    public static readonly RULE_typeTupleElement = 32;
    public static readonly RULE_typeFunction = 33;
    public static readonly RULE_typeFnParam = 34;
    public static readonly RULE_typeObject = 35;
    public static readonly RULE_typeProp = 36;
    public static readonly RULE_propModifier = 37;
    public static readonly RULE_typeLiteral = 38;
    public static readonly RULE_typeKeyof = 39;
    public static readonly RULE_typeTypeof = 40;
    public static readonly RULE_typeIndexAccess = 41;
    public static readonly RULE_typeConditional = 42;
    public static readonly RULE_typeInfer = 43;
    public static readonly RULE_typeMapped = 44;
    public static readonly RULE_mappedModifiers = 45;
    public static readonly RULE_mappedModifier = 46;
    public static readonly RULE_typeTemplateLiteral = 47;
    public static readonly RULE_templatePart = 48;
    public static readonly RULE_typeApplication = 49;
    public static readonly RULE_typeParams = 50;
    public static readonly RULE_typeParamDecl = 51;
    public static readonly RULE_typeParamConstraint = 52;
    public static readonly RULE_typeParamDefault = 53;
    public static readonly RULE_assign = 54;
    public static readonly RULE_switchForm = 55;
    public static readonly RULE_caseClause = 56;
    public static readonly RULE_defaultClause = 57;
    public static readonly RULE_forForm = 58;
    public static readonly RULE_forInForm = 59;
    public static readonly RULE_forOfForm = 60;
    public static readonly RULE_expression = 61;
    public static readonly RULE_typeofExpr = 62;
    public static readonly RULE_lambda = 63;
    public static readonly RULE_fn = 64;
    public static readonly RULE_bindExpr = 65;
    public static readonly RULE_methodCallExpr = 66;
    public static readonly RULE_ternary = 67;
    public static readonly RULE_condExpr = 68;
    public static readonly RULE_newForm = 69;
    public static readonly RULE_objectExpr = 70;
    public static readonly RULE_objectField = 71;
    public static readonly RULE_methodDef = 72;
    public static readonly RULE_arrayExpr = 73;
    public static readonly RULE_propKey = 74;
    public static readonly RULE_propAccess = 75;
    public static readonly RULE_indexAccess = 76;
    public static readonly RULE_quasiquote = 77;
    public static readonly RULE_unquote = 78;
    public static readonly RULE_unquoteSplicing = 79;
    public static readonly RULE_optChain = 80;
    public static readonly RULE_nullCoalesce = 81;
    public static readonly RULE_call = 82;
    public static readonly RULE_typeArgs = 83;
    public static readonly RULE_fnSignature = 84;
    public static readonly RULE_param = 85;
    public static readonly RULE_literal = 86;

    public static readonly literalNames = [
        null, null, "'('", "')'", "','", "'program'", "'let*'", "'let'", 
        "'const*'", "'const'", "'lambda'", "'fn'", "'method'", "'bind'", 
        "'method-call'", "'def'", "'defmacro'", "'if'", "'while'", "'begin'", 
        "'return'", "'throw'", "'set!'", "'ternary'", "'cond'", "'object'", 
        "'array'", "'.?'", "'.'", "'index'", "'??'", "'quasi'", "'quote'", 
        "'unquote-splicing'", "'unquote'", "'new'", "'import'", "'switch'", 
        "'case'", "'default'", "'for-in'", "'for-of'", "'for'", "'union'", 
        "'intersect'", "'tuple'", "'tfn'", "'tlit'", "'keyof'", "'typeof'", 
        "'infer'", "'mapped'", "'template'", "'rest'", "'readonly'", "'type-params'", 
        "'type-args'", "'extends'", "'returns'", "'type'", "'interface'", 
        "'modifiers'", "'?'", null, "'null'", "'undefined'", "':'", "'['", 
        "']'", "'export'", "'export-default'", "'export-named'", "'export-from'", 
        "'export-all-from'"
    ];

    public static readonly symbolicNames = [
        null, "COMMENT", "LPAREN", "RPAREN", "COMMA", "PROGRAM", "LETSTAR", 
        "LET", "CONSTSTAR", "CONST", "LAMBDA", "FN", "METHOD", "BIND", "METHOD_CALL", 
        "DEF", "DEFMACRO", "IF", "WHILE", "BEGIN", "RETURN", "THROW", "SET", 
        "TERNARY", "COND", "OBJECT", "ARRAY", "OPTCHAIN", "DOT", "INDEX", 
        "NULLCOAL", "QUASI", "QUOTE", "UNQUOTE_SPLICING", "UNQUOTE", "NEW", 
        "IMPORT", "SWITCH", "CASE", "DEFAULT", "FORIN", "FOROF", "FOR", 
        "UNION", "INTERSECT", "TUPLE", "TYPEFN", "LIT", "KEYOF", "TYPEOF", 
        "INFER", "MAPPED", "TEMPLATE", "REST", "READONLY", "TYPE_PARAMS", 
        "TYPE_ARGS", "EXTENDS", "RETURNS", "TYPE", "INTERFACE", "MODIFIERS", 
        "OPTIONAL", "BOOLEAN", "NULL", "UNDEFINED", "COLON", "LBRACK", "RBRACK", 
        "EXPORT", "EXPORT_DEFAULT", "EXPORT_NAMED", "EXPORT_FROM", "EXPORT_ALL_FROM", 
        "KEYWORD", "NUMBER", "STRING", "MULTILINE_STRING", "BACKTICK_STRING", 
        "IDENTIFIER", "WS"
    ];
    public static readonly ruleNames = [
        "program", "topLevel", "defmacro", "def", "typeAlias", "interfaceDef", 
        "interfaceExtends", "statement", "letStar", "letStmt", "constStar", 
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
        "expression", "typeofExpr", "lambda", "fn", "bindExpr", "methodCallExpr", 
        "ternary", "condExpr", "newForm", "objectExpr", "objectField", "methodDef", 
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
            this.state = 174;
            this.match(Stage3DParser.LPAREN);
            this.state = 175;
            this.match(Stage3DParser.PROGRAM);
            this.state = 179;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 63)) & ~0x1F) === 0 && ((1 << (_la - 63)) & 112647) !== 0)) {
                {
                {
                this.state = 176;
                this.topLevel();
                }
                }
                this.state = 181;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 182;
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
            this.state = 189;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 1, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 184;
                this.defmacro();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 185;
                this.def();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 186;
                this.typeAlias();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 187;
                this.interfaceDef();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 188;
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
            this.state = 191;
            this.match(Stage3DParser.LPAREN);
            this.state = 192;
            this.match(Stage3DParser.DEFMACRO);
            this.state = 193;
            this.match(Stage3DParser.IDENTIFIER);
            this.state = 194;
            this.fnSignature();
            this.state = 198;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 63)) & ~0x1F) === 0 && ((1 << (_la - 63)) & 112647) !== 0)) {
                {
                {
                this.state = 195;
                this.statement();
                }
                }
                this.state = 200;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 201;
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
            this.state = 203;
            this.match(Stage3DParser.LPAREN);
            this.state = 204;
            this.match(Stage3DParser.DEF);
            this.state = 205;
            this.match(Stage3DParser.IDENTIFIER);
            this.state = 206;
            this.expression();
            this.state = 207;
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
            this.state = 209;
            this.match(Stage3DParser.LPAREN);
            this.state = 210;
            this.match(Stage3DParser.TYPE);
            this.state = 211;
            this.match(Stage3DParser.IDENTIFIER);
            this.state = 213;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 3, this.context) ) {
            case 1:
                {
                this.state = 212;
                this.typeParams();
                }
                break;
            }
            this.state = 215;
            this.typeExpr();
            this.state = 216;
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
            this.state = 218;
            this.match(Stage3DParser.LPAREN);
            this.state = 219;
            this.match(Stage3DParser.INTERFACE);
            this.state = 220;
            this.match(Stage3DParser.IDENTIFIER);
            this.state = 222;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 4, this.context) ) {
            case 1:
                {
                this.state = 221;
                this.typeParams();
                }
                break;
            }
            this.state = 225;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 5, this.context) ) {
            case 1:
                {
                this.state = 224;
                this.interfaceExtends();
                }
                break;
            }
            this.state = 227;
            this.typeObject();
            this.state = 228;
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
            this.state = 230;
            this.match(Stage3DParser.LPAREN);
            this.state = 231;
            this.match(Stage3DParser.EXTENDS);
            this.state = 233;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 232;
                this.typeExpr();
                }
                }
                this.state = 235;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 79);
            this.state = 237;
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
    public statement(): StatementContext {
        let localContext = new StatementContext(this.context, this.state);
        this.enterRule(localContext, 14, Stage3DParser.RULE_statement);
        try {
            this.state = 256;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 7, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 239;
                this.letStar();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 240;
                this.letStmt();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 241;
                this.constStar();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 242;
                this.constStmt();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 243;
                this.ifForm();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 244;
                this.whileForm();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 245;
                this.block();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 246;
                this.returnForm();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 247;
                this.throwForm();
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 248;
                this.importForm();
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 249;
                this.exportForm();
                }
                break;
            case 12:
                this.enterOuterAlt(localContext, 12);
                {
                this.state = 250;
                this.switchForm();
                }
                break;
            case 13:
                this.enterOuterAlt(localContext, 13);
                {
                this.state = 251;
                this.forForm();
                }
                break;
            case 14:
                this.enterOuterAlt(localContext, 14);
                {
                this.state = 252;
                this.forInForm();
                }
                break;
            case 15:
                this.enterOuterAlt(localContext, 15);
                {
                this.state = 253;
                this.forOfForm();
                }
                break;
            case 16:
                this.enterOuterAlt(localContext, 16);
                {
                this.state = 254;
                this.assign();
                }
                break;
            case 17:
                this.enterOuterAlt(localContext, 17);
                {
                this.state = 255;
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
        this.enterRule(localContext, 16, Stage3DParser.RULE_letStar);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 258;
            this.match(Stage3DParser.LPAREN);
            this.state = 259;
            this.match(Stage3DParser.LETSTAR);
            this.state = 260;
            this.match(Stage3DParser.LPAREN);
            this.state = 264;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 261;
                this.starBinding();
                }
                }
                this.state = 266;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 267;
            this.match(Stage3DParser.RPAREN);
            this.state = 271;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 63)) & ~0x1F) === 0 && ((1 << (_la - 63)) & 112647) !== 0)) {
                {
                {
                this.state = 268;
                this.statement();
                }
                }
                this.state = 273;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
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
    public letStmt(): LetStmtContext {
        let localContext = new LetStmtContext(this.context, this.state);
        this.enterRule(localContext, 18, Stage3DParser.RULE_letStmt);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 276;
            this.match(Stage3DParser.LPAREN);
            this.state = 277;
            this.match(Stage3DParser.LET);
            this.state = 278;
            this.singleBinding();
            this.state = 279;
            this.expression();
            this.state = 280;
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
        this.enterRule(localContext, 20, Stage3DParser.RULE_constStar);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 282;
            this.match(Stage3DParser.LPAREN);
            this.state = 283;
            this.match(Stage3DParser.CONSTSTAR);
            this.state = 284;
            this.match(Stage3DParser.LPAREN);
            this.state = 288;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 285;
                this.starBinding();
                }
                }
                this.state = 290;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 291;
            this.match(Stage3DParser.RPAREN);
            this.state = 295;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 63)) & ~0x1F) === 0 && ((1 << (_la - 63)) & 112647) !== 0)) {
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
        this.enterRule(localContext, 22, Stage3DParser.RULE_constStmt);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 300;
            this.match(Stage3DParser.LPAREN);
            this.state = 301;
            this.match(Stage3DParser.CONST);
            this.state = 302;
            this.singleBinding();
            this.state = 303;
            this.expression();
            this.state = 304;
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
        this.enterRule(localContext, 24, Stage3DParser.RULE_ifForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 306;
            this.match(Stage3DParser.LPAREN);
            this.state = 307;
            this.match(Stage3DParser.IF);
            this.state = 308;
            this.expression();
            this.state = 309;
            this.statement();
            this.state = 311;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2 || ((((_la - 63)) & ~0x1F) === 0 && ((1 << (_la - 63)) & 112647) !== 0)) {
                {
                this.state = 310;
                this.statement();
                }
            }

            this.state = 313;
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
        this.enterRule(localContext, 26, Stage3DParser.RULE_whileForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 315;
            this.match(Stage3DParser.LPAREN);
            this.state = 316;
            this.match(Stage3DParser.WHILE);
            this.state = 317;
            this.expression();
            this.state = 321;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 63)) & ~0x1F) === 0 && ((1 << (_la - 63)) & 112647) !== 0)) {
                {
                {
                this.state = 318;
                this.statement();
                }
                }
                this.state = 323;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 324;
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
        this.enterRule(localContext, 28, Stage3DParser.RULE_block);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 326;
            this.match(Stage3DParser.LPAREN);
            this.state = 327;
            this.match(Stage3DParser.BEGIN);
            this.state = 331;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 63)) & ~0x1F) === 0 && ((1 << (_la - 63)) & 112647) !== 0)) {
                {
                {
                this.state = 328;
                this.statement();
                }
                }
                this.state = 333;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 334;
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
        this.enterRule(localContext, 30, Stage3DParser.RULE_returnForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 336;
            this.match(Stage3DParser.LPAREN);
            this.state = 337;
            this.match(Stage3DParser.RETURN);
            this.state = 339;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2 || ((((_la - 63)) & ~0x1F) === 0 && ((1 << (_la - 63)) & 112647) !== 0)) {
                {
                this.state = 338;
                this.expression();
                }
            }

            this.state = 341;
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
        this.enterRule(localContext, 32, Stage3DParser.RULE_throwForm);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 343;
            this.match(Stage3DParser.LPAREN);
            this.state = 344;
            this.match(Stage3DParser.THROW);
            this.state = 345;
            this.expression();
            this.state = 346;
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
        this.enterRule(localContext, 34, Stage3DParser.RULE_importForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 348;
            this.match(Stage3DParser.LPAREN);
            this.state = 349;
            this.match(Stage3DParser.IMPORT);
            this.state = 351;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2) {
                {
                this.state = 350;
                this.objectExpr();
                }
            }

            this.state = 353;
            this.match(Stage3DParser.STRING);
            this.state = 354;
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
        this.enterRule(localContext, 36, Stage3DParser.RULE_exportForm);
        try {
            this.state = 361;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 17, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 356;
                this.exportBinding();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 357;
                this.exportDefault();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 358;
                this.exportNamed();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 359;
                this.exportFrom();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 360;
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
        this.enterRule(localContext, 38, Stage3DParser.RULE_exportBinding);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 363;
            this.match(Stage3DParser.LPAREN);
            this.state = 364;
            this.match(Stage3DParser.EXPORT);
            this.state = 365;
            this.match(Stage3DParser.IDENTIFIER);
            this.state = 366;
            this.expression();
            this.state = 367;
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
        this.enterRule(localContext, 40, Stage3DParser.RULE_exportDefault);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 369;
            this.match(Stage3DParser.LPAREN);
            this.state = 370;
            this.match(Stage3DParser.EXPORT_DEFAULT);
            this.state = 371;
            this.expression();
            this.state = 372;
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
        this.enterRule(localContext, 42, Stage3DParser.RULE_exportNamed);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 374;
            this.match(Stage3DParser.LPAREN);
            this.state = 375;
            this.match(Stage3DParser.EXPORT_NAMED);
            this.state = 377;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 376;
                this.exportNamePair();
                }
                }
                this.state = 379;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2);
            this.state = 381;
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
        this.enterRule(localContext, 44, Stage3DParser.RULE_exportNamePair);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 383;
            this.match(Stage3DParser.LPAREN);
            this.state = 384;
            this.match(Stage3DParser.IDENTIFIER);
            this.state = 386;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 79) {
                {
                this.state = 385;
                this.match(Stage3DParser.IDENTIFIER);
                }
            }

            this.state = 388;
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
        this.enterRule(localContext, 46, Stage3DParser.RULE_exportFrom);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 390;
            this.match(Stage3DParser.LPAREN);
            this.state = 391;
            this.match(Stage3DParser.EXPORT_FROM);
            this.state = 392;
            this.match(Stage3DParser.STRING);
            this.state = 394;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 393;
                this.exportNamePair();
                }
                }
                this.state = 396;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2);
            this.state = 398;
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
        this.enterRule(localContext, 48, Stage3DParser.RULE_exportAllFrom);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 400;
            this.match(Stage3DParser.LPAREN);
            this.state = 401;
            this.match(Stage3DParser.EXPORT_ALL_FROM);
            this.state = 402;
            this.match(Stage3DParser.STRING);
            this.state = 403;
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
        this.enterRule(localContext, 50, Stage3DParser.RULE_starBinding);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 405;
            this.match(Stage3DParser.LPAREN);
            this.state = 406;
            this.match(Stage3DParser.IDENTIFIER);
            this.state = 409;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 66) {
                {
                this.state = 407;
                this.match(Stage3DParser.COLON);
                this.state = 408;
                this.typeExpr();
                }
            }

            this.state = 411;
            this.expression();
            this.state = 412;
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
        this.enterRule(localContext, 52, Stage3DParser.RULE_singleBinding);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 414;
            this.match(Stage3DParser.LPAREN);
            this.state = 415;
            this.match(Stage3DParser.IDENTIFIER);
            this.state = 418;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 66) {
                {
                this.state = 416;
                this.match(Stage3DParser.COLON);
                this.state = 417;
                this.typeExpr();
                }
            }

            this.state = 420;
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
        this.enterRule(localContext, 54, Stage3DParser.RULE_typeExpr);
        try {
            this.state = 438;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 23, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 422;
                this.match(Stage3DParser.IDENTIFIER);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 423;
                this.typeUnion();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 424;
                this.typeIntersection();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 425;
                this.typeArray();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 426;
                this.typeTuple();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 427;
                this.typeFunction();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 428;
                this.typeObject();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 429;
                this.typeLiteral();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 430;
                this.typeKeyof();
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 431;
                this.typeTypeof();
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 432;
                this.typeIndexAccess();
                }
                break;
            case 12:
                this.enterOuterAlt(localContext, 12);
                {
                this.state = 433;
                this.typeConditional();
                }
                break;
            case 13:
                this.enterOuterAlt(localContext, 13);
                {
                this.state = 434;
                this.typeInfer();
                }
                break;
            case 14:
                this.enterOuterAlt(localContext, 14);
                {
                this.state = 435;
                this.typeMapped();
                }
                break;
            case 15:
                this.enterOuterAlt(localContext, 15);
                {
                this.state = 436;
                this.typeTemplateLiteral();
                }
                break;
            case 16:
                this.enterOuterAlt(localContext, 16);
                {
                this.state = 437;
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
        this.enterRule(localContext, 56, Stage3DParser.RULE_typeUnion);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 440;
            this.match(Stage3DParser.LPAREN);
            this.state = 441;
            this.match(Stage3DParser.UNION);
            this.state = 442;
            this.typeExpr();
            this.state = 444;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 443;
                this.typeExpr();
                }
                }
                this.state = 446;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 79);
            this.state = 448;
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
        this.enterRule(localContext, 58, Stage3DParser.RULE_typeIntersection);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 450;
            this.match(Stage3DParser.LPAREN);
            this.state = 451;
            this.match(Stage3DParser.INTERSECT);
            this.state = 452;
            this.typeExpr();
            this.state = 454;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 453;
                this.typeExpr();
                }
                }
                this.state = 456;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 79);
            this.state = 458;
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
        this.enterRule(localContext, 60, Stage3DParser.RULE_typeArray);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 460;
            this.match(Stage3DParser.LPAREN);
            this.state = 461;
            this.match(Stage3DParser.ARRAY);
            this.state = 462;
            this.typeExpr();
            this.state = 463;
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
        this.enterRule(localContext, 62, Stage3DParser.RULE_typeTuple);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 465;
            this.match(Stage3DParser.LPAREN);
            this.state = 466;
            this.match(Stage3DParser.TUPLE);
            this.state = 468;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 467;
                this.typeTupleElement();
                }
                }
                this.state = 470;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 79);
            this.state = 472;
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
        this.enterRule(localContext, 64, Stage3DParser.RULE_typeTupleElement);
        try {
            this.state = 485;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 27, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 474;
                this.match(Stage3DParser.LPAREN);
                this.state = 475;
                this.match(Stage3DParser.REST);
                this.state = 476;
                this.typeExpr();
                this.state = 477;
                this.match(Stage3DParser.RPAREN);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 479;
                this.match(Stage3DParser.LPAREN);
                this.state = 480;
                this.match(Stage3DParser.IDENTIFIER);
                this.state = 481;
                this.typeExpr();
                this.state = 482;
                this.match(Stage3DParser.RPAREN);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 484;
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
        this.enterRule(localContext, 66, Stage3DParser.RULE_typeFunction);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 487;
            this.match(Stage3DParser.LPAREN);
            this.state = 488;
            this.match(Stage3DParser.TYPEFN);
            this.state = 490;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 28, this.context) ) {
            case 1:
                {
                this.state = 489;
                this.typeParams();
                }
                break;
            }
            this.state = 492;
            this.match(Stage3DParser.LPAREN);
            this.state = 496;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 493;
                this.typeFnParam();
                }
                }
                this.state = 498;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 499;
            this.match(Stage3DParser.RPAREN);
            this.state = 500;
            this.typeExpr();
            this.state = 501;
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
        this.enterRule(localContext, 68, Stage3DParser.RULE_typeFnParam);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 503;
            this.match(Stage3DParser.LPAREN);
            this.state = 504;
            this.match(Stage3DParser.IDENTIFIER);
            this.state = 506;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 62) {
                {
                this.state = 505;
                this.match(Stage3DParser.OPTIONAL);
                }
            }

            this.state = 508;
            this.typeExpr();
            this.state = 509;
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
        this.enterRule(localContext, 70, Stage3DParser.RULE_typeObject);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 511;
            this.match(Stage3DParser.LPAREN);
            this.state = 512;
            this.match(Stage3DParser.IDENTIFIER);
            this.state = 516;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 513;
                this.typeProp();
                }
                }
                this.state = 518;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 519;
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
        this.enterRule(localContext, 72, Stage3DParser.RULE_typeProp);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 521;
            this.match(Stage3DParser.LPAREN);
            this.state = 525;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 54) {
                {
                {
                this.state = 522;
                this.propModifier();
                }
                }
                this.state = 527;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 528;
            this.match(Stage3DParser.IDENTIFIER);
            this.state = 530;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 62) {
                {
                this.state = 529;
                this.match(Stage3DParser.OPTIONAL);
                }
            }

            this.state = 532;
            this.typeExpr();
            this.state = 533;
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
        this.enterRule(localContext, 74, Stage3DParser.RULE_propModifier);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 535;
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
        this.enterRule(localContext, 76, Stage3DParser.RULE_typeLiteral);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 537;
            this.match(Stage3DParser.LPAREN);
            this.state = 538;
            this.match(Stage3DParser.LIT);
            this.state = 539;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 63)) & ~0x1F) === 0 && ((1 << (_la - 63)) & 45057) !== 0))) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 540;
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
        this.enterRule(localContext, 78, Stage3DParser.RULE_typeKeyof);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 542;
            this.match(Stage3DParser.LPAREN);
            this.state = 543;
            this.match(Stage3DParser.KEYOF);
            this.state = 544;
            this.typeExpr();
            this.state = 545;
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
        this.enterRule(localContext, 80, Stage3DParser.RULE_typeTypeof);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 547;
            this.match(Stage3DParser.LPAREN);
            this.state = 548;
            this.match(Stage3DParser.TYPEOF);
            this.state = 549;
            this.match(Stage3DParser.IDENTIFIER);
            this.state = 550;
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
        this.enterRule(localContext, 82, Stage3DParser.RULE_typeIndexAccess);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 552;
            this.match(Stage3DParser.LPAREN);
            this.state = 553;
            this.match(Stage3DParser.INDEX);
            this.state = 554;
            this.typeExpr();
            this.state = 555;
            this.typeExpr();
            this.state = 556;
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
        this.enterRule(localContext, 84, Stage3DParser.RULE_typeConditional);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 558;
            this.match(Stage3DParser.LPAREN);
            this.state = 559;
            this.match(Stage3DParser.COND);
            this.state = 560;
            this.typeExpr();
            this.state = 561;
            this.typeExpr();
            this.state = 562;
            this.typeExpr();
            this.state = 563;
            this.typeExpr();
            this.state = 564;
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
        this.enterRule(localContext, 86, Stage3DParser.RULE_typeInfer);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 566;
            this.match(Stage3DParser.LPAREN);
            this.state = 567;
            this.match(Stage3DParser.INFER);
            this.state = 568;
            this.match(Stage3DParser.IDENTIFIER);
            this.state = 569;
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
        this.enterRule(localContext, 88, Stage3DParser.RULE_typeMapped);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 571;
            this.match(Stage3DParser.LPAREN);
            this.state = 572;
            this.match(Stage3DParser.MAPPED);
            this.state = 573;
            this.match(Stage3DParser.IDENTIFIER);
            this.state = 574;
            this.typeExpr();
            this.state = 576;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 34, this.context) ) {
            case 1:
                {
                this.state = 575;
                this.mappedModifiers();
                }
                break;
            }
            this.state = 578;
            this.typeExpr();
            this.state = 579;
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
        this.enterRule(localContext, 90, Stage3DParser.RULE_mappedModifiers);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 581;
            this.match(Stage3DParser.LPAREN);
            this.state = 582;
            this.match(Stage3DParser.MODIFIERS);
            this.state = 584;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 583;
                this.mappedModifier();
                }
                }
                this.state = 586;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 54 || _la === 62);
            this.state = 588;
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
        this.enterRule(localContext, 92, Stage3DParser.RULE_mappedModifier);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 590;
            _la = this.tokenStream.LA(1);
            if(!(_la === 54 || _la === 62)) {
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
        this.enterRule(localContext, 94, Stage3DParser.RULE_typeTemplateLiteral);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 592;
            this.match(Stage3DParser.LPAREN);
            this.state = 593;
            this.match(Stage3DParser.TEMPLATE);
            this.state = 595;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 594;
                this.templatePart();
                }
                }
                this.state = 597;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 76 || _la === 79);
            this.state = 599;
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
        this.enterRule(localContext, 96, Stage3DParser.RULE_templatePart);
        try {
            this.state = 603;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case Stage3DParser.STRING:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 601;
                this.match(Stage3DParser.STRING);
                }
                break;
            case Stage3DParser.LPAREN:
            case Stage3DParser.IDENTIFIER:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 602;
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
        this.enterRule(localContext, 98, Stage3DParser.RULE_typeApplication);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 605;
            this.match(Stage3DParser.LPAREN);
            this.state = 606;
            this.typeExpr();
            this.state = 608;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 607;
                this.typeExpr();
                }
                }
                this.state = 610;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 79);
            this.state = 612;
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
        this.enterRule(localContext, 100, Stage3DParser.RULE_typeParams);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 614;
            this.match(Stage3DParser.LPAREN);
            this.state = 615;
            this.match(Stage3DParser.TYPE_PARAMS);
            this.state = 617;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 616;
                this.typeParamDecl();
                }
                }
                this.state = 619;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 79);
            this.state = 621;
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
        this.enterRule(localContext, 102, Stage3DParser.RULE_typeParamDecl);
        let _la: number;
        try {
            this.state = 633;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case Stage3DParser.IDENTIFIER:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 623;
                this.match(Stage3DParser.IDENTIFIER);
                }
                break;
            case Stage3DParser.LPAREN:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 624;
                this.match(Stage3DParser.LPAREN);
                this.state = 625;
                this.match(Stage3DParser.IDENTIFIER);
                this.state = 627;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 40, this.context) ) {
                case 1:
                    {
                    this.state = 626;
                    this.typeParamConstraint();
                    }
                    break;
                }
                this.state = 630;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 2) {
                    {
                    this.state = 629;
                    this.typeParamDefault();
                    }
                }

                this.state = 632;
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
        this.enterRule(localContext, 104, Stage3DParser.RULE_typeParamConstraint);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 635;
            this.match(Stage3DParser.LPAREN);
            this.state = 636;
            this.match(Stage3DParser.EXTENDS);
            this.state = 637;
            this.typeExpr();
            this.state = 638;
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
        this.enterRule(localContext, 106, Stage3DParser.RULE_typeParamDefault);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 640;
            this.match(Stage3DParser.LPAREN);
            this.state = 641;
            this.match(Stage3DParser.DEFAULT);
            this.state = 642;
            this.typeExpr();
            this.state = 643;
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
        this.enterRule(localContext, 108, Stage3DParser.RULE_assign);
        try {
            this.state = 657;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 43, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 645;
                this.match(Stage3DParser.LPAREN);
                this.state = 646;
                this.match(Stage3DParser.SET);
                this.state = 647;
                this.match(Stage3DParser.IDENTIFIER);
                this.state = 648;
                this.expression();
                this.state = 649;
                this.match(Stage3DParser.RPAREN);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 651;
                this.match(Stage3DParser.LPAREN);
                this.state = 652;
                this.match(Stage3DParser.SET);
                this.state = 653;
                this.propAccess();
                this.state = 654;
                this.expression();
                this.state = 655;
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
        this.enterRule(localContext, 110, Stage3DParser.RULE_switchForm);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 659;
            this.match(Stage3DParser.LPAREN);
            this.state = 660;
            this.match(Stage3DParser.SWITCH);
            this.state = 661;
            this.expression();
            this.state = 665;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 44, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 662;
                    this.caseClause();
                    }
                    }
                }
                this.state = 667;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 44, this.context);
            }
            this.state = 669;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2) {
                {
                this.state = 668;
                this.defaultClause();
                }
            }

            this.state = 671;
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
        this.enterRule(localContext, 112, Stage3DParser.RULE_caseClause);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 673;
            this.match(Stage3DParser.LPAREN);
            this.state = 674;
            this.match(Stage3DParser.CASE);
            this.state = 675;
            this.expression();
            this.state = 679;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 63)) & ~0x1F) === 0 && ((1 << (_la - 63)) & 112647) !== 0)) {
                {
                {
                this.state = 676;
                this.statement();
                }
                }
                this.state = 681;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
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
    public defaultClause(): DefaultClauseContext {
        let localContext = new DefaultClauseContext(this.context, this.state);
        this.enterRule(localContext, 114, Stage3DParser.RULE_defaultClause);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 684;
            this.match(Stage3DParser.LPAREN);
            this.state = 685;
            this.match(Stage3DParser.DEFAULT);
            this.state = 689;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 63)) & ~0x1F) === 0 && ((1 << (_la - 63)) & 112647) !== 0)) {
                {
                {
                this.state = 686;
                this.statement();
                }
                }
                this.state = 691;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 692;
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
        this.enterRule(localContext, 116, Stage3DParser.RULE_forForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 694;
            this.match(Stage3DParser.LPAREN);
            this.state = 695;
            this.match(Stage3DParser.FOR);
            this.state = 696;
            this.letStmt();
            this.state = 697;
            this.expression();
            this.state = 698;
            this.assign();
            this.state = 702;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 63)) & ~0x1F) === 0 && ((1 << (_la - 63)) & 112647) !== 0)) {
                {
                {
                this.state = 699;
                this.statement();
                }
                }
                this.state = 704;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 705;
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
        this.enterRule(localContext, 118, Stage3DParser.RULE_forInForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 707;
            this.match(Stage3DParser.LPAREN);
            this.state = 708;
            this.match(Stage3DParser.FORIN);
            this.state = 709;
            this.match(Stage3DParser.IDENTIFIER);
            this.state = 710;
            this.expression();
            this.state = 714;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 63)) & ~0x1F) === 0 && ((1 << (_la - 63)) & 112647) !== 0)) {
                {
                {
                this.state = 711;
                this.statement();
                }
                }
                this.state = 716;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 717;
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
        this.enterRule(localContext, 120, Stage3DParser.RULE_forOfForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 719;
            this.match(Stage3DParser.LPAREN);
            this.state = 720;
            this.match(Stage3DParser.FOROF);
            this.state = 721;
            this.match(Stage3DParser.IDENTIFIER);
            this.state = 722;
            this.expression();
            this.state = 726;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 63)) & ~0x1F) === 0 && ((1 << (_la - 63)) & 112647) !== 0)) {
                {
                {
                this.state = 723;
                this.statement();
                }
                }
                this.state = 728;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 729;
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
        this.enterRule(localContext, 122, Stage3DParser.RULE_expression);
        try {
            this.state = 752;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 51, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 731;
                this.literal();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 732;
                this.match(Stage3DParser.KEYWORD);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 733;
                this.match(Stage3DParser.IDENTIFIER);
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 734;
                this.lambda();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 735;
                this.fn();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 736;
                this.bindExpr();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 737;
                this.methodCallExpr();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 738;
                this.objectExpr();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 739;
                this.arrayExpr();
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 740;
                this.propAccess();
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 741;
                this.indexAccess();
                }
                break;
            case 12:
                this.enterOuterAlt(localContext, 12);
                {
                this.state = 742;
                this.quasiquote();
                }
                break;
            case 13:
                this.enterOuterAlt(localContext, 13);
                {
                this.state = 743;
                this.unquote();
                }
                break;
            case 14:
                this.enterOuterAlt(localContext, 14);
                {
                this.state = 744;
                this.unquoteSplicing();
                }
                break;
            case 15:
                this.enterOuterAlt(localContext, 15);
                {
                this.state = 745;
                this.ternary();
                }
                break;
            case 16:
                this.enterOuterAlt(localContext, 16);
                {
                this.state = 746;
                this.condExpr();
                }
                break;
            case 17:
                this.enterOuterAlt(localContext, 17);
                {
                this.state = 747;
                this.newForm();
                }
                break;
            case 18:
                this.enterOuterAlt(localContext, 18);
                {
                this.state = 748;
                this.optChain();
                }
                break;
            case 19:
                this.enterOuterAlt(localContext, 19);
                {
                this.state = 749;
                this.nullCoalesce();
                }
                break;
            case 20:
                this.enterOuterAlt(localContext, 20);
                {
                this.state = 750;
                this.typeofExpr();
                }
                break;
            case 21:
                this.enterOuterAlt(localContext, 21);
                {
                this.state = 751;
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
        this.enterRule(localContext, 124, Stage3DParser.RULE_typeofExpr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 754;
            this.match(Stage3DParser.LPAREN);
            this.state = 755;
            this.match(Stage3DParser.TYPEOF);
            this.state = 756;
            this.expression();
            this.state = 757;
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
        this.enterRule(localContext, 126, Stage3DParser.RULE_lambda);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 759;
            this.match(Stage3DParser.LPAREN);
            this.state = 760;
            this.match(Stage3DParser.LAMBDA);
            this.state = 761;
            this.fnSignature();
            this.state = 765;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 63)) & ~0x1F) === 0 && ((1 << (_la - 63)) & 112647) !== 0)) {
                {
                {
                this.state = 762;
                this.statement();
                }
                }
                this.state = 767;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 768;
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
        this.enterRule(localContext, 128, Stage3DParser.RULE_fn);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 770;
            this.match(Stage3DParser.LPAREN);
            this.state = 771;
            this.match(Stage3DParser.FN);
            this.state = 772;
            this.fnSignature();
            this.state = 776;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 63)) & ~0x1F) === 0 && ((1 << (_la - 63)) & 112647) !== 0)) {
                {
                {
                this.state = 773;
                this.statement();
                }
                }
                this.state = 778;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 779;
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
        this.enterRule(localContext, 130, Stage3DParser.RULE_bindExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 781;
            this.match(Stage3DParser.LPAREN);
            this.state = 782;
            this.match(Stage3DParser.BIND);
            this.state = 783;
            this.expression();
            this.state = 784;
            this.expression();
            this.state = 788;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 63)) & ~0x1F) === 0 && ((1 << (_la - 63)) & 112647) !== 0)) {
                {
                {
                this.state = 785;
                this.expression();
                }
                }
                this.state = 790;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 791;
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
        this.enterRule(localContext, 132, Stage3DParser.RULE_methodCallExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 793;
            this.match(Stage3DParser.LPAREN);
            this.state = 794;
            this.match(Stage3DParser.METHOD_CALL);
            this.state = 795;
            this.expression();
            this.state = 796;
            this.expression();
            this.state = 800;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 63)) & ~0x1F) === 0 && ((1 << (_la - 63)) & 112647) !== 0)) {
                {
                {
                this.state = 797;
                this.expression();
                }
                }
                this.state = 802;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 803;
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
        this.enterRule(localContext, 134, Stage3DParser.RULE_ternary);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 805;
            this.match(Stage3DParser.LPAREN);
            this.state = 806;
            this.match(Stage3DParser.TERNARY);
            this.state = 807;
            this.expression();
            this.state = 808;
            this.expression();
            this.state = 809;
            this.expression();
            this.state = 810;
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
        this.enterRule(localContext, 136, Stage3DParser.RULE_condExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 812;
            this.match(Stage3DParser.LPAREN);
            this.state = 813;
            this.match(Stage3DParser.COND);
            this.state = 817;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 814;
                this.expression();
                this.state = 815;
                this.expression();
                }
                }
                this.state = 819;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || ((((_la - 63)) & ~0x1F) === 0 && ((1 << (_la - 63)) & 112647) !== 0));
            this.state = 821;
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
        this.enterRule(localContext, 138, Stage3DParser.RULE_newForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 823;
            this.match(Stage3DParser.LPAREN);
            this.state = 824;
            this.match(Stage3DParser.NEW);
            this.state = 825;
            this.match(Stage3DParser.IDENTIFIER);
            this.state = 827;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 57, this.context) ) {
            case 1:
                {
                this.state = 826;
                this.typeArgs();
                }
                break;
            }
            this.state = 832;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 63)) & ~0x1F) === 0 && ((1 << (_la - 63)) & 112647) !== 0)) {
                {
                {
                this.state = 829;
                this.expression();
                }
                }
                this.state = 834;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 835;
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
        this.enterRule(localContext, 140, Stage3DParser.RULE_objectExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 837;
            this.match(Stage3DParser.LPAREN);
            this.state = 838;
            this.match(Stage3DParser.OBJECT);
            this.state = 842;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 839;
                this.objectField();
                }
                }
                this.state = 844;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 845;
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
        this.enterRule(localContext, 142, Stage3DParser.RULE_objectField);
        try {
            this.state = 860;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 60, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 847;
                this.match(Stage3DParser.LPAREN);
                this.state = 848;
                this.propKey();
                this.state = 849;
                this.expression();
                this.state = 850;
                this.match(Stage3DParser.RPAREN);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 852;
                this.match(Stage3DParser.LPAREN);
                this.state = 853;
                this.propKey();
                this.state = 854;
                this.methodDef();
                this.state = 855;
                this.match(Stage3DParser.RPAREN);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 857;
                this.match(Stage3DParser.LPAREN);
                this.state = 858;
                this.match(Stage3DParser.IDENTIFIER);
                this.state = 859;
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
    public methodDef(): MethodDefContext {
        let localContext = new MethodDefContext(this.context, this.state);
        this.enterRule(localContext, 144, Stage3DParser.RULE_methodDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 862;
            this.match(Stage3DParser.LPAREN);
            this.state = 863;
            this.match(Stage3DParser.METHOD);
            this.state = 864;
            this.fnSignature();
            this.state = 868;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 63)) & ~0x1F) === 0 && ((1 << (_la - 63)) & 112647) !== 0)) {
                {
                {
                this.state = 865;
                this.statement();
                }
                }
                this.state = 870;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 871;
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
        this.enterRule(localContext, 146, Stage3DParser.RULE_arrayExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 873;
            this.match(Stage3DParser.LPAREN);
            this.state = 874;
            this.match(Stage3DParser.ARRAY);
            this.state = 878;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 63)) & ~0x1F) === 0 && ((1 << (_la - 63)) & 112647) !== 0)) {
                {
                {
                this.state = 875;
                this.expression();
                }
                }
                this.state = 880;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 881;
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
        this.enterRule(localContext, 148, Stage3DParser.RULE_propKey);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 883;
            _la = this.tokenStream.LA(1);
            if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 2818572256) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 3221225471) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 55267) !== 0))) {
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
        this.enterRule(localContext, 150, Stage3DParser.RULE_propAccess);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 885;
            this.match(Stage3DParser.LPAREN);
            this.state = 886;
            this.match(Stage3DParser.DOT);
            this.state = 887;
            this.expression();
            this.state = 888;
            this.propKey();
            this.state = 889;
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
        this.enterRule(localContext, 152, Stage3DParser.RULE_indexAccess);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 891;
            this.match(Stage3DParser.LPAREN);
            this.state = 892;
            this.match(Stage3DParser.INDEX);
            this.state = 893;
            this.expression();
            this.state = 894;
            this.expression();
            this.state = 895;
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
        this.enterRule(localContext, 154, Stage3DParser.RULE_quasiquote);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 897;
            this.match(Stage3DParser.LPAREN);
            this.state = 898;
            _la = this.tokenStream.LA(1);
            if(!(_la === 31 || _la === 32)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 899;
            this.expression();
            this.state = 900;
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
        this.enterRule(localContext, 156, Stage3DParser.RULE_unquote);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 902;
            this.match(Stage3DParser.LPAREN);
            this.state = 903;
            this.match(Stage3DParser.UNQUOTE);
            this.state = 904;
            this.expression();
            this.state = 905;
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
        this.enterRule(localContext, 158, Stage3DParser.RULE_unquoteSplicing);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 907;
            this.match(Stage3DParser.LPAREN);
            this.state = 908;
            this.match(Stage3DParser.UNQUOTE_SPLICING);
            this.state = 909;
            this.expression();
            this.state = 910;
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
        this.enterRule(localContext, 160, Stage3DParser.RULE_optChain);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 912;
            this.match(Stage3DParser.LPAREN);
            this.state = 913;
            this.match(Stage3DParser.OPTCHAIN);
            this.state = 914;
            this.expression();
            this.state = 915;
            this.propKey();
            this.state = 916;
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
        this.enterRule(localContext, 162, Stage3DParser.RULE_nullCoalesce);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 918;
            this.match(Stage3DParser.LPAREN);
            this.state = 919;
            this.match(Stage3DParser.NULLCOAL);
            this.state = 920;
            this.expression();
            this.state = 921;
            this.expression();
            this.state = 922;
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
        this.enterRule(localContext, 164, Stage3DParser.RULE_call);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 924;
            this.match(Stage3DParser.LPAREN);
            this.state = 925;
            this.expression();
            this.state = 927;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 63, this.context) ) {
            case 1:
                {
                this.state = 926;
                this.typeArgs();
                }
                break;
            }
            this.state = 932;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 63)) & ~0x1F) === 0 && ((1 << (_la - 63)) & 112647) !== 0)) {
                {
                {
                this.state = 929;
                this.expression();
                }
                }
                this.state = 934;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 935;
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
        this.enterRule(localContext, 166, Stage3DParser.RULE_typeArgs);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 937;
            this.match(Stage3DParser.LPAREN);
            this.state = 938;
            this.match(Stage3DParser.TYPE_ARGS);
            this.state = 940;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 939;
                this.typeExpr();
                }
                }
                this.state = 942;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 79);
            this.state = 944;
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
        this.enterRule(localContext, 168, Stage3DParser.RULE_fnSignature);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 946;
            this.match(Stage3DParser.LPAREN);
            this.state = 957;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2) {
                {
                this.state = 947;
                this.param();
                this.state = 954;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 2 || _la === 4) {
                    {
                    {
                    this.state = 949;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    if (_la === 4) {
                        {
                        this.state = 948;
                        this.match(Stage3DParser.COMMA);
                        }
                    }

                    this.state = 951;
                    this.param();
                    }
                    }
                    this.state = 956;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
            }

            this.state = 959;
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
        this.enterRule(localContext, 170, Stage3DParser.RULE_param);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 961;
            this.match(Stage3DParser.LPAREN);
            this.state = 962;
            this.match(Stage3DParser.IDENTIFIER);
            this.state = 963;
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
        this.enterRule(localContext, 172, Stage3DParser.RULE_literal);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 965;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 63)) & ~0x1F) === 0 && ((1 << (_la - 63)) & 45063) !== 0))) {
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
        4,1,80,968,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,
        6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,
        2,14,7,14,2,15,7,15,2,16,7,16,2,17,7,17,2,18,7,18,2,19,7,19,2,20,
        7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,24,2,25,7,25,2,26,7,26,
        2,27,7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,31,7,31,2,32,7,32,2,33,
        7,33,2,34,7,34,2,35,7,35,2,36,7,36,2,37,7,37,2,38,7,38,2,39,7,39,
        2,40,7,40,2,41,7,41,2,42,7,42,2,43,7,43,2,44,7,44,2,45,7,45,2,46,
        7,46,2,47,7,47,2,48,7,48,2,49,7,49,2,50,7,50,2,51,7,51,2,52,7,52,
        2,53,7,53,2,54,7,54,2,55,7,55,2,56,7,56,2,57,7,57,2,58,7,58,2,59,
        7,59,2,60,7,60,2,61,7,61,2,62,7,62,2,63,7,63,2,64,7,64,2,65,7,65,
        2,66,7,66,2,67,7,67,2,68,7,68,2,69,7,69,2,70,7,70,2,71,7,71,2,72,
        7,72,2,73,7,73,2,74,7,74,2,75,7,75,2,76,7,76,2,77,7,77,2,78,7,78,
        2,79,7,79,2,80,7,80,2,81,7,81,2,82,7,82,2,83,7,83,2,84,7,84,2,85,
        7,85,2,86,7,86,1,0,1,0,1,0,5,0,178,8,0,10,0,12,0,181,9,0,1,0,1,0,
        1,1,1,1,1,1,1,1,1,1,3,1,190,8,1,1,2,1,2,1,2,1,2,1,2,5,2,197,8,2,
        10,2,12,2,200,9,2,1,2,1,2,1,3,1,3,1,3,1,3,1,3,1,3,1,4,1,4,1,4,1,
        4,3,4,214,8,4,1,4,1,4,1,4,1,5,1,5,1,5,1,5,3,5,223,8,5,1,5,3,5,226,
        8,5,1,5,1,5,1,5,1,6,1,6,1,6,4,6,234,8,6,11,6,12,6,235,1,6,1,6,1,
        7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,
        7,3,7,257,8,7,1,8,1,8,1,8,1,8,5,8,263,8,8,10,8,12,8,266,9,8,1,8,
        1,8,5,8,270,8,8,10,8,12,8,273,9,8,1,8,1,8,1,9,1,9,1,9,1,9,1,9,1,
        9,1,10,1,10,1,10,1,10,5,10,287,8,10,10,10,12,10,290,9,10,1,10,1,
        10,5,10,294,8,10,10,10,12,10,297,9,10,1,10,1,10,1,11,1,11,1,11,1,
        11,1,11,1,11,1,12,1,12,1,12,1,12,1,12,3,12,312,8,12,1,12,1,12,1,
        13,1,13,1,13,1,13,5,13,320,8,13,10,13,12,13,323,9,13,1,13,1,13,1,
        14,1,14,1,14,5,14,330,8,14,10,14,12,14,333,9,14,1,14,1,14,1,15,1,
        15,1,15,3,15,340,8,15,1,15,1,15,1,16,1,16,1,16,1,16,1,16,1,17,1,
        17,1,17,3,17,352,8,17,1,17,1,17,1,17,1,18,1,18,1,18,1,18,1,18,3,
        18,362,8,18,1,19,1,19,1,19,1,19,1,19,1,19,1,20,1,20,1,20,1,20,1,
        20,1,21,1,21,1,21,4,21,378,8,21,11,21,12,21,379,1,21,1,21,1,22,1,
        22,1,22,3,22,387,8,22,1,22,1,22,1,23,1,23,1,23,1,23,4,23,395,8,23,
        11,23,12,23,396,1,23,1,23,1,24,1,24,1,24,1,24,1,24,1,25,1,25,1,25,
        1,25,3,25,410,8,25,1,25,1,25,1,25,1,26,1,26,1,26,1,26,3,26,419,8,
        26,1,26,1,26,1,27,1,27,1,27,1,27,1,27,1,27,1,27,1,27,1,27,1,27,1,
        27,1,27,1,27,1,27,1,27,1,27,3,27,439,8,27,1,28,1,28,1,28,1,28,4,
        28,445,8,28,11,28,12,28,446,1,28,1,28,1,29,1,29,1,29,1,29,4,29,455,
        8,29,11,29,12,29,456,1,29,1,29,1,30,1,30,1,30,1,30,1,30,1,31,1,31,
        1,31,4,31,469,8,31,11,31,12,31,470,1,31,1,31,1,32,1,32,1,32,1,32,
        1,32,1,32,1,32,1,32,1,32,1,32,1,32,3,32,486,8,32,1,33,1,33,1,33,
        3,33,491,8,33,1,33,1,33,5,33,495,8,33,10,33,12,33,498,9,33,1,33,
        1,33,1,33,1,33,1,34,1,34,1,34,3,34,507,8,34,1,34,1,34,1,34,1,35,
        1,35,1,35,5,35,515,8,35,10,35,12,35,518,9,35,1,35,1,35,1,36,1,36,
        5,36,524,8,36,10,36,12,36,527,9,36,1,36,1,36,3,36,531,8,36,1,36,
        1,36,1,36,1,37,1,37,1,38,1,38,1,38,1,38,1,38,1,39,1,39,1,39,1,39,
        1,39,1,40,1,40,1,40,1,40,1,40,1,41,1,41,1,41,1,41,1,41,1,41,1,42,
        1,42,1,42,1,42,1,42,1,42,1,42,1,42,1,43,1,43,1,43,1,43,1,43,1,44,
        1,44,1,44,1,44,1,44,3,44,577,8,44,1,44,1,44,1,44,1,45,1,45,1,45,
        4,45,585,8,45,11,45,12,45,586,1,45,1,45,1,46,1,46,1,47,1,47,1,47,
        4,47,596,8,47,11,47,12,47,597,1,47,1,47,1,48,1,48,3,48,604,8,48,
        1,49,1,49,1,49,4,49,609,8,49,11,49,12,49,610,1,49,1,49,1,50,1,50,
        1,50,4,50,618,8,50,11,50,12,50,619,1,50,1,50,1,51,1,51,1,51,1,51,
        3,51,628,8,51,1,51,3,51,631,8,51,1,51,3,51,634,8,51,1,52,1,52,1,
        52,1,52,1,52,1,53,1,53,1,53,1,53,1,53,1,54,1,54,1,54,1,54,1,54,1,
        54,1,54,1,54,1,54,1,54,1,54,1,54,3,54,658,8,54,1,55,1,55,1,55,1,
        55,5,55,664,8,55,10,55,12,55,667,9,55,1,55,3,55,670,8,55,1,55,1,
        55,1,56,1,56,1,56,1,56,5,56,678,8,56,10,56,12,56,681,9,56,1,56,1,
        56,1,57,1,57,1,57,5,57,688,8,57,10,57,12,57,691,9,57,1,57,1,57,1,
        58,1,58,1,58,1,58,1,58,1,58,5,58,701,8,58,10,58,12,58,704,9,58,1,
        58,1,58,1,59,1,59,1,59,1,59,1,59,5,59,713,8,59,10,59,12,59,716,9,
        59,1,59,1,59,1,60,1,60,1,60,1,60,1,60,5,60,725,8,60,10,60,12,60,
        728,9,60,1,60,1,60,1,61,1,61,1,61,1,61,1,61,1,61,1,61,1,61,1,61,
        1,61,1,61,1,61,1,61,1,61,1,61,1,61,1,61,1,61,1,61,1,61,1,61,3,61,
        753,8,61,1,62,1,62,1,62,1,62,1,62,1,63,1,63,1,63,1,63,5,63,764,8,
        63,10,63,12,63,767,9,63,1,63,1,63,1,64,1,64,1,64,1,64,5,64,775,8,
        64,10,64,12,64,778,9,64,1,64,1,64,1,65,1,65,1,65,1,65,1,65,5,65,
        787,8,65,10,65,12,65,790,9,65,1,65,1,65,1,66,1,66,1,66,1,66,1,66,
        5,66,799,8,66,10,66,12,66,802,9,66,1,66,1,66,1,67,1,67,1,67,1,67,
        1,67,1,67,1,67,1,68,1,68,1,68,1,68,1,68,4,68,818,8,68,11,68,12,68,
        819,1,68,1,68,1,69,1,69,1,69,1,69,3,69,828,8,69,1,69,5,69,831,8,
        69,10,69,12,69,834,9,69,1,69,1,69,1,70,1,70,1,70,5,70,841,8,70,10,
        70,12,70,844,9,70,1,70,1,70,1,71,1,71,1,71,1,71,1,71,1,71,1,71,1,
        71,1,71,1,71,1,71,1,71,1,71,3,71,861,8,71,1,72,1,72,1,72,1,72,5,
        72,867,8,72,10,72,12,72,870,9,72,1,72,1,72,1,73,1,73,1,73,5,73,877,
        8,73,10,73,12,73,880,9,73,1,73,1,73,1,74,1,74,1,75,1,75,1,75,1,75,
        1,75,1,75,1,76,1,76,1,76,1,76,1,76,1,76,1,77,1,77,1,77,1,77,1,77,
        1,78,1,78,1,78,1,78,1,78,1,79,1,79,1,79,1,79,1,79,1,80,1,80,1,80,
        1,80,1,80,1,80,1,81,1,81,1,81,1,81,1,81,1,81,1,82,1,82,1,82,3,82,
        928,8,82,1,82,5,82,931,8,82,10,82,12,82,934,9,82,1,82,1,82,1,83,
        1,83,1,83,4,83,941,8,83,11,83,12,83,942,1,83,1,83,1,84,1,84,1,84,
        3,84,950,8,84,1,84,5,84,953,8,84,10,84,12,84,956,9,84,3,84,958,8,
        84,1,84,1,84,1,85,1,85,1,85,1,85,1,86,1,86,1,86,0,0,87,0,2,4,6,8,
        10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,
        54,56,58,60,62,64,66,68,70,72,74,76,78,80,82,84,86,88,90,92,94,96,
        98,100,102,104,106,108,110,112,114,116,118,120,122,124,126,128,130,
        132,134,136,138,140,142,144,146,148,150,152,154,156,158,160,162,
        164,166,168,170,172,0,5,3,0,63,63,75,76,78,78,2,0,54,54,62,62,7,
        0,5,26,29,29,31,61,63,65,69,74,76,76,78,79,1,0,31,32,3,0,63,65,75,
        76,78,78,1005,0,174,1,0,0,0,2,189,1,0,0,0,4,191,1,0,0,0,6,203,1,
        0,0,0,8,209,1,0,0,0,10,218,1,0,0,0,12,230,1,0,0,0,14,256,1,0,0,0,
        16,258,1,0,0,0,18,276,1,0,0,0,20,282,1,0,0,0,22,300,1,0,0,0,24,306,
        1,0,0,0,26,315,1,0,0,0,28,326,1,0,0,0,30,336,1,0,0,0,32,343,1,0,
        0,0,34,348,1,0,0,0,36,361,1,0,0,0,38,363,1,0,0,0,40,369,1,0,0,0,
        42,374,1,0,0,0,44,383,1,0,0,0,46,390,1,0,0,0,48,400,1,0,0,0,50,405,
        1,0,0,0,52,414,1,0,0,0,54,438,1,0,0,0,56,440,1,0,0,0,58,450,1,0,
        0,0,60,460,1,0,0,0,62,465,1,0,0,0,64,485,1,0,0,0,66,487,1,0,0,0,
        68,503,1,0,0,0,70,511,1,0,0,0,72,521,1,0,0,0,74,535,1,0,0,0,76,537,
        1,0,0,0,78,542,1,0,0,0,80,547,1,0,0,0,82,552,1,0,0,0,84,558,1,0,
        0,0,86,566,1,0,0,0,88,571,1,0,0,0,90,581,1,0,0,0,92,590,1,0,0,0,
        94,592,1,0,0,0,96,603,1,0,0,0,98,605,1,0,0,0,100,614,1,0,0,0,102,
        633,1,0,0,0,104,635,1,0,0,0,106,640,1,0,0,0,108,657,1,0,0,0,110,
        659,1,0,0,0,112,673,1,0,0,0,114,684,1,0,0,0,116,694,1,0,0,0,118,
        707,1,0,0,0,120,719,1,0,0,0,122,752,1,0,0,0,124,754,1,0,0,0,126,
        759,1,0,0,0,128,770,1,0,0,0,130,781,1,0,0,0,132,793,1,0,0,0,134,
        805,1,0,0,0,136,812,1,0,0,0,138,823,1,0,0,0,140,837,1,0,0,0,142,
        860,1,0,0,0,144,862,1,0,0,0,146,873,1,0,0,0,148,883,1,0,0,0,150,
        885,1,0,0,0,152,891,1,0,0,0,154,897,1,0,0,0,156,902,1,0,0,0,158,
        907,1,0,0,0,160,912,1,0,0,0,162,918,1,0,0,0,164,924,1,0,0,0,166,
        937,1,0,0,0,168,946,1,0,0,0,170,961,1,0,0,0,172,965,1,0,0,0,174,
        175,5,2,0,0,175,179,5,5,0,0,176,178,3,2,1,0,177,176,1,0,0,0,178,
        181,1,0,0,0,179,177,1,0,0,0,179,180,1,0,0,0,180,182,1,0,0,0,181,
        179,1,0,0,0,182,183,5,3,0,0,183,1,1,0,0,0,184,190,3,4,2,0,185,190,
        3,6,3,0,186,190,3,8,4,0,187,190,3,10,5,0,188,190,3,14,7,0,189,184,
        1,0,0,0,189,185,1,0,0,0,189,186,1,0,0,0,189,187,1,0,0,0,189,188,
        1,0,0,0,190,3,1,0,0,0,191,192,5,2,0,0,192,193,5,16,0,0,193,194,5,
        79,0,0,194,198,3,168,84,0,195,197,3,14,7,0,196,195,1,0,0,0,197,200,
        1,0,0,0,198,196,1,0,0,0,198,199,1,0,0,0,199,201,1,0,0,0,200,198,
        1,0,0,0,201,202,5,3,0,0,202,5,1,0,0,0,203,204,5,2,0,0,204,205,5,
        15,0,0,205,206,5,79,0,0,206,207,3,122,61,0,207,208,5,3,0,0,208,7,
        1,0,0,0,209,210,5,2,0,0,210,211,5,59,0,0,211,213,5,79,0,0,212,214,
        3,100,50,0,213,212,1,0,0,0,213,214,1,0,0,0,214,215,1,0,0,0,215,216,
        3,54,27,0,216,217,5,3,0,0,217,9,1,0,0,0,218,219,5,2,0,0,219,220,
        5,60,0,0,220,222,5,79,0,0,221,223,3,100,50,0,222,221,1,0,0,0,222,
        223,1,0,0,0,223,225,1,0,0,0,224,226,3,12,6,0,225,224,1,0,0,0,225,
        226,1,0,0,0,226,227,1,0,0,0,227,228,3,70,35,0,228,229,5,3,0,0,229,
        11,1,0,0,0,230,231,5,2,0,0,231,233,5,57,0,0,232,234,3,54,27,0,233,
        232,1,0,0,0,234,235,1,0,0,0,235,233,1,0,0,0,235,236,1,0,0,0,236,
        237,1,0,0,0,237,238,5,3,0,0,238,13,1,0,0,0,239,257,3,16,8,0,240,
        257,3,18,9,0,241,257,3,20,10,0,242,257,3,22,11,0,243,257,3,24,12,
        0,244,257,3,26,13,0,245,257,3,28,14,0,246,257,3,30,15,0,247,257,
        3,32,16,0,248,257,3,34,17,0,249,257,3,36,18,0,250,257,3,110,55,0,
        251,257,3,116,58,0,252,257,3,118,59,0,253,257,3,120,60,0,254,257,
        3,108,54,0,255,257,3,122,61,0,256,239,1,0,0,0,256,240,1,0,0,0,256,
        241,1,0,0,0,256,242,1,0,0,0,256,243,1,0,0,0,256,244,1,0,0,0,256,
        245,1,0,0,0,256,246,1,0,0,0,256,247,1,0,0,0,256,248,1,0,0,0,256,
        249,1,0,0,0,256,250,1,0,0,0,256,251,1,0,0,0,256,252,1,0,0,0,256,
        253,1,0,0,0,256,254,1,0,0,0,256,255,1,0,0,0,257,15,1,0,0,0,258,259,
        5,2,0,0,259,260,5,6,0,0,260,264,5,2,0,0,261,263,3,50,25,0,262,261,
        1,0,0,0,263,266,1,0,0,0,264,262,1,0,0,0,264,265,1,0,0,0,265,267,
        1,0,0,0,266,264,1,0,0,0,267,271,5,3,0,0,268,270,3,14,7,0,269,268,
        1,0,0,0,270,273,1,0,0,0,271,269,1,0,0,0,271,272,1,0,0,0,272,274,
        1,0,0,0,273,271,1,0,0,0,274,275,5,3,0,0,275,17,1,0,0,0,276,277,5,
        2,0,0,277,278,5,7,0,0,278,279,3,52,26,0,279,280,3,122,61,0,280,281,
        5,3,0,0,281,19,1,0,0,0,282,283,5,2,0,0,283,284,5,8,0,0,284,288,5,
        2,0,0,285,287,3,50,25,0,286,285,1,0,0,0,287,290,1,0,0,0,288,286,
        1,0,0,0,288,289,1,0,0,0,289,291,1,0,0,0,290,288,1,0,0,0,291,295,
        5,3,0,0,292,294,3,14,7,0,293,292,1,0,0,0,294,297,1,0,0,0,295,293,
        1,0,0,0,295,296,1,0,0,0,296,298,1,0,0,0,297,295,1,0,0,0,298,299,
        5,3,0,0,299,21,1,0,0,0,300,301,5,2,0,0,301,302,5,9,0,0,302,303,3,
        52,26,0,303,304,3,122,61,0,304,305,5,3,0,0,305,23,1,0,0,0,306,307,
        5,2,0,0,307,308,5,17,0,0,308,309,3,122,61,0,309,311,3,14,7,0,310,
        312,3,14,7,0,311,310,1,0,0,0,311,312,1,0,0,0,312,313,1,0,0,0,313,
        314,5,3,0,0,314,25,1,0,0,0,315,316,5,2,0,0,316,317,5,18,0,0,317,
        321,3,122,61,0,318,320,3,14,7,0,319,318,1,0,0,0,320,323,1,0,0,0,
        321,319,1,0,0,0,321,322,1,0,0,0,322,324,1,0,0,0,323,321,1,0,0,0,
        324,325,5,3,0,0,325,27,1,0,0,0,326,327,5,2,0,0,327,331,5,19,0,0,
        328,330,3,14,7,0,329,328,1,0,0,0,330,333,1,0,0,0,331,329,1,0,0,0,
        331,332,1,0,0,0,332,334,1,0,0,0,333,331,1,0,0,0,334,335,5,3,0,0,
        335,29,1,0,0,0,336,337,5,2,0,0,337,339,5,20,0,0,338,340,3,122,61,
        0,339,338,1,0,0,0,339,340,1,0,0,0,340,341,1,0,0,0,341,342,5,3,0,
        0,342,31,1,0,0,0,343,344,5,2,0,0,344,345,5,21,0,0,345,346,3,122,
        61,0,346,347,5,3,0,0,347,33,1,0,0,0,348,349,5,2,0,0,349,351,5,36,
        0,0,350,352,3,140,70,0,351,350,1,0,0,0,351,352,1,0,0,0,352,353,1,
        0,0,0,353,354,5,76,0,0,354,355,5,3,0,0,355,35,1,0,0,0,356,362,3,
        38,19,0,357,362,3,40,20,0,358,362,3,42,21,0,359,362,3,46,23,0,360,
        362,3,48,24,0,361,356,1,0,0,0,361,357,1,0,0,0,361,358,1,0,0,0,361,
        359,1,0,0,0,361,360,1,0,0,0,362,37,1,0,0,0,363,364,5,2,0,0,364,365,
        5,69,0,0,365,366,5,79,0,0,366,367,3,122,61,0,367,368,5,3,0,0,368,
        39,1,0,0,0,369,370,5,2,0,0,370,371,5,70,0,0,371,372,3,122,61,0,372,
        373,5,3,0,0,373,41,1,0,0,0,374,375,5,2,0,0,375,377,5,71,0,0,376,
        378,3,44,22,0,377,376,1,0,0,0,378,379,1,0,0,0,379,377,1,0,0,0,379,
        380,1,0,0,0,380,381,1,0,0,0,381,382,5,3,0,0,382,43,1,0,0,0,383,384,
        5,2,0,0,384,386,5,79,0,0,385,387,5,79,0,0,386,385,1,0,0,0,386,387,
        1,0,0,0,387,388,1,0,0,0,388,389,5,3,0,0,389,45,1,0,0,0,390,391,5,
        2,0,0,391,392,5,72,0,0,392,394,5,76,0,0,393,395,3,44,22,0,394,393,
        1,0,0,0,395,396,1,0,0,0,396,394,1,0,0,0,396,397,1,0,0,0,397,398,
        1,0,0,0,398,399,5,3,0,0,399,47,1,0,0,0,400,401,5,2,0,0,401,402,5,
        73,0,0,402,403,5,76,0,0,403,404,5,3,0,0,404,49,1,0,0,0,405,406,5,
        2,0,0,406,409,5,79,0,0,407,408,5,66,0,0,408,410,3,54,27,0,409,407,
        1,0,0,0,409,410,1,0,0,0,410,411,1,0,0,0,411,412,3,122,61,0,412,413,
        5,3,0,0,413,51,1,0,0,0,414,415,5,2,0,0,415,418,5,79,0,0,416,417,
        5,66,0,0,417,419,3,54,27,0,418,416,1,0,0,0,418,419,1,0,0,0,419,420,
        1,0,0,0,420,421,5,3,0,0,421,53,1,0,0,0,422,439,5,79,0,0,423,439,
        3,56,28,0,424,439,3,58,29,0,425,439,3,60,30,0,426,439,3,62,31,0,
        427,439,3,66,33,0,428,439,3,70,35,0,429,439,3,76,38,0,430,439,3,
        78,39,0,431,439,3,80,40,0,432,439,3,82,41,0,433,439,3,84,42,0,434,
        439,3,86,43,0,435,439,3,88,44,0,436,439,3,94,47,0,437,439,3,98,49,
        0,438,422,1,0,0,0,438,423,1,0,0,0,438,424,1,0,0,0,438,425,1,0,0,
        0,438,426,1,0,0,0,438,427,1,0,0,0,438,428,1,0,0,0,438,429,1,0,0,
        0,438,430,1,0,0,0,438,431,1,0,0,0,438,432,1,0,0,0,438,433,1,0,0,
        0,438,434,1,0,0,0,438,435,1,0,0,0,438,436,1,0,0,0,438,437,1,0,0,
        0,439,55,1,0,0,0,440,441,5,2,0,0,441,442,5,43,0,0,442,444,3,54,27,
        0,443,445,3,54,27,0,444,443,1,0,0,0,445,446,1,0,0,0,446,444,1,0,
        0,0,446,447,1,0,0,0,447,448,1,0,0,0,448,449,5,3,0,0,449,57,1,0,0,
        0,450,451,5,2,0,0,451,452,5,44,0,0,452,454,3,54,27,0,453,455,3,54,
        27,0,454,453,1,0,0,0,455,456,1,0,0,0,456,454,1,0,0,0,456,457,1,0,
        0,0,457,458,1,0,0,0,458,459,5,3,0,0,459,59,1,0,0,0,460,461,5,2,0,
        0,461,462,5,26,0,0,462,463,3,54,27,0,463,464,5,3,0,0,464,61,1,0,
        0,0,465,466,5,2,0,0,466,468,5,45,0,0,467,469,3,64,32,0,468,467,1,
        0,0,0,469,470,1,0,0,0,470,468,1,0,0,0,470,471,1,0,0,0,471,472,1,
        0,0,0,472,473,5,3,0,0,473,63,1,0,0,0,474,475,5,2,0,0,475,476,5,53,
        0,0,476,477,3,54,27,0,477,478,5,3,0,0,478,486,1,0,0,0,479,480,5,
        2,0,0,480,481,5,79,0,0,481,482,3,54,27,0,482,483,5,3,0,0,483,486,
        1,0,0,0,484,486,3,54,27,0,485,474,1,0,0,0,485,479,1,0,0,0,485,484,
        1,0,0,0,486,65,1,0,0,0,487,488,5,2,0,0,488,490,5,46,0,0,489,491,
        3,100,50,0,490,489,1,0,0,0,490,491,1,0,0,0,491,492,1,0,0,0,492,496,
        5,2,0,0,493,495,3,68,34,0,494,493,1,0,0,0,495,498,1,0,0,0,496,494,
        1,0,0,0,496,497,1,0,0,0,497,499,1,0,0,0,498,496,1,0,0,0,499,500,
        5,3,0,0,500,501,3,54,27,0,501,502,5,3,0,0,502,67,1,0,0,0,503,504,
        5,2,0,0,504,506,5,79,0,0,505,507,5,62,0,0,506,505,1,0,0,0,506,507,
        1,0,0,0,507,508,1,0,0,0,508,509,3,54,27,0,509,510,5,3,0,0,510,69,
        1,0,0,0,511,512,5,2,0,0,512,516,5,79,0,0,513,515,3,72,36,0,514,513,
        1,0,0,0,515,518,1,0,0,0,516,514,1,0,0,0,516,517,1,0,0,0,517,519,
        1,0,0,0,518,516,1,0,0,0,519,520,5,3,0,0,520,71,1,0,0,0,521,525,5,
        2,0,0,522,524,3,74,37,0,523,522,1,0,0,0,524,527,1,0,0,0,525,523,
        1,0,0,0,525,526,1,0,0,0,526,528,1,0,0,0,527,525,1,0,0,0,528,530,
        5,79,0,0,529,531,5,62,0,0,530,529,1,0,0,0,530,531,1,0,0,0,531,532,
        1,0,0,0,532,533,3,54,27,0,533,534,5,3,0,0,534,73,1,0,0,0,535,536,
        5,54,0,0,536,75,1,0,0,0,537,538,5,2,0,0,538,539,5,47,0,0,539,540,
        7,0,0,0,540,541,5,3,0,0,541,77,1,0,0,0,542,543,5,2,0,0,543,544,5,
        48,0,0,544,545,3,54,27,0,545,546,5,3,0,0,546,79,1,0,0,0,547,548,
        5,2,0,0,548,549,5,49,0,0,549,550,5,79,0,0,550,551,5,3,0,0,551,81,
        1,0,0,0,552,553,5,2,0,0,553,554,5,29,0,0,554,555,3,54,27,0,555,556,
        3,54,27,0,556,557,5,3,0,0,557,83,1,0,0,0,558,559,5,2,0,0,559,560,
        5,24,0,0,560,561,3,54,27,0,561,562,3,54,27,0,562,563,3,54,27,0,563,
        564,3,54,27,0,564,565,5,3,0,0,565,85,1,0,0,0,566,567,5,2,0,0,567,
        568,5,50,0,0,568,569,5,79,0,0,569,570,5,3,0,0,570,87,1,0,0,0,571,
        572,5,2,0,0,572,573,5,51,0,0,573,574,5,79,0,0,574,576,3,54,27,0,
        575,577,3,90,45,0,576,575,1,0,0,0,576,577,1,0,0,0,577,578,1,0,0,
        0,578,579,3,54,27,0,579,580,5,3,0,0,580,89,1,0,0,0,581,582,5,2,0,
        0,582,584,5,61,0,0,583,585,3,92,46,0,584,583,1,0,0,0,585,586,1,0,
        0,0,586,584,1,0,0,0,586,587,1,0,0,0,587,588,1,0,0,0,588,589,5,3,
        0,0,589,91,1,0,0,0,590,591,7,1,0,0,591,93,1,0,0,0,592,593,5,2,0,
        0,593,595,5,52,0,0,594,596,3,96,48,0,595,594,1,0,0,0,596,597,1,0,
        0,0,597,595,1,0,0,0,597,598,1,0,0,0,598,599,1,0,0,0,599,600,5,3,
        0,0,600,95,1,0,0,0,601,604,5,76,0,0,602,604,3,54,27,0,603,601,1,
        0,0,0,603,602,1,0,0,0,604,97,1,0,0,0,605,606,5,2,0,0,606,608,3,54,
        27,0,607,609,3,54,27,0,608,607,1,0,0,0,609,610,1,0,0,0,610,608,1,
        0,0,0,610,611,1,0,0,0,611,612,1,0,0,0,612,613,5,3,0,0,613,99,1,0,
        0,0,614,615,5,2,0,0,615,617,5,55,0,0,616,618,3,102,51,0,617,616,
        1,0,0,0,618,619,1,0,0,0,619,617,1,0,0,0,619,620,1,0,0,0,620,621,
        1,0,0,0,621,622,5,3,0,0,622,101,1,0,0,0,623,634,5,79,0,0,624,625,
        5,2,0,0,625,627,5,79,0,0,626,628,3,104,52,0,627,626,1,0,0,0,627,
        628,1,0,0,0,628,630,1,0,0,0,629,631,3,106,53,0,630,629,1,0,0,0,630,
        631,1,0,0,0,631,632,1,0,0,0,632,634,5,3,0,0,633,623,1,0,0,0,633,
        624,1,0,0,0,634,103,1,0,0,0,635,636,5,2,0,0,636,637,5,57,0,0,637,
        638,3,54,27,0,638,639,5,3,0,0,639,105,1,0,0,0,640,641,5,2,0,0,641,
        642,5,39,0,0,642,643,3,54,27,0,643,644,5,3,0,0,644,107,1,0,0,0,645,
        646,5,2,0,0,646,647,5,22,0,0,647,648,5,79,0,0,648,649,3,122,61,0,
        649,650,5,3,0,0,650,658,1,0,0,0,651,652,5,2,0,0,652,653,5,22,0,0,
        653,654,3,150,75,0,654,655,3,122,61,0,655,656,5,3,0,0,656,658,1,
        0,0,0,657,645,1,0,0,0,657,651,1,0,0,0,658,109,1,0,0,0,659,660,5,
        2,0,0,660,661,5,37,0,0,661,665,3,122,61,0,662,664,3,112,56,0,663,
        662,1,0,0,0,664,667,1,0,0,0,665,663,1,0,0,0,665,666,1,0,0,0,666,
        669,1,0,0,0,667,665,1,0,0,0,668,670,3,114,57,0,669,668,1,0,0,0,669,
        670,1,0,0,0,670,671,1,0,0,0,671,672,5,3,0,0,672,111,1,0,0,0,673,
        674,5,2,0,0,674,675,5,38,0,0,675,679,3,122,61,0,676,678,3,14,7,0,
        677,676,1,0,0,0,678,681,1,0,0,0,679,677,1,0,0,0,679,680,1,0,0,0,
        680,682,1,0,0,0,681,679,1,0,0,0,682,683,5,3,0,0,683,113,1,0,0,0,
        684,685,5,2,0,0,685,689,5,39,0,0,686,688,3,14,7,0,687,686,1,0,0,
        0,688,691,1,0,0,0,689,687,1,0,0,0,689,690,1,0,0,0,690,692,1,0,0,
        0,691,689,1,0,0,0,692,693,5,3,0,0,693,115,1,0,0,0,694,695,5,2,0,
        0,695,696,5,42,0,0,696,697,3,18,9,0,697,698,3,122,61,0,698,702,3,
        108,54,0,699,701,3,14,7,0,700,699,1,0,0,0,701,704,1,0,0,0,702,700,
        1,0,0,0,702,703,1,0,0,0,703,705,1,0,0,0,704,702,1,0,0,0,705,706,
        5,3,0,0,706,117,1,0,0,0,707,708,5,2,0,0,708,709,5,40,0,0,709,710,
        5,79,0,0,710,714,3,122,61,0,711,713,3,14,7,0,712,711,1,0,0,0,713,
        716,1,0,0,0,714,712,1,0,0,0,714,715,1,0,0,0,715,717,1,0,0,0,716,
        714,1,0,0,0,717,718,5,3,0,0,718,119,1,0,0,0,719,720,5,2,0,0,720,
        721,5,41,0,0,721,722,5,79,0,0,722,726,3,122,61,0,723,725,3,14,7,
        0,724,723,1,0,0,0,725,728,1,0,0,0,726,724,1,0,0,0,726,727,1,0,0,
        0,727,729,1,0,0,0,728,726,1,0,0,0,729,730,5,3,0,0,730,121,1,0,0,
        0,731,753,3,172,86,0,732,753,5,74,0,0,733,753,5,79,0,0,734,753,3,
        126,63,0,735,753,3,128,64,0,736,753,3,130,65,0,737,753,3,132,66,
        0,738,753,3,140,70,0,739,753,3,146,73,0,740,753,3,150,75,0,741,753,
        3,152,76,0,742,753,3,154,77,0,743,753,3,156,78,0,744,753,3,158,79,
        0,745,753,3,134,67,0,746,753,3,136,68,0,747,753,3,138,69,0,748,753,
        3,160,80,0,749,753,3,162,81,0,750,753,3,124,62,0,751,753,3,164,82,
        0,752,731,1,0,0,0,752,732,1,0,0,0,752,733,1,0,0,0,752,734,1,0,0,
        0,752,735,1,0,0,0,752,736,1,0,0,0,752,737,1,0,0,0,752,738,1,0,0,
        0,752,739,1,0,0,0,752,740,1,0,0,0,752,741,1,0,0,0,752,742,1,0,0,
        0,752,743,1,0,0,0,752,744,1,0,0,0,752,745,1,0,0,0,752,746,1,0,0,
        0,752,747,1,0,0,0,752,748,1,0,0,0,752,749,1,0,0,0,752,750,1,0,0,
        0,752,751,1,0,0,0,753,123,1,0,0,0,754,755,5,2,0,0,755,756,5,49,0,
        0,756,757,3,122,61,0,757,758,5,3,0,0,758,125,1,0,0,0,759,760,5,2,
        0,0,760,761,5,10,0,0,761,765,3,168,84,0,762,764,3,14,7,0,763,762,
        1,0,0,0,764,767,1,0,0,0,765,763,1,0,0,0,765,766,1,0,0,0,766,768,
        1,0,0,0,767,765,1,0,0,0,768,769,5,3,0,0,769,127,1,0,0,0,770,771,
        5,2,0,0,771,772,5,11,0,0,772,776,3,168,84,0,773,775,3,14,7,0,774,
        773,1,0,0,0,775,778,1,0,0,0,776,774,1,0,0,0,776,777,1,0,0,0,777,
        779,1,0,0,0,778,776,1,0,0,0,779,780,5,3,0,0,780,129,1,0,0,0,781,
        782,5,2,0,0,782,783,5,13,0,0,783,784,3,122,61,0,784,788,3,122,61,
        0,785,787,3,122,61,0,786,785,1,0,0,0,787,790,1,0,0,0,788,786,1,0,
        0,0,788,789,1,0,0,0,789,791,1,0,0,0,790,788,1,0,0,0,791,792,5,3,
        0,0,792,131,1,0,0,0,793,794,5,2,0,0,794,795,5,14,0,0,795,796,3,122,
        61,0,796,800,3,122,61,0,797,799,3,122,61,0,798,797,1,0,0,0,799,802,
        1,0,0,0,800,798,1,0,0,0,800,801,1,0,0,0,801,803,1,0,0,0,802,800,
        1,0,0,0,803,804,5,3,0,0,804,133,1,0,0,0,805,806,5,2,0,0,806,807,
        5,23,0,0,807,808,3,122,61,0,808,809,3,122,61,0,809,810,3,122,61,
        0,810,811,5,3,0,0,811,135,1,0,0,0,812,813,5,2,0,0,813,817,5,24,0,
        0,814,815,3,122,61,0,815,816,3,122,61,0,816,818,1,0,0,0,817,814,
        1,0,0,0,818,819,1,0,0,0,819,817,1,0,0,0,819,820,1,0,0,0,820,821,
        1,0,0,0,821,822,5,3,0,0,822,137,1,0,0,0,823,824,5,2,0,0,824,825,
        5,35,0,0,825,827,5,79,0,0,826,828,3,166,83,0,827,826,1,0,0,0,827,
        828,1,0,0,0,828,832,1,0,0,0,829,831,3,122,61,0,830,829,1,0,0,0,831,
        834,1,0,0,0,832,830,1,0,0,0,832,833,1,0,0,0,833,835,1,0,0,0,834,
        832,1,0,0,0,835,836,5,3,0,0,836,139,1,0,0,0,837,838,5,2,0,0,838,
        842,5,25,0,0,839,841,3,142,71,0,840,839,1,0,0,0,841,844,1,0,0,0,
        842,840,1,0,0,0,842,843,1,0,0,0,843,845,1,0,0,0,844,842,1,0,0,0,
        845,846,5,3,0,0,846,141,1,0,0,0,847,848,5,2,0,0,848,849,3,148,74,
        0,849,850,3,122,61,0,850,851,5,3,0,0,851,861,1,0,0,0,852,853,5,2,
        0,0,853,854,3,148,74,0,854,855,3,144,72,0,855,856,5,3,0,0,856,861,
        1,0,0,0,857,858,5,2,0,0,858,859,5,79,0,0,859,861,5,3,0,0,860,847,
        1,0,0,0,860,852,1,0,0,0,860,857,1,0,0,0,861,143,1,0,0,0,862,863,
        5,2,0,0,863,864,5,12,0,0,864,868,3,168,84,0,865,867,3,14,7,0,866,
        865,1,0,0,0,867,870,1,0,0,0,868,866,1,0,0,0,868,869,1,0,0,0,869,
        871,1,0,0,0,870,868,1,0,0,0,871,872,5,3,0,0,872,145,1,0,0,0,873,
        874,5,2,0,0,874,878,5,26,0,0,875,877,3,122,61,0,876,875,1,0,0,0,
        877,880,1,0,0,0,878,876,1,0,0,0,878,879,1,0,0,0,879,881,1,0,0,0,
        880,878,1,0,0,0,881,882,5,3,0,0,882,147,1,0,0,0,883,884,7,2,0,0,
        884,149,1,0,0,0,885,886,5,2,0,0,886,887,5,28,0,0,887,888,3,122,61,
        0,888,889,3,148,74,0,889,890,5,3,0,0,890,151,1,0,0,0,891,892,5,2,
        0,0,892,893,5,29,0,0,893,894,3,122,61,0,894,895,3,122,61,0,895,896,
        5,3,0,0,896,153,1,0,0,0,897,898,5,2,0,0,898,899,7,3,0,0,899,900,
        3,122,61,0,900,901,5,3,0,0,901,155,1,0,0,0,902,903,5,2,0,0,903,904,
        5,34,0,0,904,905,3,122,61,0,905,906,5,3,0,0,906,157,1,0,0,0,907,
        908,5,2,0,0,908,909,5,33,0,0,909,910,3,122,61,0,910,911,5,3,0,0,
        911,159,1,0,0,0,912,913,5,2,0,0,913,914,5,27,0,0,914,915,3,122,61,
        0,915,916,3,148,74,0,916,917,5,3,0,0,917,161,1,0,0,0,918,919,5,2,
        0,0,919,920,5,30,0,0,920,921,3,122,61,0,921,922,3,122,61,0,922,923,
        5,3,0,0,923,163,1,0,0,0,924,925,5,2,0,0,925,927,3,122,61,0,926,928,
        3,166,83,0,927,926,1,0,0,0,927,928,1,0,0,0,928,932,1,0,0,0,929,931,
        3,122,61,0,930,929,1,0,0,0,931,934,1,0,0,0,932,930,1,0,0,0,932,933,
        1,0,0,0,933,935,1,0,0,0,934,932,1,0,0,0,935,936,5,3,0,0,936,165,
        1,0,0,0,937,938,5,2,0,0,938,940,5,56,0,0,939,941,3,54,27,0,940,939,
        1,0,0,0,941,942,1,0,0,0,942,940,1,0,0,0,942,943,1,0,0,0,943,944,
        1,0,0,0,944,945,5,3,0,0,945,167,1,0,0,0,946,957,5,2,0,0,947,954,
        3,170,85,0,948,950,5,4,0,0,949,948,1,0,0,0,949,950,1,0,0,0,950,951,
        1,0,0,0,951,953,3,170,85,0,952,949,1,0,0,0,953,956,1,0,0,0,954,952,
        1,0,0,0,954,955,1,0,0,0,955,958,1,0,0,0,956,954,1,0,0,0,957,947,
        1,0,0,0,957,958,1,0,0,0,958,959,1,0,0,0,959,960,5,3,0,0,960,169,
        1,0,0,0,961,962,5,2,0,0,962,963,5,79,0,0,963,964,5,3,0,0,964,171,
        1,0,0,0,965,966,7,4,0,0,966,173,1,0,0,0,69,179,189,198,213,222,225,
        235,256,264,271,288,295,311,321,331,339,351,361,379,386,396,409,
        418,438,446,456,470,485,490,496,506,516,525,530,576,586,597,603,
        610,619,627,630,633,657,665,669,679,689,702,714,726,752,765,776,
        788,800,819,827,832,842,860,868,878,927,932,942,949,954,957
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
    public methodDef(): MethodDefContext | null {
        return this.getRuleContext(0, MethodDefContext);
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


export class MethodDefContext extends antlr.ParserRuleContext {
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
        return Stage3DParser.RULE_methodDef;
    }
    public override enterRule(listener: Stage3DListener): void {
        if(listener.enterMethodDef) {
             listener.enterMethodDef(this);
        }
    }
    public override exitRule(listener: Stage3DListener): void {
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
