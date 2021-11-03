/**
 * Adding zero to a single string
 * 1 => 01
 * @param {string} number
 * @param {number} digits How many digits it should be
 * @return {string}
 */
export const addZero = (number: string | number, digits = 2): string => {
    const num = typeof number === 'string' ? number : number.toString()

    if (num.length >= digits) {
        return num
    }

    const value = new Array(digits - num.length).fill('0')
    value.push(num)

    return value.join('')
}
