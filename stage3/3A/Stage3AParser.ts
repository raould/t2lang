
import * as antlr from "antlr4ng";
import { Token } from "antlr4ng";

import { Stage3AListener } from "./Stage3AListener.js";
// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;


export class Stage3AParser extends antlr.Parser {
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
    public static readonly OBJECT = 17;
    public static readonly ARRAY = 18;
    public static readonly DOT = 19;
    public static readonly INDEX = 20;
    public static readonly QUASI = 21;
    public static readonly QUOTE = 22;
    public static readonly UNQUOTE_SPLICING = 23;
    public static readonly UNQUOTE = 24;
    public static readonly BOOLEAN = 25;
    public static readonly NULL = 26;
    public static readonly UNDEFINED = 27;
    public static readonly LBRACK = 28;
    public static readonly RBRACK = 29;
    public static readonly KEYWORD = 30;
    public static readonly NUMBER = 31;
    public static readonly STRING = 32;
    public static readonly MULTILINE_STRING = 33;
    public static readonly IDENTIFIER = 34;
    public static readonly WS = 35;
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
    public static readonly RULE_binding = 11;
    public static readonly RULE_expression = 12;
    public static readonly RULE_lambda = 13;
    public static readonly RULE_assign = 14;
    public static readonly RULE_ternary = 15;
    public static readonly RULE_objectExpr = 16;
    public static readonly RULE_objectField = 17;
    public static readonly RULE_arrayExpr = 18;
    public static readonly RULE_propAccess = 19;
    public static readonly RULE_indexAccess = 20;
    public static readonly RULE_quasiquote = 21;
    public static readonly RULE_unquote = 22;
    public static readonly RULE_unquoteSplicing = 23;
    public static readonly RULE_call = 24;
    public static readonly RULE_fnSignature = 25;
    public static readonly RULE_param = 26;
    public static readonly RULE_literal = 27;

    public static readonly literalNames = [
        null, null, "'('", "')'", "','", "'program'", "'let*'", "'let'", 
        "'lambda'", "'def'", "'defmacro'", "'if'", "'while'", "'begin'", 
        "'return'", "'set!'", "'ternary'", "'object'", "'array'", "'.'", 
        "'index'", "'quasi'", "'quote'", "'unquote-splicing'", "'unquote'", 
        null, "'null'", "'undefined'", "'['", "']'"
    ];

    public static readonly symbolicNames = [
        null, "COMMENT", "LPAREN", "RPAREN", "COMMA", "PROGRAM", "LETSTAR", 
        "LET", "LAMBDA", "DEF", "DEFMACRO", "IF", "WHILE", "BEGIN", "RETURN", 
        "SET", "TERNARY", "OBJECT", "ARRAY", "DOT", "INDEX", "QUASI", "QUOTE", 
        "UNQUOTE_SPLICING", "UNQUOTE", "BOOLEAN", "NULL", "UNDEFINED", "LBRACK", 
        "RBRACK", "KEYWORD", "NUMBER", "STRING", "MULTILINE_STRING", "IDENTIFIER", 
        "WS"
    ];
    public static readonly ruleNames = [
        "program", "topLevel", "defmacro", "def", "statement", "letStar", 
        "letStmt", "ifForm", "whileForm", "block", "returnForm", "binding", 
        "expression", "lambda", "assign", "ternary", "objectExpr", "objectField", 
        "arrayExpr", "propAccess", "indexAccess", "quasiquote", "unquote", 
        "unquoteSplicing", "call", "fnSignature", "param", "literal",
    ];

    public get grammarFileName(): string { return "Stage3A.g4"; }
    public get literalNames(): (string | null)[] { return Stage3AParser.literalNames; }
    public get symbolicNames(): (string | null)[] { return Stage3AParser.symbolicNames; }
    public get ruleNames(): string[] { return Stage3AParser.ruleNames; }
    public get serializedATN(): number[] { return Stage3AParser._serializedATN; }

    protected createFailedPredicateException(predicate?: string, message?: string): antlr.FailedPredicateException {
        return new antlr.FailedPredicateException(this, predicate, message);
    }

