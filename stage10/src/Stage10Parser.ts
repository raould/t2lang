
import * as antlr from "antlr4ng";
import { Token } from "antlr4ng";

import { Stage10Listener } from "./Stage10Listener.js";
// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;


export class Stage10Parser extends antlr.Parser {
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
    public static readonly CONST = 11;
    public static readonly LAMBDA_O = 12;
    public static readonly LAMBDA = 13;
    public static readonly FN_O = 14;
    public static readonly FN = 15;
    public static readonly METHOD_O = 16;
    public static readonly METHOD = 17;
    public static readonly BIND = 18;
    public static readonly METHOD_CALL = 19;
    public static readonly DEFMACRO = 20;
    public static readonly MACRO_TIME_ATTR = 21;
    public static readonly MACRO_ERROR = 22;
    public static readonly IF = 23;
    public static readonly WHILE = 24;
    public static readonly THEN = 25;
    public static readonly RETURN = 26;
    public static readonly THROW = 27;
    public static readonly BREAK = 28;
    public static readonly CONTINUE = 29;
    public static readonly SET = 30;
    public static readonly TERNARY = 31;
    public static readonly COND = 32;
    public static readonly OBJECT = 33;
    public static readonly TYPE_ARRAY = 34;
    public static readonly ARRAY = 35;
    public static readonly SUBSCRIPT = 36;
    public static readonly OPTCHAIN_INDEX = 37;
    public static readonly OPTCHAIN = 38;
    public static readonly DOT = 39;
    public static readonly INDEX = 40;
    public static readonly NULLCOAL = 41;
    public static readonly QUASI = 42;
    public static readonly QUOTE = 43;
    public static readonly UNQUOTE_SPLICING = 44;
    public static readonly UNQUOTE = 45;
    public static readonly NEW = 46;
    public static readonly IMPORT = 47;
    public static readonly SWITCH = 48;
    public static readonly CASE = 49;
    public static readonly DEFAULT = 50;
    public static readonly FORIN = 51;
    public static readonly FOROF = 52;
    public static readonly FORAWAIT = 53;
    public static readonly TRY = 54;
    public static readonly CATCH = 55;
    public static readonly FINALLY = 56;
    public static readonly EXCEPT = 57;
    public static readonly AS = 58;
    public static readonly FOR = 59;
    public static readonly CLASS_BODY = 60;
    public static readonly SUPER_METHOD = 61;
    public static readonly ABSTRACT_METHOD_O = 62;
    public static readonly ABSTRACT_METHOD = 63;
    public static readonly CLASS = 64;
    public static readonly FIELD = 65;
    public static readonly CONSTRUCTOR_O = 66;
    public static readonly CONSTRUCTOR = 67;
    public static readonly THIS = 68;
    public static readonly SUPER = 69;
    public static readonly GET = 70;
    public static readonly SETPROP = 71;
    public static readonly IMPLEMENTS = 72;
    public static readonly MIXIN = 73;
    public static readonly DECLARE = 74;
    public static readonly UNION = 75;
    public static readonly INTERSECT = 76;
    public static readonly TUPLE = 77;
    public static readonly TYPEFN = 78;
    public static readonly LIT = 79;
    public static readonly KEYOF = 80;
    public static readonly TYPEOF = 81;
    public static readonly TYPE_AS = 82;
    public static readonly INFER = 83;
    public static readonly MAPPED = 84;
    public static readonly TYPE_TEMPLATE = 85;
    public static readonly TEMPLATE = 86;
    public static readonly REST = 87;
    public static readonly READONLY = 88;
    public static readonly TYPE_PARAMS = 89;
    public static readonly TYPE_ARGS = 90;
    public static readonly TYPE_APP = 91;
    public static readonly EXTENDS = 92;
    public static readonly RETURNS = 93;
    public static readonly TYPE = 94;
    public static readonly INTERFACE = 95;
    public static readonly ENUM = 96;
    public static readonly MODIFIERS = 97;
    public static readonly OPTIONAL = 98;
    public static readonly BOOLEAN = 99;
    public static readonly NULL = 100;
    public static readonly UNDEFINED = 101;
    public static readonly COLON = 102;
    public static readonly ASYNC_GENERATOR_FN_O = 103;
    public static readonly ASYNC_GENERATOR_FN = 104;
    public static readonly ASYNC_LAMBDA_O = 105;
    public static readonly ASYNC_LAMBDA = 106;
    public static readonly IIFE_ASYNC = 107;
    public static readonly IIFE = 108;
    public static readonly ASYNC_FN_O = 109;
    public static readonly ASYNC_FN = 110;
    public static readonly GENERATOR_FN_O = 111;
    public static readonly GENERATOR_FN = 112;
    public static readonly YIELD_STAR = 113;
    public static readonly YIELD = 114;
    public static readonly AWAIT = 115;
    public static readonly CARET = 116;
    public static readonly PUBLIC = 117;
    public static readonly PRIVATE = 118;
    public static readonly PROTECTED = 119;
    public static readonly STATIC = 120;
    public static readonly ABSTRACT = 121;
    public static readonly OVERRIDE = 122;
    public static readonly ASYNC = 123;
    public static readonly GENERATOR = 124;
    public static readonly ELSE = 125;
    public static readonly LBRACK = 126;
    public static readonly RBRACK = 127;
    public static readonly STRICT_EQ = 128;
    public static readonly STRICT_NEQ = 129;
    public static readonly EQ_OP = 130;
    public static readonly NEQ_OP = 131;
    public static readonly GTE_OP = 132;
    public static readonly LTE_OP = 133;
    public static readonly FAT_ARROW = 134;
    public static readonly STMT_ARROW = 135;
    public static readonly PLUS_ASSIGN = 136;
    public static readonly MINUS_ASSIGN = 137;
    public static readonly TIMES_ASSIGN = 138;
    public static readonly DIV_ASSIGN = 139;
    public static readonly MOD_ASSIGN = 140;
    public static readonly EQUALS = 141;
    public static readonly LBRACE = 142;
    public static readonly RBRACE = 143;
    public static readonly HASH_LBRACE = 144;
    public static readonly STARSTAR = 145;
    public static readonly AMPAMP = 146;
    public static readonly PIPEPIPE = 147;
    public static readonly PLUS = 148;
    public static readonly STAR = 149;
    public static readonly SLASH = 150;
    public static readonly PERCENT = 151;
    public static readonly LT = 152;
    public static readonly GT = 153;
    public static readonly BANG = 154;
    public static readonly AMP = 155;
    public static readonly PIPE = 156;
    public static readonly EXPORT = 157;
    public static readonly EXPORT_DEFAULT = 158;
    public static readonly EXPORT_NAMED = 159;
    public static readonly EXPORT_NS_FROM = 160;
    public static readonly EXPORT_FROM = 161;
    public static readonly EXPORT_ALL_FROM = 162;
    public static readonly IMPORT_TYPE = 163;
    public static readonly EXPORT_TYPE_ALL_FROM = 164;
    public static readonly EXPORT_TYPE_FROM = 165;
    public static readonly EXPORT_TYPE = 166;
    public static readonly NUMBER = 167;
    public static readonly STRING = 168;
    public static readonly MULTILINE_STRING = 169;
    public static readonly NEG_NUMBER = 170;
    public static readonly MINUS = 171;
    public static readonly TILDE_AT = 172;
    public static readonly TILDE = 173;
    public static readonly IDENTIFIER = 174;
    public static readonly WS = 175;
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
    public static readonly RULE_mixinForm = 19;
    public static readonly RULE_mixinFilter = 20;
    public static readonly RULE_classDef = 21;
    public static readonly RULE_anonClassDef = 22;
    public static readonly RULE_classExtends = 23;
    public static readonly RULE_classImplements = 24;
    public static readonly RULE_classBody = 25;
    public static readonly RULE_classElement = 26;
    public static readonly RULE_modifier = 27;
    public static readonly RULE_fieldDef = 28;
    public static readonly RULE_constructorParam = 29;
    public static readonly RULE_constructorSignature = 30;
    public static readonly RULE_constructorDef = 31;
    public static readonly RULE_classMethodDef = 32;
    public static readonly RULE_abstractMethodDef = 33;
    public static readonly RULE_getterDef = 34;
    public static readonly RULE_setterDef = 35;
    public static readonly RULE_methodKey = 36;
    public static readonly RULE_statement = 37;
    public static readonly RULE_letStmt = 38;
    public static readonly RULE_varStmt = 39;
    public static readonly RULE_constStar = 40;
    public static readonly RULE_ifForm = 41;
    public static readonly RULE_thenBlock = 42;
    public static readonly RULE_elseBlock = 43;
    public static readonly RULE_whileForm = 44;
    public static readonly RULE_returnForm = 45;
    public static readonly RULE_throwForm = 46;
    public static readonly RULE_breakForm = 47;
    public static readonly RULE_continueForm = 48;
    public static readonly RULE_importForm = 49;
    public static readonly RULE_importTypeForm = 50;
    public static readonly RULE_importTypeSpec = 51;
    public static readonly RULE_importTypeName = 52;
    public static readonly RULE_exportForm = 53;
    public static readonly RULE_exportBinding = 54;
    public static readonly RULE_exportDefault = 55;
    public static readonly RULE_exportNamed = 56;
    public static readonly RULE_exportNamePair = 57;
    public static readonly RULE_exportFrom = 58;
    public static readonly RULE_exportAllFrom = 59;
    public static readonly RULE_exportNsFromForm = 60;
    public static readonly RULE_exportTypeForm = 61;
    public static readonly RULE_exportTypeFromForm = 62;
    public static readonly RULE_exportTypeAllFromForm = 63;
    public static readonly RULE_exportDeclForm = 64;
    public static readonly RULE_starBinding = 65;
    public static readonly RULE_singleBinding = 66;
    public static readonly RULE_objectDestructPat = 67;
    public static readonly RULE_arrayDestructPat = 68;
    public static readonly RULE_typeExpr = 69;
    public static readonly RULE_typeUnion = 70;
    public static readonly RULE_typeIntersection = 71;
    public static readonly RULE_typeArray = 72;
    public static readonly RULE_typeTuple = 73;
    public static readonly RULE_typeTupleElement = 74;
    public static readonly RULE_typeFunction = 75;
    public static readonly RULE_typeFnParam = 76;
    public static readonly RULE_typeObject = 77;
    public static readonly RULE_typeProp = 78;
    public static readonly RULE_propModifier = 79;
    public static readonly RULE_typeLiteral = 80;
    public static readonly RULE_typeKeyof = 81;
    public static readonly RULE_typeTypeof = 82;
    public static readonly RULE_typeIndexAccess = 83;
    public static readonly RULE_typeConditional = 84;
    public static readonly RULE_typeInfer = 85;
    public static readonly RULE_typeMapped = 86;
    public static readonly RULE_mappedModifiers = 87;
    public static readonly RULE_mappedModifier = 88;
    public static readonly RULE_typeTemplateLiteral = 89;
    public static readonly RULE_templatePart = 90;
    public static readonly RULE_typeApplication = 91;
    public static readonly RULE_typeParams = 92;
    public static readonly RULE_typeParamDecl = 93;
    public static readonly RULE_typeParamConstraint = 94;
    public static readonly RULE_typeParamDefault = 95;
    public static readonly RULE_assign = 96;
    public static readonly RULE_compoundAssign = 97;
    public static readonly RULE_subscriptAssign = 98;
    public static readonly RULE_switchForm = 99;
    public static readonly RULE_caseClause = 100;
    public static readonly RULE_defaultClause = 101;
    public static readonly RULE_forForm = 102;
    public static readonly RULE_forInForm = 103;
    public static readonly RULE_forOfForm = 104;
    public static readonly RULE_forAwaitForm = 105;
    public static readonly RULE_exceptForm = 106;
    public static readonly RULE_tryClause = 107;
    public static readonly RULE_catchClause = 108;
    public static readonly RULE_finallyClause = 109;
    public static readonly RULE_expression = 110;
    public static readonly RULE_thisExpr = 111;
    public static readonly RULE_superExpr = 112;
    public static readonly RULE_superConstructorCall = 113;
    public static readonly RULE_superMethodCall = 114;
    public static readonly RULE_typeofExpr = 115;
    public static readonly RULE_typeAssert = 116;
    public static readonly RULE_lambda = 117;
    public static readonly RULE_fn = 118;
    public static readonly RULE_asyncLambda = 119;
    public static readonly RULE_asyncFn = 120;
    public static readonly RULE_generatorFn = 121;
    public static readonly RULE_asyncGeneratorFn = 122;
    public static readonly RULE_iifeForm = 123;
    public static readonly RULE_iifeAsyncForm = 124;
    public static readonly RULE_fnO = 125;
    public static readonly RULE_lambdaO = 126;
    public static readonly RULE_asyncFnO = 127;
    public static readonly RULE_asyncLambdaO = 128;
    public static readonly RULE_generatorFnO = 129;
    public static readonly RULE_asyncGeneratorFnO = 130;
    public static readonly RULE_methodO = 131;
    public static readonly RULE_abstractMethodO = 132;
    public static readonly RULE_constructorO = 133;
    public static readonly RULE_fnoSignature = 134;
    public static readonly RULE_fnoParam = 135;
    public static readonly RULE_fnoRestParam = 136;
    public static readonly RULE_awaitExpr = 137;
    public static readonly RULE_yieldExpr = 138;
    public static readonly RULE_yieldStarExpr = 139;
    public static readonly RULE_bindExpr = 140;
    public static readonly RULE_methodCallExpr = 141;
    public static readonly RULE_ternary = 142;
    public static readonly RULE_condExpr = 143;
    public static readonly RULE_condClause = 144;
    public static readonly RULE_condElseClause = 145;
    public static readonly RULE_newForm = 146;
    public static readonly RULE_objectExpr = 147;
    public static readonly RULE_objectField = 148;
    public static readonly RULE_methodDef = 149;
    public static readonly RULE_arrayExpr = 150;
    public static readonly RULE_bracketArrayExpr = 151;
    public static readonly RULE_braceObjectExpr = 152;
    public static readonly RULE_braceObjectField = 153;
    public static readonly RULE_templateExpr = 154;
    public static readonly RULE_propKey = 155;
    public static readonly RULE_opSymbol = 156;
    public static readonly RULE_propAccess = 157;
    public static readonly RULE_subscriptAccess = 158;
    public static readonly RULE_indexAccess = 159;
    public static readonly RULE_quasiquote = 160;
    public static readonly RULE_quasiForm = 161;
    public static readonly RULE_sForm = 162;
    public static readonly RULE_unquote = 163;
    public static readonly RULE_unquoteSplicing = 164;
    public static readonly RULE_tildeUnquote = 165;
    public static readonly RULE_tildeUnquoteSplice = 166;
    public static readonly RULE_optChain = 167;
    public static readonly RULE_optChainIndex = 168;
    public static readonly RULE_nullCoalesce = 169;
    public static readonly RULE_infixExpr = 170;
    public static readonly RULE_infixBody = 171;
    public static readonly RULE_infixAtom = 172;
    public static readonly RULE_infixArgs = 173;
    public static readonly RULE_infixUnaryOp = 174;
    public static readonly RULE_infixBinOp = 175;
    public static readonly RULE_macroExprCall = 176;
    public static readonly RULE_macroBodyCall = 177;
    public static readonly RULE_call = 178;
    public static readonly RULE_typeArgs = 179;
    public static readonly RULE_fnSignature = 180;
    public static readonly RULE_param = 181;
    public static readonly RULE_restParam = 182;
    public static readonly RULE_literal = 183;

    public static readonly literalNames = [
        null, null, "'('", "')'", "','", "'macro-import'", "'macro-export'", 
        "'macro-reexport'", "'program'", "'let'", "'var'", "'const'", "'lambda-o'", 
        "'lambda'", "'fn-o'", "'fn'", "'method-o'", "'method'", "'bind'", 
        "'method-call'", "'defmacro'", "'#[macro-time]'", "'macro-error'", 
        "'if'", "'while'", "'then'", "'return'", "'throw'", "'break'", "'continue'", 
        "'set!'", "'ternary'", "'cond'", "'object'", "'type-array'", "'array'", 
        "'subscript'", "'optchain-index'", "'.?'", "'.'", "'index'", "'??'", 
        "'quasi'", "'quote'", "'unquote-splicing'", "'unquote'", "'new'", 
        "'import'", "'switch'", "'case'", "'default'", "'for-in'", "'for-of'", 
        "'for-await'", "'try'", "'catch'", "'finally'", "'except'", "'as'", 
        "'for'", "'class-body'", "'super-method'", "'abstract-method-o'", 
        "'abstract-method'", "'class'", "'field'", "'constructor-o'", "'constructor'", 
        "'this'", "'super'", "'get'", "'set'", "'implements'", "'mixin'", 
        "'declare'", "'union'", "'intersect'", "'tuple'", "'tfn'", "'tlit'", 
        "'keyof'", "'typeof'", "'type-as'", "'infer'", "'mapped'", "'type-template'", 
        "'template'", "'rest'", "'readonly'", "'type-params'", "'type-args'", 
        "'type-app'", "'extends'", "'returns'", "'type'", "'interface'", 
        "'enum'", "'modifiers'", "'?'", null, "'null'", "'undefined'", "':'", 
        "'async-generator-fn-o'", "'async-generator-fn'", "'async-lambda-o'", 
        "'async-lambda'", "'iife-async'", "'iife'", "'async-fn-o'", "'async-fn'", 
        "'generator-fn-o'", "'generator-fn'", "'yield*'", "'yield'", "'await'", 
        "'^'", "'public'", "'private'", "'protected'", "'static'", "'abstract'", 
        "'override'", "'async'", "'generator'", "'else'", "'['", "']'", 
        "'==='", "'!=='", "'=='", "'!='", "'>='", "'<='", "'=>'", "'=&'", 
        "'+='", "'-='", "'*='", "'/='", "'%='", "'='", "'{'", "'}'", "'#{'", 
        "'**'", "'&&'", "'||'", "'+'", "'*'", "'/'", "'%'", "'<'", "'>'", 
        "'!'", "'&'", "'|'", "'export'", "'export-default'", "'export-named'", 
        "'export-ns-from'", "'export-from'", "'export-all-from'", "'import-type'", 
        "'export-type-all-from'", "'export-type-from'", "'export-type'", 
        null, null, null, null, "'-'", "'~@'", "'~'"
    ];

    public static readonly symbolicNames = [
        null, "COMMENT", "LPAREN", "RPAREN", "COMMA", "MACRO_IMPORT", "MACRO_EXPORT", 
        "MACRO_REEXPORT", "PROGRAM", "LET", "VAR", "CONST", "LAMBDA_O", 
        "LAMBDA", "FN_O", "FN", "METHOD_O", "METHOD", "BIND", "METHOD_CALL", 
        "DEFMACRO", "MACRO_TIME_ATTR", "MACRO_ERROR", "IF", "WHILE", "THEN", 
        "RETURN", "THROW", "BREAK", "CONTINUE", "SET", "TERNARY", "COND", 
        "OBJECT", "TYPE_ARRAY", "ARRAY", "SUBSCRIPT", "OPTCHAIN_INDEX", 
        "OPTCHAIN", "DOT", "INDEX", "NULLCOAL", "QUASI", "QUOTE", "UNQUOTE_SPLICING", 
        "UNQUOTE", "NEW", "IMPORT", "SWITCH", "CASE", "DEFAULT", "FORIN", 
        "FOROF", "FORAWAIT", "TRY", "CATCH", "FINALLY", "EXCEPT", "AS", 
        "FOR", "CLASS_BODY", "SUPER_METHOD", "ABSTRACT_METHOD_O", "ABSTRACT_METHOD", 
        "CLASS", "FIELD", "CONSTRUCTOR_O", "CONSTRUCTOR", "THIS", "SUPER", 
        "GET", "SETPROP", "IMPLEMENTS", "MIXIN", "DECLARE", "UNION", "INTERSECT", 
        "TUPLE", "TYPEFN", "LIT", "KEYOF", "TYPEOF", "TYPE_AS", "INFER", 
        "MAPPED", "TYPE_TEMPLATE", "TEMPLATE", "REST", "READONLY", "TYPE_PARAMS", 
        "TYPE_ARGS", "TYPE_APP", "EXTENDS", "RETURNS", "TYPE", "INTERFACE", 
        "ENUM", "MODIFIERS", "OPTIONAL", "BOOLEAN", "NULL", "UNDEFINED", 
        "COLON", "ASYNC_GENERATOR_FN_O", "ASYNC_GENERATOR_FN", "ASYNC_LAMBDA_O", 
        "ASYNC_LAMBDA", "IIFE_ASYNC", "IIFE", "ASYNC_FN_O", "ASYNC_FN", 
        "GENERATOR_FN_O", "GENERATOR_FN", "YIELD_STAR", "YIELD", "AWAIT", 
        "CARET", "PUBLIC", "PRIVATE", "PROTECTED", "STATIC", "ABSTRACT", 
        "OVERRIDE", "ASYNC", "GENERATOR", "ELSE", "LBRACK", "RBRACK", "STRICT_EQ", 
        "STRICT_NEQ", "EQ_OP", "NEQ_OP", "GTE_OP", "LTE_OP", "FAT_ARROW", 
        "STMT_ARROW", "PLUS_ASSIGN", "MINUS_ASSIGN", "TIMES_ASSIGN", "DIV_ASSIGN", 
        "MOD_ASSIGN", "EQUALS", "LBRACE", "RBRACE", "HASH_LBRACE", "STARSTAR", 
        "AMPAMP", "PIPEPIPE", "PLUS", "STAR", "SLASH", "PERCENT", "LT", 
        "GT", "BANG", "AMP", "PIPE", "EXPORT", "EXPORT_DEFAULT", "EXPORT_NAMED", 
        "EXPORT_NS_FROM", "EXPORT_FROM", "EXPORT_ALL_FROM", "IMPORT_TYPE", 
        "EXPORT_TYPE_ALL_FROM", "EXPORT_TYPE_FROM", "EXPORT_TYPE", "NUMBER", 
        "STRING", "MULTILINE_STRING", "NEG_NUMBER", "MINUS", "TILDE_AT", 
        "TILDE", "IDENTIFIER", "WS"
    ];
    public static readonly ruleNames = [
        "program", "topLevel", "decl", "defmacro", "macroSignature", "macroTimeFnDef", 
        "macroImport", "macroExport", "macroExportSpec", "macroReexport", 
        "topLevelLet", "topLevelVar", "topLevelConst", "metaAnnotation", 
        "typeAlias", "interfaceDef", "interfaceExtends", "enumDef", "enumMember", 
        "mixinForm", "mixinFilter", "classDef", "anonClassDef", "classExtends", 
        "classImplements", "classBody", "classElement", "modifier", "fieldDef", 
        "constructorParam", "constructorSignature", "constructorDef", "classMethodDef", 
        "abstractMethodDef", "getterDef", "setterDef", "methodKey", "statement", 
        "letStmt", "varStmt", "constStar", "ifForm", "thenBlock", "elseBlock", 
        "whileForm", "returnForm", "throwForm", "breakForm", "continueForm", 
        "importForm", "importTypeForm", "importTypeSpec", "importTypeName", 
        "exportForm", "exportBinding", "exportDefault", "exportNamed", "exportNamePair", 
        "exportFrom", "exportAllFrom", "exportNsFromForm", "exportTypeForm", 
        "exportTypeFromForm", "exportTypeAllFromForm", "exportDeclForm", 
        "starBinding", "singleBinding", "objectDestructPat", "arrayDestructPat", 
        "typeExpr", "typeUnion", "typeIntersection", "typeArray", "typeTuple", 
        "typeTupleElement", "typeFunction", "typeFnParam", "typeObject", 
        "typeProp", "propModifier", "typeLiteral", "typeKeyof", "typeTypeof", 
        "typeIndexAccess", "typeConditional", "typeInfer", "typeMapped", 
        "mappedModifiers", "mappedModifier", "typeTemplateLiteral", "templatePart", 
        "typeApplication", "typeParams", "typeParamDecl", "typeParamConstraint", 
        "typeParamDefault", "assign", "compoundAssign", "subscriptAssign", 
        "switchForm", "caseClause", "defaultClause", "forForm", "forInForm", 
        "forOfForm", "forAwaitForm", "exceptForm", "tryClause", "catchClause", 
        "finallyClause", "expression", "thisExpr", "superExpr", "superConstructorCall", 
        "superMethodCall", "typeofExpr", "typeAssert", "lambda", "fn", "asyncLambda", 
        "asyncFn", "generatorFn", "asyncGeneratorFn", "iifeForm", "iifeAsyncForm", 
        "fnO", "lambdaO", "asyncFnO", "asyncLambdaO", "generatorFnO", "asyncGeneratorFnO", 
        "methodO", "abstractMethodO", "constructorO", "fnoSignature", "fnoParam", 
        "fnoRestParam", "awaitExpr", "yieldExpr", "yieldStarExpr", "bindExpr", 
        "methodCallExpr", "ternary", "condExpr", "condClause", "condElseClause", 
        "newForm", "objectExpr", "objectField", "methodDef", "arrayExpr", 
        "bracketArrayExpr", "braceObjectExpr", "braceObjectField", "templateExpr", 
        "propKey", "opSymbol", "propAccess", "subscriptAccess", "indexAccess", 
        "quasiquote", "quasiForm", "sForm", "unquote", "unquoteSplicing", 
        "tildeUnquote", "tildeUnquoteSplice", "optChain", "optChainIndex", 
        "nullCoalesce", "infixExpr", "infixBody", "infixAtom", "infixArgs", 
        "infixUnaryOp", "infixBinOp", "macroExprCall", "macroBodyCall", 
        "call", "typeArgs", "fnSignature", "param", "restParam", "literal",
    ];

    public get grammarFileName(): string { return "Stage10.g4"; }
    public get literalNames(): (string | null)[] { return Stage10Parser.literalNames; }
    public get symbolicNames(): (string | null)[] { return Stage10Parser.symbolicNames; }
    public get ruleNames(): string[] { return Stage10Parser.ruleNames; }
    public get serializedATN(): number[] { return Stage10Parser._serializedATN; }

    protected createFailedPredicateException(predicate?: string, message?: string): antlr.FailedPredicateException {
        return new antlr.FailedPredicateException(this, predicate, message);
    }

    public constructor(input: antlr.TokenStream) {
        super(input);
        this.interpreter = new antlr.ParserATNSimulator(this, Stage10Parser._ATN, Stage10Parser.decisionsToDFA, new antlr.PredictionContextCache());
    }
    public program(): ProgramContext {
        let localContext = new ProgramContext(this.context, this.state);
        this.enterRule(localContext, 0, Stage10Parser.RULE_program);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 368;
            this.match(Stage10Parser.LPAREN);
            this.state = 369;
            this.match(Stage10Parser.PROGRAM);
            this.state = 373;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 22 || ((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 402653185) !== 0) || ((((_la - 99)) & ~0x1F) === 0 && ((1 << (_la - 99)) & 3892445191) !== 0) || ((((_la - 131)) & ~0x1F) === 0 && ((1 << (_la - 131)) & 67103751) !== 0) || ((((_la - 167)) & ~0x1F) === 0 && ((1 << (_la - 167)) & 251) !== 0)) {
                {
                {
                this.state = 370;
                this.topLevel();
                }
                }
                this.state = 375;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 376;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 2, Stage10Parser.RULE_topLevel);
        try {
            this.state = 395;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 1, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 378;
                this.defmacro();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 379;
                this.macroTimeFnDef();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 380;
                this.macroImport();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 381;
                this.macroExport();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 382;
                this.macroReexport();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 383;
                this.topLevelLet();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 384;
                this.topLevelVar();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 385;
                this.topLevelConst();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 386;
                this.fn();
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 387;
                this.fnO();
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 388;
                this.typeAlias();
                }
                break;
            case 12:
                this.enterOuterAlt(localContext, 12);
                {
                this.state = 389;
                this.interfaceDef();
                }
                break;
            case 13:
                this.enterOuterAlt(localContext, 13);
                {
                this.state = 390;
                this.enumDef();
                }
                break;
            case 14:
                this.enterOuterAlt(localContext, 14);
                {
                this.state = 391;
                this.classDef();
                }
                break;
            case 15:
                this.enterOuterAlt(localContext, 15);
                {
                this.state = 392;
                this.mixinForm();
                }
                break;
            case 16:
                this.enterOuterAlt(localContext, 16);
                {
                this.state = 393;
                this.exportDeclForm();
                }
                break;
            case 17:
                this.enterOuterAlt(localContext, 17);
                {
                this.state = 394;
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
        this.enterRule(localContext, 4, Stage10Parser.RULE_decl);
        try {
            this.state = 405;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 2, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 397;
                this.topLevelLet();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 398;
                this.topLevelVar();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 399;
                this.topLevelConst();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 400;
                this.fn();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 401;
                this.classDef();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 402;
                this.interfaceDef();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 403;
                this.enumDef();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 404;
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
        this.enterRule(localContext, 6, Stage10Parser.RULE_defmacro);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 407;
            this.match(Stage10Parser.LPAREN);
            this.state = 408;
            this.match(Stage10Parser.DEFMACRO);
            this.state = 409;
            this.match(Stage10Parser.IDENTIFIER);
            this.state = 410;
            this.macroSignature();
            this.state = 414;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 22 || ((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 402653185) !== 0) || ((((_la - 99)) & ~0x1F) === 0 && ((1 << (_la - 99)) & 3892445191) !== 0) || ((((_la - 131)) & ~0x1F) === 0 && ((1 << (_la - 131)) & 67103751) !== 0) || ((((_la - 167)) & ~0x1F) === 0 && ((1 << (_la - 167)) & 251) !== 0)) {
                {
                {
                this.state = 411;
                this.statement();
                }
                }
                this.state = 416;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 417;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 8, Stage10Parser.RULE_macroSignature);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 419;
            this.match(Stage10Parser.LPAREN);
            {
            this.state = 423;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 174) {
                {
                {
                this.state = 420;
                this.match(Stage10Parser.IDENTIFIER);
                }
                }
                this.state = 425;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 428;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 87) {
                {
                this.state = 426;
                this.match(Stage10Parser.REST);
                this.state = 427;
                this.match(Stage10Parser.IDENTIFIER);
                }
            }

            }
            this.state = 430;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 10, Stage10Parser.RULE_macroTimeFnDef);
        try {
            this.state = 442;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 6, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 432;
                this.match(Stage10Parser.LPAREN);
                this.state = 433;
                this.match(Stage10Parser.MACRO_TIME_ATTR);
                this.state = 434;
                this.topLevelLet();
                this.state = 435;
                this.match(Stage10Parser.RPAREN);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 437;
                this.match(Stage10Parser.LPAREN);
                this.state = 438;
                this.match(Stage10Parser.MACRO_TIME_ATTR);
                this.state = 439;
                this.topLevelConst();
                this.state = 440;
                this.match(Stage10Parser.RPAREN);
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
        this.enterRule(localContext, 12, Stage10Parser.RULE_macroImport);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 444;
            this.match(Stage10Parser.LPAREN);
            this.state = 445;
            this.match(Stage10Parser.MACRO_IMPORT);
            this.state = 446;
            this.match(Stage10Parser.IDENTIFIER);
            this.state = 447;
            this.match(Stage10Parser.STRING);
            this.state = 448;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 14, Stage10Parser.RULE_macroExport);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 450;
            this.match(Stage10Parser.LPAREN);
            this.state = 451;
            this.match(Stage10Parser.MACRO_EXPORT);
            this.state = 453;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 452;
                this.macroExportSpec();
                }
                }
                this.state = 455;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 174);
            this.state = 457;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 16, Stage10Parser.RULE_macroExportSpec);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 459;
            this.match(Stage10Parser.IDENTIFIER);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 18, Stage10Parser.RULE_macroReexport);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 461;
            this.match(Stage10Parser.LPAREN);
            this.state = 462;
            this.match(Stage10Parser.MACRO_REEXPORT);
            this.state = 463;
            this.match(Stage10Parser.IDENTIFIER);
            this.state = 467;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 174) {
                {
                {
                this.state = 464;
                this.match(Stage10Parser.IDENTIFIER);
                }
                }
                this.state = 469;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 470;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 20, Stage10Parser.RULE_topLevelLet);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 472;
            this.match(Stage10Parser.LPAREN);
            this.state = 473;
            this.match(Stage10Parser.LET);
            this.state = 477;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 116) {
                {
                {
                this.state = 474;
                this.metaAnnotation();
                }
                }
                this.state = 479;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 480;
            this.match(Stage10Parser.LPAREN);
            this.state = 481;
            this.starBinding();
            this.state = 482;
            this.match(Stage10Parser.RPAREN);
            this.state = 483;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 22, Stage10Parser.RULE_topLevelVar);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 485;
            this.match(Stage10Parser.LPAREN);
            this.state = 486;
            this.match(Stage10Parser.VAR);
            this.state = 490;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 116) {
                {
                {
                this.state = 487;
                this.metaAnnotation();
                }
                }
                this.state = 492;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 493;
            this.match(Stage10Parser.LPAREN);
            this.state = 494;
            this.starBinding();
            this.state = 495;
            this.match(Stage10Parser.RPAREN);
            this.state = 496;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 24, Stage10Parser.RULE_topLevelConst);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 498;
            this.match(Stage10Parser.LPAREN);
            this.state = 499;
            this.match(Stage10Parser.CONST);
            this.state = 503;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 116) {
                {
                {
                this.state = 500;
                this.metaAnnotation();
                }
                }
                this.state = 505;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 506;
            this.match(Stage10Parser.LPAREN);
            this.state = 507;
            this.starBinding();
            this.state = 508;
            this.match(Stage10Parser.RPAREN);
            this.state = 509;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 26, Stage10Parser.RULE_metaAnnotation);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 511;
            this.match(Stage10Parser.CARET);
            this.state = 512;
            this.match(Stage10Parser.IDENTIFIER);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 28, Stage10Parser.RULE_typeAlias);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 514;
            this.match(Stage10Parser.LPAREN);
            this.state = 515;
            this.match(Stage10Parser.TYPE);
            this.state = 516;
            this.match(Stage10Parser.IDENTIFIER);
            this.state = 518;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 12, this.context) ) {
            case 1:
                {
                this.state = 517;
                this.typeParams();
                }
                break;
            }
            this.state = 520;
            this.typeExpr();
            this.state = 521;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 30, Stage10Parser.RULE_interfaceDef);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 523;
            this.match(Stage10Parser.LPAREN);
            this.state = 524;
            this.match(Stage10Parser.INTERFACE);
            this.state = 525;
            this.match(Stage10Parser.IDENTIFIER);
            this.state = 527;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 13, this.context) ) {
            case 1:
                {
                this.state = 526;
                this.typeParams();
                }
                break;
            }
            this.state = 530;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 14, this.context) ) {
            case 1:
                {
                this.state = 529;
                this.interfaceExtends();
                }
                break;
            }
            this.state = 532;
            this.typeObject();
            this.state = 533;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 32, Stage10Parser.RULE_interfaceExtends);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 535;
            this.match(Stage10Parser.LPAREN);
            this.state = 536;
            this.match(Stage10Parser.EXTENDS);
            this.state = 538;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 537;
                this.typeExpr();
                }
                }
                this.state = 540;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 33 || _la === 100 || _la === 101 || _la === 142 || _la === 174);
            this.state = 542;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 34, Stage10Parser.RULE_enumDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 544;
            this.match(Stage10Parser.LPAREN);
            this.state = 545;
            this.match(Stage10Parser.ENUM);
            this.state = 546;
            this.match(Stage10Parser.IDENTIFIER);
            this.state = 550;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 547;
                this.enumMember();
                }
                }
                this.state = 552;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 553;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 36, Stage10Parser.RULE_enumMember);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 555;
            this.match(Stage10Parser.LPAREN);
            this.state = 556;
            this.match(Stage10Parser.IDENTIFIER);
            this.state = 558;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (((((_la - 167)) & ~0x1F) === 0 && ((1 << (_la - 167)) & 11) !== 0)) {
                {
                this.state = 557;
                _la = this.tokenStream.LA(1);
                if(!(((((_la - 167)) & ~0x1F) === 0 && ((1 << (_la - 167)) & 11) !== 0))) {
                this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                }
            }

            this.state = 560;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public mixinForm(): MixinFormContext {
        let localContext = new MixinFormContext(this.context, this.state);
        this.enterRule(localContext, 38, Stage10Parser.RULE_mixinForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 562;
            this.match(Stage10Parser.LPAREN);
            this.state = 563;
            this.match(Stage10Parser.MIXIN);
            this.state = 564;
            this.match(Stage10Parser.IDENTIFIER);
            this.state = 566;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 565;
                this.match(Stage10Parser.IDENTIFIER);
                }
                }
                this.state = 568;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 174);
            this.state = 571;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 102) {
                {
                this.state = 570;
                this.mixinFilter();
                }
            }

            this.state = 573;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public mixinFilter(): MixinFilterContext {
        let localContext = new MixinFilterContext(this.context, this.state);
        this.enterRule(localContext, 40, Stage10Parser.RULE_mixinFilter);
        let _la: number;
        try {
            this.state = 595;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 22, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 575;
                this.match(Stage10Parser.COLON);
                this.state = 576;
                this.match(Stage10Parser.IDENTIFIER);
                this.state = 577;
                this.match(Stage10Parser.LPAREN);
                this.state = 581;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 174) {
                    {
                    {
                    this.state = 578;
                    this.match(Stage10Parser.IDENTIFIER);
                    }
                    }
                    this.state = 583;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 584;
                this.match(Stage10Parser.RPAREN);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 585;
                this.match(Stage10Parser.COLON);
                this.state = 586;
                this.match(Stage10Parser.EXCEPT);
                this.state = 587;
                this.match(Stage10Parser.LPAREN);
                this.state = 591;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 174) {
                    {
                    {
                    this.state = 588;
                    this.match(Stage10Parser.IDENTIFIER);
                    }
                    }
                    this.state = 593;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 594;
                this.match(Stage10Parser.RPAREN);
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
    public classDef(): ClassDefContext {
        let localContext = new ClassDefContext(this.context, this.state);
        this.enterRule(localContext, 42, Stage10Parser.RULE_classDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 597;
            this.match(Stage10Parser.LPAREN);
            this.state = 598;
            this.match(Stage10Parser.CLASS);
            this.state = 602;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 74 || _la === 88 || ((((_la - 117)) & ~0x1F) === 0 && ((1 << (_la - 117)) & 255) !== 0)) {
                {
                {
                this.state = 599;
                this.modifier();
                }
                }
                this.state = 604;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 605;
            this.match(Stage10Parser.IDENTIFIER);
            this.state = 607;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 24, this.context) ) {
            case 1:
                {
                this.state = 606;
                this.typeParams();
                }
                break;
            }
            this.state = 610;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 25, this.context) ) {
            case 1:
                {
                this.state = 609;
                this.classExtends();
                }
                break;
            }
            this.state = 613;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 26, this.context) ) {
            case 1:
                {
                this.state = 612;
                this.classImplements();
                }
                break;
            }
            this.state = 615;
            this.classBody();
            this.state = 616;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 44, Stage10Parser.RULE_anonClassDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 618;
            this.match(Stage10Parser.LPAREN);
            this.state = 619;
            this.match(Stage10Parser.CLASS);
            this.state = 623;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 74 || _la === 88 || ((((_la - 117)) & ~0x1F) === 0 && ((1 << (_la - 117)) & 255) !== 0)) {
                {
                {
                this.state = 620;
                this.modifier();
                }
                }
                this.state = 625;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 627;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 28, this.context) ) {
            case 1:
                {
                this.state = 626;
                this.classExtends();
                }
                break;
            }
            this.state = 630;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 29, this.context) ) {
            case 1:
                {
                this.state = 629;
                this.classImplements();
                }
                break;
            }
            this.state = 632;
            this.classBody();
            this.state = 633;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 46, Stage10Parser.RULE_classExtends);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 635;
            this.match(Stage10Parser.LPAREN);
            this.state = 636;
            this.match(Stage10Parser.EXTENDS);
            this.state = 637;
            this.typeExpr();
            this.state = 638;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 48, Stage10Parser.RULE_classImplements);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 640;
            this.match(Stage10Parser.LPAREN);
            this.state = 641;
            this.match(Stage10Parser.IMPLEMENTS);
            this.state = 643;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 642;
                this.typeExpr();
                }
                }
                this.state = 645;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 33 || _la === 100 || _la === 101 || _la === 142 || _la === 174);
            this.state = 647;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 50, Stage10Parser.RULE_classBody);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 649;
            this.match(Stage10Parser.LPAREN);
            this.state = 650;
            this.match(Stage10Parser.CLASS_BODY);
            this.state = 654;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 651;
                this.classElement();
                }
                }
                this.state = 656;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 657;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 52, Stage10Parser.RULE_classElement);
        try {
            this.state = 668;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 32, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 659;
                this.fieldDef();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 660;
                this.constructorDef();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 661;
                this.classMethodDef();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 662;
                this.abstractMethodDef();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 663;
                this.getterDef();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 664;
                this.setterDef();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 665;
                this.methodO();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 666;
                this.abstractMethodO();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 667;
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
        this.enterRule(localContext, 54, Stage10Parser.RULE_modifier);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 670;
            _la = this.tokenStream.LA(1);
            if(!(_la === 74 || _la === 88 || ((((_la - 117)) & ~0x1F) === 0 && ((1 << (_la - 117)) & 255) !== 0))) {
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
        this.enterRule(localContext, 56, Stage10Parser.RULE_fieldDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 672;
            this.match(Stage10Parser.LPAREN);
            this.state = 673;
            this.match(Stage10Parser.FIELD);
            this.state = 677;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 74 || _la === 88 || ((((_la - 117)) & ~0x1F) === 0 && ((1 << (_la - 117)) & 255) !== 0)) {
                {
                {
                this.state = 674;
                this.modifier();
                }
                }
                this.state = 679;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 680;
            this.match(Stage10Parser.LPAREN);
            this.state = 681;
            this.match(Stage10Parser.IDENTIFIER);
            this.state = 684;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 102) {
                {
                this.state = 682;
                this.match(Stage10Parser.COLON);
                this.state = 683;
                this.typeExpr();
                }
            }

            this.state = 686;
            this.match(Stage10Parser.RPAREN);
            this.state = 688;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2 || _la === 22 || ((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 402653185) !== 0) || ((((_la - 99)) & ~0x1F) === 0 && ((1 << (_la - 99)) & 3892445191) !== 0) || ((((_la - 131)) & ~0x1F) === 0 && ((1 << (_la - 131)) & 67103751) !== 0) || ((((_la - 167)) & ~0x1F) === 0 && ((1 << (_la - 167)) & 251) !== 0)) {
                {
                this.state = 687;
                this.expression();
                }
            }

            this.state = 690;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 58, Stage10Parser.RULE_constructorParam);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 692;
            this.match(Stage10Parser.LPAREN);
            this.state = 696;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 74 || _la === 88 || ((((_la - 117)) & ~0x1F) === 0 && ((1 << (_la - 117)) & 255) !== 0)) {
                {
                {
                this.state = 693;
                this.modifier();
                }
                }
                this.state = 698;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 699;
            this.match(Stage10Parser.IDENTIFIER);
            this.state = 701;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 98) {
                {
                this.state = 700;
                this.match(Stage10Parser.OPTIONAL);
                }
            }

            this.state = 705;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 102) {
                {
                this.state = 703;
                this.match(Stage10Parser.COLON);
                this.state = 704;
                this.typeExpr();
                }
            }

            this.state = 707;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 60, Stage10Parser.RULE_constructorSignature);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 709;
            this.match(Stage10Parser.LPAREN);
            this.state = 720;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2) {
                {
                this.state = 710;
                this.constructorParam();
                this.state = 717;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 2 || _la === 4) {
                    {
                    {
                    this.state = 712;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    if (_la === 4) {
                        {
                        this.state = 711;
                        this.match(Stage10Parser.COMMA);
                        }
                    }

                    this.state = 714;
                    this.constructorParam();
                    }
                    }
                    this.state = 719;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
            }

            this.state = 722;
            this.match(Stage10Parser.RPAREN);
            this.state = 725;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 102) {
                {
                this.state = 723;
                this.match(Stage10Parser.COLON);
                this.state = 724;
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
        this.enterRule(localContext, 62, Stage10Parser.RULE_constructorDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 727;
            this.match(Stage10Parser.LPAREN);
            this.state = 728;
            this.match(Stage10Parser.CONSTRUCTOR);
            this.state = 729;
            this.constructorSignature();
            this.state = 733;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 22 || ((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 402653185) !== 0) || ((((_la - 99)) & ~0x1F) === 0 && ((1 << (_la - 99)) & 3892445191) !== 0) || ((((_la - 131)) & ~0x1F) === 0 && ((1 << (_la - 131)) & 67103751) !== 0) || ((((_la - 167)) & ~0x1F) === 0 && ((1 << (_la - 167)) & 251) !== 0)) {
                {
                {
                this.state = 730;
                this.statement();
                }
                }
                this.state = 735;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 736;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 64, Stage10Parser.RULE_classMethodDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 738;
            this.match(Stage10Parser.LPAREN);
            this.state = 739;
            this.match(Stage10Parser.METHOD);
            this.state = 743;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 74 || _la === 88 || ((((_la - 117)) & ~0x1F) === 0 && ((1 << (_la - 117)) & 255) !== 0)) {
                {
                {
                this.state = 740;
                this.modifier();
                }
                }
                this.state = 745;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 746;
            this.methodKey();
            this.state = 747;
            this.fnSignature();
            this.state = 751;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 22 || ((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 402653185) !== 0) || ((((_la - 99)) & ~0x1F) === 0 && ((1 << (_la - 99)) & 3892445191) !== 0) || ((((_la - 131)) & ~0x1F) === 0 && ((1 << (_la - 131)) & 67103751) !== 0) || ((((_la - 167)) & ~0x1F) === 0 && ((1 << (_la - 167)) & 251) !== 0)) {
                {
                {
                this.state = 748;
                this.statement();
                }
                }
                this.state = 753;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 754;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 66, Stage10Parser.RULE_abstractMethodDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 756;
            this.match(Stage10Parser.LPAREN);
            this.state = 757;
            this.match(Stage10Parser.ABSTRACT_METHOD);
            this.state = 761;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 74 || _la === 88 || ((((_la - 117)) & ~0x1F) === 0 && ((1 << (_la - 117)) & 255) !== 0)) {
                {
                {
                this.state = 758;
                this.modifier();
                }
                }
                this.state = 763;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 764;
            this.methodKey();
            this.state = 765;
            this.fnSignature();
            this.state = 766;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 68, Stage10Parser.RULE_getterDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 768;
            this.match(Stage10Parser.LPAREN);
            this.state = 769;
            this.match(Stage10Parser.GET);
            this.state = 773;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 74 || _la === 88 || ((((_la - 117)) & ~0x1F) === 0 && ((1 << (_la - 117)) & 255) !== 0)) {
                {
                {
                this.state = 770;
                this.modifier();
                }
                }
                this.state = 775;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 776;
            this.methodKey();
            this.state = 777;
            this.fnSignature();
            this.state = 781;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 22 || ((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 402653185) !== 0) || ((((_la - 99)) & ~0x1F) === 0 && ((1 << (_la - 99)) & 3892445191) !== 0) || ((((_la - 131)) & ~0x1F) === 0 && ((1 << (_la - 131)) & 67103751) !== 0) || ((((_la - 167)) & ~0x1F) === 0 && ((1 << (_la - 167)) & 251) !== 0)) {
                {
                {
                this.state = 778;
                this.statement();
                }
                }
                this.state = 783;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 784;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 70, Stage10Parser.RULE_setterDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 786;
            this.match(Stage10Parser.LPAREN);
            this.state = 787;
            this.match(Stage10Parser.SETPROP);
            this.state = 791;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 74 || _la === 88 || ((((_la - 117)) & ~0x1F) === 0 && ((1 << (_la - 117)) & 255) !== 0)) {
                {
                {
                this.state = 788;
                this.modifier();
                }
                }
                this.state = 793;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 794;
            this.methodKey();
            this.state = 795;
            this.fnSignature();
            this.state = 799;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 22 || ((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 402653185) !== 0) || ((((_la - 99)) & ~0x1F) === 0 && ((1 << (_la - 99)) & 3892445191) !== 0) || ((((_la - 131)) & ~0x1F) === 0 && ((1 << (_la - 131)) & 67103751) !== 0) || ((((_la - 167)) & ~0x1F) === 0 && ((1 << (_la - 167)) & 251) !== 0)) {
                {
                {
                this.state = 796;
                this.statement();
                }
                }
                this.state = 801;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 802;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 72, Stage10Parser.RULE_methodKey);
        try {
            this.state = 811;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case Stage10Parser.IDENTIFIER:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 804;
                this.match(Stage10Parser.IDENTIFIER);
                }
                break;
            case Stage10Parser.GET:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 805;
                this.match(Stage10Parser.GET);
                }
                break;
            case Stage10Parser.SETPROP:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 806;
                this.match(Stage10Parser.SETPROP);
                }
                break;
            case Stage10Parser.LBRACK:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 807;
                this.match(Stage10Parser.LBRACK);
                this.state = 808;
                this.expression();
                this.state = 809;
                this.match(Stage10Parser.RBRACK);
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
        this.enterRule(localContext, 74, Stage10Parser.RULE_statement);
        try {
            this.state = 836;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 52, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 813;
                this.letStmt();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 814;
                this.varStmt();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 815;
                this.constStar();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 816;
                this.ifForm();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 817;
                this.whileForm();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 818;
                this.exceptForm();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 819;
                this.returnForm();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 820;
                this.throwForm();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 821;
                this.breakForm();
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 822;
                this.continueForm();
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 823;
                this.importForm();
                }
                break;
            case 12:
                this.enterOuterAlt(localContext, 12);
                {
                this.state = 824;
                this.importTypeForm();
                }
                break;
            case 13:
                this.enterOuterAlt(localContext, 13);
                {
                this.state = 825;
                this.exportForm();
                }
                break;
            case 14:
                this.enterOuterAlt(localContext, 14);
                {
                this.state = 826;
                this.switchForm();
                }
                break;
            case 15:
                this.enterOuterAlt(localContext, 15);
                {
                this.state = 827;
                this.forForm();
                }
                break;
            case 16:
                this.enterOuterAlt(localContext, 16);
                {
                this.state = 828;
                this.forInForm();
                }
                break;
            case 17:
                this.enterOuterAlt(localContext, 17);
                {
                this.state = 829;
                this.forOfForm();
                }
                break;
            case 18:
                this.enterOuterAlt(localContext, 18);
                {
                this.state = 830;
                this.forAwaitForm();
                }
                break;
            case 19:
                this.enterOuterAlt(localContext, 19);
                {
                this.state = 831;
                this.assign();
                }
                break;
            case 20:
                this.enterOuterAlt(localContext, 20);
                {
                this.state = 832;
                this.compoundAssign();
                }
                break;
            case 21:
                this.enterOuterAlt(localContext, 21);
                {
                this.state = 833;
                this.subscriptAssign();
                }
                break;
            case 22:
                this.enterOuterAlt(localContext, 22);
                {
                this.state = 834;
                this.macroBodyCall();
                }
                break;
            case 23:
                this.enterOuterAlt(localContext, 23);
                {
                this.state = 835;
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
        this.enterRule(localContext, 76, Stage10Parser.RULE_letStmt);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 838;
            this.match(Stage10Parser.LPAREN);
            this.state = 839;
            this.match(Stage10Parser.LET);
            this.state = 840;
            this.match(Stage10Parser.LPAREN);
            this.state = 842;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 841;
                this.starBinding();
                }
                }
                this.state = 844;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2);
            this.state = 846;
            this.match(Stage10Parser.RPAREN);
            this.state = 850;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 22 || ((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 402653185) !== 0) || ((((_la - 99)) & ~0x1F) === 0 && ((1 << (_la - 99)) & 3892445191) !== 0) || ((((_la - 131)) & ~0x1F) === 0 && ((1 << (_la - 131)) & 67103751) !== 0) || ((((_la - 167)) & ~0x1F) === 0 && ((1 << (_la - 167)) & 251) !== 0)) {
                {
                {
                this.state = 847;
                this.statement();
                }
                }
                this.state = 852;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 853;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 78, Stage10Parser.RULE_varStmt);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 855;
            this.match(Stage10Parser.LPAREN);
            this.state = 856;
            this.match(Stage10Parser.VAR);
            this.state = 857;
            this.match(Stage10Parser.LPAREN);
            this.state = 859;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 858;
                this.starBinding();
                }
                }
                this.state = 861;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2);
            this.state = 863;
            this.match(Stage10Parser.RPAREN);
            this.state = 867;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 22 || ((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 402653185) !== 0) || ((((_la - 99)) & ~0x1F) === 0 && ((1 << (_la - 99)) & 3892445191) !== 0) || ((((_la - 131)) & ~0x1F) === 0 && ((1 << (_la - 131)) & 67103751) !== 0) || ((((_la - 167)) & ~0x1F) === 0 && ((1 << (_la - 167)) & 251) !== 0)) {
                {
                {
                this.state = 864;
                this.statement();
                }
                }
                this.state = 869;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 870;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 80, Stage10Parser.RULE_constStar);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 872;
            this.match(Stage10Parser.LPAREN);
            this.state = 873;
            this.match(Stage10Parser.CONST);
            this.state = 874;
            this.match(Stage10Parser.LPAREN);
            this.state = 876;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 875;
                this.starBinding();
                }
                }
                this.state = 878;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2);
            this.state = 880;
            this.match(Stage10Parser.RPAREN);
            this.state = 884;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 22 || ((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 402653185) !== 0) || ((((_la - 99)) & ~0x1F) === 0 && ((1 << (_la - 99)) & 3892445191) !== 0) || ((((_la - 131)) & ~0x1F) === 0 && ((1 << (_la - 131)) & 67103751) !== 0) || ((((_la - 167)) & ~0x1F) === 0 && ((1 << (_la - 167)) & 251) !== 0)) {
                {
                {
                this.state = 881;
                this.statement();
                }
                }
                this.state = 886;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 887;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 82, Stage10Parser.RULE_ifForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 889;
            this.match(Stage10Parser.LPAREN);
            this.state = 890;
            this.match(Stage10Parser.IF);
            this.state = 891;
            this.expression();
            this.state = 892;
            this.thenBlock();
            this.state = 894;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2) {
                {
                this.state = 893;
                this.elseBlock();
                }
            }

            this.state = 896;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 84, Stage10Parser.RULE_thenBlock);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 898;
            this.match(Stage10Parser.LPAREN);
            this.state = 899;
            this.match(Stage10Parser.THEN);
            this.state = 903;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 22 || ((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 402653185) !== 0) || ((((_la - 99)) & ~0x1F) === 0 && ((1 << (_la - 99)) & 3892445191) !== 0) || ((((_la - 131)) & ~0x1F) === 0 && ((1 << (_la - 131)) & 67103751) !== 0) || ((((_la - 167)) & ~0x1F) === 0 && ((1 << (_la - 167)) & 251) !== 0)) {
                {
                {
                this.state = 900;
                this.statement();
                }
                }
                this.state = 905;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 906;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 86, Stage10Parser.RULE_elseBlock);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 908;
            this.match(Stage10Parser.LPAREN);
            this.state = 909;
            this.match(Stage10Parser.ELSE);
            this.state = 913;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 22 || ((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 402653185) !== 0) || ((((_la - 99)) & ~0x1F) === 0 && ((1 << (_la - 99)) & 3892445191) !== 0) || ((((_la - 131)) & ~0x1F) === 0 && ((1 << (_la - 131)) & 67103751) !== 0) || ((((_la - 167)) & ~0x1F) === 0 && ((1 << (_la - 167)) & 251) !== 0)) {
                {
                {
                this.state = 910;
                this.statement();
                }
                }
                this.state = 915;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 916;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 88, Stage10Parser.RULE_whileForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 918;
            this.match(Stage10Parser.LPAREN);
            this.state = 919;
            this.match(Stage10Parser.WHILE);
            this.state = 920;
            this.expression();
            this.state = 924;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 22 || ((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 402653185) !== 0) || ((((_la - 99)) & ~0x1F) === 0 && ((1 << (_la - 99)) & 3892445191) !== 0) || ((((_la - 131)) & ~0x1F) === 0 && ((1 << (_la - 131)) & 67103751) !== 0) || ((((_la - 167)) & ~0x1F) === 0 && ((1 << (_la - 167)) & 251) !== 0)) {
                {
                {
                this.state = 921;
                this.statement();
                }
                }
                this.state = 926;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 927;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 90, Stage10Parser.RULE_returnForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 929;
            this.match(Stage10Parser.LPAREN);
            this.state = 930;
            this.match(Stage10Parser.RETURN);
            this.state = 932;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2 || _la === 22 || ((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 402653185) !== 0) || ((((_la - 99)) & ~0x1F) === 0 && ((1 << (_la - 99)) & 3892445191) !== 0) || ((((_la - 131)) & ~0x1F) === 0 && ((1 << (_la - 131)) & 67103751) !== 0) || ((((_la - 167)) & ~0x1F) === 0 && ((1 << (_la - 167)) & 251) !== 0)) {
                {
                this.state = 931;
                this.expression();
                }
            }

            this.state = 934;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 92, Stage10Parser.RULE_throwForm);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 936;
            this.match(Stage10Parser.LPAREN);
            this.state = 937;
            this.match(Stage10Parser.THROW);
            this.state = 938;
            this.expression();
            this.state = 939;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 94, Stage10Parser.RULE_breakForm);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 941;
            this.match(Stage10Parser.LPAREN);
            this.state = 942;
            this.match(Stage10Parser.BREAK);
            this.state = 943;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 96, Stage10Parser.RULE_continueForm);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 945;
            this.match(Stage10Parser.LPAREN);
            this.state = 946;
            this.match(Stage10Parser.CONTINUE);
            this.state = 947;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 98, Stage10Parser.RULE_importForm);
        let _la: number;
        try {
            this.state = 981;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 65, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 949;
                this.match(Stage10Parser.LPAREN);
                this.state = 950;
                this.match(Stage10Parser.IMPORT);
                this.state = 952;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 2) {
                    {
                    this.state = 951;
                    this.objectExpr();
                    }
                }

                this.state = 954;
                this.match(Stage10Parser.STRING);
                this.state = 955;
                this.match(Stage10Parser.RPAREN);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 956;
                this.match(Stage10Parser.LPAREN);
                this.state = 957;
                this.match(Stage10Parser.IMPORT);
                this.state = 958;
                this.objectDestructPat();
                this.state = 959;
                this.match(Stage10Parser.STRING);
                this.state = 960;
                this.match(Stage10Parser.RPAREN);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 962;
                this.match(Stage10Parser.LPAREN);
                this.state = 963;
                this.match(Stage10Parser.IMPORT);
                this.state = 964;
                this.match(Stage10Parser.IDENTIFIER);
                this.state = 965;
                this.match(Stage10Parser.STRING);
                this.state = 966;
                this.match(Stage10Parser.RPAREN);
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 967;
                this.match(Stage10Parser.LPAREN);
                this.state = 968;
                this.match(Stage10Parser.IMPORT);
                this.state = 969;
                this.match(Stage10Parser.IDENTIFIER);
                this.state = 970;
                this.objectDestructPat();
                this.state = 971;
                this.match(Stage10Parser.STRING);
                this.state = 972;
                this.match(Stage10Parser.RPAREN);
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 974;
                this.match(Stage10Parser.LPAREN);
                this.state = 975;
                this.match(Stage10Parser.IMPORT);
                this.state = 976;
                this.match(Stage10Parser.STAR);
                this.state = 977;
                this.match(Stage10Parser.AS);
                this.state = 978;
                this.match(Stage10Parser.IDENTIFIER);
                this.state = 979;
                this.match(Stage10Parser.STRING);
                this.state = 980;
                this.match(Stage10Parser.RPAREN);
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
        this.enterRule(localContext, 100, Stage10Parser.RULE_importTypeForm);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 983;
            this.match(Stage10Parser.LPAREN);
            this.state = 984;
            this.match(Stage10Parser.IMPORT_TYPE);
            this.state = 985;
            this.importTypeSpec();
            this.state = 986;
            this.match(Stage10Parser.STRING);
            this.state = 987;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 102, Stage10Parser.RULE_importTypeSpec);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 989;
            this.match(Stage10Parser.LPAREN);
            this.state = 990;
            this.match(Stage10Parser.IDENTIFIER);
            this.state = 992;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 991;
                this.importTypeName();
                }
                }
                this.state = 994;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 174);
            this.state = 996;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 104, Stage10Parser.RULE_importTypeName);
        try {
            this.state = 1003;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case Stage10Parser.IDENTIFIER:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 998;
                this.match(Stage10Parser.IDENTIFIER);
                }
                break;
            case Stage10Parser.LPAREN:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 999;
                this.match(Stage10Parser.LPAREN);
                this.state = 1000;
                this.match(Stage10Parser.IDENTIFIER);
                this.state = 1001;
                this.match(Stage10Parser.IDENTIFIER);
                this.state = 1002;
                this.match(Stage10Parser.RPAREN);
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
        this.enterRule(localContext, 106, Stage10Parser.RULE_exportForm);
        try {
            this.state = 1014;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 68, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1005;
                this.exportBinding();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1006;
                this.exportDefault();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 1007;
                this.exportNamed();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 1008;
                this.exportNsFromForm();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 1009;
                this.exportFrom();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 1010;
                this.exportAllFrom();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 1011;
                this.exportTypeForm();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 1012;
                this.exportTypeFromForm();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 1013;
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
        this.enterRule(localContext, 108, Stage10Parser.RULE_exportBinding);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1016;
            this.match(Stage10Parser.LPAREN);
            this.state = 1017;
            this.match(Stage10Parser.EXPORT);
            this.state = 1018;
            this.match(Stage10Parser.IDENTIFIER);
            this.state = 1019;
            this.expression();
            this.state = 1020;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 110, Stage10Parser.RULE_exportDefault);
        try {
            this.state = 1047;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 69, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1022;
                this.match(Stage10Parser.LPAREN);
                this.state = 1023;
                this.match(Stage10Parser.EXPORT_DEFAULT);
                this.state = 1024;
                this.classDef();
                this.state = 1025;
                this.match(Stage10Parser.RPAREN);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1027;
                this.match(Stage10Parser.LPAREN);
                this.state = 1028;
                this.match(Stage10Parser.EXPORT_DEFAULT);
                this.state = 1029;
                this.anonClassDef();
                this.state = 1030;
                this.match(Stage10Parser.RPAREN);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 1032;
                this.match(Stage10Parser.LPAREN);
                this.state = 1033;
                this.match(Stage10Parser.EXPORT_DEFAULT);
                this.state = 1034;
                this.topLevelLet();
                this.state = 1035;
                this.match(Stage10Parser.RPAREN);
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 1037;
                this.match(Stage10Parser.LPAREN);
                this.state = 1038;
                this.match(Stage10Parser.EXPORT_DEFAULT);
                this.state = 1039;
                this.topLevelConst();
                this.state = 1040;
                this.match(Stage10Parser.RPAREN);
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 1042;
                this.match(Stage10Parser.LPAREN);
                this.state = 1043;
                this.match(Stage10Parser.EXPORT_DEFAULT);
                this.state = 1044;
                this.expression();
                this.state = 1045;
                this.match(Stage10Parser.RPAREN);
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
        this.enterRule(localContext, 112, Stage10Parser.RULE_exportNamed);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1049;
            this.match(Stage10Parser.LPAREN);
            this.state = 1050;
            this.match(Stage10Parser.EXPORT_NAMED);
            this.state = 1052;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 1051;
                this.exportNamePair();
                }
                }
                this.state = 1054;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2);
            this.state = 1056;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 114, Stage10Parser.RULE_exportNamePair);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1058;
            this.match(Stage10Parser.LPAREN);
            this.state = 1059;
            this.match(Stage10Parser.IDENTIFIER);
            this.state = 1061;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 174) {
                {
                this.state = 1060;
                this.match(Stage10Parser.IDENTIFIER);
                }
            }

            this.state = 1063;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 116, Stage10Parser.RULE_exportFrom);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1065;
            this.match(Stage10Parser.LPAREN);
            this.state = 1066;
            this.match(Stage10Parser.EXPORT_FROM);
            this.state = 1067;
            this.match(Stage10Parser.STRING);
            this.state = 1069;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 1068;
                this.exportNamePair();
                }
                }
                this.state = 1071;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2);
            this.state = 1073;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 118, Stage10Parser.RULE_exportAllFrom);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1075;
            this.match(Stage10Parser.LPAREN);
            this.state = 1076;
            this.match(Stage10Parser.EXPORT_ALL_FROM);
            this.state = 1077;
            this.match(Stage10Parser.STRING);
            this.state = 1078;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 120, Stage10Parser.RULE_exportNsFromForm);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1080;
            this.match(Stage10Parser.LPAREN);
            this.state = 1081;
            this.match(Stage10Parser.EXPORT_NS_FROM);
            this.state = 1082;
            this.match(Stage10Parser.STRING);
            this.state = 1083;
            this.match(Stage10Parser.STRING);
            this.state = 1084;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 122, Stage10Parser.RULE_exportTypeForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1086;
            this.match(Stage10Parser.LPAREN);
            this.state = 1087;
            this.match(Stage10Parser.EXPORT_TYPE);
            this.state = 1089;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 1088;
                this.exportNamePair();
                }
                }
                this.state = 1091;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2);
            this.state = 1093;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 124, Stage10Parser.RULE_exportTypeFromForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1095;
            this.match(Stage10Parser.LPAREN);
            this.state = 1096;
            this.match(Stage10Parser.EXPORT_TYPE_FROM);
            this.state = 1097;
            this.match(Stage10Parser.STRING);
            this.state = 1099;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 1098;
                this.exportNamePair();
                }
                }
                this.state = 1101;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2);
            this.state = 1103;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 126, Stage10Parser.RULE_exportTypeAllFromForm);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1105;
            this.match(Stage10Parser.LPAREN);
            this.state = 1106;
            this.match(Stage10Parser.EXPORT_TYPE_ALL_FROM);
            this.state = 1107;
            this.match(Stage10Parser.STRING);
            this.state = 1108;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 128, Stage10Parser.RULE_exportDeclForm);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1110;
            this.match(Stage10Parser.LPAREN);
            this.state = 1111;
            this.match(Stage10Parser.EXPORT);
            this.state = 1112;
            this.decl();
            this.state = 1113;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 130, Stage10Parser.RULE_starBinding);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1115;
            this.match(Stage10Parser.LPAREN);
            this.state = 1116;
            this.match(Stage10Parser.IDENTIFIER);
            this.state = 1119;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 102) {
                {
                this.state = 1117;
                this.match(Stage10Parser.COLON);
                this.state = 1118;
                this.typeExpr();
                }
            }

            this.state = 1121;
            this.expression();
            this.state = 1122;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 132, Stage10Parser.RULE_singleBinding);
        let _la: number;
        try {
            this.state = 1133;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case Stage10Parser.LPAREN:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1124;
                this.match(Stage10Parser.LPAREN);
                this.state = 1125;
                this.match(Stage10Parser.IDENTIFIER);
                this.state = 1128;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 102) {
                    {
                    this.state = 1126;
                    this.match(Stage10Parser.COLON);
                    this.state = 1127;
                    this.typeExpr();
                    }
                }

                this.state = 1130;
                this.match(Stage10Parser.RPAREN);
                }
                break;
            case Stage10Parser.LBRACE:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1131;
                this.objectDestructPat();
                }
                break;
            case Stage10Parser.LBRACK:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 1132;
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
        this.enterRule(localContext, 134, Stage10Parser.RULE_objectDestructPat);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1135;
            this.match(Stage10Parser.LBRACE);
            this.state = 1139;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 174) {
                {
                {
                this.state = 1136;
                this.match(Stage10Parser.IDENTIFIER);
                }
                }
                this.state = 1141;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1142;
            this.match(Stage10Parser.RBRACE);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 136, Stage10Parser.RULE_arrayDestructPat);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1144;
            this.match(Stage10Parser.LBRACK);
            this.state = 1148;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 174) {
                {
                {
                this.state = 1145;
                this.match(Stage10Parser.IDENTIFIER);
                }
                }
                this.state = 1150;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1151;
            this.match(Stage10Parser.RBRACK);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 138, Stage10Parser.RULE_typeExpr);
        try {
            this.state = 1174;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 80, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1153;
                this.match(Stage10Parser.IDENTIFIER);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1154;
                this.match(Stage10Parser.NULL);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 1155;
                this.match(Stage10Parser.UNDEFINED);
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 1156;
                this.match(Stage10Parser.OBJECT);
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 1157;
                this.match(Stage10Parser.LBRACE);
                this.state = 1158;
                this.match(Stage10Parser.RBRACE);
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 1159;
                this.typeUnion();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 1160;
                this.typeIntersection();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 1161;
                this.typeArray();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 1162;
                this.typeTuple();
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 1163;
                this.typeFunction();
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 1164;
                this.typeObject();
                }
                break;
            case 12:
                this.enterOuterAlt(localContext, 12);
                {
                this.state = 1165;
                this.typeLiteral();
                }
                break;
            case 13:
                this.enterOuterAlt(localContext, 13);
                {
                this.state = 1166;
                this.typeKeyof();
                }
                break;
            case 14:
                this.enterOuterAlt(localContext, 14);
                {
                this.state = 1167;
                this.typeTypeof();
                }
                break;
            case 15:
                this.enterOuterAlt(localContext, 15);
                {
                this.state = 1168;
                this.typeIndexAccess();
                }
                break;
            case 16:
                this.enterOuterAlt(localContext, 16);
                {
                this.state = 1169;
                this.typeConditional();
                }
                break;
            case 17:
                this.enterOuterAlt(localContext, 17);
                {
                this.state = 1170;
                this.typeInfer();
                }
                break;
            case 18:
                this.enterOuterAlt(localContext, 18);
                {
                this.state = 1171;
                this.typeMapped();
                }
                break;
            case 19:
                this.enterOuterAlt(localContext, 19);
                {
                this.state = 1172;
                this.typeTemplateLiteral();
                }
                break;
            case 20:
                this.enterOuterAlt(localContext, 20);
                {
                this.state = 1173;
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
        this.enterRule(localContext, 140, Stage10Parser.RULE_typeUnion);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1176;
            this.match(Stage10Parser.LPAREN);
            this.state = 1177;
            this.match(Stage10Parser.UNION);
            this.state = 1179;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 1178;
                this.typeExpr();
                }
                }
                this.state = 1181;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 33 || _la === 100 || _la === 101 || _la === 142 || _la === 174);
            this.state = 1183;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 142, Stage10Parser.RULE_typeIntersection);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1185;
            this.match(Stage10Parser.LPAREN);
            this.state = 1186;
            this.match(Stage10Parser.INTERSECT);
            this.state = 1188;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 1187;
                this.typeExpr();
                }
                }
                this.state = 1190;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 33 || _la === 100 || _la === 101 || _la === 142 || _la === 174);
            this.state = 1192;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 144, Stage10Parser.RULE_typeArray);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1194;
            this.match(Stage10Parser.LPAREN);
            this.state = 1195;
            this.match(Stage10Parser.TYPE_ARRAY);
            this.state = 1196;
            this.typeExpr();
            this.state = 1197;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 146, Stage10Parser.RULE_typeTuple);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1199;
            this.match(Stage10Parser.LPAREN);
            this.state = 1200;
            this.match(Stage10Parser.TUPLE);
            this.state = 1202;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 1201;
                this.typeTupleElement();
                }
                }
                this.state = 1204;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 33 || _la === 100 || _la === 101 || _la === 142 || _la === 174);
            this.state = 1206;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 148, Stage10Parser.RULE_typeTupleElement);
        try {
            this.state = 1219;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 84, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1208;
                this.match(Stage10Parser.LPAREN);
                this.state = 1209;
                this.match(Stage10Parser.REST);
                this.state = 1210;
                this.typeExpr();
                this.state = 1211;
                this.match(Stage10Parser.RPAREN);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1213;
                this.match(Stage10Parser.LPAREN);
                this.state = 1214;
                this.match(Stage10Parser.IDENTIFIER);
                this.state = 1215;
                this.typeExpr();
                this.state = 1216;
                this.match(Stage10Parser.RPAREN);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 1218;
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
        this.enterRule(localContext, 150, Stage10Parser.RULE_typeFunction);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1221;
            this.match(Stage10Parser.LPAREN);
            this.state = 1222;
            this.match(Stage10Parser.TYPEFN);
            this.state = 1224;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 85, this.context) ) {
            case 1:
                {
                this.state = 1223;
                this.typeParams();
                }
                break;
            }
            this.state = 1226;
            this.match(Stage10Parser.LPAREN);
            this.state = 1230;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 1227;
                this.typeFnParam();
                }
                }
                this.state = 1232;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1233;
            this.match(Stage10Parser.RPAREN);
            this.state = 1234;
            this.typeExpr();
            this.state = 1235;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 152, Stage10Parser.RULE_typeFnParam);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1237;
            this.match(Stage10Parser.LPAREN);
            this.state = 1238;
            this.match(Stage10Parser.IDENTIFIER);
            this.state = 1240;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 98) {
                {
                this.state = 1239;
                this.match(Stage10Parser.OPTIONAL);
                }
            }

            this.state = 1242;
            this.typeExpr();
            this.state = 1243;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 154, Stage10Parser.RULE_typeObject);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1245;
            this.match(Stage10Parser.LPAREN);
            this.state = 1246;
            this.match(Stage10Parser.IDENTIFIER);
            this.state = 1250;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 1247;
                this.typeProp();
                }
                }
                this.state = 1252;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1253;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 156, Stage10Parser.RULE_typeProp);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1255;
            this.match(Stage10Parser.LPAREN);
            this.state = 1259;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 88) {
                {
                {
                this.state = 1256;
                this.propModifier();
                }
                }
                this.state = 1261;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1262;
            this.match(Stage10Parser.IDENTIFIER);
            this.state = 1264;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 98) {
                {
                this.state = 1263;
                this.match(Stage10Parser.OPTIONAL);
                }
            }

            this.state = 1266;
            this.typeExpr();
            this.state = 1267;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 158, Stage10Parser.RULE_propModifier);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1269;
            this.match(Stage10Parser.READONLY);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 160, Stage10Parser.RULE_typeLiteral);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1271;
            this.match(Stage10Parser.LPAREN);
            this.state = 1272;
            this.match(Stage10Parser.LIT);
            this.state = 1273;
            _la = this.tokenStream.LA(1);
            if(!(_la === 99 || _la === 167 || _la === 168)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 1274;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 162, Stage10Parser.RULE_typeKeyof);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1276;
            this.match(Stage10Parser.LPAREN);
            this.state = 1277;
            this.match(Stage10Parser.KEYOF);
            this.state = 1278;
            this.typeExpr();
            this.state = 1279;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 164, Stage10Parser.RULE_typeTypeof);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1281;
            this.match(Stage10Parser.LPAREN);
            this.state = 1282;
            this.match(Stage10Parser.TYPEOF);
            this.state = 1283;
            this.match(Stage10Parser.IDENTIFIER);
            this.state = 1284;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 166, Stage10Parser.RULE_typeIndexAccess);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1286;
            this.match(Stage10Parser.LPAREN);
            this.state = 1287;
            this.match(Stage10Parser.INDEX);
            this.state = 1288;
            this.typeExpr();
            this.state = 1289;
            this.typeExpr();
            this.state = 1290;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 168, Stage10Parser.RULE_typeConditional);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1292;
            this.match(Stage10Parser.LPAREN);
            this.state = 1293;
            this.match(Stage10Parser.COND);
            this.state = 1294;
            this.typeExpr();
            this.state = 1295;
            this.typeExpr();
            this.state = 1296;
            this.typeExpr();
            this.state = 1297;
            this.typeExpr();
            this.state = 1298;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 170, Stage10Parser.RULE_typeInfer);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1300;
            this.match(Stage10Parser.LPAREN);
            this.state = 1301;
            this.match(Stage10Parser.INFER);
            this.state = 1302;
            this.match(Stage10Parser.IDENTIFIER);
            this.state = 1303;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 172, Stage10Parser.RULE_typeMapped);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1305;
            this.match(Stage10Parser.LPAREN);
            this.state = 1306;
            this.match(Stage10Parser.MAPPED);
            this.state = 1307;
            this.match(Stage10Parser.IDENTIFIER);
            this.state = 1308;
            this.typeExpr();
            this.state = 1310;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 91, this.context) ) {
            case 1:
                {
                this.state = 1309;
                this.mappedModifiers();
                }
                break;
            }
            this.state = 1312;
            this.typeExpr();
            this.state = 1313;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 174, Stage10Parser.RULE_mappedModifiers);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1315;
            this.match(Stage10Parser.LPAREN);
            this.state = 1316;
            this.match(Stage10Parser.MODIFIERS);
            this.state = 1318;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 1317;
                this.mappedModifier();
                }
                }
                this.state = 1320;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 88 || _la === 98);
            this.state = 1322;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 176, Stage10Parser.RULE_mappedModifier);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1324;
            _la = this.tokenStream.LA(1);
            if(!(_la === 88 || _la === 98)) {
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
        this.enterRule(localContext, 178, Stage10Parser.RULE_typeTemplateLiteral);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1326;
            this.match(Stage10Parser.LPAREN);
            this.state = 1327;
            this.match(Stage10Parser.TYPE_TEMPLATE);
            this.state = 1329;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 1328;
                this.templatePart();
                }
                }
                this.state = 1331;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 33 || _la === 100 || _la === 101 || _la === 142 || _la === 168 || _la === 174);
            this.state = 1333;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 180, Stage10Parser.RULE_templatePart);
        try {
            this.state = 1337;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case Stage10Parser.STRING:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1335;
                this.match(Stage10Parser.STRING);
                }
                break;
            case Stage10Parser.LPAREN:
            case Stage10Parser.OBJECT:
            case Stage10Parser.NULL:
            case Stage10Parser.UNDEFINED:
            case Stage10Parser.LBRACE:
            case Stage10Parser.IDENTIFIER:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1336;
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
        this.enterRule(localContext, 182, Stage10Parser.RULE_typeApplication);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1339;
            this.match(Stage10Parser.LPAREN);
            this.state = 1340;
            this.match(Stage10Parser.TYPE_APP);
            this.state = 1341;
            this.typeExpr();
            this.state = 1343;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 1342;
                this.typeExpr();
                }
                }
                this.state = 1345;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 33 || _la === 100 || _la === 101 || _la === 142 || _la === 174);
            this.state = 1347;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 184, Stage10Parser.RULE_typeParams);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1349;
            this.match(Stage10Parser.LPAREN);
            this.state = 1350;
            this.match(Stage10Parser.TYPE_PARAMS);
            this.state = 1352;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 1351;
                this.typeParamDecl();
                }
                }
                this.state = 1354;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2);
            this.state = 1356;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 186, Stage10Parser.RULE_typeParamDecl);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1358;
            this.match(Stage10Parser.LPAREN);
            this.state = 1359;
            this.match(Stage10Parser.IDENTIFIER);
            this.state = 1361;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 97, this.context) ) {
            case 1:
                {
                this.state = 1360;
                this.typeParamConstraint();
                }
                break;
            }
            this.state = 1364;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2) {
                {
                this.state = 1363;
                this.typeParamDefault();
                }
            }

            this.state = 1366;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 188, Stage10Parser.RULE_typeParamConstraint);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1368;
            this.match(Stage10Parser.LPAREN);
            this.state = 1369;
            this.match(Stage10Parser.EXTENDS);
            this.state = 1370;
            this.typeExpr();
            this.state = 1371;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 190, Stage10Parser.RULE_typeParamDefault);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1373;
            this.match(Stage10Parser.LPAREN);
            this.state = 1374;
            this.match(Stage10Parser.DEFAULT);
            this.state = 1375;
            this.typeExpr();
            this.state = 1376;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 192, Stage10Parser.RULE_assign);
        try {
            this.state = 1396;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 99, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1378;
                this.match(Stage10Parser.LPAREN);
                this.state = 1379;
                this.match(Stage10Parser.SET);
                this.state = 1380;
                this.match(Stage10Parser.IDENTIFIER);
                this.state = 1381;
                this.expression();
                this.state = 1382;
                this.match(Stage10Parser.RPAREN);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1384;
                this.match(Stage10Parser.LPAREN);
                this.state = 1385;
                this.match(Stage10Parser.SET);
                this.state = 1386;
                this.propAccess();
                this.state = 1387;
                this.expression();
                this.state = 1388;
                this.match(Stage10Parser.RPAREN);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 1390;
                this.match(Stage10Parser.LPAREN);
                this.state = 1391;
                this.match(Stage10Parser.SET);
                this.state = 1392;
                this.indexAccess();
                this.state = 1393;
                this.expression();
                this.state = 1394;
                this.match(Stage10Parser.RPAREN);
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
        this.enterRule(localContext, 194, Stage10Parser.RULE_compoundAssign);
        try {
            this.state = 1428;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 100, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1398;
                this.match(Stage10Parser.LPAREN);
                this.state = 1399;
                this.match(Stage10Parser.PLUS_ASSIGN);
                this.state = 1400;
                this.match(Stage10Parser.IDENTIFIER);
                this.state = 1401;
                this.expression();
                this.state = 1402;
                this.match(Stage10Parser.RPAREN);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1404;
                this.match(Stage10Parser.LPAREN);
                this.state = 1405;
                this.match(Stage10Parser.MINUS_ASSIGN);
                this.state = 1406;
                this.match(Stage10Parser.IDENTIFIER);
                this.state = 1407;
                this.expression();
                this.state = 1408;
                this.match(Stage10Parser.RPAREN);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 1410;
                this.match(Stage10Parser.LPAREN);
                this.state = 1411;
                this.match(Stage10Parser.TIMES_ASSIGN);
                this.state = 1412;
                this.match(Stage10Parser.IDENTIFIER);
                this.state = 1413;
                this.expression();
                this.state = 1414;
                this.match(Stage10Parser.RPAREN);
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 1416;
                this.match(Stage10Parser.LPAREN);
                this.state = 1417;
                this.match(Stage10Parser.DIV_ASSIGN);
                this.state = 1418;
                this.match(Stage10Parser.IDENTIFIER);
                this.state = 1419;
                this.expression();
                this.state = 1420;
                this.match(Stage10Parser.RPAREN);
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 1422;
                this.match(Stage10Parser.LPAREN);
                this.state = 1423;
                this.match(Stage10Parser.MOD_ASSIGN);
                this.state = 1424;
                this.match(Stage10Parser.IDENTIFIER);
                this.state = 1425;
                this.expression();
                this.state = 1426;
                this.match(Stage10Parser.RPAREN);
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
        this.enterRule(localContext, 196, Stage10Parser.RULE_subscriptAssign);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1430;
            this.match(Stage10Parser.LPAREN);
            this.state = 1431;
            this.expression();
            this.state = 1432;
            this.match(Stage10Parser.LBRACK);
            this.state = 1433;
            this.expression();
            this.state = 1434;
            this.match(Stage10Parser.RBRACK);
            this.state = 1435;
            this.match(Stage10Parser.EQUALS);
            this.state = 1436;
            this.expression();
            this.state = 1437;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 198, Stage10Parser.RULE_switchForm);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1439;
            this.match(Stage10Parser.LPAREN);
            this.state = 1440;
            this.match(Stage10Parser.SWITCH);
            this.state = 1441;
            this.expression();
            this.state = 1445;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 101, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 1442;
                    this.caseClause();
                    }
                    }
                }
                this.state = 1447;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 101, this.context);
            }
            this.state = 1449;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2) {
                {
                this.state = 1448;
                this.defaultClause();
                }
            }

            this.state = 1451;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 200, Stage10Parser.RULE_caseClause);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1453;
            this.match(Stage10Parser.LPAREN);
            this.state = 1454;
            this.match(Stage10Parser.CASE);
            this.state = 1455;
            this.expression();
            this.state = 1459;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 22 || ((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 402653185) !== 0) || ((((_la - 99)) & ~0x1F) === 0 && ((1 << (_la - 99)) & 3892445191) !== 0) || ((((_la - 131)) & ~0x1F) === 0 && ((1 << (_la - 131)) & 67103751) !== 0) || ((((_la - 167)) & ~0x1F) === 0 && ((1 << (_la - 167)) & 251) !== 0)) {
                {
                {
                this.state = 1456;
                this.statement();
                }
                }
                this.state = 1461;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1462;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 202, Stage10Parser.RULE_defaultClause);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1464;
            this.match(Stage10Parser.LPAREN);
            this.state = 1465;
            this.match(Stage10Parser.DEFAULT);
            this.state = 1469;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 22 || ((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 402653185) !== 0) || ((((_la - 99)) & ~0x1F) === 0 && ((1 << (_la - 99)) & 3892445191) !== 0) || ((((_la - 131)) & ~0x1F) === 0 && ((1 << (_la - 131)) & 67103751) !== 0) || ((((_la - 167)) & ~0x1F) === 0 && ((1 << (_la - 167)) & 251) !== 0)) {
                {
                {
                this.state = 1466;
                this.statement();
                }
                }
                this.state = 1471;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1472;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 204, Stage10Parser.RULE_forForm);
        let _la: number;
        try {
            this.state = 1503;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 107, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1474;
                this.match(Stage10Parser.LPAREN);
                this.state = 1475;
                this.match(Stage10Parser.FOR);
                this.state = 1476;
                this.letStmt();
                this.state = 1477;
                this.expression();
                this.state = 1478;
                this.assign();
                this.state = 1482;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 2 || _la === 22 || ((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 402653185) !== 0) || ((((_la - 99)) & ~0x1F) === 0 && ((1 << (_la - 99)) & 3892445191) !== 0) || ((((_la - 131)) & ~0x1F) === 0 && ((1 << (_la - 131)) & 67103751) !== 0) || ((((_la - 167)) & ~0x1F) === 0 && ((1 << (_la - 167)) & 251) !== 0)) {
                    {
                    {
                    this.state = 1479;
                    this.statement();
                    }
                    }
                    this.state = 1484;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 1485;
                this.match(Stage10Parser.RPAREN);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1487;
                this.match(Stage10Parser.LPAREN);
                this.state = 1488;
                this.match(Stage10Parser.FOR);
                this.state = 1489;
                this.match(Stage10Parser.LPAREN);
                this.state = 1490;
                this.match(Stage10Parser.IDENTIFIER);
                this.state = 1491;
                this.expression();
                this.state = 1492;
                this.match(Stage10Parser.RPAREN);
                this.state = 1493;
                this.expression();
                this.state = 1494;
                this.expression();
                this.state = 1498;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 2 || _la === 22 || ((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 402653185) !== 0) || ((((_la - 99)) & ~0x1F) === 0 && ((1 << (_la - 99)) & 3892445191) !== 0) || ((((_la - 131)) & ~0x1F) === 0 && ((1 << (_la - 131)) & 67103751) !== 0) || ((((_la - 167)) & ~0x1F) === 0 && ((1 << (_la - 167)) & 251) !== 0)) {
                    {
                    {
                    this.state = 1495;
                    this.statement();
                    }
                    }
                    this.state = 1500;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 1501;
                this.match(Stage10Parser.RPAREN);
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
        this.enterRule(localContext, 206, Stage10Parser.RULE_forInForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1505;
            this.match(Stage10Parser.LPAREN);
            this.state = 1506;
            this.match(Stage10Parser.FORIN);
            this.state = 1507;
            this.match(Stage10Parser.IDENTIFIER);
            this.state = 1508;
            this.expression();
            this.state = 1512;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 22 || ((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 402653185) !== 0) || ((((_la - 99)) & ~0x1F) === 0 && ((1 << (_la - 99)) & 3892445191) !== 0) || ((((_la - 131)) & ~0x1F) === 0 && ((1 << (_la - 131)) & 67103751) !== 0) || ((((_la - 167)) & ~0x1F) === 0 && ((1 << (_la - 167)) & 251) !== 0)) {
                {
                {
                this.state = 1509;
                this.statement();
                }
                }
                this.state = 1514;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1515;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 208, Stage10Parser.RULE_forOfForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1517;
            this.match(Stage10Parser.LPAREN);
            this.state = 1518;
            this.match(Stage10Parser.FOROF);
            this.state = 1519;
            this.match(Stage10Parser.IDENTIFIER);
            this.state = 1520;
            this.expression();
            this.state = 1524;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 22 || ((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 402653185) !== 0) || ((((_la - 99)) & ~0x1F) === 0 && ((1 << (_la - 99)) & 3892445191) !== 0) || ((((_la - 131)) & ~0x1F) === 0 && ((1 << (_la - 131)) & 67103751) !== 0) || ((((_la - 167)) & ~0x1F) === 0 && ((1 << (_la - 167)) & 251) !== 0)) {
                {
                {
                this.state = 1521;
                this.statement();
                }
                }
                this.state = 1526;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1527;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 210, Stage10Parser.RULE_forAwaitForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1529;
            this.match(Stage10Parser.LPAREN);
            this.state = 1530;
            this.match(Stage10Parser.FORAWAIT);
            this.state = 1531;
            this.match(Stage10Parser.IDENTIFIER);
            this.state = 1532;
            this.expression();
            this.state = 1536;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 22 || ((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 402653185) !== 0) || ((((_la - 99)) & ~0x1F) === 0 && ((1 << (_la - 99)) & 3892445191) !== 0) || ((((_la - 131)) & ~0x1F) === 0 && ((1 << (_la - 131)) & 67103751) !== 0) || ((((_la - 167)) & ~0x1F) === 0 && ((1 << (_la - 167)) & 251) !== 0)) {
                {
                {
                this.state = 1533;
                this.statement();
                }
                }
                this.state = 1538;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1539;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 212, Stage10Parser.RULE_exceptForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1541;
            this.match(Stage10Parser.LPAREN);
            this.state = 1542;
            this.match(Stage10Parser.EXCEPT);
            this.state = 1543;
            this.tryClause();
            this.state = 1545;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 111, this.context) ) {
            case 1:
                {
                this.state = 1544;
                this.catchClause();
                }
                break;
            }
            this.state = 1548;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2) {
                {
                this.state = 1547;
                this.finallyClause();
                }
            }

            this.state = 1550;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 214, Stage10Parser.RULE_tryClause);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1552;
            this.match(Stage10Parser.LPAREN);
            this.state = 1553;
            this.match(Stage10Parser.TRY);
            this.state = 1557;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 22 || ((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 402653185) !== 0) || ((((_la - 99)) & ~0x1F) === 0 && ((1 << (_la - 99)) & 3892445191) !== 0) || ((((_la - 131)) & ~0x1F) === 0 && ((1 << (_la - 131)) & 67103751) !== 0) || ((((_la - 167)) & ~0x1F) === 0 && ((1 << (_la - 167)) & 251) !== 0)) {
                {
                {
                this.state = 1554;
                this.statement();
                }
                }
                this.state = 1559;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1560;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 216, Stage10Parser.RULE_catchClause);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1562;
            this.match(Stage10Parser.LPAREN);
            this.state = 1563;
            this.match(Stage10Parser.CATCH);
            this.state = 1564;
            this.match(Stage10Parser.IDENTIFIER);
            this.state = 1568;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 22 || ((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 402653185) !== 0) || ((((_la - 99)) & ~0x1F) === 0 && ((1 << (_la - 99)) & 3892445191) !== 0) || ((((_la - 131)) & ~0x1F) === 0 && ((1 << (_la - 131)) & 67103751) !== 0) || ((((_la - 167)) & ~0x1F) === 0 && ((1 << (_la - 167)) & 251) !== 0)) {
                {
                {
                this.state = 1565;
                this.statement();
                }
                }
                this.state = 1570;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1571;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 218, Stage10Parser.RULE_finallyClause);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1573;
            this.match(Stage10Parser.LPAREN);
            this.state = 1574;
            this.match(Stage10Parser.FINALLY);
            this.state = 1578;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 22 || ((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 402653185) !== 0) || ((((_la - 99)) & ~0x1F) === 0 && ((1 << (_la - 99)) & 3892445191) !== 0) || ((((_la - 131)) & ~0x1F) === 0 && ((1 << (_la - 131)) & 67103751) !== 0) || ((((_la - 167)) & ~0x1F) === 0 && ((1 << (_la - 167)) & 251) !== 0)) {
                {
                {
                this.state = 1575;
                this.statement();
                }
                }
                this.state = 1580;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1581;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 220, Stage10Parser.RULE_expression);
        try {
            this.state = 1635;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 116, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1583;
                this.literal();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1584;
                this.match(Stage10Parser.IDENTIFIER);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 1585;
                this.match(Stage10Parser.MACRO_ERROR);
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 1586;
                this.match(Stage10Parser.MINUS);
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 1587;
                this.lambda();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 1588;
                this.fn();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 1589;
                this.asyncLambda();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 1590;
                this.asyncFn();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 1591;
                this.generatorFn();
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 1592;
                this.asyncGeneratorFn();
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 1593;
                this.fnO();
                }
                break;
            case 12:
                this.enterOuterAlt(localContext, 12);
                {
                this.state = 1594;
                this.lambdaO();
                }
                break;
            case 13:
                this.enterOuterAlt(localContext, 13);
                {
                this.state = 1595;
                this.asyncFnO();
                }
                break;
            case 14:
                this.enterOuterAlt(localContext, 14);
                {
                this.state = 1596;
                this.asyncLambdaO();
                }
                break;
            case 15:
                this.enterOuterAlt(localContext, 15);
                {
                this.state = 1597;
                this.generatorFnO();
                }
                break;
            case 16:
                this.enterOuterAlt(localContext, 16);
                {
                this.state = 1598;
                this.asyncGeneratorFnO();
                }
                break;
            case 17:
                this.enterOuterAlt(localContext, 17);
                {
                this.state = 1599;
                this.awaitExpr();
                }
                break;
            case 18:
                this.enterOuterAlt(localContext, 18);
                {
                this.state = 1600;
                this.yieldExpr();
                }
                break;
            case 19:
                this.enterOuterAlt(localContext, 19);
                {
                this.state = 1601;
                this.yieldStarExpr();
                }
                break;
            case 20:
                this.enterOuterAlt(localContext, 20);
                {
                this.state = 1602;
                this.bindExpr();
                }
                break;
            case 21:
                this.enterOuterAlt(localContext, 21);
                {
                this.state = 1603;
                this.methodCallExpr();
                }
                break;
            case 22:
                this.enterOuterAlt(localContext, 22);
                {
                this.state = 1604;
                this.objectExpr();
                }
                break;
            case 23:
                this.enterOuterAlt(localContext, 23);
                {
                this.state = 1605;
                this.braceObjectExpr();
                }
                break;
            case 24:
                this.enterOuterAlt(localContext, 24);
                {
                this.state = 1606;
                this.arrayExpr();
                }
                break;
            case 25:
                this.enterOuterAlt(localContext, 25);
                {
                this.state = 1607;
                this.bracketArrayExpr();
                }
                break;
            case 26:
                this.enterOuterAlt(localContext, 26);
                {
                this.state = 1608;
                this.propAccess();
                }
                break;
            case 27:
                this.enterOuterAlt(localContext, 27);
                {
                this.state = 1609;
                this.indexAccess();
                }
                break;
            case 28:
                this.enterOuterAlt(localContext, 28);
                {
                this.state = 1610;
                this.subscriptAccess();
                }
                break;
            case 29:
                this.enterOuterAlt(localContext, 29);
                {
                this.state = 1611;
                this.quasiquote();
                }
                break;
            case 30:
                this.enterOuterAlt(localContext, 30);
                {
                this.state = 1612;
                this.unquote();
                }
                break;
            case 31:
                this.enterOuterAlt(localContext, 31);
                {
                this.state = 1613;
                this.unquoteSplicing();
                }
                break;
            case 32:
                this.enterOuterAlt(localContext, 32);
                {
                this.state = 1614;
                this.tildeUnquote();
                }
                break;
            case 33:
                this.enterOuterAlt(localContext, 33);
                {
                this.state = 1615;
                this.tildeUnquoteSplice();
                }
                break;
            case 34:
                this.enterOuterAlt(localContext, 34);
                {
                this.state = 1616;
                this.ternary();
                }
                break;
            case 35:
                this.enterOuterAlt(localContext, 35);
                {
                this.state = 1617;
                this.condExpr();
                }
                break;
            case 36:
                this.enterOuterAlt(localContext, 36);
                {
                this.state = 1618;
                this.newForm();
                }
                break;
            case 37:
                this.enterOuterAlt(localContext, 37);
                {
                this.state = 1619;
                this.optChain();
                }
                break;
            case 38:
                this.enterOuterAlt(localContext, 38);
                {
                this.state = 1620;
                this.optChainIndex();
                }
                break;
            case 39:
                this.enterOuterAlt(localContext, 39);
                {
                this.state = 1621;
                this.nullCoalesce();
                }
                break;
            case 40:
                this.enterOuterAlt(localContext, 40);
                {
                this.state = 1622;
                this.typeofExpr();
                }
                break;
            case 41:
                this.enterOuterAlt(localContext, 41);
                {
                this.state = 1623;
                this.typeAssert();
                }
                break;
            case 42:
                this.enterOuterAlt(localContext, 42);
                {
                this.state = 1624;
                this.templateExpr();
                }
                break;
            case 43:
                this.enterOuterAlt(localContext, 43);
                {
                this.state = 1625;
                this.thisExpr();
                }
                break;
            case 44:
                this.enterOuterAlt(localContext, 44);
                {
                this.state = 1626;
                this.superExpr();
                }
                break;
            case 45:
                this.enterOuterAlt(localContext, 45);
                {
                this.state = 1627;
                this.superConstructorCall();
                }
                break;
            case 46:
                this.enterOuterAlt(localContext, 46);
                {
                this.state = 1628;
                this.superMethodCall();
                }
                break;
            case 47:
                this.enterOuterAlt(localContext, 47);
                {
                this.state = 1629;
                this.infixExpr();
                }
                break;
            case 48:
                this.enterOuterAlt(localContext, 48);
                {
                this.state = 1630;
                this.iifeForm();
                }
                break;
            case 49:
                this.enterOuterAlt(localContext, 49);
                {
                this.state = 1631;
                this.iifeAsyncForm();
                }
                break;
            case 50:
                this.enterOuterAlt(localContext, 50);
                {
                this.state = 1632;
                this.macroExprCall();
                }
                break;
            case 51:
                this.enterOuterAlt(localContext, 51);
                {
                this.state = 1633;
                this.opSymbol();
                }
                break;
            case 52:
                this.enterOuterAlt(localContext, 52);
                {
                this.state = 1634;
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
        this.enterRule(localContext, 222, Stage10Parser.RULE_thisExpr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1637;
            this.match(Stage10Parser.THIS);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 224, Stage10Parser.RULE_superExpr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1639;
            this.match(Stage10Parser.SUPER);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 226, Stage10Parser.RULE_superConstructorCall);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1641;
            this.match(Stage10Parser.LPAREN);
            this.state = 1642;
            this.match(Stage10Parser.SUPER);
            this.state = 1646;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 22 || ((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 402653185) !== 0) || ((((_la - 99)) & ~0x1F) === 0 && ((1 << (_la - 99)) & 3892445191) !== 0) || ((((_la - 131)) & ~0x1F) === 0 && ((1 << (_la - 131)) & 67103751) !== 0) || ((((_la - 167)) & ~0x1F) === 0 && ((1 << (_la - 167)) & 251) !== 0)) {
                {
                {
                this.state = 1643;
                this.expression();
                }
                }
                this.state = 1648;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1649;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 228, Stage10Parser.RULE_superMethodCall);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1651;
            this.match(Stage10Parser.LPAREN);
            this.state = 1652;
            this.match(Stage10Parser.SUPER_METHOD);
            this.state = 1653;
            this.match(Stage10Parser.IDENTIFIER);
            this.state = 1657;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 22 || ((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 402653185) !== 0) || ((((_la - 99)) & ~0x1F) === 0 && ((1 << (_la - 99)) & 3892445191) !== 0) || ((((_la - 131)) & ~0x1F) === 0 && ((1 << (_la - 131)) & 67103751) !== 0) || ((((_la - 167)) & ~0x1F) === 0 && ((1 << (_la - 167)) & 251) !== 0)) {
                {
                {
                this.state = 1654;
                this.expression();
                }
                }
                this.state = 1659;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1660;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 230, Stage10Parser.RULE_typeofExpr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1662;
            this.match(Stage10Parser.LPAREN);
            this.state = 1663;
            this.match(Stage10Parser.TYPEOF);
            this.state = 1664;
            this.expression();
            this.state = 1665;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 232, Stage10Parser.RULE_typeAssert);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1667;
            this.match(Stage10Parser.LPAREN);
            this.state = 1668;
            this.match(Stage10Parser.TYPE_AS);
            this.state = 1669;
            this.expression();
            this.state = 1670;
            this.typeExpr();
            this.state = 1671;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 234, Stage10Parser.RULE_lambda);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1673;
            this.match(Stage10Parser.LPAREN);
            this.state = 1674;
            this.match(Stage10Parser.LAMBDA);
            this.state = 1675;
            this.fnSignature();
            this.state = 1679;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 22 || ((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 402653185) !== 0) || ((((_la - 99)) & ~0x1F) === 0 && ((1 << (_la - 99)) & 3892445191) !== 0) || ((((_la - 131)) & ~0x1F) === 0 && ((1 << (_la - 131)) & 67103751) !== 0) || ((((_la - 167)) & ~0x1F) === 0 && ((1 << (_la - 167)) & 251) !== 0)) {
                {
                {
                this.state = 1676;
                this.statement();
                }
                }
                this.state = 1681;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1682;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 236, Stage10Parser.RULE_fn);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1684;
            this.match(Stage10Parser.LPAREN);
            this.state = 1685;
            this.match(Stage10Parser.FN);
            this.state = 1687;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 174) {
                {
                this.state = 1686;
                this.match(Stage10Parser.IDENTIFIER);
                }
            }

            this.state = 1689;
            this.fnSignature();
            this.state = 1693;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 22 || ((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 402653185) !== 0) || ((((_la - 99)) & ~0x1F) === 0 && ((1 << (_la - 99)) & 3892445191) !== 0) || ((((_la - 131)) & ~0x1F) === 0 && ((1 << (_la - 131)) & 67103751) !== 0) || ((((_la - 167)) & ~0x1F) === 0 && ((1 << (_la - 167)) & 251) !== 0)) {
                {
                {
                this.state = 1690;
                this.statement();
                }
                }
                this.state = 1695;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1696;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 238, Stage10Parser.RULE_asyncLambda);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1698;
            this.match(Stage10Parser.LPAREN);
            this.state = 1699;
            this.match(Stage10Parser.ASYNC_LAMBDA);
            this.state = 1700;
            this.fnSignature();
            this.state = 1704;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 22 || ((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 402653185) !== 0) || ((((_la - 99)) & ~0x1F) === 0 && ((1 << (_la - 99)) & 3892445191) !== 0) || ((((_la - 131)) & ~0x1F) === 0 && ((1 << (_la - 131)) & 67103751) !== 0) || ((((_la - 167)) & ~0x1F) === 0 && ((1 << (_la - 167)) & 251) !== 0)) {
                {
                {
                this.state = 1701;
                this.statement();
                }
                }
                this.state = 1706;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1707;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 240, Stage10Parser.RULE_asyncFn);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1709;
            this.match(Stage10Parser.LPAREN);
            this.state = 1710;
            this.match(Stage10Parser.ASYNC_FN);
            this.state = 1711;
            this.fnSignature();
            this.state = 1715;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 22 || ((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 402653185) !== 0) || ((((_la - 99)) & ~0x1F) === 0 && ((1 << (_la - 99)) & 3892445191) !== 0) || ((((_la - 131)) & ~0x1F) === 0 && ((1 << (_la - 131)) & 67103751) !== 0) || ((((_la - 167)) & ~0x1F) === 0 && ((1 << (_la - 167)) & 251) !== 0)) {
                {
                {
                this.state = 1712;
                this.statement();
                }
                }
                this.state = 1717;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1718;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 242, Stage10Parser.RULE_generatorFn);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1720;
            this.match(Stage10Parser.LPAREN);
            this.state = 1721;
            this.match(Stage10Parser.GENERATOR_FN);
            this.state = 1722;
            this.fnSignature();
            this.state = 1726;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 22 || ((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 402653185) !== 0) || ((((_la - 99)) & ~0x1F) === 0 && ((1 << (_la - 99)) & 3892445191) !== 0) || ((((_la - 131)) & ~0x1F) === 0 && ((1 << (_la - 131)) & 67103751) !== 0) || ((((_la - 167)) & ~0x1F) === 0 && ((1 << (_la - 167)) & 251) !== 0)) {
                {
                {
                this.state = 1723;
                this.statement();
                }
                }
                this.state = 1728;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1729;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 244, Stage10Parser.RULE_asyncGeneratorFn);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1731;
            this.match(Stage10Parser.LPAREN);
            this.state = 1732;
            this.match(Stage10Parser.ASYNC_GENERATOR_FN);
            this.state = 1733;
            this.fnSignature();
            this.state = 1737;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 22 || ((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 402653185) !== 0) || ((((_la - 99)) & ~0x1F) === 0 && ((1 << (_la - 99)) & 3892445191) !== 0) || ((((_la - 131)) & ~0x1F) === 0 && ((1 << (_la - 131)) & 67103751) !== 0) || ((((_la - 167)) & ~0x1F) === 0 && ((1 << (_la - 167)) & 251) !== 0)) {
                {
                {
                this.state = 1734;
                this.statement();
                }
                }
                this.state = 1739;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1740;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public iifeForm(): IifeFormContext {
        let localContext = new IifeFormContext(this.context, this.state);
        this.enterRule(localContext, 246, Stage10Parser.RULE_iifeForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1742;
            this.match(Stage10Parser.LPAREN);
            this.state = 1743;
            this.match(Stage10Parser.IIFE);
            this.state = 1747;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 22 || ((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 402653185) !== 0) || ((((_la - 99)) & ~0x1F) === 0 && ((1 << (_la - 99)) & 3892445191) !== 0) || ((((_la - 131)) & ~0x1F) === 0 && ((1 << (_la - 131)) & 67103751) !== 0) || ((((_la - 167)) & ~0x1F) === 0 && ((1 << (_la - 167)) & 251) !== 0)) {
                {
                {
                this.state = 1744;
                this.statement();
                }
                }
                this.state = 1749;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1750;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public iifeAsyncForm(): IifeAsyncFormContext {
        let localContext = new IifeAsyncFormContext(this.context, this.state);
        this.enterRule(localContext, 248, Stage10Parser.RULE_iifeAsyncForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1752;
            this.match(Stage10Parser.LPAREN);
            this.state = 1753;
            this.match(Stage10Parser.IIFE_ASYNC);
            this.state = 1757;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 22 || ((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 402653185) !== 0) || ((((_la - 99)) & ~0x1F) === 0 && ((1 << (_la - 99)) & 3892445191) !== 0) || ((((_la - 131)) & ~0x1F) === 0 && ((1 << (_la - 131)) & 67103751) !== 0) || ((((_la - 167)) & ~0x1F) === 0 && ((1 << (_la - 167)) & 251) !== 0)) {
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
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 250, Stage10Parser.RULE_fnO);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1762;
            this.match(Stage10Parser.LPAREN);
            this.state = 1763;
            this.match(Stage10Parser.FN_O);
            this.state = 1765;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 174) {
                {
                this.state = 1764;
                this.match(Stage10Parser.IDENTIFIER);
                }
            }

            this.state = 1767;
            this.fnoSignature();
            this.state = 1771;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 22 || ((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 402653185) !== 0) || ((((_la - 99)) & ~0x1F) === 0 && ((1 << (_la - 99)) & 3892445191) !== 0) || ((((_la - 131)) & ~0x1F) === 0 && ((1 << (_la - 131)) & 67103751) !== 0) || ((((_la - 167)) & ~0x1F) === 0 && ((1 << (_la - 167)) & 251) !== 0)) {
                {
                {
                this.state = 1768;
                this.statement();
                }
                }
                this.state = 1773;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1774;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 252, Stage10Parser.RULE_lambdaO);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1776;
            this.match(Stage10Parser.LPAREN);
            this.state = 1777;
            this.match(Stage10Parser.LAMBDA_O);
            this.state = 1778;
            this.fnoSignature();
            this.state = 1782;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 22 || ((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 402653185) !== 0) || ((((_la - 99)) & ~0x1F) === 0 && ((1 << (_la - 99)) & 3892445191) !== 0) || ((((_la - 131)) & ~0x1F) === 0 && ((1 << (_la - 131)) & 67103751) !== 0) || ((((_la - 167)) & ~0x1F) === 0 && ((1 << (_la - 167)) & 251) !== 0)) {
                {
                {
                this.state = 1779;
                this.statement();
                }
                }
                this.state = 1784;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1785;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 254, Stage10Parser.RULE_asyncFnO);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1787;
            this.match(Stage10Parser.LPAREN);
            this.state = 1788;
            this.match(Stage10Parser.ASYNC_FN_O);
            this.state = 1789;
            this.fnoSignature();
            this.state = 1793;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 22 || ((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 402653185) !== 0) || ((((_la - 99)) & ~0x1F) === 0 && ((1 << (_la - 99)) & 3892445191) !== 0) || ((((_la - 131)) & ~0x1F) === 0 && ((1 << (_la - 131)) & 67103751) !== 0) || ((((_la - 167)) & ~0x1F) === 0 && ((1 << (_la - 167)) & 251) !== 0)) {
                {
                {
                this.state = 1790;
                this.statement();
                }
                }
                this.state = 1795;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1796;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 256, Stage10Parser.RULE_asyncLambdaO);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1798;
            this.match(Stage10Parser.LPAREN);
            this.state = 1799;
            this.match(Stage10Parser.ASYNC_LAMBDA_O);
            this.state = 1800;
            this.fnoSignature();
            this.state = 1804;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 22 || ((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 402653185) !== 0) || ((((_la - 99)) & ~0x1F) === 0 && ((1 << (_la - 99)) & 3892445191) !== 0) || ((((_la - 131)) & ~0x1F) === 0 && ((1 << (_la - 131)) & 67103751) !== 0) || ((((_la - 167)) & ~0x1F) === 0 && ((1 << (_la - 167)) & 251) !== 0)) {
                {
                {
                this.state = 1801;
                this.statement();
                }
                }
                this.state = 1806;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1807;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 258, Stage10Parser.RULE_generatorFnO);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1809;
            this.match(Stage10Parser.LPAREN);
            this.state = 1810;
            this.match(Stage10Parser.GENERATOR_FN_O);
            this.state = 1811;
            this.fnoSignature();
            this.state = 1815;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 22 || ((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 402653185) !== 0) || ((((_la - 99)) & ~0x1F) === 0 && ((1 << (_la - 99)) & 3892445191) !== 0) || ((((_la - 131)) & ~0x1F) === 0 && ((1 << (_la - 131)) & 67103751) !== 0) || ((((_la - 167)) & ~0x1F) === 0 && ((1 << (_la - 167)) & 251) !== 0)) {
                {
                {
                this.state = 1812;
                this.statement();
                }
                }
                this.state = 1817;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1818;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 260, Stage10Parser.RULE_asyncGeneratorFnO);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1820;
            this.match(Stage10Parser.LPAREN);
            this.state = 1821;
            this.match(Stage10Parser.ASYNC_GENERATOR_FN_O);
            this.state = 1822;
            this.fnoSignature();
            this.state = 1826;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 22 || ((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 402653185) !== 0) || ((((_la - 99)) & ~0x1F) === 0 && ((1 << (_la - 99)) & 3892445191) !== 0) || ((((_la - 131)) & ~0x1F) === 0 && ((1 << (_la - 131)) & 67103751) !== 0) || ((((_la - 167)) & ~0x1F) === 0 && ((1 << (_la - 167)) & 251) !== 0)) {
                {
                {
                this.state = 1823;
                this.statement();
                }
                }
                this.state = 1828;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1829;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 262, Stage10Parser.RULE_methodO);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1831;
            this.match(Stage10Parser.LPAREN);
            this.state = 1832;
            this.match(Stage10Parser.METHOD_O);
            this.state = 1836;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 74 || _la === 88 || ((((_la - 117)) & ~0x1F) === 0 && ((1 << (_la - 117)) & 255) !== 0)) {
                {
                {
                this.state = 1833;
                this.modifier();
                }
                }
                this.state = 1838;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1839;
            this.methodKey();
            this.state = 1840;
            this.fnoSignature();
            this.state = 1844;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 22 || ((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 402653185) !== 0) || ((((_la - 99)) & ~0x1F) === 0 && ((1 << (_la - 99)) & 3892445191) !== 0) || ((((_la - 131)) & ~0x1F) === 0 && ((1 << (_la - 131)) & 67103751) !== 0) || ((((_la - 167)) & ~0x1F) === 0 && ((1 << (_la - 167)) & 251) !== 0)) {
                {
                {
                this.state = 1841;
                this.statement();
                }
                }
                this.state = 1846;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1847;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 264, Stage10Parser.RULE_abstractMethodO);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1849;
            this.match(Stage10Parser.LPAREN);
            this.state = 1850;
            this.match(Stage10Parser.ABSTRACT_METHOD_O);
            this.state = 1854;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 74 || _la === 88 || ((((_la - 117)) & ~0x1F) === 0 && ((1 << (_la - 117)) & 255) !== 0)) {
                {
                {
                this.state = 1851;
                this.modifier();
                }
                }
                this.state = 1856;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1857;
            this.methodKey();
            this.state = 1858;
            this.fnoSignature();
            this.state = 1859;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 266, Stage10Parser.RULE_constructorO);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1861;
            this.match(Stage10Parser.LPAREN);
            this.state = 1862;
            this.match(Stage10Parser.CONSTRUCTOR_O);
            this.state = 1863;
            this.fnoSignature();
            this.state = 1867;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 22 || ((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 402653185) !== 0) || ((((_la - 99)) & ~0x1F) === 0 && ((1 << (_la - 99)) & 3892445191) !== 0) || ((((_la - 131)) & ~0x1F) === 0 && ((1 << (_la - 131)) & 67103751) !== 0) || ((((_la - 167)) & ~0x1F) === 0 && ((1 << (_la - 167)) & 251) !== 0)) {
                {
                {
                this.state = 1864;
                this.statement();
                }
                }
                this.state = 1869;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1870;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 268, Stage10Parser.RULE_fnoSignature);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1872;
            this.match(Stage10Parser.LPAREN);
            {
            this.state = 1876;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 139, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 1873;
                    this.fnoParam();
                    }
                    }
                }
                this.state = 1878;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 139, this.context);
            }
            this.state = 1880;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2) {
                {
                this.state = 1879;
                this.fnoRestParam();
                }
            }

            }
            this.state = 1882;
            this.match(Stage10Parser.RPAREN);
            this.state = 1885;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 102) {
                {
                this.state = 1883;
                this.match(Stage10Parser.COLON);
                this.state = 1884;
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
        this.enterRule(localContext, 270, Stage10Parser.RULE_fnoParam);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1887;
            this.match(Stage10Parser.LPAREN);
            this.state = 1891;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 74 || _la === 88 || ((((_la - 117)) & ~0x1F) === 0 && ((1 << (_la - 117)) & 255) !== 0)) {
                {
                {
                this.state = 1888;
                this.modifier();
                }
                }
                this.state = 1893;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1894;
            this.match(Stage10Parser.IDENTIFIER);
            this.state = 1896;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 98) {
                {
                this.state = 1895;
                this.match(Stage10Parser.OPTIONAL);
                }
            }

            this.state = 1900;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 102) {
                {
                this.state = 1898;
                this.match(Stage10Parser.COLON);
                this.state = 1899;
                this.typeExpr();
                }
            }

            this.state = 1907;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2) {
                {
                this.state = 1902;
                this.match(Stage10Parser.LPAREN);
                this.state = 1903;
                this.match(Stage10Parser.DEFAULT);
                this.state = 1904;
                this.expression();
                this.state = 1905;
                this.match(Stage10Parser.RPAREN);
                }
            }

            this.state = 1909;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 272, Stage10Parser.RULE_fnoRestParam);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1911;
            this.match(Stage10Parser.LPAREN);
            this.state = 1912;
            this.match(Stage10Parser.REST);
            this.state = 1913;
            this.match(Stage10Parser.IDENTIFIER);
            this.state = 1916;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 102) {
                {
                this.state = 1914;
                this.match(Stage10Parser.COLON);
                this.state = 1915;
                this.typeExpr();
                }
            }

            this.state = 1918;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 274, Stage10Parser.RULE_awaitExpr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1920;
            this.match(Stage10Parser.LPAREN);
            this.state = 1921;
            this.match(Stage10Parser.AWAIT);
            this.state = 1922;
            this.expression();
            this.state = 1923;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 276, Stage10Parser.RULE_yieldExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1925;
            this.match(Stage10Parser.LPAREN);
            this.state = 1926;
            this.match(Stage10Parser.YIELD);
            this.state = 1928;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2 || _la === 22 || ((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 402653185) !== 0) || ((((_la - 99)) & ~0x1F) === 0 && ((1 << (_la - 99)) & 3892445191) !== 0) || ((((_la - 131)) & ~0x1F) === 0 && ((1 << (_la - 131)) & 67103751) !== 0) || ((((_la - 167)) & ~0x1F) === 0 && ((1 << (_la - 167)) & 251) !== 0)) {
                {
                this.state = 1927;
                this.expression();
                }
            }

            this.state = 1930;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 278, Stage10Parser.RULE_yieldStarExpr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1932;
            this.match(Stage10Parser.LPAREN);
            this.state = 1933;
            this.match(Stage10Parser.YIELD_STAR);
            this.state = 1934;
            this.expression();
            this.state = 1935;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 280, Stage10Parser.RULE_bindExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1937;
            this.match(Stage10Parser.LPAREN);
            this.state = 1938;
            this.match(Stage10Parser.BIND);
            this.state = 1939;
            this.expression();
            this.state = 1940;
            this.expression();
            this.state = 1944;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 22 || ((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 402653185) !== 0) || ((((_la - 99)) & ~0x1F) === 0 && ((1 << (_la - 99)) & 3892445191) !== 0) || ((((_la - 131)) & ~0x1F) === 0 && ((1 << (_la - 131)) & 67103751) !== 0) || ((((_la - 167)) & ~0x1F) === 0 && ((1 << (_la - 167)) & 251) !== 0)) {
                {
                {
                this.state = 1941;
                this.expression();
                }
                }
                this.state = 1946;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1947;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 282, Stage10Parser.RULE_methodCallExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1949;
            this.match(Stage10Parser.LPAREN);
            this.state = 1950;
            this.match(Stage10Parser.METHOD_CALL);
            this.state = 1951;
            this.expression();
            this.state = 1952;
            this.expression();
            this.state = 1956;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 22 || ((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 402653185) !== 0) || ((((_la - 99)) & ~0x1F) === 0 && ((1 << (_la - 99)) & 3892445191) !== 0) || ((((_la - 131)) & ~0x1F) === 0 && ((1 << (_la - 131)) & 67103751) !== 0) || ((((_la - 167)) & ~0x1F) === 0 && ((1 << (_la - 167)) & 251) !== 0)) {
                {
                {
                this.state = 1953;
                this.expression();
                }
                }
                this.state = 1958;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1959;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 284, Stage10Parser.RULE_ternary);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1961;
            this.match(Stage10Parser.LPAREN);
            this.state = 1962;
            this.match(Stage10Parser.TERNARY);
            this.state = 1963;
            this.expression();
            this.state = 1964;
            this.expression();
            this.state = 1965;
            this.expression();
            this.state = 1966;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 286, Stage10Parser.RULE_condExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1968;
            this.match(Stage10Parser.LPAREN);
            this.state = 1969;
            this.match(Stage10Parser.COND);
            this.state = 1971;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 1970;
                this.condClause();
                }
                }
                this.state = 1973;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 22 || ((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 402653185) !== 0) || ((((_la - 99)) & ~0x1F) === 0 && ((1 << (_la - 99)) & 3892445191) !== 0) || ((((_la - 131)) & ~0x1F) === 0 && ((1 << (_la - 131)) & 67103751) !== 0) || ((((_la - 167)) & ~0x1F) === 0 && ((1 << (_la - 167)) & 251) !== 0));
            this.state = 1976;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 125) {
                {
                this.state = 1975;
                this.condElseClause();
                }
            }

            this.state = 1978;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 288, Stage10Parser.RULE_condClause);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1980;
            this.expression();
            this.state = 1981;
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
        this.enterRule(localContext, 290, Stage10Parser.RULE_condElseClause);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1983;
            this.match(Stage10Parser.ELSE);
            this.state = 1984;
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
        this.enterRule(localContext, 292, Stage10Parser.RULE_newForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1986;
            this.match(Stage10Parser.LPAREN);
            this.state = 1987;
            this.match(Stage10Parser.NEW);
            this.state = 1988;
            this.match(Stage10Parser.IDENTIFIER);
            this.state = 1990;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 152, this.context) ) {
            case 1:
                {
                this.state = 1989;
                this.typeArgs();
                }
                break;
            }
            this.state = 1995;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 22 || ((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 402653185) !== 0) || ((((_la - 99)) & ~0x1F) === 0 && ((1 << (_la - 99)) & 3892445191) !== 0) || ((((_la - 131)) & ~0x1F) === 0 && ((1 << (_la - 131)) & 67103751) !== 0) || ((((_la - 167)) & ~0x1F) === 0 && ((1 << (_la - 167)) & 251) !== 0)) {
                {
                {
                this.state = 1992;
                this.expression();
                }
                }
                this.state = 1997;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1998;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 294, Stage10Parser.RULE_objectExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2000;
            this.match(Stage10Parser.LPAREN);
            this.state = 2001;
            this.match(Stage10Parser.OBJECT);
            this.state = 2005;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 2002;
                this.objectField();
                }
                }
                this.state = 2007;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 2008;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 296, Stage10Parser.RULE_objectField);
        try {
            this.state = 2037;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 155, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 2010;
                this.match(Stage10Parser.LPAREN);
                this.state = 2011;
                this.propKey();
                this.state = 2012;
                this.expression();
                this.state = 2013;
                this.match(Stage10Parser.RPAREN);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 2015;
                this.match(Stage10Parser.LPAREN);
                this.state = 2016;
                this.propKey();
                this.state = 2017;
                this.methodDef();
                this.state = 2018;
                this.match(Stage10Parser.RPAREN);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 2020;
                this.match(Stage10Parser.LPAREN);
                this.state = 2021;
                this.match(Stage10Parser.IDENTIFIER);
                this.state = 2022;
                this.match(Stage10Parser.RPAREN);
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 2023;
                this.match(Stage10Parser.LPAREN);
                this.state = 2024;
                this.match(Stage10Parser.LBRACK);
                this.state = 2025;
                this.expression();
                this.state = 2026;
                this.match(Stage10Parser.RBRACK);
                this.state = 2027;
                this.expression();
                this.state = 2028;
                this.match(Stage10Parser.RPAREN);
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 2030;
                this.match(Stage10Parser.LPAREN);
                this.state = 2031;
                this.match(Stage10Parser.LBRACK);
                this.state = 2032;
                this.expression();
                this.state = 2033;
                this.match(Stage10Parser.RBRACK);
                this.state = 2034;
                this.methodDef();
                this.state = 2035;
                this.match(Stage10Parser.RPAREN);
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
        this.enterRule(localContext, 298, Stage10Parser.RULE_methodDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2039;
            this.match(Stage10Parser.LPAREN);
            this.state = 2040;
            this.match(Stage10Parser.METHOD);
            this.state = 2041;
            this.fnSignature();
            this.state = 2045;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 22 || ((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 402653185) !== 0) || ((((_la - 99)) & ~0x1F) === 0 && ((1 << (_la - 99)) & 3892445191) !== 0) || ((((_la - 131)) & ~0x1F) === 0 && ((1 << (_la - 131)) & 67103751) !== 0) || ((((_la - 167)) & ~0x1F) === 0 && ((1 << (_la - 167)) & 251) !== 0)) {
                {
                {
                this.state = 2042;
                this.statement();
                }
                }
                this.state = 2047;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 2048;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 300, Stage10Parser.RULE_arrayExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2050;
            this.match(Stage10Parser.LPAREN);
            this.state = 2051;
            this.match(Stage10Parser.ARRAY);
            this.state = 2055;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 22 || ((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 402653185) !== 0) || ((((_la - 99)) & ~0x1F) === 0 && ((1 << (_la - 99)) & 3892445191) !== 0) || ((((_la - 131)) & ~0x1F) === 0 && ((1 << (_la - 131)) & 67103751) !== 0) || ((((_la - 167)) & ~0x1F) === 0 && ((1 << (_la - 167)) & 251) !== 0)) {
                {
                {
                this.state = 2052;
                this.expression();
                }
                }
                this.state = 2057;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 2058;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 302, Stage10Parser.RULE_bracketArrayExpr);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2060;
            this.match(Stage10Parser.LBRACK);
            this.state = 2074;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2 || _la === 22 || ((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 402653185) !== 0) || ((((_la - 99)) & ~0x1F) === 0 && ((1 << (_la - 99)) & 3892445191) !== 0) || ((((_la - 131)) & ~0x1F) === 0 && ((1 << (_la - 131)) & 67103751) !== 0) || ((((_la - 167)) & ~0x1F) === 0 && ((1 << (_la - 167)) & 251) !== 0)) {
                {
                this.state = 2061;
                this.expression();
                this.state = 2068;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 159, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 2063;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                        if (_la === 4) {
                            {
                            this.state = 2062;
                            this.match(Stage10Parser.COMMA);
                            }
                        }

                        this.state = 2065;
                        this.expression();
                        }
                        }
                    }
                    this.state = 2070;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 159, this.context);
                }
                this.state = 2072;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 4) {
                    {
                    this.state = 2071;
                    this.match(Stage10Parser.COMMA);
                    }
                }

                }
            }

            this.state = 2076;
            this.match(Stage10Parser.RBRACK);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 304, Stage10Parser.RULE_braceObjectExpr);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2078;
            this.match(Stage10Parser.LBRACE);
            this.state = 2092;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (((((_la - 5)) & ~0x1F) === 0 && ((1 << (_la - 5)) & 2122317823) !== 0) || ((((_la - 40)) & ~0x1F) === 0 && ((1 << (_la - 40)) & 4294967295) !== 0) || ((((_la - 72)) & ~0x1F) === 0 && ((1 << (_la - 72)) & 3154116607) !== 0) || ((((_la - 104)) & ~0x1F) === 0 && ((1 << (_la - 104)) & 1065353191) !== 0) || ((((_la - 145)) & ~0x1F) === 0 && ((1 << (_la - 145)) & 822083583) !== 0)) {
                {
                this.state = 2079;
                this.braceObjectField();
                this.state = 2086;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 163, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 2081;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                        if (_la === 4) {
                            {
                            this.state = 2080;
                            this.match(Stage10Parser.COMMA);
                            }
                        }

                        this.state = 2083;
                        this.braceObjectField();
                        }
                        }
                    }
                    this.state = 2088;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 163, this.context);
                }
                this.state = 2090;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 4) {
                    {
                    this.state = 2089;
                    this.match(Stage10Parser.COMMA);
                    }
                }

                }
            }

            this.state = 2094;
            this.match(Stage10Parser.RBRACE);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 306, Stage10Parser.RULE_braceObjectField);
        try {
            this.state = 2107;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 166, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 2096;
                this.propKey();
                this.state = 2097;
                this.match(Stage10Parser.COLON);
                this.state = 2098;
                this.expression();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 2100;
                this.match(Stage10Parser.LBRACK);
                this.state = 2101;
                this.expression();
                this.state = 2102;
                this.match(Stage10Parser.RBRACK);
                this.state = 2103;
                this.match(Stage10Parser.COLON);
                this.state = 2104;
                this.expression();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 2106;
                this.match(Stage10Parser.IDENTIFIER);
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
        this.enterRule(localContext, 308, Stage10Parser.RULE_templateExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2109;
            this.match(Stage10Parser.LPAREN);
            this.state = 2110;
            this.match(Stage10Parser.TEMPLATE);
            this.state = 2113;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                this.state = 2113;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 167, this.context) ) {
                case 1:
                    {
                    this.state = 2111;
                    this.match(Stage10Parser.STRING);
                    }
                    break;
                case 2:
                    {
                    this.state = 2112;
                    this.expression();
                    }
                    break;
                }
                }
                this.state = 2115;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 22 || ((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 402653185) !== 0) || ((((_la - 99)) & ~0x1F) === 0 && ((1 << (_la - 99)) & 3892445191) !== 0) || ((((_la - 131)) & ~0x1F) === 0 && ((1 << (_la - 131)) & 67103751) !== 0) || ((((_la - 167)) & ~0x1F) === 0 && ((1 << (_la - 167)) & 251) !== 0));
            this.state = 2117;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 310, Stage10Parser.RULE_propKey);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2119;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 5)) & ~0x1F) === 0 && ((1 << (_la - 5)) & 2122317823) !== 0) || ((((_la - 40)) & ~0x1F) === 0 && ((1 << (_la - 40)) & 4294967295) !== 0) || ((((_la - 72)) & ~0x1F) === 0 && ((1 << (_la - 72)) & 3154116607) !== 0) || ((((_la - 104)) & ~0x1F) === 0 && ((1 << (_la - 104)) & 1061158887) !== 0) || ((((_la - 145)) & ~0x1F) === 0 && ((1 << (_la - 145)) & 822083583) !== 0))) {
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
        this.enterRule(localContext, 312, Stage10Parser.RULE_opSymbol);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2121;
            _la = this.tokenStream.LA(1);
            if(!(_la === 41 || ((((_la - 116)) & ~0x1F) === 0 && ((1 << (_la - 116)) & 3791908865) !== 0) || ((((_la - 148)) & ~0x1F) === 0 && ((1 << (_la - 148)) & 33554943) !== 0))) {
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
        this.enterRule(localContext, 314, Stage10Parser.RULE_propAccess);
        try {
            this.state = 2137;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 169, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 2123;
                this.match(Stage10Parser.LPAREN);
                this.state = 2124;
                this.match(Stage10Parser.DOT);
                this.state = 2125;
                this.expression();
                this.state = 2126;
                this.propKey();
                this.state = 2127;
                this.match(Stage10Parser.RPAREN);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 2129;
                this.match(Stage10Parser.LPAREN);
                this.state = 2130;
                this.match(Stage10Parser.DOT);
                this.state = 2131;
                this.expression();
                this.state = 2132;
                this.match(Stage10Parser.LBRACK);
                this.state = 2133;
                this.expression();
                this.state = 2134;
                this.match(Stage10Parser.RBRACK);
                this.state = 2135;
                this.match(Stage10Parser.RPAREN);
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
        this.enterRule(localContext, 316, Stage10Parser.RULE_subscriptAccess);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2139;
            this.match(Stage10Parser.LPAREN);
            this.state = 2140;
            this.match(Stage10Parser.SUBSCRIPT);
            this.state = 2141;
            this.expression();
            this.state = 2142;
            this.match(Stage10Parser.STRING);
            this.state = 2143;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 318, Stage10Parser.RULE_indexAccess);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2145;
            this.match(Stage10Parser.LPAREN);
            this.state = 2146;
            this.match(Stage10Parser.INDEX);
            this.state = 2147;
            this.expression();
            this.state = 2148;
            this.expression();
            this.state = 2149;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 320, Stage10Parser.RULE_quasiquote);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2151;
            this.match(Stage10Parser.LPAREN);
            this.state = 2152;
            _la = this.tokenStream.LA(1);
            if(!(_la === 42 || _la === 43)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 2153;
            this.quasiForm();
            this.state = 2154;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 322, Stage10Parser.RULE_quasiForm);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2156;
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
        this.enterRule(localContext, 324, Stage10Parser.RULE_sForm);
        let _la: number;
        try {
            this.state = 2181;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 171, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 2158;
                this.match(Stage10Parser.LPAREN);
                this.state = 2159;
                this.match(Stage10Parser.UNQUOTE);
                this.state = 2160;
                this.expression();
                this.state = 2161;
                this.match(Stage10Parser.RPAREN);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 2163;
                this.match(Stage10Parser.LPAREN);
                this.state = 2164;
                this.match(Stage10Parser.UNQUOTE_SPLICING);
                this.state = 2165;
                this.expression();
                this.state = 2166;
                this.match(Stage10Parser.RPAREN);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 2168;
                this.match(Stage10Parser.TILDE);
                this.state = 2169;
                this.expression();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 2170;
                this.match(Stage10Parser.TILDE_AT);
                this.state = 2171;
                this.expression();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 2172;
                this.match(Stage10Parser.LPAREN);
                this.state = 2176;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4294967286) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 4294967295) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 4294967295) !== 0) || ((((_la - 96)) & ~0x1F) === 0 && ((1 << (_la - 96)) & 4294967295) !== 0) || ((((_la - 128)) & ~0x1F) === 0 && ((1 << (_la - 128)) & 4294967295) !== 0) || ((((_la - 160)) & ~0x1F) === 0 && ((1 << (_la - 160)) & 65535) !== 0)) {
                    {
                    {
                    this.state = 2173;
                    this.sForm();
                    }
                    }
                    this.state = 2178;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 2179;
                this.match(Stage10Parser.RPAREN);
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 2180;
                _la = this.tokenStream.LA(1);
                if(_la<=0 || _la === 2 || _la === 3 || _la === 172 || _la === 173) {
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
        this.enterRule(localContext, 326, Stage10Parser.RULE_unquote);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2183;
            this.match(Stage10Parser.LPAREN);
            this.state = 2184;
            this.match(Stage10Parser.UNQUOTE);
            this.state = 2185;
            this.expression();
            this.state = 2186;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 328, Stage10Parser.RULE_unquoteSplicing);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2188;
            this.match(Stage10Parser.LPAREN);
            this.state = 2189;
            this.match(Stage10Parser.UNQUOTE_SPLICING);
            this.state = 2190;
            this.expression();
            this.state = 2191;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 330, Stage10Parser.RULE_tildeUnquote);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2193;
            this.match(Stage10Parser.TILDE);
            this.state = 2194;
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
        this.enterRule(localContext, 332, Stage10Parser.RULE_tildeUnquoteSplice);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2196;
            this.match(Stage10Parser.TILDE_AT);
            this.state = 2197;
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
        this.enterRule(localContext, 334, Stage10Parser.RULE_optChain);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2199;
            this.match(Stage10Parser.LPAREN);
            this.state = 2200;
            this.match(Stage10Parser.OPTCHAIN);
            this.state = 2201;
            this.expression();
            this.state = 2202;
            this.propKey();
            this.state = 2203;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 336, Stage10Parser.RULE_optChainIndex);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2205;
            this.match(Stage10Parser.LPAREN);
            this.state = 2206;
            this.match(Stage10Parser.OPTCHAIN_INDEX);
            this.state = 2207;
            this.expression();
            this.state = 2208;
            this.expression();
            this.state = 2209;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 338, Stage10Parser.RULE_nullCoalesce);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2211;
            this.match(Stage10Parser.LPAREN);
            this.state = 2212;
            this.match(Stage10Parser.NULLCOAL);
            this.state = 2213;
            this.expression();
            this.state = 2214;
            this.expression();
            this.state = 2215;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 340, Stage10Parser.RULE_infixExpr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2217;
            this.match(Stage10Parser.HASH_LBRACE);
            this.state = 2218;
            this.infixBody();
            this.state = 2219;
            this.match(Stage10Parser.RBRACE);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 342, Stage10Parser.RULE_infixBody);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2221;
            this.infixAtom(0);
            this.state = 2227;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 41 || ((((_la - 116)) & ~0x1F) === 0 && ((1 << (_la - 116)) & 3758354433) !== 0) || ((((_la - 148)) & ~0x1F) === 0 && ((1 << (_la - 148)) & 8389055) !== 0)) {
                {
                {
                this.state = 2222;
                this.infixBinOp();
                this.state = 2223;
                this.infixAtom(0);
                }
                }
                this.state = 2229;
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
        let _startState = 344;
        this.enterRecursionRule(localContext, 344, Stage10Parser.RULE_infixAtom, _p);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2246;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 174, this.context) ) {
            case 1:
                {
                this.state = 2231;
                this.match(Stage10Parser.IDENTIFIER);
                this.state = 2232;
                this.match(Stage10Parser.LPAREN);
                this.state = 2234;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (((((_la - 99)) & ~0x1F) === 0 && ((1 << (_la - 99)) & 7) !== 0) || ((((_la - 142)) & ~0x1F) === 0 && ((1 << (_la - 142)) & 3053457409) !== 0) || _la === 174) {
                    {
                    this.state = 2233;
                    this.infixArgs();
                    }
                }

                this.state = 2236;
                this.match(Stage10Parser.RPAREN);
                }
                break;
            case 2:
                {
                this.state = 2237;
                this.match(Stage10Parser.LBRACE);
                this.state = 2238;
                this.infixBody();
                this.state = 2239;
                this.match(Stage10Parser.RBRACE);
                }
                break;
            case 3:
                {
                this.state = 2241;
                this.infixUnaryOp();
                this.state = 2242;
                this.infixAtom(3);
                }
                break;
            case 4:
                {
                this.state = 2244;
                this.literal();
                }
                break;
            case 5:
                {
                this.state = 2245;
                this.match(Stage10Parser.IDENTIFIER);
                }
                break;
            }
            this.context!.stop = this.tokenStream.LT(-1);
            this.state = 2256;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 176, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    if (this.parseListeners != null) {
                        this.triggerExitRuleEvent();
                    }
                    previousContext = localContext;
                    {
                    {
                    localContext = new InfixAtomContext(parentContext, parentState);
                    this.pushNewRecursionContext(localContext, _startState, Stage10Parser.RULE_infixAtom);
                    this.state = 2248;
                    if (!(this.precpred(this.context, 5))) {
                        throw this.createFailedPredicateException("this.precpred(this.context, 5)");
                    }
                    this.state = 2249;
                    this.match(Stage10Parser.LPAREN);
                    this.state = 2251;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    if (((((_la - 99)) & ~0x1F) === 0 && ((1 << (_la - 99)) & 7) !== 0) || ((((_la - 142)) & ~0x1F) === 0 && ((1 << (_la - 142)) & 3053457409) !== 0) || _la === 174) {
                        {
                        this.state = 2250;
                        this.infixArgs();
                        }
                    }

                    this.state = 2253;
                    this.match(Stage10Parser.RPAREN);
                    }
                    }
                }
                this.state = 2258;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 176, this.context);
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
        this.enterRule(localContext, 346, Stage10Parser.RULE_infixArgs);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2259;
            this.infixBody();
            this.state = 2264;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 4) {
                {
                {
                this.state = 2260;
                this.match(Stage10Parser.COMMA);
                this.state = 2261;
                this.infixBody();
                }
                }
                this.state = 2266;
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
        this.enterRule(localContext, 348, Stage10Parser.RULE_infixUnaryOp);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2267;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 154)) & ~0x1F) === 0 && ((1 << (_la - 154)) & 655361) !== 0))) {
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
        this.enterRule(localContext, 350, Stage10Parser.RULE_infixBinOp);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2269;
            _la = this.tokenStream.LA(1);
            if(!(_la === 41 || ((((_la - 116)) & ~0x1F) === 0 && ((1 << (_la - 116)) & 3758354433) !== 0) || ((((_la - 148)) & ~0x1F) === 0 && ((1 << (_la - 148)) & 8389055) !== 0))) {
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
        this.enterRule(localContext, 352, Stage10Parser.RULE_macroExprCall);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2271;
            this.match(Stage10Parser.LPAREN);
            this.state = 2272;
            this.match(Stage10Parser.IDENTIFIER);
            this.state = 2276;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 22 || ((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 402653185) !== 0) || ((((_la - 99)) & ~0x1F) === 0 && ((1 << (_la - 99)) & 3892445191) !== 0) || ((((_la - 131)) & ~0x1F) === 0 && ((1 << (_la - 131)) & 67103751) !== 0) || ((((_la - 167)) & ~0x1F) === 0 && ((1 << (_la - 167)) & 251) !== 0)) {
                {
                {
                this.state = 2273;
                this.expression();
                }
                }
                this.state = 2278;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 2279;
            this.match(Stage10Parser.FAT_ARROW);
            this.state = 2283;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 22 || ((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 402653185) !== 0) || ((((_la - 99)) & ~0x1F) === 0 && ((1 << (_la - 99)) & 3892445191) !== 0) || ((((_la - 131)) & ~0x1F) === 0 && ((1 << (_la - 131)) & 67103751) !== 0) || ((((_la - 167)) & ~0x1F) === 0 && ((1 << (_la - 167)) & 251) !== 0)) {
                {
                {
                this.state = 2280;
                this.statement();
                }
                }
                this.state = 2285;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 2286;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 354, Stage10Parser.RULE_macroBodyCall);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2288;
            this.match(Stage10Parser.LPAREN);
            this.state = 2289;
            this.match(Stage10Parser.IDENTIFIER);
            this.state = 2293;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 22 || ((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 402653185) !== 0) || ((((_la - 99)) & ~0x1F) === 0 && ((1 << (_la - 99)) & 3892445191) !== 0) || ((((_la - 131)) & ~0x1F) === 0 && ((1 << (_la - 131)) & 67103751) !== 0) || ((((_la - 167)) & ~0x1F) === 0 && ((1 << (_la - 167)) & 251) !== 0)) {
                {
                {
                this.state = 2290;
                this.expression();
                }
                }
                this.state = 2295;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 2296;
            this.match(Stage10Parser.STMT_ARROW);
            this.state = 2300;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 22 || ((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 402653185) !== 0) || ((((_la - 99)) & ~0x1F) === 0 && ((1 << (_la - 99)) & 3892445191) !== 0) || ((((_la - 131)) & ~0x1F) === 0 && ((1 << (_la - 131)) & 67103751) !== 0) || ((((_la - 167)) & ~0x1F) === 0 && ((1 << (_la - 167)) & 251) !== 0)) {
                {
                {
                this.state = 2297;
                this.statement();
                }
                }
                this.state = 2302;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 2303;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 356, Stage10Parser.RULE_call);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2305;
            this.match(Stage10Parser.LPAREN);
            this.state = 2306;
            this.expression();
            this.state = 2308;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 182, this.context) ) {
            case 1:
                {
                this.state = 2307;
                this.typeArgs();
                }
                break;
            }
            this.state = 2313;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 22 || ((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 402653185) !== 0) || ((((_la - 99)) & ~0x1F) === 0 && ((1 << (_la - 99)) & 3892445191) !== 0) || ((((_la - 131)) & ~0x1F) === 0 && ((1 << (_la - 131)) & 67103751) !== 0) || ((((_la - 167)) & ~0x1F) === 0 && ((1 << (_la - 167)) & 251) !== 0)) {
                {
                {
                this.state = 2310;
                this.expression();
                }
                }
                this.state = 2315;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 2316;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 358, Stage10Parser.RULE_typeArgs);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2318;
            this.match(Stage10Parser.LPAREN);
            this.state = 2319;
            this.match(Stage10Parser.TYPE_ARGS);
            this.state = 2321;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 2320;
                this.typeExpr();
                }
                }
                this.state = 2323;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 33 || _la === 100 || _la === 101 || _la === 142 || _la === 174);
            this.state = 2325;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 360, Stage10Parser.RULE_fnSignature);
        let _la: number;
        try {
            let alternative: number;
            this.state = 2358;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 192, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 2327;
                this.match(Stage10Parser.LPAREN);
                this.state = 2344;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 2) {
                    {
                    this.state = 2328;
                    this.param();
                    this.state = 2335;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 186, this.context);
                    while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                        if (alternative === 1) {
                            {
                            {
                            this.state = 2330;
                            this.errorHandler.sync(this);
                            _la = this.tokenStream.LA(1);
                            if (_la === 4) {
                                {
                                this.state = 2329;
                                this.match(Stage10Parser.COMMA);
                                }
                            }

                            this.state = 2332;
                            this.param();
                            }
                            }
                        }
                        this.state = 2337;
                        this.errorHandler.sync(this);
                        alternative = this.interpreter.adaptivePredict(this.tokenStream, 186, this.context);
                    }
                    this.state = 2342;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    if (_la === 2 || _la === 4) {
                        {
                        this.state = 2339;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                        if (_la === 4) {
                            {
                            this.state = 2338;
                            this.match(Stage10Parser.COMMA);
                            }
                        }

                        this.state = 2341;
                        this.restParam();
                        }
                    }

                    }
                }

                this.state = 2346;
                this.match(Stage10Parser.RPAREN);
                this.state = 2349;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 102) {
                    {
                    this.state = 2347;
                    this.match(Stage10Parser.COLON);
                    this.state = 2348;
                    this.typeExpr();
                    }
                }

                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 2351;
                this.match(Stage10Parser.LPAREN);
                this.state = 2352;
                this.restParam();
                this.state = 2353;
                this.match(Stage10Parser.RPAREN);
                this.state = 2356;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 102) {
                    {
                    this.state = 2354;
                    this.match(Stage10Parser.COLON);
                    this.state = 2355;
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
        this.enterRule(localContext, 362, Stage10Parser.RULE_param);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2360;
            this.match(Stage10Parser.LPAREN);
            this.state = 2361;
            this.match(Stage10Parser.IDENTIFIER);
            this.state = 2363;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 98) {
                {
                this.state = 2362;
                this.match(Stage10Parser.OPTIONAL);
                }
            }

            this.state = 2367;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 102) {
                {
                this.state = 2365;
                this.match(Stage10Parser.COLON);
                this.state = 2366;
                this.typeExpr();
                }
            }

            this.state = 2369;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 364, Stage10Parser.RULE_restParam);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2371;
            this.match(Stage10Parser.LPAREN);
            this.state = 2372;
            this.match(Stage10Parser.REST);
            this.state = 2373;
            this.match(Stage10Parser.IDENTIFIER);
            this.state = 2376;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 102) {
                {
                this.state = 2374;
                this.match(Stage10Parser.COLON);
                this.state = 2375;
                this.typeExpr();
                }
            }

            this.state = 2378;
            this.match(Stage10Parser.RPAREN);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 366, Stage10Parser.RULE_literal);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2380;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 99)) & ~0x1F) === 0 && ((1 << (_la - 99)) & 7) !== 0) || ((((_la - 167)) & ~0x1F) === 0 && ((1 << (_la - 167)) & 11) !== 0))) {
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
        case 172:
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
        4,1,175,2383,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,
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
        2,181,7,181,2,182,7,182,2,183,7,183,1,0,1,0,1,0,5,0,372,8,0,10,0,
        12,0,375,9,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,1,1,1,1,1,3,1,396,8,1,1,2,1,2,1,2,1,2,1,2,1,2,1,2,
        1,2,3,2,406,8,2,1,3,1,3,1,3,1,3,1,3,5,3,413,8,3,10,3,12,3,416,9,
        3,1,3,1,3,1,4,1,4,5,4,422,8,4,10,4,12,4,425,9,4,1,4,1,4,3,4,429,
        8,4,1,4,1,4,1,5,1,5,1,5,1,5,1,5,1,5,1,5,1,5,1,5,1,5,3,5,443,8,5,
        1,6,1,6,1,6,1,6,1,6,1,6,1,7,1,7,1,7,4,7,454,8,7,11,7,12,7,455,1,
        7,1,7,1,8,1,8,1,9,1,9,1,9,1,9,5,9,466,8,9,10,9,12,9,469,9,9,1,9,
        1,9,1,10,1,10,1,10,5,10,476,8,10,10,10,12,10,479,9,10,1,10,1,10,
        1,10,1,10,1,10,1,11,1,11,1,11,5,11,489,8,11,10,11,12,11,492,9,11,
        1,11,1,11,1,11,1,11,1,11,1,12,1,12,1,12,5,12,502,8,12,10,12,12,12,
        505,9,12,1,12,1,12,1,12,1,12,1,12,1,13,1,13,1,13,1,14,1,14,1,14,
        1,14,3,14,519,8,14,1,14,1,14,1,14,1,15,1,15,1,15,1,15,3,15,528,8,
        15,1,15,3,15,531,8,15,1,15,1,15,1,15,1,16,1,16,1,16,4,16,539,8,16,
        11,16,12,16,540,1,16,1,16,1,17,1,17,1,17,1,17,5,17,549,8,17,10,17,
        12,17,552,9,17,1,17,1,17,1,18,1,18,1,18,3,18,559,8,18,1,18,1,18,
        1,19,1,19,1,19,1,19,4,19,567,8,19,11,19,12,19,568,1,19,3,19,572,
        8,19,1,19,1,19,1,20,1,20,1,20,1,20,5,20,580,8,20,10,20,12,20,583,
        9,20,1,20,1,20,1,20,1,20,1,20,5,20,590,8,20,10,20,12,20,593,9,20,
        1,20,3,20,596,8,20,1,21,1,21,1,21,5,21,601,8,21,10,21,12,21,604,
        9,21,1,21,1,21,3,21,608,8,21,1,21,3,21,611,8,21,1,21,3,21,614,8,
        21,1,21,1,21,1,21,1,22,1,22,1,22,5,22,622,8,22,10,22,12,22,625,9,
        22,1,22,3,22,628,8,22,1,22,3,22,631,8,22,1,22,1,22,1,22,1,23,1,23,
        1,23,1,23,1,23,1,24,1,24,1,24,4,24,644,8,24,11,24,12,24,645,1,24,
        1,24,1,25,1,25,1,25,5,25,653,8,25,10,25,12,25,656,9,25,1,25,1,25,
        1,26,1,26,1,26,1,26,1,26,1,26,1,26,1,26,1,26,3,26,669,8,26,1,27,
        1,27,1,28,1,28,1,28,5,28,676,8,28,10,28,12,28,679,9,28,1,28,1,28,
        1,28,1,28,3,28,685,8,28,1,28,1,28,3,28,689,8,28,1,28,1,28,1,29,1,
        29,5,29,695,8,29,10,29,12,29,698,9,29,1,29,1,29,3,29,702,8,29,1,
        29,1,29,3,29,706,8,29,1,29,1,29,1,30,1,30,1,30,3,30,713,8,30,1,30,
        5,30,716,8,30,10,30,12,30,719,9,30,3,30,721,8,30,1,30,1,30,1,30,
        3,30,726,8,30,1,31,1,31,1,31,1,31,5,31,732,8,31,10,31,12,31,735,
        9,31,1,31,1,31,1,32,1,32,1,32,5,32,742,8,32,10,32,12,32,745,9,32,
        1,32,1,32,1,32,5,32,750,8,32,10,32,12,32,753,9,32,1,32,1,32,1,33,
        1,33,1,33,5,33,760,8,33,10,33,12,33,763,9,33,1,33,1,33,1,33,1,33,
        1,34,1,34,1,34,5,34,772,8,34,10,34,12,34,775,9,34,1,34,1,34,1,34,
        5,34,780,8,34,10,34,12,34,783,9,34,1,34,1,34,1,35,1,35,1,35,5,35,
        790,8,35,10,35,12,35,793,9,35,1,35,1,35,1,35,5,35,798,8,35,10,35,
        12,35,801,9,35,1,35,1,35,1,36,1,36,1,36,1,36,1,36,1,36,1,36,3,36,
        812,8,36,1,37,1,37,1,37,1,37,1,37,1,37,1,37,1,37,1,37,1,37,1,37,
        1,37,1,37,1,37,1,37,1,37,1,37,1,37,1,37,1,37,1,37,1,37,1,37,3,37,
        837,8,37,1,38,1,38,1,38,1,38,4,38,843,8,38,11,38,12,38,844,1,38,
        1,38,5,38,849,8,38,10,38,12,38,852,9,38,1,38,1,38,1,39,1,39,1,39,
        1,39,4,39,860,8,39,11,39,12,39,861,1,39,1,39,5,39,866,8,39,10,39,
        12,39,869,9,39,1,39,1,39,1,40,1,40,1,40,1,40,4,40,877,8,40,11,40,
        12,40,878,1,40,1,40,5,40,883,8,40,10,40,12,40,886,9,40,1,40,1,40,
        1,41,1,41,1,41,1,41,1,41,3,41,895,8,41,1,41,1,41,1,42,1,42,1,42,
        5,42,902,8,42,10,42,12,42,905,9,42,1,42,1,42,1,43,1,43,1,43,5,43,
        912,8,43,10,43,12,43,915,9,43,1,43,1,43,1,44,1,44,1,44,1,44,5,44,
        923,8,44,10,44,12,44,926,9,44,1,44,1,44,1,45,1,45,1,45,3,45,933,
        8,45,1,45,1,45,1,46,1,46,1,46,1,46,1,46,1,47,1,47,1,47,1,47,1,48,
        1,48,1,48,1,48,1,49,1,49,1,49,3,49,953,8,49,1,49,1,49,1,49,1,49,
        1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,
        1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,3,49,982,8,49,
        1,50,1,50,1,50,1,50,1,50,1,50,1,51,1,51,1,51,4,51,993,8,51,11,51,
        12,51,994,1,51,1,51,1,52,1,52,1,52,1,52,1,52,3,52,1004,8,52,1,53,
        1,53,1,53,1,53,1,53,1,53,1,53,1,53,1,53,3,53,1015,8,53,1,54,1,54,
        1,54,1,54,1,54,1,54,1,55,1,55,1,55,1,55,1,55,1,55,1,55,1,55,1,55,
        1,55,1,55,1,55,1,55,1,55,1,55,1,55,1,55,1,55,1,55,1,55,1,55,1,55,
        1,55,1,55,1,55,3,55,1048,8,55,1,56,1,56,1,56,4,56,1053,8,56,11,56,
        12,56,1054,1,56,1,56,1,57,1,57,1,57,3,57,1062,8,57,1,57,1,57,1,58,
        1,58,1,58,1,58,4,58,1070,8,58,11,58,12,58,1071,1,58,1,58,1,59,1,
        59,1,59,1,59,1,59,1,60,1,60,1,60,1,60,1,60,1,60,1,61,1,61,1,61,4,
        61,1090,8,61,11,61,12,61,1091,1,61,1,61,1,62,1,62,1,62,1,62,4,62,
        1100,8,62,11,62,12,62,1101,1,62,1,62,1,63,1,63,1,63,1,63,1,63,1,
        64,1,64,1,64,1,64,1,64,1,65,1,65,1,65,1,65,3,65,1120,8,65,1,65,1,
        65,1,65,1,66,1,66,1,66,1,66,3,66,1129,8,66,1,66,1,66,1,66,3,66,1134,
        8,66,1,67,1,67,5,67,1138,8,67,10,67,12,67,1141,9,67,1,67,1,67,1,
        68,1,68,5,68,1147,8,68,10,68,12,68,1150,9,68,1,68,1,68,1,69,1,69,
        1,69,1,69,1,69,1,69,1,69,1,69,1,69,1,69,1,69,1,69,1,69,1,69,1,69,
        1,69,1,69,1,69,1,69,1,69,1,69,3,69,1175,8,69,1,70,1,70,1,70,4,70,
        1180,8,70,11,70,12,70,1181,1,70,1,70,1,71,1,71,1,71,4,71,1189,8,
        71,11,71,12,71,1190,1,71,1,71,1,72,1,72,1,72,1,72,1,72,1,73,1,73,
        1,73,4,73,1203,8,73,11,73,12,73,1204,1,73,1,73,1,74,1,74,1,74,1,
        74,1,74,1,74,1,74,1,74,1,74,1,74,1,74,3,74,1220,8,74,1,75,1,75,1,
        75,3,75,1225,8,75,1,75,1,75,5,75,1229,8,75,10,75,12,75,1232,9,75,
        1,75,1,75,1,75,1,75,1,76,1,76,1,76,3,76,1241,8,76,1,76,1,76,1,76,
        1,77,1,77,1,77,5,77,1249,8,77,10,77,12,77,1252,9,77,1,77,1,77,1,
        78,1,78,5,78,1258,8,78,10,78,12,78,1261,9,78,1,78,1,78,3,78,1265,
        8,78,1,78,1,78,1,78,1,79,1,79,1,80,1,80,1,80,1,80,1,80,1,81,1,81,
        1,81,1,81,1,81,1,82,1,82,1,82,1,82,1,82,1,83,1,83,1,83,1,83,1,83,
        1,83,1,84,1,84,1,84,1,84,1,84,1,84,1,84,1,84,1,85,1,85,1,85,1,85,
        1,85,1,86,1,86,1,86,1,86,1,86,3,86,1311,8,86,1,86,1,86,1,86,1,87,
        1,87,1,87,4,87,1319,8,87,11,87,12,87,1320,1,87,1,87,1,88,1,88,1,
        89,1,89,1,89,4,89,1330,8,89,11,89,12,89,1331,1,89,1,89,1,90,1,90,
        3,90,1338,8,90,1,91,1,91,1,91,1,91,4,91,1344,8,91,11,91,12,91,1345,
        1,91,1,91,1,92,1,92,1,92,4,92,1353,8,92,11,92,12,92,1354,1,92,1,
        92,1,93,1,93,1,93,3,93,1362,8,93,1,93,3,93,1365,8,93,1,93,1,93,1,
        94,1,94,1,94,1,94,1,94,1,95,1,95,1,95,1,95,1,95,1,96,1,96,1,96,1,
        96,1,96,1,96,1,96,1,96,1,96,1,96,1,96,1,96,1,96,1,96,1,96,1,96,1,
        96,1,96,3,96,1397,8,96,1,97,1,97,1,97,1,97,1,97,1,97,1,97,1,97,1,
        97,1,97,1,97,1,97,1,97,1,97,1,97,1,97,1,97,1,97,1,97,1,97,1,97,1,
        97,1,97,1,97,1,97,1,97,1,97,1,97,1,97,1,97,3,97,1429,8,97,1,98,1,
        98,1,98,1,98,1,98,1,98,1,98,1,98,1,98,1,99,1,99,1,99,1,99,5,99,1444,
        8,99,10,99,12,99,1447,9,99,1,99,3,99,1450,8,99,1,99,1,99,1,100,1,
        100,1,100,1,100,5,100,1458,8,100,10,100,12,100,1461,9,100,1,100,
        1,100,1,101,1,101,1,101,5,101,1468,8,101,10,101,12,101,1471,9,101,
        1,101,1,101,1,102,1,102,1,102,1,102,1,102,1,102,5,102,1481,8,102,
        10,102,12,102,1484,9,102,1,102,1,102,1,102,1,102,1,102,1,102,1,102,
        1,102,1,102,1,102,1,102,5,102,1497,8,102,10,102,12,102,1500,9,102,
        1,102,1,102,3,102,1504,8,102,1,103,1,103,1,103,1,103,1,103,5,103,
        1511,8,103,10,103,12,103,1514,9,103,1,103,1,103,1,104,1,104,1,104,
        1,104,1,104,5,104,1523,8,104,10,104,12,104,1526,9,104,1,104,1,104,
        1,105,1,105,1,105,1,105,1,105,5,105,1535,8,105,10,105,12,105,1538,
        9,105,1,105,1,105,1,106,1,106,1,106,1,106,3,106,1546,8,106,1,106,
        3,106,1549,8,106,1,106,1,106,1,107,1,107,1,107,5,107,1556,8,107,
        10,107,12,107,1559,9,107,1,107,1,107,1,108,1,108,1,108,1,108,5,108,
        1567,8,108,10,108,12,108,1570,9,108,1,108,1,108,1,109,1,109,1,109,
        5,109,1577,8,109,10,109,12,109,1580,9,109,1,109,1,109,1,110,1,110,
        1,110,1,110,1,110,1,110,1,110,1,110,1,110,1,110,1,110,1,110,1,110,
        1,110,1,110,1,110,1,110,1,110,1,110,1,110,1,110,1,110,1,110,1,110,
        1,110,1,110,1,110,1,110,1,110,1,110,1,110,1,110,1,110,1,110,1,110,
        1,110,1,110,1,110,1,110,1,110,1,110,1,110,1,110,1,110,1,110,1,110,
        1,110,1,110,1,110,1,110,1,110,1,110,3,110,1636,8,110,1,111,1,111,
        1,112,1,112,1,113,1,113,1,113,5,113,1645,8,113,10,113,12,113,1648,
        9,113,1,113,1,113,1,114,1,114,1,114,1,114,5,114,1656,8,114,10,114,
        12,114,1659,9,114,1,114,1,114,1,115,1,115,1,115,1,115,1,115,1,116,
        1,116,1,116,1,116,1,116,1,116,1,117,1,117,1,117,1,117,5,117,1678,
        8,117,10,117,12,117,1681,9,117,1,117,1,117,1,118,1,118,1,118,3,118,
        1688,8,118,1,118,1,118,5,118,1692,8,118,10,118,12,118,1695,9,118,
        1,118,1,118,1,119,1,119,1,119,1,119,5,119,1703,8,119,10,119,12,119,
        1706,9,119,1,119,1,119,1,120,1,120,1,120,1,120,5,120,1714,8,120,
        10,120,12,120,1717,9,120,1,120,1,120,1,121,1,121,1,121,1,121,5,121,
        1725,8,121,10,121,12,121,1728,9,121,1,121,1,121,1,122,1,122,1,122,
        1,122,5,122,1736,8,122,10,122,12,122,1739,9,122,1,122,1,122,1,123,
        1,123,1,123,5,123,1746,8,123,10,123,12,123,1749,9,123,1,123,1,123,
        1,124,1,124,1,124,5,124,1756,8,124,10,124,12,124,1759,9,124,1,124,
        1,124,1,125,1,125,1,125,3,125,1766,8,125,1,125,1,125,5,125,1770,
        8,125,10,125,12,125,1773,9,125,1,125,1,125,1,126,1,126,1,126,1,126,
        5,126,1781,8,126,10,126,12,126,1784,9,126,1,126,1,126,1,127,1,127,
        1,127,1,127,5,127,1792,8,127,10,127,12,127,1795,9,127,1,127,1,127,
        1,128,1,128,1,128,1,128,5,128,1803,8,128,10,128,12,128,1806,9,128,
        1,128,1,128,1,129,1,129,1,129,1,129,5,129,1814,8,129,10,129,12,129,
        1817,9,129,1,129,1,129,1,130,1,130,1,130,1,130,5,130,1825,8,130,
        10,130,12,130,1828,9,130,1,130,1,130,1,131,1,131,1,131,5,131,1835,
        8,131,10,131,12,131,1838,9,131,1,131,1,131,1,131,5,131,1843,8,131,
        10,131,12,131,1846,9,131,1,131,1,131,1,132,1,132,1,132,5,132,1853,
        8,132,10,132,12,132,1856,9,132,1,132,1,132,1,132,1,132,1,133,1,133,
        1,133,1,133,5,133,1866,8,133,10,133,12,133,1869,9,133,1,133,1,133,
        1,134,1,134,5,134,1875,8,134,10,134,12,134,1878,9,134,1,134,3,134,
        1881,8,134,1,134,1,134,1,134,3,134,1886,8,134,1,135,1,135,5,135,
        1890,8,135,10,135,12,135,1893,9,135,1,135,1,135,3,135,1897,8,135,
        1,135,1,135,3,135,1901,8,135,1,135,1,135,1,135,1,135,1,135,3,135,
        1908,8,135,1,135,1,135,1,136,1,136,1,136,1,136,1,136,3,136,1917,
        8,136,1,136,1,136,1,137,1,137,1,137,1,137,1,137,1,138,1,138,1,138,
        3,138,1929,8,138,1,138,1,138,1,139,1,139,1,139,1,139,1,139,1,140,
        1,140,1,140,1,140,1,140,5,140,1943,8,140,10,140,12,140,1946,9,140,
        1,140,1,140,1,141,1,141,1,141,1,141,1,141,5,141,1955,8,141,10,141,
        12,141,1958,9,141,1,141,1,141,1,142,1,142,1,142,1,142,1,142,1,142,
        1,142,1,143,1,143,1,143,4,143,1972,8,143,11,143,12,143,1973,1,143,
        3,143,1977,8,143,1,143,1,143,1,144,1,144,1,144,1,145,1,145,1,145,
        1,146,1,146,1,146,1,146,3,146,1991,8,146,1,146,5,146,1994,8,146,
        10,146,12,146,1997,9,146,1,146,1,146,1,147,1,147,1,147,5,147,2004,
        8,147,10,147,12,147,2007,9,147,1,147,1,147,1,148,1,148,1,148,1,148,
        1,148,1,148,1,148,1,148,1,148,1,148,1,148,1,148,1,148,1,148,1,148,
        1,148,1,148,1,148,1,148,1,148,1,148,1,148,1,148,1,148,1,148,1,148,
        1,148,3,148,2038,8,148,1,149,1,149,1,149,1,149,5,149,2044,8,149,
        10,149,12,149,2047,9,149,1,149,1,149,1,150,1,150,1,150,5,150,2054,
        8,150,10,150,12,150,2057,9,150,1,150,1,150,1,151,1,151,1,151,3,151,
        2064,8,151,1,151,5,151,2067,8,151,10,151,12,151,2070,9,151,1,151,
        3,151,2073,8,151,3,151,2075,8,151,1,151,1,151,1,152,1,152,1,152,
        3,152,2082,8,152,1,152,5,152,2085,8,152,10,152,12,152,2088,9,152,
        1,152,3,152,2091,8,152,3,152,2093,8,152,1,152,1,152,1,153,1,153,
        1,153,1,153,1,153,1,153,1,153,1,153,1,153,1,153,1,153,3,153,2108,
        8,153,1,154,1,154,1,154,1,154,4,154,2114,8,154,11,154,12,154,2115,
        1,154,1,154,1,155,1,155,1,156,1,156,1,157,1,157,1,157,1,157,1,157,
        1,157,1,157,1,157,1,157,1,157,1,157,1,157,1,157,1,157,3,157,2138,
        8,157,1,158,1,158,1,158,1,158,1,158,1,158,1,159,1,159,1,159,1,159,
        1,159,1,159,1,160,1,160,1,160,1,160,1,160,1,161,1,161,1,162,1,162,
        1,162,1,162,1,162,1,162,1,162,1,162,1,162,1,162,1,162,1,162,1,162,
        1,162,1,162,1,162,5,162,2175,8,162,10,162,12,162,2178,9,162,1,162,
        1,162,3,162,2182,8,162,1,163,1,163,1,163,1,163,1,163,1,164,1,164,
        1,164,1,164,1,164,1,165,1,165,1,165,1,166,1,166,1,166,1,167,1,167,
        1,167,1,167,1,167,1,167,1,168,1,168,1,168,1,168,1,168,1,168,1,169,
        1,169,1,169,1,169,1,169,1,169,1,170,1,170,1,170,1,170,1,171,1,171,
        1,171,1,171,5,171,2226,8,171,10,171,12,171,2229,9,171,1,172,1,172,
        1,172,1,172,3,172,2235,8,172,1,172,1,172,1,172,1,172,1,172,1,172,
        1,172,1,172,1,172,1,172,3,172,2247,8,172,1,172,1,172,1,172,3,172,
        2252,8,172,1,172,5,172,2255,8,172,10,172,12,172,2258,9,172,1,173,
        1,173,1,173,5,173,2263,8,173,10,173,12,173,2266,9,173,1,174,1,174,
        1,175,1,175,1,176,1,176,1,176,5,176,2275,8,176,10,176,12,176,2278,
        9,176,1,176,1,176,5,176,2282,8,176,10,176,12,176,2285,9,176,1,176,
        1,176,1,177,1,177,1,177,5,177,2292,8,177,10,177,12,177,2295,9,177,
        1,177,1,177,5,177,2299,8,177,10,177,12,177,2302,9,177,1,177,1,177,
        1,178,1,178,1,178,3,178,2309,8,178,1,178,5,178,2312,8,178,10,178,
        12,178,2315,9,178,1,178,1,178,1,179,1,179,1,179,4,179,2322,8,179,
        11,179,12,179,2323,1,179,1,179,1,180,1,180,1,180,3,180,2331,8,180,
        1,180,5,180,2334,8,180,10,180,12,180,2337,9,180,1,180,3,180,2340,
        8,180,1,180,3,180,2343,8,180,3,180,2345,8,180,1,180,1,180,1,180,
        3,180,2350,8,180,1,180,1,180,1,180,1,180,1,180,3,180,2357,8,180,
        3,180,2359,8,180,1,181,1,181,1,181,3,181,2364,8,181,1,181,1,181,
        3,181,2368,8,181,1,181,1,181,1,182,1,182,1,182,1,182,1,182,3,182,
        2377,8,182,1,182,1,182,1,183,1,183,1,183,0,1,344,184,0,2,4,6,8,10,
        12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,
        56,58,60,62,64,66,68,70,72,74,76,78,80,82,84,86,88,90,92,94,96,98,
        100,102,104,106,108,110,112,114,116,118,120,122,124,126,128,130,
        132,134,136,138,140,142,144,146,148,150,152,154,156,158,160,162,
        164,166,168,170,172,174,176,178,180,182,184,186,188,190,192,194,
        196,198,200,202,204,206,208,210,212,214,216,218,220,222,224,226,
        228,230,232,234,236,238,240,242,244,246,248,250,252,254,256,258,
        260,262,264,266,268,270,272,274,276,278,280,282,284,286,288,290,
        292,294,296,298,300,302,304,306,308,310,312,314,316,318,320,322,
        324,326,328,330,332,334,336,338,340,342,344,346,348,350,352,354,
        356,358,360,362,364,366,0,11,2,0,167,168,170,170,3,0,74,74,88,88,
        117,124,2,0,99,99,167,168,2,0,88,88,98,98,9,0,5,27,30,35,40,97,99,
        101,103,106,109,125,128,133,145,168,173,174,6,0,41,41,116,116,128,
        133,141,141,145,156,173,173,1,0,42,43,2,0,2,3,172,173,3,0,154,154,
        171,171,173,173,6,0,41,41,116,116,128,133,145,153,155,156,171,171,
        3,0,99,101,167,168,170,170,2543,0,368,1,0,0,0,2,395,1,0,0,0,4,405,
        1,0,0,0,6,407,1,0,0,0,8,419,1,0,0,0,10,442,1,0,0,0,12,444,1,0,0,
        0,14,450,1,0,0,0,16,459,1,0,0,0,18,461,1,0,0,0,20,472,1,0,0,0,22,
        485,1,0,0,0,24,498,1,0,0,0,26,511,1,0,0,0,28,514,1,0,0,0,30,523,
        1,0,0,0,32,535,1,0,0,0,34,544,1,0,0,0,36,555,1,0,0,0,38,562,1,0,
        0,0,40,595,1,0,0,0,42,597,1,0,0,0,44,618,1,0,0,0,46,635,1,0,0,0,
        48,640,1,0,0,0,50,649,1,0,0,0,52,668,1,0,0,0,54,670,1,0,0,0,56,672,
        1,0,0,0,58,692,1,0,0,0,60,709,1,0,0,0,62,727,1,0,0,0,64,738,1,0,
        0,0,66,756,1,0,0,0,68,768,1,0,0,0,70,786,1,0,0,0,72,811,1,0,0,0,
        74,836,1,0,0,0,76,838,1,0,0,0,78,855,1,0,0,0,80,872,1,0,0,0,82,889,
        1,0,0,0,84,898,1,0,0,0,86,908,1,0,0,0,88,918,1,0,0,0,90,929,1,0,
        0,0,92,936,1,0,0,0,94,941,1,0,0,0,96,945,1,0,0,0,98,981,1,0,0,0,
        100,983,1,0,0,0,102,989,1,0,0,0,104,1003,1,0,0,0,106,1014,1,0,0,
        0,108,1016,1,0,0,0,110,1047,1,0,0,0,112,1049,1,0,0,0,114,1058,1,
        0,0,0,116,1065,1,0,0,0,118,1075,1,0,0,0,120,1080,1,0,0,0,122,1086,
        1,0,0,0,124,1095,1,0,0,0,126,1105,1,0,0,0,128,1110,1,0,0,0,130,1115,
        1,0,0,0,132,1133,1,0,0,0,134,1135,1,0,0,0,136,1144,1,0,0,0,138,1174,
        1,0,0,0,140,1176,1,0,0,0,142,1185,1,0,0,0,144,1194,1,0,0,0,146,1199,
        1,0,0,0,148,1219,1,0,0,0,150,1221,1,0,0,0,152,1237,1,0,0,0,154,1245,
        1,0,0,0,156,1255,1,0,0,0,158,1269,1,0,0,0,160,1271,1,0,0,0,162,1276,
        1,0,0,0,164,1281,1,0,0,0,166,1286,1,0,0,0,168,1292,1,0,0,0,170,1300,
        1,0,0,0,172,1305,1,0,0,0,174,1315,1,0,0,0,176,1324,1,0,0,0,178,1326,
        1,0,0,0,180,1337,1,0,0,0,182,1339,1,0,0,0,184,1349,1,0,0,0,186,1358,
        1,0,0,0,188,1368,1,0,0,0,190,1373,1,0,0,0,192,1396,1,0,0,0,194,1428,
        1,0,0,0,196,1430,1,0,0,0,198,1439,1,0,0,0,200,1453,1,0,0,0,202,1464,
        1,0,0,0,204,1503,1,0,0,0,206,1505,1,0,0,0,208,1517,1,0,0,0,210,1529,
        1,0,0,0,212,1541,1,0,0,0,214,1552,1,0,0,0,216,1562,1,0,0,0,218,1573,
        1,0,0,0,220,1635,1,0,0,0,222,1637,1,0,0,0,224,1639,1,0,0,0,226,1641,
        1,0,0,0,228,1651,1,0,0,0,230,1662,1,0,0,0,232,1667,1,0,0,0,234,1673,
        1,0,0,0,236,1684,1,0,0,0,238,1698,1,0,0,0,240,1709,1,0,0,0,242,1720,
        1,0,0,0,244,1731,1,0,0,0,246,1742,1,0,0,0,248,1752,1,0,0,0,250,1762,
        1,0,0,0,252,1776,1,0,0,0,254,1787,1,0,0,0,256,1798,1,0,0,0,258,1809,
        1,0,0,0,260,1820,1,0,0,0,262,1831,1,0,0,0,264,1849,1,0,0,0,266,1861,
        1,0,0,0,268,1872,1,0,0,0,270,1887,1,0,0,0,272,1911,1,0,0,0,274,1920,
        1,0,0,0,276,1925,1,0,0,0,278,1932,1,0,0,0,280,1937,1,0,0,0,282,1949,
        1,0,0,0,284,1961,1,0,0,0,286,1968,1,0,0,0,288,1980,1,0,0,0,290,1983,
        1,0,0,0,292,1986,1,0,0,0,294,2000,1,0,0,0,296,2037,1,0,0,0,298,2039,
        1,0,0,0,300,2050,1,0,0,0,302,2060,1,0,0,0,304,2078,1,0,0,0,306,2107,
        1,0,0,0,308,2109,1,0,0,0,310,2119,1,0,0,0,312,2121,1,0,0,0,314,2137,
        1,0,0,0,316,2139,1,0,0,0,318,2145,1,0,0,0,320,2151,1,0,0,0,322,2156,
        1,0,0,0,324,2181,1,0,0,0,326,2183,1,0,0,0,328,2188,1,0,0,0,330,2193,
        1,0,0,0,332,2196,1,0,0,0,334,2199,1,0,0,0,336,2205,1,0,0,0,338,2211,
        1,0,0,0,340,2217,1,0,0,0,342,2221,1,0,0,0,344,2246,1,0,0,0,346,2259,
        1,0,0,0,348,2267,1,0,0,0,350,2269,1,0,0,0,352,2271,1,0,0,0,354,2288,
        1,0,0,0,356,2305,1,0,0,0,358,2318,1,0,0,0,360,2358,1,0,0,0,362,2360,
        1,0,0,0,364,2371,1,0,0,0,366,2380,1,0,0,0,368,369,5,2,0,0,369,373,
        5,8,0,0,370,372,3,2,1,0,371,370,1,0,0,0,372,375,1,0,0,0,373,371,
        1,0,0,0,373,374,1,0,0,0,374,376,1,0,0,0,375,373,1,0,0,0,376,377,
        5,3,0,0,377,1,1,0,0,0,378,396,3,6,3,0,379,396,3,10,5,0,380,396,3,
        12,6,0,381,396,3,14,7,0,382,396,3,18,9,0,383,396,3,20,10,0,384,396,
        3,22,11,0,385,396,3,24,12,0,386,396,3,236,118,0,387,396,3,250,125,
        0,388,396,3,28,14,0,389,396,3,30,15,0,390,396,3,34,17,0,391,396,
        3,42,21,0,392,396,3,38,19,0,393,396,3,128,64,0,394,396,3,74,37,0,
        395,378,1,0,0,0,395,379,1,0,0,0,395,380,1,0,0,0,395,381,1,0,0,0,
        395,382,1,0,0,0,395,383,1,0,0,0,395,384,1,0,0,0,395,385,1,0,0,0,
        395,386,1,0,0,0,395,387,1,0,0,0,395,388,1,0,0,0,395,389,1,0,0,0,
        395,390,1,0,0,0,395,391,1,0,0,0,395,392,1,0,0,0,395,393,1,0,0,0,
        395,394,1,0,0,0,396,3,1,0,0,0,397,406,3,20,10,0,398,406,3,22,11,
        0,399,406,3,24,12,0,400,406,3,236,118,0,401,406,3,42,21,0,402,406,
        3,30,15,0,403,406,3,34,17,0,404,406,3,28,14,0,405,397,1,0,0,0,405,
        398,1,0,0,0,405,399,1,0,0,0,405,400,1,0,0,0,405,401,1,0,0,0,405,
        402,1,0,0,0,405,403,1,0,0,0,405,404,1,0,0,0,406,5,1,0,0,0,407,408,
        5,2,0,0,408,409,5,20,0,0,409,410,5,174,0,0,410,414,3,8,4,0,411,413,
        3,74,37,0,412,411,1,0,0,0,413,416,1,0,0,0,414,412,1,0,0,0,414,415,
        1,0,0,0,415,417,1,0,0,0,416,414,1,0,0,0,417,418,5,3,0,0,418,7,1,
        0,0,0,419,423,5,2,0,0,420,422,5,174,0,0,421,420,1,0,0,0,422,425,
        1,0,0,0,423,421,1,0,0,0,423,424,1,0,0,0,424,428,1,0,0,0,425,423,
        1,0,0,0,426,427,5,87,0,0,427,429,5,174,0,0,428,426,1,0,0,0,428,429,
        1,0,0,0,429,430,1,0,0,0,430,431,5,3,0,0,431,9,1,0,0,0,432,433,5,
        2,0,0,433,434,5,21,0,0,434,435,3,20,10,0,435,436,5,3,0,0,436,443,
        1,0,0,0,437,438,5,2,0,0,438,439,5,21,0,0,439,440,3,24,12,0,440,441,
        5,3,0,0,441,443,1,0,0,0,442,432,1,0,0,0,442,437,1,0,0,0,443,11,1,
        0,0,0,444,445,5,2,0,0,445,446,5,5,0,0,446,447,5,174,0,0,447,448,
        5,168,0,0,448,449,5,3,0,0,449,13,1,0,0,0,450,451,5,2,0,0,451,453,
        5,6,0,0,452,454,3,16,8,0,453,452,1,0,0,0,454,455,1,0,0,0,455,453,
        1,0,0,0,455,456,1,0,0,0,456,457,1,0,0,0,457,458,5,3,0,0,458,15,1,
        0,0,0,459,460,5,174,0,0,460,17,1,0,0,0,461,462,5,2,0,0,462,463,5,
        7,0,0,463,467,5,174,0,0,464,466,5,174,0,0,465,464,1,0,0,0,466,469,
        1,0,0,0,467,465,1,0,0,0,467,468,1,0,0,0,468,470,1,0,0,0,469,467,
        1,0,0,0,470,471,5,3,0,0,471,19,1,0,0,0,472,473,5,2,0,0,473,477,5,
        9,0,0,474,476,3,26,13,0,475,474,1,0,0,0,476,479,1,0,0,0,477,475,
        1,0,0,0,477,478,1,0,0,0,478,480,1,0,0,0,479,477,1,0,0,0,480,481,
        5,2,0,0,481,482,3,130,65,0,482,483,5,3,0,0,483,484,5,3,0,0,484,21,
        1,0,0,0,485,486,5,2,0,0,486,490,5,10,0,0,487,489,3,26,13,0,488,487,
        1,0,0,0,489,492,1,0,0,0,490,488,1,0,0,0,490,491,1,0,0,0,491,493,
        1,0,0,0,492,490,1,0,0,0,493,494,5,2,0,0,494,495,3,130,65,0,495,496,
        5,3,0,0,496,497,5,3,0,0,497,23,1,0,0,0,498,499,5,2,0,0,499,503,5,
        11,0,0,500,502,3,26,13,0,501,500,1,0,0,0,502,505,1,0,0,0,503,501,
        1,0,0,0,503,504,1,0,0,0,504,506,1,0,0,0,505,503,1,0,0,0,506,507,
        5,2,0,0,507,508,3,130,65,0,508,509,5,3,0,0,509,510,5,3,0,0,510,25,
        1,0,0,0,511,512,5,116,0,0,512,513,5,174,0,0,513,27,1,0,0,0,514,515,
        5,2,0,0,515,516,5,94,0,0,516,518,5,174,0,0,517,519,3,184,92,0,518,
        517,1,0,0,0,518,519,1,0,0,0,519,520,1,0,0,0,520,521,3,138,69,0,521,
        522,5,3,0,0,522,29,1,0,0,0,523,524,5,2,0,0,524,525,5,95,0,0,525,
        527,5,174,0,0,526,528,3,184,92,0,527,526,1,0,0,0,527,528,1,0,0,0,
        528,530,1,0,0,0,529,531,3,32,16,0,530,529,1,0,0,0,530,531,1,0,0,
        0,531,532,1,0,0,0,532,533,3,154,77,0,533,534,5,3,0,0,534,31,1,0,
        0,0,535,536,5,2,0,0,536,538,5,92,0,0,537,539,3,138,69,0,538,537,
        1,0,0,0,539,540,1,0,0,0,540,538,1,0,0,0,540,541,1,0,0,0,541,542,
        1,0,0,0,542,543,5,3,0,0,543,33,1,0,0,0,544,545,5,2,0,0,545,546,5,
        96,0,0,546,550,5,174,0,0,547,549,3,36,18,0,548,547,1,0,0,0,549,552,
        1,0,0,0,550,548,1,0,0,0,550,551,1,0,0,0,551,553,1,0,0,0,552,550,
        1,0,0,0,553,554,5,3,0,0,554,35,1,0,0,0,555,556,5,2,0,0,556,558,5,
        174,0,0,557,559,7,0,0,0,558,557,1,0,0,0,558,559,1,0,0,0,559,560,
        1,0,0,0,560,561,5,3,0,0,561,37,1,0,0,0,562,563,5,2,0,0,563,564,5,
        73,0,0,564,566,5,174,0,0,565,567,5,174,0,0,566,565,1,0,0,0,567,568,
        1,0,0,0,568,566,1,0,0,0,568,569,1,0,0,0,569,571,1,0,0,0,570,572,
        3,40,20,0,571,570,1,0,0,0,571,572,1,0,0,0,572,573,1,0,0,0,573,574,
        5,3,0,0,574,39,1,0,0,0,575,576,5,102,0,0,576,577,5,174,0,0,577,581,
        5,2,0,0,578,580,5,174,0,0,579,578,1,0,0,0,580,583,1,0,0,0,581,579,
        1,0,0,0,581,582,1,0,0,0,582,584,1,0,0,0,583,581,1,0,0,0,584,596,
        5,3,0,0,585,586,5,102,0,0,586,587,5,57,0,0,587,591,5,2,0,0,588,590,
        5,174,0,0,589,588,1,0,0,0,590,593,1,0,0,0,591,589,1,0,0,0,591,592,
        1,0,0,0,592,594,1,0,0,0,593,591,1,0,0,0,594,596,5,3,0,0,595,575,
        1,0,0,0,595,585,1,0,0,0,596,41,1,0,0,0,597,598,5,2,0,0,598,602,5,
        64,0,0,599,601,3,54,27,0,600,599,1,0,0,0,601,604,1,0,0,0,602,600,
        1,0,0,0,602,603,1,0,0,0,603,605,1,0,0,0,604,602,1,0,0,0,605,607,
        5,174,0,0,606,608,3,184,92,0,607,606,1,0,0,0,607,608,1,0,0,0,608,
        610,1,0,0,0,609,611,3,46,23,0,610,609,1,0,0,0,610,611,1,0,0,0,611,
        613,1,0,0,0,612,614,3,48,24,0,613,612,1,0,0,0,613,614,1,0,0,0,614,
        615,1,0,0,0,615,616,3,50,25,0,616,617,5,3,0,0,617,43,1,0,0,0,618,
        619,5,2,0,0,619,623,5,64,0,0,620,622,3,54,27,0,621,620,1,0,0,0,622,
        625,1,0,0,0,623,621,1,0,0,0,623,624,1,0,0,0,624,627,1,0,0,0,625,
        623,1,0,0,0,626,628,3,46,23,0,627,626,1,0,0,0,627,628,1,0,0,0,628,
        630,1,0,0,0,629,631,3,48,24,0,630,629,1,0,0,0,630,631,1,0,0,0,631,
        632,1,0,0,0,632,633,3,50,25,0,633,634,5,3,0,0,634,45,1,0,0,0,635,
        636,5,2,0,0,636,637,5,92,0,0,637,638,3,138,69,0,638,639,5,3,0,0,
        639,47,1,0,0,0,640,641,5,2,0,0,641,643,5,72,0,0,642,644,3,138,69,
        0,643,642,1,0,0,0,644,645,1,0,0,0,645,643,1,0,0,0,645,646,1,0,0,
        0,646,647,1,0,0,0,647,648,5,3,0,0,648,49,1,0,0,0,649,650,5,2,0,0,
        650,654,5,60,0,0,651,653,3,52,26,0,652,651,1,0,0,0,653,656,1,0,0,
        0,654,652,1,0,0,0,654,655,1,0,0,0,655,657,1,0,0,0,656,654,1,0,0,
        0,657,658,5,3,0,0,658,51,1,0,0,0,659,669,3,56,28,0,660,669,3,62,
        31,0,661,669,3,64,32,0,662,669,3,66,33,0,663,669,3,68,34,0,664,669,
        3,70,35,0,665,669,3,262,131,0,666,669,3,264,132,0,667,669,3,266,
        133,0,668,659,1,0,0,0,668,660,1,0,0,0,668,661,1,0,0,0,668,662,1,
        0,0,0,668,663,1,0,0,0,668,664,1,0,0,0,668,665,1,0,0,0,668,666,1,
        0,0,0,668,667,1,0,0,0,669,53,1,0,0,0,670,671,7,1,0,0,671,55,1,0,
        0,0,672,673,5,2,0,0,673,677,5,65,0,0,674,676,3,54,27,0,675,674,1,
        0,0,0,676,679,1,0,0,0,677,675,1,0,0,0,677,678,1,0,0,0,678,680,1,
        0,0,0,679,677,1,0,0,0,680,681,5,2,0,0,681,684,5,174,0,0,682,683,
        5,102,0,0,683,685,3,138,69,0,684,682,1,0,0,0,684,685,1,0,0,0,685,
        686,1,0,0,0,686,688,5,3,0,0,687,689,3,220,110,0,688,687,1,0,0,0,
        688,689,1,0,0,0,689,690,1,0,0,0,690,691,5,3,0,0,691,57,1,0,0,0,692,
        696,5,2,0,0,693,695,3,54,27,0,694,693,1,0,0,0,695,698,1,0,0,0,696,
        694,1,0,0,0,696,697,1,0,0,0,697,699,1,0,0,0,698,696,1,0,0,0,699,
        701,5,174,0,0,700,702,5,98,0,0,701,700,1,0,0,0,701,702,1,0,0,0,702,
        705,1,0,0,0,703,704,5,102,0,0,704,706,3,138,69,0,705,703,1,0,0,0,
        705,706,1,0,0,0,706,707,1,0,0,0,707,708,5,3,0,0,708,59,1,0,0,0,709,
        720,5,2,0,0,710,717,3,58,29,0,711,713,5,4,0,0,712,711,1,0,0,0,712,
        713,1,0,0,0,713,714,1,0,0,0,714,716,3,58,29,0,715,712,1,0,0,0,716,
        719,1,0,0,0,717,715,1,0,0,0,717,718,1,0,0,0,718,721,1,0,0,0,719,
        717,1,0,0,0,720,710,1,0,0,0,720,721,1,0,0,0,721,722,1,0,0,0,722,
        725,5,3,0,0,723,724,5,102,0,0,724,726,3,138,69,0,725,723,1,0,0,0,
        725,726,1,0,0,0,726,61,1,0,0,0,727,728,5,2,0,0,728,729,5,67,0,0,
        729,733,3,60,30,0,730,732,3,74,37,0,731,730,1,0,0,0,732,735,1,0,
        0,0,733,731,1,0,0,0,733,734,1,0,0,0,734,736,1,0,0,0,735,733,1,0,
        0,0,736,737,5,3,0,0,737,63,1,0,0,0,738,739,5,2,0,0,739,743,5,17,
        0,0,740,742,3,54,27,0,741,740,1,0,0,0,742,745,1,0,0,0,743,741,1,
        0,0,0,743,744,1,0,0,0,744,746,1,0,0,0,745,743,1,0,0,0,746,747,3,
        72,36,0,747,751,3,360,180,0,748,750,3,74,37,0,749,748,1,0,0,0,750,
        753,1,0,0,0,751,749,1,0,0,0,751,752,1,0,0,0,752,754,1,0,0,0,753,
        751,1,0,0,0,754,755,5,3,0,0,755,65,1,0,0,0,756,757,5,2,0,0,757,761,
        5,63,0,0,758,760,3,54,27,0,759,758,1,0,0,0,760,763,1,0,0,0,761,759,
        1,0,0,0,761,762,1,0,0,0,762,764,1,0,0,0,763,761,1,0,0,0,764,765,
        3,72,36,0,765,766,3,360,180,0,766,767,5,3,0,0,767,67,1,0,0,0,768,
        769,5,2,0,0,769,773,5,70,0,0,770,772,3,54,27,0,771,770,1,0,0,0,772,
        775,1,0,0,0,773,771,1,0,0,0,773,774,1,0,0,0,774,776,1,0,0,0,775,
        773,1,0,0,0,776,777,3,72,36,0,777,781,3,360,180,0,778,780,3,74,37,
        0,779,778,1,0,0,0,780,783,1,0,0,0,781,779,1,0,0,0,781,782,1,0,0,
        0,782,784,1,0,0,0,783,781,1,0,0,0,784,785,5,3,0,0,785,69,1,0,0,0,
        786,787,5,2,0,0,787,791,5,71,0,0,788,790,3,54,27,0,789,788,1,0,0,
        0,790,793,1,0,0,0,791,789,1,0,0,0,791,792,1,0,0,0,792,794,1,0,0,
        0,793,791,1,0,0,0,794,795,3,72,36,0,795,799,3,360,180,0,796,798,
        3,74,37,0,797,796,1,0,0,0,798,801,1,0,0,0,799,797,1,0,0,0,799,800,
        1,0,0,0,800,802,1,0,0,0,801,799,1,0,0,0,802,803,5,3,0,0,803,71,1,
        0,0,0,804,812,5,174,0,0,805,812,5,70,0,0,806,812,5,71,0,0,807,808,
        5,126,0,0,808,809,3,220,110,0,809,810,5,127,0,0,810,812,1,0,0,0,
        811,804,1,0,0,0,811,805,1,0,0,0,811,806,1,0,0,0,811,807,1,0,0,0,
        812,73,1,0,0,0,813,837,3,76,38,0,814,837,3,78,39,0,815,837,3,80,
        40,0,816,837,3,82,41,0,817,837,3,88,44,0,818,837,3,212,106,0,819,
        837,3,90,45,0,820,837,3,92,46,0,821,837,3,94,47,0,822,837,3,96,48,
        0,823,837,3,98,49,0,824,837,3,100,50,0,825,837,3,106,53,0,826,837,
        3,198,99,0,827,837,3,204,102,0,828,837,3,206,103,0,829,837,3,208,
        104,0,830,837,3,210,105,0,831,837,3,192,96,0,832,837,3,194,97,0,
        833,837,3,196,98,0,834,837,3,354,177,0,835,837,3,220,110,0,836,813,
        1,0,0,0,836,814,1,0,0,0,836,815,1,0,0,0,836,816,1,0,0,0,836,817,
        1,0,0,0,836,818,1,0,0,0,836,819,1,0,0,0,836,820,1,0,0,0,836,821,
        1,0,0,0,836,822,1,0,0,0,836,823,1,0,0,0,836,824,1,0,0,0,836,825,
        1,0,0,0,836,826,1,0,0,0,836,827,1,0,0,0,836,828,1,0,0,0,836,829,
        1,0,0,0,836,830,1,0,0,0,836,831,1,0,0,0,836,832,1,0,0,0,836,833,
        1,0,0,0,836,834,1,0,0,0,836,835,1,0,0,0,837,75,1,0,0,0,838,839,5,
        2,0,0,839,840,5,9,0,0,840,842,5,2,0,0,841,843,3,130,65,0,842,841,
        1,0,0,0,843,844,1,0,0,0,844,842,1,0,0,0,844,845,1,0,0,0,845,846,
        1,0,0,0,846,850,5,3,0,0,847,849,3,74,37,0,848,847,1,0,0,0,849,852,
        1,0,0,0,850,848,1,0,0,0,850,851,1,0,0,0,851,853,1,0,0,0,852,850,
        1,0,0,0,853,854,5,3,0,0,854,77,1,0,0,0,855,856,5,2,0,0,856,857,5,
        10,0,0,857,859,5,2,0,0,858,860,3,130,65,0,859,858,1,0,0,0,860,861,
        1,0,0,0,861,859,1,0,0,0,861,862,1,0,0,0,862,863,1,0,0,0,863,867,
        5,3,0,0,864,866,3,74,37,0,865,864,1,0,0,0,866,869,1,0,0,0,867,865,
        1,0,0,0,867,868,1,0,0,0,868,870,1,0,0,0,869,867,1,0,0,0,870,871,
        5,3,0,0,871,79,1,0,0,0,872,873,5,2,0,0,873,874,5,11,0,0,874,876,
        5,2,0,0,875,877,3,130,65,0,876,875,1,0,0,0,877,878,1,0,0,0,878,876,
        1,0,0,0,878,879,1,0,0,0,879,880,1,0,0,0,880,884,5,3,0,0,881,883,
        3,74,37,0,882,881,1,0,0,0,883,886,1,0,0,0,884,882,1,0,0,0,884,885,
        1,0,0,0,885,887,1,0,0,0,886,884,1,0,0,0,887,888,5,3,0,0,888,81,1,
        0,0,0,889,890,5,2,0,0,890,891,5,23,0,0,891,892,3,220,110,0,892,894,
        3,84,42,0,893,895,3,86,43,0,894,893,1,0,0,0,894,895,1,0,0,0,895,
        896,1,0,0,0,896,897,5,3,0,0,897,83,1,0,0,0,898,899,5,2,0,0,899,903,
        5,25,0,0,900,902,3,74,37,0,901,900,1,0,0,0,902,905,1,0,0,0,903,901,
        1,0,0,0,903,904,1,0,0,0,904,906,1,0,0,0,905,903,1,0,0,0,906,907,
        5,3,0,0,907,85,1,0,0,0,908,909,5,2,0,0,909,913,5,125,0,0,910,912,
        3,74,37,0,911,910,1,0,0,0,912,915,1,0,0,0,913,911,1,0,0,0,913,914,
        1,0,0,0,914,916,1,0,0,0,915,913,1,0,0,0,916,917,5,3,0,0,917,87,1,
        0,0,0,918,919,5,2,0,0,919,920,5,24,0,0,920,924,3,220,110,0,921,923,
        3,74,37,0,922,921,1,0,0,0,923,926,1,0,0,0,924,922,1,0,0,0,924,925,
        1,0,0,0,925,927,1,0,0,0,926,924,1,0,0,0,927,928,5,3,0,0,928,89,1,
        0,0,0,929,930,5,2,0,0,930,932,5,26,0,0,931,933,3,220,110,0,932,931,
        1,0,0,0,932,933,1,0,0,0,933,934,1,0,0,0,934,935,5,3,0,0,935,91,1,
        0,0,0,936,937,5,2,0,0,937,938,5,27,0,0,938,939,3,220,110,0,939,940,
        5,3,0,0,940,93,1,0,0,0,941,942,5,2,0,0,942,943,5,28,0,0,943,944,
        5,3,0,0,944,95,1,0,0,0,945,946,5,2,0,0,946,947,5,29,0,0,947,948,
        5,3,0,0,948,97,1,0,0,0,949,950,5,2,0,0,950,952,5,47,0,0,951,953,
        3,294,147,0,952,951,1,0,0,0,952,953,1,0,0,0,953,954,1,0,0,0,954,
        955,5,168,0,0,955,982,5,3,0,0,956,957,5,2,0,0,957,958,5,47,0,0,958,
        959,3,134,67,0,959,960,5,168,0,0,960,961,5,3,0,0,961,982,1,0,0,0,
        962,963,5,2,0,0,963,964,5,47,0,0,964,965,5,174,0,0,965,966,5,168,
        0,0,966,982,5,3,0,0,967,968,5,2,0,0,968,969,5,47,0,0,969,970,5,174,
        0,0,970,971,3,134,67,0,971,972,5,168,0,0,972,973,5,3,0,0,973,982,
        1,0,0,0,974,975,5,2,0,0,975,976,5,47,0,0,976,977,5,149,0,0,977,978,
        5,58,0,0,978,979,5,174,0,0,979,980,5,168,0,0,980,982,5,3,0,0,981,
        949,1,0,0,0,981,956,1,0,0,0,981,962,1,0,0,0,981,967,1,0,0,0,981,
        974,1,0,0,0,982,99,1,0,0,0,983,984,5,2,0,0,984,985,5,163,0,0,985,
        986,3,102,51,0,986,987,5,168,0,0,987,988,5,3,0,0,988,101,1,0,0,0,
        989,990,5,2,0,0,990,992,5,174,0,0,991,993,3,104,52,0,992,991,1,0,
        0,0,993,994,1,0,0,0,994,992,1,0,0,0,994,995,1,0,0,0,995,996,1,0,
        0,0,996,997,5,3,0,0,997,103,1,0,0,0,998,1004,5,174,0,0,999,1000,
        5,2,0,0,1000,1001,5,174,0,0,1001,1002,5,174,0,0,1002,1004,5,3,0,
        0,1003,998,1,0,0,0,1003,999,1,0,0,0,1004,105,1,0,0,0,1005,1015,3,
        108,54,0,1006,1015,3,110,55,0,1007,1015,3,112,56,0,1008,1015,3,120,
        60,0,1009,1015,3,116,58,0,1010,1015,3,118,59,0,1011,1015,3,122,61,
        0,1012,1015,3,124,62,0,1013,1015,3,126,63,0,1014,1005,1,0,0,0,1014,
        1006,1,0,0,0,1014,1007,1,0,0,0,1014,1008,1,0,0,0,1014,1009,1,0,0,
        0,1014,1010,1,0,0,0,1014,1011,1,0,0,0,1014,1012,1,0,0,0,1014,1013,
        1,0,0,0,1015,107,1,0,0,0,1016,1017,5,2,0,0,1017,1018,5,157,0,0,1018,
        1019,5,174,0,0,1019,1020,3,220,110,0,1020,1021,5,3,0,0,1021,109,
        1,0,0,0,1022,1023,5,2,0,0,1023,1024,5,158,0,0,1024,1025,3,42,21,
        0,1025,1026,5,3,0,0,1026,1048,1,0,0,0,1027,1028,5,2,0,0,1028,1029,
        5,158,0,0,1029,1030,3,44,22,0,1030,1031,5,3,0,0,1031,1048,1,0,0,
        0,1032,1033,5,2,0,0,1033,1034,5,158,0,0,1034,1035,3,20,10,0,1035,
        1036,5,3,0,0,1036,1048,1,0,0,0,1037,1038,5,2,0,0,1038,1039,5,158,
        0,0,1039,1040,3,24,12,0,1040,1041,5,3,0,0,1041,1048,1,0,0,0,1042,
        1043,5,2,0,0,1043,1044,5,158,0,0,1044,1045,3,220,110,0,1045,1046,
        5,3,0,0,1046,1048,1,0,0,0,1047,1022,1,0,0,0,1047,1027,1,0,0,0,1047,
        1032,1,0,0,0,1047,1037,1,0,0,0,1047,1042,1,0,0,0,1048,111,1,0,0,
        0,1049,1050,5,2,0,0,1050,1052,5,159,0,0,1051,1053,3,114,57,0,1052,
        1051,1,0,0,0,1053,1054,1,0,0,0,1054,1052,1,0,0,0,1054,1055,1,0,0,
        0,1055,1056,1,0,0,0,1056,1057,5,3,0,0,1057,113,1,0,0,0,1058,1059,
        5,2,0,0,1059,1061,5,174,0,0,1060,1062,5,174,0,0,1061,1060,1,0,0,
        0,1061,1062,1,0,0,0,1062,1063,1,0,0,0,1063,1064,5,3,0,0,1064,115,
        1,0,0,0,1065,1066,5,2,0,0,1066,1067,5,161,0,0,1067,1069,5,168,0,
        0,1068,1070,3,114,57,0,1069,1068,1,0,0,0,1070,1071,1,0,0,0,1071,
        1069,1,0,0,0,1071,1072,1,0,0,0,1072,1073,1,0,0,0,1073,1074,5,3,0,
        0,1074,117,1,0,0,0,1075,1076,5,2,0,0,1076,1077,5,162,0,0,1077,1078,
        5,168,0,0,1078,1079,5,3,0,0,1079,119,1,0,0,0,1080,1081,5,2,0,0,1081,
        1082,5,160,0,0,1082,1083,5,168,0,0,1083,1084,5,168,0,0,1084,1085,
        5,3,0,0,1085,121,1,0,0,0,1086,1087,5,2,0,0,1087,1089,5,166,0,0,1088,
        1090,3,114,57,0,1089,1088,1,0,0,0,1090,1091,1,0,0,0,1091,1089,1,
        0,0,0,1091,1092,1,0,0,0,1092,1093,1,0,0,0,1093,1094,5,3,0,0,1094,
        123,1,0,0,0,1095,1096,5,2,0,0,1096,1097,5,165,0,0,1097,1099,5,168,
        0,0,1098,1100,3,114,57,0,1099,1098,1,0,0,0,1100,1101,1,0,0,0,1101,
        1099,1,0,0,0,1101,1102,1,0,0,0,1102,1103,1,0,0,0,1103,1104,5,3,0,
        0,1104,125,1,0,0,0,1105,1106,5,2,0,0,1106,1107,5,164,0,0,1107,1108,
        5,168,0,0,1108,1109,5,3,0,0,1109,127,1,0,0,0,1110,1111,5,2,0,0,1111,
        1112,5,157,0,0,1112,1113,3,4,2,0,1113,1114,5,3,0,0,1114,129,1,0,
        0,0,1115,1116,5,2,0,0,1116,1119,5,174,0,0,1117,1118,5,102,0,0,1118,
        1120,3,138,69,0,1119,1117,1,0,0,0,1119,1120,1,0,0,0,1120,1121,1,
        0,0,0,1121,1122,3,220,110,0,1122,1123,5,3,0,0,1123,131,1,0,0,0,1124,
        1125,5,2,0,0,1125,1128,5,174,0,0,1126,1127,5,102,0,0,1127,1129,3,
        138,69,0,1128,1126,1,0,0,0,1128,1129,1,0,0,0,1129,1130,1,0,0,0,1130,
        1134,5,3,0,0,1131,1134,3,134,67,0,1132,1134,3,136,68,0,1133,1124,
        1,0,0,0,1133,1131,1,0,0,0,1133,1132,1,0,0,0,1134,133,1,0,0,0,1135,
        1139,5,142,0,0,1136,1138,5,174,0,0,1137,1136,1,0,0,0,1138,1141,1,
        0,0,0,1139,1137,1,0,0,0,1139,1140,1,0,0,0,1140,1142,1,0,0,0,1141,
        1139,1,0,0,0,1142,1143,5,143,0,0,1143,135,1,0,0,0,1144,1148,5,126,
        0,0,1145,1147,5,174,0,0,1146,1145,1,0,0,0,1147,1150,1,0,0,0,1148,
        1146,1,0,0,0,1148,1149,1,0,0,0,1149,1151,1,0,0,0,1150,1148,1,0,0,
        0,1151,1152,5,127,0,0,1152,137,1,0,0,0,1153,1175,5,174,0,0,1154,
        1175,5,100,0,0,1155,1175,5,101,0,0,1156,1175,5,33,0,0,1157,1158,
        5,142,0,0,1158,1175,5,143,0,0,1159,1175,3,140,70,0,1160,1175,3,142,
        71,0,1161,1175,3,144,72,0,1162,1175,3,146,73,0,1163,1175,3,150,75,
        0,1164,1175,3,154,77,0,1165,1175,3,160,80,0,1166,1175,3,162,81,0,
        1167,1175,3,164,82,0,1168,1175,3,166,83,0,1169,1175,3,168,84,0,1170,
        1175,3,170,85,0,1171,1175,3,172,86,0,1172,1175,3,178,89,0,1173,1175,
        3,182,91,0,1174,1153,1,0,0,0,1174,1154,1,0,0,0,1174,1155,1,0,0,0,
        1174,1156,1,0,0,0,1174,1157,1,0,0,0,1174,1159,1,0,0,0,1174,1160,
        1,0,0,0,1174,1161,1,0,0,0,1174,1162,1,0,0,0,1174,1163,1,0,0,0,1174,
        1164,1,0,0,0,1174,1165,1,0,0,0,1174,1166,1,0,0,0,1174,1167,1,0,0,
        0,1174,1168,1,0,0,0,1174,1169,1,0,0,0,1174,1170,1,0,0,0,1174,1171,
        1,0,0,0,1174,1172,1,0,0,0,1174,1173,1,0,0,0,1175,139,1,0,0,0,1176,
        1177,5,2,0,0,1177,1179,5,75,0,0,1178,1180,3,138,69,0,1179,1178,1,
        0,0,0,1180,1181,1,0,0,0,1181,1179,1,0,0,0,1181,1182,1,0,0,0,1182,
        1183,1,0,0,0,1183,1184,5,3,0,0,1184,141,1,0,0,0,1185,1186,5,2,0,
        0,1186,1188,5,76,0,0,1187,1189,3,138,69,0,1188,1187,1,0,0,0,1189,
        1190,1,0,0,0,1190,1188,1,0,0,0,1190,1191,1,0,0,0,1191,1192,1,0,0,
        0,1192,1193,5,3,0,0,1193,143,1,0,0,0,1194,1195,5,2,0,0,1195,1196,
        5,34,0,0,1196,1197,3,138,69,0,1197,1198,5,3,0,0,1198,145,1,0,0,0,
        1199,1200,5,2,0,0,1200,1202,5,77,0,0,1201,1203,3,148,74,0,1202,1201,
        1,0,0,0,1203,1204,1,0,0,0,1204,1202,1,0,0,0,1204,1205,1,0,0,0,1205,
        1206,1,0,0,0,1206,1207,5,3,0,0,1207,147,1,0,0,0,1208,1209,5,2,0,
        0,1209,1210,5,87,0,0,1210,1211,3,138,69,0,1211,1212,5,3,0,0,1212,
        1220,1,0,0,0,1213,1214,5,2,0,0,1214,1215,5,174,0,0,1215,1216,3,138,
        69,0,1216,1217,5,3,0,0,1217,1220,1,0,0,0,1218,1220,3,138,69,0,1219,
        1208,1,0,0,0,1219,1213,1,0,0,0,1219,1218,1,0,0,0,1220,149,1,0,0,
        0,1221,1222,5,2,0,0,1222,1224,5,78,0,0,1223,1225,3,184,92,0,1224,
        1223,1,0,0,0,1224,1225,1,0,0,0,1225,1226,1,0,0,0,1226,1230,5,2,0,
        0,1227,1229,3,152,76,0,1228,1227,1,0,0,0,1229,1232,1,0,0,0,1230,
        1228,1,0,0,0,1230,1231,1,0,0,0,1231,1233,1,0,0,0,1232,1230,1,0,0,
        0,1233,1234,5,3,0,0,1234,1235,3,138,69,0,1235,1236,5,3,0,0,1236,
        151,1,0,0,0,1237,1238,5,2,0,0,1238,1240,5,174,0,0,1239,1241,5,98,
        0,0,1240,1239,1,0,0,0,1240,1241,1,0,0,0,1241,1242,1,0,0,0,1242,1243,
        3,138,69,0,1243,1244,5,3,0,0,1244,153,1,0,0,0,1245,1246,5,2,0,0,
        1246,1250,5,174,0,0,1247,1249,3,156,78,0,1248,1247,1,0,0,0,1249,
        1252,1,0,0,0,1250,1248,1,0,0,0,1250,1251,1,0,0,0,1251,1253,1,0,0,
        0,1252,1250,1,0,0,0,1253,1254,5,3,0,0,1254,155,1,0,0,0,1255,1259,
        5,2,0,0,1256,1258,3,158,79,0,1257,1256,1,0,0,0,1258,1261,1,0,0,0,
        1259,1257,1,0,0,0,1259,1260,1,0,0,0,1260,1262,1,0,0,0,1261,1259,
        1,0,0,0,1262,1264,5,174,0,0,1263,1265,5,98,0,0,1264,1263,1,0,0,0,
        1264,1265,1,0,0,0,1265,1266,1,0,0,0,1266,1267,3,138,69,0,1267,1268,
        5,3,0,0,1268,157,1,0,0,0,1269,1270,5,88,0,0,1270,159,1,0,0,0,1271,
        1272,5,2,0,0,1272,1273,5,79,0,0,1273,1274,7,2,0,0,1274,1275,5,3,
        0,0,1275,161,1,0,0,0,1276,1277,5,2,0,0,1277,1278,5,80,0,0,1278,1279,
        3,138,69,0,1279,1280,5,3,0,0,1280,163,1,0,0,0,1281,1282,5,2,0,0,
        1282,1283,5,81,0,0,1283,1284,5,174,0,0,1284,1285,5,3,0,0,1285,165,
        1,0,0,0,1286,1287,5,2,0,0,1287,1288,5,40,0,0,1288,1289,3,138,69,
        0,1289,1290,3,138,69,0,1290,1291,5,3,0,0,1291,167,1,0,0,0,1292,1293,
        5,2,0,0,1293,1294,5,32,0,0,1294,1295,3,138,69,0,1295,1296,3,138,
        69,0,1296,1297,3,138,69,0,1297,1298,3,138,69,0,1298,1299,5,3,0,0,
        1299,169,1,0,0,0,1300,1301,5,2,0,0,1301,1302,5,83,0,0,1302,1303,
        5,174,0,0,1303,1304,5,3,0,0,1304,171,1,0,0,0,1305,1306,5,2,0,0,1306,
        1307,5,84,0,0,1307,1308,5,174,0,0,1308,1310,3,138,69,0,1309,1311,
        3,174,87,0,1310,1309,1,0,0,0,1310,1311,1,0,0,0,1311,1312,1,0,0,0,
        1312,1313,3,138,69,0,1313,1314,5,3,0,0,1314,173,1,0,0,0,1315,1316,
        5,2,0,0,1316,1318,5,97,0,0,1317,1319,3,176,88,0,1318,1317,1,0,0,
        0,1319,1320,1,0,0,0,1320,1318,1,0,0,0,1320,1321,1,0,0,0,1321,1322,
        1,0,0,0,1322,1323,5,3,0,0,1323,175,1,0,0,0,1324,1325,7,3,0,0,1325,
        177,1,0,0,0,1326,1327,5,2,0,0,1327,1329,5,85,0,0,1328,1330,3,180,
        90,0,1329,1328,1,0,0,0,1330,1331,1,0,0,0,1331,1329,1,0,0,0,1331,
        1332,1,0,0,0,1332,1333,1,0,0,0,1333,1334,5,3,0,0,1334,179,1,0,0,
        0,1335,1338,5,168,0,0,1336,1338,3,138,69,0,1337,1335,1,0,0,0,1337,
        1336,1,0,0,0,1338,181,1,0,0,0,1339,1340,5,2,0,0,1340,1341,5,91,0,
        0,1341,1343,3,138,69,0,1342,1344,3,138,69,0,1343,1342,1,0,0,0,1344,
        1345,1,0,0,0,1345,1343,1,0,0,0,1345,1346,1,0,0,0,1346,1347,1,0,0,
        0,1347,1348,5,3,0,0,1348,183,1,0,0,0,1349,1350,5,2,0,0,1350,1352,
        5,89,0,0,1351,1353,3,186,93,0,1352,1351,1,0,0,0,1353,1354,1,0,0,
        0,1354,1352,1,0,0,0,1354,1355,1,0,0,0,1355,1356,1,0,0,0,1356,1357,
        5,3,0,0,1357,185,1,0,0,0,1358,1359,5,2,0,0,1359,1361,5,174,0,0,1360,
        1362,3,188,94,0,1361,1360,1,0,0,0,1361,1362,1,0,0,0,1362,1364,1,
        0,0,0,1363,1365,3,190,95,0,1364,1363,1,0,0,0,1364,1365,1,0,0,0,1365,
        1366,1,0,0,0,1366,1367,5,3,0,0,1367,187,1,0,0,0,1368,1369,5,2,0,
        0,1369,1370,5,92,0,0,1370,1371,3,138,69,0,1371,1372,5,3,0,0,1372,
        189,1,0,0,0,1373,1374,5,2,0,0,1374,1375,5,50,0,0,1375,1376,3,138,
        69,0,1376,1377,5,3,0,0,1377,191,1,0,0,0,1378,1379,5,2,0,0,1379,1380,
        5,30,0,0,1380,1381,5,174,0,0,1381,1382,3,220,110,0,1382,1383,5,3,
        0,0,1383,1397,1,0,0,0,1384,1385,5,2,0,0,1385,1386,5,30,0,0,1386,
        1387,3,314,157,0,1387,1388,3,220,110,0,1388,1389,5,3,0,0,1389,1397,
        1,0,0,0,1390,1391,5,2,0,0,1391,1392,5,30,0,0,1392,1393,3,318,159,
        0,1393,1394,3,220,110,0,1394,1395,5,3,0,0,1395,1397,1,0,0,0,1396,
        1378,1,0,0,0,1396,1384,1,0,0,0,1396,1390,1,0,0,0,1397,193,1,0,0,
        0,1398,1399,5,2,0,0,1399,1400,5,136,0,0,1400,1401,5,174,0,0,1401,
        1402,3,220,110,0,1402,1403,5,3,0,0,1403,1429,1,0,0,0,1404,1405,5,
        2,0,0,1405,1406,5,137,0,0,1406,1407,5,174,0,0,1407,1408,3,220,110,
        0,1408,1409,5,3,0,0,1409,1429,1,0,0,0,1410,1411,5,2,0,0,1411,1412,
        5,138,0,0,1412,1413,5,174,0,0,1413,1414,3,220,110,0,1414,1415,5,
        3,0,0,1415,1429,1,0,0,0,1416,1417,5,2,0,0,1417,1418,5,139,0,0,1418,
        1419,5,174,0,0,1419,1420,3,220,110,0,1420,1421,5,3,0,0,1421,1429,
        1,0,0,0,1422,1423,5,2,0,0,1423,1424,5,140,0,0,1424,1425,5,174,0,
        0,1425,1426,3,220,110,0,1426,1427,5,3,0,0,1427,1429,1,0,0,0,1428,
        1398,1,0,0,0,1428,1404,1,0,0,0,1428,1410,1,0,0,0,1428,1416,1,0,0,
        0,1428,1422,1,0,0,0,1429,195,1,0,0,0,1430,1431,5,2,0,0,1431,1432,
        3,220,110,0,1432,1433,5,126,0,0,1433,1434,3,220,110,0,1434,1435,
        5,127,0,0,1435,1436,5,141,0,0,1436,1437,3,220,110,0,1437,1438,5,
        3,0,0,1438,197,1,0,0,0,1439,1440,5,2,0,0,1440,1441,5,48,0,0,1441,
        1445,3,220,110,0,1442,1444,3,200,100,0,1443,1442,1,0,0,0,1444,1447,
        1,0,0,0,1445,1443,1,0,0,0,1445,1446,1,0,0,0,1446,1449,1,0,0,0,1447,
        1445,1,0,0,0,1448,1450,3,202,101,0,1449,1448,1,0,0,0,1449,1450,1,
        0,0,0,1450,1451,1,0,0,0,1451,1452,5,3,0,0,1452,199,1,0,0,0,1453,
        1454,5,2,0,0,1454,1455,5,49,0,0,1455,1459,3,220,110,0,1456,1458,
        3,74,37,0,1457,1456,1,0,0,0,1458,1461,1,0,0,0,1459,1457,1,0,0,0,
        1459,1460,1,0,0,0,1460,1462,1,0,0,0,1461,1459,1,0,0,0,1462,1463,
        5,3,0,0,1463,201,1,0,0,0,1464,1465,5,2,0,0,1465,1469,5,50,0,0,1466,
        1468,3,74,37,0,1467,1466,1,0,0,0,1468,1471,1,0,0,0,1469,1467,1,0,
        0,0,1469,1470,1,0,0,0,1470,1472,1,0,0,0,1471,1469,1,0,0,0,1472,1473,
        5,3,0,0,1473,203,1,0,0,0,1474,1475,5,2,0,0,1475,1476,5,59,0,0,1476,
        1477,3,76,38,0,1477,1478,3,220,110,0,1478,1482,3,192,96,0,1479,1481,
        3,74,37,0,1480,1479,1,0,0,0,1481,1484,1,0,0,0,1482,1480,1,0,0,0,
        1482,1483,1,0,0,0,1483,1485,1,0,0,0,1484,1482,1,0,0,0,1485,1486,
        5,3,0,0,1486,1504,1,0,0,0,1487,1488,5,2,0,0,1488,1489,5,59,0,0,1489,
        1490,5,2,0,0,1490,1491,5,174,0,0,1491,1492,3,220,110,0,1492,1493,
        5,3,0,0,1493,1494,3,220,110,0,1494,1498,3,220,110,0,1495,1497,3,
        74,37,0,1496,1495,1,0,0,0,1497,1500,1,0,0,0,1498,1496,1,0,0,0,1498,
        1499,1,0,0,0,1499,1501,1,0,0,0,1500,1498,1,0,0,0,1501,1502,5,3,0,
        0,1502,1504,1,0,0,0,1503,1474,1,0,0,0,1503,1487,1,0,0,0,1504,205,
        1,0,0,0,1505,1506,5,2,0,0,1506,1507,5,51,0,0,1507,1508,5,174,0,0,
        1508,1512,3,220,110,0,1509,1511,3,74,37,0,1510,1509,1,0,0,0,1511,
        1514,1,0,0,0,1512,1510,1,0,0,0,1512,1513,1,0,0,0,1513,1515,1,0,0,
        0,1514,1512,1,0,0,0,1515,1516,5,3,0,0,1516,207,1,0,0,0,1517,1518,
        5,2,0,0,1518,1519,5,52,0,0,1519,1520,5,174,0,0,1520,1524,3,220,110,
        0,1521,1523,3,74,37,0,1522,1521,1,0,0,0,1523,1526,1,0,0,0,1524,1522,
        1,0,0,0,1524,1525,1,0,0,0,1525,1527,1,0,0,0,1526,1524,1,0,0,0,1527,
        1528,5,3,0,0,1528,209,1,0,0,0,1529,1530,5,2,0,0,1530,1531,5,53,0,
        0,1531,1532,5,174,0,0,1532,1536,3,220,110,0,1533,1535,3,74,37,0,
        1534,1533,1,0,0,0,1535,1538,1,0,0,0,1536,1534,1,0,0,0,1536,1537,
        1,0,0,0,1537,1539,1,0,0,0,1538,1536,1,0,0,0,1539,1540,5,3,0,0,1540,
        211,1,0,0,0,1541,1542,5,2,0,0,1542,1543,5,57,0,0,1543,1545,3,214,
        107,0,1544,1546,3,216,108,0,1545,1544,1,0,0,0,1545,1546,1,0,0,0,
        1546,1548,1,0,0,0,1547,1549,3,218,109,0,1548,1547,1,0,0,0,1548,1549,
        1,0,0,0,1549,1550,1,0,0,0,1550,1551,5,3,0,0,1551,213,1,0,0,0,1552,
        1553,5,2,0,0,1553,1557,5,54,0,0,1554,1556,3,74,37,0,1555,1554,1,
        0,0,0,1556,1559,1,0,0,0,1557,1555,1,0,0,0,1557,1558,1,0,0,0,1558,
        1560,1,0,0,0,1559,1557,1,0,0,0,1560,1561,5,3,0,0,1561,215,1,0,0,
        0,1562,1563,5,2,0,0,1563,1564,5,55,0,0,1564,1568,5,174,0,0,1565,
        1567,3,74,37,0,1566,1565,1,0,0,0,1567,1570,1,0,0,0,1568,1566,1,0,
        0,0,1568,1569,1,0,0,0,1569,1571,1,0,0,0,1570,1568,1,0,0,0,1571,1572,
        5,3,0,0,1572,217,1,0,0,0,1573,1574,5,2,0,0,1574,1578,5,56,0,0,1575,
        1577,3,74,37,0,1576,1575,1,0,0,0,1577,1580,1,0,0,0,1578,1576,1,0,
        0,0,1578,1579,1,0,0,0,1579,1581,1,0,0,0,1580,1578,1,0,0,0,1581,1582,
        5,3,0,0,1582,219,1,0,0,0,1583,1636,3,366,183,0,1584,1636,5,174,0,
        0,1585,1636,5,22,0,0,1586,1636,5,171,0,0,1587,1636,3,234,117,0,1588,
        1636,3,236,118,0,1589,1636,3,238,119,0,1590,1636,3,240,120,0,1591,
        1636,3,242,121,0,1592,1636,3,244,122,0,1593,1636,3,250,125,0,1594,
        1636,3,252,126,0,1595,1636,3,254,127,0,1596,1636,3,256,128,0,1597,
        1636,3,258,129,0,1598,1636,3,260,130,0,1599,1636,3,274,137,0,1600,
        1636,3,276,138,0,1601,1636,3,278,139,0,1602,1636,3,280,140,0,1603,
        1636,3,282,141,0,1604,1636,3,294,147,0,1605,1636,3,304,152,0,1606,
        1636,3,300,150,0,1607,1636,3,302,151,0,1608,1636,3,314,157,0,1609,
        1636,3,318,159,0,1610,1636,3,316,158,0,1611,1636,3,320,160,0,1612,
        1636,3,326,163,0,1613,1636,3,328,164,0,1614,1636,3,330,165,0,1615,
        1636,3,332,166,0,1616,1636,3,284,142,0,1617,1636,3,286,143,0,1618,
        1636,3,292,146,0,1619,1636,3,334,167,0,1620,1636,3,336,168,0,1621,
        1636,3,338,169,0,1622,1636,3,230,115,0,1623,1636,3,232,116,0,1624,
        1636,3,308,154,0,1625,1636,3,222,111,0,1626,1636,3,224,112,0,1627,
        1636,3,226,113,0,1628,1636,3,228,114,0,1629,1636,3,340,170,0,1630,
        1636,3,246,123,0,1631,1636,3,248,124,0,1632,1636,3,352,176,0,1633,
        1636,3,312,156,0,1634,1636,3,356,178,0,1635,1583,1,0,0,0,1635,1584,
        1,0,0,0,1635,1585,1,0,0,0,1635,1586,1,0,0,0,1635,1587,1,0,0,0,1635,
        1588,1,0,0,0,1635,1589,1,0,0,0,1635,1590,1,0,0,0,1635,1591,1,0,0,
        0,1635,1592,1,0,0,0,1635,1593,1,0,0,0,1635,1594,1,0,0,0,1635,1595,
        1,0,0,0,1635,1596,1,0,0,0,1635,1597,1,0,0,0,1635,1598,1,0,0,0,1635,
        1599,1,0,0,0,1635,1600,1,0,0,0,1635,1601,1,0,0,0,1635,1602,1,0,0,
        0,1635,1603,1,0,0,0,1635,1604,1,0,0,0,1635,1605,1,0,0,0,1635,1606,
        1,0,0,0,1635,1607,1,0,0,0,1635,1608,1,0,0,0,1635,1609,1,0,0,0,1635,
        1610,1,0,0,0,1635,1611,1,0,0,0,1635,1612,1,0,0,0,1635,1613,1,0,0,
        0,1635,1614,1,0,0,0,1635,1615,1,0,0,0,1635,1616,1,0,0,0,1635,1617,
        1,0,0,0,1635,1618,1,0,0,0,1635,1619,1,0,0,0,1635,1620,1,0,0,0,1635,
        1621,1,0,0,0,1635,1622,1,0,0,0,1635,1623,1,0,0,0,1635,1624,1,0,0,
        0,1635,1625,1,0,0,0,1635,1626,1,0,0,0,1635,1627,1,0,0,0,1635,1628,
        1,0,0,0,1635,1629,1,0,0,0,1635,1630,1,0,0,0,1635,1631,1,0,0,0,1635,
        1632,1,0,0,0,1635,1633,1,0,0,0,1635,1634,1,0,0,0,1636,221,1,0,0,
        0,1637,1638,5,68,0,0,1638,223,1,0,0,0,1639,1640,5,69,0,0,1640,225,
        1,0,0,0,1641,1642,5,2,0,0,1642,1646,5,69,0,0,1643,1645,3,220,110,
        0,1644,1643,1,0,0,0,1645,1648,1,0,0,0,1646,1644,1,0,0,0,1646,1647,
        1,0,0,0,1647,1649,1,0,0,0,1648,1646,1,0,0,0,1649,1650,5,3,0,0,1650,
        227,1,0,0,0,1651,1652,5,2,0,0,1652,1653,5,61,0,0,1653,1657,5,174,
        0,0,1654,1656,3,220,110,0,1655,1654,1,0,0,0,1656,1659,1,0,0,0,1657,
        1655,1,0,0,0,1657,1658,1,0,0,0,1658,1660,1,0,0,0,1659,1657,1,0,0,
        0,1660,1661,5,3,0,0,1661,229,1,0,0,0,1662,1663,5,2,0,0,1663,1664,
        5,81,0,0,1664,1665,3,220,110,0,1665,1666,5,3,0,0,1666,231,1,0,0,
        0,1667,1668,5,2,0,0,1668,1669,5,82,0,0,1669,1670,3,220,110,0,1670,
        1671,3,138,69,0,1671,1672,5,3,0,0,1672,233,1,0,0,0,1673,1674,5,2,
        0,0,1674,1675,5,13,0,0,1675,1679,3,360,180,0,1676,1678,3,74,37,0,
        1677,1676,1,0,0,0,1678,1681,1,0,0,0,1679,1677,1,0,0,0,1679,1680,
        1,0,0,0,1680,1682,1,0,0,0,1681,1679,1,0,0,0,1682,1683,5,3,0,0,1683,
        235,1,0,0,0,1684,1685,5,2,0,0,1685,1687,5,15,0,0,1686,1688,5,174,
        0,0,1687,1686,1,0,0,0,1687,1688,1,0,0,0,1688,1689,1,0,0,0,1689,1693,
        3,360,180,0,1690,1692,3,74,37,0,1691,1690,1,0,0,0,1692,1695,1,0,
        0,0,1693,1691,1,0,0,0,1693,1694,1,0,0,0,1694,1696,1,0,0,0,1695,1693,
        1,0,0,0,1696,1697,5,3,0,0,1697,237,1,0,0,0,1698,1699,5,2,0,0,1699,
        1700,5,106,0,0,1700,1704,3,360,180,0,1701,1703,3,74,37,0,1702,1701,
        1,0,0,0,1703,1706,1,0,0,0,1704,1702,1,0,0,0,1704,1705,1,0,0,0,1705,
        1707,1,0,0,0,1706,1704,1,0,0,0,1707,1708,5,3,0,0,1708,239,1,0,0,
        0,1709,1710,5,2,0,0,1710,1711,5,110,0,0,1711,1715,3,360,180,0,1712,
        1714,3,74,37,0,1713,1712,1,0,0,0,1714,1717,1,0,0,0,1715,1713,1,0,
        0,0,1715,1716,1,0,0,0,1716,1718,1,0,0,0,1717,1715,1,0,0,0,1718,1719,
        5,3,0,0,1719,241,1,0,0,0,1720,1721,5,2,0,0,1721,1722,5,112,0,0,1722,
        1726,3,360,180,0,1723,1725,3,74,37,0,1724,1723,1,0,0,0,1725,1728,
        1,0,0,0,1726,1724,1,0,0,0,1726,1727,1,0,0,0,1727,1729,1,0,0,0,1728,
        1726,1,0,0,0,1729,1730,5,3,0,0,1730,243,1,0,0,0,1731,1732,5,2,0,
        0,1732,1733,5,104,0,0,1733,1737,3,360,180,0,1734,1736,3,74,37,0,
        1735,1734,1,0,0,0,1736,1739,1,0,0,0,1737,1735,1,0,0,0,1737,1738,
        1,0,0,0,1738,1740,1,0,0,0,1739,1737,1,0,0,0,1740,1741,5,3,0,0,1741,
        245,1,0,0,0,1742,1743,5,2,0,0,1743,1747,5,108,0,0,1744,1746,3,74,
        37,0,1745,1744,1,0,0,0,1746,1749,1,0,0,0,1747,1745,1,0,0,0,1747,
        1748,1,0,0,0,1748,1750,1,0,0,0,1749,1747,1,0,0,0,1750,1751,5,3,0,
        0,1751,247,1,0,0,0,1752,1753,5,2,0,0,1753,1757,5,107,0,0,1754,1756,
        3,74,37,0,1755,1754,1,0,0,0,1756,1759,1,0,0,0,1757,1755,1,0,0,0,
        1757,1758,1,0,0,0,1758,1760,1,0,0,0,1759,1757,1,0,0,0,1760,1761,
        5,3,0,0,1761,249,1,0,0,0,1762,1763,5,2,0,0,1763,1765,5,14,0,0,1764,
        1766,5,174,0,0,1765,1764,1,0,0,0,1765,1766,1,0,0,0,1766,1767,1,0,
        0,0,1767,1771,3,268,134,0,1768,1770,3,74,37,0,1769,1768,1,0,0,0,
        1770,1773,1,0,0,0,1771,1769,1,0,0,0,1771,1772,1,0,0,0,1772,1774,
        1,0,0,0,1773,1771,1,0,0,0,1774,1775,5,3,0,0,1775,251,1,0,0,0,1776,
        1777,5,2,0,0,1777,1778,5,12,0,0,1778,1782,3,268,134,0,1779,1781,
        3,74,37,0,1780,1779,1,0,0,0,1781,1784,1,0,0,0,1782,1780,1,0,0,0,
        1782,1783,1,0,0,0,1783,1785,1,0,0,0,1784,1782,1,0,0,0,1785,1786,
        5,3,0,0,1786,253,1,0,0,0,1787,1788,5,2,0,0,1788,1789,5,109,0,0,1789,
        1793,3,268,134,0,1790,1792,3,74,37,0,1791,1790,1,0,0,0,1792,1795,
        1,0,0,0,1793,1791,1,0,0,0,1793,1794,1,0,0,0,1794,1796,1,0,0,0,1795,
        1793,1,0,0,0,1796,1797,5,3,0,0,1797,255,1,0,0,0,1798,1799,5,2,0,
        0,1799,1800,5,105,0,0,1800,1804,3,268,134,0,1801,1803,3,74,37,0,
        1802,1801,1,0,0,0,1803,1806,1,0,0,0,1804,1802,1,0,0,0,1804,1805,
        1,0,0,0,1805,1807,1,0,0,0,1806,1804,1,0,0,0,1807,1808,5,3,0,0,1808,
        257,1,0,0,0,1809,1810,5,2,0,0,1810,1811,5,111,0,0,1811,1815,3,268,
        134,0,1812,1814,3,74,37,0,1813,1812,1,0,0,0,1814,1817,1,0,0,0,1815,
        1813,1,0,0,0,1815,1816,1,0,0,0,1816,1818,1,0,0,0,1817,1815,1,0,0,
        0,1818,1819,5,3,0,0,1819,259,1,0,0,0,1820,1821,5,2,0,0,1821,1822,
        5,103,0,0,1822,1826,3,268,134,0,1823,1825,3,74,37,0,1824,1823,1,
        0,0,0,1825,1828,1,0,0,0,1826,1824,1,0,0,0,1826,1827,1,0,0,0,1827,
        1829,1,0,0,0,1828,1826,1,0,0,0,1829,1830,5,3,0,0,1830,261,1,0,0,
        0,1831,1832,5,2,0,0,1832,1836,5,16,0,0,1833,1835,3,54,27,0,1834,
        1833,1,0,0,0,1835,1838,1,0,0,0,1836,1834,1,0,0,0,1836,1837,1,0,0,
        0,1837,1839,1,0,0,0,1838,1836,1,0,0,0,1839,1840,3,72,36,0,1840,1844,
        3,268,134,0,1841,1843,3,74,37,0,1842,1841,1,0,0,0,1843,1846,1,0,
        0,0,1844,1842,1,0,0,0,1844,1845,1,0,0,0,1845,1847,1,0,0,0,1846,1844,
        1,0,0,0,1847,1848,5,3,0,0,1848,263,1,0,0,0,1849,1850,5,2,0,0,1850,
        1854,5,62,0,0,1851,1853,3,54,27,0,1852,1851,1,0,0,0,1853,1856,1,
        0,0,0,1854,1852,1,0,0,0,1854,1855,1,0,0,0,1855,1857,1,0,0,0,1856,
        1854,1,0,0,0,1857,1858,3,72,36,0,1858,1859,3,268,134,0,1859,1860,
        5,3,0,0,1860,265,1,0,0,0,1861,1862,5,2,0,0,1862,1863,5,66,0,0,1863,
        1867,3,268,134,0,1864,1866,3,74,37,0,1865,1864,1,0,0,0,1866,1869,
        1,0,0,0,1867,1865,1,0,0,0,1867,1868,1,0,0,0,1868,1870,1,0,0,0,1869,
        1867,1,0,0,0,1870,1871,5,3,0,0,1871,267,1,0,0,0,1872,1876,5,2,0,
        0,1873,1875,3,270,135,0,1874,1873,1,0,0,0,1875,1878,1,0,0,0,1876,
        1874,1,0,0,0,1876,1877,1,0,0,0,1877,1880,1,0,0,0,1878,1876,1,0,0,
        0,1879,1881,3,272,136,0,1880,1879,1,0,0,0,1880,1881,1,0,0,0,1881,
        1882,1,0,0,0,1882,1885,5,3,0,0,1883,1884,5,102,0,0,1884,1886,3,138,
        69,0,1885,1883,1,0,0,0,1885,1886,1,0,0,0,1886,269,1,0,0,0,1887,1891,
        5,2,0,0,1888,1890,3,54,27,0,1889,1888,1,0,0,0,1890,1893,1,0,0,0,
        1891,1889,1,0,0,0,1891,1892,1,0,0,0,1892,1894,1,0,0,0,1893,1891,
        1,0,0,0,1894,1896,5,174,0,0,1895,1897,5,98,0,0,1896,1895,1,0,0,0,
        1896,1897,1,0,0,0,1897,1900,1,0,0,0,1898,1899,5,102,0,0,1899,1901,
        3,138,69,0,1900,1898,1,0,0,0,1900,1901,1,0,0,0,1901,1907,1,0,0,0,
        1902,1903,5,2,0,0,1903,1904,5,50,0,0,1904,1905,3,220,110,0,1905,
        1906,5,3,0,0,1906,1908,1,0,0,0,1907,1902,1,0,0,0,1907,1908,1,0,0,
        0,1908,1909,1,0,0,0,1909,1910,5,3,0,0,1910,271,1,0,0,0,1911,1912,
        5,2,0,0,1912,1913,5,87,0,0,1913,1916,5,174,0,0,1914,1915,5,102,0,
        0,1915,1917,3,138,69,0,1916,1914,1,0,0,0,1916,1917,1,0,0,0,1917,
        1918,1,0,0,0,1918,1919,5,3,0,0,1919,273,1,0,0,0,1920,1921,5,2,0,
        0,1921,1922,5,115,0,0,1922,1923,3,220,110,0,1923,1924,5,3,0,0,1924,
        275,1,0,0,0,1925,1926,5,2,0,0,1926,1928,5,114,0,0,1927,1929,3,220,
        110,0,1928,1927,1,0,0,0,1928,1929,1,0,0,0,1929,1930,1,0,0,0,1930,
        1931,5,3,0,0,1931,277,1,0,0,0,1932,1933,5,2,0,0,1933,1934,5,113,
        0,0,1934,1935,3,220,110,0,1935,1936,5,3,0,0,1936,279,1,0,0,0,1937,
        1938,5,2,0,0,1938,1939,5,18,0,0,1939,1940,3,220,110,0,1940,1944,
        3,220,110,0,1941,1943,3,220,110,0,1942,1941,1,0,0,0,1943,1946,1,
        0,0,0,1944,1942,1,0,0,0,1944,1945,1,0,0,0,1945,1947,1,0,0,0,1946,
        1944,1,0,0,0,1947,1948,5,3,0,0,1948,281,1,0,0,0,1949,1950,5,2,0,
        0,1950,1951,5,19,0,0,1951,1952,3,220,110,0,1952,1956,3,220,110,0,
        1953,1955,3,220,110,0,1954,1953,1,0,0,0,1955,1958,1,0,0,0,1956,1954,
        1,0,0,0,1956,1957,1,0,0,0,1957,1959,1,0,0,0,1958,1956,1,0,0,0,1959,
        1960,5,3,0,0,1960,283,1,0,0,0,1961,1962,5,2,0,0,1962,1963,5,31,0,
        0,1963,1964,3,220,110,0,1964,1965,3,220,110,0,1965,1966,3,220,110,
        0,1966,1967,5,3,0,0,1967,285,1,0,0,0,1968,1969,5,2,0,0,1969,1971,
        5,32,0,0,1970,1972,3,288,144,0,1971,1970,1,0,0,0,1972,1973,1,0,0,
        0,1973,1971,1,0,0,0,1973,1974,1,0,0,0,1974,1976,1,0,0,0,1975,1977,
        3,290,145,0,1976,1975,1,0,0,0,1976,1977,1,0,0,0,1977,1978,1,0,0,
        0,1978,1979,5,3,0,0,1979,287,1,0,0,0,1980,1981,3,220,110,0,1981,
        1982,3,220,110,0,1982,289,1,0,0,0,1983,1984,5,125,0,0,1984,1985,
        3,220,110,0,1985,291,1,0,0,0,1986,1987,5,2,0,0,1987,1988,5,46,0,
        0,1988,1990,5,174,0,0,1989,1991,3,358,179,0,1990,1989,1,0,0,0,1990,
        1991,1,0,0,0,1991,1995,1,0,0,0,1992,1994,3,220,110,0,1993,1992,1,
        0,0,0,1994,1997,1,0,0,0,1995,1993,1,0,0,0,1995,1996,1,0,0,0,1996,
        1998,1,0,0,0,1997,1995,1,0,0,0,1998,1999,5,3,0,0,1999,293,1,0,0,
        0,2000,2001,5,2,0,0,2001,2005,5,33,0,0,2002,2004,3,296,148,0,2003,
        2002,1,0,0,0,2004,2007,1,0,0,0,2005,2003,1,0,0,0,2005,2006,1,0,0,
        0,2006,2008,1,0,0,0,2007,2005,1,0,0,0,2008,2009,5,3,0,0,2009,295,
        1,0,0,0,2010,2011,5,2,0,0,2011,2012,3,310,155,0,2012,2013,3,220,
        110,0,2013,2014,5,3,0,0,2014,2038,1,0,0,0,2015,2016,5,2,0,0,2016,
        2017,3,310,155,0,2017,2018,3,298,149,0,2018,2019,5,3,0,0,2019,2038,
        1,0,0,0,2020,2021,5,2,0,0,2021,2022,5,174,0,0,2022,2038,5,3,0,0,
        2023,2024,5,2,0,0,2024,2025,5,126,0,0,2025,2026,3,220,110,0,2026,
        2027,5,127,0,0,2027,2028,3,220,110,0,2028,2029,5,3,0,0,2029,2038,
        1,0,0,0,2030,2031,5,2,0,0,2031,2032,5,126,0,0,2032,2033,3,220,110,
        0,2033,2034,5,127,0,0,2034,2035,3,298,149,0,2035,2036,5,3,0,0,2036,
        2038,1,0,0,0,2037,2010,1,0,0,0,2037,2015,1,0,0,0,2037,2020,1,0,0,
        0,2037,2023,1,0,0,0,2037,2030,1,0,0,0,2038,297,1,0,0,0,2039,2040,
        5,2,0,0,2040,2041,5,17,0,0,2041,2045,3,360,180,0,2042,2044,3,74,
        37,0,2043,2042,1,0,0,0,2044,2047,1,0,0,0,2045,2043,1,0,0,0,2045,
        2046,1,0,0,0,2046,2048,1,0,0,0,2047,2045,1,0,0,0,2048,2049,5,3,0,
        0,2049,299,1,0,0,0,2050,2051,5,2,0,0,2051,2055,5,35,0,0,2052,2054,
        3,220,110,0,2053,2052,1,0,0,0,2054,2057,1,0,0,0,2055,2053,1,0,0,
        0,2055,2056,1,0,0,0,2056,2058,1,0,0,0,2057,2055,1,0,0,0,2058,2059,
        5,3,0,0,2059,301,1,0,0,0,2060,2074,5,126,0,0,2061,2068,3,220,110,
        0,2062,2064,5,4,0,0,2063,2062,1,0,0,0,2063,2064,1,0,0,0,2064,2065,
        1,0,0,0,2065,2067,3,220,110,0,2066,2063,1,0,0,0,2067,2070,1,0,0,
        0,2068,2066,1,0,0,0,2068,2069,1,0,0,0,2069,2072,1,0,0,0,2070,2068,
        1,0,0,0,2071,2073,5,4,0,0,2072,2071,1,0,0,0,2072,2073,1,0,0,0,2073,
        2075,1,0,0,0,2074,2061,1,0,0,0,2074,2075,1,0,0,0,2075,2076,1,0,0,
        0,2076,2077,5,127,0,0,2077,303,1,0,0,0,2078,2092,5,142,0,0,2079,
        2086,3,306,153,0,2080,2082,5,4,0,0,2081,2080,1,0,0,0,2081,2082,1,
        0,0,0,2082,2083,1,0,0,0,2083,2085,3,306,153,0,2084,2081,1,0,0,0,
        2085,2088,1,0,0,0,2086,2084,1,0,0,0,2086,2087,1,0,0,0,2087,2090,
        1,0,0,0,2088,2086,1,0,0,0,2089,2091,5,4,0,0,2090,2089,1,0,0,0,2090,
        2091,1,0,0,0,2091,2093,1,0,0,0,2092,2079,1,0,0,0,2092,2093,1,0,0,
        0,2093,2094,1,0,0,0,2094,2095,5,143,0,0,2095,305,1,0,0,0,2096,2097,
        3,310,155,0,2097,2098,5,102,0,0,2098,2099,3,220,110,0,2099,2108,
        1,0,0,0,2100,2101,5,126,0,0,2101,2102,3,220,110,0,2102,2103,5,127,
        0,0,2103,2104,5,102,0,0,2104,2105,3,220,110,0,2105,2108,1,0,0,0,
        2106,2108,5,174,0,0,2107,2096,1,0,0,0,2107,2100,1,0,0,0,2107,2106,
        1,0,0,0,2108,307,1,0,0,0,2109,2110,5,2,0,0,2110,2113,5,86,0,0,2111,
        2114,5,168,0,0,2112,2114,3,220,110,0,2113,2111,1,0,0,0,2113,2112,
        1,0,0,0,2114,2115,1,0,0,0,2115,2113,1,0,0,0,2115,2116,1,0,0,0,2116,
        2117,1,0,0,0,2117,2118,5,3,0,0,2118,309,1,0,0,0,2119,2120,7,4,0,
        0,2120,311,1,0,0,0,2121,2122,7,5,0,0,2122,313,1,0,0,0,2123,2124,
        5,2,0,0,2124,2125,5,39,0,0,2125,2126,3,220,110,0,2126,2127,3,310,
        155,0,2127,2128,5,3,0,0,2128,2138,1,0,0,0,2129,2130,5,2,0,0,2130,
        2131,5,39,0,0,2131,2132,3,220,110,0,2132,2133,5,126,0,0,2133,2134,
        3,220,110,0,2134,2135,5,127,0,0,2135,2136,5,3,0,0,2136,2138,1,0,
        0,0,2137,2123,1,0,0,0,2137,2129,1,0,0,0,2138,315,1,0,0,0,2139,2140,
        5,2,0,0,2140,2141,5,36,0,0,2141,2142,3,220,110,0,2142,2143,5,168,
        0,0,2143,2144,5,3,0,0,2144,317,1,0,0,0,2145,2146,5,2,0,0,2146,2147,
        5,40,0,0,2147,2148,3,220,110,0,2148,2149,3,220,110,0,2149,2150,5,
        3,0,0,2150,319,1,0,0,0,2151,2152,5,2,0,0,2152,2153,7,6,0,0,2153,
        2154,3,322,161,0,2154,2155,5,3,0,0,2155,321,1,0,0,0,2156,2157,3,
        324,162,0,2157,323,1,0,0,0,2158,2159,5,2,0,0,2159,2160,5,45,0,0,
        2160,2161,3,220,110,0,2161,2162,5,3,0,0,2162,2182,1,0,0,0,2163,2164,
        5,2,0,0,2164,2165,5,44,0,0,2165,2166,3,220,110,0,2166,2167,5,3,0,
        0,2167,2182,1,0,0,0,2168,2169,5,173,0,0,2169,2182,3,220,110,0,2170,
        2171,5,172,0,0,2171,2182,3,220,110,0,2172,2176,5,2,0,0,2173,2175,
        3,324,162,0,2174,2173,1,0,0,0,2175,2178,1,0,0,0,2176,2174,1,0,0,
        0,2176,2177,1,0,0,0,2177,2179,1,0,0,0,2178,2176,1,0,0,0,2179,2182,
        5,3,0,0,2180,2182,8,7,0,0,2181,2158,1,0,0,0,2181,2163,1,0,0,0,2181,
        2168,1,0,0,0,2181,2170,1,0,0,0,2181,2172,1,0,0,0,2181,2180,1,0,0,
        0,2182,325,1,0,0,0,2183,2184,5,2,0,0,2184,2185,5,45,0,0,2185,2186,
        3,220,110,0,2186,2187,5,3,0,0,2187,327,1,0,0,0,2188,2189,5,2,0,0,
        2189,2190,5,44,0,0,2190,2191,3,220,110,0,2191,2192,5,3,0,0,2192,
        329,1,0,0,0,2193,2194,5,173,0,0,2194,2195,3,220,110,0,2195,331,1,
        0,0,0,2196,2197,5,172,0,0,2197,2198,3,220,110,0,2198,333,1,0,0,0,
        2199,2200,5,2,0,0,2200,2201,5,38,0,0,2201,2202,3,220,110,0,2202,
        2203,3,310,155,0,2203,2204,5,3,0,0,2204,335,1,0,0,0,2205,2206,5,
        2,0,0,2206,2207,5,37,0,0,2207,2208,3,220,110,0,2208,2209,3,220,110,
        0,2209,2210,5,3,0,0,2210,337,1,0,0,0,2211,2212,5,2,0,0,2212,2213,
        5,41,0,0,2213,2214,3,220,110,0,2214,2215,3,220,110,0,2215,2216,5,
        3,0,0,2216,339,1,0,0,0,2217,2218,5,144,0,0,2218,2219,3,342,171,0,
        2219,2220,5,143,0,0,2220,341,1,0,0,0,2221,2227,3,344,172,0,2222,
        2223,3,350,175,0,2223,2224,3,344,172,0,2224,2226,1,0,0,0,2225,2222,
        1,0,0,0,2226,2229,1,0,0,0,2227,2225,1,0,0,0,2227,2228,1,0,0,0,2228,
        343,1,0,0,0,2229,2227,1,0,0,0,2230,2231,6,172,-1,0,2231,2232,5,174,
        0,0,2232,2234,5,2,0,0,2233,2235,3,346,173,0,2234,2233,1,0,0,0,2234,
        2235,1,0,0,0,2235,2236,1,0,0,0,2236,2247,5,3,0,0,2237,2238,5,142,
        0,0,2238,2239,3,342,171,0,2239,2240,5,143,0,0,2240,2247,1,0,0,0,
        2241,2242,3,348,174,0,2242,2243,3,344,172,3,2243,2247,1,0,0,0,2244,
        2247,3,366,183,0,2245,2247,5,174,0,0,2246,2230,1,0,0,0,2246,2237,
        1,0,0,0,2246,2241,1,0,0,0,2246,2244,1,0,0,0,2246,2245,1,0,0,0,2247,
        2256,1,0,0,0,2248,2249,10,5,0,0,2249,2251,5,2,0,0,2250,2252,3,346,
        173,0,2251,2250,1,0,0,0,2251,2252,1,0,0,0,2252,2253,1,0,0,0,2253,
        2255,5,3,0,0,2254,2248,1,0,0,0,2255,2258,1,0,0,0,2256,2254,1,0,0,
        0,2256,2257,1,0,0,0,2257,345,1,0,0,0,2258,2256,1,0,0,0,2259,2264,
        3,342,171,0,2260,2261,5,4,0,0,2261,2263,3,342,171,0,2262,2260,1,
        0,0,0,2263,2266,1,0,0,0,2264,2262,1,0,0,0,2264,2265,1,0,0,0,2265,
        347,1,0,0,0,2266,2264,1,0,0,0,2267,2268,7,8,0,0,2268,349,1,0,0,0,
        2269,2270,7,9,0,0,2270,351,1,0,0,0,2271,2272,5,2,0,0,2272,2276,5,
        174,0,0,2273,2275,3,220,110,0,2274,2273,1,0,0,0,2275,2278,1,0,0,
        0,2276,2274,1,0,0,0,2276,2277,1,0,0,0,2277,2279,1,0,0,0,2278,2276,
        1,0,0,0,2279,2283,5,134,0,0,2280,2282,3,74,37,0,2281,2280,1,0,0,
        0,2282,2285,1,0,0,0,2283,2281,1,0,0,0,2283,2284,1,0,0,0,2284,2286,
        1,0,0,0,2285,2283,1,0,0,0,2286,2287,5,3,0,0,2287,353,1,0,0,0,2288,
        2289,5,2,0,0,2289,2293,5,174,0,0,2290,2292,3,220,110,0,2291,2290,
        1,0,0,0,2292,2295,1,0,0,0,2293,2291,1,0,0,0,2293,2294,1,0,0,0,2294,
        2296,1,0,0,0,2295,2293,1,0,0,0,2296,2300,5,135,0,0,2297,2299,3,74,
        37,0,2298,2297,1,0,0,0,2299,2302,1,0,0,0,2300,2298,1,0,0,0,2300,
        2301,1,0,0,0,2301,2303,1,0,0,0,2302,2300,1,0,0,0,2303,2304,5,3,0,
        0,2304,355,1,0,0,0,2305,2306,5,2,0,0,2306,2308,3,220,110,0,2307,
        2309,3,358,179,0,2308,2307,1,0,0,0,2308,2309,1,0,0,0,2309,2313,1,
        0,0,0,2310,2312,3,220,110,0,2311,2310,1,0,0,0,2312,2315,1,0,0,0,
        2313,2311,1,0,0,0,2313,2314,1,0,0,0,2314,2316,1,0,0,0,2315,2313,
        1,0,0,0,2316,2317,5,3,0,0,2317,357,1,0,0,0,2318,2319,5,2,0,0,2319,
        2321,5,90,0,0,2320,2322,3,138,69,0,2321,2320,1,0,0,0,2322,2323,1,
        0,0,0,2323,2321,1,0,0,0,2323,2324,1,0,0,0,2324,2325,1,0,0,0,2325,
        2326,5,3,0,0,2326,359,1,0,0,0,2327,2344,5,2,0,0,2328,2335,3,362,
        181,0,2329,2331,5,4,0,0,2330,2329,1,0,0,0,2330,2331,1,0,0,0,2331,
        2332,1,0,0,0,2332,2334,3,362,181,0,2333,2330,1,0,0,0,2334,2337,1,
        0,0,0,2335,2333,1,0,0,0,2335,2336,1,0,0,0,2336,2342,1,0,0,0,2337,
        2335,1,0,0,0,2338,2340,5,4,0,0,2339,2338,1,0,0,0,2339,2340,1,0,0,
        0,2340,2341,1,0,0,0,2341,2343,3,364,182,0,2342,2339,1,0,0,0,2342,
        2343,1,0,0,0,2343,2345,1,0,0,0,2344,2328,1,0,0,0,2344,2345,1,0,0,
        0,2345,2346,1,0,0,0,2346,2349,5,3,0,0,2347,2348,5,102,0,0,2348,2350,
        3,138,69,0,2349,2347,1,0,0,0,2349,2350,1,0,0,0,2350,2359,1,0,0,0,
        2351,2352,5,2,0,0,2352,2353,3,364,182,0,2353,2356,5,3,0,0,2354,2355,
        5,102,0,0,2355,2357,3,138,69,0,2356,2354,1,0,0,0,2356,2357,1,0,0,
        0,2357,2359,1,0,0,0,2358,2327,1,0,0,0,2358,2351,1,0,0,0,2359,361,
        1,0,0,0,2360,2361,5,2,0,0,2361,2363,5,174,0,0,2362,2364,5,98,0,0,
        2363,2362,1,0,0,0,2363,2364,1,0,0,0,2364,2367,1,0,0,0,2365,2366,
        5,102,0,0,2366,2368,3,138,69,0,2367,2365,1,0,0,0,2367,2368,1,0,0,
        0,2368,2369,1,0,0,0,2369,2370,5,3,0,0,2370,363,1,0,0,0,2371,2372,
        5,2,0,0,2372,2373,5,87,0,0,2373,2376,5,174,0,0,2374,2375,5,102,0,
        0,2375,2377,3,138,69,0,2376,2374,1,0,0,0,2376,2377,1,0,0,0,2377,
        2378,1,0,0,0,2378,2379,5,3,0,0,2379,365,1,0,0,0,2380,2381,7,10,0,
        0,2381,367,1,0,0,0,196,373,395,405,414,423,428,442,455,467,477,490,
        503,518,527,530,540,550,558,568,571,581,591,595,602,607,610,613,
        623,627,630,645,654,668,677,684,688,696,701,705,712,717,720,725,
        733,743,751,761,773,781,791,799,811,836,844,850,861,867,878,884,
        894,903,913,924,932,952,981,994,1003,1014,1047,1054,1061,1071,1091,
        1101,1119,1128,1133,1139,1148,1174,1181,1190,1204,1219,1224,1230,
        1240,1250,1259,1264,1310,1320,1331,1337,1345,1354,1361,1364,1396,
        1428,1445,1449,1459,1469,1482,1498,1503,1512,1524,1536,1545,1548,
        1557,1568,1578,1635,1646,1657,1679,1687,1693,1704,1715,1726,1737,
        1747,1757,1765,1771,1782,1793,1804,1815,1826,1836,1844,1854,1867,
        1876,1880,1885,1891,1896,1900,1907,1916,1928,1944,1956,1973,1976,
        1990,1995,2005,2037,2045,2055,2063,2068,2072,2074,2081,2086,2090,
        2092,2107,2113,2115,2137,2176,2181,2227,2234,2246,2251,2256,2264,
        2276,2283,2293,2300,2308,2313,2323,2330,2335,2339,2342,2344,2349,
        2356,2358,2363,2367,2376
    ];

    private static __ATN: antlr.ATN;
    public static get _ATN(): antlr.ATN {
        if (!Stage10Parser.__ATN) {
            Stage10Parser.__ATN = new antlr.ATNDeserializer().deserialize(Stage10Parser._serializedATN);
        }

        return Stage10Parser.__ATN;
    }


    private static readonly vocabulary = new antlr.Vocabulary(Stage10Parser.literalNames, Stage10Parser.symbolicNames, []);

    public override get vocabulary(): antlr.Vocabulary {
        return Stage10Parser.vocabulary;
    }

    private static readonly decisionsToDFA = Stage10Parser._ATN.decisionToState.map( (ds: antlr.DecisionState, index: number) => new antlr.DFA(ds, index) );
}

export class ProgramContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public PROGRAM(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.PROGRAM, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
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
        return Stage10Parser.RULE_program;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterProgram) {
             listener.enterProgram(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
    public mixinForm(): MixinFormContext | null {
        return this.getRuleContext(0, MixinFormContext);
    }
    public exportDeclForm(): ExportDeclFormContext | null {
        return this.getRuleContext(0, ExportDeclFormContext);
    }
    public statement(): StatementContext | null {
        return this.getRuleContext(0, StatementContext);
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_topLevel;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterTopLevel) {
             listener.enterTopLevel(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return Stage10Parser.RULE_decl;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterDecl) {
             listener.enterDecl(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public DEFMACRO(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.DEFMACRO, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.IDENTIFIER, 0)!;
    }
    public macroSignature(): MacroSignatureContext {
        return this.getRuleContext(0, MacroSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
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
        return Stage10Parser.RULE_defmacro;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterDefmacro) {
             listener.enterDefmacro(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode[];
    public IDENTIFIER(i: number): antlr.TerminalNode | null;
    public IDENTIFIER(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage10Parser.IDENTIFIER);
    	} else {
    		return this.getToken(Stage10Parser.IDENTIFIER, i);
    	}
    }
    public REST(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.REST, 0);
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_macroSignature;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterMacroSignature) {
             listener.enterMacroSignature(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public MACRO_TIME_ATTR(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.MACRO_TIME_ATTR, 0)!;
    }
    public topLevelLet(): TopLevelLetContext | null {
        return this.getRuleContext(0, TopLevelLetContext);
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
    }
    public topLevelConst(): TopLevelConstContext | null {
        return this.getRuleContext(0, TopLevelConstContext);
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_macroTimeFnDef;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterMacroTimeFnDef) {
             listener.enterMacroTimeFnDef(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public MACRO_IMPORT(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.MACRO_IMPORT, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.IDENTIFIER, 0)!;
    }
    public STRING(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.STRING, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_macroImport;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterMacroImport) {
             listener.enterMacroImport(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public MACRO_EXPORT(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.MACRO_EXPORT, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
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
        return Stage10Parser.RULE_macroExport;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterMacroExport) {
             listener.enterMacroExport(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.IDENTIFIER, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_macroExportSpec;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterMacroExportSpec) {
             listener.enterMacroExportSpec(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public MACRO_REEXPORT(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.MACRO_REEXPORT, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode[];
    public IDENTIFIER(i: number): antlr.TerminalNode | null;
    public IDENTIFIER(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage10Parser.IDENTIFIER);
    	} else {
    		return this.getToken(Stage10Parser.IDENTIFIER, i);
    	}
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_macroReexport;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterMacroReexport) {
             listener.enterMacroReexport(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
    		return this.getTokens(Stage10Parser.LPAREN);
    	} else {
    		return this.getToken(Stage10Parser.LPAREN, i);
    	}
    }
    public LET(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.LET, 0)!;
    }
    public starBinding(): StarBindingContext {
        return this.getRuleContext(0, StarBindingContext)!;
    }
    public RPAREN(): antlr.TerminalNode[];
    public RPAREN(i: number): antlr.TerminalNode | null;
    public RPAREN(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage10Parser.RPAREN);
    	} else {
    		return this.getToken(Stage10Parser.RPAREN, i);
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
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_topLevelLet;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterTopLevelLet) {
             listener.enterTopLevelLet(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
    		return this.getTokens(Stage10Parser.LPAREN);
    	} else {
    		return this.getToken(Stage10Parser.LPAREN, i);
    	}
    }
    public VAR(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.VAR, 0)!;
    }
    public starBinding(): StarBindingContext {
        return this.getRuleContext(0, StarBindingContext)!;
    }
    public RPAREN(): antlr.TerminalNode[];
    public RPAREN(i: number): antlr.TerminalNode | null;
    public RPAREN(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage10Parser.RPAREN);
    	} else {
    		return this.getToken(Stage10Parser.RPAREN, i);
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
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_topLevelVar;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterTopLevelVar) {
             listener.enterTopLevelVar(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
        if(listener.exitTopLevelVar) {
             listener.exitTopLevelVar(this);
        }
    }
}


export class TopLevelConstContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode[];
    public LPAREN(i: number): antlr.TerminalNode | null;
    public LPAREN(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage10Parser.LPAREN);
    	} else {
    		return this.getToken(Stage10Parser.LPAREN, i);
    	}
    }
    public CONST(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.CONST, 0)!;
    }
    public starBinding(): StarBindingContext {
        return this.getRuleContext(0, StarBindingContext)!;
    }
    public RPAREN(): antlr.TerminalNode[];
    public RPAREN(i: number): antlr.TerminalNode | null;
    public RPAREN(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage10Parser.RPAREN);
    	} else {
    		return this.getToken(Stage10Parser.RPAREN, i);
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
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_topLevelConst;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterTopLevelConst) {
             listener.enterTopLevelConst(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.CARET, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.IDENTIFIER, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_metaAnnotation;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterMetaAnnotation) {
             listener.enterMetaAnnotation(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public TYPE(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.TYPE, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.IDENTIFIER, 0)!;
    }
    public typeExpr(): TypeExprContext {
        return this.getRuleContext(0, TypeExprContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
    }
    public typeParams(): TypeParamsContext | null {
        return this.getRuleContext(0, TypeParamsContext);
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_typeAlias;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterTypeAlias) {
             listener.enterTypeAlias(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public INTERFACE(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.INTERFACE, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.IDENTIFIER, 0)!;
    }
    public typeObject(): TypeObjectContext {
        return this.getRuleContext(0, TypeObjectContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
    }
    public typeParams(): TypeParamsContext | null {
        return this.getRuleContext(0, TypeParamsContext);
    }
    public interfaceExtends(): InterfaceExtendsContext | null {
        return this.getRuleContext(0, InterfaceExtendsContext);
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_interfaceDef;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterInterfaceDef) {
             listener.enterInterfaceDef(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public EXTENDS(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.EXTENDS, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
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
        return Stage10Parser.RULE_interfaceExtends;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterInterfaceExtends) {
             listener.enterInterfaceExtends(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public ENUM(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.ENUM, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
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
        return Stage10Parser.RULE_enumDef;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterEnumDef) {
             listener.enterEnumDef(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
    }
    public NUMBER(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.NUMBER, 0);
    }
    public NEG_NUMBER(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.NEG_NUMBER, 0);
    }
    public STRING(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.STRING, 0);
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_enumMember;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterEnumMember) {
             listener.enterEnumMember(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
        if(listener.exitEnumMember) {
             listener.exitEnumMember(this);
        }
    }
}


export class MixinFormContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public MIXIN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.MIXIN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode[];
    public IDENTIFIER(i: number): antlr.TerminalNode | null;
    public IDENTIFIER(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage10Parser.IDENTIFIER);
    	} else {
    		return this.getToken(Stage10Parser.IDENTIFIER, i);
    	}
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
    }
    public mixinFilter(): MixinFilterContext | null {
        return this.getRuleContext(0, MixinFilterContext);
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_mixinForm;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterMixinForm) {
             listener.enterMixinForm(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
        if(listener.exitMixinForm) {
             listener.exitMixinForm(this);
        }
    }
}


export class MixinFilterContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public COLON(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.COLON, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode[];
    public IDENTIFIER(i: number): antlr.TerminalNode | null;
    public IDENTIFIER(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage10Parser.IDENTIFIER);
    	} else {
    		return this.getToken(Stage10Parser.IDENTIFIER, i);
    	}
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
    }
    public EXCEPT(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.EXCEPT, 0);
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_mixinFilter;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterMixinFilter) {
             listener.enterMixinFilter(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
        if(listener.exitMixinFilter) {
             listener.exitMixinFilter(this);
        }
    }
}


export class ClassDefContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public CLASS(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.CLASS, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.IDENTIFIER, 0)!;
    }
    public classBody(): ClassBodyContext {
        return this.getRuleContext(0, ClassBodyContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
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
        return Stage10Parser.RULE_classDef;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterClassDef) {
             listener.enterClassDef(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public CLASS(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.CLASS, 0)!;
    }
    public classBody(): ClassBodyContext {
        return this.getRuleContext(0, ClassBodyContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
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
        return Stage10Parser.RULE_anonClassDef;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterAnonClassDef) {
             listener.enterAnonClassDef(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public EXTENDS(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.EXTENDS, 0)!;
    }
    public typeExpr(): TypeExprContext {
        return this.getRuleContext(0, TypeExprContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_classExtends;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterClassExtends) {
             listener.enterClassExtends(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public IMPLEMENTS(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.IMPLEMENTS, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
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
        return Stage10Parser.RULE_classImplements;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterClassImplements) {
             listener.enterClassImplements(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public CLASS_BODY(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.CLASS_BODY, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
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
        return Stage10Parser.RULE_classBody;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterClassBody) {
             listener.enterClassBody(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return Stage10Parser.RULE_classElement;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterClassElement) {
             listener.enterClassElement(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.PUBLIC, 0);
    }
    public PRIVATE(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.PRIVATE, 0);
    }
    public PROTECTED(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.PROTECTED, 0);
    }
    public STATIC(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.STATIC, 0);
    }
    public ABSTRACT(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.ABSTRACT, 0);
    }
    public OVERRIDE(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.OVERRIDE, 0);
    }
    public ASYNC(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.ASYNC, 0);
    }
    public GENERATOR(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.GENERATOR, 0);
    }
    public READONLY(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.READONLY, 0);
    }
    public DECLARE(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.DECLARE, 0);
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_modifier;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterModifier) {
             listener.enterModifier(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
    		return this.getTokens(Stage10Parser.LPAREN);
    	} else {
    		return this.getToken(Stage10Parser.LPAREN, i);
    	}
    }
    public FIELD(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.FIELD, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode[];
    public RPAREN(i: number): antlr.TerminalNode | null;
    public RPAREN(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage10Parser.RPAREN);
    	} else {
    		return this.getToken(Stage10Parser.RPAREN, i);
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
        return this.getToken(Stage10Parser.COLON, 0);
    }
    public typeExpr(): TypeExprContext | null {
        return this.getRuleContext(0, TypeExprContext);
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_fieldDef;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterFieldDef) {
             listener.enterFieldDef(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
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
        return this.getToken(Stage10Parser.OPTIONAL, 0);
    }
    public COLON(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.COLON, 0);
    }
    public typeExpr(): TypeExprContext | null {
        return this.getRuleContext(0, TypeExprContext);
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_constructorParam;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterConstructorParam) {
             listener.enterConstructorParam(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
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
        return this.getToken(Stage10Parser.COLON, 0);
    }
    public typeExpr(): TypeExprContext | null {
        return this.getRuleContext(0, TypeExprContext);
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage10Parser.COMMA);
    	} else {
    		return this.getToken(Stage10Parser.COMMA, i);
    	}
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_constructorSignature;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterConstructorSignature) {
             listener.enterConstructorSignature(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public CONSTRUCTOR(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.CONSTRUCTOR, 0)!;
    }
    public constructorSignature(): ConstructorSignatureContext {
        return this.getRuleContext(0, ConstructorSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
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
        return Stage10Parser.RULE_constructorDef;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterConstructorDef) {
             listener.enterConstructorDef(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public METHOD(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.METHOD, 0)!;
    }
    public methodKey(): MethodKeyContext {
        return this.getRuleContext(0, MethodKeyContext)!;
    }
    public fnSignature(): FnSignatureContext {
        return this.getRuleContext(0, FnSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
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
        return Stage10Parser.RULE_classMethodDef;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterClassMethodDef) {
             listener.enterClassMethodDef(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public ABSTRACT_METHOD(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.ABSTRACT_METHOD, 0)!;
    }
    public methodKey(): MethodKeyContext {
        return this.getRuleContext(0, MethodKeyContext)!;
    }
    public fnSignature(): FnSignatureContext {
        return this.getRuleContext(0, FnSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
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
        return Stage10Parser.RULE_abstractMethodDef;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterAbstractMethodDef) {
             listener.enterAbstractMethodDef(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public GET(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.GET, 0)!;
    }
    public methodKey(): MethodKeyContext {
        return this.getRuleContext(0, MethodKeyContext)!;
    }
    public fnSignature(): FnSignatureContext {
        return this.getRuleContext(0, FnSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
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
        return Stage10Parser.RULE_getterDef;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterGetterDef) {
             listener.enterGetterDef(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public SETPROP(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.SETPROP, 0)!;
    }
    public methodKey(): MethodKeyContext {
        return this.getRuleContext(0, MethodKeyContext)!;
    }
    public fnSignature(): FnSignatureContext {
        return this.getRuleContext(0, FnSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
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
        return Stage10Parser.RULE_setterDef;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterSetterDef) {
             listener.enterSetterDef(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.IDENTIFIER, 0);
    }
    public GET(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.GET, 0);
    }
    public SETPROP(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.SETPROP, 0);
    }
    public LBRACK(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.LBRACK, 0);
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public RBRACK(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.RBRACK, 0);
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_methodKey;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterMethodKey) {
             listener.enterMethodKey(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return Stage10Parser.RULE_statement;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterStatement) {
             listener.enterStatement(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
    		return this.getTokens(Stage10Parser.LPAREN);
    	} else {
    		return this.getToken(Stage10Parser.LPAREN, i);
    	}
    }
    public LET(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.LET, 0)!;
    }
    public RPAREN(): antlr.TerminalNode[];
    public RPAREN(i: number): antlr.TerminalNode | null;
    public RPAREN(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage10Parser.RPAREN);
    	} else {
    		return this.getToken(Stage10Parser.RPAREN, i);
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
        return Stage10Parser.RULE_letStmt;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterLetStmt) {
             listener.enterLetStmt(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
    		return this.getTokens(Stage10Parser.LPAREN);
    	} else {
    		return this.getToken(Stage10Parser.LPAREN, i);
    	}
    }
    public VAR(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.VAR, 0)!;
    }
    public RPAREN(): antlr.TerminalNode[];
    public RPAREN(i: number): antlr.TerminalNode | null;
    public RPAREN(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage10Parser.RPAREN);
    	} else {
    		return this.getToken(Stage10Parser.RPAREN, i);
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
        return Stage10Parser.RULE_varStmt;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterVarStmt) {
             listener.enterVarStmt(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
    		return this.getTokens(Stage10Parser.LPAREN);
    	} else {
    		return this.getToken(Stage10Parser.LPAREN, i);
    	}
    }
    public CONST(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.CONST, 0)!;
    }
    public RPAREN(): antlr.TerminalNode[];
    public RPAREN(i: number): antlr.TerminalNode | null;
    public RPAREN(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage10Parser.RPAREN);
    	} else {
    		return this.getToken(Stage10Parser.RPAREN, i);
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
        return Stage10Parser.RULE_constStar;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterConstStar) {
             listener.enterConstStar(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
        if(listener.exitConstStar) {
             listener.exitConstStar(this);
        }
    }
}


export class IfFormContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public IF(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.IF, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public thenBlock(): ThenBlockContext {
        return this.getRuleContext(0, ThenBlockContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
    }
    public elseBlock(): ElseBlockContext | null {
        return this.getRuleContext(0, ElseBlockContext);
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_ifForm;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterIfForm) {
             listener.enterIfForm(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public THEN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.THEN, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
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
        return Stage10Parser.RULE_thenBlock;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterThenBlock) {
             listener.enterThenBlock(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public ELSE(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.ELSE, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
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
        return Stage10Parser.RULE_elseBlock;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterElseBlock) {
             listener.enterElseBlock(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public WHILE(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.WHILE, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
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
        return Stage10Parser.RULE_whileForm;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterWhileForm) {
             listener.enterWhileForm(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public RETURN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RETURN, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_returnForm;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterReturnForm) {
             listener.enterReturnForm(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public THROW(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.THROW, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_throwForm;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterThrowForm) {
             listener.enterThrowForm(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public BREAK(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.BREAK, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_breakForm;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterBreakForm) {
             listener.enterBreakForm(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public CONTINUE(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.CONTINUE, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_continueForm;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterContinueForm) {
             listener.enterContinueForm(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public IMPORT(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.IMPORT, 0)!;
    }
    public STRING(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.STRING, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
    }
    public objectExpr(): ObjectExprContext | null {
        return this.getRuleContext(0, ObjectExprContext);
    }
    public objectDestructPat(): ObjectDestructPatContext | null {
        return this.getRuleContext(0, ObjectDestructPatContext);
    }
    public IDENTIFIER(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.IDENTIFIER, 0);
    }
    public STAR(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.STAR, 0);
    }
    public AS(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.AS, 0);
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_importForm;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterImportForm) {
             listener.enterImportForm(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public IMPORT_TYPE(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.IMPORT_TYPE, 0)!;
    }
    public importTypeSpec(): ImportTypeSpecContext {
        return this.getRuleContext(0, ImportTypeSpecContext)!;
    }
    public STRING(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.STRING, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_importTypeForm;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterImportTypeForm) {
             listener.enterImportTypeForm(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
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
        return Stage10Parser.RULE_importTypeSpec;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterImportTypeSpec) {
             listener.enterImportTypeSpec(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
    		return this.getTokens(Stage10Parser.IDENTIFIER);
    	} else {
    		return this.getToken(Stage10Parser.IDENTIFIER, i);
    	}
    }
    public LPAREN(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.LPAREN, 0);
    }
    public RPAREN(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.RPAREN, 0);
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_importTypeName;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterImportTypeName) {
             listener.enterImportTypeName(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return Stage10Parser.RULE_exportForm;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterExportForm) {
             listener.enterExportForm(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public EXPORT(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.EXPORT, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.IDENTIFIER, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_exportBinding;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterExportBinding) {
             listener.enterExportBinding(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public EXPORT_DEFAULT(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.EXPORT_DEFAULT, 0)!;
    }
    public classDef(): ClassDefContext | null {
        return this.getRuleContext(0, ClassDefContext);
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
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
        return Stage10Parser.RULE_exportDefault;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterExportDefault) {
             listener.enterExportDefault(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public EXPORT_NAMED(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.EXPORT_NAMED, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
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
        return Stage10Parser.RULE_exportNamed;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterExportNamed) {
             listener.enterExportNamed(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode[];
    public IDENTIFIER(i: number): antlr.TerminalNode | null;
    public IDENTIFIER(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage10Parser.IDENTIFIER);
    	} else {
    		return this.getToken(Stage10Parser.IDENTIFIER, i);
    	}
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_exportNamePair;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterExportNamePair) {
             listener.enterExportNamePair(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public EXPORT_FROM(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.EXPORT_FROM, 0)!;
    }
    public STRING(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.STRING, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
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
        return Stage10Parser.RULE_exportFrom;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterExportFrom) {
             listener.enterExportFrom(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public EXPORT_ALL_FROM(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.EXPORT_ALL_FROM, 0)!;
    }
    public STRING(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.STRING, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_exportAllFrom;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterExportAllFrom) {
             listener.enterExportAllFrom(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public EXPORT_NS_FROM(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.EXPORT_NS_FROM, 0)!;
    }
    public STRING(): antlr.TerminalNode[];
    public STRING(i: number): antlr.TerminalNode | null;
    public STRING(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage10Parser.STRING);
    	} else {
    		return this.getToken(Stage10Parser.STRING, i);
    	}
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_exportNsFromForm;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterExportNsFromForm) {
             listener.enterExportNsFromForm(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public EXPORT_TYPE(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.EXPORT_TYPE, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
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
        return Stage10Parser.RULE_exportTypeForm;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterExportTypeForm) {
             listener.enterExportTypeForm(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public EXPORT_TYPE_FROM(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.EXPORT_TYPE_FROM, 0)!;
    }
    public STRING(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.STRING, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
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
        return Stage10Parser.RULE_exportTypeFromForm;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterExportTypeFromForm) {
             listener.enterExportTypeFromForm(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public EXPORT_TYPE_ALL_FROM(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.EXPORT_TYPE_ALL_FROM, 0)!;
    }
    public STRING(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.STRING, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_exportTypeAllFromForm;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterExportTypeAllFromForm) {
             listener.enterExportTypeAllFromForm(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public EXPORT(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.EXPORT, 0)!;
    }
    public decl(): DeclContext {
        return this.getRuleContext(0, DeclContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_exportDeclForm;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterExportDeclForm) {
             listener.enterExportDeclForm(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.IDENTIFIER, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
    }
    public COLON(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.COLON, 0);
    }
    public typeExpr(): TypeExprContext | null {
        return this.getRuleContext(0, TypeExprContext);
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_starBinding;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterStarBinding) {
             listener.enterStarBinding(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0);
    }
    public IDENTIFIER(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.IDENTIFIER, 0);
    }
    public RPAREN(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.RPAREN, 0);
    }
    public COLON(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.COLON, 0);
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
        return Stage10Parser.RULE_singleBinding;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterSingleBinding) {
             listener.enterSingleBinding(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LBRACE, 0)!;
    }
    public RBRACE(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RBRACE, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode[];
    public IDENTIFIER(i: number): antlr.TerminalNode | null;
    public IDENTIFIER(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage10Parser.IDENTIFIER);
    	} else {
    		return this.getToken(Stage10Parser.IDENTIFIER, i);
    	}
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_objectDestructPat;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterObjectDestructPat) {
             listener.enterObjectDestructPat(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LBRACK, 0)!;
    }
    public RBRACK(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RBRACK, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode[];
    public IDENTIFIER(i: number): antlr.TerminalNode | null;
    public IDENTIFIER(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage10Parser.IDENTIFIER);
    	} else {
    		return this.getToken(Stage10Parser.IDENTIFIER, i);
    	}
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_arrayDestructPat;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterArrayDestructPat) {
             listener.enterArrayDestructPat(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.IDENTIFIER, 0);
    }
    public NULL(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.NULL, 0);
    }
    public UNDEFINED(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.UNDEFINED, 0);
    }
    public OBJECT(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.OBJECT, 0);
    }
    public LBRACE(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.LBRACE, 0);
    }
    public RBRACE(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.RBRACE, 0);
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
        return Stage10Parser.RULE_typeExpr;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterTypeExpr) {
             listener.enterTypeExpr(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public UNION(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.UNION, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
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
        return Stage10Parser.RULE_typeUnion;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterTypeUnion) {
             listener.enterTypeUnion(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public INTERSECT(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.INTERSECT, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
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
        return Stage10Parser.RULE_typeIntersection;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterTypeIntersection) {
             listener.enterTypeIntersection(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public TYPE_ARRAY(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.TYPE_ARRAY, 0)!;
    }
    public typeExpr(): TypeExprContext {
        return this.getRuleContext(0, TypeExprContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_typeArray;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterTypeArray) {
             listener.enterTypeArray(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public TUPLE(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.TUPLE, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
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
        return Stage10Parser.RULE_typeTuple;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterTypeTuple) {
             listener.enterTypeTuple(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0);
    }
    public REST(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.REST, 0);
    }
    public typeExpr(): TypeExprContext {
        return this.getRuleContext(0, TypeExprContext)!;
    }
    public RPAREN(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.RPAREN, 0);
    }
    public IDENTIFIER(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.IDENTIFIER, 0);
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_typeTupleElement;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterTypeTupleElement) {
             listener.enterTypeTupleElement(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
    		return this.getTokens(Stage10Parser.LPAREN);
    	} else {
    		return this.getToken(Stage10Parser.LPAREN, i);
    	}
    }
    public TYPEFN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.TYPEFN, 0)!;
    }
    public RPAREN(): antlr.TerminalNode[];
    public RPAREN(i: number): antlr.TerminalNode | null;
    public RPAREN(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage10Parser.RPAREN);
    	} else {
    		return this.getToken(Stage10Parser.RPAREN, i);
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
        return Stage10Parser.RULE_typeFunction;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterTypeFunction) {
             listener.enterTypeFunction(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.IDENTIFIER, 0)!;
    }
    public typeExpr(): TypeExprContext {
        return this.getRuleContext(0, TypeExprContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
    }
    public OPTIONAL(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.OPTIONAL, 0);
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_typeFnParam;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterTypeFnParam) {
             listener.enterTypeFnParam(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
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
        return Stage10Parser.RULE_typeObject;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterTypeObject) {
             listener.enterTypeObject(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.IDENTIFIER, 0)!;
    }
    public typeExpr(): TypeExprContext {
        return this.getRuleContext(0, TypeExprContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
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
        return this.getToken(Stage10Parser.OPTIONAL, 0);
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_typeProp;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterTypeProp) {
             listener.enterTypeProp(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.READONLY, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_propModifier;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterPropModifier) {
             listener.enterPropModifier(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public LIT(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.LIT, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
    }
    public STRING(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.STRING, 0);
    }
    public NUMBER(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.NUMBER, 0);
    }
    public BOOLEAN(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.BOOLEAN, 0);
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_typeLiteral;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterTypeLiteral) {
             listener.enterTypeLiteral(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public KEYOF(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.KEYOF, 0)!;
    }
    public typeExpr(): TypeExprContext {
        return this.getRuleContext(0, TypeExprContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_typeKeyof;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterTypeKeyof) {
             listener.enterTypeKeyof(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public TYPEOF(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.TYPEOF, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_typeTypeof;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterTypeTypeof) {
             listener.enterTypeTypeof(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public INDEX(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.INDEX, 0)!;
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
        return this.getToken(Stage10Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_typeIndexAccess;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterTypeIndexAccess) {
             listener.enterTypeIndexAccess(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public COND(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.COND, 0)!;
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
        return this.getToken(Stage10Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_typeConditional;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterTypeConditional) {
             listener.enterTypeConditional(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public INFER(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.INFER, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_typeInfer;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterTypeInfer) {
             listener.enterTypeInfer(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public MAPPED(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.MAPPED, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.IDENTIFIER, 0)!;
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
        return this.getToken(Stage10Parser.RPAREN, 0)!;
    }
    public mappedModifiers(): MappedModifiersContext | null {
        return this.getRuleContext(0, MappedModifiersContext);
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_typeMapped;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterTypeMapped) {
             listener.enterTypeMapped(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public MODIFIERS(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.MODIFIERS, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
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
        return Stage10Parser.RULE_mappedModifiers;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterMappedModifiers) {
             listener.enterMappedModifiers(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.READONLY, 0);
    }
    public OPTIONAL(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.OPTIONAL, 0);
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_mappedModifier;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterMappedModifier) {
             listener.enterMappedModifier(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public TYPE_TEMPLATE(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.TYPE_TEMPLATE, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
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
        return Stage10Parser.RULE_typeTemplateLiteral;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterTypeTemplateLiteral) {
             listener.enterTypeTemplateLiteral(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.STRING, 0);
    }
    public typeExpr(): TypeExprContext | null {
        return this.getRuleContext(0, TypeExprContext);
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_templatePart;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterTemplatePart) {
             listener.enterTemplatePart(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public TYPE_APP(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.TYPE_APP, 0)!;
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
        return this.getToken(Stage10Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_typeApplication;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterTypeApplication) {
             listener.enterTypeApplication(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public TYPE_PARAMS(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.TYPE_PARAMS, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
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
        return Stage10Parser.RULE_typeParams;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterTypeParams) {
             listener.enterTypeParams(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
    }
    public typeParamConstraint(): TypeParamConstraintContext | null {
        return this.getRuleContext(0, TypeParamConstraintContext);
    }
    public typeParamDefault(): TypeParamDefaultContext | null {
        return this.getRuleContext(0, TypeParamDefaultContext);
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_typeParamDecl;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterTypeParamDecl) {
             listener.enterTypeParamDecl(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public EXTENDS(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.EXTENDS, 0)!;
    }
    public typeExpr(): TypeExprContext {
        return this.getRuleContext(0, TypeExprContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_typeParamConstraint;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterTypeParamConstraint) {
             listener.enterTypeParamConstraint(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public DEFAULT(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.DEFAULT, 0)!;
    }
    public typeExpr(): TypeExprContext {
        return this.getRuleContext(0, TypeExprContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_typeParamDefault;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterTypeParamDefault) {
             listener.enterTypeParamDefault(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public SET(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.SET, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.IDENTIFIER, 0);
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
    }
    public propAccess(): PropAccessContext | null {
        return this.getRuleContext(0, PropAccessContext);
    }
    public indexAccess(): IndexAccessContext | null {
        return this.getRuleContext(0, IndexAccessContext);
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_assign;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterAssign) {
             listener.enterAssign(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public PLUS_ASSIGN(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.PLUS_ASSIGN, 0);
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.IDENTIFIER, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
    }
    public MINUS_ASSIGN(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.MINUS_ASSIGN, 0);
    }
    public TIMES_ASSIGN(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.TIMES_ASSIGN, 0);
    }
    public DIV_ASSIGN(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.DIV_ASSIGN, 0);
    }
    public MOD_ASSIGN(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.MOD_ASSIGN, 0);
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_compoundAssign;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterCompoundAssign) {
             listener.enterCompoundAssign(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
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
        return this.getToken(Stage10Parser.LBRACK, 0)!;
    }
    public RBRACK(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RBRACK, 0)!;
    }
    public EQUALS(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.EQUALS, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_subscriptAssign;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterSubscriptAssign) {
             listener.enterSubscriptAssign(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public SWITCH(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.SWITCH, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
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
        return Stage10Parser.RULE_switchForm;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterSwitchForm) {
             listener.enterSwitchForm(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public CASE(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.CASE, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
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
        return Stage10Parser.RULE_caseClause;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterCaseClause) {
             listener.enterCaseClause(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public DEFAULT(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.DEFAULT, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
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
        return Stage10Parser.RULE_defaultClause;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterDefaultClause) {
             listener.enterDefaultClause(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
    		return this.getTokens(Stage10Parser.LPAREN);
    	} else {
    		return this.getToken(Stage10Parser.LPAREN, i);
    	}
    }
    public FOR(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.FOR, 0)!;
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
    		return this.getTokens(Stage10Parser.RPAREN);
    	} else {
    		return this.getToken(Stage10Parser.RPAREN, i);
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
        return this.getToken(Stage10Parser.IDENTIFIER, 0);
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_forForm;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterForForm) {
             listener.enterForForm(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public FORIN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.FORIN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.IDENTIFIER, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
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
        return Stage10Parser.RULE_forInForm;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterForInForm) {
             listener.enterForInForm(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public FOROF(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.FOROF, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.IDENTIFIER, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
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
        return Stage10Parser.RULE_forOfForm;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterForOfForm) {
             listener.enterForOfForm(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public FORAWAIT(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.FORAWAIT, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.IDENTIFIER, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
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
        return Stage10Parser.RULE_forAwaitForm;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterForAwaitForm) {
             listener.enterForAwaitForm(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public EXCEPT(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.EXCEPT, 0)!;
    }
    public tryClause(): TryClauseContext {
        return this.getRuleContext(0, TryClauseContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
    }
    public catchClause(): CatchClauseContext | null {
        return this.getRuleContext(0, CatchClauseContext);
    }
    public finallyClause(): FinallyClauseContext | null {
        return this.getRuleContext(0, FinallyClauseContext);
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_exceptForm;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterExceptForm) {
             listener.enterExceptForm(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public TRY(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.TRY, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
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
        return Stage10Parser.RULE_tryClause;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterTryClause) {
             listener.enterTryClause(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public CATCH(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.CATCH, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
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
        return Stage10Parser.RULE_catchClause;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterCatchClause) {
             listener.enterCatchClause(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public FINALLY(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.FINALLY, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
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
        return Stage10Parser.RULE_finallyClause;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterFinallyClause) {
             listener.enterFinallyClause(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.IDENTIFIER, 0);
    }
    public MACRO_ERROR(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.MACRO_ERROR, 0);
    }
    public MINUS(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.MINUS, 0);
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
    public iifeForm(): IifeFormContext | null {
        return this.getRuleContext(0, IifeFormContext);
    }
    public iifeAsyncForm(): IifeAsyncFormContext | null {
        return this.getRuleContext(0, IifeAsyncFormContext);
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
        return Stage10Parser.RULE_expression;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterExpression) {
             listener.enterExpression(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.THIS, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_thisExpr;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterThisExpr) {
             listener.enterThisExpr(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.SUPER, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_superExpr;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterSuperExpr) {
             listener.enterSuperExpr(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public SUPER(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.SUPER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
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
        return Stage10Parser.RULE_superConstructorCall;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterSuperConstructorCall) {
             listener.enterSuperConstructorCall(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public SUPER_METHOD(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.SUPER_METHOD, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
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
        return Stage10Parser.RULE_superMethodCall;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterSuperMethodCall) {
             listener.enterSuperMethodCall(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public TYPEOF(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.TYPEOF, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_typeofExpr;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterTypeofExpr) {
             listener.enterTypeofExpr(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public TYPE_AS(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.TYPE_AS, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public typeExpr(): TypeExprContext {
        return this.getRuleContext(0, TypeExprContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_typeAssert;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterTypeAssert) {
             listener.enterTypeAssert(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public LAMBDA(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.LAMBDA, 0)!;
    }
    public fnSignature(): FnSignatureContext {
        return this.getRuleContext(0, FnSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
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
        return Stage10Parser.RULE_lambda;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterLambda) {
             listener.enterLambda(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public FN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.FN, 0)!;
    }
    public fnSignature(): FnSignatureContext {
        return this.getRuleContext(0, FnSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.IDENTIFIER, 0);
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
        return Stage10Parser.RULE_fn;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterFn) {
             listener.enterFn(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public ASYNC_LAMBDA(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.ASYNC_LAMBDA, 0)!;
    }
    public fnSignature(): FnSignatureContext {
        return this.getRuleContext(0, FnSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
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
        return Stage10Parser.RULE_asyncLambda;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterAsyncLambda) {
             listener.enterAsyncLambda(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public ASYNC_FN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.ASYNC_FN, 0)!;
    }
    public fnSignature(): FnSignatureContext {
        return this.getRuleContext(0, FnSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
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
        return Stage10Parser.RULE_asyncFn;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterAsyncFn) {
             listener.enterAsyncFn(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public GENERATOR_FN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.GENERATOR_FN, 0)!;
    }
    public fnSignature(): FnSignatureContext {
        return this.getRuleContext(0, FnSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
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
        return Stage10Parser.RULE_generatorFn;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterGeneratorFn) {
             listener.enterGeneratorFn(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public ASYNC_GENERATOR_FN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.ASYNC_GENERATOR_FN, 0)!;
    }
    public fnSignature(): FnSignatureContext {
        return this.getRuleContext(0, FnSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
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
        return Stage10Parser.RULE_asyncGeneratorFn;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterAsyncGeneratorFn) {
             listener.enterAsyncGeneratorFn(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
        if(listener.exitAsyncGeneratorFn) {
             listener.exitAsyncGeneratorFn(this);
        }
    }
}


export class IifeFormContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public IIFE(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.IIFE, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
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
        return Stage10Parser.RULE_iifeForm;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterIifeForm) {
             listener.enterIifeForm(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
        if(listener.exitIifeForm) {
             listener.exitIifeForm(this);
        }
    }
}


export class IifeAsyncFormContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public IIFE_ASYNC(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.IIFE_ASYNC, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
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
        return Stage10Parser.RULE_iifeAsyncForm;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterIifeAsyncForm) {
             listener.enterIifeAsyncForm(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
        if(listener.exitIifeAsyncForm) {
             listener.exitIifeAsyncForm(this);
        }
    }
}


export class FnOContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public FN_O(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.FN_O, 0)!;
    }
    public fnoSignature(): FnoSignatureContext {
        return this.getRuleContext(0, FnoSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.IDENTIFIER, 0);
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
        return Stage10Parser.RULE_fnO;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterFnO) {
             listener.enterFnO(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public LAMBDA_O(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.LAMBDA_O, 0)!;
    }
    public fnoSignature(): FnoSignatureContext {
        return this.getRuleContext(0, FnoSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
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
        return Stage10Parser.RULE_lambdaO;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterLambdaO) {
             listener.enterLambdaO(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public ASYNC_FN_O(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.ASYNC_FN_O, 0)!;
    }
    public fnoSignature(): FnoSignatureContext {
        return this.getRuleContext(0, FnoSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
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
        return Stage10Parser.RULE_asyncFnO;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterAsyncFnO) {
             listener.enterAsyncFnO(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public ASYNC_LAMBDA_O(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.ASYNC_LAMBDA_O, 0)!;
    }
    public fnoSignature(): FnoSignatureContext {
        return this.getRuleContext(0, FnoSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
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
        return Stage10Parser.RULE_asyncLambdaO;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterAsyncLambdaO) {
             listener.enterAsyncLambdaO(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public GENERATOR_FN_O(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.GENERATOR_FN_O, 0)!;
    }
    public fnoSignature(): FnoSignatureContext {
        return this.getRuleContext(0, FnoSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
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
        return Stage10Parser.RULE_generatorFnO;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterGeneratorFnO) {
             listener.enterGeneratorFnO(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public ASYNC_GENERATOR_FN_O(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.ASYNC_GENERATOR_FN_O, 0)!;
    }
    public fnoSignature(): FnoSignatureContext {
        return this.getRuleContext(0, FnoSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
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
        return Stage10Parser.RULE_asyncGeneratorFnO;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterAsyncGeneratorFnO) {
             listener.enterAsyncGeneratorFnO(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public METHOD_O(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.METHOD_O, 0)!;
    }
    public methodKey(): MethodKeyContext {
        return this.getRuleContext(0, MethodKeyContext)!;
    }
    public fnoSignature(): FnoSignatureContext {
        return this.getRuleContext(0, FnoSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
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
        return Stage10Parser.RULE_methodO;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterMethodO) {
             listener.enterMethodO(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public ABSTRACT_METHOD_O(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.ABSTRACT_METHOD_O, 0)!;
    }
    public methodKey(): MethodKeyContext {
        return this.getRuleContext(0, MethodKeyContext)!;
    }
    public fnoSignature(): FnoSignatureContext {
        return this.getRuleContext(0, FnoSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
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
        return Stage10Parser.RULE_abstractMethodO;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterAbstractMethodO) {
             listener.enterAbstractMethodO(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public CONSTRUCTOR_O(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.CONSTRUCTOR_O, 0)!;
    }
    public fnoSignature(): FnoSignatureContext {
        return this.getRuleContext(0, FnoSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
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
        return Stage10Parser.RULE_constructorO;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterConstructorO) {
             listener.enterConstructorO(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
    }
    public COLON(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.COLON, 0);
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
        return Stage10Parser.RULE_fnoSignature;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterFnoSignature) {
             listener.enterFnoSignature(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
    		return this.getTokens(Stage10Parser.LPAREN);
    	} else {
    		return this.getToken(Stage10Parser.LPAREN, i);
    	}
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode[];
    public RPAREN(i: number): antlr.TerminalNode | null;
    public RPAREN(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage10Parser.RPAREN);
    	} else {
    		return this.getToken(Stage10Parser.RPAREN, i);
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
    public OPTIONAL(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.OPTIONAL, 0);
    }
    public COLON(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.COLON, 0);
    }
    public typeExpr(): TypeExprContext | null {
        return this.getRuleContext(0, TypeExprContext);
    }
    public DEFAULT(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.DEFAULT, 0);
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_fnoParam;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterFnoParam) {
             listener.enterFnoParam(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public REST(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.REST, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
    }
    public COLON(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.COLON, 0);
    }
    public typeExpr(): TypeExprContext | null {
        return this.getRuleContext(0, TypeExprContext);
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_fnoRestParam;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterFnoRestParam) {
             listener.enterFnoRestParam(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public AWAIT(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.AWAIT, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_awaitExpr;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterAwaitExpr) {
             listener.enterAwaitExpr(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public YIELD(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.YIELD, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_yieldExpr;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterYieldExpr) {
             listener.enterYieldExpr(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public YIELD_STAR(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.YIELD_STAR, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_yieldStarExpr;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterYieldStarExpr) {
             listener.enterYieldStarExpr(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public BIND(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.BIND, 0)!;
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
        return this.getToken(Stage10Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_bindExpr;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterBindExpr) {
             listener.enterBindExpr(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public METHOD_CALL(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.METHOD_CALL, 0)!;
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
        return this.getToken(Stage10Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_methodCallExpr;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterMethodCallExpr) {
             listener.enterMethodCallExpr(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public TERNARY(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.TERNARY, 0)!;
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
        return this.getToken(Stage10Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_ternary;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterTernary) {
             listener.enterTernary(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public COND(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.COND, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
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
        return Stage10Parser.RULE_condExpr;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterCondExpr) {
             listener.enterCondExpr(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return Stage10Parser.RULE_condClause;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterCondClause) {
             listener.enterCondClause(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.ELSE, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_condElseClause;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterCondElseClause) {
             listener.enterCondElseClause(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public NEW(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.NEW, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
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
        return Stage10Parser.RULE_newForm;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterNewForm) {
             listener.enterNewForm(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public OBJECT(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.OBJECT, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
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
        return Stage10Parser.RULE_objectExpr;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterObjectExpr) {
             listener.enterObjectExpr(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
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
        return this.getToken(Stage10Parser.RPAREN, 0)!;
    }
    public methodDef(): MethodDefContext | null {
        return this.getRuleContext(0, MethodDefContext);
    }
    public IDENTIFIER(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.IDENTIFIER, 0);
    }
    public LBRACK(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.LBRACK, 0);
    }
    public RBRACK(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.RBRACK, 0);
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_objectField;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterObjectField) {
             listener.enterObjectField(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public METHOD(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.METHOD, 0)!;
    }
    public fnSignature(): FnSignatureContext {
        return this.getRuleContext(0, FnSignatureContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
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
        return Stage10Parser.RULE_methodDef;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterMethodDef) {
             listener.enterMethodDef(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public ARRAY(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.ARRAY, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
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
        return Stage10Parser.RULE_arrayExpr;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterArrayExpr) {
             listener.enterArrayExpr(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LBRACK, 0)!;
    }
    public RBRACK(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RBRACK, 0)!;
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
    		return this.getTokens(Stage10Parser.COMMA);
    	} else {
    		return this.getToken(Stage10Parser.COMMA, i);
    	}
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_bracketArrayExpr;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterBracketArrayExpr) {
             listener.enterBracketArrayExpr(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LBRACE, 0)!;
    }
    public RBRACE(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RBRACE, 0)!;
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
    		return this.getTokens(Stage10Parser.COMMA);
    	} else {
    		return this.getToken(Stage10Parser.COMMA, i);
    	}
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_braceObjectExpr;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterBraceObjectExpr) {
             listener.enterBraceObjectExpr(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
        if(listener.exitBraceObjectExpr) {
             listener.exitBraceObjectExpr(this);
        }
    }
}


export class BraceObjectFieldContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public propKey(): PropKeyContext | null {
        return this.getRuleContext(0, PropKeyContext);
    }
    public COLON(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.COLON, 0);
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
    }
    public LBRACK(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.LBRACK, 0);
    }
    public RBRACK(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.RBRACK, 0);
    }
    public IDENTIFIER(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.IDENTIFIER, 0);
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_braceObjectField;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterBraceObjectField) {
             listener.enterBraceObjectField(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public TEMPLATE(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.TEMPLATE, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
    }
    public STRING(): antlr.TerminalNode[];
    public STRING(i: number): antlr.TerminalNode | null;
    public STRING(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Stage10Parser.STRING);
    	} else {
    		return this.getToken(Stage10Parser.STRING, i);
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
        return Stage10Parser.RULE_templateExpr;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterTemplateExpr) {
             listener.enterTemplateExpr(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.IDENTIFIER, 0);
    }
    public STRING(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.STRING, 0);
    }
    public NUMBER(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.NUMBER, 0);
    }
    public PROGRAM(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.PROGRAM, 0);
    }
    public LET(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.LET, 0);
    }
    public VAR(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.VAR, 0);
    }
    public CONST(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.CONST, 0);
    }
    public LAMBDA_O(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.LAMBDA_O, 0);
    }
    public LAMBDA(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.LAMBDA, 0);
    }
    public FN_O(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.FN_O, 0);
    }
    public FN(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.FN, 0);
    }
    public METHOD_O(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.METHOD_O, 0);
    }
    public METHOD(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.METHOD, 0);
    }
    public BIND(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.BIND, 0);
    }
    public METHOD_CALL(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.METHOD_CALL, 0);
    }
    public DEFMACRO(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.DEFMACRO, 0);
    }
    public MACRO_IMPORT(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.MACRO_IMPORT, 0);
    }
    public MACRO_EXPORT(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.MACRO_EXPORT, 0);
    }
    public MACRO_REEXPORT(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.MACRO_REEXPORT, 0);
    }
    public MACRO_TIME_ATTR(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.MACRO_TIME_ATTR, 0);
    }
    public MACRO_ERROR(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.MACRO_ERROR, 0);
    }
    public IF(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.IF, 0);
    }
    public WHILE(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.WHILE, 0);
    }
    public THEN(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.THEN, 0);
    }
    public RETURN(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.RETURN, 0);
    }
    public THROW(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.THROW, 0);
    }
    public SET(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.SET, 0);
    }
    public TERNARY(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.TERNARY, 0);
    }
    public COND(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.COND, 0);
    }
    public OBJECT(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.OBJECT, 0);
    }
    public ARRAY(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.ARRAY, 0);
    }
    public INDEX(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.INDEX, 0);
    }
    public QUASI(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.QUASI, 0);
    }
    public QUOTE(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.QUOTE, 0);
    }
    public UNQUOTE_SPLICING(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.UNQUOTE_SPLICING, 0);
    }
    public UNQUOTE(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.UNQUOTE, 0);
    }
    public TYPE_ARRAY(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.TYPE_ARRAY, 0);
    }
    public NEW(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.NEW, 0);
    }
    public IMPORT(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.IMPORT, 0);
    }
    public SWITCH(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.SWITCH, 0);
    }
    public CASE(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.CASE, 0);
    }
    public DEFAULT(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.DEFAULT, 0);
    }
    public FORIN(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.FORIN, 0);
    }
    public FOROF(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.FOROF, 0);
    }
    public FOR(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.FOR, 0);
    }
    public FORAWAIT(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.FORAWAIT, 0);
    }
    public TRY(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.TRY, 0);
    }
    public CATCH(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.CATCH, 0);
    }
    public FINALLY(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.FINALLY, 0);
    }
    public EXCEPT(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.EXCEPT, 0);
    }
    public AS(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.AS, 0);
    }
    public UNION(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.UNION, 0);
    }
    public INTERSECT(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.INTERSECT, 0);
    }
    public TUPLE(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.TUPLE, 0);
    }
    public TYPEFN(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.TYPEFN, 0);
    }
    public LIT(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.LIT, 0);
    }
    public KEYOF(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.KEYOF, 0);
    }
    public TYPEOF(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.TYPEOF, 0);
    }
    public INFER(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.INFER, 0);
    }
    public MAPPED(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.MAPPED, 0);
    }
    public TYPE_TEMPLATE(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.TYPE_TEMPLATE, 0);
    }
    public TEMPLATE(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.TEMPLATE, 0);
    }
    public REST(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.REST, 0);
    }
    public READONLY(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.READONLY, 0);
    }
    public TYPE_AS(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.TYPE_AS, 0);
    }
    public TYPE_PARAMS(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.TYPE_PARAMS, 0);
    }
    public TYPE_ARGS(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.TYPE_ARGS, 0);
    }
    public TYPE_APP(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.TYPE_APP, 0);
    }
    public EXTENDS(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.EXTENDS, 0);
    }
    public RETURNS(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.RETURNS, 0);
    }
    public TYPE(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.TYPE, 0);
    }
    public INTERFACE(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.INTERFACE, 0);
    }
    public ENUM(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.ENUM, 0);
    }
    public MODIFIERS(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.MODIFIERS, 0);
    }
    public BOOLEAN(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.BOOLEAN, 0);
    }
    public NULL(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.NULL, 0);
    }
    public UNDEFINED(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.UNDEFINED, 0);
    }
    public EXPORT(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.EXPORT, 0);
    }
    public EXPORT_DEFAULT(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.EXPORT_DEFAULT, 0);
    }
    public EXPORT_NAMED(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.EXPORT_NAMED, 0);
    }
    public EXPORT_NS_FROM(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.EXPORT_NS_FROM, 0);
    }
    public EXPORT_FROM(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.EXPORT_FROM, 0);
    }
    public EXPORT_ALL_FROM(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.EXPORT_ALL_FROM, 0);
    }
    public IMPORT_TYPE(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.IMPORT_TYPE, 0);
    }
    public EXPORT_TYPE(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.EXPORT_TYPE, 0);
    }
    public EXPORT_TYPE_FROM(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.EXPORT_TYPE_FROM, 0);
    }
    public EXPORT_TYPE_ALL_FROM(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.EXPORT_TYPE_ALL_FROM, 0);
    }
    public CLASS(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.CLASS, 0);
    }
    public CLASS_BODY(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.CLASS_BODY, 0);
    }
    public FIELD(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.FIELD, 0);
    }
    public CONSTRUCTOR_O(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.CONSTRUCTOR_O, 0);
    }
    public CONSTRUCTOR(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.CONSTRUCTOR, 0);
    }
    public THIS(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.THIS, 0);
    }
    public SUPER(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.SUPER, 0);
    }
    public SUPER_METHOD(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.SUPER_METHOD, 0);
    }
    public GET(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.GET, 0);
    }
    public SETPROP(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.SETPROP, 0);
    }
    public ABSTRACT_METHOD_O(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.ABSTRACT_METHOD_O, 0);
    }
    public ABSTRACT_METHOD(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.ABSTRACT_METHOD, 0);
    }
    public IMPLEMENTS(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.IMPLEMENTS, 0);
    }
    public MIXIN(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.MIXIN, 0);
    }
    public DECLARE(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.DECLARE, 0);
    }
    public ASYNC_GENERATOR_FN_O(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.ASYNC_GENERATOR_FN_O, 0);
    }
    public ASYNC_GENERATOR_FN(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.ASYNC_GENERATOR_FN, 0);
    }
    public ASYNC_LAMBDA_O(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.ASYNC_LAMBDA_O, 0);
    }
    public ASYNC_LAMBDA(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.ASYNC_LAMBDA, 0);
    }
    public ASYNC_FN_O(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.ASYNC_FN_O, 0);
    }
    public ASYNC_FN(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.ASYNC_FN, 0);
    }
    public GENERATOR_FN_O(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.GENERATOR_FN_O, 0);
    }
    public GENERATOR_FN(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.GENERATOR_FN, 0);
    }
    public YIELD_STAR(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.YIELD_STAR, 0);
    }
    public YIELD(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.YIELD, 0);
    }
    public AWAIT(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.AWAIT, 0);
    }
    public CARET(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.CARET, 0);
    }
    public PUBLIC(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.PUBLIC, 0);
    }
    public PRIVATE(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.PRIVATE, 0);
    }
    public PROTECTED(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.PROTECTED, 0);
    }
    public STATIC(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.STATIC, 0);
    }
    public ABSTRACT(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.ABSTRACT, 0);
    }
    public OVERRIDE(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.OVERRIDE, 0);
    }
    public ASYNC(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.ASYNC, 0);
    }
    public GENERATOR(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.GENERATOR, 0);
    }
    public ELSE(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.ELSE, 0);
    }
    public STRICT_EQ(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.STRICT_EQ, 0);
    }
    public STRICT_NEQ(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.STRICT_NEQ, 0);
    }
    public EQ_OP(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.EQ_OP, 0);
    }
    public NEQ_OP(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.NEQ_OP, 0);
    }
    public GTE_OP(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.GTE_OP, 0);
    }
    public LTE_OP(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.LTE_OP, 0);
    }
    public PLUS(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.PLUS, 0);
    }
    public STAR(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.STAR, 0);
    }
    public SLASH(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.SLASH, 0);
    }
    public PERCENT(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.PERCENT, 0);
    }
    public STARSTAR(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.STARSTAR, 0);
    }
    public LT(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.LT, 0);
    }
    public GT(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.GT, 0);
    }
    public BANG(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.BANG, 0);
    }
    public AMP(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.AMP, 0);
    }
    public PIPE(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.PIPE, 0);
    }
    public AMPAMP(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.AMPAMP, 0);
    }
    public PIPEPIPE(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.PIPEPIPE, 0);
    }
    public TILDE(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.TILDE, 0);
    }
    public NULLCOAL(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.NULLCOAL, 0);
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_propKey;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterPropKey) {
             listener.enterPropKey(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.STRICT_EQ, 0);
    }
    public STRICT_NEQ(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.STRICT_NEQ, 0);
    }
    public EQ_OP(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.EQ_OP, 0);
    }
    public NEQ_OP(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.NEQ_OP, 0);
    }
    public GTE_OP(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.GTE_OP, 0);
    }
    public LTE_OP(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.LTE_OP, 0);
    }
    public EQUALS(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.EQUALS, 0);
    }
    public PLUS(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.PLUS, 0);
    }
    public STAR(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.STAR, 0);
    }
    public SLASH(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.SLASH, 0);
    }
    public PERCENT(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.PERCENT, 0);
    }
    public STARSTAR(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.STARSTAR, 0);
    }
    public LT(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.LT, 0);
    }
    public GT(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.GT, 0);
    }
    public BANG(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.BANG, 0);
    }
    public AMP(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.AMP, 0);
    }
    public PIPE(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.PIPE, 0);
    }
    public AMPAMP(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.AMPAMP, 0);
    }
    public PIPEPIPE(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.PIPEPIPE, 0);
    }
    public CARET(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.CARET, 0);
    }
    public TILDE(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.TILDE, 0);
    }
    public NULLCOAL(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.NULLCOAL, 0);
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_opSymbol;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterOpSymbol) {
             listener.enterOpSymbol(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public DOT(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.DOT, 0)!;
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
        return this.getToken(Stage10Parser.RPAREN, 0)!;
    }
    public LBRACK(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.LBRACK, 0);
    }
    public RBRACK(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.RBRACK, 0);
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_propAccess;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterPropAccess) {
             listener.enterPropAccess(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public SUBSCRIPT(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.SUBSCRIPT, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public STRING(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.STRING, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_subscriptAccess;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterSubscriptAccess) {
             listener.enterSubscriptAccess(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public INDEX(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.INDEX, 0)!;
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
        return this.getToken(Stage10Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_indexAccess;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterIndexAccess) {
             listener.enterIndexAccess(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public quasiForm(): QuasiFormContext {
        return this.getRuleContext(0, QuasiFormContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
    }
    public QUASI(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.QUASI, 0);
    }
    public QUOTE(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.QUOTE, 0);
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_quasiquote;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterQuasiquote) {
             listener.enterQuasiquote(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return Stage10Parser.RULE_quasiForm;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterQuasiForm) {
             listener.enterQuasiForm(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0);
    }
    public UNQUOTE(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.UNQUOTE, 0);
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public RPAREN(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.RPAREN, 0);
    }
    public UNQUOTE_SPLICING(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.UNQUOTE_SPLICING, 0);
    }
    public TILDE(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.TILDE, 0);
    }
    public TILDE_AT(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.TILDE_AT, 0);
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
        return Stage10Parser.RULE_sForm;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterSForm) {
             listener.enterSForm(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public UNQUOTE(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.UNQUOTE, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_unquote;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterUnquote) {
             listener.enterUnquote(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public UNQUOTE_SPLICING(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.UNQUOTE_SPLICING, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_unquoteSplicing;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterUnquoteSplicing) {
             listener.enterUnquoteSplicing(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.TILDE, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_tildeUnquote;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterTildeUnquote) {
             listener.enterTildeUnquote(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.TILDE_AT, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_tildeUnquoteSplice;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterTildeUnquoteSplice) {
             listener.enterTildeUnquoteSplice(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public OPTCHAIN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.OPTCHAIN, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public propKey(): PropKeyContext {
        return this.getRuleContext(0, PropKeyContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_optChain;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterOptChain) {
             listener.enterOptChain(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public OPTCHAIN_INDEX(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.OPTCHAIN_INDEX, 0)!;
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
        return this.getToken(Stage10Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_optChainIndex;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterOptChainIndex) {
             listener.enterOptChainIndex(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public NULLCOAL(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.NULLCOAL, 0)!;
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
        return this.getToken(Stage10Parser.RPAREN, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_nullCoalesce;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterNullCoalesce) {
             listener.enterNullCoalesce(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.HASH_LBRACE, 0)!;
    }
    public infixBody(): InfixBodyContext {
        return this.getRuleContext(0, InfixBodyContext)!;
    }
    public RBRACE(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RBRACE, 0)!;
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_infixExpr;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterInfixExpr) {
             listener.enterInfixExpr(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return Stage10Parser.RULE_infixBody;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterInfixBody) {
             listener.enterInfixBody(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.IDENTIFIER, 0);
    }
    public LPAREN(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.LPAREN, 0);
    }
    public RPAREN(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.RPAREN, 0);
    }
    public infixArgs(): InfixArgsContext | null {
        return this.getRuleContext(0, InfixArgsContext);
    }
    public LBRACE(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.LBRACE, 0);
    }
    public infixBody(): InfixBodyContext | null {
        return this.getRuleContext(0, InfixBodyContext);
    }
    public RBRACE(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.RBRACE, 0);
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
        return Stage10Parser.RULE_infixAtom;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterInfixAtom) {
             listener.enterInfixAtom(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
    		return this.getTokens(Stage10Parser.COMMA);
    	} else {
    		return this.getToken(Stage10Parser.COMMA, i);
    	}
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_infixArgs;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterInfixArgs) {
             listener.enterInfixArgs(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.MINUS, 0);
    }
    public BANG(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.BANG, 0);
    }
    public TILDE(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.TILDE, 0);
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_infixUnaryOp;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterInfixUnaryOp) {
             listener.enterInfixUnaryOp(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.PLUS, 0);
    }
    public MINUS(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.MINUS, 0);
    }
    public STAR(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.STAR, 0);
    }
    public SLASH(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.SLASH, 0);
    }
    public PERCENT(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.PERCENT, 0);
    }
    public STARSTAR(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.STARSTAR, 0);
    }
    public LT(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.LT, 0);
    }
    public GT(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.GT, 0);
    }
    public LTE_OP(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.LTE_OP, 0);
    }
    public GTE_OP(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.GTE_OP, 0);
    }
    public STRICT_EQ(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.STRICT_EQ, 0);
    }
    public STRICT_NEQ(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.STRICT_NEQ, 0);
    }
    public EQ_OP(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.EQ_OP, 0);
    }
    public NEQ_OP(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.NEQ_OP, 0);
    }
    public AMPAMP(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.AMPAMP, 0);
    }
    public PIPEPIPE(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.PIPEPIPE, 0);
    }
    public NULLCOAL(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.NULLCOAL, 0);
    }
    public AMP(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.AMP, 0);
    }
    public PIPE(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.PIPE, 0);
    }
    public CARET(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.CARET, 0);
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_infixBinOp;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterInfixBinOp) {
             listener.enterInfixBinOp(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.IDENTIFIER, 0)!;
    }
    public FAT_ARROW(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.FAT_ARROW, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
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
        return Stage10Parser.RULE_macroExprCall;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterMacroExprCall) {
             listener.enterMacroExprCall(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.IDENTIFIER, 0)!;
    }
    public STMT_ARROW(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.STMT_ARROW, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
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
        return Stage10Parser.RULE_macroBodyCall;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterMacroBodyCall) {
             listener.enterMacroBodyCall(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
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
        return this.getToken(Stage10Parser.RPAREN, 0)!;
    }
    public typeArgs(): TypeArgsContext | null {
        return this.getRuleContext(0, TypeArgsContext);
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_call;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterCall) {
             listener.enterCall(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public TYPE_ARGS(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.TYPE_ARGS, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
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
        return Stage10Parser.RULE_typeArgs;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterTypeArgs) {
             listener.enterTypeArgs(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
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
        return this.getToken(Stage10Parser.COLON, 0);
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
    		return this.getTokens(Stage10Parser.COMMA);
    	} else {
    		return this.getToken(Stage10Parser.COMMA, i);
    	}
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_fnSignature;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterFnSignature) {
             listener.enterFnSignature(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
    }
    public OPTIONAL(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.OPTIONAL, 0);
    }
    public COLON(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.COLON, 0);
    }
    public typeExpr(): TypeExprContext | null {
        return this.getRuleContext(0, TypeExprContext);
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_param;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterParam) {
             listener.enterParam(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.LPAREN, 0)!;
    }
    public REST(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.REST, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage10Parser.RPAREN, 0)!;
    }
    public COLON(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.COLON, 0);
    }
    public typeExpr(): TypeExprContext | null {
        return this.getRuleContext(0, TypeExprContext);
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_restParam;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterRestParam) {
             listener.enterRestParam(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
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
        return this.getToken(Stage10Parser.NUMBER, 0);
    }
    public NEG_NUMBER(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.NEG_NUMBER, 0);
    }
    public STRING(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.STRING, 0);
    }
    public BOOLEAN(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.BOOLEAN, 0);
    }
    public NULL(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.NULL, 0);
    }
    public UNDEFINED(): antlr.TerminalNode | null {
        return this.getToken(Stage10Parser.UNDEFINED, 0);
    }
    public override get ruleIndex(): number {
        return Stage10Parser.RULE_literal;
    }
    public override enterRule(listener: Stage10Listener): void {
        if(listener.enterLiteral) {
             listener.enterLiteral(this);
        }
    }
    public override exitRule(listener: Stage10Listener): void {
        if(listener.exitLiteral) {
             listener.exitLiteral(this);
        }
    }
}
