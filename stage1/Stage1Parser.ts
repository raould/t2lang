
import * as antlr from "antlr4ng";
import { Token } from "antlr4ng";

import { Stage1Listener } from "./Stage1Listener.js";
// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;


export class Stage1Parser extends antlr.Parser {
    public static readonly COMMENT = 1;
    public static readonly LPAREN = 2;
    public static readonly RPAREN = 3;
    public static readonly COMMA = 4;
    public static readonly PROGRAM = 5;
    public static readonly LETSTAR = 6;
    public static readonly LAMBDA = 7;
    public static readonly CALL = 8;
    public static readonly RAW = 9;
    public static readonly IF = 10;
    public static readonly WHILE = 11;
    public static readonly BOOLEAN = 12;
    public static readonly NULL = 13;
    public static readonly UNDEFINED = 14;
    public static readonly NUMBER = 15;
    public static readonly STRING = 16;
    public static readonly MULTILINE_STRING = 17;
    public static readonly IDENTIFIER = 18;
    public static readonly WS = 19;
    public static readonly RULE_program = 0;
    public static readonly RULE_statement = 1;
    public static readonly RULE_if = 2;
    public static readonly RULE_while = 3;
    public static readonly RULE_binding = 4;
    public static readonly RULE_letStar = 5;
    public static readonly RULE_lambda = 6;
    public static readonly RULE_fnSignature = 7;
    public static readonly RULE_param = 8;
    public static readonly RULE_expression = 9;
    public static readonly RULE_call = 10;
    public static readonly RULE_raw = 11;
    public static readonly RULE_literal = 12;

    public static readonly literalNames = [
        null, null, "'('", "')'", "','", "'program'", "'let*'", "'lambda'", 
        "'call'", "'raw'", "'if'", "'while'", null, "'null'", "'undefined'"
    ];

    public static readonly symbolicNames = [
        null, "COMMENT", "LPAREN", "RPAREN", "COMMA", "PROGRAM", "LETSTAR", 
        "LAMBDA", "CALL", "RAW", "IF", "WHILE", "BOOLEAN", "NULL", "UNDEFINED", 
        "NUMBER", "STRING", "MULTILINE_STRING", "IDENTIFIER", "WS"
    ];
    public static readonly ruleNames = [
        "program", "statement", "if", "while", "binding", "letStar", "lambda", 
        "fnSignature", "param", "expression", "call", "raw", "literal",
    ];

    public get grammarFileName(): string { return "Stage1.g4"; }
    public get literalNames(): (string | null)[] { return Stage1Parser.literalNames; }
    public get symbolicNames(): (string | null)[] { return Stage1Parser.symbolicNames; }
    public get ruleNames(): string[] { return Stage1Parser.ruleNames; }
    public get serializedATN(): number[] { return Stage1Parser._serializedATN; }

    protected createFailedPredicateException(predicate?: string, message?: string): antlr.FailedPredicateException {
        return new antlr.FailedPredicateException(this, predicate, message);
    }

