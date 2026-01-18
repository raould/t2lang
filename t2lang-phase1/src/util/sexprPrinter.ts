// Re-export the shared common sexpr printer so Phase1 doesn't duplicate logic.
// Use runtime import of the common sexpr printer implementation.

// Load the runtime implementation from the workspace `common` package source
// using a runtime URL to avoid TypeScript static analysis pulling the file
// under this project's `rootDir` during compilation.
let impl: ((n: any) => string) | null = null;
try {
	const url = new URL('../../../common/src/ast/sexprPrinter.js', import.meta.url).href;
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const mod = await import(url);
	impl = (mod && (mod.printSexpr || mod.default)) as any;
} catch (e) {
	throw new Error('Failed to load common sexprPrinter at runtime: ' + String(e));
}

export const printSexpr: (n: any, opts?: any) => string = impl as any;
export default printSexpr;
