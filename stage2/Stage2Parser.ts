
import * as antlr from "antlr4ng";
import { Token } from "antlr4ng";

import { Stage2Listener } from "./Stage2Listener.js";
// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;


export class Stage2Parser extends antlr.Parser {
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
    public static readonly COND = 16;
    public static readonly BOOLEAN = 17;
    public static readonly NULL = 18;
    public static readonly UNDEFINED = 19;
    public static readonly NUMBER = 20;
    public static readonly STRING = 21;
    public static readonly MULTILINE_STRING = 22;
    public static readonly IDENTIFIER = 23;
    public static readonly WS = 24;
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
    public static readonly RULE_cond = 15;
    public static readonly RULE_call = 16;
    public static readonly RULE_fnSignature = 17;
    public static readonly RULE_param = 18;
    public static readonly RULE_literal = 19;

    public static readonly literalNames = [
        null, null, "'('", "')'", "','", "'program'", "'let*'", "'let'", 
        "'lambda'", "'def'", "'defmacro'", "'if'", "'while'", "'begin'", 
        "'return'", "'set!'", "'cond'", null, "'null'", "'undefined'"
    ];

    public static readonly symbolicNames = [
        null, "COMMENT", "LPAREN", "RPAREN", "COMMA", "PROGRAM", "LETSTAR", 
        "LET", "LAMBDA", "DEF", "DEFMACRO", "IF", "WHILE", "BEGIN", "RETURN", 
        "SET", "COND", "BOOLEAN", "NULL", "UNDEFINED", "NUMBER", "STRING", 
        "MULTILINE_STRING", "IDENTIFIER", "WS"
    ];
    public static readonly ruleNames = [
        "program", "topLevel", "defmacro", "def", "statement", "letStar", 
        "letStmt", "ifForm", "whileForm", "block", "returnForm", "binding", 
        "expression", "lambda", "assign", "cond", "call", "fnSignature", 
        "param", "literal",
    ];

    public get grammarFileName(): string { return "Stage2.g4"; }
    public get literalNames(): (string | null)[] { return Stage2Parser.literalNames; }
    public get symbolicNames(): (string | null)[] { return Stage2Parser.symbolicNames; }
    public get ruleNames(): string[] { return Stage2Parser.ruleNames; }
    public get serializedATN(): number[] { return Stage2Parser._serializedATN; }

    protected createFailedPredicateException(predicate?: string, message?: string): antlr.FailedPredicateException {
        return new antlr.FailedPredicateException(this, predicate, message);
    }

