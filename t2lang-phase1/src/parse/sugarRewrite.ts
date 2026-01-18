// Phase1-only sugar rewrite. Converts several ergonomic forms into
// Phase0 minimal sexprs before parsing.
// Supported rewrites:
//  - ("name" : Type)   -> ("name" (type-ref "Type"))
//  - (/name: EXPR)       -> (field "name" EXPR)
//  - (.name: EXPR)       -> (field "name" EXPR)
//  - (field name EXPR)   -> (field "name" EXPR)
//  - (prop OBJ name)     -> (prop OBJ "name")

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
    }

    // Recursively transform children (ensure strings like `a.b` are transformed)
    return out.map(e => transform(e as Node)) as Node;
}

function nodeToString(node: Node): string {
    if (typeof node === 'string') return node;
    return '(' + node.map(n => nodeToString(n)).join(' ') + ')';
}

export function rewriteSugar(source: string): string {
    const tokens = tokenize(source);
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
