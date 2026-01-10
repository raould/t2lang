
import * as antlr from "antlr4ng";
import { Token } from "antlr4ng";

import { Stage3BListener } from "./Stage3BListener.js";
// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;


export class Stage3BParser extends antlr.Parser {
    public static readonly COMMENT = 1;
    public static readonly LPAREN = 2;
    public static readonly RPAREN = 3;
    public static readonly COMMA = 4;
    public static readonly PROGRAM = 5;
    public static readonly LETSTAR = 6;
    public static readonly LET = 7;
    public static readonly LAMBDA = 8;
    public static readonly DEF = 9;
    public static readonly DEFMACRO = 10;
    public static readonly IF = 11;
    public static readonly WHILE = 12;
    public static readonly BEGIN = 13;
    public static readonly RETURN = 14;
    public static readonly SET = 15;
    public static readonly TERNARY = 16;
    public static readonly COND = 17;
    public static readonly OBJECT = 18;
    public static readonly ARRAY = 19;
    public static readonly OPTCHAIN = 20;
    public static readonly DOT = 21;
    public static readonly INDEX = 22;
    public static readonly NULLCOAL = 23;
    public static readonly QUASI = 24;
    public static readonly QUOTE = 25;
    public static readonly UNQUOTE_SPLICING = 26;
    public static readonly UNQUOTE = 27;
    public static readonly NEW = 28;
    public static readonly THROW = 29;
    public static readonly IMPORT = 30;
    public static readonly BOOLEAN = 31;
    public static readonly NULL = 32;
    public static readonly UNDEFINED = 33;
    public static readonly LBRACK = 34;
    public static readonly RBRACK = 35;
    public static readonly KEYWORD = 36;
    public static readonly NUMBER = 37;
    public static readonly STRING = 38;
    public static readonly MULTILINE_STRING = 39;
    public static readonly IDENTIFIER = 40;
    public static readonly WS = 41;
    public static readonly RULE_program = 0;
    public static readonly RULE_topLevel = 1;
    public static readonly RULE_defmacro = 2;
    public static readonly RULE_def = 3;
    public static readonly RULE_statement = 4;
    public static readonly RULE_letStar = 5;
    public static readonly RULE_letStmt = 6;
    public static readonly RULE_ifForm = 7;
    public static readonly RULE_whileForm = 8;
    public static readonly RULE_block = 9;
    public static readonly RULE_returnForm = 10;
    public static readonly RULE_throwForm = 11;
    public static readonly RULE_importForm = 12;
    public static readonly RULE_binding = 13;
    public static readonly RULE_expression = 14;
    public static readonly RULE_lambda = 15;
    public static readonly RULE_assign = 16;
    public static readonly RULE_ternary = 17;
    public static readonly RULE_condExpr = 18;
    public static readonly RULE_newForm = 19;
    public static readonly RULE_objectExpr = 20;
    public static readonly RULE_objectField = 21;
    public static readonly RULE_arrayExpr = 22;
    public static readonly RULE_propAccess = 23;
    public static readonly RULE_indexAccess = 24;
    public static readonly RULE_quasiquote = 25;
    public static readonly RULE_unquote = 26;
    public static readonly RULE_unquoteSplicing = 27;
    public static readonly RULE_optChain = 28;
    public static readonly RULE_nullCoalesce = 29;
    public static readonly RULE_call = 30;
    public static readonly RULE_fnSignature = 31;
    public static readonly RULE_param = 32;
    public static readonly RULE_literal = 33;

    public static readonly literalNames = [
        null, null, "'('", "')'", "','", "'program'", "'let*'", "'let'", 
        "'lambda'", "'def'", "'defmacro'", "'if'", "'while'", "'begin'", 
        "'return'", "'set!'", "'ternary'", "'cond'", "'object'", "'array'", 
        "'.?'", "'.'", "'index'", "'??'", "'quasi'", "'quote'", "'unquote-splicing'", 
        "'unquote'", "'new'", "'throw'", "'import'", null, "'null'", "'undefined'", 
        "'['", "']'"
    ];

    public static readonly symbolicNames = [
        null, "COMMENT", "LPAREN", "RPAREN", "COMMA", "PROGRAM", "LETSTAR", 
        "LET", "LAMBDA", "DEF", "DEFMACRO", "IF", "WHILE", "BEGIN", "RETURN", 
        "SET", "TERNARY", "COND", "OBJECT", "ARRAY", "OPTCHAIN", "DOT", 
        "INDEX", "NULLCOAL", "QUASI", "QUOTE", "UNQUOTE_SPLICING", "UNQUOTE", 
        "NEW", "THROW", "IMPORT", "BOOLEAN", "NULL", "UNDEFINED", "LBRACK", 
        "RBRACK", "KEYWORD", "NUMBER", "STRING", "MULTILINE_STRING", "IDENTIFIER", 
        "WS"
    ];
    public static readonly ruleNames = [
        "program", "topLevel", "defmacro", "def", "statement", "letStar", 
        "letStmt", "ifForm", "whileForm", "block", "returnForm", "throwForm", 
        "importForm", "binding", "expression", "lambda", "assign", "ternary", 
        "condExpr", "newForm", "objectExpr", "objectField", "arrayExpr", 
        "propAccess", "indexAccess", "quasiquote", "unquote", "unquoteSplicing", 
        "optChain", "nullCoalesce", "call", "fnSignature", "param", "literal",
    ];

    public get grammarFileName(): string { return "Stage3B.g4"; }
    public get literalNames(): (string | null)[] { return Stage3BParser.literalNames; }
    public get symbolicNames(): (string | null)[] { return Stage3BParser.symbolicNames; }
    public get ruleNames(): string[] { return Stage3BParser.ruleNames; }
    public get serializedATN(): number[] { return Stage3BParser._serializedATN; }

    protected createFailedPredicateException(predicate?: string, message?: string): antlr.FailedPredicateException {
        return new antlr.FailedPredicateException(this, predicate, message);
    }

