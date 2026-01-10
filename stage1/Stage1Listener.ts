
import { ErrorNode, ParseTreeListener, ParserRuleContext, TerminalNode } from "antlr4ng";


import { ProgramContext } from "./Stage1Parser.js";
import { StatementContext } from "./Stage1Parser.js";
import { IfContext } from "./Stage1Parser.js";
import { WhileContext } from "./Stage1Parser.js";
import { BindingContext } from "./Stage1Parser.js";
import { LetStarContext } from "./Stage1Parser.js";
import { LambdaContext } from "./Stage1Parser.js";
import { FnSignatureContext } from "./Stage1Parser.js";
import { ParamContext } from "./Stage1Parser.js";
import { ExpressionContext } from "./Stage1Parser.js";
import { CallContext } from "./Stage1Parser.js";
import { RawContext } from "./Stage1Parser.js";
import { LiteralContext } from "./Stage1Parser.js";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `Stage1Parser`.
 */
export class Stage1Listener implements ParseTreeListener {
    /**
     * Enter a parse tree produced by `Stage1Parser.program`.
     * @param ctx the parse tree
     */
    enterProgram?: (ctx: ProgramContext) => void;
    /**
     * Exit a parse tree produced by `Stage1Parser.program`.
     * @param ctx the parse tree
     */
    exitProgram?: (ctx: ProgramContext) => void;
    /**
     * Enter a parse tree produced by `Stage1Parser.statement`.
     * @param ctx the parse tree
     */
    enterStatement?: (ctx: StatementContext) => void;
    /**
     * Exit a parse tree produced by `Stage1Parser.statement`.
     * @param ctx the parse tree
     */
    exitStatement?: (ctx: StatementContext) => void;
    /**
     * Enter a parse tree produced by `Stage1Parser.if`.
     * @param ctx the parse tree
     */
    enterIf?: (ctx: IfContext) => void;
    /**
     * Exit a parse tree produced by `Stage1Parser.if`.
     * @param ctx the parse tree
     */
    exitIf?: (ctx: IfContext) => void;
    /**
     * Enter a parse tree produced by `Stage1Parser.while`.
     * @param ctx the parse tree
     */
    enterWhile?: (ctx: WhileContext) => void;
    /**
     * Exit a parse tree produced by `Stage1Parser.while`.
     * @param ctx the parse tree
     */
    exitWhile?: (ctx: WhileContext) => void;
    /**
     * Enter a parse tree produced by `Stage1Parser.binding`.
     * @param ctx the parse tree
     */
    enterBinding?: (ctx: BindingContext) => void;
    /**
     * Exit a parse tree produced by `Stage1Parser.binding`.
     * @param ctx the parse tree
     */
    exitBinding?: (ctx: BindingContext) => void;
    /**
     * Enter a parse tree produced by `Stage1Parser.letStar`.
     * @param ctx the parse tree
     */
    enterLetStar?: (ctx: LetStarContext) => void;
    /**
     * Exit a parse tree produced by `Stage1Parser.letStar`.
     * @param ctx the parse tree
     */
    exitLetStar?: (ctx: LetStarContext) => void;
    /**
     * Enter a parse tree produced by `Stage1Parser.lambda`.
     * @param ctx the parse tree
     */
    enterLambda?: (ctx: LambdaContext) => void;
    /**
     * Exit a parse tree produced by `Stage1Parser.lambda`.
     * @param ctx the parse tree
     */
    exitLambda?: (ctx: LambdaContext) => void;
    /**
     * Enter a parse tree produced by `Stage1Parser.fnSignature`.
     * @param ctx the parse tree
     */
    enterFnSignature?: (ctx: FnSignatureContext) => void;
    /**
     * Exit a parse tree produced by `Stage1Parser.fnSignature`.
     * @param ctx the parse tree
     */
    exitFnSignature?: (ctx: FnSignatureContext) => void;
    /**
     * Enter a parse tree produced by `Stage1Parser.param`.
     * @param ctx the parse tree
     */
    enterParam?: (ctx: ParamContext) => void;
    /**
     * Exit a parse tree produced by `Stage1Parser.param`.
     * @param ctx the parse tree
     */
    exitParam?: (ctx: ParamContext) => void;
    /**
     * Enter a parse tree produced by `Stage1Parser.expression`.
     * @param ctx the parse tree
     */
    enterExpression?: (ctx: ExpressionContext) => void;
    /**
     * Exit a parse tree produced by `Stage1Parser.expression`.
     * @param ctx the parse tree
     */
    exitExpression?: (ctx: ExpressionContext) => void;
    /**
     * Enter a parse tree produced by `Stage1Parser.call`.
     * @param ctx the parse tree
     */
    enterCall?: (ctx: CallContext) => void;
    /**
     * Exit a parse tree produced by `Stage1Parser.call`.
     * @param ctx the parse tree
     */
    exitCall?: (ctx: CallContext) => void;
    /**
     * Enter a parse tree produced by `Stage1Parser.raw`.
     * @param ctx the parse tree
     */
    enterRaw?: (ctx: RawContext) => void;
    /**
     * Exit a parse tree produced by `Stage1Parser.raw`.
     * @param ctx the parse tree
     */
    exitRaw?: (ctx: RawContext) => void;
    /**
     * Enter a parse tree produced by `Stage1Parser.literal`.
     * @param ctx the parse tree
     */
    enterLiteral?: (ctx: LiteralContext) => void;
    /**
     * Exit a parse tree produced by `Stage1Parser.literal`.
     * @param ctx the parse tree
     */
    exitLiteral?: (ctx: LiteralContext) => void;

    visitTerminal(node: TerminalNode): void {}
    visitErrorNode(node: ErrorNode): void {}
    enterEveryRule(node: ParserRuleContext): void {}
    exitEveryRule(node: ParserRuleContext): void {}
}

