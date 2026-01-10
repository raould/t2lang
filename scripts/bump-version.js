import fs from "fs";
import path from "path";

const versionFile = path.join(process.cwd(), ".internal_id");
let version = 0;

if (fs.existsSync(versionFile)) {
  const raw = fs.readFileSync(versionFile, "utf8").trim();
  version = raw.length > 0 ? Number(raw) : 0;
  if (!Number.isFinite(version)) {
    throw new Error(`.internal_id contains non-numeric data: ${raw}`);
  }
}

version += 1;
fs.writeFileSync(versionFile, `${version}\n`, "utf8");
console.log(`bumped compiler version to ${version}`);
