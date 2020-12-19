const { doOperation, doMath, simplifyParentheses } = require("./part2")

describe('Part 2 tests', () => {
    it('tests the doMath function', () => {
        const result = doMath(`1 + 2 * 3 + 4 * 5 + 6`)
        expect(result).toBe(231)
    })
    // it('does some math', () => {
    //     const result = doMath(simplifyParentheses('1 + (2 * 3) + (4 * (5 + 6))'))
    //     expect(result).toBe(51)
    // })
})