
import * as antlr from "antlr4ng";
import { Token } from "antlr4ng";

import { Stage3Listener } from "./Stage3Listener.js";
// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;


export class Stage3Parser extends antlr.Parser {
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
    public static readonly OBJECT = 16;
    public static readonly ARRAY = 17;
    public static readonly DOT = 18;
    public static readonly INDEX = 19;
    public static readonly QUASI = 20;
    public static readonly UNQUOTE_SPLICING = 21;
    public static readonly UNQUOTE = 22;
    public static readonly BOOLEAN = 23;
    public static readonly NULL = 24;
    public static readonly UNDEFINED = 25;
    public static readonly KEYWORD = 26;
    public static readonly NUMBER = 27;
    public static readonly STRING = 28;
    public static readonly MULTILINE_STRING = 29;
    public static readonly IDENTIFIER = 30;
    public static readonly WS = 31;
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
    public static readonly RULE_objectExpr = 15;
    public static readonly RULE_objectField = 16;
    public static readonly RULE_arrayExpr = 17;
    public static readonly RULE_propAccess = 18;
    public static readonly RULE_indexAccess = 19;
    public static readonly RULE_quasiquote = 20;
    public static readonly RULE_unquote = 21;
    public static readonly RULE_unquoteSplicing = 22;
    public static readonly RULE_call = 23;
    public static readonly RULE_fnSignature = 24;
    public static readonly RULE_param = 25;
    public static readonly RULE_literal = 26;

    public static readonly literalNames = [
        null, null, "'('", "')'", "','", "'program'", "'let*'", "'let'", 
        "'lambda'", "'def'", "'defmacro'", "'if'", "'while'", "'begin'", 
        "'return'", "'set!'", "'object'", "'array'", "'.'", "'index'", "'quasi'", 
        "'unquote-splicing'", "'unquote'", null, "'null'", "'undefined'"
    ];

    public static readonly symbolicNames = [
        null, "COMMENT", "LPAREN", "RPAREN", "COMMA", "PROGRAM", "LETSTAR", 
        "LET", "LAMBDA", "DEF", "DEFMACRO", "IF", "WHILE", "BEGIN", "RETURN", 
        "SET", "OBJECT", "ARRAY", "DOT", "INDEX", "QUASI", "UNQUOTE_SPLICING", 
        "UNQUOTE", "BOOLEAN", "NULL", "UNDEFINED", "KEYWORD", "NUMBER", 
        "STRING", "MULTILINE_STRING", "IDENTIFIER", "WS"
    ];
    public static readonly ruleNames = [
        "program", "topLevel", "defmacro", "def", "statement", "letStar", 
        "letStmt", "ifForm", "whileForm", "block", "returnForm", "binding", 
        "expression", "lambda", "assign", "objectExpr", "objectField", "arrayExpr", 
        "propAccess", "indexAccess", "quasiquote", "unquote", "unquoteSplicing", 
        "call", "fnSignature", "param", "literal",
    ];

    public get grammarFileName(): string { return "Stage3.g4"; }
    public get literalNames(): (string | null)[] { return Stage3Parser.literalNames; }
    public get symbolicNames(): (string | null)[] { return Stage3Parser.symbolicNames; }
    public get ruleNames(): string[] { return Stage3Parser.ruleNames; }
    public get serializedATN(): number[] { return Stage3Parser._serializedATN; }

    protected createFailedPredicateException(predicate?: string, message?: string): antlr.FailedPredicateException {
        return new antlr.FailedPredicateException(this, predicate, message);
    }

