const input =  require('./input')
const { parseInput } = require('../utils')

const main = () => {
    const [earliestDeparture, busses] = parseInput(input)
    const busData = busses.split(',').filter(bus => bus !== 'x').map(bus => parseInt(bus)).sort((a,b) => a-b)
    
    const result = busData.reduce((result, nextBus) => {
        const wait = nextBus - (earliestDeparture % nextBus)
        if (wait < result.shortestWait) {
            result.shortestWait = wait
            result.id = nextBus
        }
        return result
    }, {
        shortestWait: 100000,
        id: null
    })
    console.log(`The answer is ${result.shortestWait * result.id}`)
}

main()

module.exports = {

}