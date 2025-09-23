// scripts/patch-fs-extra.js
// Ensures CRA's fs-extra dependency has the files it expects (Linux is case-sensitive).
const fs = require("fs");
const path = require("path");

function ensureFile(file, content) {
  if (!fs.existsSync(file)) {
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, content);
    console.log("[patch-fs-extra] created", path.relative(process.cwd(), file));
  } else {
    console.log("[patch-fs-extra] exists  ", path.relative(process.cwd(), file));
  }
}

try {
  const base = path.join(process.cwd(), "node_modules", "fs-extra", "lib");

  // Case 1: Some installs are missing lib/mkdirs/utils.js
  const mkdirsUtils = path.join(base, "mkdirs", "utils.js");
  if (!fs.existsSync(mkdirsUtils)) {
    // Bridge to the shared utils module used by fs-extra v9/10
    ensureFile(mkdirsUtils, "module.exports = require('../utils');\n");
  }

  // Case 2: Some installs are missing lib/copy-sync (directory)
  const copySyncDir = path.join(base, "copy-sync");
  if (!fs.existsSync(copySyncDir)) {
    fs.mkdirSync(copySyncDir, { recursive: true });
  }
  const copySyncIndex = path.join(copySyncDir, "index.js");
  if (!fs.existsSync(copySyncIndex)) {
    // Prefer real sync copy if present; otherwise fall back to async copy (works for CRA build)
    const asyncCopy = path.join(base, "copy", "index.js");
    const content = fs.existsSync(asyncCopy)
      ? "module.exports = require('../copy');\n"
      : "module.exports = {};\n";
    fs.writeFileSync(copySyncIndex, content);
    console.log("[patch-fs-extra] ensured copy-sync/index.js");
  }
} catch (e) {
  console.log("[patch-fs-extra] skipped (fs-extra not installed yet)", e && e.message);
}
