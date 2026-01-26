export interface SpliceMarker {
    kind: '__splice';
    items: unknown[];
    location?: unknown;
}

export function isSplice(node: unknown): node is SpliceMarker {
    if (!node || typeof node !== 'object') return false;
    const o = node as Record<string, unknown>;
    return o.kind === '__splice' && Array.isArray(o.items);
}
