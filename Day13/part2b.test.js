const { parseInput } = require('../utils')
const { findTwoBusInterval } = require("./part2")

describe('part 2 tests', () => {
    it ('tests 2 bus interval', () => {
        const result = findTwoBusInterval(7, 13, 1)
        expect(result).toBe(77)
    })
    it('tests 2 bus interval again', () => {
        const busData = `67,7,59,61`.split(',')
            .map(bus => Number.isNaN(parseInt(bus)) ? bus : parseInt(bus, 10))
        const result = findTwoBusInterval(67, 7, 1)
        //console.log({ result })
        const result2 = findTwoBusInterval(335, 59, 2)
        console.log(result2)
        const result3 = findTwoBusInterval(18760, 61, 3)
        expect(result3).toBe(754018)
    })
})