const fs = require('fs');
const path = require('path');
const pkg = require('./package.json');

const sourceText = path.join(__dirname, './使用说明.txt');
const targetText = path.join(__dirname, './dist/使用说明.txt');
const htmlPath = path.join(__dirname, './dist/index.html');
const htmlSource = fs.readFileSync(htmlPath, 'utf-8');
const htmlLines = htmlSource.split('\n');

let html = htmlLines
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
fs.copyFileSync(sourceText, targetText);
