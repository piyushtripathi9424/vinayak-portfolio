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

    content = content.replace(/from-black(?![a-zA-Z0-9_-])/g, 'from-background');
    content = content.replace(/from-black\//g, 'from-background/');
    
    content = content.replace(/via-black(?![a-zA-Z0-9_-])/g, 'via-background');
    content = content.replace(/via-black\//g, 'via-background/');

    content = content.replace(/to-black(?![a-zA-Z0-9_-])/g, 'to-background');
    content = content.replace(/to-black\//g, 'to-background/');

    if (original !== content) {
      fs.writeFileSync(filePath, content, 'utf-8');
      console.log('Updated', filePath);
    }
  }
});
