
function collectPaths(aTree,base) {
    let b =  base+'/'+aTree.name;
    if(children(aTree) === 0) return b;
    return aTree.children.flatMap(n => collectPaths(n,b));
}

module.exports = collectPaths;

function children(aTree) {
    if(!aTree || !aTree.children ) return 0;
    return aTree.children.length;
}