    public constructor(input: antlr.TokenStream) {
        super(input);
        this.interpreter = new antlr.ParserATNSimulator(this, Stage3Parser._ATN, Stage3Parser.decisionsToDFA, new antlr.PredictionContextCache());
    }
    public program(): ProgramContext {
        let localContext = new ProgramContext(this.context, this.state);
        this.enterRule(localContext, 0, Stage3Parser.RULE_program);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 54;
            this.match(Stage3Parser.LPAREN);
            this.state = 55;
            this.match(Stage3Parser.PROGRAM);
            this.state = 59;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 1602224132) !== 0)) {
                {
                {
                this.state = 56;
                this.topLevel();
                }
                }
                this.state = 61;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 62;
            this.match(Stage3Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 2, Stage3Parser.RULE_topLevel);
        try {
            this.state = 67;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 1, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 64;
                this.defmacro();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 65;
                this.def();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 66;
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
        this.enterRule(localContext, 4, Stage3Parser.RULE_defmacro);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 69;
            this.match(Stage3Parser.LPAREN);
            this.state = 70;
            this.match(Stage3Parser.DEFMACRO);
            this.state = 71;
            this.match(Stage3Parser.IDENTIFIER);
            this.state = 72;
            this.fnSignature();
            this.state = 76;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 1602224132) !== 0)) {
                {
                {
                this.state = 73;
                this.statement();
                }
                }
                this.state = 78;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 79;
            this.match(Stage3Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 6, Stage3Parser.RULE_def);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 81;
            this.match(Stage3Parser.LPAREN);
            this.state = 82;
            this.match(Stage3Parser.DEF);
            this.state = 83;
            this.match(Stage3Parser.IDENTIFIER);
            this.state = 84;
            this.expression();
            this.state = 85;
            this.match(Stage3Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 8, Stage3Parser.RULE_statement);
        try {
            this.state = 94;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 3, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 87;
                this.letStar();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 88;
                this.letStmt();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 89;
                this.ifForm();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 90;
                this.whileForm();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 91;
                this.block();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 92;
                this.returnForm();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 93;
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
        this.enterRule(localContext, 10, Stage3Parser.RULE_letStar);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 96;
            this.match(Stage3Parser.LPAREN);
            this.state = 97;
            this.match(Stage3Parser.LETSTAR);
            this.state = 98;
            this.match(Stage3Parser.LPAREN);
            this.state = 102;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 99;
                this.binding();
                }
                }
                this.state = 104;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 105;
            this.match(Stage3Parser.RPAREN);
            this.state = 109;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 1602224132) !== 0)) {
                {
                {
                this.state = 106;
                this.statement();
                }
                }
                this.state = 111;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 112;
            this.match(Stage3Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 12, Stage3Parser.RULE_letStmt);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 114;
            this.match(Stage3Parser.LPAREN);
            this.state = 115;
            this.match(Stage3Parser.LET);
            this.state = 116;
            this.match(Stage3Parser.IDENTIFIER);
            this.state = 117;
            this.expression();
            this.state = 118;
            this.match(Stage3Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 14, Stage3Parser.RULE_ifForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 120;
            this.match(Stage3Parser.LPAREN);
            this.state = 121;
            this.match(Stage3Parser.IF);
            this.state = 122;
            this.expression();
            this.state = 123;
            this.statement();
            this.state = 125;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 1602224132) !== 0)) {
                {
                this.state = 124;
                this.statement();
                }
            }

            this.state = 127;
            this.match(Stage3Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 16, Stage3Parser.RULE_whileForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 129;
            this.match(Stage3Parser.LPAREN);
            this.state = 130;
            this.match(Stage3Parser.WHILE);
            this.state = 131;
            this.expression();
            this.state = 135;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 1602224132) !== 0)) {
                {
                {
                this.state = 132;
                this.statement();
                }
                }
                this.state = 137;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 138;
            this.match(Stage3Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 18, Stage3Parser.RULE_block);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 140;
            this.match(Stage3Parser.LPAREN);
            this.state = 141;
            this.match(Stage3Parser.BEGIN);
            this.state = 145;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 1602224132) !== 0)) {
                {
                {
                this.state = 142;
                this.statement();
                }
                }
                this.state = 147;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 148;
            this.match(Stage3Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 20, Stage3Parser.RULE_returnForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 150;
            this.match(Stage3Parser.LPAREN);
            this.state = 151;
            this.match(Stage3Parser.RETURN);
            this.state = 153;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 1602224132) !== 0)) {
                {
                this.state = 152;
                this.expression();
                }
            }

            this.state = 155;
            this.match(Stage3Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 22, Stage3Parser.RULE_binding);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 157;
            this.match(Stage3Parser.LPAREN);
            this.state = 158;
            this.match(Stage3Parser.IDENTIFIER);
            this.state = 160;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 1602224132) !== 0)) {
                {
                this.state = 159;
                this.expression();
                }
            }

            this.state = 162;
            this.match(Stage3Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 24, Stage3Parser.RULE_expression);
        try {
            this.state = 177;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 11, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 164;
                this.literal();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 165;
                this.match(Stage3Parser.KEYWORD);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 166;
                this.match(Stage3Parser.IDENTIFIER);
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 167;
                this.lambda();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 168;
                this.assign();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 169;
                this.objectExpr();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 170;
                this.arrayExpr();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 171;
                this.propAccess();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 172;
                this.indexAccess();
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 173;
                this.quasiquote();
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 174;
                this.unquote();
                }
                break;
            case 12:
                this.enterOuterAlt(localContext, 12);
                {
                this.state = 175;
                this.unquoteSplicing();
                }
                break;
            case 13:
                this.enterOuterAlt(localContext, 13);
                {
                this.state = 176;
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
        this.enterRule(localContext, 26, Stage3Parser.RULE_lambda);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 179;
            this.match(Stage3Parser.LPAREN);
            this.state = 180;
            this.match(Stage3Parser.LAMBDA);
            this.state = 181;
            this.fnSignature();
            this.state = 185;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 1602224132) !== 0)) {
                {
                {
                this.state = 182;
                this.statement();
                }
                }
                this.state = 187;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 188;
            this.match(Stage3Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 28, Stage3Parser.RULE_assign);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 190;
            this.match(Stage3Parser.LPAREN);
            this.state = 191;
            this.match(Stage3Parser.SET);
            this.state = 192;
            this.match(Stage3Parser.IDENTIFIER);
            this.state = 193;
            this.expression();
            this.state = 194;
            this.match(Stage3Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 30, Stage3Parser.RULE_objectExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 196;
            this.match(Stage3Parser.LPAREN);
            this.state = 197;
            this.match(Stage3Parser.OBJECT);
            this.state = 201;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 198;
                this.objectField();
                }
                }
                this.state = 203;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 204;
            this.match(Stage3Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 32, Stage3Parser.RULE_objectField);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 206;
            this.match(Stage3Parser.LPAREN);
            this.state = 207;
            _la = this.tokenStream.LA(1);
            if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 1409286144) !== 0))) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 208;
            this.expression();
            this.state = 209;
            this.match(Stage3Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 34, Stage3Parser.RULE_arrayExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 211;
            this.match(Stage3Parser.LPAREN);
            this.state = 212;
            this.match(Stage3Parser.ARRAY);
            this.state = 216;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 1602224132) !== 0)) {
                {
                {
                this.state = 213;
                this.expression();
                }
                }
                this.state = 218;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 219;
            this.match(Stage3Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 36, Stage3Parser.RULE_propAccess);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 221;
            this.match(Stage3Parser.LPAREN);
            this.state = 222;
            this.match(Stage3Parser.DOT);
            this.state = 223;
            this.expression();
            this.state = 224;
            _la = this.tokenStream.LA(1);
            if(!(_la === 26 || _la === 30)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 225;
            this.match(Stage3Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 38, Stage3Parser.RULE_indexAccess);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 227;
            this.match(Stage3Parser.LPAREN);
            this.state = 228;
            this.match(Stage3Parser.INDEX);
            this.state = 229;
            this.expression();
            this.state = 230;
            this.expression();
            this.state = 231;
            this.match(Stage3Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 40, Stage3Parser.RULE_quasiquote);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 233;
            this.match(Stage3Parser.LPAREN);
            this.state = 234;
            this.match(Stage3Parser.QUASI);
            this.state = 235;
            this.expression();
            this.state = 236;
            this.match(Stage3Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 42, Stage3Parser.RULE_unquote);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 238;
            this.match(Stage3Parser.LPAREN);
            this.state = 239;
            this.match(Stage3Parser.UNQUOTE);
            this.state = 240;
            this.expression();
            this.state = 241;
            this.match(Stage3Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 44, Stage3Parser.RULE_unquoteSplicing);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 243;
            this.match(Stage3Parser.LPAREN);
            this.state = 244;
            this.match(Stage3Parser.UNQUOTE_SPLICING);
            this.state = 245;
            this.expression();
            this.state = 246;
            this.match(Stage3Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 46, Stage3Parser.RULE_call);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 248;
            this.match(Stage3Parser.LPAREN);
            this.state = 249;
            this.expression();
            this.state = 253;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 1602224132) !== 0)) {
                {
                {
                this.state = 250;
                this.expression();
                }
                }
                this.state = 255;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 256;
            this.match(Stage3Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 48, Stage3Parser.RULE_fnSignature);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 258;
            this.match(Stage3Parser.LPAREN);
            this.state = 269;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2) {
                {
                this.state = 259;
                this.param();
                this.state = 266;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 2 || _la === 4) {
                    {
                    {
                    this.state = 261;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    if (_la === 4) {
                        {
                        this.state = 260;
                        this.match(Stage3Parser.COMMA);
                        }
                    }

                    this.state = 263;
                    this.param();
                    }
                    }
                    this.state = 268;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
            }

            this.state = 271;
            this.match(Stage3Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 50, Stage3Parser.RULE_param);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 273;
            this.match(Stage3Parser.LPAREN);
            this.state = 274;
            this.match(Stage3Parser.IDENTIFIER);
            this.state = 275;
            this.match(Stage3Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 52, Stage3Parser.RULE_literal);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 277;
            _la = this.tokenStream.LA(1);
            if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 461373440) !== 0))) {
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
        4,1,31,280,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,
        6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,
        2,14,7,14,2,15,7,15,2,16,7,16,2,17,7,17,2,18,7,18,2,19,7,19,2,20,
        7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,24,2,25,7,25,2,26,7,26,
        1,0,1,0,1,0,5,0,58,8,0,10,0,12,0,61,9,0,1,0,1,0,1,1,1,1,1,1,3,1,
        68,8,1,1,2,1,2,1,2,1,2,1,2,5,2,75,8,2,10,2,12,2,78,9,2,1,2,1,2,1,
        3,1,3,1,3,1,3,1,3,1,3,1,4,1,4,1,4,1,4,1,4,1,4,1,4,3,4,95,8,4,1,5,
        1,5,1,5,1,5,5,5,101,8,5,10,5,12,5,104,9,5,1,5,1,5,5,5,108,8,5,10,
        5,12,5,111,9,5,1,5,1,5,1,6,1,6,1,6,1,6,1,6,1,6,1,7,1,7,1,7,1,7,1,
        7,3,7,126,8,7,1,7,1,7,1,8,1,8,1,8,1,8,5,8,134,8,8,10,8,12,8,137,
        9,8,1,8,1,8,1,9,1,9,1,9,5,9,144,8,9,10,9,12,9,147,9,9,1,9,1,9,1,
        10,1,10,1,10,3,10,154,8,10,1,10,1,10,1,11,1,11,1,11,3,11,161,8,11,
        1,11,1,11,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,
        1,12,1,12,3,12,178,8,12,1,13,1,13,1,13,1,13,5,13,184,8,13,10,13,
        12,13,187,9,13,1,13,1,13,1,14,1,14,1,14,1,14,1,14,1,14,1,15,1,15,
        1,15,5,15,200,8,15,10,15,12,15,203,9,15,1,15,1,15,1,16,1,16,1,16,
        1,16,1,16,1,17,1,17,1,17,5,17,215,8,17,10,17,12,17,218,9,17,1,17,
        1,17,1,18,1,18,1,18,1,18,1,18,1,18,1,19,1,19,1,19,1,19,1,19,1,19,
        1,20,1,20,1,20,1,20,1,20,1,21,1,21,1,21,1,21,1,21,1,22,1,22,1,22,
        1,22,1,22,1,23,1,23,1,23,5,23,252,8,23,10,23,12,23,255,9,23,1,23,
        1,23,1,24,1,24,1,24,3,24,262,8,24,1,24,5,24,265,8,24,10,24,12,24,
        268,9,24,3,24,270,8,24,1,24,1,24,1,25,1,25,1,25,1,25,1,26,1,26,1,
        26,0,0,27,0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,
        40,42,44,46,48,50,52,0,3,3,0,26,26,28,28,30,30,2,0,26,26,30,30,2,
        0,23,25,27,28,288,0,54,1,0,0,0,2,67,1,0,0,0,4,69,1,0,0,0,6,81,1,
        0,0,0,8,94,1,0,0,0,10,96,1,0,0,0,12,114,1,0,0,0,14,120,1,0,0,0,16,
        129,1,0,0,0,18,140,1,0,0,0,20,150,1,0,0,0,22,157,1,0,0,0,24,177,
        1,0,0,0,26,179,1,0,0,0,28,190,1,0,0,0,30,196,1,0,0,0,32,206,1,0,
        0,0,34,211,1,0,0,0,36,221,1,0,0,0,38,227,1,0,0,0,40,233,1,0,0,0,
        42,238,1,0,0,0,44,243,1,0,0,0,46,248,1,0,0,0,48,258,1,0,0,0,50,273,
        1,0,0,0,52,277,1,0,0,0,54,55,5,2,0,0,55,59,5,5,0,0,56,58,3,2,1,0,
        57,56,1,0,0,0,58,61,1,0,0,0,59,57,1,0,0,0,59,60,1,0,0,0,60,62,1,
        0,0,0,61,59,1,0,0,0,62,63,5,3,0,0,63,1,1,0,0,0,64,68,3,4,2,0,65,
        68,3,6,3,0,66,68,3,8,4,0,67,64,1,0,0,0,67,65,1,0,0,0,67,66,1,0,0,
        0,68,3,1,0,0,0,69,70,5,2,0,0,70,71,5,10,0,0,71,72,5,30,0,0,72,76,
        3,48,24,0,73,75,3,8,4,0,74,73,1,0,0,0,75,78,1,0,0,0,76,74,1,0,0,
        0,76,77,1,0,0,0,77,79,1,0,0,0,78,76,1,0,0,0,79,80,5,3,0,0,80,5,1,
        0,0,0,81,82,5,2,0,0,82,83,5,9,0,0,83,84,5,30,0,0,84,85,3,24,12,0,
        85,86,5,3,0,0,86,7,1,0,0,0,87,95,3,10,5,0,88,95,3,12,6,0,89,95,3,
        14,7,0,90,95,3,16,8,0,91,95,3,18,9,0,92,95,3,20,10,0,93,95,3,24,
        12,0,94,87,1,0,0,0,94,88,1,0,0,0,94,89,1,0,0,0,94,90,1,0,0,0,94,
        91,1,0,0,0,94,92,1,0,0,0,94,93,1,0,0,0,95,9,1,0,0,0,96,97,5,2,0,
        0,97,98,5,6,0,0,98,102,5,2,0,0,99,101,3,22,11,0,100,99,1,0,0,0,101,
        104,1,0,0,0,102,100,1,0,0,0,102,103,1,0,0,0,103,105,1,0,0,0,104,
        102,1,0,0,0,105,109,5,3,0,0,106,108,3,8,4,0,107,106,1,0,0,0,108,
        111,1,0,0,0,109,107,1,0,0,0,109,110,1,0,0,0,110,112,1,0,0,0,111,
        109,1,0,0,0,112,113,5,3,0,0,113,11,1,0,0,0,114,115,5,2,0,0,115,116,
        5,7,0,0,116,117,5,30,0,0,117,118,3,24,12,0,118,119,5,3,0,0,119,13,
        1,0,0,0,120,121,5,2,0,0,121,122,5,11,0,0,122,123,3,24,12,0,123,125,
        3,8,4,0,124,126,3,8,4,0,125,124,1,0,0,0,125,126,1,0,0,0,126,127,
        1,0,0,0,127,128,5,3,0,0,128,15,1,0,0,0,129,130,5,2,0,0,130,131,5,
        12,0,0,131,135,3,24,12,0,132,134,3,8,4,0,133,132,1,0,0,0,134,137,
        1,0,0,0,135,133,1,0,0,0,135,136,1,0,0,0,136,138,1,0,0,0,137,135,
        1,0,0,0,138,139,5,3,0,0,139,17,1,0,0,0,140,141,5,2,0,0,141,145,5,
        13,0,0,142,144,3,8,4,0,143,142,1,0,0,0,144,147,1,0,0,0,145,143,1,
        0,0,0,145,146,1,0,0,0,146,148,1,0,0,0,147,145,1,0,0,0,148,149,5,
        3,0,0,149,19,1,0,0,0,150,151,5,2,0,0,151,153,5,14,0,0,152,154,3,
        24,12,0,153,152,1,0,0,0,153,154,1,0,0,0,154,155,1,0,0,0,155,156,
        5,3,0,0,156,21,1,0,0,0,157,158,5,2,0,0,158,160,5,30,0,0,159,161,
        3,24,12,0,160,159,1,0,0,0,160,161,1,0,0,0,161,162,1,0,0,0,162,163,
        5,3,0,0,163,23,1,0,0,0,164,178,3,52,26,0,165,178,5,26,0,0,166,178,
        5,30,0,0,167,178,3,26,13,0,168,178,3,28,14,0,169,178,3,30,15,0,170,
        178,3,34,17,0,171,178,3,36,18,0,172,178,3,38,19,0,173,178,3,40,20,
        0,174,178,3,42,21,0,175,178,3,44,22,0,176,178,3,46,23,0,177,164,
        1,0,0,0,177,165,1,0,0,0,177,166,1,0,0,0,177,167,1,0,0,0,177,168,
        1,0,0,0,177,169,1,0,0,0,177,170,1,0,0,0,177,171,1,0,0,0,177,172,
        1,0,0,0,177,173,1,0,0,0,177,174,1,0,0,0,177,175,1,0,0,0,177,176,
        1,0,0,0,178,25,1,0,0,0,179,180,5,2,0,0,180,181,5,8,0,0,181,185,3,
        48,24,0,182,184,3,8,4,0,183,182,1,0,0,0,184,187,1,0,0,0,185,183,
        1,0,0,0,185,186,1,0,0,0,186,188,1,0,0,0,187,185,1,0,0,0,188,189,
        5,3,0,0,189,27,1,0,0,0,190,191,5,2,0,0,191,192,5,15,0,0,192,193,
        5,30,0,0,193,194,3,24,12,0,194,195,5,3,0,0,195,29,1,0,0,0,196,197,
        5,2,0,0,197,201,5,16,0,0,198,200,3,32,16,0,199,198,1,0,0,0,200,203,
        1,0,0,0,201,199,1,0,0,0,201,202,1,0,0,0,202,204,1,0,0,0,203,201,
        1,0,0,0,204,205,5,3,0,0,205,31,1,0,0,0,206,207,5,2,0,0,207,208,7,
        0,0,0,208,209,3,24,12,0,209,210,5,3,0,0,210,33,1,0,0,0,211,212,5,
        2,0,0,212,216,5,17,0,0,213,215,3,24,12,0,214,213,1,0,0,0,215,218,
        1,0,0,0,216,214,1,0,0,0,216,217,1,0,0,0,217,219,1,0,0,0,218,216,
        1,0,0,0,219,220,5,3,0,0,220,35,1,0,0,0,221,222,5,2,0,0,222,223,5,
        18,0,0,223,224,3,24,12,0,224,225,7,1,0,0,225,226,5,3,0,0,226,37,
        1,0,0,0,227,228,5,2,0,0,228,229,5,19,0,0,229,230,3,24,12,0,230,231,
        3,24,12,0,231,232,5,3,0,0,232,39,1,0,0,0,233,234,5,2,0,0,234,235,
        5,20,0,0,235,236,3,24,12,0,236,237,5,3,0,0,237,41,1,0,0,0,238,239,
        5,2,0,0,239,240,5,22,0,0,240,241,3,24,12,0,241,242,5,3,0,0,242,43,
        1,0,0,0,243,244,5,2,0,0,244,245,5,21,0,0,245,246,3,24,12,0,246,247,
        5,3,0,0,247,45,1,0,0,0,248,249,5,2,0,0,249,253,3,24,12,0,250,252,
        3,24,12,0,251,250,1,0,0,0,252,255,1,0,0,0,253,251,1,0,0,0,253,254,
        1,0,0,0,254,256,1,0,0,0,255,253,1,0,0,0,256,257,5,3,0,0,257,47,1,
        0,0,0,258,269,5,2,0,0,259,266,3,50,25,0,260,262,5,4,0,0,261,260,
        1,0,0,0,261,262,1,0,0,0,262,263,1,0,0,0,263,265,3,50,25,0,264,261,
        1,0,0,0,265,268,1,0,0,0,266,264,1,0,0,0,266,267,1,0,0,0,267,270,
        1,0,0,0,268,266,1,0,0,0,269,259,1,0,0,0,269,270,1,0,0,0,270,271,
        1,0,0,0,271,272,5,3,0,0,272,49,1,0,0,0,273,274,5,2,0,0,274,275,5,
        30,0,0,275,276,5,3,0,0,276,51,1,0,0,0,277,278,7,2,0,0,278,53,1,0,
        0,0,19,59,67,76,94,102,109,125,135,145,153,160,177,185,201,216,253,
        261,266,269
    ];

    private static __ATN: antlr.ATN;
    public static get _ATN(): antlr.ATN {
        if (!Stage3Parser.__ATN) {
            Stage3Parser.__ATN = new antlr.ATNDeserializer().deserialize(Stage3Parser._serializedATN);
        }

        return Stage3Parser.__ATN;
    }


    private static readonly vocabulary = new antlr.Vocabulary(Stage3Parser.literalNames, Stage3Parser.symbolicNames, []);

    public override get vocabulary(): antlr.Vocabulary {
        return Stage3Parser.vocabulary;
    }

    private static readonly decisionsToDFA = Stage3Parser._ATN.decisionToState.map( (ds: antlr.DecisionState, index: number) => new antlr.DFA(ds, index) );
}

