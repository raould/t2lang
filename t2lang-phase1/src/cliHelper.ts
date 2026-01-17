// Wrapper that delegates to the shared common CLI helper implementation
// using the workspace `common` source so behavior is persistent and
// works in development without installing packages.
export async function runCli(
    notice: string,
    compileFn: (source: string, config?: Partial<any>) => Promise<any>,
    prettyEnum: { pretty: any; newlines: any; ugly: any },
    pkgPath?: string
): Promise<void> {
    // @ts-ignore: import from workspace source helper (exists at runtime)
    const mod = await import("../../common/src/cliHelper.js");
    return mod.runCli(notice, compileFn, prettyEnum, pkgPath);
}