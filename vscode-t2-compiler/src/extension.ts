import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { spawn, ChildProcess } from 'child_process';

let outputChannel: vscode.OutputChannel;
let diagnosticCollection: vscode.DiagnosticCollection;
let statusBarItem: vscode.StatusBarItem;

export function activate(context: vscode.ExtensionContext) {
    console.log('T2 Language extension is now active');

    // Create output channel for compiler messages
    outputChannel = vscode.window.createOutputChannel('T2 Compiler');
    
    // Create diagnostic collection for error reporting
    diagnosticCollection = vscode.languages.createDiagnosticCollection('t2');
    
    // Create status bar item
    statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
    statusBarItem.command = 't2.toggleCompileOnSave';
    updateStatusBar();
    statusBarItem.show();

    // Register commands
    context.subscriptions.push(
        vscode.commands.registerCommand('t2.compileFile', () => compileCurrentFile(false)),
        vscode.commands.registerCommand('t2.compileFileToJS', () => compileCurrentFile(true)),
        vscode.commands.registerCommand('t2.toggleCompileOnSave', toggleCompileOnSave)
    );

    // Register save event handler
    context.subscriptions.push(
        vscode.workspace.onDidSaveTextDocument(onDocumentSave)
    );

    // Clean up
    context.subscriptions.push(outputChannel);
    context.subscriptions.push(diagnosticCollection);
    context.subscriptions.push(statusBarItem);
}

export function deactivate() {}

function getConfig() {
    return vscode.workspace.getConfiguration('t2');
}

function updateStatusBar() {
    const config = getConfig();
    const enabled = config.get<boolean>('compileOnSave', true);
    statusBarItem.text = enabled ? '$(check) T2 Auto-Compile' : '$(x) T2 Auto-Compile';
    statusBarItem.tooltip = enabled 
        ? 'T2: Compile on save is enabled (click to disable)' 
        : 'T2: Compile on save is disabled (click to enable)';
}

async function toggleCompileOnSave() {
    const config = getConfig();
    const current = config.get<boolean>('compileOnSave', true);
    await config.update('compileOnSave', !current, vscode.ConfigurationTarget.Global);
    updateStatusBar();
    vscode.window.showInformationMessage(
        `T2: Compile on save ${!current ? 'enabled' : 'disabled'}`
    );
}

function onDocumentSave(document: vscode.TextDocument) {
    if (document.languageId !== 't2' && !document.fileName.endsWith('.t2')) {
        return;
    }

    const config = getConfig();
    if (!config.get<boolean>('compileOnSave', true)) {
        return;
    }

    const compileToJS = config.get<boolean>('compileToJS', false);
    compileFile(document.fileName, compileToJS);
}

async function compileCurrentFile(toJS: boolean) {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showErrorMessage('No active editor');
        return;
    }

    const document = editor.document;
    if (document.languageId !== 't2' && !document.fileName.endsWith('.t2')) {
        vscode.window.showErrorMessage('Current file is not a .t2 file');
        return;
    }

    // Save the file first
    if (document.isDirty) {
        await document.save();
    }

    compileFile(document.fileName, toJS);
}

function findCompiler(compilerName: 't2tc' | 't2jc'): string | null {
    const config = getConfig();
    const configPath = config.get<string>(compilerName === 't2tc' ? 't2tcPath' : 't2jcPath', '');
    
    if (configPath && fs.existsSync(configPath)) {
        return configPath;
    }

    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) {
        return null;
    }

    // Search strategies
    const searchPaths: string[] = [];
    
    for (const folder of workspaceFolders) {
        const root = folder.uri.fsPath;
        
        // Check for t2lang project structure
        if (compilerName === 't2tc') {
            searchPaths.push(
                path.join(root, 'phase1', 'dist', 'cli.js'),
                path.join(root, 'node_modules', 'phase1', 'dist', 'cli.js'),
                path.join(root, 'node_modules', '.bin', 't2tc')
            );
        } else {
            searchPaths.push(
                path.join(root, 'common', 'dist', 't2jc.js'),
                path.join(root, 'bin', 't2jc'),
                path.join(root, 'node_modules', '.bin', 't2jc')
            );
        }
    }

    for (const p of searchPaths) {
        if (fs.existsSync(p)) {
            return p;
        }
    }

    return null;
}