    public constructor(input: antlr.TokenStream) {
        super(input);
        this.interpreter = new antlr.ParserATNSimulator(this, Stage2Parser._ATN, Stage2Parser.decisionsToDFA, new antlr.PredictionContextCache());
    }
    public program(): ProgramContext {
        let localContext = new ProgramContext(this.context, this.state);
        this.enterRule(localContext, 0, Stage2Parser.RULE_program);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 40;
            this.match(Stage2Parser.LPAREN);
            this.state = 41;
            this.match(Stage2Parser.PROGRAM);
            this.state = 45;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 12451844) !== 0)) {
                {
                {
                this.state = 42;
                this.topLevel();
                }
                }
                this.state = 47;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 48;
            this.match(Stage2Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 2, Stage2Parser.RULE_topLevel);
        try {
            this.state = 53;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 1, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 50;
                this.defmacro();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 51;
                this.def();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 52;
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
        this.enterRule(localContext, 4, Stage2Parser.RULE_defmacro);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 55;
            this.match(Stage2Parser.LPAREN);
            this.state = 56;
            this.match(Stage2Parser.DEFMACRO);
            this.state = 57;
            this.match(Stage2Parser.IDENTIFIER);
            this.state = 58;
            this.fnSignature();
            this.state = 62;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 12451844) !== 0)) {
                {
                {
                this.state = 59;
                this.statement();
                }
                }
                this.state = 64;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 65;
            this.match(Stage2Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 6, Stage2Parser.RULE_def);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 67;
            this.match(Stage2Parser.LPAREN);
            this.state = 68;
            this.match(Stage2Parser.DEF);
            this.state = 69;
            this.match(Stage2Parser.IDENTIFIER);
            this.state = 70;
            this.expression();
            this.state = 71;
            this.match(Stage2Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 8, Stage2Parser.RULE_statement);
        try {
            this.state = 80;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 3, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 73;
                this.letStar();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 74;
                this.letStmt();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 75;
                this.ifForm();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 76;
                this.whileForm();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 77;
                this.block();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 78;
                this.returnForm();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 79;
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
        this.enterRule(localContext, 10, Stage2Parser.RULE_letStar);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 82;
            this.match(Stage2Parser.LPAREN);
            this.state = 83;
            this.match(Stage2Parser.LETSTAR);
            this.state = 84;
            this.match(Stage2Parser.LPAREN);
            this.state = 88;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 85;
                this.binding();
                }
                }
                this.state = 90;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 91;
            this.match(Stage2Parser.RPAREN);
            this.state = 95;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 12451844) !== 0)) {
                {
                {
                this.state = 92;
                this.statement();
                }
                }
                this.state = 97;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 98;
            this.match(Stage2Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 12, Stage2Parser.RULE_letStmt);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 100;
            this.match(Stage2Parser.LPAREN);
            this.state = 101;
            this.match(Stage2Parser.LET);
            this.state = 102;
            this.match(Stage2Parser.IDENTIFIER);
            this.state = 103;
            this.expression();
            this.state = 104;
            this.match(Stage2Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 14, Stage2Parser.RULE_ifForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 106;
            this.match(Stage2Parser.LPAREN);
            this.state = 107;
            this.match(Stage2Parser.IF);
            this.state = 108;
            this.expression();
            this.state = 109;
            this.statement();
            this.state = 111;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 12451844) !== 0)) {
                {
                this.state = 110;
                this.statement();
                }
            }

            this.state = 113;
            this.match(Stage2Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 16, Stage2Parser.RULE_whileForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 115;
            this.match(Stage2Parser.LPAREN);
            this.state = 116;
            this.match(Stage2Parser.WHILE);
            this.state = 117;
            this.expression();
            this.state = 121;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 12451844) !== 0)) {
                {
                {
                this.state = 118;
                this.statement();
                }
                }
                this.state = 123;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 124;
            this.match(Stage2Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 18, Stage2Parser.RULE_block);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 126;
            this.match(Stage2Parser.LPAREN);
            this.state = 127;
            this.match(Stage2Parser.BEGIN);
            this.state = 131;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 12451844) !== 0)) {
                {
                {
                this.state = 128;
                this.statement();
                }
                }
                this.state = 133;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 134;
            this.match(Stage2Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 20, Stage2Parser.RULE_returnForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 136;
            this.match(Stage2Parser.LPAREN);
            this.state = 137;
            this.match(Stage2Parser.RETURN);
            this.state = 139;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 12451844) !== 0)) {
                {
                this.state = 138;
                this.expression();
                }
            }

            this.state = 141;
            this.match(Stage2Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 22, Stage2Parser.RULE_binding);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 143;
            this.match(Stage2Parser.LPAREN);
            this.state = 144;
            this.match(Stage2Parser.IDENTIFIER);
            this.state = 146;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 12451844) !== 0)) {
                {
                this.state = 145;
                this.expression();
                }
            }

            this.state = 148;
            this.match(Stage2Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 24, Stage2Parser.RULE_expression);
        try {
            this.state = 156;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 11, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 150;
                this.literal();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 151;
                this.match(Stage2Parser.IDENTIFIER);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 152;
                this.lambda();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 153;
                this.assign();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 154;
                this.cond();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 155;
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
        this.enterRule(localContext, 26, Stage2Parser.RULE_lambda);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 158;
            this.match(Stage2Parser.LPAREN);
            this.state = 159;
            this.match(Stage2Parser.LAMBDA);
            this.state = 160;
            this.fnSignature();
            this.state = 164;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 12451844) !== 0)) {
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
            this.match(Stage2Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 28, Stage2Parser.RULE_assign);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 169;
            this.match(Stage2Parser.LPAREN);
            this.state = 170;
            this.match(Stage2Parser.SET);
            this.state = 171;
            this.match(Stage2Parser.IDENTIFIER);
            this.state = 172;
            this.expression();
            this.state = 173;
            this.match(Stage2Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public cond(): CondContext {
        let localContext = new CondContext(this.context, this.state);
        this.enterRule(localContext, 30, Stage2Parser.RULE_cond);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 175;
            this.match(Stage2Parser.LPAREN);
            this.state = 176;
            this.match(Stage2Parser.COND);
            this.state = 177;
            this.expression();
            this.state = 178;
            this.expression();
            this.state = 180;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 12451844) !== 0)) {
                {
                this.state = 179;
                this.expression();
                }
            }

            this.state = 182;
            this.match(Stage2Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 32, Stage2Parser.RULE_call);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 184;
            this.match(Stage2Parser.LPAREN);
            this.state = 185;
            this.expression();
            this.state = 189;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 12451844) !== 0)) {
                {
                {
                this.state = 186;
                this.expression();
                }
                }
                this.state = 191;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 192;
            this.match(Stage2Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 34, Stage2Parser.RULE_fnSignature);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 194;
            this.match(Stage2Parser.LPAREN);
            this.state = 205;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2) {
                {
                this.state = 195;
                this.param();
                this.state = 202;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 2 || _la === 4) {
                    {
                    {
                    this.state = 197;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    if (_la === 4) {
                        {
                        this.state = 196;
                        this.match(Stage2Parser.COMMA);
                        }
                    }

                    this.state = 199;
                    this.param();
                    }
                    }
                    this.state = 204;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
            }

            this.state = 207;
            this.match(Stage2Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 36, Stage2Parser.RULE_param);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 209;
            this.match(Stage2Parser.LPAREN);
            this.state = 210;
            this.match(Stage2Parser.IDENTIFIER);
            this.state = 211;
            this.match(Stage2Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 38, Stage2Parser.RULE_literal);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 213;
            _la = this.tokenStream.LA(1);
            if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 4063232) !== 0))) {
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
        4,1,24,216,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,
        6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,
        2,14,7,14,2,15,7,15,2,16,7,16,2,17,7,17,2,18,7,18,2,19,7,19,1,0,
        1,0,1,0,5,0,44,8,0,10,0,12,0,47,9,0,1,0,1,0,1,1,1,1,1,1,3,1,54,8,
        1,1,2,1,2,1,2,1,2,1,2,5,2,61,8,2,10,2,12,2,64,9,2,1,2,1,2,1,3,1,
        3,1,3,1,3,1,3,1,3,1,4,1,4,1,4,1,4,1,4,1,4,1,4,3,4,81,8,4,1,5,1,5,
        1,5,1,5,5,5,87,8,5,10,5,12,5,90,9,5,1,5,1,5,5,5,94,8,5,10,5,12,5,
        97,9,5,1,5,1,5,1,6,1,6,1,6,1,6,1,6,1,6,1,7,1,7,1,7,1,7,1,7,3,7,112,
        8,7,1,7,1,7,1,8,1,8,1,8,1,8,5,8,120,8,8,10,8,12,8,123,9,8,1,8,1,
        8,1,9,1,9,1,9,5,9,130,8,9,10,9,12,9,133,9,9,1,9,1,9,1,10,1,10,1,
        10,3,10,140,8,10,1,10,1,10,1,11,1,11,1,11,3,11,147,8,11,1,11,1,11,
        1,12,1,12,1,12,1,12,1,12,1,12,3,12,157,8,12,1,13,1,13,1,13,1,13,
        5,13,163,8,13,10,13,12,13,166,9,13,1,13,1,13,1,14,1,14,1,14,1,14,
        1,14,1,14,1,15,1,15,1,15,1,15,1,15,3,15,181,8,15,1,15,1,15,1,16,
        1,16,1,16,5,16,188,8,16,10,16,12,16,191,9,16,1,16,1,16,1,17,1,17,
        1,17,3,17,198,8,17,1,17,5,17,201,8,17,10,17,12,17,204,9,17,3,17,
        206,8,17,1,17,1,17,1,18,1,18,1,18,1,18,1,19,1,19,1,19,0,0,20,0,2,
        4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,0,1,1,0,17,21,
        223,0,40,1,0,0,0,2,53,1,0,0,0,4,55,1,0,0,0,6,67,1,0,0,0,8,80,1,0,
        0,0,10,82,1,0,0,0,12,100,1,0,0,0,14,106,1,0,0,0,16,115,1,0,0,0,18,
        126,1,0,0,0,20,136,1,0,0,0,22,143,1,0,0,0,24,156,1,0,0,0,26,158,
        1,0,0,0,28,169,1,0,0,0,30,175,1,0,0,0,32,184,1,0,0,0,34,194,1,0,
        0,0,36,209,1,0,0,0,38,213,1,0,0,0,40,41,5,2,0,0,41,45,5,5,0,0,42,
        44,3,2,1,0,43,42,1,0,0,0,44,47,1,0,0,0,45,43,1,0,0,0,45,46,1,0,0,
        0,46,48,1,0,0,0,47,45,1,0,0,0,48,49,5,3,0,0,49,1,1,0,0,0,50,54,3,
        4,2,0,51,54,3,6,3,0,52,54,3,8,4,0,53,50,1,0,0,0,53,51,1,0,0,0,53,
        52,1,0,0,0,54,3,1,0,0,0,55,56,5,2,0,0,56,57,5,10,0,0,57,58,5,23,
        0,0,58,62,3,34,17,0,59,61,3,8,4,0,60,59,1,0,0,0,61,64,1,0,0,0,62,
        60,1,0,0,0,62,63,1,0,0,0,63,65,1,0,0,0,64,62,1,0,0,0,65,66,5,3,0,
        0,66,5,1,0,0,0,67,68,5,2,0,0,68,69,5,9,0,0,69,70,5,23,0,0,70,71,
        3,24,12,0,71,72,5,3,0,0,72,7,1,0,0,0,73,81,3,10,5,0,74,81,3,12,6,
        0,75,81,3,14,7,0,76,81,3,16,8,0,77,81,3,18,9,0,78,81,3,20,10,0,79,
        81,3,24,12,0,80,73,1,0,0,0,80,74,1,0,0,0,80,75,1,0,0,0,80,76,1,0,
        0,0,80,77,1,0,0,0,80,78,1,0,0,0,80,79,1,0,0,0,81,9,1,0,0,0,82,83,
        5,2,0,0,83,84,5,6,0,0,84,88,5,2,0,0,85,87,3,22,11,0,86,85,1,0,0,
        0,87,90,1,0,0,0,88,86,1,0,0,0,88,89,1,0,0,0,89,91,1,0,0,0,90,88,
        1,0,0,0,91,95,5,3,0,0,92,94,3,8,4,0,93,92,1,0,0,0,94,97,1,0,0,0,
        95,93,1,0,0,0,95,96,1,0,0,0,96,98,1,0,0,0,97,95,1,0,0,0,98,99,5,
        3,0,0,99,11,1,0,0,0,100,101,5,2,0,0,101,102,5,7,0,0,102,103,5,23,
        0,0,103,104,3,24,12,0,104,105,5,3,0,0,105,13,1,0,0,0,106,107,5,2,
        0,0,107,108,5,11,0,0,108,109,3,24,12,0,109,111,3,8,4,0,110,112,3,
        8,4,0,111,110,1,0,0,0,111,112,1,0,0,0,112,113,1,0,0,0,113,114,5,
        3,0,0,114,15,1,0,0,0,115,116,5,2,0,0,116,117,5,12,0,0,117,121,3,
        24,12,0,118,120,3,8,4,0,119,118,1,0,0,0,120,123,1,0,0,0,121,119,
        1,0,0,0,121,122,1,0,0,0,122,124,1,0,0,0,123,121,1,0,0,0,124,125,
        5,3,0,0,125,17,1,0,0,0,126,127,5,2,0,0,127,131,5,13,0,0,128,130,
        3,8,4,0,129,128,1,0,0,0,130,133,1,0,0,0,131,129,1,0,0,0,131,132,
        1,0,0,0,132,134,1,0,0,0,133,131,1,0,0,0,134,135,5,3,0,0,135,19,1,
        0,0,0,136,137,5,2,0,0,137,139,5,14,0,0,138,140,3,24,12,0,139,138,
        1,0,0,0,139,140,1,0,0,0,140,141,1,0,0,0,141,142,5,3,0,0,142,21,1,
        0,0,0,143,144,5,2,0,0,144,146,5,23,0,0,145,147,3,24,12,0,146,145,
        1,0,0,0,146,147,1,0,0,0,147,148,1,0,0,0,148,149,5,3,0,0,149,23,1,
        0,0,0,150,157,3,38,19,0,151,157,5,23,0,0,152,157,3,26,13,0,153,157,
        3,28,14,0,154,157,3,30,15,0,155,157,3,32,16,0,156,150,1,0,0,0,156,
        151,1,0,0,0,156,152,1,0,0,0,156,153,1,0,0,0,156,154,1,0,0,0,156,
        155,1,0,0,0,157,25,1,0,0,0,158,159,5,2,0,0,159,160,5,8,0,0,160,164,
        3,34,17,0,161,163,3,8,4,0,162,161,1,0,0,0,163,166,1,0,0,0,164,162,
        1,0,0,0,164,165,1,0,0,0,165,167,1,0,0,0,166,164,1,0,0,0,167,168,
        5,3,0,0,168,27,1,0,0,0,169,170,5,2,0,0,170,171,5,15,0,0,171,172,
        5,23,0,0,172,173,3,24,12,0,173,174,5,3,0,0,174,29,1,0,0,0,175,176,
        5,2,0,0,176,177,5,16,0,0,177,178,3,24,12,0,178,180,3,24,12,0,179,
        181,3,24,12,0,180,179,1,0,0,0,180,181,1,0,0,0,181,182,1,0,0,0,182,
        183,5,3,0,0,183,31,1,0,0,0,184,185,5,2,0,0,185,189,3,24,12,0,186,
        188,3,24,12,0,187,186,1,0,0,0,188,191,1,0,0,0,189,187,1,0,0,0,189,
        190,1,0,0,0,190,192,1,0,0,0,191,189,1,0,0,0,192,193,5,3,0,0,193,
        33,1,0,0,0,194,205,5,2,0,0,195,202,3,36,18,0,196,198,5,4,0,0,197,
        196,1,0,0,0,197,198,1,0,0,0,198,199,1,0,0,0,199,201,3,36,18,0,200,
        197,1,0,0,0,201,204,1,0,0,0,202,200,1,0,0,0,202,203,1,0,0,0,203,
        206,1,0,0,0,204,202,1,0,0,0,205,195,1,0,0,0,205,206,1,0,0,0,206,
        207,1,0,0,0,207,208,5,3,0,0,208,35,1,0,0,0,209,210,5,2,0,0,210,211,
        5,23,0,0,211,212,5,3,0,0,212,37,1,0,0,0,213,214,7,0,0,0,214,39,1,
        0,0,0,18,45,53,62,80,88,95,111,121,131,139,146,156,164,180,189,197,
        202,205
    ];

    private static __ATN: antlr.ATN;
    public static get _ATN(): antlr.ATN {
        if (!Stage2Parser.__ATN) {
            Stage2Parser.__ATN = new antlr.ATNDeserializer().deserialize(Stage2Parser._serializedATN);
        }

        return Stage2Parser.__ATN;
    }


    private static readonly vocabulary = new antlr.Vocabulary(Stage2Parser.literalNames, Stage2Parser.symbolicNames, []);

    public override get vocabulary(): antlr.Vocabulary {
        return Stage2Parser.vocabulary;
    }

    private static readonly decisionsToDFA = Stage2Parser._ATN.decisionToState.map( (ds: antlr.DecisionState, index: number) => new antlr.DFA(ds, index) );
}

