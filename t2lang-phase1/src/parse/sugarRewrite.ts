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

function buildPropNode(parts: string[]): Node {
    if (parts.length === 2) {
        const [obj, key] = parts;
        const keyTok = (/^".*"$/.test(key) || /^~/.test(key)) ? key : `"${key}"`;
        return ['prop', obj, keyTok] as Node;
    }
    const last = parts[parts.length - 1];
    const rest = parts.slice(0, parts.length - 1);
    return ['prop', buildPropNode(rest), (/^".*"$/.test(last) || /^~/.test(last)) ? last : `"${last}"`] as Node;
}

function transform(node: Node): Node {
    if (typeof node === 'string') {
        // transform dotted access like `a.b` or `a.b.c` into nested (prop ...)
        const dotted = (node as string).match(/^([A-Za-z_$][\w$]*)(?:\.([A-Za-z_$][\w$]*))+$/);
        if (dotted) {
            const parts = (node as string).split('.');
            return buildPropNode(parts);
        }
        return node;
    }
    // node is array
    const arr = node.slice() as Node[];

    // Special-case: type-object entries use a different shape. Convert
    // `(#name: Type)` into `("name" (type-ref "Type"))` inside type-object.
    if (arr.length > 0 && typeof arr[0] === 'string' && (arr[0] as string) === 'type-object') {
        const out: Node[] = [];
        out.push(arr[0]);
        for (let i = 1; i < arr.length; i++) {
            const child = arr[i];
            if (Array.isArray(child) && typeof child[0] === 'string') {
                const m = (child[0] as string).match(/^(?:\/|\.)([A-Za-z_][\w$]*):$/);
                if (m) {
                    const name = m[1];
                    const typeEl = child[1];
                    const typeName = (typeof typeEl === 'string') ? (typeEl as string) : nodeToString(typeEl as Node);
                    out.push([`"${name}"`, ['type-ref', `"${typeName.replace(/^"|"$/g, '')}"`]] as Node);
                    continue;
                }
            }
            out.push(transform(child as Node));
        }
        return out.map(e => transform(e as Node)) as Node;
    }

    // First pass: handle inline sigil elements like #name: EXPR
    const out: Node[] = [];
    for (let i = 0; i < arr.length; i++) {
        const el = arr[i];
        if (typeof el === 'string') {
            // dotted access in-list: convert `a.b.c` -> nested (prop ...)
            const s = el as string;
            if (/^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*)+$/.test(s)) {
                out.push(buildPropNode(s.split('.')));
                continue;
            }
            const m = s.match(/^(?:\/|\.)([A-Za-z_][\w$]*):$/);
            if (m) {
                const name = m[1];
                // consume next element as expression
                const nextEl = arr[++i];
                out.push(['field', `"${name}"`, transform(nextEl)] as Node);
                continue;
            }
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
