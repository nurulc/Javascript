/**
 *  Function that takes month number and its year and returns the number of days within it
 *  * @param monthNumber.
 *  * @param year.
 */

const getMonthDays = (monthNumber, year) => {
  const the31DaysMonths = [1, 3, 5, 7, 8, 10, 12]
  const the30DaysMonths = [4, 6, 9, 11]

  if (!the31DaysMonths.includes(monthNumber) && !the30DaysMonths.includes(monthNumber) &&
    (monthNumber !== 2)
  ) {
    throw new TypeError('Invalid Month Number.')
  }

  if (the31DaysMonths.includes(monthNumber)) { return 31 }

  if (the30DaysMonths.includes(monthNumber)) { return 30 }

  // Check for Leap year
  if (year % 4 === 0) {
    if ((year % 100 !== 0) || (year % 100 === 0 && year % 400 === 0)) {
      return 29
    }
  }

  return 28
}

export { getMonthDays }
/**
 * Example
 */

console.log('1,2020',getMonthDays(1,2020));
console.log('2.2000', getMonthDays(2,2000));
console.log('2,2021',getMonthDays(2,2021));
console.log('2,1900',getMonthDays(2,1900));
console.log('11,2021',getMonthDays(3,2020));
console.log('5,2021',getMonthDays(5,2020));
