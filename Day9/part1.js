const { parseInput } = require('../utils')
const input = require('./input')

const getRange = (rangeStart, rangeLength, range) => {
    return range.slice(rangeStart, rangeStart + rangeLength)
}

const normalize = item => parseInt(item, 10)

const isValidCypher = (range, value) => {
    range.sort((a,b) => a-b)
    for (let i=0; i < range.length; i++) {
        if (range.includes(value - range[i]) && range.lastIndexOf(value - range[i]) !== i) {
            return true
        }
    }
    return false
}

const main = () => {
    const data = parseInput(input).map(normalize)
    
    const rangeLength = 25
    let rangeStart = 0
    let cypherPointer = 25
    let validCypher = true

    while (cypherPointer < data.length && validCypher) {
        const range = getRange(rangeStart, rangeLength, data)
        validCypher = isValidCypher(range, data[cypherPointer])
        if (validCypher) {
            cypherPointer = cypherPointer + 1
            rangeStart = rangeStart + 1
        }
    }

    console.log(`The first invalid number was ${data[cypherPointer]}`)

}

main()

module.exports = {
    getRange,
    normalize,
    isValidCypher
}