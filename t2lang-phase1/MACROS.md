# Phase 1 Implementation Plan: Hygienic Macros

## Overview
Implement hygienic macros in the style of Clojure, where macros must explicitly use `gensym` to avoid variable capture.

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