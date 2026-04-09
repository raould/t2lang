
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
    public static readonly MIXIN = 74;
    public static readonly DECLARE = 75;
    public static readonly UNION = 76;
    public static readonly INTERSECT = 77;
    public static readonly TUPLE = 78;
    public static readonly TYPEFN = 79;
    public static readonly LIT = 80;
    public static readonly KEYOF = 81;
    public static readonly TYPEOF = 82;
    public static readonly TYPE_AS = 83;
    public static readonly INFER = 84;
    public static readonly MAPPED = 85;
    public static readonly TYPE_TEMPLATE = 86;
    public static readonly TEMPLATE = 87;
    public static readonly REST = 88;
    public static readonly READONLY = 89;
    public static readonly TYPE_PARAMS = 90;
    public static readonly TYPE_ARGS = 91;
    public static readonly TYPE_APP = 92;
    public static readonly EXTENDS = 93;
    public static readonly RETURNS = 94;
    public static readonly TYPE = 95;
    public static readonly INTERFACE = 96;
    public static readonly ENUM = 97;
    public static readonly MODIFIERS = 98;
    public static readonly OPTIONAL = 99;
    public static readonly BOOLEAN = 100;
    public static readonly NULL = 101;
    public static readonly UNDEFINED = 102;
    public static readonly COLON = 103;
    public static readonly ASYNC_GENERATOR_FN_O = 104;
    public static readonly ASYNC_GENERATOR_FN = 105;
    public static readonly ASYNC_LAMBDA_O = 106;
    public static readonly ASYNC_LAMBDA = 107;
    public static readonly ASYNC_FN_O = 108;
    public static readonly ASYNC_FN = 109;
    public static readonly GENERATOR_FN_O = 110;
    public static readonly GENERATOR_FN = 111;
    public static readonly YIELD_STAR = 112;
    public static readonly YIELD = 113;
    public static readonly AWAIT = 114;
    public static readonly CARET = 115;
    public static readonly PUBLIC = 116;
    public static readonly PRIVATE = 117;
    public static readonly PROTECTED = 118;
    public static readonly STATIC = 119;
    public static readonly ABSTRACT = 120;
    public static readonly OVERRIDE = 121;
    public static readonly ASYNC = 122;
    public static readonly GENERATOR = 123;
    public static readonly ELSE = 124;
    public static readonly LBRACK = 125;
    public static readonly RBRACK = 126;
    public static readonly STRICT_EQ = 127;
    public static readonly STRICT_NEQ = 128;
    public static readonly EQ_OP = 129;
    public static readonly NEQ_OP = 130;
    public static readonly GTE_OP = 131;
    public static readonly LTE_OP = 132;
    public static readonly FAT_ARROW = 133;
    public static readonly STMT_ARROW = 134;
    public static readonly PLUS_ASSIGN = 135;
    public static readonly MINUS_ASSIGN = 136;
    public static readonly TIMES_ASSIGN = 137;
    public static readonly DIV_ASSIGN = 138;
    public static readonly MOD_ASSIGN = 139;
    public static readonly EQUALS = 140;
    public static readonly LBRACE = 141;
    public static readonly RBRACE = 142;
    public static readonly HASH_LBRACE = 143;
    public static readonly STARSTAR = 144;
    public static readonly AMPAMP = 145;
    public static readonly PIPEPIPE = 146;
    public static readonly PLUS = 147;
    public static readonly STAR = 148;
    public static readonly SLASH = 149;
    public static readonly PERCENT = 150;
    public static readonly LT = 151;
    public static readonly GT = 152;
    public static readonly BANG = 153;
    public static readonly AMP = 154;
    public static readonly PIPE = 155;
    public static readonly EXPORT = 156;
    public static readonly EXPORT_DEFAULT = 157;
    public static readonly EXPORT_NAMED = 158;
    public static readonly EXPORT_NS_FROM = 159;
    public static readonly EXPORT_FROM = 160;
    public static readonly EXPORT_ALL_FROM = 161;
    public static readonly IMPORT_TYPE = 162;
    public static readonly EXPORT_TYPE_ALL_FROM = 163;
    public static readonly EXPORT_TYPE_FROM = 164;
    public static readonly EXPORT_TYPE = 165;
    public static readonly NUMBER = 166;
    public static readonly STRING = 167;
    public static readonly MULTILINE_STRING = 168;
    public static readonly NEG_NUMBER = 169;
    public static readonly MINUS = 170;
    public static readonly TILDE_AT = 171;
    public static readonly TILDE = 172;
    public static readonly IDENTIFIER = 173;
    public static readonly WS = 174;
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
    public static readonly RULE_constStmt = 41;
    public static readonly RULE_ifForm = 42;
    public static readonly RULE_thenBlock = 43;
    public static readonly RULE_elseBlock = 44;
    public static readonly RULE_whileForm = 45;
    public static readonly RULE_returnForm = 46;
    public static readonly RULE_throwForm = 47;
    public static readonly RULE_breakForm = 48;
    public static readonly RULE_continueForm = 49;
    public static readonly RULE_importForm = 50;
    public static readonly RULE_importTypeForm = 51;
    public static readonly RULE_importTypeSpec = 52;
    public static readonly RULE_importTypeName = 53;
    public static readonly RULE_exportForm = 54;
    public static readonly RULE_exportBinding = 55;
    public static readonly RULE_exportDefault = 56;
    public static readonly RULE_exportNamed = 57;
    public static readonly RULE_exportNamePair = 58;
    public static readonly RULE_exportFrom = 59;
    public static readonly RULE_exportAllFrom = 60;
    public static readonly RULE_exportNsFromForm = 61;
    public static readonly RULE_exportTypeForm = 62;
    public static readonly RULE_exportTypeFromForm = 63;
    public static readonly RULE_exportTypeAllFromForm = 64;
    public static readonly RULE_exportDeclForm = 65;
    public static readonly RULE_starBinding = 66;
    public static readonly RULE_singleBinding = 67;
    public static readonly RULE_objectDestructPat = 68;
    public static readonly RULE_arrayDestructPat = 69;
    public static readonly RULE_typeExpr = 70;
    public static readonly RULE_typeUnion = 71;
    public static readonly RULE_typeIntersection = 72;
    public static readonly RULE_typeArray = 73;
    public static readonly RULE_typeTuple = 74;
    public static readonly RULE_typeTupleElement = 75;
    public static readonly RULE_typeFunction = 76;
    public static readonly RULE_typeFnParam = 77;
    public static readonly RULE_typeObject = 78;
    public static readonly RULE_typeProp = 79;
    public static readonly RULE_propModifier = 80;
    public static readonly RULE_typeLiteral = 81;
    public static readonly RULE_typeKeyof = 82;
    public static readonly RULE_typeTypeof = 83;
    public static readonly RULE_typeIndexAccess = 84;
    public static readonly RULE_typeConditional = 85;
    public static readonly RULE_typeInfer = 86;
    public static readonly RULE_typeMapped = 87;
    public static readonly RULE_mappedModifiers = 88;
    public static readonly RULE_mappedModifier = 89;
    public static readonly RULE_typeTemplateLiteral = 90;
    public static readonly RULE_templatePart = 91;
    public static readonly RULE_typeApplication = 92;
    public static readonly RULE_typeParams = 93;
    public static readonly RULE_typeParamDecl = 94;
    public static readonly RULE_typeParamConstraint = 95;
    public static readonly RULE_typeParamDefault = 96;
    public static readonly RULE_assign = 97;
    public static readonly RULE_compoundAssign = 98;
    public static readonly RULE_subscriptAssign = 99;
    public static readonly RULE_switchForm = 100;
    public static readonly RULE_caseClause = 101;
    public static readonly RULE_defaultClause = 102;
    public static readonly RULE_forForm = 103;
    public static readonly RULE_forInForm = 104;
    public static readonly RULE_forOfForm = 105;
    public static readonly RULE_forAwaitForm = 106;
    public static readonly RULE_exceptForm = 107;
    public static readonly RULE_tryClause = 108;
    public static readonly RULE_catchClause = 109;
    public static readonly RULE_finallyClause = 110;
    public static readonly RULE_expression = 111;
    public static readonly RULE_thisExpr = 112;
    public static readonly RULE_superExpr = 113;
    public static readonly RULE_superConstructorCall = 114;
    public static readonly RULE_superMethodCall = 115;
    public static readonly RULE_typeofExpr = 116;
    public static readonly RULE_typeAssert = 117;
    public static readonly RULE_lambda = 118;
    public static readonly RULE_fn = 119;
    public static readonly RULE_asyncLambda = 120;
    public static readonly RULE_asyncFn = 121;
    public static readonly RULE_generatorFn = 122;
    public static readonly RULE_asyncGeneratorFn = 123;
    public static readonly RULE_fnO = 124;
    public static readonly RULE_lambdaO = 125;
    public static readonly RULE_asyncFnO = 126;
    public static readonly RULE_asyncLambdaO = 127;
    public static readonly RULE_generatorFnO = 128;
    public static readonly RULE_asyncGeneratorFnO = 129;
    public static readonly RULE_methodO = 130;
    public static readonly RULE_abstractMethodO = 131;
    public static readonly RULE_constructorO = 132;
    public static readonly RULE_fnoSignature = 133;
    public static readonly RULE_fnoParam = 134;
    public static readonly RULE_fnoRestParam = 135;
    public static readonly RULE_awaitExpr = 136;
    public static readonly RULE_yieldExpr = 137;
    public static readonly RULE_yieldStarExpr = 138;
    public static readonly RULE_bindExpr = 139;
    public static readonly RULE_methodCallExpr = 140;
    public static readonly RULE_ternary = 141;
    public static readonly RULE_condExpr = 142;
    public static readonly RULE_condClause = 143;
    public static readonly RULE_condElseClause = 144;
    public static readonly RULE_newForm = 145;
    public static readonly RULE_objectExpr = 146;
    public static readonly RULE_objectField = 147;
    public static readonly RULE_methodDef = 148;
    public static readonly RULE_arrayExpr = 149;
    public static readonly RULE_bracketArrayExpr = 150;
    public static readonly RULE_braceObjectExpr = 151;
    public static readonly RULE_braceObjectField = 152;
    public static readonly RULE_templateExpr = 153;
    public static readonly RULE_propKey = 154;
    public static readonly RULE_opSymbol = 155;
    public static readonly RULE_propAccess = 156;
    public static readonly RULE_subscriptAccess = 157;
    public static readonly RULE_indexAccess = 158;
    public static readonly RULE_quasiquote = 159;
    public static readonly RULE_quasiForm = 160;
    public static readonly RULE_sForm = 161;
    public static readonly RULE_unquote = 162;
    public static readonly RULE_unquoteSplicing = 163;
    public static readonly RULE_tildeUnquote = 164;
    public static readonly RULE_tildeUnquoteSplice = 165;
    public static readonly RULE_optChain = 166;
    public static readonly RULE_optChainIndex = 167;
    public static readonly RULE_nullCoalesce = 168;
    public static readonly RULE_infixExpr = 169;
    public static readonly RULE_infixBody = 170;
    public static readonly RULE_infixAtom = 171;
    public static readonly RULE_infixArgs = 172;
    public static readonly RULE_infixUnaryOp = 173;
    public static readonly RULE_infixBinOp = 174;
    public static readonly RULE_macroExprCall = 175;
    public static readonly RULE_macroBodyCall = 176;
    public static readonly RULE_call = 177;
    public static readonly RULE_typeArgs = 178;
    public static readonly RULE_fnSignature = 179;
    public static readonly RULE_param = 180;
    public static readonly RULE_restParam = 181;
    public static readonly RULE_literal = 182;

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
        "'this'", "'super'", "'get'", "'set'", "'implements'", "'mixin'", 
        "'declare'", "'union'", "'intersect'", "'tuple'", "'tfn'", "'tlit'", 
        "'keyof'", "'typeof'", "'type-as'", "'infer'", "'mapped'", "'type-template'", 
        "'template'", "'rest'", "'readonly'", "'type-params'", "'type-args'", 
        "'type-app'", "'extends'", "'returns'", "'type'", "'interface'", 
        "'enum'", "'modifiers'", "'?'", null, "'null'", "'undefined'", "':'", 
        "'async-generator-fn-o'", "'async-generator-fn'", "'async-lambda-o'", 
        "'async-lambda'", "'async-fn-o'", "'async-fn'", "'generator-fn-o'", 
        "'generator-fn'", "'yield*'", "'yield'", "'await'", "'^'", "'public'", 
        "'private'", "'protected'", "'static'", "'abstract'", "'override'", 
        "'async'", "'generator'", "'else'", "'['", "']'", "'==='", "'!=='", 
        "'=='", "'!='", "'>='", "'<='", "'=>'", "'=&'", "'+='", "'-='", 
        "'*='", "'/='", "'%='", "'='", "'{'", "'}'", "'#{'", "'**'", "'&&'", 
        "'||'", "'+'", "'*'", "'/'", "'%'", "'<'", "'>'", "'!'", "'&'", 
        "'|'", "'export'", "'export-default'", "'export-named'", "'export-ns-from'", 
        "'export-from'", "'export-all-from'", "'import-type'", "'export-type-all-from'", 
        "'export-type-from'", "'export-type'", null, null, null, null, "'-'", 
        "'~@'", "'~'"
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
        "MIXIN", "DECLARE", "UNION", "INTERSECT", "TUPLE", "TYPEFN", "LIT", 
        "KEYOF", "TYPEOF", "TYPE_AS", "INFER", "MAPPED", "TYPE_TEMPLATE", 
        "TEMPLATE", "REST", "READONLY", "TYPE_PARAMS", "TYPE_ARGS", "TYPE_APP", 
        "EXTENDS", "RETURNS", "TYPE", "INTERFACE", "ENUM", "MODIFIERS", 
        "OPTIONAL", "BOOLEAN", "NULL", "UNDEFINED", "COLON", "ASYNC_GENERATOR_FN_O", 
        "ASYNC_GENERATOR_FN", "ASYNC_LAMBDA_O", "ASYNC_LAMBDA", "ASYNC_FN_O", 
        "ASYNC_FN", "GENERATOR_FN_O", "GENERATOR_FN", "YIELD_STAR", "YIELD", 
        "AWAIT", "CARET", "PUBLIC", "PRIVATE", "PROTECTED", "STATIC", "ABSTRACT", 
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
        "letStmt", "varStmt", "constStar", "constStmt", "ifForm", "thenBlock", 
        "elseBlock", "whileForm", "returnForm", "throwForm", "breakForm", 
        "continueForm", "importForm", "importTypeForm", "importTypeSpec", 
        "importTypeName", "exportForm", "exportBinding", "exportDefault", 
        "exportNamed", "exportNamePair", "exportFrom", "exportAllFrom", 
        "exportNsFromForm", "exportTypeForm", "exportTypeFromForm", "exportTypeAllFromForm", 
        "exportDeclForm", "starBinding", "singleBinding", "objectDestructPat", 
        "arrayDestructPat", "typeExpr", "typeUnion", "typeIntersection", 
        "typeArray", "typeTuple", "typeTupleElement", "typeFunction", "typeFnParam", 
        "typeObject", "typeProp", "propModifier", "typeLiteral", "typeKeyof", 
        "typeTypeof", "typeIndexAccess", "typeConditional", "typeInfer", 
        "typeMapped", "mappedModifiers", "mappedModifier", "typeTemplateLiteral", 
        "templatePart", "typeApplication", "typeParams", "typeParamDecl", 
        "typeParamConstraint", "typeParamDefault", "assign", "compoundAssign", 
        "subscriptAssign", "switchForm", "caseClause", "defaultClause", 
        "forForm", "forInForm", "forOfForm", "forAwaitForm", "exceptForm", 
        "tryClause", "catchClause", "finallyClause", "expression", "thisExpr", 
        "superExpr", "superConstructorCall", "superMethodCall", "typeofExpr", 
        "typeAssert", "lambda", "fn", "asyncLambda", "asyncFn", "generatorFn", 
        "asyncGeneratorFn", "fnO", "lambdaO", "asyncFnO", "asyncLambdaO", 
        "generatorFnO", "asyncGeneratorFnO", "methodO", "abstractMethodO", 
        "constructorO", "fnoSignature", "fnoParam", "fnoRestParam", "awaitExpr", 
        "yieldExpr", "yieldStarExpr", "bindExpr", "methodCallExpr", "ternary", 
        "condExpr", "condClause", "condElseClause", "newForm", "objectExpr", 
        "objectField", "methodDef", "arrayExpr", "bracketArrayExpr", "braceObjectExpr", 
        "braceObjectField", "templateExpr", "propKey", "opSymbol", "propAccess", 
        "subscriptAccess", "indexAccess", "quasiquote", "quasiForm", "sForm", 
        "unquote", "unquoteSplicing", "tildeUnquote", "tildeUnquoteSplice", 
        "optChain", "optChainIndex", "nullCoalesce", "infixExpr", "infixBody", 
        "infixAtom", "infixArgs", "infixUnaryOp", "infixBinOp", "macroExprCall", 
        "macroBodyCall", "call", "typeArgs", "fnSignature", "param", "restParam", 
        "literal",
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
            this.state = 366;
            this.match(Stage9Parser.LPAREN);
            this.state = 367;
            this.match(Stage9Parser.PROGRAM);
            this.state = 371;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 100)) & ~0x1F) === 0 && ((1 << (_la - 100)) & 4194336775) !== 0) || ((((_la - 132)) & ~0x1F) === 0 && ((1 << (_la - 132)) & 16775937) !== 0) || ((((_la - 166)) & ~0x1F) === 0 && ((1 << (_la - 166)) & 251) !== 0)) {
                {
                {
                this.state = 368;
                this.topLevel();
                }
                }
                this.state = 373;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 374;
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
            this.state = 393;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 1, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 376;
                this.defmacro();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 377;
                this.macroTimeFnDef();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 378;
                this.macroImport();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 379;
                this.macroExport();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 380;
                this.macroReexport();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 381;
                this.topLevelLet();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 382;
                this.topLevelVar();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 383;
                this.topLevelConst();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 384;
                this.fn();
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 385;
                this.fnO();
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 386;
                this.typeAlias();
                }
                break;
            case 12:
                this.enterOuterAlt(localContext, 12);
                {
                this.state = 387;
                this.interfaceDef();
                }
                break;
            case 13:
                this.enterOuterAlt(localContext, 13);
                {
                this.state = 388;
                this.enumDef();
                }
                break;
            case 14:
                this.enterOuterAlt(localContext, 14);
                {
                this.state = 389;
                this.classDef();
                }
                break;
            case 15:
                this.enterOuterAlt(localContext, 15);
                {
                this.state = 390;
                this.mixinForm();
                }
                break;
            case 16:
                this.enterOuterAlt(localContext, 16);
                {
                this.state = 391;
                this.exportDeclForm();
                }
                break;
            case 17:
                this.enterOuterAlt(localContext, 17);
                {
                this.state = 392;
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
            this.state = 403;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 2, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 395;
                this.topLevelLet();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 396;
                this.topLevelVar();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 397;
                this.topLevelConst();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 398;
                this.fn();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 399;
                this.classDef();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 400;
                this.interfaceDef();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 401;
                this.enumDef();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 402;
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
            this.state = 405;
            this.match(Stage9Parser.LPAREN);
            this.state = 406;
            this.match(Stage9Parser.DEFMACRO);
            this.state = 407;
            this.match(Stage9Parser.IDENTIFIER);
            this.state = 408;
            this.macroSignature();
            this.state = 412;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 100)) & ~0x1F) === 0 && ((1 << (_la - 100)) & 4194336775) !== 0) || ((((_la - 132)) & ~0x1F) === 0 && ((1 << (_la - 132)) & 16775937) !== 0) || ((((_la - 166)) & ~0x1F) === 0 && ((1 << (_la - 166)) & 251) !== 0)) {
                {
                {
                this.state = 409;
                this.statement();
                }
                }
                this.state = 414;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 415;
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
            this.state = 417;
            this.match(Stage9Parser.LPAREN);
            this.state = 428;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 6, this.context) ) {
            case 1:
                {
                this.state = 421;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 173) {
                    {
                    {
                    this.state = 418;
                    this.match(Stage9Parser.IDENTIFIER);
                    }
                    }
                    this.state = 423;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 426;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 88) {
                    {
                    this.state = 424;
                    this.match(Stage9Parser.REST);
                    this.state = 425;
                    this.match(Stage9Parser.IDENTIFIER);
                    }
                }

                }
                break;
            }
            this.state = 430;
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
            this.state = 442;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 7, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 432;
                this.match(Stage9Parser.LPAREN);
                this.state = 433;
                this.match(Stage9Parser.MACRO_TIME_ATTR);
                this.state = 434;
                this.topLevelLet();
                this.state = 435;
                this.match(Stage9Parser.RPAREN);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 437;
                this.match(Stage9Parser.LPAREN);
                this.state = 438;
                this.match(Stage9Parser.MACRO_TIME_ATTR);
                this.state = 439;
                this.topLevelConst();
                this.state = 440;
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
            this.state = 444;
            this.match(Stage9Parser.LPAREN);
            this.state = 445;
            this.match(Stage9Parser.MACRO_IMPORT);
            this.state = 446;
            this.match(Stage9Parser.IDENTIFIER);
            this.state = 447;
            this.match(Stage9Parser.STRING);
            this.state = 448;
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
            this.state = 450;
            this.match(Stage9Parser.LPAREN);
            this.state = 451;
            this.match(Stage9Parser.MACRO_EXPORT);
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
            } while (_la === 173);
            this.state = 457;
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
            this.state = 459;
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
            this.state = 461;
            this.match(Stage9Parser.LPAREN);
            this.state = 462;
            this.match(Stage9Parser.MACRO_REEXPORT);
            this.state = 463;
            this.match(Stage9Parser.IDENTIFIER);
            this.state = 467;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 173) {
                {
                {
                this.state = 464;
                this.match(Stage9Parser.IDENTIFIER);
                }
                }
                this.state = 469;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 470;
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
            this.state = 472;
            this.match(Stage9Parser.LPAREN);
            this.state = 473;
            this.match(Stage9Parser.LET);
            this.state = 477;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 115) {
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
            this.match(Stage9Parser.LPAREN);
            this.state = 482;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 481;
                this.starBinding();
                }
                }
                this.state = 484;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2);
            this.state = 486;
            this.match(Stage9Parser.RPAREN);
            this.state = 487;
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
            this.state = 489;
            this.match(Stage9Parser.LPAREN);
            this.state = 490;
            this.match(Stage9Parser.VAR);
            this.state = 494;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 115) {
                {
                {
                this.state = 491;
                this.metaAnnotation();
                }
                }
                this.state = 496;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 497;
            this.match(Stage9Parser.LPAREN);
            this.state = 499;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 498;
                this.starBinding();
                }
                }
                this.state = 501;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2);
            this.state = 503;
            this.match(Stage9Parser.RPAREN);
            this.state = 504;
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
            this.state = 506;
            this.match(Stage9Parser.LPAREN);
            this.state = 507;
            this.match(Stage9Parser.CONST);
            this.state = 511;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 115) {
                {
                {
                this.state = 508;
                this.metaAnnotation();
                }
                }
                this.state = 513;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 514;
            this.match(Stage9Parser.IDENTIFIER);
            this.state = 515;
            this.expression();
            this.state = 516;
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
            this.state = 518;
            this.match(Stage9Parser.CARET);
            this.state = 519;
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
            this.state = 521;
            this.match(Stage9Parser.LPAREN);
            this.state = 522;
            this.match(Stage9Parser.TYPE);
            this.state = 523;
            this.match(Stage9Parser.IDENTIFIER);
            this.state = 525;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 15, this.context) ) {
            case 1:
                {
                this.state = 524;
                this.typeParams();
                }
                break;
            }
            this.state = 527;
            this.typeExpr();
            this.state = 528;
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
            this.state = 530;
            this.match(Stage9Parser.LPAREN);
            this.state = 531;
            this.match(Stage9Parser.INTERFACE);
            this.state = 532;
            this.match(Stage9Parser.IDENTIFIER);
            this.state = 534;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 16, this.context) ) {
            case 1:
                {
                this.state = 533;
                this.typeParams();
                }
                break;
            }
            this.state = 537;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 17, this.context) ) {
            case 1:
                {
                this.state = 536;
                this.interfaceExtends();
                }
                break;
            }
            this.state = 539;
            this.typeObject();
            this.state = 540;
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
            this.state = 542;
            this.match(Stage9Parser.LPAREN);
            this.state = 543;
            this.match(Stage9Parser.EXTENDS);
            this.state = 545;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 544;
                this.typeExpr();
                }
                }
                this.state = 547;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 34 || _la === 101 || _la === 102 || _la === 141 || _la === 173);
            this.state = 549;
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
            this.state = 551;
            this.match(Stage9Parser.LPAREN);
            this.state = 552;
            this.match(Stage9Parser.ENUM);
            this.state = 553;
            this.match(Stage9Parser.IDENTIFIER);
            this.state = 557;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 554;
                this.enumMember();
                }
                }
                this.state = 559;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 560;
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
            this.state = 562;
            this.match(Stage9Parser.LPAREN);
            this.state = 563;
            this.match(Stage9Parser.IDENTIFIER);
            this.state = 565;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (((((_la - 166)) & ~0x1F) === 0 && ((1 << (_la - 166)) & 11) !== 0)) {
                {
                this.state = 564;
                _la = this.tokenStream.LA(1);
                if(!(((((_la - 166)) & ~0x1F) === 0 && ((1 << (_la - 166)) & 11) !== 0))) {
                this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                }
            }

            this.state = 567;
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
    public mixinForm(): MixinFormContext {
        let localContext = new MixinFormContext(this.context, this.state);
        this.enterRule(localContext, 38, Stage9Parser.RULE_mixinForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 569;
            this.match(Stage9Parser.LPAREN);
            this.state = 570;
            this.match(Stage9Parser.MIXIN);
            this.state = 571;
            this.match(Stage9Parser.IDENTIFIER);
            this.state = 573;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 572;
                this.match(Stage9Parser.IDENTIFIER);
                }
                }
                this.state = 575;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 173);
            this.state = 578;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 103) {
                {
                this.state = 577;
                this.mixinFilter();
                }
            }

            this.state = 580;
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
    public mixinFilter(): MixinFilterContext {
        let localContext = new MixinFilterContext(this.context, this.state);
        this.enterRule(localContext, 40, Stage9Parser.RULE_mixinFilter);
        let _la: number;
        try {
            this.state = 602;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 25, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 582;
                this.match(Stage9Parser.COLON);
                this.state = 583;
                this.match(Stage9Parser.IDENTIFIER);
                this.state = 584;
                this.match(Stage9Parser.LPAREN);
                this.state = 588;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 173) {
                    {
                    {
                    this.state = 585;
                    this.match(Stage9Parser.IDENTIFIER);
                    }
                    }
                    this.state = 590;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 591;
                this.match(Stage9Parser.RPAREN);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 592;
                this.match(Stage9Parser.COLON);
                this.state = 593;
                this.match(Stage9Parser.EXCEPT);
                this.state = 594;
                this.match(Stage9Parser.LPAREN);
                this.state = 598;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 173) {
                    {
                    {
                    this.state = 595;
                    this.match(Stage9Parser.IDENTIFIER);
                    }
                    }
                    this.state = 600;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 601;
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
    public classDef(): ClassDefContext {
        let localContext = new ClassDefContext(this.context, this.state);
        this.enterRule(localContext, 42, Stage9Parser.RULE_classDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 604;
            this.match(Stage9Parser.LPAREN);
            this.state = 605;
            this.match(Stage9Parser.CLASS);
            this.state = 609;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 75 || _la === 89 || ((((_la - 116)) & ~0x1F) === 0 && ((1 << (_la - 116)) & 255) !== 0)) {
                {
                {
                this.state = 606;
                this.modifier();
                }
                }
                this.state = 611;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 612;
            this.match(Stage9Parser.IDENTIFIER);
            this.state = 614;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 27, this.context) ) {
            case 1:
                {
                this.state = 613;
                this.typeParams();
                }
                break;
            }
            this.state = 617;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 28, this.context) ) {
            case 1:
                {
                this.state = 616;
                this.classExtends();
                }
                break;
            }
            this.state = 620;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 29, this.context) ) {
            case 1:
                {
                this.state = 619;
                this.classImplements();
                }
                break;
            }
            this.state = 622;
            this.classBody();
            this.state = 623;
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
        this.enterRule(localContext, 44, Stage9Parser.RULE_anonClassDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 625;
            this.match(Stage9Parser.LPAREN);
            this.state = 626;
            this.match(Stage9Parser.CLASS);
            this.state = 630;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 75 || _la === 89 || ((((_la - 116)) & ~0x1F) === 0 && ((1 << (_la - 116)) & 255) !== 0)) {
                {
                {
                this.state = 627;
                this.modifier();
                }
                }
                this.state = 632;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 634;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 31, this.context) ) {
            case 1:
                {
                this.state = 633;
                this.classExtends();
                }
                break;
            }
            this.state = 637;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 32, this.context) ) {
            case 1:
                {
                this.state = 636;
                this.classImplements();
                }
                break;
            }
            this.state = 639;
            this.classBody();
            this.state = 640;
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
        this.enterRule(localContext, 46, Stage9Parser.RULE_classExtends);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 642;
            this.match(Stage9Parser.LPAREN);
            this.state = 643;
            this.match(Stage9Parser.EXTENDS);
            this.state = 644;
            this.typeExpr();
            this.state = 645;
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
        this.enterRule(localContext, 48, Stage9Parser.RULE_classImplements);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 647;
            this.match(Stage9Parser.LPAREN);
            this.state = 648;
            this.match(Stage9Parser.IMPLEMENTS);
            this.state = 650;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 649;
                this.typeExpr();
                }
                }
                this.state = 652;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 34 || _la === 101 || _la === 102 || _la === 141 || _la === 173);
            this.state = 654;
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
        this.enterRule(localContext, 50, Stage9Parser.RULE_classBody);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 656;
            this.match(Stage9Parser.LPAREN);
            this.state = 657;
            this.match(Stage9Parser.CLASS_BODY);
            this.state = 661;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 658;
                this.classElement();
                }
                }
                this.state = 663;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 664;
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
        this.enterRule(localContext, 52, Stage9Parser.RULE_classElement);
        try {
            this.state = 675;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 35, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 666;
                this.fieldDef();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 667;
                this.constructorDef();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 668;
                this.classMethodDef();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 669;
                this.abstractMethodDef();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 670;
                this.getterDef();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 671;
                this.setterDef();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 672;
                this.methodO();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 673;
                this.abstractMethodO();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 674;
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
        this.enterRule(localContext, 54, Stage9Parser.RULE_modifier);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 677;
            _la = this.tokenStream.LA(1);
            if(!(_la === 75 || _la === 89 || ((((_la - 116)) & ~0x1F) === 0 && ((1 << (_la - 116)) & 255) !== 0))) {
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
        this.enterRule(localContext, 56, Stage9Parser.RULE_fieldDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 679;
            this.match(Stage9Parser.LPAREN);
            this.state = 680;
            this.match(Stage9Parser.FIELD);
            this.state = 684;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 75 || _la === 89 || ((((_la - 116)) & ~0x1F) === 0 && ((1 << (_la - 116)) & 255) !== 0)) {
                {
                {
                this.state = 681;
                this.modifier();
                }
                }
                this.state = 686;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 687;
            this.match(Stage9Parser.LPAREN);
            this.state = 688;
            this.match(Stage9Parser.IDENTIFIER);
            this.state = 691;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 103) {
                {
                this.state = 689;
                this.match(Stage9Parser.COLON);
                this.state = 690;
                this.typeExpr();
                }
            }

            this.state = 693;
            this.match(Stage9Parser.RPAREN);
            this.state = 695;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 100)) & ~0x1F) === 0 && ((1 << (_la - 100)) & 4194336775) !== 0) || ((((_la - 132)) & ~0x1F) === 0 && ((1 << (_la - 132)) & 16775937) !== 0) || ((((_la - 166)) & ~0x1F) === 0 && ((1 << (_la - 166)) & 251) !== 0)) {
                {
                this.state = 694;
                this.expression();
                }
            }

            this.state = 697;
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
        this.enterRule(localContext, 58, Stage9Parser.RULE_constructorParam);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 699;
            this.match(Stage9Parser.LPAREN);
            this.state = 703;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 75 || _la === 89 || ((((_la - 116)) & ~0x1F) === 0 && ((1 << (_la - 116)) & 255) !== 0)) {
                {
                {
                this.state = 700;
                this.modifier();
                }
                }
                this.state = 705;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 706;
            this.match(Stage9Parser.IDENTIFIER);
            this.state = 708;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 99) {
                {
                this.state = 707;
                this.match(Stage9Parser.OPTIONAL);
                }
            }

            this.state = 712;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 103) {
                {
                this.state = 710;
                this.match(Stage9Parser.COLON);
                this.state = 711;
                this.typeExpr();
                }
            }

            this.state = 714;
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
        this.enterRule(localContext, 60, Stage9Parser.RULE_constructorSignature);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 716;
            this.match(Stage9Parser.LPAREN);
            this.state = 727;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2) {
                {
                this.state = 717;
                this.constructorParam();
                this.state = 724;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 2 || _la === 4) {
                    {
                    {
                    this.state = 719;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    if (_la === 4) {
                        {
                        this.state = 718;
                        this.match(Stage9Parser.COMMA);
                        }
                    }

                    this.state = 721;
                    this.constructorParam();
                    }
                    }
                    this.state = 726;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
            }

            this.state = 729;
            this.match(Stage9Parser.RPAREN);
            this.state = 732;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 103) {
                {
                this.state = 730;
                this.match(Stage9Parser.COLON);
                this.state = 731;
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
        this.enterRule(localContext, 62, Stage9Parser.RULE_constructorDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 734;
            this.match(Stage9Parser.LPAREN);
            this.state = 735;
            this.match(Stage9Parser.CONSTRUCTOR);
            this.state = 736;
            this.constructorSignature();
            this.state = 740;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 100)) & ~0x1F) === 0 && ((1 << (_la - 100)) & 4194336775) !== 0) || ((((_la - 132)) & ~0x1F) === 0 && ((1 << (_la - 132)) & 16775937) !== 0) || ((((_la - 166)) & ~0x1F) === 0 && ((1 << (_la - 166)) & 251) !== 0)) {
                {
                {
                this.state = 737;
                this.statement();
                }
                }
                this.state = 742;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 743;
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
        this.enterRule(localContext, 64, Stage9Parser.RULE_classMethodDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 745;
            this.match(Stage9Parser.LPAREN);
            this.state = 746;
            this.match(Stage9Parser.METHOD);
            this.state = 750;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 75 || _la === 89 || ((((_la - 116)) & ~0x1F) === 0 && ((1 << (_la - 116)) & 255) !== 0)) {
                {
                {
                this.state = 747;
                this.modifier();
                }
                }
                this.state = 752;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 753;
            this.methodKey();
            this.state = 754;
            this.fnSignature();
            this.state = 758;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 100)) & ~0x1F) === 0 && ((1 << (_la - 100)) & 4194336775) !== 0) || ((((_la - 132)) & ~0x1F) === 0 && ((1 << (_la - 132)) & 16775937) !== 0) || ((((_la - 166)) & ~0x1F) === 0 && ((1 << (_la - 166)) & 251) !== 0)) {
                {
                {
                this.state = 755;
                this.statement();
                }
                }
                this.state = 760;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 761;
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
        this.enterRule(localContext, 66, Stage9Parser.RULE_abstractMethodDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 763;
            this.match(Stage9Parser.LPAREN);
            this.state = 764;
            this.match(Stage9Parser.ABSTRACT_METHOD);
            this.state = 768;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 75 || _la === 89 || ((((_la - 116)) & ~0x1F) === 0 && ((1 << (_la - 116)) & 255) !== 0)) {
                {
                {
                this.state = 765;
                this.modifier();
                }
                }
                this.state = 770;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 771;
            this.methodKey();
            this.state = 772;
            this.fnSignature();
            this.state = 773;
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
        this.enterRule(localContext, 68, Stage9Parser.RULE_getterDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 775;
            this.match(Stage9Parser.LPAREN);
            this.state = 776;
            this.match(Stage9Parser.GET);
            this.state = 780;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 75 || _la === 89 || ((((_la - 116)) & ~0x1F) === 0 && ((1 << (_la - 116)) & 255) !== 0)) {
                {
                {
                this.state = 777;
                this.modifier();
                }
                }
                this.state = 782;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 783;
            this.methodKey();
            this.state = 784;
            this.fnSignature();
            this.state = 788;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 100)) & ~0x1F) === 0 && ((1 << (_la - 100)) & 4194336775) !== 0) || ((((_la - 132)) & ~0x1F) === 0 && ((1 << (_la - 132)) & 16775937) !== 0) || ((((_la - 166)) & ~0x1F) === 0 && ((1 << (_la - 166)) & 251) !== 0)) {
                {
                {
                this.state = 785;
                this.statement();
                }
                }
                this.state = 790;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 791;
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
        this.enterRule(localContext, 70, Stage9Parser.RULE_setterDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 793;
            this.match(Stage9Parser.LPAREN);
            this.state = 794;
            this.match(Stage9Parser.SETPROP);
            this.state = 798;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 75 || _la === 89 || ((((_la - 116)) & ~0x1F) === 0 && ((1 << (_la - 116)) & 255) !== 0)) {
                {
                {
                this.state = 795;
                this.modifier();
                }
                }
                this.state = 800;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 801;
            this.methodKey();
            this.state = 802;
            this.fnSignature();
            this.state = 806;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 100)) & ~0x1F) === 0 && ((1 << (_la - 100)) & 4194336775) !== 0) || ((((_la - 132)) & ~0x1F) === 0 && ((1 << (_la - 132)) & 16775937) !== 0) || ((((_la - 166)) & ~0x1F) === 0 && ((1 << (_la - 166)) & 251) !== 0)) {
                {
                {
                this.state = 803;
                this.statement();
                }
                }
                this.state = 808;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 809;
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
        this.enterRule(localContext, 72, Stage9Parser.RULE_methodKey);
        try {
            this.state = 818;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case Stage9Parser.IDENTIFIER:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 811;
                this.match(Stage9Parser.IDENTIFIER);
                }
                break;
            case Stage9Parser.GET:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 812;
                this.match(Stage9Parser.GET);
                }
                break;
            case Stage9Parser.SETPROP:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 813;
                this.match(Stage9Parser.SETPROP);
                }
                break;
            case Stage9Parser.LBRACK:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 814;
                this.match(Stage9Parser.LBRACK);
                this.state = 815;
                this.expression();
                this.state = 816;
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
        this.enterRule(localContext, 74, Stage9Parser.RULE_statement);
        try {
            this.state = 844;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 55, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 820;
                this.letStmt();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 821;
                this.varStmt();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 822;
                this.constStar();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 823;
                this.constStmt();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 824;
                this.ifForm();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 825;
                this.whileForm();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 826;
                this.exceptForm();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 827;
                this.returnForm();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 828;
                this.throwForm();
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 829;
                this.breakForm();
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 830;
                this.continueForm();
                }
                break;
            case 12:
                this.enterOuterAlt(localContext, 12);
                {
                this.state = 831;
                this.importForm();
                }
                break;
            case 13:
                this.enterOuterAlt(localContext, 13);
                {
                this.state = 832;
                this.importTypeForm();
                }
                break;
            case 14:
                this.enterOuterAlt(localContext, 14);
                {
                this.state = 833;
                this.exportForm();
                }
                break;
            case 15:
                this.enterOuterAlt(localContext, 15);
                {
                this.state = 834;
                this.switchForm();
                }
                break;
            case 16:
                this.enterOuterAlt(localContext, 16);
                {
                this.state = 835;
                this.forForm();
                }
                break;
            case 17:
                this.enterOuterAlt(localContext, 17);
                {
                this.state = 836;
                this.forInForm();
                }
                break;
            case 18:
                this.enterOuterAlt(localContext, 18);
                {
                this.state = 837;
                this.forOfForm();
                }
                break;
            case 19:
                this.enterOuterAlt(localContext, 19);
                {
                this.state = 838;
                this.forAwaitForm();
                }
                break;
            case 20:
                this.enterOuterAlt(localContext, 20);
                {
                this.state = 839;
                this.assign();
                }
                break;
            case 21:
                this.enterOuterAlt(localContext, 21);
                {
                this.state = 840;
                this.compoundAssign();
                }
                break;
            case 22:
                this.enterOuterAlt(localContext, 22);
                {
                this.state = 841;
                this.subscriptAssign();
                }
                break;
            case 23:
                this.enterOuterAlt(localContext, 23);
                {
                this.state = 842;
                this.macroBodyCall();
                }
                break;
            case 24:
                this.enterOuterAlt(localContext, 24);
                {
                this.state = 843;
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
        this.enterRule(localContext, 76, Stage9Parser.RULE_letStmt);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 846;
            this.match(Stage9Parser.LPAREN);
            this.state = 847;
            this.match(Stage9Parser.LET);
            this.state = 848;
            this.match(Stage9Parser.LPAREN);
            this.state = 850;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 849;
                this.starBinding();
                }
                }
                this.state = 852;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2);
            this.state = 854;
            this.match(Stage9Parser.RPAREN);
            this.state = 858;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 100)) & ~0x1F) === 0 && ((1 << (_la - 100)) & 4194336775) !== 0) || ((((_la - 132)) & ~0x1F) === 0 && ((1 << (_la - 132)) & 16775937) !== 0) || ((((_la - 166)) & ~0x1F) === 0 && ((1 << (_la - 166)) & 251) !== 0)) {
                {
                {
                this.state = 855;
                this.statement();
                }
                }
                this.state = 860;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 861;
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
        this.enterRule(localContext, 78, Stage9Parser.RULE_varStmt);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 863;
            this.match(Stage9Parser.LPAREN);
            this.state = 864;
            this.match(Stage9Parser.VAR);
            this.state = 865;
            this.match(Stage9Parser.LPAREN);
            this.state = 867;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 866;
                this.starBinding();
                }
                }
                this.state = 869;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2);
            this.state = 871;
            this.match(Stage9Parser.RPAREN);
            this.state = 875;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 100)) & ~0x1F) === 0 && ((1 << (_la - 100)) & 4194336775) !== 0) || ((((_la - 132)) & ~0x1F) === 0 && ((1 << (_la - 132)) & 16775937) !== 0) || ((((_la - 166)) & ~0x1F) === 0 && ((1 << (_la - 166)) & 251) !== 0)) {
                {
                {
                this.state = 872;
                this.statement();
                }
                }
                this.state = 877;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 878;
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
        this.enterRule(localContext, 80, Stage9Parser.RULE_constStar);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 880;
            this.match(Stage9Parser.LPAREN);
            this.state = 881;
            this.match(Stage9Parser.CONSTSTAR);
            this.state = 882;
            this.match(Stage9Parser.LPAREN);
            this.state = 886;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 883;
                this.starBinding();
                }
                }
                this.state = 888;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 889;
            this.match(Stage9Parser.RPAREN);
            this.state = 893;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 100)) & ~0x1F) === 0 && ((1 << (_la - 100)) & 4194336775) !== 0) || ((((_la - 132)) & ~0x1F) === 0 && ((1 << (_la - 132)) & 16775937) !== 0) || ((((_la - 166)) & ~0x1F) === 0 && ((1 << (_la - 166)) & 251) !== 0)) {
                {
                {
                this.state = 890;
                this.statement();
                }
                }
                this.state = 895;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 896;
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
        this.enterRule(localContext, 82, Stage9Parser.RULE_constStmt);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 898;
            this.match(Stage9Parser.LPAREN);
            this.state = 899;
            this.match(Stage9Parser.CONST);
            this.state = 900;
            this.singleBinding();
            this.state = 901;
            this.expression();
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
    public ifForm(): IfFormContext {
        let localContext = new IfFormContext(this.context, this.state);
        this.enterRule(localContext, 84, Stage9Parser.RULE_ifForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 904;
            this.match(Stage9Parser.LPAREN);
            this.state = 905;
            this.match(Stage9Parser.IF);
            this.state = 906;
            this.expression();
            this.state = 907;
            this.thenBlock();
            this.state = 909;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2) {
                {
                this.state = 908;
                this.elseBlock();
                }
            }

            this.state = 911;
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
        this.enterRule(localContext, 86, Stage9Parser.RULE_thenBlock);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 913;
            this.match(Stage9Parser.LPAREN);
            this.state = 914;
            this.match(Stage9Parser.THEN);
            this.state = 918;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 100)) & ~0x1F) === 0 && ((1 << (_la - 100)) & 4194336775) !== 0) || ((((_la - 132)) & ~0x1F) === 0 && ((1 << (_la - 132)) & 16775937) !== 0) || ((((_la - 166)) & ~0x1F) === 0 && ((1 << (_la - 166)) & 251) !== 0)) {
                {
                {
                this.state = 915;
                this.statement();
                }
                }
                this.state = 920;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 921;
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
        this.enterRule(localContext, 88, Stage9Parser.RULE_elseBlock);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 923;
            this.match(Stage9Parser.LPAREN);
            this.state = 924;
            this.match(Stage9Parser.ELSE);
            this.state = 928;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 100)) & ~0x1F) === 0 && ((1 << (_la - 100)) & 4194336775) !== 0) || ((((_la - 132)) & ~0x1F) === 0 && ((1 << (_la - 132)) & 16775937) !== 0) || ((((_la - 166)) & ~0x1F) === 0 && ((1 << (_la - 166)) & 251) !== 0)) {
                {
                {
                this.state = 925;
                this.statement();
                }
                }
                this.state = 930;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 931;
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
        this.enterRule(localContext, 90, Stage9Parser.RULE_whileForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 933;
            this.match(Stage9Parser.LPAREN);
            this.state = 934;
            this.match(Stage9Parser.WHILE);
            this.state = 935;
            this.expression();
            this.state = 939;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 100)) & ~0x1F) === 0 && ((1 << (_la - 100)) & 4194336775) !== 0) || ((((_la - 132)) & ~0x1F) === 0 && ((1 << (_la - 132)) & 16775937) !== 0) || ((((_la - 166)) & ~0x1F) === 0 && ((1 << (_la - 166)) & 251) !== 0)) {
                {
                {
                this.state = 936;
                this.statement();
                }
                }
                this.state = 941;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 942;
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
        this.enterRule(localContext, 92, Stage9Parser.RULE_returnForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 944;
            this.match(Stage9Parser.LPAREN);
            this.state = 945;
            this.match(Stage9Parser.RETURN);
            this.state = 947;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 100)) & ~0x1F) === 0 && ((1 << (_la - 100)) & 4194336775) !== 0) || ((((_la - 132)) & ~0x1F) === 0 && ((1 << (_la - 132)) & 16775937) !== 0) || ((((_la - 166)) & ~0x1F) === 0 && ((1 << (_la - 166)) & 251) !== 0)) {
                {
                this.state = 946;
                this.expression();
                }
            }

            this.state = 949;
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
        this.enterRule(localContext, 94, Stage9Parser.RULE_throwForm);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 951;
            this.match(Stage9Parser.LPAREN);
            this.state = 952;
            this.match(Stage9Parser.THROW);
            this.state = 953;
            this.expression();
            this.state = 954;
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
        this.enterRule(localContext, 96, Stage9Parser.RULE_breakForm);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 956;
            this.match(Stage9Parser.LPAREN);
            this.state = 957;
            this.match(Stage9Parser.BREAK);
            this.state = 958;
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
        this.enterRule(localContext, 98, Stage9Parser.RULE_continueForm);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 960;
            this.match(Stage9Parser.LPAREN);
            this.state = 961;
            this.match(Stage9Parser.CONTINUE);
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
    public importForm(): ImportFormContext {
        let localContext = new ImportFormContext(this.context, this.state);
        this.enterRule(localContext, 100, Stage9Parser.RULE_importForm);
        let _la: number;
        try {
            this.state = 996;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 68, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 964;
                this.match(Stage9Parser.LPAREN);
                this.state = 965;
                this.match(Stage9Parser.IMPORT);
                this.state = 967;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 2) {
                    {
                    this.state = 966;
                    this.objectExpr();
                    }
                }

                this.state = 969;
                this.match(Stage9Parser.STRING);
                this.state = 970;
                this.match(Stage9Parser.RPAREN);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 971;
                this.match(Stage9Parser.LPAREN);
                this.state = 972;
                this.match(Stage9Parser.IMPORT);
                this.state = 973;
                this.objectDestructPat();
                this.state = 974;
                this.match(Stage9Parser.STRING);
                this.state = 975;
                this.match(Stage9Parser.RPAREN);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 977;
                this.match(Stage9Parser.LPAREN);
                this.state = 978;
                this.match(Stage9Parser.IMPORT);
                this.state = 979;
                this.match(Stage9Parser.IDENTIFIER);
                this.state = 980;
                this.match(Stage9Parser.STRING);
                this.state = 981;
                this.match(Stage9Parser.RPAREN);
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 982;
                this.match(Stage9Parser.LPAREN);
                this.state = 983;
                this.match(Stage9Parser.IMPORT);
                this.state = 984;
                this.match(Stage9Parser.IDENTIFIER);
                this.state = 985;
                this.objectDestructPat();
                this.state = 986;
                this.match(Stage9Parser.STRING);
                this.state = 987;
                this.match(Stage9Parser.RPAREN);
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 989;
                this.match(Stage9Parser.LPAREN);
                this.state = 990;
                this.match(Stage9Parser.IMPORT);
                this.state = 991;
                this.match(Stage9Parser.STAR);
                this.state = 992;
                this.match(Stage9Parser.AS);
                this.state = 993;
                this.match(Stage9Parser.IDENTIFIER);
                this.state = 994;
                this.match(Stage9Parser.STRING);
                this.state = 995;
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
        this.enterRule(localContext, 102, Stage9Parser.RULE_importTypeForm);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 998;
            this.match(Stage9Parser.LPAREN);
            this.state = 999;
            this.match(Stage9Parser.IMPORT_TYPE);
            this.state = 1000;
            this.importTypeSpec();
            this.state = 1001;
            this.match(Stage9Parser.STRING);
            this.state = 1002;
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
        this.enterRule(localContext, 104, Stage9Parser.RULE_importTypeSpec);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1004;
            this.match(Stage9Parser.LPAREN);
            this.state = 1005;
            this.match(Stage9Parser.IDENTIFIER);
            this.state = 1007;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 1006;
                this.importTypeName();
                }
                }
                this.state = 1009;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 173);
            this.state = 1011;
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
        this.enterRule(localContext, 106, Stage9Parser.RULE_importTypeName);
        try {
            this.state = 1018;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case Stage9Parser.IDENTIFIER:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1013;
                this.match(Stage9Parser.IDENTIFIER);
                }
                break;
            case Stage9Parser.LPAREN:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1014;
                this.match(Stage9Parser.LPAREN);
                this.state = 1015;
                this.match(Stage9Parser.IDENTIFIER);
                this.state = 1016;
                this.match(Stage9Parser.IDENTIFIER);
                this.state = 1017;
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
        this.enterRule(localContext, 108, Stage9Parser.RULE_exportForm);
        try {
            this.state = 1029;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 71, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1020;
                this.exportBinding();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1021;
                this.exportDefault();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 1022;
                this.exportNamed();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 1023;
                this.exportNsFromForm();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 1024;
                this.exportFrom();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 1025;
                this.exportAllFrom();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 1026;
                this.exportTypeForm();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 1027;
                this.exportTypeFromForm();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 1028;
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
        this.enterRule(localContext, 110, Stage9Parser.RULE_exportBinding);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1031;
            this.match(Stage9Parser.LPAREN);
            this.state = 1032;
            this.match(Stage9Parser.EXPORT);
            this.state = 1033;
            this.match(Stage9Parser.IDENTIFIER);
            this.state = 1034;
            this.expression();
            this.state = 1035;
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
        this.enterRule(localContext, 112, Stage9Parser.RULE_exportDefault);
        try {
            this.state = 1062;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 72, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1037;
                this.match(Stage9Parser.LPAREN);
                this.state = 1038;
                this.match(Stage9Parser.EXPORT_DEFAULT);
                this.state = 1039;
                this.classDef();
                this.state = 1040;
                this.match(Stage9Parser.RPAREN);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1042;
                this.match(Stage9Parser.LPAREN);
                this.state = 1043;
                this.match(Stage9Parser.EXPORT_DEFAULT);
                this.state = 1044;
                this.anonClassDef();
                this.state = 1045;
                this.match(Stage9Parser.RPAREN);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 1047;
                this.match(Stage9Parser.LPAREN);
                this.state = 1048;
                this.match(Stage9Parser.EXPORT_DEFAULT);
                this.state = 1049;
                this.topLevelLet();
                this.state = 1050;
                this.match(Stage9Parser.RPAREN);
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 1052;
                this.match(Stage9Parser.LPAREN);
                this.state = 1053;
                this.match(Stage9Parser.EXPORT_DEFAULT);
                this.state = 1054;
                this.topLevelConst();
                this.state = 1055;
                this.match(Stage9Parser.RPAREN);
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 1057;
                this.match(Stage9Parser.LPAREN);
                this.state = 1058;
                this.match(Stage9Parser.EXPORT_DEFAULT);
                this.state = 1059;
                this.expression();
                this.state = 1060;
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
        this.enterRule(localContext, 114, Stage9Parser.RULE_exportNamed);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1064;
            this.match(Stage9Parser.LPAREN);
            this.state = 1065;
            this.match(Stage9Parser.EXPORT_NAMED);
            this.state = 1067;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 1066;
                this.exportNamePair();
                }
                }
                this.state = 1069;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2);
            this.state = 1071;
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
        this.enterRule(localContext, 116, Stage9Parser.RULE_exportNamePair);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1073;
            this.match(Stage9Parser.LPAREN);
            this.state = 1074;
            this.match(Stage9Parser.IDENTIFIER);
            this.state = 1076;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 173) {
                {
                this.state = 1075;
                this.match(Stage9Parser.IDENTIFIER);
                }
            }

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
    public exportFrom(): ExportFromContext {
        let localContext = new ExportFromContext(this.context, this.state);
        this.enterRule(localContext, 118, Stage9Parser.RULE_exportFrom);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1080;
            this.match(Stage9Parser.LPAREN);
            this.state = 1081;
            this.match(Stage9Parser.EXPORT_FROM);
            this.state = 1082;
            this.match(Stage9Parser.STRING);
            this.state = 1084;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 1083;
                this.exportNamePair();
                }
                }
                this.state = 1086;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2);
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
    public exportAllFrom(): ExportAllFromContext {
        let localContext = new ExportAllFromContext(this.context, this.state);
        this.enterRule(localContext, 120, Stage9Parser.RULE_exportAllFrom);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1090;
            this.match(Stage9Parser.LPAREN);
            this.state = 1091;
            this.match(Stage9Parser.EXPORT_ALL_FROM);
            this.state = 1092;
            this.match(Stage9Parser.STRING);
            this.state = 1093;
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
        this.enterRule(localContext, 122, Stage9Parser.RULE_exportNsFromForm);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1095;
            this.match(Stage9Parser.LPAREN);
            this.state = 1096;
            this.match(Stage9Parser.EXPORT_NS_FROM);
            this.state = 1097;
            this.match(Stage9Parser.STRING);
            this.state = 1098;
            this.match(Stage9Parser.STRING);
            this.state = 1099;
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
        this.enterRule(localContext, 124, Stage9Parser.RULE_exportTypeForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1101;
            this.match(Stage9Parser.LPAREN);
            this.state = 1102;
            this.match(Stage9Parser.EXPORT_TYPE);
            this.state = 1104;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 1103;
                this.exportNamePair();
                }
                }
                this.state = 1106;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2);
            this.state = 1108;
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
        this.enterRule(localContext, 126, Stage9Parser.RULE_exportTypeFromForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1110;
            this.match(Stage9Parser.LPAREN);
            this.state = 1111;
            this.match(Stage9Parser.EXPORT_TYPE_FROM);
            this.state = 1112;
            this.match(Stage9Parser.STRING);
            this.state = 1114;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 1113;
                this.exportNamePair();
                }
                }
                this.state = 1116;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2);
            this.state = 1118;
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
        this.enterRule(localContext, 128, Stage9Parser.RULE_exportTypeAllFromForm);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1120;
            this.match(Stage9Parser.LPAREN);
            this.state = 1121;
            this.match(Stage9Parser.EXPORT_TYPE_ALL_FROM);
            this.state = 1122;
            this.match(Stage9Parser.STRING);
            this.state = 1123;
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
        this.enterRule(localContext, 130, Stage9Parser.RULE_exportDeclForm);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1125;
            this.match(Stage9Parser.LPAREN);
            this.state = 1126;
            this.match(Stage9Parser.EXPORT);
            this.state = 1127;
            this.decl();
            this.state = 1128;
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
        this.enterRule(localContext, 132, Stage9Parser.RULE_starBinding);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1130;
            this.match(Stage9Parser.LPAREN);
            this.state = 1131;
            this.match(Stage9Parser.IDENTIFIER);
            this.state = 1134;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 103) {
                {
                this.state = 1132;
                this.match(Stage9Parser.COLON);
                this.state = 1133;
                this.typeExpr();
                }
            }

            this.state = 1136;
            this.expression();
            this.state = 1137;
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
        this.enterRule(localContext, 134, Stage9Parser.RULE_singleBinding);
        let _la: number;
        try {
            this.state = 1148;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case Stage9Parser.LPAREN:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1139;
                this.match(Stage9Parser.LPAREN);
                this.state = 1140;
                this.match(Stage9Parser.IDENTIFIER);
                this.state = 1143;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 103) {
                    {
                    this.state = 1141;
                    this.match(Stage9Parser.COLON);
                    this.state = 1142;
                    this.typeExpr();
                    }
                }

                this.state = 1145;
                this.match(Stage9Parser.RPAREN);
                }
                break;
            case Stage9Parser.LBRACE:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1146;
                this.objectDestructPat();
                }
                break;
            case Stage9Parser.LBRACK:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 1147;
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
        this.enterRule(localContext, 136, Stage9Parser.RULE_objectDestructPat);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1150;
            this.match(Stage9Parser.LBRACE);
            this.state = 1154;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 173) {
                {
                {
                this.state = 1151;
                this.match(Stage9Parser.IDENTIFIER);
                }
                }
                this.state = 1156;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1157;
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
        this.enterRule(localContext, 138, Stage9Parser.RULE_arrayDestructPat);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1159;
            this.match(Stage9Parser.LBRACK);
            this.state = 1163;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 173) {
                {
                {
                this.state = 1160;
                this.match(Stage9Parser.IDENTIFIER);
                }
                }
                this.state = 1165;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1166;
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
        this.enterRule(localContext, 140, Stage9Parser.RULE_typeExpr);
        try {
            this.state = 1189;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 83, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1168;
                this.match(Stage9Parser.IDENTIFIER);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1169;
                this.match(Stage9Parser.NULL);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 1170;
                this.match(Stage9Parser.UNDEFINED);
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 1171;
                this.match(Stage9Parser.OBJECT);
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 1172;
                this.match(Stage9Parser.LBRACE);
                this.state = 1173;
                this.match(Stage9Parser.RBRACE);
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 1174;
                this.typeUnion();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 1175;
                this.typeIntersection();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 1176;
                this.typeArray();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 1177;
                this.typeTuple();
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 1178;
                this.typeFunction();
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 1179;
                this.typeObject();
                }
                break;
            case 12:
                this.enterOuterAlt(localContext, 12);
                {
                this.state = 1180;
                this.typeLiteral();
                }
                break;
            case 13:
                this.enterOuterAlt(localContext, 13);
                {
                this.state = 1181;
                this.typeKeyof();
                }
                break;
            case 14:
                this.enterOuterAlt(localContext, 14);
                {
                this.state = 1182;
                this.typeTypeof();
                }
                break;
            case 15:
                this.enterOuterAlt(localContext, 15);
                {
                this.state = 1183;
                this.typeIndexAccess();
                }
                break;
            case 16:
                this.enterOuterAlt(localContext, 16);
                {
                this.state = 1184;
                this.typeConditional();
                }
                break;
            case 17:
                this.enterOuterAlt(localContext, 17);
                {
                this.state = 1185;
                this.typeInfer();
                }
                break;
            case 18:
                this.enterOuterAlt(localContext, 18);
                {
                this.state = 1186;
                this.typeMapped();
                }
                break;
            case 19:
                this.enterOuterAlt(localContext, 19);
                {
                this.state = 1187;
                this.typeTemplateLiteral();
                }
                break;
            case 20:
                this.enterOuterAlt(localContext, 20);
                {
                this.state = 1188;
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
        this.enterRule(localContext, 142, Stage9Parser.RULE_typeUnion);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1191;
            this.match(Stage9Parser.LPAREN);
            this.state = 1192;
            this.match(Stage9Parser.UNION);
            this.state = 1194;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 1193;
                this.typeExpr();
                }
                }
                this.state = 1196;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 34 || _la === 101 || _la === 102 || _la === 141 || _la === 173);
            this.state = 1198;
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
        this.enterRule(localContext, 144, Stage9Parser.RULE_typeIntersection);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1200;
            this.match(Stage9Parser.LPAREN);
            this.state = 1201;
            this.match(Stage9Parser.INTERSECT);
            this.state = 1203;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 1202;
                this.typeExpr();
                }
                }
                this.state = 1205;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 34 || _la === 101 || _la === 102 || _la === 141 || _la === 173);
            this.state = 1207;
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
        this.enterRule(localContext, 146, Stage9Parser.RULE_typeArray);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1209;
            this.match(Stage9Parser.LPAREN);
            this.state = 1210;
            this.match(Stage9Parser.TYPE_ARRAY);
            this.state = 1211;
            this.typeExpr();
            this.state = 1212;
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
        this.enterRule(localContext, 148, Stage9Parser.RULE_typeTuple);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1214;
            this.match(Stage9Parser.LPAREN);
            this.state = 1215;
            this.match(Stage9Parser.TUPLE);
            this.state = 1217;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 1216;
                this.typeTupleElement();
                }
                }
                this.state = 1219;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 34 || _la === 101 || _la === 102 || _la === 141 || _la === 173);
            this.state = 1221;
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
        this.enterRule(localContext, 150, Stage9Parser.RULE_typeTupleElement);
        try {
            this.state = 1234;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 87, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1223;
                this.match(Stage9Parser.LPAREN);
                this.state = 1224;
                this.match(Stage9Parser.REST);
                this.state = 1225;
                this.typeExpr();
                this.state = 1226;
                this.match(Stage9Parser.RPAREN);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1228;
                this.match(Stage9Parser.LPAREN);
                this.state = 1229;
                this.match(Stage9Parser.IDENTIFIER);
                this.state = 1230;
                this.typeExpr();
                this.state = 1231;
                this.match(Stage9Parser.RPAREN);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 1233;
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
        this.enterRule(localContext, 152, Stage9Parser.RULE_typeFunction);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1236;
            this.match(Stage9Parser.LPAREN);
            this.state = 1237;
            this.match(Stage9Parser.TYPEFN);
            this.state = 1239;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 88, this.context) ) {
            case 1:
                {
                this.state = 1238;
                this.typeParams();
                }
                break;
            }
            this.state = 1241;
            this.match(Stage9Parser.LPAREN);
            this.state = 1245;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 1242;
                this.typeFnParam();
                }
                }
                this.state = 1247;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1248;
            this.match(Stage9Parser.RPAREN);
            this.state = 1249;
            this.typeExpr();
            this.state = 1250;
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
        this.enterRule(localContext, 154, Stage9Parser.RULE_typeFnParam);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1252;
            this.match(Stage9Parser.LPAREN);
            this.state = 1253;
            this.match(Stage9Parser.IDENTIFIER);
            this.state = 1255;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 99) {
                {
                this.state = 1254;
                this.match(Stage9Parser.OPTIONAL);
                }
            }

            this.state = 1257;
            this.typeExpr();
            this.state = 1258;
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
        this.enterRule(localContext, 156, Stage9Parser.RULE_typeObject);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1260;
            this.match(Stage9Parser.LPAREN);
            this.state = 1261;
            this.match(Stage9Parser.IDENTIFIER);
            this.state = 1265;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 1262;
                this.typeProp();
                }
                }
                this.state = 1267;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1268;
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
        this.enterRule(localContext, 158, Stage9Parser.RULE_typeProp);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1270;
            this.match(Stage9Parser.LPAREN);
            this.state = 1274;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 89) {
                {
                {
                this.state = 1271;
                this.propModifier();
                }
                }
                this.state = 1276;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1277;
            this.match(Stage9Parser.IDENTIFIER);
            this.state = 1279;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 99) {
                {
                this.state = 1278;
                this.match(Stage9Parser.OPTIONAL);
                }
            }

            this.state = 1281;
            this.typeExpr();
            this.state = 1282;
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
        this.enterRule(localContext, 160, Stage9Parser.RULE_propModifier);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1284;
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
        this.enterRule(localContext, 162, Stage9Parser.RULE_typeLiteral);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1286;
            this.match(Stage9Parser.LPAREN);
            this.state = 1287;
            this.match(Stage9Parser.LIT);
            this.state = 1288;
            _la = this.tokenStream.LA(1);
            if(!(_la === 100 || _la === 166 || _la === 167)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 1289;
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
        this.enterRule(localContext, 164, Stage9Parser.RULE_typeKeyof);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1291;
            this.match(Stage9Parser.LPAREN);
            this.state = 1292;
            this.match(Stage9Parser.KEYOF);
            this.state = 1293;
            this.typeExpr();
            this.state = 1294;
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
        this.enterRule(localContext, 166, Stage9Parser.RULE_typeTypeof);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1296;
            this.match(Stage9Parser.LPAREN);
            this.state = 1297;
            this.match(Stage9Parser.TYPEOF);
            this.state = 1298;
            this.match(Stage9Parser.IDENTIFIER);
            this.state = 1299;
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
        this.enterRule(localContext, 168, Stage9Parser.RULE_typeIndexAccess);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1301;
            this.match(Stage9Parser.LPAREN);
            this.state = 1302;
            this.match(Stage9Parser.INDEX);
            this.state = 1303;
            this.typeExpr();
            this.state = 1304;
            this.typeExpr();
            this.state = 1305;
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
        this.enterRule(localContext, 170, Stage9Parser.RULE_typeConditional);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1307;
            this.match(Stage9Parser.LPAREN);
            this.state = 1308;
            this.match(Stage9Parser.COND);
            this.state = 1309;
            this.typeExpr();
            this.state = 1310;
            this.typeExpr();
            this.state = 1311;
            this.typeExpr();
            this.state = 1312;
            this.typeExpr();
            this.state = 1313;
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
        this.enterRule(localContext, 172, Stage9Parser.RULE_typeInfer);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1315;
            this.match(Stage9Parser.LPAREN);
            this.state = 1316;
            this.match(Stage9Parser.INFER);
            this.state = 1317;
            this.match(Stage9Parser.IDENTIFIER);
            this.state = 1318;
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
        this.enterRule(localContext, 174, Stage9Parser.RULE_typeMapped);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1320;
            this.match(Stage9Parser.LPAREN);
            this.state = 1321;
            this.match(Stage9Parser.MAPPED);
            this.state = 1322;
            this.match(Stage9Parser.IDENTIFIER);
            this.state = 1323;
            this.typeExpr();
            this.state = 1325;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 94, this.context) ) {
            case 1:
                {
                this.state = 1324;
                this.mappedModifiers();
                }
                break;
            }
            this.state = 1327;
            this.typeExpr();
            this.state = 1328;
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
        this.enterRule(localContext, 176, Stage9Parser.RULE_mappedModifiers);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1330;
            this.match(Stage9Parser.LPAREN);
            this.state = 1331;
            this.match(Stage9Parser.MODIFIERS);
            this.state = 1333;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 1332;
                this.mappedModifier();
                }
                }
                this.state = 1335;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 89 || _la === 99);
            this.state = 1337;
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
        this.enterRule(localContext, 178, Stage9Parser.RULE_mappedModifier);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1339;
            _la = this.tokenStream.LA(1);
            if(!(_la === 89 || _la === 99)) {
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
        this.enterRule(localContext, 180, Stage9Parser.RULE_typeTemplateLiteral);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1341;
            this.match(Stage9Parser.LPAREN);
            this.state = 1342;
            this.match(Stage9Parser.TYPE_TEMPLATE);
            this.state = 1344;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 1343;
                this.templatePart();
                }
                }
                this.state = 1346;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 34 || _la === 101 || _la === 102 || _la === 141 || _la === 167 || _la === 173);
            this.state = 1348;
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
        this.enterRule(localContext, 182, Stage9Parser.RULE_templatePart);
        try {
            this.state = 1352;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case Stage9Parser.STRING:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1350;
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
                this.state = 1351;
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
        this.enterRule(localContext, 184, Stage9Parser.RULE_typeApplication);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1354;
            this.match(Stage9Parser.LPAREN);
            this.state = 1355;
            this.match(Stage9Parser.TYPE_APP);
            this.state = 1356;
            this.typeExpr();
            this.state = 1358;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 1357;
                this.typeExpr();
                }
                }
                this.state = 1360;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 34 || _la === 101 || _la === 102 || _la === 141 || _la === 173);
            this.state = 1362;
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
        this.enterRule(localContext, 186, Stage9Parser.RULE_typeParams);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1364;
            this.match(Stage9Parser.LPAREN);
            this.state = 1365;
            this.match(Stage9Parser.TYPE_PARAMS);
            this.state = 1367;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 1366;
                this.typeParamDecl();
                }
                }
                this.state = 1369;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2);
            this.state = 1371;
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
        this.enterRule(localContext, 188, Stage9Parser.RULE_typeParamDecl);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1373;
            this.match(Stage9Parser.LPAREN);
            this.state = 1374;
            this.match(Stage9Parser.IDENTIFIER);
            this.state = 1376;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 100, this.context) ) {
            case 1:
                {
                this.state = 1375;
                this.typeParamConstraint();
                }
                break;
            }
            this.state = 1379;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2) {
                {
                this.state = 1378;
                this.typeParamDefault();
                }
            }

            this.state = 1381;
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
        this.enterRule(localContext, 190, Stage9Parser.RULE_typeParamConstraint);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1383;
            this.match(Stage9Parser.LPAREN);
            this.state = 1384;
            this.match(Stage9Parser.EXTENDS);
            this.state = 1385;
            this.typeExpr();
            this.state = 1386;
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
        this.enterRule(localContext, 192, Stage9Parser.RULE_typeParamDefault);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1388;
            this.match(Stage9Parser.LPAREN);
            this.state = 1389;
            this.match(Stage9Parser.DEFAULT);
            this.state = 1390;
            this.typeExpr();
            this.state = 1391;
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
        this.enterRule(localContext, 194, Stage9Parser.RULE_assign);
        try {
            this.state = 1411;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 102, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1393;
                this.match(Stage9Parser.LPAREN);
                this.state = 1394;
                this.match(Stage9Parser.SET);
                this.state = 1395;
                this.match(Stage9Parser.IDENTIFIER);
                this.state = 1396;
                this.expression();
                this.state = 1397;
                this.match(Stage9Parser.RPAREN);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1399;
                this.match(Stage9Parser.LPAREN);
                this.state = 1400;
                this.match(Stage9Parser.SET);
                this.state = 1401;
                this.propAccess();
                this.state = 1402;
                this.expression();
                this.state = 1403;
                this.match(Stage9Parser.RPAREN);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 1405;
                this.match(Stage9Parser.LPAREN);
                this.state = 1406;
                this.match(Stage9Parser.SET);
                this.state = 1407;
                this.indexAccess();
                this.state = 1408;
                this.expression();
                this.state = 1409;
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
        this.enterRule(localContext, 196, Stage9Parser.RULE_compoundAssign);
        try {
            this.state = 1443;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 103, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1413;
                this.match(Stage9Parser.LPAREN);
                this.state = 1414;
                this.match(Stage9Parser.PLUS_ASSIGN);
                this.state = 1415;
                this.match(Stage9Parser.IDENTIFIER);
                this.state = 1416;
                this.expression();
                this.state = 1417;
                this.match(Stage9Parser.RPAREN);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1419;
                this.match(Stage9Parser.LPAREN);
                this.state = 1420;
                this.match(Stage9Parser.MINUS_ASSIGN);
                this.state = 1421;
                this.match(Stage9Parser.IDENTIFIER);
                this.state = 1422;
                this.expression();
                this.state = 1423;
                this.match(Stage9Parser.RPAREN);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 1425;
                this.match(Stage9Parser.LPAREN);
                this.state = 1426;
                this.match(Stage9Parser.TIMES_ASSIGN);
                this.state = 1427;
                this.match(Stage9Parser.IDENTIFIER);
                this.state = 1428;
                this.expression();
                this.state = 1429;
                this.match(Stage9Parser.RPAREN);
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 1431;
                this.match(Stage9Parser.LPAREN);
                this.state = 1432;
                this.match(Stage9Parser.DIV_ASSIGN);
                this.state = 1433;
                this.match(Stage9Parser.IDENTIFIER);
                this.state = 1434;
                this.expression();
                this.state = 1435;
                this.match(Stage9Parser.RPAREN);
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 1437;
                this.match(Stage9Parser.LPAREN);
                this.state = 1438;
                this.match(Stage9Parser.MOD_ASSIGN);
                this.state = 1439;
                this.match(Stage9Parser.IDENTIFIER);
                this.state = 1440;
                this.expression();
                this.state = 1441;
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
        this.enterRule(localContext, 198, Stage9Parser.RULE_subscriptAssign);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1445;
            this.match(Stage9Parser.LPAREN);
            this.state = 1446;
            this.expression();
            this.state = 1447;
            this.match(Stage9Parser.LBRACK);
            this.state = 1448;
            this.expression();
            this.state = 1449;
            this.match(Stage9Parser.RBRACK);
            this.state = 1450;
            this.match(Stage9Parser.EQUALS);
            this.state = 1451;
            this.expression();
            this.state = 1452;
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
        this.enterRule(localContext, 200, Stage9Parser.RULE_switchForm);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1454;
            this.match(Stage9Parser.LPAREN);
            this.state = 1455;
            this.match(Stage9Parser.SWITCH);
            this.state = 1456;
            this.expression();
            this.state = 1460;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 104, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 1457;
                    this.caseClause();
                    }
                    }
                }
                this.state = 1462;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 104, this.context);
            }
            this.state = 1464;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2) {
                {
                this.state = 1463;
                this.defaultClause();
                }
            }

            this.state = 1466;
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
        this.enterRule(localContext, 202, Stage9Parser.RULE_caseClause);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1468;
            this.match(Stage9Parser.LPAREN);
            this.state = 1469;
            this.match(Stage9Parser.CASE);
            this.state = 1470;
            this.expression();
            this.state = 1474;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 100)) & ~0x1F) === 0 && ((1 << (_la - 100)) & 4194336775) !== 0) || ((((_la - 132)) & ~0x1F) === 0 && ((1 << (_la - 132)) & 16775937) !== 0) || ((((_la - 166)) & ~0x1F) === 0 && ((1 << (_la - 166)) & 251) !== 0)) {
                {
                {
                this.state = 1471;
                this.statement();
                }
                }
                this.state = 1476;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1477;
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
        this.enterRule(localContext, 204, Stage9Parser.RULE_defaultClause);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1479;
            this.match(Stage9Parser.LPAREN);
            this.state = 1480;
            this.match(Stage9Parser.DEFAULT);
            this.state = 1484;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 100)) & ~0x1F) === 0 && ((1 << (_la - 100)) & 4194336775) !== 0) || ((((_la - 132)) & ~0x1F) === 0 && ((1 << (_la - 132)) & 16775937) !== 0) || ((((_la - 166)) & ~0x1F) === 0 && ((1 << (_la - 166)) & 251) !== 0)) {
                {
                {
                this.state = 1481;
                this.statement();
                }
                }
                this.state = 1486;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1487;
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
        this.enterRule(localContext, 206, Stage9Parser.RULE_forForm);
        let _la: number;
        try {
            this.state = 1518;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 110, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1489;
                this.match(Stage9Parser.LPAREN);
                this.state = 1490;
                this.match(Stage9Parser.FOR);
                this.state = 1491;
                this.letStmt();
                this.state = 1492;
                this.expression();
                this.state = 1493;
                this.assign();
                this.state = 1497;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 100)) & ~0x1F) === 0 && ((1 << (_la - 100)) & 4194336775) !== 0) || ((((_la - 132)) & ~0x1F) === 0 && ((1 << (_la - 132)) & 16775937) !== 0) || ((((_la - 166)) & ~0x1F) === 0 && ((1 << (_la - 166)) & 251) !== 0)) {
                    {
                    {
                    this.state = 1494;
                    this.statement();
                    }
                    }
                    this.state = 1499;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 1500;
                this.match(Stage9Parser.RPAREN);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1502;
                this.match(Stage9Parser.LPAREN);
                this.state = 1503;
                this.match(Stage9Parser.FOR);
                this.state = 1504;
                this.match(Stage9Parser.LPAREN);
                this.state = 1505;
                this.match(Stage9Parser.IDENTIFIER);
                this.state = 1506;
                this.expression();
                this.state = 1507;
                this.match(Stage9Parser.RPAREN);
                this.state = 1508;
                this.expression();
                this.state = 1509;
                this.expression();
                this.state = 1513;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 100)) & ~0x1F) === 0 && ((1 << (_la - 100)) & 4194336775) !== 0) || ((((_la - 132)) & ~0x1F) === 0 && ((1 << (_la - 132)) & 16775937) !== 0) || ((((_la - 166)) & ~0x1F) === 0 && ((1 << (_la - 166)) & 251) !== 0)) {
                    {
                    {
                    this.state = 1510;
                    this.statement();
                    }
                    }
                    this.state = 1515;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 1516;
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
        this.enterRule(localContext, 208, Stage9Parser.RULE_forInForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1520;
            this.match(Stage9Parser.LPAREN);
            this.state = 1521;
            this.match(Stage9Parser.FORIN);
            this.state = 1522;
            this.match(Stage9Parser.IDENTIFIER);
            this.state = 1523;
            this.expression();
            this.state = 1527;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 100)) & ~0x1F) === 0 && ((1 << (_la - 100)) & 4194336775) !== 0) || ((((_la - 132)) & ~0x1F) === 0 && ((1 << (_la - 132)) & 16775937) !== 0) || ((((_la - 166)) & ~0x1F) === 0 && ((1 << (_la - 166)) & 251) !== 0)) {
                {
                {
                this.state = 1524;
                this.statement();
                }
                }
                this.state = 1529;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1530;
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
        this.enterRule(localContext, 210, Stage9Parser.RULE_forOfForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1532;
            this.match(Stage9Parser.LPAREN);
            this.state = 1533;
            this.match(Stage9Parser.FOROF);
            this.state = 1534;
            this.match(Stage9Parser.IDENTIFIER);
            this.state = 1535;
            this.expression();
            this.state = 1539;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 100)) & ~0x1F) === 0 && ((1 << (_la - 100)) & 4194336775) !== 0) || ((((_la - 132)) & ~0x1F) === 0 && ((1 << (_la - 132)) & 16775937) !== 0) || ((((_la - 166)) & ~0x1F) === 0 && ((1 << (_la - 166)) & 251) !== 0)) {
                {
                {
                this.state = 1536;
                this.statement();
                }
                }
                this.state = 1541;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1542;
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
        this.enterRule(localContext, 212, Stage9Parser.RULE_forAwaitForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1544;
            this.match(Stage9Parser.LPAREN);
            this.state = 1545;
            this.match(Stage9Parser.FORAWAIT);
            this.state = 1546;
            this.match(Stage9Parser.IDENTIFIER);
            this.state = 1547;
            this.expression();
            this.state = 1551;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 100)) & ~0x1F) === 0 && ((1 << (_la - 100)) & 4194336775) !== 0) || ((((_la - 132)) & ~0x1F) === 0 && ((1 << (_la - 132)) & 16775937) !== 0) || ((((_la - 166)) & ~0x1F) === 0 && ((1 << (_la - 166)) & 251) !== 0)) {
                {
                {
                this.state = 1548;
                this.statement();
                }
                }
                this.state = 1553;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1554;
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
        this.enterRule(localContext, 214, Stage9Parser.RULE_exceptForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1556;
            this.match(Stage9Parser.LPAREN);
            this.state = 1557;
            this.match(Stage9Parser.EXCEPT);
            this.state = 1558;
            this.tryClause();
            this.state = 1560;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 114, this.context) ) {
            case 1:
                {
                this.state = 1559;
                this.catchClause();
                }
                break;
            }
            this.state = 1563;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2) {
                {
                this.state = 1562;
                this.finallyClause();
                }
            }

            this.state = 1565;
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
        this.enterRule(localContext, 216, Stage9Parser.RULE_tryClause);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1567;
            this.match(Stage9Parser.LPAREN);
            this.state = 1568;
            this.match(Stage9Parser.TRY);
            this.state = 1572;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 100)) & ~0x1F) === 0 && ((1 << (_la - 100)) & 4194336775) !== 0) || ((((_la - 132)) & ~0x1F) === 0 && ((1 << (_la - 132)) & 16775937) !== 0) || ((((_la - 166)) & ~0x1F) === 0 && ((1 << (_la - 166)) & 251) !== 0)) {
                {
                {
                this.state = 1569;
                this.statement();
                }
                }
                this.state = 1574;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1575;
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
        this.enterRule(localContext, 218, Stage9Parser.RULE_catchClause);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1577;
            this.match(Stage9Parser.LPAREN);
            this.state = 1578;
            this.match(Stage9Parser.CATCH);
            this.state = 1579;
            this.match(Stage9Parser.IDENTIFIER);
            this.state = 1583;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 100)) & ~0x1F) === 0 && ((1 << (_la - 100)) & 4194336775) !== 0) || ((((_la - 132)) & ~0x1F) === 0 && ((1 << (_la - 132)) & 16775937) !== 0) || ((((_la - 166)) & ~0x1F) === 0 && ((1 << (_la - 166)) & 251) !== 0)) {
                {
                {
                this.state = 1580;
                this.statement();
                }
                }
                this.state = 1585;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1586;
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
        this.enterRule(localContext, 220, Stage9Parser.RULE_finallyClause);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1588;
            this.match(Stage9Parser.LPAREN);
            this.state = 1589;
            this.match(Stage9Parser.FINALLY);
            this.state = 1593;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 100)) & ~0x1F) === 0 && ((1 << (_la - 100)) & 4194336775) !== 0) || ((((_la - 132)) & ~0x1F) === 0 && ((1 << (_la - 132)) & 16775937) !== 0) || ((((_la - 166)) & ~0x1F) === 0 && ((1 << (_la - 166)) & 251) !== 0)) {
                {
                {
                this.state = 1590;
                this.statement();
                }
                }
                this.state = 1595;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1596;
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
        this.enterRule(localContext, 222, Stage9Parser.RULE_expression);
        try {
            this.state = 1648;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 119, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1598;
                this.literal();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1599;
                this.match(Stage9Parser.IDENTIFIER);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 1600;
                this.match(Stage9Parser.MACRO_ERROR);
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 1601;
                this.match(Stage9Parser.MINUS);
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 1602;
                this.lambda();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 1603;
                this.fn();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 1604;
                this.asyncLambda();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 1605;
                this.asyncFn();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 1606;
                this.generatorFn();
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 1607;
                this.asyncGeneratorFn();
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 1608;
                this.fnO();
                }
                break;
            case 12:
                this.enterOuterAlt(localContext, 12);
                {
                this.state = 1609;
                this.lambdaO();
                }
                break;
            case 13:
                this.enterOuterAlt(localContext, 13);
                {
                this.state = 1610;
                this.asyncFnO();
                }
                break;
            case 14:
                this.enterOuterAlt(localContext, 14);
                {
                this.state = 1611;
                this.asyncLambdaO();
                }
                break;
            case 15:
                this.enterOuterAlt(localContext, 15);
                {
                this.state = 1612;
                this.generatorFnO();
                }
                break;
            case 16:
                this.enterOuterAlt(localContext, 16);
                {
                this.state = 1613;
                this.asyncGeneratorFnO();
                }
                break;
            case 17:
                this.enterOuterAlt(localContext, 17);
                {
                this.state = 1614;
                this.awaitExpr();
                }
                break;
            case 18:
                this.enterOuterAlt(localContext, 18);
                {
                this.state = 1615;
                this.yieldExpr();
                }
                break;
            case 19:
                this.enterOuterAlt(localContext, 19);
                {
                this.state = 1616;
                this.yieldStarExpr();
                }
                break;
            case 20:
                this.enterOuterAlt(localContext, 20);
                {
                this.state = 1617;
                this.bindExpr();
                }
                break;
            case 21:
                this.enterOuterAlt(localContext, 21);
                {
                this.state = 1618;
                this.methodCallExpr();
                }
                break;
            case 22:
                this.enterOuterAlt(localContext, 22);
                {
                this.state = 1619;
                this.objectExpr();
                }
                break;
            case 23:
                this.enterOuterAlt(localContext, 23);
                {
                this.state = 1620;
                this.braceObjectExpr();
                }
                break;
            case 24:
                this.enterOuterAlt(localContext, 24);
                {
                this.state = 1621;
                this.arrayExpr();
                }
                break;
            case 25:
                this.enterOuterAlt(localContext, 25);
                {
                this.state = 1622;
                this.bracketArrayExpr();
                }
                break;
            case 26:
                this.enterOuterAlt(localContext, 26);
                {
                this.state = 1623;
                this.propAccess();
                }
                break;
            case 27:
                this.enterOuterAlt(localContext, 27);
                {
                this.state = 1624;
                this.indexAccess();
                }
                break;
            case 28:
                this.enterOuterAlt(localContext, 28);
                {
                this.state = 1625;
                this.subscriptAccess();
                }
                break;
            case 29:
                this.enterOuterAlt(localContext, 29);
                {
                this.state = 1626;
                this.quasiquote();
                }
                break;
            case 30:
                this.enterOuterAlt(localContext, 30);
                {
                this.state = 1627;
                this.unquote();
                }
                break;
            case 31:
                this.enterOuterAlt(localContext, 31);
                {
                this.state = 1628;
                this.unquoteSplicing();
                }
                break;
            case 32:
                this.enterOuterAlt(localContext, 32);
                {
                this.state = 1629;
                this.tildeUnquote();
                }
                break;
            case 33:
                this.enterOuterAlt(localContext, 33);
                {
                this.state = 1630;
                this.tildeUnquoteSplice();
                }
                break;
            case 34:
                this.enterOuterAlt(localContext, 34);
                {
                this.state = 1631;
                this.ternary();
                }
                break;
            case 35:
                this.enterOuterAlt(localContext, 35);
                {
                this.state = 1632;
                this.condExpr();
                }
                break;
            case 36:
                this.enterOuterAlt(localContext, 36);
                {
                this.state = 1633;
                this.newForm();
                }
                break;
            case 37:
                this.enterOuterAlt(localContext, 37);
                {
                this.state = 1634;
                this.optChain();
                }
                break;
            case 38:
                this.enterOuterAlt(localContext, 38);
                {
                this.state = 1635;
                this.optChainIndex();
                }
                break;
            case 39:
                this.enterOuterAlt(localContext, 39);
                {
                this.state = 1636;
                this.nullCoalesce();
                }
                break;
            case 40:
                this.enterOuterAlt(localContext, 40);
                {
                this.state = 1637;
                this.typeofExpr();
                }
                break;
            case 41:
                this.enterOuterAlt(localContext, 41);
                {
                this.state = 1638;
                this.typeAssert();
                }
                break;
            case 42:
                this.enterOuterAlt(localContext, 42);
                {
                this.state = 1639;
                this.templateExpr();
                }
                break;
            case 43:
                this.enterOuterAlt(localContext, 43);
                {
                this.state = 1640;
                this.thisExpr();
                }
                break;
            case 44:
                this.enterOuterAlt(localContext, 44);
                {
                this.state = 1641;
                this.superExpr();
                }
                break;
            case 45:
                this.enterOuterAlt(localContext, 45);
                {
                this.state = 1642;
                this.superConstructorCall();
                }
                break;
            case 46:
                this.enterOuterAlt(localContext, 46);
                {
                this.state = 1643;
                this.superMethodCall();
                }
                break;
            case 47:
                this.enterOuterAlt(localContext, 47);
                {
                this.state = 1644;
                this.infixExpr();
                }
                break;
            case 48:
                this.enterOuterAlt(localContext, 48);
                {
                this.state = 1645;
                this.macroExprCall();
                }
                break;
            case 49:
                this.enterOuterAlt(localContext, 49);
                {
                this.state = 1646;
                this.opSymbol();
                }
                break;
            case 50:
                this.enterOuterAlt(localContext, 50);
                {
                this.state = 1647;
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
        this.enterRule(localContext, 224, Stage9Parser.RULE_thisExpr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1650;
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
        this.enterRule(localContext, 226, Stage9Parser.RULE_superExpr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1652;
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
        this.enterRule(localContext, 228, Stage9Parser.RULE_superConstructorCall);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1654;
            this.match(Stage9Parser.LPAREN);
            this.state = 1655;
            this.match(Stage9Parser.SUPER);
            this.state = 1659;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 100)) & ~0x1F) === 0 && ((1 << (_la - 100)) & 4194336775) !== 0) || ((((_la - 132)) & ~0x1F) === 0 && ((1 << (_la - 132)) & 16775937) !== 0) || ((((_la - 166)) & ~0x1F) === 0 && ((1 << (_la - 166)) & 251) !== 0)) {
                {
                {
                this.state = 1656;
                this.expression();
                }
                }
                this.state = 1661;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1662;
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
        this.enterRule(localContext, 230, Stage9Parser.RULE_superMethodCall);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1664;
            this.match(Stage9Parser.LPAREN);
            this.state = 1665;
            this.match(Stage9Parser.SUPER_METHOD);
            this.state = 1666;
            this.match(Stage9Parser.IDENTIFIER);
            this.state = 1670;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 100)) & ~0x1F) === 0 && ((1 << (_la - 100)) & 4194336775) !== 0) || ((((_la - 132)) & ~0x1F) === 0 && ((1 << (_la - 132)) & 16775937) !== 0) || ((((_la - 166)) & ~0x1F) === 0 && ((1 << (_la - 166)) & 251) !== 0)) {
                {
                {
                this.state = 1667;
                this.expression();
                }
                }
                this.state = 1672;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1673;
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
        this.enterRule(localContext, 232, Stage9Parser.RULE_typeofExpr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1675;
            this.match(Stage9Parser.LPAREN);
            this.state = 1676;
            this.match(Stage9Parser.TYPEOF);
            this.state = 1677;
            this.expression();
            this.state = 1678;
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
        this.enterRule(localContext, 234, Stage9Parser.RULE_typeAssert);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1680;
            this.match(Stage9Parser.LPAREN);
            this.state = 1681;
            this.match(Stage9Parser.TYPE_AS);
            this.state = 1682;
            this.expression();
            this.state = 1683;
            this.typeExpr();
            this.state = 1684;
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
        this.enterRule(localContext, 236, Stage9Parser.RULE_lambda);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1686;
            this.match(Stage9Parser.LPAREN);
            this.state = 1687;
            this.match(Stage9Parser.LAMBDA);
            this.state = 1688;
            this.fnSignature();
            this.state = 1692;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 100)) & ~0x1F) === 0 && ((1 << (_la - 100)) & 4194336775) !== 0) || ((((_la - 132)) & ~0x1F) === 0 && ((1 << (_la - 132)) & 16775937) !== 0) || ((((_la - 166)) & ~0x1F) === 0 && ((1 << (_la - 166)) & 251) !== 0)) {
                {
                {
                this.state = 1689;
                this.statement();
                }
                }
                this.state = 1694;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1695;
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
        this.enterRule(localContext, 238, Stage9Parser.RULE_fn);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1697;
            this.match(Stage9Parser.LPAREN);
            this.state = 1698;
            this.match(Stage9Parser.FN);
            this.state = 1700;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 173) {
                {
                this.state = 1699;
                this.match(Stage9Parser.IDENTIFIER);
                }
            }

            this.state = 1702;
            this.fnSignature();
            this.state = 1706;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 100)) & ~0x1F) === 0 && ((1 << (_la - 100)) & 4194336775) !== 0) || ((((_la - 132)) & ~0x1F) === 0 && ((1 << (_la - 132)) & 16775937) !== 0) || ((((_la - 166)) & ~0x1F) === 0 && ((1 << (_la - 166)) & 251) !== 0)) {
                {
                {
                this.state = 1703;
                this.statement();
                }
                }
                this.state = 1708;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1709;
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
        this.enterRule(localContext, 240, Stage9Parser.RULE_asyncLambda);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1711;
            this.match(Stage9Parser.LPAREN);
            this.state = 1712;
            this.match(Stage9Parser.ASYNC_LAMBDA);
            this.state = 1713;
            this.fnSignature();
            this.state = 1717;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 100)) & ~0x1F) === 0 && ((1 << (_la - 100)) & 4194336775) !== 0) || ((((_la - 132)) & ~0x1F) === 0 && ((1 << (_la - 132)) & 16775937) !== 0) || ((((_la - 166)) & ~0x1F) === 0 && ((1 << (_la - 166)) & 251) !== 0)) {
                {
                {
                this.state = 1714;
                this.statement();
                }
                }
                this.state = 1719;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1720;
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
        this.enterRule(localContext, 242, Stage9Parser.RULE_asyncFn);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1722;
            this.match(Stage9Parser.LPAREN);
            this.state = 1723;
            this.match(Stage9Parser.ASYNC_FN);
            this.state = 1724;
            this.fnSignature();
            this.state = 1728;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 100)) & ~0x1F) === 0 && ((1 << (_la - 100)) & 4194336775) !== 0) || ((((_la - 132)) & ~0x1F) === 0 && ((1 << (_la - 132)) & 16775937) !== 0) || ((((_la - 166)) & ~0x1F) === 0 && ((1 << (_la - 166)) & 251) !== 0)) {
                {
                {
                this.state = 1725;
                this.statement();
                }
                }
                this.state = 1730;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1731;
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
        this.enterRule(localContext, 244, Stage9Parser.RULE_generatorFn);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1733;
            this.match(Stage9Parser.LPAREN);
            this.state = 1734;
            this.match(Stage9Parser.GENERATOR_FN);
            this.state = 1735;
            this.fnSignature();
            this.state = 1739;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 100)) & ~0x1F) === 0 && ((1 << (_la - 100)) & 4194336775) !== 0) || ((((_la - 132)) & ~0x1F) === 0 && ((1 << (_la - 132)) & 16775937) !== 0) || ((((_la - 166)) & ~0x1F) === 0 && ((1 << (_la - 166)) & 251) !== 0)) {
                {
                {
                this.state = 1736;
                this.statement();
                }
                }
                this.state = 1741;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1742;
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
        this.enterRule(localContext, 246, Stage9Parser.RULE_asyncGeneratorFn);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1744;
            this.match(Stage9Parser.LPAREN);
            this.state = 1745;
            this.match(Stage9Parser.ASYNC_GENERATOR_FN);
            this.state = 1746;
            this.fnSignature();
            this.state = 1750;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 100)) & ~0x1F) === 0 && ((1 << (_la - 100)) & 4194336775) !== 0) || ((((_la - 132)) & ~0x1F) === 0 && ((1 << (_la - 132)) & 16775937) !== 0) || ((((_la - 166)) & ~0x1F) === 0 && ((1 << (_la - 166)) & 251) !== 0)) {
                {
                {
                this.state = 1747;
                this.statement();
                }
                }
                this.state = 1752;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1753;
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
        this.enterRule(localContext, 248, Stage9Parser.RULE_fnO);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1755;
            this.match(Stage9Parser.LPAREN);
            this.state = 1756;
            this.match(Stage9Parser.FN_O);
            this.state = 1758;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 173) {
                {
                this.state = 1757;
                this.match(Stage9Parser.IDENTIFIER);
                }
            }

            this.state = 1760;
            this.fnoSignature();
            this.state = 1764;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 100)) & ~0x1F) === 0 && ((1 << (_la - 100)) & 4194336775) !== 0) || ((((_la - 132)) & ~0x1F) === 0 && ((1 << (_la - 132)) & 16775937) !== 0) || ((((_la - 166)) & ~0x1F) === 0 && ((1 << (_la - 166)) & 251) !== 0)) {
                {
                {
                this.state = 1761;
                this.statement();
                }
                }
                this.state = 1766;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1767;
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
        this.enterRule(localContext, 250, Stage9Parser.RULE_lambdaO);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1769;
            this.match(Stage9Parser.LPAREN);
            this.state = 1770;
            this.match(Stage9Parser.LAMBDA_O);
            this.state = 1771;
            this.fnoSignature();
            this.state = 1775;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 100)) & ~0x1F) === 0 && ((1 << (_la - 100)) & 4194336775) !== 0) || ((((_la - 132)) & ~0x1F) === 0 && ((1 << (_la - 132)) & 16775937) !== 0) || ((((_la - 166)) & ~0x1F) === 0 && ((1 << (_la - 166)) & 251) !== 0)) {
                {
                {
                this.state = 1772;
                this.statement();
                }
                }
                this.state = 1777;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1778;
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
        this.enterRule(localContext, 252, Stage9Parser.RULE_asyncFnO);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1780;
            this.match(Stage9Parser.LPAREN);
            this.state = 1781;
            this.match(Stage9Parser.ASYNC_FN_O);
            this.state = 1782;
            this.fnoSignature();
            this.state = 1786;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 100)) & ~0x1F) === 0 && ((1 << (_la - 100)) & 4194336775) !== 0) || ((((_la - 132)) & ~0x1F) === 0 && ((1 << (_la - 132)) & 16775937) !== 0) || ((((_la - 166)) & ~0x1F) === 0 && ((1 << (_la - 166)) & 251) !== 0)) {
                {
                {
                this.state = 1783;
                this.statement();
                }
                }
                this.state = 1788;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1789;
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
        this.enterRule(localContext, 254, Stage9Parser.RULE_asyncLambdaO);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1791;
            this.match(Stage9Parser.LPAREN);
            this.state = 1792;
            this.match(Stage9Parser.ASYNC_LAMBDA_O);
            this.state = 1793;
            this.fnoSignature();
            this.state = 1797;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 100)) & ~0x1F) === 0 && ((1 << (_la - 100)) & 4194336775) !== 0) || ((((_la - 132)) & ~0x1F) === 0 && ((1 << (_la - 132)) & 16775937) !== 0) || ((((_la - 166)) & ~0x1F) === 0 && ((1 << (_la - 166)) & 251) !== 0)) {
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
    public generatorFnO(): GeneratorFnOContext {
        let localContext = new GeneratorFnOContext(this.context, this.state);
        this.enterRule(localContext, 256, Stage9Parser.RULE_generatorFnO);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1802;
            this.match(Stage9Parser.LPAREN);
            this.state = 1803;
            this.match(Stage9Parser.GENERATOR_FN_O);
            this.state = 1804;
            this.fnoSignature();
            this.state = 1808;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 100)) & ~0x1F) === 0 && ((1 << (_la - 100)) & 4194336775) !== 0) || ((((_la - 132)) & ~0x1F) === 0 && ((1 << (_la - 132)) & 16775937) !== 0) || ((((_la - 166)) & ~0x1F) === 0 && ((1 << (_la - 166)) & 251) !== 0)) {
                {
                {
                this.state = 1805;
                this.statement();
                }
                }
                this.state = 1810;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1811;
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
        this.enterRule(localContext, 258, Stage9Parser.RULE_asyncGeneratorFnO);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1813;
            this.match(Stage9Parser.LPAREN);
            this.state = 1814;
            this.match(Stage9Parser.ASYNC_GENERATOR_FN_O);
            this.state = 1815;
            this.fnoSignature();
            this.state = 1819;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 100)) & ~0x1F) === 0 && ((1 << (_la - 100)) & 4194336775) !== 0) || ((((_la - 132)) & ~0x1F) === 0 && ((1 << (_la - 132)) & 16775937) !== 0) || ((((_la - 166)) & ~0x1F) === 0 && ((1 << (_la - 166)) & 251) !== 0)) {
                {
                {
                this.state = 1816;
                this.statement();
                }
                }
                this.state = 1821;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1822;
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
        this.enterRule(localContext, 260, Stage9Parser.RULE_methodO);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1824;
            this.match(Stage9Parser.LPAREN);
            this.state = 1825;
            this.match(Stage9Parser.METHOD_O);
            this.state = 1829;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 75 || _la === 89 || ((((_la - 116)) & ~0x1F) === 0 && ((1 << (_la - 116)) & 255) !== 0)) {
                {
                {
                this.state = 1826;
                this.modifier();
                }
                }
                this.state = 1831;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1832;
            this.methodKey();
            this.state = 1833;
            this.fnoSignature();
            this.state = 1837;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 100)) & ~0x1F) === 0 && ((1 << (_la - 100)) & 4194336775) !== 0) || ((((_la - 132)) & ~0x1F) === 0 && ((1 << (_la - 132)) & 16775937) !== 0) || ((((_la - 166)) & ~0x1F) === 0 && ((1 << (_la - 166)) & 251) !== 0)) {
                {
                {
                this.state = 1834;
                this.statement();
                }
                }
                this.state = 1839;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1840;
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
        this.enterRule(localContext, 262, Stage9Parser.RULE_abstractMethodO);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1842;
            this.match(Stage9Parser.LPAREN);
            this.state = 1843;
            this.match(Stage9Parser.ABSTRACT_METHOD_O);
            this.state = 1847;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 75 || _la === 89 || ((((_la - 116)) & ~0x1F) === 0 && ((1 << (_la - 116)) & 255) !== 0)) {
                {
                {
                this.state = 1844;
                this.modifier();
                }
                }
                this.state = 1849;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1850;
            this.methodKey();
            this.state = 1851;
            this.fnoSignature();
            this.state = 1852;
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
        this.enterRule(localContext, 264, Stage9Parser.RULE_constructorO);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1854;
            this.match(Stage9Parser.LPAREN);
            this.state = 1855;
            this.match(Stage9Parser.CONSTRUCTOR_O);
            this.state = 1856;
            this.fnoSignature();
            this.state = 1860;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 100)) & ~0x1F) === 0 && ((1 << (_la - 100)) & 4194336775) !== 0) || ((((_la - 132)) & ~0x1F) === 0 && ((1 << (_la - 132)) & 16775937) !== 0) || ((((_la - 166)) & ~0x1F) === 0 && ((1 << (_la - 166)) & 251) !== 0)) {
                {
                {
                this.state = 1857;
                this.statement();
                }
                }
                this.state = 1862;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1863;
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
        this.enterRule(localContext, 266, Stage9Parser.RULE_fnoSignature);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1865;
            this.match(Stage9Parser.LPAREN);
            {
            this.state = 1869;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 140, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 1866;
                    this.fnoParam();
                    }
                    }
                }
                this.state = 1871;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 140, this.context);
            }
            this.state = 1873;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2) {
                {
                this.state = 1872;
                this.fnoRestParam();
                }
            }

            }
            this.state = 1875;
            this.match(Stage9Parser.RPAREN);
            this.state = 1878;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 103) {
                {
                this.state = 1876;
                this.match(Stage9Parser.COLON);
                this.state = 1877;
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
        this.enterRule(localContext, 268, Stage9Parser.RULE_fnoParam);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1880;
            this.match(Stage9Parser.LPAREN);
            this.state = 1881;
            this.match(Stage9Parser.IDENTIFIER);
            this.state = 1883;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 99) {
                {
                this.state = 1882;
                this.match(Stage9Parser.OPTIONAL);
                }
            }

            this.state = 1887;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 103) {
                {
                this.state = 1885;
                this.match(Stage9Parser.COLON);
                this.state = 1886;
                this.typeExpr();
                }
            }

            this.state = 1894;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2) {
                {
                this.state = 1889;
                this.match(Stage9Parser.LPAREN);
                this.state = 1890;
                this.match(Stage9Parser.DEFAULT);
                this.state = 1891;
                this.expression();
                this.state = 1892;
                this.match(Stage9Parser.RPAREN);
                }
            }

            this.state = 1896;
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
        this.enterRule(localContext, 270, Stage9Parser.RULE_fnoRestParam);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1898;
            this.match(Stage9Parser.LPAREN);
            this.state = 1899;
            this.match(Stage9Parser.REST);
            this.state = 1900;
            this.match(Stage9Parser.IDENTIFIER);
            this.state = 1903;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 103) {
                {
                this.state = 1901;
                this.match(Stage9Parser.COLON);
                this.state = 1902;
                this.typeExpr();
                }
            }

            this.state = 1905;
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
        this.enterRule(localContext, 272, Stage9Parser.RULE_awaitExpr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1907;
            this.match(Stage9Parser.LPAREN);
            this.state = 1908;
            this.match(Stage9Parser.AWAIT);
            this.state = 1909;
            this.expression();
            this.state = 1910;
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
        this.enterRule(localContext, 274, Stage9Parser.RULE_yieldExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1912;
            this.match(Stage9Parser.LPAREN);
            this.state = 1913;
            this.match(Stage9Parser.YIELD);
            this.state = 1915;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 100)) & ~0x1F) === 0 && ((1 << (_la - 100)) & 4194336775) !== 0) || ((((_la - 132)) & ~0x1F) === 0 && ((1 << (_la - 132)) & 16775937) !== 0) || ((((_la - 166)) & ~0x1F) === 0 && ((1 << (_la - 166)) & 251) !== 0)) {
                {
                this.state = 1914;
                this.expression();
                }
            }

            this.state = 1917;
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
        this.enterRule(localContext, 276, Stage9Parser.RULE_yieldStarExpr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1919;
            this.match(Stage9Parser.LPAREN);
            this.state = 1920;
            this.match(Stage9Parser.YIELD_STAR);
            this.state = 1921;
            this.expression();
            this.state = 1922;
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
        this.enterRule(localContext, 278, Stage9Parser.RULE_bindExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1924;
            this.match(Stage9Parser.LPAREN);
            this.state = 1925;
            this.match(Stage9Parser.BIND);
            this.state = 1926;
            this.expression();
            this.state = 1927;
            this.expression();
            this.state = 1931;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 100)) & ~0x1F) === 0 && ((1 << (_la - 100)) & 4194336775) !== 0) || ((((_la - 132)) & ~0x1F) === 0 && ((1 << (_la - 132)) & 16775937) !== 0) || ((((_la - 166)) & ~0x1F) === 0 && ((1 << (_la - 166)) & 251) !== 0)) {
                {
                {
                this.state = 1928;
                this.expression();
                }
                }
                this.state = 1933;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1934;
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
        this.enterRule(localContext, 280, Stage9Parser.RULE_methodCallExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1936;
            this.match(Stage9Parser.LPAREN);
            this.state = 1937;
            this.match(Stage9Parser.METHOD_CALL);
            this.state = 1938;
            this.expression();
            this.state = 1939;
            this.expression();
            this.state = 1943;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 100)) & ~0x1F) === 0 && ((1 << (_la - 100)) & 4194336775) !== 0) || ((((_la - 132)) & ~0x1F) === 0 && ((1 << (_la - 132)) & 16775937) !== 0) || ((((_la - 166)) & ~0x1F) === 0 && ((1 << (_la - 166)) & 251) !== 0)) {
                {
                {
                this.state = 1940;
                this.expression();
                }
                }
                this.state = 1945;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1946;
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
        this.enterRule(localContext, 282, Stage9Parser.RULE_ternary);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1948;
            this.match(Stage9Parser.LPAREN);
            this.state = 1949;
            this.match(Stage9Parser.TERNARY);
            this.state = 1950;
            this.expression();
            this.state = 1951;
            this.expression();
            this.state = 1952;
            this.expression();
            this.state = 1953;
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
        this.enterRule(localContext, 284, Stage9Parser.RULE_condExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1955;
            this.match(Stage9Parser.LPAREN);
            this.state = 1956;
            this.match(Stage9Parser.COND);
            this.state = 1958;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 1957;
                this.condClause();
                }
                }
                this.state = 1960;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 100)) & ~0x1F) === 0 && ((1 << (_la - 100)) & 4194336775) !== 0) || ((((_la - 132)) & ~0x1F) === 0 && ((1 << (_la - 132)) & 16775937) !== 0) || ((((_la - 166)) & ~0x1F) === 0 && ((1 << (_la - 166)) & 251) !== 0));
            this.state = 1963;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 124) {
                {
                this.state = 1962;
                this.condElseClause();
                }
            }

            this.state = 1965;
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
        this.enterRule(localContext, 286, Stage9Parser.RULE_condClause);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1967;
            this.expression();
            this.state = 1968;
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
        this.enterRule(localContext, 288, Stage9Parser.RULE_condElseClause);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1970;
            this.match(Stage9Parser.ELSE);
            this.state = 1971;
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
        this.enterRule(localContext, 290, Stage9Parser.RULE_newForm);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1973;
            this.match(Stage9Parser.LPAREN);
            this.state = 1974;
            this.match(Stage9Parser.NEW);
            this.state = 1975;
            this.match(Stage9Parser.IDENTIFIER);
            this.state = 1977;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 152, this.context) ) {
            case 1:
                {
                this.state = 1976;
                this.typeArgs();
                }
                break;
            }
            this.state = 1982;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 100)) & ~0x1F) === 0 && ((1 << (_la - 100)) & 4194336775) !== 0) || ((((_la - 132)) & ~0x1F) === 0 && ((1 << (_la - 132)) & 16775937) !== 0) || ((((_la - 166)) & ~0x1F) === 0 && ((1 << (_la - 166)) & 251) !== 0)) {
                {
                {
                this.state = 1979;
                this.expression();
                }
                }
                this.state = 1984;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1985;
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
        this.enterRule(localContext, 292, Stage9Parser.RULE_objectExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1987;
            this.match(Stage9Parser.LPAREN);
            this.state = 1988;
            this.match(Stage9Parser.OBJECT);
            this.state = 1992;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 1989;
                this.objectField();
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
    public objectField(): ObjectFieldContext {
        let localContext = new ObjectFieldContext(this.context, this.state);
        this.enterRule(localContext, 294, Stage9Parser.RULE_objectField);
        try {
            this.state = 2024;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 155, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1997;
                this.match(Stage9Parser.LPAREN);
                this.state = 1998;
                this.propKey();
                this.state = 1999;
                this.expression();
                this.state = 2000;
                this.match(Stage9Parser.RPAREN);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 2002;
                this.match(Stage9Parser.LPAREN);
                this.state = 2003;
                this.propKey();
                this.state = 2004;
                this.methodDef();
                this.state = 2005;
                this.match(Stage9Parser.RPAREN);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 2007;
                this.match(Stage9Parser.LPAREN);
                this.state = 2008;
                this.match(Stage9Parser.IDENTIFIER);
                this.state = 2009;
                this.match(Stage9Parser.RPAREN);
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 2010;
                this.match(Stage9Parser.LPAREN);
                this.state = 2011;
                this.match(Stage9Parser.LBRACK);
                this.state = 2012;
                this.expression();
                this.state = 2013;
                this.match(Stage9Parser.RBRACK);
                this.state = 2014;
                this.expression();
                this.state = 2015;
                this.match(Stage9Parser.RPAREN);
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 2017;
                this.match(Stage9Parser.LPAREN);
                this.state = 2018;
                this.match(Stage9Parser.LBRACK);
                this.state = 2019;
                this.expression();
                this.state = 2020;
                this.match(Stage9Parser.RBRACK);
                this.state = 2021;
                this.methodDef();
                this.state = 2022;
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
        this.enterRule(localContext, 296, Stage9Parser.RULE_methodDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2026;
            this.match(Stage9Parser.LPAREN);
            this.state = 2027;
            this.match(Stage9Parser.METHOD);
            this.state = 2028;
            this.fnSignature();
            this.state = 2032;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 100)) & ~0x1F) === 0 && ((1 << (_la - 100)) & 4194336775) !== 0) || ((((_la - 132)) & ~0x1F) === 0 && ((1 << (_la - 132)) & 16775937) !== 0) || ((((_la - 166)) & ~0x1F) === 0 && ((1 << (_la - 166)) & 251) !== 0)) {
                {
                {
                this.state = 2029;
                this.statement();
                }
                }
                this.state = 2034;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 2035;
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
        this.enterRule(localContext, 298, Stage9Parser.RULE_arrayExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2037;
            this.match(Stage9Parser.LPAREN);
            this.state = 2038;
            this.match(Stage9Parser.ARRAY);
            this.state = 2042;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 100)) & ~0x1F) === 0 && ((1 << (_la - 100)) & 4194336775) !== 0) || ((((_la - 132)) & ~0x1F) === 0 && ((1 << (_la - 132)) & 16775937) !== 0) || ((((_la - 166)) & ~0x1F) === 0 && ((1 << (_la - 166)) & 251) !== 0)) {
                {
                {
                this.state = 2039;
                this.expression();
                }
                }
                this.state = 2044;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 2045;
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
        this.enterRule(localContext, 300, Stage9Parser.RULE_bracketArrayExpr);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2047;
            this.match(Stage9Parser.LBRACK);
            this.state = 2061;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 100)) & ~0x1F) === 0 && ((1 << (_la - 100)) & 4194336775) !== 0) || ((((_la - 132)) & ~0x1F) === 0 && ((1 << (_la - 132)) & 16775937) !== 0) || ((((_la - 166)) & ~0x1F) === 0 && ((1 << (_la - 166)) & 251) !== 0)) {
                {
                this.state = 2048;
                this.expression();
                this.state = 2055;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 159, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 2050;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                        if (_la === 4) {
                            {
                            this.state = 2049;
                            this.match(Stage9Parser.COMMA);
                            }
                        }

                        this.state = 2052;
                        this.expression();
                        }
                        }
                    }
                    this.state = 2057;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 159, this.context);
                }
                this.state = 2059;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 4) {
                    {
                    this.state = 2058;
                    this.match(Stage9Parser.COMMA);
                    }
                }

                }
            }

            this.state = 2063;
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
        this.enterRule(localContext, 302, Stage9Parser.RULE_braceObjectExpr);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2065;
            this.match(Stage9Parser.LBRACE);
            this.state = 2079;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 125 || _la === 167 || _la === 173) {
                {
                this.state = 2066;
                this.braceObjectField();
                this.state = 2073;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 163, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 2068;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                        if (_la === 4) {
                            {
                            this.state = 2067;
                            this.match(Stage9Parser.COMMA);
                            }
                        }

                        this.state = 2070;
                        this.braceObjectField();
                        }
                        }
                    }
                    this.state = 2075;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 163, this.context);
                }
                this.state = 2077;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 4) {
                    {
                    this.state = 2076;
                    this.match(Stage9Parser.COMMA);
                    }
                }

                }
            }

            this.state = 2081;
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
        this.enterRule(localContext, 304, Stage9Parser.RULE_braceObjectField);
        let _la: number;
        try {
            this.state = 2093;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 166, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 2083;
                _la = this.tokenStream.LA(1);
                if(!(_la === 167 || _la === 173)) {
                this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                this.state = 2084;
                this.match(Stage9Parser.COLON);
                this.state = 2085;
                this.expression();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 2086;
                this.match(Stage9Parser.LBRACK);
                this.state = 2087;
                this.expression();
                this.state = 2088;
                this.match(Stage9Parser.RBRACK);
                this.state = 2089;
                this.match(Stage9Parser.COLON);
                this.state = 2090;
                this.expression();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 2092;
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
        this.enterRule(localContext, 306, Stage9Parser.RULE_templateExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2095;
            this.match(Stage9Parser.LPAREN);
            this.state = 2096;
            this.match(Stage9Parser.TEMPLATE);
            this.state = 2099;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                this.state = 2099;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 167, this.context) ) {
                case 1:
                    {
                    this.state = 2097;
                    this.match(Stage9Parser.STRING);
                    }
                    break;
                case 2:
                    {
                    this.state = 2098;
                    this.expression();
                    }
                    break;
                }
                }
                this.state = 2101;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 100)) & ~0x1F) === 0 && ((1 << (_la - 100)) & 4194336775) !== 0) || ((((_la - 132)) & ~0x1F) === 0 && ((1 << (_la - 132)) & 16775937) !== 0) || ((((_la - 166)) & ~0x1F) === 0 && ((1 << (_la - 166)) & 251) !== 0));
            this.state = 2103;
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
        this.enterRule(localContext, 308, Stage9Parser.RULE_propKey);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2105;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 5)) & ~0x1F) === 0 && ((1 << (_la - 5)) & 4244635647) !== 0) || ((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 4294967295) !== 0) || ((((_la - 73)) & ~0x1F) === 0 && ((1 << (_la - 73)) & 3154116607) !== 0) || ((((_la - 105)) & ~0x1F) === 0 && ((1 << (_la - 105)) & 265289727) !== 0) || ((((_la - 144)) & ~0x1F) === 0 && ((1 << (_la - 144)) & 822083583) !== 0))) {
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
        this.enterRule(localContext, 310, Stage9Parser.RULE_opSymbol);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2107;
            _la = this.tokenStream.LA(1);
            if(!(_la === 42 || ((((_la - 115)) & ~0x1F) === 0 && ((1 << (_la - 115)) & 3791908865) !== 0) || ((((_la - 147)) & ~0x1F) === 0 && ((1 << (_la - 147)) & 33554943) !== 0))) {
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
        this.enterRule(localContext, 312, Stage9Parser.RULE_propAccess);
        try {
            this.state = 2123;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 169, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 2109;
                this.match(Stage9Parser.LPAREN);
                this.state = 2110;
                this.match(Stage9Parser.DOT);
                this.state = 2111;
                this.expression();
                this.state = 2112;
                this.propKey();
                this.state = 2113;
                this.match(Stage9Parser.RPAREN);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 2115;
                this.match(Stage9Parser.LPAREN);
                this.state = 2116;
                this.match(Stage9Parser.DOT);
                this.state = 2117;
                this.expression();
                this.state = 2118;
                this.match(Stage9Parser.LBRACK);
                this.state = 2119;
                this.expression();
                this.state = 2120;
                this.match(Stage9Parser.RBRACK);
                this.state = 2121;
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
        this.enterRule(localContext, 314, Stage9Parser.RULE_subscriptAccess);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2125;
            this.match(Stage9Parser.LPAREN);
            this.state = 2126;
            this.match(Stage9Parser.SUBSCRIPT);
            this.state = 2127;
            this.expression();
            this.state = 2128;
            this.match(Stage9Parser.STRING);
            this.state = 2129;
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
        this.enterRule(localContext, 316, Stage9Parser.RULE_indexAccess);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2131;
            this.match(Stage9Parser.LPAREN);
            this.state = 2132;
            this.match(Stage9Parser.INDEX);
            this.state = 2133;
            this.expression();
            this.state = 2134;
            this.expression();
            this.state = 2135;
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
        this.enterRule(localContext, 318, Stage9Parser.RULE_quasiquote);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2137;
            this.match(Stage9Parser.LPAREN);
            this.state = 2138;
            _la = this.tokenStream.LA(1);
            if(!(_la === 43 || _la === 44)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 2139;
            this.quasiForm();
            this.state = 2140;
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
        this.enterRule(localContext, 320, Stage9Parser.RULE_quasiForm);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2142;
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
        this.enterRule(localContext, 322, Stage9Parser.RULE_sForm);
        let _la: number;
        try {
            this.state = 2167;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 171, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 2144;
                this.match(Stage9Parser.LPAREN);
                this.state = 2145;
                this.match(Stage9Parser.UNQUOTE);
                this.state = 2146;
                this.expression();
                this.state = 2147;
                this.match(Stage9Parser.RPAREN);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 2149;
                this.match(Stage9Parser.LPAREN);
                this.state = 2150;
                this.match(Stage9Parser.UNQUOTE_SPLICING);
                this.state = 2151;
                this.expression();
                this.state = 2152;
                this.match(Stage9Parser.RPAREN);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 2154;
                this.match(Stage9Parser.TILDE);
                this.state = 2155;
                this.expression();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 2156;
                this.match(Stage9Parser.TILDE_AT);
                this.state = 2157;
                this.expression();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 2158;
                this.match(Stage9Parser.LPAREN);
                this.state = 2162;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4294967286) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 4294967295) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 4294967295) !== 0) || ((((_la - 96)) & ~0x1F) === 0 && ((1 << (_la - 96)) & 4294967295) !== 0) || ((((_la - 128)) & ~0x1F) === 0 && ((1 << (_la - 128)) & 4294967295) !== 0) || ((((_la - 160)) & ~0x1F) === 0 && ((1 << (_la - 160)) & 32767) !== 0)) {
                    {
                    {
                    this.state = 2159;
                    this.sForm();
                    }
                    }
                    this.state = 2164;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 2165;
                this.match(Stage9Parser.RPAREN);
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 2166;
                _la = this.tokenStream.LA(1);
                if(_la<=0 || _la === 2 || _la === 3 || _la === 171 || _la === 172) {
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
        this.enterRule(localContext, 324, Stage9Parser.RULE_unquote);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2169;
            this.match(Stage9Parser.LPAREN);
            this.state = 2170;
            this.match(Stage9Parser.UNQUOTE);
            this.state = 2171;
            this.expression();
            this.state = 2172;
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
        this.enterRule(localContext, 326, Stage9Parser.RULE_unquoteSplicing);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2174;
            this.match(Stage9Parser.LPAREN);
            this.state = 2175;
            this.match(Stage9Parser.UNQUOTE_SPLICING);
            this.state = 2176;
            this.expression();
            this.state = 2177;
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
        this.enterRule(localContext, 328, Stage9Parser.RULE_tildeUnquote);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2179;
            this.match(Stage9Parser.TILDE);
            this.state = 2180;
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
        this.enterRule(localContext, 330, Stage9Parser.RULE_tildeUnquoteSplice);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2182;
            this.match(Stage9Parser.TILDE_AT);
            this.state = 2183;
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
        this.enterRule(localContext, 332, Stage9Parser.RULE_optChain);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2185;
            this.match(Stage9Parser.LPAREN);
            this.state = 2186;
            this.match(Stage9Parser.OPTCHAIN);
            this.state = 2187;
            this.expression();
            this.state = 2188;
            this.propKey();
            this.state = 2189;
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
        this.enterRule(localContext, 334, Stage9Parser.RULE_optChainIndex);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2191;
            this.match(Stage9Parser.LPAREN);
            this.state = 2192;
            this.match(Stage9Parser.OPTCHAIN_INDEX);
            this.state = 2193;
            this.expression();
            this.state = 2194;
            this.expression();
            this.state = 2195;
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
        this.enterRule(localContext, 336, Stage9Parser.RULE_nullCoalesce);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2197;
            this.match(Stage9Parser.LPAREN);
            this.state = 2198;
            this.match(Stage9Parser.NULLCOAL);
            this.state = 2199;
            this.expression();
            this.state = 2200;
            this.expression();
            this.state = 2201;
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
        this.enterRule(localContext, 338, Stage9Parser.RULE_infixExpr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2203;
            this.match(Stage9Parser.HASH_LBRACE);
            this.state = 2204;
            this.infixBody();
            this.state = 2205;
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
        this.enterRule(localContext, 340, Stage9Parser.RULE_infixBody);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2207;
            this.infixAtom(0);
            this.state = 2213;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 42 || ((((_la - 115)) & ~0x1F) === 0 && ((1 << (_la - 115)) & 3758354433) !== 0) || ((((_la - 147)) & ~0x1F) === 0 && ((1 << (_la - 147)) & 8389055) !== 0)) {
                {
                {
                this.state = 2208;
                this.infixBinOp();
                this.state = 2209;
                this.infixAtom(0);
                }
                }
                this.state = 2215;
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
        let _startState = 342;
        this.enterRecursionRule(localContext, 342, Stage9Parser.RULE_infixAtom, _p);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2232;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 174, this.context) ) {
            case 1:
                {
                this.state = 2217;
                this.match(Stage9Parser.IDENTIFIER);
                this.state = 2218;
                this.match(Stage9Parser.LPAREN);
                this.state = 2220;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (((((_la - 100)) & ~0x1F) === 0 && ((1 << (_la - 100)) & 7) !== 0) || ((((_la - 141)) & ~0x1F) === 0 && ((1 << (_la - 141)) & 3053457409) !== 0) || _la === 173) {
                    {
                    this.state = 2219;
                    this.infixArgs();
                    }
                }

                this.state = 2222;
                this.match(Stage9Parser.RPAREN);
                }
                break;
            case 2:
                {
                this.state = 2223;
                this.match(Stage9Parser.LBRACE);
                this.state = 2224;
                this.infixBody();
                this.state = 2225;
                this.match(Stage9Parser.RBRACE);
                }
                break;
            case 3:
                {
                this.state = 2227;
                this.infixUnaryOp();
                this.state = 2228;
                this.infixAtom(3);
                }
                break;
            case 4:
                {
                this.state = 2230;
                this.literal();
                }
                break;
            case 5:
                {
                this.state = 2231;
                this.match(Stage9Parser.IDENTIFIER);
                }
                break;
            }
            this.context!.stop = this.tokenStream.LT(-1);
            this.state = 2242;
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
                    this.pushNewRecursionContext(localContext, _startState, Stage9Parser.RULE_infixAtom);
                    this.state = 2234;
                    if (!(this.precpred(this.context, 5))) {
                        throw this.createFailedPredicateException("this.precpred(this.context, 5)");
                    }
                    this.state = 2235;
                    this.match(Stage9Parser.LPAREN);
                    this.state = 2237;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    if (((((_la - 100)) & ~0x1F) === 0 && ((1 << (_la - 100)) & 7) !== 0) || ((((_la - 141)) & ~0x1F) === 0 && ((1 << (_la - 141)) & 3053457409) !== 0) || _la === 173) {
                        {
                        this.state = 2236;
                        this.infixArgs();
                        }
                    }

                    this.state = 2239;
                    this.match(Stage9Parser.RPAREN);
                    }
                    }
                }
                this.state = 2244;
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
        this.enterRule(localContext, 344, Stage9Parser.RULE_infixArgs);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2245;
            this.infixBody();
            this.state = 2250;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 4) {
                {
                {
                this.state = 2246;
                this.match(Stage9Parser.COMMA);
                this.state = 2247;
                this.infixBody();
                }
                }
                this.state = 2252;
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
        this.enterRule(localContext, 346, Stage9Parser.RULE_infixUnaryOp);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2253;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 153)) & ~0x1F) === 0 && ((1 << (_la - 153)) & 655361) !== 0))) {
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
        this.enterRule(localContext, 348, Stage9Parser.RULE_infixBinOp);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2255;
            _la = this.tokenStream.LA(1);
            if(!(_la === 42 || ((((_la - 115)) & ~0x1F) === 0 && ((1 << (_la - 115)) & 3758354433) !== 0) || ((((_la - 147)) & ~0x1F) === 0 && ((1 << (_la - 147)) & 8389055) !== 0))) {
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
        this.enterRule(localContext, 350, Stage9Parser.RULE_macroExprCall);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2257;
            this.match(Stage9Parser.LPAREN);
            this.state = 2258;
            this.match(Stage9Parser.IDENTIFIER);
            this.state = 2262;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 100)) & ~0x1F) === 0 && ((1 << (_la - 100)) & 4194336775) !== 0) || ((((_la - 132)) & ~0x1F) === 0 && ((1 << (_la - 132)) & 16775937) !== 0) || ((((_la - 166)) & ~0x1F) === 0 && ((1 << (_la - 166)) & 251) !== 0)) {
                {
                {
                this.state = 2259;
                this.expression();
                }
                }
                this.state = 2264;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 2265;
            this.match(Stage9Parser.FAT_ARROW);
            this.state = 2269;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 100)) & ~0x1F) === 0 && ((1 << (_la - 100)) & 4194336775) !== 0) || ((((_la - 132)) & ~0x1F) === 0 && ((1 << (_la - 132)) & 16775937) !== 0) || ((((_la - 166)) & ~0x1F) === 0 && ((1 << (_la - 166)) & 251) !== 0)) {
                {
                {
                this.state = 2266;
                this.statement();
                }
                }
                this.state = 2271;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 2272;
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
        this.enterRule(localContext, 352, Stage9Parser.RULE_macroBodyCall);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2274;
            this.match(Stage9Parser.LPAREN);
            this.state = 2275;
            this.match(Stage9Parser.IDENTIFIER);
            this.state = 2279;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 100)) & ~0x1F) === 0 && ((1 << (_la - 100)) & 4194336775) !== 0) || ((((_la - 132)) & ~0x1F) === 0 && ((1 << (_la - 132)) & 16775937) !== 0) || ((((_la - 166)) & ~0x1F) === 0 && ((1 << (_la - 166)) & 251) !== 0)) {
                {
                {
                this.state = 2276;
                this.expression();
                }
                }
                this.state = 2281;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 2282;
            this.match(Stage9Parser.STMT_ARROW);
            this.state = 2286;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 100)) & ~0x1F) === 0 && ((1 << (_la - 100)) & 4194336775) !== 0) || ((((_la - 132)) & ~0x1F) === 0 && ((1 << (_la - 132)) & 16775937) !== 0) || ((((_la - 166)) & ~0x1F) === 0 && ((1 << (_la - 166)) & 251) !== 0)) {
                {
                {
                this.state = 2283;
                this.statement();
                }
                }
                this.state = 2288;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 2289;
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
        this.enterRule(localContext, 354, Stage9Parser.RULE_call);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2291;
            this.match(Stage9Parser.LPAREN);
            this.state = 2292;
            this.expression();
            this.state = 2294;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 182, this.context) ) {
            case 1:
                {
                this.state = 2293;
                this.typeArgs();
                }
                break;
            }
            this.state = 2299;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2 || _la === 23 || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 402653185) !== 0) || ((((_la - 100)) & ~0x1F) === 0 && ((1 << (_la - 100)) & 4194336775) !== 0) || ((((_la - 132)) & ~0x1F) === 0 && ((1 << (_la - 132)) & 16775937) !== 0) || ((((_la - 166)) & ~0x1F) === 0 && ((1 << (_la - 166)) & 251) !== 0)) {
                {
                {
                this.state = 2296;
                this.expression();
                }
                }
                this.state = 2301;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 2302;
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
        this.enterRule(localContext, 356, Stage9Parser.RULE_typeArgs);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2304;
            this.match(Stage9Parser.LPAREN);
            this.state = 2305;
            this.match(Stage9Parser.TYPE_ARGS);
            this.state = 2307;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 2306;
                this.typeExpr();
                }
                }
                this.state = 2309;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 2 || _la === 34 || _la === 101 || _la === 102 || _la === 141 || _la === 173);
            this.state = 2311;
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
        this.enterRule(localContext, 358, Stage9Parser.RULE_fnSignature);
        let _la: number;
        try {
            let alternative: number;
            this.state = 2344;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 192, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 2313;
                this.match(Stage9Parser.LPAREN);
                this.state = 2330;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 2) {
                    {
                    this.state = 2314;
                    this.param();
                    this.state = 2321;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 186, this.context);
                    while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                        if (alternative === 1) {
                            {
                            {
                            this.state = 2316;
                            this.errorHandler.sync(this);
                            _la = this.tokenStream.LA(1);
                            if (_la === 4) {
                                {
                                this.state = 2315;
                                this.match(Stage9Parser.COMMA);
                                }
                            }

                            this.state = 2318;
                            this.param();
                            }
                            }
                        }
                        this.state = 2323;
                        this.errorHandler.sync(this);
                        alternative = this.interpreter.adaptivePredict(this.tokenStream, 186, this.context);
                    }
                    this.state = 2328;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    if (_la === 2 || _la === 4) {
                        {
                        this.state = 2325;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                        if (_la === 4) {
                            {
                            this.state = 2324;
                            this.match(Stage9Parser.COMMA);
                            }
                        }

                        this.state = 2327;
                        this.restParam();
                        }
                    }

                    }
                }

                this.state = 2332;
                this.match(Stage9Parser.RPAREN);
                this.state = 2335;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 103) {
                    {
                    this.state = 2333;
                    this.match(Stage9Parser.COLON);
                    this.state = 2334;
                    this.typeExpr();
                    }
                }

                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 2337;
                this.match(Stage9Parser.LPAREN);
                this.state = 2338;
                this.restParam();
                this.state = 2339;
                this.match(Stage9Parser.RPAREN);
                this.state = 2342;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 103) {
                    {
                    this.state = 2340;
                    this.match(Stage9Parser.COLON);
                    this.state = 2341;
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
        this.enterRule(localContext, 360, Stage9Parser.RULE_param);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2346;
            this.match(Stage9Parser.LPAREN);
            this.state = 2347;
            this.match(Stage9Parser.IDENTIFIER);
            this.state = 2349;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 99) {
                {
                this.state = 2348;
                this.match(Stage9Parser.OPTIONAL);
                }
            }

            this.state = 2353;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 103) {
                {
                this.state = 2351;
                this.match(Stage9Parser.COLON);
                this.state = 2352;
                this.typeExpr();
                }
            }

            this.state = 2355;
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
        this.enterRule(localContext, 362, Stage9Parser.RULE_restParam);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2357;
            this.match(Stage9Parser.LPAREN);
            this.state = 2358;
            this.match(Stage9Parser.REST);
            this.state = 2359;
            this.match(Stage9Parser.IDENTIFIER);
            this.state = 2362;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 103) {
                {
                this.state = 2360;
                this.match(Stage9Parser.COLON);
                this.state = 2361;
                this.typeExpr();
                }
            }

            this.state = 2364;
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
        this.enterRule(localContext, 364, Stage9Parser.RULE_literal);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 2366;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 100)) & ~0x1F) === 0 && ((1 << (_la - 100)) & 7) !== 0) || ((((_la - 166)) & ~0x1F) === 0 && ((1 << (_la - 166)) & 11) !== 0))) {
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
        case 171:
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
        4,1,174,2369,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,
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
        2,181,7,181,2,182,7,182,1,0,1,0,1,0,5,0,370,8,0,10,0,12,0,373,9,
        0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,3,1,394,8,1,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,3,2,404,
        8,2,1,3,1,3,1,3,1,3,1,3,5,3,411,8,3,10,3,12,3,414,9,3,1,3,1,3,1,
        4,1,4,5,4,420,8,4,10,4,12,4,423,9,4,1,4,1,4,3,4,427,8,4,3,4,429,
        8,4,1,4,1,4,1,5,1,5,1,5,1,5,1,5,1,5,1,5,1,5,1,5,1,5,3,5,443,8,5,
        1,6,1,6,1,6,1,6,1,6,1,6,1,7,1,7,1,7,4,7,454,8,7,11,7,12,7,455,1,
        7,1,7,1,8,1,8,1,9,1,9,1,9,1,9,5,9,466,8,9,10,9,12,9,469,9,9,1,9,
        1,9,1,10,1,10,1,10,5,10,476,8,10,10,10,12,10,479,9,10,1,10,1,10,
        4,10,483,8,10,11,10,12,10,484,1,10,1,10,1,10,1,11,1,11,1,11,5,11,
        493,8,11,10,11,12,11,496,9,11,1,11,1,11,4,11,500,8,11,11,11,12,11,
        501,1,11,1,11,1,11,1,12,1,12,1,12,5,12,510,8,12,10,12,12,12,513,
        9,12,1,12,1,12,1,12,1,12,1,13,1,13,1,13,1,14,1,14,1,14,1,14,3,14,
        526,8,14,1,14,1,14,1,14,1,15,1,15,1,15,1,15,3,15,535,8,15,1,15,3,
        15,538,8,15,1,15,1,15,1,15,1,16,1,16,1,16,4,16,546,8,16,11,16,12,
        16,547,1,16,1,16,1,17,1,17,1,17,1,17,5,17,556,8,17,10,17,12,17,559,
        9,17,1,17,1,17,1,18,1,18,1,18,3,18,566,8,18,1,18,1,18,1,19,1,19,
        1,19,1,19,4,19,574,8,19,11,19,12,19,575,1,19,3,19,579,8,19,1,19,
        1,19,1,20,1,20,1,20,1,20,5,20,587,8,20,10,20,12,20,590,9,20,1,20,
        1,20,1,20,1,20,1,20,5,20,597,8,20,10,20,12,20,600,9,20,1,20,3,20,
        603,8,20,1,21,1,21,1,21,5,21,608,8,21,10,21,12,21,611,9,21,1,21,
        1,21,3,21,615,8,21,1,21,3,21,618,8,21,1,21,3,21,621,8,21,1,21,1,
        21,1,21,1,22,1,22,1,22,5,22,629,8,22,10,22,12,22,632,9,22,1,22,3,
        22,635,8,22,1,22,3,22,638,8,22,1,22,1,22,1,22,1,23,1,23,1,23,1,23,
        1,23,1,24,1,24,1,24,4,24,651,8,24,11,24,12,24,652,1,24,1,24,1,25,
        1,25,1,25,5,25,660,8,25,10,25,12,25,663,9,25,1,25,1,25,1,26,1,26,
        1,26,1,26,1,26,1,26,1,26,1,26,1,26,3,26,676,8,26,1,27,1,27,1,28,
        1,28,1,28,5,28,683,8,28,10,28,12,28,686,9,28,1,28,1,28,1,28,1,28,
        3,28,692,8,28,1,28,1,28,3,28,696,8,28,1,28,1,28,1,29,1,29,5,29,702,
        8,29,10,29,12,29,705,9,29,1,29,1,29,3,29,709,8,29,1,29,1,29,3,29,
        713,8,29,1,29,1,29,1,30,1,30,1,30,3,30,720,8,30,1,30,5,30,723,8,
        30,10,30,12,30,726,9,30,3,30,728,8,30,1,30,1,30,1,30,3,30,733,8,
        30,1,31,1,31,1,31,1,31,5,31,739,8,31,10,31,12,31,742,9,31,1,31,1,
        31,1,32,1,32,1,32,5,32,749,8,32,10,32,12,32,752,9,32,1,32,1,32,1,
        32,5,32,757,8,32,10,32,12,32,760,9,32,1,32,1,32,1,33,1,33,1,33,5,
        33,767,8,33,10,33,12,33,770,9,33,1,33,1,33,1,33,1,33,1,34,1,34,1,
        34,5,34,779,8,34,10,34,12,34,782,9,34,1,34,1,34,1,34,5,34,787,8,
        34,10,34,12,34,790,9,34,1,34,1,34,1,35,1,35,1,35,5,35,797,8,35,10,
        35,12,35,800,9,35,1,35,1,35,1,35,5,35,805,8,35,10,35,12,35,808,9,
        35,1,35,1,35,1,36,1,36,1,36,1,36,1,36,1,36,1,36,3,36,819,8,36,1,
        37,1,37,1,37,1,37,1,37,1,37,1,37,1,37,1,37,1,37,1,37,1,37,1,37,1,
        37,1,37,1,37,1,37,1,37,1,37,1,37,1,37,1,37,1,37,1,37,3,37,845,8,
        37,1,38,1,38,1,38,1,38,4,38,851,8,38,11,38,12,38,852,1,38,1,38,5,
        38,857,8,38,10,38,12,38,860,9,38,1,38,1,38,1,39,1,39,1,39,1,39,4,
        39,868,8,39,11,39,12,39,869,1,39,1,39,5,39,874,8,39,10,39,12,39,
        877,9,39,1,39,1,39,1,40,1,40,1,40,1,40,5,40,885,8,40,10,40,12,40,
        888,9,40,1,40,1,40,5,40,892,8,40,10,40,12,40,895,9,40,1,40,1,40,
        1,41,1,41,1,41,1,41,1,41,1,41,1,42,1,42,1,42,1,42,1,42,3,42,910,
        8,42,1,42,1,42,1,43,1,43,1,43,5,43,917,8,43,10,43,12,43,920,9,43,
        1,43,1,43,1,44,1,44,1,44,5,44,927,8,44,10,44,12,44,930,9,44,1,44,
        1,44,1,45,1,45,1,45,1,45,5,45,938,8,45,10,45,12,45,941,9,45,1,45,
        1,45,1,46,1,46,1,46,3,46,948,8,46,1,46,1,46,1,47,1,47,1,47,1,47,
        1,47,1,48,1,48,1,48,1,48,1,49,1,49,1,49,1,49,1,50,1,50,1,50,3,50,
        968,8,50,1,50,1,50,1,50,1,50,1,50,1,50,1,50,1,50,1,50,1,50,1,50,
        1,50,1,50,1,50,1,50,1,50,1,50,1,50,1,50,1,50,1,50,1,50,1,50,1,50,
        1,50,1,50,1,50,3,50,997,8,50,1,51,1,51,1,51,1,51,1,51,1,51,1,52,
        1,52,1,52,4,52,1008,8,52,11,52,12,52,1009,1,52,1,52,1,53,1,53,1,
        53,1,53,1,53,3,53,1019,8,53,1,54,1,54,1,54,1,54,1,54,1,54,1,54,1,
        54,1,54,3,54,1030,8,54,1,55,1,55,1,55,1,55,1,55,1,55,1,56,1,56,1,
        56,1,56,1,56,1,56,1,56,1,56,1,56,1,56,1,56,1,56,1,56,1,56,1,56,1,
        56,1,56,1,56,1,56,1,56,1,56,1,56,1,56,1,56,1,56,3,56,1063,8,56,1,
        57,1,57,1,57,4,57,1068,8,57,11,57,12,57,1069,1,57,1,57,1,58,1,58,
        1,58,3,58,1077,8,58,1,58,1,58,1,59,1,59,1,59,1,59,4,59,1085,8,59,
        11,59,12,59,1086,1,59,1,59,1,60,1,60,1,60,1,60,1,60,1,61,1,61,1,
        61,1,61,1,61,1,61,1,62,1,62,1,62,4,62,1105,8,62,11,62,12,62,1106,
        1,62,1,62,1,63,1,63,1,63,1,63,4,63,1115,8,63,11,63,12,63,1116,1,
        63,1,63,1,64,1,64,1,64,1,64,1,64,1,65,1,65,1,65,1,65,1,65,1,66,1,
        66,1,66,1,66,3,66,1135,8,66,1,66,1,66,1,66,1,67,1,67,1,67,1,67,3,
        67,1144,8,67,1,67,1,67,1,67,3,67,1149,8,67,1,68,1,68,5,68,1153,8,
        68,10,68,12,68,1156,9,68,1,68,1,68,1,69,1,69,5,69,1162,8,69,10,69,
        12,69,1165,9,69,1,69,1,69,1,70,1,70,1,70,1,70,1,70,1,70,1,70,1,70,
        1,70,1,70,1,70,1,70,1,70,1,70,1,70,1,70,1,70,1,70,1,70,1,70,1,70,
        3,70,1190,8,70,1,71,1,71,1,71,4,71,1195,8,71,11,71,12,71,1196,1,
        71,1,71,1,72,1,72,1,72,4,72,1204,8,72,11,72,12,72,1205,1,72,1,72,
        1,73,1,73,1,73,1,73,1,73,1,74,1,74,1,74,4,74,1218,8,74,11,74,12,
        74,1219,1,74,1,74,1,75,1,75,1,75,1,75,1,75,1,75,1,75,1,75,1,75,1,
        75,1,75,3,75,1235,8,75,1,76,1,76,1,76,3,76,1240,8,76,1,76,1,76,5,
        76,1244,8,76,10,76,12,76,1247,9,76,1,76,1,76,1,76,1,76,1,77,1,77,
        1,77,3,77,1256,8,77,1,77,1,77,1,77,1,78,1,78,1,78,5,78,1264,8,78,
        10,78,12,78,1267,9,78,1,78,1,78,1,79,1,79,5,79,1273,8,79,10,79,12,
        79,1276,9,79,1,79,1,79,3,79,1280,8,79,1,79,1,79,1,79,1,80,1,80,1,
        81,1,81,1,81,1,81,1,81,1,82,1,82,1,82,1,82,1,82,1,83,1,83,1,83,1,
        83,1,83,1,84,1,84,1,84,1,84,1,84,1,84,1,85,1,85,1,85,1,85,1,85,1,
        85,1,85,1,85,1,86,1,86,1,86,1,86,1,86,1,87,1,87,1,87,1,87,1,87,3,
        87,1326,8,87,1,87,1,87,1,87,1,88,1,88,1,88,4,88,1334,8,88,11,88,
        12,88,1335,1,88,1,88,1,89,1,89,1,90,1,90,1,90,4,90,1345,8,90,11,
        90,12,90,1346,1,90,1,90,1,91,1,91,3,91,1353,8,91,1,92,1,92,1,92,
        1,92,4,92,1359,8,92,11,92,12,92,1360,1,92,1,92,1,93,1,93,1,93,4,
        93,1368,8,93,11,93,12,93,1369,1,93,1,93,1,94,1,94,1,94,3,94,1377,
        8,94,1,94,3,94,1380,8,94,1,94,1,94,1,95,1,95,1,95,1,95,1,95,1,96,
        1,96,1,96,1,96,1,96,1,97,1,97,1,97,1,97,1,97,1,97,1,97,1,97,1,97,
        1,97,1,97,1,97,1,97,1,97,1,97,1,97,1,97,1,97,3,97,1412,8,97,1,98,
        1,98,1,98,1,98,1,98,1,98,1,98,1,98,1,98,1,98,1,98,1,98,1,98,1,98,
        1,98,1,98,1,98,1,98,1,98,1,98,1,98,1,98,1,98,1,98,1,98,1,98,1,98,
        1,98,1,98,1,98,3,98,1444,8,98,1,99,1,99,1,99,1,99,1,99,1,99,1,99,
        1,99,1,99,1,100,1,100,1,100,1,100,5,100,1459,8,100,10,100,12,100,
        1462,9,100,1,100,3,100,1465,8,100,1,100,1,100,1,101,1,101,1,101,
        1,101,5,101,1473,8,101,10,101,12,101,1476,9,101,1,101,1,101,1,102,
        1,102,1,102,5,102,1483,8,102,10,102,12,102,1486,9,102,1,102,1,102,
        1,103,1,103,1,103,1,103,1,103,1,103,5,103,1496,8,103,10,103,12,103,
        1499,9,103,1,103,1,103,1,103,1,103,1,103,1,103,1,103,1,103,1,103,
        1,103,1,103,5,103,1512,8,103,10,103,12,103,1515,9,103,1,103,1,103,
        3,103,1519,8,103,1,104,1,104,1,104,1,104,1,104,5,104,1526,8,104,
        10,104,12,104,1529,9,104,1,104,1,104,1,105,1,105,1,105,1,105,1,105,
        5,105,1538,8,105,10,105,12,105,1541,9,105,1,105,1,105,1,106,1,106,
        1,106,1,106,1,106,5,106,1550,8,106,10,106,12,106,1553,9,106,1,106,
        1,106,1,107,1,107,1,107,1,107,3,107,1561,8,107,1,107,3,107,1564,
        8,107,1,107,1,107,1,108,1,108,1,108,5,108,1571,8,108,10,108,12,108,
        1574,9,108,1,108,1,108,1,109,1,109,1,109,1,109,5,109,1582,8,109,
        10,109,12,109,1585,9,109,1,109,1,109,1,110,1,110,1,110,5,110,1592,
        8,110,10,110,12,110,1595,9,110,1,110,1,110,1,111,1,111,1,111,1,111,
        1,111,1,111,1,111,1,111,1,111,1,111,1,111,1,111,1,111,1,111,1,111,
        1,111,1,111,1,111,1,111,1,111,1,111,1,111,1,111,1,111,1,111,1,111,
        1,111,1,111,1,111,1,111,1,111,1,111,1,111,1,111,1,111,1,111,1,111,
        1,111,1,111,1,111,1,111,1,111,1,111,1,111,1,111,1,111,1,111,1,111,
        1,111,1,111,3,111,1649,8,111,1,112,1,112,1,113,1,113,1,114,1,114,
        1,114,5,114,1658,8,114,10,114,12,114,1661,9,114,1,114,1,114,1,115,
        1,115,1,115,1,115,5,115,1669,8,115,10,115,12,115,1672,9,115,1,115,
        1,115,1,116,1,116,1,116,1,116,1,116,1,117,1,117,1,117,1,117,1,117,
        1,117,1,118,1,118,1,118,1,118,5,118,1691,8,118,10,118,12,118,1694,
        9,118,1,118,1,118,1,119,1,119,1,119,3,119,1701,8,119,1,119,1,119,
        5,119,1705,8,119,10,119,12,119,1708,9,119,1,119,1,119,1,120,1,120,
        1,120,1,120,5,120,1716,8,120,10,120,12,120,1719,9,120,1,120,1,120,
        1,121,1,121,1,121,1,121,5,121,1727,8,121,10,121,12,121,1730,9,121,
        1,121,1,121,1,122,1,122,1,122,1,122,5,122,1738,8,122,10,122,12,122,
        1741,9,122,1,122,1,122,1,123,1,123,1,123,1,123,5,123,1749,8,123,
        10,123,12,123,1752,9,123,1,123,1,123,1,124,1,124,1,124,3,124,1759,
        8,124,1,124,1,124,5,124,1763,8,124,10,124,12,124,1766,9,124,1,124,
        1,124,1,125,1,125,1,125,1,125,5,125,1774,8,125,10,125,12,125,1777,
        9,125,1,125,1,125,1,126,1,126,1,126,1,126,5,126,1785,8,126,10,126,
        12,126,1788,9,126,1,126,1,126,1,127,1,127,1,127,1,127,5,127,1796,
        8,127,10,127,12,127,1799,9,127,1,127,1,127,1,128,1,128,1,128,1,128,
        5,128,1807,8,128,10,128,12,128,1810,9,128,1,128,1,128,1,129,1,129,
        1,129,1,129,5,129,1818,8,129,10,129,12,129,1821,9,129,1,129,1,129,
        1,130,1,130,1,130,5,130,1828,8,130,10,130,12,130,1831,9,130,1,130,
        1,130,1,130,5,130,1836,8,130,10,130,12,130,1839,9,130,1,130,1,130,
        1,131,1,131,1,131,5,131,1846,8,131,10,131,12,131,1849,9,131,1,131,
        1,131,1,131,1,131,1,132,1,132,1,132,1,132,5,132,1859,8,132,10,132,
        12,132,1862,9,132,1,132,1,132,1,133,1,133,5,133,1868,8,133,10,133,
        12,133,1871,9,133,1,133,3,133,1874,8,133,1,133,1,133,1,133,3,133,
        1879,8,133,1,134,1,134,1,134,3,134,1884,8,134,1,134,1,134,3,134,
        1888,8,134,1,134,1,134,1,134,1,134,1,134,3,134,1895,8,134,1,134,
        1,134,1,135,1,135,1,135,1,135,1,135,3,135,1904,8,135,1,135,1,135,
        1,136,1,136,1,136,1,136,1,136,1,137,1,137,1,137,3,137,1916,8,137,
        1,137,1,137,1,138,1,138,1,138,1,138,1,138,1,139,1,139,1,139,1,139,
        1,139,5,139,1930,8,139,10,139,12,139,1933,9,139,1,139,1,139,1,140,
        1,140,1,140,1,140,1,140,5,140,1942,8,140,10,140,12,140,1945,9,140,
        1,140,1,140,1,141,1,141,1,141,1,141,1,141,1,141,1,141,1,142,1,142,
        1,142,4,142,1959,8,142,11,142,12,142,1960,1,142,3,142,1964,8,142,
        1,142,1,142,1,143,1,143,1,143,1,144,1,144,1,144,1,145,1,145,1,145,
        1,145,3,145,1978,8,145,1,145,5,145,1981,8,145,10,145,12,145,1984,
        9,145,1,145,1,145,1,146,1,146,1,146,5,146,1991,8,146,10,146,12,146,
        1994,9,146,1,146,1,146,1,147,1,147,1,147,1,147,1,147,1,147,1,147,
        1,147,1,147,1,147,1,147,1,147,1,147,1,147,1,147,1,147,1,147,1,147,
        1,147,1,147,1,147,1,147,1,147,1,147,1,147,1,147,1,147,3,147,2025,
        8,147,1,148,1,148,1,148,1,148,5,148,2031,8,148,10,148,12,148,2034,
        9,148,1,148,1,148,1,149,1,149,1,149,5,149,2041,8,149,10,149,12,149,
        2044,9,149,1,149,1,149,1,150,1,150,1,150,3,150,2051,8,150,1,150,
        5,150,2054,8,150,10,150,12,150,2057,9,150,1,150,3,150,2060,8,150,
        3,150,2062,8,150,1,150,1,150,1,151,1,151,1,151,3,151,2069,8,151,
        1,151,5,151,2072,8,151,10,151,12,151,2075,9,151,1,151,3,151,2078,
        8,151,3,151,2080,8,151,1,151,1,151,1,152,1,152,1,152,1,152,1,152,
        1,152,1,152,1,152,1,152,1,152,3,152,2094,8,152,1,153,1,153,1,153,
        1,153,4,153,2100,8,153,11,153,12,153,2101,1,153,1,153,1,154,1,154,
        1,155,1,155,1,156,1,156,1,156,1,156,1,156,1,156,1,156,1,156,1,156,
        1,156,1,156,1,156,1,156,1,156,3,156,2124,8,156,1,157,1,157,1,157,
        1,157,1,157,1,157,1,158,1,158,1,158,1,158,1,158,1,158,1,159,1,159,
        1,159,1,159,1,159,1,160,1,160,1,161,1,161,1,161,1,161,1,161,1,161,
        1,161,1,161,1,161,1,161,1,161,1,161,1,161,1,161,1,161,1,161,5,161,
        2161,8,161,10,161,12,161,2164,9,161,1,161,1,161,3,161,2168,8,161,
        1,162,1,162,1,162,1,162,1,162,1,163,1,163,1,163,1,163,1,163,1,164,
        1,164,1,164,1,165,1,165,1,165,1,166,1,166,1,166,1,166,1,166,1,166,
        1,167,1,167,1,167,1,167,1,167,1,167,1,168,1,168,1,168,1,168,1,168,
        1,168,1,169,1,169,1,169,1,169,1,170,1,170,1,170,1,170,5,170,2212,
        8,170,10,170,12,170,2215,9,170,1,171,1,171,1,171,1,171,3,171,2221,
        8,171,1,171,1,171,1,171,1,171,1,171,1,171,1,171,1,171,1,171,1,171,
        3,171,2233,8,171,1,171,1,171,1,171,3,171,2238,8,171,1,171,5,171,
        2241,8,171,10,171,12,171,2244,9,171,1,172,1,172,1,172,5,172,2249,
        8,172,10,172,12,172,2252,9,172,1,173,1,173,1,174,1,174,1,175,1,175,
        1,175,5,175,2261,8,175,10,175,12,175,2264,9,175,1,175,1,175,5,175,
        2268,8,175,10,175,12,175,2271,9,175,1,175,1,175,1,176,1,176,1,176,
        5,176,2278,8,176,10,176,12,176,2281,9,176,1,176,1,176,5,176,2285,
        8,176,10,176,12,176,2288,9,176,1,176,1,176,1,177,1,177,1,177,3,177,
        2295,8,177,1,177,5,177,2298,8,177,10,177,12,177,2301,9,177,1,177,
        1,177,1,178,1,178,1,178,4,178,2308,8,178,11,178,12,178,2309,1,178,
        1,178,1,179,1,179,1,179,3,179,2317,8,179,1,179,5,179,2320,8,179,
        10,179,12,179,2323,9,179,1,179,3,179,2326,8,179,1,179,3,179,2329,
        8,179,3,179,2331,8,179,1,179,1,179,1,179,3,179,2336,8,179,1,179,
        1,179,1,179,1,179,1,179,3,179,2343,8,179,3,179,2345,8,179,1,180,
        1,180,1,180,3,180,2350,8,180,1,180,1,180,3,180,2354,8,180,1,180,
        1,180,1,181,1,181,1,181,1,181,1,181,3,181,2363,8,181,1,181,1,181,
        1,182,1,182,1,182,0,1,342,183,0,2,4,6,8,10,12,14,16,18,20,22,24,
        26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,66,68,
        70,72,74,76,78,80,82,84,86,88,90,92,94,96,98,100,102,104,106,108,
        110,112,114,116,118,120,122,124,126,128,130,132,134,136,138,140,
        142,144,146,148,150,152,154,156,158,160,162,164,166,168,170,172,
        174,176,178,180,182,184,186,188,190,192,194,196,198,200,202,204,
        206,208,210,212,214,216,218,220,222,224,226,228,230,232,234,236,
        238,240,242,244,246,248,250,252,254,256,258,260,262,264,266,268,
        270,272,274,276,278,280,282,284,286,288,290,292,294,296,298,300,
        302,304,306,308,310,312,314,316,318,320,322,324,326,328,330,332,
        334,336,338,340,342,344,346,348,350,352,354,356,358,360,362,364,
        0,12,2,0,166,167,169,169,3,0,75,75,89,89,116,123,2,0,100,100,166,
        167,2,0,89,89,99,99,2,0,167,167,173,173,8,0,5,28,31,36,41,98,100,
        102,104,124,127,132,144,167,172,173,6,0,42,42,115,115,127,132,140,
        140,144,155,172,172,1,0,43,44,2,0,2,3,171,172,3,0,153,153,170,170,
        172,172,6,0,42,42,115,115,127,132,144,152,154,155,170,170,3,0,100,
        102,166,167,169,169,2529,0,366,1,0,0,0,2,393,1,0,0,0,4,403,1,0,0,
        0,6,405,1,0,0,0,8,417,1,0,0,0,10,442,1,0,0,0,12,444,1,0,0,0,14,450,
        1,0,0,0,16,459,1,0,0,0,18,461,1,0,0,0,20,472,1,0,0,0,22,489,1,0,
        0,0,24,506,1,0,0,0,26,518,1,0,0,0,28,521,1,0,0,0,30,530,1,0,0,0,
        32,542,1,0,0,0,34,551,1,0,0,0,36,562,1,0,0,0,38,569,1,0,0,0,40,602,
        1,0,0,0,42,604,1,0,0,0,44,625,1,0,0,0,46,642,1,0,0,0,48,647,1,0,
        0,0,50,656,1,0,0,0,52,675,1,0,0,0,54,677,1,0,0,0,56,679,1,0,0,0,
        58,699,1,0,0,0,60,716,1,0,0,0,62,734,1,0,0,0,64,745,1,0,0,0,66,763,
        1,0,0,0,68,775,1,0,0,0,70,793,1,0,0,0,72,818,1,0,0,0,74,844,1,0,
        0,0,76,846,1,0,0,0,78,863,1,0,0,0,80,880,1,0,0,0,82,898,1,0,0,0,
        84,904,1,0,0,0,86,913,1,0,0,0,88,923,1,0,0,0,90,933,1,0,0,0,92,944,
        1,0,0,0,94,951,1,0,0,0,96,956,1,0,0,0,98,960,1,0,0,0,100,996,1,0,
        0,0,102,998,1,0,0,0,104,1004,1,0,0,0,106,1018,1,0,0,0,108,1029,1,
        0,0,0,110,1031,1,0,0,0,112,1062,1,0,0,0,114,1064,1,0,0,0,116,1073,
        1,0,0,0,118,1080,1,0,0,0,120,1090,1,0,0,0,122,1095,1,0,0,0,124,1101,
        1,0,0,0,126,1110,1,0,0,0,128,1120,1,0,0,0,130,1125,1,0,0,0,132,1130,
        1,0,0,0,134,1148,1,0,0,0,136,1150,1,0,0,0,138,1159,1,0,0,0,140,1189,
        1,0,0,0,142,1191,1,0,0,0,144,1200,1,0,0,0,146,1209,1,0,0,0,148,1214,
        1,0,0,0,150,1234,1,0,0,0,152,1236,1,0,0,0,154,1252,1,0,0,0,156,1260,
        1,0,0,0,158,1270,1,0,0,0,160,1284,1,0,0,0,162,1286,1,0,0,0,164,1291,
        1,0,0,0,166,1296,1,0,0,0,168,1301,1,0,0,0,170,1307,1,0,0,0,172,1315,
        1,0,0,0,174,1320,1,0,0,0,176,1330,1,0,0,0,178,1339,1,0,0,0,180,1341,
        1,0,0,0,182,1352,1,0,0,0,184,1354,1,0,0,0,186,1364,1,0,0,0,188,1373,
        1,0,0,0,190,1383,1,0,0,0,192,1388,1,0,0,0,194,1411,1,0,0,0,196,1443,
        1,0,0,0,198,1445,1,0,0,0,200,1454,1,0,0,0,202,1468,1,0,0,0,204,1479,
        1,0,0,0,206,1518,1,0,0,0,208,1520,1,0,0,0,210,1532,1,0,0,0,212,1544,
        1,0,0,0,214,1556,1,0,0,0,216,1567,1,0,0,0,218,1577,1,0,0,0,220,1588,
        1,0,0,0,222,1648,1,0,0,0,224,1650,1,0,0,0,226,1652,1,0,0,0,228,1654,
        1,0,0,0,230,1664,1,0,0,0,232,1675,1,0,0,0,234,1680,1,0,0,0,236,1686,
        1,0,0,0,238,1697,1,0,0,0,240,1711,1,0,0,0,242,1722,1,0,0,0,244,1733,
        1,0,0,0,246,1744,1,0,0,0,248,1755,1,0,0,0,250,1769,1,0,0,0,252,1780,
        1,0,0,0,254,1791,1,0,0,0,256,1802,1,0,0,0,258,1813,1,0,0,0,260,1824,
        1,0,0,0,262,1842,1,0,0,0,264,1854,1,0,0,0,266,1865,1,0,0,0,268,1880,
        1,0,0,0,270,1898,1,0,0,0,272,1907,1,0,0,0,274,1912,1,0,0,0,276,1919,
        1,0,0,0,278,1924,1,0,0,0,280,1936,1,0,0,0,282,1948,1,0,0,0,284,1955,
        1,0,0,0,286,1967,1,0,0,0,288,1970,1,0,0,0,290,1973,1,0,0,0,292,1987,
        1,0,0,0,294,2024,1,0,0,0,296,2026,1,0,0,0,298,2037,1,0,0,0,300,2047,
        1,0,0,0,302,2065,1,0,0,0,304,2093,1,0,0,0,306,2095,1,0,0,0,308,2105,
        1,0,0,0,310,2107,1,0,0,0,312,2123,1,0,0,0,314,2125,1,0,0,0,316,2131,
        1,0,0,0,318,2137,1,0,0,0,320,2142,1,0,0,0,322,2167,1,0,0,0,324,2169,
        1,0,0,0,326,2174,1,0,0,0,328,2179,1,0,0,0,330,2182,1,0,0,0,332,2185,
        1,0,0,0,334,2191,1,0,0,0,336,2197,1,0,0,0,338,2203,1,0,0,0,340,2207,
        1,0,0,0,342,2232,1,0,0,0,344,2245,1,0,0,0,346,2253,1,0,0,0,348,2255,
        1,0,0,0,350,2257,1,0,0,0,352,2274,1,0,0,0,354,2291,1,0,0,0,356,2304,
        1,0,0,0,358,2344,1,0,0,0,360,2346,1,0,0,0,362,2357,1,0,0,0,364,2366,
        1,0,0,0,366,367,5,2,0,0,367,371,5,8,0,0,368,370,3,2,1,0,369,368,
        1,0,0,0,370,373,1,0,0,0,371,369,1,0,0,0,371,372,1,0,0,0,372,374,
        1,0,0,0,373,371,1,0,0,0,374,375,5,3,0,0,375,1,1,0,0,0,376,394,3,
        6,3,0,377,394,3,10,5,0,378,394,3,12,6,0,379,394,3,14,7,0,380,394,
        3,18,9,0,381,394,3,20,10,0,382,394,3,22,11,0,383,394,3,24,12,0,384,
        394,3,238,119,0,385,394,3,248,124,0,386,394,3,28,14,0,387,394,3,
        30,15,0,388,394,3,34,17,0,389,394,3,42,21,0,390,394,3,38,19,0,391,
        394,3,130,65,0,392,394,3,74,37,0,393,376,1,0,0,0,393,377,1,0,0,0,
        393,378,1,0,0,0,393,379,1,0,0,0,393,380,1,0,0,0,393,381,1,0,0,0,
        393,382,1,0,0,0,393,383,1,0,0,0,393,384,1,0,0,0,393,385,1,0,0,0,
        393,386,1,0,0,0,393,387,1,0,0,0,393,388,1,0,0,0,393,389,1,0,0,0,
        393,390,1,0,0,0,393,391,1,0,0,0,393,392,1,0,0,0,394,3,1,0,0,0,395,
        404,3,20,10,0,396,404,3,22,11,0,397,404,3,24,12,0,398,404,3,238,
        119,0,399,404,3,42,21,0,400,404,3,30,15,0,401,404,3,34,17,0,402,
        404,3,28,14,0,403,395,1,0,0,0,403,396,1,0,0,0,403,397,1,0,0,0,403,
        398,1,0,0,0,403,399,1,0,0,0,403,400,1,0,0,0,403,401,1,0,0,0,403,
        402,1,0,0,0,404,5,1,0,0,0,405,406,5,2,0,0,406,407,5,21,0,0,407,408,
        5,173,0,0,408,412,3,8,4,0,409,411,3,74,37,0,410,409,1,0,0,0,411,
        414,1,0,0,0,412,410,1,0,0,0,412,413,1,0,0,0,413,415,1,0,0,0,414,
        412,1,0,0,0,415,416,5,3,0,0,416,7,1,0,0,0,417,428,5,2,0,0,418,420,
        5,173,0,0,419,418,1,0,0,0,420,423,1,0,0,0,421,419,1,0,0,0,421,422,
        1,0,0,0,422,426,1,0,0,0,423,421,1,0,0,0,424,425,5,88,0,0,425,427,
        5,173,0,0,426,424,1,0,0,0,426,427,1,0,0,0,427,429,1,0,0,0,428,421,
        1,0,0,0,428,429,1,0,0,0,429,430,1,0,0,0,430,431,5,3,0,0,431,9,1,
        0,0,0,432,433,5,2,0,0,433,434,5,22,0,0,434,435,3,20,10,0,435,436,
        5,3,0,0,436,443,1,0,0,0,437,438,5,2,0,0,438,439,5,22,0,0,439,440,
        3,24,12,0,440,441,5,3,0,0,441,443,1,0,0,0,442,432,1,0,0,0,442,437,
        1,0,0,0,443,11,1,0,0,0,444,445,5,2,0,0,445,446,5,5,0,0,446,447,5,
        173,0,0,447,448,5,167,0,0,448,449,5,3,0,0,449,13,1,0,0,0,450,451,
        5,2,0,0,451,453,5,6,0,0,452,454,3,16,8,0,453,452,1,0,0,0,454,455,
        1,0,0,0,455,453,1,0,0,0,455,456,1,0,0,0,456,457,1,0,0,0,457,458,
        5,3,0,0,458,15,1,0,0,0,459,460,5,173,0,0,460,17,1,0,0,0,461,462,
        5,2,0,0,462,463,5,7,0,0,463,467,5,173,0,0,464,466,5,173,0,0,465,
        464,1,0,0,0,466,469,1,0,0,0,467,465,1,0,0,0,467,468,1,0,0,0,468,
        470,1,0,0,0,469,467,1,0,0,0,470,471,5,3,0,0,471,19,1,0,0,0,472,473,
        5,2,0,0,473,477,5,9,0,0,474,476,3,26,13,0,475,474,1,0,0,0,476,479,
        1,0,0,0,477,475,1,0,0,0,477,478,1,0,0,0,478,480,1,0,0,0,479,477,
        1,0,0,0,480,482,5,2,0,0,481,483,3,132,66,0,482,481,1,0,0,0,483,484,
        1,0,0,0,484,482,1,0,0,0,484,485,1,0,0,0,485,486,1,0,0,0,486,487,
        5,3,0,0,487,488,5,3,0,0,488,21,1,0,0,0,489,490,5,2,0,0,490,494,5,
        10,0,0,491,493,3,26,13,0,492,491,1,0,0,0,493,496,1,0,0,0,494,492,
        1,0,0,0,494,495,1,0,0,0,495,497,1,0,0,0,496,494,1,0,0,0,497,499,
        5,2,0,0,498,500,3,132,66,0,499,498,1,0,0,0,500,501,1,0,0,0,501,499,
        1,0,0,0,501,502,1,0,0,0,502,503,1,0,0,0,503,504,5,3,0,0,504,505,
        5,3,0,0,505,23,1,0,0,0,506,507,5,2,0,0,507,511,5,12,0,0,508,510,
        3,26,13,0,509,508,1,0,0,0,510,513,1,0,0,0,511,509,1,0,0,0,511,512,
        1,0,0,0,512,514,1,0,0,0,513,511,1,0,0,0,514,515,5,173,0,0,515,516,
        3,222,111,0,516,517,5,3,0,0,517,25,1,0,0,0,518,519,5,115,0,0,519,
        520,5,173,0,0,520,27,1,0,0,0,521,522,5,2,0,0,522,523,5,95,0,0,523,
        525,5,173,0,0,524,526,3,186,93,0,525,524,1,0,0,0,525,526,1,0,0,0,
        526,527,1,0,0,0,527,528,3,140,70,0,528,529,5,3,0,0,529,29,1,0,0,
        0,530,531,5,2,0,0,531,532,5,96,0,0,532,534,5,173,0,0,533,535,3,186,
        93,0,534,533,1,0,0,0,534,535,1,0,0,0,535,537,1,0,0,0,536,538,3,32,
        16,0,537,536,1,0,0,0,537,538,1,0,0,0,538,539,1,0,0,0,539,540,3,156,
        78,0,540,541,5,3,0,0,541,31,1,0,0,0,542,543,5,2,0,0,543,545,5,93,
        0,0,544,546,3,140,70,0,545,544,1,0,0,0,546,547,1,0,0,0,547,545,1,
        0,0,0,547,548,1,0,0,0,548,549,1,0,0,0,549,550,5,3,0,0,550,33,1,0,
        0,0,551,552,5,2,0,0,552,553,5,97,0,0,553,557,5,173,0,0,554,556,3,
        36,18,0,555,554,1,0,0,0,556,559,1,0,0,0,557,555,1,0,0,0,557,558,
        1,0,0,0,558,560,1,0,0,0,559,557,1,0,0,0,560,561,5,3,0,0,561,35,1,
        0,0,0,562,563,5,2,0,0,563,565,5,173,0,0,564,566,7,0,0,0,565,564,
        1,0,0,0,565,566,1,0,0,0,566,567,1,0,0,0,567,568,5,3,0,0,568,37,1,
        0,0,0,569,570,5,2,0,0,570,571,5,74,0,0,571,573,5,173,0,0,572,574,
        5,173,0,0,573,572,1,0,0,0,574,575,1,0,0,0,575,573,1,0,0,0,575,576,
        1,0,0,0,576,578,1,0,0,0,577,579,3,40,20,0,578,577,1,0,0,0,578,579,
        1,0,0,0,579,580,1,0,0,0,580,581,5,3,0,0,581,39,1,0,0,0,582,583,5,
        103,0,0,583,584,5,173,0,0,584,588,5,2,0,0,585,587,5,173,0,0,586,
        585,1,0,0,0,587,590,1,0,0,0,588,586,1,0,0,0,588,589,1,0,0,0,589,
        591,1,0,0,0,590,588,1,0,0,0,591,603,5,3,0,0,592,593,5,103,0,0,593,
        594,5,58,0,0,594,598,5,2,0,0,595,597,5,173,0,0,596,595,1,0,0,0,597,
        600,1,0,0,0,598,596,1,0,0,0,598,599,1,0,0,0,599,601,1,0,0,0,600,
        598,1,0,0,0,601,603,5,3,0,0,602,582,1,0,0,0,602,592,1,0,0,0,603,
        41,1,0,0,0,604,605,5,2,0,0,605,609,5,65,0,0,606,608,3,54,27,0,607,
        606,1,0,0,0,608,611,1,0,0,0,609,607,1,0,0,0,609,610,1,0,0,0,610,
        612,1,0,0,0,611,609,1,0,0,0,612,614,5,173,0,0,613,615,3,186,93,0,
        614,613,1,0,0,0,614,615,1,0,0,0,615,617,1,0,0,0,616,618,3,46,23,
        0,617,616,1,0,0,0,617,618,1,0,0,0,618,620,1,0,0,0,619,621,3,48,24,
        0,620,619,1,0,0,0,620,621,1,0,0,0,621,622,1,0,0,0,622,623,3,50,25,
        0,623,624,5,3,0,0,624,43,1,0,0,0,625,626,5,2,0,0,626,630,5,65,0,
        0,627,629,3,54,27,0,628,627,1,0,0,0,629,632,1,0,0,0,630,628,1,0,
        0,0,630,631,1,0,0,0,631,634,1,0,0,0,632,630,1,0,0,0,633,635,3,46,
        23,0,634,633,1,0,0,0,634,635,1,0,0,0,635,637,1,0,0,0,636,638,3,48,
        24,0,637,636,1,0,0,0,637,638,1,0,0,0,638,639,1,0,0,0,639,640,3,50,
        25,0,640,641,5,3,0,0,641,45,1,0,0,0,642,643,5,2,0,0,643,644,5,93,
        0,0,644,645,3,140,70,0,645,646,5,3,0,0,646,47,1,0,0,0,647,648,5,
        2,0,0,648,650,5,73,0,0,649,651,3,140,70,0,650,649,1,0,0,0,651,652,
        1,0,0,0,652,650,1,0,0,0,652,653,1,0,0,0,653,654,1,0,0,0,654,655,
        5,3,0,0,655,49,1,0,0,0,656,657,5,2,0,0,657,661,5,61,0,0,658,660,
        3,52,26,0,659,658,1,0,0,0,660,663,1,0,0,0,661,659,1,0,0,0,661,662,
        1,0,0,0,662,664,1,0,0,0,663,661,1,0,0,0,664,665,5,3,0,0,665,51,1,
        0,0,0,666,676,3,56,28,0,667,676,3,62,31,0,668,676,3,64,32,0,669,
        676,3,66,33,0,670,676,3,68,34,0,671,676,3,70,35,0,672,676,3,260,
        130,0,673,676,3,262,131,0,674,676,3,264,132,0,675,666,1,0,0,0,675,
        667,1,0,0,0,675,668,1,0,0,0,675,669,1,0,0,0,675,670,1,0,0,0,675,
        671,1,0,0,0,675,672,1,0,0,0,675,673,1,0,0,0,675,674,1,0,0,0,676,
        53,1,0,0,0,677,678,7,1,0,0,678,55,1,0,0,0,679,680,5,2,0,0,680,684,
        5,66,0,0,681,683,3,54,27,0,682,681,1,0,0,0,683,686,1,0,0,0,684,682,
        1,0,0,0,684,685,1,0,0,0,685,687,1,0,0,0,686,684,1,0,0,0,687,688,
        5,2,0,0,688,691,5,173,0,0,689,690,5,103,0,0,690,692,3,140,70,0,691,
        689,1,0,0,0,691,692,1,0,0,0,692,693,1,0,0,0,693,695,5,3,0,0,694,
        696,3,222,111,0,695,694,1,0,0,0,695,696,1,0,0,0,696,697,1,0,0,0,
        697,698,5,3,0,0,698,57,1,0,0,0,699,703,5,2,0,0,700,702,3,54,27,0,
        701,700,1,0,0,0,702,705,1,0,0,0,703,701,1,0,0,0,703,704,1,0,0,0,
        704,706,1,0,0,0,705,703,1,0,0,0,706,708,5,173,0,0,707,709,5,99,0,
        0,708,707,1,0,0,0,708,709,1,0,0,0,709,712,1,0,0,0,710,711,5,103,
        0,0,711,713,3,140,70,0,712,710,1,0,0,0,712,713,1,0,0,0,713,714,1,
        0,0,0,714,715,5,3,0,0,715,59,1,0,0,0,716,727,5,2,0,0,717,724,3,58,
        29,0,718,720,5,4,0,0,719,718,1,0,0,0,719,720,1,0,0,0,720,721,1,0,
        0,0,721,723,3,58,29,0,722,719,1,0,0,0,723,726,1,0,0,0,724,722,1,
        0,0,0,724,725,1,0,0,0,725,728,1,0,0,0,726,724,1,0,0,0,727,717,1,
        0,0,0,727,728,1,0,0,0,728,729,1,0,0,0,729,732,5,3,0,0,730,731,5,
        103,0,0,731,733,3,140,70,0,732,730,1,0,0,0,732,733,1,0,0,0,733,61,
        1,0,0,0,734,735,5,2,0,0,735,736,5,68,0,0,736,740,3,60,30,0,737,739,
        3,74,37,0,738,737,1,0,0,0,739,742,1,0,0,0,740,738,1,0,0,0,740,741,
        1,0,0,0,741,743,1,0,0,0,742,740,1,0,0,0,743,744,5,3,0,0,744,63,1,
        0,0,0,745,746,5,2,0,0,746,750,5,18,0,0,747,749,3,54,27,0,748,747,
        1,0,0,0,749,752,1,0,0,0,750,748,1,0,0,0,750,751,1,0,0,0,751,753,
        1,0,0,0,752,750,1,0,0,0,753,754,3,72,36,0,754,758,3,358,179,0,755,
        757,3,74,37,0,756,755,1,0,0,0,757,760,1,0,0,0,758,756,1,0,0,0,758,
        759,1,0,0,0,759,761,1,0,0,0,760,758,1,0,0,0,761,762,5,3,0,0,762,
        65,1,0,0,0,763,764,5,2,0,0,764,768,5,64,0,0,765,767,3,54,27,0,766,
        765,1,0,0,0,767,770,1,0,0,0,768,766,1,0,0,0,768,769,1,0,0,0,769,
        771,1,0,0,0,770,768,1,0,0,0,771,772,3,72,36,0,772,773,3,358,179,
        0,773,774,5,3,0,0,774,67,1,0,0,0,775,776,5,2,0,0,776,780,5,71,0,
        0,777,779,3,54,27,0,778,777,1,0,0,0,779,782,1,0,0,0,780,778,1,0,
        0,0,780,781,1,0,0,0,781,783,1,0,0,0,782,780,1,0,0,0,783,784,3,72,
        36,0,784,788,3,358,179,0,785,787,3,74,37,0,786,785,1,0,0,0,787,790,
        1,0,0,0,788,786,1,0,0,0,788,789,1,0,0,0,789,791,1,0,0,0,790,788,
        1,0,0,0,791,792,5,3,0,0,792,69,1,0,0,0,793,794,5,2,0,0,794,798,5,
        72,0,0,795,797,3,54,27,0,796,795,1,0,0,0,797,800,1,0,0,0,798,796,
        1,0,0,0,798,799,1,0,0,0,799,801,1,0,0,0,800,798,1,0,0,0,801,802,
        3,72,36,0,802,806,3,358,179,0,803,805,3,74,37,0,804,803,1,0,0,0,
        805,808,1,0,0,0,806,804,1,0,0,0,806,807,1,0,0,0,807,809,1,0,0,0,
        808,806,1,0,0,0,809,810,5,3,0,0,810,71,1,0,0,0,811,819,5,173,0,0,
        812,819,5,71,0,0,813,819,5,72,0,0,814,815,5,125,0,0,815,816,3,222,
        111,0,816,817,5,126,0,0,817,819,1,0,0,0,818,811,1,0,0,0,818,812,
        1,0,0,0,818,813,1,0,0,0,818,814,1,0,0,0,819,73,1,0,0,0,820,845,3,
        76,38,0,821,845,3,78,39,0,822,845,3,80,40,0,823,845,3,82,41,0,824,
        845,3,84,42,0,825,845,3,90,45,0,826,845,3,214,107,0,827,845,3,92,
        46,0,828,845,3,94,47,0,829,845,3,96,48,0,830,845,3,98,49,0,831,845,
        3,100,50,0,832,845,3,102,51,0,833,845,3,108,54,0,834,845,3,200,100,
        0,835,845,3,206,103,0,836,845,3,208,104,0,837,845,3,210,105,0,838,
        845,3,212,106,0,839,845,3,194,97,0,840,845,3,196,98,0,841,845,3,
        198,99,0,842,845,3,352,176,0,843,845,3,222,111,0,844,820,1,0,0,0,
        844,821,1,0,0,0,844,822,1,0,0,0,844,823,1,0,0,0,844,824,1,0,0,0,
        844,825,1,0,0,0,844,826,1,0,0,0,844,827,1,0,0,0,844,828,1,0,0,0,
        844,829,1,0,0,0,844,830,1,0,0,0,844,831,1,0,0,0,844,832,1,0,0,0,
        844,833,1,0,0,0,844,834,1,0,0,0,844,835,1,0,0,0,844,836,1,0,0,0,
        844,837,1,0,0,0,844,838,1,0,0,0,844,839,1,0,0,0,844,840,1,0,0,0,
        844,841,1,0,0,0,844,842,1,0,0,0,844,843,1,0,0,0,845,75,1,0,0,0,846,
        847,5,2,0,0,847,848,5,9,0,0,848,850,5,2,0,0,849,851,3,132,66,0,850,
        849,1,0,0,0,851,852,1,0,0,0,852,850,1,0,0,0,852,853,1,0,0,0,853,
        854,1,0,0,0,854,858,5,3,0,0,855,857,3,74,37,0,856,855,1,0,0,0,857,
        860,1,0,0,0,858,856,1,0,0,0,858,859,1,0,0,0,859,861,1,0,0,0,860,
        858,1,0,0,0,861,862,5,3,0,0,862,77,1,0,0,0,863,864,5,2,0,0,864,865,
        5,10,0,0,865,867,5,2,0,0,866,868,3,132,66,0,867,866,1,0,0,0,868,
        869,1,0,0,0,869,867,1,0,0,0,869,870,1,0,0,0,870,871,1,0,0,0,871,
        875,5,3,0,0,872,874,3,74,37,0,873,872,1,0,0,0,874,877,1,0,0,0,875,
        873,1,0,0,0,875,876,1,0,0,0,876,878,1,0,0,0,877,875,1,0,0,0,878,
        879,5,3,0,0,879,79,1,0,0,0,880,881,5,2,0,0,881,882,5,11,0,0,882,
        886,5,2,0,0,883,885,3,132,66,0,884,883,1,0,0,0,885,888,1,0,0,0,886,
        884,1,0,0,0,886,887,1,0,0,0,887,889,1,0,0,0,888,886,1,0,0,0,889,
        893,5,3,0,0,890,892,3,74,37,0,891,890,1,0,0,0,892,895,1,0,0,0,893,
        891,1,0,0,0,893,894,1,0,0,0,894,896,1,0,0,0,895,893,1,0,0,0,896,
        897,5,3,0,0,897,81,1,0,0,0,898,899,5,2,0,0,899,900,5,12,0,0,900,
        901,3,134,67,0,901,902,3,222,111,0,902,903,5,3,0,0,903,83,1,0,0,
        0,904,905,5,2,0,0,905,906,5,24,0,0,906,907,3,222,111,0,907,909,3,
        86,43,0,908,910,3,88,44,0,909,908,1,0,0,0,909,910,1,0,0,0,910,911,
        1,0,0,0,911,912,5,3,0,0,912,85,1,0,0,0,913,914,5,2,0,0,914,918,5,
        26,0,0,915,917,3,74,37,0,916,915,1,0,0,0,917,920,1,0,0,0,918,916,
        1,0,0,0,918,919,1,0,0,0,919,921,1,0,0,0,920,918,1,0,0,0,921,922,
        5,3,0,0,922,87,1,0,0,0,923,924,5,2,0,0,924,928,5,124,0,0,925,927,
        3,74,37,0,926,925,1,0,0,0,927,930,1,0,0,0,928,926,1,0,0,0,928,929,
        1,0,0,0,929,931,1,0,0,0,930,928,1,0,0,0,931,932,5,3,0,0,932,89,1,
        0,0,0,933,934,5,2,0,0,934,935,5,25,0,0,935,939,3,222,111,0,936,938,
        3,74,37,0,937,936,1,0,0,0,938,941,1,0,0,0,939,937,1,0,0,0,939,940,
        1,0,0,0,940,942,1,0,0,0,941,939,1,0,0,0,942,943,5,3,0,0,943,91,1,
        0,0,0,944,945,5,2,0,0,945,947,5,27,0,0,946,948,3,222,111,0,947,946,
        1,0,0,0,947,948,1,0,0,0,948,949,1,0,0,0,949,950,5,3,0,0,950,93,1,
        0,0,0,951,952,5,2,0,0,952,953,5,28,0,0,953,954,3,222,111,0,954,955,
        5,3,0,0,955,95,1,0,0,0,956,957,5,2,0,0,957,958,5,29,0,0,958,959,
        5,3,0,0,959,97,1,0,0,0,960,961,5,2,0,0,961,962,5,30,0,0,962,963,
        5,3,0,0,963,99,1,0,0,0,964,965,5,2,0,0,965,967,5,48,0,0,966,968,
        3,292,146,0,967,966,1,0,0,0,967,968,1,0,0,0,968,969,1,0,0,0,969,
        970,5,167,0,0,970,997,5,3,0,0,971,972,5,2,0,0,972,973,5,48,0,0,973,
        974,3,136,68,0,974,975,5,167,0,0,975,976,5,3,0,0,976,997,1,0,0,0,
        977,978,5,2,0,0,978,979,5,48,0,0,979,980,5,173,0,0,980,981,5,167,
        0,0,981,997,5,3,0,0,982,983,5,2,0,0,983,984,5,48,0,0,984,985,5,173,
        0,0,985,986,3,136,68,0,986,987,5,167,0,0,987,988,5,3,0,0,988,997,
        1,0,0,0,989,990,5,2,0,0,990,991,5,48,0,0,991,992,5,148,0,0,992,993,
        5,59,0,0,993,994,5,173,0,0,994,995,5,167,0,0,995,997,5,3,0,0,996,
        964,1,0,0,0,996,971,1,0,0,0,996,977,1,0,0,0,996,982,1,0,0,0,996,
        989,1,0,0,0,997,101,1,0,0,0,998,999,5,2,0,0,999,1000,5,162,0,0,1000,
        1001,3,104,52,0,1001,1002,5,167,0,0,1002,1003,5,3,0,0,1003,103,1,
        0,0,0,1004,1005,5,2,0,0,1005,1007,5,173,0,0,1006,1008,3,106,53,0,
        1007,1006,1,0,0,0,1008,1009,1,0,0,0,1009,1007,1,0,0,0,1009,1010,
        1,0,0,0,1010,1011,1,0,0,0,1011,1012,5,3,0,0,1012,105,1,0,0,0,1013,
        1019,5,173,0,0,1014,1015,5,2,0,0,1015,1016,5,173,0,0,1016,1017,5,
        173,0,0,1017,1019,5,3,0,0,1018,1013,1,0,0,0,1018,1014,1,0,0,0,1019,
        107,1,0,0,0,1020,1030,3,110,55,0,1021,1030,3,112,56,0,1022,1030,
        3,114,57,0,1023,1030,3,122,61,0,1024,1030,3,118,59,0,1025,1030,3,
        120,60,0,1026,1030,3,124,62,0,1027,1030,3,126,63,0,1028,1030,3,128,
        64,0,1029,1020,1,0,0,0,1029,1021,1,0,0,0,1029,1022,1,0,0,0,1029,
        1023,1,0,0,0,1029,1024,1,0,0,0,1029,1025,1,0,0,0,1029,1026,1,0,0,
        0,1029,1027,1,0,0,0,1029,1028,1,0,0,0,1030,109,1,0,0,0,1031,1032,
        5,2,0,0,1032,1033,5,156,0,0,1033,1034,5,173,0,0,1034,1035,3,222,
        111,0,1035,1036,5,3,0,0,1036,111,1,0,0,0,1037,1038,5,2,0,0,1038,
        1039,5,157,0,0,1039,1040,3,42,21,0,1040,1041,5,3,0,0,1041,1063,1,
        0,0,0,1042,1043,5,2,0,0,1043,1044,5,157,0,0,1044,1045,3,44,22,0,
        1045,1046,5,3,0,0,1046,1063,1,0,0,0,1047,1048,5,2,0,0,1048,1049,
        5,157,0,0,1049,1050,3,20,10,0,1050,1051,5,3,0,0,1051,1063,1,0,0,
        0,1052,1053,5,2,0,0,1053,1054,5,157,0,0,1054,1055,3,24,12,0,1055,
        1056,5,3,0,0,1056,1063,1,0,0,0,1057,1058,5,2,0,0,1058,1059,5,157,
        0,0,1059,1060,3,222,111,0,1060,1061,5,3,0,0,1061,1063,1,0,0,0,1062,
        1037,1,0,0,0,1062,1042,1,0,0,0,1062,1047,1,0,0,0,1062,1052,1,0,0,
        0,1062,1057,1,0,0,0,1063,113,1,0,0,0,1064,1065,5,2,0,0,1065,1067,
        5,158,0,0,1066,1068,3,116,58,0,1067,1066,1,0,0,0,1068,1069,1,0,0,
        0,1069,1067,1,0,0,0,1069,1070,1,0,0,0,1070,1071,1,0,0,0,1071,1072,
        5,3,0,0,1072,115,1,0,0,0,1073,1074,5,2,0,0,1074,1076,5,173,0,0,1075,
        1077,5,173,0,0,1076,1075,1,0,0,0,1076,1077,1,0,0,0,1077,1078,1,0,
        0,0,1078,1079,5,3,0,0,1079,117,1,0,0,0,1080,1081,5,2,0,0,1081,1082,
        5,160,0,0,1082,1084,5,167,0,0,1083,1085,3,116,58,0,1084,1083,1,0,
        0,0,1085,1086,1,0,0,0,1086,1084,1,0,0,0,1086,1087,1,0,0,0,1087,1088,
        1,0,0,0,1088,1089,5,3,0,0,1089,119,1,0,0,0,1090,1091,5,2,0,0,1091,
        1092,5,161,0,0,1092,1093,5,167,0,0,1093,1094,5,3,0,0,1094,121,1,
        0,0,0,1095,1096,5,2,0,0,1096,1097,5,159,0,0,1097,1098,5,167,0,0,
        1098,1099,5,167,0,0,1099,1100,5,3,0,0,1100,123,1,0,0,0,1101,1102,
        5,2,0,0,1102,1104,5,165,0,0,1103,1105,3,116,58,0,1104,1103,1,0,0,
        0,1105,1106,1,0,0,0,1106,1104,1,0,0,0,1106,1107,1,0,0,0,1107,1108,
        1,0,0,0,1108,1109,5,3,0,0,1109,125,1,0,0,0,1110,1111,5,2,0,0,1111,
        1112,5,164,0,0,1112,1114,5,167,0,0,1113,1115,3,116,58,0,1114,1113,
        1,0,0,0,1115,1116,1,0,0,0,1116,1114,1,0,0,0,1116,1117,1,0,0,0,1117,
        1118,1,0,0,0,1118,1119,5,3,0,0,1119,127,1,0,0,0,1120,1121,5,2,0,
        0,1121,1122,5,163,0,0,1122,1123,5,167,0,0,1123,1124,5,3,0,0,1124,
        129,1,0,0,0,1125,1126,5,2,0,0,1126,1127,5,156,0,0,1127,1128,3,4,
        2,0,1128,1129,5,3,0,0,1129,131,1,0,0,0,1130,1131,5,2,0,0,1131,1134,
        5,173,0,0,1132,1133,5,103,0,0,1133,1135,3,140,70,0,1134,1132,1,0,
        0,0,1134,1135,1,0,0,0,1135,1136,1,0,0,0,1136,1137,3,222,111,0,1137,
        1138,5,3,0,0,1138,133,1,0,0,0,1139,1140,5,2,0,0,1140,1143,5,173,
        0,0,1141,1142,5,103,0,0,1142,1144,3,140,70,0,1143,1141,1,0,0,0,1143,
        1144,1,0,0,0,1144,1145,1,0,0,0,1145,1149,5,3,0,0,1146,1149,3,136,
        68,0,1147,1149,3,138,69,0,1148,1139,1,0,0,0,1148,1146,1,0,0,0,1148,
        1147,1,0,0,0,1149,135,1,0,0,0,1150,1154,5,141,0,0,1151,1153,5,173,
        0,0,1152,1151,1,0,0,0,1153,1156,1,0,0,0,1154,1152,1,0,0,0,1154,1155,
        1,0,0,0,1155,1157,1,0,0,0,1156,1154,1,0,0,0,1157,1158,5,142,0,0,
        1158,137,1,0,0,0,1159,1163,5,125,0,0,1160,1162,5,173,0,0,1161,1160,
        1,0,0,0,1162,1165,1,0,0,0,1163,1161,1,0,0,0,1163,1164,1,0,0,0,1164,
        1166,1,0,0,0,1165,1163,1,0,0,0,1166,1167,5,126,0,0,1167,139,1,0,
        0,0,1168,1190,5,173,0,0,1169,1190,5,101,0,0,1170,1190,5,102,0,0,
        1171,1190,5,34,0,0,1172,1173,5,141,0,0,1173,1190,5,142,0,0,1174,
        1190,3,142,71,0,1175,1190,3,144,72,0,1176,1190,3,146,73,0,1177,1190,
        3,148,74,0,1178,1190,3,152,76,0,1179,1190,3,156,78,0,1180,1190,3,
        162,81,0,1181,1190,3,164,82,0,1182,1190,3,166,83,0,1183,1190,3,168,
        84,0,1184,1190,3,170,85,0,1185,1190,3,172,86,0,1186,1190,3,174,87,
        0,1187,1190,3,180,90,0,1188,1190,3,184,92,0,1189,1168,1,0,0,0,1189,
        1169,1,0,0,0,1189,1170,1,0,0,0,1189,1171,1,0,0,0,1189,1172,1,0,0,
        0,1189,1174,1,0,0,0,1189,1175,1,0,0,0,1189,1176,1,0,0,0,1189,1177,
        1,0,0,0,1189,1178,1,0,0,0,1189,1179,1,0,0,0,1189,1180,1,0,0,0,1189,
        1181,1,0,0,0,1189,1182,1,0,0,0,1189,1183,1,0,0,0,1189,1184,1,0,0,
        0,1189,1185,1,0,0,0,1189,1186,1,0,0,0,1189,1187,1,0,0,0,1189,1188,
        1,0,0,0,1190,141,1,0,0,0,1191,1192,5,2,0,0,1192,1194,5,76,0,0,1193,
        1195,3,140,70,0,1194,1193,1,0,0,0,1195,1196,1,0,0,0,1196,1194,1,
        0,0,0,1196,1197,1,0,0,0,1197,1198,1,0,0,0,1198,1199,5,3,0,0,1199,
        143,1,0,0,0,1200,1201,5,2,0,0,1201,1203,5,77,0,0,1202,1204,3,140,
        70,0,1203,1202,1,0,0,0,1204,1205,1,0,0,0,1205,1203,1,0,0,0,1205,
        1206,1,0,0,0,1206,1207,1,0,0,0,1207,1208,5,3,0,0,1208,145,1,0,0,
        0,1209,1210,5,2,0,0,1210,1211,5,35,0,0,1211,1212,3,140,70,0,1212,
        1213,5,3,0,0,1213,147,1,0,0,0,1214,1215,5,2,0,0,1215,1217,5,78,0,
        0,1216,1218,3,150,75,0,1217,1216,1,0,0,0,1218,1219,1,0,0,0,1219,
        1217,1,0,0,0,1219,1220,1,0,0,0,1220,1221,1,0,0,0,1221,1222,5,3,0,
        0,1222,149,1,0,0,0,1223,1224,5,2,0,0,1224,1225,5,88,0,0,1225,1226,
        3,140,70,0,1226,1227,5,3,0,0,1227,1235,1,0,0,0,1228,1229,5,2,0,0,
        1229,1230,5,173,0,0,1230,1231,3,140,70,0,1231,1232,5,3,0,0,1232,
        1235,1,0,0,0,1233,1235,3,140,70,0,1234,1223,1,0,0,0,1234,1228,1,
        0,0,0,1234,1233,1,0,0,0,1235,151,1,0,0,0,1236,1237,5,2,0,0,1237,
        1239,5,79,0,0,1238,1240,3,186,93,0,1239,1238,1,0,0,0,1239,1240,1,
        0,0,0,1240,1241,1,0,0,0,1241,1245,5,2,0,0,1242,1244,3,154,77,0,1243,
        1242,1,0,0,0,1244,1247,1,0,0,0,1245,1243,1,0,0,0,1245,1246,1,0,0,
        0,1246,1248,1,0,0,0,1247,1245,1,0,0,0,1248,1249,5,3,0,0,1249,1250,
        3,140,70,0,1250,1251,5,3,0,0,1251,153,1,0,0,0,1252,1253,5,2,0,0,
        1253,1255,5,173,0,0,1254,1256,5,99,0,0,1255,1254,1,0,0,0,1255,1256,
        1,0,0,0,1256,1257,1,0,0,0,1257,1258,3,140,70,0,1258,1259,5,3,0,0,
        1259,155,1,0,0,0,1260,1261,5,2,0,0,1261,1265,5,173,0,0,1262,1264,
        3,158,79,0,1263,1262,1,0,0,0,1264,1267,1,0,0,0,1265,1263,1,0,0,0,
        1265,1266,1,0,0,0,1266,1268,1,0,0,0,1267,1265,1,0,0,0,1268,1269,
        5,3,0,0,1269,157,1,0,0,0,1270,1274,5,2,0,0,1271,1273,3,160,80,0,
        1272,1271,1,0,0,0,1273,1276,1,0,0,0,1274,1272,1,0,0,0,1274,1275,
        1,0,0,0,1275,1277,1,0,0,0,1276,1274,1,0,0,0,1277,1279,5,173,0,0,
        1278,1280,5,99,0,0,1279,1278,1,0,0,0,1279,1280,1,0,0,0,1280,1281,
        1,0,0,0,1281,1282,3,140,70,0,1282,1283,5,3,0,0,1283,159,1,0,0,0,
        1284,1285,5,89,0,0,1285,161,1,0,0,0,1286,1287,5,2,0,0,1287,1288,
        5,80,0,0,1288,1289,7,2,0,0,1289,1290,5,3,0,0,1290,163,1,0,0,0,1291,
        1292,5,2,0,0,1292,1293,5,81,0,0,1293,1294,3,140,70,0,1294,1295,5,
        3,0,0,1295,165,1,0,0,0,1296,1297,5,2,0,0,1297,1298,5,82,0,0,1298,
        1299,5,173,0,0,1299,1300,5,3,0,0,1300,167,1,0,0,0,1301,1302,5,2,
        0,0,1302,1303,5,41,0,0,1303,1304,3,140,70,0,1304,1305,3,140,70,0,
        1305,1306,5,3,0,0,1306,169,1,0,0,0,1307,1308,5,2,0,0,1308,1309,5,
        33,0,0,1309,1310,3,140,70,0,1310,1311,3,140,70,0,1311,1312,3,140,
        70,0,1312,1313,3,140,70,0,1313,1314,5,3,0,0,1314,171,1,0,0,0,1315,
        1316,5,2,0,0,1316,1317,5,84,0,0,1317,1318,5,173,0,0,1318,1319,5,
        3,0,0,1319,173,1,0,0,0,1320,1321,5,2,0,0,1321,1322,5,85,0,0,1322,
        1323,5,173,0,0,1323,1325,3,140,70,0,1324,1326,3,176,88,0,1325,1324,
        1,0,0,0,1325,1326,1,0,0,0,1326,1327,1,0,0,0,1327,1328,3,140,70,0,
        1328,1329,5,3,0,0,1329,175,1,0,0,0,1330,1331,5,2,0,0,1331,1333,5,
        98,0,0,1332,1334,3,178,89,0,1333,1332,1,0,0,0,1334,1335,1,0,0,0,
        1335,1333,1,0,0,0,1335,1336,1,0,0,0,1336,1337,1,0,0,0,1337,1338,
        5,3,0,0,1338,177,1,0,0,0,1339,1340,7,3,0,0,1340,179,1,0,0,0,1341,
        1342,5,2,0,0,1342,1344,5,86,0,0,1343,1345,3,182,91,0,1344,1343,1,
        0,0,0,1345,1346,1,0,0,0,1346,1344,1,0,0,0,1346,1347,1,0,0,0,1347,
        1348,1,0,0,0,1348,1349,5,3,0,0,1349,181,1,0,0,0,1350,1353,5,167,
        0,0,1351,1353,3,140,70,0,1352,1350,1,0,0,0,1352,1351,1,0,0,0,1353,
        183,1,0,0,0,1354,1355,5,2,0,0,1355,1356,5,92,0,0,1356,1358,3,140,
        70,0,1357,1359,3,140,70,0,1358,1357,1,0,0,0,1359,1360,1,0,0,0,1360,
        1358,1,0,0,0,1360,1361,1,0,0,0,1361,1362,1,0,0,0,1362,1363,5,3,0,
        0,1363,185,1,0,0,0,1364,1365,5,2,0,0,1365,1367,5,90,0,0,1366,1368,
        3,188,94,0,1367,1366,1,0,0,0,1368,1369,1,0,0,0,1369,1367,1,0,0,0,
        1369,1370,1,0,0,0,1370,1371,1,0,0,0,1371,1372,5,3,0,0,1372,187,1,
        0,0,0,1373,1374,5,2,0,0,1374,1376,5,173,0,0,1375,1377,3,190,95,0,
        1376,1375,1,0,0,0,1376,1377,1,0,0,0,1377,1379,1,0,0,0,1378,1380,
        3,192,96,0,1379,1378,1,0,0,0,1379,1380,1,0,0,0,1380,1381,1,0,0,0,
        1381,1382,5,3,0,0,1382,189,1,0,0,0,1383,1384,5,2,0,0,1384,1385,5,
        93,0,0,1385,1386,3,140,70,0,1386,1387,5,3,0,0,1387,191,1,0,0,0,1388,
        1389,5,2,0,0,1389,1390,5,51,0,0,1390,1391,3,140,70,0,1391,1392,5,
        3,0,0,1392,193,1,0,0,0,1393,1394,5,2,0,0,1394,1395,5,31,0,0,1395,
        1396,5,173,0,0,1396,1397,3,222,111,0,1397,1398,5,3,0,0,1398,1412,
        1,0,0,0,1399,1400,5,2,0,0,1400,1401,5,31,0,0,1401,1402,3,312,156,
        0,1402,1403,3,222,111,0,1403,1404,5,3,0,0,1404,1412,1,0,0,0,1405,
        1406,5,2,0,0,1406,1407,5,31,0,0,1407,1408,3,316,158,0,1408,1409,
        3,222,111,0,1409,1410,5,3,0,0,1410,1412,1,0,0,0,1411,1393,1,0,0,
        0,1411,1399,1,0,0,0,1411,1405,1,0,0,0,1412,195,1,0,0,0,1413,1414,
        5,2,0,0,1414,1415,5,135,0,0,1415,1416,5,173,0,0,1416,1417,3,222,
        111,0,1417,1418,5,3,0,0,1418,1444,1,0,0,0,1419,1420,5,2,0,0,1420,
        1421,5,136,0,0,1421,1422,5,173,0,0,1422,1423,3,222,111,0,1423,1424,
        5,3,0,0,1424,1444,1,0,0,0,1425,1426,5,2,0,0,1426,1427,5,137,0,0,
        1427,1428,5,173,0,0,1428,1429,3,222,111,0,1429,1430,5,3,0,0,1430,
        1444,1,0,0,0,1431,1432,5,2,0,0,1432,1433,5,138,0,0,1433,1434,5,173,
        0,0,1434,1435,3,222,111,0,1435,1436,5,3,0,0,1436,1444,1,0,0,0,1437,
        1438,5,2,0,0,1438,1439,5,139,0,0,1439,1440,5,173,0,0,1440,1441,3,
        222,111,0,1441,1442,5,3,0,0,1442,1444,1,0,0,0,1443,1413,1,0,0,0,
        1443,1419,1,0,0,0,1443,1425,1,0,0,0,1443,1431,1,0,0,0,1443,1437,
        1,0,0,0,1444,197,1,0,0,0,1445,1446,5,2,0,0,1446,1447,3,222,111,0,
        1447,1448,5,125,0,0,1448,1449,3,222,111,0,1449,1450,5,126,0,0,1450,
        1451,5,140,0,0,1451,1452,3,222,111,0,1452,1453,5,3,0,0,1453,199,
        1,0,0,0,1454,1455,5,2,0,0,1455,1456,5,49,0,0,1456,1460,3,222,111,
        0,1457,1459,3,202,101,0,1458,1457,1,0,0,0,1459,1462,1,0,0,0,1460,
        1458,1,0,0,0,1460,1461,1,0,0,0,1461,1464,1,0,0,0,1462,1460,1,0,0,
        0,1463,1465,3,204,102,0,1464,1463,1,0,0,0,1464,1465,1,0,0,0,1465,
        1466,1,0,0,0,1466,1467,5,3,0,0,1467,201,1,0,0,0,1468,1469,5,2,0,
        0,1469,1470,5,50,0,0,1470,1474,3,222,111,0,1471,1473,3,74,37,0,1472,
        1471,1,0,0,0,1473,1476,1,0,0,0,1474,1472,1,0,0,0,1474,1475,1,0,0,
        0,1475,1477,1,0,0,0,1476,1474,1,0,0,0,1477,1478,5,3,0,0,1478,203,
        1,0,0,0,1479,1480,5,2,0,0,1480,1484,5,51,0,0,1481,1483,3,74,37,0,
        1482,1481,1,0,0,0,1483,1486,1,0,0,0,1484,1482,1,0,0,0,1484,1485,
        1,0,0,0,1485,1487,1,0,0,0,1486,1484,1,0,0,0,1487,1488,5,3,0,0,1488,
        205,1,0,0,0,1489,1490,5,2,0,0,1490,1491,5,60,0,0,1491,1492,3,76,
        38,0,1492,1493,3,222,111,0,1493,1497,3,194,97,0,1494,1496,3,74,37,
        0,1495,1494,1,0,0,0,1496,1499,1,0,0,0,1497,1495,1,0,0,0,1497,1498,
        1,0,0,0,1498,1500,1,0,0,0,1499,1497,1,0,0,0,1500,1501,5,3,0,0,1501,
        1519,1,0,0,0,1502,1503,5,2,0,0,1503,1504,5,60,0,0,1504,1505,5,2,
        0,0,1505,1506,5,173,0,0,1506,1507,3,222,111,0,1507,1508,5,3,0,0,
        1508,1509,3,222,111,0,1509,1513,3,222,111,0,1510,1512,3,74,37,0,
        1511,1510,1,0,0,0,1512,1515,1,0,0,0,1513,1511,1,0,0,0,1513,1514,
        1,0,0,0,1514,1516,1,0,0,0,1515,1513,1,0,0,0,1516,1517,5,3,0,0,1517,
        1519,1,0,0,0,1518,1489,1,0,0,0,1518,1502,1,0,0,0,1519,207,1,0,0,
        0,1520,1521,5,2,0,0,1521,1522,5,52,0,0,1522,1523,5,173,0,0,1523,
        1527,3,222,111,0,1524,1526,3,74,37,0,1525,1524,1,0,0,0,1526,1529,
        1,0,0,0,1527,1525,1,0,0,0,1527,1528,1,0,0,0,1528,1530,1,0,0,0,1529,
        1527,1,0,0,0,1530,1531,5,3,0,0,1531,209,1,0,0,0,1532,1533,5,2,0,
        0,1533,1534,5,53,0,0,1534,1535,5,173,0,0,1535,1539,3,222,111,0,1536,
        1538,3,74,37,0,1537,1536,1,0,0,0,1538,1541,1,0,0,0,1539,1537,1,0,
        0,0,1539,1540,1,0,0,0,1540,1542,1,0,0,0,1541,1539,1,0,0,0,1542,1543,
        5,3,0,0,1543,211,1,0,0,0,1544,1545,5,2,0,0,1545,1546,5,54,0,0,1546,
        1547,5,173,0,0,1547,1551,3,222,111,0,1548,1550,3,74,37,0,1549,1548,
        1,0,0,0,1550,1553,1,0,0,0,1551,1549,1,0,0,0,1551,1552,1,0,0,0,1552,
        1554,1,0,0,0,1553,1551,1,0,0,0,1554,1555,5,3,0,0,1555,213,1,0,0,
        0,1556,1557,5,2,0,0,1557,1558,5,58,0,0,1558,1560,3,216,108,0,1559,
        1561,3,218,109,0,1560,1559,1,0,0,0,1560,1561,1,0,0,0,1561,1563,1,
        0,0,0,1562,1564,3,220,110,0,1563,1562,1,0,0,0,1563,1564,1,0,0,0,
        1564,1565,1,0,0,0,1565,1566,5,3,0,0,1566,215,1,0,0,0,1567,1568,5,
        2,0,0,1568,1572,5,55,0,0,1569,1571,3,74,37,0,1570,1569,1,0,0,0,1571,
        1574,1,0,0,0,1572,1570,1,0,0,0,1572,1573,1,0,0,0,1573,1575,1,0,0,
        0,1574,1572,1,0,0,0,1575,1576,5,3,0,0,1576,217,1,0,0,0,1577,1578,
        5,2,0,0,1578,1579,5,56,0,0,1579,1583,5,173,0,0,1580,1582,3,74,37,
        0,1581,1580,1,0,0,0,1582,1585,1,0,0,0,1583,1581,1,0,0,0,1583,1584,
        1,0,0,0,1584,1586,1,0,0,0,1585,1583,1,0,0,0,1586,1587,5,3,0,0,1587,
        219,1,0,0,0,1588,1589,5,2,0,0,1589,1593,5,57,0,0,1590,1592,3,74,
        37,0,1591,1590,1,0,0,0,1592,1595,1,0,0,0,1593,1591,1,0,0,0,1593,
        1594,1,0,0,0,1594,1596,1,0,0,0,1595,1593,1,0,0,0,1596,1597,5,3,0,
        0,1597,221,1,0,0,0,1598,1649,3,364,182,0,1599,1649,5,173,0,0,1600,
        1649,5,23,0,0,1601,1649,5,170,0,0,1602,1649,3,236,118,0,1603,1649,
        3,238,119,0,1604,1649,3,240,120,0,1605,1649,3,242,121,0,1606,1649,
        3,244,122,0,1607,1649,3,246,123,0,1608,1649,3,248,124,0,1609,1649,
        3,250,125,0,1610,1649,3,252,126,0,1611,1649,3,254,127,0,1612,1649,
        3,256,128,0,1613,1649,3,258,129,0,1614,1649,3,272,136,0,1615,1649,
        3,274,137,0,1616,1649,3,276,138,0,1617,1649,3,278,139,0,1618,1649,
        3,280,140,0,1619,1649,3,292,146,0,1620,1649,3,302,151,0,1621,1649,
        3,298,149,0,1622,1649,3,300,150,0,1623,1649,3,312,156,0,1624,1649,
        3,316,158,0,1625,1649,3,314,157,0,1626,1649,3,318,159,0,1627,1649,
        3,324,162,0,1628,1649,3,326,163,0,1629,1649,3,328,164,0,1630,1649,
        3,330,165,0,1631,1649,3,282,141,0,1632,1649,3,284,142,0,1633,1649,
        3,290,145,0,1634,1649,3,332,166,0,1635,1649,3,334,167,0,1636,1649,
        3,336,168,0,1637,1649,3,232,116,0,1638,1649,3,234,117,0,1639,1649,
        3,306,153,0,1640,1649,3,224,112,0,1641,1649,3,226,113,0,1642,1649,
        3,228,114,0,1643,1649,3,230,115,0,1644,1649,3,338,169,0,1645,1649,
        3,350,175,0,1646,1649,3,310,155,0,1647,1649,3,354,177,0,1648,1598,
        1,0,0,0,1648,1599,1,0,0,0,1648,1600,1,0,0,0,1648,1601,1,0,0,0,1648,
        1602,1,0,0,0,1648,1603,1,0,0,0,1648,1604,1,0,0,0,1648,1605,1,0,0,
        0,1648,1606,1,0,0,0,1648,1607,1,0,0,0,1648,1608,1,0,0,0,1648,1609,
        1,0,0,0,1648,1610,1,0,0,0,1648,1611,1,0,0,0,1648,1612,1,0,0,0,1648,
        1613,1,0,0,0,1648,1614,1,0,0,0,1648,1615,1,0,0,0,1648,1616,1,0,0,
        0,1648,1617,1,0,0,0,1648,1618,1,0,0,0,1648,1619,1,0,0,0,1648,1620,
        1,0,0,0,1648,1621,1,0,0,0,1648,1622,1,0,0,0,1648,1623,1,0,0,0,1648,
        1624,1,0,0,0,1648,1625,1,0,0,0,1648,1626,1,0,0,0,1648,1627,1,0,0,
        0,1648,1628,1,0,0,0,1648,1629,1,0,0,0,1648,1630,1,0,0,0,1648,1631,
        1,0,0,0,1648,1632,1,0,0,0,1648,1633,1,0,0,0,1648,1634,1,0,0,0,1648,
        1635,1,0,0,0,1648,1636,1,0,0,0,1648,1637,1,0,0,0,1648,1638,1,0,0,
        0,1648,1639,1,0,0,0,1648,1640,1,0,0,0,1648,1641,1,0,0,0,1648,1642,
        1,0,0,0,1648,1643,1,0,0,0,1648,1644,1,0,0,0,1648,1645,1,0,0,0,1648,
        1646,1,0,0,0,1648,1647,1,0,0,0,1649,223,1,0,0,0,1650,1651,5,69,0,
        0,1651,225,1,0,0,0,1652,1653,5,70,0,0,1653,227,1,0,0,0,1654,1655,
        5,2,0,0,1655,1659,5,70,0,0,1656,1658,3,222,111,0,1657,1656,1,0,0,
        0,1658,1661,1,0,0,0,1659,1657,1,0,0,0,1659,1660,1,0,0,0,1660,1662,
        1,0,0,0,1661,1659,1,0,0,0,1662,1663,5,3,0,0,1663,229,1,0,0,0,1664,
        1665,5,2,0,0,1665,1666,5,62,0,0,1666,1670,5,173,0,0,1667,1669,3,
        222,111,0,1668,1667,1,0,0,0,1669,1672,1,0,0,0,1670,1668,1,0,0,0,
        1670,1671,1,0,0,0,1671,1673,1,0,0,0,1672,1670,1,0,0,0,1673,1674,
        5,3,0,0,1674,231,1,0,0,0,1675,1676,5,2,0,0,1676,1677,5,82,0,0,1677,
        1678,3,222,111,0,1678,1679,5,3,0,0,1679,233,1,0,0,0,1680,1681,5,
        2,0,0,1681,1682,5,83,0,0,1682,1683,3,222,111,0,1683,1684,3,140,70,
        0,1684,1685,5,3,0,0,1685,235,1,0,0,0,1686,1687,5,2,0,0,1687,1688,
        5,14,0,0,1688,1692,3,358,179,0,1689,1691,3,74,37,0,1690,1689,1,0,
        0,0,1691,1694,1,0,0,0,1692,1690,1,0,0,0,1692,1693,1,0,0,0,1693,1695,
        1,0,0,0,1694,1692,1,0,0,0,1695,1696,5,3,0,0,1696,237,1,0,0,0,1697,
        1698,5,2,0,0,1698,1700,5,16,0,0,1699,1701,5,173,0,0,1700,1699,1,
        0,0,0,1700,1701,1,0,0,0,1701,1702,1,0,0,0,1702,1706,3,358,179,0,
        1703,1705,3,74,37,0,1704,1703,1,0,0,0,1705,1708,1,0,0,0,1706,1704,
        1,0,0,0,1706,1707,1,0,0,0,1707,1709,1,0,0,0,1708,1706,1,0,0,0,1709,
        1710,5,3,0,0,1710,239,1,0,0,0,1711,1712,5,2,0,0,1712,1713,5,107,
        0,0,1713,1717,3,358,179,0,1714,1716,3,74,37,0,1715,1714,1,0,0,0,
        1716,1719,1,0,0,0,1717,1715,1,0,0,0,1717,1718,1,0,0,0,1718,1720,
        1,0,0,0,1719,1717,1,0,0,0,1720,1721,5,3,0,0,1721,241,1,0,0,0,1722,
        1723,5,2,0,0,1723,1724,5,109,0,0,1724,1728,3,358,179,0,1725,1727,
        3,74,37,0,1726,1725,1,0,0,0,1727,1730,1,0,0,0,1728,1726,1,0,0,0,
        1728,1729,1,0,0,0,1729,1731,1,0,0,0,1730,1728,1,0,0,0,1731,1732,
        5,3,0,0,1732,243,1,0,0,0,1733,1734,5,2,0,0,1734,1735,5,111,0,0,1735,
        1739,3,358,179,0,1736,1738,3,74,37,0,1737,1736,1,0,0,0,1738,1741,
        1,0,0,0,1739,1737,1,0,0,0,1739,1740,1,0,0,0,1740,1742,1,0,0,0,1741,
        1739,1,0,0,0,1742,1743,5,3,0,0,1743,245,1,0,0,0,1744,1745,5,2,0,
        0,1745,1746,5,105,0,0,1746,1750,3,358,179,0,1747,1749,3,74,37,0,
        1748,1747,1,0,0,0,1749,1752,1,0,0,0,1750,1748,1,0,0,0,1750,1751,
        1,0,0,0,1751,1753,1,0,0,0,1752,1750,1,0,0,0,1753,1754,5,3,0,0,1754,
        247,1,0,0,0,1755,1756,5,2,0,0,1756,1758,5,15,0,0,1757,1759,5,173,
        0,0,1758,1757,1,0,0,0,1758,1759,1,0,0,0,1759,1760,1,0,0,0,1760,1764,
        3,266,133,0,1761,1763,3,74,37,0,1762,1761,1,0,0,0,1763,1766,1,0,
        0,0,1764,1762,1,0,0,0,1764,1765,1,0,0,0,1765,1767,1,0,0,0,1766,1764,
        1,0,0,0,1767,1768,5,3,0,0,1768,249,1,0,0,0,1769,1770,5,2,0,0,1770,
        1771,5,13,0,0,1771,1775,3,266,133,0,1772,1774,3,74,37,0,1773,1772,
        1,0,0,0,1774,1777,1,0,0,0,1775,1773,1,0,0,0,1775,1776,1,0,0,0,1776,
        1778,1,0,0,0,1777,1775,1,0,0,0,1778,1779,5,3,0,0,1779,251,1,0,0,
        0,1780,1781,5,2,0,0,1781,1782,5,108,0,0,1782,1786,3,266,133,0,1783,
        1785,3,74,37,0,1784,1783,1,0,0,0,1785,1788,1,0,0,0,1786,1784,1,0,
        0,0,1786,1787,1,0,0,0,1787,1789,1,0,0,0,1788,1786,1,0,0,0,1789,1790,
        5,3,0,0,1790,253,1,0,0,0,1791,1792,5,2,0,0,1792,1793,5,106,0,0,1793,
        1797,3,266,133,0,1794,1796,3,74,37,0,1795,1794,1,0,0,0,1796,1799,
        1,0,0,0,1797,1795,1,0,0,0,1797,1798,1,0,0,0,1798,1800,1,0,0,0,1799,
        1797,1,0,0,0,1800,1801,5,3,0,0,1801,255,1,0,0,0,1802,1803,5,2,0,
        0,1803,1804,5,110,0,0,1804,1808,3,266,133,0,1805,1807,3,74,37,0,
        1806,1805,1,0,0,0,1807,1810,1,0,0,0,1808,1806,1,0,0,0,1808,1809,
        1,0,0,0,1809,1811,1,0,0,0,1810,1808,1,0,0,0,1811,1812,5,3,0,0,1812,
        257,1,0,0,0,1813,1814,5,2,0,0,1814,1815,5,104,0,0,1815,1819,3,266,
        133,0,1816,1818,3,74,37,0,1817,1816,1,0,0,0,1818,1821,1,0,0,0,1819,
        1817,1,0,0,0,1819,1820,1,0,0,0,1820,1822,1,0,0,0,1821,1819,1,0,0,
        0,1822,1823,5,3,0,0,1823,259,1,0,0,0,1824,1825,5,2,0,0,1825,1829,
        5,17,0,0,1826,1828,3,54,27,0,1827,1826,1,0,0,0,1828,1831,1,0,0,0,
        1829,1827,1,0,0,0,1829,1830,1,0,0,0,1830,1832,1,0,0,0,1831,1829,
        1,0,0,0,1832,1833,3,72,36,0,1833,1837,3,266,133,0,1834,1836,3,74,
        37,0,1835,1834,1,0,0,0,1836,1839,1,0,0,0,1837,1835,1,0,0,0,1837,
        1838,1,0,0,0,1838,1840,1,0,0,0,1839,1837,1,0,0,0,1840,1841,5,3,0,
        0,1841,261,1,0,0,0,1842,1843,5,2,0,0,1843,1847,5,63,0,0,1844,1846,
        3,54,27,0,1845,1844,1,0,0,0,1846,1849,1,0,0,0,1847,1845,1,0,0,0,
        1847,1848,1,0,0,0,1848,1850,1,0,0,0,1849,1847,1,0,0,0,1850,1851,
        3,72,36,0,1851,1852,3,266,133,0,1852,1853,5,3,0,0,1853,263,1,0,0,
        0,1854,1855,5,2,0,0,1855,1856,5,67,0,0,1856,1860,3,266,133,0,1857,
        1859,3,74,37,0,1858,1857,1,0,0,0,1859,1862,1,0,0,0,1860,1858,1,0,
        0,0,1860,1861,1,0,0,0,1861,1863,1,0,0,0,1862,1860,1,0,0,0,1863,1864,
        5,3,0,0,1864,265,1,0,0,0,1865,1869,5,2,0,0,1866,1868,3,268,134,0,
        1867,1866,1,0,0,0,1868,1871,1,0,0,0,1869,1867,1,0,0,0,1869,1870,
        1,0,0,0,1870,1873,1,0,0,0,1871,1869,1,0,0,0,1872,1874,3,270,135,
        0,1873,1872,1,0,0,0,1873,1874,1,0,0,0,1874,1875,1,0,0,0,1875,1878,
        5,3,0,0,1876,1877,5,103,0,0,1877,1879,3,140,70,0,1878,1876,1,0,0,
        0,1878,1879,1,0,0,0,1879,267,1,0,0,0,1880,1881,5,2,0,0,1881,1883,
        5,173,0,0,1882,1884,5,99,0,0,1883,1882,1,0,0,0,1883,1884,1,0,0,0,
        1884,1887,1,0,0,0,1885,1886,5,103,0,0,1886,1888,3,140,70,0,1887,
        1885,1,0,0,0,1887,1888,1,0,0,0,1888,1894,1,0,0,0,1889,1890,5,2,0,
        0,1890,1891,5,51,0,0,1891,1892,3,222,111,0,1892,1893,5,3,0,0,1893,
        1895,1,0,0,0,1894,1889,1,0,0,0,1894,1895,1,0,0,0,1895,1896,1,0,0,
        0,1896,1897,5,3,0,0,1897,269,1,0,0,0,1898,1899,5,2,0,0,1899,1900,
        5,88,0,0,1900,1903,5,173,0,0,1901,1902,5,103,0,0,1902,1904,3,140,
        70,0,1903,1901,1,0,0,0,1903,1904,1,0,0,0,1904,1905,1,0,0,0,1905,
        1906,5,3,0,0,1906,271,1,0,0,0,1907,1908,5,2,0,0,1908,1909,5,114,
        0,0,1909,1910,3,222,111,0,1910,1911,5,3,0,0,1911,273,1,0,0,0,1912,
        1913,5,2,0,0,1913,1915,5,113,0,0,1914,1916,3,222,111,0,1915,1914,
        1,0,0,0,1915,1916,1,0,0,0,1916,1917,1,0,0,0,1917,1918,5,3,0,0,1918,
        275,1,0,0,0,1919,1920,5,2,0,0,1920,1921,5,112,0,0,1921,1922,3,222,
        111,0,1922,1923,5,3,0,0,1923,277,1,0,0,0,1924,1925,5,2,0,0,1925,
        1926,5,19,0,0,1926,1927,3,222,111,0,1927,1931,3,222,111,0,1928,1930,
        3,222,111,0,1929,1928,1,0,0,0,1930,1933,1,0,0,0,1931,1929,1,0,0,
        0,1931,1932,1,0,0,0,1932,1934,1,0,0,0,1933,1931,1,0,0,0,1934,1935,
        5,3,0,0,1935,279,1,0,0,0,1936,1937,5,2,0,0,1937,1938,5,20,0,0,1938,
        1939,3,222,111,0,1939,1943,3,222,111,0,1940,1942,3,222,111,0,1941,
        1940,1,0,0,0,1942,1945,1,0,0,0,1943,1941,1,0,0,0,1943,1944,1,0,0,
        0,1944,1946,1,0,0,0,1945,1943,1,0,0,0,1946,1947,5,3,0,0,1947,281,
        1,0,0,0,1948,1949,5,2,0,0,1949,1950,5,32,0,0,1950,1951,3,222,111,
        0,1951,1952,3,222,111,0,1952,1953,3,222,111,0,1953,1954,5,3,0,0,
        1954,283,1,0,0,0,1955,1956,5,2,0,0,1956,1958,5,33,0,0,1957,1959,
        3,286,143,0,1958,1957,1,0,0,0,1959,1960,1,0,0,0,1960,1958,1,0,0,
        0,1960,1961,1,0,0,0,1961,1963,1,0,0,0,1962,1964,3,288,144,0,1963,
        1962,1,0,0,0,1963,1964,1,0,0,0,1964,1965,1,0,0,0,1965,1966,5,3,0,
        0,1966,285,1,0,0,0,1967,1968,3,222,111,0,1968,1969,3,222,111,0,1969,
        287,1,0,0,0,1970,1971,5,124,0,0,1971,1972,3,222,111,0,1972,289,1,
        0,0,0,1973,1974,5,2,0,0,1974,1975,5,47,0,0,1975,1977,5,173,0,0,1976,
        1978,3,356,178,0,1977,1976,1,0,0,0,1977,1978,1,0,0,0,1978,1982,1,
        0,0,0,1979,1981,3,222,111,0,1980,1979,1,0,0,0,1981,1984,1,0,0,0,
        1982,1980,1,0,0,0,1982,1983,1,0,0,0,1983,1985,1,0,0,0,1984,1982,
        1,0,0,0,1985,1986,5,3,0,0,1986,291,1,0,0,0,1987,1988,5,2,0,0,1988,
        1992,5,34,0,0,1989,1991,3,294,147,0,1990,1989,1,0,0,0,1991,1994,
        1,0,0,0,1992,1990,1,0,0,0,1992,1993,1,0,0,0,1993,1995,1,0,0,0,1994,
        1992,1,0,0,0,1995,1996,5,3,0,0,1996,293,1,0,0,0,1997,1998,5,2,0,
        0,1998,1999,3,308,154,0,1999,2000,3,222,111,0,2000,2001,5,3,0,0,
        2001,2025,1,0,0,0,2002,2003,5,2,0,0,2003,2004,3,308,154,0,2004,2005,
        3,296,148,0,2005,2006,5,3,0,0,2006,2025,1,0,0,0,2007,2008,5,2,0,
        0,2008,2009,5,173,0,0,2009,2025,5,3,0,0,2010,2011,5,2,0,0,2011,2012,
        5,125,0,0,2012,2013,3,222,111,0,2013,2014,5,126,0,0,2014,2015,3,
        222,111,0,2015,2016,5,3,0,0,2016,2025,1,0,0,0,2017,2018,5,2,0,0,
        2018,2019,5,125,0,0,2019,2020,3,222,111,0,2020,2021,5,126,0,0,2021,
        2022,3,296,148,0,2022,2023,5,3,0,0,2023,2025,1,0,0,0,2024,1997,1,
        0,0,0,2024,2002,1,0,0,0,2024,2007,1,0,0,0,2024,2010,1,0,0,0,2024,
        2017,1,0,0,0,2025,295,1,0,0,0,2026,2027,5,2,0,0,2027,2028,5,18,0,
        0,2028,2032,3,358,179,0,2029,2031,3,74,37,0,2030,2029,1,0,0,0,2031,
        2034,1,0,0,0,2032,2030,1,0,0,0,2032,2033,1,0,0,0,2033,2035,1,0,0,
        0,2034,2032,1,0,0,0,2035,2036,5,3,0,0,2036,297,1,0,0,0,2037,2038,
        5,2,0,0,2038,2042,5,36,0,0,2039,2041,3,222,111,0,2040,2039,1,0,0,
        0,2041,2044,1,0,0,0,2042,2040,1,0,0,0,2042,2043,1,0,0,0,2043,2045,
        1,0,0,0,2044,2042,1,0,0,0,2045,2046,5,3,0,0,2046,299,1,0,0,0,2047,
        2061,5,125,0,0,2048,2055,3,222,111,0,2049,2051,5,4,0,0,2050,2049,
        1,0,0,0,2050,2051,1,0,0,0,2051,2052,1,0,0,0,2052,2054,3,222,111,
        0,2053,2050,1,0,0,0,2054,2057,1,0,0,0,2055,2053,1,0,0,0,2055,2056,
        1,0,0,0,2056,2059,1,0,0,0,2057,2055,1,0,0,0,2058,2060,5,4,0,0,2059,
        2058,1,0,0,0,2059,2060,1,0,0,0,2060,2062,1,0,0,0,2061,2048,1,0,0,
        0,2061,2062,1,0,0,0,2062,2063,1,0,0,0,2063,2064,5,126,0,0,2064,301,
        1,0,0,0,2065,2079,5,141,0,0,2066,2073,3,304,152,0,2067,2069,5,4,
        0,0,2068,2067,1,0,0,0,2068,2069,1,0,0,0,2069,2070,1,0,0,0,2070,2072,
        3,304,152,0,2071,2068,1,0,0,0,2072,2075,1,0,0,0,2073,2071,1,0,0,
        0,2073,2074,1,0,0,0,2074,2077,1,0,0,0,2075,2073,1,0,0,0,2076,2078,
        5,4,0,0,2077,2076,1,0,0,0,2077,2078,1,0,0,0,2078,2080,1,0,0,0,2079,
        2066,1,0,0,0,2079,2080,1,0,0,0,2080,2081,1,0,0,0,2081,2082,5,142,
        0,0,2082,303,1,0,0,0,2083,2084,7,4,0,0,2084,2085,5,103,0,0,2085,
        2094,3,222,111,0,2086,2087,5,125,0,0,2087,2088,3,222,111,0,2088,
        2089,5,126,0,0,2089,2090,5,103,0,0,2090,2091,3,222,111,0,2091,2094,
        1,0,0,0,2092,2094,5,173,0,0,2093,2083,1,0,0,0,2093,2086,1,0,0,0,
        2093,2092,1,0,0,0,2094,305,1,0,0,0,2095,2096,5,2,0,0,2096,2099,5,
        87,0,0,2097,2100,5,167,0,0,2098,2100,3,222,111,0,2099,2097,1,0,0,
        0,2099,2098,1,0,0,0,2100,2101,1,0,0,0,2101,2099,1,0,0,0,2101,2102,
        1,0,0,0,2102,2103,1,0,0,0,2103,2104,5,3,0,0,2104,307,1,0,0,0,2105,
        2106,7,5,0,0,2106,309,1,0,0,0,2107,2108,7,6,0,0,2108,311,1,0,0,0,
        2109,2110,5,2,0,0,2110,2111,5,40,0,0,2111,2112,3,222,111,0,2112,
        2113,3,308,154,0,2113,2114,5,3,0,0,2114,2124,1,0,0,0,2115,2116,5,
        2,0,0,2116,2117,5,40,0,0,2117,2118,3,222,111,0,2118,2119,5,125,0,
        0,2119,2120,3,222,111,0,2120,2121,5,126,0,0,2121,2122,5,3,0,0,2122,
        2124,1,0,0,0,2123,2109,1,0,0,0,2123,2115,1,0,0,0,2124,313,1,0,0,
        0,2125,2126,5,2,0,0,2126,2127,5,37,0,0,2127,2128,3,222,111,0,2128,
        2129,5,167,0,0,2129,2130,5,3,0,0,2130,315,1,0,0,0,2131,2132,5,2,
        0,0,2132,2133,5,41,0,0,2133,2134,3,222,111,0,2134,2135,3,222,111,
        0,2135,2136,5,3,0,0,2136,317,1,0,0,0,2137,2138,5,2,0,0,2138,2139,
        7,7,0,0,2139,2140,3,320,160,0,2140,2141,5,3,0,0,2141,319,1,0,0,0,
        2142,2143,3,322,161,0,2143,321,1,0,0,0,2144,2145,5,2,0,0,2145,2146,
        5,46,0,0,2146,2147,3,222,111,0,2147,2148,5,3,0,0,2148,2168,1,0,0,
        0,2149,2150,5,2,0,0,2150,2151,5,45,0,0,2151,2152,3,222,111,0,2152,
        2153,5,3,0,0,2153,2168,1,0,0,0,2154,2155,5,172,0,0,2155,2168,3,222,
        111,0,2156,2157,5,171,0,0,2157,2168,3,222,111,0,2158,2162,5,2,0,
        0,2159,2161,3,322,161,0,2160,2159,1,0,0,0,2161,2164,1,0,0,0,2162,
        2160,1,0,0,0,2162,2163,1,0,0,0,2163,2165,1,0,0,0,2164,2162,1,0,0,
        0,2165,2168,5,3,0,0,2166,2168,8,8,0,0,2167,2144,1,0,0,0,2167,2149,
        1,0,0,0,2167,2154,1,0,0,0,2167,2156,1,0,0,0,2167,2158,1,0,0,0,2167,
        2166,1,0,0,0,2168,323,1,0,0,0,2169,2170,5,2,0,0,2170,2171,5,46,0,
        0,2171,2172,3,222,111,0,2172,2173,5,3,0,0,2173,325,1,0,0,0,2174,
        2175,5,2,0,0,2175,2176,5,45,0,0,2176,2177,3,222,111,0,2177,2178,
        5,3,0,0,2178,327,1,0,0,0,2179,2180,5,172,0,0,2180,2181,3,222,111,
        0,2181,329,1,0,0,0,2182,2183,5,171,0,0,2183,2184,3,222,111,0,2184,
        331,1,0,0,0,2185,2186,5,2,0,0,2186,2187,5,39,0,0,2187,2188,3,222,
        111,0,2188,2189,3,308,154,0,2189,2190,5,3,0,0,2190,333,1,0,0,0,2191,
        2192,5,2,0,0,2192,2193,5,38,0,0,2193,2194,3,222,111,0,2194,2195,
        3,222,111,0,2195,2196,5,3,0,0,2196,335,1,0,0,0,2197,2198,5,2,0,0,
        2198,2199,5,42,0,0,2199,2200,3,222,111,0,2200,2201,3,222,111,0,2201,
        2202,5,3,0,0,2202,337,1,0,0,0,2203,2204,5,143,0,0,2204,2205,3,340,
        170,0,2205,2206,5,142,0,0,2206,339,1,0,0,0,2207,2213,3,342,171,0,
        2208,2209,3,348,174,0,2209,2210,3,342,171,0,2210,2212,1,0,0,0,2211,
        2208,1,0,0,0,2212,2215,1,0,0,0,2213,2211,1,0,0,0,2213,2214,1,0,0,
        0,2214,341,1,0,0,0,2215,2213,1,0,0,0,2216,2217,6,171,-1,0,2217,2218,
        5,173,0,0,2218,2220,5,2,0,0,2219,2221,3,344,172,0,2220,2219,1,0,
        0,0,2220,2221,1,0,0,0,2221,2222,1,0,0,0,2222,2233,5,3,0,0,2223,2224,
        5,141,0,0,2224,2225,3,340,170,0,2225,2226,5,142,0,0,2226,2233,1,
        0,0,0,2227,2228,3,346,173,0,2228,2229,3,342,171,3,2229,2233,1,0,
        0,0,2230,2233,3,364,182,0,2231,2233,5,173,0,0,2232,2216,1,0,0,0,
        2232,2223,1,0,0,0,2232,2227,1,0,0,0,2232,2230,1,0,0,0,2232,2231,
        1,0,0,0,2233,2242,1,0,0,0,2234,2235,10,5,0,0,2235,2237,5,2,0,0,2236,
        2238,3,344,172,0,2237,2236,1,0,0,0,2237,2238,1,0,0,0,2238,2239,1,
        0,0,0,2239,2241,5,3,0,0,2240,2234,1,0,0,0,2241,2244,1,0,0,0,2242,
        2240,1,0,0,0,2242,2243,1,0,0,0,2243,343,1,0,0,0,2244,2242,1,0,0,
        0,2245,2250,3,340,170,0,2246,2247,5,4,0,0,2247,2249,3,340,170,0,
        2248,2246,1,0,0,0,2249,2252,1,0,0,0,2250,2248,1,0,0,0,2250,2251,
        1,0,0,0,2251,345,1,0,0,0,2252,2250,1,0,0,0,2253,2254,7,9,0,0,2254,
        347,1,0,0,0,2255,2256,7,10,0,0,2256,349,1,0,0,0,2257,2258,5,2,0,
        0,2258,2262,5,173,0,0,2259,2261,3,222,111,0,2260,2259,1,0,0,0,2261,
        2264,1,0,0,0,2262,2260,1,0,0,0,2262,2263,1,0,0,0,2263,2265,1,0,0,
        0,2264,2262,1,0,0,0,2265,2269,5,133,0,0,2266,2268,3,74,37,0,2267,
        2266,1,0,0,0,2268,2271,1,0,0,0,2269,2267,1,0,0,0,2269,2270,1,0,0,
        0,2270,2272,1,0,0,0,2271,2269,1,0,0,0,2272,2273,5,3,0,0,2273,351,
        1,0,0,0,2274,2275,5,2,0,0,2275,2279,5,173,0,0,2276,2278,3,222,111,
        0,2277,2276,1,0,0,0,2278,2281,1,0,0,0,2279,2277,1,0,0,0,2279,2280,
        1,0,0,0,2280,2282,1,0,0,0,2281,2279,1,0,0,0,2282,2286,5,134,0,0,
        2283,2285,3,74,37,0,2284,2283,1,0,0,0,2285,2288,1,0,0,0,2286,2284,
        1,0,0,0,2286,2287,1,0,0,0,2287,2289,1,0,0,0,2288,2286,1,0,0,0,2289,
        2290,5,3,0,0,2290,353,1,0,0,0,2291,2292,5,2,0,0,2292,2294,3,222,
        111,0,2293,2295,3,356,178,0,2294,2293,1,0,0,0,2294,2295,1,0,0,0,
        2295,2299,1,0,0,0,2296,2298,3,222,111,0,2297,2296,1,0,0,0,2298,2301,
        1,0,0,0,2299,2297,1,0,0,0,2299,2300,1,0,0,0,2300,2302,1,0,0,0,2301,
        2299,1,0,0,0,2302,2303,5,3,0,0,2303,355,1,0,0,0,2304,2305,5,2,0,
        0,2305,2307,5,91,0,0,2306,2308,3,140,70,0,2307,2306,1,0,0,0,2308,
        2309,1,0,0,0,2309,2307,1,0,0,0,2309,2310,1,0,0,0,2310,2311,1,0,0,
        0,2311,2312,5,3,0,0,2312,357,1,0,0,0,2313,2330,5,2,0,0,2314,2321,
        3,360,180,0,2315,2317,5,4,0,0,2316,2315,1,0,0,0,2316,2317,1,0,0,
        0,2317,2318,1,0,0,0,2318,2320,3,360,180,0,2319,2316,1,0,0,0,2320,
        2323,1,0,0,0,2321,2319,1,0,0,0,2321,2322,1,0,0,0,2322,2328,1,0,0,
        0,2323,2321,1,0,0,0,2324,2326,5,4,0,0,2325,2324,1,0,0,0,2325,2326,
        1,0,0,0,2326,2327,1,0,0,0,2327,2329,3,362,181,0,2328,2325,1,0,0,
        0,2328,2329,1,0,0,0,2329,2331,1,0,0,0,2330,2314,1,0,0,0,2330,2331,
        1,0,0,0,2331,2332,1,0,0,0,2332,2335,5,3,0,0,2333,2334,5,103,0,0,
        2334,2336,3,140,70,0,2335,2333,1,0,0,0,2335,2336,1,0,0,0,2336,2345,
        1,0,0,0,2337,2338,5,2,0,0,2338,2339,3,362,181,0,2339,2342,5,3,0,
        0,2340,2341,5,103,0,0,2341,2343,3,140,70,0,2342,2340,1,0,0,0,2342,
        2343,1,0,0,0,2343,2345,1,0,0,0,2344,2313,1,0,0,0,2344,2337,1,0,0,
        0,2345,359,1,0,0,0,2346,2347,5,2,0,0,2347,2349,5,173,0,0,2348,2350,
        5,99,0,0,2349,2348,1,0,0,0,2349,2350,1,0,0,0,2350,2353,1,0,0,0,2351,
        2352,5,103,0,0,2352,2354,3,140,70,0,2353,2351,1,0,0,0,2353,2354,
        1,0,0,0,2354,2355,1,0,0,0,2355,2356,5,3,0,0,2356,361,1,0,0,0,2357,
        2358,5,2,0,0,2358,2359,5,88,0,0,2359,2362,5,173,0,0,2360,2361,5,
        103,0,0,2361,2363,3,140,70,0,2362,2360,1,0,0,0,2362,2363,1,0,0,0,
        2363,2364,1,0,0,0,2364,2365,5,3,0,0,2365,363,1,0,0,0,2366,2367,7,
        11,0,0,2367,365,1,0,0,0,196,371,393,403,412,421,426,428,442,455,
        467,477,484,494,501,511,525,534,537,547,557,565,575,578,588,598,
        602,609,614,617,620,630,634,637,652,661,675,684,691,695,703,708,
        712,719,724,727,732,740,750,758,768,780,788,798,806,818,844,852,
        858,869,875,886,893,909,918,928,939,947,967,996,1009,1018,1029,1062,
        1069,1076,1086,1106,1116,1134,1143,1148,1154,1163,1189,1196,1205,
        1219,1234,1239,1245,1255,1265,1274,1279,1325,1335,1346,1352,1360,
        1369,1376,1379,1411,1443,1460,1464,1474,1484,1497,1513,1518,1527,
        1539,1551,1560,1563,1572,1583,1593,1648,1659,1670,1692,1700,1706,
        1717,1728,1739,1750,1758,1764,1775,1786,1797,1808,1819,1829,1837,
        1847,1860,1869,1873,1878,1883,1887,1894,1903,1915,1931,1943,1960,
        1963,1977,1982,1992,2024,2032,2042,2050,2055,2059,2061,2068,2073,
        2077,2079,2093,2099,2101,2123,2162,2167,2213,2220,2232,2237,2242,
        2250,2262,2269,2279,2286,2294,2299,2309,2316,2321,2325,2328,2330,
        2335,2342,2344,2349,2353,2362
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


export class MixinFormContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public MIXIN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.MIXIN, 0)!;
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
    public mixinFilter(): MixinFilterContext | null {
        return this.getRuleContext(0, MixinFilterContext);
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_mixinForm;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterMixinForm) {
             listener.enterMixinForm(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
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
        return this.getToken(Stage9Parser.COLON, 0)!;
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
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.LPAREN, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(Stage9Parser.RPAREN, 0)!;
    }
    public EXCEPT(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.EXCEPT, 0);
    }
    public override get ruleIndex(): number {
        return Stage9Parser.RULE_mixinFilter;
    }
    public override enterRule(listener: Stage9Listener): void {
        if(listener.enterMixinFilter) {
             listener.enterMixinFilter(this);
        }
    }
    public override exitRule(listener: Stage9Listener): void {
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
    public DECLARE(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.DECLARE, 0);
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
    public MIXIN(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.MIXIN, 0);
    }
    public DECLARE(): antlr.TerminalNode | null {
        return this.getToken(Stage9Parser.DECLARE, 0);
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
