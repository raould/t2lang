// Simple S-expression printer for AST nodes
export interface PrintOpts {
    compact?: boolean;
}

function escapeString(s: string): string {
    return '"' + s.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
}

function isPlainObject(v: any): boolean {
    return v && typeof v === 'object' && !Array.isArray(v);
}

const idRegex = new RegExp('^[A-Za-z_\\-+*\\/<>=%][A-Za-z0-9_\\-+*\\/<>=%.]*$');

function atomToString(v: any): string {
    if (v === null) return 'null';
    if (v === undefined) return 'undefined';
    if (typeof v === 'string') return idRegex.test(v) ? v : escapeString(v);
    if (typeof v === 'number' || typeof v === 'boolean') return String(v);
    return escapeString(String(v));
}

export function printSexpr(node: any, opts: PrintOpts = {}): string {
    // reference opts to avoid unused-parameter TS error in some build configs
    void opts;
    const seen = new WeakSet<any>();

    function inner(n: any): string {
        if (n === null || n === undefined) return atomToString(n);
        if (typeof n === 'string') {
            const s = n as string;
            const t = s.trim();
            if ((t.startsWith('{') || t.startsWith('[')) && (t.endsWith('}') || t.endsWith(']'))) {
                try {
                    const parsed = JSON.parse(s);
                    return inner(parsed);
                } catch {
                    // Try a lightweight unescape of typical JSON-escaped quotes and reparse
                    try {
                        const unescaped = s.replace(/\\"/g, '"');
                        const t2 = unescaped.trim();
                        if ((t2.startsWith('{') || t2.startsWith('[')) && (t2.endsWith('}') || t2.endsWith(']'))) {
                            const parsed2 = JSON.parse(unescaped);
                            return inner(parsed2);
                        }
                    } catch {
                        // Fall through to default string handling
                    }
                }
            }
            return atomToString(n);
        }
        if (typeof n === 'number' || typeof n === 'boolean') return atomToString(n);
        if (Array.isArray(n)) {
            return '(' + n.map(inner).join(' ') + ')';
        }
        if (!isPlainObject(n)) return atomToString(n);
        if (seen.has(n)) return '...';
        seen.add(n);

        const kind = n.kind || n.type || n.nodeType || null;
        if (kind === 'program') {
            const body = (n.body || []).map(inner).join(' ');
            return `(program ${body})`;
        }
        if (kind === 'call') {
            const callee = inner(n.callee);
            const args = (n.args || []).map(inner).join(' ');
            return `(${callee} ${args})`;
        }
        if (kind === 'identifier') {
            return String(n.name);
        }
        if (kind === 'literal') {
            return atomToString(n.value);
        }
        if (kind === 'array') {
            const elems = (n.elements || []).map(inner).join(' ');
            return `(array ${elems})`;
        }
        if (kind === 'object') {
            const fields = (n.fields || []).map((f: any) => `(field ${atomToString(f.name)} ${inner(f.value)})`).join(' ');
            return `(object ${fields})`;
        }

        // Handle type-object field entries or generic { name: string, type: ... } shapes
        if (isPlainObject(n) && typeof (n as any).name === 'string' && ('type' in n)) {
            return `(field ${atomToString((n as any).name)} ${inner((n as any).type)})`;
        }
        if (kind === 'prop') {
            return `(prop ${inner(n.object)} ${atomToString(n.property)})`;
        }
        if (kind && typeof kind === 'string') {
            // Generic object: print kind and its significant children
            const parts: string[] = [kind];
            for (const k of Object.keys(n)) {
                if (k === 'kind' || k === 'location') continue;
                const v = (n as any)[k];
                if (v === null || v === undefined) continue;
                parts.push(`(${k} ${inner(v)})`);
            }
            return '(' + parts.join(' ') + ')';
        }

        // If we have a plain object with arbitrary string keys, print as
        // an (object (field name value) ...) sexpr rather than JSON.
        if (isPlainObject(n)) {
            const fields = Object.keys(n)
                .filter(k => k !== 'location')
                .map(k => `(field ${atomToString(k)} ${inner((n as any)[k])})`)
                .join(' ');
            return `(object ${fields})`;
        }

        // Fallback: dump JSON as atom
        return escapeString(JSON.stringify(n));
    }

    return inner(node);
}

export default printSexpr;
