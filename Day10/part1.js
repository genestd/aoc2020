const { parseInput } = require('../utils')
const input = require('./input')

const main = () => {
    const data = parseInput(input).map(item => parseInt(item, 10)).sort((a,b) => a-b)
    
    let initialJoltage = 0
    let oneJoltDiff = 0
    let threeJoltDiff = 0

    data.forEach(adapter => {
        const delta = adapter - initialJoltage
        initialJoltage = initialJoltage + delta

        if (delta === 1) {
            oneJoltDiff = oneJoltDiff + 1
        } else if (delta === 3) {
            threeJoltDiff = threeJoltDiff + 1
        } else {
            //console.log(adapter, initialJoltage, delta)
            //console.log('Unexpected Differential')
        }
    })
    // connect to device
    threeJoltDiff = threeJoltDiff + 1

    console.log(`There were ${oneJoltDiff} one-jolt differentials, and ${threeJoltDiff} three-jolt differentials (${oneJoltDiff * threeJoltDiff})`)

}

main()

module.exports = {
    
}