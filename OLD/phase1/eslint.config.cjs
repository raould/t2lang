module.exports = [
  {
    ignores: ["dist/**", "node_modules/**", "tests/**"]
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
    rules: {}
  }
];
