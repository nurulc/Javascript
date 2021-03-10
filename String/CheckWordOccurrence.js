/**
  * Check and count occurrence of each word in a string
  * Inputs a String eg. Madonna and Boolean
  **/

const checkWordOccurrence = (str, isCaseSensitive = false) => {
  if (typeof str !== 'string') {
    throw new TypeError('The first param should be a string')
  }
  if (typeof isCaseSensitive !== 'boolean') {
    throw new TypeError('The second param should be a boolean')
  }

  const result = {}
  if (str.length > 0) {
    for (let i = 0; i < str.length; i++) {
      const word = isCaseSensitive ? str[i] : str[i].toUpperCase()
      if (/\s/.test(word)) continue
      result[word] = (!result[word]) ? 1 : result[word] + 1
    }
  }

  return result
}
export { checkWordOccurrence }

/**
 * Example
 */

checkWordOccurrence('This is not the correct code for word occurence, but the code for character occurence');
/**
 * the correct code is as follows
 */

function wordOccurence(str, isCaseSensitive) {
  if(!isCaseSensitive) str = str.toLowerCase();
  
  let list = str.split(/[^a-zA-Z]+/);
  let tally = {};
  list.forEach(w => {
    if(!tally[w]) tally[w] = 1;
    else tally[w]++;
  });
  return tally
}
/**
 * Alternative word orrcurenc
 */

wordOccurence('This is not the correct code for word occurence, but the code for character occurence');


