/**
 * Binary to decimal conversion
 *
 * * Takes a binary string and coneverts to a number
 * * 
 */

/**
 * Takes a binary string and coneverts to a number
 * 
 * @param  {string} binaryString a binary string consistion of only '0' or '1'
 * @return {Number}              [description]
 */
const binaryToDecimal = (binaryString) => {
  let decimalNumber = 0
  const binaryDigits = binaryString.split('').reverse() // Splits the binary number into reversed single digits
  binaryDigits.forEach((binaryDigit, index) => {
    decimalNumber += binaryDigit * (Math.pow(2, index)) // Summation of all the decimal converted digits
  })
  return decimalNumber
}

/**
 * A more robust and more efficient solution;
 * @param  {string} binaryString a binary string consistion of only '0' or '1'
 * @return {Number}              the binary string as a
 */
function binaryStrToNum(aBinaryString) {
	if(!aBinaryString.match(/^[01]+$/)) return NaN;
	let len = aBinaryString.length;
	let num = 0;
	for(let i=0; i<len; i++) {
		let digit = 
		switch(aBinaryString.charCodeAt(i)){
			case '0': num *=2; break
			case '1' : num = num*2+1; break;
			default : return NaN;
		}
	}
	return num;
}

/**
 * Example
 */

function testBinToNum(conv,binaryString, convName) {
	  console.log(`Decimal of ${binaryString} is ${conv(binaryString)} using {convName}`)
}

(() => {
  testBinToNum(binaryToDecimal,'111001', 'binaryToDecimal');
  testBinToNum(binaryToDecimal,'101', 'binaryToDecimal');
  
  testBinToNum(binaryStrToNumber,'111001', 'binaryStrToNum);
  testBinToNum(binaryStrToNumber,'101', 'binaryStrToNum');
})()
