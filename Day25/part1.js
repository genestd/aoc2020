const input = require('./input')
const {parseInput} = require('../utils')

const loop = (value, subject) => {
    value = value * subject
    value = value % 20201227
    return value
}

const main = () => {
    const [cardPublicKey, doorPublicKey] = parseInput(input).map(item => parseInt(item, 10))
    let cardLoopSize = 0
    let doorLoopSize = 0
    let loopValue = 1
    let loopCount = 0

    while (cardLoopSize === 0 || doorLoopSize === 0) {
        loopCount++
        loopValue = loop(loopValue, 7)
        if (loopValue === cardPublicKey) {
            cardLoopSize = loopCount
        } else if (loopValue === doorPublicKey) {
            doorLoopSize = loopCount
        }

    }

    console.log({cardLoopSize, doorLoopSize})

    let newLoopCount = 0
    let encryptionKey = 1
    while (newLoopCount < cardLoopSize) {
        encryptionKey = loop(encryptionKey, doorPublicKey)
        newLoopCount++
    }
    console.log({encryptionKey})
}

main()

module.exports = {

}