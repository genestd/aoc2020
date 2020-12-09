const { parseInput } = require('../utils') 
const puzzleInput = require('./input')
const { getRange, normalize, isValidCypher } = require('./part1')
const { findEncryptionWeakness, checkForSum } = require('./part2')

describe('Part 2 tests', () => {
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
    it('tests checkForSum', () => {
        const result = checkForSum(127, 2, data)
        expect(result).toEqual([true, 15, 47])
    })
    it('finds the encryption weakness', () => {
        const result = findEncryptionWeakness(data, 127)
        expect(result).toBe(62)
    })

})