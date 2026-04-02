
import * as antlr from "antlr4ng";
import { Token } from "antlr4ng";

import { Stage9Listener } from "./Stage9Listener.js";
// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;


export class Stage9Parser extends antlr.Parser {
    public static readonly COMMENT = 1;
    public static readonly LPAREN = 2;
    public static readonly RPAREN = 3;
    public static readonly COMMA = 4;
    public static readonly MACRO_IMPORT = 5;
    public static readonly MACRO_EXPORT = 6;
    public static readonly MACRO_REEXPORT = 7;
    public static readonly PROGRAM = 8;
    public static readonly LET = 9;
    public static readonly VAR = 10;
    public static readonly CONSTSTAR = 11;
    public static readonly CONST = 12;
    public static readonly LAMBDA_O = 13;
    public static readonly LAMBDA = 14;
    public static readonly FN_O = 15;
    public static readonly FN = 16;
    public static readonly METHOD_O = 17;
    public static readonly METHOD = 18;
    public static readonly BIND = 19;
    public static readonly METHOD_CALL = 20;
    public static readonly DEFMACRO = 21;
    public static readonly MACRO_TIME_ATTR = 22;
    public static readonly MACRO_ERROR = 23;
    public static readonly IF = 24;
    public static readonly WHILE = 25;
    public static readonly THEN = 26;
    public static readonly RETURN = 27;
    public static readonly THROW = 28;
    public static readonly BREAK = 29;
    public static readonly CONTINUE = 30;
    public static readonly SET = 31;
    public static readonly TERNARY = 32;
    public static readonly COND = 33;
    public static readonly OBJECT = 34;
    public static readonly TYPE_ARRAY = 35;
    public static readonly ARRAY = 36;
    public static readonly SUBSCRIPT = 37;
    public static readonly OPTCHAIN_INDEX = 38;
    public static readonly OPTCHAIN = 39;
    public static readonly DOT = 40;
    public static readonly INDEX = 41;
    public static readonly NULLCOAL = 42;
    public static readonly QUASI = 43;
    public static readonly QUOTE = 44;
    public static readonly UNQUOTE_SPLICING = 45;
    public static readonly UNQUOTE = 46;
    public static readonly NEW = 47;
    public static readonly IMPORT = 48;
    public static readonly SWITCH = 49;
    public static readonly CASE = 50;
    public static readonly DEFAULT = 51;
    public static readonly FORIN = 52;
    public static readonly FOROF = 53;
    public static readonly FORAWAIT = 54;
    public static readonly TRY = 55;
    public static readonly CATCH = 56;
    public static readonly FINALLY = 57;
    public static readonly EXCEPT = 58;
    public static readonly AS = 59;
    public static readonly FOR = 60;
    public static readonly CLASS_BODY = 61;
    public static readonly SUPER_METHOD = 62;
    public static readonly ABSTRACT_METHOD_O = 63;
    public static readonly ABSTRACT_METHOD = 64;
    public static readonly CLASS = 65;
    public static readonly FIELD = 66;
    public static readonly CONSTRUCTOR_O = 67;
    public static readonly CONSTRUCTOR = 68;
    public static readonly THIS = 69;
    public static readonly SUPER = 70;
    public static readonly GET = 71;
    public static readonly SETPROP = 72;
    public static readonly IMPLEMENTS = 73;
    public static readonly UNION = 74;
    public static readonly INTERSECT = 75;
    public static readonly TUPLE = 76;
    public static readonly TYPEFN = 77;
    public static readonly LIT = 78;
    public static readonly KEYOF = 79;
    public static readonly TYPEOF = 80;
    public static readonly TYPE_AS = 81;
    public static readonly INFER = 82;
    public static readonly MAPPED = 83;
    public static readonly TYPE_TEMPLATE = 84;
    public static readonly TEMPLATE = 85;
    public static readonly REST = 86;
    public static readonly READONLY = 87;
    public static readonly TYPE_PARAMS = 88;
    public static readonly TYPE_ARGS = 89;
    public static readonly TYPE_APP = 90;
    public static readonly EXTENDS = 91;
    public static readonly RETURNS = 92;
    public static readonly TYPE = 93;
    public static readonly INTERFACE = 94;
    public static readonly ENUM = 95;
    public static readonly MODIFIERS = 96;
    public static readonly OPTIONAL = 97;
    public static readonly BOOLEAN = 98;
    public static readonly NULL = 99;
    public static readonly UNDEFINED = 100;
    public static readonly COLON = 101;
    public static readonly ASYNC_GENERATOR_FN_O = 102;
    public static readonly ASYNC_GENERATOR_FN = 103;
    public static readonly ASYNC_LAMBDA_O = 104;
    public static readonly ASYNC_LAMBDA = 105;
    public static readonly ASYNC_FN_O = 106;
    public static readonly ASYNC_FN = 107;
    public static readonly GENERATOR_FN_O = 108;
    public static readonly GENERATOR_FN = 109;
    public static readonly YIELD_STAR = 110;
    public static readonly YIELD = 111;
    public static readonly AWAIT = 112;
    public static readonly CARET = 113;
    public static readonly PUBLIC = 114;
    public static readonly PRIVATE = 115;
    public static readonly PROTECTED = 116;
    public static readonly STATIC = 117;
    public static readonly ABSTRACT = 118;
    public static readonly OVERRIDE = 119;
    public static readonly ASYNC = 120;
    public static readonly GENERATOR = 121;
    public static readonly ELSE = 122;
    public static readonly LBRACK = 123;
    public static readonly RBRACK = 124;
    public static readonly STRICT_EQ = 125;
    public static readonly STRICT_NEQ = 126;
    public static readonly EQ_OP = 127;
    public static readonly NEQ_OP = 128;
    public static readonly GTE_OP = 129;
    public static readonly LTE_OP = 130;
    public static readonly FAT_ARROW = 131;
    public static readonly STMT_ARROW = 132;
    public static readonly PLUS_ASSIGN = 133;
    public static readonly MINUS_ASSIGN = 134;
    public static readonly TIMES_ASSIGN = 135;
    public static readonly DIV_ASSIGN = 136;
    public static readonly MOD_ASSIGN = 137;
    public static readonly EQUALS = 138;
    public static readonly LBRACE = 139;
    public static readonly RBRACE = 140;
    public static readonly HASH_LBRACE = 141;
    public static readonly STARSTAR = 142;
    public static readonly AMPAMP = 143;
    public static readonly PIPEPIPE = 144;
    public static readonly PLUS = 145;
    public static readonly STAR = 146;
    public static readonly SLASH = 147;
    public static readonly PERCENT = 148;
    public static readonly LT = 149;
    public static readonly GT = 150;
    public static readonly BANG = 151;
    public static readonly AMP = 152;
    public static readonly PIPE = 153;
    public static readonly EXPORT = 154;
    public static readonly EXPORT_DEFAULT = 155;
    public static readonly EXPORT_NAMED = 156;
    public static readonly EXPORT_NS_FROM = 157;
    public static readonly EXPORT_FROM = 158;
    public static readonly EXPORT_ALL_FROM = 159;
    public static readonly IMPORT_TYPE = 160;
    public static readonly EXPORT_TYPE_ALL_FROM = 161;
    public static readonly EXPORT_TYPE_FROM = 162;
    public static readonly EXPORT_TYPE = 163;
    public static readonly NUMBER = 164;
    public static readonly STRING = 165;
    public static readonly MULTILINE_STRING = 166;
    public static readonly NEG_NUMBER = 167;
    public static readonly MINUS = 168;
    public static readonly TILDE_AT = 169;
    public static readonly TILDE = 170;
    public static readonly IDENTIFIER = 171;
    public static readonly WS = 172;
    public static readonly RULE_program = 0;
    public static readonly RULE_topLevel = 1;
    public static readonly RULE_decl = 2;
    public static readonly RULE_defmacro = 3;
    public static readonly RULE_macroSignature = 4;
    public static readonly RULE_macroTimeFnDef = 5;
    public static readonly RULE_macroImport = 6;
    public static readonly RULE_macroExport = 7;
    public static readonly RULE_macroExportSpec = 8;
    public static readonly RULE_macroReexport = 9;
    public static readonly RULE_topLevelLet = 10;
    public static readonly RULE_topLevelVar = 11;
    public static readonly RULE_topLevelConst = 12;
    public static readonly RULE_metaAnnotation = 13;
    public static readonly RULE_typeAlias = 14;
    public static readonly RULE_interfaceDef = 15;
    public static readonly RULE_interfaceExtends = 16;
    public static readonly RULE_enumDef = 17;
    public static readonly RULE_enumMember = 18;
    public static readonly RULE_classDef = 19;
    public static readonly RULE_anonClassDef = 20;
    public static readonly RULE_classExtends = 21;
    public static readonly RULE_classImplements = 22;
    public static readonly RULE_classBody = 23;
    public static readonly RULE_classElement = 24;
    public static readonly RULE_modifier = 25;
    public static readonly RULE_fieldDef = 26;
    public static readonly RULE_constructorParam = 27;
    public static readonly RULE_constructorSignature = 28;
    public static readonly RULE_constructorDef = 29;
    public static readonly RULE_classMethodDef = 30;
    public static readonly RULE_abstractMethodDef = 31;
    public static readonly RULE_getterDef = 32;
    public static readonly RULE_setterDef = 33;
    public static readonly RULE_methodKey = 34;
    public static readonly RULE_statement = 35;
    public static readonly RULE_letStmt = 36;
    public static readonly RULE_varStmt = 37;
    public static readonly RULE_constStar = 38;
    public static readonly RULE_constStmt = 39;
    public static readonly RULE_ifForm = 40;
    public static readonly RULE_thenBlock = 41;
    public static readonly RULE_elseBlock = 42;
    public static readonly RULE_whileForm = 43;
    public static readonly RULE_returnForm = 44;
    public static readonly RULE_throwForm = 45;
    public static readonly RULE_breakForm = 46;
    public static readonly RULE_continueForm = 47;
    public static readonly RULE_importForm = 48;
    public static readonly RULE_importTypeForm = 49;
    public static readonly RULE_importTypeSpec = 50;
    public static readonly RULE_importTypeName = 51;
    public static readonly RULE_exportForm = 52;
    public static readonly RULE_exportBinding = 53;
    public static readonly RULE_exportDefault = 54;
    public static readonly RULE_exportNamed = 55;
    public static readonly RULE_exportNamePair = 56;
    public static readonly RULE_exportFrom = 57;
    public static readonly RULE_exportAllFrom = 58;
    public static readonly RULE_exportNsFromForm = 59;
    public static readonly RULE_exportTypeForm = 60;
    public static readonly RULE_exportTypeFromForm = 61;
    public static readonly RULE_exportTypeAllFromForm = 62;
    public static readonly RULE_exportDeclForm = 63;
    public static readonly RULE_starBinding = 64;
    public static readonly RULE_singleBinding = 65;
    public static readonly RULE_objectDestructPat = 66;
    public static readonly RULE_arrayDestructPat = 67;
    public static readonly RULE_typeExpr = 68;
    public static readonly RULE_typeUnion = 69;
    public static readonly RULE_typeIntersection = 70;
    public static readonly RULE_typeArray = 71;
    public static readonly RULE_typeTuple = 72;
    public static readonly RULE_typeTupleElement = 73;
    public static readonly RULE_typeFunction = 74;
    public static readonly RULE_typeFnParam = 75;
    public static readonly RULE_typeObject = 76;
    public static readonly RULE_typeProp = 77;
    public static readonly RULE_propModifier = 78;
    public static readonly RULE_typeLiteral = 79;
    public static readonly RULE_typeKeyof = 80;
    public static readonly RULE_typeTypeof = 81;
    public static readonly RULE_typeIndexAccess = 82;
    public static readonly RULE_typeConditional = 83;
    public static readonly RULE_typeInfer = 84;
    public static readonly RULE_typeMapped = 85;
    public static readonly RULE_mappedModifiers = 86;
    public static readonly RULE_mappedModifier = 87;
    public static readonly RULE_typeTemplateLiteral = 88;
    public static readonly RULE_templatePart = 89;
    public static readonly RULE_typeApplication = 90;
    public static readonly RULE_typeParams = 91;
    public static readonly RULE_typeParamDecl = 92;
    public static readonly RULE_typeParamConstraint = 93;
    public static readonly RULE_typeParamDefault = 94;
    public static readonly RULE_assign = 95;
    public static readonly RULE_compoundAssign = 96;
    public static readonly RULE_subscriptAssign = 97;
    public static readonly RULE_switchForm = 98;
    public static readonly RULE_caseClause = 99;
    public static readonly RULE_defaultClause = 100;
    public static readonly RULE_forForm = 101;
    public static readonly RULE_forInForm = 102;
    public static readonly RULE_forOfForm = 103;
    public static readonly RULE_forAwaitForm = 104;
    public static readonly RULE_exceptForm = 105;
    public static readonly RULE_tryClause = 106;
    public static readonly RULE_catchClause = 107;
    public static readonly RULE_finallyClause = 108;
    public static readonly RULE_expression = 109;
    public static readonly RULE_thisExpr = 110;
    public static readonly RULE_superExpr = 111;
    public static readonly RULE_superConstructorCall = 112;
    public static readonly RULE_superMethodCall = 113;
    public static readonly RULE_typeofExpr = 114;
    public static readonly RULE_typeAssert = 115;
    public static readonly RULE_lambda = 116;
    public static readonly RULE_fn = 117;
    public static readonly RULE_asyncLambda = 118;
    public static readonly RULE_asyncFn = 119;
    public static readonly RULE_generatorFn = 120;
    public static readonly RULE_asyncGeneratorFn = 121;
    public static readonly RULE_fnO = 122;
    public static readonly RULE_lambdaO = 123;
    public static readonly RULE_asyncFnO = 124;
    public static readonly RULE_asyncLambdaO = 125;
    public static readonly RULE_generatorFnO = 126;
    public static readonly RULE_asyncGeneratorFnO = 127;
    public static readonly RULE_methodO = 128;
    public static readonly RULE_abstractMethodO = 129;
    public static readonly RULE_constructorO = 130;
    public static readonly RULE_fnoSignature = 131;
    public static readonly RULE_fnoParam = 132;
    public static readonly RULE_fnoRestParam = 133;
    public static readonly RULE_awaitExpr = 134;
    public static readonly RULE_yieldExpr = 135;
    public static readonly RULE_yieldStarExpr = 136;
    public static readonly RULE_bindExpr = 137;
    public static readonly RULE_methodCallExpr = 138;
    public static readonly RULE_ternary = 139;
    public static readonly RULE_condExpr = 140;
    public static readonly RULE_condClause = 141;
    public static readonly RULE_condElseClause = 142;
    public static readonly RULE_newForm = 143;
    public static readonly RULE_objectExpr = 144;
    public static readonly RULE_objectField = 145;
    public static readonly RULE_methodDef = 146;
    public static readonly RULE_arrayExpr = 147;
    public static readonly RULE_bracketArrayExpr = 148;
    public static readonly RULE_braceObjectExpr = 149;
    public static readonly RULE_braceObjectField = 150;
    public static readonly RULE_templateExpr = 151;
    public static readonly RULE_propKey = 152;
    public static readonly RULE_opSymbol = 153;
    public static readonly RULE_propAccess = 154;
    public static readonly RULE_subscriptAccess = 155;
    public static readonly RULE_indexAccess = 156;
    public static readonly RULE_quasiquote = 157;
    public static readonly RULE_quasiForm = 158;
    public static readonly RULE_sForm = 159;
    public static readonly RULE_unquote = 160;
    public static readonly RULE_unquoteSplicing = 161;
    public static readonly RULE_tildeUnquote = 162;
    public static readonly RULE_tildeUnquoteSplice = 163;
    public static readonly RULE_optChain = 164;
    public static readonly RULE_optChainIndex = 165;
    public static readonly RULE_nullCoalesce = 166;
    public static readonly RULE_infixExpr = 167;
    public static readonly RULE_infixBody = 168;
    public static readonly RULE_infixAtom = 169;
    public static readonly RULE_infixArgs = 170;
    public static readonly RULE_infixUnaryOp = 171;
    public static readonly RULE_infixBinOp = 172;
    public static readonly RULE_macroExprCall = 173;
    public static readonly RULE_macroBodyCall = 174;
    public static readonly RULE_call = 175;
    public static readonly RULE_typeArgs = 176;
    public static readonly RULE_fnSignature = 177;
    public static readonly RULE_param = 178;
    public static readonly RULE_restParam = 179;
    public static readonly RULE_literal = 180;

    public static readonly literalNames = [
        null, null, "'('", "')'", "','", "'macro-import'", "'macro-export'", 
        "'macro-reexport'", "'program'", "'let'", "'var'", "'const*'", "'const'", 
        "'lambda-o'", "'lambda'", "'fn-o'", "'fn'", "'method-o'", "'method'", 
        "'bind'", "'method-call'", "'defmacro'", "'#[macro-time]'", "'macro-error'", 
        "'if'", "'while'", "'then'", "'return'", "'throw'", "'break'", "'continue'", 
        "'set!'", "'ternary'", "'cond'", "'object'", "'type-array'", "'array'", 
        "'subscript'", "'optchain-index'", "'.?'", "'.'", "'index'", "'??'", 
        "'quasi'", "'quote'", "'unquote-splicing'", "'unquote'", "'new'", 
        "'import'", "'switch'", "'case'", "'default'", "'for-in'", "'for-of'", 
        "'for-await'", "'try'", "'catch'", "'finally'", "'except'", "'as'", 
        "'for'", "'class-body'", "'super-method'", "'abstract-method-o'", 
        "'abstract-method'", "'class'", "'field'", "'constructor-o'", "'constructor'", 
        "'this'", "'super'", "'get'", "'set'", "'implements'", "'union'", 
        "'intersect'", "'tuple'", "'tfn'", "'tlit'", "'keyof'", "'typeof'", 
        "'type-as'", "'infer'", "'mapped'", "'type-template'", "'template'", 
        "'rest'", "'readonly'", "'type-params'", "'type-args'", "'type-app'", 
        "'extends'", "'returns'", "'type'", "'interface'", "'enum'", "'modifiers'", 
        "'?'", null, "'null'", "'undefined'", "':'", "'async-generator-fn-o'", 
        "'async-generator-fn'", "'async-lambda-o'", "'async-lambda'", "'async-fn-o'", 
        "'async-fn'", "'generator-fn-o'", "'generator-fn'", "'yield*'", 
        "'yield'", "'await'", "'^'", "'public'", "'private'", "'protected'", 
        "'static'", "'abstract'", "'override'", "'async'", "'generator'", 
        "'else'", "'['", "']'", "'==='", "'!=='", "'=='", "'!='", "'>='", 
        "'<='", "'=>'", "'=&'", "'+='", "'-='", "'*='", "'/='", "'%='", 
        "'='", "'{'", "'}'", "'#{'", "'**'", "'&&'", "'||'", "'+'", "'*'", 
        "'/'", "'%'", "'<'", "'>'", "'!'", "'&'", "'|'", "'export'", "'export-default'", 
        "'export-named'", "'export-ns-from'", "'export-from'", "'export-all-from'", 
        "'import-type'", "'export-type-all-from'", "'export-type-from'", 
        "'export-type'", null, null, null, null, "'-'", "'~@'", "'~'"
    ];

    public static readonly symbolicNames = [
        null, "COMMENT", "LPAREN", "RPAREN", "COMMA", "MACRO_IMPORT", "MACRO_EXPORT", 
        "MACRO_REEXPORT", "PROGRAM", "LET", "VAR", "CONSTSTAR", "CONST", 
        "LAMBDA_O", "LAMBDA", "FN_O", "FN", "METHOD_O", "METHOD", "BIND", 
        "METHOD_CALL", "DEFMACRO", "MACRO_TIME_ATTR", "MACRO_ERROR", "IF", 
        "WHILE", "THEN", "RETURN", "THROW", "BREAK", "CONTINUE", "SET", 
        "TERNARY", "COND", "OBJECT", "TYPE_ARRAY", "ARRAY", "SUBSCRIPT", 
        "OPTCHAIN_INDEX", "OPTCHAIN", "DOT", "INDEX", "NULLCOAL", "QUASI", 
        "QUOTE", "UNQUOTE_SPLICING", "UNQUOTE", "NEW", "IMPORT", "SWITCH", 
        "CASE", "DEFAULT", "FORIN", "FOROF", "FORAWAIT", "TRY", "CATCH", 
        "FINALLY", "EXCEPT", "AS", "FOR", "CLASS_BODY", "SUPER_METHOD", 
        "ABSTRACT_METHOD_O", "ABSTRACT_METHOD", "CLASS", "FIELD", "CONSTRUCTOR_O", 
        "CONSTRUCTOR", "THIS", "SUPER", "GET", "SETPROP", "IMPLEMENTS", 
        "UNION", "INTERSECT", "TUPLE", "TYPEFN", "LIT", "KEYOF", "TYPEOF", 
        "TYPE_AS", "INFER", "MAPPED", "TYPE_TEMPLATE", "TEMPLATE", "REST", 
        "READONLY", "TYPE_PARAMS", "TYPE_ARGS", "TYPE_APP", "EXTENDS", "RETURNS", 
        "TYPE", "INTERFACE", "ENUM", "MODIFIERS", "OPTIONAL", "BOOLEAN", 
        "NULL", "UNDEFINED", "COLON", "ASYNC_GENERATOR_FN_O", "ASYNC_GENERATOR_FN", 
        "ASYNC_LAMBDA_O", "ASYNC_LAMBDA", "ASYNC_FN_O", "ASYNC_FN", "GENERATOR_FN_O", 
        "GENERATOR_FN", "YIELD_STAR", "YIELD", "AWAIT", "CARET", "PUBLIC", 
        "PRIVATE", "PROTECTED", "STATIC", "ABSTRACT", "OVERRIDE", "ASYNC", 
        "GENERATOR", "ELSE", "LBRACK", "RBRACK", "STRICT_EQ", "STRICT_NEQ", 
        "EQ_OP", "NEQ_OP", "GTE_OP", "LTE_OP", "FAT_ARROW", "STMT_ARROW", 
        "PLUS_ASSIGN", "MINUS_ASSIGN", "TIMES_ASSIGN", "DIV_ASSIGN", "MOD_ASSIGN", 
        "EQUALS", "LBRACE", "RBRACE", "HASH_LBRACE", "STARSTAR", "AMPAMP", 
        "PIPEPIPE", "PLUS", "STAR", "SLASH", "PERCENT", "LT", "GT", "BANG", 
        "AMP", "PIPE", "EXPORT", "EXPORT_DEFAULT", "EXPORT_NAMED", "EXPORT_NS_FROM", 
        "EXPORT_FROM", "EXPORT_ALL_FROM", "IMPORT_TYPE", "EXPORT_TYPE_ALL_FROM", 
        "EXPORT_TYPE_FROM", "EXPORT_TYPE", "NUMBER", "STRING", "MULTILINE_STRING", 
        "NEG_NUMBER", "MINUS", "TILDE_AT", "TILDE", "IDENTIFIER", "WS"
    ];
    public static readonly ruleNames = [
        "program", "topLevel", "decl", "defmacro", "macroSignature", "macroTimeFnDef", 
        "macroImport", "macroExport", "macroExportSpec", "macroReexport", 
        "topLevelLet", "topLevelVar", "topLevelConst", "metaAnnotation", 
        "typeAlias", "interfaceDef", "interfaceExtends", "enumDef", "enumMember", 
        "classDef", "anonClassDef", "classExtends", "classImplements", "classBody", 
        "classElement", "modifier", "fieldDef", "constructorParam", "constructorSignature", 
        "constructorDef", "classMethodDef", "abstractMethodDef", "getterDef", 
        "setterDef", "methodKey", "statement", "letStmt", "varStmt", "constStar", 
        "constStmt", "ifForm", "thenBlock", "elseBlock", "whileForm", "returnForm", 
        "throwForm", "breakForm", "continueForm", "importForm", "importTypeForm", 
        "importTypeSpec", "importTypeName", "exportForm", "exportBinding", 
        "exportDefault", "exportNamed", "exportNamePair", "exportFrom", 
        "exportAllFrom", "exportNsFromForm", "exportTypeForm", "exportTypeFromForm", 
        "exportTypeAllFromForm", "exportDeclForm", "starBinding", "singleBinding", 
        "objectDestructPat", "arrayDestructPat", "typeExpr", "typeUnion", 
        "typeIntersection", "typeArray", "typeTuple", "typeTupleElement", 
        "typeFunction", "typeFnParam", "typeObject", "typeProp", "propModifier", 
        "typeLiteral", "typeKeyof", "typeTypeof", "typeIndexAccess", "typeConditional", 
        "typeInfer", "typeMapped", "mappedModifiers", "mappedModifier", 
        "typeTemplateLiteral", "templatePart", "typeApplication", "typeParams", 
        "typeParamDecl", "typeParamConstraint", "typeParamDefault", "assign", 
        "compoundAssign", "subscriptAssign", "switchForm", "caseClause", 
        "defaultClause", "forForm", "forInForm", "forOfForm", "forAwaitForm", 
        "exceptForm", "tryClause", "catchClause", "finallyClause", "expression", 
        "thisExpr", "superExpr", "superConstructorCall", "superMethodCall", 
        "typeofExpr", "typeAssert", "lambda", "fn", "asyncLambda", "asyncFn", 
        "generatorFn", "asyncGeneratorFn", "fnO", "lambdaO", "asyncFnO", 
        "asyncLambdaO", "generatorFnO", "asyncGeneratorFnO", "methodO", 
        "abstractMethodO", "constructorO", "fnoSignature", "fnoParam", "fnoRestParam", 
        "awaitExpr", "yieldExpr", "yieldStarExpr", "bindExpr", "methodCallExpr", 
        "ternary", "condExpr", "condClause", "condElseClause", "newForm", 
        "objectExpr", "objectField", "methodDef", "arrayExpr", "bracketArrayExpr", 
        "braceObjectExpr", "braceObjectField", "templateExpr", "propKey", 
        "opSymbol", "propAccess", "subscriptAccess", "indexAccess", "quasiquote", 
        "quasiForm", "sForm", "unquote", "unquoteSplicing", "tildeUnquote", 
        "tildeUnquoteSplice", "optChain", "optChainIndex", "nullCoalesce", 
        "infixExpr", "infixBody", "infixAtom", "infixArgs", "infixUnaryOp", 
        "infixBinOp", "macroExprCall", "macroBodyCall", "call", "typeArgs", 
        "fnSignature", "param", "restParam", "literal",
    ];

    public get grammarFileName(): string { return "Stage9.g4"; }
    public get literalNames(): (string | null)[] { return Stage9Parser.literalNames; }
    public get symbolicNames(): (string | null)[] { return Stage9Parser.symbolicNames; }
    public get ruleNames(): string[] { return Stage9Parser.ruleNames; }
    public get serializedATN(): number[] { return Stage9Parser._serializedATN; }

    protected createFailedPredicateException(predicate?: string, message?: string): antlr.FailedPredicateException {
        return new antlr.FailedPredicateException(this, predicate, message);
    }

    public constructor(input: antlr.TokenStream) {
        super(input);
        this.interpreter = new antlr.ParserATNSimulator(this, Stage9Parser._ATN, Stage9Parser.decisionsToDFA, new antlr.PredictionContextCache());
    }
    public program(): ProgramContext {
        let localContext = new ProgramContext(this.context, this.state);
        this.enterRule(localContext, 0, Stage9Parser.RULE_program);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 362;
            this.match(Stage9Parser.LPAREN);
            this.state = 363;
            this.match(Stage9Parser.PROGRAM);
            this.state = 367;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 98)) & ~0x1F) === 0 && ((1 << (_la - 98)) & 4194336775) !== 0) || ((((_la - 130)) & ~0x1F) === 0 && ((1 << (_la - 130)) & 16775937) !== 0) || ((((_la - 164)) & ~0x1F) === 0 && ((1 << (_la - 164)) & 251) !== 0)) {
                {
                {
                this.state = 364;
                this.topLevel();
                }
                }
                this.state = 369;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 370;
            this.match(Stage9Parser.RPAREN);
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
        this.enterRule(localContext, 2, Stage9Parser.RULE_topLevel);
        try {
            this.state = 388;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 1, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 372;
                this.defmacro();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 373;
                this.macroTimeFnDef();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 374;
                this.macroImport();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 375;
                this.macroExport();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 376;
                this.macroReexport();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 377;
                this.topLevelLet();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 378;
                this.topLevelVar();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 379;
                this.topLevelConst();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 380;
                this.fn();
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 381;
                this.fnO();
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 382;
                this.typeAlias();
                }
                break;
            case 12:
                this.enterOuterAlt(localContext, 12);
                {
                this.state = 383;
                this.interfaceDef();
                }
                break;
            case 13:
                this.enterOuterAlt(localContext, 13);
                {
                this.state = 384;
                this.enumDef();
                }
                break;
            case 14:
                this.enterOuterAlt(localContext, 14);
                {
                this.state = 385;
                this.classDef();
                }
                break;
            case 15:
                this.enterOuterAlt(localContext, 15);
                {
                this.state = 386;
                this.exportDeclForm();
                }
                break;
            case 16:
                this.enterOuterAlt(localContext, 16);
                {
                this.state = 387;
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
    public decl(): DeclContext {
        let localContext = new DeclContext(this.context, this.state);
        this.enterRule(localContext, 4, Stage9Parser.RULE_decl);
        try {
            this.state = 398;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 2, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 390;
                this.topLevelLet();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 391;
                this.topLevelVar();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 392;
                this.topLevelConst();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 393;
                this.fn();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 394;
                this.classDef();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 395;
                this.interfaceDef();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 396;
                this.enumDef();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 397;
                this.typeAlias();
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
        this.enterRule(localContext, 6, Stage9Parser.RULE_defmacro);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 400;
            this.match(Stage9Parser.LPAREN);
            this.state = 401;
            this.match(Stage9Parser.DEFMACRO);
            this.state = 402;
            this.match(Stage9Parser.IDENTIFIER);
            this.state = 403;
            this.macroSignature();
            this.state = 407;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 98)) & ~0x1F) === 0 && ((1 << (_la - 98)) & 4194336775) !== 0) || ((((_la - 130)) & ~0x1F) === 0 && ((1 << (_la - 130)) & 16775937) !== 0) || ((((_la - 164)) & ~0x1F) === 0 && ((1 << (_la - 164)) & 251) !== 0)) {
                {
                {
                this.state = 404;
                this.statement();
                }
                }
                this.state = 409;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 410;
            this.match(Stage9Parser.RPAREN);
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
    public macroSignature(): MacroSignatureContext {
        let localContext = new MacroSignatureContext(this.context, this.state);
        this.enterRule(localContext, 8, Stage9Parser.RULE_macroSignature);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 412;
            this.match(Stage9Parser.LPAREN);
            this.state = 423;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 6, this.context) ) {
            case 1:
                {
                this.state = 416;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 171) {
                    {
                    {
                    this.state = 413;
                    this.match(Stage9Parser.IDENTIFIER);
                    }
                    }
                    this.state = 418;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 421;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 86) {
                    {
                    this.state = 419;
                    this.match(Stage9Parser.REST);
                    this.state = 420;
                    this.match(Stage9Parser.IDENTIFIER);
                    }
                }

                }
                break;
            }
            this.state = 425;
            this.match(Stage9Parser.RPAREN);
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
    public macroTimeFnDef(): MacroTimeFnDefContext {
        let localContext = new MacroTimeFnDefContext(this.context, this.state);
        this.enterRule(localContext, 10, Stage9Parser.RULE_macroTimeFnDef);
        try {
            this.state = 437;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 7, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 427;
                this.match(Stage9Parser.LPAREN);
                this.state = 428;
                this.match(Stage9Parser.MACRO_TIME_ATTR);
                this.state = 429;
                this.topLevelLet();
                this.state = 430;
                this.match(Stage9Parser.RPAREN);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 432;
                this.match(Stage9Parser.LPAREN);
                this.state = 433;
                this.match(Stage9Parser.MACRO_TIME_ATTR);
                this.state = 434;
                this.topLevelConst();
                this.state = 435;
                this.match(Stage9Parser.RPAREN);
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
    public macroImport(): MacroImportContext {
        let localContext = new MacroImportContext(this.context, this.state);
        this.enterRule(localContext, 12, Stage9Parser.RULE_macroImport);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 439;
            this.match(Stage9Parser.LPAREN);
            this.state = 440;
            this.match(Stage9Parser.MACRO_IMPORT);
            this.state = 441;
            this.match(Stage9Parser.IDENTIFIER);
            this.state = 442;
            this.match(Stage9Parser.STRING);
            this.state = 443;
            this.match(Stage9Parser.RPAREN);
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
    public macroExport(): MacroExportContext {
        let localContext = new MacroExportContext(this.context, this.state);
        this.enterRule(localContext, 14, Stage9Parser.RULE_macroExport);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 445;
            this.match(Stage9Parser.LPAREN);
            this.state = 446;
            this.match(Stage9Parser.MACRO_EXPORT);
            this.state = 448;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 447;
                this.macroExportSpec();
                }
                }
                this.state = 450;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 171);
            this.state = 452;
            this.match(Stage9Parser.RPAREN);
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
    public macroExportSpec(): MacroExportSpecContext {
        let localContext = new MacroExportSpecContext(this.context, this.state);
        this.enterRule(localContext, 16, Stage9Parser.RULE_macroExportSpec);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 454;
            this.match(Stage9Parser.IDENTIFIER);
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
    public macroReexport(): MacroReexportContext {
        let localContext = new MacroReexportContext(this.context, this.state);
        this.enterRule(localContext, 18, Stage9Parser.RULE_macroReexport);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 456;
            this.match(Stage9Parser.LPAREN);
            this.state = 457;
            this.match(Stage9Parser.MACRO_REEXPORT);
            this.state = 458;
            this.match(Stage9Parser.IDENTIFIER);
            this.state = 462;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 171) {
                {
                {
                this.state = 459;
                this.match(Stage9Parser.IDENTIFIER);
                }
                }
                this.state = 464;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 465;
            this.match(Stage9Parser.RPAREN);
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
    public topLevelLet(): TopLevelLetContext {
        let localContext = new TopLevelLetContext(this.context, this.state);
        this.enterRule(localContext, 20, Stage9Parser.RULE_topLevelLet);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 467;
            this.match(Stage9Parser.LPAREN);
            this.state = 468;
            this.match(Stage9Parser.LET);
            this.state = 472;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 113) {
                {
                {
                this.state = 469;
                this.metaAnnotation();
                }
                }
                this.state = 474;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 475;
            this.match(Stage9Parser.LPAREN);
            this.state = 477;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 476;
                this.starBinding();
                }
                }
                this.state = 479;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2);
            this.state = 481;
            this.match(Stage9Parser.RPAREN);
            this.state = 482;
            this.match(Stage9Parser.RPAREN);
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
    public topLevelVar(): TopLevelVarContext {
        let localContext = new TopLevelVarContext(this.context, this.state);
        this.enterRule(localContext, 22, Stage9Parser.RULE_topLevelVar);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 484;
            this.match(Stage9Parser.LPAREN);
            this.state = 485;
            this.match(Stage9Parser.VAR);
            this.state = 489;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 113) {
                {
                {
                this.state = 486;
                this.metaAnnotation();
                }
                }
                this.state = 491;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 492;
            this.match(Stage9Parser.LPAREN);
            this.state = 494;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 493;
                this.starBinding();
                }
                }
                this.state = 496;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2);
            this.state = 498;
            this.match(Stage9Parser.RPAREN);
            this.state = 499;
            this.match(Stage9Parser.RPAREN);
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
    public topLevelConst(): TopLevelConstContext {
        let localContext = new TopLevelConstContext(this.context, this.state);
        this.enterRule(localContext, 24, Stage9Parser.RULE_topLevelConst);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 501;
            this.match(Stage9Parser.LPAREN);
            this.state = 502;
            this.match(Stage9Parser.CONST);
            this.state = 506;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 113) {
                {
                {
                this.state = 503;
                this.metaAnnotation();
                }
                }
                this.state = 508;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 509;
            this.match(Stage9Parser.IDENTIFIER);
            this.state = 510;
            this.expression();
            this.state = 511;
            this.match(Stage9Parser.RPAREN);
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
    public metaAnnotation(): MetaAnnotationContext {
        let localContext = new MetaAnnotationContext(this.context, this.state);
        this.enterRule(localContext, 26, Stage9Parser.RULE_metaAnnotation);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 513;
            this.match(Stage9Parser.CARET);
            this.state = 514;
            this.match(Stage9Parser.IDENTIFIER);
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
    public typeAlias(): TypeAliasContext {
        let localContext = new TypeAliasContext(this.context, this.state);
        this.enterRule(localContext, 28, Stage9Parser.RULE_typeAlias);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 516;
            this.match(Stage9Parser.LPAREN);
            this.state = 517;
            this.match(Stage9Parser.TYPE);
            this.state = 518;
            this.match(Stage9Parser.IDENTIFIER);
            this.state = 520;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 15, this.context) ) {
            case 1:
                {
                this.state = 519;
                this.typeParams();
                }
                break;
            }
            this.state = 522;
            this.typeExpr();
            this.state = 523;
            this.match(Stage9Parser.RPAREN);
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
    public interfaceDef(): InterfaceDefContext {
        let localContext = new InterfaceDefContext(this.context, this.state);
        this.enterRule(localContext, 30, Stage9Parser.RULE_interfaceDef);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 525;
            this.match(Stage9Parser.LPAREN);
            this.state = 526;
            this.match(Stage9Parser.INTERFACE);
            this.state = 527;
            this.match(Stage9Parser.IDENTIFIER);
            this.state = 529;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 16, this.context) ) {
            case 1:
                {
                this.state = 528;
                this.typeParams();
                }
                break;
            }
            this.state = 532;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 17, this.context) ) {
            case 1:
                {
                this.state = 531;
                this.interfaceExtends();
                }
                break;
            }
            this.state = 534;
            this.typeObject();
            this.state = 535;
            this.match(Stage9Parser.RPAREN);
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
    public interfaceExtends(): InterfaceExtendsContext {
        let localContext = new InterfaceExtendsContext(this.context, this.state);
        this.enterRule(localContext, 32, Stage9Parser.RULE_interfaceExtends);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 537;
            this.match(Stage9Parser.LPAREN);
            this.state = 538;
            this.match(Stage9Parser.EXTENDS);
            this.state = 540;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 539;
                this.typeExpr();
                }
                }
                this.state = 542;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 34 || _la === 99 || _la === 100 || _la === 139 || _la === 171);
            this.state = 544;
            this.match(Stage9Parser.RPAREN);
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
    public enumDef(): EnumDefContext {
        let localContext = new EnumDefContext(this.context, this.state);
        this.enterRule(localContext, 34, Stage9Parser.RULE_enumDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 546;
            this.match(Stage9Parser.LPAREN);
            this.state = 547;
            this.match(Stage9Parser.ENUM);
            this.state = 548;
            this.match(Stage9Parser.IDENTIFIER);
            this.state = 552;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 549;
                this.enumMember();
                }
                }
                this.state = 554;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 555;
            this.match(Stage9Parser.RPAREN);
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
    public enumMember(): EnumMemberContext {
        let localContext = new EnumMemberContext(this.context, this.state);
        this.enterRule(localContext, 36, Stage9Parser.RULE_enumMember);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 557;
            this.match(Stage9Parser.LPAREN);
            this.state = 558;
            this.match(Stage9Parser.IDENTIFIER);
            this.state = 560;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (((((_la - 164)) & ~0x1F) === 0 && ((1 << (_la - 164)) & 11) !== 0)) {
                {
                this.state = 559;
                _la = this.tokenStream.LA(1);
                if(!(((((_la - 164)) & ~0x1F) === 0 && ((1 << (_la - 164)) & 11) !== 0))) {
                this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                }
            }

            this.state = 562;
            this.match(Stage9Parser.RPAREN);
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
    public classDef(): ClassDefContext {
        let localContext = new ClassDefContext(this.context, this.state);
        this.enterRule(localContext, 38, Stage9Parser.RULE_classDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 564;
            this.match(Stage9Parser.LPAREN);
            this.state = 565;
            this.match(Stage9Parser.CLASS);
            this.state = 569;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (((((_la - 87)) & ~0x1F) === 0 && ((1 << (_la - 87)) & 4160749569) !== 0) || ((((_la - 119)) & ~0x1F) === 0 && ((1 << (_la - 119)) & 7) !== 0)) {
                {
                {
                this.state = 566;
                this.modifier();
                }
                }
                this.state = 571;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 572;
            this.match(Stage9Parser.IDENTIFIER);
            this.state = 574;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 22, this.context) ) {
            case 1:
                {
                this.state = 573;
                this.typeParams();
                }
                break;
            }
            this.state = 577;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 23, this.context) ) {
            case 1:
                {
                this.state = 576;
                this.classExtends();
                }
                break;
            }
            this.state = 580;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 24, this.context) ) {
            case 1:
                {
                this.state = 579;
                this.classImplements();
                }
                break;
            }
            this.state = 582;
            this.classBody();
            this.state = 583;
            this.match(Stage9Parser.RPAREN);
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
    public anonClassDef(): AnonClassDefContext {
        let localContext = new AnonClassDefContext(this.context, this.state);
        this.enterRule(localContext, 40, Stage9Parser.RULE_anonClassDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 585;
            this.match(Stage9Parser.LPAREN);
            this.state = 586;
            this.match(Stage9Parser.CLASS);
            this.state = 590;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (((((_la - 87)) & ~0x1F) === 0 && ((1 << (_la - 87)) & 4160749569) !== 0) || ((((_la - 119)) & ~0x1F) === 0 && ((1 << (_la - 119)) & 7) !== 0)) {
                {
                {
                this.state = 587;
                this.modifier();
                }
                }
                this.state = 592;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 594;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 26, this.context) ) {
            case 1:
                {
                this.state = 593;
                this.classExtends();
                }
                break;
            }
            this.state = 597;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 27, this.context) ) {
            case 1:
                {
                this.state = 596;
                this.classImplements();
                }
                break;
            }
            this.state = 599;
            this.classBody();
            this.state = 600;
            this.match(Stage9Parser.RPAREN);
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
    public classExtends(): ClassExtendsContext {
        let localContext = new ClassExtendsContext(this.context, this.state);
        this.enterRule(localContext, 42, Stage9Parser.RULE_classExtends);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 602;
            this.match(Stage9Parser.LPAREN);
            this.state = 603;
            this.match(Stage9Parser.EXTENDS);
            this.state = 604;
            this.typeExpr();
            this.state = 605;
            this.match(Stage9Parser.RPAREN);
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
    public classImplements(): ClassImplementsContext {
        let localContext = new ClassImplementsContext(this.context, this.state);
        this.enterRule(localContext, 44, Stage9Parser.RULE_classImplements);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 607;
            this.match(Stage9Parser.LPAREN);
            this.state = 608;
            this.match(Stage9Parser.IMPLEMENTS);
            this.state = 610;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 609;
                this.typeExpr();
                }
                }
                this.state = 612;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 34 || _la === 99 || _la === 100 || _la === 139 || _la === 171);
            this.state = 614;
            this.match(Stage9Parser.RPAREN);
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
    public classBody(): ClassBodyContext {
        let localContext = new ClassBodyContext(this.context, this.state);
        this.enterRule(localContext, 46, Stage9Parser.RULE_classBody);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 616;
            this.match(Stage9Parser.LPAREN);
            this.state = 617;
            this.match(Stage9Parser.CLASS_BODY);
            this.state = 621;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 618;
                this.classElement();
                }
                }
                this.state = 623;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 624;
            this.match(Stage9Parser.RPAREN);
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
    public classElement(): ClassElementContext {
        let localContext = new ClassElementContext(this.context, this.state);
        this.enterRule(localContext, 48, Stage9Parser.RULE_classElement);
        try {
            this.state = 635;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 30, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 626;
                this.fieldDef();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 627;
                this.constructorDef();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 628;
                this.classMethodDef();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 629;
                this.abstractMethodDef();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 630;
                this.getterDef();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 631;
                this.setterDef();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 632;
                this.methodO();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 633;
                this.abstractMethodO();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 634;
                this.constructorO();
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
    public modifier(): ModifierContext {
        let localContext = new ModifierContext(this.context, this.state);
        this.enterRule(localContext, 50, Stage9Parser.RULE_modifier);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 637;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 87)) & ~0x1F) === 0 && ((1 << (_la - 87)) & 4160749569) !== 0) || ((((_la - 119)) & ~0x1F) === 0 && ((1 << (_la - 119)) & 7) !== 0))) {
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
    public fieldDef(): FieldDefContext {
        let localContext = new FieldDefContext(this.context, this.state);
        this.enterRule(localContext, 52, Stage9Parser.RULE_fieldDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 639;
            this.match(Stage9Parser.LPAREN);
            this.state = 640;
            this.match(Stage9Parser.FIELD);
            this.state = 644;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (((((_la - 87)) & ~0x1F) === 0 && ((1 << (_la - 87)) & 4160749569) !== 0) || ((((_la - 119)) & ~0x1F) === 0 && ((1 << (_la - 119)) & 7) !== 0)) {
                {
                {
                this.state = 641;
                this.modifier();
                }
                }
                this.state = 646;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 647;
            this.match(Stage9Parser.LPAREN);
            this.state = 648;
            this.match(Stage9Parser.IDENTIFIER);
            this.state = 651;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 101) {
                {
                this.state = 649;
                this.match(Stage9Parser.COLON);
                this.state = 650;
                this.typeExpr();
                }
            }

            this.state = 653;
            this.match(Stage9Parser.RPAREN);
            this.state = 655;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 98)) & ~0x1F) === 0 && ((1 << (_la - 98)) & 4194336775) !== 0) || ((((_la - 130)) & ~0x1F) === 0 && ((1 << (_la - 130)) & 16775937) !== 0) || ((((_la - 164)) & ~0x1F) === 0 && ((1 << (_la - 164)) & 251) !== 0)) {
                {
                this.state = 654;
                this.expression();
                }
            }

            this.state = 657;
            this.match(Stage9Parser.RPAREN);
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
    public constructorParam(): ConstructorParamContext {
        let localContext = new ConstructorParamContext(this.context, this.state);
        this.enterRule(localContext, 54, Stage9Parser.RULE_constructorParam);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 659;
            this.match(Stage9Parser.LPAREN);
            this.state = 663;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (((((_la - 87)) & ~0x1F) === 0 && ((1 << (_la - 87)) & 4160749569) !== 0) || ((((_la - 119)) & ~0x1F) === 0 && ((1 << (_la - 119)) & 7) !== 0)) {
                {
                {
                this.state = 660;
                this.modifier();
                }
                }
                this.state = 665;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 666;
            this.match(Stage9Parser.IDENTIFIER);
            this.state = 668;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 97) {
                {
                this.state = 667;
                this.match(Stage9Parser.OPTIONAL);
                }
            }

            this.state = 672;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 101) {
                {
                this.state = 670;
                this.match(Stage9Parser.COLON);
                this.state = 671;
                this.typeExpr();
                }
            }

            this.state = 674;
            this.match(Stage9Parser.RPAREN);
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
    public constructorSignature(): ConstructorSignatureContext {
        let localContext = new ConstructorSignatureContext(this.context, this.state);
        this.enterRule(localContext, 56, Stage9Parser.RULE_constructorSignature);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 676;
            this.match(Stage9Parser.LPAREN);
            this.state = 687;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2) {
                {
                this.state = 677;
                this.constructorParam();
                this.state = 684;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 2 || _la === 4) {
                    {
                    {
                    this.state = 679;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    if (_la === 4) {
                        {
                        this.state = 678;
                        this.match(Stage9Parser.COMMA);
                        }
                    }

                    this.state = 681;
                    this.constructorParam();
                    }
                    }
                    this.state = 686;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
            }

            this.state = 689;
            this.match(Stage9Parser.RPAREN);
            this.state = 692;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 101) {
                {
                this.state = 690;
                this.match(Stage9Parser.COLON);
                this.state = 691;
                this.typeExpr();
                }
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
    public constructorDef(): ConstructorDefContext {
        let localContext = new ConstructorDefContext(this.context, this.state);
        this.enterRule(localContext, 58, Stage9Parser.RULE_constructorDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 694;
            this.match(Stage9Parser.LPAREN);
            this.state = 695;
            this.match(Stage9Parser.CONSTRUCTOR);
            this.state = 696;
            this.constructorSignature();
            this.state = 700;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 98)) & ~0x1F) === 0 && ((1 << (_la - 98)) & 4194336775) !== 0) || ((((_la - 130)) & ~0x1F) === 0 && ((1 << (_la - 130)) & 16775937) !== 0) || ((((_la - 164)) & ~0x1F) === 0 && ((1 << (_la - 164)) & 251) !== 0)) {
                {
                {
                this.state = 697;
                this.statement();
                }
                }
                this.state = 702;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 703;
            this.match(Stage9Parser.RPAREN);
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
    public classMethodDef(): ClassMethodDefContext {
        let localContext = new ClassMethodDefContext(this.context, this.state);
        this.enterRule(localContext, 60, Stage9Parser.RULE_classMethodDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 705;
            this.match(Stage9Parser.LPAREN);
            this.state = 706;
            this.match(Stage9Parser.METHOD);
            this.state = 710;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (((((_la - 87)) & ~0x1F) === 0 && ((1 << (_la - 87)) & 4160749569) !== 0) || ((((_la - 119)) & ~0x1F) === 0 && ((1 << (_la - 119)) & 7) !== 0)) {
                {
                {
                this.state = 707;
                this.modifier();
                }
                }
                this.state = 712;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 713;
            this.methodKey();
            this.state = 714;
            this.fnSignature();
            this.state = 718;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 98)) & ~0x1F) === 0 && ((1 << (_la - 98)) & 4194336775) !== 0) || ((((_la - 130)) & ~0x1F) === 0 && ((1 << (_la - 130)) & 16775937) !== 0) || ((((_la - 164)) & ~0x1F) === 0 && ((1 << (_la - 164)) & 251) !== 0)) {
                {
                {
                this.state = 715;
                this.statement();
                }
                }
                this.state = 720;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 721;
            this.match(Stage9Parser.RPAREN);
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
    public abstractMethodDef(): AbstractMethodDefContext {
        let localContext = new AbstractMethodDefContext(this.context, this.state);
        this.enterRule(localContext, 62, Stage9Parser.RULE_abstractMethodDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 723;
            this.match(Stage9Parser.LPAREN);
            this.state = 724;
            this.match(Stage9Parser.ABSTRACT_METHOD);
            this.state = 728;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (((((_la - 87)) & ~0x1F) === 0 && ((1 << (_la - 87)) & 4160749569) !== 0) || ((((_la - 119)) & ~0x1F) === 0 && ((1 << (_la - 119)) & 7) !== 0)) {
                {
                {
                this.state = 725;
                this.modifier();
                }
                }
                this.state = 730;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 731;
            this.methodKey();
            this.state = 732;
            this.fnSignature();
            this.state = 733;
            this.match(Stage9Parser.RPAREN);
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
    public getterDef(): GetterDefContext {
        let localContext = new GetterDefContext(this.context, this.state);
        this.enterRule(localContext, 64, Stage9Parser.RULE_getterDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 735;
            this.match(Stage9Parser.LPAREN);
            this.state = 736;
            this.match(Stage9Parser.GET);
            this.state = 740;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (((((_la - 87)) & ~0x1F) === 0 && ((1 << (_la - 87)) & 4160749569) !== 0) || ((((_la - 119)) & ~0x1F) === 0 && ((1 << (_la - 119)) & 7) !== 0)) {
                {
                {
                this.state = 737;
                this.modifier();
                }
                }
                this.state = 742;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 743;
            this.methodKey();
            this.state = 744;
            this.fnSignature();
            this.state = 748;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 98)) & ~0x1F) === 0 && ((1 << (_la - 98)) & 4194336775) !== 0) || ((((_la - 130)) & ~0x1F) === 0 && ((1 << (_la - 130)) & 16775937) !== 0) || ((((_la - 164)) & ~0x1F) === 0 && ((1 << (_la - 164)) & 251) !== 0)) {
                {
                {
                this.state = 745;
                this.statement();
                }
                }
                this.state = 750;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 751;
            this.match(Stage9Parser.RPAREN);
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
    public setterDef(): SetterDefContext {
        let localContext = new SetterDefContext(this.context, this.state);
        this.enterRule(localContext, 66, Stage9Parser.RULE_setterDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 753;
            this.match(Stage9Parser.LPAREN);
            this.state = 754;
            this.match(Stage9Parser.SETPROP);
            this.state = 758;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (((((_la - 87)) & ~0x1F) === 0 && ((1 << (_la - 87)) & 4160749569) !== 0) || ((((_la - 119)) & ~0x1F) === 0 && ((1 << (_la - 119)) & 7) !== 0)) {
                {
                {
                this.state = 755;
                this.modifier();
                }
                }
                this.state = 760;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 761;
            this.methodKey();
            this.state = 762;
            this.fnSignature();
            this.state = 766;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 98)) & ~0x1F) === 0 && ((1 << (_la - 98)) & 4194336775) !== 0) || ((((_la - 130)) & ~0x1F) === 0 && ((1 << (_la - 130)) & 16775937) !== 0) || ((((_la - 164)) & ~0x1F) === 0 && ((1 << (_la - 164)) & 251) !== 0)) {
                {
                {
                this.state = 763;
                this.statement();
                }
                }
                this.state = 768;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 769;
            this.match(Stage9Parser.RPAREN);
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
    public methodKey(): MethodKeyContext {
        let localContext = new MethodKeyContext(this.context, this.state);
        this.enterRule(localContext, 68, Stage9Parser.RULE_methodKey);
        try {
            this.state = 778;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case Stage9Parser.IDENTIFIER:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 771;
                this.match(Stage9Parser.IDENTIFIER);
                }
                break;
            case Stage9Parser.GET:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 772;
                this.match(Stage9Parser.GET);
                }
                break;
            case Stage9Parser.SETPROP:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 773;
                this.match(Stage9Parser.SETPROP);
                }
                break;
            case Stage9Parser.LBRACK:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 774;
                this.match(Stage9Parser.LBRACK);
                this.state = 775;
                this.expression();
                this.state = 776;
                this.match(Stage9Parser.RBRACK);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
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
        this.enterRule(localContext, 70, Stage9Parser.RULE_statement);
        try {
            this.state = 804;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 50, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 780;
                this.letStmt();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 781;
                this.varStmt();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 782;
                this.constStar();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 783;
                this.constStmt();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 784;
                this.ifForm();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 785;
                this.whileForm();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 786;
                this.exceptForm();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 787;
                this.returnForm();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 788;
                this.throwForm();
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 789;
                this.breakForm();
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 790;
                this.continueForm();
                }
                break;
            case 12:
                this.enterOuterAlt(localContext, 12);
                {
                this.state = 791;
                this.importForm();
                }
                break;
            case 13:
                this.enterOuterAlt(localContext, 13);
                {
                this.state = 792;
                this.importTypeForm();
                }
                break;
            case 14:
                this.enterOuterAlt(localContext, 14);
                {
                this.state = 793;
                this.exportForm();
                }
                break;
            case 15:
                this.enterOuterAlt(localContext, 15);
                {
                this.state = 794;
                this.switchForm();
                }
                break;
            case 16:
                this.enterOuterAlt(localContext, 16);
                {
                this.state = 795;
                this.forForm();
                }
                break;
            case 17:
                this.enterOuterAlt(localContext, 17);
                {
                this.state = 796;
                this.forInForm();
                }
                break;
            case 18:
                this.enterOuterAlt(localContext, 18);
                {
                this.state = 797;
                this.forOfForm();
                }
                break;
            case 19:
                this.enterOuterAlt(localContext, 19);
                {
                this.state = 798;
                this.forAwaitForm();
                }
                break;
            case 20:
                this.enterOuterAlt(localContext, 20);
                {
                this.state = 799;
                this.assign();
                }
                break;
            case 21:
                this.enterOuterAlt(localContext, 21);
                {
                this.state = 800;
                this.compoundAssign();
                }
                break;
            case 22:
                this.enterOuterAlt(localContext, 22);
                {
                this.state = 801;
                this.subscriptAssign();
                }
                break;
            case 23:
                this.enterOuterAlt(localContext, 23);
                {
                this.state = 802;
                this.macroBodyCall();
                }
                break;
            case 24:
                this.enterOuterAlt(localContext, 24);
                {
                this.state = 803;
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
    public letStmt(): LetStmtContext {
        let localContext = new LetStmtContext(this.context, this.state);
        this.enterRule(localContext, 72, Stage9Parser.RULE_letStmt);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 806;
            this.match(Stage9Parser.LPAREN);
            this.state = 807;
            this.match(Stage9Parser.LET);
            this.state = 808;
            this.match(Stage9Parser.LPAREN);
            this.state = 810;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 809;
                this.starBinding();
                }
                }
                this.state = 812;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2);
            this.state = 814;
            this.match(Stage9Parser.RPAREN);
            this.state = 818;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 98)) & ~0x1F) === 0 && ((1 << (_la - 98)) & 4194336775) !== 0) || ((((_la - 130)) & ~0x1F) === 0 && ((1 << (_la - 130)) & 16775937) !== 0) || ((((_la - 164)) & ~0x1F) === 0 && ((1 << (_la - 164)) & 251) !== 0)) {
                {
                {
                this.state = 815;
                this.statement();
                }
                }
                this.state = 820;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 821;
            this.match(Stage9Parser.RPAREN);
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
    public varStmt(): VarStmtContext {
        let localContext = new VarStmtContext(this.context, this.state);
        this.enterRule(localContext, 74, Stage9Parser.RULE_varStmt);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 823;
            this.match(Stage9Parser.LPAREN);
            this.state = 824;
            this.match(Stage9Parser.VAR);
            this.state = 825;
            this.match(Stage9Parser.LPAREN);
            this.state = 827;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 826;
                this.starBinding();
                }
                }
                this.state = 829;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2);
            this.state = 831;
            this.match(Stage9Parser.RPAREN);
            this.state = 835;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 98)) & ~0x1F) === 0 && ((1 << (_la - 98)) & 4194336775) !== 0) || ((((_la - 130)) & ~0x1F) === 0 && ((1 << (_la - 130)) & 16775937) !== 0) || ((((_la - 164)) & ~0x1F) === 0 && ((1 << (_la - 164)) & 251) !== 0)) {
                {
                {
                this.state = 832;
                this.statement();
                }
                }
                this.state = 837;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 838;
            this.match(Stage9Parser.RPAREN);
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
    public constStar(): ConstStarContext {
        let localContext = new ConstStarContext(this.context, this.state);
        this.enterRule(localContext, 76, Stage9Parser.RULE_constStar);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 840;
            this.match(Stage9Parser.LPAREN);
            this.state = 841;
            this.match(Stage9Parser.CONSTSTAR);
            this.state = 842;
            this.match(Stage9Parser.LPAREN);
            this.state = 846;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 843;
                this.starBinding();
                }
                }
                this.state = 848;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 849;
            this.match(Stage9Parser.RPAREN);
            this.state = 853;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 98)) & ~0x1F) === 0 && ((1 << (_la - 98)) & 4194336775) !== 0) || ((((_la - 130)) & ~0x1F) === 0 && ((1 << (_la - 130)) & 16775937) !== 0) || ((((_la - 164)) & ~0x1F) === 0 && ((1 << (_la - 164)) & 251) !== 0)) {
                {
                {
                this.state = 850;
                this.statement();
                }
                }
                this.state = 855;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 856;
            this.match(Stage9Parser.RPAREN);
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
    public constStmt(): ConstStmtContext {
        let localContext = new ConstStmtContext(this.context, this.state);
        this.enterRule(localContext, 78, Stage9Parser.RULE_constStmt);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 858;
            this.match(Stage9Parser.LPAREN);
            this.state = 859;
            this.match(Stage9Parser.CONST);
            this.state = 860;
            this.singleBinding();
            this.state = 861;
            this.expression();
            this.state = 862;
            this.match(Stage9Parser.RPAREN);
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
        this.enterRule(localContext, 80, Stage9Parser.RULE_ifForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 864;
            this.match(Stage9Parser.LPAREN);
            this.state = 865;
            this.match(Stage9Parser.IF);
            this.state = 866;
            this.expression();
            this.state = 867;
            this.thenBlock();
            this.state = 869;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2) {
                {
                this.state = 868;
                this.elseBlock();
                }
            }

            this.state = 871;
            this.match(Stage9Parser.RPAREN);
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
    public thenBlock(): ThenBlockContext {
        let localContext = new ThenBlockContext(this.context, this.state);
        this.enterRule(localContext, 82, Stage9Parser.RULE_thenBlock);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 873;
            this.match(Stage9Parser.LPAREN);
            this.state = 874;
            this.match(Stage9Parser.THEN);
            this.state = 878;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 98)) & ~0x1F) === 0 && ((1 << (_la - 98)) & 4194336775) !== 0) || ((((_la - 130)) & ~0x1F) === 0 && ((1 << (_la - 130)) & 16775937) !== 0) || ((((_la - 164)) & ~0x1F) === 0 && ((1 << (_la - 164)) & 251) !== 0)) {
                {
                {
                this.state = 875;
                this.statement();
                }
                }
                this.state = 880;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 881;
            this.match(Stage9Parser.RPAREN);
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
    public elseBlock(): ElseBlockContext {
        let localContext = new ElseBlockContext(this.context, this.state);
        this.enterRule(localContext, 84, Stage9Parser.RULE_elseBlock);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 883;
            this.match(Stage9Parser.LPAREN);
            this.state = 884;
            this.match(Stage9Parser.ELSE);
            this.state = 888;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 98)) & ~0x1F) === 0 && ((1 << (_la - 98)) & 4194336775) !== 0) || ((((_la - 130)) & ~0x1F) === 0 && ((1 << (_la - 130)) & 16775937) !== 0) || ((((_la - 164)) & ~0x1F) === 0 && ((1 << (_la - 164)) & 251) !== 0)) {
                {
                {
                this.state = 885;
                this.statement();
                }
                }
                this.state = 890;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 891;
            this.match(Stage9Parser.RPAREN);
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
        this.enterRule(localContext, 86, Stage9Parser.RULE_whileForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 893;
            this.match(Stage9Parser.LPAREN);
            this.state = 894;
            this.match(Stage9Parser.WHILE);
            this.state = 895;
            this.expression();
            this.state = 899;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 98)) & ~0x1F) === 0 && ((1 << (_la - 98)) & 4194336775) !== 0) || ((((_la - 130)) & ~0x1F) === 0 && ((1 << (_la - 130)) & 16775937) !== 0) || ((((_la - 164)) & ~0x1F) === 0 && ((1 << (_la - 164)) & 251) !== 0)) {
                {
                {
                this.state = 896;
                this.statement();
                }
                }
                this.state = 901;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 902;
            this.match(Stage9Parser.RPAREN);
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
        this.enterRule(localContext, 88, Stage9Parser.RULE_returnForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 904;
            this.match(Stage9Parser.LPAREN);
            this.state = 905;
            this.match(Stage9Parser.RETURN);
            this.state = 907;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 98)) & ~0x1F) === 0 && ((1 << (_la - 98)) & 4194336775) !== 0) || ((((_la - 130)) & ~0x1F) === 0 && ((1 << (_la - 130)) & 16775937) !== 0) || ((((_la - 164)) & ~0x1F) === 0 && ((1 << (_la - 164)) & 251) !== 0)) {
                {
                this.state = 906;
                this.expression();
                }
            }

            this.state = 909;
            this.match(Stage9Parser.RPAREN);
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
        this.enterRule(localContext, 90, Stage9Parser.RULE_throwForm);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 911;
            this.match(Stage9Parser.LPAREN);
            this.state = 912;
            this.match(Stage9Parser.THROW);
            this.state = 913;
            this.expression();
            this.state = 914;
            this.match(Stage9Parser.RPAREN);
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
    public breakForm(): BreakFormContext {
        let localContext = new BreakFormContext(this.context, this.state);
        this.enterRule(localContext, 92, Stage9Parser.RULE_breakForm);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 916;
            this.match(Stage9Parser.LPAREN);
            this.state = 917;
            this.match(Stage9Parser.BREAK);
            this.state = 918;
            this.match(Stage9Parser.RPAREN);
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
    public continueForm(): ContinueFormContext {
        let localContext = new ContinueFormContext(this.context, this.state);
        this.enterRule(localContext, 94, Stage9Parser.RULE_continueForm);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 920;
            this.match(Stage9Parser.LPAREN);
            this.state = 921;
            this.match(Stage9Parser.CONTINUE);
            this.state = 922;
            this.match(Stage9Parser.RPAREN);
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
        this.enterRule(localContext, 96, Stage9Parser.RULE_importForm);
        let _la: number;
        try {
            this.state = 956;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 63, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 924;
                this.match(Stage9Parser.LPAREN);
                this.state = 925;
                this.match(Stage9Parser.IMPORT);
                this.state = 927;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 2) {
                    {
                    this.state = 926;
                    this.objectExpr();
                    }
                }

                this.state = 929;
                this.match(Stage9Parser.STRING);
                this.state = 930;
                this.match(Stage9Parser.RPAREN);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 931;
                this.match(Stage9Parser.LPAREN);
                this.state = 932;
                this.match(Stage9Parser.IMPORT);
                this.state = 933;
                this.objectDestructPat();
                this.state = 934;
                this.match(Stage9Parser.STRING);
                this.state = 935;
                this.match(Stage9Parser.RPAREN);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 937;
                this.match(Stage9Parser.LPAREN);
                this.state = 938;
                this.match(Stage9Parser.IMPORT);
                this.state = 939;
                this.match(Stage9Parser.IDENTIFIER);
                this.state = 940;
                this.match(Stage9Parser.STRING);
                this.state = 941;
                this.match(Stage9Parser.RPAREN);
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 942;
                this.match(Stage9Parser.LPAREN);
                this.state = 943;
                this.match(Stage9Parser.IMPORT);
                this.state = 944;
                this.match(Stage9Parser.IDENTIFIER);
                this.state = 945;
                this.objectDestructPat();
                this.state = 946;
                this.match(Stage9Parser.STRING);
                this.state = 947;
                this.match(Stage9Parser.RPAREN);
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 949;
                this.match(Stage9Parser.LPAREN);
                this.state = 950;
                this.match(Stage9Parser.IMPORT);
                this.state = 951;
                this.match(Stage9Parser.STAR);
                this.state = 952;
                this.match(Stage9Parser.AS);
                this.state = 953;
                this.match(Stage9Parser.IDENTIFIER);
                this.state = 954;
                this.match(Stage9Parser.STRING);
                this.state = 955;
                this.match(Stage9Parser.RPAREN);
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
    public importTypeForm(): ImportTypeFormContext {
        let localContext = new ImportTypeFormContext(this.context, this.state);
        this.enterRule(localContext, 98, Stage9Parser.RULE_importTypeForm);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 958;
            this.match(Stage9Parser.LPAREN);
            this.state = 959;
            this.match(Stage9Parser.IMPORT_TYPE);
            this.state = 960;
            this.importTypeSpec();
            this.state = 961;
            this.match(Stage9Parser.STRING);
            this.state = 962;
            this.match(Stage9Parser.RPAREN);
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
    public importTypeSpec(): ImportTypeSpecContext {
        let localContext = new ImportTypeSpecContext(this.context, this.state);
        this.enterRule(localContext, 100, Stage9Parser.RULE_importTypeSpec);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 964;
            this.match(Stage9Parser.LPAREN);
            this.state = 965;
            this.match(Stage9Parser.IDENTIFIER);
            this.state = 967;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 966;
                this.importTypeName();
                }
                }
                this.state = 969;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 171);
            this.state = 971;
            this.match(Stage9Parser.RPAREN);
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
    public importTypeName(): ImportTypeNameContext {
        let localContext = new ImportTypeNameContext(this.context, this.state);
        this.enterRule(localContext, 102, Stage9Parser.RULE_importTypeName);
        try {
            this.state = 978;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case Stage9Parser.IDENTIFIER:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 973;
                this.match(Stage9Parser.IDENTIFIER);
                }
                break;
            case Stage9Parser.LPAREN:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 974;
                this.match(Stage9Parser.LPAREN);
                this.state = 975;
                this.match(Stage9Parser.IDENTIFIER);
                this.state = 976;
                this.match(Stage9Parser.IDENTIFIER);
                this.state = 977;
                this.match(Stage9Parser.RPAREN);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
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
    public exportForm(): ExportFormContext {
        let localContext = new ExportFormContext(this.context, this.state);
        this.enterRule(localContext, 104, Stage9Parser.RULE_exportForm);
        try {
            this.state = 989;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 66, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 980;
                this.exportBinding();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 981;
                this.exportDefault();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 982;
                this.exportNamed();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 983;
                this.exportNsFromForm();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 984;
                this.exportFrom();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 985;
                this.exportAllFrom();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 986;
                this.exportTypeForm();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 987;
                this.exportTypeFromForm();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 988;
                this.exportTypeAllFromForm();
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
    public exportBinding(): ExportBindingContext {
        let localContext = new ExportBindingContext(this.context, this.state);
        this.enterRule(localContext, 106, Stage9Parser.RULE_exportBinding);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 991;
            this.match(Stage9Parser.LPAREN);
            this.state = 992;
            this.match(Stage9Parser.EXPORT);
            this.state = 993;
            this.match(Stage9Parser.IDENTIFIER);
            this.state = 994;
            this.expression();
            this.state = 995;
            this.match(Stage9Parser.RPAREN);
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
    public exportDefault(): ExportDefaultContext {
        let localContext = new ExportDefaultContext(this.context, this.state);
        this.enterRule(localContext, 108, Stage9Parser.RULE_exportDefault);
        try {
            this.state = 1022;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 67, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 997;
                this.match(Stage9Parser.LPAREN);
                this.state = 998;
                this.match(Stage9Parser.EXPORT_DEFAULT);
                this.state = 999;
                this.classDef();
                this.state = 1000;
                this.match(Stage9Parser.RPAREN);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1002;
                this.match(Stage9Parser.LPAREN);
                this.state = 1003;
                this.match(Stage9Parser.EXPORT_DEFAULT);
                this.state = 1004;
                this.anonClassDef();
                this.state = 1005;
                this.match(Stage9Parser.RPAREN);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 1007;
                this.match(Stage9Parser.LPAREN);
                this.state = 1008;
                this.match(Stage9Parser.EXPORT_DEFAULT);
                this.state = 1009;
                this.topLevelLet();
                this.state = 1010;
                this.match(Stage9Parser.RPAREN);
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 1012;
                this.match(Stage9Parser.LPAREN);
                this.state = 1013;
                this.match(Stage9Parser.EXPORT_DEFAULT);
                this.state = 1014;
                this.topLevelConst();
                this.state = 1015;
                this.match(Stage9Parser.RPAREN);
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 1017;
                this.match(Stage9Parser.LPAREN);
                this.state = 1018;
                this.match(Stage9Parser.EXPORT_DEFAULT);
                this.state = 1019;
                this.expression();
                this.state = 1020;
                this.match(Stage9Parser.RPAREN);
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
    public exportNamed(): ExportNamedContext {
        let localContext = new ExportNamedContext(this.context, this.state);
        this.enterRule(localContext, 110, Stage9Parser.RULE_exportNamed);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1024;
            this.match(Stage9Parser.LPAREN);
            this.state = 1025;
            this.match(Stage9Parser.EXPORT_NAMED);
            this.state = 1027;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 1026;
                this.exportNamePair();
                }
                }
                this.state = 1029;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2);
            this.state = 1031;
            this.match(Stage9Parser.RPAREN);
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
    public exportNamePair(): ExportNamePairContext {
        let localContext = new ExportNamePairContext(this.context, this.state);
        this.enterRule(localContext, 112, Stage9Parser.RULE_exportNamePair);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1033;
            this.match(Stage9Parser.LPAREN);
            this.state = 1034;
            this.match(Stage9Parser.IDENTIFIER);
            this.state = 1036;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 171) {
                {
                this.state = 1035;
                this.match(Stage9Parser.IDENTIFIER);
                }
            }

            this.state = 1038;
            this.match(Stage9Parser.RPAREN);
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
    public exportFrom(): ExportFromContext {
        let localContext = new ExportFromContext(this.context, this.state);
        this.enterRule(localContext, 114, Stage9Parser.RULE_exportFrom);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1040;
            this.match(Stage9Parser.LPAREN);
            this.state = 1041;
            this.match(Stage9Parser.EXPORT_FROM);
            this.state = 1042;
            this.match(Stage9Parser.STRING);
            this.state = 1044;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 1043;
                this.exportNamePair();
                }
                }
                this.state = 1046;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2);
            this.state = 1048;
            this.match(Stage9Parser.RPAREN);
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
    public exportAllFrom(): ExportAllFromContext {
        let localContext = new ExportAllFromContext(this.context, this.state);
        this.enterRule(localContext, 116, Stage9Parser.RULE_exportAllFrom);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1050;
            this.match(Stage9Parser.LPAREN);
            this.state = 1051;
            this.match(Stage9Parser.EXPORT_ALL_FROM);
            this.state = 1052;
            this.match(Stage9Parser.STRING);
            this.state = 1053;
            this.match(Stage9Parser.RPAREN);
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
    public exportNsFromForm(): ExportNsFromFormContext {
        let localContext = new ExportNsFromFormContext(this.context, this.state);
        this.enterRule(localContext, 118, Stage9Parser.RULE_exportNsFromForm);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1055;
            this.match(Stage9Parser.LPAREN);
            this.state = 1056;
            this.match(Stage9Parser.EXPORT_NS_FROM);
            this.state = 1057;
            this.match(Stage9Parser.STRING);
            this.state = 1058;
            this.match(Stage9Parser.STRING);
            this.state = 1059;
            this.match(Stage9Parser.RPAREN);
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
    public exportTypeForm(): ExportTypeFormContext {
        let localContext = new ExportTypeFormContext(this.context, this.state);
        this.enterRule(localContext, 120, Stage9Parser.RULE_exportTypeForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1061;
            this.match(Stage9Parser.LPAREN);
            this.state = 1062;
            this.match(Stage9Parser.EXPORT_TYPE);
            this.state = 1064;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 1063;
                this.exportNamePair();
                }
                }
                this.state = 1066;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2);
            this.state = 1068;
            this.match(Stage9Parser.RPAREN);
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
    public exportTypeFromForm(): ExportTypeFromFormContext {
        let localContext = new ExportTypeFromFormContext(this.context, this.state);
        this.enterRule(localContext, 122, Stage9Parser.RULE_exportTypeFromForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1070;
            this.match(Stage9Parser.LPAREN);
            this.state = 1071;
            this.match(Stage9Parser.EXPORT_TYPE_FROM);
            this.state = 1072;
            this.match(Stage9Parser.STRING);
            this.state = 1074;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 1073;
                this.exportNamePair();
                }
                }
                this.state = 1076;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2);
            this.state = 1078;
            this.match(Stage9Parser.RPAREN);
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
    public exportTypeAllFromForm(): ExportTypeAllFromFormContext {
        let localContext = new ExportTypeAllFromFormContext(this.context, this.state);
        this.enterRule(localContext, 124, Stage9Parser.RULE_exportTypeAllFromForm);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1080;
            this.match(Stage9Parser.LPAREN);
            this.state = 1081;
            this.match(Stage9Parser.EXPORT_TYPE_ALL_FROM);
            this.state = 1082;
            this.match(Stage9Parser.STRING);
            this.state = 1083;
            this.match(Stage9Parser.RPAREN);
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
    public exportDeclForm(): ExportDeclFormContext {
        let localContext = new ExportDeclFormContext(this.context, this.state);
        this.enterRule(localContext, 126, Stage9Parser.RULE_exportDeclForm);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1085;
            this.match(Stage9Parser.LPAREN);
            this.state = 1086;
            this.match(Stage9Parser.EXPORT);
            this.state = 1087;
            this.decl();
            this.state = 1088;
            this.match(Stage9Parser.RPAREN);
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
    public starBinding(): StarBindingContext {
        let localContext = new StarBindingContext(this.context, this.state);
        this.enterRule(localContext, 128, Stage9Parser.RULE_starBinding);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1090;
            this.match(Stage9Parser.LPAREN);
            this.state = 1091;
            this.match(Stage9Parser.IDENTIFIER);
            this.state = 1094;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 101) {
                {
                this.state = 1092;
                this.match(Stage9Parser.COLON);
                this.state = 1093;
                this.typeExpr();
                }
            }

            this.state = 1096;
            this.expression();
            this.state = 1097;
            this.match(Stage9Parser.RPAREN);
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
    public singleBinding(): SingleBindingContext {
        let localContext = new SingleBindingContext(this.context, this.state);
        this.enterRule(localContext, 130, Stage9Parser.RULE_singleBinding);
        let _la: number;
        try {
            this.state = 1108;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case Stage9Parser.LPAREN:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1099;
                this.match(Stage9Parser.LPAREN);
                this.state = 1100;
                this.match(Stage9Parser.IDENTIFIER);
                this.state = 1103;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 101) {
                    {
                    this.state = 1101;
                    this.match(Stage9Parser.COLON);
                    this.state = 1102;
                    this.typeExpr();
                    }
                }

                this.state = 1105;
                this.match(Stage9Parser.RPAREN);
                }
                break;
            case Stage9Parser.LBRACE:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1106;
                this.objectDestructPat();
                }
                break;
            case Stage9Parser.LBRACK:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 1107;
                this.arrayDestructPat();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
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
    public objectDestructPat(): ObjectDestructPatContext {
        let localContext = new ObjectDestructPatContext(this.context, this.state);
        this.enterRule(localContext, 132, Stage9Parser.RULE_objectDestructPat);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1110;
            this.match(Stage9Parser.LBRACE);
            this.state = 1114;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 171) {
                {
                {
                this.state = 1111;
                this.match(Stage9Parser.IDENTIFIER);
                }
                }
                this.state = 1116;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1117;
            this.match(Stage9Parser.RBRACE);
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
    public arrayDestructPat(): ArrayDestructPatContext {
        let localContext = new ArrayDestructPatContext(this.context, this.state);
        this.enterRule(localContext, 134, Stage9Parser.RULE_arrayDestructPat);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1119;
            this.match(Stage9Parser.LBRACK);
            this.state = 1123;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 171) {
                {
                {
                this.state = 1120;
                this.match(Stage9Parser.IDENTIFIER);
                }
                }
                this.state = 1125;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1126;
            this.match(Stage9Parser.RBRACK);
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
    public typeExpr(): TypeExprContext {
        let localContext = new TypeExprContext(this.context, this.state);
        this.enterRule(localContext, 136, Stage9Parser.RULE_typeExpr);
        try {
            this.state = 1149;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 78, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1128;
                this.match(Stage9Parser.IDENTIFIER);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1129;
                this.match(Stage9Parser.NULL);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 1130;
                this.match(Stage9Parser.UNDEFINED);
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 1131;
                this.match(Stage9Parser.OBJECT);
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 1132;
                this.match(Stage9Parser.LBRACE);
                this.state = 1133;
                this.match(Stage9Parser.RBRACE);
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 1134;
                this.typeUnion();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 1135;
                this.typeIntersection();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 1136;
                this.typeArray();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 1137;
                this.typeTuple();
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 1138;
                this.typeFunction();
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 1139;
                this.typeObject();
                }
                break;
            case 12:
                this.enterOuterAlt(localContext, 12);
                {
                this.state = 1140;
                this.typeLiteral();
                }
                break;
            case 13:
                this.enterOuterAlt(localContext, 13);
                {
                this.state = 1141;
                this.typeKeyof();
                }
                break;
            case 14:
                this.enterOuterAlt(localContext, 14);
                {
                this.state = 1142;
                this.typeTypeof();
                }
                break;
            case 15:
                this.enterOuterAlt(localContext, 15);
                {
                this.state = 1143;
                this.typeIndexAccess();
                }
                break;
            case 16:
                this.enterOuterAlt(localContext, 16);
                {
                this.state = 1144;
                this.typeConditional();
                }
                break;
            case 17:
                this.enterOuterAlt(localContext, 17);
                {
                this.state = 1145;
                this.typeInfer();
                }
                break;
            case 18:
                this.enterOuterAlt(localContext, 18);
                {
                this.state = 1146;
                this.typeMapped();
                }
                break;
            case 19:
                this.enterOuterAlt(localContext, 19);
                {
                this.state = 1147;
                this.typeTemplateLiteral();
                }
                break;
            case 20:
                this.enterOuterAlt(localContext, 20);
                {
                this.state = 1148;
                this.typeApplication();
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
    public typeUnion(): TypeUnionContext {
        let localContext = new TypeUnionContext(this.context, this.state);
        this.enterRule(localContext, 138, Stage9Parser.RULE_typeUnion);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1151;
            this.match(Stage9Parser.LPAREN);
            this.state = 1152;
            this.match(Stage9Parser.UNION);
            this.state = 1154;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 1153;
                this.typeExpr();
                }
                }
                this.state = 1156;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 34 || _la === 99 || _la === 100 || _la === 139 || _la === 171);
            this.state = 1158;
            this.match(Stage9Parser.RPAREN);
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
    public typeIntersection(): TypeIntersectionContext {
        let localContext = new TypeIntersectionContext(this.context, this.state);
        this.enterRule(localContext, 140, Stage9Parser.RULE_typeIntersection);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1160;
            this.match(Stage9Parser.LPAREN);
            this.state = 1161;
            this.match(Stage9Parser.INTERSECT);
            this.state = 1163;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 1162;
                this.typeExpr();
                }
                }
                this.state = 1165;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 34 || _la === 99 || _la === 100 || _la === 139 || _la === 171);
            this.state = 1167;
            this.match(Stage9Parser.RPAREN);
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
    public typeArray(): TypeArrayContext {
        let localContext = new TypeArrayContext(this.context, this.state);
        this.enterRule(localContext, 142, Stage9Parser.RULE_typeArray);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1169;
            this.match(Stage9Parser.LPAREN);
            this.state = 1170;
            this.match(Stage9Parser.TYPE_ARRAY);
            this.state = 1171;
            this.typeExpr();
            this.state = 1172;
            this.match(Stage9Parser.RPAREN);
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
    public typeTuple(): TypeTupleContext {
        let localContext = new TypeTupleContext(this.context, this.state);
        this.enterRule(localContext, 144, Stage9Parser.RULE_typeTuple);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1174;
            this.match(Stage9Parser.LPAREN);
            this.state = 1175;
            this.match(Stage9Parser.TUPLE);
            this.state = 1177;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 1176;
                this.typeTupleElement();
                }
                }
                this.state = 1179;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 34 || _la === 99 || _la === 100 || _la === 139 || _la === 171);
            this.state = 1181;
            this.match(Stage9Parser.RPAREN);
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
    public typeTupleElement(): TypeTupleElementContext {
        let localContext = new TypeTupleElementContext(this.context, this.state);
        this.enterRule(localContext, 146, Stage9Parser.RULE_typeTupleElement);
        try {
            this.state = 1194;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 82, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1183;
                this.match(Stage9Parser.LPAREN);
                this.state = 1184;
                this.match(Stage9Parser.REST);
                this.state = 1185;
                this.typeExpr();
                this.state = 1186;
                this.match(Stage9Parser.RPAREN);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1188;
                this.match(Stage9Parser.LPAREN);
                this.state = 1189;
                this.match(Stage9Parser.IDENTIFIER);
                this.state = 1190;
                this.typeExpr();
                this.state = 1191;
                this.match(Stage9Parser.RPAREN);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 1193;
                this.typeExpr();
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
    public typeFunction(): TypeFunctionContext {
        let localContext = new TypeFunctionContext(this.context, this.state);
        this.enterRule(localContext, 148, Stage9Parser.RULE_typeFunction);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1196;
            this.match(Stage9Parser.LPAREN);
            this.state = 1197;
            this.match(Stage9Parser.TYPEFN);
            this.state = 1199;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 83, this.context) ) {
            case 1:
                {
                this.state = 1198;
                this.typeParams();
                }
                break;
            }
            this.state = 1201;
            this.match(Stage9Parser.LPAREN);
            this.state = 1205;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 1202;
                this.typeFnParam();
                }
                }
                this.state = 1207;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1208;
            this.match(Stage9Parser.RPAREN);
            this.state = 1209;
            this.typeExpr();
            this.state = 1210;
            this.match(Stage9Parser.RPAREN);
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
    public typeFnParam(): TypeFnParamContext {
        let localContext = new TypeFnParamContext(this.context, this.state);
        this.enterRule(localContext, 150, Stage9Parser.RULE_typeFnParam);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1212;
            this.match(Stage9Parser.LPAREN);
            this.state = 1213;
            this.match(Stage9Parser.IDENTIFIER);
            this.state = 1215;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 97) {
                {
                this.state = 1214;
                this.match(Stage9Parser.OPTIONAL);
                }
            }

            this.state = 1217;
            this.typeExpr();
            this.state = 1218;
            this.match(Stage9Parser.RPAREN);
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
    public typeObject(): TypeObjectContext {
        let localContext = new TypeObjectContext(this.context, this.state);
        this.enterRule(localContext, 152, Stage9Parser.RULE_typeObject);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1220;
            this.match(Stage9Parser.LPAREN);
            this.state = 1221;
            this.match(Stage9Parser.IDENTIFIER);
            this.state = 1225;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 1222;
                this.typeProp();
                }
                }
                this.state = 1227;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1228;
            this.match(Stage9Parser.RPAREN);
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
    public typeProp(): TypePropContext {
        let localContext = new TypePropContext(this.context, this.state);
        this.enterRule(localContext, 154, Stage9Parser.RULE_typeProp);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1230;
            this.match(Stage9Parser.LPAREN);
            this.state = 1234;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 87) {
                {
                {
                this.state = 1231;
                this.propModifier();
                }
                }
                this.state = 1236;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1237;
            this.match(Stage9Parser.IDENTIFIER);
            this.state = 1239;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 97) {
                {
                this.state = 1238;
                this.match(Stage9Parser.OPTIONAL);
                }
            }

            this.state = 1241;
            this.typeExpr();
            this.state = 1242;
            this.match(Stage9Parser.RPAREN);
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
    public propModifier(): PropModifierContext {
        let localContext = new PropModifierContext(this.context, this.state);
        this.enterRule(localContext, 156, Stage9Parser.RULE_propModifier);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1244;
            this.match(Stage9Parser.READONLY);
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
    public typeLiteral(): TypeLiteralContext {
        let localContext = new TypeLiteralContext(this.context, this.state);
        this.enterRule(localContext, 158, Stage9Parser.RULE_typeLiteral);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1246;
            this.match(Stage9Parser.LPAREN);
            this.state = 1247;
            this.match(Stage9Parser.LIT);
            this.state = 1248;
            _la = this.tokenStream.LA(1);
            if(!(_la === 98 || _la === 164 || _la === 165)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 1249;
            this.match(Stage9Parser.RPAREN);
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
    public typeKeyof(): TypeKeyofContext {
        let localContext = new TypeKeyofContext(this.context, this.state);
        this.enterRule(localContext, 160, Stage9Parser.RULE_typeKeyof);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1251;
            this.match(Stage9Parser.LPAREN);
            this.state = 1252;
            this.match(Stage9Parser.KEYOF);
            this.state = 1253;
            this.typeExpr();
            this.state = 1254;
            this.match(Stage9Parser.RPAREN);
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
    public typeTypeof(): TypeTypeofContext {
        let localContext = new TypeTypeofContext(this.context, this.state);
        this.enterRule(localContext, 162, Stage9Parser.RULE_typeTypeof);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1256;
            this.match(Stage9Parser.LPAREN);
            this.state = 1257;
            this.match(Stage9Parser.TYPEOF);
            this.state = 1258;
            this.match(Stage9Parser.IDENTIFIER);
            this.state = 1259;
            this.match(Stage9Parser.RPAREN);
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
    public typeIndexAccess(): TypeIndexAccessContext {
        let localContext = new TypeIndexAccessContext(this.context, this.state);
        this.enterRule(localContext, 164, Stage9Parser.RULE_typeIndexAccess);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1261;
            this.match(Stage9Parser.LPAREN);
            this.state = 1262;
            this.match(Stage9Parser.INDEX);
            this.state = 1263;
            this.typeExpr();
            this.state = 1264;
            this.typeExpr();
            this.state = 1265;
            this.match(Stage9Parser.RPAREN);
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
    public typeConditional(): TypeConditionalContext {
        let localContext = new TypeConditionalContext(this.context, this.state);
        this.enterRule(localContext, 166, Stage9Parser.RULE_typeConditional);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1267;
            this.match(Stage9Parser.LPAREN);
            this.state = 1268;
            this.match(Stage9Parser.COND);
            this.state = 1269;
            this.typeExpr();
            this.state = 1270;
            this.typeExpr();
            this.state = 1271;
            this.typeExpr();
            this.state = 1272;
            this.typeExpr();
            this.state = 1273;
            this.match(Stage9Parser.RPAREN);
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
    public typeInfer(): TypeInferContext {
        let localContext = new TypeInferContext(this.context, this.state);
        this.enterRule(localContext, 168, Stage9Parser.RULE_typeInfer);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1275;
            this.match(Stage9Parser.LPAREN);
            this.state = 1276;
            this.match(Stage9Parser.INFER);
            this.state = 1277;
            this.match(Stage9Parser.IDENTIFIER);
            this.state = 1278;
            this.match(Stage9Parser.RPAREN);
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
    public typeMapped(): TypeMappedContext {
        let localContext = new TypeMappedContext(this.context, this.state);
        this.enterRule(localContext, 170, Stage9Parser.RULE_typeMapped);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1280;
            this.match(Stage9Parser.LPAREN);
            this.state = 1281;
            this.match(Stage9Parser.MAPPED);
            this.state = 1282;
            this.match(Stage9Parser.IDENTIFIER);
            this.state = 1283;
            this.typeExpr();
            this.state = 1285;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 89, this.context) ) {
            case 1:
                {
                this.state = 1284;
                this.mappedModifiers();
                }
                break;
            }
            this.state = 1287;
            this.typeExpr();
            this.state = 1288;
            this.match(Stage9Parser.RPAREN);
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
    public mappedModifiers(): MappedModifiersContext {
        let localContext = new MappedModifiersContext(this.context, this.state);
        this.enterRule(localContext, 172, Stage9Parser.RULE_mappedModifiers);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1290;
            this.match(Stage9Parser.LPAREN);
            this.state = 1291;
            this.match(Stage9Parser.MODIFIERS);
            this.state = 1293;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 1292;
                this.mappedModifier();
                }
                }
                this.state = 1295;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 87 || _la === 97);
            this.state = 1297;
            this.match(Stage9Parser.RPAREN);
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
    public mappedModifier(): MappedModifierContext {
        let localContext = new MappedModifierContext(this.context, this.state);
        this.enterRule(localContext, 174, Stage9Parser.RULE_mappedModifier);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1299;
            _la = this.tokenStream.LA(1);
            if(!(_la === 87 || _la === 97)) {
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
    public typeTemplateLiteral(): TypeTemplateLiteralContext {
        let localContext = new TypeTemplateLiteralContext(this.context, this.state);
        this.enterRule(localContext, 176, Stage9Parser.RULE_typeTemplateLiteral);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1301;
            this.match(Stage9Parser.LPAREN);
            this.state = 1302;
            this.match(Stage9Parser.TYPE_TEMPLATE);
            this.state = 1304;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 1303;
                this.templatePart();
                }
                }
                this.state = 1306;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 34 || _la === 99 || _la === 100 || _la === 139 || _la === 165 || _la === 171);
            this.state = 1308;
            this.match(Stage9Parser.RPAREN);
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
    public templatePart(): TemplatePartContext {
        let localContext = new TemplatePartContext(this.context, this.state);
        this.enterRule(localContext, 178, Stage9Parser.RULE_templatePart);
        try {
            this.state = 1312;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case Stage9Parser.STRING:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1310;
                this.match(Stage9Parser.STRING);
                }
                break;
            case Stage9Parser.LPAREN:
            case Stage9Parser.OBJECT:
            case Stage9Parser.NULL:
            case Stage9Parser.UNDEFINED:
            case Stage9Parser.LBRACE:
            case Stage9Parser.IDENTIFIER:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1311;
                this.typeExpr();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
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
    public typeApplication(): TypeApplicationContext {
        let localContext = new TypeApplicationContext(this.context, this.state);
        this.enterRule(localContext, 180, Stage9Parser.RULE_typeApplication);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1314;
            this.match(Stage9Parser.LPAREN);
            this.state = 1315;
            this.match(Stage9Parser.TYPE_APP);
            this.state = 1316;
            this.typeExpr();
            this.state = 1318;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 1317;
                this.typeExpr();
                }
                }
                this.state = 1320;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 34 || _la === 99 || _la === 100 || _la === 139 || _la === 171);
            this.state = 1322;
            this.match(Stage9Parser.RPAREN);
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
    public typeParams(): TypeParamsContext {
        let localContext = new TypeParamsContext(this.context, this.state);
        this.enterRule(localContext, 182, Stage9Parser.RULE_typeParams);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1324;
            this.match(Stage9Parser.LPAREN);
            this.state = 1325;
            this.match(Stage9Parser.TYPE_PARAMS);
            this.state = 1327;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 1326;
                this.typeParamDecl();
                }
                }
                this.state = 1329;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2);
            this.state = 1331;
            this.match(Stage9Parser.RPAREN);
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
    public typeParamDecl(): TypeParamDeclContext {
        let localContext = new TypeParamDeclContext(this.context, this.state);
        this.enterRule(localContext, 184, Stage9Parser.RULE_typeParamDecl);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1333;
            this.match(Stage9Parser.LPAREN);
            this.state = 1334;
            this.match(Stage9Parser.IDENTIFIER);
            this.state = 1336;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 95, this.context) ) {
            case 1:
                {
                this.state = 1335;
                this.typeParamConstraint();
                }
                break;
            }
            this.state = 1339;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2) {
                {
                this.state = 1338;
                this.typeParamDefault();
                }
            }

            this.state = 1341;
            this.match(Stage9Parser.RPAREN);
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
    public typeParamConstraint(): TypeParamConstraintContext {
        let localContext = new TypeParamConstraintContext(this.context, this.state);
        this.enterRule(localContext, 186, Stage9Parser.RULE_typeParamConstraint);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1343;
            this.match(Stage9Parser.LPAREN);
            this.state = 1344;
            this.match(Stage9Parser.EXTENDS);
            this.state = 1345;
            this.typeExpr();
            this.state = 1346;
            this.match(Stage9Parser.RPAREN);
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
    public typeParamDefault(): TypeParamDefaultContext {
        let localContext = new TypeParamDefaultContext(this.context, this.state);
        this.enterRule(localContext, 188, Stage9Parser.RULE_typeParamDefault);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1348;
            this.match(Stage9Parser.LPAREN);
            this.state = 1349;
            this.match(Stage9Parser.DEFAULT);
            this.state = 1350;
            this.typeExpr();
            this.state = 1351;
            this.match(Stage9Parser.RPAREN);
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
        this.enterRule(localContext, 190, Stage9Parser.RULE_assign);
        try {
            this.state = 1371;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 97, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1353;
                this.match(Stage9Parser.LPAREN);
                this.state = 1354;
                this.match(Stage9Parser.SET);
                this.state = 1355;
                this.match(Stage9Parser.IDENTIFIER);
                this.state = 1356;
                this.expression();
                this.state = 1357;
                this.match(Stage9Parser.RPAREN);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1359;
                this.match(Stage9Parser.LPAREN);
                this.state = 1360;
                this.match(Stage9Parser.SET);
                this.state = 1361;
                this.propAccess();
                this.state = 1362;
                this.expression();
                this.state = 1363;
                this.match(Stage9Parser.RPAREN);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 1365;
                this.match(Stage9Parser.LPAREN);
                this.state = 1366;
                this.match(Stage9Parser.SET);
                this.state = 1367;
                this.indexAccess();
                this.state = 1368;
                this.expression();
                this.state = 1369;
                this.match(Stage9Parser.RPAREN);
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
    public compoundAssign(): CompoundAssignContext {
        let localContext = new CompoundAssignContext(this.context, this.state);
        this.enterRule(localContext, 192, Stage9Parser.RULE_compoundAssign);
        try {
            this.state = 1403;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 98, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1373;
                this.match(Stage9Parser.LPAREN);
                this.state = 1374;
                this.match(Stage9Parser.PLUS_ASSIGN);
                this.state = 1375;
                this.match(Stage9Parser.IDENTIFIER);
                this.state = 1376;
                this.expression();
                this.state = 1377;
                this.match(Stage9Parser.RPAREN);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1379;
                this.match(Stage9Parser.LPAREN);
                this.state = 1380;
                this.match(Stage9Parser.MINUS_ASSIGN);
                this.state = 1381;
                this.match(Stage9Parser.IDENTIFIER);
                this.state = 1382;
                this.expression();
                this.state = 1383;
                this.match(Stage9Parser.RPAREN);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 1385;
                this.match(Stage9Parser.LPAREN);
                this.state = 1386;
                this.match(Stage9Parser.TIMES_ASSIGN);
                this.state = 1387;
                this.match(Stage9Parser.IDENTIFIER);
                this.state = 1388;
                this.expression();
                this.state = 1389;
                this.match(Stage9Parser.RPAREN);
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 1391;
                this.match(Stage9Parser.LPAREN);
                this.state = 1392;
                this.match(Stage9Parser.DIV_ASSIGN);
                this.state = 1393;
                this.match(Stage9Parser.IDENTIFIER);
                this.state = 1394;
                this.expression();
                this.state = 1395;
                this.match(Stage9Parser.RPAREN);
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 1397;
                this.match(Stage9Parser.LPAREN);
                this.state = 1398;
                this.match(Stage9Parser.MOD_ASSIGN);
                this.state = 1399;
                this.match(Stage9Parser.IDENTIFIER);
                this.state = 1400;
                this.expression();
                this.state = 1401;
                this.match(Stage9Parser.RPAREN);
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
    public subscriptAssign(): SubscriptAssignContext {
        let localContext = new SubscriptAssignContext(this.context, this.state);
        this.enterRule(localContext, 194, Stage9Parser.RULE_subscriptAssign);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1405;
            this.match(Stage9Parser.LPAREN);
            this.state = 1406;
            this.expression();
            this.state = 1407;
            this.match(Stage9Parser.LBRACK);
            this.state = 1408;
            this.expression();
            this.state = 1409;
            this.match(Stage9Parser.RBRACK);
            this.state = 1410;
            this.match(Stage9Parser.EQUALS);
            this.state = 1411;
            this.expression();
            this.state = 1412;
            this.match(Stage9Parser.RPAREN);
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
    public switchForm(): SwitchFormContext {
        let localContext = new SwitchFormContext(this.context, this.state);
        this.enterRule(localContext, 196, Stage9Parser.RULE_switchForm);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1414;
            this.match(Stage9Parser.LPAREN);
            this.state = 1415;
            this.match(Stage9Parser.SWITCH);
            this.state = 1416;
            this.expression();
            this.state = 1420;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 99, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 1417;
                    this.caseClause();
                    }
                    }
                }
                this.state = 1422;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 99, this.context);
            }
            this.state = 1424;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2) {
                {
                this.state = 1423;
                this.defaultClause();
                }
            }

            this.state = 1426;
            this.match(Stage9Parser.RPAREN);
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
    public caseClause(): CaseClauseContext {
        let localContext = new CaseClauseContext(this.context, this.state);
        this.enterRule(localContext, 198, Stage9Parser.RULE_caseClause);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1428;
            this.match(Stage9Parser.LPAREN);
            this.state = 1429;
            this.match(Stage9Parser.CASE);
            this.state = 1430;
            this.expression();
            this.state = 1434;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 98)) & ~0x1F) === 0 && ((1 << (_la - 98)) & 4194336775) !== 0) || ((((_la - 130)) & ~0x1F) === 0 && ((1 << (_la - 130)) & 16775937) !== 0) || ((((_la - 164)) & ~0x1F) === 0 && ((1 << (_la - 164)) & 251) !== 0)) {
                {
                {
                this.state = 1431;
                this.statement();
                }
                }
                this.state = 1436;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1437;
            this.match(Stage9Parser.RPAREN);
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
    public defaultClause(): DefaultClauseContext {
        let localContext = new DefaultClauseContext(this.context, this.state);
        this.enterRule(localContext, 200, Stage9Parser.RULE_defaultClause);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1439;
            this.match(Stage9Parser.LPAREN);
            this.state = 1440;
            this.match(Stage9Parser.DEFAULT);
            this.state = 1444;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 98)) & ~0x1F) === 0 && ((1 << (_la - 98)) & 4194336775) !== 0) || ((((_la - 130)) & ~0x1F) === 0 && ((1 << (_la - 130)) & 16775937) !== 0) || ((((_la - 164)) & ~0x1F) === 0 && ((1 << (_la - 164)) & 251) !== 0)) {
                {
                {
                this.state = 1441;
                this.statement();
                }
                }
                this.state = 1446;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1447;
            this.match(Stage9Parser.RPAREN);
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
    public forForm(): ForFormContext {
        let localContext = new ForFormContext(this.context, this.state);
        this.enterRule(localContext, 202, Stage9Parser.RULE_forForm);
        let _la: number;
        try {
            this.state = 1478;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 105, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1449;
                this.match(Stage9Parser.LPAREN);
                this.state = 1450;
                this.match(Stage9Parser.FOR);
                this.state = 1451;
                this.letStmt();
                this.state = 1452;
                this.expression();
                this.state = 1453;
                this.assign();
                this.state = 1457;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 98)) & ~0x1F) === 0 && ((1 << (_la - 98)) & 4194336775) !== 0) || ((((_la - 130)) & ~0x1F) === 0 && ((1 << (_la - 130)) & 16775937) !== 0) || ((((_la - 164)) & ~0x1F) === 0 && ((1 << (_la - 164)) & 251) !== 0)) {
                    {
                    {
                    this.state = 1454;
                    this.statement();
                    }
                    }
                    this.state = 1459;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 1460;
                this.match(Stage9Parser.RPAREN);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1462;
                this.match(Stage9Parser.LPAREN);
                this.state = 1463;
                this.match(Stage9Parser.FOR);
                this.state = 1464;
                this.match(Stage9Parser.LPAREN);
                this.state = 1465;
                this.match(Stage9Parser.IDENTIFIER);
                this.state = 1466;
                this.expression();
                this.state = 1467;
                this.match(Stage9Parser.RPAREN);
                this.state = 1468;
                this.expression();
                this.state = 1469;
                this.expression();
                this.state = 1473;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 98)) & ~0x1F) === 0 && ((1 << (_la - 98)) & 4194336775) !== 0) || ((((_la - 130)) & ~0x1F) === 0 && ((1 << (_la - 130)) & 16775937) !== 0) || ((((_la - 164)) & ~0x1F) === 0 && ((1 << (_la - 164)) & 251) !== 0)) {
                    {
                    {
                    this.state = 1470;
                    this.statement();
                    }
                    }
                    this.state = 1475;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 1476;
                this.match(Stage9Parser.RPAREN);
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
    public forInForm(): ForInFormContext {
        let localContext = new ForInFormContext(this.context, this.state);
        this.enterRule(localContext, 204, Stage9Parser.RULE_forInForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1480;
            this.match(Stage9Parser.LPAREN);
            this.state = 1481;
            this.match(Stage9Parser.FORIN);
            this.state = 1482;
            this.match(Stage9Parser.IDENTIFIER);
            this.state = 1483;
            this.expression();
            this.state = 1487;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 98)) & ~0x1F) === 0 && ((1 << (_la - 98)) & 4194336775) !== 0) || ((((_la - 130)) & ~0x1F) === 0 && ((1 << (_la - 130)) & 16775937) !== 0) || ((((_la - 164)) & ~0x1F) === 0 && ((1 << (_la - 164)) & 251) !== 0)) {
                {
                {
                this.state = 1484;
                this.statement();
                }
                }
                this.state = 1489;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1490;
            this.match(Stage9Parser.RPAREN);
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
    public forOfForm(): ForOfFormContext {
        let localContext = new ForOfFormContext(this.context, this.state);
        this.enterRule(localContext, 206, Stage9Parser.RULE_forOfForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1492;
            this.match(Stage9Parser.LPAREN);
            this.state = 1493;
            this.match(Stage9Parser.FOROF);
            this.state = 1494;
            this.match(Stage9Parser.IDENTIFIER);
            this.state = 1495;
            this.expression();
            this.state = 1499;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 98)) & ~0x1F) === 0 && ((1 << (_la - 98)) & 4194336775) !== 0) || ((((_la - 130)) & ~0x1F) === 0 && ((1 << (_la - 130)) & 16775937) !== 0) || ((((_la - 164)) & ~0x1F) === 0 && ((1 << (_la - 164)) & 251) !== 0)) {
                {
                {
                this.state = 1496;
                this.statement();
                }
                }
                this.state = 1501;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1502;
            this.match(Stage9Parser.RPAREN);
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
    public forAwaitForm(): ForAwaitFormContext {
        let localContext = new ForAwaitFormContext(this.context, this.state);
        this.enterRule(localContext, 208, Stage9Parser.RULE_forAwaitForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1504;
            this.match(Stage9Parser.LPAREN);
            this.state = 1505;
            this.match(Stage9Parser.FORAWAIT);
            this.state = 1506;
            this.match(Stage9Parser.IDENTIFIER);
            this.state = 1507;
            this.expression();
            this.state = 1511;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 98)) & ~0x1F) === 0 && ((1 << (_la - 98)) & 4194336775) !== 0) || ((((_la - 130)) & ~0x1F) === 0 && ((1 << (_la - 130)) & 16775937) !== 0) || ((((_la - 164)) & ~0x1F) === 0 && ((1 << (_la - 164)) & 251) !== 0)) {
                {
                {
                this.state = 1508;
                this.statement();
                }
                }
                this.state = 1513;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1514;
            this.match(Stage9Parser.RPAREN);
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
    public exceptForm(): ExceptFormContext {
        let localContext = new ExceptFormContext(this.context, this.state);
        this.enterRule(localContext, 210, Stage9Parser.RULE_exceptForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1516;
            this.match(Stage9Parser.LPAREN);
            this.state = 1517;
            this.match(Stage9Parser.EXCEPT);
            this.state = 1518;
            this.tryClause();
            this.state = 1520;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 109, this.context) ) {
            case 1:
                {
                this.state = 1519;
                this.catchClause();
                }
                break;
            }
            this.state = 1523;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2) {
                {
                this.state = 1522;
                this.finallyClause();
                }
            }

            this.state = 1525;
            this.match(Stage9Parser.RPAREN);
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
    public tryClause(): TryClauseContext {
        let localContext = new TryClauseContext(this.context, this.state);
        this.enterRule(localContext, 212, Stage9Parser.RULE_tryClause);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1527;
            this.match(Stage9Parser.LPAREN);
            this.state = 1528;
            this.match(Stage9Parser.TRY);
            this.state = 1532;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 98)) & ~0x1F) === 0 && ((1 << (_la - 98)) & 4194336775) !== 0) || ((((_la - 130)) & ~0x1F) === 0 && ((1 << (_la - 130)) & 16775937) !== 0) || ((((_la - 164)) & ~0x1F) === 0 && ((1 << (_la - 164)) & 251) !== 0)) {
                {
                {
                this.state = 1529;
                this.statement();
                }
                }
                this.state = 1534;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1535;
            this.match(Stage9Parser.RPAREN);
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
    public catchClause(): CatchClauseContext {
        let localContext = new CatchClauseContext(this.context, this.state);
        this.enterRule(localContext, 214, Stage9Parser.RULE_catchClause);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1537;
            this.match(Stage9Parser.LPAREN);
            this.state = 1538;
            this.match(Stage9Parser.CATCH);
            this.state = 1539;
            this.match(Stage9Parser.IDENTIFIER);
            this.state = 1543;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 98)) & ~0x1F) === 0 && ((1 << (_la - 98)) & 4194336775) !== 0) || ((((_la - 130)) & ~0x1F) === 0 && ((1 << (_la - 130)) & 16775937) !== 0) || ((((_la - 164)) & ~0x1F) === 0 && ((1 << (_la - 164)) & 251) !== 0)) {
                {
                {
                this.state = 1540;
                this.statement();
                }
                }
                this.state = 1545;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1546;
            this.match(Stage9Parser.RPAREN);
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
    public finallyClause(): FinallyClauseContext {
        let localContext = new FinallyClauseContext(this.context, this.state);
        this.enterRule(localContext, 216, Stage9Parser.RULE_finallyClause);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1548;
            this.match(Stage9Parser.LPAREN);
            this.state = 1549;
            this.match(Stage9Parser.FINALLY);
            this.state = 1553;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 98)) & ~0x1F) === 0 && ((1 << (_la - 98)) & 4194336775) !== 0) || ((((_la - 130)) & ~0x1F) === 0 && ((1 << (_la - 130)) & 16775937) !== 0) || ((((_la - 164)) & ~0x1F) === 0 && ((1 << (_la - 164)) & 251) !== 0)) {
                {
                {
                this.state = 1550;
                this.statement();
                }
                }
                this.state = 1555;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1556;
            this.match(Stage9Parser.RPAREN);
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
        this.enterRule(localContext, 218, Stage9Parser.RULE_expression);
        try {
            this.state = 1608;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 114, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1558;
                this.literal();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1559;
                this.match(Stage9Parser.IDENTIFIER);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 1560;
                this.match(Stage9Parser.MACRO_ERROR);
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 1561;
                this.match(Stage9Parser.MINUS);
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 1562;
                this.lambda();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 1563;
                this.fn();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 1564;
                this.asyncLambda();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 1565;
                this.asyncFn();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 1566;
                this.generatorFn();
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 1567;
                this.asyncGeneratorFn();
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 1568;
                this.fnO();
                }
                break;
            case 12:
                this.enterOuterAlt(localContext, 12);
                {
                this.state = 1569;
                this.lambdaO();
                }
                break;
            case 13:
                this.enterOuterAlt(localContext, 13);
                {
                this.state = 1570;
                this.asyncFnO();
                }
                break;
            case 14:
                this.enterOuterAlt(localContext, 14);
                {
                this.state = 1571;
                this.asyncLambdaO();
                }
                break;
            case 15:
                this.enterOuterAlt(localContext, 15);
                {
                this.state = 1572;
                this.generatorFnO();
                }
                break;
            case 16:
                this.enterOuterAlt(localContext, 16);
                {
                this.state = 1573;
                this.asyncGeneratorFnO();
                }
                break;
            case 17:
                this.enterOuterAlt(localContext, 17);
                {
                this.state = 1574;
                this.awaitExpr();
                }
                break;
            case 18:
                this.enterOuterAlt(localContext, 18);
                {
                this.state = 1575;
                this.yieldExpr();
                }
                break;
            case 19:
                this.enterOuterAlt(localContext, 19);
                {
                this.state = 1576;
                this.yieldStarExpr();
                }
                break;
            case 20:
                this.enterOuterAlt(localContext, 20);
                {
                this.state = 1577;
                this.bindExpr();
                }
                break;
            case 21:
                this.enterOuterAlt(localContext, 21);
                {
                this.state = 1578;
                this.methodCallExpr();
                }
                break;
            case 22:
                this.enterOuterAlt(localContext, 22);
                {
                this.state = 1579;
                this.objectExpr();
                }
                break;
            case 23:
                this.enterOuterAlt(localContext, 23);
                {
                this.state = 1580;
                this.braceObjectExpr();
                }
                break;
            case 24:
                this.enterOuterAlt(localContext, 24);
                {
                this.state = 1581;
                this.arrayExpr();
                }
                break;
            case 25:
                this.enterOuterAlt(localContext, 25);
                {
                this.state = 1582;
                this.bracketArrayExpr();
                }
                break;
            case 26:
                this.enterOuterAlt(localContext, 26);
                {
                this.state = 1583;
                this.propAccess();
                }
                break;
            case 27:
                this.enterOuterAlt(localContext, 27);
                {
                this.state = 1584;
                this.indexAccess();
                }
                break;
            case 28:
                this.enterOuterAlt(localContext, 28);
                {
                this.state = 1585;
                this.subscriptAccess();
                }
                break;
            case 29:
                this.enterOuterAlt(localContext, 29);
                {
                this.state = 1586;
                this.quasiquote();
                }
                break;
            case 30:
                this.enterOuterAlt(localContext, 30);
                {
                this.state = 1587;
                this.unquote();
                }
                break;
            case 31:
                this.enterOuterAlt(localContext, 31);
                {
                this.state = 1588;
                this.unquoteSplicing();
                }
                break;
            case 32:
                this.enterOuterAlt(localContext, 32);
                {
                this.state = 1589;
                this.tildeUnquote();
                }
                break;
            case 33:
                this.enterOuterAlt(localContext, 33);
                {
                this.state = 1590;
                this.tildeUnquoteSplice();
                }
                break;
            case 34:
                this.enterOuterAlt(localContext, 34);
                {
                this.state = 1591;
                this.ternary();
                }
                break;
            case 35:
                this.enterOuterAlt(localContext, 35);
                {
                this.state = 1592;
                this.condExpr();
                }
                break;
            case 36:
                this.enterOuterAlt(localContext, 36);
                {
                this.state = 1593;
                this.newForm();
                }
                break;
            case 37:
                this.enterOuterAlt(localContext, 37);
                {
                this.state = 1594;
                this.optChain();
                }
                break;
            case 38:
                this.enterOuterAlt(localContext, 38);
                {
                this.state = 1595;
                this.optChainIndex();
                }
                break;
            case 39:
                this.enterOuterAlt(localContext, 39);
                {
                this.state = 1596;
                this.nullCoalesce();
                }
                break;
            case 40:
                this.enterOuterAlt(localContext, 40);
                {
                this.state = 1597;
                this.typeofExpr();
                }
                break;
            case 41:
                this.enterOuterAlt(localContext, 41);
                {
                this.state = 1598;
                this.typeAssert();
                }
                break;
            case 42:
                this.enterOuterAlt(localContext, 42);
                {
                this.state = 1599;
                this.templateExpr();
                }
                break;
            case 43:
                this.enterOuterAlt(localContext, 43);
                {
                this.state = 1600;
                this.thisExpr();
                }
                break;
            case 44:
                this.enterOuterAlt(localContext, 44);
                {
                this.state = 1601;
                this.superExpr();
                }
                break;
            case 45:
                this.enterOuterAlt(localContext, 45);
                {
                this.state = 1602;
                this.superConstructorCall();
                }
                break;
            case 46:
                this.enterOuterAlt(localContext, 46);
                {
                this.state = 1603;
                this.superMethodCall();
                }
                break;
            case 47:
                this.enterOuterAlt(localContext, 47);
                {
                this.state = 1604;
                this.infixExpr();
                }
                break;
            case 48:
                this.enterOuterAlt(localContext, 48);
                {
                this.state = 1605;
                this.macroExprCall();
                }
                break;
            case 49:
                this.enterOuterAlt(localContext, 49);
                {
                this.state = 1606;
                this.opSymbol();
                }
                break;
            case 50:
                this.enterOuterAlt(localContext, 50);
                {
                this.state = 1607;
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
    public thisExpr(): ThisExprContext {
        let localContext = new ThisExprContext(this.context, this.state);
        this.enterRule(localContext, 220, Stage9Parser.RULE_thisExpr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1610;
            this.match(Stage9Parser.THIS);
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
    public superExpr(): SuperExprContext {
        let localContext = new SuperExprContext(this.context, this.state);
        this.enterRule(localContext, 222, Stage9Parser.RULE_superExpr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1612;
            this.match(Stage9Parser.SUPER);
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
    public superConstructorCall(): SuperConstructorCallContext {
        let localContext = new SuperConstructorCallContext(this.context, this.state);
        this.enterRule(localContext, 224, Stage9Parser.RULE_superConstructorCall);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1614;
            this.match(Stage9Parser.LPAREN);
            this.state = 1615;
            this.match(Stage9Parser.SUPER);
            this.state = 1619;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 98)) & ~0x1F) === 0 && ((1 << (_la - 98)) & 4194336775) !== 0) || ((((_la - 130)) & ~0x1F) === 0 && ((1 << (_la - 130)) & 16775937) !== 0) || ((((_la - 164)) & ~0x1F) === 0 && ((1 << (_la - 164)) & 251) !== 0)) {
                {
                {
                this.state = 1616;
                this.expression();
                }
                }
                this.state = 1621;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1622;
            this.match(Stage9Parser.RPAREN);
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
    public superMethodCall(): SuperMethodCallContext {
        let localContext = new SuperMethodCallContext(this.context, this.state);
        this.enterRule(localContext, 226, Stage9Parser.RULE_superMethodCall);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1624;
            this.match(Stage9Parser.LPAREN);
            this.state = 1625;
            this.match(Stage9Parser.SUPER_METHOD);
            this.state = 1626;
            this.match(Stage9Parser.IDENTIFIER);
            this.state = 1630;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 98)) & ~0x1F) === 0 && ((1 << (_la - 98)) & 4194336775) !== 0) || ((((_la - 130)) & ~0x1F) === 0 && ((1 << (_la - 130)) & 16775937) !== 0) || ((((_la - 164)) & ~0x1F) === 0 && ((1 << (_la - 164)) & 251) !== 0)) {
                {
                {
                this.state = 1627;
                this.expression();
                }
                }
                this.state = 1632;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1633;
            this.match(Stage9Parser.RPAREN);
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
    public typeofExpr(): TypeofExprContext {
        let localContext = new TypeofExprContext(this.context, this.state);
        this.enterRule(localContext, 228, Stage9Parser.RULE_typeofExpr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1635;
            this.match(Stage9Parser.LPAREN);
            this.state = 1636;
            this.match(Stage9Parser.TYPEOF);
            this.state = 1637;
            this.expression();
            this.state = 1638;
            this.match(Stage9Parser.RPAREN);
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
    public typeAssert(): TypeAssertContext {
        let localContext = new TypeAssertContext(this.context, this.state);
        this.enterRule(localContext, 230, Stage9Parser.RULE_typeAssert);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1640;
            this.match(Stage9Parser.LPAREN);
            this.state = 1641;
            this.match(Stage9Parser.TYPE_AS);
            this.state = 1642;
            this.expression();
            this.state = 1643;
            this.typeExpr();
            this.state = 1644;
            this.match(Stage9Parser.RPAREN);
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
        this.enterRule(localContext, 232, Stage9Parser.RULE_lambda);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1646;
            this.match(Stage9Parser.LPAREN);
            this.state = 1647;
            this.match(Stage9Parser.LAMBDA);
            this.state = 1648;
            this.fnSignature();
            this.state = 1652;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 98)) & ~0x1F) === 0 && ((1 << (_la - 98)) & 4194336775) !== 0) || ((((_la - 130)) & ~0x1F) === 0 && ((1 << (_la - 130)) & 16775937) !== 0) || ((((_la - 164)) & ~0x1F) === 0 && ((1 << (_la - 164)) & 251) !== 0)) {
                {
                {
                this.state = 1649;
                this.statement();
                }
                }
                this.state = 1654;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1655;
            this.match(Stage9Parser.RPAREN);
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
    public fn(): FnContext {
        let localContext = new FnContext(this.context, this.state);
        this.enterRule(localContext, 234, Stage9Parser.RULE_fn);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1657;
            this.match(Stage9Parser.LPAREN);
            this.state = 1658;
            this.match(Stage9Parser.FN);
            this.state = 1660;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 171) {
                {
                this.state = 1659;
                this.match(Stage9Parser.IDENTIFIER);
                }
            }

            this.state = 1662;
            this.fnSignature();
            this.state = 1666;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 98)) & ~0x1F) === 0 && ((1 << (_la - 98)) & 4194336775) !== 0) || ((((_la - 130)) & ~0x1F) === 0 && ((1 << (_la - 130)) & 16775937) !== 0) || ((((_la - 164)) & ~0x1F) === 0 && ((1 << (_la - 164)) & 251) !== 0)) {
                {
                {
                this.state = 1663;
                this.statement();
                }
                }
                this.state = 1668;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1669;
            this.match(Stage9Parser.RPAREN);
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
    public asyncLambda(): AsyncLambdaContext {
        let localContext = new AsyncLambdaContext(this.context, this.state);
        this.enterRule(localContext, 236, Stage9Parser.RULE_asyncLambda);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1671;
            this.match(Stage9Parser.LPAREN);
            this.state = 1672;
            this.match(Stage9Parser.ASYNC_LAMBDA);
            this.state = 1673;
            this.fnSignature();
            this.state = 1677;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 98)) & ~0x1F) === 0 && ((1 << (_la - 98)) & 4194336775) !== 0) || ((((_la - 130)) & ~0x1F) === 0 && ((1 << (_la - 130)) & 16775937) !== 0) || ((((_la - 164)) & ~0x1F) === 0 && ((1 << (_la - 164)) & 251) !== 0)) {
                {
                {
                this.state = 1674;
                this.statement();
                }
                }
                this.state = 1679;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1680;
            this.match(Stage9Parser.RPAREN);
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
    public asyncFn(): AsyncFnContext {
        let localContext = new AsyncFnContext(this.context, this.state);
        this.enterRule(localContext, 238, Stage9Parser.RULE_asyncFn);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1682;
            this.match(Stage9Parser.LPAREN);
            this.state = 1683;
            this.match(Stage9Parser.ASYNC_FN);
            this.state = 1684;
            this.fnSignature();
            this.state = 1688;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 98)) & ~0x1F) === 0 && ((1 << (_la - 98)) & 4194336775) !== 0) || ((((_la - 130)) & ~0x1F) === 0 && ((1 << (_la - 130)) & 16775937) !== 0) || ((((_la - 164)) & ~0x1F) === 0 && ((1 << (_la - 164)) & 251) !== 0)) {
                {
                {
                this.state = 1685;
                this.statement();
                }
                }
                this.state = 1690;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1691;
            this.match(Stage9Parser.RPAREN);
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
    public generatorFn(): GeneratorFnContext {
        let localContext = new GeneratorFnContext(this.context, this.state);
        this.enterRule(localContext, 240, Stage9Parser.RULE_generatorFn);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1693;
            this.match(Stage9Parser.LPAREN);
            this.state = 1694;
            this.match(Stage9Parser.GENERATOR_FN);
            this.state = 1695;
            this.fnSignature();
            this.state = 1699;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 98)) & ~0x1F) === 0 && ((1 << (_la - 98)) & 4194336775) !== 0) || ((((_la - 130)) & ~0x1F) === 0 && ((1 << (_la - 130)) & 16775937) !== 0) || ((((_la - 164)) & ~0x1F) === 0 && ((1 << (_la - 164)) & 251) !== 0)) {
                {
                {
                this.state = 1696;
                this.statement();
                }
                }
                this.state = 1701;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1702;
            this.match(Stage9Parser.RPAREN);
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
    public asyncGeneratorFn(): AsyncGeneratorFnContext {
        let localContext = new AsyncGeneratorFnContext(this.context, this.state);
        this.enterRule(localContext, 242, Stage9Parser.RULE_asyncGeneratorFn);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1704;
            this.match(Stage9Parser.LPAREN);
            this.state = 1705;
            this.match(Stage9Parser.ASYNC_GENERATOR_FN);
            this.state = 1706;
            this.fnSignature();
            this.state = 1710;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 98)) & ~0x1F) === 0 && ((1 << (_la - 98)) & 4194336775) !== 0) || ((((_la - 130)) & ~0x1F) === 0 && ((1 << (_la - 130)) & 16775937) !== 0) || ((((_la - 164)) & ~0x1F) === 0 && ((1 << (_la - 164)) & 251) !== 0)) {
                {
                {
                this.state = 1707;
                this.statement();
                }
                }
                this.state = 1712;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1713;
            this.match(Stage9Parser.RPAREN);
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
    public fnO(): FnOContext {
        let localContext = new FnOContext(this.context, this.state);
        this.enterRule(localContext, 244, Stage9Parser.RULE_fnO);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1715;
            this.match(Stage9Parser.LPAREN);
            this.state = 1716;
            this.match(Stage9Parser.FN_O);
            this.state = 1718;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 171) {
                {
                this.state = 1717;
                this.match(Stage9Parser.IDENTIFIER);
                }
            }

            this.state = 1720;
            this.fnoSignature();
            this.state = 1724;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 98)) & ~0x1F) === 0 && ((1 << (_la - 98)) & 4194336775) !== 0) || ((((_la - 130)) & ~0x1F) === 0 && ((1 << (_la - 130)) & 16775937) !== 0) || ((((_la - 164)) & ~0x1F) === 0 && ((1 << (_la - 164)) & 251) !== 0)) {
                {
                {
                this.state = 1721;
                this.statement();
                }
                }
                this.state = 1726;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1727;
            this.match(Stage9Parser.RPAREN);
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
    public lambdaO(): LambdaOContext {
        let localContext = new LambdaOContext(this.context, this.state);
        this.enterRule(localContext, 246, Stage9Parser.RULE_lambdaO);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1729;
            this.match(Stage9Parser.LPAREN);
            this.state = 1730;
            this.match(Stage9Parser.LAMBDA_O);
            this.state = 1731;
            this.fnoSignature();
            this.state = 1735;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 98)) & ~0x1F) === 0 && ((1 << (_la - 98)) & 4194336775) !== 0) || ((((_la - 130)) & ~0x1F) === 0 && ((1 << (_la - 130)) & 16775937) !== 0) || ((((_la - 164)) & ~0x1F) === 0 && ((1 << (_la - 164)) & 251) !== 0)) {
                {
                {
                this.state = 1732;
                this.statement();
                }
                }
                this.state = 1737;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1738;
            this.match(Stage9Parser.RPAREN);
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
    public asyncFnO(): AsyncFnOContext {
        let localContext = new AsyncFnOContext(this.context, this.state);
        this.enterRule(localContext, 248, Stage9Parser.RULE_asyncFnO);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1740;
            this.match(Stage9Parser.LPAREN);
            this.state = 1741;
            this.match(Stage9Parser.ASYNC_FN_O);
            this.state = 1742;
            this.fnoSignature();
            this.state = 1746;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 98)) & ~0x1F) === 0 && ((1 << (_la - 98)) & 4194336775) !== 0) || ((((_la - 130)) & ~0x1F) === 0 && ((1 << (_la - 130)) & 16775937) !== 0) || ((((_la - 164)) & ~0x1F) === 0 && ((1 << (_la - 164)) & 251) !== 0)) {
                {
                {
                this.state = 1743;
                this.statement();
                }
                }
                this.state = 1748;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1749;
            this.match(Stage9Parser.RPAREN);
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
    public asyncLambdaO(): AsyncLambdaOContext {
        let localContext = new AsyncLambdaOContext(this.context, this.state);
        this.enterRule(localContext, 250, Stage9Parser.RULE_asyncLambdaO);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1751;
            this.match(Stage9Parser.LPAREN);
            this.state = 1752;
            this.match(Stage9Parser.ASYNC_LAMBDA_O);
            this.state = 1753;
            this.fnoSignature();
            this.state = 1757;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 98)) & ~0x1F) === 0 && ((1 << (_la - 98)) & 4194336775) !== 0) || ((((_la - 130)) & ~0x1F) === 0 && ((1 << (_la - 130)) & 16775937) !== 0) || ((((_la - 164)) & ~0x1F) === 0 && ((1 << (_la - 164)) & 251) !== 0)) {
                {
                {
                this.state = 1754;
                this.statement();
                }
                }
                this.state = 1759;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1760;
            this.match(Stage9Parser.RPAREN);
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
    public generatorFnO(): GeneratorFnOContext {
        let localContext = new GeneratorFnOContext(this.context, this.state);
        this.enterRule(localContext, 252, Stage9Parser.RULE_generatorFnO);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1762;
            this.match(Stage9Parser.LPAREN);
            this.state = 1763;
            this.match(Stage9Parser.GENERATOR_FN_O);
            this.state = 1764;
            this.fnoSignature();
            this.state = 1768;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 98)) & ~0x1F) === 0 && ((1 << (_la - 98)) & 4194336775) !== 0) || ((((_la - 130)) & ~0x1F) === 0 && ((1 << (_la - 130)) & 16775937) !== 0) || ((((_la - 164)) & ~0x1F) === 0 && ((1 << (_la - 164)) & 251) !== 0)) {
                {
                {
                this.state = 1765;
                this.statement();
                }
                }
                this.state = 1770;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1771;
            this.match(Stage9Parser.RPAREN);
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
    public asyncGeneratorFnO(): AsyncGeneratorFnOContext {
        let localContext = new AsyncGeneratorFnOContext(this.context, this.state);
        this.enterRule(localContext, 254, Stage9Parser.RULE_asyncGeneratorFnO);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1773;
            this.match(Stage9Parser.LPAREN);
            this.state = 1774;
            this.match(Stage9Parser.ASYNC_GENERATOR_FN_O);
            this.state = 1775;
            this.fnoSignature();
            this.state = 1779;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 98)) & ~0x1F) === 0 && ((1 << (_la - 98)) & 4194336775) !== 0) || ((((_la - 130)) & ~0x1F) === 0 && ((1 << (_la - 130)) & 16775937) !== 0) || ((((_la - 164)) & ~0x1F) === 0 && ((1 << (_la - 164)) & 251) !== 0)) {
                {
                {
                this.state = 1776;
                this.statement();
                }
                }
                this.state = 1781;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1782;
            this.match(Stage9Parser.RPAREN);
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
    public methodO(): MethodOContext {
        let localContext = new MethodOContext(this.context, this.state);
        this.enterRule(localContext, 256, Stage9Parser.RULE_methodO);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1784;
            this.match(Stage9Parser.LPAREN);
            this.state = 1785;
            this.match(Stage9Parser.METHOD_O);
            this.state = 1789;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (((((_la - 87)) & ~0x1F) === 0 && ((1 << (_la - 87)) & 4160749569) !== 0) || ((((_la - 119)) & ~0x1F) === 0 && ((1 << (_la - 119)) & 7) !== 0)) {
                {
                {
                this.state = 1786;
                this.modifier();
                }
                }
                this.state = 1791;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1792;
            this.methodKey();
            this.state = 1793;
            this.fnoSignature();
            this.state = 1797;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 98)) & ~0x1F) === 0 && ((1 << (_la - 98)) & 4194336775) !== 0) || ((((_la - 130)) & ~0x1F) === 0 && ((1 << (_la - 130)) & 16775937) !== 0) || ((((_la - 164)) & ~0x1F) === 0 && ((1 << (_la - 164)) & 251) !== 0)) {
                {
                {
                this.state = 1794;
                this.statement();
                }
                }
                this.state = 1799;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1800;
            this.match(Stage9Parser.RPAREN);
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
    public abstractMethodO(): AbstractMethodOContext {
        let localContext = new AbstractMethodOContext(this.context, this.state);
        this.enterRule(localContext, 258, Stage9Parser.RULE_abstractMethodO);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1802;
            this.match(Stage9Parser.LPAREN);
            this.state = 1803;
            this.match(Stage9Parser.ABSTRACT_METHOD_O);
            this.state = 1807;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (((((_la - 87)) & ~0x1F) === 0 && ((1 << (_la - 87)) & 4160749569) !== 0) || ((((_la - 119)) & ~0x1F) === 0 && ((1 << (_la - 119)) & 7) !== 0)) {
                {
                {
                this.state = 1804;
                this.modifier();
                }
                }
                this.state = 1809;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1810;
            this.methodKey();
            this.state = 1811;
            this.fnoSignature();
            this.state = 1812;
            this.match(Stage9Parser.RPAREN);
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
    public constructorO(): ConstructorOContext {
        let localContext = new ConstructorOContext(this.context, this.state);
        this.enterRule(localContext, 260, Stage9Parser.RULE_constructorO);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1814;
            this.match(Stage9Parser.LPAREN);
            this.state = 1815;
            this.match(Stage9Parser.CONSTRUCTOR_O);
            this.state = 1816;
            this.fnoSignature();
            this.state = 1820;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 98)) & ~0x1F) === 0 && ((1 << (_la - 98)) & 4194336775) !== 0) || ((((_la - 130)) & ~0x1F) === 0 && ((1 << (_la - 130)) & 16775937) !== 0) || ((((_la - 164)) & ~0x1F) === 0 && ((1 << (_la - 164)) & 251) !== 0)) {
                {
                {
                this.state = 1817;
                this.statement();
                }
                }
                this.state = 1822;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1823;
            this.match(Stage9Parser.RPAREN);
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
    public fnoSignature(): FnoSignatureContext {
        let localContext = new FnoSignatureContext(this.context, this.state);
        this.enterRule(localContext, 262, Stage9Parser.RULE_fnoSignature);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1825;
            this.match(Stage9Parser.LPAREN);
            {
            this.state = 1829;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 135, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 1826;
                    this.fnoParam();
                    }
                    }
                }
                this.state = 1831;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 135, this.context);
            }
            this.state = 1833;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2) {
                {
                this.state = 1832;
                this.fnoRestParam();
                }
            }

            }
            this.state = 1835;
            this.match(Stage9Parser.RPAREN);
            this.state = 1838;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 101) {
                {
                this.state = 1836;
                this.match(Stage9Parser.COLON);
                this.state = 1837;
                this.typeExpr();
                }
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
    public fnoParam(): FnoParamContext {
        let localContext = new FnoParamContext(this.context, this.state);
        this.enterRule(localContext, 264, Stage9Parser.RULE_fnoParam);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1840;
            this.match(Stage9Parser.LPAREN);
            this.state = 1841;
            this.match(Stage9Parser.IDENTIFIER);
            this.state = 1843;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 97) {
                {
                this.state = 1842;
                this.match(Stage9Parser.OPTIONAL);
                }
            }

            this.state = 1847;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 101) {
                {
                this.state = 1845;
                this.match(Stage9Parser.COLON);
                this.state = 1846;
                this.typeExpr();
                }
            }

            this.state = 1854;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2) {
                {
                this.state = 1849;
                this.match(Stage9Parser.LPAREN);
                this.state = 1850;
                this.match(Stage9Parser.DEFAULT);
                this.state = 1851;
                this.expression();
                this.state = 1852;
                this.match(Stage9Parser.RPAREN);
                }
            }

            this.state = 1856;
            this.match(Stage9Parser.RPAREN);
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
    public fnoRestParam(): FnoRestParamContext {
        let localContext = new FnoRestParamContext(this.context, this.state);
        this.enterRule(localContext, 266, Stage9Parser.RULE_fnoRestParam);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1858;
            this.match(Stage9Parser.LPAREN);
            this.state = 1859;
            this.match(Stage9Parser.REST);
            this.state = 1860;
            this.match(Stage9Parser.IDENTIFIER);
            this.state = 1863;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 101) {
                {
                this.state = 1861;
                this.match(Stage9Parser.COLON);
                this.state = 1862;
                this.typeExpr();
                }
            }

            this.state = 1865;
            this.match(Stage9Parser.RPAREN);
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
    public awaitExpr(): AwaitExprContext {
        let localContext = new AwaitExprContext(this.context, this.state);
        this.enterRule(localContext, 268, Stage9Parser.RULE_awaitExpr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1867;
            this.match(Stage9Parser.LPAREN);
            this.state = 1868;
            this.match(Stage9Parser.AWAIT);
            this.state = 1869;
            this.expression();
            this.state = 1870;
            this.match(Stage9Parser.RPAREN);
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
    public yieldExpr(): YieldExprContext {
        let localContext = new YieldExprContext(this.context, this.state);
        this.enterRule(localContext, 270, Stage9Parser.RULE_yieldExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1872;
            this.match(Stage9Parser.LPAREN);
            this.state = 1873;
            this.match(Stage9Parser.YIELD);
            this.state = 1875;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 98)) & ~0x1F) === 0 && ((1 << (_la - 98)) & 4194336775) !== 0) || ((((_la - 130)) & ~0x1F) === 0 && ((1 << (_la - 130)) & 16775937) !== 0) || ((((_la - 164)) & ~0x1F) === 0 && ((1 << (_la - 164)) & 251) !== 0)) {
                {
                this.state = 1874;
                this.expression();
                }
            }

            this.state = 1877;
            this.match(Stage9Parser.RPAREN);
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
    public yieldStarExpr(): YieldStarExprContext {
        let localContext = new YieldStarExprContext(this.context, this.state);
        this.enterRule(localContext, 272, Stage9Parser.RULE_yieldStarExpr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1879;
            this.match(Stage9Parser.LPAREN);
            this.state = 1880;
            this.match(Stage9Parser.YIELD_STAR);
            this.state = 1881;
            this.expression();
            this.state = 1882;
            this.match(Stage9Parser.RPAREN);
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
    public bindExpr(): BindExprContext {
        let localContext = new BindExprContext(this.context, this.state);
        this.enterRule(localContext, 274, Stage9Parser.RULE_bindExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1884;
            this.match(Stage9Parser.LPAREN);
            this.state = 1885;
            this.match(Stage9Parser.BIND);
            this.state = 1886;
            this.expression();
            this.state = 1887;
            this.expression();
            this.state = 1891;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 98)) & ~0x1F) === 0 && ((1 << (_la - 98)) & 4194336775) !== 0) || ((((_la - 130)) & ~0x1F) === 0 && ((1 << (_la - 130)) & 16775937) !== 0) || ((((_la - 164)) & ~0x1F) === 0 && ((1 << (_la - 164)) & 251) !== 0)) {
                {
                {
                this.state = 1888;
                this.expression();
                }
                }
                this.state = 1893;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1894;
            this.match(Stage9Parser.RPAREN);
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
    public methodCallExpr(): MethodCallExprContext {
        let localContext = new MethodCallExprContext(this.context, this.state);
        this.enterRule(localContext, 276, Stage9Parser.RULE_methodCallExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1896;
            this.match(Stage9Parser.LPAREN);
            this.state = 1897;
            this.match(Stage9Parser.METHOD_CALL);
            this.state = 1898;
            this.expression();
            this.state = 1899;
            this.expression();
            this.state = 1903;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 98)) & ~0x1F) === 0 && ((1 << (_la - 98)) & 4194336775) !== 0) || ((((_la - 130)) & ~0x1F) === 0 && ((1 << (_la - 130)) & 16775937) !== 0) || ((((_la - 164)) & ~0x1F) === 0 && ((1 << (_la - 164)) & 251) !== 0)) {
                {
                {
                this.state = 1900;
                this.expression();
                }
                }
                this.state = 1905;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1906;
            this.match(Stage9Parser.RPAREN);
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
        this.enterRule(localContext, 278, Stage9Parser.RULE_ternary);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1908;
            this.match(Stage9Parser.LPAREN);
            this.state = 1909;
            this.match(Stage9Parser.TERNARY);
            this.state = 1910;
            this.expression();
            this.state = 1911;
            this.expression();
            this.state = 1912;
            this.expression();
            this.state = 1913;
            this.match(Stage9Parser.RPAREN);
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
        this.enterRule(localContext, 280, Stage9Parser.RULE_condExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1915;
            this.match(Stage9Parser.LPAREN);
            this.state = 1916;
            this.match(Stage9Parser.COND);
            this.state = 1918;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 1917;
                this.condClause();
                }
                }
                this.state = 1920;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 98)) & ~0x1F) === 0 && ((1 << (_la - 98)) & 4194336775) !== 0) || ((((_la - 130)) & ~0x1F) === 0 && ((1 << (_la - 130)) & 16775937) !== 0) || ((((_la - 164)) & ~0x1F) === 0 && ((1 << (_la - 164)) & 251) !== 0));
            this.state = 1923;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 122) {
                {
                this.state = 1922;
                this.condElseClause();
                }
            }

            this.state = 1925;
            this.match(Stage9Parser.RPAREN);
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
    public condClause(): CondClauseContext {
        let localContext = new CondClauseContext(this.context, this.state);
        this.enterRule(localContext, 282, Stage9Parser.RULE_condClause);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1927;
            this.expression();
            this.state = 1928;
            this.expression();
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
    public condElseClause(): CondElseClauseContext {
        let localContext = new CondElseClauseContext(this.context, this.state);
        this.enterRule(localContext, 284, Stage9Parser.RULE_condElseClause);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1930;
            this.match(Stage9Parser.ELSE);
            this.state = 1931;
            this.expression();
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
        this.enterRule(localContext, 286, Stage9Parser.RULE_newForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1933;
            this.match(Stage9Parser.LPAREN);
            this.state = 1934;
            this.match(Stage9Parser.NEW);
            this.state = 1935;
            this.match(Stage9Parser.IDENTIFIER);
            this.state = 1937;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 147, this.context) ) {
            case 1:
                {
                this.state = 1936;
                this.typeArgs();
                }
                break;
            }
            this.state = 1942;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 98)) & ~0x1F) === 0 && ((1 << (_la - 98)) & 4194336775) !== 0) || ((((_la - 130)) & ~0x1F) === 0 && ((1 << (_la - 130)) & 16775937) !== 0) || ((((_la - 164)) & ~0x1F) === 0 && ((1 << (_la - 164)) & 251) !== 0)) {
                {
                {
                this.state = 1939;
                this.expression();
                }
                }
                this.state = 1944;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1945;
            this.match(Stage9Parser.RPAREN);
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
        this.enterRule(localContext, 288, Stage9Parser.RULE_objectExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1947;
            this.match(Stage9Parser.LPAREN);
            this.state = 1948;
            this.match(Stage9Parser.OBJECT);
            this.state = 1952;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 1949;
                this.objectField();
                }
                }
                this.state = 1954;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1955;
            this.match(Stage9Parser.RPAREN);
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
        this.enterRule(localContext, 290, Stage9Parser.RULE_objectField);
        try {
            this.state = 1984;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 150, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1957;
                this.match(Stage9Parser.LPAREN);
                this.state = 1958;
                this.propKey();
                this.state = 1959;
                this.expression();
                this.state = 1960;
                this.match(Stage9Parser.RPAREN);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1962;
                this.match(Stage9Parser.LPAREN);
                this.state = 1963;
                this.propKey();
                this.state = 1964;
                this.methodDef();
                this.state = 1965;
                this.match(Stage9Parser.RPAREN);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 1967;
                this.match(Stage9Parser.LPAREN);
                this.state = 1968;
                this.match(Stage9Parser.IDENTIFIER);
                this.state = 1969;
                this.match(Stage9Parser.RPAREN);
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 1970;
                this.match(Stage9Parser.LPAREN);
                this.state = 1971;
                this.match(Stage9Parser.LBRACK);
                this.state = 1972;
                this.expression();
                this.state = 1973;
                this.match(Stage9Parser.RBRACK);
                this.state = 1974;
                this.expression();
                this.state = 1975;
                this.match(Stage9Parser.RPAREN);
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 1977;
                this.match(Stage9Parser.LPAREN);
                this.state = 1978;
                this.match(Stage9Parser.LBRACK);
                this.state = 1979;
                this.expression();
                this.state = 1980;
                this.match(Stage9Parser.RBRACK);
                this.state = 1981;
                this.methodDef();
                this.state = 1982;
                this.match(Stage9Parser.RPAREN);
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
    public methodDef(): MethodDefContext {
        let localContext = new MethodDefContext(this.context, this.state);
        this.enterRule(localContext, 292, Stage9Parser.RULE_methodDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1986;
            this.match(Stage9Parser.LPAREN);
            this.state = 1987;
            this.match(Stage9Parser.METHOD);
            this.state = 1988;
            this.fnSignature();
            this.state = 1992;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 98)) & ~0x1F) === 0 && ((1 << (_la - 98)) & 4194336775) !== 0) || ((((_la - 130)) & ~0x1F) === 0 && ((1 << (_la - 130)) & 16775937) !== 0) || ((((_la - 164)) & ~0x1F) === 0 && ((1 << (_la - 164)) & 251) !== 0)) {
                {
                {
                this.state = 1989;
                this.statement();
                }
                }
                this.state = 1994;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1995;
            this.match(Stage9Parser.RPAREN);
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
        this.enterRule(localContext, 294, Stage9Parser.RULE_arrayExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1997;
            this.match(Stage9Parser.LPAREN);
            this.state = 1998;
            this.match(Stage9Parser.ARRAY);
            this.state = 2002;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 98)) & ~0x1F) === 0 && ((1 << (_la - 98)) & 4194336775) !== 0) || ((((_la - 130)) & ~0x1F) === 0 && ((1 << (_la - 130)) & 16775937) !== 0) || ((((_la - 164)) & ~0x1F) === 0 && ((1 << (_la - 164)) & 251) !== 0)) {
                {
                {
                this.state = 1999;
                this.expression();
                }
                }
                this.state = 2004;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 2005;
            this.match(Stage9Parser.RPAREN);
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
    public bracketArrayExpr(): BracketArrayExprContext {
        let localContext = new BracketArrayExprContext(this.context, this.state);
        this.enterRule(localContext, 296, Stage9Parser.RULE_bracketArrayExpr);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2007;
            this.match(Stage9Parser.LBRACK);
            this.state = 2021;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 98)) & ~0x1F) === 0 && ((1 << (_la - 98)) & 4194336775) !== 0) || ((((_la - 130)) & ~0x1F) === 0 && ((1 << (_la - 130)) & 16775937) !== 0) || ((((_la - 164)) & ~0x1F) === 0 && ((1 << (_la - 164)) & 251) !== 0)) {
                {
                this.state = 2008;
                this.expression();
                this.state = 2015;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 154, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 2010;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                        if (_la === 4) {
                            {
                            this.state = 2009;
                            this.match(Stage9Parser.COMMA);
                            }
                        }

                        this.state = 2012;
                        this.expression();
                        }
                        }
                    }
                    this.state = 2017;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 154, this.context);
                }
                this.state = 2019;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 4) {
                    {
                    this.state = 2018;
                    this.match(Stage9Parser.COMMA);
                    }
                }

                }
            }

            this.state = 2023;
            this.match(Stage9Parser.RBRACK);
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
    public braceObjectExpr(): BraceObjectExprContext {
        let localContext = new BraceObjectExprContext(this.context, this.state);
        this.enterRule(localContext, 298, Stage9Parser.RULE_braceObjectExpr);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2025;
            this.match(Stage9Parser.LBRACE);
            this.state = 2039;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 123 || _la === 165 || _la === 171) {
                {
                this.state = 2026;
                this.braceObjectField();
                this.state = 2033;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 158, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 2028;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                        if (_la === 4) {
                            {
                            this.state = 2027;
                            this.match(Stage9Parser.COMMA);
                            }
                        }

                        this.state = 2030;
                        this.braceObjectField();
                        }
                        }
                    }
                    this.state = 2035;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 158, this.context);
                }
                this.state = 2037;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 4) {
                    {
                    this.state = 2036;
                    this.match(Stage9Parser.COMMA);
                    }
                }

                }
            }

            this.state = 2041;
            this.match(Stage9Parser.RBRACE);
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
    public braceObjectField(): BraceObjectFieldContext {
        let localContext = new BraceObjectFieldContext(this.context, this.state);
        this.enterRule(localContext, 300, Stage9Parser.RULE_braceObjectField);
        let _la: number;
        try {
            this.state = 2053;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 161, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 2043;
                _la = this.tokenStream.LA(1);
                if(!(_la === 165 || _la === 171)) {
                this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                this.state = 2044;
                this.match(Stage9Parser.COLON);
                this.state = 2045;
                this.expression();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 2046;
                this.match(Stage9Parser.LBRACK);
                this.state = 2047;
                this.expression();
                this.state = 2048;
                this.match(Stage9Parser.RBRACK);
                this.state = 2049;
                this.match(Stage9Parser.COLON);
                this.state = 2050;
                this.expression();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 2052;
                this.match(Stage9Parser.IDENTIFIER);
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
    public templateExpr(): TemplateExprContext {
        let localContext = new TemplateExprContext(this.context, this.state);
        this.enterRule(localContext, 302, Stage9Parser.RULE_templateExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2055;
            this.match(Stage9Parser.LPAREN);
            this.state = 2056;
            this.match(Stage9Parser.TEMPLATE);
            this.state = 2059;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                this.state = 2059;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 162, this.context) ) {
                case 1:
                    {
                    this.state = 2057;
                    this.match(Stage9Parser.STRING);
                    }
                    break;
                case 2:
                    {
                    this.state = 2058;
                    this.expression();
                    }
                    break;
                }
                }
                this.state = 2061;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 98)) & ~0x1F) === 0 && ((1 << (_la - 98)) & 4194336775) !== 0) || ((((_la - 130)) & ~0x1F) === 0 && ((1 << (_la - 130)) & 16775937) !== 0) || ((((_la - 164)) & ~0x1F) === 0 && ((1 << (_la - 164)) & 251) !== 0));
            this.state = 2063;
            this.match(Stage9Parser.RPAREN);
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
    public propKey(): PropKeyContext {
        let localContext = new PropKeyContext(this.context, this.state);
        this.enterRule(localContext, 304, Stage9Parser.RULE_propKey);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2065;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 5)) & ~0x1F) === 0 && ((1 << (_la - 5)) & 4244635647) !== 0) || ((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 4294967295) !== 0) || ((((_la - 73)) & ~0x1F) === 0 && ((1 << (_la - 73)) & 4009754623) !== 0) || ((((_la - 105)) & ~0x1F) === 0 && ((1 << (_la - 105)) & 66322431) !== 0) || ((((_la - 142)) & ~0x1F) === 0 && ((1 << (_la - 142)) & 822083583) !== 0))) {
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
    public opSymbol(): OpSymbolContext {
        let localContext = new OpSymbolContext(this.context, this.state);
        this.enterRule(localContext, 306, Stage9Parser.RULE_opSymbol);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2067;
            _la = this.tokenStream.LA(1);
            if(!(_la === 42 || ((((_la - 113)) & ~0x1F) === 0 && ((1 << (_la - 113)) & 3791908865) !== 0) || ((((_la - 145)) & ~0x1F) === 0 && ((1 << (_la - 145)) & 33554943) !== 0))) {
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
    public propAccess(): PropAccessContext {
        let localContext = new PropAccessContext(this.context, this.state);
        this.enterRule(localContext, 308, Stage9Parser.RULE_propAccess);
        try {
            this.state = 2083;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 164, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 2069;
                this.match(Stage9Parser.LPAREN);
                this.state = 2070;
                this.match(Stage9Parser.DOT);
                this.state = 2071;
                this.expression();
                this.state = 2072;
                this.propKey();
                this.state = 2073;
                this.match(Stage9Parser.RPAREN);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 2075;
                this.match(Stage9Parser.LPAREN);
                this.state = 2076;
                this.match(Stage9Parser.DOT);
                this.state = 2077;
                this.expression();
                this.state = 2078;
                this.match(Stage9Parser.LBRACK);
                this.state = 2079;
                this.expression();
                this.state = 2080;
                this.match(Stage9Parser.RBRACK);
                this.state = 2081;
                this.match(Stage9Parser.RPAREN);
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
    public subscriptAccess(): SubscriptAccessContext {
        let localContext = new SubscriptAccessContext(this.context, this.state);
        this.enterRule(localContext, 310, Stage9Parser.RULE_subscriptAccess);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2085;
            this.match(Stage9Parser.LPAREN);
            this.state = 2086;
            this.match(Stage9Parser.SUBSCRIPT);
            this.state = 2087;
            this.expression();
            this.state = 2088;
            this.match(Stage9Parser.STRING);
            this.state = 2089;
            this.match(Stage9Parser.RPAREN);
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
        this.enterRule(localContext, 312, Stage9Parser.RULE_indexAccess);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2091;
            this.match(Stage9Parser.LPAREN);
            this.state = 2092;
            this.match(Stage9Parser.INDEX);
            this.state = 2093;
            this.expression();
            this.state = 2094;
            this.expression();
            this.state = 2095;
            this.match(Stage9Parser.RPAREN);
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
        this.enterRule(localContext, 314, Stage9Parser.RULE_quasiquote);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2097;
            this.match(Stage9Parser.LPAREN);
            this.state = 2098;
            _la = this.tokenStream.LA(1);
            if(!(_la === 43 || _la === 44)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 2099;
            this.quasiForm();
            this.state = 2100;
            this.match(Stage9Parser.RPAREN);
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
    public quasiForm(): QuasiFormContext {
        let localContext = new QuasiFormContext(this.context, this.state);
        this.enterRule(localContext, 316, Stage9Parser.RULE_quasiForm);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2102;
            this.sForm();
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
    public sForm(): SFormContext {
        let localContext = new SFormContext(this.context, this.state);
        this.enterRule(localContext, 318, Stage9Parser.RULE_sForm);
        let _la: number;
        try {
            this.state = 2127;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 166, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 2104;
                this.match(Stage9Parser.LPAREN);
                this.state = 2105;
                this.match(Stage9Parser.UNQUOTE);
                this.state = 2106;
                this.expression();
                this.state = 2107;
                this.match(Stage9Parser.RPAREN);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 2109;
                this.match(Stage9Parser.LPAREN);
                this.state = 2110;
                this.match(Stage9Parser.UNQUOTE_SPLICING);
                this.state = 2111;
                this.expression();
                this.state = 2112;
                this.match(Stage9Parser.RPAREN);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 2114;
                this.match(Stage9Parser.TILDE);
                this.state = 2115;
                this.expression();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 2116;
                this.match(Stage9Parser.TILDE_AT);
                this.state = 2117;
                this.expression();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 2118;
                this.match(Stage9Parser.LPAREN);
                this.state = 2122;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4294967286) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 4294967295) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 4294967295) !== 0) || ((((_la - 96)) & ~0x1F) === 0 && ((1 << (_la - 96)) & 4294967295) !== 0) || ((((_la - 128)) & ~0x1F) === 0 && ((1 << (_la - 128)) & 4294967295) !== 0) || ((((_la - 160)) & ~0x1F) === 0 && ((1 << (_la - 160)) & 8191) !== 0)) {
                    {
                    {
                    this.state = 2119;
                    this.sForm();
                    }
                    }
                    this.state = 2124;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 2125;
                this.match(Stage9Parser.RPAREN);
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 2126;
                _la = this.tokenStream.LA(1);
                if(_la<=0 || _la === 2 || _la === 3 || _la === 169 || _la === 170) {
                this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
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
    public unquote(): UnquoteContext {
        let localContext = new UnquoteContext(this.context, this.state);
        this.enterRule(localContext, 320, Stage9Parser.RULE_unquote);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2129;
            this.match(Stage9Parser.LPAREN);
            this.state = 2130;
            this.match(Stage9Parser.UNQUOTE);
            this.state = 2131;
            this.expression();
            this.state = 2132;
            this.match(Stage9Parser.RPAREN);
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
        this.enterRule(localContext, 322, Stage9Parser.RULE_unquoteSplicing);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2134;
            this.match(Stage9Parser.LPAREN);
            this.state = 2135;
            this.match(Stage9Parser.UNQUOTE_SPLICING);
            this.state = 2136;
            this.expression();
            this.state = 2137;
            this.match(Stage9Parser.RPAREN);
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
    public tildeUnquote(): TildeUnquoteContext {
        let localContext = new TildeUnquoteContext(this.context, this.state);
        this.enterRule(localContext, 324, Stage9Parser.RULE_tildeUnquote);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2139;
            this.match(Stage9Parser.TILDE);
            this.state = 2140;
            this.expression();
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
    public tildeUnquoteSplice(): TildeUnquoteSpliceContext {
        let localContext = new TildeUnquoteSpliceContext(this.context, this.state);
        this.enterRule(localContext, 326, Stage9Parser.RULE_tildeUnquoteSplice);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2142;
            this.match(Stage9Parser.TILDE_AT);
            this.state = 2143;
            this.expression();
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
        this.enterRule(localContext, 328, Stage9Parser.RULE_optChain);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2145;
            this.match(Stage9Parser.LPAREN);
            this.state = 2146;
            this.match(Stage9Parser.OPTCHAIN);
            this.state = 2147;
            this.expression();
            this.state = 2148;
            this.propKey();
            this.state = 2149;
            this.match(Stage9Parser.RPAREN);
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
    public optChainIndex(): OptChainIndexContext {
        let localContext = new OptChainIndexContext(this.context, this.state);
        this.enterRule(localContext, 330, Stage9Parser.RULE_optChainIndex);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2151;
            this.match(Stage9Parser.LPAREN);
            this.state = 2152;
            this.match(Stage9Parser.OPTCHAIN_INDEX);
            this.state = 2153;
            this.expression();
            this.state = 2154;
            this.expression();
            this.state = 2155;
            this.match(Stage9Parser.RPAREN);
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
        this.enterRule(localContext, 332, Stage9Parser.RULE_nullCoalesce);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2157;
            this.match(Stage9Parser.LPAREN);
            this.state = 2158;
            this.match(Stage9Parser.NULLCOAL);
            this.state = 2159;
            this.expression();
            this.state = 2160;
            this.expression();
            this.state = 2161;
            this.match(Stage9Parser.RPAREN);
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
    public infixExpr(): InfixExprContext {
        let localContext = new InfixExprContext(this.context, this.state);
        this.enterRule(localContext, 334, Stage9Parser.RULE_infixExpr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2163;
            this.match(Stage9Parser.HASH_LBRACE);
            this.state = 2164;
            this.infixBody();
            this.state = 2165;
            this.match(Stage9Parser.RBRACE);
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
    public infixBody(): InfixBodyContext {
        let localContext = new InfixBodyContext(this.context, this.state);
        this.enterRule(localContext, 336, Stage9Parser.RULE_infixBody);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2167;
            this.infixAtom(0);
            this.state = 2173;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 42 || ((((_la - 113)) & ~0x1F) === 0 && ((1 << (_la - 113)) & 3758354433) !== 0) || ((((_la - 145)) & ~0x1F) === 0 && ((1 << (_la - 145)) & 8389055) !== 0)) {
                {
                {
                this.state = 2168;
                this.infixBinOp();
                this.state = 2169;
                this.infixAtom(0);
                }
                }
                this.state = 2175;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
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

    public infixAtom(): InfixAtomContext;
    public infixAtom(_p: number): InfixAtomContext;
    public infixAtom(_p?: number): InfixAtomContext {
        if (_p === undefined) {
            _p = 0;
        }

        let parentContext = this.context;
        let parentState = this.state;
        let localContext = new InfixAtomContext(this.context, parentState);
        let previousContext = localContext;
        let _startState = 338;
        this.enterRecursionRule(localContext, 338, Stage9Parser.RULE_infixAtom, _p);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2192;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 169, this.context) ) {
            case 1:
                {
                this.state = 2177;
                this.match(Stage9Parser.IDENTIFIER);
                this.state = 2178;
                this.match(Stage9Parser.LPAREN);
                this.state = 2180;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (((((_la - 98)) & ~0x1F) === 0 && ((1 << (_la - 98)) & 7) !== 0) || ((((_la - 139)) & ~0x1F) === 0 && ((1 << (_la - 139)) & 3053457409) !== 0) || _la === 171) {
                    {
                    this.state = 2179;
                    this.infixArgs();
                    }
                }

                this.state = 2182;
                this.match(Stage9Parser.RPAREN);
                }
                break;
            case 2:
                {
                this.state = 2183;
                this.match(Stage9Parser.LBRACE);
                this.state = 2184;
                this.infixBody();
                this.state = 2185;
                this.match(Stage9Parser.RBRACE);
                }
                break;
            case 3:
                {
                this.state = 2187;
                this.infixUnaryOp();
                this.state = 2188;
                this.infixAtom(3);
                }
                break;
            case 4:
                {
                this.state = 2190;
                this.literal();
                }
                break;
            case 5:
                {
                this.state = 2191;
                this.match(Stage9Parser.IDENTIFIER);
                }
                break;
            }
            this.context!.stop = this.tokenStream.LT(-1);
            this.state = 2202;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 171, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    if (this.parseListeners != null) {
                        this.triggerExitRuleEvent();
                    }
                    previousContext = localContext;
                    {
                    {
                    localContext = new InfixAtomContext(parentContext, parentState);
                    this.pushNewRecursionContext(localContext, _startState, Stage9Parser.RULE_infixAtom);
                    this.state = 2194;
                    if (!(this.precpred(this.context, 5))) {
                        throw this.createFailedPredicateException("this.precpred(this.context, 5)");
                    }
                    this.state = 2195;
                    this.match(Stage9Parser.LPAREN);
                    this.state = 2197;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    if (((((_la - 98)) & ~0x1F) === 0 && ((1 << (_la - 98)) & 7) !== 0) || ((((_la - 139)) & ~0x1F) === 0 && ((1 << (_la - 139)) & 3053457409) !== 0) || _la === 171) {
                        {
                        this.state = 2196;
                        this.infixArgs();
                        }
                    }

                    this.state = 2199;
                    this.match(Stage9Parser.RPAREN);
                    }
                    }
                }
                this.state = 2204;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 171, this.context);
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
            this.unrollRecursionContexts(parentContext);
        }
        return localContext;
    }
    public infixArgs(): InfixArgsContext {
        let localContext = new InfixArgsContext(this.context, this.state);
        this.enterRule(localContext, 340, Stage9Parser.RULE_infixArgs);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2205;
            this.infixBody();
            this.state = 2210;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 4) {
                {
                {
                this.state = 2206;
                this.match(Stage9Parser.COMMA);
                this.state = 2207;
                this.infixBody();
                }
                }
                this.state = 2212;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
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
    public infixUnaryOp(): InfixUnaryOpContext {
        let localContext = new InfixUnaryOpContext(this.context, this.state);
        this.enterRule(localContext, 342, Stage9Parser.RULE_infixUnaryOp);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2213;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 151)) & ~0x1F) === 0 && ((1 << (_la - 151)) & 655361) !== 0))) {
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
    public infixBinOp(): InfixBinOpContext {
        let localContext = new InfixBinOpContext(this.context, this.state);
        this.enterRule(localContext, 344, Stage9Parser.RULE_infixBinOp);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2215;
            _la = this.tokenStream.LA(1);
            if(!(_la === 42 || ((((_la - 113)) & ~0x1F) === 0 && ((1 << (_la - 113)) & 3758354433) !== 0) || ((((_la - 145)) & ~0x1F) === 0 && ((1 << (_la - 145)) & 8389055) !== 0))) {
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
    public macroExprCall(): MacroExprCallContext {
        let localContext = new MacroExprCallContext(this.context, this.state);
        this.enterRule(localContext, 346, Stage9Parser.RULE_macroExprCall);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2217;
            this.match(Stage9Parser.LPAREN);
            this.state = 2218;
            this.match(Stage9Parser.IDENTIFIER);
            this.state = 2222;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 98)) & ~0x1F) === 0 && ((1 << (_la - 98)) & 4194336775) !== 0) || ((((_la - 130)) & ~0x1F) === 0 && ((1 << (_la - 130)) & 16775937) !== 0) || ((((_la - 164)) & ~0x1F) === 0 && ((1 << (_la - 164)) & 251) !== 0)) {
                {
                {
                this.state = 2219;
                this.expression();
                }
                }
                this.state = 2224;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 2225;
            this.match(Stage9Parser.FAT_ARROW);
            this.state = 2229;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 98)) & ~0x1F) === 0 && ((1 << (_la - 98)) & 4194336775) !== 0) || ((((_la - 130)) & ~0x1F) === 0 && ((1 << (_la - 130)) & 16775937) !== 0) || ((((_la - 164)) & ~0x1F) === 0 && ((1 << (_la - 164)) & 251) !== 0)) {
                {
                {
                this.state = 2226;
                this.statement();
                }
                }
                this.state = 2231;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 2232;
            this.match(Stage9Parser.RPAREN);
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
    public macroBodyCall(): MacroBodyCallContext {
        let localContext = new MacroBodyCallContext(this.context, this.state);
        this.enterRule(localContext, 348, Stage9Parser.RULE_macroBodyCall);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2234;
            this.match(Stage9Parser.LPAREN);
            this.state = 2235;
            this.match(Stage9Parser.IDENTIFIER);
            this.state = 2239;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 98)) & ~0x1F) === 0 && ((1 << (_la - 98)) & 4194336775) !== 0) || ((((_la - 130)) & ~0x1F) === 0 && ((1 << (_la - 130)) & 16775937) !== 0) || ((((_la - 164)) & ~0x1F) === 0 && ((1 << (_la - 164)) & 251) !== 0)) {
                {
                {
                this.state = 2236;
                this.expression();
                }
                }
                this.state = 2241;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 2242;
            this.match(Stage9Parser.STMT_ARROW);
            this.state = 2246;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 98)) & ~0x1F) === 0 && ((1 << (_la - 98)) & 4194336775) !== 0) || ((((_la - 130)) & ~0x1F) === 0 && ((1 << (_la - 130)) & 16775937) !== 0) || ((((_la - 164)) & ~0x1F) === 0 && ((1 << (_la - 164)) & 251) !== 0)) {
                {
                {
                this.state = 2243;
                this.statement();
                }
                }
                this.state = 2248;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 2249;
            this.match(Stage9Parser.RPAREN);
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
        this.enterRule(localContext, 350, Stage9Parser.RULE_call);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2251;
            this.match(Stage9Parser.LPAREN);
            this.state = 2252;
            this.expression();
            this.state = 2254;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 177, this.context) ) {
            case 1:
                {
                this.state = 2253;
                this.typeArgs();
                }
                break;
            }
            this.state = 2259;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 98)) & ~0x1F) === 0 && ((1 << (_la - 98)) & 4194336775) !== 0) || ((((_la - 130)) & ~0x1F) === 0 && ((1 << (_la - 130)) & 16775937) !== 0) || ((((_la - 164)) & ~0x1F) === 0 && ((1 << (_la - 164)) & 251) !== 0)) {
                {
                {
                this.state = 2256;
                this.expression();
                }
                }
                this.state = 2261;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 2262;
            this.match(Stage9Parser.RPAREN);
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
    public typeArgs(): TypeArgsContext {
        let localContext = new TypeArgsContext(this.context, this.state);
        this.enterRule(localContext, 352, Stage9Parser.RULE_typeArgs);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2264;
            this.match(Stage9Parser.LPAREN);
            this.state = 2265;
            this.match(Stage9Parser.TYPE_ARGS);
            this.state = 2267;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 2266;
                this.typeExpr();
                }
                }
                this.state = 2269;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 34 || _la === 99 || _la === 100 || _la === 139 || _la === 171);
            this.state = 2271;
            this.match(Stage9Parser.RPAREN);
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
        this.enterRule(localContext, 354, Stage9Parser.RULE_fnSignature);
        let _la: number;
        try {
            let alternative: number;
            this.state = 2304;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 187, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 2273;
                this.match(Stage9Parser.LPAREN);
                this.state = 2290;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 2) {
                    {
                    this.state = 2274;
                    this.param();
                    this.state = 2281;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 181, this.context);
                    while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                        if (alternative === 1) {
                            {
                            {
                            this.state = 2276;
                            this.errorHandler.sync(this);
                            _la = this.tokenStream.LA(1);
                            if (_la === 4) {
                                {
                                this.state = 2275;
                                this.match(Stage9Parser.COMMA);
                                }
                            }

                            this.state = 2278;
                            this.param();
                            }
                            }
                        }
                        this.state = 2283;
                        this.errorHandler.sync(this);
                        alternative = this.interpreter.adaptivePredict(this.tokenStream, 181, this.context);
                    }
                    this.state = 2288;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    if (_la === 2 || _la === 4) {
                        {
                        this.state = 2285;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                        if (_la === 4) {
                            {
                            this.state = 2284;
                            this.match(Stage9Parser.COMMA);
                            }
                        }

                        this.state = 2287;
                        this.restParam();
                        }
                    }

                    }
                }

                this.state = 2292;
                this.match(Stage9Parser.RPAREN);
                this.state = 2295;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 101) {
                    {
                    this.state = 2293;
                    this.match(Stage9Parser.COLON);
                    this.state = 2294;
                    this.typeExpr();
                    }
                }

                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 2297;
                this.match(Stage9Parser.LPAREN);
                this.state = 2298;
                this.restParam();
                this.state = 2299;
                this.match(Stage9Parser.RPAREN);
                this.state = 2302;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 101) {
                    {
                    this.state = 2300;
                    this.match(Stage9Parser.COLON);
                    this.state = 2301;
                    this.typeExpr();
                    }
                }

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
    public param(): ParamContext {
        let localContext = new ParamContext(this.context, this.state);
        this.enterRule(localContext, 356, Stage9Parser.RULE_param);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2306;
            this.match(Stage9Parser.LPAREN);
            this.state = 2307;
            this.match(Stage9Parser.IDENTIFIER);
            this.state = 2309;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 97) {
                {
                this.state = 2308;
                this.match(Stage9Parser.OPTIONAL);
                }
            }

            this.state = 2313;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 101) {
                {
                this.state = 2311;
                this.match(Stage9Parser.COLON);
                this.state = 2312;
                this.typeExpr();
                }
            }

            this.state = 2315;
            this.match(Stage9Parser.RPAREN);
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
    public restParam(): RestParamContext {
        let localContext = new RestParamContext(this.context, this.state);
        this.enterRule(localContext, 358, Stage9Parser.RULE_restParam);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2317;
            this.match(Stage9Parser.LPAREN);
            this.state = 2318;
            this.match(Stage9Parser.REST);
            this.state = 2319;
            this.match(Stage9Parser.IDENTIFIER);
            this.state = 2322;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 101) {
                {
                this.state = 2320;
                this.match(Stage9Parser.COLON);
                this.state = 2321;
                this.typeExpr();
                }
            }

            this.state = 2324;
            this.match(Stage9Parser.RPAREN);
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
        this.enterRule(localContext, 360, Stage9Parser.RULE_literal);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2326;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 98)) & ~0x1F) === 0 && ((1 << (_la - 98)) & 7) !== 0) || ((((_la - 164)) & ~0x1F) === 0 && ((1 << (_la - 164)) & 11) !== 0))) {
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

    public override sempred(localContext: antlr.ParserRuleContext | null, ruleIndex: number, predIndex: number): boolean {
        switch (ruleIndex) {
        case 169:
            return this.infixAtom_sempred(localContext as InfixAtomContext, predIndex);
        }
        return true;
    }
    private infixAtom_sempred(localContext: InfixAtomContext | null, predIndex: number): boolean {
        switch (predIndex) {
        case 0:
            return this.precpred(this.context, 5);
        }
        return true;
    }

    public static readonly _serializedATN: number[] = [
        4,1,172,2329,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,
        7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,
        13,2,14,7,14,2,15,7,15,2,16,7,16,2,17,7,17,2,18,7,18,2,19,7,19,2,
        20,7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,24,2,25,7,25,2,26,7,
        26,2,27,7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,31,7,31,2,32,7,32,2,
        33,7,33,2,34,7,34,2,35,7,35,2,36,7,36,2,37,7,37,2,38,7,38,2,39,7,
        39,2,40,7,40,2,41,7,41,2,42,7,42,2,43,7,43,2,44,7,44,2,45,7,45,2,
        46,7,46,2,47,7,47,2,48,7,48,2,49,7,49,2,50,7,50,2,51,7,51,2,52,7,
        52,2,53,7,53,2,54,7,54,2,55,7,55,2,56,7,56,2,57,7,57,2,58,7,58,2,
        59,7,59,2,60,7,60,2,61,7,61,2,62,7,62,2,63,7,63,2,64,7,64,2,65,7,
        65,2,66,7,66,2,67,7,67,2,68,7,68,2,69,7,69,2,70,7,70,2,71,7,71,2,
        72,7,72,2,73,7,73,2,74,7,74,2,75,7,75,2,76,7,76,2,77,7,77,2,78,7,
        78,2,79,7,79,2,80,7,80,2,81,7,81,2,82,7,82,2,83,7,83,2,84,7,84,2,
        85,7,85,2,86,7,86,2,87,7,87,2,88,7,88,2,89,7,89,2,90,7,90,2,91,7,
        91,2,92,7,92,2,93,7,93,2,94,7,94,2,95,7,95,2,96,7,96,2,97,7,97,2,
        98,7,98,2,99,7,99,2,100,7,100,2,101,7,101,2,102,7,102,2,103,7,103,
        2,104,7,104,2,105,7,105,2,106,7,106,2,107,7,107,2,108,7,108,2,109,
        7,109,2,110,7,110,2,111,7,111,2,112,7,112,2,113,7,113,2,114,7,114,
        2,115,7,115,2,116,7,116,2,117,7,117,2,118,7,118,2,119,7,119,2,120,
        7,120,2,121,7,121,2,122,7,122,2,123,7,123,2,124,7,124,2,125,7,125,
        2,126,7,126,2,127,7,127,2,128,7,128,2,129,7,129,2,130,7,130,2,131,
        7,131,2,132,7,132,2,133,7,133,2,134,7,134,2,135,7,135,2,136,7,136,
        2,137,7,137,2,138,7,138,2,139,7,139,2,140,7,140,2,141,7,141,2,142,
        7,142,2,143,7,143,2,144,7,144,2,145,7,145,2,146,7,146,2,147,7,147,
        2,148,7,148,2,149,7,149,2,150,7,150,2,151,7,151,2,152,7,152,2,153,
        7,153,2,154,7,154,2,155,7,155,2,156,7,156,2,157,7,157,2,158,7,158,
        2,159,7,159,2,160,7,160,2,161,7,161,2,162,7,162,2,163,7,163,2,164,
        7,164,2,165,7,165,2,166,7,166,2,167,7,167,2,168,7,168,2,169,7,169,
        2,170,7,170,2,171,7,171,2,172,7,172,2,173,7,173,2,174,7,174,2,175,
        7,175,2,176,7,176,2,177,7,177,2,178,7,178,2,179,7,179,2,180,7,180,
        1,0,1,0,1,0,5,0,366,8,0,10,0,12,0,369,9,0,1,0,1,0,1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,1,389,8,1,1,
        2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,3,2,399,8,2,1,3,1,3,1,3,1,3,1,3,5,
        3,406,8,3,10,3,12,3,409,9,3,1,3,1,3,1,4,1,4,5,4,415,8,4,10,4,12,
        4,418,9,4,1,4,1,4,3,4,422,8,4,3,4,424,8,4,1,4,1,4,1,5,1,5,1,5,1,
        5,1,5,1,5,1,5,1,5,1,5,1,5,3,5,438,8,5,1,6,1,6,1,6,1,6,1,6,1,6,1,
        7,1,7,1,7,4,7,449,8,7,11,7,12,7,450,1,7,1,7,1,8,1,8,1,9,1,9,1,9,
        1,9,5,9,461,8,9,10,9,12,9,464,9,9,1,9,1,9,1,10,1,10,1,10,5,10,471,
        8,10,10,10,12,10,474,9,10,1,10,1,10,4,10,478,8,10,11,10,12,10,479,
        1,10,1,10,1,10,1,11,1,11,1,11,5,11,488,8,11,10,11,12,11,491,9,11,
        1,11,1,11,4,11,495,8,11,11,11,12,11,496,1,11,1,11,1,11,1,12,1,12,
        1,12,5,12,505,8,12,10,12,12,12,508,9,12,1,12,1,12,1,12,1,12,1,13,
        1,13,1,13,1,14,1,14,1,14,1,14,3,14,521,8,14,1,14,1,14,1,14,1,15,
        1,15,1,15,1,15,3,15,530,8,15,1,15,3,15,533,8,15,1,15,1,15,1,15,1,
        16,1,16,1,16,4,16,541,8,16,11,16,12,16,542,1,16,1,16,1,17,1,17,1,
        17,1,17,5,17,551,8,17,10,17,12,17,554,9,17,1,17,1,17,1,18,1,18,1,
        18,3,18,561,8,18,1,18,1,18,1,19,1,19,1,19,5,19,568,8,19,10,19,12,
        19,571,9,19,1,19,1,19,3,19,575,8,19,1,19,3,19,578,8,19,1,19,3,19,
        581,8,19,1,19,1,19,1,19,1,20,1,20,1,20,5,20,589,8,20,10,20,12,20,
        592,9,20,1,20,3,20,595,8,20,1,20,3,20,598,8,20,1,20,1,20,1,20,1,
        21,1,21,1,21,1,21,1,21,1,22,1,22,1,22,4,22,611,8,22,11,22,12,22,
        612,1,22,1,22,1,23,1,23,1,23,5,23,620,8,23,10,23,12,23,623,9,23,
        1,23,1,23,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,3,24,636,
        8,24,1,25,1,25,1,26,1,26,1,26,5,26,643,8,26,10,26,12,26,646,9,26,
        1,26,1,26,1,26,1,26,3,26,652,8,26,1,26,1,26,3,26,656,8,26,1,26,1,
        26,1,27,1,27,5,27,662,8,27,10,27,12,27,665,9,27,1,27,1,27,3,27,669,
        8,27,1,27,1,27,3,27,673,8,27,1,27,1,27,1,28,1,28,1,28,3,28,680,8,
        28,1,28,5,28,683,8,28,10,28,12,28,686,9,28,3,28,688,8,28,1,28,1,
        28,1,28,3,28,693,8,28,1,29,1,29,1,29,1,29,5,29,699,8,29,10,29,12,
        29,702,9,29,1,29,1,29,1,30,1,30,1,30,5,30,709,8,30,10,30,12,30,712,
        9,30,1,30,1,30,1,30,5,30,717,8,30,10,30,12,30,720,9,30,1,30,1,30,
        1,31,1,31,1,31,5,31,727,8,31,10,31,12,31,730,9,31,1,31,1,31,1,31,
        1,31,1,32,1,32,1,32,5,32,739,8,32,10,32,12,32,742,9,32,1,32,1,32,
        1,32,5,32,747,8,32,10,32,12,32,750,9,32,1,32,1,32,1,33,1,33,1,33,
        5,33,757,8,33,10,33,12,33,760,9,33,1,33,1,33,1,33,5,33,765,8,33,
        10,33,12,33,768,9,33,1,33,1,33,1,34,1,34,1,34,1,34,1,34,1,34,1,34,
        3,34,779,8,34,1,35,1,35,1,35,1,35,1,35,1,35,1,35,1,35,1,35,1,35,
        1,35,1,35,1,35,1,35,1,35,1,35,1,35,1,35,1,35,1,35,1,35,1,35,1,35,
        1,35,3,35,805,8,35,1,36,1,36,1,36,1,36,4,36,811,8,36,11,36,12,36,
        812,1,36,1,36,5,36,817,8,36,10,36,12,36,820,9,36,1,36,1,36,1,37,
        1,37,1,37,1,37,4,37,828,8,37,11,37,12,37,829,1,37,1,37,5,37,834,
        8,37,10,37,12,37,837,9,37,1,37,1,37,1,38,1,38,1,38,1,38,5,38,845,
        8,38,10,38,12,38,848,9,38,1,38,1,38,5,38,852,8,38,10,38,12,38,855,
        9,38,1,38,1,38,1,39,1,39,1,39,1,39,1,39,1,39,1,40,1,40,1,40,1,40,
        1,40,3,40,870,8,40,1,40,1,40,1,41,1,41,1,41,5,41,877,8,41,10,41,
        12,41,880,9,41,1,41,1,41,1,42,1,42,1,42,5,42,887,8,42,10,42,12,42,
        890,9,42,1,42,1,42,1,43,1,43,1,43,1,43,5,43,898,8,43,10,43,12,43,
        901,9,43,1,43,1,43,1,44,1,44,1,44,3,44,908,8,44,1,44,1,44,1,45,1,
        45,1,45,1,45,1,45,1,46,1,46,1,46,1,46,1,47,1,47,1,47,1,47,1,48,1,
        48,1,48,3,48,928,8,48,1,48,1,48,1,48,1,48,1,48,1,48,1,48,1,48,1,
        48,1,48,1,48,1,48,1,48,1,48,1,48,1,48,1,48,1,48,1,48,1,48,1,48,1,
        48,1,48,1,48,1,48,1,48,1,48,3,48,957,8,48,1,49,1,49,1,49,1,49,1,
        49,1,49,1,50,1,50,1,50,4,50,968,8,50,11,50,12,50,969,1,50,1,50,1,
        51,1,51,1,51,1,51,1,51,3,51,979,8,51,1,52,1,52,1,52,1,52,1,52,1,
        52,1,52,1,52,1,52,3,52,990,8,52,1,53,1,53,1,53,1,53,1,53,1,53,1,
        54,1,54,1,54,1,54,1,54,1,54,1,54,1,54,1,54,1,54,1,54,1,54,1,54,1,
        54,1,54,1,54,1,54,1,54,1,54,1,54,1,54,1,54,1,54,1,54,1,54,3,54,1023,
        8,54,1,55,1,55,1,55,4,55,1028,8,55,11,55,12,55,1029,1,55,1,55,1,
        56,1,56,1,56,3,56,1037,8,56,1,56,1,56,1,57,1,57,1,57,1,57,4,57,1045,
        8,57,11,57,12,57,1046,1,57,1,57,1,58,1,58,1,58,1,58,1,58,1,59,1,
        59,1,59,1,59,1,59,1,59,1,60,1,60,1,60,4,60,1065,8,60,11,60,12,60,
        1066,1,60,1,60,1,61,1,61,1,61,1,61,4,61,1075,8,61,11,61,12,61,1076,
        1,61,1,61,1,62,1,62,1,62,1,62,1,62,1,63,1,63,1,63,1,63,1,63,1,64,
        1,64,1,64,1,64,3,64,1095,8,64,1,64,1,64,1,64,1,65,1,65,1,65,1,65,
        3,65,1104,8,65,1,65,1,65,1,65,3,65,1109,8,65,1,66,1,66,5,66,1113,
        8,66,10,66,12,66,1116,9,66,1,66,1,66,1,67,1,67,5,67,1122,8,67,10,
        67,12,67,1125,9,67,1,67,1,67,1,68,1,68,1,68,1,68,1,68,1,68,1,68,
        1,68,1,68,1,68,1,68,1,68,1,68,1,68,1,68,1,68,1,68,1,68,1,68,1,68,
        1,68,3,68,1150,8,68,1,69,1,69,1,69,4,69,1155,8,69,11,69,12,69,1156,
        1,69,1,69,1,70,1,70,1,70,4,70,1164,8,70,11,70,12,70,1165,1,70,1,
        70,1,71,1,71,1,71,1,71,1,71,1,72,1,72,1,72,4,72,1178,8,72,11,72,
        12,72,1179,1,72,1,72,1,73,1,73,1,73,1,73,1,73,1,73,1,73,1,73,1,73,
        1,73,1,73,3,73,1195,8,73,1,74,1,74,1,74,3,74,1200,8,74,1,74,1,74,
        5,74,1204,8,74,10,74,12,74,1207,9,74,1,74,1,74,1,74,1,74,1,75,1,
        75,1,75,3,75,1216,8,75,1,75,1,75,1,75,1,76,1,76,1,76,5,76,1224,8,
        76,10,76,12,76,1227,9,76,1,76,1,76,1,77,1,77,5,77,1233,8,77,10,77,
        12,77,1236,9,77,1,77,1,77,3,77,1240,8,77,1,77,1,77,1,77,1,78,1,78,
        1,79,1,79,1,79,1,79,1,79,1,80,1,80,1,80,1,80,1,80,1,81,1,81,1,81,
        1,81,1,81,1,82,1,82,1,82,1,82,1,82,1,82,1,83,1,83,1,83,1,83,1,83,
        1,83,1,83,1,83,1,84,1,84,1,84,1,84,1,84,1,85,1,85,1,85,1,85,1,85,
        3,85,1286,8,85,1,85,1,85,1,85,1,86,1,86,1,86,4,86,1294,8,86,11,86,
        12,86,1295,1,86,1,86,1,87,1,87,1,88,1,88,1,88,4,88,1305,8,88,11,
        88,12,88,1306,1,88,1,88,1,89,1,89,3,89,1313,8,89,1,90,1,90,1,90,
        1,90,4,90,1319,8,90,11,90,12,90,1320,1,90,1,90,1,91,1,91,1,91,4,
        91,1328,8,91,11,91,12,91,1329,1,91,1,91,1,92,1,92,1,92,3,92,1337,
        8,92,1,92,3,92,1340,8,92,1,92,1,92,1,93,1,93,1,93,1,93,1,93,1,94,
        1,94,1,94,1,94,1,94,1,95,1,95,1,95,1,95,1,95,1,95,1,95,1,95,1,95,
        1,95,1,95,1,95,1,95,1,95,1,95,1,95,1,95,1,95,3,95,1372,8,95,1,96,
        1,96,1,96,1,96,1,96,1,96,1,96,1,96,1,96,1,96,1,96,1,96,1,96,1,96,
        1,96,1,96,1,96,1,96,1,96,1,96,1,96,1,96,1,96,1,96,1,96,1,96,1,96,
        1,96,1,96,1,96,3,96,1404,8,96,1,97,1,97,1,97,1,97,1,97,1,97,1,97,
        1,97,1,97,1,98,1,98,1,98,1,98,5,98,1419,8,98,10,98,12,98,1422,9,
        98,1,98,3,98,1425,8,98,1,98,1,98,1,99,1,99,1,99,1,99,5,99,1433,8,
        99,10,99,12,99,1436,9,99,1,99,1,99,1,100,1,100,1,100,5,100,1443,
        8,100,10,100,12,100,1446,9,100,1,100,1,100,1,101,1,101,1,101,1,101,
        1,101,1,101,5,101,1456,8,101,10,101,12,101,1459,9,101,1,101,1,101,
        1,101,1,101,1,101,1,101,1,101,1,101,1,101,1,101,1,101,5,101,1472,
        8,101,10,101,12,101,1475,9,101,1,101,1,101,3,101,1479,8,101,1,102,
        1,102,1,102,1,102,1,102,5,102,1486,8,102,10,102,12,102,1489,9,102,
        1,102,1,102,1,103,1,103,1,103,1,103,1,103,5,103,1498,8,103,10,103,
        12,103,1501,9,103,1,103,1,103,1,104,1,104,1,104,1,104,1,104,5,104,
        1510,8,104,10,104,12,104,1513,9,104,1,104,1,104,1,105,1,105,1,105,
        1,105,3,105,1521,8,105,1,105,3,105,1524,8,105,1,105,1,105,1,106,
        1,106,1,106,5,106,1531,8,106,10,106,12,106,1534,9,106,1,106,1,106,
        1,107,1,107,1,107,1,107,5,107,1542,8,107,10,107,12,107,1545,9,107,
        1,107,1,107,1,108,1,108,1,108,5,108,1552,8,108,10,108,12,108,1555,
        9,108,1,108,1,108,1,109,1,109,1,109,1,109,1,109,1,109,1,109,1,109,
        1,109,1,109,1,109,1,109,1,109,1,109,1,109,1,109,1,109,1,109,1,109,
        1,109,1,109,1,109,1,109,1,109,1,109,1,109,1,109,1,109,1,109,1,109,
        1,109,1,109,1,109,1,109,1,109,1,109,1,109,1,109,1,109,1,109,1,109,
        1,109,1,109,1,109,1,109,1,109,1,109,1,109,1,109,1,109,3,109,1609,
        8,109,1,110,1,110,1,111,1,111,1,112,1,112,1,112,5,112,1618,8,112,
        10,112,12,112,1621,9,112,1,112,1,112,1,113,1,113,1,113,1,113,5,113,
        1629,8,113,10,113,12,113,1632,9,113,1,113,1,113,1,114,1,114,1,114,
        1,114,1,114,1,115,1,115,1,115,1,115,1,115,1,115,1,116,1,116,1,116,
        1,116,5,116,1651,8,116,10,116,12,116,1654,9,116,1,116,1,116,1,117,
        1,117,1,117,3,117,1661,8,117,1,117,1,117,5,117,1665,8,117,10,117,
        12,117,1668,9,117,1,117,1,117,1,118,1,118,1,118,1,118,5,118,1676,
        8,118,10,118,12,118,1679,9,118,1,118,1,118,1,119,1,119,1,119,1,119,
        5,119,1687,8,119,10,119,12,119,1690,9,119,1,119,1,119,1,120,1,120,
        1,120,1,120,5,120,1698,8,120,10,120,12,120,1701,9,120,1,120,1,120,
        1,121,1,121,1,121,1,121,5,121,1709,8,121,10,121,12,121,1712,9,121,
        1,121,1,121,1,122,1,122,1,122,3,122,1719,8,122,1,122,1,122,5,122,
        1723,8,122,10,122,12,122,1726,9,122,1,122,1,122,1,123,1,123,1,123,
        1,123,5,123,1734,8,123,10,123,12,123,1737,9,123,1,123,1,123,1,124,
        1,124,1,124,1,124,5,124,1745,8,124,10,124,12,124,1748,9,124,1,124,
        1,124,1,125,1,125,1,125,1,125,5,125,1756,8,125,10,125,12,125,1759,
        9,125,1,125,1,125,1,126,1,126,1,126,1,126,5,126,1767,8,126,10,126,
        12,126,1770,9,126,1,126,1,126,1,127,1,127,1,127,1,127,5,127,1778,
        8,127,10,127,12,127,1781,9,127,1,127,1,127,1,128,1,128,1,128,5,128,
        1788,8,128,10,128,12,128,1791,9,128,1,128,1,128,1,128,5,128,1796,
        8,128,10,128,12,128,1799,9,128,1,128,1,128,1,129,1,129,1,129,5,129,
        1806,8,129,10,129,12,129,1809,9,129,1,129,1,129,1,129,1,129,1,130,
        1,130,1,130,1,130,5,130,1819,8,130,10,130,12,130,1822,9,130,1,130,
        1,130,1,131,1,131,5,131,1828,8,131,10,131,12,131,1831,9,131,1,131,
        3,131,1834,8,131,1,131,1,131,1,131,3,131,1839,8,131,1,132,1,132,
        1,132,3,132,1844,8,132,1,132,1,132,3,132,1848,8,132,1,132,1,132,
        1,132,1,132,1,132,3,132,1855,8,132,1,132,1,132,1,133,1,133,1,133,
        1,133,1,133,3,133,1864,8,133,1,133,1,133,1,134,1,134,1,134,1,134,
        1,134,1,135,1,135,1,135,3,135,1876,8,135,1,135,1,135,1,136,1,136,
        1,136,1,136,1,136,1,137,1,137,1,137,1,137,1,137,5,137,1890,8,137,
        10,137,12,137,1893,9,137,1,137,1,137,1,138,1,138,1,138,1,138,1,138,
        5,138,1902,8,138,10,138,12,138,1905,9,138,1,138,1,138,1,139,1,139,
        1,139,1,139,1,139,1,139,1,139,1,140,1,140,1,140,4,140,1919,8,140,
        11,140,12,140,1920,1,140,3,140,1924,8,140,1,140,1,140,1,141,1,141,
        1,141,1,142,1,142,1,142,1,143,1,143,1,143,1,143,3,143,1938,8,143,
        1,143,5,143,1941,8,143,10,143,12,143,1944,9,143,1,143,1,143,1,144,
        1,144,1,144,5,144,1951,8,144,10,144,12,144,1954,9,144,1,144,1,144,
        1,145,1,145,1,145,1,145,1,145,1,145,1,145,1,145,1,145,1,145,1,145,
        1,145,1,145,1,145,1,145,1,145,1,145,1,145,1,145,1,145,1,145,1,145,
        1,145,1,145,1,145,1,145,1,145,3,145,1985,8,145,1,146,1,146,1,146,
        1,146,5,146,1991,8,146,10,146,12,146,1994,9,146,1,146,1,146,1,147,
        1,147,1,147,5,147,2001,8,147,10,147,12,147,2004,9,147,1,147,1,147,
        1,148,1,148,1,148,3,148,2011,8,148,1,148,5,148,2014,8,148,10,148,
        12,148,2017,9,148,1,148,3,148,2020,8,148,3,148,2022,8,148,1,148,
        1,148,1,149,1,149,1,149,3,149,2029,8,149,1,149,5,149,2032,8,149,
        10,149,12,149,2035,9,149,1,149,3,149,2038,8,149,3,149,2040,8,149,
        1,149,1,149,1,150,1,150,1,150,1,150,1,150,1,150,1,150,1,150,1,150,
        1,150,3,150,2054,8,150,1,151,1,151,1,151,1,151,4,151,2060,8,151,
        11,151,12,151,2061,1,151,1,151,1,152,1,152,1,153,1,153,1,154,1,154,
        1,154,1,154,1,154,1,154,1,154,1,154,1,154,1,154,1,154,1,154,1,154,
        1,154,3,154,2084,8,154,1,155,1,155,1,155,1,155,1,155,1,155,1,156,
        1,156,1,156,1,156,1,156,1,156,1,157,1,157,1,157,1,157,1,157,1,158,
        1,158,1,159,1,159,1,159,1,159,1,159,1,159,1,159,1,159,1,159,1,159,
        1,159,1,159,1,159,1,159,1,159,1,159,5,159,2121,8,159,10,159,12,159,
        2124,9,159,1,159,1,159,3,159,2128,8,159,1,160,1,160,1,160,1,160,
        1,160,1,161,1,161,1,161,1,161,1,161,1,162,1,162,1,162,1,163,1,163,
        1,163,1,164,1,164,1,164,1,164,1,164,1,164,1,165,1,165,1,165,1,165,
        1,165,1,165,1,166,1,166,1,166,1,166,1,166,1,166,1,167,1,167,1,167,
        1,167,1,168,1,168,1,168,1,168,5,168,2172,8,168,10,168,12,168,2175,
        9,168,1,169,1,169,1,169,1,169,3,169,2181,8,169,1,169,1,169,1,169,
        1,169,1,169,1,169,1,169,1,169,1,169,1,169,3,169,2193,8,169,1,169,
        1,169,1,169,3,169,2198,8,169,1,169,5,169,2201,8,169,10,169,12,169,
        2204,9,169,1,170,1,170,1,170,5,170,2209,8,170,10,170,12,170,2212,
        9,170,1,171,1,171,1,172,1,172,1,173,1,173,1,173,5,173,2221,8,173,
        10,173,12,173,2224,9,173,1,173,1,173,5,173,2228,8,173,10,173,12,
        173,2231,9,173,1,173,1,173,1,174,1,174,1,174,5,174,2238,8,174,10,
        174,12,174,2241,9,174,1,174,1,174,5,174,2245,8,174,10,174,12,174,
        2248,9,174,1,174,1,174,1,175,1,175,1,175,3,175,2255,8,175,1,175,
        5,175,2258,8,175,10,175,12,175,2261,9,175,1,175,1,175,1,176,1,176,
        1,176,4,176,2268,8,176,11,176,12,176,2269,1,176,1,176,1,177,1,177,
        1,177,3,177,2277,8,177,1,177,5,177,2280,8,177,10,177,12,177,2283,
        9,177,1,177,3,177,2286,8,177,1,177,3,177,2289,8,177,3,177,2291,8,
        177,1,177,1,177,1,177,3,177,2296,8,177,1,177,1,177,1,177,1,177,1,
        177,3,177,2303,8,177,3,177,2305,8,177,1,178,1,178,1,178,3,178,2310,
        8,178,1,178,1,178,3,178,2314,8,178,1,178,1,178,1,179,1,179,1,179,
        1,179,1,179,3,179,2323,8,179,1,179,1,179,1,180,1,180,1,180,0,1,338,
        181,0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,
        44,46,48,50,52,54,56,58,60,62,64,66,68,70,72,74,76,78,80,82,84,86,
        88,90,92,94,96,98,100,102,104,106,108,110,112,114,116,118,120,122,
        124,126,128,130,132,134,136,138,140,142,144,146,148,150,152,154,
        156,158,160,162,164,166,168,170,172,174,176,178,180,182,184,186,
        188,190,192,194,196,198,200,202,204,206,208,210,212,214,216,218,
        220,222,224,226,228,230,232,234,236,238,240,242,244,246,248,250,
        252,254,256,258,260,262,264,266,268,270,272,274,276,278,280,282,
        284,286,288,290,292,294,296,298,300,302,304,306,308,310,312,314,
        316,318,320,322,324,326,328,330,332,334,336,338,340,342,344,346,
        348,350,352,354,356,358,360,0,12,2,0,164,165,167,167,2,0,87,87,114,
        121,2,0,98,98,164,165,2,0,87,87,97,97,2,0,165,165,171,171,8,0,5,
        28,31,36,41,96,98,100,102,122,125,130,142,165,170,171,6,0,42,42,
        113,113,125,130,138,138,142,153,170,170,1,0,43,44,2,0,2,3,169,170,
        3,0,151,151,168,168,170,170,6,0,42,42,113,113,125,130,142,150,152,
        153,168,168,3,0,98,100,164,165,167,167,2485,0,362,1,0,0,0,2,388,
        1,0,0,0,4,398,1,0,0,0,6,400,1,0,0,0,8,412,1,0,0,0,10,437,1,0,0,0,
        12,439,1,0,0,0,14,445,1,0,0,0,16,454,1,0,0,0,18,456,1,0,0,0,20,467,
        1,0,0,0,22,484,1,0,0,0,24,501,1,0,0,0,26,513,1,0,0,0,28,516,1,0,
        0,0,30,525,1,0,0,0,32,537,1,0,0,0,34,546,1,0,0,0,36,557,1,0,0,0,
        38,564,1,0,0,0,40,585,1,0,0,0,42,602,1,0,0,0,44,607,1,0,0,0,46,616,
        1,0,0,0,48,635,1,0,0,0,50,637,1,0,0,0,52,639,1,0,0,0,54,659,1,0,
        0,0,56,676,1,0,0,0,58,694,1,0,0,0,60,705,1,0,0,0,62,723,1,0,0,0,
        64,735,1,0,0,0,66,753,1,0,0,0,68,778,1,0,0,0,70,804,1,0,0,0,72,806,
        1,0,0,0,74,823,1,0,0,0,76,840,1,0,0,0,78,858,1,0,0,0,80,864,1,0,
        0,0,82,873,1,0,0,0,84,883,1,0,0,0,86,893,1,0,0,0,88,904,1,0,0,0,
        90,911,1,0,0,0,92,916,1,0,0,0,94,920,1,0,0,0,96,956,1,0,0,0,98,958,
        1,0,0,0,100,964,1,0,0,0,102,978,1,0,0,0,104,989,1,0,0,0,106,991,
        1,0,0,0,108,1022,1,0,0,0,110,1024,1,0,0,0,112,1033,1,0,0,0,114,1040,
        1,0,0,0,116,1050,1,0,0,0,118,1055,1,0,0,0,120,1061,1,0,0,0,122,1070,
        1,0,0,0,124,1080,1,0,0,0,126,1085,1,0,0,0,128,1090,1,0,0,0,130,1108,
        1,0,0,0,132,1110,1,0,0,0,134,1119,1,0,0,0,136,1149,1,0,0,0,138,1151,
        1,0,0,0,140,1160,1,0,0,0,142,1169,1,0,0,0,144,1174,1,0,0,0,146,1194,
        1,0,0,0,148,1196,1,0,0,0,150,1212,1,0,0,0,152,1220,1,0,0,0,154,1230,
        1,0,0,0,156,1244,1,0,0,0,158,1246,1,0,0,0,160,1251,1,0,0,0,162,1256,
        1,0,0,0,164,1261,1,0,0,0,166,1267,1,0,0,0,168,1275,1,0,0,0,170,1280,
        1,0,0,0,172,1290,1,0,0,0,174,1299,1,0,0,0,176,1301,1,0,0,0,178,1312,
        1,0,0,0,180,1314,1,0,0,0,182,1324,1,0,0,0,184,1333,1,0,0,0,186,1343,
        1,0,0,0,188,1348,1,0,0,0,190,1371,1,0,0,0,192,1403,1,0,0,0,194,1405,
        1,0,0,0,196,1414,1,0,0,0,198,1428,1,0,0,0,200,1439,1,0,0,0,202,1478,
        1,0,0,0,204,1480,1,0,0,0,206,1492,1,0,0,0,208,1504,1,0,0,0,210,1516,
        1,0,0,0,212,1527,1,0,0,0,214,1537,1,0,0,0,216,1548,1,0,0,0,218,1608,
        1,0,0,0,220,1610,1,0,0,0,222,1612,1,0,0,0,224,1614,1,0,0,0,226,1624,
        1,0,0,0,228,1635,1,0,0,0,230,1640,1,0,0,0,232,1646,1,0,0,0,234,1657,
        1,0,0,0,236,1671,1,0,0,0,238,1682,1,0,0,0,240,1693,1,0,0,0,242,1704,
        1,0,0,0,244,1715,1,0,0,0,246,1729,1,0,0,0,248,1740,1,0,0,0,250,1751,
        1,0,0,0,252,1762,1,0,0,0,254,1773,1,0,0,0,256,1784,1,0,0,0,258,1802,
        1,0,0,0,260,1814,1,0,0,0,262,1825,1,0,0,0,264,1840,1,0,0,0,266,1858,
        1,0,0,0,268,1867,1,0,0,0,270,1872,1,0,0,0,272,1879,1,0,0,0,274,1884,
        1,0,0,0,276,1896,1,0,0,0,278,1908,1,0,0,0,280,1915,1,0,0,0,282,1927,
        1,0,0,0,284,1930,1,0,0,0,286,1933,1,0,0,0,288,1947,1,0,0,0,290,1984,
        1,0,0,0,292,1986,1,0,0,0,294,1997,1,0,0,0,296,2007,1,0,0,0,298,2025,
        1,0,0,0,300,2053,1,0,0,0,302,2055,1,0,0,0,304,2065,1,0,0,0,306,2067,
        1,0,0,0,308,2083,1,0,0,0,310,2085,1,0,0,0,312,2091,1,0,0,0,314,2097,
        1,0,0,0,316,2102,1,0,0,0,318,2127,1,0,0,0,320,2129,1,0,0,0,322,2134,
        1,0,0,0,324,2139,1,0,0,0,326,2142,1,0,0,0,328,2145,1,0,0,0,330,2151,
        1,0,0,0,332,2157,1,0,0,0,334,2163,1,0,0,0,336,2167,1,0,0,0,338,2192,
        1,0,0,0,340,2205,1,0,0,0,342,2213,1,0,0,0,344,2215,1,0,0,0,346,2217,
        1,0,0,0,348,2234,1,0,0,0,350,2251,1,0,0,0,352,2264,1,0,0,0,354,2304,
        1,0,0,0,356,2306,1,0,0,0,358,2317,1,0,0,0,360,2326,1,0,0,0,362,363,
        5,2,0,0,363,367,5,8,0,0,364,366,3,2,1,0,365,364,1,0,0,0,366,369,
        1,0,0,0,367,365,1,0,0,0,367,368,1,0,0,0,368,370,1,0,0,0,369,367,
        1,0,0,0,370,371,5,3,0,0,371,1,1,0,0,0,372,389,3,6,3,0,373,389,3,
        10,5,0,374,389,3,12,6,0,375,389,3,14,7,0,376,389,3,18,9,0,377,389,
        3,20,10,0,378,389,3,22,11,0,379,389,3,24,12,0,380,389,3,234,117,
        0,381,389,3,244,122,0,382,389,3,28,14,0,383,389,3,30,15,0,384,389,
        3,34,17,0,385,389,3,38,19,0,386,389,3,126,63,0,387,389,3,70,35,0,
        388,372,1,0,0,0,388,373,1,0,0,0,388,374,1,0,0,0,388,375,1,0,0,0,
        388,376,1,0,0,0,388,377,1,0,0,0,388,378,1,0,0,0,388,379,1,0,0,0,
        388,380,1,0,0,0,388,381,1,0,0,0,388,382,1,0,0,0,388,383,1,0,0,0,
        388,384,1,0,0,0,388,385,1,0,0,0,388,386,1,0,0,0,388,387,1,0,0,0,
        389,3,1,0,0,0,390,399,3,20,10,0,391,399,3,22,11,0,392,399,3,24,12,
        0,393,399,3,234,117,0,394,399,3,38,19,0,395,399,3,30,15,0,396,399,
        3,34,17,0,397,399,3,28,14,0,398,390,1,0,0,0,398,391,1,0,0,0,398,
        392,1,0,0,0,398,393,1,0,0,0,398,394,1,0,0,0,398,395,1,0,0,0,398,
        396,1,0,0,0,398,397,1,0,0,0,399,5,1,0,0,0,400,401,5,2,0,0,401,402,
        5,21,0,0,402,403,5,171,0,0,403,407,3,8,4,0,404,406,3,70,35,0,405,
        404,1,0,0,0,406,409,1,0,0,0,407,405,1,0,0,0,407,408,1,0,0,0,408,
        410,1,0,0,0,409,407,1,0,0,0,410,411,5,3,0,0,411,7,1,0,0,0,412,423,
        5,2,0,0,413,415,5,171,0,0,414,413,1,0,0,0,415,418,1,0,0,0,416,414,
        1,0,0,0,416,417,1,0,0,0,417,421,1,0,0,0,418,416,1,0,0,0,419,420,
        5,86,0,0,420,422,5,171,0,0,421,419,1,0,0,0,421,422,1,0,0,0,422,424,
        1,0,0,0,423,416,1,0,0,0,423,424,1,0,0,0,424,425,1,0,0,0,425,426,
        5,3,0,0,426,9,1,0,0,0,427,428,5,2,0,0,428,429,5,22,0,0,429,430,3,
        20,10,0,430,431,5,3,0,0,431,438,1,0,0,0,432,433,5,2,0,0,433,434,
        5,22,0,0,434,435,3,24,12,0,435,436,5,3,0,0,436,438,1,0,0,0,437,427,
        1,0,0,0,437,432,1,0,0,0,438,11,1,0,0,0,439,440,5,2,0,0,440,441,5,
        5,0,0,441,442,5,171,0,0,442,443,5,165,0,0,443,444,5,3,0,0,444,13,
        1,0,0,0,445,446,5,2,0,0,446,448,5,6,0,0,447,449,3,16,8,0,448,447,
        1,0,0,0,449,450,1,0,0,0,450,448,1,0,0,0,450,451,1,0,0,0,451,452,
        1,0,0,0,452,453,5,3,0,0,453,15,1,0,0,0,454,455,5,171,0,0,455,17,
        1,0,0,0,456,457,5,2,0,0,457,458,5,7,0,0,458,462,5,171,0,0,459,461,
        5,171,0,0,460,459,1,0,0,0,461,464,1,0,0,0,462,460,1,0,0,0,462,463,
        1,0,0,0,463,465,1,0,0,0,464,462,1,0,0,0,465,466,5,3,0,0,466,19,1,
        0,0,0,467,468,5,2,0,0,468,472,5,9,0,0,469,471,3,26,13,0,470,469,
        1,0,0,0,471,474,1,0,0,0,472,470,1,0,0,0,472,473,1,0,0,0,473,475,
        1,0,0,0,474,472,1,0,0,0,475,477,5,2,0,0,476,478,3,128,64,0,477,476,
        1,0,0,0,478,479,1,0,0,0,479,477,1,0,0,0,479,480,1,0,0,0,480,481,
        1,0,0,0,481,482,5,3,0,0,482,483,5,3,0,0,483,21,1,0,0,0,484,485,5,
        2,0,0,485,489,5,10,0,0,486,488,3,26,13,0,487,486,1,0,0,0,488,491,
        1,0,0,0,489,487,1,0,0,0,489,490,1,0,0,0,490,492,1,0,0,0,491,489,
        1,0,0,0,492,494,5,2,0,0,493,495,3,128,64,0,494,493,1,0,0,0,495,496,
        1,0,0,0,496,494,1,0,0,0,496,497,1,0,0,0,497,498,1,0,0,0,498,499,
        5,3,0,0,499,500,5,3,0,0,500,23,1,0,0,0,501,502,5,2,0,0,502,506,5,
        12,0,0,503,505,3,26,13,0,504,503,1,0,0,0,505,508,1,0,0,0,506,504,
        1,0,0,0,506,507,1,0,0,0,507,509,1,0,0,0,508,506,1,0,0,0,509,510,
        5,171,0,0,510,511,3,218,109,0,511,512,5,3,0,0,512,25,1,0,0,0,513,
        514,5,113,0,0,514,515,5,171,0,0,515,27,1,0,0,0,516,517,5,2,0,0,517,
        518,5,93,0,0,518,520,5,171,0,0,519,521,3,182,91,0,520,519,1,0,0,
        0,520,521,1,0,0,0,521,522,1,0,0,0,522,523,3,136,68,0,523,524,5,3,
        0,0,524,29,1,0,0,0,525,526,5,2,0,0,526,527,5,94,0,0,527,529,5,171,
        0,0,528,530,3,182,91,0,529,528,1,0,0,0,529,530,1,0,0,0,530,532,1,
        0,0,0,531,533,3,32,16,0,532,531,1,0,0,0,532,533,1,0,0,0,533,534,
        1,0,0,0,534,535,3,152,76,0,535,536,5,3,0,0,536,31,1,0,0,0,537,538,
        5,2,0,0,538,540,5,91,0,0,539,541,3,136,68,0,540,539,1,0,0,0,541,
        542,1,0,0,0,542,540,1,0,0,0,542,543,1,0,0,0,543,544,1,0,0,0,544,
        545,5,3,0,0,545,33,1,0,0,0,546,547,5,2,0,0,547,548,5,95,0,0,548,
        552,5,171,0,0,549,551,3,36,18,0,550,549,1,0,0,0,551,554,1,0,0,0,
        552,550,1,0,0,0,552,553,1,0,0,0,553,555,1,0,0,0,554,552,1,0,0,0,
        555,556,5,3,0,0,556,35,1,0,0,0,557,558,5,2,0,0,558,560,5,171,0,0,
        559,561,7,0,0,0,560,559,1,0,0,0,560,561,1,0,0,0,561,562,1,0,0,0,
        562,563,5,3,0,0,563,37,1,0,0,0,564,565,5,2,0,0,565,569,5,65,0,0,
        566,568,3,50,25,0,567,566,1,0,0,0,568,571,1,0,0,0,569,567,1,0,0,
        0,569,570,1,0,0,0,570,572,1,0,0,0,571,569,1,0,0,0,572,574,5,171,
        0,0,573,575,3,182,91,0,574,573,1,0,0,0,574,575,1,0,0,0,575,577,1,
        0,0,0,576,578,3,42,21,0,577,576,1,0,0,0,577,578,1,0,0,0,578,580,
        1,0,0,0,579,581,3,44,22,0,580,579,1,0,0,0,580,581,1,0,0,0,581,582,
        1,0,0,0,582,583,3,46,23,0,583,584,5,3,0,0,584,39,1,0,0,0,585,586,
        5,2,0,0,586,590,5,65,0,0,587,589,3,50,25,0,588,587,1,0,0,0,589,592,
        1,0,0,0,590,588,1,0,0,0,590,591,1,0,0,0,591,594,1,0,0,0,592,590,
        1,0,0,0,593,595,3,42,21,0,594,593,1,0,0,0,594,595,1,0,0,0,595,597,
        1,0,0,0,596,598,3,44,22,0,597,596,1,0,0,0,597,598,1,0,0,0,598,599,
        1,0,0,0,599,600,3,46,23,0,600,601,5,3,0,0,601,41,1,0,0,0,602,603,
        5,2,0,0,603,604,5,91,0,0,604,605,3,136,68,0,605,606,5,3,0,0,606,
        43,1,0,0,0,607,608,5,2,0,0,608,610,5,73,0,0,609,611,3,136,68,0,610,
        609,1,0,0,0,611,612,1,0,0,0,612,610,1,0,0,0,612,613,1,0,0,0,613,
        614,1,0,0,0,614,615,5,3,0,0,615,45,1,0,0,0,616,617,5,2,0,0,617,621,
        5,61,0,0,618,620,3,48,24,0,619,618,1,0,0,0,620,623,1,0,0,0,621,619,
        1,0,0,0,621,622,1,0,0,0,622,624,1,0,0,0,623,621,1,0,0,0,624,625,
        5,3,0,0,625,47,1,0,0,0,626,636,3,52,26,0,627,636,3,58,29,0,628,636,
        3,60,30,0,629,636,3,62,31,0,630,636,3,64,32,0,631,636,3,66,33,0,
        632,636,3,256,128,0,633,636,3,258,129,0,634,636,3,260,130,0,635,
        626,1,0,0,0,635,627,1,0,0,0,635,628,1,0,0,0,635,629,1,0,0,0,635,
        630,1,0,0,0,635,631,1,0,0,0,635,632,1,0,0,0,635,633,1,0,0,0,635,
        634,1,0,0,0,636,49,1,0,0,0,637,638,7,1,0,0,638,51,1,0,0,0,639,640,
        5,2,0,0,640,644,5,66,0,0,641,643,3,50,25,0,642,641,1,0,0,0,643,646,
        1,0,0,0,644,642,1,0,0,0,644,645,1,0,0,0,645,647,1,0,0,0,646,644,
        1,0,0,0,647,648,5,2,0,0,648,651,5,171,0,0,649,650,5,101,0,0,650,
        652,3,136,68,0,651,649,1,0,0,0,651,652,1,0,0,0,652,653,1,0,0,0,653,
        655,5,3,0,0,654,656,3,218,109,0,655,654,1,0,0,0,655,656,1,0,0,0,
        656,657,1,0,0,0,657,658,5,3,0,0,658,53,1,0,0,0,659,663,5,2,0,0,660,
        662,3,50,25,0,661,660,1,0,0,0,662,665,1,0,0,0,663,661,1,0,0,0,663,
        664,1,0,0,0,664,666,1,0,0,0,665,663,1,0,0,0,666,668,5,171,0,0,667,
        669,5,97,0,0,668,667,1,0,0,0,668,669,1,0,0,0,669,672,1,0,0,0,670,
        671,5,101,0,0,671,673,3,136,68,0,672,670,1,0,0,0,672,673,1,0,0,0,
        673,674,1,0,0,0,674,675,5,3,0,0,675,55,1,0,0,0,676,687,5,2,0,0,677,
        684,3,54,27,0,678,680,5,4,0,0,679,678,1,0,0,0,679,680,1,0,0,0,680,
        681,1,0,0,0,681,683,3,54,27,0,682,679,1,0,0,0,683,686,1,0,0,0,684,
        682,1,0,0,0,684,685,1,0,0,0,685,688,1,0,0,0,686,684,1,0,0,0,687,
        677,1,0,0,0,687,688,1,0,0,0,688,689,1,0,0,0,689,692,5,3,0,0,690,
        691,5,101,0,0,691,693,3,136,68,0,692,690,1,0,0,0,692,693,1,0,0,0,
        693,57,1,0,0,0,694,695,5,2,0,0,695,696,5,68,0,0,696,700,3,56,28,
        0,697,699,3,70,35,0,698,697,1,0,0,0,699,702,1,0,0,0,700,698,1,0,
        0,0,700,701,1,0,0,0,701,703,1,0,0,0,702,700,1,0,0,0,703,704,5,3,
        0,0,704,59,1,0,0,0,705,706,5,2,0,0,706,710,5,18,0,0,707,709,3,50,
        25,0,708,707,1,0,0,0,709,712,1,0,0,0,710,708,1,0,0,0,710,711,1,0,
        0,0,711,713,1,0,0,0,712,710,1,0,0,0,713,714,3,68,34,0,714,718,3,
        354,177,0,715,717,3,70,35,0,716,715,1,0,0,0,717,720,1,0,0,0,718,
        716,1,0,0,0,718,719,1,0,0,0,719,721,1,0,0,0,720,718,1,0,0,0,721,
        722,5,3,0,0,722,61,1,0,0,0,723,724,5,2,0,0,724,728,5,64,0,0,725,
        727,3,50,25,0,726,725,1,0,0,0,727,730,1,0,0,0,728,726,1,0,0,0,728,
        729,1,0,0,0,729,731,1,0,0,0,730,728,1,0,0,0,731,732,3,68,34,0,732,
        733,3,354,177,0,733,734,5,3,0,0,734,63,1,0,0,0,735,736,5,2,0,0,736,
        740,5,71,0,0,737,739,3,50,25,0,738,737,1,0,0,0,739,742,1,0,0,0,740,
        738,1,0,0,0,740,741,1,0,0,0,741,743,1,0,0,0,742,740,1,0,0,0,743,
        744,3,68,34,0,744,748,3,354,177,0,745,747,3,70,35,0,746,745,1,0,
        0,0,747,750,1,0,0,0,748,746,1,0,0,0,748,749,1,0,0,0,749,751,1,0,
        0,0,750,748,1,0,0,0,751,752,5,3,0,0,752,65,1,0,0,0,753,754,5,2,0,
        0,754,758,5,72,0,0,755,757,3,50,25,0,756,755,1,0,0,0,757,760,1,0,
        0,0,758,756,1,0,0,0,758,759,1,0,0,0,759,761,1,0,0,0,760,758,1,0,
        0,0,761,762,3,68,34,0,762,766,3,354,177,0,763,765,3,70,35,0,764,
        763,1,0,0,0,765,768,1,0,0,0,766,764,1,0,0,0,766,767,1,0,0,0,767,
        769,1,0,0,0,768,766,1,0,0,0,769,770,5,3,0,0,770,67,1,0,0,0,771,779,
        5,171,0,0,772,779,5,71,0,0,773,779,5,72,0,0,774,775,5,123,0,0,775,
        776,3,218,109,0,776,777,5,124,0,0,777,779,1,0,0,0,778,771,1,0,0,
        0,778,772,1,0,0,0,778,773,1,0,0,0,778,774,1,0,0,0,779,69,1,0,0,0,
        780,805,3,72,36,0,781,805,3,74,37,0,782,805,3,76,38,0,783,805,3,
        78,39,0,784,805,3,80,40,0,785,805,3,86,43,0,786,805,3,210,105,0,
        787,805,3,88,44,0,788,805,3,90,45,0,789,805,3,92,46,0,790,805,3,
        94,47,0,791,805,3,96,48,0,792,805,3,98,49,0,793,805,3,104,52,0,794,
        805,3,196,98,0,795,805,3,202,101,0,796,805,3,204,102,0,797,805,3,
        206,103,0,798,805,3,208,104,0,799,805,3,190,95,0,800,805,3,192,96,
        0,801,805,3,194,97,0,802,805,3,348,174,0,803,805,3,218,109,0,804,
        780,1,0,0,0,804,781,1,0,0,0,804,782,1,0,0,0,804,783,1,0,0,0,804,
        784,1,0,0,0,804,785,1,0,0,0,804,786,1,0,0,0,804,787,1,0,0,0,804,
        788,1,0,0,0,804,789,1,0,0,0,804,790,1,0,0,0,804,791,1,0,0,0,804,
        792,1,0,0,0,804,793,1,0,0,0,804,794,1,0,0,0,804,795,1,0,0,0,804,
        796,1,0,0,0,804,797,1,0,0,0,804,798,1,0,0,0,804,799,1,0,0,0,804,
        800,1,0,0,0,804,801,1,0,0,0,804,802,1,0,0,0,804,803,1,0,0,0,805,
        71,1,0,0,0,806,807,5,2,0,0,807,808,5,9,0,0,808,810,5,2,0,0,809,811,
        3,128,64,0,810,809,1,0,0,0,811,812,1,0,0,0,812,810,1,0,0,0,812,813,
        1,0,0,0,813,814,1,0,0,0,814,818,5,3,0,0,815,817,3,70,35,0,816,815,
        1,0,0,0,817,820,1,0,0,0,818,816,1,0,0,0,818,819,1,0,0,0,819,821,
        1,0,0,0,820,818,1,0,0,0,821,822,5,3,0,0,822,73,1,0,0,0,823,824,5,
        2,0,0,824,825,5,10,0,0,825,827,5,2,0,0,826,828,3,128,64,0,827,826,
        1,0,0,0,828,829,1,0,0,0,829,827,1,0,0,0,829,830,1,0,0,0,830,831,
        1,0,0,0,831,835,5,3,0,0,832,834,3,70,35,0,833,832,1,0,0,0,834,837,
        1,0,0,0,835,833,1,0,0,0,835,836,1,0,0,0,836,838,1,0,0,0,837,835,
        1,0,0,0,838,839,5,3,0,0,839,75,1,0,0,0,840,841,5,2,0,0,841,842,5,
        11,0,0,842,846,5,2,0,0,843,845,3,128,64,0,844,843,1,0,0,0,845,848,
        1,0,0,0,846,844,1,0,0,0,846,847,1,0,0,0,847,849,1,0,0,0,848,846,
        1,0,0,0,849,853,5,3,0,0,850,852,3,70,35,0,851,850,1,0,0,0,852,855,
        1,0,0,0,853,851,1,0,0,0,853,854,1,0,0,0,854,856,1,0,0,0,855,853,
        1,0,0,0,856,857,5,3,0,0,857,77,1,0,0,0,858,859,5,2,0,0,859,860,5,
        12,0,0,860,861,3,130,65,0,861,862,3,218,109,0,862,863,5,3,0,0,863,
        79,1,0,0,0,864,865,5,2,0,0,865,866,5,24,0,0,866,867,3,218,109,0,
        867,869,3,82,41,0,868,870,3,84,42,0,869,868,1,0,0,0,869,870,1,0,
        0,0,870,871,1,0,0,0,871,872,5,3,0,0,872,81,1,0,0,0,873,874,5,2,0,
        0,874,878,5,26,0,0,875,877,3,70,35,0,876,875,1,0,0,0,877,880,1,0,
        0,0,878,876,1,0,0,0,878,879,1,0,0,0,879,881,1,0,0,0,880,878,1,0,
        0,0,881,882,5,3,0,0,882,83,1,0,0,0,883,884,5,2,0,0,884,888,5,122,
        0,0,885,887,3,70,35,0,886,885,1,0,0,0,887,890,1,0,0,0,888,886,1,
        0,0,0,888,889,1,0,0,0,889,891,1,0,0,0,890,888,1,0,0,0,891,892,5,
        3,0,0,892,85,1,0,0,0,893,894,5,2,0,0,894,895,5,25,0,0,895,899,3,
        218,109,0,896,898,3,70,35,0,897,896,1,0,0,0,898,901,1,0,0,0,899,
        897,1,0,0,0,899,900,1,0,0,0,900,902,1,0,0,0,901,899,1,0,0,0,902,
        903,5,3,0,0,903,87,1,0,0,0,904,905,5,2,0,0,905,907,5,27,0,0,906,
        908,3,218,109,0,907,906,1,0,0,0,907,908,1,0,0,0,908,909,1,0,0,0,
        909,910,5,3,0,0,910,89,1,0,0,0,911,912,5,2,0,0,912,913,5,28,0,0,
        913,914,3,218,109,0,914,915,5,3,0,0,915,91,1,0,0,0,916,917,5,2,0,
        0,917,918,5,29,0,0,918,919,5,3,0,0,919,93,1,0,0,0,920,921,5,2,0,
        0,921,922,5,30,0,0,922,923,5,3,0,0,923,95,1,0,0,0,924,925,5,2,0,
        0,925,927,5,48,0,0,926,928,3,288,144,0,927,926,1,0,0,0,927,928,1,
        0,0,0,928,929,1,0,0,0,929,930,5,165,0,0,930,957,5,3,0,0,931,932,
        5,2,0,0,932,933,5,48,0,0,933,934,3,132,66,0,934,935,5,165,0,0,935,
        936,5,3,0,0,936,957,1,0,0,0,937,938,5,2,0,0,938,939,5,48,0,0,939,
        940,5,171,0,0,940,941,5,165,0,0,941,957,5,3,0,0,942,943,5,2,0,0,
        943,944,5,48,0,0,944,945,5,171,0,0,945,946,3,132,66,0,946,947,5,
        165,0,0,947,948,5,3,0,0,948,957,1,0,0,0,949,950,5,2,0,0,950,951,
        5,48,0,0,951,952,5,146,0,0,952,953,5,59,0,0,953,954,5,171,0,0,954,
        955,5,165,0,0,955,957,5,3,0,0,956,924,1,0,0,0,956,931,1,0,0,0,956,
        937,1,0,0,0,956,942,1,0,0,0,956,949,1,0,0,0,957,97,1,0,0,0,958,959,
        5,2,0,0,959,960,5,160,0,0,960,961,3,100,50,0,961,962,5,165,0,0,962,
        963,5,3,0,0,963,99,1,0,0,0,964,965,5,2,0,0,965,967,5,171,0,0,966,
        968,3,102,51,0,967,966,1,0,0,0,968,969,1,0,0,0,969,967,1,0,0,0,969,
        970,1,0,0,0,970,971,1,0,0,0,971,972,5,3,0,0,972,101,1,0,0,0,973,
        979,5,171,0,0,974,975,5,2,0,0,975,976,5,171,0,0,976,977,5,171,0,
        0,977,979,5,3,0,0,978,973,1,0,0,0,978,974,1,0,0,0,979,103,1,0,0,
        0,980,990,3,106,53,0,981,990,3,108,54,0,982,990,3,110,55,0,983,990,
        3,118,59,0,984,990,3,114,57,0,985,990,3,116,58,0,986,990,3,120,60,
        0,987,990,3,122,61,0,988,990,3,124,62,0,989,980,1,0,0,0,989,981,
        1,0,0,0,989,982,1,0,0,0,989,983,1,0,0,0,989,984,1,0,0,0,989,985,
        1,0,0,0,989,986,1,0,0,0,989,987,1,0,0,0,989,988,1,0,0,0,990,105,
        1,0,0,0,991,992,5,2,0,0,992,993,5,154,0,0,993,994,5,171,0,0,994,
        995,3,218,109,0,995,996,5,3,0,0,996,107,1,0,0,0,997,998,5,2,0,0,
        998,999,5,155,0,0,999,1000,3,38,19,0,1000,1001,5,3,0,0,1001,1023,
        1,0,0,0,1002,1003,5,2,0,0,1003,1004,5,155,0,0,1004,1005,3,40,20,
        0,1005,1006,5,3,0,0,1006,1023,1,0,0,0,1007,1008,5,2,0,0,1008,1009,
        5,155,0,0,1009,1010,3,20,10,0,1010,1011,5,3,0,0,1011,1023,1,0,0,
        0,1012,1013,5,2,0,0,1013,1014,5,155,0,0,1014,1015,3,24,12,0,1015,
        1016,5,3,0,0,1016,1023,1,0,0,0,1017,1018,5,2,0,0,1018,1019,5,155,
        0,0,1019,1020,3,218,109,0,1020,1021,5,3,0,0,1021,1023,1,0,0,0,1022,
        997,1,0,0,0,1022,1002,1,0,0,0,1022,1007,1,0,0,0,1022,1012,1,0,0,
        0,1022,1017,1,0,0,0,1023,109,1,0,0,0,1024,1025,5,2,0,0,1025,1027,
        5,156,0,0,1026,1028,3,112,56,0,1027,1026,1,0,0,0,1028,1029,1,0,0,
        0,1029,1027,1,0,0,0,1029,1030,1,0,0,0,1030,1031,1,0,0,0,1031,1032,
        5,3,0,0,1032,111,1,0,0,0,1033,1034,5,2,0,0,1034,1036,5,171,0,0,1035,
        1037,5,171,0,0,1036,1035,1,0,0,0,1036,1037,1,0,0,0,1037,1038,1,0,
        0,0,1038,1039,5,3,0,0,1039,113,1,0,0,0,1040,1041,5,2,0,0,1041,1042,
        5,158,0,0,1042,1044,5,165,0,0,1043,1045,3,112,56,0,1044,1043,1,0,
        0,0,1045,1046,1,0,0,0,1046,1044,1,0,0,0,1046,1047,1,0,0,0,1047,1048,
        1,0,0,0,1048,1049,5,3,0,0,1049,115,1,0,0,0,1050,1051,5,2,0,0,1051,
        1052,5,159,0,0,1052,1053,5,165,0,0,1053,1054,5,3,0,0,1054,117,1,
        0,0,0,1055,1056,5,2,0,0,1056,1057,5,157,0,0,1057,1058,5,165,0,0,
        1058,1059,5,165,0,0,1059,1060,5,3,0,0,1060,119,1,0,0,0,1061,1062,
        5,2,0,0,1062,1064,5,163,0,0,1063,1065,3,112,56,0,1064,1063,1,0,0,
        0,1065,1066,1,0,0,0,1066,1064,1,0,0,0,1066,1067,1,0,0,0,1067,1068,
        1,0,0,0,1068,1069,5,3,0,0,1069,121,1,0,0,0,1070,1071,5,2,0,0,1071,
        1072,5,162,0,0,1072,1074,5,165,0,0,1073,1075,3,112,56,0,1074,1073,
        1,0,0,0,1075,1076,1,0,0,0,1076,1074,1,0,0,0,1076,1077,1,0,0,0,1077,
        1078,1,0,0,0,1078,1079,5,3,0,0,1079,123,1,0,0,0,1080,1081,5,2,0,
        0,1081,1082,5,161,0,0,1082,1083,5,165,0,0,1083,1084,5,3,0,0,1084,
        125,1,0,0,0,1085,1086,5,2,0,0,1086,1087,5,154,0,0,1087,1088,3,4,
        2,0,1088,1089,5,3,0,0,1089,127,1,0,0,0,1090,1091,5,2,0,0,1091,1094,
        5,171,0,0,1092,1093,5,101,0,0,1093,1095,3,136,68,0,1094,1092,1,0,
        0,0,1094,1095,1,0,0,0,1095,1096,1,0,0,0,1096,1097,3,218,109,0,1097,
        1098,5,3,0,0,1098,129,1,0,0,0,1099,1100,5,2,0,0,1100,1103,5,171,
        0,0,1101,1102,5,101,0,0,1102,1104,3,136,68,0,1103,1101,1,0,0,0,1103,
        1104,1,0,0,0,1104,1105,1,0,0,0,1105,1109,5,3,0,0,1106,1109,3,132,
        66,0,1107,1109,3,134,67,0,1108,1099,1,0,0,0,1108,1106,1,0,0,0,1108,
        1107,1,0,0,0,1109,131,1,0,0,0,1110,1114,5,139,0,0,1111,1113,5,171,
        0,0,1112,1111,1,0,0,0,1113,1116,1,0,0,0,1114,1112,1,0,0,0,1114,1115,
        1,0,0,0,1115,1117,1,0,0,0,1116,1114,1,0,0,0,1117,1118,5,140,0,0,
        1118,133,1,0,0,0,1119,1123,5,123,0,0,1120,1122,5,171,0,0,1121,1120,
        1,0,0,0,1122,1125,1,0,0,0,1123,1121,1,0,0,0,1123,1124,1,0,0,0,1124,
        1126,1,0,0,0,1125,1123,1,0,0,0,1126,1127,5,124,0,0,1127,135,1,0,
        0,0,1128,1150,5,171,0,0,1129,1150,5,99,0,0,1130,1150,5,100,0,0,1131,
        1150,5,34,0,0,1132,1133,5,139,0,0,1133,1150,5,140,0,0,1134,1150,
        3,138,69,0,1135,1150,3,140,70,0,1136,1150,3,142,71,0,1137,1150,3,
        144,72,0,1138,1150,3,148,74,0,1139,1150,3,152,76,0,1140,1150,3,158,
        79,0,1141,1150,3,160,80,0,1142,1150,3,162,81,0,1143,1150,3,164,82,
        0,1144,1150,3,166,83,0,1145,1150,3,168,84,0,1146,1150,3,170,85,0,
        1147,1150,3,176,88,0,1148,1150,3,180,90,0,1149,1128,1,0,0,0,1149,
        1129,1,0,0,0,1149,1130,1,0,0,0,1149,1131,1,0,0,0,1149,1132,1,0,0,
        0,1149,1134,1,0,0,0,1149,1135,1,0,0,0,1149,1136,1,0,0,0,1149,1137,
        1,0,0,0,1149,1138,1,0,0,0,1149,1139,1,0,0,0,1149,1140,1,0,0,0,1149,
        1141,1,0,0,0,1149,1142,1,0,0,0,1149,1143,1,0,0,0,1149,1144,1,0,0,
        0,1149,1145,1,0,0,0,1149,1146,1,0,0,0,1149,1147,1,0,0,0,1149,1148,
        1,0,0,0,1150,137,1,0,0,0,1151,1152,5,2,0,0,1152,1154,5,74,0,0,1153,
        1155,3,136,68,0,1154,1153,1,0,0,0,1155,1156,1,0,0,0,1156,1154,1,
        0,0,0,1156,1157,1,0,0,0,1157,1158,1,0,0,0,1158,1159,5,3,0,0,1159,
        139,1,0,0,0,1160,1161,5,2,0,0,1161,1163,5,75,0,0,1162,1164,3,136,
        68,0,1163,1162,1,0,0,0,1164,1165,1,0,0,0,1165,1163,1,0,0,0,1165,
        1166,1,0,0,0,1166,1167,1,0,0,0,1167,1168,5,3,0,0,1168,141,1,0,0,
        0,1169,1170,5,2,0,0,1170,1171,5,35,0,0,1171,1172,3,136,68,0,1172,
        1173,5,3,0,0,1173,143,1,0,0,0,1174,1175,5,2,0,0,1175,1177,5,76,0,
        0,1176,1178,3,146,73,0,1177,1176,1,0,0,0,1178,1179,1,0,0,0,1179,
        1177,1,0,0,0,1179,1180,1,0,0,0,1180,1181,1,0,0,0,1181,1182,5,3,0,
        0,1182,145,1,0,0,0,1183,1184,5,2,0,0,1184,1185,5,86,0,0,1185,1186,
        3,136,68,0,1186,1187,5,3,0,0,1187,1195,1,0,0,0,1188,1189,5,2,0,0,
        1189,1190,5,171,0,0,1190,1191,3,136,68,0,1191,1192,5,3,0,0,1192,
        1195,1,0,0,0,1193,1195,3,136,68,0,1194,1183,1,0,0,0,1194,1188,1,
        0,0,0,1194,1193,1,0,0,0,1195,147,1,0,0,0,1196,1197,5,2,0,0,1197,
        1199,5,77,0,0,1198,1200,3,182,91,0,1199,1198,1,0,0,0,1199,1200,1,
        0,0,0,1200,1201,1,0,0,0,1201,1205,5,2,0,0,1202,1204,3,150,75,0,1203,
        1202,1,0,0,0,1204,1207,1,0,0,0,1205,1203,1,0,0,0,1205,1206,1,0,0,
        0,1206,1208,1,0,0,0,1207,1205,1,0,0,0,1208,1209,5,3,0,0,1209,1210,
        3,136,68,0,1210,1211,5,3,0,0,1211,149,1,0,0,0,1212,1213,5,2,0,0,
        1213,1215,5,171,0,0,1214,1216,5,97,0,0,1215,1214,1,0,0,0,1215,1216,
        1,0,0,0,1216,1217,1,0,0,0,1217,1218,3,136,68,0,1218,1219,5,3,0,0,
        1219,151,1,0,0,0,1220,1221,5,2,0,0,1221,1225,5,171,0,0,1222,1224,
        3,154,77,0,1223,1222,1,0,0,0,1224,1227,1,0,0,0,1225,1223,1,0,0,0,
        1225,1226,1,0,0,0,1226,1228,1,0,0,0,1227,1225,1,0,0,0,1228,1229,
        5,3,0,0,1229,153,1,0,0,0,1230,1234,5,2,0,0,1231,1233,3,156,78,0,
        1232,1231,1,0,0,0,1233,1236,1,0,0,0,1234,1232,1,0,0,0,1234,1235,
        1,0,0,0,1235,1237,1,0,0,0,1236,1234,1,0,0,0,1237,1239,5,171,0,0,
        1238,1240,5,97,0,0,1239,1238,1,0,0,0,1239,1240,1,0,0,0,1240,1241,
        1,0,0,0,1241,1242,3,136,68,0,1242,1243,5,3,0,0,1243,155,1,0,0,0,
        1244,1245,5,87,0,0,1245,157,1,0,0,0,1246,1247,5,2,0,0,1247,1248,
        5,78,0,0,1248,1249,7,2,0,0,1249,1250,5,3,0,0,1250,159,1,0,0,0,1251,
        1252,5,2,0,0,1252,1253,5,79,0,0,1253,1254,3,136,68,0,1254,1255,5,
        3,0,0,1255,161,1,0,0,0,1256,1257,5,2,0,0,1257,1258,5,80,0,0,1258,
        1259,5,171,0,0,1259,1260,5,3,0,0,1260,163,1,0,0,0,1261,1262,5,2,
        0,0,1262,1263,5,41,0,0,1263,1264,3,136,68,0,1264,1265,3,136,68,0,
        1265,1266,5,3,0,0,1266,165,1,0,0,0,1267,1268,5,2,0,0,1268,1269,5,
        33,0,0,1269,1270,3,136,68,0,1270,1271,3,136,68,0,1271,1272,3,136,
        68,0,1272,1273,3,136,68,0,1273,1274,5,3,0,0,1274,167,1,0,0,0,1275,
        1276,5,2,0,0,1276,1277,5,82,0,0,1277,1278,5,171,0,0,1278,1279,5,
        3,0,0,1279,169,1,0,0,0,1280,1281,5,2,0,0,1281,1282,5,83,0,0,1282,
        1283,5,171,0,0,1283,1285,3,136,68,0,1284,1286,3,172,86,0,1285,1284,
        1,0,0,0,1285,1286,1,0,0,0,1286,1287,1,0,0,0,1287,1288,3,136,68,0,
        1288,1289,5,3,0,0,1289,171,1,0,0,0,1290,1291,5,2,0,0,1291,1293,5,
        96,0,0,1292,1294,3,174,87,0,1293,1292,1,0,0,0,1294,1295,1,0,0,0,
        1295,1293,1,0,0,0,1295,1296,1,0,0,0,1296,1297,1,0,0,0,1297,1298,
        5,3,0,0,1298,173,1,0,0,0,1299,1300,7,3,0,0,1300,175,1,0,0,0,1301,
        1302,5,2,0,0,1302,1304,5,84,0,0,1303,1305,3,178,89,0,1304,1303,1,
        0,0,0,1305,1306,1,0,0,0,1306,1304,1,0,0,0,1306,1307,1,0,0,0,1307,
        1308,1,0,0,0,1308,1309,5,3,0,0,1309,177,1,0,0,0,1310,1313,5,165,
        0,0,1311,1313,3,136,68,0,1312,1310,1,0,0,0,1312,1311,1,0,0,0,1313,
        179,1,0,0,0,1314,1315,5,2,0,0,1315,1316,5,90,0,0,1316,1318,3,136,
        68,0,1317,1319,3,136,68,0,1318,1317,1,0,0,0,1319,1320,1,0,0,0,1320,
        1318,1,0,0,0,1320,1321,1,0,0,0,1321,1322,1,0,0,0,1322,1323,5,3,0,
        0,1323,181,1,0,0,0,1324,1325,5,2,0,0,1325,1327,5,88,0,0,1326,1328,
        3,184,92,0,1327,1326,1,0,0,0,1328,1329,1,0,0,0,1329,1327,1,0,0,0,
        1329,1330,1,0,0,0,1330,1331,1,0,0,0,1331,1332,5,3,0,0,1332,183,1,
        0,0,0,1333,1334,5,2,0,0,1334,1336,5,171,0,0,1335,1337,3,186,93,0,
        1336,1335,1,0,0,0,1336,1337,1,0,0,0,1337,1339,1,0,0,0,1338,1340,
        3,188,94,0,1339,1338,1,0,0,0,1339,1340,1,0,0,0,1340,1341,1,0,0,0,
        1341,1342,5,3,0,0,1342,185,1,0,0,0,1343,1344,5,2,0,0,1344,1345,5,
        91,0,0,1345,1346,3,136,68,0,1346,1347,5,3,0,0,1347,187,1,0,0,0,1348,
        1349,5,2,0,0,1349,1350,5,51,0,0,1350,1351,3,136,68,0,1351,1352,5,
        3,0,0,1352,189,1,0,0,0,1353,1354,5,2,0,0,1354,1355,5,31,0,0,1355,
        1356,5,171,0,0,1356,1357,3,218,109,0,1357,1358,5,3,0,0,1358,1372,
        1,0,0,0,1359,1360,5,2,0,0,1360,1361,5,31,0,0,1361,1362,3,308,154,
        0,1362,1363,3,218,109,0,1363,1364,5,3,0,0,1364,1372,1,0,0,0,1365,
        1366,5,2,0,0,1366,1367,5,31,0,0,1367,1368,3,312,156,0,1368,1369,
        3,218,109,0,1369,1370,5,3,0,0,1370,1372,1,0,0,0,1371,1353,1,0,0,
        0,1371,1359,1,0,0,0,1371,1365,1,0,0,0,1372,191,1,0,0,0,1373,1374,
        5,2,0,0,1374,1375,5,133,0,0,1375,1376,5,171,0,0,1376,1377,3,218,
        109,0,1377,1378,5,3,0,0,1378,1404,1,0,0,0,1379,1380,5,2,0,0,1380,
        1381,5,134,0,0,1381,1382,5,171,0,0,1382,1383,3,218,109,0,1383,1384,
        5,3,0,0,1384,1404,1,0,0,0,1385,1386,5,2,0,0,1386,1387,5,135,0,0,
        1387,1388,5,171,0,0,1388,1389,3,218,109,0,1389,1390,5,3,0,0,1390,
        1404,1,0,0,0,1391,1392,5,2,0,0,1392,1393,5,136,0,0,1393,1394,5,171,
        0,0,1394,1395,3,218,109,0,1395,1396,5,3,0,0,1396,1404,1,0,0,0,1397,
        1398,5,2,0,0,1398,1399,5,137,0,0,1399,1400,5,171,0,0,1400,1401,3,
        218,109,0,1401,1402,5,3,0,0,1402,1404,1,0,0,0,1403,1373,1,0,0,0,
        1403,1379,1,0,0,0,1403,1385,1,0,0,0,1403,1391,1,0,0,0,1403,1397,
        1,0,0,0,1404,193,1,0,0,0,1405,1406,5,2,0,0,1406,1407,3,218,109,0,
        1407,1408,5,123,0,0,1408,1409,3,218,109,0,1409,1410,5,124,0,0,1410,
        1411,5,138,0,0,1411,1412,3,218,109,0,1412,1413,5,3,0,0,1413,195,
        1,0,0,0,1414,1415,5,2,0,0,1415,1416,5,49,0,0,1416,1420,3,218,109,
        0,1417,1419,3,198,99,0,1418,1417,1,0,0,0,1419,1422,1,0,0,0,1420,
        1418,1,0,0,0,1420,1421,1,0,0,0,1421,1424,1,0,0,0,1422,1420,1,0,0,
        0,1423,1425,3,200,100,0,1424,1423,1,0,0,0,1424,1425,1,0,0,0,1425,
        1426,1,0,0,0,1426,1427,5,3,0,0,1427,197,1,0,0,0,1428,1429,5,2,0,
        0,1429,1430,5,50,0,0,1430,1434,3,218,109,0,1431,1433,3,70,35,0,1432,
        1431,1,0,0,0,1433,1436,1,0,0,0,1434,1432,1,0,0,0,1434,1435,1,0,0,
        0,1435,1437,1,0,0,0,1436,1434,1,0,0,0,1437,1438,5,3,0,0,1438,199,
        1,0,0,0,1439,1440,5,2,0,0,1440,1444,5,51,0,0,1441,1443,3,70,35,0,
        1442,1441,1,0,0,0,1443,1446,1,0,0,0,1444,1442,1,0,0,0,1444,1445,
        1,0,0,0,1445,1447,1,0,0,0,1446,1444,1,0,0,0,1447,1448,5,3,0,0,1448,
        201,1,0,0,0,1449,1450,5,2,0,0,1450,1451,5,60,0,0,1451,1452,3,72,
        36,0,1452,1453,3,218,109,0,1453,1457,3,190,95,0,1454,1456,3,70,35,
        0,1455,1454,1,0,0,0,1456,1459,1,0,0,0,1457,1455,1,0,0,0,1457,1458,
        1,0,0,0,1458,1460,1,0,0,0,1459,1457,1,0,0,0,1460,1461,5,3,0,0,1461,
        1479,1,0,0,0,1462,1463,5,2,0,0,1463,1464,5,60,0,0,1464,1465,5,2,
        0,0,1465,1466,5,171,0,0,1466,1467,3,218,109,0,1467,1468,5,3,0,0,
        1468,1469,3,218,109,0,1469,1473,3,218,109,0,1470,1472,3,70,35,0,
        1471,1470,1,0,0,0,1472,1475,1,0,0,0,1473,1471,1,0,0,0,1473,1474,
        1,0,0,0,1474,1476,1,0,0,0,1475,1473,1,0,0,0,1476,1477,5,3,0,0,1477,
        1479,1,0,0,0,1478,1449,1,0,0,0,1478,1462,1,0,0,0,1479,203,1,0,0,
        0,1480,1481,5,2,0,0,1481,1482,5,52,0,0,1482,1483,5,171,0,0,1483,
        1487,3,218,109,0,1484,1486,3,70,35,0,1485,1484,1,0,0,0,1486,1489,
        1,0,0,0,1487,1485,1,0,0,0,1487,1488,1,0,0,0,1488,1490,1,0,0,0,1489,
        1487,1,0,0,0,1490,1491,5,3,0,0,1491,205,1,0,0,0,1492,1493,5,2,0,
        0,1493,1494,5,53,0,0,1494,1495,5,171,0,0,1495,1499,3,218,109,0,1496,
        1498,3,70,35,0,1497,1496,1,0,0,0,1498,1501,1,0,0,0,1499,1497,1,0,
        0,0,1499,1500,1,0,0,0,1500,1502,1,0,0,0,1501,1499,1,0,0,0,1502,1503,
        5,3,0,0,1503,207,1,0,0,0,1504,1505,5,2,0,0,1505,1506,5,54,0,0,1506,
        1507,5,171,0,0,1507,1511,3,218,109,0,1508,1510,3,70,35,0,1509,1508,
        1,0,0,0,1510,1513,1,0,0,0,1511,1509,1,0,0,0,1511,1512,1,0,0,0,1512,
        1514,1,0,0,0,1513,1511,1,0,0,0,1514,1515,5,3,0,0,1515,209,1,0,0,
        0,1516,1517,5,2,0,0,1517,1518,5,58,0,0,1518,1520,3,212,106,0,1519,
        1521,3,214,107,0,1520,1519,1,0,0,0,1520,1521,1,0,0,0,1521,1523,1,
        0,0,0,1522,1524,3,216,108,0,1523,1522,1,0,0,0,1523,1524,1,0,0,0,
        1524,1525,1,0,0,0,1525,1526,5,3,0,0,1526,211,1,0,0,0,1527,1528,5,
        2,0,0,1528,1532,5,55,0,0,1529,1531,3,70,35,0,1530,1529,1,0,0,0,1531,
        1534,1,0,0,0,1532,1530,1,0,0,0,1532,1533,1,0,0,0,1533,1535,1,0,0,
        0,1534,1532,1,0,0,0,1535,1536,5,3,0,0,1536,213,1,0,0,0,1537,1538,
        5,2,0,0,1538,1539,5,56,0,0,1539,1543,5,171,0,0,1540,1542,3,70,35,
        0,1541,1540,1,0,0,0,1542,1545,1,0,0,0,1543,1541,1,0,0,0,1543,1544,
        1,0,0,0,1544,1546,1,0,0,0,1545,1543,1,0,0,0,1546,1547,5,3,0,0,1547,
        215,1,0,0,0,1548,1549,5,2,0,0,1549,1553,5,57,0,0,1550,1552,3,70,
        35,0,1551,1550,1,0,0,0,1552,1555,1,0,0,0,1553,1551,1,0,0,0,1553,
        1554,1,0,0,0,1554,1556,1,0,0,0,1555,1553,1,0,0,0,1556,1557,5,3,0,
        0,1557,217,1,0,0,0,1558,1609,3,360,180,0,1559,1609,5,171,0,0,1560,
        1609,5,23,0,0,1561,1609,5,168,0,0,1562,1609,3,232,116,0,1563,1609,
        3,234,117,0,1564,1609,3,236,118,0,1565,1609,3,238,119,0,1566,1609,
        3,240,120,0,1567,1609,3,242,121,0,1568,1609,3,244,122,0,1569,1609,
        3,246,123,0,1570,1609,3,248,124,0,1571,1609,3,250,125,0,1572,1609,
        3,252,126,0,1573,1609,3,254,127,0,1574,1609,3,268,134,0,1575,1609,
        3,270,135,0,1576,1609,3,272,136,0,1577,1609,3,274,137,0,1578,1609,
        3,276,138,0,1579,1609,3,288,144,0,1580,1609,3,298,149,0,1581,1609,
        3,294,147,0,1582,1609,3,296,148,0,1583,1609,3,308,154,0,1584,1609,
        3,312,156,0,1585,1609,3,310,155,0,1586,1609,3,314,157,0,1587,1609,
        3,320,160,0,1588,1609,3,322,161,0,1589,1609,3,324,162,0,1590,1609,
        3,326,163,0,1591,1609,3,278,139,0,1592,1609,3,280,140,0,1593,1609,
        3,286,143,0,1594,1609,3,328,164,0,1595,1609,3,330,165,0,1596,1609,
        3,332,166,0,1597,1609,3,228,114,0,1598,1609,3,230,115,0,1599,1609,
        3,302,151,0,1600,1609,3,220,110,0,1601,1609,3,222,111,0,1602,1609,
        3,224,112,0,1603,1609,3,226,113,0,1604,1609,3,334,167,0,1605,1609,
        3,346,173,0,1606,1609,3,306,153,0,1607,1609,3,350,175,0,1608,1558,
        1,0,0,0,1608,1559,1,0,0,0,1608,1560,1,0,0,0,1608,1561,1,0,0,0,1608,
        1562,1,0,0,0,1608,1563,1,0,0,0,1608,1564,1,0,0,0,1608,1565,1,0,0,
        0,1608,1566,1,0,0,0,1608,1567,1,0,0,0,1608,1568,1,0,0,0,1608,1569,
        1,0,0,0,1608,1570,1,0,0,0,1608,1571,1,0,0,0,1608,1572,1,0,0,0,1608,
        1573,1,0,0,0,1608,1574,1,0,0,0,1608,1575,1,0,0,0,1608,1576,1,0,0,
        0,1608,1577,1,0,0,0,1608,1578,1,0,0,0,1608,1579,1,0,0,0,1608,1580,
        1,0,0,0,1608,1581,1,0,0,0,1608,1582,1,0,0,0,1608,1583,1,0,0,0,1608,
        1584,1,0,0,0,1608,1585,1,0,0,0,1608,1586,1,0,0,0,1608,1587,1,0,0,
        0,1608,1588,1,0,0,0,1608,1589,1,0,0,0,1608,1590,1,0,0,0,1608,1591,
        1,0,0,0,1608,1592,1,0,0,0,1608,1593,1,0,0,0,1608,1594,1,0,0,0,1608,
        1595,1,0,0,0,1608,1596,1,0,0,0,1608,1597,1,0,0,0,1608,1598,1,0,0,
        0,1608,1599,1,0,0,0,1608,1600,1,0,0,0,1608,1601,1,0,0,0,1608,1602,
        1,0,0,0,1608,1603,1,0,0,0,1608,1604,1,0,0,0,1608,1605,1,0,0,0,1608,
        1606,1,0,0,0,1608,1607,1,0,0,0,1609,219,1,0,0,0,1610,1611,5,69,0,
        0,1611,221,1,0,0,0,1612,1613,5,70,0,0,1613,223,1,0,0,0,1614,1615,
        5,2,0,0,1615,1619,5,70,0,0,1616,1618,3,218,109,0,1617,1616,1,0,0,
        0,1618,1621,1,0,0,0,1619,1617,1,0,0,0,1619,1620,1,0,0,0,1620,1622,
        1,0,0,0,1621,1619,1,0,0,0,1622,1623,5,3,0,0,1623,225,1,0,0,0,1624,
        1625,5,2,0,0,1625,1626,5,62,0,0,1626,1630,5,171,0,0,1627,1629,3,
        218,109,0,1628,1627,1,0,0,0,1629,1632,1,0,0,0,1630,1628,1,0,0,0,
        1630,1631,1,0,0,0,1631,1633,1,0,0,0,1632,1630,1,0,0,0,1633,1634,
        5,3,0,0,1634,227,1,0,0,0,1635,1636,5,2,0,0,1636,1637,5,80,0,0,1637,
        1638,3,218,109,0,1638,1639,5,3,0,0,1639,229,1,0,0,0,1640,1641,5,
        2,0,0,1641,1642,5,81,0,0,1642,1643,3,218,109,0,1643,1644,3,136,68,
        0,1644,1645,5,3,0,0,1645,231,1,0,0,0,1646,1647,5,2,0,0,1647,1648,
        5,14,0,0,1648,1652,3,354,177,0,1649,1651,3,70,35,0,1650,1649,1,0,
        0,0,1651,1654,1,0,0,0,1652,1650,1,0,0,0,1652,1653,1,0,0,0,1653,1655,
        1,0,0,0,1654,1652,1,0,0,0,1655,1656,5,3,0,0,1656,233,1,0,0,0,1657,
        1658,5,2,0,0,1658,1660,5,16,0,0,1659,1661,5,171,0,0,1660,1659,1,
        0,0,0,1660,1661,1,0,0,0,1661,1662,1,0,0,0,1662,1666,3,354,177,0,
        1663,1665,3,70,35,0,1664,1663,1,0,0,0,1665,1668,1,0,0,0,1666,1664,
        1,0,0,0,1666,1667,1,0,0,0,1667,1669,1,0,0,0,1668,1666,1,0,0,0,1669,
        1670,5,3,0,0,1670,235,1,0,0,0,1671,1672,5,2,0,0,1672,1673,5,105,
        0,0,1673,1677,3,354,177,0,1674,1676,3,70,35,0,1675,1674,1,0,0,0,
        1676,1679,1,0,0,0,1677,1675,1,0,0,0,1677,1678,1,0,0,0,1678,1680,
        1,0,0,0,1679,1677,1,0,0,0,1680,1681,5,3,0,0,1681,237,1,0,0,0,1682,
        1683,5,2,0,0,1683,1684,5,107,0,0,1684,1688,3,354,177,0,1685,1687,
        3,70,35,0,1686,1685,1,0,0,0,1687,1690,1,0,0,0,1688,1686,1,0,0,0,
        1688,1689,1,0,0,0,1689,1691,1,0,0,0,1690,1688,1,0,0,0,1691,1692,
        5,3,0,0,1692,239,1,0,0,0,1693,1694,5,2,0,0,1694,1695,5,109,0,0,1695,
        1699,3,354,177,0,1696,1698,3,70,35,0,1697,1696,1,0,0,0,1698,1701,
        1,0,0,0,1699,1697,1,0,0,0,1699,1700,1,0,0,0,1700,1702,1,0,0,0,1701,
        1699,1,0,0,0,1702,1703,5,3,0,0,1703,241,1,0,0,0,1704,1705,5,2,0,
        0,1705,1706,5,103,0,0,1706,1710,3,354,177,0,1707,1709,3,70,35,0,
        1708,1707,1,0,0,0,1709,1712,1,0,0,0,1710,1708,1,0,0,0,1710,1711,
        1,0,0,0,1711,1713,1,0,0,0,1712,1710,1,0,0,0,1713,1714,5,3,0,0,1714,
        243,1,0,0,0,1715,1716,5,2,0,0,1716,1718,5,15,0,0,1717,1719,5,171,
        0,0,1718,1717,1,0,0,0,1718,1719,1,0,0,0,1719,1720,1,0,0,0,1720,1724,
        3,262,131,0,1721,1723,3,70,35,0,1722,1721,1,0,0,0,1723,1726,1,0,
        0,0,1724,1722,1,0,0,0,1724,1725,1,0,0,0,1725,1727,1,0,0,0,1726,1724,
        1,0,0,0,1727,1728,5,3,0,0,1728,245,1,0,0,0,1729,1730,5,2,0,0,1730,
        1731,5,13,0,0,1731,1735,3,262,131,0,1732,1734,3,70,35,0,1733,1732,
        1,0,0,0,1734,1737,1,0,0,0,1735,1733,1,0,0,0,1735,1736,1,0,0,0,1736,
        1738,1,0,0,0,1737,1735,1,0,0,0,1738,1739,5,3,0,0,1739,247,1,0,0,
        0,1740,1741,5,2,0,0,1741,1742,5,106,0,0,1742,1746,3,262,131,0,1743,
        1745,3,70,35,0,1744,1743,1,0,0,0,1745,1748,1,0,0,0,1746,1744,1,0,
        0,0,1746,1747,1,0,0,0,1747,1749,1,0,0,0,1748,1746,1,0,0,0,1749,1750,
        5,3,0,0,1750,249,1,0,0,0,1751,1752,5,2,0,0,1752,1753,5,104,0,0,1753,
        1757,3,262,131,0,1754,1756,3,70,35,0,1755,1754,1,0,0,0,1756,1759,
        1,0,0,0,1757,1755,1,0,0,0,1757,1758,1,0,0,0,1758,1760,1,0,0,0,1759,
        1757,1,0,0,0,1760,1761,5,3,0,0,1761,251,1,0,0,0,1762,1763,5,2,0,
        0,1763,1764,5,108,0,0,1764,1768,3,262,131,0,1765,1767,3,70,35,0,
        1766,1765,1,0,0,0,1767,1770,1,0,0,0,1768,1766,1,0,0,0,1768,1769,
        1,0,0,0,1769,1771,1,0,0,0,1770,1768,1,0,0,0,1771,1772,5,3,0,0,1772,
        253,1,0,0,0,1773,1774,5,2,0,0,1774,1775,5,102,0,0,1775,1779,3,262,
        131,0,1776,1778,3,70,35,0,1777,1776,1,0,0,0,1778,1781,1,0,0,0,1779,
        1777,1,0,0,0,1779,1780,1,0,0,0,1780,1782,1,0,0,0,1781,1779,1,0,0,
        0,1782,1783,5,3,0,0,1783,255,1,0,0,0,1784,1785,5,2,0,0,1785,1789,
        5,17,0,0,1786,1788,3,50,25,0,1787,1786,1,0,0,0,1788,1791,1,0,0,0,
        1789,1787,1,0,0,0,1789,1790,1,0,0,0,1790,1792,1,0,0,0,1791,1789,
        1,0,0,0,1792,1793,3,68,34,0,1793,1797,3,262,131,0,1794,1796,3,70,
        35,0,1795,1794,1,0,0,0,1796,1799,1,0,0,0,1797,1795,1,0,0,0,1797,
        1798,1,0,0,0,1798,1800,1,0,0,0,1799,1797,1,0,0,0,1800,1801,5,3,0,
        0,1801,257,1,0,0,0,1802,1803,5,2,0,0,1803,1807,5,63,0,0,1804,1806,
        3,50,25,0,1805,1804,1,0,0,0,1806,1809,1,0,0,0,1807,1805,1,0,0,0,
        1807,1808,1,0,0,0,1808,1810,1,0,0,0,1809,1807,1,0,0,0,1810,1811,
        3,68,34,0,1811,1812,3,262,131,0,1812,1813,5,3,0,0,1813,259,1,0,0,
        0,1814,1815,5,2,0,0,1815,1816,5,67,0,0,1816,1820,3,262,131,0,1817,
        1819,3,70,35,0,1818,1817,1,0,0,0,1819,1822,1,0,0,0,1820,1818,1,0,
        0,0,1820,1821,1,0,0,0,1821,1823,1,0,0,0,1822,1820,1,0,0,0,1823,1824,
        5,3,0,0,1824,261,1,0,0,0,1825,1829,5,2,0,0,1826,1828,3,264,132,0,
        1827,1826,1,0,0,0,1828,1831,1,0,0,0,1829,1827,1,0,0,0,1829,1830,
        1,0,0,0,1830,1833,1,0,0,0,1831,1829,1,0,0,0,1832,1834,3,266,133,
        0,1833,1832,1,0,0,0,1833,1834,1,0,0,0,1834,1835,1,0,0,0,1835,1838,
        5,3,0,0,1836,1837,5,101,0,0,1837,1839,3,136,68,0,1838,1836,1,0,0,
        0,1838,1839,1,0,0,0,1839,263,1,0,0,0,1840,1841,5,2,0,0,1841,1843,
        5,171,0,0,1842,1844,5,97,0,0,1843,1842,1,0,0,0,1843,1844,1,0,0,0,
        1844,1847,1,0,0,0,1845,1846,5,101,0,0,1846,1848,3,136,68,0,1847,
        1845,1,0,0,0,1847,1848,1,0,0,0,1848,1854,1,0,0,0,1849,1850,5,2,0,
        0,1850,1851,5,51,0,0,1851,1852,3,218,109,0,1852,1853,5,3,0,0,1853,
        1855,1,0,0,0,1854,1849,1,0,0,0,1854,1855,1,0,0,0,1855,1856,1,0,0,
        0,1856,1857,5,3,0,0,1857,265,1,0,0,0,1858,1859,5,2,0,0,1859,1860,
        5,86,0,0,1860,1863,5,171,0,0,1861,1862,5,101,0,0,1862,1864,3,136,
        68,0,1863,1861,1,0,0,0,1863,1864,1,0,0,0,1864,1865,1,0,0,0,1865,
        1866,5,3,0,0,1866,267,1,0,0,0,1867,1868,5,2,0,0,1868,1869,5,112,
        0,0,1869,1870,3,218,109,0,1870,1871,5,3,0,0,1871,269,1,0,0,0,1872,
        1873,5,2,0,0,1873,1875,5,111,0,0,1874,1876,3,218,109,0,1875,1874,
        1,0,0,0,1875,1876,1,0,0,0,1876,1877,1,0,0,0,1877,1878,5,3,0,0,1878,
        271,1,0,0,0,1879,1880,5,2,0,0,1880,1881,5,110,0,0,1881,1882,3,218,
        109,0,1882,1883,5,3,0,0,1883,273,1,0,0,0,1884,1885,5,2,0,0,1885,
        1886,5,19,0,0,1886,1887,3,218,109,0,1887,1891,3,218,109,0,1888,1890,
        3,218,109,0,1889,1888,1,0,0,0,1890,1893,1,0,0,0,1891,1889,1,0,0,
        0,1891,1892,1,0,0,0,1892,1894,1,0,0,0,1893,1891,1,0,0,0,1894,1895,
        5,3,0,0,1895,275,1,0,0,0,1896,1897,5,2,0,0,1897,1898,5,20,0,0,1898,
        1899,3,218,109,0,1899,1903,3,218,109,0,1900,1902,3,218,109,0,1901,
        1900,1,0,0,0,1902,1905,1,0,0,0,1903,1901,1,0,0,0,1903,1904,1,0,0,
        0,1904,1906,1,0,0,0,1905,1903,1,0,0,0,1906,1907,5,3,0,0,1907,277,
        1,0,0,0,1908,1909,5,2,0,0,1909,1910,5,32,0,0,1910,1911,3,218,109,
        0,1911,1912,3,218,109,0,1912,1913,3,218,109,0,1913,1914,5,3,0,0,
        1914,279,1,0,0,0,1915,1916,5,2,0,0,1916,1918,5,33,0,0,1917,1919,
        3,282,141,0,1918,1917,1,0,0,0,1919,1920,1,0,0,0,1920,1918,1,0,0,
        0,1920,1921,1,0,0,0,1921,1923,1,0,0,0,1922,1924,3,284,142,0,1923,
        1922,1,0,0,0,1923,1924,1,0,0,0,1924,1925,1,0,0,0,1925,1926,5,3,0,
        0,1926,281,1,0,0,0,1927,1928,3,218,109,0,1928,1929,3,218,109,0,1929,
        283,1,0,0,0,1930,1931,5,122,0,0,1931,1932,3,218,109,0,1932,285,1,
        0,0,0,1933,1934,5,2,0,0,1934,1935,5,47,0,0,1935,1937,5,171,0,0,1936,
        1938,3,352,176,0,1937,1936,1,0,0,0,1937,1938,1,0,0,0,1938,1942,1,
        0,0,0,1939,1941,3,218,109,0,1940,1939,1,0,0,0,1941,1944,1,0,0,0,
        1942,1940,1,0,0,0,1942,1943,1,0,0,0,1943,1945,1,0,0,0,1944,1942,
        1,0,0,0,1945,1946,5,3,0,0,1946,287,1,0,0,0,1947,1948,5,2,0,0,1948,
        1952,5,34,0,0,1949,1951,3,290,145,0,1950,1949,1,0,0,0,1951,1954,
        1,0,0,0,1952,1950,1,0,0,0,1952,1953,1,0,0,0,1953,1955,1,0,0,0,1954,
        1952,1,0,0,0,1955,1956,5,3,0,0,1956,289,1,0,0,0,1957,1958,5,2,0,
        0,1958,1959,3,304,152,0,1959,1960,3,218,109,0,1960,1961,5,3,0,0,
        1961,1985,1,0,0,0,1962,1963,5,2,0,0,1963,1964,3,304,152,0,1964,1965,
        3,292,146,0,1965,1966,5,3,0,0,1966,1985,1,0,0,0,1967,1968,5,2,0,
        0,1968,1969,5,171,0,0,1969,1985,5,3,0,0,1970,1971,5,2,0,0,1971,1972,
        5,123,0,0,1972,1973,3,218,109,0,1973,1974,5,124,0,0,1974,1975,3,
        218,109,0,1975,1976,5,3,0,0,1976,1985,1,0,0,0,1977,1978,5,2,0,0,
        1978,1979,5,123,0,0,1979,1980,3,218,109,0,1980,1981,5,124,0,0,1981,
        1982,3,292,146,0,1982,1983,5,3,0,0,1983,1985,1,0,0,0,1984,1957,1,
        0,0,0,1984,1962,1,0,0,0,1984,1967,1,0,0,0,1984,1970,1,0,0,0,1984,
        1977,1,0,0,0,1985,291,1,0,0,0,1986,1987,5,2,0,0,1987,1988,5,18,0,
        0,1988,1992,3,354,177,0,1989,1991,3,70,35,0,1990,1989,1,0,0,0,1991,
        1994,1,0,0,0,1992,1990,1,0,0,0,1992,1993,1,0,0,0,1993,1995,1,0,0,
        0,1994,1992,1,0,0,0,1995,1996,5,3,0,0,1996,293,1,0,0,0,1997,1998,
        5,2,0,0,1998,2002,5,36,0,0,1999,2001,3,218,109,0,2000,1999,1,0,0,
        0,2001,2004,1,0,0,0,2002,2000,1,0,0,0,2002,2003,1,0,0,0,2003,2005,
        1,0,0,0,2004,2002,1,0,0,0,2005,2006,5,3,0,0,2006,295,1,0,0,0,2007,
        2021,5,123,0,0,2008,2015,3,218,109,0,2009,2011,5,4,0,0,2010,2009,
        1,0,0,0,2010,2011,1,0,0,0,2011,2012,1,0,0,0,2012,2014,3,218,109,
        0,2013,2010,1,0,0,0,2014,2017,1,0,0,0,2015,2013,1,0,0,0,2015,2016,
        1,0,0,0,2016,2019,1,0,0,0,2017,2015,1,0,0,0,2018,2020,5,4,0,0,2019,
        2018,1,0,0,0,2019,2020,1,0,0,0,2020,2022,1,0,0,0,2021,2008,1,0,0,
        0,2021,2022,1,0,0,0,2022,2023,1,0,0,0,2023,2024,5,124,0,0,2024,297,
        1,0,0,0,2025,2039,5,139,0,0,2026,2033,3,300,150,0,2027,2029,5,4,
        0,0,2028,2027,1,0,0,0,2028,2029,1,0,0,0,2029,2030,1,0,0,0,2030,2032,
        3,300,150,0,2031,2028,1,0,0,0,2032,2035,1,0,0,0,2033,2031,1,0,0,
        0,2033,2034,1,0,0,0,2034,2037,1,0,0,0,2035,2033,1,0,0,0,2036,2038,
        5,4,0,0,2037,2036,1,0,0,0,2037,2038,1,0,0,0,2038,2040,1,0,0,0,2039,
        2026,1,0,0,0,2039,2040,1,0,0,0,2040,2041,1,0,0,0,2041,2042,5,140,
        0,0,2042,299,1,0,0,0,2043,2044,7,4,0,0,2044,2045,5,101,0,0,2045,
        2054,3,218,109,0,2046,2047,5,123,0,0,2047,2048,3,218,109,0,2048,
        2049,5,124,0,0,2049,2050,5,101,0,0,2050,2051,3,218,109,0,2051,2054,
        1,0,0,0,2052,2054,5,171,0,0,2053,2043,1,0,0,0,2053,2046,1,0,0,0,
        2053,2052,1,0,0,0,2054,301,1,0,0,0,2055,2056,5,2,0,0,2056,2059,5,
        85,0,0,2057,2060,5,165,0,0,2058,2060,3,218,109,0,2059,2057,1,0,0,
        0,2059,2058,1,0,0,0,2060,2061,1,0,0,0,2061,2059,1,0,0,0,2061,2062,
        1,0,0,0,2062,2063,1,0,0,0,2063,2064,5,3,0,0,2064,303,1,0,0,0,2065,
        2066,7,5,0,0,2066,305,1,0,0,0,2067,2068,7,6,0,0,2068,307,1,0,0,0,
        2069,2070,5,2,0,0,2070,2071,5,40,0,0,2071,2072,3,218,109,0,2072,
        2073,3,304,152,0,2073,2074,5,3,0,0,2074,2084,1,0,0,0,2075,2076,5,
        2,0,0,2076,2077,5,40,0,0,2077,2078,3,218,109,0,2078,2079,5,123,0,
        0,2079,2080,3,218,109,0,2080,2081,5,124,0,0,2081,2082,5,3,0,0,2082,
        2084,1,0,0,0,2083,2069,1,0,0,0,2083,2075,1,0,0,0,2084,309,1,0,0,
        0,2085,2086,5,2,0,0,2086,2087,5,37,0,0,2087,2088,3,218,109,0,2088,
        2089,5,165,0,0,2089,2090,5,3,0,0,2090,311,1,0,0,0,2091,2092,5,2,
        0,0,2092,2093,5,41,0,0,2093,2094,3,218,109,0,2094,2095,3,218,109,
        0,2095,2096,5,3,0,0,2096,313,1,0,0,0,2097,2098,5,2,0,0,2098,2099,
        7,7,0,0,2099,2100,3,316,158,0,2100,2101,5,3,0,0,2101,315,1,0,0,0,
        2102,2103,3,318,159,0,2103,317,1,0,0,0,2104,2105,5,2,0,0,2105,2106,
        5,46,0,0,2106,2107,3,218,109,0,2107,2108,5,3,0,0,2108,2128,1,0,0,
        0,2109,2110,5,2,0,0,2110,2111,5,45,0,0,2111,2112,3,218,109,0,2112,
        2113,5,3,0,0,2113,2128,1,0,0,0,2114,2115,5,170,0,0,2115,2128,3,218,
        109,0,2116,2117,5,169,0,0,2117,2128,3,218,109,0,2118,2122,5,2,0,
        0,2119,2121,3,318,159,0,2120,2119,1,0,0,0,2121,2124,1,0,0,0,2122,
        2120,1,0,0,0,2122,2123,1,0,0,0,2123,2125,1,0,0,0,2124,2122,1,0,0,
        0,2125,2128,5,3,0,0,2126,2128,8,8,0,0,2127,2104,1,0,0,0,2127,2109,
        1,0,0,0,2127,2114,1,0,0,0,2127,2116,1,0,0,0,2127,2118,1,0,0,0,2127,
        2126,1,0,0,0,2128,319,1,0,0,0,2129,2130,5,2,0,0,2130,2131,5,46,0,
        0,2131,2132,3,218,109,0,2132,2133,5,3,0,0,2133,321,1,0,0,0,2134,
        2135,5,2,0,0,2135,2136,5,45,0,0,2136,2137,3,218,109,0,2137,2138,
        5,3,0,0,2138,323,1,0,0,0,2139,2140,5,170,0,0,2140,2141,3,218,109,
        0,2141,325,1,0,0,0,2142,2143,5,169,0,0,2143,2144,3,218,109,0,2144,
        327,1,0,0,0,2145,2146,5,2,0,0,2146,2147,5,39,0,0,2147,2148,3,218,
        109,0,2148,2149,3,304,152,0,2149,2150,5,3,0,0,2150,329,1,0,0,0,2151,
        2152,5,2,0,0,2152,2153,5,38,0,0,2153,2154,3,218,109,0,2154,2155,
        3,218,109,0,2155,2156,5,3,0,0,2156,331,1,0,0,0,2157,2158,5,2,0,0,
        2158,2159,5,42,0,0,2159,2160,3,218,109,0,2160,2161,3,218,109,0,2161,
        2162,5,3,0,0,2162,333,1,0,0,0,2163,2164,5,141,0,0,2164,2165,3,336,
        168,0,2165,2166,5,140,0,0,2166,335,1,0,0,0,2167,2173,3,338,169,0,
        2168,2169,3,344,172,0,2169,2170,3,338,169,0,2170,2172,1,0,0,0,2171,
        2168,1,0,0,0,2172,2175,1,0,0,0,2173,2171,1,0,0,0,2173,2174,1,0,0,
        0,2174,337,1,0,0,0,2175,2173,1,0,0,0,2176,2177,6,169,-1,0,2177,2178,
        5,171,0,0,2178,2180,5,2,0,0,2179,2181,3,340,170,0,2180,2179,1,0,
        0,0,2180,2181,1,0,0,0,2181,2182,1,0,0,0,2182,2193,5,3,0,0,2183,2184,
        5,139,0,0,2184,2185,3,336,168,0,2185,2186,5,140,0,0,2186,2193,1,
        0,0,0,2187,2188,3,342,171,0,2188,2189,3,338,169,3,2189,2193,1,0,
        0,0,2190,2193,3,360,180,0,2191,2193,5,171,0,0,2192,2176,1,0,0,0,
        2192,2183,1,0,0,0,2192,2187,1,0,0,0,2192,2190,1,0,0,0,2192,2191,
        1,0,0,0,2193,2202,1,0,0,0,2194,2195,10,5,0,0,2195,2197,5,2,0,0,2196,
        2198,3,340,170,0,2197,2196,1,0,0,0,2197,2198,1,0,0,0,2198,2199,1,
        0,0,0,2199,2201,5,3,0,0,2200,2194,1,0,0,0,2201,2204,1,0,0,0,2202,
        2200,1,0,0,0,2202,2203,1,0,0,0,2203,339,1,0,0,0,2204,2202,1,0,0,
        0,2205,2210,3,336,168,0,2206,2207,5,4,0,0,2207,2209,3,336,168,0,
        2208,2206,1,0,0,0,2209,2212,1,0,0,0,2210,2208,1,0,0,0,2210,2211,
        1,0,0,0,2211,341,1,0,0,0,2212,2210,1,0,0,0,2213,2214,7,9,0,0,2214,
        343,1,0,0,0,2215,2216,7,10,0,0,2216,345,1,0,0,0,2217,2218,5,2,0,
        0,2218,2222,5,171,0,0,2219,2221,3,218,109,0,2220,2219,1,0,0,0,2221,
        2224,1,0,0,0,2222,2220,1,0,0,0,2222,2223,1,0,0,0,2223,2225,1,0,0,
        0,2224,2222,1,0,0,0,2225,2229,5,131,0,0,2226,2228,3,70,35,0,2227,
        2226,1,0,0,0,2228,2231,1,0,0,0,2229,2227,1,0,0,0,2229,2230,1,0,0,
        0,2230,2232,1,0,0,0,2231,2229,1,0,0,0,2232,2233,5,3,0,0,2233,347,
        1,0,0,0,2234,2235,5,2,0,0,2235,2239,5,171,0,0,2236,2238,3,218,109,
        0,2237,2236,1,0,0,0,2238,2241,1,0,0,0,2239,2237,1,0,0,0,2239,2240,
        1,0,0,0,2240,2242,1,0,0,0,2241,2239,1,0,0,0,2242,2246,5,132,0,0,
        2243,2245,3,70,35,0,2244,2243,1,0,0,0,2245,2248,1,0,0,0,2246,2244,
        1,0,0,0,2246,2247,1,0,0,0,2247,2249,1,0,0,0,2248,2246,1,0,0,0,2249,
        2250,5,3,0,0,2250,349,1,0,0,0,2251,2252,5,2,0,0,2252,2254,3,218,
        109,0,2253,2255,3,352,176,0,2254,2253,1,0,0,0,2254,2255,1,0,0,0,
        2255,2259,1,0,0,0,2256,2258,3,218,109,0,2257,2256,1,0,0,0,2258,2261,
        1,0,0,0,2259,2257,1,0,0,0,2259,2260,1,0,0,0,2260,2262,1,0,0,0,2261,
        2259,1,0,0,0,2262,2263,5,3,0,0,2263,351,1,0,0,0,2264,2265,5,2,0,
        0,2265,2267,5,89,0,0,2266,2268,3,136,68,0,2267,2266,1,0,0,0,2268,
        2269,1,0,0,0,2269,2267,1,0,0,0,2269,2270,1,0,0,0,2270,2271,1,0,0,
        0,2271,2272,5,3,0,0,2272,353,1,0,0,0,2273,2290,5,2,0,0,2274,2281,
        3,356,178,0,2275,2277,5,4,0,0,2276,2275,1,0,0,0,2276,2277,1,0,0,
        0,2277,2278,1,0,0,0,2278,2280,3,356,178,0,2279,2276,1,0,0,0,2280,
        2283,1,0,0,0,2281,2279,1,0,0,0,2281,2282,1,0,0,0,2282,2288,1,0,0,
        0,2283,2281,1,0,0,0,2284,2286,5,4,0,0,2285,2284,1,0,0,0,2285,2286,
        1,0,0,0,2286,2287,1,0,0,0,2287,2289,3,358,179,0,2288,2285,1,0,0,
        0,2288,2289,1,0,0,0,2289,2291,1,0,0,0,2290,2274,1,0,0,0,2290,2291,
        1,0,0,0,2291,2292,1,0,0,0,2292,2295,5,3,0,0,2293,2294,5,101,0,0,
        2294,2296,3,136,68,0,2295,2293,1,0,0,0,2295,2296,1,0,0,0,2296,2305,
        1,0,0,0,2297,2298,5,2,0,0,2298,2299,3,358,179,0,2299,2302,5,3,0,
        0,2300,2301,5,101,0,0,2301,2303,3,136,68,0,2302,2300,1,0,0,0,2302,
        2303,1,0,0,0,2303,2305,1,0,0,0,2304,2273,1,0,0,0,2304,2297,1,0,0,
        0,2305,355,1,0,0,0,2306,2307,5,2,0,0,2307,2309,5,171,0,0,2308,2310,
        5,97,0,0,2309,2308,1,0,0,0,2309,2310,1,0,0,0,2310,2313,1,0,0,0,2311,
        2312,5,101,0,0,2312,2314,3,136,68,0,2313,2311,1,0,0,0,2313,2314,
        1,0,0,0,2314,2315,1,0,0,0,2315,2316,5,3,0,0,2316,357,1,0,0,0,2317,
        2318,5,2,0,0,2318,2319,5,86,0,0,2319,2322,5,171,0,0,2320,2321,5,
        101,0,0,2321,2323,3,136,68,0,2322,2320,1,0,0,0,2322,2323,1,0,0,0,
        2323,2324,1,0,0,0,2324,2325,5,3,0,0,2325,359,1,0,0,0,2326,2327,7,
        11,0,0,2327,361,1,0,0,0,191,367,388,398,407,416,421,423,437,450,
        462,472,479,489,496,506,520,529,532,542,552,560,569,574,577,580,
        590,594,597,612,621,635,644,651,655,663,668,672,679,684,687,692,
        700,710,718,728,740,748,758,766,778,804,812,818,829,835,846,853,
        869,878,888,899,907,927,956,969,978,989,1022,1029,1036,1046,1066,
        1076,1094,1103,1108,1114,1123,1149,1156,1165,1179,1194,1199,1205,
        1215,1225,1234,1239,1285,1295,1306,1312,1320,1329,1336,1339,1371,
        1403,1420,1424,1434,1444,1457,1473,1478,1487,1499,1511,1520,1523,
        1532,1543,1553,1608,1619,1630,1652,1660,1666,1677,1688,1699,1710,
        1718,1724,1735,1746,1757,1768,1779,1789,1797,1807,1820,1829,1833,
        1838,1843,1847,1854,1863,1875,1891,1903,1920,1923,1937,1942,1952,
        1984,1992,2002,2010,2015,2019,2021,2028,2033,2037,2039,2053,2059,
        2061,2083,2122,2127,2173,2180,2192,2197,2202,2210,2222,2229,2239,
        2246,2254,2259,2269,2276,2281,2285,2288,2290,2295,2302,2304,2309,
        2313,2322
    ];

    private static __ATN: antlr.ATN;
    public static get _ATN(): antlr.ATN {
        if (!Stage9Parser.__ATN) {
            Stage9Parser.__ATN = new antlr.ATNDeserializer().deserialize(Stage9Parser._serializedATN);
        }

        return Stage9Parser.__ATN;
    }


    private static readonly vocabulary = new antlr.Vocabulary(Stage9Parser.literalNames, Stage9Parser.symbolicNames, []);

    public override get vocabulary(): antlr.Vocabulary {
        return Stage9Parser.vocabulary;
    }

    private static readonly decisionsToDFA = Stage9Parser._ATN.decisionToState.map( (ds: antlr.DecisionState, index: number) => new antlr.DFA(ds, index) );
}

export class ProgramContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public PROGRAM(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.PROGRAM, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
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
        return Stage9Parser.RULE_program;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterProgram) {
             listener.enterProgram(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
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
    public macroTimeFnDef(): MacroTimeFnDefContext | null {
        return this.getRuleContext(0, MacroTimeFnDefContext);
    }
    public macroImport(): MacroImportContext | null {
        return this.getRuleContext(0, MacroImportContext);
    }
    public macroExport(): MacroExportContext | null {
        return this.getRuleContext(0, MacroExportContext);
    }
    public macroReexport(): MacroReexportContext | null {
        return this.getRuleContext(0, MacroReexportContext);
    }
    public topLevelLet(): TopLevelLetContext | null {
        return this.getRuleContext(0, TopLevelLetContext);
    }
    public topLevelVar(): TopLevelVarContext | null {
        return this.getRuleContext(0, TopLevelVarContext);
    }
    public topLevelConst(): TopLevelConstContext | null {
        return this.getRuleContext(0, TopLevelConstContext);
    }
    public fn(): FnContext | null {
        return this.getRuleContext(0, FnContext);
    }
    public fnO(): FnOContext | null {
        return this.getRuleContext(0, FnOContext);
    }
    public typeAlias(): TypeAliasContext | null {
        return this.getRuleContext(0, TypeAliasContext);
    }
    public interfaceDef(): InterfaceDefContext | null {
        return this.getRuleContext(0, InterfaceDefContext);
    }
    public enumDef(): EnumDefContext | null {
        return this.getRuleContext(0, EnumDefContext);
    }
    public classDef(): ClassDefContext | null {
        return this.getRuleContext(0, ClassDefContext);
    }
    public exportDeclForm(): ExportDeclFormContext | null {
        return this.getRuleContext(0, ExportDeclFormContext);
    }
    public statement(): StatementContext | null {
        return this.getRuleContext(0, StatementContext);
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_topLevel;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterTopLevel) {
             listener.enterTopLevel(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitTopLevel) {
             listener.exitTopLevel(this);
        }
    }
}


export class DeclContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public topLevelLet(): TopLevelLetContext | null {
        return this.getRuleContext(0, TopLevelLetContext);
    }
    public topLevelVar(): TopLevelVarContext | null {
        return this.getRuleContext(0, TopLevelVarContext);
    }
    public topLevelConst(): TopLevelConstContext | null {
        return this.getRuleContext(0, TopLevelConstContext);
    }
    public fn(): FnContext | null {
        return this.getRuleContext(0, FnContext);
    }
    public classDef(): ClassDefContext | null {
        return this.getRuleContext(0, ClassDefContext);
    }
    public interfaceDef(): InterfaceDefContext | null {
        return this.getRuleContext(0, InterfaceDefContext);
    }
    public enumDef(): EnumDefContext | null {
        return this.getRuleContext(0, EnumDefContext);
    }
    public typeAlias(): TypeAliasContext | null {
        return this.getRuleContext(0, TypeAliasContext);
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_decl;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterDecl) {
             listener.enterDecl(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitDecl) {
             listener.exitDecl(this);
        }
    }
}


export class DefmacroContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public DEFMACRO(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.DEFMACRO, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.IDENTIFIER, 0)!;
    }
    public macroSignature(): MacroSignatureContext {
        return this.getRuleContext(0, MacroSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
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
        return Stage9Parser.RULE_defmacro;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterDefmacro) {
             listener.enterDefmacro(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitDefmacro) {
             listener.exitDefmacro(this);
        }
    }
}


export class MacroSignatureContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode[];
    public IDENTIFIER(i: number): antlr.TerminalNode | null;
    public IDENTIFIER(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage9Parser.IDENTIFIER);
    	} else {
    		return this.getToken(Stage9Parser.IDENTIFIER, i);
    	}
    }
    public REST(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.REST, 0);
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_macroSignature;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterMacroSignature) {
             listener.enterMacroSignature(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitMacroSignature) {
             listener.exitMacroSignature(this);
        }
    }
}


export class MacroTimeFnDefContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public MACRO_TIME_ATTR(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.MACRO_TIME_ATTR, 0)!;
    }
    public topLevelLet(): TopLevelLetContext | null {
        return this.getRuleContext(0, TopLevelLetContext);
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public topLevelConst(): TopLevelConstContext | null {
        return this.getRuleContext(0, TopLevelConstContext);
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_macroTimeFnDef;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterMacroTimeFnDef) {
             listener.enterMacroTimeFnDef(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitMacroTimeFnDef) {
             listener.exitMacroTimeFnDef(this);
        }
    }
}


export class MacroImportContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public MACRO_IMPORT(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.MACRO_IMPORT, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.IDENTIFIER, 0)!;
    }
    public STRING(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.STRING, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_macroImport;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterMacroImport) {
             listener.enterMacroImport(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitMacroImport) {
             listener.exitMacroImport(this);
        }
    }
}


export class MacroExportContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public MACRO_EXPORT(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.MACRO_EXPORT, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public macroExportSpec(): MacroExportSpecContext[];
    public macroExportSpec(i: number): MacroExportSpecContext | null;
    public macroExportSpec(i?: number): MacroExportSpecContext[] | MacroExportSpecContext | null {
        if (i === undefined) {
            return this.getRuleContexts(MacroExportSpecContext);
        }

        return this.getRuleContext(i, MacroExportSpecContext);
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_macroExport;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterMacroExport) {
             listener.enterMacroExport(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitMacroExport) {
             listener.exitMacroExport(this);
        }
    }
}


export class MacroExportSpecContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.IDENTIFIER, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_macroExportSpec;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterMacroExportSpec) {
             listener.enterMacroExportSpec(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitMacroExportSpec) {
             listener.exitMacroExportSpec(this);
        }
    }
}


export class MacroReexportContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public MACRO_REEXPORT(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.MACRO_REEXPORT, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode[];
    public IDENTIFIER(i: number): antlr.TerminalNode | null;
    public IDENTIFIER(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage9Parser.IDENTIFIER);
    	} else {
    		return this.getToken(Stage9Parser.IDENTIFIER, i);
    	}
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_macroReexport;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterMacroReexport) {
             listener.enterMacroReexport(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitMacroReexport) {
             listener.exitMacroReexport(this);
        }
    }
}


export class TopLevelLetContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode[];
    public LPAREN(i: number): antlr.TerminalNode | null;
    public LPAREN(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage9Parser.LPAREN);
    	} else {
    		return this.getToken(Stage9Parser.LPAREN, i);
    	}
    }
    public LET(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LET, 0)!;
    }
    public RPAREN(): antlr.TerminalNode[];
    public RPAREN(i: number): antlr.TerminalNode | null;
    public RPAREN(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage9Parser.RPAREN);
    	} else {
    		return this.getToken(Stage9Parser.RPAREN, i);
    	}
    }
    public metaAnnotation(): MetaAnnotationContext[];
    public metaAnnotation(i: number): MetaAnnotationContext | null;
    public metaAnnotation(i?: number): MetaAnnotationContext[] | MetaAnnotationContext | null {
        if (i === undefined) {
            return this.getRuleContexts(MetaAnnotationContext);
        }

        return this.getRuleContext(i, MetaAnnotationContext);
    }
    public starBinding(): StarBindingContext[];
    public starBinding(i: number): StarBindingContext | null;
    public starBinding(i?: number): StarBindingContext[] | StarBindingContext | null {
        if (i === undefined) {
            return this.getRuleContexts(StarBindingContext);
        }

        return this.getRuleContext(i, StarBindingContext);
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_topLevelLet;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterTopLevelLet) {
             listener.enterTopLevelLet(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitTopLevelLet) {
             listener.exitTopLevelLet(this);
        }
    }
}


export class TopLevelVarContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode[];
    public LPAREN(i: number): antlr.TerminalNode | null;
    public LPAREN(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage9Parser.LPAREN);
    	} else {
    		return this.getToken(Stage9Parser.LPAREN, i);
    	}
    }
    public VAR(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.VAR, 0)!;
    }
    public RPAREN(): antlr.TerminalNode[];
    public RPAREN(i: number): antlr.TerminalNode | null;
    public RPAREN(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage9Parser.RPAREN);
    	} else {
    		return this.getToken(Stage9Parser.RPAREN, i);
    	}
    }
    public metaAnnotation(): MetaAnnotationContext[];
    public metaAnnotation(i: number): MetaAnnotationContext | null;
    public metaAnnotation(i?: number): MetaAnnotationContext[] | MetaAnnotationContext | null {
        if (i === undefined) {
            return this.getRuleContexts(MetaAnnotationContext);
        }

        return this.getRuleContext(i, MetaAnnotationContext);
    }
    public starBinding(): StarBindingContext[];
    public starBinding(i: number): StarBindingContext | null;
    public starBinding(i?: number): StarBindingContext[] | StarBindingContext | null {
        if (i === undefined) {
            return this.getRuleContexts(StarBindingContext);
        }

        return this.getRuleContext(i, StarBindingContext);
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_topLevelVar;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterTopLevelVar) {
             listener.enterTopLevelVar(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitTopLevelVar) {
             listener.exitTopLevelVar(this);
        }
    }
}


export class TopLevelConstContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public CONST(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.CONST, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.IDENTIFIER, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public metaAnnotation(): MetaAnnotationContext[];
    public metaAnnotation(i: number): MetaAnnotationContext | null;
    public metaAnnotation(i?: number): MetaAnnotationContext[] | MetaAnnotationContext | null {
        if (i === undefined) {
            return this.getRuleContexts(MetaAnnotationContext);
        }

        return this.getRuleContext(i, MetaAnnotationContext);
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_topLevelConst;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterTopLevelConst) {
             listener.enterTopLevelConst(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitTopLevelConst) {
             listener.exitTopLevelConst(this);
        }
    }
}


export class MetaAnnotationContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public CARET(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.CARET, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.IDENTIFIER, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_metaAnnotation;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterMetaAnnotation) {
             listener.enterMetaAnnotation(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitMetaAnnotation) {
             listener.exitMetaAnnotation(this);
        }
    }
}


export class TypeAliasContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public TYPE(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.TYPE, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.IDENTIFIER, 0)!;
    }
    public typeExpr(): TypeExprContext {
        return this.getRuleContext(0, TypeExprContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public typeParams(): TypeParamsContext | null {
        return this.getRuleContext(0, TypeParamsContext);
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_typeAlias;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterTypeAlias) {
             listener.enterTypeAlias(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitTypeAlias) {
             listener.exitTypeAlias(this);
        }
    }
}


export class InterfaceDefContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public INTERFACE(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.INTERFACE, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.IDENTIFIER, 0)!;
    }
    public typeObject(): TypeObjectContext {
        return this.getRuleContext(0, TypeObjectContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public typeParams(): TypeParamsContext | null {
        return this.getRuleContext(0, TypeParamsContext);
    }
    public interfaceExtends(): InterfaceExtendsContext | null {
        return this.getRuleContext(0, InterfaceExtendsContext);
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_interfaceDef;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterInterfaceDef) {
             listener.enterInterfaceDef(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitInterfaceDef) {
             listener.exitInterfaceDef(this);
        }
    }
}


export class InterfaceExtendsContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public EXTENDS(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.EXTENDS, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public typeExpr(): TypeExprContext[];
    public typeExpr(i: number): TypeExprContext | null;
    public typeExpr(i?: number): TypeExprContext[] | TypeExprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(TypeExprContext);
        }

        return this.getRuleContext(i, TypeExprContext);
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_interfaceExtends;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterInterfaceExtends) {
             listener.enterInterfaceExtends(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitInterfaceExtends) {
             listener.exitInterfaceExtends(this);
        }
    }
}


export class EnumDefContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public ENUM(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.ENUM, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public enumMember(): EnumMemberContext[];
    public enumMember(i: number): EnumMemberContext | null;
    public enumMember(i?: number): EnumMemberContext[] | EnumMemberContext | null {
        if (i === undefined) {
            return this.getRuleContexts(EnumMemberContext);
        }

        return this.getRuleContext(i, EnumMemberContext);
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_enumDef;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterEnumDef) {
             listener.enterEnumDef(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitEnumDef) {
             listener.exitEnumDef(this);
        }
    }
}


export class EnumMemberContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public NUMBER(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.NUMBER, 0);
    }
    public NEG_NUMBER(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.NEG_NUMBER, 0);
    }
    public STRING(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.STRING, 0);
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_enumMember;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterEnumMember) {
             listener.enterEnumMember(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitEnumMember) {
             listener.exitEnumMember(this);
        }
    }
}


export class ClassDefContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public CLASS(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.CLASS, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.IDENTIFIER, 0)!;
    }
    public classBody(): ClassBodyContext {
        return this.getRuleContext(0, ClassBodyContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public modifier(): ModifierContext[];
    public modifier(i: number): ModifierContext | null;
    public modifier(i?: number): ModifierContext[] | ModifierContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ModifierContext);
        }

        return this.getRuleContext(i, ModifierContext);
    }
    public typeParams(): TypeParamsContext | null {
        return this.getRuleContext(0, TypeParamsContext);
    }
    public classExtends(): ClassExtendsContext | null {
        return this.getRuleContext(0, ClassExtendsContext);
    }
    public classImplements(): ClassImplementsContext | null {
        return this.getRuleContext(0, ClassImplementsContext);
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_classDef;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterClassDef) {
             listener.enterClassDef(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitClassDef) {
             listener.exitClassDef(this);
        }
    }
}


export class AnonClassDefContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public CLASS(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.CLASS, 0)!;
    }
    public classBody(): ClassBodyContext {
        return this.getRuleContext(0, ClassBodyContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public modifier(): ModifierContext[];
    public modifier(i: number): ModifierContext | null;
    public modifier(i?: number): ModifierContext[] | ModifierContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ModifierContext);
        }

        return this.getRuleContext(i, ModifierContext);
    }
    public classExtends(): ClassExtendsContext | null {
        return this.getRuleContext(0, ClassExtendsContext);
    }
    public classImplements(): ClassImplementsContext | null {
        return this.getRuleContext(0, ClassImplementsContext);
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_anonClassDef;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterAnonClassDef) {
             listener.enterAnonClassDef(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitAnonClassDef) {
             listener.exitAnonClassDef(this);
        }
    }
}


export class ClassExtendsContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public EXTENDS(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.EXTENDS, 0)!;
    }
    public typeExpr(): TypeExprContext {
        return this.getRuleContext(0, TypeExprContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_classExtends;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterClassExtends) {
             listener.enterClassExtends(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitClassExtends) {
             listener.exitClassExtends(this);
        }
    }
}


export class ClassImplementsContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public IMPLEMENTS(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.IMPLEMENTS, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public typeExpr(): TypeExprContext[];
    public typeExpr(i: number): TypeExprContext | null;
    public typeExpr(i?: number): TypeExprContext[] | TypeExprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(TypeExprContext);
        }

        return this.getRuleContext(i, TypeExprContext);
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_classImplements;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterClassImplements) {
             listener.enterClassImplements(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitClassImplements) {
             listener.exitClassImplements(this);
        }
    }
}


export class ClassBodyContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public CLASS_BODY(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.CLASS_BODY, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public classElement(): ClassElementContext[];
    public classElement(i: number): ClassElementContext | null;
    public classElement(i?: number): ClassElementContext[] | ClassElementContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ClassElementContext);
        }

        return this.getRuleContext(i, ClassElementContext);
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_classBody;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterClassBody) {
             listener.enterClassBody(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitClassBody) {
             listener.exitClassBody(this);
        }
    }
}


export class ClassElementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public fieldDef(): FieldDefContext | null {
        return this.getRuleContext(0, FieldDefContext);
    }
    public constructorDef(): ConstructorDefContext | null {
        return this.getRuleContext(0, ConstructorDefContext);
    }
    public classMethodDef(): ClassMethodDefContext | null {
        return this.getRuleContext(0, ClassMethodDefContext);
    }
    public abstractMethodDef(): AbstractMethodDefContext | null {
        return this.getRuleContext(0, AbstractMethodDefContext);
    }
    public getterDef(): GetterDefContext | null {
        return this.getRuleContext(0, GetterDefContext);
    }
    public setterDef(): SetterDefContext | null {
        return this.getRuleContext(0, SetterDefContext);
    }
    public methodO(): MethodOContext | null {
        return this.getRuleContext(0, MethodOContext);
    }
    public abstractMethodO(): AbstractMethodOContext | null {
        return this.getRuleContext(0, AbstractMethodOContext);
    }
    public constructorO(): ConstructorOContext | null {
        return this.getRuleContext(0, ConstructorOContext);
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_classElement;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterClassElement) {
             listener.enterClassElement(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitClassElement) {
             listener.exitClassElement(this);
        }
    }
}


export class ModifierContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public PUBLIC(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.PUBLIC, 0);
    }
    public PRIVATE(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.PRIVATE, 0);
    }
    public PROTECTED(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.PROTECTED, 0);
    }
    public STATIC(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.STATIC, 0);
    }
    public ABSTRACT(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.ABSTRACT, 0);
    }
    public OVERRIDE(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.OVERRIDE, 0);
    }
    public ASYNC(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.ASYNC, 0);
    }
    public GENERATOR(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.GENERATOR, 0);
    }
    public READONLY(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.READONLY, 0);
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_modifier;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterModifier) {
             listener.enterModifier(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitModifier) {
             listener.exitModifier(this);
        }
    }
}


export class FieldDefContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode[];
    public LPAREN(i: number): antlr.TerminalNode | null;
    public LPAREN(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage9Parser.LPAREN);
    	} else {
    		return this.getToken(Stage9Parser.LPAREN, i);
    	}
    }
    public FIELD(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.FIELD, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode[];
    public RPAREN(i: number): antlr.TerminalNode | null;
    public RPAREN(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage9Parser.RPAREN);
    	} else {
    		return this.getToken(Stage9Parser.RPAREN, i);
    	}
    }
    public modifier(): ModifierContext[];
    public modifier(i: number): ModifierContext | null;
    public modifier(i?: number): ModifierContext[] | ModifierContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ModifierContext);
        }

        return this.getRuleContext(i, ModifierContext);
    }
    public COLON(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.COLON, 0);
    }
    public typeExpr(): TypeExprContext | null {
        return this.getRuleContext(0, TypeExprContext);
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_fieldDef;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterFieldDef) {
             listener.enterFieldDef(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitFieldDef) {
             listener.exitFieldDef(this);
        }
    }
}


export class ConstructorParamContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public modifier(): ModifierContext[];
    public modifier(i: number): ModifierContext | null;
    public modifier(i?: number): ModifierContext[] | ModifierContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ModifierContext);
        }

        return this.getRuleContext(i, ModifierContext);
    }
    public OPTIONAL(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.OPTIONAL, 0);
    }
    public COLON(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.COLON, 0);
    }
    public typeExpr(): TypeExprContext | null {
        return this.getRuleContext(0, TypeExprContext);
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_constructorParam;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterConstructorParam) {
             listener.enterConstructorParam(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitConstructorParam) {
             listener.exitConstructorParam(this);
        }
    }
}


export class ConstructorSignatureContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public constructorParam(): ConstructorParamContext[];
    public constructorParam(i: number): ConstructorParamContext | null;
    public constructorParam(i?: number): ConstructorParamContext[] | ConstructorParamContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ConstructorParamContext);
        }

        return this.getRuleContext(i, ConstructorParamContext);
    }
    public COLON(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.COLON, 0);
    }
    public typeExpr(): TypeExprContext | null {
        return this.getRuleContext(0, TypeExprContext);
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage9Parser.COMMA);
    	} else {
    		return this.getToken(Stage9Parser.COMMA, i);
    	}
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_constructorSignature;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterConstructorSignature) {
             listener.enterConstructorSignature(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitConstructorSignature) {
             listener.exitConstructorSignature(this);
        }
    }
}


export class ConstructorDefContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public CONSTRUCTOR(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.CONSTRUCTOR, 0)!;
    }
    public constructorSignature(): ConstructorSignatureContext {
        return this.getRuleContext(0, ConstructorSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
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
        return Stage9Parser.RULE_constructorDef;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterConstructorDef) {
             listener.enterConstructorDef(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitConstructorDef) {
             listener.exitConstructorDef(this);
        }
    }
}


export class ClassMethodDefContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public METHOD(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.METHOD, 0)!;
    }
    public methodKey(): MethodKeyContext {
        return this.getRuleContext(0, MethodKeyContext)!;
    }
    public fnSignature(): FnSignatureContext {
        return this.getRuleContext(0, FnSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public modifier(): ModifierContext[];
    public modifier(i: number): ModifierContext | null;
    public modifier(i?: number): ModifierContext[] | ModifierContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ModifierContext);
        }

        return this.getRuleContext(i, ModifierContext);
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
        return Stage9Parser.RULE_classMethodDef;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterClassMethodDef) {
             listener.enterClassMethodDef(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitClassMethodDef) {
             listener.exitClassMethodDef(this);
        }
    }
}


export class AbstractMethodDefContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public ABSTRACT_METHOD(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.ABSTRACT_METHOD, 0)!;
    }
    public methodKey(): MethodKeyContext {
        return this.getRuleContext(0, MethodKeyContext)!;
    }
    public fnSignature(): FnSignatureContext {
        return this.getRuleContext(0, FnSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public modifier(): ModifierContext[];
    public modifier(i: number): ModifierContext | null;
    public modifier(i?: number): ModifierContext[] | ModifierContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ModifierContext);
        }

        return this.getRuleContext(i, ModifierContext);
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_abstractMethodDef;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterAbstractMethodDef) {
             listener.enterAbstractMethodDef(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitAbstractMethodDef) {
             listener.exitAbstractMethodDef(this);
        }
    }
}


export class GetterDefContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public GET(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.GET, 0)!;
    }
    public methodKey(): MethodKeyContext {
        return this.getRuleContext(0, MethodKeyContext)!;
    }
    public fnSignature(): FnSignatureContext {
        return this.getRuleContext(0, FnSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public modifier(): ModifierContext[];
    public modifier(i: number): ModifierContext | null;
    public modifier(i?: number): ModifierContext[] | ModifierContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ModifierContext);
        }

        return this.getRuleContext(i, ModifierContext);
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
        return Stage9Parser.RULE_getterDef;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterGetterDef) {
             listener.enterGetterDef(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitGetterDef) {
             listener.exitGetterDef(this);
        }
    }
}


export class SetterDefContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public SETPROP(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.SETPROP, 0)!;
    }
    public methodKey(): MethodKeyContext {
        return this.getRuleContext(0, MethodKeyContext)!;
    }
    public fnSignature(): FnSignatureContext {
        return this.getRuleContext(0, FnSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public modifier(): ModifierContext[];
    public modifier(i: number): ModifierContext | null;
    public modifier(i?: number): ModifierContext[] | ModifierContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ModifierContext);
        }

        return this.getRuleContext(i, ModifierContext);
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
        return Stage9Parser.RULE_setterDef;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterSetterDef) {
             listener.enterSetterDef(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitSetterDef) {
             listener.exitSetterDef(this);
        }
    }
}


export class MethodKeyContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public IDENTIFIER(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.IDENTIFIER, 0);
    }
    public GET(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.GET, 0);
    }
    public SETPROP(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.SETPROP, 0);
    }
    public LBRACK(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.LBRACK, 0);
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public RBRACK(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.RBRACK, 0);
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_methodKey;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterMethodKey) {
             listener.enterMethodKey(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitMethodKey) {
             listener.exitMethodKey(this);
        }
    }
}


export class StatementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public letStmt(): LetStmtContext | null {
        return this.getRuleContext(0, LetStmtContext);
    }
    public varStmt(): VarStmtContext | null {
        return this.getRuleContext(0, VarStmtContext);
    }
    public constStar(): ConstStarContext | null {
        return this.getRuleContext(0, ConstStarContext);
    }
    public constStmt(): ConstStmtContext | null {
        return this.getRuleContext(0, ConstStmtContext);
    }
    public ifForm(): IfFormContext | null {
        return this.getRuleContext(0, IfFormContext);
    }
    public whileForm(): WhileFormContext | null {
        return this.getRuleContext(0, WhileFormContext);
    }
    public exceptForm(): ExceptFormContext | null {
        return this.getRuleContext(0, ExceptFormContext);
    }
    public returnForm(): ReturnFormContext | null {
        return this.getRuleContext(0, ReturnFormContext);
    }
    public throwForm(): ThrowFormContext | null {
        return this.getRuleContext(0, ThrowFormContext);
    }
    public breakForm(): BreakFormContext | null {
        return this.getRuleContext(0, BreakFormContext);
    }
    public continueForm(): ContinueFormContext | null {
        return this.getRuleContext(0, ContinueFormContext);
    }
    public importForm(): ImportFormContext | null {
        return this.getRuleContext(0, ImportFormContext);
    }
    public importTypeForm(): ImportTypeFormContext | null {
        return this.getRuleContext(0, ImportTypeFormContext);
    }
    public exportForm(): ExportFormContext | null {
        return this.getRuleContext(0, ExportFormContext);
    }
    public switchForm(): SwitchFormContext | null {
        return this.getRuleContext(0, SwitchFormContext);
    }
    public forForm(): ForFormContext | null {
        return this.getRuleContext(0, ForFormContext);
    }
    public forInForm(): ForInFormContext | null {
        return this.getRuleContext(0, ForInFormContext);
    }
    public forOfForm(): ForOfFormContext | null {
        return this.getRuleContext(0, ForOfFormContext);
    }
    public forAwaitForm(): ForAwaitFormContext | null {
        return this.getRuleContext(0, ForAwaitFormContext);
    }
    public assign(): AssignContext | null {
        return this.getRuleContext(0, AssignContext);
    }
    public compoundAssign(): CompoundAssignContext | null {
        return this.getRuleContext(0, CompoundAssignContext);
    }
    public subscriptAssign(): SubscriptAssignContext | null {
        return this.getRuleContext(0, SubscriptAssignContext);
    }
    public macroBodyCall(): MacroBodyCallContext | null {
        return this.getRuleContext(0, MacroBodyCallContext);
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_statement;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterStatement) {
             listener.enterStatement(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitStatement) {
             listener.exitStatement(this);
        }
    }
}


export class LetStmtContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode[];
    public LPAREN(i: number): antlr.TerminalNode | null;
    public LPAREN(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage9Parser.LPAREN);
    	} else {
    		return this.getToken(Stage9Parser.LPAREN, i);
    	}
    }
    public LET(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LET, 0)!;
    }
    public RPAREN(): antlr.TerminalNode[];
    public RPAREN(i: number): antlr.TerminalNode | null;
    public RPAREN(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage9Parser.RPAREN);
    	} else {
    		return this.getToken(Stage9Parser.RPAREN, i);
    	}
    }
    public starBinding(): StarBindingContext[];
    public starBinding(i: number): StarBindingContext | null;
    public starBinding(i?: number): StarBindingContext[] | StarBindingContext | null {
        if (i === undefined) {
            return this.getRuleContexts(StarBindingContext);
        }

        return this.getRuleContext(i, StarBindingContext);
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
        return Stage9Parser.RULE_letStmt;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterLetStmt) {
             listener.enterLetStmt(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitLetStmt) {
             listener.exitLetStmt(this);
        }
    }
}


export class VarStmtContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode[];
    public LPAREN(i: number): antlr.TerminalNode | null;
    public LPAREN(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage9Parser.LPAREN);
    	} else {
    		return this.getToken(Stage9Parser.LPAREN, i);
    	}
    }
    public VAR(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.VAR, 0)!;
    }
    public RPAREN(): antlr.TerminalNode[];
    public RPAREN(i: number): antlr.TerminalNode | null;
    public RPAREN(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage9Parser.RPAREN);
    	} else {
    		return this.getToken(Stage9Parser.RPAREN, i);
    	}
    }
    public starBinding(): StarBindingContext[];
    public starBinding(i: number): StarBindingContext | null;
    public starBinding(i?: number): StarBindingContext[] | StarBindingContext | null {
        if (i === undefined) {
            return this.getRuleContexts(StarBindingContext);
        }

        return this.getRuleContext(i, StarBindingContext);
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
        return Stage9Parser.RULE_varStmt;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterVarStmt) {
             listener.enterVarStmt(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitVarStmt) {
             listener.exitVarStmt(this);
        }
    }
}


export class ConstStarContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode[];
    public LPAREN(i: number): antlr.TerminalNode | null;
    public LPAREN(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage9Parser.LPAREN);
    	} else {
    		return this.getToken(Stage9Parser.LPAREN, i);
    	}
    }
    public CONSTSTAR(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.CONSTSTAR, 0)!;
    }
    public RPAREN(): antlr.TerminalNode[];
    public RPAREN(i: number): antlr.TerminalNode | null;
    public RPAREN(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage9Parser.RPAREN);
    	} else {
    		return this.getToken(Stage9Parser.RPAREN, i);
    	}
    }
    public starBinding(): StarBindingContext[];
    public starBinding(i: number): StarBindingContext | null;
    public starBinding(i?: number): StarBindingContext[] | StarBindingContext | null {
        if (i === undefined) {
            return this.getRuleContexts(StarBindingContext);
        }

        return this.getRuleContext(i, StarBindingContext);
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
        return Stage9Parser.RULE_constStar;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterConstStar) {
             listener.enterConstStar(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitConstStar) {
             listener.exitConstStar(this);
        }
    }
}


export class ConstStmtContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public CONST(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.CONST, 0)!;
    }
    public singleBinding(): SingleBindingContext {
        return this.getRuleContext(0, SingleBindingContext)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_constStmt;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterConstStmt) {
             listener.enterConstStmt(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitConstStmt) {
             listener.exitConstStmt(this);
        }
    }
}


export class IfFormContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public IF(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.IF, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public thenBlock(): ThenBlockContext {
        return this.getRuleContext(0, ThenBlockContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public elseBlock(): ElseBlockContext | null {
        return this.getRuleContext(0, ElseBlockContext);
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_ifForm;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterIfForm) {
             listener.enterIfForm(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitIfForm) {
             listener.exitIfForm(this);
        }
    }
}


export class ThenBlockContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public THEN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.THEN, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
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
        return Stage9Parser.RULE_thenBlock;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterThenBlock) {
             listener.enterThenBlock(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitThenBlock) {
             listener.exitThenBlock(this);
        }
    }
}


export class ElseBlockContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public ELSE(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.ELSE, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
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
        return Stage9Parser.RULE_elseBlock;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterElseBlock) {
             listener.enterElseBlock(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitElseBlock) {
             listener.exitElseBlock(this);
        }
    }
}


export class WhileFormContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public WHILE(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.WHILE, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
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
        return Stage9Parser.RULE_whileForm;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterWhileForm) {
             listener.enterWhileForm(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitWhileForm) {
             listener.exitWhileForm(this);
        }
    }
}


export class ReturnFormContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public RETURN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RETURN, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_returnForm;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterReturnForm) {
             listener.enterReturnForm(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
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
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public THROW(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.THROW, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_throwForm;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterThrowForm) {
             listener.enterThrowForm(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitThrowForm) {
             listener.exitThrowForm(this);
        }
    }
}


export class BreakFormContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public BREAK(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.BREAK, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_breakForm;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterBreakForm) {
             listener.enterBreakForm(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitBreakForm) {
             listener.exitBreakForm(this);
        }
    }
}


export class ContinueFormContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public CONTINUE(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.CONTINUE, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_continueForm;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterContinueForm) {
             listener.enterContinueForm(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitContinueForm) {
             listener.exitContinueForm(this);
        }
    }
}


export class ImportFormContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public IMPORT(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.IMPORT, 0)!;
    }
    public STRING(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.STRING, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public objectExpr(): ObjectExprContext | null {
        return this.getRuleContext(0, ObjectExprContext);
    }
    public objectDestructPat(): ObjectDestructPatContext | null {
        return this.getRuleContext(0, ObjectDestructPatContext);
    }
    public IDENTIFIER(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.IDENTIFIER, 0);
    }
    public STAR(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.STAR, 0);
    }
    public AS(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.AS, 0);
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_importForm;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterImportForm) {
             listener.enterImportForm(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitImportForm) {
             listener.exitImportForm(this);
        }
    }
}


export class ImportTypeFormContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public IMPORT_TYPE(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.IMPORT_TYPE, 0)!;
    }
    public importTypeSpec(): ImportTypeSpecContext {
        return this.getRuleContext(0, ImportTypeSpecContext)!;
    }
    public STRING(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.STRING, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_importTypeForm;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterImportTypeForm) {
             listener.enterImportTypeForm(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitImportTypeForm) {
             listener.exitImportTypeForm(this);
        }
    }
}


export class ImportTypeSpecContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public importTypeName(): ImportTypeNameContext[];
    public importTypeName(i: number): ImportTypeNameContext | null;
    public importTypeName(i?: number): ImportTypeNameContext[] | ImportTypeNameContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ImportTypeNameContext);
        }

        return this.getRuleContext(i, ImportTypeNameContext);
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_importTypeSpec;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterImportTypeSpec) {
             listener.enterImportTypeSpec(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitImportTypeSpec) {
             listener.exitImportTypeSpec(this);
        }
    }
}


export class ImportTypeNameContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public IDENTIFIER(): antlr.TerminalNode[];
    public IDENTIFIER(i: number): antlr.TerminalNode | null;
    public IDENTIFIER(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage9Parser.IDENTIFIER);
    	} else {
    		return this.getToken(Stage9Parser.IDENTIFIER, i);
    	}
    }
    public LPAREN(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.LPAREN, 0);
    }
    public RPAREN(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.RPAREN, 0);
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_importTypeName;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterImportTypeName) {
             listener.enterImportTypeName(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitImportTypeName) {
             listener.exitImportTypeName(this);
        }
    }
}


export class ExportFormContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public exportBinding(): ExportBindingContext | null {
        return this.getRuleContext(0, ExportBindingContext);
    }
    public exportDefault(): ExportDefaultContext | null {
        return this.getRuleContext(0, ExportDefaultContext);
    }
    public exportNamed(): ExportNamedContext | null {
        return this.getRuleContext(0, ExportNamedContext);
    }
    public exportNsFromForm(): ExportNsFromFormContext | null {
        return this.getRuleContext(0, ExportNsFromFormContext);
    }
    public exportFrom(): ExportFromContext | null {
        return this.getRuleContext(0, ExportFromContext);
    }
    public exportAllFrom(): ExportAllFromContext | null {
        return this.getRuleContext(0, ExportAllFromContext);
    }
    public exportTypeForm(): ExportTypeFormContext | null {
        return this.getRuleContext(0, ExportTypeFormContext);
    }
    public exportTypeFromForm(): ExportTypeFromFormContext | null {
        return this.getRuleContext(0, ExportTypeFromFormContext);
    }
    public exportTypeAllFromForm(): ExportTypeAllFromFormContext | null {
        return this.getRuleContext(0, ExportTypeAllFromFormContext);
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_exportForm;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterExportForm) {
             listener.enterExportForm(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitExportForm) {
             listener.exitExportForm(this);
        }
    }
}


export class ExportBindingContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public EXPORT(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.EXPORT, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.IDENTIFIER, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_exportBinding;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterExportBinding) {
             listener.enterExportBinding(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitExportBinding) {
             listener.exitExportBinding(this);
        }
    }
}


export class ExportDefaultContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public EXPORT_DEFAULT(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.EXPORT_DEFAULT, 0)!;
    }
    public classDef(): ClassDefContext | null {
        return this.getRuleContext(0, ClassDefContext);
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public anonClassDef(): AnonClassDefContext | null {
        return this.getRuleContext(0, AnonClassDefContext);
    }
    public topLevelLet(): TopLevelLetContext | null {
        return this.getRuleContext(0, TopLevelLetContext);
    }
    public topLevelConst(): TopLevelConstContext | null {
        return this.getRuleContext(0, TopLevelConstContext);
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_exportDefault;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterExportDefault) {
             listener.enterExportDefault(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitExportDefault) {
             listener.exitExportDefault(this);
        }
    }
}


export class ExportNamedContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public EXPORT_NAMED(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.EXPORT_NAMED, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public exportNamePair(): ExportNamePairContext[];
    public exportNamePair(i: number): ExportNamePairContext | null;
    public exportNamePair(i?: number): ExportNamePairContext[] | ExportNamePairContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExportNamePairContext);
        }

        return this.getRuleContext(i, ExportNamePairContext);
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_exportNamed;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterExportNamed) {
             listener.enterExportNamed(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitExportNamed) {
             listener.exitExportNamed(this);
        }
    }
}


export class ExportNamePairContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode[];
    public IDENTIFIER(i: number): antlr.TerminalNode | null;
    public IDENTIFIER(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage9Parser.IDENTIFIER);
    	} else {
    		return this.getToken(Stage9Parser.IDENTIFIER, i);
    	}
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_exportNamePair;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterExportNamePair) {
             listener.enterExportNamePair(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitExportNamePair) {
             listener.exitExportNamePair(this);
        }
    }
}


export class ExportFromContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public EXPORT_FROM(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.EXPORT_FROM, 0)!;
    }
    public STRING(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.STRING, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public exportNamePair(): ExportNamePairContext[];
    public exportNamePair(i: number): ExportNamePairContext | null;
    public exportNamePair(i?: number): ExportNamePairContext[] | ExportNamePairContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExportNamePairContext);
        }

        return this.getRuleContext(i, ExportNamePairContext);
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_exportFrom;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterExportFrom) {
             listener.enterExportFrom(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitExportFrom) {
             listener.exitExportFrom(this);
        }
    }
}


export class ExportAllFromContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public EXPORT_ALL_FROM(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.EXPORT_ALL_FROM, 0)!;
    }
    public STRING(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.STRING, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_exportAllFrom;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterExportAllFrom) {
             listener.enterExportAllFrom(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitExportAllFrom) {
             listener.exitExportAllFrom(this);
        }
    }
}


export class ExportNsFromFormContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public EXPORT_NS_FROM(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.EXPORT_NS_FROM, 0)!;
    }
    public STRING(): antlr.TerminalNode[];
    public STRING(i: number): antlr.TerminalNode | null;
    public STRING(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage9Parser.STRING);
    	} else {
    		return this.getToken(Stage9Parser.STRING, i);
    	}
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_exportNsFromForm;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterExportNsFromForm) {
             listener.enterExportNsFromForm(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitExportNsFromForm) {
             listener.exitExportNsFromForm(this);
        }
    }
}


export class ExportTypeFormContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public EXPORT_TYPE(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.EXPORT_TYPE, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public exportNamePair(): ExportNamePairContext[];
    public exportNamePair(i: number): ExportNamePairContext | null;
    public exportNamePair(i?: number): ExportNamePairContext[] | ExportNamePairContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExportNamePairContext);
        }

        return this.getRuleContext(i, ExportNamePairContext);
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_exportTypeForm;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterExportTypeForm) {
             listener.enterExportTypeForm(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitExportTypeForm) {
             listener.exitExportTypeForm(this);
        }
    }
}


export class ExportTypeFromFormContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public EXPORT_TYPE_FROM(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.EXPORT_TYPE_FROM, 0)!;
    }
    public STRING(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.STRING, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public exportNamePair(): ExportNamePairContext[];
    public exportNamePair(i: number): ExportNamePairContext | null;
    public exportNamePair(i?: number): ExportNamePairContext[] | ExportNamePairContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExportNamePairContext);
        }

        return this.getRuleContext(i, ExportNamePairContext);
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_exportTypeFromForm;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterExportTypeFromForm) {
             listener.enterExportTypeFromForm(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitExportTypeFromForm) {
             listener.exitExportTypeFromForm(this);
        }
    }
}


export class ExportTypeAllFromFormContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public EXPORT_TYPE_ALL_FROM(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.EXPORT_TYPE_ALL_FROM, 0)!;
    }
    public STRING(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.STRING, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_exportTypeAllFromForm;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterExportTypeAllFromForm) {
             listener.enterExportTypeAllFromForm(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitExportTypeAllFromForm) {
             listener.exitExportTypeAllFromForm(this);
        }
    }
}


export class ExportDeclFormContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public EXPORT(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.EXPORT, 0)!;
    }
    public decl(): DeclContext {
        return this.getRuleContext(0, DeclContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_exportDeclForm;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterExportDeclForm) {
             listener.enterExportDeclForm(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitExportDeclForm) {
             listener.exitExportDeclForm(this);
        }
    }
}


export class StarBindingContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.IDENTIFIER, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public COLON(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.COLON, 0);
    }
    public typeExpr(): TypeExprContext | null {
        return this.getRuleContext(0, TypeExprContext);
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_starBinding;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterStarBinding) {
             listener.enterStarBinding(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitStarBinding) {
             listener.exitStarBinding(this);
        }
    }
}


export class SingleBindingContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.LPAREN, 0);
    }
    public IDENTIFIER(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.IDENTIFIER, 0);
    }
    public RPAREN(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.RPAREN, 0);
    }
    public COLON(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.COLON, 0);
    }
    public typeExpr(): TypeExprContext | null {
        return this.getRuleContext(0, TypeExprContext);
    }
    public objectDestructPat(): ObjectDestructPatContext | null {
        return this.getRuleContext(0, ObjectDestructPatContext);
    }
    public arrayDestructPat(): ArrayDestructPatContext | null {
        return this.getRuleContext(0, ArrayDestructPatContext);
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_singleBinding;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterSingleBinding) {
             listener.enterSingleBinding(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitSingleBinding) {
             listener.exitSingleBinding(this);
        }
    }
}


export class ObjectDestructPatContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LBRACE(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LBRACE, 0)!;
    }
    public RBRACE(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RBRACE, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode[];
    public IDENTIFIER(i: number): antlr.TerminalNode | null;
    public IDENTIFIER(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage9Parser.IDENTIFIER);
    	} else {
    		return this.getToken(Stage9Parser.IDENTIFIER, i);
    	}
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_objectDestructPat;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterObjectDestructPat) {
             listener.enterObjectDestructPat(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitObjectDestructPat) {
             listener.exitObjectDestructPat(this);
        }
    }
}


export class ArrayDestructPatContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LBRACK(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LBRACK, 0)!;
    }
    public RBRACK(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RBRACK, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode[];
    public IDENTIFIER(i: number): antlr.TerminalNode | null;
    public IDENTIFIER(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage9Parser.IDENTIFIER);
    	} else {
    		return this.getToken(Stage9Parser.IDENTIFIER, i);
    	}
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_arrayDestructPat;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterArrayDestructPat) {
             listener.enterArrayDestructPat(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitArrayDestructPat) {
             listener.exitArrayDestructPat(this);
        }
    }
}


export class TypeExprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public IDENTIFIER(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.IDENTIFIER, 0);
    }
    public NULL(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.NULL, 0);
    }
    public UNDEFINED(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.UNDEFINED, 0);
    }
    public OBJECT(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.OBJECT, 0);
    }
    public LBRACE(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.LBRACE, 0);
    }
    public RBRACE(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.RBRACE, 0);
    }
    public typeUnion(): TypeUnionContext | null {
        return this.getRuleContext(0, TypeUnionContext);
    }
    public typeIntersection(): TypeIntersectionContext | null {
        return this.getRuleContext(0, TypeIntersectionContext);
    }
    public typeArray(): TypeArrayContext | null {
        return this.getRuleContext(0, TypeArrayContext);
    }
    public typeTuple(): TypeTupleContext | null {
        return this.getRuleContext(0, TypeTupleContext);
    }
    public typeFunction(): TypeFunctionContext | null {
        return this.getRuleContext(0, TypeFunctionContext);
    }
    public typeObject(): TypeObjectContext | null {
        return this.getRuleContext(0, TypeObjectContext);
    }
    public typeLiteral(): TypeLiteralContext | null {
        return this.getRuleContext(0, TypeLiteralContext);
    }
    public typeKeyof(): TypeKeyofContext | null {
        return this.getRuleContext(0, TypeKeyofContext);
    }
    public typeTypeof(): TypeTypeofContext | null {
        return this.getRuleContext(0, TypeTypeofContext);
    }
    public typeIndexAccess(): TypeIndexAccessContext | null {
        return this.getRuleContext(0, TypeIndexAccessContext);
    }
    public typeConditional(): TypeConditionalContext | null {
        return this.getRuleContext(0, TypeConditionalContext);
    }
    public typeInfer(): TypeInferContext | null {
        return this.getRuleContext(0, TypeInferContext);
    }
    public typeMapped(): TypeMappedContext | null {
        return this.getRuleContext(0, TypeMappedContext);
    }
    public typeTemplateLiteral(): TypeTemplateLiteralContext | null {
        return this.getRuleContext(0, TypeTemplateLiteralContext);
    }
    public typeApplication(): TypeApplicationContext | null {
        return this.getRuleContext(0, TypeApplicationContext);
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_typeExpr;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterTypeExpr) {
             listener.enterTypeExpr(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitTypeExpr) {
             listener.exitTypeExpr(this);
        }
    }
}


export class TypeUnionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public UNION(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.UNION, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public typeExpr(): TypeExprContext[];
    public typeExpr(i: number): TypeExprContext | null;
    public typeExpr(i?: number): TypeExprContext[] | TypeExprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(TypeExprContext);
        }

        return this.getRuleContext(i, TypeExprContext);
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_typeUnion;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterTypeUnion) {
             listener.enterTypeUnion(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitTypeUnion) {
             listener.exitTypeUnion(this);
        }
    }
}


export class TypeIntersectionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public INTERSECT(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.INTERSECT, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public typeExpr(): TypeExprContext[];
    public typeExpr(i: number): TypeExprContext | null;
    public typeExpr(i?: number): TypeExprContext[] | TypeExprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(TypeExprContext);
        }

        return this.getRuleContext(i, TypeExprContext);
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_typeIntersection;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterTypeIntersection) {
             listener.enterTypeIntersection(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitTypeIntersection) {
             listener.exitTypeIntersection(this);
        }
    }
}


export class TypeArrayContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public TYPE_ARRAY(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.TYPE_ARRAY, 0)!;
    }
    public typeExpr(): TypeExprContext {
        return this.getRuleContext(0, TypeExprContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_typeArray;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterTypeArray) {
             listener.enterTypeArray(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitTypeArray) {
             listener.exitTypeArray(this);
        }
    }
}


export class TypeTupleContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public TUPLE(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.TUPLE, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public typeTupleElement(): TypeTupleElementContext[];
    public typeTupleElement(i: number): TypeTupleElementContext | null;
    public typeTupleElement(i?: number): TypeTupleElementContext[] | TypeTupleElementContext | null {
        if (i === undefined) {
            return this.getRuleContexts(TypeTupleElementContext);
        }

        return this.getRuleContext(i, TypeTupleElementContext);
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_typeTuple;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterTypeTuple) {
             listener.enterTypeTuple(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitTypeTuple) {
             listener.exitTypeTuple(this);
        }
    }
}


export class TypeTupleElementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.LPAREN, 0);
    }
    public REST(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.REST, 0);
    }
    public typeExpr(): TypeExprContext {
        return this.getRuleContext(0, TypeExprContext)!;
    }
    public RPAREN(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.RPAREN, 0);
    }
    public IDENTIFIER(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.IDENTIFIER, 0);
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_typeTupleElement;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterTypeTupleElement) {
             listener.enterTypeTupleElement(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitTypeTupleElement) {
             listener.exitTypeTupleElement(this);
        }
    }
}


export class TypeFunctionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode[];
    public LPAREN(i: number): antlr.TerminalNode | null;
    public LPAREN(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage9Parser.LPAREN);
    	} else {
    		return this.getToken(Stage9Parser.LPAREN, i);
    	}
    }
    public TYPEFN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.TYPEFN, 0)!;
    }
    public RPAREN(): antlr.TerminalNode[];
    public RPAREN(i: number): antlr.TerminalNode | null;
    public RPAREN(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage9Parser.RPAREN);
    	} else {
    		return this.getToken(Stage9Parser.RPAREN, i);
    	}
    }
    public typeExpr(): TypeExprContext {
        return this.getRuleContext(0, TypeExprContext)!;
    }
    public typeParams(): TypeParamsContext | null {
        return this.getRuleContext(0, TypeParamsContext);
    }
    public typeFnParam(): TypeFnParamContext[];
    public typeFnParam(i: number): TypeFnParamContext | null;
    public typeFnParam(i?: number): TypeFnParamContext[] | TypeFnParamContext | null {
        if (i === undefined) {
            return this.getRuleContexts(TypeFnParamContext);
        }

        return this.getRuleContext(i, TypeFnParamContext);
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_typeFunction;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterTypeFunction) {
             listener.enterTypeFunction(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitTypeFunction) {
             listener.exitTypeFunction(this);
        }
    }
}


export class TypeFnParamContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.IDENTIFIER, 0)!;
    }
    public typeExpr(): TypeExprContext {
        return this.getRuleContext(0, TypeExprContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public OPTIONAL(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.OPTIONAL, 0);
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_typeFnParam;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterTypeFnParam) {
             listener.enterTypeFnParam(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitTypeFnParam) {
             listener.exitTypeFnParam(this);
        }
    }
}


export class TypeObjectContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public typeProp(): TypePropContext[];
    public typeProp(i: number): TypePropContext | null;
    public typeProp(i?: number): TypePropContext[] | TypePropContext | null {
        if (i === undefined) {
            return this.getRuleContexts(TypePropContext);
        }

        return this.getRuleContext(i, TypePropContext);
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_typeObject;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterTypeObject) {
             listener.enterTypeObject(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitTypeObject) {
             listener.exitTypeObject(this);
        }
    }
}


export class TypePropContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.IDENTIFIER, 0)!;
    }
    public typeExpr(): TypeExprContext {
        return this.getRuleContext(0, TypeExprContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public propModifier(): PropModifierContext[];
    public propModifier(i: number): PropModifierContext | null;
    public propModifier(i?: number): PropModifierContext[] | PropModifierContext | null {
        if (i === undefined) {
            return this.getRuleContexts(PropModifierContext);
        }

        return this.getRuleContext(i, PropModifierContext);
    }
    public OPTIONAL(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.OPTIONAL, 0);
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_typeProp;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterTypeProp) {
             listener.enterTypeProp(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitTypeProp) {
             listener.exitTypeProp(this);
        }
    }
}


export class PropModifierContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public READONLY(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.READONLY, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_propModifier;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterPropModifier) {
             listener.enterPropModifier(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitPropModifier) {
             listener.exitPropModifier(this);
        }
    }
}


export class TypeLiteralContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public LIT(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LIT, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public STRING(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.STRING, 0);
    }
    public NUMBER(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.NUMBER, 0);
    }
    public BOOLEAN(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.BOOLEAN, 0);
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_typeLiteral;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterTypeLiteral) {
             listener.enterTypeLiteral(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitTypeLiteral) {
             listener.exitTypeLiteral(this);
        }
    }
}


export class TypeKeyofContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public KEYOF(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.KEYOF, 0)!;
    }
    public typeExpr(): TypeExprContext {
        return this.getRuleContext(0, TypeExprContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_typeKeyof;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterTypeKeyof) {
             listener.enterTypeKeyof(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitTypeKeyof) {
             listener.exitTypeKeyof(this);
        }
    }
}


export class TypeTypeofContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public TYPEOF(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.TYPEOF, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_typeTypeof;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterTypeTypeof) {
             listener.enterTypeTypeof(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitTypeTypeof) {
             listener.exitTypeTypeof(this);
        }
    }
}


export class TypeIndexAccessContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public INDEX(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.INDEX, 0)!;
    }
    public typeExpr(): TypeExprContext[];
    public typeExpr(i: number): TypeExprContext | null;
    public typeExpr(i?: number): TypeExprContext[] | TypeExprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(TypeExprContext);
        }

        return this.getRuleContext(i, TypeExprContext);
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_typeIndexAccess;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterTypeIndexAccess) {
             listener.enterTypeIndexAccess(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitTypeIndexAccess) {
             listener.exitTypeIndexAccess(this);
        }
    }
}


export class TypeConditionalContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public COND(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.COND, 0)!;
    }
    public typeExpr(): TypeExprContext[];
    public typeExpr(i: number): TypeExprContext | null;
    public typeExpr(i?: number): TypeExprContext[] | TypeExprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(TypeExprContext);
        }

        return this.getRuleContext(i, TypeExprContext);
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_typeConditional;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterTypeConditional) {
             listener.enterTypeConditional(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitTypeConditional) {
             listener.exitTypeConditional(this);
        }
    }
}


export class TypeInferContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public INFER(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.INFER, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_typeInfer;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterTypeInfer) {
             listener.enterTypeInfer(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitTypeInfer) {
             listener.exitTypeInfer(this);
        }
    }
}


export class TypeMappedContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public MAPPED(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.MAPPED, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.IDENTIFIER, 0)!;
    }
    public typeExpr(): TypeExprContext[];
    public typeExpr(i: number): TypeExprContext | null;
    public typeExpr(i?: number): TypeExprContext[] | TypeExprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(TypeExprContext);
        }

        return this.getRuleContext(i, TypeExprContext);
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public mappedModifiers(): MappedModifiersContext | null {
        return this.getRuleContext(0, MappedModifiersContext);
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_typeMapped;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterTypeMapped) {
             listener.enterTypeMapped(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitTypeMapped) {
             listener.exitTypeMapped(this);
        }
    }
}


export class MappedModifiersContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public MODIFIERS(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.MODIFIERS, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public mappedModifier(): MappedModifierContext[];
    public mappedModifier(i: number): MappedModifierContext | null;
    public mappedModifier(i?: number): MappedModifierContext[] | MappedModifierContext | null {
        if (i === undefined) {
            return this.getRuleContexts(MappedModifierContext);
        }

        return this.getRuleContext(i, MappedModifierContext);
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_mappedModifiers;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterMappedModifiers) {
             listener.enterMappedModifiers(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitMappedModifiers) {
             listener.exitMappedModifiers(this);
        }
    }
}


export class MappedModifierContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public READONLY(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.READONLY, 0);
    }
    public OPTIONAL(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.OPTIONAL, 0);
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_mappedModifier;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterMappedModifier) {
             listener.enterMappedModifier(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitMappedModifier) {
             listener.exitMappedModifier(this);
        }
    }
}


export class TypeTemplateLiteralContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public TYPE_TEMPLATE(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.TYPE_TEMPLATE, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public templatePart(): TemplatePartContext[];
    public templatePart(i: number): TemplatePartContext | null;
    public templatePart(i?: number): TemplatePartContext[] | TemplatePartContext | null {
        if (i === undefined) {
            return this.getRuleContexts(TemplatePartContext);
        }

        return this.getRuleContext(i, TemplatePartContext);
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_typeTemplateLiteral;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterTypeTemplateLiteral) {
             listener.enterTypeTemplateLiteral(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitTypeTemplateLiteral) {
             listener.exitTypeTemplateLiteral(this);
        }
    }
}


export class TemplatePartContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public STRING(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.STRING, 0);
    }
    public typeExpr(): TypeExprContext | null {
        return this.getRuleContext(0, TypeExprContext);
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_templatePart;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterTemplatePart) {
             listener.enterTemplatePart(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitTemplatePart) {
             listener.exitTemplatePart(this);
        }
    }
}


export class TypeApplicationContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public TYPE_APP(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.TYPE_APP, 0)!;
    }
    public typeExpr(): TypeExprContext[];
    public typeExpr(i: number): TypeExprContext | null;
    public typeExpr(i?: number): TypeExprContext[] | TypeExprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(TypeExprContext);
        }

        return this.getRuleContext(i, TypeExprContext);
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_typeApplication;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterTypeApplication) {
             listener.enterTypeApplication(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitTypeApplication) {
             listener.exitTypeApplication(this);
        }
    }
}


export class TypeParamsContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public TYPE_PARAMS(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.TYPE_PARAMS, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public typeParamDecl(): TypeParamDeclContext[];
    public typeParamDecl(i: number): TypeParamDeclContext | null;
    public typeParamDecl(i?: number): TypeParamDeclContext[] | TypeParamDeclContext | null {
        if (i === undefined) {
            return this.getRuleContexts(TypeParamDeclContext);
        }

        return this.getRuleContext(i, TypeParamDeclContext);
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_typeParams;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterTypeParams) {
             listener.enterTypeParams(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitTypeParams) {
             listener.exitTypeParams(this);
        }
    }
}


export class TypeParamDeclContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public typeParamConstraint(): TypeParamConstraintContext | null {
        return this.getRuleContext(0, TypeParamConstraintContext);
    }
    public typeParamDefault(): TypeParamDefaultContext | null {
        return this.getRuleContext(0, TypeParamDefaultContext);
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_typeParamDecl;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterTypeParamDecl) {
             listener.enterTypeParamDecl(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitTypeParamDecl) {
             listener.exitTypeParamDecl(this);
        }
    }
}


export class TypeParamConstraintContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public EXTENDS(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.EXTENDS, 0)!;
    }
    public typeExpr(): TypeExprContext {
        return this.getRuleContext(0, TypeExprContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_typeParamConstraint;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterTypeParamConstraint) {
             listener.enterTypeParamConstraint(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitTypeParamConstraint) {
             listener.exitTypeParamConstraint(this);
        }
    }
}


export class TypeParamDefaultContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public DEFAULT(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.DEFAULT, 0)!;
    }
    public typeExpr(): TypeExprContext {
        return this.getRuleContext(0, TypeExprContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_typeParamDefault;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterTypeParamDefault) {
             listener.enterTypeParamDefault(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitTypeParamDefault) {
             listener.exitTypeParamDefault(this);
        }
    }
}


export class AssignContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public SET(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.SET, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.IDENTIFIER, 0);
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public propAccess(): PropAccessContext | null {
        return this.getRuleContext(0, PropAccessContext);
    }
    public indexAccess(): IndexAccessContext | null {
        return this.getRuleContext(0, IndexAccessContext);
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_assign;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterAssign) {
             listener.enterAssign(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitAssign) {
             listener.exitAssign(this);
        }
    }
}


export class CompoundAssignContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public PLUS_ASSIGN(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.PLUS_ASSIGN, 0);
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.IDENTIFIER, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public MINUS_ASSIGN(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.MINUS_ASSIGN, 0);
    }
    public TIMES_ASSIGN(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.TIMES_ASSIGN, 0);
    }
    public DIV_ASSIGN(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.DIV_ASSIGN, 0);
    }
    public MOD_ASSIGN(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.MOD_ASSIGN, 0);
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_compoundAssign;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterCompoundAssign) {
             listener.enterCompoundAssign(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitCompoundAssign) {
             listener.exitCompoundAssign(this);
        }
    }
}


export class SubscriptAssignContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
    }
    public LBRACK(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LBRACK, 0)!;
    }
    public RBRACK(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RBRACK, 0)!;
    }
    public EQUALS(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.EQUALS, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_subscriptAssign;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterSubscriptAssign) {
             listener.enterSubscriptAssign(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitSubscriptAssign) {
             listener.exitSubscriptAssign(this);
        }
    }
}


export class SwitchFormContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public SWITCH(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.SWITCH, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public caseClause(): CaseClauseContext[];
    public caseClause(i: number): CaseClauseContext | null;
    public caseClause(i?: number): CaseClauseContext[] | CaseClauseContext | null {
        if (i === undefined) {
            return this.getRuleContexts(CaseClauseContext);
        }

        return this.getRuleContext(i, CaseClauseContext);
    }
    public defaultClause(): DefaultClauseContext | null {
        return this.getRuleContext(0, DefaultClauseContext);
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_switchForm;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterSwitchForm) {
             listener.enterSwitchForm(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitSwitchForm) {
             listener.exitSwitchForm(this);
        }
    }
}


export class CaseClauseContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public CASE(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.CASE, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
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
        return Stage9Parser.RULE_caseClause;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterCaseClause) {
             listener.enterCaseClause(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitCaseClause) {
             listener.exitCaseClause(this);
        }
    }
}


export class DefaultClauseContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public DEFAULT(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.DEFAULT, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
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
        return Stage9Parser.RULE_defaultClause;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterDefaultClause) {
             listener.enterDefaultClause(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitDefaultClause) {
             listener.exitDefaultClause(this);
        }
    }
}


export class ForFormContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode[];
    public LPAREN(i: number): antlr.TerminalNode | null;
    public LPAREN(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage9Parser.LPAREN);
    	} else {
    		return this.getToken(Stage9Parser.LPAREN, i);
    	}
    }
    public FOR(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.FOR, 0)!;
    }
    public letStmt(): LetStmtContext | null {
        return this.getRuleContext(0, LetStmtContext);
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
    }
    public assign(): AssignContext | null {
        return this.getRuleContext(0, AssignContext);
    }
    public RPAREN(): antlr.TerminalNode[];
    public RPAREN(i: number): antlr.TerminalNode | null;
    public RPAREN(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage9Parser.RPAREN);
    	} else {
    		return this.getToken(Stage9Parser.RPAREN, i);
    	}
    }
    public statement(): StatementContext[];
    public statement(i: number): StatementContext | null;
    public statement(i?: number): StatementContext[] | StatementContext | null {
        if (i === undefined) {
            return this.getRuleContexts(StatementContext);
        }

        return this.getRuleContext(i, StatementContext);
    }
    public IDENTIFIER(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.IDENTIFIER, 0);
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_forForm;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterForForm) {
             listener.enterForForm(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitForForm) {
             listener.exitForForm(this);
        }
    }
}


export class ForInFormContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public FORIN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.FORIN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.IDENTIFIER, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
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
        return Stage9Parser.RULE_forInForm;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterForInForm) {
             listener.enterForInForm(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitForInForm) {
             listener.exitForInForm(this);
        }
    }
}


export class ForOfFormContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public FOROF(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.FOROF, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.IDENTIFIER, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
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
        return Stage9Parser.RULE_forOfForm;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterForOfForm) {
             listener.enterForOfForm(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitForOfForm) {
             listener.exitForOfForm(this);
        }
    }
}


export class ForAwaitFormContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public FORAWAIT(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.FORAWAIT, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.IDENTIFIER, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
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
        return Stage9Parser.RULE_forAwaitForm;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterForAwaitForm) {
             listener.enterForAwaitForm(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitForAwaitForm) {
             listener.exitForAwaitForm(this);
        }
    }
}


export class ExceptFormContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public EXCEPT(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.EXCEPT, 0)!;
    }
    public tryClause(): TryClauseContext {
        return this.getRuleContext(0, TryClauseContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public catchClause(): CatchClauseContext | null {
        return this.getRuleContext(0, CatchClauseContext);
    }
    public finallyClause(): FinallyClauseContext | null {
        return this.getRuleContext(0, FinallyClauseContext);
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_exceptForm;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterExceptForm) {
             listener.enterExceptForm(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitExceptForm) {
             listener.exitExceptForm(this);
        }
    }
}


export class TryClauseContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public TRY(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.TRY, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
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
        return Stage9Parser.RULE_tryClause;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterTryClause) {
             listener.enterTryClause(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitTryClause) {
             listener.exitTryClause(this);
        }
    }
}


export class CatchClauseContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public CATCH(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.CATCH, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
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
        return Stage9Parser.RULE_catchClause;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterCatchClause) {
             listener.enterCatchClause(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitCatchClause) {
             listener.exitCatchClause(this);
        }
    }
}


export class FinallyClauseContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public FINALLY(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.FINALLY, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
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
        return Stage9Parser.RULE_finallyClause;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterFinallyClause) {
             listener.enterFinallyClause(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitFinallyClause) {
             listener.exitFinallyClause(this);
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
        return this.getToken(Stage9Parser.IDENTIFIER, 0);
    }
    public MACRO_ERROR(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.MACRO_ERROR, 0);
    }
    public MINUS(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.MINUS, 0);
    }
    public lambda(): LambdaContext | null {
        return this.getRuleContext(0, LambdaContext);
    }
    public fn(): FnContext | null {
        return this.getRuleContext(0, FnContext);
    }
    public asyncLambda(): AsyncLambdaContext | null {
        return this.getRuleContext(0, AsyncLambdaContext);
    }
    public asyncFn(): AsyncFnContext | null {
        return this.getRuleContext(0, AsyncFnContext);
    }
    public generatorFn(): GeneratorFnContext | null {
        return this.getRuleContext(0, GeneratorFnContext);
    }
    public asyncGeneratorFn(): AsyncGeneratorFnContext | null {
        return this.getRuleContext(0, AsyncGeneratorFnContext);
    }
    public fnO(): FnOContext | null {
        return this.getRuleContext(0, FnOContext);
    }
    public lambdaO(): LambdaOContext | null {
        return this.getRuleContext(0, LambdaOContext);
    }
    public asyncFnO(): AsyncFnOContext | null {
        return this.getRuleContext(0, AsyncFnOContext);
    }
    public asyncLambdaO(): AsyncLambdaOContext | null {
        return this.getRuleContext(0, AsyncLambdaOContext);
    }
    public generatorFnO(): GeneratorFnOContext | null {
        return this.getRuleContext(0, GeneratorFnOContext);
    }
    public asyncGeneratorFnO(): AsyncGeneratorFnOContext | null {
        return this.getRuleContext(0, AsyncGeneratorFnOContext);
    }
    public awaitExpr(): AwaitExprContext | null {
        return this.getRuleContext(0, AwaitExprContext);
    }
    public yieldExpr(): YieldExprContext | null {
        return this.getRuleContext(0, YieldExprContext);
    }
    public yieldStarExpr(): YieldStarExprContext | null {
        return this.getRuleContext(0, YieldStarExprContext);
    }
    public bindExpr(): BindExprContext | null {
        return this.getRuleContext(0, BindExprContext);
    }
    public methodCallExpr(): MethodCallExprContext | null {
        return this.getRuleContext(0, MethodCallExprContext);
    }
    public objectExpr(): ObjectExprContext | null {
        return this.getRuleContext(0, ObjectExprContext);
    }
    public braceObjectExpr(): BraceObjectExprContext | null {
        return this.getRuleContext(0, BraceObjectExprContext);
    }
    public arrayExpr(): ArrayExprContext | null {
        return this.getRuleContext(0, ArrayExprContext);
    }
    public bracketArrayExpr(): BracketArrayExprContext | null {
        return this.getRuleContext(0, BracketArrayExprContext);
    }
    public propAccess(): PropAccessContext | null {
        return this.getRuleContext(0, PropAccessContext);
    }
    public indexAccess(): IndexAccessContext | null {
        return this.getRuleContext(0, IndexAccessContext);
    }
    public subscriptAccess(): SubscriptAccessContext | null {
        return this.getRuleContext(0, SubscriptAccessContext);
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
    public tildeUnquote(): TildeUnquoteContext | null {
        return this.getRuleContext(0, TildeUnquoteContext);
    }
    public tildeUnquoteSplice(): TildeUnquoteSpliceContext | null {
        return this.getRuleContext(0, TildeUnquoteSpliceContext);
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
    public optChainIndex(): OptChainIndexContext | null {
        return this.getRuleContext(0, OptChainIndexContext);
    }
    public nullCoalesce(): NullCoalesceContext | null {
        return this.getRuleContext(0, NullCoalesceContext);
    }
    public typeofExpr(): TypeofExprContext | null {
        return this.getRuleContext(0, TypeofExprContext);
    }
    public typeAssert(): TypeAssertContext | null {
        return this.getRuleContext(0, TypeAssertContext);
    }
    public templateExpr(): TemplateExprContext | null {
        return this.getRuleContext(0, TemplateExprContext);
    }
    public thisExpr(): ThisExprContext | null {
        return this.getRuleContext(0, ThisExprContext);
    }
    public superExpr(): SuperExprContext | null {
        return this.getRuleContext(0, SuperExprContext);
    }
    public superConstructorCall(): SuperConstructorCallContext | null {
        return this.getRuleContext(0, SuperConstructorCallContext);
    }
    public superMethodCall(): SuperMethodCallContext | null {
        return this.getRuleContext(0, SuperMethodCallContext);
    }
    public infixExpr(): InfixExprContext | null {
        return this.getRuleContext(0, InfixExprContext);
    }
    public macroExprCall(): MacroExprCallContext | null {
        return this.getRuleContext(0, MacroExprCallContext);
    }
    public opSymbol(): OpSymbolContext | null {
        return this.getRuleContext(0, OpSymbolContext);
    }
    public call(): CallContext | null {
        return this.getRuleContext(0, CallContext);
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_expression;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterExpression) {
             listener.enterExpression(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitExpression) {
             listener.exitExpression(this);
        }
    }
}


export class ThisExprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public THIS(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.THIS, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_thisExpr;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterThisExpr) {
             listener.enterThisExpr(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitThisExpr) {
             listener.exitThisExpr(this);
        }
    }
}


export class SuperExprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public SUPER(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.SUPER, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_superExpr;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterSuperExpr) {
             listener.enterSuperExpr(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitSuperExpr) {
             listener.exitSuperExpr(this);
        }
    }
}


export class SuperConstructorCallContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public SUPER(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.SUPER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
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
        return Stage9Parser.RULE_superConstructorCall;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterSuperConstructorCall) {
             listener.enterSuperConstructorCall(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitSuperConstructorCall) {
             listener.exitSuperConstructorCall(this);
        }
    }
}


export class SuperMethodCallContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public SUPER_METHOD(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.SUPER_METHOD, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
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
        return Stage9Parser.RULE_superMethodCall;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterSuperMethodCall) {
             listener.enterSuperMethodCall(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitSuperMethodCall) {
             listener.exitSuperMethodCall(this);
        }
    }
}


export class TypeofExprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public TYPEOF(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.TYPEOF, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_typeofExpr;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterTypeofExpr) {
             listener.enterTypeofExpr(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitTypeofExpr) {
             listener.exitTypeofExpr(this);
        }
    }
}


export class TypeAssertContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public TYPE_AS(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.TYPE_AS, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public typeExpr(): TypeExprContext {
        return this.getRuleContext(0, TypeExprContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_typeAssert;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterTypeAssert) {
             listener.enterTypeAssert(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitTypeAssert) {
             listener.exitTypeAssert(this);
        }
    }
}


export class LambdaContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public LAMBDA(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LAMBDA, 0)!;
    }
    public fnSignature(): FnSignatureContext {
        return this.getRuleContext(0, FnSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
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
        return Stage9Parser.RULE_lambda;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterLambda) {
             listener.enterLambda(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitLambda) {
             listener.exitLambda(this);
        }
    }
}


export class FnContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public FN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.FN, 0)!;
    }
    public fnSignature(): FnSignatureContext {
        return this.getRuleContext(0, FnSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.IDENTIFIER, 0);
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
        return Stage9Parser.RULE_fn;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterFn) {
             listener.enterFn(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitFn) {
             listener.exitFn(this);
        }
    }
}


export class AsyncLambdaContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public ASYNC_LAMBDA(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.ASYNC_LAMBDA, 0)!;
    }
    public fnSignature(): FnSignatureContext {
        return this.getRuleContext(0, FnSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
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
        return Stage9Parser.RULE_asyncLambda;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterAsyncLambda) {
             listener.enterAsyncLambda(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitAsyncLambda) {
             listener.exitAsyncLambda(this);
        }
    }
}


export class AsyncFnContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public ASYNC_FN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.ASYNC_FN, 0)!;
    }
    public fnSignature(): FnSignatureContext {
        return this.getRuleContext(0, FnSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
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
        return Stage9Parser.RULE_asyncFn;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterAsyncFn) {
             listener.enterAsyncFn(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitAsyncFn) {
             listener.exitAsyncFn(this);
        }
    }
}


export class GeneratorFnContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public GENERATOR_FN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.GENERATOR_FN, 0)!;
    }
    public fnSignature(): FnSignatureContext {
        return this.getRuleContext(0, FnSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
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
        return Stage9Parser.RULE_generatorFn;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterGeneratorFn) {
             listener.enterGeneratorFn(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitGeneratorFn) {
             listener.exitGeneratorFn(this);
        }
    }
}


export class AsyncGeneratorFnContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public ASYNC_GENERATOR_FN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.ASYNC_GENERATOR_FN, 0)!;
    }
    public fnSignature(): FnSignatureContext {
        return this.getRuleContext(0, FnSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
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
        return Stage9Parser.RULE_asyncGeneratorFn;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterAsyncGeneratorFn) {
             listener.enterAsyncGeneratorFn(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitAsyncGeneratorFn) {
             listener.exitAsyncGeneratorFn(this);
        }
    }
}


export class FnOContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public FN_O(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.FN_O, 0)!;
    }
    public fnoSignature(): FnoSignatureContext {
        return this.getRuleContext(0, FnoSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.IDENTIFIER, 0);
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
        return Stage9Parser.RULE_fnO;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterFnO) {
             listener.enterFnO(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitFnO) {
             listener.exitFnO(this);
        }
    }
}


export class LambdaOContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public LAMBDA_O(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LAMBDA_O, 0)!;
    }
    public fnoSignature(): FnoSignatureContext {
        return this.getRuleContext(0, FnoSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
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
        return Stage9Parser.RULE_lambdaO;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterLambdaO) {
             listener.enterLambdaO(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitLambdaO) {
             listener.exitLambdaO(this);
        }
    }
}


export class AsyncFnOContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public ASYNC_FN_O(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.ASYNC_FN_O, 0)!;
    }
    public fnoSignature(): FnoSignatureContext {
        return this.getRuleContext(0, FnoSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
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
        return Stage9Parser.RULE_asyncFnO;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterAsyncFnO) {
             listener.enterAsyncFnO(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitAsyncFnO) {
             listener.exitAsyncFnO(this);
        }
    }
}


export class AsyncLambdaOContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public ASYNC_LAMBDA_O(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.ASYNC_LAMBDA_O, 0)!;
    }
    public fnoSignature(): FnoSignatureContext {
        return this.getRuleContext(0, FnoSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
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
        return Stage9Parser.RULE_asyncLambdaO;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterAsyncLambdaO) {
             listener.enterAsyncLambdaO(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitAsyncLambdaO) {
             listener.exitAsyncLambdaO(this);
        }
    }
}


export class GeneratorFnOContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public GENERATOR_FN_O(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.GENERATOR_FN_O, 0)!;
    }
    public fnoSignature(): FnoSignatureContext {
        return this.getRuleContext(0, FnoSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
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
        return Stage9Parser.RULE_generatorFnO;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterGeneratorFnO) {
             listener.enterGeneratorFnO(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitGeneratorFnO) {
             listener.exitGeneratorFnO(this);
        }
    }
}


export class AsyncGeneratorFnOContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public ASYNC_GENERATOR_FN_O(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.ASYNC_GENERATOR_FN_O, 0)!;
    }
    public fnoSignature(): FnoSignatureContext {
        return this.getRuleContext(0, FnoSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
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
        return Stage9Parser.RULE_asyncGeneratorFnO;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterAsyncGeneratorFnO) {
             listener.enterAsyncGeneratorFnO(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitAsyncGeneratorFnO) {
             listener.exitAsyncGeneratorFnO(this);
        }
    }
}


export class MethodOContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public METHOD_O(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.METHOD_O, 0)!;
    }
    public methodKey(): MethodKeyContext {
        return this.getRuleContext(0, MethodKeyContext)!;
    }
    public fnoSignature(): FnoSignatureContext {
        return this.getRuleContext(0, FnoSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public modifier(): ModifierContext[];
    public modifier(i: number): ModifierContext | null;
    public modifier(i?: number): ModifierContext[] | ModifierContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ModifierContext);
        }

        return this.getRuleContext(i, ModifierContext);
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
        return Stage9Parser.RULE_methodO;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterMethodO) {
             listener.enterMethodO(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitMethodO) {
             listener.exitMethodO(this);
        }
    }
}


export class AbstractMethodOContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public ABSTRACT_METHOD_O(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.ABSTRACT_METHOD_O, 0)!;
    }
    public methodKey(): MethodKeyContext {
        return this.getRuleContext(0, MethodKeyContext)!;
    }
    public fnoSignature(): FnoSignatureContext {
        return this.getRuleContext(0, FnoSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public modifier(): ModifierContext[];
    public modifier(i: number): ModifierContext | null;
    public modifier(i?: number): ModifierContext[] | ModifierContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ModifierContext);
        }

        return this.getRuleContext(i, ModifierContext);
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_abstractMethodO;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterAbstractMethodO) {
             listener.enterAbstractMethodO(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitAbstractMethodO) {
             listener.exitAbstractMethodO(this);
        }
    }
}


export class ConstructorOContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public CONSTRUCTOR_O(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.CONSTRUCTOR_O, 0)!;
    }
    public fnoSignature(): FnoSignatureContext {
        return this.getRuleContext(0, FnoSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
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
        return Stage9Parser.RULE_constructorO;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterConstructorO) {
             listener.enterConstructorO(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitConstructorO) {
             listener.exitConstructorO(this);
        }
    }
}


export class FnoSignatureContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public COLON(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.COLON, 0);
    }
    public typeExpr(): TypeExprContext | null {
        return this.getRuleContext(0, TypeExprContext);
    }
    public fnoParam(): FnoParamContext[];
    public fnoParam(i: number): FnoParamContext | null;
    public fnoParam(i?: number): FnoParamContext[] | FnoParamContext | null {
        if (i === undefined) {
            return this.getRuleContexts(FnoParamContext);
        }

        return this.getRuleContext(i, FnoParamContext);
    }
    public fnoRestParam(): FnoRestParamContext | null {
        return this.getRuleContext(0, FnoRestParamContext);
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_fnoSignature;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterFnoSignature) {
             listener.enterFnoSignature(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitFnoSignature) {
             listener.exitFnoSignature(this);
        }
    }
}


export class FnoParamContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode[];
    public LPAREN(i: number): antlr.TerminalNode | null;
    public LPAREN(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage9Parser.LPAREN);
    	} else {
    		return this.getToken(Stage9Parser.LPAREN, i);
    	}
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode[];
    public RPAREN(i: number): antlr.TerminalNode | null;
    public RPAREN(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage9Parser.RPAREN);
    	} else {
    		return this.getToken(Stage9Parser.RPAREN, i);
    	}
    }
    public OPTIONAL(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.OPTIONAL, 0);
    }
    public COLON(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.COLON, 0);
    }
    public typeExpr(): TypeExprContext | null {
        return this.getRuleContext(0, TypeExprContext);
    }
    public DEFAULT(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.DEFAULT, 0);
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_fnoParam;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterFnoParam) {
             listener.enterFnoParam(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitFnoParam) {
             listener.exitFnoParam(this);
        }
    }
}


export class FnoRestParamContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public REST(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.REST, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public COLON(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.COLON, 0);
    }
    public typeExpr(): TypeExprContext | null {
        return this.getRuleContext(0, TypeExprContext);
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_fnoRestParam;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterFnoRestParam) {
             listener.enterFnoRestParam(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitFnoRestParam) {
             listener.exitFnoRestParam(this);
        }
    }
}


export class AwaitExprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public AWAIT(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.AWAIT, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_awaitExpr;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterAwaitExpr) {
             listener.enterAwaitExpr(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitAwaitExpr) {
             listener.exitAwaitExpr(this);
        }
    }
}


export class YieldExprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public YIELD(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.YIELD, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_yieldExpr;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterYieldExpr) {
             listener.enterYieldExpr(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitYieldExpr) {
             listener.exitYieldExpr(this);
        }
    }
}


export class YieldStarExprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public YIELD_STAR(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.YIELD_STAR, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_yieldStarExpr;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterYieldStarExpr) {
             listener.enterYieldStarExpr(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitYieldStarExpr) {
             listener.exitYieldStarExpr(this);
        }
    }
}


export class BindExprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public BIND(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.BIND, 0)!;
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
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_bindExpr;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterBindExpr) {
             listener.enterBindExpr(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitBindExpr) {
             listener.exitBindExpr(this);
        }
    }
}


export class MethodCallExprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public METHOD_CALL(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.METHOD_CALL, 0)!;
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
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_methodCallExpr;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterMethodCallExpr) {
             listener.enterMethodCallExpr(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitMethodCallExpr) {
             listener.exitMethodCallExpr(this);
        }
    }
}


export class TernaryContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public TERNARY(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.TERNARY, 0)!;
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
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_ternary;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterTernary) {
             listener.enterTernary(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
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
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public COND(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.COND, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public condClause(): CondClauseContext[];
    public condClause(i: number): CondClauseContext | null;
    public condClause(i?: number): CondClauseContext[] | CondClauseContext | null {
        if (i === undefined) {
            return this.getRuleContexts(CondClauseContext);
        }

        return this.getRuleContext(i, CondClauseContext);
    }
    public condElseClause(): CondElseClauseContext | null {
        return this.getRuleContext(0, CondElseClauseContext);
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_condExpr;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterCondExpr) {
             listener.enterCondExpr(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitCondExpr) {
             listener.exitCondExpr(this);
        }
    }
}


export class CondClauseContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
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
        return Stage9Parser.RULE_condClause;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterCondClause) {
             listener.enterCondClause(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitCondClause) {
             listener.exitCondClause(this);
        }
    }
}


export class CondElseClauseContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public ELSE(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.ELSE, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_condElseClause;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterCondElseClause) {
             listener.enterCondElseClause(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitCondElseClause) {
             listener.exitCondElseClause(this);
        }
    }
}


export class NewFormContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public NEW(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.NEW, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public typeArgs(): TypeArgsContext | null {
        return this.getRuleContext(0, TypeArgsContext);
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
        return Stage9Parser.RULE_newForm;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterNewForm) {
             listener.enterNewForm(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
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
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public OBJECT(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.OBJECT, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
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
        return Stage9Parser.RULE_objectExpr;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterObjectExpr) {
             listener.enterObjectExpr(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
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
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public propKey(): PropKeyContext | null {
        return this.getRuleContext(0, PropKeyContext);
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
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public methodDef(): MethodDefContext | null {
        return this.getRuleContext(0, MethodDefContext);
    }
    public IDENTIFIER(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.IDENTIFIER, 0);
    }
    public LBRACK(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.LBRACK, 0);
    }
    public RBRACK(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.RBRACK, 0);
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_objectField;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterObjectField) {
             listener.enterObjectField(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitObjectField) {
             listener.exitObjectField(this);
        }
    }
}


export class MethodDefContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public METHOD(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.METHOD, 0)!;
    }
    public fnSignature(): FnSignatureContext {
        return this.getRuleContext(0, FnSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
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
        return Stage9Parser.RULE_methodDef;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterMethodDef) {
             listener.enterMethodDef(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitMethodDef) {
             listener.exitMethodDef(this);
        }
    }
}


export class ArrayExprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public ARRAY(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.ARRAY, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
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
        return Stage9Parser.RULE_arrayExpr;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterArrayExpr) {
             listener.enterArrayExpr(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitArrayExpr) {
             listener.exitArrayExpr(this);
        }
    }
}


export class BracketArrayExprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LBRACK(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LBRACK, 0)!;
    }
    public RBRACK(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RBRACK, 0)!;
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage9Parser.COMMA);
    	} else {
    		return this.getToken(Stage9Parser.COMMA, i);
    	}
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_bracketArrayExpr;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterBracketArrayExpr) {
             listener.enterBracketArrayExpr(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitBracketArrayExpr) {
             listener.exitBracketArrayExpr(this);
        }
    }
}


export class BraceObjectExprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LBRACE(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LBRACE, 0)!;
    }
    public RBRACE(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RBRACE, 0)!;
    }
    public braceObjectField(): BraceObjectFieldContext[];
    public braceObjectField(i: number): BraceObjectFieldContext | null;
    public braceObjectField(i?: number): BraceObjectFieldContext[] | BraceObjectFieldContext | null {
        if (i === undefined) {
            return this.getRuleContexts(BraceObjectFieldContext);
        }

        return this.getRuleContext(i, BraceObjectFieldContext);
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage9Parser.COMMA);
    	} else {
    		return this.getToken(Stage9Parser.COMMA, i);
    	}
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_braceObjectExpr;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterBraceObjectExpr) {
             listener.enterBraceObjectExpr(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitBraceObjectExpr) {
             listener.exitBraceObjectExpr(this);
        }
    }
}


export class BraceObjectFieldContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public COLON(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.COLON, 0);
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
    }
    public STRING(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.STRING, 0);
    }
    public IDENTIFIER(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.IDENTIFIER, 0);
    }
    public LBRACK(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.LBRACK, 0);
    }
    public RBRACK(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.RBRACK, 0);
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_braceObjectField;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterBraceObjectField) {
             listener.enterBraceObjectField(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitBraceObjectField) {
             listener.exitBraceObjectField(this);
        }
    }
}


export class TemplateExprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public TEMPLATE(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.TEMPLATE, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public STRING(): antlr.TerminalNode[];
    public STRING(i: number): antlr.TerminalNode | null;
    public STRING(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage9Parser.STRING);
    	} else {
    		return this.getToken(Stage9Parser.STRING, i);
    	}
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
        return Stage9Parser.RULE_templateExpr;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterTemplateExpr) {
             listener.enterTemplateExpr(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitTemplateExpr) {
             listener.exitTemplateExpr(this);
        }
    }
}


export class PropKeyContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public IDENTIFIER(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.IDENTIFIER, 0);
    }
    public STRING(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.STRING, 0);
    }
    public NUMBER(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.NUMBER, 0);
    }
    public PROGRAM(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.PROGRAM, 0);
    }
    public LET(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.LET, 0);
    }
    public VAR(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.VAR, 0);
    }
    public CONSTSTAR(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.CONSTSTAR, 0);
    }
    public CONST(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.CONST, 0);
    }
    public LAMBDA_O(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.LAMBDA_O, 0);
    }
    public LAMBDA(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.LAMBDA, 0);
    }
    public FN_O(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.FN_O, 0);
    }
    public FN(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.FN, 0);
    }
    public METHOD_O(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.METHOD_O, 0);
    }
    public METHOD(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.METHOD, 0);
    }
    public BIND(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.BIND, 0);
    }
    public METHOD_CALL(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.METHOD_CALL, 0);
    }
    public DEFMACRO(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.DEFMACRO, 0);
    }
    public MACRO_IMPORT(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.MACRO_IMPORT, 0);
    }
    public MACRO_EXPORT(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.MACRO_EXPORT, 0);
    }
    public MACRO_REEXPORT(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.MACRO_REEXPORT, 0);
    }
    public MACRO_TIME_ATTR(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.MACRO_TIME_ATTR, 0);
    }
    public MACRO_ERROR(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.MACRO_ERROR, 0);
    }
    public IF(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.IF, 0);
    }
    public WHILE(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.WHILE, 0);
    }
    public THEN(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.THEN, 0);
    }
    public RETURN(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.RETURN, 0);
    }
    public THROW(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.THROW, 0);
    }
    public SET(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.SET, 0);
    }
    public TERNARY(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.TERNARY, 0);
    }
    public COND(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.COND, 0);
    }
    public OBJECT(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.OBJECT, 0);
    }
    public ARRAY(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.ARRAY, 0);
    }
    public INDEX(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.INDEX, 0);
    }
    public QUASI(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.QUASI, 0);
    }
    public QUOTE(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.QUOTE, 0);
    }
    public UNQUOTE_SPLICING(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.UNQUOTE_SPLICING, 0);
    }
    public UNQUOTE(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.UNQUOTE, 0);
    }
    public TYPE_ARRAY(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.TYPE_ARRAY, 0);
    }
    public NEW(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.NEW, 0);
    }
    public IMPORT(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.IMPORT, 0);
    }
    public SWITCH(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.SWITCH, 0);
    }
    public CASE(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.CASE, 0);
    }
    public DEFAULT(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.DEFAULT, 0);
    }
    public FORIN(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.FORIN, 0);
    }
    public FOROF(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.FOROF, 0);
    }
    public FOR(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.FOR, 0);
    }
    public FORAWAIT(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.FORAWAIT, 0);
    }
    public TRY(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.TRY, 0);
    }
    public CATCH(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.CATCH, 0);
    }
    public FINALLY(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.FINALLY, 0);
    }
    public EXCEPT(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.EXCEPT, 0);
    }
    public AS(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.AS, 0);
    }
    public UNION(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.UNION, 0);
    }
    public INTERSECT(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.INTERSECT, 0);
    }
    public TUPLE(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.TUPLE, 0);
    }
    public TYPEFN(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.TYPEFN, 0);
    }
    public LIT(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.LIT, 0);
    }
    public KEYOF(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.KEYOF, 0);
    }
    public TYPEOF(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.TYPEOF, 0);
    }
    public INFER(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.INFER, 0);
    }
    public MAPPED(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.MAPPED, 0);
    }
    public TYPE_TEMPLATE(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.TYPE_TEMPLATE, 0);
    }
    public TEMPLATE(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.TEMPLATE, 0);
    }
    public REST(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.REST, 0);
    }
    public READONLY(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.READONLY, 0);
    }
    public TYPE_AS(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.TYPE_AS, 0);
    }
    public TYPE_PARAMS(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.TYPE_PARAMS, 0);
    }
    public TYPE_ARGS(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.TYPE_ARGS, 0);
    }
    public TYPE_APP(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.TYPE_APP, 0);
    }
    public EXTENDS(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.EXTENDS, 0);
    }
    public RETURNS(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.RETURNS, 0);
    }
    public TYPE(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.TYPE, 0);
    }
    public INTERFACE(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.INTERFACE, 0);
    }
    public ENUM(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.ENUM, 0);
    }
    public MODIFIERS(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.MODIFIERS, 0);
    }
    public BOOLEAN(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.BOOLEAN, 0);
    }
    public NULL(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.NULL, 0);
    }
    public UNDEFINED(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.UNDEFINED, 0);
    }
    public EXPORT(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.EXPORT, 0);
    }
    public EXPORT_DEFAULT(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.EXPORT_DEFAULT, 0);
    }
    public EXPORT_NAMED(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.EXPORT_NAMED, 0);
    }
    public EXPORT_NS_FROM(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.EXPORT_NS_FROM, 0);
    }
    public EXPORT_FROM(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.EXPORT_FROM, 0);
    }
    public EXPORT_ALL_FROM(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.EXPORT_ALL_FROM, 0);
    }
    public IMPORT_TYPE(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.IMPORT_TYPE, 0);
    }
    public EXPORT_TYPE(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.EXPORT_TYPE, 0);
    }
    public EXPORT_TYPE_FROM(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.EXPORT_TYPE_FROM, 0);
    }
    public EXPORT_TYPE_ALL_FROM(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.EXPORT_TYPE_ALL_FROM, 0);
    }
    public CLASS(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.CLASS, 0);
    }
    public CLASS_BODY(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.CLASS_BODY, 0);
    }
    public FIELD(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.FIELD, 0);
    }
    public CONSTRUCTOR_O(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.CONSTRUCTOR_O, 0);
    }
    public CONSTRUCTOR(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.CONSTRUCTOR, 0);
    }
    public THIS(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.THIS, 0);
    }
    public SUPER(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.SUPER, 0);
    }
    public SUPER_METHOD(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.SUPER_METHOD, 0);
    }
    public GET(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.GET, 0);
    }
    public SETPROP(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.SETPROP, 0);
    }
    public ABSTRACT_METHOD_O(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.ABSTRACT_METHOD_O, 0);
    }
    public ABSTRACT_METHOD(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.ABSTRACT_METHOD, 0);
    }
    public IMPLEMENTS(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.IMPLEMENTS, 0);
    }
    public ASYNC_GENERATOR_FN_O(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.ASYNC_GENERATOR_FN_O, 0);
    }
    public ASYNC_GENERATOR_FN(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.ASYNC_GENERATOR_FN, 0);
    }
    public ASYNC_LAMBDA_O(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.ASYNC_LAMBDA_O, 0);
    }
    public ASYNC_LAMBDA(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.ASYNC_LAMBDA, 0);
    }
    public ASYNC_FN_O(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.ASYNC_FN_O, 0);
    }
    public ASYNC_FN(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.ASYNC_FN, 0);
    }
    public GENERATOR_FN_O(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.GENERATOR_FN_O, 0);
    }
    public GENERATOR_FN(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.GENERATOR_FN, 0);
    }
    public YIELD_STAR(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.YIELD_STAR, 0);
    }
    public YIELD(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.YIELD, 0);
    }
    public AWAIT(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.AWAIT, 0);
    }
    public CARET(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.CARET, 0);
    }
    public PUBLIC(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.PUBLIC, 0);
    }
    public PRIVATE(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.PRIVATE, 0);
    }
    public PROTECTED(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.PROTECTED, 0);
    }
    public STATIC(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.STATIC, 0);
    }
    public ABSTRACT(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.ABSTRACT, 0);
    }
    public OVERRIDE(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.OVERRIDE, 0);
    }
    public ASYNC(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.ASYNC, 0);
    }
    public GENERATOR(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.GENERATOR, 0);
    }
    public ELSE(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.ELSE, 0);
    }
    public STRICT_EQ(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.STRICT_EQ, 0);
    }
    public STRICT_NEQ(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.STRICT_NEQ, 0);
    }
    public EQ_OP(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.EQ_OP, 0);
    }
    public NEQ_OP(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.NEQ_OP, 0);
    }
    public GTE_OP(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.GTE_OP, 0);
    }
    public LTE_OP(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.LTE_OP, 0);
    }
    public PLUS(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.PLUS, 0);
    }
    public STAR(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.STAR, 0);
    }
    public SLASH(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.SLASH, 0);
    }
    public PERCENT(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.PERCENT, 0);
    }
    public STARSTAR(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.STARSTAR, 0);
    }
    public LT(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.LT, 0);
    }
    public GT(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.GT, 0);
    }
    public BANG(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.BANG, 0);
    }
    public AMP(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.AMP, 0);
    }
    public PIPE(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.PIPE, 0);
    }
    public AMPAMP(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.AMPAMP, 0);
    }
    public PIPEPIPE(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.PIPEPIPE, 0);
    }
    public TILDE(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.TILDE, 0);
    }
    public NULLCOAL(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.NULLCOAL, 0);
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_propKey;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterPropKey) {
             listener.enterPropKey(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitPropKey) {
             listener.exitPropKey(this);
        }
    }
}


export class OpSymbolContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public STRICT_EQ(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.STRICT_EQ, 0);
    }
    public STRICT_NEQ(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.STRICT_NEQ, 0);
    }
    public EQ_OP(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.EQ_OP, 0);
    }
    public NEQ_OP(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.NEQ_OP, 0);
    }
    public GTE_OP(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.GTE_OP, 0);
    }
    public LTE_OP(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.LTE_OP, 0);
    }
    public EQUALS(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.EQUALS, 0);
    }
    public PLUS(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.PLUS, 0);
    }
    public STAR(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.STAR, 0);
    }
    public SLASH(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.SLASH, 0);
    }
    public PERCENT(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.PERCENT, 0);
    }
    public STARSTAR(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.STARSTAR, 0);
    }
    public LT(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.LT, 0);
    }
    public GT(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.GT, 0);
    }
    public BANG(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.BANG, 0);
    }
    public AMP(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.AMP, 0);
    }
    public PIPE(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.PIPE, 0);
    }
    public AMPAMP(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.AMPAMP, 0);
    }
    public PIPEPIPE(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.PIPEPIPE, 0);
    }
    public CARET(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.CARET, 0);
    }
    public TILDE(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.TILDE, 0);
    }
    public NULLCOAL(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.NULLCOAL, 0);
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_opSymbol;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterOpSymbol) {
             listener.enterOpSymbol(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitOpSymbol) {
             listener.exitOpSymbol(this);
        }
    }
}


export class PropAccessContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public DOT(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.DOT, 0)!;
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
    }
    public propKey(): PropKeyContext | null {
        return this.getRuleContext(0, PropKeyContext);
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public LBRACK(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.LBRACK, 0);
    }
    public RBRACK(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.RBRACK, 0);
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_propAccess;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterPropAccess) {
             listener.enterPropAccess(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitPropAccess) {
             listener.exitPropAccess(this);
        }
    }
}


export class SubscriptAccessContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public SUBSCRIPT(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.SUBSCRIPT, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public STRING(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.STRING, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_subscriptAccess;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterSubscriptAccess) {
             listener.enterSubscriptAccess(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitSubscriptAccess) {
             listener.exitSubscriptAccess(this);
        }
    }
}


export class IndexAccessContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public INDEX(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.INDEX, 0)!;
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
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_indexAccess;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterIndexAccess) {
             listener.enterIndexAccess(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
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
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public quasiForm(): QuasiFormContext {
        return this.getRuleContext(0, QuasiFormContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public QUASI(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.QUASI, 0);
    }
    public QUOTE(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.QUOTE, 0);
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_quasiquote;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterQuasiquote) {
             listener.enterQuasiquote(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitQuasiquote) {
             listener.exitQuasiquote(this);
        }
    }
}


export class QuasiFormContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public sForm(): SFormContext {
        return this.getRuleContext(0, SFormContext)!;
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_quasiForm;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterQuasiForm) {
             listener.enterQuasiForm(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitQuasiForm) {
             listener.exitQuasiForm(this);
        }
    }
}


export class SFormContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.LPAREN, 0);
    }
    public UNQUOTE(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.UNQUOTE, 0);
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public RPAREN(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.RPAREN, 0);
    }
    public UNQUOTE_SPLICING(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.UNQUOTE_SPLICING, 0);
    }
    public TILDE(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.TILDE, 0);
    }
    public TILDE_AT(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.TILDE_AT, 0);
    }
    public sForm(): SFormContext[];
    public sForm(i: number): SFormContext | null;
    public sForm(i?: number): SFormContext[] | SFormContext | null {
        if (i === undefined) {
            return this.getRuleContexts(SFormContext);
        }

        return this.getRuleContext(i, SFormContext);
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_sForm;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterSForm) {
             listener.enterSForm(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitSForm) {
             listener.exitSForm(this);
        }
    }
}


export class UnquoteContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public UNQUOTE(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.UNQUOTE, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_unquote;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterUnquote) {
             listener.enterUnquote(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
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
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public UNQUOTE_SPLICING(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.UNQUOTE_SPLICING, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_unquoteSplicing;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterUnquoteSplicing) {
             listener.enterUnquoteSplicing(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitUnquoteSplicing) {
             listener.exitUnquoteSplicing(this);
        }
    }
}


export class TildeUnquoteContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public TILDE(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.TILDE, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_tildeUnquote;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterTildeUnquote) {
             listener.enterTildeUnquote(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitTildeUnquote) {
             listener.exitTildeUnquote(this);
        }
    }
}


export class TildeUnquoteSpliceContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public TILDE_AT(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.TILDE_AT, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_tildeUnquoteSplice;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterTildeUnquoteSplice) {
             listener.enterTildeUnquoteSplice(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitTildeUnquoteSplice) {
             listener.exitTildeUnquoteSplice(this);
        }
    }
}


export class OptChainContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public OPTCHAIN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.OPTCHAIN, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public propKey(): PropKeyContext {
        return this.getRuleContext(0, PropKeyContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_optChain;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterOptChain) {
             listener.enterOptChain(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitOptChain) {
             listener.exitOptChain(this);
        }
    }
}


export class OptChainIndexContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public OPTCHAIN_INDEX(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.OPTCHAIN_INDEX, 0)!;
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
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_optChainIndex;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterOptChainIndex) {
             listener.enterOptChainIndex(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitOptChainIndex) {
             listener.exitOptChainIndex(this);
        }
    }
}


export class NullCoalesceContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public NULLCOAL(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.NULLCOAL, 0)!;
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
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_nullCoalesce;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterNullCoalesce) {
             listener.enterNullCoalesce(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitNullCoalesce) {
             listener.exitNullCoalesce(this);
        }
    }
}


export class InfixExprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public HASH_LBRACE(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.HASH_LBRACE, 0)!;
    }
    public infixBody(): InfixBodyContext {
        return this.getRuleContext(0, InfixBodyContext)!;
    }
    public RBRACE(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RBRACE, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_infixExpr;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterInfixExpr) {
             listener.enterInfixExpr(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitInfixExpr) {
             listener.exitInfixExpr(this);
        }
    }
}


export class InfixBodyContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public infixAtom(): InfixAtomContext[];
    public infixAtom(i: number): InfixAtomContext | null;
    public infixAtom(i?: number): InfixAtomContext[] | InfixAtomContext | null {
        if (i === undefined) {
            return this.getRuleContexts(InfixAtomContext);
        }

        return this.getRuleContext(i, InfixAtomContext);
    }
    public infixBinOp(): InfixBinOpContext[];
    public infixBinOp(i: number): InfixBinOpContext | null;
    public infixBinOp(i?: number): InfixBinOpContext[] | InfixBinOpContext | null {
        if (i === undefined) {
            return this.getRuleContexts(InfixBinOpContext);
        }

        return this.getRuleContext(i, InfixBinOpContext);
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_infixBody;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterInfixBody) {
             listener.enterInfixBody(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitInfixBody) {
             listener.exitInfixBody(this);
        }
    }
}


export class InfixAtomContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public IDENTIFIER(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.IDENTIFIER, 0);
    }
    public LPAREN(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.LPAREN, 0);
    }
    public RPAREN(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.RPAREN, 0);
    }
    public infixArgs(): InfixArgsContext | null {
        return this.getRuleContext(0, InfixArgsContext);
    }
    public LBRACE(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.LBRACE, 0);
    }
    public infixBody(): InfixBodyContext | null {
        return this.getRuleContext(0, InfixBodyContext);
    }
    public RBRACE(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.RBRACE, 0);
    }
    public infixUnaryOp(): InfixUnaryOpContext | null {
        return this.getRuleContext(0, InfixUnaryOpContext);
    }
    public infixAtom(): InfixAtomContext | null {
        return this.getRuleContext(0, InfixAtomContext);
    }
    public literal(): LiteralContext | null {
        return this.getRuleContext(0, LiteralContext);
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_infixAtom;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterInfixAtom) {
             listener.enterInfixAtom(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitInfixAtom) {
             listener.exitInfixAtom(this);
        }
    }
}


export class InfixArgsContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public infixBody(): InfixBodyContext[];
    public infixBody(i: number): InfixBodyContext | null;
    public infixBody(i?: number): InfixBodyContext[] | InfixBodyContext | null {
        if (i === undefined) {
            return this.getRuleContexts(InfixBodyContext);
        }

        return this.getRuleContext(i, InfixBodyContext);
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage9Parser.COMMA);
    	} else {
    		return this.getToken(Stage9Parser.COMMA, i);
    	}
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_infixArgs;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterInfixArgs) {
             listener.enterInfixArgs(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitInfixArgs) {
             listener.exitInfixArgs(this);
        }
    }
}


export class InfixUnaryOpContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public MINUS(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.MINUS, 0);
    }
    public BANG(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.BANG, 0);
    }
    public TILDE(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.TILDE, 0);
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_infixUnaryOp;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterInfixUnaryOp) {
             listener.enterInfixUnaryOp(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitInfixUnaryOp) {
             listener.exitInfixUnaryOp(this);
        }
    }
}


export class InfixBinOpContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public PLUS(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.PLUS, 0);
    }
    public MINUS(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.MINUS, 0);
    }
    public STAR(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.STAR, 0);
    }
    public SLASH(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.SLASH, 0);
    }
    public PERCENT(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.PERCENT, 0);
    }
    public STARSTAR(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.STARSTAR, 0);
    }
    public LT(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.LT, 0);
    }
    public GT(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.GT, 0);
    }
    public LTE_OP(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.LTE_OP, 0);
    }
    public GTE_OP(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.GTE_OP, 0);
    }
    public STRICT_EQ(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.STRICT_EQ, 0);
    }
    public STRICT_NEQ(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.STRICT_NEQ, 0);
    }
    public EQ_OP(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.EQ_OP, 0);
    }
    public NEQ_OP(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.NEQ_OP, 0);
    }
    public AMPAMP(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.AMPAMP, 0);
    }
    public PIPEPIPE(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.PIPEPIPE, 0);
    }
    public NULLCOAL(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.NULLCOAL, 0);
    }
    public AMP(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.AMP, 0);
    }
    public PIPE(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.PIPE, 0);
    }
    public CARET(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.CARET, 0);
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_infixBinOp;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterInfixBinOp) {
             listener.enterInfixBinOp(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitInfixBinOp) {
             listener.exitInfixBinOp(this);
        }
    }
}


export class MacroExprCallContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.IDENTIFIER, 0)!;
    }
    public FAT_ARROW(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.FAT_ARROW, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
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
        return Stage9Parser.RULE_macroExprCall;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterMacroExprCall) {
             listener.enterMacroExprCall(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitMacroExprCall) {
             listener.exitMacroExprCall(this);
        }
    }
}


export class MacroBodyCallContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.IDENTIFIER, 0)!;
    }
    public STMT_ARROW(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.STMT_ARROW, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
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
        return Stage9Parser.RULE_macroBodyCall;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterMacroBodyCall) {
             listener.enterMacroBodyCall(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitMacroBodyCall) {
             listener.exitMacroBodyCall(this);
        }
    }
}


export class CallContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
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
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public typeArgs(): TypeArgsContext | null {
        return this.getRuleContext(0, TypeArgsContext);
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_call;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterCall) {
             listener.enterCall(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitCall) {
             listener.exitCall(this);
        }
    }
}


export class TypeArgsContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public TYPE_ARGS(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.TYPE_ARGS, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public typeExpr(): TypeExprContext[];
    public typeExpr(i: number): TypeExprContext | null;
    public typeExpr(i?: number): TypeExprContext[] | TypeExprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(TypeExprContext);
        }

        return this.getRuleContext(i, TypeExprContext);
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_typeArgs;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterTypeArgs) {
             listener.enterTypeArgs(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitTypeArgs) {
             listener.exitTypeArgs(this);
        }
    }
}


export class FnSignatureContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public param(): ParamContext[];
    public param(i: number): ParamContext | null;
    public param(i?: number): ParamContext[] | ParamContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ParamContext);
        }

        return this.getRuleContext(i, ParamContext);
    }
    public COLON(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.COLON, 0);
    }
    public typeExpr(): TypeExprContext | null {
        return this.getRuleContext(0, TypeExprContext);
    }
    public restParam(): RestParamContext | null {
        return this.getRuleContext(0, RestParamContext);
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage9Parser.COMMA);
    	} else {
    		return this.getToken(Stage9Parser.COMMA, i);
    	}
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_fnSignature;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterFnSignature) {
             listener.enterFnSignature(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
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
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public OPTIONAL(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.OPTIONAL, 0);
    }
    public COLON(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.COLON, 0);
    }
    public typeExpr(): TypeExprContext | null {
        return this.getRuleContext(0, TypeExprContext);
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_param;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterParam) {
             listener.enterParam(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitParam) {
             listener.exitParam(this);
        }
    }
}


export class RestParamContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public REST(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.REST, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public COLON(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.COLON, 0);
    }
    public typeExpr(): TypeExprContext | null {
        return this.getRuleContext(0, TypeExprContext);
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_restParam;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterRestParam) {
             listener.enterRestParam(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitRestParam) {
             listener.exitRestParam(this);
        }
    }
}


export class LiteralContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public NUMBER(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.NUMBER, 0);
    }
    public NEG_NUMBER(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.NEG_NUMBER, 0);
    }
    public STRING(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.STRING, 0);
    }
    public BOOLEAN(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.BOOLEAN, 0);
    }
    public NULL(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.NULL, 0);
    }
    public UNDEFINED(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.UNDEFINED, 0);
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_literal;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterLiteral) {
             listener.enterLiteral(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
        if(listener.exitLiteral) {
             listener.exitLiteral(this);
        }
    }
}
