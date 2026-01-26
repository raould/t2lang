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
        // Treat semicolon as start-of-line comment; skip until end-of-line
        if (ch === ';') {
            let j = i + 1;
            while (j < src.length && src[j] !== '\n' && src[j] !== '\r') j++;
            i = j;
            continue;
        }
        if (ch === '(' || ch === ')') {
            tokens.push(ch);
            i++;
            continue;
        }
        if (ch === ',') {
            tokens.push(',');
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
        // treat comma as delimiter as well so atoms like "number," are split
        while (j < src.length && !/\s|\(|\)|,/.test(src[j])) {
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
            // For non-head positions, rewrite dotted atoms like `a.b.c` into
            // nested (prop ...) nodes so expressions such as
            // `(assign this.firstName val)` become
            // `(assign (prop this "firstName") val)`.
            // We do not rewrite the head (index 0) here because head-specific
            // rewrites (dotted-head -> call) are handled below.
            if (i > 0 && /^[A-Za-z_$][A-Za-z0-9_$]*(?:\.[A-Za-z_$][A-Za-z0-9_$]*)+$/.test(el)) {
                // build nested prop node
                const parts = (el as string).split('.');
                let propNode: Node = parts[0];
                for (let j = 1; j < parts.length; j++) {
                    propNode = ['prop', propNode, `"${parts[j]}"`];
                }
                out.push(propNode);
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
    // Assignment sugar: (TARGET := VALUE)
    // Support forms where TARGET is an identifier, dotted head like `this.x`,
    // or a parenthesized expression (which will be validated as an l-value).
    if (out.length >= 2 && out[1] === ':=') {
        // Determine target node
        let target: Node;
        if (Array.isArray(out[0])) {
            target = transform(out[0]);
        } else if (typeof out[0] === 'string') {
            const headTok = out[0] as string;
            // dotted identifier -> prop nodes
            if (/^[A-Za-z_$][A-Za-z0-9_$]*(?:\.[A-Za-z_$][A-Za-z0-9_$]*)+$/.test(headTok)) {
                const parts = headTok.split('.');
                let propNode: Node = parts[0];
                for (let j = 1; j < parts.length; j++) {
                    propNode = ['prop', propNode, `"${parts[j]}"`];
                }
                target = propNode;
            } else {
                target = headTok;
            }
        } else {
            target = transform(out[0]);
        }

        // Basic L-value validation: identifier, prop, or index
        function isValidLValue(n: Node): boolean {
            if (typeof n === 'string') return /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(n);
            if (Array.isArray(n)) {
                const h = n[0];
                if (h === 'prop' || h === 'index') return true;
            }
            return false;
        }

        if (!isValidLValue(target)) {
            throw new Error(`invalid assignment target: ${nodeToString(target)}`);
        }

        // value is the third element
        const value = out.length >= 3 ? out[2] : null;
        if (value === null) {
            throw new Error('assignment missing value');
        }
        const newNode: Node[] = ['assign', target, transform(value as Node)];
        return newNode as Node;
    }

    if (out.length > 0 && typeof out[0] === 'string') {
        const head = out[0] as string;
        // Single-binding let/const sugar: (let x [: TYPE] VALUE body...)
        // desugar into (let* ((x VALUE)) body...) and if a type is present
        // wrap VALUE in (type-assert VALUE TYPE) so Phase0 can parse the type.
        if ((head === 'let' || head === 'const') && out.length >= 3 && typeof out[1] === 'string') {
            const nameTok = out[1] as string;
            let name = nameTok;
            let idx = 2;
            let typeNode: Node | null = null;

            // handle attached colon: "x:" -> next token is type
            const mColon = nameTok.match(/^(.+):$/);
            if (mColon) {
                name = mColon[1];
                if (out.length > 2) {
                    typeNode = out[2] as Node;
                    idx = 3;
                }
            } else if (out[2] === ':') {
                // separate ':' token form
                if (out.length > 3) {
                    typeNode = out[3] as Node;
                    idx = 4;
                }
            }

            // Must have a value expression at idx
            if (out.length > idx) {
                const valueNode = out[idx] as Node;
                    // Build binding list: for typed form produce ((name type) init) else (name init)
                    const newHead = head === 'let' ? 'let*' : 'const*';
                    const body = out.slice(idx + 1);
                    let bindingElem: Node;
                    if (typeNode) {
                        bindingElem = [ [ name, typeNode ], valueNode ];
                    } else {
                        bindingElem = [ name, valueNode ];
                    }
                    const bindingList: Node = [ bindingElem ];
                    const newNode: Node = [ newHead, bindingList, ...body ];
                    return transform(newNode) as Node;
            }
        }
        if (head === 'field') {
            // Field form may include optional modifiers before the name
            // e.g. (field public static "name" ...) or (field public "name" ...)
            // Find the first token that is not a known modifier and ensure
            // it is a quoted string (the actual field name).
            const modifiers = new Set(['public', 'protected', 'private', 'static', 'readonly']);
            let nameIdx = 1;
            while (nameIdx < out.length && typeof out[nameIdx] === 'string' && modifiers.has(out[nameIdx] as string)) {
                nameIdx++;
            }
            if (out.length > nameIdx && typeof out[nameIdx] === 'string') {
                const nameTok = out[nameIdx] as string;
                if (!/^".*"$/.test(nameTok) && !/^~/.test(nameTok)) {
                    out[nameIdx] = `"${nameTok}"`;
                }
            }
        }
        if (head === 'prop') {
            // prop OBJ KEY -> ensure KEY is quoted
            if (out.length >= 3 && typeof out[2] === 'string') {
                const keyTok = out[2] as string;
                if (!/^".*"$/.test(keyTok) && !/^~/.test(keyTok)) {
                    out[2] = `"${keyTok}"`;
                }
            }
        }
        // Dotted-head sugar: allow concise method call syntax like
        // (a.b c) -> (call (prop a "b") c)
        if (/^[A-Za-z_$][A-Za-z0-9_$]*(?:\.[A-Za-z_$][A-Za-z0-9_$]*)+$/.test(head)) {
            const parts = (head as string).split('.');
            // build nested (prop ..) nodes: (prop (prop a "b") "c")
            let propNode: Node = parts[0];
            for (let j = 1; j < parts.length; j++) {
                propNode = ['prop', propNode, `"${parts[j]}"`];
            }
            // If there are arguments, rewrite into (call PROP args...)
            // Support two sugar styles:
            //  - (obj.method arg1 arg2)
            //  - (obj.method(arg1 arg2))  -> single nested list after head is treated as arglist
            if (out.length >= 2) {
                let args: Node[];
                // If the single following element is itself a parenthesized
                // arglist (e.g. parsed as an Array), treat its contents as
                // the call arguments so `(obj.m(1 2))` -> call with 1,2.
                if (out.length === 2 && Array.isArray(out[1])) {
                    // Only treat a single nested list as the arglist when the
                    // nested list is not itself a special-form head like
                    // `(call ...)` or `(fn ...)`. This avoids flattening
                    // forms such as `(console.log (call (person.getFullName)))`
                    // into `(console.log call person.getFullName)`.
                    const inner = out[1] as Node[];
                    const innerHead = inner.length > 0 && typeof inner[0] === 'string' ? inner[0] as string : null;
                    const SPECIAL_HEADS = new Set(["call", "assign", "let*", "const*", "fn", "if", "new", "class", "prop", "index", "returns", "typed"]);
                    if (innerHead && SPECIAL_HEADS.has(innerHead)) {
                        // Keep the inner special-form as a single argument node
                        // (do not spread its elements). We'll transform it as
                        // a child node so it remains a single expression.
                        args = [ transform(inner) ] as Node[];
                    } else {
                        args = inner.slice();
                    }
                } else {
                    args = out.slice(1) as Node[];
                }
                const newNode: Node[] = ['call', propNode, ...args];
                return transform(newNode) as Node;
            }
            // If it's a single-element list like `(this.foo)`, treat it as
            // a property access `(prop this "foo")` (not a call).
            return transform(propNode) as Node;
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

    // Function sugar: allow param and return shorthand like
    // (fn name? (a: number (b string)) : number body...)
    if (out.length > 0 && typeof out[0] === 'string' && out[0] === 'fn') {
        // Identify where the params list is. Possible shapes:
        // (fn (params) body...)
        // (fn name (params) body...)
        let paramsIdx = 1;
        if (out.length > 2 && typeof out[1] === 'string' && Array.isArray(out[2])) {
            // named function
            paramsIdx = 2;
        }

        if (out.length > paramsIdx && Array.isArray(out[paramsIdx])) {
            const rawParams = out[paramsIdx] as Node[];
            // allow commas as separators in param lists; filter them out
            const cleanedParams = rawParams.filter(p => !(typeof p === 'string' && p === ','));
            const newParams: Node[] = [];
            for (let i = 0; i < cleanedParams.length; i++) {
                const el = cleanedParams[i];
                // Already a parenthesized pair like (name type)
                if (Array.isArray(el)) {
                    newParams.push(transform(el));
                    continue;
                }
                if (typeof el === 'string') {
                    // name: (colon attached) e.g. "x:"
                    const mColon = el.match(/^(.+):$/);
                    if (mColon && cleanedParams.length > i + 1) {
                        const name = mColon[1];
                        const typeNode = cleanedParams[i + 1];
                        newParams.push([name, transform(typeNode as Node)]);
                        i++;
                        continue;
                    }
                    // name : type  (three-token form)
                    if (cleanedParams.length > i + 2 && cleanedParams[i + 1] === ':' ) {
                        const name = el;
                        const typeNode = cleanedParams[i + 2];
                        newParams.push([name, transform(typeNode as Node)]);
                        i += 2;
                        continue;
                    }
                    // plain name
                    newParams.push(el);
                    continue;
                }
            }
            out[paramsIdx] = newParams;
        }

        // Return shorthand: convert trailing ": TYPE" into (returns TYPE)
        // Scan after paramsIdx for a standalone ':' token
        for (let j = paramsIdx + 1; j < out.length - 1; j++) {
            if (out[j] === ':' && out[j + 1]) {
                const typeNode = out[j + 1];
                // replace the two tokens with a single (returns TYPE) node
                const before = out.slice(0, j);
                const after = out.slice(j + 2);
                const returnsNode: Node = ['returns', transform(typeNode as Node)];
                const combined: Node[] = [...before, returnsNode, ...after];
                return transform(combined) as Node;
            }
        }
    }

    // Method sugar: allow typed params inside method definitions like
    // (method "name" (a: string, b: number) body...)
    if (out.length > 0 && typeof out[0] === 'string' && out[0] === 'method') {
        // method shape: (method "name" (params...) body...)
        let paramsIdx = 2;
        if (out.length > paramsIdx && Array.isArray(out[paramsIdx])) {
            const rawParams = out[paramsIdx] as Node[];
            const cleanedParams = rawParams.filter(p => !(typeof p === 'string' && p === ','));
            const newParams: Node[] = [];
            for (let i = 0; i < cleanedParams.length; i++) {
                const el = cleanedParams[i];
                if (Array.isArray(el)) {
                    newParams.push(transform(el));
                    continue;
                }
                if (typeof el === 'string') {
                    const mColon = el.match(/^(.+):$/);
                    if (mColon && cleanedParams.length > i + 1) {
                        const name = mColon[1];
                        const typeNode = cleanedParams[i + 1];
                        newParams.push([name, transform(typeNode as Node)]);
                        i++;
                        continue;
                    }
                    if (cleanedParams.length > i + 2 && cleanedParams[i + 1] === ':') {
                        const name = el;
                        const typeNode = cleanedParams[i + 2];
                        newParams.push([name, transform(typeNode as Node)]);
                        i += 2;
                        continue;
                    }
                    newParams.push(el);
                    continue;
                }
            }
            out[paramsIdx] = newParams;
        }
        // Return shorthand: convert trailing ": TYPE" into (returns TYPE)
        for (let j = paramsIdx + 1; j < out.length - 1; j++) {
            if (out[j] === ':' && out[j + 1]) {
                const typeNode = out[j + 1];
                const before = out.slice(0, j);
                const after = out.slice(j + 2);
                const returnsNode: Node = ['returns', transform(typeNode as Node)];
                const combined: Node[] = [...before, returnsNode, ...after];
                return transform(combined) as Node;
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
    // Convert parenthesized dot-sigil fields like `(.name: Type)` into
    // canonical form `("name" Type)` so the Phase0 parser sees a
    // normal string field name followed by the type expression.
    // Match `(` then optional space, then `.name` (allowing dots/hyphens),
    // optional space, then `:` (with optional space). Replace the prefix
    // with `("name" ` and leave the rest of the expression intact.
    // Convert `(.name: Type` into `(field "name" ` so the Phase0 parser
    // accepts the class body item as a `field` form. The macro expander
    // will normalize a following type token into the canonical field shape.
    // Convert `(.name: Type)` into `(field "name" Type)` so the Phase0
    // parser sees a normal field form. Keep the replacement minimal
    // (no extra ':' token) to preserve older test expectations.
        // Replace parenthesized dot-sigil fields like `(.name: Type)`.
        // When used inside a `type-object` we need the form `("name" Type)`;
        // when used inside a `class` body we need `(field "name" Type ...)`.
        // Heuristically inspect the nearest surrounding list head to choose.
        const dotFieldRegex = /\(\s*\.\s*([A-Za-z0-9_.-]+)\s*:/g;
        let preprocessed = '';
        let last = 0;
        let m: RegExpExecArray | null;
        while ((m = dotFieldRegex.exec(source)) !== null) {
            const idx = m.index;
            const name = m[1];
            preprocessed += source.slice(last, idx);
            // find the nearest '(' that opens the list containing this dot-sigil
            // Walk backwards over any inner '(' until we find a surrounding
            // list whose head is an identifier (e.g. 'type-object' or 'class').
            let scanPos = idx - 1;
            let headWord: string | null = null;
            while (scanPos >= 0) {
                const headOpen = source.lastIndexOf('(', scanPos);
                if (headOpen === -1) break;
                const slice = source.slice(headOpen + 1, idx);
                const hm = slice.match(/^[\s\n\r]*([A-Za-z0-9_\-]+)/);
                if (hm) { headWord = hm[1]; break; }
                // move before this '(' and try earlier one
                scanPos = headOpen - 1;
            }
            if (headWord === 'type-object') {
                // Emit as a field form for consistency with Phase1 tests
                // and to make downstream parsing uniform.
                preprocessed += `(field "${name}" `;
                last = idx + m[0].length;
            } else {
                // For class bodies, try to drop the inline type token so the
                // resulting `(field "name" INIT)` is parsed with the initializer
                // as the field initializer (the type will be handled by the
                // macro expander/typechecker).
                // Scan ahead to the closing ')' of this small paren and remove
                // the first atom (the type) if present.
                const restOpen = idx + m[0].length;
                const closeIdx = source.indexOf(')', restOpen);
                if (closeIdx !== -1) {
                    // slice between restOpen and closeIdx
                    const inner = source.slice(restOpen, closeIdx);
                    // split into tokens (simple split on whitespace)
                    const tokens = inner.trim().split(/\s+/).filter(t => t.length > 0);
                    // first token is the type, remainder are initializer tokens
                    const typeTok = tokens.length > 0 ? tokens[0] : '';
                    const remaining = tokens.length > 1 ? tokens.slice(1).join(' ') : '';
                    // Wrap type and initializer in a `(typed ...)` form so the
                    // macro expander can separate the type annotation from the
                    // initializer while keeping the Phase0 parser unchanged.
                    if (typeTok) {
                        if (remaining) {
                            preprocessed += `(field "${name}" (typed ${typeTok} ${remaining}))`;
                        } else {
                            preprocessed += `(field "${name}" (typed ${typeTok}))`;
                        }
                    } else {
                        preprocessed += `(field "${name}" ${remaining ? remaining : ''})`;
                    }
                    last = closeIdx + 1; // skip past the closing paren
                } else {
                    preprocessed += `(field "${name}" `;
                    last = idx + m[0].length;
                }
            }
        }
        if (last === 0) preprocessed = source; else preprocessed += source.slice(last);
    const tokens = tokenize(preprocessed);
    const nodes: Node[] = [];
    let i = 0;
    while (i < tokens.length) {
        const res = parseTokens(tokens, i);
        nodes.push(res.node);
        i = res.next;
    }
    // Normalize top-level dotted atoms into (prop ...) nodes so bare
    // expressions like `this.firstName` are accepted as sugar and
    // rewritten into canonical `(prop this "firstName")` form.
    for (let k = 0; k < nodes.length; k++) {
        const n = nodes[k];
        if (typeof n === 'string') {
            if (/^[A-Za-z_$][A-Za-z0-9_$]*(?:\.[A-Za-z_$][A-Za-z0-9_$]*)+$/.test(n)) {
                const parts = (n as string).split('.');
                let propNode: Node = parts[0];
                for (let j = 1; j < parts.length; j++) {
                    propNode = ['prop', propNode, `"${parts[j]}"`];
                }
                nodes[k] = propNode;
            }
        }
    }
    const transformed = nodes.map(n => transform(n));
    const outText = transformed.map(n => nodeToString(n)).join('\n');
    return outText;
}

// Return both rewritten text and a greedy char-mapping from rewritten
// indices back to original source indices. The mapping is an array where
// map[i] = originalIndex for the character at rewritten[i]. This is a
// best-effort mapping (greedy subsequence match) to allow diagnostics
// translation; it's sufficient for locating tokens and line/column info.
export function rewriteSugarWithMap(source: string): { text: string; map: number[] } {
    const text = rewriteSugar(source);
    const map: number[] = new Array(text.length).fill(0);
    let srcIdx = 0;
    for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        let found = -1;
        for (let j = srcIdx; j < source.length; j++) {
            if (source[j] === ch) { found = j; srcIdx = j + 1; break; }
        }
        if (found === -1) {
            // fallback: search from beginning
            for (let j = 0; j < srcIdx; j++) { if (source[j] === ch) { found = j; break; } }
        }
        map[i] = found === -1 ? Math.min(source.length, srcIdx) : found;
    }
    return { text, map };

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
