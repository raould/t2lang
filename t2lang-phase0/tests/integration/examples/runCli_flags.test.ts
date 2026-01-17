import test from "node:test";
import assert from "node:assert";
import { runCli } from "../../../../common/src/cliHelper.js";
import * as fs from "node:fs";

test("runCli passes CompilerConfig flags to compileFn", async () => {
    const tmp = "tmp_input.t2";
    fs.writeFileSync(tmp, "(program ())");

    const oldArgv = process.argv;
    try {
        process.argv = ["node", "t2c", tmp, "--ast", "--emit-types", "--enable-tsc", "--seed", "myseed", "--trace", "parse,expand", "--log-level", "debug", "--pretty-option", "ugly"];

        let capturedConfig: any = null;
        const compileFn = async (source: string, config?: Partial<any>) => {
            capturedConfig = config;
            return { tsSource: '', errors: [], events: [] };
        };

        await runCli('Test', compileFn, { pretty: 'pretty', newlines: 'newlines', ugly: 'ugly' }, './package.json');

        assert.ok(capturedConfig, 'compileFn was called');
        assert.strictEqual(capturedConfig.dumpAst, true);
        assert.strictEqual(capturedConfig.emitTypes, true);
        assert.strictEqual(capturedConfig.enableTsc, true);
        assert.strictEqual(capturedConfig.seed, 'myseed');
        assert.deepStrictEqual(capturedConfig.tracePhases, ['parse', 'expand']);
        assert.strictEqual(capturedConfig.logLevel, 'debug');
        // prettyOutput should be the mapped enum value passed in
        assert.strictEqual(capturedConfig.prettyOutput, 'ugly');
    } finally {
        process.argv = oldArgv;
        fs.unlinkSync(tmp);
    }
});