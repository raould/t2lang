
import * as antlr from "antlr4ng";
import { Token } from "antlr4ng";


export class Stage0Lexer extends antlr.Lexer {
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

    public static readonly channelNames = [
        "DEFAULT_TOKEN_CHANNEL", "HIDDEN"
    ];

    public static readonly literalNames = [
        null, null, "'('", "')'", "','", "'program'", "'let*'", "'lambda'", 
        "'call'", "'raw'", null, "'null'", "'undefined'"
    ];

    public static readonly symbolicNames = [
        null, "COMMENT", "LPAREN", "RPAREN", "COMMA", "PROGRAM", "LETSTAR", 
        "LAMBDA", "CALL", "RAW", "BOOLEAN", "NULL", "UNDEFINED", "NUMBER", 
        "STRING", "MULTILINE_STRING", "IDENTIFIER", "WS"
    ];

    public static readonly modeNames = [
        "DEFAULT_MODE",
    ];

    public static readonly ruleNames = [
        "COMMENT", "LPAREN", "RPAREN", "COMMA", "PROGRAM", "LETSTAR", "LAMBDA", 
        "CALL", "RAW", "BOOLEAN", "NULL", "UNDEFINED", "NUMBER", "STRING", 
        "MULTILINE_STRING", "IDENTIFIER", "WS",
    ];


    public constructor(input: antlr.CharStream) {
        super(input);
        this.interpreter = new antlr.LexerATNSimulator(this, Stage0Lexer._ATN, Stage0Lexer.decisionsToDFA, new antlr.PredictionContextCache());
    }

    public get grammarFileName(): string { return "Stage0.g4"; }

    public get literalNames(): (string | null)[] { return Stage0Lexer.literalNames; }
    public get symbolicNames(): (string | null)[] { return Stage0Lexer.symbolicNames; }
    public get ruleNames(): string[] { return Stage0Lexer.ruleNames; }

    public get serializedATN(): number[] { return Stage0Lexer._serializedATN; }

    public get channelNames(): string[] { return Stage0Lexer.channelNames; }

    public get modeNames(): string[] { return Stage0Lexer.modeNames; }

