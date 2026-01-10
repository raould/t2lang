# T2 S-expression Formatter (VSCode)

Minimal VS Code extension that formats `.t2` files by indenting each non-empty line according to the number of currently unclosed parentheses.

Installation (developer local):
- Open the `vscode-t2-formatter` folder in VS Code.
- Run `npm install` (none required for this minimal extension) and then `F5` to launch an Extension Development Host.

Usage:
- Open a `.t2` file and run the command **Format Document** or the command palette `T2 Format Document`.

Notes:
- This formatter uses a simple heuristic (counts `(` and `)`), it does not parse strings or handle complicated edge-cases. It provides a simple, consistent indentation useful for sexpr-style files.
