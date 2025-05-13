const fs = require('fs');

// Read the file
const filePath = 'src/app/config/page.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Find the Guarantee section and wrap it in conditional rendering for Home page
let match = content.match(/\{\/\* Guarantee Section Controls.*?\<\/div\>\n\s+\<\/div\>\n\s+\)\}\n\s+\<\/div\>/gs);
if (match) {
  // Already has conditional rendering, no change needed
  console.log('Guarantee section already has conditional rendering');
} else {
  // Add conditional rendering
  content = content.replace(
    /(\{\/\* Guarantee Section Controls.*?\*\/\})\s*\n\s*(\<div className="rounded-2xl shadow-2xl border border-\[\#d8b4fe\] bg-white\/80 p-8 mb-8"\>)/gs,
    '$1\n      {pageKey === \'Home\' && (\n      $2'
  );
  
  // Add closing parenthesis at the end of the section
  content = content.replace(
    /(\{\/\* Guarantee Section Controls.*?\<\/button\>.*?\{showGuaranteeSection.*?\<\/div\>\s*\n\s*\)\}\s*\n\s*\<\/div\>)/gs,
    '$1\n      )}'
  );
  console.log('Added conditional rendering to Guarantee section');
}

// Find the Services section and wrap it in conditional rendering for Home page
match = content.match(/\{\/\* Services Section Controls.*?\<\/div\>\n\s+\<\/div\>\n\s+\)\}\n\s+\<\/div\>/gs);
if (match) {
  // Already has conditional rendering, no change needed
  console.log('Services section already has conditional rendering');
} else {
  // Add conditional rendering
  content = content.replace(
    /(\{\/\* Services Section Controls.*?\*\/\})\s*\n\s*(\<div className="rounded-2xl shadow-2xl border border-\[\#93c5fd\] bg-white\/80 p-8 mb-8"\>)/gs,
    '$1\n      {pageKey === \'Home\' && (\n      $2'
  );
  
  // Add closing parenthesis at the end of the section
  content = content.replace(
    /(\{\/\* Services Section Controls.*?\<\/button\>.*?\{showServicesSection.*?\<\/div\>\s*\n\s*\)\}\s*\n\s*\<\/div\>)/gs,
    '$1\n      )}'
  );
  console.log('Added conditional rendering to Services section');
}

// Find the Reviews section and wrap it in conditional rendering for Home page
match = content.match(/\{\/\* Reviews Section Controls.*?\<\/div\>\n\s+\<\/div\>\n\s+\)\}\n\s+\<\/div\>/gs);
if (match) {
  // Already has conditional rendering, no change needed
  console.log('Reviews section already has conditional rendering');
} else {
  // Add conditional rendering
  content = content.replace(
    /(\{\/\* Reviews Section Controls.*?\*\/\})\s*\n\s*(\<div className="rounded-2xl shadow-2xl border border-\[\#93c5fd\] bg-white\/80 p-8 mb-8"\>)/gs,
    '$1\n      {pageKey === \'Home\' && (\n      $2'
  );
  
  // Add closing parenthesis at the end of the section
  content = content.replace(
    /(\{\/\* Reviews Section Controls.*?\<\/button\>.*?\{showReviewsSection.*?\<\/div\>\s*\n\s*\)\}\s*\n\s*\<\/div\>)/gs,
    '$1\n      )}'
  );
  console.log('Added conditional rendering to Reviews section');
}

// Write the modified content back to the file
fs.writeFileSync(filePath, content, 'utf8');
console.log('Config file updated successfully!'); 