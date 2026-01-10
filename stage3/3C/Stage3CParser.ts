
import * as antlr from "antlr4ng";
import { Token } from "antlr4ng";

import { Stage3CListener } from "./Stage3CListener.js";
// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;


export class Stage3CParser extends antlr.Parser {
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
    public static readonly BOOLEAN = 39;
    public static readonly NULL = 40;
    public static readonly UNDEFINED = 41;
    public static readonly LBRACK = 42;
    public static readonly RBRACK = 43;
    public static readonly KEYWORD = 44;
    public static readonly NUMBER = 45;
    public static readonly STRING = 46;
    public static readonly MULTILINE_STRING = 47;
    public static readonly IDENTIFIER = 48;
    public static readonly WS = 49;
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
    public static readonly RULE_binding = 15;
    public static readonly RULE_assign = 16;
    public static readonly RULE_switchForm = 17;
    public static readonly RULE_caseClause = 18;
    public static readonly RULE_defaultClause = 19;
    public static readonly RULE_forForm = 20;
    public static readonly RULE_forInForm = 21;
    public static readonly RULE_forOfForm = 22;
    public static readonly RULE_expression = 23;
    public static readonly RULE_lambda = 24;
    public static readonly RULE_ternary = 25;
    public static readonly RULE_condExpr = 26;
    public static readonly RULE_newForm = 27;
    public static readonly RULE_objectExpr = 28;
    public static readonly RULE_objectField = 29;
    public static readonly RULE_arrayExpr = 30;
    public static readonly RULE_propAccess = 31;
    public static readonly RULE_indexAccess = 32;
    public static readonly RULE_quasiquote = 33;
    public static readonly RULE_unquote = 34;
    public static readonly RULE_unquoteSplicing = 35;
    public static readonly RULE_optChain = 36;
    public static readonly RULE_nullCoalesce = 37;
    public static readonly RULE_call = 38;
    public static readonly RULE_fnSignature = 39;
    public static readonly RULE_param = 40;
    public static readonly RULE_literal = 41;

    public static readonly literalNames = [
        null, null, "'('", "')'", "','", "'program'", "'let*'", "'let'", 
        "'const*'", "'const'", "'lambda'", "'def'", "'defmacro'", "'if'", 
        "'while'", "'begin'", "'return'", "'throw'", "'set!'", "'ternary'", 
        "'cond'", "'object'", "'array'", "'.?'", "'.'", "'index'", "'??'", 
        "'quasi'", "'quote'", "'unquote-splicing'", "'unquote'", "'new'", 
        "'import'", "'switch'", "'case'", "'default'", "'for-in'", "'for-of'", 
        "'for'", null, "'null'", "'undefined'", "'['", "']'"
    ];

    public static readonly symbolicNames = [
        null, "COMMENT", "LPAREN", "RPAREN", "COMMA", "PROGRAM", "LETSTAR", 
        "LET", "CONSTSTAR", "CONST", "LAMBDA", "DEF", "DEFMACRO", "IF", 
        "WHILE", "BEGIN", "RETURN", "THROW", "SET", "TERNARY", "COND", "OBJECT", 
        "ARRAY", "OPTCHAIN", "DOT", "INDEX", "NULLCOAL", "QUASI", "QUOTE", 
        "UNQUOTE_SPLICING", "UNQUOTE", "NEW", "IMPORT", "SWITCH", "CASE", 
        "DEFAULT", "FORIN", "FOROF", "FOR", "BOOLEAN", "NULL", "UNDEFINED", 
        "LBRACK", "RBRACK", "KEYWORD", "NUMBER", "STRING", "MULTILINE_STRING", 
        "IDENTIFIER", "WS"
    ];
    public static readonly ruleNames = [
        "program", "topLevel", "defmacro", "def", "statement", "letStar", 
        "letStmt", "constStar", "constStmt", "ifForm", "whileForm", "block", 
        "returnForm", "throwForm", "importForm", "binding", "assign", "switchForm", 
        "caseClause", "defaultClause", "forForm", "forInForm", "forOfForm", 
        "expression", "lambda", "ternary", "condExpr", "newForm", "objectExpr", 
        "objectField", "arrayExpr", "propAccess", "indexAccess", "quasiquote", 
        "unquote", "unquoteSplicing", "optChain", "nullCoalesce", "call", 
        "fnSignature", "param", "literal",
    ];

    public get grammarFileName(): string { return "Stage3C.g4"; }
    public get literalNames(): (string | null)[] { return Stage3CParser.literalNames; }
    public get symbolicNames(): (string | null)[] { return Stage3CParser.symbolicNames; }
    public get ruleNames(): string[] { return Stage3CParser.ruleNames; }
    public get serializedATN(): number[] { return Stage3CParser._serializedATN; }

    protected createFailedPredicateException(predicate?: string, message?: string): antlr.FailedPredicateException {
        return new antlr.FailedPredicateException(this, predicate, message);
    }

