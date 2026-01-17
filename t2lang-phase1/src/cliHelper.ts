// Wrapper that delegates to the shared common CLI helper implementation.
export async function runCli(notice: string, compileFn: (source: string, config?: Partial<any>) => Promise<any>, prettyEnum: { pretty: any; newlines: any; ugly: any }, pkgPath?: string): Promise<void> {
    const mod = await import("t2lang-common");
    return mod.runCli(notice, compileFn, prettyEnum, pkgPath);
}