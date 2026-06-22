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

    // Replace #050505 with background
    content = content.replace(/bg-\[#050505\]/g, 'bg-background');
    content = content.replace(/from-\[#050505\]/g, 'from-background');
    content = content.replace(/to-\[#050505\]/g, 'to-background');
    
    // Replace rgba(5,5,5,0.7)
    content = content.replace(/bg-\[rgba\(5,5,5,0\.7\)\]/g, 'bg-background/70');

    // Replace hardcoded #0E0E0E in style tag
    content = content.replace(/background:\s*'#0E0E0E'/g, "background: 'var(--charcoal-color)'");

    // Replace shadow-[0_0_20px_rgba(0,0,0,...)] maybe? The shadows are fine.

    if (original !== content) {
      fs.writeFileSync(filePath, content, 'utf-8');
      console.log('Updated', filePath);
    }
  }
});
