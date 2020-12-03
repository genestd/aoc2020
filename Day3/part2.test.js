const { checkTreesInSlope } = require('./part2')
const parseInput = require('../utils').parseInput
const input = require('./input')


it('should return 262', () => {
    const data = parseInput(input)
    const result = checkTreesInSlope(3,1, data)
    expect(result).toBe(262)
})