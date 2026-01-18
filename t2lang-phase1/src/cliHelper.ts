import * as common from 't2lang-common';

// Wrapper that delegates to the shared common CLI helper implementation
// using the packaged `t2lang-common` export. This avoids referencing
// workspace TS sources during consumer builds.
export async function runCli(
    notice: string,
    compileFn: (source: string, config?: Partial<any>) => Promise<any>,
    prettyEnum: { pretty: any; newlines: any; ugly: any },
    pkgPath?: string
): Promise<void> {
    return (common as any).runCli(notice, compileFn, prettyEnum, pkgPath);
}