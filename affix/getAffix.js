const xlsx = require('node-xlsx');
const path = require('path');
const fs = require('fs');
const xlsxPath = path.join(__dirname, 'data.xlsx');
const jsonPath = path.join(__dirname, 'data.json');

const sheets = xlsx.parse(xlsxPath);
const affixData = sheets[1].data;
const affixList = [];
for (let i = 1; i < affixData.length; i++) {
  affixList.push({
    main: affixData[i][0],
    sub: affixData[i][1],
    detail: affixData[i][2],
    subDetail: affixData[i][3] || '',
  });
}
fs.writeFileSync(jsonPath, JSON.stringify(affixList, '', 2));
