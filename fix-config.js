const fs = require('fs');

// Read the file
const filePath = 'src/app/config/page.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Add conditions around Guarantee, Services, and Reviews sections
content = content.replace(
  /{\/* Guarantee Section Controls - Home page only \*\/}/g, 
  `{/* Guarantee Section Controls - Home page only */}\n      {pageKey === 'Home' && (`
);

content = content.replace(
  /{\/* Services Section Controls - Home page only \*\/}/g, 
  `{/* Services Section Controls - Home page only */}\n      {pageKey === 'Home' && (`
);

content = content.replace(
  /{\/* Reviews Section Controls - Home page only \*\/}/g, 
  `{/* Reviews Section Controls - Home page only */}\n      {pageKey === 'Home' && (`
);

// Add closing parentheses to each section
// Find Guarantee Section closing div and add closing parenthesis
content = content.replace(
  /({\/* Guarantee Section Controls.*?\n.*?pageKey === 'Home'.*?\n.*?<div.*?<\/button>\n.*?{showGuaranteeSection.*?\n.*?<div.*?<\/div>\n.*?<\/div>\n.*?<\/div>)/gs,
  '$1\n      )}'
);

// Find Services Section closing div and add closing parenthesis
content = content.replace(
  /({\/* Services Section Controls.*?\n.*?pageKey === 'Home'.*?\n.*?<div.*?<\/button>\n.*?{showServicesSection.*?\n.*?<div.*?<\/div>\n.*?<\/div>\n.*?<\/div>)/gs,
  '$1\n      )}'
);

// Find Reviews Section closing div and add closing parenthesis
content = content.replace(
  /({\/* Reviews Section Controls.*?\n.*?pageKey === 'Home'.*?\n.*?<div.*?<\/button>\n.*?{showReviewsSection.*?\n.*?<div.*?<\/div>\n.*?<\/div>\n.*?<\/div>)/gs,
  '$1\n      )}'
);

// Write the modified content back to the file
fs.writeFileSync(filePath, content, 'utf8');

console.log('Config file updated successfully!'); 