    public constructor(input: antlr.TokenStream) {
        super(input);
        this.interpreter = new antlr.ParserATNSimulator(this, Stage1Parser._ATN, Stage1Parser.decisionsToDFA, new antlr.PredictionContextCache());
    }
    public program(): ProgramContext {
        let localContext = new ProgramContext(this.context, this.state);
        this.enterRule(localContext, 0, Stage1Parser.RULE_program);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 26;
            this.match(Stage1Parser.LPAREN);
            this.state = 27;
            this.match(Stage1Parser.PROGRAM);
            this.state = 31;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 389124) !== 0)) {
                {
                {
                this.state = 28;
                this.statement();
                }
                }
                this.state = 33;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 34;
            this.match(Stage1Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 2, Stage1Parser.RULE_statement);
        try {
            this.state = 42;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 1, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 36;
                this.expression();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 37;
                this.letStar();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 38;
                this.lambda();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 39;
                this.raw();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 40;
                this.if_();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 41;
                this.while_();
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
    public if_(): IfContext {
        let localContext = new IfContext(this.context, this.state);
        this.enterRule(localContext, 4, Stage1Parser.RULE_if);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 44;
            this.match(Stage1Parser.LPAREN);
            this.state = 45;
            this.match(Stage1Parser.IF);
            this.state = 46;
            this.expression();
            this.state = 47;
            this.statement();
            this.state = 49;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 389124) !== 0)) {
                {
                this.state = 48;
                this.statement();
                }
            }

            this.state = 51;
            this.match(Stage1Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public while_(): WhileContext {
        let localContext = new WhileContext(this.context, this.state);
        this.enterRule(localContext, 6, Stage1Parser.RULE_while);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 53;
            this.match(Stage1Parser.LPAREN);
            this.state = 54;
            this.match(Stage1Parser.WHILE);
            this.state = 55;
            this.expression();
            this.state = 56;
            this.statement();
            this.state = 57;
            this.match(Stage1Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 8, Stage1Parser.RULE_binding);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 59;
            this.match(Stage1Parser.LPAREN);
            this.state = 60;
            this.match(Stage1Parser.IDENTIFIER);
            this.state = 62;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 389124) !== 0)) {
                {
                this.state = 61;
                this.expression();
                }
            }

            this.state = 64;
            this.match(Stage1Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 10, Stage1Parser.RULE_letStar);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 66;
            this.match(Stage1Parser.LPAREN);
            this.state = 67;
            this.match(Stage1Parser.LETSTAR);
            this.state = 68;
            this.match(Stage1Parser.LPAREN);
            this.state = 72;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 69;
                this.binding();
                }
                }
                this.state = 74;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 75;
            this.match(Stage1Parser.RPAREN);
            this.state = 79;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 389124) !== 0)) {
                {
                {
                this.state = 76;
                this.statement();
                }
                }
                this.state = 81;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 82;
            this.match(Stage1Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 12, Stage1Parser.RULE_lambda);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 84;
            this.match(Stage1Parser.LPAREN);
            this.state = 85;
            this.match(Stage1Parser.LAMBDA);
            this.state = 86;
            this.fnSignature();
            this.state = 90;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 389124) !== 0)) {
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
            this.match(Stage1Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 14, Stage1Parser.RULE_fnSignature);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 95;
            this.match(Stage1Parser.LPAREN);
            this.state = 106;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2) {
                {
                this.state = 96;
                this.param();
                this.state = 103;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 2 || _la === 4) {
                    {
                    {
                    this.state = 98;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    if (_la === 4) {
                        {
                        this.state = 97;
                        this.match(Stage1Parser.COMMA);
                        }
                    }

                    this.state = 100;
                    this.param();
                    }
                    }
                    this.state = 105;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
            }

            this.state = 108;
            this.match(Stage1Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 16, Stage1Parser.RULE_param);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 110;
            this.match(Stage1Parser.LPAREN);
            this.state = 111;
            this.match(Stage1Parser.IDENTIFIER);
            this.state = 112;
            this.match(Stage1Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 18, Stage1Parser.RULE_expression);
        try {
            this.state = 119;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 10, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 114;
                this.literal();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 115;
                this.match(Stage1Parser.IDENTIFIER);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 116;
                this.call();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 117;
                this.lambda();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 118;
                this.raw();
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
    public call(): CallContext {
        let localContext = new CallContext(this.context, this.state);
        this.enterRule(localContext, 20, Stage1Parser.RULE_call);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 121;
            this.match(Stage1Parser.LPAREN);
            this.state = 122;
            this.match(Stage1Parser.CALL);
            this.state = 123;
            this.expression();
            this.state = 127;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 389124) !== 0)) {
                {
                {
                this.state = 124;
                this.expression();
                }
                }
                this.state = 129;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 130;
            this.match(Stage1Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public raw(): RawContext {
        let localContext = new RawContext(this.context, this.state);
        this.enterRule(localContext, 22, Stage1Parser.RULE_raw);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 132;
            this.match(Stage1Parser.LPAREN);
            this.state = 133;
            this.match(Stage1Parser.RAW);
            this.state = 134;
            this.match(Stage1Parser.STRING);
            this.state = 135;
            this.match(Stage1Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 24, Stage1Parser.RULE_literal);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 137;
            _la = this.tokenStream.LA(1);
            if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 126976) !== 0))) {
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
        4,1,19,140,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,
        6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,1,0,1,0,
        1,0,5,0,30,8,0,10,0,12,0,33,9,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,
        3,1,43,8,1,1,2,1,2,1,2,1,2,1,2,3,2,50,8,2,1,2,1,2,1,3,1,3,1,3,1,
        3,1,3,1,3,1,4,1,4,1,4,3,4,63,8,4,1,4,1,4,1,5,1,5,1,5,1,5,5,5,71,
        8,5,10,5,12,5,74,9,5,1,5,1,5,5,5,78,8,5,10,5,12,5,81,9,5,1,5,1,5,
        1,6,1,6,1,6,1,6,5,6,89,8,6,10,6,12,6,92,9,6,1,6,1,6,1,7,1,7,1,7,
        3,7,99,8,7,1,7,5,7,102,8,7,10,7,12,7,105,9,7,3,7,107,8,7,1,7,1,7,
        1,8,1,8,1,8,1,8,1,9,1,9,1,9,1,9,1,9,3,9,120,8,9,1,10,1,10,1,10,1,
        10,5,10,126,8,10,10,10,12,10,129,9,10,1,10,1,10,1,11,1,11,1,11,1,
        11,1,11,1,12,1,12,1,12,0,0,13,0,2,4,6,8,10,12,14,16,18,20,22,24,
        0,1,1,0,12,16,145,0,26,1,0,0,0,2,42,1,0,0,0,4,44,1,0,0,0,6,53,1,
        0,0,0,8,59,1,0,0,0,10,66,1,0,0,0,12,84,1,0,0,0,14,95,1,0,0,0,16,
        110,1,0,0,0,18,119,1,0,0,0,20,121,1,0,0,0,22,132,1,0,0,0,24,137,
        1,0,0,0,26,27,5,2,0,0,27,31,5,5,0,0,28,30,3,2,1,0,29,28,1,0,0,0,
        30,33,1,0,0,0,31,29,1,0,0,0,31,32,1,0,0,0,32,34,1,0,0,0,33,31,1,
        0,0,0,34,35,5,3,0,0,35,1,1,0,0,0,36,43,3,18,9,0,37,43,3,10,5,0,38,
        43,3,12,6,0,39,43,3,22,11,0,40,43,3,4,2,0,41,43,3,6,3,0,42,36,1,
        0,0,0,42,37,1,0,0,0,42,38,1,0,0,0,42,39,1,0,0,0,42,40,1,0,0,0,42,
        41,1,0,0,0,43,3,1,0,0,0,44,45,5,2,0,0,45,46,5,10,0,0,46,47,3,18,
        9,0,47,49,3,2,1,0,48,50,3,2,1,0,49,48,1,0,0,0,49,50,1,0,0,0,50,51,
        1,0,0,0,51,52,5,3,0,0,52,5,1,0,0,0,53,54,5,2,0,0,54,55,5,11,0,0,
        55,56,3,18,9,0,56,57,3,2,1,0,57,58,5,3,0,0,58,7,1,0,0,0,59,60,5,
        2,0,0,60,62,5,18,0,0,61,63,3,18,9,0,62,61,1,0,0,0,62,63,1,0,0,0,
        63,64,1,0,0,0,64,65,5,3,0,0,65,9,1,0,0,0,66,67,5,2,0,0,67,68,5,6,
        0,0,68,72,5,2,0,0,69,71,3,8,4,0,70,69,1,0,0,0,71,74,1,0,0,0,72,70,
        1,0,0,0,72,73,1,0,0,0,73,75,1,0,0,0,74,72,1,0,0,0,75,79,5,3,0,0,
        76,78,3,2,1,0,77,76,1,0,0,0,78,81,1,0,0,0,79,77,1,0,0,0,79,80,1,
        0,0,0,80,82,1,0,0,0,81,79,1,0,0,0,82,83,5,3,0,0,83,11,1,0,0,0,84,
        85,5,2,0,0,85,86,5,7,0,0,86,90,3,14,7,0,87,89,3,2,1,0,88,87,1,0,
        0,0,89,92,1,0,0,0,90,88,1,0,0,0,90,91,1,0,0,0,91,93,1,0,0,0,92,90,
        1,0,0,0,93,94,5,3,0,0,94,13,1,0,0,0,95,106,5,2,0,0,96,103,3,16,8,
        0,97,99,5,4,0,0,98,97,1,0,0,0,98,99,1,0,0,0,99,100,1,0,0,0,100,102,
        3,16,8,0,101,98,1,0,0,0,102,105,1,0,0,0,103,101,1,0,0,0,103,104,
        1,0,0,0,104,107,1,0,0,0,105,103,1,0,0,0,106,96,1,0,0,0,106,107,1,
        0,0,0,107,108,1,0,0,0,108,109,5,3,0,0,109,15,1,0,0,0,110,111,5,2,
        0,0,111,112,5,18,0,0,112,113,5,3,0,0,113,17,1,0,0,0,114,120,3,24,
        12,0,115,120,5,18,0,0,116,120,3,20,10,0,117,120,3,12,6,0,118,120,
        3,22,11,0,119,114,1,0,0,0,119,115,1,0,0,0,119,116,1,0,0,0,119,117,
        1,0,0,0,119,118,1,0,0,0,120,19,1,0,0,0,121,122,5,2,0,0,122,123,5,
        8,0,0,123,127,3,18,9,0,124,126,3,18,9,0,125,124,1,0,0,0,126,129,
        1,0,0,0,127,125,1,0,0,0,127,128,1,0,0,0,128,130,1,0,0,0,129,127,
        1,0,0,0,130,131,5,3,0,0,131,21,1,0,0,0,132,133,5,2,0,0,133,134,5,
        9,0,0,134,135,5,16,0,0,135,136,5,3,0,0,136,23,1,0,0,0,137,138,7,
        0,0,0,138,25,1,0,0,0,12,31,42,49,62,72,79,90,98,103,106,119,127
    ];

    private static __ATN: antlr.ATN;
    public static get _ATN(): antlr.ATN {
        if (!Stage1Parser.__ATN) {
            Stage1Parser.__ATN = new antlr.ATNDeserializer().deserialize(Stage1Parser._serializedATN);
        }

        return Stage1Parser.__ATN;
    }


    private static readonly vocabulary = new antlr.Vocabulary(Stage1Parser.literalNames, Stage1Parser.symbolicNames, []);

    public override get vocabulary(): antlr.Vocabulary {
        return Stage1Parser.vocabulary;
    }

    private static readonly decisionsToDFA = Stage1Parser._ATN.decisionToState.map( (ds: antlr.DecisionState, index: number) => new antlr.DFA(ds, index) );
}

