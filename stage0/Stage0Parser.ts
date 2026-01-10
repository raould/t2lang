
import * as antlr from "antlr4ng";
import { Token } from "antlr4ng";

import { Stage0Listener } from "./Stage0Listener.js";
// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;


export class Stage0Parser extends antlr.Parser {
    public static readonly COMMENT = 1;
    public static readonly LPAREN = 2;
    public static readonly RPAREN = 3;
    public static readonly COMMA = 4;
    public static readonly PROGRAM = 5;
    public static readonly LETSTAR = 6;
    public static readonly LAMBDA = 7;
    public static readonly CALL = 8;
    public static readonly RAW = 9;
    public static readonly BOOLEAN = 10;
    public static readonly NULL = 11;
    public static readonly UNDEFINED = 12;
    public static readonly NUMBER = 13;
    public static readonly STRING = 14;
    public static readonly MULTILINE_STRING = 15;
    public static readonly IDENTIFIER = 16;
    public static readonly WS = 17;
    public static readonly RULE_program = 0;
    public static readonly RULE_statement = 1;
    public static readonly RULE_binding = 2;
    public static readonly RULE_letStar = 3;
    public static readonly RULE_lambda = 4;
    public static readonly RULE_fnSignature = 5;
    public static readonly RULE_param = 6;
    public static readonly RULE_expression = 7;
    public static readonly RULE_call = 8;
    public static readonly RULE_raw = 9;
    public static readonly RULE_literal = 10;

    public static readonly literalNames = [
        null, null, "'('", "')'", "','", "'program'", "'let*'", "'lambda'", 
        "'call'", "'raw'", null, "'null'", "'undefined'"
    ];

    public static readonly symbolicNames = [
        null, "COMMENT", "LPAREN", "RPAREN", "COMMA", "PROGRAM", "LETSTAR", 
        "LAMBDA", "CALL", "RAW", "BOOLEAN", "NULL", "UNDEFINED", "NUMBER", 
        "STRING", "MULTILINE_STRING", "IDENTIFIER", "WS"
    ];
    public static readonly ruleNames = [
        "program", "statement", "binding", "letStar", "lambda", "fnSignature", 
        "param", "expression", "call", "raw", "literal",
    ];

    public get grammarFileName(): string { return "Stage0.g4"; }
    public get literalNames(): (string | null)[] { return Stage0Parser.literalNames; }
    public get symbolicNames(): (string | null)[] { return Stage0Parser.symbolicNames; }
    public get ruleNames(): string[] { return Stage0Parser.ruleNames; }
    public get serializedATN(): number[] { return Stage0Parser._serializedATN; }

    protected createFailedPredicateException(predicate?: string, message?: string): antlr.FailedPredicateException {
        return new antlr.FailedPredicateException(this, predicate, message);
    }

