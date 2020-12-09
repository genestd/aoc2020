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

const checkForSum = (target, start, range) => {
    let sum = range[start]
    let finish = start
    while (sum < target) {
        finish = finish + 1
        sum = sum + range[finish]
    }
    if (sum === target) {
        const temp = range.slice(start, finish + 1).sort((a, b) => a-b)
        return [true, temp[0], temp[temp.length - 1]]
    }
    return [false, null, null]
}

const findEncryptionWeakness = (range, target) => {
    let index = 0
    let weaknessFound = false
    while (index < range.length) {
        const [wf, smallest, largest] = checkForSum(target, index, range)
        if (wf) {
            return smallest + largest
        }
        index = index + 1
    }
    return -1
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

    const weakness = findEncryptionWeakness(data, data[cypherPointer])

    console.log(`The encryption weakness is ${weakness}`)

}

main()

module.exports = {
    getRange,
    normalize,
    isValidCypher,
    findEncryptionWeakness,
    checkForSum
}