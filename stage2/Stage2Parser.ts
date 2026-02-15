
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
    public static readonly BOOLEAN = 16;
    public static readonly NULL = 17;
    public static readonly UNDEFINED = 18;
    public static readonly NUMBER = 19;
    public static readonly STRING = 20;
    public static readonly MULTILINE_STRING = 21;
    public static readonly IDENTIFIER = 22;
    public static readonly WS = 23;
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
    public static readonly RULE_call = 15;
    public static readonly RULE_fnSignature = 16;
    public static readonly RULE_param = 17;
    public static readonly RULE_literal = 18;

    public static readonly literalNames = [
        null, null, "'('", "')'", "','", "'program'", "'let*'", "'let'", 
        "'lambda'", "'def'", "'defmacro'", "'if'", "'while'", "'begin'", 
        "'return'", "'set!'", null, "'null'", "'undefined'"
    ];

    public static readonly symbolicNames = [
        null, "COMMENT", "LPAREN", "RPAREN", "COMMA", "PROGRAM", "LETSTAR", 
        "LET", "LAMBDA", "DEF", "DEFMACRO", "IF", "WHILE", "BEGIN", "RETURN", 
        "SET", "BOOLEAN", "NULL", "UNDEFINED", "NUMBER", "STRING", "MULTILINE_STRING", 
        "IDENTIFIER", "WS"
    ];
    public static readonly ruleNames = [
        "program", "topLevel", "defmacro", "def", "statement", "letStar", 
        "letStmt", "ifForm", "whileForm", "block", "returnForm", "binding", 
        "expression", "lambda", "assign", "call", "fnSignature", "param", 
        "literal",
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
            this.state = 38;
            this.match(Stage2Parser.LPAREN);
            this.state = 39;
            this.match(Stage2Parser.PROGRAM);
            this.state = 43;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 6225924) !== 0)) {
                {
                {
                this.state = 40;
                this.topLevel();
                }
                }
                this.state = 45;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 46;
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
            this.state = 51;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 1, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 48;
                this.defmacro();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 49;
                this.def();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 50;
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
            this.state = 53;
            this.match(Stage2Parser.LPAREN);
            this.state = 54;
            this.match(Stage2Parser.DEFMACRO);
            this.state = 55;
            this.match(Stage2Parser.IDENTIFIER);
            this.state = 56;
            this.fnSignature();
            this.state = 60;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 6225924) !== 0)) {
                {
                {
                this.state = 57;
                this.statement();
                }
                }
                this.state = 62;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 63;
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
            this.state = 65;
            this.match(Stage2Parser.LPAREN);
            this.state = 66;
            this.match(Stage2Parser.DEF);
            this.state = 67;
            this.match(Stage2Parser.IDENTIFIER);
            this.state = 68;
            this.expression();
            this.state = 69;
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
            this.state = 78;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 3, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 71;
                this.letStar();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 72;
                this.letStmt();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 73;
                this.ifForm();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 74;
                this.whileForm();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 75;
                this.block();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 76;
                this.returnForm();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 77;
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
            this.state = 80;
            this.match(Stage2Parser.LPAREN);
            this.state = 81;
            this.match(Stage2Parser.LETSTAR);
            this.state = 82;
            this.match(Stage2Parser.LPAREN);
            this.state = 86;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 83;
                this.binding();
                }
                }
                this.state = 88;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 89;
            this.match(Stage2Parser.RPAREN);
            this.state = 93;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 6225924) !== 0)) {
                {
                {
                this.state = 90;
                this.statement();
                }
                }
                this.state = 95;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 96;
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
            this.state = 98;
            this.match(Stage2Parser.LPAREN);
            this.state = 99;
            this.match(Stage2Parser.LET);
            this.state = 100;
            this.match(Stage2Parser.IDENTIFIER);
            this.state = 101;
            this.expression();
            this.state = 102;
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
            this.state = 104;
            this.match(Stage2Parser.LPAREN);
            this.state = 105;
            this.match(Stage2Parser.IF);
            this.state = 106;
            this.expression();
            this.state = 107;
            this.statement();
            this.state = 109;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 6225924) !== 0)) {
                {
                this.state = 108;
                this.statement();
                }
            }

            this.state = 111;
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
            this.state = 113;
            this.match(Stage2Parser.LPAREN);
            this.state = 114;
            this.match(Stage2Parser.WHILE);
            this.state = 115;
            this.expression();
            this.state = 119;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 6225924) !== 0)) {
                {
                {
                this.state = 116;
                this.statement();
                }
                }
                this.state = 121;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 122;
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
            this.state = 124;
            this.match(Stage2Parser.LPAREN);
            this.state = 125;
            this.match(Stage2Parser.BEGIN);
            this.state = 129;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 6225924) !== 0)) {
                {
                {
                this.state = 126;
                this.statement();
                }
                }
                this.state = 131;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 132;
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
            this.state = 134;
            this.match(Stage2Parser.LPAREN);
            this.state = 135;
            this.match(Stage2Parser.RETURN);
            this.state = 137;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 6225924) !== 0)) {
                {
                this.state = 136;
                this.expression();
                }
            }

            this.state = 139;
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
            this.state = 141;
            this.match(Stage2Parser.LPAREN);
            this.state = 142;
            this.match(Stage2Parser.IDENTIFIER);
            this.state = 144;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 6225924) !== 0)) {
                {
                this.state = 143;
                this.expression();
                }
            }

            this.state = 146;
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
            this.state = 153;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 11, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 148;
                this.literal();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 149;
                this.match(Stage2Parser.IDENTIFIER);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 150;
                this.lambda();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 151;
                this.assign();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 152;
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
            this.state = 155;
            this.match(Stage2Parser.LPAREN);
            this.state = 156;
            this.match(Stage2Parser.LAMBDA);
            this.state = 157;
            this.fnSignature();
            this.state = 161;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 6225924) !== 0)) {
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
            this.state = 166;
            this.match(Stage2Parser.LPAREN);
            this.state = 167;
            this.match(Stage2Parser.SET);
            this.state = 168;
            this.match(Stage2Parser.IDENTIFIER);
            this.state = 169;
            this.expression();
            this.state = 170;
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
        this.enterRule(localContext, 30, Stage2Parser.RULE_call);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 172;
            this.match(Stage2Parser.LPAREN);
            this.state = 173;
            this.expression();
            this.state = 177;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 6225924) !== 0)) {
                {
                {
                this.state = 174;
                this.expression();
                }
                }
                this.state = 179;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 180;
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
        this.enterRule(localContext, 32, Stage2Parser.RULE_fnSignature);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 182;
            this.match(Stage2Parser.LPAREN);
            this.state = 193;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2) {
                {
                this.state = 183;
                this.param();
                this.state = 190;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 2 || _la === 4) {
                    {
                    {
                    this.state = 185;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    if (_la === 4) {
                        {
                        this.state = 184;
                        this.match(Stage2Parser.COMMA);
                        }
                    }

                    this.state = 187;
                    this.param();
                    }
                    }
                    this.state = 192;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
            }

            this.state = 195;
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
        this.enterRule(localContext, 34, Stage2Parser.RULE_param);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 197;
            this.match(Stage2Parser.LPAREN);
            this.state = 198;
            this.match(Stage2Parser.IDENTIFIER);
            this.state = 199;
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
        this.enterRule(localContext, 36, Stage2Parser.RULE_literal);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 201;
            _la = this.tokenStream.LA(1);
            if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 2031616) !== 0))) {
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
        4,1,23,204,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,
        6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,
        2,14,7,14,2,15,7,15,2,16,7,16,2,17,7,17,2,18,7,18,1,0,1,0,1,0,5,
        0,42,8,0,10,0,12,0,45,9,0,1,0,1,0,1,1,1,1,1,1,3,1,52,8,1,1,2,1,2,
        1,2,1,2,1,2,5,2,59,8,2,10,2,12,2,62,9,2,1,2,1,2,1,3,1,3,1,3,1,3,
        1,3,1,3,1,4,1,4,1,4,1,4,1,4,1,4,1,4,3,4,79,8,4,1,5,1,5,1,5,1,5,5,
        5,85,8,5,10,5,12,5,88,9,5,1,5,1,5,5,5,92,8,5,10,5,12,5,95,9,5,1,
        5,1,5,1,6,1,6,1,6,1,6,1,6,1,6,1,7,1,7,1,7,1,7,1,7,3,7,110,8,7,1,
        7,1,7,1,8,1,8,1,8,1,8,5,8,118,8,8,10,8,12,8,121,9,8,1,8,1,8,1,9,
        1,9,1,9,5,9,128,8,9,10,9,12,9,131,9,9,1,9,1,9,1,10,1,10,1,10,3,10,
        138,8,10,1,10,1,10,1,11,1,11,1,11,3,11,145,8,11,1,11,1,11,1,12,1,
        12,1,12,1,12,1,12,3,12,154,8,12,1,13,1,13,1,13,1,13,5,13,160,8,13,
        10,13,12,13,163,9,13,1,13,1,13,1,14,1,14,1,14,1,14,1,14,1,14,1,15,
        1,15,1,15,5,15,176,8,15,10,15,12,15,179,9,15,1,15,1,15,1,16,1,16,
        1,16,3,16,186,8,16,1,16,5,16,189,8,16,10,16,12,16,192,9,16,3,16,
        194,8,16,1,16,1,16,1,17,1,17,1,17,1,17,1,18,1,18,1,18,0,0,19,0,2,
        4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,0,1,1,0,16,20,210,
        0,38,1,0,0,0,2,51,1,0,0,0,4,53,1,0,0,0,6,65,1,0,0,0,8,78,1,0,0,0,
        10,80,1,0,0,0,12,98,1,0,0,0,14,104,1,0,0,0,16,113,1,0,0,0,18,124,
        1,0,0,0,20,134,1,0,0,0,22,141,1,0,0,0,24,153,1,0,0,0,26,155,1,0,
        0,0,28,166,1,0,0,0,30,172,1,0,0,0,32,182,1,0,0,0,34,197,1,0,0,0,
        36,201,1,0,0,0,38,39,5,2,0,0,39,43,5,5,0,0,40,42,3,2,1,0,41,40,1,
        0,0,0,42,45,1,0,0,0,43,41,1,0,0,0,43,44,1,0,0,0,44,46,1,0,0,0,45,
        43,1,0,0,0,46,47,5,3,0,0,47,1,1,0,0,0,48,52,3,4,2,0,49,52,3,6,3,
        0,50,52,3,8,4,0,51,48,1,0,0,0,51,49,1,0,0,0,51,50,1,0,0,0,52,3,1,
        0,0,0,53,54,5,2,0,0,54,55,5,10,0,0,55,56,5,22,0,0,56,60,3,32,16,
        0,57,59,3,8,4,0,58,57,1,0,0,0,59,62,1,0,0,0,60,58,1,0,0,0,60,61,
        1,0,0,0,61,63,1,0,0,0,62,60,1,0,0,0,63,64,5,3,0,0,64,5,1,0,0,0,65,
        66,5,2,0,0,66,67,5,9,0,0,67,68,5,22,0,0,68,69,3,24,12,0,69,70,5,
        3,0,0,70,7,1,0,0,0,71,79,3,10,5,0,72,79,3,12,6,0,73,79,3,14,7,0,
        74,79,3,16,8,0,75,79,3,18,9,0,76,79,3,20,10,0,77,79,3,24,12,0,78,
        71,1,0,0,0,78,72,1,0,0,0,78,73,1,0,0,0,78,74,1,0,0,0,78,75,1,0,0,
        0,78,76,1,0,0,0,78,77,1,0,0,0,79,9,1,0,0,0,80,81,5,2,0,0,81,82,5,
        6,0,0,82,86,5,2,0,0,83,85,3,22,11,0,84,83,1,0,0,0,85,88,1,0,0,0,
        86,84,1,0,0,0,86,87,1,0,0,0,87,89,1,0,0,0,88,86,1,0,0,0,89,93,5,
        3,0,0,90,92,3,8,4,0,91,90,1,0,0,0,92,95,1,0,0,0,93,91,1,0,0,0,93,
        94,1,0,0,0,94,96,1,0,0,0,95,93,1,0,0,0,96,97,5,3,0,0,97,11,1,0,0,
        0,98,99,5,2,0,0,99,100,5,7,0,0,100,101,5,22,0,0,101,102,3,24,12,
        0,102,103,5,3,0,0,103,13,1,0,0,0,104,105,5,2,0,0,105,106,5,11,0,
        0,106,107,3,24,12,0,107,109,3,8,4,0,108,110,3,8,4,0,109,108,1,0,
        0,0,109,110,1,0,0,0,110,111,1,0,0,0,111,112,5,3,0,0,112,15,1,0,0,
        0,113,114,5,2,0,0,114,115,5,12,0,0,115,119,3,24,12,0,116,118,3,8,
        4,0,117,116,1,0,0,0,118,121,1,0,0,0,119,117,1,0,0,0,119,120,1,0,
        0,0,120,122,1,0,0,0,121,119,1,0,0,0,122,123,5,3,0,0,123,17,1,0,0,
        0,124,125,5,2,0,0,125,129,5,13,0,0,126,128,3,8,4,0,127,126,1,0,0,
        0,128,131,1,0,0,0,129,127,1,0,0,0,129,130,1,0,0,0,130,132,1,0,0,
        0,131,129,1,0,0,0,132,133,5,3,0,0,133,19,1,0,0,0,134,135,5,2,0,0,
        135,137,5,14,0,0,136,138,3,24,12,0,137,136,1,0,0,0,137,138,1,0,0,
        0,138,139,1,0,0,0,139,140,5,3,0,0,140,21,1,0,0,0,141,142,5,2,0,0,
        142,144,5,22,0,0,143,145,3,24,12,0,144,143,1,0,0,0,144,145,1,0,0,
        0,145,146,1,0,0,0,146,147,5,3,0,0,147,23,1,0,0,0,148,154,3,36,18,
        0,149,154,5,22,0,0,150,154,3,26,13,0,151,154,3,28,14,0,152,154,3,
        30,15,0,153,148,1,0,0,0,153,149,1,0,0,0,153,150,1,0,0,0,153,151,
        1,0,0,0,153,152,1,0,0,0,154,25,1,0,0,0,155,156,5,2,0,0,156,157,5,
        8,0,0,157,161,3,32,16,0,158,160,3,8,4,0,159,158,1,0,0,0,160,163,
        1,0,0,0,161,159,1,0,0,0,161,162,1,0,0,0,162,164,1,0,0,0,163,161,
        1,0,0,0,164,165,5,3,0,0,165,27,1,0,0,0,166,167,5,2,0,0,167,168,5,
        15,0,0,168,169,5,22,0,0,169,170,3,24,12,0,170,171,5,3,0,0,171,29,
        1,0,0,0,172,173,5,2,0,0,173,177,3,24,12,0,174,176,3,24,12,0,175,
        174,1,0,0,0,176,179,1,0,0,0,177,175,1,0,0,0,177,178,1,0,0,0,178,
        180,1,0,0,0,179,177,1,0,0,0,180,181,5,3,0,0,181,31,1,0,0,0,182,193,
        5,2,0,0,183,190,3,34,17,0,184,186,5,4,0,0,185,184,1,0,0,0,185,186,
        1,0,0,0,186,187,1,0,0,0,187,189,3,34,17,0,188,185,1,0,0,0,189,192,
        1,0,0,0,190,188,1,0,0,0,190,191,1,0,0,0,191,194,1,0,0,0,192,190,
        1,0,0,0,193,183,1,0,0,0,193,194,1,0,0,0,194,195,1,0,0,0,195,196,
        5,3,0,0,196,33,1,0,0,0,197,198,5,2,0,0,198,199,5,22,0,0,199,200,
        5,3,0,0,200,35,1,0,0,0,201,202,7,0,0,0,202,37,1,0,0,0,17,43,51,60,
        78,86,93,109,119,129,137,144,153,161,177,185,190,193
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