    public constructor(input: antlr.TokenStream) {
        super(input);
        this.interpreter = new antlr.ParserATNSimulator(this, Stage0Parser._ATN, Stage0Parser.decisionsToDFA, new antlr.PredictionContextCache());
    }
    public program(): ProgramContext {
        let localContext = new ProgramContext(this.context, this.state);
        this.enterRule(localContext, 0, Stage0Parser.RULE_program);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 22;
            this.match(Stage0Parser.LPAREN);
            this.state = 23;
            this.match(Stage0Parser.PROGRAM);
            this.state = 27;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 97284) !== 0)) {
                {
                {
                this.state = 24;
                this.statement();
                }
                }
                this.state = 29;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 30;
            this.match(Stage0Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 2, Stage0Parser.RULE_statement);
        try {
            this.state = 36;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 1, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 32;
                this.expression();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 33;
                this.letStar();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 34;
                this.lambda();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 35;
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
    public binding(): BindingContext {
        let localContext = new BindingContext(this.context, this.state);
        this.enterRule(localContext, 4, Stage0Parser.RULE_binding);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 38;
            this.match(Stage0Parser.LPAREN);
            this.state = 39;
            this.match(Stage0Parser.IDENTIFIER);
            this.state = 41;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 97284) !== 0)) {
                {
                this.state = 40;
                this.expression();
                }
            }

            this.state = 43;
            this.match(Stage0Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 6, Stage0Parser.RULE_letStar);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 45;
            this.match(Stage0Parser.LPAREN);
            this.state = 46;
            this.match(Stage0Parser.LETSTAR);
            this.state = 47;
            this.match(Stage0Parser.LPAREN);
            this.state = 51;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 48;
                this.binding();
                }
                }
                this.state = 53;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 54;
            this.match(Stage0Parser.RPAREN);
            this.state = 58;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 97284) !== 0)) {
                {
                {
                this.state = 55;
                this.statement();
                }
                }
                this.state = 60;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 61;
            this.match(Stage0Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 8, Stage0Parser.RULE_lambda);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 63;
            this.match(Stage0Parser.LPAREN);
            this.state = 64;
            this.match(Stage0Parser.LAMBDA);
            this.state = 65;
            this.fnSignature();
            this.state = 69;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 97284) !== 0)) {
                {
                {
                this.state = 66;
                this.statement();
                }
                }
                this.state = 71;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 72;
            this.match(Stage0Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 10, Stage0Parser.RULE_fnSignature);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 74;
            this.match(Stage0Parser.LPAREN);
            this.state = 85;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2) {
                {
                this.state = 75;
                this.param();
                this.state = 82;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 2 || _la === 4) {
                    {
                    {
                    this.state = 77;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    if (_la === 4) {
                        {
                        this.state = 76;
                        this.match(Stage0Parser.COMMA);
                        }
                    }

                    this.state = 79;
                    this.param();
                    }
                    }
                    this.state = 84;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
            }

            this.state = 87;
            this.match(Stage0Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 12, Stage0Parser.RULE_param);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 89;
            this.match(Stage0Parser.LPAREN);
            this.state = 90;
            this.match(Stage0Parser.IDENTIFIER);
            this.state = 91;
            this.match(Stage0Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 14, Stage0Parser.RULE_expression);
        try {
            this.state = 98;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 9, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 93;
                this.literal();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 94;
                this.match(Stage0Parser.IDENTIFIER);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 95;
                this.call();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 96;
                this.lambda();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 97;
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
        this.enterRule(localContext, 16, Stage0Parser.RULE_call);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 100;
            this.match(Stage0Parser.LPAREN);
            this.state = 101;
            this.match(Stage0Parser.CALL);
            this.state = 102;
            this.expression();
            this.state = 106;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 97284) !== 0)) {
                {
                {
                this.state = 103;
                this.expression();
                }
                }
                this.state = 108;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 109;
            this.match(Stage0Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 18, Stage0Parser.RULE_raw);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 111;
            this.match(Stage0Parser.LPAREN);
            this.state = 112;
            this.match(Stage0Parser.RAW);
            this.state = 113;
            this.match(Stage0Parser.STRING);
            this.state = 114;
            this.match(Stage0Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 20, Stage0Parser.RULE_literal);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 116;
            _la = this.tokenStream.LA(1);
            if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 31744) !== 0))) {
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
        4,1,17,119,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,
        6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,1,0,1,0,1,0,5,0,26,8,0,10,0,
        12,0,29,9,0,1,0,1,0,1,1,1,1,1,1,1,1,3,1,37,8,1,1,2,1,2,1,2,3,2,42,
        8,2,1,2,1,2,1,3,1,3,1,3,1,3,5,3,50,8,3,10,3,12,3,53,9,3,1,3,1,3,
        5,3,57,8,3,10,3,12,3,60,9,3,1,3,1,3,1,4,1,4,1,4,1,4,5,4,68,8,4,10,
        4,12,4,71,9,4,1,4,1,4,1,5,1,5,1,5,3,5,78,8,5,1,5,5,5,81,8,5,10,5,
        12,5,84,9,5,3,5,86,8,5,1,5,1,5,1,6,1,6,1,6,1,6,1,7,1,7,1,7,1,7,1,
        7,3,7,99,8,7,1,8,1,8,1,8,1,8,5,8,105,8,8,10,8,12,8,108,9,8,1,8,1,
        8,1,9,1,9,1,9,1,9,1,9,1,10,1,10,1,10,0,0,11,0,2,4,6,8,10,12,14,16,
        18,20,0,1,1,0,10,14,123,0,22,1,0,0,0,2,36,1,0,0,0,4,38,1,0,0,0,6,
        45,1,0,0,0,8,63,1,0,0,0,10,74,1,0,0,0,12,89,1,0,0,0,14,98,1,0,0,
        0,16,100,1,0,0,0,18,111,1,0,0,0,20,116,1,0,0,0,22,23,5,2,0,0,23,
        27,5,5,0,0,24,26,3,2,1,0,25,24,1,0,0,0,26,29,1,0,0,0,27,25,1,0,0,
        0,27,28,1,0,0,0,28,30,1,0,0,0,29,27,1,0,0,0,30,31,5,3,0,0,31,1,1,
        0,0,0,32,37,3,14,7,0,33,37,3,6,3,0,34,37,3,8,4,0,35,37,3,18,9,0,
        36,32,1,0,0,0,36,33,1,0,0,0,36,34,1,0,0,0,36,35,1,0,0,0,37,3,1,0,
        0,0,38,39,5,2,0,0,39,41,5,16,0,0,40,42,3,14,7,0,41,40,1,0,0,0,41,
        42,1,0,0,0,42,43,1,0,0,0,43,44,5,3,0,0,44,5,1,0,0,0,45,46,5,2,0,
        0,46,47,5,6,0,0,47,51,5,2,0,0,48,50,3,4,2,0,49,48,1,0,0,0,50,53,
        1,0,0,0,51,49,1,0,0,0,51,52,1,0,0,0,52,54,1,0,0,0,53,51,1,0,0,0,
        54,58,5,3,0,0,55,57,3,2,1,0,56,55,1,0,0,0,57,60,1,0,0,0,58,56,1,
        0,0,0,58,59,1,0,0,0,59,61,1,0,0,0,60,58,1,0,0,0,61,62,5,3,0,0,62,
        7,1,0,0,0,63,64,5,2,0,0,64,65,5,7,0,0,65,69,3,10,5,0,66,68,3,2,1,
        0,67,66,1,0,0,0,68,71,1,0,0,0,69,67,1,0,0,0,69,70,1,0,0,0,70,72,
        1,0,0,0,71,69,1,0,0,0,72,73,5,3,0,0,73,9,1,0,0,0,74,85,5,2,0,0,75,
        82,3,12,6,0,76,78,5,4,0,0,77,76,1,0,0,0,77,78,1,0,0,0,78,79,1,0,
        0,0,79,81,3,12,6,0,80,77,1,0,0,0,81,84,1,0,0,0,82,80,1,0,0,0,82,
        83,1,0,0,0,83,86,1,0,0,0,84,82,1,0,0,0,85,75,1,0,0,0,85,86,1,0,0,
        0,86,87,1,0,0,0,87,88,5,3,0,0,88,11,1,0,0,0,89,90,5,2,0,0,90,91,
        5,16,0,0,91,92,5,3,0,0,92,13,1,0,0,0,93,99,3,20,10,0,94,99,5,16,
        0,0,95,99,3,16,8,0,96,99,3,8,4,0,97,99,3,18,9,0,98,93,1,0,0,0,98,
        94,1,0,0,0,98,95,1,0,0,0,98,96,1,0,0,0,98,97,1,0,0,0,99,15,1,0,0,
        0,100,101,5,2,0,0,101,102,5,8,0,0,102,106,3,14,7,0,103,105,3,14,
        7,0,104,103,1,0,0,0,105,108,1,0,0,0,106,104,1,0,0,0,106,107,1,0,
        0,0,107,109,1,0,0,0,108,106,1,0,0,0,109,110,5,3,0,0,110,17,1,0,0,
        0,111,112,5,2,0,0,112,113,5,9,0,0,113,114,5,14,0,0,114,115,5,3,0,
        0,115,19,1,0,0,0,116,117,7,0,0,0,117,21,1,0,0,0,11,27,36,41,51,58,
        69,77,82,85,98,106
    ];

    private static __ATN: antlr.ATN;
    public static get _ATN(): antlr.ATN {
        if (!Stage0Parser.__ATN) {
            Stage0Parser.__ATN = new antlr.ATNDeserializer().deserialize(Stage0Parser._serializedATN);
        }

        return Stage0Parser.__ATN;
    }


    private static readonly vocabulary = new antlr.Vocabulary(Stage0Parser.literalNames, Stage0Parser.symbolicNames, []);

    public override get vocabulary(): antlr.Vocabulary {
        return Stage0Parser.vocabulary;
    }

    private static readonly decisionsToDFA = Stage0Parser._ATN.decisionToState.map( (ds: antlr.DecisionState, index: number) => new antlr.DFA(ds, index) );
}

