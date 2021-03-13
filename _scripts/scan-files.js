
let fs = require('fs');
let glob = require('glob');
const {writeOut, readLines} = require('./file-io');
const {validFileName, validFileContent} = require('./file-check')
const collectPaths = require('./collectPaths');
const finalTargetContent = require('./makeTargetContent');
const {buildIndex, makeNode} = require('./buildIndex');
const fileProcessor = require('./fileProcessor');
const processAnIndex = require('./dirLevelIndex');
const printMasterIndex = require('./printMasterIndex');

genTyrFiles('.', 'try_src'); // main action

function log(x,msg) { console.log(msg, x); return x;}
//=====================================================
function genTyrFiles(baseDir='.', try_src='try_src') {
    let data = fs.readFileSync(baseDir+'/_scripts/tryit-helper.js','utf8').replace(/\r/g, '');
    writeOut(`${baseDir}/${try_src}/tryit-helper.js`,data);

    jsFilesPromise(baseDir+'/')
    .then(listOfJsFiles => listOfJsFiles
                  .map(fileProcessor(baseDir,try_src))
                  .filter(x => x!==undefined))
    .then(listOfJsObj => [listOfJsObj.reduce(buildIndex, makeNode(try_src)), listOfJsObj])
    .then(([ tree, listOfJsObj ]) => [
         log(tree,'tree').children.map(c => [[tree.name, c.name], collectPaths(c, tree.name)]),
         listOfJsObj
       ]
     )
    .then(([dirStruc,listOfJsObj]) => [genIndexFiles(baseDir,dirStruc), listOfJsObj] )
    .then(([dirStruc,listOfJsObj]) => {
        listOfJsObj.forEach( jsObj => writeOut(jsObj.target, finalTargetContent(jsObj, dirStruc)));
        let fileList = dirStruc.map(processAnIndex(baseDir));
        console.log("Content of master index", fileList);
        let listOfLinks = fileList.map(fn => fn.split('/').slice(2).join('/').replace(/\.try$/,'.html'));
        let indexFileName = [...fileList[0].split('/').slice(0,2),'index.try'].join('/');
        printMasterIndex(indexFileName, listOfLinks);
        return [dirStruc,listOfJsObj];
      }
    );
 }


/**
 * Read all the js files and their content a return a list of promises
 * 
 * @param  {string} srcDir where the find the javascript source files
 * @param  {string} ext    [description]
 * @return {Promise}        the files we want to process and their contents
 */
function jsFilesPromise(srcDir, ext='js') {
    if(!srcDir) srcDir = '.';

    return new Promise((resolve, reject) => {
    	let dir = srcDir+'/**/**.'+ext;

        glob(dir, (err,fn) => {
           //console.log(fn,typeof fn);
           if(err) return reject(err);
           
           const res = fn.filter(validFileName);
           let list = res.map(f => validFileContent(f,readLines(f)))
                         .filter(r => r !== undefined );
           resolve(list);
        });
    });
}


function genIndexFiles(base, list) {
   let tmp = list
         .map(([names, files]) => ({name: names.join('/'), files}))
         .map(({name, files}) => ({name, files: files.map(n => n.substr(name.length+1))}));
    tmp.forEach(v => console.log('index.html =>',v));
    return tmp;
}











//=====================================================
//
/*
// Testing

//JSON.stringify(buildIndex(makeNode('..'), { target: '../try_src/String/GenerateGUID.try'}));
var res = [{ target: '../try_src/String/match.try'}, { target: '../try_src/String/GenerateGUID.try'}, 
          { target: '../try_src/Sorts/bubble.try'}].reduce(buildIndex,makeNode('try_src'));
res.children.map(c => [[res.name, c.name], collectPaths(c, res.name)]);


// Testing

var testList = [
    { //0
      name: 'try_src/Backtracking',
      files: [ 'KnightTour.try', 'NQueen.try', 'Sudoku.try' ]
    },
    { //1
        name: 'try_src/Cache', files: [ 'LFUCache.try', 'LRUCache.try' ] },
    { //2
      name: 'try_src/Ciphers',
      files: [
        'CaesarsCipher.try',
        'KeyFinder.try',
        'ROT13.try',
        'VigenereCipher.try',
        'XORCipher.try'
      ]
    },
    { //3
      name: 'try_src/Conversions',
      files: [
        'ArbitraryBase.try',
        'BinaryToDecimal.try',
        'DecimalToBinary.try',
        'HexToRGB.try',
        'RGBToHex.try',
        'RomanToDecimal.try'
      ]
    }    
];
fileMatch(testList[2].files, '../try_src/Ciphers/ROT13.try');
makeTargetContent({ target:'../try_src/Ciphers/ROT13.try', targetContent: "HEAD\nBODY\n"}, testList)

codeFix(`  "use strict";
   export default  function main 
(n) {
  const board = new NQueen(n)

  board.printBoard()
  console.log('\n')
  export 
{hello, how are
   };
  // hello 
  export const func = () => true;
  export const fred;
`, 'nurul', '!tryit');
*/