export class ProgramContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3Parser.LPAREN, 0)!;
    }
    public PROGRAM(): antlr.TerminalNode {
        return this.getToken(Stage3Parser.PROGRAM, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3Parser.RPAREN, 0)!;
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
        return Stage3Parser.RULE_program;
    }
    public override enterRule(listener: Stage3Listener): void {
        if(listener.enterProgram) {
             listener.enterProgram(this);
        }
    }
    public override exitRule(listener: Stage3Listener): void {
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
        return Stage3Parser.RULE_topLevel;
    }
    public override enterRule(listener: Stage3Listener): void {
        if(listener.enterTopLevel) {
             listener.enterTopLevel(this);
        }
    }
    public override exitRule(listener: Stage3Listener): void {
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
        return this.getToken(Stage3Parser.LPAREN, 0)!;
    }
    public DEFMACRO(): antlr.TerminalNode {
        return this.getToken(Stage3Parser.DEFMACRO, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3Parser.IDENTIFIER, 0)!;
    }
    public fnSignature(): FnSignatureContext {
        return this.getRuleContext(0, FnSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3Parser.RPAREN, 0)!;
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
        return Stage3Parser.RULE_defmacro;
    }
    public override enterRule(listener: Stage3Listener): void {
        if(listener.enterDefmacro) {
             listener.enterDefmacro(this);
        }
    }
    public override exitRule(listener: Stage3Listener): void {
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
        return this.getToken(Stage3Parser.LPAREN, 0)!;
    }
    public DEF(): antlr.TerminalNode {
        return this.getToken(Stage3Parser.DEF, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3Parser.IDENTIFIER, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3Parser.RULE_def;
    }
    public override enterRule(listener: Stage3Listener): void {
        if(listener.enterDef) {
             listener.enterDef(this);
        }
    }
    public override exitRule(listener: Stage3Listener): void {
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
        return Stage3Parser.RULE_statement;
    }
    public override enterRule(listener: Stage3Listener): void {
        if(listener.enterStatement) {
             listener.enterStatement(this);
        }
    }
    public override exitRule(listener: Stage3Listener): void {
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
    		return this.getTokens(Stage3Parser.LPAREN);
    	} else {
    		return this.getToken(Stage3Parser.LPAREN, i);
    	}
    }
    public LETSTAR(): antlr.TerminalNode {
        return this.getToken(Stage3Parser.LETSTAR, 0)!;
    }
    public RPAREN(): antlr.TerminalNode[];
    public RPAREN(i: number): antlr.TerminalNode | null;
    public RPAREN(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage3Parser.RPAREN);
    	} else {
    		return this.getToken(Stage3Parser.RPAREN, i);
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
        return Stage3Parser.RULE_letStar;
    }
    public override enterRule(listener: Stage3Listener): void {
        if(listener.enterLetStar) {
             listener.enterLetStar(this);
        }
    }
    public override exitRule(listener: Stage3Listener): void {
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
        return this.getToken(Stage3Parser.LPAREN, 0)!;
    }
    public LET(): antlr.TerminalNode {
        return this.getToken(Stage3Parser.LET, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3Parser.IDENTIFIER, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3Parser.RULE_letStmt;
    }
    public override enterRule(listener: Stage3Listener): void {
        if(listener.enterLetStmt) {
             listener.enterLetStmt(this);
        }
    }
    public override exitRule(listener: Stage3Listener): void {
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
        return this.getToken(Stage3Parser.LPAREN, 0)!;
    }
    public IF(): antlr.TerminalNode {
        return this.getToken(Stage3Parser.IF, 0)!;
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
        return this.getToken(Stage3Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3Parser.RULE_ifForm;
    }
    public override enterRule(listener: Stage3Listener): void {
        if(listener.enterIfForm) {
             listener.enterIfForm(this);
        }
    }
    public override exitRule(listener: Stage3Listener): void {
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
        return this.getToken(Stage3Parser.LPAREN, 0)!;
    }
    public WHILE(): antlr.TerminalNode {
        return this.getToken(Stage3Parser.WHILE, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3Parser.RPAREN, 0)!;
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
        return Stage3Parser.RULE_whileForm;
    }
    public override enterRule(listener: Stage3Listener): void {
        if(listener.enterWhileForm) {
             listener.enterWhileForm(this);
        }
    }
    public override exitRule(listener: Stage3Listener): void {
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
        return this.getToken(Stage3Parser.LPAREN, 0)!;
    }
    public BEGIN(): antlr.TerminalNode {
        return this.getToken(Stage3Parser.BEGIN, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3Parser.RPAREN, 0)!;
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
        return Stage3Parser.RULE_block;
    }
    public override enterRule(listener: Stage3Listener): void {
        if(listener.enterBlock) {
             listener.enterBlock(this);
        }
    }
    public override exitRule(listener: Stage3Listener): void {
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
        return this.getToken(Stage3Parser.LPAREN, 0)!;
    }
    public RETURN(): antlr.TerminalNode {
        return this.getToken(Stage3Parser.RETURN, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3Parser.RPAREN, 0)!;
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public override get ruleIndex(): number {
        return Stage3Parser.RULE_returnForm;
    }
    public override enterRule(listener: Stage3Listener): void {
        if(listener.enterReturnForm) {
             listener.enterReturnForm(this);
        }
    }
    public override exitRule(listener: Stage3Listener): void {
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
        return this.getToken(Stage3Parser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3Parser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3Parser.RPAREN, 0)!;
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public override get ruleIndex(): number {
        return Stage3Parser.RULE_binding;
    }
    public override enterRule(listener: Stage3Listener): void {
        if(listener.enterBinding) {
             listener.enterBinding(this);
        }
    }
    public override exitRule(listener: Stage3Listener): void {
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
        return this.getToken(Stage3Parser.KEYWORD, 0);
    }
    public IDENTIFIER(): antlr.TerminalNode | null {
        return this.getToken(Stage3Parser.IDENTIFIER, 0);
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
    public call(): CallContext | null {
        return this.getRuleContext(0, CallContext);
    }
    public override get ruleIndex(): number {
        return Stage3Parser.RULE_expression;
    }
    public override enterRule(listener: Stage3Listener): void {
        if(listener.enterExpression) {
             listener.enterExpression(this);
        }
    }
    public override exitRule(listener: Stage3Listener): void {
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
        return this.getToken(Stage3Parser.LPAREN, 0)!;
    }
    public LAMBDA(): antlr.TerminalNode {
        return this.getToken(Stage3Parser.LAMBDA, 0)!;
    }
    public fnSignature(): FnSignatureContext {
        return this.getRuleContext(0, FnSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3Parser.RPAREN, 0)!;
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
        return Stage3Parser.RULE_lambda;
    }
    public override enterRule(listener: Stage3Listener): void {
        if(listener.enterLambda) {
             listener.enterLambda(this);
        }
    }
    public override exitRule(listener: Stage3Listener): void {
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
        return this.getToken(Stage3Parser.LPAREN, 0)!;
    }
    public SET(): antlr.TerminalNode {
        return this.getToken(Stage3Parser.SET, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3Parser.IDENTIFIER, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3Parser.RULE_assign;
    }
    public override enterRule(listener: Stage3Listener): void {
        if(listener.enterAssign) {
             listener.enterAssign(this);
        }
    }
    public override exitRule(listener: Stage3Listener): void {
        if(listener.exitAssign) {
             listener.exitAssign(this);
        }
    }
}


export class ObjectExprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3Parser.LPAREN, 0)!;
    }
    public OBJECT(): antlr.TerminalNode {
        return this.getToken(Stage3Parser.OBJECT, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3Parser.RPAREN, 0)!;
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
        return Stage3Parser.RULE_objectExpr;
    }
    public override enterRule(listener: Stage3Listener): void {
        if(listener.enterObjectExpr) {
             listener.enterObjectExpr(this);
        }
    }
    public override exitRule(listener: Stage3Listener): void {
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
        return this.getToken(Stage3Parser.LPAREN, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3Parser.RPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode | null {
        return this.getToken(Stage3Parser.IDENTIFIER, 0);
    }
    public KEYWORD(): antlr.TerminalNode | null {
        return this.getToken(Stage3Parser.KEYWORD, 0);
    }
    public STRING(): antlr.TerminalNode | null {
        return this.getToken(Stage3Parser.STRING, 0);
    }
    public override get ruleIndex(): number {
        return Stage3Parser.RULE_objectField;
    }
    public override enterRule(listener: Stage3Listener): void {
        if(listener.enterObjectField) {
             listener.enterObjectField(this);
        }
    }
    public override exitRule(listener: Stage3Listener): void {
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
        return this.getToken(Stage3Parser.LPAREN, 0)!;
    }
    public ARRAY(): antlr.TerminalNode {
        return this.getToken(Stage3Parser.ARRAY, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3Parser.RPAREN, 0)!;
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
        return Stage3Parser.RULE_arrayExpr;
    }
    public override enterRule(listener: Stage3Listener): void {
        if(listener.enterArrayExpr) {
             listener.enterArrayExpr(this);
        }
    }
    public override exitRule(listener: Stage3Listener): void {
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
        return this.getToken(Stage3Parser.LPAREN, 0)!;
    }
    public DOT(): antlr.TerminalNode {
        return this.getToken(Stage3Parser.DOT, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3Parser.RPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode | null {
        return this.getToken(Stage3Parser.IDENTIFIER, 0);
    }
    public KEYWORD(): antlr.TerminalNode | null {
        return this.getToken(Stage3Parser.KEYWORD, 0);
    }
    public override get ruleIndex(): number {
        return Stage3Parser.RULE_propAccess;
    }
    public override enterRule(listener: Stage3Listener): void {
        if(listener.enterPropAccess) {
             listener.enterPropAccess(this);
        }
    }
    public override exitRule(listener: Stage3Listener): void {
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
        return this.getToken(Stage3Parser.LPAREN, 0)!;
    }
    public INDEX(): antlr.TerminalNode {
        return this.getToken(Stage3Parser.INDEX, 0)!;
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
        return this.getToken(Stage3Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3Parser.RULE_indexAccess;
    }
    public override enterRule(listener: Stage3Listener): void {
        if(listener.enterIndexAccess) {
             listener.enterIndexAccess(this);
        }
    }
    public override exitRule(listener: Stage3Listener): void {
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
        return this.getToken(Stage3Parser.LPAREN, 0)!;
    }
    public QUASI(): antlr.TerminalNode {
        return this.getToken(Stage3Parser.QUASI, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3Parser.RULE_quasiquote;
    }
    public override enterRule(listener: Stage3Listener): void {
        if(listener.enterQuasiquote) {
             listener.enterQuasiquote(this);
        }
    }
    public override exitRule(listener: Stage3Listener): void {
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
        return this.getToken(Stage3Parser.LPAREN, 0)!;
    }
    public UNQUOTE(): antlr.TerminalNode {
        return this.getToken(Stage3Parser.UNQUOTE, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3Parser.RULE_unquote;
    }
    public override enterRule(listener: Stage3Listener): void {
        if(listener.enterUnquote) {
             listener.enterUnquote(this);
        }
    }
    public override exitRule(listener: Stage3Listener): void {
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
        return this.getToken(Stage3Parser.LPAREN, 0)!;
    }
    public UNQUOTE_SPLICING(): antlr.TerminalNode {
        return this.getToken(Stage3Parser.UNQUOTE_SPLICING, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3Parser.RULE_unquoteSplicing;
    }
    public override enterRule(listener: Stage3Listener): void {
        if(listener.enterUnquoteSplicing) {
             listener.enterUnquoteSplicing(this);
        }
    }
    public override exitRule(listener: Stage3Listener): void {
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
        return this.getToken(Stage3Parser.LPAREN, 0)!;
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
        return this.getToken(Stage3Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3Parser.RULE_call;
    }
    public override enterRule(listener: Stage3Listener): void {
        if(listener.enterCall) {
             listener.enterCall(this);
        }
    }
    public override exitRule(listener: Stage3Listener): void {
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
        return this.getToken(Stage3Parser.LPAREN, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3Parser.RPAREN, 0)!;
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
    		return this.getTokens(Stage3Parser.COMMA);
    	} else {
    		return this.getToken(Stage3Parser.COMMA, i);
    	}
    }
    public override get ruleIndex(): number {
        return Stage3Parser.RULE_fnSignature;
    }
    public override enterRule(listener: Stage3Listener): void {
        if(listener.enterFnSignature) {
             listener.enterFnSignature(this);
        }
    }
    public override exitRule(listener: Stage3Listener): void {
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
        return this.getToken(Stage3Parser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage3Parser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage3Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage3Parser.RULE_param;
    }
    public override enterRule(listener: Stage3Listener): void {
        if(listener.enterParam) {
             listener.enterParam(this);
        }
    }
    public override exitRule(listener: Stage3Listener): void {
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
        return this.getToken(Stage3Parser.NUMBER, 0);
    }
    public STRING(): antlr.TerminalNode | null {
        return this.getToken(Stage3Parser.STRING, 0);
    }
    public BOOLEAN(): antlr.TerminalNode | null {
        return this.getToken(Stage3Parser.BOOLEAN, 0);
    }
    public NULL(): antlr.TerminalNode | null {
        return this.getToken(Stage3Parser.NULL, 0);
    }
    public UNDEFINED(): antlr.TerminalNode | null {
        return this.getToken(Stage3Parser.UNDEFINED, 0);
    }
    public override get ruleIndex(): number {
        return Stage3Parser.RULE_literal;
    }
    public override enterRule(listener: Stage3Listener): void {
        if(listener.enterLiteral) {
             listener.enterLiteral(this);
        }
    }
    public override exitRule(listener: Stage3Listener): void {
        if(listener.exitLiteral) {
             listener.exitLiteral(this);
        }
    }
}
