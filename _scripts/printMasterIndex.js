const {writeOut}= require('./file-io');


function printMasterIndex(indexFileName, listOfLinks) {
	let head = '!head\n';
	let heading =`
!md
# Welcome to Algorithns in Javasctipt

The sections are as follows:

`;
     let list = listOfLinks.map(link =>
`
## <a href="${link}">${link.split('/')[0]}</a> 
`     	
	);

 	writeOut(indexFileName, head+heading+list.join('\n')+'!end\n')    
}

module.exports = printMasterIndex;