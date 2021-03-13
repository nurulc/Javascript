/**
 * Creates a file file processing function
 * 
 * @param  {baseDirectory} basePath The directory where the javascript files are located
 * @return {function}          [description]
 */
function fileProcessor(basePath, try_src='try_src'){
    return ([fileName,data], i) => {

          let target = `${basePath}/${try_src}/${stripBase(fileName,basePath)}`;

          target = target.replace(/\/+/g, '/').replace(/\.js$/, '.try');

          let moduleName = getModuleName(fileName);
          let start = data[0].data;
          if( data[0].state !== '!md') return undefined;
          let ix = data.findIndex(o => o.state === '!md' && o.data.match(/^[ \t]*Example/));
          if(ix === -1 ) return undefined;
          let targetContent = getInnerCode(data,1,ix, moduleName);
          if(targetContent[0] === '\n') targetContent = targetContent.substr(1);
          console.log('file',fileName,target,ix);
          return ({fileName, target, targetContent})
        };
    //============
    function getModuleName(fileName) {
        let list = fileName.split('/');
        //console.log(list);
        return list[list.length-1].replace('.js', '');
    }    
}

module.exports = fileProcessor;

//============================================

function stripBase(fileName, basePath) {
    return fileName.startsWith(basePath)? fileName.substr(basePath.length): fileName;
}


function getInnerCode(data, start, end,moduleName) {
    let head = '!md' +'\n'+ 
               '# '+moduleName +'\n\n'+
               data[0].data+'\n';
               
    let tail = data.slice(end).map(o => o.state+'\n'+codeFix(o.data, moduleName,o.state)+'\n').join('\n');
    let res = data
               .slice(start, end)
               .filter(o => o.state === '!tryit')
               .map(o => codeFix(o.data, moduleName,o.state));
    if(res.length) {
        return `${head}
!tryit
${res.join('\n')}
${tail}
`;
    }
}

function codeFix(str, moduleName, state) {
    if(state !== '!tryit') return str;
    let ols = str;
    str = str.replace(/^\s*(const|let|var)\s+main\s*=/gm, 'const '+moduleName+'Test =');
    str = str.replace(/main[ \t\n]*\(/gm, moduleName+'Test(');
    str = str.replace(/export[ \t\n]*{[^}]*}/gm, '');
    str = str.replace(/export[ \t\n]+(default)?/gm,'');
    str = str.replace(/['"]use strict['"]/gm,'');
    return str;
}
