// Thin wrapper: prefer the shared common sexpr printer at runtime.
let runtimePrinter: (n: any) => string = (n: any) => JSON.stringify(n);
try {
    // Try using the workspace common source directly (works during local dev/test).
    let found = false;
    try {
        // Try package export first (if installed in node_modules)
        const pkg = await import('t2lang-common/ast/sexprPrinter.js');
        if (pkg && typeof pkg.printSexpr === 'function') {
            runtimePrinter = pkg.printSexpr as (n: any) => string;
            found = true;
        }
    } catch {
        // ignore and try local source next
    }

    if (!found) {
        try {
            // Import the local workspace source using a runtime URL to avoid
            // TypeScript static analysis of the path (which triggers rootDir errors).
            const localUrl = new URL('../../../common/src/ast/sexprPrinter.js', import.meta.url).href;
            const localCommon = await import(localUrl);
            if (localCommon && typeof localCommon.printSexpr === 'function') {
                runtimePrinter = localCommon.printSexpr as (n: any) => string;
            }
        } catch {
            // keep JSON fallback
        }
    }
} catch {
    // keep JSON fallback
}

export function printSexpr(n: any): string {
    return runtimePrinter(n);
}

export default printSexpr;
