const { parseInput } = require('../utils')
const input = require('./inputs')

// Remove line breaks
const normalize = (record) => record.split(String.fromCharCode(10)).join('')

const alphabet = {
    a: 0, b: 0, c: 0, d: 0, e: 0, f: 0, g: 0, h: 0, i: 0,
    j: 0, k: 0, l: 0, m: 0, n: 0, o: 0, p: 0, q: 0, r: 0,
    s: 0, t: 0, u: 0, v: 0, w: 0, x: 0, y: 0, z: 0
}

const getUniqueLetters = word => {
    return word.split('').filter((letter, index) => {
        if (index === 0) return true
        return word.indexOf(letter) === index
    })
}

const main = () => {
    const splitter = `${String.fromCharCode(10)}${String.fromCharCode(10)}`
    const data = parseInput(input, splitter).map(normalize)
    
    data.forEach(word => {
        const letters = getUniqueLetters(word)
        letters.forEach(letter => alphabet[letter] = alphabet[letter] + 1)
    })

    console.log(alphabet)
    console.log(`The sum of yes answers = ${Object.values(alphabet).reduce((total, value) => total + value, 0)}`)
}

main()

module.exports = {
    getUniqueLetters
}