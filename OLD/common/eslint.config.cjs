module.exports = [
  {
    ignores: ["dist/**", "node_modules/**", "tmp_input_for_test.ts"]
  },
  {
    files: ["**/*.ts", "**/*.js"],
    languageOptions: {
      parser: require("@typescript-eslint/parser"),
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module"
      }
    },
    plugins: {
      "@typescript-eslint": require("@typescript-eslint/eslint-plugin")
    },
    rules: {
      // keep minimal: use recommended from typescript plugin
    }
  }
];
