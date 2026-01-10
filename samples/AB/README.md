# samples/AB

This example shows two separate `.t2` files compiled into `A.ts` and `B.ts`, where `B` imports from `A`.

## Files
- A.t2: exports `VALUE` and `addValue`.
- B.t2: imports from `./A` and re-exports `useA` plus `RESULT`.

## Build (from repo root)
- Compile each file:
  - `node bin/t2tc.cjs samples/AB/A.t2`
  - `node bin/t2tc.cjs samples/AB/B.t2`

## Output
The generated `B.ts` will include a standard import:

```
import { addValue, VALUE } from "./A";
```

This works as long as `A.ts` and `B.ts` are emitted into the same folder so the relative path stays valid.
