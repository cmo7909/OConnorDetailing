// scripts/check-deps.js
const fs = require('fs');
const path = require('path');
const cp = require('child_process');

function exists(p) {
  try { fs.accessSync(p); return true; } catch { return false; }
}
function pkgRoot(mod) {
  // Resolve the package.json and go to its folder
  const p = require.resolve(path.join(mod, 'package.json'));
  return path.dirname(p);
}

function ensureFsExtra() {
  try {
    const root = pkgRoot('fs-extra');                    // .../node_modules/fs-extra
    const copySync = path.join(root, 'lib', 'copy-sync', 'index.js');
    const version = require(path.join(root, 'package.json')).version || 'unknown';

    if (!exists(copySync)) {
      console.log(`⚠️  fs-extra@${version} is missing lib/copy-sync. Reinstalling fs-extra@9.1.0 …`);
      cp.execSync('npm i fs-extra@9.1.0 --no-save', { stdio: 'inherit' });
    } else {
      console.log(`✅ fs-extra@${version} OK`);
    }
  } catch (e) {
    console.log('⚠️  fs-extra not resolvable. Installing fs-extra@9.1.0 …');
    cp.execSync('npm i fs-extra@9.1.0 --no-save', { stdio: 'inherit' });
  }
}

function ensureWebpackSources() {
  try {
    const root = pkgRoot('webpack-sources');             // .../node_modules/webpack-sources
    const helpers = path.join(root, 'lib', 'helpers');
    const needed = ['stringBufferUtils.js', 'splitIntoPotentialTokens.js'];
    const missing = needed.filter(f => !exists(path.join(helpers, f)));
    const version = require(path.join(root, 'package.json')).version || 'unknown';

    if (missing.length) {
      console.log(`⚠️  webpack-sources@${version} missing helpers (${missing.join(', ')}). Reinstalling 3.2.3 …`);
      cp.execSync('npm i webpack-sources@3.2.3 --no-save', { stdio: 'inherit' });
    } else {
      console.log(`✅ webpack-sources@${version} OK`);
    }
  } catch (e) {
    console.log('⚠️  webpack-sources not resolvable. Installing 3.2.3 …');
    cp.execSync('npm i webpack-sources@3.2.3 --no-save', { stdio: 'inherit' });
  }
}
//comment to push pt2
ensureFsExtra();
ensureWebpackSources();
