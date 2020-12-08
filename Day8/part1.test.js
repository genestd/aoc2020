const { readInstruction, performInstruction } = require("./part1")
const { parseInput } = require('../utils')

describe('part 1 tests', () => {
    let data
    beforeEach(() => {
        let programData = `nop +0
        acc +1
        jmp +4
        acc +3
        jmp -3
        acc -99
        acc +1
        jmp -4
        acc +6`
        data = parseInput(programData, String.fromCharCode(10))

    })
    it('returns the correct instructions', () => {
        const result1 = readInstruction(data[0])
        const result2 = readInstruction(data[1])
        const result3 = readInstruction(data[2])
        const result4 = readInstruction(data[5])

        expect(result1).toEqual({ type: 'nop', value: 0 })
        expect(result2).toEqual({ type: 'acc', value: 1 })
        expect(result3).toEqual({ type: 'jmp', value: 4 })
        expect(result4).toEqual({ type: 'acc', value: -99 })
    })
    it('performs the instructions', () => {
        const [ga1, ip1] = performInstruction(data[0], 0, 0)
        const [ga2, ip2] = performInstruction(data[1], ga1, ip1)
        const [ga3, ip3] = performInstruction(data[2], ga2, ip2)
        const [ga4, ip4] = performInstruction(data[5], ga3, ip3)

        expect(ga1).toBe(0)
        expect(ip1).toBe(1)
        expect(ga2).toBe(1)
        expect(ip2).toBe(2)
        expect(ga3).toBe(1)
        expect(ip3).toBe(6)
        expect(ga4).toBe(-98)
        expect(ip4).toBe(7)
    })
})