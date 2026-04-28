import { readFileSync } from 'fs';
function prefixLineNumbers(str) {
    return str.split('\n').map((line, i) => `${String(i + 1).padStart(4, '0')}: ${line}`).join('\n');
}
let args = [...process.argv];
args.shift(); // remove script name
args.shift(); // remove 'xtract.ts'
const numbering = (args.includes('--numbers') || args.includes('-n'));
args = args.filter(arg => arg !== '--numbers' && arg !== '-n');
const filePath = args[0];
if (!filePath) {
    console.error('Usage: xtract {-n|--numbers} <filepath>');
    process.exit(1);
}
const src = readFileSync(filePath, 'utf8');
const match = src.match(/\`\s*(\(program[\s\S]*)\s*\`/m);
if (!match) {
    console.error(`No backtick string found in file ${filePath}`);
    process.exit(1);
}
const x = match[1].trim();
console.log(numbering ? prefixLineNumbers(x) : x);
