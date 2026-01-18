export function rewriteSugar(source: string): string {
    // Transform `("key" : Type)` into `("key" (type-ref "Type"))`
    // This is a simple, local text-based rewrite applied in Phase1 only.
    // Regex matches: ("..." : Identifier)
    const fieldColonRegex = /\(\s*"([^"]+)"\s*:\s*([A-Za-z0-9_$.]+)\s*\)/g;

    const out = source.replace(fieldColonRegex, (_m, key, typeName) => {
        return `(\"${key}\" (type-ref \"${typeName}\"))`;
    });

    return out;
}

export default rewriteSugar;
