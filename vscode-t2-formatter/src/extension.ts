import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { LanguageClient, TransportKind } from 'vscode-languageclient/node';

let client: LanguageClient;

function resolveServerCommand(): { command: string; args: string[] } {
  const folders = vscode.workspace.workspaceFolders;
  if (folders) {
    for (const folder of folders) {
      // Consumer project: t2lang installed as a devDependency
      const fromDep = path.join(folder.uri.fsPath, 'node_modules', '.bin', 't2lang-lsp');
      if (fs.existsSync(fromDep)) return { command: fromDep, args: [] };
      // t2lang dev repo: invoke the live script via tsx
      const lspScript = path.join(folder.uri.fsPath, 'bin', 't2lang-lsp.js');
      if (fs.existsSync(lspScript)) {
        const tsxBin = path.join(folder.uri.fsPath, 'node_modules', '.bin', 'tsx');
        return { command: fs.existsSync(tsxBin) ? tsxBin : 'tsx', args: [lspScript] };
      }
    }
  }
  return { command: 't2lang-lsp', args: [] }; // fallback: global install
}

export function activate(context: vscode.ExtensionContext) {
  const outputChannel = vscode.window.createOutputChannel('t2 eval');
  const { command, args } = resolveServerCommand();

  client = new LanguageClient(
    't2lang',
    'T2 Language Server',
    {
      run:   { command, args, transport: TransportKind.stdio },
      debug: { command, args, transport: TransportKind.stdio }
    },
    {
      documentSelector: [{ scheme: 'file', language: 't2' }]
    }
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('t2lang.eval', async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) return;

      const result: any = await client.sendRequest('t2/eval', {
        textDocument: { uri: editor.document.uri.toString() },
        selection: editor.selection,
        mode: 'normal'
      });

      outputChannel.clear();
      if (result.diagnostics?.length) {
        outputChannel.appendLine('[t2 compile error]');
        for (const d of result.diagnostics) outputChannel.appendLine(d.message);
      } else {
        if (result.stdout) outputChannel.append(result.stdout);
        if (result.stderr) { outputChannel.appendLine('[stderr]'); outputChannel.append(result.stderr); }
        if (result.truncated) outputChannel.appendLine('[output truncated]');
      }
      outputChannel.show(true);
    })
  );

  client.start();
}

export function deactivate() {
  return client?.stop();
}
