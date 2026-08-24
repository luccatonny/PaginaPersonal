const fs = require('fs');
const path = require('path');

const dir = './out';

function fixFiles(dirPath) {
  const files = fs.readdirSync(dirPath);
  
  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      fixFiles(fullPath);
    } else if (file.endsWith('.html') || file.endsWith('.css') || file.endsWith('.js')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      // Reemplaza rutas absolutas con relativas
      content = content.replace(/href="\/(_next|assets|projects)/g, 'href="$1');
      content = content.replace(/src="\/(_next|assets|projects)/g, 'src="$1');
      fs.writeFileSync(fullPath, content, 'utf8');
    }
  }
}

fixFiles(dir);
console.log('✅ Rutas fijadas correctamente');