export class ProgramContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage1Parser.LPAREN, 0)!;
    }
    public PROGRAM(): antlr.TerminalNode {
        return this.getToken(Stage1Parser.PROGRAM, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage1Parser.RPAREN, 0)!;
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
        return Stage1Parser.RULE_program;
    }
    public override enterRule(listener: Stage1Listener): void {
        if(listener.enterProgram) {
             listener.enterProgram(this);
        }
    }
    public override exitRule(listener: Stage1Listener): void {
        if(listener.exitProgram) {
             listener.exitProgram(this);
        }
    }
}


export class StatementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public letStar(): LetStarContext | null {
        return this.getRuleContext(0, LetStarContext);
    }
    public lambda(): LambdaContext | null {
        return this.getRuleContext(0, LambdaContext);
    }
    public raw(): RawContext | null {
        return this.getRuleContext(0, RawContext);
    }
    public if(): IfContext | null {
        return this.getRuleContext(0, IfContext);
    }
    public while(): WhileContext | null {
        return this.getRuleContext(0, WhileContext);
    }
    public override get ruleIndex(): number {
        return Stage1Parser.RULE_statement;
    }
    public override enterRule(listener: Stage1Listener): void {
        if(listener.enterStatement) {
             listener.enterStatement(this);
        }
    }
    public override exitRule(listener: Stage1Listener): void {
        if(listener.exitStatement) {
             listener.exitStatement(this);
        }
    }
}


