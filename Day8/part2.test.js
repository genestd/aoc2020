const { readInstruction, performInstruction } = require("./part1")
const { parseInput } = require('../utils')
const input = require('./input')
const { checkForInfiniteLoop } = require("./part2")

describe('part 1 tests', () => {
    let data
    beforeEach(() => {
        let validProgram = `nop +0
        acc +1
        jmp +4
        acc +3
        jmp -3
        acc -99
        acc +1
        nop -4
        acc +6`
        data = parseInput(validProgram, String.fromCharCode(10))
    })
    it('checks for infinite loop', () => {
        const programData = parseInput(input, String.fromCharCode(10))
        const [result, acc1] = checkForInfiniteLoop(programData)
        expect(result).toBe(true)

        const [result2, acc2] = checkForInfiniteLoop(data)
        expect(result2).toBe(false)
    })
})