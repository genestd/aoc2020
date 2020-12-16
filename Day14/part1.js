const input = require('./input')
const { parseInput } = require('../utils')

function dec2bin(dec) {
    return (dec >>> 0).toString(2).padStart(36, "0");
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
    let binValue = dec2bin(value).split('').map((char, index) => mask[index] === 'X' ? char : mask[index])

    // let newValue = value
    // for (let i=0; i<mask.length;i++) {
    //     if (mask[i] !== 'X') {
    //         const maskValue = dec2bin(parseInt(mask[i], 10))
    //         const bitmask = 0 //shift(1, (mask.length - 1)- i)
    //         if (maskValue === '1') {
    //             newValue = newValue |= bitmask
    //         } else {
    //             newValue = newValue &= ~bitmask
    //         }
    //         console.log({ value, maskValue, bitmask, newValue, binValue, i })
    //     }
    // }
    return parseInt(binValue.join(''),2)
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
            const maskedValue = applyMaskToValue(mask, value)
            memory[`${operation}`] = maskedValue
        }
    }
    const total = Object.keys(memory).reduce((total, value) => total + memory[value], 0)
    console.log(total)
}

main()

module.exports = {
    applyMaskToValue
}