/**
 * Convert a decimal string to number
 * 
 */

function decimalToBinary (num) {
  var bin = '';
  let sign = '';
  if(num < 0 ) {
  	sign = '-';
  	num = -num;
  }

  while (num > 0) {
    bin = (num % 2)+bin
    num >>= 1 // basically /= 2 without remainder if any
  }
  return sign+bin;
}

/**
 * Example
 */

function testNunToDecStr(num) {
	console,log(`Number ${num} as string is ${decimalToBinary(num)}`)
}

testNunToDecStr(2)
testNunToDecStr(7)
testNunToDecStr(-35)

// Alternative
let num = 253;
console.log(""+num);
num = -253;
console.log(""+num);
