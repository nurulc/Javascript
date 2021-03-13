

function buildIndex(tree, {target}) {
  let arr = target.split('/').slice(1); console.log('PATH', arr);
  arr.reduce(treeBuild,tree);
  //console.log({target}, JSON.stringify(tree,null,' '))
  return tree;
}
module.exports = buildIndex;
function log(x,msg) { return x;}

//================================================================
//
function treeBuild(tree, file) {
    //console.log(tree, file);
    if(tree === undefined) //tree = makeNode('..');
       throw new Error("Tree parameter missing");
    //log({tree, file},'tree build');
    if(Array.isArray(tree)) {
        let node = tree.find(e => e.name === file);
        if(node === undefined) {
            node = makeNode(file);
            tree.push(node);
        }
        return node.children;
    } else {
        return tree.children;
    }
}

function makeNode(name) {
    return ({name, children: []})
}

module.exports = {buildIndex,makeNode};