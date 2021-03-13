/**
 * Create the final content of the target file
 * 
 */


/**
 * Create the final content of the target file
 * @param  {string} options.target        path the the .try file to be created
 * @param  {string} options.targetContent the content so far for the .try file
 * @param  {Object} fileOrg               the directory structure where the file will be located
 * @return {string}                       the final content string
 */
function makeTargetContent({target, targetContent}, fileOrg) {
    // let [next, prev, back] = getNextPrevBack(target,fileOrg);
    // let tail = '!end\n<script>\nsetNext('+JSON.stringify( [next, prev, back])+");\n</script>\n";
    return targetContent; //+tail;
}
module.exports = makeTargetContent;


//================================================
function getNextPrevBack(target, fileList) {
    if(!Array.isArray(fileList)) {
        console.log("NO FILELIST");
        return ['','','../index.html'];
    }
    let match = fileList.find(({name,files}) => fileMatch(files,target) !== -1);
    if(!match) return ['','', '../index.html']
    let {name, files} = match;
    let ix = fileMatch(files,target);
    if(ix === 0) { return [(files[1]||''), '', '../index.html']; }
    if(ix+1 === files.length) return ['',(files[ix-1]||''), '../index.html']; 
    return [files[ix+1], files[ix-1], '../index.html']
}

function fileMatch(list, target) {
    return list.findIndex(name => target.indexOf(name) !== -1);
}
