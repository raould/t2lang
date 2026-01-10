import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const lodash = require("../vendor/lodash.min.cjs") as { isEqual: (a: unknown, b: unknown) => boolean };

export const isEqual = lodash.isEqual;
