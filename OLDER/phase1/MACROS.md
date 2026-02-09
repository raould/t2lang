# Phase 1 Implementation Plan: Hygienic Macros

## Overview
Implement hygienic macros in the style of Clojure, where macros must explicitly use `gensym` to avoid variable capture.

* ensure the macro system is designed robustly: repeatedly applies macros until no more macro forms are present, effectively reaching a steady state of fully expanded code before compilation, using functions like macroexpand and macroexpand-1 to process nested or sequential macro calls.
* Compile-Time Process: Macros run during compile time (or load time), not runtime, transforming code (represented as data structures) into different code
* macroexpand-1: This function expands the outermost macro in a form, once.
* macroexpand: This function repeatedly calls macroexpand-1 on a form until no more macros are found, returning the final, fully expanded code.
* Nested Macros: If Macro A expands into code containing Macro B, macroexpand will first expand A, then process the resulting code to expand B (and any other macros) until everything is resolved.

## Key Components

### 1. Gensym Function
- Add `gensym` as a built-in function that generates unique symbols.
- Symbols have the form `prefix__auto__<number>` or similar.

### 2. Macro Definition
- Syntax: `(defmacro name (args...) body)`
- Macros are collected during parsing/compilation.

### 3. Macro Expansion
- Add a macro expansion phase after parsing, before resolve.
- Expand macro calls by executing the macro body.

### 4. Execution of Macro Body
- Since T2 isn't self-hosting, implement a minimal interpreter or compile macro bodies to JS and eval.
- For simplicity, start with macros that return quoted forms.

### 5. Hygiene
- Manual: macro writers use `gensym` to create unique variables.
- Example: `(defmacro my-if (cond then else) `(if ~cond ~then ~else))` but hygienic version uses gensym for temps.

## Steps
1. Add gensym to the AST and codegen.
2. Add defmacro parsing.
3. Implement macro expansion logic.
4. Add tests for simple macros.