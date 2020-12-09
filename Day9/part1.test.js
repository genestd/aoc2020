const { parseInput } = require('../utils') 
const puzzleInput = require('./input')
const { getRange, normalize, isValidCypher } = require('./part1')

describe('Part 1 tests', () => {
    let data
    beforeEach(() => {
        const input = `35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576`
        data = parseInput(input).map(normalize)
    })
    it('returns a section of an array', () => {
        const data = parseInput(puzzleInput).map(normalize)
        const result = getRange(0, 25, data)
        expect(result.length).toBe(25)
        expect(result[0]).toBe(33)
        expect(result[24]).toBe(20)
    })
    it('validates the cypher number', () => {
        const range = getRange(0, 5, data)
        const result = isValidCypher(range, data[5])
        expect(result).toBe(true)
        const range2 = getRange(9, 5, data)
        const result2 = isValidCypher(range2, data[14])
        expect(result2).toBe(false)
    })
})