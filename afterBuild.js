const fs = require('fs');
const path = require('path');
const pkg = require('./package.json');

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
html = html.replace('{__LER_VERSION__}', pkg.version);
fs.writeFileSync(htmlPath, html);
