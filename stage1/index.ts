import { CharStream, CommonTokenStream } from "antlr4ng";
import { Stage1Lexer } from "./Stage1Lexer";
import { RawContext, BindingContext, CallContext, ExpressionContext, LambdaContext, LetStarContext, LiteralContext, ParamContext, ProgramContext, Stage1Parser, StatementContext } from "./Stage1Parser";
import fs from "node:fs";

// INSERT_STAGE0_COMPILED
