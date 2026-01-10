#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

const bins = {
	t2tc: path.join(repoRoot, 'phase1', 'dist', 'cli.js'),
	t2jc: path.join(repoRoot, 'common', 'dist', 't2jc.js'),
	t2run: path.join(repoRoot, 'common', 'dist', 't2run.js')
};

const binDir = path.join(repoRoot, 'node_modules', '.bin');
if (!fs.existsSync(binDir)) fs.mkdirSync(binDir, { recursive: true });

for (const [name, target] of Object.entries(bins)) {
	const wrapperPath = path.join(binDir, name);
	const absTarget = path.resolve(target);
	const importUrl = pathToFileURL(absTarget).href;
	// Create an ESM JS wrapper that dynamically imports the target CLI module using a file:// URL.
	const wrapperJs = `#!/usr/bin/env node\nimport('${importUrl}').catch(err => { console.error('Error loading CLI:', err); process.exit(1); });\n`;
	// Windows .cmd wrapper that invokes node on the target file
	const cmdScript = `@echo off\nnode "${absTarget.replace(/\\/g, '\\')}" %*\n`;

	try {
		fs.writeFileSync(wrapperPath, wrapperJs, { mode: 0o755 });
		fs.writeFileSync(wrapperPath + '.cmd', cmdScript, { mode: 0o755 });
		console.log(`install-local-bins: wrote ${wrapperPath}(.cmd) -> ${absTarget}`);
		if (!fs.existsSync(absTarget)) {
			console.warn(`install-local-bins: warning: target not found: ${absTarget}`);
		}
	} catch (err) {
		console.error('install-local-bins: failed to write', wrapperPath, String(err));
	}
}

console.log('install-local-bins: done');
