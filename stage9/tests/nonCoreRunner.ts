import { createRequire } from 'module';
import { readFileSync } from 'fs';

const require = createRequire(import.meta.url);

// Remove a core tag to force the desugar assertion to fire when encountered.
const tags = require('../Stage9-tags');
tags.AST_TAG_SET.delete('prop-access');

// Use programmatic API instead of main()
const { compileSource } = require('../index');
const input = readFileSync(0, 'utf-8');
try {
  const result = compileSource({ source: input });
  process.stdout.write(result + '\n');
} catch (e: any) {
  console.error(e.message);
  process.exit(1);
}
