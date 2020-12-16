const input = require('./input')
const { parseInput } = require('../utils')

function dec2bin(dec, pad=true) {
    let bin = (dec >>> 0).toString(2)
    if (pad) {
        return bin.padStart(36, "0");
    }
    return bin
}


const normalize = (record) => {
    [operation, value] = record.split('=').map(item => item.trim())
    if (operation.startsWith('mem')) {
        operation = parseInt(operation.split('').slice(4, operation.length-1).join(''),10)
        value = parseInt(value, 10)
    }
    return [operation, value]
}

const applyMaskToValue = (mask, value) => {
    let binValue = dec2bin(value).split('').map((char, index) => mask[index] === '0' ? char : mask[index])
    return binValue.join('')
}

const writeValueToMaskedMemory = (maskedAddress, memory, value) => {
    // we'll use binary representation of "exes" to replace the values
    const exes = 2 ** maskedAddress.split('').filter(val => val === 'X').length
    for (let i=0; i < exes; i++) {
        const replacementBits = dec2bin(i).split('')
        const maskedArr = maskedAddress.split('')
        let maskCounter = 1
        const bitMemAddress = maskedArr.map(item => {
            if (item === 'X') {
                item = replacementBits[replacementBits.length - maskCounter]
                maskCounter = maskCounter + 1
                return item 
            }
            return item
        }).join('')
        memAddress = parseInt(bitMemAddress, 2)
        memory[`${memAddress}`] = value
    }
    return memory
}

const main = () => {
    const data = parseInput(input).map(normalize)
    //console.log(data)
    let memory = {}
    let mask = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
    for (let [operation, value] of data) {
        if (operation === 'mask') {
            mask = value
        } else {
            const maskedValue = applyMaskToValue(mask, operation)
            writeValueToMaskedMemory(maskedValue, memory, value)
        }
    }
    const total = Object.keys(memory).reduce((total, value) => total + memory[value], 0)
    console.log(total)
}

main()

module.exports = {
    applyMaskToValue,
    writeValueToMaskedMemory
}