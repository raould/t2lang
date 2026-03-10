import { createRequire } from 'module';

const require = createRequire(import.meta.url);

// Remove a core tag to force the desugar assertion to fire when encountered.
const tags = require('../Stage8-tags');
tags.AST_TAG_SET.delete('prop-access');

// Delegate to the normal compiler entrypoint; it will read stdin as usual.
require('../index');
