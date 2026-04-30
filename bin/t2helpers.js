import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export function checkSource(source, label) {
  const errors = findUnderscoredKeywords(source);
  if (errors.length === 0) return;
  for (const e of errors) {
    process.stderr.write(
      `${label}:${e.line}:${e.col}: keyword error: ` +
      `'${e.found}' should be '${e.keyword}' (use hyphens, not underscores)\n`
    );
  }
  process.exit(1);
}

// Derive the keyword list from Stage10-tags.ts: any AST tag that contains a
// hyphen could be accidentally written with underscores by TypeScript users.
// We read the file as text so we don't need tsx to import it.
const tagsSource = readFileSync(resolve(__dirname, '../stage10/src/Stage10-tags.ts'), 'utf-8');
const HYPHENATED_KEYWORDS = [...tagsSource.matchAll(/"([a-z][a-z0-9]*(?:-[a-z0-9]+)+)"/g)]
  .map(m => m[1]);

// Replace the contents of strings and ;; comments with spaces, preserving
// newlines so that line numbers stay correct.
function stripCommentsAndStrings(source) {
  let out = '';
  let i = 0;
  const blank = (chunk) => chunk.replace(/[^\n]/g, ' ');
  while (i < source.length) {
    // triple-quoted string  """..."""
    if (source.startsWith('"""', i)) {
      const end = source.indexOf('"""', i + 3);
      const j = end === -1 ? source.length : end + 3;
      out += blank(source.slice(i, j));
      i = j;
    // ;; line comment
    } else if (source.startsWith(';;', i)) {
      const nl = source.indexOf('\n', i);
      const j = nl === -1 ? source.length : nl; // keep the newline itself
      out += blank(source.slice(i, j));
      i = j;
    // single-quoted string  '...'
    } else if (source[i] === "'") {
      let j = i + 1;
      while (j < source.length && source[j] !== "'") {
        if (source[j] === '\\') j++;
        j++;
      }
      j++; // consume closing quote
      out += blank(source.slice(i, j));
      i = j;
    // double-quoted string  "..."
    } else if (source[i] === '"') {
      let j = i + 1;
      while (j < source.length && source[j] !== '"') {
        if (source[j] === '\\') j++;
        j++;
      }
      j++;
      out += blank(source.slice(i, j));
      i = j;
    } else {
      out += source[i++];
    }
  }
  return out;
}

// Check source for underscore variants of hyphenated keywords.
// Returns an array of { keyword, found, line, col } objects.
function findUnderscoredKeywords(source) {
  const stripped = stripCommentsAndStrings(source);
  const errors = [];
  for (const kw of HYPHENATED_KEYWORDS) {
    const underscored = kw.replace(/-/g, '_');
    // Match the underscore form only when surrounded by non-identifier chars
    // (identifiers are [a-zA-Z0-9_$?] in Stage10).
    const re = new RegExp(`(?<![\\w$?])${underscored}(?![\\w$?])`, 'g');
    let m;
    while ((m = re.exec(stripped)) !== null) {
      // Compute line/col from offset
      const before = stripped.slice(0, m.index);
      const line = (before.match(/\n/g) ?? []).length + 1;
      const col = m.index - before.lastIndexOf('\n'); // 1-based
      errors.push({ keyword: kw, found: underscored, line, col });
    }
  }
  return errors;
}
