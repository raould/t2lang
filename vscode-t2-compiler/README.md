# T2 Language Compiler Extension for VS Code

Automatically compile `.t2` files to TypeScript (and optionally JavaScript) whenever you save.

## Features

- **Compile on Save**: Automatically runs `t2tc` when you save any `.t2` file
- **Manual Compilation**: Use commands to compile on demand
- **JavaScript Output**: Optionally compile all the way to JavaScript using `t2jc`
- **Error Diagnostics**: Parse errors are shown inline in the editor
- **Syntax Highlighting**: Full syntax highlighting for T2 S-expression syntax
- **Status Bar**: Shows compile status and toggle for auto-compile

## Installation

### From Source

1. Clone/copy the extension folder
2. Install dependencies:
   ```bash
   cd vscode-t2-compiler
   npm install
   npm run compile
   ```
3. Package the extension:
   ```bash
   npm run package
   ```
4. Install the `.vsix` file:
   - Open VS Code
   - Press `Ctrl+Shift+P` / `Cmd+Shift+P`
   - Run "Extensions: Install from VSIX..."
   - Select the generated `.vsix` file

### Development Mode

1. Open the `vscode-t2-compiler` folder in VS Code
2. Press `F5` to launch the Extension Development Host
3. Open a folder containing `.t2` files

## Usage

### Automatic Compilation

By default, the extension will automatically compile `.t2` files whenever you save them. The generated `.ts` file will be placed in the same directory.

### Manual Commands

- **T2: Compile Current File** (`Ctrl+Shift+B` / `Cmd+Shift+B`): Compile to TypeScript
- **T2: Compile Current File to JavaScript**: Compile to TypeScript then JavaScript
- **T2: Toggle Compile on Save**: Enable/disable automatic compilation

### Status Bar

The status bar shows:
- `✓ T2 Auto-Compile` - Auto-compile is enabled
- `✗ T2 Auto-Compile` - Auto-compile is disabled

Click the status bar item to toggle auto-compile.

## Settings

| Setting | Default | Description |
|---------|---------|-------------|
| `t2.compileOnSave` | `true` | Automatically compile on save |
| `t2.compileToJS` | `false` | Also compile to JavaScript |
| `t2.showOutputOnError` | `true` | Show output panel on errors |
| `t2.t2tcPath` | `""` | Custom path to t2tc (auto-detect if empty) |
| `t2.t2jcPath` | `""` | Custom path to t2jc (auto-detect if empty) |
| `t2.extraArgs` | `[]` | Extra arguments for t2tc |

## Compiler Detection

The extension automatically searches for the T2 compiler in these locations:

1. Custom path from settings
2. `./phase1/dist/cli.js` (t2lang project structure)
3. `./node_modules/phase1/dist/cli.js`
4. `./node_modules/.bin/t2tc`

## Troubleshooting

### Compiler Not Found

If you see "Could not find t2tc compiler":

1. Make sure the t2lang project is built (`npm run build` in phase1)
2. Set the `t2.t2tcPath` setting to the full path of `cli.js`

### Errors Not Showing

The extension tries to parse several error formats. If errors aren't being detected:

1. Check the "T2 Compiler" output panel for raw error output
2. File an issue with the error format you're seeing

## Development

```bash
# Install dependencies
npm install

# Compile TypeScript
npm run compile

# Watch mode
npm run watch

# Package extension
npm run package
```

## License

MIT