    public constructor(input: antlr.TokenStream) {
        super(input);
        this.interpreter = new antlr.ParserATNSimulator(this, Stage3AParser._ATN, Stage3AParser.decisionsToDFA, new antlr.PredictionContextCache());
    }
    public program(): ProgramContext {
        let localContext = new ProgramContext(this.context, this.state);
        this.enterRule(localContext, 0, Stage3AParser.RULE_program);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 56;
            this.match(Stage3AParser.LPAREN);
            this.state = 57;
            this.match(Stage3AParser.PROGRAM);
            this.state = 61;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3456106500) !== 0) || _la === 32 || _la === 34) {
                {
                {
                this.state = 58;
                this.topLevel();
                }
                }
                this.state = 63;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 64;
            this.match(Stage3AParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 2, Stage3AParser.RULE_topLevel);
        try {
            this.state = 69;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 1, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 66;
                this.defmacro();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 67;
                this.def();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 68;
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
        this.enterRule(localContext, 4, Stage3AParser.RULE_defmacro);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 71;
            this.match(Stage3AParser.LPAREN);
            this.state = 72;
            this.match(Stage3AParser.DEFMACRO);
            this.state = 73;
            this.match(Stage3AParser.IDENTIFIER);
            this.state = 74;
            this.fnSignature();
            this.state = 78;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3456106500) !== 0) || _la === 32 || _la === 34) {
                {
                {
                this.state = 75;
                this.statement();
                }
                }
                this.state = 80;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 81;
            this.match(Stage3AParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 6, Stage3AParser.RULE_def);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 83;
            this.match(Stage3AParser.LPAREN);
            this.state = 84;
            this.match(Stage3AParser.DEF);
            this.state = 85;
            this.match(Stage3AParser.IDENTIFIER);
            this.state = 86;
            this.expression();
            this.state = 87;
            this.match(Stage3AParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 8, Stage3AParser.RULE_statement);
        try {
            this.state = 96;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 3, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 89;
                this.letStar();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 90;
                this.letStmt();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 91;
                this.ifForm();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 92;
                this.whileForm();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 93;
                this.block();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 94;
                this.returnForm();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 95;
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
        this.enterRule(localContext, 10, Stage3AParser.RULE_letStar);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 98;
            this.match(Stage3AParser.LPAREN);
            this.state = 99;
            this.match(Stage3AParser.LETSTAR);
            this.state = 100;
            this.match(Stage3AParser.LPAREN);
            this.state = 104;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 101;
                this.binding();
                }
                }
                this.state = 106;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 107;
            this.match(Stage3AParser.RPAREN);
            this.state = 111;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3456106500) !== 0) || _la === 32 || _la === 34) {
                {
                {
                this.state = 108;
                this.statement();
                }
                }
                this.state = 113;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 114;
            this.match(Stage3AParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 12, Stage3AParser.RULE_letStmt);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 116;
            this.match(Stage3AParser.LPAREN);
            this.state = 117;
            this.match(Stage3AParser.LET);
            this.state = 118;
            this.match(Stage3AParser.IDENTIFIER);
            this.state = 119;
            this.expression();
            this.state = 120;
            this.match(Stage3AParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 14, Stage3AParser.RULE_ifForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 122;
            this.match(Stage3AParser.LPAREN);
            this.state = 123;
            this.match(Stage3AParser.IF);
            this.state = 124;
            this.expression();
            this.state = 125;
            this.statement();
            this.state = 127;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3456106500) !== 0) || _la === 32 || _la === 34) {
                {
                this.state = 126;
                this.statement();
                }
            }

            this.state = 129;
            this.match(Stage3AParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 16, Stage3AParser.RULE_whileForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 131;
            this.match(Stage3AParser.LPAREN);
            this.state = 132;
            this.match(Stage3AParser.WHILE);
            this.state = 133;
            this.expression();
            this.state = 137;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3456106500) !== 0) || _la === 32 || _la === 34) {
                {
                {
                this.state = 134;
                this.statement();
                }
                }
                this.state = 139;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 140;
            this.match(Stage3AParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 18, Stage3AParser.RULE_block);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 142;
            this.match(Stage3AParser.LPAREN);
            this.state = 143;
            this.match(Stage3AParser.BEGIN);
            this.state = 147;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3456106500) !== 0) || _la === 32 || _la === 34) {
                {
                {
                this.state = 144;
                this.statement();
                }
                }
                this.state = 149;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 150;
            this.match(Stage3AParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 20, Stage3AParser.RULE_returnForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 152;
            this.match(Stage3AParser.LPAREN);
            this.state = 153;
            this.match(Stage3AParser.RETURN);
            this.state = 155;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3456106500) !== 0) || _la === 32 || _la === 34) {
                {
                this.state = 154;
                this.expression();
                }
            }

            this.state = 157;
            this.match(Stage3AParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 22, Stage3AParser.RULE_binding);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 159;
            this.match(Stage3AParser.LPAREN);
            this.state = 160;
            this.match(Stage3AParser.IDENTIFIER);
            this.state = 162;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3456106500) !== 0) || _la === 32 || _la === 34) {
                {
                this.state = 161;
                this.expression();
                }
            }

            this.state = 164;
            this.match(Stage3AParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 24, Stage3AParser.RULE_expression);
        try {
            this.state = 180;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 11, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 166;
                this.literal();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 167;
                this.match(Stage3AParser.KEYWORD);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 168;
                this.match(Stage3AParser.IDENTIFIER);
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 169;
                this.lambda();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 170;
                this.assign();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 171;
                this.objectExpr();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 172;
                this.arrayExpr();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 173;
                this.propAccess();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 174;
                this.indexAccess();
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 175;
                this.quasiquote();
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 176;
                this.unquote();
                }
                break;
            case 12:
                this.enterOuterAlt(localContext, 12);
                {
                this.state = 177;
                this.unquoteSplicing();
                }
                break;
            case 13:
                this.enterOuterAlt(localContext, 13);
                {
                this.state = 178;
                this.ternary();
                }
                break;
            case 14:
                this.enterOuterAlt(localContext, 14);
                {
                this.state = 179;
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
        this.enterRule(localContext, 26, Stage3AParser.RULE_lambda);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 182;
            this.match(Stage3AParser.LPAREN);
            this.state = 183;
            this.match(Stage3AParser.LAMBDA);
            this.state = 184;
            this.fnSignature();
            this.state = 188;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3456106500) !== 0) || _la === 32 || _la === 34) {
                {
                {
                this.state = 185;
                this.statement();
                }
                }
                this.state = 190;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 191;
            this.match(Stage3AParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 28, Stage3AParser.RULE_assign);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 193;
            this.match(Stage3AParser.LPAREN);
            this.state = 194;
            this.match(Stage3AParser.SET);
            this.state = 195;
            this.match(Stage3AParser.IDENTIFIER);
            this.state = 196;
            this.expression();
            this.state = 197;
            this.match(Stage3AParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 30, Stage3AParser.RULE_ternary);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 199;
            this.match(Stage3AParser.LPAREN);
            this.state = 200;
            this.match(Stage3AParser.TERNARY);
            this.state = 201;
            this.expression();
            this.state = 202;
            this.expression();
            this.state = 203;
            this.expression();
            this.state = 204;
            this.match(Stage3AParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 32, Stage3AParser.RULE_objectExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 206;
            this.match(Stage3AParser.LPAREN);
            this.state = 207;
            this.match(Stage3AParser.OBJECT);
            this.state = 211;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 208;
                this.objectField();
                }
                }
                this.state = 213;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 214;
            this.match(Stage3AParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 34, Stage3AParser.RULE_objectField);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 216;
            this.match(Stage3AParser.LPAREN);
            this.state = 217;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 30)) & ~0x1F) === 0 && ((1 << (_la - 30)) & 21) !== 0))) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 218;
            this.expression();
            this.state = 219;
            this.match(Stage3AParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 36, Stage3AParser.RULE_arrayExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 221;
            this.match(Stage3AParser.LPAREN);
            this.state = 222;
            this.match(Stage3AParser.ARRAY);
            this.state = 226;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3456106500) !== 0) || _la === 32 || _la === 34) {
                {
                {
                this.state = 223;
                this.expression();
                }
                }
                this.state = 228;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 229;
            this.match(Stage3AParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 38, Stage3AParser.RULE_propAccess);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 231;
            this.match(Stage3AParser.LPAREN);
            this.state = 232;
            this.match(Stage3AParser.DOT);
            this.state = 233;
            this.expression();
            this.state = 234;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 30)) & ~0x1F) === 0 && ((1 << (_la - 30)) & 21) !== 0))) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 235;
            this.match(Stage3AParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 40, Stage3AParser.RULE_indexAccess);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 237;
            this.match(Stage3AParser.LPAREN);
            this.state = 238;
            this.match(Stage3AParser.INDEX);
            this.state = 239;
            this.expression();
            this.state = 240;
            this.expression();
            this.state = 241;
            this.match(Stage3AParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 42, Stage3AParser.RULE_quasiquote);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 243;
            this.match(Stage3AParser.LPAREN);
            this.state = 244;
            _la = this.tokenStream.LA(1);
            if(!(_la === 21 || _la === 22)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 245;
            this.expression();
            this.state = 246;
            this.match(Stage3AParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 44, Stage3AParser.RULE_unquote);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 248;
            this.match(Stage3AParser.LPAREN);
            this.state = 249;
            this.match(Stage3AParser.UNQUOTE);
            this.state = 250;
            this.expression();
            this.state = 251;
            this.match(Stage3AParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 46, Stage3AParser.RULE_unquoteSplicing);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 253;
            this.match(Stage3AParser.LPAREN);
            this.state = 254;
            this.match(Stage3AParser.UNQUOTE_SPLICING);
            this.state = 255;
            this.expression();
            this.state = 256;
            this.match(Stage3AParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 48, Stage3AParser.RULE_call);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 258;
            this.match(Stage3AParser.LPAREN);
            this.state = 259;
            this.expression();
            this.state = 263;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3456106500) !== 0) || _la === 32 || _la === 34) {
                {
                {
                this.state = 260;
                this.expression();
                }
                }
                this.state = 265;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 266;
            this.match(Stage3AParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 50, Stage3AParser.RULE_fnSignature);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 268;
            this.match(Stage3AParser.LPAREN);
            this.state = 279;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2) {
                {
                this.state = 269;
                this.param();
                this.state = 276;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 2 || _la === 4) {
                    {
                    {
                    this.state = 271;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    if (_la === 4) {
                        {
                        this.state = 270;
                        this.match(Stage3AParser.COMMA);
                        }
                    }

                    this.state = 273;
                    this.param();
                    }
                    }
                    this.state = 278;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
            }

            this.state = 281;
            this.match(Stage3AParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 52, Stage3AParser.RULE_param);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 283;
            this.match(Stage3AParser.LPAREN);
            this.state = 284;
            this.match(Stage3AParser.IDENTIFIER);
            this.state = 285;
            this.match(Stage3AParser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 54, Stage3AParser.RULE_literal);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 287;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 25)) & ~0x1F) === 0 && ((1 << (_la - 25)) & 199) !== 0))) {
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
        4,1,35,290,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,
        6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,
        2,14,7,14,2,15,7,15,2,16,7,16,2,17,7,17,2,18,7,18,2,19,7,19,2,20,
        7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,24,2,25,7,25,2,26,7,26,
        2,27,7,27,1,0,1,0,1,0,5,0,60,8,0,10,0,12,0,63,9,0,1,0,1,0,1,1,1,
        1,1,1,3,1,70,8,1,1,2,1,2,1,2,1,2,1,2,5,2,77,8,2,10,2,12,2,80,9,2,
        1,2,1,2,1,3,1,3,1,3,1,3,1,3,1,3,1,4,1,4,1,4,1,4,1,4,1,4,1,4,3,4,
        97,8,4,1,5,1,5,1,5,1,5,5,5,103,8,5,10,5,12,5,106,9,5,1,5,1,5,5,5,
        110,8,5,10,5,12,5,113,9,5,1,5,1,5,1,6,1,6,1,6,1,6,1,6,1,6,1,7,1,
        7,1,7,1,7,1,7,3,7,128,8,7,1,7,1,7,1,8,1,8,1,8,1,8,5,8,136,8,8,10,
        8,12,8,139,9,8,1,8,1,8,1,9,1,9,1,9,5,9,146,8,9,10,9,12,9,149,9,9,
        1,9,1,9,1,10,1,10,1,10,3,10,156,8,10,1,10,1,10,1,11,1,11,1,11,3,
        11,163,8,11,1,11,1,11,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,
        12,1,12,1,12,1,12,1,12,1,12,3,12,181,8,12,1,13,1,13,1,13,1,13,5,
        13,187,8,13,10,13,12,13,190,9,13,1,13,1,13,1,14,1,14,1,14,1,14,1,
        14,1,14,1,15,1,15,1,15,1,15,1,15,1,15,1,15,1,16,1,16,1,16,5,16,210,
        8,16,10,16,12,16,213,9,16,1,16,1,16,1,17,1,17,1,17,1,17,1,17,1,18,
        1,18,1,18,5,18,225,8,18,10,18,12,18,228,9,18,1,18,1,18,1,19,1,19,
        1,19,1,19,1,19,1,19,1,20,1,20,1,20,1,20,1,20,1,20,1,21,1,21,1,21,
        1,21,1,21,1,22,1,22,1,22,1,22,1,22,1,23,1,23,1,23,1,23,1,23,1,24,
        1,24,1,24,5,24,262,8,24,10,24,12,24,265,9,24,1,24,1,24,1,25,1,25,
        1,25,3,25,272,8,25,1,25,5,25,275,8,25,10,25,12,25,278,9,25,3,25,
        280,8,25,1,25,1,25,1,26,1,26,1,26,1,26,1,27,1,27,1,27,0,0,28,0,2,
        4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,
        50,52,54,0,3,3,0,30,30,32,32,34,34,1,0,21,22,2,0,25,27,31,32,298,
        0,56,1,0,0,0,2,69,1,0,0,0,4,71,1,0,0,0,6,83,1,0,0,0,8,96,1,0,0,0,
        10,98,1,0,0,0,12,116,1,0,0,0,14,122,1,0,0,0,16,131,1,0,0,0,18,142,
        1,0,0,0,20,152,1,0,0,0,22,159,1,0,0,0,24,180,1,0,0,0,26,182,1,0,
        0,0,28,193,1,0,0,0,30,199,1,0,0,0,32,206,1,0,0,0,34,216,1,0,0,0,
        36,221,1,0,0,0,38,231,1,0,0,0,40,237,1,0,0,0,42,243,1,0,0,0,44,248,
        1,0,0,0,46,253,1,0,0,0,48,258,1,0,0,0,50,268,1,0,0,0,52,283,1,0,
        0,0,54,287,1,0,0,0,56,57,5,2,0,0,57,61,5,5,0,0,58,60,3,2,1,0,59,
        58,1,0,0,0,60,63,1,0,0,0,61,59,1,0,0,0,61,62,1,0,0,0,62,64,1,0,0,
        0,63,61,1,0,0,0,64,65,5,3,0,0,65,1,1,0,0,0,66,70,3,4,2,0,67,70,3,
        6,3,0,68,70,3,8,4,0,69,66,1,0,0,0,69,67,1,0,0,0,69,68,1,0,0,0,70,
        3,1,0,0,0,71,72,5,2,0,0,72,73,5,10,0,0,73,74,5,34,0,0,74,78,3,50,
        25,0,75,77,3,8,4,0,76,75,1,0,0,0,77,80,1,0,0,0,78,76,1,0,0,0,78,
        79,1,0,0,0,79,81,1,0,0,0,80,78,1,0,0,0,81,82,5,3,0,0,82,5,1,0,0,
        0,83,84,5,2,0,0,84,85,5,9,0,0,85,86,5,34,0,0,86,87,3,24,12,0,87,
        88,5,3,0,0,88,7,1,0,0,0,89,97,3,10,5,0,90,97,3,12,6,0,91,97,3,14,
        7,0,92,97,3,16,8,0,93,97,3,18,9,0,94,97,3,20,10,0,95,97,3,24,12,
        0,96,89,1,0,0,0,96,90,1,0,0,0,96,91,1,0,0,0,96,92,1,0,0,0,96,93,
        1,0,0,0,96,94,1,0,0,0,96,95,1,0,0,0,97,9,1,0,0,0,98,99,5,2,0,0,99,
        100,5,6,0,0,100,104,5,2,0,0,101,103,3,22,11,0,102,101,1,0,0,0,103,
        106,1,0,0,0,104,102,1,0,0,0,104,105,1,0,0,0,105,107,1,0,0,0,106,
        104,1,0,0,0,107,111,5,3,0,0,108,110,3,8,4,0,109,108,1,0,0,0,110,
        113,1,0,0,0,111,109,1,0,0,0,111,112,1,0,0,0,112,114,1,0,0,0,113,
        111,1,0,0,0,114,115,5,3,0,0,115,11,1,0,0,0,116,117,5,2,0,0,117,118,
        5,7,0,0,118,119,5,34,0,0,119,120,3,24,12,0,120,121,5,3,0,0,121,13,
        1,0,0,0,122,123,5,2,0,0,123,124,5,11,0,0,124,125,3,24,12,0,125,127,
        3,8,4,0,126,128,3,8,4,0,127,126,1,0,0,0,127,128,1,0,0,0,128,129,
        1,0,0,0,129,130,5,3,0,0,130,15,1,0,0,0,131,132,5,2,0,0,132,133,5,
        12,0,0,133,137,3,24,12,0,134,136,3,8,4,0,135,134,1,0,0,0,136,139,
        1,0,0,0,137,135,1,0,0,0,137,138,1,0,0,0,138,140,1,0,0,0,139,137,
        1,0,0,0,140,141,5,3,0,0,141,17,1,0,0,0,142,143,5,2,0,0,143,147,5,
        13,0,0,144,146,3,8,4,0,145,144,1,0,0,0,146,149,1,0,0,0,147,145,1,
        0,0,0,147,148,1,0,0,0,148,150,1,0,0,0,149,147,1,0,0,0,150,151,5,
        3,0,0,151,19,1,0,0,0,152,153,5,2,0,0,153,155,5,14,0,0,154,156,3,
        24,12,0,155,154,1,0,0,0,155,156,1,0,0,0,156,157,1,0,0,0,157,158,
        5,3,0,0,158,21,1,0,0,0,159,160,5,2,0,0,160,162,5,34,0,0,161,163,
        3,24,12,0,162,161,1,0,0,0,162,163,1,0,0,0,163,164,1,0,0,0,164,165,
        5,3,0,0,165,23,1,0,0,0,166,181,3,54,27,0,167,181,5,30,0,0,168,181,
        5,34,0,0,169,181,3,26,13,0,170,181,3,28,14,0,171,181,3,32,16,0,172,
        181,3,36,18,0,173,181,3,38,19,0,174,181,3,40,20,0,175,181,3,42,21,
        0,176,181,3,44,22,0,177,181,3,46,23,0,178,181,3,30,15,0,179,181,
        3,48,24,0,180,166,1,0,0,0,180,167,1,0,0,0,180,168,1,0,0,0,180,169,
        1,0,0,0,180,170,1,0,0,0,180,171,1,0,0,0,180,172,1,0,0,0,180,173,
        1,0,0,0,180,174,1,0,0,0,180,175,1,0,0,0,180,176,1,0,0,0,180,177,
        1,0,0,0,180,178,1,0,0,0,180,179,1,0,0,0,181,25,1,0,0,0,182,183,5,
        2,0,0,183,184,5,8,0,0,184,188,3,50,25,0,185,187,3,8,4,0,186,185,
        1,0,0,0,187,190,1,0,0,0,188,186,1,0,0,0,188,189,1,0,0,0,189,191,
        1,0,0,0,190,188,1,0,0,0,191,192,5,3,0,0,192,27,1,0,0,0,193,194,5,
        2,0,0,194,195,5,15,0,0,195,196,5,34,0,0,196,197,3,24,12,0,197,198,
        5,3,0,0,198,29,1,0,0,0,199,200,5,2,0,0,200,201,5,16,0,0,201,202,
        3,24,12,0,202,203,3,24,12,0,203,204,3,24,12,0,204,205,5,3,0,0,205,
        31,1,0,0,0,206,207,5,2,0,0,207,211,5,17,0,0,208,210,3,34,17,0,209,
        208,1,0,0,0,210,213,1,0,0,0,211,209,1,0,0,0,211,212,1,0,0,0,212,
        214,1,0,0,0,213,211,1,0,0,0,214,215,5,3,0,0,215,33,1,0,0,0,216,217,
        5,2,0,0,217,218,7,0,0,0,218,219,3,24,12,0,219,220,5,3,0,0,220,35,
        1,0,0,0,221,222,5,2,0,0,222,226,5,18,0,0,223,225,3,24,12,0,224,223,
        1,0,0,0,225,228,1,0,0,0,226,224,1,0,0,0,226,227,1,0,0,0,227,229,
        1,0,0,0,228,226,1,0,0,0,229,230,5,3,0,0,230,37,1,0,0,0,231,232,5,
        2,0,0,232,233,5,19,0,0,233,234,3,24,12,0,234,235,7,0,0,0,235,236,
        5,3,0,0,236,39,1,0,0,0,237,238,5,2,0,0,238,239,5,20,0,0,239,240,
        3,24,12,0,240,241,3,24,12,0,241,242,5,3,0,0,242,41,1,0,0,0,243,244,
        5,2,0,0,244,245,7,1,0,0,245,246,3,24,12,0,246,247,5,3,0,0,247,43,
        1,0,0,0,248,249,5,2,0,0,249,250,5,24,0,0,250,251,3,24,12,0,251,252,
        5,3,0,0,252,45,1,0,0,0,253,254,5,2,0,0,254,255,5,23,0,0,255,256,
        3,24,12,0,256,257,5,3,0,0,257,47,1,0,0,0,258,259,5,2,0,0,259,263,
        3,24,12,0,260,262,3,24,12,0,261,260,1,0,0,0,262,265,1,0,0,0,263,
        261,1,0,0,0,263,264,1,0,0,0,264,266,1,0,0,0,265,263,1,0,0,0,266,
        267,5,3,0,0,267,49,1,0,0,0,268,279,5,2,0,0,269,276,3,52,26,0,270,
        272,5,4,0,0,271,270,1,0,0,0,271,272,1,0,0,0,272,273,1,0,0,0,273,
        275,3,52,26,0,274,271,1,0,0,0,275,278,1,0,0,0,276,274,1,0,0,0,276,
        277,1,0,0,0,277,280,1,0,0,0,278,276,1,0,0,0,279,269,1,0,0,0,279,
        280,1,0,0,0,280,281,1,0,0,0,281,282,5,3,0,0,282,51,1,0,0,0,283,284,
        5,2,0,0,284,285,5,34,0,0,285,286,5,3,0,0,286,53,1,0,0,0,287,288,
        7,2,0,0,288,55,1,0,0,0,19,61,69,78,96,104,111,127,137,147,155,162,
        180,188,211,226,263,271,276,279
    ];

    private static __ATN: antlr.ATN;
    public static get _ATN(): antlr.ATN {
        if (!Stage3AParser.__ATN) {
            Stage3AParser.__ATN = new antlr.ATNDeserializer().deserialize(Stage3AParser._serializedATN);
        }

        return Stage3AParser.__ATN;
    }


    private static readonly vocabulary = new antlr.Vocabulary(Stage3AParser.literalNames, Stage3AParser.symbolicNames, []);

    public override get vocabulary(): antlr.Vocabulary {
        return Stage3AParser.vocabulary;
    }

    private static readonly decisionsToDFA = Stage3AParser._ATN.decisionToState.map( (ds: antlr.DecisionState, index: number) => new antlr.DFA(ds, index) );
}

