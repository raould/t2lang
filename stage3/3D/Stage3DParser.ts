
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
    public static readonly RULE_typeArgs = 67;
    public static readonly RULE_fnSignature = 68;
    public static readonly RULE_param = 69;
    public static readonly RULE_literal = 70;

    public static readonly literalNames = [
        null, null, "'('", "')'", "','", "'program'", "'let*'", "'let'", 
        "'const*'", "'const'", "'lambda'", "'def'", "'defmacro'", "'if'", 
        "'while'", "'begin'", "'return'", "'throw'", "'set!'", "'ternary'", 
        "'cond'", "'object'", "'array'", "'.?'", "'.'", "'index'", "'??'", 
        "'quasi'", "'quote'", "'unquote-splicing'", "'unquote'", "'new'", 
        "'import'", "'switch'", "'case'", "'default'", "'for-in'", "'for-of'", 
        "'for'", "'union'", "'intersect'", "'tuple'", "'fn'", "'tlit'", 
        "'keyof'", "'typeof'", "'infer'", "'mapped'", "'template'", "'rest'", 
        "'readonly'", "'type-params'", "'type-args'", "'extends'", "'returns'", 
        "'type'", "'interface'", "'modifiers'", "'?'", null, "'null'", "'undefined'", 
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
        "optChain", "nullCoalesce", "call", "typeArgs", "fnSignature", "param", 
        "literal",
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
            this.state = 142;
            this.match(Stage3DParser.LPAREN);
            this.state = 143;
            this.match(Stage3DParser.PROGRAM);
            this.state = 147;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 59)) & ~0x1F) === 0 && ((1 << (_la - 59)) & 1479) !== 0)) {
                {
                {
                this.state = 144;
                this.topLevel();
                }
                }
                this.state = 149;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 150;
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
            this.state = 155;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 1, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 152;
                this.defmacro();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 153;
                this.def();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 154;
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
            this.state = 157;
            this.match(Stage3DParser.LPAREN);
            this.state = 158;
            this.match(Stage3DParser.DEFMACRO);
            this.state = 159;
            this.match(Stage3DParser.IDENTIFIER);
            this.state = 160;
            this.fnSignature();
            this.state = 164;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 59)) & ~0x1F) === 0 && ((1 << (_la - 59)) & 1479) !== 0)) {
                {
                {
                this.state = 161;
                this.statement();
                }
                }
                this.state = 166;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 167;
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
            this.state = 169;
            this.match(Stage3DParser.LPAREN);
            this.state = 170;
            this.match(Stage3DParser.DEF);
            this.state = 171;
            this.match(Stage3DParser.IDENTIFIER);
            this.state = 172;
            this.expression();
            this.state = 173;
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
            this.state = 191;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 3, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 175;
                this.letStar();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 176;
                this.letStmt();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 177;
                this.constStar();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 178;
                this.constStmt();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 179;
                this.ifForm();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 180;
                this.whileForm();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 181;
                this.block();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 182;
                this.returnForm();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 183;
                this.throwForm();
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 184;
                this.importForm();
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 185;
                this.switchForm();
                }
                break;
            case 12:
                this.enterOuterAlt(localContext, 12);
                {
                this.state = 186;
                this.forForm();
                }
                break;
            case 13:
                this.enterOuterAlt(localContext, 13);
                {
                this.state = 187;
                this.forInForm();
                }
                break;
            case 14:
                this.enterOuterAlt(localContext, 14);
                {
                this.state = 188;
                this.forOfForm();
                }
                break;
            case 15:
                this.enterOuterAlt(localContext, 15);
                {
                this.state = 189;
                this.assign();
                }
                break;
            case 16:
                this.enterOuterAlt(localContext, 16);
                {
                this.state = 190;
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
            this.state = 193;
            this.match(Stage3DParser.LPAREN);
            this.state = 194;
            this.match(Stage3DParser.LETSTAR);
            this.state = 195;
            this.match(Stage3DParser.LPAREN);
            this.state = 199;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 196;
                this.starBinding();
                }
                }
                this.state = 201;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 202;
            this.match(Stage3DParser.RPAREN);
            this.state = 206;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 59)) & ~0x1F) === 0 && ((1 << (_la - 59)) & 1479) !== 0)) {
                {
                {
                this.state = 203;
                this.statement();
                }
                }
                this.state = 208;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 209;
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
            this.state = 211;
            this.match(Stage3DParser.LPAREN);
            this.state = 212;
            this.match(Stage3DParser.LET);
            this.state = 213;
            this.singleBinding();
            this.state = 214;
            this.expression();
            this.state = 215;
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
            this.state = 217;
            this.match(Stage3DParser.LPAREN);
            this.state = 218;
            this.match(Stage3DParser.CONSTSTAR);
            this.state = 219;
            this.match(Stage3DParser.LPAREN);
            this.state = 223;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 220;
                this.starBinding();
                }
                }
                this.state = 225;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 226;
            this.match(Stage3DParser.RPAREN);
            this.state = 230;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 59)) & ~0x1F) === 0 && ((1 << (_la - 59)) & 1479) !== 0)) {
                {
                {
                this.state = 227;
                this.statement();
                }
                }
                this.state = 232;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 233;
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
            this.state = 235;
            this.match(Stage3DParser.LPAREN);
            this.state = 236;
            this.match(Stage3DParser.CONST);
            this.state = 237;
            this.singleBinding();
            this.state = 238;
            this.expression();
            this.state = 239;
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
            this.state = 241;
            this.match(Stage3DParser.LPAREN);
            this.state = 242;
            this.match(Stage3DParser.IF);
            this.state = 243;
            this.expression();
            this.state = 244;
            this.statement();
            this.state = 246;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2 || ((((_la - 59)) & ~0x1F) === 0 && ((1 << (_la - 59)) & 1479) !== 0)) {
                {
                this.state = 245;
                this.statement();
                }
            }

            this.state = 248;
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
            this.state = 250;
            this.match(Stage3DParser.LPAREN);
            this.state = 251;
            this.match(Stage3DParser.WHILE);
            this.state = 252;
            this.expression();
            this.state = 256;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 59)) & ~0x1F) === 0 && ((1 << (_la - 59)) & 1479) !== 0)) {
                {
                {
                this.state = 253;
                this.statement();
                }
                }
                this.state = 258;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 259;
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
            this.state = 261;
            this.match(Stage3DParser.LPAREN);
            this.state = 262;
            this.match(Stage3DParser.BEGIN);
            this.state = 266;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 59)) & ~0x1F) === 0 && ((1 << (_la - 59)) & 1479) !== 0)) {
                {
                {
                this.state = 263;
                this.statement();
                }
                }
                this.state = 268;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 269;
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
            this.state = 271;
            this.match(Stage3DParser.LPAREN);
            this.state = 272;
            this.match(Stage3DParser.RETURN);
            this.state = 274;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2 || ((((_la - 59)) & ~0x1F) === 0 && ((1 << (_la - 59)) & 1479) !== 0)) {
                {
                this.state = 273;
                this.expression();
                }
            }

            this.state = 276;
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
            this.state = 278;
            this.match(Stage3DParser.LPAREN);
            this.state = 279;
            this.match(Stage3DParser.THROW);
            this.state = 280;
            this.expression();
            this.state = 281;
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
            this.state = 283;
            this.match(Stage3DParser.LPAREN);
            this.state = 284;
            this.match(Stage3DParser.IMPORT);
            this.state = 286;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2) {
                {
                this.state = 285;
                this.objectExpr();
                }
            }

            this.state = 288;
            this.match(Stage3DParser.STRING);
            this.state = 289;
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
            this.state = 291;
            this.match(Stage3DParser.LPAREN);
            this.state = 292;
            this.match(Stage3DParser.IDENTIFIER);
            this.state = 295;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 62) {
                {
                this.state = 293;
                this.match(Stage3DParser.COLON);
                this.state = 294;
                this.typeExpr();
                }
            }

            this.state = 297;
            this.expression();
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
    public singleBinding(): SingleBindingContext {
        let localContext = new SingleBindingContext(this.context, this.state);
        this.enterRule(localContext, 32, Stage3DParser.RULE_singleBinding);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 300;
            this.match(Stage3DParser.LPAREN);
            this.state = 301;
            this.match(Stage3DParser.IDENTIFIER);
            this.state = 304;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 62) {
                {
                this.state = 302;
                this.match(Stage3DParser.COLON);
                this.state = 303;
                this.typeExpr();
                }
            }

            this.state = 306;
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
            this.state = 324;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 15, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 308;
                this.match(Stage3DParser.IDENTIFIER);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 309;
                this.typeUnion();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 310;
                this.typeIntersection();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 311;
                this.typeArray();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 312;
                this.typeTuple();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 313;
                this.typeFunction();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 314;
                this.typeObject();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 315;
                this.typeLiteral();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 316;
                this.typeKeyof();
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 317;
                this.typeTypeof();
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 318;
                this.typeIndexAccess();
                }
                break;
            case 12:
                this.enterOuterAlt(localContext, 12);
                {
                this.state = 319;
                this.typeConditional();
                }
                break;
            case 13:
                this.enterOuterAlt(localContext, 13);
                {
                this.state = 320;
                this.typeInfer();
                }
                break;
            case 14:
                this.enterOuterAlt(localContext, 14);
                {
                this.state = 321;
                this.typeMapped();
                }
                break;
            case 15:
                this.enterOuterAlt(localContext, 15);
                {
                this.state = 322;
                this.typeTemplateLiteral();
                }
                break;
            case 16:
                this.enterOuterAlt(localContext, 16);
                {
                this.state = 323;
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
            this.state = 326;
            this.match(Stage3DParser.LPAREN);
            this.state = 327;
            this.match(Stage3DParser.UNION);
            this.state = 328;
            this.typeExpr();
            this.state = 330;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 329;
                this.typeExpr();
                }
                }
                this.state = 332;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 69);
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
    public typeIntersection(): TypeIntersectionContext {
        let localContext = new TypeIntersectionContext(this.context, this.state);
        this.enterRule(localContext, 38, Stage3DParser.RULE_typeIntersection);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 336;
            this.match(Stage3DParser.LPAREN);
            this.state = 337;
            this.match(Stage3DParser.INTERSECT);
            this.state = 338;
            this.typeExpr();
            this.state = 340;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 339;
                this.typeExpr();
                }
                }
                this.state = 342;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 69);
            this.state = 344;
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
            this.state = 346;
            this.match(Stage3DParser.LPAREN);
            this.state = 347;
            this.match(Stage3DParser.ARRAY);
            this.state = 348;
            this.typeExpr();
            this.state = 349;
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
            this.state = 351;
            this.match(Stage3DParser.LPAREN);
            this.state = 352;
            this.match(Stage3DParser.TUPLE);
            this.state = 354;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 353;
                this.typeTupleElement();
                }
                }
                this.state = 356;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 69);
            this.state = 358;
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
            this.state = 371;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 19, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 360;
                this.match(Stage3DParser.LPAREN);
                this.state = 361;
                this.match(Stage3DParser.REST);
                this.state = 362;
                this.typeExpr();
                this.state = 363;
                this.match(Stage3DParser.RPAREN);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 365;
                this.match(Stage3DParser.LPAREN);
                this.state = 366;
                this.match(Stage3DParser.IDENTIFIER);
                this.state = 367;
                this.typeExpr();
                this.state = 368;
                this.match(Stage3DParser.RPAREN);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 370;
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
            this.state = 373;
            this.match(Stage3DParser.LPAREN);
            this.state = 374;
            this.match(Stage3DParser.FN);
            this.state = 376;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 20, this.context) ) {
            case 1:
                {
                this.state = 375;
                this.typeParams();
                }
                break;
            }
            this.state = 378;
            this.match(Stage3DParser.LPAREN);
            this.state = 382;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 379;
                this.typeFnParam();
                }
                }
                this.state = 384;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 385;
            this.match(Stage3DParser.RPAREN);
            this.state = 386;
            this.typeExpr();
            this.state = 387;
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
            this.state = 389;
            this.match(Stage3DParser.LPAREN);
            this.state = 390;
            this.match(Stage3DParser.IDENTIFIER);
            this.state = 392;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 58) {
                {
                this.state = 391;
                this.match(Stage3DParser.OPTIONAL);
                }
            }

            this.state = 394;
            this.typeExpr();
            this.state = 395;
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
            this.state = 397;
            this.match(Stage3DParser.LPAREN);
            this.state = 398;
            this.match(Stage3DParser.IDENTIFIER);
            this.state = 402;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 399;
                this.typeProp();
                }
                }
                this.state = 404;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 405;
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
            this.state = 407;
            this.match(Stage3DParser.LPAREN);
            this.state = 411;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 50) {
                {
                {
                this.state = 408;
                this.propModifier();
                }
                }
                this.state = 413;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 414;
            this.match(Stage3DParser.IDENTIFIER);
            this.state = 416;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 58) {
                {
                this.state = 415;
                this.match(Stage3DParser.OPTIONAL);
                }
            }

            this.state = 418;
            this.typeExpr();
            this.state = 419;
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
            this.state = 421;
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
            this.state = 423;
            this.match(Stage3DParser.LPAREN);
            this.state = 424;
            this.match(Stage3DParser.LIT);
            this.state = 425;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 59)) & ~0x1F) === 0 && ((1 << (_la - 59)) & 385) !== 0))) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 426;
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
            this.state = 428;
            this.match(Stage3DParser.LPAREN);
            this.state = 429;
            this.match(Stage3DParser.KEYOF);
            this.state = 430;
            this.typeExpr();
            this.state = 431;
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
            this.state = 433;
            this.match(Stage3DParser.LPAREN);
            this.state = 434;
            this.match(Stage3DParser.TYPEOF);
            this.state = 435;
            this.match(Stage3DParser.IDENTIFIER);
            this.state = 436;
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
            this.state = 438;
            this.match(Stage3DParser.LPAREN);
            this.state = 439;
            this.match(Stage3DParser.INDEX);
            this.state = 440;
            this.typeExpr();
            this.state = 441;
            this.typeExpr();
            this.state = 442;
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
            this.state = 444;
            this.match(Stage3DParser.LPAREN);
            this.state = 445;
            this.match(Stage3DParser.COND);
            this.state = 446;
            this.typeExpr();
            this.state = 447;
            this.typeExpr();
            this.state = 448;
            this.typeExpr();
            this.state = 449;
            this.typeExpr();
            this.state = 450;
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
            this.state = 452;
            this.match(Stage3DParser.LPAREN);
            this.state = 453;
            this.match(Stage3DParser.INFER);
            this.state = 454;
            this.match(Stage3DParser.IDENTIFIER);
            this.state = 455;
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
            this.state = 457;
            this.match(Stage3DParser.LPAREN);
            this.state = 458;
            this.match(Stage3DParser.MAPPED);
            this.state = 459;
            this.match(Stage3DParser.IDENTIFIER);
            this.state = 460;
            this.typeExpr();
            this.state = 462;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 26, this.context) ) {
            case 1:
                {
                this.state = 461;
                this.mappedModifiers();
                }
                break;
            }
            this.state = 464;
            this.typeExpr();
            this.state = 465;
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
            this.state = 467;
            this.match(Stage3DParser.LPAREN);
            this.state = 468;
            this.match(Stage3DParser.MODIFIERS);
            this.state = 470;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 469;
                this.mappedModifier();
                }
                }
                this.state = 472;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 50 || _la === 58);
            this.state = 474;
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
            this.state = 476;
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
            this.state = 478;
            this.match(Stage3DParser.LPAREN);
            this.state = 479;
            this.match(Stage3DParser.TEMPLATE);
            this.state = 481;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 480;
                this.templatePart();
                }
                }
                this.state = 483;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 67 || _la === 69);
            this.state = 485;
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
            this.state = 489;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case Stage3DParser.STRING:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 487;
                this.match(Stage3DParser.STRING);
                }
                break;
            case Stage3DParser.LPAREN:
            case Stage3DParser.IDENTIFIER:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 488;
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
            this.state = 491;
            this.match(Stage3DParser.LPAREN);
            this.state = 492;
            this.typeExpr();
            this.state = 494;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 493;
                this.typeExpr();
                }
                }
                this.state = 496;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 69);
            this.state = 498;
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
            this.state = 500;
            this.match(Stage3DParser.LPAREN);
            this.state = 501;
            this.match(Stage3DParser.TYPE_PARAMS);
            this.state = 503;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 502;
                this.typeParamDecl();
                }
                }
                this.state = 505;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 69);
            this.state = 507;
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
            this.state = 519;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case Stage3DParser.IDENTIFIER:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 509;
                this.match(Stage3DParser.IDENTIFIER);
                }
                break;
            case Stage3DParser.LPAREN:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 510;
                this.match(Stage3DParser.LPAREN);
                this.state = 511;
                this.match(Stage3DParser.IDENTIFIER);
                this.state = 513;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 32, this.context) ) {
                case 1:
                    {
                    this.state = 512;
                    this.typeParamConstraint();
                    }
                    break;
                }
                this.state = 516;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 2) {
                    {
                    this.state = 515;
                    this.typeParamDefault();
                    }
                }

                this.state = 518;
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
            this.state = 521;
            this.match(Stage3DParser.LPAREN);
            this.state = 522;
            this.match(Stage3DParser.EXTENDS);
            this.state = 523;
            this.typeExpr();
            this.state = 524;
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
            this.state = 526;
            this.match(Stage3DParser.LPAREN);
            this.state = 527;
            this.match(Stage3DParser.DEFAULT);
            this.state = 528;
            this.typeExpr();
            this.state = 529;
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
            this.state = 531;
            this.match(Stage3DParser.LPAREN);
            this.state = 532;
            this.match(Stage3DParser.SET);
            this.state = 533;
            this.match(Stage3DParser.IDENTIFIER);
            this.state = 534;
            this.expression();
            this.state = 535;
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
            this.state = 537;
            this.match(Stage3DParser.LPAREN);
            this.state = 538;
            this.match(Stage3DParser.SWITCH);
            this.state = 539;
            this.expression();
            this.state = 543;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 35, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 540;
                    this.caseClause();
                    }
                    }
                }
                this.state = 545;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 35, this.context);
            }
            this.state = 547;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2) {
                {
                this.state = 546;
                this.defaultClause();
                }
            }

            this.state = 549;
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
            this.state = 551;
            this.match(Stage3DParser.LPAREN);
            this.state = 552;
            this.match(Stage3DParser.CASE);
            this.state = 553;
            this.expression();
            this.state = 557;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 59)) & ~0x1F) === 0 && ((1 << (_la - 59)) & 1479) !== 0)) {
                {
                {
                this.state = 554;
                this.statement();
                }
                }
                this.state = 559;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
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
    public defaultClause(): DefaultClauseContext {
        let localContext = new DefaultClauseContext(this.context, this.state);
        this.enterRule(localContext, 94, Stage3DParser.RULE_defaultClause);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 562;
            this.match(Stage3DParser.LPAREN);
            this.state = 563;
            this.match(Stage3DParser.DEFAULT);
            this.state = 567;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 59)) & ~0x1F) === 0 && ((1 << (_la - 59)) & 1479) !== 0)) {
                {
                {
                this.state = 564;
                this.statement();
                }
                }
                this.state = 569;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 570;
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
            this.state = 572;
            this.match(Stage3DParser.LPAREN);
            this.state = 573;
            this.match(Stage3DParser.FOR);
            this.state = 574;
            this.letStmt();
            this.state = 575;
            this.expression();
            this.state = 576;
            this.assign();
            this.state = 580;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 59)) & ~0x1F) === 0 && ((1 << (_la - 59)) & 1479) !== 0)) {
                {
                {
                this.state = 577;
                this.statement();
                }
                }
                this.state = 582;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 583;
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
            this.state = 585;
            this.match(Stage3DParser.LPAREN);
            this.state = 586;
            this.match(Stage3DParser.FORIN);
            this.state = 587;
            this.match(Stage3DParser.IDENTIFIER);
            this.state = 588;
            this.expression();
            this.state = 592;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 59)) & ~0x1F) === 0 && ((1 << (_la - 59)) & 1479) !== 0)) {
                {
                {
                this.state = 589;
                this.statement();
                }
                }
                this.state = 594;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 595;
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
            this.state = 597;
            this.match(Stage3DParser.LPAREN);
            this.state = 598;
            this.match(Stage3DParser.FOROF);
            this.state = 599;
            this.match(Stage3DParser.IDENTIFIER);
            this.state = 600;
            this.expression();
            this.state = 604;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 59)) & ~0x1F) === 0 && ((1 << (_la - 59)) & 1479) !== 0)) {
                {
                {
                this.state = 601;
                this.statement();
                }
                }
                this.state = 606;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
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
    public expression(): ExpressionContext {
        let localContext = new ExpressionContext(this.context, this.state);
        this.enterRule(localContext, 102, Stage3DParser.RULE_expression);
        try {
            this.state = 626;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 42, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 609;
                this.literal();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 610;
                this.match(Stage3DParser.KEYWORD);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 611;
                this.match(Stage3DParser.IDENTIFIER);
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 612;
                this.lambda();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 613;
                this.objectExpr();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 614;
                this.arrayExpr();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 615;
                this.propAccess();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 616;
                this.indexAccess();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 617;
                this.quasiquote();
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 618;
                this.unquote();
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 619;
                this.unquoteSplicing();
                }
                break;
            case 12:
                this.enterOuterAlt(localContext, 12);
                {
                this.state = 620;
                this.ternary();
                }
                break;
            case 13:
                this.enterOuterAlt(localContext, 13);
                {
                this.state = 621;
                this.condExpr();
                }
                break;
            case 14:
                this.enterOuterAlt(localContext, 14);
                {
                this.state = 622;
                this.newForm();
                }
                break;
            case 15:
                this.enterOuterAlt(localContext, 15);
                {
                this.state = 623;
                this.optChain();
                }
                break;
            case 16:
                this.enterOuterAlt(localContext, 16);
                {
                this.state = 624;
                this.nullCoalesce();
                }
                break;
            case 17:
                this.enterOuterAlt(localContext, 17);
                {
                this.state = 625;
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
            this.state = 628;
            this.match(Stage3DParser.LPAREN);
            this.state = 629;
            this.match(Stage3DParser.LAMBDA);
            this.state = 630;
            this.fnSignature();
            this.state = 634;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 59)) & ~0x1F) === 0 && ((1 << (_la - 59)) & 1479) !== 0)) {
                {
                {
                this.state = 631;
                this.statement();
                }
                }
                this.state = 636;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 637;
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
            this.state = 639;
            this.match(Stage3DParser.LPAREN);
            this.state = 640;
            this.match(Stage3DParser.TERNARY);
            this.state = 641;
            this.expression();
            this.state = 642;
            this.expression();
            this.state = 643;
            this.expression();
            this.state = 644;
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
            this.state = 646;
            this.match(Stage3DParser.LPAREN);
            this.state = 647;
            this.match(Stage3DParser.COND);
            this.state = 651;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 648;
                this.expression();
                this.state = 649;
                this.expression();
                }
                }
                this.state = 653;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || ((((_la - 59)) & ~0x1F) === 0 && ((1 << (_la - 59)) & 1479) !== 0));
            this.state = 655;
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
            this.state = 657;
            this.match(Stage3DParser.LPAREN);
            this.state = 658;
            this.match(Stage3DParser.NEW);
            this.state = 659;
            this.match(Stage3DParser.IDENTIFIER);
            this.state = 661;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 45, this.context) ) {
            case 1:
                {
                this.state = 660;
                this.typeArgs();
                }
                break;
            }
            this.state = 666;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 59)) & ~0x1F) === 0 && ((1 << (_la - 59)) & 1479) !== 0)) {
                {
                {
                this.state = 663;
                this.expression();
                }
                }
                this.state = 668;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 669;
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
            this.state = 671;
            this.match(Stage3DParser.LPAREN);
            this.state = 672;
            this.match(Stage3DParser.OBJECT);
            this.state = 676;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 673;
                this.objectField();
                }
                }
                this.state = 678;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
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
    public objectField(): ObjectFieldContext {
        let localContext = new ObjectFieldContext(this.context, this.state);
        this.enterRule(localContext, 114, Stage3DParser.RULE_objectField);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 681;
            this.match(Stage3DParser.LPAREN);
            this.state = 682;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 65)) & ~0x1F) === 0 && ((1 << (_la - 65)) & 21) !== 0))) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 683;
            this.expression();
            this.state = 684;
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
            this.state = 686;
            this.match(Stage3DParser.LPAREN);
            this.state = 687;
            this.match(Stage3DParser.ARRAY);
            this.state = 691;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 59)) & ~0x1F) === 0 && ((1 << (_la - 59)) & 1479) !== 0)) {
                {
                {
                this.state = 688;
                this.expression();
                }
                }
                this.state = 693;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 694;
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
            this.state = 696;
            this.match(Stage3DParser.LPAREN);
            this.state = 697;
            this.match(Stage3DParser.DOT);
            this.state = 698;
            this.expression();
            this.state = 699;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 65)) & ~0x1F) === 0 && ((1 << (_la - 65)) & 21) !== 0))) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 700;
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
            this.state = 702;
            this.match(Stage3DParser.LPAREN);
            this.state = 703;
            this.match(Stage3DParser.INDEX);
            this.state = 704;
            this.expression();
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
    public quasiquote(): QuasiquoteContext {
        let localContext = new QuasiquoteContext(this.context, this.state);
        this.enterRule(localContext, 122, Stage3DParser.RULE_quasiquote);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 708;
            this.match(Stage3DParser.LPAREN);
            this.state = 709;
            _la = this.tokenStream.LA(1);
            if(!(_la === 27 || _la === 28)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
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
    public unquote(): UnquoteContext {
        let localContext = new UnquoteContext(this.context, this.state);
        this.enterRule(localContext, 124, Stage3DParser.RULE_unquote);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 713;
            this.match(Stage3DParser.LPAREN);
            this.state = 714;
            this.match(Stage3DParser.UNQUOTE);
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
    public unquoteSplicing(): UnquoteSplicingContext {
        let localContext = new UnquoteSplicingContext(this.context, this.state);
        this.enterRule(localContext, 126, Stage3DParser.RULE_unquoteSplicing);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 718;
            this.match(Stage3DParser.LPAREN);
            this.state = 719;
            this.match(Stage3DParser.UNQUOTE_SPLICING);
            this.state = 720;
            this.expression();
            this.state = 721;
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
            this.state = 723;
            this.match(Stage3DParser.LPAREN);
            this.state = 724;
            this.match(Stage3DParser.OPTCHAIN);
            this.state = 725;
            this.expression();
            this.state = 726;
            this.match(Stage3DParser.IDENTIFIER);
            this.state = 727;
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
            this.state = 729;
            this.match(Stage3DParser.LPAREN);
            this.state = 730;
            this.match(Stage3DParser.NULLCOAL);
            this.state = 731;
            this.expression();
            this.state = 732;
            this.expression();
            this.state = 733;
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
            this.state = 735;
            this.match(Stage3DParser.LPAREN);
            this.state = 736;
            this.expression();
            this.state = 738;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 49, this.context) ) {
            case 1:
                {
                this.state = 737;
                this.typeArgs();
                }
                break;
            }
            this.state = 743;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 59)) & ~0x1F) === 0 && ((1 << (_la - 59)) & 1479) !== 0)) {
                {
                {
                this.state = 740;
                this.expression();
                }
                }
                this.state = 745;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 746;
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
        this.enterRule(localContext, 134, Stage3DParser.RULE_typeArgs);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 748;
            this.match(Stage3DParser.LPAREN);
            this.state = 749;
            this.match(Stage3DParser.TYPE_ARGS);
            this.state = 751;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 750;
                this.typeExpr();
                }
                }
                this.state = 753;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 69);
            this.state = 755;
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
        this.enterRule(localContext, 136, Stage3DParser.RULE_fnSignature);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 757;
            this.match(Stage3DParser.LPAREN);
            this.state = 768;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2) {
                {
                this.state = 758;
                this.param();
                this.state = 765;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 2 || _la === 4) {
                    {
                    {
                    this.state = 760;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    if (_la === 4) {
                        {
                        this.state = 759;
                        this.match(Stage3DParser.COMMA);
                        }
                    }

                    this.state = 762;
                    this.param();
                    }
                    }
                    this.state = 767;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
            }

            this.state = 770;
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
        this.enterRule(localContext, 138, Stage3DParser.RULE_param);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 772;
            this.match(Stage3DParser.LPAREN);
            this.state = 773;
            this.match(Stage3DParser.IDENTIFIER);
            this.state = 774;
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
        this.enterRule(localContext, 140, Stage3DParser.RULE_literal);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 776;
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
        4,1,70,779,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,
        6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,
        2,14,7,14,2,15,7,15,2,16,7,16,2,17,7,17,2,18,7,18,2,19,7,19,2,20,
        7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,24,2,25,7,25,2,26,7,26,
        2,27,7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,31,7,31,2,32,7,32,2,33,
        7,33,2,34,7,34,2,35,7,35,2,36,7,36,2,37,7,37,2,38,7,38,2,39,7,39,
        2,40,7,40,2,41,7,41,2,42,7,42,2,43,7,43,2,44,7,44,2,45,7,45,2,46,
        7,46,2,47,7,47,2,48,7,48,2,49,7,49,2,50,7,50,2,51,7,51,2,52,7,52,
        2,53,7,53,2,54,7,54,2,55,7,55,2,56,7,56,2,57,7,57,2,58,7,58,2,59,
        7,59,2,60,7,60,2,61,7,61,2,62,7,62,2,63,7,63,2,64,7,64,2,65,7,65,
        2,66,7,66,2,67,7,67,2,68,7,68,2,69,7,69,2,70,7,70,1,0,1,0,1,0,5,
        0,146,8,0,10,0,12,0,149,9,0,1,0,1,0,1,1,1,1,1,1,3,1,156,8,1,1,2,
        1,2,1,2,1,2,1,2,5,2,163,8,2,10,2,12,2,166,9,2,1,2,1,2,1,3,1,3,1,
        3,1,3,1,3,1,3,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,
        4,1,4,1,4,1,4,3,4,192,8,4,1,5,1,5,1,5,1,5,5,5,198,8,5,10,5,12,5,
        201,9,5,1,5,1,5,5,5,205,8,5,10,5,12,5,208,9,5,1,5,1,5,1,6,1,6,1,
        6,1,6,1,6,1,6,1,7,1,7,1,7,1,7,5,7,222,8,7,10,7,12,7,225,9,7,1,7,
        1,7,5,7,229,8,7,10,7,12,7,232,9,7,1,7,1,7,1,8,1,8,1,8,1,8,1,8,1,
        8,1,9,1,9,1,9,1,9,1,9,3,9,247,8,9,1,9,1,9,1,10,1,10,1,10,1,10,5,
        10,255,8,10,10,10,12,10,258,9,10,1,10,1,10,1,11,1,11,1,11,5,11,265,
        8,11,10,11,12,11,268,9,11,1,11,1,11,1,12,1,12,1,12,3,12,275,8,12,
        1,12,1,12,1,13,1,13,1,13,1,13,1,13,1,14,1,14,1,14,3,14,287,8,14,
        1,14,1,14,1,14,1,15,1,15,1,15,1,15,3,15,296,8,15,1,15,1,15,1,15,
        1,16,1,16,1,16,1,16,3,16,305,8,16,1,16,1,16,1,17,1,17,1,17,1,17,
        1,17,1,17,1,17,1,17,1,17,1,17,1,17,1,17,1,17,1,17,1,17,1,17,3,17,
        325,8,17,1,18,1,18,1,18,1,18,4,18,331,8,18,11,18,12,18,332,1,18,
        1,18,1,19,1,19,1,19,1,19,4,19,341,8,19,11,19,12,19,342,1,19,1,19,
        1,20,1,20,1,20,1,20,1,20,1,21,1,21,1,21,4,21,355,8,21,11,21,12,21,
        356,1,21,1,21,1,22,1,22,1,22,1,22,1,22,1,22,1,22,1,22,1,22,1,22,
        1,22,3,22,372,8,22,1,23,1,23,1,23,3,23,377,8,23,1,23,1,23,5,23,381,
        8,23,10,23,12,23,384,9,23,1,23,1,23,1,23,1,23,1,24,1,24,1,24,3,24,
        393,8,24,1,24,1,24,1,24,1,25,1,25,1,25,5,25,401,8,25,10,25,12,25,
        404,9,25,1,25,1,25,1,26,1,26,5,26,410,8,26,10,26,12,26,413,9,26,
        1,26,1,26,3,26,417,8,26,1,26,1,26,1,26,1,27,1,27,1,28,1,28,1,28,
        1,28,1,28,1,29,1,29,1,29,1,29,1,29,1,30,1,30,1,30,1,30,1,30,1,31,
        1,31,1,31,1,31,1,31,1,31,1,32,1,32,1,32,1,32,1,32,1,32,1,32,1,32,
        1,33,1,33,1,33,1,33,1,33,1,34,1,34,1,34,1,34,1,34,3,34,463,8,34,
        1,34,1,34,1,34,1,35,1,35,1,35,4,35,471,8,35,11,35,12,35,472,1,35,
        1,35,1,36,1,36,1,37,1,37,1,37,4,37,482,8,37,11,37,12,37,483,1,37,
        1,37,1,38,1,38,3,38,490,8,38,1,39,1,39,1,39,4,39,495,8,39,11,39,
        12,39,496,1,39,1,39,1,40,1,40,1,40,4,40,504,8,40,11,40,12,40,505,
        1,40,1,40,1,41,1,41,1,41,1,41,3,41,514,8,41,1,41,3,41,517,8,41,1,
        41,3,41,520,8,41,1,42,1,42,1,42,1,42,1,42,1,43,1,43,1,43,1,43,1,
        43,1,44,1,44,1,44,1,44,1,44,1,44,1,45,1,45,1,45,1,45,5,45,542,8,
        45,10,45,12,45,545,9,45,1,45,3,45,548,8,45,1,45,1,45,1,46,1,46,1,
        46,1,46,5,46,556,8,46,10,46,12,46,559,9,46,1,46,1,46,1,47,1,47,1,
        47,5,47,566,8,47,10,47,12,47,569,9,47,1,47,1,47,1,48,1,48,1,48,1,
        48,1,48,1,48,5,48,579,8,48,10,48,12,48,582,9,48,1,48,1,48,1,49,1,
        49,1,49,1,49,1,49,5,49,591,8,49,10,49,12,49,594,9,49,1,49,1,49,1,
        50,1,50,1,50,1,50,1,50,5,50,603,8,50,10,50,12,50,606,9,50,1,50,1,
        50,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,
        51,1,51,1,51,1,51,1,51,3,51,627,8,51,1,52,1,52,1,52,1,52,5,52,633,
        8,52,10,52,12,52,636,9,52,1,52,1,52,1,53,1,53,1,53,1,53,1,53,1,53,
        1,53,1,54,1,54,1,54,1,54,1,54,4,54,652,8,54,11,54,12,54,653,1,54,
        1,54,1,55,1,55,1,55,1,55,3,55,662,8,55,1,55,5,55,665,8,55,10,55,
        12,55,668,9,55,1,55,1,55,1,56,1,56,1,56,5,56,675,8,56,10,56,12,56,
        678,9,56,1,56,1,56,1,57,1,57,1,57,1,57,1,57,1,58,1,58,1,58,5,58,
        690,8,58,10,58,12,58,693,9,58,1,58,1,58,1,59,1,59,1,59,1,59,1,59,
        1,59,1,60,1,60,1,60,1,60,1,60,1,60,1,61,1,61,1,61,1,61,1,61,1,62,
        1,62,1,62,1,62,1,62,1,63,1,63,1,63,1,63,1,63,1,64,1,64,1,64,1,64,
        1,64,1,64,1,65,1,65,1,65,1,65,1,65,1,65,1,66,1,66,1,66,3,66,739,
        8,66,1,66,5,66,742,8,66,10,66,12,66,745,9,66,1,66,1,66,1,67,1,67,
        1,67,4,67,752,8,67,11,67,12,67,753,1,67,1,67,1,68,1,68,1,68,3,68,
        761,8,68,1,68,5,68,764,8,68,10,68,12,68,767,9,68,3,68,769,8,68,1,
        68,1,68,1,69,1,69,1,69,1,69,1,70,1,70,1,70,0,0,71,0,2,4,6,8,10,12,
        14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,
        58,60,62,64,66,68,70,72,74,76,78,80,82,84,86,88,90,92,94,96,98,100,
        102,104,106,108,110,112,114,116,118,120,122,124,126,128,130,132,
        134,136,138,140,0,5,2,0,59,59,66,67,2,0,50,50,58,58,3,0,65,65,67,
        67,69,69,1,0,27,28,2,0,59,61,66,67,807,0,142,1,0,0,0,2,155,1,0,0,
        0,4,157,1,0,0,0,6,169,1,0,0,0,8,191,1,0,0,0,10,193,1,0,0,0,12,211,
        1,0,0,0,14,217,1,0,0,0,16,235,1,0,0,0,18,241,1,0,0,0,20,250,1,0,
        0,0,22,261,1,0,0,0,24,271,1,0,0,0,26,278,1,0,0,0,28,283,1,0,0,0,
        30,291,1,0,0,0,32,300,1,0,0,0,34,324,1,0,0,0,36,326,1,0,0,0,38,336,
        1,0,0,0,40,346,1,0,0,0,42,351,1,0,0,0,44,371,1,0,0,0,46,373,1,0,
        0,0,48,389,1,0,0,0,50,397,1,0,0,0,52,407,1,0,0,0,54,421,1,0,0,0,
        56,423,1,0,0,0,58,428,1,0,0,0,60,433,1,0,0,0,62,438,1,0,0,0,64,444,
        1,0,0,0,66,452,1,0,0,0,68,457,1,0,0,0,70,467,1,0,0,0,72,476,1,0,
        0,0,74,478,1,0,0,0,76,489,1,0,0,0,78,491,1,0,0,0,80,500,1,0,0,0,
        82,519,1,0,0,0,84,521,1,0,0,0,86,526,1,0,0,0,88,531,1,0,0,0,90,537,
        1,0,0,0,92,551,1,0,0,0,94,562,1,0,0,0,96,572,1,0,0,0,98,585,1,0,
        0,0,100,597,1,0,0,0,102,626,1,0,0,0,104,628,1,0,0,0,106,639,1,0,
        0,0,108,646,1,0,0,0,110,657,1,0,0,0,112,671,1,0,0,0,114,681,1,0,
        0,0,116,686,1,0,0,0,118,696,1,0,0,0,120,702,1,0,0,0,122,708,1,0,
        0,0,124,713,1,0,0,0,126,718,1,0,0,0,128,723,1,0,0,0,130,729,1,0,
        0,0,132,735,1,0,0,0,134,748,1,0,0,0,136,757,1,0,0,0,138,772,1,0,
        0,0,140,776,1,0,0,0,142,143,5,2,0,0,143,147,5,5,0,0,144,146,3,2,
        1,0,145,144,1,0,0,0,146,149,1,0,0,0,147,145,1,0,0,0,147,148,1,0,
        0,0,148,150,1,0,0,0,149,147,1,0,0,0,150,151,5,3,0,0,151,1,1,0,0,
        0,152,156,3,4,2,0,153,156,3,6,3,0,154,156,3,8,4,0,155,152,1,0,0,
        0,155,153,1,0,0,0,155,154,1,0,0,0,156,3,1,0,0,0,157,158,5,2,0,0,
        158,159,5,12,0,0,159,160,5,69,0,0,160,164,3,136,68,0,161,163,3,8,
        4,0,162,161,1,0,0,0,163,166,1,0,0,0,164,162,1,0,0,0,164,165,1,0,
        0,0,165,167,1,0,0,0,166,164,1,0,0,0,167,168,5,3,0,0,168,5,1,0,0,
        0,169,170,5,2,0,0,170,171,5,11,0,0,171,172,5,69,0,0,172,173,3,102,
        51,0,173,174,5,3,0,0,174,7,1,0,0,0,175,192,3,10,5,0,176,192,3,12,
        6,0,177,192,3,14,7,0,178,192,3,16,8,0,179,192,3,18,9,0,180,192,3,
        20,10,0,181,192,3,22,11,0,182,192,3,24,12,0,183,192,3,26,13,0,184,
        192,3,28,14,0,185,192,3,90,45,0,186,192,3,96,48,0,187,192,3,98,49,
        0,188,192,3,100,50,0,189,192,3,88,44,0,190,192,3,102,51,0,191,175,
        1,0,0,0,191,176,1,0,0,0,191,177,1,0,0,0,191,178,1,0,0,0,191,179,
        1,0,0,0,191,180,1,0,0,0,191,181,1,0,0,0,191,182,1,0,0,0,191,183,
        1,0,0,0,191,184,1,0,0,0,191,185,1,0,0,0,191,186,1,0,0,0,191,187,
        1,0,0,0,191,188,1,0,0,0,191,189,1,0,0,0,191,190,1,0,0,0,192,9,1,
        0,0,0,193,194,5,2,0,0,194,195,5,6,0,0,195,199,5,2,0,0,196,198,3,
        30,15,0,197,196,1,0,0,0,198,201,1,0,0,0,199,197,1,0,0,0,199,200,
        1,0,0,0,200,202,1,0,0,0,201,199,1,0,0,0,202,206,5,3,0,0,203,205,
        3,8,4,0,204,203,1,0,0,0,205,208,1,0,0,0,206,204,1,0,0,0,206,207,
        1,0,0,0,207,209,1,0,0,0,208,206,1,0,0,0,209,210,5,3,0,0,210,11,1,
        0,0,0,211,212,5,2,0,0,212,213,5,7,0,0,213,214,3,32,16,0,214,215,
        3,102,51,0,215,216,5,3,0,0,216,13,1,0,0,0,217,218,5,2,0,0,218,219,
        5,8,0,0,219,223,5,2,0,0,220,222,3,30,15,0,221,220,1,0,0,0,222,225,
        1,0,0,0,223,221,1,0,0,0,223,224,1,0,0,0,224,226,1,0,0,0,225,223,
        1,0,0,0,226,230,5,3,0,0,227,229,3,8,4,0,228,227,1,0,0,0,229,232,
        1,0,0,0,230,228,1,0,0,0,230,231,1,0,0,0,231,233,1,0,0,0,232,230,
        1,0,0,0,233,234,5,3,0,0,234,15,1,0,0,0,235,236,5,2,0,0,236,237,5,
        9,0,0,237,238,3,32,16,0,238,239,3,102,51,0,239,240,5,3,0,0,240,17,
        1,0,0,0,241,242,5,2,0,0,242,243,5,13,0,0,243,244,3,102,51,0,244,
        246,3,8,4,0,245,247,3,8,4,0,246,245,1,0,0,0,246,247,1,0,0,0,247,
        248,1,0,0,0,248,249,5,3,0,0,249,19,1,0,0,0,250,251,5,2,0,0,251,252,
        5,14,0,0,252,256,3,102,51,0,253,255,3,8,4,0,254,253,1,0,0,0,255,
        258,1,0,0,0,256,254,1,0,0,0,256,257,1,0,0,0,257,259,1,0,0,0,258,
        256,1,0,0,0,259,260,5,3,0,0,260,21,1,0,0,0,261,262,5,2,0,0,262,266,
        5,15,0,0,263,265,3,8,4,0,264,263,1,0,0,0,265,268,1,0,0,0,266,264,
        1,0,0,0,266,267,1,0,0,0,267,269,1,0,0,0,268,266,1,0,0,0,269,270,
        5,3,0,0,270,23,1,0,0,0,271,272,5,2,0,0,272,274,5,16,0,0,273,275,
        3,102,51,0,274,273,1,0,0,0,274,275,1,0,0,0,275,276,1,0,0,0,276,277,
        5,3,0,0,277,25,1,0,0,0,278,279,5,2,0,0,279,280,5,17,0,0,280,281,
        3,102,51,0,281,282,5,3,0,0,282,27,1,0,0,0,283,284,5,2,0,0,284,286,
        5,32,0,0,285,287,3,112,56,0,286,285,1,0,0,0,286,287,1,0,0,0,287,
        288,1,0,0,0,288,289,5,67,0,0,289,290,5,3,0,0,290,29,1,0,0,0,291,
        292,5,2,0,0,292,295,5,69,0,0,293,294,5,62,0,0,294,296,3,34,17,0,
        295,293,1,0,0,0,295,296,1,0,0,0,296,297,1,0,0,0,297,298,3,102,51,
        0,298,299,5,3,0,0,299,31,1,0,0,0,300,301,5,2,0,0,301,304,5,69,0,
        0,302,303,5,62,0,0,303,305,3,34,17,0,304,302,1,0,0,0,304,305,1,0,
        0,0,305,306,1,0,0,0,306,307,5,3,0,0,307,33,1,0,0,0,308,325,5,69,
        0,0,309,325,3,36,18,0,310,325,3,38,19,0,311,325,3,40,20,0,312,325,
        3,42,21,0,313,325,3,46,23,0,314,325,3,50,25,0,315,325,3,56,28,0,
        316,325,3,58,29,0,317,325,3,60,30,0,318,325,3,62,31,0,319,325,3,
        64,32,0,320,325,3,66,33,0,321,325,3,68,34,0,322,325,3,74,37,0,323,
        325,3,78,39,0,324,308,1,0,0,0,324,309,1,0,0,0,324,310,1,0,0,0,324,
        311,1,0,0,0,324,312,1,0,0,0,324,313,1,0,0,0,324,314,1,0,0,0,324,
        315,1,0,0,0,324,316,1,0,0,0,324,317,1,0,0,0,324,318,1,0,0,0,324,
        319,1,0,0,0,324,320,1,0,0,0,324,321,1,0,0,0,324,322,1,0,0,0,324,
        323,1,0,0,0,325,35,1,0,0,0,326,327,5,2,0,0,327,328,5,39,0,0,328,
        330,3,34,17,0,329,331,3,34,17,0,330,329,1,0,0,0,331,332,1,0,0,0,
        332,330,1,0,0,0,332,333,1,0,0,0,333,334,1,0,0,0,334,335,5,3,0,0,
        335,37,1,0,0,0,336,337,5,2,0,0,337,338,5,40,0,0,338,340,3,34,17,
        0,339,341,3,34,17,0,340,339,1,0,0,0,341,342,1,0,0,0,342,340,1,0,
        0,0,342,343,1,0,0,0,343,344,1,0,0,0,344,345,5,3,0,0,345,39,1,0,0,
        0,346,347,5,2,0,0,347,348,5,22,0,0,348,349,3,34,17,0,349,350,5,3,
        0,0,350,41,1,0,0,0,351,352,5,2,0,0,352,354,5,41,0,0,353,355,3,44,
        22,0,354,353,1,0,0,0,355,356,1,0,0,0,356,354,1,0,0,0,356,357,1,0,
        0,0,357,358,1,0,0,0,358,359,5,3,0,0,359,43,1,0,0,0,360,361,5,2,0,
        0,361,362,5,49,0,0,362,363,3,34,17,0,363,364,5,3,0,0,364,372,1,0,
        0,0,365,366,5,2,0,0,366,367,5,69,0,0,367,368,3,34,17,0,368,369,5,
        3,0,0,369,372,1,0,0,0,370,372,3,34,17,0,371,360,1,0,0,0,371,365,
        1,0,0,0,371,370,1,0,0,0,372,45,1,0,0,0,373,374,5,2,0,0,374,376,5,
        42,0,0,375,377,3,80,40,0,376,375,1,0,0,0,376,377,1,0,0,0,377,378,
        1,0,0,0,378,382,5,2,0,0,379,381,3,48,24,0,380,379,1,0,0,0,381,384,
        1,0,0,0,382,380,1,0,0,0,382,383,1,0,0,0,383,385,1,0,0,0,384,382,
        1,0,0,0,385,386,5,3,0,0,386,387,3,34,17,0,387,388,5,3,0,0,388,47,
        1,0,0,0,389,390,5,2,0,0,390,392,5,69,0,0,391,393,5,58,0,0,392,391,
        1,0,0,0,392,393,1,0,0,0,393,394,1,0,0,0,394,395,3,34,17,0,395,396,
        5,3,0,0,396,49,1,0,0,0,397,398,5,2,0,0,398,402,5,69,0,0,399,401,
        3,52,26,0,400,399,1,0,0,0,401,404,1,0,0,0,402,400,1,0,0,0,402,403,
        1,0,0,0,403,405,1,0,0,0,404,402,1,0,0,0,405,406,5,3,0,0,406,51,1,
        0,0,0,407,411,5,2,0,0,408,410,3,54,27,0,409,408,1,0,0,0,410,413,
        1,0,0,0,411,409,1,0,0,0,411,412,1,0,0,0,412,414,1,0,0,0,413,411,
        1,0,0,0,414,416,5,69,0,0,415,417,5,58,0,0,416,415,1,0,0,0,416,417,
        1,0,0,0,417,418,1,0,0,0,418,419,3,34,17,0,419,420,5,3,0,0,420,53,
        1,0,0,0,421,422,5,50,0,0,422,55,1,0,0,0,423,424,5,2,0,0,424,425,
        5,43,0,0,425,426,7,0,0,0,426,427,5,3,0,0,427,57,1,0,0,0,428,429,
        5,2,0,0,429,430,5,44,0,0,430,431,3,34,17,0,431,432,5,3,0,0,432,59,
        1,0,0,0,433,434,5,2,0,0,434,435,5,45,0,0,435,436,5,69,0,0,436,437,
        5,3,0,0,437,61,1,0,0,0,438,439,5,2,0,0,439,440,5,25,0,0,440,441,
        3,34,17,0,441,442,3,34,17,0,442,443,5,3,0,0,443,63,1,0,0,0,444,445,
        5,2,0,0,445,446,5,20,0,0,446,447,3,34,17,0,447,448,3,34,17,0,448,
        449,3,34,17,0,449,450,3,34,17,0,450,451,5,3,0,0,451,65,1,0,0,0,452,
        453,5,2,0,0,453,454,5,46,0,0,454,455,5,69,0,0,455,456,5,3,0,0,456,
        67,1,0,0,0,457,458,5,2,0,0,458,459,5,47,0,0,459,460,5,69,0,0,460,
        462,3,34,17,0,461,463,3,70,35,0,462,461,1,0,0,0,462,463,1,0,0,0,
        463,464,1,0,0,0,464,465,3,34,17,0,465,466,5,3,0,0,466,69,1,0,0,0,
        467,468,5,2,0,0,468,470,5,57,0,0,469,471,3,72,36,0,470,469,1,0,0,
        0,471,472,1,0,0,0,472,470,1,0,0,0,472,473,1,0,0,0,473,474,1,0,0,
        0,474,475,5,3,0,0,475,71,1,0,0,0,476,477,7,1,0,0,477,73,1,0,0,0,
        478,479,5,2,0,0,479,481,5,48,0,0,480,482,3,76,38,0,481,480,1,0,0,
        0,482,483,1,0,0,0,483,481,1,0,0,0,483,484,1,0,0,0,484,485,1,0,0,
        0,485,486,5,3,0,0,486,75,1,0,0,0,487,490,5,67,0,0,488,490,3,34,17,
        0,489,487,1,0,0,0,489,488,1,0,0,0,490,77,1,0,0,0,491,492,5,2,0,0,
        492,494,3,34,17,0,493,495,3,34,17,0,494,493,1,0,0,0,495,496,1,0,
        0,0,496,494,1,0,0,0,496,497,1,0,0,0,497,498,1,0,0,0,498,499,5,3,
        0,0,499,79,1,0,0,0,500,501,5,2,0,0,501,503,5,51,0,0,502,504,3,82,
        41,0,503,502,1,0,0,0,504,505,1,0,0,0,505,503,1,0,0,0,505,506,1,0,
        0,0,506,507,1,0,0,0,507,508,5,3,0,0,508,81,1,0,0,0,509,520,5,69,
        0,0,510,511,5,2,0,0,511,513,5,69,0,0,512,514,3,84,42,0,513,512,1,
        0,0,0,513,514,1,0,0,0,514,516,1,0,0,0,515,517,3,86,43,0,516,515,
        1,0,0,0,516,517,1,0,0,0,517,518,1,0,0,0,518,520,5,3,0,0,519,509,
        1,0,0,0,519,510,1,0,0,0,520,83,1,0,0,0,521,522,5,2,0,0,522,523,5,
        53,0,0,523,524,3,34,17,0,524,525,5,3,0,0,525,85,1,0,0,0,526,527,
        5,2,0,0,527,528,5,35,0,0,528,529,3,34,17,0,529,530,5,3,0,0,530,87,
        1,0,0,0,531,532,5,2,0,0,532,533,5,18,0,0,533,534,5,69,0,0,534,535,
        3,102,51,0,535,536,5,3,0,0,536,89,1,0,0,0,537,538,5,2,0,0,538,539,
        5,33,0,0,539,543,3,102,51,0,540,542,3,92,46,0,541,540,1,0,0,0,542,
        545,1,0,0,0,543,541,1,0,0,0,543,544,1,0,0,0,544,547,1,0,0,0,545,
        543,1,0,0,0,546,548,3,94,47,0,547,546,1,0,0,0,547,548,1,0,0,0,548,
        549,1,0,0,0,549,550,5,3,0,0,550,91,1,0,0,0,551,552,5,2,0,0,552,553,
        5,34,0,0,553,557,3,102,51,0,554,556,3,8,4,0,555,554,1,0,0,0,556,
        559,1,0,0,0,557,555,1,0,0,0,557,558,1,0,0,0,558,560,1,0,0,0,559,
        557,1,0,0,0,560,561,5,3,0,0,561,93,1,0,0,0,562,563,5,2,0,0,563,567,
        5,35,0,0,564,566,3,8,4,0,565,564,1,0,0,0,566,569,1,0,0,0,567,565,
        1,0,0,0,567,568,1,0,0,0,568,570,1,0,0,0,569,567,1,0,0,0,570,571,
        5,3,0,0,571,95,1,0,0,0,572,573,5,2,0,0,573,574,5,38,0,0,574,575,
        3,12,6,0,575,576,3,102,51,0,576,580,3,88,44,0,577,579,3,8,4,0,578,
        577,1,0,0,0,579,582,1,0,0,0,580,578,1,0,0,0,580,581,1,0,0,0,581,
        583,1,0,0,0,582,580,1,0,0,0,583,584,5,3,0,0,584,97,1,0,0,0,585,586,
        5,2,0,0,586,587,5,36,0,0,587,588,5,69,0,0,588,592,3,102,51,0,589,
        591,3,8,4,0,590,589,1,0,0,0,591,594,1,0,0,0,592,590,1,0,0,0,592,
        593,1,0,0,0,593,595,1,0,0,0,594,592,1,0,0,0,595,596,5,3,0,0,596,
        99,1,0,0,0,597,598,5,2,0,0,598,599,5,37,0,0,599,600,5,69,0,0,600,
        604,3,102,51,0,601,603,3,8,4,0,602,601,1,0,0,0,603,606,1,0,0,0,604,
        602,1,0,0,0,604,605,1,0,0,0,605,607,1,0,0,0,606,604,1,0,0,0,607,
        608,5,3,0,0,608,101,1,0,0,0,609,627,3,140,70,0,610,627,5,65,0,0,
        611,627,5,69,0,0,612,627,3,104,52,0,613,627,3,112,56,0,614,627,3,
        116,58,0,615,627,3,118,59,0,616,627,3,120,60,0,617,627,3,122,61,
        0,618,627,3,124,62,0,619,627,3,126,63,0,620,627,3,106,53,0,621,627,
        3,108,54,0,622,627,3,110,55,0,623,627,3,128,64,0,624,627,3,130,65,
        0,625,627,3,132,66,0,626,609,1,0,0,0,626,610,1,0,0,0,626,611,1,0,
        0,0,626,612,1,0,0,0,626,613,1,0,0,0,626,614,1,0,0,0,626,615,1,0,
        0,0,626,616,1,0,0,0,626,617,1,0,0,0,626,618,1,0,0,0,626,619,1,0,
        0,0,626,620,1,0,0,0,626,621,1,0,0,0,626,622,1,0,0,0,626,623,1,0,
        0,0,626,624,1,0,0,0,626,625,1,0,0,0,627,103,1,0,0,0,628,629,5,2,
        0,0,629,630,5,10,0,0,630,634,3,136,68,0,631,633,3,8,4,0,632,631,
        1,0,0,0,633,636,1,0,0,0,634,632,1,0,0,0,634,635,1,0,0,0,635,637,
        1,0,0,0,636,634,1,0,0,0,637,638,5,3,0,0,638,105,1,0,0,0,639,640,
        5,2,0,0,640,641,5,19,0,0,641,642,3,102,51,0,642,643,3,102,51,0,643,
        644,3,102,51,0,644,645,5,3,0,0,645,107,1,0,0,0,646,647,5,2,0,0,647,
        651,5,20,0,0,648,649,3,102,51,0,649,650,3,102,51,0,650,652,1,0,0,
        0,651,648,1,0,0,0,652,653,1,0,0,0,653,651,1,0,0,0,653,654,1,0,0,
        0,654,655,1,0,0,0,655,656,5,3,0,0,656,109,1,0,0,0,657,658,5,2,0,
        0,658,659,5,31,0,0,659,661,5,69,0,0,660,662,3,134,67,0,661,660,1,
        0,0,0,661,662,1,0,0,0,662,666,1,0,0,0,663,665,3,102,51,0,664,663,
        1,0,0,0,665,668,1,0,0,0,666,664,1,0,0,0,666,667,1,0,0,0,667,669,
        1,0,0,0,668,666,1,0,0,0,669,670,5,3,0,0,670,111,1,0,0,0,671,672,
        5,2,0,0,672,676,5,21,0,0,673,675,3,114,57,0,674,673,1,0,0,0,675,
        678,1,0,0,0,676,674,1,0,0,0,676,677,1,0,0,0,677,679,1,0,0,0,678,
        676,1,0,0,0,679,680,5,3,0,0,680,113,1,0,0,0,681,682,5,2,0,0,682,
        683,7,2,0,0,683,684,3,102,51,0,684,685,5,3,0,0,685,115,1,0,0,0,686,
        687,5,2,0,0,687,691,5,22,0,0,688,690,3,102,51,0,689,688,1,0,0,0,
        690,693,1,0,0,0,691,689,1,0,0,0,691,692,1,0,0,0,692,694,1,0,0,0,
        693,691,1,0,0,0,694,695,5,3,0,0,695,117,1,0,0,0,696,697,5,2,0,0,
        697,698,5,24,0,0,698,699,3,102,51,0,699,700,7,2,0,0,700,701,5,3,
        0,0,701,119,1,0,0,0,702,703,5,2,0,0,703,704,5,25,0,0,704,705,3,102,
        51,0,705,706,3,102,51,0,706,707,5,3,0,0,707,121,1,0,0,0,708,709,
        5,2,0,0,709,710,7,3,0,0,710,711,3,102,51,0,711,712,5,3,0,0,712,123,
        1,0,0,0,713,714,5,2,0,0,714,715,5,30,0,0,715,716,3,102,51,0,716,
        717,5,3,0,0,717,125,1,0,0,0,718,719,5,2,0,0,719,720,5,29,0,0,720,
        721,3,102,51,0,721,722,5,3,0,0,722,127,1,0,0,0,723,724,5,2,0,0,724,
        725,5,23,0,0,725,726,3,102,51,0,726,727,5,69,0,0,727,728,5,3,0,0,
        728,129,1,0,0,0,729,730,5,2,0,0,730,731,5,26,0,0,731,732,3,102,51,
        0,732,733,3,102,51,0,733,734,5,3,0,0,734,131,1,0,0,0,735,736,5,2,
        0,0,736,738,3,102,51,0,737,739,3,134,67,0,738,737,1,0,0,0,738,739,
        1,0,0,0,739,743,1,0,0,0,740,742,3,102,51,0,741,740,1,0,0,0,742,745,
        1,0,0,0,743,741,1,0,0,0,743,744,1,0,0,0,744,746,1,0,0,0,745,743,
        1,0,0,0,746,747,5,3,0,0,747,133,1,0,0,0,748,749,5,2,0,0,749,751,
        5,52,0,0,750,752,3,34,17,0,751,750,1,0,0,0,752,753,1,0,0,0,753,751,
        1,0,0,0,753,754,1,0,0,0,754,755,1,0,0,0,755,756,5,3,0,0,756,135,
        1,0,0,0,757,768,5,2,0,0,758,765,3,138,69,0,759,761,5,4,0,0,760,759,
        1,0,0,0,760,761,1,0,0,0,761,762,1,0,0,0,762,764,3,138,69,0,763,760,
        1,0,0,0,764,767,1,0,0,0,765,763,1,0,0,0,765,766,1,0,0,0,766,769,
        1,0,0,0,767,765,1,0,0,0,768,758,1,0,0,0,768,769,1,0,0,0,769,770,
        1,0,0,0,770,771,5,3,0,0,771,137,1,0,0,0,772,773,5,2,0,0,773,774,
        5,69,0,0,774,775,5,3,0,0,775,139,1,0,0,0,776,777,7,4,0,0,777,141,
        1,0,0,0,55,147,155,164,191,199,206,223,230,246,256,266,274,286,295,
        304,324,332,342,356,371,376,382,392,402,411,416,462,472,483,489,
        496,505,513,516,519,543,547,557,567,580,592,604,626,634,653,661,
        666,676,691,738,743,753,760,765,768
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
