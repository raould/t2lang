// Phase1-only sugar rewrite (reduced):
// This module performs small, structural rewrites that are convenient
// to do at the sexpr level. Lexical/token-level sugars (dotted
// identifiers, leading dot-sigils) are handled in the Phase1 `Lexer`.
// Context-sensitive canonicalization for types (e.g. `type-object`
// field normalization) is performed in the `MacroExpander` so the
// parser and Phase0 remain minimal and stable.

type Node = string | Node[];

function tokenize(src: string): string[] {
    const tokens: string[] = [];
    let i = 0;
    while (i < src.length) {
        const ch = src[i];
        if (ch === '(' || ch === ')') {
            tokens.push(ch);
            i++;
            continue;
        }
        if (ch === '"') {
            // string
            let j = i + 1;
            let s = '"';
            while (j < src.length) {
                const c = src[j];
                s += c;
                j++;
                if (c === '"' && src[j - 2] !== '\\') break;
            }
            tokens.push(s);
            i = j;
            continue;
        }
        if (/\s/.test(ch)) { i++; continue; }
        // atom
        let j = i;
        let atom = '';
        while (j < src.length && !/\s|\(|\)/.test(src[j])) {
            atom += src[j];
            j++;
        }
        tokens.push(atom);
        i = j;
    }
    return tokens;
}

function parseTokens(tokens: string[], idx = 0): { node: Node; next: number } {
    if (tokens[idx] === '(') {
        const arr: Node[] = [];
        let i = idx + 1;
        while (i < tokens.length && tokens[i] !== ')') {
            const res = parseTokens(tokens, i);
            arr.push(res.node);
            i = res.next;
        }
        return { node: arr, next: (tokens[i] === ')') ? i + 1 : i };
    }
    return { node: tokens[idx], next: idx + 1 };
}

// Note: dotted identifier -> prop transformation is handled in the macro expander.

function transform(node: Node): Node {
    if (typeof node === 'string') {
        return node;
    }
    // node is array
    const arr = node.slice() as Node[];

    // (type-object) specific canonicalization is handled in the macro expander
    // and the lexer now tokenizes dot-sigil forms; keep transform focused on
    // generic structural rewrites.

    // First pass: handle inline sigil elements like #name: EXPR
    const out: Node[] = [];
    for (let i = 0; i < arr.length; i++) {
        const el = arr[i];
        if (typeof el === 'string') {
            // inline sigil handling moved to lexer/macro; leave atoms unchanged
        }
        // handle plain (field name EXPR) where name is bare identifier
        if (Array.isArray(el)) {
            out.push(transform(el));
            continue;
        }
        out.push(el);
    }

    // Second pass: specific list-head rewrites
    if (out.length > 0 && typeof out[0] === 'string') {
        const head = out[0] as string;
        if (head === 'field') {
            // ensure second element is quoted string
            if (out.length >= 2 && typeof out[1] === 'string') {
                const nameTok = out[1] as string;
                if (!/^".*"$/.test(nameTok) && !/^~/.test(nameTok)) {
                    out[1] = `"${nameTok}"` as any;
                }
            }
        }
        if (head === 'prop') {
            // prop OBJ KEY -> ensure KEY is quoted
            if (out.length >= 3 && typeof out[2] === 'string') {
                const keyTok = out[2] as string;
                if (!/^".*"$/.test(keyTok) && !/^~/.test(keyTok)) {
                    out[2] = `"${keyTok}"` as any;
                }
            }
        }
        // Dotted-head sugar: allow concise method call syntax like
        // (a.b c) -> (call (prop a "b") c)
        if (/^[A-Za-z_$][A-Za-z0-9_$]*(?:\.[A-Za-z_$][A-Za-z0-9_$]*)+$/.test(head) && out.length >= 2) {
            const parts = (head as string).split('.');
            // build nested (prop ..) nodes: (prop (prop a "b") "c")
            let propNode: Node = parts[0];
            for (let j = 1; j < parts.length; j++) {
                propNode = ['prop', propNode, `"${parts[j]}"`];
            }
            // rewrite into (call PROP args...)
            const args = out.slice(1);
            const newNode: Node[] = ['call', propNode, ...args];
            return transform(newNode) as Node;
        }
        // Bracketed computed form in head: a["x"] -> (prop a "x")
        const bracketMatch = (head as string).match(/^([A-Za-z_$][A-Za-z0-9_$]*)\s*\[\s*(".*?"|'.*?')\s*\]$/);
        if (bracketMatch && out.length >= 2) {
            const base = bracketMatch[1];
            const key = bracketMatch[2];
            const propNode: Node = ['prop', base, key as string];
            const args = out.slice(1);
            const newNode: Node[] = ['call', propNode, ...args];
            return transform(newNode) as Node;
        }
    }

    // Recursively transform children (ensure strings like `a.b` are transformed)
    return out.map(e => transform(e as Node)) as Node;
}

function nodeToString(node: Node): string {
    if (typeof node === 'string') return node;
    return '(' + node.map(n => nodeToString(n)).join(' ') + ')';
}

export function rewriteSugar(source: string): string {
    // Convert parenthesized dot-sigil fields like `(.name: Type)` into
    // canonical form `("name" Type)` so the Phase0 parser sees a
    // normal string field name followed by the type expression.
    // Match `(` then optional space, then `.name` (allowing dots/hyphens),
    // optional space, then `:` (with optional space). Replace the prefix
    // with `("name" ` and leave the rest of the expression intact.
    const preprocessed = source.replace(/\(\s*\.\s*([A-Za-z0-9_.-]+)\s*:/g, (_m, p1) => `("${p1}" `);
    const tokens = tokenize(preprocessed);
    const nodes: Node[] = [];
    let i = 0;
    while (i < tokens.length) {
        const res = parseTokens(tokens, i);
        nodes.push(res.node);
        i = res.next;
    }
    const transformed = nodes.map(n => transform(n));
    return transformed.map(n => nodeToString(n)).join('\n');
}

export default rewriteSugar;

// Debug helper: parse source into nodes (before transform) for inspection
export function parseToNodes(source: string): Node[] {
    const tokens = tokenize(source);
    const nodes: Node[] = [];
    let i = 0;
    while (i < tokens.length) {
        const res = parseTokens(tokens, i);
        nodes.push(res.node);
        i = res.next;
    }
    return nodes;
}
