// Phase1 S-expression printer (reuses generic logic but allows Phase1-only kinds)
export function printSexpr(node: any): string {
    const seen = new WeakSet();

    function atom(v: any): string {
        if (v === null) return 'null';
        if (v === undefined) return 'undefined';
        if (typeof v === 'string') return /^[A-Za-z_\-+*<>=%][A-Za-z0-9_\-+*<>=%.]*$/.test(v) ? v : '"' + v.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
        if (typeof v === 'number' || typeof v === 'boolean') return String(v);
        return '"' + String(v).replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
    }

    function rec(n: any): string {
        if (n === null || n === undefined) return atom(n);
        if (typeof n === 'string' || typeof n === 'number' || typeof n === 'boolean') return atom(n);
        if (Array.isArray(n)) return '(' + n.map(rec).join(' ') + ')';
        if (seen.has(n)) return '...';
        if (typeof n === 'object') {
            seen.add(n);
            const kind = n.kind || n.type || null;
            if (kind === 'program') {
                return `(program ${(n.body || []).map(rec).join(' ')})`;
            }
            if (kind === 'call') {
                return `(${rec(n.callee)} ${(n.args || []).map(rec).join(' ')})`;
            }
            if (kind === 'identifier') return String(n.name);
            if (kind === 'literal') return atom(n.value);
            if (kind === 'quote') return `(quote ${rec(n.expr)})`;
            if (kind === 'unquote') return `(unquote ${rec(n.expr)})`;
            if (kind === 'unquote-splice') return `(unquote-splice ${rec(n.expr)})`;
            if (kind === 'defmacro') return `(defmacro ${rec(n.name)} ${(n.params || []).map(rec).join(' ')} ${(n.body || []).map(rec).join(' ')})`;
            if (kind === 'gensym') return `(gensym ${n.prefix || ''})`;
            if (kind === 'array') return `(array ${(n.elements || []).map(rec).join(' ')})`;
            if (kind === 'object') return `(object ${(n.fields || []).map((f: any) => `(field ${atom(f.name)} ${rec(f.value)})`).join(' ')})`;
            if (kind === 'prop') return `(prop ${rec(n.object)} ${atom(n.property)})`;
            // Generic fallback: print keys
            const parts: string[] = [];
            if (kind) parts.push(kind);
            for (const k of Object.keys(n)) {
                if (k === 'kind' || k === 'location') continue;
                parts.push(`(${k} ${rec((n as any)[k])})`);
            }
            return '(' + parts.join(' ') + ')';
        }
        return atom(String(n));
    }

    return rec(node);
}

export default printSexpr;