    public constructor(input: antlr.TokenStream) {
        super(input);
        this.interpreter = new antlr.ParserATNSimulator(this, Stage3BParser._ATN, Stage3BParser.decisionsToDFA, new antlr.PredictionContextCache());
    }
    public program(): ProgramContext {
        let localContext = new ProgramContext(this.context, this.state);
        this.enterRule(localContext, 0, Stage3BParser.RULE_program);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 68;
            this.match(Stage3BParser.LPAREN);
            this.state = 69;
            this.match(Stage3BParser.PROGRAM);
            this.state = 73;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 31 || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 371) !== 0)) {
                {
                {
                this.state = 70;
                this.topLevel();
                }
                }
                this.state = 75;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 76;
            this.match(Stage3BParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 2, Stage3BParser.RULE_topLevel);
        try {
            this.state = 81;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 1, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 78;
                this.defmacro();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 79;
                this.def();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 80;
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
        this.enterRule(localContext, 4, Stage3BParser.RULE_defmacro);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 83;
            this.match(Stage3BParser.LPAREN);
            this.state = 84;
            this.match(Stage3BParser.DEFMACRO);
            this.state = 85;
            this.match(Stage3BParser.IDENTIFIER);
            this.state = 86;
            this.fnSignature();
            this.state = 90;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 31 || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 371) !== 0)) {
                {
                {
                this.state = 87;
                this.statement();
                }
                }
                this.state = 92;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 93;
            this.match(Stage3BParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 6, Stage3BParser.RULE_def);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 95;
            this.match(Stage3BParser.LPAREN);
            this.state = 96;
            this.match(Stage3BParser.DEF);
            this.state = 97;
            this.match(Stage3BParser.IDENTIFIER);
            this.state = 98;
            this.expression();
            this.state = 99;
            this.match(Stage3BParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 8, Stage3BParser.RULE_statement);
        try {
            this.state = 110;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 3, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 101;
                this.letStar();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 102;
                this.letStmt();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 103;
                this.ifForm();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 104;
                this.whileForm();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 105;
                this.block();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 106;
                this.returnForm();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 107;
                this.throwForm();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 108;
                this.importForm();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 109;
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
        this.enterRule(localContext, 10, Stage3BParser.RULE_letStar);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 112;
            this.match(Stage3BParser.LPAREN);
            this.state = 113;
            this.match(Stage3BParser.LETSTAR);
            this.state = 114;
            this.match(Stage3BParser.LPAREN);
            this.state = 118;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 115;
                this.binding();
                }
                }
                this.state = 120;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 121;
            this.match(Stage3BParser.RPAREN);
            this.state = 125;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 31 || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 371) !== 0)) {
                {
                {
                this.state = 122;
                this.statement();
                }
                }
                this.state = 127;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 128;
            this.match(Stage3BParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 12, Stage3BParser.RULE_letStmt);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 130;
            this.match(Stage3BParser.LPAREN);
            this.state = 131;
            this.match(Stage3BParser.LET);
            this.state = 132;
            this.match(Stage3BParser.IDENTIFIER);
            this.state = 133;
            this.expression();
            this.state = 134;
            this.match(Stage3BParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 14, Stage3BParser.RULE_ifForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 136;
            this.match(Stage3BParser.LPAREN);
            this.state = 137;
            this.match(Stage3BParser.IF);
            this.state = 138;
            this.expression();
            this.state = 139;
            this.statement();
            this.state = 141;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2 || _la === 31 || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 371) !== 0)) {
                {
                this.state = 140;
                this.statement();
                }
            }

            this.state = 143;
            this.match(Stage3BParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 16, Stage3BParser.RULE_whileForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 145;
            this.match(Stage3BParser.LPAREN);
            this.state = 146;
            this.match(Stage3BParser.WHILE);
            this.state = 147;
            this.expression();
            this.state = 151;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 31 || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 371) !== 0)) {
                {
                {
                this.state = 148;
                this.statement();
                }
                }
                this.state = 153;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 154;
            this.match(Stage3BParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 18, Stage3BParser.RULE_block);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 156;
            this.match(Stage3BParser.LPAREN);
            this.state = 157;
            this.match(Stage3BParser.BEGIN);
            this.state = 161;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 31 || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 371) !== 0)) {
                {
                {
                this.state = 158;
                this.statement();
                }
                }
                this.state = 163;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 164;
            this.match(Stage3BParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 20, Stage3BParser.RULE_returnForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 166;
            this.match(Stage3BParser.LPAREN);
            this.state = 167;
            this.match(Stage3BParser.RETURN);
            this.state = 169;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2 || _la === 31 || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 371) !== 0)) {
                {
                this.state = 168;
                this.expression();
                }
            }

            this.state = 171;
            this.match(Stage3BParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 22, Stage3BParser.RULE_throwForm);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 173;
            this.match(Stage3BParser.LPAREN);
            this.state = 174;
            this.match(Stage3BParser.THROW);
            this.state = 175;
            this.expression();
            this.state = 176;
            this.match(Stage3BParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 24, Stage3BParser.RULE_importForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 178;
            this.match(Stage3BParser.LPAREN);
            this.state = 179;
            this.match(Stage3BParser.IMPORT);
            this.state = 181;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2) {
                {
                this.state = 180;
                this.objectExpr();
                }
            }

            this.state = 183;
            this.match(Stage3BParser.STRING);
            this.state = 184;
            this.match(Stage3BParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 26, Stage3BParser.RULE_binding);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 186;
            this.match(Stage3BParser.LPAREN);
            this.state = 187;
            this.match(Stage3BParser.IDENTIFIER);
            this.state = 189;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2 || _la === 31 || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 371) !== 0)) {
                {
                this.state = 188;
                this.expression();
                }
            }

            this.state = 191;
            this.match(Stage3BParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 28, Stage3BParser.RULE_expression);
        try {
            this.state = 211;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 12, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 193;
                this.literal();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 194;
                this.match(Stage3BParser.KEYWORD);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 195;
                this.match(Stage3BParser.IDENTIFIER);
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 196;
                this.lambda();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 197;
                this.assign();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 198;
                this.objectExpr();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 199;
                this.arrayExpr();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 200;
                this.propAccess();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 201;
                this.indexAccess();
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 202;
                this.quasiquote();
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 203;
                this.unquote();
                }
                break;
            case 12:
                this.enterOuterAlt(localContext, 12);
                {
                this.state = 204;
                this.unquoteSplicing();
                }
                break;
            case 13:
                this.enterOuterAlt(localContext, 13);
                {
                this.state = 205;
                this.ternary();
                }
                break;
            case 14:
                this.enterOuterAlt(localContext, 14);
                {
                this.state = 206;
                this.condExpr();
                }
                break;
            case 15:
                this.enterOuterAlt(localContext, 15);
                {
                this.state = 207;
                this.newForm();
                }
                break;
            case 16:
                this.enterOuterAlt(localContext, 16);
                {
                this.state = 208;
                this.optChain();
                }
                break;
            case 17:
                this.enterOuterAlt(localContext, 17);
                {
                this.state = 209;
                this.nullCoalesce();
                }
                break;
            case 18:
                this.enterOuterAlt(localContext, 18);
                {
                this.state = 210;
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
        this.enterRule(localContext, 30, Stage3BParser.RULE_lambda);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 213;
            this.match(Stage3BParser.LPAREN);
            this.state = 214;
            this.match(Stage3BParser.LAMBDA);
            this.state = 215;
            this.fnSignature();
            this.state = 219;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 31 || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 371) !== 0)) {
                {
                {
                this.state = 216;
                this.statement();
                }
                }
                this.state = 221;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 222;
            this.match(Stage3BParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 32, Stage3BParser.RULE_assign);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 224;
            this.match(Stage3BParser.LPAREN);
            this.state = 225;
            this.match(Stage3BParser.SET);
            this.state = 226;
            this.match(Stage3BParser.IDENTIFIER);
            this.state = 227;
            this.expression();
            this.state = 228;
            this.match(Stage3BParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 34, Stage3BParser.RULE_ternary);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 230;
            this.match(Stage3BParser.LPAREN);
            this.state = 231;
            this.match(Stage3BParser.TERNARY);
            this.state = 232;
            this.expression();
            this.state = 233;
            this.expression();
            this.state = 234;
            this.expression();
            this.state = 235;
            this.match(Stage3BParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 36, Stage3BParser.RULE_condExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 237;
            this.match(Stage3BParser.LPAREN);
            this.state = 238;
            this.match(Stage3BParser.COND);
            this.state = 242;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 239;
                this.expression();
                this.state = 240;
                this.expression();
                }
                }
                this.state = 244;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 31 || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 371) !== 0));
            this.state = 246;
            this.match(Stage3BParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 38, Stage3BParser.RULE_newForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 248;
            this.match(Stage3BParser.LPAREN);
            this.state = 249;
            this.match(Stage3BParser.NEW);
            this.state = 250;
            this.match(Stage3BParser.IDENTIFIER);
            this.state = 254;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 31 || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 371) !== 0)) {
                {
                {
                this.state = 251;
                this.expression();
                }
                }
                this.state = 256;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 257;
            this.match(Stage3BParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 40, Stage3BParser.RULE_objectExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 259;
            this.match(Stage3BParser.LPAREN);
            this.state = 260;
            this.match(Stage3BParser.OBJECT);
            this.state = 264;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 261;
                this.objectField();
                }
                }
                this.state = 266;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 267;
            this.match(Stage3BParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 42, Stage3BParser.RULE_objectField);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 269;
            this.match(Stage3BParser.LPAREN);
            this.state = 270;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 36)) & ~0x1F) === 0 && ((1 << (_la - 36)) & 21) !== 0))) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 271;
            this.expression();
            this.state = 272;
            this.match(Stage3BParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 44, Stage3BParser.RULE_arrayExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 274;
            this.match(Stage3BParser.LPAREN);
            this.state = 275;
            this.match(Stage3BParser.ARRAY);
            this.state = 279;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 31 || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 371) !== 0)) {
                {
                {
                this.state = 276;
                this.expression();
                }
                }
                this.state = 281;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 282;
            this.match(Stage3BParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 46, Stage3BParser.RULE_propAccess);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 284;
            this.match(Stage3BParser.LPAREN);
            this.state = 285;
            this.match(Stage3BParser.DOT);
            this.state = 286;
            this.expression();
            this.state = 287;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 36)) & ~0x1F) === 0 && ((1 << (_la - 36)) & 21) !== 0))) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 288;
            this.match(Stage3BParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 48, Stage3BParser.RULE_indexAccess);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 290;
            this.match(Stage3BParser.LPAREN);
            this.state = 291;
            this.match(Stage3BParser.INDEX);
            this.state = 292;
            this.expression();
            this.state = 293;
            this.expression();
            this.state = 294;
            this.match(Stage3BParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 50, Stage3BParser.RULE_quasiquote);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 296;
            this.match(Stage3BParser.LPAREN);
            this.state = 297;
            _la = this.tokenStream.LA(1);
            if(!(_la === 24 || _la === 25)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 298;
            this.expression();
            this.state = 299;
            this.match(Stage3BParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 52, Stage3BParser.RULE_unquote);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 301;
            this.match(Stage3BParser.LPAREN);
            this.state = 302;
            this.match(Stage3BParser.UNQUOTE);
            this.state = 303;
            this.expression();
            this.state = 304;
            this.match(Stage3BParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 54, Stage3BParser.RULE_unquoteSplicing);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 306;
            this.match(Stage3BParser.LPAREN);
            this.state = 307;
            this.match(Stage3BParser.UNQUOTE_SPLICING);
            this.state = 308;
            this.expression();
            this.state = 309;
            this.match(Stage3BParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 56, Stage3BParser.RULE_optChain);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 311;
            this.match(Stage3BParser.LPAREN);
            this.state = 312;
            this.match(Stage3BParser.OPTCHAIN);
            this.state = 313;
            this.expression();
            this.state = 314;
            this.match(Stage3BParser.IDENTIFIER);
            this.state = 315;
            this.match(Stage3BParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 58, Stage3BParser.RULE_nullCoalesce);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 317;
            this.match(Stage3BParser.LPAREN);
            this.state = 318;
            this.match(Stage3BParser.NULLCOAL);
            this.state = 319;
            this.expression();
            this.state = 320;
            this.expression();
            this.state = 321;
            this.match(Stage3BParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 60, Stage3BParser.RULE_call);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 323;
            this.match(Stage3BParser.LPAREN);
            this.state = 324;
            this.expression();
            this.state = 328;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 31 || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 371) !== 0)) {
                {
                {
                this.state = 325;
                this.expression();
                }
                }
                this.state = 330;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 331;
            this.match(Stage3BParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 62, Stage3BParser.RULE_fnSignature);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 333;
            this.match(Stage3BParser.LPAREN);
            this.state = 344;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2) {
                {
                this.state = 334;
                this.param();
                this.state = 341;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 2 || _la === 4) {
                    {
                    {
                    this.state = 336;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    if (_la === 4) {
                        {
                        this.state = 335;
                        this.match(Stage3BParser.COMMA);
                        }
                    }

                    this.state = 338;
                    this.param();
                    }
                    }
                    this.state = 343;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
            }

            this.state = 346;
            this.match(Stage3BParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 64, Stage3BParser.RULE_param);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 348;
            this.match(Stage3BParser.LPAREN);
            this.state = 349;
            this.match(Stage3BParser.IDENTIFIER);
            this.state = 350;
            this.match(Stage3BParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 66, Stage3BParser.RULE_literal);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 352;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 31)) & ~0x1F) === 0 && ((1 << (_la - 31)) & 199) !== 0))) {
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
        4,1,41,355,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,
        6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,
        2,14,7,14,2,15,7,15,2,16,7,16,2,17,7,17,2,18,7,18,2,19,7,19,2,20,
        7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,24,2,25,7,25,2,26,7,26,
        2,27,7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,31,7,31,2,32,7,32,2,33,
        7,33,1,0,1,0,1,0,5,0,72,8,0,10,0,12,0,75,9,0,1,0,1,0,1,1,1,1,1,1,
        3,1,82,8,1,1,2,1,2,1,2,1,2,1,2,5,2,89,8,2,10,2,12,2,92,9,2,1,2,1,
        2,1,3,1,3,1,3,1,3,1,3,1,3,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,3,
        4,111,8,4,1,5,1,5,1,5,1,5,5,5,117,8,5,10,5,12,5,120,9,5,1,5,1,5,
        5,5,124,8,5,10,5,12,5,127,9,5,1,5,1,5,1,6,1,6,1,6,1,6,1,6,1,6,1,
        7,1,7,1,7,1,7,1,7,3,7,142,8,7,1,7,1,7,1,8,1,8,1,8,1,8,5,8,150,8,
        8,10,8,12,8,153,9,8,1,8,1,8,1,9,1,9,1,9,5,9,160,8,9,10,9,12,9,163,
        9,9,1,9,1,9,1,10,1,10,1,10,3,10,170,8,10,1,10,1,10,1,11,1,11,1,11,
        1,11,1,11,1,12,1,12,1,12,3,12,182,8,12,1,12,1,12,1,12,1,13,1,13,
        1,13,3,13,190,8,13,1,13,1,13,1,14,1,14,1,14,1,14,1,14,1,14,1,14,
        1,14,1,14,1,14,1,14,1,14,1,14,1,14,1,14,1,14,1,14,1,14,3,14,212,
        8,14,1,15,1,15,1,15,1,15,5,15,218,8,15,10,15,12,15,221,9,15,1,15,
        1,15,1,16,1,16,1,16,1,16,1,16,1,16,1,17,1,17,1,17,1,17,1,17,1,17,
        1,17,1,18,1,18,1,18,1,18,1,18,4,18,243,8,18,11,18,12,18,244,1,18,
        1,18,1,19,1,19,1,19,1,19,5,19,253,8,19,10,19,12,19,256,9,19,1,19,
        1,19,1,20,1,20,1,20,5,20,263,8,20,10,20,12,20,266,9,20,1,20,1,20,
        1,21,1,21,1,21,1,21,1,21,1,22,1,22,1,22,5,22,278,8,22,10,22,12,22,
        281,9,22,1,22,1,22,1,23,1,23,1,23,1,23,1,23,1,23,1,24,1,24,1,24,
        1,24,1,24,1,24,1,25,1,25,1,25,1,25,1,25,1,26,1,26,1,26,1,26,1,26,
        1,27,1,27,1,27,1,27,1,27,1,28,1,28,1,28,1,28,1,28,1,28,1,29,1,29,
        1,29,1,29,1,29,1,29,1,30,1,30,1,30,5,30,327,8,30,10,30,12,30,330,
        9,30,1,30,1,30,1,31,1,31,1,31,3,31,337,8,31,1,31,5,31,340,8,31,10,
        31,12,31,343,9,31,3,31,345,8,31,1,31,1,31,1,32,1,32,1,32,1,32,1,
        33,1,33,1,33,0,0,34,0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,
        34,36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,66,0,3,3,0,36,36,
        38,38,40,40,1,0,24,25,2,0,31,33,37,38,366,0,68,1,0,0,0,2,81,1,0,
        0,0,4,83,1,0,0,0,6,95,1,0,0,0,8,110,1,0,0,0,10,112,1,0,0,0,12,130,
        1,0,0,0,14,136,1,0,0,0,16,145,1,0,0,0,18,156,1,0,0,0,20,166,1,0,
        0,0,22,173,1,0,0,0,24,178,1,0,0,0,26,186,1,0,0,0,28,211,1,0,0,0,
        30,213,1,0,0,0,32,224,1,0,0,0,34,230,1,0,0,0,36,237,1,0,0,0,38,248,
        1,0,0,0,40,259,1,0,0,0,42,269,1,0,0,0,44,274,1,0,0,0,46,284,1,0,
        0,0,48,290,1,0,0,0,50,296,1,0,0,0,52,301,1,0,0,0,54,306,1,0,0,0,
        56,311,1,0,0,0,58,317,1,0,0,0,60,323,1,0,0,0,62,333,1,0,0,0,64,348,
        1,0,0,0,66,352,1,0,0,0,68,69,5,2,0,0,69,73,5,5,0,0,70,72,3,2,1,0,
        71,70,1,0,0,0,72,75,1,0,0,0,73,71,1,0,0,0,73,74,1,0,0,0,74,76,1,
        0,0,0,75,73,1,0,0,0,76,77,5,3,0,0,77,1,1,0,0,0,78,82,3,4,2,0,79,
        82,3,6,3,0,80,82,3,8,4,0,81,78,1,0,0,0,81,79,1,0,0,0,81,80,1,0,0,
        0,82,3,1,0,0,0,83,84,5,2,0,0,84,85,5,10,0,0,85,86,5,40,0,0,86,90,
        3,62,31,0,87,89,3,8,4,0,88,87,1,0,0,0,89,92,1,0,0,0,90,88,1,0,0,
        0,90,91,1,0,0,0,91,93,1,0,0,0,92,90,1,0,0,0,93,94,5,3,0,0,94,5,1,
        0,0,0,95,96,5,2,0,0,96,97,5,9,0,0,97,98,5,40,0,0,98,99,3,28,14,0,
        99,100,5,3,0,0,100,7,1,0,0,0,101,111,3,10,5,0,102,111,3,12,6,0,103,
        111,3,14,7,0,104,111,3,16,8,0,105,111,3,18,9,0,106,111,3,20,10,0,
        107,111,3,22,11,0,108,111,3,24,12,0,109,111,3,28,14,0,110,101,1,
        0,0,0,110,102,1,0,0,0,110,103,1,0,0,0,110,104,1,0,0,0,110,105,1,
        0,0,0,110,106,1,0,0,0,110,107,1,0,0,0,110,108,1,0,0,0,110,109,1,
        0,0,0,111,9,1,0,0,0,112,113,5,2,0,0,113,114,5,6,0,0,114,118,5,2,
        0,0,115,117,3,26,13,0,116,115,1,0,0,0,117,120,1,0,0,0,118,116,1,
        0,0,0,118,119,1,0,0,0,119,121,1,0,0,0,120,118,1,0,0,0,121,125,5,
        3,0,0,122,124,3,8,4,0,123,122,1,0,0,0,124,127,1,0,0,0,125,123,1,
        0,0,0,125,126,1,0,0,0,126,128,1,0,0,0,127,125,1,0,0,0,128,129,5,
        3,0,0,129,11,1,0,0,0,130,131,5,2,0,0,131,132,5,7,0,0,132,133,5,40,
        0,0,133,134,3,28,14,0,134,135,5,3,0,0,135,13,1,0,0,0,136,137,5,2,
        0,0,137,138,5,11,0,0,138,139,3,28,14,0,139,141,3,8,4,0,140,142,3,
        8,4,0,141,140,1,0,0,0,141,142,1,0,0,0,142,143,1,0,0,0,143,144,5,
        3,0,0,144,15,1,0,0,0,145,146,5,2,0,0,146,147,5,12,0,0,147,151,3,
        28,14,0,148,150,3,8,4,0,149,148,1,0,0,0,150,153,1,0,0,0,151,149,
        1,0,0,0,151,152,1,0,0,0,152,154,1,0,0,0,153,151,1,0,0,0,154,155,
        5,3,0,0,155,17,1,0,0,0,156,157,5,2,0,0,157,161,5,13,0,0,158,160,
        3,8,4,0,159,158,1,0,0,0,160,163,1,0,0,0,161,159,1,0,0,0,161,162,
        1,0,0,0,162,164,1,0,0,0,163,161,1,0,0,0,164,165,5,3,0,0,165,19,1,
        0,0,0,166,167,5,2,0,0,167,169,5,14,0,0,168,170,3,28,14,0,169,168,
        1,0,0,0,169,170,1,0,0,0,170,171,1,0,0,0,171,172,5,3,0,0,172,21,1,
        0,0,0,173,174,5,2,0,0,174,175,5,29,0,0,175,176,3,28,14,0,176,177,
        5,3,0,0,177,23,1,0,0,0,178,179,5,2,0,0,179,181,5,30,0,0,180,182,
        3,40,20,0,181,180,1,0,0,0,181,182,1,0,0,0,182,183,1,0,0,0,183,184,
        5,38,0,0,184,185,5,3,0,0,185,25,1,0,0,0,186,187,5,2,0,0,187,189,
        5,40,0,0,188,190,3,28,14,0,189,188,1,0,0,0,189,190,1,0,0,0,190,191,
        1,0,0,0,191,192,5,3,0,0,192,27,1,0,0,0,193,212,3,66,33,0,194,212,
        5,36,0,0,195,212,5,40,0,0,196,212,3,30,15,0,197,212,3,32,16,0,198,
        212,3,40,20,0,199,212,3,44,22,0,200,212,3,46,23,0,201,212,3,48,24,
        0,202,212,3,50,25,0,203,212,3,52,26,0,204,212,3,54,27,0,205,212,
        3,34,17,0,206,212,3,36,18,0,207,212,3,38,19,0,208,212,3,56,28,0,
        209,212,3,58,29,0,210,212,3,60,30,0,211,193,1,0,0,0,211,194,1,0,
        0,0,211,195,1,0,0,0,211,196,1,0,0,0,211,197,1,0,0,0,211,198,1,0,
        0,0,211,199,1,0,0,0,211,200,1,0,0,0,211,201,1,0,0,0,211,202,1,0,
        0,0,211,203,1,0,0,0,211,204,1,0,0,0,211,205,1,0,0,0,211,206,1,0,
        0,0,211,207,1,0,0,0,211,208,1,0,0,0,211,209,1,0,0,0,211,210,1,0,
        0,0,212,29,1,0,0,0,213,214,5,2,0,0,214,215,5,8,0,0,215,219,3,62,
        31,0,216,218,3,8,4,0,217,216,1,0,0,0,218,221,1,0,0,0,219,217,1,0,
        0,0,219,220,1,0,0,0,220,222,1,0,0,0,221,219,1,0,0,0,222,223,5,3,
        0,0,223,31,1,0,0,0,224,225,5,2,0,0,225,226,5,15,0,0,226,227,5,40,
        0,0,227,228,3,28,14,0,228,229,5,3,0,0,229,33,1,0,0,0,230,231,5,2,
        0,0,231,232,5,16,0,0,232,233,3,28,14,0,233,234,3,28,14,0,234,235,
        3,28,14,0,235,236,5,3,0,0,236,35,1,0,0,0,237,238,5,2,0,0,238,242,
        5,17,0,0,239,240,3,28,14,0,240,241,3,28,14,0,241,243,1,0,0,0,242,
        239,1,0,0,0,243,244,1,0,0,0,244,242,1,0,0,0,244,245,1,0,0,0,245,
        246,1,0,0,0,246,247,5,3,0,0,247,37,1,0,0,0,248,249,5,2,0,0,249,250,
        5,28,0,0,250,254,5,40,0,0,251,253,3,28,14,0,252,251,1,0,0,0,253,
        256,1,0,0,0,254,252,1,0,0,0,254,255,1,0,0,0,255,257,1,0,0,0,256,
        254,1,0,0,0,257,258,5,3,0,0,258,39,1,0,0,0,259,260,5,2,0,0,260,264,
        5,18,0,0,261,263,3,42,21,0,262,261,1,0,0,0,263,266,1,0,0,0,264,262,
        1,0,0,0,264,265,1,0,0,0,265,267,1,0,0,0,266,264,1,0,0,0,267,268,
        5,3,0,0,268,41,1,0,0,0,269,270,5,2,0,0,270,271,7,0,0,0,271,272,3,
        28,14,0,272,273,5,3,0,0,273,43,1,0,0,0,274,275,5,2,0,0,275,279,5,
        19,0,0,276,278,3,28,14,0,277,276,1,0,0,0,278,281,1,0,0,0,279,277,
        1,0,0,0,279,280,1,0,0,0,280,282,1,0,0,0,281,279,1,0,0,0,282,283,
        5,3,0,0,283,45,1,0,0,0,284,285,5,2,0,0,285,286,5,21,0,0,286,287,
        3,28,14,0,287,288,7,0,0,0,288,289,5,3,0,0,289,47,1,0,0,0,290,291,
        5,2,0,0,291,292,5,22,0,0,292,293,3,28,14,0,293,294,3,28,14,0,294,
        295,5,3,0,0,295,49,1,0,0,0,296,297,5,2,0,0,297,298,7,1,0,0,298,299,
        3,28,14,0,299,300,5,3,0,0,300,51,1,0,0,0,301,302,5,2,0,0,302,303,
        5,27,0,0,303,304,3,28,14,0,304,305,5,3,0,0,305,53,1,0,0,0,306,307,
        5,2,0,0,307,308,5,26,0,0,308,309,3,28,14,0,309,310,5,3,0,0,310,55,
        1,0,0,0,311,312,5,2,0,0,312,313,5,20,0,0,313,314,3,28,14,0,314,315,
        5,40,0,0,315,316,5,3,0,0,316,57,1,0,0,0,317,318,5,2,0,0,318,319,
        5,23,0,0,319,320,3,28,14,0,320,321,3,28,14,0,321,322,5,3,0,0,322,
        59,1,0,0,0,323,324,5,2,0,0,324,328,3,28,14,0,325,327,3,28,14,0,326,
        325,1,0,0,0,327,330,1,0,0,0,328,326,1,0,0,0,328,329,1,0,0,0,329,
        331,1,0,0,0,330,328,1,0,0,0,331,332,5,3,0,0,332,61,1,0,0,0,333,344,
        5,2,0,0,334,341,3,64,32,0,335,337,5,4,0,0,336,335,1,0,0,0,336,337,
        1,0,0,0,337,338,1,0,0,0,338,340,3,64,32,0,339,336,1,0,0,0,340,343,
        1,0,0,0,341,339,1,0,0,0,341,342,1,0,0,0,342,345,1,0,0,0,343,341,
        1,0,0,0,344,334,1,0,0,0,344,345,1,0,0,0,345,346,1,0,0,0,346,347,
        5,3,0,0,347,63,1,0,0,0,348,349,5,2,0,0,349,350,5,40,0,0,350,351,
        5,3,0,0,351,65,1,0,0,0,352,353,7,2,0,0,353,67,1,0,0,0,22,73,81,90,
        110,118,125,141,151,161,169,181,189,211,219,244,254,264,279,328,
        336,341,344
    ];

    private static __ATN: antlr.ATN;
    public static get _ATN(): antlr.ATN {
        if (!Stage3BParser.__ATN) {
            Stage3BParser.__ATN = new antlr.ATNDeserializer().deserialize(Stage3BParser._serializedATN);
        }

        return Stage3BParser.__ATN;
    }


    private static readonly vocabulary = new antlr.Vocabulary(Stage3BParser.literalNames, Stage3BParser.symbolicNames, []);

    public override get vocabulary(): antlr.Vocabulary {
        return Stage3BParser.vocabulary;
    }

    private static readonly decisionsToDFA = Stage3BParser._ATN.decisionToState.map( (ds: antlr.DecisionState, index: number) => new antlr.DFA(ds, index) );
}

