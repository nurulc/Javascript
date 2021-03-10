const fs = require('fs');
const zlib = require('zlib');
const path = require('path');
const glob = require('glob');


function jsFilesPromise(srcDir, ext='js') {
    if(!srcDir) srcDir = '.';
    console.log('glob', glob);
    return new Promise((resolve, reject) => {
    	let dir = srcDir+'/**/**.'+ext;
    	console.log(dir);
        glob(dir, (err,fn) => {
           console.log(fn,typeof fn);
           if(err) return reject(err);
           
           const res = fn.filter(s => !s.match(/^[_.]/) && valid(s,readLines(s)));
           resolve(res);
        });
    });
}

function readLines(fileName) {
    return fs.readFileSync(fileName,'utf8').replace(/\r/g, '').split('\n');
}

function valid(lines) {
	let res = parse(lines);
	res.map(l => console.log(l));
	return true;
}

function parse(fn,lines) {
	console.log("File:", fn);
	let res = lines.reduce((result, line) => {
		result = result || {};
		let {list, accum, state} = result;
		state = state || 'begin';
		list = list || [];
		accum = accun || [];
		switch(state) {
			case '!md': {
				if(line.trim() === '*/') {
					if(accum.length) {
						if(accum[0].trim().toUpperCase() === 'example') 
							state = 'example';
						list.push({state, data: accum.join('\n')});
					}
					result.list = list; 
					result.accum = undefined;
					result.state = '!tryit';

				}
				else {
					accum.push(line.replace(/^\s*\*\s?/, ''))
					result.accum = accum;
				}
				return result	
			} /*!md*/
			case 'begin': {
				if(line.startsWith('/**')) {
					result.state = '!md';
				}
				return result;
			}
			case '!tryit': {
				if(line.startsWith('/**')) {
					if(accum.length) {
						list.push({state, data: accum.join('\n')});
					}
					result.list = list; 
					result.accum = undefined;
					result.state = '!md';
					return result;
				}
				accum.push(line);
				result.accum = accum;
				return result;
			}
		} 
	}, undefined);
	if(res.accum && res.accum.length) {
		res.list.push({status: res.status, data: res.accum.join('/n')})
	}
	return res.list;
}

// Promise.all(jsFilesPromise('.')).then ( list =>
//  list.map(s => console.log(s))
// )

console.log(__dirname);
jsFilesPromise('../Sorts').then(list =>
  list.map(s => console.log(s)));
glob('..\\Sorts\\*.js', (err,fn) => {
           console.log(fn,typeof fn);
       });