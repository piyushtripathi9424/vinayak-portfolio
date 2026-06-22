const fs = require('fs');
const path = require('path');

let filePath = './src/components/Navbar.tsx';
let content = fs.readFileSync(filePath, 'utf-8');
let original = content;

// Replace drop shadows
content = content.replace(/rgba\(255,43,43,0\.5\)/g, 'var(--primary-glow-strong)');
content = content.replace(/rgba\(255,43,43,0\.8\)/g, 'var(--primary-glow-strong)');
content = content.replace(/rgba\(255,43,43,0\.3\)/g, 'var(--primary-glow)');
content = content.replace(/rgba\(255,43,43,0\.2\)/g, 'var(--primary-glow)');

// Replace white glass
content = content.replace(/rgba\(255,255,255,0\.2\)/g, 'var(--glass-border-subtle)');
content = content.replace(/rgba\(255,255,255,0\.4\)/g, 'var(--glass-border-1)');
content = content.replace(/rgba\(255,255,255,0\.5\)/g, 'var(--glass-border-1)');

if (original !== content) {
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log('Updated Navbar.tsx');
}
