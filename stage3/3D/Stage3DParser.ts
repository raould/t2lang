
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
    public static readonly DEF = 11;
    public static readonly DEFMACRO = 12;
    public static readonly IF = 13;
    public static readonly WHILE = 14;
    public static readonly BEGIN = 15;
    public static readonly RETURN = 16;
    public static readonly THROW = 17;
    public static readonly SET = 18;
    public static readonly TERNARY = 19;
    public static readonly COND = 20;
    public static readonly OBJECT = 21;
    public static readonly ARRAY = 22;
    public static readonly OPTCHAIN = 23;
    public static readonly DOT = 24;
    public static readonly INDEX = 25;
    public static readonly NULLCOAL = 26;
    public static readonly QUASI = 27;
    public static readonly QUOTE = 28;
    public static readonly UNQUOTE_SPLICING = 29;
    public static readonly UNQUOTE = 30;
    public static readonly NEW = 31;
    public static readonly IMPORT = 32;
    public static readonly SWITCH = 33;
    public static readonly CASE = 34;
    public static readonly DEFAULT = 35;
    public static readonly FORIN = 36;
    public static readonly FOROF = 37;
    public static readonly FOR = 38;
    public static readonly UNION = 39;
    public static readonly INTERSECT = 40;
    public static readonly TUPLE = 41;
    public static readonly FN = 42;
    public static readonly LIT = 43;
    public static readonly KEYOF = 44;
    public static readonly TYPEOF = 45;
    public static readonly INFER = 46;
    public static readonly MAPPED = 47;
    public static readonly TEMPLATE = 48;
    public static readonly REST = 49;
    public static readonly READONLY = 50;
    public static readonly TYPE_PARAMS = 51;
    public static readonly TYPE_ARGS = 52;
    public static readonly EXTENDS = 53;
    public static readonly RETURNS = 54;
    public static readonly TYPE = 55;
    public static readonly INTERFACE = 56;
    public static readonly MODIFIERS = 57;
    public static readonly OPTIONAL = 58;
    public static readonly BOOLEAN = 59;
    public static readonly NULL = 60;
    public static readonly UNDEFINED = 61;
    public static readonly COLON = 62;
    public static readonly LBRACK = 63;
    public static readonly RBRACK = 64;
    public static readonly KEYWORD = 65;
    public static readonly NUMBER = 66;
    public static readonly STRING = 67;
    public static readonly MULTILINE_STRING = 68;
    public static readonly IDENTIFIER = 69;
    public static readonly WS = 70;
    public static readonly RULE_program = 0;
    public static readonly RULE_topLevel = 1;
    public static readonly RULE_defmacro = 2;
    public static readonly RULE_def = 3;
    public static readonly RULE_statement = 4;
    public static readonly RULE_letStar = 5;
    public static readonly RULE_letStmt = 6;
    public static readonly RULE_constStar = 7;
    public static readonly RULE_constStmt = 8;
    public static readonly RULE_ifForm = 9;
    public static readonly RULE_whileForm = 10;
    public static readonly RULE_block = 11;
    public static readonly RULE_returnForm = 12;
    public static readonly RULE_throwForm = 13;
    public static readonly RULE_importForm = 14;
    public static readonly RULE_starBinding = 15;
    public static readonly RULE_singleBinding = 16;
    public static readonly RULE_typeExpr = 17;
    public static readonly RULE_typeUnion = 18;
    public static readonly RULE_typeIntersection = 19;
    public static readonly RULE_typeArray = 20;
    public static readonly RULE_typeTuple = 21;
    public static readonly RULE_typeTupleElement = 22;
    public static readonly RULE_typeFunction = 23;
    public static readonly RULE_typeFnParam = 24;
    public static readonly RULE_typeObject = 25;
    public static readonly RULE_typeProp = 26;
    public static readonly RULE_propModifier = 27;
    public static readonly RULE_typeLiteral = 28;
    public static readonly RULE_typeKeyof = 29;
    public static readonly RULE_typeTypeof = 30;
    public static readonly RULE_typeIndexAccess = 31;
    public static readonly RULE_typeConditional = 32;
    public static readonly RULE_typeInfer = 33;
    public static readonly RULE_typeMapped = 34;
    public static readonly RULE_mappedModifiers = 35;
    public static readonly RULE_mappedModifier = 36;
    public static readonly RULE_typeTemplateLiteral = 37;
    public static readonly RULE_templatePart = 38;
    public static readonly RULE_typeApplication = 39;
    public static readonly RULE_typeParams = 40;
    public static readonly RULE_typeParamDecl = 41;
    public static readonly RULE_typeParamConstraint = 42;
    public static readonly RULE_typeParamDefault = 43;
    public static readonly RULE_assign = 44;
    public static readonly RULE_switchForm = 45;
    public static readonly RULE_caseClause = 46;
    public static readonly RULE_defaultClause = 47;
    public static readonly RULE_forForm = 48;
    public static readonly RULE_forInForm = 49;
    public static readonly RULE_forOfForm = 50;
    public static readonly RULE_expression = 51;
    public static readonly RULE_lambda = 52;
    public static readonly RULE_ternary = 53;
    public static readonly RULE_condExpr = 54;
    public static readonly RULE_newForm = 55;
    public static readonly RULE_objectExpr = 56;
    public static readonly RULE_objectField = 57;
    public static readonly RULE_arrayExpr = 58;
    public static readonly RULE_propAccess = 59;
    public static readonly RULE_indexAccess = 60;
    public static readonly RULE_quasiquote = 61;
    public static readonly RULE_unquote = 62;
    public static readonly RULE_unquoteSplicing = 63;
    public static readonly RULE_optChain = 64;
    public static readonly RULE_nullCoalesce = 65;
    public static readonly RULE_call = 66;
    public static readonly RULE_fnSignature = 67;
    public static readonly RULE_param = 68;
    public static readonly RULE_literal = 69;

    public static readonly literalNames = [
        null, null, "'('", "')'", "','", "'program'", "'let*'", "'let'", 
        "'const*'", "'const'", "'lambda'", "'def'", "'defmacro'", "'if'", 
        "'while'", "'begin'", "'return'", "'throw'", "'set!'", "'ternary'", 
        "'cond'", "'object'", "'array'", "'.?'", "'.'", "'index'", "'??'", 
        "'quasi'", "'quote'", "'unquote-splicing'", "'unquote'", "'new'", 
        "'import'", "'switch'", "'case'", "'default'", "'for-in'", "'for-of'", 
        "'for'", "'union'", "'intersect'", "'tuple'", "'fn'", "'lit'", "'keyof'", 
        "'typeof'", "'infer'", "'mapped'", "'template'", "'rest'", "'readonly'", 
        "'type-params'", "'type-args'", "'extends'", "'returns'", "'type'", 
        "'interface'", "'modifiers'", "'?'", null, "'null'", "'undefined'", 
        "':'", "'['", "']'"
    ];

    public static readonly symbolicNames = [
        null, "COMMENT", "LPAREN", "RPAREN", "COMMA", "PROGRAM", "LETSTAR", 
        "LET", "CONSTSTAR", "CONST", "LAMBDA", "DEF", "DEFMACRO", "IF", 
        "WHILE", "BEGIN", "RETURN", "THROW", "SET", "TERNARY", "COND", "OBJECT", 
        "ARRAY", "OPTCHAIN", "DOT", "INDEX", "NULLCOAL", "QUASI", "QUOTE", 
        "UNQUOTE_SPLICING", "UNQUOTE", "NEW", "IMPORT", "SWITCH", "CASE", 
        "DEFAULT", "FORIN", "FOROF", "FOR", "UNION", "INTERSECT", "TUPLE", 
        "FN", "LIT", "KEYOF", "TYPEOF", "INFER", "MAPPED", "TEMPLATE", "REST", 
        "READONLY", "TYPE_PARAMS", "TYPE_ARGS", "EXTENDS", "RETURNS", "TYPE", 
        "INTERFACE", "MODIFIERS", "OPTIONAL", "BOOLEAN", "NULL", "UNDEFINED", 
        "COLON", "LBRACK", "RBRACK", "KEYWORD", "NUMBER", "STRING", "MULTILINE_STRING", 
        "IDENTIFIER", "WS"
    ];
    public static readonly ruleNames = [
        "program", "topLevel", "defmacro", "def", "statement", "letStar", 
        "letStmt", "constStar", "constStmt", "ifForm", "whileForm", "block", 
        "returnForm", "throwForm", "importForm", "starBinding", "singleBinding", 
        "typeExpr", "typeUnion", "typeIntersection", "typeArray", "typeTuple", 
        "typeTupleElement", "typeFunction", "typeFnParam", "typeObject", 
        "typeProp", "propModifier", "typeLiteral", "typeKeyof", "typeTypeof", 
        "typeIndexAccess", "typeConditional", "typeInfer", "typeMapped", 
        "mappedModifiers", "mappedModifier", "typeTemplateLiteral", "templatePart", 
        "typeApplication", "typeParams", "typeParamDecl", "typeParamConstraint", 
        "typeParamDefault", "assign", "switchForm", "caseClause", "defaultClause", 
        "forForm", "forInForm", "forOfForm", "expression", "lambda", "ternary", 
        "condExpr", "newForm", "objectExpr", "objectField", "arrayExpr", 
        "propAccess", "indexAccess", "quasiquote", "unquote", "unquoteSplicing", 
        "optChain", "nullCoalesce", "call", "fnSignature", "param", "literal",
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
            this.state = 140;
            this.match(Stage3DParser.LPAREN);
            this.state = 141;
            this.match(Stage3DParser.PROGRAM);
            this.state = 145;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 59)) & ~0x1F) === 0 && ((1 << (_la - 59)) & 1479) !== 0)) {
                {
                {
                this.state = 142;
                this.topLevel();
                }
                }
                this.state = 147;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 148;
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
            this.state = 153;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 1, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 150;
                this.defmacro();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 151;
                this.def();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 152;
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
            this.state = 155;
            this.match(Stage3DParser.LPAREN);
            this.state = 156;
            this.match(Stage3DParser.DEFMACRO);
            this.state = 157;
            this.match(Stage3DParser.IDENTIFIER);
            this.state = 158;
            this.fnSignature();
            this.state = 162;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 59)) & ~0x1F) === 0 && ((1 << (_la - 59)) & 1479) !== 0)) {
                {
                {
                this.state = 159;
                this.statement();
                }
                }
                this.state = 164;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 165;
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
            this.state = 167;
            this.match(Stage3DParser.LPAREN);
            this.state = 168;
            this.match(Stage3DParser.DEF);
            this.state = 169;
            this.match(Stage3DParser.IDENTIFIER);
            this.state = 170;
            this.expression();
            this.state = 171;
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
        this.enterRule(localContext, 8, Stage3DParser.RULE_statement);
        try {
            this.state = 189;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 3, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 173;
                this.letStar();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 174;
                this.letStmt();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 175;
                this.constStar();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 176;
                this.constStmt();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 177;
                this.ifForm();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 178;
                this.whileForm();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 179;
                this.block();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 180;
                this.returnForm();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 181;
                this.throwForm();
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 182;
                this.importForm();
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 183;
                this.switchForm();
                }
                break;
            case 12:
                this.enterOuterAlt(localContext, 12);
                {
                this.state = 184;
                this.forForm();
                }
                break;
            case 13:
                this.enterOuterAlt(localContext, 13);
                {
                this.state = 185;
                this.forInForm();
                }
                break;
            case 14:
                this.enterOuterAlt(localContext, 14);
                {
                this.state = 186;
                this.forOfForm();
                }
                break;
            case 15:
                this.enterOuterAlt(localContext, 15);
                {
                this.state = 187;
                this.assign();
                }
                break;
            case 16:
                this.enterOuterAlt(localContext, 16);
                {
                this.state = 188;
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
        this.enterRule(localContext, 10, Stage3DParser.RULE_letStar);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 191;
            this.match(Stage3DParser.LPAREN);
            this.state = 192;
            this.match(Stage3DParser.LETSTAR);
            this.state = 193;
            this.match(Stage3DParser.LPAREN);
            this.state = 197;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 194;
                this.starBinding();
                }
                }
                this.state = 199;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 200;
            this.match(Stage3DParser.RPAREN);
            this.state = 204;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 59)) & ~0x1F) === 0 && ((1 << (_la - 59)) & 1479) !== 0)) {
                {
                {
                this.state = 201;
                this.statement();
                }
                }
                this.state = 206;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
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
    public letStmt(): LetStmtContext {
        let localContext = new LetStmtContext(this.context, this.state);
        this.enterRule(localContext, 12, Stage3DParser.RULE_letStmt);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 209;
            this.match(Stage3DParser.LPAREN);
            this.state = 210;
            this.match(Stage3DParser.LET);
            this.state = 211;
            this.singleBinding();
            this.state = 212;
            this.expression();
            this.state = 213;
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
        this.enterRule(localContext, 14, Stage3DParser.RULE_constStar);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 215;
            this.match(Stage3DParser.LPAREN);
            this.state = 216;
            this.match(Stage3DParser.CONSTSTAR);
            this.state = 217;
            this.match(Stage3DParser.LPAREN);
            this.state = 221;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 218;
                this.starBinding();
                }
                }
                this.state = 223;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 224;
            this.match(Stage3DParser.RPAREN);
            this.state = 228;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 59)) & ~0x1F) === 0 && ((1 << (_la - 59)) & 1479) !== 0)) {
                {
                {
                this.state = 225;
                this.statement();
                }
                }
                this.state = 230;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 231;
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
        this.enterRule(localContext, 16, Stage3DParser.RULE_constStmt);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 233;
            this.match(Stage3DParser.LPAREN);
            this.state = 234;
            this.match(Stage3DParser.CONST);
            this.state = 235;
            this.singleBinding();
            this.state = 236;
            this.expression();
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
    public ifForm(): IfFormContext {
        let localContext = new IfFormContext(this.context, this.state);
        this.enterRule(localContext, 18, Stage3DParser.RULE_ifForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 239;
            this.match(Stage3DParser.LPAREN);
            this.state = 240;
            this.match(Stage3DParser.IF);
            this.state = 241;
            this.expression();
            this.state = 242;
            this.statement();
            this.state = 244;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2 || ((((_la - 59)) & ~0x1F) === 0 && ((1 << (_la - 59)) & 1479) !== 0)) {
                {
                this.state = 243;
                this.statement();
                }
            }

            this.state = 246;
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
        this.enterRule(localContext, 20, Stage3DParser.RULE_whileForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 248;
            this.match(Stage3DParser.LPAREN);
            this.state = 249;
            this.match(Stage3DParser.WHILE);
            this.state = 250;
            this.expression();
            this.state = 254;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 59)) & ~0x1F) === 0 && ((1 << (_la - 59)) & 1479) !== 0)) {
                {
                {
                this.state = 251;
                this.statement();
                }
                }
                this.state = 256;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 257;
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
        this.enterRule(localContext, 22, Stage3DParser.RULE_block);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 259;
            this.match(Stage3DParser.LPAREN);
            this.state = 260;
            this.match(Stage3DParser.BEGIN);
            this.state = 264;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 59)) & ~0x1F) === 0 && ((1 << (_la - 59)) & 1479) !== 0)) {
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
        this.enterRule(localContext, 24, Stage3DParser.RULE_returnForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 269;
            this.match(Stage3DParser.LPAREN);
            this.state = 270;
            this.match(Stage3DParser.RETURN);
            this.state = 272;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2 || ((((_la - 59)) & ~0x1F) === 0 && ((1 << (_la - 59)) & 1479) !== 0)) {
                {
                this.state = 271;
                this.expression();
                }
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
    public throwForm(): ThrowFormContext {
        let localContext = new ThrowFormContext(this.context, this.state);
        this.enterRule(localContext, 26, Stage3DParser.RULE_throwForm);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 276;
            this.match(Stage3DParser.LPAREN);
            this.state = 277;
            this.match(Stage3DParser.THROW);
            this.state = 278;
            this.expression();
            this.state = 279;
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
        this.enterRule(localContext, 28, Stage3DParser.RULE_importForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 281;
            this.match(Stage3DParser.LPAREN);
            this.state = 282;
            this.match(Stage3DParser.IMPORT);
            this.state = 284;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2) {
                {
                this.state = 283;
                this.objectExpr();
                }
            }

            this.state = 286;
            this.match(Stage3DParser.STRING);
            this.state = 287;
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
        this.enterRule(localContext, 30, Stage3DParser.RULE_starBinding);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 289;
            this.match(Stage3DParser.LPAREN);
            this.state = 290;
            this.match(Stage3DParser.IDENTIFIER);
            this.state = 293;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 62) {
                {
                this.state = 291;
                this.match(Stage3DParser.COLON);
                this.state = 292;
                this.typeExpr();
                }
            }

            this.state = 295;
            this.expression();
            this.state = 296;
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
        this.enterRule(localContext, 32, Stage3DParser.RULE_singleBinding);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 298;
            this.match(Stage3DParser.LPAREN);
            this.state = 299;
            this.match(Stage3DParser.IDENTIFIER);
            this.state = 302;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 62) {
                {
                this.state = 300;
                this.match(Stage3DParser.COLON);
                this.state = 301;
                this.typeExpr();
                }
            }

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
    public typeExpr(): TypeExprContext {
        let localContext = new TypeExprContext(this.context, this.state);
        this.enterRule(localContext, 34, Stage3DParser.RULE_typeExpr);
        try {
            this.state = 322;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 15, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 306;
                this.match(Stage3DParser.IDENTIFIER);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 307;
                this.typeUnion();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 308;
                this.typeIntersection();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 309;
                this.typeArray();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 310;
                this.typeTuple();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 311;
                this.typeFunction();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 312;
                this.typeObject();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 313;
                this.typeLiteral();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 314;
                this.typeKeyof();
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 315;
                this.typeTypeof();
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 316;
                this.typeIndexAccess();
                }
                break;
            case 12:
                this.enterOuterAlt(localContext, 12);
                {
                this.state = 317;
                this.typeConditional();
                }
                break;
            case 13:
                this.enterOuterAlt(localContext, 13);
                {
                this.state = 318;
                this.typeInfer();
                }
                break;
            case 14:
                this.enterOuterAlt(localContext, 14);
                {
                this.state = 319;
                this.typeMapped();
                }
                break;
            case 15:
                this.enterOuterAlt(localContext, 15);
                {
                this.state = 320;
                this.typeTemplateLiteral();
                }
                break;
            case 16:
                this.enterOuterAlt(localContext, 16);
                {
                this.state = 321;
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
        this.enterRule(localContext, 36, Stage3DParser.RULE_typeUnion);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 324;
            this.match(Stage3DParser.LPAREN);
            this.state = 325;
            this.match(Stage3DParser.UNION);
            this.state = 326;
            this.typeExpr();
            this.state = 328;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 327;
                this.typeExpr();
                }
                }
                this.state = 330;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 69);
            this.state = 332;
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
        this.enterRule(localContext, 38, Stage3DParser.RULE_typeIntersection);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 334;
            this.match(Stage3DParser.LPAREN);
            this.state = 335;
            this.match(Stage3DParser.INTERSECT);
            this.state = 336;
            this.typeExpr();
            this.state = 338;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 337;
                this.typeExpr();
                }
                }
                this.state = 340;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 69);
            this.state = 342;
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
        this.enterRule(localContext, 40, Stage3DParser.RULE_typeArray);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 344;
            this.match(Stage3DParser.LPAREN);
            this.state = 345;
            this.match(Stage3DParser.ARRAY);
            this.state = 346;
            this.typeExpr();
            this.state = 347;
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
        this.enterRule(localContext, 42, Stage3DParser.RULE_typeTuple);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 349;
            this.match(Stage3DParser.LPAREN);
            this.state = 350;
            this.match(Stage3DParser.TUPLE);
            this.state = 352;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 351;
                this.typeTupleElement();
                }
                }
                this.state = 354;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 69);
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
    public typeTupleElement(): TypeTupleElementContext {
        let localContext = new TypeTupleElementContext(this.context, this.state);
        this.enterRule(localContext, 44, Stage3DParser.RULE_typeTupleElement);
        try {
            this.state = 369;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 19, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 358;
                this.match(Stage3DParser.LPAREN);
                this.state = 359;
                this.match(Stage3DParser.REST);
                this.state = 360;
                this.typeExpr();
                this.state = 361;
                this.match(Stage3DParser.RPAREN);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 363;
                this.match(Stage3DParser.LPAREN);
                this.state = 364;
                this.match(Stage3DParser.IDENTIFIER);
                this.state = 365;
                this.typeExpr();
                this.state = 366;
                this.match(Stage3DParser.RPAREN);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 368;
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
        this.enterRule(localContext, 46, Stage3DParser.RULE_typeFunction);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 371;
            this.match(Stage3DParser.LPAREN);
            this.state = 372;
            this.match(Stage3DParser.FN);
            this.state = 374;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 20, this.context) ) {
            case 1:
                {
                this.state = 373;
                this.typeParams();
                }
                break;
            }
            this.state = 376;
            this.match(Stage3DParser.LPAREN);
            this.state = 380;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 377;
                this.typeFnParam();
                }
                }
                this.state = 382;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 383;
            this.match(Stage3DParser.RPAREN);
            this.state = 384;
            this.typeExpr();
            this.state = 385;
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
        this.enterRule(localContext, 48, Stage3DParser.RULE_typeFnParam);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 387;
            this.match(Stage3DParser.LPAREN);
            this.state = 388;
            this.match(Stage3DParser.IDENTIFIER);
            this.state = 390;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 58) {
                {
                this.state = 389;
                this.match(Stage3DParser.OPTIONAL);
                }
            }

            this.state = 392;
            this.typeExpr();
            this.state = 393;
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
        this.enterRule(localContext, 50, Stage3DParser.RULE_typeObject);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 395;
            this.match(Stage3DParser.LPAREN);
            this.state = 396;
            this.match(Stage3DParser.IDENTIFIER);
            this.state = 400;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 397;
                this.typeProp();
                }
                }
                this.state = 402;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
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
    public typeProp(): TypePropContext {
        let localContext = new TypePropContext(this.context, this.state);
        this.enterRule(localContext, 52, Stage3DParser.RULE_typeProp);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 405;
            this.match(Stage3DParser.LPAREN);
            this.state = 409;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 50) {
                {
                {
                this.state = 406;
                this.propModifier();
                }
                }
                this.state = 411;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 412;
            this.match(Stage3DParser.IDENTIFIER);
            this.state = 414;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 58) {
                {
                this.state = 413;
                this.match(Stage3DParser.OPTIONAL);
                }
            }

            this.state = 416;
            this.typeExpr();
            this.state = 417;
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
        this.enterRule(localContext, 54, Stage3DParser.RULE_propModifier);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 419;
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
        this.enterRule(localContext, 56, Stage3DParser.RULE_typeLiteral);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 421;
            this.match(Stage3DParser.LPAREN);
            this.state = 422;
            this.match(Stage3DParser.LIT);
            this.state = 423;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 59)) & ~0x1F) === 0 && ((1 << (_la - 59)) & 385) !== 0))) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 424;
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
        this.enterRule(localContext, 58, Stage3DParser.RULE_typeKeyof);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 426;
            this.match(Stage3DParser.LPAREN);
            this.state = 427;
            this.match(Stage3DParser.KEYOF);
            this.state = 428;
            this.typeExpr();
            this.state = 429;
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
        this.enterRule(localContext, 60, Stage3DParser.RULE_typeTypeof);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 431;
            this.match(Stage3DParser.LPAREN);
            this.state = 432;
            this.match(Stage3DParser.TYPEOF);
            this.state = 433;
            this.match(Stage3DParser.IDENTIFIER);
            this.state = 434;
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
        this.enterRule(localContext, 62, Stage3DParser.RULE_typeIndexAccess);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 436;
            this.match(Stage3DParser.LPAREN);
            this.state = 437;
            this.match(Stage3DParser.INDEX);
            this.state = 438;
            this.typeExpr();
            this.state = 439;
            this.typeExpr();
            this.state = 440;
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
        this.enterRule(localContext, 64, Stage3DParser.RULE_typeConditional);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 442;
            this.match(Stage3DParser.LPAREN);
            this.state = 443;
            this.match(Stage3DParser.COND);
            this.state = 444;
            this.typeExpr();
            this.state = 445;
            this.typeExpr();
            this.state = 446;
            this.typeExpr();
            this.state = 447;
            this.typeExpr();
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
    public typeInfer(): TypeInferContext {
        let localContext = new TypeInferContext(this.context, this.state);
        this.enterRule(localContext, 66, Stage3DParser.RULE_typeInfer);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 450;
            this.match(Stage3DParser.LPAREN);
            this.state = 451;
            this.match(Stage3DParser.INFER);
            this.state = 452;
            this.match(Stage3DParser.IDENTIFIER);
            this.state = 453;
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
        this.enterRule(localContext, 68, Stage3DParser.RULE_typeMapped);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 455;
            this.match(Stage3DParser.LPAREN);
            this.state = 456;
            this.match(Stage3DParser.MAPPED);
            this.state = 457;
            this.match(Stage3DParser.IDENTIFIER);
            this.state = 458;
            this.typeExpr();
            this.state = 460;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 26, this.context) ) {
            case 1:
                {
                this.state = 459;
                this.mappedModifiers();
                }
                break;
            }
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
    public mappedModifiers(): MappedModifiersContext {
        let localContext = new MappedModifiersContext(this.context, this.state);
        this.enterRule(localContext, 70, Stage3DParser.RULE_mappedModifiers);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 465;
            this.match(Stage3DParser.LPAREN);
            this.state = 466;
            this.match(Stage3DParser.MODIFIERS);
            this.state = 468;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 467;
                this.mappedModifier();
                }
                }
                this.state = 470;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 50 || _la === 58);
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
    public mappedModifier(): MappedModifierContext {
        let localContext = new MappedModifierContext(this.context, this.state);
        this.enterRule(localContext, 72, Stage3DParser.RULE_mappedModifier);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 474;
            _la = this.tokenStream.LA(1);
            if(!(_la === 50 || _la === 58)) {
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
        this.enterRule(localContext, 74, Stage3DParser.RULE_typeTemplateLiteral);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 476;
            this.match(Stage3DParser.LPAREN);
            this.state = 477;
            this.match(Stage3DParser.TEMPLATE);
            this.state = 479;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 478;
                this.templatePart();
                }
                }
                this.state = 481;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 67 || _la === 69);
            this.state = 483;
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
        this.enterRule(localContext, 76, Stage3DParser.RULE_templatePart);
        try {
            this.state = 487;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case Stage3DParser.STRING:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 485;
                this.match(Stage3DParser.STRING);
                }
                break;
            case Stage3DParser.LPAREN:
            case Stage3DParser.IDENTIFIER:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 486;
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
        this.enterRule(localContext, 78, Stage3DParser.RULE_typeApplication);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 489;
            this.match(Stage3DParser.LPAREN);
            this.state = 490;
            this.typeExpr();
            this.state = 492;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 491;
                this.typeExpr();
                }
                }
                this.state = 494;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 69);
            this.state = 496;
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
        this.enterRule(localContext, 80, Stage3DParser.RULE_typeParams);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 498;
            this.match(Stage3DParser.LPAREN);
            this.state = 499;
            this.match(Stage3DParser.TYPE_PARAMS);
            this.state = 501;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 500;
                this.typeParamDecl();
                }
                }
                this.state = 503;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 69);
            this.state = 505;
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
        this.enterRule(localContext, 82, Stage3DParser.RULE_typeParamDecl);
        let _la: number;
        try {
            this.state = 517;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case Stage3DParser.IDENTIFIER:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 507;
                this.match(Stage3DParser.IDENTIFIER);
                }
                break;
            case Stage3DParser.LPAREN:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 508;
                this.match(Stage3DParser.LPAREN);
                this.state = 509;
                this.match(Stage3DParser.IDENTIFIER);
                this.state = 511;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 32, this.context) ) {
                case 1:
                    {
                    this.state = 510;
                    this.typeParamConstraint();
                    }
                    break;
                }
                this.state = 514;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 2) {
                    {
                    this.state = 513;
                    this.typeParamDefault();
                    }
                }

                this.state = 516;
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
        this.enterRule(localContext, 84, Stage3DParser.RULE_typeParamConstraint);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 519;
            this.match(Stage3DParser.LPAREN);
            this.state = 520;
            this.match(Stage3DParser.EXTENDS);
            this.state = 521;
            this.typeExpr();
            this.state = 522;
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
        this.enterRule(localContext, 86, Stage3DParser.RULE_typeParamDefault);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 524;
            this.match(Stage3DParser.LPAREN);
            this.state = 525;
            this.match(Stage3DParser.DEFAULT);
            this.state = 526;
            this.typeExpr();
            this.state = 527;
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
        this.enterRule(localContext, 88, Stage3DParser.RULE_assign);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 529;
            this.match(Stage3DParser.LPAREN);
            this.state = 530;
            this.match(Stage3DParser.SET);
            this.state = 531;
            this.match(Stage3DParser.IDENTIFIER);
            this.state = 532;
            this.expression();
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
    public switchForm(): SwitchFormContext {
        let localContext = new SwitchFormContext(this.context, this.state);
        this.enterRule(localContext, 90, Stage3DParser.RULE_switchForm);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 535;
            this.match(Stage3DParser.LPAREN);
            this.state = 536;
            this.match(Stage3DParser.SWITCH);
            this.state = 537;
            this.expression();
            this.state = 541;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 35, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 538;
                    this.caseClause();
                    }
                    }
                }
                this.state = 543;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 35, this.context);
            }
            this.state = 545;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2) {
                {
                this.state = 544;
                this.defaultClause();
                }
            }

            this.state = 547;
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
        this.enterRule(localContext, 92, Stage3DParser.RULE_caseClause);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 549;
            this.match(Stage3DParser.LPAREN);
            this.state = 550;
            this.match(Stage3DParser.CASE);
            this.state = 551;
            this.expression();
            this.state = 555;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 59)) & ~0x1F) === 0 && ((1 << (_la - 59)) & 1479) !== 0)) {
                {
                {
                this.state = 552;
                this.statement();
                }
                }
                this.state = 557;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 558;
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
        this.enterRule(localContext, 94, Stage3DParser.RULE_defaultClause);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 560;
            this.match(Stage3DParser.LPAREN);
            this.state = 561;
            this.match(Stage3DParser.DEFAULT);
            this.state = 565;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 59)) & ~0x1F) === 0 && ((1 << (_la - 59)) & 1479) !== 0)) {
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
        this.enterRule(localContext, 96, Stage3DParser.RULE_forForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 570;
            this.match(Stage3DParser.LPAREN);
            this.state = 571;
            this.match(Stage3DParser.FOR);
            this.state = 572;
            this.letStmt();
            this.state = 573;
            this.expression();
            this.state = 574;
            this.assign();
            this.state = 578;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 59)) & ~0x1F) === 0 && ((1 << (_la - 59)) & 1479) !== 0)) {
                {
                {
                this.state = 575;
                this.statement();
                }
                }
                this.state = 580;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 581;
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
        this.enterRule(localContext, 98, Stage3DParser.RULE_forInForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 583;
            this.match(Stage3DParser.LPAREN);
            this.state = 584;
            this.match(Stage3DParser.FORIN);
            this.state = 585;
            this.match(Stage3DParser.IDENTIFIER);
            this.state = 586;
            this.expression();
            this.state = 590;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 59)) & ~0x1F) === 0 && ((1 << (_la - 59)) & 1479) !== 0)) {
                {
                {
                this.state = 587;
                this.statement();
                }
                }
                this.state = 592;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 593;
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
        this.enterRule(localContext, 100, Stage3DParser.RULE_forOfForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 595;
            this.match(Stage3DParser.LPAREN);
            this.state = 596;
            this.match(Stage3DParser.FOROF);
            this.state = 597;
            this.match(Stage3DParser.IDENTIFIER);
            this.state = 598;
            this.expression();
            this.state = 602;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 59)) & ~0x1F) === 0 && ((1 << (_la - 59)) & 1479) !== 0)) {
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
        this.enterRule(localContext, 102, Stage3DParser.RULE_expression);
        try {
            this.state = 624;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 42, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 607;
                this.literal();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 608;
                this.match(Stage3DParser.KEYWORD);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 609;
                this.match(Stage3DParser.IDENTIFIER);
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 610;
                this.lambda();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 611;
                this.objectExpr();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 612;
                this.arrayExpr();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 613;
                this.propAccess();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 614;
                this.indexAccess();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 615;
                this.quasiquote();
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 616;
                this.unquote();
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 617;
                this.unquoteSplicing();
                }
                break;
            case 12:
                this.enterOuterAlt(localContext, 12);
                {
                this.state = 618;
                this.ternary();
                }
                break;
            case 13:
                this.enterOuterAlt(localContext, 13);
                {
                this.state = 619;
                this.condExpr();
                }
                break;
            case 14:
                this.enterOuterAlt(localContext, 14);
                {
                this.state = 620;
                this.newForm();
                }
                break;
            case 15:
                this.enterOuterAlt(localContext, 15);
                {
                this.state = 621;
                this.optChain();
                }
                break;
            case 16:
                this.enterOuterAlt(localContext, 16);
                {
                this.state = 622;
                this.nullCoalesce();
                }
                break;
            case 17:
                this.enterOuterAlt(localContext, 17);
                {
                this.state = 623;
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
    public lambda(): LambdaContext {
        let localContext = new LambdaContext(this.context, this.state);
        this.enterRule(localContext, 104, Stage3DParser.RULE_lambda);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 626;
            this.match(Stage3DParser.LPAREN);
            this.state = 627;
            this.match(Stage3DParser.LAMBDA);
            this.state = 628;
            this.fnSignature();
            this.state = 632;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 59)) & ~0x1F) === 0 && ((1 << (_la - 59)) & 1479) !== 0)) {
                {
                {
                this.state = 629;
                this.statement();
                }
                }
                this.state = 634;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 635;
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
        this.enterRule(localContext, 106, Stage3DParser.RULE_ternary);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 637;
            this.match(Stage3DParser.LPAREN);
            this.state = 638;
            this.match(Stage3DParser.TERNARY);
            this.state = 639;
            this.expression();
            this.state = 640;
            this.expression();
            this.state = 641;
            this.expression();
            this.state = 642;
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
        this.enterRule(localContext, 108, Stage3DParser.RULE_condExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 644;
            this.match(Stage3DParser.LPAREN);
            this.state = 645;
            this.match(Stage3DParser.COND);
            this.state = 649;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 646;
                this.expression();
                this.state = 647;
                this.expression();
                }
                }
                this.state = 651;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || ((((_la - 59)) & ~0x1F) === 0 && ((1 << (_la - 59)) & 1479) !== 0));
            this.state = 653;
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
        this.enterRule(localContext, 110, Stage3DParser.RULE_newForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 655;
            this.match(Stage3DParser.LPAREN);
            this.state = 656;
            this.match(Stage3DParser.NEW);
            this.state = 657;
            this.match(Stage3DParser.IDENTIFIER);
            this.state = 661;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 59)) & ~0x1F) === 0 && ((1 << (_la - 59)) & 1479) !== 0)) {
                {
                {
                this.state = 658;
                this.expression();
                }
                }
                this.state = 663;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 664;
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
        this.enterRule(localContext, 112, Stage3DParser.RULE_objectExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 666;
            this.match(Stage3DParser.LPAREN);
            this.state = 667;
            this.match(Stage3DParser.OBJECT);
            this.state = 671;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 668;
                this.objectField();
                }
                }
                this.state = 673;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 674;
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
        this.enterRule(localContext, 114, Stage3DParser.RULE_objectField);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 676;
            this.match(Stage3DParser.LPAREN);
            this.state = 677;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 65)) & ~0x1F) === 0 && ((1 << (_la - 65)) & 21) !== 0))) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 678;
            this.expression();
            this.state = 679;
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
        this.enterRule(localContext, 116, Stage3DParser.RULE_arrayExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 681;
            this.match(Stage3DParser.LPAREN);
            this.state = 682;
            this.match(Stage3DParser.ARRAY);
            this.state = 686;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 59)) & ~0x1F) === 0 && ((1 << (_la - 59)) & 1479) !== 0)) {
                {
                {
                this.state = 683;
                this.expression();
                }
                }
                this.state = 688;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 689;
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
    public propAccess(): PropAccessContext {
        let localContext = new PropAccessContext(this.context, this.state);
        this.enterRule(localContext, 118, Stage3DParser.RULE_propAccess);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 691;
            this.match(Stage3DParser.LPAREN);
            this.state = 692;
            this.match(Stage3DParser.DOT);
            this.state = 693;
            this.expression();
            this.state = 694;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 65)) & ~0x1F) === 0 && ((1 << (_la - 65)) & 21) !== 0))) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 695;
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
        this.enterRule(localContext, 120, Stage3DParser.RULE_indexAccess);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 697;
            this.match(Stage3DParser.LPAREN);
            this.state = 698;
            this.match(Stage3DParser.INDEX);
            this.state = 699;
            this.expression();
            this.state = 700;
            this.expression();
            this.state = 701;
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
        this.enterRule(localContext, 122, Stage3DParser.RULE_quasiquote);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 703;
            this.match(Stage3DParser.LPAREN);
            this.state = 704;
            _la = this.tokenStream.LA(1);
            if(!(_la === 27 || _la === 28)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 705;
            this.expression();
            this.state = 706;
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
        this.enterRule(localContext, 124, Stage3DParser.RULE_unquote);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 708;
            this.match(Stage3DParser.LPAREN);
            this.state = 709;
            this.match(Stage3DParser.UNQUOTE);
            this.state = 710;
            this.expression();
            this.state = 711;
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
        this.enterRule(localContext, 126, Stage3DParser.RULE_unquoteSplicing);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 713;
            this.match(Stage3DParser.LPAREN);
            this.state = 714;
            this.match(Stage3DParser.UNQUOTE_SPLICING);
            this.state = 715;
            this.expression();
            this.state = 716;
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
        this.enterRule(localContext, 128, Stage3DParser.RULE_optChain);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 718;
            this.match(Stage3DParser.LPAREN);
            this.state = 719;
            this.match(Stage3DParser.OPTCHAIN);
            this.state = 720;
            this.expression();
            this.state = 721;
            this.match(Stage3DParser.IDENTIFIER);
            this.state = 722;
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
        this.enterRule(localContext, 130, Stage3DParser.RULE_nullCoalesce);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 724;
            this.match(Stage3DParser.LPAREN);
            this.state = 725;
            this.match(Stage3DParser.NULLCOAL);
            this.state = 726;
            this.expression();
            this.state = 727;
            this.expression();
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
    public call(): CallContext {
        let localContext = new CallContext(this.context, this.state);
        this.enterRule(localContext, 132, Stage3DParser.RULE_call);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 730;
            this.match(Stage3DParser.LPAREN);
            this.state = 731;
            this.expression();
            this.state = 735;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 59)) & ~0x1F) === 0 && ((1 << (_la - 59)) & 1479) !== 0)) {
                {
                {
                this.state = 732;
                this.expression();
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
    public fnSignature(): FnSignatureContext {
        let localContext = new FnSignatureContext(this.context, this.state);
        this.enterRule(localContext, 134, Stage3DParser.RULE_fnSignature);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 740;
            this.match(Stage3DParser.LPAREN);
            this.state = 751;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2) {
                {
                this.state = 741;
                this.param();
                this.state = 748;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 2 || _la === 4) {
                    {
                    {
                    this.state = 743;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    if (_la === 4) {
                        {
                        this.state = 742;
                        this.match(Stage3DParser.COMMA);
                        }
                    }

                    this.state = 745;
                    this.param();
                    }
                    }
                    this.state = 750;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
            }

            this.state = 753;
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
        this.enterRule(localContext, 136, Stage3DParser.RULE_param);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 755;
            this.match(Stage3DParser.LPAREN);
            this.state = 756;
            this.match(Stage3DParser.IDENTIFIER);
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
    public literal(): LiteralContext {
        let localContext = new LiteralContext(this.context, this.state);
        this.enterRule(localContext, 138, Stage3DParser.RULE_literal);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 759;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 59)) & ~0x1F) === 0 && ((1 << (_la - 59)) & 391) !== 0))) {
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
        4,1,70,762,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,
        6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,
        2,14,7,14,2,15,7,15,2,16,7,16,2,17,7,17,2,18,7,18,2,19,7,19,2,20,
        7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,24,2,25,7,25,2,26,7,26,
        2,27,7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,31,7,31,2,32,7,32,2,33,
        7,33,2,34,7,34,2,35,7,35,2,36,7,36,2,37,7,37,2,38,7,38,2,39,7,39,
        2,40,7,40,2,41,7,41,2,42,7,42,2,43,7,43,2,44,7,44,2,45,7,45,2,46,
        7,46,2,47,7,47,2,48,7,48,2,49,7,49,2,50,7,50,2,51,7,51,2,52,7,52,
        2,53,7,53,2,54,7,54,2,55,7,55,2,56,7,56,2,57,7,57,2,58,7,58,2,59,
        7,59,2,60,7,60,2,61,7,61,2,62,7,62,2,63,7,63,2,64,7,64,2,65,7,65,
        2,66,7,66,2,67,7,67,2,68,7,68,2,69,7,69,1,0,1,0,1,0,5,0,144,8,0,
        10,0,12,0,147,9,0,1,0,1,0,1,1,1,1,1,1,3,1,154,8,1,1,2,1,2,1,2,1,
        2,1,2,5,2,161,8,2,10,2,12,2,164,9,2,1,2,1,2,1,3,1,3,1,3,1,3,1,3,
        1,3,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,
        1,4,3,4,190,8,4,1,5,1,5,1,5,1,5,5,5,196,8,5,10,5,12,5,199,9,5,1,
        5,1,5,5,5,203,8,5,10,5,12,5,206,9,5,1,5,1,5,1,6,1,6,1,6,1,6,1,6,
        1,6,1,7,1,7,1,7,1,7,5,7,220,8,7,10,7,12,7,223,9,7,1,7,1,7,5,7,227,
        8,7,10,7,12,7,230,9,7,1,7,1,7,1,8,1,8,1,8,1,8,1,8,1,8,1,9,1,9,1,
        9,1,9,1,9,3,9,245,8,9,1,9,1,9,1,10,1,10,1,10,1,10,5,10,253,8,10,
        10,10,12,10,256,9,10,1,10,1,10,1,11,1,11,1,11,5,11,263,8,11,10,11,
        12,11,266,9,11,1,11,1,11,1,12,1,12,1,12,3,12,273,8,12,1,12,1,12,
        1,13,1,13,1,13,1,13,1,13,1,14,1,14,1,14,3,14,285,8,14,1,14,1,14,
        1,14,1,15,1,15,1,15,1,15,3,15,294,8,15,1,15,1,15,1,15,1,16,1,16,
        1,16,1,16,3,16,303,8,16,1,16,1,16,1,17,1,17,1,17,1,17,1,17,1,17,
        1,17,1,17,1,17,1,17,1,17,1,17,1,17,1,17,1,17,1,17,3,17,323,8,17,
        1,18,1,18,1,18,1,18,4,18,329,8,18,11,18,12,18,330,1,18,1,18,1,19,
        1,19,1,19,1,19,4,19,339,8,19,11,19,12,19,340,1,19,1,19,1,20,1,20,
        1,20,1,20,1,20,1,21,1,21,1,21,4,21,353,8,21,11,21,12,21,354,1,21,
        1,21,1,22,1,22,1,22,1,22,1,22,1,22,1,22,1,22,1,22,1,22,1,22,3,22,
        370,8,22,1,23,1,23,1,23,3,23,375,8,23,1,23,1,23,5,23,379,8,23,10,
        23,12,23,382,9,23,1,23,1,23,1,23,1,23,1,24,1,24,1,24,3,24,391,8,
        24,1,24,1,24,1,24,1,25,1,25,1,25,5,25,399,8,25,10,25,12,25,402,9,
        25,1,25,1,25,1,26,1,26,5,26,408,8,26,10,26,12,26,411,9,26,1,26,1,
        26,3,26,415,8,26,1,26,1,26,1,26,1,27,1,27,1,28,1,28,1,28,1,28,1,
        28,1,29,1,29,1,29,1,29,1,29,1,30,1,30,1,30,1,30,1,30,1,31,1,31,1,
        31,1,31,1,31,1,31,1,32,1,32,1,32,1,32,1,32,1,32,1,32,1,32,1,33,1,
        33,1,33,1,33,1,33,1,34,1,34,1,34,1,34,1,34,3,34,461,8,34,1,34,1,
        34,1,34,1,35,1,35,1,35,4,35,469,8,35,11,35,12,35,470,1,35,1,35,1,
        36,1,36,1,37,1,37,1,37,4,37,480,8,37,11,37,12,37,481,1,37,1,37,1,
        38,1,38,3,38,488,8,38,1,39,1,39,1,39,4,39,493,8,39,11,39,12,39,494,
        1,39,1,39,1,40,1,40,1,40,4,40,502,8,40,11,40,12,40,503,1,40,1,40,
        1,41,1,41,1,41,1,41,3,41,512,8,41,1,41,3,41,515,8,41,1,41,3,41,518,
        8,41,1,42,1,42,1,42,1,42,1,42,1,43,1,43,1,43,1,43,1,43,1,44,1,44,
        1,44,1,44,1,44,1,44,1,45,1,45,1,45,1,45,5,45,540,8,45,10,45,12,45,
        543,9,45,1,45,3,45,546,8,45,1,45,1,45,1,46,1,46,1,46,1,46,5,46,554,
        8,46,10,46,12,46,557,9,46,1,46,1,46,1,47,1,47,1,47,5,47,564,8,47,
        10,47,12,47,567,9,47,1,47,1,47,1,48,1,48,1,48,1,48,1,48,1,48,5,48,
        577,8,48,10,48,12,48,580,9,48,1,48,1,48,1,49,1,49,1,49,1,49,1,49,
        5,49,589,8,49,10,49,12,49,592,9,49,1,49,1,49,1,50,1,50,1,50,1,50,
        1,50,5,50,601,8,50,10,50,12,50,604,9,50,1,50,1,50,1,51,1,51,1,51,
        1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,
        1,51,3,51,625,8,51,1,52,1,52,1,52,1,52,5,52,631,8,52,10,52,12,52,
        634,9,52,1,52,1,52,1,53,1,53,1,53,1,53,1,53,1,53,1,53,1,54,1,54,
        1,54,1,54,1,54,4,54,650,8,54,11,54,12,54,651,1,54,1,54,1,55,1,55,
        1,55,1,55,5,55,660,8,55,10,55,12,55,663,9,55,1,55,1,55,1,56,1,56,
        1,56,5,56,670,8,56,10,56,12,56,673,9,56,1,56,1,56,1,57,1,57,1,57,
        1,57,1,57,1,58,1,58,1,58,5,58,685,8,58,10,58,12,58,688,9,58,1,58,
        1,58,1,59,1,59,1,59,1,59,1,59,1,59,1,60,1,60,1,60,1,60,1,60,1,60,
        1,61,1,61,1,61,1,61,1,61,1,62,1,62,1,62,1,62,1,62,1,63,1,63,1,63,
        1,63,1,63,1,64,1,64,1,64,1,64,1,64,1,64,1,65,1,65,1,65,1,65,1,65,
        1,65,1,66,1,66,1,66,5,66,734,8,66,10,66,12,66,737,9,66,1,66,1,66,
        1,67,1,67,1,67,3,67,744,8,67,1,67,5,67,747,8,67,10,67,12,67,750,
        9,67,3,67,752,8,67,1,67,1,67,1,68,1,68,1,68,1,68,1,69,1,69,1,69,
        0,0,70,0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,
        42,44,46,48,50,52,54,56,58,60,62,64,66,68,70,72,74,76,78,80,82,84,
        86,88,90,92,94,96,98,100,102,104,106,108,110,112,114,116,118,120,
        122,124,126,128,130,132,134,136,138,0,5,2,0,59,59,66,67,2,0,50,50,
        58,58,3,0,65,65,67,67,69,69,1,0,27,28,2,0,59,61,66,67,788,0,140,
        1,0,0,0,2,153,1,0,0,0,4,155,1,0,0,0,6,167,1,0,0,0,8,189,1,0,0,0,
        10,191,1,0,0,0,12,209,1,0,0,0,14,215,1,0,0,0,16,233,1,0,0,0,18,239,
        1,0,0,0,20,248,1,0,0,0,22,259,1,0,0,0,24,269,1,0,0,0,26,276,1,0,
        0,0,28,281,1,0,0,0,30,289,1,0,0,0,32,298,1,0,0,0,34,322,1,0,0,0,
        36,324,1,0,0,0,38,334,1,0,0,0,40,344,1,0,0,0,42,349,1,0,0,0,44,369,
        1,0,0,0,46,371,1,0,0,0,48,387,1,0,0,0,50,395,1,0,0,0,52,405,1,0,
        0,0,54,419,1,0,0,0,56,421,1,0,0,0,58,426,1,0,0,0,60,431,1,0,0,0,
        62,436,1,0,0,0,64,442,1,0,0,0,66,450,1,0,0,0,68,455,1,0,0,0,70,465,
        1,0,0,0,72,474,1,0,0,0,74,476,1,0,0,0,76,487,1,0,0,0,78,489,1,0,
        0,0,80,498,1,0,0,0,82,517,1,0,0,0,84,519,1,0,0,0,86,524,1,0,0,0,
        88,529,1,0,0,0,90,535,1,0,0,0,92,549,1,0,0,0,94,560,1,0,0,0,96,570,
        1,0,0,0,98,583,1,0,0,0,100,595,1,0,0,0,102,624,1,0,0,0,104,626,1,
        0,0,0,106,637,1,0,0,0,108,644,1,0,0,0,110,655,1,0,0,0,112,666,1,
        0,0,0,114,676,1,0,0,0,116,681,1,0,0,0,118,691,1,0,0,0,120,697,1,
        0,0,0,122,703,1,0,0,0,124,708,1,0,0,0,126,713,1,0,0,0,128,718,1,
        0,0,0,130,724,1,0,0,0,132,730,1,0,0,0,134,740,1,0,0,0,136,755,1,
        0,0,0,138,759,1,0,0,0,140,141,5,2,0,0,141,145,5,5,0,0,142,144,3,
        2,1,0,143,142,1,0,0,0,144,147,1,0,0,0,145,143,1,0,0,0,145,146,1,
        0,0,0,146,148,1,0,0,0,147,145,1,0,0,0,148,149,5,3,0,0,149,1,1,0,
        0,0,150,154,3,4,2,0,151,154,3,6,3,0,152,154,3,8,4,0,153,150,1,0,
        0,0,153,151,1,0,0,0,153,152,1,0,0,0,154,3,1,0,0,0,155,156,5,2,0,
        0,156,157,5,12,0,0,157,158,5,69,0,0,158,162,3,134,67,0,159,161,3,
        8,4,0,160,159,1,0,0,0,161,164,1,0,0,0,162,160,1,0,0,0,162,163,1,
        0,0,0,163,165,1,0,0,0,164,162,1,0,0,0,165,166,5,3,0,0,166,5,1,0,
        0,0,167,168,5,2,0,0,168,169,5,11,0,0,169,170,5,69,0,0,170,171,3,
        102,51,0,171,172,5,3,0,0,172,7,1,0,0,0,173,190,3,10,5,0,174,190,
        3,12,6,0,175,190,3,14,7,0,176,190,3,16,8,0,177,190,3,18,9,0,178,
        190,3,20,10,0,179,190,3,22,11,0,180,190,3,24,12,0,181,190,3,26,13,
        0,182,190,3,28,14,0,183,190,3,90,45,0,184,190,3,96,48,0,185,190,
        3,98,49,0,186,190,3,100,50,0,187,190,3,88,44,0,188,190,3,102,51,
        0,189,173,1,0,0,0,189,174,1,0,0,0,189,175,1,0,0,0,189,176,1,0,0,
        0,189,177,1,0,0,0,189,178,1,0,0,0,189,179,1,0,0,0,189,180,1,0,0,
        0,189,181,1,0,0,0,189,182,1,0,0,0,189,183,1,0,0,0,189,184,1,0,0,
        0,189,185,1,0,0,0,189,186,1,0,0,0,189,187,1,0,0,0,189,188,1,0,0,
        0,190,9,1,0,0,0,191,192,5,2,0,0,192,193,5,6,0,0,193,197,5,2,0,0,
        194,196,3,30,15,0,195,194,1,0,0,0,196,199,1,0,0,0,197,195,1,0,0,
        0,197,198,1,0,0,0,198,200,1,0,0,0,199,197,1,0,0,0,200,204,5,3,0,
        0,201,203,3,8,4,0,202,201,1,0,0,0,203,206,1,0,0,0,204,202,1,0,0,
        0,204,205,1,0,0,0,205,207,1,0,0,0,206,204,1,0,0,0,207,208,5,3,0,
        0,208,11,1,0,0,0,209,210,5,2,0,0,210,211,5,7,0,0,211,212,3,32,16,
        0,212,213,3,102,51,0,213,214,5,3,0,0,214,13,1,0,0,0,215,216,5,2,
        0,0,216,217,5,8,0,0,217,221,5,2,0,0,218,220,3,30,15,0,219,218,1,
        0,0,0,220,223,1,0,0,0,221,219,1,0,0,0,221,222,1,0,0,0,222,224,1,
        0,0,0,223,221,1,0,0,0,224,228,5,3,0,0,225,227,3,8,4,0,226,225,1,
        0,0,0,227,230,1,0,0,0,228,226,1,0,0,0,228,229,1,0,0,0,229,231,1,
        0,0,0,230,228,1,0,0,0,231,232,5,3,0,0,232,15,1,0,0,0,233,234,5,2,
        0,0,234,235,5,9,0,0,235,236,3,32,16,0,236,237,3,102,51,0,237,238,
        5,3,0,0,238,17,1,0,0,0,239,240,5,2,0,0,240,241,5,13,0,0,241,242,
        3,102,51,0,242,244,3,8,4,0,243,245,3,8,4,0,244,243,1,0,0,0,244,245,
        1,0,0,0,245,246,1,0,0,0,246,247,5,3,0,0,247,19,1,0,0,0,248,249,5,
        2,0,0,249,250,5,14,0,0,250,254,3,102,51,0,251,253,3,8,4,0,252,251,
        1,0,0,0,253,256,1,0,0,0,254,252,1,0,0,0,254,255,1,0,0,0,255,257,
        1,0,0,0,256,254,1,0,0,0,257,258,5,3,0,0,258,21,1,0,0,0,259,260,5,
        2,0,0,260,264,5,15,0,0,261,263,3,8,4,0,262,261,1,0,0,0,263,266,1,
        0,0,0,264,262,1,0,0,0,264,265,1,0,0,0,265,267,1,0,0,0,266,264,1,
        0,0,0,267,268,5,3,0,0,268,23,1,0,0,0,269,270,5,2,0,0,270,272,5,16,
        0,0,271,273,3,102,51,0,272,271,1,0,0,0,272,273,1,0,0,0,273,274,1,
        0,0,0,274,275,5,3,0,0,275,25,1,0,0,0,276,277,5,2,0,0,277,278,5,17,
        0,0,278,279,3,102,51,0,279,280,5,3,0,0,280,27,1,0,0,0,281,282,5,
        2,0,0,282,284,5,32,0,0,283,285,3,112,56,0,284,283,1,0,0,0,284,285,
        1,0,0,0,285,286,1,0,0,0,286,287,5,67,0,0,287,288,5,3,0,0,288,29,
        1,0,0,0,289,290,5,2,0,0,290,293,5,69,0,0,291,292,5,62,0,0,292,294,
        3,34,17,0,293,291,1,0,0,0,293,294,1,0,0,0,294,295,1,0,0,0,295,296,
        3,102,51,0,296,297,5,3,0,0,297,31,1,0,0,0,298,299,5,2,0,0,299,302,
        5,69,0,0,300,301,5,62,0,0,301,303,3,34,17,0,302,300,1,0,0,0,302,
        303,1,0,0,0,303,304,1,0,0,0,304,305,5,3,0,0,305,33,1,0,0,0,306,323,
        5,69,0,0,307,323,3,36,18,0,308,323,3,38,19,0,309,323,3,40,20,0,310,
        323,3,42,21,0,311,323,3,46,23,0,312,323,3,50,25,0,313,323,3,56,28,
        0,314,323,3,58,29,0,315,323,3,60,30,0,316,323,3,62,31,0,317,323,
        3,64,32,0,318,323,3,66,33,0,319,323,3,68,34,0,320,323,3,74,37,0,
        321,323,3,78,39,0,322,306,1,0,0,0,322,307,1,0,0,0,322,308,1,0,0,
        0,322,309,1,0,0,0,322,310,1,0,0,0,322,311,1,0,0,0,322,312,1,0,0,
        0,322,313,1,0,0,0,322,314,1,0,0,0,322,315,1,0,0,0,322,316,1,0,0,
        0,322,317,1,0,0,0,322,318,1,0,0,0,322,319,1,0,0,0,322,320,1,0,0,
        0,322,321,1,0,0,0,323,35,1,0,0,0,324,325,5,2,0,0,325,326,5,39,0,
        0,326,328,3,34,17,0,327,329,3,34,17,0,328,327,1,0,0,0,329,330,1,
        0,0,0,330,328,1,0,0,0,330,331,1,0,0,0,331,332,1,0,0,0,332,333,5,
        3,0,0,333,37,1,0,0,0,334,335,5,2,0,0,335,336,5,40,0,0,336,338,3,
        34,17,0,337,339,3,34,17,0,338,337,1,0,0,0,339,340,1,0,0,0,340,338,
        1,0,0,0,340,341,1,0,0,0,341,342,1,0,0,0,342,343,5,3,0,0,343,39,1,
        0,0,0,344,345,5,2,0,0,345,346,5,22,0,0,346,347,3,34,17,0,347,348,
        5,3,0,0,348,41,1,0,0,0,349,350,5,2,0,0,350,352,5,41,0,0,351,353,
        3,44,22,0,352,351,1,0,0,0,353,354,1,0,0,0,354,352,1,0,0,0,354,355,
        1,0,0,0,355,356,1,0,0,0,356,357,5,3,0,0,357,43,1,0,0,0,358,359,5,
        2,0,0,359,360,5,49,0,0,360,361,3,34,17,0,361,362,5,3,0,0,362,370,
        1,0,0,0,363,364,5,2,0,0,364,365,5,69,0,0,365,366,3,34,17,0,366,367,
        5,3,0,0,367,370,1,0,0,0,368,370,3,34,17,0,369,358,1,0,0,0,369,363,
        1,0,0,0,369,368,1,0,0,0,370,45,1,0,0,0,371,372,5,2,0,0,372,374,5,
        42,0,0,373,375,3,80,40,0,374,373,1,0,0,0,374,375,1,0,0,0,375,376,
        1,0,0,0,376,380,5,2,0,0,377,379,3,48,24,0,378,377,1,0,0,0,379,382,
        1,0,0,0,380,378,1,0,0,0,380,381,1,0,0,0,381,383,1,0,0,0,382,380,
        1,0,0,0,383,384,5,3,0,0,384,385,3,34,17,0,385,386,5,3,0,0,386,47,
        1,0,0,0,387,388,5,2,0,0,388,390,5,69,0,0,389,391,5,58,0,0,390,389,
        1,0,0,0,390,391,1,0,0,0,391,392,1,0,0,0,392,393,3,34,17,0,393,394,
        5,3,0,0,394,49,1,0,0,0,395,396,5,2,0,0,396,400,5,69,0,0,397,399,
        3,52,26,0,398,397,1,0,0,0,399,402,1,0,0,0,400,398,1,0,0,0,400,401,
        1,0,0,0,401,403,1,0,0,0,402,400,1,0,0,0,403,404,5,3,0,0,404,51,1,
        0,0,0,405,409,5,2,0,0,406,408,3,54,27,0,407,406,1,0,0,0,408,411,
        1,0,0,0,409,407,1,0,0,0,409,410,1,0,0,0,410,412,1,0,0,0,411,409,
        1,0,0,0,412,414,5,69,0,0,413,415,5,58,0,0,414,413,1,0,0,0,414,415,
        1,0,0,0,415,416,1,0,0,0,416,417,3,34,17,0,417,418,5,3,0,0,418,53,
        1,0,0,0,419,420,5,50,0,0,420,55,1,0,0,0,421,422,5,2,0,0,422,423,
        5,43,0,0,423,424,7,0,0,0,424,425,5,3,0,0,425,57,1,0,0,0,426,427,
        5,2,0,0,427,428,5,44,0,0,428,429,3,34,17,0,429,430,5,3,0,0,430,59,
        1,0,0,0,431,432,5,2,0,0,432,433,5,45,0,0,433,434,5,69,0,0,434,435,
        5,3,0,0,435,61,1,0,0,0,436,437,5,2,0,0,437,438,5,25,0,0,438,439,
        3,34,17,0,439,440,3,34,17,0,440,441,5,3,0,0,441,63,1,0,0,0,442,443,
        5,2,0,0,443,444,5,20,0,0,444,445,3,34,17,0,445,446,3,34,17,0,446,
        447,3,34,17,0,447,448,3,34,17,0,448,449,5,3,0,0,449,65,1,0,0,0,450,
        451,5,2,0,0,451,452,5,46,0,0,452,453,5,69,0,0,453,454,5,3,0,0,454,
        67,1,0,0,0,455,456,5,2,0,0,456,457,5,47,0,0,457,458,5,69,0,0,458,
        460,3,34,17,0,459,461,3,70,35,0,460,459,1,0,0,0,460,461,1,0,0,0,
        461,462,1,0,0,0,462,463,3,34,17,0,463,464,5,3,0,0,464,69,1,0,0,0,
        465,466,5,2,0,0,466,468,5,57,0,0,467,469,3,72,36,0,468,467,1,0,0,
        0,469,470,1,0,0,0,470,468,1,0,0,0,470,471,1,0,0,0,471,472,1,0,0,
        0,472,473,5,3,0,0,473,71,1,0,0,0,474,475,7,1,0,0,475,73,1,0,0,0,
        476,477,5,2,0,0,477,479,5,48,0,0,478,480,3,76,38,0,479,478,1,0,0,
        0,480,481,1,0,0,0,481,479,1,0,0,0,481,482,1,0,0,0,482,483,1,0,0,
        0,483,484,5,3,0,0,484,75,1,0,0,0,485,488,5,67,0,0,486,488,3,34,17,
        0,487,485,1,0,0,0,487,486,1,0,0,0,488,77,1,0,0,0,489,490,5,2,0,0,
        490,492,3,34,17,0,491,493,3,34,17,0,492,491,1,0,0,0,493,494,1,0,
        0,0,494,492,1,0,0,0,494,495,1,0,0,0,495,496,1,0,0,0,496,497,5,3,
        0,0,497,79,1,0,0,0,498,499,5,2,0,0,499,501,5,51,0,0,500,502,3,82,
        41,0,501,500,1,0,0,0,502,503,1,0,0,0,503,501,1,0,0,0,503,504,1,0,
        0,0,504,505,1,0,0,0,505,506,5,3,0,0,506,81,1,0,0,0,507,518,5,69,
        0,0,508,509,5,2,0,0,509,511,5,69,0,0,510,512,3,84,42,0,511,510,1,
        0,0,0,511,512,1,0,0,0,512,514,1,0,0,0,513,515,3,86,43,0,514,513,
        1,0,0,0,514,515,1,0,0,0,515,516,1,0,0,0,516,518,5,3,0,0,517,507,
        1,0,0,0,517,508,1,0,0,0,518,83,1,0,0,0,519,520,5,2,0,0,520,521,5,
        53,0,0,521,522,3,34,17,0,522,523,5,3,0,0,523,85,1,0,0,0,524,525,
        5,2,0,0,525,526,5,35,0,0,526,527,3,34,17,0,527,528,5,3,0,0,528,87,
        1,0,0,0,529,530,5,2,0,0,530,531,5,18,0,0,531,532,5,69,0,0,532,533,
        3,102,51,0,533,534,5,3,0,0,534,89,1,0,0,0,535,536,5,2,0,0,536,537,
        5,33,0,0,537,541,3,102,51,0,538,540,3,92,46,0,539,538,1,0,0,0,540,
        543,1,0,0,0,541,539,1,0,0,0,541,542,1,0,0,0,542,545,1,0,0,0,543,
        541,1,0,0,0,544,546,3,94,47,0,545,544,1,0,0,0,545,546,1,0,0,0,546,
        547,1,0,0,0,547,548,5,3,0,0,548,91,1,0,0,0,549,550,5,2,0,0,550,551,
        5,34,0,0,551,555,3,102,51,0,552,554,3,8,4,0,553,552,1,0,0,0,554,
        557,1,0,0,0,555,553,1,0,0,0,555,556,1,0,0,0,556,558,1,0,0,0,557,
        555,1,0,0,0,558,559,5,3,0,0,559,93,1,0,0,0,560,561,5,2,0,0,561,565,
        5,35,0,0,562,564,3,8,4,0,563,562,1,0,0,0,564,567,1,0,0,0,565,563,
        1,0,0,0,565,566,1,0,0,0,566,568,1,0,0,0,567,565,1,0,0,0,568,569,
        5,3,0,0,569,95,1,0,0,0,570,571,5,2,0,0,571,572,5,38,0,0,572,573,
        3,12,6,0,573,574,3,102,51,0,574,578,3,88,44,0,575,577,3,8,4,0,576,
        575,1,0,0,0,577,580,1,0,0,0,578,576,1,0,0,0,578,579,1,0,0,0,579,
        581,1,0,0,0,580,578,1,0,0,0,581,582,5,3,0,0,582,97,1,0,0,0,583,584,
        5,2,0,0,584,585,5,36,0,0,585,586,5,69,0,0,586,590,3,102,51,0,587,
        589,3,8,4,0,588,587,1,0,0,0,589,592,1,0,0,0,590,588,1,0,0,0,590,
        591,1,0,0,0,591,593,1,0,0,0,592,590,1,0,0,0,593,594,5,3,0,0,594,
        99,1,0,0,0,595,596,5,2,0,0,596,597,5,37,0,0,597,598,5,69,0,0,598,
        602,3,102,51,0,599,601,3,8,4,0,600,599,1,0,0,0,601,604,1,0,0,0,602,
        600,1,0,0,0,602,603,1,0,0,0,603,605,1,0,0,0,604,602,1,0,0,0,605,
        606,5,3,0,0,606,101,1,0,0,0,607,625,3,138,69,0,608,625,5,65,0,0,
        609,625,5,69,0,0,610,625,3,104,52,0,611,625,3,112,56,0,612,625,3,
        116,58,0,613,625,3,118,59,0,614,625,3,120,60,0,615,625,3,122,61,
        0,616,625,3,124,62,0,617,625,3,126,63,0,618,625,3,106,53,0,619,625,
        3,108,54,0,620,625,3,110,55,0,621,625,3,128,64,0,622,625,3,130,65,
        0,623,625,3,132,66,0,624,607,1,0,0,0,624,608,1,0,0,0,624,609,1,0,
        0,0,624,610,1,0,0,0,624,611,1,0,0,0,624,612,1,0,0,0,624,613,1,0,
        0,0,624,614,1,0,0,0,624,615,1,0,0,0,624,616,1,0,0,0,624,617,1,0,
        0,0,624,618,1,0,0,0,624,619,1,0,0,0,624,620,1,0,0,0,624,621,1,0,
        0,0,624,622,1,0,0,0,624,623,1,0,0,0,625,103,1,0,0,0,626,627,5,2,
        0,0,627,628,5,10,0,0,628,632,3,134,67,0,629,631,3,8,4,0,630,629,
        1,0,0,0,631,634,1,0,0,0,632,630,1,0,0,0,632,633,1,0,0,0,633,635,
        1,0,0,0,634,632,1,0,0,0,635,636,5,3,0,0,636,105,1,0,0,0,637,638,
        5,2,0,0,638,639,5,19,0,0,639,640,3,102,51,0,640,641,3,102,51,0,641,
        642,3,102,51,0,642,643,5,3,0,0,643,107,1,0,0,0,644,645,5,2,0,0,645,
        649,5,20,0,0,646,647,3,102,51,0,647,648,3,102,51,0,648,650,1,0,0,
        0,649,646,1,0,0,0,650,651,1,0,0,0,651,649,1,0,0,0,651,652,1,0,0,
        0,652,653,1,0,0,0,653,654,5,3,0,0,654,109,1,0,0,0,655,656,5,2,0,
        0,656,657,5,31,0,0,657,661,5,69,0,0,658,660,3,102,51,0,659,658,1,
        0,0,0,660,663,1,0,0,0,661,659,1,0,0,0,661,662,1,0,0,0,662,664,1,
        0,0,0,663,661,1,0,0,0,664,665,5,3,0,0,665,111,1,0,0,0,666,667,5,
        2,0,0,667,671,5,21,0,0,668,670,3,114,57,0,669,668,1,0,0,0,670,673,
        1,0,0,0,671,669,1,0,0,0,671,672,1,0,0,0,672,674,1,0,0,0,673,671,
        1,0,0,0,674,675,5,3,0,0,675,113,1,0,0,0,676,677,5,2,0,0,677,678,
        7,2,0,0,678,679,3,102,51,0,679,680,5,3,0,0,680,115,1,0,0,0,681,682,
        5,2,0,0,682,686,5,22,0,0,683,685,3,102,51,0,684,683,1,0,0,0,685,
        688,1,0,0,0,686,684,1,0,0,0,686,687,1,0,0,0,687,689,1,0,0,0,688,
        686,1,0,0,0,689,690,5,3,0,0,690,117,1,0,0,0,691,692,5,2,0,0,692,
        693,5,24,0,0,693,694,3,102,51,0,694,695,7,2,0,0,695,696,5,3,0,0,
        696,119,1,0,0,0,697,698,5,2,0,0,698,699,5,25,0,0,699,700,3,102,51,
        0,700,701,3,102,51,0,701,702,5,3,0,0,702,121,1,0,0,0,703,704,5,2,
        0,0,704,705,7,3,0,0,705,706,3,102,51,0,706,707,5,3,0,0,707,123,1,
        0,0,0,708,709,5,2,0,0,709,710,5,30,0,0,710,711,3,102,51,0,711,712,
        5,3,0,0,712,125,1,0,0,0,713,714,5,2,0,0,714,715,5,29,0,0,715,716,
        3,102,51,0,716,717,5,3,0,0,717,127,1,0,0,0,718,719,5,2,0,0,719,720,
        5,23,0,0,720,721,3,102,51,0,721,722,5,69,0,0,722,723,5,3,0,0,723,
        129,1,0,0,0,724,725,5,2,0,0,725,726,5,26,0,0,726,727,3,102,51,0,
        727,728,3,102,51,0,728,729,5,3,0,0,729,131,1,0,0,0,730,731,5,2,0,
        0,731,735,3,102,51,0,732,734,3,102,51,0,733,732,1,0,0,0,734,737,
        1,0,0,0,735,733,1,0,0,0,735,736,1,0,0,0,736,738,1,0,0,0,737,735,
        1,0,0,0,738,739,5,3,0,0,739,133,1,0,0,0,740,751,5,2,0,0,741,748,
        3,136,68,0,742,744,5,4,0,0,743,742,1,0,0,0,743,744,1,0,0,0,744,745,
        1,0,0,0,745,747,3,136,68,0,746,743,1,0,0,0,747,750,1,0,0,0,748,746,
        1,0,0,0,748,749,1,0,0,0,749,752,1,0,0,0,750,748,1,0,0,0,751,741,
        1,0,0,0,751,752,1,0,0,0,752,753,1,0,0,0,753,754,5,3,0,0,754,135,
        1,0,0,0,755,756,5,2,0,0,756,757,5,69,0,0,757,758,5,3,0,0,758,137,
        1,0,0,0,759,760,7,4,0,0,760,139,1,0,0,0,52,145,153,162,189,197,204,
        221,228,244,254,264,272,284,293,302,322,330,340,354,369,374,380,
        390,400,409,414,460,470,481,487,494,503,511,514,517,541,545,555,
        565,578,590,602,624,632,651,661,671,686,735,743,748,751
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
    public FN(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.FN, 0)!;
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
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.RPAREN, 0)!;
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
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.RPAREN, 0)!;
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
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3DParser.IDENTIFIER, 0)!;
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
