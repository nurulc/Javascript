/**
 * Create index files fot the .try files to help navigation
 */
const {writeOut} = require('./file-io');

function processAnIndex(baseDirName){
    if(baseDirName === undefined) {
        throw new Error("base not defined'");
    }
    //console.log("++++ BASE NAME+++", baseDirName)
   return  ({name, files}) => {
      if(files.length < 15) {
          return createIndex(1,1, name, '', files,undefined, baseDirName);
      } else if( naturalPartition(files) ){
          let partitions = naturalPartition(files);
          //console.log(partitions);
          partitions.forEach(([pname,files],ix) => createIndex(partitions.length,ix, name, pname, files, partitions, baseDirName));
          let res =partitions.map(([pname,files],ix) => createTopIndex(partitions.length,ix, name, pname, files, partitions,baseDirName)); 
          let target = res[0][1];
          let targetFileName = target.join('/')+'/index.try'
          
          let content = res.map(pick(0)).join('\n');
          let someDescription = getReadme(target);
           let helperTarget =  helperName(targetFileName,'tryit-helper.js');
          let modName = targetFileName.split('/')[1];
          content = '!md\n# '+modName+'\n\n'+ someDescription + '\n'+content;
          content = wrapIndex(modName, helperTarget, content,'../index.html');
          
          //console.log('Write ', targetFileName);
          //console.log(content);
          if(baseDirName === undefined) throw new Error('NO base name');
          let fileName = baseDirName+'/'+targetFileName;
          writeOut(fileName,content);
          return fileName;
      } else {
          console.log('something else');
          throw new Error("Currently not handling this case")
      } 
   };
}

module.exports = processAnIndex;

//================================================================
//

function wrapIndex(moduleName,helper,content,link='../index.html') {
        return (
'!head'+`
  <title>${moduleName}</title>
  <script src="${helper}"></script>
${content}
!end
<style>
  .back-button {
      position: fixed !important;
      margin-top: 2rem !important;
      margin-left: 3rem !important;
  }
</style>
<script>
    let cc = $$.codeTransform;
    cc.add(cc.comment);
    cc.add(cc.class);
    cc.add(src => src.replace(/^\\s*const\\s/mg,'var '));
    cc.add(src => src.replace(/console.log/mg, '$$$$.D'));
    cc.add(src => (console.log(src),src)); // display transformed data
    addBackButton("${link}");
</script>
`);    
}
function pick(n) { return (obj) => obj[n]; }
function groupBy(fn) {
    return (aMap, val) => {
        if(!aMap) aMap = new Map();
        let key = fn(val);
        let arr = aMap.get(key);
        if(!arr) aMap.set(key, [val])
        else arr.push(val);
        return aMap;
    }
}

var cache = {files: [], result: null};
function naturalPartition(files) {
    if(files === cache.files ) return cache.result; // return from cache
    
    if( !files.every(hasSlash) ) return undefined;
    let groups = files.map(n => [n.split('/')[0], n]).reduce(groupBy(pick(0)),undefined);
    let groupNames = groups.keys();
    if(groupNames.length*2 > files.length) return undefined;
    let res = Array.from(groups.entries()).map(([key, list])=> [key, list.map(pick(1))]);
    cache.files = files; cache.result = res; // cache result
    return res;
    
    // =======================    
    function hasSlash(fn) {
        return fn.indexOf('/') != -1;
    }
}

function getReadme(target) {
    // @Fixme
    return "Some README content from "+target[1];
}

function helperName(targetFileName,helper) {
    return [...targetFileName.split('/').slice(2).map(() => '..'), helper].join('/');
}


function createIndex(count,ix, name, subject,files,partitions,base ) {
        //let elts = [...name.split('/').slice(1), subject];
        let targetFileName = name+'/'+(subject||'index')+'.try'; 
        console.log('writing ',targetFileName/*count,ix,'-'+subject+'-',elts,*/ );
        let helperTarget =  helperName(targetFileName,'tryit-helper.js');
        let modName = targetFileName.split('/')[count>1?2:1].replace('.try','');
        let link = count>1?'index.html':'../index.html';
        let str = wrapIndex(modName,helperTarget,'!md\n# ' +modName+'\n\n'+ files.map(n => `@@include ${n}`).join('\n'), link);
        if(base === undefined) throw new Error('NO base name');
        let fileName = base+'/'+targetFileName;
        writeOut(fileName,str);
        return fileName;
}
function createTopIndex(count,ix, name, subject,files,partition ) {
    if(count===1) return undefined;
     let elts = [...name.split('/'), subject];
    let target = elts.slice(2).join('/')+'.html';
    return [`*   <a href="${target}">${subject}</a>`, elts.slice(0,2)];
}
