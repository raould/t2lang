import * as vscode from 'vscode';
import { LanguageClient, TransportKind } from 'vscode-languageclient/node';

let client: LanguageClient;

export function activate(context: vscode.ExtensionContext) {
  const outputChannel = vscode.window.createOutputChannel('t2 eval');

  client = new LanguageClient(
    't2lang',
    'T2 Language Server',
    {
      run:   { command: 't2lang-lsp', transport: TransportKind.stdio },
      debug: { command: 't2lang-lsp', transport: TransportKind.stdio }
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