export class ProgramContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3BParser.LPAREN, 0)!;
    }
    public PROGRAM(): antlr.TerminalNode {
        return this.getToken(Stage3BParser.PROGRAM, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3BParser.RPAREN, 0)!;
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
        return Stage3BParser.RULE_program;
    }
    public override enterRule(listener: Stage3BListener): void {
        if(listener.enterProgram) {
             listener.enterProgram(this);
        }
    }
    public override exitRule(listener: Stage3BListener): void {
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
        return Stage3BParser.RULE_topLevel;
    }
    public override enterRule(listener: Stage3BListener): void {
        if(listener.enterTopLevel) {
             listener.enterTopLevel(this);
        }
    }
    public override exitRule(listener: Stage3BListener): void {
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
        return this.getToken(Stage3BParser.LPAREN, 0)!;
    }
    public DEFMACRO(): antlr.TerminalNode {
        return this.getToken(Stage3BParser.DEFMACRO, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3BParser.IDENTIFIER, 0)!;
    }
    public fnSignature(): FnSignatureContext {
        return this.getRuleContext(0, FnSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3BParser.RPAREN, 0)!;
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
        return Stage3BParser.RULE_defmacro;
    }
    public override enterRule(listener: Stage3BListener): void {
        if(listener.enterDefmacro) {
             listener.enterDefmacro(this);
        }
    }
    public override exitRule(listener: Stage3BListener): void {
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
        return this.getToken(Stage3BParser.LPAREN, 0)!;
    }
    public DEF(): antlr.TerminalNode {
        return this.getToken(Stage3BParser.DEF, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3BParser.IDENTIFIER, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3BParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3BParser.RULE_def;
    }
    public override enterRule(listener: Stage3BListener): void {
        if(listener.enterDef) {
             listener.enterDef(this);
        }
    }
    public override exitRule(listener: Stage3BListener): void {
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
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public override get ruleIndex(): number {
        return Stage3BParser.RULE_statement;
    }
    public override enterRule(listener: Stage3BListener): void {
        if(listener.enterStatement) {
             listener.enterStatement(this);
        }
    }
    public override exitRule(listener: Stage3BListener): void {
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
    		return this.getTokens(Stage3BParser.LPAREN);
    	} else {
    		return this.getToken(Stage3BParser.LPAREN, i);
    	}
    }
    public LETSTAR(): antlr.TerminalNode {
        return this.getToken(Stage3BParser.LETSTAR, 0)!;
    }
    public RPAREN(): antlr.TerminalNode[];
    public RPAREN(i: number): antlr.TerminalNode | null;
    public RPAREN(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage3BParser.RPAREN);
    	} else {
    		return this.getToken(Stage3BParser.RPAREN, i);
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
        return Stage3BParser.RULE_letStar;
    }
    public override enterRule(listener: Stage3BListener): void {
        if(listener.enterLetStar) {
             listener.enterLetStar(this);
        }
    }
    public override exitRule(listener: Stage3BListener): void {
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
        return this.getToken(Stage3BParser.LPAREN, 0)!;
    }
    public LET(): antlr.TerminalNode {
        return this.getToken(Stage3BParser.LET, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3BParser.IDENTIFIER, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3BParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3BParser.RULE_letStmt;
    }
    public override enterRule(listener: Stage3BListener): void {
        if(listener.enterLetStmt) {
             listener.enterLetStmt(this);
        }
    }
    public override exitRule(listener: Stage3BListener): void {
        if(listener.exitLetStmt) {
             listener.exitLetStmt(this);
        }
    }
}


