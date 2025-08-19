// scripts/check-deps.js
const fs = require('fs');
const path = require('path');
const cp = require('child_process');

function pkgDir(mod) {
  const entry = require.resolve(mod);
  // e.g. /vercel/path0/node_modules/fs-extra/lib/index.js
  return path.join(entry, '..'); // lib
}
function exists(p) { try { fs.accessSync(p); return true; } catch { return false; } }

function ensureFsExtra() {
  let ok = false;
  try {
    const libDir = pkgDir('fs-extra/lib/index.js'); // resolve to lib
    const copySyncDir = path.join(libDir, 'copy-sync'); // directory exists in v9.x
    const copySyncIndex = path.join(copySyncDir, 'index.js');
    ok = exists(copySyncDir) && exists(copySyncIndex);
  } catch {}
  if (!ok) {
    console.log('⚠️  fs-extra looks incomplete. Reinstalling fs-extra@9.1.0 …');
    cp.execSync('npm i fs-extra@9.1.0 --no-save', { stdio: 'inherit' });
  } else {
    console.log('✅ fs-extra OK');
  }
}

function ensureWebpackSources() {
  let ok = false;
  try {
    const base = path.join(require.resolve('webpack-sources/package.json'), '..', 'lib', 'helpers');
    // these helpers must exist in 3.2.3+
    const needs = [
      'stringBufferUtils.js',
      'splitIntoPotentialTokens.js',
    ];
    ok = needs.every(f => exists(path.join(base, f)));
  } catch {}
  if (!ok) {
    console.log('⚠️  webpack-sources helpers missing. Reinstalling webpack-sources@3.2.3 …');
    cp.execSync('npm i webpack-sources@3.2.3 --no-save', { stdio: 'inherit' });
  } else {
    console.log('✅ webpack-sources OK');
  }
}

ensureFsExtra();
ensureWebpackSources();
