import { readdirSync, writeFileSync, renameSync } from "node:fs";
import path from "node:path";
export default function(shk: any) {
  shk.rule(({
    name: "build-grammar",
    output: "stage9/Stage9Lexer.ts",
    deps: [({
      kind: "file",
      path: "stage9/Stage9.g4"
    })],
    action: async function(ctx: any) {
      const antlrBin: string = path.join(ctx.projectRoot, "stage9", "node_modules", ".bin", "antlr-ng");
      (await ctx.run(antlrBin, ["-Dlanguage=TypeScript", path.join(ctx.projectRoot, "stage9", "Stage9.g4")]));
    }
  }));
  shk.rule(({
    name: "build-compiler",
    output: "stage9/index.ts",
    deps: [({
      kind: "rule",
      name: "build-grammar"
    }), ({
      kind: "glob",
      pattern: "stage9/Stage9*.s8"
    }), ({
      kind: "file",
      path: "stage9/Stage9-tags.ts"
    }), ({
      kind: "file",
      path: "stage9/Stage9-debug.ts"
    }), ({
      kind: "file",
      path: "stage9/Stage9-parse-form.ts"
    })],
    action: async function(ctx: any) {
      const stage9Dir: string = path.join(ctx.projectRoot, "stage9");
      const tsxBin: string = path.join(stage9Dir, "node_modules", ".bin", "tsx");
      const compilerPath: string = path.join(ctx.projectRoot, "stage8", "index.ts");
      const s8Files: string[] = readdirSync(stage9Dir).filter(function(f: string) {
        return f.endsWith(".s8");
      });
      for (const f of s8Files) {
        const outName: string = ((f === "Stage9.s8") ? "index.ts" : f.replace(".s8", ".ts"));
        const srcPath: string = path.join(stage9Dir, f);
        const tmpPath: string = path.join("/tmp", ("_s9_" + outName));
        const outPath: string = path.join(stage9Dir, outName);
        const result: any = (await ctx.run(tsxBin, [compilerPath, srcPath]));
        writeFileSync(tmpPath, result.stdout);
        renameSync(tmpPath, outPath);
      }
    }
  }));
};