export class IfFormContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3BParser.LPAREN, 0)!;
    }
    public IF(): antlr.TerminalNode {
        return this.getToken(Stage3BParser.IF, 0)!;
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
        return this.getToken(Stage3BParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3BParser.RULE_ifForm;
    }
    public override enterRule(listener: Stage3BListener): void {
        if(listener.enterIfForm) {
             listener.enterIfForm(this);
        }
    }
    public override exitRule(listener: Stage3BListener): void {
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
        return this.getToken(Stage3BParser.LPAREN, 0)!;
    }
    public WHILE(): antlr.TerminalNode {
        return this.getToken(Stage3BParser.WHILE, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3BParser.RPAREN, 0)!;
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
        return Stage3BParser.RULE_whileForm;
    }
    public override enterRule(listener: Stage3BListener): void {
        if(listener.enterWhileForm) {
             listener.enterWhileForm(this);
        }
    }
    public override exitRule(listener: Stage3BListener): void {
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
        return this.getToken(Stage3BParser.LPAREN, 0)!;
    }
    public BEGIN(): antlr.TerminalNode {
        return this.getToken(Stage3BParser.BEGIN, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3BParser.RPAREN, 0)!;
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
        return Stage3BParser.RULE_block;
    }
    public override enterRule(listener: Stage3BListener): void {
        if(listener.enterBlock) {
             listener.enterBlock(this);
        }
    }
    public override exitRule(listener: Stage3BListener): void {
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
        return this.getToken(Stage3BParser.LPAREN, 0)!;
    }
    public RETURN(): antlr.TerminalNode {
        return this.getToken(Stage3BParser.RETURN, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3BParser.RPAREN, 0)!;
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public override get ruleIndex(): number {
        return Stage3BParser.RULE_returnForm;
    }
    public override enterRule(listener: Stage3BListener): void {
        if(listener.enterReturnForm) {
             listener.enterReturnForm(this);
        }
    }
    public override exitRule(listener: Stage3BListener): void {
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
        return this.getToken(Stage3BParser.LPAREN, 0)!;
    }
    public THROW(): antlr.TerminalNode {
        return this.getToken(Stage3BParser.THROW, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3BParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3BParser.RULE_throwForm;
    }
    public override enterRule(listener: Stage3BListener): void {
        if(listener.enterThrowForm) {
             listener.enterThrowForm(this);
        }
    }
    public override exitRule(listener: Stage3BListener): void {
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
        return this.getToken(Stage3BParser.LPAREN, 0)!;
    }
    public IMPORT(): antlr.TerminalNode {
        return this.getToken(Stage3BParser.IMPORT, 0)!;
    }
    public STRING(): antlr.TerminalNode {
        return this.getToken(Stage3BParser.STRING, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3BParser.RPAREN, 0)!;
    }
    public objectExpr(): ObjectExprContext | null {
        return this.getRuleContext(0, ObjectExprContext);
    }
    public override get ruleIndex(): number {
        return Stage3BParser.RULE_importForm;
    }
    public override enterRule(listener: Stage3BListener): void {
        if(listener.enterImportForm) {
             listener.enterImportForm(this);
        }
    }
    public override exitRule(listener: Stage3BListener): void {
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
        return this.getToken(Stage3BParser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3BParser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3BParser.RPAREN, 0)!;
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public override get ruleIndex(): number {
        return Stage3BParser.RULE_binding;
    }
    public override enterRule(listener: Stage3BListener): void {
        if(listener.enterBinding) {
             listener.enterBinding(this);
        }
    }
    public override exitRule(listener: Stage3BListener): void {
        if(listener.exitBinding) {
             listener.exitBinding(this);
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
        return this.getToken(Stage3BParser.KEYWORD, 0);
    }
    public IDENTIFIER(): antlr.TerminalNode | null {
        return this.getToken(Stage3BParser.IDENTIFIER, 0);
    }
    public lambda(): LambdaContext | null {
        return this.getRuleContext(0, LambdaContext);
    }
    public assign(): AssignContext | null {
        return this.getRuleContext(0, AssignContext);
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
        return Stage3BParser.RULE_expression;
    }
    public override enterRule(listener: Stage3BListener): void {
        if(listener.enterExpression) {
             listener.enterExpression(this);
        }
    }
    public override exitRule(listener: Stage3BListener): void {
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
        return this.getToken(Stage3BParser.LPAREN, 0)!;
    }
    public LAMBDA(): antlr.TerminalNode {
        return this.getToken(Stage3BParser.LAMBDA, 0)!;
    }
    public fnSignature(): FnSignatureContext {
        return this.getRuleContext(0, FnSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3BParser.RPAREN, 0)!;
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
        return Stage3BParser.RULE_lambda;
    }
    public override enterRule(listener: Stage3BListener): void {
        if(listener.enterLambda) {
             listener.enterLambda(this);
        }
    }
    public override exitRule(listener: Stage3BListener): void {
        if(listener.exitLambda) {
             listener.exitLambda(this);
        }
    }
}


export class AssignContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3BParser.LPAREN, 0)!;
    }
    public SET(): antlr.TerminalNode {
        return this.getToken(Stage3BParser.SET, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3BParser.IDENTIFIER, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3BParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3BParser.RULE_assign;
    }
    public override enterRule(listener: Stage3BListener): void {
        if(listener.enterAssign) {
             listener.enterAssign(this);
        }
    }
    public override exitRule(listener: Stage3BListener): void {
        if(listener.exitAssign) {
             listener.exitAssign(this);
        }
    }
}


export class TernaryContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3BParser.LPAREN, 0)!;
    }
    public TERNARY(): antlr.TerminalNode {
        return this.getToken(Stage3BParser.TERNARY, 0)!;
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
        return this.getToken(Stage3BParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3BParser.RULE_ternary;
    }
    public override enterRule(listener: Stage3BListener): void {
        if(listener.enterTernary) {
             listener.enterTernary(this);
        }
    }
    public override exitRule(listener: Stage3BListener): void {
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
        return this.getToken(Stage3BParser.LPAREN, 0)!;
    }
    public COND(): antlr.TerminalNode {
        return this.getToken(Stage3BParser.COND, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3BParser.RPAREN, 0)!;
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
        return Stage3BParser.RULE_condExpr;
    }
    public override enterRule(listener: Stage3BListener): void {
        if(listener.enterCondExpr) {
             listener.enterCondExpr(this);
        }
    }
    public override exitRule(listener: Stage3BListener): void {
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
        return this.getToken(Stage3BParser.LPAREN, 0)!;
    }
    public NEW(): antlr.TerminalNode {
        return this.getToken(Stage3BParser.NEW, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3BParser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3BParser.RPAREN, 0)!;
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
        return Stage3BParser.RULE_newForm;
    }
    public override enterRule(listener: Stage3BListener): void {
        if(listener.enterNewForm) {
             listener.enterNewForm(this);
        }
    }
    public override exitRule(listener: Stage3BListener): void {
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
        return this.getToken(Stage3BParser.LPAREN, 0)!;
    }
    public OBJECT(): antlr.TerminalNode {
        return this.getToken(Stage3BParser.OBJECT, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3BParser.RPAREN, 0)!;
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
        return Stage3BParser.RULE_objectExpr;
    }
    public override enterRule(listener: Stage3BListener): void {
        if(listener.enterObjectExpr) {
             listener.enterObjectExpr(this);
        }
    }
    public override exitRule(listener: Stage3BListener): void {
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
        return this.getToken(Stage3BParser.LPAREN, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3BParser.RPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode | null {
        return this.getToken(Stage3BParser.IDENTIFIER, 0);
    }
    public KEYWORD(): antlr.TerminalNode | null {
        return this.getToken(Stage3BParser.KEYWORD, 0);
    }
    public STRING(): antlr.TerminalNode | null {
        return this.getToken(Stage3BParser.STRING, 0);
    }
    public override get ruleIndex(): number {
        return Stage3BParser.RULE_objectField;
    }
    public override enterRule(listener: Stage3BListener): void {
        if(listener.enterObjectField) {
             listener.enterObjectField(this);
        }
    }
    public override exitRule(listener: Stage3BListener): void {
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
        return this.getToken(Stage3BParser.LPAREN, 0)!;
    }
    public ARRAY(): antlr.TerminalNode {
        return this.getToken(Stage3BParser.ARRAY, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3BParser.RPAREN, 0)!;
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
        return Stage3BParser.RULE_arrayExpr;
    }
    public override enterRule(listener: Stage3BListener): void {
        if(listener.enterArrayExpr) {
             listener.enterArrayExpr(this);
        }
    }
    public override exitRule(listener: Stage3BListener): void {
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
        return this.getToken(Stage3BParser.LPAREN, 0)!;
    }
    public DOT(): antlr.TerminalNode {
        return this.getToken(Stage3BParser.DOT, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3BParser.RPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode | null {
        return this.getToken(Stage3BParser.IDENTIFIER, 0);
    }
    public KEYWORD(): antlr.TerminalNode | null {
        return this.getToken(Stage3BParser.KEYWORD, 0);
    }
    public STRING(): antlr.TerminalNode | null {
        return this.getToken(Stage3BParser.STRING, 0);
    }
    public override get ruleIndex(): number {
        return Stage3BParser.RULE_propAccess;
    }
    public override enterRule(listener: Stage3BListener): void {
        if(listener.enterPropAccess) {
             listener.enterPropAccess(this);
        }
    }
    public override exitRule(listener: Stage3BListener): void {
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
        return this.getToken(Stage3BParser.LPAREN, 0)!;
    }
    public INDEX(): antlr.TerminalNode {
        return this.getToken(Stage3BParser.INDEX, 0)!;
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
        return this.getToken(Stage3BParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3BParser.RULE_indexAccess;
    }
    public override enterRule(listener: Stage3BListener): void {
        if(listener.enterIndexAccess) {
             listener.enterIndexAccess(this);
        }
    }
    public override exitRule(listener: Stage3BListener): void {
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
        return this.getToken(Stage3BParser.LPAREN, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3BParser.RPAREN, 0)!;
    }
    public QUASI(): antlr.TerminalNode | null {
        return this.getToken(Stage3BParser.QUASI, 0);
    }
    public QUOTE(): antlr.TerminalNode | null {
        return this.getToken(Stage3BParser.QUOTE, 0);
    }
    public override get ruleIndex(): number {
        return Stage3BParser.RULE_quasiquote;
    }
    public override enterRule(listener: Stage3BListener): void {
        if(listener.enterQuasiquote) {
             listener.enterQuasiquote(this);
        }
    }
    public override exitRule(listener: Stage3BListener): void {
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
        return this.getToken(Stage3BParser.LPAREN, 0)!;
    }
    public UNQUOTE(): antlr.TerminalNode {
        return this.getToken(Stage3BParser.UNQUOTE, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3BParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3BParser.RULE_unquote;
    }
    public override enterRule(listener: Stage3BListener): void {
        if(listener.enterUnquote) {
             listener.enterUnquote(this);
        }
    }
    public override exitRule(listener: Stage3BListener): void {
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
        return this.getToken(Stage3BParser.LPAREN, 0)!;
    }
    public UNQUOTE_SPLICING(): antlr.TerminalNode {
        return this.getToken(Stage3BParser.UNQUOTE_SPLICING, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3BParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3BParser.RULE_unquoteSplicing;
    }
    public override enterRule(listener: Stage3BListener): void {
        if(listener.enterUnquoteSplicing) {
             listener.enterUnquoteSplicing(this);
        }
    }
    public override exitRule(listener: Stage3BListener): void {
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
        return this.getToken(Stage3BParser.LPAREN, 0)!;
    }
    public OPTCHAIN(): antlr.TerminalNode {
        return this.getToken(Stage3BParser.OPTCHAIN, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3BParser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3BParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3BParser.RULE_optChain;
    }
    public override enterRule(listener: Stage3BListener): void {
        if(listener.enterOptChain) {
             listener.enterOptChain(this);
        }
    }
    public override exitRule(listener: Stage3BListener): void {
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
        return this.getToken(Stage3BParser.LPAREN, 0)!;
    }
    public NULLCOAL(): antlr.TerminalNode {
        return this.getToken(Stage3BParser.NULLCOAL, 0)!;
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
        return this.getToken(Stage3BParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3BParser.RULE_nullCoalesce;
    }
    public override enterRule(listener: Stage3BListener): void {
        if(listener.enterNullCoalesce) {
             listener.enterNullCoalesce(this);
        }
    }
    public override exitRule(listener: Stage3BListener): void {
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
        return this.getToken(Stage3BParser.LPAREN, 0)!;
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
        return this.getToken(Stage3BParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3BParser.RULE_call;
    }
    public override enterRule(listener: Stage3BListener): void {
        if(listener.enterCall) {
             listener.enterCall(this);
        }
    }
    public override exitRule(listener: Stage3BListener): void {
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
        return this.getToken(Stage3BParser.LPAREN, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3BParser.RPAREN, 0)!;
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
    		return this.getTokens(Stage3BParser.COMMA);
    	} else {
    		return this.getToken(Stage3BParser.COMMA, i);
    	}
    }
    public override get ruleIndex(): number {
        return Stage3BParser.RULE_fnSignature;
    }
    public override enterRule(listener: Stage3BListener): void {
        if(listener.enterFnSignature) {
             listener.enterFnSignature(this);
        }
    }
    public override exitRule(listener: Stage3BListener): void {
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
        return this.getToken(Stage3BParser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3BParser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3BParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3BParser.RULE_param;
    }
    public override enterRule(listener: Stage3BListener): void {
        if(listener.enterParam) {
             listener.enterParam(this);
        }
    }
    public override exitRule(listener: Stage3BListener): void {
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
        return this.getToken(Stage3BParser.NUMBER, 0);
    }
    public STRING(): antlr.TerminalNode | null {
        return this.getToken(Stage3BParser.STRING, 0);
    }
    public BOOLEAN(): antlr.TerminalNode | null {
        return this.getToken(Stage3BParser.BOOLEAN, 0);
    }
    public NULL(): antlr.TerminalNode | null {
        return this.getToken(Stage3BParser.NULL, 0);
    }
    public UNDEFINED(): antlr.TerminalNode | null {
        return this.getToken(Stage3BParser.UNDEFINED, 0);
    }
    public override get ruleIndex(): number {
        return Stage3BParser.RULE_literal;
    }
    public override enterRule(listener: Stage3BListener): void {
        if(listener.enterLiteral) {
             listener.enterLiteral(this);
        }
    }
    public override exitRule(listener: Stage3BListener): void {
        if(listener.exitLiteral) {
             listener.exitLiteral(this);
        }
    }
}