export class ProgramContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3AParser.LPAREN, 0)!;
    }
    public PROGRAM(): antlr.TerminalNode {
        return this.getToken(Stage3AParser.PROGRAM, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3AParser.RPAREN, 0)!;
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
        return Stage3AParser.RULE_program;
    }
    public override enterRule(listener: Stage3AListener): void {
        if(listener.enterProgram) {
             listener.enterProgram(this);
        }
    }
    public override exitRule(listener: Stage3AListener): void {
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
        return Stage3AParser.RULE_topLevel;
    }
    public override enterRule(listener: Stage3AListener): void {
        if(listener.enterTopLevel) {
             listener.enterTopLevel(this);
        }
    }
    public override exitRule(listener: Stage3AListener): void {
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
        return this.getToken(Stage3AParser.LPAREN, 0)!;
    }
    public DEFMACRO(): antlr.TerminalNode {
        return this.getToken(Stage3AParser.DEFMACRO, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3AParser.IDENTIFIER, 0)!;
    }
    public fnSignature(): FnSignatureContext {
        return this.getRuleContext(0, FnSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3AParser.RPAREN, 0)!;
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
        return Stage3AParser.RULE_defmacro;
    }
    public override enterRule(listener: Stage3AListener): void {
        if(listener.enterDefmacro) {
             listener.enterDefmacro(this);
        }
    }
    public override exitRule(listener: Stage3AListener): void {
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
        return this.getToken(Stage3AParser.LPAREN, 0)!;
    }
    public DEF(): antlr.TerminalNode {
        return this.getToken(Stage3AParser.DEF, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3AParser.IDENTIFIER, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3AParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3AParser.RULE_def;
    }
    public override enterRule(listener: Stage3AListener): void {
        if(listener.enterDef) {
             listener.enterDef(this);
        }
    }
    public override exitRule(listener: Stage3AListener): void {
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
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public override get ruleIndex(): number {
        return Stage3AParser.RULE_statement;
    }
    public override enterRule(listener: Stage3AListener): void {
        if(listener.enterStatement) {
             listener.enterStatement(this);
        }
    }
    public override exitRule(listener: Stage3AListener): void {
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
    		return this.getTokens(Stage3AParser.LPAREN);
    	} else {
    		return this.getToken(Stage3AParser.LPAREN, i);
    	}
    }
    public LETSTAR(): antlr.TerminalNode {
        return this.getToken(Stage3AParser.LETSTAR, 0)!;
    }
    public RPAREN(): antlr.TerminalNode[];
    public RPAREN(i: number): antlr.TerminalNode | null;
    public RPAREN(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage3AParser.RPAREN);
    	} else {
    		return this.getToken(Stage3AParser.RPAREN, i);
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
        return Stage3AParser.RULE_letStar;
    }
    public override enterRule(listener: Stage3AListener): void {
        if(listener.enterLetStar) {
             listener.enterLetStar(this);
        }
    }
    public override exitRule(listener: Stage3AListener): void {
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
        return this.getToken(Stage3AParser.LPAREN, 0)!;
    }
    public LET(): antlr.TerminalNode {
        return this.getToken(Stage3AParser.LET, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3AParser.IDENTIFIER, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3AParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3AParser.RULE_letStmt;
    }
    public override enterRule(listener: Stage3AListener): void {
        if(listener.enterLetStmt) {
             listener.enterLetStmt(this);
        }
    }
    public override exitRule(listener: Stage3AListener): void {
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
        return this.getToken(Stage3AParser.LPAREN, 0)!;
    }
    public IF(): antlr.TerminalNode {
        return this.getToken(Stage3AParser.IF, 0)!;
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
        return this.getToken(Stage3AParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3AParser.RULE_ifForm;
    }
    public override enterRule(listener: Stage3AListener): void {
        if(listener.enterIfForm) {
             listener.enterIfForm(this);
        }
    }
    public override exitRule(listener: Stage3AListener): void {
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
        return this.getToken(Stage3AParser.LPAREN, 0)!;
    }
    public WHILE(): antlr.TerminalNode {
        return this.getToken(Stage3AParser.WHILE, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3AParser.RPAREN, 0)!;
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
        return Stage3AParser.RULE_whileForm;
    }
    public override enterRule(listener: Stage3AListener): void {
        if(listener.enterWhileForm) {
             listener.enterWhileForm(this);
        }
    }
    public override exitRule(listener: Stage3AListener): void {
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
        return this.getToken(Stage3AParser.LPAREN, 0)!;
    }
    public BEGIN(): antlr.TerminalNode {
        return this.getToken(Stage3AParser.BEGIN, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3AParser.RPAREN, 0)!;
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
        return Stage3AParser.RULE_block;
    }
    public override enterRule(listener: Stage3AListener): void {
        if(listener.enterBlock) {
             listener.enterBlock(this);
        }
    }
    public override exitRule(listener: Stage3AListener): void {
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
        return this.getToken(Stage3AParser.LPAREN, 0)!;
    }
    public RETURN(): antlr.TerminalNode {
        return this.getToken(Stage3AParser.RETURN, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3AParser.RPAREN, 0)!;
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public override get ruleIndex(): number {
        return Stage3AParser.RULE_returnForm;
    }
    public override enterRule(listener: Stage3AListener): void {
        if(listener.enterReturnForm) {
             listener.enterReturnForm(this);
        }
    }
    public override exitRule(listener: Stage3AListener): void {
        if(listener.exitReturnForm) {
             listener.exitReturnForm(this);
        }
    }
}


export class BindingContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3AParser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3AParser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3AParser.RPAREN, 0)!;
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public override get ruleIndex(): number {
        return Stage3AParser.RULE_binding;
    }
    public override enterRule(listener: Stage3AListener): void {
        if(listener.enterBinding) {
             listener.enterBinding(this);
        }
    }
    public override exitRule(listener: Stage3AListener): void {
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
        return this.getToken(Stage3AParser.KEYWORD, 0);
    }
    public IDENTIFIER(): antlr.TerminalNode | null {
        return this.getToken(Stage3AParser.IDENTIFIER, 0);
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
    public call(): CallContext | null {
        return this.getRuleContext(0, CallContext);
    }
    public override get ruleIndex(): number {
        return Stage3AParser.RULE_expression;
    }
    public override enterRule(listener: Stage3AListener): void {
        if(listener.enterExpression) {
             listener.enterExpression(this);
        }
    }
    public override exitRule(listener: Stage3AListener): void {
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
        return this.getToken(Stage3AParser.LPAREN, 0)!;
    }
    public LAMBDA(): antlr.TerminalNode {
        return this.getToken(Stage3AParser.LAMBDA, 0)!;
    }
    public fnSignature(): FnSignatureContext {
        return this.getRuleContext(0, FnSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3AParser.RPAREN, 0)!;
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
        return Stage3AParser.RULE_lambda;
    }
    public override enterRule(listener: Stage3AListener): void {
        if(listener.enterLambda) {
             listener.enterLambda(this);
        }
    }
    public override exitRule(listener: Stage3AListener): void {
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
        return this.getToken(Stage3AParser.LPAREN, 0)!;
    }
    public SET(): antlr.TerminalNode {
        return this.getToken(Stage3AParser.SET, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3AParser.IDENTIFIER, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3AParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3AParser.RULE_assign;
    }
    public override enterRule(listener: Stage3AListener): void {
        if(listener.enterAssign) {
             listener.enterAssign(this);
        }
    }
    public override exitRule(listener: Stage3AListener): void {
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
        return this.getToken(Stage3AParser.LPAREN, 0)!;
    }
    public TERNARY(): antlr.TerminalNode {
        return this.getToken(Stage3AParser.TERNARY, 0)!;
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
        return this.getToken(Stage3AParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3AParser.RULE_ternary;
    }
    public override enterRule(listener: Stage3AListener): void {
        if(listener.enterTernary) {
             listener.enterTernary(this);
        }
    }
    public override exitRule(listener: Stage3AListener): void {
        if(listener.exitTernary) {
             listener.exitTernary(this);
        }
    }
}


export class ObjectExprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3AParser.LPAREN, 0)!;
    }
    public OBJECT(): antlr.TerminalNode {
        return this.getToken(Stage3AParser.OBJECT, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3AParser.RPAREN, 0)!;
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
        return Stage3AParser.RULE_objectExpr;
    }
    public override enterRule(listener: Stage3AListener): void {
        if(listener.enterObjectExpr) {
             listener.enterObjectExpr(this);
        }
    }
    public override exitRule(listener: Stage3AListener): void {
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
        return this.getToken(Stage3AParser.LPAREN, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3AParser.RPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode | null {
        return this.getToken(Stage3AParser.IDENTIFIER, 0);
    }
    public KEYWORD(): antlr.TerminalNode | null {
        return this.getToken(Stage3AParser.KEYWORD, 0);
    }
    public STRING(): antlr.TerminalNode | null {
        return this.getToken(Stage3AParser.STRING, 0);
    }
    public override get ruleIndex(): number {
        return Stage3AParser.RULE_objectField;
    }
    public override enterRule(listener: Stage3AListener): void {
        if(listener.enterObjectField) {
             listener.enterObjectField(this);
        }
    }
    public override exitRule(listener: Stage3AListener): void {
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
        return this.getToken(Stage3AParser.LPAREN, 0)!;
    }
    public ARRAY(): antlr.TerminalNode {
        return this.getToken(Stage3AParser.ARRAY, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3AParser.RPAREN, 0)!;
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
        return Stage3AParser.RULE_arrayExpr;
    }
    public override enterRule(listener: Stage3AListener): void {
        if(listener.enterArrayExpr) {
             listener.enterArrayExpr(this);
        }
    }
    public override exitRule(listener: Stage3AListener): void {
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
        return this.getToken(Stage3AParser.LPAREN, 0)!;
    }
    public DOT(): antlr.TerminalNode {
        return this.getToken(Stage3AParser.DOT, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3AParser.RPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode | null {
        return this.getToken(Stage3AParser.IDENTIFIER, 0);
    }
    public KEYWORD(): antlr.TerminalNode | null {
        return this.getToken(Stage3AParser.KEYWORD, 0);
    }
    public STRING(): antlr.TerminalNode | null {
        return this.getToken(Stage3AParser.STRING, 0);
    }
    public override get ruleIndex(): number {
        return Stage3AParser.RULE_propAccess;
    }
    public override enterRule(listener: Stage3AListener): void {
        if(listener.enterPropAccess) {
             listener.enterPropAccess(this);
        }
    }
    public override exitRule(listener: Stage3AListener): void {
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
        return this.getToken(Stage3AParser.LPAREN, 0)!;
    }
    public INDEX(): antlr.TerminalNode {
        return this.getToken(Stage3AParser.INDEX, 0)!;
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
        return this.getToken(Stage3AParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3AParser.RULE_indexAccess;
    }
    public override enterRule(listener: Stage3AListener): void {
        if(listener.enterIndexAccess) {
             listener.enterIndexAccess(this);
        }
    }
    public override exitRule(listener: Stage3AListener): void {
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
        return this.getToken(Stage3AParser.LPAREN, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3AParser.RPAREN, 0)!;
    }
    public QUASI(): antlr.TerminalNode | null {
        return this.getToken(Stage3AParser.QUASI, 0);
    }
    public QUOTE(): antlr.TerminalNode | null {
        return this.getToken(Stage3AParser.QUOTE, 0);
    }
    public override get ruleIndex(): number {
        return Stage3AParser.RULE_quasiquote;
    }
    public override enterRule(listener: Stage3AListener): void {
        if(listener.enterQuasiquote) {
             listener.enterQuasiquote(this);
        }
    }
    public override exitRule(listener: Stage3AListener): void {
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
        return this.getToken(Stage3AParser.LPAREN, 0)!;
    }
    public UNQUOTE(): antlr.TerminalNode {
        return this.getToken(Stage3AParser.UNQUOTE, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3AParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3AParser.RULE_unquote;
    }
    public override enterRule(listener: Stage3AListener): void {
        if(listener.enterUnquote) {
             listener.enterUnquote(this);
        }
    }
    public override exitRule(listener: Stage3AListener): void {
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
        return this.getToken(Stage3AParser.LPAREN, 0)!;
    }
    public UNQUOTE_SPLICING(): antlr.TerminalNode {
        return this.getToken(Stage3AParser.UNQUOTE_SPLICING, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3AParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3AParser.RULE_unquoteSplicing;
    }
    public override enterRule(listener: Stage3AListener): void {
        if(listener.enterUnquoteSplicing) {
             listener.enterUnquoteSplicing(this);
        }
    }
    public override exitRule(listener: Stage3AListener): void {
        if(listener.exitUnquoteSplicing) {
             listener.exitUnquoteSplicing(this);
        }
    }
}


export class CallContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3AParser.LPAREN, 0)!;
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
        return this.getToken(Stage3AParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3AParser.RULE_call;
    }
    public override enterRule(listener: Stage3AListener): void {
        if(listener.enterCall) {
             listener.enterCall(this);
        }
    }
    public override exitRule(listener: Stage3AListener): void {
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
        return this.getToken(Stage3AParser.LPAREN, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3AParser.RPAREN, 0)!;
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
    		return this.getTokens(Stage3AParser.COMMA);
    	} else {
    		return this.getToken(Stage3AParser.COMMA, i);
    	}
    }
    public override get ruleIndex(): number {
        return Stage3AParser.RULE_fnSignature;
    }
    public override enterRule(listener: Stage3AListener): void {
        if(listener.enterFnSignature) {
             listener.enterFnSignature(this);
        }
    }
    public override exitRule(listener: Stage3AListener): void {
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
        return this.getToken(Stage3AParser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3AParser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3AParser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3AParser.RULE_param;
    }
    public override enterRule(listener: Stage3AListener): void {
        if(listener.enterParam) {
             listener.enterParam(this);
        }
    }
    public override exitRule(listener: Stage3AListener): void {
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
        return this.getToken(Stage3AParser.NUMBER, 0);
    }
    public STRING(): antlr.TerminalNode | null {
        return this.getToken(Stage3AParser.STRING, 0);
    }
    public BOOLEAN(): antlr.TerminalNode | null {
        return this.getToken(Stage3AParser.BOOLEAN, 0);
    }
    public NULL(): antlr.TerminalNode | null {
        return this.getToken(Stage3AParser.NULL, 0);
    }
    public UNDEFINED(): antlr.TerminalNode | null {
        return this.getToken(Stage3AParser.UNDEFINED, 0);
    }
    public override get ruleIndex(): number {
        return Stage3AParser.RULE_literal;
    }
    public override enterRule(listener: Stage3AListener): void {
        if(listener.enterLiteral) {
             listener.enterLiteral(this);
        }
    }
    public override exitRule(listener: Stage3AListener): void {
        if(listener.exitLiteral) {
             listener.exitLiteral(this);
        }
    }
}
