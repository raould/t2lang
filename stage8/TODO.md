# Todos

* [x] Implement macro system in `Stage8`
    * [x] Update `Stage8.g4` with `macro-import`/`macro-export`
    * [x] Implement `macro-import` resolution in `Stage8-macro-expand.s7` or a new pass
    * [x] Implement `macro-export` handling
    * [x] Create `Stage8-macro-compile.ts` (or similar) to handle compiling `.t2m` files to JS
    * [x] Support `import()` of compiled macro modules
    * [x] Implement transitive macro imports (Phase 4)
* [ ] Fix `unquote-splicing` edge cases in `Stage8-macro-expand.s7`
* [ ] Add more tests for macros
