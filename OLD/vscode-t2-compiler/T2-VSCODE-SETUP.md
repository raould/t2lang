# T2 Auto-Compile on Save: Setup Guide

This guide explains how to set up VS Code to automatically compile `.t2` files whenever you save them.

---

## Quick Summary

| Method | Difficulty | Requires Extension? |
|--------|------------|---------------------|
| **Option A**: Custom Extension | Medium | Yes (build it yourself) |
| **Option B**: Run on Save | Easy | Yes (install from marketplace) |
| **Option C**: Trigger Task on Save | Easy | Yes (install from marketplace) |
| **Option D**: File Watcher Script | Medium | No |

---

## Option A: Custom T2 Compiler Extension (Recommended)

A full-featured extension is included in `vscode-t2-compiler/`.

### Features
- Automatic compile on save
- Error diagnostics shown in editor
- Status bar indicator
- Syntax highlighting
- Configurable settings

### Installation

```bash
cd vscode-t2-compiler

# Install dependencies
npm install

# Compile the extension
npm run compile

# Package it
npx vsce package
```

Then in VS Code:
1. Press `Ctrl+Shift+P` / `Cmd+Shift+P`
2. Run "Extensions: Install from VSIX..."
3. Select `vscode-t2-compiler-0.1.0.vsix`

### Settings

After installation, configure in VS Code settings:

```json
{
  "t2.compileOnSave": true,
  "t2.compileToJS": false,
  "t2.showOutputOnError": true
}
```

---

## Option B: "Run on Save" Extension (Easiest)

Use the popular "Run on Save" extension by emeraldwalk.

### Installation

1. Install the extension:
   ```
   ext install emeraldwalk.RunOnSave
   ```
   Or search "Run on Save" in the Extensions panel.

2. Add to your `.vscode/settings.json`:

```json
{
  "emeraldwalk.runonsave": {
    "commands": [
      {
        "match": "\\.t2$",
        "cmd": "node ${workspaceFolder}/phase1/dist/cli.js ${file}"
      }
    ]
  }
}
```

### For t2jc (compile to JS)

```json
{
  "emeraldwalk.runonsave": {
    "commands": [
      {
        "match": "\\.t2$",
        "cmd": "node ${workspaceFolder}/common/dist/t2jc.js ${file}"
      }
    ]
  }
}
```

---

## Option C: "Trigger Task on Save" Extension

Use the "Trigger Task on Save" extension by Gruntfuggly.

### Installation

1. Install the extension:
   ```
   ext install Gruntfuggly.triggertaskonsave
   ```

2. Create `.vscode/tasks.json`:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Compile T2",
      "type": "shell",
      "command": "node",
      "args": [
        "${workspaceFolder}/phase1/dist/cli.js",
        "${file}"
      ],
      "presentation": {
        "reveal": "silent"
      },
      "problemMatcher": []
    }
  ]
}
```

3. Add to `.vscode/settings.json`:

```json
{
  "triggerTaskOnSave.tasks": {
    "Compile T2": ["**/*.t2"]
  }
}
```

---

## Option D: File Watcher Script (No Extension)

Use a Node.js script with `chokidar` to watch for file changes.

### Setup

1. Install chokidar:
   ```bash
   npm install chokidar
   ```

2. Create `watch-t2.mjs`:

```javascript
import { watch } from 'chokidar';
import { spawn } from 'child_process';
import path from 'path';

const t2tc = './phase1/dist/cli.js';

console.log('Watching for .t2 file changes...');

watch('**/*.t2', {
  ignored: /node_modules/,
  persistent: true
}).on('change', (filePath) => {
  console.log(`\n[${new Date().toLocaleTimeString()}] Compiling: ${filePath}`);
  
  const child = spawn('node', [t2tc, filePath], {
    stdio: 'inherit'
  });
  
  child.on('close', (code) => {
    if (code === 0) {
      console.log(`✓ Compiled successfully`);
    } else {
      console.log(`✗ Compilation failed (code ${code})`);
    }
  });
});
```

3. Run the watcher:
   ```bash
   node watch-t2.mjs
   ```

4. (Optional) Add to `package.json`:
   ```json
   {
     "scripts": {
       "watch:t2": "node watch-t2.mjs"
     }
   }
   ```

### Use with VS Code Task

Add to `.vscode/tasks.json`:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Watch T2 Files",
      "type": "shell",
      "command": "node watch-t2.mjs",
      "isBackground": true,
      "problemMatcher": {
        "pattern": {
          "regexp": "^(.+?):(\\d+):(\\d+):\\s*(error):\\s*(.+)$",
          "file": 1,
          "line": 2,
          "column": 3,
          "severity": 4,
          "message": 5
        },
        "background": {
          "activeOnStart": true,
          "beginsPattern": "Watching for",
          "endsPattern": "Compiled"
        }
      }
    }
  ]
}
```

---

## Troubleshooting

### "Command not found" or "Cannot find module"

Make sure you've built the t2lang compiler first:

```bash
cd phase0 && npm install && npm run build
cd ../phase1 && npm install && npm run build
cd ../common && npm install && npm run build
```

### Errors not showing in VS Code

The problem matcher patterns assume a specific error format. Check the actual error output and adjust the regex pattern in `tasks.json` or the extension.

### Permission denied on scripts

On Unix systems, make the scripts executable:

```bash
chmod +x bin/t2jc bin/t2tc
```

---

## Recommended Setup

For the best experience, I recommend:

1. **Install the custom extension** (`vscode-t2-compiler`) for:
   - Proper syntax highlighting
   - Inline error diagnostics
   - Status bar feedback
   - Easy toggle on/off

2. **Or use "Run on Save"** extension if you want a quick setup without building anything.

---

## Files Created

```
t2lang-main/
├── .vscode/
│   ├── settings.json    # Workspace settings with multiple options
│   └── tasks.json       # Build tasks for manual compilation
├── vscode-t2-compiler/  # Full VS Code extension
│   ├── src/
│   │   └── extension.ts
│   ├── syntaxes/
│   │   └── t2.tmLanguage.json
│   ├── package.json
│   ├── tsconfig.json
│   ├── language-configuration.json
│   └── README.md
└── T2-VSCODE-SETUP.md   # This file
```
