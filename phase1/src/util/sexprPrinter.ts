// Re-export the shared common sexpr printer implementation from the canonical
// package so Phase1 doesn't rely on a runtime URL hack or top-level await.
// Delegate to the packaged `t2lang-common` at runtime while avoiding
// importing workspace source files into this project's `rootDir`.
// Statically re-export the sexpr printer from the packaged `t2lang-common`
// distribution so Phase1 can consume it without pulling `common/src` into
// this project's TypeScript program.
export { printSexpr } from 't2lang-common/sexprPrinter.js';

// Consumers import like: `import { printSexpr } from './util/sexprPrinter.js'`.