export class ProgramContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage0Parser.LPAREN, 0)!;
    }
    public PROGRAM(): antlr.TerminalNode {
        return this.getToken(Stage0Parser.PROGRAM, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage0Parser.RPAREN, 0)!;
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
        return Stage0Parser.RULE_program;
    }
    public override enterRule(listener: Stage0Listener): void {
        if(listener.enterProgram) {
             listener.enterProgram(this);
        }
    }
    public override exitRule(listener: Stage0Listener): void {
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
    public override get ruleIndex(): number {
        return Stage0Parser.RULE_statement;
    }
    public override enterRule(listener: Stage0Listener): void {
        if(listener.enterStatement) {
             listener.enterStatement(this);
        }
    }
    public override exitRule(listener: Stage0Listener): void {
        if(listener.exitStatement) {
             listener.exitStatement(this);
        }
    }
}


export class BindingContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage0Parser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage0Parser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage0Parser.RPAREN, 0)!;
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public override get ruleIndex(): number {
        return Stage0Parser.RULE_binding;
    }
    public override enterRule(listener: Stage0Listener): void {
        if(listener.enterBinding) {
             listener.enterBinding(this);
        }
    }
    public override exitRule(listener: Stage0Listener): void {
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
    		return this.getTokens(Stage0Parser.LPAREN);
    	} else {
    		return this.getToken(Stage0Parser.LPAREN, i);
    	}
    }
    public LETSTAR(): antlr.TerminalNode {
        return this.getToken(Stage0Parser.LETSTAR, 0)!;
    }
    public RPAREN(): antlr.TerminalNode[];
    public RPAREN(i: number): antlr.TerminalNode | null;
    public RPAREN(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage0Parser.RPAREN);
    	} else {
    		return this.getToken(Stage0Parser.RPAREN, i);
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
        return Stage0Parser.RULE_letStar;
    }
    public override enterRule(listener: Stage0Listener): void {
        if(listener.enterLetStar) {
             listener.enterLetStar(this);
        }
    }
    public override exitRule(listener: Stage0Listener): void {
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
        return this.getToken(Stage0Parser.LPAREN, 0)!;
    }
    public LAMBDA(): antlr.TerminalNode {
        return this.getToken(Stage0Parser.LAMBDA, 0)!;
    }
    public fnSignature(): FnSignatureContext {
        return this.getRuleContext(0, FnSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage0Parser.RPAREN, 0)!;
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
        return Stage0Parser.RULE_lambda;
    }
    public override enterRule(listener: Stage0Listener): void {
        if(listener.enterLambda) {
             listener.enterLambda(this);
        }
    }
    public override exitRule(listener: Stage0Listener): void {
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
        return this.getToken(Stage0Parser.LPAREN, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage0Parser.RPAREN, 0)!;
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
    		return this.getTokens(Stage0Parser.COMMA);
    	} else {
    		return this.getToken(Stage0Parser.COMMA, i);
    	}
    }
    public override get ruleIndex(): number {
        return Stage0Parser.RULE_fnSignature;
    }
    public override enterRule(listener: Stage0Listener): void {
        if(listener.enterFnSignature) {
             listener.enterFnSignature(this);
        }
    }
    public override exitRule(listener: Stage0Listener): void {
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
        return this.getToken(Stage0Parser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage0Parser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage0Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage0Parser.RULE_param;
    }
    public override enterRule(listener: Stage0Listener): void {
        if(listener.enterParam) {
             listener.enterParam(this);
        }
    }
    public override exitRule(listener: Stage0Listener): void {
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
        return this.getToken(Stage0Parser.IDENTIFIER, 0);
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
        return Stage0Parser.RULE_expression;
    }
    public override enterRule(listener: Stage0Listener): void {
        if(listener.enterExpression) {
             listener.enterExpression(this);
        }
    }
    public override exitRule(listener: Stage0Listener): void {
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
        return this.getToken(Stage0Parser.LPAREN, 0)!;
    }
    public CALL(): antlr.TerminalNode {
        return this.getToken(Stage0Parser.CALL, 0)!;
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
        return this.getToken(Stage0Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage0Parser.RULE_call;
    }
    public override enterRule(listener: Stage0Listener): void {
        if(listener.enterCall) {
             listener.enterCall(this);
        }
    }
    public override exitRule(listener: Stage0Listener): void {
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
        return this.getToken(Stage0Parser.LPAREN, 0)!;
    }
    public RAW(): antlr.TerminalNode {
        return this.getToken(Stage0Parser.RAW, 0)!;
    }
    public STRING(): antlr.TerminalNode {
        return this.getToken(Stage0Parser.STRING, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage0Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage0Parser.RULE_raw;
    }
    public override enterRule(listener: Stage0Listener): void {
        if(listener.enterRaw) {
             listener.enterRaw(this);
        }
    }
    public override exitRule(listener: Stage0Listener): void {
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
        return this.getToken(Stage0Parser.NUMBER, 0);
    }
    public STRING(): antlr.TerminalNode | null {
        return this.getToken(Stage0Parser.STRING, 0);
    }
    public BOOLEAN(): antlr.TerminalNode | null {
        return this.getToken(Stage0Parser.BOOLEAN, 0);
    }
    public NULL(): antlr.TerminalNode | null {
        return this.getToken(Stage0Parser.NULL, 0);
    }
    public UNDEFINED(): antlr.TerminalNode | null {
        return this.getToken(Stage0Parser.UNDEFINED, 0);
    }
    public override get ruleIndex(): number {
        return Stage0Parser.RULE_literal;
    }
    public override enterRule(listener: Stage0Listener): void {
        if(listener.enterLiteral) {
             listener.enterLiteral(this);
        }
    }
    public override exitRule(listener: Stage0Listener): void {
        if(listener.exitLiteral) {
             listener.exitLiteral(this);
        }
    }
}
