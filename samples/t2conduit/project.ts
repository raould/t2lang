/// <reference lib="es2015" />
/// <reference lib="es2018.asynciterable" />
/// <reference lib="dom" />
const projectConfig = {
  name: "t2conduit",
  version: "1.0.0",
  description: "Pull-based streaming library for TypeScript",
  author: "T2 Team",
  license: "MIT",
  main: "./dist/index.js",
  types: "./dist/index.d.ts",
  module: "./dist/index.mjs",
  build: {
    source: ["core.t2", "operators.t2", "macros.t2", "interop.t2"],
    output: "dist",
    target: "es2020",
    module: "esnext",
  },
  peerDependencies: { typescript: "^5.0.0" },
  devDependencies: {
    "@types/node": "^20.0.0",
    vitest: "^1.0.0",
    tsup: "^8.0.0",
  },
  exports: {
    ".": {
      types: "./dist/index.d.ts",
      import: "./dist/index.mjs",
      require: "./dist/index.js",
    },
    "./core": {
      types: "./dist/core.d.ts",
      import: "./dist/core.mjs",
      require: "./dist/core.js",
    },
    "./operators": {
      types: "./dist/operators.d.ts",
      import: "./dist/operators.mjs",
      require: "./dist/operators.js",
    },
    "./interop": {
      types: "./dist/interop.d.ts",
      import: "./dist/interop.mjs",
      require: "./dist/interop.js",
    },
    "./macros": {
      types: "./dist/macros.d.ts",
      import: "./dist/macros.mjs",
      require: "./dist/macros.js",
    },
  },
  keywords: [
    "streaming",
    "async",
    "iterator",
    "pipe",
    "conduit",
    "reactive",
    "pull-based",
    "backpressure",
    "t2lang",
    "lisp",
  ],
};
export { projectConfig };
async function buildAll() {
  const files = [
    { source: "core.t2", output: "dist/core.ts" },
    { source: "operators.t2", output: "dist/operators.ts" },
    { source: "macros.t2", output: "dist/macros.ts" },
    { source: "interop.t2", output: "dist/interop.ts" },
    { source: "examples.t2", output: "dist/examples.ts" },
    { source: "tests.t2", output: "dist/tests.ts" },
  ];
  {
    for (let file of files) {
      const source = file.source;
      const output = file.output;
      {
        console.log("Compiling " + source + " -> " + output);
        await compileT2File(source, output);
      }
    }
    console.log("Build complete!");
  }
}
export { buildAll };
async function compileT2File(sourcePath: string, outputPath: string) {
  const require = globalThis.require;
  const { compile } = require("t2lang/compiler");
  const { readFile, writeFile, mkdir } = require("fs/promises");
  const { dirname } = require("path");
  {
    const source = await readFile(sourcePath, "utf-8");
    {
      const typescript = compile(source, {
        sourceFile: sourcePath,
        target: "typescript",
        expandMacros: true,
      });
      {
        const outputDir = dirname(outputPath);
        await mkdir(outputDir, { recursive: true });
        await writeFile(outputPath, typescript, "utf-8");
      }
    }
  }
}
const tsconfig = {
  compilerOptions: {
    target: "ES2020",
    module: "ESNext",
    lib: ["ES2020"],
    moduleResolution: "bundler",
    declaration: true,
    declarationMap: true,
    sourceMap: true,
    outDir: "dist",
    rootDir: ".",
    strict: true,
    esModuleInterop: true,
    skipLibCheck: true,
    forceConsistentCasingInFileNames: true,
    resolveJsonModule: true,
    allowSyntheticDefaultImports: true,
  },
  include: ["dist/**/*.ts"],
  exclude: ["node_modules", "dist/**/*.test.ts"],
};
export { tsconfig };
async function generateTsConfig() {
  const require = globalThis.require;
  const { writeFile } = require("fs/promises");
  await writeFile("tsconfig.json", JSON.stringify(tsconfig, null, 2), "utf-8");
}
export { generateTsConfig };
const typeDefinitionLevels = [
  {
    name: "loose",
    file: "types/loose.d.ts",
    config: {
      cardinality: false,
      ownership: false,
      scoped: false,
      distributivity: false,
    },
  },
  {
    name: "strict",
    file: "types/strict.d.ts",
    config: {
      cardinality: true,
      ownership: false,
      scoped: false,
      distributivity: false,
    },
  },
  {
    name: "strict-2",
    file: "types/strict-2.d.ts",
    config: {
      cardinality: true,
      ownership: true,
      scoped: false,
      distributivity: false,
    },
  },
  {
    name: "strict-3",
    file: "types/strict-3.d.ts",
    config: {
      cardinality: true,
      ownership: true,
      scoped: true,
      distributivity: false,
    },
  },
  {
    name: "pedantic",
    file: "types/pedantic.d.ts",
    config: {
      cardinality: true,
      ownership: true,
      scoped: true,
      distributivity: true,
    },
  },
];
export { typeDefinitionLevels };
const vitestConfig = {
  test: {
    globals: true,
    environment: "node",
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: ["node_modules/**", "dist/**", "**/*.test.ts", "**/*.spec.ts"],
    },
    include: ["dist/**/*.test.ts"],
    threads: true,
    isolate: true,
  },
};
export { vitestConfig };
async function generateDocs() {
  const operators = [
    { name: "map", category: "transformation" },
    { name: "filter", category: "filtering" },
    { name: "reduce", category: "aggregation" },
  ];
  {
    console.log("Generating documentation...");
    for (let op of operators) {
      const name = op.name;
      const category = op.category;
      console.log("  " + name + " (" + category + ")");
    }
    console.log("Documentation generated!");
  }
}
export { generateDocs };
async function release(version: string) {
  {
    console.log("Releasing version " + version);
    console.log("1. Building...");
    await buildAll();
    console.log("2. Running tests...");
    await runTests();
    console.log("3. Generating docs...");
    await generateDocs();
    console.log("4. Updating version...");
    projectConfig.version = version;
    console.log("5. Creating git tag...");
    const require = globalThis.require;
    const { exec } = require("child_process");
    exec("git tag v" + version);
    console.log("Release " + version + " complete!");
  }
}
export { release };
async function runTests() {
  const require = globalThis.require;
  const { exec } = require("child_process");
  return new Promise((resolve, reject) => {
    exec("npm test", (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        resolve(stdout);
      }
    });
  });
}
async function watch() {
  const require = globalThis.require;
  const { watch } = require("chokidar");
  const watcher = watch("*.t2");
  {
    console.log("Watching for changes...");
    watcher.on("change", async function (path) {
      {
        console.log("\n" + path + " changed, rebuilding...");
        await buildAll();
      }
    });
  }
}
export { watch };
async function format() {
  console.log("Formatting .t2 files...");
  const require = globalThis.require;
  const { format } = require("t2lang/formatter");
  const { readdir, readFile, writeFile } = require("fs/promises");
  const files = await readdir(".");
  {
    for (let file of files) {
      if (file.endsWith(".t2")) {
        const source = await readFile(file, "utf-8");
        const formatted = format(source);
        await writeFile(file, formatted, "utf-8");
      }
    }
    console.log("Formatting complete!");
  }
}
export { format };
async function lint() {
  console.log("Linting...");
  const require = globalThis.require;
  const { lint } = require("t2lang/linter");
  {
    const results = lint(["*.t2"]);
    if (results.errors > 0) {
      console.error(results.errors + " errors found");
      globalThis.process.exit(1);
    } else {
      console.log("No errors found");
    }
  }
}
export { lint };
