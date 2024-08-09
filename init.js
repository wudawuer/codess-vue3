const fs = require('fs');
const path = require('path');

const nReg = /^/;

/**
 * Windows 系统中的保留设备名称，不能用作文件或文件夹的名称
 * TODO
 */
const reservedNames = [/^CON$/i, /^PRN$/i, /^AUX$/i, /^NUL$/i, /^COM[1-9]$/i, /^LPT[1-9]$/i];

const snippetsPath = path.join(__dirname, './snippets');
fs.readdirSync(snippetsPath).forEach((_) => {
  fs.rmSync(path.join(snippetsPath, _));
});

const originPath = path.join(__dirname, './origin');
fs.readdirSync(originPath).forEach((_) => {
  let item = JSON.parse(fs.readFileSync(path.join(originPath, _)).toString());
  let prefixs = [];
  for (let i in item) {
    let prefix = item[i].prefix;
    let body = item[i].body;
    let description = item[i].description;
    if (!nReg.test(prefix)) {
      console.log(`有特殊触发词`, prefix);
    }
    prefix = prefix.replace(nReg, '');
    let fileName = prefix;
    if (reservedNames.some((_) => _.test(fileName))) {
      fileName = fileName + '_';
    }
    if (prefixs.includes(prefix)) {
      console.log('有重复的prefix', prefix);
    } else {
      prefixs.push(prefix);
      fs.writeFileSync(
        path.join(snippetsPath, fileName + '.md'),
        `## ${prefix}
#### ${i}
${description}
\`\`\`
${body.join('\n')}
\`\`\``,
      );
    }
  }
});
