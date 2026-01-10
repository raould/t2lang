#!/usr/bin/env node
/**
 * T2 File Watcher
 * 
 * Watches for changes to .t2 files and automatically compiles them.
 * 
 * Usage:
 *   node watch-t2.mjs [options]
 * 
 * Options:
 *   --js       Also compile to JavaScript (use t2jc instead of t2tc)
 *   --dir DIR  Watch a specific directory (default: current directory)
 *   --help     Show help
 */

import { watch } from 'fs';
import { spawn } from 'child_process';
import { existsSync, statSync, readdirSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parse arguments
const args = process.argv.slice(2);
const useJS = args.includes('--js');
const helpRequested = args.includes('--help') || args.includes('-h');

const dirIndex = args.indexOf('--dir');
const watchDir = dirIndex !== -1 && args[dirIndex + 1] 
  ? path.resolve(args[dirIndex + 1])
  : process.cwd();

if (helpRequested) {
  console.log(`
T2 File Watcher - Auto-compile .t2 files on save

Usage:
  node watch-t2.mjs [options]

Options:
  --js       Compile to JavaScript (runs t2jc instead of t2tc)
  --dir DIR  Watch a specific directory (default: current directory)
  --help     Show this help message

Examples:
  node watch-t2.mjs                    # Watch current directory, compile to .ts
  node watch-t2.mjs --js               # Watch current directory, compile to .js
  node watch-t2.mjs --dir ./src        # Watch ./src directory
  `);
  process.exit(0);
}

// Find the compiler
function findCompiler() {
  const compilerName = useJS ? 't2jc.js' : 'cli.js';
  const searchPaths = useJS ? [
    path.join(__dirname, 'common', 'dist', 't2jc.js'),
    path.join(__dirname, 'bin', 't2jc'),
  ] : [
    path.join(__dirname, 'phase1', 'dist', 'cli.js'),
    path.join(__dirname, 'bin', 't2tc'),
  ];

  for (const p of searchPaths) {
    if (existsSync(p)) {
      return p;
    }
  }

  console.error(`Error: Could not find ${useJS ? 't2jc' : 't2tc'} compiler.`);
  console.error('Searched in:');
  searchPaths.forEach(p => console.error(`  - ${p}`));
  console.error('\nMake sure you have built the compiler:');
  console.error('  cd phase1 && npm run build');
  process.exit(1);
}

const compiler = findCompiler();
console.log(`Using compiler: ${compiler}`);
console.log(`Watching directory: ${watchDir}`);
console.log(`Output format: ${useJS ? 'JavaScript (.js)' : 'TypeScript (.ts)'}`);
console.log('---');
console.log('Waiting for file changes...\n');

// Track ongoing compilations to avoid duplicates
const compilingFiles = new Set();
const pendingCompilations = new Map();

function compileFile(filePath) {
  // Debounce: wait a bit in case multiple save events fire
  if (pendingCompilations.has(filePath)) {
    clearTimeout(pendingCompilations.get(filePath));
  }

  pendingCompilations.set(filePath, setTimeout(() => {
    pendingCompilations.delete(filePath);
    
    if (compilingFiles.has(filePath)) {
      return; // Already compiling
    }

    compilingFiles.add(filePath);
    const startTime = Date.now();
    const relPath = path.relative(watchDir, filePath);
    
    console.log(`[${new Date().toLocaleTimeString()}] Compiling: ${relPath}`);

    const child = spawn(process.execPath, [compiler, filePath], {
      cwd: path.dirname(filePath),
      stdio: ['ignore', 'pipe', 'pipe']
    });

    let stdout = '';
    let stderr = '';

    child.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    child.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    child.on('close', (code) => {
      compilingFiles.delete(filePath);
      const elapsed = Date.now() - startTime;

      if (code === 0) {
        const outputExt = useJS ? '.js' : '.ts';
        const outputFile = filePath.replace(/\.t2$/, outputExt);
        console.log(`  ✓ Success (${elapsed}ms) → ${path.basename(outputFile)}`);
      } else {
        console.log(`  ✗ Failed (code ${code})`);
        if (stderr) {
          stderr.trim().split('\n').forEach(line => {
            console.log(`    ${line}`);
          });
        }
        if (stdout) {
          stdout.trim().split('\n').forEach(line => {
            console.log(`    ${line}`);
          });
        }
      }
      console.log('');
    });

    child.on('error', (err) => {
      compilingFiles.delete(filePath);
      console.log(`  ✗ Error: ${err.message}\n`);
    });
  }, 100)); // 100ms debounce
}

// Recursively find all .t2 files
function findT2Files(dir, files = []) {
  try {
    const entries = readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name !== 'node_modules' && entry.name !== '.git' && entry.name !== 'dist') {
          findT2Files(fullPath, files);
        }
      } else if (entry.name.endsWith('.t2')) {
        files.push(fullPath);
      }
    }
  } catch (err) {
    // Ignore permission errors
  }
  return files;
}

// Watch a directory recursively
function watchDirectory(dir) {
  try {
    watch(dir, { recursive: true }, (eventType, filename) => {
      if (!filename || !filename.endsWith('.t2')) {
        return;
      }
      
      const fullPath = path.join(dir, filename);
      
      // Check if file exists (might be a delete event)
      if (!existsSync(fullPath)) {
        return;
      }

      compileFile(fullPath);
    });
  } catch (err) {
    // Fallback for systems that don't support recursive watch
    console.log('Note: Using polling-based watch (recursive watch not supported)');
    
    const watchedDirs = new Set();
    
    function addWatchers(d) {
      if (watchedDirs.has(d)) return;
      watchedDirs.add(d);
      
      try {
        watch(d, (eventType, filename) => {
          if (!filename) return;
          
          const fullPath = path.join(d, filename);
          
          if (filename.endsWith('.t2') && existsSync(fullPath)) {
            compileFile(fullPath);
          }
          
          // Check for new directories
          if (existsSync(fullPath) && statSync(fullPath).isDirectory()) {
            addWatchers(fullPath);
          }
        });
        
        // Watch subdirectories
        const entries = readdirSync(d, { withFileTypes: true });
        for (const entry of entries) {
          if (entry.isDirectory() && 
              entry.name !== 'node_modules' && 
              entry.name !== '.git' &&
              entry.name !== 'dist') {
            addWatchers(path.join(d, entry.name));
          }
        }
      } catch (e) {
        // Ignore permission errors
      }
    }
    
    addWatchers(dir);
  }
}

// Start watching
watchDirectory(watchDir);

// List existing .t2 files
const existingFiles = findT2Files(watchDir);
if (existingFiles.length > 0) {
  console.log(`Found ${existingFiles.length} .t2 file(s):`);
  existingFiles.forEach(f => {
    console.log(`  - ${path.relative(watchDir, f)}`);
  });
  console.log('');
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\nStopping file watcher...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\nStopping file watcher...');
  process.exit(0);
});
