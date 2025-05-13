const fs = require('fs');

// Read the file
const filePath = 'src/app/config/page.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Find the Reviews Section Controls and add the condition
content = content.replace(
  /(\s+\{\s*\/\*\s*Reviews\s*Section\s*Controls\s*\*\/\s*\})\s*\n\s*(\<div className="rounded-2xl shadow-2xl border border-\[\#93c5fd\] bg-white\/80 p-8 mb-8"\>)/gs,
  '$1\n      {pageKey === \'Home\' && (\n      $2'
);

// Add the closing parenthesis and curly brace for the condition
content = content.replace(
  /(\<\/div\>\s*)\n\s*(\<div className="grid grid-cols-1 gap-6 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg shadow-inner"\>)/gs,
  '$1\n      )}\n      $2'
);

// Write the modified content back to the file
fs.writeFileSync(filePath, content, 'utf8');
console.log('Reviews section now conditionally renders only on Home page!'); 