const { parseInput } = require('../utils')
const { getDestinationCup, getNextThreeCups } = require("./part1")

describe('part 1 tests', () => {
    let cups 
    beforeEach(() => {
        cups = '389125467'.split('').map(cup => parseInt(cup, 10))
    })
    it('tests the destination cup fn', () => {
        const result = getDestinationCup(cups, 2)
        expect(result).toBe(2)
    })
    it('test getNextThreeCups 1', () => {
        const result = getNextThreeCups(cups, 2)
        expect(result).toEqual([[9,1,2],[3,8,5,4,6,7]])
    })
    it('test getNextThreeCups 2', () => {
        const result2 = getNextThreeCups(cups, 7)
        console.log(result2)
        expect(result2).toEqual([[6,7,3], [8,9,1,2,3,4]])
    })
})