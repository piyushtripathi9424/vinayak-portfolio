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

    // Replace text-white and text-white/opacity
    content = content.replace(/text-white(?![a-zA-Z0-9_-])/g, 'text-text-main');
    content = content.replace(/text-white\//g, 'text-text-main/');

    // Replace bg-black and bg-black/opacity
    content = content.replace(/bg-black(?![a-zA-Z0-9_-])/g, 'bg-background');
    content = content.replace(/bg-black\//g, 'bg-background/');
    
    // Replace bg-white/opacity with bg-text-main/opacity
    content = content.replace(/bg-white\//g, 'bg-text-main/');

    // Replace border-white and border-white/opacity
    content = content.replace(/border-white(?![a-zA-Z0-9_-])/g, 'border-text-main');
    content = content.replace(/border-white\//g, 'border-text-main/');

    // Replace text-black with text-background
    content = content.replace(/text-black(?![a-zA-Z0-9_-])/g, 'text-background');

    if (original !== content) {
      fs.writeFileSync(filePath, content, 'utf-8');
      console.log('Updated', filePath);
    }
  }
});