    public constructor(input: antlr.TokenStream) {
        super(input);
        this.interpreter = new antlr.ParserATNSimulator(this, Stage3CParser._ATN, Stage3CParser.decisionsToDFA, new antlr.PredictionContextCache());
    }
    public program(): ProgramContext {
        let localContext = new ProgramContext(this.context, this.state);
        this.enterRule(localContext, 0, Stage3CParser.RULE_program);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 84;
            this.match(Stage3CParser.LPAREN);
            this.state = 85;
            this.match(Stage3CParser.PROGRAM);
            this.state = 89;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 39)) & ~0x1F) === 0 && ((1 << (_la - 39)) & 743) !== 0)) {
                {
                {
                this.state = 86;
                this.topLevel();
                }
                }
                this.state = 91;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 92;
            this.match(Stage3CParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 2, Stage3CParser.RULE_topLevel);
        try {
            this.state = 97;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 1, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 94;
                this.defmacro();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 95;
                this.def();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 96;
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
        this.enterRule(localContext, 4, Stage3CParser.RULE_defmacro);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 99;
            this.match(Stage3CParser.LPAREN);
            this.state = 100;
            this.match(Stage3CParser.DEFMACRO);
            this.state = 101;
            this.match(Stage3CParser.IDENTIFIER);
            this.state = 102;
            this.fnSignature();
            this.state = 106;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 39)) & ~0x1F) === 0 && ((1 << (_la - 39)) & 743) !== 0)) {
                {
                {
                this.state = 103;
                this.statement();
                }
                }
                this.state = 108;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 109;
            this.match(Stage3CParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 6, Stage3CParser.RULE_def);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 111;
            this.match(Stage3CParser.LPAREN);
            this.state = 112;
            this.match(Stage3CParser.DEF);
            this.state = 113;
            this.match(Stage3CParser.IDENTIFIER);
            this.state = 114;
            this.expression();
            this.state = 115;
            this.match(Stage3CParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 8, Stage3CParser.RULE_statement);
        try {
            this.state = 133;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 3, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 117;
                this.letStar();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 118;
                this.letStmt();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 119;
                this.constStar();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 120;
                this.constStmt();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 121;
                this.ifForm();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 122;
                this.whileForm();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 123;
                this.block();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 124;
                this.returnForm();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 125;
                this.throwForm();
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 126;
                this.importForm();
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 127;
                this.switchForm();
                }
                break;
            case 12:
                this.enterOuterAlt(localContext, 12);
                {
                this.state = 128;
                this.forForm();
                }
                break;
            case 13:
                this.enterOuterAlt(localContext, 13);
                {
                this.state = 129;
                this.forInForm();
                }
                break;
            case 14:
                this.enterOuterAlt(localContext, 14);
                {
                this.state = 130;
                this.forOfForm();
                }
                break;
            case 15:
                this.enterOuterAlt(localContext, 15);
                {
                this.state = 131;
                this.assign();
                }
                break;
            case 16:
                this.enterOuterAlt(localContext, 16);
                {
                this.state = 132;
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
        this.enterRule(localContext, 10, Stage3CParser.RULE_letStar);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 135;
            this.match(Stage3CParser.LPAREN);
            this.state = 136;
            this.match(Stage3CParser.LETSTAR);
            this.state = 137;
            this.match(Stage3CParser.LPAREN);
            this.state = 141;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 138;
                this.binding();
                }
                }
                this.state = 143;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 144;
            this.match(Stage3CParser.RPAREN);
            this.state = 148;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 39)) & ~0x1F) === 0 && ((1 << (_la - 39)) & 743) !== 0)) {
                {
                {
                this.state = 145;
                this.statement();
                }
                }
                this.state = 150;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 151;
            this.match(Stage3CParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 12, Stage3CParser.RULE_letStmt);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 153;
            this.match(Stage3CParser.LPAREN);
            this.state = 154;
            this.match(Stage3CParser.LET);
            this.state = 155;
            this.match(Stage3CParser.IDENTIFIER);
            this.state = 156;
            this.expression();
            this.state = 157;
            this.match(Stage3CParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 14, Stage3CParser.RULE_constStar);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 159;
            this.match(Stage3CParser.LPAREN);
            this.state = 160;
            this.match(Stage3CParser.CONSTSTAR);
            this.state = 161;
            this.match(Stage3CParser.LPAREN);
            this.state = 165;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 162;
                this.binding();
                }
                }
                this.state = 167;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 168;
            this.match(Stage3CParser.RPAREN);
            this.state = 172;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 39)) & ~0x1F) === 0 && ((1 << (_la - 39)) & 743) !== 0)) {
                {
                {
                this.state = 169;
                this.statement();
                }
                }
                this.state = 174;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 175;
            this.match(Stage3CParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 16, Stage3CParser.RULE_constStmt);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 177;
            this.match(Stage3CParser.LPAREN);
            this.state = 178;
            this.match(Stage3CParser.CONST);
            this.state = 179;
            this.match(Stage3CParser.IDENTIFIER);
            this.state = 180;
            this.expression();
            this.state = 181;
            this.match(Stage3CParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 18, Stage3CParser.RULE_ifForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 183;
            this.match(Stage3CParser.LPAREN);
            this.state = 184;
            this.match(Stage3CParser.IF);
            this.state = 185;
            this.expression();
            this.state = 186;
            this.statement();
            this.state = 188;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2 || ((((_la - 39)) & ~0x1F) === 0 && ((1 << (_la - 39)) & 743) !== 0)) {
                {
                this.state = 187;
                this.statement();
                }
            }

            this.state = 190;
            this.match(Stage3CParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 20, Stage3CParser.RULE_whileForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 192;
            this.match(Stage3CParser.LPAREN);
            this.state = 193;
            this.match(Stage3CParser.WHILE);
            this.state = 194;
            this.expression();
            this.state = 198;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 39)) & ~0x1F) === 0 && ((1 << (_la - 39)) & 743) !== 0)) {
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
            this.match(Stage3CParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 22, Stage3CParser.RULE_block);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 203;
            this.match(Stage3CParser.LPAREN);
            this.state = 204;
            this.match(Stage3CParser.BEGIN);
            this.state = 208;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 39)) & ~0x1F) === 0 && ((1 << (_la - 39)) & 743) !== 0)) {
                {
                {
                this.state = 205;
                this.statement();
                }
                }
                this.state = 210;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 211;
            this.match(Stage3CParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 24, Stage3CParser.RULE_returnForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 213;
            this.match(Stage3CParser.LPAREN);
            this.state = 214;
            this.match(Stage3CParser.RETURN);
            this.state = 216;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2 || ((((_la - 39)) & ~0x1F) === 0 && ((1 << (_la - 39)) & 743) !== 0)) {
                {
                this.state = 215;
                this.expression();
                }
            }

            this.state = 218;
            this.match(Stage3CParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 26, Stage3CParser.RULE_throwForm);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 220;
            this.match(Stage3CParser.LPAREN);
            this.state = 221;
            this.match(Stage3CParser.THROW);
            this.state = 222;
            this.expression();
            this.state = 223;
            this.match(Stage3CParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 28, Stage3CParser.RULE_importForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 225;
            this.match(Stage3CParser.LPAREN);
            this.state = 226;
            this.match(Stage3CParser.IMPORT);
            this.state = 228;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2) {
                {
                this.state = 227;
                this.objectExpr();
                }
            }

            this.state = 230;
            this.match(Stage3CParser.STRING);
            this.state = 231;
            this.match(Stage3CParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public binding(): BindingContext {
        let localContext = new BindingContext(this.context, this.state);
        this.enterRule(localContext, 30, Stage3CParser.RULE_binding);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 233;
            this.match(Stage3CParser.LPAREN);
            this.state = 234;
            this.match(Stage3CParser.IDENTIFIER);
            this.state = 236;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2 || ((((_la - 39)) & ~0x1F) === 0 && ((1 << (_la - 39)) & 743) !== 0)) {
                {
                this.state = 235;
                this.expression();
                }
            }

            this.state = 238;
            this.match(Stage3CParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 32, Stage3CParser.RULE_assign);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 240;
            this.match(Stage3CParser.LPAREN);
            this.state = 241;
            this.match(Stage3CParser.SET);
            this.state = 242;
            this.match(Stage3CParser.IDENTIFIER);
            this.state = 243;
            this.expression();
            this.state = 244;
            this.match(Stage3CParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 34, Stage3CParser.RULE_switchForm);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 246;
            this.match(Stage3CParser.LPAREN);
            this.state = 247;
            this.match(Stage3CParser.SWITCH);
            this.state = 248;
            this.expression();
            this.state = 252;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 14, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 249;
                    this.caseClause();
                    }
                    }
                }
                this.state = 254;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 14, this.context);
            }
            this.state = 256;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2) {
                {
                this.state = 255;
                this.defaultClause();
                }
            }

            this.state = 258;
            this.match(Stage3CParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 36, Stage3CParser.RULE_caseClause);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 260;
            this.match(Stage3CParser.LPAREN);
            this.state = 261;
            this.match(Stage3CParser.CASE);
            this.state = 262;
            this.expression();
            this.state = 266;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 39)) & ~0x1F) === 0 && ((1 << (_la - 39)) & 743) !== 0)) {
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
            this.match(Stage3CParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 38, Stage3CParser.RULE_defaultClause);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 271;
            this.match(Stage3CParser.LPAREN);
            this.state = 272;
            this.match(Stage3CParser.DEFAULT);
            this.state = 276;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 39)) & ~0x1F) === 0 && ((1 << (_la - 39)) & 743) !== 0)) {
                {
                {
                this.state = 273;
                this.statement();
                }
                }
                this.state = 278;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 279;
            this.match(Stage3CParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 40, Stage3CParser.RULE_forForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 281;
            this.match(Stage3CParser.LPAREN);
            this.state = 282;
            this.match(Stage3CParser.FOR);
            this.state = 283;
            this.letStmt();
            this.state = 284;
            this.expression();
            this.state = 285;
            this.assign();
            this.state = 289;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 39)) & ~0x1F) === 0 && ((1 << (_la - 39)) & 743) !== 0)) {
                {
                {
                this.state = 286;
                this.statement();
                }
                }
                this.state = 291;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 292;
            this.match(Stage3CParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 42, Stage3CParser.RULE_forInForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 294;
            this.match(Stage3CParser.LPAREN);
            this.state = 295;
            this.match(Stage3CParser.FORIN);
            this.state = 296;
            this.match(Stage3CParser.IDENTIFIER);
            this.state = 297;
            this.expression();
            this.state = 301;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 39)) & ~0x1F) === 0 && ((1 << (_la - 39)) & 743) !== 0)) {
                {
                {
                this.state = 298;
                this.statement();
                }
                }
                this.state = 303;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 304;
            this.match(Stage3CParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 44, Stage3CParser.RULE_forOfForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 306;
            this.match(Stage3CParser.LPAREN);
            this.state = 307;
            this.match(Stage3CParser.FOROF);
            this.state = 308;
            this.match(Stage3CParser.IDENTIFIER);
            this.state = 309;
            this.expression();
            this.state = 313;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 39)) & ~0x1F) === 0 && ((1 << (_la - 39)) & 743) !== 0)) {
                {
                {
                this.state = 310;
                this.statement();
                }
                }
                this.state = 315;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 316;
            this.match(Stage3CParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 46, Stage3CParser.RULE_expression);
        try {
            this.state = 335;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 21, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 318;
                this.literal();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 319;
                this.match(Stage3CParser.KEYWORD);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 320;
                this.match(Stage3CParser.IDENTIFIER);
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 321;
                this.lambda();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 322;
                this.objectExpr();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 323;
                this.arrayExpr();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 324;
                this.propAccess();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 325;
                this.indexAccess();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 326;
                this.quasiquote();
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 327;
                this.unquote();
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 328;
                this.unquoteSplicing();
                }
                break;
            case 12:
                this.enterOuterAlt(localContext, 12);
                {
                this.state = 329;
                this.ternary();
                }
                break;
            case 13:
                this.enterOuterAlt(localContext, 13);
                {
                this.state = 330;
                this.condExpr();
                }
                break;
            case 14:
                this.enterOuterAlt(localContext, 14);
                {
                this.state = 331;
                this.newForm();
                }
                break;
            case 15:
                this.enterOuterAlt(localContext, 15);
                {
                this.state = 332;
                this.optChain();
                }
                break;
            case 16:
                this.enterOuterAlt(localContext, 16);
                {
                this.state = 333;
                this.nullCoalesce();
                }
                break;
            case 17:
                this.enterOuterAlt(localContext, 17);
                {
                this.state = 334;
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
        this.enterRule(localContext, 48, Stage3CParser.RULE_lambda);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 337;
            this.match(Stage3CParser.LPAREN);
            this.state = 338;
            this.match(Stage3CParser.LAMBDA);
            this.state = 339;
            this.fnSignature();
            this.state = 343;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 39)) & ~0x1F) === 0 && ((1 << (_la - 39)) & 743) !== 0)) {
                {
                {
                this.state = 340;
                this.statement();
                }
                }
                this.state = 345;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 346;
            this.match(Stage3CParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 50, Stage3CParser.RULE_ternary);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 348;
            this.match(Stage3CParser.LPAREN);
            this.state = 349;
            this.match(Stage3CParser.TERNARY);
            this.state = 350;
            this.expression();
            this.state = 351;
            this.expression();
            this.state = 352;
            this.expression();
            this.state = 353;
            this.match(Stage3CParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 52, Stage3CParser.RULE_condExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 355;
            this.match(Stage3CParser.LPAREN);
            this.state = 356;
            this.match(Stage3CParser.COND);
            this.state = 360;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 357;
                this.expression();
                this.state = 358;
                this.expression();
                }
                }
                this.state = 362;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || ((((_la - 39)) & ~0x1F) === 0 && ((1 << (_la - 39)) & 743) !== 0));
            this.state = 364;
            this.match(Stage3CParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 54, Stage3CParser.RULE_newForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 366;
            this.match(Stage3CParser.LPAREN);
            this.state = 367;
            this.match(Stage3CParser.NEW);
            this.state = 368;
            this.match(Stage3CParser.IDENTIFIER);
            this.state = 372;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 39)) & ~0x1F) === 0 && ((1 << (_la - 39)) & 743) !== 0)) {
                {
                {
                this.state = 369;
                this.expression();
                }
                }
                this.state = 374;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 375;
            this.match(Stage3CParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 56, Stage3CParser.RULE_objectExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 377;
            this.match(Stage3CParser.LPAREN);
            this.state = 378;
            this.match(Stage3CParser.OBJECT);
            this.state = 382;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 379;
                this.objectField();
                }
                }
                this.state = 384;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 385;
            this.match(Stage3CParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 58, Stage3CParser.RULE_objectField);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 387;
            this.match(Stage3CParser.LPAREN);
            this.state = 388;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 44)) & ~0x1F) === 0 && ((1 << (_la - 44)) & 21) !== 0))) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 389;
            this.expression();
            this.state = 390;
            this.match(Stage3CParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 60, Stage3CParser.RULE_arrayExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 392;
            this.match(Stage3CParser.LPAREN);
            this.state = 393;
            this.match(Stage3CParser.ARRAY);
            this.state = 397;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 39)) & ~0x1F) === 0 && ((1 << (_la - 39)) & 743) !== 0)) {
                {
                {
                this.state = 394;
                this.expression();
                }
                }
                this.state = 399;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 400;
            this.match(Stage3CParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 62, Stage3CParser.RULE_propAccess);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 402;
            this.match(Stage3CParser.LPAREN);
            this.state = 403;
            this.match(Stage3CParser.DOT);
            this.state = 404;
            this.expression();
            this.state = 405;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 44)) & ~0x1F) === 0 && ((1 << (_la - 44)) & 21) !== 0))) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 406;
            this.match(Stage3CParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 64, Stage3CParser.RULE_indexAccess);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 408;
            this.match(Stage3CParser.LPAREN);
            this.state = 409;
            this.match(Stage3CParser.INDEX);
            this.state = 410;
            this.expression();
            this.state = 411;
            this.expression();
            this.state = 412;
            this.match(Stage3CParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 66, Stage3CParser.RULE_quasiquote);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 414;
            this.match(Stage3CParser.LPAREN);
            this.state = 415;
            _la = this.tokenStream.LA(1);
            if(!(_la === 27 || _la === 28)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 416;
            this.expression();
            this.state = 417;
            this.match(Stage3CParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 68, Stage3CParser.RULE_unquote);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 419;
            this.match(Stage3CParser.LPAREN);
            this.state = 420;
            this.match(Stage3CParser.UNQUOTE);
            this.state = 421;
            this.expression();
            this.state = 422;
            this.match(Stage3CParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 70, Stage3CParser.RULE_unquoteSplicing);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 424;
            this.match(Stage3CParser.LPAREN);
            this.state = 425;
            this.match(Stage3CParser.UNQUOTE_SPLICING);
            this.state = 426;
            this.expression();
            this.state = 427;
            this.match(Stage3CParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 72, Stage3CParser.RULE_optChain);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 429;
            this.match(Stage3CParser.LPAREN);
            this.state = 430;
            this.match(Stage3CParser.OPTCHAIN);
            this.state = 431;
            this.expression();
            this.state = 432;
            this.match(Stage3CParser.IDENTIFIER);
            this.state = 433;
            this.match(Stage3CParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 74, Stage3CParser.RULE_nullCoalesce);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 435;
            this.match(Stage3CParser.LPAREN);
            this.state = 436;
            this.match(Stage3CParser.NULLCOAL);
            this.state = 437;
            this.expression();
            this.state = 438;
            this.expression();
            this.state = 439;
            this.match(Stage3CParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 76, Stage3CParser.RULE_call);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 441;
            this.match(Stage3CParser.LPAREN);
            this.state = 442;
            this.expression();
            this.state = 446;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || ((((_la - 39)) & ~0x1F) === 0 && ((1 << (_la - 39)) & 743) !== 0)) {
                {
                {
                this.state = 443;
                this.expression();
                }
                }
                this.state = 448;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 449;
            this.match(Stage3CParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 78, Stage3CParser.RULE_fnSignature);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 451;
            this.match(Stage3CParser.LPAREN);
            this.state = 462;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2) {
                {
                this.state = 452;
                this.param();
                this.state = 459;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 2 || _la === 4) {
                    {
                    {
                    this.state = 454;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    if (_la === 4) {
                        {
                        this.state = 453;
                        this.match(Stage3CParser.COMMA);
                        }
                    }

                    this.state = 456;
                    this.param();
                    }
                    }
                    this.state = 461;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
            }

            this.state = 464;
            this.match(Stage3CParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 80, Stage3CParser.RULE_param);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 466;
            this.match(Stage3CParser.LPAREN);
            this.state = 467;
            this.match(Stage3CParser.IDENTIFIER);
            this.state = 468;
            this.match(Stage3CParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 82, Stage3CParser.RULE_literal);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 470;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 39)) & ~0x1F) === 0 && ((1 << (_la - 39)) & 199) !== 0))) {
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
        4,1,49,473,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,
        6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,
        2,14,7,14,2,15,7,15,2,16,7,16,2,17,7,17,2,18,7,18,2,19,7,19,2,20,
        7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,24,2,25,7,25,2,26,7,26,
        2,27,7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,31,7,31,2,32,7,32,2,33,
        7,33,2,34,7,34,2,35,7,35,2,36,7,36,2,37,7,37,2,38,7,38,2,39,7,39,
        2,40,7,40,2,41,7,41,1,0,1,0,1,0,5,0,88,8,0,10,0,12,0,91,9,0,1,0,
        1,0,1,1,1,1,1,1,3,1,98,8,1,1,2,1,2,1,2,1,2,1,2,5,2,105,8,2,10,2,
        12,2,108,9,2,1,2,1,2,1,3,1,3,1,3,1,3,1,3,1,3,1,4,1,4,1,4,1,4,1,4,
        1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,3,4,134,8,4,1,5,1,5,
        1,5,1,5,5,5,140,8,5,10,5,12,5,143,9,5,1,5,1,5,5,5,147,8,5,10,5,12,
        5,150,9,5,1,5,1,5,1,6,1,6,1,6,1,6,1,6,1,6,1,7,1,7,1,7,1,7,5,7,164,
        8,7,10,7,12,7,167,9,7,1,7,1,7,5,7,171,8,7,10,7,12,7,174,9,7,1,7,
        1,7,1,8,1,8,1,8,1,8,1,8,1,8,1,9,1,9,1,9,1,9,1,9,3,9,189,8,9,1,9,
        1,9,1,10,1,10,1,10,1,10,5,10,197,8,10,10,10,12,10,200,9,10,1,10,
        1,10,1,11,1,11,1,11,5,11,207,8,11,10,11,12,11,210,9,11,1,11,1,11,
        1,12,1,12,1,12,3,12,217,8,12,1,12,1,12,1,13,1,13,1,13,1,13,1,13,
        1,14,1,14,1,14,3,14,229,8,14,1,14,1,14,1,14,1,15,1,15,1,15,3,15,
        237,8,15,1,15,1,15,1,16,1,16,1,16,1,16,1,16,1,16,1,17,1,17,1,17,
        1,17,5,17,251,8,17,10,17,12,17,254,9,17,1,17,3,17,257,8,17,1,17,
        1,17,1,18,1,18,1,18,1,18,5,18,265,8,18,10,18,12,18,268,9,18,1,18,
        1,18,1,19,1,19,1,19,5,19,275,8,19,10,19,12,19,278,9,19,1,19,1,19,
        1,20,1,20,1,20,1,20,1,20,1,20,5,20,288,8,20,10,20,12,20,291,9,20,
        1,20,1,20,1,21,1,21,1,21,1,21,1,21,5,21,300,8,21,10,21,12,21,303,
        9,21,1,21,1,21,1,22,1,22,1,22,1,22,1,22,5,22,312,8,22,10,22,12,22,
        315,9,22,1,22,1,22,1,23,1,23,1,23,1,23,1,23,1,23,1,23,1,23,1,23,
        1,23,1,23,1,23,1,23,1,23,1,23,1,23,1,23,3,23,336,8,23,1,24,1,24,
        1,24,1,24,5,24,342,8,24,10,24,12,24,345,9,24,1,24,1,24,1,25,1,25,
        1,25,1,25,1,25,1,25,1,25,1,26,1,26,1,26,1,26,1,26,4,26,361,8,26,
        11,26,12,26,362,1,26,1,26,1,27,1,27,1,27,1,27,5,27,371,8,27,10,27,
        12,27,374,9,27,1,27,1,27,1,28,1,28,1,28,5,28,381,8,28,10,28,12,28,
        384,9,28,1,28,1,28,1,29,1,29,1,29,1,29,1,29,1,30,1,30,1,30,5,30,
        396,8,30,10,30,12,30,399,9,30,1,30,1,30,1,31,1,31,1,31,1,31,1,31,
        1,31,1,32,1,32,1,32,1,32,1,32,1,32,1,33,1,33,1,33,1,33,1,33,1,34,
        1,34,1,34,1,34,1,34,1,35,1,35,1,35,1,35,1,35,1,36,1,36,1,36,1,36,
        1,36,1,36,1,37,1,37,1,37,1,37,1,37,1,37,1,38,1,38,1,38,5,38,445,
        8,38,10,38,12,38,448,9,38,1,38,1,38,1,39,1,39,1,39,3,39,455,8,39,
        1,39,5,39,458,8,39,10,39,12,39,461,9,39,3,39,463,8,39,1,39,1,39,
        1,40,1,40,1,40,1,40,1,41,1,41,1,41,0,0,42,0,2,4,6,8,10,12,14,16,
        18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,
        62,64,66,68,70,72,74,76,78,80,82,0,3,3,0,44,44,46,46,48,48,1,0,27,
        28,2,0,39,41,45,46,491,0,84,1,0,0,0,2,97,1,0,0,0,4,99,1,0,0,0,6,
        111,1,0,0,0,8,133,1,0,0,0,10,135,1,0,0,0,12,153,1,0,0,0,14,159,1,
        0,0,0,16,177,1,0,0,0,18,183,1,0,0,0,20,192,1,0,0,0,22,203,1,0,0,
        0,24,213,1,0,0,0,26,220,1,0,0,0,28,225,1,0,0,0,30,233,1,0,0,0,32,
        240,1,0,0,0,34,246,1,0,0,0,36,260,1,0,0,0,38,271,1,0,0,0,40,281,
        1,0,0,0,42,294,1,0,0,0,44,306,1,0,0,0,46,335,1,0,0,0,48,337,1,0,
        0,0,50,348,1,0,0,0,52,355,1,0,0,0,54,366,1,0,0,0,56,377,1,0,0,0,
        58,387,1,0,0,0,60,392,1,0,0,0,62,402,1,0,0,0,64,408,1,0,0,0,66,414,
        1,0,0,0,68,419,1,0,0,0,70,424,1,0,0,0,72,429,1,0,0,0,74,435,1,0,
        0,0,76,441,1,0,0,0,78,451,1,0,0,0,80,466,1,0,0,0,82,470,1,0,0,0,
        84,85,5,2,0,0,85,89,5,5,0,0,86,88,3,2,1,0,87,86,1,0,0,0,88,91,1,
        0,0,0,89,87,1,0,0,0,89,90,1,0,0,0,90,92,1,0,0,0,91,89,1,0,0,0,92,
        93,5,3,0,0,93,1,1,0,0,0,94,98,3,4,2,0,95,98,3,6,3,0,96,98,3,8,4,
        0,97,94,1,0,0,0,97,95,1,0,0,0,97,96,1,0,0,0,98,3,1,0,0,0,99,100,
        5,2,0,0,100,101,5,12,0,0,101,102,5,48,0,0,102,106,3,78,39,0,103,
        105,3,8,4,0,104,103,1,0,0,0,105,108,1,0,0,0,106,104,1,0,0,0,106,
        107,1,0,0,0,107,109,1,0,0,0,108,106,1,0,0,0,109,110,5,3,0,0,110,
        5,1,0,0,0,111,112,5,2,0,0,112,113,5,11,0,0,113,114,5,48,0,0,114,
        115,3,46,23,0,115,116,5,3,0,0,116,7,1,0,0,0,117,134,3,10,5,0,118,
        134,3,12,6,0,119,134,3,14,7,0,120,134,3,16,8,0,121,134,3,18,9,0,
        122,134,3,20,10,0,123,134,3,22,11,0,124,134,3,24,12,0,125,134,3,
        26,13,0,126,134,3,28,14,0,127,134,3,34,17,0,128,134,3,40,20,0,129,
        134,3,42,21,0,130,134,3,44,22,0,131,134,3,32,16,0,132,134,3,46,23,
        0,133,117,1,0,0,0,133,118,1,0,0,0,133,119,1,0,0,0,133,120,1,0,0,
        0,133,121,1,0,0,0,133,122,1,0,0,0,133,123,1,0,0,0,133,124,1,0,0,
        0,133,125,1,0,0,0,133,126,1,0,0,0,133,127,1,0,0,0,133,128,1,0,0,
        0,133,129,1,0,0,0,133,130,1,0,0,0,133,131,1,0,0,0,133,132,1,0,0,
        0,134,9,1,0,0,0,135,136,5,2,0,0,136,137,5,6,0,0,137,141,5,2,0,0,
        138,140,3,30,15,0,139,138,1,0,0,0,140,143,1,0,0,0,141,139,1,0,0,
        0,141,142,1,0,0,0,142,144,1,0,0,0,143,141,1,0,0,0,144,148,5,3,0,
        0,145,147,3,8,4,0,146,145,1,0,0,0,147,150,1,0,0,0,148,146,1,0,0,
        0,148,149,1,0,0,0,149,151,1,0,0,0,150,148,1,0,0,0,151,152,5,3,0,
        0,152,11,1,0,0,0,153,154,5,2,0,0,154,155,5,7,0,0,155,156,5,48,0,
        0,156,157,3,46,23,0,157,158,5,3,0,0,158,13,1,0,0,0,159,160,5,2,0,
        0,160,161,5,8,0,0,161,165,5,2,0,0,162,164,3,30,15,0,163,162,1,0,
        0,0,164,167,1,0,0,0,165,163,1,0,0,0,165,166,1,0,0,0,166,168,1,0,
        0,0,167,165,1,0,0,0,168,172,5,3,0,0,169,171,3,8,4,0,170,169,1,0,
        0,0,171,174,1,0,0,0,172,170,1,0,0,0,172,173,1,0,0,0,173,175,1,0,
        0,0,174,172,1,0,0,0,175,176,5,3,0,0,176,15,1,0,0,0,177,178,5,2,0,
        0,178,179,5,9,0,0,179,180,5,48,0,0,180,181,3,46,23,0,181,182,5,3,
        0,0,182,17,1,0,0,0,183,184,5,2,0,0,184,185,5,13,0,0,185,186,3,46,
        23,0,186,188,3,8,4,0,187,189,3,8,4,0,188,187,1,0,0,0,188,189,1,0,
        0,0,189,190,1,0,0,0,190,191,5,3,0,0,191,19,1,0,0,0,192,193,5,2,0,
        0,193,194,5,14,0,0,194,198,3,46,23,0,195,197,3,8,4,0,196,195,1,0,
        0,0,197,200,1,0,0,0,198,196,1,0,0,0,198,199,1,0,0,0,199,201,1,0,
        0,0,200,198,1,0,0,0,201,202,5,3,0,0,202,21,1,0,0,0,203,204,5,2,0,
        0,204,208,5,15,0,0,205,207,3,8,4,0,206,205,1,0,0,0,207,210,1,0,0,
        0,208,206,1,0,0,0,208,209,1,0,0,0,209,211,1,0,0,0,210,208,1,0,0,
        0,211,212,5,3,0,0,212,23,1,0,0,0,213,214,5,2,0,0,214,216,5,16,0,
        0,215,217,3,46,23,0,216,215,1,0,0,0,216,217,1,0,0,0,217,218,1,0,
        0,0,218,219,5,3,0,0,219,25,1,0,0,0,220,221,5,2,0,0,221,222,5,17,
        0,0,222,223,3,46,23,0,223,224,5,3,0,0,224,27,1,0,0,0,225,226,5,2,
        0,0,226,228,5,32,0,0,227,229,3,56,28,0,228,227,1,0,0,0,228,229,1,
        0,0,0,229,230,1,0,0,0,230,231,5,46,0,0,231,232,5,3,0,0,232,29,1,
        0,0,0,233,234,5,2,0,0,234,236,5,48,0,0,235,237,3,46,23,0,236,235,
        1,0,0,0,236,237,1,0,0,0,237,238,1,0,0,0,238,239,5,3,0,0,239,31,1,
        0,0,0,240,241,5,2,0,0,241,242,5,18,0,0,242,243,5,48,0,0,243,244,
        3,46,23,0,244,245,5,3,0,0,245,33,1,0,0,0,246,247,5,2,0,0,247,248,
        5,33,0,0,248,252,3,46,23,0,249,251,3,36,18,0,250,249,1,0,0,0,251,
        254,1,0,0,0,252,250,1,0,0,0,252,253,1,0,0,0,253,256,1,0,0,0,254,
        252,1,0,0,0,255,257,3,38,19,0,256,255,1,0,0,0,256,257,1,0,0,0,257,
        258,1,0,0,0,258,259,5,3,0,0,259,35,1,0,0,0,260,261,5,2,0,0,261,262,
        5,34,0,0,262,266,3,46,23,0,263,265,3,8,4,0,264,263,1,0,0,0,265,268,
        1,0,0,0,266,264,1,0,0,0,266,267,1,0,0,0,267,269,1,0,0,0,268,266,
        1,0,0,0,269,270,5,3,0,0,270,37,1,0,0,0,271,272,5,2,0,0,272,276,5,
        35,0,0,273,275,3,8,4,0,274,273,1,0,0,0,275,278,1,0,0,0,276,274,1,
        0,0,0,276,277,1,0,0,0,277,279,1,0,0,0,278,276,1,0,0,0,279,280,5,
        3,0,0,280,39,1,0,0,0,281,282,5,2,0,0,282,283,5,38,0,0,283,284,3,
        12,6,0,284,285,3,46,23,0,285,289,3,32,16,0,286,288,3,8,4,0,287,286,
        1,0,0,0,288,291,1,0,0,0,289,287,1,0,0,0,289,290,1,0,0,0,290,292,
        1,0,0,0,291,289,1,0,0,0,292,293,5,3,0,0,293,41,1,0,0,0,294,295,5,
        2,0,0,295,296,5,36,0,0,296,297,5,48,0,0,297,301,3,46,23,0,298,300,
        3,8,4,0,299,298,1,0,0,0,300,303,1,0,0,0,301,299,1,0,0,0,301,302,
        1,0,0,0,302,304,1,0,0,0,303,301,1,0,0,0,304,305,5,3,0,0,305,43,1,
        0,0,0,306,307,5,2,0,0,307,308,5,37,0,0,308,309,5,48,0,0,309,313,
        3,46,23,0,310,312,3,8,4,0,311,310,1,0,0,0,312,315,1,0,0,0,313,311,
        1,0,0,0,313,314,1,0,0,0,314,316,1,0,0,0,315,313,1,0,0,0,316,317,
        5,3,0,0,317,45,1,0,0,0,318,336,3,82,41,0,319,336,5,44,0,0,320,336,
        5,48,0,0,321,336,3,48,24,0,322,336,3,56,28,0,323,336,3,60,30,0,324,
        336,3,62,31,0,325,336,3,64,32,0,326,336,3,66,33,0,327,336,3,68,34,
        0,328,336,3,70,35,0,329,336,3,50,25,0,330,336,3,52,26,0,331,336,
        3,54,27,0,332,336,3,72,36,0,333,336,3,74,37,0,334,336,3,76,38,0,
        335,318,1,0,0,0,335,319,1,0,0,0,335,320,1,0,0,0,335,321,1,0,0,0,
        335,322,1,0,0,0,335,323,1,0,0,0,335,324,1,0,0,0,335,325,1,0,0,0,
        335,326,1,0,0,0,335,327,1,0,0,0,335,328,1,0,0,0,335,329,1,0,0,0,
        335,330,1,0,0,0,335,331,1,0,0,0,335,332,1,0,0,0,335,333,1,0,0,0,
        335,334,1,0,0,0,336,47,1,0,0,0,337,338,5,2,0,0,338,339,5,10,0,0,
        339,343,3,78,39,0,340,342,3,8,4,0,341,340,1,0,0,0,342,345,1,0,0,
        0,343,341,1,0,0,0,343,344,1,0,0,0,344,346,1,0,0,0,345,343,1,0,0,
        0,346,347,5,3,0,0,347,49,1,0,0,0,348,349,5,2,0,0,349,350,5,19,0,
        0,350,351,3,46,23,0,351,352,3,46,23,0,352,353,3,46,23,0,353,354,
        5,3,0,0,354,51,1,0,0,0,355,356,5,2,0,0,356,360,5,20,0,0,357,358,
        3,46,23,0,358,359,3,46,23,0,359,361,1,0,0,0,360,357,1,0,0,0,361,
        362,1,0,0,0,362,360,1,0,0,0,362,363,1,0,0,0,363,364,1,0,0,0,364,
        365,5,3,0,0,365,53,1,0,0,0,366,367,5,2,0,0,367,368,5,31,0,0,368,
        372,5,48,0,0,369,371,3,46,23,0,370,369,1,0,0,0,371,374,1,0,0,0,372,
        370,1,0,0,0,372,373,1,0,0,0,373,375,1,0,0,0,374,372,1,0,0,0,375,
        376,5,3,0,0,376,55,1,0,0,0,377,378,5,2,0,0,378,382,5,21,0,0,379,
        381,3,58,29,0,380,379,1,0,0,0,381,384,1,0,0,0,382,380,1,0,0,0,382,
        383,1,0,0,0,383,385,1,0,0,0,384,382,1,0,0,0,385,386,5,3,0,0,386,
        57,1,0,0,0,387,388,5,2,0,0,388,389,7,0,0,0,389,390,3,46,23,0,390,
        391,5,3,0,0,391,59,1,0,0,0,392,393,5,2,0,0,393,397,5,22,0,0,394,
        396,3,46,23,0,395,394,1,0,0,0,396,399,1,0,0,0,397,395,1,0,0,0,397,
        398,1,0,0,0,398,400,1,0,0,0,399,397,1,0,0,0,400,401,5,3,0,0,401,
        61,1,0,0,0,402,403,5,2,0,0,403,404,5,24,0,0,404,405,3,46,23,0,405,
        406,7,0,0,0,406,407,5,3,0,0,407,63,1,0,0,0,408,409,5,2,0,0,409,410,
        5,25,0,0,410,411,3,46,23,0,411,412,3,46,23,0,412,413,5,3,0,0,413,
        65,1,0,0,0,414,415,5,2,0,0,415,416,7,1,0,0,416,417,3,46,23,0,417,
        418,5,3,0,0,418,67,1,0,0,0,419,420,5,2,0,0,420,421,5,30,0,0,421,
        422,3,46,23,0,422,423,5,3,0,0,423,69,1,0,0,0,424,425,5,2,0,0,425,
        426,5,29,0,0,426,427,3,46,23,0,427,428,5,3,0,0,428,71,1,0,0,0,429,
        430,5,2,0,0,430,431,5,23,0,0,431,432,3,46,23,0,432,433,5,48,0,0,
        433,434,5,3,0,0,434,73,1,0,0,0,435,436,5,2,0,0,436,437,5,26,0,0,
        437,438,3,46,23,0,438,439,3,46,23,0,439,440,5,3,0,0,440,75,1,0,0,
        0,441,442,5,2,0,0,442,446,3,46,23,0,443,445,3,46,23,0,444,443,1,
        0,0,0,445,448,1,0,0,0,446,444,1,0,0,0,446,447,1,0,0,0,447,449,1,
        0,0,0,448,446,1,0,0,0,449,450,5,3,0,0,450,77,1,0,0,0,451,462,5,2,
        0,0,452,459,3,80,40,0,453,455,5,4,0,0,454,453,1,0,0,0,454,455,1,
        0,0,0,455,456,1,0,0,0,456,458,3,80,40,0,457,454,1,0,0,0,458,461,
        1,0,0,0,459,457,1,0,0,0,459,460,1,0,0,0,460,463,1,0,0,0,461,459,
        1,0,0,0,462,452,1,0,0,0,462,463,1,0,0,0,463,464,1,0,0,0,464,465,
        5,3,0,0,465,79,1,0,0,0,466,467,5,2,0,0,467,468,5,48,0,0,468,469,
        5,3,0,0,469,81,1,0,0,0,470,471,7,2,0,0,471,83,1,0,0,0,31,89,97,106,
        133,141,148,165,172,188,198,208,216,228,236,252,256,266,276,289,
        301,313,335,343,362,372,382,397,446,454,459,462
    ];

    private static __ATN: antlr.ATN;
    public static get _ATN(): antlr.ATN {
        if (!Stage3CParser.__ATN) {
            Stage3CParser.__ATN = new antlr.ATNDeserializer().deserialize(Stage3CParser._serializedATN);
        }

        return Stage3CParser.__ATN;
    }


    private static readonly vocabulary = new antlr.Vocabulary(Stage3CParser.literalNames, Stage3CParser.symbolicNames, []);

    public override get vocabulary(): antlr.Vocabulary {
        return Stage3CParser.vocabulary;
    }

    private static readonly decisionsToDFA = Stage3CParser._ATN.decisionToState.map( (ds: antlr.DecisionState, index: number) => new antlr.DFA(ds, index) );
}