    public static readonly _serializedATN: number[] = [
        4,0,17,165,6,-1,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,
        2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,
        13,7,13,2,14,7,14,2,15,7,15,2,16,7,16,1,0,1,0,1,0,1,0,5,0,40,8,0,
        10,0,12,0,43,9,0,1,0,1,0,1,1,1,1,1,2,1,2,1,3,1,3,1,4,1,4,1,4,1,4,
        1,4,1,4,1,4,1,4,1,5,1,5,1,5,1,5,1,5,1,6,1,6,1,6,1,6,1,6,1,6,1,6,
        1,7,1,7,1,7,1,7,1,7,1,8,1,8,1,8,1,8,1,9,1,9,1,9,1,9,1,9,1,9,1,9,
        1,9,1,9,3,9,91,8,9,1,10,1,10,1,10,1,10,1,10,1,11,1,11,1,11,1,11,
        1,11,1,11,1,11,1,11,1,11,1,11,1,12,4,12,109,8,12,11,12,12,12,110,
        1,12,1,12,4,12,115,8,12,11,12,12,12,116,3,12,119,8,12,1,13,1,13,
        5,13,123,8,13,10,13,12,13,126,9,13,1,13,1,13,1,13,5,13,131,8,13,
        10,13,12,13,134,9,13,1,13,1,13,3,13,138,8,13,1,14,1,14,1,14,1,14,
        1,14,5,14,145,8,14,10,14,12,14,148,9,14,1,14,1,14,1,14,1,14,1,15,
        4,15,155,8,15,11,15,12,15,156,1,16,4,16,160,8,16,11,16,12,16,161,
        1,16,1,16,1,146,0,17,1,1,3,2,5,3,7,4,9,5,11,6,13,7,15,8,17,9,19,
        10,21,11,23,12,25,13,27,14,29,15,31,16,33,17,1,0,6,2,0,10,10,13,
        13,1,0,48,57,1,0,39,39,1,0,34,34,4,0,9,10,13,13,32,32,40,41,3,0,
        9,10,13,13,32,32,176,0,1,1,0,0,0,0,3,1,0,0,0,0,5,1,0,0,0,0,7,1,0,
        0,0,0,9,1,0,0,0,0,11,1,0,0,0,0,13,1,0,0,0,0,15,1,0,0,0,0,17,1,0,
        0,0,0,19,1,0,0,0,0,21,1,0,0,0,0,23,1,0,0,0,0,25,1,0,0,0,0,27,1,0,
        0,0,0,29,1,0,0,0,0,31,1,0,0,0,0,33,1,0,0,0,1,35,1,0,0,0,3,46,1,0,
        0,0,5,48,1,0,0,0,7,50,1,0,0,0,9,52,1,0,0,0,11,60,1,0,0,0,13,65,1,
        0,0,0,15,72,1,0,0,0,17,77,1,0,0,0,19,90,1,0,0,0,21,92,1,0,0,0,23,
        97,1,0,0,0,25,108,1,0,0,0,27,137,1,0,0,0,29,139,1,0,0,0,31,154,1,
        0,0,0,33,159,1,0,0,0,35,36,5,59,0,0,36,37,5,59,0,0,37,41,1,0,0,0,
        38,40,8,0,0,0,39,38,1,0,0,0,40,43,1,0,0,0,41,39,1,0,0,0,41,42,1,
        0,0,0,42,44,1,0,0,0,43,41,1,0,0,0,44,45,6,0,0,0,45,2,1,0,0,0,46,
        47,5,40,0,0,47,4,1,0,0,0,48,49,5,41,0,0,49,6,1,0,0,0,50,51,5,44,
        0,0,51,8,1,0,0,0,52,53,5,112,0,0,53,54,5,114,0,0,54,55,5,111,0,0,
        55,56,5,103,0,0,56,57,5,114,0,0,57,58,5,97,0,0,58,59,5,109,0,0,59,
        10,1,0,0,0,60,61,5,108,0,0,61,62,5,101,0,0,62,63,5,116,0,0,63,64,
        5,42,0,0,64,12,1,0,0,0,65,66,5,108,0,0,66,67,5,97,0,0,67,68,5,109,
        0,0,68,69,5,98,0,0,69,70,5,100,0,0,70,71,5,97,0,0,71,14,1,0,0,0,
        72,73,5,99,0,0,73,74,5,97,0,0,74,75,5,108,0,0,75,76,5,108,0,0,76,
        16,1,0,0,0,77,78,5,114,0,0,78,79,5,97,0,0,79,80,5,119,0,0,80,18,
        1,0,0,0,81,82,5,116,0,0,82,83,5,114,0,0,83,84,5,117,0,0,84,91,5,
        101,0,0,85,86,5,102,0,0,86,87,5,97,0,0,87,88,5,108,0,0,88,89,5,115,
        0,0,89,91,5,101,0,0,90,81,1,0,0,0,90,85,1,0,0,0,91,20,1,0,0,0,92,
        93,5,110,0,0,93,94,5,117,0,0,94,95,5,108,0,0,95,96,5,108,0,0,96,
        22,1,0,0,0,97,98,5,117,0,0,98,99,5,110,0,0,99,100,5,100,0,0,100,
        101,5,101,0,0,101,102,5,102,0,0,102,103,5,105,0,0,103,104,5,110,
        0,0,104,105,5,101,0,0,105,106,5,100,0,0,106,24,1,0,0,0,107,109,7,
        1,0,0,108,107,1,0,0,0,109,110,1,0,0,0,110,108,1,0,0,0,110,111,1,
        0,0,0,111,118,1,0,0,0,112,114,5,46,0,0,113,115,7,1,0,0,114,113,1,
        0,0,0,115,116,1,0,0,0,116,114,1,0,0,0,116,117,1,0,0,0,117,119,1,
        0,0,0,118,112,1,0,0,0,118,119,1,0,0,0,119,26,1,0,0,0,120,124,5,39,
        0,0,121,123,8,2,0,0,122,121,1,0,0,0,123,126,1,0,0,0,124,122,1,0,
        0,0,124,125,1,0,0,0,125,127,1,0,0,0,126,124,1,0,0,0,127,138,5,39,
        0,0,128,132,5,34,0,0,129,131,8,3,0,0,130,129,1,0,0,0,131,134,1,0,
        0,0,132,130,1,0,0,0,132,133,1,0,0,0,133,135,1,0,0,0,134,132,1,0,
        0,0,135,138,5,34,0,0,136,138,3,29,14,0,137,120,1,0,0,0,137,128,1,
        0,0,0,137,136,1,0,0,0,138,28,1,0,0,0,139,140,5,34,0,0,140,141,5,
        34,0,0,141,142,5,34,0,0,142,146,1,0,0,0,143,145,9,0,0,0,144,143,
        1,0,0,0,145,148,1,0,0,0,146,147,1,0,0,0,146,144,1,0,0,0,147,149,
        1,0,0,0,148,146,1,0,0,0,149,150,5,34,0,0,150,151,5,34,0,0,151,152,
        5,34,0,0,152,30,1,0,0,0,153,155,8,4,0,0,154,153,1,0,0,0,155,156,
        1,0,0,0,156,154,1,0,0,0,156,157,1,0,0,0,157,32,1,0,0,0,158,160,7,
        5,0,0,159,158,1,0,0,0,160,161,1,0,0,0,161,159,1,0,0,0,161,162,1,
        0,0,0,162,163,1,0,0,0,163,164,6,16,0,0,164,34,1,0,0,0,12,0,41,90,
        110,116,118,124,132,137,146,156,161,1,6,0,0
    ];

    private static __ATN: antlr.ATN;
    public static get _ATN(): antlr.ATN {
        if (!Stage0Lexer.__ATN) {
            Stage0Lexer.__ATN = new antlr.ATNDeserializer().deserialize(Stage0Lexer._serializedATN);
        }

        return Stage0Lexer.__ATN;
    }


    private static readonly vocabulary = new antlr.Vocabulary(Stage0Lexer.literalNames, Stage0Lexer.symbolicNames, []);

    public override get vocabulary(): antlr.Vocabulary {
        return Stage0Lexer.vocabulary;
    }

    private static readonly decisionsToDFA = Stage0Lexer._ATN.decisionToState.map( (ds: antlr.DecisionState, index: number) => new antlr.DFA(ds, index) );
}