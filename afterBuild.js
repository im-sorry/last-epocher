const fs = require('fs');
const path = require('path');
const htmlPath = path.join(__dirname, './dist/index.html');
let html = fs.readFileSync(htmlPath, 'utf-8');
const htmlLines = html.split('\n');
html = htmlLines
  .filter((line) => {
    if (/ type="module"/.test(line)) {
      return false;
    }
    return true;
  })
  .map((line) => line.replace(' nomodule', ''))
  .join('\n');
fs.writeFileSync(htmlPath, html);
