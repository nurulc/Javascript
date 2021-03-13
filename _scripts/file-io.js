const fs = require('fs');
const path = require('path');

function writeOut(fileName,str, makePath=true) {   
//  console.log('write', fileName);
  if(makePath) {
    let targetDir = path.dirname(fileName);
    fs.mkdirSync(targetDir, { recursive: true });
  }
//  console.log("****   writOut", fileName);
  fs.writeFileSync(fileName, str, 'utf8');
}

function readLines(fileName) {
    //console.log("Read from:", fileName);
    return fs.readFileSync(fileName,'utf8').replace(/\r/g, '').split('\n');
}

module.exports = {writeOut, readLines};