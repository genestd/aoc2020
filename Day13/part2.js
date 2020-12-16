const input =  require('./input')
const { parseInput } = require('../utils')

const findTwoBusInterval = (bus1, bus2, offset) => {
    console.log(bus1, bus2, offset)
    let count = 0 
    let found = false
    let val = bus2
    const multiple = bus2
    while (!found && count < 100) {
        if (val > bus1 && val > bus2 && ((val - offset) % bus1) === 0 && (val % bus2) === 0) {
            found = true
        } else {
            val = val + multiple
        }
    }
    return val - offset
}

const main = () => {
    const [earliestDeparture, busses] = parseInput(input)
    const busData = busses.split(',')
        .map(bus => Number.isNaN(parseInt(bus)) ? bus : parseInt(bus, 10))
        .map((bus, index) => bus !== 'x' ? { id: bus, offset: index } : bus)
        .filter(val => val !== 'x')
    
    // console.log(busData)
    // const myNumber = busData.reduce((total, bus, index) => {
    //     if (index === busData.length -1 ) {
    //         return total
    //     }
    //     let period
    //     if (index === 0) {
    //         period = findTwoBusInterval(busData[index + 1].id, bus.id, busData[index + 1].id, busData[index + 1].offset)
    //     } else {
    //         period = findTwoBusInterval(total, total, busData[index + 1].id, busData[index + 1].offset)
    //     }
    //     total = period
    //     // console.log(total)
    //     return total
    // }, 0)

    console.log(myNumber)
}

//main()

module.exports = {
    findTwoBusInterval
}