export class ProgramContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3CParser.LPAREN, 0)!;
    }
    public PROGRAM(): antlr.TerminalNode {
        return this.getToken(Stage3CParser.PROGRAM, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3CParser.RPAREN, 0)!;
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
        return Stage3CParser.RULE_program;
    }
    public override enterRule(listener: Stage3CListener): void {
        if(listener.enterProgram) {
             listener.enterProgram(this);
        }
    }
    public override exitRule(listener: Stage3CListener): void {
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
        return Stage3CParser.RULE_topLevel;
    }
    public override enterRule(listener: Stage3CListener): void {
        if(listener.enterTopLevel) {
             listener.enterTopLevel(this);
        }
    }
    public override exitRule(listener: Stage3CListener): void {
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
        return this.getToken(Stage3CParser.LPAREN, 0)!;
    }
    public DEFMACRO(): antlr.TerminalNode {
        return this.getToken(Stage3CParser.DEFMACRO, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3CParser.IDENTIFIER, 0)!;
    }
    public fnSignature(): FnSignatureContext {
        return this.getRuleContext(0, FnSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3CParser.RPAREN, 0)!;
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
        return Stage3CParser.RULE_defmacro;
    }
    public override enterRule(listener: Stage3CListener): void {
        if(listener.enterDefmacro) {
             listener.enterDefmacro(this);
        }
    }
    public override exitRule(listener: Stage3CListener): void {
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
        return this.getToken(Stage3CParser.LPAREN, 0)!;
    }
    public DEF(): antlr.TerminalNode {
        return this.getToken(Stage3CParser.DEF, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3CParser.IDENTIFIER, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3CParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3CParser.RULE_def;
    }
    public override enterRule(listener: Stage3CListener): void {
        if(listener.enterDef) {
             listener.enterDef(this);
        }
    }
    public override exitRule(listener: Stage3CListener): void {
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
        return Stage3CParser.RULE_statement;
    }
    public override enterRule(listener: Stage3CListener): void {
        if(listener.enterStatement) {
             listener.enterStatement(this);
        }
    }
    public override exitRule(listener: Stage3CListener): void {
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
    		return this.getTokens(Stage3CParser.LPAREN);
    	} else {
    		return this.getToken(Stage3CParser.LPAREN, i);
    	}
    }
    public LETSTAR(): antlr.TerminalNode {
        return this.getToken(Stage3CParser.LETSTAR, 0)!;
    }
    public RPAREN(): antlr.TerminalNode[];
    public RPAREN(i: number): antlr.TerminalNode | null;
    public RPAREN(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage3CParser.RPAREN);
    	} else {
    		return this.getToken(Stage3CParser.RPAREN, i);
    	}
    }
    public binding(): BindingContext[];
    public binding(i: number): BindingContext | null;
    public binding(i?: number): BindingContext[] | BindingContext | null {
        if (i === undefined) {
            return this.getRuleContexts(BindingContext);
        }

        return this.getRuleContext(i, BindingContext);
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
        return Stage3CParser.RULE_letStar;
    }
    public override enterRule(listener: Stage3CListener): void {
        if(listener.enterLetStar) {
             listener.enterLetStar(this);
        }
    }
    public override exitRule(listener: Stage3CListener): void {
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
        return this.getToken(Stage3CParser.LPAREN, 0)!;
    }
    public LET(): antlr.TerminalNode {
        return this.getToken(Stage3CParser.LET, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3CParser.IDENTIFIER, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3CParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3CParser.RULE_letStmt;
    }
    public override enterRule(listener: Stage3CListener): void {
        if(listener.enterLetStmt) {
             listener.enterLetStmt(this);
        }
    }
    public override exitRule(listener: Stage3CListener): void {
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
    		return this.getTokens(Stage3CParser.LPAREN);
    	} else {
    		return this.getToken(Stage3CParser.LPAREN, i);
    	}
    }
    public CONSTSTAR(): antlr.TerminalNode {
        return this.getToken(Stage3CParser.CONSTSTAR, 0)!;
    }
    public RPAREN(): antlr.TerminalNode[];
    public RPAREN(i: number): antlr.TerminalNode | null;
    public RPAREN(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage3CParser.RPAREN);
    	} else {
    		return this.getToken(Stage3CParser.RPAREN, i);
    	}
    }
    public binding(): BindingContext[];
    public binding(i: number): BindingContext | null;
    public binding(i?: number): BindingContext[] | BindingContext | null {
        if (i === undefined) {
            return this.getRuleContexts(BindingContext);
        }

        return this.getRuleContext(i, BindingContext);
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
        return Stage3CParser.RULE_constStar;
    }
    public override enterRule(listener: Stage3CListener): void {
        if(listener.enterConstStar) {
             listener.enterConstStar(this);
        }
    }
    public override exitRule(listener: Stage3CListener): void {
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
        return this.getToken(Stage3CParser.LPAREN, 0)!;
    }
    public CONST(): antlr.TerminalNode {
        return this.getToken(Stage3CParser.CONST, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3CParser.IDENTIFIER, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3CParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3CParser.RULE_constStmt;
    }
    public override enterRule(listener: Stage3CListener): void {
        if(listener.enterConstStmt) {
             listener.enterConstStmt(this);
        }
    }
    public override exitRule(listener: Stage3CListener): void {
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
        return this.getToken(Stage3CParser.LPAREN, 0)!;
    }
    public IF(): antlr.TerminalNode {
        return this.getToken(Stage3CParser.IF, 0)!;
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
        return this.getToken(Stage3CParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3CParser.RULE_ifForm;
    }
    public override enterRule(listener: Stage3CListener): void {
        if(listener.enterIfForm) {
             listener.enterIfForm(this);
        }
    }
    public override exitRule(listener: Stage3CListener): void {
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
        return this.getToken(Stage3CParser.LPAREN, 0)!;
    }
    public WHILE(): antlr.TerminalNode {
        return this.getToken(Stage3CParser.WHILE, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3CParser.RPAREN, 0)!;
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
        return Stage3CParser.RULE_whileForm;
    }
    public override enterRule(listener: Stage3CListener): void {
        if(listener.enterWhileForm) {
             listener.enterWhileForm(this);
        }
    }
    public override exitRule(listener: Stage3CListener): void {
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
        return this.getToken(Stage3CParser.LPAREN, 0)!;
    }
    public BEGIN(): antlr.TerminalNode {
        return this.getToken(Stage3CParser.BEGIN, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3CParser.RPAREN, 0)!;
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
        return Stage3CParser.RULE_block;
    }
    public override enterRule(listener: Stage3CListener): void {
        if(listener.enterBlock) {
             listener.enterBlock(this);
        }
    }
    public override exitRule(listener: Stage3CListener): void {
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
        return this.getToken(Stage3CParser.LPAREN, 0)!;
    }
    public RETURN(): antlr.TerminalNode {
        return this.getToken(Stage3CParser.RETURN, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3CParser.RPAREN, 0)!;
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public override get ruleIndex(): number {
        return Stage3CParser.RULE_returnForm;
    }
    public override enterRule(listener: Stage3CListener): void {
        if(listener.enterReturnForm) {
             listener.enterReturnForm(this);
        }
    }
    public override exitRule(listener: Stage3CListener): void {
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
        return this.getToken(Stage3CParser.LPAREN, 0)!;
    }
    public THROW(): antlr.TerminalNode {
        return this.getToken(Stage3CParser.THROW, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3CParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3CParser.RULE_throwForm;
    }
    public override enterRule(listener: Stage3CListener): void {
        if(listener.enterThrowForm) {
             listener.enterThrowForm(this);
        }
    }
    public override exitRule(listener: Stage3CListener): void {
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
        return this.getToken(Stage3CParser.LPAREN, 0)!;
    }
    public IMPORT(): antlr.TerminalNode {
        return this.getToken(Stage3CParser.IMPORT, 0)!;
    }
    public STRING(): antlr.TerminalNode {
        return this.getToken(Stage3CParser.STRING, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3CParser.RPAREN, 0)!;
    }
    public objectExpr(): ObjectExprContext | null {
        return this.getRuleContext(0, ObjectExprContext);
    }
    public override get ruleIndex(): number {
        return Stage3CParser.RULE_importForm;
    }
    public override enterRule(listener: Stage3CListener): void {
        if(listener.enterImportForm) {
             listener.enterImportForm(this);
        }
    }
    public override exitRule(listener: Stage3CListener): void {
        if(listener.exitImportForm) {
             listener.exitImportForm(this);
        }
    }
}


export class BindingContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3CParser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3CParser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3CParser.RPAREN, 0)!;
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public override get ruleIndex(): number {
        return Stage3CParser.RULE_binding;
    }
    public override enterRule(listener: Stage3CListener): void {
        if(listener.enterBinding) {
             listener.enterBinding(this);
        }
    }
    public override exitRule(listener: Stage3CListener): void {
        if(listener.exitBinding) {
             listener.exitBinding(this);
        }
    }
}


export class AssignContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3CParser.LPAREN, 0)!;
    }
    public SET(): antlr.TerminalNode {
        return this.getToken(Stage3CParser.SET, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3CParser.IDENTIFIER, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3CParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3CParser.RULE_assign;
    }
    public override enterRule(listener: Stage3CListener): void {
        if(listener.enterAssign) {
             listener.enterAssign(this);
        }
    }
    public override exitRule(listener: Stage3CListener): void {
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
        return this.getToken(Stage3CParser.LPAREN, 0)!;
    }
    public SWITCH(): antlr.TerminalNode {
        return this.getToken(Stage3CParser.SWITCH, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3CParser.RPAREN, 0)!;
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
        return Stage3CParser.RULE_switchForm;
    }
    public override enterRule(listener: Stage3CListener): void {
        if(listener.enterSwitchForm) {
             listener.enterSwitchForm(this);
        }
    }
    public override exitRule(listener: Stage3CListener): void {
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
        return this.getToken(Stage3CParser.LPAREN, 0)!;
    }
    public CASE(): antlr.TerminalNode {
        return this.getToken(Stage3CParser.CASE, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3CParser.RPAREN, 0)!;
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
        return Stage3CParser.RULE_caseClause;
    }
    public override enterRule(listener: Stage3CListener): void {
        if(listener.enterCaseClause) {
             listener.enterCaseClause(this);
        }
    }
    public override exitRule(listener: Stage3CListener): void {
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
        return this.getToken(Stage3CParser.LPAREN, 0)!;
    }
    public DEFAULT(): antlr.TerminalNode {
        return this.getToken(Stage3CParser.DEFAULT, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3CParser.RPAREN, 0)!;
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
        return Stage3CParser.RULE_defaultClause;
    }
    public override enterRule(listener: Stage3CListener): void {
        if(listener.enterDefaultClause) {
             listener.enterDefaultClause(this);
        }
    }
    public override exitRule(listener: Stage3CListener): void {
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
        return this.getToken(Stage3CParser.LPAREN, 0)!;
    }
    public FOR(): antlr.TerminalNode {
        return this.getToken(Stage3CParser.FOR, 0)!;
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
        return this.getToken(Stage3CParser.RPAREN, 0)!;
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
        return Stage3CParser.RULE_forForm;
    }
    public override enterRule(listener: Stage3CListener): void {
        if(listener.enterForForm) {
             listener.enterForForm(this);
        }
    }
    public override exitRule(listener: Stage3CListener): void {
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
        return this.getToken(Stage3CParser.LPAREN, 0)!;
    }
    public FORIN(): antlr.TerminalNode {
        return this.getToken(Stage3CParser.FORIN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3CParser.IDENTIFIER, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3CParser.RPAREN, 0)!;
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
        return Stage3CParser.RULE_forInForm;
    }
    public override enterRule(listener: Stage3CListener): void {
        if(listener.enterForInForm) {
             listener.enterForInForm(this);
        }
    }
    public override exitRule(listener: Stage3CListener): void {
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
        return this.getToken(Stage3CParser.LPAREN, 0)!;
    }
    public FOROF(): antlr.TerminalNode {
        return this.getToken(Stage3CParser.FOROF, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3CParser.IDENTIFIER, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3CParser.RPAREN, 0)!;
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
        return Stage3CParser.RULE_forOfForm;
    }
    public override enterRule(listener: Stage3CListener): void {
        if(listener.enterForOfForm) {
             listener.enterForOfForm(this);
        }
    }
    public override exitRule(listener: Stage3CListener): void {
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
        return this.getToken(Stage3CParser.KEYWORD, 0);
    }
    public IDENTIFIER(): antlr.TerminalNode | null {
        return this.getToken(Stage3CParser.IDENTIFIER, 0);
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
        return Stage3CParser.RULE_expression;
    }
    public override enterRule(listener: Stage3CListener): void {
        if(listener.enterExpression) {
             listener.enterExpression(this);
        }
    }
    public override exitRule(listener: Stage3CListener): void {
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
        return this.getToken(Stage3CParser.LPAREN, 0)!;
    }
    public LAMBDA(): antlr.TerminalNode {
        return this.getToken(Stage3CParser.LAMBDA, 0)!;
    }
    public fnSignature(): FnSignatureContext {
        return this.getRuleContext(0, FnSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3CParser.RPAREN, 0)!;
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
        return Stage3CParser.RULE_lambda;
    }
    public override enterRule(listener: Stage3CListener): void {
        if(listener.enterLambda) {
             listener.enterLambda(this);
        }
    }
    public override exitRule(listener: Stage3CListener): void {
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
        return this.getToken(Stage3CParser.LPAREN, 0)!;
    }
    public TERNARY(): antlr.TerminalNode {
        return this.getToken(Stage3CParser.TERNARY, 0)!;
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
        return this.getToken(Stage3CParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3CParser.RULE_ternary;
    }
    public override enterRule(listener: Stage3CListener): void {
        if(listener.enterTernary) {
             listener.enterTernary(this);
        }
    }
    public override exitRule(listener: Stage3CListener): void {
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
        return this.getToken(Stage3CParser.LPAREN, 0)!;
    }
    public COND(): antlr.TerminalNode {
        return this.getToken(Stage3CParser.COND, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3CParser.RPAREN, 0)!;
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
        return Stage3CParser.RULE_condExpr;
    }
    public override enterRule(listener: Stage3CListener): void {
        if(listener.enterCondExpr) {
             listener.enterCondExpr(this);
        }
    }
    public override exitRule(listener: Stage3CListener): void {
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
        return this.getToken(Stage3CParser.LPAREN, 0)!;
    }
    public NEW(): antlr.TerminalNode {
        return this.getToken(Stage3CParser.NEW, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3CParser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3CParser.RPAREN, 0)!;
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
        return Stage3CParser.RULE_newForm;
    }
    public override enterRule(listener: Stage3CListener): void {
        if(listener.enterNewForm) {
             listener.enterNewForm(this);
        }
    }
    public override exitRule(listener: Stage3CListener): void {
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
        return this.getToken(Stage3CParser.LPAREN, 0)!;
    }
    public OBJECT(): antlr.TerminalNode {
        return this.getToken(Stage3CParser.OBJECT, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3CParser.RPAREN, 0)!;
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
        return Stage3CParser.RULE_objectExpr;
    }
    public override enterRule(listener: Stage3CListener): void {
        if(listener.enterObjectExpr) {
             listener.enterObjectExpr(this);
        }
    }
    public override exitRule(listener: Stage3CListener): void {
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
        return this.getToken(Stage3CParser.LPAREN, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3CParser.RPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode | null {
        return this.getToken(Stage3CParser.IDENTIFIER, 0);
    }
    public KEYWORD(): antlr.TerminalNode | null {
        return this.getToken(Stage3CParser.KEYWORD, 0);
    }
    public STRING(): antlr.TerminalNode | null {
        return this.getToken(Stage3CParser.STRING, 0);
    }
    public override get ruleIndex(): number {
        return Stage3CParser.RULE_objectField;
    }
    public override enterRule(listener: Stage3CListener): void {
        if(listener.enterObjectField) {
             listener.enterObjectField(this);
        }
    }
    public override exitRule(listener: Stage3CListener): void {
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
        return this.getToken(Stage3CParser.LPAREN, 0)!;
    }
    public ARRAY(): antlr.TerminalNode {
        return this.getToken(Stage3CParser.ARRAY, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3CParser.RPAREN, 0)!;
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
        return Stage3CParser.RULE_arrayExpr;
    }
    public override enterRule(listener: Stage3CListener): void {
        if(listener.enterArrayExpr) {
             listener.enterArrayExpr(this);
        }
    }
    public override exitRule(listener: Stage3CListener): void {
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
        return this.getToken(Stage3CParser.LPAREN, 0)!;
    }
    public DOT(): antlr.TerminalNode {
        return this.getToken(Stage3CParser.DOT, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3CParser.RPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode | null {
        return this.getToken(Stage3CParser.IDENTIFIER, 0);
    }
    public KEYWORD(): antlr.TerminalNode | null {
        return this.getToken(Stage3CParser.KEYWORD, 0);
    }
    public STRING(): antlr.TerminalNode | null {
        return this.getToken(Stage3CParser.STRING, 0);
    }
    public override get ruleIndex(): number {
        return Stage3CParser.RULE_propAccess;
    }
    public override enterRule(listener: Stage3CListener): void {
        if(listener.enterPropAccess) {
             listener.enterPropAccess(this);
        }
    }
    public override exitRule(listener: Stage3CListener): void {
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
        return this.getToken(Stage3CParser.LPAREN, 0)!;
    }
    public INDEX(): antlr.TerminalNode {
        return this.getToken(Stage3CParser.INDEX, 0)!;
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
        return this.getToken(Stage3CParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3CParser.RULE_indexAccess;
    }
    public override enterRule(listener: Stage3CListener): void {
        if(listener.enterIndexAccess) {
             listener.enterIndexAccess(this);
        }
    }
    public override exitRule(listener: Stage3CListener): void {
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
        return this.getToken(Stage3CParser.LPAREN, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3CParser.RPAREN, 0)!;
    }
    public QUASI(): antlr.TerminalNode | null {
        return this.getToken(Stage3CParser.QUASI, 0);
    }
    public QUOTE(): antlr.TerminalNode | null {
        return this.getToken(Stage3CParser.QUOTE, 0);
    }
    public override get ruleIndex(): number {
        return Stage3CParser.RULE_quasiquote;
    }
    public override enterRule(listener: Stage3CListener): void {
        if(listener.enterQuasiquote) {
             listener.enterQuasiquote(this);
        }
    }
    public override exitRule(listener: Stage3CListener): void {
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
        return this.getToken(Stage3CParser.LPAREN, 0)!;
    }
    public UNQUOTE(): antlr.TerminalNode {
        return this.getToken(Stage3CParser.UNQUOTE, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3CParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3CParser.RULE_unquote;
    }
    public override enterRule(listener: Stage3CListener): void {
        if(listener.enterUnquote) {
             listener.enterUnquote(this);
        }
    }
    public override exitRule(listener: Stage3CListener): void {
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
        return this.getToken(Stage3CParser.LPAREN, 0)!;
    }
    public UNQUOTE_SPLICING(): antlr.TerminalNode {
        return this.getToken(Stage3CParser.UNQUOTE_SPLICING, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3CParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3CParser.RULE_unquoteSplicing;
    }
    public override enterRule(listener: Stage3CListener): void {
        if(listener.enterUnquoteSplicing) {
             listener.enterUnquoteSplicing(this);
        }
    }
    public override exitRule(listener: Stage3CListener): void {
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
        return this.getToken(Stage3CParser.LPAREN, 0)!;
    }
    public OPTCHAIN(): antlr.TerminalNode {
        return this.getToken(Stage3CParser.OPTCHAIN, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3CParser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3CParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3CParser.RULE_optChain;
    }
    public override enterRule(listener: Stage3CListener): void {
        if(listener.enterOptChain) {
             listener.enterOptChain(this);
        }
    }
    public override exitRule(listener: Stage3CListener): void {
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
        return this.getToken(Stage3CParser.LPAREN, 0)!;
    }
    public NULLCOAL(): antlr.TerminalNode {
        return this.getToken(Stage3CParser.NULLCOAL, 0)!;
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
        return this.getToken(Stage3CParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3CParser.RULE_nullCoalesce;
    }
    public override enterRule(listener: Stage3CListener): void {
        if(listener.enterNullCoalesce) {
             listener.enterNullCoalesce(this);
        }
    }
    public override exitRule(listener: Stage3CListener): void {
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
        return this.getToken(Stage3CParser.LPAREN, 0)!;
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
        return this.getToken(Stage3CParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3CParser.RULE_call;
    }
    public override enterRule(listener: Stage3CListener): void {
        if(listener.enterCall) {
             listener.enterCall(this);
        }
    }
    public override exitRule(listener: Stage3CListener): void {
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
        return this.getToken(Stage3CParser.LPAREN, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3CParser.RPAREN, 0)!;
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
    		return this.getTokens(Stage3CParser.COMMA);
    	} else {
    		return this.getToken(Stage3CParser.COMMA, i);
    	}
    }
    public override get ruleIndex(): number {
        return Stage3CParser.RULE_fnSignature;
    }
    public override enterRule(listener: Stage3CListener): void {
        if(listener.enterFnSignature) {
             listener.enterFnSignature(this);
        }
    }
    public override exitRule(listener: Stage3CListener): void {
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
        return this.getToken(Stage3CParser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3CParser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3CParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3CParser.RULE_param;
    }
    public override enterRule(listener: Stage3CListener): void {
        if(listener.enterParam) {
             listener.enterParam(this);
        }
    }
    public override exitRule(listener: Stage3CListener): void {
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
        return this.getToken(Stage3CParser.NUMBER, 0);
    }
    public STRING(): antlr.TerminalNode | null {
        return this.getToken(Stage3CParser.STRING, 0);
    }
    public BOOLEAN(): antlr.TerminalNode | null {
        return this.getToken(Stage3CParser.BOOLEAN, 0);
    }
    public NULL(): antlr.TerminalNode | null {
        return this.getToken(Stage3CParser.NULL, 0);
    }
    public UNDEFINED(): antlr.TerminalNode | null {
        return this.getToken(Stage3CParser.UNDEFINED, 0);
    }
    public override get ruleIndex(): number {
        return Stage3CParser.RULE_literal;
    }
    public override enterRule(listener: Stage3CListener): void {
        if(listener.enterLiteral) {
             listener.enterLiteral(this);
        }
    }
    public override exitRule(listener: Stage3CListener): void {
        if(listener.exitLiteral) {
             listener.exitLiteral(this);
        }
    }
}