export class IfContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage1Parser.LPAREN, 0)!;
    }
    public IF(): antlr.TerminalNode {
        return this.getToken(Stage1Parser.IF, 0)!;
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
        return this.getToken(Stage1Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage1Parser.RULE_if;
    }
    public override enterRule(listener: Stage1Listener): void {
        if(listener.enterIf) {
             listener.enterIf(this);
        }
    }
    public override exitRule(listener: Stage1Listener): void {
        if(listener.exitIf) {
             listener.exitIf(this);
        }
    }
}


export class WhileContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage1Parser.LPAREN, 0)!;
    }
    public WHILE(): antlr.TerminalNode {
        return this.getToken(Stage1Parser.WHILE, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public statement(): StatementContext {
        return this.getRuleContext(0, StatementContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage1Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage1Parser.RULE_while;
    }
    public override enterRule(listener: Stage1Listener): void {
        if(listener.enterWhile) {
             listener.enterWhile(this);
        }
    }
    public override exitRule(listener: Stage1Listener): void {
        if(listener.exitWhile) {
             listener.exitWhile(this);
        }
    }
}


export class BindingContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage1Parser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage1Parser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage1Parser.RPAREN, 0)!;
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public override get ruleIndex(): number {
        return Stage1Parser.RULE_binding;
    }
    public override enterRule(listener: Stage1Listener): void {
        if(listener.enterBinding) {
             listener.enterBinding(this);
        }
    }
    public override exitRule(listener: Stage1Listener): void {
        if(listener.exitBinding) {
             listener.exitBinding(this);
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
    		return this.getTokens(Stage1Parser.LPAREN);
    	} else {
    		return this.getToken(Stage1Parser.LPAREN, i);
    	}
    }
    public LETSTAR(): antlr.TerminalNode {
        return this.getToken(Stage1Parser.LETSTAR, 0)!;
    }
    public RPAREN(): antlr.TerminalNode[];
    public RPAREN(i: number): antlr.TerminalNode | null;
    public RPAREN(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage1Parser.RPAREN);
    	} else {
    		return this.getToken(Stage1Parser.RPAREN, i);
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
        return Stage1Parser.RULE_letStar;
    }
    public override enterRule(listener: Stage1Listener): void {
        if(listener.enterLetStar) {
             listener.enterLetStar(this);
        }
    }
    public override exitRule(listener: Stage1Listener): void {
        if(listener.exitLetStar) {
             listener.exitLetStar(this);
        }
    }
}


