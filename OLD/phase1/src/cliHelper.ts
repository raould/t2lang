import * as common from 't2lang-common';

// Wrapper that delegates to the shared common CLI helper implementation
// using the packaged `t2lang-common` export. This avoids referencing
// workspace TS sources during consumer builds.
export async function runCli(
    notice: string,
    compileFn: (source: string, config?: Record<string, unknown>) => Promise<unknown>,
    prettyEnum: { pretty: unknown; ugly: unknown },
    pkgPath?: string
): Promise<void> {
    return common.runCli(notice, compileFn, prettyEnum, pkgPath);
}