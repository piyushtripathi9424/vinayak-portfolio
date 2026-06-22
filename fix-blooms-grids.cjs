const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir('./src', function(filePath) {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf-8');
    let original = content;

    // Fix radial gradients to use hero-bloom instead of primary-glow (which looks like a dirty smudge in light mode)
    content = content.replace(/radial-gradient\([^,]+,\s*var\(--primary-glow\)/g, match => {
      return match.replace('var(--primary-glow)', 'var(--hero-bloom)');
    });

    // Fix linear-gradient grids
    content = content.replace(/#ffffff0[68]/g, 'var(--grid-color)');

    if (original !== content) {
      fs.writeFileSync(filePath, content, 'utf-8');
      console.log('Updated', filePath);
    }
  }
});