export class LambdaContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage1Parser.LPAREN, 0)!;
    }
    public LAMBDA(): antlr.TerminalNode {
        return this.getToken(Stage1Parser.LAMBDA, 0)!;
    }
    public fnSignature(): FnSignatureContext {
        return this.getRuleContext(0, FnSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage1Parser.RPAREN, 0)!;
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
        return Stage1Parser.RULE_lambda;
    }
    public override enterRule(listener: Stage1Listener): void {
        if(listener.enterLambda) {
             listener.enterLambda(this);
        }
    }
    public override exitRule(listener: Stage1Listener): void {
        if(listener.exitLambda) {
             listener.exitLambda(this);
        }
    }
}


export class FnSignatureContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage1Parser.LPAREN, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage1Parser.RPAREN, 0)!;
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
    		return this.getTokens(Stage1Parser.COMMA);
    	} else {
    		return this.getToken(Stage1Parser.COMMA, i);
    	}
    }
    public override get ruleIndex(): number {
        return Stage1Parser.RULE_fnSignature;
    }
    public override enterRule(listener: Stage1Listener): void {
        if(listener.enterFnSignature) {
             listener.enterFnSignature(this);
        }
    }
    public override exitRule(listener: Stage1Listener): void {
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
        return this.getToken(Stage1Parser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage1Parser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage1Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage1Parser.RULE_param;
    }
    public override enterRule(listener: Stage1Listener): void {
        if(listener.enterParam) {
             listener.enterParam(this);
        }
    }
    public override exitRule(listener: Stage1Listener): void {
        if(listener.exitParam) {
             listener.exitParam(this);
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
        return this.getToken(Stage1Parser.IDENTIFIER, 0);
    }
    public call(): CallContext | null {
        return this.getRuleContext(0, CallContext);
    }
    public lambda(): LambdaContext | null {
        return this.getRuleContext(0, LambdaContext);
    }
    public raw(): RawContext | null {
        return this.getRuleContext(0, RawContext);
    }
    public override get ruleIndex(): number {
        return Stage1Parser.RULE_expression;
    }
    public override enterRule(listener: Stage1Listener): void {
        if(listener.enterExpression) {
             listener.enterExpression(this);
        }
    }
    public override exitRule(listener: Stage1Listener): void {
        if(listener.exitExpression) {
             listener.exitExpression(this);
        }
    }
}


export class CallContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage1Parser.LPAREN, 0)!;
    }
    public CALL(): antlr.TerminalNode {
        return this.getToken(Stage1Parser.CALL, 0)!;
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
        return this.getToken(Stage1Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage1Parser.RULE_call;
    }
    public override enterRule(listener: Stage1Listener): void {
        if(listener.enterCall) {
             listener.enterCall(this);
        }
    }
    public override exitRule(listener: Stage1Listener): void {
        if(listener.exitCall) {
             listener.exitCall(this);
        }
    }
}