export class ProgramContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage2Parser.LPAREN, 0)!;
    }
    public PROGRAM(): antlr.TerminalNode {
        return this.getToken(Stage2Parser.PROGRAM, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage2Parser.RPAREN, 0)!;
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
        return Stage2Parser.RULE_program;
    }
    public override enterRule(listener: Stage2Listener): void {
        if(listener.enterProgram) {
             listener.enterProgram(this);
        }
    }
    public override exitRule(listener: Stage2Listener): void {
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
        return Stage2Parser.RULE_topLevel;
    }
    public override enterRule(listener: Stage2Listener): void {
        if(listener.enterTopLevel) {
             listener.enterTopLevel(this);
        }
    }
    public override exitRule(listener: Stage2Listener): void {
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
        return this.getToken(Stage2Parser.LPAREN, 0)!;
    }
    public DEFMACRO(): antlr.TerminalNode {
        return this.getToken(Stage2Parser.DEFMACRO, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage2Parser.IDENTIFIER, 0)!;
    }
    public fnSignature(): FnSignatureContext {
        return this.getRuleContext(0, FnSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage2Parser.RPAREN, 0)!;
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
        return Stage2Parser.RULE_defmacro;
    }
    public override enterRule(listener: Stage2Listener): void {
        if(listener.enterDefmacro) {
             listener.enterDefmacro(this);
        }
    }
    public override exitRule(listener: Stage2Listener): void {
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
        return this.getToken(Stage2Parser.LPAREN, 0)!;
    }
    public DEF(): antlr.TerminalNode {
        return this.getToken(Stage2Parser.DEF, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage2Parser.IDENTIFIER, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage2Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage2Parser.RULE_def;
    }
    public override enterRule(listener: Stage2Listener): void {
        if(listener.enterDef) {
             listener.enterDef(this);
        }
    }
    public override exitRule(listener: Stage2Listener): void {
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
        return Stage2Parser.RULE_statement;
    }
    public override enterRule(listener: Stage2Listener): void {
        if(listener.enterStatement) {
             listener.enterStatement(this);
        }
    }
    public override exitRule(listener: Stage2Listener): void {
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
    		return this.getTokens(Stage2Parser.LPAREN);
    	} else {
    		return this.getToken(Stage2Parser.LPAREN, i);
    	}
    }
    public LETSTAR(): antlr.TerminalNode {
        return this.getToken(Stage2Parser.LETSTAR, 0)!;
    }
    public RPAREN(): antlr.TerminalNode[];
    public RPAREN(i: number): antlr.TerminalNode | null;
    public RPAREN(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage2Parser.RPAREN);
    	} else {
    		return this.getToken(Stage2Parser.RPAREN, i);
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
        return Stage2Parser.RULE_letStar;
    }
    public override enterRule(listener: Stage2Listener): void {
        if(listener.enterLetStar) {
             listener.enterLetStar(this);
        }
    }
    public override exitRule(listener: Stage2Listener): void {
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
        return this.getToken(Stage2Parser.LPAREN, 0)!;
    }
    public LET(): antlr.TerminalNode {
        return this.getToken(Stage2Parser.LET, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage2Parser.IDENTIFIER, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage2Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage2Parser.RULE_letStmt;
    }
    public override enterRule(listener: Stage2Listener): void {
        if(listener.enterLetStmt) {
             listener.enterLetStmt(this);
        }
    }
    public override exitRule(listener: Stage2Listener): void {
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
        return this.getToken(Stage2Parser.LPAREN, 0)!;
    }
    public IF(): antlr.TerminalNode {
        return this.getToken(Stage2Parser.IF, 0)!;
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
        return this.getToken(Stage2Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage2Parser.RULE_ifForm;
    }
    public override enterRule(listener: Stage2Listener): void {
        if(listener.enterIfForm) {
             listener.enterIfForm(this);
        }
    }
    public override exitRule(listener: Stage2Listener): void {
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
        return this.getToken(Stage2Parser.LPAREN, 0)!;
    }
    public WHILE(): antlr.TerminalNode {
        return this.getToken(Stage2Parser.WHILE, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage2Parser.RPAREN, 0)!;
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
        return Stage2Parser.RULE_whileForm;
    }
    public override enterRule(listener: Stage2Listener): void {
        if(listener.enterWhileForm) {
             listener.enterWhileForm(this);
        }
    }
    public override exitRule(listener: Stage2Listener): void {
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
        return this.getToken(Stage2Parser.LPAREN, 0)!;
    }
    public BEGIN(): antlr.TerminalNode {
        return this.getToken(Stage2Parser.BEGIN, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage2Parser.RPAREN, 0)!;
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
        return Stage2Parser.RULE_block;
    }
    public override enterRule(listener: Stage2Listener): void {
        if(listener.enterBlock) {
             listener.enterBlock(this);
        }
    }
    public override exitRule(listener: Stage2Listener): void {
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
        return this.getToken(Stage2Parser.LPAREN, 0)!;
    }
    public RETURN(): antlr.TerminalNode {
        return this.getToken(Stage2Parser.RETURN, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage2Parser.RPAREN, 0)!;
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public override get ruleIndex(): number {
        return Stage2Parser.RULE_returnForm;
    }
    public override enterRule(listener: Stage2Listener): void {
        if(listener.enterReturnForm) {
             listener.enterReturnForm(this);
        }
    }
    public override exitRule(listener: Stage2Listener): void {
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
        return this.getToken(Stage2Parser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage2Parser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage2Parser.RPAREN, 0)!;
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public override get ruleIndex(): number {
        return Stage2Parser.RULE_binding;
    }
    public override enterRule(listener: Stage2Listener): void {
        if(listener.enterBinding) {
             listener.enterBinding(this);
        }
    }
    public override exitRule(listener: Stage2Listener): void {
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
    public IDENTIFIER(): antlr.TerminalNode | null {
        return this.getToken(Stage2Parser.IDENTIFIER, 0);
    }
    public lambda(): LambdaContext | null {
        return this.getRuleContext(0, LambdaContext);
    }
    public assign(): AssignContext | null {
        return this.getRuleContext(0, AssignContext);
    }
    public cond(): CondContext | null {
        return this.getRuleContext(0, CondContext);
    }
    public call(): CallContext | null {
        return this.getRuleContext(0, CallContext);
    }
    public override get ruleIndex(): number {
        return Stage2Parser.RULE_expression;
    }
    public override enterRule(listener: Stage2Listener): void {
        if(listener.enterExpression) {
             listener.enterExpression(this);
        }
    }
    public override exitRule(listener: Stage2Listener): void {
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
        return this.getToken(Stage2Parser.LPAREN, 0)!;
    }
    public LAMBDA(): antlr.TerminalNode {
        return this.getToken(Stage2Parser.LAMBDA, 0)!;
    }
    public fnSignature(): FnSignatureContext {
        return this.getRuleContext(0, FnSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage2Parser.RPAREN, 0)!;
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
        return Stage2Parser.RULE_lambda;
    }
    public override enterRule(listener: Stage2Listener): void {
        if(listener.enterLambda) {
             listener.enterLambda(this);
        }
    }
    public override exitRule(listener: Stage2Listener): void {
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
        return this.getToken(Stage2Parser.LPAREN, 0)!;
    }
    public SET(): antlr.TerminalNode {
        return this.getToken(Stage2Parser.SET, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage2Parser.IDENTIFIER, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage2Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage2Parser.RULE_assign;
    }
    public override enterRule(listener: Stage2Listener): void {
        if(listener.enterAssign) {
             listener.enterAssign(this);
        }
    }
    public override exitRule(listener: Stage2Listener): void {
        if(listener.exitAssign) {
             listener.exitAssign(this);
        }
    }
}


export class CondContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage2Parser.LPAREN, 0)!;
    }
    public COND(): antlr.TerminalNode {
        return this.getToken(Stage2Parser.COND, 0)!;
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
        return this.getToken(Stage2Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage2Parser.RULE_cond;
    }
    public override enterRule(listener: Stage2Listener): void {
        if(listener.enterCond) {
             listener.enterCond(this);
        }
    }
    public override exitRule(listener: Stage2Listener): void {
        if(listener.exitCond) {
             listener.exitCond(this);
        }
    }
}


export class CallContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage2Parser.LPAREN, 0)!;
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
        return this.getToken(Stage2Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage2Parser.RULE_call;
    }
    public override enterRule(listener: Stage2Listener): void {
        if(listener.enterCall) {
             listener.enterCall(this);
        }
    }
    public override exitRule(listener: Stage2Listener): void {
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
        return this.getToken(Stage2Parser.LPAREN, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage2Parser.RPAREN, 0)!;
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
    		return this.getTokens(Stage2Parser.COMMA);
    	} else {
    		return this.getToken(Stage2Parser.COMMA, i);
    	}
    }
    public override get ruleIndex(): number {
        return Stage2Parser.RULE_fnSignature;
    }
    public override enterRule(listener: Stage2Listener): void {
        if(listener.enterFnSignature) {
             listener.enterFnSignature(this);
        }
    }
    public override exitRule(listener: Stage2Listener): void {
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
        return this.getToken(Stage2Parser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage2Parser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage2Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage2Parser.RULE_param;
    }
    public override enterRule(listener: Stage2Listener): void {
        if(listener.enterParam) {
             listener.enterParam(this);
        }
    }
    public override exitRule(listener: Stage2Listener): void {
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
        return this.getToken(Stage2Parser.NUMBER, 0);
    }
    public STRING(): antlr.TerminalNode | null {
        return this.getToken(Stage2Parser.STRING, 0);
    }
    public BOOLEAN(): antlr.TerminalNode | null {
        return this.getToken(Stage2Parser.BOOLEAN, 0);
    }
    public NULL(): antlr.TerminalNode | null {
        return this.getToken(Stage2Parser.NULL, 0);
    }
    public UNDEFINED(): antlr.TerminalNode | null {
        return this.getToken(Stage2Parser.UNDEFINED, 0);
    }
    public override get ruleIndex(): number {
        return Stage2Parser.RULE_literal;
    }
    public override enterRule(listener: Stage2Listener): void {
        if(listener.enterLiteral) {
             listener.enterLiteral(this);
        }
    }
    public override exitRule(listener: Stage2Listener): void {
        if(listener.exitLiteral) {
             listener.exitLiteral(this);
        }
    }
}
