// fix-relative.js
const fs = require('fs');

// Leer el archivo index.html
let content = fs.readFileSync('index.html', 'utf8');

// Contar cuántas rutas con "/" encontramos antes de corregir
const beforeCount = (content.match(/href="\//g) || []).length + 
                    (content.match(/src="\//g) || []).length;

// Corregir rutas
content = content.replace(/href="\//g, 'href="');
content = content.replace(/src="\//g, 'src="');

// Guardar el archivo
fs.writeFileSync('index.html', content);

console.log(`✅ Se corrigieron ${beforeCount} rutas con "/" al inicio`);
console.log('📁 Archivo index.html actualizado');
console.log('');
console.log('🔍 Verifica que las rutas ahora son:');
console.log('   href="_next/... (sin la barra "/")');
console.log('   src="_next/... (sin la barra "/")');
console.log('   src="assets/... (sin la barra "/")');