export class RawContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage1Parser.LPAREN, 0)!;
    }
    public RAW(): antlr.TerminalNode {
        return this.getToken(Stage1Parser.RAW, 0)!;
    }
    public STRING(): antlr.TerminalNode {
        return this.getToken(Stage1Parser.STRING, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage1Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage1Parser.RULE_raw;
    }
    public override enterRule(listener: Stage1Listener): void {
        if(listener.enterRaw) {
             listener.enterRaw(this);
        }
    }
    public override exitRule(listener: Stage1Listener): void {
        if(listener.exitRaw) {
             listener.exitRaw(this);
        }
    }
}


export class LiteralContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public NUMBER(): antlr.TerminalNode | null {
        return this.getToken(Stage1Parser.NUMBER, 0);
    }
    public STRING(): antlr.TerminalNode | null {
        return this.getToken(Stage1Parser.STRING, 0);
    }
    public BOOLEAN(): antlr.TerminalNode | null {
        return this.getToken(Stage1Parser.BOOLEAN, 0);
    }
    public NULL(): antlr.TerminalNode | null {
        return this.getToken(Stage1Parser.NULL, 0);
    }
    public UNDEFINED(): antlr.TerminalNode | null {
        return this.getToken(Stage1Parser.UNDEFINED, 0);
    }
    public override get ruleIndex(): number {
        return Stage1Parser.RULE_literal;
    }
    public override enterRule(listener: Stage1Listener): void {
        if(listener.enterLiteral) {
             listener.enterLiteral(this);
        }
    }
    public override exitRule(listener: Stage1Listener): void {
        if(listener.exitLiteral) {
             listener.exitLiteral(this);
        }
    }
}
