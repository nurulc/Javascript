/**
 * Parse js source code to look for various markers
 */

/**
 * Parse an array of line of a javascript source file
 * looking to Note at the top
 * Some javascript code
 *
 */
function parse(fileName,lines) {
	//console.log("File:", fileName);
	let res = lines.reduce((result, line) => {
		result = result || {};
		let {list, accum, state} = result;
		state = state || 'begin';
		list = list || [];
		accum = accum || [];
        //console.log({state});
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
				if(line.trim().startsWith('/**')) {
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
        return result;
	}, {});
	if(res.list && res.accum && res.accum.length) {
		res.list.push({state: res.state, data: res.accum.join('\n'), file: fileName})
	}
   // console.log(JSON.stringigy(res.list));
	return res.list;
}

module.exports = parse;