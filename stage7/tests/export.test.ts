import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('export forms end-to-end', () => {
  fromSourceEndToEnd(`(program
    (import (object (:named (array (object (:name "asrt"))))) "./helpers")

    ;; (export name expr) — declares and immediately exports a constant.
    ;; The name remains accessible in the same program scope.
    (export PI 3.14159)
    (asrt PI 3.14159)

    (export APP_NAME "myapp")
    (asrt APP_NAME "myapp")

    ;; (export-named (x) ...) — re-exports an already-declared name.
    ;; The variable is still accessible locally after the re-export.
    (let (version) "1.0.0")
    (export-named (version))
    (asrt version "1.0.0")

    ;; (export-named (x alias)) — re-exports under a different name.
    (let (internalCount) 42)
    (export-named (internalCount count))
    (asrt internalCount 42)

    ;; (export-default expr) — default export; smoke test that it compiles and runs.
    (export-default "hello")
  )`);
}, 30_000);