function compileFile(filePath: string, toJS: boolean) {
    const config = getConfig();
    const extraArgs = config.get<string[]>('extraArgs', []);
    const showOutputOnError = config.get<boolean>('showOutputOnError', true);

    // Clear previous diagnostics for this file
    const fileUri = vscode.Uri.file(filePath);
    diagnosticCollection.delete(fileUri);

    outputChannel.clear();
    outputChannel.appendLine(`Compiling: ${filePath}`);
    outputChannel.appendLine(`Time: ${new Date().toLocaleTimeString()}`);
    outputChannel.appendLine('---');

    const compiler = toJS ? findCompiler('t2jc') : findCompiler('t2tc');
    
    if (!compiler) {
        const msg = `Could not find ${toJS ? 't2jc' : 't2tc'} compiler. Please set the path in settings.`;
        outputChannel.appendLine(`ERROR: ${msg}`);
        vscode.window.showErrorMessage(msg);
        if (showOutputOnError) {
            outputChannel.show(true);
        }
        return;
    }

    outputChannel.appendLine(`Using compiler: ${compiler}`);

    // Determine how to run the compiler
    let command: string;
    let args: string[];

    if (compiler.endsWith('.js')) {
        command = process.execPath; // node
        args = [compiler, filePath, ...extraArgs];
    } else {
        command = compiler;
        args = [filePath, ...extraArgs];
    }

    outputChannel.appendLine(`Running: ${command} ${args.join(' ')}`);
    outputChannel.appendLine('---');

    const cwd = path.dirname(filePath);
    const child: ChildProcess = spawn(command, args, {
        cwd,
        shell: process.platform === 'win32'
    });

    let stdout = '';
    let stderr = '';

    child.stdout?.on('data', (data: Buffer) => {
        const text = data.toString();
        stdout += text;
        outputChannel.append(text);
    });

    child.stderr?.on('data', (data: Buffer) => {
        const text = data.toString();
        stderr += text;
        outputChannel.append(text);
    });

    child.on('error', (error: Error) => {
        outputChannel.appendLine(`\nERROR: ${error.message}`);
        vscode.window.showErrorMessage(`T2 compilation failed: ${error.message}`);
        if (showOutputOnError) {
            outputChannel.show(true);
        }
    });

    child.on('close', (code: number | null) => {
        outputChannel.appendLine(`\n--- Compilation finished with code ${code} ---`);
        
        if (code === 0) {
            const outputFile = filePath.replace(/\.t2$/, toJS ? '.js' : '.ts');
            vscode.window.showInformationMessage(`T2: Compiled successfully → ${path.basename(outputFile)}`);
            
            // Update status bar briefly
            const originalText = statusBarItem.text;
            statusBarItem.text = '$(check) T2 Compiled!';
            setTimeout(() => {
                statusBarItem.text = originalText;
            }, 2000);
        } else {
            // Parse errors and create diagnostics
            const diagnostics = parseErrors(stderr + stdout, filePath);
            if (diagnostics.length > 0) {
                diagnosticCollection.set(fileUri, diagnostics);
            }
            
            vscode.window.showErrorMessage('T2: Compilation failed. Check the output panel for details.');
            if (showOutputOnError) {
                outputChannel.show(true);
            }
        }
    });
}

function parseErrors(output: string, filePath: string): vscode.Diagnostic[] {
    const diagnostics: vscode.Diagnostic[] = [];
    
    // Pattern 1: file:line:column: error: message
    const pattern1 = /^(.+?):(\d+):(\d+):\s*(error|warning):\s*(.+)$/gm;
    
    // Pattern 2: Error at line X, column Y: message
    const pattern2 = /Error at line (\d+),?\s*column (\d+):\s*(.+)/gi;
    
    // Pattern 3: [parse] error at X:Y - message
    const pattern3 = /\[(parse|resolve|typecheck|codegen)\]\s*error at (\d+):(\d+)\s*[-–]\s*(.+)/gi;

    // Pattern 4: Simple "Error: message" with line info embedded
    const pattern4 = /Error:.*?line\s*(\d+).*?(?:column|col)\s*(\d+).*?:\s*(.+)/gi;

    let match;

    while ((match = pattern1.exec(output)) !== null) {
        const [, file, line, col, severity, message] = match;
        const lineNum = Math.max(0, parseInt(line, 10) - 1);
        const colNum = Math.max(0, parseInt(col, 10) - 1);
        
        diagnostics.push(new vscode.Diagnostic(
            new vscode.Range(lineNum, colNum, lineNum, colNum + 10),
            message,
            severity === 'error' ? vscode.DiagnosticSeverity.Error : vscode.DiagnosticSeverity.Warning
        ));
    }

    while ((match = pattern2.exec(output)) !== null) {
        const [, line, col, message] = match;
        const lineNum = Math.max(0, parseInt(line, 10) - 1);
        const colNum = Math.max(0, parseInt(col, 10) - 1);
        
        diagnostics.push(new vscode.Diagnostic(
            new vscode.Range(lineNum, colNum, lineNum, colNum + 10),
            message.trim(),
            vscode.DiagnosticSeverity.Error
        ));
    }

    while ((match = pattern3.exec(output)) !== null) {
        const [, phase, line, col, message] = match;
        const lineNum = Math.max(0, parseInt(line, 10) - 1);
        const colNum = Math.max(0, parseInt(col, 10) - 1);
        
        diagnostics.push(new vscode.Diagnostic(
            new vscode.Range(lineNum, colNum, lineNum, colNum + 10),
            `[${phase}] ${message.trim()}`,
            vscode.DiagnosticSeverity.Error
        ));
    }

    while ((match = pattern4.exec(output)) !== null) {
        const [, line, col, message] = match;
        const lineNum = Math.max(0, parseInt(line, 10) - 1);
        const colNum = Math.max(0, parseInt(col, 10) - 1);
        
        diagnostics.push(new vscode.Diagnostic(
            new vscode.Range(lineNum, colNum, lineNum, colNum + 10),
            message.trim(),
            vscode.DiagnosticSeverity.Error
        ));
    }

    return diagnostics;
}
