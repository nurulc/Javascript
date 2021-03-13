const parse = require('./js-source-parser');

function validFileName(s) {
    if(s.match(/node_modules/)) return false;
    if(s.match(/^(lib|dist)/)) return false;
    if(s.match(/\/(try_src|try_it)\//)) return false;
    if(s[0] === '_' || s[0] !== '.') return false;
    if(s.match(/\.test\.js$/)) return false;
    return true;
}

/**
 * Check for vaid file content, i.e with markup that shows 
 * the file should be used to create a .try file
 * 
 * The javascript files has been modified
 * to a header for tryit at the top
 * Comment section with 'Example' near the ednd
 */
function validFileContent(fileName,lines) {
    let res = parse(fileName,lines);
    
    if(res && res.length > 2) {
      if(res[0].state !== '!md') return undefined;
      let l = res.filter(o => o.state === '!md' && o.data.match('^[ \t]*Example'));
      if(l.length) return [fileName, res];
    }
    return undefined;
}

module.exports = {validFileName, validFileContent};